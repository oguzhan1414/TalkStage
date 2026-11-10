"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { rich } from "@/i18n/rich";

const faqs = [
  {
    q: tr("Spekvia gerçekten konuşma becerimi geliştirebilir mi?"),
    a: tr("Evet. Spekvia pasif öğrenme yerine konuşmayı çalıştırır: 5–10 dakikalık sesli sahnelerde cümle kurar, anında düzeltme alırsın."),
  },
  {
    q: tr("Ücretsiz deneme için kredi kartı gerekiyor mu?"),
    a: tr("Hayır. Uygulamayı kart bilgisi girmeden ücretsiz indirip başlayabilirsin."),
  },
  {
    q: tr("Hangi cihazlarda kullanabilirim?"),
    a: tr("Spekvia bir mobil uygulama: iOS ve Android’de çalışır."),
  },
  {
    q: tr("Aboneliğimi istediğim zaman iptal edebilir miyim?"),
    a: tr("Evet. App Store veya Google Play hesabının abonelik ayarlarından istediğin zaman iptal edebilirsin."),
  },
];

const FIELD =
  "mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-ink/45 focus:bg-sun/15";
const FAQ_BG = ["bg-lilac", "bg-sun", "bg-sky", "bg-bubble"];

export default function ContactClient() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: t("Genel soru ya da destek"),
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    window.location.href = `mailto:support@spekvia.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip bg-cream pb-20 text-ink sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana Sayfa"), href: "/" }, { label: t("İletişim & Destek") }]}
          eyebrow={t("Bize ulaş")}
          title={t("Bir şey mi sormak istiyorsun?")}
          intro={t("Sahne önerisi, kurumsal paket ya da teknik destek için bize yazabilirsin.")}
          art="mic"
          tint="peach"
          variant="poster"
        />

        <div className="mx-auto grid max-w-[80rem] gap-7 px-5 pt-14 sm:px-10 sm:pt-20 lg:grid-cols-12">
          {/* contact details */}
          <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-start">
            <div className="stk rounded-[2rem] bg-violet p-6 text-cream sm:p-8">
              <span className="poster block text-2xl text-sun">{t("Destek & Genel İletişim")}</span>
              <a href="mailto:support@spekvia.com" className="mt-5 block break-all text-xl font-extrabold underline-offset-4 hover:underline sm:text-2xl">support@spekvia.com</a>
              <span className="mt-3 block text-[0.95rem] leading-relaxed text-cream/80">{t("Kullanıcı desteği ve sahne geri bildirimleri")}</span>
            </div>
            <div className="stk rounded-[2rem] bg-mint p-6 sm:p-8">
              <span className="poster block text-2xl text-ink">{t("Kurumsal & B2B Satış")}</span>
              <a href="mailto:info@spekvia.com" className="mt-3 block break-all font-display text-2xl font-extrabold tracking-[-0.02em] text-heading hover:text-stage sm:text-3xl">info@spekvia.com</a>
              <span className="mt-2 block text-[0.92rem] text-heading/70">{t("Yazılım ekipleri ve şirket toplu lisansları için")}</span>
            </div>
          </div>

          {/* form */}
          <div className="min-w-0 lg:col-span-7">
            <div className="stk h-full rounded-[2rem] bg-white p-6 sm:p-9">
              {submitted ? (
                <div className="py-12 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-2xl font-bold text-emerald">✓</span>
                  <h3 className="poster mt-6 text-3xl text-ink">{t("E-posta uygulaman açıldı")}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-body">{rich(t("Mesajı e-posta uygulamandan göndermeyi unutma. Açılmadıysa doğrudan <b>support@spekvia.com</b> adresine yazabilirsin."), { b: (c) => <strong>{c}</strong> })}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-pop mt-6 bg-sun px-6 py-3 text-sm text-ink"
                  >{t("Yeni mesaj yaz")}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-[0.8rem] font-bold text-heading">{t("Adın soyadın")}</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder={t("Örn: Ahmet Yılmaz")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={FIELD}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[0.8rem] font-bold text-heading">{t("E-posta adresin")}</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder={t("ahmet@sirketiniz.com")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-[0.8rem] font-bold text-heading">{t("Konu")}</label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={FIELD}
                    >
                      <option>{t("Genel soru ya da destek")}</option>
                      <option>{t("Yeni sahne önerisi")}</option>
                      <option>{t("Abonelik ya da ödeme")}</option>
                      <option>{t("Kurumsal talep (B2B)")}</option>
                      <option>{t("Hata bildirimi")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[0.8rem] font-bold text-heading">{t("Mesajın")}</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder={t("Mesajını ya da merak ettiğin konuyu yaz...")}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={FIELD}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-pop btn-pop-wrap w-full bg-violet px-4 py-4 text-base text-white"
                  >{t("Mesajı Gönder")}</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* quick answers */}
        <div className="mx-auto mt-16 max-w-[80rem] px-5 sm:mt-20 sm:px-10">
          <div>
            <p className="hand text-3xl text-violet">{t("Hızlı yanıtlar")}</p>
            <h2 className="poster mt-3 text-4xl text-ink sm:text-5xl">{t("Sıkça Sorulan Sorular")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7">
              {faqs.map((faq, i) => (
                <div key={faq.q} className={`stk rounded-[1.75rem] ${FAQ_BG[i % FAQ_BG.length]} p-6 sm:p-7`}>
                  <h3 className="font-display text-lg font-bold tracking-tight text-heading">{t(faq.q)}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-heading/70">{t(faq.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
