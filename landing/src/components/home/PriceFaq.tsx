import { Plus } from "lucide-react";
import Link from "@/i18n/Link";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { HOME_FAQS } from "@/data/homeFaq";

/** Price in one honest line (no numbers until the packages are final), then the questions people ask first. */
export default function PriceFaq() {
  const t = getT();
  const locale = getLocale();
  return (
    <section className="bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div id={anchorId("pricing", locale)} className="scroll-mt-24 grid gap-4 border-b border-page-edge pb-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <h2 className="text-balance font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-cloth-deep sm:text-[2.6rem]">
            {t("Ücretsiz başla. Sınırı kaldırmak istersen Pro.")}
          </h2>
          <p className="max-w-[36rem] self-end text-[1.05rem] leading-relaxed text-body">
            {t("Pro fiyatı uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir. Aboneliği mağaza hesabından istediğin zaman iptal edebilirsin.")}
          </p>
        </div>

        <div id={anchorId("faq", locale)} className="scroll-mt-24 grid gap-10 pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="text-balance font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-cloth-deep sm:text-[2.6rem]">
              {t("Başlamadan önce akla gelenler")}
            </h2>
            <Link href="/faq" className="press mt-5 inline-flex items-center gap-2 rounded-full px-1 text-[1rem] font-semibold text-stage underline decoration-stage/30 underline-offset-4 hover:decoration-stage">
              {t("Tüm soruları gör →")}
            </Link>
          </div>

          <div className="divide-y divide-page-edge border-y border-page-edge">
            {HOME_FAQS.map((item, i) => (
              <details key={item.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-[1.1rem] font-bold text-cloth-deep [&::-webkit-details-marker]:hidden">
                  {t(item.q)}
                  <Plus aria-hidden className="h-5 w-5 shrink-0 text-stage transition-transform duration-200 ease-out group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-6 text-[1rem] leading-relaxed text-body">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
