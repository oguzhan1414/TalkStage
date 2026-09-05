'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Search, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { SCENARIOS, type ScenarioCategory } from '@/data/scenariosData';
import { getStudyStats } from '@/lib/storage';

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
  const stats = getStudyStats();

  const filtered = SCENARIOS.filter((s) => {
    const matchesCat = selectedCat === 'all' || s.category === selectedCat;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleTr.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

                <Link
                  href={`/app/scenarios/${s.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all transform group-hover:translate-x-0.5"
                >
                  <span>Stüdyoya Başla</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
