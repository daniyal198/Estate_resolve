"use client";

import { useEffect } from "react";

// decap-cms-app ships its own PropTypes checks that misfire against React 19's
// stricter children handling (e.g. its internal ErrorBoundary/Modal components).
// They're harmless -- the CMS works fine -- but Next's dev overlay treats any
// console.error as a blocking "Console Error" screen, so filter this one known
// third-party warning rather than let it obscure the admin UI during local dev.
const DECAP_PROPTYPES_NOISE =
  /Failed prop type: Invalid prop `children` supplied to `(ErrorBoundary|Modal)`/;

function isKnownDecapWarning(args: unknown[]) {
  return typeof args[0] === "string" && DECAP_PROPTYPES_NOISE.test(args[0]);
}

export default function AdminPage() {
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      if (isKnownDecapWarning(args)) return;
      originalConsoleError(...args);
    };

    import("decap-cms-app").then(({ default: CMS }) => {
      CMS.init();
    });

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <>
      <link rel="cms-config-url" href="/admin/config.yml" type="text/yaml" />
      {/* eslint-disable-next-line @next/next/no-css-tags -- brand overrides for the third-party Decap CMS widget, loaded outside Next's CSS pipeline on purpose */}
      <link rel="stylesheet" href="/admin/theme.css" />
      <div id="nc-root" />
    </>
  );
}
