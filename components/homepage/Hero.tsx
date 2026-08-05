import { Check } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroIllustration } from "@/components/homepage/HeroIllustration";
import { AccountingIntegrationLogos } from "@/components/shared/AccountingIntegrationLogos";

export function Hero() {
  const { hero } = homepage;

  return (
    <section className="relative overflow-hidden bg-background pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-10 lg:pb-14">
      <Container>
        <div className="grid items-start lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="relative z-10 mx-auto w-full max-w-[42rem] text-center md:mx-0 md:max-w-none md:text-left">
            <AccountingIntegrationLogos
              size="compact"
              className="mb-3.5 justify-center md:mb-5 md:justify-start"
            />

            <p className="text-sm font-medium tracking-wide text-portal-blue">
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 text-balance text-[1.875rem] font-semibold leading-[1.12] tracking-tight text-portal-navy sm:mt-7 sm:text-[2.75rem] sm:leading-[1.1] md:mt-8 lg:text-5xl lg:leading-[1.08]">
              {hero.headline}
            </h1>

            <div className="mx-auto mt-5 max-w-xl space-y-2.5 text-base leading-7 text-portal-navy/75 sm:mt-6 sm:text-lg md:mx-0 md:max-w-none lg:mt-7 lg:leading-relaxed">
              {hero.supportingCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mx-auto mt-5 flex w-fit max-w-full flex-col items-start gap-1.5 text-left sm:mt-6 sm:gap-2 md:mx-0 lg:mt-7">
              {hero.valueStatements.map((statement) => (
                <li
                  key={statement}
                  className="flex items-start gap-2.5 text-sm leading-snug text-portal-navy/70 sm:items-center"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-portal-teal sm:mt-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-center md:items-start md:justify-start lg:mt-7">
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

          <div className="hidden lg:block lg:min-h-0 lg:w-full" aria-hidden="true">
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
