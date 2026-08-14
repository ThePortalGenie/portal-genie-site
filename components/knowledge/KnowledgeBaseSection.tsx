import { KNOWLEDGE_CATEGORIES, type KnowledgeCategory } from "@/content/knowledge/types";
import { KnowledgeArticleCard } from "@/components/knowledge/KnowledgeArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { getCategoryDisplayName } from "@/lib/knowledge/categories";
import { listPublicArticles } from "@/lib/knowledge/load-article";

function groupArticlesByCategory() {
  const articles = listPublicArticles();
  const groups = new Map<KnowledgeCategory, typeof articles>();

  for (const category of KNOWLEDGE_CATEGORIES) {
    const categoryArticles = articles.filter(
      (article) => article.category === category,
    );

    if (categoryArticles.length > 0) {
      groups.set(category, categoryArticles);
    }
  }

  return groups;
}

export function KnowledgeBaseSection() {
  const groupedArticles = groupArticlesByCategory();

  return (
    <Section background="background" id="knowledge-base">
      <SectionHeader
        title="Knowledge Base"
        description="Guides and articles to help you understand, set up and get more from your Portal Genie Client Portal."
        align="left"
        className="max-w-xl"
      />

      <div className="mt-12 space-y-14">
        {[...groupedArticles.entries()].map(([category, articles]) => (
          <section key={category} aria-labelledby={`kb-category-${category}`}>
            <h3
              id={`kb-category-${category}`}
              className="text-lg font-semibold tracking-tight text-portal-navy"
            >
              {getCategoryDisplayName(category)}
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {articles.map((article) => (
                <KnowledgeArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
