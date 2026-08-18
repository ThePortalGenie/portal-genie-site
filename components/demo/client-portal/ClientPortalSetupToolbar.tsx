"use client";

import { RotateCcw, Settings } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";

export function ClientPortalSetupToolbar() {
  const { state, dispatch } = useDemoPortal();
  const setupOpen = state.customiseOpen;

  return (
    <div className="relative z-[130] flex shrink-0 items-center justify-center border-b border-muted/25 bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: true })}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            setupOpen
              ? "border-portal-blue/30 bg-portal-blue/15 text-portal-navy"
              : "border-muted/30 bg-white text-portal-navy/80 hover:border-portal-blue/25 hover:bg-[#fafafa]"
          }`}
          aria-pressed={setupOpen}
        >
          <Settings className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Setup
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_RESET_CONFIRM", open: true })}
          className="inline-flex items-center gap-1.5 rounded-md border border-muted/30 bg-white px-3 py-1.5 text-[12px] font-semibold text-portal-navy/80 transition-colors hover:border-portal-blue/25 hover:bg-[#fafafa]"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
