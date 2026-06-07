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
    title: "Bank and Savings Searches",
    description:
      "Structured outreach to identify current accounts, savings accounts, and cash-based financial relationships relevant to the estate.",
  },
  {
    title: "Investment and Policy Tracing",
    description:
      "Search support aimed at uncovering Pensions, investment accounts, insurance-linked holdings, and similar products that may not be immediately visible.",
  },
  {
    title: "Reporting for Estate Administration",
    description:
      "A formal report of findings, ideal for solicitors and executors, providing a clear audit trail to support probate preparation and next-step decisions.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Services"
        title="A Focused Service for Estate Asset Discovery"
        description="Providing Confidence That Every Estate Asset Has Been Accounted For."
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
