import Link from 'next/link';
import type { ReactNode } from 'react';
import type { SiteConfig, Stat } from '@/lib/config';
import { IconArrow, IconCheck, ServiceIcon } from './Icons';
import Counter from './Counter';

/* ------------------------------------------------------------------ layout */

export function Section({
  children,
  tone = 'page',
  id,
  className = '',
}: {
  children: ReactNode;
  tone?: 'page' | 'surface' | 'primary' | 'soft';
  id?: string;
  className?: string;
}) {
  const bg =
    tone === 'surface'
      ? 'var(--c-surface)'
      : tone === 'primary'
        ? 'var(--c-primary-dark)'
        : tone === 'soft'
          ? 'var(--c-primary-soft)'
          : 'var(--c-page)';
  return (
    <section
      id={id}
      style={{ background: bg }}
      className={`py-16 sm:py-20 lg:py-[5.5rem] ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  max = 'max-w-2xl',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  max?: string;
}) {
  return (
    <div
      data-reveal
      className={align === 'center' ? `mx-auto ${max} text-center` : `${max}`}
    >
      {eyebrow ? (
        <p
          className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}
          style={light ? { color: 'var(--c-accent)' } : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4" style={light ? { color: '#fff' } : undefined}>
        {title}
      </h2>
      {intro ? (
        <div
          className="lede mt-4"
          style={light ? { color: 'rgba(255,255,255,.76)' } : undefined}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------- stats */

export function StatBand({ items, light = false }: { items: Stat[]; light?: boolean }) {
  if (!items.length) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 lg:grid-cols-4">
      {items.map((s, i) => (
        <div
          key={s.label}
          data-reveal
          style={{ ['--reveal-delay' as any]: `${i * 70}ms` }}
          className="relative pl-4 sm:pl-5"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full"
            style={{ background: 'var(--c-accent)' }}
          />
          <dd
            className="font-display text-[2rem] font-bold leading-none tracking-tight sm:text-[2.4rem]"
            style={{ color: light ? '#fff' : 'var(--c-ink)' }}
          >
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
          <dt
            className="mt-2.5 text-[0.8125rem] font-medium leading-snug sm:text-sm"
            style={{ color: light ? 'rgba(255,255,255,.7)' : 'var(--c-muted)' }}
          >
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------- cards */

export function ServiceCard({
  slug,
  name,
  summary,
  icon,
  priceFrom,
  index = 0,
}: {
  slug: string;
  name: string;
  summary: string;
  icon: string;
  priceFrom?: string;
  index?: number;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      data-reveal
      style={{ ['--reveal-delay' as any]: `${(index % 3) * 80}ms` }}
      className="card card-hover group flex flex-col"
    >
      <span className="icon-tile transition-colors duration-300 group-hover:bg-[var(--c-primary)] group-hover:text-white">
        <ServiceIcon name={icon} className="h-[22px] w-[22px]" />
      </span>
      <h3 className="mt-5">{name}</h3>
      <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed">{summary}</p>
      <span className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t pt-4 text-sm font-semibold">
        {priceFrom ? (
          <span style={{ color: 'var(--c-muted)' }} className="whitespace-nowrap text-[0.8125rem] font-medium">
            From <span style={{ color: 'var(--c-ink)' }}>{priceFrom}</span>
          </span>
        ) : (
          <span />
        )}
        <span
          className="inline-flex shrink-0 items-center gap-1.5"
          style={{ color: 'var(--c-primary)' }}
        >
          Learn more
          <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

export function FeatureItem({
  title,
  text,
  index = 0,
}: {
  title: string;
  text: string;
  index?: number;
}) {
  return (
    <li
      data-reveal
      style={{ ['--reveal-delay' as any]: `${(index % 3) * 70}ms` }}
      className="flex gap-4"
    >
      <span
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
        style={{ background: 'var(--c-accent-soft)', color: 'var(--c-primary)' }}
        aria-hidden
      >
        <IconCheck className="h-4 w-4" />
      </span>
      <div>
        <h3 className="text-[1.0625rem]">{title}</h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{text}</p>
      </div>
    </li>
  );
}

export function StepList({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {steps.map((s, i) => (
        <li
          key={s.title}
          data-reveal
          style={{ ['--reveal-delay' as any]: `${i * 90}ms` }}
          className="relative"
        >
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-[0.9rem] font-bold"
              style={{ background: 'var(--c-primary)', color: '#fff' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              aria-hidden
              className="hidden h-px flex-1 lg:block"
              style={{
                background:
                  i === steps.length - 1
                    ? 'transparent'
                    : 'linear-gradient(90deg, var(--c-line), transparent)',
              }}
            />
          </div>
          <h3 className="mt-4">{s.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------- page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  actions,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: 'var(--c-surface)' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: 'var(--c-accent)' }}
      />
      <span
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          maskImage: 'radial-gradient(70% 60% at 50% 0%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 0%, #000, transparent)',
        }}
      />
      <div className="shell relative py-14 sm:py-16 lg:py-20">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem]">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="link-underline"
                      style={{ color: 'var(--c-muted)' }}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span style={{ color: 'var(--c-ink)' }} className="font-medium">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <span aria-hidden style={{ color: 'var(--c-muted)' }}>
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-4 max-w-3xl">{title}</h1>
        {intro ? <p className="lede mt-5 max-w-2xl">{intro}</p> : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- cta band */

export function CtaBand({
  cfg,
  title,
  text,
}: {
  cfg: SiteConfig;
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--c-primary-dark)' }}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'var(--c-accent)' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-40 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'var(--c-primary)' }}
      />
      <div className="shell relative py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div data-reveal className="max-w-2xl">
            <h2 style={{ color: '#fff' }}>
              {title ?? 'Protect your brand before someone else does'}
            </h2>
            <p className="lede mt-4" style={{ color: 'rgba(255,255,255,.75)' }}>
              {text ??
                `Start with a free knock-out search. Send us the name and what you sell, and ${cfg.brand.name} will tell you plainly whether it is worth filing.`}
            </p>
          </div>
          <div data-reveal className="flex shrink-0 flex-wrap gap-3">
            <Link href="/contact" className="btn btn-accent">
              Get a free search
            </Link>
            <a href={`mailto:${cfg.contact.email}`} className="btn btn-ghost-light">
              {cfg.contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- disclaimer */

/**
 * QA #6, #26, #27: one disclaimer, factually accurate, consistent with the
 * Terms, and rendered from the same source everywhere it appears.
 */
export function disclaimerText(cfg: SiteConfig) {
  const entity = cfg.brand.legalEntity?.trim() || cfg.brand.name;
  return `${cfg.brand.name} is a document preparation and filing service. ${entity} is not a law firm, does not provide legal advice or legal representation, and no attorney-client relationship is created by using this site or our services. We prepare and file the documents you instruct us to file. For legal advice about your rights, consult a licensed attorney. ${cfg.brand.name} is not affiliated with, endorsed by, or connected to the United States Patent and Trademark Office, the United States Copyright Office, or any other government agency. Government filing fees are set by those agencies, are paid directly to them, and are separate from our service fees.`;
}
