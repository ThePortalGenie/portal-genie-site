"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BrandingTheme } from "@/lib/demo/client-portal/types";

export function PortalPageHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[15px] font-bold text-[#112136]">{children}</h2>
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
      className={`h-8 w-full max-w-[220px] border border-[#d9d9d9] bg-white px-2 text-[12px] text-[#112136] outline-none focus:border-[#00CCFF] ${className}`}
    />
  );
}

export function PortalSelect({
  value,
  onChange,
  children,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`h-8 border border-[#d9d9d9] bg-white px-2 text-[12px] text-[#112136] outline-none focus:border-[#00CCFF] ${className}`}
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
      className={`inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
}

export function PortalTable({
  children,
  minWidth = "640px",
}: {
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function PortalTableHead({
  branding,
  children,
}: {
  branding: BrandingTheme;
  children: ReactNode;
}) {
  return (
    <thead style={{ backgroundColor: branding.tableHeadingBg }}>
      <tr>{children}</tr>
    </thead>
  );
}

export function PortalTableHeadCell({
  branding,
  children,
  className = "",
}: {
  branding: BrandingTheme;
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-2 py-2 text-left text-[12px] font-semibold ${className}`}
      style={{ color: branding.tableHeadingText }}
    >
      {children}
    </th>
  );
}

export function PortalTableBody({
  branding,
  children,
}: {
  branding: BrandingTheme;
  children: ReactNode;
}) {
  return (
    <tbody style={{ color: branding.tableBodyText }}>{children}</tbody>
  );
}

export function PortalTableRow({
  children,
  selected = false,
}: {
  children: ReactNode;
  selected?: boolean;
}) {
  return (
    <tr
      className="border-b border-[#ececec]"
      style={selected ? { backgroundColor: "#f9fcff" } : undefined}
    >
      {children}
    </tr>
  );
}

export function PortalTableCell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-2 py-2 align-middle ${className}`}>{children}</td>;
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
      ? "border border-[#f59a4a] bg-[#fff7ef] text-[#d97706]"
      : tone === "paid"
        ? "border border-[#86efac] bg-[#f0fdf4] text-[#15803d]"
        : "border border-[#d1d5db] bg-white text-[#374151]";

  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] capitalize ${styles}`}>
      {label}
    </span>
  );
}

export function PortalPagination() {
  return (
    <div className="mt-2 flex items-center justify-end gap-1 text-[12px] text-[#666]">
      <button type="button" className="px-1" aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="border border-[#d9d9d9] px-2 py-0.5">Page 1</span>
      <button type="button" className="px-1" aria-label="Next page">
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
    <div className="flex items-center gap-2 text-[#888]">
      {onView ? (
        <button type="button" onClick={onView} aria-label="View" className="hover:text-[#0055FF]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onEdit ? (
        <button type="button" onClick={onEdit} aria-label="Edit" className="hover:text-[#0055FF]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onShare ? (
        <button type="button" onClick={onShare} aria-label="Share" className="hover:text-[#0055FF]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      ) : null}
      {onDownload ? (
        <button type="button" onClick={onDownload} aria-label="Download" className="hover:text-[#0055FF]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <div className="mb-3 flex items-center justify-between gap-2">
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
            className="inline-flex h-8 w-8 items-center justify-center text-white"
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
