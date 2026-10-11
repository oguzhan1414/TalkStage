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
    path: "/privacy",
    locale,
    title: t("Gizlilik Politikası ve KVKK — Spekvia"),
    description: t("Spekvia kullanıcı verilerini, ses kayıtlarını ve kişisel bilgileri nasıl işler ve korur? Gizlilik Politikası ile KVKK/GDPR aydınlatma metni."),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd data={[
        webPageSchema(locale, "WebPage", "/privacy", t("Gizlilik Politikası ve KVKK — Spekvia"), t("Spekvia kullanıcı verilerini, ses kayıtlarını ve kişisel bilgileri nasıl işler ve korur? Gizlilik Politikası ile KVKK/GDPR aydınlatma metni.")),
        breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("Gizlilik Politikası"), path: "/privacy" }]),
      ]} />
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">{t("Ana Sayfa")}</Link>
            <span>/</span>
            <span className="text-heading font-semibold">{t("Gizlilik Politikası")}</span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">{t("Yasal Bilgilendirme")}</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">{t("Gizlilik Politikası & KVKK / GDPR Aydınlatma Metni")}</h1>
          <p className="mt-2 text-xs text-muted">{t("Son Güncelleme: {{p0}}", { p0: new Date().toLocaleDateString(LOCALE_META[getLocale()].ogLocale.replace("_", "-"), { year: "numeric", month: "long", day: "numeric" }) })}</p>

          <div className="mt-10 space-y-8 text-body text-[0.95rem] leading-[1.75]">
            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("1. Genel Bakış")}</h2>
              <p className="mt-2">{t("Spekvia (\"Uygulama\", \"Biz\"), kullanıcılarının kişisel verilerinin ve gizliliğinin korunmasına azami özen göstermektedir. Bu Gizlilik Politikası, mobil uygulamamızı ve web sitemizi kullandığınızda toplanan, işlenen ve saklanan veriler hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.")}</p>
            </section>

            <section className="rounded-2xl border border-indigo/15 bg-porcelain p-6">
              <h2 className="font-display text-xl font-bold text-indigo">{t("2. Ses Verileri ve Mikrofon İzinleri")}</h2>
              <p className="mt-2">{t("Spekvia, senaryo bazlı konuşma pratiği sunan bir yapay zekâ asistanıdır.")}</p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-heading">
                <li>
                  <strong>{t("Mikrofon İzni:")}</strong>{" "}{t("Mikrofonunuza yalnızca canlı konuşma odasında aktif olarak pratik yaptığınız esnada erişilir. Arka planda asla dinleme yapılmaz.")}</li>
                <li>
                  <strong>{t("Ses İşleme (STT):")}</strong>{" "}{t("Ses akışınız, anlık olarak metne dönüştürülmek üzere güvenli ve şifreli (TLS 1.3) bağlantı üzerinden işlenir.")}</li>
                <li>
                  <strong>{t("Kalıcı Saklama Yoktur:")}</strong>{" "}{t("Ham ses kayıtlarınız reklam hedeflemesi veya üçüncü şahıslara satılmak amacıyla asla kalıcı olarak saklanmaz.")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("3. Toplanan Bilgiler")}</h2>
              <p className="mt-2">{t("Uygulama deneyiminizi iyileştirmek için aşağıdaki asgari veriler toplanır:")}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>{t("Hesap Bilgileri (E-posta adresi, ad/soyad veya Apple/Google giriş kimliği)")}</li>
                <li>{t("Öğrenme İlerlemesi (Tamamlanan senaryolar, kelime kartları, streak gün sayısı)")}</li>
                <li>{t("Abonelik Durumu (RevenueCat üzerinden şifrelenmiş fatura durumu)")}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("4. Ödeme ve Fatura Güvenliği")}</h2>
              <p className="mt-2">{t("Uygulama içi satın alımlar (In-App Purchases) Apple App Store ve Google Play Store altyapısı üzerinden gerçekleştirilir. Spekvia, kredi kartı numaralarınızı veya banka hesap detaylarınızı asla görmez ve kendi sunucularında saklamaz.")}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">{t("5. Kullanıcı Hakları & Hesap Silme")}</h2>
              <p className="mt-2">{rich(t("6698 sayılı KVKK ve Avrupa Birliği GDPR düzenlemeleri uyarınca; dilediğiniz zaman hesabınızı ve tüm öğrenme geçmişinizi mobil uygulama ayarlarından silebilir veya <b>destek@spekvia.com</b> adresine e-posta göndererek verilerinizin imhasını talep edebilirsiniz."), { b: (c) => <strong>{c}</strong> })}</p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className="font-display text-lg font-bold text-heading">{t("İletişim")}</h2>
              <p className="mt-1">{rich(t("Gizlilik politikamızla ilgili her türlü soru için bizimle <b>destek@spekvia.com</b> üzerinden iletişime geçebilirsiniz."), { b: (c) => <strong>{c}</strong> })}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
