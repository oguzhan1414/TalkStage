"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Check, Star } from "lucide-react";
import HandPhone from "./HandPhone";
import StoreButtons from "./StoreButtons";
import { HomeScreen, LessonScreen, MivoScreen, RoomScreen } from "./AppScreens";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";

const SCREENS = [HomeScreen, LessonScreen, MivoScreen, RoomScreen];
const EASE = [0.23, 1, 0.32, 1] as const;

/** Opening: words settle in, a hand lifts the phone from the panel's edge, the screen flips through the app. */
export default function Hero() {
  const t = useT();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  // Leaving the hero: the hand rises a little slower than the page and eases back.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const handY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const handScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Floating cards drift toward the pointer on a spring (decorative only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const nearX = useTransform(sx, (v) => v * 18);
  const nearY = useTransform(sy, (v) => v * 18);
  const farX = useTransform(sx, (v) => v * -10);
  const farY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const Screen = SCREENS[screen];
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section ref={section} id={anchorId("top", locale)} className="px-3 pt-3 sm:px-5 sm:pt-5" onPointerMove={onMove}>
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-[#f4f2fe] sm:rounded-[2.75rem]">
        <div aria-hidden className="absolute -right-32 top-10 -z-10 h-[36rem] w-[36rem] rounded-full bg-white blur-[80px]" />
        <div aria-hidden className="absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#e3e0ff] blur-[90px]" />

        <div className="mx-auto grid max-w-6xl items-center gap-4 px-5 pt-28 sm:px-10 lg:min-h-[min(100svh,60rem)] lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <motion.div style={{ opacity: copyOpacity }} className="pb-4 lg:pb-24">
            <motion.h1 {...rise(0.05)} className="text-balance font-display text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-cloth-deep sm:text-[4rem] lg:text-[4.5rem]">
              {t("İngilizceyi hikâyeyle öğren, Mivo ile konuş.")}
            </motion.h1>
            <motion.p {...rise(0.18)} className="mt-6 max-w-[31rem] text-pretty text-[1.1rem] leading-relaxed text-body sm:text-[1.2rem]">
              {t("Her gün 5–10 dakikalık bir hikâye bölümü. Kelimeler ve dil bilgisi hikâyenin içinde, ünite sonunda Mivo ile sesli bir sahne.")}
            </motion.p>
            <motion.div {...rise(0.3)} className="mt-9">
              <StoreButtons tone="page" location="hero" />
            </motion.div>
            <motion.p {...rise(0.4)} className="mt-4 text-[0.9rem] text-muted">
              {t("Ücretsiz başla. Kredi kartı gerekmez.")}
            </motion.p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[25rem] self-end sm:max-w-[30rem] lg:max-w-[34rem]">
            <motion.div style={{ y: handY, scale: handScale }} className="origin-bottom">
              <motion.div
                initial={reduce ? false : { y: 160, rotate: 6, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 1.3, bounce: 0.18, delay: 0.15 }}
                className="-mb-[4%] origin-bottom"
              >
                <HandPhone priority label={t("Uygulamanın ana ekranı: bugünkü bölüm")}>
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={screen}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <Screen t={t} />
                    </motion.div>
                  </AnimatePresence>
                </HandPhone>
              </motion.div>
            </motion.div>

            {/* floating cards around the phone */}
            <motion.div style={{ x: nearX, y: nearY }} className="pointer-events-none absolute left-[-4%] top-[20%] sm:left-[-10%]">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3, delay: 1.1 }}
                className="float-slow flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_30px_-16px_rgba(21,18,58,0.35)]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald/15 text-emerald">
                  <Check aria-hidden className="h-4 w-4" strokeWidth={3} />
                </span>
                <span lang="en" className="font-story text-[0.95rem] text-cloth-deep">
                  I&apos;m from Turkey.
                </span>
              </motion.div>
            </motion.div>

            <motion.div style={{ x: farX, y: farY }} className="pointer-events-none absolute right-[-2%] top-[8%] sm:right-[-6%]">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3, delay: 1.3 }}
                className="float-slow flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-[0_18px_30px_-16px_rgba(21,18,58,0.35)] [animation-delay:-3s]"
              >
                {[0, 1, 2].map((i) => (
                  <Star key={i} aria-hidden className={`h-4 w-4 ${i < 2 ? "fill-marker text-marker" : "text-cloth/20"}`} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div style={{ x: farX, y: nearY }} className="pointer-events-none absolute bottom-[30%] right-[-4%] sm:right-[-12%]">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3, delay: 1.5 }}
                className="float-slow flex items-center gap-2 rounded-2xl bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_18px_30px_-16px_rgba(21,18,58,0.35)] [animation-delay:-5s]"
              >
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[#eef2ff]">
                  <Image src="/mivo/idle.webp" alt="" width={36} height={44} className="mt-2.5 h-9 w-auto" />
                </span>
                <span className="text-[0.85rem] font-semibold text-cloth-deep">{t("Mivo ile konuş")}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
