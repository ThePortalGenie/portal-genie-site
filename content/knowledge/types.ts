import { links } from "@/config/links";

/** Categories reusable by the future Resources hub and Genie retrieval. */
export const KNOWLEDGE_CATEGORIES = [
  "getting-started",
  "customer-portal",
  "documents",
  "communication",
  "integrations",
  "payments",
  "branding",
  "notifications",
  "security",
  "plans",
  "analytics",
  "xero",
  "quickbooks",
  "sage",
  "faq",
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

/** Internal site paths knowledge may reference — mirrors config/links.ts values. */
export const RELATED_PAGE_PATHS = [
  links.home,
  links.features,
  links.pricing,
  links.pricingPlans,
  links.bookDemo,
  links.contact,
  links.whyThePortalGenie,
  links.customerSuccess,
] as const;

export type RelatedPagePath = (typeof RELATED_PAGE_PATHS)[number];

export type KnowledgeArticleMetadata = {
  id: string;
  /** URL path segment(s) beneath /resources — never includes a /resources prefix. */
  slug: string;
  title: string;
  description: string;
  category: KnowledgeCategory;
  summary: string;
  keywords: readonly string[];
  /** IDs of other knowledge articles in the registry. */
  relatedArticles: readonly string[];
  relatedPages: readonly RelatedPagePath[];
  public: boolean;
  botEnabled: boolean;
  /** SEO indexing gate — separate from public visibility during staging. */
  indexable: boolean;
  /** ISO date YYYY-MM-DD */
  lastReviewed: string;
  /** ISO date YYYY-MM-DD */
  updatedAt: string;
};

export type KnowledgeArticle = KnowledgeArticleMetadata & {
  /** Raw Markdown body — rendering is handled in a later phase. */
  markdown: string;
};
