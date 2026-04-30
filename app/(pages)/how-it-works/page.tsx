import Link from "next/link";
import { CallToAction } from "@/app/components/CallToAction";
import { PageHero } from "@/app/components/PageHero";
import { ProcessSection } from "@/app/components/ProcessSection";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "Understand the Estate Resolve process from instruction and authority checks through to the final report.",
  path: "/how-it-works",
});

const checklist = [
  "Details of the deceased, including full name, address, and date of death",
  "Your role in the estate, such as executor, administrator, or legal representative",
  "Any existing documents that show authority to act or confirm the estate position",
  "Known banks, investment providers, pension providers, or insurance companies",
];

export default function HowItWorksPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        <PageHero
          eyebrow="The Process"
          title="A Clear Process From First Instruction to Final Reporting"
          description="Estate work is already complex enough. Our process is designed to keep the search stage structured, professional, and easy to follow."
        />

        <section className="py-20">
          <div className="site-container grid gap-14 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <div className="section-label">What to Expect</div>
              <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-[1.16] font-semibold text-brand-navy">
                We Break the Matter Into Four Disciplined Stages
              </h2>
              <p className="mt-6 max-w-2xl text-[1.03rem] leading-8 text-brand-slate">
                Each instruction begins with an authority and scope review. Once
                that is clear, we open the matter, contact relevant
                institutions, track responses, and assemble a formal findings
                report for the estate record.
              </p>
              <p className="mt-5 max-w-2xl text-[1.03rem] leading-8 text-brand-slate">
                The aim is not simply to contact as many institutions as
                possible. The aim is to carry out a careful, evidenced search
                that helps the executor or adviser act with confidence.
              </p>
            </div>

            <aside className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Helpful Before You Start
              </h2>
              <ul className="mt-6 space-y-4">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="border-b border-brand-border pb-4 text-sm leading-7 text-brand-slate last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start-a-case"
                className="mt-7 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Prepare a Case
              </Link>
            </aside>
          </div>
        </section>

        <ProcessSection detailed />
      </main>
      <CallToAction />
    </>
  );
}
