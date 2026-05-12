import Link from "next/link";
import { ArrowRightIcon } from "@/app/components/Icons";

export function CallToAction() {
  return (
    <section className="cta-shell py-24 text-white">
      <div className="site-container relative z-10 text-center">
        <div className="section-label justify-center text-brand-gold-light">
          Take the First Step
        </div>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.14] font-semibold text-white">
          Ready to Begin? Start Secure Intake and Upload Your Documents.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-8 text-white/66">
          Most families can submit the initial estate details in under ten
          minutes. You can also send supporting documents securely as part of
          the enquiry.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/start-a-case"
            className="inline-flex items-center gap-3 border border-brand-gold bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
          >
            Begin Secure Intake
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.16em] text-white/42">
          Secure upload · Confirmation emails · UK-Based · Fixed Fee
        </p>
      </div>
    </section>
  );
}
