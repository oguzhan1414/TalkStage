'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Segment = { text: string; bad?: boolean; fix?: string };

type Take = {
  scene: string;
  level: string;
  twist: string;
  image: string;
  objectPosition: string;
  character: string;
  role: string;
  line: string;
  said: Segment[];
  note: string;
};

/** Real mistakes Turkish speakers make, played inside real Spekvia scenes (levels/twists match the app). */
const TAKES: Take[] = [
  {
    scene: 'İstanbul şehir turu',
    level: 'A2',
    twist: 'Sohbet etmek istiyor',
    image: '/scenes/istanbul-tour.webp',
    objectPosition: '70% 50%',
    character: 'Elif',
    role: 'Şehir rehberi',
    line: 'Welcome to Istanbul! Is this your first time here?',
    said: [
      { text: 'No, I ' },
      { text: 'am here', bad: true, fix: 'have been here' },
      { text: ' since last year.' },
    ],
    note: '“Since” ile şimdiki zaman değil “have been” kullanılır.',
  },
  {
    scene: 'Londra’da taksi yolculuğu',
    level: 'A2',
    twist: 'Acele var',
    image: '/scenes/taxi-ride.webp',
    objectPosition: '75% 50%',
    character: 'Tom',
    role: 'Taksi şoförü',
    line: 'Where to, mate? Traffic’s terrible today, so be quick!',
    said: [
      { text: 'I ' },
      { text: 'want go', bad: true, fix: 'want to go' },
      { text: ' to Big Ben.' },
    ],
    note: '“Want” fiilinden sonra “to” gelir: want to go.',
  },
  {
    scene: 'Spor salonunda antrenman',
    level: 'A2',
    twist: 'Öneri iste',
    image: '/scenes/fitness-gym.webp',
    objectPosition: '70% 50%',
    character: 'Jake',
    role: 'Antrenör',
    line: 'What’s your goal — more strength or more cardio?',
    said: [
      { text: 'I ' },
      { text: 'am wanting to be strong', bad: true, fix: 'want to get stronger' },
      { text: '.' },
    ],
    note: '“Want” durum fiilidir; “am wanting” denmez. Doğrusu: I want to get stronger.',
  },
];

type Phase = 'line' | 'typing' | 'fixing' | 'note';

const TYPE_MS = 48;

export default function HeroStage() {
  const [takeIndex, setTakeIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('line');
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const take = TAKES[takeIndex];
  const full = useMemo(() => take.said.map((s) => s.text).join(''), [take]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase('note');
      setTyped(full.length);
      return;
    }
    const later = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };
    if (phase === 'line') {
      setTyped(0);
      later(() => setPhase('typing'), 1600);
    } else if (phase === 'typing') {
      if (typed < full.length) later(() => setTyped((n) => n + 1), TYPE_MS);
      else later(() => setPhase('fixing'), 700);
    } else if (phase === 'fixing') {
      later(() => setPhase('note'), 900);
    } else {
      later(() => {
        setTakeIndex((i) => (i + 1) % TAKES.length);
        setPhase('line');
      }, 4600);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phase, typed, full, reduced]);

  let remaining = typed;
  const rendered = take.said.map((seg, i) => {
    const shown = seg.text.slice(0, Math.max(0, remaining));
    remaining -= seg.text.length;
    if (!shown) return null;
    const showFix = seg.bad && (phase === 'fixing' || phase === 'note') && shown.length === seg.text.length;
    if (!seg.bad) return <span key={i}>{shown}</span>;
    return (
      <span key={i}>
        <span className={showFix ? 'text-coral line-through decoration-2' : ''}>{shown}</span>
        {showFix ? <span className="ml-1 rounded-md bg-emerald/20 px-1 font-semibold text-emerald">{seg.fix}</span> : null}
      </span>
    );
  });

  const speaking = phase === 'line';
  const mivoPose = speaking ? '/mivo/speaking.webp' : phase === 'typing' ? '/mivo/listening.webp' : '/mivo/success.webp';

  return (
    <div className="absolute inset-0">
      {/* 1. Full-bleed scene, cross-fading between takes */}
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink">
        {TAKES.map((t, i) => (
          <Image
            key={t.image}
            src={t.image}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            style={{ objectPosition: t.objectPosition, transition: 'opacity 1s ease, transform 12s ease-out' }}
            className={`object-cover ${i === takeIndex ? 'scale-[1.07] opacity-100' : 'scale-100 opacity-0'}`}
          />
        ))}
        {/* Readability: heavy on the copy side, open on the character side */}
        <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/65 to-ink/5 max-lg:from-ink/80 max-lg:via-ink/60 max-lg:to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/60 to-transparent" />
      </div>

      {/* 2. Mivo steps into the scene */}
      <div className="pointer-events-none absolute bottom-[21.5rem] right-2 z-10 w-36 sm:right-8 sm:w-44 lg:bottom-[5.2rem] lg:left-[46%] lg:right-auto lg:w-[clamp(16rem,24vw,26rem)]">
        <Image
          key={mivoPose}
          src={mivoPose}
          alt="Mivo, yapay zekâ İngilizce koçun"
          width={750}
          height={900}
          sizes="(max-width: 1024px) 176px, 24vw"
          priority
          className="h-auto w-full drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* 3. Live correction card */}
      <div className="absolute inset-x-4 bottom-[4.6rem] z-20 space-y-2 sm:inset-x-8 lg:inset-x-auto lg:bottom-[5.2rem] lg:right-[4.5%] lg:w-[24rem]">
        <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-lifted">
          <div className="mb-1 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
            <span className="font-semibold text-heading">{take.character}</span>
            <span>{take.role}</span>
            {speaking ? (
              <span aria-hidden className="ml-auto flex h-3 items-end gap-0.5">
                {[0, 1, 2, 3].map((b) => (
                  <span
                    key={b}
                    className="h-3 w-0.5 origin-bottom rounded-full bg-spot"
                    style={{ animation: `wave-bar 0.9s ease-in-out ${b * 0.12}s infinite` }}
                  />
                ))}
              </span>
            ) : null}
          </div>
          <p className="text-[0.95rem] font-medium leading-snug text-heading">{take.line}</p>
        </div>

        <div
          className={`ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-stage px-4 py-3 text-white shadow-lifted transition-opacity duration-300 ${
            phase === 'line' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="mb-1 font-mono text-[0.62rem] uppercase tracking-wider text-white/65">Sen</div>
          <p className={`text-[0.95rem] font-medium leading-snug ${phase === 'typing' ? 'caret' : ''}`}>{rendered}</p>
        </div>

        <div
          className={`max-w-[96%] rounded-2xl border border-white/25 bg-ink/80 px-4 py-2.5 shadow-lifted backdrop-blur-md transition-all duration-500 ${
            phase === 'note' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <p className="text-[0.82rem] leading-snug text-white/85">
            <span className="mr-1.5 font-bold text-slate-yellow">Mivo</span>
            {take.note}
          </p>
        </div>
      </div>

      {/* 4. "Now playing" slate along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-stretch border-t border-white/10 bg-ink/85 backdrop-blur-md">
        <div aria-hidden className="slate-stripes w-10 shrink-0 sm:w-16" />
        <dl className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-wider text-white/90 sm:text-[0.68rem]">
          <div className="min-w-0">
            <dt className="text-white/45">Sahne</dt>
            <dd className="truncate font-semibold">{take.scene}</dd>
          </div>
          <div>
            <dt className="text-white/45">Seviye</dt>
            <dd className="font-semibold">{take.level}</dd>
          </div>
          <div>
            <dt className="text-white/45">Take</dt>
            <dd className="font-semibold">{takeIndex + 1}</dd>
          </div>
          <div className="max-sm:hidden">
            <dt className="text-white/45">Bu sefer</dt>
            <dd>
              <span className="rounded-full bg-coral-glow px-2 py-0.5 font-semibold text-white">{take.twist}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
