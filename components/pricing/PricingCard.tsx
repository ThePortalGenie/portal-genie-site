import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  formatPlanPrice,
  getPlanBasePrice,
  getPlanCapacityLines,
  getPlanCardFeatures,
  pricingPage,
  type CurrencyCode,
  type PricingPlan,
} from "@/content/pricing";

type PricingCardProps = {
  plan: PricingPlan;
  currency: CurrencyCode;
};

const featureRowBackground = (index: number) =>
  index % 2 === 0 ? "bg-background" : "bg-surface";

export function PricingCard({ plan, currency }: PricingCardProps) {
  const features = getPlanCardFeatures(plan.id);
  const price = formatPlanPrice(getPlanBasePrice(plan, currency), currency);
  const capacityLines = getPlanCapacityLines(plan.id);

  return (
    <article className="flex h-full flex-col rounded-card border border-portal-blue/35 bg-surface p-6 shadow-[0_16px_40px_-16px_rgba(0,119,190,0.28)] ring-1 ring-portal-blue/15 lg:p-7">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-portal-navy">
          {plan.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-portal-navy/70">
          {plan.description}
        </p>
      </div>

      <div className="mt-4">
        <p
          className={[
            "font-semibold tracking-tight text-portal-navy",
            price.unavailable ? "text-2xl" : "text-4xl sm:text-[2.5rem]",
          ].join(" ")}
        >
          {price.primary}
        </p>
        {price.period ? (
          <p className="mt-0.5 text-sm text-portal-navy/60">{price.period}</p>
        ) : null}
      </div>

      <div className="mt-4">
        <ButtonLink href={plan.cta.href} variant="primary" className="w-full">
          {plan.cta.label}
        </ButtonLink>
      </div>

      {pricingPage.currency.pricesIncludeVat ? (
        <p className="mt-2 text-center text-xs text-portal-navy/50">
          {pricingPage.currency.vatNote}
        </p>
      ) : null}

      <ul className="-mx-1 mt-4 flex flex-1 flex-col border-t border-muted/15 pt-3">
        {features.map((feature, index) => (
          <li
            key={feature}
            className={[
              "flex items-start gap-2.5 px-3 py-2.5 text-sm leading-snug text-portal-navy/75",
              featureRowBackground(index),
            ].join(" ")}
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-portal-teal"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">{feature}</span>
          </li>
        ))}
      </ul>

      {capacityLines.length > 0 ? (
        <div className="-mx-1 mt-3 border-t border-muted/15 pt-3">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
            Includes
          </p>
          <ul className="mt-2 flex flex-col gap-2 px-3">
            {capacityLines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm leading-snug text-portal-navy/80"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-portal-teal"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
