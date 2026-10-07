import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { androidStoreUrl, iosStoreUrl } from "@/lib/links";

export default function FinalCta() {
  return (
    <section id="indir" className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="grain-overlay relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-ink px-7 py-14 text-white shadow-lifted sm:px-14 sm:py-20">
        {/* Stage lighting: deep indigo pool, a single warm spotlight, velvet folds at the wings */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_34rem_at_76%_-8%,rgba(79,70,229,0.75),transparent_62%),radial-gradient(40rem_22rem_at_78%_108%,rgba(255,194,31,0.16),transparent_65%),radial-gradient(34rem_26rem_at_0%_100%,rgba(14,165,233,0.14),transparent_62%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(90deg,rgba(99,102,241,0.0)_0_22px,rgba(99,102,241,0.16)_22px_44px)] [mask-image:linear-gradient(90deg,#000_0%,transparent_16%,transparent_84%,#000_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 right-[10%] hidden h-[115%] w-[38%] bg-linear-to-b from-white/25 via-white/[0.07] to-transparent blur-[3px] [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)] lg:block"
        />
        {/* Hairlines: gold edge on top, faint frame inside */}
        <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-slate-yellow to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[30px] border border-slate-yellow/15" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-yellow">Sahne senin</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
              Sahne hazır. İlk cümleni söyle.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/75">
              Bir sahne seç, Mivo karşında olsun. Takıldığın yerde anında düzeltir; yarın başka bir sürprizle yeniden
              oynarsın.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={iosStoreUrl}
                className="inline-flex min-w-[12.5rem] items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-ink shadow-[0_18px_40px_-18px_rgba(255,255,255,0.45)] ring-1 ring-slate-yellow/40 transition-all hover:-translate-y-0.5 hover:bg-slate-yellow"
              >
                <AppleMark />
                <span className="text-left leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-ink/55">İndir</span>
                  <span className="block text-[0.95rem] font-bold">App Store</span>
                </span>
              </a>
              <a
                href={androidStoreUrl}
                className="inline-flex min-w-[12.5rem] items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-ink shadow-[0_18px_40px_-18px_rgba(255,255,255,0.45)] ring-1 ring-slate-yellow/40 transition-all hover:-translate-y-0.5 hover:bg-slate-yellow"
              >
                <PlayMark />
                <span className="text-left leading-tight">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-ink/55">İndir</span>
                  <span className="block text-[0.95rem] font-bold">Google Play</span>
                </span>
              </a>
            </div>

            <p className="mt-5 text-sm text-white/60">
              Telefonun yanında değil mi?{" "}
              <Link href="/onboarding" className="font-semibold text-white underline decoration-slate-yellow/70 underline-offset-4">
                Web’den başla
              </Link>
              .
            </p>
          </div>

          {/* Mivo in the spotlight, standing on a lit stage disc */}
          <div className="relative mx-auto w-full max-w-[18rem] lg:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-3 left-1/2 h-12 w-[92%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,194,31,0.55),rgba(255,194,31,0.12)_55%,transparent_72%)] blur-[2px]"
            />
            <div aria-hidden className="absolute -bottom-2 left-1/2 h-9 w-[78%] -translate-x-1/2 rounded-[50%] border border-slate-yellow/40" />
            <Image
              src="/mivo/success.webp"
              alt="Sevinen Mivo"
              width={750}
              height={900}
              sizes="(max-width: 1024px) 60vw, 360px"
              className="relative h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
            />
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
