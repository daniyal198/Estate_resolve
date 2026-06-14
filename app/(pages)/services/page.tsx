import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "See what Estate Resolve includes in an estate financial search and how the service supports executors and advisers.",
  path: "/services",
});

const services = [
  {
    title: "Institution Search Coverage",
    description:
      "We conduct enquiries with over 140 financial institutions, covering banks, building societies, pension providers, insurers, investment managers, share registrars, and court registers representing more than 400 UK financial brands and trading names.",
  },
  {
    title: "Tracing Across Financial Relationships",
    description:
      "Search support is aimed at uncovering current and savings accounts, investments, pensions, insurance products, NS&I holdings, and similar financial relationships that may not be immediately visible to the estate.",
  },
  {
    title: "Probate-Ready Reporting",
    description:
      "You receive a consolidated report of findings suitable for executors, administrators, solicitors, and probate preparation, with a clear audit trail for next-step decisions.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Services"
        title="One instruction. Hundreds of institutions. Tens of thousands of financial products."
        description="The UK financial marketplace contains tens of thousands of banking, savings, pension, insurance and investment products. Estate Resolve helps executors, solicitors and families make extensive searches to identify assets that may otherwise be overlooked."
      />

      <section className="py-20">
        <div className="site-container grid gap-px border border-brand-border bg-brand-border md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="bg-white p-8">
              <h2 className="font-serif text-[1.45rem] font-semibold text-brand-navy">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                {service.description}
              </p>
            </article>
          ))}
        </div>
        <div className="site-container mt-8 border border-brand-border bg-brand-ivory p-8">
          <h2 className="font-serif text-2xl font-semibold text-brand-navy">
            View Sample Reports
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-slate">
            Review sample Estate Resolve reports to see how asset findings and
            institution enquiry progress can be presented for executors,
            families, and professional advisers.
          </p>
          <Link
            href="/sample-reports"
            className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
          >
            Open sample reports
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-brand-slate/72">
            Source: Moneyfacts Group Plc
          </p>
        </div>
      </section>
    </main>
  );
}
