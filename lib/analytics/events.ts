/**
 * dataLayer event names for GTM → GA4 mapping (configured in GTM, not here).
 */
export const AnalyticsEvent = {
  bookDemoClick: "book_demo_click",
  trialCtaClick: "trial_cta_click",
  trialStartClick: "trial_start_click",
  contactSalesClick: "contact_sales_click",
  planSelect: "plan_select",
  loginClick: "login_click",
  pricingCurrencyChange: "pricing_currency_change",
  emailContactClick: "email_contact_click",
  bookingWidgetLoaded: "booking_widget_loaded",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/** Allowed plan identifiers — no free-text user input. */
export type PlanName = "premium" | "advanced";

/** Pricing page currency codes — mirrors content/pricing.ts. */
export type AnalyticsCurrency = "ZAR" | "USD" | "GBP" | "EUR" | "AED";

export type TrialCtaDestination = "pricing" | "pricing_plans";

export type OutboundDestination = "app_register" | "app_login";

/** Where a CTA appeared. */
export type CtaLocation =
  | "header"
  | "header_mobile"
  | "hero"
  | "section_final"
  | "pricing_card"
  | "pricing_final"
  | "footer"
  | "promotion_banner"
  | "customer_success_final"
  | "why_final"
  | "features_final_cta"
  | "xerocon_hero"
  | "xerocon_final"
  | "platform"
  | "contact_page";

type BaseDataLayerFields = {
  event: AnalyticsEventName;
  page_path?: string;
  cta_location?: CtaLocation;
};

export type BookDemoClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.bookDemoClick;
  link_url?: string;
};

export type TrialCtaClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.trialCtaClick;
  destination: TrialCtaDestination;
};

export type TrialStartClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.trialStartClick;
  plan_name?: PlanName;
  currency?: AnalyticsCurrency;
  destination: OutboundDestination;
  link_url?: string;
};

export type ContactSalesClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.contactSalesClick;
  link_url?: string;
};

export type PlanSelectEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.planSelect;
  plan_name: PlanName;
  currency?: AnalyticsCurrency;
};

export type LoginClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.loginClick;
  destination: "app_login";
  link_url?: string;
};

export type PricingCurrencyChangeEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.pricingCurrencyChange;
  currency: AnalyticsCurrency;
};

export type EmailContactClickEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.emailContactClick;
  email_domain: "theportalgenie.com" | "theportalgenie.com.au";
  destination?: "sales@theportalgenie.com";
};

export type BookingWidgetLoadedEvent = BaseDataLayerFields & {
  event: typeof AnalyticsEvent.bookingWidgetLoaded;
};

export type DataLayerEvent =
  | BookDemoClickEvent
  | TrialCtaClickEvent
  | TrialStartClickEvent
  | ContactSalesClickEvent
  | PlanSelectEvent
  | LoginClickEvent
  | PricingCurrencyChangeEvent
  | EmailContactClickEvent
  | BookingWidgetLoadedEvent;
