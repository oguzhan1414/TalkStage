'use client';

import Image from 'next/image';

import { useT } from '@/i18n/client';

/** The three app screens used by the scroll story: speak, get corrected, review. Built in code so every language works. */

export function SpeakScreen() {
  const t = useT();
  return (
    <div className="flex h-full flex-col bg-linear-to-b from-paper to-white px-4 pb-6 pt-12">
      <div className="flex items-center justify-between">
        <span className="text-[0.78rem] font-bold text-heading">{t("Havalimanı")}</span>
        <span className="rounded-full bg-stage/10 px-2 py-0.5 font-mono text-[0.58rem] font-bold text-stage">A2</span>
      </div>
      <div className="mt-4 max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-layered">
        <div className="mb-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-muted">{t("Mivo")}</div>
        <p className="text-[0.82rem] font-medium leading-snug text-heading">Where are you flying today?</p>
      </div>
      <div className="relative mt-auto flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-stage/15" />
          <span aria-hidden className="absolute inset-3 rounded-full bg-stage/15" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-stage to-purple-pop text-white shadow-[0_14px_30px_-10px_rgba(79,70,229,0.8)]">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
            </svg>
          </span>
        </div>
        <div aria-hidden className="mt-3 flex h-6 items-end gap-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="w-1 origin-bottom rounded-full bg-spot"
              style={{ height: 20, animation: `wave-bar 1s ease-in-out ${i * 0.09}s infinite` }}
            />
          ))}
        </div>
        <p className="mt-3 text-[0.78rem] font-semibold text-stage">{t("Konuşuyorsun…")}</p>
      </div>
    </div>
  );
}

export function FixScreen() {
  const t = useT();
  return (
    <div className="flex h-full flex-col bg-linear-to-b from-paper to-white px-4 pb-6 pt-12">
      <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-linear-to-br from-stage to-purple-pop px-3.5 py-3 text-white shadow-layered">
        <p className="text-[0.84rem] font-medium leading-snug">
          I <span className="text-white/60 line-through decoration-2">go</span>{' '}
          <span className="rounded-md bg-white/25 px-1 font-bold">went</span> to the airport yesterday.
        </p>
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-white p-3.5 shadow-layered">
        <div className="flex items-center gap-2">
          <Image src="/mivo/idle.webp" alt="" width={28} height={34} className="h-8 w-auto" />
          <span className="text-[0.78rem] font-bold text-stage">{t("Mivo")}</span>
        </div>
        <p className="mt-2 text-[0.78rem] leading-snug text-body">{t("“go” geçmiş zamanda “went” olur. Dünü anlatıyorsun, o yüzden geçmiş zaman.")}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <span className="rounded-full bg-emerald/10 px-3 py-1.5 text-[0.7rem] font-bold text-emerald">✓ {t("Anında düzeltme")}</span>
        <span className="rounded-full bg-spot/10 px-3 py-1.5 text-[0.7rem] font-bold text-spot">💬 {t("Kendi dilinde açıklama")}</span>
      </div>
    </div>
  );
}

export function ReviewScreen() {
  const t = useT();
  return (
    <div className="flex h-full flex-col bg-linear-to-b from-paper to-white px-4 pb-6 pt-12">
      <div className="flex items-center justify-between">
        <span className="text-[0.82rem] font-bold text-heading">{t("Hata Defterim")}</span>
        <span className="rounded-full bg-coral/10 px-2 py-0.5 text-[0.6rem] font-bold text-coral">3</span>
      </div>
      <div className="mt-3 space-y-2">
        {[
          ['I go to school yesterday.', 'I went to school yesterday.'],
          ['She don’t like coffee.', 'She doesn’t like coffee.'],
        ].map(([wrong, right]) => (
          <div key={wrong} className="rounded-xl border border-line bg-white p-2.5 shadow-layered">
            <p className="text-[0.7rem] text-coral line-through decoration-1">{wrong}</p>
            <p className="mt-0.5 text-[0.74rem] font-semibold text-emerald">{right}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-linear-to-r from-stage to-purple-pop py-2.5 text-center text-[0.8rem] font-bold text-white shadow-[0_10px_24px_-10px_rgba(79,70,229,0.8)]">
        ⚡ {t("Hızlı Sınav")}
      </div>
      <div className="mt-auto">
        <div className="mb-2 font-mono text-[0.58rem] font-semibold uppercase tracking-wider text-muted">{t("Gün gün yolun")}</div>
        <div className="flex items-center gap-1.5">
          {['GÜN 1', 'GÜN 2', 'GÜN 3', 'GÜN 4'].map((d, i) => (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[0.65rem] font-bold ${
                  i < 3 ? 'bg-emerald text-white' : 'border-2 border-stage bg-white text-stage'
                }`}
              >
                {i < 3 ? '✓' : i + 1}
              </span>
              <span className="font-mono text-[0.5rem] font-semibold text-muted">{t('GÜN')} {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
