import { BANNER_ASSETS } from "@/modules/client-portal-simulator/data/constants";
import type { NoticeBoard } from "@/modules/client-portal-simulator/types";

export const DEFAULT_NOTICE_BOARD_ID = "portal-genie";

export function createInitialNoticeBoards(): NoticeBoard[] {
  return [
    {
      id: "portal-genie",
      name: "Portal Genie Promotion",
      kind: "preset-image",
      imageUrl: BANNER_ASSETS["portal-genie"].image ?? null,
      imageAlt: BANNER_ASSETS["portal-genie"].alt,
      removable: false,
    },
    {
      id: "tax-season",
      name: "Tax Season Reminder",
      kind: "preset-css",
      headline: "Provisional tax deadline approaching",
      body: "Ensure your supporting documents are uploaded before 28 August to avoid delays.",
      gradient: "bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6]",
      removable: false,
    },
    {
      id: "refer-client",
      name: "Refer a Client",
      kind: "preset-css",
      headline: "Refer a client",
      body: "Refer a business to your accountant and receive a thank-you credit on your next invoice.",
      gradient: "bg-gradient-to-br from-[#059669] to-[#34D399]",
      removable: false,
    },
    {
      id: "new-service",
      name: "New Service Announcement",
      kind: "preset-css",
      headline: "New service announcement",
      body: "CFO advisory sessions are now available for growing businesses.",
      gradient: "bg-gradient-to-br from-[#112136] to-[#0055FF]",
      removable: false,
    },
  ];
}

export function getActiveNoticeBoard(
  boards: NoticeBoard[],
  activeNoticeBoardId: string,
): NoticeBoard {
  return (
    boards.find((board) => board.id === activeNoticeBoardId) ??
    boards.find((board) => board.id === DEFAULT_NOTICE_BOARD_ID) ??
    boards[0]
  );
}

export function createCustomNoticeBoard(input: {
  name: string;
  headline: string;
  body: string;
  ctaText?: string;
  destinationUrl?: string;
  imageUrl?: string | null;
}): NoticeBoard {
  const trimmedName = input.name.trim() || "Custom Notice Board";
  const slug = trimmedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const uniqueSuffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now());

  return {
    id: `notice-${slug || "board"}-${uniqueSuffix}`,
    name: trimmedName,
    kind: "custom",
    headline: input.headline.trim() || trimmedName,
    body: input.body.trim(),
    ctaText: input.ctaText?.trim() || undefined,
    destinationUrl: input.destinationUrl?.trim() || undefined,
    imageUrl: input.imageUrl ?? null,
    removable: true,
  };
}

export function revokeNoticeBoardImages(boards: NoticeBoard[]): void {
  for (const board of boards) {
    if (board.imageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(board.imageUrl);
    }
  }
}
