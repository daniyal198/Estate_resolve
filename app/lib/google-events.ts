"use client";

type GoogleEventValue = string | number | boolean | null | undefined;
type GoogleEventParams = Record<string, GoogleEventValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, GoogleEventValue>[];
    gtag?: (
      command: "config" | "event" | "js",
      target: string | Date,
      params?: GoogleEventParams,
    ) => void;
  }
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export const googleConversionLabels = {
  consultation:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONSULTATION_CONVERSION_LABEL ||
    undefined,
  contact:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL || undefined,
  paidCase:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PAID_CASE_CONVERSION_LABEL || undefined,
  solicitor:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_SOLICITOR_CONVERSION_LABEL || undefined,
  startCase:
    process.env.NEXT_PUBLIC_GOOGLE_ADS_START_CASE_CONVERSION_LABEL || undefined,
} as const;

export function getGoogleAdsSendTo(conversionLabel?: string) {
  if (!googleAdsId || !conversionLabel) {
    return undefined;
  }

  return `${googleAdsId}/${conversionLabel}`;
}

export function trackGoogleEvent(
  eventName: string,
  params: GoogleEventParams = {},
) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, params);
}

/**
 * Pushes a named event onto the Google Tag Manager dataLayer so container
 * triggers can fire without further code changes.
 */
export function pushToDataLayer(
  event: string,
  params: GoogleEventParams = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
