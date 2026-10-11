import BlogIndexClient from "./BlogIndexClient";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/lib/blog-data";
import { absoluteUrl, alternatesFor, localizePath } from "@/i18n/paths";
import { pageLocale, type PageProps } from "@/i18n/page";
import { breadcrumbSchema, ORG_ID, SITE_ID } from "@/i18n/schema";

const TITLE = "Blog — İngilizce Konuşma ve Öğrenme Rehberleri | Spekvia";
const DESCRIPTION =
  "A1–C2 seviye rehberleri, iş ve mülakat İngilizcesi, telaffuz, kelime ezberleme ve seyahat kalıpları: İngilizce konuşmayı geliştirmek için Spekvia yazıları.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("/blog", "tr", ["tr"]),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(localizePath("/blog", "tr")),
    type: "website",
    locale: "tr_TR",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
};

export default async function BlogPage({ params }: PageProps) {
  const locale = await pageLocale(params);
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
            name: "Spekvia Blog",
            description: DESCRIPTION,
            inLanguage: "tr",
            isPartOf: { "@id": SITE_ID },
            publisher: { "@id": ORG_ID },
            blogPost: blogPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(localizePath(`/blog/${p.slug}`, locale)),
              datePublished: p.datePublished,
              dateModified: p.dateModified,
            })),
          },
          breadcrumbSchema(locale, [
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <BlogIndexClient />
    </>
  );
}
