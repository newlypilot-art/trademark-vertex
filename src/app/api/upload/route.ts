import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { dashboardEnabled } from '@/lib/flags';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SLOTS = new Set(['header', 'footer', 'favicon']);
const MAX_BYTES = 4 * 1024 * 1024; // 4MB after cropping is plenty for a logo.

/**
 * Cropped logos are written into public/uploads so they are ordinary static
 * assets: you commit them to git alongside data/site-config.json, and the host
 * (Vercel included) serves them straight from its CDN on the deployed site.
 *
 * `next dev` serves anything in public/ immediately, so a freshly cropped logo
 * shows up without a restart. A local `next start` would not — its static asset
 * list is fixed at build time — so next.config.mjs rewrites /uploads/:file to
 * /api/media/:file as a fallback for exactly that case.
 */
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

/** Production deploys have no dashboard, so this endpoint must not exist. */
function disabled() {
  return new NextResponse('Not found', { status: 404 });
}

export async function POST(req: Request) {
  if (!dashboardEnabled()) return disabled();
  if (!isAuthed()) return NextResponse.json({ error: 'Not authorised' }, { status: 401 });

  let slot = '';
  let dataUrl = '';
  try {
    ({ slot, dataUrl } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!SLOTS.has(slot)) {
    return NextResponse.json({ error: 'Unknown image slot.' }, { status: 400 });
  }

  const match = /^data:image\/(png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!match) {
    return NextResponse.json(
      { error: 'Expected a cropped PNG or WebP image.' },
      { status: 400 },
    );
  }

  const [, ext, b64] = match;
  const buffer = Buffer.from(b64, 'base64');
  if (buffer.byteLength > MAX_BYTES) {
    return NextResponse.json(
      { error: 'That image is too large. Crop it smaller or use a simpler file.' },
      { status: 413 },
    );
  }

  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const name = `${slot}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buffer);

    // Tidy up: keep the five most recent files per slot so the folder does not
    // grow forever as logos are re-cropped.
    const stale = fs
      .readdirSync(UPLOAD_DIR)
      .filter((f) => f.startsWith(`${slot}-`))
      .sort()
      .reverse()
      .slice(5);
    for (const f of stale) {
      try {
        fs.unlinkSync(path.join(UPLOAD_DIR, f));
      } catch {
        /* ignore */
      }
    }

    return NextResponse.json({ ok: true, url: `/uploads/${name}` });
  } catch {
    return NextResponse.json(
      { error: 'Could not write the file. Check that public/uploads is writable.' },
      { status: 500 },
    );
  }
}
