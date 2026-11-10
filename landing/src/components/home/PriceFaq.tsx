import { Check, Plus } from "lucide-react";
import Link from "@/i18n/Link";
import Pop from "./Pop";
import { getLocale, getT } from "@/i18n/server";
import { tr } from "@/i18n/shared";
import { anchorId } from "@/i18n/paths";
import { HOME_FAQS } from "@/data/homeFaq";

/** Same split as the store listing (docs/magaza_metinleri.md) and the app's paywall. No prices: the stores show them. */
const FREE = [
  tr("Hikâye yolunun tamamı, A1’den C2’ye"),
  tr("Kelimeler, Kelime Odaları, telaffuz ve Hata Defteri"),
  tr("Her seviyenin ilk ünitesinde Mivo ile prova"),
  tr("Günde bir sesli sahne"),
  tr("Mivo ile bir deneme sohbeti"),
];
const PRO = [tr("Tüm ünitelerde Mivo ile prova"), tr("Mivo ile sınırsız sohbet"), tr("Tüm sesli sahneler"), tr("30 dakikaya kadar sesli oturumlar")];

/** What is free and what Pro adds, then the questions people ask first. */
export default function PriceFaq() {
  const t = getT();
  const locale = getLocale();
  const list = (items: string[], dot: string) => (
    <ul className="mt-5 space-y-3">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-3 text-[1.02rem] font-semibold leading-snug sm:text-[1.08rem]">
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-ink ${dot}`}>
            <Check aria-hidden className="h-3.5 w-3.5 text-ink" strokeWidth={4} />
          </span>
          {t(x)}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="bg-cream px-5 pb-24 text-ink sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[70rem]">
        <div id={anchorId("pricing", locale)} className="scroll-mt-28">
          <header className="mx-auto max-w-[46rem] text-center">
            <p className="hand inline-block -rotate-2 text-[1.7rem] text-violet sm:text-[2.2rem]">{t("cüzdan cebinde kalsın")}</p>
            <h2 className="poster mt-1 text-[clamp(2.2rem,5.6vw,4.75rem)]">{t("Ücretsiz başla. Sınırı kaldırmak istersen Pro.")}</h2>
          </header>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            <Pop rotate={-1} className="stk rounded-[2rem] bg-white p-7 sm:p-9">
              <h3 className="poster text-[2.2rem] sm:text-[2.6rem]">{t("Ücretsiz")}</h3>
              {list(FREE, "bg-mint")}
            </Pop>
            <Pop rotate={1} delay={0.1} className="stk rounded-[2rem] bg-sun p-7 sm:p-9">
              <h3 lang="en" className="poster text-[2.2rem] sm:text-[2.6rem]">Spekvia Pro</h3>
              {list(PRO, "bg-white")}
            </Pop>
          </div>
          <p className="mx-auto mt-9 max-w-[40rem] text-center text-[0.98rem] font-medium leading-relaxed text-ink/70">
            {t("Pro fiyatı uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir. Aboneliği mağaza hesabından istediğin zaman iptal edebilirsin.")}
          </p>
        </div>

        <div id={anchorId("faq", locale)} className="mx-auto mt-24 max-w-[52rem] scroll-mt-28 sm:mt-32">
          <h2 className="poster text-center text-[clamp(2.2rem,5.6vw,4.75rem)]">{t("Başlamadan önce akla gelenler")}</h2>
          <div className="mt-10 space-y-4">
            {HOME_FAQS.map((item, i) => (
              <details key={item.q} className="faq-row stk-sm group rounded-[1.5rem] bg-white open:bg-lilac/40" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[1.12rem] font-extrabold sm:text-[1.2rem] [&::-webkit-details-marker]:hidden">
                  {t(item.q)}
                  <span className="faq-row__plus grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun transition-[rotate,background-color] duration-300">
                    <Plus aria-hidden className="h-5 w-5" strokeWidth={3} />
                  </span>
                </summary>
                <p className="max-w-[60ch] px-6 pb-6 text-[1.02rem] font-medium leading-relaxed text-ink/80">{t(item.a)}</p>
              </details>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link href="/faq" className="btn-pop bg-white px-6 py-3 text-[1rem] text-ink">
              {t("Tüm soruları gör →")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
