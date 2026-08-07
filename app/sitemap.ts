import type { MetadataRoute } from "next";
import {
  getMetadataBase,
  INDEXABLE_ROUTES,
  isProductionSite,
} from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) {
    return [];
  }

  const base = getMetadataBase();

  return INDEXABLE_ROUTES.map((path) => ({
    url: path === "/" ? `${base.origin}/` : new URL(path, base).href,
  }));
}
