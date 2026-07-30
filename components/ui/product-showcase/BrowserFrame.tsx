import type { ReactNode } from "react";
import { site } from "@/config/site";

export interface BrowserFrameProps {
  children: ReactNode;
  title?: string;
  showAddressBar?: boolean;
}

export function BrowserFrame({
  children,
  title,
  showAddressBar = true,
}: BrowserFrameProps) {
  return (
    <figure
      className="overflow-hidden rounded-[24px] border border-muted/25 bg-surface shadow-[0_12px_40px_-12px_rgba(17,33,54,0.12)]"
      aria-label={title}
    >
      <div className="flex items-center gap-3 border-b border-muted/20 bg-background px-4 py-3">
        <div
          className="flex items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="size-2.5 rounded-full bg-muted/70" />
          <span className="size-2.5 rounded-full bg-muted/70" />
          <span className="size-2.5 rounded-full bg-muted/70" />
        </div>
        {showAddressBar ? (
          <div className="mx-auto flex h-7 w-full max-w-sm items-center rounded-button border border-muted/20 bg-surface px-3">
            <span className="truncate text-xs text-muted">
              {title ?? site.appHost}
            </span>
          </div>
        ) : (
          <span className="sr-only">{title ?? "Portal Genie application"}</span>
        )}
      </div>
      <div className="bg-surface">{children}</div>
    </figure>
  );
}
