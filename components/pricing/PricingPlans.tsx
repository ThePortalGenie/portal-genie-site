"use client";

import { useState } from "react";
import {
  pricingPage,
  pricingPlans,
  type CurrencyCode,
} from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { CurrencySelector } from "@/components/pricing/CurrencySelector";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingTrustBar } from "@/components/pricing/PricingTrustBar";

export function PricingPlans() {
  const [currency, setCurrency] = useState<CurrencyCode>(
    pricingPage.currency.default,
  );

  return (
    <section
      className="bg-background pb-14 pt-1 md:pb-16 md:pt-2 lg:pb-20 lg:pt-2"
      aria-label="Pricing plans"
    >
      <Container>
        <CurrencySelector value={currency} onChange={setCurrency} />

        <div className="mt-5 md:mt-6">
          <PricingTrustBar />
        </div>

        <div className="mt-6 grid gap-5 md:mt-7 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-6">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} currency={currency} />
          ))}
        </div>
      </Container>
    </section>
  );
}
