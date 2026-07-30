import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  className?: string;
};

export function IconBadge({ icon: Icon, className = "" }: IconBadgeProps) {
  return (
    <div
      className={`mb-5 inline-flex size-10 items-center justify-center rounded-button bg-portal-blue/10 text-portal-blue ${className}`.trim()}
    >
      <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
    </div>
  );
}
