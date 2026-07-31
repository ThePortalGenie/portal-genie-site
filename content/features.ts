import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const featuresPage = {
  hero: {
    headline: "Everything your customers need. Built into one platform.",
    description:
      "Explore the features that help Xero businesses deliver a modern customer experience — from secure document sharing to payments, communication and self-service.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: buttons.contactSales,
      href: links.contact,
    },
  },
  navigation: [
    { id: "customer-portal", label: "Customer Portal" },
    { id: "document-management", label: "Document Management" },
    { id: "customer-communication", label: "Customer Communication" },
    { id: "payments-workflows", label: "Payments & Workflows" },
    { id: "branding-personalisation", label: "Branding & Personalisation" },
    { id: "administration-security", label: "Administration & Security" },
  ],
  sections: [
    {
      id: "customer-portal",
      title: "Customer Portal",
      description:
        "Give customers a secure, branded destination to view documents, track activity and complete everyday tasks without calling your office.",
      benefits: [
        "Self-service access to documents and account information",
        "Branded experience that reflects your business",
        "Mobile-friendly portal available on any device",
      ],
      placeholderLabel: "Customer Portal Screenshot",
    },
    {
      id: "document-management",
      title: "Document Management",
      description:
        "Share invoices, statements and files securely with customers while keeping your team in control of what is sent and when.",
      benefits: [
        "Secure document delivery and retrieval",
        "Organised document history for each customer",
        "Reduced email back-and-forth and manual follow-ups",
      ],
      placeholderLabel: "Document Management Screenshot",
    },
    {
      id: "customer-communication",
      title: "Customer Communication",
      description:
        "Keep conversations in context with a dedicated communication layer that connects customers and your team in one place.",
      benefits: [
        "Centralised messaging tied to customer records",
        "Clear communication history across your team",
        "Fewer missed messages and duplicate threads",
      ],
      placeholderLabel: "Customer Communication Screenshot",
    },
    {
      id: "payments-workflows",
      title: "Payments & Workflows",
      description:
        "Let customers pay online and move through key workflows without friction, while your processes stay connected to Xero.",
      benefits: [
        "Online payment options for invoices and statements",
        "Workflow automation for common customer tasks",
        "Works alongside your existing Xero setup",
      ],
      placeholderLabel: "Payments & Workflows Screenshot",
    },
    {
      id: "branding-personalisation",
      title: "Branding & Personalisation",
      description:
        "Present a consistent, professional experience that feels like an extension of your business — not a generic third-party tool.",
      benefits: [
        "Custom branding across the customer experience",
        "Tailored portal presentation for your business",
        "Professional first impression for every customer",
      ],
      placeholderLabel: "Branding & Personalisation Screenshot",
    },
    {
      id: "administration-security",
      title: "Administration & Security",
      description:
        "Manage users, permissions and platform settings with the confidence that customer data is handled securely.",
      benefits: [
        "Role-based access and user management",
        "Secure cloud platform built for business use",
        "Administrative controls that scale with your team",
      ],
      placeholderLabel: "Administration & Security Screenshot",
    },
  ],
} as const;
