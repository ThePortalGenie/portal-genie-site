import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const resourcesPage = {
  metadata: {
    title: "Portal Genie Resources",
    description:
      "Everything you need to understand, set up and get more from your Portal Genie Client Portal.",
    openGraph: {
      title: "Portal Genie Resources — Client Portal Guides & Knowledge Base",
      description:
        "Guides and articles to help you understand, set up and get more from your Portal Genie Client Portal.",
    },
  },
  hero: {
    headline: "Portal Genie Resources",
    description:
      "Everything you need to understand, set up and get more from your Portal Genie Client Portal.",
    primaryCta: {
      label: "Browse articles",
      href: "#knowledge-base",
    },
    secondaryCta: {
      label: "View Pricing",
      href: links.pricing,
    },
  },
  categories: {
    headline: "Browse by topic",
    description:
      "Everything you need to learn, implement and stay up to date with Portal Genie.",
    items: [
      {
        title: "Guides",
        description:
          "Practical articles covering customer experience, document sharing, onboarding and Portal Genie best practices.",
        icon: "book-open",
        cta: {
          label: "Browse guides",
          href: "#guides",
        },
      },
      {
        title: "Documentation",
        description:
          "Product documentation, setup guides and feature walkthroughs.",
        icon: "file-text",
        cta: {
          label: "View documentation",
          href: "#documentation",
        },
      },
      {
        title: "Product Updates",
        description:
          "Release notes, new features and platform improvements.",
        icon: "sparkles",
        cta: {
          label: "See updates",
          href: "#product-updates",
        },
      },
      {
        title: "Frequently Asked Questions",
        description: "Answers to common questions about Portal Genie.",
        icon: "help-circle",
        cta: {
          label: "View FAQs",
          href: links.pricing,
        },
      },
      {
        title: "Customer Success",
        description:
          "Verified Xero App Store reviews and authentic customer stories from businesses using Portal Genie.",
        icon: "star",
        cta: {
          label: "Read reviews",
          href: links.customerSuccess,
        },
      },
    ],
  },
  featured: {
    headline: "Featured resources",
    description:
      "Start here — essential guides for understanding your Client Portal, client access and your website login link.",
    articles: [
      {
        category: "Guides",
        title: "Designing a customer portal your clients will actually use",
        summary:
          "How to structure your Portal Genie experience so customers find documents, messages and payments without friction.",
        readingTime: "6 min read",
        href: "#",
      },
      {
        category: "Guides",
        title: "Onboarding customers to your branded portal",
        summary:
          "A practical approach to introducing Portal Genie to your clients and setting expectations from day one.",
        readingTime: "5 min read",
        href: "#",
      },
      {
        category: "Guides",
        title: "Reducing email overload with secure client communication",
        summary:
          "Why scattered email threads hurt customer experience — and how a connected portal keeps conversations organised.",
        readingTime: "4 min read",
        href: "#",
      },
    ],
  },
  productUpdates: {
    headline: "Latest product updates",
    description:
      "Stay informed about new features, improvements and platform changes.",
    entries: [
      {
        date: "March 2026",
        title: "Enhanced document sharing workflows",
        summary:
          "Improved document upload and sharing flows make it easier for customers to submit and retrieve files through the portal.",
        tag: "Feature",
      },
      {
        date: "February 2026",
        title: "Branding customisation improvements",
        summary:
          "Additional controls for portal branding help businesses present a more polished, on-brand customer experience.",
        tag: "Improvement",
      },
      {
        date: "January 2026",
        title: "Xero integration refinements",
        summary:
          "Updates to the Xero Connected App integration improve reliability and streamline common accounting workflows.",
        tag: "Integration",
      },
      {
        date: "December 2025",
        title: "Secure messaging enhancements",
        summary:
          "Customer messaging now supports richer conversation threading and improved notification handling.",
        tag: "Feature",
      },
    ],
  },
  documentation: {
    headline: "Documentation",
    description:
      "Setup guides, feature walkthroughs and reference material to help your team get started quickly.",
    items: [
      {
        title: "Getting Started",
        description:
          "Create your account, connect Xero and configure your first customer portal.",
        icon: "rocket",
        href: "#",
      },
      {
        title: "User Guides",
        description:
          "Day-to-day guides for team members managing customers, documents and communication.",
        icon: "book-open",
        href: "#",
      },
      {
        title: "Administrator Guides",
        description:
          "Configuration, security, branding and platform administration for business owners.",
        icon: "shield-check",
        href: "#",
      },
      {
        title: "Integrations",
        description:
          "Connect Portal Genie with Xero and explore supported integration workflows.",
        icon: "puzzle",
        href: "#",
      },
    ],
  },
  newsletter: {
    headline: "Stay updated",
    description:
      "Get notified about new guides, product updates and platform improvements. We'll only send what matters.",
    placeholder: "you@company.com",
    buttonLabel: "Subscribe",
    disclaimer:
      "Placeholder signup — connect to your mailing platform when ready.",
  },
  finalCta: {
    headline: "Continue exploring Portal Genie",
    description:
      "See the platform in action or explore the features that help businesses deliver a better customer experience.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: "View Features",
      href: links.features,
    },
  },
} as const;
