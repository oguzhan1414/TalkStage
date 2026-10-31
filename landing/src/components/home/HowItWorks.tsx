"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import HandPhone from "./HandPhone";
import { HomeScreen, LessonScreen, MivoScreen, RoomScreen } from "./AppScreens";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { tr, type TFunction } from "@/i18n/shared";

const EASE = [0.23, 1, 0.32, 1] as const;

const STEPS: { title: string; text: string; tint: string; Screen: (p: { t: TFunction }) => React.ReactNode }[] = [
  { title: tr("Bir bölüm oku"), text: tr("Her seviye tek bir hikâye. Bugünkü bölümü okursun; yeni kelimeler ve yapı metnin içinde işaretli."), tint: "#f4f2fe", Screen: LessonScreen },
  { title: tr("Kelimeleri odada bul"), text: tr("Kelime odalarında bir fotoğraftaki eşyaları bulup adlarını öğrenirsin."), tint: "#eaf6f0", Screen: RoomScreen },
  { title: tr("Mivo ile konuş"), text: tr("Ünite sonunda Mivo bir rol üstlenir, sen sesli konuşursun. Hatanı saklamadan söyler, doğrusunu gösterir."), tint: "#fdf3dc", Screen: MivoScreen },
  { title: tr("Yarın kaldığın yerden"), text: tr("Ana ekran hep sıradaki adımı gösterir. Günlük hedefin ve serin seni bekler."), tint: "#eaf2fd", Screen: HomeScreen },
];

/**
 * A pinned stage: the hand holds the phone in place while the page scrolls through four steps. The step decides the
 * screen, the words and the panel colour; the scroll itself turns the phone a little and fills the progress line.
 */
export default function HowItWorks() {
  const t = useT();
  const locale = useLocale();
  const track = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const rotate = useTransform(smooth, [0, 1], [-5, 5]);
  const fill = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const bg = useTransform(
    scrollYProgress,
    STEPS.map((_, i) => i / (STEPS.length - 1)),
    STEPS.map((s) => s.tint)
  );

  const { Screen } = STEPS[step];

  return (
    <section ref={track} id={anchorId("path", locale)} className="relative px-3 sm:px-5" style={{ height: `${STEPS.length * 85 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center py-3 sm:py-5">
        <motion.div style={{ backgroundColor: bg }} className="relative mx-auto h-full w-full max-w-[88rem] overflow-hidden rounded-[2rem] sm:rounded-[2.75rem]">
          <div className="mx-auto grid h-full max-w-6xl grid-rows-[auto_1fr] gap-2 px-5 pt-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:grid-rows-1 lg:items-center lg:pt-0">
            <div className="relative">
              <h2 className="font-display text-[1rem] font-bold text-stage">{t("Her gün küçük bir adım.")}</h2>
              <div className="relative mt-4 min-h-[11.5rem] sm:min-h-[13rem]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <h3 className="text-balance font-display text-[2.3rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-cloth-deep sm:text-[3.4rem]">{t(STEPS[step].title)}</h3>
                    <p className="mt-4 max-w-[28rem] text-[1.05rem] leading-relaxed text-body sm:text-[1.15rem]">{t(STEPS[step].text)}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* progress: four marks and a line that fills with the scroll */}
              <div className="mt-6 hidden max-w-[20rem] items-center gap-3 sm:flex">
                <span className="text-[0.9rem] font-bold tabular-nums text-cloth-deep">
                  {step + 1}/{STEPS.length}
                </span>
                <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-cloth/10">
                  <motion.span style={{ width: fill }} className="absolute inset-y-0 left-0 rounded-full bg-stage" />
                </span>
              </div>
            </div>

            <div className="relative flex min-h-0 items-end justify-center self-end lg:h-full">
              <motion.div style={{ rotate }} className="h-full max-h-[34rem] origin-bottom lg:max-h-[46rem]">
                <HandPhone className="h-full w-auto" label={t(STEPS[step].title)}>
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={step}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <Screen t={t} />
                    </motion.div>
                  </AnimatePresence>
                </HandPhone>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
