"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";
import { useDemoPortal } from "@/modules/client-portal-simulator/state/context";

/** Outer chassis dimensions (portrait ~9:19.5) */
export const MOBILE_DEVICE_WIDTH = 376;
export const MOBILE_DEVICE_HEIGHT = 760;

/** Inner display viewport (area inside the black bezel) */
export const MOBILE_SCREEN_WIDTH = 366;
export const MOBILE_SCREEN_HEIGHT = 750;

function DeviceSideButtons() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-[2px] top-[108px] z-20 flex flex-col gap-2.5"
        aria-hidden="true"
      >
        <div className="h-5 w-[3px] rounded-l-sm bg-[#141416] shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]" />
        <div className="h-9 w-[3px] rounded-l-sm bg-[#141416] shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]" />
        <div className="h-9 w-[3px] rounded-l-sm bg-[#141416] shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]" />
      </div>
      <div className="pointer-events-none absolute -right-[2px] top-[168px] z-20" aria-hidden="true">
        <div className="h-12 w-[3px] rounded-r-sm bg-[#141416] shadow-[inset_1px_0_0_rgba(255,255,255,0.06)]" />
      </div>
    </>
  );
}

function MobileDeviceStatusBar() {
  const { state } = useDemoPortal();
  const barColour = state.mobileDesign.headerBackgroundColour;
  const onLightHeader =
    barColour.toLowerCase() === "#ffffff" || barColour.toLowerCase() === "#fcfcfc";
  const iconColour = onLightHeader ? "#112136" : "#ffffff";

  return (
    <div
      className="relative z-10 flex h-[22px] shrink-0 items-center justify-between px-4 text-[10px] font-semibold tabular-nums"
      style={{ backgroundColor: barColour, color: iconColour }}
      aria-hidden="true"
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
        <Wifi className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
        <BatteryFull className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}

function MobileDeviceIsland() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-30 h-[22px] w-[82px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      aria-hidden="true"
    />
  );
}

function MobileDeviceHomeIndicator() {
  return (
    <div
      className="flex h-[14px] shrink-0 items-center justify-center bg-transparent"
      aria-hidden="true"
    >
      <div className="h-1 w-[100px] rounded-full bg-[#112136]/35" />
    </div>
  );
}

export function MobileDeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: MOBILE_DEVICE_WIDTH, height: MOBILE_DEVICE_HEIGHT }}
      aria-hidden="true"
    >
      <DeviceSideButtons />

      <div
        className="relative h-full w-full overflow-hidden rounded-[32px] border border-[#52525a]/80 bg-[#2b2b30] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_22px_44px_-14px_rgba(17,33,54,0.45)]"
        style={{
          backgroundImage:
            "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 42%, rgba(0,0,0,0.12) 100%)",
        }}
      >
        <div className="absolute inset-[5px] overflow-hidden rounded-[26px] bg-black">
          <div className="flex h-full w-full flex-col overflow-hidden bg-white">
            <div className="relative shrink-0">
              <MobileDeviceStatusBar />
              <MobileDeviceIsland />
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>

            <MobileDeviceHomeIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
