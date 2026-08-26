import type { Config } from 'tailwindcss';

/**
 * Every brand colour is a CSS custom property written by the dashboard.
 * Tailwind classes here just point at those variables, which is why changing
 * the theme in /dashboard reskins the entire site with no rebuild.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--c-primary)',
        'primary-dark': 'var(--c-primary-dark)',
        'primary-soft': 'var(--c-primary-soft)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        ink: 'var(--c-ink)',
        body: 'var(--c-body)',
        muted: 'var(--c-muted)',
        surface: 'var(--c-surface)',
        line: 'var(--c-line)',
        page: 'var(--c-page)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
      },
      maxWidth: {
        shell: '1200px',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -12px rgba(16, 24, 40, 0.14)',
        lift: '0 24px 48px -20px rgba(16, 24, 40, 0.24)',
        ring: '0 0 0 1px var(--c-line)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'marquee-x': 'marquee-x 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
