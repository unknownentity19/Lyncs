import type { NextConfig } from "next";
import path from "node:path";

// The GitHub Pages workflow sets NEXT_PUBLIC_BASE_PATH=/Lyncs, which is the
// only environment where we want a static export. On Vercel (and locally),
// this var is unset and Next.js builds normally — full SSR / RSC / API
// routes remain available.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isPagesBuild = basePath.length > 0;

const nextConfig: NextConfig = {
  // Static export only when targeting GitHub Pages.
  ...(isPagesBuild
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        basePath,
        assetPrefix: basePath,
      }
    : {}),

  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
