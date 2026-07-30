type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl";

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-portal-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`${eyebrow ? "mt-3" : ""} text-3xl font-semibold tracking-tight text-portal-navy sm:text-4xl`.trim()}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-base leading-relaxed text-portal-navy/75 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
