import Link from "next/link";
import type { KnowledgeArticle } from "@/content/knowledge/types";
import { links } from "@/config/links";
import { buttons } from "@/content/buttons";
import { ArticleBreadcrumbs } from "@/components/knowledge/ArticleBreadcrumbs";
import { ArticleStructuredData } from "@/components/knowledge/ArticleStructuredData";
import { KnowledgeArticleCard } from "@/components/knowledge/KnowledgeArticleCard";
import { MarkdownContent } from "@/components/knowledge/MarkdownContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GenieFlow } from "@/components/visuals/GenieFlow";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";
import { getRelatedPageLabel } from "@/lib/knowledge/related-pages";
import { resolveRelatedArticles } from "@/lib/knowledge/load-article";

type ArticleLayoutProps = {
  article: KnowledgeArticle;
};

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleLayout({ article }: ArticleLayoutProps) {
  const categoryLabel = getCategoryDisplayName(article.category);
  const relatedArticles = resolveRelatedArticles(article).filter(
    (item) => item.public,
  );

  return (
    <article className="relative overflow-hidden bg-background pb-16 md:pb-20 lg:pb-24">
      <ArticleStructuredData article={article} />
      <GenieFlow variant="soft" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl pt-8 md:pt-12 lg:pt-16">
          <ArticleBreadcrumbs category={article.category} title={article.title} />

          <p className="mt-6 text-sm font-medium tracking-wide text-portal-blue">
            {categoryLabel}
          </p>

          <h1 className="mt-3 text-[1.875rem] font-semibold leading-[1.15] tracking-tight text-portal-navy sm:text-[2.25rem] sm:leading-tight lg:text-[2.5rem]">
            {article.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-portal-navy/75 sm:mt-6 sm:text-lg">
            {article.description}
          </p>

          <p className="mt-4 text-sm text-portal-navy/55">
            Last reviewed {formatReviewDate(article.lastReviewed)}
          </p>

          <div className="mt-10 border-t border-muted/15 pt-10">
            <MarkdownContent markdown={article.markdown} />
          </div>

          {relatedArticles.length > 0 ? (
            <section
              className="mt-14 border-t border-muted/15 pt-10"
              aria-labelledby="related-articles-heading"
            >
              <h2
                id="related-articles-heading"
                className="text-xl font-semibold tracking-tight text-portal-navy"
              >
                Related articles
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <KnowledgeArticleCard key={related.id} article={related} />
                ))}
              </div>
            </section>
          ) : null}

          {article.relatedPages.length > 0 ? (
            <section
              className="mt-10"
              aria-labelledby="related-pages-heading"
            >
              <h2
                id="related-pages-heading"
                className="text-base font-semibold tracking-tight text-portal-navy"
              >
                Related pages
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {article.relatedPages.map((path) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className="text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-blue"
                    >
                      {getRelatedPageLabel(path)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section
            className="mt-14 rounded-card border border-portal-blue/15 bg-portal-blue/[0.04] px-5 py-6 sm:px-6 sm:py-7"
            aria-labelledby="article-help-heading"
          >
            <h2
              id="article-help-heading"
              className="text-lg font-semibold tracking-tight text-portal-navy"
            >
              Need more help?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
              Book a demo to see The Portal Genie in action, or contact our
              sales team with your questions.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={links.bookDemo} variant="primary" className="w-full sm:w-auto">
                {buttons.bookDemo}
              </ButtonLink>
              <ButtonLink href={links.contact} variant="secondary" className="w-full sm:w-auto">
                {buttons.contactSales}
              </ButtonLink>
            </div>
          </section>

          <p className="mt-10">
            <Link
              href={links.resources}
              className="text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-blue"
            >
              ← Back to Resources
            </Link>
          </p>
        </div>
      </Container>
    </article>
  );
}
