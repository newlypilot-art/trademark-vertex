import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getConfig, writeConfig, defaultConfig, type SiteConfig } from '@/lib/config';
import { isAuthed } from '@/lib/auth';
import { dashboardEnabled } from '@/lib/flags';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Production deploys have no dashboard, so this endpoint must not exist. */
function disabled() {
  return new NextResponse('Not found', { status: 404 });
}

export async function GET() {
  if (!dashboardEnabled()) return disabled();
  if (!isAuthed()) return NextResponse.json({ error: 'Not authorised' }, { status: 401 });
  return NextResponse.json(getConfig());
}

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v.slice(0, 4000) : fallback;
}

/** Rebuilds the config from the payload so nothing unexpected is ever written. */
function sanitise(input: any): SiteConfig {
  const d = defaultConfig;
  const cur = getConfig();

  return {
    brand: {
      name: str(input?.brand?.name, cur.brand.name).slice(0, 80) || cur.brand.name,
      shortName: str(input?.brand?.shortName, cur.brand.shortName).slice(0, 12),
      tagline: str(input?.brand?.tagline, cur.brand.tagline).slice(0, 300),
      legalEntity: str(input?.brand?.legalEntity, cur.brand.legalEntity).slice(0, 140),
      governingState: str(input?.brand?.governingState, cur.brand.governingState).slice(0, 60),
      foundedYear: Number(input?.brand?.foundedYear) || cur.brand.foundedYear,
    },
    logos: {
      header: str(input?.logos?.header, cur.logos.header).slice(0, 400),
      footer: str(input?.logos?.footer, cur.logos.footer).slice(0, 400),
      favicon: str(input?.logos?.favicon, cur.logos.favicon).slice(0, 400),
      headerAlt: str(input?.logos?.headerAlt, cur.logos.headerAlt).slice(0, 160),
      footerAlt: str(input?.logos?.footerAlt, cur.logos.footerAlt).slice(0, 160),
    },
    theme: Object.fromEntries(
      (Object.keys(d.theme) as (keyof SiteConfig['theme'])[]).map((k) => [
        k,
        str(input?.theme?.[k], cur.theme[k]).slice(0, 40),
      ]),
    ) as SiteConfig['theme'],
    contact: {
      email: str(input?.contact?.email, cur.contact.email).slice(0, 140),
      phone: str(input?.contact?.phone, cur.contact.phone).slice(0, 40),
      addressLine1: str(input?.contact?.addressLine1, cur.contact.addressLine1).slice(0, 160),
      addressLine2: str(input?.contact?.addressLine2, cur.contact.addressLine2).slice(0, 160),
      hours: str(input?.contact?.hours, cur.contact.hours).slice(0, 160),
      responseTime: str(input?.contact?.responseTime, cur.contact.responseTime).slice(0, 240),
    },
    stats: {
      enabled: Boolean(input?.stats?.enabled),
      items: Array.isArray(input?.stats?.items)
        ? input.stats.items.slice(0, 8).map((s: any) => ({
            value: str(s?.value).slice(0, 20),
            suffix: str(s?.suffix).slice(0, 12),
            label: str(s?.label).slice(0, 80),
          }))
        : cur.stats.items,
    },
    testimonials: {
      enabled: Boolean(input?.testimonials?.enabled),
      heading: str(input?.testimonials?.heading, cur.testimonials.heading).slice(0, 120),
      items: Array.isArray(input?.testimonials?.items)
        ? input.testimonials.items.slice(0, 24).map((t: any) => ({
            quote: str(t?.quote).slice(0, 900),
            name: str(t?.name).slice(0, 80),
            role: str(t?.role).slice(0, 120),
            location: str(t?.location).slice(0, 80),
            rating: Math.max(1, Math.min(5, Number(t?.rating) || 5)),
          }))
        : cur.testimonials.items,
    },
    pricing: {
      heading: str(input?.pricing?.heading, cur.pricing.heading).slice(0, 160),
      note: str(input?.pricing?.note, cur.pricing.note).slice(0, 400),
      usptoFee: str(input?.pricing?.usptoFee, cur.pricing.usptoFee).slice(0, 60),
      plans: Array.isArray(input?.pricing?.plans)
        ? input.pricing.plans.slice(0, 6).map((p: any, i: number) => ({
            id: str(p?.id, `plan-${i}`).slice(0, 40),
            name: str(p?.name).slice(0, 60),
            price: Math.max(0, Math.round(Number(p?.price) || 0)),
            summary: str(p?.summary).slice(0, 240),
            featured: Boolean(p?.featured),
            cta: str(p?.cta).slice(0, 60),
            features: Array.isArray(p?.features)
              ? p.features.slice(0, 20).map((f: any) => str(f).slice(0, 200)).filter(Boolean)
              : [],
          }))
        : cur.pricing.plans,
      addons: Array.isArray(input?.pricing?.addons)
        ? input.pricing.addons.slice(0, 30).map((a: any) => ({
            name: str(a?.name).slice(0, 160),
            price: str(a?.price).slice(0, 60),
          }))
        : cur.pricing.addons,
    },
    seo: {
      defaultTitle: str(input?.seo?.defaultTitle, cur.seo.defaultTitle).slice(0, 120),
      defaultDescription: str(input?.seo?.defaultDescription, cur.seo.defaultDescription).slice(0, 320),
      twitterHandle: str(input?.seo?.twitterHandle, cur.seo.twitterHandle).slice(0, 40),
    },
  };
}

export async function POST(req: Request) {
  if (!dashboardEnabled()) return disabled();
  if (!isAuthed()) return NextResponse.json({ error: 'Not authorised' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const next = sanitise(body);
    writeConfig(next);
    // Everything renders from the JSON on each request, but this clears any
    // cached render straight away.
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true, config: next });
  } catch (err) {
    return NextResponse.json(
      { error: 'Could not save. Check that data/site-config.json is writable.' },
      { status: 500 },
    );
  }
}
