import { xeroconPage } from "@/content/xerocon";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { XeroconHeader } from "@/components/xerocon/XeroconHeader";
import { Container } from "@/components/ui/Container";

export function XeroconActivate() {
  const { activate } = xeroconPage;

  return (
    <div className="flex min-h-full flex-col bg-background">
      <XeroconHeader />

      <main className="flex flex-1 items-center py-10 sm:py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="inline-flex items-center rounded-badge bg-portal-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
              {activate.eyebrow}
            </p>

            <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-4xl">
              {activate.headline}
            </h1>

            <h2 className="mt-3 text-lg font-semibold text-portal-navy sm:mt-4 sm:text-xl">
              {activate.subheadline}
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-portal-navy/70 sm:mt-5 sm:text-base">
              {activate.emailReminder}
            </p>

            <div className="mx-auto mt-6 inline-flex w-full max-w-md flex-col items-center rounded-card border border-portal-blue/20 bg-surface px-5 py-4 shadow-[0_12px_32px_-16px_rgba(0,119,190,0.25)] sm:mt-8 sm:px-7 sm:py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-blue">
                {activate.offer.heading}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-portal-navy sm:text-2xl">
                {activate.offer.freeTrial}
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-portal-navy sm:text-xl">
                {activate.offer.discount}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-portal-navy/65 sm:text-sm">
                {activate.offer.discountNote}
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <TrackedButtonLink
                href={activate.primaryCta.href}
                className="w-full sm:mx-auto sm:w-auto sm:min-w-[16rem]"
                track={{
                  type: "trial_start",
                  ctaLocation: "xerocon_activate",
                  linkUrl: activate.primaryCta.href,
                }}
              >
                {activate.primaryCta.label}
              </TrackedButtonLink>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
