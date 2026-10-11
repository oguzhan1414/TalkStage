import Image from "next/image";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";
import { tr } from "@/i18n/shared";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/about",
    locale,
    title: t("Hakkımızda — Spekvia"),
    description: t("Anlıyorum ama konuşamıyorum diyenler için: Spekvia, İngilizceyi gerçek hayat sahnelerinde sesli prova etmeyi ve hatadan korkmadan konuşmayı öğretir."),
  });
}

const PRINCIPLES = [
  {
    title: tr("Önce konuşma"),
    text: tr("Bilmek ile söylemek farklı kaslar. Uygulamanın merkezinde test değil, ağzından çıkan cümle var."),
  },
  {
    title: tr("Düzeltme, tam o anda"),
    text: tr("Hata, konuşmayı bölmeden ve utandırmadan gösterilir; nedeni kendi dilinde, tek cümleyle anlatılır."),
  },
  {
    title: tr("Her seferinde farklı"),
    text: tr("Gerçek hayatta aynı sahne iki kez aynı geçmez. Sahneler her oynayışta farklı bir sürprizle gelir, ezber işe yaramaz."),
  },
  {
    title: tr("Seni hatırlayan bir koç"),
    text: tr("Mivo neler konuştuğunuzu ve nerede takıldığını aklında tutar; sen de bu notları görebilir, düzeltebilir ya da silebilirsin."),
  },
];

export default async function AboutPage({ params }: PageProps) {
  await pageLocale(params);
  const t = getT();
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-paper pb-24 pt-36 sm:pb-32 sm:pt-44">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-stage">{t("Ana sayfa")}</Link>
            <span>/</span>
            <span className="font-semibold text-heading">{t("Hakkımızda")}</span>
          </div>

          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Hakkımızda")}</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Anlıyorsun ama konuşamıyorsan, eksik olan bilgi değil prova.")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">{t("Yıllarca İngilizce öğrenip gerçek bir konuşmada donup kalmak çok yaygın. Sebep çoğu zaman gramer eksiği değil, hiç prova yapmamış olmak. Spekvia bu provayı güvenli bir sahneye taşır: kimse yargılamaz, hata yapmak serbest, her cümle bir sonrakinin ön hazırlığı.")}</p>

          <div className="mt-14 grid items-center gap-8 rounded-[28px] border border-line bg-white p-6 sm:grid-cols-[auto_1fr] sm:p-9">
            <Image src="/mivo/idle.webp" alt="Mivo" width={750} height={900} className="mx-auto h-48 w-auto sm:h-60" />
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">{t("Nasıl çalışıyoruz?")}</h2>
              <p className="mt-3 leading-relaxed text-body">{t("Bir sahne seçersin: otelde check-in, iş mülakatı, doktor muayenesi. Mivo karşındaki karakteri oynar, sen sesli konuşursun. Takıldığın cümle anında düzeltilir ve Hata Defterim’e eklenir. Aynı sahneyi tekrar oynadığında karşına başka bir durum çıkar. Günün geri kalanında kelime, okuma ve podcast çalışmaları seni aynı seviyede tutar.")}</p>
            </div>
          </div>

          <h2 className="mt-16 font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">{t("İlkelerimiz")}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="rounded-[24px] border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-heading">{t(p.title)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{t(p.text)}</p>
              </li>
            ))}
          </ul>

          <div className="relative mt-16 overflow-hidden rounded-[28px] bg-ink p-8 text-center text-white sm:p-12">
            <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-3" />
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t("İlk sahneni oyna")}</h3>
            <p className="mx-auto mt-3 max-w-md text-white/75">{t("Ücretsiz başla; günde bir sesli sahne seni bekliyor.")}</p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/onboarding"
                className="inline-flex items-center rounded-full bg-slate-yellow px-8 py-3.5 text-base font-bold text-ink transition-transform hover:-translate-y-0.5"
              >{t("Ücretsiz dene")}</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
