import Script from "next/script";

const defaultConsentScript = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
window.gtag('set', 'ads_data_redaction', true);
`;

/**
 * Establishes Consent Mode v2 defaults without loading or contacting Google.
 * It must remain ahead of every Google tag in the root layout.
 */
export function ConsentModeDefaults() {
  return (
    <Script id="google-consent-mode-defaults" strategy="beforeInteractive">
      {defaultConsentScript}
    </Script>
  );
}
