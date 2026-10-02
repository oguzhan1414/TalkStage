'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import {
  Mic,
  Sparkles,
  Volume2,
  Play,
  Flame,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Radio,
} from 'lucide-react';
import { speakEnglish } from '@/lib/audio';
import PhoneFrame from '@/components/PhoneFrame';
import { trackEvent } from '@/lib/analytics';

const DEMO_SCENARIOS = [
  {
    id: 'interview',
    label: '💼 FAANG Mülakatı',
    role: 'Kıdemli Yazılım Mühendisi',
    aiSpeaker: 'Alex (VP of Engineering - Google)',
    userTurn: 'We chose an asynchronous event-driven architecture with Kafka to eliminate database deadlocks under high load.',
    userTurnTr: 'Yüksek yük altında veritabanı kilitlenmelerini önlemek için Kafka ile asenkron olaya dayalı mimariyi seçtik.',
    aiResponse: 'Impressive architectural choice! How did you handle idempotency and message ordering during regional failovers?',
    aiResponseTr: 'Etkileyici bir mimari tercih! Bölgesel kesintilerde tekillik (idempotency) ve mesaj sıralamasını nasıl garanti ettiniz?',
    badge: 'STAR Metodu & B2+ Düzeyi',
    feedback: '✓ "Asynchronous", "Event-driven" ve "Deadlock" kavramları kusursuz bağlamda kullanıldı (+50 XP)',
    xp: 50,
  },
  {
    id: 'airport',
    label: '✈️ Havalimanı & Aktarma',
    role: 'Yolcu (Frankfurt Transit)',
    aiSpeaker: 'Sarah (Lufthansa Ground Lead)',
    userTurn: 'Excuse me, my flight from London was delayed by 40 minutes. Will I make my connecting flight to New York at Gate B12?',
    userTurnTr: 'Affedersiniz, Londra uçağım 40 dakika gecikti. B12 kapısındaki New York aktarma uçuşuma yetişebilecek miyim?',
    aiResponse: 'Let me scan your boarding pass. Gate B12 is just a 4-minute walk through the fast-track transit tunnel, you still have plenty of time!',
    aiResponseTr: 'Biniş kartınızı tarayayım. B12 kapısı hızlı geçiş tünelinden yalnızca 4 dakikalık mesafede, hala fazlasıyla vaktiniz var!',
    badge: 'Acil Seyahat İletişimi',
    feedback: '✓ "Connecting flight" ve "fast-track transit" kalıpları doğal telaffuzla seslendirildi (+35 XP)',
    xp: 35,
  },
  {
    id: 'standup',
    label: '💻 Daily Standup',
    role: 'Backend Engineer',
    aiSpeaker: 'David (Scrum Master)',
    userTurn: 'Yesterday I wrapped up the Stripe webhook refactor. Today I am diving into Redis cache invalidation. No blockers on my end.',
    userTurnTr: 'Dün Stripe webhook yenilemesini tamamladım. Bugün Redis önbellek temizleme katmanına odaklanıyorum. Engel yok.',
    aiResponse: 'Great progress! Make sure to pair with Sarah on staging before pushing to production this Friday.',
    aiResponseTr: 'Harika ilerleme! Cuma günkü canlı dağıtımdan önce Sarah ile staging üzerinde eşleşip test ettiğinden emin ol.',
    badge: 'Kıdemli Mühendis Jargonu',
    feedback: '✓ "Wrapped up", "Cache invalidation" ve "Blocker" kullanımı standartlara tam uyumlu (+45 XP)',
    xp: 45,
  },
  {
    id: 'cafe',
    label: '☕ Londra Kahvecisi',
    role: 'Müşteri (Kahve Siparişi)',
    aiSpeaker: 'Liam (Barista - Soho)',
    userTurn: 'Could I please get a large iced oat latte with an extra shot of espresso and a warm almond croissant?',
    userTurnTr: 'Büyük boy yulaf sütlü buzlu latte, ekstra bir shot espresso ve ılık bir bademli kruvasan alabilir miyim lütfen?',
    aiResponse: 'Sure thing! That will be £6.80. Would you like that to stay or for takeaway?',
    aiResponseTr: 'Tabii ki! Toplam 6.80£. Burada mı tüketeceksiniz yoksa paket mi olsun?',
    badge: 'Doğal Günlük Akıcılık',
    feedback: '✓ "Could I please get..." nezaket kalıbı ve sipariş akıcılığı 10/10 (+25 XP)',
    xp: 25,
  },
];

export default function Hero() {
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState('interview');
  const [focusedPhone, setFocusedPhone] = useState<'left' | 'right'>('left');
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [isPlayingAi, setIsPlayingAi] = useState(false);

  const scenario = DEMO_SCENARIOS.find((s) => s.id === activeScenarioId) || DEMO_SCENARIOS[0];

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.gsap-hero-badge', { y: -20, opacity: 0, duration: 0.7, delay: 0.1 })
        .from('.gsap-hero-title', { y: 30, opacity: 0, duration: 0.85 }, '-=0.5')
        .from('.gsap-hero-subtitle', { y: 20, opacity: 0, duration: 0.75 }, '-=0.6')
        .from('.gsap-hero-cta', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.gsap-hero-mockup', { y: 40, opacity: 0, scale: 0.95, duration: 1 }, '-=0.3')
        .from('.gsap-floating-pill', { scale: 0.6, opacity: 0, y: 15, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.5');

      gsap.to('.gsap-float-1', { y: -10, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.gsap-float-2', { y: 10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
      gsap.to('.gsap-float-3', { y: -8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 });
      gsap.to('.gsap-float-4', { y: 9, duration: 3.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.7 });
      gsap.to('.gsap-float-yanki', { y: -14, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    },
    { scope: heroContainerRef }
  );

  const handlePlayAudio = (text: string, isAi = false) => {
    if (isAi) {
      setIsPlayingAi(true);
      speakEnglish(text);
      setTimeout(() => setIsPlayingAi(false), 4500);
    } else {
      setIsPlayingUser(true);
      speakEnglish(text);
      setTimeout(() => setIsPlayingUser(false), 4500);
    }
  };

  return (
    <section
      ref={heroContainerRef}
      id="top"
      className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* 3D Sunlit Ambient Stage Wallpaper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40"
      >
        <Image
          src="/images/34_bg_hero_ambient.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-porcelain/60 to-porcelain" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center px-4 sm:px-6">
        {/* 1. Floating Gamified Badge */}
        <div className="gsap-hero-badge inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/95 px-4 py-1.5 text-[0.82rem] font-semibold text-heading shadow-[0_8px_20px_-6px_rgba(79,70,229,0.2)] backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-indigo font-bold">⚡ &lt;1.2s Real-Time Voice AI</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">6 CEFR Seviyesi (A1–C2) • 40 Canlı Sahne</span>
        </div>

        {/* 2. Headline */}
        <h1 className="gsap-hero-title mt-6 w-full text-balance break-words font-display text-4xl font-extrabold tracking-tight text-heading sm:text-6xl lg:text-[4.25rem] leading-[1.1]">
          İngilizce Konuşma Korkunu{' '}
          <span className="font-serif font-medium italic bg-linear-to-r from-indigo via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Gerçek Hayat Sahnelerinde
          </span>{' '}
          Yen.
        </h1>

        {/* 3. Subtitle */}
        <p className="gsap-hero-subtitle mt-6 w-full max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-xl">
          Kitaplardan kural ezberlemeyi bırak. 7/24 yargılamayan yapay zekâ koçunla iş mülakatına gir, teknik standup yönet, havalimanında aktarma yap; anında gramer ve telaffuz koçluğu al.
        </p>

        {/* 4. CTAs */}
        <div className="gsap-hero-cta mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'hero_primary' })}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo via-indigo-600 to-indigo-700 px-8 py-4 text-base font-bold text-white shadow-[0_18px_36px_-10px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_-8px_rgba(79,70,229,0.65)]"
          >
            <span>Hemen Ücretsiz Başla</span>
            <ArrowRight className="w-5 h-5 text-cyan-200" />
          </Link>

          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-4 text-base font-bold text-heading shadow-md transition-all hover:-translate-y-0.5 hover:bg-white hover:border-indigo-300"
          >
            <Play className="w-4 h-4 text-indigo fill-indigo" />
            <span>Web Stüdyosunu Aç</span>
          </Link>
        </div>

        {/* Security / Free badge */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Kredi Kartı İstemez
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mobil & Web Tek Ortak Hesap
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-indigo-500 animate-pulse" /> 1.2s Gerçek Zamanlı Ses
          </span>
        </div>

        {/* 5. DUAL-PHONE 3D PERSPECTIVE HERO SHOWCASE (INTERACTIVE DEPTH SWAP) */}
        <div className="gsap-hero-mockup relative mt-12 mb-6 w-full max-w-4xl flex items-center justify-center">
          {/* Ambient Glow Aura */}
          <div className="absolute w-[520px] h-[320px] bg-linear-to-r from-indigo-500/25 via-cyan-400/25 to-emerald-400/20 blur-3xl -z-10 rounded-full" />

          {/* Left / Primary Phone Mockup (home.png) */}
          <div
            onMouseEnter={() => setFocusedPhone('left')}
            onClick={() => setFocusedPhone('left')}
            className={`relative cursor-pointer transition-all duration-500 ease-out ${
              focusedPhone === 'left'
                ? 'z-30 scale-105 -rotate-2 -translate-y-3 drop-shadow-[0_25px_35px_rgba(79,70,229,0.35)]'
                : 'z-10 scale-95 -rotate-6 translate-y-6 opacity-75 hover:opacity-100'
            }`}
          >
            <PhoneFrame
              src="/images/app-screens/home.png"
              alt="TalkStage Ana Sayfa ve Çalışma Rotası"
              width={265}
              rotate=""
              priority
              glow={focusedPhone === 'left'}
            />
          </div>

          {/* Right / Secondary Phone Mockup (vocab-practice.png) */}
          <div
            onMouseEnter={() => setFocusedPhone('right')}
            onClick={() => setFocusedPhone('right')}
            className={`relative -ml-14 sm:-ml-20 cursor-pointer transition-all duration-500 ease-out ${
              focusedPhone === 'right'
                ? 'z-30 scale-105 rotate-2 -translate-y-3 drop-shadow-[0_25px_35px_rgba(6,182,212,0.35)]'
                : 'z-10 scale-95 rotate-6 translate-y-6 opacity-75 hover:opacity-100'
            }`}
          >
            <PhoneFrame
              src="/images/app-screens/vocab-practice.png"
              alt="TalkStage SM-2 Kelime Pratiği ve 3D Kartlar"
              width={255}
              rotate=""
              glow={focusedPhone === 'right'}
            />
          </div>

          {/* 3D Floating Yankı Mascot */}
          <div className="gsap-float-yanki absolute -right-2 sm:-right-8 -top-8 z-30 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none drop-shadow-[0_20px_30px_rgba(79,70,229,0.35)]">
            <Image
              src="/images/64_companion_yanki_transparent.png"
              alt="Yankı AI Sesli Yol Arkadaşı"
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>

          {/* Floating Glass Indicator Pills */}
          {/* Pill 1: Latency */}
          <div className="gsap-floating-pill gsap-float-1 absolute -left-4 sm:-left-12 top-12 z-30 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2 text-left shadow-[0_12px_30px_-8px_rgba(79,70,229,0.25)] backdrop-blur-md hidden xs:block">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo">
              <Zap className="w-3.5 h-3.5 fill-indigo" />
              <span>1.2s Ses Motoru</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-700">Deepgram + ElevenLabs</p>
          </div>

          {/* Pill 2: Live Correction */}
          <div className="gsap-floating-pill gsap-float-2 absolute -left-6 sm:-left-16 bottom-20 z-30 rounded-2xl border border-emerald-200 bg-white/95 px-3.5 py-2 text-left shadow-[0_12px_30px_-8px_rgba(16,185,129,0.25)] backdrop-blur-md hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Anlık Gramer Teşhisi</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-900">✓ STAR Metodu & Doğruluk: %98</p>
          </div>

          {/* Pill 3: Streak & Badges */}
          <div className="gsap-floating-pill gsap-float-3 absolute -right-4 sm:-right-12 bottom-24 z-30 rounded-2xl border border-amber-200 bg-white/95 px-3.5 py-2 text-left shadow-[0_12px_30px_-8px_rgba(245,158,11,0.25)] backdrop-blur-md hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>12 Günlük Seri</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-800">+593 XP • B1 Seviyesi Aktif</p>
          </div>

          {/* Pill 4: Real Decks */}
          <div className="gsap-floating-pill gsap-float-4 absolute right-16 -top-4 z-30 rounded-2xl border border-indigo-100 bg-white/95 px-3.5 py-2 text-left shadow-[0_12px_30px_-8px_rgba(79,70,229,0.2)] backdrop-blur-md hidden md:block">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo">
              <Award className="w-3.5 h-3.5" />
              <span>SM-2 Algoritması</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-700">900 Çekirdek Kelime</p>
          </div>
        </div>

        {/* 6. INTERACTIVE LIVE AUDIO SIMULATOR CARD */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/60 space-y-6 relative overflow-hidden backdrop-blur-md text-left">
            {/* Top Scenario Selector Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo" />
                <span>Canlı Sahne Simülasyonu Dene:</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {DEMO_SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScenarioId(s.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeScenarioId === s.id
                        ? 'bg-indigo text-white shadow-sm shadow-indigo-600/30'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation turns showcase */}
            <div className="space-y-4 text-left">
              {/* User Turn */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-indigo">Sen ({scenario.role})</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(scenario.userTurn, false)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo text-white font-mono font-bold text-[11px] hover:bg-indigo-600 transition-colors"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingUser ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingUser ? 'Seslendiriliyor...' : 'Sesli Dinle'}</span>
                  </button>
                </div>
                <p className="font-display text-sm font-bold text-slate-900 leading-snug">
                  &ldquo;{scenario.userTurn}&rdquo;
                </p>
                <p className="text-xs text-slate-500 italic">
                  🇹🇷 {scenario.userTurnTr}
                </p>
              </div>

              {/* Instant Feedback Pill */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-medium">
                  <span className="font-bold text-emerald-700">⚡ Anlık Koç Analizi:</span>
                  <span>{scenario.feedback}</span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>+{scenario.xp} XP</span>
                </span>
              </div>

              {/* AI Partner Response */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🤖</span>
                    <span className="font-bold text-slate-800">{scenario.aiSpeaker}</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(scenario.aiResponse, true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-[11px] transition-colors"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingAi ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingAi ? 'Seslendiriliyor...' : 'Yapay Zekâ Yanıtı'}</span>
                  </button>
                </div>
                <p className="font-display text-sm font-bold text-slate-900 leading-snug">
                  &ldquo;{scenario.aiResponse}&rdquo;
                </p>
                <p className="text-xs text-slate-500 italic">
                  🇹🇷 {scenario.aiResponseTr}
                </p>
              </div>
            </div>

            {/* Bottom Quick Callout */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Her konuşmanızda anlık gramer, akıcılık ve kelime zenginliği skoru üretilir.</span>
              </span>

              <Link
                href="/onboarding"
                onClick={() => trackEvent('cta_clicked', { location: 'hero_secondary' })}
                className="text-indigo hover:text-indigo-700 font-bold flex items-center gap-1 underline"
              >
                <span>Ücretsiz Kişiselleştirilmiş Planına Başla</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
