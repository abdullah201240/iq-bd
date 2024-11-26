import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['localhost','tailwindcss.com']// Add 'localhost' to the domains list
  },
};

export default nextConfig;
