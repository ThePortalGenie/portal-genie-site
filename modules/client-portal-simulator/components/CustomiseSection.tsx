"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type CustomiseSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function CustomiseSection({
  title,
  children,
  defaultOpen = false,
}: CustomiseSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div
      className={`rounded-lg border bg-white transition-colors ${
        open ? "border-muted/30" : "border-muted/25 hover:border-muted/35"
      }`}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 bg-white px-3.5 py-3 text-left transition-colors hover:bg-[#fafafa] ${
          open ? "rounded-t-lg border-b border-muted/20" : "rounded-lg"
        }`}
      >
        <span className="text-sm font-semibold text-portal-navy">{title}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-portal-navy/55 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="rounded-b-lg bg-white px-3.5 pb-3.5 pt-3"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
