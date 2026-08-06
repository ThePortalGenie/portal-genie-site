import { featuresPage } from "@/content/features";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { FeaturesHeroIllustration } from "@/components/features/FeaturesHeroIllustration";

/**
 * Features page hero. Copy/CTAs/height preserved; GenieFlow replaced by a
 * Features-specific diagonal streak (not the Why hero composition).
 */
export function FeaturesHero() {
  const { hero } = featuresPage;

  return (
    <section className="relative overflow-hidden bg-background pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14">
      {/* Desktop/tablet: absolute diagonal streak — clipped before feature nav */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      >
        <FeaturesHeroIllustration variant="desktop" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <h1 className="text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
            {hero.headline}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-portal-navy/75 sm:mt-5 sm:text-lg lg:mx-0">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center lg:mt-7 lg:justify-start">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
