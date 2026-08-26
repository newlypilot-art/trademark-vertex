import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import { isAuthed } from '@/lib/auth';
import { dashboardEnabled } from '@/lib/flags';
import Dashboard from '@/components/Dashboard';
import DashboardLogin from '@/components/DashboardLogin';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  // On a production deploy the dashboard does not exist at all — this renders
  // the site's normal 404 page with a real 404 status. See src/lib/flags.ts.
  if (!dashboardEnabled()) notFound();

  const cfg = getConfig();
  if (!isAuthed()) return <DashboardLogin brand={cfg.brand.name} />;
  return <Dashboard initial={cfg} />;
}
