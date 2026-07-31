import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { placeholderPages } from "@/content/placeholders";

export default function DocumentationPage() {
  const page = placeholderPages.documentation;

  return (
    <PlaceholderPage
      title={page.title}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
