import Image from "next/image";
import Link from "@/i18n/Link";
import Reveal from "./Reveal";
import ParallaxLayer from "./motion/ParallaxLayer";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

export default function FinalCta() {
  const t = getT();
  return (
    <section id={anchorId("download", getLocale())} className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/80 bg-linear-to-br from-[#efeaff] via-white to-[#dff2ff] px-7 py-14 text-heading shadow-lifted sm:px-14 sm:py-20">
        {/* light: two soft colour pools + a faint grid, a glass frame inside */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-purple-pop/25 blur-3xl" style={{ animation: 'float 16s ease-in-out infinite' }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-spot/30 blur-3xl" style={{ animation: 'float 19s ease-in-out -7s infinite' }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[30px] border border-stage/10" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-stage">{t("Sahne senin")}</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl">{t("Sahne hazır. İlk cümleni söyle.")}</h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-body">{t("Bir sahne seç, Mivo karşında olsun. Takıldığın yerde anında düzeltir; yarın başka bir sürprizle yeniden oynarsın.")}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={iosStoreUrl}
                className="inline-flex min-w-[12.5rem] items-center justify-center gap-3 rounded-full bg-linear-to-r from-stage to-purple-pop px-7 py-4 text-white shadow-[0_18px_36px_-16px_rgba(79,70,229,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_rgba(79,70,229,0.8)]"
              >
                <AppleMark />
                <span className="text-left leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-white/60">{t("İndir")}</span>
                  <span className="block text-[0.95rem] font-bold">{t("App Store")}</span>
                </span>
              </a>
              <a
                href={androidStoreUrl}
                className="inline-flex min-w-[12.5rem] items-center justify-center gap-3 rounded-full bg-linear-to-r from-stage to-purple-pop px-7 py-4 text-white shadow-[0_18px_36px_-16px_rgba(79,70,229,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_rgba(79,70,229,0.8)]"
              >
                <PlayMark />
                <span className="text-left leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-white/60">{t("İndir")}</span>
                  <span className="block text-[0.95rem] font-bold">{t("Google Play")}</span>
                </span>
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-heading">{t("Kredi kartı gerekmez · Günde 1 sesli sahne ücretsiz")}</p>
            <p className="mt-2 text-sm text-muted">{t("Telefonun yanında değil mi?")}{" "}<Link href="/onboarding" className="font-semibold text-stage underline decoration-stage/40 underline-offset-4">{t("Web’den başla")}</Link>
              .
            </p>
          </div>

          {/* Mivo floats over a soft glow */}
          <ParallaxLayer speed={0.14} className="relative mx-auto w-full max-w-[18rem] lg:max-w-none">
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_65%)] blur-2xl" />
            <div aria-hidden className="absolute -bottom-3 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-xl" />
            <Image
              src="/mivo/success.webp"
              alt={t("Sevinen Mivo")}
              width={750}
              height={900}
              sizes="(max-width: 1024px) 60vw, 360px"
              className="relative h-auto w-full drop-shadow-[0_30px_40px_rgba(21,18,58,0.45)]"
              style={{ animation: 'float 7s ease-in-out infinite' }}
            />
          </ParallaxLayer>
        </div>
      </Reveal>
    </section>
  );
}

function AppleMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.36 12.9c-.02-2.05 1.68-3.03 1.75-3.08-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.65 0-1.63-.73-2.68-.71-1.38.02-2.65.8-3.36 2.03-1.43 2.48-.37 6.16 1.03 8.18.68.98 1.5 2.09 2.57 2.05 1.03-.04 1.42-.67 2.67-.67 1.24 0 1.6.67 2.68.65 1.11-.02 1.81-1 2.49-1.99.78-1.14 1.1-2.25 1.12-2.3-.02-.01-2.15-.83-2.17-3.29ZM14.3 6.6c.57-.7.96-1.66.85-2.6-.82.03-1.82.55-2.41 1.24-.53.61-.99 1.6-.87 2.53.9.07 1.83-.46 2.43-1.17Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.1 3.3a1.4 1.4 0 0 0-.6 1.15v15.1c0 .46.22.87.6 1.15l9.55-8.7-9.55-8.7Zm11.05 8.05 2.55-2.32 3.02 1.75c.7.4.7 1.4 0 1.8l-3.02 1.75-2.55-2.32v-.66Zm-.75.7-9.5 8.65 11.13-6.43-1.63-2.22Zm0-1.4 1.63-2.22L4.4 2l9.5 8.65 1-1Z" />
    </svg>
  );
}
