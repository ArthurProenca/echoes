import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    SONGS_LAMBDA_URL: process.env.SONGS_LAMBDA_URL,
  },
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'echoesbucketapp.s3.us-east-2.amazonaws.com', port:''}],
  },
  experimental: { esmExternals: true },
}

export default nextConfig;
