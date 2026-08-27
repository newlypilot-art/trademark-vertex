import fs from 'node:fs';
import path from 'node:path';
// Imported statically as well as read from disk. The static import is bundled
// at build time, which is what guarantees the committed brand name, colours and
// logo paths survive a serverless deploy (Vercel included) even if the JSON file
// itself is not traced into the function bundle.
import bundledConfig from '../../data/site-config.json';

export type Stat = { value: string; suffix?: string; label: string };
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating?: number;
};
export type Plan = {
  id: string;
  name: string;
  price: number;
  summary: string;
  featured: boolean;
  cta?: string;
  features: string[];
};
export type Addon = { name: string; price: string };

export type SiteConfig = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    legalEntity: string;
    governingState: string;
    foundedYear: number;
  };
  logos: {
    header: string;
    footer: string;
    favicon: string;
    headerAlt: string;
    footerAlt: string;
    /** Rendered height in px of the header logo. 28-72. */
    headerHeight: number;
    /** Rendered height in px of the footer logo. 28-96. */
    footerHeight: number;
  };
  theme: {
    primary: string;
    primaryDark: string;
    primarySoft: string;
    accent: string;
    accentSoft: string;
    ink: string;
    body: string;
    muted: string;
    surface: string;
    line: string;
    page: string;
  };
  contact: {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    hours: string;
    responseTime: string;
  };
  stats: { enabled: boolean; items: Stat[] };
  testimonials: { enabled: boolean; heading: string; items: Testimonial[] };
  pricing: {
    heading: string;
    note: string;
    usptoFee: string;
    plans: Plan[];
    addons: Addon[];
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    twitterHandle: string;
  };
};

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-config.json');

/**
 * Fallback used only if data/site-config.json is missing or unreadable, so the
 * site renders rather than crashing. The real values live in the JSON file.
 */
export const defaultConfig: SiteConfig = {
  brand: {
    name: 'Trademark Vertex',
    shortName: 'TV',
    tagline: 'Federal trademark filing, search, monitoring and renewal support for US brand owners.',
    legalEntity: '',
    governingState: '',
    foundedYear: 2026,
  },
  logos: {
    header: '',
    footer: '',
    favicon: '',
    headerAlt: '',
    footerAlt: '',
    headerHeight: 48,
    footerHeight: 56,
  },
  theme: {
    primary: '#0D5C47',
    primaryDark: '#073B2E',
    primarySoft: '#E6F2EE',
    accent: '#12B886',
    accentSoft: '#DFF6EE',
    ink: '#0F172A',
    body: '#475569',
    muted: '#64748B',
    surface: '#F6F9F8',
    line: '#E2E8F0',
    page: '#FFFFFF',
  },
  contact: {
    email: 'support@trademarkvertex.com',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    hours: 'Monday to Friday, 9:00am to 6:00pm ET',
    responseTime: 'We reply to every message within one business day.',
  },
  stats: { enabled: true, items: [] },
  testimonials: { enabled: true, heading: 'What brand owners say', items: [] },
  pricing: { heading: 'Pricing', note: '', usptoFee: '$350 per class', plans: [], addons: [] },
  seo: {
    defaultTitle: 'Federal Trademark Registration Services',
    defaultDescription:
      'Prepare and file your federal trademark application with guided support.',
    twitterHandle: '',
  },
};

function deepMerge<T>(base: T, patch: any): T {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(patch)) return patch as unknown as T;
  if (typeof patch !== 'object') return patch as T;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };
  for (const key of Object.keys(patch)) {
    out[key] = deepMerge((base as any)?.[key], patch[key]);
  }
  return out as T;
}

/**
 * Reads the JSON config on every request so the dashboard's saves are live
 * immediately in local development. Falls back to the build-time bundled copy
 * (and then to the hard-coded defaults) if the file cannot be read, which is
 * what happens on a read-only or partially-traced serverless filesystem.
 */
export function getConfig(): SiteConfig {
  const bundled = deepMerge(defaultConfig, bundledConfig as unknown);
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    return deepMerge(bundled, JSON.parse(raw));
  } catch {
    return bundled;
  }
}

export function writeConfig(next: SiteConfig) {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8');
}

export { CONFIG_PATH };

/** Replaces {{brand}} / {{short}} tokens so one dashboard field renames the whole site. */
export function fill(template: string, cfg: SiteConfig): string {
  return template
    .replace(/\{\{brand\}\}/g, cfg.brand.name)
    .replace(/\{\{short\}\}/g, cfg.brand.shortName)
    .replace(/\{\{email\}\}/g, cfg.contact.email);
}

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://trademarkvertex.com';
  return raw.replace(/\/$/, '');
}
