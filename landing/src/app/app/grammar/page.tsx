'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  Award,
  ArrowRight,
  BookOpen,
  Lock,
  MessageSquare,
  AlertTriangle,
  Layers,
  ChevronRight,
  FileText,
  Table,
} from 'lucide-react';
import { CEFR_CURRICULUM, type CurriculumTopic } from '@/data/curriculumData';
import {
  ALL_GRAMMAR_LESSONS,
  findGrammarLesson,
  type GrammarLesson,
  type GrammarQuizQuestion,
} from '@/data/grammarLessons';
import { speakEnglish } from '@/lib/audio';
import { completeLesson, getStudyStats, getSavedVocabCards } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type CefrCode = (typeof CEFR_ORDER)[number];

const LEVEL_META: Record<CefrCode, { title: string; enTitle: string; color: string; desc: string }> = {
  A1: {
    title: 'Başlangıç',
    enTitle: 'Beginner',
    color: '#10B981',
    desc: 'Temel hayatta kalma, tanışma ve günlük ilk cümleler (12 Konu)',
  },
  A2: {
    title: 'Temel',
    enTitle: 'Elementary',
    color: '#0EA5E9',
    desc: 'Günlük rutinler, seyahat, restoran ve alışveriş (10 Konu)',
  },
  B1: {
    title: 'Orta Düzey',
    enTitle: 'Intermediate',
    color: '#6366F1',
    desc: 'İş toplantıları, teknik standuplar ve mülakatlar (10 Konu)',
  },
  B2: {
    title: 'İyi Düzey',
    enTitle: 'Upper-Intermediate',
    color: '#8B5CF6',
    desc: 'Akıcı tartışma, mimari kararlar ve teknik sunumlar (8 Konu)',
  },
  C1: {
    title: 'İleri Düzey',
    enTitle: 'Advanced',
    color: '#EC4899',
    desc: 'Liderlik, B2B müzakere, ikna ve profesyonel akıcılık (4 Konu)',
  },
  C2: {
    title: 'Ustalık',
    enTitle: 'Mastery',
    color: '#F59E0B',
    desc: 'Anadili akıcılığı, derin nüanslar ve deyimler (2 Konu)',
  },
};

export default function GrammarAcademyPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Yükleniyor...</div>}>
      <GrammarAcademyContent />
    </Suspense>
  );
}

function GrammarAcademyContent() {
  const { profile } = useAuth();
  const searchParams = useSearchParams();
  const userLevel = (profile?.targetLevel as CefrCode) || 'A1';

  const [selectedLevel, setSelectedLevel] = useState<CefrCode>(userLevel);
  const [activeTopicCode, setActiveTopicCode] = useState<string>('A1_G01');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);

  // Initialize selected level when profile loads
  useEffect(() => {
    if (profile?.targetLevel && CEFR_ORDER.includes(profile.targetLevel as CefrCode)) {
      setSelectedLevel(profile.targetLevel as CefrCode);
      const levelTopics = CEFR_CURRICULUM[profile.targetLevel as CefrCode]?.topics || [];
      if (levelTopics.length > 0) {
        setActiveTopicCode(levelTopics[0].code);
      }
    }
  }, [profile?.targetLevel]);

  // Deep link from the Study Path (`/app/grammar?level=A1&topic=A1_G01`) —
  // takes priority over the profile default above since it runs after it.
  useEffect(() => {
    const urlLevel = searchParams.get('level');
    const urlTopic = searchParams.get('topic');
    if (urlLevel && CEFR_ORDER.includes(urlLevel as CefrCode)) {
      setSelectedLevel(urlLevel as CefrCode);
    }
    if (urlTopic) {
      setActiveTopicCode(urlTopic);
    }
  }, [searchParams]);

  // Load saved vocab cards
  useEffect(() => {
    const cards = getSavedVocabCards();
    setSavedWords(cards.map((c) => c.term.trim().toLowerCase()));
  }, []);

  const stats = getStudyStats();
  const currentCurriculum = CEFR_CURRICULUM[selectedLevel] || CEFR_CURRICULUM.A1;
  const currentTopics = currentCurriculum.topics;

  const activeTopic =
    currentTopics.find((t) => t.code === activeTopicCode) || currentTopics[0] || null;

  const activeLesson: GrammarLesson | undefined = useMemo(() => {
    if (!activeTopic) return undefined;
    return findGrammarLesson(activeTopic.code);
  }, [activeTopic]);

  const userLevelIndex = CEFR_ORDER.indexOf(userLevel);
  const selectedLevelIndex = CEFR_ORDER.indexOf(selectedLevel);

  const handleSelectLevel = (lvl: CefrCode) => {
    setSelectedLevel(lvl);
    const topics = CEFR_CURRICULUM[lvl]?.topics || [];
    if (topics.length > 0) {
      setActiveTopicCode(topics[0].code);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckQuiz = (questionId: string) => {
    setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
    if (activeTopic) {
      completeLesson(activeTopic.code);
    }
    setToastMessage('🎉 Tebrikler! Test sorusu tamamlandı (+15 XP)');
    setTimeout(() => setToastMessage(null), 2500);
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
          src="/images/bg_grammar_sage_warm.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gramer & Müfredat Akademisi 🏛️
            </h1>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
              46 CEFR Konusu
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            A1&apos;den C2&apos;ye tüm resmi CEFR konuları, görsel zihin haritaları, özet tablolar, 10+ örnek ve pekiştirme testleri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Aktif Seviyeniz: {userLevel}</span>
          </div>
        </div>
        </div>
      </div>

      {/* 1. CEFR Level Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {CEFR_ORDER.map((lvl, idx) => {
          const isSelected = selectedLevel === lvl;
          const isUserCurrent = userLevel === lvl;
          const isLocked = idx > userLevelIndex + 1; // Unlock current level and next level
          const meta = LEVEL_META[lvl];
          const count = CEFR_CURRICULUM[lvl]?.topics.length || 0;

          return (
            <button
              key={lvl}
              onClick={() => handleSelectLevel(lvl)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md border-slate-900'
                  : isUserCurrent
                  ? 'bg-emerald-50/80 text-slate-900 border-2 border-emerald-400'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-black ${isSelected ? 'text-cyan-300' : 'text-slate-900'}`}>
                  {lvl}
                </span>
                {isUserCurrent && (
                  <span className="text-[9px] font-bold bg-emerald-500 text-white px-1 py-0.5 rounded">
                    Mevcut
                  </span>
                )}
                {isLocked && <Lock className="w-3 h-3 text-slate-400" />}
              </div>

              <div className={`text-xs font-bold mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {meta.title}
              </div>
              <div className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                {count} Konu
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Level Objective Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
              {selectedLevel} • {currentCurriculum.title}
            </span>
            <span className="text-xs text-slate-400">• Hedef: {currentCurriculum.targetDays} Gün</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            🎯 <strong>Hedef:</strong> {currentCurriculum.objective}
          </p>
        </div>

        {currentCurriculum.bossChallenge && (
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs max-w-sm shrink-0">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              🏆 Seviye Sonu Meydan Okuması:
            </span>
            <span className="text-amber-800 text-[11px] mt-0.5 block">
              {currentCurriculum.bossChallenge.title}
            </span>
          </div>
        )}
      </div>

      {/* 3. Main Workspace: Topics List (Left) + Interactive Studio (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: All Topics in Level (4 Cols)                */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 font-mono uppercase tracking-wider px-1">
            <span>{selectedLevel} Seviyesi ({currentTopics.length} Konu)</span>
            <span>Müfredat</span>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            {currentTopics.map((topic, idx) => {
              const isActive = activeTopic?.code === topic.code;
              const isCompleted = stats.completedLessons.includes(topic.code);
              const savedTargetCount = topic.targetWords.filter((w) =>
                savedWords.includes(w.trim().toLowerCase())
              ).length;

              return (
                <div
                  key={topic.code}
                  onClick={() => setActiveTopicCode(topic.code)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border-indigo-600'
                      : 'bg-white border-slate-200/80 hover:border-indigo-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {topic.code}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-indigo-700 text-indigo-100'
                            : 'bg-indigo-50 text-indigo-600'
                        }`}
                      >
                        {topic.moduleType === 'speaking'
                          ? '🎙️ Konuşma'
                          : topic.moduleType === 'reading'
                          ? '📖 Okuma'
                          : '📚 Kelime'}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tamam</span>
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-mono ${
                          isActive ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {savedTargetCount}/{topic.targetWords.length} Kelime
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs leading-snug">{topic.title}</h3>
                  <p
                    className={`text-[11px] line-clamp-2 ${
                      isActive ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Full Interactive Grammar Studio (8 Cols)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          {activeTopic ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                    {activeTopic.code} • {selectedLevel} Seviyesi
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeTopic.moduleType === 'speaking'
                      ? 'Konuşma Odaklı'
                      : activeTopic.moduleType === 'reading'
                      ? 'Okuma & Anlama'
                      : 'Kelime Odaklı'}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {activeTopic.title}
                </h2>
                {activeLesson?.purpose && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
                    {activeLesson.purpose}
                  </p>
                )}
              </div>

              {/* 1. Formula Box */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-5 text-white space-y-1.5 shadow-md">
                <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  ⚡ Gramer Formülü & Dizilim
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-white">
                  {activeTopic.formula}
                </div>
              </div>

              {/* 2. Visual Mind-Map (if available in lesson) */}
              {activeLesson?.mindmap && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>🧠</span>
                    <span>Görsel Zihin Şeması</span>
                  </div>
                  <pre className="bg-slate-900 text-cyan-300 font-mono text-[11px] p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                    {activeLesson.mindmap}
                  </pre>
                </div>
              )}

              {/* 3. Grammar Table */}
              {activeLesson?.table && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-indigo-600" />
                    <span>Özet Çekim Tablosu</span>
                  </div>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <tr>
                          {activeLesson.table.headers.map((h, i) => (
                            <th key={i} className="p-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {activeLesson.table.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-slate-50/60 transition-colors">
                            {row.map((cell, colIdx) => (
                              <td key={colIdx} className="p-3 font-mono text-[11px]">
                                {cell.replace(/\*\*/g, '').replace(/`/g, '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. Detailed Explanations */}
              {activeLesson?.explanation && activeLesson.explanation.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Kullanım Mantığı & Detaylı Açıklamalar</span>
                  </div>
                  <div className="space-y-2">
                    {activeLesson.explanation.map((exp, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed font-medium"
                      >
                        {exp.replace(/\*\*/g, '').replace(/\*/g, '')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. 10+ Examples with Speech TTS Audio */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Örnek Cümleler (Sesli Dinleme)</span>
                </div>

                <div className="space-y-2">
                  {(activeLesson?.examples || activeTopic.examples).map((ex, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100/70 text-xs hover:border-indigo-200 transition-all"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 text-sm">{ex.en}</div>
                        <div className="text-slate-500 italic text-[11px]">🇹🇷 {ex.tr}</div>
                      </div>

                      <button
                        onClick={() => speakEnglish(ex.en)}
                        className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-100 transition-colors shadow-xs shrink-0 ml-3"
                        title="Telaffuzu Dinle"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Real-Life Dialogue */}
              {activeLesson?.dialogue && activeLesson.dialogue.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-cyan-600" />
                    <span>Gerçek Hayat Diyaloğu</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                    {activeLesson.dialogue.map((d, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="font-bold text-slate-900 shrink-0 bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-[11px]">
                          {d.speaker}:
                        </span>
                        <span className="text-slate-700 leading-relaxed font-medium">{d.line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Common Mistakes Analysis */}
              {activeLesson?.mistakes && activeLesson.mistakes.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Sık Yapılan Hatalar & Analiz</span>
                  </div>

                  <div className="space-y-2">
                    {activeLesson.mistakes.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50/50 border border-red-200/60 rounded-2xl p-3.5 space-y-1.5 text-xs"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-red-700 font-mono font-bold line-through">
                            ❌ {m.wrong}
                          </span>
                          <span className="text-emerald-700 font-mono font-bold">
                            ➔ ✓ {m.right}
                          </span>
                        </div>
                        <div className="text-slate-600 text-[11px] pt-1 border-t border-red-100">
                          <strong>Açıklama:</strong> {m.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Interactive 5-Question Mini Quiz */}
              {activeLesson?.quiz && activeLesson.quiz.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span>Konu Pekiştirme Testi ({activeLesson.quiz.length} Soru)</span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {activeLesson.quiz.map((q) => {
                      const selected = quizAnswers[q.id];
                      const isSubmitted = quizSubmitted[q.id];
                      const isCorrect = selected === q.correctIndex;

                      return (
                        <div
                          key={q.id}
                          className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 text-xs"
                        >
                          <div className="font-bold text-slate-900 text-sm">{q.question}</div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isOptionSelected = selected === optIdx;
                              let btnStyle =
                                'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';
                              if (isSubmitted) {
                                if (optIdx === q.correctIndex) {
                                  btnStyle =
                                    'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                                } else if (isOptionSelected) {
                                  btnStyle = 'bg-red-50 border-red-400 text-red-900 line-through';
                                }
                              } else if (isOptionSelected) {
                                btnStyle = 'bg-indigo-600 text-white font-bold border-indigo-600';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() =>
                                    !isSubmitted && handleSelectQuizOption(q.id, optIdx)
                                  }
                                  className={`p-3 rounded-xl border text-left font-medium transition-all text-xs ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!isSubmitted ? (
                            <button
                              onClick={() => handleCheckQuiz(q.id)}
                              disabled={selected === undefined}
                              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-xs"
                            >
                              Cevabı Kontrol Et
                            </button>
                          ) : (
                            <div
                              className={`p-3 rounded-xl border text-xs leading-relaxed ${
                                isCorrect
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                  : 'bg-amber-50 text-amber-900 border-amber-200'
                              }`}
                            >
                              <strong>
                                {isCorrect ? '✓ Harika! Doğru cevap.' : '⚠️ Açıklama:'}
                              </strong>{' '}
                              {q.explanationTr}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Lütfen sol taraftan bir konu seçin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
