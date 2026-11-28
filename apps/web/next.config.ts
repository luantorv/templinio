// SPDX-License-Identifier: AGPL-3.0-only

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@templinio/schema"],
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
