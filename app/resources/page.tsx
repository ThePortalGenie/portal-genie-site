import type { Metadata } from "next";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { ResourceCategories } from "@/components/resources/ResourceCategories";
import { FeaturedResources } from "@/components/resources/FeaturedResources";
import { LatestProductUpdates } from "@/components/resources/LatestProductUpdates";
import { DocumentationPreview } from "@/components/resources/DocumentationPreview";
import { ResourcesNewsletter } from "@/components/resources/ResourcesNewsletter";
import { ResourcesCta } from "@/components/resources/ResourcesCta";
import { resourcesPage } from "@/content/resources";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = noIndexPageMetadata({
  title: `${resourcesPage.metadata.title} | ${site.title}`,
  description: resourcesPage.metadata.description,
  openGraph: {
    title: resourcesPage.metadata.openGraph.title,
    description: resourcesPage.metadata.openGraph.description,
  },
});

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <ResourceCategories />
      <FeaturedResources />
      <LatestProductUpdates />
      <DocumentationPreview />
      <ResourcesNewsletter />
      <ResourcesCta />
    </main>
  );
}
