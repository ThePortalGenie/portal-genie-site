import { homepage } from "@/content/homepage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BeyondTransactionFlow } from "@/components/homepage/BeyondTransactionFlow";

export function BeyondTransaction() {
  const { headline, description } = homepage.beyondTransaction;

  return (
    <Section background="surface">
      <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeader
          align="left"
          title={headline}
          description={description}
          className="lg:sticky lg:top-28"
        />

        <BeyondTransactionFlow />
      </div>
    </Section>
  );
}
