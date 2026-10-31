"use client";

import { useEffect, useRef, useState } from "react";
import Phone from "./Phone";
import { HomeScreen, LessonScreen, MivoScreen, RoomScreen } from "./AppScreens";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { tr, type TFunction } from "@/i18n/shared";

const STEPS: { title: string; text: string; Screen: (p: { t: TFunction }) => React.ReactNode }[] = [
  { title: tr("Bir bölüm oku"), text: tr("Her seviye tek bir hikâye. Bugünkü bölümü okursun; yeni kelimeler ve yapı metnin içinde işaretli."), Screen: LessonScreen },
  { title: tr("Kelimeleri odada bul"), text: tr("Kelime odalarında bir fotoğraftaki eşyaları bulup adlarını öğrenirsin."), Screen: RoomScreen },
  { title: tr("Mivo ile konuş"), text: tr("Ünite sonunda Mivo bir rol üstlenir, sen sesli konuşursun. Hatanı saklamadan söyler, doğrusunu gösterir."), Screen: MivoScreen },
  { title: tr("Yarın kaldığın yerden"), text: tr("Ana ekran hep sıradaki adımı gösterir. Günlük hedefin ve serin seni bekler."), Screen: HomeScreen },
];

/** Four steps on the left; on wide screens one sticky phone changes its screen as each step reaches the middle. */
export default function HowItWorks() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id={anchorId("path", locale)} className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-[36rem] text-balance font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-cloth-deep sm:text-[3.2rem]">
          {t("Her gün küçük bir adım.")}
        </h2>

        <div className="mt-10 grid gap-10 lg:mt-4 lg:grid-cols-[1fr_auto] lg:gap-20">
          <ol>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className="flex flex-col gap-8 py-8 lg:min-h-[70vh] lg:justify-center lg:py-0"
              >
                <div className={`max-w-[28rem] transition-opacity duration-300 ease-out lg:opacity-30 ${active === i ? "lg:!opacity-100" : ""}`}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-stage text-[0.95rem] font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 font-display text-[1.7rem] font-extrabold tracking-[-0.02em] text-cloth-deep sm:text-[2rem]">{t(s.title)}</h3>
                  <p className="mt-2 text-[1.06rem] leading-relaxed text-body">{t(s.text)}</p>
                </div>
                {/* phones inline on small screens */}
                <Phone className="mx-auto w-[15rem] lg:hidden">
                  <s.Screen t={t} />
                </Phone>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-18rem)]">
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[#4f46e5]/[0.08] blur-3xl" />
                <Phone className="w-[17rem]" label={t(STEPS[active].title)}>
                  {STEPS.map(({ Screen }, i) => (
                    <div key={i} data-active={active === i} aria-hidden={active !== i} className="screen-swap absolute inset-0">
                      <Screen t={t} />
                    </div>
                  ))}
                </Phone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
