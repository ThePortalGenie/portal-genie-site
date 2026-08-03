import Image from "next/image";
import { Check } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroIllustration } from "@/components/homepage/HeroIllustration";

export function Hero() {
  const { hero } = homepage;
  const { integrations } = hero;
  const secondaryNames = integrations.secondary.map((item) => item.name);
  const secondaryWithLogos = integrations.secondary.filter(
    (item): item is typeof item & { src: string } => Boolean(item.src),
  );

  return (
    <section className="relative overflow-hidden bg-background pt-0 pb-12 md:pt-4 md:pb-24 lg:pt-6 lg:pb-[120px]">
      <Container>
        <div className="grid items-center lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative z-10 mx-auto w-full max-w-xl text-center md:mx-0 md:text-left">
            <div className="mb-5 flex flex-col items-center md:items-start">
              <Image
                src={integrations.primary.src}
                alt={integrations.primary.alt}
                width={integrations.primary.width}
                height={integrations.primary.height}
                priority
                className="h-auto w-[105px] sm:w-[122px] lg:w-[140px]"
              />

              <p className="mt-3 max-w-sm text-xs leading-snug text-portal-navy/55 sm:text-sm md:max-w-none">
                <span className="font-medium text-portal-navy/65">
                  {integrations.secondaryLabel}
                </span>{" "}
                {secondaryNames.join(" and ")}
              </p>

              {secondaryWithLogos.length > 0 ? (
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
                  {secondaryWithLogos.map((item) => (
                    <Image
                      key={item.name}
                      src={item.src}
                      alt={item.alt}
                      width={120}
                      height={40}
                      className="h-6 w-auto object-contain opacity-80 sm:h-7"
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <p className="text-sm font-medium tracking-wide text-portal-blue">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
              {hero.headline}
            </h1>

            <div className="mx-auto mt-6 max-w-md space-y-4 text-base leading-7 text-portal-navy/75 sm:text-lg md:mx-0 md:max-w-none lg:leading-relaxed">
              {hero.supportingCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mx-auto mt-8 flex w-fit max-w-full flex-col items-start gap-3 text-left sm:gap-2.5 md:mx-0">
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

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
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

          <div className="hidden lg:flex lg:min-h-[480px] lg:w-full lg:justify-center">
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
