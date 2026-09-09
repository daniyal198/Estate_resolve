"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTag } from "@/app/components/GoogleTag";
import { GoogleTagManager } from "@/app/components/GoogleTagManager";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  type CookieConsentPreferences,
  readCookiePreferences,
  setConsentTrackingReady,
  updateGoogleConsent,
} from "@/app/lib/cookie-consent";

const disabledPreferences: CookieConsentPreferences = {
  advertising: false,
  analytics: false,
};

export function ConsentControlledTracking() {
  const [preferences, setPreferences] =
    useState<CookieConsentPreferences>(disabledPreferences);
  const isEnabled = preferences.analytics || preferences.advertising;

  useEffect(() => {
    function syncConsent() {
      const nextPreferences =
        readCookiePreferences() || disabledPreferences;
      updateGoogleConsent(nextPreferences);
      setConsentTrackingReady(false);
      setPreferences(nextPreferences);
    }

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    setConsentTrackingReady(true);
    return () => setConsentTrackingReady(false);
  }, [isEnabled, preferences.advertising, preferences.analytics]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <GoogleTagManager />
      {preferences.analytics ? <Analytics /> : null}
      <GoogleTag
        advertisingEnabled={preferences.advertising}
        analyticsEnabled={preferences.analytics}
      />
    </>
  );
}
