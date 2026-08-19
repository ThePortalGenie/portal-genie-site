"use client";

import { RotateCcw, Settings } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";

export function ClientPortalSetupToolbar() {
  const { state, dispatch } = useDemoPortal();
  const customizeOpen = state.customiseOpen;

  return (
    <div className="relative z-[130] flex shrink-0 items-center border-b border-muted/25 bg-[#FFFFFF] px-4 py-2">
      <p className="relative z-[1] max-w-[calc(50%-7rem)] truncate text-[10px] text-[#666]">
        Demo Portal · Interactive demonstration — no real transactions
      </p>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: true })}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            customizeOpen
              ? "border-portal-blue/30 bg-portal-blue/15 text-portal-navy"
              : "border-muted/30 bg-white text-portal-navy/80 hover:border-portal-blue/25 hover:bg-[#fafafa]"
          }`}
          aria-pressed={customizeOpen}
        >
          <Settings className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Customize
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
