import { pricingPage } from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";

export function PricingHero() {
  const { hero } = pricingPage;

  return (
    <section className="relative overflow-hidden bg-background pt-5 pb-3 md:pt-6 md:pb-4 lg:pt-8 lg:pb-4">
      <GenieFlow variant="soft" className="opacity-60" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-4xl lg:text-[2.5rem]">
            {hero.headline}
          </h1>
          <p className="mt-2.5 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {hero.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
