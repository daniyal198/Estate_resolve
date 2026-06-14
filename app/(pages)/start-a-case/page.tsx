import Link from "next/link";
import { IntakeForm } from "@/app/components/IntakeForm";
import { MailIcon, PhoneIcon } from "@/app/components/Icons";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

const authorityFormHref = "/documents/estate-resolve-authority-to-act-form.pdf";

export const metadata = buildMetadata({
  title: "Start a Case",
  description:
    "Submit your estate enquiry securely, upload supporting documents, and continue to secure Stripe payment.",
  path: "/start-a-case",
});

const preparationItems = [
  {
    description: "A clear copy of the deceased's death certificate.",
    title: "Death Certificate (required)",
  },
  {
    description:
      "A valid passport, driving licence or other government-issued photo identification for the instructing party.",
    title: "Proof of Identity (required)",
  },
  {
    description:
      "A recent proof of address for the instructing party, dated within the last 3 months, such as a utility bill, bank statement, council tax bill or other official correspondence. Financial information may be redacted, provided the name, address and date remain clearly visible.",
    title: "Proof of Address (required)",
  },
  {
    description:
      "Download, complete, sign and upload the Estate Resolve Authority to Act Form, authorising Estate Resolve to make enquiries with banks, building societies, pension providers, insurers, investment managers and other relevant organisations on behalf of the estate.",
    title: "Completed Estate Resolve Authority to Act Form (required)",
  },
  {
    description:
      "Please provide any probate documentation already obtained or a copy of the will showing the named executor.",
    title: "Will, Grant of Probate or Letters of Administration (where available)",
  },
] as const;

export default function StartCasePage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Start a Case"
        title="Submit Your Estate Enquiry Securely"
        description="Provide the estate details, upload supporting documents if available, and continue to secure payment to open the case."
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
              identity and authority documents where available. Once the form is
              complete, you will be redirected to secure payment for the fixed
              fee of {config.pricing.fixedFee}.
            </p>
            <div className="mt-8">
              <IntakeForm />
            </div>
          </article>

          <div className="grid gap-6">
            <article className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Documents to Upload
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                Please provide copies of the following documents to help us
                process your enquiry and verify authority to act on behalf of
                the estate:
              </p>
            <ul className="mt-7 space-y-5">
              {preparationItems.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-brand-border pb-5 last:border-b-0 last:pb-0"
                >
                  <p className="text-[1rem] font-semibold leading-7 text-brand-navy">
                    ✓ {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-brand-slate">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
              <div className="mt-7 rounded-2xl border border-brand-border bg-white p-6">
                <h3 className="text-[1rem] font-semibold text-brand-navy">
                  Download the Authority to Act Form
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-slate">
                  Please download this form, complete it, sign it, and include
                  it with your supporting documents when opening the case.
                </p>
                <a
                  href={authorityFormHref}
                  download
                  className="mt-5 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
                >
                  Download authority form
                </a>
              </div>
              <div className="mt-7 border-t border-brand-border pt-6">
                <h3 className="text-[1rem] font-semibold text-brand-navy">
                  Security &amp; Confidentiality
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-slate">
                  All documents are transmitted via a secure encrypted
                  connection and handled in accordance with applicable data
                  protection requirements.
                </p>
              </div>
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
              <Link
                href="/book-a-consultation"
                className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Book a consultation
              </Link>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <MailIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.email}
                </a>
                <a
                  href={config.contact.phoneHref}
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
                After payment is confirmed, we issue the case reference by
                email, begin the financial search process
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
