import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the Estate Resolve privacy policy covering personal data, lawful basis, retention, cookies, and contact details.",
  path: "/privacy",
});

const sections = [
  {
    title: "1. Who we are",
    paragraphs: [
      `${config.company.fullLegalName}.`,
      "We are responsible for deciding how your personal data is used.",
    ],
  },
  {
    title: "2. Information we collect",
    paragraphs: [
      "We may collect and process the following types of personal data:",
      "We only collect information that is necessary to assess enquiries, provide estate search services, and manage related cases.",
    ],
    bullets: [
      "Contact information such as name, email address, and phone number.",
      "Identification and authority information, for example proof of relationship to an estate or authority to act.",
      "Information provided in enquiry forms, emails, or correspondence.",
      "Estate-related information relevant to your request, such as names of deceased persons and financial or asset-related details where applicable.",
      "Records of communications and case notes.",
    ],
  },
  {
    title: "3. How we use your information",
    paragraphs: ["We use your personal data to:"],
    bullets: [
      "Assess and respond to enquiries.",
      "Verify identity and authority to act in relation to an estate.",
      "Conduct estate tracing and financial search activities.",
      "Produce reports and case outcomes.",
      "Communicate with you regarding your enquiry or case.",
      "Comply with legal, regulatory, and record-keeping obligations.",
    ],
  },
  {
    title: "4. Legal basis for processing",
    paragraphs: [
      "We process personal data under the following lawful bases under UK GDPR:",
    ],
    bullets: [
      "Contract, where processing is necessary to provide our services.",
      "Legal obligation, where we are required to retain or disclose information under law.",
      "Legitimate interests, to operate, manage, and improve our services, including fraud prevention and case administration.",
    ],
  },
  {
    title: "5. Sharing your information",
    paragraphs: [
      "We do not sell personal data.",
      "We may share your information where necessary with:",
      "All third parties are required to handle your data securely and in compliance with data protection law.",
    ],
    bullets: [
      "IT and cloud service providers for secure data storage and communication.",
      "Email and communication service providers.",
      "Professional advisers such as legal or compliance advisers where required.",
      "Financial or data search service providers used in the course of estate tracing.",
    ],
  },
  {
    title: "6. International data transfers",
    paragraphs: [
      "Some of our service providers may be located outside the UK or European Economic Area. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or equivalent legal protections.",
    ],
  },
  {
    title: "7. Data retention",
    paragraphs: [
      "We retain personal data only for as long as necessary for the purposes for which it was collected.",
      "After this period, data is securely deleted or anonymised.",
    ],
    bullets: [
      "Active case files: retained for the duration of the case and up to 6 to 7 years after closure.",
      "Unsuccessful or inactive enquiries: retained for up to 24 months, unless there is a legal requirement to retain them longer.",
    ],
  },
  {
    title: "8. Data security",
    paragraphs: [
      "We take appropriate technical and organisational measures to protect your personal data, including:",
    ],
    bullets: [
      "Restricted access to case information.",
      "Secure cloud storage systems.",
      "Encryption of data in transit where appropriate.",
      "Staff confidentiality obligations.",
    ],
  },
  {
    title: "9. Your rights",
    paragraphs: [
      "Under UK GDPR, you have the right to:",
      "You also have the right to lodge a complaint with the Information Commissioner's Office.",
    ],
    bullets: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate or incomplete data.",
      "Request deletion of your data where applicable.",
      "Restrict or object to certain processing activities.",
      "Request data portability in certain circumstances.",
    ],
  },
  {
    title: "10. Cookies",
    paragraphs: [
      "This website uses only essential cookies necessary for its operation and does not use tracking or advertising cookies.",
    ],
  },
  {
    title: "11. Changes to this policy",
    paragraphs: [
      "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    title: "12. Contact",
    paragraphs: [
      "If you have any questions about this privacy policy or how we handle your data, please contact:",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Privacy Policy"
        title="How Estate Resolve Handles Personal Data"
        description="This policy explains what information we collect, why we use it, how long we keep it, and how to contact us about data protection matters."
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
                  {section.title === "9. Your rights" &&
                  paragraph.includes("Information Commissioner's Office") ? (
                    <>
                      You also have the right to lodge a complaint with the{" "}
                      <Link
                        href="https://ico.org.uk"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
                      >
                        Information Commissioner&apos;s Office (ICO)
                      </Link>
                      .
                    </>
                  ) : (
                    paragraph
                  )}
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
              {section.title === "12. Contact" ? (
                <div className="mt-4 space-y-2 text-[1rem] leading-8 text-brand-slate">
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
