import Script from "next/script";

/**
 * Google Tag Manager container. The ID can be overridden per environment with
 * NEXT_PUBLIC_GTM_CONTAINER_ID; it falls back to the live Estate Resolve
 * container so the tag works without extra Vercel configuration.
 */
const containerId =
  process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "GTM-53H4G39C";

export function GoogleTagManager() {
  if (!containerId) {
    return null;
  }

  const loaderScript = [
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':",
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],",
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=",
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;",
    "f.parentNode.insertBefore(j,f);",
    `})(window,document,'script','dataLayer','${containerId}');`,
  ].join("");

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {loaderScript}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
