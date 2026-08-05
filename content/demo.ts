import { links } from "@/config/links";

export const demoPage = {
  metadata: {
    title: "Book a Demo",
    description:
      "Book a personalised Portal Genie demonstration and see how Xero businesses deliver a secure, branded customer experience alongside Xero.",
    openGraph: {
      title: "Book a Portal Genie Demo — Customer Experience for Xero Businesses",
      description:
        "Schedule a tailored demonstration of The Portal Genie and discover how it extends Xero with secure portals, branded communication and streamlined workflows.",
    },
  },
  booking: {
    eyebrow: "Book your demo",
    headline: "See The Portal Genie in Action",
    description:
      "Book a personalised demo and discover how The Portal Genie can help you deliver a better customer experience through secure portals, branded communication and streamlined workflows.",
    instruction: "Choose a time that suits you below.",
  },
  highlights: {
    headline: "What you'll see",
    cards: [
      {
        title: "Connected Customer Experience",
        description:
          "See exactly how your customers interact with your branded Portal Genie experience.",
        icon: "users",
      },
      {
        title: "Built Around Xero",
        description:
          "Understand how Portal Genie extends your existing Xero workflow rather than replacing it.",
        icon: "layers",
      },
      {
        title: "Tailored Demonstration",
        description:
          "We'll focus on the workflows, features and questions most relevant to your business.",
        icon: "message-square",
      },
    ],
  },
  alternativeContact: {
    prompt: "Prefer to contact us directly?",
    email: "info@theportalgenie.com.au",
  },
  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        question: "How long does the demo take?",
        answer:
          "Demonstrations are designed to be focused and practical. We'll cover the areas most relevant to your business and leave time for your questions.",
      },
      {
        question: "Is the demonstration personalised?",
        answer:
          "Yes. We tailor each demonstration to your business, focusing on the customer experience, workflows and features that matter most to you.",
      },
      {
        question: "Do I need to prepare anything?",
        answer:
          "No formal preparation is required. It can help to think about how your customers currently interact with your business and any questions you'd like answered.",
      },
      {
        question: "Can multiple team members join?",
        answer:
          "Yes. You're welcome to include colleagues on the call. Share the meeting details with anyone who should be part of the conversation.",
      },
      {
        question: "Will I see the real Portal Genie platform?",
        answer:
          "Yes. You'll see the Portal Genie platform itself — including the customer portal experience and how it works alongside Xero.",
      },
      {
        question: "Is there any obligation after the demo?",
        answer:
          "No. The demonstration is an opportunity to explore whether Portal Genie is the right fit. There is no obligation to proceed afterwards.",
      },
    ],
  },
  finalCta: {
    headline: "Continue exploring Portal Genie",
    description:
      "Learn more about the platform, explore pricing, or return when you're ready to book a time.",
    primaryCta: {
      label: "View Features",
      href: links.features,
    },
    secondaryCta: {
      label: "View Pricing",
      href: links.pricing,
    },
  },
} as const;
