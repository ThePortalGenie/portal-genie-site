import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";
import { placeholderPages } from "@/content/placeholders";

const page = placeholderPages.youtube;

export const metadata: Metadata = noIndexPageMetadata({
  title: `${page.title} | ${site.title}`,
  description: page.description,
});

export default function YoutubePage() {
  return (
    <PlaceholderPage
      title={page.title}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
