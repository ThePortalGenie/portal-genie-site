"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { MobilePortalShell } from "@/components/demo/client-portal/mobile/MobilePortalShell";

export const MOBILE_DEVICE_WIDTH = 424;
export const MOBILE_DEVICE_HEIGHT = 892;
export const MOBILE_SCREEN_WIDTH = 390;
export const MOBILE_SCREEN_HEIGHT = 844;

const PREVIEW_PADDING = 32;

function useDeviceFitScale(
  containerRef: React.RefObject<HTMLElement | null>,
  deviceWidth: number,
  deviceHeight: number,
) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateScale = () => {
      const availableWidth = container.clientWidth - PREVIEW_PADDING;
      const availableHeight = container.clientHeight - PREVIEW_PADDING;
      const scaleX = availableWidth / deviceWidth;
      const scaleY = (availableHeight * 0.88) / deviceHeight;
      setScale(Math.min(1, scaleX, scaleY));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, deviceHeight, deviceWidth]);

  return scale;
}

function MobilePreviewDeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-full w-full rounded-[42px] border border-white/10 bg-[#1c1c1e] px-[17px] py-6 shadow-[0_24px_48px_-12px_rgba(17,33,54,0.28)]"
      aria-hidden="true"
    >
      <div
        className="relative mx-auto overflow-hidden rounded-[32px] bg-white"
        style={{ width: MOBILE_SCREEN_WIDTH, height: MOBILE_SCREEN_HEIGHT }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-3 z-20 h-[5px] w-[78px] -translate-x-1/2 rounded-full bg-[#3a3a3a]"
          aria-hidden="true"
        />
        {children}
        <div
          className="pointer-events-none absolute bottom-2.5 left-1/2 z-20 h-1 w-[100px] -translate-x-1/2 rounded-full bg-black/20"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function MobilePreviewDevice() {
  return (
    <MobilePreviewDeviceFrame>
      <MobilePortalShell />
    </MobilePreviewDeviceFrame>
  );
}

export function MobilePreviewArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useDeviceFitScale(
    containerRef,
    MOBILE_DEVICE_WIDTH,
    MOBILE_DEVICE_HEIGHT,
  );
  const scaledWidth = MOBILE_DEVICE_WIDTH * scale;
  const scaledHeight = MOBILE_DEVICE_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#f5f7fa] p-4"
      aria-label="Mobile portal preview"
    >
      <div
        className="relative shrink-0"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: MOBILE_DEVICE_WIDTH,
            height: MOBILE_DEVICE_HEIGHT,
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          <MobilePreviewDevice />
        </div>
      </div>
    </div>
  );
}
