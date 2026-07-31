import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const RESOURCES_DIRECTORY = path.join(process.cwd(), "content", "resources");

// Single source of truth for the Knowledge Centre taxonomy. This must stay
// in sync with the "category" select options in public/admin/config.yml --
// adding a new content type later means adding one entry here and one line
// in that select list, nothing else (no new collection, no new route).
export const RESOURCE_CATEGORIES = [
  "Executor Guides",
  "Probate Information",
  "FAQs",
  "Checklists",
  "Bank & Financial Institution Information",
  "Pension & Insurance Guides",
  "Solicitor Resources",
  "Industry News",
  "General Help Articles",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export const RESOURCE_CATEGORY_LINKS = RESOURCE_CATEGORIES.map((category) => ({
  category,
  slug: categoryToSlug(category),
}));

export function findCategoryBySlug(
  categorySlug: string,
): ResourceCategory | undefined {
  return RESOURCE_CATEGORY_LINKS.find((entry) => entry.slug === categorySlug)
    ?.category;
}

export type ResourceSeo = {
  title?: string;
  description?: string;
  slug?: string;
  canonical?: string;
  og_image?: string;
};

export type ResourceFrontmatter = {
  title: string;
  category: string;
  date: string;
  image?: string;
  excerpt: string;
  seo?: ResourceSeo;
};

export type ResourceSummary = ResourceFrontmatter & {
  slug: string;
  categorySlug: string;
};

export type Resource = ResourceSummary & { contentHtml: string };

function readResourceFileNames(): string[] {
  if (!fs.existsSync(RESOURCES_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(RESOURCES_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readFrontmatter(fileName: string) {
  const fullPath = path.join(RESOURCES_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ResourceFrontmatter;
  const slug = frontmatter.seo?.slug || fileName.replace(/\.md$/, "");

  return { frontmatter, content, slug };
}

export function getAllResources(): ResourceSummary[] {
  const resources = readResourceFileNames().map((fileName) => {
    const { frontmatter, slug } = readFrontmatter(fileName);
    return {
      ...frontmatter,
      slug,
      categorySlug: categoryToSlug(frontmatter.category),
    };
  });

  return resources.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getResourcesByCategorySlug(
  categorySlug: string,
): ResourceSummary[] {
  return getAllResources().filter(
    (resource) => resource.categorySlug === categorySlug,
  );
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const fileName = readResourceFileNames().find(
    (name) => readFrontmatter(name).slug === slug,
  );

  if (!fileName) {
    return null;
  }

  const { frontmatter, content, slug: resolvedSlug } =
    readFrontmatter(fileName);
  const processedContent = await remark().use(remarkHtml).process(content);

  return {
    ...frontmatter,
    slug: resolvedSlug,
    categorySlug: categoryToSlug(frontmatter.category),
    contentHtml: processedContent.toString(),
  };
}
