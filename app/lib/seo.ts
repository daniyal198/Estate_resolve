import type { Metadata } from "next";
import { config } from "@/app/lib/config";

export const DEFAULT_OG_IMAGE = "/opengraph-image";

type MetadataInput = {
  title?: string;
  description: string;
  path: string;
  /** Absolute or site-relative URL for the Open Graph / Twitter share image. */
  image?: string;
  /** Overrides the computed canonical URL (e.g. a CMS "Canonical URL" field). */
  canonical?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  canonical,
}: MetadataInput): Metadata {
  const absoluteUrl = new URL(path, config.site.url).toString();
  const canonicalUrl = canonical || absoluteUrl;
  const resolvedTitle = title || config.site.name;
  const socialTitle = title
    ? `${title} | ${config.site.name}`
    : config.site.name;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl,
      siteName: config.site.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
