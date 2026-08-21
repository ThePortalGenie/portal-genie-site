import {
  BRAND_PRESETS,
  DEFAULT_BRANDING,
} from "@/lib/demo/client-portal/constants";
import {
  contrastForeground,
  contrastMobileForeground,
  mixHexColors,
  normalizeHexColor,
  PORTAL_DARK_TEXT,
} from "@/lib/demo/client-portal/color-contrast";
import { DEFAULT_MOBILE_DESIGN } from "@/lib/demo/client-portal/mobile-design";
import type {
  BrandingTheme,
  BrandPresetId,
  CoreBrandColourKey,
  MobileDesignTheme,
} from "@/lib/demo/client-portal/types";

export type { CoreBrandColourKey };

export const PORTAL_CONTENT_BACKGROUND = "#ffffff";

export type CoreBrandColours = {
  primary: string;
  secondary: string;
  accent: string;
};

export const CORE_BRAND_COLOUR_FIELDS: {
  key: CoreBrandColourKey;
  label: string;
}[] = [
  { key: "primary", label: "Primary Brand Colour" },
  { key: "secondary", label: "Secondary Brand Colour" },
  { key: "accent", label: "Accent Colour" },
];

export const DESKTOP_ADVANCED_COLOUR_FIELDS: {
  key: keyof BrandingTheme;
  label: string;
}[] = [
  { key: "brandColor", label: "Main brand colour" },
  { key: "sidebarBg", label: "Sidebar background" },
  { key: "menuText", label: "Unselected menu text" },
  { key: "menuSelectedText", label: "Selected menu text" },
  { key: "menuSelectedBg", label: "Selected menu background" },
  { key: "portalText", label: "General portal text" },
  { key: "tableBodyText", label: "Table body text" },
  { key: "tableHeadingBg", label: "Table heading background" },
  { key: "tableHeadingText", label: "Table heading text" },
  { key: "payNowBg", label: "Pay Now button background" },
  { key: "payNowText", label: "Pay Now button text" },
  { key: "amountColor", label: "Amount / balance text" },
  { key: "accentColor", label: "Accent colour" },
];

function selectedMenuBackground(primary: string): string {
  return mixHexColors(PORTAL_CONTENT_BACKGROUND, primary, 0.08);
}

/** Read the three Core Brand Colours from the current detailed theme (single source of truth). */
export function readCoreBrandColours(state: {
  branding: BrandingTheme;
  mobileDesign: MobileDesignTheme;
}): CoreBrandColours {
  return {
    primary: normalizeHexColor(state.branding.brandColor),
    secondary: normalizeHexColor(state.branding.sidebarBg),
    accent: normalizeHexColor(state.branding.accentColor),
  };
}

/** Apply three Core Brand Colours to the existing Desktop + Mobile colour properties. */
export function applyCoreBrandColours(cores: CoreBrandColours): {
  branding: BrandingTheme;
  mobileDesign: MobileDesignTheme;
} {
  const primary = normalizeHexColor(cores.primary);
  const secondary = normalizeHexColor(cores.secondary);
  const accent = normalizeHexColor(cores.accent);
  const background = PORTAL_CONTENT_BACKGROUND;

  const primaryForeground = contrastForeground(primary);
  const secondaryForeground = contrastForeground(secondary);
  const accentForeground = contrastForeground(accent);
  const menuSelectedBg = selectedMenuBackground(primary);
  const contentText = PORTAL_DARK_TEXT;
  const mobileTileForeground = contrastMobileForeground(secondary);

  const branding: BrandingTheme = {
    brandColor: primary,
    sidebarBg: secondary,
    menuText: secondaryForeground,
    menuSelectedText: primary,
    menuSelectedBg,
    portalText: contentText,
    tableBodyText: contentText,
    tableHeadingBg: primary,
    tableHeadingText: primaryForeground,
    payNowBg: accent,
    payNowText: accentForeground,
    amountColor: secondaryForeground,
    accentColor: accent,
  };

  const mobileDesign: MobileDesignTheme = {
    tileIconColour: mobileTileForeground,
    tileLabelColour: mobileTileForeground,
    tileBackgroundColour: secondary,
    mainBackgroundColour: background,
    footerBackgroundColour: secondary,
    headerBackgroundColour: primary,
    addToCartButtonColour: mixHexColors(background, "#fcfcfc", 0.5),
    footerIconLabelColour: mobileTileForeground,
  };

  return { branding, mobileDesign };
}

function mobileDesignForPreset(presetId: BrandPresetId): MobileDesignTheme {
  if (presetId === "portal-genie") {
    return { ...DEFAULT_MOBILE_DESIGN };
  }

  const branding = BRAND_PRESETS[presetId].branding;
  return applyCoreBrandColours({
    primary: branding.brandColor,
    secondary: branding.sidebarBg,
    accent: branding.accentColor,
  }).mobileDesign;
}

/** Complete Desktop + Mobile themes for each brand preset. */
export const PRESET_THEMES: Record<
  BrandPresetId,
  { branding: BrandingTheme; mobileDesign: MobileDesignTheme }
> = {
  "portal-genie": {
    branding: { ...DEFAULT_BRANDING },
    mobileDesign: { ...DEFAULT_MOBILE_DESIGN },
  },
  "professional-blue": {
    branding: { ...BRAND_PRESETS["professional-blue"].branding },
    mobileDesign: mobileDesignForPreset("professional-blue"),
  },
  "modern-green": {
    branding: { ...BRAND_PRESETS["modern-green"].branding },
    mobileDesign: mobileDesignForPreset("modern-green"),
  },
  "executive-dark": {
    branding: { ...BRAND_PRESETS["executive-dark"].branding },
    mobileDesign: mobileDesignForPreset("executive-dark"),
  },
};
