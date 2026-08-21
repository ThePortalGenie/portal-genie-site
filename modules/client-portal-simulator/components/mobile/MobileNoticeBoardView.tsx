"use client";

import { getActiveNoticeBoard } from "@/modules/client-portal-simulator/utils/notice-boards";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";
import {
  NoticeBoardCanvas,
  NoticeBoardCreative,
} from "@/modules/client-portal-simulator/components/DemoPortalAdvertisingPanel";

export function MobileNoticeBoardView() {
  const { state } = useDemoPortal();
  const board = getActiveNoticeBoard(state.noticeBoards, state.activeNoticeBoardId);

  return (
    <div className="p-3">
      <h2 className="mb-3 text-[15px] font-bold text-[#112136]">Notice Board</h2>
      <div className="mx-auto w-full max-w-[360px]">
        <NoticeBoardCanvas>
          <NoticeBoardCreative board={board} />
        </NoticeBoardCanvas>
      </div>
    </div>
  );
}
