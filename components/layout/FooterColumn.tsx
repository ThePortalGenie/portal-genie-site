import type { ReactNode } from "react";

type FooterColumnProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
};

export function FooterColumn({
  title,
  children,
  className = "",
  theme = "light",
}: FooterColumnProps) {
  const titleClass =
    theme === "dark"
      ? "text-sm font-semibold text-white"
      : "text-sm font-semibold text-portal-navy";

  return (
    <div className={className}>
      {title ? <h2 className={titleClass}>{title}</h2> : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </div>
  );
}
