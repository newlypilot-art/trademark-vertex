import type { ReactNode } from 'react';
import { getConfig } from '@/lib/config';
import Header from './Header';
import Footer from './Footer';
import Reveal from './Reveal';

/**
 * The public site shell. Used by the (site) route group and by the 404 page,
 * so a not-found still gets the full navigation. The dashboard deliberately
 * does not use it.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const cfg = getConfig();
  return (
    <>
      <Header cfg={cfg} />
      {/* QA #13 - the skip link's target actually exists. */}
      <main id="main">{children}</main>
      <Footer cfg={cfg} />
      <Reveal />
    </>
  );
}
