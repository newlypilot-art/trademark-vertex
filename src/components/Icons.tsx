import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export const IconShield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6l-7-3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
    <path d="M18.5 16.5 19.3 19l2.5.8-2.5.8-.8 2.5" opacity=".5" />
  </svg>
);

export const IconReply = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 7 4.5 11.5 9 16" />
    <path d="M4.5 11.5H14a5.5 5.5 0 0 1 5.5 5.5v1.5" />
  </svg>
);

export const IconRefresh = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.5 12a7.5 7.5 0 1 1-2.4-5.5" />
    <path d="M19.7 4.5v4h-4" />
  </svg>
);

export const IconRadar = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" opacity=".55" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <path d="M12 12 18 6" />
  </svg>
);

export const IconDoc = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7l-4-4Z" />
    <path d="M14 3v4h4M9 12.5h6M9 16h4" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.4 12.2 2.4 2.4 4.8-5" />
  </svg>
);

export const IconBolt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 3 6 13.4h5L11 21l7-10.4h-5L13 3Z" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h13.5M13 6.5 18.5 12 13 17.5" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="m3.8 7 7.3 5.3a1.5 1.5 0 0 0 1.8 0L20.2 7" />
  </svg>
);

export const IconQuote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M9.6 5.4c-3.4 1.5-5.4 4.3-5.4 7.9 0 3.2 1.8 5.3 4.3 5.3 2.1 0 3.7-1.5 3.7-3.6 0-2-1.4-3.4-3.3-3.4-.4 0-.7 0-1 .2.4-1.6 1.7-3 3.4-3.9l-1.7-2.5Zm9.3 0c-3.4 1.5-5.4 4.3-5.4 7.9 0 3.2 1.8 5.3 4.3 5.3 2.1 0 3.7-1.5 3.7-3.6 0-2-1.4-3.4-3.3-3.4-.4 0-.7 0-1 .2.4-1.6 1.7-3 3.4-3.9l-1.7-2.5Z" />
  </svg>
);

export const IconStar = ({ filled = true, ...p }: P & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
    {...p}
  >
    <path d="m12 3.6 2.6 5.3 5.9.86-4.25 4.15 1 5.86L12 17l-5.25 2.77 1-5.86L3.5 9.76l5.9-.86L12 3.6Z" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </svg>
);

export const IconChevron = (p: P) => (
  <svg {...base} {...p}>
    <path d="m7 10 5 5 5-5" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const serviceIcons: Record<string, (p: P) => JSX.Element> = {
  shield: IconShield,
  search: IconSearch,
  spark: IconSpark,
  reply: IconReply,
  refresh: IconRefresh,
  radar: IconRadar,
  doc: IconDoc,
  clock: IconClock,
  check: IconCheck,
  bolt: IconBolt,
};

export function ServiceIcon({ name, ...p }: P & { name: string }) {
  const C = serviceIcons[name] ?? IconShield;
  return <C {...p} />;
}

/** Fallback wordmark used when no logo has been uploaded in the dashboard. */
export function BrandMark({
  name,
  short,
  tone = 'dark',
  height = 40,
}: {
  name: string;
  short: string;
  tone?: 'dark' | 'light';
  /** Matches the uploaded-logo slot height so the fallback never jumps size. */
  height?: number;
}) {
  const light = tone === 'light';
  const tile = Math.round(height * 0.82);
  return (
    <span className="flex items-center" style={{ gap: Math.round(tile * 0.28) }}>
      <span
        className="grid shrink-0 place-items-center font-bold tracking-tight"
        style={{
          height: tile,
          width: tile,
          borderRadius: Math.round(tile * 0.3),
          fontSize: Math.round(tile * 0.36),
          background: light ? 'rgba(255,255,255,.14)' : 'var(--c-primary)',
          color: '#fff',
          boxShadow: light ? 'inset 0 0 0 1px rgba(255,255,255,.28)' : 'none',
        }}
        aria-hidden
      >
        {(short || name.slice(0, 2)).slice(0, 2).toUpperCase()}
      </span>
      <span
        className="font-display font-semibold leading-none tracking-tight"
        style={{
          color: light ? '#fff' : 'var(--c-ink)',
          fontSize: Math.round(tile * 0.46),
        }}
      >
        {name}
      </span>
    </span>
  );
}
