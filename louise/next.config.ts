import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.7", "192.168.15.*", "localhost", "127.0.0.1"],
};

export default nextConfig;
