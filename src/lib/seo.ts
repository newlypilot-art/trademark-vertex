import type { Metadata } from 'next';
import { getConfig, siteUrl, type SiteConfig } from './config';

/**
 * QA #17 / #18: every page gets a unique 50-60 character title, a real meta
 * description, Open Graph tags and a Twitter card. Built in one place so no
 * page can quietly ship without them.
 */
export function pageMeta({
  title,
  description,
  path,
  cfg = getConfig(),
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  cfg?: SiteConfig;
  noindex?: boolean;
}): Metadata {
  const base = siteUrl();
  const url = `${base}${path === '/' ? '' : path}`;
  const full = `${title} | ${cfg.brand.name}`;

  return {
    // The root layout's title template appends the brand name, so the page
    // title is passed bare here to avoid doubling it up.
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      siteName: cfg.brand.name,
      title: full,
      description,
      url,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      ...(cfg.seo.twitterHandle ? { site: cfg.seo.twitterHandle } : {}),
    },
  };
}

/** Organization + LegalService node reused across pages. */
export function organizationSchema(cfg: SiteConfig) {
  const base = siteUrl();
  return {
    '@type': 'ProfessionalService',
    '@id': `${base}/#organization`,
    name: cfg.brand.name,
    legalName: cfg.brand.legalEntity || cfg.brand.name,
    url: base,
    email: cfg.contact.email,
    ...(cfg.contact.phone ? { telephone: cfg.contact.phone } : {}),
    description: cfg.seo.defaultDescription,
    areaServed: { '@type': 'Country', name: 'United States' },
    ...(cfg.contact.addressLine1
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: cfg.contact.addressLine1,
            addressLocality: cfg.contact.addressLine2,
            addressCountry: 'US',
          },
        }
      : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: cfg.contact.email,
      availableLanguage: ['English'],
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  const base = siteUrl();
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${base}${c.href === '/' ? '' : c.href}`,
    })),
  };
}

/** Serialises a graph of schema nodes into a single JSON-LD script tag. */
export function jsonLd(nodes: object[]) {
  return {
    __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(
      /</g,
      '\\u003c',
    ),
  };
}
