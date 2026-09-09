"use client";

export type CookieConsentChoice = "accepted" | "custom" | "rejected";

export type CookieConsentPreferences = {
  advertising: boolean;
  analytics: boolean;
};

type StoredCookieConsent = {
  choice: CookieConsentChoice;
  preferences?: CookieConsentPreferences;
  updatedAt: string;
  version: 2;
};

type ConsentModeValue = "granted" | "denied";

type ConsentModeUpdate = {
  ad_personalization: ConsentModeValue;
  ad_storage: ConsentModeValue;
  ad_user_data: ConsentModeValue;
  analytics_storage: ConsentModeValue;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const COOKIE_CONSENT_STORAGE_KEY =
  "estate-resolve-cookie-consent-v2";
export const COOKIE_CONSENT_CHANGE_EVENT =
  "estate-resolve-cookie-consent-change";
export const OPEN_COOKIE_PREFERENCES_EVENT =
  "estate-resolve-open-cookie-preferences";
export const CONSENT_TRACKING_READY_EVENT =
  "estate-resolve-consent-tracking-ready";

// CNIL recommends remembering both acceptance and refusal for six months.
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_dc_gtm_"];
const ADVERTISING_COOKIE_PREFIXES = ["_gac_", "_gcl_"];
const ACCEPT_ALL_PREFERENCES: CookieConsentPreferences = {
  advertising: true,
  analytics: true,
};
const REJECT_ALL_PREFERENCES: CookieConsentPreferences = {
  advertising: false,
  analytics: false,
};

let memoryPreferences: CookieConsentPreferences | null = null;
let consentTrackingReady = false;

function isCookieConsentChoice(value: unknown): value is CookieConsentChoice {
  return (
    value === "accepted" || value === "custom" || value === "rejected"
  );
}

function isCookieConsentPreferences(
  value: unknown,
): value is CookieConsentPreferences {
  if (!value || typeof value !== "object") {
    return false;
  }

  const preferences = value as Partial<CookieConsentPreferences>;
  return (
    typeof preferences.advertising === "boolean" &&
    typeof preferences.analytics === "boolean"
  );
}

function preferencesForChoice(
  choice: Exclude<CookieConsentChoice, "custom">,
) {
  return choice === "accepted"
    ? { ...ACCEPT_ALL_PREFERENCES }
    : { ...REJECT_ALL_PREFERENCES };
}

function choiceForPreferences(
  preferences: CookieConsentPreferences,
): CookieConsentChoice {
  if (preferences.analytics && preferences.advertising) {
    return "accepted";
  }

  if (!preferences.analytics && !preferences.advertising) {
    return "rejected";
  }

  return "custom";
}

export function readCookiePreferences(): CookieConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(
      COOKIE_CONSENT_STORAGE_KEY,
    );

    if (!storedValue) {
      return memoryPreferences
        ? { ...memoryPreferences }
        : null;
    }

    const storedConsent = JSON.parse(storedValue) as Partial<StoredCookieConsent>;
    const updatedAt = Date.parse(storedConsent.updatedAt || "");

    if (
      storedConsent.version !== 2 ||
      !isCookieConsentChoice(storedConsent.choice) ||
      !Number.isFinite(updatedAt) ||
      Date.now() - updatedAt > CONSENT_MAX_AGE_MS
    ) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      memoryPreferences = null;
      return null;
    }

    const preferences = isCookieConsentPreferences(storedConsent.preferences)
      ? storedConsent.preferences
      : storedConsent.choice === "custom"
        ? null
        : preferencesForChoice(storedConsent.choice);

    if (!preferences) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      memoryPreferences = null;
      return null;
    }

    memoryPreferences = { ...preferences };
    return { ...preferences };
  } catch {
    return memoryPreferences
      ? { ...memoryPreferences }
      : null;
  }
}

export function readCookieConsent(): CookieConsentChoice | null {
  const preferences = readCookiePreferences();
  return preferences ? choiceForPreferences(preferences) : null;
}

export function hasAnalyticsConsent() {
  return readCookiePreferences()?.analytics === true;
}

export function hasAdvertisingConsent() {
  return readCookiePreferences()?.advertising === true;
}

export function hasAnyOptionalConsent() {
  const preferences = readCookiePreferences();
  return Boolean(preferences?.analytics || preferences?.advertising);
}

export function isConsentTrackingReady() {
  return consentTrackingReady;
}

export function setConsentTrackingReady(isReady: boolean) {
  consentTrackingReady = isReady;

  if (isReady && typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_TRACKING_READY_EVENT));
  }
}

function ensureGoogleConsentApi() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function updateGoogleConsent(
  consent: CookieConsentChoice | CookieConsentPreferences,
) {
  if (typeof window === "undefined") {
    return;
  }

  const preferences =
    typeof consent === "string"
      ? consent === "custom"
        ? REJECT_ALL_PREFERENCES
        : preferencesForChoice(consent)
      : consent;
  const advertisingValue: ConsentModeValue = preferences.advertising
    ? "granted"
    : "denied";
  const analyticsValue: ConsentModeValue = preferences.analytics
    ? "granted"
    : "denied";
  const update: ConsentModeUpdate = {
    ad_personalization: advertisingValue,
    ad_storage: advertisingValue,
    ad_user_data: advertisingValue,
    analytics_storage: analyticsValue,
  };

  ensureGoogleConsentApi();
  window.gtag?.("consent", "update", update);
}

function trackingCookieName(
  cookieName: string,
  preferences: CookieConsentPreferences,
) {
  return (
    (!preferences.analytics &&
      ANALYTICS_COOKIE_PREFIXES.some((prefix) =>
        cookieName.startsWith(prefix),
      )) ||
    (!preferences.advertising &&
      ADVERTISING_COOKIE_PREFIXES.some((prefix) =>
        cookieName.startsWith(prefix),
      ))
  );
}

export function removeAccessibleAnalyticsCookies(
  preferences: CookieConsentPreferences = REJECT_ALL_PREFERENCES,
) {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((cookieName): cookieName is string =>
      Boolean(cookieName && trackingCookieName(cookieName, preferences)),
    );
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const domains = new Set<string | undefined>([
    undefined,
    hostname,
    "." + hostname,
  ]);
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const paths = new Set(["/", window.location.pathname]);

  for (let index = 1; index < domainParts.length - 1; index += 1) {
    domains.add("." + domainParts.slice(index).join("."));
  }

  for (let index = 1; index <= pathParts.length; index += 1) {
    paths.add("/" + pathParts.slice(0, index).join("/"));
  }

  for (const cookieName of cookieNames) {
    for (const domain of domains) {
      for (const path of paths) {
        const domainAttribute = domain ? "; Domain=" + domain : "";
        document.cookie =
          encodeURIComponent(cookieName) +
          "=; Max-Age=0; Path=" +
          path +
          domainAttribute +
          "; SameSite=Lax";
      }
    }
  }
}

export function saveCookiePreferences(
  preferences: CookieConsentPreferences,
) {
  if (typeof window === "undefined") {
    return;
  }

  const storedPreferences = { ...preferences };
  memoryPreferences = storedPreferences;

  try {
    const storedConsent: StoredCookieConsent = {
      choice: choiceForPreferences(storedPreferences),
      preferences: storedPreferences,
      updatedAt: new Date().toISOString(),
      version: 2,
    };
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(storedConsent),
    );
  } catch {
    // The in-memory choice still applies for this page if storage is blocked.
  }

  updateGoogleConsent(storedPreferences);
  removeAccessibleAnalyticsCookies(storedPreferences);
  window.dispatchEvent(
    new CustomEvent<CookieConsentPreferences>(
      COOKIE_CONSENT_CHANGE_EVENT,
      {
        detail: storedPreferences,
      },
    ),
  );
}

export function saveCookieConsent(
  choice: Exclude<CookieConsentChoice, "custom">,
) {
  saveCookiePreferences(preferencesForChoice(choice));
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  }
}
