import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, jsonLd, pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/Blocks';
import LegalDoc, { type LegalSection } from '@/components/LegalDoc';

const UPDATED = 'January 2026';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: `How ${cfg.brand.name} collects, uses, stores and protects the personal information you provide, and the choices you have over it.`,
  });
}

export default function PrivacyPolicyPage() {
  const cfg = getConfig();
  const B = cfg.brand.name;
  const entity = cfg.brand.legalEntity?.trim() || B;
  const mail = (
    <a href={`mailto:${cfg.contact.email}`} className="link-underline font-semibold" style={{ color: 'var(--c-primary)' }}>
      {cfg.contact.email}
    </a>
  );

  const sections: LegalSection[] = [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: [
        <>
          This privacy policy explains how {entity}, trading as {B} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;), handles personal information collected through this
          website and in the course of providing our trademark and copyright filing services.
        </>,
        <>
          If you have a question about anything in this policy, or you want to exercise any of the
          rights described below, email us at {mail} and a person will respond.
        </>,
      ],
    },
    {
      id: 'what-we-collect',
      title: 'Information we collect',
      body: [
        <>
          <strong>Information you give us.</strong> When you submit a form or email us, we collect
          your name, email address, telephone number if you choose to provide one, the mark you are
          asking about, a description of your goods or services, and anything else you include in
          your message.
        </>,
        <>
          <strong>Information needed to file.</strong> If you engage us, we collect what a filing
          requires: your legal name or entity name, business address, dates of first use, and
          specimens evidencing use of the mark.
        </>,
        <>
          <strong>Technical information.</strong> Our server records standard request data such as
          IP address, browser type and pages requested. We use this to keep the site available and
          secure.
        </>,
        <>
          <strong>What we do not collect.</strong> We do not ask for and do not want your Social
          Security number, and we do not store full payment card details on this website.
        </>,
      ],
    },
    {
      id: 'how-we-use-it',
      title: 'How we use your information',
      body: [
        <>
          We use the information you provide to answer your enquiry, run the searches you ask for,
          prepare and file documents on your instruction, keep you updated on your case, meet our
          legal and record-keeping obligations, and improve how the site works.
        </>,
        <>
          Documents filed with the United States Patent and Trademark Office and the United States
          Copyright Office become part of a public record maintained by those agencies. That is a
          function of the filing systems themselves, not a choice we make, and it applies to any
          trademark or copyright application however it is filed.
        </>,
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      body: [
        <>
          We do not sell, rent or trade your personal information. We do not add you to a marketing
          list because you asked us a question. If we ever send anything other than correspondence
          about your own matter, it will be because you asked for it and it will carry a one-click
          unsubscribe.
        </>,
      ],
    },
    {
      id: 'sharing',
      title: 'When we share information',
      body: [
        <>
          We share personal information only in these circumstances: with the USPTO, the Copyright
          Office or another agency where a filing requires it; with service providers who host our
          website, send our email or process payments, and only to the extent needed to do that
          work; where you have asked us to share it, for example with your attorney or accountant;
          and where the law requires it.
        </>,
        <>
          If our business is ever transferred to another owner, client records may transfer with it.
          You would be told before that happened.
        </>,
      ],
    },
    {
      id: 'security',
      title: 'How we protect information',
      body: [
        <>
          This site is served over TLS. Access to client information is limited to people who need
          it to do the work. We keep what we need and no more.
        </>,
        <>
          No method of transmission or storage is completely secure, and we do not claim otherwise.
          If a breach affected your information we would tell you promptly and tell you what to do
          about it.
        </>,
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: [
        <>
          Enquiries that do not become engagements are deleted within twenty-four months. Client
          matter records are kept for as long as needed to service the matter and afterwards for the
          period required by applicable record-keeping rules and limitation periods. You may ask us
          to delete your information sooner and we will do so unless we are required to keep it.
        </>,
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: [
        <>
          Depending on where you live you may have the right to ask what personal information we
          hold about you, to have it corrected, to have it deleted, to object to or restrict certain
          processing, to receive a copy in a portable format, and to be free from discrimination for
          exercising any of these rights.
        </>,
        <>
          California residents have specific rights under the California Consumer Privacy Act,
          including the right to know what is collected and to opt out of any sale of personal
          information. We do not sell personal information, as that term is defined in that Act.
        </>,
        <>To exercise any right, email {mail}. We will respond within the time the law allows.</>,
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      body: [
        <>
          This website uses only what is necessary to function. We do not set advertising or
          cross-site tracking cookies. If we later add analytics, this policy will be updated first
          and you will be given a way to opt out.
        </>,
      ],
    },
    {
      id: 'children',
      title: "Children's privacy",
      body: [
        <>
          Our services are for businesses and are not directed to anyone under sixteen. We do not
          knowingly collect information from children. If you believe a child has given us
          information, email {mail} and we will delete it.
        </>,
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        <>
          If we change this policy we will update the date shown here. Material changes affecting
          existing clients will be notified by email.
        </>,
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [
        <>
          Questions about this policy, or about how your information is handled, go to {mail}.
          {cfg.contact.addressLine1 ? (
            <>
              {' '}
              You can also write to us at {cfg.contact.addressLine1}
              {cfg.contact.addressLine2 ? `, ${cfg.contact.addressLine2}` : ''}.
            </>
          ) : null}
        </>,
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Privacy policy', href: '/privacy-policy' },
          ]),
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro={`What ${B} collects, why we collect it, who sees it and what you can ask us to do about it.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy policy' }]}
      />
      <LegalDoc updated={UPDATED} sections={sections} />
    </>
  );
}
