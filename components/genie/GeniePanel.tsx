"use client";

import { GenieComposer } from "@/components/genie/GenieComposer";
import { GenieEnquiryActions } from "@/components/genie/GenieEnquiryActions";
import {
  GenieEnquiryForm,
  type GenieEnquiryFormState,
} from "@/components/genie/GenieEnquiryForm";
import { GenieHeader } from "@/components/genie/GenieHeader";
import { GenieMessages } from "@/components/genie/GenieMessages";
import { GenieSuggestedQuestions } from "@/components/genie/GenieSuggestedQuestions";
import type { GenieEnquiryType } from "@/config/genie-enquiry";
import type { GenieChatMessage } from "@/lib/genie/client-types";

type GeniePanelProps = {
  panelId: string;
  panelRef: React.RefObject<HTMLDivElement | null>;
  messages: GenieChatMessage[];
  draft: string;
  isLoading: boolean;
  showSuggestions: boolean;
  showEnquiryActions: boolean;
  enquiryType: GenieEnquiryType | null;
  enquiryFormValues: GenieEnquiryFormState;
  enquiryFieldErrors: Partial<Record<keyof GenieEnquiryFormState, string>>;
  enquiryFormError: string | null;
  enquirySuccessMessage: string | null;
  isEnquirySubmitting: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onReset: () => void;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onSuggestedQuestion: (question: string) => void;
  onOpenEnquiry: (type: GenieEnquiryType) => void;
  onCloseEnquiry: () => void;
  onEnquiryFieldChange: (field: keyof GenieEnquiryFormState, value: string) => void;
  onEnquirySubmit: () => void;
};

export function GeniePanel({
  panelId,
  panelRef,
  messages,
  draft,
  isLoading,
  showSuggestions,
  showEnquiryActions,
  enquiryType,
  enquiryFormValues,
  enquiryFieldErrors,
  enquiryFormError,
  enquirySuccessMessage,
  isEnquirySubmitting,
  messagesEndRef,
  onClose,
  onReset,
  onDraftChange,
  onSubmit,
  onSuggestedQuestion,
  onOpenEnquiry,
  onCloseEnquiry,
  onEnquiryFieldChange,
  onEnquirySubmit,
}: GeniePanelProps) {
  const composerDisabled = isLoading || isEnquirySubmitting || Boolean(enquiryType);

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
        successMessage={enquirySuccessMessage}
      />
      <GenieSuggestedQuestions
        visible={showSuggestions}
        disabled={isLoading || isEnquirySubmitting}
        onSelect={onSuggestedQuestion}
      />
      <GenieEnquiryActions
        visible={showEnquiryActions}
        disabled={isLoading || isEnquirySubmitting}
        onSelect={onOpenEnquiry}
      />
      {enquiryType ? (
        <GenieEnquiryForm
          enquiryType={enquiryType}
          values={enquiryFormValues}
          fieldErrors={enquiryFieldErrors}
          formError={enquiryFormError}
          isSubmitting={isEnquirySubmitting}
          onChange={onEnquiryFieldChange}
          onSubmit={onEnquirySubmit}
          onBack={onCloseEnquiry}
        />
      ) : (
        <GenieComposer
          value={draft}
          disabled={composerDisabled}
          onChange={onDraftChange}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
