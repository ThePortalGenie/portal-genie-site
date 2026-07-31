import type { CSSProperties } from "react";

/**
 * Single source of truth for hero wave positioning.
 *
 * Horizontal placement uses `left: calc(50vw - centerOffsetPx)` so the
 * illustration stays pinned to the page's fixed-width content box
 * (max 1200px) rather than drifting further into the copy on ultrawide
 * viewports. Width is fixed in pixels for the same reason.
 *
 * Fine-tuning horizontal position — adjust `centerOffsetPx` only:
 *   • Lower value → wave shifts right (less overlap behind headline)
 *   • Higher value → wave shifts left (more overlap behind copy)
 */
export const heroIllustrationLayout = {
  /** Vertical anchor as a percentage of the hero section */
  topPercent: 6,

  centerOffsetPx: {
    /** 1024px – 1279px */
    lg: 140,
    /** 1280px+ */
    xl: 290,
  },

  widthPx: {
    lg: 650,
    xl: 1100,
  },

  mobile: {
    widthPercent: 90,
    maxWidthPx: 560,
  },

  imageSizes: "(max-width: 1023px) 90vw, (max-width: 1279px) 650px, 1100px",
} as const;

export function heroIllustrationLayoutVars(): CSSProperties {
  const { topPercent, centerOffsetPx, widthPx } = heroIllustrationLayout;

  return {
    "--hero-wave-top": topPercent,
    "--hero-wave-offset-lg": `${centerOffsetPx.lg}px`,
    "--hero-wave-offset-xl": `${centerOffsetPx.xl}px`,
    "--hero-wave-width-lg": `${widthPx.lg}px`,
    "--hero-wave-width-xl": `${widthPx.xl}px`,
  } as CSSProperties;
}
