import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { config } from "@/app/lib/config";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Clear total-fee pricing for Estate Resolve estate asset, liability and international searches.",
  path: "/pricing",
});

const packageDescriptions = {
  standard_estate_search:
    "For straightforward UK estates requiring a structured search for financial assets.",
  asset_liability_search:
    "Includes the standard asset search together with liability, insolvency and related checks.",
  international_estate_search:
    "Includes UK asset and liability searches together with searches in the listed overseas jurisdictions.",
} as const;

const bespokePackage = {
  ctaHref: "/contact",
  description: "For complex, high-value or multi-jurisdiction estates.",
  priceLabel: "Price on request",
  title: "High Net Worth/Bespoke Search",
};

export default function PricingPage() {
  const estatePackages = config.pricing.servicePackages.filter(
    (servicePackage) =>
      servicePackage.value in packageDescriptions,
  );

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Pricing"
        title="Clear total-fee pricing before you start"
        description="Choose the right estate search package and see the total fee before proceeding to secure payment. No commission is charged on assets located."
      />

      <section className="py-20">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          {estatePackages.map((servicePackage) => (
            <article
              key={servicePackage.value}
              className="flex h-full flex-col border border-brand-border bg-white p-8 md:p-10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="font-serif text-[1.55rem] font-semibold text-brand-navy">
                  {servicePackage.label}
                </h2>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
                  {servicePackage.priceLabel}
                </p>
              </div>
              <p className="mt-5 flex-1 text-sm leading-7 text-brand-slate">
                {
                  packageDescriptions[
                    servicePackage.value as keyof typeof packageDescriptions
                  ]
                }
              </p>
              <Link
                href={`/start-a-case?service=${servicePackage.value}`}
                className="mt-8 inline-flex w-fit border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
              >
                Start This Search
              </Link>
            </article>
          ))}

          <article className="flex h-full flex-col border border-brand-border bg-white p-8 md:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="font-serif text-[1.55rem] font-semibold text-brand-navy">
                {bespokePackage.title}
              </h2>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold">
                {bespokePackage.priceLabel}
              </p>
            </div>
            <p className="mt-5 flex-1 text-sm leading-7 text-brand-slate">
              {bespokePackage.description}
            </p>
            <Link
              href={bespokePackage.ctaHref}
              className="mt-8 inline-flex w-fit border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
            >
              Start This Search
            </Link>
          </article>
        </div>

        <div className="site-container mt-10 border border-brand-border bg-brand-ivory p-8">
          <h2 className="font-serif text-2xl font-semibold text-brand-navy">
            Looking for assets in your own name?
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-brand-slate">
            Personal Asset Search is separate from deceased estate searches.
            It is available only to the person whose assets are being searched
            for, or to a properly authorised representative, attorney or deputy.
          </p>
          <Link
            href="/personal-asset-search"
            className="mt-6 inline-flex border border-brand-gold bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-brand-gold-light hover:text-brand-navy"
          >
            Personal Asset Search
          </Link>
        </div>
      </section>
    </main>
  );
}
