import type { MetadataRoute } from "next";
import { SITE_URL } from "@/i18n/config";

// Search and AI answer engines are welcome: the goal is to be cited (SEO + AEO + GEO).
// Private/app areas stay out of every crawler's reach.
const PRIVATE = ["/app", "/go", "/api"];
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training / search
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on behalf of a user
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews usage control
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
