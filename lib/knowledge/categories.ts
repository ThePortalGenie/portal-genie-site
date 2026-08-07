import type { KnowledgeCategory } from "@/content/knowledge/types";

/** Human-readable category labels for breadcrumbs and article UI. */
export const KNOWLEDGE_CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  "getting-started": "Getting Started",
  "customer-portal": "Customer Portal",
  documents: "Documents",
  payments: "Payments",
  communication: "Communication",
  branding: "Branding & Personalisation",
  xero: "Xero",
  quickbooks: "QuickBooks",
  sage: "Sage Business Cloud",
};

export function getCategoryDisplayName(category: KnowledgeCategory): string {
  return KNOWLEDGE_CATEGORY_LABELS[category];
}
