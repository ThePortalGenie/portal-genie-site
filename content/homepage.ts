import { links } from "@/config/links";
import { buttons } from "@/content/buttons";
import { accountingIntegrations } from "@/content/integrations";

export const homepage = {
  hero: {
    eyebrow: "Works with the accounting software you already use",
    headline: "The Customer Experience Layer for businesses.",
    supportingCopy: [
      "Transform how your customers interact with your business without changing the way your team works in your accounting software.",
      "Deliver a modern self-service experience with secure documents, communication, payments and automation - all in one place.",
    ],
    valueStatements: [
      "Connects with Xero, QuickBooks and Sage Business Cloud",
      "Works alongside your existing accounting software",
      "No disruption to existing workflows",
    ],
    /** Equal-size Xero / QuickBooks / Sage row — see content/integrations.ts */
    integrations: accountingIntegrations,
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: buttons.startFree,
      href: links.pricing,
    },
    illustration: {
      src: "/images/product/marketing/hero-connected-experience.png",
      // Purely decorative alongside the headline/copy, so it's rendered
      // with an empty alt and hidden from assistive tech. Kept here as a
      // human-readable description for maintainers and future OG/meta use.
      description:
        "A conceptual illustration representing Portal Genie connecting businesses and customers through secure documents, payments and communication.",
    },
  },
  trustBar: {
    items: [
      "Built for modern businesses",
      "Works with Xero, QuickBooks and Sage",
      "No disruption to existing workflows",
      "Secure cloud platform",
    ],
  },
  valueExtension: {
    headline: "Extend the value of your accounting software for your customers.",
    description:
      "Today's customers expect fast, secure and convenient digital experiences. The Portal Genie works alongside your accounting software to provide a modern customer experience layer that brings together communication, documents, payments and self-service.",
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
        title: "Works alongside your accounting software",
        description:
          "The Portal Genie extends the customer experience while allowing your team to continue working with the accounting software and workflows they already know.",
        icon: "puzzle",
      },
    ],
  },
  platformOverview: {
    headline: "One platform for the complete customer experience.",
    description:
      "The Portal Genie brings together the capabilities businesses need to serve customers. Secure access to documents, communication, payments and self-service.",
    showcase: {
      image: "/images/product/marketing/platform-overview-dashboard.png",
      alt: "Portal Genie dashboard showing customer activity, analytics, document management and customer engagement.",
      aspectRatio: "3/2",
    },
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
        title: "Client Communication & Updates",
        description:
          "Keep clients informed with document notes, email campaigns, reminders and updates, all connected to their portal experience.",
        icon: "mail-check",
      },
      {
        title: "Customer Self-Service",
        description:
          "Provide customers with on-demand access to invoices, documents, and account services. Eliminate resend requests, and improve the customer experience with self-service.",
        icon: "user-check",
      },
    ],
  },
  customerExperience: {
    headline: "Give every customer a secure, branded destination.",
    description:
      "Today's customers expect more than emailed invoices and disconnected conversations. The Portal Genie provides every customer with one secure, branded destination where they can view invoices, access documents, communicate with your business, make payments and manage their relationship.",
    showcase: {
      image: "/images/product/marketing/customer-portal.png",
      alt: "Portal Genie client portal allowing customers to view invoices, access documents, make payments and securely communicate with a business.",
      aspectRatio: "3/2",
    },
    features: [
      { title: "Secure Client Portal", icon: "shield-check" },
      { title: "Online Payments", icon: "credit-card" },
      { title: "Document Access", icon: "file-text" },
      { title: "Secure Messaging", icon: "message-square" },
      { title: "Self-Service Experience", icon: "user-check" },
    ],
  },
  beyondTransaction: {
    headline: "Beyond the Transaction",
    description:
      "Every invoice, document, payment and conversation is an opportunity to strengthen your customer relationship. The Portal Genie brings these interactions together into one connected experience, helping businesses deliver faster service, clearer communication and a more professional customer journey.",
    steps: [
      {
        title: "Invoices, Statements, Quotes & Credit Notes",
        description:
          "Provide access to invoices, statements, quotes and credit notes through a secure customer portal.",
        icon: "file-text",
      },
      {
        title: "Payments",
        description:
          "Allow customers to pay multiple invoices at once using integrated online payments.",
        icon: "credit-card",
      },
      {
        title: "Documents",
        description:
          "Share files securely instead of relying on email attachments.",
        icon: "file-text",
      },
      {
        title: "Communication",
        description:
          "Use client notes to keep conversations connected to the customer record.",
        icon: "message-square",
      },
    ],
  },
  features: {
    eyebrow: "Capabilities",
    headline: "Everything you need to deliver an exceptional customer experience.",
    description:
      "The Portal Genie extends your business with customer-facing tools that improve communication, simplify administration and create a professional digital experience for every customer.",
    cards: [
      {
        title: "Customer Portal",
        description:
          "Provide every customer with one secure destination for invoices, documents, payments and communication.",
        icon: "layout-dashboard",
        highlights: [
          "Secure customer login",
          "Mobile-friendly portal",
          "Account statements",
          "Quotes & credit notes",
        ],
      },
      {
        title: "Document Management",
        description:
          "Share, organise and manage business documents without relying on email attachments.",
        icon: "folder-open",
        highlights: [
          "Secure uploads",
          "Custom folders",
          "Visibility controls",
          "Bulk document uploads",
        ],
      },
      {
        title: "Online Payments",
        description:
          "Help customers pay invoices faster using integrated online payment capabilities.",
        icon: "credit-card",
        highlights: [
          "Pay invoices online",
          "Outstanding balances",
          "Payment history",
          "Invoice actions",
        ],
      },
      {
        title: "Branding & Customisation",
        description:
          "Create a customer experience that reflects your own brand rather than generic accounting software.",
        icon: "palette",
        highlights: [
          "White labelling",
          "Custom domains",
          "Logos & colours",
          "Promotional billboards",
        ],
      },
      {
        title: "Communication",
        description:
          "Keep customers informed with secure communication and automated notifications.",
        icon: "messages-square",
        highlights: [
          "Secure messaging",
          "Welcome messages",
          "Email notifications",
          "Scheduled emails",
        ],
      },
      {
        title: "Administration & Automation",
        description:
          "Reduce manual administration through automation and better customer management.",
        icon: "workflow",
        highlights: [
          "Reporting dashboard",
          "User management",
          "Workflow reminders",
          "Client profiles",
        ],
      },
    ],
  },
} as const;
