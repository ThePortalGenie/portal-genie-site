"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  GENIE_ENQUIRY_SUCCESS_HEADINGS,
  GENIE_ENQUIRY_SUCCESS_MESSAGES,
  type GenieEnquiryType,
} from "@/config/genie-enquiry";

type GenieEnquirySuccessProps = {
  enquiryType: GenieEnquiryType;
};

export function GenieEnquirySuccess({ enquiryType }: GenieEnquirySuccessProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-6 pb-[max(1rem,env(safe-area-inset-bottom))] outline-none sm:py-8"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-sm flex-col items-center rounded-card border border-portal-teal/30 bg-gradient-to-b from-portal-teal/10 to-background px-5 py-8 text-center shadow-[0_10px_30px_-20px_rgba(17,33,54,0.35)]">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-portal-teal/15 text-portal-teal">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-portal-navy">
          {GENIE_ENQUIRY_SUCCESS_HEADINGS[enquiryType]}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-portal-navy/80">
          {GENIE_ENQUIRY_SUCCESS_MESSAGES[enquiryType]}
        </p>
      </div>
    </div>
  );
}
