'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookMarked,
  Volume2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Check,
  Flame,
  Zap,
  Layers,
} from 'lucide-react';
import { speakEnglish } from '@/lib/audio';
import PhoneFrame from './PhoneFrame';

const VOCAB_SETS = [
  {
    categoryTitle: '1. İsim Paketi (1-100 Nouns)',
    categoryDesc: 'En sık kullanılan 300 çekirdek isimden başlangıç seti.',
    card: {
      term: 'Scalability',
      phonetic: '[ ˈskeɪ.lə.bɪl.ə.ti ]',
      pos: 'İsim (Noun)',
      meaningTr: 'Ölçeklenebilirlik / Büyüyebilme Kapasitesi',
      exampleEn: 'The system architecture was designed for horizontal scalability under peak load.',
      exampleTr: 'Sistem mimarisi, zirve yük altında yatay ölçeklenebilirlik için tasarlandı.',
      conjugation: {
        v1: 'Scale (Ölçek)',
        v2: 'Scaled (Ölçeklendi)',
        v3: 'Scaled (Ölçeklenmiş)',
        ving: 'Scaling (Ölçekleme)',
      },
      tag: 'FAANG & Sistem Tasarımı',
      intervalDays: 3,
    },
  },
  {
    categoryTitle: '1. Fiil Paketi (1-100 Verbs)',
    categoryDesc: 'İş ve günlük hayatta en kritik 300 çekirdek fiil.',
    card: {
      term: 'Accomplish',
      phonetic: '[ əˈkʌm.plɪʃ ]',
      pos: 'Fiil (Verb)',
      meaningTr: 'Başarmak / Sonuçlandırmak / Tamamlamak',
      exampleEn: 'We accomplished all quarterly product milestones ahead of schedule.',
      exampleTr: 'Tüm çeyrek ürün hedeflerini takvimden önce başarıyla tamamladık.',
      conjugation: {
        v1: 'Accomplish (Başar)',
        v2: 'Accomplished (Başardı)',
        v3: 'Accomplished (Başarmış)',
        ving: 'Accomplishing (Başarma)',
      },
      tag: 'Kariyer & Mülakat',
      intervalDays: 5,
    },
  },
  {
    categoryTitle: '1. Sıfat Paketi (1-100 Adjectives)',
    categoryDesc: 'Akıcı ve zengin anlatım için 300 çekirdek sıfat.',
    card: {
      term: 'Seamless',
      phonetic: '[ ˈsiːm.ləs ]',
      pos: 'Sıfat (Adjective)',
      meaningTr: 'Kusursuz / Kesintisiz / Pürüzsüz',
      exampleEn: 'The mobile app provides a seamless user onboarding experience.',
      exampleTr: 'Mobil uygulama, yeni kullanıcılar için pürüzsüz bir başlangıç deneyimi sunar.',
      conjugation: {
        v1: 'Seamless (Pürüzsüz)',
        v2: 'Seamlessly (Kusursuzca)',
        v3: 'Seamlessness (Pürüzsüzlük)',
        ving: 'Superlative: Most Seamless',
      },
      tag: 'Ürün & UX Tasarımı',
      intervalDays: 7,
    },
  },
];

export default function InteractiveVocabShowcase() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const activeSet = VOCAB_SETS[activeSetIndex];
  const card = activeSet.card;

  const handleGrade = (grade: string) => {
    setSelectedGrade(grade);
    setTimeout(() => {
      setSelectedGrade(null);
      setIsFlipped(false);
      setActiveSetIndex((prev) => (prev + 1) % VOCAB_SETS.length);
    }, 500);
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#FAFDFE] text-slate-900 border-b border-cyan-100/80">
      {/* 3D Sunlit Cream/Cyan Ambient Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-75"
      >
        <Image
          src="/images/bg_vocab_sunlit_cream.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFDFE]/85 via-transparent to-[#FAFDFE]/95" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/80 border border-cyan-200 text-xs font-bold text-cyan-900 shadow-xs backdrop-blur-md">
            <div className="relative w-4 h-4">
              <Image
                src="/images/24_card_vocab_deck.png"
                alt="Vocab Deck"
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
            <span>900 Çekirdek Kelime & SM-2 Aralıklı Tekrar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Unutma Eğrisini Kıran{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-indigo-700">
              Akıllı Kelime Sandığı
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Rastgele kelime ezberi yok. En sık kullanılan 900 İsim, Fiil ve Sıfatı; telaffuzları, 4 zamanlı çekimleri ve SuperMemo-2 aralıklı tekrar algoritmasıyla kalıcı hafızaya kazıyın.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Set Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Frekans Paketini Seç:
            </div>

            <div className="space-y-3">
              {VOCAB_SETS.map((set, idx) => {
                const isActive = activeSetIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveSetIndex(idx);
                      setIsFlipped(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 backdrop-blur-md ${
                      isActive
                        ? 'bg-white border-2 border-cyan-500 shadow-xl shadow-cyan-600/10'
                        : 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${isActive ? 'text-cyan-800 font-extrabold' : 'text-slate-900'}`}>
                        {set.categoryTitle}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{set.categoryDesc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/app/library"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:text-cyan-800 underline"
              >
                <span>900 Kelime Kütüphanesini Stüdyoda Aç ➔</span>
              </Link>
            </div>

            {/* Upgraded & Enlarged Mobile App Companion Showcase */}
            <div className="rounded-3xl border-2 border-cyan-100 bg-white/95 p-5 shadow-xl shadow-cyan-900/5 space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Mobilde de Aynı Sandık</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200">
                  Canlı Senkron
                </span>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <div className="shrink-0 transition-transform duration-500 hover:scale-105">
                  <PhoneFrame
                    src="/images/app-screens/vocab-practice.png"
                    alt="TalkStage mobil uygulama Kelime Sandığı SM-2 kart ekranı"
                    width={160}
                    rotate="-rotate-2"
                    glow
                  />
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900 leading-snug">
                    Webde çalıştığın tüm kelimeler mobilde SM-2 döngüsüne girer.
                  </p>
                  <ul className="space-y-1.5 text-[11px]">
                    <li className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>Sağa/sola kaydırarak puanla</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>1, 3 ve 7 gün sonra akıllı tekrar</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>IPA telaffuz seslendirmesi</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End 3D Flashcard Simulator (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>🃏 Canlı Flashcard (Sayfada Dokun & Çevir):</span>
              <span className="text-cyan-700 font-bold">{activeSetIndex + 1} / {VOCAB_SETS.length} Paket</span>
            </div>

            {/* 3D Glass Flashcard Container */}
            <div
              onClick={() => setIsFlipped((f) => !f)}
              className="bg-white/95 border-2 border-cyan-200/80 hover:border-cyan-500 rounded-3xl p-7 sm:p-8 min-h-[340px] flex flex-col justify-between items-center text-center cursor-pointer transition-all shadow-2xl shadow-cyan-950/5 relative select-none backdrop-blur-xl group overflow-hidden"
            >
              {/* Top Meta Tag */}
              <div className="flex items-center justify-between w-full text-xs text-slate-500">
                <span className="font-mono font-bold bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full text-cyan-800">
                  {card.pos}
                </span>
                <span className="text-slate-600 font-semibold">{card.tag}</span>
              </div>

              {!isFlipped ? (
                /* Front Side */
                <div className="space-y-4 my-auto">
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    {card.term}
                  </h3>
                  <div className="font-mono text-sm text-cyan-700 font-bold tracking-wide">
                    {card.phonetic}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold shadow-xs border border-cyan-200">
                    <span>Anlamı & Çekimleri Görmek İçin Tıkla 🔄</span>
                  </div>
                </div>
              ) : (
                /* Back Side */
                <div className="space-y-4 my-auto w-full max-w-lg animate-in fade-in">
                  {/* Meaning */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                    <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                      🇹🇷 TÜRKÇE ANLAMI:
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-emerald-950 mt-1">
                      {card.meaningTr}
                    </div>
                  </div>

                  {/* 4-Tense Conjugation Table */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-left space-y-1.5">
                    <div className="text-[10px] font-mono font-bold text-cyan-800 uppercase">
                      4 Zamanlı Çekim Tablosu:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 font-medium">
                      <div>• V1: {card.conjugation.v1}</div>
                      <div>• V2: {card.conjugation.v2}</div>
                      <div>• V3: {card.conjugation.v3}</div>
                      <div>• V-ing: {card.conjugation.ving}</div>
                    </div>
                  </div>

                  {/* Example Sentence */}
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3 text-xs text-left space-y-1">
                    <div className="text-[10px] font-mono font-bold text-indigo-700 uppercase">
                      Örnek Cümle:
                    </div>
                    <div className="font-semibold text-slate-900">&ldquo;{card.exampleEn}&rdquo;</div>
                    <div className="text-[11px] text-slate-500 italic">🇹🇷 {card.exampleTr}</div>
                  </div>
                </div>
              )}

              {/* Bottom Bar: Sound & Prompt */}
              <div className="flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs text-slate-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakEnglish(card.term);
                  }}
                  className="hover:text-cyan-700 flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-cyan-600" />
                  <span>Telaffuzu Dinle</span>
                </button>
                <span>Kartı Döndürmek İçin Dokun</span>
              </div>
            </div>

            {/* SM-2 Interval Buttons (1 Gün / 3 Gün / 7 Gün) */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleGrade('again')}
                className={`p-3.5 rounded-2xl border-2 font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedGrade === 'again'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                }`}
              >
                <span className="text-xs">Tekrar (↺)</span>
                <span className="text-[10px] opacity-80 mt-0.5">1 gün sonra hatırlat</span>
              </button>

              <button
                onClick={() => handleGrade('good')}
                className={`p-3.5 rounded-2xl border-2 font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedGrade === 'good'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
              >
                <span className="text-xs">İyi (👍)</span>
                <span className="text-[10px] opacity-80 mt-0.5">3 gün sonra hatırlat</span>
              </button>

              <button
                onClick={() => handleGrade('easy')}
                className={`p-3.5 rounded-2xl border-2 font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedGrade === 'easy'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}
              >
                <span className="text-xs">Kolay (⚡)</span>
                <span className="text-[10px] opacity-80 mt-0.5">7+ gün sonra hatırlat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
