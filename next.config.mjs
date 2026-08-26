/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The Google Fonts stylesheet is linked directly in the document head. Next's
  // build-time font inlining is turned off so the build never depends on having
  // network access to fonts.googleapis.com.
  optimizeFonts: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Make sure the committed site config and the uploaded logos are traced into
  // the serverless bundle on hosts that only ship what they detect (Vercel).
  outputFileTracingIncludes: {
    '/**': ['./data/site-config.json', './public/uploads/**'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // QA #23 - clickjacking protection.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/dashboard',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      // Runs only when no static file matched. On a deploy the logo in
      // public/uploads is a real static asset and this never fires; it exists so
      // a local `next start` still serves a logo cropped after the last build.
      afterFiles: [{ source: '/uploads/:file', destination: '/api/media/:file' }],
      beforeFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // QA #20 - never let a "-2" slug exist.
      { source: '/privacy-policy-2', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
