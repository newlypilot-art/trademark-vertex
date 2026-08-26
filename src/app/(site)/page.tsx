import Link from 'next/link';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { services } from '@/lib/services';
import { faqSchema, jsonLd, organizationSchema, pageMeta } from '@/lib/seo';
import {
  CtaBand,
  Section,
  SectionHead,
  ServiceCard,
  StatBand,
  StepList,
} from '@/components/Blocks';
import HeroPanel from '@/components/HeroPanel';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import PricingCards from '@/components/PricingCards';
import { IconArrow, IconCheck, IconShield } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/',
    title: cfg.seo.defaultTitle,
    description: cfg.seo.defaultDescription,
  });
}

const homeSteps = [
  {
    title: 'Search',
    text: 'We check the register for anything that would block you, and tell you honestly if the name is a problem.',
  },
  {
    title: 'Classify and draft',
    text: 'The right Nice class, and a description of goods written the way examiners expect to read it.',
  },
  {
    title: 'File',
    text: 'Nothing is submitted until you have approved the exact wording. Then we file and send you the receipt.',
  },
  {
    title: 'Track to registration',
    text: 'Updates at every milestone, and a warning before any deadline that carries consequences.',
  },
];

const differentiators = [
  {
    title: 'A real search, not a green tick',
    text: 'Our clearance covers federal, state and common-law sources. A filing service that only checks for exact matches is selling you a false sense of safety.',
  },
  {
    title: 'You approve the wording first',
    text: 'The description of goods is the part that decides whether your application survives examination. You see it and sign off before anything is filed.',
  },
  {
    title: 'Fixed prices, stated up front',
    text: 'Our fee and the government fee are shown separately so you know exactly what you are paying and to whom. No mid-process surprises.',
  },
  {
    title: 'Deadlines that get diarised',
    text: 'Most brands that lose a registration lose it to a missed maintenance filing. We docket every deadline and remind you well ahead of it.',
  },
];

const homeFaqs = [
  {
    q: 'Do I need a lawyer to register a trademark?',
    a: 'If you are based in the United States you can file yourself or use a preparation service like ours. Foreign-domiciled applicants are required by rule to be represented by a US-licensed attorney. We are a preparation and filing service, not a law firm, and we say so plainly — if your situation calls for legal advice we will tell you.',
  },
  {
    q: 'How long does registration take?',
    a: 'For a smooth application, commonly nine to fourteen months from filing to registration. Examination alone typically begins six to nine months after you file. An office action or an opposition extends that. Your priority date, however, runs from the day you file.',
  },
  {
    q: 'What does the USPTO charge on top of your fee?',
    a: 'The government sets its own filing fee per class of goods or services, paid directly to the USPTO and separate from what we charge. It is not refundable if your application is refused, which is exactly why the search and classification work matters.',
  },
  {
    q: 'Can I trademark a name I have used for years without registering?',
    a: 'Usually yes, and you may already hold common-law rights in the areas where you trade. Registration converts that into nationwide priority, a public record, the ® symbol and a far stronger position against copycats and marketplace infringers.',
  },
  {
    q: 'What happens if my application is refused?',
    a: 'You receive an office action explaining why. Many refusals are procedural and are answered as a matter of routine. We prepare responses as a separate service, and one non-substantive response is included in our Complete package.',
  },
  {
    q: 'Do you handle logos as well as names?',
    a: 'Yes. A word mark and a design mark are separate applications. Most brands start with the word mark because it protects the name however it is styled, then add the logo when the design itself carries value.',
  },
];

export default function HomePage() {
  const cfg = getConfig();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([organizationSchema(cfg), faqSchema(homeFaqs)])}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--c-surface)' }}>
        <span
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 opacity-60"
          style={{
            maskImage: 'radial-gradient(80% 70% at 30% 0%, #000, transparent)',
            WebkitMaskImage: 'radial-gradient(80% 70% at 30% 0%, #000, transparent)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: 'var(--c-primary)' }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 top-24 h-[30rem] w-[30rem] rounded-full opacity-[0.2] blur-3xl"
          style={{ background: 'var(--c-accent)' }}
        />

        <div className="shell relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
          <div data-reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold"
              style={{
                background: 'var(--c-page)',
                borderColor: 'var(--c-line)',
                color: 'var(--c-primary)',
              }}
            >
              <IconShield className="h-4 w-4" />
              Free knock-out search · no card required
            </span>

            <h1 className="mt-6 max-w-[16ch]">
              Your brand name, <span className="text-gradient">protected properly.</span>
            </h1>

            <p className="lede mt-6 max-w-xl">
              {cfg.brand.name} prepares and files federal trademark applications for US business
              owners — searched before it is filed, classified correctly, and tracked through to
              registration by people who answer their email.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start with a free search
                <IconArrow className="h-[18px] w-[18px]" />
              </Link>
              <Link href="/pricing" className="btn btn-outline">
                See pricing
              </Link>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[
                'Search before we file',
                'Fixed fees, stated up front',
                'You approve the wording',
              ].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 text-[0.875rem] font-medium"
                  style={{ color: 'var(--c-body)' }}
                >
                  <IconCheck className="h-[18px] w-[18px]" style={{ color: 'var(--c-primary)' }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={{ ['--reveal-delay' as any]: '140ms' }}
            className="lg:pl-14"
          >
            <HeroPanel brand={cfg.brand.name} />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
      {cfg.stats.enabled && cfg.stats.items.length ? (
        <div className="border-b" style={{ background: 'var(--c-page)' }}>
          <div className="shell py-12 sm:py-14">
            <StatBand items={cfg.stats.items} />
          </div>
        </div>
      ) : null}

      {/* -------------------------------------------------------- services */}
      <Section id="services">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead
              eyebrow="What we do"
              title={`Everything a US brand needs, in one place`}
              intro="Ten services covering the whole life of a mark — from checking whether the name is free to defending it once it is registered."
            />
            <Link
              href="/services"
              data-reveal
              className="btn btn-outline shrink-0 !px-5 !py-2.5 !text-sm"
            >
              All services
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 8).map((s, i) => (
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

            {/* Ninth cell completes the grid and carries you to the other two. */}
            <Link
              href="/services"
              data-reveal
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(160deg, var(--c-primary), var(--c-primary-dark))',
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-2xl"
                style={{ background: 'var(--c-accent)' }}
              />
              <div className="relative">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}
                >
                  <IconArrow className="h-[22px] w-[22px] -rotate-45" />
                </span>
                <h3 className="mt-5" style={{ color: '#fff' }}>
                  Two more services
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed" style={{ color: 'rgba(255,255,255,.72)' }}>
                  Proof of commerce filings and digital piracy takedowns — plus what every package
                  covers, side by side.
                </p>
              </div>
              <span
                className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: 'var(--c-accent)' }}
              >
                See all ten services
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ difference */}
      <Section tone="surface">
        <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Why us"
              title="The difference is what happens before we file"
              intro={`Anyone can submit a form to the USPTO. What decides whether your registration issues — and whether it is worth anything afterwards — is the work done before the submit button.`}
            />
            <div
              data-reveal
              className="mt-8 rounded-2xl border p-6"
              style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
            >
              <p className="text-[0.9375rem] leading-relaxed">
                Not sure whether your name is even available? Send it over and we will run a
                knock-out search at no cost and tell you what we find — including when the answer is
                that you do not need us.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5 !px-5 !py-2.5 !text-sm">
                Check my name free
                <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <li
                key={d.title}
                data-reveal
                style={{
                  ['--reveal-delay' as any]: `${(i % 2) * 80}ms`,
                  background: 'var(--c-page)',
                  borderColor: 'var(--c-line)',
                }}
                className="rounded-2xl border p-6"
              >
                <span className="icon-tile">
                  <IconCheck className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-5">{d.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* --------------------------------------------------------- process */}
      <Section>
        <div className="shell">
          <SectionHead
            eyebrow="Process"
            title="How we handle your filing"
            intro="Four stages, and you know exactly where your case sits at every one of them."
            align="center"
            max="max-w-2xl"
          />
          <div className="mt-12">
            <StepList steps={homeSteps} />
          </div>
          <div className="mt-11 text-center" data-reveal>
            <Link href="/process" className="btn btn-outline">
              See the full process
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- pricing */}
      <Section tone="surface" id="pricing">
        <div className="shell">
          <SectionHead
            eyebrow="Pricing"
            title={cfg.pricing.heading}
            intro={cfg.pricing.note}
            align="center"
            max="max-w-2xl"
          />
          <div className="mt-12">
            <PricingCards cfg={cfg} />
          </div>
          <div className="mt-10 text-center" data-reveal>
            <Link href="/pricing" className="btn btn-outline">
              Compare packages and add-ons
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------- testimonials */}
      <Testimonials cfg={cfg} />

      {/* ------------------------------------------------------------- faq */}
      <Section>
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHead
              eyebrow="Questions"
              title="The things people ask before they file"
              intro="Straight answers, including the ones that are not in our commercial interest."
            />
          </div>
          <Faq items={homeFaqs} />
        </div>
      </Section>

      <CtaBand cfg={cfg} />
    </>
  );
}
