'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to a numeric value once the tile scrolls into view.
 * Non-numeric values (or reduced-motion users) simply render as-is.
 */
export default function Counter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = Number(value.replace(/[, ]/g, ''));
  const isNumeric = Number.isFinite(numeric) && value.trim() !== '';
  const decimals = (value.split('.')[1] || '').length;
  // Starts at the real value so the server-rendered HTML — and anyone with
  // JavaScript disabled — always sees the true number, never a zero.
  const [shown, setShown] = useState<number | null>(isNumeric ? numeric : null);

  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(numeric);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setShown(0);
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(numeric * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isNumeric, numeric]);

  const text =
    !isNumeric || shown === null
      ? value
      : shown.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}
