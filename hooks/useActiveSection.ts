"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in view for sticky sub-navigation.
 * Uses IntersectionObserver with a top-biased root margin to account for
 * sticky header + sub-nav height.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && sectionIds.includes(hash)) {
      setActiveId(hash);
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestId = "";
        let bestRatio = 0;

        for (const id of sectionIds) {
          const ratio = visibleRatios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        } else {
          const offset = window.scrollY + window.innerHeight * 0.35;
          let nearest = sectionIds[0];
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= offset) {
              nearest = id;
            }
          }
          setActiveId(nearest);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeId, setActiveId] as const;
}
