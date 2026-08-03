"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { headerActions, mainNavItems } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-button text-portal-navy transition-colors duration-200 hover:bg-background"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-muted/15 bg-surface shadow-[0_12px_32px_-16px_rgba(17,33,54,0.18)]"
        >
          <nav aria-label="Mobile navigation" className="px-6 py-6 md:px-8">
            <ul className="flex flex-col gap-1">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-button px-3 py-3 text-sm font-medium text-portal-navy transition-colors duration-200 hover:bg-background hover:text-portal-blue"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-muted/15 pt-6">
              <ButtonLink
                href={headerActions.startFree.href}
                variant="secondary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {headerActions.startFree.label}
              </ButtonLink>
              <ButtonLink
                href={headerActions.bookDemo.href}
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {headerActions.bookDemo.label}
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
