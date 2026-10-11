import type { BlogAuthor, BlogPost, BlogPostSource, BlogSection } from "./blog/types";
import { levelPosts } from "./blog/posts/levels";
import { grammarPosts } from "./blog/posts/grammar";
import { careerPosts } from "./blog/posts/career";
import { practicePosts } from "./blog/posts/practice";
import { extraSections } from "./blog/posts/extensions";

export type { BlogCategory, BlogPost, BlogSection, BlogFaq, BlogSource, DialogueExchange, ComparisonTable } from "./blog/types";

/** All articles are published by the editorial team (no individual bylines). */
export const BLOG_AUTHOR: BlogAuthor = {
  name: "Spekvia Editör Ekibi",
  role: "İngilizce konuşma pratiği içerik ekibi",
  avatar: "/brand/spekvia-app-icon.png",
};

const WORDS_PER_MINUTE = 200;

const count = (s: string | undefined) => (s ? s.split(/\s+/).filter(Boolean).length : 0);

function sectionWords(s: BlogSection): number {
  let n = count(s.heading) + count(s.subheading) + count(s.keyTakeaway) + count(s.proTip);
  s.body.forEach((p) => (n += count(p)));
  s.list?.forEach((p) => (n += count(p)));
  s.checklist?.forEach((p) => (n += count(p)));
  s.dialogue?.forEach((d) => (n += count(d.en) + count(d.tr) + count(d.tip)));
  s.table?.rows.forEach((r) => r.forEach((c) => (n += count(c))));
  if (s.exampleBox) n += count(s.exampleBox.wrong) + count(s.exampleBox.correct) + count(s.exampleBox.explanation);
  return n;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/^\d+[.)]\s*/, "")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const dateFormat = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function enrich(p: BlogPostSource): BlogPost {
  const c = p.content;
  let words = count(p.title);
  p.summary.forEach((x) => (words += count(x)));
  c.intro.forEach((x) => (words += count(x)));
  c.sections.forEach((s) => (words += sectionWords(s)));
  c.faq.forEach((f) => (words += count(f.q) + count(f.a)));
  c.conclusion.forEach((x) => (words += count(x)));

  const used = new Set<string>(["sss"]);
  const tableOfContents = c.sections.map((s, i) => {
    let id = slugifyHeading(s.heading) || `bolum-${i + 1}`;
    while (used.has(id)) id = `${id}-${i + 1}`;
    used.add(id);
    return { id, label: s.heading.replace(/^\d+[.)]\s*/, "") };
  });
  if (c.faq.length) tableOfContents.push({ id: "sss", label: "Sık sorulan sorular" });

  const readMinutes = Math.max(3, Math.ceil(words / WORDS_PER_MINUTE));
  return {
    ...p,
    wordCount: words,
    readMinutes,
    readTime: `${readMinutes} dk okuma`,
    date: dateFormat.format(new Date(`${p.datePublished}T00:00:00Z`)),
    author: BLOG_AUTHOR,
    tableOfContents,
  };
}

const sources: BlogPostSource[] = [...levelPosts, ...grammarPosts, ...careerPosts, ...practicePosts].map((p) => {
  const extra = extraSections[p.slug];
  return extra?.length ? { ...p, content: { ...p.content, sections: [...p.content.sections, ...extra] } } : p;
});

export const blogPosts: BlogPost[] = sources
  .map(enrich)
  .sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0));
