import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'tv_dash';

function secret(): string {
  return process.env.DASHBOARD_SECRET || 'insecure-development-secret-change-me';
}

export function dashboardPassword(): string {
  return process.env.DASHBOARD_PASSWORD || 'admin';
}

/** Constant-time compare so the password can't be guessed by timing. */
export function passwordMatches(input: string): boolean {
  const expected = Buffer.from(dashboardPassword());
  const got = Buffer.from(String(input ?? ''));
  if (expected.length !== got.length) return false;
  return crypto.timingSafeEqual(expected, got);
}

export function createToken(ttlMs = 1000 * 60 * 60 * 12): string {
  const expires = Date.now() + ttlMs;
  const payload = String(expires);
  const sig = crypto.createHmac('sha256', secret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('hex');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(payload) > Date.now();
}

export function isAuthed(): boolean {
  return verifyToken(cookies().get(SESSION_COOKIE)?.value);
}
