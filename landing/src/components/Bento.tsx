import Image from 'next/image';

import Reveal from './Reveal';
import CountUp from './motion/CountUp';
import { pickShot, SHOT_RATIO, type ShotSlot } from '@/data/appShots';
import { getLocale, getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const FACTS = [
  { value: 21, suffix: '', label: tr("sahne · A1–B2") },
  { value: 40, suffix: '', label: tr("podcast bölümü") },
  { value: 160, suffix: '+', label: tr("okuma hikâyesi") },
  { value: 5, suffix: '', label: tr("dilde açıklama") },
];

type Tile = {
  id: string;
  icon: string;
  title: string;
  text: string;
  slots: ShotSlot[];
  bg: string;
  span: string;
  layout: 'stack' | 'side';
  tall?: boolean;
};

const TILES: Tile[] = [
  {
    id: 'scenes',
    icon: 'scenes',
    title: tr("Sahneler"),
    text: tr("21 gerçek hayat sahnesi, A1’den B2’ye. Kısa bir videoyla başlar, Mivo karakteri canlı oynar; her oynayışta başka bir durum çıkar."),
    slots: ['scenes'],
    bg: 'bg-[#e6e0ff]',
    span: 'lg:col-span-5 lg:row-span-2',
    layout: 'stack',
    tall: true,
  },
  {
    id: 'words',
    icon: 'words',
    title: tr("Kelimeler"),
    text: tr("900 çekirdek kelime, aralıklı tekrarla (SM-2) tam unutmak üzereyken karşına çıkar."),
    slots: ['words'],
    bg: 'bg-[#ffe6cf]',
    span: 'lg:col-span-4',
    layout: 'stack',
  },
  {
    id: 'pron',
    icon: 'pronunciation',
    title: tr("Telaffuz"),
    text: tr("Türkçe konuşanların zorlandığı kelimeleri tek tek dinle ve tekrar et."),
    slots: ['pron'],
    bg: 'bg-[#d8ecff]',
    span: 'lg:col-span-3',
    layout: 'stack',
  },
  {
    id: 'listen',
    icon: 'podcasts',
    title: tr("Okuma ve podcast"),
    text: tr("160+ okuma hikâyesi ve 40 podcast bölümü. Cümleyi dinle, boşluğu doldur, sıraya diz; podcast’te bir cümleye dokununca ses oraya atlar."),
    slots: ['listen'],
    bg: 'bg-[#ffdfe9]',
    span: 'lg:col-span-6',
    layout: 'side',
  },
  {
    id: 'mistakes',
    icon: 'mistakes',
    title: tr("Hata defterim"),
    text: tr("Konuşmalarda düzeltilen cümleler defterine düşer; geri dönüp çalışırsın."),
    slots: ['mistakes', 'progress'],
    bg: 'bg-[#d6f4e4]',
    span: 'lg:col-span-6',
    layout: 'side',
  },
];

/** A bento grid of coloured tiles; every phone poster bleeds off the tile edge, so nothing sits in empty space. */
export default function Bento() {
  const t = getT();
  const locale = getLocale();
  return (
    <section aria-labelledby="bento-title" className="relative bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[88rem]">
        <Reveal className="mx-auto max-w-4xl px-1 pb-12 text-center sm:pb-16">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Özellikler")}</p>
          <h2 id="bento-title" className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-heading sm:text-6xl">{t("Konuşmanın etrafındaki her şey de burada.")}</h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {TILES.slice(0, 1).map((tile) => renderTile(tile))}

          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-[2rem] bg-slate-yellow p-6 sm:rounded-[2.5rem] sm:p-9">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{t(f.label)}</dt>
                    <dd className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-heading sm:text-6xl">
                      <CountUp value={f.value} suffix={f.suffix} />
                    </dd>
                    <dd className="mt-2 text-[0.85rem] font-medium leading-tight text-heading/75">{t(f.label)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {TILES.slice(1, 3).map((tile) => renderTile(tile))}
          {TILES.slice(3).map((tile) => renderTile(tile))}
        </div>
      </div>
    </section>
  );

  function renderTile(tile: Tile) {
    const shot = pickShot(locale, tile.slots);
    const side = tile.layout === 'side';
    return (
      <Reveal key={tile.id} className={tile.span}>
        <div className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] ${tile.bg} sm:rounded-[2.5rem] ${side ? 'sm:min-h-[25rem] sm:flex-row' : ''}`}>
          <div className={`relative z-10 p-6 sm:p-9 ${side ? 'sm:w-[54%] sm:shrink-0' : ''}`}>
            <Image src={`/icons/${tile.icon}.webp`} alt="" width={96} height={96} className="h-12 w-12 object-contain" />
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.025em] text-heading sm:text-3xl">{t(tile.title)}</h3>
            <p className="mt-2 max-w-md text-pretty text-[0.95rem] leading-relaxed text-heading/75">{t(tile.text)}</p>
          </div>
          {/* the poster lives in its own zone below the text, so it can never cover it, and bleeds off the tile edge */}
          <div className={`relative ${side ? 'h-[19rem] sm:h-auto sm:flex-1' : tile.tall ? 'min-h-[22rem] flex-1' : 'h-[19rem] shrink-0'}`}>
            <div
              className={`absolute top-1 w-[56%] max-w-[15rem] ${
                side
                  ? 'left-1/2 -translate-x-1/2 rotate-[3deg] sm:left-auto sm:right-8 sm:top-6 sm:w-[78%] sm:translate-x-0 sm:rotate-[4deg]'
                  : tile.tall
                    ? 'left-1/2 w-[64%] max-w-[19rem] -translate-x-1/2 rotate-[3deg]'
                    : 'left-1/2 -translate-x-1/2 rotate-[3deg]'
              }`}
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-24px_rgba(21,18,58,0.5)] ring-1 ring-white/80">
                <Image src={shot.src} alt={shot.alt} width={SHOT_RATIO.width} height={SHOT_RATIO.height} sizes="(max-width: 1024px) 60vw, 300px" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}
