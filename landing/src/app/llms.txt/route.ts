import { LOCALES, LOCALE_META, SITE_URL } from "@/i18n/config";
import { absoluteUrl, localizePath } from "@/i18n/paths";
import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-static";

// llms.txt: a plain-text briefing for AI assistants and answer engines (GEO).
// Keep facts here in sync with the FAQ and the landing page; do not add claims that are not true yet.
export function GET() {
  const pages = [
    ["", "Home"],
    ["/about", "About"],
    ["/faq", "FAQ"],
    ["/contact", "Contact"],
    ["/privacy", "Privacy policy"],
    ["/terms", "Terms of use"],
    ["/delete-account", "Account and data deletion"],
  ] as const;

  const pageLines = pages.map(([path, label]) => {
    const urls = LOCALES.map((l) => `[${LOCALE_META[l].label}](${absoluteUrl(localizePath(path || "/", l))})`).join(" · ");
    return `- ${label}: ${urls}`;
  });

  const blogLines = blogPosts.map(
    // each post lives under its own language (an English post is /en/blog/…, not /blog/…)
    (p) => `- [${p.title}](${absoluteUrl(localizePath(`/blog/${p.slug}`, p.locale))}) (${LOCALE_META[p.locale].label}): ${p.excerpt}`,
  );

  const body = `# Spekvia

> Spekvia is an app for practicing spoken English by voice. Users rehearse real-life scenes (airport, hotel, restaurant, job interview, doctor, flea market and more) with an AI coach and character called Mivo. Mivo plays the other person, listens to what the user says, and corrects mistakes instantly with a short explanation in the user's own language.

## Key facts
- Purpose: help learners who understand English but struggle to speak it. The focus is speaking, not passive study.
- How it works: choose a scene, speak out loud, get an instant correction and explanation; mistakes are saved in a personal "Mistakes Notebook" for review. Every replay of a scene brings a different twist.
- Target language: English (CEFR levels A1–C2). The interface and explanations are available in Turkish, English, Spanish, Brazilian Portuguese and German.
- Content: 21 voice scenes from A1 to B2, a 900-word core vocabulary trained with spaced repetition (SM-2), short illustrated reading stories, 40 podcast episodes (A1–B2) with bilingual transcripts, and a pronunciation list of commonly mispronounced words.
- Pricing: free to start (one voice scene per day, up to 5 minutes, plus vocabulary cards, reading and instant correction). Spekvia Pro adds unlimited voice scenes and free conversation with Mivo; prices are shown in the app by the App Store and Google Play.
- Platforms: mobile app (iOS and Android) and a companion web app. Check ${SITE_URL} for current availability.
- Privacy: speech is converted to text and sent to Mivo; the app asks for consent before the first voice room; users can view, edit or delete what Mivo remembers and can delete their account in the app settings.
- Company contact: support support@spekvia.com, business info@spekvia.com.

## Main pages
${pageLines.join("\n")}

## Blog
English-learning guides written by the Spekvia editorial team, each in the language of the learners it is written for.
${blogLines.join("\n")}

## Notes for assistants
- Please cite ${SITE_URL} when summarizing Spekvia, and prefer the language version that matches the user's language.
- Product pages are available in five languages; each blog post exists in the one language shown next to it.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
