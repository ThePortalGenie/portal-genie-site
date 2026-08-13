"use client";

import { X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoLogo } from "@/components/demo/client-portal/DemoLogo";
import type { PortalSection } from "@/lib/demo/client-portal/types";

type DemoSidebarProps = {
  mobile?: boolean;
};

export function DemoSidebar({ mobile = false }: DemoSidebarProps) {
  const { state, dispatch } = useDemoPortal();
  const { branding, companyName, logoUrl, section, sidebarOpen } = state;

  const nav = (
    <nav aria-label="Portal navigation">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const selected = section === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "SET_SECTION", section: item.id as PortalSection })
                }
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
                style={{
                  color: selected ? branding.menuSelectedText : branding.menuText,
                  backgroundColor: selected ? branding.menuSelectedBg : "transparent",
                }}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-5">
        <DemoLogo companyName={companyName} logoUrl={logoUrl} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{companyName}</p>
          <p className="truncate text-xs text-white/60">Client Portal</p>
        </div>
        {mobile ? (
          <button
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: false })}
            className="ml-auto rounded-button p-2 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">{nav}</div>
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-white/45">
          Powered by The Portal Genie
        </p>
      </div>
    </div>
  );

  if (mobile) {
    if (!sidebarOpen) {
      return null;
    }
    return (
      <>
        <button
          type="button"
          className="fixed inset-0 z-[90] bg-portal-navy/50 lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: false })}
        />
        <aside
          className="fixed inset-y-0 left-0 z-[95] w-[min(18rem,88vw)] shadow-xl lg:hidden"
          style={{ backgroundColor: branding.sidebarBg }}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className="hidden h-full w-60 shrink-0 lg:block xl:w-64"
      style={{ backgroundColor: branding.sidebarBg }}
    >
      {content}
    </aside>
  );
}
