import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  //swcMinify: true,

  // Optional: Enables image optimization with external domains
  // images: {
  //   domains: ["your-image-domain.com"], // ← replace with actual domains if needed
  // },

  // // Optional: Set up custom page extensions
  // pageExtensions: ["ts", "tsx"],

  // // Optional: If you're using Tailwind with dark mode or animation
  // experimental: {
  //   serverActions: true, // ← if you're using Server Actions
  // },

  // // Optional: For static exports
  // // output: "export", 
};

export default nextConfig;
