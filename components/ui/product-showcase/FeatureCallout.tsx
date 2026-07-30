import type { ReactNode } from "react";

export interface FeatureCalloutProps {
  title: string;
  description: string;
  icon?: ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const positionClasses: Record<
  NonNullable<FeatureCalloutProps["position"]>,
  string
> = {
  "top-left": "md:top-6 md:left-6 md:right-auto md:bottom-auto",
  "top-right": "md:top-6 md:right-6 md:left-auto md:bottom-auto",
  "bottom-left": "md:bottom-6 md:left-6 md:right-auto md:top-auto",
  "bottom-right": "md:bottom-6 md:right-6 md:left-auto md:top-auto",
};

export function FeatureCallout({
  title,
  description,
  icon,
  position = "top-left",
}: FeatureCalloutProps) {
  return (
    <aside
      className={`w-full max-w-xs rounded-card border border-muted/25 bg-surface p-4 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none md:absolute md:max-w-[220px] md:shadow-[0_8px_24px_-8px_rgba(17,33,54,0.1)] md:hover:border-portal-blue/30 lg:max-w-[240px] ${positionClasses[position]}`}
    >
      {icon ? (
        <div
          className="mb-3 inline-flex size-8 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-semibold text-portal-navy">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-portal-navy/75 sm:text-sm">
        {description}
      </p>
    </aside>
  );
}
