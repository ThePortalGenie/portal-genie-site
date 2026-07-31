import { clientLogos, trustedByContent, type ClientLogo } from "@/content/client-logos";
import { ClientLogoItem } from "@/components/trusted-by/ClientLogoItem";
import { Container } from "@/components/ui/Container";

type TrustedByBackground = "background" | "surface" | "none";

type TrustedByProps = {
  title?: string;
  logos?: ClientLogo[];
  variant?: "default" | "compact";
  background?: TrustedByBackground;
  className?: string;
};

const backgroundClasses: Record<Exclude<TrustedByBackground, "none">, string> = {
  background: "bg-background",
  surface: "bg-surface",
};

export function TrustedBy({
  title = trustedByContent.title,
  logos = clientLogos,
  variant = "default",
  background = "surface",
  className = "",
}: TrustedByProps) {
  const isCompact = variant === "compact";
  const sectionPadding = isCompact
    ? "py-10 md:py-12 lg:py-14"
    : "py-[72px] md:py-24 lg:py-[120px]";
  const backgroundClass =
    background === "none" ? "" : backgroundClasses[background];

  return (
    <section
      className={`${backgroundClass} ${sectionPadding} ${className}`.trim()}
      aria-labelledby="trusted-by-heading"
    >
      <Container>
        <h2
          id="trusted-by-heading"
          className={`text-center font-semibold tracking-tight text-portal-navy ${
            isCompact
              ? "text-sm uppercase tracking-widest text-portal-navy/60"
              : "text-3xl sm:text-4xl"
          }`.trim()}
        >
          {title}
        </h2>

        <ul
          className={`grid grid-cols-2 place-items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${
            isCompact ? "mt-8 md:mt-10" : "mt-12 md:mt-16 lg:mt-20"
          }`.trim()}
        >
          {logos.map((logo) => (
            <ClientLogoItem
              key={`${logo.name}-${logo.image}`}
              logo={logo}
              compact={isCompact}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
