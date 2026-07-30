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
  platformOverview: {
    headline: "One platform for the complete customer experience.",
    description:
      "The Portal Genie brings together the capabilities Xero businesses need to serve customers. Secure access to documents, communication, payments and self-service, while your team continues working in Xero.",
    pillars: [
      {
        title: "Secure Customer Portal",
        description:
          "Give every customer a branded, secure destination to access their account and stay connected with your business.",
        icon: "shield-check",
      },
      {
        title: "Document Management",
        description:
          "Share and collect documents in one place, so customers always know where to find what they need.",
        icon: "file-text",
      },
      {
        title: "Secure Messaging",
        description:
          "Keep customer conversations organised and secure, without relying on scattered email threads.",
        icon: "message-square",
      },
      {
        title: "Online Payments",
        description:
          "Make it simple for customers to view and pay invoices, supporting smoother payment completion.",
        icon: "credit-card",
      },
      {
        title: "Digital Forms & Workflows",
        description:
          "Guide customers through requests and approvals with clear digital workflows that save everyone time.",
        icon: "clipboard-list",
      },
      {
        title: "Customer Self-Service",
        description:
          "Empower customers to find answers, access information and complete tasks on their own, around the clock.",
        icon: "user-check",
      },
    ],
  },
} as const;

export const hero = homepage.hero;
