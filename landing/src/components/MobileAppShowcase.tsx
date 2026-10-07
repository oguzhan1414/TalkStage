"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Headphones,
  Home,
  LayoutGrid,
  MoveRight,
  Sparkles,
  Award,
  Layers,
  Zap,
  ArrowRight,
  Flame,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import Reveal from "./Reveal";

type ScreenTab = {
  id: string;
  label: string;
  badge?: string;
  icon: LucideIcon;
  src: string;
  headline: string;
  caption: string;
  highlights: string[];
  chips: [
    { emoji: string; value: string; label: string },
    { emoji: string; value: string; label: string }
  ];
  webLink: string;
};

const APP_SCREENS: ScreenTab[] = [
  {
    id: "scenarios",
    label: "Canlı AI Sahneleri",
    badge: "1.2s Ses",
    icon: LayoutGrid,
    src: "/images/app-screens/scenarios-catalog.png",
    headline: "40+ Gerçek Hayat Senaryosu ve Canlı Rol Yapma",
    caption:
      "İş mülakatı, teknik standup, havalimanı ve vize görüşmelerinde yapay zekâ karakterleriyle birebir konuş. Donup kaldığın an alttan fısıldanan Türkçe ipuçlarıyla akıcılığı asla kaybetme.",
    highlights: [
      "1.2 saniyelik ultra düşük gecikmeli ses motoru",
      "Her cümle sonunda anlık gramer & STAR metodu analizi",
      "Yazılı chat veya Deepgram destekli sesli prova seçeneği",
    ],
    chips: [
      { emoji: "🎙️", value: "40+", label: "Canlı Sahne" },
      { emoji: "⚡", value: "1.2s", label: "Ses Yanıtı" },
    ],
    webLink: "/app/scenarios",
  },
  {
    id: "vocab-practice",
    label: "SM-2 Kelime Sandığı",
    badge: "3D Kartlar",
    icon: BookOpen,
    src: "/images/app-screens/vocab-practice.png",
    headline: "Ebbinghaus Unutma Eğrisini Yenen 3D Kelime Pratiği",
    caption:
      "Kelimeleri ezberleme, hafızana kazı. Bilimsel SM-2 algoritması her kelimeyi tam unutmak üzere olduğun gün tekrar önüne getirir; 3D çevirmeli kartlarla kalıcı konuşma kasına dönüştürür.",
    highlights: [
      "3 aşamalı aralıklı tekrar: Tekrar (1 gün) • İyi (3 gün) • Kolay (7+ gün)",
      "Kartı tek dokunuşla çevirip anlam ve bağlamsal cümle örneğini görme",
      "Kişisel sandığına eklediğin kelimeler mobil ve webde anında senkron",
    ],
    chips: [
      { emoji: "🎴", value: "SM-2", label: "Algoritma" },
      { emoji: "🧠", value: "%99", label: "Kalıcı Hafıza" },
    ],
    webLink: "/app/vocab",
  },
  {
    id: "podcasts",
    label: "Podcast İstasyonu",
    badge: "40 Bölüm",
    icon: Headphones,
    src: "/images/app-screens/podcasts.png",
    headline: "Doğal Hızda Dinleme ve Çift Dilli Transkript",
    caption:
      "A1'den B2'ye kadar gerçek hayat diyaloglarından oluşan 40 bölümlük ses stüdyosu. Kulaklıkla yürürken dinle, takıldığın kelimeye dokunup anında sandığına kaydet.",
    highlights: [
      "Akıllı transkript takibi: Dinlerken kelime kelime eşzamanlı vurgulama",
      "Doğal İngiliz ve Amerikan aksanlarında stüdyo kayıtları",
      "Bölüm sonu mikro anlama testleri ve kelime çıkarma",
    ],
    chips: [
      { emoji: "🎧", value: "40", label: "Orijinal Bölüm" },
      { emoji: "🗣️", value: "A1–B2", label: "Seviye Aralığı" },
    ],
    webLink: "/app/podcasts",
  },
  {
    id: "vocab-library",
    label: "900 Çekirdek Kelime",
    badge: "Müfredat",
    icon: Layers,
    src: "/images/app-screens/vocab-library.png",
    headline: "En Sık Kullanılan İsim, Fiil ve Sıfat Paketleri",
    caption:
      "Oxford 3000 ve CEFR standartlarında filtrelenmiş 900 çekirdek kelime. Tekil, çoğul, iyelik tamlamaları ve örnek cümlelerle eksiksiz bir konuşma sözlüğü.",
    highlights: [
      "İsimler, Fiiller ve Sıfatlar için 100'lük paketleme sistemi",
      "Tek dokunuşla 'Biliyorum, Atla' veya 'Sandığıma Ekle' yönetimi",
      "Her kelime için anadili telaffuz seslendirmesi",
    ],
    chips: [
      { emoji: "📚", value: "900", label: "Çekirdek Kelime" },
      { emoji: "📦", value: "9 Paket", label: "Kademeli İlerleme" },
    ],
    webLink: "/app/library",
  },
  {
    id: "calendar",
    label: "Takvim & Günlük Plan",
    badge: "Streak",
    icon: CalendarDays,
    src: "/images/app-screens/calendar-monthly.png",
    headline: "Kişiselleştirilmiş 4 İstasyonlu Günlük Seans",
    caption:
      "Her gün için 15 dakikalık akıllı rota: Okuma ➔ AI Yazma & Sohbet ➔ Kelime Sandığı ➔ Sesli Sahne Provası. Dolu yeşil halkalarla serini asla bozma.",
    highlights: [
      "Haftalık ve aylık çalışma takviminde görsel streak takibi",
      "Gün sonu emoji değerlendirmesi: Harika, Akıcı, Orta, Zor",
      "Masaüstü ve mobil seanslar tek ortak sayaçta birleşir",
    ],
    chips: [
      { emoji: "🔥", value: "12 Gün", label: "Aktif Streak" },
      { emoji: "🎯", value: "%100", label: "Günlük Hedef" },
    ],
    webLink: "/app",
  },
  {
    id: "roadmap",
    label: "A1–C2 Ada Haritası",
    badge: "Oyunlaştırma",
    icon: Award,
    src: "/images/app-screens/roadmap.png",
    headline: "6 Seviyeli Takımada Yolculuğu ve Rozetler",
    caption:
      "A1 Başlangıç'tan C2 Ustalık zirvesine kadar 46 CEFR dersi ve 3D başarı rozetleri. Her adımda Mivo AI sana eşlik eder.",
    highlights: [
      "3D izometrik takımada haritasında istasyon bazlı ilerleme",
      "10 adet 3D başarı rozeti (Standup Hero, Visa Approved, 30-Day Master)",
      "CEFR seviye atlama sınavları ve yetkinlik kalkanı",
    ],
    chips: [
      { emoji: "🏝️", value: "6 Ada", label: "Müfredat" },
      { emoji: "🏆", value: "10 Rozet", label: "3D Başarı" },
    ],
    webLink: "/app/grammar",
  },
];

export default function MobileAppShowcase() {
  const [activeId, setActiveId] = useState(APP_SCREENS[0].id);
  const active = APP_SCREENS.find((s) => s.id === activeId) ?? APP_SCREENS[0];

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 bg-porcelain/50">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-indigo-500/10 via-cyan-400/10 to-emerald-400/5 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-indigo shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerçek Mobil Deneyimi</span>
          </div>
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Cebindeki Konuşma Koçunu Keşfet
          </h2>
          <p className="text-balance leading-relaxed text-slate-600 sm:text-lg">
            Bunlar temsili çizimler değil; TalkStage mobil uygulamasından canlı ekran görüntüleri. Aşağıdaki sekmelere dokunarak tüm modülleri incele.
          </p>
        </Reveal>

        {/* Tab Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {APP_SCREENS.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "border-indigo bg-indigo text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                <span>{s.label}</span>
                {s.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-indigo-50 text-indigo"
                    }`}
                  >
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Dynamic Rich Details Card (7 Cols) */}
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <div
              key={active.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo">
                  <active.icon className="h-5 w-5" strokeWidth={2.5} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    {active.label}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  TalkStage v2.0
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 leading-snug">
                  {active.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {active.caption}
                </p>
              </div>

              {/* Highlights list */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Öne Çıkan Özellikler:
                </div>
                {active.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <Link
                  href={active.webLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-600 transition-all"
                >
                  <span>Bu Modülü Webde Dene</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#indir"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo transition-colors"
                >
                  <span>Mobil Uygulamayı İndir</span>
                  <MoveRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right: The Live Interactive Phone Frame (5 Cols) */}
          <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto flex items-center justify-center">
              {/* Contextual floating stat chip top-right */}
              <div
                key={`${active.id}-chip-0`}
                className="absolute -right-2 sm:-right-6 top-8 z-30 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <span className="text-lg">{active.chips[0].emoji}</span>
                <div className="text-left leading-tight">
                  <div className="font-mono text-sm font-bold text-slate-900">{active.chips[0].value}</div>
                  <div className="text-[10px] font-semibold text-slate-400">{active.chips[0].label}</div>
                </div>
              </div>

              {/* Contextual floating stat chip bottom-left */}
              <div
                key={`${active.id}-chip-1`}
                className="absolute -left-2 sm:-left-8 bottom-12 z-30 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-300"
              >
                <span className="text-lg">{active.chips[1].emoji}</span>
                <div className="text-left leading-tight">
                  <div className="font-mono text-sm font-bold text-slate-900">{active.chips[1].value}</div>
                  <div className="text-[10px] font-semibold text-slate-400">{active.chips[1].label}</div>
                </div>
              </div>

              {/* Phone Mockup Frame */}
              <div key={active.id} className="relative z-10 transition-transform duration-500 hover:scale-105">
                <PhoneFrame
                  src={active.src}
                  alt={`TalkStage mobil uygulama ${active.label} ekranı`}
                  width={290}
                  rotate=""
                  priority
                  glow
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

