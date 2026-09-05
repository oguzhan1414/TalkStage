'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Sparkles,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Table,
  HelpCircle,
  Zap,
} from 'lucide-react';

const DEMO_GRAMMAR_TOPICS = [
  {
    id: 'a1_g01',
    code: 'A1_G01',
    level: 'A1 Başlangıç',
    title: 'Verb To Be (Am / Is / Are)',
    formula: '[Özne] + [am / is / are] + [İsim / Sıfat / Konum]',
    mindmap: `┌─────────────────────────┐
│    VERB TO BE (Olmak)   │
└────────────┬────────────┘
             │
     ┌───────┼───────┐
     ▼       ▼       ▼
    AM      IS      ARE
   ( I ) (He/She) (You/We)`,
    quiz: {
      question: 'Boşluğa hangisi gelmelidir? "The software architecture _____ highly scalable."',
      options: ['am', 'is', 'are', 'be'],
      correctIndex: 1,
      explanation: '"Software architecture" tekil bir üçüncü şahıs öznesidir (it), bu yüzden "is" kullanılır.',
    },
  },
  {
    id: 'b1_g01',
    code: 'B1_G01',
    level: 'B1 Orta Düzey',
    title: 'Present Perfect vs Past Simple',
    formula: 'have/has + V3 (Deneyim/Etki) VS V2 (Kesin Zaman: Yesterday, in 2023)',
    mindmap: `┌────────────────────────────────────────┐
│     PRESENT PERFECT vs PAST SIMPLE     │
└───────────────────┬────────────────────┘
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
[Present Perfect]           [Past Simple]
"I have deployed it."       "I deployed it yesterday."
(Zaman belirtilmez)          (Zaman bellidir)`,
    quiz: {
      question: 'Hangisi doğrudur? "I _____ the bug two hours ago."',
      options: ['have fixed', 'fixed', 'fixing', 'fixes'],
      correctIndex: 1,
      explanation: '"Two hours ago" kesin geçmiş zaman belirtir, bu yüzden Past Simple (fixed) kullanılır.',
    },
  },
  {
    id: 'b2_g01',
    code: 'B2_G01',
    level: 'B2 İyi Düzey',
    title: 'Inversion (Devrik Cümle Yapısı)',
    formula: 'Negative Adverbial + Auxiliary Verb + Subject + Main Verb',
    mindmap: `┌────────────────────────────────────────┐
│        INVERSION (Devrik Yapı)         │
└───────────────────┬────────────────────┘
                    │
         "Rarely / Seldom / Never"
                    │
   "Seldom have I seen such a robust API."`,
    quiz: {
      question: 'Hangisi doğru devrik cümledir?',
      options: [
        'Rarely I have seen this error.',
        'Rarely have I seen this error.',
        'Rarely did I saw this error.',
        'Rarely I see this error.',
      ],
      correctIndex: 1,
      explanation: 'Olumsuz zarf başa geldiğinde yardımcı fiil (have) özneden (I) önce gelir.',
    },
  },
];

export default function InteractiveGrammarShowcase() {
  const [activeTopicId, setActiveTopicId] = useState('a1_g01');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const topic = DEMO_GRAMMAR_TOPICS.find((t) => t.id === activeTopicId) || DEMO_GRAMMAR_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    setActiveTopicId(id);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const isCorrect = selectedQuizOption === topic.quiz.correctIndex;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#F7FAF8] text-slate-900 border-b border-emerald-100/80">
      {/* 3D Soft Sage Green Ambient Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-75"
      >
        <Image
          src="/images/bg_grammar_sage_warm.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAF8]/85 via-transparent to-[#F7FAF8]/95" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-xs backdrop-blur-md">
            <div className="relative w-4 h-4">
              <Image
                src="/images/25_card_reading_module.png"
                alt="Grammar Module"
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
            <span>46 CEFR Konulu Gramer Akademisi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Gramer Formülleri &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
              Görsel Zihin Haritaları
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Gramer kurallarını ezberlemek zorunda değilsiniz. Formül şemaları, karar ağaçları ve interaktif mini testlerle mantığını anında kavrayın.
          </p>
        </div>

        {/* Grand Light Grammar Showcase Box */}
        <div className="bg-white/95 border-2 border-emerald-200/80 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/5 backdrop-blur-xl">
          {/* Top Level/Topic Switcher Bar */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg border border-emerald-200 shrink-0">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {topic.code}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">{topic.title}</h3>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{topic.level} Seviyesi Müfredat Dersi</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {DEMO_GRAMMAR_TOPICS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTopic(t.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTopicId === t.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {t.level.split(' ')[0]} Konusu
                </button>
              ))}
            </div>
          </div>

          {/* Grammar Content Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Formula & Mindmap (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Formula Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 shadow-md">
                <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  ⚡ Cümle Dizilimi & Gramer Formülü:
                </div>
                <div className="text-sm font-mono font-bold text-white leading-relaxed">
                  {topic.formula}
                </div>
              </div>

              {/* Visual Mindmap */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🧠</span>
                  <span>Şematik Karar Ağacı:</span>
                </div>
                <pre className="bg-slate-900 text-emerald-300 font-mono text-[11px] p-4 rounded-2xl overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                  {topic.mindmap}
                </pre>
              </div>
            </div>

            {/* Right: Live Interactive Quiz (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Mini Test Sorusu</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  +20 XP
                </span>
              </div>

              <p className="text-xs font-bold text-slate-800 leading-snug">{topic.quiz.question}</p>

              {/* Options */}
              <div className="space-y-2">
                {topic.quiz.options.map((opt, i) => {
                  const isSelected = selectedQuizOption === i;
                  let style = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';
                  if (quizSubmitted) {
                    if (i === topic.quiz.correctIndex) {
                      style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      style = 'bg-red-50 border-red-400 text-red-900 line-through';
                    }
                  } else if (isSelected) {
                    style = 'bg-emerald-600 text-white font-bold border-emerald-600';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !quizSubmitted && setSelectedQuizOption(i)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedQuizOption === null}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
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
                  <strong>{isCorrect ? '✓ Harika! Doğru cevap.' : '⚠️ Çözüm:'}</strong>{' '}
                  {topic.quiz.explanation}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Fast Link */}
          <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              46 CEFR dersinin tamamında formül şemaları, sesli örnekler ve 5 soruluk testler mevcuttur.
            </span>

            <Link
              href="/app/grammar"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 underline"
            >
              <span>46 Konulu Gramer Akademisini Aç ➔</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
