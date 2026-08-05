import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Personal Asset Search",
  description:
    "Search for potentially forgotten or unclaimed financial assets held in your own name, or on behalf of someone where you have proper authority.",
  path: "/personal-asset-search",
});

const eligibilityItems = [
  "Someone searching for assets held in their own name.",
  "A properly authorised representative, attorney or deputy acting on their behalf.",
] as const;

const assetTypes = [
  "Bank and building society accounts",
  "Savings and investment products",
  "Shares and share registrars",
  "Pensions and insurance policies",
  "Other financial assets where a structured search may help",
] as const;

export default function PersonalAssetSearchPage() {
  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Personal Asset Search"
        title="Find lost or forgotten financial assets in your name"
        description="Estate Resolve helps individuals search for potentially forgotten or unclaimed bank accounts, savings, investments, shares, pensions and other financial assets held in their own name."
      />

      <section className="py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="border border-brand-border bg-white p-8 md:p-10">
            <div className="section-label">Personal Searches</div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,4vw,2.7rem)] leading-[1.16] font-semibold text-brand-navy">
              A clear written report for your own financial search
            </h2>
            <p className="mt-5 text-sm leading-8 text-brand-slate">
              Estate Resolve helps individuals search for potentially forgotten
              or unclaimed bank accounts, savings, investments, shares, pensions
              and other financial assets held in their own name. You will
              receive a clear written report explaining the search results and
              any next steps that may be required to make a claim.
            </p>
            <p className="mt-4 text-sm leading-8 text-brand-slate">
              The total fee for the Personal Asset Search will be agreed before
              publishing its price or starting the search.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex border border-brand-gold bg-brand-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:-translate-y-0.5 hover:bg-brand-gold-light hover:text-brand-navy"
            >
              Start a Personal Search
            </Link>
          </article>

          <div className="grid gap-6">
            <article className="border border-brand-border bg-brand-ivory p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Who can use this service
              </h2>
              <p className="mt-4 text-sm leading-7 text-brand-slate">
                This service is available only to:
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-slate">
                {eligibilityItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-brand-slate">
                It must not be used to investigate the private financial
                affairs of another living person without their authority.
              </p>
            </article>

            <article className="border border-brand-border bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                What the search can cover
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-brand-slate">
                {assetTypes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
