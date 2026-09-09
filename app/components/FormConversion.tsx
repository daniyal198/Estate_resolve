"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics/react";
import {
  CONSENT_TRACKING_READY_EVENT,
  hasAdvertisingConsent,
  hasAnalyticsConsent,
  hasAnyOptionalConsent,
  isConsentTrackingReady,
} from "@/app/lib/cookie-consent";
import {
  getGoogleAdsSendTo,
  googleConversionLabels,
  pushToDataLayer,
  trackGoogleEvent,
} from "@/app/lib/google-events";

type FormConversionProps = {
  /** Which Google Ads conversion label applies to this submission. */
  conversion: keyof typeof googleConversionLabels;
  /** Distinguishes one submission from the next so the event fires once. */
  dedupeToken?: string | null;
  /** dataLayer event name used for Google Tag Manager triggers. */
  dataLayerEvent: string;
  formName: string;
  vercelEventName: string;
};

/**
 * Fires the lead conversion for a completed form submission. Rendered on the
 * dedicated thank-you pages so Google Ads and GTM can also convert on the URL.
 */
export function FormConversion({
  conversion,
  dataLayerEvent,
  dedupeToken,
  formName,
  vercelEventName,
}: FormConversionProps) {
  useEffect(() => {
    const conversionKey = `form-conversion:${formName}:${dedupeToken || "default"}`;

    function sendConversion() {
      if (
        !hasAnyOptionalConsent() ||
        !isConsentTrackingReady() ||
        window.sessionStorage.getItem(conversionKey)
      ) {
        return;
      }

      if (
        hasAnalyticsConsent() &&
        !window.sessionStorage.getItem(conversionKey + ":analytics")
      ) {
        track(vercelEventName);
        window.sessionStorage.setItem(conversionKey + ":analytics", "true");
      }
      if (!window.sessionStorage.getItem(conversionKey + ":data-layer")) {
        pushToDataLayer(dataLayerEvent, { form_name: formName });
        window.sessionStorage.setItem(conversionKey + ":data-layer", "true");
      }
      if (
        hasAdvertisingConsent() &&
        !window.sessionStorage.getItem(conversionKey + ":advertising")
      ) {
        trackGoogleEvent("generate_lead", {
          event_category: "engagement",
          form_name: formName,
          send_to: getGoogleAdsSendTo(googleConversionLabels[conversion]),
        });
        window.sessionStorage.setItem(conversionKey + ":advertising", "true");
      }
    }

    sendConversion();
    window.addEventListener(CONSENT_TRACKING_READY_EVENT, sendConversion);

    return () => {
      window.removeEventListener(CONSENT_TRACKING_READY_EVENT, sendConversion);
    };
  }, [conversion, dataLayerEvent, dedupeToken, formName, vercelEventName]);

  return null;
}
