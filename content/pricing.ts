import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export type CurrencyCode = "ZAR" | "USD" | "GBP" | "EUR";

export type PlanId = "premium" | "advanced";

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
  /** Customer-facing feature lines for the plan card */
  cardFeatures: string[];
  /** Included users (same across all currencies) */
  includedUsers: number;
  prices: PlanPrices;
  /** Per-user price for additional users, by currency */
  extraUserPrices: PlanPrices;
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

/** Premium plan card features — exact wording and order */
export const premiumCardFeatures = [
  "Customise your client portal",
  "Automatically integrates invoices, statements, quotes & credit notes from your accounting software",
  "Give clients the ability to pay invoices from your portal",
  "Upload documents for your clients to access",
  "Add your own logo & brand colours",
  "Display space for whatever you want your client to see",
  "Create internal notes & reminders for you and your team",
  "Label documents with your own document statuses",
  'Portals have a small "Brought to you by The Portal Genie" logo',
] as const;

/** Advanced plan card features — additional capabilities only */
export const advancedCardFeatures = [
  "Use your own portal web address",
  "Send emails from your own domain",
  "Schedule email campaigns",
  "Email documents directly into the portal",
  "Your clients can create and respond to document notes",
  "Let clients upload documents for you to receive",
  "Remove The Portal Genie branding",
] as const;

/**
 * Comparison-table rows: Premium + Advanced only.
 * Premium capabilities are included in both plans unless marked advanced-only.
 */
export const pricingFeatures: PricingFeatureDefinition[] = [
  {
    id: "customise-client-portal",
    name: "Customise your client portal",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "accounting-integration",
    name: "Automatically integrates invoices, statements, quotes & credit notes from your accounting software",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "pay-invoices",
    name: "Give clients the ability to pay invoices from your portal",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "upload-documents",
    name: "Upload documents for your clients to access",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "logo-brand-colours",
    name: "Add your own logo & brand colours",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "display-space",
    name: "Display space for whatever you want your client to see",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "internal-notes",
    name: "Create internal notes & reminders for you and your team",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "document-statuses",
    name: "Label documents with your own document statuses",
    kind: "boolean",
    values: { premium: true, advanced: true },
  },
  {
    id: "portal-genie-logo",
    name: 'Portals have a small "Brought to you by The Portal Genie" logo',
    kind: "boolean",
    values: { premium: true, advanced: false },
  },
  {
    id: "users",
    name: "Users Included",
    kind: "value",
    values: {
      premium: { compare: "2" },
      advanced: { compare: "2" },
    },
  },
  {
    id: "included-storage",
    name: "Included Storage",
    kind: "value",
    values: {
      premium: { compare: "2 GB" },
      advanced: { compare: "10 GB" },
    },
  },
  {
    id: "included-emails",
    name: "Included Emails",
    kind: "value",
    values: {
      premium: { compare: "500" },
      advanced: { compare: "2,000" },
    },
  },
  {
    id: "email-into-portal",
    name: "Email documents directly into the portal",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "schedule-campaigns",
    name: "Schedule email campaigns",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "group-clients-email-campaigns",
    name: "Group Clients for Email Campaigns",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "reply-to-emails",
    name: "Reply to Emails",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "extra-password-protection",
    name: "Add Extra Password Protection to Your Portal",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "email-domain",
    name: "Send emails from your own domain",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "portal-web-address",
    name: "Use your own portal web address",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "document-notes",
    name: "Your clients can create and respond to document notes",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "client-uploads",
    name: "Let clients upload documents for you to receive",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
  {
    id: "remove-branding",
    name: "Remove The Portal Genie branding",
    kind: "boolean",
    values: { premium: false, advanced: true },
  },
];

/**
 * Edit plan prices here.
 * Use `null` for currencies that are not yet confirmed — the UI shows
 * “Price on request” instead of inventing amounts.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "premium",
    name: "Premium",
    description: "The complete core Portal Genie experience.",
    featured: true,
    includedUsers: 2,
    prices: {
      ZAR: 249,
      USD: 20,
      GBP: 15,
      EUR: 18,
    },
    extraUserPrices: {
      ZAR: 249,
      USD: 20,
      GBP: 15,
      EUR: 18,
    },
    cta: {
      label: buttons.start30DaysFree,
      href: links.premiumStartFree,
    },
    cardFeatures: [...premiumCardFeatures],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Everything in Premium, plus:",
    includedUsers: 2,
    prices: {
      ZAR: 299,
      USD: 30,
      GBP: 22,
      EUR: 26,
    },
    extraUserPrices: {
      ZAR: 299,
      USD: 30,
      GBP: 22,
      EUR: 26,
    },
    cta: {
      label: buttons.start30DaysFree,
      href: links.advancedStartFree,
    },
    cardFeatures: [...advancedCardFeatures],
  },
];

export const pricingPage = {
  metadata: {
    title: "Pricing",
    description:
      "Simple pricing for Portal Genie. Choose Premium or Advanced and start with a 30-day free trial — with currency options for ZAR, USD, GBP and EUR.",
    openGraph: {
      title: "Portal Genie Pricing",
      description:
        "Explore Portal Genie pricing — Premium and Advanced plans with currency options for ZAR, USD, GBP and EUR.",
    },
  },
  hero: {
    headline: "Simple pricing that grows with your business.",
    description: "Choose the Premium or Advanced plan that fits your business.",
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
    description: "See everything included across Premium and Advanced.",
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
        question: "Is there a free trial?",
        answer:
          "Yes. Premium and Advanced both include a 30-day free trial so you can explore the platform before subscribing.",
      },
      {
        question: "Can I change plans later?",
        answer:
          "Yes. You can move between Premium and Advanced as your business needs change. Compare the plans above to see what is included at each tier.",
      },
      {
        question: "Can I use my own branding?",
        answer:
          "Yes. Premium includes your own logo, brand colours and a customised client portal. Advanced adds your own portal web address, email domain and the option to remove Portal Genie branding.",
      },
      {
        question: "Is Portal Genie secure?",
        answer:
          "Portal Genie is built as a secure cloud platform for business use, with customer-facing access designed for documents, communication and payments.",
      },
      {
        question: "How quickly can I get started?",
        answer:
          "You can start a 30-day free trial on Premium or Advanced and begin setting up your customer portal immediately.",
      },
    ],
  },
  finalCta: {
    headline: "Ready to create a better customer experience?",
    description:
      "Book a demo to explore the platform, or start a 30-day free trial with Premium or Advanced.",
    primaryCta: {
      label: buttons.start30DaysFree,
      href: links.premiumStartFree,
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

/** Features shown on a plan card */
export function getPlanCardFeatures(planId: PlanId): string[] {
  return pricingPlans.find((plan) => plan.id === planId)?.cardFeatures ?? [];
}

/** Ordered features for the comparison table */
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

export function formatCurrencyAmount(
  amount: number | null,
  currency: CurrencyCode,
): string | null {
  if (amount === null) {
    return null;
  }

  const symbol =
    pricingCurrencies.find((item) => item.code === currency)?.symbol ?? "";

  return `${symbol}${amount}`;
}

export function getPlanUserAllowanceCopy(
  plan: PricingPlan,
  currency: CurrencyCode,
): {
  includedUsers: string;
  additionalUsers: string | null;
} {
  const includedUsers =
    plan.includedUsers === 1
      ? "Includes 1 user"
      : `Includes ${plan.includedUsers} users`;

  const extraUserAmount = formatCurrencyAmount(
    plan.extraUserPrices[currency],
    currency,
  );

  return {
    includedUsers,
    additionalUsers: extraUserAmount
      ? `Additional users: ${extraUserAmount} / user / month`
      : null,
  };
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
    primary: formatCurrencyAmount(amount, currency) ?? pricingPage.currency.priceUnavailable,
    period: pricingPage.currency.billingPeriod,
    unavailable: false,
  };
}
