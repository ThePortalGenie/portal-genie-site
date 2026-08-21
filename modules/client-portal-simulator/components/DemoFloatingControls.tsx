"use client";

import { Palette, RotateCcw } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";

export function DemoFloatingControls() {
  const { dispatch } = useDemoPortal();

  return (
    <div className="fixed bottom-4 right-4 z-[120] flex flex-col overflow-hidden rounded-md border border-[#112136]/15 bg-white shadow-[0_8px_24px_rgba(17,33,54,0.18)]">
      <div className="bg-[#112136] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Demo Controls
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: true })}
          className="inline-flex items-center gap-2 px-3 py-2 text-left text-[12px] font-medium text-[#112136] hover:bg-[#f5f5f5]"
        >
          <Palette className="h-3.5 w-3.5" aria-hidden="true" />
          Customise
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_RESET_CONFIRM", open: true })}
          className="inline-flex items-center gap-2 border-t border-[#ececec] px-3 py-2 text-left text-[12px] font-medium text-[#112136] hover:bg-[#f5f5f5]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>
  );
}
