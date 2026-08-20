"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const stageVisualRef = useRef<HTMLDivElement | null>(null);
  const bgAmbientRef = useRef<HTMLDivElement | null>(null);
  const floatingChipsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Hero Entrance Stagger Animation on Mount
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-hero-badge", {
        y: -30,
        opacity: 0,
        duration: 0.85,
        delay: 0.1,
      })
        .from(
          ".gsap-hero-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.95,
          },
          "-=0.6"
        )
        .from(
          ".gsap-hero-subtitle",
          {
            y: 30,
            opacity: 0,
            duration: 0.85,
          },
          "-=0.7"
        )
        .from(
          ".gsap-hero-cta",
          {
            y: 25,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.6"
        )
        .from(
          ".gsap-hero-social",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.5"
        )
        .fromTo(
          stageVisualRef.current,
          {
            y: 70,
            opacity: 0,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".gsap-float-chip",
          {
            scale: 0.6,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.6)",
          },
          "-=0.5"
        );

      // 2. Parallax Depth Scrub on Scroll
      if (stageVisualRef.current && heroContainerRef.current) {
        gsap.to(stageVisualRef.current, {
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
          y: 70,
          scale: 0.96,
          rotateX: 3,
          transformPerspective: 1400,
          ease: "none",
        });
      }

      if (bgAmbientRef.current && heroContainerRef.current) {
        gsap.to(bgAmbientRef.current, {
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
          yPercent: 20,
          ease: "none",
        });
      }
    },
    { scope: heroContainerRef }
  );

  // 3. Apple-Grade 3D Magnetic Cursor Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageVisualRef.current) return;
    const rect = stageVisualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 9;
    const rotateY = (x / rect.width) * 9;

    gsap.to(stageVisualRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1400,
      ease: "power2.out",
      duration: 0.4,
    });

    if (floatingChipsRef.current) {
      const chips = floatingChipsRef.current.children;
      gsap.to(chips[0], { x: x * 0.05, y: y * 0.05, duration: 0.4, ease: "power2.out" });
      gsap.to(chips[1], { x: -x * 0.06, y: -y * 0.06, duration: 0.4, ease: "power2.out" });
      gsap.to(chips[2], { x: x * 0.04, y: -y * 0.04, duration: 0.4, ease: "power2.out" });
      gsap.to(chips[3], { x: -x * 0.05, y: y * 0.05, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (!stageVisualRef.current) return;
    gsap.to(stageVisualRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.8,
    });

    if (floatingChipsRef.current) {
      const chips = floatingChipsRef.current.children;
      gsap.to(chips, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <section
      ref={heroContainerRef}
      id="top"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-32"
    >
      {/* 3D Ambient Sunlit Stage Background in Hero (34_bg_hero_ambient.png) */}
      <div
        ref={bgAmbientRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-45 will-change-transform"
      >
        <Image
          src="/images/34_bg_hero_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        {/* Soft bottom fade gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-white" />
      </div>

      {/* Subtle Indigo/Cyan Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[580px] w-[960px] -translate-x-1/2 rounded-full bg-linear-to-br from-indigo/12 via-cyan/10 to-transparent blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Live Pill Badge */}
        <div className="gsap-hero-badge">
          <span className="glass-card inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.825rem] font-medium text-body shadow-[var(--shadow-layered)] ring-1 ring-indigo/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-[pulse-dot_1.8s_ease-in-out_infinite] rounded-full bg-emerald" />
            </span>
            <span>
              Türkçe Konuşanlara Özel{" "}
              <strong className="font-semibold text-heading">
                Voice AI Simülatörü
              </strong>
            </span>
          </span>
        </div>

        {/* Main H1 Headline */}
        <h1
          ref={headlineRef}
          className="gsap-hero-title mt-7 max-w-4xl font-display text-[2.75rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance text-heading sm:text-6xl lg:text-[4.75rem]"
        >
          Gramer Ezberlemeyi Bırak.
          <br />
          <span className="bg-linear-to-r from-indigo via-indigo to-cyan bg-clip-text text-transparent">
            Gerçek Sahnede Konuş.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="gsap-hero-subtitle mt-6 max-w-2xl text-balance text-lg leading-[1.65] text-body sm:text-xl">
          Yazılımcı standup&apos;ı, FAANG mülakatı veya konsolosluk vize görüşmesi...
          Yapay zekâ ile canlı rol yap, takıldığın anda Türkçe anlık teşhis kartıyla
          özgüven kazan.
        </p>

        {/* Primary CTA Buttons */}
        <div className="gsap-hero-cta mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#indir"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-br from-indigo to-cyan px-8 py-3.5 text-[1.05rem] font-semibold text-white shadow-[0_15px_30px_-8px_rgba(79,70,229,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-8px_rgba(79,70,229,0.55)]"
          >
            <span>Hemen Ücretsiz Başla</span>
            <span className="text-white/80">→</span>
          </a>
          <a
            href="#canli-simulasyon"
            className="glass-card inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[1.05rem] font-semibold text-heading shadow-[var(--shadow-layered)] transition-all hover:-translate-y-0.5 hover:text-indigo cursor-pointer group"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo/10 transition-colors group-hover:bg-indigo group-hover:text-white">
              <svg className="ml-0.5 h-3 w-3 fill-current text-indigo group-hover:text-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>Canlı Simülasyonu İncele ↓</span>
          </a>
        </div>

        {/* Social Proof & Rating Stack */}
        <div className="gsap-hero-social mt-9 flex items-center gap-4 rounded-full border border-line/80 bg-white/85 px-4 py-2 shadow-xs backdrop-blur-md">
          <div className="relative h-9 w-24 overflow-hidden rounded-full ring-2 ring-white">
            <Image
              src="/images/33_avatars_user_trio.png"
              alt="TalkStage Aktif Öğrencileri"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="text-left text-xs leading-snug text-body">
            <div className="flex items-center gap-1">
              <span className="text-amber-500 font-bold">★★★★★</span>
              <span className="font-bold text-heading">4.9 / 5.0</span>
            </div>
            <span className="text-muted">12.000+ yazılımcı ve profesyonel</span>
          </div>
        </div>

        {/* Grand Masterpiece 3D Hero Trio Showcase with Multi-Layer Parallax Chips */}
        <div
          ref={stageVisualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mt-14 w-full max-w-5xl sm:mt-18 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative">
            {/* Floating Glass Chips with Multi-Layer Parallax */}
            <div
              ref={floatingChipsRef}
              className="pointer-events-none absolute inset-0 z-20 hidden md:block"
            >
              {/* Chip 1: Tech Standup */}
              <div className="gsap-float-chip absolute -left-6 top-8 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.09)] backdrop-blur-xl ring-1 ring-indigo/10">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-base">
                  💻
                </span>
                <div className="text-left">
                  <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-wider text-indigo">
                    Yazılımcı Standup&apos;ı
                  </span>
                  <span className="block text-xs font-bold text-heading">
                    &quot;Wrapped up the OAuth PR&quot;
                  </span>
                </div>
              </div>

              {/* Chip 2: Voice AI Latency */}
              <div className="gsap-float-chip absolute -right-6 top-10 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.09)] backdrop-blur-xl ring-1 ring-emerald/15">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald shadow-xs" />
                </span>
                <div className="text-left">
                  <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700">
                    Voice AI Gecikmesi
                  </span>
                  <span className="block font-mono text-xs font-bold text-heading">
                    &lt; 1.2s Gerçek Zamanlı
                  </span>
                </div>
              </div>

              {/* Chip 3: Embassy Visa Approved */}
              <div className="gsap-float-chip absolute -right-4 bottom-14 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.09)] backdrop-blur-xl ring-1 ring-cyan/15">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan/15 text-base font-bold text-cyan-800">
                  ✈️
                </span>
                <div className="text-left">
                  <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-wider text-cyan-800">
                    Konsolosluk & Seyahat
                  </span>
                  <span className="block text-xs font-bold text-heading">
                    Vize Onay Oranı %96
                  </span>
                </div>
              </div>

              {/* Chip 4: Real-time Turkish Diagnostic */}
              <div className="gsap-float-chip absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.09)] backdrop-blur-xl ring-1 ring-emerald/15">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald/15 text-sm font-bold text-emerald">
                  ✓
                </span>
                <div className="text-left">
                  <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted">
                    Anlık Hata Teşhisi
                  </span>
                  <span className="block text-xs font-bold text-heading">
                    Doğrusu: <span className="text-emerald font-extrabold">&quot;I agree with you&quot;</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Pristine Masterpiece Glass Showcase */}
            <div className="group relative overflow-hidden rounded-[34px] border border-white/80 bg-white/90 p-3 shadow-[0_30px_90px_-15px_rgba(79,70,229,0.22)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_40px_110px_-15px_rgba(79,70,229,0.32)] sm:p-4">
              <div className="relative overflow-hidden rounded-[26px] bg-slate-50">
                <Image
                  src="/images/40_hero_dynamic_trio_stage.png"
                  alt="TalkStage 3D Canlı Sahnesi: Kod konuşan yazılımcı, toplantı yöneten tech lead ve dünyayı gezen öğrenci"
                  width={1920}
                  height={1080}
                  priority
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  className="h-auto w-full rounded-[26px] object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
