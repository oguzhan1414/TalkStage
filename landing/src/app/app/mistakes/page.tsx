'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2, Loader2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { GrammarMistakeOut } from '@/types/api';

const SOURCE_LABELS: Record<string, string> = {
  text_chat: 'Yazarak Sohbet',
  mini_quiz: 'Mini Quiz',
  reading: 'Okuma',
};

function sourceLabel(source: string): string {
  return SOURCE_LABELS[source] ?? source;
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
  const [filter, setFilter] = useState<string | 'all'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<GrammarMistakeOut[]>('/progress/mistakes')
      .then(setMistakes)
      .catch(() => setMistakes([]))
      .finally(() => setLoading(false));
  }, []);

  const sources = Array.from(new Set(mistakes.map((m) => m.source)));
  const filtered = mistakes.filter((m) => filter === 'all' || m.source === filter);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.delete(`/progress/mistakes/${id}`);
      setMistakes((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Delete mistake failed', err instanceof ApiError ? err.message : err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 shrink-0 hidden sm:block">
          <Image src="/images/mistakes_notebook.jpg" alt="" fill sizes="56px" className="object-cover rounded-2xl" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Hata Defteri 📝
            </h1>
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200/60">
              {mistakes.length} Kayıt
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Yazarak Sohbet ve pratiklerde yapay zekanın gerçekten tespit ettiği hatalar burada
            toplanır — düzeltmesiyle birlikte, kalıcı öğrenmen için.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 flex items-center justify-center gap-2 text-slate-400 text-xs">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Hatalar yükleniyor...</span>
        </div>
      ) : mistakes.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto text-emerald-500 text-2xl">
            ✓
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Henüz kayıtlı bir hatan yok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Yazarak Sohbet'te veya mini testlerde bir gramer hatası yaptığında, yapay zekanın
            düzeltmesi otomatik olarak burada birikmeye başlayacak.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sources.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Tümü ({mistakes.length})
              </button>
              {sources.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filter === s
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {sourceLabel(s)} ({mistakes.filter((m) => m.source === s).length})
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {sourceLabel(item.source)}
                    </span>
                    {item.topic_code && (
                      <span className="text-slate-500 font-medium">📍 {item.topic_code}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">{formatDate(item.created_at)}</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      title="Sil"
                      className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50/60 border border-red-200/70 rounded-xl p-3 text-xs space-y-1">
                    <div className="text-[10px] font-mono font-bold text-red-600 uppercase">
                      ❌ Söylenen İfade:
                    </div>
                    <div className="font-semibold text-red-950 font-mono line-through">
                      {item.wrong_text}
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-3 text-xs space-y-1">
                    <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                      ✓ Doğru & Doğal Karşılık:
                    </div>
                    <div className="font-bold text-emerald-950 font-mono">{item.corrected_text}</div>
                  </div>
                </div>

                {item.explanation_tr && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                    💡 <strong>Açıklama:</strong> {item.explanation_tr}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
