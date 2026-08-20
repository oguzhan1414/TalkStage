import Image from "next/image";
import Reveal from "./Reveal";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";

export default function FinalCta() {
  return (
    <section id="indir" className="relative scroll-mt-24 overflow-hidden px-6 py-24 sm:py-32">
      {/* Background Soft Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-indigo/15 via-cyan/12 to-transparent blur-[110px]"
      />

      <Reveal className="relative mx-auto max-w-4xl text-center">
        {/* 3D Sunlit Stage Banner */}
        <div className="relative mx-auto mb-10 aspect-[21/9] w-full overflow-hidden rounded-[30px] border border-line bg-white shadow-[var(--shadow-lifted)]">
          <Image
            src="/images/13_final_cta_banner.png"
            alt="TalkStage Sunlit Auditorium Stage and Microphone"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <span className="font-mono text-[0.78rem] font-medium uppercase tracking-[0.14em] text-indigo">
          Sahnen Seni Bekliyor
        </span>

        <h2 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
          Sahne Hazır. İlk Cümleni Söyle.
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-balance leading-relaxed text-body sm:text-lg">
          Günde 5 dakikalık bir canlı senaryo ile konuşma kilitlenmesini geride bırak. İlk oturumun tamamen ücretsiz.
        </p>

        {/* Store Download Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={iosStoreUrl}
            className="inline-flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-heading px-7 py-3.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <AppleMark />
            <span className="text-left leading-tight">
              <span className="block text-[0.65rem] text-white/60 uppercase tracking-wider">İndir</span>
              <span className="block text-[0.95rem] font-bold">App Store</span>
            </span>
          </a>

          <a
            href={androidStoreUrl}
            className="inline-flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-heading px-7 py-3.5 text-white shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <PlayMark />
            <span className="text-left leading-tight">
              <span className="block text-[0.65rem] text-white/60 uppercase tracking-wider">İndir</span>
              <span className="block text-[0.95rem] font-bold">Google Play</span>
            </span>
          </a>
        </div>

        <p className="mt-6 text-xs text-muted">
          Kredi kartı gerekmez • Anında kurulum • iOS & Android
        </p>
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
