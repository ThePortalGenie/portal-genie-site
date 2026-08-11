import Link from "next/link";
import { Check } from "lucide-react";
import { xeroconCampaign } from "@/config/xerocon";
import { xeroconPage } from "@/content/xerocon";
import { XeroconClaimCta } from "@/components/xerocon/XeroconClaimCta";
import { Container } from "@/components/ui/Container";

function formatUsdAmount(amount: number | null): string | null {
  if (amount === null) {
    return null;
  }

  const formatted = Number.isInteger(amount)
    ? String(amount)
    : amount.toFixed(2);

  return `$${formatted}`;
}

type XeroconPlan =
  | (typeof xeroconCampaign.pricing)["premium"]
  | (typeof xeroconCampaign.pricing)["advanced"];

function planNameFromXeroconPlan(plan: XeroconPlan): "premium" | "advanced" {
  return plan.name === "Pro" ? "advanced" : "premium";
}

function PlanCard({ plan }: { plan: XeroconPlan }) {
  const { pricing } = xeroconPage;
  const price = formatUsdAmount(plan.monthlyPrice);
  const additional = formatUsdAmount(plan.additionalUserPrice);

  return (
    <article className="flex h-full flex-col rounded-card border border-portal-blue/25 bg-surface p-5 shadow-[0_16px_40px_-16px_rgba(0,119,190,0.2)] ring-1 ring-portal-blue/10 sm:p-6">
      <h3 className="text-xl font-semibold tracking-tight text-portal-navy">
        {plan.name}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-portal-navy/65">
        {plan.description}
      </p>

      <div className="mt-4">
        {price ? (
          <>
            <p className="break-words text-[2rem] font-semibold tracking-tight text-portal-navy sm:text-4xl">
              {price}
            </p>
            <p className="mt-0.5 text-sm text-portal-navy/55">{pricing.perMonth}</p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold tracking-tight text-portal-navy">
              {pricing.pricePendingLabel}
            </p>
            <p className="mt-1 text-sm text-portal-navy/55">
              {pricing.pricePendingNote}
            </p>
          </>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="flex items-center gap-2 text-sm font-medium text-portal-navy">
          <Check
            className="size-4 shrink-0 text-portal-teal"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          {pricing.includedUsersLabel(plan.includedUsers)}
        </p>
        {additional ? (
          <p className="pl-6 text-xs text-portal-navy/55">
            {pricing.additionalUsersLabel(additional)}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <XeroconClaimCta
          href={pricing.claimCta.href}
          label={pricing.claimCta.label}
          planName={planNameFromXeroconPlan(plan)}
          className="w-full"
        />
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-muted/15 pt-5">
        {plan.features.map((feature) => (
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

export function XeroconPricing() {
  const { pricing } = xeroconPage;
  const { premium, advanced, currencyNote } = xeroconCampaign.pricing;

  return (
    <section
      id={pricing.id}
      className="scroll-mt-20 bg-surface py-12 sm:py-16 md:py-20"
      aria-labelledby="xerocon-pricing-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-portal-blue">
            {pricing.eyebrow}
          </p>
          <h2
            id="xerocon-pricing-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-portal-navy sm:text-3xl md:text-4xl"
          >
            {pricing.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-portal-navy/70 sm:text-base">
            {pricing.description}
          </p>
          <p className="mt-2 text-xs text-portal-navy/45">{currencyNote}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 md:grid-cols-2 md:gap-6">
          <PlanCard plan={premium} />
          <PlanCard plan={advanced} />
        </div>

        <p className="mt-6 text-center">
          <Link
            href={pricing.compareLink.href}
            className="text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
          >
            {pricing.compareLink.label}
          </Link>
        </p>
      </Container>
    </section>
  );
}
