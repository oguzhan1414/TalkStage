export interface DialogueExchange {
  speaker: string;
  role: string;
  en: string;
  tr: string;
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
  body: string[];
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
  url: string;
}

export type BlogCategory = "Seviyeler & Gramer" | "Kariyer & Mülakat" | "Metodoloji & Taktikler" | "Seyahat & Günlük Hayat";

/** What is written by hand for each article. */
export interface BlogPostSource {
  slug: string;
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
  /** 3–5 short, self-contained takeaways shown at the top ("Kısaca") */
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
  readTime: string;
  readMinutes: number;
  wordCount: number;
  /** human-readable Turkish date */
  date: string;
  author: BlogAuthor;
  tableOfContents: { id: string; label: string }[];
}
