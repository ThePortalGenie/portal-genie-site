export {
  AnalyticsEvent,
  type AnalyticsCurrency,
  type AnalyticsEventName,
  type BookDemoClickEvent,
  type BookingWidgetLoadedEvent,
  type ContactSalesClickEvent,
  type CtaLocation,
  type DataLayerEvent,
  type EmailContactClickEvent,
  type LoginClickEvent,
  type OutboundDestination,
  type PlanName,
  type PlanSelectEvent,
  type PricingCurrencyChangeEvent,
  type TrialCtaClickEvent,
  type TrialCtaDestination,
  type TrialStartClickEvent,
} from "@/lib/analytics/events";
export {
  captureAttributionFromUrl,
  decorateAppUrl,
  getAttributionParams,
  isAppPortalUrl,
  parseUtmParamsFromSearch,
  sanitizeUtmValue,
} from "@/lib/analytics/attribution";
export {
  applyStoredConsentFromCookie,
  CONSENT_COOKIE,
  pushConsentDefaults,
  pushConsentUpdate,
  readConsentCookie,
  writeConsentCookie,
  type ConsentAnalyticsChoice,
  type StoredConsent,
} from "@/lib/analytics/consent";
export { getCurrentPagePath } from "@/lib/analytics/page-path";
export { pushDataLayerEvent } from "@/lib/analytics/push-event";
export {
  trackBookDemoClick,
  trackBookingWidgetLoaded,
  trackContactSalesClick,
  trackEmailContactClick,
  trackLoginClick,
  trackPlanSelect,
  trackPricingCurrencyChange,
  trackTrialCtaClick,
  trackTrialStartClick,
  trialCtaDestinationFromHref,
} from "@/lib/analytics/track";
