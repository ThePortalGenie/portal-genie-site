import Script from "next/script";

/** Preserved exactly as provided by Elfsight — do not change. */
const ELFSIGHT_APP_ID = "c57c6ea9-6c6e-4dd7-bacd-5b7882f3344a";
const ELFSIGHT_SCRIPT_ID = "elfsight-platform";
const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";

/**
 * Embeds the Elfsight Pricing Table widget. Plan details, limits and pricing
 * remain the source of truth inside Elfsight — this component only loads the
 * script once (via Next.js Script deduplication) and renders the app container.
 */
export function ElfsightPricingTable() {
  return (
    <>
      <Script
        id={ELFSIGHT_SCRIPT_ID}
        src={ELFSIGHT_SCRIPT_SRC}
        strategy="lazyOnload"
      />
      <div
        className={`elfsight-app-${ELFSIGHT_APP_ID} w-full min-w-0 overflow-x-auto`}
        data-elfsight-app-lazy
      />
    </>
  );
}
