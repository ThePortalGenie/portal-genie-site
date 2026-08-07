import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export type MainNavItem = {
  label: string;
  href: string;
  /** When false, the item is omitted from header/mobile navigation */
  visible?: boolean;
};

export const mainNavItems: MainNavItem[] = [
  { label: "Why The Portal Genie", href: links.whyThePortalGenie },
  { label: "Features", href: links.features },
  { label: "Pricing", href: links.pricing },
  { label: "Resources", href: links.resources, visible: false },
  { label: "Customer Success", href: links.customerSuccess },
];

export function getVisibleMainNavItems(): MainNavItem[] {
  return mainNavItems.filter((item) => item.visible !== false);
}

export const headerActions = {
  login: {
    label: buttons.login,
    href: links.login,
  },
  startFree: {
    label: buttons.startFree,
    href: links.startFree,
  },
  bookDemo: {
    label: buttons.bookDemo,
    href: links.bookDemo,
  },
} as const;
