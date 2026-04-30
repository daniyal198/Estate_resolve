import type { Metadata } from "next";
import { config } from "@/app/lib/config";

type MetadataInput = {
  title?: string;
  description: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: MetadataInput): Metadata {
  const absoluteUrl = new URL(path, config.site.url).toString();
  const resolvedTitle = title || config.site.name;
  const socialTitle = title
    ? `${title} | ${config.site.name}`
    : config.site.name;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl,
      siteName: config.site.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
