import Link from 'next/link';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, faqSchema, jsonLd, pageMeta } from '@/lib/seo';
import { CtaBand, PageHero, Section, SectionHead } from '@/components/Blocks';
import Faq from '@/components/Faq';
import { IconArrow, IconCheck } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/process',
    title: 'Our Trademark Filing Process',
    description:
      'From free knock-out search to registration certificate: exactly what happens at each stage of a federal trademark filing, what it costs and how long each step takes.',
  });
}

const stages = [
  {
    n: '01',
    title: 'Free knock-out search',
    when: 'Day 0 · same or next business day',
    text: 'You send the mark and a sentence about what you sell. We check the federal register for identical and closely similar marks in the classes that would cover your goods, and tell you plainly what we find.',
    points: [
      'No card, no account, no obligation',
      'A straight answer: clear, borderline, or blocked',
      'If it is blocked we say so, and why',
    ],
  },
  {
    n: '02',
    title: 'Clearance and class selection',
    when: 'Days 1–5',
    text: 'On Professional and Complete this becomes a full clearance across federal, state and common-law sources, with a written risk report. On every package we identify the correct Nice class and draft your description of goods and services.',
    points: [
      'Federal, state and common-law sources searched',
      'Every hit graded high, medium or low risk',
      'Honest advice about whether a second class is really needed',
    ],
  },
  {
    n: '03',
    title: 'You approve the wording',
    when: 'Before anything is filed',
    text: 'You see the exact mark, the exact class and the exact description of goods that will be submitted. Nothing goes to the USPTO until you have signed off on it, because this wording is what your registration will be worth.',
    points: [
      'The full application shown to you first',
      'Changes made until you are satisfied',
      'Filing basis confirmed — Section 1(a) or 1(b)',
    ],
  },
  {
    n: '04',
    title: 'Filing',
    when: 'Within two to five business days',
    text: 'We file electronically with the USPTO and send you the filing receipt and serial number the same day. Your priority date is now locked in from this moment.',
    points: [
      'Government fee paid at filing, shown separately',
      'Filing receipt and serial number sent to you',
      'Your priority date established',
    ],
  },
  {
    n: '05',
    title: 'Examination',
    when: 'Roughly months 6–9',
    text: 'An examining attorney reviews the application. They may issue an office action raising a requirement or a refusal. We read it, tell you what it actually means and what the realistic options are.',
    points: [
      'Office action assessed within one business day',
      'Honest read on the odds before you spend on a response',
      'One non-substantive response included with Complete',
    ],
  },
  {
    n: '06',
    title: 'Publication and registration',
    when: 'Roughly months 9–14',
    text: 'Your mark publishes in the Official Gazette for a fixed opposition window. If nobody opposes, the registration certificate issues — or, on an intent-to-use application, a Notice of Allowance and then your Statement of Use.',
    points: [
      'Publication and opposition window tracked',
      'Statement of Use handled where the mark was filed 1(b)',
      'Renewal deadlines docketed for the next ten years',
    ],
  },
];

const processFaqs = [
  {
    q: 'How quickly can you file?',
    a: 'Preparation typically takes two to five business days, and Professional and Complete are prioritised to two. The bottleneck is almost never us — it is how quickly you can confirm what you sell and approve the wording.',
  },
  {
    q: 'Will I be told what is happening, or do I have to chase?',
    a: 'You get an email at every milestone: filing receipt, examiner assigned, publication, and any office action. You will not have to log into anything or guess.',
  },
  {
    q: 'What is the single biggest reason applications fail?',
    a: 'A likelihood-of-confusion refusal against a mark that was already sitting on the register. Which is exactly why the search happens before the filing, not after.',
  },
  {
    q: 'What if I want to stop partway?',
    a: 'You can. We invoice for the work done and hand over everything we have prepared. The one thing that cannot be undone is the government fee once an application is filed.',
  },
];

export default function ProcessPage() {
  const cfg = getConfig();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Our process', href: '/process' },
          ]),
          faqSchema(processFaqs),
          {
            '@type': 'HowTo',
            name: 'How a federal trademark application is prepared and filed',
            step: stages.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.title,
              text: s.text,
            })),
          },
        ])}
      />

      <PageHero
        eyebrow="Our process"
        title="What actually happens, and when"
        intro="Six stages from first enquiry to registration certificate. No black box, no portal you have to log into to find out nothing has changed."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our process' }]}
        actions={
          <Link href="/contact" className="btn btn-primary">
            Start at stage one
            <IconArrow className="h-[18px] w-[18px]" />
          </Link>
        }
      />

      <Section>
        <div className="shell">
          <ol className="relative space-y-4">
            {stages.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                style={{ ['--reveal-delay' as any]: `${(i % 3) * 70}ms` }}
                className="relative grid gap-6 rounded-[1.4rem] border p-6 sm:p-8 lg:grid-cols-[auto_1fr_20rem] lg:items-start lg:gap-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-[1.4rem]"
                  style={{ background: i % 2 === 0 ? 'var(--c-page)' : 'var(--c-surface)' }}
                />
                <div className="flex items-center gap-4 lg:block">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-[0.95rem] font-bold"
                    style={{ background: 'var(--c-primary)', color: '#fff' }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.13em] lg:mt-3 lg:block"
                    style={{ color: 'var(--c-muted)' }}
                  >
                    {s.when}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold sm:text-[1.4rem]">{s.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-[1.75]">{s.text}</p>
                </div>

                <ul className="space-y-2.5 lg:pl-6 lg:border-l">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <IconCheck
                        className="mt-[3px] h-[17px] w-[17px] shrink-0"
                        style={{ color: 'var(--c-primary)' }}
                      />
                      <span className="text-[0.875rem] leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="surface">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHead eyebrow="Questions" title="About the process" />
          <Faq items={processFaqs} />
        </div>
      </Section>

      <CtaBand cfg={cfg} />
    </>
  );
}
