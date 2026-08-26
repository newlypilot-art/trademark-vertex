import Link from 'next/link';
import type { SiteConfig } from '@/lib/config';
import { services } from '@/lib/services';
import { disclaimerText } from './Blocks';
import { BrandMark, IconMail } from './Icons';

const company = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Our process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms and conditions', href: '/terms-and-conditions' },
  { label: 'Legal disclaimer', href: '/disclaimer' },
];

export default function Footer({ cfg }: { cfg: SiteConfig }) {
  const year = new Date().getFullYear(); // QA #25 - always current, never a range.
  const tel = cfg.contact.phone.replace(/[^\d+]/g, '');

  return (
    <footer style={{ background: 'var(--c-primary-dark)' }}>
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label={`${cfg.brand.name} home`} className="inline-flex">
              {cfg.logos.footer ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cfg.logos.footer}
                  alt={cfg.logos.footerAlt || cfg.brand.name}
                  className="h-10 w-auto max-w-[220px] object-contain"
                  width={220}
                  height={55}
                />
              ) : (
                <BrandMark name={cfg.brand.name} short={cfg.brand.shortName} tone="light" />
              )}
            </Link>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed" style={{ color: 'rgba(255,255,255,.66)' }}>
              {cfg.brand.tagline}
            </p>
            <div className="mt-6 space-y-2.5 text-[0.9rem]">
              <a
                href={`mailto:${cfg.contact.email}`}
                className="inline-flex items-center gap-2.5 font-medium transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,.86)' }}
              >
                <IconMail className="h-[18px] w-[18px]" />
                {cfg.contact.email}
              </a>
              {cfg.contact.phone ? (
                <div>
                  <a
                    href={`tel:${tel}`}
                    className="font-medium transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,.86)' }}
                  >
                    {cfg.contact.phone}
                  </a>
                </div>
              ) : null}
              {cfg.contact.addressLine1 ? (
                <address className="not-italic" style={{ color: 'rgba(255,255,255,.6)' }}>
                  {cfg.contact.addressLine1}
                  {cfg.contact.addressLine2 ? (
                    <>
                      <br />
                      {cfg.contact.addressLine2}
                    </>
                  ) : null}
                </address>
              ) : null}
              {cfg.contact.hours ? (
                <p style={{ color: 'rgba(255,255,255,.6)' }}>{cfg.contact.hours}</p>
              ) : null}
            </div>
          </div>

          <FooterCol title="Services" links={services.slice(0, 6).map((s) => ({ label: s.navName, href: `/services/${s.slug}` }))} />
          <FooterCol
            title="More services"
            links={[
              ...services.slice(6).map((s) => ({ label: s.navName, href: `/services/${s.slug}` })),
              { label: 'All services', href: '/services' },
            ]}
          />
          <div className="space-y-8">
            <FooterCol title="Company" links={company} />
            <FooterCol title="Legal" links={legal} />
          </div>
        </div>

        {/* QA #6 - one disclaimer, in the footer, accurate, matching the Terms. */}
        <div
          className="mt-12 rounded-2xl border p-6"
          style={{ borderColor: 'rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)' }}
        >
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--c-accent)' }}>
            Legal disclaimer
          </h2>
          <p className="mt-3 text-[0.8125rem] leading-relaxed" style={{ color: 'rgba(255,255,255,.6)' }}>
            {disclaimerText(cfg)}
          </p>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 border-t pt-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.55)' }}
        >
          <p>
            © {year} {cfg.brand.legalEntity?.trim() || cfg.brand.name}. All rights reserved.
          </p>
          <p>
            Government filing fees are paid directly to the USPTO and are separate from our fees.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(255,255,255,.5)' }}>
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-[0.9rem] transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,.7)' }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
