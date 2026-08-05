import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const placeholderPages = {
  documentation: {
    title: "Documentation",
    description:
      "Product documentation, setup guides and feature walkthroughs are being prepared. In the meantime, book a demo to see Portal Genie in action.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
  productUpdates: {
    title: "Product Updates",
    description:
      "Release notes and platform improvements are being prepared. Contact us to stay up to date with the latest Portal Genie product updates.",
    primaryCta: {
      label: "Contact Us",
      href: links.contact,
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
} as const;
