const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export const PORTAL_DARK_TEXT = "#112136";
export const PORTAL_LIGHT_TEXT = "#FFFFFF";
export const PORTAL_MOBILE_DARK_TEXT = "#20385d";

/** Normalise a hex colour to lowercase #RRGGBB, falling back when invalid. */
export function normalizeHexColor(value: string, fallback = PORTAL_DARK_TEXT): string {
  if (HEX_PATTERN.test(value)) {
    return value.toLowerCase();
  }
  return fallback;
}

function channel(value: string, start: number): number {
  return Number.parseInt(value.slice(start, start + 2), 16);
}

/** Relative luminance (sRGB) — 0 (dark) to 1 (light). */
export function getRelativeLuminance(hex: string): number {
  const normalized = normalizeHexColor(hex);
  const channels = [1, 3, 5].map((start) => {
    const raw = channel(normalized, start) / 255;
    return raw <= 0.03928 ? raw / 12.92 : ((raw + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

/** True when a surface is light enough for dark foreground text. */
export function isLightColor(hex: string): boolean {
  return getRelativeLuminance(hex) > 0.55;
}

/** Pick white or dark body text for a given background. */
export function contrastForeground(
  background: string,
  options?: { light?: string; dark?: string },
): string {
  const light = options?.light ?? PORTAL_LIGHT_TEXT;
  const dark = options?.dark ?? PORTAL_DARK_TEXT;
  return isLightColor(background) ? dark : light;
}

/** Mobile tile/footer foreground — slightly softer dark on light surfaces. */
export function contrastMobileForeground(background: string): string {
  return contrastForeground(background, {
    light: PORTAL_MOBILE_DARK_TEXT,
    dark: PORTAL_LIGHT_TEXT,
  });
}

function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

/** Blend two hex colours — ratio 0 = a, 1 = b. */
export function mixHexColors(colorA: string, colorB: string, ratio: number): string {
  const a = normalizeHexColor(colorA);
  const b = normalizeHexColor(colorB);
  const t = Math.max(0, Math.min(1, ratio));
  const channels = [0, 1, 2].map((index) => {
    const start = index * 2 + 1;
    return clamp(channel(a, start) * (1 - t) + channel(b, start) * t);
  });
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}
