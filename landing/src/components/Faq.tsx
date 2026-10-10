"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

type FaqCategory =
  | "Tümü"
  | "Genel"
  | "Konuşma & Düzeltme"
  | "Sahneler & Seviyeler"
  | "Kelime & Çalışma"
  | "Abonelik"
  | "Gizlilik & Cihazlar";

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "g1",
    category: "Genel",
    question: "Spekiva nedir?",
    answer:
      "Gerçek hayat sahnelerini sesli prova ettiğin bir İngilizce uygulaması. Mivo karşındaki karakteri oynar, sen konuşursun; takıldığın cümleyi anında düzeltir ve nedenini kendi dilinde açıklar. Yanında kelime, okuma ve podcast çalışmaları da var.",
  },
  {
    id: "g2",
    category: "Genel",
    question: "Mivo kim?",
    answer:
      "Mivo, Spekiva’nın yapay zekâ koçu ve maskotu. Sahnelerde karakteri oynar, serbest sohbette seninle istediğin konuda konuşur ve önceki sohbetlerden birkaç kısa not hatırlar.",
  },
  {
    id: "g3",
    category: "Genel",
    question: "Günde ne kadar çalışmalıyım?",
    answer:
      "Bir sahne 5–10 dakika sürer. İlk kurulumda günlük hedefini seçersin; Bugün sekmesi o gün için sıradaki işi gösterir, ne çalışacağını düşünmen gerekmez.",
  },
  {
    id: "k1",
    category: "Konuşma & Düzeltme",
    question: "Yanlış cümle kurarsam ne olur?",
    answer:
      "Mivo konuşmanı bölmeden doğru hâlini gösterir ve nedenini kendi dilinde kısaca açıklar. Düzeltilen cümleler Hata Defterim’e düşer; istediğinde dönüp çalışırsın.",
  },
  {
    id: "k2",
    category: "Konuşma & Düzeltme",
    question: "Telaffuzumu değerlendiriyor mu?",
    answer:
      "Konuşmanı yazıya çeviren sistemin kelime bazlı güven puanını gösteririz; düşük puanlı kelimeler telaffuz için bir ipucudur. Bu tam bir aksan analizi değildir. Zorlandığın kelimeleri Telaffuz çalışmasında tek tek tekrar edebilirsin.",
  },
  {
    id: "k3",
    category: "Konuşma & Düzeltme",
    question: "Konuşurken yazılı transkripti görebilir miyim?",
    answer:
      "Evet. Söylediğin cümle önce ekranda görünür; göndermeden önce kontrol edip düzeltebilir ya da yeniden kaydedebilirsin. Karşı tarafın cümlelerini de yazılı olarak ve tekrar dinleyerek takip edersin.",
  },
  {
    id: "s1",
    category: "Sahneler & Seviyeler",
    question: "Hangi sahneler var?",
    answer:
      "A1’den B2’ye 21 sahne: havalimanı, otel, restoran, taksi, doktor, iş mülakatı, bitpazarı, ev bakma, ofis molası ve daha fazlası. Her sahne önce kısa bir videoyla başlar, sonra Mivo karakteri canlı oynar.",
  },
  {
    id: "s2",
    category: "Sahneler & Seviyeler",
    question: "Aynı sahneyi tekrar oynarsam ne değişir?",
    answer:
      "Her oynayışta karşına farklı bir durum çıkar: bir karışıklık, bitmiş bir ürün, aceleci biri, meraklı biri ya da kibar bir şikâyet. Sahne hedefleri aynı kalır ama konuşma farklı gider. Her sahnede 1–3 yıldız toplarsın: videoyu bitirmek, canlı oynamak ve hedefleri en fazla iki düzeltmeyle tamamlamak.",
  },
  {
    id: "s3",
    category: "Sahneler & Seviyeler",
    question: "Seviyemi nasıl belirlerim? Sahneler kilitli mi?",
    answer:
      "Kısa bir seviye belirleme seni A1–C2 arasında yerleştirir. Seviyen ve altındaki sahneler açıktır, bir üst seviye “zor” etiketiyle denenebilir; daha ilerisi önceki seviyeyi bitirince açılır.",
  },
  {
    id: "s4",
    category: "Sahneler & Seviyeler",
    question: "Seviyem çok düşükse kullanabilir miyim?",
    answer:
      "Evet. A1 ve A2 sahnelerinde Mivo seni kendi dilinde yönlendirir, ne söyleyeceğini gösterir ve ilk cümleleri kurmana yardım eder.",
  },
  {
    id: "s5",
    category: "Sahneler & Seviyeler",
    question: "Kendi sahnemi ekleyebilir miyim?",
    answer:
      "Şimdilik hazır sahneler ve Mivo ile serbest sohbet var; istediğin konuyu serbest sohbette açabilirsin. Kendi sahneni kurma özelliği henüz yok.",
  },
  {
    id: "w1",
    category: "Kelime & Çalışma",
    question: "Kelime tekrarı nasıl çalışıyor?",
    answer:
      "900 çekirdek kelime var. Her kartı ne kadar iyi bildiğine göre bir sonraki tekrar günü hesaplanır (SM-2); kelimeler tam unutmak üzereyken karşına çıkar. Konuşmada ya da okumada gördüğün kelimeleri kendi destene de ekleyebilirsin.",
  },
  {
    id: "w2",
    category: "Kelime & Çalışma",
    question: "Okuma modülünde ne yapıyorum?",
    answer:
      "Kısa, resimli hikâyeleri sahne sahne okursun. Her sahnede dinle, boşluğu doldur, kelimeyi harf harf yaz ya da cümleyi sıraya diz gibi alıştırmalar vardır; hikâyenin sonunda cümleni sesli söylersin. Yeni hikâyeler şu an A1–A2 seviyesinde, üst seviyeler hazırlanıyor.",
  },
  {
    id: "w3",
    category: "Kelime & Çalışma",
    question: "Podcastler nasıl?",
    answer:
      "A1–B2 arasında 40 bölüm. İki dilli transkripti takip edebilir, bir cümleye dokunup sesi oraya atlatabilirsin. Bölümü sonuna kadar dinleyince küçük bir test açılır.",
  },
  {
    id: "a1",
    category: "Abonelik",
    question: "Ücretsiz mi?",
    answer:
      "Ücretsiz başlayabilirsin: günde 1 sesli sahne (5 dakikaya kadar), kelime kartları, okuma hikâyeleri ve anlık düzeltme. Sınırsız sesli pratik için Pro var.",
  },
  {
    id: "a2",
    category: "Abonelik",
    question: "Pro neleri kapsar, fiyatı ne?",
    answer:
      "Sınırsız sesli sahne ve Mivo ile serbest sohbet, 30 dakikaya kadar uzun oturumlar. Fiyat uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir.",
  },
  {
    id: "a3",
    category: "Abonelik",
    question: "Aboneliğimi nasıl iptal ederim?",
    answer:
      "Abonelik mağaza hesabından (App Store ya da Google Play) yönetilir; istediğin zaman oradan iptal edebilirsin.",
  },
  {
    id: "c1",
    category: "Gizlilik & Cihazlar",
    question: "Sesim ve konuşmalarım ne oluyor?",
    answer:
      "Konuştuğun cümleler metne çevrilip Mivo’ya iletilir; ilk sesli odada gizlilik onayı istenir. Mivo’nun sohbetlerden sakladığı kısa notları uygulamadan görebilir, düzeltebilir veya silebilirsin. Ayrıntılar Gizlilik Politikası’nda.",
  },
  {
    id: "c2",
    category: "Gizlilik & Cihazlar",
    question: "Hesabımı ve verilerimi silebilir miyim?",
    answer: "Evet. Hesap ayarlarından hesabını sildiğinde hesabın ve ona bağlı veriler sunucudan kaldırılır.",
  },
  {
    id: "c3",
    category: "Gizlilik & Cihazlar",
    question: "Hangi dillerde kullanabilirim?",
    answer:
      "Arayüz ve açıklamalar Türkçe, İngilizce, İspanyolca, Brezilya Portekizcesi ve Almanca olarak kullanılabilir. Çalıştığın dil her zaman İngilizce. Çevirilerin bir kısmı yapay zekâyla üretildi; hatalı bir şey görürsen bize yaz.",
  },
  {
    id: "c4",
    category: "Gizlilik & Cihazlar",
    question: "İnternet bağlantım zayıfsa ne olur?",
    answer:
      "Sesli sahneler ve Mivo sohbeti internet gerektirir; zayıf bağlantıda yanıtlar gecikebilir. Kararlı bir Wi-Fi ya da 4G/5G önerilir.",
  },
];

const categories: FaqCategory[] = [
  "Tümü",
  "Genel",
  "Konuşma & Düzeltme",
  "Sahneler & Seviyeler",
  "Kelime & Çalışma",
  "Abonelik",
  "Gizlilik & Cihazlar",
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("g1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "Tümü" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="sss" className="relative scroll-mt-24 bg-porcelain px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <Reveal className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            Sıkça sorulan sorular
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Başlamadan önce akla gelenler
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Sahneler, Mivo, düzeltmeler, kelime çalışması ve abonelik hakkında en çok sorulanlar.
          </p>
        </Reveal>

        {/* Live Search & Filter Bar */}
        <div className="mt-12 space-y-6">
          {/* Search Box */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Soru veya konu ara (örn: sahne, telaffuz, iptal)"
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
              >
                Temizle
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
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
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-line bg-white p-12 text-center shadow-xs">
              <p className="text-base font-semibold text-heading">
                Aramanızla eşleşen soru bulunamadı.
              </p>
              <p className="mt-1 text-sm text-muted">
                Farklı bir arama yapabilir veya doğrudan destek ekibimize yazabilirsiniz.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Tümü");
                }}
                className="mt-4 rounded-full bg-indigo px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo/90"
              >
                Tüm Soruları Göster
              </button>
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
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-16 rounded-[28px] border border-line bg-white p-8 text-center shadow-[var(--shadow-layered)] sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo/10 text-xl font-bold text-indigo">
            💬
          </span>
          <h3 className="mt-4 font-display text-2xl font-bold text-heading">
            Cevabını bulamadığınız başka bir soru mu var?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-body">
            Bize yaz, mesajına e-postayla dönelim.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-stage px-7 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <span>Bize Mesaj Gönder</span>
              <span>→</span>
            </Link>
            <a
              href="mailto:destek@spekiva.app"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-porcelain px-6 py-3 text-sm font-semibold text-heading hover:bg-slate-100"
            >
              destek@spekiva.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
