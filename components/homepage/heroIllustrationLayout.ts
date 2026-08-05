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
  topPercent: 2,

  /** Fixed upward shift (px) applied at `lg+` — lowers `top` without transforms */
  topAdjustPx: -24,

  centerOffsetPx: {
    /** 1024px – 1279px — lower = more to the right */
    lg: 100,
    /** 1280px+ */
    xl: 220,
  },

  widthPx: {
    lg: 620,
    xl: 980,
  },

  mobile: {
    widthPercent: 90,
    maxWidthPx: 560,
  },

  imageSizes: "(min-width: 1280px) 980px, 620px",
} as const;

export function heroIllustrationLayoutVars(): CSSProperties {
  const { topPercent, topAdjustPx, centerOffsetPx, widthPx } =
    heroIllustrationLayout;

  return {
    "--hero-wave-top": topPercent,
    "--hero-wave-top-adjust": `${topAdjustPx}px`,
    "--hero-wave-offset-lg": `${centerOffsetPx.lg}px`,
    "--hero-wave-offset-xl": `${centerOffsetPx.xl}px`,
    "--hero-wave-width-lg": `${widthPx.lg}px`,
    "--hero-wave-width-xl": `${widthPx.xl}px`,
  } as CSSProperties;
}
