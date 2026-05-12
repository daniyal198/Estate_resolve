import Link from "next/link";
import { IntakeForm } from "@/app/components/IntakeForm";
import { MailIcon, PhoneIcon } from "@/app/components/Icons";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Start a Case",
  description:
    "Submit your estate enquiry securely, upload supporting documents, and receive confirmation by email.",
  path: "/start-a-case",
});

const preparationItems = [
  "A copy of the death certificate or interim coroner's certificate",
  "A form of authority appointing you as executor or to act on behalf of the estate, including either Grant of Representation, the Will, or a signed engagement letter",
  "A copy of your passport",
  "Proof of address, such as a utility bill or bank statement",
];

export default function StartCasePage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Start a Case"
        title="Submit Your Estate Enquiry Securely"
        description="Provide the estate details, upload supporting documents if available, and we will confirm receipt by email with a case reference."
      />

      <section className="py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="border border-brand-border bg-white p-8 md:p-10">
            <div className="section-label">Case Preparation</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.16] font-semibold text-brand-navy">
              Open the matter with the details we need most
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-slate">
              This intake form is designed to gather the core estate facts so
              we can assess the instruction properly. Please include the key
              identity and authority documents where available so we can review
              the matter without delay.
            </p>
            <div className="mt-8">
              <IntakeForm />
            </div>
          </article>

          <div className="grid gap-6">
            <article className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Helpful before you submit
              </h2>
            <ul className="mt-7 space-y-4">
              {preparationItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-brand-border pb-4 text-[1rem] leading-8 text-brand-slate last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
            </article>

            <article className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Need to talk it through first?
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                If you are unsure whether the estate is ready for a formal
                search, contact us first and we will explain the preparation
                stage and likely next steps.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <MailIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.email}
                </a>
                <a
                  href={`tel:${config.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <PhoneIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.phone}
                </a>
              </div>
            </article>

            <article className="border border-brand-border bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                What happens next?
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                Once submitted, we confirm receipt by email, review the case
                details, and come back with the appropriate next steps for the
                estate.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Ask a question first
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
