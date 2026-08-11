"use client";

import { useEffect, useRef } from "react";
import type { GenieChatMessage } from "@/lib/genie/client-types";
import { GenieMessage } from "@/components/genie/GenieMessage";

type GenieMessagesProps = {
  messages: GenieChatMessage[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

function GenieThinkingIndicator() {
  return (
    <div
      className="flex justify-start"
      role="status"
      aria-live="polite"
      aria-label="Genie is thinking"
    >
      <div className="rounded-card rounded-bl-sm border border-muted/20 bg-surface px-4 py-3">
        <p className="text-sm text-portal-navy/75">Genie is thinking...</p>
        <div
          className="mt-2 flex items-center gap-1.5 motion-reduce:hidden"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-portal-teal [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-portal-teal [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-portal-teal [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export function GenieWelcome() {
  return (
    <div className="rounded-card border border-muted/20 bg-background px-4 py-3 text-sm leading-relaxed text-portal-navy/85">
      <p>Hi, I&apos;m Genie. I can help answer questions about The Portal Genie.</p>
      <p className="mt-2">What would you like to know?</p>
    </div>
  );
}

export function GenieMessages({
  messages,
  isLoading,
  messagesEndRef,
}: GenieMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      shouldAutoScrollRef.current = distanceFromBottom < 80;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, messagesEndRef]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Genie conversation"
    >
      <div className="space-y-4">
        {messages.length === 0 ? <GenieWelcome /> : null}
        {messages.map((message) => (
          <GenieMessage key={message.id} message={message} />
        ))}
        {isLoading ? <GenieThinkingIndicator /> : null}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
