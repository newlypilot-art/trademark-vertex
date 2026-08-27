'use client';

import { useCallback, useRef, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

export type Slot = 'header' | 'footer' | 'favicon';

export const SLOT_SPEC: Record<
  Slot,
  { label: string; aspect: number; out: [number, number]; help: string; preview: string }
> = {
  header: {
    label: 'Header logo',
    aspect: 4 / 1,
    out: [640, 160],
    help: 'Cropped to the shape of the header slot — 4:1. Set the rendered height below.',
    preview: 'light',
  },
  footer: {
    label: 'Footer logo',
    aspect: 4 / 1,
    out: [640, 160],
    help: 'Cropped to the footer slot — 4:1, shown here on the dark footer background.',
    preview: 'dark',
  },
  favicon: {
    label: 'Favicon',
    aspect: 1,
    out: [256, 256],
    help: 'Square, 1:1. This becomes the browser tab icon and the bookmark icon.',
    preview: 'light',
  },
};

/** Draws the selected crop onto a canvas at the slot's output size. */
async function renderCrop(src: string, area: Area, out: [number, number]): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = out[0];
  canvas.height = out[1];
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available');
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return canvas.toDataURL('image/png');
}

export default function LogoCropper({
  slot,
  value,
  onChange,
  renderHeight,
}: {
  slot: Slot;
  value: string;
  onChange: (url: string) => void;
  /** Preview at the exact height the site will render it at. */
  renderHeight?: number;
}) {
  const spec = SLOT_SPEC[slot];
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onCropComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), []);

  function pickFile(file?: File) {
    setError('');
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('That file is over 8MB. Please use a smaller one.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(String(reader.result));
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }

  async function save() {
    if (!src || !area) return;
    setBusy(true);
    setError('');
    try {
      const dataUrl = await renderCrop(src, area, spec.out);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot, dataUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Upload failed');
      onChange(json.url);
      setSrc(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (e: any) {
      setError(e?.message || 'Something went wrong uploading that.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1rem] font-semibold">{spec.label}</h3>
          <p className="mt-1 text-[0.8125rem]" style={{ color: 'var(--c-muted)' }}>
            {spec.help}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline !px-4 !py-2 !text-[0.8125rem]" onClick={() => inputRef.current?.click()}>
            {value ? 'Replace' : 'Upload'}
          </button>
          {value ? (
            <button
              type="button"
              className="btn btn-outline !px-4 !py-2 !text-[0.8125rem]"
              onClick={() => onChange('')}
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="sr-only"
        aria-label={`Upload ${spec.label}`}
        onChange={(e) => pickFile(e.target.files?.[0])}
      />

      {/* Current value preview, shown against the background it will really sit on */}
      <div
        className="mt-4 grid place-items-center rounded-xl border p-5"
        style={{
          borderColor: 'var(--c-line)',
          background: spec.preview === 'dark' ? 'var(--c-primary-dark)' : 'var(--c-surface)',
          minHeight: Math.max(96, (renderHeight ?? 48) + 44),
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={`${spec.label} preview`}
            className={
              slot === 'favicon'
                ? 'h-12 w-12 object-contain'
                : 'w-auto max-w-[300px] object-contain'
            }
            style={slot === 'favicon' ? undefined : { height: renderHeight ?? 48 }}
          />
        ) : (
          <p className="text-[0.8125rem]" style={{ color: spec.preview === 'dark' ? 'rgba(255,255,255,.6)' : 'var(--c-muted)' }}>
            {slot === 'favicon'
              ? 'Nothing uploaded — the site uses the built-in shield icon.'
              : 'Nothing uploaded — the site falls back to the text wordmark.'}
          </p>
        )}
      </div>

      {src ? (
        <div className="mt-4">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ height: 240, background: '#0f172a' }}
          >
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={spec.aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="contain"
              restrictPosition={false}
              showGrid
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex flex-1 items-center gap-3 text-[0.8125rem] font-medium">
              Zoom
              <input
                type="range"
                min={0.4}
                max={4}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[var(--c-primary)]"
                aria-label="Zoom"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-outline !px-4 !py-2 !text-[0.8125rem]"
                onClick={() => {
                  setSrc(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary !px-4 !py-2 !text-[0.8125rem]"
                onClick={save}
                disabled={busy}
              >
                {busy ? 'Uploading…' : 'Crop and use'}
              </button>
            </div>
          </div>
          <p className="mt-2 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>
            Drag to reposition. The frame is locked to {spec.aspect === 1 ? '1:1' : '4:1'} so the result
            fits the {slot} slot exactly. Output {spec.out[0]}×{spec.out[1]}px PNG with transparency
            preserved — enough resolution for a retina screen at any height you pick.
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="mt-3 text-[0.8125rem] font-medium" style={{ color: '#b42318' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
