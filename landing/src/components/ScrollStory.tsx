'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import PhoneFrame from '@/components/PhoneFrame';
import { FixScreen, ReviewScreen, SpeakScreen } from '@/components/StoryScreens';
import { gsap } from '@/components/motion/gsapClient';
import { useT } from '@/i18n/client';
import { tr } from '@/i18n/shared';

const STEPS = [
  {
    n: '01',
    title: tr("Konuş"),
    text: tr("Havalimanında, otelde, mülakatta… Mivo sahnedeki karşı tarafı oynar, sen sesli konuşursun."),
    Screen: SpeakScreen,
    pose: '/mivo/listening.webp',
  },
  {
    n: '02',
    title: tr("Düzelt"),
    text: tr("Takıldığın cümle anında düzelir ve nedeni kendi dilinde açıklanır. Konuşman hiç bölünmez."),
    Screen: FixScreen,
    pose: '/mivo/success.webp',
  },
  {
    n: '03',
    title: tr("Tekrar et"),
    text: tr("Hataların Hata Defterim'e düşer. Hızlı sınavla pekiştirir, gün gün planınla ilerlersin."),
    Screen: ReviewScreen,
    pose: '/mivo/lesson-guide.webp',
  },
] as const;

/**
 * "Konuş → Düzelt → Tekrar et". On large screens the section pins and the phone changes screen as you scroll
 * (GSAP ScrollTrigger drives only the progress; the crossfade is plain CSS). On small screens and with reduced
 * motion there is no pin: the three steps are simply stacked.
 */
export default function ScrollStory() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const trigger = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=240%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
              if (bar.current) bar.current.style.transform = `scaleY(${self.progress})`;
            },
          },
        });
        trigger.to({}, { duration: 1 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="story-title" className="relative bg-white">
      {/* Desktop: pinned story */}
      <div className="mx-auto hidden min-h-[100svh] w-full max-w-6xl items-center gap-16 px-8 lg:grid lg:grid-cols-[1fr_auto] lg:motion-reduce:hidden">
        <div className="relative max-w-[30rem]">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Nasıl çalışır")}</p>
          <h2 id="story-title" className="mt-3 text-balance font-display text-[3.4rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-heading">
            {t("Konuş. Düzelt. Tekrar et.")}
          </h2>

          <div className="relative mt-10 pl-9">
            <div aria-hidden className="absolute bottom-1 left-[0.7rem] top-1 w-0.5 rounded-full bg-line" />
            <div ref={bar} aria-hidden className="absolute bottom-1 left-[0.7rem] top-1 w-0.5 origin-top rounded-full bg-linear-to-b from-stage to-spot" style={{ transform: 'scaleY(0)' }} />
            <ol className="space-y-9">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`relative transition-all duration-500 ${i === active ? 'translate-x-0 opacity-100' : 'translate-x-1 opacity-40'}`}>
                  <span
                    aria-hidden
                    className={`absolute -left-9 top-1 flex h-[1.45rem] w-[1.45rem] items-center justify-center rounded-full border-2 text-[0.6rem] font-bold transition-colors duration-500 ${
                      i <= active ? 'border-stage bg-stage text-white' : 'border-line bg-white text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-heading">{t(s.title)}</h3>
                  <p className="mt-1.5 max-w-[26rem] text-[1.02rem] leading-relaxed text-body">{t(s.text)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_65%)] blur-2xl" />
          <PhoneFrame className="relative">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`absolute inset-0 transition-all duration-500 ${i === active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
                aria-hidden={i !== active}
              >
                <s.Screen />
              </div>
            ))}
          </PhoneFrame>
          <div className="pointer-events-none absolute -bottom-6 -left-24 w-44">
            {STEPS.map((s, i) => (
              <Image
                key={s.pose}
                src={s.pose}
                alt=""
                width={750}
                height={900}
                sizes="180px"
                className={`absolute bottom-0 left-0 h-auto w-full drop-shadow-[0_22px_28px_rgba(21,18,58,0.3)] transition-all duration-500 ${i === active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              />
            ))}
            <div className="invisible aspect-[5/6]" />
          </div>
        </div>
      </div>

      {/* Mobile / reduced motion: stacked steps */}
      <div className="mx-auto w-full max-w-xl space-y-16 px-5 py-20 sm:px-8 lg:hidden lg:motion-reduce:block">
        <div>
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Nasıl çalışır")}</p>
          <h2 className="mt-3 text-balance font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.03em] text-heading">{t("Konuş. Düzelt. Tekrar et.")}</h2>
        </div>
        {STEPS.map((s) => (
          <div key={s.n} className="flex flex-col items-center gap-6 text-center">
            <PhoneFrame>
              <s.Screen />
            </PhoneFrame>
            <div>
              <span className="font-mono text-xs font-bold text-stage">{s.n}</span>
              <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-heading">{t(s.title)}</h3>
              <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-body">{t(s.text)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
