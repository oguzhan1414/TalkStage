'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import PhoneFrame from '@/components/PhoneFrame';
import ParallaxLayer from '@/components/motion/ParallaxLayer';
import { TAKES } from '@/data/heroTakes';
import { useT } from '@/i18n/client';

type Phase = 'line' | 'typing' | 'fixing' | 'note';
const TYPE_MS = 46;

/** The hero's phone: a live Spekvia scene that keeps playing (character speaks, learner types, Mivo corrects). */
export default function HeroDevice() {
  const t = useT();
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
      later(() => setPhase('typing'), 1700);
    } else if (phase === 'typing') {
      if (typed < full.length) later(() => setTyped((n) => n + 1), TYPE_MS);
      else later(() => setPhase('fixing'), 650);
    } else if (phase === 'fixing') {
      later(() => setPhase('note'), 900);
    } else {
      later(() => {
        setTakeIndex((i) => (i + 1) % TAKES.length);
        setPhase('line');
      }, 4800);
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
        {showFix ? <span className="ml-1 rounded-md bg-emerald/15 px-1 font-semibold text-emerald">{seg.fix}</span> : null}
      </span>
    );
  });

  const speaking = phase === 'line';
  const mivoPose = speaking ? '/mivo/speaking.webp' : phase === 'typing' ? '/mivo/listening.webp' : '/mivo/success.webp';

  return (
    <div className="relative mx-auto flex w-full max-w-[34rem] items-center justify-center py-10 lg:py-0">
      {/* soft glow behind the phone */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.35),rgba(14,165,233,0.12)_55%,transparent_70%)] blur-2xl"
      />

      <ParallaxLayer speed={0.1} className="relative">
        <PhoneFrame>
          {/* Scene header */}
          <div className="relative h-[8.2rem] w-full overflow-hidden">
            {TAKES.map((tk, i) => (
              <Image
                key={tk.image}
                src={tk.image}
                alt=""
                fill
                sizes="300px"
                priority={i === 0}
                style={{ objectPosition: tk.objectPosition, transition: 'opacity .9s ease' }}
                className={`object-cover ${i === takeIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-white">
              <span className="truncate text-[0.72rem] font-bold">{t(take.scene)}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[0.58rem] font-semibold backdrop-blur">{take.level}</span>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-2 px-3 pb-4 pt-3">
            <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-paper px-3 py-2.5">
              <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-wider text-muted">
                <span className="font-bold text-heading">{take.character}</span>
                <span>{t(take.role)}</span>
                {speaking ? (
                  <span aria-hidden className="ml-auto flex h-2.5 items-end gap-0.5">
                    {[0, 1, 2, 3].map((b) => (
                      <span
                        key={b}
                        className="h-2.5 w-0.5 origin-bottom rounded-full bg-spot"
                        style={{ animation: `wave-bar 0.9s ease-in-out ${b * 0.12}s infinite` }}
                      />
                    ))}
                  </span>
                ) : null}
              </div>
              <p className="text-[0.78rem] font-medium leading-snug text-heading">{take.line}</p>
            </div>

            <div
              className={`ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-linear-to-br from-stage to-purple-pop px-3 py-2.5 text-white transition-opacity duration-300 ${
                phase === 'line' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className={`text-[0.78rem] font-medium leading-snug ${phase === 'typing' ? 'caret' : ''}`}>{rendered}</p>
            </div>

            <div
              className={`flex items-start gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 shadow-layered transition-all duration-500 ${
                phase === 'note' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <Image src="/mivo/idle.webp" alt="" width={28} height={34} className="mt-0.5 h-8 w-auto shrink-0" />
              <p className="text-[0.7rem] leading-snug text-body">
                <span className="mr-1 font-bold text-stage">{t('Mivo')}</span>
                {t(take.note)}
              </p>
            </div>
          </div>

          {/* mic dock */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-white via-white/95 to-transparent pb-3 pt-6">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-stage to-purple-pop text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.7)]">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-stage/30" />
              <svg viewBox="0 0 24 24" className="relative h-4.5 w-4.5" fill="currentColor" aria-hidden>
                <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" />
              </svg>
            </span>
          </div>
        </PhoneFrame>
      </ParallaxLayer>

      {/* Mivo steps in front of the phone */}
      <ParallaxLayer speed={0.22} className="pointer-events-none absolute -bottom-2 -left-3 z-20 w-[8.5rem] sm:-left-8 sm:w-[10.5rem] lg:-left-14 lg:w-[12.5rem]">
        <Image
          key={mivoPose}
          src={mivoPose}
          alt={t('Mivo, yapay zekâ İngilizce koçun')}
          width={750}
          height={900}
          sizes="(max-width: 1024px) 170px, 200px"
          priority
          className="h-auto w-full drop-shadow-[0_24px_30px_rgba(21,18,58,0.35)]"
        />
      </ParallaxLayer>

      {/* floating glass chips */}
      <div
        aria-hidden
        className="absolute right-0 top-10 z-20 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-2 text-[0.78rem] font-bold text-heading shadow-layered backdrop-blur-xl sm:flex"
        style={{ animation: 'float 6.5s ease-in-out infinite' }}
      >
        <span className="text-emerald">✓</span>
        {t('Anında düzeltme')}
      </div>
      <div
        aria-hidden
        className="absolute -right-2 bottom-24 z-20 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-2 text-[0.78rem] font-bold text-heading shadow-layered backdrop-blur-xl sm:flex"
        style={{ animation: 'float 7.5s ease-in-out -2s infinite' }}
      >
        <span>💬</span>
        {t('Kendi dilinde açıklama')}
      </div>
    </div>
  );
}
