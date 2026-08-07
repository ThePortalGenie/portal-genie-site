import { demoPage } from "@/content/demo";
import { TrackedEmailLink } from "@/components/analytics/TrackedEmailLink";
import { Container } from "@/components/ui/Container";

export function DemoAlternativeContact() {
  const { alternativeContact } = demoPage;

  return (
    <section className="border-t border-muted/15 bg-background pb-10 pt-8 md:pb-12 md:pt-10">
      <Container className="max-w-4xl">
        <p className="text-center text-sm text-portal-navy/60">
          {alternativeContact.prompt}{" "}
          <TrackedEmailLink
            href={`mailto:${alternativeContact.email}`}
            emailDomain="theportalgenie.com.au"
            ctaLocation="section_final"
            className="font-medium text-portal-navy/75 transition-colors duration-200 hover:text-portal-blue"
          >
            {alternativeContact.email}
          </TrackedEmailLink>
        </p>
      </Container>
    </section>
  );
}
