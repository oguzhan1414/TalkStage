import { tr } from "@/i18n/shared";

export type FaqCategory =
  | "Tümü"
  | "Genel"
  | "Konuşma & Düzeltme"
  | "Sahneler & Seviyeler"
  | "Kelime & Çalışma"
  | "Abonelik"
  | "Gizlilik & Cihazlar";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "g1",
    category: "Genel",
    question: tr("Spekvia nedir?"),
    answer:
      tr("Gerçek hayat sahnelerini sesli prova ettiğin bir İngilizce uygulaması. Mivo karşındaki karakteri oynar, sen konuşursun; takıldığın cümleyi anında düzeltir ve nedenini kendi dilinde açıklar. Yanında kelime, okuma ve podcast çalışmaları da var."),
  },
  {
    id: "g2",
    category: "Genel",
    question: tr("Mivo kim?"),
    answer:
      tr("Mivo, Spekvia’nın yapay zekâ koçu ve maskotu. Sahnelerde karakteri oynar, serbest sohbette seninle istediğin konuda konuşur ve önceki sohbetlerden birkaç kısa not hatırlar."),
  },
  {
    id: "g3",
    category: "Genel",
    question: tr("Günde ne kadar çalışmalıyım?"),
    answer:
      tr("Bir sahne 5–10 dakika sürer. İlk kurulumda günlük hedefini seçersin; Bugün sekmesi o gün için sıradaki işi gösterir, ne çalışacağını düşünmen gerekmez."),
  },
  {
    id: "k1",
    category: tr("Konuşma & Düzeltme"),
    question: tr("Yanlış cümle kurarsam ne olur?"),
    answer:
      tr("Mivo konuşmanı bölmeden doğru hâlini gösterir ve nedenini kendi dilinde kısaca açıklar. Düzeltilen cümleler Hata Defterim’e düşer; istediğinde dönüp çalışırsın."),
  },
  {
    id: "k2",
    category: tr("Konuşma & Düzeltme"),
    question: tr("Telaffuzumu değerlendiriyor mu?"),
    answer:
      tr("Konuşmanı yazıya çeviren sistemin kelime bazlı güven puanını gösteririz; düşük puanlı kelimeler telaffuz için bir ipucudur. Bu tam bir aksan analizi değildir. Zorlandığın kelimeleri Telaffuz çalışmasında tek tek tekrar edebilirsin."),
  },
  {
    id: "k3",
    category: tr("Konuşma & Düzeltme"),
    question: tr("Konuşurken yazılı transkripti görebilir miyim?"),
    answer:
      tr("Evet. Söylediğin cümle önce ekranda görünür; göndermeden önce kontrol edip düzeltebilir ya da yeniden kaydedebilirsin. Karşı tarafın cümlelerini de yazılı olarak ve tekrar dinleyerek takip edersin."),
  },
  {
    id: "s1",
    category: "Sahneler & Seviyeler",
    question: tr("Hangi sahneler var?"),
    answer:
      tr("A1’den B2’ye 21 sahne: havalimanı, otel, restoran, taksi, doktor, iş mülakatı, bitpazarı, ev bakma, ofis molası ve daha fazlası. Her sahne önce kısa bir videoyla başlar, sonra Mivo karakteri canlı oynar."),
  },
  {
    id: "s2",
    category: "Sahneler & Seviyeler",
    question: tr("Aynı sahneyi tekrar oynarsam ne değişir?"),
    answer:
      tr("Her oynayışta karşına farklı bir durum çıkar: bir karışıklık, bitmiş bir ürün, aceleci biri, meraklı biri ya da kibar bir şikâyet. Sahne hedefleri aynı kalır ama konuşma farklı gider. Her sahnede 1–3 yıldız toplarsın: videoyu bitirmek, canlı oynamak ve hedefleri en fazla iki düzeltmeyle tamamlamak."),
  },
  {
    id: "s3",
    category: "Sahneler & Seviyeler",
    question: tr("Seviyemi nasıl belirlerim? Sahneler kilitli mi?"),
    answer:
      tr("Kısa bir seviye belirleme seni A1–C2 arasında yerleştirir. Seviyen ve altındaki sahneler açıktır, bir üst seviye “zor” etiketiyle denenebilir; daha ilerisi önceki seviyeyi bitirince açılır."),
  },
  {
    id: "s4",
    category: "Sahneler & Seviyeler",
    question: tr("Seviyem çok düşükse kullanabilir miyim?"),
    answer:
      tr("Evet. A1 ve A2 sahnelerinde Mivo seni kendi dilinde yönlendirir, ne söyleyeceğini gösterir ve ilk cümleleri kurmana yardım eder."),
  },
  {
    id: "s5",
    category: "Sahneler & Seviyeler",
    question: tr("Kendi sahnemi ekleyebilir miyim?"),
    answer:
      tr("Şimdilik hazır sahneler ve Mivo ile serbest sohbet var; istediğin konuyu serbest sohbette açabilirsin. Kendi sahneni kurma özelliği henüz yok."),
  },
  {
    id: "w1",
    category: tr("Kelime & Çalışma"),
    question: tr("Kelime tekrarı nasıl çalışıyor?"),
    answer:
      tr("900 çekirdek kelime var. Her kartı ne kadar iyi bildiğine göre bir sonraki tekrar günü hesaplanır (SM-2); kelimeler tam unutmak üzereyken karşına çıkar. Konuşmada ya da okumada gördüğün kelimeleri kendi destene de ekleyebilirsin."),
  },
  {
    id: "w2",
    category: tr("Kelime & Çalışma"),
    question: tr("Okuma modülünde ne yapıyorum?"),
    answer:
      tr("Kısa, resimli hikâyeleri sahne sahne okursun. Her sahnede dinle, boşluğu doldur, kelimeyi harf harf yaz ya da cümleyi sıraya diz gibi alıştırmalar vardır; hikâyenin sonunda cümleni sesli söylersin. Yeni hikâyeler şu an A1–A2 seviyesinde, üst seviyeler hazırlanıyor."),
  },
  {
    id: "w3",
    category: tr("Kelime & Çalışma"),
    question: tr("Podcastler nasıl?"),
    answer:
      tr("A1–B2 arasında 40 bölüm. İki dilli transkripti takip edebilir, bir cümleye dokunup sesi oraya atlatabilirsin. Bölümü sonuna kadar dinleyince küçük bir test açılır."),
  },
  {
    id: "a1",
    category: "Abonelik",
    question: tr("Ücretsiz mi?"),
    answer:
      tr("Ücretsiz başlayabilirsin: günde 1 sesli sahne (5 dakikaya kadar), kelime kartları, okuma hikâyeleri ve anlık düzeltme. Sınırsız sesli pratik için Pro var."),
  },
  {
    id: "a2",
    category: "Abonelik",
    question: tr("Pro neleri kapsar, fiyatı ne?"),
    answer:
      tr("Sınırsız sesli sahne ve Mivo ile serbest sohbet, 30 dakikaya kadar uzun oturumlar. Fiyat uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir."),
  },
  {
    id: "a3",
    category: "Abonelik",
    question: tr("Aboneliğimi nasıl iptal ederim?"),
    answer:
      tr("Abonelik mağaza hesabından (App Store ya da Google Play) yönetilir; istediğin zaman oradan iptal edebilirsin."),
  },
  {
    id: "c1",
    category: "Gizlilik & Cihazlar",
    question: tr("Sesim ve konuşmalarım ne oluyor?"),
    answer:
      tr("Konuştuğun cümleler metne çevrilip Mivo’ya iletilir; ilk sesli odada gizlilik onayı istenir. Mivo’nun sohbetlerden sakladığı kısa notları uygulamadan görebilir, düzeltebilir veya silebilirsin. Ayrıntılar Gizlilik Politikası’nda."),
  },
  {
    id: "c2",
    category: "Gizlilik & Cihazlar",
    question: tr("Hesabımı ve verilerimi silebilir miyim?"),
    answer: tr("Evet. Hesap ayarlarından hesabını sildiğinde hesabın ve ona bağlı veriler sunucudan kaldırılır."),
  },
  {
    id: "c3",
    category: "Gizlilik & Cihazlar",
    question: tr("Hangi dillerde kullanabilirim?"),
    answer:
      tr("Arayüz ve açıklamalar Türkçe, İngilizce, İspanyolca, Brezilya Portekizcesi ve Almanca olarak kullanılabilir. Çalıştığın dil her zaman İngilizce. Çevirilerin bir kısmı yapay zekâyla üretildi; hatalı bir şey görürsen bize yaz."),
  },
  {
    id: "c4",
    category: "Gizlilik & Cihazlar",
    question: tr("İnternet bağlantım zayıfsa ne olur?"),
    answer:
      tr("Sesli sahneler ve Mivo sohbeti internet gerektirir; zayıf bağlantıda yanıtlar gecikebilir. Kararlı bir Wi-Fi ya da 4G/5G önerilir."),
  },
];

// Category names are also the filter keys (Turkish source); they are translated only for display.
export const FAQ_CATEGORIES: FaqCategory[] = [
  tr("Tümü"),
  tr("Genel"),
  tr("Konuşma & Düzeltme"),
  tr("Sahneler & Seviyeler"),
  tr("Kelime & Çalışma"),
  tr("Abonelik"),
  tr("Gizlilik & Cihazlar"),
];
