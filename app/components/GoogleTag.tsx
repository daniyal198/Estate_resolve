import Script from "next/script";

const googleTagIds = [
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
].filter(
  (tagId, index, tagIds): tagId is string =>
    Boolean(tagId) && tagIds.indexOf(tagId) === index,
);

export function GoogleTag() {
  const primaryTagId = googleTagIds[0];

  if (!primaryTagId) {
    return null;
  }

  const configScript = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    ...googleTagIds.map((tagId) => `gtag('config', '${tagId}');`),
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
