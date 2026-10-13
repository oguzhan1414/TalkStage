import Image from 'next/image';
import Reveal from './Reveal';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import { LOCALES, LOCALE_META } from "@/i18n/config";

const LANGS = LOCALES.map((l) => LOCALE_META[l].label);

/** Example memory notes pinned on Mivo's artwork, as if they sat inside the floating speech bubbles. */
const NOTES = [
  { kind: tr("Ad"), text: "Ece", className: 'left-[7%] top-[9%]', delay: '0s' },
  { kind: tr("Konu"), text: tr("İş mülakatı"), className: 'left-[30%] top-[22%]', delay: '-1.6s' },
  { kind: tr("Hedef"), text: tr("Vize görüşmesi"), className: 'left-[6%] top-[38%]', delay: '-3.1s' },
  { kind: tr("Konu"), text: tr("Havalimanı sohbeti"), className: 'left-[12%] top-[54%] hidden sm:flex', delay: '-4.4s' },
];

export default function MivoSection() {
  const t = getT();
  return (
    <section id={anchorId("mivo", getLocale())} className="relative bg-white px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="relative mx-auto grid max-w-[88rem] overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#efeaff] via-white to-[#e3f3ff] shadow-lifted sm:rounded-[3rem] lg:grid-cols-[0.95fr_1.05fr]">
        {/* Mivo's artwork runs to the card edges; memory notes float on top of it */}
        <div className="relative h-[24rem] sm:h-[30rem] lg:h-auto lg:min-h-[40rem]">
          <Image
            src="/hero/hero-sky.webp"
            alt={t("Mivo el sallıyor")}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover object-[62%_30%]"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-white/30 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-white/60" />

          <p className="absolute right-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-stage shadow-layered backdrop-blur sm:right-8 sm:top-8">{t("Mivo")}</p>

          {NOTES.map((n) => (
            <div
              key={n.text}
              className={`animate-float absolute z-10 items-center whitespace-nowrap rounded-full border border-white bg-white/90 py-2 pl-3 pr-4 text-[0.88rem] font-semibold text-heading shadow-lifted backdrop-blur-xl ${n.className.includes('hidden') ? n.className : `flex ${n.className}`}`}
              style={{ animationDelay: n.delay }}
            >
              <span className="mr-2 rounded-md bg-stage/10 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-stage">{t(n.kind)}</span>
              {t(n.text)}
            </div>
          ))}
        </div>

        <div className="relative p-6 sm:p-10 lg:p-14">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Mivo ile serbest sohbet")}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            <span className="bg-linear-to-r from-stage via-purple-pop to-spot bg-clip-text text-transparent">{t("Mivo seni hatırlar.")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-body sm:text-lg">{t("Konu seçmek zorunda değilsin; ne istersen konuş. Mivo neler konuştuğunuzu aklında tutar, sonraki sohbete kaldığınız yerden başlar.")}</p>

          {/* the returning-user greeting, as a chat */}
          <div className="mt-7 flex items-end gap-3">
            <Image src="/mivo/wave.webp" alt="" width={96} height={115} className="hidden h-16 w-auto shrink-0 sm:block" />
            <div className="max-w-xl rounded-3xl rounded-bl-md border border-white bg-white p-4 shadow-lifted sm:p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-wider text-stage">{t("Mivo")}</p>
              <p className="mt-1 text-[1rem] leading-relaxed text-heading">{t("Tekrar hoş geldin, Ece! Geçen sefer iş mülakatından konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir konu seç.")}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-end gap-2 sm:pr-2">
            <span className="rounded-full bg-linear-to-r from-stage to-purple-pop px-4 py-2.5 text-[0.85rem] font-bold text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.8)]">{t("Oradan devam et")}</span>
            <span className="rounded-full border border-stage/25 bg-white px-4 py-2.5 text-[0.85rem] font-semibold text-stage">{t("Yeni bir konu seç")}</span>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="rounded-3xl border border-white bg-white/70 p-5 backdrop-blur">
              <p className="font-display text-lg font-bold tracking-tight text-heading">{t("Açıklamalar kendi dilinde")}</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-body">{t("Hedef dil hep İngilizce, açıklamalar ana dilinde.")}</p>
              <p className="mt-3 flex flex-wrap gap-1.5">
                {LANGS.map((l) => (
                  <span key={l} className="rounded-full bg-stage/10 px-2.5 py-0.5 font-mono text-[0.66rem] text-stage">
                    {l}
                  </span>
                ))}
              </p>
            </li>
            <li className="rounded-3xl border border-white bg-white/70 p-5 backdrop-blur">
              <p className="font-display text-lg font-bold tracking-tight text-heading">{t("Hafıza senin kontrolünde")}</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-body">{t("Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.")}</p>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
