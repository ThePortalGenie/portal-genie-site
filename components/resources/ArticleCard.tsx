import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

type ArticleCardProps = {
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  href: string;
  reveal?: boolean;
  revealDelay?: number;
};

export function ArticleCard({
  category,
  title,
  summary,
  readingTime,
  href,
  reveal,
  revealDelay,
}: ArticleCardProps) {
  return (
    <Card
      variant="surface"
      interactive
      reveal={reveal}
      revealDelay={revealDelay}
      className="flex h-full flex-col"
    >
      <p className="text-sm font-medium tracking-wide text-portal-blue">
        {category}
      </p>
      <CardTitle className="mt-3">{title}</CardTitle>
      <CardDescription className="flex-1">{summary}</CardDescription>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm text-portal-navy/50">{readingTime}</span>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
          aria-label={`Read article: ${title}`}
        >
          Read
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
