import type { MetadataRoute } from "next";
import {
  getMetadataBase,
  INDEXABLE_ROUTES,
  isProductionSite,
} from "@/config/seo";
import { listIndexablePublicArticles } from "@/lib/knowledge/load-article";
import { getResourcesUrlPath } from "@/lib/knowledge/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) {
    return [];
  }

  const base = getMetadataBase();

  const staticRoutes = INDEXABLE_ROUTES.map((path) => ({
    url: path === "/" ? `${base.origin}/` : new URL(path, base).href,
  }));

  const resourceArticles = listIndexablePublicArticles().map((article) => ({
    url: new URL(getResourcesUrlPath(article.slug), base).href,
  }));

  return [...staticRoutes, ...resourceArticles];
}
