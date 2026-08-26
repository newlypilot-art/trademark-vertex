import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /dashboard is deliberately not listed: on a live deploy it does not
        // exist at all, and naming it here would only advertise a path worth
        // probing. It also carries a noindex header wherever it is enabled.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
