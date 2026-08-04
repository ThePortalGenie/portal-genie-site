import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const whyPage = {
  metadata: {
    title: "Why The Portal Genie",
    description:
      "Discover why The Portal Genie exists — the customer experience layer built to work alongside Xero, QuickBooks and Sage Business Cloud and help businesses deliver a modern, connected and professional service.",
    openGraph: {
      title:
        "Why The Portal Genie — The Customer Experience Layer for Your Business",
      description:
        "Great accounting software manages finances. Great customer experiences require something more. Learn why Portal Genie was built to extend your accounting software and modernise client interactions.",
    },
  },
  hero: {
    headline: "Why The Portal Genie",
    description:
      "Great accounting software manages finances. Great customer experiences require something more. The Portal Genie exists to help businesses deliver the modern, connected service their customers expect - without changing the way their team works.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: "Explore Features",
      href: links.features,
    },
  },
  challenge: {
    eyebrow: "The challenge",
    headline: "Customer experience hasn't kept pace with expectations.",
    description:
      "Every business works hard to deliver great products and services, but the customer experience surrounding documents, communication, payments and self-service is often fragmented and inconsistent. The Portal Genie brings those interactions together into one connected experience, while integrating seamlessly with Xero, QuickBooks and Sage Business Cloud.",
    points: [
      {
        title: "Fragmented communication",
        description:
          "Important conversations scattered across email threads, phone calls and ad hoc messages — making it harder for customers to stay informed.",
      },
      {
        title: "Scattered documents",
        description:
          "Files shared through multiple channels, with no single place for customers to find what they need when they need it.",
      },
      {
        title: "Inconsistent experiences",
        description:
          "Every client interaction feels slightly different, making it difficult to deliver the professional, cohesive service your brand represents.",
      },
      {
        title: "Manual follow-up",
        description:
          "Teams spend valuable time chasing documents, answering repeat questions and coordinating routine tasks that customers could handle themselves.",
      },
      {
        title: "Disconnected interactions",
        description:
          "Customers move between systems and touchpoints without a clear, branded destination that ties their relationship with your business together.",
      },
    ],
  },
  whyBuilt: {
    eyebrow: "Our purpose",
    headline: "Why we built The Portal Genie",
    paragraphs: [
      "We saw a gap that accounting software wasn't designed to fill. Xero, QuickBooks and Sage Business Cloud are powerful tools for managing the financial side of a business, but the customer experience often sits outside those core workflows.",
      "What's missing is a dedicated customer experience layer — a secure, branded environment where customers can interact with your business on their terms.",
      "The Portal Genie was built to fill that gap. Not as another accounting platform, but as the layer that sits alongside the accounting software you already use — giving your customers a modern portal for documents, communication, payments and self-service while your team continues working with familiar tools and workflows.",
      "Our focus has always been the customer experience: making it simpler for customers to engage with your business, and easier for your team to deliver a service that feels connected, professional and worth recommending.",
    ],
  },
  builtAlongsideXero: {
    eyebrow: "Works with your accounting software",
    headline: "Built alongside your accounting software, not instead of it",
    description:
      "The Portal Genie works with Xero, QuickBooks and Sage Business Cloud, extending the accounting software you already use rather than replacing it.",
    paragraphs: [
      "Your team keeps working with familiar accounting tools and workflows. Your customers gain a secure, branded portal that complements those workflows — accessing documents, sending messages, making payments and completing everyday tasks in one connected experience.",
      "The Portal Genie connects the customer experience to your existing accounting setup, so the transition is additive rather than disruptive. You can modernise how customers interact with your business without rethinking how your team manages accounts.",
    ],
    highlights: [
      "Adds a dedicated customer experience layer to your accounting software",
      "Complements existing workflows — no accounting platform replacement",
      "Gives customers a branded, secure portal connected to your business",
    ],
  },
  philosophy: {
    headline: "Our philosophy",
    description:
      "Everything we build is guided by a simple belief: customer experience should feel as considered and professional as the work you deliver.",
    principles: [
      {
        title: "Simplicity",
        description:
          "Complex problems deserve simple solutions. We design experiences that are intuitive for customers and straightforward for your team.",
        icon: "minimize-2",
      },
      {
        title: "Security",
        description:
          "Customer data and business communication deserve a secure foundation. Trust is not optional — it is built into every interaction.",
        icon: "shield-check",
      },
      {
        title: "Customer-first design",
        description:
          "Every feature starts with the customer experience. We build what makes it easier for clients to engage with your business.",
        icon: "heart-handshake",
      },
      {
        title: "Professional branding",
        description:
          "Your portal should reflect your business, not ours. Portal Genie gives you a branded experience that reinforces your professional identity.",
        icon: "palette",
      },
      {
        title: "Continuous improvement",
        description:
          "Customer expectations evolve. We continuously refine the platform so your business can stay ahead of what clients expect.",
        icon: "trending-up",
      },
    ],
  },
  lookingForward: {
    eyebrow: "Looking forward",
    headline: "Helping businesses meet rising expectations",
    paragraphs: [
      "The way customers interact with professional services is changing. They expect the same clarity, speed and convenience they experience elsewhere — and businesses that deliver it will stand apart.",
      "Our vision is to help businesses create a customer experience that matches the quality of their work. The Portal Genie will continue evolving as a customer experience layer that works alongside Xero, QuickBooks and Sage Business Cloud — connecting businesses and their customers through secure, modern and professionally branded interactions.",
    ],
  },
  finalCta: {
    headline: "See how The Portal Genie works with your business",
    description:
      "Book a demo to explore the platform, or view pricing to find a plan that fits your business.",
    primaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
    secondaryCta: {
      label: "View Pricing",
      href: links.pricing,
    },
  },
} as const;
