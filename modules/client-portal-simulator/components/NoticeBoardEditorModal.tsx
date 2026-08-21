"use client";

import { useRef, useState } from "react";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { createCustomNoticeBoard } from "@/lib/demo/client-portal/notice-boards";
import type { NoticeBoard } from "@/lib/demo/client-portal/types";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export type NoticeBoardEditorValues = {
  name: string;
  headline: string;
  body: string;
  ctaText: string;
  destinationUrl: string;
  imageUrl: string | null;
};

type NoticeBoardEditorModalProps = {
  open: boolean;
  onClose: () => void;
  initialBoard?: NoticeBoard | null;
  onSave: (board: NoticeBoard, setActive: boolean) => void;
};

const EMPTY_VALUES: NoticeBoardEditorValues = {
  name: "",
  headline: "",
  body: "",
  ctaText: "",
  destinationUrl: "",
  imageUrl: null,
};

function getInitialValues(initialBoard?: NoticeBoard | null): NoticeBoardEditorValues {
  if (!initialBoard) {
    return EMPTY_VALUES;
  }

  return {
    name: initialBoard.name,
    headline: initialBoard.headline ?? "",
    body: initialBoard.body ?? "",
    ctaText: initialBoard.ctaText ?? "",
    destinationUrl: initialBoard.destinationUrl ?? "",
    imageUrl: initialBoard.imageUrl ?? null,
  };
}

export function NoticeBoardEditorModal({
  open,
  onClose,
  initialBoard,
  onSave,
}: NoticeBoardEditorModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(() => getInitialValues(initialBoard));
  const [error, setError] = useState<string | null>(null);
  const [setActiveOnSave, setSetActiveOnSave] = useState(true);
  const isEditing = Boolean(initialBoard?.removable);

  const handleClose = () => {
    if (values.imageUrl?.startsWith("blob:") && values.imageUrl !== initialBoard?.imageUrl) {
      URL.revokeObjectURL(values.imageUrl);
    }
    onClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Please choose a PNG, JPG, WebP, or SVG image.");
      return;
    }
    if (values.imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(values.imageUrl);
    }
    setValues((current) => ({ ...current, imageUrl: URL.createObjectURL(file) }));
    setError(null);
  };

  const removeImage = () => {
    if (values.imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(values.imageUrl);
    }
    setValues((current) => ({ ...current, imageUrl: null }));
  };

  const handleSave = () => {
    if (!values.name.trim()) {
      setError("Enter a notice board name.");
      return;
    }

    if (initialBoard?.removable) {
      onSave(
        {
          ...initialBoard,
          name: values.name.trim(),
          headline: values.headline.trim() || values.name.trim(),
          body: values.body.trim(),
          ctaText: values.ctaText.trim() || undefined,
          destinationUrl: values.destinationUrl.trim() || undefined,
          imageUrl: values.imageUrl,
        },
        setActiveOnSave,
      );
    } else {
      onSave(
        createCustomNoticeBoard({
          name: values.name,
          headline: values.headline,
          body: values.body,
          ctaText: values.ctaText,
          destinationUrl: values.destinationUrl,
          imageUrl: values.imageUrl,
        }),
        setActiveOnSave,
      );
    }

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <DemoModal
      open={open}
      onClose={handleClose}
      title={isEditing ? "Edit Notice Board" : "Create Notice Board"}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border border-portal-blue/30 bg-portal-blue/10 px-3 py-2 text-sm font-medium text-portal-navy"
          >
            Save
          </button>
        </div>
      }
    >
      <div className="space-y-3 text-sm">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">
            Notice Board Name
          </span>
          <input
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">Headline</span>
          <input
            value={values.headline}
            onChange={(event) =>
              setValues((current) => ({ ...current, headline: event.target.value }))
            }
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">
            Supporting text
          </span>
          <textarea
            value={values.body}
            onChange={(event) => setValues((current) => ({ ...current, body: event.target.value }))}
            rows={3}
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">
            Call-to-action text
          </span>
          <input
            value={values.ctaText}
            onChange={(event) =>
              setValues((current) => ({ ...current, ctaText: event.target.value }))
            }
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">
            Destination URL (optional)
          </span>
          <input
            value={values.destinationUrl}
            onChange={(event) =>
              setValues((current) => ({ ...current, destinationUrl: event.target.value }))
            }
            className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            placeholder="https://"
          />
        </label>
        <div>
          <span className="mb-1 block text-xs font-medium text-portal-navy/70">
            Image (optional)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30"
            >
              Upload Image
            </button>
            {values.imageUrl ? (
              <button
                type="button"
                onClick={removeImage}
                className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/70"
              >
                Remove Image
              </button>
            ) : null}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              className="sr-only"
              onChange={handleImageUpload}
            />
          </div>
          {values.imageUrl ? (
            <div className="mt-3 aspect-square w-full max-w-[180px] overflow-hidden rounded-lg border border-muted/20 bg-muted/10">
              <img
                src={values.imageUrl}
                alt="Notice board preview"
                className="h-full w-full object-contain object-center"
              />
            </div>
          ) : null}
        </div>
        {!isEditing ? (
          <label className="flex items-center gap-2 text-xs text-portal-navy/70">
            <input
              type="checkbox"
              checked={setActiveOnSave}
              onChange={(event) => setSetActiveOnSave(event.target.checked)}
            />
            Set as active notice board after saving
          </label>
        ) : null}
        {error ? (
          <p className="text-xs text-red-600/80" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </DemoModal>
  );
}
