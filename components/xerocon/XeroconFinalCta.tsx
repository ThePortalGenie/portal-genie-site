import { xeroconPage } from "@/content/xerocon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function XeroconFinalCta() {
  const { finalCta } = xeroconPage;

  return (
    <section className="bg-background py-12 sm:py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-card border border-portal-blue/20 bg-portal-blue/[0.05] px-5 py-8 text-center sm:px-8 sm:py-10">
          <h2 className="text-2xl font-semibold tracking-tight text-portal-navy sm:text-3xl">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-portal-navy/70 sm:text-base">
            {finalCta.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:justify-center">
            <ButtonLink
              href={finalCta.primaryCta.href}
              className="w-full sm:w-auto sm:min-w-[12rem]"
            >
              {finalCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={finalCta.secondaryCta.href}
              variant="secondary"
              className="w-full sm:w-auto sm:min-w-[12rem]"
            >
              {finalCta.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
