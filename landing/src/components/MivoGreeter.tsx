'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const HELLOS = ['Merhaba!', 'Hello!', 'Hola!', 'Olá!', 'Hallo!'];

/** Mivo waves from the top edge of the footer and greets in the five languages of the site, one after another. */
export default function MivoGreeter({ className = '' }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % HELLOS.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <div className="relative">
        <div
          key={HELLOS[i]}
          className="absolute -left-1 top-2 -translate-x-full whitespace-nowrap rounded-2xl rounded-br-md border border-stage/15 bg-white px-5 py-2.5 font-display text-xl font-extrabold text-stage shadow-lifted"
          style={{ animation: 'greet-pop 0.5s cubic-bezier(.2,1.4,.4,1) both' }}
        >
          {HELLOS[i]}
        </div>
        <Image
          src="/mivo/wave.webp"
          alt=""
          width={750}
          height={900}
          sizes="170px"
          className="h-auto w-32 drop-shadow-[0_18px_22px_rgba(54,45,148,0.3)] sm:w-40"
          style={{ animation: 'float 7s ease-in-out infinite' }}
        />
      </div>
    </div>
  );
}
