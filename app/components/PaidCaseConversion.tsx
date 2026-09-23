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

type PaidCaseConversionProps = {
  caseReference: string | null;
  currency: string | null;
  sessionId: string | null;
  value: number | null;
};

export function PaidCaseConversion({
  caseReference,
  currency,
  sessionId,
  value,
}: PaidCaseConversionProps) {
  useEffect(() => {
    if (!caseReference && !sessionId) {
      return;
    }

    const conversionKey = `paid-case-conversion:${sessionId || caseReference}`;

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
        track("Paid Case Conversion", { caseReference, sessionId });
        window.sessionStorage.setItem(conversionKey + ":analytics", "true");
      }
      if (!window.sessionStorage.getItem(conversionKey + ":data-layer")) {
        pushToDataLayer("purchase_completed", {
          case_reference: caseReference,
          currency,
          transaction_id: sessionId || caseReference,
          value,
        });
        window.sessionStorage.setItem(conversionKey + ":data-layer", "true");
      }
      if (
        hasAdvertisingConsent() &&
        !window.sessionStorage.getItem(conversionKey + ":advertising")
      ) {
        trackGoogleEvent("purchase", {
          case_reference: caseReference,
          currency,
          send_to: getGoogleAdsSendTo(googleConversionLabels.paidCase),
          transaction_id: sessionId || caseReference,
          value,
        });
        window.sessionStorage.setItem(conversionKey + ":advertising", "true");
      }
    }

    sendConversion();
    window.addEventListener(CONSENT_TRACKING_READY_EVENT, sendConversion);

    return () => {
      window.removeEventListener(CONSENT_TRACKING_READY_EVENT, sendConversion);
    };
  }, [caseReference, currency, sessionId, value]);

  return null;
}
