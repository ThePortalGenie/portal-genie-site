import type { Metadata } from "next";
import { ContactSalesSection } from "@/components/contact/ContactSalesSection";
import { noIndexPageMetadata } from "@/config/seo";
import { site } from "@/config/site";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = noIndexPageMetadata({
  title: `${contactPage.metadata.title} | ${site.title}`,
  description: contactPage.metadata.description,
});

export default function ContactPage() {
  return (
    <main>
      <ContactSalesSection />
    </main>
  );
}
