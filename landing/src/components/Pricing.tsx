"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { trackEvent } from "@/lib/analytics";

const plans = [
  {
    name: "Free Stage",
    price: "0",
    unit: "TL",
    period: "her zaman",
    highlight: false,
    emoji: "🎭",
    badgeText: "Başlangıç",
    cardColor: "bg-card-blue",
    borderColor: "border-blue-200/60",
    features: [
      "Günde 1 sesli senaryo (5 dk)",
      "Temel 3 sahne (Standup, Kahve, Seyahat)",
      "Sınırsız kelime kartı & reading kütüphanesi",
      "Temel gramer ve akıcılık geri bildirimi",
    ],
    cta: "Ücretsiz Başla 🚀",
    ctaStyle: "bg-white hover:bg-slate-50 text-heading border border-slate-200 shadow-xs",
  },
  {
    name: "Stage Pass Pro",
    price: "199",
    unit: "TL",
    period: "/ ay",
    highlight: true,
    emoji: "⚡",
    badgeText: "En Çok Tercih Edilen 🔥",
    cardColor: "bg-heading",
    borderColor: "border-transparent",
    features: [
      "Sınırsız canlı sesli konuşma pratiği",
      "Tüm niş sahneler (FAANG, Vize, B2B)",
      "Anlık Türkçe açıklamalı gramer koçu",
      "Detaylı telaffuz ve hece analizi raporları",
      "Kişiselleştirilmiş SM-2 kelime tekrar motoru",
    ],
    cta: "Pro'ya Geç ✨",
    ctaStyle: "bg-lime-pop text-heading font-bold shadow-[0_10px_30px_-8px_rgba(211,255,95,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(211,255,95,0.7)]",
  },
  {
    name: "Stage Pass Yıllık",
    price: "1.490",
    unit: "TL",
    period: "/ yıl · %40 Tasarruf",
    highlight: false,
    emoji: "💎",
    badgeText: "Yıllık Avantaj",
    cardColor: "bg-card-purple",
    borderColor: "border-purple-200/60",
    features: [
      "Aylık Pro plandaki tüm özellikler",
      "Tüm yeni sahneler + erken erişim",
      "Haftalık detaylı gelişim raporu",
      "Çevrimdışı çalışma modu",
      "Öncelikli destek",
    ],
    cta: "Yıllık Planı Seç 💎",
    ctaStyle: "bg-white hover:bg-slate-50 text-heading border border-slate-200 shadow-xs",
  },
];

export default function Pricing() {
  return (
    <section id="fiyatlandirma" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:py-32 bg-white">
      {/* Subtle ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-0 w-[400px] h-[400px] rounded-full bg-purple-pop/8 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full bg-pink-pop/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card-purple border border-purple-200/60 text-sm font-bold text-heading shadow-xs mb-4">
            <span>💰</span>
            <span>Şeffaf Fiyatlandırma</span>
          </div>

          <h2 className="mt-2 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Ücretsiz başla, hazır olduğunda <span className="text-highlight">sahneyi büyüt</span> 🎤
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            Gizli ücret yok, taahhüt yok. İstediğin zaman tek tıkla iptal et!
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name + plan.period} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 transition-all duration-300 hover:-translate-y-2 card-playful ${
                  plan.highlight
                    ? `${plan.cardColor} text-white shadow-[0_30px_70px_-20px_rgba(38,38,38,0.35)]`
                    : `${plan.cardColor} shadow-lg border ${plan.borderColor}`
                }`}
              >
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-wider ${
                      plan.highlight
                        ? "bg-lime-pop text-heading shadow-xs"
                        : "bg-white/80 text-heading border border-slate-200/60"
                    }`}
                  >
                    {plan.badgeText}
                  </span>
                </div>

                <h3
                  className={`font-display text-xl font-bold ${plan.highlight ? "text-white" : "text-heading"}`}
                >
                  {plan.emoji} {plan.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className={`font-display text-4xl font-extrabold sm:text-5xl ${plan.highlight ? 'text-white' : 'text-heading'}`}>
                    {plan.price}
                    <span className="text-2xl">{plan.unit}</span>
                  </span>
                  <span className={`text-sm font-medium ${plan.highlight ? "text-white/60" : "text-muted"}`}>
                    {plan.period}
                  </span>
                </p>

                <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-6 ${plan.highlight ? 'border-white/20' : 'border-slate-200/60'}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.92rem] leading-relaxed">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${
                          plan.highlight ? "bg-lime-pop/30 text-lime-pop" : "bg-emerald/15 text-emerald"
                        }`}
                      >
                        ✓
                      </span>
                      <span className={plan.highlight ? "text-white/90" : "text-body"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#indir"
                  onClick={() => trackEvent('cta_clicked', { location: 'pricing', plan: plan.name })}
                  className={`mt-8 inline-flex items-center justify-center rounded-full py-3.5 text-[0.95rem] font-bold transition-all hover:-translate-y-0.5 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
