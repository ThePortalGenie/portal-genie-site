"use client";

import { useRef, useState } from "react";
import { GenieLauncher } from "@/components/genie/GenieLauncher";
import { GeniePanel } from "@/components/genie/GeniePanel";
import {
  useGenieChat,
  useGenieIds,
  useGeniePanelEffects,
} from "@/components/genie/useGenieChat";

export function Genie() {
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { panelId } = useGenieIds();
  const {
    messages,
    draft,
    isLoading,
    hasUserMessage,
    setDraft,
    submitMessage,
    reset,
  } = useGenieChat();

  const handleReset = () => {
    reset();
  };

  const { panelRef } = useGeniePanelEffects({
    isOpen,
    onClose: () => setIsOpen(false),
    launcherRef,
  });

  const handleSubmit = () => {
    void submitMessage(draft);
  };

  const handleSuggestedQuestion = (question: string) => {
    void submitMessage(question);
  };

  return (
    <>
      <GenieLauncher
        isOpen={isOpen}
        controlsId={panelId}
        buttonRef={launcherRef}
        onToggle={() => setIsOpen((open) => !open)}
      />
      {isOpen ? (
        <GeniePanel
          panelId={panelId}
          panelRef={panelRef}
          messages={messages}
          draft={draft}
          isLoading={isLoading}
          showSuggestions={!hasUserMessage && !isLoading}
          messagesEndRef={messagesEndRef}
          onClose={() => setIsOpen(false)}
          onReset={handleReset}
          onDraftChange={setDraft}
          onSubmit={handleSubmit}
          onSuggestedQuestion={handleSuggestedQuestion}
        />
      ) : null}
    </>
  );
}
