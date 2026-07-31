import { BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/customer-success/StarRating";

type StatisticCardProps = {
  value: string;
  label: string;
  stars?: number;
  icon?: "badge-check";
  reveal?: boolean;
  revealDelay?: number;
};

export function StatisticCard({
  value,
  label,
  stars,
  icon,
  reveal,
  revealDelay,
}: StatisticCardProps) {
  return (
    <Card
      variant="background"
      reveal={reveal}
      revealDelay={revealDelay}
      className="flex h-full flex-col text-center"
    >
      <div className="mb-3 flex h-10 items-center justify-center">
        {stars ? (
          <StarRating className="text-xl tracking-wider" />
        ) : icon === "badge-check" ? (
          <div className="inline-flex size-10 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue">
            <BadgeCheck className="size-5" strokeWidth={2} aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <p className="text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-portal-navy/70 sm:text-base">{label}</p>
    </Card>
  );
}
