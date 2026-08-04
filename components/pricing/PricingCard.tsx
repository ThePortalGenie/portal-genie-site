import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  formatPlanPrice,
  getPlanCardFeatures,
  pricingPage,
  type CurrencyCode,
  type PricingPlan,
} from "@/content/pricing";

type PricingCardProps = {
  plan: PricingPlan;
  currency: CurrencyCode;
};

export function PricingCard({ plan, currency }: PricingCardProps) {
  const features = getPlanCardFeatures(plan.id);
  const price = formatPlanPrice(plan.prices[currency], currency);

  return (
    <article className="flex h-full flex-col rounded-card border border-portal-blue/35 bg-surface p-6 shadow-[0_16px_40px_-16px_rgba(0,119,190,0.28)] ring-1 ring-portal-blue/15 lg:p-7">
      <div className="min-h-[5.5rem]">
        <h3 className="text-xl font-semibold tracking-tight text-portal-navy">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-portal-navy/70">
          {plan.description}
        </p>
      </div>

      <div className="mt-5 min-h-[4.75rem] border-t border-muted/15 pt-5">
        <p
          className={[
            "font-semibold tracking-tight text-portal-navy",
            price.unavailable ? "text-2xl" : "text-4xl sm:text-[2.5rem]",
          ].join(" ")}
        >
          {price.primary}
        </p>
        {price.period ? (
          <p className="mt-1 text-sm text-portal-navy/60">{price.period}</p>
        ) : (
          <p className="mt-1 text-sm text-transparent select-none" aria-hidden="true">
            &nbsp;
          </p>
        )}
      </div>

      <div className="mt-5">
        <ButtonLink href={plan.cta.href} variant="primary" className="w-full">
          {plan.cta.label}
        </ButtonLink>
      </div>

      {pricingPage.currency.pricesIncludeVat ? (
        <p className="mt-3 text-center text-xs text-portal-navy/50">
          {pricingPage.currency.vatNote}
        </p>
      ) : null}

      <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-muted/15 pt-6">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm leading-snug text-portal-navy/75"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-portal-teal"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
