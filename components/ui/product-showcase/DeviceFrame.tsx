import type { ReactNode } from "react";

export interface DeviceFrameProps {
  children: ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <figure
      className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-muted/30 bg-portal-navy p-2 shadow-[0_12px_40px_-12px_rgba(17,33,54,0.12)] sm:max-w-[320px]"
      aria-label="Portal Genie mobile application"
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-muted/20 bg-surface">
        <div
          className="flex justify-center bg-background py-2"
          aria-hidden="true"
        >
          <span className="h-1 w-12 rounded-full bg-muted/50" />
        </div>
        <div className="bg-surface">{children}</div>
      </div>
    </figure>
  );
}
