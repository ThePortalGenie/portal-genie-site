import Script from "next/script";

type GoogleTagManagerProps = {
  gtmId: string;
};

/**
 * Loads GTM once globally. Consent Mode defaults run before the container.
 * GA4 is configured inside GTM — not in application code.
 */
export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <>
      <Script id="gtm-data-layer-init" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];`}
      </Script>
      <Script id="gtm-consent-defaults" strategy="beforeInteractive">
        {`(function(){function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});var m=document.cookie.match(/(?:^|; )pg_consent=([^;]*)/);if(m){try{var c=JSON.parse(decodeURIComponent(m[1]));if(c.analytics==='granted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}}catch(e){}}})();`}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
