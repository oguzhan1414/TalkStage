"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SimulatorShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const theaterContainerRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Theater Zoom & Float on Scroll (Kayma & Büyüme Efekti)
      if (theaterContainerRef.current && sectionRef.current) {
        gsap.fromTo(
          theaterContainerRef.current,
          { y: 45, scale: 0.96, opacity: 0.85 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            scrollTrigger: {
              trigger: theaterContainerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Feature Cards Stagger Entrance Underneath
      if (featuresRef.current) {
        const cards = featuresRef.current.children;
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const handleStartPlayback = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  return (
    <section
      ref={sectionRef}
      id="canli-simulasyon"
      className="relative scroll-mt-24 overflow-hidden bg-porcelain px-6 py-24 sm:py-32"
    >
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-indigo/10 via-cyan/8 to-transparent blur-[120px]"
      />

      <div className="mx-auto max-w-5xl">
        {/* Section Heading Intro */}
        <div className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            3D Canlı Simülatör & Tanıtım Sahnesi
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Avucunun İçinde Gerçek Zamanlı Voice AI Deneyimi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-body sm:text-lg">
            Sadece dinleme veya okuma değil; konuştuğun anda 1.2 saniyede yanıt veren ve takıldığında
            Türkçe anlık ipucu düşüren akıllı sahne teknolojisini 28 saniyelik filmimizde keşfet.
          </p>
        </div>

        {/* Grand Full-Width Cinema Theater Player */}
        <div
          ref={theaterContainerRef}
          className="mt-12 overflow-hidden rounded-[34px] border border-white/80 bg-white/95 p-3 shadow-[0_30px_90px_-15px_rgba(79,70,229,0.2)] backdrop-blur-md sm:p-4 will-change-transform"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[26px] bg-slate-950">
            {isPlaying ? (
              <div className="relative h-full w-full">
                <video
                  ref={videoRef}
                  src="/videos/talkstage_official_trailer_30s.mp4"
                  autoPlay
                  controls
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  className="absolute right-4 top-4 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-black/80 cursor-pointer"
                >
                  Kapağa Dön ✕
                </button>
              </div>
            ) : (
              <div
                className="group relative h-full w-full cursor-pointer"
                onClick={handleStartPlayback}
              >
                <Image
                  src="/images/03_hero_3d_mockup.jpg"
                  alt="TalkStage 3D Sinematik Tanıtım Filmi Kapağı"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Dark Overlay with Large Glowing Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 transition-all duration-300 group-hover:bg-black/35">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-indigo shadow-[0_20px_45px_rgba(79,70,229,0.45)] ring-4 ring-white/60 transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                    <svg className="ml-1 h-9 w-9 fill-indigo sm:h-10 sm:w-10" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div className="mt-5 flex items-center gap-2 rounded-full bg-heading/90 px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    <span>3D Resmi Tanıtım Filmini Başlat (28 sn) ▶</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3-Column Key Technology Highlights Underneath the Cinema */}
        <div ref={featuresRef} className="mt-12 grid gap-6 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-2xs transition-all hover:border-indigo/30 hover:shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald/15 font-mono text-lg font-bold text-emerald">
                ⚡
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-heading">
                  &lt; 1.2s Düşük Gecikme
                </h3>
                <span className="text-xs text-muted">Doğal konuşma ritmi</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-body">
              Yapay zekâ ses altyapımız yanıt süresini milisaniyeler seviyesinde tutar. Düşünme duraksaması olmadan akıcı diyalog kurarsınız.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-2xs transition-all hover:border-indigo/30 hover:shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/10 text-lg font-bold text-indigo">
                💡
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-heading">
                  Türkçe Teşhis Motoru
                </h3>
                <span className="text-xs text-muted">Akışı bölmeyen kartlar</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-body">
              &quot;I am agree&quot; dediğinizde konuşmanız bölünmez; ekranda neden &quot;I agree&quot; olduğunu açıklayan Türkçe kart belirir.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-2xs transition-all hover:border-indigo/30 hover:shadow-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan/15 text-lg font-bold text-cyan-800">
                🎯
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-heading">
                  360° Hece ve Telaffuz
                </h3>
                <span className="text-xs text-muted">Detaylı geri bildirim</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-body">
              Her senaryo sonunda konuştuğunuz süre, kelime zenginliği ve fonetik doğruluk oranınız puanlanır ve kaydedilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
