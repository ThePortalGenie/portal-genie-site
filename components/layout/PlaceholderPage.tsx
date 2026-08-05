import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

type PlaceholderPageProps = {
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
};

export function PlaceholderPage({
  title,
  description,
  primaryCta,
}: PlaceholderPageProps) {
  return (
    <main className="py-12 md:py-20 lg:py-[120px]">
      <Container>
        <div className="max-w-prose">
          <h1 className="text-3xl font-semibold tracking-tight text-portal-navy md:text-4xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
            {description}
          </p>
          {primaryCta ? (
            <ButtonLink
              href={primaryCta.href}
              variant="primary"
              className="mt-10 w-full sm:w-auto"
            >
              {primaryCta.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
