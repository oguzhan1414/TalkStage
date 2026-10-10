import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gizlilik Politikası — Spekiva",
  description: "Spekiva kullanıcı verilerinin, ses kayıtlarının ve kişisel bilgilerin nasıl korunduğuna dair Gizlilik Politikası ve KVKK/GDPR aydınlatma metni.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 pb-24 sm:pt-44 sm:pb-32 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Gizlilik Politikası</span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">
            Yasal Bilgilendirme
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            Gizlilik Politikası & KVKK / GDPR Aydınlatma Metni
          </h1>
          <p className="mt-2 text-xs text-muted">
            Son Güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-10 space-y-8 text-body text-[0.95rem] leading-[1.75]">
            <section>
              <h2 className="font-display text-xl font-bold text-heading">1. Genel Bakış</h2>
              <p className="mt-2">
                Spekiva (&quot;Uygulama&quot;, &quot;Biz&quot;), kullanıcılarının kişisel verilerinin ve gizliliğinin korunmasına azami özen göstermektedir. Bu Gizlilik Politikası, mobil uygulamamızı ve web sitemizi kullandığınızda toplanan, işlenen ve saklanan veriler hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
              </p>
            </section>

            <section className="rounded-2xl border border-indigo/15 bg-porcelain p-6">
              <h2 className="font-display text-xl font-bold text-indigo">
                2. Ses Verileri ve Mikrofon İzinleri
              </h2>
              <p className="mt-2">
                Spekiva, senaryo bazlı konuşma pratiği sunan bir yapay zekâ asistanıdır.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-heading">
                <li>
                  <strong>Mikrofon İzni:</strong> Mikrofonunuza yalnızca canlı konuşma odasında aktif olarak pratik yaptığınız esnada erişilir. Arka planda asla dinleme yapılmaz.
                </li>
                <li>
                  <strong>Ses İşleme (STT):</strong> Ses akışınız, anlık olarak metne dönüştürülmek üzere güvenli ve şifreli (TLS 1.3) bağlantı üzerinden işlenir.
                </li>
                <li>
                  <strong>Kalıcı Saklama Yoktur:</strong> Ham ses kayıtlarınız reklam hedeflemesi veya üçüncü şahıslara satılmak amacıyla asla kalıcı olarak saklanmaz.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">3. Toplanan Bilgiler</h2>
              <p className="mt-2">
                Uygulama deneyiminizi iyileştirmek için aşağıdaki asgari veriler toplanır:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Hesap Bilgileri (E-posta adresi, ad/soyad veya Apple/Google giriş kimliği)</li>
                <li>Öğrenme İlerlemesi (Tamamlanan senaryolar, kelime kartları, streak gün sayısı)</li>
                <li>Abonelik Durumu (RevenueCat üzerinden şifrelenmiş fatura durumu)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">4. Ödeme ve Fatura Güvenliği</h2>
              <p className="mt-2">
                Uygulama içi satın alımlar (In-App Purchases) Apple App Store ve Google Play Store altyapısı üzerinden gerçekleştirilir. Spekiva, kredi kartı numaralarınızı veya banka hesap detaylarınızı asla görmez ve kendi sunucularında saklamaz.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-heading">5. Kullanıcı Hakları & Hesap Silme</h2>
              <p className="mt-2">
                6698 sayılı KVKK ve Avrupa Birliği GDPR düzenlemeleri uyarınca; dilediğiniz zaman hesabınızı ve tüm öğrenme geçmişinizi mobil uygulama ayarlarından silebilir veya <strong>destek@spekiva.app</strong> adresine e-posta göndererek verilerinizin imhasını talep edebilirsiniz.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className="font-display text-lg font-bold text-heading">İletişim</h2>
              <p className="mt-1">
                Gizlilik politikamızla ilgili her türlü soru için bizimle <strong>destek@spekiva.app</strong> üzerinden iletişime geçebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
