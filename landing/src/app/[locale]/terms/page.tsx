import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/i18n/schema";
import { getLocale, getT } from "@/i18n/server";
import { LOCALE_META } from "@/i18n/config";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";
import { tr } from "@/i18n/shared";
import { rich } from "@/i18n/rich";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/terms",
    locale,
    title: t("Kullanım Şartları — Spekvia"),
    description: t("Spekvia mobil ve web uygulamalarının kullanım şartları: hesap, abonelik, iptal koşulları ve kullanıcı sorumlulukları."),
  });
}

export default async function TermsPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd data={[
        webPageSchema(locale, "WebPage", "/terms", t("Kullanım Şartları — Spekvia"), t("Spekvia mobil ve web uygulamalarının kullanım şartları: hesap, abonelik, iptal koşulları ve kullanıcı sorumlulukları.")),
        breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("Kullanım Şartları"), path: "/terms" }]),
      ]} />
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">{t("Ana Sayfa")}</Link>
            <span>/</span>
            <span className="text-heading font-semibold">{t("Kullanım Şartları")}</span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">{t("Hukuki Koşullar")}</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">{t("Spekvia Kullanım Şartları & Sözleşmesi")}</h1>
          <p className="mt-2 text-xs text-muted">{t("Son Güncelleme: {{p0}}", { p0: new Date().toLocaleDateString(LOCALE_META[getLocale()].ogLocale.replace("_", "-"), { year: "numeric", month: "long", day: "numeric" }) })}</p>

          <div className="mt-10 space-y-8 text-body text-[0.95rem] leading-[1.75]">
            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("1. Şartların Kabulü")}</h2>
              <p className="mt-2">{t("Spekvia uygulamasını indirerek, hesap oluşturarak veya web sitemizi ziyaret ederek bu Kullanım Şartları'nı kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen uygulamayı kullanmayınız.")}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("2. Hizmet Kapsamı & Abonelik Modeli")}</h2>
              <p className="mt-2">{t("Spekvia, freemium iş modeliyle çalışır:")}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong>{t("Ücretsiz Katman (Free Stage):")}</strong>{" "}{t("Günde 1 adet sesli senaryo (maksimum 5 dakika) ve sınırsız kelime kartı/okuma hakkı sunar.")}</li>
                <li><strong>{t("Spekvia Pro Aboneliği:")}</strong>{" "}{t("Aylık veya yıllık faturalandırma ile sınırsız sesli senaryo pratiği ve gelişmiş fonetik analizlere erişim sağlar.")}</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-indigo/15 bg-porcelain p-6">
              <h2 className="font-display text-xl font-bold text-indigo">{t("3. Abonelik İptali ve İadeler")}</h2>
              <p className="mt-2 text-heading">{t("Abonelikleriniz, Apple App Store veya Google Play Store üzerinden otomatik olarak yenilenir.")}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-body">
                <li>{t("Yenileme tarihinden en az 24 saat önce mağaza hesap ayarlarınızdan iptal edebilirsiniz.")}</li>
                <li>{t("İptal durumunda mevcut döneminizin sonuna kadar Pro ayrıcalıklarından yararlanmaya devam edersiniz.")}</li>
                <li>{t("Geri ödeme talepleri ilgili mağazanın (Apple / Google) standart iade politikalarına tabidir.")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("4. Uygun Kullanım Kuralları")}</h2>
              <p className="mt-2">{t("Kullanıcılar; yapay zekâ sesli simülasyon sistemini suistimal edecek saldırgan, yasa dışı veya nefret söylemi içeren ifadeler kullanmamayı taahhüt eder. Sistem güvenliğini tehdit eden bot veya tersine mühendislik girişimleri hesabın derhal feshedilmesine yol açar.")}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("5. Fikri Mülkiyet")}</h2>
              <p className="mt-2">{t("Spekvia adı, logosu, 3D görsel varlıkları, senaryo veritabanı ve ses motoru mimarisi Spekvia Inc.'in tescilli fikri mülkiyetidir ve izinsiz çoğaltılamaz.")}</p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className="font-display text-lg font-bold text-heading">{t("Sorularınız İçin")}</h2>
              <p className="mt-1">{rich(t("Kullanım koşullarıyla ilgili detaylı bilgi için: <b>destek@spekvia.com</b>"), { b: (c) => <strong>{c}</strong> })}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
