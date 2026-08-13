"use client";

import { Eye, FileText, FolderOpen } from "lucide-react";
import { useMemo, useRef } from "react";
import { DOCUMENT_FOLDERS } from "@/lib/demo/client-portal/constants";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { formatDate, formatFileSize } from "@/lib/demo/client-portal/format";
import {
  DemoSectionCard,
  StatusBadge,
} from "@/components/demo/client-portal/DemoSectionParts";
import type { DocumentFolderId } from "@/lib/demo/client-portal/types";

export function AgreementsSection() {
  const { state, dispatch } = useDemoPortal();
  const { branding, agreements } = state;

  return (
    <DemoSectionCard title="Agreements" description="Service agreements on file for your business.">
      <div className="overflow-x-auto rounded-lg border border-muted/20">
        <table className="min-w-[640px] w-full text-sm">
          <thead style={{ backgroundColor: branding.tableHeadingBg }}>
            <tr>
              {["Agreement", "Date", "Status", "Actions"].map((heading) => (
                <th
                  key={heading}
                  className="px-3 py-3 text-left font-semibold"
                  style={{ color: branding.tableHeadingText }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ color: branding.tableBodyText }}>
            {agreements.map((agreement) => (
              <tr key={agreement.id} className="border-t border-muted/15">
                <td className="px-3 py-3 font-medium">{agreement.title}</td>
                <td className="px-3 py-3">{formatDate(agreement.date)}</td>
                <td className="px-3 py-3">
                  <StatusBadge
                    label={agreement.status}
                    tone="agreement"
                    status={agreement.status}
                  />
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "VIEW_AGREEMENT", agreementId: agreement.id })
                    }
                    className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs font-medium text-portal-blue hover:bg-portal-blue/10"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoSectionCard>
  );
}

export function FinancialStatementsSection() {
  const { state, dispatch } = useDemoPortal();
  const { financialStatements } = state;

  return (
    <DemoSectionCard
      title="Financial Statements"
      description="Browse annual and management reports shared with you."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {financialStatements.map((folder) => (
          <div
            key={folder.id}
            className="rounded-lg border border-muted/20 bg-background p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-portal-blue" aria-hidden="true" />
              <h3 className="font-semibold text-portal-navy">{folder.year}</h3>
            </div>
            <ul className="space-y-2">
              {folder.documents.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "VIEW_FINANCIAL_DOC",
                        payload: { folderId: folder.id, docId: doc.id },
                      })
                    }
                    className="flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-sm text-portal-navy/80 transition-colors hover:bg-surface hover:text-portal-blue"
                  >
                    <FileText className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{doc.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DemoSectionCard>
  );
}

export function NotesSection() {
  const { state } = useDemoPortal();
  const { notes } = state;

  return (
    <DemoSectionCard
      title="Notes"
      description="Messages and updates from your accounting team."
    >
      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-lg border border-muted/20 bg-background px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-portal-navy">{note.author}</p>
              <p className="text-xs text-portal-navy/55">
                {formatDate(note.date)} · {note.role}
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-portal-navy/75">{note.content}</p>
          </li>
        ))}
      </ul>
    </DemoSectionCard>
  );
}

export function DocumentsSection() {
  const { state, dispatch } = useDemoPortal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    branding,
    documents,
    uploadFolder,
    uploadProgress,
    uploadFeedback,
    selectedDocumentFolder,
  } = state;

  const folderDocuments = useMemo(() => {
    if (!selectedDocumentFolder) {
      return [];
    }
    return documents.filter((doc) => doc.folderId === selectedDocumentFolder);
  }, [documents, selectedDocumentFolder]);

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

  return (
    <div className="space-y-6">
      <DemoSectionCard
        title="Upload Documents"
        description="Share documents with your accountant. Files remain in your browser for this demo."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-portal-navy/70">Folder</span>
            <select
              value={uploadFolder}
              onChange={(event) =>
                dispatch({
                  type: "SET_UPLOAD_FOLDER",
                  folderId: event.target.value as DocumentFolderId,
                })
              }
              className="w-full rounded-lg border border-muted/30 px-3 py-2 text-sm"
            >
              {DOCUMENT_FOLDERS.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-button bg-portal-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-portal-blue/90"
            >
              Choose file to upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {uploadProgress !== null ? (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-portal-navy/65">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/30">
              <div
                className="h-full bg-portal-blue transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : null}

        {uploadFeedback ? (
          <p className="mt-3 text-sm text-portal-teal" role="status">
            {uploadFeedback}
          </p>
        ) : null}
      </DemoSectionCard>

      <DemoSectionCard
        title="Document Browser"
        description="Browse folders and open shared documents."
      >
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <ul className="space-y-1">
            {DOCUMENT_FOLDERS.map((folder) => {
              const count = documents.filter((doc) => doc.folderId === folder.id).length;
              const selected = selectedDocumentFolder === folder.id;
              return (
                <li key={folder.id}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_DOCUMENT_FOLDER", folderId: folder.id })
                    }
                    className={[
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      selected
                        ? "bg-portal-blue/10 font-medium text-portal-blue"
                        : "text-portal-navy/75 hover:bg-background",
                    ].join(" ")}
                  >
                    <span>{folder.label}</span>
                    <span className="text-xs opacity-70">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="rounded-lg border border-muted/20 bg-background p-4">
            {!selectedDocumentFolder ? (
              <p className="text-sm text-portal-navy/60">Select a folder to view documents.</p>
            ) : folderDocuments.length === 0 ? (
              <p className="text-sm text-portal-navy/60">No documents in this folder yet.</p>
            ) : (
              <ul className="space-y-2">
                {folderDocuments.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "VIEW_DOCUMENT", documentId: doc.id })}
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-surface"
                      style={{ color: branding.tableBodyText }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4 text-portal-blue" aria-hidden="true" />
                        {doc.name}
                      </span>
                      <span className="text-xs text-portal-navy/55">
                        {doc.size ? formatFileSize(doc.size) : "—"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DemoSectionCard>
    </div>
  );
}
