import type { SiteConfig } from '@/lib/config';
import { defaultConfig } from '@/lib/config';

/** Only ever emit values that look like a colour, so the config file can never
 *  become a CSS injection vector. */
function safeColor(value: string, fallback: string): string {
  const v = String(value ?? '').trim();
  const ok =
    /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) ||
    /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*[\d.]+\s*)?\)$/i.test(v) ||
    /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+\s*)?\)$/i.test(v);
  return ok ? v : fallback;
}

/**
 * Renders the dashboard's colour choices as CSS custom properties on :root.
 * Every Tailwind colour token in tailwind.config.ts points at one of these, so
 * saving a new theme in /dashboard reskins the whole site with no code change.
 */
export default function ThemeStyle({ theme }: { theme: SiteConfig['theme'] }) {
  const d = defaultConfig.theme;
  const vars: [string, string, string][] = [
    ['--c-primary', theme.primary, d.primary],
    ['--c-primary-dark', theme.primaryDark, d.primaryDark],
    ['--c-primary-soft', theme.primarySoft, d.primarySoft],
    ['--c-accent', theme.accent, d.accent],
    ['--c-accent-soft', theme.accentSoft, d.accentSoft],
    ['--c-ink', theme.ink, d.ink],
    ['--c-body', theme.body, d.body],
    ['--c-muted', theme.muted, d.muted],
    ['--c-surface', theme.surface, d.surface],
    ['--c-line', theme.line, d.line],
    ['--c-page', theme.page, d.page],
  ];

  const css = `:root{${vars
    .map(([name, value, fallback]) => `${name}:${safeColor(value, fallback)}`)
    .join(';')}}`;

  return <style id="tv-theme" dangerouslySetInnerHTML={{ __html: css }} />;
}
