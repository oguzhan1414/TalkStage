import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace package shipped as raw TypeScript (packages/shared-data).
  transpilePackages: ["@talkstage/shared-data"],
};

export default nextConfig;
