import { CalendarX2, CreditCard, Globe2, ShieldCheck } from 'lucide-react';

import Reveal from './Reveal';
import { getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const ITEMS = [
  { Icon: CreditCard, bg: 'bg-[#e6e0ff]', title: tr("Kart gerekmez"), text: tr("Ücretsiz başla: günde 1 sesli sahne, kelimeler ve okuma hikâyeleri.") },
  { Icon: Globe2, bg: 'bg-[#d8ecff]', title: tr("5 dilde açıklama"), text: tr("Hedef dil hep İngilizce, açıklamalar ana dilinde.") },
  { Icon: ShieldCheck, bg: 'bg-[#d6f4e4]', title: tr("Hafıza senin kontrolünde"), text: tr("Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.") },
  { Icon: CalendarX2, bg: 'bg-[#ffe6cf]', title: tr("İstediğin zaman iptal"), text: tr("Abonelik App Store veya Google Play hesabından yönetilir.") },
];

export default function TrustStrip() {
  const t = getT();
  return (
    <section className="bg-white px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="mx-auto grid max-w-[88rem] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {ITEMS.map(({ Icon, bg, title, text }, i) => (
          <Reveal key={title} delay={i * 70}>
            <div className={`group h-full rounded-[2rem] ${bg} p-6 transition-transform duration-300 hover:-translate-y-1 sm:rounded-[2.5rem] sm:p-8`}>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-stage shadow-layered transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Icon aria-hidden className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-heading">{t(title)}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-heading/70">{t(text)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
