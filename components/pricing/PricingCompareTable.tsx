"use client";

import { Check, Minus } from "lucide-react";
import {
  getComparisonFeatures,
  getFeatureCompareValue,
  pricingPage,
  pricingPlans,
} from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PricingCompareTable() {
  const features = getComparisonFeatures();
  const { compare } = pricingPage;

  return (
    <section className="hidden bg-surface md:block md:py-20 lg:py-24">
      <Container>
        <SectionHeader
          title={compare.headline}
          description={compare.description}
          align="left"
          className="max-w-2xl"
        />

        <div className="mt-10 overflow-x-auto rounded-card border border-muted/20 bg-background">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Feature comparison across Freemium, Premium and Advanced plans
            </caption>
            <thead>
              <tr className="border-b border-muted/20 bg-surface">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface px-4 py-4 text-sm font-semibold text-portal-navy sm:px-6"
                >
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className="px-4 py-4 text-center text-sm font-semibold text-portal-navy sm:px-6"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.id}
                  className={
                    index % 2 === 0 ? "bg-background" : "bg-surface/70"
                  }
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-inherit px-4 py-3.5 text-left text-sm font-medium text-portal-navy/80 sm:px-6"
                  >
                    {feature.name}
                  </th>
                  {pricingPlans.map((plan) => {
                    const cell = getFeatureCompareValue(feature, plan.id);

                    return (
                      <td
                        key={`${plan.id}-${feature.id}`}
                        className="px-4 py-3.5 text-center sm:px-6"
                      >
                        {cell.kind === "value" ? (
                          <span className="text-sm font-medium text-portal-navy">
                            {cell.text ?? "—"}
                          </span>
                        ) : cell.included ? (
                          <span className="inline-flex items-center justify-center text-portal-teal">
                            <Check
                              className="size-4"
                              strokeWidth={2.5}
                              aria-label="Included"
                            />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-muted">
                            <Minus
                              className="size-4"
                              strokeWidth={2}
                              aria-label="Not included"
                            />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
