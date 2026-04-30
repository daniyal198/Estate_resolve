"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/app/components/Icons";
import { navigationLinks } from "@/app/lib/site-data";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(176,141,78,0.24)] bg-brand-navy/95 backdrop-blur">
      <div className="site-container flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-serif text-[1.3rem] font-semibold tracking-[0.02em] text-white"
          onClick={() => setIsOpen(false)}
        >
          Estate<span className="text-brand-gold">Resolve</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navigationLinks.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-[0.08em] uppercase ${
                  active
                    ? "text-brand-gold-light"
                    : "text-white/72 hover:text-brand-gold-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/start-a-case"
            className="border border-brand-gold bg-brand-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
          >
            Start a Case
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-brand-navy lg:hidden"
        >
          <nav className="site-container flex flex-col py-5">
            {navigationLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b border-white/10 py-3 text-sm font-semibold uppercase tracking-[0.12em] ${
                    active
                      ? "text-brand-gold-light"
                      : "text-white/78 hover:text-brand-gold-light"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/start-a-case"
              className="mt-4 inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              onClick={() => setIsOpen(false)}
            >
              Start a Case
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
