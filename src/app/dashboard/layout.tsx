import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { dashboardEnabled } from '@/lib/flags';

export const metadata: Metadata = {
  title: 'Site dashboard',
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The dashboard deliberately renders without the public header and footer, so
 * it is a clean editing surface rather than a page inside the site. It is also
 * gated here as well as in the page, so no future route added under /dashboard
 * can accidentally ship to production.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  if (!dashboardEnabled()) notFound();
  return <>{children}</>;
}
