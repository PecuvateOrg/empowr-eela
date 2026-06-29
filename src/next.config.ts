import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.249'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'empowr-cic.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
