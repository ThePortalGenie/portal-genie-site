import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

type DocumentationCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  reveal?: boolean;
  revealDelay?: number;
};

export function DocumentationCard({
  icon,
  title,
  description,
  href,
  reveal,
  revealDelay,
}: DocumentationCardProps) {
  return (
    <Card
      variant="background"
      interactive
      reveal={reveal}
      revealDelay={revealDelay}
      className="flex h-full flex-col"
    >
      <IconBadge icon={icon} className="mb-4" />
      <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      <CardDescription className="flex-1 text-sm sm:text-sm">
        {description}
      </CardDescription>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
      >
        Explore
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </Link>
    </Card>
  );
}
