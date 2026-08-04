import { links } from "@/config/links";

export const footerContent = {
  brand: {
    description:
      "The Portal Genie helps businesses deliver a modern customer experience through secure portals, branded communication and seamless integration with Xero, QuickBooks and Sage Business Cloud.",
    xeroStatement: "Built for businesses using Xero",
  },
  columns: {
    product: {
      title: "Product",
      links: [
        { label: "Why The Portal Genie", href: links.whyThePortalGenie },
        { label: "The Platform", href: links.platform },
        { label: "Features", href: links.features },
        { label: "Pricing", href: links.pricing },
        { label: "Customer Success", href: links.customerSuccess },
        { label: "Book a Demo", href: links.bookDemo },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Resources", href: links.resources },
        { label: "Documentation", href: links.documentation },
        { label: "Product Updates", href: links.productUpdates },
        { label: "FAQ", href: links.faq },
      ],
    },
    company: {
      title: "Company",
      links: [
        { label: "Contact", href: links.contact },
        { label: "Privacy Policy", href: links.privacyPolicy },
        { label: "Terms & Conditions", href: links.termsAndConditions },
      ],
    },
    connect: {
      title: "Connect",
      email: "info@theportalgenie.com",
      social: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/the-portal-genie",
          icon: "linkedin" as const,
        },
        {
          label: "YouTube",
          href: links.youtube,
          icon: "youtube" as const,
        },
      ],
    },
  },
  bottom: {
    copyright: "© 2026 The Portal Genie. All rights reserved.",
    tagline: "Built with ❤️ for businesses using Xero.",
  },
} as const;
