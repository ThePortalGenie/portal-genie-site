"use client";

import { useCallback, useEffect, useMemo, useRef, type MouseEvent } from "react";
import { featuresPage } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { navItemClasses } from "@/components/navigation/navStyles";
import { useActiveSection } from "@/hooks/useActiveSection";

export function FeatureNavigation() {
  const sectionIds = useMemo(
    () => featuresPage.navigation.map((item) => item.id),
    [],
  );
  const [activeId, setActiveId] = useActiveSection(sectionIds);
  const listRef = useRef<HTMLUListElement>(null);
  const skipHashSync = useRef(false);

  useEffect(() => {
    if (!activeId || skipHashSync.current) return;

    const nextHash = `#${activeId}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [activeId]);

  useEffect(() => {
    const activeLink = listRef.current?.querySelector<HTMLElement>(
      `[data-section-id="${activeId}"]`,
    );
    activeLink?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const section = document.getElementById(id);
      if (!section) return;

      setActiveId(id);
      skipHashSync.current = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);

      window.setTimeout(() => {
        skipHashSync.current = false;
      }, 800);
    },
    [setActiveId],
  );

  return (
    <nav
      className="sticky top-16 z-40 border-b border-muted/15 bg-surface/95 backdrop-blur-sm supports-[backdrop-filter]:bg-surface/80 sm:top-[72px] lg:top-20"
      aria-label="Feature sections"
    >
      <Container>
        <ul
          ref={listRef}
          className="-mx-4 flex gap-1 overflow-x-auto overscroll-x-contain px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:py-2.5 lg:py-3"
        >
          {featuresPage.navigation.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-section-id={item.id}
                  className={navItemClasses(isActive, { compact: true })}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => handleClick(event, item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
