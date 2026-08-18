"use client";

import { X } from "lucide-react";
import { useDemoPortal, usePortalDemoMode } from "@/lib/demo/client-portal/context";
import type { CustomiseTab } from "@/lib/demo/client-portal/types";
import { CustomiseDesignTab } from "@/components/demo/client-portal/CustomiseDesignTab";
import { CustomiseFolderManagementTab } from "@/components/demo/client-portal/CustomiseFolderManagementTab";
import { CustomiseSettingsTab } from "@/components/demo/client-portal/CustomiseSettingsTab";
import { PreviewModeSelector } from "@/components/demo/client-portal/PreviewModeSelector";
import { CustomiseHeaderActions } from "@/components/demo/client-portal/CustomiseHeaderActions";

const CUSTOMISE_TABS: { id: CustomiseTab; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "folder-management", label: "Folder Management" },
  { id: "settings", label: "Settings" },
];

type CustomisePortalPanelProps = {
  /** When true, panel is scoped to the preview area (internal setup shell). */
  contained?: boolean;
};

export function CustomisePortalPanel({ contained = false }: CustomisePortalPanelProps) {
  const { state, dispatch } = useDemoPortal();
  const mode = usePortalDemoMode();
  const isMobileCustomise = state.previewMode === "mobile";
  const panelTitle = mode === "internal" ? "Client Portal Setup" : "Customise";

  if (!state.customiseOpen) {
    return null;
  }

  const backdropClassName = contained
    ? isMobileCustomise
      ? "absolute inset-0 z-[110] pointer-events-none bg-transparent"
      : "absolute inset-0 z-[110] bg-portal-navy/40"
    : isMobileCustomise
      ? "fixed inset-0 z-[110] pointer-events-none bg-transparent"
      : "fixed inset-0 z-[110] bg-portal-navy/40";

  const panelClassName = contained
    ? "absolute inset-y-0 right-0 z-[115] flex w-full max-w-lg flex-col border-l border-muted/20 bg-surface shadow-2xl"
    : "fixed inset-y-0 right-0 z-[115] flex w-full max-w-lg flex-col border-l border-muted/20 bg-surface shadow-2xl";

  return (
    <>
      <button
        type="button"
        className={backdropClassName}
        aria-label={`Close ${panelTitle.toLowerCase()} panel`}
        aria-hidden={isMobileCustomise}
        tabIndex={isMobileCustomise ? -1 : undefined}
        onClick={() => {
          if (!isMobileCustomise) {
            dispatch({ type: "SET_CUSTOMISE_OPEN", open: false });
          }
        }}
      />
      <aside className={panelClassName} aria-label={panelTitle}>
        <div className="z-20 shrink-0 border-b border-muted/20 bg-surface">
          <div className="flex items-center justify-between px-4 pb-2 pt-3">
            <h2 className="text-lg font-semibold text-portal-navy">{panelTitle}</h2>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_CUSTOMISE_OPEN", open: false })}
              className="rounded-button p-2 text-portal-navy/70 hover:bg-background"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 pb-3">
            <PreviewModeSelector />
            <CustomiseHeaderActions />
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
          <div className={state.customiseTab !== "design" ? "hidden" : undefined}>
            <CustomiseDesignTab />
          </div>
          {state.customiseTab === "folder-management" ? <CustomiseFolderManagementTab /> : null}
          <div className={state.customiseTab !== "settings" ? "hidden" : undefined}>
            <CustomiseSettingsTab />
          </div>
        </div>
      </aside>
    </>
  );
}
