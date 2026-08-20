"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

const featuredFaqs = [
  {
    id: "hf1",
    question: "TalkStage geleneksel dil uygulamalarından nasıl ayrılır?",
    answer:
      "Gramer bulmacaları veya kelime eşleştirme oyunları yerine, sizi doğrudan gerçek sahnelerin (Tech Standup, FAANG Mülakatı, Konsolosluk Vizesi) içine sokar. Yapay zekâ ile sesli konuşursunuz, takıldığınız anda konuşmayı kesmeden Türkçe anlık teşhis kartıyla doğrusunu öğrenirsiniz.",
  },
  {
    id: "hf2",
    question: "Yapay zekâ konuşurken yaptığım hataları nasıl düzeltiyor?",
    answer:
      "Örneğin 'I am agree' dediğinizde, sistem konuşma akışını bölmeden ekranınıza 'Doğrusu: I agree with you (Türkçede 'katılıyorum' fiil olduğu için İngilizcede am kullanılmaz)' şeklinde anlık bir Türkçe ipucu düşürür. Oturum sonunda ise hece ve telaffuz analizlerinizi içeren 360° karne raporu sunar.",
  },
  {
    id: "hf3",
    question: "Ücretsiz olarak kullanabilir miyim? Kredi kartı gerekiyor mu?",
    answer:
      "Evet! Free Stage planı kapsamında günde 1 sesli senaryo pratiği, sınırsız kelime kartı (Spaced Repetition) ve tematik okuma kütüphanesi tamamen ücretsizdir. Kredi kartı bilgisi girmeniz gerekmez.",
  },
];

export default function HomeFaq() {
  const [openId, setOpenId] = useState<string | null>("hf1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="sss" className="relative scroll-mt-24 bg-porcelain px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <Reveal className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Aklınıza Takılan Temel Sorular
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-body">
            En çok merak edilen noktaları özetledik. Tüm detaylı sorular ve teknik yanıtlar için SSS merkezimizi ziyaret edebilirsiniz.
          </p>
        </Reveal>

        {/* 3 Featured Accordions */}
        <div className="mt-12 space-y-4">
          {featuredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal key={faq.id}>
                <div
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
                      {faq.question}
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
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA to Full 30+ FAQ Page */}
        <Reveal delay={200} className="mt-12 text-center">
          <Link
            href="/sss"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-8 py-3.5 text-sm font-semibold text-heading shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo hover:text-indigo hover:shadow-md"
          >
            <span>Tüm 30+ Soruyu ve Detaylı Yanıtları İncele</span>
            <span className="text-indigo">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
