'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Archive,
  RotateCcw,
  Search,
  Volume2,
  Trash2,
  Sparkles,
  BookMarked,
  ArrowRight,
  CheckCircle2,
  Layers,
  Folder,
  FolderPlus,
  Plus,
  Filter,
  Check,
  X,
  Smartphone,
  Play,
  Flame,
  Zap,
  Tag,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import {
  getSavedVocabCards,
  syncCloudVocabCards,
  gradeVocabCard,
  deleteVocabCard,
  saveVocabCard,
  type SavedVocabCard,
} from '@/lib/storage';
import {
  DEFAULT_VOCAB_DECKS,
  loadAllDecks,
  saveCustomDeck,
  deleteCustomDeck,
  getCardDeckMap,
  setCardDeck,
  getDeckMasteredWordIds,
  markWordAsMasteredInDeck,
  type VocabDeck,
  type VocabDeckWord,
} from '@/data/vocabDecks';
import { speakEnglish } from '@/lib/audio';

type TabMode = 'decks' | 'dictionary' | 'flashcards';

const EMOJI_OPTIONS = ['📁', '💼', '🚀', '✈️', '💻', '🍔', '🎨', '🔢', '🏛️', '🌟', '📚', '🎯', '💡', '🔥'];
const COLOR_OPTIONS = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#8B5CF6', '#3B82F6', '#EF4444'];

export default function VocabPage() {
  const [cards, setCards] = useState<SavedVocabCard[]>([]);
  const [decks, setDecks] = useState<VocabDeck[]>([]);
  const [cardDeckMap, setCardDeckMapState] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<TabMode>('decks');
  
  // Filtering & Search
  const [search, setSearch] = useState('');
  const [deckFilter, setDeckFilter] = useState<string>('all');
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>('all');
  const [selectedPosFilter, setSelectedPosFilter] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  
  // Flashcard Practice Mode State
  const [studyDeckId, setStudyDeckId] = useState<string>('due'); // 'due' | 'all' | deck_id
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedSessionCount, setReviewedSessionCount] = useState(0);

  // Modals
  const [createDeckModalOpen, setCreateDeckModalOpen] = useState(false);
  const [addWordModalOpen, setAddWordModalOpen] = useState(false);
  const [assignDeckModalCard, setAssignDeckModalCard] = useState<SavedVocabCard | null>(null);

  // Form states - Create Deck
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckSubtitle, setNewDeckSubtitle] = useState('');
  const [newDeckEmoji, setNewDeckEmoji] = useState('📁');
  const [newDeckColor, setNewDeckColor] = useState('#4F46E5');
  const [newDeckLevel, setNewDeckLevel] = useState('B1');

  // Form states - Add Word
  const [wordTerm, setWordTerm] = useState('');
  const [wordPhonetic, setWordPhonetic] = useState('');
  const [wordTranslation, setWordTranslation] = useState('');
  const [wordExampleEn, setWordExampleEn] = useState('');
  const [wordExampleTr, setWordExampleTr] = useState('');
  const [wordPos, setWordPos] = useState('noun');
  const [wordLevel, setWordLevel] = useState('A2');
  const [wordTargetDeckId, setWordTargetDeckId] = useState<string>('');

  const refreshData = () => {
    setCards(getSavedVocabCards());
    setDecks(loadAllDecks());
    setCardDeckMapState(getCardDeckMap());
  };

  useEffect(() => {
    refreshData();
    syncCloudVocabCards().then((fetched) => {
      setCards(fetched);
    });

    const handleUpdate = () => refreshData();
    window.addEventListener('talkstage_vocab_updated', handleUpdate);
    window.addEventListener('talkstage_decks_updated', handleUpdate);
    return () => {
      window.removeEventListener('talkstage_vocab_updated', handleUpdate);
      window.removeEventListener('talkstage_decks_updated', handleUpdate);
    };
  }, []);

  // Filter Decks for Deck Tab
  const filteredDecks = useMemo(() => {
    if (deckFilter === 'all') return decks;
    if (deckFilter === 'custom') return decks.filter((d) => d.isCustom);
    if (deckFilter === 'thematic') {
      return decks.filter((d) =>
        ['deck_colors_shapes', 'deck_numbers_time', 'deck_food_dining', 'deck_travel_airport', 'deck_business_tech'].includes(d.id)
      );
    }
    return decks.filter((d) => d.level === deckFilter);
  }, [decks, deckFilter]);

  // Mastered counts per deck
  const deckMasteryMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of decks) {
      map[d.id] = getDeckMasteredWordIds(d.id).length;
    }
    return map;
  }, [decks]);

  // Total words in deck (combines default words + user words assigned to that deck)
  const getDeckWordCount = (deckId: string) => {
    const deck = decks.find((d) => d.id === deckId);
    const defaultWordsCount = deck?.words?.length || 0;
    const userCardsAssigned = Object.values(cardDeckMap).filter((dId) => dId === deckId).length;
    return defaultWordsCount + userCardsAssigned;
  };

  // Due queue for today
  const dueQueue = useMemo(() => {
    return cards.filter((c) => new Date(c.nextReviewDate).getTime() <= Date.now());
  }, [cards]);

  // Build Study Flashcard Queue based on selected study mode
  const studyQueue = useMemo(() => {
    if (studyDeckId === 'due') {
      return dueQueue.length > 0 ? dueQueue : cards;
    }
    if (studyDeckId === 'all') {
      return cards;
    }
    // Specific deck: collect user cards mapped to this deck + default deck words
    const deck = decks.find((d) => d.id === studyDeckId);
    const assignedUserCards = cards.filter((c) => cardDeckMap[c.id] === studyDeckId);
    
    // Also include deck default words as SavedVocabCard mock objects if not in user cards
    const defaultCardsAsSaved: SavedVocabCard[] = (deck?.words || [])
      .filter((w) => !assignedUserCards.some((uc) => uc.term.toLowerCase() === w.term.toLowerCase()))
      .map((w) => ({
        id: w.id,
        term: w.term,
        translation: w.translation,
        exampleSentence: w.exampleEn,
        partOfSpeech: w.pos,
        sourceLabel: deck?.title || 'Klasör',
        createdAt: new Date().toISOString(),
        repetitions: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        nextReviewDate: new Date().toISOString(),
      }));

    return [...assignedUserCards, ...defaultCardsAsSaved];
  }, [studyDeckId, dueQueue, cards, decks, cardDeckMap]);

  const currentStudyCard = studyQueue[currentIndex] ?? null;

  // Keyboard shortcut listener for Flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tab !== 'flashcards' || !currentStudyCard) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === '1') {
        e.preventDefault();
        handleGrade('again');
      } else if (e.key === '2') {
        e.preventDefault();
        handleGrade('good');
      } else if (e.key === '3') {
        e.preventDefault();
        handleGrade('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tab, currentStudyCard]);

  const handleGrade = (grade: 'again' | 'good' | 'easy') => {
    if (!currentStudyCard) return;
    
    // If it's a real user card in storage, grade it
    if (cards.some((c) => c.id === currentStudyCard.id)) {
      gradeVocabCard(currentStudyCard.id, grade).catch(() => {});
    }
    
    // If practicing within a specific deck and got 'good' or 'easy', mark word as mastered in deck
    if (studyDeckId !== 'due' && studyDeckId !== 'all' && (grade === 'good' || grade === 'easy')) {
      markWordAsMasteredInDeck(studyDeckId, currentStudyCard.id);
    }

    setIsFlipped(false);
    setReviewedSessionCount((prev) => prev + 1);

    if (currentIndex >= studyQueue.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Filter Dictionary Cards
  const filteredDictionary = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => {
      const matchesQuery =
        !q ||
        c.term.toLowerCase().includes(q) ||
        c.translation.toLowerCase().includes(q) ||
        (c.exampleSentence && c.exampleSentence.toLowerCase().includes(q));

      const matchesFolder =
        selectedFolderFilter === 'all' ||
        cardDeckMap[c.id] === selectedFolderFilter;

      const matchesPos =
        selectedPosFilter === 'all' ||
        (c.partOfSpeech && c.partOfSpeech.toLowerCase() === selectedPosFilter.toLowerCase());

      return matchesQuery && matchesFolder && matchesPos;
    });
  }, [cards, search, selectedFolderFilter, selectedPosFilter, cardDeckMap]);

  // Handle Create Custom Deck
  const handleCreateDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;

    const newDeck: VocabDeck = {
      id: `custom_deck_${Date.now()}`,
      title: newDeckTitle.trim(),
      subtitle: newDeckSubtitle.trim() || 'Özel çalışma klasörü',
      emoji: newDeckEmoji,
      color: newDeckColor,
      level: newDeckLevel,
      isCustom: true,
      words: [],
      createdAt: new Date().toISOString(),
    };

    saveCustomDeck(newDeck);
    setNewDeckTitle('');
    setNewDeckSubtitle('');
    setCreateDeckModalOpen(false);
  };

  // Handle Add New Word
  const handleAddWordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordTerm.trim() || !wordTranslation.trim()) return;

    const targetDeck = decks.find((d) => d.id === wordTargetDeckId);
    const createdCard = await saveVocabCard({
      term: wordTerm.trim(),
      translation: wordTranslation.trim(),
      exampleSentence: wordExampleEn.trim() || undefined,
      partOfSpeech: wordPos,
      sourceLabel: targetDeck ? targetDeck.title : 'Özel Sözlük',
    });

    if (wordTargetDeckId) {
      setCardDeck(createdCard.id, wordTargetDeckId);
    }

    setWordTerm('');
    setWordPhonetic('');
    setWordTranslation('');
    setWordExampleEn('');
    setWordExampleTr('');
    setAddWordModalOpen(false);
  };

  // Handle Assign Deck
  const handleAssignDeck = (deckId: string | null) => {
    if (!assignDeckModalCard) return;
    setCardDeck(assignDeckModalCard.id, deckId);
    setAssignDeckModalCard(null);
  };

  // Start practicing a specific deck
  const startDeckPractice = (deckId: string) => {
    setStudyDeckId(deckId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setTab('flashcards');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📦</span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Kelime Sandığı & Klasörler
              </h1>
              <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {cards.length} Kelime • {decks.length} Klasör
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Kelimelerinizi klasörlere ayırın, tematik destelerle çalışın ve bilimsel SuperMemo-2 aralıklı tekrar algoritmasıyla kalıcı hafızaya aktarın.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => setTab('decks')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === 'decks'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Klasörler ({decks.length})</span>
            </button>

            <button
              onClick={() => setTab('dictionary')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === 'dictionary'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sözlüğüm ({cards.length})</span>
            </button>

            <button
              onClick={() => setTab('flashcards')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                tab === 'flashcards'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SM-2 Pratiği ({dueQueue.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: KLASÖRLERİM & DESTELER (DECKS)                                      */}
      {/* ========================================================================= */}
      {tab === 'decks' && (
        <div className="space-y-6">
          {/* Deck Filters & Create Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'Tüm Klasörler' },
                { id: 'custom', label: '⭐ Özel Klasörlerim' },
                { id: 'thematic', label: '🎭 Tematik' },
                { id: 'A1', label: 'A1' },
                { id: 'A2', label: 'A2' },
                { id: 'B1', label: 'B1' },
                { id: 'B2', label: 'B2' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setDeckFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    deckFilter === f.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCreateDeckModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer shrink-0"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Yeni Klasör Oluştur</span>
            </button>
          </div>

          {/* Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDecks.map((deck) => {
              const totalWords = getDeckWordCount(deck.id);
              const masteredCount = deckMasteryMap[deck.id] || 0;
              const progressPct = totalWords > 0 ? Math.min(100, Math.round((masteredCount / totalWords) * 100)) : 0;

              return (
                <div
                  key={deck.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="space-y-3">
                    {/* Header: Emoji, Title, Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs shrink-0"
                          style={{ backgroundColor: `${deck.color}15`, border: `1px solid ${deck.color}35` }}
                        >
                          {deck.emoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                              {deck.title}
                            </h3>
                            {deck.isCustom && (
                              <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                                Özel
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {deck.subtitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{ backgroundColor: `${deck.color}15`, color: deck.color }}
                      >
                        {deck.level}
                      </span>
                    </div>

                    {/* Progress & Stats */}
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600 text-[11px] font-semibold">
                        <span>İlerleme: {masteredCount} / {totalWords} Kelime</span>
                        <span className="font-mono font-bold" style={{ color: deck.color }}>
                          %{progressPct}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%`, backgroundColor: deck.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedFolderFilter(deck.id);
                        setTab('dictionary');
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Kelimeleri Gör</span>
                    </button>

                    <button
                      onClick={() => startDeckPractice(deck.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                      style={{ backgroundColor: deck.color }}
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Pratik Yap</span>
                    </button>

                    {deck.isCustom && (
                      <button
                        onClick={() => deleteCustomDeck(deck.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Klasörü Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SÖZLÜĞÜM (DICTIONARY)                                              */}
      {/* ========================================================================= */}
      {tab === 'dictionary' && (
        <div className="space-y-4">
          {/* Top Filter Bar & Add Word Action */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Kelime, Türkçe anlam veya örnek cümle ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Add New Word Button */}
              <button
                onClick={() => setAddWordModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Kelime Ekle</span>
              </button>
            </div>

            {/* Sub-Filters: Folder, POS, Level */}
            <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>Klasör Filtresi:</span>
              </div>

              <select
                value={selectedFolderFilter}
                onChange={(e) => setSelectedFolderFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="all">Tüm Klasörler ({cards.length})</option>
                {decks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.emoji} {d.title}
                  </option>
                ))}
              </select>

              <select
                value={selectedPosFilter}
                onChange={(e) => setSelectedPosFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="all">Tüm Türler</option>
                <option value="noun">İsim (Noun)</option>
                <option value="verb">Fiil (Verb)</option>
                <option value="adjective">Sıfat (Adjective)</option>
                <option value="adverb">Zarf (Adverb)</option>
                <option value="phrase">Deyim / Kalıp (Phrase)</option>
              </select>

              {(selectedFolderFilter !== 'all' || selectedPosFilter !== 'all' || search) && (
                <button
                  onClick={() => {
                    setSelectedFolderFilter('all');
                    setSelectedPosFilter('all');
                    setSearch('');
                  }}
                  className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer ml-auto"
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>
          </div>

          {/* Cards List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDictionary.map((card) => {
              const assignedDeckId = cardDeckMap[card.id];
              const assignedDeck = decks.find((d) => d.id === assignedDeckId);

              return (
                <div
                  key={card.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative group"
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Term, POS, Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-slate-900 text-lg">{card.term}</h3>
                        {card.partOfSpeech && (
                          <span className="font-mono text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {card.partOfSpeech}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakEnglish(card.term)}
                          className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="Sesli Telaffuz"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setAssignDeckModalCard(card)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="Klasöre Taşı"
                        >
                          <Folder className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteVocabCard(card.id).catch(() => {})}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Sandıktan Çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Translation */}
                    <div className="text-sm font-bold text-emerald-800">
                      🇹🇷 {card.translation}
                    </div>

                    {/* Example Sentence */}
                    {card.exampleSentence && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed italic">
                        &ldquo;{card.exampleSentence}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Card Meta & Folder Tag */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setAssignDeckModalCard(card)}
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <Folder className="w-3 h-3 text-indigo-500" />
                      <span>{assignedDeck ? `${assignedDeck.emoji} ${assignedDeck.title}` : 'Klasörsüz (Ata)'}</span>
                    </button>

                    <span>Tekrar Aralığı: {card.intervalDays} gün</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDictionary.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Kelime bulunamadı</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Yeni bir kelime ekleyebilir veya 900 Çekirdek Kelime Kütüphanesinden dilediğiniz kelimeleri tek tıkla sandığınıza ekleyebilirsiniz.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setAddWordModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Kelime Ekle</span>
                </button>
                <Link
                  href="/app/library"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all"
                >
                  <span>Kütüphaneye Git ➔</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SM-2 PRATİĞİ (FLASHCARDS)                                          */}
      {/* ========================================================================= */}
      {tab === 'flashcards' && (
        <div className="space-y-6">
          {/* Practice Header & Study Source Selector */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">Çalışma Seti:</span>
              <select
                value={studyDeckId}
                onChange={(e) => {
                  setStudyDeckId(e.target.value);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-indigo-700 outline-none cursor-pointer"
              >
                <option value="due">🔥 Günü Gelen Tekrarlar ({dueQueue.length} Kelime)</option>
                <option value="all">📦 Tüm Kelime Sandığım ({cards.length} Kelime)</option>
                <optgroup label="Klasörler & Desteler">
                  {decks.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.emoji} {d.title} ({getDeckWordCount(d.id)} Kelime)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span>Kart: {studyQueue.length > 0 ? currentIndex + 1 : 0} / {studyQueue.length}</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">Tamamlanan: {reviewedSessionCount}</span>
            </div>
          </div>

          {currentStudyCard ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* 3D Flip Card */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-3xl p-8 min-h-[380px] flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 shadow-xl shadow-slate-900/5 relative select-none group backdrop-blur-xl"
              >
                {/* Card Top Pill */}
                <div className="flex items-center justify-between w-full text-xs text-slate-400">
                  <span className="font-mono font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-700">
                    {currentStudyCard.partOfSpeech || 'Kelime'}
                  </span>
                  <span className="text-slate-500 font-semibold">
                    {currentStudyCard.sourceLabel || 'Kelime Sandığı'}
                  </span>
                </div>

                {!isFlipped ? (
                  /* Front Side */
                  <div className="space-y-4 my-auto">
                    <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                      {currentStudyCard.term}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold">
                      <span>Anlamı görmek için tıkla (veya Boşluk tuşu) 🔄</span>
                    </div>
                  </div>
                ) : (
                  /* Back Side */
                  <div className="space-y-5 my-auto w-full animate-in fade-in">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                      <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                        🇹🇷 TÜRKÇE ANLAMI:
                      </div>
                      <div className="text-2xl font-black text-emerald-950 mt-1">
                        {currentStudyCard.translation}
                      </div>
                    </div>

                    {currentStudyCard.exampleSentence && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 font-bold">ÖRNEK KULLANIM:</div>
                        <p className="text-xs text-slate-800 font-semibold italic">
                          &ldquo;{currentStudyCard.exampleSentence}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Bottom Meta */}
                <div className="flex items-center justify-between w-full text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(currentStudyCard.term);
                    }}
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Telaffuzu Dinle</span>
                  </button>

                  <span className="text-[11px]">Tekrar Aralığı: {currentStudyCard.intervalDays} gün</span>
                </div>
              </div>

              {/* SM-2 Grade Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleGrade('again')}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 hover:bg-red-100 transition-all font-bold text-xs cursor-pointer shadow-xs"
                >
                  <span className="text-sm">❌ Tekrar (1)</span>
                  <span className="text-[10px] text-red-500 mt-0.5">1 gün sonra</span>
                </button>

                <button
                  onClick={() => handleGrade('good')}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all font-bold text-xs cursor-pointer shadow-xs"
                >
                  <span className="text-sm">⚡ İyi (2)</span>
                  <span className="text-[10px] text-indigo-500 mt-0.5">3 gün sonra</span>
                </button>

                <button
                  onClick={() => handleGrade('easy')}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all font-bold text-xs cursor-pointer shadow-xs"
                >
                  <span className="text-sm">💎 Kolay (3)</span>
                  <span className="text-[10px] text-emerald-500 mt-0.5">7+ gün sonra</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🎉
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Bu Set İçin Tekrarlar Bitti!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tebrikler! Seçtiğin klasördeki tüm kelimeleri çalıştın. Başka bir klasör seçebilir veya sözlüğüne yeni kelimeler ekleyebilirsin.
              </p>
              <button
                onClick={() => setTab('decks')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <Folder className="w-4 h-4" />
                <span>Klasörlere Dön</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE CUSTOM DECK / FOLDER                                      */}
      {/* ========================================================================= */}
      {createDeckModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Yeni Klasör Oluştur</h3>
              </div>
              <button
                onClick={() => setCreateDeckModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeckSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Klasör Başlığı *</label>
                <input
                  type="text"
                  placeholder="Örn: İş Mülakatı Hazırlık, Tıp Terimleri..."
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Açıklama</label>
                <input
                  type="text"
                  placeholder="Örn: FAANG mülakatlarında sorulan 50 teknik kalıp"
                  value={newDeckSubtitle}
                  onChange={(e) => setNewDeckSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Klasör Simgesi (Emoji)</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {EMOJI_OPTIONS.map((em) => (
                    <button
                      type="button"
                      key={em}
                      onClick={() => setNewDeckEmoji(em)}
                      className={`w-9 h-9 rounded-xl text-base flex items-center justify-center border transition-all cursor-pointer ${
                        newDeckEmoji === em
                          ? 'border-indigo-500 bg-indigo-50 shadow-xs scale-110'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Vurgu Rengi</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      type="button"
                      key={col}
                      onClick={() => setNewDeckColor(col)}
                      className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                        newDeckColor === col ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : ''
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Hedef Seviye</label>
                <select
                  value={newDeckLevel}
                  onChange={(e) => setNewDeckLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="A1">A1 - Başlangıç</option>
                  <option value="A2">A2 - Temel</option>
                  <option value="B1">B1 - Orta</option>
                  <option value="B2">B2 - İyi</option>
                  <option value="C1">C1 - İleri</option>
                  <option value="C2">C2 - Ustalık</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateDeckModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 cursor-pointer"
                >
                  Klasörü Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW WORD WITH FOLDER ASSIGNMENT                              */}
      {/* ========================================================================= */}
      {addWordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Sözlüğe Yeni Kelime Ekle</h3>
              </div>
              <button
                onClick={() => setAddWordModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddWordSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">İngilizce Kelime / İfade *</label>
                <input
                  type="text"
                  placeholder="Örn: Leverage, Concurrency, Milestone..."
                  value={wordTerm}
                  onChange={(e) => setWordTerm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Türkçe Karşılığı *</label>
                <input
                  type="text"
                  placeholder="Örn: Kaldıraç olarak kullanmak / Faydalanmak"
                  value={wordTranslation}
                  onChange={(e) => setWordTranslation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kelime Türü</label>
                  <select
                    value={wordPos}
                    onChange={(e) => setWordPos(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="noun">İsim (Noun)</option>
                    <option value="verb">Fiil (Verb)</option>
                    <option value="adjective">Sıfat (Adjective)</option>
                    <option value="adverb">Zarf (Adverb)</option>
                    <option value="phrase">Deyim / Kalıp (Phrase)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hedef Klasör</label>
                  <select
                    value={wordTargetDeckId}
                    onChange={(e) => setWordTargetDeckId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-indigo-700 outline-none"
                  >
                    <option value="">Klasörsüz (Genel Sandık)</option>
                    {decks.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.emoji} {d.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">İngilizce Örnek Cümle</label>
                <textarea
                  rows={2}
                  placeholder="Örn: We can leverage our existing database architecture for the new service."
                  value={wordExampleEn}
                  onChange={(e) => setWordExampleEn(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddWordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 cursor-pointer"
                >
                  Sandığa Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ASSIGN WORD TO FOLDER DIALOG                                     */}
      {/* ========================================================================= */}
      {assignDeckModalCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Klasör Seç / Taşı</h3>
              </div>
              <button
                onClick={() => setAssignDeckModalCard(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                <strong className="text-slate-900">&ldquo;{assignDeckModalCard.term}&rdquo;</strong> kelimesini taşımak istediğiniz klasörü seçin:
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <button
                onClick={() => handleAssignDeck(null)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                  !cardDeckMap[assignDeckModalCard.id]
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>📦 Klasörsüz (Genel Sandık)</span>
                {!cardDeckMap[assignDeckModalCard.id] && <Check className="w-4 h-4 text-indigo-600" />}
              </button>

              {decks.map((d) => {
                const isSelected = cardDeckMap[assignDeckModalCard.id] === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => handleAssignDeck(d.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{d.emoji}</span>
                      <span>{d.title}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
