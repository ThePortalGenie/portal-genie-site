import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { placeholderPages } from "@/content/placeholders";

export default function YoutubePage() {
  const page = placeholderPages.youtube;

  return (
    <PlaceholderPage
      title={page.title}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
