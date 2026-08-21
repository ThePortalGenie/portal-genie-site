"use client";

import { useRef } from "react";
import {
  WELCOME_MESSAGE_PLACEHOLDERS,
  insertWelcomePlaceholder,
} from "@/modules/client-portal-simulator/utils/welcome-message";

type WelcomeMessageFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WelcomeMessageField({ value, onChange }: WelcomeMessageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const insertPlaceholder = (placeholder: string) => {
    const input = inputRef.current;
    const { value: nextValue, cursor } = insertWelcomePlaceholder(
      value,
      placeholder,
      input?.selectionStart ?? null,
      input?.selectionEnd ?? null,
    );
    onChange(nextValue);
    requestAnimationFrame(() => {
      input?.focus();
      input?.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-portal-navy/70">Welcome Message</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
        />
      </label>

      <p className="mt-2 text-xs leading-relaxed text-portal-navy/55">
        Personalise your welcome message using customer details.
      </p>

      <div className="mt-2.5">
        <p className="mb-1.5 text-[11px] font-medium text-portal-navy/60">Insert:</p>
        <div className="flex flex-wrap gap-2">
          {WELCOME_MESSAGE_PLACEHOLDERS.map((placeholder) => (
            <button
              key={placeholder}
              type="button"
              onClick={() => insertPlaceholder(placeholder)}
              className="rounded-md border border-muted/30 bg-white px-2 py-1 font-mono text-[11px] text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:bg-[#fafafa]"
            >
              {placeholder}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
