import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/knowledge/ArticleLayout";
import { noIndexPageMetadata } from "@/config/seo";
import {
  getArticleMetadataBySlug,
  getKnowledgeArticleBySlug,
  listPublicArticles,
} from "@/lib/knowledge/load-article";

type ArticlePageProps = {
  params: Promise<{ slug: string[] }>;
};

function slugFromParams(slugSegments: string[]): string {
  return slugSegments.join("/");
}

export function generateStaticParams() {
  return listPublicArticles().map((article) => ({
    slug: article.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const slug = slugFromParams(slugSegments);
  const metadata = getArticleMetadataBySlug(slug);

  if (!metadata?.public) {
    return {};
  }

  return noIndexPageMetadata({
    title: `${metadata.title} | The Portal Genie`,
    description: metadata.description,
  });
}

export default async function KnowledgeArticlePage({ params }: ArticlePageProps) {
  const { slug: slugSegments } = await params;
  const slug = slugFromParams(slugSegments);
  const metadata = getArticleMetadataBySlug(slug);

  if (!metadata?.public) {
    notFound();
  }

  const article = getKnowledgeArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ArticleLayout article={article} />
    </main>
  );
}
