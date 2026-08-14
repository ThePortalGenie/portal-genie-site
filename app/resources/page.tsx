import type { Metadata } from "next";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { FeaturedResources } from "@/components/resources/FeaturedResources";
import { ResourcesCta } from "@/components/resources/ResourcesCta";
import { KnowledgeBaseSection } from "@/components/knowledge/KnowledgeBaseSection";
import { resourcesPage } from "@/content/resources";
import { indexablePageMetadata } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = indexablePageMetadata("/resources", {
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
      <FeaturedResources />
      <KnowledgeBaseSection />
      <ResourcesCta />
    </main>
  );
}
