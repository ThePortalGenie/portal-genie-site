"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function resetDocumentScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Resets document scroll on internal route changes so every navigation
 * starts at the top. Skips browser back/forward (popstate) navigation.
 */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);
  const isPopStateNavigation = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopStateNavigation.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isPopStateNavigation.current) {
      isPopStateNavigation.current = false;
      return;
    }

    resetDocumentScroll();
  }, [pathname]);

  return null;
}
