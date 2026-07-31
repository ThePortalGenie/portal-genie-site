import { type LucideIcon } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

type ThemeCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  reveal?: boolean;
  revealDelay?: number;
};

export function ThemeCard({
  icon,
  title,
  description,
  reveal,
  revealDelay,
}: ThemeCardProps) {
  return (
    <Card variant="background" reveal={reveal} revealDelay={revealDelay}>
      <IconBadge icon={icon} className="mb-4" />
      <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      <CardDescription className="text-sm sm:text-base">
        {description}
      </CardDescription>
    </Card>
  );
}
