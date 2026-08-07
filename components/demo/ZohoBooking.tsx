"use client";

import { useEffect, useRef, useState } from "react";
import { booking } from "@/config/booking";

const IFRAME_TITLE = "Book a Portal Genie demonstration";

/** Reserved height matches iframe breakpoints to avoid CLS while deferred load. */
const PLACEHOLDER_CLASS =
  "h-[520px] w-full min-w-[280px] sm:h-[640px] md:h-[750px]";

/**
 * Inline Zoho Bookings calendar. Defers the iframe request until the widget
 * nears the viewport so the booking page does not pay third-party cost on
 * initial load. No extra click is required — the form appears on scroll.
 */
export function ZohoBooking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldLoad) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full min-w-0 overflow-x-auto">
      {shouldLoad ? (
        <iframe
          src={booking.embedUrl}
          title={IFRAME_TITLE}
          loading="lazy"
          className={`${PLACEHOLDER_CLASS} border-0`}
          allowFullScreen
        />
      ) : (
        <div
          className={`${PLACEHOLDER_CLASS} bg-surface/50`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
