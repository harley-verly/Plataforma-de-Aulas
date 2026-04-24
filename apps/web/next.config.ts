import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.platform === "win32" ? undefined : "standalone",
  transpilePackages: ["@plataforma/contracts", "@plataforma/config", "@plataforma/ui"]
};

export default nextConfig;
