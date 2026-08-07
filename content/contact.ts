import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export const contactPage = {
  metadata: {
    title: "Contact Sales",
    description:
      "Contact The Portal Genie sales team with questions about our client portal software, plans or demos. Send us a message or email our team directly.",
    openGraph: {
      title: "Contact The Portal Genie | The Portal Genie",
      description:
        "Contact The Portal Genie sales team with questions about our client portal software, plans or demos. Send us a message or email our team directly.",
    },
  },
  intro: {
    headline: "Contact us",
    description:
      "Have a question about The Portal Genie, need help choosing the right solution, or simply want to speak with our team?",
    followUp:
      "Send us a message using the form and we'll get back to you as soon as possible.",
    emailPrompt: "Prefer email?",
    emailLead: "Contact us at",
    email: "sales@theportalgenie.com",
  },
  demo: {
    headline: "Want to see The Portal Genie in action?",
    description:
      "Book a personalised demo and we'll show you how The Portal Genie can work for your business.",
    cta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
  trust: [
    {
      title: "Secure",
      description: "Your details are handled securely",
      icon: "shield" as const,
    },
    {
      title: "Responsive",
      description: "We aim to respond promptly",
      icon: "clock" as const,
    },
    {
      title: "Human support",
      description: "Speak with a real person",
      icon: "users" as const,
    },
  ],
} as const;
