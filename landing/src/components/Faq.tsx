"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import Reveal from "./Reveal";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "@/data/faqData";

export default function Faq() {
  const t = useT();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("g1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "Tümü" || item.category === activeCategory;
    const matchesSearch =
      t(item.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(item.answer).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id={anchorId("faq", locale)} className="relative scroll-mt-24 bg-porcelain px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <Reveal className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">{t("Sıkça sorulan sorular")}</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">{t("Başlamadan önce akla gelenler")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">{t("Sahneler, Mivo, düzeltmeler, kelime çalışması ve abonelik hakkında en çok sorulanlar.")}</p>
        </Reveal>

        {/* Live Search & Filter Bar */}
        <div className="mt-12 space-y-6">
          {/* Search Box */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder={t("Soru veya konu ara (örn: sahne, telaffuz, iptal)")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-line bg-white px-5 py-4 pl-12 text-sm text-heading shadow-xs placeholder:text-muted focus:border-indigo focus:outline-none focus:ring-3 focus:ring-indigo/15"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-porcelain px-2.5 py-0.5 text-xs text-muted hover:text-heading"
              >{t("Temizle")}</button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-heading text-white shadow-sm"
                      : "border border-line bg-white text-body hover:border-indigo/40 hover:text-heading"
                  }`}
                >
                  {t(cat)}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-line bg-white p-12 text-center shadow-xs">
              <p className="text-base font-semibold text-heading">{t("Aramanızla eşleşen soru bulunamadı.")}</p>
              <p className="mt-1 text-sm text-muted">{t("Farklı bir arama yapabilir veya doğrudan destek ekibimize yazabilirsiniz.")}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Tümü");
                }}
                className="mt-4 rounded-full bg-indigo px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo/90"
              >{t("Tüm Soruları Göster")}</button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-indigo/30 bg-white shadow-sm ring-1 ring-indigo/10"
                      : "border-line bg-white/90 hover:border-line hover:bg-white shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-display text-[1rem] font-bold text-heading sm:text-[1.05rem]">
                      {t(faq.question)}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold transition-transform duration-200 ${
                        isOpen
                          ? "bg-indigo text-white rotate-45"
                          : "bg-porcelain text-muted"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-line/60 px-6 pt-3 pb-5">
                      <p className="text-[0.94rem] leading-relaxed text-body">
                        {t(faq.answer)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-16 rounded-[28px] border border-line bg-white p-8 text-center shadow-[var(--shadow-layered)] sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo/10 text-xl font-bold text-indigo">
            💬
          </span>
          <h3 className="mt-4 font-display text-2xl font-bold text-heading">{t("Cevabını bulamadığınız başka bir soru mu var?")}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-body">{t("Bize yaz, mesajına e-postayla dönelim.")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-stage px-7 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <span>{t("Bize Mesaj Gönder")}</span>
              <span>→</span>
            </Link>
            <a
              href="mailto:destek@spekvia.com"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-porcelain px-6 py-3 text-sm font-semibold text-heading hover:bg-slate-100"
            >destek@spekvia.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
