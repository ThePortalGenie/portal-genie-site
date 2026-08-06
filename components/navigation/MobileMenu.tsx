"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getVisibleMainNavItems, headerActions } from "@/content/navigation";
import {
  mobileNavConversionItemClasses,
  mobileNavItemClasses,
} from "@/components/navigation/navStyles";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

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

  const closeMenu = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

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
          <nav aria-label="Mobile navigation" className="px-4 py-4 sm:px-6 sm:py-5 md:px-8">
            <ul className="flex flex-col gap-0.5">
              {getVisibleMainNavItems().map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={mobileNavItemClasses(isActive)}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <li
                aria-hidden="true"
                className="my-4 list-none border-t border-muted/15"
              />

              <li>
                <Link
                  href={headerActions.startFree.href}
                  className={mobileNavConversionItemClasses()}
                  onClick={closeMenu}
                >
                  {headerActions.startFree.label}
                </Link>
              </li>
              <li>
                <Link
                  href={headerActions.bookDemo.href}
                  className={mobileNavConversionItemClasses()}
                  onClick={closeMenu}
                >
                  {headerActions.bookDemo.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
