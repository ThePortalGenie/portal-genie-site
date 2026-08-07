import { contactForm } from "@/config/contact-form";

const IFRAME_TITLE = "The Portal Genie Contact Sales Form";

/** Fits the visible Zoho field set without excess trailing whitespace. */
const IFRAME_HEIGHT_CLASS =
  "block h-[700px] w-full min-w-0 sm:h-[680px] lg:h-[640px]";

export function ZohoContactForm() {
  return (
    <iframe
      src={contactForm.embedUrl}
      title={IFRAME_TITLE}
      aria-label={IFRAME_TITLE}
      className={`${IFRAME_HEIGHT_CLASS} border-0`}
      loading="lazy"
    />
  );
}
