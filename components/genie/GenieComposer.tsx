"use client";

import { SendHorizontal } from "lucide-react";
import { GENIE_MAX_MESSAGE_LENGTH } from "@/config/genie";

type GenieComposerProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function GenieComposer({
  value,
  disabled,
  onChange,
  onSubmit,
}: GenieComposerProps) {
  const remaining = GENIE_MAX_MESSAGE_LENGTH - value.length;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="shrink-0 border-t border-muted/15 bg-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <label htmlFor="genie-composer-input" className="sr-only">
        Ask about The Portal Genie
      </label>
      <div className="flex items-end gap-2">
        <textarea
          id="genie-composer-input"
          value={value}
          disabled={disabled}
          rows={2}
          maxLength={GENIE_MAX_MESSAGE_LENGTH}
          placeholder="Ask about The Portal Genie..."
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[2.75rem] flex-1 resize-none rounded-button border border-muted/30 bg-background px-3 py-2 text-sm leading-relaxed text-portal-navy placeholder:text-portal-navy/45 focus:border-portal-blue/50 focus:outline-none focus:ring-2 focus:ring-portal-blue/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="button"
          aria-label="Send message"
          disabled={disabled || value.trim().length === 0}
          onClick={onSubmit}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-portal-blue text-white transition-colors duration-200 hover:bg-portal-blue/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-1.5 text-right text-[11px] text-portal-navy/45" aria-live="polite">
        {remaining} characters remaining
      </p>
    </div>
  );
}
