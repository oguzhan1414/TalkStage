import Image from 'next/image';

import Reveal from './Reveal';
import { pickShot, SHOT_RATIO, type ShotSlot } from '@/data/appShots';
import { getLocale, getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const STEPS: { n: string; title: string; text: string; slots: ShotSlot[]; bg: string; top: string; tilt: string }[] = [
  {
    n: '01',
    title: tr("Konuş"),
    text: tr("Havalimanında, otelde, mülakatta… Mivo sahnedeki karşı tarafı oynar, sen sesli konuşursun."),
    slots: ['chat', 'pron'],
    bg: 'bg-[#e6e0ff]',
    top: 'lg:top-24',
    tilt: 'rotate-[3deg]',
  },
  {
    n: '02',
    title: tr("Düzelt"),
    text: tr("Takıldığın cümle konuşma kesilmeden düzeltilir ve nedeni kendi dilinde, tek cümleyle anlatılır."),
    slots: ['mistakes', 'progress'],
    bg: 'bg-[#d6f4e4]',
    top: 'lg:top-32',
    tilt: '-rotate-[3deg]',
  },
  {
    n: '03',
    title: tr("Tekrar et"),
    text: tr("Hataların Hata Defterim'e düşer. Hızlı sınavla pekiştirir, gün gün planınla ilerlersin."),
    slots: ['words'],
    bg: 'bg-[#ffe6cf]',
    top: 'lg:top-40',
    tilt: 'rotate-[3deg]',
  },
];

/** Three big cards that stack on top of each other while you scroll (plain CSS sticky, no scripts). */
export default function HowItWorks() {
  const t = getT();
  const locale = getLocale();
  return (
    <section aria-labelledby="how-title" className="relative bg-white px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[88rem]">
        <Reveal className="mx-auto max-w-3xl px-1 pb-12 text-center sm:pb-16">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Nasıl çalışır")}</p>
          <h2 id="how-title" className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-heading sm:text-7xl">{t("Konuş. Düzelt. Tekrar et.")}</h2>
        </Reveal>

        <ol className="space-y-6">
          {STEPS.map((s) => {
            const shot = pickShot(locale, s.slots);
            return (
              <li key={s.n} className={`${s.top} lg:sticky`}>
                <div className={`relative grid min-h-[30rem] overflow-hidden rounded-[2.25rem] ${s.bg} sm:rounded-[3rem] lg:min-h-[34rem] lg:grid-cols-[1.05fr_0.95fr]`}>
                  <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/50 blur-3xl" />
                  <div className="relative flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                    <span aria-hidden className="font-display text-[6rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_#15123a] sm:text-[9rem]">{s.n}</span>
                    <h3 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.035em] text-heading sm:text-7xl">{t(s.title)}</h3>
                    <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-heading/75 sm:text-xl">{t(s.text)}</p>
                  </div>
                  <div className="relative h-[24rem] sm:h-[28rem] lg:h-auto">
                    <div className={`absolute left-1/2 top-2 w-[15.5rem] -translate-x-1/2 sm:w-[18rem] lg:top-10 lg:w-[21rem] ${s.tilt}`}>
                      <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-24px_rgba(21,18,58,0.5)] ring-1 ring-white/80">
                        <Image src={shot.src} alt={shot.alt} width={SHOT_RATIO.width} height={SHOT_RATIO.height} sizes="340px" className="h-auto w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
