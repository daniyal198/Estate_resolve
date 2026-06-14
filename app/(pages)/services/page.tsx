import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

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
        title="A Focused Service for Estate Asset Discovery"
        description="Helping executors and advisers take reasonable steps to identify financial assets before an estate is distributed."
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
      </section>
    </main>
  );
}
