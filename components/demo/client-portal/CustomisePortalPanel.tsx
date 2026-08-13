"use client";

import { X } from "lucide-react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { CustomiseTab } from "@/lib/demo/client-portal/types";
import { CustomiseDesignTab } from "@/components/demo/client-portal/CustomiseDesignTab";
import { CustomiseFolderManagementTab } from "@/components/demo/client-portal/CustomiseFolderManagementTab";
import { CustomiseSettingsTab } from "@/components/demo/client-portal/CustomiseSettingsTab";
import { PreviewModeSelector } from "@/components/demo/client-portal/PreviewModeSelector";

const CUSTOMISE_TABS: { id: CustomiseTab; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "folder-management", label: "Folder Management" },
  { id: "settings", label: "Settings" },
];

export function CustomisePortalPanel() {
  const { state, dispatch } = useDemoPortal();

  if (!state.customiseOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[110] bg-portal-navy/40"
        aria-label="Close customise panel"
        onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: false })}
      />
      <aside
        className="fixed inset-y-0 right-0 z-[115] flex w-full max-w-md flex-col border-l border-muted/20 bg-surface shadow-2xl"
        aria-label="Customise portal"
      >
        <div className="z-20 shrink-0 border-b border-muted/20 bg-surface">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-3">
            <h2 className="text-lg font-semibold text-portal-navy">Customise</h2>
            <div className="flex justify-center">
              <PreviewModeSelector />
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: false })}
              className="rounded-button p-2 text-portal-navy/70 hover:bg-background"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pb-3">
            <div className="flex gap-1 rounded-lg bg-background p-1">
              {CUSTOMISE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => dispatch({ type: "SET_CUSTOMISE_TAB", tab: tab.id })}
                  className={`min-w-0 flex-1 rounded-md px-2 py-1.5 text-[11px] font-semibold leading-tight transition-colors ${
                    state.customiseTab === tab.id
                      ? "bg-surface text-portal-navy shadow-sm"
                      : "text-portal-navy/60 hover:text-portal-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="portal-customise-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 pb-6">
          {state.customiseTab === "design" ? <CustomiseDesignTab /> : null}
          {state.customiseTab === "folder-management" ? <CustomiseFolderManagementTab /> : null}
          {state.customiseTab === "settings" ? <CustomiseSettingsTab /> : null}
        </div>
      </aside>
    </>
  );
}
