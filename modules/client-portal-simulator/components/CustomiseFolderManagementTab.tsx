"use client";

import { useCallback, useRef, useState } from "react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import {
  canAllowUpload,
  canRenameFolder,
  getFolderNameValidationError,
} from "@/lib/demo/client-portal/folders";
import type { PortalFolderConfig } from "@/lib/demo/client-portal/types";
import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { DemoToggle } from "@/components/demo/client-portal/PortalSettingToggle";

function FolderTypeBadge({ type }: { type: PortalFolderConfig["type"] }) {
  const className =
    "inline-flex h-[21px] shrink-0 items-center rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-wide";

  if (type === "system") {
    return (
      <span className={`${className} bg-[#DCFCE7] text-[#15803D]`}>System</span>
    );
  }

  return (
    <span className={`${className} bg-[#DBEAFE] text-[#2563EB]`}>Custom</span>
  );
}

type DropTarget = {
  id: string;
  insertAfter: boolean;
};

function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  let node = element?.parentElement ?? null;

  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll") {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

type AddFolderFormState = {
  name: string;
  visible: boolean;
  allowUpload: boolean;
  isLandingFolder: boolean;
};

const EMPTY_ADD_FOLDER_FORM: AddFolderFormState = {
  name: "",
  visible: true,
  allowUpload: false,
  isLandingFolder: false,
};

export function CustomiseFolderManagementTab() {
  const { state, dispatch } = useDemoPortal();
  const [addFolderOpen, setAddFolderOpen] = useState(false);
  const [addFolderForm, setAddFolderForm] = useState<AddFolderFormState>(EMPTY_ADD_FOLDER_FORM);
  const [addFolderError, setAddFolderError] = useState<string | null>(null);
  const [renameError, setRenameError] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const autoScrollFrameRef = useRef<number | null>(null);

  const trimmedAddFolderName = addFolderForm.name.trim();
  const canAddFolder = trimmedAddFolderName.length > 0;

  const closeAddFolderForm = () => {
    setAddFolderOpen(false);
    setAddFolderForm(EMPTY_ADD_FOLDER_FORM);
    setAddFolderError(null);
  };

  const handleAddFolder = () => {
    const validationError = getFolderNameValidationError(state.portalFolders, addFolderForm.name);
    if (validationError) {
      setAddFolderError(validationError);
      return;
    }

    dispatch({
      type: "ADD_CUSTOM_PORTAL_FOLDER",
      name: trimmedAddFolderName,
      visible: addFolderForm.visible,
      allowUpload: addFolderForm.allowUpload,
      isLandingFolder: addFolderForm.isLandingFolder,
    });

    closeAddFolderForm();
  };

  const startRename = (folder: PortalFolderConfig) => {
    setEditingFolderId(folder.id);
    setRenameDraft(folder.name);
    setRenameError(null);
  };

  const cancelRename = () => {
    setEditingFolderId(null);
    setRenameDraft("");
    setRenameError(null);
  };

  const saveRename = (folderId: string) => {
    const validationError = getFolderNameValidationError(
      state.portalFolders,
      renameDraft,
      folderId,
    );
    if (validationError) {
      setRenameError(validationError);
      return;
    }

    dispatch({
      type: "UPDATE_PORTAL_FOLDER",
      folderId,
      patch: { name: renameDraft.trim() },
    });
    cancelRename();
  };

  const clearDragState = useCallback(() => {
    setDraggedId(null);
    setDropTarget(null);
    if (autoScrollFrameRef.current !== null) {
      cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
  }, []);

  const maybeAutoScroll = useCallback((clientY: number) => {
    const scrollParent = getScrollParent(listRef.current);
    if (!scrollParent) {
      return;
    }

    const rect = scrollParent.getBoundingClientRect();
    const edgeThreshold = 48;
    const scrollSpeed = 8;

    if (clientY < rect.top + edgeThreshold) {
      scrollParent.scrollTop -= scrollSpeed;
    } else if (clientY > rect.bottom - edgeThreshold) {
      scrollParent.scrollTop += scrollSpeed;
    }
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLIElement>, folderId: string) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";

      const rect = event.currentTarget.getBoundingClientRect();
      const insertAfter = event.clientY > rect.top + rect.height / 2;

      setDropTarget((current) => {
        if (current?.id === folderId && current.insertAfter === insertAfter) {
          return current;
        }
        return { id: folderId, insertAfter };
      });

      if (autoScrollFrameRef.current !== null) {
        cancelAnimationFrame(autoScrollFrameRef.current);
      }

      autoScrollFrameRef.current = requestAnimationFrame(() => {
        maybeAutoScroll(event.clientY);
      });
    },
    [maybeAutoScroll],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLIElement>, overId: string) => {
      event.preventDefault();
      const activeId = event.dataTransfer.getData("text/plain");

      if (!activeId || activeId === overId) {
        clearDragState();
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const insertAfter = event.clientY > rect.top + rect.height / 2;

      dispatch({
        type: "REORDER_PORTAL_FOLDERS",
        activeId,
        overId,
        insertAfter,
      });

      clearDragState();
    },
    [clearDragState, dispatch],
  );

  return (
    <>
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-portal-navy">Folders in the Client Portal</h3>
        <p className="mt-1 text-xs leading-relaxed text-portal-navy/60">
          System folders are built-in portal features. Custom folders can be renamed and configured
          for client document uploads.
        </p>
        <p className="mt-1 text-xs text-portal-navy/60">
          Drag folders to change the order they appear in the Client Portal.
        </p>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              if (addFolderOpen) {
                closeAddFolderForm();
              } else {
                setAddFolderOpen(true);
              }
            }}
            aria-expanded={addFolderOpen}
            className="rounded-lg border border-muted/30 px-3 py-2 text-sm font-medium text-portal-navy/80 hover:border-portal-blue/30 hover:bg-portal-blue/5"
          >
            + Add Folder
          </button>

          {addFolderOpen ? (
            <div className="mt-3 rounded-lg border border-muted/20 bg-background/40 p-4">
              <label className="block">
                <span className="text-xs font-medium text-portal-navy">Folder name</span>
                <input
                  type="text"
                  value={addFolderForm.name}
                  onChange={(event) => {
                    setAddFolderForm((current) => ({ ...current, name: event.target.value }));
                    if (addFolderError) {
                      setAddFolderError(null);
                    }
                  }}
                  placeholder="Enter folder name"
                  className="mt-1.5 w-full rounded-lg border border-muted/30 px-3 py-2 text-sm text-portal-navy placeholder:text-portal-navy/45"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && canAddFolder) {
                      handleAddFolder();
                    }
                    if (event.key === "Escape") {
                      closeAddFolderForm();
                    }
                  }}
                />
              </label>

              <div className="mt-4 space-y-2.5 text-[11px] text-portal-navy/80">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={addFolderForm.visible}
                    onChange={(event) =>
                      setAddFolderForm((current) => ({
                        ...current,
                        visible: event.target.checked,
                      }))
                    }
                  />
                  Visible to client
                </label>

                <label className="flex items-center gap-1.5">
                  <span>Enable client upload</span>
                  <DemoToggle
                    enabled={addFolderForm.allowUpload}
                    onChange={(allowUpload) =>
                      setAddFolderForm((current) => ({ ...current, allowUpload }))
                    }
                    ariaLabel="Enable client upload for new folder"
                  />
                </label>

                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={addFolderForm.isLandingFolder}
                    onChange={(event) =>
                      setAddFolderForm((current) => ({
                        ...current,
                        isLandingFolder: event.target.checked,
                      }))
                    }
                  />
                  Set as landing folder
                </label>
              </div>

              {addFolderError ? (
                <p className="mt-2 text-xs text-red-600/80" role="alert">
                  {addFolderError}
                </p>
              ) : null}

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAddFolderForm}
                  className="rounded-lg border border-muted/30 px-2.5 py-1.5 text-xs font-medium text-portal-navy/70 hover:bg-muted/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddFolder}
                  disabled={!canAddFolder}
                  className="rounded-lg bg-portal-blue px-2.5 py-1.5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add Folder
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <ul ref={listRef} className="mt-5 space-y-2 sm:mt-6">
          {state.portalFolders.map((folder) => {
            const isDragging = draggedId === folder.id;
            const showDropBefore =
              dropTarget?.id === folder.id && !dropTarget.insertAfter && draggedId !== folder.id;
            const showDropAfter =
              dropTarget?.id === folder.id && dropTarget.insertAfter && draggedId !== folder.id;
            const isEditing = editingFolderId === folder.id;
            const showAllowUpload = canAllowUpload(folder);

            return (
              <li
                key={folder.id}
                onDragOver={(event) => handleDragOver(event, folder.id)}
                onDrop={(event) => handleDrop(event, folder.id)}
                className={`relative rounded-lg border border-muted/20 bg-background/40 px-4 py-3 transition-all duration-150 ${
                  isDragging ? "scale-[1.01] opacity-60 shadow-md" : ""
                } ${!folder.visible ? "opacity-80" : ""}`}
              >
                {showDropBefore ? (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 left-4 right-4 h-0.5 rounded-full bg-portal-blue"
                  />
                ) : null}
                {showDropAfter ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full bg-portal-blue"
                  />
                ) : null}

                <div className="flex items-start gap-1.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <button
                        type="button"
                        draggable
                        title="Drag to reorder"
                        onDragStart={(event) => {
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", folder.id);
                          setDraggedId(folder.id);
                        }}
                        onDragEnd={clearDragState}
                        className="-ml-0.5 shrink-0 cursor-grab touch-none rounded p-0.5 text-portal-navy/40 hover:bg-muted/20 hover:text-portal-navy/60 active:cursor-grabbing"
                        aria-label={`Drag to reorder ${folder.name}`}
                      >
                        <GripVertical className="h-4 w-4" aria-hidden="true" />
                      </button>

                      {isEditing ? (
                        <input
                          value={renameDraft}
                          onChange={(event) => {
                            setRenameDraft(event.target.value);
                            if (renameError) {
                              setRenameError(null);
                            }
                          }}
                          className="min-w-0 flex-1 rounded-lg border border-muted/30 px-2 py-1 text-[14px] font-medium text-portal-navy"
                          autoFocus
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              saveRename(folder.id);
                            }
                            if (event.key === "Escape") {
                              cancelRename();
                            }
                          }}
                        />
                      ) : (
                        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-tight text-portal-navy">
                          {folder.name}
                        </p>
                      )}

                      <div className="ml-auto flex shrink-0 items-center gap-0.5">
                        <FolderTypeBadge type={folder.type} />
                        {!isEditing && folder.type === "custom" && canRenameFolder(folder) ? (
                          <button
                            type="button"
                            onClick={() => startRename(folder)}
                            className="rounded p-1 text-portal-navy/50 hover:bg-muted/20 hover:text-portal-navy/70"
                            aria-label={`Rename ${folder.name}`}
                          >
                            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2 pl-5">
                        <button
                          type="button"
                          onClick={() => saveRename(folder.id)}
                          className="rounded-lg border border-portal-blue/30 px-2.5 py-1 text-xs font-medium text-portal-navy hover:bg-portal-blue/5"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelRename}
                          className="rounded-lg border border-muted/30 px-2.5 py-1 text-xs font-medium text-portal-navy/70 hover:bg-muted/10"
                        >
                          Cancel
                        </button>
                        {renameError && editingFolderId === folder.id ? (
                          <p className="w-full text-xs text-red-600/80" role="alert">
                            {renameError}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    <div
                      className={`mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 pl-5 text-[11px] text-portal-navy/80 ${
                        showAllowUpload ? "" : "justify-between"
                      }`}
                    >
                      <label className="flex shrink-0 items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={folder.visible}
                          onChange={(event) =>
                            dispatch({
                              type: "UPDATE_PORTAL_FOLDER",
                              folderId: folder.id,
                              patch: { visible: event.target.checked },
                            })
                          }
                        />
                        Visible
                        {!folder.visible ? (
                          <span className="text-[10px] font-medium uppercase tracking-wide text-portal-navy/45">
                            Hidden
                          </span>
                        ) : null}
                      </label>

                      {showAllowUpload ? (
                        <label className="flex shrink-0 items-center gap-1.5">
                          <span>Allow Upload</span>
                          <DemoToggle
                            enabled={folder.allowUpload}
                            onChange={(allowUpload) =>
                              dispatch({
                                type: "UPDATE_PORTAL_FOLDER",
                                folderId: folder.id,
                                patch: { allowUpload },
                              })
                            }
                            ariaLabel={`Allow upload for ${folder.name}`}
                          />
                        </label>
                      ) : null}

                      <label
                        className={`flex shrink-0 items-center gap-1.5 ${
                          showAllowUpload ? "ml-auto" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="landing-folder"
                          checked={folder.isLandingFolder}
                          onChange={() =>
                            dispatch({ type: "SET_LANDING_FOLDER", folderId: folder.id })
                          }
                        />
                        Landing Folder
                      </label>
                    </div>
                  </div>

                  {folder.removable ? (
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "REMOVE_PORTAL_FOLDER", folderId: folder.id })
                      }
                      className="-mr-1 shrink-0 rounded p-1 text-portal-navy/50 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove ${folder.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
