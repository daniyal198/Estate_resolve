import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export type BlogPostSeo = {
  title?: string;
  description?: string;
  slug?: string;
  canonical?: string;
  og_image?: string;
};

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  image?: string;
  excerpt: string;
  seo?: BlogPostSeo;
};

export type BlogPostSummary = BlogPostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type BlogPost = BlogPostSummary & { contentHtml: string };

function readBlogFileNames(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readFrontmatter(fileName: string) {
  const fullPath = path.join(BLOG_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;
  const slug = frontmatter.seo?.slug || fileName.replace(/\.md$/, "");

  return { frontmatter, content, slug };
}

const WORDS_PER_MINUTE = 200;

function estimateReadingTimeMinutes(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export function getAllBlogPosts(): BlogPostSummary[] {
  const posts = readBlogFileNames().map((fileName) => {
    const { frontmatter, content, slug } = readFrontmatter(fileName);
    return {
      ...frontmatter,
      slug,
      readingTimeMinutes: estimateReadingTimeMinutes(content),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const fileName = readBlogFileNames().find(
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
    readingTimeMinutes: estimateReadingTimeMinutes(content),
    contentHtml: processedContent.toString(),
  };
}
