import Link from 'next/link';
import type { SiteConfig } from '@/lib/config';
import { IconArrow, IconCheck } from './Icons';

export default function PricingCards({ cfg }: { cfg: SiteConfig }) {
  const plans = cfg.pricing.plans;
  if (!plans.length) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {plans.map((p, i) => {
        const featured = p.featured;
        return (
          <div
            key={p.id}
            data-reveal
            style={{ ['--reveal-delay' as any]: `${i * 90}ms` }}
            className={`relative flex flex-col rounded-[1.4rem] p-7 pt-10 transition-all duration-300 sm:p-8 sm:pt-11 ${
              featured ? 'lg:-mt-4 lg:pb-10' : ''
            }`}
          >
            <PlanSurface featured={featured} />

            <div className="relative">
              {featured ? (
                <span
                  className="absolute -top-[2.2rem] left-0 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em]"
                  style={{ background: 'var(--c-accent)', color: '#04241c' }}
                >
                  Most chosen
                </span>
              ) : null}

              <h3
                className="font-display text-lg font-semibold"
                style={{ color: featured ? '#fff' : 'var(--c-ink)' }}
              >
                {p.name}
              </h3>
              <p
                className="mt-2 min-h-[3rem] text-[0.875rem] leading-relaxed"
                style={{ color: featured ? 'rgba(255,255,255,.72)' : 'var(--c-muted)' }}
              >
                {p.summary}
              </p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span
                  className="font-display text-[2.6rem] font-bold leading-none tracking-tight"
                  style={{ color: featured ? '#fff' : 'var(--c-ink)' }}
                >
                  ${p.price}
                </span>
                <span
                  className="text-[0.875rem] font-medium"
                  style={{ color: featured ? 'rgba(255,255,255,.66)' : 'var(--c-muted)' }}
                >
                  + USPTO fee
                </span>
              </p>
              <p
                className="mt-2 text-[0.78rem]"
                style={{ color: featured ? 'rgba(255,255,255,.55)' : 'var(--c-muted)' }}
              >
                Government fee {cfg.pricing.usptoFee}, paid directly to the USPTO.
              </p>

              <Link
                href="/contact"
                className={`btn mt-7 w-full ${featured ? 'btn-accent' : 'btn-outline'}`}
              >
                {p.cta || `Choose ${p.name}`}
                <IconArrow className="h-4 w-4" />
              </Link>

              <p
                className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
                style={{ color: featured ? 'rgba(255,255,255,.5)' : 'var(--c-muted)' }}
              >
                What is included
              </p>
              <ul className="mt-4 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <IconCheck
                      className="mt-[3px] h-[17px] w-[17px] shrink-0"
                      style={{ color: featured ? 'var(--c-accent)' : 'var(--c-primary)' }}
                    />
                    <span
                      className="text-[0.875rem] leading-relaxed"
                      style={{ color: featured ? 'rgba(255,255,255,.82)' : 'var(--c-body)' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Paints the card background behind the content so the featured plan can go dark. */
function PlanSurface({ featured }: { featured: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute inset-0 rounded-[1.4rem] border"
      style={
        featured
          ? {
              background:
                'linear-gradient(165deg, var(--c-primary) 0%, var(--c-primary-dark) 100%)',
              borderColor: 'transparent',
              boxShadow: '0 30px 60px -32px rgba(15,23,42,.5)',
            }
          : {
              background: 'var(--c-page)',
              borderColor: 'var(--c-line)',
            }
      }
    />
  );
}
