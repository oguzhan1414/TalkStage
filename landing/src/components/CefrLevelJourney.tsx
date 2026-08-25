"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const levels = [
  {
    code: "A1",
    name: "Başlangıç",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "hover:border-emerald-500/40",
    badge: "/images/47_level_a1_sprout_starter.png",
    target: "İlk Cümleler & Özgüven",
    desc: "Kendini tanıtma, selamlaşma, temel ihtiyaçları donmadan ve korkusuzca ifade etme.",
    scenario: "Basit Tanışma & Sipariş",
  },
  {
    code: "A2",
    name: "Temel Seviye",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "hover:border-cyan-500/40",
    badge: "/images/48_level_a2_cyan_shield.png",
    target: "Günlük Akış & Seyahat",
    desc: "Otel rezervasyonu, havalimanı kontrolü ve günlük rutinleri rahatça konuşabilme.",
    scenario: "Havalimanı & Yol Tarifi",
  },
  {
    code: "B1",
    name: "Orta Seviye",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "hover:border-indigo-500/40",
    badge: "/images/49_level_b1_indigo_shield.png",
    target: "Akıcı Sohbet & Fikirler",
    desc: "Düşüncelerini aktarma, geçmiş deneyimleri anlatma, anlık Türkçe ipuçlarıyla akıcılık kazanma.",
    scenario: "Coffee Chat & Deneyimler",
  },
  {
    code: "B2",
    name: "İleri-Orta",
    color: "from-purple-500/20 to-purple-500/5",
    border: "hover:border-purple-500/40",
    badge: "/images/50_level_b2_violet_shield.png",
    target: "Kariyer & Mülakatlar",
    desc: "Yazılımcı standup toplantısı, FAANG mülakatı ve konsolosluk vize görüşmesinde tam hakimiyet.",
    scenario: "Tech Standup & Vize Mülakatı",
  },
  {
    code: "C1",
    name: "Akıcı Profesyonel",
    color: "from-amber-500/20 to-amber-500/5",
    border: "hover:border-amber-500/40",
    badge: "/images/51_level_c1_gold_shield.png",
    target: "Müzakere & Liderlik",
    desc: "B2B müşteri görüşmeleri, teknik argüman savunma ve küresel toplantıları yönetebilme.",
    scenario: "B2B Satış & Fiyat İtirazı",
  },
  {
    code: "C2",
    name: "Usta Seviye",
    color: "from-blue-500/20 to-purple-500/10",
    border: "hover:border-indigo-500/50",
    badge: "/images/52_level_c2_diamond_crown.png",
    target: "Native Düzeyi & Nüanslar",
    desc: "Karmaşık felsefi, teknik ve profesyonel tartışmalarda anadil akıcılığında konuşma ustalığı.",
    scenario: "Global Keynote & Tartışma",
  },
];

export default function CefrLevelJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (gridRef.current && sectionRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="seviyeler"
      className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            CEFR Konuşma Yolculuğu
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            A1&apos;den C2&apos;ye Adım Adım Konuşma Kalkanını Yükselt
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-body sm:text-lg">
            Hangi seviyede olursan ol; kendi temponda başla, her canlı sahnede yeni kelimeler öğren ve seviye rozetini gururla parlat.
          </p>
        </div>

        {/* 6 CEFR Cards Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {levels.map((lvl) => (
            <div
              key={lvl.code}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-white p-6 shadow-[var(--shadow-layered)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(79,70,229,0.12)] ${lvl.border}`}
            >
              {/* Background ambient glow */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 -z-10 bg-linear-to-br ${lvl.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div>
                {/* Top: 3D Shield Badge + Level Header */}
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={lvl.badge}
                      alt={`TalkStage ${lvl.code} ${lvl.name} Seviye Rozeti`}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">
                        {lvl.code} Seviyesi
                      </span>
                    </div>
                    <h3 className="mt-0.5 font-display text-lg font-bold text-heading">
                      {lvl.name}
                    </h3>
                    <span className="text-xs font-medium text-emerald-700">
                      {lvl.target}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-body">
                  {lvl.desc}
                </p>
              </div>

              {/* Bottom Target Scenario Pill */}
              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3 text-[0.72rem]">
                <span className="font-medium text-muted">Örnek Sahne:</span>
                <span className="font-mono font-semibold text-heading">
                  {lvl.scenario}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
