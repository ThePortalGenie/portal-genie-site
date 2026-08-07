import type { Metadata } from "next";
import { LegalDocumentViewer } from "@/components/legal/LegalDocumentViewer";
import { legalPages } from "@/content/legal";
import { indexablePageMetadata } from "@/config/seo";

const { privacyPolicy } = legalPages;

export const metadata: Metadata = indexablePageMetadata("/privacy-policy", {
  title: "Privacy Policy | The Portal Genie",
  description: privacyPolicy.metadata.description,
  openGraph: {
    title: privacyPolicy.metadata.openGraph.title,
    description: privacyPolicy.metadata.openGraph.description,
  },
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalDocumentViewer
        title={privacyPolicy.title}
        description={privacyPolicy.description}
        pdfPath={privacyPolicy.pdfPath}
        downloadLabel={privacyPolicy.downloadLabel}
        fallbackMessage={privacyPolicy.fallbackMessage}
      />
    </main>
  );
}
