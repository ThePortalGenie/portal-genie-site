import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export type CurrencyCode = "ZAR" | "USD" | "GBP" | "EUR";

export type PlanId = "freemium" | "premium" | "advanced";

export type PlanPrices = Record<CurrencyCode, number | null>;

export type CardFeatureDisplay = {
  label: string;
  /** When set, render as label … value on the pricing card */
  value?: string;
};

export type ValuePlanCell = {
  compare: string | null;
  card: CardFeatureDisplay | null;
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
  /** Feature ids shown on this plan’s card (order preserved) */
  cardFeatureIds: string[];
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
 * Single source of truth for pricing features.
 * Edit values here — cards and the comparison table both derive from this.
 */
export const pricingFeatures: PricingFeatureDefinition[] = [
  {
    id: "visits",
    name: "Visits per month",
    kind: "value",
    values: {
      freemium: {
        compare: "100",
        card: { label: "100 visits per month" },
      },
      premium: {
        compare: "Unlimited",
        card: { label: "Unlimited visits per month" },
      },
      advanced: {
        compare: "Unlimited",
        card: { label: "Unlimited visits per month" },
      },
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
      freemium: {
        compare: "3",
        card: { label: "Users", value: "3" },
      },
      premium: {
        compare: "Unlimited",
        card: { label: "Users", value: "Unlimited" },
      },
      advanced: {
        compare: "Unlimited",
        card: { label: "Users", value: "Unlimited" },
      },
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
      freemium: { compare: null, card: null },
      premium: {
        compare: "2",
        card: { label: "Customer Folders", value: "2" },
      },
      advanced: {
        compare: "6",
        card: { label: "Customer Folders", value: "6" },
      },
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
      freemium: { compare: null, card: null },
      premium: {
        compare: "2GB",
        card: { label: "Included Storage", value: "2GB" },
      },
      advanced: {
        compare: "10GB",
        card: { label: "Included Storage", value: "10GB" },
      },
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
    cardFeatureIds: [
      "visits",
      "view-forward-download",
      "core-folders",
      "accounting-integrations",
      "multi-currency",
      "responsive-portal",
      "secure-login-link",
      "welcome-message",
      "custom-logo-colours",
      "notes-reminders",
      "reporting-dashboard",
      "users",
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
    cardFeatureIds: [
      "visits",
      "branded-domain",
      "custom-email-domain",
      "remove-branding",
      "dual-logo",
      "custom-billboard",
      "bulk-uploads",
      "customer-folders",
      "custom-statuses",
      "folder-visibility",
      "pay-button",
      "users",
      "new-doc-notifications",
      "second-password",
      "included-storage",
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
    cardFeatureIds: [
      "visits",
      "client-uploads",
      "two-way-notes",
      "scheduled-emails",
      "client-profile-toggle",
      "email-in-documents",
      "customer-folders",
      "included-storage",
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

const featureById = Object.fromEntries(
  pricingFeatures.map((feature) => [feature.id, feature]),
) as Record<string, PricingFeatureDefinition>;

export type PlanCardFeatureRow = {
  id: string;
  label: string;
  value?: string;
};

/** Features shown on a plan card, in defined order. */
export function getPlanCardFeatures(planId: PlanId): PlanCardFeatureRow[] {
  const plan = pricingPlans.find((item) => item.id === planId);
  if (!plan) return [];

  const rows: PlanCardFeatureRow[] = [];

  for (const featureId of plan.cardFeatureIds) {
    const feature = featureById[featureId];
    if (!feature) continue;

    if (feature.kind === "value") {
      const cell = feature.values[planId];
      if (!cell.card) continue;
      rows.push({
        id: feature.id,
        label: cell.card.label,
        value: cell.card.value,
      });
      continue;
    }

    if (feature.values[planId]) {
      rows.push({ id: feature.id, label: feature.name });
    }
  }

  return rows;
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
