import { DEFAULT_BRANDING } from "@/lib/demo/client-portal/constants";
import type { MobileDesignTheme } from "@/lib/demo/client-portal/types";

export const DEFAULT_MOBILE_DESIGN: MobileDesignTheme = {
  tileIconColour: "#20385d",
  tileLabelColour: "#20385d",
  tileBackgroundColour: "#00d8ff",
  mainBackgroundColour: "#ffffff",
  footerBackgroundColour: "#00d8ff",
  headerBackgroundColour: DEFAULT_BRANDING.sidebarBg,
  addToCartButtonColour: "#fcfcfc",
  footerIconLabelColour: "#20385d",
};

export const MOBILE_COLOUR_FIELDS: {
  key: keyof MobileDesignTheme;
  label: string;
}[] = [
  { key: "tileIconColour", label: "Home Page Tile Icons" },
  { key: "tileLabelColour", label: "Home Page Tile Labels" },
  { key: "tileBackgroundColour", label: "Home Page Tile Background" },
  { key: "mainBackgroundColour", label: "Main Mobile Background" },
  { key: "footerBackgroundColour", label: "Mobile Footer Background" },
  { key: "headerBackgroundColour", label: "Mobile Header Background" },
  { key: "addToCartButtonColour", label: "Add to Cart Button" },
  { key: "footerIconLabelColour", label: "Footer Tile Icons and Labels" },
];
