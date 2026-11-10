"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Device from "./Device";
import { useCalm } from "./useMedia";
import { useT } from "@/i18n/client";
import type { TFunction } from "@/i18n/shared";

/* ───────────── The desk: the way English is usually studied ───────────── */

function Notebook({ t }: { t: TFunction }) {
  const rows = ["go · went · gone", "see · saw · seen", "buy · bought · bought", "write · wrote · written", "take · took · taken"];
  return (
    <div className="stk relative w-[15.5rem] rounded-[0.9rem] bg-white pb-4 pl-11 pr-4 pt-3 text-ink" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 1.7rem, #C8DBFF 1.7rem calc(1.7rem + 1.5px))", backgroundPositionY: "0.75rem" }}>
      <span aria-hidden className="absolute inset-y-0 left-8 w-[1.5px] bg-flame/70" />
      <span aria-hidden className="absolute inset-y-4 left-2.5 flex flex-col justify-between">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <i key={i} className="block h-2.5 w-2.5 rounded-full border-2 border-ink bg-cream" />
        ))}
      </span>
      <p lang="en" className="hand text-[1.45rem] leading-[1.7rem] text-flame underline decoration-wavy decoration-1 underline-offset-4">
        Irregular verbs
      </p>
      {rows.map((r) => (
        <p key={r} lang="en" className="hand whitespace-nowrap text-[1.3rem] font-semibold leading-[1.7rem]">
          {r}
        </p>
      ))}
      <span className="hand absolute -right-3 bottom-3 rotate-[-10deg] rounded-full border-[2.5px] border-flame px-2.5 py-0.5 text-[1.2rem] text-flame">{t("10 kez yaz!")}</span>
    </div>
  );
}

function Dictionary() {
  return (
    <div className="relative w-[11rem] text-cream">
      <span aria-hidden className="absolute -right-2.5 bottom-2 top-2 w-4 rounded-r-md border-[2.5px] border-ink bg-white" style={{ backgroundImage: "repeating-linear-gradient(#fff 0 3px, #d9d3c2 3px 4px)" }} />
      <div className="stk relative flex h-[14.5rem] flex-col rounded-[0.5rem_1rem_1rem_0.5rem] bg-flame p-4">
        <span aria-hidden className="absolute inset-y-0 left-3 w-[2.5px] bg-ink/25" />
        <span lang="en" className="poster ml-3 mt-3 text-[1.55rem] leading-none text-ink">
          Dictio&shy;nary
        </span>
        <span lang="en" className="ml-3 mt-2 inline-block w-fit rounded-full bg-ink px-3 py-1 text-[0.8rem] font-extrabold text-sun">
          A–Z
        </span>
        <span aria-hidden className="ml-3 mt-auto block h-9 w-9 rounded-full border-[2.5px] border-ink bg-sun" />
      </div>
    </div>
  );
}

function Pencil() {
  return (
    <svg aria-hidden viewBox="0 0 300 44" className="w-[17rem] overflow-visible drop-shadow-[4px_5px_0_rgba(27,22,71,0.9)]">
      <g stroke="#1B1647" strokeWidth="3" strokeLinejoin="round">
        <rect x="3" y="6" width="34" height="32" rx="8" fill="#FFB5D2" />
        <rect x="37" y="6" width="22" height="32" fill="#CFC6FF" />
        <rect x="59" y="6" width="176" height="32" fill="#FFCB3D" />
        <path d="M59 17h176M59 27h176" fill="none" strokeWidth="2" opacity="0.35" />
        <path d="M235 6l56 16-56 16Z" fill="#FFE9C2" />
        <path d="M273 16.800 291 22l-18 5.200Z" fill="#1B1647" />
      </g>
    </svg>
  );
}

function StickyNote({ children, color, className = "" }: { children: React.ReactNode; color: string; className?: string }) {
  return (
    <div className={`stk-sm hand relative flex aspect-square w-[9rem] items-center justify-center p-3 text-center text-[1.5rem] leading-[1.05] text-ink ${className}`} style={{ backgroundColor: color }}>
      <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 bg-white/70 ring-1 ring-ink/20" />
      {children}
    </div>
  );
}

function GrammarTable({ t }: { t: TFunction }) {
  const rows = [
    ["I", "have", "gone"],
    ["She", "has", "gone"],
    ["They", "have", "gone"],
  ];
  return (
    <div className="stk relative w-[14rem] rounded-[0.8rem] bg-white p-3 text-ink">
      <p lang="en" className="rounded-md bg-sky px-2 py-1 text-center text-[0.8rem] font-extrabold">
        have / has + V3
      </p>
      <table lang="en" className="mt-2 w-full border-collapse text-[0.82rem] font-semibold">
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c) => (
                <td key={c} className="border-[1.5px] border-ink/70 px-2 py-1">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="hand absolute -bottom-4 -right-3 rotate-[-8deg] text-[1.6rem] text-flame">{t("ezberle!")}</span>
    </div>
  );
}

function ExamPaper() {
  return (
    <div className="stk relative w-[10.5rem] rounded-[0.6rem] bg-white p-4 text-ink">
      <p lang="en" className="text-[0.72rem] font-extrabold uppercase tracking-[0.12em]">
        English test
      </p>
      <div aria-hidden className="mt-3 space-y-2">
        {[92, 70, 84, 58, 76].map((w, i) => (
          <i key={i} className="block h-1.5 rounded-full bg-ink/15" style={{ width: `${w}%` }} />
        ))}
      </div>
      <span className="hand absolute -right-4 -top-5 grid h-[4.6rem] w-[4.6rem] rotate-12 place-items-center rounded-full border-[3px] border-flame bg-white text-[1.9rem] text-flame">45</span>
    </div>
  );
}

/* ───────────── Scroll plumbing ───────────── */

/** 0 → 1 between two points of the scroll, eased. */
function useSpan(p: MotionValue<number>, from: number, to: number, ease: "in" | "out" = "out") {
  return useTransform(p, (v) => {
    const k = Math.min(1, Math.max(0, (v - from) / (to - from)));
    return ease === "in" ? k * k * k : 1 - (1 - k) ** 3;
  });
}

/** One thing on the desk: it rests at `rest` degrees, then gets swept off the screen toward `out` (vw, vh). */
function DeskItem({
  p,
  at,
  rest,
  out,
  className,
  children,
}: {
  p: MotionValue<number>;
  at: number;
  rest: number;
  out: [number, number];
  className: string;
  children: React.ReactNode;
}) {
  const k = useSpan(p, at, at + 0.2, "in");
  const x = useTransform(k, (v) => `${v * out[0]}vw`);
  const y = useTransform(k, (v) => `${v * out[1]}vh`);
  const rotate = useTransform(k, (v) => rest + v * (out[0] > 0 ? 50 : -50));
  return (
    <motion.div aria-hidden className={`absolute scale-[0.56] sm:scale-[0.8] xl:scale-100 ${className}`} style={{ x, y, rotate }}>
      <div className="floaty" style={{ "--d": `${5 + at * 12}s`, "--delay": `${-at * 9}s` } as React.CSSProperties}>
        {children}
      </div>
    </motion.div>
  );
}

function Chip({ p, at, className, children }: { p: MotionValue<number>; at: number; className: string; children: React.ReactNode }) {
  const scale = useSpan(p, at, at + 0.07);
  return (
    <motion.span className={`stk-sm absolute z-30 whitespace-nowrap rounded-full px-4 py-1.5 text-[0.95rem] font-extrabold text-ink sm:px-5 sm:py-2 sm:text-[1.15rem] ${className}`} style={{ scale }}>
      {children}
    </motion.span>
  );
}

/* ───────────── Copy ───────────── */

function OldCopy({ t, strike }: { t: TFunction; strike?: MotionValue<number> }) {
  return (
    <div className="mx-auto max-w-[42rem] px-5 text-center text-ink">
      <p className="hand inline-block -rotate-2 text-[1.7rem] text-flame sm:text-[2.2rem]">{t("tanıdık geldi mi?")}</p>
      <h2 className="poster relative mx-auto mt-2 w-fit text-[clamp(2.6rem,7.4vw,6.5rem)]">
        {t("İngilizce böyle zor.")}
        <svg aria-hidden viewBox="0 0 400 60" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-[4%] bottom-[8%] h-[38%] w-[108%] overflow-visible">
          {strike ? (
            <motion.path d="M4 40C70 8 130 54 200 28s130-22 196 6" fill="none" stroke="#FF7A59" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: strike }} />
          ) : (
            <path d="M4 40C70 8 130 54 200 28s130-22 196 6" fill="none" stroke="#FF7A59" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          )}
        </svg>
      </h2>
      <p className="mx-auto mt-5 max-w-[34rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/80 sm:text-[1.2rem]">
        {t("Kelime listesi ezberle, kural tablosu doldur, sınava çalış. Yıllar geçer, konuşmaya sıra yine gelmez.")}
      </p>
    </div>
  );
}

function NewCopy({ t }: { t: TFunction }) {
  return (
    <div className="mx-auto max-w-[46rem] px-5 text-center text-ink">
      <p className="hand inline-block rotate-2 text-[1.7rem] text-violet sm:text-[2.2rem]">{t("bir de Spekvia ile dene")}</p>
      <h2 className="poster mt-1 text-[clamp(2.3rem,6.2vw,5.5rem)]">{t("Böyle çok daha kolay.")}</h2>
      <p className="mx-auto mt-4 max-w-[38rem] text-pretty text-[1.02rem] font-medium leading-relaxed text-ink/85 sm:text-[1.18rem]">
        {t("Her gün kısa bir hikâye bölümü okursun. Kelimeyi cümlenin içinde görür, kuralı geçtiği anda öğrenirsin. Ünite bitince öğrendiklerini Mivo ile sesli konuşursun.")}
      </p>
    </div>
  );
}

/* ───────────── The scene ───────────── */

/**
 * The page's story beat. The screen stays put while the visitor scrolls: a desk full of the usual study things,
 * the headline gets crossed out, everything is swept away, the paper turns mint and the phone rises with Mivo.
 * With reduced motion the two halves are simply stacked.
 */
export default function OldWay() {
  const t = useT();
  const calm = useCalm();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });

  const strike = useSpan(p, 0.05, 0.2);
  const oldOut = useSpan(p, 0.3, 0.42, "in");
  const oldOpacity = useTransform(oldOut, (v) => 1 - v);
  const oldY = useTransform(oldOut, (v) => v * -70);
  const bg = useTransform(p, [0.34, 0.5], ["#FFF7E6", "#74DDB0"]);
  const lines = useTransform(p, [0.3, 0.46], [1, 0]);
  const newIn = useSpan(p, 0.45, 0.58);
  const newY = useTransform(newIn, (v) => (1 - v) * 60);
  const phoneIn = useSpan(p, 0.44, 0.7);
  const phoneY = useTransform(phoneIn, (v) => `${(1 - v) * 115}%`);
  const phoneR = useTransform(phoneIn, (v) => 14 - v * 18);
  const mivoIn = useSpan(p, 0.54, 0.74);
  const mivoX = useTransform(mivoIn, (v) => `${(1 - v) * -60}vw`);
  const bookIn = useSpan(p, 0.66, 0.76);
  const micIn = useSpan(p, 0.72, 0.82);

  if (calm) {
    return (
      <section>
        <div className="paper-lines bg-cream py-24">
          <OldCopy t={t} />
          <div aria-hidden className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-8 px-5">
            <div className="-rotate-6 scale-90">
              <Notebook t={t} />
            </div>
            <div className="rotate-6 scale-90">
              <Dictionary />
            </div>
            <StickyNote color="#FFB5D2" className="-rotate-3">
              {t("Pazartesi sınav!")}
            </StickyNote>
          </div>
        </div>
        <div className="overflow-hidden bg-mint pt-24">
          <NewCopy t={t} />
          <div className="relative mx-auto mt-12 h-[24rem] max-w-3xl">
            <Image src="/assets/mivo/invite.webp" alt="" width={440} height={826} sizes="200px" className="absolute bottom-0 left-[8%] z-10 h-[88%] w-auto" />
            <div className="absolute left-1/2 top-0 w-[15rem] -translate-x-1/2 -rotate-3">
              <Device screen="today" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative h-[330vh]">
      <motion.div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: bg }}>
        <motion.div aria-hidden className="paper-lines absolute inset-0" style={{ opacity: lines }} />

        {/* The desk */}
        <DeskItem p={p} at={0.22} rest={-9} out={[-70, -30]} className="left-[-9%] top-[10%] origin-top-left sm:left-[3%] sm:top-[15%]">
          <Notebook t={t} />
        </DeskItem>
        <DeskItem p={p} at={0.26} rest={-24} out={[70, -50]} className="right-[-12%] top-[22%] origin-top-right sm:right-[3%] sm:top-[24%]">
          <Pencil />
        </DeskItem>
        <DeskItem p={p} at={0.24} rest={8} out={[40, -80]} className="right-[3%] top-[9%] origin-top-right sm:right-[19%] sm:top-[12%]">
          <StickyNote color="#FFB5D2">{t("Pazartesi sınav!")}</StickyNote>
        </DeskItem>
        <DeskItem p={p} at={0.28} rest={9} out={[75, 40]} className="bottom-[4%] right-[-5%] origin-bottom-right sm:bottom-[9%] sm:right-[5%]">
          <Dictionary />
        </DeskItem>
        <DeskItem p={p} at={0.3} rest={-5} out={[-75, 45]} className="bottom-[3%] left-[1%] origin-bottom-left sm:bottom-[8%] sm:left-[7%]">
          <ExamPaper />
        </DeskItem>
        <DeskItem p={p} at={0.25} rest={-4} out={[20, 90]} className="bottom-[5%] right-[24%] hidden origin-bottom lg:block">
          <GrammarTable t={t} />
        </DeskItem>
        <DeskItem p={p} at={0.27} rest={6} out={[-30, 90]} className="bottom-[7%] left-[27%] hidden origin-bottom md:block">
          <StickyNote color="#FFCB3D">
            <span lang="en">Present Perfect = ?!</span>
          </StickyNote>
        </DeskItem>

        {/* Before */}
        <motion.div className="absolute inset-0 z-20 grid place-items-center" style={{ opacity: oldOpacity, y: oldY }}>
          <OldCopy t={t} strike={strike} />
        </motion.div>

        {/* After */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
          <motion.div className="pt-[5.5rem] sm:pt-28" style={{ opacity: newIn, y: newY }}>
            <NewCopy t={t} />
          </motion.div>
          <div className="relative mx-auto mt-6 min-h-0 w-full max-w-[68rem] flex-1 sm:mt-10">
            <div className="absolute left-1/2 top-0 z-10 w-[min(62vw,17.5rem)] -translate-x-1/2 lg:w-[19rem]">
              <motion.div style={{ y: phoneY, rotate: phoneR }}>
                <Device screen="today" sizes="(max-width: 640px) 62vw, 304px" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-0 left-[-2%] z-20 h-[78%] sm:left-[8%] sm:h-[88%] lg:left-[14%]" style={{ x: mivoX }}>
              <Image src="/assets/mivo/invite.webp" alt="" width={440} height={826} sizes="(max-width: 640px) 130px, 240px" className="h-full w-auto max-w-none" />
            </motion.div>
            <Chip p={p} at={0.62} className="right-[3%] top-[8%] rotate-6 bg-sun sm:right-[16%]">
              {t("Oku")}
            </Chip>
            <Chip p={p} at={0.68} className="right-[1%] top-[30%] -rotate-6 bg-bubble sm:right-[9%]">
              {t("Dinle")}
            </Chip>
            <Chip p={p} at={0.74} className="right-[4%] top-[52%] rotate-3 bg-white sm:right-[17%]">
              {t("Konuş")}
            </Chip>
            <motion.div aria-hidden className="absolute bottom-[8%] right-[26%] z-20 hidden w-[7rem] -rotate-12 lg:block" style={{ scale: bookIn }}>
              <Image src="/assets/features/stories.webp" alt="" width={320} height={320} sizes="112px" className="floaty h-auto w-full" />
            </motion.div>
            <motion.div aria-hidden className="absolute left-[3%] top-[4%] z-0 hidden w-[6.5rem] rotate-12 lg:block" style={{ scale: micIn }}>
              <Image src="/assets/features/scenes.webp" alt="" width={320} height={320} sizes="104px" className="floaty h-auto w-full" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
