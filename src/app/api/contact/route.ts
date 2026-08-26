import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LEADS_PATH = path.join(process.cwd(), 'data', 'leads.json');
const MAX_LEADS = 5000;

const rate = new Map<string, { count: number; until: number }>();

function clientKey(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'local'
  );
}

function clean(v: unknown, max = 500) {
  return String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  // Light rate limit: 5 submissions per IP per 10 minutes.
  const key = clientKey(req);
  const now = Date.now();
  const rec = rate.get(key);
  if (rec && rec.until > now && rec.count >= 5) {
    return NextResponse.json({ error: 'Too many messages. Please try later.' }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  // QA #9: honeypot plus a minimum time on the form. Both are silent successes
  // so a bot gets no signal about why it failed.
  if (clean(body.company_website)) return NextResponse.json({ ok: true });
  if (Number(body.elapsed) < 2500) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'That email address is not valid.' }, { status: 400 });
  }

  const lead = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: clean(body.phone, 60),
    service: clean(body.service, 120),
    mark: clean(body.mark, 200),
    message,
  };

  // A lead is only lost if EVERY sink fails, so the form keeps working whether
  // the site is on a normal server or on a read-only serverless filesystem.
  let delivered = false;

  // 1. The JSON file. Works locally and on any host with a writable disk.
  //    On Vercel's serverless filesystem this throws EROFS, which is expected.
  try {
    fs.mkdirSync(path.dirname(LEADS_PATH), { recursive: true });
    let leads: unknown[] = [];
    try {
      const raw = fs.readFileSync(LEADS_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) leads = parsed;
    } catch {
      leads = [];
    }
    leads.unshift(lead);
    fs.writeFileSync(LEADS_PATH, JSON.stringify(leads.slice(0, MAX_LEADS), null, 2) + '\n', 'utf8');
    delivered = true;
  } catch {
    /* read-only filesystem — fall through to the other sinks */
  }

  // 2. The server log. On Vercel this lands in the function logs, so a lead is
  //    recoverable even with no webhook configured.
  console.log('[lead]', JSON.stringify(lead));
  delivered = true;

  // 3. Optional webhook. Set LEAD_WEBHOOK_URL to anything that accepts a JSON
  //    POST — a Zapier/Make hook, a Google Apps Script, a Slack or Discord
  //    incoming webhook — and every submission is forwarded there.
  const hook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (hook) {
    try {
      await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      /* the lead is already logged; a failed webhook is not the user's problem */
    }
  }

  if (!delivered) {
    return NextResponse.json(
      { error: 'Could not save that message. Please email us directly.' },
      { status: 500 },
    );
  }

  const next = rec && rec.until > now ? rec : { count: 0, until: now + 10 * 60 * 1000 };
  next.count += 1;
  rate.set(key, next);

  return NextResponse.json({ ok: true });
}
