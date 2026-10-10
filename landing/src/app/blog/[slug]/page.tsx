import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Makale Bulunamadı — Spekvia",
    };
  }

  return {
    title: `${post.title} — Spekvia Rehberi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <article className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-indigo transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </div>

          {/* Article Header */}
          <header className="mt-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="rounded-full bg-indigo/10 px-3 py-1 font-semibold text-indigo">
                {post.category}
              </span>
              <span>•</span>
              <span className="text-muted">{post.readTime}</span>
              <span>•</span>
              <span className="text-muted">{post.date}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-body sm:text-xl">
              {post.excerpt}
            </p>

            {/* Author Card */}
            <div className="mt-6 flex items-center gap-3 border-y border-line/80 py-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-line">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-heading">
                  {post.author.name}
                </p>
                <p className="text-xs text-muted">{post.author.role}</p>
              </div>
            </div>
          </header>

          {/* Cover Image Showcase */}
          <div className="my-10 relative overflow-hidden rounded-[28px] border border-line bg-porcelain p-2 shadow-[var(--shadow-lifted)] sm:p-4">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-[22px] object-cover"
            />
          </div>

          {/* Table of Contents */}
          {post.content.tableOfContents.length > 0 && (
            <div className="my-8 rounded-2xl border border-indigo/15 bg-porcelain p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-indigo">
                📑 İçindekiler
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-body">
                {post.content.tableOfContents.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo/10 text-xs font-bold text-indigo">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-heading">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div className="mt-10 space-y-12 text-body text-[1.05rem] leading-[1.8]">
            {/* Intro Paragraphs */}
            <div className="space-y-4 text-lg font-medium text-heading leading-relaxed">
              {post.content.intro.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Sections */}
            {post.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-6 pt-4 border-t border-line/60 first:border-t-0 first:pt-0">
                <div>
                  <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <p className="mt-1 font-semibold text-indigo">{section.subheading}</p>
                  )}
                </div>

                {/* Section Body */}
                <div className="space-y-4">
                  {section.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Rich Dialogue Transcript */}
                {section.dialogue && section.dialogue.length > 0 && (
                  <div className="my-8 overflow-hidden rounded-2xl border border-line bg-porcelain p-5 sm:p-6 space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-line/80 pb-3">
                      <span className="text-base">🎙️</span>
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-heading">
                        Canlı Sahne Diyalog Replikleri
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {section.dialogue.map((exchange, dIdx) => (
                        <div
                          key={dIdx}
                          className="rounded-xl border border-line/70 bg-white p-4 shadow-2xs space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-indigo">{exchange.speaker}</span>
                            <span className="text-muted">{exchange.role}</span>
                          </div>
                          <p className="text-sm font-semibold text-heading">
                            &quot;{exchange.en}&quot;
                          </p>
                          <p className="text-xs text-muted">
                            🇹🇷 {exchange.tr}
                          </p>
                          {exchange.tip && (
                            <div className="mt-2 rounded-lg bg-indigo/5 p-2 text-xs text-indigo">
                              💡 <strong>İpucu:</strong> {exchange.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Comparison Table */}
                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-xs">
                    <div className="bg-porcelain px-5 py-3 border-b border-line">
                      <h4 className="font-display text-sm font-bold text-heading">
                        {section.table.title}
                      </h4>
                    </div>
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 text-heading font-semibold border-b border-line">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th key={hIdx} className="px-4 py-3">
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

                {/* Actionable Checklist */}
                {section.checklist && section.checklist.length > 0 && (
                  <div className="my-6 rounded-2xl border border-emerald/20 bg-emerald/5 p-6 space-y-3">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-900">
                      ✅ Uygulama Kontrol Listesi
                    </h4>
                    <ul className="space-y-2.5 text-sm text-heading">
                      {section.checklist.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Takeaway */}
                {section.keyTakeaway && (
                  <div className="my-4 rounded-xl border-l-4 border-emerald bg-emerald/10 p-4 text-sm font-semibold text-emerald-900">
                    💡 <strong>Önemli Nokta:</strong> {section.keyTakeaway}
                  </div>
                )}

                {/* Pro Tip */}
                {section.proTip && (
                  <div className="my-4 rounded-xl border-l-4 border-indigo bg-indigo/10 p-4 text-sm font-semibold text-indigo-950">
                    🔥 <strong>Uzman Tavsiyesi:</strong> {section.proTip}
                  </div>
                )}

                {/* Example Error Box */}
                {section.exampleBox && (
                  <div className="my-6 overflow-hidden rounded-2xl border border-line bg-porcelain p-5 shadow-xs">
                    <h4 className="font-display text-sm font-bold text-heading">
                      {section.exampleBox.title}
                    </h4>
                    {section.exampleBox.wrong && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg">
                        <span className="font-bold shrink-0">❌ Yanlış:</span>
                        <span>{section.exampleBox.wrong}</span>
                      </div>
                    )}
                    <div className="mt-2 flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg">
                      <span className="font-bold shrink-0">✅ Doğru:</span>
                      <span>{section.exampleBox.correct}</span>
                    </div>
                    <p className="mt-2.5 text-xs text-muted leading-relaxed">
                      <strong>Açıklama:</strong> {section.exampleBox.explanation}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <div className="border-t border-line/80 pt-8 font-medium text-heading space-y-3">
              {post.content.conclusion.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Interactive In-Article Spekvia CTA Box */}
          <div className="my-14 rounded-[28px] border border-indigo/20 bg-linear-to-br from-indigo/5 via-cyan/5 to-white p-8 text-center sm:p-10 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo text-2xl text-white shadow-md">
              🎙️
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-heading">
              Bu Konuyu Canlı Sahnede Prova Etmek İster misin?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              Spekvia ile 1.2 saniye gecikmeli yapay zekâ simülasyonunda hemen konuşmaya başlayın.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/#indir"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Hemen Ücretsiz Başla</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-line/80 pt-12">
              <h3 className="font-display text-lg font-bold text-heading">
                İlginizi Çekebilecek Diğer Rehberler
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-2xl border border-line bg-porcelain p-4 transition-all hover:border-indigo/30 hover:bg-white"
                  >
                    <span className="text-[0.7rem] font-semibold text-indigo">
                      {related.category}
                    </span>
                    <h4 className="mt-1 font-display text-sm font-bold text-heading group-hover:text-indigo transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <span className="mt-3 block text-xs font-semibold text-indigo">
                      Oku →
                    </span>
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
