import type { Metadata } from "next";
import Link from "next/link";
import { PaidCaseConversion } from "@/app/components/PaidCaseConversion";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";
import { verifyPaidCheckoutSession } from "@/app/lib/stripe";

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

// The page reflects live Stripe state, so it must never be served from a cache.
export const dynamic = "force-dynamic";

type SuccessPageProps = {
  searchParams: Promise<{
    case_reference?: string;
    session_id?: string;
  }>;
};

const primaryButtonClassName =
  "inline-flex items-center justify-center border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy";
const secondaryButtonClassName =
  "inline-flex items-center justify-center border border-brand-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy hover:border-brand-gold";

function UnconfirmedPayment({ sessionId }: { sessionId: string | null }) {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Payment Not Confirmed"
        title="We Could Not Confirm This Payment"
        description="Stripe has not reported a completed payment for this page, so no case has been opened."
      />

      <section className="py-20">
        <div className="site-container max-w-3xl space-y-8">
          <article className="border border-amber-200 bg-amber-50 p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              No confirmed payment for this link
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              This page only confirms a case once Stripe reports the payment as
              complete. That confirmation has not been received, which usually
              means the payment was not finished, the checkout link has expired,
              or this page was opened directly rather than through the secure
              payment flow.
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              If you believe you have been charged, please contact us with the
              date and amount and we will check it against our payment records
              straight away. Do not submit a second payment.
            </p>
            {sessionId ? (
              <p className="mt-5 text-xs uppercase tracking-[0.12em] text-brand-slate/72">
                Reference: {sessionId}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/start-a-case" className={primaryButtonClassName}>
                Return to case form
              </Link>
              <Link href="/contact" className={secondaryButtonClassName}>
                Contact support
              </Link>
            </div>
          </article>

          <article className="border border-brand-border bg-white p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              Speak to us directly
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              {config.contact.officeHours}
            </p>
            <div className="mt-5 space-y-2 text-sm font-semibold text-brand-navy">
              <p>
                <a href={`mailto:${config.contact.email}`}>
                  {config.contact.email}
                </a>
              </p>
              <p>
                <a href={config.contact.phoneHref}>{config.contact.phone}</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId =
    typeof params.session_id === "string" && params.session_id.length > 0
      ? params.session_id
      : null;

  // The query string is attacker- and history-supplied. Only Stripe's own
  // record of the session may be treated as proof of payment.
  const paidSession = sessionId
    ? await verifyPaidCheckoutSession(sessionId)
    : null;

  if (!paidSession) {
    return <UnconfirmedPayment sessionId={sessionId} />;
  }

  const caseReference = paidSession.caseReference;

  return (
    <main id="main-content" className="flex-1">
      <PaidCaseConversion
        caseReference={caseReference}
        sessionId={paidSession.sessionId}
      />
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
            {paidSession.serviceLabel ? (
              <p className="mt-5 text-sm font-semibold text-emerald-800">
                Service: {paidSession.serviceLabel}
              </p>
            ) : null}
            {paidSession.amountPaid ? (
              <p className="mt-2 text-sm font-semibold text-emerald-800">
                Amount paid: {paidSession.amountPaid}
              </p>
            ) : null}
            {caseReference ? (
              <p className="mt-2 text-sm font-semibold text-emerald-800">
                Case reference: {caseReference}
              </p>
            ) : null}
            {paidSession.clientEmail ? (
              <p className="mt-2 text-sm leading-7 text-brand-slate">
                Confirmation sent to {paidSession.clientEmail}.
              </p>
            ) : null}
            <p className="mt-5 text-xs uppercase tracking-[0.12em] text-brand-slate/72">
              Stripe session: {paidSession.sessionId}
            </p>
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
              <Link href="/" className={primaryButtonClassName}>
                Return home
              </Link>
              <Link href="/contact" className={secondaryButtonClassName}>
                Contact support
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
