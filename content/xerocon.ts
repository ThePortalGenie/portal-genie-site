import { xeroconCampaign } from "@/config/xerocon";
import { buttons } from "@/content/buttons";

export const xeroconPage = {
  metadata: {
    title: "Xerocon Special Offer",
    description:
      "Exclusive Xerocon pricing for The Portal Genie — a secure client portal connected to Xero for documents, communication and better client service.",
  },
  header: {
    loginPrompt: "Already a customer?",
    loginLabel: buttons.login,
    loginHref: xeroconCampaign.links.login,
  },
  hero: {
    eyebrow: "XEROCON SPECIAL",
    headline: "Your Client Portal.\nConnected to Xero.\nBuilt for Better Client Service.",
    description:
      "Give your clients one secure place for documents, communication and the information they need — connected directly to Xero.",
    offerLabel: "XEROCON",
    offerTitle: "SPECIAL PRICING",
    primaryCta: {
      label: "Claim Xerocon Pricing",
      href: xeroconCampaign.signupUrl,
    },
    secondaryCta: {
      label: "See What's Included",
      href: "#whats-included",
    },
  },
  xero: {
    badgeAlt: "Xero Connected App",
    badgeSrc: "/images/logos/xero-connected-app-badge.png",
    badgeWidth: 1522,
    badgeHeight: 789,
    caption: "Official Xero Connected App",
  },
  value: {
    id: "whats-included",
    headline: "Everything Your Clients Need.\nOne Secure Portal.",
    description:
      "Deliver a professional client experience without changing how your team works in Xero.",
    benefits: [
      {
        title: "Secure document sharing",
        description:
          "Share files securely in one place instead of chasing email attachments.",
      },
      {
        title: "Invoices and statements",
        description:
          "Automatically surface invoices, statements, quotes and credit notes from Xero.",
      },
      {
        title: "Client communication",
        description:
          "Keep conversations organised and connected to the client record.",
      },
      {
        title: "Document requests & uploads",
        description:
          "Ask clients for what you need and let them upload documents securely.",
      },
      {
        title: "Less repetitive admin",
        description:
          "Reduce resend requests and free your team for higher-value work.",
      },
      {
        title: "Branded client experience",
        description:
          "Present your logo, colours and a professional portal your clients will trust.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    headline: "From Xero to Your Client Portal",
    steps: [
      {
        step: "1",
        title: "Connect Xero",
        description:
          "Link Portal Genie to your Xero organisation in a few guided steps.",
      },
      {
        step: "2",
        title: "Invite Your Clients",
        description:
          "Give each client secure access to their own branded portal.",
      },
      {
        step: "3",
        title: "Give Them One Place to Get Things Done",
        description:
          "Documents, communication and self-service — all in one secure destination.",
      },
    ],
  },
  pricing: {
    id: "pricing",
    eyebrow: "Exclusive offer",
    headline: "Exclusive Xerocon Pricing",
    description:
      "Special pricing available for Xerocon attendees. Choose Core or Pro and claim your offer.",
    pricePendingLabel: "Special Xerocon pricing",
    pricePendingNote: "Claim the offer to lock in your promotional rate.",
    perMonth: "per month",
    includedUsersLabel: (count: number) =>
      count === 1 ? "Includes 1 user" : `Includes ${count} users`,
    additionalUsersLabel: (amount: string) =>
      `Additional users ${amount}/month each`,
    claimCta: {
      label: "Claim Xerocon Pricing",
      href: xeroconCampaign.signupUrl,
    },
    compareLink: {
      label: "View Full Plan Comparison",
      href: xeroconCampaign.links.pricing,
    },
  },
  finalCta: {
    headline: "Ready to Give Your Clients a Better Portal?",
    description:
      "Bring documents, communication and your Xero-connected client experience together in one secure place.",
    primaryCta: {
      label: "Claim Xerocon Pricing",
      href: xeroconCampaign.signupUrl,
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: xeroconCampaign.links.bookDemo,
    },
  },
  expired: {
    eyebrow: "Xerocon Special Offer",
    headline: "This Xerocon offer has now ended.",
    description:
      "You can still discover The Portal Genie and view our current plans.",
    primaryCta: {
      label: "View Current Pricing",
      href: xeroconCampaign.links.pricing,
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: xeroconCampaign.links.bookDemo,
    },
  },
} as const;
