/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-Content-Type-Options",   value: "nosniff" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://*.g.doubleclick.net https://www.google.com`,
              "style-src 'self' 'unsafe-inline' https://unpkg.com",
              "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://unpkg.com https://*.mapbox.com https://www.facebook.com https://*.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://www.google.co.in",
              "font-src 'self'",
              "connect-src 'self' https://*.supabase.co https://api.resend.com https://*.tile.openstreetmap.org https://api.mapbox.com https://events.mapbox.com https://connect.facebook.net https://*.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.google.com",
              "frame-src https://www.facebook.com https://*.facebook.com https://td.doubleclick.net https://*.doubleclick.net",
              "worker-src blob:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
