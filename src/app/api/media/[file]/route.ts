import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads');

const TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/**
 * Fallback for logos in public/uploads.
 *
 * Uploaded logos live in public/uploads so they are committed to git and served
 * as static CDN assets on a deploy. That covers dev (`next dev` reads public/
 * live) and every deployed build. The one gap is a local `next start` run
 * against a build made before the upload: Next fixes its static asset list at
 * build time, so that file would 404.
 *
 * next.config.mjs therefore rewrites /uploads/:file here, and the rewrite only
 * fires when no static file matched. On a real deploy this route is never hit.
 */
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  // Only a plain filename is ever accepted — no slashes, no traversal.
  const name = path.basename(String(params.file || ''));
  if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const type = TYPES[ext];
  if (!type) return new NextResponse('Not found', { status: 404 });

  const full = path.join(MEDIA_DIR, name);
  if (!full.startsWith(MEDIA_DIR)) return new NextResponse('Not found', { status: 404 });

  try {
    const buf = fs.readFileSync(full);
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        'Content-Type': type,
        'Content-Length': String(buf.byteLength),
        // Filenames carry a timestamp and a random suffix, so a given URL never
        // changes content and can be cached hard.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
