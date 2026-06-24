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
    title: "Professional",
    description:
      "Structured enquiries, clear reporting and a thorough approach to estate asset research.",
  },
  {
    title: "Discreet",
    description:
      "Sensitive matters handled confidentially, securely and with respect at every stage.",
  },
  {
    title: "Trusted",
    description:
      "A dependable service designed to help executors, families and solicitors navigate estate administration with confidence.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="About Estate Resolve"
          title="Inspired by Personal Experience"
          description="Estate Resolve was inspired by the founder's personal experience of administering the estate of a loved one and discovering the challenges involved in tracing lost or forgotten assets. Our service was created to help families, executors and solicitors navigate that process with greater confidence and clarity."
        />

        <section className="py-20">
          <div className="site-container grid gap-14 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <div className="section-label">Our Approach</div>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.16] font-semibold text-brand-navy">
                Professional, Discreet and Trusted
              </h2>
              <p className="mt-6 max-w-2xl text-[1.03rem] leading-8 text-brand-slate">
                Estate Resolve is positioned as a calm, professional service for
                executors, solicitors, and families who need to confirm whether
                hidden or forgotten financial assets exist.
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
      <StandardsSection title="Giving Solicitors, Executors and Families Greater Confidence and Peace of Mind in the Probate Process." />
    </>
  );
}
