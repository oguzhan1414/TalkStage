import Image from 'next/image';
import Reveal from './Reveal';

const LANGS = ['Türkçe', 'English', 'Español', 'Português', 'Deutsch'];

/** Example memory notes floating around Mivo. Anchors are in the same 100×120 space as the SVG lines. */
const NOTES = [
  { kind: 'Ad', text: 'Ece', x: 76, y: 9, delay: '0s' },
  { kind: 'Konu', text: 'İş mülakatı', x: 17, y: 24, delay: '-1.4s' },
  { kind: 'Hedef', text: 'Vize görüşmesi', x: 84, y: 50, delay: '-2.6s' },
  { kind: 'Konu', text: 'Havalimanı sohbeti', x: 19, y: 72, delay: '-3.8s' },
];

export default function MivoSection() {
  return (
    <section
      id="mivo"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink px-5 py-24 text-white sm:px-8 lg:py-20"
    >
      {/* Night sky: nebula + constellations sit behind Mivo, the open dark sky carries the copy */}
      <Image
        src="/bg/mivo-night.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[18%_100%] max-lg:opacity-80"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(21,18,58,0)_30%,rgba(21,18,58,0.55)_100%)] max-lg:bg-ink/40" />
      <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-2" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* Mivo + the notes it keeps */}
        <Reveal className="relative mx-auto aspect-[5/6] w-full max-w-[26rem] lg:max-w-[28rem]">
          <div
            aria-hidden
            className="absolute left-1/2 top-[64%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.55),transparent_68%)]"
          />
          <div aria-hidden className="absolute left-1/2 top-[64%] aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div aria-hidden className="absolute left-1/2 top-[64%] aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

          <svg aria-hidden viewBox="0 0 100 120" className="absolute inset-0 h-full w-full">
            {NOTES.map((n) => (
              <g key={n.text}>
                <line x1="50" y1="80" x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.35)" strokeWidth="0.35" strokeDasharray="1.2 1.6" />
                <circle cx={n.x} cy={n.y} r="1" fill="#FFC21F" />
              </g>
            ))}
          </svg>

          <Image
            src="/mivo/chat-invite.webp"
            alt="Mivo el sallıyor"
            width={900}
            height={900}
            sizes="(max-width: 1024px) 70vw, 340px"
            className="absolute bottom-0 left-1/2 h-auto w-[66%] -translate-x-1/2 drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
          />

          {NOTES.map((n) => (
            <div
              key={n.text}
              className="animate-float absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 py-1.5 pl-2.5 pr-3.5 text-[0.8rem] font-semibold shadow-layered backdrop-blur-md"
              style={{ left: `${n.x}%`, top: `${(n.y / 120) * 100}%`, animationDelay: n.delay }}
            >
              <span className="mr-1.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-slate-yellow">{n.kind}</span>
              {n.text}
            </div>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-yellow">Mivo ile serbest sohbet</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]">
            Mivo seni hatırlar.
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Konu seçmek zorunda değilsin; ne istersen konuş. Mivo neler konuştuğunuzu aklında tutar, sonraki sohbete kaldığınız
            yerden başlar.
          </p>

          {/* The returning-user greeting, as it appears in the app */}
          <div className="mt-6 max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-white/50">Mivo</p>
            <p className="mt-1 text-[0.98rem] leading-relaxed text-white">
              Tekrar hoş geldin, Ece! Geçen sefer iş mülakatından konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir
              konu seç.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-yellow px-4 py-2 text-[0.82rem] font-bold text-ink">Oradan devam et</span>
              <span className="rounded-full border border-white/25 px-4 py-2 text-[0.82rem] font-semibold text-white/90">Yeni bir konu seç</span>
            </div>
          </div>

          <ul className="mt-6 grid max-w-xl gap-x-8 gap-y-4 text-[0.9rem] leading-relaxed text-white/70 sm:grid-cols-2">
            <li>
              <p className="font-semibold text-white">Açıklamalar kendi dilinde</p>
              <p className="mt-0.5">Hedef dil hep İngilizce, açıklamalar ana dilinde.</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {LANGS.map((l) => (
                  <span key={l} className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[0.66rem] text-white/80">
                    {l}
                  </span>
                ))}
              </p>
            </li>
            <li>
              <p className="font-semibold text-white">Hafıza senin kontrolünde</p>
              <p className="mt-0.5">
                Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.
              </p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
