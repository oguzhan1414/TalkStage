export type PodcastTranscriptLine = {
  id: string;
  timeSec: number;
  speaker: string;
  en: string;
  tr: string;
  keyVocab?: { word: string; tr: string }[];
};

export type PodcastEpisode = {
  id: string;
  title: string;
  titleTr: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  durationMin: number;
  host: string;
  badge: string;
  coverEmoji: string;
  description: string;
  audioUrl?: string;
  transcript: PodcastTranscriptLine[];
};

export const PODCASTS: PodcastEpisode[] = [
  {
    id: 'tech-innovations-2026',
    title: 'The Future of AI & Engineering Careers',
    titleTr: 'Yapay Zeka & Mühendislik Kariyerlerinin Geleceği',
    level: 'B2',
    durationMin: 14,
    host: 'Mivo & Sarah Jenkins',
    badge: 'Kariyer & Teknoloji',
    coverEmoji: '🤖',
    description: 'Yapay zeka asistanlarının modern yazılım dünyasını nasıl dönüştürdüğü, mühendislerin hangi becerilere odaklanması gerektiği üzerine çift dilli derin bir sohbet.',
    transcript: [
      {
        id: 't1',
        timeSec: 0,
        speaker: 'Mivo',
        en: 'Welcome back to TalkStage Podcast! Today, we are exploring how AI pair-programming is reshaping modern tech workflows.',
        tr: 'TalkStage Podcast\'e tekrar hoş geldiniz! Bugün, yapay zeka destekli kodlamanın modern teknoloji iş akışlarını nasıl yeniden şekillendirdiğini inceliyoruz.',
        keyVocab: [{ word: 'Reshaping', tr: 'Yeniden şekillendirme' }, { word: 'Workflows', tr: 'İş akışları' }],
      },
      {
        id: 't2',
        timeSec: 15,
        speaker: 'Sarah',
        en: 'Thanks Mivo! Many junior engineers worry that AI might replace them, but the reality is that it augments their productivity tremendously.',
        tr: 'Teşekkürler Mivo! Birçok genç mühendis yapay zekanın onların yerini almasından endişeleniyor, ancak gerçek şu ki verimliliklerini muazzam şekilde artırıyor.',
        keyVocab: [{ word: 'Augment', tr: 'Artırmak / Desteklemek' }, { word: 'Tremendously', tr: 'Muazzam ölçüde' }],
      },
      {
        id: 't3',
        timeSec: 32,
        speaker: 'Mivo',
        en: 'Exactly. Rather than writing repetitive boilerplate code, developers can now focus on high-level architecture and problem-solving.',
        tr: 'Kesinlikle. Geliştiriciler artık tekrarlayan kalıp kodlar yazmak yerine, üst düzey mimari ve problem çözmeye odaklanabiliyor.',
        keyVocab: [{ word: 'Boilerplate', tr: 'Şablon / Tekrarlayan kod' }, { word: 'High-level', tr: 'Üst düzey' }],
      },
      {
        id: 't4',
        timeSec: 48,
        speaker: 'Sarah',
        en: 'To succeed in this landscape, strong communication and algorithmic clarity are more critical than ever.',
        tr: 'Bu ekosistemde başarılı olmak için güçlü iletişim ve algoritmik netlik her zamankinden daha kritik.',
        keyVocab: [{ word: 'Landscape', tr: 'Ekosistem / Alan' }, { word: 'Clarity', tr: 'Netlik' }],
      },
    ],
  },
  {
    id: 'daily-routines-productivity',
    title: 'Designing Your Optimal Morning Routine',
    titleTr: 'En Verimli Sabah Rutinini Tasarlamak',
    level: 'A2',
    durationMin: 10,
    host: 'Mivo & Marcus Cole',
    badge: 'Kişisel Gelişim',
    coverEmoji: '☕',
    description: 'Dünya çapında başarılı profesyonellerin sabah alışkanlıkları, odaklanma teknikleri ve günlük İngilizce pratik tüyoları.',
    transcript: [
      {
        id: 't1',
        timeSec: 0,
        speaker: 'Mivo',
        en: 'Hello everyone! In today’s episode, Marcus and I talk about morning routines that set you up for success.',
        tr: 'Herkese merhaba! Bugünkü bölümde Marcus ile sizi başarıya hazırlayan sabah rutinleri hakkında konuşuyoruz.',
        keyVocab: [{ word: 'Set up for', tr: 'Hazırlamak / Zemin hazırlamak' }],
      },
      {
        id: 't2',
        timeSec: 14,
        speaker: 'Marcus',
        en: 'The first hour of your day sets the tone for everything else. I always start with hydration and 10 minutes of active reading.',
        tr: 'Gününüzün ilk saati geri kalan her şeyin tonunu belirler. Ben her zaman su içerek ve 10 dakika aktif okuma yaparak başlarım.',
        keyVocab: [{ word: 'Hydration', tr: 'Su tüketimi' }, { word: 'Sets the tone', tr: 'Havasını / Tonunu belirler' }],
      },
      {
        id: 't3',
        timeSec: 28,
        speaker: 'Mivo',
        en: 'That’s also the best window to review your English vocabulary flashcards before checking work notifications!',
        tr: 'İş bildirimlerini kontrol etmeden önce İngilizce kelime kartlarınızı tekrar etmek için de en iyi zaman dilimi budur!',
        keyVocab: [{ word: 'Window', tr: 'Zaman aralığı / Fırsat' }],
      },
    ],
  },
];
