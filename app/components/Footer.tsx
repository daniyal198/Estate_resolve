import Link from "next/link";
import { config } from "@/app/lib/config";
import { footerGroups } from "@/app/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(176,141,78,0.22)] bg-[#091828] text-white">
      <div className="site-container grid gap-12 py-16 md:grid-cols-[1.25fr_2fr]">
        <div className="max-w-sm">
          <Link
            href="/"
            className="font-serif text-[1.2rem] font-semibold tracking-[0.02em]"
          >
            Estate<span className="text-brand-gold">Resolve</span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-white/64">
            Professional estate financial search services for families,
            executors, and advisers who need a complete picture before
            distributing an estate.
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/38">
            Professional Estate Financial Services
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-light">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/56 hover:text-brand-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-3 py-6 text-sm text-white/36 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Estate Resolve. All rights reserved.</p>
          <p>
            {config.contact.serviceArea} · {config.contact.address} ·{" "}
            {config.contact.email} · {config.contact.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
