import Image from "next/image";
import { Check } from "lucide-react";
import { homepage } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroIllustration } from "@/components/homepage/HeroIllustration";

export function Hero() {
  const { hero } = homepage;
  const { xeroConnectedBadge } = hero;

  return (
    <section className="relative overflow-hidden bg-background pt-0 pb-12 md:pt-4 md:pb-24 lg:pt-6 lg:pb-[120px]">
      <Container>
        <div className="grid items-center lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative z-10 max-w-xl">
            <Image
              src={xeroConnectedBadge.src}
              alt={xeroConnectedBadge.alt}
              width={xeroConnectedBadge.width}
              height={xeroConnectedBadge.height}
              priority
              className="mb-5 h-auto w-[105px] sm:w-[122px] lg:w-[140px]"
            />

            <p className="text-sm font-medium tracking-wide text-portal-blue">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-portal-navy sm:text-[2.75rem] sm:leading-tight lg:text-5xl">
              {hero.headline}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-7 text-portal-navy/75 sm:text-lg lg:leading-relaxed">
              {hero.supportingCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 flex flex-col gap-3 sm:gap-2.5">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
