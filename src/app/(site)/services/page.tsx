import Link from 'next/link';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { services } from '@/lib/services';
import { breadcrumbSchema, jsonLd, pageMeta } from '@/lib/seo';
import { CtaBand, PageHero, Section, SectionHead, ServiceCard } from '@/components/Blocks';
import { IconArrow } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/services',
    title: 'Trademark & Copyright Services',
    description:
      'Federal trademark filing, clearance searches, office action responses, renewals, brand monitoring, copyright registration and DMCA takedowns for US business owners.',
  });
}

const groups = [
  {
    title: 'Get registered',
    text: 'Everything involved in taking a name from an idea to a federal registration.',
    slugs: ['free-trademark-search', 'comprehensive-trademark-search', 'federal-trademark-filing', 'office-action-response'],
  },
  {
    title: 'Get to the finish line',
    text: 'The filings that turn an allowed application into a live registration.',
    slugs: ['filing-an-extension', 'proof-of-commerce'],
  },
  {
    title: 'Keep and defend it',
    text: 'A registration is only worth what you do with it after it issues.',
    slugs: ['trademark-renewal', 'brand-monitoring', 'copyright-registration', 'dmca-takedowns'],
  },
];

export default function ServicesPage() {
  const cfg = getConfig();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
          ]),
          {
            '@type': 'ItemList',
            itemListElement: services.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: `/services/${s.slug}`,
            })),
          },
        ])}
      />

      <PageHero
        eyebrow="Services"
        title="Ten services covering the whole life of a mark"
        intro={`Whether you are checking whether a name is free, answering a refusal, or removing counterfeit listings, ${cfg.brand.name} handles the filing work and tells you plainly what each stage costs.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        actions={
          <>
            <Link href="/contact" className="btn btn-primary">
              Free trademark search
              <IconArrow className="h-[18px] w-[18px]" />
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              View pricing
            </Link>
          </>
        }
      />

      {groups.map((g, gi) => (
        <Section key={g.title} tone={gi % 2 === 1 ? 'surface' : 'page'}>
          <div className="shell">
            <SectionHead eyebrow={`0${gi + 1}`} title={g.title} intro={g.text} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.slugs.map((slug, i) => {
                const s = services.find((x) => x.slug === slug)!;
                return (
                  <ServiceCard
                    key={s.slug}
                    slug={s.slug}
                    name={s.name}
                    summary={s.summary}
                    icon={s.icon}
                    priceFrom={s.priceFrom}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </Section>
      ))}

      <CtaBand cfg={cfg} />
    </>
  );
}
