import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { placeholderPages } from "@/content/placeholders";

export default function ProductUpdatesPage() {
  const page = placeholderPages.productUpdates;

  return (
    <PlaceholderPage
      title={page.title}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
