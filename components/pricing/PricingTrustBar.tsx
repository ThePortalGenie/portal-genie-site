import { Check, Star } from "lucide-react";
import { customerSuccessPage } from "@/content/customer-success";

export function PricingTrustBar() {
  const { commonThemes } = customerSuccessPage;

  return (
    <aside
      className="rounded-card border border-muted/20 bg-surface px-4 py-3 shadow-[0_4px_16px_-8px_rgba(17,33,54,0.08)] md:px-6 md:py-5 lg:py-5"
      aria-labelledby="pricing-trust-heading"
    >
      <h2
        id="pricing-trust-heading"
        className="flex items-center justify-center gap-2 text-sm font-semibold tracking-tight text-portal-navy lg:justify-start"
      >
        <Star
          className="size-4 shrink-0 fill-portal-blue text-portal-blue"
          aria-hidden="true"
        />
        {commonThemes.headline}
      </h2>

      <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:mt-4 md:gap-4 xl:grid-cols-4 xl:gap-5">
        {commonThemes.items.map((item) => (
          <li key={item.title} className="flex items-start gap-2">
            <Check
              className="mt-0.5 size-4 shrink-0 text-portal-teal"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-portal-navy">
                {item.title}
              </p>
              <p className="mt-1 hidden text-xs leading-snug text-portal-navy/65 md:block sm:text-[13px] sm:leading-snug">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
