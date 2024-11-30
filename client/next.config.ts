import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['localhost','tailwindcss.com','192.168.68.188']// Add 'localhost' to the domains list
  },
};

export default nextConfig;
