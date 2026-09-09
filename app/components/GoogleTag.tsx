import Script from "next/script";

type GoogleTagProps = {
  advertisingEnabled: boolean;
  analyticsEnabled: boolean;
};

export function GoogleTag({
  advertisingEnabled,
  analyticsEnabled,
}: GoogleTagProps) {
  const googleTagIds = [
    analyticsEnabled
      ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      : undefined,
    advertisingEnabled ? process.env.NEXT_PUBLIC_GOOGLE_ADS_ID : undefined,
  ].filter(
    (tagId, index, tagIds): tagId is string =>
      Boolean(tagId) && tagIds.indexOf(tagId) === index,
  );
  const primaryTagId = googleTagIds[0];

  if (!primaryTagId) {
    return null;
  }

  const configScript = [
    "window.dataLayer = window.dataLayer || [];",
    "window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};",
    "window.gtag('js', new Date());",
    ...googleTagIds.map((tagId) => `window.gtag('config', '${tagId}');`),
  ].join("\n");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {configScript}
      </Script>
    </>
  );
}
