/**
 * Shared Genie Flow artwork — the homepage hero blue streak.
 * Decorative page variants reuse this single asset via CSS transforms.
 */
export const genieFlowAsset = {
  src: "/images/product/marketing/hero-connected-experience.png",
  width: 1536,
  height: 1024,
  /** Decorative delivery — lower than the homepage hero priority pass */
  quality: 75,
} as const;

export type GenieFlowVariant =
  | "sweep-left"
  | "sweep-right"
  | "horizontal"
  | "vertical"
  | "corner"
  | "soft";
