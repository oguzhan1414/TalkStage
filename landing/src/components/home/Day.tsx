"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Device, { type ScreenName } from "./Device";
import { useLocale, useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { anchorId } from "@/i18n/paths";

type Step = { tag: string; title: string; text: string; note: string; screen: ScreenName; color: string; sticker: string };

const STEPS: Step[] = [
  {
    tag: tr("Oku"),
    title: tr("Her gün bir bölüm."),
    text: tr("Hikâye 5–10 dakikalık bölümlerle ilerler. Okursun, dinlersin, ertesi gün kaldığın yerden devam edersin."),
    note: tr("kahve soğumadan biter"),
    screen: "today",
    color: "#74DDB0",
    sticker: "/assets/features/stories.webp",
  },
  {
    tag: tr("Topla"),
    title: tr("Kelimeler aklında kalsın."),
    text: tr("Yeni kelimeler resimleriyle gelir ve kelime bankanda toplanır. Kısa tekrarlarla unutmadan ilerlersin."),
    note: tr("günde iki dakika tekrar"),
    screen: "words",
    color: "#FFCB3D",
    sticker: "/assets/features/vocab.webp",
  },
  {
    tag: tr("Konuş"),
    title: tr("Sonra Mivo ile konuş."),
    text: tr("Ünite bitince öğrendiklerini sesli bir sahnede kullanırsın. Mivo sabırla bekler, takıldığında ipucu verir."),
    note: tr("dokun ve konuş"),
    screen: "talk",
    color: "#93D5FF",
    sticker: "/assets/features/scenes.webp",
  },
  {
    tag: tr("Tekrar et"),
    title: tr("Hataların defterinde."),
    text: tr("Mivo’nun düzelttiği her cümle hata defterine düşer. Hızlı sınavla üstünden geçersin, aynı yerde takılmamayı öğrenirsin."),
    note: tr("yanlış yapmak serbest"),
    screen: "mistakes",
    color: "#CFC6FF",
    sticker: "/assets/features/review.webp",
  },
];

/**
 * A day with the app in four steps. On wide screens one phone stays in view and changes its screen as the steps
 * pass; on phones every step carries its own screen. The ground takes the colour of the step in the middle of the screen.
 */
export default function Day() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section id={anchorId("path", locale)} className="relative scroll-mt-0 text-ink transition-colors duration-700 ease-out" style={{ backgroundColor: step.color }}>
      <header className="mx-auto max-w-[52rem] px-5 pt-24 text-center sm:px-10 sm:pt-32">
        <p className="hand inline-block -rotate-2 text-[1.7rem] sm:text-[2.2rem]">{t("bir gün nasıl geçer?")}</p>
        <h2 className="poster mt-1 text-[clamp(2.5rem,6.6vw,5.75rem)]">{t("Günde on dakika yeter.")}</h2>
        <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/80 sm:text-[1.2rem]">
          {t("Bugün ekranı sıradaki adımı gösterir: bir bölüm, birkaç kelime, bir sahne. Serin büyüdükçe bırakmak zorlaşır.")}
        </p>
      </header>

      <div className="mx-auto grid max-w-[78rem] px-5 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-20">
        <ol>
          {STEPS.map((s, i) => (
            <li
              key={s.screen}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-step={i}
              className="flex flex-col justify-center py-16 max-lg:items-center max-lg:text-center lg:min-h-[88vh] lg:py-0"
            >
              <div className="flex items-center gap-3">
                <span className="poster stk-sm grid h-14 w-14 place-items-center rounded-full bg-white text-[1.7rem] leading-none">{i + 1}</span>
                <span className="stk-sm rounded-full bg-ink px-4 py-1.5 text-[0.95rem] font-extrabold text-white">{t(s.tag)}</span>
              </div>
              <h3 className="poster mt-5 max-w-[12ch] text-[clamp(2.2rem,5vw,4.25rem)]">{t(s.title)}</h3>
              <p className="mt-4 max-w-[30rem] text-pretty text-[1.08rem] font-medium leading-relaxed text-ink/85 sm:text-[1.22rem]">{t(s.text)}</p>
              <p className="hand mt-4 inline-flex items-center gap-2 text-[1.5rem] sm:text-[1.75rem]">
                <svg aria-hidden viewBox="0 0 40 20" className="h-4 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10c8-6 18-6 34 0M28 3l8 7-9 6" />
                </svg>
                {t(s.note)}
              </p>

              {/* Small screens: the step brings its own phone. */}
              <div className="relative mt-10 w-[min(66vw,16.5rem)] lg:hidden">
                <div className={i % 2 ? "rotate-3" : "-rotate-3"}>
                  <Device screen={s.screen} sizes="66vw" />
                </div>
                <Image src={s.sticker} alt="" width={320} height={320} sizes="96px" className={`floaty absolute -top-8 w-24 drop-shadow-[3px_4px_0_rgba(27,22,71,0.9)] ${i % 2 ? "-left-10 -rotate-12" : "-right-10 rotate-12"}`} />
              </div>
            </li>
          ))}
        </ol>

        {/* Wide screens: one phone, pinned. */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-[0.484] w-[min(20rem,38vh)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 90, rotate: 7, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: active % 2 ? 3 : -3, scale: 1 }}
                  exit={{ opacity: 0, y: -90, rotate: -7, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 190, damping: 22 }}
                >
                  <Device screen={step.screen} sizes="320px" />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={step.sticker}
                  aria-hidden
                  className="absolute -left-[38%] top-[8%] w-[42%]"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: -10 }}
                  exit={{ scale: 0, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Image src={step.sticker} alt="" width={320} height={320} sizes="140px" className="floaty h-auto w-full drop-shadow-[4px_5px_0_rgba(27,22,71,0.9)]" />
                </motion.div>
              </AnimatePresence>
              <ol aria-hidden className="absolute -right-10 top-1/2 flex -translate-y-1/2 flex-col gap-2.5">
                {STEPS.map((s, i) => (
                  <li key={s.screen} className={`w-3 rounded-full border-2 border-ink transition-all duration-500 ${i === active ? "h-9 bg-ink" : "h-3 bg-white"}`} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* The next section rises as a big round head, in its own colour. */}
      <div aria-hidden className="h-[13vw] min-h-[4.5rem] rounded-t-[50%_100%] bg-bubble" />
    </section>
  );
}
