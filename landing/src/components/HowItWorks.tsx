"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const steps = [
  {
    n: "01",
    title: "Sahneni Seç",
    body: "Vize görüşmesi mi, standup mı, satış görüşmesi mi? Hedefine en yakın senaryoyu seç, AI karşı tarafın rolünü üstlensin.",
  },
  {
    n: "02",
    title: "Canlı Konuş",
    body: "Mikrofona konuş, AI 1.2 saniyeden kısa sürede cevap versin. Yazı değil, gerçek zamanlı sesli diyalog.",
  },
  {
    n: "03",
    title: "Anında Düzelt",
    body: "Hata yaptığın anda ekranda beliren Türkçe açıklamalı kartla öğren, kelimeyi tek dokunuşla defterine ekle.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Line Progress Fill on Scroll
      if (lineRef.current && stepsContainerRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 1,
            },
          }
        );
      }

      // 2. Step Numbers and Cards Pop-in
      if (stepsContainerRef.current) {
        const stepElements = stepsContainerRef.current.querySelectorAll(".step-item");
        gsap.fromTo(
          stepElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="nasil-calisir"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
            Nasıl Çalışır
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Üç adımda sahneye çık
          </h2>
        </div>

        <div
          ref={stepsContainerRef}
          className="relative mt-14 grid gap-8 sm:grid-cols-3"
        >
          {/* Animated Connecting Line with Scroll Scrub */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[28px] hidden h-[3px] bg-line sm:block"
          >
            <div
              ref={lineRef}
              className="h-full w-full bg-linear-to-r from-indigo via-cyan to-emerald will-change-transform"
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.n}
              className="step-item relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white font-display text-lg font-extrabold text-indigo shadow-[var(--shadow-layered)] ring-1 ring-line">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-heading">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
