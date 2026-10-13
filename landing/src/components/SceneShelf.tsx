import { Star } from 'lucide-react';
import Reveal from './Reveal';
import TwistDemo from './TwistDemo';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";

const STARS = [
  { n: 1, title: tr("Videoyu bitir"), text: tr("Sahnenin kısa videosunu izle, cümleleri sesli tekrar et.") },
  { n: 2, title: tr("Mivo ile canlı oyna"), text: tr("Karakteri Mivo oynar. En az dört cümle konuş.") },
  { n: 3, title: tr("Temiz tamamla"), text: tr("Sahnenin hedeflerini en fazla iki düzeltmeyle bitir.") },
];

export default function SceneShelf() {
  const t = getT();
  return (
    <section id={anchorId("scenes", getLocale())} className="relative scroll-mt-24 overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.14),transparent_65%)] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Sahneler")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Aynı sahne, her seferinde farklı bir sürpriz.")}</h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-body">{t("Önce kısa bir videoyla sahneyi tanırsın, sonra Mivo karakteri canlı oynar. Tekrar oynadığında karşına başka bir durum çıkar: bir karışıklık, bitmiş bir ürün, aceleci bir görevli. Ezberlediğin cümle işe yaramaz; o an ne diyeceğini kendin bulmak zorundasın.")}</p>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <TwistDemo />
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-display text-2xl font-bold tracking-tight text-heading">{t("Her sahnede üç yıldız var")}</h3>
            <ol className="mt-6 space-y-5">
              {STARS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span aria-label={t("{{n}} yıldız", { n: s.n })} className="mt-1 flex w-[3.4rem] shrink-0 gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <Star
                        key={i}
                        aria-hidden
                        className={`h-4 w-4 ${i <= s.n ? 'fill-slate-yellow text-slate-yellow' : 'text-line'}`}
                      />
                    ))}
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{t(s.title)}</p>
                    <p className="mt-0.5 text-[0.95rem] leading-relaxed text-body">{t(s.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl border border-line bg-paper px-5 py-4 text-[0.92rem] leading-relaxed text-body">{t("Seviyene uygun sahneler açık gelir, bir üst seviye “zor” etiketiyle denenebilir. Daha ilerisi, önceki seviyeyi bitirince açılır.")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
