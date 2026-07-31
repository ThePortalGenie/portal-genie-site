import type { Metadata } from "next";
import { LegalDocumentViewer } from "@/components/legal/LegalDocumentViewer";
import { legalPages } from "@/content/legal";
import { site } from "@/config/site";

const { privacyPolicy } = legalPages;

export const metadata: Metadata = {
  title: `${privacyPolicy.metadata.title} | ${site.title}`,
  description: privacyPolicy.metadata.description,
  openGraph: {
    title: privacyPolicy.metadata.openGraph.title,
    description: privacyPolicy.metadata.openGraph.description,
  },
};

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
