import { tr } from "@/i18n/shared";

export type Segment = { text: string; bad?: boolean; fix?: string };

export type Take = {
  scene: string;
  level: string;
  image: string;
  objectPosition: string;
  role: string;
  line: string;
  said: Segment[];
  note: string;
};

/** Mivo plays the other person; the slips are ones Turkish speakers really make. One take per hero artwork. */
export const TAKES: Take[] = [
  {
    scene: tr("Kafede sipariş"),
    level: 'A1',
    image: '/hero/hero-portal.webp',
    objectPosition: '62% 42%',
    role: tr("Barista"),
    line: 'Hi there! What can I get for you?',
    said: [
      { text: '' },
      { text: 'Give me a coffee', bad: true, fix: 'Could I have a coffee' },
      { text: ', please.' },
    ],
    note: tr("Siparişte “Give me” sert durur; “Could I have…” daha nazik."),
  },
  {
    scene: tr("İş mülakatı"),
    level: 'B1',
    image: '/hero/hero-stage.webp',
    objectPosition: '68% 40%',
    role: tr("Mülakatçı"),
    line: 'Tell me a little about yourself.',
    said: [
      { text: 'I ' },
      { text: 'have 28 years old', bad: true, fix: 'am 28 years old' },
      { text: ' and I work as a designer.' },
    ],
    note: tr("İngilizcede yaş “have” ile değil “be” ile söylenir: I am 28."),
  },
  {
    scene: tr("Yeni biriyle sohbet"),
    level: 'A1',
    image: '/hero/hero-sky.webp',
    objectPosition: '68% 38%',
    role: tr("Yeni arkadaş"),
    line: 'Do you like this city?',
    said: [
      { text: 'Yes, ' },
      { text: 'I am agree', bad: true, fix: 'I agree' },
      { text: ', it is beautiful.' },
    ],
    note: tr("“Agree” zaten fiildir; “am agree” denmez, “I agree” yeter."),
  },
  {
    scene: tr("Otelde check-in"),
    level: 'A1',
    image: '/hero/hero-listen.webp',
    objectPosition: '55% 45%',
    role: tr("Resepsiyon görevlisi"),
    line: 'Welcome! Do you have a reservation?',
    said: [
      { text: 'Yes, I have a reservation ' },
      { text: 'on my name', bad: true, fix: 'under my name' },
      { text: '.' },
    ],
    note: tr("Rezervasyon için “under my name” denir."),
  },
];
