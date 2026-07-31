import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 100 is required for the hero illustration: it has a transparent
    // background, and lossy compression at the default quality (75)
    // introduces alpha-channel bleed that shows up as a faint rectangular
    // haze behind the artwork once composited on the page.
    qualities: [75, 100],
  },
};

export default nextConfig;
