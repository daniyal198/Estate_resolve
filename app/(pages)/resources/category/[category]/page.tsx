import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import {
  RESOURCE_CATEGORY_LINKS,
  findCategoryBySlug,
  getResourcesByCategorySlug,
} from "@/app/lib/resources";
import { buildMetadata } from "@/app/lib/seo";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return RESOURCE_CATEGORY_LINKS.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);

  if (!category) {
    return buildMetadata({
      title: "Category Not Found",
      description: "This resource category could not be found.",
      path: `/resources/category/${categorySlug}`,
    });
  }

  return buildMetadata({
    title: category,
    description: `${category} from the Estate Resolve Knowledge Centre.`,
    path: `/resources/category/${categorySlug}`,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ResourceCategoryPage({
  params,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const resources = getResourcesByCategorySlug(categorySlug);

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        eyebrow="Knowledge Centre"
        title={category}
        description={
          <Link
            href="/resources"
            className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-gold-light hover:text-white"
          >
            ← All Categories
          </Link>
        }
      />

      <section className="py-20">
        <div className="site-container">
          {resources.length === 0 ? (
            <p className="text-brand-slate">
              No articles have been published in this category yet — check
              back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group flex flex-col border border-brand-border bg-white p-8 hover:border-brand-gold hover:bg-brand-ivory"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    {formatDate(resource.date)}
                  </p>
                  <h2 className="mt-3 font-serif text-[1.2rem] font-semibold text-brand-navy group-hover:text-brand-gold">
                    {resource.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-brand-slate">
                    {resource.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
