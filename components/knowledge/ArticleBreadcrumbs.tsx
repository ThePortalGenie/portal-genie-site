import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { links } from "@/config/links";
import type { KnowledgeCategory } from "@/content/knowledge/types";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";

type ArticleBreadcrumbsProps = {
  category: KnowledgeCategory;
  title: string;
};

export function ArticleBreadcrumbs({ category, title }: ArticleBreadcrumbsProps) {
  const categoryLabel = getCategoryDisplayName(category);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-portal-navy/65">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href={links.resources}
            className="font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
          >
            Resources
          </Link>
        </li>
        <li aria-hidden="true" className="text-portal-navy/40">
          <ChevronRight className="size-3.5" strokeWidth={2} />
        </li>
        <li>
          <span className="text-portal-navy/75">{categoryLabel}</span>
        </li>
        <li aria-hidden="true" className="text-portal-navy/40">
          <ChevronRight className="size-3.5" strokeWidth={2} />
        </li>
        <li>
          <span className="text-portal-navy/90" aria-current="page">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
