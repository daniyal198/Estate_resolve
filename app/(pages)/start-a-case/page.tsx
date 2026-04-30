import Link from "next/link";
import { MailIcon, PhoneIcon } from "@/app/components/Icons";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Start a Case",
  description:
    "Prepare the information needed to open an estate financial search case with Estate Resolve.",
  path: "/start-a-case",
});

const preparationItems = [
  "The deceased's full legal name, date of death, and last known address",
  "Your relationship to the estate and any probate or authority documents available",
  "Any known banks, pensions, insurers, or investment firms already identified",
  "A clear summary of what the family or adviser needs to confirm before distribution",
];

export default function StartCasePage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Start a Case"
        title="Prepare the Estate Search Properly Before We Open the Matter"
        description="A well-prepared instruction makes the search faster, cleaner, and more useful for the estate."
      />

      <section className="py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.88fr]">
          <article className="border border-brand-border bg-white p-8">
            <div className="section-label">Case Preparation</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.16] font-semibold text-brand-navy">
              What We Usually Need Before Search Work Begins
            </h2>
            <ul className="mt-7 space-y-4">
              {preparationItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-brand-border pb-4 text-[1rem] leading-8 text-brand-slate last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="grid gap-6">
            <article className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Need to talk it through first?
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                If you are unsure whether the estate is ready for a formal
                search, contact us first and we will explain the preparation
                stage and likely next steps.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${config.contact.email}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <MailIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.email}
                </a>
                <a
                  href={`tel:${config.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <PhoneIcon className="h-5 w-5 text-brand-gold" />
                  {config.contact.phone}
                </a>
              </div>
            </article>

            <article className="border border-brand-border bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Need a tailored briefing first?
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                If the estate position is unusual, we can help clarify what
                should be gathered before a formal instruction is opened and
                which issues are likely to matter most.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Contact Estate Resolve
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
