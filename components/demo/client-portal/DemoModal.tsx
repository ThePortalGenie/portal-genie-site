"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type DemoModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
  footer?: ReactNode;
};

export function DemoModal({
  open,
  onClose,
  title,
  children,
  size = "md",
  footer,
}: DemoModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const sizeClass =
    size === "xl"
      ? "max-w-4xl"
      : size === "lg"
        ? "max-w-2xl"
        : "max-w-lg";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-portal-navy/50"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-card border border-muted/20 bg-surface shadow-[0_24px_64px_-24px_rgba(17,33,54,0.45)] sm:rounded-card",
          sizeClass,
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-muted/20 px-4 py-3 sm:px-6">
          <h2 id={titleId} className="text-base font-semibold text-portal-navy sm:text-lg">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-button p-2 text-portal-navy/70 transition-colors hover:bg-background hover:text-portal-navy"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>
        {footer ? (
          <div className="border-t border-muted/20 px-4 py-3 sm:px-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
