import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { getAllBlogPosts } from "@/app/lib/blog";
import { buildMetadata } from "@/app/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Guidance on probate, executor duties, and financial asset tracing from the Estate Resolve team.",
  path: "/blog",
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main id="main-content" className="flex-1">
      <PageHero
        compact
        eyebrow="Journal"
        title="Insights on Estate Administration and Asset Tracing"
        description="Practical guidance for executors, administrators, and solicitors handling the financial side of an estate."
      />

      <section className="py-20">
        <div className="site-container">
          {posts.length === 0 ? (
            <p className="text-brand-slate">
              No articles have been published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col border border-brand-border bg-white p-8 hover:border-brand-gold hover:bg-brand-ivory"
                >
                  {post.image ? (
                    <div className="mb-5 aspect-[16/10] w-full overflow-hidden bg-brand-ivory">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true" className="text-brand-slate/50">
                      ·
                    </span>
                    <span className="text-brand-slate/70">
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-[1.3rem] font-semibold text-brand-navy group-hover:text-brand-gold">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-brand-slate">
                    {post.excerpt}
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
