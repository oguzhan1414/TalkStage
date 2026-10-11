'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Volume2, Plus, Check, EyeOff, Archive, ArrowRight } from 'lucide-react';
import {
  ADJECTIVES_100,
  ADJECTIVES_200,
  ADJECTIVES_300,
  NOUNS_100,
  NOUNS_200,
  NOUNS_300,
  VERBS_100,
  VERBS_200,
  VERBS_300,
  type LibraryWordEntry,
} from '@talkstage/shared-data/vocabLibrary';
import { speakEnglish } from '@/lib/audio';
import { getSavedVocabCards, saveVocabCard, type SavedVocabCard } from '@/lib/storage';
import { api, ApiError } from '@/lib/api';

type CategoryKey = 'nouns' | 'verbs' | 'adjectives';

const PACKS: Record<
  CategoryKey,
  {
    id: CategoryKey;
    label: string;
    icon: string;
    sets: { id: string; name: string; range: string; words: LibraryWordEntry[] }[];
  }
> = {
  nouns: {
    id: 'nouns',
    label: 'İsimler',
    icon: '📦',
    sets: [
      { id: 'nouns_1', name: '1. İsim Paketi', range: '1 – 100', words: NOUNS_100 },
      { id: 'nouns_2', name: '2. İsim Paketi', range: '101 – 200', words: NOUNS_200 },
      { id: 'nouns_3', name: '3. İsim Paketi', range: '201 – 300', words: NOUNS_300 },
    ],
  },
  verbs: {
    id: 'verbs',
    label: 'Fiiller',
    icon: '🏃',
    sets: [
      { id: 'verbs_1', name: '1. Fiil Paketi', range: '1 – 100', words: VERBS_100 },
      { id: 'verbs_2', name: '2. Fiil Paketi', range: '101 – 200', words: VERBS_200 },
      { id: 'verbs_3', name: '3. Fiil Paketi', range: '201 – 300', words: VERBS_300 },
    ],
  },
  adjectives: {
    id: 'adjectives',
    label: 'Sıfatlar',
    icon: '🎯',
    sets: [
      { id: 'adjectives_1', name: '1. Sıfat Paketi', range: '1 – 100', words: ADJECTIVES_100 },
      { id: 'adjectives_2', name: '2. Sıfat Paketi', range: '101 – 200', words: ADJECTIVES_200 },
      { id: 'adjectives_3', name: '3. Sıfat Paketi', range: '201 – 300', words: ADJECTIVES_300 },
    ],
  },
};

export default function LibraryPage() {
  const [category, setCategory] = useState<CategoryKey>('nouns');
  const [packIndex, setPackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCards, setSavedCards] = useState<SavedVocabCard[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const autoScrolledPackKey = useRef<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const refreshSaved = () => {
    setSavedCards(getSavedVocabCards());
  };

  const refreshDismissed = () => {
    api
      .get<string[]>('/vocab-library/progress')
      .then(setDismissedIds)
      .catch(() => {});
  };

  useEffect(() => {
    refreshSaved();
    refreshDismissed();
    window.addEventListener('talkstage_vocab_updated', refreshSaved);
    return () => window.removeEventListener('talkstage_vocab_updated', refreshSaved);
  }, []);

  const savedTermsSet = useMemo(
    () => new Set(savedCards.map((c) => c.term.trim().toLowerCase())),
    [savedCards]
  );
  const dismissedSet = useMemo(() => new Set(dismissedIds), [dismissedIds]);

  const activeCategoryObj = PACKS[category];
  const activeSet = activeCategoryObj.sets[packIndex] ?? activeCategoryObj.sets[0];

  const isWordReviewed = (w: LibraryWordEntry) =>
    savedTermsSet.has(w.word.trim().toLowerCase()) || dismissedSet.has(w.id);

  const filteredWords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeSet.words;
    return activeSet.words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q) ||
        w.exampleEn.toLowerCase().includes(q) ||
        w.exampleTr.toLowerCase().includes(q)
    );
  }, [activeSet, searchQuery]);

  // "Reviewed" now covers both saved AND explicitly-skipped words, so the
  // percentage reflects real exposure to the pack, not just chest additions.
  const reviewedInActiveSetCount = useMemo(() => {
    return activeSet.words.filter(isWordReviewed).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSet, savedTermsSet, dismissedSet]);

  const packProgressPercent = Math.round((reviewedInActiveSetCount / activeSet.words.length) * 100);

  // Resume where the user left off — jump to the pack's first not-yet-
  // reviewed word once per pack instead of always landing on #1 (otherwise a
  // returning user only ever re-sees the first 10-20 words).
  useEffect(() => {
    if (searchQuery.trim()) return;
    const packKey = `${category}_${packIndex}`;
    if (autoScrolledPackKey.current === packKey) return;

    const firstUnreviewed = activeSet.words.find((w) => !isWordReviewed(w));
    if (firstUnreviewed && firstUnreviewed.rank > 1) {
      autoScrolledPackKey.current = packKey;
      const timer = setTimeout(() => {
        cardRefs.current[firstUnreviewed.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, packIndex, savedTermsSet, dismissedSet, searchQuery]);

  const handleAddWord = async (item: LibraryWordEntry) => {
    if (savedTermsSet.has(item.word.trim().toLowerCase())) return;
    try {
      await saveVocabCard({
        term: item.word,
        translation: item.translation,
        exampleSentence: item.exampleEn,
        partOfSpeech: item.partOfSpeech,
        sourceLabel: `${activeCategoryObj.label} (${activeSet.range})`,
      });
      setToastMessage(`“${item.word}” Kelime Sandığına eklendi 🎉`);
    } catch (err) {
      setToastMessage(err instanceof ApiError ? err.message : 'Kelime eklenemedi');
    }
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleMarkKnown = async (item: LibraryWordEntry) => {
    if (dismissedSet.has(item.id)) return;
    try {
      await api.post('/vocab-library/progress', { word_id: item.id });
      setDismissedIds((prev) => [...prev, item.id]);
    } catch (err) {
      setToastMessage(err instanceof ApiError ? err.message : 'İşaretlenemedi');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleUndoKnown = async (item: LibraryWordEntry) => {
    try {
      await api.delete(`/vocab-library/progress/${item.id}`);
      setDismissedIds((prev) => prev.filter((id) => id !== item.id));
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
          src="/images/bg_bento_sunlit_ivory.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Çekirdek Kelime Kütüphanesi 📚
              </h1>
              <span className="text-xs font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200/60">
                900 Kelime
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              İngilizcede en sık kullanılan 900 İsim, Fiil ve Sıfatı tüm gramer formları, IPA telaffuzları ve örnek cümleleriyle inceleyin.
            </p>
          </div>

          <Link
            href="/app/vocab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-semibold text-xs transition-all shadow-xs shrink-0"
          >
            <Archive className="w-4 h-4 text-indigo-600" />
            <span>Kelime Sandığına Git ({savedCards.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Category Tabs & Sub-Pack Selector Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-4 shadow-xs">
        {/* 1. Category Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            {(Object.keys(PACKS) as CategoryKey[]).map((catKey) => {
              const cat = PACKS[catKey];
              const isActive = category === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => {
                    setCategory(catKey);
                    setPackIndex(0);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Pack Selector */}
          <div className="flex items-center gap-2">
            {activeCategoryObj.sets.map((s, idx) => {
              const isSelected = packIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setPackIndex(idx);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{s.name}</span>{' '}
                  <span className={isSelected ? 'text-indigo-200' : 'text-slate-400 font-mono text-[11px]'}>
                    ({s.range})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress & Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Progress Gauge */}
          <div className="md:col-span-1 bg-slate-50 border border-slate-200/60 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                {activeCategoryObj.icon} {activeSet.name} İlerlemesi
              </span>
              <span className="font-mono font-bold text-emerald-600">%{packProgressPercent}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(4, packProgressPercent)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              100 kelimeden {reviewedInActiveSetCount} tanesi incelendi (sandıkta veya atlanmış)
            </div>
          </div>

          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`${activeSet.name} (${activeSet.range}) içinde ara (kelime, anlam, örnek)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
              >
                Temizle ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Words Grid (3 Columns on Large Screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWords.map((item) => {
          const isSaved = savedTermsSet.has(item.word.trim().toLowerCase());
          const isDismissed = dismissedSet.has(item.id);

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el;
              }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Rank, Term, IPA, Sound */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                      #{item.rank}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg">{item.word}</h3>
                    {item.phonetic && (
                      <span className="font-mono text-xs text-cyan-600">{item.phonetic}</span>
                    )}
                  </div>
                  <button
                    onClick={() => speakEnglish(item.word)}
                    title="Sesli Telaffuz"
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Turkish Meaning */}
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span>🇹🇷</span>
                  <span>{item.translation}</span>
                </div>

                {/* Grammar Breakdown */}
                {/* 1. Verbs: 4-Tense Grid */}
                {item.partOfSpeech === 'verb' && (item.presentSimple || item.pastSimple) && (
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-2.5 border border-slate-200/60 text-xs">
                    {item.presentSimple && (
                      <div>
                        <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Geniş:</div>
                        <div className="font-semibold text-slate-900 text-[11px]">{item.presentSimple.form}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.presentSimple.translation}</div>
                      </div>
                    )}
                    {item.presentContinuous && (
                      <div>
                        <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Şimdiki:</div>
                        <div className="font-semibold text-slate-900 text-[11px]">{item.presentContinuous.form}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.presentContinuous.translation}</div>
                      </div>
                    )}
                    {item.future && (
                      <div>
                        <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Gelecek:</div>
                        <div className="font-semibold text-slate-900 text-[11px]">{item.future.form}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.future.translation}</div>
                      </div>
                    )}
                    {item.pastSimple && (
                      <div>
                        <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Geçmiş:</div>
                        <div className="font-semibold text-slate-900 text-[11px]">{item.pastSimple.form}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.pastSimple.translation}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Nouns: Singular, Plural, Possessive */}
                {item.partOfSpeech === 'noun' && (item.singular || item.plural || item.possessivePhrase) && (
                  <div className="space-y-1.5 bg-slate-50 rounded-xl p-2.5 border border-slate-200/60 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      {item.singular && (
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Tekil: </span>
                          <span className="font-semibold text-slate-900 text-[11px]">{item.singular.form}</span>
                        </div>
                      )}
                      {item.plural && (
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Çoğul: </span>
                          <span className="font-semibold text-slate-900 text-[11px]">{item.plural.form}</span>
                        </div>
                      )}
                    </div>
                    {item.possessivePhrase && (
                      <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Tamlama: </span>
                        <span className="font-medium text-slate-900">{item.possessivePhrase.form}</span>
                        <span className="text-slate-400 text-[10px]"> ({item.possessivePhrase.translation})</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Adjectives: Comparative, Superlative, Antonym */}
                {item.partOfSpeech === 'adjective' && (item.comparative || item.superlative || item.antonym) && (
                  <div className="space-y-1.5 bg-slate-50 rounded-xl p-2.5 border border-slate-200/60 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      {item.comparative && (
                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Daha... (Comp):</div>
                          <div className="font-semibold text-slate-900 text-[11px]">{item.comparative.form}</div>
                        </div>
                      )}
                      {item.superlative && (
                        <div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">En... (Sup):</div>
                          <div className="font-semibold text-slate-900 text-[11px]">{item.superlative.form}</div>
                        </div>
                      )}
                    </div>
                    {item.antonym && (
                      <div className="text-[11px] text-purple-700 bg-purple-50/70 border border-purple-200/60 rounded px-2 py-1 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold">⇄ Zıt Anlam:</span>
                        <span className="font-bold">{item.antonym.word}</span>
                        <span className="text-purple-400 text-[10px]">({item.antonym.translation})</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Example Sentence */}
                {item.exampleEn && (
                  <div className="bg-indigo-50/40 border border-indigo-100/60 rounded-xl p-2.5 space-y-1">
                    <div className="text-xs text-slate-800 leading-relaxed font-medium">
                      &ldquo;{item.exampleEn}&rdquo;
                    </div>
                    {item.exampleTr && (
                      <div className="text-[11px] text-slate-500 italic">{item.exampleTr}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Action: Add to Chest / Mark Known / Saved Badge */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => speakEnglish(item.exampleEn || item.word)}
                  className="text-[11px] text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dinle</span>
                </button>

                {isSaved ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold text-xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>Sandıkta ✓</span>
                  </span>
                ) : isDismissed ? (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-500 border border-slate-200 font-semibold text-[11px]">
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Biliniyor</span>
                    </span>
                    <button
                      onClick={() => handleUndoKnown(item)}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      Geri Al
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkKnown(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold text-[11px] transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Biliyorum</span>
                    </button>
                    <button
                      onClick={() => handleAddWord(item)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-xs transform hover:scale-105 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ekle</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Aradığınız kelime bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Farklı bir arama terimi deneyebilir veya arama filtresini sıfırlayabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}
