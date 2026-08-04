import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export type CurrencyCode = "ZAR" | "USD" | "GBP" | "EUR";

export type PlanId = "freemium" | "premium" | "advanced";

export type PlanPrices = Record<CurrencyCode, number | null>;

export type ValuePlanCell = {
  /** Structured value for the comparison table (`null` → —) */
  compare: string | null;
};

export type PricingFeatureDefinition =
  | {
      id: string;
      name: string;
      kind: "boolean";
      description?: string;
      /** Whether each plan includes this feature */
      values: Record<PlanId, boolean>;
    }
  | {
      id: string;
      name: string;
      kind: "value";
      description?: string;
      values: Record<PlanId, ValuePlanCell>;
    };

export type PricingPlan = {
  id: PlanId;
  name: string;
  description: string;
  /**
   * Customer-facing feature lines for this plan’s pricing card.
   * Kept separate from comparison-table values so card wording can differ.
   */
  cardFeatures: string[];
  prices: PlanPrices;
  cta: {
    label: string;
    href: string;
  };
  featured?: boolean;
};

export const pricingCurrencies: {
  code: CurrencyCode;
  label: string;
  symbol: string;
}[] = [
  { code: "ZAR", label: "ZAR", symbol: "R" },
  { code: "USD", label: "USD", symbol: "$" },
  { code: "GBP", label: "GBP", symbol: "£" },
  { code: "EUR", label: "EUR", symbol: "€" },
];

/**
 * Comparison-table features (structured values / booleans).
 * Plan card copy lives on each plan’s `cardFeatures` array and may differ.
 */
export const pricingFeatures: PricingFeatureDefinition[] = [
  {
    id: "visits",
    name: "Visits per month",
    kind: "value",
    values: {
      freemium: { compare: "100" },
      premium: { compare: "Unlimited" },
      advanced: { compare: "Unlimited" },
    },
  },
  {
    id: "view-forward-download",
    name: "View, Forward & Download Documents",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "core-folders",
    name: "Folders for Invoice, Statement, Quote & Credit Note",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "accounting-integrations",
    name: "Works with Xero, QuickBooks, Sage",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "multi-currency",
    name: "Multi currency enabled",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "responsive-portal",
    name: "Client Portal Optimized for Desktop & Mobile",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "secure-login-link",
    name: "Secure Client Login Link",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "welcome-message",
    name: "Client Welcome Message",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "custom-logo-colours",
    name: "Custom Logo and Colour Schemes",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "notes-reminders",
    name: "Notes and Internal Reminders",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "reporting-dashboard",
    name: "Reporting Dashboard",
    kind: "boolean",
    values: { freemium: true, premium: true, advanced: true },
  },
  {
    id: "users",
    name: "Users",
    kind: "value",
    values: {
      freemium: { compare: "3" },
      premium: { compare: "Unlimited" },
      advanced: { compare: "Unlimited" },
    },
  },
  {
    id: "branded-domain",
    name: "Branded Portal Domain",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "custom-email-domain",
    name: "Custom E-mail Domain for Notifications",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "remove-branding",
    name: "Remove Portal Genie Branding",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "dual-logo",
    name: "Dual Logo",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "custom-billboard",
    name: "Custom Billboard Display",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "bulk-uploads",
    name: "Bulk Document Uploads (Admin)",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "customer-folders",
    name: "Customer Folders",
    kind: "value",
    values: {
      freemium: { compare: null },
      premium: { compare: "2" },
      advanced: { compare: "6" },
    },
  },
  {
    id: "custom-statuses",
    name: "Custom Document Statuses",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "folder-visibility",
    name: "Folder Visibility Control",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "pay-button",
    name: "Pay Button Integration",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "new-doc-notifications",
    name: "Client New Document Notifications",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "second-password",
    name: "Second layer Password Protection",
    kind: "boolean",
    values: { freemium: false, premium: true, advanced: true },
  },
  {
    id: "included-storage",
    name: "Included Storage",
    kind: "value",
    values: {
      freemium: { compare: null },
      premium: { compare: "2GB" },
      advanced: { compare: "10GB" },
    },
  },
  {
    id: "client-uploads",
    name: "Client Document Uploads",
    kind: "boolean",
    values: { freemium: false, premium: false, advanced: true },
  },
  {
    id: "two-way-notes",
    name: "2 Way Notes",
    kind: "boolean",
    values: { freemium: false, premium: false, advanced: true },
  },
  {
    id: "scheduled-emails",
    name: "Scheduled E-mails",
    kind: "boolean",
    values: { freemium: false, premium: false, advanced: true },
  },
  {
    id: "client-profile-toggle",
    name: "Client Profile Toggle",
    kind: "boolean",
    values: { freemium: false, premium: false, advanced: true },
  },
  {
    id: "email-in-documents",
    name: "E-mail in Documents",
    kind: "boolean",
    values: { freemium: false, premium: false, advanced: true },
  },
];

/**
 * Edit plan prices here.
 * Use `null` for currencies that are not yet confirmed — the UI shows
 * “Price on request” instead of inventing amounts.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "freemium",
    name: "Freemium",
    description: "A great starting point",
    prices: {
      ZAR: 0,
      USD: 0,
      GBP: 0,
      EUR: 0,
    },
    cta: {
      label: buttons.startFree,
      href: links.startFree,
    },
    cardFeatures: [
      "Up to 100 Portal Visits Per Month",
      "View, Forward & Download Documents",
      "Folders for Invoice, Statement, Quote & Credit Note",
      "Works with Xero, QuickBooks, Sage",
      "Multi currency enabled",
      "Client Portal Optimized for Desktop & Mobile",
      "Secure Client Login Link",
      "Client Welcome Message",
      "Custom Logo and Colour Schemes",
      "Notes and Internal Reminders",
      "Reporting Dashboard",
      "3 Users",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Everything in Freemium plus:",
    featured: true,
    prices: {
      ZAR: 249,
      USD: 12,
      GBP: 10,
      EUR: 11,
    },
    cta: {
      label: buttons.start30DaysFree,
      href: links.premiumStartFree,
    },
    cardFeatures: [
      "Unlimited Portal Visits",
      "Branded Portal Domain",
      "Custom E-mail Domain for Notifications",
      "Remove Portal Genie Branding",
      "Dual Logo",
      "Custom Billboard Display",
      "Bulk Document Uploads (Admin)",
      "2 x Custom Document Folders",
      "4 Custom Document Statuses",
      "Folder Visibility Control",
      "Pay Button Integration",
      "Unlimited Users",
      "Client New Document Notifications",
      "Second layer Password Protection",
      "1GB Storage Included",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Everything in Premium plus:",
    prices: {
      ZAR: 299,
      USD: 15,
      GBP: 12,
      EUR: 14,
    },
    cta: {
      label: buttons.start30DaysFree,
      href: links.advancedStartFree,
    },
    cardFeatures: [
      "Unlimited Portal Visits",
      "Client Document Uploads",
      "2 Way Notes",
      "Scheduled E-mails",
      "Client profile toggle",
      "E-mail in Documents",
      "4 x Additional Custom Folders",
      "10 Gigs Storage Included",
    ],
  },
];

export const pricingPage = {
  metadata: {
    title: "Pricing",
    description:
      "Simple pricing for Portal Genie. Start free and choose the Freemium, Premium or Advanced plan that fits your business.",
    openGraph: {
      title: "Portal Genie Pricing",
      description:
        "Explore Portal Genie pricing — Freemium, Premium and Advanced plans with currency options for ZAR, USD, GBP and EUR.",
    },
  },
  hero: {
    headline: "Simple pricing that grows with your business.",
    description: "Start free and choose the plan that fits your business.",
  },
  currency: {
    default: "ZAR" as CurrencyCode,
    billingPeriod: "per month",
    pricesIncludeVat: true,
    vatNote: "Prices include VAT",
    priceUnavailable: "Price on request",
  },
  compare: {
    headline: "Compare plans",
    description:
      "See everything included across Freemium, Premium and Advanced.",
  },
  faq: {
    headline: "Frequently asked questions",
    items: [
      {
        question: "Does Portal Genie replace Xero?",
        answer:
          "No. Portal Genie is the customer experience layer for businesses using accounting software like Xero. Your team continues working in their accounting system while customers get a secure, branded portal for documents, communication, payments and self-service.",
      },
      {
        question: "Is there a free plan?",
        answer:
          "Yes. Freemium lets you get started at no cost, with Premium and Advanced available when you need more capacity and branding control.",
      },
      {
        question: "Can I change plans later?",
        answer:
          "Yes. You can move between plans as your business needs change. Compare the plans above to see what is included at each tier.",
      },
      {
        question: "Can I use my own branding?",
        answer:
          "Yes. Freemium includes custom logo and colour schemes. Premium and Advanced unlock branded domains, dual logos, billboards and the option to remove Portal Genie branding.",
      },
      {
        question: "Is Portal Genie secure?",
        answer:
          "Portal Genie is built as a secure cloud platform for business use, with customer-facing access designed for documents, communication and payments.",
      },
      {
        question: "How quickly can I get started?",
        answer:
          "You can create an account and begin setting up your customer portal immediately. Choose Freemium to start free, or Premium / Advanced for a 30-day free trial.",
      },
    ],
  },
  finalCta: {
    headline: "Ready to create a better customer experience?",
    description:
      "Start free or book a demo to see how Portal Genie helps your business deliver a more connected customer experience.",
    primaryCta: {
      label: buttons.startFree,
      href: links.startFree,
    },
    secondaryCta: {
      label: buttons.bookDemo,
      href: links.bookDemo,
    },
  },
} as const;

/**
 * Limited-time pricing notice on the Pricing page.
 * Set `enabled` to false to hide the banner with no leftover spacing.
 */
export const pricingPromotion = {
  enabled: true,
  label: "Limited-time pricing",
  heading: "Lock in today's pricing",
  description:
    "Our current pricing is available for a limited time. Sign up now and lock in your plan at today's price for your business.",
  mobileDescription: "Sign up now to secure today's plan pricing.",
  ctaLabel: "Choose Your Plan",
  /** Stable hash target for the plan cards section */
  targetId: "plans",
} as const;

/** Features shown on a plan card, in defined order. */
export function getPlanCardFeatures(planId: PlanId): string[] {
  return pricingPlans.find((item) => item.id === planId)?.cardFeatures ?? [];
}

/** Ordered features for the comparison table. */
export function getComparisonFeatures(): PricingFeatureDefinition[] {
  return pricingFeatures;
}

export function getFeatureCompareValue(
  feature: PricingFeatureDefinition,
  planId: PlanId,
): { kind: "value"; text: string | null } | { kind: "boolean"; included: boolean } {
  if (feature.kind === "value") {
    return { kind: "value", text: feature.values[planId].compare };
  }

  return { kind: "boolean", included: feature.values[planId] };
}

export function formatPlanPrice(
  amount: number | null,
  currency: CurrencyCode,
): { primary: string; period: string | null; unavailable: boolean } {
  if (amount === null) {
    return {
      primary: pricingPage.currency.priceUnavailable,
      period: null,
      unavailable: true,
    };
  }

  const symbol =
    pricingCurrencies.find((item) => item.code === currency)?.symbol ?? "";

  if (amount === 0) {
    return {
      primary: `${symbol}${amount}`,
      period: null,
      unavailable: false,
    };
  }

  return {
    primary: `${symbol}${amount}`,
    period: pricingPage.currency.billingPeriod,
    unavailable: false,
  };
}
