import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryToSlug,
  getAllResources,
  getResourceBySlug,
} from "@/app/lib/resources";
import { buildMetadata } from "@/app/lib/seo";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllResources().map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return buildMetadata({
      title: "Article Not Found",
      description: "This article could not be found.",
      path: `/resources/${slug}`,
    });
  }

  return buildMetadata({
    title: resource.seo?.title || resource.title,
    description: resource.seo?.description || resource.excerpt,
    path: `/resources/${resource.seo?.slug || resource.slug}`,
    image: resource.seo?.og_image || resource.image,
    canonical: resource.seo?.canonical,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const categorySlug = categoryToSlug(resource.category);

  return (
    <main id="main-content" className="flex-1">
      <section className="bg-brand-navy pt-[120px] text-white">
        <div className="site-container py-16 md:py-20">
          <Link
            href={`/resources/category/${categorySlug}`}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light hover:text-white"
          >
            ← {resource.category}
          </Link>
          <p className="section-label mt-6 text-brand-gold-light">
            {formatDate(resource.date)}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.14] font-semibold">
            {resource.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-container max-w-3xl">
          {resource.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resource.image}
              alt={resource.title}
              className="mb-10 aspect-[16/9] w-full object-cover"
            />
          ) : null}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: resource.contentHtml }}
          />
        </div>
      </section>
    </main>
  );
}
