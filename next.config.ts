import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  "paths": {
    "@monolite/*": ["node_modules/monolite-saas/*"]
  },
  images: {
    domains: ['s3.autoxpert.com.co'],
  }
};

export default nextConfig;
