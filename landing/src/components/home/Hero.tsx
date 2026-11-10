"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import StoreButtons from "./StoreButtons";
import Device from "./Device";
import { useCalm } from "./useMedia";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";

const SPRING = { type: "spring", stiffness: 210, damping: 20 } as const;

/** The app's small object characters, stuck around the headline. `depth` is how far each one follows the pointer. */
const STICKERS = [
  { src: "/assets/features/stories.webp", depth: 34, delay: 0.55, cls: "left-[2%] top-[39%] w-[4.6rem] -rotate-12 sm:top-[17%] sm:w-[7rem] lg:left-[5%] lg:w-[9.5rem]" },
  { src: "/assets/features/partner.webp", depth: -28, delay: 0.65, cls: "right-[2%] top-[41%] w-[4.4rem] rotate-12 sm:top-[15%] sm:w-[6.6rem] lg:right-[6%] lg:w-[8.5rem]" },
  { src: "/assets/features/scenes.webp", depth: 20, delay: 0.8, cls: "left-[12%] top-[47%] hidden w-[6.5rem] rotate-6 lg:block xl:left-[14%]" },
  { src: "/assets/features/travel.webp", depth: -36, delay: 0.9, cls: "right-[11%] top-[45%] hidden w-[7rem] -rotate-6 lg:block xl:right-[13%]" },
];

function Sticker({ s, mx, my }: { s: (typeof STICKERS)[number]; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * s.depth);
  const y = useTransform(my, (v) => v * s.depth);
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute z-10 ${s.cls}`} style={{ x, y }}>
      <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...SPRING, delay: s.delay }}>
        <Image src={s.src} alt="" width={320} height={320} sizes="160px" className="floaty h-auto w-full drop-shadow-[4px_5px_0_rgba(27,22,71,0.9)]" style={{ "--d": `${5 + s.delay * 3}s` } as React.CSSProperties} />
      </motion.div>
    </motion.div>
  );
}

/** The opening: a sun-yellow field, the headline in poster caps, and three designed screens rising out of the bottom edge. */
export default function Hero() {
  const t = useT();
  const locale = useLocale();
  const calm = useCalm();
  const section = useRef<HTMLElement>(null);

  // The phones spread and the words drift up while the section leaves the screen.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const midY = useTransform(p, [0, 1], [0, -90]);
  const leftX = useTransform(p, [0, 1], [0, -70]);
  const leftR = useTransform(p, [0, 1], [-9, -19]);
  const rightX = useTransform(p, [0, 1], [0, 70]);
  const rightR = useTransform(p, [0, 1], [9, 19]);
  const mivoY = useTransform(p, [0, 1], [0, 60]);
  const still = <T,>(v: T) => (calm ? undefined : v);

  // Stickers lean toward the pointer on devices that have one.
  const mx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (calm || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const word = (delay: number) => ({
    initial: { opacity: 0, y: 70, rotate: 4 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    transition: { ...SPRING, delay },
  });

  return (
    <section ref={section} id={anchorId("top", locale)} onPointerMove={onMove} className="relative isolate overflow-hidden bg-sun pt-[6.5rem] text-ink sm:pt-36">
      {STICKERS.map((s) => (
        <Sticker key={s.src} s={s} mx={mx} my={my} />
      ))}

      <div className="relative z-20 mx-auto max-w-[90rem] px-5 text-center sm:px-10">
        <motion.p {...word(0.05)} className="hand inline-block -rotate-3 text-[1.7rem] text-violet sm:text-[2.3rem]">
          {t("İngilizce, hayatın içinde.")}
        </motion.p>
        <h1 className="poster mx-auto mt-2 text-[clamp(2.35rem,8.2vw,8.25rem)] sm:mt-3">
          <motion.span {...word(0.14)} className="block">
            {t("Hikâyeyle öğren.")}
          </motion.span>
          <motion.span {...word(0.26)} className="block text-violet">
            {t("Mivo ile konuş.")}
          </motion.span>
        </h1>
        <motion.p {...word(0.4)} className="mx-auto mt-6 max-w-[37rem] text-pretty text-[1.08rem] font-medium leading-relaxed text-ink/80 sm:mt-8 sm:text-[1.25rem]">
          {t("Her gün bir hikâye. Yeni kelimeler, küçük keşifler ve Mivo ile gerçek bir konuşma. İngilizceyi günlük hayatının bir parçası yap.")}
        </motion.p>
        <motion.div {...word(0.52)} className="mt-8 flex flex-col items-center gap-5 sm:mt-10">
          <StoreButtons location="hero" className="justify-center" />
          <p className="text-[0.92rem] font-semibold text-ink/70">{t("Ücretsiz başla. Kredi kartı gerekmez.")}</p>
        </motion.div>
      </div>

      {/* Three marketing screens, cropped by the bottom edge. */}
      <div className="relative z-10 mx-auto mt-12 h-[clamp(19rem,45vw,35rem)] w-full max-w-[76rem] sm:mt-16">
        <div className="absolute left-1/2 top-[13%] z-10 w-[clamp(9.5rem,21vw,16.5rem)] -translate-x-[150%]">
          <motion.div initial={{ y: 320, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING, delay: 0.62 }}>
            <motion.div style={still({ x: leftX, rotate: leftR }) ?? { rotate: -9 }}>
              <Device screen="words" sizes="(max-width: 640px) 40vw, 264px" />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute left-1/2 top-[13%] z-10 w-[clamp(9.5rem,21vw,16.5rem)] translate-x-[50%]">
          <motion.div initial={{ y: 320, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING, delay: 0.72 }}>
            <motion.div style={still({ x: rightX, rotate: rightR }) ?? { rotate: 9 }}>
              <Device screen="talk" sizes="(max-width: 640px) 40vw, 264px" />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute left-1/2 top-0 z-20 w-[clamp(11.5rem,25vw,19.5rem)] -translate-x-1/2">
          <motion.div initial={{ y: 360, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING, delay: 0.5 }}>
            <motion.div style={still({ y: midY })}>
              <Device screen="today" priority sizes="(max-width: 640px) 50vw, 312px" alt={t("Uygulamanın ana ekranı: bugünkü bölüm")} />
            </motion.div>
          </motion.div>
        </div>

        {/* Mivo waves in front of the phones and says hello. */}
        <div className="absolute bottom-0 left-[1%] z-30 h-[66%] sm:left-[4%] sm:h-[84%] lg:left-[7%]">
          <motion.div className="relative h-full" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ...SPRING, delay: 0.95 }} style={still({ y: mivoY })}>
            <Image src="/assets/mivo/wave.webp" alt="" width={433} height={918} sizes="(max-width: 640px) 110px, 230px" priority className="h-full w-auto max-w-none" />
            <motion.span
              lang="en"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -6 }}
              transition={{ ...SPRING, delay: 1.35 }}
              className="stk-sm absolute -top-3 left-[72%] origin-bottom-left whitespace-nowrap rounded-[1.2rem] rounded-bl-[0.3rem] bg-white px-3.5 py-1.5 text-[0.95rem] font-extrabold sm:-top-2 sm:px-5 sm:py-2.5 sm:text-[1.25rem]"
            >
              Hello!
            </motion.span>
          </motion.div>
        </div>
        <motion.span
          lang="en"
          aria-hidden
          initial={{ scale: 0, rotate: 20 }}
          animate={{ scale: 1, rotate: 7 }}
          transition={{ ...SPRING, delay: 1.5 }}
          className="stk-sm absolute right-[3%] top-[30%] z-30 hidden origin-bottom-right whitespace-nowrap rounded-[1.2rem] rounded-br-[0.3rem] bg-bubble px-5 py-2.5 text-[1.2rem] font-extrabold sm:block lg:right-[9%]"
        >
          Your turn!
        </motion.span>
      </div>
    </section>
  );
}
