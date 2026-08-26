import Link from 'next/link';
import { getConfig } from '@/lib/config';
import { services } from '@/lib/services';
import { IconArrow } from '@/components/Icons';
import SiteChrome from '@/components/SiteChrome';

export default function NotFound() {
  const cfg = getConfig();

  return (
    <SiteChrome>
    <section className="relative overflow-hidden" style={{ background: 'var(--c-surface)' }}>
      <span
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-50"
        style={{
          maskImage: 'radial-gradient(60% 60% at 50% 0%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(60% 60% at 50% 0%, #000, transparent)',
        }}
      />
      <div className="shell relative py-20 text-center sm:py-28">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mx-auto mt-5 max-w-2xl">This page does not exist</h1>
        <p className="lede mx-auto mt-5 max-w-xl">
          The link may be out of date, or the address may have a typo in it. Everything {cfg.brand.name}{' '}
          does is one click away below.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
            <IconArrow className="h-[18px] w-[18px]" />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Free trademark search
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--c-muted)' }}>
            Popular pages
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {[
              { label: 'All services', href: '/services' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Our process', href: '/process' },
              ...services.slice(0, 5).map((s) => ({ label: s.navName, href: `/services/${s.slug}` })),
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors"
                  style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)', color: 'var(--c-body)' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </SiteChrome>
  );
}
