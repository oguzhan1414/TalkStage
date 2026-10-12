import Image from 'next/image';
import Reveal from './Reveal';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import { LOCALES, LOCALE_META } from "@/i18n/config";

const LANGS = LOCALES.map((l) => LOCALE_META[l].label);

/** Example memory notes floating around Mivo. Anchors are in the same 100×120 space as the SVG lines. */
const NOTES = [
  { kind: tr("Ad"), text: "Ece", x: 76, y: 9, delay: '0s' },
  { kind: tr("Konu"), text: tr("İş mülakatı"), x: 17, y: 24, delay: '-1.4s' },
  { kind: tr("Hedef"), text: tr("Vize görüşmesi"), x: 84, y: 50, delay: '-2.6s' },
  { kind: tr("Konu"), text: tr("Havalimanı sohbeti"), x: 19, y: 72, delay: '-3.8s' },
];

export default function MivoSection() {
  const t = getT();
  return (
    <section
      id={anchorId("mivo", getLocale())}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-linear-to-b from-white via-paper to-white px-5 py-24 sm:px-8 lg:py-20"
    >
      {/* soft colour fields instead of the old night sky */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_65%)] blur-3xl" style={{ animation: 'float 15s ease-in-out infinite' }} />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16),transparent_65%)] blur-3xl" style={{ animation: 'float 18s ease-in-out -6s infinite' }} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* Mivo + the notes it keeps */}
        <Reveal className="relative mx-auto aspect-[5/6] w-full max-w-[26rem] lg:max-w-[28rem]">
          <div
            aria-hidden
            className="absolute left-1/2 top-[64%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.30),transparent_68%)]"
          />
          <div aria-hidden className="absolute left-1/2 top-[64%] aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-stage/15" />
          <div aria-hidden className="absolute left-1/2 top-[64%] aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-stage/20" />

          <svg aria-hidden viewBox="0 0 100 120" className="absolute inset-0 h-full w-full">
            {NOTES.map((n) => (
              <g key={n.text}>
                <line x1="50" y1="80" x2={n.x} y2={n.y} stroke="rgba(79,70,229,0.35)" strokeWidth="0.35" strokeDasharray="1.2 1.6" />
                <circle cx={n.x} cy={n.y} r="1" fill="#7C5CFF" />
              </g>
            ))}
          </svg>

          <Image
            src="/mivo/chat-invite.webp"
            alt={t("Mivo el sallıyor")}
            width={900}
            height={900}
            sizes="(max-width: 1024px) 70vw, 340px"
            className="absolute bottom-0 left-1/2 h-auto w-[66%] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(54,45,148,0.35)]"
          />

          {NOTES.map((n) => (
            <div
              key={n.text}
              className="animate-float absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/75 py-1.5 pl-2.5 pr-3.5 text-[0.8rem] font-semibold text-heading shadow-layered backdrop-blur-xl"
              style={{ left: `${n.x}%`, top: `${(n.y / 120) * 100}%`, animationDelay: n.delay }}
            >
              <span className="mr-1.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-stage">{t(n.kind)}</span>
              {t(n.text)}
            </div>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Mivo ile serbest sohbet")}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-5xl lg:text-[3.6rem]"><span className="bg-linear-to-r from-stage via-purple-pop to-spot bg-clip-text text-transparent">{t("Mivo seni hatırlar.")}</span></h2>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-body sm:text-lg">{t("Konu seçmek zorunda değilsin; ne istersen konuş. Mivo neler konuştuğunuzu aklında tutar, sonraki sohbete kaldığınız yerden başlar.")}</p>

          {/* The returning-user greeting, as it appears in the app */}
          <div className="mt-6 max-w-lg rounded-3xl border border-white/80 bg-white/75 p-4 shadow-lifted backdrop-blur-xl sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-stage">{t("Mivo")}</p>
            <p className="mt-1 text-[0.98rem] leading-relaxed text-heading">{t("Tekrar hoş geldin, Ece! Geçen sefer iş mülakatından konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir konu seç.")}</p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="rounded-full bg-linear-to-r from-stage to-purple-pop px-4 py-2 text-[0.82rem] font-bold text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.8)]">{t("Oradan devam et")}</span>
              <span className="rounded-full border border-stage/25 px-4 py-2 text-[0.82rem] font-semibold text-stage">{t("Yeni bir konu seç")}</span>
            </div>
          </div>

          <ul className="mt-6 grid max-w-xl gap-x-8 gap-y-4 text-[0.9rem] leading-relaxed text-body sm:grid-cols-2">
            <li>
              <p className="font-semibold text-heading">{t("Açıklamalar kendi dilinde")}</p>
              <p className="mt-0.5">{t("Hedef dil hep İngilizce, açıklamalar ana dilinde.")}</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {LANGS.map((l) => (
                  <span key={l} className="rounded-full bg-stage/10 px-2.5 py-0.5 font-mono text-[0.66rem] text-stage">
                    {l}
                  </span>
                ))}
              </p>
            </li>
            <li>
              <p className="font-semibold text-heading">{t("Hafıza senin kontrolünde")}</p>
              <p className="mt-0.5">{t("Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.")}</p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
