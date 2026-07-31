"use client";

import { useScrollReveal, SCROLL_REVEAL_STAGGER_MS } from "@/hooks/useScrollReveal";

type ReleaseEntry = {
  date: string;
  title: string;
  summary: string;
  tag: string;
};

type ReleaseTimelineProps = {
  entries: readonly ReleaseEntry[];
};

export function ReleaseTimeline({ entries }: ReleaseTimelineProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div ref={ref} className="relative max-w-3xl">
      <div
        className="absolute bottom-0 left-[7px] top-0 w-px bg-muted/30"
        aria-hidden="true"
      />

      <ol className="space-y-10 lg:space-y-12">
        {entries.map((entry, index) => (
          <li
            key={entry.title}
            className={[
              "relative pl-8 transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            ].join(" ")}
            style={{
              transitionDelay: isVisible
                ? `${index * SCROLL_REVEAL_STAGGER_MS}ms`
                : undefined,
            }}
          >
            <span
              className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-portal-blue/30 bg-surface"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <time className="text-sm font-medium text-portal-navy/50">
                {entry.date}
              </time>
              <span className="rounded-badge bg-portal-blue/10 px-2.5 py-0.5 text-xs font-medium text-portal-blue">
                {entry.tag}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-semibold text-portal-navy">
              {entry.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-portal-navy/75 sm:text-base">
              {entry.summary}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
