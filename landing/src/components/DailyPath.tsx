import Image from 'next/image';
import Reveal from './Reveal';
import PathDraw from './PathDraw';
import a1Level from '../assets/levels/a1-rounded.png';
import a2Level from '../assets/levels/a2-rounded.png';
import b1Level from '../assets/levels/b1-rounded.png';
import b2Level from '../assets/levels/b2-rounded.png';
import c1Level from '../assets/levels/c1-rounded.png';
import c2Level from '../assets/levels/c2-rounded.png';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";

// Static imports give each image a content-hashed URL when the artwork changes.
const LEVELS = [
  { code: 'A1', image: a1Level },
  { code: 'A2', image: a2Level },
  { code: 'B1', image: b1Level },
  { code: 'B2', image: b2Level },
  { code: 'C1', image: c1Level },
  { code: 'C2', image: c2Level },
] as const;

type Tile = { icon: string; title: string; text: string; className?: string };

const TILES: Tile[] = [
  {
    icon: 'reading',
    title: tr("Okuma"),
    text: tr("A1–A2 hikâyelerinde dinle, boşluğu doldur, kelimeyi harf harf yaz, cümleyi sıraya diz; sonunda sahnedeki cümleyi sesli söyle."),
  },
  {
    icon: 'podcasts',
    title: tr("Podcast"),
    text: tr("40 bölüm, iki dilli transkript. Bir cümleye dokununca ses oraya atlar; bölümü bitirince mini test gelir."),
  },
  {
    icon: 'words',
    title: tr("Kelimeler"),
    text: tr("900 çekirdek kelime, aralıklı tekrarla (SM-2) tam unutmak üzereyken karşına çıkar."),
  },
  {
    icon: 'mistakes',
    title: tr("Hata defterim"),
    text: tr("Konuşmalarda düzeltilen cümleler defterine düşer; geri dönüp çalışırsın."),
  },
  {
    icon: 'pronunciation',
    title: tr("Telaffuz"),
    text: tr("Türkçe konuşanların zorlandığı kelimeleri tek tek dinle ve tekrar et."),
  },
];

export default function DailyPath() {
  const t = getT();
  return (
    <section id={anchorId("path", getLocale())} className="relative scroll-mt-24 overflow-hidden bg-linear-to-b from-white via-paper to-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Günlük yol")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Her gün tek bir sonraki adım.")}</h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-body">{t("Ne çalışacağını seçmek için vakit harcama. Bugün sekmesi sıradaki işi gösterir.")}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Lead tile: the day-by-day road */}
          <Reveal className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-linear-to-br from-[#efeaff] via-white to-[#e6f5ff] p-7 text-heading shadow-lifted sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-pop/15 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-spot/15 blur-3xl" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <Image src="/icons/today.webp" alt="" width={256} height={256} className="h-16 w-16" />
                  <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{t("Bugün")}</h3>
                  <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-body">{t("Seviyene göre gün gün ilerleyen bir yol. Her gün birkaç küçük görev: konu anlatımı, okuma, podcast ve Mivo ile tekrar.")}</p>
                  <ol className="mt-6 flex flex-wrap gap-2 text-[0.78rem] font-semibold">
                    {[tr("Gün 1 · Öğren"), tr("Gün 2 · Oku ve dinle"), tr("Gün 3 · Mivo ile pekiştir")].map((step) => (
                      <li key={step} className="rounded-full border border-stage/15 bg-white px-3.5 py-1.5 text-stage shadow-layered">
                        {t(step)}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-3xl border border-line bg-white p-4 shadow-layered sm:p-6">
                  <PathDraw />
                </div>
              </div>
            </div>
          </Reveal>

          {TILES.map((tile, i) => (
            <Reveal key={tile.icon} delay={i * 70} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <div className="flex h-full items-start gap-4 rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-layered backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted sm:p-6">
                <Image src={`/icons/${tile.icon}.webp`} alt="" width={96} height={96} className="h-16 w-16 shrink-0 object-contain" />
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-heading">{t(tile.title)}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-body">{t(tile.text)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Levels */}
        <Reveal className="mt-20">
          <div className="grid items-center gap-8 rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-layered backdrop-blur-xl sm:p-9 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">{t("Doğru yerden başla")}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-body">{t("Kısa bir seviye belirleme seni A1’den C2’ye uzanan yolda doğru basamağa koyar. İçerik ve kilitler buna göre şekillenir; hazır olduğunda üst seviyeye geçersin.")}</p>
            </div>
            <ul className="grid grid-cols-6 gap-2 sm:gap-4">
              {LEVELS.map((lv) => (
                <li key={lv.code} className="flex justify-center">
                  <Image src={lv.image} alt={lv.code} width={120} height={120} sizes="84px" className="h-auto w-full max-w-[84px]" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
