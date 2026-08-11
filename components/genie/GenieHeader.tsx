"use client";

import { RotateCcw, X } from "lucide-react";

type GenieHeaderProps = {
  onClose: () => void;
  onReset: () => void;
};

export function GenieHeader({ onClose, onReset }: GenieHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-muted/15 px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 id="genie-panel-title" className="text-base font-semibold text-portal-navy">
            Genie
          </h2>
          <span
            className="inline-flex items-center gap-1 rounded-badge bg-portal-teal/10 px-2 py-0.5 text-[11px] font-medium text-portal-navy/70"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-portal-teal" />
            Assistant
          </span>
        </div>
        <p className="mt-0.5 text-xs text-portal-navy/60">Portal Genie assistant</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset conversation"
          title="Reset conversation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-button text-portal-navy/70 transition-colors duration-200 hover:bg-background hover:text-portal-navy"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Genie"
          title="Close"
          className="inline-flex h-9 w-9 items-center justify-center rounded-button text-portal-navy/70 transition-colors duration-200 hover:bg-background hover:text-portal-navy"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
