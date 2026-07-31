import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/app/lib/blog";
import { buildMetadata } from "@/app/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article Not Found",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.seo?.slug || post.slug}`,
    image: post.seo?.og_image || post.image,
    canonical: post.seo?.canonical,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content" className="flex-1">
      <section className="bg-brand-navy pt-[120px] text-white">
        <div className="site-container py-16 md:py-20">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light hover:text-white"
          >
            ← Back to Blog
          </Link>
          <div className="section-label mt-6 text-brand-gold-light">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.14] font-semibold">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-container max-w-3xl">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              className="mb-10 aspect-[16/9] w-full object-cover"
            />
          ) : null}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </section>

      <MoreArticles currentSlug={post.slug} />
    </main>
  );
}

function MoreArticles({ currentSlug }: { currentSlug: string }) {
  const otherPosts = getAllBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (otherPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-brand-border py-16 md:py-20">
      <div className="site-container max-w-3xl">
        <h2 className="section-label text-brand-gold">More from the Blog</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border border-brand-border bg-white p-6 hover:border-brand-gold hover:bg-brand-ivory"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                {formatDate(post.date)}
              </p>
              <h3 className="mt-2 font-serif text-base font-semibold text-brand-navy group-hover:text-brand-gold">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
