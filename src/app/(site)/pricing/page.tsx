import Link from 'next/link';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, faqSchema, jsonLd, pageMeta } from '@/lib/seo';
import { CtaBand, PageHero, Section, SectionHead } from '@/components/Blocks';
import PricingCards from '@/components/PricingCards';
import Faq from '@/components/Faq';
import { IconArrow, IconCheck } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/pricing',
    title: 'Trademark Filing Packages & Pricing',
    description:
      'Fixed-price trademark packages from $99 plus the USPTO government fee, with every add-on priced separately. No hidden line items and no surprise charges mid-process.',
  });
}

const pricingFaqs = [
  {
    q: 'Why is the government fee shown separately?',
    a: 'Because it is not our money. The USPTO sets its own filing fee per class and it is paid directly to the government. Services that quote one blended number are usually hiding either a very thin service fee or a very fat one.',
  },
  {
    q: 'What if I need two classes?',
    a: 'The government fee applies per class, and we charge a small additional preparation fee for each extra class. We will tell you before you commit whether your goods genuinely need a second class — a lot of the time they do not.',
  },
  {
    q: 'Is the fee refundable if my application is refused?',
    a: 'The government fee is never refundable, by anyone, in any circumstance. Our fee covers the work of preparing and filing, which is done whatever the outcome. What we can do — and what the search is for — is make a refusal much less likely before you spend anything.',
  },
  {
    q: 'Do you charge for the free search?',
    a: 'No. The knock-out search is genuinely free and comes with no obligation. If the result is that your name is clear and you would rather file yourself, that is a fine outcome and we will say so.',
  },
  {
    q: 'Can I upgrade after I have started?',
    a: 'Yes. If you start on Essential and the search turns up something that warrants a full clearance, you pay the difference rather than starting again.',
  },
  {
    q: 'How do I pay?',
    a: 'We invoice by email before work starts, and the government fee is charged at the point of filing. Nothing is filed and nothing is charged without your written approval.',
  },
];

const comparison = [
  ['Preliminary knock-out search', true, true, true],
  ['Class selection and goods drafting', true, true, true],
  ['Application prepared and filed', true, true, true],
  ['Specimen and use-date review', true, true, true],
  ['Email status updates to publication', true, true, true],
  ['Comprehensive federal, state and common-law search', false, true, true],
  ['Written conflict and risk report', false, true, true],
  ['Priority preparation (two business days)', false, true, true],
  ['Trademark monitoring', false, '12 months', '36 months'],
  ['Office action response (non-substantive)', false, false, true],
  ['Statement of Use preparation', false, false, true],
  ['Dedicated case manager', false, false, true],
  ['Registration certificate and renewal docketing', false, false, true],
] as const;

export default function PricingPage() {
  const cfg = getConfig();
  const names = cfg.pricing.plans.map((p) => p.name);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing' },
          ]),
          faqSchema(pricingFaqs),
          {
            '@type': 'OfferCatalog',
            name: `${cfg.brand.name} trademark packages`,
            itemListElement: cfg.pricing.plans.map((p) => ({
              '@type': 'Offer',
              name: p.name,
              price: String(p.price),
              priceCurrency: 'USD',
              description: p.summary,
            })),
          },
        ])}
      />

      <PageHero
        eyebrow="Pricing"
        title="Fixed prices, and you always know what the government takes"
        intro={cfg.pricing.note}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
      />

      <Section>
        <div className="shell">
          <PricingCards cfg={cfg} />
        </div>
      </Section>

      {/* ------------------------------------------------------ comparison */}
      <Section tone="surface">
        <div className="shell">
          <SectionHead
            eyebrow="Compare"
            title="What each package actually includes"
            align="center"
            max="max-w-xl"
          />
          <div
            className="mt-11 overflow-x-auto rounded-2xl border"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
            data-reveal
          >
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">Feature comparison across packages</caption>
              <thead>
                <tr style={{ background: 'var(--c-surface)' }}>
                  <th scope="col" className="px-5 py-4 text-[0.8125rem] font-semibold" style={{ color: 'var(--c-ink)' }}>
                    Feature
                  </th>
                  {names.map((n) => (
                    <th
                      key={n}
                      scope="col"
                      className="px-5 py-4 text-center text-[0.8125rem] font-semibold"
                      style={{ color: 'var(--c-ink)' }}
                    >
                      {n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row[0]} className="border-t">
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-[0.875rem] font-medium"
                      style={{ color: 'var(--c-body)' }}
                    >
                      {row[0]}
                    </th>
                    {[row[1], row[2], row[3]].map((cell, j) => (
                      <td key={j} className="px-5 py-3.5 text-center">
                        {cell === true ? (
                          <IconCheck
                            className="mx-auto h-[18px] w-[18px]"
                            style={{ color: 'var(--c-primary)' }}
                            aria-label="Included"
                          />
                        ) : cell === false ? (
                          <span aria-label="Not included" style={{ color: 'var(--c-line)' }}>
                            —
                          </span>
                        ) : (
                          <span className="text-[0.8125rem] font-semibold" style={{ color: 'var(--c-primary)' }}>
                            {cell}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- addons */}
      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Add-ons"
              title="Everything else, priced individually"
              intro="Buy any of these on their own, with or without a package. Where a government fee applies it is shown separately and paid directly to the agency."
            />
            <Link href="/contact" className="btn btn-primary mt-8" data-reveal>
              Ask for a quote
              <IconArrow className="h-[18px] w-[18px]" />
            </Link>
          </div>
          <ul
            className="divide-y overflow-hidden rounded-2xl border"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
            data-reveal
          >
            {cfg.pricing.addons.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6">
                <span className="text-[0.9375rem]" style={{ color: 'var(--c-body)' }}>
                  {a.name}
                </span>
                <span
                  className="shrink-0 font-display text-[0.9375rem] font-semibold"
                  style={{ color: 'var(--c-ink)' }}
                >
                  {a.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHead eyebrow="Questions" title="Pricing questions, answered honestly" />
          <Faq items={pricingFaqs} />
        </div>
      </Section>

      <CtaBand
        cfg={cfg}
        title="Not sure which package you need?"
        text="Send us the name and what you sell. We will run a free knock-out search and tell you which package actually fits — including when the cheapest one is enough."
      />
    </>
  );
}
