import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import {
  RESOURCE_CATEGORY_LINKS,
  getAllResources,
} from "@/app/lib/resources";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Resources & Knowledge Centre",
  description:
    "Executor guides, probate information, FAQs, checklists, and other reference material for anyone administering an estate.",
  path: "/resources",
});

export default function ResourcesPage() {
  const resources = getAllResources();

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Knowledge Centre"
        title="Resources for Executors, Administrators, and Solicitors"
        description="Evergreen guidance organised by topic, covering everything from first steps as an executor through to working with banks and pension providers."
      />

      <section className="py-20">
        <div className="site-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_CATEGORY_LINKS.map(({ category, slug }) => {
              const count = resources.filter(
                (resource) => resource.categorySlug === slug,
              ).length;

              return (
                <Link
                  key={slug}
                  href={`/resources/category/${slug}`}
                  className="group flex flex-col justify-between border border-brand-border bg-white p-8 hover:border-brand-gold hover:bg-brand-ivory"
                >
                  <div>
                    <h2 className="font-serif text-[1.2rem] font-semibold text-brand-navy group-hover:text-brand-gold">
                      {category}
                    </h2>
                    <p className="mt-2 text-sm text-brand-slate">
                      {count} {count === 1 ? "article" : "articles"}
                    </p>
                  </div>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    Browse →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
