'use client';

import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COMPARISONS = [
  {
    feature: 'Öğrenme Metodu',
    traditional: 'Ezberci çoktan seçmeli testler & gramer kurallarını kağıda yazma',
    talkstage: 'Canlı sesli senaryo rol yapma simülasyonları & gerçek hayat pratiği',
  },
  {
    feature: 'Konuşma Korkusu & Çekince',
    traditional: 'Öğretmenin veya sınıfın önünde hata yapmaktan utanma ve kilitlenme',
    talkstage: '%100 yargısız yapay zeka ortamı; 100 hata yap, 100 şefkatli düzeltme al',
  },
  {
    feature: 'Kelime Eğitimi',
    traditional: 'Rastgele sözlük ezberi ve 3 gün sonra unutulan kelime listeleri',
    talkstage: 'Frekans sıralı 900 Çekirdek Kelime + SM-2 bilimsel aralıklı tekrar sandığı',
  },
  {
    feature: 'Gramer Yaklaşımı',
    traditional: 'Sadece teorik kurallar, formül mantığını günlük konuşmaya dökememe',
    talkstage: '46 CEFR konusu: Görsel zihin haritaları, özet tablolar ve sesli örnekler',
  },
  {
    feature: 'Erişilebilirlik & Cihazlar',
    traditional: 'Haftada sadece 2 saat kursa gitme zorunluluğu ve yüksek saatlik ücretler',
    talkstage: '7/24 cebinde mobilde, masanda web stüdyosunda tek ortak hesapla anında senkronize',
  },
];

export default function ProblemContrast() {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Neden Geleneksel Yöntemler İşe Yaramıyor?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Geleneksel Kurslar vs.{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">
              TalkStage Metodolojisi
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            İngilizceyi &ldquo;anlayıp konuşamamanın&rdquo; sebebi siz değilsiniz; pasif dinleme üzerine kurulu eski sistemler. TalkStage dili konuşarak refleks haline getirir.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl bg-[#F8FAFC]">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Left Header Col for Large Screens */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-slate-50/70 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg">
                  ❌
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Eski & Geleneksel Yöntemler</h3>
                  <p className="text-xs text-slate-500">Kurslar, özel dersler ve ezber uygulamaları</p>
                </div>
              </div>

              <div className="space-y-4">
                {COMPARISONS.map((c, i) => (
                  <div key={i} className="bg-white border border-red-100 rounded-2xl p-4 space-y-1 shadow-xs">
                    <div className="text-[11px] font-mono font-bold text-red-600 uppercase">{c.feature}</div>
                    <div className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{c.traditional}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right TalkStage Col */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-white space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/25">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base">TalkStage Deneyimi</h3>
                    <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                      Yapay Zeka Destekli
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Kişiselleştirilmiş simülasyon & anlık koçluk</p>
                </div>
              </div>

              <div className="space-y-4">
                {COMPARISONS.map((c, i) => (
                  <div
                    key={i}
                    className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-4 space-y-1 shadow-xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="text-[11px] font-mono font-bold text-indigo-700 uppercase">{c.feature}</div>
                    <div className="text-xs text-slate-900 font-semibold flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c.talkstage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fast CTA */}
        <div className="text-center pt-2">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 underline"
          >
            <span>Farkı Kendi Seviyenizde Test Edin ➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
