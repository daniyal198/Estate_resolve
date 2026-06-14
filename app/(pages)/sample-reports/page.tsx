import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Sample Reports",
  description:
    "Review sample Estate Resolve reports to see how findings and enquiry progress are presented.",
  path: "/sample-reports",
});

const sampleReports = [
  {
    description:
      "A sample of how potential asset matches, address history, and indicative values are presented.",
    href: "/reports/asset-discovery-report.html",
    title: "Asset Discovery Report",
  },
  {
    description:
      "A sample showing enquiry volumes, response rates, and recent notification outcomes across institutions.",
    href: "/reports/enquiries-notifications-report.html",
    title: "Enquiries & Notifications Report",
  },
] as const;

export default function SampleReportsPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Sample Reports"
        title="See How Findings Are Presented"
        description="These sample reports show the style and structure of the documents Estate Resolve can produce during the estate search process."
      />

      <section className="py-20">
        <div className="site-container grid gap-6 md:grid-cols-2">
          {sampleReports.map((report) => (
            <article
              key={report.href}
              className="border border-brand-border bg-white p-8"
            >
              <h2 className="font-serif text-[1.6rem] font-semibold text-brand-navy">
                {report.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                {report.description}
              </p>
              <a
                href={report.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Open sample report
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
