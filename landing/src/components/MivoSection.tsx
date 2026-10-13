import Image from 'next/image';
import Reveal from './Reveal';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import { LOCALES, LOCALE_META } from "@/i18n/config";

const LANGS = LOCALES.map((l) => LOCALE_META[l].label);

/** Memory notes sit exactly on the four glass cards of the artwork (positions are % of the 4:5 image). */
const NOTES = [
  { kind: tr("Ad"), text: "Ece", x: 32, y: 15, tilt: '-rotate-[4deg]' },
  { kind: tr("Konu"), text: tr("İş mülakatı"), x: 20.5, y: 32.5, tilt: '-rotate-[2deg]' },
  { kind: tr("Hedef"), text: tr("Vize görüşmesi"), x: 21.5, y: 51, tilt: 'rotate-[1deg]' },
  { kind: tr("Konu"), text: tr("Havalimanı sohbeti"), x: 27, y: 71, tilt: 'rotate-[2deg]' },
];

export default function MivoSection() {
  const t = getT();
  return (
    <section id={anchorId("mivo", getLocale())} className="relative bg-white px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="relative mx-auto grid max-w-[88rem] overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#efeaff] via-white to-[#e3f3ff] shadow-lifted sm:rounded-[3rem] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* Mivo's artwork runs to the card edges; the notes are written on its glass cards */}
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/hero/mivo-memory.webp"
            alt={t("Mivo, anıları saklıyor")}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-white/40 lg:to-white/70" />

          {NOTES.map((n, i) => (
            <div
              key={n.text}
              className={`absolute z-10 w-[30%] -translate-x-1/2 -translate-y-1/2 text-center ${n.tilt}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, animation: `stage-in 0.8s cubic-bezier(0.2,0.8,0.2,1) ${0.15 * i}s both` }}
            >
              <span className="block font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-stage sm:text-[0.62rem]">{t(n.kind)}</span>
              <span className="mt-0.5 block font-display text-[0.8rem] font-extrabold leading-tight text-heading sm:text-lg">{t(n.text)}</span>
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
