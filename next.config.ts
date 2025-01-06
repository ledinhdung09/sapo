import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "banhang.hcrm.online",
        port: "",
        pathname: "/api/uploads/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
