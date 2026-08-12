import type {
  AnalyticsCurrency,
  CtaLocation,
  PlanName,
  TrialCtaDestination,
} from "@/lib/analytics/events";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { getCurrentPagePath } from "@/lib/analytics/page-path";
import { pushDataLayerEvent } from "@/lib/analytics/push-event";

type BookDemoParams = {
  ctaLocation: CtaLocation;
  linkUrl: string;
};

export function trackBookDemoClick({ ctaLocation, linkUrl }: BookDemoParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.bookDemoClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    link_url: linkUrl,
  });
}

type TrialCtaParams = {
  ctaLocation: CtaLocation;
  destination: TrialCtaDestination;
};

export function trackTrialCtaClick({ ctaLocation, destination }: TrialCtaParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.trialCtaClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    destination,
  });
}

type TrialStartParams = {
  ctaLocation: CtaLocation;
  linkUrl: string;
  planName?: PlanName;
  currency?: AnalyticsCurrency;
};

export function trackTrialStartClick({
  ctaLocation,
  linkUrl,
  planName,
  currency,
}: TrialStartParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.trialStartClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    destination: "app_register",
    link_url: linkUrl,
    plan_name: planName,
    currency,
  });
}

type PlanSelectParams = {
  planName: PlanName;
  currency: AnalyticsCurrency;
};

export function trackPlanSelect({ planName, currency }: PlanSelectParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.planSelect,
    cta_location: "pricing_card",
    page_path: "/pricing",
    plan_name: planName,
    currency,
  });
}

type ContactSalesParams = {
  ctaLocation: CtaLocation;
  linkUrl: string;
};

export function trackContactSalesClick({
  ctaLocation,
  linkUrl,
}: ContactSalesParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.contactSalesClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    link_url: linkUrl,
  });
}

type LoginClickParams = {
  ctaLocation: CtaLocation;
  linkUrl: string;
};

export function trackLoginClick({ ctaLocation, linkUrl }: LoginClickParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.loginClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    destination: "app_login",
    link_url: linkUrl,
  });
}

export function trackPricingCurrencyChange(currency: AnalyticsCurrency) {
  pushDataLayerEvent({
    event: AnalyticsEvent.pricingCurrencyChange,
    page_path: "/pricing",
    currency,
  });
}

type EmailContactParams = {
  ctaLocation: CtaLocation;
  emailDomain: "theportalgenie.com";
  destination?: "sales@theportalgenie.com";
};

export function trackEmailContactClick({
  ctaLocation,
  emailDomain,
  destination,
}: EmailContactParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.emailContactClick,
    cta_location: ctaLocation,
    page_path: getCurrentPagePath(),
    email_domain: emailDomain,
    ...(destination ? { destination } : {}),
  });
}

export function trackBookingWidgetLoaded() {
  pushDataLayerEvent({
    event: AnalyticsEvent.bookingWidgetLoaded,
    page_path: getCurrentPagePath(),
  });
}

type GenieEnquirySubmitParams = {
  enquiryType: "sales" | "callback" | "support";
  outcome: "success" | "error";
  errorCode?: string;
};

export function trackGenieEnquirySubmit({
  enquiryType,
  outcome,
  errorCode,
}: GenieEnquirySubmitParams) {
  pushDataLayerEvent({
    event: AnalyticsEvent.genieEnquirySubmit,
    cta_location: "genie_panel",
    page_path: getCurrentPagePath(),
    enquiry_type: enquiryType,
    outcome,
    ...(errorCode ? { error_code: errorCode } : {}),
  });
}

/** Map internal pricing hrefs to trial_cta destination values. */
export function trialCtaDestinationFromHref(href: string): TrialCtaDestination {
  if (href.includes("#")) {
    return "pricing_plans";
  }

  return "pricing";
}
