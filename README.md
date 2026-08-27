# Trademark Vertex

A complete, production-ready marketing site for a US trademark filing service, built with
Next.js 14 (App Router), TypeScript and Tailwind. Light theme only, fully responsive.

Everything a non-developer needs to change — brand name, logos, favicon, the whole colour
theme, pricing, testimonials, contact details — is edited from a password-protected
dashboard at `/dashboard` and stored in a single JSON file. **There is no database.**

---

## 1. Getting it running

```bash
npm install
cp .env.local.example .env.local   # then edit it — see below
npm run dev                        # http://localhost:3000
```

For production:

```bash
npm run build
npm start                          # http://localhost:3000
```

### .env.local

| Variable | What it does |
|---|---|
| `ENABLE_DASHBOARD` | Turns the local dashboard on. **Never set this on your host.** |
| `DASHBOARD_PASSWORD` | The password for `/dashboard`. |
| `DASHBOARD_SECRET` | A long random string used to sign the dashboard session cookie. |
| `NEXT_PUBLIC_SITE_URL` | This deployment's URL. Canonical tags, `sitemap.xml`, Open Graph. |
| `LEAD_WEBHOOK_URL` | Optional. Where contact form submissions are POSTed in production. |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 2. The dashboard

Go to `/dashboard`, enter the password, and you get six tabs.

### Brand
The **brand name** field is the important one. Change it and it updates everywhere at once:
the header, the footer, every page of body copy, all page titles, meta descriptions, the
privacy policy, the terms, the disclaimer and the structured data. Nothing is hard-coded.

Also here: short name (used in the fallback wordmark), tagline, registered legal entity and
governing state. The last two feed the Terms — see section 5b.

### Logos
Three upload slots, each with its **own cropper locked to that slot's aspect ratio**, so an
upload can never come out stretched or clipped:

| Slot | Crop ratio | Output | Rendered height |
|---|---|---|---|
| Header logo | 4:1 | 640×160 PNG | 48px by default, adjustable 28–72px |
| Footer logo | 4:1 | 640×160 PNG | 56px by default, adjustable 28–96px |
| Favicon | 1:1 | 256×256 PNG | Browser tab icon |

Drag to reposition, use the zoom slider, hit **Crop and use**. Under each of the header and
footer croppers there is a **height slider** — the preview above it always shows the logo at
the exact size the site will render it, and the header bar grows with the logo so a taller
one never crowds the navigation. Useful when five brands have five differently-proportioned
logos.

The footer preview is shown against the dark footer background, so a logo with dark text
shows up as a problem there before it ships. Transparency is preserved. Each slot also has
an alt-text field.

Uploaded files go to **`public/uploads/`** and are referenced as `/uploads/<filename>`, so
they are plain static assets you commit to git and your host serves from its CDN. See
section 5 for how this works on a deploy.

### Theme
Eleven colour tokens drive the entire site. Change one and it changes everywhere it is used
— no rebuild, no code. Six ready-made presets are one click away (Emerald & slate, Navy &
gold, Indigo & amber, Charcoal & orange, Teal & coral, Burgundy & sand), and there is a live
preview panel underneath showing buttons, headings and the footer band in your colours.

The site is **light theme only** by design. There is no light/dark toggle.

### Content
The statistics band and the testimonials. Add, edit, reorder or remove any of them, and turn
either section off entirely.

### Pricing
All three packages — name, price, summary, button label, and the feature list (one per
line). Marking one package as *featured* automatically un-features the others, so you can
never end up with two highlighted cards. The à-la-carte add-on list is edited here too.

### Contact & SEO
Email, phone, address, hours, the response promise, and the default page title and meta
description. **Any contact field left blank is hidden site-wide** rather than rendering an
empty row — so an email-only setup looks deliberate, not broken.

### Saving
Hit **Save changes**. Everything is written to `data/site-config.json`. The site reads that
file on every request, so changes are live immediately.

---

## 3. Pages

| Route | |
|---|---|
| `/` | Home |
| `/services` | Services index |
| `/services/[slug]` | 10 individual service pages, each fully written |
| `/pricing` | Packages, comparison table, add-ons, FAQs |
| `/process` | Six-stage filing process |
| `/about` | About and how we work |
| `/contact` | Contact details and the enquiry form |
| `/privacy-policy` · `/terms-and-conditions` · `/disclaimer` | Legal |
| `/dashboard` | Local authoring tool — **404s on a production deploy** (see section 5) |
| 404 | Custom, with full navigation |

**Service pages:** federal trademark filing, comprehensive search, free trademark search,
office action response, renewal & maintenance, brand monitoring, copyright registration,
filing an extension, proof of commerce, DMCA takedowns.

Service copy lives in `src/lib/services.ts` — one object per service with intro, what's
included, steps, audience, timeline, price and FAQs. Add a service by adding an object; the
nav, footer, services index, sitemap and internal linking all pick it up automatically.

---

## 4. Leads

The contact form writes submissions to `data/leads.json` — newest first, with a timestamp,
name, email, phone, chosen service, the mark and the message. No database, no third party.

On a read-only host such as Vercel that file cannot be written, so the lead is also printed
to the server log and POSTed to `LEAD_WEBHOOK_URL` if you set one. See section 5.

Spam protection: a hidden honeypot field, a minimum time-on-form check, and a per-IP rate
limit of five submissions per ten minutes. Bots get a silent success so they learn nothing.

---

## 5. Deploying — the dashboard is local only

The dashboard is an **authoring tool you run on your own machine**, not a live admin panel.
The workflow is:

1. Run the site locally with `npm run dev`.
2. In `/dashboard`, set the brand name, colours, logos and favicon for this brand.
3. Commit **`data/site-config.json`** and **`public/uploads/`** — that is the brand.
4. Push. Vercel builds and deploys it.

On the deployed site `/dashboard` returns a real **404**, and so do `/api/auth`,
`/api/config` and `/api/upload`. Nobody can log in, change your theme or upload a file to a
live site, because those routes do not exist there.

### How the 404 is guaranteed

`ENABLE_DASHBOARD` lives only in `.env.local`, and `.env.local` is git-ignored, so it never
reaches your host. The rule in `src/lib/flags.ts`:

| `ENABLE_DASHBOARD` | Result |
|---|---|
| `true` | Dashboard on |
| `false` | Dashboard off |
| **not set** | On in `npm run dev`, **off in any production build** |

A Vercel deploy has no `.env.local`, is a production build, and therefore has no dashboard.
**Do not add `ENABLE_DASHBOARD` to your Vercel environment variables.** That single
omission is the whole protection — there is nothing else to remember.

The route is gated in three places independently (`dashboard/layout.tsx`,
`dashboard/page.tsx`, and each write API), so a future page added under `/dashboard` cannot
leak by accident. `/dashboard` is also absent from `robots.txt` — naming a path that 404s
would only advertise something worth probing.

### Logos and favicon on the live site

Cropped images are written to **`public/uploads/`** and stored in the config as
`/uploads/<filename>`. They are ordinary static assets, so you commit them to git and Vercel
serves them from its CDN with a one-year immutable cache. The header logo, footer logo and
favicon all work on the deployed site with no extra step.

`next dev` picks up a freshly cropped logo immediately. A local `next start` against an
older build would not — Next fixes its static asset list at build time — so `next.config.mjs`
rewrites `/uploads/:file` to `/api/media/:file` as a fallback. That rewrite only fires when
no static file matched, so on a real deploy it never runs.

The committed config is also imported statically in `src/lib/config.ts` and force-traced via
`outputFileTracingIncludes`. If a host ever fails to ship `data/site-config.json` into the
serverless bundle, the site still renders your committed brand name, colours and logo paths
rather than falling back to the built-in defaults.

### Running five brands from one codebase

Each brand is a branch (or a fork) of this repo. The only files that differ per brand are
`data/site-config.json` and the contents of `public/uploads/`. Everything else — pages,
components, service copy — stays shared, so a fix merges into all five.

```
main ──┬── brand-a   (own site-config.json + uploads)  →  Vercel project A  →  domain-a.com
       ├── brand-b   …                                 →  Vercel project B  →  domain-b.com
       └── …
```

Set `NEXT_PUBLIC_SITE_URL` per Vercel project so each domain gets its own canonical tags,
`sitemap.xml` and Open Graph URLs. To change a brand later: pull the branch, run it locally,
edit in the dashboard, commit, push.

### Contact form in production

Vercel's filesystem is read-only, so `data/leads.json` cannot be written on a deploy. The
route handles that: it tries the JSON file, **always** prints the lead to the server log
(visible in the Vercel function logs), and POSTs it as JSON to `LEAD_WEBHOOK_URL` if you set
one — a Zapier or Make hook, a Google Apps Script, a Slack or Discord webhook. A submission
is only reported as failed if every one of those fails.

On a VPS, Render disk, Railway volume, Fly volume or a Docker bind mount, the JSON file
works as-is and no webhook is needed.

`data/leads.json` is git-ignored — it holds personal data and must not be committed.

---

## 5b. Before you go live

1. **Set `NEXT_PUBLIC_SITE_URL`** in each Vercel project.
2. **Do not set `ENABLE_DASHBOARD`** on any host.
3. **Fill in the legal entity and governing state** in the dashboard's Brand tab. Until you
   do, the Terms page shows a highlighted publisher note where the governing-law clause
   should name a state — a governing-law clause that names no state is unenforceable.
4. **Check the statistics** in the Content tab. They ship as sensible placeholders. Use real
   numbers or turn the band off — unsubstantiated volume claims are an FTC risk in this
   industry.
5. **Replace the testimonials** with real ones. The disclaimer page already carries the
   "individual results vary" language.
6. Confirm the USPTO government fee figure in the Pricing tab is current.
7. Set `LEAD_WEBHOOK_URL` if you want contact form submissions somewhere other than the
   Vercel logs.
8. Change `DASHBOARD_PASSWORD` in your local `.env.local` — it is only a local password now,
   but it is still the key to your authoring tool.

---

## 6. What was built to avoid

This site was built against a QA report on three competitor sites running the same
white-label template. Every finding in it is handled here:

- Exactly one `<h1>` per page, and a correct heading outline throughout. No headings used
  for prices, labels or body text.
- A unique meta description, Open Graph tags, a Twitter card and JSON-LD
  (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `HowTo`, `OfferCatalog`)
  on every page. Page titles sit in the 33–60 character range.
- **Zero** `href="#"` links anywhere. The skip link points at an element that exists.
- All ten service pages fully written. No thin shells, no orphan "PRICING" headings on pages
  with no pricing, no duplicated sections.
- No stock photography at all — the hero illustration is built in code, so there is no
  licensing exposure and no watermark.
- One set of statistics, used consistently on every page that shows them. One set of
  testimonials. One accurate disclaimer, in the footer, matching the Terms.
- The Terms describe a document preparation and filing service and never say
  "consultations" — the wording that invites unauthorised-practice-of-law scrutiny.
- Form validation the right way round: name, email and message required, subject optional.
  Persistent visible labels on every field (WCAG 2.1 SC 3.3.2), not placeholder-only.
  Select options have clean values and an empty placeholder value, so a blank selection
  cannot pass validation.
- Phone and email are `tel:` and `mailto:` links everywhere they appear.
- `X-Frame-Options`, `Content-Security-Policy: frame-ancestors 'self'`, `nosniff`, HSTS,
  a referrer policy and a permissions policy on every response.
- Alt text on every image. Dynamic copyright year. `/privacy-policy` on a clean slug.
- `robots.txt` and `sitemap.xml` generated from the real page list — no demo posts, no
  author archives, no thin pages.

---

## 7. Project layout

```
data/
  site-config.json     everything the dashboard edits  (COMMIT THIS)
  leads.json           contact form submissions        (git-ignored)
public/
  uploads/             cropped logos and favicons      (COMMIT THESE)
src/
  app/
    (site)/            public pages, wrapped in header + footer
    dashboard/         admin, no site chrome
    api/               auth, config, upload (local only) + media, contact
    layout.tsx         html shell, theme variables, fonts, base metadata
  components/          header, footer, testimonials, cropper, dashboard, blocks
  lib/
    config.ts          reads and writes site-config.json
    services.ts        all service page content
    seo.ts             metadata and structured data helpers
    auth.ts            dashboard session
    flags.ts           the switch that 404s the dashboard in production
```
