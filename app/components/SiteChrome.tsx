"use client";

import { usePathname } from "next/navigation";
import { CookieConsent } from "@/app/components/CookieConsent";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </div>
  );
}
