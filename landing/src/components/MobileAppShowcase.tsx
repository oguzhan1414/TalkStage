"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const navIcons = [
  {
    icon: "/images/42_nav_icon_stages_home.png",
    name: "Sahneler (Home)",
    desc: "Yapay zekâ destekli gerçek konuşma sahneleri",
  },
  {
    icon: "/images/43_nav_icon_practice_decks.png",
    name: "Alıştırma & Decks",
    desc: "SRS aralıklı tekrar ve akıllı kelime defteri",
  },
  {
    icon: "/images/44_nav_icon_quick_voice_orb.png",
    name: "Hızlı Konuş (AI Orb)",
    desc: "Tek dokunuşla canlı konuşma başlatan ses küresi",
    featured: true,
  },
  {
    icon: "/images/45_nav_icon_league_trophy.png",
    name: "Lig & Başarımlar",
    desc: "Günlük seri, rozetler ve küresel sıralama",
  },
  {
    icon: "/images/46_nav_icon_profile_shield.png",
    name: "Profil & Rapor",
    desc: "360° hece, telaffuz ve akıcılık istatistikleri",
  },
];

export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (containerRef.current && sectionRef.current) {
        gsap.fromTo(
          containerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
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
      id="mobil-deneyim"
      className="relative scroll-mt-24 overflow-hidden bg-porcelain px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <span className="font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-indigo">
            Özel Tasarım Mobil Deneyim
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Her Dokunuşta Lüks 3D Arayüz ve Canlı Geri Bildirim
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-body sm:text-lg">
            TalkStage mobil uygulaması, standart şablonlar yerine her pikseli özel 3D cam ve ışık dokularıyla tasarlandı.
          </p>
        </div>

        {/* 2-Row Showcase: Top 5 Bottom Navigation Icons, Bottom Micro Delights */}
        <div ref={containerRef} className="mt-16 space-y-12">
          {/* Top: 5 3D Navigation Bar Icons */}
          <div className="rounded-[32px] border border-line bg-white p-6 shadow-[var(--shadow-layered)] sm:p-10">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-wider text-muted">
              Mobil Alt Menü (Bottom Navigation) 3D Cam İkonları
            </span>

            <div className="mt-8 grid gap-6 sm:grid-cols-5">
              {navIcons.map((item) => (
                <div
                  key={item.name}
                  className={`group flex flex-col items-center text-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 ${
                    item.featured
                      ? "border border-indigo/30 bg-indigo/5 shadow-xs"
                      : "border border-line/60 bg-porcelain/60 hover:bg-white hover:shadow-xs"
                  }`}
                >
                  <div className="relative h-18 w-18 overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-heading">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[0.75rem] leading-snug text-body">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: 4 Micro-Delights & Moments */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: 3D Mic Character */}
            <div className="group rounded-[28px] border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:shadow-xs">
              <div className="relative mx-auto h-32 w-32 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/53_state_mic_permission.png"
                  alt="TalkStage 3D Sevimli Mikrofon Karakteri"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-heading text-center">
                Sıcak & Yargısız Karşılama
              </h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-body text-center">
                Konuşmaya başlamadan önce seni neşeyle karşılayan güvenli alan dostu.
              </p>
            </div>

            {/* Card 2: 3D Streak Flame Trophy */}
            <div className="group rounded-[28px] border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:shadow-xs">
              <div className="relative mx-auto h-32 w-32 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/54_state_daily_goal_celebration.png"
                  alt="TalkStage 3D Günlük Hedef Alev Kupası"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-heading text-center">
                Günlük 5 Dk Alev Serisi
              </h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-body text-center">
                Her gün 5 dakikalık provanı bitirdiğinde alev kupası patlar ve serin korunur.
              </p>
            </div>

            {/* Card 3: 3D Vocab Chest */}
            <div className="group rounded-[28px] border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:shadow-xs">
              <div className="relative mx-auto h-32 w-32 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/55_state_empty_vocab_chest.png"
                  alt="TalkStage 3D Sihirli Kelime Sandığı"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-heading text-center">
                Kişisel Kelime Sandığı
              </h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-body text-center">
                Canlı senaryolarda öğrendiğin kelimeler sandığına eklenir ve pekişir.
              </p>
            </div>

            {/* Card 4: 3D Stage Pass VIP Lanyard Card */}
            <div className="group rounded-[28px] border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:shadow-xs">
              <div className="relative mx-auto h-32 w-32 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/57_paywall_vip_backstage_pass.png"
                  alt="Stage Pass VIP All-Access 3D Kartı"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-heading text-center">
                Stage Pass VIP Kartı
              </h3>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-body text-center">
                Tüm sahnelere ve sınırsız konuşma provasına anında VIP tam erişim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
