import type { PortalFolderConfig } from "@/modules/client-portal-simulator/types";

export function createInitialPortalFolders(): PortalFolderConfig[] {
  return [
    {
      id: "invoices",
      name: "Invoices",
      type: "system",
      visible: true,
      allowUpload: false,
      isLandingFolder: true,
      removable: false,
    },
    {
      id: "statement",
      name: "Statement",
      type: "system",
      visible: true,
      allowUpload: false,
      isLandingFolder: false,
      removable: false,
    },
    {
      id: "quotes",
      name: "Quotes",
      type: "system",
      visible: true,
      allowUpload: false,
      isLandingFolder: false,
      removable: false,
    },
    {
      id: "credit-notes",
      name: "Credit Notes",
      type: "system",
      visible: true,
      allowUpload: false,
      isLandingFolder: false,
      removable: false,
    },
    {
      id: "agreements",
      name: "Agreements",
      type: "custom",
      visible: true,
      allowUpload: true,
      isLandingFolder: false,
      removable: false,
    },
    {
      id: "financial-statements",
      name: "Financial Statements",
      type: "custom",
      visible: true,
      allowUpload: false,
      isLandingFolder: false,
      removable: false,
    },
    {
      id: "notes",
      name: "Notes",
      type: "system",
      visible: true,
      allowUpload: false,
      isLandingFolder: false,
      removable: false,
    },
  ];
}

export function getVisiblePortalFolders(folders: PortalFolderConfig[]): PortalFolderConfig[] {
  return folders.filter((folder) => folder.visible);
}

export function canAllowUpload(folder: PortalFolderConfig): boolean {
  return folder.type === "custom";
}

export function canRenameFolder(folder: PortalFolderConfig): boolean {
  return folder.type === "custom";
}

export function reorderPortalFolders(
  folders: PortalFolderConfig[],
  activeId: string,
  overId: string,
  insertAfter: boolean,
): PortalFolderConfig[] {
  if (activeId === overId) {
    return folders;
  }

  const fromIndex = folders.findIndex((folder) => folder.id === activeId);
  let toIndex = folders.findIndex((folder) => folder.id === overId);

  if (fromIndex === -1 || toIndex === -1) {
    return folders;
  }

  const next = [...folders];
  const [moved] = next.splice(fromIndex, 1);

  if (fromIndex < toIndex) {
    toIndex -= 1;
  }

  if (insertAfter) {
    toIndex += 1;
  }

  next.splice(toIndex, 0, moved);
  return next;
}

export function normalizePortalFolder(folder: PortalFolderConfig): PortalFolderConfig {
  if (folder.type === "system") {
    return { ...folder, allowUpload: false };
  }
  return folder;
}

export function normalizePortalFolders(folders: PortalFolderConfig[]): PortalFolderConfig[] {
  return folders.map(normalizePortalFolder);
}

export function getUploadablePortalFolders(folders: PortalFolderConfig[]): PortalFolderConfig[] {
  return normalizePortalFolders(folders).filter(
    (folder) => folder.type === "custom" && folder.allowUpload,
  );
}

export function getLandingFolderId(folders: PortalFolderConfig[]): string {
  return folders.find((folder) => folder.isLandingFolder)?.id ?? "invoices";
}

export function getFolderNameValidationError(
  folders: PortalFolderConfig[],
  name: string,
  excludeFolderId?: string,
): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Enter a folder name.";
  }

  const normalized = trimmed.toLowerCase();
  const duplicate = folders.some(
    (folder) =>
      folder.id !== excludeFolderId && folder.name.trim().toLowerCase() === normalized,
  );

  if (duplicate) {
    return "A folder with this name already exists.";
  }

  return null;
}

export function isDedicatedPortalSection(sectionId: string): boolean {
  return [
    "invoices",
    "statement",
    "quotes",
    "credit-notes",
    "agreements",
    "financial-statements",
    "notes",
  ].includes(sectionId);
}

export function createCustomPortalFolder(
  name: string,
  options?: Partial<Pick<PortalFolderConfig, "visible" | "allowUpload" | "isLandingFolder">>,
): PortalFolderConfig {
  const trimmed = name.trim();
  const slug = trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const uniqueSuffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now());

  return {
    id: `custom-${slug || "folder"}-${uniqueSuffix}`,
    name: trimmed,
    type: "custom",
    visible: options?.visible ?? true,
    allowUpload: options?.allowUpload ?? false,
    isLandingFolder: options?.isLandingFolder ?? false,
    removable: true,
  };
}
