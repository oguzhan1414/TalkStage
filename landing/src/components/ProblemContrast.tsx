'use client';

import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const COMPARISONS = [
  {
    feature: 'Öğrenme Metodu',
    traditional: 'Ezberci çoktan seçmeli testler & gramer kurallarını kağıda yazma',
    talkstage: 'Canlı sesli senaryo rol yapma simülasyonları & gerçek hayat pratiği',
  },
  {
    feature: 'Konuşma Korkusu',
    traditional: 'Öğretmenin önünde hata yapmaktan utanma ve kilitlenme 😰',
    talkstage: '%100 yargısız AI ortamı — 100 hata yap, 100 şefkatli düzeltme al 🤗',
  },
  {
    feature: 'Kelime Eğitimi',
    traditional: 'Rastgele sözlük ezberi ve 3 gün sonra unutulan kelime listeleri',
    talkstage: 'Frekans sıralı 900 kelime + SM-2 bilimsel aralıklı tekrar sandığı 🧠',
  },
  {
    feature: 'Gramer Yaklaşımı',
    traditional: 'Sadece teorik kurallar, günlük konuşmaya dökememe',
    talkstage: '46 CEFR konusu: görsel zihin haritaları, sesli örnekler 🗺️',
  },
  {
    feature: 'Erişilebilirlik',
    traditional: 'Haftada 2 saat kursa gitme zorunluluğu ve yüksek ücretler',
    talkstage: '7/24 cebinde mobilde, masanda web stüdyosunda — tek hesap 📱',
  },
];

export default function ProblemContrast() {
  return (
    <section className="py-20 sm:py-28 bg-bg-pink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-pink-200/60 text-sm font-bold text-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-pop" />
            <span>Neden Geleneksel Yöntemler İşe Yaramıyor? 🤔</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
            Eski Usul vs.{' '}
            <span className="text-highlight-pink text-white">TalkStage</span>
          </h2>

          <p className="text-sm sm:text-base text-body max-w-2xl mx-auto leading-relaxed">
            İngilizceyi &ldquo;anlayıp konuşamamanın&rdquo; sebebi siz değilsiniz — eski sistemler!
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Eski Yöntemler */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-4 shadow-lg border border-red-100/60">
            <div className="flex items-center gap-3 pb-3 border-b border-red-100">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                ❌
              </div>
              <div>
                <h3 className="font-extrabold text-heading text-base">Eski & Geleneksel</h3>
                <p className="text-xs text-muted">Kurslar, özel dersler ve ezber uygulamaları</p>
              </div>
            </div>

            <div className="space-y-3">
              {COMPARISONS.map((c, i) => (
                <div key={i} className="bg-red-50/60 border border-red-100/60 rounded-2xl p-4 space-y-1">
                  <div className="text-[11px] font-mono font-bold text-red-500 uppercase">{c.feature}</div>
                  <div className="text-xs text-body flex items-start gap-2 leading-relaxed">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{c.traditional}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: TalkStage */}
          <div className="bg-card-lime rounded-[32px] p-6 sm:p-8 space-y-4 shadow-lg border border-lime-200/60">
            <div className="flex items-center gap-3 pb-3 border-b border-lime-200/40">
              <div className="w-10 h-10 rounded-2xl bg-lime-pop text-heading flex items-center justify-center font-bold text-lg shadow-md">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-heading text-base">TalkStage Deneyimi</h3>
                  <span className="text-[10px] font-mono font-bold bg-white text-pink-pop px-2 py-0.5 rounded-full border border-pink-200/60">
                    AI Destekli ✨
                  </span>
                </div>
                <p className="text-xs text-muted">Kişiselleştirilmiş simülasyon & anlık koçluk</p>
              </div>
            </div>

            <div className="space-y-3">
              {COMPARISONS.map((c, i) => (
                <div
                  key={i}
                  className="bg-white/70 border border-lime-200/60 rounded-2xl p-4 space-y-1 hover:border-emerald-300 transition-colors"
                >
                  <div className="text-[11px] font-mono font-bold text-emerald-600 uppercase">{c.feature}</div>
                  <div className="text-xs text-heading font-semibold flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{c.talkstage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-bold text-pink-pop hover:text-pink-600 transition-colors"
          >
            <span>Farkı Kendi Seviyenizde Test Edin 🎯</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
