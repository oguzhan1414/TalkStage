'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trash2,
  Loader2,
  CheckCircle2,
  Sparkles,
  Zap,
  Volume2,
  BookOpen,
  X,
  Mic,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { GrammarMistakeOut } from '@/types/api';
import { speakEnglish } from '@/lib/audio';

type SourceFilter = 'ALL' | 'mini_quiz' | 'text_chat' | 'voice_session' | 'sentence_order';

function sourceLabel(source: string | null | undefined): string {
  if (source === 'mini_quiz') return '✍️ Mini Quiz';
  if (source === 'text_chat') return '💬 AI Sohbet';
  if (source === 'voice_session') return '🎙️ Canlı Konuşma';
  if (source === 'sentence_order') return '📖 Cümle Sıralama';
  return '📝 Alıştırma';
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<GrammarMistakeOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<SourceFilter>('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active recall quiz modal state
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeQuizItem, setActiveQuizItem] = useState<GrammarMistakeOut | null>(null);
  const [quizSelectedChoice, setQuizSelectedChoice] = useState<'wrong' | 'right' | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    api
      .get<GrammarMistakeOut[]>('/progress/mistakes')
      .then(setMistakes)
      .catch(() => setMistakes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.delete(`/progress/mistakes/${id}`);
      setMistakes((prev) => prev.filter((m) => m.id !== id));
      showToast('🎉 Harika! Kuralı pekiştirdin ve defterden temizlendi.');
      if (activeQuizItem?.id === id) {
        setQuizModalOpen(false);
        setActiveQuizItem(null);
      }
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Silinemedi');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMistakes = useMemo(() => {
    if (selectedFilter === 'ALL') return mistakes;
    return mistakes.filter((m) => m.source === selectedFilter);
  }, [mistakes, selectedFilter]);

  // Topic summary
  const topicSummary = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of mistakes) {
      if (m.topic_code) {
        counts.set(m.topic_code, (counts.get(m.topic_code) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [mistakes]);

  const quizCount = mistakes.filter((m) => m.source === 'mini_quiz').length;
  const chatCount = mistakes.filter((m) => m.source === 'text_chat').length;
  const voiceCount = mistakes.filter((m) => m.source === 'voice_session').length;
  const readingCount = mistakes.filter((m) => m.source === 'sentence_order').length;

  const startQuizForMistake = (item: GrammarMistakeOut) => {
    setActiveQuizItem(item);
    setQuizSelectedChoice(null);
    setQuizFeedback(null);
    setQuizModalOpen(true);
  };

  const startGeneralQuiz = () => {
    if (mistakes.length === 0) return;
    const randomItem = mistakes[Math.floor(Math.random() * mistakes.length)];
    startQuizForMistake(randomItem);
  };

  const isCorrectChoiceFirst = useMemo(() => {
    if (!activeQuizItem) return true;
    return activeQuizItem.id.charCodeAt(0) % 2 === 0;
  }, [activeQuizItem]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER BANNER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kişisel Zayıf Noktalar & Düzeltmeler</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hata & Gelişim Laboratuvarı 📓
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Canlı konuşmalarda ve testlerde takıldığın cümleler burada toplanır. Kuralları incele, kendini sına ve zayıf noktalarını kalıcı reflekse dönüştür!
          </p>

          {/* Micro Stats Row */}
          <div className="flex items-center gap-3 pt-1">
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <span className="block font-black text-sm text-slate-900">{mistakes.length}</span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">Bekleyen</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-center">
              <span className="block font-black text-sm text-slate-900">{topicSummary.length}</span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">Kural Konusu</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
              <span className="block font-black text-sm text-emerald-700">%100</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">Özel Analiz</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {mistakes.length > 0 && (
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={startGeneralQuiz}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Hızlı Pekiştirme Sınavı (+25 XP)</span>
            </button>
            <span className="text-[11px] text-slate-400">Hatalarından rastgele aktif sınav oluşturur</span>
          </div>
        )}
      </div>

      {/* 2. FREQUENT TOPIC CHIPS */}
      {topicSummary.length > 0 && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>🎯</span>
              <span>En Çok Tekrarlanan Kurallar</span>
            </span>
            <span className="text-slate-400 text-[11px]">Dersi inceleyerek konuyu pekiştirin</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {topicSummary.map(([code, count]) => (
              <Link
                key={code}
                href="/app/grammar"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-xs transition-all group"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-bold text-slate-800 group-hover:text-indigo-600">{code}</span>
                <span className="text-[10px] font-mono font-bold bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                  {count}x Hata
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'ALL', label: `Tümü (${mistakes.length})` },
          { id: 'voice_session', label: `🎙️ Canlı Konuşma (${voiceCount})` },
          { id: 'text_chat', label: `💬 AI Sohbet (${chatCount})` },
          { id: 'mini_quiz', label: `✍️ Mini Quiz (${quizCount})` },
          { id: 'sentence_order', label: `📖 Okuma (${readingCount})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id as SourceFilter)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedFilter === f.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 4. MISTAKES LIST */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 flex items-center justify-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
          <span>Hata Defteri yükleniyor...</span>
        </div>
      ) : filteredMistakes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Hata Defterin Tertemiz! 🎯</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Tebrikler! Bu kategoride bekleyen hiçbir gramer hatan bulunmuyor. Yeni bir canlı AI sahnesine katılarak pratik yapabilirsin.
          </p>
          <Link
            href="/app/scenarios"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>Yeni Bir Sahneye Başla ➔</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMistakes.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 relative group"
            >
              <div className="space-y-3">
                {/* Top Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {sourceLabel(item.source)}
                    </span>
                    {item.topic_code && (
                      <Link
                        href="/app/grammar"
                        className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200 transition-colors"
                      >
                        {item.topic_code} ➔
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakEnglish(item.corrected_text)}
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Doğrusunu Dinle"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-colors cursor-pointer"
                      title="Defterden Temizle"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Öğrendim</span>
                    </button>
                  </div>
                </div>

                {/* Wrong sentence box */}
                <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3 space-y-1">
                  <div className="text-[10px] font-mono font-bold text-red-700 flex items-center gap-1">
                    <span>❌</span>
                    <span>HATALI İFADE:</span>
                  </div>
                  <p className="text-xs text-red-900 font-medium line-through decoration-red-400">
                    &ldquo;{item.wrong_text}&rdquo;
                  </p>
                </div>

                {/* Correct sentence box */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 space-y-1">
                  <div className="text-[10px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                    <span>✨</span>
                    <span>DOĞRU KULLANIM:</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-bold">
                    &ldquo;{item.corrected_text}&rdquo;
                  </p>
                </div>

                {/* Turkish explanation note */}
                {item.explanation_tr && (
                  <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-amber-800 flex items-center gap-1">
                      <span>💡</span>
                      <span>KURAL VE AÇIKLAMA:</span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {item.explanation_tr}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Quick Test Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => startQuizForMistake(item)}
                  className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                  <span>Kendini Sına 🎯</span>
                </button>

                <span className="text-[11px] text-slate-400">{formatDate(item.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. ACTIVE RECALL PRACTICE QUIZ MODAL                         */}
      {/* ============================================================ */}
      {activeQuizItem && quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 fill-indigo-600 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Hata Pekiştirme Sınavı</h3>
              </div>
              <button
                onClick={() => setQuizModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Aşağıdaki seçeneklerden hangisi dilbilgisi kurallarına uygundur?
            </p>

            <div className="space-y-2.5">
              {isCorrectChoiceFirst ? (
                <>
                  <button
                    onClick={() => {
                      setQuizSelectedChoice('right');
                      setQuizFeedback('correct');
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      quizSelectedChoice === 'right'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span>{activeQuizItem.corrected_text}</span>
                    {quizSelectedChoice === 'right' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setQuizSelectedChoice('wrong');
                      setQuizFeedback('wrong');
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      quizSelectedChoice === 'wrong'
                        ? 'bg-red-50 border-red-500 text-red-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span>{activeQuizItem.wrong_text}</span>
                    {quizSelectedChoice === 'wrong' && (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setQuizSelectedChoice('wrong');
                      setQuizFeedback('wrong');
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      quizSelectedChoice === 'wrong'
                        ? 'bg-red-50 border-red-500 text-red-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span>{activeQuizItem.wrong_text}</span>
                    {quizSelectedChoice === 'wrong' && (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setQuizSelectedChoice('right');
                      setQuizFeedback('correct');
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      quizSelectedChoice === 'right'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span>{activeQuizItem.corrected_text}</span>
                    {quizSelectedChoice === 'right' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Feedback Alert */}
            {quizFeedback === 'correct' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                <div className="font-bold text-emerald-800">🎉 Mükemmel! Doğru Seçim.</div>
                <div className="text-emerald-950">{activeQuizItem.explanation_tr}</div>
              </div>
            )}

            {quizFeedback === 'wrong' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs space-y-1">
                <div className="font-bold text-red-800">❌ Yanlış Seçenek</div>
                <div className="text-red-950">{activeQuizItem.explanation_tr}</div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Kapat
              </button>

              {quizFeedback === 'correct' && (
                <button
                  type="button"
                  onClick={() => handleDelete(activeQuizItem.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pekiştirdim, Defterden Temizle</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
