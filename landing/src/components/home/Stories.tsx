"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useCalm, useMedia } from "./useMedia";
import { useLocale, useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { anchorId } from "@/i18n/paths";
import { VOLUMES } from "@/data/storyDemo";

const CARD_COLORS = ["#74DDB0", "#FFCB3D", "#CFC6FF", "#FFB5D2", "#FF7A59", "#FFFFFF"];

/** Roles follow `mobile/src/assets/cast.ts`. */
const CAST = [
  { name: "Maya", role: tr("Hikâyenin kahramanı"), face: "/assets/cast/maya-face.webp", color: "#FF7A59" },
  { name: "Leo", role: tr("Ev arkadaşı"), face: "/assets/cast/leo-face.webp", color: "#74DDB0" },
  { name: "Rosa", role: tr("Kafenin sahibi"), face: "/assets/cast/rosa-face.webp", color: "#FFB5D2" },
  { name: "Tom", role: tr("Rosa’nın torunu"), face: "/assets/cast/tom-face.webp", color: "#FFCB3D" },
  { name: "Mr Patel", role: tr("Komşu"), face: "/assets/cast/patel-face.webp", color: "#CFC6FF" },
  { name: "Ana", role: tr("Gazeteci"), face: "/assets/cast/ana-face.webp", color: "#93D5FF" },
];

/**
 * Six levels, six stories. On wide screens the row of covers slides sideways as the page scrolls;
 * on phones it is a row to swipe. The cast walks by underneath.
 */
export default function Stories() {
  const t = useT();
  const locale = useLocale();
  const calm = useCalm();
  const wide = useMedia("(min-width: 1024px)");
  const slide = wide && !calm;

  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const span = useRef(0);
  useEffect(() => {
    const measure = () => {
      if (row.current) span.current = Math.max(0, row.current.scrollWidth - window.innerWidth + 64);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });
  const x = useTransform(p, (v) => {
    const k = Math.min(1, Math.max(0, (v - 0.22) / 0.5));
    return 32 - k * (span.current + 32);
  });

  const cast = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {[...CAST, ...CAST].map((c, i) => (
        <span key={i} className="flex items-center gap-3.5 px-5 sm:gap-4 sm:px-8">
          <span className="stk-sm relative block h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20" style={{ backgroundColor: c.color }}>
            <Image src={c.face} alt="" fill sizes="80px" className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="poster block text-[1.5rem] sm:text-[1.9rem]">{c.name}</span>
            <span className="block whitespace-nowrap text-[0.92rem] font-semibold text-ink/70 sm:text-[1rem]">{t(c.role)}</span>
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section ref={section} id={anchorId("levels", locale)} className="relative scroll-mt-10 overflow-hidden bg-sky pb-20 pt-24 text-ink sm:pb-28 sm:pt-32">
      <header className="mx-auto max-w-[52rem] px-5 text-center sm:px-10">
        <p className="hand inline-block -rotate-2 text-[1.7rem] text-violet sm:text-[2.2rem]">{t("her seviye ayrı bir macera")}</p>
        <h2 className="poster mt-1 text-[clamp(2.5rem,6.6vw,5.75rem)]">{t("A1’den C2’ye altı hikâye.")}</h2>
        <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/80 sm:text-[1.2rem]">
          {t("Seviyeni seç, hikâyene başla. Maya, Leo ve Rosa seviyeden seviyeye seninle devam eder.")}
        </p>
      </header>

      <div className={`mt-12 sm:mt-16 ${slide ? "" : "overflow-x-auto overscroll-x-contain [scrollbar-width:none]"}`}>
        <motion.ul ref={row} className={`flex w-max items-start gap-5 px-5 pb-8 pt-4 sm:gap-8 sm:px-10 ${slide ? "" : "snap-x snap-mandatory"}`} style={slide ? { x } : undefined}>
          {VOLUMES.map((v, i) => (
            <li
              key={v.id}
              className={`stk lean w-[min(76vw,19.5rem)] shrink-0 snap-center rounded-[1.8rem] p-3.5 sm:w-[21.5rem] sm:p-4 ${i % 2 ? "rotate-2 sm:mt-10" : "-rotate-2"}`}
              style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length], "--lean": i % 2 ? "-1deg" : "1deg" } as React.CSSProperties}
            >
              <div className="relative aspect-square overflow-hidden rounded-[1.2rem] border-[2.5px] border-ink bg-white">
                {v.story && <Image src={v.story.cover} alt="" fill sizes="(max-width: 640px) 76vw, 344px" className="object-cover" />}
                <span className="poster stk-sm absolute left-3 top-3 rounded-full bg-white px-3.5 py-1 text-[1.25rem] leading-none">{v.id}</span>
              </div>
              <p lang="en" className="mt-4 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-ink/65">
                {v.name}
              </p>
              <h3 className="poster mt-1 text-[1.65rem] sm:text-[1.85rem]">{v.story ? t(v.story.title) : t("Yakında")}</h3>
              {v.story && <p className="mt-2 text-[0.98rem] font-medium leading-relaxed text-ink/80">{t(v.story.blurb)}</p>}
            </li>
          ))}
        </motion.ul>
      </div>

      <p className="hand mt-10 text-center text-[1.6rem] sm:mt-14 sm:text-[2rem]">{t("ve hikâyenin kadrosu")}</p>
      <div className="marquee marquee--pausable mt-5 py-2" style={{ "--speed": "38s" } as React.CSSProperties}>
        {cast(false)}
        {cast(true)}
      </div>
    </section>
  );
}
