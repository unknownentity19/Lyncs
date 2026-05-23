import type { NextConfig } from "next";
import path from "node:path";

// Used by the GitHub Pages workflow:
//   NEXT_PUBLIC_BASE_PATH=/Lyncs npm run build
// Locally, basePath stays empty so dev/build/preview all work as before.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export => writes ./out, suitable for GitHub Pages, S3, Cloudflare, etc.
  output: "export",

  // Keeps URLs like /pricing/ instead of /pricing, which GitHub Pages serves
  // reliably without server-side URL rewrites.
  trailingSlash: true,

  // Pages has no Image Optimization API; ship raw assets.
  images: { unoptimized: true },

  basePath,
  assetPrefix: basePath || undefined,

  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
