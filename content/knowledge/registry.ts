import type { KnowledgeArticleMetadata } from "./types";
import { links } from "@/config/links";
import { validateKnowledgeRegistry } from "@/lib/knowledge/validate";

/**
 * Central registry of knowledge article metadata.
 * Markdown bodies live in content/knowledge/articles/{slug}.md
 */
export const knowledgeArticles: readonly KnowledgeArticleMetadata[] = [
  {
    id: "what-is-the-portal-genie",
    slug: "getting-started/what-is-the-portal-genie",
    title: "What is The Portal Genie?",
    description:
      "Learn what The Portal Genie is and how it helps businesses deliver a connected customer experience alongside their accounting software.",
    category: "getting-started",
    summary:
      "The Portal Genie is customer portal software that brings documents, communication, payments and self-service together in one branded experience — working alongside Xero, QuickBooks and Sage Business Cloud.",
    keywords: [
      "portal genie",
      "client portal",
      "customer experience",
      "accounting software",
    ],
    relatedArticles: [
      "what-customers-can-access",
      "30-day-free-trial",
    ],
    relatedPages: [links.features, links.whyThePortalGenie, links.pricing],
    public: true,
    botEnabled: true,
    indexable: false,
    lastReviewed: "2026-08-07",
    updatedAt: "2026-08-07",
  },
  {
    id: "what-customers-can-access",
    slug: "customer-portal/what-customers-can-access",
    title: "What can customers access through The Portal Genie?",
    description:
      "An overview of the secure, branded customer portal experience — including documents, communication, payments and self-service.",
    category: "customer-portal",
    summary:
      "Customers use a branded online portal to access documents, communicate with your business, make payments and complete self-service tasks in one secure destination.",
    keywords: [
      "customer portal",
      "self-service",
      "documents",
      "online payments",
      "secure messaging",
    ],
    relatedArticles: ["what-is-the-portal-genie", "30-day-free-trial"],
    relatedPages: [links.features, links.pricing, links.bookDemo],
    public: true,
    botEnabled: true,
    indexable: false,
    lastReviewed: "2026-08-07",
    updatedAt: "2026-08-07",
  },
  {
    id: "30-day-free-trial",
    slug: "getting-started/30-day-free-trial",
    title: "How does the 30-day free trial work?",
    description:
      "Understand how to start a 30-day free trial on Core or Pro plans and where to compare plan options.",
    category: "getting-started",
    summary:
      "Core and Pro both include a 30-day free trial so you can explore the platform before subscribing. Compare plans and start from the Pricing page.",
    keywords: ["free trial", "pricing", "core", "pro", "getting started"],
    relatedArticles: ["what-is-the-portal-genie", "what-customers-can-access"],
    relatedPages: [
      links.pricing,
      links.pricingPlans,
      links.bookDemo,
      links.contact,
    ],
    public: true,
    botEnabled: true,
    indexable: false,
    lastReviewed: "2026-08-07",
    updatedAt: "2026-08-07",
  },
] as const;

validateKnowledgeRegistry(knowledgeArticles);
