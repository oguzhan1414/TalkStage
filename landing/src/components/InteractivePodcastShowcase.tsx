'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Headphones,
  Play,
  Volume2,
  Sparkles,
  ArrowRight,
  Radio,
  Clock,
} from 'lucide-react';
import { speakEnglish } from '@/lib/audio';

const DEMO_EPISODES = [
  {
    id: 'ep_1',
    title: 'The Morning Cafe & Coffee Order',
    level: 'A1 Başlangıç',
    duration: '1:24 dk',
    coverImg: '/images/10_bento_coffee_chat.jpg',
    desc: 'Londra kafesinde yulaf sütlü latte siparişi, fiyat sorma ve Wi-Fi şifresi alma.',
    dialogue: [
      {
        speaker: 'Liam (Barista)',
        avatar: '/images/58_avatar_male_developer.png',
        en: 'Good morning! What can I get started for you today?',
        tr: 'Günaydın! Bugün sizin için ne hazırlayabilirim?',
      },
      {
        speaker: 'Emma (Customer)',
        avatar: '/images/59_avatar_female_tech_lead.png',
        en: 'Hi! Could I please have a large oat latte and a warm croissant?',
        tr: 'Merhaba! Büyük boy yulaf sütlü latte ve ılık bir kruvasan alabilir miyim?',
      },
      {
        speaker: 'Liam (Barista)',
        avatar: '/images/58_avatar_male_developer.png',
        en: 'Sure thing! That will be £6.50. Would you like to pay with card?',
        tr: 'Tabii ki! Toplam 6.50 Sterlin. Kartla mı ödemek istersiniz?',
      },
      {
        speaker: 'Emma (Customer)',
        avatar: '/images/59_avatar_female_tech_lead.png',
        en: 'Yes, contactless please. Also, what is the Wi-Fi password?',
        tr: 'Evet, temassız lütfen. Bir de Wi-Fi şifresi nedir acaba?',
      },
    ],
    vocab: ['oat milk (yulaf sütü)', 'contactless (temassız)', 'warm up (ısıtmak)'],
  },
  {
    id: 'ep_2',
    title: 'Sprint Retrospective & Bottlenecks',
    level: 'B2 İyi Düzey',
    duration: '2:15 dk',
    coverImg: '/images/05_bento_tech_standup.jpg',
    desc: 'Teknoloji ekibinde sprint retrospektifi, darboğazlar ve CI/CD gecikmeleri.',
    dialogue: [
      {
        speaker: 'Tech Lead (Sarah)',
        avatar: '/images/59_avatar_female_tech_lead.png',
        en: 'Let’s review the sprint. The main blocker was integration testing.',
        tr: 'Sprinti inceleyelim. En büyük engel entegrasyon testleriydi.',
      },
      {
        speaker: 'Developer (Alex)',
        avatar: '/images/58_avatar_male_developer.png',
        en: 'We should parallelize the build pipeline to cut deployment latency.',
        tr: 'Dağıtım gecikmesini azaltmak için derleme hattını paralelleştirmeliyiz.',
      },
    ],
    vocab: ['blocker (engelleyici)', 'pipeline (süreç hattı)', 'parallelize (paralelleştirmek)'],
  },
];

export default function InteractivePodcastShowcase() {
  const [activeEpId, setActiveEpId] = useState('ep_1');
  const [activeLineIndex, setActiveLineIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const episode = DEMO_EPISODES.find((e) => e.id === activeEpId) || DEMO_EPISODES[0];

  const handlePlayLine = (index: number, text: string) => {
    setActiveLineIndex(index);
    setIsPlaying(true);
    speakEnglish(text);
    setTimeout(() => setIsPlaying(false), 3200);
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#FAF8FC] text-slate-900 border-b border-purple-100/80">
      {/* 3D Warm Lavender Ambient Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-75"
      >
        <Image
          src="/images/bg_podcast_warm_lavender.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8FC]/85 via-transparent to-[#FAF8FC]/95" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-xs font-bold text-purple-900 shadow-xs backdrop-blur-md">
            <Radio className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>Her Yerden Dinlenebilir Podcast İstasyonu</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Metroda, Yürüyüşte, Sporda:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600">
              Çift Dilli Senkronize Dinleme
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Kulaklığınızı takın ve ana dili İngilizce olan konuşmacıların doğal diyaloglarını dinleyin. Ekranda senkronize akan Türkçe transkriptle hiçbir kelimeyi kaçırmayın.
          </p>
        </div>

        {/* Grand Light Studio Player Container */}
        <div className="bg-white/95 border-2 border-purple-200/80 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/5 backdrop-blur-xl">
          {/* Top Artwork & Control Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 border-b border-purple-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-300 shrink-0 shadow-md">
                <Image
                  src={episode.coverImg}
                  alt={episode.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full">
                    {episode.level}
                  </span>
                  <span className="text-xs text-slate-500">• {episode.duration}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {episode.title}
                </h3>
                <p className="text-xs text-slate-600 max-w-md">{episode.desc}</p>
              </div>
            </div>

            {/* Episode Switchers */}
            <div className="flex items-center gap-2 shrink-0">
              {DEMO_EPISODES.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    setActiveEpId(ep.id);
                    setActiveLineIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeEpId === ep.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {ep.level}
                </button>
              ))}
            </div>
          </div>

          {/* Synchronized Transcript Player Body */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>🎧 Senkronize Transkript (Satıra Tıkla & Dinle):</span>
              <span className="text-purple-700 font-bold">Canlı Ses Senkronizasyonu</span>
            </div>

            {/* Dialogue Turns */}
            <div className="space-y-3">
              {episode.dialogue.map((turn, i) => {
                const isActive = activeLineIndex === i;
                return (
                  <div
                    key={i}
                    onClick={() => handlePlayLine(i, turn.en)}
                    className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-purple-50/90 border-2 border-purple-400 shadow-sm'
                        : 'bg-slate-50/70 hover:bg-white border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-purple-200 mt-0.5">
                        <Image
                          src={turn.avatar}
                          alt={turn.speaker}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isActive ? 'text-purple-900' : 'text-slate-700'}`}>
                            {turn.speaker}
                          </span>
                          {isActive && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-purple-700 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                              Oynatılıyor
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 leading-snug">{turn.en}</div>
                        <div className="text-xs text-slate-500 italic">🇹🇷 {turn.tr}</div>
                      </div>
                    </div>

                    <button
                      className={`p-2.5 rounded-xl border shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-white text-slate-400 hover:text-purple-600 border-slate-200'
                      }`}
                      title="Bu Cümleyi Dinle"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Key Vocab Pills Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-600">📌 Kilit Terimler:</span>
                {episode.vocab.map((v, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] font-bold bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1 rounded-lg"
                  >
                    {v}
                  </span>
                ))}
              </div>

              <Link
                href="/app/podcasts"
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 underline"
              >
                <span>Tüm Podcast Bölümlerini Aç ➔</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
