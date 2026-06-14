import Link from "next/link";
import { ArrowRightIcon } from "@/app/components/Icons";

export function IntroSection() {
  return (
    <section className="py-24">
      <div className="site-container grid gap-16 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="section-label">Who We Help</div>
          <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.18] font-semibold text-brand-navy">
            When a Loved One Passes, Financial Complexity Should Not Add to
            Your Burden
          </h2>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-brand-slate">
            Many estates contain bank accounts, pension products, savings
            vehicles, or investments that family members simply do not know
            exist. These assets may be dormant, overlooked, or held with
            institutions that have never come up in conversation.
          </p>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-brand-slate">
            Estate Resolve provides a structured search designed to help
            solicitors, executors, and families build a more complete financial
            picture of the estate before important decisions are made.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-3 border border-brand-gold bg-brand-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
          >
            Explore the Service
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-px border border-brand-border bg-brand-border">
          <div className="grid gap-px bg-brand-border sm:grid-cols-2">
            <div className="bg-white px-8 py-9 text-center">
              <p className="font-serif text-5xl font-semibold text-brand-navy">
                £<span className="text-brand-gold">50</span>bn
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate">
                Unclaimed Assets in the UK
              </p>
            </div>
            <div className="bg-white px-8 py-9 text-center">
              <p className="font-serif text-5xl font-semibold text-brand-navy">
                <span className="text-brand-gold">1</span> in{" "}
                <span className="text-brand-gold">4</span>
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate">
                Estates with Unknown Accounts
              </p>
            </div>
          </div>
          <div className="bg-brand-navy px-8 py-10">
            <blockquote className="relative pl-6 text-[1rem] leading-8 text-white/78">
              <span className="absolute left-0 top-[-0.4rem] font-serif text-6xl leading-none text-brand-gold">
                &quot;
              </span>
              Industry estimates suggest that up to 1 in 4 people may have
              lost track of a financial asset. A structured estate search helps
              reduce the risk of those relationships being missed during
              probate.&quot;
            </blockquote>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-light">
              Estate Asset Discovery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
