import { links } from "@/config/links";
import type { RelatedPagePath } from "@/content/knowledge/types";

/** Display labels for relatedPages paths — keyed from config/links.ts values. */
export const RELATED_PAGE_LABELS: Record<RelatedPagePath, string> = {
  [links.home]: "Home",
  [links.features]: "Features",
  [links.pricing]: "Pricing",
  [links.pricingPlans]: "Compare plans",
  [links.bookDemo]: "Book a Demo",
  [links.contact]: "Contact Sales",
  [links.whyThePortalGenie]: "Why The Portal Genie",
  [links.customerSuccess]: "Customer Success",
};

export function getRelatedPageLabel(path: RelatedPagePath): string {
  return RELATED_PAGE_LABELS[path];
}
