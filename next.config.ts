import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
    domains: ['s3.autoxpert.com.co'],
  }
};

export default nextConfig;
