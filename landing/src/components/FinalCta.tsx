import Image from "next/image";
import Link from "@/i18n/Link";
import Reveal from "./Reveal";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

export default function FinalCta() {
  const t = getT();
  return (
    <section id={anchorId("download", getLocale())} className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28">
      <Reveal className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] bg-paper shadow-lifted sm:rounded-[3.5rem]">
        {/* the scene runs edge to edge; a light wash keeps the text readable */}
        <Image src="/scenes/istanbul-tour.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_50%]" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-white via-white/85 to-white/20 lg:bg-linear-to-r lg:from-white lg:via-white/85 lg:to-transparent" />

        <div className="relative grid items-end gap-10 px-7 pb-14 pt-64 sm:px-14 sm:pb-20 sm:pt-72 lg:items-center lg:py-32">
          <div className="lg:max-w-[40rem]">
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-stage">{t("Sahne senin")}</p>
            <h2 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.96] tracking-[-0.04em] text-heading sm:text-7xl">{t("Sahne hazır. İlk cümleni söyle.")}</h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-heading/75">{t("Bir sahne seç, Mivo karşında olsun. Takıldığın yerde anında düzeltir; yarın başka bir sürprizle yeniden oynarsın.")}</p>

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
