"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics/react";
import {
  getGoogleAdsSendTo,
  googleConversionLabels,
  pushToDataLayer,
  trackGoogleEvent,
} from "@/app/lib/google-events";

type PaidCaseConversionProps = {
  caseReference: string | null;
  sessionId: string | null;
};

export function PaidCaseConversion({
  caseReference,
  sessionId,
}: PaidCaseConversionProps) {
  useEffect(() => {
    if (!caseReference && !sessionId) {
      return;
    }

    const conversionKey = `paid-case-conversion:${sessionId || caseReference}`;

    if (window.sessionStorage.getItem(conversionKey)) {
      return;
    }

    window.sessionStorage.setItem(conversionKey, "true");

    track("Paid Case Conversion", {
      caseReference,
      sessionId,
    });
    pushToDataLayer("purchase_completed", {
      case_reference: caseReference,
      transaction_id: sessionId || caseReference,
    });
    trackGoogleEvent("purchase", {
      case_reference: caseReference,
      send_to: getGoogleAdsSendTo(googleConversionLabels.paidCase),
      transaction_id: sessionId || caseReference,
    });
  }, [caseReference, sessionId]);

  return null;
}
