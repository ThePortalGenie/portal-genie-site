export const links = {
  home: "/",
  whyThePortalGenie: "/why-the-portal-genie",
  platform: "/platform",
  features: "/features",
  pricing: "/pricing",
  resources: "/resources",
  customerSuccess: "/customer-success",
  contact: "/contact",
  documentation: "/documentation",
  productUpdates: "/product-updates",
  faq: "/faq",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  youtube: "/youtube",
  bookDemo: "/book-a-demo",
  /** Permanent campaign URL — encoded in printed QR codes. Do not rename. */
  xerocon: "/xerocon",
  login: "https://app.theportalgenie.com/app/login",
  startFree:
    "https://app.theportalgenie.com/register?registerPage=true&packageId=STANDARD_CUSTOMER_PORTAL",
  /**
   * Package-specific registration URLs for paid trials.
   * Replace with confirmed packageId query params when available.
   * Do not invent package IDs.
   */
  premiumStartFree: "https://app.theportalgenie.com/app/register?registerPage=true&packageId=PRO_CUSTOMER_PORTAL",
  advancedStartFree:
    "https://app.theportalgenie.com/app/register?registerPage=true&packageId=ADVANCED_CUSTOMER_PORTAL",
  support: "/contact",
} as const;