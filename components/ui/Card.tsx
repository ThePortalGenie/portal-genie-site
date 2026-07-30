import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardVariant = "surface" | "background";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  variant?: CardVariant;
  interactive?: boolean;
  reveal?: boolean;
  revealDelay?: number;
};

const variantClasses: Record<CardVariant, string> = {
  surface: "bg-surface",
  background: "bg-background",
};

export function Card({
  variant = "surface",
  interactive = false,
  reveal,
  revealDelay = 0,
  className = "",
  children,
  style,
  ...props
}: CardProps) {
  const revealClasses =
    reveal === undefined
      ? ""
      : reveal
        ? "translate-y-0 opacity-100"
        : "translate-y-4 opacity-0";

  return (
    <article
      className={[
        "rounded-card border border-muted/20 p-6 lg:p-8",
        variantClasses[variant],
        interactive &&
          "shadow-[0_8px_24px_-8px_rgba(17,33,54,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:border-muted/30 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        revealClasses,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...style,
        ...(reveal ? { transitionDelay: `${revealDelay}ms` } : undefined),
      }}
      {...props}
    >
      {children}
    </article>
  );
}

export function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-lg font-semibold text-portal-navy ${className}`.trim()}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-3 text-sm leading-relaxed text-portal-navy/75 sm:text-base ${className}`.trim()}
    >
      {children}
    </p>
  );
}
