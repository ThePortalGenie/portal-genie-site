"use client";

import { useEffect, useState } from "react";
import { useDemoPortal } from "@/lib/demo/client-portal/context";

const FEEDBACK_MS = 2000;

function useActionFeedback() {
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) {
      return;
    }
    const timer = window.setTimeout(() => setFeedback(null), FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  return { feedback, showFeedback: setFeedback };
}

export function CustomiseHeaderActions() {
  const { state, dispatch } = useDemoPortal();
  const saveFeedback = useActionFeedback();
  const publishFeedback = useActionFeedback();
  const canPublish = state.savedCustomisation !== null;

  const handleSave = () => {
    dispatch({ type: "SAVE_CUSTOMISATION" });
    saveFeedback.showFeedback("saved");
  };

  const handlePublish = () => {
    if (!canPublish) {
      return;
    }
    dispatch({ type: "PUBLISH_CUSTOMISATION" });
    publishFeedback.showFeedback("published");
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex h-[30px] shrink-0 items-center rounded-md border border-muted/30 px-2.5 text-[11px] font-semibold text-portal-navy/80 transition-colors hover:border-portal-blue/30 hover:bg-portal-blue/5"
      >
        {saveFeedback.feedback === "saved" ? "✓ Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={handlePublish}
        disabled={!canPublish}
        className="inline-flex h-[30px] shrink-0 items-center rounded-md bg-portal-blue px-2.5 text-[11px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
        title={canPublish ? undefined : "Save your changes before publishing"}
      >
        {publishFeedback.feedback === "published" ? "✓ Published" : "Publish"}
      </button>
    </div>
  );
}
