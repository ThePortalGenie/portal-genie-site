import { pricingPage } from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { PricingHeroIllustration } from "@/components/pricing/PricingHeroIllustration";

/**
 * Pricing page hero. GenieFlow replaced by a Pricing-specific downward streak
 * (same asset as Features, different composition). Height/padding unchanged.
 */
export function PricingHero() {
  const { hero } = pricingPage;

  return (
    <section className="relative overflow-hidden bg-background pt-3 pb-1 md:pt-6 md:pb-4 lg:pt-8 lg:pb-4">
      {/* Desktop/tablet: streak bleeds below hero edge — faded before pricing content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-14 z-0 hidden md:block lg:-bottom-20"
      >
        <PricingHeroIllustration variant="desktop" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-3xl md:text-4xl lg:text-[2.5rem]">
            {hero.headline}
          </h1>
          <p className="mt-2.5 hidden text-base leading-relaxed text-portal-navy/75 md:block sm:text-lg">
            {hero.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
