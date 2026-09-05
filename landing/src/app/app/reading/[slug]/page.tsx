'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, Clock, BookOpenCheck, CheckCircle2, Award } from 'lucide-react';
import { getReadingPassage, completeReadingPassage } from '@/lib/reading';
import { speakEnglish } from '@/lib/audio';
import type { ReadingPassageOut } from '@/types/api';

export default function ReadingPassagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [passage, setPassage] = useState<ReadingPassageOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState<Record<number, boolean>>({});
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getReadingPassage(slug)
      .then((p) => {
        if (!cancelled) setPassage(p);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const allQuizChecked = passage ? passage.quiz.every((_, i) => quizChecked[i]) : true;

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await completeReadingPassage(slug);
      setCompleted(true);
      setTimeout(() => router.push('/app/study-path'), 1400);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-400">Parça yükleniyor...</div>;
  }

  if (error || !passage) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-3 shadow-xs">
        <p className="text-sm text-slate-500">Bu okuma parçası bulunamadı.</p>
        <Link href="/app/study-path" className="text-xs font-bold text-indigo-600 hover:underline">
          Çalışma Yoluna Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link href="/app/study-path" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Çalışma Yoluna Dön
      </Link>

      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {passage.cefr_level && (
            <span className="text-xs font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full border border-cyan-200/60">
              {passage.cefr_level}
            </span>
          )}
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {passage.estimated_minutes} dk
          </span>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{passage.title}</h1>
      </div>

      {/* Scenes */}
      {passage.scenes.length > 0 ? (
        <div className="space-y-3">
          {passage.scenes.map((scene, i) => (
            <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{scene.title}</span>
                <button
                  onClick={() => speakEnglish(scene.sentence_en)}
                  className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors shrink-0"
                  title="Dinle"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-relaxed">{scene.sentence_en}</p>
              <p className="text-xs text-slate-500 italic">🇹🇷 {scene.sentence_tr}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpenCheck className="w-3.5 h-3.5" /> Tam Metin
            </span>
            <button
              onClick={() => speakEnglish(passage.body_text)}
              className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors shrink-0"
              title="Dinle"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">{passage.body_text}</p>
        </div>
      )}

      {/* Quiz */}
      {passage.quiz.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            Anlama Testi ({passage.quiz.length} Soru)
          </h2>
          {passage.quiz.map((q, qi) => {
            const selected = quizAnswers[qi];
            const isChecked = quizChecked[qi];
            const isCorrect = selected === q.correct_index;
            return (
              <div key={qi} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900 text-sm">{q.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => {
                    const isOptionSelected = selected === oi;
                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';
                    if (isChecked) {
                      if (oi === q.correct_index) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      else if (isOptionSelected) btnStyle = 'bg-red-50 border-red-400 text-red-900 line-through';
                    } else if (isOptionSelected) {
                      btnStyle = 'bg-indigo-600 text-white font-bold border-indigo-600';
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => !isChecked && setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))}
                        className={`p-3 rounded-xl border text-left font-medium transition-all text-xs cursor-pointer ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isChecked ? (
                  <button
                    onClick={() => setQuizChecked((prev) => ({ ...prev, [qi]: true }))}
                    disabled={selected === undefined}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    Cevabı Kontrol Et
                  </button>
                ) : (
                  <div className={`p-3 rounded-xl border text-xs ${isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'}`}>
                    {isCorrect ? '✓ Doğru!' : `⚠️ Doğru cevap: ${q.options[q.correct_index]}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Complete button */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-slate-500">
          {completed ? 'Tamamlandı! Çalışma Yoluna dönülüyor...' : 'Metni okuyup dinledikten' + (passage.quiz.length > 0 ? ' ve testi çözdükten' : '') + ' sonra tamamla.'}
        </p>
        <button
          onClick={handleComplete}
          disabled={!allQuizChecked || completing || completed}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          {completed ? 'Tamamlandı' : completing ? 'Kaydediliyor...' : 'Parçayı Tamamla'}
        </button>
      </div>
    </div>
  );
}
