'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import {
  Mic,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
} from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame';
import MockupHomeScreen from '@/components/mockups/MockupHomeScreen';
import MockupVocabScreen from '@/components/mockups/MockupVocabScreen';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const heroContainerRef = useRef<HTMLElement | null>(null);

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
      gsap.to('.gsap-float-yanki', { y: -14, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    },
    { scope: heroContainerRef }
  );

  return (
    <section
      ref={heroContainerRef}
      id="top"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Colorful Ambient Background Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Pink blob top-left */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-pop/15 blur-[120px]" />
        {/* Blue blob top-right */}
        <div className="absolute -top-20 -right-40 w-[450px] h-[450px] rounded-full bg-blue-pop/12 blur-[100px]" />
        {/* Lime blob bottom-center */}
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-lime-pop/20 blur-[100px]" />
        {/* Purple blob mid-right */}
        <div className="absolute top-1/2 -right-20 w-[300px] h-[300px] rounded-full bg-purple-pop/10 blur-[80px]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4 sm:px-6">
        {/* 1. Fun Badge */}
        <div className="gsap-hero-badge inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2 text-sm font-bold text-heading shadow-[0_8px_28px_rgba(0,0,0,0.06)] border border-white/70 backdrop-blur-md">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>🎙️ Yapay Zeka İngilizce Koçun</span>
          <span className="text-pink-pop">•</span>
          <span className="text-muted">7/24 Açık</span>
        </div>

        {/* 2. Big, Fun, Bold Headline */}
        <h1 className="gsap-hero-title mt-8 w-full text-balance break-words font-display text-[2.75rem] font-extrabold tracking-tight text-heading sm:text-6xl lg:text-7xl leading-[1.08]">
          İngilizce{' '}
          <span className="text-highlight">Konuş</span>,{' '}
          Korkma! 🚀
        </h1>

        {/* 3. Short, Fun Subtitle */}
        <p className="gsap-hero-subtitle mt-5 w-full max-w-xl text-balance text-lg leading-relaxed text-body sm:text-xl">
          Yapay zeka koçunla <strong className="text-heading">gerçek hayat senaryolarında</strong> pratik yap. İş mülakatı, havalimanı, kahveci... <span className="text-pink-pop font-semibold">Günde 5 dakika yeter! ⚡</span>
        </p>

        {/* 4. Single Big CTA */}
        <div className="gsap-hero-cta mt-10 flex flex-col items-center gap-4">
          <Link
            href="/onboarding"
            onClick={() => trackEvent('cta_clicked', { location: 'hero_primary' })}
            className="group inline-flex items-center gap-3 rounded-full bg-heading px-10 py-5 text-lg font-bold text-white shadow-[0_20px_50px_-12px_rgba(38,38,38,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-10px_rgba(38,38,38,0.5)]"
          >
            <span>Ücretsiz Deneme Dersine Başla</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted font-medium mt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald" /> Kredi Kartı İstemez
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald" /> iOS & Android & Web
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 12.000+ Kullanıcı
            </span>
          </div>
        </div>

        {/* 5. Phone Mockups with Floating Pills */}
        <div className="gsap-hero-mockup relative mt-14 mb-4 w-full max-w-3xl flex items-center justify-center">
          {/* Ambient Glow Aura */}
          <div className="absolute w-[500px] h-[300px] bg-linear-to-r from-pink-pop/20 via-blue-pop/15 to-lime-pop/20 blur-3xl -z-10 rounded-full" />

          {/* Left Phone: Living Home Screen Mockup */}
          <div className="relative z-20 transition-all duration-500 ease-out drop-shadow-[0_30px_50px_rgba(239,93,168,0.25)] hover:scale-[1.02] hover:-translate-y-1">
            <PhoneFrame
              width={260}
              rotate="-rotate-2"
              priority
              glow
              theme="light"
            >
              <MockupHomeScreen />
            </PhoneFrame>
          </div>

          {/* Right Phone: Living Vocab Screen Mockup */}
          <div className="relative -ml-12 sm:-ml-16 z-10 transition-all duration-500 ease-out drop-shadow-[0_30px_50px_rgba(89,136,255,0.25)] hover:scale-[1.02] hover:-translate-y-1">
            <PhoneFrame
              width={250}
              rotate="rotate-3"
              glow={false}
              theme="light"
            >
              <MockupVocabScreen />
            </PhoneFrame>
          </div>

          {/* 3D Floating Mivo Mascot */}
          <div className="gsap-float-yanki absolute -right-4 sm:-right-12 -top-6 z-30 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none drop-shadow-[0_20px_30px_rgba(155,109,255,0.3)]">
            <Image
              src="/images/64_companion_yanki_transparent.png"
              alt="Mivo AI Sesli Yol Arkadaşı"
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>

          {/* Floating Pill 1: XP */}
          <div className="gsap-floating-pill gsap-float-1 absolute -left-2 sm:-left-10 top-8 z-30 rounded-2xl bg-card-orange px-4 py-2.5 text-left shadow-[0_12px_30px_-8px_rgba(255,138,80,0.3)] border border-orange-200/60 hidden xs:block">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700">
              <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span>+50 XP Kazanıldı! 🎉</span>
            </div>
            <p className="text-[11px] font-semibold text-orange-600/80">STAR Metodu Kullanıldı</p>
          </div>

          {/* Floating Pill 2: Live Correction */}
          <div className="gsap-floating-pill gsap-float-2 absolute -left-4 sm:-left-14 bottom-16 z-30 rounded-2xl bg-card-mint px-4 py-2.5 text-left shadow-[0_12px_30px_-8px_rgba(52,211,153,0.3)] border border-emerald-200/60 hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Anlık Gramer Koçu ✨</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-600/80">Doğruluk: %98 • B2+ Seviye</p>
          </div>

          {/* Floating Pill 3: Streak */}
          <div className="gsap-floating-pill gsap-float-3 absolute -right-2 sm:-right-10 bottom-20 z-30 rounded-2xl bg-card-pink px-4 py-2.5 text-left shadow-[0_12px_30px_-8px_rgba(239,93,168,0.25)] border border-pink-200/60 hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-700">
              <Flame className="w-4 h-4 fill-pink-400 text-pink-400" />
              <span>12 Günlük Seri 🔥</span>
            </div>
            <p className="text-[11px] font-semibold text-pink-600/80">593 XP • B1 Seviyesi</p>
          </div>
        </div>

        {/* 6. Fun Scenario Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {['💼 İş Mülakatı', '✈️ Havalimanı', '☕ Kahveci', '💻 Tech Standup', '🎓 Vize Görüşmesi', '📞 Müşteri Desteği'].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-heading border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-pink-pop/40 transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
