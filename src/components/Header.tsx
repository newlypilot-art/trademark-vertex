'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { SiteConfig } from '@/lib/config';
import { services } from '@/lib/services';
import { BrandMark, IconArrow, IconChevron, IconClose, IconMail, IconMenu, ServiceIcon } from './Icons';

const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Our process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ cfg }: { cfg: SiteConfig }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      {/* QA #13 - a skip link that points at a target that actually exists. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold"
        style={{ background: 'var(--c-primary)', color: '#fff' }}
      >
        Skip to main content
      </a>

      {/* Utility bar */}
      <div
        className="hidden border-b lg:block"
        style={{ background: 'var(--c-primary-dark)', borderColor: 'rgba(255,255,255,.1)' }}
      >
        <div className="shell flex h-9 items-center justify-between text-[0.78rem]">
          <p style={{ color: 'rgba(255,255,255,.72)' }}>
            Federal trademark filing, search and monitoring for US business owners
          </p>
          <div className="flex items-center gap-5">
            {cfg.contact.phone ? (
              <a
                href={`tel:${cfg.contact.phone.replace(/[^\d+]/g, '')}`}
                className="font-medium transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,.8)' }}
              >
                {cfg.contact.phone}
              </a>
            ) : null}
            <a
              href={`mailto:${cfg.contact.email}`}
              className="inline-flex items-center gap-2 font-medium transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,.8)' }}
            >
              <IconMail className="h-4 w-4" />
              {cfg.contact.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className="sticky top-0 z-50 border-b transition-shadow duration-300"
        style={{
          background: 'color-mix(in srgb, var(--c-page) 88%, transparent)',
          backdropFilter: 'saturate(180%) blur(12px)',
          WebkitBackdropFilter: 'saturate(180%) blur(12px)',
          boxShadow: scrolled ? '0 8px 26px -22px rgba(15,23,42,.55)' : 'none',
        }}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${cfg.brand.name} home`}>
            {cfg.logos.header ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cfg.logos.header}
                alt={cfg.logos.headerAlt || `${cfg.brand.name} home`}
                className="h-9 w-auto max-w-[200px] object-contain"
                width={200}
                height={50}
              />
            ) : (
              <BrandMark name={cfg.brand.name} short={cfg.brand.shortName} />
            )}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors"
              style={{ color: isActive('/') ? 'var(--c-primary)' : 'var(--c-body)' }}
            >
              Home
            </Link>

            <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors"
                style={{ color: isActive('/services') ? 'var(--c-primary)' : 'var(--c-body)' }}
              >
                Services
                <IconChevron
                  className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {servicesOpen ? (
                <div
                  className="absolute left-1/2 top-[calc(100%+10px)] w-[min(46rem,88vw)] -translate-x-1/2 animate-fade-up rounded-2xl border p-3 shadow-lift"
                  style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--c-surface)]"
                      >
                        <span className="icon-tile h-9 w-9">
                          <ServiceIcon name={s.icon} className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span
                            className="block font-display text-[0.9rem] font-semibold"
                            style={{ color: 'var(--c-ink)' }}
                          >
                            {s.navName}
                          </span>
                          <span
                            className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug"
                            style={{ color: 'var(--c-muted)' }}
                          >
                            {s.summary}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="mt-2 flex items-center justify-between rounded-xl px-4 py-3 text-[0.875rem] font-semibold"
                    style={{ background: 'var(--c-primary-soft)', color: 'var(--c-primary)' }}
                  >
                    View all services and what each one includes
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {mainNav.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors"
                style={{ color: isActive(n.href) ? 'var(--c-primary)' : 'var(--c-body)' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link href="/contact" className="btn btn-primary !px-5 !py-2.5 !text-sm">
              Free trademark search
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border lg:hidden"
            style={{ borderColor: 'var(--c-line)', color: 'var(--c-ink)' }}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
          />
          <div
            className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col animate-fade-up border-l"
            style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b px-5">
              {cfg.logos.header ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cfg.logos.header}
                  alt={cfg.logos.headerAlt || cfg.brand.name}
                  className="h-8 w-auto max-w-[160px] object-contain"
                />
              ) : (
                <BrandMark name={cfg.brand.name} short={cfg.brand.shortName} />
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-lg border"
                style={{ borderColor: 'var(--c-line)' }}
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <Link
                href="/"
                className="block rounded-xl px-3 py-2.5 font-medium"
                style={{ color: isActive('/') ? 'var(--c-primary)' : 'var(--c-ink)' }}
              >
                Home
              </Link>

              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-medium"
                  style={{ color: 'var(--c-ink)' }}
                >
                  Services
                  <IconChevron
                    className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {servicesOpen ? (
                  <ul className="ml-3 mt-1 space-y-0.5 border-l pl-3">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block rounded-lg px-2.5 py-2 text-[0.875rem]"
                          style={{ color: 'var(--c-body)' }}
                        >
                          {s.navName}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="block rounded-lg px-2.5 py-2 text-[0.875rem] font-semibold"
                        style={{ color: 'var(--c-primary)' }}
                      >
                        All services
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>

              {mainNav.slice(1).map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="mt-1 block rounded-xl px-3 py-2.5 font-medium"
                  style={{ color: isActive(n.href) ? 'var(--c-primary)' : 'var(--c-ink)' }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="shrink-0 border-t p-4">
              <Link href="/contact" className="btn btn-primary w-full">
                Free trademark search
              </Link>
              <a
                href={`mailto:${cfg.contact.email}`}
                className="mt-3 flex items-center justify-center gap-2 text-[0.85rem] font-medium"
                style={{ color: 'var(--c-muted)' }}
              >
                <IconMail className="h-4 w-4" />
                {cfg.contact.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
