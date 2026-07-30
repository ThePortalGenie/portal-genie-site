import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const mainNavItems = [
  { label: "Why The Portal Genie", href: links.whyThePortalGenie },
  { label: "The Platform", href: links.platform },
  { label: "Features", href: links.features },
  { label: "Pricing", href: links.pricing },
  { label: "Resources", href: links.resources },
] as const;

export const headerActions = {
  login: {
    label: buttons.login,
    href: links.login,
  },
  bookDemo: {
    label: buttons.bookDemo,
    href: links.bookDemo,
  },
} as const;
