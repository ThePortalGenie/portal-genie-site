"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { NoticeBoard } from "@/lib/demo/client-portal/types";
import {
  NoticeBoardCanvas,
  NoticeBoardCreative,
} from "@/components/demo/client-portal/DemoPortalAdvertisingPanel";

const PREVIEW_WIDTH = 250;
const PREVIEW_INNER_SIZE = PREVIEW_WIDTH - 16;
const FLYOUT_GAP = 14;
const VIEWPORT_PADDING = 12;
const FALLBACK_REFERENCE_SIZE = 420;

function getBillboardReferenceSize(): number {
  const panel = document.querySelector('[aria-label="Promotional banner"]');
  const square = panel?.querySelector(".aspect-square");
  if (square instanceof HTMLElement) {
    const size = square.getBoundingClientRect().width;
    if (size > 0) {
      return size;
    }
  }
  return FALLBACK_REFERENCE_SIZE;
}

type NoticeBoardHoverPreviewProps = {
  board: NoticeBoard | null;
  anchor: HTMLElement | null;
  visible: boolean;
};

function getPreviewPosition(anchor: HTMLElement) {
  const anchorRect = anchor.getBoundingClientRect();
  const flyout = document.querySelector('[aria-label="Customise portal"]');
  const flyoutLeft = flyout?.getBoundingClientRect().left ?? window.innerWidth;
  const previewHeight = PREVIEW_WIDTH;

  let left = flyoutLeft - FLYOUT_GAP - PREVIEW_WIDTH;
  let top = anchorRect.top + anchorRect.height / 2 - previewHeight / 2;

  top = Math.max(
    VIEWPORT_PADDING,
    Math.min(top, window.innerHeight - previewHeight - VIEWPORT_PADDING),
  );
  left = Math.max(VIEWPORT_PADDING, left);

  return { top, left };
}

export function NoticeBoardHoverPreview({
  board,
  anchor,
  visible,
}: NoticeBoardHoverPreviewProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [referenceSize, setReferenceSize] = useState(FALLBACK_REFERENCE_SIZE);
  const scale = PREVIEW_INNER_SIZE / referenceSize;

  useLayoutEffect(() => {
    if (!visible || !anchor || !board) {
      return;
    }

    const updatePosition = () => {
      setPosition(getPreviewPosition(anchor));
    };

    updatePosition();

    const scrollContainer = anchor.closest(".portal-customise-scroll");
    scrollContainer?.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      scrollContainer?.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchor, board, visible]);

  useLayoutEffect(() => {
    if (!visible || !board) {
      return;
    }

    const updateReferenceSize = () => {
      setReferenceSize(getBillboardReferenceSize());
    };

    updateReferenceSize();
    window.addEventListener("resize", updateReferenceSize, { passive: true });

    return () => {
      window.removeEventListener("resize", updateReferenceSize);
    };
  }, [board, visible]);

  if (typeof document === "undefined" || !visible || !board || !anchor) {
    return null;
  }

  return createPortal(
    <div
      className="pointer-events-none fixed z-[114] overflow-hidden rounded-lg border border-muted/25 bg-white p-2 shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        width: PREVIEW_WIDTH,
        height: PREVIEW_WIDTH,
      }}
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          style={{
            width: referenceSize,
            height: referenceSize,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <NoticeBoardCanvas>
            <NoticeBoardCreative board={board} />
          </NoticeBoardCanvas>
        </div>
      </div>
    </div>,
    document.body,
  );
}
