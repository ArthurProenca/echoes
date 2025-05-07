import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    SONGS_LAMBDA_URL: process.env.SONGS_LAMBDA_URL,
  }
}

export default nextConfig;
