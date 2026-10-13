import { tr } from "@/i18n/shared";

export type Segment = { text: string; bad?: boolean; fix?: string };

export type Take = {
  scene: string;
  level: string;
  twist: string;
  image: string;
  objectPosition: string;
  character: string;
  role: string;
  line: string;
  said: Segment[];
  note: string;
};

/** Real mistakes Turkish speakers make, played inside real Spekvia scenes (levels/twists match the app). */
export const TAKES: Take[] = [
  {
    scene: tr("İstanbul şehir turu"),
    level: 'A2',
    twist: tr("Sohbet etmek istiyor"),
    image: '/scenes/istanbul-tour.webp',
    objectPosition: '70% 50%',
    character: 'Elif',
    role: tr("Şehir rehberi"),
    line: 'Welcome to Istanbul! Is this your first time here?',
    said: [
      { text: 'No, I ' },
      { text: 'am here', bad: true, fix: 'have been here' },
      { text: ' since last year.' },
    ],
    note: tr("“Since” ile şimdiki zaman değil “have been” kullanılır."),
  },
  {
    scene: tr("Londra’da taksi yolculuğu"),
    level: 'A2',
    twist: tr("Acele var"),
    image: '/scenes/taxi-ride.webp',
    objectPosition: '75% 50%',
    character: 'Tom',
    role: tr("Taksi şoförü"),
    line: 'Where to, mate? Traffic’s terrible today, so be quick!',
    said: [
      { text: 'I ' },
      { text: 'want go', bad: true, fix: 'want to go' },
      { text: ' to Big Ben.' },
    ],
    note: tr("“Want” fiilinden sonra “to” gelir: want to go."),
  },
  {
    scene: tr("Spor salonunda antrenman"),
    level: 'A2',
    twist: tr("Öneri iste"),
    image: '/scenes/fitness-gym.webp',
    objectPosition: '70% 50%',
    character: 'Jake',
    role: tr("Antrenör"),
    line: 'What’s your goal — more strength or more cardio?',
    said: [
      { text: 'I ' },
      { text: 'am wanting to be strong', bad: true, fix: 'want to get stronger' },
      { text: '.' },
    ],
    note: tr("“Want” durum fiilidir; “am wanting” denmez. Doğrusu: I want to get stronger."),
  },
];
