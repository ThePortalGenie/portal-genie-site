import { featuresPage } from "@/content/features";
import { pricingPage } from "@/content/pricing";
import { footerContent } from "@/content/footer";
import {
  ORGANIZATION_LOGO_URL,
  PRODUCTION_SITE_URL,
  seo,
} from "@/config/seo";

/** Stable @id URLs for the site-wide structured data entity graph. */
export const STRUCTURED_DATA_IDS = {
  organization: `${PRODUCTION_SITE_URL}/#organization`,
  website: `${PRODUCTION_SITE_URL}/#website`,
  software: `${PRODUCTION_SITE_URL}/#software`,
} as const;

export const ORGANIZATION_DESCRIPTION =
  "The Portal Genie provides customer portal software for businesses using Xero, QuickBooks and Sage Business Cloud, bringing documents, communication, payments and customer self-service together in a branded experience." as const;

export const SOFTWARE_APPLICATION_DESCRIPTION =
  "The Portal Genie is a customer experience and client portal platform for businesses using Xero, QuickBooks and Sage Business Cloud, providing secure access to documents, communication, payments and self-service in one branded portal." as const;

export const SOFTWARE_APPLICATION_IMAGE = `${PRODUCTION_SITE_URL}/images/product/marketing/platform-overview-dashboard.png`;

const linkedInSocial = footerContent.columns.connect.social.find(
  (profile) => profile.icon === "linkedin",
);

/** Official LinkedIn company profile — sourced from the existing footer. */
export const ORGANIZATION_SAME_AS = linkedInSocial
  ? ([linkedInSocial.href] as const)
  : ([] as const);

export function getSoftwareApplicationFeatureList(): string[] {
  return featuresPage.sections.map((section) => section.title);
}

/** Site-wide Organization, WebSite and SoftwareApplication connected @graph. */
export function buildSiteStructuredDataGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": STRUCTURED_DATA_IDS.organization,
        name: seo.siteName,
        url: PRODUCTION_SITE_URL,
        logo: ORGANIZATION_LOGO_URL,
        description: ORGANIZATION_DESCRIPTION,
        sameAs: [...ORGANIZATION_SAME_AS],
      },
      {
        "@type": "WebSite",
        "@id": STRUCTURED_DATA_IDS.website,
        name: seo.siteName,
        url: PRODUCTION_SITE_URL,
        publisher: { "@id": STRUCTURED_DATA_IDS.organization },
        about: { "@id": STRUCTURED_DATA_IDS.software },
      },
      {
        "@type": "SoftwareApplication",
        "@id": STRUCTURED_DATA_IDS.software,
        name: seo.siteName,
        url: PRODUCTION_SITE_URL,
        description: SOFTWARE_APPLICATION_DESCRIPTION,
        applicationCategory: "BusinessApplication",
        publisher: { "@id": STRUCTURED_DATA_IDS.organization },
        featureList: getSoftwareApplicationFeatureList(),
        image: SOFTWARE_APPLICATION_IMAGE,
      },
    ],
  };
}

/** FAQPage JSON-LD for /pricing — mapped from content/pricing.ts. */
export function buildPricingFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingPage.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Safely serialises JSON-LD for embedding in a script element. */
export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
