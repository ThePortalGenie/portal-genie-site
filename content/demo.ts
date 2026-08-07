import { links } from "@/config/links";

export const demoPage = {
  metadata: {
    title: "Book a Demo",
    description:
      "Book a personalised demo of The Portal Genie client portal software and see secure self-service, documents and communication alongside your accounting software.",
    openGraph: {
      title: "Book a Portal Genie Demo | The Portal Genie",
      description:
        "Book a personalised demo of The Portal Genie client portal software and see secure self-service, documents and communication alongside your accounting software.",
    },
  },
  booking: {
    eyebrow: "Book your demo",
    headline: "See The Portal Genie in Action",
    description:
      "Book a personalised demo and discover how The Portal Genie can help you deliver a better customer experience through secure portals, branded communication and streamlined workflows.",
    instruction:
      "Book a live demonstration of our client portal software and choose a time that suits you below.",
  },
  alternativeContact: {
    prompt: "Prefer to contact us directly?",
    email: "sales@theportalgenie.com",
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
