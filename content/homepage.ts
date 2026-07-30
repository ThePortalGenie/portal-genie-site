import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const homepage = {
  hero: {
    eyebrow: "Built for Xero businesses",
    headline: "The Customer Experience Layer for Xero businesses.",
    supportingCopy: [
      "Transform how your customers interact with your business without changing the way your team works in Xero.",
      "Deliver a modern self-service experience with secure documents, communication, payments and automation—all in one place.",
    ],
    valueStatements: [
      "Built for Xero businesses",
      "Works alongside Xero",
      "No disruption to existing workflows",
    ],
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: buttons.seePlatform,
      href: links.platform,
    },
  },
  trustBar: {
    items: [
      "Built for Xero businesses",
      "Works alongside Xero",
      "No disruption to existing workflows",
      "Secure cloud platform",
    ],
  },
} as const;

export const hero = homepage.hero;
