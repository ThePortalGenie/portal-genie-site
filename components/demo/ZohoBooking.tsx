import { booking } from "@/config/booking";

const IFRAME_TITLE = "Book a Portal Genie demonstration";

/**
 * Inline Zoho Bookings calendar. Uses Zoho's portal-embed iframe — the
 * recommended website embed approach — so visitors can schedule without
 * leaving the Portal Genie site. No animation applied here; the widget
 * manages its own interaction.
 */
export function ZohoBooking() {
  return (
    <div className="w-full min-w-0 overflow-x-auto">
      <iframe
        src={booking.embedUrl}
        title={IFRAME_TITLE}
        className="w-full min-w-[280px] border-0"
        style={{ height: "750px" }}
        allowFullScreen
      />
    </div>
  );
}
