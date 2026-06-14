import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Read the Estate Resolve terms covering the scope of service, fees, limitations, confidentiality, and governing law.",
  path: "/terms",
});

const sections = [
  {
    title: "1. About these terms",
    paragraphs: [
      'These Terms & Conditions ("Terms") govern your use of our website and services provided by Estate Resolve ("we", "us", "our").',
      "By engaging our services or submitting an enquiry, you confirm that you have read, understood, and agreed to these Terms.",
    ],
  },
  {
    title: "2. Nature of our services",
    paragraphs: [
      "Estate Resolve provides estate tracing, financial search, and information retrieval services in relation to probate and estate matters.",
      "Our services are informational and investigative in nature and may include the identification of potential assets, beneficiaries, or estate-related information.",
      "We do not provide legal advice, financial advice, or court representation unless explicitly agreed in writing.",
    ],
  },
  {
    title: "3. No guarantee of outcome",
    paragraphs: [
      "While we apply reasonable skill, care, and diligence in carrying out our services, we do not guarantee:",
      "Estate tracing and asset identification depend on external data sources and third-party records, which may be incomplete, outdated, or unavailable.",
    ],
    bullets: [
      "The discovery of assets, beneficiaries, or estate value.",
      "The accuracy, completeness, or availability of third-party information sources.",
      "Any specific financial or legal outcome arising from our work.",
    ],
  },
  {
    title: "4. Client responsibility and authority",
    paragraphs: [
      "By instructing us, you confirm that:",
      "We reserve the right to refuse or terminate services where authority cannot be verified or where misuse is suspected.",
    ],
    bullets: [
      "You have a legitimate interest or authority to request estate-related information.",
      "Any information provided to us is accurate and complete to the best of your knowledge.",
      "You will not use our services for unlawful, fraudulent, or improper purposes.",
    ],
  },
  {
    title: "5. Use of third-party sources",
    paragraphs: [
      "Our services may rely on information obtained from third-party databases, public records, financial institutions, or other external sources.",
      "We do not control these sources and accept no responsibility for their accuracy, availability, or completeness.",
    ],
  },
  {
    title: "6. Fees and payments",
    paragraphs: [
      "Fees, where applicable, will be agreed in writing before work commences.",
      "Unless otherwise stated:",
    ],
    bullets: [
      "Fees are non-refundable once work has commenced.",
      "Any estimates provided are indicative only unless confirmed in writing as fixed.",
      "We reserve the right to pause work where payment terms are not met.",
    ],
  },
  {
    title: "7. Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law:",
      "Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under law.",
    ],
    bullets: [
      "We shall not be liable for any indirect, incidental, or consequential loss or damage.",
      "Our total liability for any claim arising out of or in connection with our services shall not exceed the total fees paid to us for the specific matter in question.",
      "We accept no liability for losses arising from reliance on third-party data or external information sources.",
    ],
  },
  {
    title: "8. Confidentiality",
    paragraphs: [
      "We treat all client information as strictly confidential and will only disclose information where:",
    ],
    bullets: [
      "Required to deliver our services.",
      "Required by law or regulatory authority.",
      "Authorised by you in writing.",
    ],
  },
  {
    title: "9. Data protection",
    paragraphs: [
      "We process personal data in accordance with our Privacy Policy and applicable UK data protection law.",
    ],
  },
  {
    title: "10. Suspension or termination of services",
    paragraphs: [
      "We may suspend or terminate services immediately if:",
    ],
    bullets: [
      "We reasonably believe there is misuse, fraud, or unlawful activity.",
      "Required information or payments are not provided.",
      "We are unable to verify authority or identity.",
    ],
  },
  {
    title: "11. Intellectual property",
    paragraphs: [
      "All reports, documents, and materials produced by Estate Resolve remain our intellectual property until full payment has been received, after which the client is granted a non-exclusive right to use them for their intended purpose.",
    ],
  },
  {
    title: "12. Force majeure",
    paragraphs: [
      "We are not liable for any failure or delay in performance caused by events beyond our reasonable control, including system failures, data provider outages, regulatory changes, or force majeure events.",
    ],
  },
  {
    title: "13. Changes to terms",
    paragraphs: [
      "We may update these Terms from time to time. The latest version will always be available on our website.",
    ],
  },
  {
    title: "14. Governing law",
    paragraphs: [
      "These Terms are governed by the laws of England and Wales, and any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    title: "15. Contact",
    paragraphs: [
      "If you have any questions regarding these Terms, please contact:",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Terms & Conditions"
        title="Terms for Using Estate Resolve"
        description="These terms explain the basis on which Estate Resolve provides estate tracing and financial search services, including the limits that apply."
      />

      <section className="py-20">
        <div className="site-container mx-auto max-w-4xl grid gap-4">
          <article className="border border-brand-border bg-brand-ivory px-7 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
              Effective date
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold text-brand-navy">
              1 January 2026
            </p>
            <p className="mt-3 text-[1rem] leading-8 text-brand-slate">
              Website: estateresolve.co.uk
            </p>
          </article>
          {sections.map((section) => (
            <article
              key={section.title}
              className="border border-brand-border bg-white px-7 py-6"
            >
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-[1rem] leading-8 text-brand-slate"
                >
                  {paragraph}
                </p>
              ))}
              {"bullets" in section && section.bullets ? (
                <ul className="mt-4 space-y-3 pl-5 text-[1rem] leading-8 text-brand-slate">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.title === "15. Contact" ? (
                <div className="mt-4 space-y-2 text-[1rem] leading-8 text-brand-slate">
                  <p>Estate Resolve</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${config.contact.email}`}
                      className="font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
                    >
                      {config.contact.email}
                    </a>
                  </p>
                  <p>Address: {config.company.fullLegalName}, {config.contact.address}.</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
