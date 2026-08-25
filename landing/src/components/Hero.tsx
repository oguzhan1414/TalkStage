"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const heroContainerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-hero-badge", { y: -20, opacity: 0, duration: 0.7, delay: 0.1 })
        .from(".gsap-hero-title", { y: 30, opacity: 0, duration: 0.85 }, "-=0.5")
        .from(".gsap-hero-subtitle", { y: 20, opacity: 0, duration: 0.75 }, "-=0.6")
        .from(".gsap-hero-yanki", { scale: 0.88, opacity: 0, duration: 1 }, "-=0.5")
        .from(".gsap-chat-bubble", { scale: 0.6, opacity: 0, y: 15, duration: 0.6, stagger: 0.12, ease: "back.out(1.7)" }, "-=0.4")
        .from(".gsap-hero-cta", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");

      // 2. Yankı Continuous Gentle Levitation
      gsap.to(".gsap-yanki-float", {
        y: -14,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Floating Chat Bubbles Subtle Float
      gsap.to(".gsap-bubble-1", { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".gsap-bubble-2", { y: 8, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      gsap.to(".gsap-bubble-3", { y: -6, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
      gsap.to(".gsap-bubble-4", { y: 7, duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });

      // 4. Audio Orbit Rings
      gsap.to(".gsap-orbit-1", { rotate: 360, duration: 26, repeat: -1, ease: "none" });
      gsap.to(".gsap-orbit-2", { rotate: -360, duration: 34, repeat: -1, ease: "none" });
    },
    { scope: heroContainerRef }
  );

  return (
    <section
      ref={heroContainerRef}
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* 3D Sunlit Ambient Stage Wallpaper (Seamless Full Canvas) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-45"
      >
        <Image
          src="/images/34_bg_hero_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white" />
      </div>

      {/* Central Radiant Voice Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[48%] h-[680px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-indigo/15 via-cyan/20 to-purple/15 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 sm:px-6 text-center">
        
        {/* Top Active Status Pill */}
        <div className="gsap-hero-badge">
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-body shadow-[var(--shadow-layered)] ring-1 ring-indigo/15">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
            <span>
              Yapay Zekâ Sahne Yoldaşın <strong className="text-indigo">Yankı ☕</strong> Canlı
            </span>
          </span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="gsap-hero-title mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.035em] text-balance text-heading sm:text-6xl lg:text-[4.25rem] leading-[1.08]">
          Gramer Ezberlemeyi Bırak.
          <br />
          <span className="bg-linear-to-r from-indigo via-indigo to-cyan bg-clip-text text-transparent">
            Yankı ile Sahneye Çık.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="gsap-hero-subtitle mt-3.5 max-w-xl text-balance text-sm leading-relaxed text-body sm:text-base">
          Yazılımcı standup&apos;ı, FAANG mülakatı veya vize görüşmesi... Sabah kahveni al,
          Yankı ile 5 dakika canlı konuş; takıldığın anda Türkçe anlık ipucuyla akıcılık kazan.
        </p>

        {/* GRAND TRANSPARENT LIVING YANKI STAGE WITH ANIMATED TALKING BUBBLES */}
        <div className="gsap-hero-yanki relative mt-8 flex w-full max-w-3xl flex-col items-center justify-center min-h-[340px] sm:min-h-[400px]">
          
          {/* Animated Audio Wave Orbit Rings around Yankı */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
          >
            <div className="gsap-orbit-1 absolute h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full border border-dashed border-indigo/25 opacity-70" />
            <div className="gsap-orbit-2 absolute h-[270px] w-[270px] sm:h-[350px] sm:w-[350px] rounded-full border border-cyan/35 opacity-70" />
            <div className="h-[220px] w-[220px] rounded-full bg-linear-to-tr from-indigo/20 via-cyan/25 to-purple/15 blur-[50px]" />
          </div>

          {/* 1. Top-Left Floating Bubble: Yankı Friendly Greeting */}
          <div className="gsap-chat-bubble gsap-bubble-1 absolute -left-2 top-2 sm:-left-6 sm:top-6 z-20 max-w-[210px] sm:max-w-[240px] rounded-2xl border border-white/90 bg-white/95 p-3 text-left shadow-[0_12px_30px_rgba(79,70,229,0.14)] backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo/10 text-xs">☕</span>
              <span className="font-display text-[0.72rem] font-bold text-heading">Yankı</span>
              <span className="ml-auto flex items-center gap-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo animate-bounce [animation-delay:0.4s]" />
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold leading-snug text-heading">
              &ldquo;Good morning! ☕ Hazırsan 5 dk pratik yapalım.&rdquo;
            </p>
          </div>

          {/* 2. Top-Right Floating Bubble: Latency & Speed Badge */}
          <div className="gsap-chat-bubble gsap-bubble-2 absolute -right-2 top-4 sm:-right-6 sm:top-8 z-20 flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(79,70,229,0.14)] backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald" />
            </span>
            <div className="text-left">
              <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700">
                Voice AI Gecikmesi
              </span>
              <span className="block font-display text-xs font-extrabold text-heading">
                &lt; 1.2s Gerçek Zamanlı
              </span>
            </div>
          </div>

          {/* 3. CENTER: PURE TRANSPARENT LIVING YANKI COFFEE CUP */}
          <div className="gsap-yanki-float relative z-10 flex flex-col items-center">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-visible transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/64_yanki_companion_floating_hero.png"
                alt="TalkStage Akıllı Ses Yoldaşı: Yankı"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                priority
                className="object-contain drop-shadow-[0_25px_50px_rgba(79,70,229,0.25)]"
              />
            </div>

            {/* Nameplate with live equalizer */}
            <div className="relative -mt-2 inline-flex items-center gap-2.5 rounded-full border border-white/90 bg-white/95 px-4 py-1.5 shadow-md backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald animate-ping" />
              <span className="font-display text-xs font-extrabold text-heading">Yankı ☕</span>
              <span className="text-muted text-xs">|</span>
              <span className="font-mono text-[0.68rem] font-bold text-indigo">Sahne Yoldaşın</span>
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-indigo rounded-full animate-[equalizer_0.6s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-cyan rounded-full animate-[equalizer_0.4s_ease-in-out_infinite_0.1s]" />
                <span className="w-0.5 bg-indigo rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.2s]" />
              </div>
            </div>
          </div>

          {/* 4. Bottom-Left Floating Bubble: Real-time Turkish Hint */}
          <div className="gsap-chat-bubble gsap-bubble-3 absolute -left-2 bottom-4 sm:-left-6 sm:bottom-6 z-20 max-w-[210px] sm:max-w-[240px] rounded-2xl border border-white/90 bg-white/95 p-3 text-left shadow-[0_12px_30px_rgba(79,70,229,0.14)] backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-xs">💡</span>
              <span className="font-display text-[0.72rem] font-bold text-amber-900">Anlık Teşhis</span>
            </div>
            <p className="mt-1 text-xs font-semibold leading-snug text-heading">
              &ldquo;Takıldığın anda Türkçe ipucuyla cümleni toparla.&rdquo;
            </p>
          </div>

          {/* 5. Bottom-Right Floating Bubble: 360 Scorecard */}
          <div className="gsap-chat-bubble gsap-bubble-4 absolute -right-2 bottom-6 sm:-right-6 sm:bottom-8 z-20 max-w-[200px] sm:max-w-[230px] rounded-2xl border border-white/90 bg-white/95 p-3 text-left shadow-[0_12px_30px_rgba(79,70,229,0.14)] backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald/15 text-xs text-emerald">✓</span>
              <span className="font-display text-[0.72rem] font-bold text-emerald-800">Akıcılık Karnesi</span>
            </div>
            <p className="mt-1 text-xs font-semibold leading-snug text-heading">
              %94 Telaffuz & Hece Raporu 🎯
            </p>
          </div>

        </div>

        {/* PRIMARY CALL TO ACTION BUTTONS */}
        <div className="gsap-hero-cta mt-8 flex flex-col items-center gap-3.5 sm:flex-row">
          <a
            href="#indir"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-br from-indigo to-cyan px-8 py-3.5 text-base font-semibold text-white shadow-[0_15px_30px_-8px_rgba(79,70,229,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-8px_rgba(79,70,229,0.55)]"
          >
            <span>Yankı ile Ücretsiz Başla</span>
            <span className="text-white/80">→</span>
          </a>
          <a
            href="#canli-simulasyon"
            className="glass-card inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-heading shadow-[var(--shadow-layered)] transition-all hover:-translate-y-0.5 hover:text-indigo"
          >
            <span>28s Tanıtım Filmini İzle ↓</span>
          </a>
        </div>

        {/* Rating & Social Proof */}
        <div className="mt-6 flex items-center gap-3 text-xs text-muted">
          <div className="flex text-amber-500 font-bold">★★★★★</div>
          <span className="font-bold text-heading">4.9 / 5.0</span>
          <span>•</span>
          <span>12.000+ aktif yazılımcı ve profesyonel</span>
        </div>

      </div>
    </section>
  );
}
