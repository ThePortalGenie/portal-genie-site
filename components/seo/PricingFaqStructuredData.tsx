import {
  buildPricingFaqStructuredData,
  serializeStructuredData,
} from "@/config/structured-data";

const pricingFaqStructuredData = buildPricingFaqStructuredData();

/** FAQPage JSON-LD for /pricing — sourced from content/pricing.ts. */
export function PricingFaqStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeStructuredData(pricingFaqStructuredData),
      }}
    />
  );
}
