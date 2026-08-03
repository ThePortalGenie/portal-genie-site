import { links } from "@/config/links";

export const placeholderPages = {
  documentation: {
    title: "Documentation",
    description:
      "Product documentation, setup guides and feature walkthroughs are being prepared. In the meantime, explore Resources or book a demo to see Portal Genie in action.",
    primaryCta: {
      label: "View Resources",
      href: links.resources,
    },
  },
  productUpdates: {
    title: "Product Updates",
    description:
      "Release notes and platform improvements are published on our Resources page. Visit Resources to browse the latest product updates.",
    primaryCta: {
      label: "See Product Updates",
      href: `${links.resources}#product-updates`,
    },
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Common questions about Portal Genie, pricing and getting started are available on our Pricing page. More FAQs will be added here over time.",
    primaryCta: {
      label: "View Pricing FAQ",
      href: links.pricing,
    },
  },
  youtube: {
    title: "YouTube",
    description:
      "Our YouTube channel is coming soon. Follow us on LinkedIn or contact us to stay up to date with Portal Genie.",
    primaryCta: {
      label: "Contact Us",
      href: links.contact,
    },
  },
  startFree: {
    title: "Start Free",
    subtitle: "Coming Soon",
    description:
      "Self-service signup is currently being prepared. In the meantime, book a demo and we’ll walk you through The Portal Genie.",
    primaryCta: {
      label: "Book a Demo",
      href: links.bookDemo,
    },
  },
} as const;
