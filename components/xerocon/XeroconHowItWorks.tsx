import { xeroconPage } from "@/content/xerocon";
import { Container } from "@/components/ui/Container";

export function XeroconHowItWorks() {
  const { howItWorks } = xeroconPage;

  return (
    <section
      className="bg-background py-12 sm:py-16 md:py-20"
      aria-labelledby="xerocon-how-heading"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-portal-blue">
            {howItWorks.eyebrow}
          </p>
          <h2
            id="xerocon-how-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-portal-navy sm:text-3xl"
          >
            {howItWorks.headline}
          </h2>
        </div>

        <ol className="mx-auto mt-8 grid max-w-4xl gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {howItWorks.steps.map((step) => (
            <li
              key={step.step}
              className="relative rounded-card border border-muted/15 bg-surface px-4 py-5 text-center sm:px-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-portal-blue text-sm font-semibold text-white">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-semibold text-portal-navy">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-portal-navy/65">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
