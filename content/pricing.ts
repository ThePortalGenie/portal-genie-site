import { links } from "@/config/links";
import { buttons } from "@/content/buttons";

export type CurrencyCode = "ZAR" | "USD" | "GBP" | "EUR" | "AED";

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
  /** Users included in the base monthly subscription */
  includedUsers: number;
  /** Base monthly subscription price, by currency */
  prices: PlanPrices;
  /** Price per additional user per month, by currency */
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
  { code: "AED", label: "AED", symbol: "AED " },
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
  "Remove The Portal Genie branding",
  "Use your own portal web address",
  "Send emails from your own domain",
  "Let clients upload documents for you to receive",
  "Your clients can create and respond to document notes",
  "Schedule email campaigns",
  "Email documents directly into the portal",
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
      premium: { compare: "—" },
      advanced: { compare: "3,000" },
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

export type ComparisonFeatureSectionId =
  | "core-portal-features"
  | "included-with-your-plan"
  | "advanced-communication-security";

export type ComparisonFeatureSection = {
  id: ComparisonFeatureSectionId;
  title: string;
  featureIds: string[];
};

/** Logical groupings for the comparison table — order preserved */
export const pricingComparisonSections: ComparisonFeatureSection[] = [
  {
    id: "core-portal-features",
    title: "Core Portal Features",
    featureIds: [
      "customise-client-portal",
      "accounting-integration",
      "pay-invoices",
      "upload-documents",
      "logo-brand-colours",
      "display-space",
      "internal-notes",
      "document-statuses",
      "portal-genie-logo",
    ],
  },
  {
    id: "included-with-your-plan",
    title: "Included With Your Plan",
    featureIds: ["users", "included-storage", "included-emails"],
  },
  {
    id: "advanced-communication-security",
    title: "Advanced Communication & Security",
    featureIds: [
      "email-into-portal",
      "schedule-campaigns",
      "group-clients-email-campaigns",
      "reply-to-emails",
      "extra-password-protection",
      "email-domain",
      "portal-web-address",
      "document-notes",
      "client-uploads",
      "remove-branding",
    ],
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
      ZAR: 575,
      USD: 35,
      GBP: 26,
      EUR: 30,
      AED: 129,
    },
    extraUserPrices: {
      ZAR: 80,
      USD: 5,
      GBP: 4,
      EUR: 4.5,
      AED: 18,
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
      ZAR: 650,
      USD: 40,
      GBP: 30,
      EUR: 35,
      AED: 147,
    },
    extraUserPrices: {
      ZAR: 80,
      USD: 5,
      GBP: 4,
      EUR: 4.5,
      AED: 18,
    },
    cta: {
      label: buttons.start30DaysFree,
      href: links.advancedStartFree,
    },
    cardFeatures: [...advancedCardFeatures],
  },
];

/** Included storage and email allowances per plan */
export type PlanAllowances = {
  storageIncludedGb: number;
  /** Monthly email allowance; null when email campaigns are not included */
  emailAllowancePerMonth: number | null;
};

export const planAllowances: Record<PlanId, PlanAllowances> = {
  premium: {
    storageIncludedGb: 2,
    emailAllowancePerMonth: null,
  },
  advanced: {
    storageIncludedGb: 10,
    emailAllowancePerMonth: 2000,
  },
};

/** Add-on pricing — edit fixed amounts per currency (no live conversion) */
export const pricingAddOns = {
  storagePerGb: {
    ZAR: 5,
    USD: 0.3,
    GBP: 0.25,
    EUR: 0.3,
    AED: 1.1,
  } satisfies PlanPrices,
  storage1TbBundle: {
    ZAR: 374,
    USD: 22,
    GBP: 16,
    EUR: 19,
    AED: 81,
  } satisfies PlanPrices,
  emailBundlePrice: {
    ZAR: 35,
    USD: 2,
    GBP: 1.5,
    EUR: 2,
    AED: 7,
  } satisfies PlanPrices,
  emailBundleSize: 1000,
};

export const pricingExtras = {
  title: "Storage, Email & User Extras",
  description: "Add more storage, email credits or users as your business grows.",
  extraColumnLabel: "Extra",
  priceColumnLabel: "Price",
  storage: {
    name: "Storage",
    description: "Secure document storage",
  },
  storage1TbBundle: {
    name: "1 TB Storage Bundle",
    description: "1 TB of secure document storage",
  },
  email: {
    name: "Email Campaigns",
    description: "Scheduled client email campaigns",
  },
  users: {
    name: "Users",
    description: "Add additional team members",
  },
  storagePriceSuffix: "per GB",
  storage1TbBundlePriceSuffix: "/ month",
  emailPriceSuffix: (bundleSize: number) =>
    `per ${bundleSize.toLocaleString("en-US")} emails / month`,
  usersPriceSuffix: "per user / month",
  infoLine:
    "Add-ons are billed monthly and can be added as your business grows.",
} as const;

/** @deprecated Prefer pricingExtras — kept for any remaining helper callers */
export const storageEmailAllowances = {
  title: pricingExtras.title,
  description: pricingExtras.description,
  featureColumnLabel: "Feature",
  storageHeading: pricingExtras.storage.name,
  storageDescription: pricingExtras.storage.description,
  emailHeading: pricingExtras.email.name,
  emailDescription: pricingExtras.email.description,
  addOnsRowLabel: "Add-ons",
  addOnsDescription: "Expand your storage or email capacity",
  additionalStorageLabel: "Additional Storage",
  additionalEmailsLabel: "Additional Emails",
  additionalStoragePeriod: "per GB per month",
  premiumNotIncluded: "Not included",
  premiumEmailNote: "Available with Advanced",
  storageIncludedSuffix: "included",
  emailIncludedSuffix: "emails included per month",
  emailBundleAdditionalSuffix: "additional emails",
  infoLine: pricingExtras.infoLine,
} as const;

export const pricingPage = {
  metadata: {
    title: "Pricing",
    description:
      "Compare Premium and Advanced client portal software plans from The Portal Genie, with monthly pricing in ZAR, USD, GBP, EUR and AED and a 30-day free trial.",
    openGraph: {
      title: "Client Portal Software Pricing | The Portal Genie",
      description:
        "Compare Premium and Advanced client portal software plans from The Portal Genie, with monthly pricing in ZAR, USD, GBP, EUR and AED and a 30-day free trial.",
    },
  },
  hero: {
    headline: "Simple pricing that grows with your business.",
    description:
      "Compare our Premium and Advanced client portal software plans and start with a 30-day free trial.",
    illustration: {
      src: "/images/assets/images/why-portal-genie-hero-three.png",
      description:
        "The Portal Genie blue magic streak flowing horizontally through the Pricing hero.",
      width: 1536,
      height: 677,
    },
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
    relatedLink: {
      label: "See all features",
      href: links.features,
    },
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
      href: links.pricingPlans,
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

export function getComparisonFeatureSections(): Array<{
  id: ComparisonFeatureSectionId;
  title: string;
  features: PricingFeatureDefinition[];
}> {
  const featureById = new Map(
    pricingFeatures.map((feature) => [feature.id, feature]),
  );

  return pricingComparisonSections.map((section) => ({
    id: section.id,
    title: section.title,
    features: section.featureIds
      .map((id) => featureById.get(id))
      .filter((feature): feature is PricingFeatureDefinition => feature != null),
  }));
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

/** Formats add-on prices, preserving decimals where needed (e.g. $0.30, £2.50) */
export function formatAddOnCurrencyAmount(
  amount: number | null,
  currency: CurrencyCode,
): string | null {
  if (amount === null) {
    return null;
  }

  const symbol =
    pricingCurrencies.find((item) => item.code === currency)?.symbol ?? "";

  const formatted = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2);

  return `${symbol}${formatted}`;
}

export function formatStorageIncludedLabel(gb: number): string {
  return `${gb} GB ${storageEmailAllowances.storageIncludedSuffix}`;
}

export function formatEmailAllowanceLabel(count: number): string {
  return `${count.toLocaleString("en-US")} ${storageEmailAllowances.emailIncludedSuffix}`;
}

export function getAdditionalStorageCopy(currency: CurrencyCode): string | null {
  const amount = formatAddOnCurrencyAmount(
    pricingAddOns.storagePerGb[currency],
    currency,
  );

  if (!amount) {
    return null;
  }

  return `${amount} ${pricingExtras.storagePriceSuffix}`;
}

/** 1 TB storage bundle — uses the active pricing-page currency */
export function getStorage1TbBundleCopy(
  currency: CurrencyCode,
): string | null {
  const amount = formatAddOnCurrencyAmount(
    pricingAddOns.storage1TbBundle[currency],
    currency,
  );

  if (!amount) {
    return null;
  }

  return `${amount} ${pricingExtras.storage1TbBundlePriceSuffix}`;
}

export function getEmailBundleAddOnCopy(currency: CurrencyCode): string | null {
  const price = formatAddOnCurrencyAmount(
    pricingAddOns.emailBundlePrice[currency],
    currency,
  );

  const bundleSize = pricingAddOns.emailBundleSize;

  if (!price || bundleSize == null) {
    return null;
  }

  return `${price} ${pricingExtras.emailPriceSuffix(bundleSize)}`;
}

/** Shared additional-user rate across plans (same within each currency) */
export function getAdditionalUserPrice(
  currency: CurrencyCode,
): number | null {
  const rates = pricingPlans.map((plan) => plan.extraUserPrices[currency]);
  const first = rates[0] ?? null;

  if (first === null) {
    return null;
  }

  const allMatch = rates.every((rate) => rate === first);
  return allMatch ? first : first;
}

export function getAdditionalUserCopy(currency: CurrencyCode): string | null {
  const amount = formatAddOnCurrencyAmount(
    getAdditionalUserPrice(currency),
    currency,
  );

  if (!amount) {
    return null;
  }

  return `${amount} ${pricingExtras.usersPriceSuffix}`;
}

export function getPlanCapacityLines(planId: PlanId): string[] {
  const plan = pricingPlans.find((item) => item.id === planId);
  const allowances = planAllowances[planId];

  if (!plan || !allowances) {
    return [];
  }

  const lines: string[] = [
    `${allowances.storageIncludedGb} GB storage`,
  ];

  if (allowances.emailAllowancePerMonth != null) {
    lines.push(
      `${allowances.emailAllowancePerMonth.toLocaleString("en-US")} emails per month`,
    );
  }

  lines.push(
    plan.includedUsers === 1 ? "1 user" : `${plan.includedUsers} users`,
  );

  return lines;
}

export function getPlanBasePrice(
  plan: PricingPlan,
  currency: CurrencyCode,
): number | null {
  return plan.prices[currency];
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

  const extraUserAmount = formatAddOnCurrencyAmount(
    plan.extraUserPrices[currency],
    currency,
  );

  return {
    includedUsers,
    additionalUsers: extraUserAmount
      ? `Additional users ${extraUserAmount}/month each`
      : null,
  };
}

/**
 * Total monthly price for a given number of users.
 * Base subscription covers includedUsers; additional users are billed separately.
 */
export function getPlanMonthlyTotal(
  plan: PricingPlan,
  currency: CurrencyCode,
  userCount: number,
): number | null {
  const basePrice = getPlanBasePrice(plan, currency);

  if (basePrice === null || userCount < 1) {
    return null;
  }

  if (userCount <= plan.includedUsers) {
    return basePrice;
  }

  const extraUserPrice = plan.extraUserPrices[currency];

  if (extraUserPrice === null) {
    return null;
  }

  return basePrice + (userCount - plan.includedUsers) * extraUserPrice;
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
