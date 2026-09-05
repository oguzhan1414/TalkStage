'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Award,
  Clock,
  Target,
} from 'lucide-react';
import PhoneFrame from './PhoneFrame';

const CEFR_JOURNEY = [
  {
    level: 'A1',
    title: 'Başlangıç (Beginner)',
    days: 30,
    topicCount: 12,
    color: '#10B981',
    badge: 'Hayatta Kalma & Tanışma',
    capabilities: [
      'Kendini, mesleğini ve kökenini tanıtabilme',
      'Kafede sipariş verme, saat ve fiyat sorabilme',
      'Günlük rutinleri geniş zamanda anlatabilme',
    ],
    bossChallenge: '☕ Sabah Kafesi & Kahve Siparişi Simülasyonu',
  },
  {
    level: 'A2',
    title: 'Temel (Elementary)',
    days: 45,
    topicCount: 10,
    color: '#0EA5E9',
    badge: 'Seyahat & Alışveriş',
    capabilities: [
      'Havalimanında aktarma ve kayıp bagajı tarif edebilme',
      'Geçmişte yaşanan bir tatili veya hatırayı anlatabilme',
      'Gelecek planlarını ve randevuları organize edebilme',
    ],
    bossChallenge: '✈️ Havalimanı Transit & Kayıp Bagaj Yönetimi',
  },
  {
    level: 'B1',
    title: 'Orta Düzey (Intermediate)',
    days: 60,
    topicCount: 10,
    color: '#6366F1',
    badge: 'İş & Mülakat',
    capabilities: [
      'Teknik standup toplantılarına katılıp blokajları aktarabilme',
      'Yazılım ve kariyer mülakatlarında STAR tekniğini kullanabilme',
      'Farklı fikirleri gerekçeleriyle savunabilme',
    ],
    bossChallenge: '💼 Kıdemli Yazılımcı Teknik İş Mülakatı',
  },
  {
    level: 'B2',
    title: 'İyi Düzey (Upper-Intermediate)',
    days: 75,
    topicCount: 8,
    color: '#8B5CF6',
    badge: 'Akıcı Tartışma & Teknik Sunum',
    capabilities: [
      'Karmaşık sistem mimarilerini ve trade-off kararlarını tartışabilme',
      'B2B kurumsal ürün sunumu ve müşteri itirazlarını yönetebilme',
      'Anlık spontane diyaloglarda kelime aramadan konuşabilme',
    ],
    bossChallenge: '📊 Kurumsal B2B Ürün Sunumu & CIO İtiraz Yönetimi',
  },
  {
    level: 'C1',
    title: 'İleri Düzey (Advanced)',
    days: 90,
    topicCount: 4,
    color: '#EC4899',
    badge: 'Liderlik & Strateji',
    capabilities: [
      'Büyük krizleri ve diplomatik müzakereleri yönetebilme',
      'İnce nüansları, mizahı ve kurumsal dili ustalıkla kullanabilme',
      'Akademik ve stratejik raporları sunabilme',
    ],
    bossChallenge: '🏛️ Global Strateji & İkna Müzakeresi',
  },
  {
    level: 'C2',
    title: 'Ustalık (Mastery)',
    days: 120,
    topicCount: 2,
    color: '#F59E0B',
    badge: 'Anadili Akıcılığı',
    capabilities: [
      'Ana dili İngilizce olan biri kadar doğal ve zahmetsiz konuşabilme',
      'Deyimler, kültürel metaforlar ve derin imaları anlayabilme',
    ],
    bossChallenge: '👑 Global Panel Keynote Konuşması',
  },
];

export default function CefrLevelJourney() {
  const [activeLevel, setActiveLevel] = useState('A1');
  const selected = CEFR_JOURNEY.find((j) => j.level === activeLevel) || CEFR_JOURNEY[0];

  return (
    <section id="curriculum" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Net & Ölçülebilir CEFR Yol Haritası</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A1&apos;den C2&apos;ye{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
              Konuşma Refleksi Kazanımı
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hangi seviyede ne kadar süre çalışacağınızı ve tamamladığınızda gerçek hayatta hangi kapıların açılacağını bilin.
          </p>
        </div>

        {/* Level Tab Switchers Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {CEFR_JOURNEY.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
            return (
              <button
                key={lvl.level}
                onClick={() => setActiveLevel(lvl.level)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg border-slate-900'
                    : 'bg-[#F8FAFC] hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-sm font-black ${isSelected ? 'text-cyan-300' : 'text-slate-900'}`}>
                    {lvl.level}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {lvl.days} Gün
                  </span>
                </div>
                <div className="text-xs font-bold mt-1 truncate">{lvl.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Active Level Detail Showcase Card */}
        <div className="bg-[#F8FAFC] border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                  {selected.level} Seviyesi
                </span>
                <span className="text-xs text-slate-500 font-semibold">• {selected.topicCount} Konu</span>
                <span className="text-xs text-slate-500 font-semibold">• {selected.days} Günlük Plan</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {selected.title}
              </h3>
            </div>

            {/* Boss Challenge Pill */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1 max-w-sm">
              <div className="text-[10px] font-mono font-bold text-amber-800 uppercase flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Seviye Sonu Boss Challenge:</span>
              </div>
              <div className="text-xs font-bold text-amber-950">{selected.bossChallenge}</div>
            </div>
          </div>

          {/* Capabilities Grid + Real Roadmap Screenshot */}
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Bu Seviyeyi Bitirdiğinde Gerçek Hayatta Neler Yapabileceksin?</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selected.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200/80 rounded-2xl p-4.5 space-y-2 shadow-xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-semibold leading-relaxed">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real screenshot: the actual Sahneler & Seviyeler roadmap screen */}
            <div className="mx-auto lg:mx-0">
              <PhoneFrame
                src="/images/app-screens/roadmap.png"
                alt="TalkStage mobil uygulama Sahneler & Seviyeler yol haritası ekranı"
                width={190}
                rotate="rotate-3"
              />
              <p className="mt-3 max-w-[190px] text-center text-[0.65rem] text-slate-500">
                Her konu kilitli başlar, öncekini bitirince açılır.
              </p>
            </div>
          </div>

          {/* Bottom Fast Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">
              Tüm seviyeler formül şemaları, görsel zihin haritaları ve sesli diyaloglarla donatılmıştır.
            </span>

            <Link
              href="/onboarding"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <span>{selected.level} Seviyesinden Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
