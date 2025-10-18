import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dbdash.live',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'marketplace.digicraft.one',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.digicraft.one',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
