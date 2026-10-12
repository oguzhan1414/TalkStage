import type { Locale } from "@/i18n/config";
import type { BlogAuthor, BlogPost, BlogPostSource, BlogSection } from "./blog/types";
import { levelPosts } from "./blog/posts/levels";
import { grammarPosts } from "./blog/posts/grammar";
import { careerPosts } from "./blog/posts/career";
import { practicePosts } from "./blog/posts/practice";
import { extraSections } from "./blog/posts/extensions";
import { enPosts } from "./blog/posts/en";
import { esPosts } from "./blog/posts/es";
import { ptPosts } from "./blog/posts/pt";
import { dePosts } from "./blog/posts/de";

export type { BlogCategory, BlogPost, BlogSection, BlogFaq, BlogSource, DialogueExchange, ComparisonTable } from "./blog/types";

/** Localized editorial authors */
export const BLOG_AUTHORS: Record<Locale, BlogAuthor> = {
  tr: {
    name: "Spekvia Editör Ekibi",
    role: "İngilizce konuşma pratiği içerik ekibi",
    avatar: "/brand/spekvia-app-icon.png",
  },
  en: {
    name: "Spekvia Editorial Team",
    role: "English speaking practice editorial team",
    avatar: "/brand/spekvia-app-icon.png",
  },
  es: {
    name: "Equipo editorial de Spekvia",
    role: "Equipo de práctica de conversación en inglés",
    avatar: "/brand/spekvia-app-icon.png",
  },
  pt: {
    name: "Equipe editorial do Spekvia",
    role: "Equipe de conteúdo de conversação em inglês",
    avatar: "/brand/spekvia-app-icon.png",
  },
  de: {
    name: "Spekvia Redaktionsteam",
    role: "Redaktionsteam für englische Sprachpraxis",
    avatar: "/brand/spekvia-app-icon.png",
  },
};

export const BLOG_AUTHOR: BlogAuthor = BLOG_AUTHORS.tr;

const WORDS_PER_MINUTE = 200;

const count = (s: string | undefined) => (s ? s.split(/\s+/).filter(Boolean).length : 0);

function sectionWords(s: BlogSection): number {
  let n = count(s.heading) + count(s.subheading) + count(s.keyTakeaway) + count(s.proTip);
  s.body?.forEach((p) => (n += count(p)));
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
    .replace(/ä/g, "ae")
    .replace(/ß/g, "ss")
    .replace(/á|à|ã|â/g, "a")
    .replace(/é|ê/g, "e")
    .replace(/í/g, "i")
    .replace(/ó|õ|ô/g, "o")
    .replace(/ú/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const dateFormats: Record<Locale, Intl.DateTimeFormat> = {
  tr: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  es: new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  pt: new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  de: new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

function formatReadTime(minutes: number, locale: Locale): string {
  switch (locale) {
    case "en":
      return `${minutes} min read`;
    case "es":
      return `${minutes} min de lectura`;
    case "pt":
      return `${minutes} min de leitura`;
    case "de":
      return `${minutes} Min. Lesezeit`;
    default:
      return `${minutes} dk okuma`;
  }
}

const faqMeta: Record<Locale, { id: string; label: string }> = {
  tr: { id: "sss", label: "Sık sorulan sorular" },
  en: { id: "faq", label: "Frequently asked questions" },
  es: { id: "preguntas-frecuentes", label: "Preguntas frecuentes" },
  pt: { id: "perguntas-frequentes", label: "Perguntas frequentes" },
  de: { id: "haeufige-fragen", label: "Häufig gestellte Fragen" },
};

function enrich(p: BlogPostSource): BlogPost {
  const locale: Locale = p.locale || "tr";
  const c = p.content;
  let words = count(p.title);
  p.summary.forEach((x) => (words += count(x)));
  c.intro.forEach((x) => (words += count(x)));
  c.sections.forEach((s) => (words += sectionWords(s)));
  c.faq.forEach((f) => (words += count(f.q) + count(f.a)));
  c.conclusion.forEach((x) => (words += count(x)));

  const faqInfo = faqMeta[locale] || faqMeta.tr;
  const used = new Set<string>([faqInfo.id]);
  const tableOfContents = c.sections.map((s, i) => {
    let id = slugifyHeading(s.heading) || `sec-${i + 1}`;
    while (used.has(id)) id = `${id}-${i + 1}`;
    used.add(id);
    return { id, label: s.heading.replace(/^\d+[.)]\s*/, "") };
  });
  if (c.faq.length) tableOfContents.push({ id: faqInfo.id, label: faqInfo.label });

  const readMinutes = Math.max(3, Math.ceil(words / WORDS_PER_MINUTE));
  const formatter = dateFormats[locale] || dateFormats.tr;
  return {
    ...p,
    locale,
    wordCount: words,
    readMinutes,
    readTime: formatReadTime(readMinutes, locale),
    date: formatter.format(new Date(`${p.datePublished}T00:00:00Z`)),
    author: BLOG_AUTHORS[locale] || BLOG_AUTHOR,
    tableOfContents,
  };
}

const trSources: BlogPostSource[] = [...levelPosts, ...grammarPosts, ...careerPosts, ...practicePosts].map((p) => {
  const extra = extraSections[p.slug];
  const postWithExtra = extra?.length ? { ...p, content: { ...p.content, sections: [...p.content.sections, ...extra] } } : p;
  return { ...postWithExtra, locale: "tr" as const };
});

const sources: BlogPostSource[] = [
  ...trSources,
  ...enPosts,
  ...esPosts,
  ...ptPosts,
  ...dePosts,
];

export const blogPosts: BlogPost[] = sources
  .map(enrich)
  .sort((a, b) => (a.datePublished < b.datePublished ? 1 : a.datePublished > b.datePublished ? -1 : 0));

export function getPostsByLocale(locale: Locale): BlogPost[] {
  return blogPosts.filter((p) => p.locale === locale);
}

export function getPostBySlug(slug: string, locale?: Locale): BlogPost | undefined {
  if (locale) {
    return blogPosts.find((p) => p.slug === slug && p.locale === locale);
  }
  return blogPosts.find((p) => p.slug === slug);
}
