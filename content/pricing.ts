import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const pricingPage = {
  metadata: {
    title: "Pricing",
    description:
      "Simple pricing for Portal Genie — the customer experience layer for Xero businesses. Choose a plan that fits your business and give customers a connected experience alongside Xero.",
    openGraph: {
      title: "Portal Genie Pricing — Customer Experience for Xero Businesses",
      description:
        "Explore Portal Genie pricing and choose a plan that helps your Xero business deliver a secure, branded customer experience.",
    },
  },
  hero: {
    headline: "Simple pricing that grows with your business.",
    description:
      "Choose the Portal Genie plan that fits your business and give your customers a more connected experience alongside Xero.",
    primaryCta: {
      label: buttons.startFree,
      href: links.startFree,
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
  valueIntro: {
    items: [
      "Works alongside Xero",
      "Secure customer experience",
      "Your branding, front and centre",
      "Plans that scale with your business",
    ],
  },
  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        question: "Does Portal Genie replace Xero?",
        answer:
          "No. Portal Genie is the customer experience layer for Xero businesses. Your team continues working in Xero while customers get a secure, branded portal for documents, communication, payments and self-service.",
      },
      {
        question: "Is there a free plan?",
        answer:
          "Portal Genie offers plans to suit different business needs, including options to get started at no cost. See the pricing table above for current plan details.",
      },
      {
        question: "Can I change plans later?",
        answer:
          "Yes. You can move between plans as your business needs change. Refer to the pricing table for what is included in each plan.",
      },
      {
        question: "Can I use my own branding?",
        answer:
          "Yes. Portal Genie lets you present a branded customer experience that reflects your business — so the portal feels like an extension of your company, not a generic third-party tool.",
      },
      {
        question: "Is Portal Genie secure?",
        answer:
          "Portal Genie is built as a secure cloud platform for business use, with customer-facing access designed for documents, communication and payments. Your data and your customers' experience are handled with care.",
      },
      {
        question: "How quickly can I get started?",
        answer:
          "You can create an account and begin setting up your customer portal. Plan features and limits are shown in the pricing table so you can choose the right starting point for your business.",
      },
    ],
  },
  finalCta: {
    headline: "Ready to create a better customer experience?",
    description:
      "Start free or book a demo to see how Portal Genie works alongside Xero to give your customers a more connected experience.",
    primaryCta: {
      label: buttons.startFree,
      href: links.startFree,
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
} as const;
