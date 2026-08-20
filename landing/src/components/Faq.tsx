"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";

type FaqCategory =
  | "Tümü"
  | "Genel & Metodoloji"
  | "Voice AI & Geri Bildirim"
  | "Sahneler & Seviyeler"
  | "Kelime & Spaced Repetition"
  | "Abonelik & Ödemeler"
  | "Gizlilik & Cihazlar";

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  // 1. Genel & Metodoloji (6 soru)
  {
    id: "g1",
    category: "Genel & Metodoloji",
    question: "TalkStage tam olarak nedir ve geleneksel uygulamalardan nasıl ayrılır?",
    answer:
      "TalkStage; kelime eşleştirme bulmacaları veya gramer testleri yerine, sizi doğrudan gerçek hayat sahnelerine (Tech Standup, FAANG mülakatı, Konsolosluk vizesi vb.) çıkaran, ultra düşük gecikmeli bir yapay zekâ sesli simülasyonudur. Konuştuğunuz anda sizi dinler, sesli yanıt verir ve takıldığınız hataları Türkçe açıklamalarla anında teşhis eder.",
  },
  {
    id: "g2",
    category: "Genel & Metodoloji",
    question: "Sessiz Kilitlenme (The Silent Freeze) problemi nedir ve TalkStage bunu nasıl çözer?",
    answer:
      "Gramer kurallarını ve kelimeleri bilmenize rağmen bir yabancı karşınıza çıktığında beyninizin Türkçe cümleyi İngilizceye çevirmeye çalışırken donup kalmasına 'Sessiz Kilitlenme' denir. TalkStage, safe-space (yargılanma korkusu olmayan) bir simülatörde her gün 5-10 dakika konuşma pratiği yaptırarak nörolojik konuşma refleksinizi otomatikleştirir.",
  },
  {
    id: "g3",
    category: "Genel & Metodoloji",
    question: "Günde ne kadar süre pratik yapmam önerilir?",
    answer:
      "Pedagojik araştırmalar, haftada 1 kez 2 saat çalışmak yerine her gün 10-15 dakika aktif konuşmanın akıcılık refleksini 4 kat daha hızlı inşa ettiğini gösteriyor. TalkStage'de günde 1 veya 2 sahne tamamlamanız hızlı ilerleme için fazlasıyla yeterlidir.",
  },
  {
    id: "g4",
    category: "Genel & Metodoloji",
    question: "İngilizce seviyem çok düşük (A1/A2), TalkStage'i kullanabilir miyim?",
    answer:
      "Kesinlikle evet. TalkStage'de başlangıç seviyesindeki kullanıcılar için yavaş konuşan, basit kelimeler seçen ve sıkıştığınızda Türkçe ipucu veren rehberli senaryolar (Kahve Siparişi, Yol Tarifi vb.) mevcuttur.",
  },
  {
    id: "g5",
    category: "Genel & Metodoloji",
    question: "Yurtdışında yaşamadan akıcı İngilizce konuşmak gerçekten mümkün mü?",
    answer:
      "Evet. Akıcılık coğrafi konumla değil, günlük sesli maruz kalma ve pratik yoğunluğuyla ilgilidir. TalkStage simülatörü sayesinde Londra'da bir iş mülakatındaymış ya da New York'ta bir standup toplantısındaymış gibi hissederek pratik yapabilirsiniz.",
  },
  {
    id: "g6",
    category: "Genel & Metodoloji",
    question: "Uygulamadaki hatalarımı bir insan mı dinliyor?",
    answer:
      "Hayır. Tüm analizler yapay zekâ fonetik ve gramer motorumuz tarafından anlık ve otomatik olarak yapılır. Hata yaparken kimsenin sizi yargılamayacağı, %100 güvenli ve rahat bir öğrenme alanına sahip olursunuz.",
  },

  // 2. Voice AI & Geri Bildirim (5 soru)
  {
    id: "v1",
    category: "Voice AI & Geri Bildirim",
    question: "Yapay zekânın sesli yanıt süresi (gecikme) ne kadar?",
    answer:
      "TalkStage, optimize edilmiş WebSocket mimarisi ve streaming ses motoru sayesinde cümlenizi bitirdiğiniz andan itibaren ortalama 1.2 saniye içinde doğal bir tonlama ve telaffuzla sesli yanıt verir. Bu, gerçek bir insan sohbeti kadar akıcıdır.",
  },
  {
    id: "v2",
    category: "Voice AI & Geri Bildirim",
    question: "Türkçe karşılaştırmalı hata teşhisi nasıl çalışır?",
    answer:
      "Örneğin bir mülakatta 'I am agree with you' dediğinizde, sistem konuşmanın akışını bölmeden ekranınıza 'Doğrusu: I agree with you (Türkçede 'katılıyorum' fiil olduğu için İngilizcede am kullanılmaz)' şeklinde şık bir cam kart düşürür.",
  },
  {
    id: "v3",
    category: "Voice AI & Geri Bildirim",
    question: "Telaffuzumdaki aksan ve hece hatalarını algılayabiliyor mu?",
    answer:
      "Evet. Fonetik analiz motorumuz, sesinizi hece hece tarar. 'Comfortable' kelimesini yanlış vurguladığınızda veya 'Th' seslerinde zorlandığınızda oturum sonu karnenizde ağız/dil pozisyonu ipuçlarıyla bunu raporlar.",
  },
  {
    id: "v4",
    category: "Voice AI & Geri Bildirim",
    question: "Oturum sonu 360° Karne Raporunda hangi metrikler yer alır?",
    answer:
      "Her senaryo sonunda: Genel Akıcılık Skoru (%0-100), Konuşma Süresi, Kullanılan Eşsiz Kelime Sayısı, Düzeltilen Dilbilgisi Kalıpları ve Seviye İlerleme puanınız ayrıntılı olarak sunulur.",
  },
  {
    id: "v5",
    category: "Voice AI & Geri Bildirim",
    question: "Yapay zekâ konuşurken araya girip (interrupt) sözünü kesebilir miyim?",
    answer:
      "Evet. Sistemimiz Voice Activity Detection (VAD) teknolojisine sahiptir. Karşıdaki AI rol konuşurken siz mikrofona başladığınız anda yapay zekâ sesini keser ve sizi dinlemeye başlar.",
  },

  // 3. Sahneler & Seviyeler (6 soru)
  {
    id: "s1",
    category: "Sahneler & Seviyeler",
    question: "Uygulamada hangi senaryolar ve sahneler bulunuyor?",
    answer:
      "Temel olarak 6 ana kategori mevcuttur: 1) Tech & Yazılımcı Standup'ı, 2) FAANG ve Global İş Mülakatları, 3) ABD/Schengen Vize Görüşmesi, 4) B2B Satış ve Fiyat Pazarlığı, 5) Havalimanı & Seyahat, 6) Günlük Sosyal Kahve Sohbetleri. Her ay kütüphaneye yeni sahneler eklenir.",
  },
  {
    id: "s2",
    category: "Sahneler & Seviyeler",
    question: "Seviyemi nasıl belirleyeceğim? (A1 - C2)",
    answer:
      "İlk girişte yapacağınız 2 dakikalık sesli Akıcılık Pusulası testi seviyenizi anında tespit eder. Ayrıca dilediğiniz zaman profilinizden seviyenizi kendiniz manuel olarak da değiştirebilirsiniz.",
  },
  {
    id: "s3",
    category: "Sahneler & Seviyeler",
    question: "Bir senaryoda konu dışına çıkarsam yapay zekâ ne yapar?",
    answer:
      "Yapay zekâ senaryodaki rolünü (örneğin Konsolosluk Görevlisi) koruyarak verdiğiniz cevaba göre dinamik yanıt üretir. Robotik kalıplarla sınırlandırılmamıştır; tamamen durumsal zekâya sahiptir.",
  },
  {
    id: "s4",
    category: "Sahneler & Seviyeler",
    question: "Yazılımcılar için özel teknik terimler ve kod konuşmaları var mı?",
    answer:
      "Evet. Tech Standup sahnelerimizde PR review, blocker, merge conflict, microservices, latency ve sprint planning gibi gerçek dünya terimleri ve konuşma dinamikleri birebir yer alır.",
  },
  {
    id: "s5",
    category: "Sahneler & Seviyeler",
    question: "Vize mülakatı senaryosu gerçekten konsolosluk ortamını yansıtıyor mu?",
    answer:
      "Evet. Konsolosluk görevlisi yapay zekâ; banka hesap dökümü, seyahat amacı, geri dönüş kanıtı ve konaklama gibi vize memurlarının gerçekte sorduğu çapraz sorularla sizi terletir ve hazırlar.",
  },
  {
    id: "s6",
    category: "Sahneler & Seviyeler",
    question: "Kendi özel senaryomu veya mülakat sorumu ekleyebilir miyim?",
    answer:
      "Stage Pass Pro kullanıcıları, girecekleri gerçek bir mülakatın şirket adı ve iş tanımını girerek kendilerine özel kişiselleştirilmiş AI mülakat simülasyonu başlatabilirler.",
  },

  // 4. Kelime & Spaced Repetition (5 soru)
  {
    id: "k1",
    category: "Kelime & Spaced Repetition",
    question: "Spaced Repetition (SM-2) kelime sistemi nasıl çalışır?",
    answer:
      "Senaryolarda konuşurken kullandığınız veya takıldığınız kelimeler otomatik olarak Kelime Destenize eklenir. Sistem unutmamanız için kelimeyi 1 gün, 3 gün, 7 gün ve 30 gün aralıklarla hafıza eşiğinizde önünüze getirir.",
  },
  {
    id: "k2",
    category: "Kelime & Spaced Repetition",
    question: "Kelimelerin telaffuzunu ve cümle içi kullanımını görebilir miyim?",
    answer:
      "Evet. Her kelime kartında gerçek sesli telaffuz, fonetik alfabe (IPA), Türkçe anlamı ve o kelimenin geçtiği sahne repliği yer alır.",
  },
  {
    id: "k3",
    category: "Kelime & Spaced Repetition",
    question: "Tematik Reading (Okuma & Dinleme) modülü nedir?",
    answer:
      "Konuşmaya başlamadan önce senaryo konusuyla ilgili kısa, akıcı makaleleri hem okuyabilir hem de profesyonel seslendirmen tonuyla dinleyerek kulak aşinalığı kazanabilirsiniz.",
  },
  {
    id: "k4",
    category: "Kelime & Spaced Repetition",
    question: "Kendi kelime listelerimi içe aktarabilir miyim?",
    answer:
      "Evet. Notlarınızdaki kelimeleri tek tıkla destenize ekleyebilir ve konuşma senaryolarınızda o kelimeleri kullanmaya teşvik edilebilirsiniz.",
  },
  {
    id: "k5",
    category: "Kelime & Spaced Repetition",
    question: "Streak (Günlük Seri) sistemi ne işe yarar?",
    answer:
      "Düzenli alışkanlık kazanmanız için her gün en az 1 pratik yaptığınızda ateş seriniz artar. 7 gün, 30 gün ve 100 gün serilerinde özel 3D başarı rozetleri kazanırsınız.",
  },

  // 5. Abonelik & Ödemeler (5 soru)
  {
    id: "a1",
    category: "Abonelik & Ödemeler",
    question: "TalkStage tamamen ücretsiz kullanılabilir mi?",
    answer:
      "Evet! Free Stage planı kapsamında günde 1 sesli senaryo pratiği, sınırsız kelime kartı erişimi ve reading kütüphanesi tamamen ücretsizdir. Kredi kartı gerekmez.",
  },
  {
    id: "a2",
    category: "Abonelik & Ödemeler",
    question: "Stage Pass Pro aboneliği neleri kapsar?",
    answer:
      "Sınırsız sesli konuşma süresi, tüm niş mülakat ve vize sahneleri, gelişmiş fonetik analizler, kişiselleştirilmiş senaryo oluşturucu ve öncelikli sunucu erişimi sağlar.",
  },
  {
    id: "a3",
    category: "Abonelik & Ödemeler",
    question: "Aboneliğimi nasıl iptal edebilirim? Taahhüt var mı?",
    answer:
      "Kesinlikle taahhüt yoktur. iPhone kullanıyorsanız App Store > Abonelikler, Android kullanıyorsanız Google Play > Abonelikler menüsünden dilediğiniz an tek dokunuşla iptal edebilirsiniz.",
  },
  {
    id: "a4",
    category: "Abonelik & Ödemeler",
    question: "Fiyatlar nedir ve yıllık planda indirim var mı?",
    answer:
      "Aylık Pro plan 199 TL/ay'dır. Yıllık planı seçtiğinizde ise %40'a yakın avantajla yıllık 1.490 TL üzerinden tek seferde faturalandırılırsınız.",
  },
  {
    id: "a5",
    category: "Abonelik & Ödemeler",
    question: "Şirketler ve yazılım ekipleri için kurumsal fatura kesiliyor mu?",
    answer:
      "Evet. 5 kişi ve üzeri ekipler için toplu lisanslama ve kurumsal KDV'li fatura desteği sunuyoruz. Detaylar için b2b@talkstage.app adresine yazabilirsiniz.",
  },

  // 6. Gizlilik & Cihazlar (4 soru)
  {
    id: "c1",
    category: "Gizlilik & Cihazlar",
    question: "TalkStage hangi telefonlarda ve tabletlerde çalışır?",
    answer:
      "iOS 15+ yüklü tüm iPhone ve iPad cihazlarda, Android 9+ yüklü tüm Android akıllı telefon ve tabletlerde sorunsuz çalışır.",
  },
  {
    id: "c2",
    category: "Gizlilik & Cihazlar",
    question: "Ses kayıtlarım kaydedilip başkalarına dinletilir mi?",
    answer:
      "Asla. Ses akışınız yalnızca anlık konuşma ve metne dönüştürme esnasında şifreli (TLS 1.3) bağlantı ile işlenir. Reklam hedeflemesi veya üçüncü şahıslara satış amacıyla kalıcı kayıt tutulmaz.",
  },
  {
    id: "c3",
    category: "Gizlilik & Cihazlar",
    question: "KVKK ve GDPR düzenlemelerine uyumlu musunuz?",
    answer:
      "Evet. 6698 sayılı KVKK ve AB GDPR veri gizliliği kurallarına %100 uyumluyuz. Dilediğiniz zaman tüm geçmişinizi ve hesabınızı uygulama içerisinden silebilirsiniz.",
  },
  {
    id: "c4",
    category: "Gizlilik & Cihazlar",
    question: "İnternet bağlantım zayıf olduğunda konuşabilir miyim?",
    answer:
      "Sesli konuşma motoru için stabil bir 4G/5G veya Wi-Fi bağlantısı önerilir. Ancak Kelime Kartları ve Reading modülü çevrimdışı (offline) modda da çalışır.",
  },
];

const categories: FaqCategory[] = [
  "Tümü",
  "Genel & Metodoloji",
  "Voice AI & Geri Bildirim",
  "Sahneler & Seviyeler",
  "Kelime & Spaced Repetition",
  "Abonelik & Ödemeler",
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
            Aklınızdaki Tüm Sorular (SSS)
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Merak Ettiğiniz Her Şey Burada
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Metodolojimiz, yapay zekâ ses motoru, mülakat sahneleri ve abonelikler hakkında en çok sorulan 30+ sorunun yanıtı.
          </p>
        </Reveal>

        {/* Live Search & Filter Bar */}
        <div className="mt-12 space-y-6">
          {/* Search Box */}
          <div className="relative mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Soru veya konu ara (örn: gecikme, mülakat, iptal, telaffuz)..."
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
            Destek ekibimiz tüm soru, öneri ve senaryo taleplerinize ortalama 2 saat içinde yanıt verir.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo to-cyan px-7 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <span>Bize Mesaj Gönder</span>
              <span>→</span>
            </Link>
            <a
              href="mailto:destek@talkstage.app"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-porcelain px-6 py-3 text-sm font-semibold text-heading hover:bg-slate-100"
            >
              destek@talkstage.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
