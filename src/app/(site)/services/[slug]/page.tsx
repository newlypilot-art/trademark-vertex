import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getConfig, siteUrl } from '@/lib/config';
import { getService, services } from '@/lib/services';
import { breadcrumbSchema, faqSchema, jsonLd, pageMeta } from '@/lib/seo';
import {
  CtaBand,
  FeatureItem,
  PageHero,
  Section,
  SectionHead,
  ServiceCard,
  StepList,
} from '@/components/Blocks';
import Faq from '@/components/Faq';
import LeadForm from '@/components/LeadForm';
import { IconArrow, IconCheck, ServiceIcon } from '@/components/Icons';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = getService(params.slug);
  const cfg = getConfig();
  if (!s) {
    return pageMeta({
      cfg,
      path: `/services/${params.slug}`,
      title: 'Service not found',
      description: 'The page you are looking for is not available.',
      noindex: true,
    });
  }
  return pageMeta({
    cfg,
    path: `/services/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
  });
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();
  const cfg = getConfig();
  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.name, href: `/services/${service.slug}` },
          ]),
          {
            '@type': 'Service',
            name: service.name,
            description: service.metaDescription,
            serviceType: service.name,
            provider: { '@id': `${siteUrl()}/#organization` },
            areaServed: { '@type': 'Country', name: 'United States' },
            offers: {
              '@type': 'Offer',
              description: `${service.priceFrom}`,
              priceCurrency: 'USD',
            },
          },
          faqSchema(service.faqs),
        ])}
      />

      <PageHero
        eyebrow={service.code}
        title={service.name}
        intro={service.summary}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.navName },
        ]}
        actions={
          <>
            <Link href="/contact" className="btn btn-primary">
              Get started
              <IconArrow className="h-[18px] w-[18px]" />
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              {service.priceFrom}
            </Link>
          </>
        }
      />

      {/* ------------------------------------------------------- overview */}
      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">Overview</p>
            <div className="prose-block lede mt-5">
              {service.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FactCard label="Turnaround" value={service.timeline} />
              <FactCard label="Price" value={service.priceFrom} />
            </div>
          </div>

          <aside className="lg:pl-2">
            <div
              className="sticky top-24 rounded-2xl border p-6"
              style={{ background: 'var(--c-surface)', borderColor: 'var(--c-line)' }}
            >
              <span className="icon-tile">
                <ServiceIcon name={service.icon} className="h-[22px] w-[22px]" />
              </span>
              <h2 className="mt-5 font-display text-lg font-semibold">Who this is for</h2>
              <ul className="mt-4 space-y-3">
                {service.audience.map((a) => (
                  <li key={a} className="flex gap-2.5">
                    <IconCheck
                      className="mt-[3px] h-[17px] w-[17px] shrink-0"
                      style={{ color: 'var(--c-primary)' }}
                    />
                    <span className="text-[0.9rem] leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary mt-6 w-full !py-2.5 !text-sm">
                Talk to us about this
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* -------------------------------------------------------- included */}
      <Section tone="surface">
        <div className="shell">
          <SectionHead
            eyebrow="What is included"
            title={`Everything in ${service.name.toLowerCase()}`}
            intro="No thin packages and no line items that turn out to be extra once you have paid."
          />
          <ul className="mt-11 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((f, i) => (
              <FeatureItem key={f.title} title={f.title} text={f.text} index={i} />
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------- steps */}
      <Section>
        <div className="shell">
          <SectionHead
            eyebrow="How it works"
            title="What happens, in order"
            align="center"
            max="max-w-xl"
          />
          <div className="mt-12">
            <StepList steps={service.steps} />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ faq + form */}
      <Section tone="surface">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <SectionHead eyebrow="Questions" title={`${service.name} FAQs`} />
            <div className="mt-8">
              <Faq items={service.faqs} />
            </div>
          </div>
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
            data-reveal
          >
            <h2 className="font-display text-xl font-semibold">Ask about {service.navName}</h2>
            <p className="mt-2 text-[0.9375rem]">
              {cfg.contact.responseTime} Or email{' '}
              <a
                href={`mailto:${cfg.contact.email}`}
                className="link-underline font-semibold"
                style={{ color: 'var(--c-primary)' }}
              >
                {cfg.contact.email}
              </a>
              .
            </p>
            <div className="mt-6">
              <LeadForm email={cfg.contact.email} compact defaultService={service.name} />
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- related */}
      {related.length ? (
        <Section>
          <div className="shell">
            <SectionHead eyebrow="Related" title="You may also need" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard
                  key={s.slug}
                  slug={s.slug}
                  name={s.name}
                  summary={s.summary}
                  icon={s.icon}
                  priceFrom={s.priceFrom}
                  index={i}
                />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand cfg={cfg} />
    </>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      data-reveal
      className="rounded-2xl border p-5"
      style={{ background: 'var(--c-surface)', borderColor: 'var(--c-line)' }}
    >
      <p
        className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
        style={{ color: 'var(--c-muted)' }}
      >
        {label}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: 'var(--c-ink)' }}>
        {value}
      </p>
    </div>
  );
}
