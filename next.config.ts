import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utf.io",
      },
    ],
  },
};

export default nextConfig;
