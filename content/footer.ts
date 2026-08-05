import { links } from "@/config/links";

export type FooterLink = {
  label: string;
  href: string;
  /** When false, the link is omitted from footer navigation */
  visible?: boolean;
};

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
      ] satisfies FooterLink[],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Resources", href: links.resources, visible: false },
        { label: "Documentation", href: links.documentation },
        { label: "Product Updates", href: links.productUpdates },
        { label: "FAQ", href: links.faq },
      ] satisfies FooterLink[],
    },
    company: {
      title: "Company",
      links: [
        { label: "Contact", href: links.contact },
        { label: "Privacy Policy", href: links.privacyPolicy },
        { label: "Terms & Conditions", href: links.termsAndConditions },
      ] satisfies FooterLink[],
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

export function getVisibleFooterLinks(links: FooterLink[]): FooterLink[] {
  return links.filter((link) => link.visible !== false);
}
