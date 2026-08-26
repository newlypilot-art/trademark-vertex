'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteConfig } from '@/lib/config';
import LogoCropper from './LogoCropper';
import { IconCheck } from './Icons';

const TABS = ['Brand', 'Logos', 'Theme', 'Content', 'Pricing', 'Contact & SEO'] as const;
type Tab = (typeof TABS)[number];

const THEME_FIELDS: { key: keyof SiteConfig['theme']; label: string; help: string }[] = [
  { key: 'primary', label: 'Primary', help: 'Buttons, links, active nav, icon tiles' },
  { key: 'primaryDark', label: 'Primary dark', help: 'Footer, CTA band, hover states' },
  { key: 'primarySoft', label: 'Primary soft', help: 'Icon tile backgrounds, chips' },
  { key: 'accent', label: 'Accent', help: 'Highlights, eyebrow rules, stars, featured plan CTA' },
  { key: 'accentSoft', label: 'Accent soft', help: 'Tick backgrounds, avatar rings' },
  { key: 'ink', label: 'Heading text', help: 'All headings and strong text' },
  { key: 'body', label: 'Body text', help: 'Paragraph text' },
  { key: 'muted', label: 'Muted text', help: 'Labels, captions, meta' },
  { key: 'surface', label: 'Surface', help: 'Alternating section backgrounds' },
  { key: 'line', label: 'Borders', help: 'Card borders, dividers, inputs' },
  { key: 'page', label: 'Page background', help: 'The base page colour' },
];

const PRESETS: { name: string; theme: SiteConfig['theme'] }[] = [
  {
    name: 'Emerald & slate',
    theme: {
      primary: '#0D5C47', primaryDark: '#073B2E', primarySoft: '#E6F2EE',
      accent: '#12B886', accentSoft: '#DFF6EE', ink: '#0F172A', body: '#475569',
      muted: '#64748B', surface: '#F6F9F8', line: '#E2E8F0', page: '#FFFFFF',
    },
  },
  {
    name: 'Navy & gold',
    theme: {
      primary: '#123A63', primaryDark: '#0A2440', primarySoft: '#E8EFF7',
      accent: '#C89B3C', accentSoft: '#F7EFDC', ink: '#101A27', body: '#48566B',
      muted: '#6B7A90', surface: '#F6F8FB', line: '#E3E8EF', page: '#FFFFFF',
    },
  },
  {
    name: 'Indigo & amber',
    theme: {
      primary: '#4338CA', primaryDark: '#28218C', primarySoft: '#EAE8FB',
      accent: '#F59E0B', accentSoft: '#FDF0D8', ink: '#151329', body: '#4B4A63',
      muted: '#6E6C8A', surface: '#F7F7FC', line: '#E5E4F0', page: '#FFFFFF',
    },
  },
  {
    name: 'Charcoal & orange',
    theme: {
      primary: '#262626', primaryDark: '#121212', primarySoft: '#EFEFEF',
      accent: '#EA6A26', accentSoft: '#FCE9DD', ink: '#141414', body: '#4A4A4A',
      muted: '#767676', surface: '#F7F6F5', line: '#E4E2E0', page: '#FFFFFF',
    },
  },
  {
    name: 'Teal & coral',
    theme: {
      primary: '#0F5B60', primaryDark: '#083A3E', primarySoft: '#E3F1F1',
      accent: '#F0705C', accentSoft: '#FDE7E3', ink: '#0E1F21', body: '#455456',
      muted: '#6C7B7D', surface: '#F5F9F9', line: '#E1E9E9', page: '#FFFFFF',
    },
  },
  {
    name: 'Burgundy & sand',
    theme: {
      primary: '#722F37', primaryDark: '#4A1D23', primarySoft: '#F4E9EA',
      accent: '#C99A55', accentSoft: '#F8EEDF', ink: '#1C1214', body: '#54464A',
      muted: '#7E6E72', surface: '#FAF7F5', line: '#EAE1DE', page: '#FFFFFF',
    },
  },
];

export default function Dashboard({ initial }: { initial: SiteConfig }) {
  const router = useRouter();
  const [cfg, setCfg] = useState<SiteConfig>(initial);
  const [tab, setTab] = useState<Tab>('Brand');
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState('');
  const dirty = useMemo(() => JSON.stringify(cfg) !== JSON.stringify(initial), [cfg, initial]);

  function patch(fn: (draft: SiteConfig) => void) {
    setCfg((prev) => {
      const next: SiteConfig = JSON.parse(JSON.stringify(prev));
      fn(next);
      return next;
    });
    setState('idle');
  }

  async function save() {
    setState('saving');
    setError('');
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cfg),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Save failed');
      setState('saved');
      router.refresh();
      setTimeout(() => setState('idle'), 2500);
    } catch (e: any) {
      setState('idle');
      setError(e?.message || 'Could not save.');
    }
  }

  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div style={{ background: 'var(--c-surface)', minHeight: '100vh' }}>
      {/* Live theme preview: the dashboard itself repaints as you pick colours. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `.tv-dash{--c-primary:${cfg.theme.primary};--c-primary-dark:${cfg.theme.primaryDark};--c-primary-soft:${cfg.theme.primarySoft};--c-accent:${cfg.theme.accent};--c-accent-soft:${cfg.theme.accentSoft};--c-ink:${cfg.theme.ink};--c-body:${cfg.theme.body};--c-muted:${cfg.theme.muted};--c-surface:${cfg.theme.surface};--c-line:${cfg.theme.line};--c-page:${cfg.theme.page};}`,
        }}
      />

      <div className="tv-dash">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 border-b"
          style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl text-[0.75rem] font-bold text-white"
                style={{ background: 'var(--c-primary)' }}
              >
                {(cfg.brand.shortName || cfg.brand.name.slice(0, 2)).slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="font-display text-[0.95rem] font-semibold" style={{ color: 'var(--c-ink)' }}>
                  Site dashboard
                </p>
                <p className="text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>
                  {cfg.brand.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {error ? (
                <span className="text-[0.8125rem] font-medium" style={{ color: '#b42318' }}>
                  {error}
                </span>
              ) : state === 'saved' ? (
                <span
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold"
                  style={{ color: 'var(--c-primary)' }}
                >
                  <IconCheck className="h-4 w-4" /> Saved
                </span>
              ) : dirty ? (
                <span className="text-[0.8125rem]" style={{ color: 'var(--c-muted)' }}>
                  Unsaved changes
                </span>
              ) : null}
              <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline !px-4 !py-2 !text-[0.8125rem]">
                View site
              </a>
              <button type="button" onClick={logout} className="btn btn-outline !px-4 !py-2 !text-[0.8125rem]">
                Log out
              </button>
              <button
                type="button"
                onClick={save}
                disabled={state === 'saving' || !dirty}
                className="btn btn-primary !px-5 !py-2 !text-[0.8125rem] disabled:opacity-45"
              >
                {state === 'saving' ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-6xl overflow-x-auto px-5">
            <div className="flex gap-1 pb-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-colors"
                  style={{
                    background: tab === t ? 'var(--c-primary)' : 'transparent',
                    color: tab === t ? '#fff' : 'var(--c-body)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8" style={{ color: 'var(--c-body)' }}>
          {tab === 'Brand' ? (
            <Panel
              title="Brand name"
              note="Change the name here and it updates everywhere on the site at once — header, footer, every page of body copy, page titles, meta descriptions, the legal documents and the structured data."
            >
              <Grid>
                <Text
                  label="Brand name"
                  value={cfg.brand.name}
                  onChange={(v) => patch((d) => void (d.brand.name = v))}
                  help="Used site-wide. This is the field you asked for."
                />
                <Text
                  label="Short name / initials"
                  value={cfg.brand.shortName}
                  onChange={(v) => patch((d) => void (d.brand.shortName = v))}
                  help="Shown in the fallback wordmark when no logo is uploaded. Two characters works best."
                />
              </Grid>
              <Text
                label="Tagline"
                value={cfg.brand.tagline}
                onChange={(v) => patch((d) => void (d.brand.tagline = v))}
                help="Appears under the footer logo."
              />
              <Grid>
                <Text
                  label="Registered legal entity"
                  value={cfg.brand.legalEntity}
                  onChange={(v) => patch((d) => void (d.brand.legalEntity = v))}
                  help="e.g. Trademark Vertex LLC. Used in the Terms, the disclaimer and the copyright line. Leave blank to use the brand name."
                />
                <Text
                  label="Governing state"
                  value={cfg.brand.governingState}
                  onChange={(v) => patch((d) => void (d.brand.governingState = v))}
                  help="e.g. Delaware. Without it the governing-law clause in your Terms is unenforceable."
                />
              </Grid>
            </Panel>
          ) : null}

          {tab === 'Logos' ? (
            <Panel
              title="Logos and favicon"
              note="Each slot has its own cropper locked to the exact aspect ratio that slot renders at, so an upload can never come out stretched or clipped."
            >
              <div className="space-y-5">
                <LogoCropper
                  slot="header"
                  value={cfg.logos.header}
                  onChange={(url) => patch((d) => void (d.logos.header = url))}
                />
                <Text
                  label="Header logo alt text"
                  value={cfg.logos.headerAlt}
                  onChange={(v) => patch((d) => void (d.logos.headerAlt = v))}
                  help="Describes the logo for screen readers and for search engines."
                />
                <LogoCropper
                  slot="footer"
                  value={cfg.logos.footer}
                  onChange={(url) => patch((d) => void (d.logos.footer = url))}
                />
                <Text
                  label="Footer logo alt text"
                  value={cfg.logos.footerAlt}
                  onChange={(v) => patch((d) => void (d.logos.footerAlt = v))}
                />
                <LogoCropper
                  slot="favicon"
                  value={cfg.logos.favicon}
                  onChange={(url) => patch((d) => void (d.logos.favicon = url))}
                />
              </div>
            </Panel>
          ) : null}

          {tab === 'Theme' ? (
            <>
              <Panel title="Presets" note="Click one to load it, then adjust anything below.">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => patch((d) => void (d.theme = { ...p.theme }))}
                      className="flex items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:border-[var(--c-primary)]"
                      style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}
                    >
                      <span className="flex -space-x-1.5">
                        {[p.theme.primaryDark, p.theme.primary, p.theme.accent, p.theme.surface].map((c) => (
                          <span
                            key={c}
                            className="h-7 w-7 rounded-full ring-2"
                            style={{ background: c, ['--tw-ring-color' as any]: 'var(--c-page)' }}
                          />
                        ))}
                      </span>
                      <span className="text-[0.875rem] font-semibold" style={{ color: 'var(--c-ink)' }}>
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </Panel>

              <Panel
                title="Colours"
                note="Every colour on the site reads from these eleven values. Change one and it changes everywhere it is used."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {THEME_FIELDS.map((f) => (
                    <div
                      key={f.key}
                      className="flex items-center gap-3 rounded-xl border p-3"
                      style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}
                    >
                      <input
                        type="color"
                        value={/^#[0-9a-f]{6}$/i.test(cfg.theme[f.key]) ? cfg.theme[f.key] : '#000000'}
                        onChange={(e) => patch((d) => void (d.theme[f.key] = e.target.value))}
                        className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                        aria-label={`${f.label} colour picker`}
                      />
                      <div className="min-w-0 flex-1">
                        <label
                          className="block text-[0.8125rem] font-semibold"
                          style={{ color: 'var(--c-ink)' }}
                          htmlFor={`theme-${f.key}`}
                        >
                          {f.label}
                        </label>
                        <input
                          id={`theme-${f.key}`}
                          value={cfg.theme[f.key]}
                          onChange={(e) => patch((d) => void (d.theme[f.key] = e.target.value))}
                          className="mt-1 w-full rounded-lg border px-2.5 py-1.5 font-mono text-[0.78rem] uppercase"
                          style={{ borderColor: 'var(--c-line)', color: 'var(--c-ink)' }}
                        />
                        <p className="mt-1 text-[0.72rem]" style={{ color: 'var(--c-muted)' }}>
                          {f.help}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Preview" note="A live sample using the colours above.">
                <div
                  className="rounded-2xl border p-6"
                  style={{ background: 'var(--c-page)', borderColor: 'var(--c-line)' }}
                >
                  <p className="eyebrow">Section eyebrow</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold" style={{ color: 'var(--c-ink)' }}>
                    A heading in your ink colour
                  </h3>
                  <p className="mt-2 text-[0.9375rem]" style={{ color: 'var(--c-body)' }}>
                    Body copy sits in the body colour, and small print like captions uses the muted
                    colour.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="btn btn-primary !px-5 !py-2.5 !text-sm">Primary button</span>
                    <span className="btn btn-accent !px-5 !py-2.5 !text-sm">Accent button</span>
                    <span className="btn btn-outline !px-5 !py-2.5 !text-sm">Outline button</span>
                    <span className="chip">Chip</span>
                  </div>
                  <div className="mt-5 rounded-xl p-4" style={{ background: 'var(--c-primary-dark)' }}>
                    <p className="text-[0.875rem]" style={{ color: 'rgba(255,255,255,.8)' }}>
                      This is the footer and CTA band background.
                    </p>
                  </div>
                </div>
              </Panel>
            </>
          ) : null}

          {tab === 'Content' ? (
            <>
              <Panel
                title="Statistics band"
                note="One set of numbers, shown on the home page and the about page. Keep them true and keep them consistent."
              >
                <Toggle
                  label="Show the statistics band"
                  checked={cfg.stats.enabled}
                  onChange={(v) => patch((d) => void (d.stats.enabled = v))}
                />
                <div className="mt-4 space-y-3">
                  {cfg.stats.items.map((s, i) => (
                    <Row key={i} onRemove={() => patch((d) => void d.stats.items.splice(i, 1))}>
                      <Text label="Value" value={s.value} onChange={(v) => patch((d) => void (d.stats.items[i].value = v))} />
                      <Text label="Suffix" value={s.suffix ?? ''} onChange={(v) => patch((d) => void (d.stats.items[i].suffix = v))} />
                      <Text label="Label" value={s.label} onChange={(v) => patch((d) => void (d.stats.items[i].label = v))} />
                    </Row>
                  ))}
                </div>
                <AddButton
                  onClick={() => patch((d) => void d.stats.items.push({ value: '0', suffix: '+', label: 'New statistic' }))}
                >
                  Add a statistic
                </AddButton>
              </Panel>

              <Panel title="Testimonials" note="Shown in the carousel on the home page.">
                <Toggle
                  label="Show the testimonials section"
                  checked={cfg.testimonials.enabled}
                  onChange={(v) => patch((d) => void (d.testimonials.enabled = v))}
                />
                <div className="mt-4">
                  <Text
                    label="Section heading"
                    value={cfg.testimonials.heading}
                    onChange={(v) => patch((d) => void (d.testimonials.heading = v))}
                  />
                </div>
                <div className="mt-4 space-y-3">
                  {cfg.testimonials.items.map((t, i) => (
                    <Row key={i} onRemove={() => patch((d) => void d.testimonials.items.splice(i, 1))}>
                      <Area label="Quote" value={t.quote} onChange={(v) => patch((d) => void (d.testimonials.items[i].quote = v))} full />
                      <Text label="Name" value={t.name} onChange={(v) => patch((d) => void (d.testimonials.items[i].name = v))} />
                      <Text label="Role" value={t.role} onChange={(v) => patch((d) => void (d.testimonials.items[i].role = v))} />
                      <Text label="Location" value={t.location} onChange={(v) => patch((d) => void (d.testimonials.items[i].location = v))} />
                      <Text
                        label="Rating (1-5)"
                        value={String(t.rating ?? 5)}
                        onChange={(v) => patch((d) => void (d.testimonials.items[i].rating = Number(v) || 5))}
                      />
                    </Row>
                  ))}
                </div>
                <AddButton
                  onClick={() =>
                    patch((d) =>
                      void d.testimonials.items.push({
                        quote: '',
                        name: '',
                        role: '',
                        location: '',
                        rating: 5,
                      }),
                    )
                  }
                >
                  Add a testimonial
                </AddButton>
              </Panel>
            </>
          ) : null}

          {tab === 'Pricing' ? (
            <>
              <Panel title="Pricing section" note="Shown on the home page and the pricing page.">
                <Grid>
                  <Text label="Section heading" value={cfg.pricing.heading} onChange={(v) => patch((d) => void (d.pricing.heading = v))} />
                  <Text label="Government fee text" value={cfg.pricing.usptoFee} onChange={(v) => patch((d) => void (d.pricing.usptoFee = v))} />
                </Grid>
                <Area label="Note under the heading" value={cfg.pricing.note} onChange={(v) => patch((d) => void (d.pricing.note = v))} />
              </Panel>

              <Panel title="Packages" note="Exactly one package should be marked as featured.">
                <div className="space-y-4">
                  {cfg.pricing.plans.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border p-5"
                      style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}
                    >
                      <Grid>
                        <Text label="Name" value={p.name} onChange={(v) => patch((d) => void (d.pricing.plans[i].name = v))} />
                        <Text
                          label="Price (number only)"
                          value={String(p.price)}
                          onChange={(v) => patch((d) => void (d.pricing.plans[i].price = Number(v.replace(/[^\d]/g, '')) || 0))}
                        />
                      </Grid>
                      <Area label="Summary" value={p.summary} onChange={(v) => patch((d) => void (d.pricing.plans[i].summary = v))} />
                      <Grid>
                        <Text label="Button label" value={p.cta ?? ''} onChange={(v) => patch((d) => void (d.pricing.plans[i].cta = v))} />
                        <div className="pt-6">
                          <Toggle
                            label="Featured (highlighted, dark card)"
                            checked={p.featured}
                            onChange={(v) =>
                              patch((d) => {
                                d.pricing.plans.forEach((pl, j) => (pl.featured = v && j === i));
                              })
                            }
                          />
                        </div>
                      </Grid>
                      <Area
                        label="Features (one per line)"
                        value={p.features.join('\n')}
                        onChange={(v) =>
                          patch((d) => void (d.pricing.plans[i].features = v.split('\n').map((x) => x.trim()).filter(Boolean)))
                        }
                        rows={7}
                      />
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Add-ons" note="Listed on the pricing page.">
                <div className="space-y-3">
                  {cfg.pricing.addons.map((a, i) => (
                    <Row key={i} onRemove={() => patch((d) => void d.pricing.addons.splice(i, 1))}>
                      <Text label="Name" value={a.name} onChange={(v) => patch((d) => void (d.pricing.addons[i].name = v))} />
                      <Text label="Price" value={a.price} onChange={(v) => patch((d) => void (d.pricing.addons[i].price = v))} />
                    </Row>
                  ))}
                </div>
                <AddButton onClick={() => patch((d) => void d.pricing.addons.push({ name: '', price: '' }))}>
                  Add an add-on
                </AddButton>
              </Panel>
            </>
          ) : null}

          {tab === 'Contact & SEO' ? (
            <>
              <Panel title="Contact details" note="Used in the header bar, the footer, the contact page and the structured data. Leave a field blank and it is hidden everywhere rather than rendering empty.">
                <Grid>
                  <Text label="Email" value={cfg.contact.email} onChange={(v) => patch((d) => void (d.contact.email = v))} />
                  <Text label="Phone" value={cfg.contact.phone} onChange={(v) => patch((d) => void (d.contact.phone = v))} help="Rendered as a tap-to-call link. Blank hides it." />
                </Grid>
                <Grid>
                  <Text label="Address line 1" value={cfg.contact.addressLine1} onChange={(v) => patch((d) => void (d.contact.addressLine1 = v))} />
                  <Text label="Address line 2" value={cfg.contact.addressLine2} onChange={(v) => patch((d) => void (d.contact.addressLine2 = v))} />
                </Grid>
                <Grid>
                  <Text label="Opening hours" value={cfg.contact.hours} onChange={(v) => patch((d) => void (d.contact.hours = v))} />
                  <Text label="Response promise" value={cfg.contact.responseTime} onChange={(v) => patch((d) => void (d.contact.responseTime = v))} />
                </Grid>
              </Panel>

              <Panel title="Search engine defaults" note="The home page title and the description used where a page has no more specific one.">
                <Text label="Default title" value={cfg.seo.defaultTitle} onChange={(v) => patch((d) => void (d.seo.defaultTitle = v))} help={`Renders as "${cfg.seo.defaultTitle} | ${cfg.brand.name}" — aim for 50 to 60 characters in total.`} />
                <Area label="Default meta description" value={cfg.seo.defaultDescription} onChange={(v) => patch((d) => void (d.seo.defaultDescription = v))} help="Aim for 140 to 160 characters." />
                <Text label="Twitter / X handle" value={cfg.seo.twitterHandle} onChange={(v) => patch((d) => void (d.seo.twitterHandle = v))} help="Including the @. Optional." />
              </Panel>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ pieces */

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section
      className="mb-6 rounded-2xl border p-6"
      style={{ background: 'var(--c-surface)', borderColor: 'var(--c-line)' }}
    >
      <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--c-ink)' }}>
        {title}
      </h2>
      {note ? (
        <p className="mt-1.5 max-w-3xl text-[0.8125rem] leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          {note}
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Text({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
}) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className="mb-4 last:mb-0">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)} />
      {help ? (
        <p className="mt-1.5 text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>
          {help}
        </p>
      ) : null}
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  help,
  rows = 3,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  rows?: number;
  full?: boolean;
}) {
  const id = `a-${label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className={`mb-4 last:mb-0 ${full ? 'sm:col-span-full' : ''}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="field resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {help ? (
        <p className="mt-1.5 text-[0.75rem]" style={{ color: 'var(--c-muted)' }}>
          {help}
        </p>
      ) : null}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <span
        className="relative inline-block h-6 w-11 rounded-full transition-colors"
        style={{ background: checked ? 'var(--c-primary)' : 'var(--c-line)' }}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all"
          style={{ left: checked ? 26 : 3 }}
        />
      </span>
      <span className="text-[0.875rem] font-medium" style={{ color: 'var(--c-ink)' }}>
        {label}
      </span>
    </label>
  );
}

function Row({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: 'var(--c-line)', background: 'var(--c-page)' }}
    >
      <div className="grid gap-x-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      <button
        type="button"
        onClick={onRemove}
        className="text-[0.8125rem] font-semibold"
        style={{ color: '#b42318' }}
      >
        Remove
      </button>
    </div>
  );
}

function AddButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-outline mt-4 !px-4 !py-2 !text-[0.8125rem]">
      + {children}
    </button>
  );
}
