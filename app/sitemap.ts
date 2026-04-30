import type { MetadataRoute } from "next";
import { config } from "@/app/lib/config";

const routes = [
  "",
  "/about",
  "/contact",
  "/faqs",
  "/how-it-works",
  "/privacy",
  "/services",
  "/start-a-case",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${config.site.url}${route}`,
    lastModified,
  }));
}
