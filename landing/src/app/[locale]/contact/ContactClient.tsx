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
    a: tr("Hayır. Günde 1 sesli sahne, kelime kartları ve okuma hikâyeleri ücretsizdir; kart bilgisi girmeden başlayabilirsin."),
  },
  {
    q: tr("Hangi cihazlarda kullanabilirim?"),
    a: tr("iOS ve Android için mobil uygulama ile web stüdyosu var."),
  },
  {
    q: tr("Aboneliğimi istediğim zaman iptal edebilir miyim?"),
    a: tr("Evet. App Store veya Google Play hesabının abonelik ayarlarından istediğin zaman iptal edebilirsin."),
  },
];

const FIELD =
  "mt-2 w-full rounded-2xl border border-transparent bg-white px-4 py-3.5 text-sm text-heading shadow-layered placeholder:text-muted focus:border-stage focus:outline-none focus:ring-3 focus:ring-stage/15";
const FAQ_BG = ["bg-[#e6e0ff]", "bg-[#ffe6cf]", "bg-[#d8ecff]", "bg-[#ffdfe9]"];

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
      <main className="flex-1 bg-white pb-20 sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana Sayfa"), href: "/" }, { label: t("İletişim & Destek") }]}
          eyebrow={t("Bize ulaş")}
          title={t("Bir şey mi sormak istiyorsun?")}
          intro={t("Sahne önerisi, kurumsal paket ya da teknik destek için bize yazabilirsin.")}
          art="mic"
          tint="peach"
        />

        <div className="mx-auto mt-4 grid max-w-[88rem] gap-4 px-4 sm:mt-5 sm:gap-5 sm:px-6 lg:grid-cols-12">
          {/* contact details */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-5 lg:grid-cols-1 lg:content-start">
            <div className="rounded-[2rem] bg-[#e6e0ff] p-7 sm:rounded-[2.5rem] sm:p-9">
              <span className="block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-stage">{t("Destek & Genel İletişim")}</span>
              <a href="mailto:support@spekvia.com" className="mt-3 block break-all font-display text-2xl font-extrabold tracking-[-0.02em] text-heading hover:text-stage sm:text-3xl">support@spekvia.com</a>
              <span className="mt-2 block text-[0.92rem] text-heading/70">{t("Kullanıcı desteği ve sahne geri bildirimleri")}</span>
            </div>
            <div className="rounded-[2rem] bg-[#d6f4e4] p-7 sm:rounded-[2.5rem] sm:p-9">
              <span className="block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-heading/60">{t("Kurumsal & B2B Satış")}</span>
              <a href="mailto:info@spekvia.com" className="mt-3 block break-all font-display text-2xl font-extrabold tracking-[-0.02em] text-heading hover:text-stage sm:text-3xl">info@spekvia.com</a>
              <span className="mt-2 block text-[0.92rem] text-heading/70">{t("Yazılım ekipleri ve şirket toplu lisansları için")}</span>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-[2rem] bg-paper p-6 sm:rounded-[2.5rem] sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-2xl font-bold text-emerald">✓</span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-heading">{t("E-posta uygulaman açıldı")}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-body">{rich(t("Mesajı e-posta uygulamandan göndermeyi unutma. Açılmadıysa doğrudan <b>support@spekvia.com</b> adresine yazabilirsin."), { b: (c) => <strong>{c}</strong> })}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-heading shadow-layered hover:bg-paper-deep"
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
                    className="w-full rounded-full bg-linear-to-r from-stage to-purple-pop py-4 text-base font-bold text-white shadow-[0_18px_36px_-16px_rgba(79,70,229,0.75)] transition-transform hover:-translate-y-0.5"
                  >{t("Mesajı Gönder")}</button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* quick answers */}
        <div className="mx-auto mt-4 max-w-[88rem] px-4 sm:mt-5 sm:px-6">
          <div className="rounded-[2.25rem] bg-paper p-5 sm:rounded-[3rem] sm:p-10">
            <p className="px-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Hızlı yanıtlar")}</p>
            <h2 className="mt-2 px-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-heading sm:text-4xl">{t("Sıkça Sorulan Sorular")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {faqs.map((faq, i) => (
                <div key={faq.q} className={`rounded-[1.75rem] ${FAQ_BG[i % FAQ_BG.length]} p-6 sm:rounded-[2rem] sm:p-7`}>
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
