"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function resetDocumentScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToHashTarget(hash: string, behavior: ScrollBehavior = "auto") {
  const target = document.getElementById(hash);
  if (!target) {
    resetDocumentScroll();
    return;
  }

  target.scrollIntoView({ behavior, block: "start" });
}

/**
 * Resets document scroll on internal route changes so every navigation
 * starts at the top. Skips browser back/forward (popstate) navigation.
 * When the destination URL includes a hash, scrolls to that anchor instead.
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
    const hash = window.location.hash.replace(/^#/, "");

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (hash) {
        requestAnimationFrame(() => scrollToHashTarget(hash));
      }
      return;
    }

    if (isPopStateNavigation.current) {
      isPopStateNavigation.current = false;
      return;
    }

    if (hash) {
      requestAnimationFrame(() => scrollToHashTarget(hash));
      return;
    }

    resetDocumentScroll();
  }, [pathname]);

  return null;
}
