import Image from "next/image";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { getT } from "@/i18n/server";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/i18n/schema";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";
import { tr } from "@/i18n/shared";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/about",
    locale,
    title: t("Spekvia Hakkında: Konuşarak İngilizce Öğren"),
    description: t("Spekvia, İngilizceyi gerçek hayat sahnelerinde sesli prova etmeni sağlar. Nasıl çalıştığımızı ve hatadan korkmadan konuşmanı sağlayan ilkelerimizi keşfet."),
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

const TILE_BG = ['bg-[#e6e0ff]', 'bg-[#d6f4e4]', 'bg-[#ffe6cf]', 'bg-[#ffdfe9]'];

export default async function AboutPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd data={[
        webPageSchema(locale, "AboutPage", "/about", t("Spekvia Hakkında: Konuşarak İngilizce Öğren"), t("Spekvia, İngilizceyi gerçek hayat sahnelerinde sesli prova etmeni sağlar. Nasıl çalıştığımızı ve hatadan korkmadan konuşmanı sağlayan ilkelerimizi keşfet.")),
        breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("Hakkımızda"), path: "/about" }]),
      ]} />
      <Navbar />
      <main className="flex-1 bg-white pb-20 sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana sayfa"), href: "/" }, { label: t("Hakkımızda") }]}
          eyebrow={t("Hakkımızda")}
          title={t("Anlıyorsun ama konuşamıyorsan, eksik olan bilgi değil prova.")}
          intro={t("Yıllarca İngilizce çalışıp gerçek bir konuşmada donup kalmak çok yaygın. Çoğu zaman sebep gramer eksiği değil, hiç sesli prova yapmamış olmak. Spekvia bu provayı güvenli bir yerde yapmanı sağlar: kimse seni yargılamaz, hata yapman sorun olmaz.")}
          art="point"
          tint="lilac"
        />

        <div className="mx-auto mt-4 max-w-[88rem] space-y-4 px-4 sm:mt-5 sm:space-y-5 sm:px-6">
          {/* how it works: artwork + text */}
          <div className="grid overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#d8ecff] via-[#eaf5ff] to-[#e9e4ff] sm:rounded-[3rem] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <Image src="/hero/hero-stage.webp" alt={t("Mivo sahnede konuşuyor")} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-[68%_40%]" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#eaf5ff]/70 max-lg:hidden" />
            </div>
            <div className="p-7 sm:p-12 lg:p-14">
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-heading sm:text-4xl">{t("Nasıl çalışıyoruz?")}</h2>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-heading/75">{t("Bir sahne seçersin: otelde check-in, iş mülakatı, doktor muayenesi. Mivo karşındaki karakteri oynar, sen sesli konuşursun. Takıldığın cümle anında düzeltilir ve Hata Defterim’e eklenir. Aynı sahneyi tekrar oynadığında karşına başka bir durum çıkar. Günün geri kalanında kelime, okuma ve podcast görevleri seviyene göre seni bekler.")}</p>
            </div>
          </div>

          {/* principles */}
          <div className="rounded-[2.25rem] bg-paper p-5 sm:rounded-[3rem] sm:p-10">
            <h2 className="px-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-heading sm:text-4xl">{t("İlkelerimiz")}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className={`rounded-[1.75rem] ${TILE_BG[i % TILE_BG.length]} p-6 sm:rounded-[2.25rem] sm:p-8`}>
                  <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-mono text-sm font-bold text-stage shadow-layered">{i + 1}</span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.02em] text-heading">{t(p.title)}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-heading/70">{t(p.text)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* call to action */}
          <div className="relative overflow-hidden rounded-[2.25rem] bg-linear-to-br from-[#ffefc2] via-[#fff7e0] to-[#ffe6cf] sm:rounded-[3rem]">
            <div className="relative grid items-end lg:grid-cols-[1.3fr_0.7fr]">
              <div className="p-7 sm:p-12 lg:p-16">
                <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-heading sm:text-5xl">{t("İlk sahneni oyna")}</h3>
                <p className="mt-3 max-w-md text-lg text-heading/70">{t("Ücretsiz başla; günde bir sesli sahne seni bekliyor.")}</p>
                <div className="mt-7">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center rounded-full bg-linear-to-r from-stage to-purple-pop px-8 py-4 text-base font-bold text-white shadow-[0_22px_44px_-16px_rgba(79,70,229,0.75)] transition-transform hover:-translate-y-0.5"
                  >{t("Ücretsiz dene")}</Link>
                </div>
              </div>
              <div aria-hidden className="relative mx-auto h-[13rem] w-[10.4rem] sm:h-[18rem] sm:w-[14.4rem] lg:mr-10 lg:h-[21rem] lg:w-[16.8rem]">
                <Image src="/mivo/stops/mivo_stop_cheer.webp" alt="" fill sizes="270px" className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
