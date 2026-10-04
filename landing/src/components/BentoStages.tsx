'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import PhoneFrame from './PhoneFrame';

type PillarId = 'scenarios' | 'vocab' | 'grammar' | 'sm2' | 'podcast';

interface PillarColor {
  bg: string;
  hoverBorder: string;
  badge: string;
  badgeText: string;
  titleHover: string;
  iconBg: string;
  iconBorder: string;
  linkColor: string;
  glowBg: string;
}

const PILLAR_COLORS: Record<PillarId, PillarColor> = {
  scenarios: {
    bg: 'bg-card-orange',
    hoverBorder: 'hover:border-orange-400',
    badge: 'bg-orange-100 border-orange-200',
    badgeText: 'text-orange-700',
    titleHover: 'group-hover:text-orange-600',
    iconBg: 'bg-orange-100',
    iconBorder: 'border-orange-200',
    linkColor: 'text-orange-600',
    glowBg: 'group-hover:bg-orange-400/20',
  },
  vocab: {
    bg: 'bg-card-lime',
    hoverBorder: 'hover:border-lime-400',
    badge: 'bg-lime-100 border-lime-300',
    badgeText: 'text-lime-800',
    titleHover: 'group-hover:text-lime-700',
    iconBg: 'bg-lime-100',
    iconBorder: 'border-lime-300',
    linkColor: 'text-lime-700',
    glowBg: 'group-hover:bg-lime-400/20',
  },
  grammar: {
    bg: 'bg-card-blue',
    hoverBorder: 'hover:border-blue-400',
    badge: 'bg-blue-100 border-blue-200',
    badgeText: 'text-blue-700',
    titleHover: 'group-hover:text-blue-600',
    iconBg: 'bg-blue-100',
    iconBorder: 'border-blue-200',
    linkColor: 'text-blue-600',
    glowBg: 'group-hover:bg-blue-400/20',
  },
  sm2: {
    bg: 'bg-card-pink',
    hoverBorder: 'hover:border-pink-400',
    badge: 'bg-pink-100 border-pink-200',
    badgeText: 'text-pink-700',
    titleHover: 'group-hover:text-pink-600',
    iconBg: 'bg-pink-100',
    iconBorder: 'border-pink-200',
    linkColor: 'text-pink-600',
    glowBg: 'group-hover:bg-pink-400/20',
  },
  podcast: {
    bg: 'bg-card-purple',
    hoverBorder: 'hover:border-purple-400',
    badge: 'bg-purple-100 border-purple-200',
    badgeText: 'text-purple-700',
    titleHover: 'group-hover:text-purple-600',
    iconBg: 'bg-purple-100',
    iconBorder: 'border-purple-200',
    linkColor: 'text-purple-600',
    glowBg: 'group-hover:bg-purple-400/20',
  },
};

const PILLARS = [
  {
    id: 'scenarios' as PillarId,
    emoji: '🎙️',
    title: 'Canlı Sesli AI Senaryoları',
    badge: 'STAR Metodu',
    desc: 'İş mülakatı, vize görüşmesi, havalimanı aktarması... Yapay zeka ile canlı konuş, anlık gramer koçluğu al!',
    iconImg: '/images/28_ui_mic_recording_orb.png',
    stat: '50+ Gerçek Hayat Sahnesi',
    details: {
      heading: 'İş Mülakatından Havalimanına 50+ Canlı Senaryo',
      summary: 'Yapay zeka partneriniz duruma göre bir VP of Engineering, bir vize konsolosu veya Londra kafesindeki bir barista rolüne bürünür. Konuşurken takıldığınızda sizi bölmeden kenarda Türkçe anlık ipucu kartı açar.',
      features: [
        'STAR Mülakat Tekniği (Situation, Task, Action, Result) analizi',
        '1.2 saniye ultra düşük yanıt gecikmesi',
        'Her cümlenizde anlık gramer ve kelime zenginliği skoru',
      ],
      linkText: 'Senaryo Stüdyosunu İncele',
      linkHref: '/app/scenarios',
    },
  },
  {
    id: 'vocab' as PillarId,
    emoji: '📚',
    title: '900 Çekirdek Kelime Kütüphanesi',
    badge: '3 Frekans Paketi',
    desc: 'Günlük konuşmaların %85\'ini kapsayan en sık 900 kelime. IPA telaffuzları ve 4 zamanlı çekim tablolarıyla.',
    iconImg: '/images/24_card_vocab_deck.png',
    stat: '900 Çekirdek Kelime',
    details: {
      heading: 'Frekans Sıralı 900 Çekirdek Kelime Listesi',
      summary: '1-100, 101-200 ve 201-300 frekans paketleriyle en kritik kelimeleri aşama aşama öğrenin.',
      features: [
        '300 İsim (Nouns), 300 Fiil (Verbs), 300 Sıfat (Adjectives)',
        '4 zamanlı çekim tabloları (Present, Past, Perfect, Continuous)',
        'Tek tıkla telaffuz dinleme ve Kelime Sandığı\'na ekleme',
      ],
      linkText: '900 Kelime Kütüphanesini Gör',
      linkHref: '/app/library',
    },
  },
  {
    id: 'grammar' as PillarId,
    emoji: '🏛️',
    title: '46 CEFR Gramer Akademisi',
    badge: 'A1 – C2',
    desc: 'Formül kartları, zihin haritaları ve interaktif testlerle grameri temele oturtun.',
    iconImg: '/images/25_card_reading_module.png',
    stat: '46 Konu • 230+ Soru',
    details: {
      heading: 'A1\'den C2\'ye 46 Resmi CEFR Gramer Dersi',
      summary: 'Gramer kurallarını ezberlemek yerine görsel formül şemalarıyla mantığını kavrayın.',
      features: [
        'A1 (12), A2 (10), B1 (10), B2 (8), C1 (4), C2 (2) Konu',
        'Görsel ASCII Zihin Haritaları ve karar ağaçları',
        'Sık yapılan hatalar analizi (❌ Yanlış vs ✓ Doğru)',
      ],
      linkText: 'Gramer Müfredatını İncele',
      linkHref: '/app/grammar',
    },
  },
  {
    id: 'sm2' as PillarId,
    emoji: '🧠',
    title: 'SM-2 Kelime Sandığı (SRS)',
    badge: 'Aralıklı Tekrar',
    desc: 'SuperMemo-2 algoritması; kelimeyi tam unutmak üzereyken karşınıza çıkarır.',
    iconImg: '/images/27_card_streak_calendar.png',
    stat: 'Bilişsel Hafıza Modeli',
    details: {
      heading: 'Unutma Eğrisini Sıfırlayan SuperMemo-2 Sistemi',
      summary: 'Ebbinghaus unutma eğrisi modelini kullanır. Kolay bulduğunuzda aralık uzar, zorlandığınızda hemen tekrar ettirilir.',
      features: [
        'Mobilde ve webde tek ortak sandık',
        '1: Tekrar, 2: İyi, 3: Kolay derecelendirme',
        'Klavye kısayolları (Boşluk: Çevir, 1-2-3: Puanla)',
      ],
      linkText: 'Kelime Sandığını Aç',
      linkHref: '/app/vocab',
    },
  },
  {
    id: 'podcast' as PillarId,
    emoji: '🎧',
    title: 'Çift Dilli Podcast İstasyonu',
    badge: 'Senkronize Transkript',
    desc: 'Metroda, yürüyüşte dinle. Çift dilli transkript ile her kelimenin Türkçe karşılığını anında gör!',
    iconImg: '/images/44_nav_icon_quick_voice_orb.png',
    stat: 'Çift Dilli Akış',
    details: {
      heading: 'Her Yerde Dinlenebilir Çift Dilli Sesli İçerikler',
      summary: 'Profesyonel seslendirmeler ve senkronize transkript takibi.',
      features: [
        'Doğal hızda anadil konuşmacıları',
        'Senkronize Türkçe & İngilizce transkript takibi',
        'Bölüm içi kilit kelimeler ve anlık kelime kaydetme',
      ],
      linkText: 'Podcast İstasyonunu Aç',
      linkHref: '/app/podcasts',
    },
  },
];

const PHONE_SCREENS: Record<PillarId, { src: string; alt: string }> = {
  scenarios: { src: '/images/app-screens/scenarios-catalog.png', alt: 'TalkStage Senaryolar' },
  vocab: { src: '/images/app-screens/vocab-library.png', alt: 'TalkStage 900 Kelime' },
  grammar: { src: '/images/app-screens/roadmap.png', alt: 'TalkStage Gramer' },
  sm2: { src: '/images/app-screens/vocab-practice.png', alt: 'TalkStage SM-2' },
  podcast: { src: '/images/app-screens/podcasts.png', alt: 'TalkStage Podcast' },
};

export default function BentoStages() {
  const [selectedPillar, setSelectedPillar] = useState<typeof PILLARS[0] | null>(null);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden bg-bg-warm">
      {/* Subtle warm gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-pink-pop/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-pop/8 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200/80 text-sm font-bold text-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-pop" />
            <span>5 Süper Güç 💪</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-heading leading-tight">
            TalkStage&apos;in{' '}
            <span className="text-highlight">Süper Güçleri</span>
          </h2>

          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
            Sıradan bir kelime ezberletici değil — konuşma refleksini kalıcı kılan 5 entegre istasyon 🎯
          </p>
        </div>

        {/* Bento Grid with Colorful Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: 🎙️ Senaryolar (7 Cols — Featured) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[0])}
            className={`md:col-span-7 ${PILLAR_COLORS.scenarios.bg} ${PILLAR_COLORS.scenarios.hoverBorder} rounded-[36px] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent card-playful`}
          >
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-orange-300/10 blur-3xl ${PILLAR_COLORS.scenarios.glowBg} transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`card-icon relative w-14 h-14 rounded-2xl ${PILLAR_COLORS.scenarios.iconBg} border ${PILLAR_COLORS.scenarios.iconBorder} p-2 shadow-xs`}>
                  <Image src={PILLARS[0].iconImg} alt={PILLARS[0].title} fill sizes="56px" className="object-contain p-1.5" />
                </div>
                <span className={`font-mono text-xs font-bold ${PILLAR_COLORS.scenarios.badge} ${PILLAR_COLORS.scenarios.badgeText} border px-3 py-1 rounded-full`}>
                  {PILLARS[0].badge}
                </span>
              </div>

              <div>
                <h3 className={`font-extrabold text-xl sm:text-2xl text-heading ${PILLAR_COLORS.scenarios.titleHover} transition-colors`}>
                  {PILLARS[0].emoji} {PILLARS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-body mt-2 leading-relaxed max-w-md">
                  {PILLARS[0].desc}
                </p>
              </div>

              {/* Side-by-side preview */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                <div className="sm:col-span-7 space-y-2.5">
                  <div className="bg-white/80 border border-orange-200/60 rounded-2xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted">
                      <span>CANLI CEFR GERİBİLDİRİMİ</span>
                      <span className="text-emerald font-bold">+50 XP 🎉</span>
                    </div>
                    <div className="text-heading font-semibold text-xs leading-snug">
                      &ldquo;We decoupled services to handle peak concurrency.&rdquo;
                    </div>
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      ✓ STAR Metodu analizi: B2/C1 teknik jargonu kusursuz 💯
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-5 flex justify-center sm:justify-end">
                  <div className="relative transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500">
                    <PhoneFrame
                      src={PHONE_SCREENS.scenarios.src}
                      alt={PHONE_SCREENS.scenarios.alt}
                      width={140}
                      rotate="rotate-2"
                      glow={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between text-xs font-bold ${PILLAR_COLORS.scenarios.linkColor} pt-3 border-t border-orange-200/40 relative z-10`}>
              <span className="group-hover:underline">Detayları İncele →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: 📚 Kelime (5 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[1])}
            className={`md:col-span-5 ${PILLAR_COLORS.vocab.bg} ${PILLAR_COLORS.vocab.hoverBorder} rounded-[36px] p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent card-playful`}
          >
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-lime-300/10 blur-3xl transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`card-icon relative w-14 h-14 rounded-2xl ${PILLAR_COLORS.vocab.iconBg} border ${PILLAR_COLORS.vocab.iconBorder} p-2 shadow-xs`}>
                  <Image src={PILLARS[1].iconImg} alt={PILLARS[1].title} fill sizes="56px" className="object-contain p-1.5" />
                </div>
                <span className={`font-mono text-xs font-bold ${PILLAR_COLORS.vocab.badge} ${PILLAR_COLORS.vocab.badgeText} border px-3 py-1 rounded-full`}>
                  {PILLARS[1].badge}
                </span>
              </div>

              <div>
                <h3 className={`font-extrabold text-xl text-heading ${PILLAR_COLORS.vocab.titleHover} transition-colors`}>
                  {PILLARS[1].emoji} {PILLARS[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-body mt-2 leading-relaxed">
                  {PILLARS[1].desc}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="space-y-2 flex-1">
                  <div className="bg-white/80 border border-lime-200/60 rounded-xl p-2.5 text-center">
                    <div className="font-mono font-extrabold text-lime-700 text-sm">300 İsim</div>
                    <div className="text-[10px] text-muted font-medium">Nouns (Oxford 3000)</div>
                  </div>
                  <div className="bg-white/80 border border-lime-200/60 rounded-xl p-2.5 text-center">
                    <div className="font-mono font-extrabold text-lime-700 text-sm">300 Fiil + 300 Sıfat</div>
                    <div className="text-[10px] text-muted font-medium">4 Zamanlı Çekimler</div>
                  </div>
                </div>

                <div className="shrink-0 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                  <PhoneFrame
                    src={PHONE_SCREENS.vocab.src}
                    alt={PHONE_SCREENS.vocab.alt}
                    width={130}
                    rotate="-rotate-2"
                    glow={false}
                  />
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between text-xs font-bold ${PILLAR_COLORS.vocab.linkColor} pt-3 border-t border-lime-200/40 relative z-10`}>
              <span className="group-hover:underline">Kütüphaneyi Gör →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: 🏛️ Gramer (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[2])}
            className={`md:col-span-4 ${PILLAR_COLORS.grammar.bg} ${PILLAR_COLORS.grammar.hoverBorder} rounded-[36px] p-6 flex flex-col justify-between space-y-4 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent card-playful`}
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`card-icon relative w-12 h-12 rounded-2xl ${PILLAR_COLORS.grammar.iconBg} border ${PILLAR_COLORS.grammar.iconBorder} p-2 shadow-xs`}>
                  <Image src={PILLARS[2].iconImg} alt={PILLARS[2].title} fill sizes="48px" className="object-contain p-1" />
                </div>
                <span className={`font-mono text-[10px] font-bold ${PILLAR_COLORS.grammar.badge} ${PILLAR_COLORS.grammar.badgeText} border px-2.5 py-0.5 rounded-full`}>
                  A1 – C2
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-lg text-heading ${PILLAR_COLORS.grammar.titleHover} transition-colors`}>
                  {PILLARS[2].emoji} {PILLARS[2].title}
                </h3>
                <p className="text-xs text-body leading-relaxed mt-1">{PILLARS[2].desc}</p>
              </div>

              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame src={PHONE_SCREENS.grammar.src} alt={PHONE_SCREENS.grammar.alt} width={130} rotate="" glow={false} />
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between text-xs font-bold ${PILLAR_COLORS.grammar.linkColor} pt-3 border-t border-blue-200/40 relative z-10`}>
              <span>Müfredatı Aç →</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: 🧠 SM-2 (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[3])}
            className={`md:col-span-4 ${PILLAR_COLORS.sm2.bg} ${PILLAR_COLORS.sm2.hoverBorder} rounded-[36px] p-6 flex flex-col justify-between space-y-4 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent card-playful`}
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`card-icon relative w-12 h-12 rounded-2xl ${PILLAR_COLORS.sm2.iconBg} border ${PILLAR_COLORS.sm2.iconBorder} p-2 shadow-xs`}>
                  <Image src={PILLARS[3].iconImg} alt={PILLARS[3].title} fill sizes="48px" className="object-contain p-1" />
                </div>
                <span className={`font-mono text-[10px] font-bold ${PILLAR_COLORS.sm2.badge} ${PILLAR_COLORS.sm2.badgeText} border px-2.5 py-0.5 rounded-full`}>
                  SM-2
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-lg text-heading ${PILLAR_COLORS.sm2.titleHover} transition-colors`}>
                  {PILLARS[3].emoji} {PILLARS[3].title}
                </h3>
                <p className="text-xs text-body leading-relaxed mt-1">{PILLARS[3].desc}</p>
              </div>

              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame src={PHONE_SCREENS.sm2.src} alt={PHONE_SCREENS.sm2.alt} width={130} rotate="" glow={false} />
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between text-xs font-bold ${PILLAR_COLORS.sm2.linkColor} pt-3 border-t border-pink-200/40 relative z-10`}>
              <span>Sandık Algoritması →</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: 🎧 Podcast (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[4])}
            className={`md:col-span-4 ${PILLAR_COLORS.podcast.bg} ${PILLAR_COLORS.podcast.hoverBorder} rounded-[36px] p-6 flex flex-col justify-between space-y-4 shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border-2 border-transparent card-playful`}
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`card-icon relative w-12 h-12 rounded-2xl ${PILLAR_COLORS.podcast.iconBg} border ${PILLAR_COLORS.podcast.iconBorder} p-2 shadow-xs`}>
                  <Image src={PILLARS[4].iconImg} alt={PILLARS[4].title} fill sizes="48px" className="object-contain p-1" />
                </div>
                <span className={`font-mono text-[10px] font-bold ${PILLAR_COLORS.podcast.badge} ${PILLAR_COLORS.podcast.badgeText} border px-2.5 py-0.5 rounded-full`}>
                  Podcast
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-lg text-heading ${PILLAR_COLORS.podcast.titleHover} transition-colors`}>
                  {PILLARS[4].emoji} {PILLARS[4].title}
                </h3>
                <p className="text-xs text-body leading-relaxed mt-1">{PILLARS[4].desc}</p>
              </div>

              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame src={PHONE_SCREENS.podcast.src} alt={PHONE_SCREENS.podcast.alt} width={130} rotate="" glow={false} />
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between text-xs font-bold ${PILLAR_COLORS.podcast.linkColor} pt-3 border-t border-purple-200/40 relative z-10`}>
              <span>Bölüm Çalarını Gör →</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE EXPANDABLE MODAL / INSPECTOR DRAWER           */}
      {/* ======================================================== */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-heading w-full max-w-2xl rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-muted hover:text-heading hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-pink-pop/10 border border-pink-pop/15 p-2 shrink-0">
                <Image
                  src={selectedPillar.iconImg}
                  alt={selectedPillar.title}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-pink-pop uppercase tracking-wider">
                  {selectedPillar.stat}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-heading">
                  {selectedPillar.emoji} {selectedPillar.details.heading}
                </h3>
              </div>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-body leading-relaxed font-medium">
              {selectedPillar.details.summary}
            </p>

            {/* Feature List */}
            <div className="space-y-2.5 bg-card-lime p-4 rounded-2xl border border-lime-200/60">
              <div className="text-xs font-bold text-heading mb-1">Öne Çıkan Yetkinlikler ✨</div>
              {selectedPillar.details.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-body">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Bottom Link */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setSelectedPillar(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-body font-bold text-xs transition-all cursor-pointer"
              >
                Kapat
              </button>

              <Link
                href={selectedPillar.details.linkHref}
                className="px-6 py-2.5 rounded-full bg-heading text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>{selectedPillar.details.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
