"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const features = [
  {
    title: "1.2 Saniye Ultra Düşük Gecikme",
    body: "WebSocket ve cümle parçalama (streaming chunking) sayesinde yapay zekâ yanıtını beklemezsin; gerçek bir insan gibi anında karşılık verir.",
  },
  {
    title: "Türkçe Açıklamalı Anlık Teşhis",
    body: "'I am agree with database' dediğinde konuşmayı bölmeden kenarda renkli kart açılır: 'Agree fiildir, am ile kullanılmaz.'",
  },
  {
    title: "Tek LLM Çağrısında Çift Çıktı",
    body: "Ayrı bir analiz motoru bekleyip gecikme yaşamazsın. Yapay zekâ tek çağrıda hem konuşma cevabını hem hatanı üretir.",
  },
  {
    title: "Oturum Sonu 360° Skor Karnesi",
    body: "Akıcılık skoru, konuşma süresi, kullanılan kelime sayısı ve düzeltilen hatalarınla tam teşekküllü performans raporu.",
  },
];

export default function FeedbackShowcase() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleStartVideo = () => {
    setIsPlayingVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  return (
    <section id="geri-bildirim" className="grain-overlay relative scroll-mt-24 overflow-hidden bg-ink px-6 py-24 sm:py-32">
      {/* Backstage spotlight ambience */}
      <div aria-hidden className="spotlight-glow pointer-events-none absolute left-1/2 top-0 -z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 blur-[40px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: Text & Key Advantages */}
          <Reveal>
            <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-gold-light">
              Canlı Geri Bildirim & AI Motoru
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Konuşman bittiğinde ne kadar iyi olduğunu tahmin etmezsin
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/65">
              TalkStage, her cümleni anlık olarak fonetik ve gramer filtresinden geçirir, konuşurken seni durdurmadan doğru kalıbı öğretir.
            </p>

            <ul className="mt-8 space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo to-gold text-xs font-bold text-white shadow-xs">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-1 text-[0.925rem] leading-relaxed text-white/60">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: Interactive 3D Live Voice & Scorecard Simulator */}
          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-lg">
              {/* Background Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-72 w-72 rounded-full bg-linear-to-br from-gold/25 via-indigo/20 to-transparent blur-[70px]"
              />

              <div className="glass-card relative rounded-[28px] border border-white/10 bg-white/95 p-6 shadow-[var(--shadow-lifted),0_0_100px_-25px_rgba(227,167,63,0.4)] sm:p-8">
                {/* 3D Live Speech Video / Scorecard Banner */}
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-line/60 bg-slate-950">
                  {isPlayingVideo ? (
                    <div className="relative h-full w-full">
                      <video
                        ref={videoRef}
                        src="/videos/hero_demo.mp4"
                        autoPlay
                        controls
                        playsInline
                        onEnded={() => setIsPlayingVideo(false)}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPlayingVideo(false)}
                        className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur-md transition-colors hover:bg-black/80 cursor-pointer"
                      >
                        Karneye Dön ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      className="group relative h-full w-full cursor-pointer"
                      onClick={handleStartVideo}
                    >
                      <Image
                        src="/images/29_ui_scorecard_celebration.png"
                        alt="TalkStage 360 Skor Karnesi Kutlaması: 100 Puan ve Alkışlayan Eller"
                        fill
                        sizes="(max-width: 768px) 100vw, 512px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play Badge */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/15 transition-all duration-300 group-hover:bg-black/25">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-indigo shadow-md ring-2 ring-white/60 transition-transform duration-300 group-hover:scale-110">
                          <svg className="ml-0.5 h-5 w-5 fill-indigo" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span className="mt-2.5 rounded-full bg-heading/90 px-3 py-1 text-[0.68rem] font-semibold text-white shadow-xs backdrop-blur-md">
                          Canlı Ses Simülasyonunu İzle (6 sn)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-line/60 bg-porcelain p-3.5">
                    <span className="font-display text-xl font-extrabold text-heading">06:12</span>
                    <span className="mt-0.5 block text-[0.72rem] font-medium text-muted">Konuşma</span>
                  </div>
                  <div className="rounded-2xl border border-line/60 bg-porcelain p-3.5">
                    <span className="font-display text-xl font-extrabold text-indigo">64</span>
                    <span className="mt-0.5 block text-[0.72rem] font-medium text-muted">Eşsiz Kelime</span>
                  </div>
                  <div className="rounded-2xl border border-line/60 bg-porcelain p-3.5">
                    <span className="font-display text-xl font-extrabold text-emerald">3</span>
                    <span className="mt-0.5 block text-[0.72rem] font-medium text-muted">Düzeltme</span>
                  </div>
                </div>

                {/* Real-time Turkish Correction Card Preview */}
                <div className="mt-5 rounded-2xl border border-emerald/20 bg-emerald/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white">✓</span>
                    <span className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-emerald-700">
                      Anlık Düzeltme Örneği
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 line-through">
                    &quot;I am work here for 3 years&quot;
                  </p>
                  <p className="mt-1 text-sm font-semibold text-heading">
                    &quot;I have been working here for 3 years&quot;
                  </p>
                  <p className="mt-1.5 text-xs text-body">
                    💡 <em>Geçmişte başlayıp halen süren durumlarda Present Perfect Continuous kullanılır.</em>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
