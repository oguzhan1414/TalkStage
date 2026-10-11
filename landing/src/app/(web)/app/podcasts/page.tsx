'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Headphones,
  Play,
  Pause,
  Volume2,
  Plus,
  Sparkles,
  Clock,
  User,
  BookOpen,
} from 'lucide-react';
import { PODCASTS, type PodcastEpisode } from '@/data/podcastsData';
import { speakEnglish, stopSpeaking } from '@/lib/audio';
import { saveVocabCard } from '@/lib/storage';
import { ApiError } from '@/lib/api';

export default function PodcastsPage() {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCASTS[0]);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePlayLine = async (lineId: string, text: string) => {
    setPlayingLineId(lineId);
    await speakEnglish(text);
    setPlayingLineId(null);
  };

  const handleSaveVocab = async (term: string, tr: string) => {
    try {
      await saveVocabCard({
        term,
        translation: tr,
        sourceLabel: activeEpisode.title,
      });
      setToastMessage(`“${term}” Kelime Sandığına eklendi 📚`);
    } catch (err) {
      setToastMessage(err instanceof ApiError ? err.message : 'Kelime eklenemedi');
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80">
        <Image
          src="/images/bg_podcast_warm_lavender.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40" />
        <div className="relative p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Podcast & Dinleme İstasyonu 🎧
            </h1>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
              Çift Dilli Transkript
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Anadil düzeyinde hazırlanmış çift dilli podcast bölümlerini dinleyin; transkriptten dilediğiniz cümleye dokunarak tekrar edin.
          </p>
        </div>
      </div>

      {/* Main Studio (Left: Episodes List, Right: Synchronized Player & Transcript) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Episodes List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider px-1">
            Podcast Bölümleri
          </div>

          {PODCASTS.map((ep) => {
            const isActive = activeEpisode.id === ep.id;
            return (
              <div
                key={ep.id}
                onClick={() => {
                  stopSpeaking();
                  setPlayingLineId(null);
                  setActiveEpisode(ep);
                }}
                className={`p-4.5 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border-indigo-600'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ep.coverEmoji}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {ep.level}
                    </span>
                  </div>
                  <span className={`text-xs flex items-center gap-1 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{ep.durationMin} dk</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm leading-snug">{ep.title}</h3>
                  <p className={`text-xs ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {ep.titleTr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 8 Cols: Transcript Player Studio */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Episode Info Banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                {activeEpisode.badge} • {activeEpisode.level}
              </span>
              <span className="text-xs text-slate-300 font-medium">Sunucu: {activeEpisode.host}</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{activeEpisode.title}</h2>
              <p className="text-xs text-slate-300 mt-1">{activeEpisode.description}</p>
            </div>
          </div>

          {/* Interactive Synchronized Transcript Lines */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium border-b border-slate-100 pb-2">
              <span>İnteraktif Transkript (Dinlemek için cümleye dokun)</span>
              <span>{activeEpisode.transcript.length} Paragraf</span>
            </div>

            <div className="space-y-3">
              {activeEpisode.transcript.map((line) => {
                const isPlaying = playingLineId === line.id;

                return (
                  <div
                    key={line.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isPlaying
                        ? 'bg-indigo-50 border-indigo-300 shadow-xs'
                        : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                          {line.speaker[0]}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{line.speaker}</span>
                      </div>

                      <button
                        onClick={() => handlePlayLine(line.id, line.en)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          isPlaying
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-200 hover:border-indigo-300 text-indigo-600'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlaying ? 'Çalıyor...' : 'Dinle'}</span>
                      </button>
                    </div>

                    <div className="text-sm font-medium text-slate-900 leading-relaxed">
                      {line.en}
                    </div>

                    <div className="text-xs text-slate-500 italic border-t border-slate-200/50 pt-1.5">
                      🇹🇷 {line.tr}
                    </div>

                    {line.keyVocab && line.keyVocab.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          Kelimeler:
                        </span>
                        {line.keyVocab.map((v) => (
                          <button
                            key={v.word}
                            onClick={() => handleSaveVocab(v.word, v.tr)}
                            className="inline-flex items-center gap-1 bg-white hover:bg-indigo-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 hover:text-indigo-600 text-[11px] font-medium transition-colors"
                            title="Sandığıma Ekle"
                          >
                            <span>{v.word}</span>
                            <span className="text-slate-400 text-[10px]">({v.tr})</span>
                            <Plus className="w-3 h-3 text-indigo-600 ml-0.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
