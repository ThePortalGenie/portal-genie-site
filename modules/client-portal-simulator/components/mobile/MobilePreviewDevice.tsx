"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  MOBILE_DEVICE_HEIGHT,
  MOBILE_DEVICE_WIDTH,
  MobileDeviceFrame,
} from "@/modules/client-portal-simulator/components/mobile/MobileDeviceFrame";
import { MobilePortalShell } from "@/modules/client-portal-simulator/components/mobile/MobilePortalShell";

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
      const scaleY = (availableHeight * 0.9) / deviceHeight;
      setScale(Math.min(1, scaleX, scaleY));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, deviceHeight, deviceWidth]);

  return scale;
}

export function MobilePreviewArea({ interactiveCustomise = false }: { interactiveCustomise?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useDeviceFitScale(containerRef, MOBILE_DEVICE_WIDTH, MOBILE_DEVICE_HEIGHT);
  const scaledWidth = MOBILE_DEVICE_WIDTH * scale;
  const scaledHeight = MOBILE_DEVICE_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className={`flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-[#f5f7fa] p-4 ${
        interactiveCustomise ? "relative z-[112]" : ""
      }`}
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
          <MobileDeviceFrame>
            <MobilePortalShell />
          </MobileDeviceFrame>
        </div>
      </div>
    </div>
  );
}

// Re-export frame constants for tests or future use
export {
  MOBILE_DEVICE_HEIGHT,
  MOBILE_DEVICE_WIDTH,
  MOBILE_SCREEN_HEIGHT,
  MOBILE_SCREEN_WIDTH,
} from "@/modules/client-portal-simulator/components/mobile/MobileDeviceFrame";
