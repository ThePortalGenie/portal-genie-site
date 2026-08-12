import { accountingIntegrations } from "@/content/integrations";

/** Supported Genie enquiry types routed to Zoho CRM. */
export const GENIE_ENQUIRY_TYPES = ["sales", "callback", "support"] as const;

export type GenieEnquiryType = (typeof GENIE_ENQUIRY_TYPES)[number];

/** Server-controlled Zoho Current_Campaign value for Genie website enquiries. */
export const GENIE_ZOHO_CURRENT_CAMPAIGN = "Portal Genie Website" as const;

/** Fallback Company when support enquiries omit company (Zoho Lead creation). */
export const GENIE_SUPPORT_COMPANY_FALLBACK =
  "Portal Genie Support Enquiry" as const;

export const GENIE_ENQUIRY_MAX_BODY_BYTES = 8_192;

/** Honeypot field name — must remain empty. */
export const GENIE_ENQUIRY_HONEYPOT_FIELD = "website" as const;

export const GENIE_ENQUIRY_FIELD_LIMITS = {
  firstName: 80,
  lastName: 80,
  company: 200,
  email: 254,
  phone: 30,
  accountingSoftware: 255,
  message: 2_000,
} as const;

/** Accounting software options aligned with site integrations content. */
export const GENIE_ACCOUNTING_SOFTWARE_OPTIONS = [
  ...accountingIntegrations.logos.map((logo) => logo.name),
  "Other",
] as const;

export type GenieAccountingSoftwareOption =
  (typeof GENIE_ACCOUNTING_SOFTWARE_OPTIONS)[number];

export const GENIE_ENQUIRY_SUCCESS_MESSAGES: Record<GenieEnquiryType, string> = {
  sales:
    "Thanks — we've received your enquiry. A member of the Portal Genie team will be in touch.",
  callback:
    "Thanks — we've received your callback request. A member of the Portal Genie team will be in touch.",
  support:
    "Thanks — we've received your support request. A member of the Portal Genie team will be in touch.",
};

export const GENIE_ENQUIRY_SUCCESS_HEADINGS: Record<GenieEnquiryType, string> = {
  sales: "Enquiry received",
  callback: "Callback requested",
  support: "Support request received",
};

export const GENIE_ENQUIRY_INTRO: Record<GenieEnquiryType, string> = {
  sales: "Share your details and our team will follow up about The Portal Genie.",
  callback:
    "Leave your details and we'll arrange a callback from the Portal Genie team.",
  support: "Tell us how we can help and our team will follow up.",
};

export const GENIE_ENQUIRY_ACTIONS: Array<{
  type: GenieEnquiryType;
  label: string;
}> = [
  { type: "sales", label: "Contact sales" },
  { type: "callback", label: "Request a callback" },
  { type: "support", label: "Support" },
];

/** Best-effort in-memory rate limit — not reliable across Vercel serverless instances. */
export const GENIE_ENQUIRY_RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
} as const;
