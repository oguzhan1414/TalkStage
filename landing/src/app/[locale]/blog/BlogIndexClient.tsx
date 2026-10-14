"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import type { BlogPost } from "@/lib/blog-data";
import type { Locale } from "@/i18n/config";

interface Props {
  locale: Locale;
  initialPosts: BlogPost[];
}

interface LocaleStrings {
  allCategory: string;
  categories: string[];
  homeLabel: string;
  blogLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  featuredLabel: string;
  readGuide: string;
  readShort: string;
  emptyState: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
}

const UI_STRINGS: Record<Locale, LocaleStrings> = {
  tr: {
    allCategory: "Tümü",
    categories: ["Tümü", "Seviyeler & Gramer", "Kariyer & Mülakat", "Metodoloji & Taktikler", "Seyahat & Günlük Hayat"],
    homeLabel: "Ana Sayfa",
    blogLabel: "Blog & Rehberler",
    eyebrow: "İngilizce Konuşma & Seviye Rehberleri",
    title: "Gramerden Sahneye: Akıcı İngilizce Kütüphanesi",
    subtitle: "A1'den C2'ye seviye rehberleri, yazılımcı standup tüyoları, vize mülakatı hazırlığı ve Türk öğrencilere özel konuşma stratejileri.",
    searchPlaceholder: "Makale veya konu ara...",
    featuredLabel: "Öne Çıkan Rehber",
    readGuide: "Rehberi Oku →",
    readShort: "Oku →",
    emptyState: "Aramanıza uygun rehber bulunamadı.",
    ctaTitle: "Okumayı Bırak, Gerçek Sahnede Konuşmaya Başla",
    ctaSubtitle: "Tüm bu rehberlerdeki senaryoları Spekvia ile Mivo karşısında canlı sesli prova yapabilirsiniz.",
    ctaButton: "Ücretsiz Sahneye Çık →",
  },
  en: {
    allCategory: "All",
    categories: ["All", "Levels & Grammar", "Career & Interview", "Methodology & Tactics", "Travel & Daily Life"],
    homeLabel: "Home",
    blogLabel: "Blog & Guides",
    eyebrow: "English Speaking & Learning Guides",
    title: "From Theory to Practice: Spoken English Library",
    subtitle: "Practical guides for solo practice, job interviews, developer standups, and everyday speaking confidence.",
    searchPlaceholder: "Search articles or topics...",
    featuredLabel: "Featured Guide",
    readGuide: "Read Guide →",
    readShort: "Read →",
    emptyState: "No articles found matching your search.",
    ctaTitle: "Stop Just Reading, Start Speaking Out Loud",
    ctaSubtitle: "Rehearse every scenario from these guides in voice simulations with Mivo in Spekvia.",
    ctaButton: "Start Free Practice →",
  },
  es: {
    allCategory: "Todos",
    categories: ["Todos", "Niveles y gramática", "Carrera y entrevistas", "Metodología y tácticas", "Viajes y vida cotidiana"],
    homeLabel: "Inicio",
    blogLabel: "Blog y Guías",
    eyebrow: "Guías para Hablar y Aprender Inglés",
    title: "De la teoría a la práctica: biblioteca de fluidez en inglés",
    subtitle: "Estrategias para superar el bloqueo, dominar entrevistas de trabajo, corregir falsos amigos y hablar con seguridad.",
    searchPlaceholder: "Buscar artículos o temas...",
    featuredLabel: "Guía destacada",
    readGuide: "Leer guía →",
    readShort: "Leer →",
    emptyState: "No se encontraron artículos con esa búsqueda.",
    ctaTitle: "Deja de leer y empieza a hablar en la vida real",
    ctaSubtitle: "Practica cada uno de estos escenarios por voz con Mivo en Spekvia y recibe correcciones inmediatas.",
    ctaButton: "Comenzar gratis →",
  },
  pt: {
    allCategory: "Todos",
    categories: ["Todos", "Níveis e gramática", "Carreira e entrevistas", "Metodologia e táticas", "Viagens e dia a dia"],
    homeLabel: "Início",
    blogLabel: "Blog e Guias",
    eyebrow: "Guias de Conversação e Aprendizado",
    title: "Da teoria à prática: biblioteca de fluência em inglês",
    subtitle: "Estratégias para destravar a fala, entrevistas remotas internacionais, pronúncia correta e prática diária sem medo.",
    searchPlaceholder: "Buscar artigos ou temas...",
    featuredLabel: "Guia em destaque",
    readGuide: "Ler guia →",
    readShort: "Ler →",
    emptyState: "Nenhum artigo encontrado para essa busca.",
    ctaTitle: "Chega de só ler: comece a falar de verdade",
    ctaSubtitle: "Treine cada um desses cenários por voz com o Mivo no Spekvia com correções imediatas no seu idioma.",
    ctaButton: "Começar de graça →",
  },
  de: {
    allCategory: "Alle",
    categories: ["Alle", "Niveaus & Grammatik", "Karriere & Vorstellungsgespräch", "Methodik & Lerntipps", "Reisen & Alltag"],
    homeLabel: "Startseite",
    blogLabel: "Blog & Leitfäden",
    eyebrow: "Leitfäden für Englische Sprachpraxis",
    title: "Von der Theorie zur Praxis: Leitfäden für flüssiges Englisch",
    subtitle: "Strukturierte Leitfäden für internationale Meetings, fehlerfreie Aussprache, False Friends und souveräne Vorstellungsgespräche.",
    searchPlaceholder: "Artikel oder Themen suchen...",
    featuredLabel: "Empfohlener Leitfaden",
    readGuide: "Leitfaden lesen →",
    readShort: "Lesen →",
    emptyState: "Keine passenden Artikel gefunden.",
    ctaTitle: "Nicht nur lesen, sondern laut sprechen lernen",
    ctaSubtitle: "Übe all diese Alltagsszenarien per Spracheingabe mit Mivo in Spekvia und erhalte sofortiges Feedback.",
    ctaButton: "Kostenlos starten →",
  },
};

export default function BlogIndexClient({ locale, initialPosts }: Props) {
  const ui = UI_STRINGS[locale] || UI_STRINGS.tr;
  const [activeCategory, setActiveCategory] = useState<string>(ui.allCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      activeCategory === ui.allCategory || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white pb-20 sm:pb-28">
        <PageHero
          crumbs={[{ label: ui.homeLabel, href: "/" }, { label: ui.blogLabel }]}
          eyebrow={ui.eyebrow}
          title={ui.title}
          intro={ui.subtitle}
          art="headphones"
          tint="pink"
        />
        <div className="mx-auto mt-4 max-w-[88rem] px-4 sm:mt-5 sm:px-6">
          {/* Live Search & Categories Filter */}
          <div className="flex flex-col gap-5 rounded-[2rem] bg-paper p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:p-3 sm:pl-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {ui.categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-stage to-purple-pop text-white shadow-[0_10px_22px_-10px_rgba(79,70,229,0.8)]"
                        : "bg-white text-body hover:text-heading"
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
                placeholder={ui.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-transparent bg-white px-4 py-2.5 pl-9 text-xs text-heading placeholder:text-muted focus:border-stage focus:outline-none focus:ring-2 focus:ring-stage/20"
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
          {activeCategory === ui.allCategory && !searchQuery && featuredPost && (
            <div className="mt-4 sm:mt-5">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[2.25rem] bg-[#e6e0ff] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted sm:rounded-[3rem] sm:p-5 lg:flex-row lg:gap-8"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[1.75rem] bg-white sm:h-80 lg:h-auto lg:min-h-[22rem] lg:w-[52%] sm:rounded-[2.25rem]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-heading/90 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
                    {ui.featuredLabel}
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col justify-center px-2 pb-2 lg:mt-0 lg:pr-8">
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

                  <div className="mt-6 flex items-center justify-between border-t border-heading/10 pt-4">
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
                      {ui.readGuide}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] bg-paper p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-paper-deep hover:shadow-lifted"
                >
                  {/* Card Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
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

                    <div className="mt-5 flex items-center justify-between border-t border-heading/10 pt-3">
                      <span className="text-xs text-muted">{post.author.name}</span>
                      <span className="text-xs font-semibold text-indigo group-hover:translate-x-0.5 transition-transform">
                        {ui.readShort}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[2rem] bg-paper py-14 text-center">
              <p className="text-sm text-muted">{ui.emptyState}</p>
            </div>
          )}

          {/* Bottom call to action */}
          <div className="relative mt-4 overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#ffefc2] via-[#fff7e0] to-[#ffe6cf] sm:mt-5 sm:rounded-[3rem]">
            <div className="grid items-end lg:grid-cols-[1.4fr_0.6fr]">
              <div className="p-7 sm:p-12 lg:p-16">
                <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-heading sm:text-4xl">{ui.ctaTitle}</h3>
                <p className="mt-3 max-w-md text-[1.02rem] text-heading/70">{ui.ctaSubtitle}</p>
                <div className="mt-7">
                  <Link
                    href="/#download"
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-stage to-purple-pop px-8 py-4 text-sm font-bold text-white shadow-[0_22px_44px_-16px_rgba(79,70,229,0.75)] transition-transform hover:-translate-y-0.5"
                  >
                    <span>{ui.ctaButton}</span>
                  </Link>
                </div>
              </div>
              <div aria-hidden className="relative mx-auto h-[12rem] w-[9.6rem] sm:h-[16rem] sm:w-[12.8rem] lg:mr-10 lg:h-[19rem] lg:w-[15.2rem]">
                <Image src="/mivo/stops/mivo_stop_cards.webp" alt="" fill sizes="240px" className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
