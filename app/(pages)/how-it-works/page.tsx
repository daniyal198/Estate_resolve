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
  "Details of the deceased, including full name, address, and date of birth",
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
          title="Managing a loved one's estate is never easy. Our aim is to help reduce uncertainty, simplify the search for financial assets, and make the estate administration process as smooth and manageable as possible."
          description="Our process is designed to bring structure, transparency, and consistency to the search phase through the use of technology-enabled workflows, systematic data analysis, and professionally governed procedures from initial instruction through to final reporting."
          titleClassName="mt-5 max-w-3xl text-lg leading-8 text-white/66"
          descriptionClassName="mt-5 max-w-3xl text-lg leading-8 text-white/66"
        />

        <section className="py-20">
          <div className="site-container grid gap-14 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <div className="section-label">What to Expect</div>
              <h2 className="mt-5 max-w-3xl text-[1.03rem] leading-8 text-brand-slate">
                Estate Resolve may only undertake enquiries where authorised by
                the executor named in the will, the person entitled to
                administer the estate, or a solicitor acting on their behalf.
                Please download and sign the Authority to Act form before
                submitting your instructions.
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
