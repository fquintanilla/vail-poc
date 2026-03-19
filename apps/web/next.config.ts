import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "azure-na-images.contentstack.com",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true, // Top-level in Next.js 16.1.x+
  cacheLife: {
    contentstack: {
      stale: 600, // 10 minutes
      revalidate: 900, // 15 minutes
      expire: 86400, // 24 hours
    },
  },
};

export default nextConfig;
