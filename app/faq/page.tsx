import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { placeholderPages } from "@/content/placeholders";

export default function FaqPage() {
  const page = placeholderPages.faq;

  return (
    <PlaceholderPage
      title={page.title}
      description={page.description}
      primaryCta={page.primaryCta}
    />
  );
}
