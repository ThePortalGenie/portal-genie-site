type StarRatingProps = {
  count?: number;
  className?: string;
};

export function StarRating({ count = 5, className = "" }: StarRatingProps) {
  return (
    <div
      className={`text-portal-teal ${className}`.trim()}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {"★".repeat(count)}
    </div>
  );
}
