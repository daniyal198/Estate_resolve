import Link from "next/link";
import { SolicitorEnquiryForm } from "@/app/components/SolicitorEnquiryForm";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "For Solicitors & Professional Executors",
  description:
    "Estate Resolve provides documented asset and liability search support for solicitors, professional executors, and advisers handling deceased estates.",
  path: "/solicitors",
});

const supportPoints = [
  "evidence of reasonable asset enquiries;",
  "clear reporting for the estate file;",
  "GDPR-conscious handling of personal data;",
  "secure document collection;",
  "confidentiality throughout the process;",
  "a record of institutions contacted and responses received.",
] as const;

const serviceOptions = [
  {
    ctaHref: "/start-a-case?service=standard_estate_search",
    ctaLabel: "Start this search",
    description:
      "For straightforward UK estates where the executor or solicitor requires a structured search across banks, building societies, insurers, pension providers, investment institutions, dormant assets and unclaimed court funds.",
    price: "£175",
    title: "1. Standard Estate Search",
  },
  {
    ctaHref: "/start-a-case?service=asset_liability_search",
    ctaLabel: "Start this search",
    description:
      "Includes everything within the Standard Estate Search together with searches for potential liabilities and financial exposures.",
    details: [
      "County Court Judgments (CCJs)",
      "Insolvency records",
      "Bankruptcy records",
      "Office of the Public Guardian (OPG) checks",
      "Credit bureau and credit reference data where available and appropriate",
      "Other publicly accessible insolvency and liability registers",
      "Company directorships",
    ],
    price: "£210",
    title: "2. Asset & Liability Search",
  },
  {
    ctaHref: "/start-a-case?service=international_estate_search",
    ctaLabel: "Start this search",
    description:
      "Includes all elements of the Standard Estate Search and Asset & Liability Search, together with enquiries relating to overseas assets and financial interests.",
    details: [
      "United Kingdom",
      "United States",
      "Canada",
      "Australia",
      "France",
      "New Zealand",
    ],
    note: "Additional jurisdictions may be considered on request.",
    price: "£350",
    title: "3. International Estate Search",
  },
  {
    ctaHref: "#professional-enquiry",
    ctaLabel: "Request a scoped quote",
    description:
      "Our most comprehensive search package for larger, higher-value or more complex estates, including enhanced research for cross-border and specialist matters.",
    details: [
      "Multiple asset classes",
      "Historic investments",
      "Business interests and directorships",
      "Private company shareholdings",
      "Extensive pension arrangements",
      "Insurance portfolios",
      "Trust interests",
      "Cross-border assets and financial relationships",
      "Complex family or beneficiary structures",
    ],
    note: "Fee on demand, individually scoped according to the jurisdiction, complexity of the estate and the nature of the enquiries required.",
    price: "Fee on demand",
    title: "4. High Net Worth & Bespoke International Estate Search",
  },
] as const;

const comparisonRows = [
  ["Banks & Building Societies", "✓", "✓", "✓"],
  ["Pension Providers", "✓", "✓", "✓"],
  ["Life Insurance Providers", "✓", "✓", "✓"],
  ["Investment Institutions", "✓", "✓", "✓"],
  ["Dormant Assets", "✓", "✓", "✓"],
  ["Unclaimed Court Funds", "✓", "✓", "✓"],
  ["Share Registrars", "", "✓", "✓"],
  ["Company Directorships", "", "✓", "✓"],
  ["County Court Judgments (CCJs)", "", "✓", "✓"],
  ["Bankruptcy Records", "", "✓", "✓"],
  ["Insolvency Records", "", "✓", "✓"],
  ["Office of the Public Guardian (OPG) Checks", "", "✓", "✓"],
  ["Publicly Available Liability Registers", "", "✓", "✓"],
  ["Identity Trace & Address History Research", "", "✓", "✓"],
  ["United States", "", "", "✓"],
  ["Canada", "", "", "✓"],
  ["Australia", "", "", "✓"],
  ["France", "", "", "✓"],
  ["New Zealand", "", "", "✓"],
] as const;

export default function SolicitorsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="For Solicitors"
        title="One instruction. A financial marketplace of tens of thousands of products. One clearer path to identifying estate assets."
        description="Source: Moneyfacts Group, whose research team monitors tens of thousands of UK banking, savings, pension, insurance and investment products."
      />

      <section className="py-20">
        <div className="site-container grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="border border-brand-border bg-white p-8 md:p-10">
            <div className="section-label">For Solicitors & Professional Executors</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.16] font-semibold text-brand-navy">
              Documented search support for professional estate administration
            </h2>
            <p className="mt-5 text-sm leading-8 text-brand-slate">
              Estate Resolve provides discreet, documented asset and liability
              search support for solicitors, executors and professional advisers
              dealing with deceased estates.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-slate">
              Our service helps identify possible UK and international financial
              assets, including bank accounts, building society accounts,
              pensions, insurance policies, investments and shareholdings. We
              provide a clear detailed report showing the institutions
              contacted, the responses received, and any further action
              required.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-slate">
              This can assist solicitors in demonstrating that reasonable
              enquiries have been made before an estate is finalised, helping
              reduce the risk of later-discovered assets, beneficiary disputes,
              delays, or questions over the administration of the estate.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-slate">
              Helps executors and solicitors identify estate assets and
              liabilities more efficiently and with less administration.
            </p>
          </article>

          <article className="border border-brand-border bg-brand-ivory p-8">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              Compliance, Confidentiality &amp; Documentation
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              We understand the importance of compliance, confidentiality and
              professional record-keeping in estate administration.
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              We request only the information necessary to carry out the search
              and provide a documented audit trail of enquiries made.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-brand-slate">
              {supportPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-brand-slate">
              We do not handle client money and we do not administer the
              estate. Our role is limited to asset research, reporting and
              enquiry support.
            </p>
          </article>
        </div>
      </section>

      <section className="pb-20">
        <div className="site-container">
          <div className="section-label">Service Options</div>
          <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2rem,4vw,2.9rem)] leading-[1.14] font-semibold text-brand-navy">
            Structured search packages for straightforward, complex, and
            international estate matters
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {serviceOptions.map((option) => (
              <article
                key={option.title}
                className="flex h-full flex-col border border-brand-border bg-white p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-[1.45rem] font-semibold text-brand-navy">
                    {option.title}
                  </h3>
                  <span className="shrink-0 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
                    {option.price}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-brand-slate">
                  {option.description}
                </p>
                {"details" in option && option.details ? (
                  <ul className="mt-5 space-y-2 text-sm leading-7 text-brand-slate">
                    {option.details.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                ) : null}
                {"note" in option && option.note ? (
                  <p className="mt-5 text-sm leading-7 text-brand-slate">
                    {option.note}
                  </p>
                ) : null}
                <Link
                  href={option.ctaHref}
                  className="mt-8 inline-flex w-fit border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
                >
                  {option.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="site-container">
          <div className="section-label">Service Comparison</div>
          <article className="mt-5 border border-brand-border bg-white p-6 md:p-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-brand-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate">
                      Feature
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate">
                      Standard Estate Search (£175)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate">
                      Asset &amp; Liability Search (£210)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate">
                      International Estate Search (£350)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row[0]}
                      className="border-b border-brand-border last:border-b-0"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-brand-navy">
                        {row[0]}
                      </td>
                      <td className="px-4 py-3 text-sm text-brand-slate">{row[1]}</td>
                      <td className="px-4 py-3 text-sm text-brand-slate">{row[2]}</td>
                      <td className="px-4 py-3 text-sm text-brand-slate">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm leading-7 text-brand-slate">
              All searches are subject to the documentation provided,
              applicable laws, data availability and the requirements of the
              relevant institutions and jurisdictions.
            </p>
          </article>
        </div>
      </section>

      <section className="pb-20">
        <div className="site-container grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <article
            id="professional-enquiry"
            className="border border-brand-border bg-white p-8 md:p-10"
          >
            <div className="section-label">Start a Professional Enquiry</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.16] font-semibold text-brand-navy">
              Please complete the form below and we will respond within two
              working days
            </h2>
            <div className="mt-8">
              <SolicitorEnquiryForm />
            </div>
          </article>

          <article className="border border-brand-border bg-brand-ivory p-8">
            <h2 className="font-serif text-2xl font-semibold text-brand-navy">
              Why solicitors use Estate Resolve
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              One instruction. Hundreds of institutions. Tens of thousands of
              financial products.
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-slate">
              The UK financial marketplace contains tens of thousands of
              banking, savings, pension, insurance and investment products.
              Estate Resolve helps executors, solicitors and families make
              extensive searches to identify assets that may otherwise be
              overlooked.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-brand-slate/72">
              Source: Moneyfacts Group Plc
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
