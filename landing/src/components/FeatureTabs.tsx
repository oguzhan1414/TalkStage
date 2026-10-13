'use client';

import Image from 'next/image';
import { useState } from 'react';

import Reveal from '@/components/Reveal';
import { pickShot, SHOT_RATIO, type ShotSlot } from '@/data/appShots';
import { useLocale, useT } from '@/i18n/client';
import { tr } from '@/i18n/shared';

const TABS: { id: string; icon: string; title: string; text: string; slots: ShotSlot[]; tint: string }[] = [
  {
    id: 'scenes',
    icon: 'scenes',
    title: tr("Sahneler"),
    text: tr("21 gerçek hayat sahnesi, A1’den B2’ye. Kısa bir videoyla başlar, Mivo karakteri canlı oynar; her oynayışta başka bir durum çıkar."),
    slots: ['scenes'],
    tint: 'from-[#e9e4ff] to-[#dcefff]',
  },
  {
    id: 'words',
    icon: 'words',
    title: tr("Kelimeler"),
    text: tr("900 çekirdek kelime, aralıklı tekrarla (SM-2) tam unutmak üzereyken karşına çıkar."),
    slots: ['words'],
    tint: 'from-[#fff1d6] to-[#ffe4ec]',
  },
  {
    id: 'pron',
    icon: 'pronunciation',
    title: tr("Telaffuz"),
    text: tr("Türkçe konuşanların zorlandığı kelimeleri tek tek dinle ve tekrar et."),
    slots: ['pron'],
    tint: 'from-[#dcefff] to-[#e4f9ee]',
  },
  {
    id: 'listen',
    icon: 'podcasts',
    title: tr("Okuma ve podcast"),
    text: tr("160+ okuma hikâyesi ve 40 podcast bölümü. Cümleyi dinle, boşluğu doldur, sıraya diz; podcast’te bir cümleye dokununca ses oraya atlar."),
    slots: ['listen'],
    tint: 'from-[#ffe4ec] to-[#e9e4ff]',
  },
  {
    id: 'mistakes',
    icon: 'mistakes',
    title: tr("Hata defterim"),
    text: tr("Konuşmalarda düzeltilen cümleler defterine düşer; geri dönüp çalışırsın."),
    slots: ['mistakes', 'progress'],
    tint: 'from-[#e4f9ee] to-[#fff1d6]',
  },
];

/** Interactive tour: pick a feature on the left, its real store visual appears on the right. */
export default function FeatureTabs() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <section aria-labelledby="features-title" className="relative overflow-hidden bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Özellikler")}</p>
          <h2 id="features-title" className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Konuşmanın etrafındaki her şey de burada.")}</h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div role="tablist" aria-label={t("Özellikler")} className="flex flex-col gap-3">
            {TABS.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  id={`feature-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="feature-panel"
                  onClick={() => setActive(i)}
                  className={`group flex items-start gap-4 rounded-3xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                    on ? 'border-white bg-white shadow-lifted' : 'border-transparent bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <Image
                    src={`/icons/${item.icon}.webp`}
                    alt=""
                    width={96}
                    height={96}
                    className={`h-12 w-12 shrink-0 object-contain transition-transform duration-300 sm:h-14 sm:w-14 ${on ? 'scale-105' : 'grayscale-[40%] group-hover:grayscale-0'}`}
                  />
                  <span className="min-w-0">
                    <span className={`block font-display text-xl font-bold tracking-tight ${on ? 'text-heading' : 'text-body'}`}>{t(item.title)}</span>
                    <span className={`grid transition-all duration-300 ${on ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <span className="overflow-hidden text-[0.95rem] leading-relaxed text-body">{t(item.text)}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${tab.id}`} className="relative mx-auto w-full max-w-[26rem]">
            <div aria-hidden className={`absolute -inset-5 rounded-[3rem] bg-linear-to-br ${tab.tint} opacity-90 blur-sm transition-colors duration-500`} />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_90px_-30px_rgba(54,45,148,0.5)] ring-1 ring-white/80">
              {TABS.map((item, i) => {
                const shot = pickShot(locale, item.slots);
                return (
                  <Image
                    key={item.id}
                    src={shot.src}
                    alt={i === active ? shot.alt : ''}
                    width={SHOT_RATIO.width}
                    height={SHOT_RATIO.height}
                    sizes="(max-width: 1024px) 80vw, 420px"
                    aria-hidden={i !== active}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${i === active ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-[0.98] opacity-0'}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
