"use client";

import { Clock } from "lucide-react";
import { pricingPromotion } from "@/content/pricing";

const primaryButtonClasses =
  "inline-flex h-11 items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90";

export function PricingPromotionBanner() {
  if (!pricingPromotion.enabled) {
    return null;
  }

  const targetId = pricingPromotion.targetId;

  function scrollToPlans() {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <aside
      className="rounded-card border border-portal-blue/15 bg-portal-blue/[0.06] px-5 py-5 shadow-[0_4px_16px_-8px_rgba(17,33,54,0.08)] md:px-6 md:py-6"
      aria-labelledby="pricing-promotion-heading"
    >
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
        <div className="min-w-0 max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-badge bg-portal-blue/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-portal-blue">
            <Clock className="size-3 shrink-0" aria-hidden="true" strokeWidth={2.5} />
            {pricingPromotion.label}
          </p>

          <h2
            id="pricing-promotion-heading"
            className="mt-2.5 text-lg font-semibold tracking-tight text-portal-navy md:text-xl"
          >
            {pricingPromotion.heading}
          </h2>

          <p className="mt-1.5 text-sm leading-snug text-portal-navy/70 md:hidden">
            {pricingPromotion.mobileDescription}
          </p>
          <p className="mt-1.5 hidden text-sm leading-snug text-portal-navy/70 md:block md:max-w-xl">
            {pricingPromotion.description}
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToPlans}
          className={`${primaryButtonClasses} w-full shrink-0 sm:w-auto`}
        >
          {pricingPromotion.ctaLabel}
        </button>
      </div>
    </aside>
  );
}
