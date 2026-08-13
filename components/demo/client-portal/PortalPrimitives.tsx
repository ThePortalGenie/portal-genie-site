"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BrandingTheme } from "@/lib/demo/client-portal/types";

/** Subtle portal control radius — matches original Portal Genie UI. */
export const PORTAL_CONTROL_RADIUS = "rounded-[3px]";

export function PortalPageHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[15px] font-bold text-[#112136] min-[1700px]:mb-4">{children}</h2>
  );
}

export function PortalSearchInput({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`h-8 w-full max-w-[190px] border border-[#d9d9d9] bg-white px-2 text-[11px] text-[#112136] outline-none focus:border-[#00CCFF] min-[1700px]:max-w-[220px] ${PORTAL_CONTROL_RADIUS} ${className}`}
    />
  );
}

export function PortalSelect({
  value,
  onChange,
  children,
  className = "",
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className={`h-8 border border-[#d9d9d9] bg-white px-2 text-[11px] text-[#112136] outline-none focus:border-[#00CCFF] ${PORTAL_CONTROL_RADIUS} ${className}`}
    >
      {children}
    </select>
  );
}

export function PortalActionButton({
  children,
  onClick,
  branding,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  branding: BrandingTheme;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const styles =
    variant === "primary"
      ? {
          backgroundColor: branding.payNowBg,
          color: branding.payNowText,
          border: "none",
        }
      : variant === "secondary"
        ? {
            backgroundColor: branding.brandColor,
            color: "#ffffff",
            border: "none",
          }
        : {
            backgroundColor: "transparent",
            color: branding.brandColor,
            border: `1px solid ${branding.brandColor}`,
          };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${PORTAL_CONTROL_RADIUS} ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
}

export function PortalTable({
  children,
  minWidth,
  compact = false,
  roundedRows = false,
  fixedLayout = false,
}: {
  children: ReactNode;
  minWidth?: string;
  compact?: boolean;
  roundedRows?: boolean;
  fixedLayout?: boolean;
}) {
  return (
    <div className={minWidth ? "overflow-x-auto" : "min-w-0 overflow-x-visible"}>
      <table
        className={`w-full ${fixedLayout ? "table-fixed" : ""} ${roundedRows ? "border-separate" : "border-collapse"} ${compact ? "text-[11px]" : "text-[12px]"}`}
        style={{
          ...(minWidth ? { minWidth } : undefined),
          ...(roundedRows ? { borderSpacing: "0 5px" } : undefined),
        }}
      >
        {children}
      </table>
    </div>
  );
}

export function PortalTableHead({
  branding,
  children,
  compact = false,
  roundedRows = false,
}: {
  branding: BrandingTheme;
  children: ReactNode;
  compact?: boolean;
  roundedRows?: boolean;
}) {
  return (
    <thead style={{ backgroundColor: branding.tableHeadingBg }}>
      <tr
        className={`${compact ? "text-[11px]" : ""} ${
          roundedRows
            ? "[&>th:first-child]:rounded-l-[4px] [&>th:last-child]:rounded-r-[4px]"
            : ""
        }`}
      >
        {children}
      </tr>
    </thead>
  );
}

export function PortalTableHeadCell({
  branding,
  children,
  className = "",
  compact = false,
  align = "left",
}: {
  branding: BrandingTheme;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`font-semibold ${compact ? "px-1.5 py-1 text-[11px] min-[1700px]:px-2.5 min-[1700px]:py-1.5" : "px-2 py-2 text-[12px]"} ${align === "right" ? "text-right" : "text-left"} ${className}`}
      style={{ color: branding.tableHeadingText }}
    >
      {children}
    </th>
  );
}

export function PortalTableBody({
  branding,
  children,
  roundedRows = false,
}: {
  branding: BrandingTheme;
  children: ReactNode;
  roundedRows?: boolean;
}) {
  return (
    <tbody
      className={
        roundedRows
          ? "[&>tr>td]:border-y [&>tr>td]:border-[#e8e8e8] [&>tr>td:first-child]:rounded-l-[12px] [&>tr>td:first-child]:border-l [&>tr>td:last-child]:rounded-r-[12px] [&>tr>td:last-child]:border-r"
          : undefined
      }
      style={{ color: branding.tableBodyText }}
    >
      {children}
    </tbody>
  );
}

export function PortalTableRow({
  children,
  selected = false,
  compact = false,
  roundedRows = false,
}: {
  children: ReactNode;
  selected?: boolean;
  compact?: boolean;
  roundedRows?: boolean;
}) {
  return (
    <tr
      className={`${compact ? "text-[11px]" : ""} ${roundedRows ? "" : "border-b border-[#e8e8e8]"}`}
      style={selected ? { backgroundColor: roundedRows ? "#fafcff" : "#fafcff" } : undefined}
    >
      {children}
    </tr>
  );
}

export function PortalTableCell({
  children,
  className = "",
  compact = false,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  align?: "left" | "right";
}) {
  return (
    <td
      className={`align-middle ${compact ? "px-1.5 py-1.5 min-[1700px]:px-2.5 min-[1700px]:py-2" : "px-2 py-2.5"} ${align === "right" ? "text-right tabular-nums" : "text-left"} ${className}`}
    >
      {children}
    </td>
  );
}

export function PortalStatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "unpaid" | "paid" | "open" | "neutral";
}) {
  const styles =
    tone === "unpaid" || tone === "open"
      ? "border border-[#e8944a] bg-white text-[#e8944a]"
      : tone === "paid"
        ? "border border-[#72b772] bg-[#f2faf2] text-[#3d8b3d]"
        : "border border-[#d1d5db] bg-white text-[#374151]";

  return (
    <span
      className={`inline-block rounded-[3px] px-1.5 py-0.5 text-[10px] font-medium min-[1700px]:px-2 ${styles}`}
    >
      {label}
    </span>
  );
}

export function PortalPagination() {
  return (
    <div className="mt-2 flex items-center justify-end gap-1.5 text-[11px] text-[#666] min-[1700px]:mt-3">
      <button
        type="button"
        className={`px-1 ${PORTAL_CONTROL_RADIUS} hover:bg-[#f5f5f5]`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className={`border border-[#d9d9d9] px-2 py-0.5 ${PORTAL_CONTROL_RADIUS}`}>
        Page 1
      </span>
      <button
        type="button"
        className={`px-1 ${PORTAL_CONTROL_RADIUS} hover:bg-[#f5f5f5]`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function PortalIconActions({
  onView,
  onDownload,
  onEdit,
  onShare,
}: {
  onView?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1.5 text-[#666] min-[1700px]:gap-2.5">
      {onView ? (
        <button type="button" onClick={onView} aria-label="View" className="hover:text-[#0055FF]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onEdit ? (
        <button type="button" onClick={onEdit} aria-label="Edit" className="hover:text-[#0055FF]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onShare ? (
        <button type="button" onClick={onShare} aria-label="Share" className="hover:text-[#0055FF]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onDownload ? (
        <button type="button" onClick={onDownload} aria-label="Download" className="hover:text-[#0055FF]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export function DocumentToolbar({
  branding,
  onClose,
  onAddToCart,
  onDownload,
  showAddToCart = false,
}: {
  branding: BrandingTheme;
  onClose: () => void;
  onAddToCart?: () => void;
  onDownload?: () => void;
  showAddToCart?: boolean;
}) {
  return (
    <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
      <PortalActionButton branding={branding} variant="secondary" onClick={onClose}>
        Close
      </PortalActionButton>
      <div className="flex items-center gap-2">
        {showAddToCart && onAddToCart ? (
          <PortalActionButton branding={branding} variant="secondary" onClick={onAddToCart}>
            Add To Cart
          </PortalActionButton>
        ) : null}
        {onDownload ? (
          <button
            type="button"
            onClick={onDownload}
            aria-label="Download"
            className={`inline-flex h-8 w-8 items-center justify-center text-white ${PORTAL_CONTROL_RADIUS}`}
            style={{ backgroundColor: branding.brandColor }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
