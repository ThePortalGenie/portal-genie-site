import type { MetadataRoute } from "next";
import { isProductionSite, PRODUCTION_SITE_URL } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PRODUCTION_SITE_URL}/sitemap.xml`,
  };
}
