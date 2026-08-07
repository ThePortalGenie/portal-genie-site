import type { Metadata } from "next";
import { ContactSalesSection } from "@/components/contact/ContactSalesSection";
import { indexablePageMetadata } from "@/config/seo";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = indexablePageMetadata("/contact", {
  title: "Contact The Portal Genie | The Portal Genie",
  description: contactPage.metadata.description,
  openGraph: {
    title: contactPage.metadata.openGraph.title,
    description: contactPage.metadata.openGraph.description,
  },
});

export default function ContactPage() {
  return (
    <main>
      <ContactSalesSection />
    </main>
  );
}
