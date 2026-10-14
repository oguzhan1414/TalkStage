"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/i18n/Link";
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
    <section id={anchorId("faq", locale)} className="relative scroll-mt-24 px-4 pt-10 sm:px-6 sm:pt-14">
      <div className="mx-auto max-w-4xl">
        {/* Live Search & Filter Bar */}
        <div className="space-y-6">
          {/* Search Box */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder={t("Soru veya konu ara (örn: sahne, telaffuz, iptal)")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-line bg-paper px-5 py-4 pl-12 text-sm text-heading placeholder:text-muted focus:border-stage focus:bg-white focus:outline-none focus:ring-3 focus:ring-stage/15"
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
                  className={`rounded-full px-4 py-2.5 text-[0.8rem] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-linear-to-r from-stage to-purple-pop text-white shadow-[0_10px_22px_-10px_rgba(79,70,229,0.8)]"
                      : "bg-paper text-body hover:bg-paper-deep hover:text-heading"
                  }`}
                >
                  {t(cat)}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-[2rem] bg-paper p-12 text-center">
              <p className="text-base font-semibold text-heading">{t("Aramanla eşleşen soru bulunamadı.")}</p>
              <p className="mt-1 text-sm text-muted">{t("Başka bir arama dene ya da doğrudan bize yaz.")}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Tümü");
                }}
                className="mt-4 rounded-full bg-linear-to-r from-stage to-purple-pop px-5 py-2.5 text-xs font-semibold text-white"
              >{t("Tüm soruları göster")}</button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-[1.75rem] transition-all duration-300 ${
                    isOpen ? "bg-[#e6e0ff] shadow-layered" : "bg-paper hover:bg-paper-deep"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer sm:px-7 sm:py-6"
                  >
                    <span className="font-display text-[1.02rem] font-bold text-heading sm:text-[1.12rem]">
                      {t(faq.question)}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold transition-transform duration-200 ${
                        isOpen
                          ? "bg-stage text-white rotate-45"
                          : "bg-white text-stage"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7">
                      <p className="max-w-3xl text-[0.97rem] leading-relaxed text-heading/75">
                        {t(faq.answer)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions */}
        <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-linear-to-br from-[#ffefc2] via-[#fff7e0] to-[#ffe6cf] sm:rounded-[2.5rem]">
          <div className="grid items-end sm:grid-cols-[1fr_auto]">
            <div className="p-7 sm:p-10">
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.025em] text-heading sm:text-3xl">{t("Cevabını bulamadığın bir soru mu var?")}</h3>
              <p className="mt-2 max-w-md text-[0.97rem] text-heading/70">{t("Bize yaz, mesajına e-postayla dönelim.")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-stage to-purple-pop px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-transform hover:-translate-y-0.5"
                >
                  <span>{t("Bize yaz")}</span>
                  <span>→</span>
                </Link>
                <a
                  href="mailto:support@spekvia.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-heading shadow-layered hover:bg-paper"
                >support@spekvia.com</a>
              </div>
            </div>
            <div aria-hidden className="relative mx-auto hidden h-[15rem] w-[12rem] sm:mr-8 sm:block">
              <Image src="/mivo/stops/mivo_stop_mic.webp" alt="" fill sizes="200px" className="object-contain object-bottom drop-shadow-[0_20px_24px_rgba(21,18,58,0.25)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
