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
    badgeText: "Başlangıç",
    features: [
      "Günde 1 sesli senaryo (5 dk)",
      "Temel 3 sahne (Standup, Kahve, Seyahat)",
      "Sınırsız kelime kartı & reading kütüphanesi",
      "Temel gramer ve akıcılık geri bildirimi",
    ],
    cta: "Ücretsiz Başla",
    ctaStyle: "border border-line bg-white hover:bg-slate-50 text-heading shadow-xs",
  },
  {
    name: "Stage Pass Pro",
    price: "199",
    unit: "TL",
    period: "/ ay",
    highlight: true,
    badgeText: "En Çok Tercih Edilen",
    features: [
      "Sınırsız canlı sesli konuşma pratiği",
      "Tüm niş sahneler (FAANG Mülakatı, Vize, B2B)",
      "Anlık Türkçe açıklamalı gramer & fonetik koçu",
      "Detaylı telaffuz ve hece analizi raporları",
      "Kişiselleştirilmiş SM-2 kelime tekrar motoru",
    ],
    cta: "Pro'ya Geç",
    ctaStyle: "bg-linear-to-br from-indigo to-indigo-dark text-white shadow-[0_10px_25px_-5px_rgba(227,167,63,0.45)] hover:shadow-[0_15px_35px_-5px_rgba(227,167,63,0.6)]",
  },
  {
    name: "Stage Pass Yıllık",
    price: "1.490",
    unit: "TL",
    period: "/ yıl · %40 Tasarruf",
    highlight: false,
    badgeText: "Yıllık Avantaj",
    features: [
      "Aylık Pro plandaki tüm özellikler",
      "Tüm yeni eklenecek sahneler + erken erişim",
      "Haftalık detaylı gelişim ve karne raporu",
      "Çevrimdışı okuma & kelime çalışma modu",
      "Öncelikli destek",
    ],
    cta: "Yıllık Planı Seç",
    ctaStyle: "border border-line bg-white hover:bg-slate-50 text-heading shadow-xs",
  },
];

export default function Pricing() {
  return (
    <section id="fiyatlandirma" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:py-32">
      {/* 3D Pricing Ambient Background (35_bg_pricing_ambient.png) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-35"
      >
        <Image
          src="/images/35_bg_pricing_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white via-white/40 to-white" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
            Şeffaf Fiyatlandırma
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Ücretsiz başla, hazır olduğunda sahneyi büyüt
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-body">
            Gizli ücret veya taahhüt yok. İstediğin zaman tek tıkla iptal et.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name + plan.period} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.highlight
                    ? "grain-overlay border-2 border-gold/30 bg-ink text-white shadow-[var(--shadow-lifted),0_0_80px_-30px_rgba(227,167,63,0.5)]"
                    : "border border-line bg-white/90 shadow-[var(--shadow-layered)] backdrop-blur-xs"
                }`}
              >
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider ${
                      plan.highlight
                        ? "bg-linear-to-r from-gold to-gold-light text-[#402c05] shadow-xs"
                        : "bg-porcelain text-indigo border border-line"
                    }`}
                  >
                    {plan.badgeText}
                  </span>
                </div>

                <h3
                  className={`font-display text-xl font-bold ${plan.highlight ? "text-white" : "text-heading"}`}
                >
                  {plan.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-4xl font-medium sm:text-5xl">
                    {plan.price}
                    <span className="text-2xl">{plan.unit}</span>
                  </span>
                  <span className={`text-sm font-medium ${plan.highlight ? "text-white/60" : "text-muted"}`}>
                    {plan.period}
                  </span>
                </p>

                <ul className="mt-8 flex-1 space-y-3.5 border-t border-line/40 pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.92rem] leading-relaxed">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${
                          plan.highlight ? "bg-white/15 text-white" : "bg-emerald/15 text-emerald"
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
                  className={`mt-8 inline-flex items-center justify-center rounded-full py-3.5 text-[0.95rem] font-semibold transition-all hover:-translate-y-0.5 ${plan.ctaStyle}`}
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
