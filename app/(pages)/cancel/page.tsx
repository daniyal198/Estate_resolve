import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Payment Cancelled",
    description:
      "Payment was cancelled before the Estate Resolve case could be opened.",
    path: "/cancel",
  }),
  robots: {
    follow: false,
    index: false,
  },
};

export default function CancelPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Payment Cancelled"
        title="Your Payment Was Not Completed"
        description="The secure payment step was cancelled before the case could be opened."
      />

      <section className="py-20">
        <div className="site-container max-w-3xl">
          <article className="border border-brand-border bg-white p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              No payment has been taken
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              You can return to the secure case form and submit again whenever
              you are ready. If you need help before proceeding, contact Estate
              Resolve and we will guide you through the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start-a-case"
                className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Return to case form
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-brand-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy hover:border-brand-gold"
              >
                Contact support
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
