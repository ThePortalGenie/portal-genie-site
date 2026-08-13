import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  FilePlus,
  FileText,
  Folder,
  List,
  NotebookPen,
} from "lucide-react";

export function getMobileFolderIcon(folderId: string): LucideIcon {
  switch (folderId) {
    case "invoices":
      return FileText;
    case "statement":
      return List;
    case "quotes":
      return FileCheck;
    case "credit-notes":
      return FilePlus;
    case "notes":
      return NotebookPen;
    default:
      return Folder;
  }
}
