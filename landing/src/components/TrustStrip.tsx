import { CalendarX2, CreditCard, Globe2, ShieldCheck } from 'lucide-react';

import Reveal from './Reveal';
import { getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const ITEMS = [
  { Icon: CreditCard, title: tr("Kart gerekmez"), text: tr("Ücretsiz başla: günde 1 sesli sahne, kelimeler ve okuma hikâyeleri.") },
  { Icon: Globe2, title: tr("5 dilde açıklama"), text: tr("Hedef dil hep İngilizce, açıklamalar ana dilinde.") },
  { Icon: ShieldCheck, title: tr("Hafıza senin kontrolünde"), text: tr("Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.") },
  { Icon: CalendarX2, title: tr("İstediğin zaman iptal"), text: tr("Abonelik App Store veya Google Play hesabından yönetilir.") },
];

export default function TrustStrip() {
  const t = getT();
  return (
    <section className="bg-paper px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="mx-auto grid max-w-6xl gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-stage shadow-layered">
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-heading">{t(title)}</h3>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-body">{t(text)}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
