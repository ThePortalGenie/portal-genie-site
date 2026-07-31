"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { InitialsAvatar } from "@/components/customer-success/InitialsAvatar";
import { StarRating } from "@/components/customer-success/StarRating";

type TestimonialCardProps = {
  name: string;
  title?: string;
  date: string;
  excerpt: string;
  body: string;
  reveal?: boolean;
  revealDelay?: number;
};

function formatParagraphs(text: string) {
  return text.split("\n\n").filter(Boolean);
}

export function TestimonialCard({
  name,
  title,
  date,
  excerpt,
  body,
  reveal,
  revealDelay,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = excerpt.trim() !== body.trim();
  const displayText = expanded || !hasMore ? body : excerpt;

  return (
    <Card
      variant="surface"
      reveal={reveal}
      revealDelay={revealDelay}
      className="flex h-full flex-col"
    >
      <div className="flex items-start gap-4">
        <InitialsAvatar name={name} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-portal-navy">{name}</p>
          <StarRating className="mt-2 text-base tracking-wide" />
        </div>
      </div>

      {title ? (
        <h3 className="mt-6 text-base font-semibold text-portal-navy sm:text-lg">
          {title}
        </h3>
      ) : null}

      <div
        className={`${title ? "mt-3" : "mt-6"} space-y-4 text-sm leading-relaxed text-portal-navy/75 sm:text-base`}
      >
        {formatParagraphs(displayText).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-4 self-start text-sm font-medium text-portal-blue transition-colors duration-200 hover:text-portal-blue/80"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}

      <div className="mt-auto border-t border-muted/15 pt-5 mt-8 flex flex-wrap items-center justify-between gap-3">
        <time className="text-sm text-portal-navy/50">{date}</time>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-portal-navy/60">
          <BadgeCheck
            className="size-3.5 text-portal-teal"
            strokeWidth={2}
            aria-hidden="true"
          />
          Verified on Xero App Store
        </span>
      </div>
    </Card>
  );
}
