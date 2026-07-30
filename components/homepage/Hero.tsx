import Link from "next/link";
import { hero } from "@/content/homepage";
import { Container } from "@/components/ui/Container";
import { HeroIllustration } from "./HeroIllustration";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-portal-teal"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
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
                  <CheckIcon />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex h-11 w-full items-center justify-center rounded-button bg-portal-blue px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-portal-blue/90 sm:w-auto"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex h-11 w-full items-center justify-center rounded-button border border-muted/40 bg-surface px-6 text-sm font-medium text-portal-navy transition-colors duration-200 hover:border-muted/70 hover:bg-background sm:w-auto"
              >
                {hero.secondaryCta.label}
              </Link>
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
