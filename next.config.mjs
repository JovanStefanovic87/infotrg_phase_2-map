const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.output.path = config.output.path || undefined;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|gif|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' https://www.googletagmanager.com; object-src 'none'; style-src 'self' 'unsafe-inline'; font-src 'self';`,
          },
        ],
      },
    ];
  },
  env: {
    TZ: 'Europe/Belgrade',
  },
};

export default nextConfig;
