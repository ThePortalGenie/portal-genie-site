import Image from "next/image";
import { xeroconPage } from "@/content/xerocon";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function XeroconHero() {
  const { hero, xero } = xeroconPage;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-portal-blue/[0.07] via-background to-background pb-10 pt-8 sm:pb-14 sm:pt-10 md:pb-16 md:pt-12">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-badge bg-portal-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-portal-blue">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 whitespace-pre-line text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-4xl md:text-[2.75rem]">
            {hero.headline}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-portal-navy/70 sm:mt-5 sm:text-base">
            {hero.description}
          </p>

          <div className="mx-auto mt-5 inline-flex flex-col items-center rounded-card border border-portal-blue/20 bg-surface px-5 py-3 shadow-[0_12px_32px_-16px_rgba(0,119,190,0.25)] sm:mt-6 sm:px-7 sm:py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-blue">
              {hero.offerLabel}
            </p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight text-portal-navy sm:text-xl">
              {hero.offerTitle}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-portal-navy/65 sm:text-sm">
              {hero.offerDetail}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mx-auto sm:mt-7 sm:max-w-md sm:flex-row sm:justify-center">
            <TrackedButtonLink
              href={hero.primaryCta.href}
              className="w-full sm:w-auto sm:min-w-[12rem]"
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
              className="w-full sm:w-auto sm:min-w-[12rem]"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-col items-center gap-2 sm:mt-8">
            <Image
              src={xero.badgeSrc}
              alt={xero.badgeAlt}
              width={xero.badgeWidth}
              height={xero.badgeHeight}
              className="h-auto w-[140px] sm:w-[160px]"
              priority
            />
            <p className="text-xs text-portal-navy/50">{xero.caption}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
