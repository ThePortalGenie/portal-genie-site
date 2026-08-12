"use client";

import { GENIE_ENQUIRY_ACTIONS, type GenieEnquiryType } from "@/config/genie-enquiry";

type GenieEnquiryActionsProps = {
  visible: boolean;
  disabled: boolean;
  onSelect: (type: GenieEnquiryType) => void;
};

export function GenieEnquiryActions({
  visible,
  disabled,
  onSelect,
}: GenieEnquiryActionsProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="shrink-0 border-t border-muted/15 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
        Get in touch
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {GENIE_ENQUIRY_ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(action.type)}
            className="rounded-button border border-portal-blue/20 bg-portal-blue/5 px-3 py-2 text-left text-xs font-medium leading-snug text-portal-blue transition-colors duration-200 hover:border-portal-blue/35 hover:bg-portal-blue/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
