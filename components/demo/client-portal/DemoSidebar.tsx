"use client";

import { Upload } from "lucide-react";
import { NAV_ITEMS, DEFAULT_LOGO_PATH } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { PortalSection } from "@/lib/demo/client-portal/types";

type DemoSidebarProps = {
  mobile?: boolean;
};

export function DemoSidebar({ mobile = false }: DemoSidebarProps) {
  const { state, dispatch } = useDemoPortal();
  const { branding, companyName, logoUrl, section, sidebarOpen } = state;

  const logoSrc = logoUrl ?? DEFAULT_LOGO_PATH;

  const nav = (
    <>
      <nav aria-label="Portal navigation" className="px-3">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const selected = section === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_SECTION", section: item.id as PortalSection })
                  }
                  className="w-full px-3 py-2.5 text-left text-[13px] font-medium"
                  style={{
                    color: selected ? branding.menuSelectedText : branding.menuText,
                    backgroundColor: selected ? branding.menuSelectedBg : "transparent",
                    borderRadius: selected ? "4px" : undefined,
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-3 pt-5">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_UPLOAD_MODAL", open: true })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] px-3 py-2 text-[12px] font-semibold text-white"
          style={{ backgroundColor: branding.payNowBg }}
        >
          <Upload className="h-3.5 w-3.5" aria-hidden="true" />
          Upload Documents
        </button>
      </div>
    </>
  );

  const content = (
    <div className="flex h-full min-h-full flex-col py-5">
      <div className="mb-8 flex flex-col items-center px-4 text-center">
        <div className="mb-3 flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-white">
          <img
            src={logoSrc}
            alt={`${companyName} logo`}
            className="h-[76px] w-[76px] object-contain"
          />
        </div>
        <p className="text-[14px] font-bold text-white">{companyName}</p>
      </div>
      <div className="flex-1">{nav}</div>
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
          className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", open: false })}
        />
        <aside
          className="fixed inset-y-0 left-0 z-[95] w-[min(15rem,80vw)] lg:hidden"
          style={{ backgroundColor: branding.sidebarBg }}
        >
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className="hidden min-h-full self-stretch lg:col-start-1 lg:row-span-2 lg:block"
      style={{ backgroundColor: branding.sidebarBg }}
    >
      {content}
    </aside>
  );
}
