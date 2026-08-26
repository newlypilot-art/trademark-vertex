import type { ReactNode } from 'react';

export type LegalSection = { id: string; title: string; body: ReactNode[] };

export default function LegalDoc({
  updated,
  sections,
}: {
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-14">
      <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
        <p
          className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: 'var(--c-muted)' }}
        >
          On this page
        </p>
        <ol className="mt-4 space-y-1.5">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-2 text-[0.8125rem] leading-snug transition-colors hover:bg-[var(--c-surface)]"
                style={{ color: 'var(--c-body)' }}
              >
                <span style={{ color: 'var(--c-muted)' }}>{i + 1}.</span> {s.title}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>
          Last updated {updated}
        </p>
      </nav>

      <div className="max-w-3xl">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 border-t py-9 first:border-t-0 first:pt-0">
            <h2 className="font-display text-[1.35rem] font-semibold sm:text-[1.5rem]">
              <span style={{ color: 'var(--c-muted)' }} className="mr-2 font-normal">
                {i + 1}.
              </span>
              {s.title}
            </h2>
            <div className="prose-block mt-4 text-[0.9375rem]">
              {s.body.map((b, j) => (
                <div key={j} className="mb-5 last:mb-0 leading-[1.8]">
                  {b}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark
      className="rounded px-1.5 py-0.5 font-semibold"
      style={{ background: 'var(--c-accent-soft)', color: 'var(--c-primary)' }}
    >
      {children}
    </mark>
  );
}
