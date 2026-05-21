"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "estate-resolve-cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasConsent = window.localStorage.getItem(STORAGE_KEY);
    if (!hasConsent) {
      window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, []);

  function handleAccept() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-border bg-brand-navy/95 px-4 py-4 text-white shadow-2xl backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-4xl text-sm leading-7 text-white/72">
          We use cookies and privacy-safe analytics to improve the website
          experience. By continuing to use the site, you agree to this use in
          line with our{" "}
          <Link
            href="/privacy"
            className="text-brand-gold-light underline decoration-brand-gold underline-offset-4"
          >
            privacy policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
