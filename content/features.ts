import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

const marketingScreenshots = {
  customerPortal: {
    src: "/images/product/marketing/customer-portal.png",
    alt: "Portal Genie client portal allowing customers to view invoices, access documents, make payments and securely communicate with a business.",
    aspectRatio: "3/2",
  },
  paymentsDashboard: {
    src: "/images/product/marketing/payments-dashboard.png",
    alt: "Portal Genie customer portal showing invoice selection with a secure online payment modal.",
    aspectRatio: "3/2",
  },
  platformDashboard: {
    src: "/images/product/marketing/platform-overview-dashboard.png",
    alt: "Portal Genie dashboard showing customer activity, analytics, document management and customer engagement.",
    aspectRatio: "3/2",
  },
} as const;

export const featuresPage = {
  hero: {
    headline: "Everything your customers need. Built into one platform.",
    description:
      "Explore the features that help businesses deliver a modern customer experience — from secure document sharing to payments, communication and self-service.",
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
    { id: "payments", label: "Payments" },
    { id: "document-management", label: "Document Management" },
    { id: "customer-communication", label: "Customer Communication" },
    { id: "branding-personalisation", label: "Branding & Personalisation" },
    { id: "administration-security", label: "Administration & Security" },
  ],
  sections: [
    {
      id: "customer-portal",
      title: "Customer Portal",
      description:
        "Empower customers to serve themselves with a branded online portal that reduces phone calls, emails and administrative work through secure self-service access",
      benefits: [
        "Access documents, make payments and manage account information anytime",
        "Upload files, exchange notes and stay informed with your Notice Board",
        "Secure OTP login with a branded experience on any device",
      ],
      screenshot: marketingScreenshots.customerPortal,
    },
    {
      id: "payments",
      title: "Payments",
      description:
        "Allow customers to pay multiple invoices at once with payment button integration.",
      benefits: [
        "Accept secure online payments for multiple invoices at once through a payment button integrated into your customer portal",
        "Streamline customer tasks with guided workflows and automation",
        "Works seamlessly alongside your existing processes",
      ],
      screenshot: marketingScreenshots.paymentsDashboard,
    },
    {
      id: "document-management",
      title: "Document Management",
      description:
        "Simplify document sharing with a secure, centralised library that gives customers instant access while reducing manual administration for your team.",
      benefits: [
        "Share invoices, statements and documents securely from one place",
        "Customers can access and retrieve documents whenever they need them",
        "Eliminate email attachments and keep document history organised",
      ],
      screenshot: marketingScreenshots.customerPortal,
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
      screenshot: marketingScreenshots.customerPortal,
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
      screenshot: marketingScreenshots.customerPortal,
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
      screenshot: marketingScreenshots.platformDashboard,
    },
  ],
} as const;
