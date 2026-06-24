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
      "See how Estate Resolve brings together financial institution enquiries, address history research and supporting findings into a clear, structured report designed to support probate and estate administration.",
    disclaimer:
      "Sample report shown for demonstration purposes only. Actual reports will vary and may contain different information, findings and supporting documentation depending on the circumstances of each estate.",
    href: "/reports/asset-discovery-report.html",
    title: "Illustrative Asset Discovery Report",
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
        <div className="site-container max-w-2xl">
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
              {"disclaimer" in report && report.disclaimer ? (
                <p className="mt-3 text-sm leading-7 text-brand-slate">
                  {report.disclaimer}
                </p>
              ) : null}
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
