"use client";

import Image from "next/image";
import {
  clientLogos,
  customerCountries,
  trustedByContent,
  type ClientLogo,
  type CustomerCountry,
  type TrustedByVariant,
} from "@/content/client-logos";
import { Container } from "@/components/ui/Container";
import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

type TrustedByLogosProps = {
  id: string;
  title: string;
  subtitle?: string;
  logos?: ClientLogo[];
  countries?: CustomerCountry[];
  showCountries?: boolean;
  variant?: TrustedByVariant;
  background?: "background" | "surface";
  className?: string;
};

const backgroundClasses = {
  background: "bg-background",
  surface: "bg-surface",
} as const;

const sectionPadding: Record<TrustedByVariant, string> = {
  default: "py-12 md:py-20 lg:py-[120px]",
  compact: "py-10 md:py-12 lg:py-14",
  hero: "pt-6 pb-[72px] md:pt-8 md:pb-24 lg:pt-10 lg:pb-[120px]",
  /** Compact homepage trust strip (~300–400px desktop) */
  strip: "py-10 md:py-14 lg:py-16",
};

const titleClasses: Record<TrustedByVariant, string> = {
  default: "text-[1.75rem] sm:text-3xl md:text-4xl",
  compact: "text-sm uppercase tracking-widest text-portal-navy/60",
  hero: "text-[1.75rem] sm:text-3xl md:text-4xl",
  strip:
    "text-xl font-semibold tracking-tight sm:text-2xl md:text-[2rem] lg:text-[2.125rem]",
};

const gridSpacing: Record<TrustedByVariant, string> = {
  default: "mt-8 md:mt-16 lg:mt-20",
  compact: "mt-8 md:mt-10",
  hero: "mt-8 md:mt-12 lg:mt-14",
  strip: "mt-6 md:mt-9",
};

const gridColumns: Record<TrustedByVariant, string> = {
  default:
    "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
  compact:
    "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
  hero: "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
  strip:
    "grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-6 lg:gap-5 xl:grid-cols-8 xl:gap-5",
};

const cardHeight: Record<TrustedByVariant, string> = {
  default: "h-24 md:h-28",
  compact: "h-20 md:h-24",
  hero: "h-[5.25rem] md:h-24",
  strip: "h-[80px] md:h-[96px]",
};

const cardPadding: Record<TrustedByVariant, string> = {
  default: "p-5",
  compact: "p-4",
  hero: "p-4",
  strip: "p-3",
};

const cardRadius: Record<TrustedByVariant, string> = {
  default: "rounded-card",
  compact: "rounded-card",
  hero: "rounded-card",
  strip: "rounded-2xl",
};

const logoSize: Record<TrustedByVariant, string> = {
  default: "max-h-12 max-w-full md:max-h-14",
  compact: "max-h-10 max-w-full md:max-h-12",
  hero: "max-h-[3.75rem] max-w-full md:max-h-[4.375rem]",
  strip: "max-h-12 max-w-[80%] md:max-h-[60px]",
};

const countriesSpacing: Record<TrustedByVariant, string> = {
  default: "mt-16 md:mt-20 lg:mt-24",
  compact: "mt-12 md:mt-14",
  hero: "mt-14 md:mt-16 lg:mt-20",
  strip: "mt-10 md:mt-12",
};

function CustomersIn({
  id,
  countries,
  customersInHeading,
  reveal,
}: {
  id: string;
  countries: CustomerCountry[];
  customersInHeading: string;
  reveal: boolean;
}) {
  const countriesHeadingId = `${id}-customers-in-heading`;

  return (
    <div
      className={[
        "mx-auto max-w-4xl transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        reveal ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
      style={{ transitionDelay: "240ms" }}
    >
      <h3
        id={countriesHeadingId}
        className="text-center text-sm font-medium tracking-wide text-portal-navy/60"
      >
        {customersInHeading}
      </h3>
      <ul
        aria-labelledby={countriesHeadingId}
        className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-6 md:gap-x-8"
      >
        {countries.map((country) => (
          <li
            key={country.name}
            className="inline-flex items-center gap-2 text-sm text-portal-navy/75"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {country.flag}
            </span>
            <span>{country.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LogoCard({
  logo,
  cardBackground,
  cardHeightClass,
  cardPaddingClass,
  cardRadiusClass,
  logoSizeClass,
  reveal,
  revealDelay,
}: {
  logo: ClientLogo;
  cardBackground: string;
  cardHeightClass: string;
  cardPaddingClass: string;
  cardRadiusClass: string;
  logoSizeClass: string;
  reveal: boolean;
  revealDelay: number;
}) {
  return (
    <li
      className={[
        "w-full transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        reveal ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      ].join(" ")}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      <div
        className={`group flex w-full items-center justify-center border border-muted/20 shadow-[0_2px_8px_-4px_rgba(17,33,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-muted/35 hover:shadow-[0_8px_24px_-8px_rgba(17,33,54,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${cardBackground} ${cardHeightClass} ${cardPaddingClass} ${cardRadiusClass}`.trim()}
      >
        <Image
          src={logo.image}
          alt={logo.alt}
          width={180}
          height={72}
          loading="lazy"
          className={`h-auto w-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${logoSizeClass}`.trim()}
        />
      </div>
    </li>
  );
}

export function TrustedByLogos({
  id,
  title,
  subtitle,
  logos = clientLogos,
  countries = customerCountries,
  showCountries = true,
  variant = "default",
  background = "surface",
  className = "",
}: TrustedByLogosProps) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const headingId = `${id}-heading`;
  const cardBackground =
    background === "surface" ? "bg-background" : "bg-surface";

  return (
    <section
      className={`${backgroundClasses[background]} ${sectionPadding[variant]} ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <Container>
        <div
          className={[
            "mx-auto max-w-3xl text-center transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          <h2
            id={headingId}
            className={`font-semibold tracking-tight text-portal-navy ${titleClasses[variant]}`.trim()}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div ref={ref}>
          <ul
            className={`grid ${gridColumns[variant]} ${gridSpacing[variant]}`.trim()}
          >
            {logos.map((logo, index) => (
              <LogoCard
                key={`${logo.name}-${logo.image}`}
                logo={logo}
                cardBackground={cardBackground}
                cardHeightClass={cardHeight[variant]}
                cardPaddingClass={cardPadding[variant]}
                cardRadiusClass={cardRadius[variant]}
                logoSizeClass={logoSize[variant]}
                reveal={isVisible}
                revealDelay={index * SCROLL_REVEAL_STAGGER_MS}
              />
            ))}
          </ul>

          {showCountries ? (
            <div className={countriesSpacing[variant]}>
              <CustomersIn
                id={id}
                countries={countries}
                customersInHeading={trustedByContent.customersInHeading}
                reveal={isVisible}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
