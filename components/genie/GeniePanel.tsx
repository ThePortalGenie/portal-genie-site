"use client";

import { GenieComposer } from "@/components/genie/GenieComposer";
import { GenieHeader } from "@/components/genie/GenieHeader";
import { GenieMessages } from "@/components/genie/GenieMessages";
import { GenieSuggestedQuestions } from "@/components/genie/GenieSuggestedQuestions";
import type { GenieChatMessage } from "@/lib/genie/client-types";

type GeniePanelProps = {
  panelId: string;
  panelRef: React.RefObject<HTMLDivElement | null>;
  messages: GenieChatMessage[];
  draft: string;
  isLoading: boolean;
  showSuggestions: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onReset: () => void;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onSuggestedQuestion: (question: string) => void;
};

export function GeniePanel({
  panelId,
  panelRef,
  messages,
  draft,
  isLoading,
  showSuggestions,
  messagesEndRef,
  onClose,
  onReset,
  onDraftChange,
  onSubmit,
  onSuggestedQuestion,
}: GeniePanelProps) {
  return (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-labelledby="genie-panel-title"
      className={[
        "fixed z-[95] flex flex-col overflow-hidden border border-muted/20 bg-surface shadow-[0_20px_60px_-20px_rgba(17,33,54,0.35)] motion-reduce:transition-none",
        "inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] bottom-[max(5.5rem,env(safe-area-inset-bottom))] rounded-card sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(620px,calc(100dvh-7rem))] sm:w-[min(400px,calc(100vw-3rem))]",
      ].join(" ")}
    >
      <GenieHeader onClose={onClose} onReset={onReset} />
      <GenieMessages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <GenieSuggestedQuestions
        visible={showSuggestions}
        disabled={isLoading}
        onSelect={onSuggestedQuestion}
      />
      <GenieComposer
        value={draft}
        disabled={isLoading}
        onChange={onDraftChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
