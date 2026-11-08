import { t } from '../i18n';

/**
 * The scenes of Mivo's free chat ("Bir durum canlandır"), shown as cards on the 'Ne konuşalım?' page.
 * `id` is the backend topic id (backend/app/services/free_chat_topics.py), which runs the scene; the rest is display:
 * a short story, three goals to aim for and a few phrases that help.
 */
export type FreeChatScenario = {
  id: string;
  level: string;
  emoji: string;
  /** Card and sheet colour. */
  tint: string;
  title: () => string;
  story: () => string;
  goals: () => string[];
  phrases: string[];
};

export const FREE_CHAT_SCENARIOS: FreeChatScenario[] = [
  {
    id: 'meet', level: 'A1', emoji: '👋', tint: '#F9D3C8',
    title: () => t("Yeni biriyle tanışma"),
    story: () => t("Bir partide yeni biriyle tanışıyorsun. Birbirinizi tanımaya başlıyorsunuz."),
    goals: () => [t("Kendini tanıt"), t("Ona bir soru sor"), t("Hobilerinden bahset")],
    phrases: ["Nice to meet you!", "Where are you from?", "What do you do?", "I really like…"],
  },
  {
    id: 'cafe', level: 'A1', emoji: '☕', tint: '#FBE6B5',
    title: () => t("Kafede sipariş"),
    story: () => t("Sevdiğin kafedesin. Barista siparişini almayı bekliyor."),
    goals: () => [t("Bir içecek sipariş et"), t("Boyutunu seç"), t("Hesabı öde")],
    phrases: ["Can I have a…, please?", "A large one, please.", "How much is it?", "Can I pay by card?"],
  },
  {
    id: 'daily_routine', level: 'A1', emoji: '⏰', tint: '#D3E8F6',
    title: () => t("Günlük rutin"),
    story: () => t("Yeni bir arkadaşın gününün nasıl geçtiğini merak ediyor."),
    goals: () => [t("Sabah rutinini anlat"), t("İşini ya da okulunu anlat"), t("Akşam ne yaptığını söyle")],
    phrases: ["I usually get up at…", "Then I…", "In the evening I…", "On weekends I…"],
  },
  {
    id: 'movies_hobbies', level: 'A1', emoji: '🎬', tint: '#E3E0FA',
    title: () => t("Filmler ve hobiler"),
    story: () => t("Film ve hobi meraklısı biriyle sohbet ediyorsun."),
    goals: () => [t("Sevdiğin bir filmi anlat"), t("Bir hobini paylaş"), t("Ona da bir soru sor")],
    phrases: ["My favourite film is…", "It's about…", "In my free time I…", "What about you?"],
  },
  {
    id: 'directions', level: 'A2', emoji: '🗺️', tint: '#CDEBDD',
    title: () => t("Yol tarifi"),
    story: () => t("Kaybolmuş bir turist sana yolu soruyor. Ona yardım et."),
    goals: () => [t("Yeri tarif et"), t("Ne kadar uzak olduğunu söyle"), t("Tarifi tekrar ettir")],
    phrases: ["Go straight on.", "Turn left at…", "It's next to…", "It takes about five minutes."],
  },
  {
    id: 'hotel', level: 'A2', emoji: '🏨', tint: '#E3E0FA',
    title: () => t("Otelde giriş"),
    story: () => t("Otele vardın, resepsiyonda giriş yapıyorsun."),
    goals: () => [t("Rezervasyonunu söyle"), t("Odayla ilgili bir şey sor"), t("Kahvaltı saatini öğren")],
    phrases: ["I have a reservation.", "Under the name…", "Is breakfast included?", "What time is check-out?"],
  },
  {
    id: 'restaurant', level: 'A2', emoji: '🍝', tint: '#F9D3C8',
    title: () => t("Restoranda yemek"),
    story: () => t("Akşam yemeği için bir restorandasın. Garson masana geliyor."),
    goals: () => [t("Yemek sipariş et"), t("Öneri iste"), t("Hesabı iste")],
    phrases: ["Could I see the menu?", "What do you recommend?", "I'd like the…", "Could we have the bill?"],
  },
  {
    id: 'shopping', level: 'A2', emoji: '🛍️', tint: '#FBE6B5',
    title: () => t("Mağazada alışveriş"),
    story: () => t("Bir giyim mağazasındasın, beğendiğin bir ceketi deneyeceksin."),
    goals: () => [t("Bedenini sor"), t("Denemek iste"), t("Fiyatı sor")],
    phrases: ["Do you have this in medium?", "Can I try it on?", "How much is this?", "I'll take it."],
  },
  {
    id: 'weekend', level: 'A2', emoji: '🌤️', tint: '#CDEBDD',
    title: () => t("Hafta sonu sohbeti"),
    story: () => t("Bir arkadaşın hafta sonunu nasıl geçirdiğini soruyor."),
    goals: () => [t("Ne yaptığını anlat"), t("Nasıl hissettiğini söyle"), t("Onun hafta sonunu sor")],
    phrases: ["On Saturday I…", "It was really…", "I went to…", "How was your weekend?"],
  },
  {
    id: 'travel', level: 'A2', emoji: '✈️', tint: '#D3E8F6',
    title: () => t("Seyahat planı"),
    story: () => t("Yaklaşan seyahatini merak eden bir arkadaşınla konuşuyorsun."),
    goals: () => [t("Nereye gideceğini söyle"), t("Ne yapacağını anlat"), t("Bir tavsiye iste")],
    phrases: ["I'm going to…", "I'm planning to…", "I can't wait to…", "Have you ever been there?"],
  },
  {
    id: 'phone_appointment', level: 'B1', emoji: '📞', tint: '#D3E8F6',
    title: () => t("Telefonla randevu"),
    story: () => t("Bir kliniği arayıp randevu almak istiyorsun."),
    goals: () => [t("Randevu iste"), t("Uygun bir gün seç"), t("Bilgileri teyit et")],
    phrases: ["I'd like to book an appointment.", "Is Tuesday possible?", "Could you repeat that?", "So that's at…"],
  },
  {
    id: 'return_item', level: 'B1', emoji: '📦', tint: '#EFE6D6',
    title: () => t("Ürün iadesi"),
    story: () => t("Aldığın bir ürün bozuk çıktı. Mağazada iade etmek istiyorsun."),
    goals: () => [t("Sorunu anlat"), t("Ne istediğini söyle"), t("Bir çözümde anlaş")],
    phrases: ["I bought this last week.", "It doesn't work.", "I'd like a refund.", "Could I exchange it?"],
  },
  {
    id: 'interview', level: 'B1', emoji: '💼', tint: '#EFE6D6',
    title: () => t("İş görüşmesi"),
    story: () => t("Hayalindeki iş için görüşmedesin. Görüşmeci sorularını soruyor."),
    goals: () => [t("Kendini tanıt"), t("Güçlü yanını anlat"), t("Bir soru sor")],
    phrases: ["I have experience in…", "One of my strengths is…", "In my last job I…", "What does a typical day look like?"],
  },
  {
    id: 'presentation', level: 'B1', emoji: '🎤', tint: '#E3E0FA',
    title: () => t("Sunum yapma"),
    story: () => t("Öğretmenine bir ödev sunumu yapıyorsun. Sorular gelebilir."),
    goals: () => [t("Konunu tanıt"), t("Ana fikri açıkla"), t("Bir soruya cevap ver")],
    phrases: ["Today I'm going to talk about…", "First of all…", "The main point is…", "That's a good question."],
  },
];
