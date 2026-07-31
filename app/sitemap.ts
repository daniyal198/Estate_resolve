import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/app/lib/blog";
import { config } from "@/app/lib/config";
import { RESOURCE_CATEGORY_LINKS, getAllResources } from "@/app/lib/resources";

const routes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/faqs",
  "/how-it-works",
  "/privacy",
  "/resources",
  "/services",
  "/start-a-case",
  "/terms",
];

/**
 * A CMS "Canonical URL" override means the entry has designated a different
 * page as authoritative, so its own URL shouldn't be listed as indexable.
 */
function isSelfCanonical(path: string, canonical?: string) {
  if (!canonical) return true;
  return new URL(canonical, config.site.url).toString() ===
    new URL(path, config.site.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = routes.map((route) => ({
    url: `${config.site.url}${route}`,
    lastModified,
  }));

  const blogEntries = getAllBlogPosts()
    .filter((post) => isSelfCanonical(`/blog/${post.slug}`, post.seo?.canonical))
    .map((post) => ({
      url: `${config.site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  const resourceCategoryEntries = RESOURCE_CATEGORY_LINKS.map(({ slug }) => ({
    url: `${config.site.url}/resources/category/${slug}`,
    lastModified,
  }));

  const resourceEntries = getAllResources()
    .filter((resource) =>
      isSelfCanonical(`/resources/${resource.slug}`, resource.seo?.canonical),
    )
    .map((resource) => ({
      url: `${config.site.url}/resources/${resource.slug}`,
      lastModified: new Date(resource.date),
    }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...resourceCategoryEntries,
    ...resourceEntries,
  ];
}
