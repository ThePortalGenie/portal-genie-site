import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { placeholderPages } from "@/content/placeholders";
import { site } from "@/config/site";

const page = placeholderPages.startFree;

export const metadata: Metadata = {
  title: `${page.title} | ${site.title}`,
  description: page.description,
};

export default function StartFreePage() {
  return (
    <PlaceholderPage
      title={page.title}
      subtitle={page.subtitle}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
