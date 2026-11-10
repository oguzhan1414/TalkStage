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

const CARD_COLORS = ["bg-sun", "bg-mint", "bg-sky", "bg-lilac", "bg-bubble"];

export default function BlogIndexClient({ locale, initialPosts }: Props) {
  const ui = UI_STRINGS[locale] || UI_STRINGS.tr;
  const [activeCategory, setActiveCategory] = useState<string>(ui.allCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      activeCategory === ui.allCategory || post.category === activeCategory;
    const matchesSearch =
      post.title.toLocaleLowerCase(locale).includes(searchQuery.trim().toLocaleLowerCase(locale)) ||
      post.excerpt.toLocaleLowerCase(locale).includes(searchQuery.trim().toLocaleLowerCase(locale));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip bg-cream pb-20 text-ink sm:pb-28">
        <PageHero
          crumbs={[{ label: ui.homeLabel, href: "/" }, { label: ui.blogLabel }]}
          eyebrow={ui.eyebrow}
          title={ui.title}
          intro={ui.subtitle}
          art="headphones"
          tint="pink"
          variant="poster"
        />
        <div className="mx-auto max-w-[80rem] px-5 pt-14 sm:px-10 sm:pt-20">
          {/* Live Search & Categories Filter */}
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
            {/* Category Pills */}
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              {ui.categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`btn-pop btn-pop-wrap cursor-pointer px-4 py-2.5 text-[0.8rem] ${
                      isActive
                        ? "bg-ink text-cream"
                        : "bg-cream text-ink hover:bg-sun"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full shrink-0 lg:w-72">
              <input
                type="search"
                aria-label={ui.searchPlaceholder}
                placeholder={ui.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="stk-sm w-full rounded-2xl bg-white py-3.5 pl-10 pr-4 text-sm font-medium text-ink placeholder:text-ink/50"
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
            <div className="mt-12">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="stk group relative flex flex-col overflow-hidden rounded-[2rem] bg-mint p-4 transition-transform duration-200 hover:-translate-y-1 sm:p-5 lg:flex-row lg:gap-8"
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[1.75rem] bg-white sm:h-80 lg:h-auto lg:min-h-[22rem] lg:w-[52%] sm:rounded-[2.25rem]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 max-w-[85%] rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold text-ink">
                    {ui.featuredLabel}
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col justify-center px-2 pb-2 lg:mt-0 lg:pr-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink/65">
                    <span className="font-semibold text-indigo">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="poster mt-4 text-3xl text-ink sm:text-4xl">
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
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
              {filteredPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`stk group flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-3.5 transition-transform duration-200 hover:-translate-y-1 ${CARD_COLORS[i % CARD_COLORS.length]}`}
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
                    <span className="absolute left-3 top-3 max-w-[85%] rounded-xl border-2 border-ink bg-cream px-2.5 py-1 text-[0.7rem] font-bold text-ink">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex flex-1 flex-col justify-between p-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[0.75rem] font-semibold text-ink/65">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="mt-3 text-xl font-extrabold leading-snug text-ink transition-colors group-hover:text-violet">
                        {post.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/75">
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
            <div role="status" className="stk mt-10 rounded-[2rem] bg-lilac px-6 py-14 text-center">
              <p className="text-sm text-muted">{ui.emptyState}</p>
            </div>
          )}

          {/* Bottom call to action */}
          <div className="stk relative mt-16 overflow-hidden rounded-[2rem] bg-violet text-cream sm:mt-20">
            <div className="grid items-end lg:grid-cols-[1.4fr_0.6fr]">
              <div className="p-7 sm:p-12 lg:p-16">
                <h3 className="poster text-4xl text-sun sm:text-5xl">{ui.ctaTitle}</h3>
                <p className="mt-4 max-w-md text-[1.02rem] font-medium leading-relaxed text-cream/85">{ui.ctaSubtitle}</p>
                <div className="mt-7">
                  <Link
                    href="/#download"
                    className="btn-pop btn-pop-wrap bg-sun px-7 py-4 text-sm text-ink"
                  >
                    <span>{ui.ctaButton}</span>
                  </Link>
                </div>
              </div>
              <div aria-hidden className="relative mx-auto h-[12rem] w-[9.6rem] sm:h-[16rem] sm:w-[12.8rem] lg:mr-10 lg:h-[19rem] lg:w-[15.2rem]">
                <Image src="/assets/mivo/guide.webp" alt="" fill sizes="240px" className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
