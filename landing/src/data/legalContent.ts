import { tr } from "@/i18n/shared";

// GENERATED from the legal source texts (Turkish is the translation key, like the rest of the site).
// Edit the Turkish strings here AND their en/es/pt/de entries in src/i18n/catalog/*.json together.

export type LegalSection = {
  id: string;
  title: string;
  paras?: string[];
  list?: string[];
  /** Paragraphs shown after the list. */
  after?: string[];
  link?: { href: string; label: string };
};

export type LegalDoc = {
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  sections: LegalSection[];
};

/** Fixed on purpose: the "last updated" date must change only when the text changes. */
export const LEGAL_UPDATED = "2026-10-13";

export const PRIVACY_DOC: LegalDoc = {
  breadcrumb: tr("Gizlilik Politikası"),
  eyebrow: tr("Yasal Bilgilendirme"),
  h1: tr("Gizlilik Politikası ve Aydınlatma Metni"),
  metaTitle: tr("Gizlilik Politikası ve Aydınlatma Metni — Spekvia"),
  metaDesc: tr("Spekvia hangi verileri toplar, ses ve konuşmalarınız nasıl işlenir, kimlerle paylaşılır ve haklarınız nelerdir? KVKK ve GDPR kapsamında aydınlatma."),
  intro: tr("Bu politika, Spekvia mobil uygulaması ve spekvia.com web sitesi için geçerlidir. Hangi verileri neden topladığımızı, kimlerle paylaştığımızı ve haklarını açıkça anlatır. Spekvia, bu verilerin işlenmesinde veri sorumlusudur."),
  sections: [
    {
      id: "data",
      title: tr("1. Hangi verileri topluyoruz?"),
      paras: [
      tr("Hizmeti sunmak için gereken verileri toplarız:")
    ],
    after: [
      tr("Google ile giriş yaparsan Google'dan yalnızca adını, e-posta adresini ve (varsa) profil fotoğrafını alırız. Bu bilgileri sadece hesabını oluşturmak ve seni tanımak için kullanırız; satmayız, reklam için kullanmayız ve yapay zekâ modellerini eğitmek için kullanmayız. Spekvia'nın Google API'lerinden aldığı bilgileri kullanması ve başka bir uygulamaya aktarması, Sınırlı Kullanım (Limited Use) gereklilikleri dahil Google API Hizmetleri Kullanıcı Verileri Politikası'na uygundur. Google API'lerini hiçbir şekilde yapay zekâ ile oluşturulan rızasız cinsel içerikli görüntüler (NCII) için kullanmayız.")
    ],
      list: [
      tr("Hesap bilgileri: e-posta adresin, varsa adın; Apple veya Google ile girişte bu sağlayıcıların paylaştığı kimlik ve e-posta bilgisi."),
      tr("Profil ve tercihler: görünen ad, ana dilin, hedefin, günlük çalışma süren, İngilizce seviyen ve avatarın. İsteğe bağlı olarak cinsiyet ve yaş aralığı da sorulur; vermek zorunda değilsin."),
      tr("Öğrenme verileri: konuşma oturumlarının metin dökümü ve değerlendirmeleri, kelime kartları, Hata Defterim kayıtları, okuma ve podcast ilerlemesi, XP, seri ve rozetler."),
      tr("Mivo'nun hatırladıkları: sohbetlerinden çıkarılan kısa notlar. Bunları uygulamadan görebilir, düzenleyebilir veya silebilirsin."),
      tr("Bildirimler: bir yapay zekâ yanıtını bildirdiğinde, bildirdiğin yanıt metni, seçtiğin neden ve varsa notun."),
      tr("Abonelik durumu: aboneliğinin aktif olup olmadığı bilgisi (RevenueCat ve mağaza üzerinden). Kart veya banka bilgilerin bize ulaşmaz."),
      tr("Kullanım ve hata verileri: uygulamada yaptığın temel işlemler (örneğin bir sahnenin tamamlanması), cihaz modeli, işletim sistemi, uygulama sürümü ve hata raporları. Analitik, hesabına ait rastgele bir kimlikle ilişkilendirilir; e-posta adresin analitiğe gönderilmez.")
    ],
    },
    {
      id: "voice",
      title: tr("2. Mikrofon ve ses verisi"),
      paras: [
      tr("Mikrofona yalnızca sesli konuşma odasında, sen konuşurken erişilir; izni istediğin zaman cihaz ayarlarından kapatabilirsin."),
      tr("Ham ses kayıtlarını sunucularımızda saklamayız. Konuşman, gerçek zamanlı olarak yazıya çevrilmesi için konuşma tanıma hizmeti sağlayıcılarına (Deepgram; yedek olarak Groq) iletilir. Ortaya çıkan metin, konuşma geçmişinin bir parçası olarak hesabında saklanır."),
      tr("Mivo'nun sesli yanıtları için yazılı yanıt metni ses üretim sağlayıcılarına (Cartesia; yedek olarak OpenAI) gönderilir. Bu sağlayıcıların kendi gizlilik koşulları kendi işlemeleri için geçerlidir.")
    ],
    },
    {
      id: "sharing",
      title: tr("3. Verileri kimlerle paylaşıyoruz?"),
      paras: [
      tr("Verilerini satmayız ve reklam amacıyla kullanmayız. Hizmeti sunabilmek için yalnızca gerekli veriyi aşağıdaki hizmet sağlayıcılarla paylaşırız:")
    ],
      list: [
      tr("Supabase: barındırma, kimlik doğrulama ve veritabanı."),
      tr("OpenAI ve Groq: Mivo'nun yanıtlarını, düzeltmeleri ve hatırlanan notları üretmek için metin işleme."),
      tr("Deepgram ve Groq: konuşmayı yazıya çevirme."),
      tr("Cartesia ve OpenAI: Mivo'nun sesli yanıtlarını üretme."),
      tr("RevenueCat, Apple App Store ve Google Play: abonelik ve ödeme işlemleri; Apple ve Google: oturum açma."),
      tr("PostHog: ürün analitiği; Sentry: hata ve çökme takibi.")
    ],
      after: [
      tr("Yasal bir zorunluluk olduğunda yetkili makamlarla da paylaşım yapılabilir.")
    ],
    },
    {
      id: "transfers",
      title: tr("4. Yurt dışına aktarım"),
      paras: [
      tr("Hizmet sağlayıcılarımızın sunucuları Türkiye ve Avrupa Ekonomik Alanı dışında, örneğin Amerika Birleşik Devletleri'nde bulunabilir. Bu aktarım, hizmetin teknik olarak sunulması için gereklidir ve sağlayıcıların sözleşmesel ve teknik koruma önlemlerine tabidir.")
    ],
    },
    {
      id: "retention",
      title: tr("5. Verileri ne kadar saklıyoruz?"),
      paras: [
      tr("Verilerini hesabın açık kaldığı sürece saklarız. Hesabını sildiğinde hesabına bağlı veriler veritabanımızdan kalıcı olarak silinir. Analitik ve hata takibi sağlayıcılarındaki kayıtlar kendi saklama süreleri sonunda kaldırılır; altyapı yedeklerinde de kısa bir süre kalıntı bulunabilir. Yasal yükümlülüklerimiz gerektirdiğinde ilgili kayıtları yasanın izin verdiği süre boyunca saklarız.")
    ],
    },
    {
      id: "rights",
      title: tr("6. Haklarınız"),
      paras: [
      tr("6698 sayılı KVKK ve Avrupa Birliği'nde GDPR kapsamında şu haklara sahipsin:")
    ],
      list: [
      tr("Verilerinin işlenip işlenmediğini öğrenme ve bir kopyasını isteme"),
      tr("Yanlış veya eksik verilerin düzeltilmesini isteme"),
      tr("Verilerinin silinmesini veya işlenmesinin kısıtlanmasını isteme"),
      tr("İşlemeye itiraz etme ve verilerini taşınabilir biçimde isteme"),
      tr("Yetkili denetim makamına (Türkiye'de KVKK Kurulu, AB'de ilgili veri koruma otoritesi) şikayette bulunma")
    ],
      after: [
      tr("Başvurularını support@spekvia.com adresine iletebilirsin; en geç 30 gün içinde yanıt veririz.")
    ],
    },
    {
      id: "deletion",
      title: tr("7. Hesap ve veri silme"),
      paras: [
      tr("Hesabını uygulamadan Ayarlar bölümündeki \"Hesabımı Kalıcı Olarak Sil\" seçeneğiyle silebilirsin. Uygulamaya erişemiyorsan silme talebini web üzerinden de iletebilirsin."),
      tr("Aktif bir mağaza aboneliğin varsa onu App Store veya Google Play hesabından ayrıca iptal etmelisin; hesabı silmek aboneliği otomatik iptal etmez.")
    ],
      link: { href: "/delete-account", label: tr("Hesap ve Veri Silme sayfasına git") },
    },
    {
      id: "children",
      title: tr("8. Çocukların gizliliği"),
      paras: [
      tr("Spekvia 13 yaşın altındaki çocuklara yönelik değildir ve bu yaş grubundan bilerek veri toplamayız. 13–18 yaş arasındaki kullanıcıların, yasaların gerektirdiği hâllerde ebeveyn veya vasi izniyle kullanması gerekir. 13 yaşın altında birinin hesap açtığını fark edersen support@spekvia.com adresine yaz, hesabı sileriz.")
    ],
    },
    {
      id: "security",
      title: tr("9. Güvenlik"),
      paras: [
      tr("Veriler HTTPS/TLS ile şifreli iletilir ve veritabanında kullanıcı başına erişim kurallarıyla korunur. Hiçbir yöntem tamamen risksiz olmadığı için mutlak güvenlik garanti edemeyiz.")
    ],
    },
    {
      id: "web",
      title: tr("10. Web sitesi ve çerezler"),
      paras: [
      tr("spekvia.com'da yalnızca siteyi çalıştırmak için gerekli depolama kullanılır: dil tercihin, oturum bilgin (giriş yaptıysan) ve çerez tercihin. Bunlar için onay gerekmez."),
      tr("Ürün analitiği (PostHog) çerezleri ve yerel depolaması yalnızca sen \"Kabul et\" dersen kullanılır. Reddedersen analitik hiç başlamaz ve bu amaçla tarayıcında bir şey saklanmaz. Tercihini sayfanın altındaki \"Çerez tercihleri\" bağlantısından istediğin zaman değiştirebilirsin.")
    ],
    },
    {
      id: "changes",
      title: tr("11. Değişiklikler"),
      paras: [
      tr("Bu politikayı güncelleyebiliriz. Önemli değişiklikleri uygulama içinde veya bu sayfada duyururuz. Sayfanın üstündeki tarih, en son güncelleme tarihidir.")
    ],
    },
    {
      id: "contact",
      title: tr("12. İletişim"),
      paras: [
      tr("Gizlilikle ilgili sorular ve talepler için: support@spekvia.com")
    ],
    },
  ],
};

export const TERMS_DOC: LegalDoc = {
  breadcrumb: tr("Kullanım Şartları"),
  eyebrow: tr("Hukuki Koşullar"),
  h1: tr("Spekvia Kullanım Şartları"),
  metaTitle: tr("Kullanım Şartları — Spekvia"),
  metaDesc: tr("Spekvia mobil uygulaması ve web sitesinin kullanım şartları: hesap, yapay zekâ içeriği, abonelik ve iptal, kabul edilebilir kullanım ve sorumluluklar."),
  intro: tr("Spekvia'yı kullanarak bu şartları kabul etmiş olursun. Lütfen dikkatle oku; kabul etmiyorsan uygulamayı kullanma."),
  sections: [
    {
      id: "service",
      title: tr("1. Hizmet"),
      paras: [
      tr("Spekvia, yapay zekâ destekli İngilizce konuşma pratiği sunan bir mobil uygulama ve web sitesidir. Sesli sahneler, Mivo ile sohbet, kelime kartları, okuma, podcast ve ilerleme araçları içerir.")
    ],
    },
    {
      id: "account",
      title: tr("2. Uygunluk ve hesap"),
      paras: [
      tr("Uygulamayı kullanmak için en az 13 yaşında olmalısın; 18 yaşından küçüksen yasaların gerektirdiği durumlarda ebeveyn veya vasinin izni gerekir."),
      tr("Hesap bilgilerinin doğru olmasından ve hesabının güvenliğinden sen sorumlusun. Hesabını başkasıyla paylaşma.")
    ],
    },
    {
      id: "ai",
      title: tr("3. Yapay zekâ içeriği"),
      paras: [
      tr("Mivo'nun yanıtları ve düzeltmeleri yapay zekâ tarafından üretilir; hatalı, eksik veya her bağlamda uygun olmayabilir. İçerik eğitim amaçlıdır; hukuki, tıbbi veya mesleki tavsiye değildir. Sınav (IELTS, TOEFL vb.) veya mülakat sonucu garanti etmeyiz.")
    ],
    },
    {
      id: "plans",
      title: tr("4. Ücretsiz katman ve Spekvia Pro"),
      paras: [
      tr("Spekvia ücretsiz başlar. Ücretsiz katmanda sesli senaryo pratiği günlük ve süre bakımından sınırlıdır; güncel limitler uygulamada gösterilir ve zamanla değişebilir. Spekvia Pro bu sınırları kaldırır ve ek özellikler sunar."),
      tr("Fiyatlar ve ödeme dönemleri satın alma ekranında ve App Store / Google Play'de, bulunduğun ülkenin para biriminde gösterilir.")
    ],
    },
    {
      id: "billing",
      title: tr("5. Abonelik, iptal ve iade"),
      list: [
      tr("Abonelikler, sen iptal etmedikçe seçtiğin dönem sonunda mağaza hesabın üzerinden otomatik yenilenir."),
      tr("Aboneliği yenileme tarihinden önce App Store veya Google Play hesap ayarlarından iptal edebilirsin; iptal sonrası mevcut dönemin sonuna kadar Pro özellikleri devam eder."),
      tr("Ödeme ve iade işlemlerini ilgili mağaza yürütür; iade talepleri o mağazanın politikalarına tabidir. Uygulamayı silmek aboneliği iptal etmez.")
    ],
    },
    {
      id: "use",
      title: tr("6. Kabul edilebilir kullanım"),
      paras: [
      tr("Spekvia'yı yasalara ve bu şartlara uygun kullanmayı kabul edersin. Şunları yapmamalısın:")
    ],
      list: [
      tr("Yasa dışı, tehditkâr, nefret içeren veya başkalarının haklarını ihlal eden içerik üretmek veya yaymak"),
      tr("Hizmeti, yapay zekâ sistemlerini veya diğer kullanıcıları kötüye kullanmak; otomatik araçlarla (bot) aşırı yük bindirmek"),
      tr("Güvenlik önlemlerini aşmaya, uygulamayı tersine mühendislikle çözmeye veya yetkisiz erişim sağlamaya çalışmak"),
      tr("Hesabını veya içeriği izinsiz ticari amaçla kullanmak ya da yeniden satmak"),
      tr("Cinsel içerikli veya müstehcen materyal; reşit olmayanları içeren herhangi bir cinsel içerik; başkalarının rızası olmadan hazırlanmış cinsel içerikli görüntüler (yapay zekâ ile üretilenler dahil, NCII) oluşturmak, istemek veya paylaşmak")
    ],
    after: [
      tr("Spekvia görüntü veya video üretmez; yalnızca metin ve ses tabanlı bir İngilizce konuşma pratiği sunar. Bu kuralları ihlal eden hesaplar uyarı yapılmadan kapatılabilir.")
    ],
    },
    {
      id: "ip",
      title: tr("7. Fikri mülkiyet ve içeriğin"),
      paras: [
      tr("Spekvia adı, logosu, Mivo karakteri, görseller, senaryolar, dersler ve yazılım Spekvia'ya veya lisans verenlerine aittir; izinsiz kopyalanamaz veya dağıtılamaz."),
      tr("Konuşmaların ve yazdıkların sana aittir. Hizmeti sunmak, sana düzeltme ve kişiselleştirme sağlamak için bu içeriği işlememiz için bize sınırlı bir kullanım izni vermiş olursun. Veri işleme ayrıntıları Gizlilik Politikası'ndadır.")
    ],
    },
    {
      id: "termination",
      title: tr("8. Hesabın sona ermesi"),
      paras: [
      tr("Hesabını istediğin zaman uygulamadan silebilirsin. Bu şartları ihlal edersen hesabını askıya alabilir veya sonlandırabiliriz.")
    ],
    },
    {
      id: "liability",
      title: tr("9. Sorumluluğun sınırlandırılması"),
      paras: [
      tr("Hizmet \"olduğu gibi\" sunulur; kesintisiz veya hatasız çalışacağını garanti etmeyiz. Yasaların izin verdiği ölçüde, hizmetin kullanımından doğan dolaylı zararlardan sorumlu değiliz. Tüketici mevzuatından doğan ve sınırlandırılamayan hakların saklıdır.")
    ],
    },
    {
      id: "changes",
      title: tr("10. Değişiklikler"),
      paras: [
      tr("Bu şartları güncelleyebiliriz. Önemli değişiklikleri uygulama içinde veya bu sayfada duyururuz; değişiklikten sonra kullanmaya devam etmen güncel şartları kabul ettiğin anlamına gelir.")
    ],
    },
    {
      id: "law",
      title: tr("11. Uygulanacak hukuk"),
      paras: [
      tr("Bu şartlara Türkiye Cumhuriyeti hukuku uygulanır. Bulunduğun ülkenin tüketici mevzuatının zorunlu hükümleri saklıdır.")
    ],
    },
    {
      id: "contact",
      title: tr("12. İletişim"),
      paras: [
      tr("Sorular için: support@spekvia.com")
    ],
    },
  ],
};

export const DELETE_DOC: LegalDoc = {
  breadcrumb: tr("Hesap ve Veri Silme"),
  eyebrow: tr("Yasal Bilgilendirme"),
  h1: tr("Hesap ve Veri Silme"),
  metaTitle: tr("Hesap ve Veri Silme — Spekvia"),
  metaDesc: tr("Spekvia hesabını ve verilerini nasıl silersin? Uygulamadan veya e-posta ile; nelerin silindiği ve nelerin kısa süre kalabileceği."),
  intro: tr("Hesabını ve ona bağlı verileri istediğin zaman silebilirsin. İki yol var."),
  sections: [
    {
      id: "in-app",
      title: tr("Uygulamadan sil (en hızlısı)"),
      list: [
      tr("Spekvia'yı aç ve profil resmine dokun (Ayarlar)."),
      tr("En alttaki \"Hesabımı Kalıcı Olarak Sil\" seçeneğine dokun."),
      tr("Onayla. Hesabın ve verilerin hemen silinir.")
    ],
    },
    {
      id: "by-email",
      title: tr("E-posta ile talep et"),
      paras: [
      tr("Uygulamaya erişemiyorsan, hesabına kayıtlı e-posta adresinden support@spekvia.com adresine \"Hesap silme talebi\" konulu bir e-posta gönder. Kimliğini doğruladıktan sonra en geç 30 gün içinde hesabını sileriz.")
    ],
    },
    {
      id: "deleted",
      title: tr("Neler silinir?"),
      list: [
      tr("Hesabın ve giriş bilgilerin"),
      tr("Profil bilgilerin, tercihlerin ve avatarın"),
      tr("Konuşma oturumların, kelime kartların, Hata Defterim kayıtların ve ilerlemen (XP, seri, rozetler)"),
      tr("Mivo'nun hatırladığı notlar"),
      tr("Yapay zekâ yanıtları için gönderdiğin bildirimler")
    ],
    },
    {
      id: "may-remain",
      title: tr("Neler kalabilir?"),
      list: [
      tr("Analitik ve hata takibi sağlayıcılarındaki kayıtlar kendi saklama süreleri sonunda kaldırılır."),
      tr("Altyapı yedeklerinde kısa süreli kalıntı bulunabilir."),
      tr("Yasal yükümlülüklerin gerektirdiği kayıtlar, yasanın izin verdiği süre boyunca saklanabilir.")
    ],
    },
    {
      id: "subscription",
      title: tr("Aboneliğin varsa"),
      paras: [
      tr("Hesabı silmek mağaza aboneliğini iptal etmez. Ücretlendirilmemek için aboneliği App Store veya Google Play hesabından ayrıca iptal et.")
    ],
    },
  ],
};
