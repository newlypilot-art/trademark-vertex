import type { Metadata } from 'next';
import { getConfig } from '@/lib/config';
import { breadcrumbSchema, jsonLd, pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/Blocks';
import LegalDoc, { Placeholder, type LegalSection } from '@/components/LegalDoc';

const UPDATED = 'January 2026';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  return pageMeta({
    cfg,
    path: '/terms-and-conditions',
    title: 'Terms and Conditions',
    description: `The terms on which ${cfg.brand.name} provides trademark and copyright document preparation and filing services, including scope, fees, refunds and limitation of liability.`,
  });
}

export default function TermsPage() {
  const cfg = getConfig();
  const B = cfg.brand.name;
  const entity = cfg.brand.legalEntity?.trim();
  const state = cfg.brand.governingState?.trim();
  const mail = (
    <a href={`mailto:${cfg.contact.email}`} className="link-underline font-semibold" style={{ color: 'var(--c-primary)' }}>
      {cfg.contact.email}
    </a>
  );

  const sections: LegalSection[] = [
    {
      id: 'agreement',
      title: 'Agreement to these terms',
      body: [
        <>
          These terms govern your use of this website and any services you order from{' '}
          {entity ? `${entity}, trading as ${B}` : <>{B}</>} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
          By using this site or engaging us, you agree to them. If you do not agree, do not use the
          site or the services.
        </>,
        !entity ? (
          <>
            <Placeholder>Publisher note: add your registered legal entity name in the dashboard</Placeholder>{' '}
            so that this clause names the contracting party. Until it is set, the trading name is
            used.
          </>
        ) : null,
      ].filter(Boolean) as LegalSection['body'],
    },
    {
      id: 'what-we-are',
      title: 'What we are, and what we are not',
      body: [
        <>
          <strong>{B} is a document preparation and filing service.</strong> We prepare and file
          trademark and copyright documents according to the instructions you give us.
        </>,
        <>
          We are <strong>not a law firm</strong>. We do not provide legal advice, legal opinions or
          legal representation, and using this site or our services does not create an
          attorney-client relationship. Nothing we send you is legal advice, and no communication
          from us is protected by attorney-client privilege.
        </>,
        <>
          Where your matter needs legal advice — for example a contested refusal, an opposition or
          cancellation proceeding, an infringement dispute, or a question about the strength of your
          rights — you should consult a licensed attorney, and we will tell you when we think you
          have reached that point.
        </>,
        <>
          We are not affiliated with, endorsed by or connected to the United States Patent and
          Trademark Office, the United States Copyright Office or any other government agency.
        </>,
      ],
    },
    {
      id: 'services',
      title: 'Services we provide',
      body: [
        <>
          Subject to these terms we provide: trademark clearance searching and written risk
          reporting; preparation and filing of federal trademark applications; preparation and
          filing of responses to office actions; statements of use, extension requests, and
          maintenance and renewal filings; trademark monitoring and alerting; copyright application
          preparation and filing; and preparation of takedown notices.
        </>,
        <>
          The scope of any engagement is the scope described in the package or quotation you accept.
          Work outside that scope is quoted separately and is not carried out until you approve it.
        </>,
      ],
    },
    {
      id: 'your-responsibilities',
      title: 'Your responsibilities',
      body: [
        <>
          You are responsible for the accuracy and completeness of everything you give us,
          including the mark, the goods and services you sell under it, your dates of first use and
          your specimens. We prepare filings from what you tell us. A filing based on inaccurate
          information can be refused, and a registration obtained on a false declaration can be
          cancelled.
        </>,
        <>
          You are responsible for reviewing and approving the application before it is submitted,
          for responding to our requests in time to meet deadlines, and for keeping your contact
          details current.
        </>,
        <>
          You confirm that you have the right to use and register the mark you ask us to file, and
          that filing it does not knowingly infringe anyone else&rsquo;s rights.
        </>,
      ],
    },
    {
      id: 'no-guarantee',
      title: 'No guarantee of outcome',
      body: [
        <>
          Registration is decided by the USPTO or the Copyright Office, not by us. Nobody can
          guarantee that an application will be approved. Our searches reduce foreseeable risk; they
          do not eliminate it, and no search can surface every unregistered right that may exist.
        </>,
        <>
          Timeframes we give are estimates based on typical agency processing and are outside our
          control.
        </>,
      ],
    },
    {
      id: 'fees',
      title: 'Fees and government charges',
      body: [
        <>
          Our service fees are stated on the pricing page and in any quotation we send you.{' '}
          <strong>Government filing fees are separate.</strong> They are set by the USPTO or the
          Copyright Office, are paid directly to those agencies, and are not part of our fee.
        </>,
        <>
          Fees are payable before work begins unless we have agreed otherwise in writing. Government
          fees are charged at the point of filing. Nothing is filed and nothing is charged without
          your approval.
        </>,
      ],
    },
    {
      id: 'refunds',
      title: 'Refunds',
      body: [
        <>
          Government filing fees are never refundable, by us or by anyone, once an application has
          been submitted. That is the agencies&rsquo; rule, not ours.
        </>,
        <>
          Our service fee is refundable in full if you cancel before we have begun work. Once work
          has begun, we refund the portion representing work not yet performed. Our fee is not
          refundable on the basis that an application was refused, because the fee is for the
          preparation and filing work, which is performed either way.
        </>,
        <>Refund requests go to {mail} and are answered within five business days.</>,
      ],
    },
    {
      id: 'deadlines',
      title: 'Deadlines',
      body: [
        <>
          Agency deadlines are strict and missing one can cause an application or registration to be
          abandoned or cancelled. Where we are engaged to manage a filing we will diary the relevant
          deadlines and remind you. We are not responsible for a deadline missed because you did not
          instruct or pay us in time, because your contact details were out of date, or because you
          engaged us after the deadline had already passed or was too close to meet.
        </>,
      ],
    },
    {
      id: 'ip',
      title: 'Intellectual property in this site',
      body: [
        <>
          The content of this website — text, layout, graphics and code — belongs to us and is
          protected by copyright. You may not copy or reproduce it other than for your own
          reference. The {B} name and logo are our trade marks. Nothing on this site claims federal
          registration of any mark unless a registration number is shown alongside it.
        </>,
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: [
        <>
          To the fullest extent permitted by law, our total liability arising out of or relating to
          any engagement is limited to the service fees you actually paid us for the matter giving
          rise to the claim. We are not liable for indirect, incidental, special or consequential
          losses, including lost profits, lost business or loss of trademark rights.
        </>,
        <>
          Nothing in these terms excludes liability that cannot lawfully be excluded, including
          liability for fraud.
        </>,
      ],
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      body: [
        <>
          We keep what you tell us confidential and use it only to provide the services. That
          confidentiality is contractual, not legal privilege — see section 2. Information that must
          appear in a public filing becomes part of the agency&rsquo;s public record.
        </>,
      ],
    },
    {
      id: 'termination',
      title: 'Termination',
      body: [
        <>
          Either of us may end an engagement in writing at any time. On termination we will invoice
          for work performed to that point and hand over the documents we have prepared. We may
          decline or discontinue an engagement where we believe a filing would be inaccurate,
          misleading or improper.
        </>,
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law and disputes',
      body: [
        <>
          These terms are governed by the laws of{' '}
          {state ? (
            <strong>the State of {state}</strong>
          ) : (
            <Placeholder>[set your governing state in the dashboard]</Placeholder>
          )}
          , without regard to its conflict-of-laws rules, and the state and federal courts located
          in that state have exclusive jurisdiction over any dispute.
        </>,
        <>
          Before starting proceedings, both of us agree to try in good faith to resolve the dispute
          by writing to the other and allowing thirty days to respond.
        </>,
        !state ? (
          <>
            <Placeholder>Publisher note</Placeholder> — a governing-law clause that does not name a
            state is unenforceable as written. Set the state in the dashboard before you take live
            traffic.
          </>
        ) : null,
      ].filter(Boolean) as LegalSection['body'],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: [
        <>
          We may update these terms. The version in force for your engagement is the version
          published when you accepted it. Continued use of the site after an update means you accept
          the updated terms for future engagements.
        </>,
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      body: [<>Questions about these terms go to {mail}.</>],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Terms and conditions', href: '/terms-and-conditions' },
          ]),
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Terms and conditions"
        intro={`The terms on which ${B} provides document preparation and filing services. Written to match what we actually do.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms and conditions' }]}
      />
      <LegalDoc updated={UPDATED} sections={sections} />
    </>
  );
}
