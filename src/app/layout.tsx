import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getConfig, siteUrl } from '@/lib/config';
import { jsonLd, organizationSchema } from '@/lib/seo';
import ThemeStyle from '@/components/ThemeStyle';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const cfg = getConfig();
  const base = siteUrl();
  const icon = cfg.logos.favicon || '/favicon.svg';

  return {
    metadataBase: new URL(base),
    title: {
      default: `${cfg.seo.defaultTitle} | ${cfg.brand.name}`,
      template: `%s | ${cfg.brand.name}`,
    },
    description: cfg.seo.defaultDescription,
    applicationName: cfg.brand.name,
    referrer: 'strict-origin-when-cross-origin',
    icons: {
      icon: [{ url: icon }],
      shortcut: [{ url: icon }],
      apple: [{ url: icon }],
    },
    openGraph: {
      type: 'website',
      siteName: cfg.brand.name,
      locale: 'en_US',
      url: base,
    },
    twitter: { card: 'summary_large_image' },
    formatDetection: { telephone: true, email: true, address: false },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cfg = getConfig();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap"
        />
        <meta name="theme-color" content={cfg.theme.primary} />
        <ThemeStyle theme={cfg.theme} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([organizationSchema(cfg)])} />
      </head>
      <body>{children}</body>
    </html>
  );
}
