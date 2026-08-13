"use client";

import { useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import {
  BRAND_PRESETS,
  DEFAULT_LOGO_PATH,
} from "@/lib/demo/client-portal/constants";
import { getPortalLogo, revokeBlobUrl } from "@/lib/demo/client-portal/portal-logo";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { BrandPresetId, BrandingTheme, NoticeBoard } from "@/lib/demo/client-portal/types";
import { PortalColourSelector } from "@/components/demo/client-portal/PortalColourSelector";
import { NoticeBoardEditorModal } from "@/components/demo/client-portal/NoticeBoardEditorModal";

const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

const BRANDING_FIELDS: {
  key: keyof BrandingTheme;
  label: string;
}[] = [
  { key: "brandColor", label: "Main brand colour" },
  { key: "sidebarBg", label: "Sidebar background" },
  { key: "menuText", label: "Unselected menu text" },
  { key: "menuSelectedText", label: "Selected menu text" },
  { key: "menuSelectedBg", label: "Selected menu background" },
  { key: "portalText", label: "General portal text" },
  { key: "tableBodyText", label: "Table body text" },
  { key: "tableHeadingBg", label: "Table heading background" },
  { key: "tableHeadingText", label: "Table heading text" },
  { key: "payNowBg", label: "Pay Now button background" },
  { key: "payNowText", label: "Pay Now button text" },
  { key: "amountColor", label: "Amount / balance text" },
  { key: "accentColor", label: "Accent colour" },
];

function DesignSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-b border-muted/15 pb-6 ${className}`}>
      <h3 className="text-sm font-semibold text-portal-navy">{title}</h3>
      {children}
    </section>
  );
}

function LogoPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-muted/20 bg-muted/10">
      <img src={src} alt={alt} className="max-h-14 max-w-14 object-contain" />
    </div>
  );
}

export function CustomiseDesignTab() {
  const { state, dispatch } = useDemoPortal();
  const mainLogoInputRef = useRef<HTMLInputElement>(null);
  const alternateLogoInputRef = useRef<HTMLInputElement>(null);
  const [noticeBoardEditorOpen, setNoticeBoardEditorOpen] = useState(false);
  const [editingNoticeBoard, setEditingNoticeBoard] = useState<NoticeBoard | null>(null);

  const portalLogoSrc = getPortalLogo(state);
  const mainLogoSrc = state.logoUrl ?? DEFAULT_LOGO_PATH;

  const handleMainLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      dispatch({
        type: "SET_LOGO_ERROR",
        error: "Please choose a PNG, JPG, WebP, or SVG image.",
      });
      return;
    }
    revokeBlobUrl(state.logoUrl);
    dispatch({ type: "SET_LOGO", logoUrl: URL.createObjectURL(file) });
  };

  const removeMainLogo = () => {
    revokeBlobUrl(state.logoUrl);
    dispatch({ type: "SET_LOGO", logoUrl: null });
  };

  const handleAlternateLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      dispatch({
        type: "SET_LOGO_ERROR",
        error: "Please choose a PNG, JPG, WebP, or SVG image.",
      });
      return;
    }
    revokeBlobUrl(state.alternateLogoUrl);
    dispatch({ type: "SET_ALTERNATE_LOGO", alternateLogoUrl: URL.createObjectURL(file) });
  };

  const removeAlternateLogo = () => {
    revokeBlobUrl(state.alternateLogoUrl);
    dispatch({ type: "SET_ALTERNATE_LOGO", alternateLogoUrl: null });
  };

  const handleNoticeBoardSave = (board: NoticeBoard, setActive: boolean) => {
    if (editingNoticeBoard) {
      dispatch({
        type: "UPDATE_NOTICE_BOARD",
        noticeBoardId: board.id,
        patch: {
          name: board.name,
          headline: board.headline,
          body: board.body,
          ctaText: board.ctaText,
          destinationUrl: board.destinationUrl,
          imageUrl: board.imageUrl,
        },
      });
      if (setActive) {
        dispatch({ type: "SET_ACTIVE_NOTICE_BOARD", noticeBoardId: board.id });
      }
    } else {
      dispatch({ type: "ADD_NOTICE_BOARD", board });
      if (setActive) {
        dispatch({ type: "SET_ACTIVE_NOTICE_BOARD", noticeBoardId: board.id });
      }
    }
    setEditingNoticeBoard(null);
  };

  return (
    <>
      <div className="sticky top-0 z-10 -mx-4 border-b border-muted/15 bg-surface px-4 py-3">
        <h3 className="text-sm font-semibold text-portal-navy">Preview</h3>
        <div className="mt-2 inline-flex rounded-lg border border-muted/25 p-0.5">
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", mode: "desktop" })}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              state.previewMode === "desktop"
                ? "bg-portal-blue/15 text-portal-navy"
                : "text-portal-navy/60 hover:text-portal-navy"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "SET_PREVIEW_MODE", mode: "mobile" })}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
              state.previewMode === "mobile"
                ? "bg-portal-blue/15 text-portal-navy"
                : "text-portal-navy/60 hover:text-portal-navy"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            Mobile
          </button>
        </div>
      </div>
      <p className="border-b border-muted/15 pb-6 pt-2 text-xs text-portal-navy/60">
        Switch how the live Client Portal preview is displayed.
      </p>

      <DesignSection title="Branding">
        <p className="mt-1 text-xs text-portal-navy/60">Brand presets</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(Object.keys(BRAND_PRESETS) as BrandPresetId[]).map((presetId) => (
            <button
              key={presetId}
              type="button"
              onClick={() => dispatch({ type: "APPLY_PRESET", presetId })}
              className="rounded-lg border border-muted/25 px-3 py-2 text-left text-sm font-medium text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:text-portal-blue"
            >
              {BRAND_PRESETS[presetId].label}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">Company name</span>
            <input
              value={state.companyName}
              onChange={(event) =>
                dispatch({ type: "SET_COMPANY_NAME", name: event.target.value })
              }
              className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">
              Greeting / customer name
            </span>
            <input
              value={state.customerName}
              onChange={(event) =>
                dispatch({ type: "SET_CUSTOMER_NAME", name: event.target.value })
              }
              className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            />
          </label>
        </div>
      </DesignSection>

      <DesignSection title="Logos">
        <div className="mt-3 space-y-5">
          <div>
            <p className="text-xs font-medium text-portal-navy/70">Main Logo</p>
            <div className="mt-2 flex items-center gap-3">
              <LogoPreview src={mainLogoSrc} alt="Main logo preview" />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => mainLogoInputRef.current?.click()}
                  className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30"
                >
                  Upload Main Logo
                </button>
                <button
                  type="button"
                  onClick={removeMainLogo}
                  className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/70 hover:border-red-200 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <input
                ref={mainLogoInputRef}
                type="file"
                accept={ACCEPTED_LOGO_TYPES.join(",")}
                className="sr-only"
                onChange={handleMainLogoUpload}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-medium text-portal-navy/70">
              <input
                type="checkbox"
                checked={state.useAlternatePortalLogo}
                disabled={!state.alternateLogoUrl}
                onChange={(event) =>
                  dispatch({
                    type: "SET_USE_ALTERNATE_PORTAL_LOGO",
                    enabled: event.target.checked,
                  })
                }
              />
              Use alternate logo in Client Portal
            </label>
            <p className="mt-2 text-xs font-medium text-portal-navy/70">Alternate Logo</p>
            <div className="mt-2 flex items-center gap-3">
              {state.alternateLogoUrl ? (
                <LogoPreview src={state.alternateLogoUrl} alt="Alternate logo preview" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-muted/30 bg-muted/5 text-[10px] text-portal-navy/45">
                  None
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => alternateLogoInputRef.current?.click()}
                  className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30"
                >
                  Upload Alternate Logo
                </button>
                <button
                  type="button"
                  onClick={removeAlternateLogo}
                  disabled={!state.alternateLogoUrl}
                  className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/70 hover:border-red-200 hover:text-red-600 disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
              <input
                ref={alternateLogoInputRef}
                type="file"
                accept={ACCEPTED_LOGO_TYPES.join(",")}
                className="sr-only"
                onChange={handleAlternateLogoUpload}
              />
            </div>
            <p className="mt-2 text-[11px] text-portal-navy/50">
              Portal preview currently shows: {portalLogoSrc === mainLogoSrc ? "Main Logo" : "Alternate Logo"}
            </p>
          </div>
        </div>
        {state.logoError ? (
          <p className="mt-2 text-xs text-red-600/80" role="alert">
            {state.logoError}
          </p>
        ) : null}
      </DesignSection>

      <DesignSection title="Colour Controls">
        <div className="mt-3 space-y-2.5">
          {BRANDING_FIELDS.map((field) => (
            <PortalColourSelector
              key={field.key}
              label={field.label}
              value={state.branding[field.key]}
              onChange={(color) =>
                dispatch({
                  type: "SET_BRANDING",
                  branding: { [field.key]: color },
                })
              }
            />
          ))}
        </div>
      </DesignSection>

      <DesignSection title="Notice Board" className="border-b-0 pb-0">
        <p className="mt-1 text-xs text-portal-navy/60">
          Choose which notice board is displayed in your Client Portal.
        </p>
        <button
          type="button"
          onClick={() => {
            setEditingNoticeBoard(null);
            setNoticeBoardEditorOpen(true);
          }}
          className="mt-3 rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30 hover:bg-portal-blue/5"
        >
          + Create Notice Board
        </button>
        <ul className="mt-3 space-y-1.5">
          {state.noticeBoards.map((board) => {
            const isActive = state.activeNoticeBoardId === board.id;
            return (
              <li
                key={board.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-muted/20 px-3 py-2"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="active-notice-board"
                    checked={isActive}
                    onChange={() =>
                      dispatch({ type: "SET_ACTIVE_NOTICE_BOARD", noticeBoardId: board.id })
                    }
                  />
                  <span className="truncate text-portal-navy/85">{board.name}</span>
                  {isActive ? (
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-portal-blue">
                      Active
                    </span>
                  ) : null}
                </label>
                {board.removable ? (
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNoticeBoard(board);
                        setNoticeBoardEditorOpen(true);
                      }}
                      className="rounded px-2 py-1 text-xs font-medium text-portal-navy/60 hover:bg-muted/20 hover:text-portal-navy"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "DELETE_NOTICE_BOARD", noticeBoardId: board.id })
                      }
                      className="rounded px-2 py-1 text-xs font-medium text-portal-navy/60 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </DesignSection>

      <NoticeBoardEditorModal
        key={editingNoticeBoard?.id ?? "create"}
        open={noticeBoardEditorOpen}
        onClose={() => {
          setNoticeBoardEditorOpen(false);
          setEditingNoticeBoard(null);
        }}
        initialBoard={editingNoticeBoard}
        onSave={handleNoticeBoardSave}
      />
    </>
  );
}
