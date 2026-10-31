"use client";

import { motion, useReducedMotion } from "motion/react";
import HandPhone from "./HandPhone";
import StoreButtons from "./StoreButtons";
import { MivoScreen } from "./AppScreens";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";

const EASE = [0.23, 1, 0.32, 1] as const;

/** The close: a dark panel, the one action, and the hand lifting the phone in from the bottom edge. */
export default function FinalCta() {
  const t = useT();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const view = { once: true, margin: "-120px" } as const;

  return (
    <section id={anchorId("download", locale)} className="scroll-mt-16 px-3 pb-6 sm:px-5">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-cloth px-6 pt-16 text-white sm:rounded-[2.75rem] sm:px-12 lg:pt-0">
        <div aria-hidden className="absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#4f46e5]/45 blur-[100px]" />
        <div aria-hidden className="absolute -bottom-32 right-10 -z-10 h-96 w-96 rounded-full bg-[#7c5cff]/30 blur-[110px]" />
        <div className="mx-auto grid max-w-6xl items-end gap-6 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={view}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:py-28"
          >
            <h2 className="text-balance font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.035em] sm:text-[3.8rem]">{t("Bölüm 1 seni bekliyor.")}</h2>
            <p className="mt-5 max-w-[32rem] text-pretty text-[1.1rem] leading-relaxed text-on-cloth">
              {t("Maya Bristol’a yeni geldi. Kapısının altına bırakılan kartpostalları kim gönderiyor? Uygulamayı indir, ilk bölümü bugün oku.")}
            </p>
            <div className="mt-9">
              <StoreButtons tone="cloth" location="closing" />
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { y: 160, rotate: -6, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={view}
            transition={{ type: "spring", duration: 1.3, bounce: 0.2, delay: 0.1 }}
            className="relative mx-auto -mb-[18%] w-full max-w-[24rem] origin-bottom sm:max-w-[28rem]"
          >
            <HandPhone variant="tilt" label={t("Uygulamada Mivo ile sesli sahne")}>
              <MivoScreen t={t} />
            </HandPhone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
