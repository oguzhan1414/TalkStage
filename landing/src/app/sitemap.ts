import type { MetadataRoute } from "next";
import { LOCALES, TR_ONLY_ROUTES, type RouteKey } from "@/i18n/config";
import { absoluteUrl, localizePath } from "@/i18n/paths";
import { blogPosts } from "@/lib/blog-data";

/** Every public page in every language, with hreflang alternates. */
const PAGES: (RouteKey | "")[] = ["", "about", "contact", "faq", "privacy", "terms", "blog", "onboarding", "login"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    const internal = page ? `/${page}` : "/";
    const langs = LOCALES.filter((l) => !(page && (TR_ONLY_ROUTES as readonly string[]).includes(page) && l !== "tr"));
    const languages = Object.fromEntries(langs.map((l) => [l, absoluteUrl(localizePath(internal, l))]));
    for (const l of langs) {
      entries.push({
        url: absoluteUrl(localizePath(internal, l)),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  for (const post of blogPosts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  return entries;
}

