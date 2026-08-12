import Image from "next/image";
import { xeroconPage } from "@/content/xerocon";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function XeroconHero() {
  const { hero, xero } = xeroconPage;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-portal-blue/[0.07] via-background to-background pb-8 pt-5 sm:pb-10 sm:pt-6 md:pb-11 md:pt-7 lg:pb-12 lg:pt-8">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-badge bg-portal-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
            {hero.eyebrow}
          </p>

          <h1 className="mt-3 whitespace-pre-line text-balance text-[1.625rem] font-semibold leading-[1.18] tracking-tight text-portal-navy sm:mt-3.5 sm:text-4xl sm:leading-[1.15] md:text-[2.75rem]">
            {hero.headline}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-portal-navy/70 sm:mt-4 sm:text-base">
            {hero.description}
          </p>

          <div className="mx-auto mt-4 flex w-full max-w-md flex-col items-center rounded-card border border-portal-blue/20 bg-surface px-4 py-3 shadow-[0_12px_32px_-16px_rgba(0,119,190,0.25)] sm:mt-5 sm:px-6 sm:py-3.5 md:px-7 md:py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-blue">
              {hero.offerLabel}
            </p>
            <p className="mt-1 text-balance text-base font-semibold leading-snug tracking-tight text-portal-navy sm:mt-0.5 sm:text-lg md:text-xl">
              {hero.offerTitle}
            </p>
            <p className="mt-2 text-pretty text-xs leading-relaxed text-portal-navy/65 sm:text-sm">
              {hero.offerDetail}
            </p>
          </div>

          <div className="mt-5 flex w-full flex-col gap-2.5 md:mx-auto md:mt-6 md:max-w-lg md:flex-row md:justify-center md:gap-3">
            <TrackedButtonLink
              href={hero.primaryCta.href}
              className="w-full md:w-auto md:min-w-[12rem]"
              track={{
                type: "trial_start",
                ctaLocation: "xerocon_hero",
                linkUrl: hero.primaryCta.href,
              }}
            >
              {hero.primaryCta.label}
            </TrackedButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              className="w-full md:w-auto md:min-w-[12rem]"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="mt-5 flex flex-col items-center gap-1.5 sm:mt-6 md:mt-7">
            <Image
              src={xero.badgeSrc}
              alt={xero.badgeAlt}
              width={xero.badgeWidth}
              height={xero.badgeHeight}
              className="h-auto w-[118px] max-w-[42vw] sm:w-[132px] md:w-[150px] md:max-w-none"
              priority
            />
            <p className="text-[11px] text-portal-navy/50 sm:text-xs">{xero.caption}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
