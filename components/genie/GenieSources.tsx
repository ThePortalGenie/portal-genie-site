import Link from "next/link";
import type { GenieSource } from "@/lib/genie/client-types";

type GenieSourcesProps = {
  sources: GenieSource[];
};

export function GenieSources({ sources }: GenieSourcesProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 border-t border-muted/15 pt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
        Sources
      </p>
      <ul className="mt-2 space-y-1.5">
        {sources.map((source) => (
          <li key={source.url}>
            <Link
              href={source.url}
              className="text-sm font-medium text-portal-blue underline decoration-portal-blue/25 underline-offset-2 hover:decoration-portal-blue"
            >
              {source.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
