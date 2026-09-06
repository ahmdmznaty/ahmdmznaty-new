import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    /*
     * `npm run build` keeps the default `.next` so deployment is untouched.
     * `npm run build:check` points NEXT_DIST_DIR elsewhere, so a verification
     * build can never overwrite the dir a running `next dev` is using.
     */
    distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
