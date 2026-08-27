'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SiteConfig, Testimonial } from '@/lib/config';
import { IconArrow, IconQuote, IconStar } from './Icons';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

function Stars({ rating = 5 }: { rating?: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${full} out of 5`}
      style={{ color: 'var(--c-accent)' }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} filled={i < full} className="h-[15px] w-[15px]" />
      ))}
    </div>
  );
}

export default function Testimonials({ cfg }: { cfg: SiteConfig }) {
  const items = cfg.testimonials.items;
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / Math.max(1, el.clientWidth)));
    setPages(total);
    setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    const onScroll = () => setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const goTo = useCallback((p: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: p * el.clientWidth, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused || pages < 2) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = (Math.round(el.scrollLeft / Math.max(1, el.clientWidth)) + 1) % pages;
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
    }, 6500);
    return () => clearInterval(id);
  }, [paused, pages]);

  if (!cfg.testimonials.enabled || !items.length) return null;

  const avg =
    items.reduce((sum, t) => sum + (t.rating ?? 5), 0) / items.length;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'var(--c-surface)' }}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[24rem] w-[24rem] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: 'var(--c-primary)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[22rem] w-[22rem] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'var(--c-accent)' }}
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal className="max-w-xl">
            <p className="eyebrow">Client satisfaction</p>
            <h2 className="mt-4">{cfg.testimonials.heading}</h2>
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={avg} />
              <span className="text-sm font-semibold" style={{ color: 'var(--c-ink)' }}>
                {avg.toFixed(1)} average
              </span>
              <span className="text-sm" style={{ color: 'var(--c-muted)' }}>
                from {items.length} reviewed engagements
              </span>
            </div>
          </div>

          <div data-reveal className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border transition-all disabled:opacity-35"
              style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)', color: 'var(--c-ink)' }}
            >
              <IconArrow className="h-[18px] w-[18px] rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(pages - 1, page + 1))}
              disabled={page >= pages - 1}
              aria-label="Next testimonials"
              className="grid h-11 w-11 place-items-center rounded-full border transition-all disabled:opacity-35"
              style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)', color: 'var(--c-ink)' }}
            >
              <IconArrow className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          {items.map((t, i) => (
            <Card key={t.name + i} t={t} index={i} />
          ))}
        </div>

        {pages > 1 ? (
          <div className="mt-7 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                aria-current={i === page}
                className="h-[6px] rounded-full transition-all duration-300"
                style={{
                  width: i === page ? 30 : 10,
                  background: i === page ? 'var(--c-primary)' : 'var(--c-line)',
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  return (
    // No data-reveal here on purpose: cards sit inside a horizontally scrolling
    // track, so the ones off to the side never intersect the viewport and would
    // still be at opacity 0 the moment you page the carousel to them.
    <figure
      style={{ ['--reveal-delay' as any]: `${(index % 3) * 90}ms` }}
      className="group relative w-[86vw] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.3333%-0.834rem)]"
    >
      {/* gradient hairline frame */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[1.4rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(150deg, var(--c-accent), transparent 55%)',
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border p-7 transition-all duration-300 group-hover:-translate-y-1.5"
        style={{
          background: 'var(--c-page)',
          borderColor: 'var(--c-line)',
          boxShadow: '0 1px 2px rgba(15,23,42,.04)',
        }}
      >
        <span
          aria-hidden
          className="absolute -right-3 -top-4 opacity-[0.09] transition-all duration-500 group-hover:opacity-[0.16] group-hover:-translate-y-1"
          style={{ color: 'var(--c-primary)' }}
        >
          <IconQuote className="h-24 w-24" />
        </span>

        <Stars rating={t.rating ?? 5} />

        <blockquote className="relative mt-5 flex-1">
          <p className="text-[0.9625rem] leading-[1.75]" style={{ color: 'var(--c-body)' }}>
            {t.quote}
          </p>
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5 border-t pt-5">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[0.8rem] font-bold text-white"
            style={{
              background: 'linear-gradient(140deg, var(--c-primary), var(--c-accent))',
              boxShadow: '0 0 0 3px var(--c-accent-soft)',
            }}
            aria-hidden
          >
            {initials(t.name)}
          </span>
          <span className="min-w-0">
            <span
              className="block font-display text-[0.9375rem] font-semibold"
              style={{ color: 'var(--c-ink)' }}
            >
              {t.name}
            </span>
            <span className="block text-[0.8125rem]" style={{ color: 'var(--c-muted)' }}>
              {t.role}
              {t.location ? ` · ${t.location}` : ''}
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
