"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics/react";
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

    if (window.sessionStorage.getItem(conversionKey)) {
      return;
    }

    window.sessionStorage.setItem(conversionKey, "true");

    track(vercelEventName);
    pushToDataLayer(dataLayerEvent, { form_name: formName });
    trackGoogleEvent("generate_lead", {
      event_category: "engagement",
      form_name: formName,
      send_to: getGoogleAdsSendTo(googleConversionLabels[conversion]),
    });
  }, [conversion, dataLayerEvent, dedupeToken, formName, vercelEventName]);

  return null;
}
