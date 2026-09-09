"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  type CookieConsentChoice,
  type CookieConsentPreferences,
  OPEN_COOKIE_PREFERENCES_EVENT,
  readCookieConsent,
  readCookiePreferences,
  saveCookiePreferences,
} from "@/app/lib/cookie-consent";

type PreferenceSwitchProps = {
  checked: boolean;
  description: string;
  id: string;
  label: string;
  onToggle: () => void;
};

const focusRingClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold-light";

function PreferenceSwitch({
  checked,
  description,
  id,
  label,
  onToggle,
}: PreferenceSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-5 border-t border-white/10 py-4 first:border-t-0">
      <div>
        <p id={id + "-label"} className="text-sm font-semibold text-white">
          {label}
        </p>
        <p
          id={id + "-description"}
          className="mt-1 text-xs leading-5 text-white/58"
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id + "-label"}
        aria-describedby={id + "-description"}
        onClick={onToggle}
        className={[
          "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
          focusRingClassName,
          checked
            ? "border-brand-gold bg-brand-gold"
            : "border-white/30 bg-white/10",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [savedChoice, setSavedChoice] =
    useState<CookieConsentChoice | null>(null);
  const [isPreferencesView, setIsPreferencesView] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);
  const dialogHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const initialFrame = window.requestAnimationFrame(() => {
      const choice = readCookieConsent();
      const preferences = readCookiePreferences();
      setSavedChoice(choice);
      setAnalyticsEnabled(preferences?.analytics || false);
      setAdvertisingEnabled(preferences?.advertising || false);

      if (!choice) {
        setIsVisible(true);
      }
    });

    function showPreferences() {
      const choice = readCookieConsent();
      const preferences = readCookiePreferences();
      setSavedChoice(choice);
      setAnalyticsEnabled(preferences?.analytics || false);
      setAdvertisingEnabled(preferences?.advertising || false);
      setIsPreferencesView(true);
      setIsVisible(true);
      window.requestAnimationFrame(() => {
        dialogHeadingRef.current?.focus();
      });
    }

    window.addEventListener(
      OPEN_COOKIE_PREFERENCES_EVENT,
      showPreferences,
    );

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener(
        OPEN_COOKIE_PREFERENCES_EVENT,
        showPreferences,
      );
    };
  }, []);

  useEffect(() => {
    if (!isVisible || (!savedChoice && !isPreferencesView)) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (savedChoice) {
        setIsVisible(false);
      }

      setIsPreferencesView(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isPreferencesView, isVisible, savedChoice]);

  function applyPreferences(preferences: CookieConsentPreferences) {
    const previousPreferences = readCookiePreferences();
    saveCookiePreferences(preferences);
    setSavedChoice(readCookieConsent());
    setAnalyticsEnabled(preferences.analytics);
    setAdvertisingEnabled(preferences.advertising);
    setIsVisible(false);
    setIsPreferencesView(false);

    // Reloading fully removes third-party runtimes already loaded in this tab.
    const previouslyLoaded = Boolean(
      previousPreferences?.analytics || previousPreferences?.advertising,
    );
    const preferencesChanged = Boolean(
      previousPreferences &&
        (previousPreferences.analytics !== preferences.analytics ||
          previousPreferences.advertising !== preferences.advertising),
    );

    if (previouslyLoaded && preferencesChanged) {
      window.setTimeout(() => window.location.reload(), 0);
    }
  }

  function handleChoice(choice: Exclude<CookieConsentChoice, "custom">) {
    const enabled = choice === "accepted";
    applyPreferences({ advertising: enabled, analytics: enabled });
  }

  function showPreferencePanel() {
    const preferences = readCookiePreferences();
    setAnalyticsEnabled(preferences?.analytics || false);
    setAdvertisingEnabled(preferences?.advertising || false);
    setIsPreferencesView(true);
    window.requestAnimationFrame(() => {
      dialogHeadingRef.current?.focus();
    });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-describedby="cookie-consent-description"
      aria-labelledby="cookie-consent-title"
      aria-modal="false"
      role="dialog"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
    >
      <div className="pointer-events-auto relative mx-auto max-h-[calc(100dvh-1.5rem)] max-w-5xl overflow-y-auto rounded-[1.5rem] border border-brand-gold/35 bg-brand-navy/98 text-white shadow-[0_24px_80px_rgba(4,15,27,0.42)] backdrop-blur-xl">
        <div aria-hidden="true" className="h-1 bg-brand-gold" />

        <div className="px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-gold-light sm:flex"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M12 3 4.5 6v5.3c0 4.5 3 8.4 7.5 9.7 4.5-1.3 7.5-5.2 7.5-9.7V6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
                    Privacy controls
                  </p>
                  <h2
                    ref={dialogHeadingRef}
                    id="cookie-consent-title"
                    tabIndex={-1}
                    className="mt-1 font-serif text-xl font-semibold text-white outline-none sm:text-2xl"
                  >
                    Your privacy choices
                  </h2>
                </div>

                {savedChoice ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsVisible(false);
                      setIsPreferencesView(false);
                    }}
                    className={[
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-brand-gold/60 hover:text-brand-gold-light",
                      focusRingClassName,
                    ].join(" ")}
                    aria-label="Close cookie preferences"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path d="m6 6 12 12" />
                      <path d="M18 6 6 18" />
                    </svg>
                  </button>
                ) : null}
              </div>

              {isPreferencesView ? (
                <div className="mt-4">
                  <p
                    id="cookie-consent-description"
                    className="max-w-3xl text-sm leading-6 text-white/68"
                  >
                    Essential storage is always active. Optional analytics and
                    advertising help us understand visits and measure enquiries.
                    They stay off unless you choose to enable them.
                  </p>

                  <div className="mt-4 rounded-2xl border border-white/12 bg-white/[0.045] px-4 sm:px-5">
                    <div className="flex items-center justify-between gap-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Essential
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/58">
                          Remembers your privacy choice and supports core site
                          functions.
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-brand-gold-light">
                        Always active
                      </span>
                    </div>

                    <PreferenceSwitch
                      checked={analyticsEnabled}
                      description="Helps us understand site use through Google and Vercel analytics."
                      id="analytics-preference"
                      label="Analytics"
                      onToggle={() =>
                        setAnalyticsEnabled((enabled) => !enabled)
                      }
                    />
                    <PreferenceSwitch
                      checked={advertisingEnabled}
                      description="Measures advertising performance and completed conversions."
                      id="advertising-preference"
                      label="Advertising"
                      onToggle={() =>
                        setAdvertisingEnabled((enabled) => !enabled)
                      }
                    />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-white/48">
                    Choose each optional category independently, then save your
                    preferences.
                  </p>

                  <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setIsPreferencesView(false)}
                      className={[
                        "px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white/64 transition hover:text-white",
                        focusRingClassName,
                      ].join(" ")}
                    >
                      Back
                    </button>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link
                        href="/privacy"
                        className={[
                          "px-2 py-2 text-center text-xs font-semibold text-brand-gold-light underline decoration-brand-gold/70 underline-offset-4",
                          focusRingClassName,
                        ].join(" ")}
                      >
                        Privacy Policy
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          applyPreferences({
                            advertising: advertisingEnabled,
                            analytics: analyticsEnabled,
                          })
                        }
                        className={[
                          "inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-brand-gold-light hover:text-brand-navy",
                          focusRingClassName,
                        ].join(" ")}
                      >
                        Save preferences
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 lg:flex lg:items-end lg:justify-between lg:gap-8">
                  <p
                    id="cookie-consent-description"
                    className="max-w-2xl text-sm leading-6 text-white/68"
                  >
                    Essential storage keeps the website working and remembers
                    your choice. Optional analytics and advertising help us
                    improve the site and measure enquiries, and only run with
                    your permission.{" "}
                    <Link
                      href="/privacy"
                      className={[
                        "font-semibold text-brand-gold-light underline decoration-brand-gold/70 underline-offset-4",
                        focusRingClassName,
                      ].join(" ")}
                    >
                      Privacy Policy
                    </Link>
                  </p>

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:mt-0 lg:min-w-[31rem]">
                    <button
                      type="button"
                      onClick={() => handleChoice("accepted")}
                      className={[
                        "inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-gold bg-brand-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-brand-gold-light hover:text-brand-navy",
                        focusRingClassName,
                      ].join(" ")}
                    >
                      Accept all
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChoice("rejected")}
                      className={[
                        "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/55 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-brand-navy transition hover:border-brand-gold hover:bg-brand-ivory",
                        focusRingClassName,
                      ].join(" ")}
                    >
                      Decline optional cookies
                    </button>
                    <button
                      type="button"
                      onClick={showPreferencePanel}
                      className={[
                        "inline-flex min-h-10 items-center justify-center rounded-xl border border-white/18 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-white/78 transition hover:border-brand-gold/60 hover:text-brand-gold-light sm:col-span-2",
                        focusRingClassName,
                      ].join(" ")}
                    >
                      Manage preferences
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
