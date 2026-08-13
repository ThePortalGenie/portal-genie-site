"use client";

import { useRef } from "react";
import { DOCUMENT_FOLDERS } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import type { DocumentFolderId } from "@/lib/demo/client-portal/types";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { PortalActionButton } from "@/components/demo/client-portal/PortalPrimitives";

export function UploadDocumentsModal() {
  const { state, dispatch } = useDemoPortal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFolder, uploadProgress, branding } = state;

  const simulateUpload = (file: File) => {
    dispatch({ type: "SET_UPLOAD_FEEDBACK", message: null });
    dispatch({ type: "SET_UPLOAD_PROGRESS", progress: 0 });

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 25;
      dispatch({ type: "SET_UPLOAD_PROGRESS", progress });

      if (progress >= 100) {
        window.clearInterval(interval);
        dispatch({
          type: "ADD_UPLOADED_DOCUMENT",
          document: {
            id: `doc-upload-${Date.now()}`,
            name: file.name,
            folderId: uploadFolder,
            size: file.size,
            uploadedAt: new Date().toISOString().slice(0, 10),
            isSessionUpload: true,
          },
        });
        dispatch({ type: "SET_UPLOAD_MODAL", open: false });
      }
    }, 250);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) {
      simulateUpload(file);
    }
  };

  const footer = (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => dispatch({ type: "SET_UPLOAD_MODAL", open: false })}
        className="border border-[#d9d9d9] bg-white px-4 py-2 text-[12px] font-semibold text-[#112136]"
      >
        Cancel
      </button>
      <PortalActionButton
        branding={branding}
        variant="primary"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Files
      </PortalActionButton>
    </div>
  );

  return (
    <DemoModal
      open={state.uploadModalOpen}
      onClose={() => dispatch({ type: "SET_UPLOAD_MODAL", open: false })}
      title="Upload your Documents"
      size="lg"
      footer={footer}
      overlayClassName="bg-white/70"
    >
      <p className="mb-4 text-[12px] leading-relaxed text-[#112136]">
        Please ensure your file size does not exceed 50MB. Accepted file types: PDF, PNG,
        JPEG and JPG. Please select a folder to upload to.
      </p>

      <label className="mb-4 block text-[12px]">
        <span className="mb-1 block font-semibold">Select folder</span>
        <select
          value={uploadFolder}
          onChange={(event) =>
            dispatch({
              type: "SET_UPLOAD_FOLDER",
              folderId: event.target.value as DocumentFolderId,
            })
          }
          className="h-9 w-full border border-[#d9d9d9] px-2"
        >
          {DOCUMENT_FOLDERS.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex min-h-[120px] w-full flex-col items-center justify-center border border-dashed border-[#bdbdbd] bg-[#fafafa] px-4 py-6 text-[12px] text-[#666]"
      >
        Drag &amp; drop files here or click to browse
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept=".pdf,.png,.jpg,.jpeg,image/png,image/jpeg,application/pdf"
        onChange={handleFileSelect}
      />

      {uploadProgress !== null ? (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] text-[#666]">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-2 bg-[#ececec]">
            <div
              className="h-full bg-[#00CCFF] transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : null}
    </DemoModal>
  );
}
