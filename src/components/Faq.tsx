'use client';

import { useState } from 'react';
import { IconPlus } from './Icons';

export default function Faq({
  items,
  columns = 1,
}: {
  items: { q: string; a: string }[];
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <div className={columns === 2 ? 'grid gap-3 lg:grid-cols-2 lg:items-start' : 'space-y-3'}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            data-reveal
            style={{ ['--reveal-delay' as any]: `${(i % 4) * 60}ms` }}
            className="overflow-hidden rounded-2xl border transition-colors"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                style={{ background: isOpen ? 'var(--c-surface)' : 'var(--c-page)' }}
              >
                <span
                  className="font-display text-[0.9375rem] font-semibold sm:text-base"
                  style={{ color: 'var(--c-ink)' }}
                >
                  {item.q}
                </span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full transition-transform duration-300"
                  style={{
                    background: isOpen ? 'var(--c-primary)' : 'var(--c-primary-soft)',
                    color: isOpen ? '#fff' : 'var(--c-primary)',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                  }}
                  aria-hidden
                >
                  <IconPlus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6 sm:pb-6"
              style={{ background: 'var(--c-surface)' }}
            >
              <p className="text-[0.9375rem] leading-[1.75]">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
