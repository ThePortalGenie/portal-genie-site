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
  customerCommunication: {
    src: "/images/features/customer-communication-note-history.png",
    alt: "Portal Genie customer communication and note history",
    aspectRatio: "3/2",
    framed: false,
  },
  documentManagement: {
    src: "/images/product/marketing/document-management-admin-client-portal.png",
    alt: "The Portal Genie document management showing the Admin Portal and Client Portal side by side",
    aspectRatio: "3/2",
    framed: false,
    emphasis: "visual",
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
    illustration: {
      src: "/images/features/features-hero-streak.png",
      // Decorative supporting layer — empty alt at render time.
      description:
        "The Portal Genie blue magic streak sweeping diagonally through the Features hero.",
      width: 1536,
      height: 1024,
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
      portalLinkCallout: {
        heading: "Your portal. One simple link.",
        body: "Every Portal Genie account includes a unique portal link you can share with your customers — or connect to a Client Login button on your website — giving them a simple, consistent way to access their portal whenever they need it.",
        points: [
          "Add it to a Client Login button on your website",
          "Include it in customer emails and communications",
          "Share it directly with customers",
        ],
      },
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
        "Simplify document sharing with one secure, centralised portal where customers can access what they need, whenever they need it.",
      benefits: [
        "Share invoices, statements, quotes and credit notes synced in realtime with your accounting software",
        "Customers can access and retrieve documents whenever they need them",
        "Upload other documents to your customer portal for them to view and download",
        "Your customers can upload documents to your portal for you to receive and review",
        "Eliminate email attachments and keep document history organised",
      ],
      screenshot: marketingScreenshots.documentManagement,
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
      screenshot: marketingScreenshots.customerCommunication,
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
