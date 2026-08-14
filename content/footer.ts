import { links } from "@/config/links";

export type FooterLink = {
  label: string;
  href: string;
  /** When false, the link is omitted from footer navigation */
  visible?: boolean;
};

export type FooterSocialIcon = "facebook" | "linkedin" | "instagram";

export type FooterSocialLink = {
  /** Accessible name, e.g. "Portal Genie on LinkedIn" */
  ariaLabel: string;
  icon: FooterSocialIcon;
  /** Omit href until an official profile URL is confirmed. */
  href?: string;
};

export const footerContent = {
  brand: {
    description:
      "The Portal Genie helps businesses deliver a modern customer experience through secure portals, branded communication and seamless integration with Xero, QuickBooks and Sage Business Cloud.",
    xeroStatement: "Built for businesses using Xero",
    logo: {
      src: "/images/logos/portal-genie-logo-white.svg",
      alt: "The Portal Genie",
      width: 1306,
      height: 662,
    },
    socialHeading: "Follow us",
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
        { label: "Resources", href: links.resources },
        { label: "Documentation", href: links.documentation },
        { label: "Product Updates", href: links.productUpdates },
        { label: "FAQ", href: links.faq },
      ] satisfies FooterLink[],
    },
    company: {
      title: "Company",
      links: [{ label: "Contact", href: links.contact }] satisfies FooterLink[],
    },
    connect: {
      title: "Connect",
      email: "sales@theportalgenie.com",
      social: [
        {
          ariaLabel: "Portal Genie on Facebook",
          href: links.social.facebook,
          icon: "facebook" as const,
        },
        {
          ariaLabel: "Portal Genie on LinkedIn",
          href: links.social.linkedin,
          icon: "linkedin" as const,
        },
        {
          ariaLabel: "Portal Genie on Instagram",
          href: links.social.instagram,
          icon: "instagram" as const,
        },
      ] satisfies FooterSocialLink[],
    },
  },
  bottom: {
    copyright: "© 2026 The Portal Genie. All rights reserved.",
    
    links: [
      { label: "Privacy Policy", href: links.privacyPolicy },
      { label: "Terms & Conditions", href: links.termsAndConditions },
    ] satisfies FooterLink[],
  },
} as const;

export function getVisibleFooterLinks(links: FooterLink[]): FooterLink[] {
  return links.filter((link) => link.visible !== false);
}
