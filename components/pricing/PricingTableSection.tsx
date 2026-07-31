import { ElfsightPricingTable } from "@/components/pricing/ElfsightPricingTable";
import { Container } from "@/components/ui/Container";

export function PricingTableSection() {
  return (
    <section className="bg-background py-[72px] md:py-24 lg:py-[120px]" aria-label="Pricing plans">
      <Container className="max-w-7xl">
        <ElfsightPricingTable />
      </Container>
    </section>
  );
}
