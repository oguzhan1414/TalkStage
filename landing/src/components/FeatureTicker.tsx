import { getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const FEATURES = [
  tr("Canlı sohbet et"),
  tr("Hatalarını gör"),
  tr("Anında düzeltme"),
  tr("Telaffuzunu dinle"),
  tr("Kendi dilinde açıklama"),
  tr("Hata defterim"),
  tr("Günlük yol"),
];

const PROMISES = [
  tr("Mikrofona konuş"),
  tr("Mivo hep yanında"),
  tr("Hata yapmak serbest"),
  tr("Kart gerekmez"),
  tr("5 dilde açıklama"),
];

function Star() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mx-7 h-6 w-6 shrink-0 fill-current sm:h-8 sm:w-8">
      <path d="M12 0c.7 6.4 5.6 11.3 12 12-6.4.7-11.3 5.6-12 12-.7-6.4-5.6-11.3-12-12C6.4 11.3 11.3 6.4 12 0Z" />
    </svg>
  );
}

/** Two crossing bands of what the app does and promises: full-width rhythm between the hero and the story. */
export default function FeatureTicker() {
  const t = getT();
  const features = FEATURES.map((s) => t(s));
  const promises = PROMISES.map((s) => t(s));

  const row = (items: string[], outline: boolean, copy: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy || undefined}>
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="flex shrink-0 items-center">
          <span
            className={`whitespace-nowrap font-display text-3xl font-extrabold uppercase tracking-tight sm:text-5xl ${
              outline && i % 2 === 1 ? 'text-transparent [-webkit-text-stroke:1.5px_currentColor]' : ''
            }`}
          >
            {label}
          </span>
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-hidden className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div className="-mx-8 -rotate-[1.4deg] bg-slate-yellow py-4 text-heading shadow-[0_20px_40px_-24px_rgba(255,194,31,0.9)] sm:py-5">
        <div className="flex w-max motion-reduce:animate-none" style={{ animation: 'ticker 48s linear infinite' }}>
          {row(features, true, false)}
          {row(features, true, true)}
        </div>
      </div>
      <div className="-mx-8 mt-2 rotate-[1.4deg] bg-stage py-4 text-white sm:py-5">
        <div className="flex w-max motion-reduce:animate-none" style={{ animation: 'ticker 40s linear infinite reverse' }}>
          {row([...promises, ...promises], false, false)}
          {row([...promises, ...promises], false, true)}
        </div>
      </div>
    </section>
  );
}
