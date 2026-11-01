"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";

/** Map units: the dotted map's viewBox is 135 × 64 (public/world-dots.svg, generated once with dotted-map). */
const W = 135;
const H = 64;
const MIVO = { x: 57, y: 40 };

/** One learner per app language, each saying an English line to Mivo. Illustrative, not user data. */
const VOICES = [
  { x: 78, y: 21.65, lang: "Türkçe", line: "Hi Mivo! I'm Elif.", side: "right", below: true },
  { x: 72.5, y: 15.59, lang: "Deutsch", line: "I'd like to check in, please.", side: "right", below: false },
  { x: 66, y: 21.65, lang: "Español", line: "Can I have a coffee, please?", side: "left", below: true },
  { x: 50, y: 47.63, lang: "Português", line: "Where is gate twelve?", side: "left", below: false },
  { x: 30.5, y: 31.18, lang: "Español", line: "How much is this jacket?", side: "left", below: false },
  { x: 40, y: 21.65, lang: "English", line: "Nice to meet you, Sofia!", side: "left", below: false },
] as const;

export default function WorldMap() {
  const t = useT();
  const locale = useLocale();
  const box = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={anchorId("mivo", locale)} className="scroll-mt-20 px-3 sm:px-5">
      <div className="mx-auto max-w-[88rem] rounded-[2rem] bg-[#f4f3ff] px-5 py-20 sm:rounded-[2.75rem] sm:px-10 sm:py-28">
        <div className="mx-auto max-w-[40rem] text-center">
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-cloth-deep sm:text-[3.2rem]">
            {t("Beş dilde, aynı Mivo.")}
          </h2>
          <p className="mt-5 text-pretty text-[1.08rem] leading-relaxed text-body">
            {t("Spekvia’nın arayüzü ve açıklamaları Türkçe, İngilizce, İspanyolca, Portekizce ve Almanca. Nerede olursan ol, İngilizceyi kendi dilinde öğrenir, Mivo ile İngilizce konuşursun.")}
          </p>
        </div>

        <div ref={box} data-seen={seen} className="world relative mx-auto mt-14 max-w-5xl" style={{ aspectRatio: `${W} / ${H}` }}>
          <Image src="/world-dots.svg" alt="" fill unoptimized className="select-none object-contain" />

          <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
            {VOICES.map((v, i) => {
              const cx = (v.x + MIVO.x) / 2;
              const cy = Math.min(v.y, MIVO.y) - 9;
              return (
                <path
                  key={i}
                  d={`M${v.x} ${v.y} Q${cx} ${cy} ${MIVO.x} ${MIVO.y}`}
                  pathLength={1}
                  className="world-arc"
                  style={{ animationDelay: `${300 + i * 140}ms` }}
                  fill="none"
                  stroke="#4f46e5"
                  strokeOpacity={0.45}
                  strokeWidth={0.28}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {VOICES.map((v, i) => (
            <div key={i} className="absolute" style={{ left: `${(v.x / W) * 100}%`, top: `${(v.y / H) * 100}%` }}>
              <span aria-hidden className="world-pin absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-stage ring-2 ring-white" style={{ animationDelay: `${i * 0.4}s` }} />
              <div
                className={`world-bubble absolute hidden w-max max-w-[13rem] rounded-2xl bg-white px-3.5 py-2 shadow-[0_14px_24px_-14px_rgba(21,18,58,0.45)] md:block ${v.below ? "top-3" : "bottom-3"} ${
                  v.side === "right" ? (v.below ? "left-0 rounded-tl-md" : "left-0 rounded-bl-md") : v.below ? "right-0 rounded-tr-md" : "right-0 rounded-br-md"
                }`}
                style={{ animationDelay: `${500 + i * 160}ms` }}
              >
                <p className="text-[0.66rem] font-bold text-stage">{v.lang}</p>
                <p lang="en" className="font-story text-[0.98rem] leading-snug text-cloth-deep">
                  {v.line}
                </p>
              </div>
            </div>
          ))}

          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(MIVO.x / W) * 100}%`, top: `${(MIVO.y / H) * 100}%` }}>
            <div className="world-mivo grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_18px_30px_-14px_rgba(79,70,229,0.6)] ring-4 ring-stage/15 sm:h-24 sm:w-24">
              <Image src="/mivo/wave.webp" alt={t("Mivo")} width={750} height={900} sizes="96px" className="mt-3 h-14 w-auto sm:h-20" />
            </div>
          </div>
        </div>

        {/* small screens: the lines under the map */}
        <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2 md:hidden">
          {VOICES.map((v, i) => (
            <li key={i} className="rounded-2xl bg-white px-3 py-1.5 shadow-sm">
              <span className="text-[0.62rem] font-bold text-stage">{v.lang} · </span>
              <span lang="en" className="font-story text-[0.9rem] text-cloth-deep">
                {v.line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
