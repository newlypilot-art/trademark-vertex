import { NextResponse } from 'next/server';
import { SESSION_COOKIE, createToken, passwordMatches } from '@/lib/auth';
import { dashboardEnabled } from '@/lib/flags';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Very small in-memory rate limit so the login is not brute-forceable. */
const attempts = new Map<string, { count: number; until: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

/** Production deploys have no dashboard, so this endpoint must not exist. */
function disabled() {
  return new NextResponse('Not found', { status: 404 });
}

function clientKey(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'local'
  );
}

export async function POST(req: Request) {
  if (!dashboardEnabled()) return disabled();

  const key = clientKey(req);
  const now = Date.now();
  const record = attempts.get(key);
  if (record && record.until > now && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a few minutes.' },
      { status: 429 },
    );
  }

  let password = '';
  try {
    ({ password } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    const next = record && record.until > now ? record : { count: 0, until: now + WINDOW_MS };
    next.count += 1;
    attempts.set(key, next);
    return NextResponse.json({ error: 'That password is not right.' }, { status: 401 });
  }

  attempts.delete(key);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}

export async function DELETE() {
  if (!dashboardEnabled()) return disabled();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
