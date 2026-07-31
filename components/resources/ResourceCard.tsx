import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

type ResourceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  reveal?: boolean;
  revealDelay?: number;
};

export function ResourceCard({
  icon,
  title,
  description,
  cta,
  reveal,
  revealDelay,
}: ResourceCardProps) {
  return (
    <Card
      variant="background"
      interactive
      reveal={reveal}
      revealDelay={revealDelay}
      className="flex h-full flex-col"
    >
      <IconBadge icon={icon} />
      <CardTitle>{title}</CardTitle>
      <CardDescription className="flex-1">{description}</CardDescription>
      <Link
        href={cta.href}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
      >
        {cta.label}
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
      </Link>
    </Card>
  );
}
