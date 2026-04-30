import type { MetadataRoute } from "next";
import { config } from "@/app/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.site.url}/sitemap.xml`,
  };
}
