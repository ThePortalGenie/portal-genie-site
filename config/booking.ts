/**
 * Zoho Bookings configuration.
 *
 * `pageUrl` is the standalone booking page. `embedUrl` uses Zoho's
 * portal-embed route — the recommended approach for inline website widgets.
 */
export const booking = {
  pageUrl: "https://naggingpanda.zohobookings.com/ThePortalGenieSales",
  embedUrl:
    "https://naggingpanda.zohobookings.com/portal-embed#/ThePortalGenieSales",
} as const;
