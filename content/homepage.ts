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
  valueExtension: {
    headline: "Extend the value of Xero for your customers.",
    description:
      "Today's customers expect fast, secure and convenient digital experiences. The Portal Genie complements Xero by providing a modern customer experience layer that brings together communication, documents, payments and self-service—all while your team continues working in Xero.",
    cards: [
      {
        title: "Connected customer experience",
        description:
          "Give customers one secure place to access documents, communicate with your team, make payments and complete everyday tasks.",
        icon: "layers",
      },
      {
        title: "More time for meaningful work",
        description:
          "Reduce repetitive administration with self-service tools and automation, allowing your team to focus on delivering value.",
        icon: "clock",
      },
      {
        title: "Works alongside Xero",
        description:
          "The Portal Genie extends the customer experience while allowing your team to continue working in Xero using familiar workflows.",
        icon: "puzzle",
      },
    ],
  },
} as const;

export const hero = homepage.hero;
