import { IconCheck, IconShield } from './Icons';

const timeline = [
  { label: 'Application filed', meta: 'Serial 98/412,660', done: true },
  { label: 'Examiner assigned', meta: 'Law office 118', done: true },
  { label: 'Published for opposition', meta: '30-day window', done: true },
  { label: 'Registration certificate', meta: 'In progress', done: false },
];

/**
 * A hand-built illustration of what clients actually get: a case they can see.
 * No stock photography, no licensing exposure, and it inherits the theme.
 */
export default function HeroPanel({ brand }: { brand: string }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] opacity-30 blur-2xl"
        style={{ background: 'linear-gradient(150deg, var(--c-accent), transparent 60%)' }}
      />

      <div
        className="relative rounded-[1.6rem] border p-6 shadow-lift sm:p-7"
        style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: 'var(--c-muted)' }}
            >
              Case status
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold" style={{ color: 'var(--c-ink)' }}>
              NORTHBOUND COFFEE
            </p>
            <p className="mt-0.5 text-[0.8125rem]" style={{ color: 'var(--c-muted)' }}>
              Class 30 · Roasted coffee beans
            </p>
          </div>
          <span
            className="chip shrink-0"
            style={{ background: 'var(--c-accent-soft)', color: 'var(--c-primary)' }}
          >
            <IconShield className="h-3.5 w-3.5" />
            Live
          </span>
        </div>

        <ol className="mt-6 space-y-4">
          {timeline.map((t, i) => (
            <li key={t.label} className="relative flex gap-3.5">
              {i < timeline.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[11px] top-6 h-[calc(100%+0.4rem)] w-px"
                  style={{ background: t.done ? 'var(--c-accent)' : 'var(--c-line)' }}
                />
              ) : null}
              <span
                aria-hidden
                className="relative z-10 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full"
                style={{
                  background: t.done ? 'var(--c-accent)' : 'var(--c-page)',
                  color: t.done ? '#fff' : 'var(--c-muted)',
                  boxShadow: t.done ? 'none' : 'inset 0 0 0 1.5px var(--c-line)',
                }}
              >
                {t.done ? <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
              </span>
              <span className="min-w-0 pb-0.5">
                <span
                  className="block text-[0.875rem] font-semibold"
                  style={{ color: t.done ? 'var(--c-ink)' : 'var(--c-muted)' }}
                >
                  {t.label}
                </span>
                <span className="block text-[0.78rem]" style={{ color: 'var(--c-muted)' }}>
                  {t.meta}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div
          className="mt-6 rounded-xl px-4 py-3.5 text-[0.8125rem] leading-relaxed"
          style={{ background: 'var(--c-surface)', color: 'var(--c-body)' }}
        >
          Every client gets email updates at each stage — no chasing, no logging in to guess.
        </div>
      </div>

      {/* Offset companion card — stacked, never overlapping the panel content */}
      <div
        className="relative mt-4 hidden w-[16rem] rounded-2xl border p-4 shadow-lift sm:block sm:-ml-5 lg:-ml-14"
        style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--c-muted)' }}>
          Clearance result
        </p>
        <p className="mt-2 font-display text-2xl font-bold" style={{ color: 'var(--c-primary)' }}>
          Low risk
        </p>
        <p className="mt-1 text-[0.8rem] leading-snug" style={{ color: 'var(--c-muted)' }}>
          No blocking marks found across federal, state and common-law sources.
        </p>
        <p className="mt-3 text-[0.7rem] font-medium" style={{ color: 'var(--c-muted)' }}>
          {brand} search report
        </p>
      </div>
    </div>
  );
}
