"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

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

    track("Paid Case Conversion", {
      caseReference,
      sessionId,
    });
  }, [caseReference, sessionId]);

  return null;
}
