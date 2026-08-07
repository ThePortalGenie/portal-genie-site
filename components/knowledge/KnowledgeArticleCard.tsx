import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { KnowledgeArticleMetadata } from "@/content/knowledge/types";
import { getResourcesUrlPath } from "@/lib/knowledge/paths";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

type KnowledgeArticleCardProps = {
  article: KnowledgeArticleMetadata;
};

export function KnowledgeArticleCard({ article }: KnowledgeArticleCardProps) {
  const href = getResourcesUrlPath(article.slug);
  const categoryLabel = getCategoryDisplayName(article.category);

  return (
    <Card variant="surface" interactive className="flex h-full flex-col">
      <p className="text-sm font-medium tracking-wide text-portal-blue">
        {categoryLabel}
      </p>
      <CardTitle className="mt-3">{article.title}</CardTitle>
      <CardDescription className="flex-1">{article.summary}</CardDescription>
      <div className="mt-6">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-blue"
          aria-label={`Read article: ${article.title}`}
        >
          Read article
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
