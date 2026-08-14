"use client";

import { useDemoPortal } from "@/lib/demo/client-portal/context";
import { getActiveNoticeBoard } from "@/lib/demo/client-portal/notice-boards";
import type { NoticeBoard } from "@/lib/demo/client-portal/types";

/** Shared notice-board canvas — matches Portal Genie Promotion footprint (square, object-contain). */
export function NoticeBoardCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="aspect-square w-full max-h-full max-w-full shrink-0">{children}</div>
    </div>
  );
}

/** Shared banner footprint — Portal Genie Promotion reference (90% square, centered). */
function NoticeBoardBannerFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="aspect-square w-[90%] max-h-[90%] shrink-0">{children}</div>
    </div>
  );
}

function NoticeBoardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <NoticeBoardBannerFrame>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain object-center"
        draggable={false}
      />
    </NoticeBoardBannerFrame>
  );
}

function NoticeBoardCssCreative({
  headline,
  body,
  gradient,
  ctaText,
}: {
  headline: string;
  body: string;
  gradient: string;
  ctaText?: string;
}) {
  return (
    <NoticeBoardBannerFrame>
      <div
        className={`flex h-full w-full flex-col justify-center overflow-hidden px-5 py-6 text-white min-[1536px]:px-6 min-[1536px]:py-8 ${gradient}`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] opacity-80">
          Portal Genie
        </p>
        <h3 className="mt-2 text-lg font-bold leading-tight min-[1536px]:text-xl">{headline}</h3>
        <p className="mt-2.5 max-w-[95%] text-[11px] leading-snug opacity-90 min-[1536px]:mt-3 min-[1536px]:text-xs min-[1536px]:leading-relaxed">
          {body}
        </p>
        {ctaText ? (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide opacity-95">
            {ctaText}
          </p>
        ) : null}
      </div>
    </NoticeBoardBannerFrame>
  );
}

export function NoticeBoardCreative({ board }: { board: NoticeBoard }) {
  if (board.kind === "preset-image" || (board.kind === "custom" && board.imageUrl)) {
    const src = board.imageUrl;
    if (src) {
      return (
        <NoticeBoardImage
          src={src}
          alt={board.imageAlt ?? board.name}
        />
      );
    }
  }

  if (board.kind === "custom" && !board.imageUrl) {
    return (
      <NoticeBoardCssCreative
        headline={board.headline ?? board.name}
        body={board.body ?? ""}
        gradient="bg-gradient-to-br from-[#112136] to-[#0055FF]"
        ctaText={board.ctaText}
      />
    );
  }

  return (
    <NoticeBoardCssCreative
      headline={board.headline ?? board.name}
      body={board.body ?? ""}
      gradient={board.gradient ?? "bg-gradient-to-br from-[#112136] to-[#0055FF]"}
      ctaText={board.ctaText}
    />
  );
}

export function DemoPortalAdvertisingPanel() {
  const { state } = useDemoPortal();
  const board = getActiveNoticeBoard(state.noticeBoards, state.activeNoticeBoardId);

  if (state.previewMode === "mobile") {
    return null;
  }

  return (
    <aside
      className="flex h-full min-h-0 items-center justify-center overflow-hidden border-l border-[#ececec] bg-white p-3"
      aria-label="Promotional banner"
    >
      <NoticeBoardCanvas>
        <NoticeBoardCreative board={board} />
      </NoticeBoardCanvas>
    </aside>
  );
}

export function DemoPortalAdvertisingMobile() {
  const { state } = useDemoPortal();
  const board = getActiveNoticeBoard(state.noticeBoards, state.activeNoticeBoardId);
  const mobilePreview = state.previewMode === "mobile";

  return (
    <div
      className={`mt-4 border-t border-[#ececec] bg-white p-4 ${mobilePreview ? "" : "lg:hidden"}`}
    >
      <div className="mx-auto aspect-square w-full max-w-[420px]">
        <NoticeBoardCreative board={board} />
      </div>
    </div>
  );
}
