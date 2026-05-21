import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Payment Confirmed",
    description:
      "Payment has been confirmed and your Estate Resolve case is now open.",
    path: "/success",
  }),
  robots: {
    follow: false,
    index: false,
  },
};

type SuccessPageProps = {
  searchParams: Promise<{
    case_reference?: string;
    session_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const caseReference =
    typeof params.case_reference === "string" && params.case_reference.length > 0
      ? params.case_reference
      : null;
  const sessionId =
    typeof params.session_id === "string" && params.session_id.length > 0
      ? params.session_id
      : null;

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Payment Confirmed"
        title="Your Case Has Been Opened"
        description="Thank you. Your payment has been received and your Estate Resolve case is now in progress."
      />

      <section className="py-20">
        <div className="site-container max-w-4xl space-y-8">
          <article className="border border-emerald-200 bg-emerald-50 p-8 md:p-10">
            <h2 className="font-serif text-3xl font-semibold text-brand-navy">
              Confirmation received
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              We have received your payment and sent a confirmation email. Our
              team can now begin the financial search process.
            </p>
            {caseReference ? (
              <p className="mt-5 text-sm font-semibold text-emerald-800">
                Case reference: {caseReference}
              </p>
            ) : null}
            {sessionId ? (
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-brand-slate/72">
                Stripe session: {sessionId}
              </p>
            ) : null}
          </article>

          <article className="border border-brand-border bg-white p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              What happens next
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-brand-slate">
              <li>1. Your case information and uploaded documents are now linked to your payment.</li>
              <li>2. Estate Resolve begins the financial search process.</li>
              <li>3. You will receive updates within the standard review window.</li>
              <li>4. The final report will be delivered once the search is complete.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Return home
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
