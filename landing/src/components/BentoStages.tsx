'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import PhoneFrame from './PhoneFrame';

type PillarId = 'scenarios' | 'vocab' | 'grammar' | 'sm2' | 'podcast';

const PILLARS = [
  {
    id: 'scenarios' as PillarId,
    title: 'Canlı Sesli AI Senaryoları',
    badge: 'STAR Metodu',
    desc: 'Kıdemli yazılımcı mülakatı, B2B kurumsal satış, vize görüşmesi veya havaalanı aktarması. Yapay zeka ile canlı konuşun; anlık gramer, tonlama ve akıcılık geribildirimi alın.',
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
    title: '900 Çekirdek Kelime Kütüphanesi',
    badge: '3 Frekans Paketi',
    desc: 'Günlük ve profesyonel İngilizce konuşmaların %85\'ini kapsayan en sık kullanılan 900 İsim, Fiil ve Sıfat. IPA sesli telaffuzları ve 4 zamanlı çekim tablolarıyla.',
    iconImg: '/images/24_card_vocab_deck.png',
    stat: '900 Çekirdek Kelime',
    details: {
      heading: 'Frekans Sıralı 900 Çekirdek Kelime Listesi',
      summary: '1-100, 101-200 ve 201-300 frekans paketleriyle en kritik kelimeleri aşama aşama öğrenin. Her kelime için V1, V2, V3 ve V-ing halleri ile gerçek cümle örnekleri mevcuttur.',
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
    title: '46 CEFR Gramer Akademisi',
    badge: 'A1 – C2 Tam Müfredat',
    desc: 'Formül kartları, şematik zihin haritaları, özet çekim tabloları ve interaktif testlerle grameri temele oturtun.',
    iconImg: '/images/25_card_reading_module.png',
    stat: '46 Konu • 230+ Soru',
    details: {
      heading: 'A1\'den C2\'ye 46 Resmi CEFR Gramer Dersi',
      summary: 'Gramer kurallarını ezberlemek yerine görsel formül şemalarıyla mantığını kavrayın. Her derste 10+ sesli örnek cümle, gerçek hayat diyaloğu ve pekiştirme testi yer alır.',
      features: [
        'A1 (12 Konu), A2 (10 Konu), B1 (10 Konu), B2 (8 Konu), C1 (4 Konu), C2 (2 Konu)',
        'Görsel ASCII Zihin Haritaları ve karar ağaçları',
        'Sık yapılan hatalar analizi (❌ Yanlış vs ✓ Doğru)',
      ],
      linkText: 'Gramer Müfredatını İncele',
      linkHref: '/app/grammar',
    },
  },
  {
    id: 'sm2' as PillarId,
    title: 'SM-2 Kelime Sandığı (SRS)',
    badge: 'Aralıklı Tekrar',
    desc: 'SuperMemo-2 algoritması; kaydettiğiniz kelimeleri tam unutmak üzereyken (1 gün, 3 gün, 7+ gün) karşınıza çıkararak kalıcı hafızaya aktarır.',
    iconImg: '/images/27_card_streak_calendar.png',
    stat: 'Bilişsel Hafıza Modeli',
    details: {
      heading: 'Unutma Eğrisini Sıfırlayan SuperMemo-2 Sistemi',
      summary: 'Bilişsel psikolojideki Ebbinghaus unutma eğrisi modelini kullanır. Bir kelimeyi kolay bulduğunuzda tekrar aralığı uzar, zorlandığınızda hemen ertesi gün tekrar ettirilir.',
      features: [
        'Mobilde ve webde tek ortak sandık',
        '1: Tekrar, 2: İyi, 3: Kolay derecelendirme sistemi',
        'Klavye kısayolları (Boşluk: Çevir, 1-2-3: Puanla)',
      ],
      linkText: 'Kelime Sandığını Aç',
      linkHref: '/app/vocab',
    },
  },
  {
    id: 'podcast' as PillarId,
    title: 'Çift Dilli Podcast İstasyonu',
    badge: 'Senkronize Transkript',
    desc: 'Metroda, yürüyüşte veya arabada dinleyin. Ekranda akan çift dilli transkript ile dinlediğiniz her kelimenin Türkçe karşılığını anında görün.',
    iconImg: '/images/44_nav_icon_quick_voice_orb.png',
    stat: 'Çift Dilli Akış',
    details: {
      heading: 'Her Yerde Dinlenebilir Çift Dilli Sesli İçerikler',
      summary: 'Londra kafesinden teknik retrospektif toplantılarına kadar zengin konularda kaydedilmiş profesyonel seslendirmeler. Ekrana baktığınızda aktif cümle otomatik vurgulanır.',
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

export default function BentoStages() {
  const [selectedPillar, setSelectedPillar] = useState<typeof PILLARS[0] | null>(null);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden bg-porcelain text-heading border-b border-line">
      {/* 3D Sunlit Ivory/Apricot Ambient Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <Image
          src="/images/bg_bento_sunlit_ivory.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-porcelain/80 via-transparent to-porcelain/95" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/12 border border-gold/35 text-xs font-bold text-indigo-dark shadow-xs backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Kusursuz Bir Öğrenme Ekosistemi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-heading leading-tight">
            TalkStage&apos;in{' '}
            <span className="font-serif italic font-medium text-transparent bg-clip-text bg-linear-to-r from-indigo to-gold">
              5 Süper Gücü
            </span>
          </h2>

          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
            Sıradan bir kelime ezberletici değil; CEFR standartlarında tasarlanmış, konuşma refleksini kalıcı kılan 5 entegre istasyon.
          </p>
        </div>

        {/* Bento Grid 2.0 (Ultra-Premium Cards with Real Mobile UI Previews) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: 🎙️ Canlı AI Senaryoları (7 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[0])}
            className="md:col-span-7 bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-indigo-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="relative w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-100 p-2 group-hover:scale-110 transition-transform shadow-xs">
                  <Image
                    src={PILLARS[0].iconImg}
                    alt={PILLARS[0].title}
                    fill
                    sizes="52px"
                    className="object-contain p-1.5"
                  />
                </div>
                <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full">
                  {PILLARS[0].badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {PILLARS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-md">
                  {PILLARS[0].desc}
                </p>
              </div>

              {/* Side-by-side preview with real mobile diyalog screen */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                <div className="sm:col-span-7 space-y-2.5">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>CANLI CEFR GERİBİLDİRİMİ</span>
                      <span className="text-emerald-600 font-bold">+50 XP</span>
                    </div>
                    <div className="text-slate-900 font-semibold text-xs leading-snug">
                      &ldquo;We decoupled services to handle peak concurrency.&rdquo;
                    </div>
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      ✓ STAR Metodu analizi: B2/C1 teknik jargonu kusursuz.
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-5 flex justify-center sm:justify-end">
                  <div className="relative transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500">
                    <PhoneFrame
                      src="/images/app-screens/scenarios-catalog.png"
                      alt="TalkStage Senaryolar Ekranı"
                      width={140}
                      rotate="rotate-2"
                      glow={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-3 border-t border-slate-100 relative z-10">
              <span className="group-hover:underline">Detayları & Canlı Örnekleri İncele</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: 📚 900 Çekirdek Kelime (5 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[1])}
            className="md:col-span-5 bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="relative w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200 p-2 group-hover:scale-110 transition-transform shadow-xs">
                  <Image
                    src={PILLARS[1].iconImg}
                    alt={PILLARS[1].title}
                    fill
                    sizes="52px"
                    className="object-contain p-1.5"
                  />
                </div>
                <span className="font-mono text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
                  {PILLARS[1].badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-amber-700 transition-colors">
                  {PILLARS[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {PILLARS[1].desc}
                </p>
              </div>

              {/* Stat Grid & Mini Mockup */}
              <div className="flex items-center gap-4 pt-1">
                <div className="space-y-2 flex-1">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <div className="font-mono font-extrabold text-indigo-700 text-sm">300 İsim</div>
                    <div className="text-[10px] text-slate-500 font-medium">Nouns (Oxford 3000)</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                    <div className="font-mono font-extrabold text-indigo-700 text-sm">300 Fiil + 300 Sıfat</div>
                    <div className="text-[10px] text-slate-500 font-medium">4 Zamanlı Çekimler</div>
                  </div>
                </div>

                <div className="shrink-0 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
                  <PhoneFrame
                    src="/images/app-screens/vocab-library.png"
                    alt="TalkStage 900 Çekirdek Kelime Ekranı"
                    width={130}
                    rotate="-rotate-2"
                    glow={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-amber-700 pt-3 border-t border-slate-100 relative z-10">
              <span className="group-hover:underline">Kütüphane Yapısını Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: 🏛️ 46 CEFR Gramer Akademisi (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[2])}
            className="md:col-span-4 bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-indigo-400 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="relative w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 p-2 group-hover:scale-110 transition-transform shadow-xs">
                  <Image
                    src={PILLARS[2].iconImg}
                    alt={PILLARS[2].title}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="font-mono text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  A1 – C2
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {PILLARS[2].title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Formül şemaları, görsel zihin haritaları ve pekiştirme testleri.
                </p>
              </div>

              {/* Real Screenshot Preview */}
              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame
                    src="/images/app-screens/roadmap.png"
                    alt="TalkStage Ada Seviye Haritası"
                    width={130}
                    rotate=""
                    glow={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-indigo-600 pt-3 border-t border-slate-100 relative z-10">
              <span>Müfredatı Aç</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: 📦 SM-2 Kelime Sandığı (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[3])}
            className="md:col-span-4 bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-amber-400 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="relative w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 p-2 group-hover:scale-110 transition-transform shadow-xs">
                  <Image
                    src={PILLARS[3].iconImg}
                    alt={PILLARS[3].title}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="font-mono text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  SM-2
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                  {PILLARS[3].title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Bilimsel aralıklı tekrar algoritması; kelimeyi tam unutmak üzereyken hatırlatır.
                </p>
              </div>

              {/* Real Screenshot Preview */}
              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame
                    src="/images/app-screens/vocab-practice.png"
                    alt="TalkStage SM-2 Kelime Pratiği"
                    width={130}
                    rotate=""
                    glow={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-amber-700 pt-3 border-t border-slate-100 relative z-10">
              <span>Sandık Algoritması</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: 🎧 Çift Dilli Podcast İstasyonu (4 Cols) */}
          <div
            onClick={() => setSelectedPillar(PILLARS[4])}
            className="md:col-span-4 bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-cyan-400 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl shadow-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
          >
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="relative w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 p-2 group-hover:scale-110 transition-transform shadow-xs">
                  <Image
                    src={PILLARS[4].iconImg}
                    alt={PILLARS[4].title}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <span className="font-mono text-[10px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 px-2.5 py-0.5 rounded-full">
                  Podcast
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {PILLARS[4].title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Senkronize transkript takibiyle dinleme ve anlama reflekslerinizi geliştirin.
                </p>
              </div>

              {/* Real Screenshot Preview */}
              <div className="flex justify-center pt-2">
                <div className="transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500">
                  <PhoneFrame
                    src="/images/app-screens/podcasts.png"
                    alt="TalkStage Podcast İstasyonu"
                    width={130}
                    rotate=""
                    glow={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-cyan-700 pt-3 border-t border-slate-100 relative z-10">
              <span>Bölüm Çalarını Gör</span>
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
          <div className="bg-white border border-line text-heading w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-porcelain text-muted hover:text-heading transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-indigo/8 border border-indigo/15 p-2 shrink-0">
                <Image
                  src={selectedPillar.iconImg}
                  alt={selectedPillar.title}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-indigo uppercase tracking-wider">
                  {selectedPillar.stat}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-heading">
                  {selectedPillar.details.heading}
                </h3>
              </div>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-body leading-relaxed font-medium">
              {selectedPillar.details.summary}
            </p>

            {/* Feature List */}
            <div className="space-y-2.5 bg-porcelain p-4 rounded-2xl border border-line">
              <div className="text-xs font-bold text-heading mb-1">Öne Çıkan Yetkinlikler:</div>
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
                className="px-4 py-2.5 rounded-xl bg-porcelain hover:bg-line/60 text-body font-bold text-xs transition-all cursor-pointer"
              >
                Kapat
              </button>

              <Link
                href={selectedPillar.details.linkHref}
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo to-indigo-dark hover:shadow-[0_10px_24px_-6px_rgba(227,167,63,0.5)] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
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
