import { StarRating } from "@/components/customer-success/StarRating";

type RatingSummaryProps = {
  value: string;
  label: string;
  source: string;
  className?: string;
};

export function RatingSummary({
  value,
  label,
  source,
  className = "",
}: RatingSummaryProps) {
  return (
    <div
      className={`rounded-card border border-muted/20 bg-surface px-6 py-5 sm:inline-flex sm:items-center sm:gap-6 sm:px-8 sm:py-6 ${className}`.trim()}
    >
      <StarRating className="text-2xl tracking-widest sm:text-3xl" />
      <div className="mt-4 sm:mt-0">
        <p className="text-2xl font-semibold tracking-tight text-portal-navy">
          {value}{" "}
          <span className="text-lg font-medium text-portal-navy/70">
            {label}
          </span>
        </p>
        <p className="mt-1 text-sm text-portal-navy/60">{source}</p>
      </div>
    </div>
  );
}
