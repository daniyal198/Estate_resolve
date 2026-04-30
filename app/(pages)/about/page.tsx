import { PageHero } from "@/app/components/PageHero";
import { StandardsSection } from "@/app/components/StandardsSection";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "About Estate Resolve",
  description:
    "Learn about Estate Resolve, our service approach, and the standards behind our estate financial search work.",
  path: "/about",
});

const values = [
  {
    title: "Clarity",
    description:
      "Executors and families should understand exactly what is being searched, why it matters, and what the next step is.",
  },
  {
    title: "Discretion",
    description:
      "Bereavement cases require professional restraint. Sensitive information is handled carefully and only for legitimate estate purposes.",
  },
  {
    title: "Professionalism",
    description:
      "The service is designed to sit comfortably alongside legal and probate workflows rather than creating confusion around them.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="About Estate Resolve"
          title="A Professional Estate Search Service Built for Difficult Moments"
          description="We are focused on one thing: helping estates reach financial clarity through a disciplined search process that families and advisers can trust."
        />

        <section className="py-20">
          <div className="site-container grid gap-14 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <div className="section-label">Our Approach</div>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.16] font-semibold text-brand-navy">
                Designed Around Trust, Not Noise
              </h2>
              <p className="mt-6 max-w-2xl text-[1.03rem] leading-8 text-brand-slate">
                Estate Resolve is positioned as a calm, professional service for
                executors, solicitors, and families who need to confirm whether
                hidden or forgotten financial assets exist. The work sits in the
                space between uncertainty and action.
              </p>
              <p className="mt-5 max-w-2xl text-[1.03rem] leading-8 text-brand-slate">
                We understand that the people arriving here are often dealing
                with grief, probate pressure, or the responsibility of ensuring
                nothing is missed. Our role is to bring structure to that part
                of the process.
              </p>
            </div>

            <div className="grid gap-px border border-brand-border bg-brand-border">
              {values.map((value) => (
                <article key={value.title} className="bg-white p-8">
                  <h3 className="font-serif text-2xl font-semibold text-brand-navy">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-slate">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <StandardsSection />
    </>
  );
}
