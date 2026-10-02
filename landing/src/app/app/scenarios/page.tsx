'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Search, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { SCENARIOS, type ScenarioCategory, type ScenarioEntry } from '@talkstage/shared-data/scenariosData';
import { getStudyStats } from '@/lib/storage';
import { InteractiveVideoScenario } from '@/components/InteractiveVideoScenario';

const CATEGORIES: { id: ScenarioCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tüm Senaryolar', icon: '✨' },
  { id: 'interview', label: 'İş Mülakatları', icon: '💼' },
  { id: 'business', label: 'İş Dünyası & B2B', icon: '📊' },
  { id: 'daily', label: 'Günlük Hayat', icon: '☕' },
  { id: 'travel', label: 'Seyahat & Uçuş', icon: '✈️' },
];

// Real photo thumbnails per category (same batch the marketing Bento grid
// uses) instead of a flat-color emoji square.
const CATEGORY_IMAGES: Record<ScenarioCategory, string> = {
  interview: '/images/stages/job-interview.jpg',
  business: '/images/stages/b2b-sales.jpg',
  daily: '/images/stages/coffee-chat.jpg',
  travel: '/images/stages/airport.jpg',
  tech: '/images/stages/tech-standup.jpg',
};

export default function ScenariosCatalogPage() {
  const [selectedCat, setSelectedCat] = useState<ScenarioCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [activeVideoScenario, setActiveVideoScenario] = useState<ScenarioEntry | null>(null);
  const stats = getStudyStats();

  const filtered = SCENARIOS.filter((s) => {
    const matchesCat = selectedCat === 'all' || s.category === selectedCat;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleTr.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cafeMeetupScenario = SCENARIOS.find((s) => s.id === 'cafe-meetup');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Senaryo Stüdyosu 🎙️
            </h1>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
              Canlı AI Koçluk
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gerçek dünya durumlarında yapay zeka ile rol yapın; her cümlenizde anlık gramer, akıcılık ve kelime geribildirimi alın.
          </p>
        </div>
      </div>

      {/* 3D Interactive Feature Spotlight Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 md:p-7 shadow-xl text-white">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>YENİ NESİL 3D ETKİLEŞİMLİ DİYALOG</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Yankı ile Kafede Buluşma & Sipariş ☕
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Pixar 3D tarzı 6 adımlı canlı video sahneleriyle pratik yap. Yankı&apos;nın söylediklerini dinle, mikrofona konuş ve anlık ses tanıma ile akıcılığını geliştir!
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <span>✓</span> 6 Video Sahnesi
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-indigo-300">
                <span>✓</span> Canlı Ses Tanıma
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                <span>✓</span> +60 XP
              </span>
            </div>
          </div>

          <div className="flex items-center">
            {cafeMeetupScenario && (
              <button
                onClick={() => setActiveVideoScenario(cafeMeetupScenario)}
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🎬 3D Canlı Sahneyi Başlat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === c.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Senaryo veya rol ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-xs outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => {
          const isCompleted = stats.completedScenarios.includes(s.id);

          return (
            <div
              key={s.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:border-indigo-300 hover:shadow-xl transition-all group flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Top Badge & Level */}
                <div className="flex items-center justify-between">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-indigo-100 group-hover:scale-105 transition-transform">
                    <Image
                      src={CATEGORY_IMAGES[s.category]}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-0 right-0 text-xs bg-white/90 rounded-tl-lg px-1 leading-tight">
                      {s.emoji}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.videoSteps && s.videoSteps.length > 0 && (
                      <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>🎬</span>
                        <span>3D Sahne</span>
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {s.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{s.durationMin} dk</span>
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {s.title}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{s.titleTr}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>

                {/* AI Partner Role */}
                <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-200/60 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Partner:</span>{' '}
                    <span className="font-semibold text-slate-800">{s.aiName}</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 font-medium">{s.aiRole}</span>
                </div>

                {/* Learning Objectives Preview Box */}
                {s.objectives.length > 0 && (
                  <div className="bg-slate-50/60 rounded-xl p-3 border border-slate-200/60 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      🎯 Kazanılacak Beceriler:
                    </div>
                    {s.objectives.slice(0, 2).map((obj) => (
                      <div key={obj.id} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                        <span className="text-indigo-500 font-bold">✓</span>
                        <span className="line-clamp-1">{obj.textTr}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Vocabulary Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {s.suggestedVocab.slice(0, 3).map((v) => (
                    <span
                      key={v.term}
                      className="text-[11px] font-medium bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded text-indigo-800"
                    >
                      + {v.term} ({v.tr})
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tamamlandı</span>
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">3 Hedef Görev</span>
                )}

                {s.videoSteps && s.videoSteps.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveVideoScenario(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <span>🎬 3D Oyna</span>
                    </button>
                    <Link
                      href={`/app/scenarios/${s.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold text-xs border border-slate-200 transition-all"
                    >
                      <span>Stüdyo</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/app/scenarios/${s.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all transform group-hover:translate-x-0.5"
                  >
                    <span>Stüdyoya Başla</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Interactive Video Player Modal */}
      {activeVideoScenario && (
        <InteractiveVideoScenario
          scenario={activeVideoScenario}
          onClose={() => setActiveVideoScenario(null)}
        />
      )}
    </div>
  );
}
