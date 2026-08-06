import { whyPage } from "@/content/why";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { WhyHeroIllustration } from "@/components/why/WhyHeroIllustration";

/**
 * Why The Portal Genie page hero only.
 *
 * Composition: text is the foreground content layer; the blue streak is a
 * large decorative background layer on the right (absolute on md+), not a
 * second content column. GenieFlow is omitted so this artwork is the only
 * streak treatment.
 */
export function WhyHero() {
  const { hero } = whyPage;

  return (
    <section className="relative overflow-hidden bg-background pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-10 lg:pb-12">
      {/*
        Desktop/tablet: streak as an independent right-side background layer.
        Anchored to the right so the strongest blue stays away from the copy;
        clipped by the section's overflow-hidden.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[58%] md:block lg:w-[68%] xl:w-[66%]"
      >
        <WhyHeroIllustration variant="desktop" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto w-full max-w-xl text-center md:mx-0 md:max-w-[min(100%,28rem)] md:text-left lg:max-w-[30rem]">
          <h1 className="text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
            {hero.headline}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg md:mx-0">
            {hero.description}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center md:justify-start lg:mt-10">
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
