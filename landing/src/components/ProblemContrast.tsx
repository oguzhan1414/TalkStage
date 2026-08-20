"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const oldWay = [
  "Kelime kartlarını ezberle, çoktan seçmeli bulmaca çöz",
  "500 gün streak yapıp restoranda sipariş verirken donup kal",
  "Karşındaki bir insan değil, mekanik puan toplama ekranı",
  "Mülakata girdiğinde beynin tercüme yapmaktan kilitlenir",
];

const talkStageWay = [
  "Yapay zekâ ile canlı sesli rol yapma simülasyonu",
  "Hata yaptığın anda Türkçe açıklamayla doğru kalıbı öğren",
  "Vize memuru, FAANG mülakatçısı veya müşteri seni dinler",
  "Sahneye her çıktığında biraz daha az donar, akıcı konuşursun",
];

export default function ProblemContrast() {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Image scale and focus on scroll
      if (imageWrapperRef.current && containerRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // 2. Comparison Cards Staggered Pop-in
      if (cardsRef.current && containerRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-coral">
            Sessiz Kilitlenme (Silent Freeze) Problemi
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            500 gün streak yaptın ama gerçek bir konuşmada kilitlendin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-body">
            Gramer bulmaca oyunları seni ekranla konuşturur. TalkStage ise seni gerçek bir sahneye çıkarır ve anında konuşturur.
          </p>
        </div>

        {/* 3D Visual Comparison with GSAP Scroll Zoom */}
        <div
          ref={imageWrapperRef}
          className="mt-12 overflow-hidden rounded-[28px] border border-line bg-white p-2 shadow-[var(--shadow-lifted)] sm:p-3 will-change-transform"
        >
          <Image
            src="/images/04_problem_comparison.jpg"
            alt="Solda bulmaca çözerken donan öğrenci, sağda mikrofonla özgüvenle konuşan TalkStage kullanıcısı"
            width={1400}
            height={790}
            className="h-auto w-full rounded-[22px]"
          />
        </div>

        {/* Comparison Cards with GSAP Stagger Entrance */}
        <div ref={cardsRef} className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Old Traditional Way */}
          <div className="rounded-[24px] border border-line bg-porcelain/80 p-7">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                ✕
              </span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
                Geleneksel Bulmaca Yöntemi
              </h3>
            </div>
            <ul className="mt-5 space-y-3.5">
              {oldWay.map((line) => (
                <li key={line} className="flex gap-3 text-[0.95rem] leading-relaxed text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted/60" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TalkStage Live Stage Way */}
          <div className="relative rounded-[24px] border border-indigo/20 bg-linear-to-br from-indigo/5 via-cyan/5 to-white p-7 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-xs font-bold text-white shadow-xs">
                ✓
              </span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-indigo">
                TalkStage Sahne Yöntemi
              </h3>
            </div>
            <ul className="mt-5 space-y-3.5">
              {talkStageWay.map((line) => (
                <li key={line} className="flex gap-3 text-[0.95rem] font-medium leading-relaxed text-heading">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
