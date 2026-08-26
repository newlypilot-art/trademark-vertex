import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, jsonLd, pageMeta } from '@/lib/seo';
import { PageHero, disclaimerText } from '@/components/Blocks';
import LegalDoc, { type LegalSection } from '@/components/LegalDoc';

const UPDATED = 'January 2026';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/disclaimer',
    title: 'Legal Disclaimer',
    description: `${cfg.brand.name} is a document preparation and filing service, not a law firm. What that means for you, in plain language.`,
  });
}

export default function DisclaimerPage() {
  const cfg = getConfig();
  const B = cfg.brand.name;
  const mail = (
    <a href={`mailto:${cfg.contact.email}`} className="link-underline font-semibold" style={{ color: 'var(--c-primary)' }}>
      {cfg.contact.email}
    </a>
  );

  const sections: LegalSection[] = [
    {
      id: 'summary',
      title: 'The short version',
      body: [<>{disclaimerText(cfg)}</>],
    },
    {
      id: 'not-a-law-firm',
      title: 'We are not a law firm',
      body: [
        <>
          {B} provides document preparation and filing services. We are not a law firm, we do not
          employ attorneys to advise you, and we do not provide legal advice, legal opinions or
          legal representation of any kind.
        </>,
        <>
          No attorney-client relationship is created by visiting this website, submitting a form,
          emailing us or engaging our services. Communications with us are confidential as a matter
          of contract, but they are not protected by attorney-client privilege.
        </>,
        <>
          We prepare and file the documents you instruct us to file. The decisions — which mark,
          which goods, whether to proceed — remain yours.
        </>,
      ],
    },
    {
      id: 'when-you-need-an-attorney',
      title: 'When you should speak to an attorney',
      body: [
        <>
          You should consult a licensed attorney if you are facing an opposition or cancellation
          proceeding before the Trademark Trial and Appeal Board, an infringement claim or
          threatened litigation, a substantive refusal that turns on legal argument you want advised
          on, a question about the strength or enforceability of your rights, or a licensing,
          assignment or transaction involving your marks.
        </>,
        <>
          If you are domiciled outside the United States, USPTO rules require you to be represented
          by a US-licensed attorney for trademark matters. We will tell you if this applies to you
          rather than taking your money first.
        </>,
      ],
    },
    {
      id: 'no-government-affiliation',
      title: 'No government affiliation',
      body: [
        <>
          {B} is a private company. We are not affiliated with, endorsed by, sponsored by or
          connected in any way to the United States Patent and Trademark Office, the United States
          Copyright Office, or any other federal, state or foreign government agency.
        </>,
        <>
          Government filing fees are set by those agencies, are paid directly to them, and are
          entirely separate from our service fees. You can file directly with those agencies
          yourself without using any service, including ours.
        </>,
      ],
    },
    {
      id: 'no-guarantees',
      title: 'No guarantee of results',
      body: [
        <>
          Nothing on this website is a promise that an application will be approved, that a search
          will find every conflict, or that a registration will withstand challenge. Registration
          decisions belong to the examining agency.
        </>,
        <>
          Any timeframes given are estimates based on typical agency processing times and are
          outside our control.
        </>,
      ],
    },
    {
      id: 'information-only',
      title: 'Information on this site',
      body: [
        <>
          The articles, guides, service descriptions and FAQs on this site are general information
          about how the US trademark and copyright systems work. They are not advice about your
          situation, they may not be current, and they should not be relied on as a substitute for
          advice from a qualified professional.
        </>,
      ],
    },
    {
      id: 'testimonials',
      title: 'Testimonials and figures',
      body: [
        <>
          Testimonials on this site reflect the experience of individual clients. Individual results
          vary and no testimonial should be read as a prediction of your outcome. Where clients
          asked not to be fully identified, we show a first name and last initial.
        </>,
        <>
          Any statistics shown are figures for our own work and are used consistently across the
          site.
        </>,
      ],
    },
    {
      id: 'trade-marks',
      title: 'Marks used on this site',
      body: [
        <>
          The {B} name and logo are trade marks used by us in commerce. No claim of federal
          registration is made for any mark on this site unless a registration number is displayed
          alongside it.
        </>,
        <>
          Third-party names, marks and logos that appear anywhere on this site remain the property
          of their owners and are used only to describe the services those platforms operate. Their
          appearance does not imply any affiliation or endorsement.
        </>,
      ],
    },
    {
      id: 'contact',
      title: 'Questions',
      body: [<>Anything unclear here, email {mail} and we will answer plainly.</>],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Legal disclaimer', href: '/disclaimer' },
          ]),
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Legal disclaimer"
        intro={`What ${B} is, what it is not, and when you should be talking to a lawyer instead of us.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Legal disclaimer' }]}
      />
      <LegalDoc updated={UPDATED} sections={sections} />
    </>
  );
}
