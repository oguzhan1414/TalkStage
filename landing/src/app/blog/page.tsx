"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, BlogPost } from "@/lib/blog-data";

type BlogCategory = "Tümü" | "Seviyeler & Gramer" | "Kariyer & Mülakat" | "Metodoloji & Taktikler";

const categories: BlogCategory[] = [
  "Tümü",
  "Seviyeler & Gramer",
  "Kariyer & Mülakat",
  "Metodoloji & Taktikler",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "Tümü" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Blog & Rehberler</span>
          </div>

          {/* Page Header */}
          <div className="max-w-2xl">
            <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
              İngilizce Konuşma & Seviye Rehberleri
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              Gramerden Sahneye: Akıcı İngilizce Kütüphanesi
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-body">
              A1&apos;den C2&apos;ye seviye rehberleri, yazılımcı standup tüyoları, vize mülakatı hazırlığı ve Türk öğrencilere özel konuşma stratejileri.
            </p>
          </div>

          {/* Live Search & Categories Filter */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-y border-line/80 py-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-heading text-white shadow-xs"
                        : "border border-line bg-porcelain text-body hover:border-indigo/40 hover:text-heading"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Makale veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-porcelain px-4 py-2 pl-9 text-xs text-heading placeholder:text-muted focus:border-indigo focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo/15"
              />
              <svg
                className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          {/* Featured Hero Article (Only on All & No Search) */}
          {activeCategory === "Tümü" && !searchQuery && featuredPost && (
            <div className="mt-10">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-porcelain p-4 shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)] lg:flex-row lg:items-center lg:gap-10 lg:p-6"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-2xl bg-white sm:h-80 lg:w-[48%]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-heading/90 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
                    Öne Çıkan Rehber
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col justify-center lg:mt-0">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="font-semibold text-indigo">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-heading transition-colors group-hover:text-indigo sm:text-3xl">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-body line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-line">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-heading">
                        {featuredPost.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-indigo group-hover:translate-x-1 transition-transform">
                      Rehberi Oku →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Articles Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-line bg-white p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo/30 hover:shadow-[var(--shadow-layered)]"
              >
                {/* Card Cover Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-porcelain">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold text-indigo shadow-xs backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4 flex flex-1 flex-col justify-between p-1">
                  <div>
                    <div className="flex items-center gap-2 text-[0.75rem] text-muted">
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-heading transition-colors group-hover:text-indigo">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-body line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
                    <span className="text-xs text-muted">{post.author.name}</span>
                    <span className="text-xs font-semibold text-indigo group-hover:translate-x-0.5 transition-transform">
                      Oku →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Newsletter / Action */}
          <div className="mt-20 rounded-[28px] border border-line bg-porcelain p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Okumayı Bırak, Gerçek Sahnede Konuşmaya Başla
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-body">
              Tüm bu seviye rehberlerindeki senaryoları Spekvia ile canlı sesli prova yapabilirsiniz.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/#indir"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo to-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Ücretsiz Sahneye Çık</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
