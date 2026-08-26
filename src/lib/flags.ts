/**
 * The dashboard is a LOCAL authoring tool, not a live admin panel.
 *
 * The intended workflow is: run the site locally, set the brand name, colours,
 * logos and favicon in /dashboard, commit data/site-config.json and
 * public/uploads/ to git, then deploy. The same codebase can be deployed to any
 * number of domains, each branch carrying its own committed config.
 *
 * So on a production deploy the dashboard and every write endpoint must simply
 * not exist. The rule:
 *
 *   ENABLE_DASHBOARD=true    -> on  (set in .env.local, which git ignores)
 *   ENABLE_DASHBOARD=false   -> off
 *   not set                  -> on in development, OFF in production
 *
 * Because .env.local is never committed, a Vercel deploy has no flag, is a
 * production build, and therefore serves a genuine 404 on /dashboard and on
 * /api/auth, /api/config and /api/upload.
 */
export function dashboardEnabled(): boolean {
  const flag = process.env.ENABLE_DASHBOARD?.trim().toLowerCase();
  if (flag === 'true' || flag === '1') return true;
  if (flag === 'false' || flag === '0') return false;
  return process.env.NODE_ENV !== 'production';
}
