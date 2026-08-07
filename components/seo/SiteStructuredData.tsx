import {
  buildSiteStructuredDataGraph,
  serializeStructuredData,
} from "@/config/structured-data";

const siteStructuredDataGraph = buildSiteStructuredDataGraph();

/**
 * Site-wide Organization + WebSite + SoftwareApplication JSON-LD rendered
 * once from the root layout as a connected @graph.
 */
export function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeStructuredData(siteStructuredDataGraph),
      }}
    />
  );
}
