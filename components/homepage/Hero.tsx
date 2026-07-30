import { Check } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  const { hero } = homepage;

  return (
    <section className="bg-background pt-8 pb-[72px] md:pt-12 md:pb-24 lg:pt-16 lg:pb-[120px]">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-portal-blue">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
              {hero.headline}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {hero.supportingCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 flex flex-col gap-2.5 sm:gap-2">
              {hero.valueStatements.map((statement) => (
                <li
                  key={statement}
                  className="flex items-center gap-2.5 text-sm text-portal-navy/70"
                >
                  <Check
                    className="size-4 shrink-0 text-portal-teal"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>

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

          <div className="flex w-full justify-center lg:justify-end lg:pt-9">
            <div className="w-full max-w-[650px]">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
