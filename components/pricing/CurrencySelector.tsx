"use client";

import type { CurrencyCode } from "@/content/pricing";
import { pricingCurrencies } from "@/content/pricing";
import { trackPricingCurrencyChange } from "@/lib/analytics/track";

type CurrencySelectorProps = {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
};

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="flex justify-center lg:justify-start">
      <div
        role="group"
        aria-label="Select currency"
        className="inline-flex flex-wrap justify-center gap-0.5 rounded-button border border-muted/25 bg-surface p-1 shadow-[0_2px_8px_-4px_rgba(17,33,54,0.08)] sm:gap-1"
      >
        {pricingCurrencies.map((currency) => {
          const isActive = value === currency.code;

          return (
            <button
              key={currency.code}
              type="button"
              onClick={() => {
                if (currency.code === value) {
                  return;
                }

                trackPricingCurrencyChange(currency.code);
                onChange(currency.code);
              }}
              aria-pressed={isActive}
              className={[
                "min-w-[2.75rem] rounded-[0.6rem] px-2.5 py-2 text-sm font-medium transition-colors duration-200 sm:min-w-[3.25rem] sm:px-3.5",
                isActive
                  ? "bg-portal-blue text-white"
                  : "text-portal-navy/70 hover:bg-background hover:text-portal-navy",
              ].join(" ")}
            >
              {currency.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
