import type { ReactNode } from "react";

type FooterColumnProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function FooterColumn({
  title,
  children,
  className = "",
}: FooterColumnProps) {
  return (
    <div className={className}>
      {title ? (
        <h2 className="text-sm font-semibold text-portal-navy">{title}</h2>
      ) : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </div>
  );
}
