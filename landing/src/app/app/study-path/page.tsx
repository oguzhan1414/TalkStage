'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  BookOpenCheck,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { CEFR_CURRICULUM, isTopicCompleted, type CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { listReadingPassages, getCompletedReadingSlugs } from '@/lib/reading';
import { getSavedVocabCards, syncCloudVocabCards } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import type { ReadingPassageOut } from '@/types/api';

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type CefrCode = (typeof CEFR_ORDER)[number];

const UNIT_SIZE = 3;

type PathNode =
  | { kind: 'grammar'; key: string; topic: CurriculumTopic }
  | { kind: 'reading'; key: string; passage: ReadingPassageOut };

type PathUnit = { unitNumber: number; nodes: PathNode[] };

/** Groups a level's grammar topics into fixed-size units and interleaves one
 * reading passage per unit (round-robin, filtered to the same CEFR level) —
 * the "smart reading + grammar in one sequential path" shape the user asked
 * for, built from data that already exists (no new content model needed). */
function buildUnits(topics: CurriculumTopic[], readings: ReadingPassageOut[], level: CefrCode): PathUnit[] {
  const levelReadings = readings
    .filter((r) => (r.cefr_level || '').toUpperCase() === level)
    .sort((a, b) => a.sort_order - b.sort_order);

  const units: PathUnit[] = [];
  let readingCursor = 0;
  for (let i = 0; i < topics.length; i += UNIT_SIZE) {
    const chunk = topics.slice(i, i + UNIT_SIZE);
    const nodes: PathNode[] = chunk.map((t) => ({ kind: 'grammar' as const, key: `g_${t.code}`, topic: t }));
    const reading = levelReadings[readingCursor];
    if (reading) {
      nodes.push({ kind: 'reading' as const, key: `r_${reading.slug}`, passage: reading });
      readingCursor += 1;
    }
    units.push({ unitNumber: units.length + 1, nodes });
  }
  return units;
}

export default function StudyPathPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const userLevel = (profile?.targetLevel as CefrCode) || 'A1';

  const [selectedLevel, setSelectedLevel] = useState<CefrCode>(userLevel);
  const [savedWordsLower, setSavedWordsLower] = useState<Set<string>>(new Set());
  const [readings, setReadings] = useState<ReadingPassageOut[]>([]);
  const [completedReadingSlugs, setCompletedReadingSlugs] = useState<Set<string>>(new Set());
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.targetLevel && CEFR_ORDER.includes(profile.targetLevel as CefrCode)) {
      setSelectedLevel(profile.targetLevel as CefrCode);
    }
  }, [profile?.targetLevel]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([syncCloudVocabCards(), listReadingPassages().catch(() => []), getCompletedReadingSlugs().catch(() => [])]).then(
      ([cards, allReadings, doneSlugs]) => {
        if (cancelled) return;
        setSavedWordsLower(new Set(cards.map((c) => c.term.trim().toLowerCase())));
        setReadings(allReadings);
        setCompletedReadingSlugs(new Set(doneSlugs));
        setLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const currentCurriculum = CEFR_CURRICULUM[selectedLevel];
  const units = useMemo(
    () => buildUnits(currentCurriculum?.topics || [], readings, selectedLevel),
    [currentCurriculum, readings, selectedLevel]
  );

  const flatNodes = useMemo(() => units.flatMap((u) => u.nodes), [units]);
  const unitStartIndices = useMemo(() => {
    const starts: number[] = [];
    let running = 0;
    for (const u of units) {
      starts.push(running);
      running += u.nodes.length;
    }
    return starts;
  }, [units]);

  const doneFlags = useMemo(
    () =>
      flatNodes.map((n) => (n.kind === 'grammar' ? isTopicCompleted(n.topic, savedWordsLower) : completedReadingSlugs.has(n.passage.slug))),
    [flatNodes, savedWordsLower, completedReadingSlugs]
  );

  const firstIncompleteIndex = doneFlags.findIndex((d) => !d);
  const allDone = firstIncompleteIndex === -1 && flatNodes.length > 0;

  // Auto-expand whichever unit contains the current (next actionable) node.
  useEffect(() => {
    if (loading || expandedUnit !== null || flatNodes.length === 0) return;
    const targetIndex = allDone ? flatNodes.length - 1 : firstIncompleteIndex;
    for (let i = units.length - 1; i >= 0; i--) {
      if (unitStartIndices[i] <= targetIndex) {
        setExpandedUnit(units[i].unitNumber);
        break;
      }
    }
  }, [loading, flatNodes.length, firstIncompleteIndex, allDone, units, unitStartIndices, expandedUnit]);

  const handleSelectLevel = (lvl: CefrCode) => {
    setSelectedLevel(lvl);
    setExpandedUnit(null);
  };

  const handleNodeClick = (node: PathNode, locked: boolean) => {
    if (locked) return;
    if (node.kind === 'grammar') {
      router.push(`/app/grammar?level=${selectedLevel}&topic=${node.topic.code}`);
    } else {
      router.push(`/app/reading/${node.passage.slug}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Çalışma Yolu 🧭</h1>
          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
            Gramer + Akıllı Okuma
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Gramer konuları ve okuma &amp; dinleme parçaları tek bir sırada — bir düğümü tamamlamadan bir sonraki açılmaz.
        </p>
      </div>

      {/* Level ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {CEFR_ORDER.map((lvl) => {
          const isSelected = selectedLevel === lvl;
          const isUserCurrent = userLevel === lvl;
          const count = CEFR_CURRICULUM[lvl]?.topics.length || 0;
          return (
            <button
              key={lvl}
              onClick={() => handleSelectLevel(lvl)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md border-slate-900'
                  : isUserCurrent
                    ? 'bg-emerald-50/80 text-slate-900 border-2 border-emerald-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black">{lvl}</span>
                {isUserCurrent && <span className="text-[9px] font-bold bg-emerald-500 text-white px-1 py-0.5 rounded">Mevcut</span>}
              </div>
              <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>{count} Konu</div>
            </button>
          );
        })}
      </div>

      {/* Path */}
      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-xs text-slate-400 shadow-xs">Yol yükleniyor...</div>
      ) : units.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-xs text-slate-400 shadow-xs">
          Bu seviye için henüz içerik yok.
        </div>
      ) : (
        <div className="space-y-4">
          {units.map((unit, unitIdx) => {
            const unitStartIndex = unitStartIndices[unitIdx];
            const unitDoneCount = unit.nodes.filter((_, i) => doneFlags[unitStartIndex + i]).length;
            const isExpanded = expandedUnit === unit.unitNumber;
            const isUnitFullyDone = unitDoneCount === unit.nodes.length;

            return (
              <div key={unit.unitNumber} className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
                <button
                  onClick={() => setExpandedUnit(isExpanded ? null : unit.unitNumber)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                        isUnitFullyDone ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {isUnitFullyDone ? <CheckCircle2 className="w-4 h-4" /> : unit.unitNumber}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">Bölüm {unit.unitNumber}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {unitDoneCount}/{unit.nodes.length} tamamlandı
                      </div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-1">
                    {unit.nodes.map((node, i) => {
                      const idx = unitStartIndex + i;
                      const isDone = doneFlags[idx];
                      const isCurrent = idx === firstIncompleteIndex;
                      const isLocked = !isDone && !isCurrent && firstIncompleteIndex !== -1 && idx > firstIncompleteIndex;
                      const isLast = i === unit.nodes.length - 1;
                      const title = node.kind === 'grammar' ? node.topic.title : node.passage.title;
                      const description = node.kind === 'grammar' ? node.topic.description : 'Akıllı okuma & dinleme parçası';

                      return (
                        <div key={node.key} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <button
                              onClick={() => handleNodeClick(node, isLocked)}
                              disabled={isLocked}
                              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isDone
                                  ? 'bg-emerald-500 text-white shadow-md'
                                  : isCurrent
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-100 cursor-pointer hover:scale-105'
                                    : isLocked
                                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                      : 'bg-white border-2 border-indigo-200 text-indigo-500 cursor-pointer hover:border-indigo-400'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4" />
                              ) : node.kind === 'grammar' ? (
                                <GraduationCap className="w-5 h-5" />
                              ) : (
                                <BookOpenCheck className="w-5 h-5" />
                              )}
                            </button>
                            {!isLast && <div className={`w-0.5 flex-1 min-h-[2rem] ${isDone ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                          </div>

                          <div className={`flex-1 pb-6 ${isLocked ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                  node.kind === 'grammar' ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-700'
                                }`}
                              >
                                {node.kind === 'grammar' ? '📚 Gramer' : '📖 Okuma & Dinleme'}
                              </span>
                              {isCurrent && <span className="text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded">Sıradaki</span>}
                              {node.kind === 'reading' && (
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {node.passage.estimated_minutes} dk
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 mt-1">{title}</h3>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{description}</p>
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
      )}
    </div>
  );
}
