'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  Lock,
  Play,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  ArrowRight,
  RotateCcw,
  Award,
  BookOpen,
  Mic,
  X,
  Flame,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  TIMELINE_CURRICULUM,
  getCompletedTimelineNodeIds,
  markTimelineNodeCompleted,
  type TimelineNode,
  type TimelineUnit,
  type LevelTimeline,
} from '@/data/timelineCurriculum';
import { A1_GRAMMAR_LESSONS, A2_GRAMMAR_LESSONS, B1_GRAMMAR_LESSONS, B2_GRAMMAR_LESSONS, C1_GRAMMAR_LESSONS, C2_GRAMMAR_LESSONS, type GrammarLesson } from '@/data/grammarLessons';
import { speakEnglish } from '@/lib/audio';

export default function AppDashboardPage() {
  const { user, profile } = useAuth();

  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [collapsedUnits, setCollapsedUnits] = useState<Record<string, boolean>>({});

  // Active study modal
  const [studyModalNode, setStudyModalNode] = useState<TimelineNode | null>(null);
  const [quizAnswerIndex, setQuizAnswerIndex] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [readingSceneIndex, setReadingSceneIndex] = useState(0);

  const refreshProgress = () => {
    setCompletedNodeIds(getCompletedTimelineNodeIds());
  };

  useEffect(() => {
    refreshProgress();
    if (profile?.targetLevel) {
      setSelectedLevel(profile.targetLevel);
    }
    window.addEventListener('talkstage_timeline_updated', refreshProgress);
    return () => window.removeEventListener('talkstage_timeline_updated', refreshProgress);
  }, [profile]);

  const currentLevelTimeline = useMemo(() => {
    return (
      TIMELINE_CURRICULUM.find((l) => l.level === selectedLevel) ||
      TIMELINE_CURRICULUM[0]
    );
  }, [selectedLevel]);

  // Overall level statistics
  const totalLevelNodes = useMemo(() => {
    return currentLevelTimeline.units.reduce((acc, u) => acc + u.nodes.length, 0);
  }, [currentLevelTimeline]);

  const completedLevelNodesCount = useMemo(() => {
    const levelNodeIds = new Set(
      currentLevelTimeline.units.flatMap((u) => u.nodes.map((n) => n.id))
    );
    return completedNodeIds.filter((id) => levelNodeIds.has(id)).length;
  }, [currentLevelTimeline, completedNodeIds]);

  const levelProgressPct =
    totalLevelNodes > 0
      ? Math.min(100, Math.round((completedLevelNodesCount / totalLevelNodes) * 100))
      : 0;

  // Toggle unit collapse
  const toggleUnitCollapse = (unitId: string) => {
    setCollapsedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  // Find corresponding Grammar Lesson if applicable
  const getGrammarLessonForNode = (code?: string): GrammarLesson | null => {
    if (!code) return null;
    const all = [
      ...A1_GRAMMAR_LESSONS,
      ...A2_GRAMMAR_LESSONS,
      ...B1_GRAMMAR_LESSONS,
      ...B2_GRAMMAR_LESSONS,
      ...C1_GRAMMAR_LESSONS,
      ...C2_GRAMMAR_LESSONS,
    ];
    return all.find((l) => l.code === code) || null;
  };

  // Handle completing a node
  const handleCompleteNode = (node: TimelineNode) => {
    markTimelineNodeCompleted(node.id);
    setStudyModalNode(null);
    setQuizAnswerIndex(null);
    setQuizFeedback(null);
    setReadingSceneIndex(0);
  };

  // Determine node statuses sequentially
  // The first uncompleted node across the entire timeline is 'active';
  // anything completed is 'completed'; everything else is 'locked'.
  let foundFirstUncompleted = false;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* 1. TOP TITLE & CEFR LEVEL SELECTOR (BUSUU STYLE) */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
              <span>Tam İngilizce Kursu</span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Akıllı Yol Haritası
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gramer, okuma ve sesli konuşma zinciriyle İngilizceyi adım adım kalıcı refleks haline getirin.
            </p>
          </div>

          {/* Level Switcher Dropdown */}
          <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
            <label className="text-xs font-bold text-slate-500 font-mono">SEVİYE:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-xs text-indigo-700 outline-none focus:border-indigo-500 shadow-xs cursor-pointer"
            >
              {TIMELINE_CURRICULUM.map((lt) => (
                <option key={lt.level} value={lt.level}>
                  {lt.levelTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Overall Progress Bar Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-xs shrink-0"
              style={{
                backgroundColor: `${currentLevelTimeline.color}15`,
                color: currentLevelTimeline.color,
                border: `1px solid ${currentLevelTimeline.color}35`,
              }}
            >
              {currentLevelTimeline.level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {currentLevelTimeline.levelTitle} İlerlemesi
                </h3>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {completedLevelNodesCount} / {totalLevelNodes} Düğüm
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {currentLevelTimeline.cefrDesc}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 space-y-1.5 shrink-0">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-500">Tamamlanma</span>
              <span style={{ color: currentLevelTimeline.color }}>%{levelProgressPct}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${levelProgressPct}%`,
                  backgroundColor: currentLevelTimeline.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TIMELINE CHAPTERS & CONNECTED NODES */}
      <div className="space-y-8">
        {currentLevelTimeline.units.map((unit) => {
          const isCollapsed = collapsedUnits[unit.id] ?? false;
          const unitNodeIds = unit.nodes.map((n) => n.id);
          const unitCompletedCount = unitNodeIds.filter((id) =>
            completedNodeIds.includes(id)
          ).length;
          const unitProgressPct = Math.round(
            (unitCompletedCount / unit.nodes.length) * 100
          );

          return (
            <div
              key={unit.id}
              className="bg-white border-2 border-slate-200/90 rounded-3xl overflow-hidden shadow-sm transition-all"
            >
              {/* Unit Header Card */}
              <div
                onClick={() => toggleUnitCollapse(unit.id)}
                className="p-5 sm:p-6 bg-slate-50/80 hover:bg-slate-100/80 border-b border-slate-200/80 flex items-center justify-between gap-4 cursor-pointer transition-colors select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Bölüm {unit.unitNumber}:
                    </span>
                    <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                      {unit.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    {unit.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Unit Completion Tag */}
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-xs font-bold text-slate-700">
                      {unitCompletedCount} / {unit.nodes.length} Tamamlandı
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: unit.color }}
                    >
                      %{unitProgressPct}
                    </span>
                  </div>

                  <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-xs">
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Connected Timeline Chain */}
              {!isCollapsed && (
                <div className="p-6 sm:p-8 space-y-0 relative">
                  {unit.nodes.map((node, nodeIdx) => {
                    const isCompleted = completedNodeIds.includes(node.id);
                    let status: 'completed' | 'active' | 'locked' = 'locked';

                    if (isCompleted) {
                      status = 'completed';
                    } else if (!foundFirstUncompleted) {
                      status = 'active';
                      foundFirstUncompleted = true;
                    } else {
                      status = 'locked';
                    }

                    const isLastNode = nodeIdx === unit.nodes.length - 1;

                    return (
                      <div key={node.id} className="relative flex items-start gap-4 sm:gap-6 group">
                        {/* Left Vertical Connecting Line */}
                        {!isLastNode && (
                          <div
                            className={`absolute left-5 sm:left-6 top-12 bottom-0 w-1 -translate-x-1/2 rounded-full transition-colors ${
                              isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />
                        )}

                        {/* Node Status Circle Badge */}
                        <div className="relative z-10 shrink-0">
                          {status === 'completed' && (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-emerald-500/25 ring-4 ring-emerald-50">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                          )}

                          {status === 'active' && (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-indigo-600/35 ring-4 ring-indigo-100 animate-pulse">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>
                          )}

                          {status === 'locked' && (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center">
                              <Lock className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Node Card */}
                        <div
                          onClick={() => {
                            if (status !== 'locked') {
                              setStudyModalNode(node);
                            }
                          }}
                          className={`flex-1 mb-6 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                            status === 'active'
                              ? 'bg-indigo-50/70 border-2 border-indigo-500 shadow-md shadow-indigo-600/10 hover:bg-indigo-50'
                              : status === 'completed'
                              ? 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                              : 'bg-slate-50/50 border-slate-200/60 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-lg">{node.iconEmoji}</span>
                                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                  {node.title}
                                </h3>
                                {node.type === 'grammar' && (
                                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                                    Gramer
                                  </span>
                                )}
                                {node.type === 'reading' && (
                                  <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                                    Okuma & Dinleme
                                  </span>
                                )}
                                {node.type === 'scenario' && (
                                  <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                                    Canlı AI Sahnesi
                                  </span>
                                )}
                                {node.type === 'checkpoint' && (
                                  <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                                    Checkpoint
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500">{node.subtitle}</p>
                            </div>

                            {/* Right Action Button / Status */}
                            <div className="shrink-0 flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                +{node.xp} XP
                              </span>

                              {status === 'active' && (
                                <button className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1">
                                  <span>Başla</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {status === 'completed' && (
                                <span className="text-xs font-bold text-emerald-600 hidden sm:inline">
                                  Tekrar Et ➔
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE IN-APP STUDY MODAL (GRAMMAR, READING, SCENARIO & CHECKPOINT)  */}
      {/* ========================================================================= */}
      {studyModalNode && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{studyModalNode.iconEmoji}</span>
                  <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                    {studyModalNode.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500">{studyModalNode.subtitle}</p>
              </div>

              <button
                onClick={() => setStudyModalNode(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Type 1: GRAMMAR LESSON */}
            {studyModalNode.type === 'grammar' && (
              <div className="space-y-5">
                {(() => {
                  const lesson = getGrammarLessonForNode(studyModalNode.grammarCode);
                  if (!lesson) {
                    return (
                      <p className="text-xs text-slate-600">Ders içeriği yükleniyor...</p>
                    );
                  }
                  return (
                    <div className="space-y-4">
                      {/* Purpose */}
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-950 font-medium leading-relaxed">
                        <strong className="text-indigo-900 block mb-1">🎯 Neden ve Nerede Kullanılır?</strong>
                        {lesson.purpose}
                      </div>

                      {/* Mindmap / Formula Box */}
                      {lesson.mindmap && (
                        <div className="bg-slate-900 text-emerald-400 font-mono text-[11px] p-4 rounded-2xl overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                          {lesson.mindmap}
                        </div>
                      )}

                      {/* Key Examples with TTS Audio */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                          Örnek Cümleler:
                        </div>
                        {lesson.examples.slice(0, 3).map((ex, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs gap-3"
                          >
                            <div>
                              <div className="font-bold text-slate-900">&ldquo;{ex.en}&rdquo;</div>
                              <div className="text-slate-500 italic mt-0.5">🇹🇷 {ex.tr}</div>
                            </div>
                            <button
                              onClick={() => speakEnglish(ex.en)}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 cursor-pointer shrink-0"
                              title="Dinle"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Mini Quiz */}
                      {lesson.quiz && lesson.quiz.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                          <div className="text-xs font-bold text-slate-900">
                            Pekiştirme Sorusu: {lesson.quiz[0].question}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {lesson.quiz[0].options.map((opt, optIdx) => {
                              const isSelected = quizAnswerIndex === optIdx;
                              const isCorrect = optIdx === lesson.quiz![0].correctIndex;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setQuizAnswerIndex(optIdx);
                                    setQuizFeedback(isCorrect ? 'correct' : 'wrong');
                                  }}
                                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                                    isSelected
                                      ? isCorrect
                                      : 'bg-white border-slate-200 hover:border-indigo-300'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {quizFeedback === 'correct' && (
                            <div className="text-xs text-emerald-800 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                              ✓ Harika! {lesson.quiz[0].explanationTr}
                            </div>
                          )}
                          {quizFeedback === 'wrong' && (
                            <div className="text-xs text-red-700 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                              ❌ Tekrar dene! {lesson.quiz[0].explanationTr}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Modal Content Type 2: READING & AUDIO STORY */}
            {studyModalNode.type === 'reading' && (
              <div className="space-y-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 font-medium">
                  Bu hikayedeki cümleleri dinleyin, telaffuzlarını takip edin ve anlamlarını pekiştirin.
                </div>

                <div className="space-y-3">
                  {[
                    {
                      en: 'Hello! My name is Alex. I live in London and I am a software engineer.',
                      tr: 'Merhaba! Benim adım Alex. Londra\'da yaşıyorum ve yazılım mühendisiyim.',
                    },
                    {
                      en: 'Every morning, I drink a cup of coffee and review my daily tasks.',
                      tr: 'Her sabah bir fincan kahve içerim ve günlük görevlerimi gözden geçiririm.',
                    },
                    {
                      en: 'It is very nice to meet you. Let\'s practice speaking English together!',
                      tr: 'Sizinle tanıştığıma çok memnun oldum. Birlikte İngilizce konuşma pratiği yapalım!',
                    },
                  ].map((scene, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">&ldquo;{scene.en}&rdquo;</p>
                        <p className="text-xs text-slate-500 italic">🇹🇷 {scene.tr}</p>
                      </div>
                      <button
                        onClick={() => speakEnglish(scene.en)}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 cursor-pointer shrink-0 shadow-xs"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content Type 3: SCENARIO */}
            {studyModalNode.type === 'scenario' && (
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-bold text-purple-900">
                    🎙️ Canlı Yapay Zekâ Sahnesi
                  </div>
                  <p className="text-xs text-purple-950 leading-relaxed">
                    Bu sahnede yapay zekâ barista veya iş arkadaşınız rolüne geçer. 1.2s ultra hızlı ses motoruyla gerçek zamanlı konuşabilirsiniz.
                  </p>
                </div>

                <div className="flex justify-center pt-2">
                  <Link
                    href={`/app/scenarios/${studyModalNode.scenarioId || 'cafe_order'}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Canlı Sesli Sahneye Katıl ➔</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Modal Content Type 4: CHECKPOINT */}
            {studyModalNode.type === 'checkpoint' && (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 font-medium">
                  Tebrikler! Bölümdeki tüm düğümleri tamamladınız. Bu değerlendirmeyi bitirerek bir sonraki bölüme geçebilirsiniz.
                </div>

                <div className="space-y-3">
                  {studyModalNode.quizQuestions?.map((q, qIdx) => (
                    <div key={qIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                      <div className="text-xs font-bold text-slate-900">{q.question}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setQuizAnswerIndex(optIdx);
                              setQuizFeedback(optIdx === q.correctIndex ? 'correct' : 'wrong');
                            }}
                            className="p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 text-left hover:border-indigo-400 cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Complete Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Tamamlayınca +{studyModalNode.xp} XP Kazanacaksın</span>
              </span>

              <button
                onClick={() => handleCompleteNode(studyModalNode)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Tamamla & Bir Sonrakini Aç</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
