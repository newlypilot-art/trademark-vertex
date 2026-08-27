'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Adds the on-scroll reveal to anything marked with data-reveal.
 *
 * This component lives in the persistent (site) layout, so it does NOT remount
 * when you move between pages. An observer set up once on mount would therefore
 * only ever watch the first page's elements, and every page you navigated to
 * afterwards would keep `opacity: 0` until a hard refresh. Three things prevent
 * that now:
 *
 *   1. the effect re-runs on every pathname change and rescans the document;
 *   2. a MutationObserver catches elements that mount after the scan — streamed
 *      route segments, client components, anything rendered late;
 *   3. anything already scrolled past (restored scroll position on a back
 *      navigation, for instance) is revealed immediately rather than waiting for
 *      an intersection that can never happen.
 *
 * The CSS keeps [data-reveal] hidden, and a <noscript> block in the root layout
 * un-hides it, so a visitor without JavaScript still sees every section.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    const show = (el: Element) => el.classList.add('is-visible');

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No observer support, or the visitor asked for no motion: just show it all,
    // now and for anything that mounts later.
    if (typeof IntersectionObserver === 'undefined' || reducedMotion) {
      pending().forEach(show);
      const mo = new MutationObserver(() => pending().forEach(show));
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const scan = () => {
      for (const el of pending()) {
        // Already scrolled past — it would never intersect again, so show it.
        if (el.getBoundingClientRect().bottom < 0) {
          show(el);
          continue;
        }
        io.observe(el);
      }
    };

    scan();

    // Coalesce bursts of DOM changes into one scan per frame.
    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
