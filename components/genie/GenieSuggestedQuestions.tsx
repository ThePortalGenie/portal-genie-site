"use client";

import { GENIE_SUGGESTED_QUESTIONS } from "@/lib/genie/suggested-questions";

type GenieSuggestedQuestionsProps = {
  visible: boolean;
  disabled: boolean;
  onSelect: (question: string) => void;
};

export function GenieSuggestedQuestions({
  visible,
  disabled,
  onSelect,
}: GenieSuggestedQuestionsProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="border-t border-muted/15 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-portal-navy/55">
        Suggested questions
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {GENIE_SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="rounded-button border border-muted/25 bg-background px-3 py-2 text-left text-xs leading-snug text-portal-navy transition-colors duration-200 hover:border-portal-blue/30 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
