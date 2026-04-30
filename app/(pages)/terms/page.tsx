import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Read the Estate Resolve terms covering scope, authority to act, fees, and service limitations.",
  path: "/terms",
});

const sections = [
  {
    title: "Scope of Service",
    content:
      "Estate Resolve provides estate financial search services only. We do not provide legal advice, tax advice, or regulated financial advice unless expressly stated in writing.",
  },
  {
    title: "Authority to Instruct",
    content:
      "Anyone instructing the service must have a legitimate connection to the estate and the authority required for the information requested and the actions taken.",
  },
  {
    title: "Fees and Payment",
    content:
      "The service is structured around a clearly stated fixed fee for the agreed scope. Additional work outside that scope would only proceed after separate agreement.",
  },
  {
    title: "Limitations",
    content:
      "We cannot guarantee that assets will be found, that institutions will respond within a specific period, or that third-party records will be complete or current.",
  },
] as const;

export default function TermsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Terms of Service"
        title="Service Terms for Estate Resolve"
        description="These terms explain the basis on which the estate search service is offered and the limits that apply to it."
      />

      <section className="py-20">
        <div className="site-container mx-auto max-w-4xl grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border border-brand-border bg-white px-7 py-6"
            >
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                {section.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-8 text-brand-slate">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
