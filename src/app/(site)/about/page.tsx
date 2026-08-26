import Link from 'next/link';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, jsonLd, organizationSchema, pageMeta } from '@/lib/seo';
import { CtaBand, PageHero, Section, SectionHead, StatBand, disclaimerText } from '@/components/Blocks';
import { IconArrow, IconCheck } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/about',
    title: 'About Us & How We Work',
    description: `Who ${cfg.brand.name} is, what we do and do not do, and why we tell clients plainly when they do not need to pay us. Trademark filing support for US business owners.`,
  });
}

const principles = [
  {
    title: 'We tell you when you do not need us',
    text: 'If a free knock-out search comes back clean and your filing is straightforward, we will say so. Talking someone into a package they do not need is how you get one sale and no referrals.',
  },
  {
    title: 'We do not pretend to be lawyers',
    text: 'We are a preparation and filing service. We prepare and file the documents you instruct us to file. When a question needs legal advice we tell you that, rather than answering it anyway.',
  },
  {
    title: 'We publish real numbers',
    text: 'One set of figures, used consistently everywhere on this site. No hero counter claiming a number the rest of the page contradicts.',
  },
  {
    title: 'We answer email',
    text: 'A person reads what you send and replies within one business day. Not a ticket number, not a chatbot, and not silence until you chase.',
  },
];

export default function AboutPage() {
  const cfg = getConfig();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          organizationSchema(cfg),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]),
        ])}
      />

      <PageHero
        eyebrow="About us"
        title={`${cfg.brand.name} exists because filing badly is expensive`}
        intro="Government filing fees are never refunded. A wrong class, a vague description of goods or a specimen that shows the mark as decoration will cost you the fee and the months you waited. Most of that is avoidable before anything is submitted."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="prose-block lede">
            <p>
              Most people meet the trademark system exactly once, at the worst possible moment —
              when a name they have already built a business around turns out to be someone
              else&rsquo;s. By then the packaging is printed, the domain is bought and the ads are
              running.
            </p>
            <p>
              The system itself is not designed to be friendly. Forty-five classes of goods and
              services, a manual of acceptable identifications running to thousands of entries,
              specimen rules that turn on whether a logo functions as a brand or as a decoration,
              and deadlines that cancel a registration outright if you miss them. None of that is
              complicated once you have seen it a few hundred times. All of it is expensive to learn
              on your own application.
            </p>
            <p>
              {cfg.brand.name} does the part that requires having seen it before: searching properly,
              classifying correctly, drafting a description of goods that survives examination, and
              keeping track of every date that matters afterwards. You keep the decisions. We do the
              filing work and we tell you what we actually think.
            </p>
          </div>

          <aside className="lg:pl-4">
            <div
              className="rounded-2xl border p-7"
              style={{ background: 'var(--c-surface)', borderColor: 'var(--c-line)' }}
              data-reveal
            >
              <h2 className="font-display text-lg font-semibold">What we do</h2>
              <ul className="mt-4 space-y-3">
                {[
                  'Trademark clearance searches',
                  'Federal application preparation and filing',
                  'Office action responses',
                  'Statements of Use and extensions',
                  'Renewals and maintenance filings',
                  'Brand monitoring and takedowns',
                  'Copyright registration',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <IconCheck className="mt-[3px] h-[17px] w-[17px] shrink-0" style={{ color: 'var(--c-primary)' }} />
                    <span className="text-[0.9rem]">{x}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 font-display text-lg font-semibold">What we do not do</h2>
              <ul className="mt-4 space-y-3">
                {[
                  'Give legal advice or represent you',
                  'Appear before the TTAB or in court',
                  'Guarantee a registration — nobody can',
                  'Charge you for things you do not need',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="mt-[9px] h-[3px] w-[10px] shrink-0 rounded-full" style={{ background: 'var(--c-muted)' }} />
                    <span className="text-[0.9rem]">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {cfg.stats.enabled && cfg.stats.items.length ? (
        <Section tone="surface">
          <div className="shell">
            <SectionHead eyebrow="By the numbers" title="One set of figures, used everywhere" align="center" max="max-w-xl" />
            <div className="mt-11">
              <StatBand items={cfg.stats.items} />
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="shell">
          <SectionHead
            eyebrow="How we work"
            title="Four things we hold to"
            align="center"
            max="max-w-xl"
          />
          <ul className="mt-11 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ ['--reveal-delay' as any]: `${(i % 2) * 80}ms` }}
                className="card"
              >
                <span
                  className="font-display text-[0.8rem] font-bold"
                  style={{ color: 'var(--c-accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3">{p.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <div className="shell">
          <div
            className="rounded-2xl border p-7 sm:p-9"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
            data-reveal
          >
            <h2 className="font-display text-lg font-semibold">Important legal notice</h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed">{disclaimerText(cfg)}</p>
            <Link href="/disclaimer" className="btn btn-outline mt-6 !px-5 !py-2.5 !text-sm">
              Read the full disclaimer
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand cfg={cfg} />
    </>
  );
}
