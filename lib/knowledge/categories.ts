import type { KnowledgeCategory } from "@/content/knowledge/types";

/** Human-readable category labels for breadcrumbs and article UI. */
export const KNOWLEDGE_CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  "getting-started": "Getting Started",
  "customer-portal": "Client Portal",
  documents: "Documents",
  communication: "Communication",
  integrations: "Accounting Integrations",
  payments: "Payments",
  branding: "Branding & Domains",
  notifications: "Notifications",
  security: "Security & Access",
  plans: "Plans",
  analytics: "Analytics",
  xero: "Xero",
  quickbooks: "QuickBooks Online",
  sage: "Sage Business Cloud",
  faq: "FAQ",
};

export function getCategoryDisplayName(category: KnowledgeCategory): string {
  return KNOWLEDGE_CATEGORY_LABELS[category];
}
