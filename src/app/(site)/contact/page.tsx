import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, faqSchema, jsonLd, organizationSchema, pageMeta } from '@/lib/seo';
import { PageHero, Section, SectionHead } from '@/components/Blocks';
import LeadForm from '@/components/LeadForm';
import Faq from '@/components/Faq';
import { IconClock, IconMail, IconShield } from '@/components/Icons';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/contact',
    title: 'Contact Us & Free Trademark Search',
    description: `Send us your brand name and what you sell for a free knock-out trademark search. Use the form or email us — we reply to every enquiry within one business day.`,
  });
}

const contactFaqs = [
  {
    q: 'What should I include in my message?',
    a: 'The exact name or wording you want to protect, a sentence about what you sell under it, and whether you are selling already or still planning to launch. That is enough for us to run a knock-out search and give you a real answer.',
  },
  {
    q: 'How quickly will I hear back?',
    a: 'Within one business day, and usually the same day. If you send something on a Friday evening you will hear from us on Monday.',
  },
  {
    q: 'Is the first search really free?',
    a: 'Yes. No card, no account, no obligation. If the result is that your name looks clear and you would rather file it yourself, we will tell you that too.',
  },
  {
    q: 'Can you help if I already filed and something went wrong?',
    a: 'Often, yes. Send us the serial number and we will pull the file history from the USPTO and tell you where the application actually stands and what the options are.',
  },
];

export default function ContactPage() {
  const cfg = getConfig();
  const tel = cfg.contact.phone.replace(/[^\d+]/g, '');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          organizationSchema(cfg),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]),
          faqSchema(contactFaqs),
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us the name and we will tell you where you stand"
        intro="Every enquiry starts with a free knock-out search of the federal register. No card, no account, and a straight answer either way."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section>
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <SectionHead
              eyebrow="Get in touch"
              title="Send us your brand name"
              intro={cfg.contact.responseTime}
            />

            <div className="mt-9 space-y-4">
              {/* QA #12 - contact details are real links, not plain text. */}
              <ContactRow
                icon={<IconMail className="h-[22px] w-[22px]" />}
                label="Email"
                value={cfg.contact.email}
                href={`mailto:${cfg.contact.email}`}
              />
              {cfg.contact.phone ? (
                <ContactRow
                  icon={<IconShield className="h-[22px] w-[22px]" />}
                  label="Phone"
                  value={cfg.contact.phone}
                  href={`tel:${tel}`}
                />
              ) : null}
              {cfg.contact.hours ? (
                <ContactRow
                  icon={<IconClock className="h-[22px] w-[22px]" />}
                  label="Hours"
                  value={cfg.contact.hours}
                />
              ) : null}
              {cfg.contact.addressLine1 ? (
                <ContactRow
                  icon={<IconShield className="h-[22px] w-[22px]" />}
                  label="Address"
                  value={[cfg.contact.addressLine1, cfg.contact.addressLine2]
                    .filter(Boolean)
                    .join(', ')}
                />
              ) : null}
            </div>

            <div
              className="mt-9 rounded-2xl border p-6"
              style={{ background: 'var(--c-surface)', borderColor: 'var(--c-line)' }}
              data-reveal
            >
              <h2 className="font-display text-[1.05rem] font-semibold">
                What to include for the fastest answer
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.9rem]">
                {[
                  'The exact wording or logo you want to protect',
                  'What you sell or provide under that name',
                  'Whether you are already trading or still pre-launch',
                  'Your USPTO serial number, if you already filed',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span
                      className="mt-[9px] h-[3px] w-[10px] shrink-0 rounded-full"
                      style={{ background: 'var(--c-accent)' }}
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="min-w-0 rounded-[1.4rem] border p-6 sm:p-8"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)', boxShadow: 'var(--tw-shadow)' }}
            data-reveal
          >
            <h2 className="font-display text-xl font-semibold">Free trademark search</h2>
            <p className="mt-2 text-[0.9375rem]">
              Fields marked <span style={{ color: 'var(--c-primary)' }}>*</span> are required.
            </p>
            <div className="mt-7">
              <LeadForm email={cfg.contact.email} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHead eyebrow="Questions" title="Before you write to us" />
          <Faq items={contactFaqs} />
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div
      className="flex items-start gap-4 rounded-2xl border p-5"
      style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
      data-reveal
    >
      <span className="icon-tile">{icon}</span>
      <div className="min-w-0">
        <p
          className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: 'var(--c-muted)' }}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="link-underline mt-1 block font-display text-[1rem] font-semibold [overflow-wrap:anywhere]"
            style={{ color: 'var(--c-ink)' }}
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 font-display text-[1rem] font-semibold" style={{ color: 'var(--c-ink)' }}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
