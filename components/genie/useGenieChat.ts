"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  GenieChatRequestError,
  getFriendlyGenieErrorMessage,
  sendGenieMessage,
} from "@/lib/genie/chat-client";
import type { GenieChatMessage } from "@/lib/genie/client-types";

function createMessageId(): string {
  return `genie-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useGenieChat() {
  const [messages, setMessages] = useState<GenieChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const hasUserMessage = messages.some((message) => message.role === "user");

  const cancelPendingRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const reset = useCallback(() => {
    cancelPendingRequest();
    setMessages([]);
    setDraft("");
    setIsLoading(false);
  }, [cancelPendingRequest]);

  const submitMessage = useCallback(async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || isLoading) {
      return;
    }

    cancelPendingRequest();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMessage: GenieChatMessage = {
      id: createMessageId(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await sendGenieMessage(message, {
        signal: abortController.signal,
      });

      if (abortController.signal.aborted) {
        return;
      }

      const assistantMessage: GenieChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      if (abortController.signal.aborted) {
        return;
      }

      const friendlyMessage =
        error instanceof GenieChatRequestError
          ? getFriendlyGenieErrorMessage(error)
          : "Sorry, I couldn't answer that right now. Please try again.";

      const errorMessage: GenieChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: friendlyMessage,
        isError: true,
      };
      setMessages((current) => [...current, errorMessage]);
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }

      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [cancelPendingRequest, isLoading]);

  return {
    messages,
    draft,
    isLoading,
    hasUserMessage,
    setDraft,
    submitMessage,
    reset,
  };
}

export function useGeniePanelEffects(options: {
  isOpen: boolean;
  onClose: () => void;
  launcherRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { isOpen, onClose, launcherRef } = options;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      launcherRef.current?.focus();
      return;
    }

    const focusable = panelRef.current?.querySelector<HTMLElement>(
      "textarea, button, [href], input",
    );
    focusable?.focus();
  }, [isOpen, launcherRef]);

  return { panelRef };
}

export function useGenieIds() {
  const panelId = useId();
  return { panelId };
}
