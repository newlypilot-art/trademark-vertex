import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
import { services } from '@/lib/services';

/**
 * QA #2 / #3 / #21: only real, fully written pages are listed. No demo posts,
 * no author archives, no thin service shells.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const staticPages: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['/', 1, 'weekly'],
    ['/services', 0.9, 'monthly'],
    ['/pricing', 0.9, 'monthly'],
    ['/process', 0.8, 'monthly'],
    ['/about', 0.7, 'yearly'],
    ['/contact', 0.8, 'yearly'],
    ['/privacy-policy', 0.3, 'yearly'],
    ['/terms-and-conditions', 0.3, 'yearly'],
    ['/disclaimer', 0.3, 'yearly'],
  ];

  return [
    ...staticPages.map(([path, priority, changeFrequency]) => ({
      url: `${base}${path === '/' ? '' : path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
