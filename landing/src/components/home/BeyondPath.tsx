"use client";

import Image from "next/image";
import { useState } from "react";
import { useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { ROOM, ROOM_COUNT } from "@/data/storyDemo";

const TOOLS = [
  { name: tr("Sahneler"), text: tr("Havalimanından doktora, otelden iş mülakatına sesli sahneler. Seviyen ilerledikçe yenileri açılır.") },
  { name: tr("Hata defteri"), text: tr("Düzeltilen cümlelerin bir yerde birikir; dönüp yeniden çalışırsın.") },
  { name: tr("Telaffuz"), text: tr("Söylerken zorlandığın kelimeler ayrı bir listede durur; dinler, yeniden söylersin.") },
];

/** Practice off the story road: the word rooms (playable here with the real kitchen pins) and the other tabs. */
export default function BeyondPath() {
  const t = useT();
  const [open, setOpen] = useState(0);
  const pin = ROOM.pins[open];

  return (
    <section className="bg-page px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[28rem] lg:order-2">
          <div className="relative overflow-hidden rounded-[1.6rem] shadow-[0_40px_60px_-34px_rgba(24,20,77,0.55)]" style={{ aspectRatio: `${ROOM.width} / ${ROOM.height}` }}>
            <Image src={ROOM.image} alt={t("Kelime odası: mutfak")} fill sizes="(max-width: 1024px) 90vw, 448px" className="object-cover" />
            {ROOM.pins.map((p, i) => {
              const active = i === open;
              return (
                <button
                  key={p.en}
                  type="button"
                  aria-pressed={active}
                  aria-label={p.en}
                  onClick={() => setOpen(i)}
                  className={`room-pin absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white shadow-[0_6px_12px_-4px_rgba(0,0,0,0.5)] ${
                    active ? "bg-marker" : "bg-cloth/80"
                  }`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span aria-hidden className={`h-2 w-2 rounded-full ${active ? "bg-cloth" : "bg-white"}`} />
                </button>
              );
            })}
            <div key={pin.en} aria-live="polite" className="vol-in absolute inset-x-4 bottom-4 rounded-2xl bg-page/95 px-5 py-3.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]">
              <p lang="en" className="font-story text-[1.5rem] font-medium leading-none text-cloth-deep">
                {pin.en}
              </p>
              <p className="mt-1 text-[0.95rem] text-body">{t(pin.gloss)}</p>
            </div>
          </div>
        </div>

        <div className="lg:order-1">
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-cloth-deep sm:text-[3.3rem]">
            {t("Hikâyenin dışında da pratik var.")}
          </h2>
          <h3 className="mt-8 font-display text-[1.3rem] font-bold text-cloth-deep">{t("Kelime odaları")}</h3>
          <p className="mt-2 max-w-[32rem] text-[1.05rem] leading-relaxed text-body">
            {t("Bir odanın fotoğrafında eşyaları bulur, adlarını öğrenirsin. Mutfak, yatak odası, havalimanı… {{n}} oda var. Fotoğraftaki noktalara dokun.", { n: ROOM_COUNT })}
          </p>

          <dl className="mt-9 divide-y divide-page-edge border-y border-page-edge">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-display text-[1.05rem] font-bold text-cloth-deep">{t(tool.name)}</dt>
                <dd className="text-[0.98rem] leading-relaxed text-body">{t(tool.text)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
