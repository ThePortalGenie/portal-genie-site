import { featuresPage } from "@/content/features";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function FeaturesHero() {
  const { hero } = featuresPage;

  return (
    <section className="bg-background pt-8 pb-[72px] md:pt-12 md:pb-24 lg:pt-16 lg:pb-[120px]">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
            {hero.headline}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
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
