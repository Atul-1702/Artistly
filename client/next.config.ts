// next.config.js
const nextConfig = {
  // Minimal required config
  reactStrictMode: true,

  // Your existing options
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  api: {
    externalResolver: true,
  },
  // Add this to ensure proper export handling
  experimental: {
    esmExternals: "loose",
  },
};

// Use this specific export style
module.exports = nextConfig;
