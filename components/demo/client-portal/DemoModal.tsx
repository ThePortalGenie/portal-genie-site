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
  overlayClassName?: string;
  hideTitle?: boolean;
};

export function DemoModal({
  open,
  onClose,
  title,
  children,
  size = "md",
  footer,
  overlayClassName = "bg-[#112136]/50",
  hideTitle = false,
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
    size === "xl" ? "max-w-4xl" : size === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4" role="presentation">
      <button
        type="button"
        className={`absolute inset-0 ${overlayClassName}`}
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={hideTitle ? undefined : titleId}
        className={[
          "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-md border border-[#ececec] bg-white shadow-[0_12px_40px_rgba(17,33,54,0.18)] sm:rounded-md",
          sizeClass,
        ].join(" ")}
      >
        {!hideTitle ? (
          <div className="flex items-center justify-between border-b border-[#ececec] px-4 py-3">
            <h2 id={titleId} className="text-[14px] font-bold text-[#112136]">
              {title}
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="p-1 text-[#666] hover:text-[#112136]"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 p-1 text-[#666] hover:text-[#112136]"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>
        {footer ? (
          <div className="border-t border-[#ececec] px-4 py-3 sm:px-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
