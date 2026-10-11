import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/i18n/Link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/lib/blog-data";
import { alternatesFor, absoluteUrl, localizePath } from "@/i18n/paths";
import { pageLocale } from "@/i18n/page";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/i18n/schema";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  // The blog is written for Turkish learners and exists in Turkish only.
  return blogPosts.map((post) => ({
    locale: "tr",
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Makale bulunamadı — Spekvia", robots: { index: false } };
  }

  const url = absoluteUrl(localizePath(`/blog/${post.slug}`, "tr"));
  return {
    title: post.metaTitle,
    description: post.excerpt,
    alternates: alternatesFor(`/blog/${slug}`, "tr", ["tr"]),
    openGraph: {
      title: post.metaTitle,
      description: post.excerpt,
      url,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      section: post.category,
      images: [{ url: post.coverImage, width: 1440, height: 810, alt: post.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.excerpt, images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const locale = await pageLocale(params);
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(localizePath(path, locale));

  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === post.category);
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== post.category);
  const relatedPosts = [...sameCategory, ...others].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    alternativeHeadline: post.metaTitle,
    description: post.excerpt,
    image: [absoluteUrl(post.coverImage)],
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "tr",
    articleSection: post.category,
    wordCount: post.wordCount,
    author: { "@type": "Organization", "@id": ORG_ID, name: post.author.name },
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: true,
    ...(post.sources?.length ? { citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })) } : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema(locale, [
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
          ...(post.content.faq.length ? [faqSchema(locale, post.content.faq, path)] : []),
        ]}
      />
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <article className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Sayfa yolu" className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-indigo transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold truncate max-w-xs sm:max-w-md">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mt-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
              <span className="rounded-full bg-indigo/10 px-3 py-1 font-semibold text-indigo">{post.category}</span>
              <span className="text-muted">{post.readTime}</span>
              <span>•</span>
              <time dateTime={post.datePublished} className="text-muted">
                {post.date}
              </time>
            </div>

            <h1
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem] leading-[1.15]"
            >
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-body sm:text-xl">{post.excerpt}</p>

            {/* Author + update date */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-line/80 py-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-line">
                <Image src={post.author.avatar} alt={post.author.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold text-heading">{post.author.name}</p>
                <p className="text-xs text-muted">{post.author.role}</p>
              </div>
              <p className="text-xs text-muted">
                Son güncelleme:{" "}
                <time dateTime={post.dateModified}>
                  {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
                    new Date(`${post.dateModified}T00:00:00Z`),
                  )}
                </time>
              </p>
            </div>
          </header>

          {/* Cover */}
          <div className="my-10 relative overflow-hidden rounded-[28px] border border-line bg-porcelain p-2 shadow-[var(--shadow-lifted)] sm:p-4">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-[22px] object-cover"
            />
          </div>

          {/* Summary (answer-first) */}
          <aside aria-label="Kısaca" className="my-8 rounded-2xl border border-indigo/20 bg-indigo/5 p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-indigo">Kısaca</h2>
            <ul className="mt-3 space-y-2.5 text-[0.97rem] leading-relaxed text-heading">
              {post.summary.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Table of contents */}
          {post.tableOfContents.length > 1 && (
            <nav aria-label="İçindekiler" className="my-8 rounded-2xl border border-line bg-porcelain p-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-heading">İçindekiler</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {post.tableOfContents.map((item, idx) => (
                  <li key={item.id} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-xs font-bold text-indigo">
                      {idx + 1}
                    </span>
                    <Link href={`${path}#${item.id}`} className="font-medium text-heading hover:text-indigo transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Body */}
          <div className="mt-10 space-y-12 text-body text-[1.05rem] leading-[1.8]">
            <div className="space-y-4 text-lg font-medium text-heading leading-relaxed">
              {post.content.intro.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {post.content.sections.map((section, idx) => (
              <section
                key={idx}
                id={post.tableOfContents[idx]?.id}
                className="scroll-mt-28 space-y-6 pt-4 border-t border-line/60 first:border-t-0 first:pt-0"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">{section.heading}</h2>
                  {section.subheading && <p className="mt-1 font-semibold text-indigo">{section.subheading}</p>}
                </div>

                {section.body.length > 0 && (
                  <div className="space-y-4">
                    {section.body.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {section.list && section.list.length > 0 && (
                  <ul className="space-y-2.5 pl-1">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx} className="flex gap-3">
                        <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.dialogue && section.dialogue.length > 0 && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-line bg-porcelain p-5 sm:p-6 space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-line/80 pb-3">
                      <span aria-hidden className="text-base">🎙️</span>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-heading">Örnek diyalog</h3>
                    </div>
                    <div className="space-y-4">
                      {section.dialogue.map((exchange, dIdx) => (
                        <div key={dIdx} className="rounded-xl border border-line/70 bg-white p-4 shadow-2xs space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-indigo">{exchange.speaker}</span>
                            <span className="text-muted">{exchange.role}</span>
                          </div>
                          <p lang="en" className="text-sm font-semibold text-heading">
                            &quot;{exchange.en}&quot;
                          </p>
                          <p className="text-xs text-muted">{exchange.tr}</p>
                          {exchange.tip && (
                            <div className="mt-2 rounded-lg bg-indigo/5 p-2 text-xs text-indigo">
                              <strong>İpucu:</strong> {exchange.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <caption className="bg-porcelain px-5 py-3 text-left font-display text-sm font-bold text-heading border-b border-line">
                        {section.table.title}
                      </caption>
                      <thead className="bg-slate-50 text-heading font-semibold border-b border-line">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th key={hIdx} scope="col" className="px-4 py-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-porcelain/60 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 font-medium text-body">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.checklist && section.checklist.length > 0 && (
                  <div className="my-6 rounded-2xl border border-emerald/20 bg-emerald/5 p-6 space-y-3">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-900">Uygulama listesi</h3>
                    <ul className="space-y-2.5 text-sm text-heading">
                      {section.checklist.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5">
                          <span
                            aria-hidden
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white"
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.keyTakeaway && (
                  <div className="my-4 rounded-xl border-l-4 border-emerald bg-emerald/10 p-4 text-sm font-semibold text-emerald-900">
                    <strong>Önemli nokta:</strong> {section.keyTakeaway}
                  </div>
                )}

                {section.proTip && (
                  <div className="my-4 rounded-xl border-l-4 border-indigo bg-indigo/10 p-4 text-sm font-semibold text-indigo-950">
                    <strong>İpucu:</strong> {section.proTip}
                  </div>
                )}

                {section.exampleBox && (
                  <div className="my-6 overflow-hidden rounded-2xl border border-line bg-porcelain p-5 shadow-xs">
                    <h3 className="font-display text-sm font-bold text-heading">{section.exampleBox.title}</h3>
                    {section.exampleBox.wrong && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg">
                        <span className="font-bold shrink-0">Yanlış:</span>
                        <span lang="en" className="whitespace-pre-line">{section.exampleBox.wrong}</span>
                      </div>
                    )}
                    <div className="mt-2 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg">
                      <span className="font-bold shrink-0">{section.exampleBox.wrong ? "Doğru:" : "Örnek:"}</span>
                      <span lang="en" className="whitespace-pre-line">{section.exampleBox.correct}</span>
                    </div>
                    <p className="mt-2.5 text-xs text-muted leading-relaxed">
                      <strong>Açıklama:</strong> {section.exampleBox.explanation}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* FAQ */}
            {post.content.faq.length > 0 && (
              <section id="sss" className="scroll-mt-28 space-y-5 border-t border-line/60 pt-8">
                <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">Sık sorulan sorular</h2>
                <div className="space-y-6">
                  {post.content.faq.map((item, fIdx) => (
                    <div key={fIdx}>
                      <h3 className="font-display text-lg font-bold text-heading">{item.q}</h3>
                      <p className="mt-2">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Conclusion */}
            <div className="border-t border-line/80 pt-8 font-medium text-heading space-y-3">
              {post.content.conclusion.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Sources */}
          {post.sources && post.sources.length > 0 && (
            <aside aria-label="Kaynaklar" className="mt-10 rounded-2xl border border-line bg-porcelain p-5 text-sm">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-heading">Kaynaklar ve ileri okuma</h2>
              <ul className="mt-3 space-y-2">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-indigo underline underline-offset-4 hover:text-stage">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">Bu yazı Spekvia Editör Ekibi tarafından hazırlanmıştır. Sınav ve vize gibi konularda güncel kuralları resmî kaynaklardan doğrula.</p>
            </aside>
          )}

          {/* CTA */}
          <div className="my-14 rounded-[28px] border border-indigo/20 bg-linear-to-br from-indigo/5 via-cyan/5 to-white p-8 text-center sm:p-10 shadow-sm">
            <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo text-2xl text-white shadow-md">
              🎙️
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-heading">Bu konuyu sesli sahnede prova etmek ister misin?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              Spekvia&apos;da gerçek hayat sahnelerini Mivo ile sesli oyna; takıldığın cümle anında kendi dilinde açıklanarak düzeltilir.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/#download"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Ücretsiz başla</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-line/80 pt-12">
              <h2 className="font-display text-lg font-bold text-heading">İlginizi çekebilecek diğer rehberler</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl border border-line bg-porcelain p-4 transition-all hover:border-indigo/30 hover:bg-white"
                  >
                    <span className="text-[0.7rem] font-semibold text-indigo">{related.category}</span>
                    <h3 className="mt-1 font-display text-sm font-bold text-heading group-hover:text-indigo transition-colors line-clamp-3">
                      {related.title}
                    </h3>
                    <span className="mt-3 block text-xs font-semibold text-indigo">Oku →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
