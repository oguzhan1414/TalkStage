export interface DialogueExchange {
  speaker: string;
  role: string;
  en: string;
  /** translation into the reader's own language (Turkish on tr posts, the post language elsewhere); omit if none */
  tr?: string;
  tip?: string;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  heading: string;
  subheading?: string;
  /** paragraphs; may be omitted for sections that are only a dialogue / table / checklist */
  body?: string[];
  /** bullet list shown after the body paragraphs */
  list?: string[];
  keyTakeaway?: string;
  proTip?: string;
  dialogue?: DialogueExchange[];
  table?: ComparisonTable;
  checklist?: string[];
  exampleBox?: {
    title: string;
    wrong?: string;
    correct: string;
    explanation: string;
  };
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogSource {
  name: string;
  /** only when a specific, verified page exists; books/papers can be cited by name alone */
  url?: string;
}

import type { Locale } from "@/i18n/config";

export type BlogCategory =
  // TR
  | "Seviyeler & Gramer"
  | "Kariyer & Mülakat"
  | "Metodoloji & Taktikler"
  | "Seyahat & Günlük Hayat"
  // EN
  | "Levels & Grammar"
  | "Career & Interview"
  | "Methodology & Tactics"
  | "Travel & Daily Life"
  // ES
  | "Niveles y gramática"
  | "Carrera y entrevistas"
  | "Metodología y tácticas"
  | "Viajes y vida cotidiana"
  // PT
  | "Níveis e gramática"
  | "Carreira e entrevistas"
  | "Metodologia e táticas"
  | "Viagens e dia a dia"
  // DE
  | "Niveaus & Grammatik"
  | "Karriere & Vorstellungsgespräch"
  | "Methodik & Lerntipps"
  | "Reisen & Alltag"
  | string;

/** What is written by hand for each article. */
export interface BlogPostSource {
  slug: string;
  locale?: Locale;
  /** H1; may be descriptive and long */
  title: string;
  /** <title> for search results, ≤ 60 characters */
  metaTitle: string;
  /** meta description / card text, 120–158 characters */
  excerpt: string;
  category: BlogCategory;
  /** ISO dates (YYYY-MM-DD) */
  datePublished: string;
  dateModified: string;
  coverImage: string;
  coverAlt: string;
  featured?: boolean;
  /** 3–5 short, self-contained takeaways shown at the top */
  summary: string[];
  content: {
    intro: string[];
    sections: BlogSection[];
    faq: BlogFaq[];
    conclusion: string[];
  };
  sources?: BlogSource[];
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

/** What the pages consume (derived fields filled in by blog-data.ts). */
export interface BlogPost extends BlogPostSource {
  locale: Locale;
  readTime: string;
  readMinutes: number;
  wordCount: number;
  date: string;
  author: BlogAuthor;
  tableOfContents: { id: string; label: string }[];
}

