import BlogIndexClient from "./BlogIndexClient";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getPostsByLocale } from "@/lib/blog-data";
import { absoluteUrl, alternatesFor, localizePath } from "@/i18n/paths";
import { pageLocale, type PageProps } from "@/i18n/page";
import { breadcrumbSchema, ORG_ID, SITE_ID } from "@/i18n/schema";
import { LOCALE_META, type Locale } from "@/i18n/config";

const BLOG_META: Record<Locale, { title: string; description: string; homeLabel: string; blogLabel: string }> = {
  tr: {
    title: "Blog — İngilizce Konuşma ve Öğrenme Rehberleri | Spekvia",
    description: "A1–C2 seviye rehberleri, iş ve mülakat İngilizcesi, telaffuz, kelime ezberleme ve seyahat kalıpları: İngilizce konuşmayı geliştirmek için Spekvia yazıları.",
    homeLabel: "Ana Sayfa",
    blogLabel: "Blog",
  },
  en: {
    title: "Blog — English Speaking and Learning Guides | Spekvia",
    description: "Practical guides for speaking English: level breakdowns, job interviews, developer standups, IELTS prep, and daily solo speaking routines.",
    homeLabel: "Home",
    blogLabel: "Blog",
  },
  es: {
    title: "Blog — Guías para hablar y aprender inglés | Spekvia",
    description: "Guías prácticas para hablar inglés: errores comunes de hispanohablantes, falsos amigos, entrevistas de trabajo y pronunciación paso a paso.",
    homeLabel: "Inicio",
    blogLabel: "Blog",
  },
  pt: {
    title: "Blog — Guias de conversação e aprendizado de inglês | Spekvia",
    description: "Guias práticos para destravar o inglês falado: erros comuns de brasileiros, pronúncia do TH e -ed, vagas remotas e rotinas diárias.",
    homeLabel: "Início",
    blogLabel: "Blog",
  },
  de: {
    title: "Blog — Ratgeber für englische Sprachpraxis & Karriere | Spekvia",
    description: "Praxisnahe Leitfäden für flüssiges Englisch: typische Denglisch-Fehler, False Friends, Business English für Meetings und Vorstellungsgespräche.",
    homeLabel: "Startseite",
    blogLabel: "Blog",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await pageLocale(params);
  const meta = BLOG_META[locale] || BLOG_META.tr;
  const canonicalUrl = absoluteUrl(localizePath("/blog", locale));

  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor("/blog", locale),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: "website",
      locale: LOCALE_META[locale]?.ogLocale || "en_US",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.jpg"],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const meta = BLOG_META[locale] || BLOG_META.tr;
  const posts = getPostsByLocale(locale);
  const url = absoluteUrl(localizePath("/blog", locale));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${url}#blog`,
            url,
            name: meta.title,
            description: meta.description,
            inLanguage: locale,
            isPartOf: { "@id": SITE_ID },
            publisher: { "@id": ORG_ID },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(localizePath(`/blog/${p.slug}`, locale)),
              datePublished: p.datePublished,
              dateModified: p.dateModified,
            })),
          },
          breadcrumbSchema(locale, [
            { name: meta.homeLabel, path: "/" },
            { name: meta.blogLabel, path: "/blog" },
          ]),
        ]}
      />
      <BlogIndexClient locale={locale} initialPosts={posts} />
    </>
  );
}
