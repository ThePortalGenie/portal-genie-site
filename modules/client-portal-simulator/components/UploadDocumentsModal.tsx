"use client";

import { useMemo, useRef } from "react";
import { getUploadablePortalFolders } from "@/lib/demo/client-portal/folders";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoModal } from "@/components/demo/client-portal/DemoModal";
import { PortalActionButton } from "@/components/demo/client-portal/PortalPrimitives";

export function UploadDocumentsModal() {
  const { state, dispatch } = useDemoPortal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFolder, uploadProgress, branding, portalFolders } = state;

  const uploadableFolders = useMemo(
    () => getUploadablePortalFolders(portalFolders),
    [portalFolders],
  );

  const selectedUploadFolder =
    uploadableFolders.find((folder) => folder.id === uploadFolder)?.id ??
    uploadableFolders[0]?.id ??
    "";

  const simulateUpload = (file: File) => {
    if (!selectedUploadFolder) {
      return;
    }

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
            folderId: selectedUploadFolder,
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
        disabled={!selectedUploadFolder}
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
        JPEG and JPG. Please select a custom folder that allows client uploads.
      </p>

      {uploadableFolders.length > 0 ? (
        <label className="mb-4 block text-[12px]">
          <span className="mb-1 block font-semibold">Select folder</span>
          <select
            value={selectedUploadFolder}
            onChange={(event) =>
              dispatch({
                type: "SET_UPLOAD_FOLDER",
                folderId: event.target.value,
              })
            }
            className="h-9 w-full border border-[#d9d9d9] px-2"
          >
            {uploadableFolders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="mb-4 text-[12px] text-[#666]">
          No custom folders currently allow client uploads. Enable Allow Upload on a custom
          folder in Folder Management.
        </p>
      )}

      <button
        type="button"
        disabled={!selectedUploadFolder}
        onClick={() => fileInputRef.current?.click()}
        className="flex min-h-[120px] w-full flex-col items-center justify-center border border-dashed border-[#bdbdbd] bg-[#fafafa] px-4 py-6 text-[12px] text-[#666] disabled:cursor-not-allowed disabled:opacity-50"
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
