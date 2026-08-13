"use client";

import { Menu, Palette, RotateCcw } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";

export function DemoToolbar() {
  const { dispatch } = useDemoPortal();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden rounded-badge bg-portal-blue/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-portal-blue sm:inline">
        Interactive Demo
      </span>
      <button
        type="button"
        onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: true })}
        className="inline-flex items-center gap-1.5 rounded-button border border-muted/30 bg-surface px-3 py-1.5 text-xs font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:text-portal-blue sm:text-sm"
      >
        <Palette className="h-3.5 w-3.5" aria-hidden="true" />
        Customise Portal
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "SET_RESET_CONFIRM", open: true })}
        className="inline-flex items-center gap-1.5 rounded-button border border-muted/30 bg-surface px-3 py-1.5 text-xs font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:text-portal-blue sm:text-sm"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        Reset Demo
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: true })}
        className="inline-flex items-center justify-center rounded-button border border-muted/30 bg-surface p-2 text-portal-navy lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
