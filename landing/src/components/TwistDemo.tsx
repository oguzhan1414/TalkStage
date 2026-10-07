'use client';

import Image from 'next/image';
import { useState } from 'react';

type Twist = {
  id: string;
  label: string;
  hint: string;
  character: string;
  expected: string;
};

/** Same scene (airport check-in), four different plays — the twist names/hints are the ones used in the app. */
const TWISTS: Twist[] = [
  {
    id: 'classic',
    label: 'Klasik sahne',
    hint: 'Her şey planlandığı gibi gidiyor.',
    character: 'Hello! Passport and ticket, please.',
    expected: "Here you are. I'm flying to Berlin.",
  },
  {
    id: 'mixup',
    label: 'Karışıklık çıktı',
    hint: 'Bir şey yanlış gelmiş — nazikçe düzelttir.',
    character: 'I have you down for Madrid tomorrow. Is that right?',
    expected: "No, I'm flying to Berlin today.",
  },
  {
    id: 'unavailable',
    label: 'Aradığın yok',
    hint: 'İstediğin şey bitmiş — alternatif bul.',
    character: "I'm sorry, all the window seats are taken. I can offer you an aisle seat.",
    expected: 'An aisle seat is fine, thank you.',
  },
  {
    id: 'hurry',
    label: 'Acele var',
    hint: 'Karşındaki aceleci — kısa ve net konuş.',
    character: 'Boarding closes in ten minutes! Any bags to check in?',
    expected: 'Just one bag, please.',
  },
];

export default function TwistDemo() {
  const [active, setActive] = useState(0);
  const twist = TWISTS[active];

  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-layered">
      <div className="relative aspect-[16/8]">
        <Image
          src="/scenes/airport-travel.webp"
          alt="Havalimanı check-in sahnesi"
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-white/70">Aynı sahne · 4 farklı oynayış</p>
            <p className="font-display text-xl font-bold text-white sm:text-2xl">Havalimanında check-in</p>
          </div>
          <span className="rounded-full bg-slate-yellow px-2.5 py-1 font-mono text-[0.65rem] font-bold text-ink">A1</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div role="tablist" aria-label="Bu sefer" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {TWISTS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`twist-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls="twist-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-colors ${
                i === active
                  ? 'border-coral-glow bg-coral-glow text-white'
                  : 'border-line bg-paper text-body hover:border-stage/40 hover:text-heading'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="twist-panel" role="tabpanel" aria-labelledby={`twist-tab-${twist.id}`} className="mt-5 space-y-3">
          <p className="text-sm text-muted">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-coral-glow">Bu sefer</span>{' '}
            {twist.hint}
          </p>

          <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-paper-deep px-4 py-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">Check-in görevlisi</p>
            <p className="mt-0.5 font-medium text-heading">{twist.character}</p>
          </div>

          <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md border-2 border-dashed border-stage/40 px-4 py-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-stage">Senden beklenen</p>
            <p className="mt-0.5 font-medium text-heading">{twist.expected}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
