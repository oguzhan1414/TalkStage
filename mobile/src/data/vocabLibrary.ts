/**
 * Frekans bazlı "1. Paket (1-100)", "2. Paket (101-200)" ve "3. Paket (201-300)" kelime kütüphaneleri (sıfat/isim/fiil)
 * Kaynak: repo kökündeki first_100_*.md, second_100_*.md ve third_100_*.md dosyaları.
 * Seviyeden bağımsız çekirdek kelime setleri — Kelime Kütüphanesi ekranında gösterilir,
 * tek dokunuşla SM-2 Kelime Sandığı'na eklenir.
 */

export type LibraryFormDetail = {
  form: string;
  phonetic?: string;
  translation: string;
};

export type LibraryAntonym = {
  word: string;
  phonetic: string;
  translation: string;
};

export type LibraryWordEntry = {
  id: string;
  rank: number;
  partOfSpeech: 'adjective' | 'verb' | 'noun' | 'adverb';
  word: string;
  phonetic: string;
  translation: string;
  exampleEn: string;
  exampleTr: string;
  grammarNote: string;
  // Adjective-specific
  comparative?: LibraryFormDetail;
  superlative?: LibraryFormDetail;
  antonym?: LibraryAntonym;
  // Noun-specific
  countable?: boolean;
  singular?: LibraryFormDetail;
  plural?: LibraryFormDetail;
  partitiveUnit?: LibraryFormDetail;
  possessivePhrase?: LibraryFormDetail;
  determinerPhrase?: LibraryFormDetail;
  // Verb-specific
  presentSimple?: LibraryFormDetail;
  presentContinuous?: LibraryFormDetail;
  future?: LibraryFormDetail;
  pastSimple?: LibraryFormDetail;
};

export const ADJECTIVES_100: LibraryWordEntry[] = [
  {
    "id": "adj_001",
    "rank": 1,
    "word": "Fast",
    "phonetic": "/fɑːst/",
    "translation": "Hızlı",
    "exampleEn": "My new laptop is much faster than my old computer.",
    "grammarNote": "",
    "exampleTr": "Yeni dizüstü bilgisayarım eski bilgisayarımdan çok daha hızlıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "faster (than)",
      "phonetic": "/ˈfɑː.stər/",
      "translation": "daha hızlı"
    },
    "superlative": {
      "form": "the fastest",
      "phonetic": "/ðə ˈfɑː.stɪst/",
      "translation": "en hızlı"
    },
    "antonym": {
      "word": "slow",
      "phonetic": "/sləʊ/",
      "translation": "yavaş"
    }
  },
  {
    "id": "adj_002",
    "rank": 2,
    "word": "Slow",
    "phonetic": "/sləʊ/",
    "translation": "Yavaş",
    "exampleEn": "The legacy database query was extremely slow under heavy traffic.",
    "grammarNote": "",
    "exampleTr": "Eski veritabanı sorgusu yoğun trafik altında aşırı derecede yavaştı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "slower (than)",
      "phonetic": "/ˈsləʊ.ər/",
      "translation": "daha yavaş"
    },
    "superlative": {
      "form": "the slowest",
      "phonetic": "/ðə ˈsləʊ.ɪst/",
      "translation": "en yavaş"
    },
    "antonym": {
      "word": "fast",
      "phonetic": "/fɑːst/",
      "translation": "hızlı"
    }
  },
  {
    "id": "adj_003",
    "rank": 3,
    "word": "Big",
    "phonetic": "/bɪɡ/",
    "translation": "Büyük",
    "exampleEn": "Our company moved into a bigger office in the technology park.",
    "grammarNote": "",
    "exampleTr": "Şirketimiz teknoloji parkında daha büyük bir ofise taşındı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "bigger (than)",
      "phonetic": "/ˈbɪɡ.ər/",
      "translation": "daha büyük"
    },
    "superlative": {
      "form": "the biggest",
      "phonetic": "/ðə ˈbɪɡ.ɪst/",
      "translation": "en büyük"
    },
    "antonym": {
      "word": "small",
      "phonetic": "/smɔːl/",
      "translation": "küçük"
    }
  },
  {
    "id": "adj_004",
    "rank": 4,
    "word": "Small",
    "phonetic": "/smɔːl/",
    "translation": "Küçük",
    "exampleEn": "This is just a small bug that we can fix in five minutes.",
    "grammarNote": "",
    "exampleTr": "Bu, beş dakika içinde çözebileceğimiz küçük bir hatadır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "smaller (than)",
      "phonetic": "/ˈsmɔː.lər/",
      "translation": "daha küçük"
    },
    "superlative": {
      "form": "the smallest",
      "phonetic": "/ðə ˈsmɔː.lɪst/",
      "translation": "en küçük"
    },
    "antonym": {
      "word": "big / large",
      "phonetic": "/bɪɡ/",
      "translation": "büyük"
    }
  },
  {
    "id": "adj_005",
    "rank": 5,
    "word": "Good",
    "phonetic": "/ɡʊd/",
    "translation": "İyi (Düzensiz)",
    "exampleEn": "Kotlin provides a much better developer experience than Java.",
    "grammarNote": "",
    "exampleTr": "Kotlin, Java'dan çok daha iyi bir geliştirici deneyimi sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "better (than)",
      "phonetic": "/ˈbet.ər/",
      "translation": "daha iyi"
    },
    "superlative": {
      "form": "the best",
      "phonetic": "/ðə best/",
      "translation": "en iyi"
    },
    "antonym": {
      "word": "bad",
      "phonetic": "/bæd/",
      "translation": "kötü"
    }
  },
  {
    "id": "adj_006",
    "rank": 6,
    "word": "Bad",
    "phonetic": "/bæd/",
    "translation": "Kötü (Düzensiz)",
    "exampleEn": "The server performance was worse than we initially expected.",
    "grammarNote": "",
    "exampleTr": "Sunucu performansı ilk başta beklediğimizden daha kötüydü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "worse (than)",
      "phonetic": "/wɜːs/",
      "translation": "daha kötü"
    },
    "superlative": {
      "form": "the worst",
      "phonetic": "/ðə wɜːst/",
      "translation": "en kötü"
    },
    "antonym": {
      "word": "good",
      "phonetic": "/ɡʊd/",
      "translation": "iyi"
    }
  },
  {
    "id": "adj_007",
    "rank": 7,
    "word": "Easy",
    "phonetic": "/ˈiː.zi/",
    "translation": "Kolay",
    "exampleEn": "It is very easy to deploy containerized applications with Docker.",
    "grammarNote": "",
    "exampleTr": "Docker ile konteynerleştirilmiş uygulamaları dağıtmak çok kolaydır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "easier (than)",
      "phonetic": "/ˈiː.zi.ər/",
      "translation": "daha kolay"
    },
    "superlative": {
      "form": "the easiest",
      "phonetic": "/ðə ˈiː.zi.ɪst/",
      "translation": "en kolay"
    },
    "antonym": {
      "word": "hard / difficult",
      "phonetic": "/hɑːd/",
      "translation": "zor"
    }
  },
  {
    "id": "adj_008",
    "rank": 8,
    "word": "Hard",
    "phonetic": "/hɑːd/",
    "translation": "Zor / Sert",
    "exampleEn": "Debugging asynchronous race conditions is harder than writing UI code.",
    "grammarNote": "",
    "exampleTr": "Eşzamansız yarış koşullarını ayıklamak kullanıcı arayüzü kodu yazmaktan daha zordur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "harder (than)",
      "phonetic": "/ˈhɑː.dər/",
      "translation": "daha zor"
    },
    "superlative": {
      "form": "the hardest",
      "phonetic": "/ðə ˈhɑː.dɪst/",
      "translation": "en zor"
    },
    "antonym": {
      "word": "easy",
      "phonetic": "/ˈiː.zi/",
      "translation": "kolay"
    }
  },
  {
    "id": "adj_009",
    "rank": 9,
    "word": "Cheap",
    "phonetic": "/tʃiːp/",
    "translation": "Ucuz",
    "exampleEn": "Shared hosting is cheaper than dedicated cloud instances.",
    "grammarNote": "",
    "exampleTr": "Paylaşımlı barındırma özel bulut sunucularından daha ucuzdur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cheaper (than)",
      "phonetic": "/ˈtʃiː.pər/",
      "translation": "daha ucuz"
    },
    "superlative": {
      "form": "the cheapest",
      "phonetic": "/ðə ˈtʃiː.pɪst/",
      "translation": "en ucuz"
    },
    "antonym": {
      "word": "expensive",
      "phonetic": "/ɪkˈspen.sɪv/",
      "translation": "pahalı"
    }
  },
  {
    "id": "adj_010",
    "rank": 10,
    "word": "Expensive",
    "phonetic": "/ɪkˈspen.sɪv/",
    "translation": "Pahalı",
    "exampleEn": "Enterprise GPU clusters are the most expensive part of our AI budget.",
    "grammarNote": "",
    "exampleTr": "Kurumsal GPU kümeleri yapay zeka bütçemizin en pahalı kısmıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more expensive (than)",
      "phonetic": "/mɔːr ɪkˈspen.sɪv/",
      "translation": "daha pahalı"
    },
    "superlative": {
      "form": "the most expensive",
      "phonetic": "/ðə məʊst ɪkˈspen.sɪv/",
      "translation": "en pahalı"
    },
    "antonym": {
      "word": "cheap",
      "phonetic": "/tʃiːp/",
      "translation": "ucuz"
    }
  },
  {
    "id": "adj_011",
    "rank": 11,
    "word": "Hot",
    "phonetic": "/hɒt/",
    "translation": "Sıcak",
    "exampleEn": "The server room was getting hotter because the cooling unit failed.",
    "grammarNote": "",
    "exampleTr": "Soğutma ünitesi arızalandığı için sunucu odası giderek ısınıyordu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "hotter (than)",
      "phonetic": "/ˈhɒt.ər/",
      "translation": "daha sıcak"
    },
    "superlative": {
      "form": "the hottest",
      "phonetic": "/ðə ˈhɒt.ɪst/",
      "translation": "en sıcak"
    },
    "antonym": {
      "word": "cold",
      "phonetic": "/kəʊld/",
      "translation": "soğuk"
    }
  },
  {
    "id": "adj_012",
    "rank": 12,
    "word": "Cold",
    "phonetic": "/kəʊld/",
    "translation": "Soğuk",
    "exampleEn": "The weather was very cold and snowy during our trip to Bolu.",
    "grammarNote": "",
    "exampleTr": "Bolu gezimiz sırasında hava çok soğuk ve karlıyıdı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "colder (than)",
      "phonetic": "/ˈkəʊl.dər/",
      "translation": "daha soğuk"
    },
    "superlative": {
      "form": "the coldest",
      "phonetic": "/ðə ˈkəʊl.dɪst/",
      "translation": "en soğuk"
    },
    "antonym": {
      "word": "hot",
      "phonetic": "/hɒt/",
      "translation": "sıcak"
    }
  },
  {
    "id": "adj_013",
    "rank": 13,
    "word": "New",
    "phonetic": "/njuː/",
    "translation": "Yeni",
    "exampleEn": "We are building a new mobile application using Jetpack Compose.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose kullanarak yeni bir mobil uygulama inşa ediyoruz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "newer (than)",
      "phonetic": "/ˈnjuː.ər/",
      "translation": "daha yeni"
    },
    "superlative": {
      "form": "the newest",
      "phonetic": "/ðə ˈnjuː.ɪst/",
      "translation": "en yeni"
    },
    "antonym": {
      "word": "old",
      "phonetic": "/əʊld/",
      "translation": "eski"
    }
  },
  {
    "id": "adj_014",
    "rank": 14,
    "word": "Old",
    "phonetic": "/əʊld/",
    "translation": "Eski / Yaşlı",
    "exampleEn": "We replaced the old monolithic server with microservices.",
    "grammarNote": "",
    "exampleTr": "Eski monolitik sunucuyu mikroservislerle değiştirdik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "older (than)",
      "phonetic": "/ˈəʊl.dər/",
      "translation": "daha eski"
    },
    "superlative": {
      "form": "the oldest",
      "phonetic": "/ðə ˈəʊl.dɪst/",
      "translation": "en eski"
    },
    "antonym": {
      "word": "new / young",
      "phonetic": "/njuː/",
      "translation": "yeni / genç"
    }
  },
  {
    "id": "adj_015",
    "rank": 15,
    "word": "Young",
    "phonetic": "/jʌŋ/",
    "translation": "Genç",
    "exampleEn": "Our university tech community consists of talented young developers.",
    "grammarNote": "",
    "exampleTr": "Üniversite teknoloji topluluğumuz yetenekli genç geliştiricilerden oluşmaktadır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "younger (than)",
      "phonetic": "/ˈjʌŋ.ɡər/",
      "translation": "daha genç"
    },
    "superlative": {
      "form": "the youngest",
      "phonetic": "/ðə ˈjʌŋ.ɡɪst/",
      "translation": "en genç"
    },
    "antonym": {
      "word": "old",
      "phonetic": "/əʊld/",
      "translation": "yaşlı"
    }
  },
  {
    "id": "adj_016",
    "rank": 16,
    "word": "Clean",
    "phonetic": "/kliːn/",
    "translation": "Temiz",
    "exampleEn": "I always write clean, modular, and readable code.",
    "grammarNote": "",
    "exampleTr": "Her zaman temiz, modüler ve okunabilir kod yazarım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cleaner (than)",
      "phonetic": "/ˈkliː.nər/",
      "translation": "daha temiz"
    },
    "superlative": {
      "form": "the cleanest",
      "phonetic": "/ðə ˈkliː.nɪst/",
      "translation": "en temiz"
    },
    "antonym": {
      "word": "dirty",
      "phonetic": "/ˈdɜː.ti/",
      "translation": "kirli"
    }
  },
  {
    "id": "adj_017",
    "rank": 17,
    "word": "Dirty",
    "phonetic": "/ˈdɜː.ti/",
    "translation": "Kirli",
    "exampleEn": "The raw dataset was too dirty and required extensive preprocessing.",
    "grammarNote": "",
    "exampleTr": "Ham veri seti çok kirliydi ve kapsamlı ön işleme gerektiriyordu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "dirtier (than)",
      "phonetic": "/ˈdɜː.ti.ər/",
      "translation": "daha kirli"
    },
    "superlative": {
      "form": "the dirtiest",
      "phonetic": "/ðə ˈdɜː.ti.ɪst/",
      "translation": "en kirli"
    },
    "antonym": {
      "word": "clean",
      "phonetic": "/kliːn/",
      "translation": "temiz"
    }
  },
  {
    "id": "adj_018",
    "rank": 18,
    "word": "Safe",
    "phonetic": "/seɪf/",
    "translation": "Güvenli",
    "exampleEn": "Storing passwords with bcrypt hashing is safer than plain text.",
    "grammarNote": "",
    "exampleTr": "Şifreleri bcrypt ile hashleyerek saklamak düz metinden daha güvenlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "safer (than)",
      "phonetic": "/ˈseɪ.fər/",
      "translation": "daha güvenli"
    },
    "superlative": {
      "form": "the safest",
      "phonetic": "/ðə ˈseɪ.fɪst/",
      "translation": "en güvenli"
    },
    "antonym": {
      "word": "dangerous",
      "phonetic": "/ˈdeɪn.dʒər.əs/",
      "translation": "tehlikeli"
    }
  },
  {
    "id": "adj_019",
    "rank": 19,
    "word": "Dangerous",
    "phonetic": "/ˈdeɪn.dʒər.əs/",
    "translation": "Tehlikeli",
    "exampleEn": "Running untested scripts directly in production is dangerous.",
    "grammarNote": "",
    "exampleTr": "Test edilmemiş betikleri doğrudan canlı ortamda çalıştırmak tehlikelidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dangerous (than)",
      "phonetic": "/mɔːr ˈdeɪn.dʒər.əs/",
      "translation": "daha tehlikeli"
    },
    "superlative": {
      "form": "the most dangerous",
      "phonetic": "/ðə məʊst ˈdeɪn.dʒər.əs/",
      "translation": "en tehlikeli"
    },
    "antonym": {
      "word": "safe",
      "phonetic": "/seɪf/",
      "translation": "güvenli"
    }
  },
  {
    "id": "adj_020",
    "rank": 20,
    "word": "Simple",
    "phonetic": "/ˈsɪm.pəl/",
    "translation": "Basit / Sade",
    "exampleEn": "Keep the user interface design simple and intuitive.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı arayüzü tasarımını basit ve sezgisel tutun.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "simpler (than)",
      "phonetic": "/ˈsɪm.plər/",
      "translation": "daha basit"
    },
    "superlative": {
      "form": "the simplest",
      "phonetic": "/ðə ˈsɪm.plɪst/",
      "translation": "en basit"
    },
    "antonym": {
      "word": "complex / complicated",
      "phonetic": "/ˈkɒm.pleks/",
      "translation": "karmaşık"
    }
  },
  {
    "id": "adj_021",
    "rank": 21,
    "word": "Complex",
    "phonetic": "/ˈkɒm.pleks/",
    "translation": "Karmaşık",
    "exampleEn": "This neural network solves complex computer vision problems.",
    "grammarNote": "",
    "exampleTr": "Bu yapay sinir ağı karmaşık bilgisayarlı görü problemlerini çözer.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more complex (than)",
      "phonetic": "/mɔːr ˈkɒm.pleks/",
      "translation": "daha karmaşık"
    },
    "superlative": {
      "form": "the most complex",
      "phonetic": "/ðə məʊst ˈkɒm.pleks/",
      "translation": "en karmaşık"
    },
    "antonym": {
      "word": "simple",
      "phonetic": "/ˈsɪm.pəl/",
      "translation": "basit"
    }
  },
  {
    "id": "adj_022",
    "rank": 22,
    "word": "Strong",
    "phonetic": "/strɒŋ/",
    "translation": "Güçlü",
    "exampleEn": "You must choose a strong password containing numbers and symbols.",
    "grammarNote": "",
    "exampleTr": "Rakamlar ve semboller içeren güçlü bir şifre seçmelisiniz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "stronger (than)",
      "phonetic": "/ˈstrɒŋ.ɡər/",
      "translation": "daha güçlü"
    },
    "superlative": {
      "form": "the strongest",
      "phonetic": "/ðə ˈstrɒŋ.ɡɪst/",
      "translation": "en güçlü"
    },
    "antonym": {
      "word": "weak",
      "phonetic": "/wiːk/",
      "translation": "zayıf"
    }
  },
  {
    "id": "adj_023",
    "rank": 23,
    "word": "Weak",
    "phonetic": "/wiːk/",
    "translation": "Zayıf / Güçsüz",
    "exampleEn": "The wireless network signal was too weak on the upper floor.",
    "grammarNote": "",
    "exampleTr": "Üst katta kablosuz ağ sinyali aşırı zayıftı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "weaker (than)",
      "phonetic": "/ˈwiː.kər/",
      "translation": "daha zayıf"
    },
    "superlative": {
      "form": "the weakest",
      "phonetic": "/ðə ˈwiː.kɪst/",
      "translation": "en zayıf"
    },
    "antonym": {
      "word": "strong",
      "phonetic": "/strɒŋ/",
      "translation": "güçlü"
    }
  },
  {
    "id": "adj_024",
    "rank": 24,
    "word": "Heavy",
    "phonetic": "/ˈhev.i/",
    "translation": "Ağır / Yoğun",
    "exampleEn": "The web server handled heavy traffic during the flash sale.",
    "grammarNote": "",
    "exampleTr": "Web sunucusu hızlı indirim satışı sırasında yoğun trafiği yönetti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "heavier (than)",
      "phonetic": "/ˈhev.i.ər/",
      "translation": "daha ağır"
    },
    "superlative": {
      "form": "the heaviest",
      "phonetic": "/ðə ˈhev.i.ɪst/",
      "translation": "en ağır"
    },
    "antonym": {
      "word": "light",
      "phonetic": "/laɪt/",
      "translation": "hafif"
    }
  },
  {
    "id": "adj_025",
    "rank": 25,
    "word": "Light",
    "phonetic": "/laɪt/",
    "translation": "Hafif / Açık Renk",
    "exampleEn": "My new ultrabook laptop is light and easy to carry.",
    "grammarNote": "",
    "exampleTr": "Yeni ultrabook dizüstü bilgisayarım hafiftir ve taşıması kolaydır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "lighter (than)",
      "phonetic": "/ˈlaɪ.tər/",
      "translation": "daha hafif"
    },
    "superlative": {
      "form": "the lightest",
      "phonetic": "/ðə ˈlaɪ.tɪst/",
      "translation": "en hafif"
    },
    "antonym": {
      "word": "heavy / dark",
      "phonetic": "/ˈhev.i/",
      "translation": "ağır / koyu"
    }
  },
  {
    "id": "adj_026",
    "rank": 26,
    "word": "Dark",
    "phonetic": "/dɑːk/",
    "translation": "Karanlık / Koyu",
    "exampleEn": "I prefer using dark mode in my IDE to reduce eye fatigue.",
    "grammarNote": "",
    "exampleTr": "Göz yorgunluğunu azaltmak için IDE'mde koyu modu kullanmayı tercih ederim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "darker (than)",
      "phonetic": "/ˈdɑː.kər/",
      "translation": "daha karanlık"
    },
    "superlative": {
      "form": "the darkest",
      "phonetic": "/ðə ˈdɑː.kɪst/",
      "translation": "en karanlık"
    },
    "antonym": {
      "word": "light / bright",
      "phonetic": "/laɪt/",
      "translation": "açık / parlak"
    }
  },
  {
    "id": "adj_027",
    "rank": 27,
    "word": "Bright",
    "phonetic": "/braɪt/",
    "translation": "Parlak / Aydınlık",
    "exampleEn": "The room has a large window that lets in bright natural light.",
    "grammarNote": "",
    "exampleTr": "Oda parlak doğal ışık alan büyük bir pencereye sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "brighter (than)",
      "phonetic": "/ˈbraɪ.tər/",
      "translation": "daha parlak"
    },
    "superlative": {
      "form": "the brightest",
      "phonetic": "/ðə ˈbraɪ.tɪst/",
      "translation": "en parlak"
    },
    "antonym": {
      "word": "dark / dim",
      "phonetic": "/dɑːk/",
      "translation": "karanlık / loş"
    }
  },
  {
    "id": "adj_028",
    "rank": 28,
    "word": "Happy",
    "phonetic": "/ˈhæp.i/",
    "translation": "Mutlu",
    "exampleEn": "The development team was very happy with the project outcome.",
    "grammarNote": "",
    "exampleTr": "Geliştirme ekibi proje sonucundan oldukça mutluydu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "happier (than)",
      "phonetic": "/ˈhæp.i.ər/",
      "translation": "daha mutlu"
    },
    "superlative": {
      "form": "the happiest",
      "phonetic": "/ðə ˈhæp.i.ɪst/",
      "translation": "en mutlu"
    },
    "antonym": {
      "word": "sad",
      "phonetic": "/sæd/",
      "translation": "üzgün"
    }
  },
  {
    "id": "adj_029",
    "rank": 29,
    "word": "Sad",
    "phonetic": "/sæd/",
    "translation": "Üzgün",
    "exampleEn": "He was sad because his favorite open-source project was archived.",
    "grammarNote": "",
    "exampleTr": "En sevdiği açık kaynaklı proje arşivlendiği için üzgündü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "sadder (than)",
      "phonetic": "/ˈsæd.ər/",
      "translation": "daha üzgün"
    },
    "superlative": {
      "form": "the saddest",
      "phonetic": "/ðə ˈsæd.ɪst/",
      "translation": "en üzgün"
    },
    "antonym": {
      "word": "happy",
      "phonetic": "/ˈhæp.i/",
      "translation": "mutlu"
    }
  },
  {
    "id": "adj_030",
    "rank": 30,
    "word": "Rich",
    "phonetic": "/rɪtʃ/",
    "translation": "Zengin / Kapsamlı",
    "exampleEn": "The API provides rich metadata for real-time analytics.",
    "grammarNote": "",
    "exampleTr": "API gerçek zamanlı analizler için zengin meta veriler sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "richer (than)",
      "phonetic": "/ˈrɪtʃ.ər/",
      "translation": "daha zengin"
    },
    "superlative": {
      "form": "the richest",
      "phonetic": "/ðə ˈrɪtʃ.ɪst/",
      "translation": "en zengin"
    },
    "antonym": {
      "word": "poor",
      "phonetic": "/pɔːr/",
      "translation": "fakir / yetersiz"
    }
  },
  {
    "id": "adj_031",
    "rank": 31,
    "word": "Poor",
    "phonetic": "/pɔːr/",
    "translation": "Fakir / Yetersiz",
    "exampleEn": "Poor network bandwidth caused video playback buffering.",
    "grammarNote": "",
    "exampleTr": "Yetersiz ağ bant genişliği video oynatmada arabelleğe almaya (buffering) yol açtı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "poorer (than)",
      "phonetic": "/ˈpɔː.rər/",
      "translation": "daha yetersiz"
    },
    "superlative": {
      "form": "the poorest",
      "phonetic": "/ðə ˈpɔː.rɪst/",
      "translation": "en yetersiz"
    },
    "antonym": {
      "word": "rich / good",
      "phonetic": "/rɪtʃ/",
      "translation": "zengin / iyi"
    }
  },
  {
    "id": "adj_032",
    "rank": 32,
    "word": "Beautiful",
    "phonetic": "/ˈbjuː.tɪ.fəl/",
    "translation": "Güzel",
    "exampleEn": "The designer created a beautiful and clean UI dashboard.",
    "grammarNote": "",
    "exampleTr": "Tasarımcı güzel ve temiz bir kullanıcı arayüzü kontrol paneli oluşturdu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more beautiful (than)",
      "phonetic": "/mɔːr ˈbjuː.tɪ.fəl/",
      "translation": "daha güzel"
    },
    "superlative": {
      "form": "the most beautiful",
      "phonetic": "/ðə məʊst ˈbjuː.tɪ.fəl/",
      "translation": "en güzel"
    },
    "antonym": {
      "word": "ugly",
      "phonetic": "/ˈʌɡ.li/",
      "translation": "çirkin"
    }
  },
  {
    "id": "adj_033",
    "rank": 33,
    "word": "Ugly",
    "phonetic": "/ˈʌɡ.li/",
    "translation": "Çirkin / Düzensiz",
    "exampleEn": "The legacy code was ugly and hard to read before refactoring.",
    "grammarNote": "",
    "exampleTr": "Eski kod yeniden düzenlemeden önce çirkin ve okunması zordu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "uglier (than)",
      "phonetic": "/ˈʌɡ.li.ər/",
      "translation": "daha çirkin"
    },
    "superlative": {
      "form": "the ugliest",
      "phonetic": "/ðə ˈʌɡ.li.ɪst/",
      "translation": "en çirkin"
    },
    "antonym": {
      "word": "beautiful",
      "phonetic": "/ˈbjuː.tɪ.fəl/",
      "translation": "güzel"
    }
  },
  {
    "id": "adj_034",
    "rank": 34,
    "word": "Quiet",
    "phonetic": "/ˈkwaɪ.ət/",
    "translation": "Sessiz / Sakin",
    "exampleEn": "I work best in a quiet office environment without interruptions.",
    "grammarNote": "",
    "exampleTr": "En iyi şekilde kesintilerin olmadığı sessiz bir ofis ortamında çalışırım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "quieter (than)",
      "phonetic": "/ˈkwaɪ.ə.tər/",
      "translation": "daha sessiz"
    },
    "superlative": {
      "form": "the quietest",
      "phonetic": "/ðə ˈkwaɪ.ə.tɪst/",
      "translation": "en sessiz"
    },
    "antonym": {
      "word": "loud / noisy",
      "phonetic": "/laʊd/",
      "translation": "gürültülü"
    }
  },
  {
    "id": "adj_035",
    "rank": 35,
    "word": "Loud",
    "phonetic": "/laʊd/",
    "translation": "Gürültülü / Yüksek Sesli",
    "exampleEn": "The server cooling fan was making a loud noise last night.",
    "grammarNote": "",
    "exampleTr": "Sunucu soğutma fanı dün gece yüksek bir ses çıkarıyordu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "louder (than)",
      "phonetic": "/ˈlaʊ.dər/",
      "translation": "daha yüksek sesli"
    },
    "superlative": {
      "form": "the loudest",
      "phonetic": "/ðə ˈlaʊ.dɪst/",
      "translation": "en yüksek sesli"
    },
    "antonym": {
      "word": "quiet",
      "phonetic": "/ˈkwaɪ.ət/",
      "translation": "sessiz"
    }
  },
  {
    "id": "adj_036",
    "rank": 36,
    "word": "High",
    "phonetic": "/haɪ/",
    "translation": "Yüksek",
    "exampleEn": "Our primary server achieved high throughput under peak traffic.",
    "grammarNote": "",
    "exampleTr": "Birincil sunucumuz yoğun trafik altında yüksek işlem hacmine ulaştı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "higher (than)",
      "phonetic": "/ˈhaɪ.ər/",
      "translation": "daha yüksek"
    },
    "superlative": {
      "form": "the highest",
      "phonetic": "/ðə ˈhaɪ.ɪst/",
      "translation": "en yüksek"
    },
    "antonym": {
      "word": "low",
      "phonetic": "/ləʊ/",
      "translation": "düşük"
    }
  },
  {
    "id": "adj_037",
    "rank": 37,
    "word": "Low",
    "phonetic": "/ləʊ/",
    "translation": "Düşük / Alçak",
    "exampleEn": "Redis delivers sub-millisecond low latency for cached queries.",
    "grammarNote": "",
    "exampleTr": "Redis önbelleğe alınmış sorgular için milisaniye altı düşük gecikme sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "lower (than)",
      "phonetic": "/ˈləʊ.ər/",
      "translation": "daha düşük"
    },
    "superlative": {
      "form": "the lowest",
      "phonetic": "/ðə ˈləʊ.ɪst/",
      "translation": "en düşük"
    },
    "antonym": {
      "word": "high",
      "phonetic": "/haɪ/",
      "translation": "yüksek"
    }
  },
  {
    "id": "adj_038",
    "rank": 38,
    "word": "Tall",
    "phonetic": "/tɔːl/",
    "translation": "Uzun Boylu / Yüksek",
    "exampleEn": "The company headquarters is in a tall modern skyscraper.",
    "grammarNote": "",
    "exampleTr": "Şirket genel merkezi uzun modern bir gökdelendedir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "taller (than)",
      "phonetic": "/ˈtɔː.lər/",
      "translation": "daha uzun"
    },
    "superlative": {
      "form": "the tallest",
      "phonetic": "/ðə ˈtɔː.lɪst/",
      "translation": "en uzun"
    },
    "antonym": {
      "word": "short",
      "phonetic": "/ʃɔːt/",
      "translation": "kısa"
    }
  },
  {
    "id": "adj_039",
    "rank": 39,
    "word": "Short",
    "phonetic": "/ʃɔːt/",
    "translation": "Kısa",
    "exampleEn": "We held a short standup meeting to align on sprint goals.",
    "grammarNote": "",
    "exampleTr": "Sprint hedeflerinde hizalanmak için kısa bir durum toplantısı yaptık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "shorter (than)",
      "phonetic": "/ˈʃɔː.tər/",
      "translation": "daha kısa"
    },
    "superlative": {
      "form": "the shortest",
      "phonetic": "/ðə ˈʃɔː.tɪst/",
      "translation": "en kısa"
    },
    "antonym": {
      "word": "long / tall",
      "phonetic": "/lɒŋ/",
      "translation": "uzun"
    }
  },
  {
    "id": "adj_040",
    "rank": 40,
    "word": "Long",
    "phonetic": "/lɒŋ/",
    "translation": "Uzun (Süre / Boyut)",
    "exampleEn": "The database migration took a long time because the tables were massive.",
    "grammarNote": "",
    "exampleTr": "Tablolar devasa olduğu için veritabanı taşıması uzun bir zaman aldı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "longer (than)",
      "phonetic": "/ˈlɒŋ.ɡər/",
      "translation": "daha uzun"
    },
    "superlative": {
      "form": "the longest",
      "phonetic": "/ðə ˈlɒŋ.ɡɪst/",
      "translation": "en uzun"
    },
    "antonym": {
      "word": "short",
      "phonetic": "/ʃɔːt/",
      "translation": "kısa"
    }
  },
  {
    "id": "adj_041",
    "rank": 41,
    "word": "Full",
    "phonetic": "/fʊl/",
    "translation": "Dolu / Tam",
    "exampleEn": "The storage disk is almost full; we must archive old logs.",
    "grammarNote": "",
    "exampleTr": "Depolama diski neredeyse dolu; eski günlükleri arşivlemeliyiz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fuller (than)",
      "phonetic": "/ˈfʊl.ər/",
      "translation": "daha dolu"
    },
    "superlative": {
      "form": "the fullest",
      "phonetic": "/ðə ˈfʊl.ɪst/",
      "translation": "en dolu"
    },
    "antonym": {
      "word": "empty",
      "phonetic": "/ˈemp.ti/",
      "translation": "boş"
    }
  },
  {
    "id": "adj_042",
    "rank": 42,
    "word": "Empty",
    "phonetic": "/ˈemp.ti/",
    "translation": "Boş",
    "exampleEn": "The search result list was empty because no records matched.",
    "grammarNote": "",
    "exampleTr": "Hiçbir kayıt eşleşmediği için arama sonuç listesi boştu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "emptier (than)",
      "phonetic": "/ˈemp.ti.ər/",
      "translation": "daha boş"
    },
    "superlative": {
      "form": "the emptiest",
      "phonetic": "/ðə ˈemp.ti.ɪst/",
      "translation": "en boş"
    },
    "antonym": {
      "word": "full",
      "phonetic": "/fʊl/",
      "translation": "dolu"
    }
  },
  {
    "id": "adj_043",
    "rank": 43,
    "word": "Early",
    "phonetic": "/ˈɜː.li/",
    "translation": "Erken",
    "exampleEn": "I arrived early at the conference center to set up my demo.",
    "grammarNote": "",
    "exampleTr": "Demomu kurmak için konferans merkezine erken vardım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "earlier (than)",
      "phonetic": "/ˈɜː.li.ər/",
      "translation": "daha erken"
    },
    "superlative": {
      "form": "the earliest",
      "phonetic": "/ðə ˈɜː.li.ɪst/",
      "translation": "en erken"
    },
    "antonym": {
      "word": "late",
      "phonetic": "/leɪt/",
      "translation": "geç"
    }
  },
  {
    "id": "adj_044",
    "rank": 44,
    "word": "Late",
    "phonetic": "/leɪt/",
    "translation": "Geç",
    "exampleEn": "I worked late yesterday to deploy the emergency hotfix.",
    "grammarNote": "",
    "exampleTr": "Acil yamayı dağıtmak için dün geç saatlere kadar çalıştım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "later (than)",
      "phonetic": "/ˈleɪ.tər/",
      "translation": "daha geç"
    },
    "superlative": {
      "form": "the latest (en son)",
      "phonetic": "/ðə ˈleɪ.tɪst/",
      "translation": "en geç / en son"
    },
    "antonym": {
      "word": "early",
      "phonetic": "/ˈɜː.li/",
      "translation": "erken"
    }
  },
  {
    "id": "adj_045",
    "rank": 45,
    "word": "Busy",
    "phonetic": "/ˈbɪz.i/",
    "translation": "Meşgul / Yoğun",
    "exampleEn": "The engineering team is very busy preparing for the product launch.",
    "grammarNote": "",
    "exampleTr": "Mühendislik ekibi ürün lansmanına hazırlanmakla çok meşguldür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "busier (than)",
      "phonetic": "/ˈbɪz.i.ər/",
      "translation": "daha meşgul"
    },
    "superlative": {
      "form": "the busiest",
      "phonetic": "/ðə ˈbɪz.i.ɪst/",
      "translation": "en meşgul"
    },
    "antonym": {
      "word": "free / available",
      "phonetic": "/friː/",
      "translation": "müsait / boş"
    }
  },
  {
    "id": "adj_046",
    "rank": 46,
    "word": "Free",
    "phonetic": "/friː/",
    "translation": "Müsait / Ücretsiz",
    "exampleEn": "Are you free for a quick code review call this afternoon?",
    "grammarNote": "",
    "exampleTr": "Bugün öğleden sonra hızlı bir kod inceleme görüşmesi için müsait misiniz?",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "freer (than)",
      "phonetic": "/ˈfriː.ər/",
      "translation": "daha serbest"
    },
    "superlative": {
      "form": "the freest",
      "phonetic": "/ðə ˈfriː.ɪst/",
      "translation": "en özgür / ücretsiz"
    },
    "antonym": {
      "word": "busy / paid",
      "phonetic": "/ˈbɪz.i/",
      "translation": "meşgul / ücretli"
    }
  },
  {
    "id": "adj_047",
    "rank": 47,
    "word": "Important",
    "phonetic": "/ɪmˈpɔː.tənt/",
    "translation": "Önemli",
    "exampleEn": "Data security is the most important requirement for banking software.",
    "grammarNote": "",
    "exampleTr": "Veri güvenliği bankacılık yazılımları için en önemli gereksinimdir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more important (than)",
      "phonetic": "/mɔːr ɪmˈpɔː.tənt/",
      "translation": "daha önemli"
    },
    "superlative": {
      "form": "the most important",
      "phonetic": "/ðə məʊst ɪmˈpɔː.tənt/",
      "translation": "en önemli"
    },
    "antonym": {
      "word": "unimportant",
      "phonetic": "/ˌʌn.ɪmˈpɔː.tənt/",
      "translation": "önemsiz"
    }
  },
  {
    "id": "adj_048",
    "rank": 48,
    "word": "Useful",
    "phonetic": "/ˈjuːs.fəl/",
    "translation": "Faydalı / Kullanışlı",
    "exampleEn": "This open-source debugging tool is extremely useful for developers.",
    "grammarNote": "",
    "exampleTr": "Bu açık kaynaklı hata ayıklama aracı geliştiriciler için son derece faydalıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more useful (than)",
      "phonetic": "/mɔːr ˈjuːs.fəl/",
      "translation": "daha faydalı"
    },
    "superlative": {
      "form": "the most useful",
      "phonetic": "/ðə məʊst ˈjuːs.fəl/",
      "translation": "en faydalı"
    },
    "antonym": {
      "word": "useless",
      "phonetic": "/ˈjuːs.ləs/",
      "translation": "faydasız"
    }
  },
  {
    "id": "adj_049",
    "rank": 49,
    "word": "Reliable",
    "phonetic": "/rɪˈlaɪ.ə.bəl/",
    "translation": "Güvenilir",
    "exampleEn": "PostgreSQL is one of the most reliable relational database engines.",
    "grammarNote": "",
    "exampleTr": "PostgreSQL en güvenilir ilişkisel veritabanı motorlarından biridir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more reliable (than)",
      "phonetic": "/mɔːr rɪˈlaɪ.ə.bəl/",
      "translation": "daha güvenilir"
    },
    "superlative": {
      "form": "the most reliable",
      "phonetic": "/ðə məʊst rɪˈlaɪ.ə.bəl/",
      "translation": "en güvenilir"
    },
    "antonym": {
      "word": "unreliable",
      "phonetic": "/ˌʌn.rɪˈlaɪ.ə.bəl/",
      "translation": "güvenilmez"
    }
  },
  {
    "id": "adj_050",
    "rank": 50,
    "word": "Secure",
    "phonetic": "/sɪˈkjʊər/",
    "translation": "Güvenli / Korumalı",
    "exampleEn": "All API communication is secured via end-to-end TLS encryption.",
    "grammarNote": "",
    "exampleTr": "Tüm API iletişimi uçtan uca TLS şifrelemesi ile güvenli hale getirilmiştir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more secure (than)",
      "phonetic": "/mɔːr sɪˈkjʊər/",
      "translation": "daha güvenli"
    },
    "superlative": {
      "form": "the most secure",
      "phonetic": "/ðə məʊst sɪˈkjʊər/",
      "translation": "en güvenli"
    },
    "antonym": {
      "word": "insecure",
      "phonetic": "/ˌɪn.sɪˈkjʊər/",
      "translation": "güvensiz"
    }
  },
  {
    "id": "adj_051",
    "rank": 51,
    "word": "Ready",
    "phonetic": "/ˈred.i/",
    "translation": "Hazır",
    "exampleEn": "The new software release is ready for production deployment.",
    "grammarNote": "",
    "exampleTr": "Yeni yazılım sürümü canlı ortam dağıtımı için hazırdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "readier (than)",
      "phonetic": "/ˈred.i.ər/",
      "translation": "daha hazır"
    },
    "superlative": {
      "form": "the readiest",
      "phonetic": "/ðə ˈred.i.ɪst/",
      "translation": "en hazır"
    },
    "antonym": {
      "word": "unprepared",
      "phonetic": "/ˌʌn.prɪˈpeəd/",
      "translation": "hazırlıksız"
    }
  },
  {
    "id": "adj_052",
    "rank": 52,
    "word": "Clear",
    "phonetic": "/klɪər/",
    "translation": "Açık / Net",
    "exampleEn": "The technical documentation provides clear step-by-step instructions.",
    "grammarNote": "",
    "exampleTr": "Teknik dokümantasyon net adım adım talimatlar sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "clearer (than)",
      "phonetic": "/ˈklɪə.rər/",
      "translation": "daha net"
    },
    "superlative": {
      "form": "the clearest",
      "phonetic": "/ðə ˈklɪə.rɪst/",
      "translation": "en net"
    },
    "antonym": {
      "word": "unclear",
      "phonetic": "/ʌnˈklɪər/",
      "translation": "belirsiz"
    }
  },
  {
    "id": "adj_053",
    "rank": 53,
    "word": "Correct",
    "phonetic": "/kəˈrekt/",
    "translation": "Doğru",
    "exampleEn": "Please ensure that your email address is correct before submitting.",
    "grammarNote": "",
    "exampleTr": "Göndermeden önce lütfen e-posta adresinizin doğru olduğundan emin olun.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more correct (than)",
      "phonetic": "/mɔːr kəˈrekt/",
      "translation": "daha doğru"
    },
    "superlative": {
      "form": "the most correct",
      "phonetic": "/ðə məʊst kəˈrekt/",
      "translation": "en doğru"
    },
    "antonym": {
      "word": "wrong / incorrect",
      "phonetic": "/rɒŋ/",
      "translation": "yanlış"
    }
  },
  {
    "id": "adj_054",
    "rank": 54,
    "word": "Wrong",
    "phonetic": "/rɒŋ/",
    "translation": "Yanlış / Hatalı",
    "exampleEn": "The server returned a 401 error because the API token was wrong.",
    "grammarNote": "",
    "exampleTr": "API belirteci yanlış olduğu için sunucu 401 hatası döndürdü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more wrong (than)",
      "phonetic": "/mɔːr rɒŋ/",
      "translation": "daha yanlış"
    },
    "superlative": {
      "form": "the most wrong",
      "phonetic": "/ðə məʊst rɒŋ/",
      "translation": "en yanlış"
    },
    "antonym": {
      "word": "correct / right",
      "phonetic": "/kəˈrekt/",
      "translation": "doğru"
    }
  },
  {
    "id": "adj_055",
    "rank": 55,
    "word": "True",
    "phonetic": "/truː/",
    "translation": "Gerçek / Doğru (Boolean)",
    "exampleEn": "The function returns true when the user authentication succeeds.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı kimlik doğrulaması başarılı olduğunda fonksiyon true (doğru) döndürür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "truer (than)",
      "phonetic": "/ˈtruː.ər/",
      "translation": "daha doğru"
    },
    "superlative": {
      "form": "the truest",
      "phonetic": "/ðə ˈtruː.ɪst/",
      "translation": "en doğru"
    },
    "antonym": {
      "word": "false",
      "phonetic": "/fɔːls/",
      "translation": "yanlış"
    }
  },
  {
    "id": "adj_056",
    "rank": 56,
    "word": "False",
    "phonetic": "/fɔːls/",
    "translation": "Sahte / Yanlış (Boolean)",
    "exampleEn": "If the password does not match, the validation check returns false.",
    "grammarNote": "",
    "exampleTr": "Şifre eşleşmezse doğrulama kontrolü false (yanlış) döndürür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "falser (than)",
      "phonetic": "/mɔːr fɔːls/",
      "translation": "daha yanlış"
    },
    "superlative": {
      "form": "the falsest",
      "phonetic": "/ðə məʊst fɔːls/",
      "translation": "en yanlış"
    },
    "antonym": {
      "word": "true",
      "phonetic": "/truː/",
      "translation": "doğru"
    }
  },
  {
    "id": "adj_057",
    "rank": 57,
    "word": "Real",
    "phonetic": "/rɪəl/",
    "translation": "Gerçek / Hakiki",
    "exampleEn": "We tested the vehicle detection algorithm on real highway camera feeds.",
    "grammarNote": "",
    "exampleTr": "Araç tespit algoritmasını gerçek otoyol kamera akışlarında test ettik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more real (than)",
      "phonetic": "/mɔːr rɪəl/",
      "translation": "daha gerçek"
    },
    "superlative": {
      "form": "the most real",
      "phonetic": "/ðə məʊst rɪəl/",
      "translation": "en gerçek"
    },
    "antonym": {
      "word": "fake / artificial",
      "phonetic": "/feɪk/",
      "translation": "sahte / yapay"
    }
  },
  {
    "id": "adj_058",
    "rank": 58,
    "word": "Fake",
    "phonetic": "/feɪk/",
    "translation": "Sahte / Yapay",
    "exampleEn": "Our deep learning thesis project detects fake manipulated videos.",
    "grammarNote": "",
    "exampleTr": "Derin öğrenme tez projemiz sahte manipüle edilmiş videoları tespit eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "faker (than)",
      "phonetic": "/ˈfeɪ.kər/",
      "translation": "daha sahte"
    },
    "superlative": {
      "form": "the fakest",
      "phonetic": "/ðə ˈfeɪ.kɪst/",
      "translation": "en sahte"
    },
    "antonym": {
      "word": "real / authentic",
      "phonetic": "/rɪəl/",
      "translation": "gerçek"
    }
  },
  {
    "id": "adj_059",
    "rank": 59,
    "word": "Natural",
    "phonetic": "/ˈnætʃ.ər.əl/",
    "translation": "Doğal",
    "exampleEn": "The text-to-speech engine produces very natural English voices.",
    "grammarNote": "",
    "exampleTr": "Metinden sese dönüştürme motoru çok doğal İngilizce sesler üretir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more natural (than)",
      "phonetic": "/mɔːr ˈnætʃ.ər.əl/",
      "translation": "daha doğal"
    },
    "superlative": {
      "form": "the most natural",
      "phonetic": "/ðə məʊst ˈnætʃ.ər.əl/",
      "translation": "en doğal"
    },
    "antonym": {
      "word": "artificial",
      "phonetic": "/ˌɑː.tɪˈfɪʃ.əl/",
      "translation": "yapay"
    }
  },
  {
    "id": "adj_060",
    "rank": 60,
    "word": "Possible",
    "phonetic": "/ˈpɒs.ə.bəl/",
    "translation": "Mümkün",
    "exampleEn": "It is possible to optimize this SQL query by adding a composite index.",
    "grammarNote": "",
    "exampleTr": "Birleşik bir indeks ekleyerek bu SQL sorgusunu optimize etmek mümkündür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more possible (than)",
      "phonetic": "/mɔːr ˈpɒs.ə.bəl/",
      "translation": "daha mümkün"
    },
    "superlative": {
      "form": "the most possible",
      "phonetic": "/ðə məʊst ˈpɒs.ə.bəl/",
      "translation": "en mümkün"
    },
    "antonym": {
      "word": "impossible",
      "phonetic": "/ɪmˈpɒs.ə.bəl/",
      "translation": "imkânsız"
    }
  },
  {
    "id": "adj_061",
    "rank": 61,
    "word": "Impossible",
    "phonetic": "/ɪmˈpɒs.ə.bəl/",
    "translation": "İmkânsız",
    "exampleEn": "It is impossible to access the private database without an authorized VPN.",
    "grammarNote": "",
    "exampleTr": "Yetkili bir VPN olmadan özel veritabanına erişmek imkânsızdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more impossible (than)",
      "phonetic": "/mɔːr ɪmˈpɒs.ə.bəl/",
      "translation": "daha imkânsız"
    },
    "superlative": {
      "form": "the most impossible",
      "phonetic": "/ðə məʊst ɪmˈpɒs.ə.bəl/",
      "translation": "en imkânsız"
    },
    "antonym": {
      "word": "possible",
      "phonetic": "/ˈpɒs.ə.bəl/",
      "translation": "mümkün"
    }
  },
  {
    "id": "adj_062",
    "rank": 62,
    "word": "Friendly",
    "phonetic": "/ˈfrend.li/",
    "translation": "Samimi / Dostane",
    "exampleEn": "Our developer community has a friendly and welcoming culture.",
    "grammarNote": "",
    "exampleTr": "Geliştirici topluluğumuz samimi ve kucaklayıcı bir kültüre sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "friendlier (than)",
      "phonetic": "/ˈfrend.li.ər/",
      "translation": "daha samimi"
    },
    "superlative": {
      "form": "the friendliest",
      "phonetic": "/ðə ˈfrend.li.ɪst/",
      "translation": "en samimi"
    },
    "antonym": {
      "word": "unfriendly",
      "phonetic": "/ʌnˈfrend.li/",
      "translation": "soğuk"
    }
  },
  {
    "id": "adj_063",
    "rank": 63,
    "word": "Polite",
    "phonetic": "/pəˈlaɪt/",
    "translation": "Kibar / Nazik",
    "exampleEn": "Always use polite phrasing when communicating with foreign clients.",
    "grammarNote": "",
    "exampleTr": "Yabancı müşterilerle iletişim kurarken her zaman kibar ifadeler kullanın.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more polite (than)",
      "phonetic": "/pəˈlaɪ.tər/",
      "translation": "daha kibar"
    },
    "superlative": {
      "form": "the most polite",
      "phonetic": "/ðə pəˈlaɪ.tɪst/",
      "translation": "en kibar"
    },
    "antonym": {
      "word": "impolite / rude",
      "phonetic": "/ˌɪm.pəˈlaɪt/",
      "translation": "kaba"
    }
  },
  {
    "id": "adj_064",
    "rank": 64,
    "word": "Rude",
    "phonetic": "/ruːd/",
    "translation": "Kaba",
    "exampleEn": "Unprofessional and rude comments are strictly prohibited in the team chat.",
    "grammarNote": "",
    "exampleTr": "Profesyonelce olmayan ve kaba yorumlar ekip sohbetinde kesinlikle yasaktır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "ruder (than)",
      "phonetic": "/ˈruː.dər/",
      "translation": "daha kaba"
    },
    "superlative": {
      "form": "the rudest",
      "phonetic": "/ðə ˈruː.dɪst/",
      "translation": "en kaba"
    },
    "antonym": {
      "word": "polite",
      "phonetic": "/pəˈlaɪt/",
      "translation": "kibar"
    }
  },
  {
    "id": "adj_065",
    "rank": 65,
    "word": "Smart",
    "phonetic": "/smɑːt/",
    "translation": "Akıllı / Zeki",
    "exampleEn": "We built a smart recipe application that detects ingredients via CameraX.",
    "grammarNote": "",
    "exampleTr": "CameraX üzerinden malzemeleri tespit eden akıllı bir yemek tarifi uygulaması inşa ettik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "smarter (than)",
      "phonetic": "/ˈsmɑː.tər/",
      "translation": "daha akıllı"
    },
    "superlative": {
      "form": "the smartest",
      "phonetic": "/ðə ˈsmɑː.tɪst/",
      "translation": "en akıllı"
    },
    "antonym": {
      "word": "foolish / stupid",
      "phonetic": "/ˈstuː.pɪd/",
      "translation": "aptal"
    }
  },
  {
    "id": "adj_066",
    "rank": 66,
    "word": "Careful",
    "phonetic": "/ˈkeə.fəl/",
    "translation": "Dikkatli",
    "exampleEn": "You must be very careful when executing raw migration scripts.",
    "grammarNote": "",
    "exampleTr": "Ham taşıma betiklerini çalıştırırken çok dikkatli olmalısınız.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more careful (than)",
      "phonetic": "/mɔːr ˈkeə.fəl/",
      "translation": "daha dikkatli"
    },
    "superlative": {
      "form": "the most careful",
      "phonetic": "/ðə məʊst ˈkeə.fəl/",
      "translation": "en dikkatli"
    },
    "antonym": {
      "word": "careless",
      "phonetic": "/ˈkeə.ləs/",
      "translation": "dikkatsiz"
    }
  },
  {
    "id": "adj_067",
    "rank": 67,
    "word": "Careless",
    "phonetic": "/ˈkeə.ləs/",
    "translation": "Dikkatsiz",
    "exampleEn": "A careless commit resulted in an unexpected production outage.",
    "grammarNote": "",
    "exampleTr": "Dikkatsiz bir commit beklenmeyen bir canlı ortam kesintisiyle sonuçlandı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more careless (than)",
      "phonetic": "/mɔːr ˈkeə.ləs/",
      "translation": "daha dikkatsiz"
    },
    "superlative": {
      "form": "the most careless",
      "phonetic": "/ðə məʊst ˈkeə.ləs/",
      "translation": "en dikkatsiz"
    },
    "antonym": {
      "word": "careful",
      "phonetic": "/ˈkeə.fəl/",
      "translation": "dikkatli"
    }
  },
  {
    "id": "adj_068",
    "rank": 68,
    "word": "Patient",
    "phonetic": "/ˈpeɪ.ʃənt/",
    "translation": "Sabırlı",
    "exampleEn": "Senior architects are patient when mentoring junior developers.",
    "grammarNote": "",
    "exampleTr": "Kıdemli mimarlar kıdemsiz geliştiricilere mentorluk yaparken sabırlıdırlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more patient (than)",
      "phonetic": "/mɔːr ˈpeɪ.ʃənt/",
      "translation": "daha sabırlı"
    },
    "superlative": {
      "form": "the most patient",
      "phonetic": "/ðə məʊst ˈpeɪ.ʃənt/",
      "translation": "en sabırlı"
    },
    "antonym": {
      "word": "impatient",
      "phonetic": "/ɪmˈpeɪ.ʃənt/",
      "translation": "sabırsız"
    }
  },
  {
    "id": "adj_069",
    "rank": 69,
    "word": "Impatient",
    "phonetic": "/ɪmˈpeɪ.ʃənt/",
    "translation": "Sabırsız",
    "exampleEn": "Users get impatient when mobile page loading times exceed three seconds.",
    "grammarNote": "",
    "exampleTr": "Mobil sayfa yükleme süreleri üç saniyeyi aştığında kullanıcılar sabırsızlanır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more impatient (than)",
      "phonetic": "/mɔːr ɪmˈpeɪ.ʃənt/",
      "translation": "daha sabırsız"
    },
    "superlative": {
      "form": "the most impatient",
      "phonetic": "/ðə məʊst ɪmˈpeɪ.ʃənt/",
      "translation": "en sabırsız"
    },
    "antonym": {
      "word": "patient",
      "phonetic": "/ˈpeɪ.ʃənt/",
      "translation": "sabırlı"
    }
  },
  {
    "id": "adj_070",
    "rank": 70,
    "word": "Honest",
    "phonetic": "/ˈɒn.ɪst/",
    "translation": "Dürüst",
    "exampleEn": "Honest communication is essential during post-mortem incident reviews.",
    "grammarNote": "",
    "exampleTr": "Olay sonrası kök neden incelemelerinde dürüst iletişim esastır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more honest (than)",
      "phonetic": "/mɔːr ˈɒn.ɪst/",
      "translation": "daha dürüst"
    },
    "superlative": {
      "form": "the most honest",
      "phonetic": "/ðə məʊst ˈɒn.ɪst/",
      "translation": "en dürüst"
    },
    "antonym": {
      "word": "dishonest",
      "phonetic": "/dɪsˈɒn.ɪst/",
      "translation": "dürüst olmayan"
    }
  },
  {
    "id": "adj_071",
    "rank": 71,
    "word": "Lazy",
    "phonetic": "/ˈleɪ.zi/",
    "translation": "Tembel",
    "exampleEn": "Lazy loading optimizes web page performance by delaying non-critical images.",
    "grammarNote": "",
    "exampleTr": "Tembel yükleme (lazy loading), kritik olmayan resimleri geciktirerek web sayfası performansını optimize eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "lazier (than)",
      "phonetic": "/ˈleɪ.zi.ər/",
      "translation": "daha tembel"
    },
    "superlative": {
      "form": "the laziest",
      "phonetic": "/ðə ˈleɪ.zi.ɪst/",
      "translation": "en tembel"
    },
    "antonym": {
      "word": "hardworking",
      "phonetic": "/ˌhɑːdˈwɜː.kɪŋ/",
      "translation": "çalışkan"
    }
  },
  {
    "id": "adj_072",
    "rank": 72,
    "word": "Hardworking",
    "phonetic": "/ˌhɑːdˈwɜː.kɪŋ/",
    "translation": "Çalışkan",
    "exampleEn": "The hardworking engineering team delivered the mobile prototype on time.",
    "grammarNote": "",
    "exampleTr": "Çalışkan mühendislik ekibi mobil prototipi zamanında teslim etti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more hardworking (than)",
      "phonetic": "/mɔːr ˌhɑːdˈwɜː.kɪŋ/",
      "translation": "daha çalışkan"
    },
    "superlative": {
      "form": "the most hardworking",
      "phonetic": "/ðə məʊst ˌhɑːdˈwɜː.kɪŋ/",
      "translation": "en çalışkan"
    },
    "antonym": {
      "word": "lazy",
      "phonetic": "/ˈleɪ.zi/",
      "translation": "tembel"
    }
  },
  {
    "id": "adj_073",
    "rank": 73,
    "word": "Brave",
    "phonetic": "/breɪv/",
    "translation": "Cesur",
    "exampleEn": "It was a brave decision to refactor the entire monolithic codebase.",
    "grammarNote": "",
    "exampleTr": "Tüm monolitik kod tabanını yeniden düzenlemek cesur bir karardı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "braver (than)",
      "phonetic": "/ˈbreɪ.vər/",
      "translation": "daha cesur"
    },
    "superlative": {
      "form": "the bravest",
      "phonetic": "/ðə ˈbreɪ.vɪst/",
      "translation": "en cesur"
    },
    "antonym": {
      "word": "cowardly / fearful",
      "phonetic": "/ˈkɪw.əd.li/",
      "translation": "korkak"
    }
  },
  {
    "id": "adj_074",
    "rank": 74,
    "word": "Calm",
    "phonetic": "/kɑːm/",
    "translation": "Sakin / Dingin",
    "exampleEn": "The lead architect remained calm during the server incident.",
    "grammarNote": "",
    "exampleTr": "Baş mimar sunucu olayı sırasında sakin kaldı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "calmer (than)",
      "phonetic": "/ˈkɑː.mər/",
      "translation": "daha sakin"
    },
    "superlative": {
      "form": "the calmest",
      "phonetic": "/ðə ˈkɑː.mɪst/",
      "translation": "en sakin"
    },
    "antonym": {
      "word": "nervous / anxious",
      "phonetic": "/ˈnɜː.vəs/",
      "translation": "gergin"
    }
  },
  {
    "id": "adj_075",
    "rank": 75,
    "word": "Nervous",
    "phonetic": "/ˈnɜː.vəs/",
    "translation": "Gergin / Endişeli",
    "exampleEn": "He was nervous before his technical interview presentation.",
    "grammarNote": "",
    "exampleTr": "Teknik mülakat sunumundan önce gergindi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more nervous (than)",
      "phonetic": "/mɔːr ˈnɜː.vəs/",
      "translation": "daha gergin"
    },
    "superlative": {
      "form": "the most nervous",
      "phonetic": "/ðə məʊst ˈnɜː.vəs/",
      "translation": "en gergin"
    },
    "antonym": {
      "word": "calm",
      "phonetic": "/kɑːm/",
      "translation": "sakin"
    }
  },
  {
    "id": "adj_076",
    "rank": 76,
    "word": "Tired",
    "phonetic": "/taɪəd/",
    "translation": "Yorgun",
    "exampleEn": "I felt tired after debugging complex SQL deadlocks all night.",
    "grammarNote": "",
    "exampleTr": "Bütün gece karmaşık SQL kilitlenmelerini ayıkladıktan sonra yorgun hissettim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more tired (than)",
      "phonetic": "/mɔːr taɪəd/",
      "translation": "daha yorgun"
    },
    "superlative": {
      "form": "the most tired",
      "phonetic": "/ðə məʊst taɪəd/",
      "translation": "en yorgun"
    },
    "antonym": {
      "word": "energetic",
      "phonetic": "/ˌen.əˈdʒet.ɪk/",
      "translation": "enerjik"
    }
  },
  {
    "id": "adj_077",
    "rank": 77,
    "word": "Hungry",
    "phonetic": "/ˈhʌŋ.ɡri/",
    "translation": "Aç",
    "exampleEn": "We were hungry after working continuously for six hours.",
    "grammarNote": "",
    "exampleTr": "Aralıksız altı saat çalıştıktan sonra acıkmıştık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "hungrier (than)",
      "phonetic": "/ˈhʌŋ.ɡri.ər/",
      "translation": "daha aç"
    },
    "superlative": {
      "form": "the hungriest",
      "phonetic": "/ðə ˈhʌŋ.ɡri.ɪst/",
      "translation": "en aç"
    },
    "antonym": {
      "word": "full",
      "phonetic": "/fʊl/",
      "translation": "tok"
    }
  },
  {
    "id": "adj_078",
    "rank": 78,
    "word": "Thirsty",
    "phonetic": "/ˈθɜː.sti/",
    "translation": "Susamış",
    "exampleEn": "I was thirsty and drank a large glass of cold water.",
    "grammarNote": "",
    "exampleTr": "Susamıştım ve büyük bir bardak soğuk su içtim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "thirstier (than)",
      "phonetic": "/ˈθɜː.sti.ər/",
      "translation": "daha susamış"
    },
    "superlative": {
      "form": "the thirstiest",
      "phonetic": "/ðə ˈθɜː.sti.ɪst/",
      "translation": "en susamış"
    },
    "antonym": {
      "word": "hydrated",
      "phonetic": "/ˈhaɪ.dreɪ.tɪd/",
      "translation": "suya kanmış"
    }
  },
  {
    "id": "adj_079",
    "rank": 79,
    "word": "Sick",
    "phonetic": "/sɪk/",
    "translation": "Hasta",
    "exampleEn": "He stayed at home today because he was sick with the flu.",
    "grammarNote": "",
    "exampleTr": "Grip nedeniyle hasta olduğu için bugün evde kaldı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "sicker (than)",
      "phonetic": "/ˈsɪk.ər/",
      "translation": "daha hasta"
    },
    "superlative": {
      "form": "the sickest",
      "phonetic": "/ðə ˈsɪk.ɪst/",
      "translation": "en hasta"
    },
    "antonym": {
      "word": "healthy / well",
      "phonetic": "/ˈhel.θi/",
      "translation": "sağlıklı"
    }
  },
  {
    "id": "adj_080",
    "rank": 80,
    "word": "Healthy",
    "phonetic": "/ˈhel.θi/",
    "translation": "Sağlıklı",
    "exampleEn": "Regular physical exercise and healthy nutrition boost cognitive focus.",
    "grammarNote": "",
    "exampleTr": "Düzenli fiziksel egzersiz ve sağlıklı beslenme bilişsel odağı artırır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "healthier (than)",
      "phonetic": "/ˈhel.θi.ər/",
      "translation": "daha sağlıklı"
    },
    "superlative": {
      "form": "the healthiest",
      "phonetic": "/ðə ˈhel.θi.ɪst/",
      "translation": "en sağlıklı"
    },
    "antonym": {
      "word": "sick / unhealthy",
      "phonetic": "/sɪk/",
      "translation": "hasta / sağlıksız"
    }
  },
  {
    "id": "adj_081",
    "rank": 81,
    "word": "Dry",
    "phonetic": "/draɪ/",
    "translation": "Kuru",
    "exampleEn": "The weather in central Anatolia is dry and sunny during summer.",
    "grammarNote": "",
    "exampleTr": "İç Anadolu'da hava yaz aylarında kurak ve güneşlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "drier (than)",
      "phonetic": "/ˈdraɪ.ər/",
      "translation": "daha kuru"
    },
    "superlative": {
      "form": "the driest",
      "phonetic": "/ðə ˈdraɪ.ɪst/",
      "translation": "en kuru"
    },
    "antonym": {
      "word": "wet",
      "phonetic": "/wet/",
      "translation": "ıslak"
    }
  },
  {
    "id": "adj_082",
    "rank": 82,
    "word": "Wet",
    "phonetic": "/wet/",
    "translation": "Islak / Yaş",
    "exampleEn": "Do not operate physical electrical hardware with wet hands.",
    "grammarNote": "",
    "exampleTr": "Fiziksel elektrik donanımlarını ıslak ellerle çalıştırmayın.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "wetter (than)",
      "phonetic": "/ˈwet.ər/",
      "translation": "daha ıslak"
    },
    "superlative": {
      "form": "the wettest",
      "phonetic": "/ðə ˈwet.ɪst/",
      "translation": "en ıslak"
    },
    "antonym": {
      "word": "dry",
      "phonetic": "/draɪ/",
      "translation": "kuru"
    }
  },
  {
    "id": "adj_083",
    "rank": 83,
    "word": "Soft",
    "phonetic": "/sɒft/",
    "translation": "Yumuşak",
    "exampleEn": "The laptop sleeve has a soft velvet interior to protect the screen.",
    "grammarNote": "",
    "exampleTr": "Dizüstü bilgisayar kılıfı ekranı korumak için yumuşak kadife bir iç kısma sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "softer (than)",
      "phonetic": "/ˈsɒf.tər/",
      "translation": "daha yumuşak"
    },
    "superlative": {
      "form": "the softest",
      "phonetic": "/ðə ˈsɒf.tɪst/",
      "translation": "en yumuşak"
    },
    "antonym": {
      "word": "hard / rough",
      "phonetic": "/hɑːd/",
      "translation": "sert / pürüzlü"
    }
  },
  {
    "id": "adj_084",
    "rank": 84,
    "word": "Sweet",
    "phonetic": "/swiːt/",
    "translation": "Tatlı",
    "exampleEn": "We enjoyed a sweet chocolate dessert after the team dinner.",
    "grammarNote": "",
    "exampleTr": "Ekip yemeğinden sonra tatlı bir çikolatalı tatlının tadını çıkardık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "sweeter (than)",
      "phonetic": "/ˈswiː.tər/",
      "translation": "daha tatlı"
    },
    "superlative": {
      "form": "the sweetest",
      "phonetic": "/ðə ˈswiː.tɪst/",
      "translation": "en tatlı"
    },
    "antonym": {
      "word": "bitter / sour",
      "phonetic": "/ˈbɪt.ər/",
      "translation": "acı / ekşi"
    }
  },
  {
    "id": "adj_085",
    "rank": 85,
    "word": "Fresh",
    "phonetic": "/freʃ/",
    "translation": "Taze",
    "exampleEn": "The local market sells fresh organic vegetables every Tuesday.",
    "grammarNote": "",
    "exampleTr": "Yerel pazar her salı günü taze organik sebzeler satar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fresher (than)",
      "phonetic": "/ˈfreʃ.ər/",
      "translation": "daha taze"
    },
    "superlative": {
      "form": "the freshest",
      "phonetic": "/ðə ˈfreʃ.ɪst/",
      "translation": "en taze"
    },
    "antonym": {
      "word": "stale / rotten",
      "phonetic": "/steɪl/",
      "translation": "bayat / çürük"
    }
  },
  {
    "id": "adj_086",
    "rank": 86,
    "word": "Deep",
    "phonetic": "/diːp/",
    "translation": "Derin",
    "exampleEn": "I am studying deep learning neural networks for video classification.",
    "grammarNote": "",
    "exampleTr": "Video sınıflandırması için derin öğrenme yapay sinir ağları çalışıyorum.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "deeper (than)",
      "phonetic": "/ˈdiː.pər/",
      "translation": "daha derin"
    },
    "superlative": {
      "form": "the deepest",
      "phonetic": "/ðə ˈdiː.pɪst/",
      "translation": "en derin"
    },
    "antonym": {
      "word": "shallow",
      "phonetic": "/ˈʃæl.əʊ/",
      "translation": "sığ"
    }
  },
  {
    "id": "adj_087",
    "rank": 87,
    "word": "Shallow",
    "phonetic": "/ˈʃæl.əʊ/",
    "translation": "Sığ / Yüzeysel",
    "exampleEn": "A shallow understanding of algorithms will lead to inefficient software.",
    "grammarNote": "",
    "exampleTr": "Algoritmaların yüzeysel bir şekilde anlaşılması verimsiz yazılımlara yol açacaktır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "shallower (than)",
      "phonetic": "/ˈʃæl.əʊ.ər/",
      "translation": "daha sığ"
    },
    "superlative": {
      "form": "the shallowest",
      "phonetic": "/ðə ˈʃæl.əʊ.ɪst/",
      "translation": "en sığ"
    },
    "antonym": {
      "word": "deep",
      "phonetic": "/diːp/",
      "translation": "derin"
    }
  },
  {
    "id": "adj_088",
    "rank": 88,
    "word": "Wide",
    "phonetic": "/waɪd/",
    "translation": "Geniş",
    "exampleEn": "Our e-commerce platform supports a wide range of payment methods.",
    "grammarNote": "",
    "exampleTr": "E-ticaret platformumuz geniş bir ödeme yöntemi yelpazesini destekler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "wider (than)",
      "phonetic": "/ˈwaɪ.dər/",
      "translation": "daha geniş"
    },
    "superlative": {
      "form": "the widest",
      "phonetic": "/ðə ˈwaɪ.dɪst/",
      "translation": "en geniş"
    },
    "antonym": {
      "word": "narrow",
      "phonetic": "/ˈnær.əʊ/",
      "translation": "dar"
    }
  },
  {
    "id": "adj_089",
    "rank": 89,
    "word": "Narrow",
    "phonetic": "/ˈnær.əʊ/",
    "translation": "Dar",
    "exampleEn": "The robot navigated through narrow hallways using ultrasonic sensors.",
    "grammarNote": "",
    "exampleTr": "Robot ultrasonik sensörler kullanarak dar koridorlardan geçti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "narrower (than)",
      "phonetic": "/ˈnær.əʊ.ər/",
      "translation": "daha dar"
    },
    "superlative": {
      "form": "the narrowest",
      "phonetic": "/ðə ˈnær.əʊ.ɪst/",
      "translation": "en dar"
    },
    "antonym": {
      "word": "wide",
      "phonetic": "/waɪd/",
      "translation": "geniş"
    }
  },
  {
    "id": "adj_090",
    "rank": 90,
    "word": "Modern",
    "phonetic": "/ˈmɒd.ən/",
    "translation": "Modern / Çağdaş",
    "exampleEn": "Next.js provides a modern developer experience for web development.",
    "grammarNote": "",
    "exampleTr": "Next.js web geliştirme için modern bir geliştirici deneyimi sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more modern (than)",
      "phonetic": "/mɔːr ˈmɒd.ən/",
      "translation": "daha modern"
    },
    "superlative": {
      "form": "the most modern",
      "phonetic": "/ðə məʊst ˈmɒd.ən/",
      "translation": "en modern"
    },
    "antonym": {
      "word": "ancient / outdated",
      "phonetic": "/ˈaʊtˌdeɪ.tɪd/",
      "translation": "eski / çağdışı"
    }
  },
  {
    "id": "adj_091",
    "rank": 91,
    "word": "Traditional",
    "phonetic": "/trəˈdɪʃ.ən.əl/",
    "translation": "Geleneksel",
    "exampleEn": "Traditional manual server configurations take hours to complete.",
    "grammarNote": "",
    "exampleTr": "Geleneksel manuel sunucu yapılandırmalarını tamamlamak saatler alır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more traditional (than)",
      "phonetic": "/mɔːr trəˈdɪʃ.ən.əl/",
      "translation": "daha geleneksel"
    },
    "superlative": {
      "form": "the most traditional",
      "phonetic": "/ðə məʊst trəˈdɪʃ.ən.əl/",
      "translation": "en geleneksel"
    },
    "antonym": {
      "word": "modern / innovative",
      "phonetic": "/ˈmɒd.ən/",
      "translation": "modern / yenilikçi"
    }
  },
  {
    "id": "adj_092",
    "rank": 92,
    "word": "Popular",
    "phonetic": "/ˈpɒp.jə.lər/",
    "translation": "Popüler / Yaygın",
    "exampleEn": "Python is the most popular language for machine learning and AI.",
    "grammarNote": "",
    "exampleTr": "Python makine öğrenmesi ve yapay zeka için en popüler dildir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more popular (than)",
      "phonetic": "/mɔːr ˈpɒp.jə.lər/",
      "translation": "daha popüler"
    },
    "superlative": {
      "form": "the most popular",
      "phonetic": "/ðə məʊst ˈpɒp.jə.lər/",
      "translation": "en popüler"
    },
    "antonym": {
      "word": "unpopular",
      "phonetic": "/ʌnˈpɒp.jə.lər/",
      "translation": "popüler olmayan"
    }
  },
  {
    "id": "adj_093",
    "rank": 93,
    "word": "Famous",
    "phonetic": "/ˈfeɪ.məs/",
    "translation": "Ünlü / Meşhur",
    "exampleEn": "Linus Torvalds is famous for creating the Linux operating system kernel.",
    "grammarNote": "",
    "exampleTr": "Linus Torvalds Linux işletim sistemi çekirdeğini yaratmasıyla ünlüdür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more famous (than)",
      "phonetic": "/mɔːr ˈfeɪ.məs/",
      "translation": "daha ünlü"
    },
    "superlative": {
      "form": "the most famous",
      "phonetic": "/ðə məʊst ˈfeɪ.məs/",
      "translation": "en ünlü"
    },
    "antonym": {
      "word": "unknown",
      "phonetic": "/ʌnˈnəʊn/",
      "translation": "bilinmeyen"
    }
  },
  {
    "id": "adj_094",
    "rank": 94,
    "word": "Accurate",
    "phonetic": "/ˈæk.jə.rət/",
    "translation": "Doğru / Kesin",
    "exampleEn": "Our DeepFake detection model produced highly accurate classification results.",
    "grammarNote": "",
    "exampleTr": "DeepFake tespit modelimiz oldukça doğru sınıflandırma sonuçları üretti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more accurate (than)",
      "phonetic": "/mɔːr ˈæk.jə.rət/",
      "translation": "daha doğru"
    },
    "superlative": {
      "form": "the most accurate",
      "phonetic": "/ðə məʊst ˈæk.jə.rət/",
      "translation": "en doğru"
    },
    "antonym": {
      "word": "inaccurate",
      "phonetic": "/ɪnˈæk.jə.rət/",
      "translation": "hatalı"
    }
  },
  {
    "id": "adj_095",
    "rank": 95,
    "word": "Efficient",
    "phonetic": "/ɪˈfɪʃ.ənt/",
    "translation": "Verimli / Etkili",
    "exampleEn": "Asynchronous non-blocking I/O is much more efficient than synchronous polling.",
    "grammarNote": "",
    "exampleTr": "Eşzamansız bloklamayan G/Ç, eşzamanlı yoklamadan çok daha verimlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more efficient (than)",
      "phonetic": "/mɔːr ɪˈfɪʃ.ənt/",
      "translation": "daha verimli"
    },
    "superlative": {
      "form": "the most efficient",
      "phonetic": "/ðə məʊst ɪˈfɪʃ.ənt/",
      "translation": "en verimli"
    },
    "antonym": {
      "word": "inefficient",
      "phonetic": "/ˌɪn.ɪˈfɪʃ.ənt/",
      "translation": "verimsiz"
    }
  },
  {
    "id": "adj_096",
    "rank": 96,
    "word": "Flexible",
    "phonetic": "/ˈflek.sə.bəl/",
    "translation": "Esnek",
    "exampleEn": "Document databases provide a flexible schema for rapidly evolving applications.",
    "grammarNote": "",
    "exampleTr": "Doküman veritabanları hızla gelişen uygulamalar için esnek bir şema sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more flexible (than)",
      "phonetic": "/mɔːr ˈflek.sə.bəl/",
      "translation": "daha esnek"
    },
    "superlative": {
      "form": "the most flexible",
      "phonetic": "/ðə məʊst ˈflek.sə.bəl/",
      "translation": "en esnek"
    },
    "antonym": {
      "word": "rigid / inflexible",
      "phonetic": "/ˈrɪdʒ.ɪd/",
      "translation": "katı / esnek olmayan"
    }
  },
  {
    "id": "adj_097",
    "rank": 97,
    "word": "Public",
    "phonetic": "/ˈpʌb.lɪk/",
    "translation": "Kamusal / Herkese Açık",
    "exampleEn": "I published the open-source library repository on public GitHub.",
    "grammarNote": "",
    "exampleTr": "Açık kaynaklı kütüphane deposunu herkese açık GitHub'da yayınladım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more public (than)",
      "phonetic": "/mɔːr ˈpʌb.lɪk/",
      "translation": "daha açık"
    },
    "superlative": {
      "form": "the most public",
      "phonetic": "/ðə məʊst ˈpʌb.lɪk/",
      "translation": "en açık"
    },
    "antonym": {
      "word": "private",
      "phonetic": "/ˈpraɪ.vət/",
      "translation": "özel / gizli"
    }
  },
  {
    "id": "adj_098",
    "rank": 98,
    "word": "Private",
    "phonetic": "/ˈpraɪ.vət/",
    "translation": "Özel / Gizli",
    "exampleEn": "Always keep database credentials in a private environment file.",
    "grammarNote": "",
    "exampleTr": "Veritabanı kimlik bilgilerini her zaman özel bir ortam (.env) dosyasında tutun.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more private (than)",
      "phonetic": "/mɔːr ˈpraɪ.vət/",
      "translation": "daha özel"
    },
    "superlative": {
      "form": "the most private",
      "phonetic": "/ðə məʊst ˈpraɪ.vət/",
      "translation": "en özel"
    },
    "antonym": {
      "word": "public",
      "phonetic": "/ˈpʌb.lɪk/",
      "translation": "kamusal / açık"
    }
  },
  {
    "id": "adj_099",
    "rank": 99,
    "word": "Common",
    "phonetic": "/ˈkɒm.ən/",
    "translation": "Yaygın / Ortak",
    "exampleEn": "Null pointer exceptions are the most common cause of application crashes.",
    "grammarNote": "",
    "exampleTr": "Null pointer istisnaları uygulama çökmelerinin en yaygın nedenidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more common (than)",
      "phonetic": "/ˈkɒm.ən.ər/",
      "translation": "daha yaygın"
    },
    "superlative": {
      "form": "the most common",
      "phonetic": "/ðə ˈkɒm.ən.ɪst/",
      "translation": "en yaygın"
    },
    "antonym": {
      "word": "rare / uncommon",
      "phonetic": "/reər/",
      "translation": "nadir"
    }
  },
  {
    "id": "adj_100",
    "rank": 100,
    "word": "Unique",
    "phonetic": "/juːˈniːk/",
    "translation": "Benzersiz / Eşsiz",
    "exampleEn": "Each user in the database must have a unique email identifier.",
    "grammarNote": "",
    "exampleTr": "Veritabanındaki her kullanıcının benzersiz bir e-posta tanımlayıcısı olmalıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more unique (than)",
      "phonetic": "/mɔːr juːˈniːk/",
      "translation": "daha benzersiz"
    },
    "superlative": {
      "form": "the most unique",
      "phonetic": "/ðə məʊst juːˈniːk/",
      "translation": "en benzersiz"
    },
    "antonym": {
      "word": "ordinary / common",
      "phonetic": "/ˈkɒm.ən/",
      "translation": "sıradan / yaygın"
    }
  }
] as LibraryWordEntry[];

export const ADJECTIVES_200: LibraryWordEntry[] = [
  {
    "id": "adj_101",
    "rank": 101,
    "word": "Active",
    "phonetic": "/ˈæk.tɪv/",
    "translation": "Aktif / Etkin",
    "exampleEn": "Our developer community has over five hundred active members.",
    "grammarNote": "",
    "exampleTr": "Geliştirici topluluğumuz beş yüzden fazla aktif üyeye sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more active (than)",
      "phonetic": "/mɔːr ˈæk.tɪv/",
      "translation": "daha aktif"
    },
    "superlative": {
      "form": "the most active",
      "phonetic": "/ðə məʊst ˈæk.tɪv/",
      "translation": "en aktif"
    },
    "antonym": {
      "word": "passive / inactive",
      "phonetic": "/ˈpæs.ɪv/",
      "translation": "pasif / hareketsiz"
    }
  },
  {
    "id": "adj_102",
    "rank": 102,
    "word": "Alive",
    "phonetic": "/əˈlaɪv/",
    "translation": "Canlı / Hayatta",
    "exampleEn": "The open-source project is still alive and maintained by contributors.",
    "grammarNote": "",
    "exampleTr": "Açık kaynaklı proje hâlâ canlıdır ve katkıda bulunanlar tarafından sürdürülmektedir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more alive (than)",
      "phonetic": "/mɔːr əˈlaɪv/",
      "translation": "daha canlı"
    },
    "superlative": {
      "form": "the most alive",
      "phonetic": "/ðə məʊst əˈlaɪv/",
      "translation": "en canlı"
    },
    "antonym": {
      "word": "dead",
      "phonetic": "/ded/",
      "translation": "ölü"
    }
  },
  {
    "id": "adj_103",
    "rank": 103,
    "word": "Angry",
    "phonetic": "/ˈæŋ.ɡri/",
    "translation": "Kızgın / Öfkeli",
    "exampleEn": "The customer was angry about the unexpected subscription charge.",
    "grammarNote": "",
    "exampleTr": "Müşteri beklenmeyen abonelik ücreti nedeniyle kızgındı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "angrier (than)",
      "phonetic": "/ˈæŋ.ɡri.ər/",
      "translation": "daha kızgın"
    },
    "superlative": {
      "form": "the angriest",
      "phonetic": "/ðə ˈæŋ.ɡri.ɪst/",
      "translation": "en kızgın"
    },
    "antonym": {
      "word": "calm / peaceful",
      "phonetic": "/kɑːm/",
      "translation": "sakin"
    }
  },
  {
    "id": "adj_104",
    "rank": 104,
    "word": "Anxious",
    "phonetic": "/ˈæŋk.ʃəs/",
    "translation": "Endişeli / Kaygılı",
    "exampleEn": "I felt anxious before my first international technical presentation.",
    "grammarNote": "",
    "exampleTr": "İlk uluslararası teknik sunumumdan önce endişeli hissettim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more anxious (than)",
      "phonetic": "/mɔːr ˈæŋk.ʃəs/",
      "translation": "daha endişeli"
    },
    "superlative": {
      "form": "the most anxious",
      "phonetic": "/ðə məʊst ˈæŋk.ʃəs/",
      "translation": "en endişeli"
    },
    "antonym": {
      "word": "relaxed / confident",
      "phonetic": "/rɪˈlækst/",
      "translation": "rahat / kendinden emin"
    }
  },
  {
    "id": "adj_105",
    "rank": 105,
    "word": "Available",
    "phonetic": "/əˈveɪ.lə.bəl/",
    "translation": "Mevcut / Erişilebilir",
    "exampleEn": "The new software update is available for download on our website.",
    "grammarNote": "",
    "exampleTr": "Yeni yazılım güncellemesi web sitemizde indirilmeye hazırdır / mevcuttur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more available (than)",
      "phonetic": "/mɔːr əˈveɪ.lə.bəl/",
      "translation": "daha erişilebilir"
    },
    "superlative": {
      "form": "the most available",
      "phonetic": "/ðə məʊst əˈveɪ.lə.bəl/",
      "translation": "en erişilebilir"
    },
    "antonym": {
      "word": "unavailable",
      "phonetic": "/ˌʌn.əˈveɪ.lə.bəl/",
      "translation": "erişilemez"
    }
  },
  {
    "id": "adj_106",
    "rank": 106,
    "word": "Basic",
    "phonetic": "/ˈbeɪ.sɪk/",
    "translation": "Temel / Esas",
    "exampleEn": "Understanding basic data structures is essential for any programmer.",
    "grammarNote": "",
    "exampleTr": "Temel veri yapılarını anlamak her programcı için gereklidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more basic (than)",
      "phonetic": "/mɔːr ˈbeɪ.sɪk/",
      "translation": "daha temel"
    },
    "superlative": {
      "form": "the most basic",
      "phonetic": "/ðə məʊst ˈbeɪ.sɪk/",
      "translation": "en temel"
    },
    "antonym": {
      "word": "advanced",
      "phonetic": "/ədˈvɑːnst/",
      "translation": "ileri düzey"
    }
  },
  {
    "id": "adj_107",
    "rank": 107,
    "word": "Bitter",
    "phonetic": "/ˈbɪt.ər/",
    "translation": "Acı / Keskin",
    "exampleEn": "Dark chocolate has a rich and slightly bitter taste.",
    "grammarNote": "",
    "exampleTr": "Bitter çikolata zengin ve hafif acı bir tada sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "bitterer (than)",
      "phonetic": "/ˈbɪt.ər.ər/",
      "translation": "daha acı"
    },
    "superlative": {
      "form": "the bitterest",
      "phonetic": "/ðə ˈbɪt.ər.ɪst/",
      "translation": "en acı"
    },
    "antonym": {
      "word": "sweet",
      "phonetic": "/swiːt/",
      "translation": "tatlı"
    }
  },
  {
    "id": "adj_108",
    "rank": 108,
    "word": "Blind",
    "phonetic": "/blaɪnd/",
    "translation": "Kör / Görmezden gelen",
    "exampleEn": "Screen readers assist visually impaired and blind users effectively.",
    "grammarNote": "",
    "exampleTr": "Ekran okuyucular görme engelli ve kör kullanıcılara etkili şekilde yardımcı olur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "blinder (than)",
      "phonetic": "/ˈblaɪn.dər/",
      "translation": "daha kör"
    },
    "superlative": {
      "form": "the blindest",
      "phonetic": "/ðə ˈblaɪn.dɪst/",
      "translation": "en kör"
    },
    "antonym": {
      "word": "sighted",
      "phonetic": "/ˈsaɪ.tɪd/",
      "translation": "gören"
    }
  },
  {
    "id": "adj_109",
    "rank": 109,
    "word": "Bold",
    "phonetic": "/bəʊld/",
    "translation": "Cesur / Kalın (Yazı)",
    "exampleEn": "Important keywords in the tutorial are formatted in bold text.",
    "grammarNote": "",
    "exampleTr": "Öğreticideki önemli anahtar kelimeler kalın (bold) metinle biçimlendirilmiştir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "bolder (than)",
      "phonetic": "/ˈbəʊl.dər/",
      "translation": "daha cesur"
    },
    "superlative": {
      "form": "the boldest",
      "phonetic": "/ðə ˈbəʊl.dɪst/",
      "translation": "en cesur"
    },
    "antonym": {
      "word": "timid / regular",
      "phonetic": "/ˈtɪm.ɪd/",
      "translation": "çekingen / normal"
    }
  },
  {
    "id": "adj_110",
    "rank": 110,
    "word": "Bored",
    "phonetic": "/bɔːd/",
    "translation": "Sıkılmış",
    "exampleEn": "I felt bored during the long theoretical lecture without practical coding.",
    "grammarNote": "",
    "exampleTr": "Pratik kodlama içermeyen uzun teorik ders sırasında sıkılmış hissettim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more bored (than)",
      "phonetic": "/mɔːr bɔːd/",
      "translation": "daha sıkılmış"
    },
    "superlative": {
      "form": "the most bored",
      "phonetic": "/ðə məʊst bɔːd/",
      "translation": "en sıkılmış"
    },
    "antonym": {
      "word": "excited / interested",
      "phonetic": "/ɪkˈsaɪ.tɪd/",
      "translation": "heyecanlı / ilgili"
    }
  },
  {
    "id": "adj_111",
    "rank": 111,
    "word": "Boring",
    "phonetic": "/ˈbɔː.rɪŋ/",
    "translation": "Sıkıcı",
    "exampleEn": "Writing boilerplate code manually is repetitive and boring.",
    "grammarNote": "",
    "exampleTr": "Basmakalıp kodu manuel yazmak tekrarlayıcı ve sıkıcıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more boring (than)",
      "phonetic": "/mɔːr ˈbɔː.rɪŋ/",
      "translation": "daha sıkıcı"
    },
    "superlative": {
      "form": "the most boring",
      "phonetic": "/ðə məʊst ˈbɔː.rɪŋ/",
      "translation": "en sıkıcı"
    },
    "antonym": {
      "word": "interesting / exciting",
      "phonetic": "/ˈɪn.trəs.tɪŋ/",
      "translation": "ilginç / heyecan verici"
    }
  },
  {
    "id": "adj_112",
    "rank": 112,
    "word": "Broad",
    "phonetic": "/brɔːd/",
    "translation": "Geniş / Kapsamlı",
    "exampleEn": "Computer engineering provides a broad foundation in hardware and software.",
    "grammarNote": "",
    "exampleTr": "Bilgisayar mühendisliği donanım ve yazılım alanında geniş bir temel sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "broader (than)",
      "phonetic": "/ˈbrɔː.dər/",
      "translation": "daha geniş"
    },
    "superlative": {
      "form": "the broadest",
      "phonetic": "/ðə ˈbrɔː.dɪst/",
      "translation": "en geniş"
    },
    "antonym": {
      "word": "narrow",
      "phonetic": "/ˈnær.əʊ/",
      "translation": "dar"
    }
  },
  {
    "id": "adj_113",
    "rank": 113,
    "word": "Broken",
    "phonetic": "/ˈbrəʊ.kən/",
    "translation": "Bozuk / Kırık",
    "exampleEn": "I fixed the broken API endpoint and verified all unit tests.",
    "grammarNote": "",
    "exampleTr": "Bozuk API uç noktasını düzelttim ve tüm birim testlerini doğruladım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more broken (than)",
      "phonetic": "/mɔːr ˈbrəʊ.kən/",
      "translation": "daha bozuk"
    },
    "superlative": {
      "form": "the most broken",
      "phonetic": "/ðə məʊst ˈbrəʊ.kən/",
      "translation": "en bozuk"
    },
    "antonym": {
      "word": "working / fixed",
      "phonetic": "/wɜː.kɪŋ/",
      "translation": "çalışan / tamir edilmiş"
    }
  },
  {
    "id": "adj_114",
    "rank": 114,
    "word": "Central",
    "phonetic": "/ˈsen.trəl/",
    "translation": "Merkezi / Ana",
    "exampleEn": "The message broker plays a central role in our distributed architecture.",
    "grammarNote": "",
    "exampleTr": "Mesaj aracısı dağıtık mimarimizde merkezi bir rol oynar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more central (than)",
      "phonetic": "/mɔːr ˈsen.trəl/",
      "translation": "daha merkezi"
    },
    "superlative": {
      "form": "the most central",
      "phonetic": "/ðə məʊst ˈsen.trəl/",
      "translation": "en merkezi"
    },
    "antonym": {
      "word": "peripheral",
      "phonetic": "/pəˈrɪf.ər.əl/",
      "translation": "çevresel / kenar"
    }
  },
  {
    "id": "adj_115",
    "rank": 115,
    "word": "Certain",
    "phonetic": "/ˈsɜː.tən/",
    "translation": "Kesin / Emin",
    "exampleEn": "I am certain that our team will deliver the release on schedule.",
    "grammarNote": "",
    "exampleTr": "Ekibimizin sürümü takvime uygun şekilde teslim edeceğinden eminim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more certain (than)",
      "phonetic": "/mɔːr ˈsɜː.tən/",
      "translation": "daha emin"
    },
    "superlative": {
      "form": "the most certain",
      "phonetic": "/ðə məʊst ˈsɜː.tən/",
      "translation": "en kesin"
    },
    "antonym": {
      "word": "uncertain",
      "phonetic": "/ʌnˈsɜː.tən/",
      "translation": "belirsiz"
    }
  },
  {
    "id": "adj_116",
    "rank": 116,
    "word": "Comfortable",
    "phonetic": "/ˈkʌm.fə.tə.bəl/",
    "translation": "Rahat / Konforlu",
    "exampleEn": "This ergonomic chair makes long coding sessions much more comfortable.",
    "grammarNote": "",
    "exampleTr": "Bu ergonomik sandalye uzun kodlama oturumlarını çok daha rahat hale getirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more comfortable (than)",
      "phonetic": "/mɔːr ˈkʌm.fə.tə.bəl/",
      "translation": "daha rahat"
    },
    "superlative": {
      "form": "the most comfortable",
      "phonetic": "/ðə məʊst ˈkʌm.fə.tə.bəl/",
      "translation": "en rahat"
    },
    "antonym": {
      "word": "uncomfortable",
      "phonetic": "/ʌnˈkʌm.fə.tə.bəl/",
      "translation": "rahatsız"
    }
  },
  {
    "id": "adj_117",
    "rank": 117,
    "word": "Commercial",
    "phonetic": "/kəˈmɜː.ʃəl/",
    "translation": "Ticari",
    "exampleEn": "We deployed our first commercial e-commerce web platform.",
    "grammarNote": "",
    "exampleTr": "İlk ticari e-ticaret web platformumuzu yayına aldık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more commercial (than)",
      "phonetic": "/mɔːr kəˈmɜː.ʃəl/",
      "translation": "daha ticari"
    },
    "superlative": {
      "form": "the most commercial",
      "phonetic": "/ðə məʊst kəˈmɜː.ʃəl/",
      "translation": "en ticari"
    },
    "antonym": {
      "word": "non-profit / personal",
      "phonetic": "/nɒnˈprɒf.ɪt/",
      "translation": "kâr amacı gütmeyen"
    }
  },
  {
    "id": "adj_118",
    "rank": 118,
    "word": "Complete",
    "phonetic": "/kəmˈpliːt/",
    "translation": "Tam / Eksiksiz",
    "exampleEn": "The repository contains complete documentation and code samples.",
    "grammarNote": "",
    "exampleTr": "Depo eksiksiz dokümantasyon ve kod örnekleri içerir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more complete (than)",
      "phonetic": "/mɔːr kəmˈpliːt/",
      "translation": "daha eksiksiz"
    },
    "superlative": {
      "form": "the most complete",
      "phonetic": "/ðə məʊst kəmˈpliːt/",
      "translation": "en eksiksiz"
    },
    "antonym": {
      "word": "incomplete",
      "phonetic": "/ˌɪn.kəmˈpliːt/",
      "translation": "eksik"
    }
  },
  {
    "id": "adj_119",
    "rank": 119,
    "word": "Confident",
    "phonetic": "/ˈkɒn.fɪ.dənt/",
    "translation": "Özgüvenli / Kendinden emin",
    "exampleEn": "I feel confident speaking English during technical job interviews.",
    "grammarNote": "",
    "exampleTr": "Teknik iş mülakatları sırasında İngilizce konuşurken kendimden emin hissediyorum.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more confident (than)",
      "phonetic": "/mɔːr ˈkɒn.fɪ.dənt/",
      "translation": "daha özgüvenli"
    },
    "superlative": {
      "form": "the most confident",
      "phonetic": "/ðə məʊst ˈkɒn.fɪ.dənt/",
      "translation": "en özgüvenli"
    },
    "antonym": {
      "word": "hesitant / insecure",
      "phonetic": "/ˈhes.ɪ.tənt/",
      "translation": "tereddütlü"
    }
  },
  {
    "id": "adj_120",
    "rank": 120,
    "word": "Constant",
    "phonetic": "/ˈkɒn.stənt/",
    "translation": "Sürekli / Sabit",
    "exampleEn": "The server maintains a constant temperature in the data center.",
    "grammarNote": "",
    "exampleTr": "Sunucu veri merkezinde sabit bir sıcaklığı korur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more constant (than)",
      "phonetic": "/mɔːr ˈkɒn.stənt/",
      "translation": "daha sabit"
    },
    "superlative": {
      "form": "the most constant",
      "phonetic": "/ðə məʊst ˈkɒn.stənt/",
      "translation": "en sabit"
    },
    "antonym": {
      "word": "variable",
      "phonetic": "/ˈveə.ri.ə.bəl/",
      "translation": "değişken"
    }
  },
  {
    "id": "adj_121",
    "rank": 121,
    "word": "Convenient",
    "phonetic": "/kənˈviː.ni.ənt/",
    "translation": "Kullanışlı / Uygun",
    "exampleEn": "Contactless mobile payments are extremely convenient for daily purchases.",
    "grammarNote": "",
    "exampleTr": "Temassız mobil ödemeler günlük alışverişler için son derece kullanışlıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more convenient (than)",
      "phonetic": "/mɔːr kənˈviː.ni.ənt/",
      "translation": "daha kullanışlı"
    },
    "superlative": {
      "form": "the most convenient",
      "phonetic": "/ðə məʊst kənˈviː.ni.ənt/",
      "translation": "en kullanışlı"
    },
    "antonym": {
      "word": "inconvenient",
      "phonetic": "/ˌɪn.kənˈviː.ni.ənt/",
      "translation": "zahmetli"
    }
  },
  {
    "id": "adj_122",
    "rank": 122,
    "word": "Cool",
    "phonetic": "/kuːl/",
    "translation": "Serin / Havalı",
    "exampleEn": "The cooling fans keep the server hardware cool under peak load.",
    "grammarNote": "",
    "exampleTr": "Soğutma fanları sunucu donanımını yoğun yük altında serin tutar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cooler (than)",
      "phonetic": "/ˈkuː.lər/",
      "translation": "daha serin"
    },
    "superlative": {
      "form": "the coolest",
      "phonetic": "/ðə ˈkuː.lɪst/",
      "translation": "en serin / havalı"
    },
    "antonym": {
      "word": "warm",
      "phonetic": "/wɔːm/",
      "translation": "ılık / sıcak"
    }
  },
  {
    "id": "adj_123",
    "rank": 123,
    "word": "Crazy",
    "phonetic": "/ˈkreɪ.zi/",
    "translation": "Çılgın / İnanılmaz",
    "exampleEn": "The traffic surge during the black Friday sale was crazy.",
    "grammarNote": "",
    "exampleTr": "Efsane Cuma satışı sırasındaki trafik artışı inanılmazdı / çılgıncaydı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "crazier (than)",
      "phonetic": "/ˈkreɪ.zi.ər/",
      "translation": "daha çılgın"
    },
    "superlative": {
      "form": "the craziest",
      "phonetic": "/ðə ˈkreɪ.zi.ɪst/",
      "translation": "en çılgın"
    },
    "antonym": {
      "word": "sensible / sane",
      "phonetic": "/ˈsen.sə.bəl/",
      "translation": "mantıklı"
    }
  },
  {
    "id": "adj_124",
    "rank": 124,
    "word": "Critical",
    "phonetic": "/ˈkrɪt.ɪ.kəl/",
    "translation": "Kritik / Hayati",
    "exampleEn": "We deployed an emergency hotfix to resolve a critical security bug.",
    "grammarNote": "",
    "exampleTr": "Kritik bir güvenlik hatasını çözmek için acil bir yama dağıttık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more critical (than)",
      "phonetic": "/mɔːr ˈkrɪt.ɪ.kəl/",
      "translation": "daha kritik"
    },
    "superlative": {
      "form": "the most critical",
      "phonetic": "/ðə məʊst ˈkrɪt.ɪ.kəl/",
      "translation": "en kritik"
    },
    "antonym": {
      "word": "trivial",
      "phonetic": "/ˈtrɪv.i.əl/",
      "translation": "önemsiz"
    }
  },
  {
    "id": "adj_125",
    "rank": 125,
    "word": "Crucial",
    "phonetic": "/ˈkruː.ʃəl/",
    "translation": "Hayati / Çok önemli",
    "exampleEn": "Automated backups are crucial for business continuity and disaster recovery.",
    "grammarNote": "",
    "exampleTr": "Otomatik yedeklemeler iş sürekliliği ve felaket kurtarma için hayati önem taşır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more crucial (than)",
      "phonetic": "/mɔːr ˈkruː.ʃəl/",
      "translation": "daha hayati"
    },
    "superlative": {
      "form": "the most crucial",
      "phonetic": "/ðə məʊst ˈkruː.ʃəl/",
      "translation": "en hayati"
    },
    "antonym": {
      "word": "optional",
      "phonetic": "/ˈɒp.ʃən.əl/",
      "translation": "isteğe bağlı"
    }
  },
  {
    "id": "adj_126",
    "rank": 126,
    "word": "Curious",
    "phonetic": "/ˈkjʊə.ri.əs/",
    "translation": "Meraklı",
    "exampleEn": "A curious developer constantly experiments with new software technologies.",
    "grammarNote": "",
    "exampleTr": "Meraklı bir geliştirici sürekli yeni yazılım teknolojileriyle denemeler yapar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more curious (than)",
      "phonetic": "/mɔːr ˈkjʊə.ri.əs/",
      "translation": "daha meraklı"
    },
    "superlative": {
      "form": "the most curious",
      "phonetic": "/ðə məʊst ˈkjʊə.ri.əs/",
      "translation": "en meraklı"
    },
    "antonym": {
      "word": "indifferent",
      "phonetic": "/ɪnˈdɪf.ər.ənt/",
      "translation": "kayıtsız"
    }
  },
  {
    "id": "adj_127",
    "rank": 127,
    "word": "Current",
    "phonetic": "/ˈkʌr.ənt/",
    "translation": "Mevcut / Güncel",
    "exampleEn": "The current version of our application supports Android 15\\.",
    "grammarNote": "",
    "exampleTr": "Uygulamamızın mevcut sürümü Android 15'i desteklemektedir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more current (than)",
      "phonetic": "/mɔːr ˈkʌr.ənt/",
      "translation": "daha güncel"
    },
    "superlative": {
      "form": "the most current",
      "phonetic": "/ðə məʊst ˈkʌr.ənt/",
      "translation": "en güncel"
    },
    "antonym": {
      "word": "outdated",
      "phonetic": "/ˈaʊtˌdeɪ.tɪd/",
      "translation": "eski / çağdışı"
    }
  },
  {
    "id": "adj_128",
    "rank": 128,
    "word": "Daily",
    "phonetic": "/ˈdeɪ.li/",
    "translation": "Günlük",
    "exampleEn": "I practice English vocabulary and grammar as part of my daily routine.",
    "grammarNote": "",
    "exampleTr": "Günlük rutinimin bir parçası olarak İngilizce kelime ve gramer pratiği yaparım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more daily (than)",
      "phonetic": "/mɔːr ˈdeɪ.li/",
      "translation": "daha günlük"
    },
    "superlative": {
      "form": "the most daily",
      "phonetic": "/ðə məʊst ˈdeɪ.li/",
      "translation": "en günlük"
    },
    "antonym": {
      "word": "occasional",
      "phonetic": "/əˈkeɪ.ʒən.əl/",
      "translation": "ara sıra olan"
    }
  },
  {
    "id": "adj_129",
    "rank": 129,
    "word": "Dead",
    "phonetic": "/ded/",
    "translation": "Ölü / Yanıt vermeyen",
    "exampleEn": "The battery on my test device was completely dead this morning.",
    "grammarNote": "",
    "exampleTr": "Test cihazımın pili bu sabah tamamen bitmişti / ölüydü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dead (than)",
      "phonetic": "/mɔːr ded/",
      "translation": "daha ölü"
    },
    "superlative": {
      "form": "the most dead",
      "phonetic": "/ðə məʊst ded/",
      "translation": "en ölü"
    },
    "antonym": {
      "word": "alive",
      "phonetic": "/əˈlaɪv/",
      "translation": "canlı"
    }
  },
  {
    "id": "adj_130",
    "rank": 130,
    "word": "Dear",
    "phonetic": "/dɪər/",
    "translation": "Değerli / Sevgili",
    "exampleEn": "My university friends and family are very dear to me.",
    "grammarNote": "",
    "exampleTr": "Üniversite arkadaşlarım ve ailem benim için çok değerlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "dearer (than)",
      "phonetic": "/ˈdɪə.rər/",
      "translation": "daha değerli"
    },
    "superlative": {
      "form": "the dearest",
      "phonetic": "/ðə ˈdɪə.rɪst/",
      "translation": "en değerli"
    },
    "antonym": {
      "word": "worthless",
      "phonetic": "/tʃiːp/",
      "translation": "değersiz"
    }
  },
  {
    "id": "adj_131",
    "rank": 131,
    "word": "Decisive",
    "phonetic": "/dɪˈsaɪ.sɪv/",
    "translation": "Kararlı / Belirleyici",
    "exampleEn": "Our lead architect made a decisive move to adopt cloud computing.",
    "grammarNote": "",
    "exampleTr": "Baş mimarımız bulut bilişimi benimsemek için belirleyici bir hamle yaptı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more decisive (than)",
      "phonetic": "/mɔːr dɪˈsaɪ.sɪv/",
      "translation": "daha kararlı"
    },
    "superlative": {
      "form": "the most decisive",
      "phonetic": "/ðə məʊst dɪˈsaɪ.sɪv/",
      "translation": "en kararlı"
    },
    "antonym": {
      "word": "indecisive",
      "phonetic": "/ˌɪn.dɪˈsaɪ.sɪv/",
      "translation": "kararsız"
    }
  },
  {
    "id": "adj_132",
    "rank": 132,
    "word": "Definite",
    "phonetic": "/ˈdef.ɪ.nət/",
    "translation": "Kesin / Belirli",
    "exampleEn": "We have a definite schedule for the upcoming production release.",
    "grammarNote": "",
    "exampleTr": "Yaklaşan canlı ortam sürümü için kesin bir takvimimiz var.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more definite (than)",
      "phonetic": "/mɔːr ˈdef.ɪ.nət/",
      "translation": "daha kesin"
    },
    "superlative": {
      "form": "the most definite",
      "phonetic": "/ðə məʊst ˈdef.ɪ.nət/",
      "translation": "en kesin"
    },
    "antonym": {
      "word": "indefinite",
      "phonetic": "/ɪnˈdef.ɪ.nət/",
      "translation": "belirsiz"
    }
  },
  {
    "id": "adj_133",
    "rank": 133,
    "word": "Direct",
    "phonetic": "/daɪˈrekt/",
    "translation": "Doğrudan / Düz",
    "exampleEn": "The mobile client establishes a direct WebSocket connection to the server.",
    "grammarNote": "",
    "exampleTr": "Mobil istemci sunucuya doğrudan bir WebSocket bağlantısı kurar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more direct (than)",
      "phonetic": "/mɔːr daɪˈrekt/",
      "translation": "daha doğrudan"
    },
    "superlative": {
      "form": "the most direct",
      "phonetic": "/ðə məʊst daɪˈrekt/",
      "translation": "en doğrudan"
    },
    "antonym": {
      "word": "indirect",
      "phonetic": "/ˌɪn.daɪˈrekt/",
      "translation": "dolaylı"
    }
  },
  {
    "id": "adj_134",
    "rank": 134,
    "word": "Distant",
    "phonetic": "/ˈdɪs.tənt/",
    "translation": "Uzak / Mesafeli",
    "exampleEn": "Data packets travel to distant cloud servers in under fifty milliseconds.",
    "grammarNote": "",
    "exampleTr": "Veri paketleri uzak bulut sunucularına elli milisaniyenin altında ulaşır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more distant (than)",
      "phonetic": "/mɔːr ˈdɪs.tənt/",
      "translation": "daha uzak"
    },
    "superlative": {
      "form": "the most distant",
      "phonetic": "/ðə məʊst ˈdɪs.tənt/",
      "translation": "en uzak"
    },
    "antonym": {
      "word": "near / close",
      "phonetic": "/nɪər/",
      "translation": "yakın"
    }
  },
  {
    "id": "adj_135",
    "rank": 135,
    "word": "Double",
    "phonetic": "/ˈdʌb.əl/",
    "translation": "Çift / İki kat",
    "exampleEn": "I used a double-check validation mechanism to verify user input.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı girdisini doğrulamak için çift kontrollü bir doğrulama mekanizması kullandım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more double (than)",
      "phonetic": "/mɔːr ˈdʌb.əl/",
      "translation": "daha çift"
    },
    "superlative": {
      "form": "the most double",
      "phonetic": "/ðə məʊst ˈdʌb.əl/",
      "translation": "en çift"
    },
    "antonym": {
      "word": "single",
      "phonetic": "/ˈsɪŋ.ɡəl/",
      "translation": "tek"
    }
  },
  {
    "id": "adj_136",
    "rank": 136,
    "word": "Due",
    "phonetic": "/djuː/",
    "translation": "Vadesi gelmiş / Beklenen",
    "exampleEn": "The project milestone report is due tomorrow afternoon.",
    "grammarNote": "",
    "exampleTr": "Proje kilometre taşı raporunun teslimi yarın öğleden sonradır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more due (than)",
      "phonetic": "/mɔːr djuː/",
      "translation": "daha vadesi gelmiş"
    },
    "superlative": {
      "form": "the most due",
      "phonetic": "/ðə məʊst djuː/",
      "translation": "en çok beklenen"
    },
    "antonym": {
      "word": "overdue",
      "phonetic": "/ˌəʊ.vəˈdjuː/",
      "translation": "gecikmiş"
    }
  },
  {
    "id": "adj_137",
    "rank": 137,
    "word": "Eager",
    "phonetic": "/ˈiː.ɡər/",
    "translation": "İstekli / Hevesli",
    "exampleEn": "The student developers were eager to learn advanced Jetpack Compose.",
    "grammarNote": "",
    "exampleTr": "Öğrenci geliştiriciler ileri düzey Jetpack Compose öğrenmeye çok hevesliydi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more eager (than)",
      "phonetic": "/mɔːr ˈiː.ɡər/",
      "translation": "daha istekli"
    },
    "superlative": {
      "form": "the most eager",
      "phonetic": "/ðə məʊst ˈiː.ɡər/",
      "translation": "en istekli"
    },
    "antonym": {
      "word": "reluctant",
      "phonetic": "/rɪˈlʌk.tənt/",
      "translation": "gönülsüz"
    }
  },
  {
    "id": "adj_138",
    "rank": 138,
    "word": "Educational",
    "phonetic": "/ˌedʒ.uˈkeɪ.ʃən.əl/",
    "translation": "Eğitici / Öğretici",
    "exampleEn": "We built an interactive educational coding game for children.",
    "grammarNote": "",
    "exampleTr": "Çocuklar için etkileşimli eğitici bir kodlama oyunu inşa ettik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more educational (than)",
      "phonetic": "/mɔːr ˌedʒ.uˈkeɪ.ʃən.əl/",
      "translation": "daha eğitici"
    },
    "superlative": {
      "form": "the most educational",
      "phonetic": "/ðə məʊst ˌedʒ.uˈkeɪ.ʃən.əl/",
      "translation": "en eğitici"
    },
    "antonym": {
      "word": "uninformative",
      "phonetic": "/ˌʌn.ɪnˈfɔː.mə.tɪv/",
      "translation": "bilgisiz"
    }
  },
  {
    "id": "adj_139",
    "rank": 139,
    "word": "Elastic",
    "phonetic": "/ɪˈlæs.tɪk/",
    "translation": "Esnek / Elastik",
    "exampleEn": "Cloud auto-scaling provides elastic computing power during traffic spikes.",
    "grammarNote": "",
    "exampleTr": "Bulut otomatik ölçeklendirme trafik artışlarında esnek hesaplama gücü sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more elastic (than)",
      "phonetic": "/mɔːr ɪˈlæs.tɪk/",
      "translation": "daha esnek"
    },
    "superlative": {
      "form": "the most elastic",
      "phonetic": "/ðə məʊst ɪˈlæs.tɪk/",
      "translation": "en esnek"
    },
    "antonym": {
      "word": "rigid / inelastic",
      "phonetic": "/ˈrɪdʒ.ɪd/",
      "translation": "katı / esnemez"
    }
  },
  {
    "id": "adj_140",
    "rank": 140,
    "word": "Electric",
    "phonetic": "/ɪˈlek.trɪk/",
    "translation": "Elektrikli",
    "exampleEn": "I ride an electric bicycle to commute to the university every day.",
    "grammarNote": "",
    "exampleTr": "Her gün üniversiteye gitmek için elektrikli bir bisiklete binerim.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more electric (than)",
      "phonetic": "/mɔːr ɪˈlek.trɪk/",
      "translation": "daha elektrikli"
    },
    "superlative": {
      "form": "the most electric",
      "phonetic": "/ðə məʊst ɪˈlek.trɪk/",
      "translation": "en elektrikli"
    },
    "antonym": {
      "word": "manual",
      "phonetic": "/ˈmæn.ju.əl/",
      "translation": "manuel"
    }
  },
  {
    "id": "adj_141",
    "rank": 141,
    "word": "Electronic",
    "phonetic": "/ˌel.ekˈtrɒn.ɪk/",
    "translation": "Elektronik",
    "exampleEn": "We created an electronic visa appointment booking portal.",
    "grammarNote": "",
    "exampleTr": "Elektronik bir vize randevu alma portalı oluşturduk.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more electronic (than)",
      "phonetic": "/mɔːr ˌel.ekˈtrɒn.ɪk/",
      "translation": "daha elektronik"
    },
    "superlative": {
      "form": "the most electronic",
      "phonetic": "/ðə məʊst ˌel.ekˈtrɒn.ɪk/",
      "translation": "en elektronik"
    },
    "antonym": {
      "word": "analog",
      "phonetic": "/ˈæn.ə.lɒɡ/",
      "translation": "analog"
    }
  },
  {
    "id": "adj_142",
    "rank": 142,
    "word": "Elementary",
    "phonetic": "/ˌel.ɪˈmen.tər.i/",
    "translation": "Temel / Başlangıç düzeyi",
    "exampleEn": "These grammar lessons cover elementary A2 English structures.",
    "grammarNote": "",
    "exampleTr": "Bu gramer dersleri temel A2 İngilizce yapılarını kapsar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more elementary (than)",
      "phonetic": "/mɔːr ˌel.ɪˈmen.tər.i/",
      "translation": "daha temel"
    },
    "superlative": {
      "form": "the most elementary",
      "phonetic": "/ðə məʊst ˌel.ɪˈmen.tər.i/",
      "translation": "en temel"
    },
    "antonym": {
      "word": "advanced",
      "phonetic": "/ədˈvɑːnst/",
      "translation": "ileri düzey"
    }
  },
  {
    "id": "adj_143",
    "rank": 143,
    "word": "Equal",
    "phonetic": "/ˈiː.kwəl/",
    "translation": "Eşit",
    "exampleEn": "All microservice worker nodes receive an equal share of the load.",
    "grammarNote": "",
    "exampleTr": "Tüm mikroservis çalışan düğümleri yükten eşit bir pay alır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more equal (than)",
      "phonetic": "/mɔːr ˈiː.kwəl/",
      "translation": "daha eşit"
    },
    "superlative": {
      "form": "the most equal",
      "phonetic": "/ðə məʊst ˈiː.kwəl/",
      "translation": "en eşit"
    },
    "antonym": {
      "word": "unequal",
      "phonetic": "/ʌnˈiː.kwəl/",
      "translation": "eşit olmayan"
    }
  },
  {
    "id": "adj_144",
    "rank": 144,
    "word": "Essential",
    "phonetic": "/ɪˈsen.ʃəl/",
    "translation": "Vazgeçilmez / Temel",
    "exampleEn": "Version control with Git is essential for modern software engineering.",
    "grammarNote": "",
    "exampleTr": "Git ile sürüm kontrolü modern yazılım mühendisliği için vazgeçilmezdir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more essential (than)",
      "phonetic": "/mɔːr ɪˈsen.ʃəl/",
      "translation": "daha vazgeçilmez"
    },
    "superlative": {
      "form": "the most essential",
      "phonetic": "/ðə məʊst ɪˈsen.ʃəl/",
      "translation": "en vazgeçilmez"
    },
    "antonym": {
      "word": "inessential / optional",
      "phonetic": "/ˌɪn.ɪˈsen.ʃəl/",
      "translation": "isteğe bağlı"
    }
  },
  {
    "id": "adj_145",
    "rank": 145,
    "word": "Exact",
    "phonetic": "/ɪɡˈzækt/",
    "translation": "Kesin / Tam",
    "exampleEn": "The benchmark tool measured the exact execution latency in nanoseconds.",
    "grammarNote": "",
    "exampleTr": "Performans aracı kesin yürütme gecikmesini nanosaniyeler cinsinden ölçtü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more exact (than)",
      "phonetic": "/mɔːr ɪɡˈzækt/",
      "translation": "daha kesin"
    },
    "superlative": {
      "form": "the most exact",
      "phonetic": "/ðə məʊst ɪɡˈzækt/",
      "translation": "en kesin"
    },
    "antonym": {
      "word": "approximate",
      "phonetic": "/ɪn.ɪɡˈzækt/",
      "translation": "yaklaşık"
    }
  },
  {
    "id": "adj_146",
    "rank": 146,
    "word": "Excellent",
    "phonetic": "/ˈek.səl.ənt/",
    "translation": "Mükemmel / Harika",
    "exampleEn": "The team achieved excellent results in the DeepFake detection benchmarks.",
    "grammarNote": "",
    "exampleTr": "Ekip DeepFake tespit performans testlerinde mükemmel sonuçlar elde etti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more excellent (than)",
      "phonetic": "/mɔːr ˈek.səl.ənt/",
      "translation": "daha mükemmel"
    },
    "superlative": {
      "form": "the most excellent",
      "phonetic": "/ðə məʊst ˈek.səl.ənt/",
      "translation": "en mükemmel"
    },
    "antonym": {
      "word": "terrible / poor",
      "phonetic": "/ˈter.ə.bəl/",
      "translation": "berbat / kötü"
    }
  },
  {
    "id": "adj_147",
    "rank": 147,
    "word": "Excited",
    "phonetic": "/ɪkˈsaɪ.tɪd/",
    "translation": "Heyecanlı",
    "exampleEn": "I am very excited about presenting our research paper at the conference.",
    "grammarNote": "",
    "exampleTr": "Konferansta araştırma makalemizi sunacağım için çok heyecanlıyım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more excited (than)",
      "phonetic": "/mɔːr ɪkˈsaɪ.tɪd/",
      "translation": "daha heyecanlı"
    },
    "superlative": {
      "form": "the most excited",
      "phonetic": "/ðə məʊst ɪkˈsaɪ.tɪd/",
      "translation": "en heyecanlı"
    },
    "antonym": {
      "word": "bored",
      "phonetic": "/bɔːd/",
      "translation": "sıkılmış"
    }
  },
  {
    "id": "adj_148",
    "rank": 148,
    "word": "Exciting",
    "phonetic": "/ɪkˈsaɪ.tɪŋ/",
    "translation": "Heyecan verici",
    "exampleEn": "Artificial intelligence is the most exciting technology field today.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka günümüzde en heyecan verici teknoloji alanıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more exciting (than)",
      "phonetic": "/mɔːr ɪkˈsaɪ.tɪŋ/",
      "translation": "daha heyecan verici"
    },
    "superlative": {
      "form": "the most exciting",
      "phonetic": "/ðə məʊst ɪkˈsaɪ.tɪŋ/",
      "translation": "en heyecan verici"
    },
    "antonym": {
      "word": "boring",
      "phonetic": "/ˈbɔː.rɪŋ/",
      "translation": "sıkıcı"
    }
  },
  {
    "id": "adj_149",
    "rank": 149,
    "word": "Experienced",
    "phonetic": "/ɪkˈspɪə.ri.ənst/",
    "translation": "Deneyimli / Tecrübeli",
    "exampleEn": "She is an experienced full-stack software engineer and team mentor.",
    "grammarNote": "",
    "exampleTr": "O, deneyimli bir tam yığın yazılım mühendisi ve ekip mentorudur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more experienced (than)",
      "phonetic": "/mɔːr ɪkˈspɪə.ri.ənst/",
      "translation": "daha deneyimli"
    },
    "superlative": {
      "form": "the most experienced",
      "phonetic": "/ðə məʊst ɪkˈspɪə.ri.ənst/",
      "translation": "en deneyimli"
    },
    "antonym": {
      "word": "inexperienced",
      "phonetic": "/ˌɪn.ɪkˈspɪə.ri.ənst/",
      "translation": "deneyimsiz"
    }
  },
  {
    "id": "adj_150",
    "rank": 150,
    "word": "Expert",
    "phonetic": "/ˈek.spɜːt/",
    "translation": "Uzman / Mahir",
    "exampleEn": "We consulted an expert database architect to optimize our SQL queries.",
    "grammarNote": "",
    "exampleTr": "SQL sorgularımızı optimize etmek için uzman bir veritabanı mimarına danıştık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more expert (than)",
      "phonetic": "/mɔːr ˈek.spɜːt/",
      "translation": "daha uzman"
    },
    "superlative": {
      "form": "the most expert",
      "phonetic": "/ðə məʊst ˈek.spɜːt/",
      "translation": "en uzman"
    },
    "antonym": {
      "word": "novice / amateur",
      "phonetic": "/ˈnæv.ɪs/",
      "translation": "acemi"
    }
  },
  {
    "id": "adj_151",
    "rank": 151,
    "word": "Fair",
    "phonetic": "/feər/",
    "translation": "Adil / Makul",
    "exampleEn": "The company offers a fair compensation package for remote developers.",
    "grammarNote": "",
    "exampleTr": "Şirket uzaktan çalışan geliştiriciler için adil bir maaş paketi sunar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fairer (than)",
      "phonetic": "/ˈfeə.rər/",
      "translation": "daha adil"
    },
    "superlative": {
      "form": "the fairest",
      "phonetic": "/ðə ˈfeə.rɪst/",
      "translation": "en adil"
    },
    "antonym": {
      "word": "unfair",
      "phonetic": "/ʌnˈfeər/",
      "translation": "haksız / adaletsiz"
    }
  },
  {
    "id": "adj_152",
    "rank": 152,
    "word": "Familiar",
    "phonetic": "/fəˈmɪl.i.ər/",
    "translation": "Tanıdık / Aşina",
    "exampleEn": "Are you familiar with asynchronous Coroutines in Kotlin?",
    "grammarNote": "",
    "exampleTr": "Kotlin'deki eşzamansız Coroutines yapılarına aşina mısınız?",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more familiar (than)",
      "phonetic": "/mɔːr fəˈmɪl.i.ər/",
      "translation": "daha aşina"
    },
    "superlative": {
      "form": "the most familiar",
      "phonetic": "/ðə məʊst fəˈmɪl.i.ər/",
      "translation": "en aşina"
    },
    "antonym": {
      "word": "unfamiliar",
      "phonetic": "/ʌn.fəˈmɪl.i.ər/",
      "translation": "yabancı / bilinmeyen"
    }
  },
  {
    "id": "adj_153",
    "rank": 153,
    "word": "Fancy",
    "phonetic": "/ˈfæn.si/",
    "translation": "Süslü / Lüks",
    "exampleEn": "We don't need fancy UI animations; we need speed and simplicity.",
    "grammarNote": "",
    "exampleTr": "Süslü arayüz animasyonlarına ihtiyacımız yok; hıza ve sadeliğe ihtiyacımız var.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fancier (than)",
      "phonetic": "/ˈfæn.si.ər/",
      "translation": "daha süslü"
    },
    "superlative": {
      "form": "the fanciest",
      "phonetic": "/ðə ˈfæn.si.ɪst/",
      "translation": "en süslü"
    },
    "antonym": {
      "word": "plain / simple",
      "phonetic": "/pleɪn/",
      "translation": "sade"
    }
  },
  {
    "id": "adj_154",
    "rank": 154,
    "word": "Fat",
    "phonetic": "/fæt/",
    "translation": "Kalın / Şişman",
    "exampleEn": "The legacy monolithic bundle was too fat and slow to download.",
    "grammarNote": "",
    "exampleTr": "Eski monolitik paket çok kalın (ağır) ve indirmesi yavaştı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fatter (than)",
      "phonetic": "/ˈfæt.ər/",
      "translation": "daha kalın"
    },
    "superlative": {
      "form": "the fattest",
      "phonetic": "/ðə ˈfæt.ɪst/",
      "translation": "en kalın"
    },
    "antonym": {
      "word": "thin / lean",
      "phonetic": "/θɪn/",
      "translation": "ince"
    }
  },
  {
    "id": "adj_155",
    "rank": 155,
    "word": "Fearful",
    "phonetic": "/ˈfɪə.fəl/",
    "translation": "Korkulu / Endişeli",
    "exampleEn": "Junior engineers were fearful of breaking production during deployments.",
    "grammarNote": "",
    "exampleTr": "Kıdemsiz mühendisler dağıtımlar sırasında canlı ortamı bozmaktan korkuyorlardı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more fearful (than)",
      "phonetic": "/mɔːr ˈfɪə.fəl/",
      "translation": "daha korkulu"
    },
    "superlative": {
      "form": "the most fearful",
      "phonetic": "/ðə məʊst ˈfɪə.fəl/",
      "translation": "en korkulu"
    },
    "antonym": {
      "word": "fearless / brave",
      "phonetic": "/ˈfɪə.ləs/",
      "translation": "korkusuz"
    }
  },
  {
    "id": "adj_156",
    "rank": 156,
    "word": "Fearless",
    "phonetic": "/ˈfɪə.ləs/",
    "translation": "Korkusuz / Cesur",
    "exampleEn": "Our team took a fearless approach to refactoring the legacy core engine.",
    "grammarNote": "",
    "exampleTr": "Ekibimiz eski çekirdek motoru yeniden düzenleme konusunda korkusuz bir yaklaşım benimsedi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more fearless (than)",
      "phonetic": "/mɔːr ˈfɪə.ləs/",
      "translation": "daha korkusuz"
    },
    "superlative": {
      "form": "the most fearless",
      "phonetic": "/ðə məʊst ˈfɪə.ləs/",
      "translation": "en korkusuz"
    },
    "antonym": {
      "word": "fearful",
      "phonetic": "/ˈfɪə.fəl/",
      "translation": "korkak"
    }
  },
  {
    "id": "adj_157",
    "rank": 157,
    "word": "Final",
    "phonetic": "/ˈfaɪ.nəl/",
    "translation": "Nihai / Son",
    "exampleEn": "I submitted the final thesis documentation to the university committee.",
    "grammarNote": "",
    "exampleTr": "Nihai tez dokümantasyonunu üniversite komitesine sundum.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more final (than)",
      "phonetic": "/mɔːr ˈfaɪ.nəl/",
      "translation": "daha nihai"
    },
    "superlative": {
      "form": "the most final",
      "phonetic": "/ðə məʊst ˈfaɪ.nəl/",
      "translation": "en nihai"
    },
    "antonym": {
      "word": "initial / first",
      "phonetic": "/ɪˈnɪʃ.əl/",
      "translation": "ilk / başlangıç"
    }
  },
  {
    "id": "adj_158",
    "rank": 158,
    "word": "Fine",
    "phonetic": "/faɪn/",
    "translation": "İyi / İnce",
    "exampleEn": "The server performance is fine now after restarting the background daemon.",
    "grammarNote": "",
    "exampleTr": "Arka plan programını yeniden başlattıktan sonra sunucu performansı şu anda gayet iyidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "finer (than)",
      "phonetic": "/ˈfaɪ.nər/",
      "translation": "daha ince / iyi"
    },
    "superlative": {
      "form": "the finest",
      "phonetic": "/ðə ˈfaɪ.nɪst/",
      "translation": "en iyi / ince"
    },
    "antonym": {
      "word": "terrible / coarse",
      "phonetic": "/ˈter.ə.bəl/",
      "translation": "berbat"
    }
  },
  {
    "id": "adj_159",
    "rank": 159,
    "word": "Fit",
    "phonetic": "/fɪt/",
    "translation": "Uygun / Formda",
    "exampleEn": "This candidate is a great cultural and technical fit for our startup team.",
    "grammarNote": "",
    "exampleTr": "Bu aday girişim ekibimiz için harika bir kültürel ve teknik uyuma (fit) sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "fitter (than)",
      "phonetic": "/ˈfɪt.ər/",
      "translation": "daha uygun"
    },
    "superlative": {
      "form": "the fittest",
      "phonetic": "/ðə ˈfɪt.ɪst/",
      "translation": "en uygun"
    },
    "antonym": {
      "word": "unfit",
      "phonetic": "/ʌnˈfɪt/",
      "translation": "uygunsuz"
    }
  },
  {
    "id": "adj_160",
    "rank": 160,
    "word": "Fixed",
    "phonetic": "/fɪkst/",
    "translation": "Sabit / Düzeltilmiş",
    "exampleEn": "We offer our cloud SaaS platform at a predictable fixed monthly rate.",
    "grammarNote": "",
    "exampleTr": "Bulut SaaS platformumuzu öngörülebilir sabit bir aylık ücretle sunuyoruz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more fixed (than)",
      "phonetic": "/mɔːr fɪkst/",
      "translation": "daha sabit"
    },
    "superlative": {
      "form": "the most fixed",
      "phonetic": "/ðə məʊst fɪkst/",
      "translation": "en sabit"
    },
    "antonym": {
      "word": "variable / broken",
      "phonetic": "/ˈveə.ri.ə.bəl/",
      "translation": "değişken / bozuk"
    }
  },
  {
    "id": "adj_161",
    "rank": 161,
    "word": "Flat",
    "phonetic": "/flæt/",
    "translation": "Düz / Yassı",
    "exampleEn": "The application features a minimalist modern flat user interface design.",
    "grammarNote": "",
    "exampleTr": "Uygulama minimalist modern düz (flat) bir kullanıcı arayüzü tasarımına sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "flatter (than)",
      "phonetic": "/ˈflæt.ər/",
      "translation": "daha düz"
    },
    "superlative": {
      "form": "the flattest",
      "phonetic": "/ðə ˈflæt.ɪst/",
      "translation": "en düz"
    },
    "antonym": {
      "word": "steep / bumpy",
      "phonetic": "/stiːp/",
      "translation": "dik / engebeli"
    }
  },
  {
    "id": "adj_162",
    "rank": 162,
    "word": "Fluid",
    "phonetic": "/ˈfluː.ɪd/",
    "translation": "Akıcı / Değişken",
    "exampleEn": "Jetpack Compose provides fluid screen transitions and responsive layouts.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose akıcı ekran geçişleri ve duyarlı düzenler sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more fluid (than)",
      "phonetic": "/mɔːr ˈfluː.ɪd/",
      "translation": "daha akıcı"
    },
    "superlative": {
      "form": "the most fluid",
      "phonetic": "/ðə məʊst ˈfluː.ɪd/",
      "translation": "en akıcı"
    },
    "antonym": {
      "word": "rigid / static",
      "phonetic": "/ˈrɪdʒ.ɪd/",
      "translation": "katı / statik"
    }
  },
  {
    "id": "adj_163",
    "rank": 163,
    "word": "Foreign",
    "phonetic": "/ˈfɒr.ən/",
    "translation": "Yabancı",
    "exampleEn": "I communicate in English with foreign enterprise clients every week.",
    "grammarNote": "",
    "exampleTr": "Her hafta yabancı kurumsal müşterilerle İngilizce iletişim kurarım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more foreign (than)",
      "phonetic": "/mɔːr ˈfɒr.ən/",
      "translation": "daha yabancı"
    },
    "superlative": {
      "form": "the most foreign",
      "phonetic": "/ðə məʊst ˈfɒr.ən/",
      "translation": "en yabancı"
    },
    "antonym": {
      "word": "domestic / native",
      "phonetic": "/dəˈmes.tɪk/",
      "translation": "yerli"
    }
  },
  {
    "id": "adj_164",
    "rank": 164,
    "word": "Formal",
    "phonetic": "/ˈfɔː.məl/",
    "translation": "Resmi / Ciddi",
    "exampleEn": "We drafted a formal service level agreement for our corporate partners.",
    "grammarNote": "",
    "exampleTr": "Kurumsal ortaklarımız için resmi bir hizmet seviyesi sözleşmesi (SLA) hazırladık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more formal (than)",
      "phonetic": "/mɔːr ˈfɔː.məl/",
      "translation": "daha resmi"
    },
    "superlative": {
      "form": "the most formal",
      "phonetic": "/ðə məʊst ˈfɔː.məl/",
      "translation": "en resmi"
    },
    "antonym": {
      "word": "informal / casual",
      "phonetic": "/ɪnˈfɔː.məl/",
      "translation": "gayriresmi"
    }
  },
  {
    "id": "adj_165",
    "rank": 165,
    "word": "Frequent",
    "phonetic": "/ˈfriː.kwənt/",
    "translation": "Sık / Tekrarlanan",
    "exampleEn": "Frequent automated deployments reduce the risk of large software failures.",
    "grammarNote": "",
    "exampleTr": "Sık yapılan otomatik dağıtımlar büyük yazılım arızaları riskini azaltır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more frequent (than)",
      "phonetic": "/mɔːr ˈfriː.kwənt/",
      "translation": "daha sık"
    },
    "superlative": {
      "form": "the most frequent",
      "phonetic": "/ðə məʊst ˈfriː.kwənt/",
      "translation": "en sık"
    },
    "antonym": {
      "word": "infrequent / rare",
      "phonetic": "/ɪnˈfriː.kwənt/",
      "translation": "seyrek"
    }
  },
  {
    "id": "adj_166",
    "rank": 166,
    "word": "Funny",
    "phonetic": "/ˈfʌn.i/",
    "translation": "Komik / Eğlenceli",
    "exampleEn": "He shared a funny meme about JavaScript type conversions in our team chat.",
    "grammarNote": "",
    "exampleTr": "Ekip sohbetimizde JavaScript tür dönüşümleri hakkında komik bir meme paylaştı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "funnier (than)",
      "phonetic": "/ˈfʌn.i.ər/",
      "translation": "daha komik"
    },
    "superlative": {
      "form": "the funniest",
      "phonetic": "/ðə ˈfʌn.i.ɪst/",
      "translation": "en komik"
    },
    "antonym": {
      "word": "serious",
      "phonetic": "/ˈsɪə.ri.əs/",
      "translation": "ciddi"
    }
  },
  {
    "id": "adj_167",
    "rank": 167,
    "word": "Future",
    "phonetic": "/ˈfjuː.tʃər/",
    "translation": "Gelecek / İlerideki",
    "exampleEn": "We are designing our cloud database for future scale and high throughput.",
    "grammarNote": "",
    "exampleTr": "Bulut veritabanımızı gelecekteki ölçek ve yüksek işlem hacmi için tasarlıyoruz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more future (than)",
      "phonetic": "/mɔːr ˈfjuː.tʃər/",
      "translation": "daha geleceğe yönelik"
    },
    "superlative": {
      "form": "the most future",
      "phonetic": "/ðə məʊst ˈfjuː.tʃər/",
      "translation": "en geleceğe dönük"
    },
    "antonym": {
      "word": "past",
      "phonetic": "/pɑːst/",
      "translation": "geçmiş"
    }
  },
  {
    "id": "adj_168",
    "rank": 168,
    "word": "General",
    "phonetic": "/ˈdʒen.ər.əl/",
    "translation": "Genel / Kapsamlı",
    "exampleEn": "The documentation provides a general overview before going into code details.",
    "grammarNote": "",
    "exampleTr": "Dokümantasyon kod detaylarına girmeden önce genel bir genel bakış sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more general (than)",
      "phonetic": "/mɔːr ˈdʒen.ər.əl/",
      "translation": "daha genel"
    },
    "superlative": {
      "form": "the most general",
      "phonetic": "/ðə məʊst ˈdʒen.ər.əl/",
      "translation": "en genel"
    },
    "antonym": {
      "word": "specific",
      "phonetic": "/spəˈsɪf.ɪk/",
      "translation": "özel / belirli"
    }
  },
  {
    "id": "adj_169",
    "rank": 169,
    "word": "Generous",
    "phonetic": "/ˈdʒen.ər.əs/",
    "translation": "Cömert / Bol",
    "exampleEn": "The cloud provider offered a generous free tier for student developers.",
    "grammarNote": "",
    "exampleTr": "Bulut sağlayıcısı öğrenci geliştiriciler için cömert bir ücretsiz katman sundu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more generous (than)",
      "phonetic": "/mɔːr ˈdʒen.ər.əs/",
      "translation": "daha cömert"
    },
    "superlative": {
      "form": "the most generous",
      "phonetic": "/ðə məʊst ˈdʒen.ər.əs/",
      "translation": "en cömert"
    },
    "antonym": {
      "word": "stingy / mean",
      "phonetic": "/ˈstɪn.dʒi/",
      "translation": "cimri"
    }
  },
  {
    "id": "adj_170",
    "rank": 170,
    "word": "Gentle",
    "phonetic": "/ˈdʒen.təl/",
    "translation": "Nazik / Yumuşak",
    "exampleEn": "Kotlin offers a gentle learning curve for developers transitioning from Java.",
    "grammarNote": "",
    "exampleTr": "Kotlin Java'dan geçiş yapan geliştiriciler için yumuşak bir öğrenme eğrisi sunar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "gentler (than)",
      "phonetic": "/ˈdʒen.tlər/",
      "translation": "daha yumuşak"
    },
    "superlative": {
      "form": "the gentlest",
      "phonetic": "/ðə ˈdʒen.tlɪst/",
      "translation": "en yumuşak"
    },
    "antonym": {
      "word": "harsh / rough",
      "phonetic": "/hɑːʃ/",
      "translation": "sert"
    }
  },
  {
    "id": "adj_171",
    "rank": 171,
    "word": "Glad",
    "phonetic": "/ɡlæd/",
    "translation": "Memnun / Mutlu",
    "exampleEn": "I am very glad that we resolved the critical production outage so quickly.",
    "grammarNote": "",
    "exampleTr": "Kritik canlı ortam kesintisini bu kadar hızlı çözdüğümüz için çok memnunum.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "gladder (than)",
      "phonetic": "/ˈɡlæd.ər/",
      "translation": "daha memnun"
    },
    "superlative": {
      "form": "the gladdest",
      "phonetic": "/ðə ˈɡlæd.ɪst/",
      "translation": "en memnun"
    },
    "antonym": {
      "word": "sorry / sad",
      "phonetic": "/ˈsɒr.i/",
      "translation": "üzgün"
    }
  },
  {
    "id": "adj_172",
    "rank": 172,
    "word": "Global",
    "phonetic": "/ˈɡləʊ.bəl/",
    "translation": "Küresel / Dünya çapında",
    "exampleEn": "Our mobile app connects users across a global cloud network.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulamamız kullanıcıları küresel bir bulut ağı üzerinden birbirine bağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more global (than)",
      "phonetic": "/mɔːr ˈɡləʊ.bəl/",
      "translation": "daha küresel"
    },
    "superlative": {
      "form": "the most global",
      "phonetic": "/ðə məʊst ˈɡləʊ.bəl/",
      "translation": "en küresel"
    },
    "antonym": {
      "word": "local",
      "phonetic": "/ˈləʊ.kəl/",
      "translation": "yerel"
    }
  },
  {
    "id": "adj_173",
    "rank": 173,
    "word": "Grand",
    "phonetic": "/ɡrænd/",
    "translation": "Görkemli / Büyük",
    "exampleEn": "The university hosted a grand technology exhibition for student startups.",
    "grammarNote": "",
    "exampleTr": "Üniversite öğrenci girişimleri için görkemli bir teknoloji sergisine ev sahipliği yaptı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "grander (than)",
      "phonetic": "/ˈɡræn.dər/",
      "translation": "daha görkemli"
    },
    "superlative": {
      "form": "the grandest",
      "phonetic": "/ðə ˈɡræn.dɪst/",
      "translation": "en görkemli"
    },
    "antonym": {
      "word": "modest / humble",
      "phonetic": "/ˈmɒd.ɪst/",
      "translation": "mütevazı"
    }
  },
  {
    "id": "adj_174",
    "rank": 174,
    "word": "Grateful",
    "phonetic": "/ˈɡreɪt.fəl/",
    "translation": "Minnettar / Müteşekkir",
    "exampleEn": "I am grateful to my professors and mentors for their technical guidance.",
    "grammarNote": "",
    "exampleTr": "Teknik rehberlikleri için profesörlerime ve mentorlarıma minnettarım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more grateful (than)",
      "phonetic": "/mɔːr ˈɡreɪt.fəl/",
      "translation": "daha minnettar"
    },
    "superlative": {
      "form": "the most grateful",
      "phonetic": "/ðə məʊst ˈɡreɪt.fəl/",
      "translation": "en minnettar"
    },
    "antonym": {
      "word": "ungrateful",
      "phonetic": "/ʌnˈɡreɪt.fəl/",
      "translation": "nankör"
    }
  },
  {
    "id": "adj_175",
    "rank": 175,
    "word": "Great",
    "phonetic": "/ɡreɪt/",
    "translation": "Harika / Muazzam",
    "exampleEn": "The open-source community provides great support for young developers.",
    "grammarNote": "",
    "exampleTr": "Açık kaynak topluluğu genç geliştiriciler için harika bir destek sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "greater (than)",
      "phonetic": "/ˈɡreɪ.tər/",
      "translation": "daha büyük / harika"
    },
    "superlative": {
      "form": "the greatest",
      "phonetic": "/ðə ˈɡreɪ.tɪst/",
      "translation": "en harika / büyük"
    },
    "antonym": {
      "word": "terrible",
      "phonetic": "/ˈter.ə.bəl/",
      "translation": "berbat"
    }
  },
  {
    "id": "adj_176",
    "rank": 176,
    "word": "Green",
    "phonetic": "/ɡriːn/",
    "translation": "Yeşil / Çevre dostu",
    "exampleEn": "Our data center utilizes green renewable energy from solar and wind farms.",
    "grammarNote": "",
    "exampleTr": "Veri merkezimiz güneş ve rüzgar santrallerinden gelen yeşil yenilenebilir enerjiyi kullanır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "greener (than)",
      "phonetic": "/ˈɡriː.nər/",
      "translation": "daha yeşil"
    },
    "superlative": {
      "form": "the greenest",
      "phonetic": "/ðə ˈɡriː.nɪst/",
      "translation": "en yeşil"
    },
    "antonym": {
      "word": "polluting",
      "phonetic": "/pəˈluː.tɪŋ/",
      "translation": "kirletici"
    }
  },
  {
    "id": "adj_177",
    "rank": 177,
    "word": "Harmful",
    "phonetic": "/ˈhɑːm.fəl/",
    "translation": "Zararlı",
    "exampleEn": "Unsanitized user inputs can execute harmful SQL injection commands.",
    "grammarNote": "",
    "exampleTr": "Temizlenmemiş kullanıcı girdileri zararlı SQL enjeksiyonu komutları çalıştırabilir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more harmful (than)",
      "phonetic": "/mɔːr ˈhɑːm.fəl/",
      "translation": "daha zararlı"
    },
    "superlative": {
      "form": "the most harmful",
      "phonetic": "/ðə məʊst ˈhɑːm.fəl/",
      "translation": "en zararlı"
    },
    "antonym": {
      "word": "harmless / beneficial",
      "phonetic": "/ˈhɑːm.ləs/",
      "translation": "zararsız / faydalı"
    }
  },
  {
    "id": "adj_178",
    "rank": 178,
    "word": "Harmless",
    "phonetic": "/ˈhɑːm.ləs/",
    "translation": "Zararsız",
    "exampleEn": "The compiler warning was completely harmless and did not affect build output.",
    "grammarNote": "",
    "exampleTr": "Derleyici uyarısı tamamen zararsızdı ve derleme çıktısını etkilemedi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more harmless (than)",
      "phonetic": "/mɔːr ˈhɑːm.ləs/",
      "translation": "daha zararsız"
    },
    "superlative": {
      "form": "the most harmless",
      "phonetic": "/ðə məʊst ˈhɑːm.ləs/",
      "translation": "en zararsız"
    },
    "antonym": {
      "word": "harmful",
      "phonetic": "/ˈhɑːm.fəl/",
      "translation": "zararlı"
    }
  },
  {
    "id": "adj_179",
    "rank": 179,
    "word": "Harsh",
    "phonetic": "/hɑːʃ/",
    "translation": "Sert / Ağır",
    "exampleEn": "The embedded microcontroller is engineered to operate in harsh weather environments.",
    "grammarNote": "",
    "exampleTr": "Gömülü mikrodenetleyici sert hava koşullarında çalışacak şekilde tasarlanmıştır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "harsher (than)",
      "phonetic": "/ˈhɑː.ʃər/",
      "translation": "daha sert"
    },
    "superlative": {
      "form": "the harshest",
      "phonetic": "/ðə ˈhɑː.ʃɪst/",
      "translation": "en sert"
    },
    "antonym": {
      "word": "mild / gentle",
      "phonetic": "/maɪld/",
      "translation": "hafif / yumuşak"
    }
  },
  {
    "id": "adj_180",
    "rank": 180,
    "word": "Helpful",
    "phonetic": "/ˈhelp.fəl/",
    "translation": "Yardımsever / Faydalı",
    "exampleEn": "The senior architect provided helpful feedback on our system design.",
    "grammarNote": "",
    "exampleTr": "Kıdemli mimar sistem tasarımımız hakkında faydalı geri bildirimler sağladı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more helpful (than)",
      "phonetic": "/mɔːr ˈhelp.fəl/",
      "translation": "daha faydalı"
    },
    "superlative": {
      "form": "the most helpful",
      "phonetic": "/ðə məʊst ˈhelp.fəl/",
      "translation": "en faydalı"
    },
    "antonym": {
      "word": "unhelpful",
      "phonetic": "/ʌnˈhelp.fəl/",
      "translation": "faydasız"
    }
  },
  {
    "id": "adj_181",
    "rank": 181,
    "word": "Huge",
    "phonetic": "/hjuːdʒ/",
    "translation": "Devasa / Çok büyük",
    "exampleEn": "The web platform handled a huge volume of database transactions today.",
    "grammarNote": "",
    "exampleTr": "Web platformu bugün devasa miktarda veritabanı işlemini yönetti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "huger (than)",
      "phonetic": "/ˈhjuː.dʒər/",
      "translation": "daha devasa"
    },
    "superlative": {
      "form": "the hugest",
      "phonetic": "/ðə ˈhjuː.dʒɪst/",
      "translation": "en devasa"
    },
    "antonym": {
      "word": "tiny",
      "phonetic": "/ˈtaɪ.ni/",
      "translation": "minik"
    }
  },
  {
    "id": "adj_182",
    "rank": 182,
    "word": "Human",
    "phonetic": "/ˈhjuː.mən/",
    "translation": "İnsani / İnsan",
    "exampleEn": "Human oversight remains essential when deploying autonomous AI models.",
    "grammarNote": "",
    "exampleTr": "Otonom yapay zeka modellerini dağıtırken insan denetimi vazgeçilmez olmaya devam eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more human (than)",
      "phonetic": "/mɔːr ˈhjuː.mən/",
      "translation": "daha insani"
    },
    "superlative": {
      "form": "the most human",
      "phonetic": "/ðə məʊst ˈhjuː.mən/",
      "translation": "en insani"
    },
    "antonym": {
      "word": "inhuman / artificial",
      "phonetic": "/ɪnˈhjuː.mən/",
      "translation": "insanlık dışı / yapay"
    }
  },
  {
    "id": "adj_183",
    "rank": 183,
    "word": "Ideal",
    "phonetic": "/aɪˈdɪəl/",
    "translation": "İdeal / Kusursuz",
    "exampleEn": "FastAPI is an ideal framework for building high-performance Python APIs.",
    "grammarNote": "",
    "exampleTr": "FastAPI yüksek performanslı Python API'leri inşa etmek için ideal bir çatıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more ideal (than)",
      "phonetic": "/mɔːr aɪˈdɪəl/",
      "translation": "daha ideal"
    },
    "superlative": {
      "form": "the most ideal",
      "phonetic": "/ðə məʊst aɪˈdɪəl/",
      "translation": "en ideal"
    },
    "antonym": {
      "word": "flawed",
      "phonetic": "/flɔːd/",
      "translation": "kusurlu"
    }
  },
  {
    "id": "adj_184",
    "rank": 184,
    "word": "Identical",
    "phonetic": "/aɪˈden.tɪ.kəl/",
    "translation": "Birebir aynı / Özdeş",
    "exampleEn": "The staging environment must be identical to production configuration.",
    "grammarNote": "",
    "exampleTr": "Test ortamı canlı ortam yapılandırmasıyla birebir aynı / özdeş olmalıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more identical (than)",
      "phonetic": "/mɔːr aɪˈden.tɪ.kəl/",
      "translation": "daha özdeş"
    },
    "superlative": {
      "form": "the most identical",
      "phonetic": "/ðə məʊst aɪˈden.tɪ.kəl/",
      "translation": "en özdeş"
    },
    "antonym": {
      "word": "different",
      "phonetic": "/ˈdɪf.ər.ənt/",
      "translation": "farklı"
    }
  },
  {
    "id": "adj_185",
    "rank": 185,
    "word": "Immediate",
    "phonetic": "/ɪˈmiː.di.ət/",
    "translation": "Anında / Acil",
    "exampleEn": "Critical security vulnerabilities require immediate patching from DevOps.",
    "grammarNote": "",
    "exampleTr": "Kritik güvenlik açıkları DevOps ekibinden anında yamalama gerektirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more immediate (than)",
      "phonetic": "/mɔːr ɪˈmiː.di.ət/",
      "translation": "daha anında"
    },
    "superlative": {
      "form": "the most immediate",
      "phonetic": "/ðə məʊst ɪˈmiː.di.ət/",
      "translation": "en acil"
    },
    "antonym": {
      "word": "delayed",
      "phonetic": "/dɪˈleɪd/",
      "translation": "gecikmeli"
    }
  },
  {
    "id": "adj_186",
    "rank": 186,
    "word": "Initial",
    "phonetic": "/ɪˈnɪʃ.əl/",
    "translation": "İlk / Başlangıçtaki",
    "exampleEn": "Our initial prototype achieved 90% accuracy before fine-tuning.",
    "grammarNote": "",
    "exampleTr": "İlk prototipimiz ince ayardan önce %90 doğruluğa ulaştı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more initial (than)",
      "phonetic": "/mɔːr ɪˈnɪʃ.əl/",
      "translation": "daha başlangıç"
    },
    "superlative": {
      "form": "the most initial",
      "phonetic": "/ðə məʊst ɪˈnɪʃ.əl/",
      "translation": "en ilk"
    },
    "antonym": {
      "word": "final",
      "phonetic": "/ˈfaɪ.nəl/",
      "translation": "nihai / son"
    }
  },
  {
    "id": "adj_187",
    "rank": 187,
    "word": "Inner",
    "phonetic": "/ˈɪn.ər/",
    "translation": "İç / Dahili",
    "exampleEn": "The inner loop of the sorting algorithm executes in constant time.",
    "grammarNote": "",
    "exampleTr": "Sıralama algoritmasının iç döngüsü sabit zamanda çalışır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more inner (than)",
      "phonetic": "/mɔːr ˈɪn.ər/",
      "translation": "daha iç"
    },
    "superlative": {
      "form": "the innermost",
      "phonetic": "/ðə ˈɪn.ə.mɪst/",
      "translation": "en içteki"
    },
    "antonym": {
      "word": "outer",
      "phonetic": "/ˈaʊ.tər/",
      "translation": "dış"
    }
  },
  {
    "id": "adj_188",
    "rank": 188,
    "word": "Innocent",
    "phonetic": "/ˈɪn.ə.sənt/",
    "translation": "Masum / Zararsız",
    "exampleEn": "An innocent looking syntax typo caused a major compilation failure.",
    "grammarNote": "",
    "exampleTr": "Masum görünen bir sözdizimi yazım hatası büyük bir derleme hatasına yol açtı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more innocent (than)",
      "phonetic": "/mɔːr ˈɪn.ə.sənt/",
      "translation": "daha masum"
    },
    "superlative": {
      "form": "the most innocent",
      "phonetic": "/ðə məʊst ˈɪn.ə.sənt/",
      "translation": "en masum"
    },
    "antonym": {
      "word": "guilty",
      "phonetic": "/ˈɡɪl.ti/",
      "translation": "suçlu"
    }
  },
  {
    "id": "adj_189",
    "rank": 189,
    "word": "Interactive",
    "phonetic": "/ˌɪn.təˈræk.tɪv/",
    "translation": "Etkileşimli",
    "exampleEn": "We built an interactive educational dashboard for English language learners.",
    "grammarNote": "",
    "exampleTr": "İngilizce öğrenenler için etkileşimli bir eğitici kontrol paneli inşa ettik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more interactive (than)",
      "phonetic": "/mɔːr ˌɪn.təˈræk.tɪv/",
      "translation": "daha etkileşimli"
    },
    "superlative": {
      "form": "the most interactive",
      "phonetic": "/ðə məʊst ˌɪn.təˈræk.tɪv/",
      "translation": "en etkileşimli"
    },
    "antonym": {
      "word": "static / passive",
      "phonetic": "/ˈstæt.ɪk/",
      "translation": "statik"
    }
  },
  {
    "id": "adj_190",
    "rank": 190,
    "word": "Internal",
    "phonetic": "/ɪnˈtɜː.nəl/",
    "translation": "Dahili / İç",
    "exampleEn": "The internal server error 500 was resolved by restarting the database pool.",
    "grammarNote": "",
    "exampleTr": "500 dahili sunucu hatası veritabanı havuzunu yeniden başlatarak çözüldü.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more internal (than)",
      "phonetic": "/mɔːr ɪnˈtɜː.nəl/",
      "translation": "daha dahili"
    },
    "superlative": {
      "form": "the most internal",
      "phonetic": "/ðə məʊst ɪnˈtɜː.nəl/",
      "translation": "en dahili"
    },
    "antonym": {
      "word": "external",
      "phonetic": "/ekˈstɜː.nəl/",
      "translation": "harici / dış"
    }
  },
  {
    "id": "adj_191",
    "rank": 191,
    "word": "External",
    "phonetic": "/ekˈstɜː.nəl/",
    "translation": "Harici / Dış",
    "exampleEn": "Our application communicates securely with external payment gateways.",
    "grammarNote": "",
    "exampleTr": "Uygulamamız harici ödeme ağ geçitleriyle güvenli bir şekilde iletişim kurar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more external (than)",
      "phonetic": "/mɔːr ekˈstɜː.nəl/",
      "translation": "daha harici"
    },
    "superlative": {
      "form": "the most external",
      "phonetic": "/ðə məʊst ekˈstɜː.nəl/",
      "translation": "en harici"
    },
    "antonym": {
      "word": "internal",
      "phonetic": "/ɪnˈtɜː.nəl/",
      "translation": "dahili / iç"
    }
  },
  {
    "id": "adj_192",
    "rank": 192,
    "word": "Keen",
    "phonetic": "/kiːn/",
    "translation": "İstekli / Keskin",
    "exampleEn": "He is very keen on learning cloud architecture and Kubernetes orchestration.",
    "grammarNote": "",
    "exampleTr": "Bulut mimarisi ve Kubernetes orkestrasyonunu öğrenmeye çok heveslidir / isteklidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "keener (than)",
      "phonetic": "/ˈkiː.nər/",
      "translation": "daha istekli"
    },
    "superlative": {
      "form": "the keenest",
      "phonetic": "/ðə ˈkiː.nɪst/",
      "translation": "en istekli"
    },
    "antonym": {
      "word": "reluctant",
      "phonetic": "/rɪˈlʌk.tənt/",
      "translation": "gönülsüz"
    }
  },
  {
    "id": "adj_193",
    "rank": 193,
    "word": "Key",
    "phonetic": "/kiː/",
    "translation": "Kilit / Temel",
    "exampleEn": "Horizontal scalability is a key requirement for enterprise SaaS platforms.",
    "grammarNote": "",
    "exampleTr": "Yatay ölçeklenebilirlik kurumsal SaaS platformları için kilit bir gereksinimdir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more key (than)",
      "phonetic": "/mɔːr kiː/",
      "translation": "daha kilit"
    },
    "superlative": {
      "form": "the most key",
      "phonetic": "/ðə məʊst kiː/",
      "translation": "en kilit"
    },
    "antonym": {
      "word": "minor / peripheral",
      "phonetic": "/ˈmaɪ.nər/",
      "translation": "önemsiz"
    }
  },
  {
    "id": "adj_194",
    "rank": 194,
    "word": "Kind",
    "phonetic": "/kaɪnd/",
    "translation": "Kibar / Nazik",
    "exampleEn": "She is a kind mentor who always helps junior developers patiently.",
    "grammarNote": "",
    "exampleTr": "O, kıdemsiz geliştiricilere her zaman sabırla yardım eden nazik bir mentordur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "kinder (than)",
      "phonetic": "/ˈkaɪn.dər/",
      "translation": "daha nazik"
    },
    "superlative": {
      "form": "the kindest",
      "phonetic": "/ðə ˈkaɪn.dɪst/",
      "translation": "en nazik"
    },
    "antonym": {
      "word": "unkind / rude",
      "phonetic": "/ʌnˈkaɪnd/",
      "translation": "kaba"
    }
  },
  {
    "id": "adj_195",
    "rank": 195,
    "word": "Knowledgeable",
    "phonetic": "/ˈnɒl.ɪ.dʒə.bəl/",
    "translation": "Bilgili / Donanımlı",
    "exampleEn": "The lead architect is exceptionally knowledgeable about distributed systems.",
    "grammarNote": "",
    "exampleTr": "Baş mimar dağıtık sistemler konusunda son derece bilgilidir / donanımlıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more knowledgeable (than)",
      "phonetic": "/mɔːr ˈnɒl.ɪ.dʒə.bəl/",
      "translation": "daha bilgili"
    },
    "superlative": {
      "form": "the most knowledgeable",
      "phonetic": "/ðə məʊst ˈnɒl.ɪ.dʒə.bəl/",
      "translation": "en bilgili"
    },
    "antonym": {
      "word": "ignorant",
      "phonetic": "/ˈɪɡ.nər.ənt/",
      "translation": "cahil / bilgisiz"
    }
  },
  {
    "id": "adj_196",
    "rank": 196,
    "word": "Leading",
    "phonetic": "/ˈliː.dɪŋ/",
    "translation": "Önde gelen / Lider",
    "exampleEn": "Kotlin is the leading programming language for native Android development.",
    "grammarNote": "",
    "exampleTr": "Kotlin, yerel Android geliştirme için önde gelen programlama dilidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more leading (than)",
      "phonetic": "/mɔːr ˈliː.dɪŋ/",
      "translation": "daha önde gelen"
    },
    "superlative": {
      "form": "the most leading",
      "phonetic": "/ðə məʊst ˈliː.dɪŋ/",
      "translation": "en önde gelen"
    },
    "antonym": {
      "word": "lagging / secondary",
      "phonetic": "/ˈlæɡ.ɪŋ/",
      "translation": "geride kalan"
    }
  },
  {
    "id": "adj_197",
    "rank": 197,
    "word": "Legal",
    "phonetic": "/ˈliː.ɡəl/",
    "translation": "Yasal / Hukuki",
    "exampleEn": "Our e-commerce platform complies with all Turkish legal e-commerce regulations.",
    "grammarNote": "",
    "exampleTr": "E-ticaret platformumuz tüm Türk yasal e-ticaret düzenlemelerine uygundur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more legal (than)",
      "phonetic": "/mɔːr ˈliː.ɡəl/",
      "translation": "daha yasal"
    },
    "superlative": {
      "form": "the most legal",
      "phonetic": "/ðə məʊst ˈliː.ɡəl/",
      "translation": "en yasal"
    },
    "antonym": {
      "word": "illegal",
      "phonetic": "/ɪˈliː.ɡəl/",
      "translation": "yasa dışı"
    }
  },
  {
    "id": "adj_198",
    "rank": 198,
    "word": "Local",
    "phonetic": "/ˈləʊ.kəl/",
    "translation": "Yerel / Bölgesel",
    "exampleEn": "We test our backend services on local development machines before pushing.",
    "grammarNote": "",
    "exampleTr": "Push etmeden önce arka uç servislerimizi yerel geliştirme makinelerinde test ederiz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more local (than)",
      "phonetic": "/mɔːr ˈləʊ.kəl/",
      "translation": "daha yerel"
    },
    "superlative": {
      "form": "the most local",
      "phonetic": "/ðə məʊst ˈləʊ.kəl/",
      "translation": "en yerel"
    },
    "antonym": {
      "word": "global",
      "phonetic": "/ˈɡləʊ.bəl/",
      "translation": "küresel"
    }
  },
  {
    "id": "adj_199",
    "rank": 199,
    "word": "Logical",
    "phonetic": "/ˈlɒdʒ.ɪ.kəl/",
    "translation": "Mantıklı",
    "exampleEn": "Separating concerns into independent modules is a logical design pattern.",
    "grammarNote": "",
    "exampleTr": "Sorumlulukları bağımsız modüllere ayırmak mantıklı bir tasarım desenidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more logical (than)",
      "phonetic": "/mɔːr ˈlɒdʒ.ɪ.kəl/",
      "translation": "daha mantıklı"
    },
    "superlative": {
      "form": "the most logical",
      "phonetic": "/ðə məʊst ˈlɒdʒ.ɪ.kəl/",
      "translation": "en mantıklı"
    },
    "antonym": {
      "word": "illogical",
      "phonetic": "/ɪˈlɒdʒ.ɪ.kəl/",
      "translation": "mantıksız"
    }
  },
  {
    "id": "adj_200",
    "rank": 200,
    "word": "Lucky",
    "phonetic": "/ˈlʌk.i/",
    "translation": "Şanslı",
    "exampleEn": "We were lucky to catch the critical memory deadlock before public release.",
    "grammarNote": "",
    "exampleTr": "Kritik bellek kilitlenmesini genel kullanıma sunmadan önce yakaladığımız için şanslıydık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "luckier (than)",
      "phonetic": "/ˈlʌk.i.ər/",
      "translation": "daha şanslı"
    },
    "superlative": {
      "form": "the luckiest",
      "phonetic": "/ðə ˈlʌk.i.ɪst/",
      "translation": "en şanslı"
    },
    "antonym": {
      "word": "unlucky",
      "phonetic": "/ʌnˈlʌk.i/",
      "translation": "şanssız"
    }
  }
] as LibraryWordEntry[];

export const ADJECTIVES_300: LibraryWordEntry[] = [
  {
    "id": "adj_201",
    "rank": 201,
    "word": "Absolute",
    "phonetic": "/ˈæb.sə.luːt/",
    "translation": "Mutlak / Kesin",
    "exampleEn": "End-to-end encryption provides absolute privacy for messaging users.",
    "grammarNote": "",
    "exampleTr": "Uçtan uca şifreleme mesajlaşma kullanıcıları için mutlak gizlilik sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more absolute (than)",
      "phonetic": "/mɔːr ˈæb.sə.luːt/",
      "translation": "daha mutlak"
    },
    "superlative": {
      "form": "the most absolute",
      "phonetic": "/ðə məʊst ˈæb.sə.luːt/",
      "translation": "en mutlak"
    },
    "antonym": {
      "word": "relative",
      "phonetic": "/ˈrel.ə.tɪv/",
      "translation": "göreceli"
    }
  },
  {
    "id": "adj_202",
    "rank": 202,
    "word": "Abstract",
    "phonetic": "/ˈæb.strækt/",
    "translation": "Soyut",
    "exampleEn": "In Kotlin, abstract classes cannot be instantiated directly without subclasses.",
    "grammarNote": "",
    "exampleTr": "Kotlin'de soyut (abstract) sınıflar alt sınıfları olmadan doğrudan başlatılamaz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more abstract (than)",
      "phonetic": "/mɔːr ˈæb.strækt/",
      "translation": "daha soyut"
    },
    "superlative": {
      "form": "the most abstract",
      "phonetic": "/ðə məʊst ˈæb.strækt/",
      "translation": "en soyut"
    },
    "antonym": {
      "word": "concrete",
      "phonetic": "/ˈkɒŋ.kriːt/",
      "translation": "somut"
    }
  },
  {
    "id": "adj_203",
    "rank": 203,
    "word": "Academic",
    "phonetic": "/ˌæk.əˈdem.ɪk/",
    "translation": "Akademik",
    "exampleEn": "I presented our AI research paper at an international academic symposium.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka araştırma makalemizi uluslararası bir akademik sempozyumda sundum.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more academic (than)",
      "phonetic": "/mɔːr ˌæk.əˈdem.ɪk/",
      "translation": "daha akademik"
    },
    "superlative": {
      "form": "the most academic",
      "phonetic": "/ðə məʊst ˌæk.əˈdem.ɪk/",
      "translation": "en akademik"
    },
    "antonym": {
      "word": "practical / non-academic",
      "phonetic": "/ˈpræk.tɪ.kəl/",
      "translation": "pratik"
    }
  },
  {
    "id": "adj_204",
    "rank": 204,
    "word": "Accessible",
    "phonetic": "/əkˈses.ə.bəl/",
    "translation": "Erişilebilir",
    "exampleEn": "We designed our mobile UI to be fully accessible for visually impaired users.",
    "grammarNote": "",
    "exampleTr": "Mobil arayüzümüzü görme engelli kullanıcılar için tam erişilebilir olacak şekilde tasarladık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more accessible (than)",
      "phonetic": "/mɔːr əkˈses.ə.bəl/",
      "translation": "daha erişilebilir"
    },
    "superlative": {
      "form": "the most accessible",
      "phonetic": "/ðə məʊst əkˈses.ə.bəl/",
      "translation": "en erişilebilir"
    },
    "antonym": {
      "word": "inaccessible",
      "phonetic": "/ˌɪn.əkˈses.ə.bəl/",
      "translation": "erişilemez"
    }
  },
  {
    "id": "adj_205",
    "rank": 205,
    "word": "Actual",
    "phonetic": "/ˈæk.tʃu.əl/",
    "translation": "Gerçek / Fiili",
    "exampleEn": "The actual server response latency was faster than our theoretical benchmarks.",
    "grammarNote": "",
    "exampleTr": "Fiili sunucu yanıt gecikmesi teorik performans testlerimizden daha hızlıydı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more actual (than)",
      "phonetic": "/mɔːr ˈæk.tʃu.əl/",
      "translation": "daha fiili"
    },
    "superlative": {
      "form": "the most actual",
      "phonetic": "/ðə məʊst ˈæk.tʃu.əl/",
      "translation": "en fiili"
    },
    "antonym": {
      "word": "theoretical / potential",
      "phonetic": "/ˌθɪəˈret.ɪ.kəl/",
      "translation": "teorik"
    }
  },
  {
    "id": "adj_206",
    "rank": 206,
    "word": "Acute",
    "phonetic": "/əˈkjuːt/",
    "translation": "Akut / Şiddetli",
    "exampleEn": "The clinic emergency doctor diagnosed an acute upper respiratory infection.",
    "grammarNote": "",
    "exampleTr": "Klinik acil servis doktoru şiddetli bir akut üst solunum yolu enfeksiyonu teşhisi koydu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more acute (than)",
      "phonetic": "/ˈmɔːr əˈkjuːt/",
      "translation": "daha akut"
    },
    "superlative": {
      "form": "the most acute",
      "phonetic": "/ðə məʊst əˈkjuːt/",
      "translation": "en akut"
    },
    "antonym": {
      "word": "chronic / mild",
      "phonetic": "/ˈkrɒn.ɪk/",
      "translation": "kronik / hafif"
    }
  },
  {
    "id": "adj_207",
    "rank": 207,
    "word": "Adequate",
    "phonetic": "/ˈæd.ə.kwət/",
    "translation": "Yeterli / Uygun",
    "exampleEn": "Sixteen gigabytes of RAM is adequate for local Android Studio development.",
    "grammarNote": "",
    "exampleTr": "On altı gigabayt RAM yerel Android Studio geliştirmesi için yeterlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more adequate (than)",
      "phonetic": "/mɔːr ˈæd.ə.kwət/",
      "translation": "daha yeterli"
    },
    "superlative": {
      "form": "the most adequate",
      "phonetic": "/ðə məʊst ˈæd.ə.kwət/",
      "translation": "en yeterli"
    },
    "antonym": {
      "word": "inadequate",
      "phonetic": "/ɪnˈæd.ə.kwət/",
      "translation": "yetersiz"
    }
  },
  {
    "id": "adj_208",
    "rank": 208,
    "word": "Administrative",
    "phonetic": "/ədˈmɪn.ɪ.strə.tɪv/",
    "translation": "İdari / Yönetimsel",
    "exampleEn": "Modifying cloud firewall permissions requires administrative root access.",
    "grammarNote": "",
    "exampleTr": "Bulut güvenlik duvarı izinlerini değiştirmek idari kök (root) erişimi gerektirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more administrative (than)",
      "phonetic": "/mɔːr ədˈmɪn.ɪ.strə.tɪv/",
      "translation": "daha idari"
    },
    "superlative": {
      "form": "the most administrative",
      "phonetic": "/ðə məʊst ədˈmɪn.ɪ.strə.tɪv/",
      "translation": "en idari"
    },
    "antonym": {
      "word": "operational",
      "phonetic": "/ˌɒp.ərˈeɪ.ʃən.əl/",
      "translation": "operasyonel"
    }
  },
  {
    "id": "adj_209",
    "rank": 209,
    "word": "Advanced",
    "phonetic": "/ədˈvɑːnst/",
    "translation": "İleri Düzey / Gelişmiş",
    "exampleEn": "Our senior curriculum covers advanced B2 and C1 English grammar nuances.",
    "grammarNote": "",
    "exampleTr": "İleri düzey müfredatımız ileri B2 ve C1 İngilizce gramer nüanslarını kapsar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more advanced (than)",
      "phonetic": "/mɔːr ədˈvɑːnst/",
      "translation": "daha ileri düzey"
    },
    "superlative": {
      "form": "the most advanced",
      "phonetic": "/ðə məʊst ədˈvɑːnst/",
      "translation": "en ileri düzey"
    },
    "antonym": {
      "word": "basic / elementary",
      "phonetic": "/ˈbeɪ.sɪk/",
      "translation": "temel"
    }
  },
  {
    "id": "adj_210",
    "rank": 210,
    "word": "Aggressive",
    "phonetic": "/əˈɡres.ɪv/",
    "translation": "Agresif / Hırslı",
    "exampleEn": "We configured aggressive Redis caching to reduce database server query load.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sunucusu sorgu yükünü azaltmak için agresif Redis önbelleklemesi yapılandırdık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more aggressive (than)",
      "phonetic": "/mɔːr əˈɡres.ɪv/",
      "translation": "daha agresif"
    },
    "superlative": {
      "form": "the most aggressive",
      "phonetic": "/ðə məʊst əˈɡres.ɪv/",
      "translation": "en agresif"
    },
    "antonym": {
      "word": "gentle / passive",
      "phonetic": "/ˈdʒen.təl/",
      "translation": "nazik"
    }
  },
  {
    "id": "adj_211",
    "rank": 211,
    "word": "Alternative",
    "phonetic": "/ɒlˈtɜː.nə.tɪv/",
    "translation": "Alternatif / Farklı",
    "exampleEn": "PostgreSQL is an enterprise-grade alternative to proprietary commercial databases.",
    "grammarNote": "",
    "exampleTr": "PostgreSQL tescilli ticari veritabanlarına kurumsal düzeyde bir alternatiftir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more alternative (than)",
      "phonetic": "/mɔːr ɒlˈtɜː.nə.tɪv/",
      "translation": "daha alternatif"
    },
    "superlative": {
      "form": "the most alternative",
      "phonetic": "/ðə məʊst ɒlˈtɜː.nə.tɪv/",
      "translation": "en alternatif"
    },
    "antonym": {
      "word": "conventional",
      "phonetic": "/kənˈven.ʃən.əl/",
      "translation": "geleneksel"
    }
  },
  {
    "id": "adj_212",
    "rank": 212,
    "word": "Ambitious",
    "phonetic": "/æmˈbɪʃ.əs/",
    "translation": "İddialı / Hırslı",
    "exampleEn": "We have an ambitious roadmap to deliver AI features within two sprints.",
    "grammarNote": "",
    "exampleTr": "İki sprint içinde yapay zeka özelliklerini teslim etmek için iddialı bir yol haritamız var.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more ambitious (than)",
      "phonetic": "/mɔːr æmˈbɪʃ.əs/",
      "translation": "daha iddialı"
    },
    "superlative": {
      "form": "the most ambitious",
      "phonetic": "/ðə məʊst æmˈbɪʃ.əs/",
      "translation": "en iddialı"
    },
    "antonym": {
      "word": "unambitious",
      "phonetic": "/ʌn.æmˈbɪʃ.əs/",
      "translation": "iddiasız"
    }
  },
  {
    "id": "adj_213",
    "rank": 213,
    "word": "Ancient",
    "phonetic": "/ˈeɪn.ʃənt/",
    "translation": "Antik / Çok eski",
    "exampleEn": "We visited historical ancient monuments during our weekend trip to Bolu.",
    "grammarNote": "",
    "exampleTr": "Bolu hafta sonu gezimiz sırasında tarihi antik anıtları ziyaret ettik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more ancient (than)",
      "phonetic": "/mɔːr ˈeɪn.ʃənt/",
      "translation": "daha antik"
    },
    "superlative": {
      "form": "the most ancient",
      "phonetic": "/ðə məʊst ˈeɪn.ʃənt/",
      "translation": "en antik"
    },
    "antonym": {
      "word": "modern / contemporary",
      "phonetic": "/ˈmɒd.ən/",
      "translation": "modern / çağdaş"
    }
  },
  {
    "id": "adj_214",
    "rank": 214,
    "word": "Annual",
    "phonetic": "/ˈæn.ju.əl/",
    "translation": "Yıllık",
    "exampleEn": "The tech community hosts an annual software development symposium.",
    "grammarNote": "",
    "exampleTr": "Teknoloji topluluğu yıllık bir yazılım geliştirme sempozyumuna ev sahipliği yapar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more annual (than)",
      "phonetic": "/mɔːr ˈæn.ju.əl/",
      "translation": "daha yıllık"
    },
    "superlative": {
      "form": "the most annual",
      "phonetic": "/ðə məʊst ˈæn.ju.əl/",
      "translation": "en yıllık"
    },
    "antonym": {
      "word": "monthly / daily",
      "phonetic": "/ˈmʌnθ.li/",
      "translation": "aylık / günlük"
    }
  },
  {
    "id": "adj_215",
    "rank": 215,
    "word": "Apparent",
    "phonetic": "/əˈpær.ənt/",
    "translation": "Belirgin / Aşikar",
    "exampleEn": "The performance gain became apparent immediately after index creation.",
    "grammarNote": "",
    "exampleTr": "Performans artışı indeks oluşturulduktan hemen sonra belirgin hale geldi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more apparent (than)",
      "phonetic": "/mɔːr əˈpær.ənt/",
      "translation": "daha belirgin"
    },
    "superlative": {
      "form": "the most apparent",
      "phonetic": "/ðə məʊst əˈpær.ənt/",
      "translation": "en belirgin"
    },
    "antonym": {
      "word": "hidden / obscure",
      "phonetic": "/ˈhɪd.ən/",
      "translation": "gizli"
    }
  },
  {
    "id": "adj_216",
    "rank": 216,
    "word": "Appropriate",
    "phonetic": "/əˈprəʊ.pri.ət/",
    "translation": "Uygun / Yerinde",
    "exampleEn": "Please select the appropriate CEFR level for your daily English studies.",
    "grammarNote": "",
    "exampleTr": "Lütfen günlük İngilizce çalışmalarınız için uygun CEFR seviyesini seçiniz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more appropriate (than)",
      "phonetic": "/mɔːr əˈprəʊ.pri.ət/",
      "translation": "daha uygun"
    },
    "superlative": {
      "form": "the most appropriate",
      "phonetic": "/ðə məʊst əˈprəʊ.pri.ət/",
      "translation": "en uygun"
    },
    "antonym": {
      "word": "inappropriate",
      "phonetic": "/ˌɪn.əˈprəʊ.pri.ət/",
      "translation": "uygunsuz"
    }
  },
  {
    "id": "adj_217",
    "rank": 217,
    "word": "Approximate",
    "phonetic": "/əˈprɒk.sɪ.mət/",
    "translation": "Yaklaşık",
    "exampleEn": "The approximate server deployment time is three minutes on Render.",
    "grammarNote": "",
    "exampleTr": "Yaklaşık sunucu dağıtım süresi Render'da üç dakikadır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more approximate (than)",
      "phonetic": "/mɔːr əˈprɒk.sɪ.mət/",
      "translation": "daha yaklaşık"
    },
    "superlative": {
      "form": "the most approximate",
      "phonetic": "/ðə məʊst əˈprɒk.sɪ.mət/",
      "translation": "en yaklaşık"
    },
    "antonym": {
      "word": "exact / precise",
      "phonetic": "/ɪɡˈzækt/",
      "translation": "kesin"
    }
  },
  {
    "id": "adj_218",
    "rank": 218,
    "word": "Arbitrary",
    "phonetic": "/ˈɑː.bɪ.trər.i/",
    "translation": "Keyfi / Rastgele",
    "exampleEn": "Do not choose arbitrary variable names; use descriptive identifiers.",
    "grammarNote": "",
    "exampleTr": "Keyfi değişken isimleri seçmeyin; açıklayıcı tanımlayıcılar kullanın.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more arbitrary (than)",
      "phonetic": "/mɔːr ˈɑː.bɪ.trər.i/",
      "translation": "daha keyfi"
    },
    "superlative": {
      "form": "the most arbitrary",
      "phonetic": "/ðə məʊst ˈɑː.bɪ.trər.i/",
      "translation": "en keyfi"
    },
    "antonym": {
      "word": "systematic",
      "phonetic": "/ˈsɪs.tə.mæt.ɪk/",
      "translation": "sistemli"
    }
  },
  {
    "id": "adj_219",
    "rank": 219,
    "word": "Artificial",
    "phonetic": "/ˌɑː.tɪˈfɪʃ.əl/",
    "translation": "Yapay / Suni",
    "exampleEn": "We specialize in artificial intelligence and computer vision solutions.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka ve bilgisayarlı görü çözümlerinde uzmanlaşıyoruz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more artificial (than)",
      "phonetic": "/mɔːr ˌɑː.tɪˈfɪʃ.əl/",
      "translation": "daha yapay"
    },
    "superlative": {
      "form": "the most artificial",
      "phonetic": "/ðə məʊst ˌɑː.tɪˈfɪʃ.əl/",
      "translation": "en yapay"
    },
    "antonym": {
      "word": "natural / real",
      "phonetic": "/ˈnætʃ.ər.əl/",
      "translation": "doğal"
    }
  },
  {
    "id": "adj_220",
    "rank": 220,
    "word": "Artistic",
    "phonetic": "/ɑːˈtɪs.tɪk/",
    "translation": "Sanatsal",
    "exampleEn": "She designed an artistic brand logo for our digital wardrobe app Havamda.",
    "grammarNote": "",
    "exampleTr": "Dijital gardırop uygulamamız Havamda için sanatsal bir marka logosu tasarladı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more artistic (than)",
      "phonetic": "/mɔːr ɑːˈtɪs.tɪk/",
      "translation": "daha sanatsal"
    },
    "superlative": {
      "form": "the most artistic",
      "phonetic": "/ðə məʊst ɑːˈtɪs.tɪk/",
      "translation": "en sanatsal"
    },
    "antonym": {
      "word": "inartistic / plain",
      "phonetic": "/ɪn.ɑːˈtɪs.tɪk/",
      "translation": "sanatsız"
    }
  },
  {
    "id": "adj_221",
    "rank": 221,
    "word": "Asleep",
    "phonetic": "/əˈsliːp/",
    "translation": "Uykuda / Uyuyan",
    "exampleEn": "The developer fell asleep at his desk after debugging complex SQL deadlocks.",
    "grammarNote": "",
    "exampleTr": "Geliştirici karmaşık SQL kilitlenmelerini ayıkladıktan sonra masasında uyuyakaldı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more asleep (than)",
      "phonetic": "/mɔːr əˈsliːp/",
      "translation": "daha uykuda"
    },
    "superlative": {
      "form": "the most asleep",
      "phonetic": "/ðə məʊst əˈsliːp/",
      "translation": "en uykulu"
    },
    "antonym": {
      "word": "awake",
      "phonetic": "/əˈweɪk/",
      "translation": "uyanık"
    }
  },
  {
    "id": "adj_222",
    "rank": 222,
    "word": "Automatic",
    "phonetic": "/ˌɔː.təˈmæt.ɪk/",
    "translation": "Otomatik",
    "exampleEn": "Our CI/CD pipeline triggers an automatic build upon every GitHub push.",
    "grammarNote": "",
    "exampleTr": "CI/CD işlem hattımız her GitHub gönderiminde otomatik bir derleme tetikler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more automatic (than)",
      "phonetic": "/mɔːr ˌɔː.təˈmæt.ɪk/",
      "translation": "daha otomatik"
    },
    "superlative": {
      "form": "the most automatic",
      "phonetic": "/ðə məʊst ˌɔː.təˈmæt.ɪk/",
      "translation": "en otomatik"
    },
    "antonym": {
      "word": "manual",
      "phonetic": "/ˈmæn.ju.əl/",
      "translation": "manuel"
    }
  },
  {
    "id": "adj_223",
    "rank": 223,
    "word": "Autonomous",
    "phonetic": "/ɔːˈtɒn.ə.məs/",
    "translation": "Otonom / Özerk",
    "exampleEn": "Our university graduation project prototyped an autonomous traffic system.",
    "grammarNote": "",
    "exampleTr": "Üniversite mezuniyet projemiz otonom bir trafik sistemi prototiplemiştir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more autonomous (than)",
      "phonetic": "/mɔːr ɔːˈtɒn.ə.məs/",
      "translation": "daha otonom"
    },
    "superlative": {
      "form": "the most autonomous",
      "phonetic": "/ðə məʊst ɔːˈtɒn.ə.məs/",
      "translation": "en otonom"
    },
    "antonym": {
      "word": "dependent",
      "phonetic": "/dɪˈpen.dənt/",
      "translation": "bağımlı"
    }
  },
  {
    "id": "adj_224",
    "rank": 224,
    "word": "Aware",
    "phonetic": "/əˈweər/",
    "translation": "Farkında / Bilinçli",
    "exampleEn": "Developers must be aware of modern cybersecurity vulnerability risks.",
    "grammarNote": "",
    "exampleTr": "Geliştiriciler modern siber güvenlik açığı risklerinin farkında olmalıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more aware (than)",
      "phonetic": "/mɔːr əˈweər/",
      "translation": "daha farkında"
    },
    "superlative": {
      "form": "the most aware",
      "phonetic": "/ðə məʊst əˈweər/",
      "translation": "en çok farkında"
    },
    "antonym": {
      "word": "unaware",
      "phonetic": "/ˌʌn.əˈweər/",
      "translation": "habersiz"
    }
  },
  {
    "id": "adj_225",
    "rank": 225,
    "word": "Awful",
    "phonetic": "/ˈɔː.fəl/",
    "translation": "Berbat / Korkunç",
    "exampleEn": "The server crash during the live marketing demo was an awful experience.",
    "grammarNote": "",
    "exampleTr": "Canlı pazarlama demosu sırasındaki sunucu çökmesi berbat bir deneyimdi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more awful (than)",
      "phonetic": "/mɔːr ˈɔː.fəl/",
      "translation": "daha berbat"
    },
    "superlative": {
      "form": "the most awful",
      "phonetic": "/ðə məʊst ˈɔː.fəl/",
      "translation": "en berbat"
    },
    "antonym": {
      "word": "wonderful / great",
      "phonetic": "/ˈwʌn.də.fəl/",
      "translation": "harika"
    }
  },
  {
    "id": "adj_226",
    "rank": 226,
    "word": "Backward",
    "phonetic": "/ˈbæk.wəd/",
    "translation": "Geriye doğru / Geriye uyumlu",
    "exampleEn": "Our REST API maintains backward compatibility with legacy mobile app versions.",
    "grammarNote": "",
    "exampleTr": "REST API'miz eski mobil uygulama sürümleriyle geriye dönük uyumluluğu korur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more backward (than)",
      "phonetic": "/mɔːr ˈbæk.wəd/",
      "translation": "daha geriye dönük"
    },
    "superlative": {
      "form": "the most backward",
      "phonetic": "/ðə məʊst ˈbæk.wəd/",
      "translation": "en geriye dönük"
    },
    "antonym": {
      "word": "forward",
      "phonetic": "/ˈfɔː.wəd/",
      "translation": "ileri"
    }
  },
  {
    "id": "adj_227",
    "rank": 227,
    "word": "Bare",
    "phonetic": "/beər/",
    "translation": "Sade / Çıplak (Bare-metal)",
    "exampleEn": "Deploying database instances on bare-metal servers delivers peak throughput.",
    "grammarNote": "",
    "exampleTr": "Veritabanı örneklerini çıplak donanım (bare-metal) sunuculara dağıtmak en yüksek işlem hacmini sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "barer (than)",
      "phonetic": "/ˈbeə.rər/",
      "translation": "daha sade"
    },
    "superlative": {
      "form": "the barest",
      "phonetic": "/ðə ˈbeə.rɪst/",
      "translation": "en sade"
    },
    "antonym": {
      "word": "covered",
      "phonetic": "/ˈkʌv.əd/",
      "translation": "kapalı"
    }
  },
  {
    "id": "adj_228",
    "rank": 228,
    "word": "Beneficial",
    "phonetic": "/ˌben.ɪˈfɪʃ.əl/",
    "translation": "Faydalı / Yararlı",
    "exampleEn": "Code reviews are extremely beneficial for maintaining engineering quality.",
    "grammarNote": "",
    "exampleTr": "Kod incelemeleri mühendislik kalitesini korumak için son derece faydalıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more beneficial (than)",
      "phonetic": "/mɔːr ˌben.ɪˈfɪʃ.əl/",
      "translation": "daha faydalı"
    },
    "superlative": {
      "form": "the most beneficial",
      "phonetic": "/ðə məʊst ˌben.ɪˈfɪʃ.əl/",
      "translation": "en faydalı"
    },
    "antonym": {
      "word": "harmful / detrimental",
      "phonetic": "/ˈhɑːm.fəl/",
      "translation": "zararlı"
    }
  },
  {
    "id": "adj_229",
    "rank": 229,
    "word": "Biological",
    "phonetic": "/ˌbaɪ.əˈlɒdʒ.ɪ.kəl/",
    "translation": "Biyolojik",
    "exampleEn": "Artificial neural networks draw inspiration from biological human brain neurons.",
    "grammarNote": "",
    "exampleTr": "Yapay sinir ağları biyolojik insan beyni nöronlarından ilham alır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more biological (than)",
      "phonetic": "/mɔːr ˌbaɪ.əˈlɒdʒ.ɪ.kəl/",
      "translation": "daha biyolojik"
    },
    "superlative": {
      "form": "the most biological",
      "phonetic": "/ðə məʊst ˌbaɪ.əˈlɒdʒ.ɪ.kəl/",
      "translation": "en biyolojik"
    },
    "antonym": {
      "word": "inorganic / artificial",
      "phonetic": "/ˌɪn.ɔːˈɡæn.ɪk/",
      "translation": "yapay / inorganik"
    }
  },
  {
    "id": "adj_230",
    "rank": 230,
    "word": "Blank",
    "phonetic": "/blæŋk/",
    "translation": "Boş",
    "exampleEn": "Do not submit blank input fields in the user registration form.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı kayıt formunda boş girdi alanları göndermeyin.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "blanker (than)",
      "phonetic": "/ˈblæŋ.kər/",
      "translation": "daha boş"
    },
    "superlative": {
      "form": "the blankest",
      "phonetic": "/ðə ˈblæŋ.kɪst/",
      "translation": "en boş"
    },
    "antonym": {
      "word": "filled",
      "phonetic": "/fɪld/",
      "translation": "dolu"
    }
  },
  {
    "id": "adj_231",
    "rank": 231,
    "word": "Brief",
    "phonetic": "/briːf/",
    "translation": "Kısa / Öz",
    "exampleEn": "We held a brief ten-minute standup meeting before starting work.",
    "grammarNote": "",
    "exampleTr": "İşe başlamadan önce kısa on dakikalık bir durum toplantısı yaptık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "briefer (than)",
      "phonetic": "/ˈbriː.fər/",
      "translation": "daha kısa"
    },
    "superlative": {
      "form": "the briefest",
      "phonetic": "/ðə ˈbriː.fɪst/",
      "translation": "en kısa"
    },
    "antonym": {
      "word": "lengthy / long",
      "phonetic": "/ˈleŋ.θi/",
      "translation": "uzun"
    }
  },
  {
    "id": "adj_232",
    "rank": 232,
    "word": "Brilliant",
    "phonetic": "/ˈbrɪl.jənt/",
    "translation": "Dahiyane / Parlak",
    "exampleEn": "He devised a brilliant solution to solve the Redis cache invalidation bug.",
    "grammarNote": "",
    "exampleTr": "Redis önbellek geçersiz kılma hatasını çözmek için dahiyane bir çözüm geliştirdi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more brilliant (than)",
      "phonetic": "/mɔːr ˈbrɪl.jənt/",
      "translation": "daha dahiyane"
    },
    "superlative": {
      "form": "the most brilliant",
      "phonetic": "/ðə məʊst ˈbrɪl.jənt/",
      "translation": "en dahiyane"
    },
    "antonym": {
      "word": "dull / foolish",
      "phonetic": "/dʌl/",
      "translation": "aptal"
    }
  },
  {
    "id": "adj_233",
    "rank": 233,
    "word": "Brittle",
    "phonetic": "/ˈbrɪt.əl/",
    "translation": "Kırılgan / Kolay bozulan",
    "exampleEn": "Monolithic architectures without automated tests are extremely brittle.",
    "grammarNote": "",
    "exampleTr": "Otomatik testleri olmayan monolitik mimariler son derece kırılgandır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "brittler (than)",
      "phonetic": "/ˈbrɪt.lər/",
      "translation": "daha kırılgan"
    },
    "superlative": {
      "form": "the brittlest",
      "phonetic": "/ðə ˈbrɪt.lɪst/",
      "translation": "en kırılgan"
    },
    "antonym": {
      "word": "robust / resilient",
      "phonetic": "/rəʊˈbʌst/",
      "translation": "sağlam"
    }
  },
  {
    "id": "adj_234",
    "rank": 234,
    "word": "Cautious",
    "phonetic": "/ˈkɔː.ʃəs/",
    "translation": "Temkinli / Dikkatli",
    "exampleEn": "DevOps engineers are cautious when migrating production database schemas.",
    "grammarNote": "",
    "exampleTr": "DevOps mühendisleri canlı veritabanı şemalarını taşırken temkinlidirler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more cautious (than)",
      "phonetic": "/mɔːr ˈkɔː.ʃəs/",
      "translation": "daha temkinli"
    },
    "superlative": {
      "form": "the most cautious",
      "phonetic": "/ðə məʊst ˈkɔː.ʃəs/",
      "translation": "en temkinli"
    },
    "antonym": {
      "word": "careless / reckless",
      "phonetic": "/ˈkeə.ləs/",
      "translation": "dikkatsiz"
    }
  },
  {
    "id": "adj_235",
    "rank": 235,
    "word": "Capable",
    "phonetic": "/ˈkeɪ.pə.bəl/",
    "translation": "Yetenekli / Muktedir",
    "exampleEn": "Our mobile AI model is capable of classifying video frames on-device.",
    "grammarNote": "",
    "exampleTr": "Mobil yapay zeka modelimiz video karelerini cihaz üzerinde sınıflandırma yeteneğine sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more capable (than)",
      "phonetic": "/mɔːr ˈkeɪ.pə.bəl/",
      "translation": "daha yetenekli"
    },
    "superlative": {
      "form": "the most capable",
      "phonetic": "/ðə məʊst ˈkeɪ.pə.bəl/",
      "translation": "en yetenekli"
    },
    "antonym": {
      "word": "incapable",
      "phonetic": "/ɪnˈkeɪ.pə.bəl/",
      "translation": "yetersiz"
    }
  },
  {
    "id": "adj_236",
    "rank": 236,
    "word": "Capital",
    "phonetic": "/ˈkæp.ɪ.təl/",
    "translation": "Büyük / Başlıca",
    "exampleEn": "Venture capital funding allows software startups to scale engineering teams.",
    "grammarNote": "",
    "exampleTr": "Girişim sermayesi fonlaması yazılım girişimlerinin mühendislik ekiplerini ölçeklendirmesine olanak tanır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more capital (than)",
      "phonetic": "/mɔːr ˈkæp.ɪ.təl/",
      "translation": "daha başlıca"
    },
    "superlative": {
      "form": "the most capital",
      "phonetic": "/ðə məʊst ˈkæp.ɪ.təl/",
      "translation": "en başlıca"
    },
    "antonym": {
      "word": "minor",
      "phonetic": "/ˈmaɪ.nər/",
      "translation": "önemsiz"
    }
  },
  {
    "id": "adj_237",
    "rank": 237,
    "word": "Casual",
    "phonetic": "/ˈkæʒ.u.əl/",
    "translation": "Gündelik / Rahat",
    "exampleEn": "Our student developer team maintains a friendly and casual communication tone.",
    "grammarNote": "",
    "exampleTr": "Öğrenci geliştirici ekibimiz samimi ve gündelik bir iletişim tonu sürdürür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more casual (than)",
      "phonetic": "/mɔːr ˈkæʒ.u.əl/",
      "translation": "daha gündelik"
    },
    "superlative": {
      "form": "the most casual",
      "phonetic": "/ðə məʊst ˈkæʒ.u.əl/",
      "translation": "en gündelik"
    },
    "antonym": {
      "word": "formal",
      "phonetic": "/ˈfɔː.məl/",
      "translation": "resmi"
    }
  },
  {
    "id": "adj_238",
    "rank": 238,
    "word": "Chemical",
    "phonetic": "/ˈkem.ɪ.kəl/",
    "translation": "Kimyasal",
    "exampleEn": "Lithium battery cells utilize chemical reactions to store electrical energy.",
    "grammarNote": "",
    "exampleTr": "Lityum pil hücreleri elektrik enerjisini depolamak için kimyasal reaksiyonları kullanır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more chemical (than)",
      "phonetic": "/mɔːr ˈkem.ɪ.kəl/",
      "translation": "daha kimyasal"
    },
    "superlative": {
      "form": "the most chemical",
      "phonetic": "/ðə məʊst ˈkem.ɪ.kəl/",
      "translation": "en kimyasal"
    },
    "antonym": {
      "word": "physical",
      "phonetic": "/ˈfɪz.ɪ.kəl/",
      "translation": "fiziksel"
    }
  },
  {
    "id": "adj_239",
    "rank": 239,
    "word": "Chief",
    "phonetic": "/tʃiːf/",
    "translation": "Baş / Başlıca",
    "exampleEn": "High memory consumption was the chief reason for the backend latency.",
    "grammarNote": "",
    "exampleTr": "Yüksek bellek tüketimi arka uç gecikmesinin başlıca nedeniydi.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more chief (than)",
      "phonetic": "/mɔːr tʃiːf/",
      "translation": "daha başlıca"
    },
    "superlative": {
      "form": "the most chief",
      "phonetic": "/ðə məʊst tʃiːf/",
      "translation": "en başlıca"
    },
    "antonym": {
      "word": "minor",
      "phonetic": "/ˈmaɪ.nər/",
      "translation": "önemsiz"
    }
  },
  {
    "id": "adj_240",
    "rank": 240,
    "word": "Chronic",
    "phonetic": "/ˈkrɒn.ɪk/",
    "translation": "Kronik / Süreğen",
    "exampleEn": "Unresolved technical debt causes chronic software delivery delays.",
    "grammarNote": "",
    "exampleTr": "Çözülmemiş teknik borç kronik yazılım teslim gecikmelerine neden olur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more chronic (than)",
      "phonetic": "/mɔːr ˈkrɒn.ɪk/",
      "translation": "daha kronik"
    },
    "superlative": {
      "form": "the most chronic",
      "phonetic": "/ðə məʊst ˈkrɒn.ɪk/",
      "translation": "en kronik"
    },
    "antonym": {
      "word": "acute",
      "phonetic": "/əˈkjuːt/",
      "translation": "akut"
    }
  },
  {
    "id": "adj_241",
    "rank": 241,
    "word": "Civic",
    "phonetic": "/ˈsɪv.ɪk/",
    "translation": "Kentsel / Sivil",
    "exampleEn": "Our intelligent traffic project GÖZCÜ supports municipal civic infrastructure.",
    "grammarNote": "",
    "exampleTr": "Akıllı trafik projemiz GÖZCÜ belediye kentsel altyapısını destekler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more civic (than)",
      "phonetic": "/mɔːr ˈsɪv.ɪk/",
      "translation": "daha kentsel"
    },
    "superlative": {
      "form": "the most civic",
      "phonetic": "/ðə məʊst ˈsɪv.ɪk/",
      "translation": "en kentsel"
    },
    "antonym": {
      "word": "private",
      "phonetic": "/ˈpraɪ.vət/",
      "translation": "özel"
    }
  },
  {
    "id": "adj_242",
    "rank": 242,
    "word": "Classical",
    "phonetic": "/ˈklæs.ɪ.kəl/",
    "translation": "Klasik",
    "exampleEn": "I enjoy listening to classical instrumental music while solving coding bugs.",
    "grammarNote": "",
    "exampleTr": "Kodlama hatalarını çözerken klasik enstrümantal müzik dinlemekten keyif alırım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more classical (than)",
      "phonetic": "/mɔːr ˈklæs.ɪ.kəl/",
      "translation": "daha klasik"
    },
    "superlative": {
      "form": "the most classical",
      "phonetic": "/ðə məʊst ˈklæs.ɪ.kəl/",
      "translation": "en klasik"
    },
    "antonym": {
      "word": "modern",
      "phonetic": "/ˈmɒd.ən/",
      "translation": "modern"
    }
  },
  {
    "id": "adj_243",
    "rank": 243,
    "word": "Clever",
    "phonetic": "/ˈklev.ər/",
    "translation": "Zeki / Akıllı",
    "exampleEn": "He wrote a clever algorithmic optimization to reduce memory bandwidth.",
    "grammarNote": "",
    "exampleTr": "Bellek bant genişliğini azaltmak için zekice bir algoritmik optimizasyon yazdı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cleverer (than)",
      "phonetic": "/ˈklev.ər.ər/",
      "translation": "daha zeki"
    },
    "superlative": {
      "form": "the cleverest",
      "phonetic": "/ðə ˈklev.ər.ɪst/",
      "translation": "en zeki"
    },
    "antonym": {
      "word": "foolish / stupid",
      "phonetic": "/ˈfuː.lɪʃ/",
      "translation": "aptal"
    }
  },
  {
    "id": "adj_244",
    "rank": 244,
    "word": "Clinical",
    "phonetic": "/ˈklɪn.ɪ.kəl/",
    "translation": "Klinik",
    "exampleEn": "Our desktop posture analysis prototype was validated against clinical guidelines.",
    "grammarNote": "",
    "exampleTr": "Masaüstü duruş analizi prototipimiz klinik yönergelere göre doğrulandı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more clinical (than)",
      "phonetic": "/mɔːr ˈklɪn.ɪ.kəl/",
      "translation": "daha klinik"
    },
    "superlative": {
      "form": "the most clinical",
      "phonetic": "/ðə məʊst ˈklɪn.ɪ.kəl/",
      "translation": "en klinik"
    },
    "antonym": {
      "word": "theoretical",
      "phonetic": "/ˌθɪəˈret.ɪ.kəl/",
      "translation": "teorik"
    }
  },
  {
    "id": "adj_245",
    "rank": 245,
    "word": "Close",
    "phonetic": "/kləʊs/",
    "translation": "Yakın / Samimi",
    "exampleEn": "Our Teknokent innovation office is close to the university campus.",
    "grammarNote": "",
    "exampleTr": "Teknokent inovasyon ofisimiz üniversite kampüsüne yakındır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "closer (than)",
      "phonetic": "/ˈkləʊ.sər/",
      "translation": "daha yakın"
    },
    "superlative": {
      "form": "the closest",
      "phonetic": "/ðə ˈkləʊ.sɪst/",
      "translation": "en yakın"
    },
    "antonym": {
      "word": "far / distant",
      "phonetic": "/fɑːr/",
      "translation": "uzak"
    }
  },
  {
    "id": "adj_246",
    "rank": 246,
    "word": "Coarse",
    "phonetic": "/kɔːs/",
    "translation": "Kaba / Pürüzlü",
    "exampleEn": "Coarse-grained locking can degrade multi-threaded application throughput.",
    "grammarNote": "",
    "exampleTr": "Kaba taneli kilitler çok iş parçacıklı uygulama işlem hacmini düşürebilir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "coarser (than)",
      "phonetic": "/ˈkɔː.sər/",
      "translation": "daha kaba"
    },
    "superlative": {
      "form": "the coarsest",
      "phonetic": "/ðə ˈkɔː.sɪst/",
      "translation": "en kaba"
    },
    "antonym": {
      "word": "fine / smooth",
      "phonetic": "/faɪn/",
      "translation": "ince / pürüzsüz"
    }
  },
  {
    "id": "adj_247",
    "rank": 247,
    "word": "Cognitive",
    "phonetic": "/ˈkɒɡ.nə.tɪv/",
    "translation": "Bilişsel",
    "exampleEn": "Regular English study sessions boost overall cognitive focus and problem-solving.",
    "grammarNote": "",
    "exampleTr": "Düzenli İngilizce çalışma seansları genel bilişsel odağı ve problem çözmeyi artırır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more cognitive (than)",
      "phonetic": "/mɔːr ˈkɒɡ.nə.tɪv/",
      "translation": "daha bilişsel"
    },
    "superlative": {
      "form": "the most cognitive",
      "phonetic": "/ðə məʊst ˈkɒɡ.nə.tɪv/",
      "translation": "en bilişsel"
    },
    "antonym": {
      "word": "physical",
      "phonetic": "/ˈfɪz.ɪ.kəl/",
      "translation": "fiziksel"
    }
  },
  {
    "id": "adj_248",
    "rank": 248,
    "word": "Coherent",
    "phonetic": "/kəʊˈhɪə.rənt/",
    "translation": "Tutarlı / Bağlantılı",
    "exampleEn": "The technical guide provides a clear and coherent architectural blueprint.",
    "grammarNote": "",
    "exampleTr": "Teknik kılavuz net ve tutarlı bir mimari plan sunar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more coherent (than)",
      "phonetic": "/mɔːr kəʊˈhɪə.rənt/",
      "translation": "daha tutarlı"
    },
    "superlative": {
      "form": "the most coherent",
      "phonetic": "/ðə məʊst kəʊˈhɪə.rənt/",
      "translation": "en tutarlı"
    },
    "antonym": {
      "word": "incoherent",
      "phonetic": "/ˌɪn.kəʊˈhɪə.rənt/",
      "translation": "tutarsız"
    }
  },
  {
    "id": "adj_249",
    "rank": 249,
    "word": "Collective",
    "phonetic": "/kəˈlek.tɪv/",
    "translation": "Kolektif / Ortak",
    "exampleEn": "Building a successful tech community is a collective collaborative effort.",
    "grammarNote": "",
    "exampleTr": "Başarılı bir teknoloji topluluğu inşa etmek ortak bir işbirliği çabasıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more collective (than)",
      "phonetic": "/mɔːr kəˈlek.tɪv/",
      "translation": "daha ortak"
    },
    "superlative": {
      "form": "the most collective",
      "phonetic": "/ðə məʊst kəˈlek.tɪv/",
      "translation": "en ortak"
    },
    "antonym": {
      "word": "individual",
      "phonetic": "/ˌɪn.dɪˈvɪdʒ.u.əl/",
      "translation": "bireysel"
    }
  },
  {
    "id": "adj_250",
    "rank": 250,
    "word": "Compatible",
    "phonetic": "/kəmˈpæt.ə.bəl/",
    "translation": "Uyumlu",
    "exampleEn": "The updated Compose library is fully compatible with Android 15 SDK.",
    "grammarNote": "",
    "exampleTr": "Güncellenen Compose kütüphanesi Android 15 SDK ile tam uyumludur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more compatible (than)",
      "phonetic": "/mɔːr kəmˈpæt.ə.bəl/",
      "translation": "daha uyumlu"
    },
    "superlative": {
      "form": "the most compatible",
      "phonetic": "/ðə məʊst kəmˈpæt.ə.bəl/",
      "translation": "en uyumlu"
    },
    "antonym": {
      "word": "incompatible",
      "phonetic": "/ˌɪn.kəmˈpæt.ə.bəl/",
      "translation": "uyumsuz"
    }
  },
  {
    "id": "adj_251",
    "rank": 251,
    "word": "Competitive",
    "phonetic": "/kəmˈpet.ɪ.tɪv/",
    "translation": "Rekabetçi",
    "exampleEn": "Our e-commerce store özkan3d offers highly competitive prices on 3D products.",
    "grammarNote": "",
    "exampleTr": "E-ticaret mağazamız özkan3d 3D ürünlerde son derece rekabetçi fiyatlar sunar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more competitive (than)",
      "phonetic": "/mɔːr kəmˈpet.ɪ.tɪv/",
      "translation": "daha rekabetçi"
    },
    "superlative": {
      "form": "the most competitive",
      "phonetic": "/ðə məʊst kəmˈpet.ɪ.tɪv/",
      "translation": "en rekabetçi"
    },
    "antonym": {
      "word": "uncompetitive",
      "phonetic": "/ʌn.kəmˈpet.ɪ.tɪv/",
      "translation": "rekabetçi olmayan"
    }
  },
  {
    "id": "adj_252",
    "rank": 252,
    "word": "Comprehensive",
    "phonetic": "/ˌkɒm.prɪˈhen.sɪv/",
    "translation": "Kapsamlı / Detaylı",
    "exampleEn": "We prepared a comprehensive 40-episode English podcast curriculum.",
    "grammarNote": "",
    "exampleTr": "Kapsamlı 40 bölümlük bir İngilizce podcast müfredatı hazırladık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more comprehensive (than)",
      "phonetic": "/mɔːr ˌkɒm.prɪˈhen.sɪv/",
      "translation": "daha kapsamlı"
    },
    "superlative": {
      "form": "the most comprehensive",
      "phonetic": "/ðə məʊst ˌkɒm.prɪˈhen.sɪv/",
      "translation": "en kapsamlı"
    },
    "antonym": {
      "word": "limited / brief",
      "phonetic": "/ˈlɪm.ɪ.tɪd/",
      "translation": "sınırlı"
    }
  },
  {
    "id": "adj_253",
    "rank": 253,
    "word": "Concrete",
    "phonetic": "/ˈkɒŋ.kriːt/",
    "translation": "Somut / Kesin",
    "exampleEn": "We presented concrete benchmark numbers to prove our query optimization.",
    "grammarNote": "",
    "exampleTr": "Sorgu optimizasyonumuzu kanıtlamak için somut performans testi rakamları sunduk.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more concrete (than)",
      "phonetic": "/mɔːr ˈkɒŋ.kriːt/",
      "translation": "daha somut"
    },
    "superlative": {
      "form": "the most concrete",
      "phonetic": "/ðə məʊst ˈkɒŋ.kriːt/",
      "translation": "en somut"
    },
    "antonym": {
      "word": "abstract",
      "phonetic": "/ˈæb.strækt/",
      "translation": "soyut"
    }
  },
  {
    "id": "adj_254",
    "rank": 254,
    "word": "Confidential",
    "phonetic": "/ˌkɒn.fɪˈden.ʃəl/",
    "translation": "Gizli / Mahrem",
    "exampleEn": "Never commit confidential database passwords to public repositories.",
    "grammarNote": "",
    "exampleTr": "Gizli veritabanı şifrelerini asla herkese açık depolara commit etmeyin.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more confidential (than)",
      "phonetic": "/mɔːr ˌkɒn.fɪˈden.ʃəl/",
      "translation": "daha gizli"
    },
    "superlative": {
      "form": "the most confidential",
      "phonetic": "/ðə məʊst ˌkɒn.fɪˈden.ʃəl/",
      "translation": "en gizli"
    },
    "antonym": {
      "word": "public",
      "phonetic": "/ˈpʌb.lɪk/",
      "translation": "herkese açık"
    }
  },
  {
    "id": "adj_255",
    "rank": 255,
    "word": "Conscious",
    "phonetic": "/ˈkɒn.ʃəs/",
    "translation": "Bilinçli / Farkında",
    "exampleEn": "Our team is conscious of memory consumption on low-end Android hardware.",
    "grammarNote": "",
    "exampleTr": "Ekibimiz düşük donanımlı Android cihazlarda bellek tüketiminin bilincindedir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more conscious (than)",
      "phonetic": "/mɔːr ˈkɒn.ʃəs/",
      "translation": "daha bilinçli"
    },
    "superlative": {
      "form": "the most conscious",
      "phonetic": "/ðə məʊst ˈkɒn.ʃəs/",
      "translation": "en bilinçli"
    },
    "antonym": {
      "word": "unconscious",
      "phonetic": "/ʌnˈkɒn.ʃəs/",
      "translation": "bilinçsiz"
    }
  },
  {
    "id": "adj_256",
    "rank": 256,
    "word": "Consecutive",
    "phonetic": "/kənˈsek.jə.tɪv/",
    "translation": "Ardışık / Peş peşe",
    "exampleEn": "The server completed three consecutive days of stress testing without error.",
    "grammarNote": "",
    "exampleTr": "Sunucu hatasız üç ardışık stres testi gününü tamamladı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more consecutive (than)",
      "phonetic": "/mɔːr kənˈsek.jə.tɪv/",
      "translation": "daha ardışık"
    },
    "superlative": {
      "form": "the most consecutive",
      "phonetic": "/ðə məʊst kənˈsek.jə.tɪv/",
      "translation": "en ardışık"
    },
    "antonym": {
      "word": "intermittent",
      "phonetic": "/ˌɪn.təˈmɪt.ənt/",
      "translation": "aralıklı"
    }
  },
  {
    "id": "adj_257",
    "rank": 257,
    "word": "Consistent",
    "phonetic": "/kənˈsɪs.tənt/",
    "translation": "Tutarlı / İstikrarlı",
    "exampleEn": "Consistent daily practice is the key to mastering English speaking fluency.",
    "grammarNote": "",
    "exampleTr": "Tutarlı günlük pratik İngilizce akıcı konuşmasında ustalaşmanın anahtarıdır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more consistent (than)",
      "phonetic": "/mɔːr kənˈsɪs.tənt/",
      "translation": "daha tutarlı"
    },
    "superlative": {
      "form": "the most consistent",
      "phonetic": "/ðə məʊst kənˈsɪs.tənt/",
      "translation": "en tutarlı"
    },
    "antonym": {
      "word": "inconsistent",
      "phonetic": "/ˌɪn.kənˈsɪs.tənt/",
      "translation": "tutarsız"
    }
  },
  {
    "id": "adj_258",
    "rank": 258,
    "word": "Conspicuous",
    "phonetic": "/kənˈspɪk.ju.əs/",
    "translation": "Belirgin / Göze çarpan",
    "exampleEn": "The call-to-action button is conspicuous and clearly visible on mobile screens.",
    "grammarNote": "",
    "exampleTr": "Harekete geçirici mesaj butonu mobil ekranlarda göze çarpan ve net şekilde görünürdür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more conspicuous (than)",
      "phonetic": "/mɔːr kənˈspɪk.ju.əs/",
      "translation": "daha göze çarpan"
    },
    "superlative": {
      "form": "the most conspicuous",
      "phonetic": "/ðə məʊst kənˈspɪk.ju.əs/",
      "translation": "en göze çarpan"
    },
    "antonym": {
      "word": "inconspicuous",
      "phonetic": "/ɪn.kənˈspɪk.ju.əs/",
      "translation": "göze çarpmayan"
    }
  },
  {
    "id": "adj_259",
    "rank": 259,
    "word": "Constructive",
    "phonetic": "/kənˈstrʌk.tɪv/",
    "translation": "Yapıcı",
    "exampleEn": "The code review provided constructive feedback to enhance code readability.",
    "grammarNote": "",
    "exampleTr": "Kod incelemesi kod okunabilirliğini artırmak için yapıcı geri bildirim sağladı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more constructive (than)",
      "phonetic": "/mɔːr kənˈstrʌk.tɪv/",
      "translation": "daha yapıcı"
    },
    "superlative": {
      "form": "the most constructive",
      "phonetic": "/ðə məʊst kənˈstrʌk.tɪv/",
      "translation": "en yapıcı"
    },
    "antonym": {
      "word": "destructive",
      "phonetic": "/dɪˈstrʌk.tɪv/",
      "translation": "yıkıcı"
    }
  },
  {
    "id": "adj_260",
    "rank": 260,
    "word": "Contemporary",
    "phonetic": "/kənˈtem.pər.ər.i/",
    "translation": "Çağdaş / Güncel",
    "exampleEn": "Next.js represents contemporary best practices in full-stack web engineering.",
    "grammarNote": "",
    "exampleTr": "Next.js tam yığın web mühendisliğinde çağdaş en iyi uygulamaları temsil eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more contemporary (than)",
      "phonetic": "/mɔːr kənˈtem.pər.ər.i/",
      "translation": "daha çağdaş"
    },
    "superlative": {
      "form": "the most contemporary",
      "phonetic": "/ðə məʊst kənˈtem.pər.ər.i/",
      "translation": "en çağdaş"
    },
    "antonym": {
      "word": "outdated / ancient",
      "phonetic": "/ˈaʊtˌdeɪ.tɪd/",
      "translation": "eski"
    }
  },
  {
    "id": "adj_261",
    "rank": 261,
    "word": "Continuous",
    "phonetic": "/kənˈtɪn.ju.əs/",
    "translation": "Sürekli / Kesintisiz",
    "exampleEn": "Continuous Integration ensures code quality before every production merge.",
    "grammarNote": "",
    "exampleTr": "Sürekli Entegrasyon (CI) her canlı birleştirmeden önce kod kalitesini garanti eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more continuous (than)",
      "phonetic": "/mɔːr kənˈtɪn.ju.əs/",
      "translation": "daha kesintisiz"
    },
    "superlative": {
      "form": "the most continuous",
      "phonetic": "/ðə məʊst kənˈtɪn.ju.əs/",
      "translation": "en kesintisiz"
    },
    "antonym": {
      "word": "intermittent",
      "phonetic": "/ˌɪn.təˈmɪt.ənt/",
      "translation": "kesintili"
    }
  },
  {
    "id": "adj_262",
    "rank": 262,
    "word": "Conventional",
    "phonetic": "/kənˈven.ʃən.əl/",
    "translation": "Geleneksel / Alışılagelmiş",
    "exampleEn": "We replaced conventional XML layouts with modern declarative Compose.",
    "grammarNote": "",
    "exampleTr": "Geleneksel XML düzenlerini modern bildirimsel Compose ile değiştirdik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more conventional (than)",
      "phonetic": "/mɔːr kənˈven.ʃən.əl/",
      "translation": "daha geleneksel"
    },
    "superlative": {
      "form": "the most conventional",
      "phonetic": "/ðə məʊst kənˈven.ʃən.əl/",
      "translation": "en geleneksel"
    },
    "antonym": {
      "word": "unconventional",
      "phonetic": "/ˌʌn.kənˈven.ʃən.əl/",
      "translation": "sıra dışı"
    }
  },
  {
    "id": "adj_263",
    "rank": 263,
    "word": "Corporate",
    "phonetic": "/ˈkɔː.pər.ət/",
    "translation": "Kurumsal",
    "exampleEn": "We negotiate custom cloud pricing tiers with our corporate enterprise clients.",
    "grammarNote": "",
    "exampleTr": "Kurumsal işletme müşterilerimizle özel bulut fiyatlandırma kademeleri müzakere ederiz.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more corporate (than)",
      "phonetic": "/mɔːr ˈkɔː.pər.ət/",
      "translation": "daha kurumsal"
    },
    "superlative": {
      "form": "the most corporate",
      "phonetic": "/ðə məʊst ˈkɔː.pər.ət/",
      "translation": "en kurumsal"
    },
    "antonym": {
      "word": "individual / personal",
      "phonetic": "/ˌɪn.dɪˈvɪdʒ.u.əl/",
      "translation": "bireysel"
    }
  },
  {
    "id": "adj_264",
    "rank": 264,
    "word": "Costly",
    "phonetic": "/ˈkɒst.li/",
    "translation": "Maliyetli / Pahalı",
    "exampleEn": "Recovering from unbacked database failures is extremely costly.",
    "grammarNote": "",
    "exampleTr": "Yedeklenmemiş veritabanı arızalarından kurtulmak son derece maliyetlidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "costlier (than)",
      "phonetic": "/ˈkɒst.li.ər/",
      "translation": "daha maliyetli"
    },
    "superlative": {
      "form": "the costliest",
      "phonetic": "/ðə ˈkɒst.li.ɪst/",
      "translation": "en maliyetli"
    },
    "antonym": {
      "word": "inexpensive / cheap",
      "phonetic": "/ɪn.ɪkˈspen.sɪv/",
      "translation": "ucuz"
    }
  },
  {
    "id": "adj_265",
    "rank": 265,
    "word": "Creative",
    "phonetic": "/kriˈeɪ.tɪv/",
    "translation": "Yaratıcı",
    "exampleEn": "Software development is a highly creative and intellectual engineering discipline.",
    "grammarNote": "",
    "exampleTr": "Yazılım geliştirme son derece yaratıcı ve entelektüel bir mühendislik disiplinidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more creative (than)",
      "phonetic": "/mɔːr kriˈeɪ.tɪv/",
      "translation": "daha yaratıcı"
    },
    "superlative": {
      "form": "the most creative",
      "phonetic": "/ðə məʊst kriˈeɪ.tɪv/",
      "translation": "en yaratıcı"
    },
    "antonym": {
      "word": "uncreative",
      "phonetic": "/ʌn.kriˈeɪ.tɪv/",
      "translation": "yaratıcı olmayan"
    }
  },
  {
    "id": "adj_266",
    "rank": 266,
    "word": "Criminal",
    "phonetic": "/ˈkrɪm.ɪ.nəl/",
    "translation": "Suç Teşkil Eden / Cezai",
    "exampleEn": "Unauthorized access to private financial data is a serious criminal offense.",
    "grammarNote": "",
    "exampleTr": "Özel finansal verilere yetkisiz erişim ciddi bir suç teşkil eden fiildir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more criminal (than)",
      "phonetic": "/mɔːr ˈkrɪm.ɪ.nəl/",
      "translation": "daha cezai"
    },
    "superlative": {
      "form": "the most criminal",
      "phonetic": "/ðə məʊst ˈkrɪm.ɪ.nəl/",
      "translation": "en cezai"
    },
    "antonym": {
      "word": "lawful / legal",
      "phonetic": "/ˈlɔː.fəl/",
      "translation": "yasal"
    }
  },
  {
    "id": "adj_267",
    "rank": 267,
    "word": "Crowded",
    "phonetic": "/ˈkraʊ.dɪd/",
    "translation": "Kalabalık",
    "exampleEn": "Our traffic project GÖZCÜ detects emergency vehicles on crowded city streets.",
    "grammarNote": "",
    "exampleTr": "Trafik projemiz GÖZCÜ kalabalık şehir caddelerinde acil durum araçlarını tespit eder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more crowded (than)",
      "phonetic": "/mɔːr ˈkraʊ.dɪd/",
      "translation": "daha kalabalık"
    },
    "superlative": {
      "form": "the most crowded",
      "phonetic": "/ðə məʊst ˈkraʊ.dɪd/",
      "translation": "en kalabalık"
    },
    "antonym": {
      "word": "empty / deserted",
      "phonetic": "/ˈemp.ti/",
      "translation": "boş"
    }
  },
  {
    "id": "adj_268",
    "rank": 268,
    "word": "Crude",
    "phonetic": "/kruːd/",
    "translation": "Ham / İşlenmemiş",
    "exampleEn": "The crude camera video telemetry requires normalization before neural inference.",
    "grammarNote": "",
    "exampleTr": "Ham kamera video telemetrisi yapay sinir çıkarımından önce normalizasyon gerektirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cruder (than)",
      "phonetic": "/ˈkruː.dər/",
      "translation": "daha ham"
    },
    "superlative": {
      "form": "the crudest",
      "phonetic": "/ðə ˈkruː.dɪst/",
      "translation": "en ham"
    },
    "antonym": {
      "word": "refined",
      "phonetic": "/rɪˈfaɪnd/",
      "translation": "işlenmiş"
    }
  },
  {
    "id": "adj_269",
    "rank": 269,
    "word": "Cultural",
    "phonetic": "/ˈkʌl.tʃər.əl/",
    "translation": "Kültürel",
    "exampleEn": "Learning English provides rich cultural insights into global software teams.",
    "grammarNote": "",
    "exampleTr": "İngilizce öğrenmek küresel yazılım ekiplerine dair zengin kültürel içgörüler sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more cultural (than)",
      "phonetic": "/mɔːr ˈkʌl.tʃər.əl/",
      "translation": "daha kültürel"
    },
    "superlative": {
      "form": "the most cultural",
      "phonetic": "/ðə məʊst ˈkʌl.tʃər.əl/",
      "translation": "en kültürel"
    },
    "antonym": {
      "word": "non-cultural",
      "phonetic": "/nɒn.ˈkʌl.tʃər.əl/",
      "translation": "kültürel olmayan"
    }
  },
  {
    "id": "adj_270",
    "rank": 270,
    "word": "Cumulative",
    "phonetic": "/ˈkjuː.mjə.lə.tɪv/",
    "translation": "Kümülatif / Birikimli",
    "exampleEn": "Small daily vocabulary study sessions produce massive cumulative fluency gains.",
    "grammarNote": "",
    "exampleTr": "Küçük günlük kelime çalışma oturumları muazzam birikimli akıcılık kazanımları üretir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more cumulative (than)",
      "phonetic": "/mɔːr ˈkjuː.mjə.lə.tɪv/",
      "translation": "daha kümülatif"
    },
    "superlative": {
      "form": "the most cumulative",
      "phonetic": "/ðə məʊst ˈkjuː.mjə.lə.tɪv/",
      "translation": "en kümülatif"
    },
    "antonym": {
      "word": "decremental",
      "phonetic": "/ˈdek.rɪ.mən.təl/",
      "translation": "azalan"
    }
  },
  {
    "id": "adj_271",
    "rank": 271,
    "word": "Custom",
    "phonetic": "/ˈkʌs.təm/",
    "translation": "Özel / Özelleştirilmiş",
    "exampleEn": "We implemented a custom CameraX analyzer to scan food ingredients.",
    "grammarNote": "",
    "exampleTr": "Yiyecek malzemelerini taramak için özel bir CameraX analizörü uyguladık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more custom (than)",
      "phonetic": "/mɔːr ˈkʌs.təm/",
      "translation": "daha özel"
    },
    "superlative": {
      "form": "the most custom",
      "phonetic": "/ðə məʊst ˈkʌs.təm/",
      "translation": "en özel"
    },
    "antonym": {
      "word": "standard",
      "phonetic": "/ˈstæn.dəd/",
      "translation": "standart"
    }
  },
  {
    "id": "adj_272",
    "rank": 272,
    "word": "Cute",
    "phonetic": "/kjuːt/",
    "translation": "Sevimli / Tatlı",
    "exampleEn": "We added a cute animated mascot to our language learning application.",
    "grammarNote": "",
    "exampleTr": "Dil öğrenme uygulamamıza sevimli animasyonlu bir maskot ekledik.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "cuter (than)",
      "phonetic": "/ˈkjuː.tər/",
      "translation": "daha sevimli"
    },
    "superlative": {
      "form": "the cutest",
      "phonetic": "/ðə ˈkjuː.tɪst/",
      "translation": "en sevimli"
    },
    "antonym": {
      "word": "repulsive",
      "phonetic": "/rɪˈpʌl.sɪv/",
      "translation": "itici"
    }
  },
  {
    "id": "adj_273",
    "rank": 273,
    "word": "Damp",
    "phonetic": "/dæmp/",
    "translation": "Nemli / Rutubetli",
    "exampleEn": "Keep electronic microcontrollers away from damp and humid environments.",
    "grammarNote": "",
    "exampleTr": "Elektronik mikrodenetleyicileri nemli ve rutubetli ortamlardan uzak tutun.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "damper (than)",
      "phonetic": "/ˈdæm.pər/",
      "translation": "daha nemli"
    },
    "superlative": {
      "form": "the dampest",
      "phonetic": "/ðə ˈdæm.pɪst/",
      "translation": "en nemli"
    },
    "antonym": {
      "word": "dry",
      "phonetic": "/draɪ/",
      "translation": "kuru"
    }
  },
  {
    "id": "adj_274",
    "rank": 274,
    "word": "Daring",
    "phonetic": "/ˈdeə.rɪŋ/",
    "translation": "Cesur / Cüretkâr",
    "exampleEn": "Migrating production databases live without downtime was a daring decision.",
    "grammarNote": "",
    "exampleTr": "Canlı veritabanlarını kesinti olmadan taşımak cesur / cüretkâr bir karardı.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more daring (than)",
      "phonetic": "/mɔːr ˈdeə.rɪŋ/",
      "translation": "daha cüretkâr"
    },
    "superlative": {
      "form": "the most daring",
      "phonetic": "/ðə məʊst ˈdeə.rɪŋ/",
      "translation": "en cüretkâr"
    },
    "antonym": {
      "word": "timid",
      "phonetic": "/ˈtɪm.ɪd/",
      "translation": "çekingen"
    }
  },
  {
    "id": "adj_275",
    "rank": 275,
    "word": "Deaf",
    "phonetic": "/def/",
    "translation": "İşitme Engelli / Sağır",
    "exampleEn": "Our podcast application includes synchronized subtitles for deaf users.",
    "grammarNote": "",
    "exampleTr": "Podcast uygulamamız işitme engelli kullanıcılar için senkronize altyazılar içerir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "deafer (than)",
      "phonetic": "/ˈdef.ər/",
      "translation": "daha sağır"
    },
    "superlative": {
      "form": "the deafest",
      "phonetic": "/ðə ˈdef.ɪst/",
      "translation": "en sağır"
    },
    "antonym": {
      "word": "hearing",
      "phonetic": "/ˈhɪə.rɪŋ/",
      "translation": "işiten"
    }
  },
  {
    "id": "adj_276",
    "rank": 276,
    "word": "Decent",
    "phonetic": "/ˈdiː.sənt/",
    "translation": "Düzgün / Saygın / Yeterli",
    "exampleEn": "A decent fiber internet connection is mandatory for remote engineering work.",
    "grammarNote": "",
    "exampleTr": "Uzaktan mühendislik çalışması için düzgün bir fiber internet bağlantısı zorunludur.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more decent (than)",
      "phonetic": "/mɔːr ˈdiː.sənt/",
      "translation": "daha düzgün"
    },
    "superlative": {
      "form": "the most decent",
      "phonetic": "/ðə məʊst ˈdiː.sənt/",
      "translation": "en düzgün"
    },
    "antonym": {
      "word": "indecent / poor",
      "phonetic": "/ɪnˈdiː.sənt/",
      "translation": "yetersiz"
    }
  },
  {
    "id": "adj_277",
    "rank": 277,
    "word": "Declarative",
    "phonetic": "/dɪˈklær.ə.tɪv/",
    "translation": "Bildirimsel",
    "exampleEn": "Jetpack Compose and React utilize declarative paradigms for UI rendering.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose ve React kullanıcı arayüzü çizimi için bildirimsel paradigmaları kullanır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more declarative (than)",
      "phonetic": "/mɔːr dɪˈklær.ə.tɪv/",
      "translation": "daha bildirimsel"
    },
    "superlative": {
      "form": "the most declarative",
      "phonetic": "/ðə məʊst dɪˈklær.ə.tɪv/",
      "translation": "en bildirimsel"
    },
    "antonym": {
      "word": "imperative",
      "phonetic": "/ɪmˈper.ə.tɪv/",
      "translation": "adımsal / emirsel"
    }
  },
  {
    "id": "adj_278",
    "rank": 278,
    "word": "Dedicated",
    "phonetic": "/ˈded.ɪ.keɪ.tɪd/",
    "translation": "Özel / Tahsis Edilmiş",
    "exampleEn": "We deployed our production PostgreSQL database on a dedicated cloud server.",
    "grammarNote": "",
    "exampleTr": "Canlı PostgreSQL veritabanımızı özel tahsis edilmiş bir bulut sunucusuna dağıttık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dedicated (than)",
      "phonetic": "/mɔːr ˈded.ɪ.keɪ.tɪd/",
      "translation": "daha tahsis edilmiş"
    },
    "superlative": {
      "form": "the most dedicated",
      "phonetic": "/ðə məʊst ˈded.ɪ.keɪ.tɪd/",
      "translation": "en çok tahsis edilmiş"
    },
    "antonym": {
      "word": "shared",
      "phonetic": "/ʃeəd/",
      "translation": "paylaşımlı"
    }
  },
  {
    "id": "adj_279",
    "rank": 279,
    "word": "Defective",
    "phonetic": "/dɪˈfek.tɪv/",
    "translation": "Kusurlu / Bozuk",
    "exampleEn": "The automated quality control pipeline rejects defective 3D prints.",
    "grammarNote": "",
    "exampleTr": "Otomatik kalite kontrol işlem hattı kusurlu 3D baskıları reddeder.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more defective (than)",
      "phonetic": "/mɔːr dɪˈfek.tɪv/",
      "translation": "daha kusurlu"
    },
    "superlative": {
      "form": "the most defective",
      "phonetic": "/ðə məʊst dɪˈfek.tɪv/",
      "translation": "en kusurlu"
    },
    "antonym": {
      "word": "flawless / functional",
      "phonetic": "/ˈflɔː.ləs/",
      "translation": "kusursuz"
    }
  },
  {
    "id": "adj_280",
    "rank": 280,
    "word": "Defensive",
    "phonetic": "/dɪˈfen.sɪv/",
    "translation": "Savunmacı / Güvenlik Odaklı",
    "exampleEn": "Defensive programming practices prevent unhandled exceptions and crashes.",
    "grammarNote": "",
    "exampleTr": "Savunmacı programlama uygulamaları işlenmemiş istisnaları ve çökmeleri önler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more defensive (than)",
      "phonetic": "/mɔːr dɪˈfen.sɪv/",
      "translation": "daha savunmacı"
    },
    "superlative": {
      "form": "the most defensive",
      "phonetic": "/ðə məʊst dɪˈfen.sɪv/",
      "translation": "en savunmacı"
    },
    "antonym": {
      "word": "offensive",
      "phonetic": "/əˈfen.sɪv/",
      "translation": "saldırgan"
    }
  },
  {
    "id": "adj_281",
    "rank": 281,
    "word": "Delicate",
    "phonetic": "/ˈdel.ɪ.kət/",
    "translation": "Hassas / Narin",
    "exampleEn": "Handling live financial transactions requires delicate concurrency controls.",
    "grammarNote": "",
    "exampleTr": "Canlı finansal işlemleri yönetmek hassas eşzamanlılık kontrolleri gerektirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more delicate (than)",
      "phonetic": "/mɔːr ˈdel.ɪ.kət/",
      "translation": "daha hassas"
    },
    "superlative": {
      "form": "the most delicate",
      "phonetic": "/ðə məʊst ˈdel.ɪ.kət/",
      "translation": "en hassas"
    },
    "antonym": {
      "word": "robust / tough",
      "phonetic": "/rəʊˈbʌst/",
      "translation": "sağlam"
    }
  },
  {
    "id": "adj_282",
    "rank": 282,
    "word": "Democratic",
    "phonetic": "/ˌdem.əˈkræt.ɪk/",
    "translation": "Demokratik / Katılımcı",
    "exampleEn": "Open-source governance operates under democratic contribution principles.",
    "grammarNote": "",
    "exampleTr": "Açık kaynak yönetişimi demokratik katkı ilkeleri altında çalışır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more democratic (than)",
      "phonetic": "/mɔːr ˌdem.əˈkræt.ɪk/",
      "translation": "daha demokratik"
    },
    "superlative": {
      "form": "the most democratic",
      "phonetic": "/ðə məʊst ˌdem.əˈkræt.ɪk/",
      "translation": "en demokratik"
    },
    "antonym": {
      "word": "authoritarian",
      "phonetic": "/ɔːˌθɒr.ɪˈteə.ri.ən/",
      "translation": "otoriter"
    }
  },
  {
    "id": "adj_283",
    "rank": 283,
    "word": "Dense",
    "phonetic": "/dens/",
    "translation": "Yoğun / Sık",
    "exampleEn": "Dense neural layer weights are compressed before edge deployment.",
    "grammarNote": "",
    "exampleTr": "Yoğun yapay sinir katman ağırlıkları uç cihaz dağıtımından önce sıkıştırılır.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "denser (than)",
      "phonetic": "/ˈden.sər/",
      "translation": "daha yoğun"
    },
    "superlative": {
      "form": "the densest",
      "phonetic": "/ðə ˈden.sɪst/",
      "translation": "en yoğun"
    },
    "antonym": {
      "word": "sparse",
      "phonetic": "/spɑːs/",
      "translation": "seyrek"
    }
  },
  {
    "id": "adj_284",
    "rank": 284,
    "word": "Desirable",
    "phonetic": "/dɪˈzaɪə.rə.bəl/",
    "translation": "Arzu Edilen / İstenen",
    "exampleEn": "Sub-millisecond query execution is a highly desirable system quality.",
    "grammarNote": "",
    "exampleTr": "Milisaniye altı sorgu yürütme son derece arzu edilen bir sistem kalitesidir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more desirable (than)",
      "phonetic": "/mɔːr dɪˈzaɪə.rə.bəl/",
      "translation": "daha arzu edilen"
    },
    "superlative": {
      "form": "the most desirable",
      "phonetic": "/ðə məʊst dɪˈzaɪə.rə.bəl/",
      "translation": "en arzu edilen"
    },
    "antonym": {
      "word": "undesirable",
      "phonetic": "/ˌʌn.dɪˈzaɪə.rə.bəl/",
      "translation": "istenmeyen"
    }
  },
  {
    "id": "adj_285",
    "rank": 285,
    "word": "Destructive",
    "phonetic": "/dɪˈstrʌk.tɪv/",
    "translation": "Yıkıcı / Zararlı",
    "exampleEn": "Destructive database migration operations require multi-engineer authorization.",
    "grammarNote": "",
    "exampleTr": "Yıkıcı veritabanı taşıma operasyonları çoklu mühendis yetkilendirmesi gerektirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more destructive (than)",
      "phonetic": "/mɔːr dɪˈstrʌk.tɪv/",
      "translation": "daha yıkıcı"
    },
    "superlative": {
      "form": "the most destructive",
      "phonetic": "/ðə məʊst dɪˈstrʌk.tɪv/",
      "translation": "en yıkıcı"
    },
    "antonym": {
      "word": "constructive",
      "phonetic": "/kənˈstrʌk.tɪv/",
      "translation": "yapıcı"
    }
  },
  {
    "id": "adj_286",
    "rank": 286,
    "word": "Deterministic",
    "phonetic": "/dɪˌtɜː.mɪˈnɪs.tɪk/",
    "translation": "Belirlenimci / Öngörülebilir",
    "exampleEn": "Pure functions in Kotlin are deterministic and have zero side effects.",
    "grammarNote": "",
    "exampleTr": "Kotlin'deki saf fonksiyonlar belirlenimcidir ve sıfır yan etkiye sahiptir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more deterministic (than)",
      "phonetic": "/mɔːr dɪˌtɜː.mɪˈnɪs.tɪk/",
      "translation": "daha belirlenimci"
    },
    "superlative": {
      "form": "the most deterministic",
      "phonetic": "/ðə məʊst dɪˌtɜː.mɪˈnɪs.tɪk/",
      "translation": "en belirlenimci"
    },
    "antonym": {
      "word": "stochastic / random",
      "phonetic": "/stəˈkæs.tɪk/",
      "translation": "rastlantısal"
    }
  },
  {
    "id": "adj_287",
    "rank": 287,
    "word": "Digital",
    "phonetic": "/ˈdɪdʒ.ɪ.təl/",
    "translation": "Dijital",
    "exampleEn": "We designed Havamda as a digital smart wardrobe planning concept.",
    "grammarNote": "",
    "exampleTr": "Havamda'yı dijital bir akıllı gardırop planlama konsepti olarak tasarladık.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more digital (than)",
      "phonetic": "/mɔːr ˈdɪdʒ.ɪ.təl/",
      "translation": "daha dijital"
    },
    "superlative": {
      "form": "the most digital",
      "phonetic": "/ðə məʊst ˈdɪdʒ.ɪ.təl/",
      "translation": "en dijital"
    },
    "antonym": {
      "word": "analog",
      "phonetic": "/ˈæn.ə.lɒɡ/",
      "translation": "analog"
    }
  },
  {
    "id": "adj_288",
    "rank": 288,
    "word": "Diplomatic",
    "phonetic": "/ˌdɪp.ləˈmæt.ɪk/",
    "translation": "Diplomatik / Nezaketli",
    "exampleEn": "Customer support leads maintain a calm and diplomatic tone during escalations.",
    "grammarNote": "",
    "exampleTr": "Müşteri destek liderleri kriz anlarında sakin ve diplomatik bir ton sürdürür.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more diplomatic (than)",
      "phonetic": "/mɔːr ˌdɪp.ləˈmæt.ɪk/",
      "translation": "daha diplomatik"
    },
    "superlative": {
      "form": "the most diplomatic",
      "phonetic": "/ðə məʊst ˌdɪp.ləˈmæt.ɪk/",
      "translation": "en diplomatik"
    },
    "antonym": {
      "word": "tactless",
      "phonetic": "/ʌnˌdɪp.ləˈmæt.ɪk/",
      "translation": "patavatsız"
    }
  },
  {
    "id": "adj_289",
    "rank": 289,
    "word": "Discrete",
    "phonetic": "/dɪˈskriːt/",
    "translation": "Ayrık / Bağımsız",
    "exampleEn": "The controller samples discrete sensor signals forty times per second.",
    "grammarNote": "",
    "exampleTr": "Kontrolcü ayrık sensör sinyallerini saniyede kırk kez örnekler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more discrete (than)",
      "phonetic": "/mɔːr dɪˈskriːt/",
      "translation": "daha ayrık"
    },
    "superlative": {
      "form": "the most discrete",
      "phonetic": "/ðə məʊst dɪˈskriːt/",
      "translation": "en ayrık"
    },
    "antonym": {
      "word": "continuous",
      "phonetic": "/kənˈtɪn.ju.əs/",
      "translation": "sürekli"
    }
  },
  {
    "id": "adj_290",
    "rank": 290,
    "word": "Diverse",
    "phonetic": "/daɪˈvɜːs/",
    "translation": "Çeşitli / Farklı",
    "exampleEn": "Our developer community brings together students from diverse engineering backgrounds.",
    "grammarNote": "",
    "exampleTr": "Geliştirici topluluğumuz farklı mühendislik geçmişlerinden gelen öğrencileri bir araya getirir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more diverse (than)",
      "phonetic": "/mɔːr daɪˈvɜːs/",
      "translation": "daha çeşitli"
    },
    "superlative": {
      "form": "the most diverse",
      "phonetic": "/ðə məʊst daɪˈvɜːs/",
      "translation": "en çeşitli"
    },
    "antonym": {
      "word": "uniform / homogeneous",
      "phonetic": "/ˈjuː.nɪ.fɔːm/",
      "translation": "tekdüze"
    }
  },
  {
    "id": "adj_291",
    "rank": 291,
    "word": "Domestic",
    "phonetic": "/dəˈmes.tɪk/",
    "translation": "Yerli / Ülke İçi",
    "exampleEn": "PayTR processes domestic Turkish bank cards with instantaneous authorization.",
    "grammarNote": "",
    "exampleTr": "PayTR yerli Türk banka kartlarını anlık yetkilendirme ile işler.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more domestic (than)",
      "phonetic": "/mɔːr dəˈmes.tɪk/",
      "translation": "daha yerli"
    },
    "superlative": {
      "form": "the most domestic",
      "phonetic": "/ðə məʊst dəˈmes.tɪk/",
      "translation": "en yerli"
    },
    "antonym": {
      "word": "foreign / international",
      "phonetic": "/ˈfɒr.ən/",
      "translation": "yabancı / uluslararası"
    }
  },
  {
    "id": "adj_292",
    "rank": 292,
    "word": "Dominant",
    "phonetic": "/ˈdɒm.ɪ.nənt/",
    "translation": "Baskın / Egemen",
    "exampleEn": "Kotlin has become the dominant technology for modern Android development.",
    "grammarNote": "",
    "exampleTr": "Kotlin modern Android geliştirme için baskın teknoloji haline gelmiştir.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dominant (than)",
      "phonetic": "/mɔːr ˈdɒm.ɪ.nənt/",
      "translation": "daha baskın"
    },
    "superlative": {
      "form": "the most dominant",
      "phonetic": "/ðə məʊst ˈdɒm.ɪ.nənt/",
      "translation": "en baskın"
    },
    "antonym": {
      "word": "recessive",
      "phonetic": "/rɪˈses.ɪv/",
      "translation": "çekinik"
    }
  },
  {
    "id": "adj_293",
    "rank": 293,
    "word": "Dramatic",
    "phonetic": "/drəˈmæt.ɪk/",
    "translation": "Çarpıcı / Dramatik",
    "exampleEn": "Adopting Redis caching caused a dramatic drop in API response latency.",
    "grammarNote": "",
    "exampleTr": "Redis önbelleklemesini benimsemek API yanıt gecikmesinde çarpıcı bir düşüşe neden oldu.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dramatic (than)",
      "phonetic": "/mɔːr drəˈmæt.ɪk/",
      "translation": "daha çarpıcı"
    },
    "superlative": {
      "form": "the most dramatic",
      "phonetic": "/ðə məʊst drəˈmæt.ɪk/",
      "translation": "en çarpıcı"
    },
    "antonym": {
      "word": "subtle / minor",
      "phonetic": "/ˈsʌt.əl/",
      "translation": "hafif / ince"
    }
  },
  {
    "id": "adj_294",
    "rank": 294,
    "word": "Dual",
    "phonetic": "/ˈdʒuː.əl/",
    "translation": "Çift / İkili",
    "exampleEn": "I operate a dual-monitor workstation to write code and monitor logs simultaneously.",
    "grammarNote": "",
    "exampleTr": "Aynı anda kod yazmak ve günlükleri izlemek için çift monitörlü bir iş istasyonu çalıştırırım.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dual (than)",
      "phonetic": "/mɔːr ˈdʒuː.əl/",
      "translation": "daha çift"
    },
    "superlative": {
      "form": "the most dual",
      "phonetic": "/ðə məʊst ˈdʒuː.əl/",
      "translation": "en ikili"
    },
    "antonym": {
      "word": "single",
      "phonetic": "/ˈsɪŋ.ɡəl/",
      "translation": "tekli"
    }
  },
  {
    "id": "adj_295",
    "rank": 295,
    "word": "Durable",
    "phonetic": "/ˈdʒʊə.rə.bəl/",
    "translation": "Dayanıklı / Kalıcı",
    "exampleEn": "PostgreSQL provides durable transaction logging via Write-Ahead Logs.",
    "grammarNote": "",
    "exampleTr": "PostgreSQL Önceden Yazma Günlükleri (WAL) aracılığıyla dayanıklı işlem kaydı sağlar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more durable (than)",
      "phonetic": "/mɔːr ˈdʒʊə.rə.bəl/",
      "translation": "daha dayanıklı"
    },
    "superlative": {
      "form": "the most durable",
      "phonetic": "/ðə məʊst ˈdʒʊə.rə.bəl/",
      "translation": "en dayanıklı"
    },
    "antonym": {
      "word": "fragile",
      "phonetic": "/ˈfrædʒ.aɪl/",
      "translation": "kırılgan"
    }
  },
  {
    "id": "adj_296",
    "rank": 296,
    "word": "Dynamic",
    "phonetic": "/daɪˈnæm.ɪk/",
    "translation": "Dinamik / Değişken",
    "exampleEn": "Jetpack Compose recalculates dynamic UI layouts based on runtime state changes.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose çalışma zamanı durum değişikliklerine göre dinamik arayüz düzenlerini yeniden hesaplar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more dynamic (than)",
      "phonetic": "/mɔːr daɪˈnæm.ɪk/",
      "translation": "daha dinamik"
    },
    "superlative": {
      "form": "the most dynamic",
      "phonetic": "/ðə məʊst daɪˈnæm.ɪk/",
      "translation": "en dinamik"
    },
    "antonym": {
      "word": "static",
      "phonetic": "/ˈstæt.ɪk/",
      "translation": "statik"
    }
  },
  {
    "id": "adj_297",
    "rank": 297,
    "word": "Economic",
    "phonetic": "/ˌiː.kəˈnɒm.ɪk/",
    "translation": "İktisadi / Ekonomik",
    "exampleEn": "Serverless architectures offer an economic hosting model for low-traffic apps.",
    "grammarNote": "",
    "exampleTr": "Sunucusuz mimariler düşük trafikli uygulamalar için ekonomik bir barındırma modeli sunar.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more economic (than)",
      "phonetic": "/mɔːr ˌiː.kəˈnɒm.ɪk/",
      "translation": "daha ekonomik"
    },
    "superlative": {
      "form": "the most economic",
      "phonetic": "/ðə məʊst ˌiː.kəˈnɒm.ɪk/",
      "translation": "en ekonomik"
    },
    "antonym": {
      "word": "non-economic",
      "phonetic": "/ˌnɒn.iː.kəˈnɒm.ɪk/",
      "translation": "iktisadi olmayan"
    }
  },
  {
    "id": "adj_298",
    "rank": 298,
    "word": "Empirical",
    "phonetic": "/ɪmˈpɪr.ɪ.kəl/",
    "translation": "Ampirik / Deneye Dayalı",
    "exampleEn": "Our thesis paper validates the DeepFake detection model with empirical benchmarks.",
    "grammarNote": "",
    "exampleTr": "Tez makalemiz DeepFake tespit modelini ampirik performans testleriyle doğrular.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more empirical (than)",
      "phonetic": "/mɔːr ɪmˈpɪr.ɪ.kəl/",
      "translation": "daha ampirik"
    },
    "superlative": {
      "form": "the most empirical",
      "phonetic": "/ðə məʊst ɪmˈpɪr.ɪ.kəl/",
      "translation": "en ampirik"
    },
    "antonym": {
      "word": "theoretical",
      "phonetic": "/ˌθɪəˈret.ɪ.kəl/",
      "translation": "teorik"
    }
  },
  {
    "id": "adj_299",
    "rank": 299,
    "word": "Endless",
    "phonetic": "/ˈend.ləs/",
    "translation": "Sonsuz / Bitmek Bilmeyen",
    "exampleEn": "Avoid writing recursive functions that result in endless infinite loops.",
    "grammarNote": "",
    "exampleTr": "Sonsuz döngülerle sonuçlanan özyinelemeli fonksiyonlar yazmaktan kaçının.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more endless (than)",
      "phonetic": "/mɔːr ˈend.ləs/",
      "translation": "daha sonsuz"
    },
    "superlative": {
      "form": "the most endless",
      "phonetic": "/ðə məʊst ˈend.ləs/",
      "translation": "en sonsuz"
    },
    "antonym": {
      "word": "finite / limited",
      "phonetic": "/ˈfaɪ.naɪt/",
      "translation": "sonlu / sınırlı"
    }
  },
  {
    "id": "adj_300",
    "rank": 300,
    "word": "Energetic",
    "phonetic": "/ˌen.əˈdʒet.ɪk/",
    "translation": "Enerjik / Canlı",
    "exampleEn": "The university hackathon had an energetic and inspiring atmosphere.",
    "grammarNote": "",
    "exampleTr": "Üniversite hackathonu enerjik ve ilham verici bir atmosfere sahipti.",
    "partOfSpeech": "adjective",
    "comparative": {
      "form": "more energetic (than)",
      "phonetic": "/mɔːr ˌen.əˈdʒet.ɪk/",
      "translation": "daha enerjik"
    },
    "superlative": {
      "form": "the most energetic",
      "phonetic": "/ðə məʊst ˌen.əˈdʒet.ɪk/",
      "translation": "en enerjik"
    },
    "antonym": {
      "word": "lethargic / tired",
      "phonetic": "/ˈleθ.ə.dʒɪk/",
      "translation": "yorgun / uyuşuk"
    }
  }
] as LibraryWordEntry[];

export const NOUNS_100: LibraryWordEntry[] = [
  {
    "id": "noun_001",
    "rank": 1,
    "word": "Book",
    "phonetic": "/bʊk/",
    "translation": "Kitap",
    "exampleEn": "I am reading a very interesting book about software architecture right now.",
    "grammarNote": "",
    "exampleTr": "Şu anda yazılım mimarisi hakkında çok ilginç bir kitap okuyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a book",
      "phonetic": "/bʊk/",
      "translation": "bir kitap"
    },
    "plural": {
      "form": "books",
      "phonetic": "/bʊks/",
      "translation": "kitaplar"
    },
    "possessivePhrase": {
      "form": "my book",
      "translation": "benim kitabım"
    },
    "determinerPhrase": {
      "form": "this book",
      "translation": "bu kitap"
    }
  },
  {
    "id": "noun_002",
    "rank": 2,
    "word": "Car",
    "phonetic": "/kɑːr/",
    "translation": "Araba / Otomobil",
    "exampleEn": "He bought a new electric car last month.",
    "grammarNote": "",
    "exampleTr": "O geçen ay yeni bir elektrikli araba satın aldı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a car",
      "phonetic": "/kɑːr/",
      "translation": "bir araba"
    },
    "plural": {
      "form": "cars",
      "phonetic": "/kɑːrz/",
      "translation": "arabalar"
    },
    "possessivePhrase": {
      "form": "our car",
      "translation": "bizim arabamız"
    },
    "determinerPhrase": {
      "form": "that electric car",
      "translation": "şu elektrikli araba"
    }
  },
  {
    "id": "noun_003",
    "rank": 3,
    "word": "Computer",
    "phonetic": "/kəmˈpjuː.tər/",
    "translation": "Bilgisayar",
    "exampleEn": "My computer runs multiple virtual machines smoothly.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarım birden çok sanal makineyi sorunsuzca çalıştırır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a computer",
      "phonetic": "/kəmˈpjuː.tər/",
      "translation": "bir bilgisayar"
    },
    "plural": {
      "form": "computers",
      "phonetic": "/kəmˈpjuː.tərz/",
      "translation": "bilgisayarlar"
    },
    "possessivePhrase": {
      "form": "his computer",
      "translation": "onun bilgisayarı"
    },
    "determinerPhrase": {
      "form": "this fast computer",
      "translation": "bu hızlı bilgisayar"
    }
  },
  {
    "id": "noun_004",
    "rank": 4,
    "word": "Phone",
    "phonetic": "/fəʊn/",
    "translation": "Telefon",
    "exampleEn": "I am using my phone to test the new mobile application build.",
    "grammarNote": "",
    "exampleTr": "Yeni mobil uygulama derlemesini test etmek için telefonumu kullanıyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a phone",
      "phonetic": "/fəʊn/",
      "translation": "bir telefon"
    },
    "plural": {
      "form": "phones",
      "phonetic": "/fəʊnz/",
      "translation": "telefonlar"
    },
    "possessivePhrase": {
      "form": "your phone",
      "translation": "senin telefonun"
    },
    "determinerPhrase": {
      "form": "this smartphone",
      "translation": "bu akıllı telefon"
    }
  },
  {
    "id": "noun_005",
    "rank": 5,
    "word": "House",
    "phonetic": "/haʊs/",
    "translation": "Ev",
    "exampleEn": "They will move to a larger house next summer.",
    "grammarNote": "",
    "exampleTr": "Gelecek yaz daha büyük bir eve taşınacaklar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a house",
      "phonetic": "/haʊs/",
      "translation": "bir ev"
    },
    "plural": {
      "form": "houses",
      "phonetic": "/ˈhaʊ.zɪz/",
      "translation": "evler"
    },
    "possessivePhrase": {
      "form": "their house",
      "translation": "onların evi"
    },
    "determinerPhrase": {
      "form": "this modern house",
      "translation": "bu modern ev"
    }
  },
  {
    "id": "noun_006",
    "rank": 6,
    "word": "Room",
    "phonetic": "/ruːm/",
    "translation": "Oda",
    "exampleEn": "There are three workstations in this room.",
    "grammarNote": "",
    "exampleTr": "Bu odada üç iş istasyonu bulunmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a room",
      "phonetic": "/ruːm/",
      "translation": "bir oda"
    },
    "plural": {
      "form": "rooms",
      "phonetic": "/ruːmz/",
      "translation": "odalar"
    },
    "possessivePhrase": {
      "form": "my room",
      "translation": "benim odam"
    },
    "determinerPhrase": {
      "form": "the server room",
      "translation": "sunucu odası"
    }
  },
  {
    "id": "noun_007",
    "rank": 7,
    "word": "School",
    "phonetic": "/skuːl/",
    "translation": "Okul",
    "exampleEn": "I studied computer engineering at this school.",
    "grammarNote": "",
    "exampleTr": "Bu okulda bilgisayar mühendisliği okudum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a school",
      "phonetic": "/skuːl/",
      "translation": "bir okul"
    },
    "plural": {
      "form": "schools",
      "phonetic": "/skuːlz/",
      "translation": "okullar"
    },
    "possessivePhrase": {
      "form": "our school",
      "translation": "bizim okulumuz"
    },
    "determinerPhrase": {
      "form": "this engineering school",
      "translation": "bu mühendislik okulu"
    }
  },
  {
    "id": "noun_008",
    "rank": 8,
    "word": "Teacher",
    "phonetic": "/ˈtiː.tʃər/",
    "translation": "Öğretmen",
    "exampleEn": "Our teacher explained the machine learning concept very clearly.",
    "grammarNote": "",
    "exampleTr": "Öğretmenimiz makine öğrenmesi kavramını çok net bir şekilde açıkladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a teacher",
      "phonetic": "/ˈtiː.tʃər/",
      "translation": "bir öğretmen"
    },
    "plural": {
      "form": "teachers",
      "phonetic": "/ˈtiː.tʃərz/",
      "translation": "öğretmenler"
    },
    "possessivePhrase": {
      "form": "our teacher",
      "translation": "öğretmenimiz"
    },
    "determinerPhrase": {
      "form": "the senior teacher",
      "translation": "kıdemli öğretmen"
    }
  },
  {
    "id": "noun_009",
    "rank": 9,
    "word": "Student",
    "phonetic": "/ˈstjuː.dənt/",
    "translation": "Öğrenci",
    "exampleEn": "Many students are attending the AI developer workshop today.",
    "grammarNote": "",
    "exampleTr": "Bugün birçok öğrenci yapay zeka geliştirici atölyesine katılıyor.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a student",
      "phonetic": "/ˈstjuː.dənt/",
      "translation": "bir öğrenci"
    },
    "plural": {
      "form": "students",
      "phonetic": "/ˈstjuː.dənts/",
      "translation": "öğrenciler"
    },
    "possessivePhrase": {
      "form": "a university student",
      "translation": "bir üniversite öğrencisi"
    },
    "determinerPhrase": {
      "form": "these hardworking students",
      "translation": "bu çalışkan öğrenciler"
    }
  },
  {
    "id": "noun_010",
    "rank": 10,
    "word": "Friend",
    "phonetic": "/frend/",
    "translation": "Arkadaş",
    "exampleEn": "I met my friend at the technology conference yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün teknoloji konferansında arkadaşımla buluştum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a friend",
      "phonetic": "/frend/",
      "translation": "bir arkadaş"
    },
    "plural": {
      "form": "friends",
      "phonetic": "/frendz/",
      "translation": "arkadaşlar"
    },
    "possessivePhrase": {
      "form": "my best friend",
      "translation": "benim en iyi arkadaşım"
    },
    "determinerPhrase": {
      "form": "these close friends",
      "translation": "bu yakın arkadaşlar"
    }
  },
  {
    "id": "noun_011",
    "rank": 11,
    "word": "Family",
    "phonetic": "/ˈfæm.əl.i/",
    "translation": "Aile",
    "exampleEn": "I spend quality time with my family on weekends.",
    "grammarNote": "",
    "exampleTr": "Hafta sonları ailemle kaliteli vakit geçiririm.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a family",
      "phonetic": "/ˈfæm.əl.i/",
      "translation": "bir aile"
    },
    "plural": {
      "form": "families",
      "phonetic": "/ˈfæm.əl.iz/",
      "translation": "aileler"
    },
    "possessivePhrase": {
      "form": "my family",
      "translation": "benim ailem"
    },
    "determinerPhrase": {
      "form": "this supportive family",
      "translation": "bu destekleyici aile"
    }
  },
  {
    "id": "noun_012",
    "rank": 12,
    "word": "Mother",
    "phonetic": "/ˈmʌð.ər/",
    "translation": "Anne",
    "exampleEn": "His mother is a high school mathematics teacher.",
    "grammarNote": "",
    "exampleTr": "Onun annesi bir lise matematik öğretmenidir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a mother",
      "phonetic": "/ˈmʌð.ər/",
      "translation": "bir anne"
    },
    "plural": {
      "form": "mothers",
      "phonetic": "/ˈmʌð.ərz/",
      "translation": "anneler"
    },
    "possessivePhrase": {
      "form": "his mother",
      "translation": "onun annesi"
    },
    "determinerPhrase": {
      "form": "my caring mother",
      "translation": "benim şefkatli annem"
    }
  },
  {
    "id": "noun_013",
    "rank": 13,
    "word": "Father",
    "phonetic": "/ˈfɑː.ðər/",
    "translation": "Baba",
    "exampleEn": "Her father works as an electrical engineer.",
    "grammarNote": "",
    "exampleTr": "Onun babası bir elektrik mühendisi olarak çalışır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a father",
      "phonetic": "/ˈfɑː.ðər/",
      "translation": "bir baba"
    },
    "plural": {
      "form": "fathers",
      "phonetic": "/ˈfɑː.ðərz/",
      "translation": "babalar"
    },
    "possessivePhrase": {
      "form": "her father",
      "translation": "onun babası"
    },
    "determinerPhrase": {
      "form": "my supportive father",
      "translation": "benim destekleyici babam"
    }
  },
  {
    "id": "noun_014",
    "rank": 14,
    "word": "Child",
    "phonetic": "/tʃaɪld/",
    "translation": "Çocuk (Düzensiz Çoğul)",
    "exampleEn": "The children are playing educational coding games on the tablet.",
    "grammarNote": "",
    "exampleTr": "Çocuklar tablette eğitici kodlama oyunları oynuyorlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a child",
      "phonetic": "/tʃaɪld/",
      "translation": "bir çocuk"
    },
    "plural": {
      "form": "children",
      "phonetic": "/ˈtʃɪl.drən/",
      "translation": "çocuklar"
    },
    "possessivePhrase": {
      "form": "their children",
      "translation": "onların çocukları"
    },
    "determinerPhrase": {
      "form": "these young children",
      "translation": "bu küçük çocuklar"
    }
  },
  {
    "id": "noun_015",
    "rank": 15,
    "word": "Water",
    "phonetic": "/ˈwɔː.tər/",
    "translation": "Su",
    "exampleEn": "You should drink at least two liters of water every day.",
    "grammarNote": "",
    "exampleTr": "Her gün en az iki litre su içmelisiniz.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "water",
      "phonetic": "/ˈwɔː.tər/",
      "translation": "su"
    },
    "partitiveUnit": {
      "form": "a glass of water",
      "translation": "bir bardak su"
    },
    "possessivePhrase": {
      "form": "some water",
      "translation": "biraz su"
    },
    "determinerPhrase": {
      "form": "this clean water",
      "translation": "bu temiz su"
    }
  },
  {
    "id": "noun_016",
    "rank": 16,
    "word": "Food",
    "phonetic": "/fuːd/",
    "translation": "Yiyecek / Yemek",
    "exampleEn": "We ordered delicious Italian food for the team celebration.",
    "grammarNote": "",
    "exampleTr": "Ekip kutlaması için lezzetli İtalyan yemekleri sipariş ettik.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "food",
      "phonetic": "/fuːd/",
      "translation": "yiyecek"
    },
    "partitiveUnit": {
      "form": "a variety of food",
      "translation": "çeşitli yiyecekler"
    },
    "possessivePhrase": {
      "form": "delicious food",
      "translation": "lezzetli yemek"
    },
    "determinerPhrase": {
      "form": "this organic food",
      "translation": "bu organik yiyecek"
    }
  },
  {
    "id": "noun_017",
    "rank": 17,
    "word": "Coffee",
    "phonetic": "/ˈkɒf.i/",
    "translation": "Kahve",
    "exampleEn": "I drink a cup of black coffee before writing code every morning.",
    "grammarNote": "",
    "exampleTr": "Her sabah kod yazmadan önce bir fincan sade kahve içerim.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "coffee",
      "phonetic": "/ˈkɒf.i/",
      "translation": "kahve"
    },
    "partitiveUnit": {
      "form": "a cup of coffee",
      "translation": "bir fincan kahve"
    },
    "possessivePhrase": {
      "form": "my hot coffee",
      "translation": "benim sıcak kahvem"
    },
    "determinerPhrase": {
      "form": "some black coffee",
      "translation": "biraz sade kahve"
    }
  },
  {
    "id": "noun_018",
    "rank": 18,
    "word": "Bread",
    "phonetic": "/bred/",
    "translation": "Ekmek",
    "exampleEn": "I bought a loaf of fresh bread from the local bakery.",
    "grammarNote": "",
    "exampleTr": "Yerel fırından bir somun taze ekmek satın aldım.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "bread",
      "phonetic": "/bred/",
      "translation": "ekmek"
    },
    "partitiveUnit": {
      "form": "a loaf of bread",
      "translation": "bir somun ekmek"
    },
    "possessivePhrase": {
      "form": "fresh bread",
      "translation": "taze ekmek"
    },
    "determinerPhrase": {
      "form": "some whole",
      "translation": "wheat bread – biraz tam buğday ekmeği"
    }
  },
  {
    "id": "noun_019",
    "rank": 19,
    "word": "Table",
    "phonetic": "/ˈteɪ.bəl/",
    "translation": "Masa",
    "exampleEn": "There are ten columns in this database table.",
    "grammarNote": "",
    "exampleTr": "Bu veritabanı tablosunda on adet sütun bulunmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a table",
      "phonetic": "/ˈteɪ.bəl/",
      "translation": "bir masa"
    },
    "plural": {
      "form": "tables",
      "phonetic": "/ˈteɪ.bəlz/",
      "translation": "masalar"
    },
    "possessivePhrase": {
      "form": "our meeting table",
      "translation": "bizim toplantı masamız"
    },
    "determinerPhrase": {
      "form": "this database table",
      "translation": "bu veritabanı tablosu"
    }
  },
  {
    "id": "noun_020",
    "rank": 20,
    "word": "Chair",
    "phonetic": "/tʃeər/",
    "translation": "Sandalye",
    "exampleEn": "I bought an ergonomic chair to prevent back pain.",
    "grammarNote": "",
    "exampleTr": "Sırt ağrısını önlemek için ergonomik bir sandalye satın aldım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a chair",
      "phonetic": "/tʃeər/",
      "translation": "bir sandalye"
    },
    "plural": {
      "form": "chairs",
      "phonetic": "/tʃeərz/",
      "translation": "sandalyeler"
    },
    "possessivePhrase": {
      "form": "an ergonomic chair",
      "translation": "ergonomik bir sandalye"
    },
    "determinerPhrase": {
      "form": "these office chairs",
      "translation": "bu ofis sandalyeleri"
    }
  },
  {
    "id": "noun_021",
    "rank": 21,
    "word": "Door",
    "phonetic": "/dɔːr/",
    "translation": "Kapı",
    "exampleEn": "Please close the office door when the air conditioner is on.",
    "grammarNote": "",
    "exampleTr": "Klima açıkken lütfen ofis kapısını kapatın.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a door",
      "phonetic": "/dɔːr/",
      "translation": "bir kapı"
    },
    "plural": {
      "form": "doors",
      "phonetic": "/dɔːrz/",
      "translation": "kapılar"
    },
    "possessivePhrase": {
      "form": "the main door",
      "translation": "ana kapı"
    },
    "determinerPhrase": {
      "form": "this automatic door",
      "translation": "bu otomatik kapı"
    }
  },
  {
    "id": "noun_022",
    "rank": 22,
    "word": "Window",
    "phonetic": "/ˈwɪn.dəʊ/",
    "translation": "Pencere",
    "exampleEn": "I opened the window to let in fresh air.",
    "grammarNote": "",
    "exampleTr": "İçeri temiz hava girmesi için pencereyi açtım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a window",
      "phonetic": "/ˈwɪn.dəʊ/",
      "translation": "bir pencere"
    },
    "plural": {
      "form": "windows",
      "phonetic": "/ˈwɪn.dəʊz/",
      "translation": "pencereler"
    },
    "possessivePhrase": {
      "form": "the large window",
      "translation": "büyük pencere"
    },
    "determinerPhrase": {
      "form": "these browser windows",
      "translation": "bu tarayıcı pencereleri"
    }
  },
  {
    "id": "noun_023",
    "rank": 23,
    "word": "City",
    "phonetic": "/ˈsɪt.i/",
    "translation": "Şehir (Düzensiz -ies)",
    "exampleEn": "Istanbul is one of the most vibrant cities in the world.",
    "grammarNote": "",
    "exampleTr": "İstanbul dünyanın en hareketli şehirlerinden biridir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a city",
      "phonetic": "/ˈsɪt.i/",
      "translation": "bir şehir"
    },
    "plural": {
      "form": "cities",
      "phonetic": "/ˈsɪt.iz/",
      "translation": "şehirler"
    },
    "possessivePhrase": {
      "form": "our capital city",
      "translation": "bizim başkentimiz"
    },
    "determinerPhrase": {
      "form": "this smart city",
      "translation": "bu akıllı şehir"
    }
  },
  {
    "id": "noun_024",
    "rank": 24,
    "word": "Country",
    "phonetic": "/ˈkʌn.tri/",
    "translation": "Ülke (Düzensiz -ies)",
    "exampleEn": "Our application is used in more than thirty countries.",
    "grammarNote": "",
    "exampleTr": "Uygulamamız otuzdan fazla ülkede kullanılmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a country",
      "phonetic": "/ˈkʌn.tri/",
      "translation": "bir ülke"
    },
    "plural": {
      "form": "countries",
      "phonetic": "/ˈkʌn.triz/",
      "translation": "ülkeler"
    },
    "possessivePhrase": {
      "form": "my home country",
      "translation": "benim memleketim/ülkem"
    },
    "determinerPhrase": {
      "form": "this European country",
      "translation": "bu Avrupa ülkesi"
    }
  },
  {
    "id": "noun_025",
    "rank": 25,
    "word": "Street",
    "phonetic": "/striːt/",
    "translation": "Sokak / Cadde",
    "exampleEn": "Autonomous vehicles navigate through crowded streets using sensors.",
    "grammarNote": "",
    "exampleTr": "Otonom araçlar sensörler kullanarak kalabalık caddelerde yol alır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a street",
      "phonetic": "/striːt/",
      "translation": "bir sokak"
    },
    "plural": {
      "form": "streets",
      "phonetic": "/striːts/",
      "translation": "sokaklar"
    },
    "possessivePhrase": {
      "form": "our street",
      "translation": "bizim sokağımız"
    },
    "determinerPhrase": {
      "form": "this busy street",
      "translation": "bu işlek cadde"
    }
  },
  {
    "id": "noun_026",
    "rank": 26,
    "word": "Road",
    "phonetic": "/rəʊd/",
    "translation": "Yol / Karayolu",
    "exampleEn": "The intelligent traffic system detects congestion on the road.",
    "grammarNote": "",
    "exampleTr": "Akıllı trafik sistemi yoldaki sıkışıklığı tespit eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a road",
      "phonetic": "/rəʊd/",
      "translation": "bir yol"
    },
    "plural": {
      "form": "roads",
      "phonetic": "/rəʊdz/",
      "translation": "yollar"
    },
    "possessivePhrase": {
      "form": "the main road",
      "translation": "ana yol"
    },
    "determinerPhrase": {
      "form": "these mountain roads",
      "translation": "bu dağ yolları"
    }
  },
  {
    "id": "noun_027",
    "rank": 27,
    "word": "Bus",
    "phonetic": "/bʌs/",
    "translation": "Otobüs (Çoğul: buses)",
    "exampleEn": "I take the express bus to commute to the university every morning.",
    "grammarNote": "",
    "exampleTr": "Her sabah üniversiteye gitmek için ekspres otobüse binerim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bus",
      "phonetic": "/bʌs/",
      "translation": "bir otobüs"
    },
    "plural": {
      "form": "buses",
      "phonetic": "/ˈbʌs.ɪz/",
      "translation": "otobüsler"
    },
    "possessivePhrase": {
      "form": "the express bus",
      "translation": "ekspres otobüs"
    },
    "determinerPhrase": {
      "form": "this electric bus",
      "translation": "bu elektrikli otobüs"
    }
  },
  {
    "id": "noun_028",
    "rank": 28,
    "word": "Train",
    "phonetic": "/treɪn/",
    "translation": "Tren",
    "exampleEn": "The high-speed train arrived in Ankara on time.",
    "grammarNote": "",
    "exampleTr": "Yüksek hızlı tren Ankara'ya tam vaktinde vardı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a train",
      "phonetic": "/treɪn/",
      "translation": "bir tren"
    },
    "plural": {
      "form": "trains",
      "phonetic": "/treɪnz/",
      "translation": "trenler"
    },
    "possessivePhrase": {
      "form": "the high",
      "translation": "speed train – yüksek hızlı tren"
    },
    "determinerPhrase": {
      "form": "that morning train",
      "translation": "şu sabah treni"
    }
  },
  {
    "id": "noun_029",
    "rank": 29,
    "word": "Airplane",
    "phonetic": "/ˈeə.pleɪn/",
    "translation": "Uçak",
    "exampleEn": "The airplane will take off in approximately twenty minutes.",
    "grammarNote": "",
    "exampleTr": "Uçak yaklaşık yirmi dakika içinde havalanacak.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an airplane",
      "phonetic": "/ˈeə.pleɪn/",
      "translation": "bir uçak"
    },
    "plural": {
      "form": "airplanes",
      "phonetic": "/ˈeə.pleɪnz/",
      "translation": "uçaklar"
    },
    "possessivePhrase": {
      "form": "our airplane",
      "translation": "bizim uçağımız"
    },
    "determinerPhrase": {
      "form": "that modern airplane",
      "translation": "şu modern uçak"
    }
  },
  {
    "id": "noun_030",
    "rank": 30,
    "word": "Ticket",
    "phonetic": "/ˈtɪk.ɪt/",
    "translation": "Bilet",
    "exampleEn": "I booked my flight tickets online three weeks ago.",
    "grammarNote": "",
    "exampleTr": "Uçak biletlerimi üç hafta önce internetten ayırttım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a ticket",
      "phonetic": "/ˈtɪk.ɪt/",
      "translation": "bir bilet"
    },
    "plural": {
      "form": "tickets",
      "phonetic": "/ˈtɪk.ɪts/",
      "translation": "biletler"
    },
    "possessivePhrase": {
      "form": "my boarding ticket",
      "translation": "benim biniş biletim"
    },
    "determinerPhrase": {
      "form": "these concert tickets",
      "translation": "bu konser biletleri"
    }
  },
  {
    "id": "noun_031",
    "rank": 31,
    "word": "Money",
    "phonetic": "/ˈmʌn.i/",
    "translation": "Para",
    "exampleEn": "Our startup raised seed investment money from angel investors.",
    "grammarNote": "",
    "exampleTr": "Girişimimiz melek yatırımcılardan tohum yatırım parası topladı.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "money",
      "phonetic": "/ˈmʌn.i/",
      "translation": "para"
    },
    "partitiveUnit": {
      "form": "a sum of money",
      "translation": "bir miktar para"
    },
    "possessivePhrase": {
      "form": "some money",
      "translation": "biraz para"
    },
    "determinerPhrase": {
      "form": "our investment money",
      "translation": "bizim yatırım paramız"
    }
  },
  {
    "id": "noun_032",
    "rank": 32,
    "word": "Price",
    "phonetic": "/praɪs/",
    "translation": "Fiyat",
    "exampleEn": "The cloud hosting price increased by ten percent this year.",
    "grammarNote": "",
    "exampleTr": "Bulut barındırma fiyatı bu yıl yüzde on arttı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a price",
      "phonetic": "/praɪs/",
      "translation": "bir fiyat"
    },
    "plural": {
      "form": "prices",
      "phonetic": "/ˈpraɪ.sɪz/",
      "translation": "fiyatlar"
    },
    "possessivePhrase": {
      "form": "the subscription price",
      "translation": "abonelik fiyatı"
    },
    "determinerPhrase": {
      "form": "these reasonable prices",
      "translation": "bu makul fiyatlar"
    }
  },
  {
    "id": "noun_033",
    "rank": 33,
    "word": "Store",
    "phonetic": "/stɔːr/",
    "translation": "Mağaza / Dükkân",
    "exampleEn": "I deployed the mobile application to the Google Play Store.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulamayı Google Play Store'da yayınladım / dağıttım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a store",
      "phonetic": "/stɔːr/",
      "translation": "bir mağaza"
    },
    "plural": {
      "form": "stores",
      "phonetic": "/stɔːrz/",
      "translation": "mağazalar"
    },
    "possessivePhrase": {
      "form": "the local store",
      "translation": "yerel mağaza"
    },
    "determinerPhrase": {
      "form": "these online stores",
      "translation": "bu çevrim içi mağazalar"
    }
  },
  {
    "id": "noun_034",
    "rank": 34,
    "word": "Market",
    "phonetic": "/ˈmɑː.kɪt/",
    "translation": "Pazar / Piyasa",
    "exampleEn": "We are analyzing the target market for our e-commerce platform.",
    "grammarNote": "",
    "exampleTr": "E-ticaret platformumuz için hedef pazarı analiz ediyoruz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a market",
      "phonetic": "/ˈmɑː.kɪt/",
      "translation": "bir pazar"
    },
    "plural": {
      "form": "markets",
      "phonetic": "/ˈmɑː.kɪts/",
      "translation": "pazarlar/piyasalar"
    },
    "possessivePhrase": {
      "form": "the target market",
      "translation": "hedef pazar"
    },
    "determinerPhrase": {
      "form": "this competitive market",
      "translation": "bu rekabetçi piyasa"
    }
  },
  {
    "id": "noun_035",
    "rank": 35,
    "word": "Doctor",
    "phonetic": "/ˈdɒk.tər/",
    "translation": "Doktor / Hekim",
    "exampleEn": "The doctor prescribed antibiotics and recommended complete rest.",
    "grammarNote": "",
    "exampleTr": "Doktor antibiyotik yazdı ve tam istirahat tavsiye etti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a doctor",
      "phonetic": "/ˈdɒk.tər/",
      "translation": "bir doktor"
    },
    "plural": {
      "form": "doctors",
      "phonetic": "/ˈdɒk.tərz/",
      "translation": "doktorlar"
    },
    "possessivePhrase": {
      "form": "our family doctor",
      "translation": "aile hekimimiz"
    },
    "determinerPhrase": {
      "form": "the specialist doctor",
      "translation": "uzman doktor"
    }
  },
  {
    "id": "noun_036",
    "rank": 36,
    "word": "Hospital",
    "phonetic": "/ˈhɒs.pɪ.təl/",
    "translation": "Hastane",
    "exampleEn": "The city hospital upgraded its digital patient management system.",
    "grammarNote": "",
    "exampleTr": "Şehir hastanesi dijital hasta yönetim sistemini yükseltti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a hospital",
      "phonetic": "/ˈhɒs.pɪ.təl/",
      "translation": "bir hastane"
    },
    "plural": {
      "form": "hospitals",
      "phonetic": "/ˈhɒs.pɪ.təlz/",
      "translation": "hastaneler"
    },
    "possessivePhrase": {
      "form": "the city hospital",
      "translation": "şehir hastanesi"
    },
    "determinerPhrase": {
      "form": "this private hospital",
      "translation": "bu özel hastane"
    }
  },
  {
    "id": "noun_037",
    "rank": 37,
    "word": "Medicine",
    "phonetic": "/ˈmed.sən/",
    "translation": "İlaç",
    "exampleEn": "You should take this medicine twice a day after meals.",
    "grammarNote": "",
    "exampleTr": "Bu ilacı günde iki kez yemeklerden sonra almalısınız.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "medicine",
      "phonetic": "/ˈmed.sən/",
      "translation": "ilaç"
    },
    "partitiveUnit": {
      "form": "a dose of medicine",
      "translation": "bir doz ilaç"
    },
    "possessivePhrase": {
      "form": "some painkiller medicine",
      "translation": "biraz ağrı kesici ilaç"
    },
    "determinerPhrase": {
      "form": "this prescribed medicine",
      "translation": "bu reçeteli ilaç"
    }
  },
  {
    "id": "noun_038",
    "rank": 38,
    "word": "Office",
    "phonetic": "/ˈɒf.ɪs/",
    "translation": "Ofis / İş Yeri",
    "exampleEn": "I am currently working from our innovation office in Teknokent.",
    "grammarNote": "",
    "exampleTr": "Şu anda Teknokent'teki inovasyon ofisimizden çalışıyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an office",
      "phonetic": "/ˈɒf.ɪs/",
      "translation": "bir ofis"
    },
    "plural": {
      "form": "offices",
      "phonetic": "/ˈɒf.ɪ.sɪz/",
      "translation": "ofisler"
    },
    "possessivePhrase": {
      "form": "our central office",
      "translation": "bizim merkez ofisimiz"
    },
    "determinerPhrase": {
      "form": "this modern office",
      "translation": "bu modern ofis"
    }
  },
  {
    "id": "noun_039",
    "rank": 39,
    "word": "Job",
    "phonetic": "/dʒɒb/",
    "translation": "İş / Meslek",
    "exampleEn": "She received a fantastic job offer from an international tech firm.",
    "grammarNote": "",
    "exampleTr": "O, uluslararası bir teknoloji firmasından harika bir iş teklifi aldı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a job",
      "phonetic": "/dʒɒb/",
      "translation": "bir iş"
    },
    "plural": {
      "form": "jobs",
      "phonetic": "/dʒɒbz/",
      "translation": "işler"
    },
    "possessivePhrase": {
      "form": "my dream job",
      "translation": "benim hayalimdeki iş"
    },
    "determinerPhrase": {
      "form": "this developer job",
      "translation": "bu geliştirici işi"
    }
  },
  {
    "id": "noun_040",
    "rank": 40,
    "word": "Company",
    "phonetic": "/ˈkʌm.pə.ni/",
    "translation": "Şirket (Çoğul: companies)",
    "exampleEn": "Our startup company develops custom artificial intelligence solutions.",
    "grammarNote": "",
    "exampleTr": "Girişim şirketimiz özel yapay zeka çözümleri geliştirmektedir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a company",
      "phonetic": "/ˈkʌm.pə.ni/",
      "translation": "bir şirket"
    },
    "plural": {
      "form": "companies",
      "phonetic": "/ˈkʌm.pə.niz/",
      "translation": "şirketler"
    },
    "possessivePhrase": {
      "form": "our tech company",
      "translation": "bizim teknoloji şirketimiz"
    },
    "determinerPhrase": {
      "form": "these enterprise companies",
      "translation": "bu kurumsal şirketler"
    }
  },
  {
    "id": "noun_041",
    "rank": 41,
    "word": "Project",
    "phonetic": "/ˈprɒdʒ.ekt/",
    "translation": "Proje",
    "exampleEn": "I am developing a DeepFake detection project using hybrid neural networks.",
    "grammarNote": "",
    "exampleTr": "Hibrit yapay sinir ağları kullanarak bir DeepFake tespit projesi geliştiriyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a project",
      "phonetic": "/ˈprɒdʒ.ekt/",
      "translation": "bir proje"
    },
    "plural": {
      "form": "projects",
      "phonetic": "/ˈprɒdʒ.ekts/",
      "translation": "projeler"
    },
    "possessivePhrase": {
      "form": "my graduation project",
      "translation": "benim mezuniyet projem"
    },
    "determinerPhrase": {
      "form": "these open",
      "translation": "source projects – bu açık kaynaklı projeler"
    }
  },
  {
    "id": "noun_042",
    "rank": 42,
    "word": "Meeting",
    "phonetic": "/ˈmiː.tɪŋ/",
    "translation": "Toplantı",
    "exampleEn": "We will have a sprint planning meeting tomorrow at 10 AM.",
    "grammarNote": "",
    "exampleTr": "Yarın saat 10:00'da bir sprint planlama toplantımız olacak.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a meeting",
      "phonetic": "/ˈmiː.tɪŋ/",
      "translation": "bir toplantı"
    },
    "plural": {
      "form": "meetings",
      "phonetic": "/ˈmiː.tɪŋz/",
      "translation": "toplantılar"
    },
    "possessivePhrase": {
      "form": "our daily standup meeting",
      "translation": "bizim günlük durum toplantımız"
    },
    "determinerPhrase": {
      "form": "this important meeting",
      "translation": "bu önemli toplantı"
    }
  },
  {
    "id": "noun_043",
    "rank": 43,
    "word": "Problem",
    "phonetic": "/ˈprɒb.ləm/",
    "translation": "Sorun / Problem",
    "exampleEn": "Our engineering team resolved the concurrency problem successfully.",
    "grammarNote": "",
    "exampleTr": "Mühendislik ekibimiz eşzamanlılık problemini başarıyla çözdü.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a problem",
      "phonetic": "/ˈprɒb.ləm/",
      "translation": "bir problem"
    },
    "plural": {
      "form": "problems",
      "phonetic": "/ˈprɒb.ləmz/",
      "translation": "problemler"
    },
    "possessivePhrase": {
      "form": "a complex problem",
      "translation": "karmaşık bir problem"
    },
    "determinerPhrase": {
      "form": "this memory leak problem",
      "translation": "bu bellek sızıntısı problemi"
    }
  },
  {
    "id": "noun_044",
    "rank": 44,
    "word": "Solution",
    "phonetic": "/səˈluː.ʃən/",
    "translation": "Çözüm",
    "exampleEn": "We proposed a cloud-native solution to reduce server latency.",
    "grammarNote": "",
    "exampleTr": "Sunucu gecikmesini azaltmak için buluta özgü bir çözüm önerdik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a solution",
      "phonetic": "/səˈluː.ʃən/",
      "translation": "bir çözüm"
    },
    "plural": {
      "form": "solutions",
      "phonetic": "/səˈluː.ʃənz/",
      "translation": "çözümler"
    },
    "possessivePhrase": {
      "form": "an optimal solution",
      "translation": "en uygun bir çözüm"
    },
    "determinerPhrase": {
      "form": "these scalable solutions",
      "translation": "bu ölçeklenebilir çözümler"
    }
  },
  {
    "id": "noun_045",
    "rank": 45,
    "word": "Question",
    "phonetic": "/ˈkwes.tʃən/",
    "translation": "Soru",
    "exampleEn": "The interviewer asked several detailed questions about database indexing.",
    "grammarNote": "",
    "exampleTr": "Mülakatçı veritabanı indeksleme hakkında birkaç detaylı soru sordu.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a question",
      "phonetic": "/ˈkwes.tʃən/",
      "translation": "bir soru"
    },
    "plural": {
      "form": "questions",
      "phonetic": "/ˈkwes.tʃənz/",
      "translation": "sorular"
    },
    "possessivePhrase": {
      "form": "an important question",
      "translation": "önemli bir soru"
    },
    "determinerPhrase": {
      "form": "these technical questions",
      "translation": "bu teknik sorular"
    }
  },
  {
    "id": "noun_046",
    "rank": 46,
    "word": "Answer",
    "phonetic": "/ˈɑːn.sər/",
    "translation": "Cevap / Yanıt",
    "exampleEn": "I knew the exact answer to the technical algorithm challenge.",
    "grammarNote": "",
    "exampleTr": "Teknik algoritma sorusunun kesin cevabını biliyordum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an answer",
      "phonetic": "/ˈɑːn.sər/",
      "translation": "bir cevap"
    },
    "plural": {
      "form": "answers",
      "phonetic": "/ˈɑːn.sərz/",
      "translation": "cevaplar"
    },
    "possessivePhrase": {
      "form": "the correct answer",
      "translation": "doğru cevap"
    },
    "determinerPhrase": {
      "form": "these clear answers",
      "translation": "bu net cevaplar"
    }
  },
  {
    "id": "noun_047",
    "rank": 47,
    "word": "Time",
    "phonetic": "/taɪm/",
    "translation": "Zaman / Vakit",
    "exampleEn": "Do you have enough time to review my pull request today?",
    "grammarNote": "",
    "exampleTr": "Bugün çekme isteğimi incelemek için yeterli vaktiniz var mı?",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "time",
      "phonetic": "/taɪm/",
      "translation": "zaman"
    },
    "partitiveUnit": {
      "form": "a period of time",
      "translation": "bir zaman dilimi"
    },
    "possessivePhrase": {
      "form": "some free time",
      "translation": "biraz boş vakit"
    },
    "determinerPhrase": {
      "form": "this busy time",
      "translation": "bu yoğun zaman"
    }
  },
  {
    "id": "noun_048",
    "rank": 48,
    "word": "Day",
    "phonetic": "/deɪ/",
    "translation": "Gün",
    "exampleEn": "I write clean code and study English every single day.",
    "grammarNote": "",
    "exampleTr": "Her gün temiz kod yazarım ve İngilizce çalışırım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a day",
      "phonetic": "/deɪ/",
      "translation": "bir gün"
    },
    "plural": {
      "form": "days",
      "phonetic": "/deɪz/",
      "translation": "günler"
    },
    "possessivePhrase": {
      "form": "a productive day",
      "translation": "verimli bir gün"
    },
    "determinerPhrase": {
      "form": "these sunny days",
      "translation": "bu güneşli günler"
    }
  },
  {
    "id": "noun_049",
    "rank": 49,
    "word": "Week",
    "phonetic": "/wiːk/",
    "translation": "Hafta",
    "exampleEn": "We will launch the beta version of our mobile app next week.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulamamızın beta sürümünü gelecek hafta yayına alacağız.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a week",
      "phonetic": "/wiːk/",
      "translation": "bir hafta"
    },
    "plural": {
      "form": "weeks",
      "phonetic": "/wiːks/",
      "translation": "haftalar"
    },
    "possessivePhrase": {
      "form": "next week",
      "translation": "gelecek hafta"
    },
    "determinerPhrase": {
      "form": "these two weeks",
      "translation": "bu iki hafta"
    }
  },
  {
    "id": "noun_050",
    "rank": 50,
    "word": "Month",
    "phonetic": "/mʌnθ/",
    "translation": "Ay",
    "exampleEn": "The server achieved 99.99% uptime throughout the entire month.",
    "grammarNote": "",
    "exampleTr": "Sunucu tüm ay boyunca %99.99 çalışma süresi elde etti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a month",
      "phonetic": "/mʌnθ/",
      "translation": "bir ay"
    },
    "plural": {
      "form": "months",
      "phonetic": "/mʌnθs/",
      "translation": "aylar"
    },
    "possessivePhrase": {
      "form": "last month",
      "translation": "geçen ay"
    },
    "determinerPhrase": {
      "form": "these three months",
      "translation": "bu üç ay"
    }
  },
  {
    "id": "noun_051",
    "rank": 51,
    "word": "Year",
    "phonetic": "/jɪər/",
    "translation": "Yıl / Sene",
    "exampleEn": "I will graduate from university with an engineering degree this year.",
    "grammarNote": "",
    "exampleTr": "Bu yıl üniversiteden bir mühendislik derecesiyle mezun olacağım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a year",
      "phonetic": "/jɪər/",
      "translation": "bir yıl"
    },
    "plural": {
      "form": "years",
      "phonetic": "/jɪərz/",
      "translation": "yıllar"
    },
    "possessivePhrase": {
      "form": "this year",
      "translation": "bu yıl"
    },
    "determinerPhrase": {
      "form": "these recent years",
      "translation": "bu son yıllar"
    }
  },
  {
    "id": "noun_052",
    "rank": 52,
    "word": "Hour",
    "phonetic": "/aʊər/",
    "translation": "Saat (Süre - an hour)",
    "exampleEn": "The database backup script executed for two hours last night.",
    "grammarNote": "",
    "exampleTr": "Veritabanı yedekleme betiği dün gece iki saat boyunca çalıştı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an hour",
      "phonetic": "/aʊər/",
      "translation": "bir saat (süre)"
    },
    "plural": {
      "form": "hours",
      "phonetic": "/aʊərz/",
      "translation": "saatler"
    },
    "possessivePhrase": {
      "form": "two hours",
      "translation": "iki saat"
    },
    "determinerPhrase": {
      "form": "these working hours",
      "translation": "bu çalışma saatleri"
    }
  },
  {
    "id": "noun_053",
    "rank": 53,
    "word": "Minute",
    "phonetic": "/ˈmɪn.ɪt/",
    "translation": "Dakika",
    "exampleEn": "The automated build pipeline finished in under three minutes.",
    "grammarNote": "",
    "exampleTr": "Otomatik derleme işlem hattı üç dakikadan kısa sürede bitti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a minute",
      "phonetic": "/ˈmɪn.ɪt/",
      "translation": "bir dakika"
    },
    "plural": {
      "form": "minutes",
      "phonetic": "/ˈmɪn.ɪts/",
      "translation": "dakikalar"
    },
    "possessivePhrase": {
      "form": "five minutes",
      "translation": "beş dakika"
    },
    "determinerPhrase": {
      "form": "these crucial minutes",
      "translation": "bu kritik dakikalar"
    }
  },
  {
    "id": "noun_054",
    "rank": 54,
    "word": "Morning",
    "phonetic": "/ˈmɔː.nɪŋ/",
    "translation": "Sabah",
    "exampleEn": "I usually check my email and review GitHub issues every morning.",
    "grammarNote": "",
    "exampleTr": "Genellikle her sabah e-postalarımı kontrol eder ve GitHub sorunlarını incelerim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a morning",
      "phonetic": "/ˈmɔː.nɪŋ/",
      "translation": "bir sabah"
    },
    "plural": {
      "form": "mornings",
      "phonetic": "/ˈmɔː.nɪŋz/",
      "translation": "sabahlar"
    },
    "possessivePhrase": {
      "form": "this morning",
      "translation": "bu sabah"
    },
    "determinerPhrase": {
      "form": "early morning",
      "translation": "sabahın erken saatleri"
    }
  },
  {
    "id": "noun_055",
    "rank": 55,
    "word": "Evening",
    "phonetic": "/ˈiːv.nɪŋ/",
    "translation": "Akşam",
    "exampleEn": "We discussed the project architecture over dinner yesterday evening.",
    "grammarNote": "",
    "exampleTr": "Dün akşam yemekte proje mimarisini tartıştık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an evening",
      "phonetic": "/ˈiːv.nɪŋ/",
      "translation": "bir akşam"
    },
    "plural": {
      "form": "evenings",
      "phonetic": "/ˈiːv.nɪŋz/",
      "translation": "akşamlar"
    },
    "possessivePhrase": {
      "form": "yesterday evening",
      "translation": "dün akşam"
    },
    "determinerPhrase": {
      "form": "this peaceful evening",
      "translation": "bu huzurlu akşam"
    }
  },
  {
    "id": "noun_056",
    "rank": 56,
    "word": "Night",
    "phonetic": "/naɪt/",
    "translation": "Gece",
    "exampleEn": "I worked late last night to resolve a critical security patch.",
    "grammarNote": "",
    "exampleTr": "Kritik bir güvenlik yamasını çözmek için dün gece geç saatlere kadar çalıştım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a night",
      "phonetic": "/naɪt/",
      "translation": "bir gece"
    },
    "plural": {
      "form": "nights",
      "phonetic": "/naɪts/",
      "translation": "geceler"
    },
    "possessivePhrase": {
      "form": "last night",
      "translation": "dün gece"
    },
    "determinerPhrase": {
      "form": "these late nights",
      "translation": "bu geç geceler"
    }
  },
  {
    "id": "noun_057",
    "rank": 57,
    "word": "Weather",
    "phonetic": "/ˈweð.ər/",
    "translation": "Hava Durumu",
    "exampleEn": "The weather in Bolu is cold and snowy during the winter months.",
    "grammarNote": "",
    "exampleTr": "Bolu'da hava kış aylarında soğuk ve karlıdır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "weather",
      "phonetic": "/ˈweð.ər/",
      "translation": "hava"
    },
    "partitiveUnit": {
      "form": "sunny weather",
      "translation": "güneşli hava"
    },
    "possessivePhrase": {
      "form": "the cold weather",
      "translation": "soğuk hava"
    },
    "determinerPhrase": {
      "form": "this rainy weather",
      "translation": "bu yağmurlu hava"
    }
  },
  {
    "id": "noun_058",
    "rank": 58,
    "word": "Sun",
    "phonetic": "/sʌn/",
    "translation": "Güneş (Tekil - the sun)",
    "exampleEn": "The sun provides clean energy through our rooftop solar panels.",
    "grammarNote": "",
    "exampleTr": "Güneş çatı güneş panellerimiz aracılığıyla temiz enerji sağlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "the sun",
      "phonetic": "/sʌn/",
      "translation": "güneş"
    },
    "plural": {
      "form": "suns",
      "phonetic": "/sʌnz/",
      "translation": "güneşler (astronomi)"
    },
    "possessivePhrase": {
      "form": "the morning sun",
      "translation": "sabah güneşi"
    },
    "determinerPhrase": {
      "form": "this bright sun",
      "translation": "bu parlak güneş"
    }
  },
  {
    "id": "noun_059",
    "rank": 59,
    "word": "Rain",
    "phonetic": "/reɪn/",
    "translation": "Yağmur",
    "exampleEn": "Heavy rain caused temporary traffic congestion on the highway.",
    "grammarNote": "",
    "exampleTr": "Şiddetli yağmur otoyolda geçici trafik sıkışıklığına neden oldu.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "rain",
      "phonetic": "/reɪn/",
      "translation": "yağmur"
    },
    "partitiveUnit": {
      "form": "a drop of rain",
      "translation": "bir damla yağmur"
    },
    "possessivePhrase": {
      "form": "heavy rain",
      "translation": "şiddetli yağmur"
    },
    "determinerPhrase": {
      "form": "some rain",
      "translation": "biraz yağmur"
    }
  },
  {
    "id": "noun_060",
    "rank": 60,
    "word": "Tree",
    "phonetic": "/triː/",
    "translation": "Ağaç",
    "exampleEn": "There are many green trees in the university campus garden.",
    "grammarNote": "",
    "exampleTr": "Üniversite kampüs bahçesinde birçok yeşil ağaç vardır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a tree",
      "phonetic": "/triː/",
      "translation": "bir ağaç"
    },
    "plural": {
      "form": "trees",
      "phonetic": "/triːz/",
      "translation": "ağaçlar"
    },
    "possessivePhrase": {
      "form": "the tall tree",
      "translation": "uzun ağaç"
    },
    "determinerPhrase": {
      "form": "these green trees",
      "translation": "bu yeşil ağaçlar"
    }
  },
  {
    "id": "noun_061",
    "rank": 61,
    "word": "Flower",
    "phonetic": "/ˈflaʊ.ər/",
    "translation": "Çiçek",
    "exampleEn": "She bought colorful flowers to decorate the new office reception.",
    "grammarNote": "",
    "exampleTr": "Yeni ofis resepsiyonunu süslemek için renkli çiçekler satın aldı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a flower",
      "phonetic": "/ˈflaʊ.ər/",
      "translation": "bir çiçek"
    },
    "plural": {
      "form": "flowers",
      "phonetic": "/ˈflaʊ.ərz/",
      "translation": "çiçekler"
    },
    "possessivePhrase": {
      "form": "a beautiful flower",
      "translation": "güzel bir çiçek"
    },
    "determinerPhrase": {
      "form": "these colorful flowers",
      "translation": "bu renkli çiçekler"
    }
  },
  {
    "id": "noun_062",
    "rank": 62,
    "word": "Animal",
    "phonetic": "/ˈæn.ɪ.məl/",
    "translation": "Hayvan",
    "exampleEn": "Our computer vision model detects animals on the road at night.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarlı görü modelimiz gece yoldaki hayvanları tespit eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an animal",
      "phonetic": "/ˈæn.ɪ.məl/",
      "translation": "bir hayvan"
    },
    "plural": {
      "form": "animals",
      "phonetic": "/ˈæn.ɪ.məlz/",
      "translation": "hayvanlar"
    },
    "possessivePhrase": {
      "form": "a domestic animal",
      "translation": "evcil bir hayvan"
    },
    "determinerPhrase": {
      "form": "these wild animals",
      "translation": "bu vahşi hayvanlar"
    }
  },
  {
    "id": "noun_063",
    "rank": 63,
    "word": "Dog",
    "phonetic": "/dɒɡ/",
    "translation": "Köpek",
    "exampleEn": "I walk my dog in the city park every morning.",
    "grammarNote": "",
    "exampleTr": "Her sabah şehir parkında köpeğimi gezdiririm.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a dog",
      "phonetic": "/dɒɡ/",
      "translation": "bir köpek"
    },
    "plural": {
      "form": "dogs",
      "phonetic": "/dɒɡz/",
      "translation": "köpekler"
    },
    "possessivePhrase": {
      "form": "my pet dog",
      "translation": "benim evcil köpeğim"
    },
    "determinerPhrase": {
      "form": "that friendly dog",
      "translation": "şu dost canlısı köpek"
    }
  },
  {
    "id": "noun_064",
    "rank": 64,
    "word": "Cat",
    "phonetic": "/kæt/",
    "translation": "Kedi",
    "exampleEn": "The cat is sleeping peacefully next to the warm laptop.",
    "grammarNote": "",
    "exampleTr": "Kedi sıcak dizüstü bilgisayarın yanında huzurla uyuyor.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a cat",
      "phonetic": "/kæt/",
      "translation": "bir kedi"
    },
    "plural": {
      "form": "cats",
      "phonetic": "/kæts/",
      "translation": "kediler"
    },
    "possessivePhrase": {
      "form": "her cute cat",
      "translation": "onun sevimli kedisi"
    },
    "determinerPhrase": {
      "form": "these street cats",
      "translation": "bu sokak kedileri"
    }
  },
  {
    "id": "noun_065",
    "rank": 65,
    "word": "Bird",
    "phonetic": "/bɜːd/",
    "translation": "Kuş",
    "exampleEn": "I saw a rare bird in the forest during our weekend trip.",
    "grammarNote": "",
    "exampleTr": "Hafta sonu gezimiz sırasında ormanda nadir bir kuş gördüm.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bird",
      "phonetic": "/bɜːd/",
      "translation": "bir kuş"
    },
    "plural": {
      "form": "birds",
      "phonetic": "/bɜːdz/",
      "translation": "kuşlar"
    },
    "possessivePhrase": {
      "form": "a flying bird",
      "translation": "uçan bir kuş"
    },
    "determinerPhrase": {
      "form": "these migratory birds",
      "translation": "bu göçmen kuşlar"
    }
  },
  {
    "id": "noun_066",
    "rank": 66,
    "word": "Bag",
    "phonetic": "/bæɡ/",
    "translation": "Çanta",
    "exampleEn": "I always keep my charger and backup drive in my laptop bag.",
    "grammarNote": "",
    "exampleTr": "Şarj aletimi ve yedekleme sürücümü her zaman laptop çantamda tutarım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bag",
      "phonetic": "/bæɡ/",
      "translation": "bir çanta"
    },
    "plural": {
      "form": "bags",
      "phonetic": "/bæɡz/",
      "translation": "çantalar"
    },
    "possessivePhrase": {
      "form": "my laptop bag",
      "translation": "benim laptop çantam"
    },
    "determinerPhrase": {
      "form": "these luggage bags",
      "translation": "bu valiz çantaları"
    }
  },
  {
    "id": "noun_067",
    "rank": 67,
    "word": "Key",
    "phonetic": "/kiː/",
    "translation": "Anahtar (Fiziksel / Dijital)",
    "exampleEn": "Never share your private encryption keys in public repositories.",
    "grammarNote": "",
    "exampleTr": "Özel şifreleme anahtarlarınızı herkese açık depolarda asla paylaşmayın.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a key",
      "phonetic": "/kiː/",
      "translation": "bir anahtar"
    },
    "plural": {
      "form": "keys",
      "phonetic": "/kiːz/",
      "translation": "anahtarlar"
    },
    "possessivePhrase": {
      "form": "the API key",
      "translation": "API anahtarı"
    },
    "determinerPhrase": {
      "form": "these encryption keys",
      "translation": "bu şifreleme anahtarları"
    }
  },
  {
    "id": "noun_068",
    "rank": 68,
    "word": "Wallet",
    "phonetic": "/ˈwɒl.ɪt/",
    "translation": "Cüzdan",
    "exampleEn": "Users can link their bank cards to our digital mobile wallet.",
    "grammarNote": "",
    "exampleTr": "Kullanıcılar banka kartlarını dijital mobil cüzdanımıza bağlayabilirler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a wallet",
      "phonetic": "/ˈwɒl.ɪt/",
      "translation": "bir cüzdan"
    },
    "plural": {
      "form": "wallets",
      "phonetic": "/ˈwɒl.ɪts/",
      "translation": "cüzdanlar"
    },
    "possessivePhrase": {
      "form": "my leather wallet",
      "translation": "benim deri cüzdanım"
    },
    "determinerPhrase": {
      "form": "this digital wallet",
      "translation": "bu dijital cüzdan"
    }
  },
  {
    "id": "noun_069",
    "rank": 69,
    "word": "Clothes",
    "phonetic": "/kləʊðz/",
    "translation": "Kıyafetler (Daima Çoğul)",
    "exampleEn": "I wore formal clothes for the corporate client presentation.",
    "grammarNote": "",
    "exampleTr": "Kurumsal müşteri sunumu için resmi kıyafetler giydim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "clothes",
      "phonetic": "/kləʊðz/",
      "translation": "kıyafetler"
    },
    "plural": {
      "form": "clean clothes",
      "phonetic": "/kləʊðz/",
      "translation": "temiz kıyafetler"
    },
    "possessivePhrase": {
      "form": "my formal clothes",
      "translation": "benim resmi kıyafetlerim"
    },
    "determinerPhrase": {
      "form": "these winter clothes",
      "translation": "bu kışlık kıyafetler"
    }
  },
  {
    "id": "noun_070",
    "rank": 70,
    "word": "Shirt",
    "phonetic": "/ʃɜːt/",
    "translation": "Gömlek",
    "exampleEn": "He bought a new blue shirt for his technical job interview.",
    "grammarNote": "",
    "exampleTr": "Teknik iş mülakatı için yeni bir mavi gömlek satın aldı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a shirt",
      "phonetic": "/ʃɜːt/",
      "translation": "bir gömlek"
    },
    "plural": {
      "form": "shirts",
      "phonetic": "/ʃɜːts/",
      "translation": "gömlekler"
    },
    "possessivePhrase": {
      "form": "a blue shirt",
      "translation": "mavi bir gömlek"
    },
    "determinerPhrase": {
      "form": "these cotton shirts",
      "translation": "bu pamuklu gömlekler"
    }
  },
  {
    "id": "noun_071",
    "rank": 71,
    "word": "Shoes",
    "phonetic": "/ʃuːz/",
    "translation": "Ayakkabılar (Çoğul: pair of shoes)",
    "exampleEn": "I wear comfortable running shoes when I walk in the morning.",
    "grammarNote": "",
    "exampleTr": "Sabah yürüdüğümde rahat koşu ayakkabıları giyerim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a pair of shoes",
      "phonetic": "/ʃuːz/",
      "translation": "bir çift ayakkabı"
    },
    "plural": {
      "form": "shoes",
      "phonetic": "/ʃuːz/",
      "translation": "ayakkabılar"
    },
    "possessivePhrase": {
      "form": "my running shoes",
      "translation": "benim koşu ayakkabılarım"
    },
    "determinerPhrase": {
      "form": "these comfortable shoes",
      "translation": "bu rahat ayakkabılar"
    }
  },
  {
    "id": "noun_072",
    "rank": 72,
    "word": "Screen",
    "phonetic": "/skriːn/",
    "translation": "Ekran",
    "exampleEn": "The mobile screen resolution automatically adjusts to user preferences.",
    "grammarNote": "",
    "exampleTr": "Mobil ekran çözünürlüğü kullanıcı tercihlerine göre otomatik olarak ayarlanır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a screen",
      "phonetic": "/skriːn/",
      "translation": "bir ekran"
    },
    "plural": {
      "form": "screens",
      "phonetic": "/skriːnz/",
      "translation": "ekranlar"
    },
    "possessivePhrase": {
      "form": "a 4K screen",
      "translation": "4K bir ekran"
    },
    "determinerPhrase": {
      "form": "these dual screens",
      "translation": "bu çift ekranlar"
    }
  },
  {
    "id": "noun_073",
    "rank": 73,
    "word": "Keyboard",
    "phonetic": "/ˈkiː.bɔːd/",
    "translation": "Klavye",
    "exampleEn": "I type faster on a mechanical keyboard with tactile switches.",
    "grammarNote": "",
    "exampleTr": "Dokunsal anahtarlı mekanik bir klavyede daha hızlı yazarım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a keyboard",
      "phonetic": "/ˈkiː.bɔːd/",
      "translation": "bir klavye"
    },
    "plural": {
      "form": "keyboards",
      "phonetic": "/ˈkiː.bɔːdz/",
      "translation": "klavyeler"
    },
    "possessivePhrase": {
      "form": "a mechanical keyboard",
      "translation": "mekanik bir klavye"
    },
    "determinerPhrase": {
      "form": "this wireless keyboard",
      "translation": "bu kablosuz klavye"
    }
  },
  {
    "id": "noun_074",
    "rank": 74,
    "word": "Mouse",
    "phonetic": "/maʊs/",
    "translation": "Fare (Bilgisayar faresi: mice)",
    "exampleEn": "The wireless optical mouse connected via Bluetooth instantly.",
    "grammarNote": "",
    "exampleTr": "Kablosuz optik fare Bluetooth üzerinden anında bağlandı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a mouse",
      "phonetic": "/maʊs/",
      "translation": "bir fare"
    },
    "plural": {
      "form": "mice",
      "phonetic": "/maɪs/",
      "translation": "fareler"
    },
    "possessivePhrase": {
      "form": "my wireless mouse",
      "translation": "benim kablosuz farem"
    },
    "determinerPhrase": {
      "form": "an optical mouse",
      "translation": "optik bir fare"
    }
  },
  {
    "id": "noun_075",
    "rank": 75,
    "word": "File",
    "phonetic": "/faɪl/",
    "translation": "Dosya",
    "exampleEn": "I downloaded the configuration file from the remote cloud server.",
    "grammarNote": "",
    "exampleTr": "Yapılandırma dosyasını uzak bulut sunucusundan indirdim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a file",
      "phonetic": "/faɪl/",
      "translation": "bir dosya"
    },
    "plural": {
      "form": "files",
      "phonetic": "/faɪlz/",
      "translation": "dosyalar"
    },
    "possessivePhrase": {
      "form": "the configuration file",
      "translation": "yapılandırma dosyası"
    },
    "determinerPhrase": {
      "form": "these encrypted files",
      "translation": "bu şifreli dosyalar"
    }
  },
  {
    "id": "noun_076",
    "rank": 76,
    "word": "Data",
    "phonetic": "/ˈdeɪ.tə/",
    "translation": "Veri (Sayılamayan / Çoğul)",
    "exampleEn": "Our machine learning model processes massive streams of visual data.",
    "grammarNote": "",
    "exampleTr": "Makine öğrenmesi modelimiz devasa görsel veri akışlarını işler.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "data",
      "phonetic": "/ˈdeɪ.tə/",
      "translation": "veri"
    },
    "partitiveUnit": {
      "form": "a piece of data",
      "translation": "bir veri parçası"
    },
    "possessivePhrase": {
      "form": "large datasets",
      "translation": "büyük veri setleri"
    },
    "determinerPhrase": {
      "form": "this raw data",
      "translation": "bu ham veri"
    }
  },
  {
    "id": "noun_077",
    "rank": 77,
    "word": "Message",
    "phonetic": "/ˈmes.ɪdʒ/",
    "translation": "Mesaj",
    "exampleEn": "The server returned an error message when the connection timed out.",
    "grammarNote": "",
    "exampleTr": "Bağlantı zaman aşımına uğradığında sunucu bir hata mesajı döndürdü.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a message",
      "phonetic": "/ˈmes.ɪdʒ/",
      "translation": "bir mesaj"
    },
    "plural": {
      "form": "messages",
      "phonetic": "/ˈmes.ɪ.dʒɪz/",
      "translation": "mesajlar"
    },
    "possessivePhrase": {
      "form": "an error message",
      "translation": "bir hata mesajı"
    },
    "determinerPhrase": {
      "form": "these push messages",
      "translation": "bu anlık bildirim mesajları"
    }
  },
  {
    "id": "noun_078",
    "rank": 78,
    "word": "Email",
    "phonetic": "/ˈiː.meɪl/",
    "translation": "E-posta",
    "exampleEn": "I will send a confirmation email with all meeting details.",
    "grammarNote": "",
    "exampleTr": "Tüm toplantı detaylarını içeren bir onay e-postası göndereceğim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an email",
      "phonetic": "/ˈiː.meɪl/",
      "translation": "bir e-posta"
    },
    "plural": {
      "form": "emails",
      "phonetic": "/ˈiː.meɪlz/",
      "translation": "e-postalar"
    },
    "possessivePhrase": {
      "form": "my confirmation email",
      "translation": "benim onay e-postam"
    },
    "determinerPhrase": {
      "form": "these daily emails",
      "translation": "bu günlük e-postalar"
    }
  },
  {
    "id": "noun_079",
    "rank": 79,
    "word": "Internet",
    "phonetic": "/ˈɪn.tə.net/",
    "translation": "İnternet (the internet)",
    "exampleEn": "High-speed fiber internet is essential for remote software development.",
    "grammarNote": "",
    "exampleTr": "Uzaktan yazılım geliştirme için yüksek hızlı fiber internet şarttır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "the internet",
      "phonetic": "/ˈɪn.tə.net/",
      "translation": "internet"
    },
    "plural": {
      "form": "internets",
      "phonetic": "/ˈɪn.tə.net/",
      "translation": "ağlar (teknik)"
    },
    "possessivePhrase": {
      "form": "fast internet",
      "translation": "hızlı internet"
    },
    "determinerPhrase": {
      "form": "this fiber internet",
      "translation": "bu fiber internet"
    }
  },
  {
    "id": "noun_080",
    "rank": 80,
    "word": "Software",
    "phonetic": "/ˈsɒft.weər/",
    "translation": "Yazılım",
    "exampleEn": "Our team builds open-source software for developer communities.",
    "grammarNote": "",
    "exampleTr": "Ekibimiz geliştirici toplulukları için açık kaynaklı yazılımlar inşa eder.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "software",
      "phonetic": "/ˈsɒft.weər/",
      "translation": "yazılım"
    },
    "partitiveUnit": {
      "form": "a piece of software",
      "translation": "bir yazılım parçası"
    },
    "possessivePhrase": {
      "form": "open",
      "translation": "source software – açık kaynaklı yazılım"
    },
    "determinerPhrase": {
      "form": "this custom software",
      "translation": "bu özel yazılım"
    }
  },
  {
    "id": "noun_081",
    "rank": 81,
    "word": "Hardware",
    "phonetic": "/ˈhɑːd.weər/",
    "translation": "Donanım",
    "exampleEn": "The server requires high-end hardware with multi-GPU acceleration.",
    "grammarNote": "",
    "exampleTr": "Sunucu çoklu GPU hızlandırmalı üst düzey donanım gerektirir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "hardware",
      "phonetic": "/ˈhɑːd.weər/",
      "translation": "donanım"
    },
    "partitiveUnit": {
      "form": "a piece of hardware",
      "translation": "bir donanım parçası"
    },
    "possessivePhrase": {
      "form": "dedicated hardware",
      "translation": "özel donanım"
    },
    "determinerPhrase": {
      "form": "this modern hardware",
      "translation": "bu modern donanım"
    }
  },
  {
    "id": "noun_082",
    "rank": 82,
    "word": "Server",
    "phonetic": "/ˈsɜː.vər/",
    "translation": "Sunucu",
    "exampleEn": "The production server handled ten thousand concurrent requests smoothly.",
    "grammarNote": "",
    "exampleTr": "Canlı sunucu on bin eşzamanlı isteği sorunsuzca yönetti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a server",
      "phonetic": "/ˈsɜː.vər/",
      "translation": "bir sunucu"
    },
    "plural": {
      "form": "servers",
      "phonetic": "/ˈsɜː.vərz/",
      "translation": "sunucular"
    },
    "possessivePhrase": {
      "form": "the production server",
      "translation": "canlı sunucu"
    },
    "determinerPhrase": {
      "form": "these cloud servers",
      "translation": "bu bulut sunucuları"
    }
  },
  {
    "id": "noun_083",
    "rank": 83,
    "word": "Password",
    "phonetic": "/ˈpɑːs.wɜːd/",
    "translation": "Şifre / Parola",
    "exampleEn": "You must create a strong password containing numbers and symbols.",
    "grammarNote": "",
    "exampleTr": "Rakamlar ve semboller içeren güçlü bir şifre oluşturmalısınız.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a password",
      "phonetic": "/ˈpɑːs.wɜːd/",
      "translation": "bir şifre"
    },
    "plural": {
      "form": "passwords",
      "phonetic": "/ˈpɑːs.wɜːdz/",
      "translation": "şifreler"
    },
    "possessivePhrase": {
      "form": "a strong password",
      "translation": "güçlü bir şifre"
    },
    "determinerPhrase": {
      "form": "your temporary password",
      "translation": "senin geçici şifren"
    }
  },
  {
    "id": "noun_084",
    "rank": 84,
    "word": "Account",
    "phonetic": "/əˈkaʊnt/",
    "translation": "Hesap",
    "exampleEn": "I created a new user account to test the onboarding flow.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı karşılama akışını test etmek için yeni bir kullanıcı hesabı oluşturdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an account",
      "phonetic": "/əˈkaʊnt/",
      "translation": "bir hesap"
    },
    "plural": {
      "form": "accounts",
      "phonetic": "/əˈkaʊnts/",
      "translation": "hesaplar"
    },
    "possessivePhrase": {
      "form": "my user account",
      "translation": "benim kullanıcı hesabım"
    },
    "determinerPhrase": {
      "form": "these developer accounts",
      "translation": "bu geliştirici hesapları"
    }
  },
  {
    "id": "noun_085",
    "rank": 85,
    "word": "Information",
    "phonetic": "/ˌɪn.fəˈmeɪ.ʃən/",
    "translation": "Bilgi",
    "exampleEn": "The technical documentation provides valuable information about API limits.",
    "grammarNote": "",
    "exampleTr": "Teknik dokümantasyon API sınırları hakkında değerli bilgiler sağlar.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "information",
      "phonetic": "/ˌɪn.fəˈmeɪ.ʃən/",
      "translation": "bilgi"
    },
    "partitiveUnit": {
      "form": "a piece of information",
      "translation": "bir bilgi kırıntısı/parçası"
    },
    "possessivePhrase": {
      "form": "some useful information",
      "translation": "biraz faydalı bilgi"
    },
    "determinerPhrase": {
      "form": "this confidential info",
      "translation": "bu gizli bilgi"
    }
  },
  {
    "id": "noun_086",
    "rank": 86,
    "word": "News",
    "phonetic": "/njuːz/",
    "translation": "Haber / Haberler (Daima Tekil Fiil)",
    "exampleEn": "The news about the startup's successful investment was inspiring.",
    "grammarNote": "",
    "exampleTr": "Girişimin başarılı yatırımı hakkındaki haberler ilham vericiydi.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "news",
      "phonetic": "/njuːz/",
      "translation": "haber / haberler"
    },
    "partitiveUnit": {
      "form": "a piece of news",
      "translation": "bir haber"
    },
    "possessivePhrase": {
      "form": "the latest news",
      "translation": "en son haberler"
    },
    "determinerPhrase": {
      "form": "good news",
      "translation": "iyi haber"
    }
  },
  {
    "id": "noun_087",
    "rank": 87,
    "word": "Advice",
    "phonetic": "/ədˈvaɪs/",
    "translation": "Tavsiye",
    "exampleEn": "The senior architect gave me valuable advice on database scaling.",
    "grammarNote": "",
    "exampleTr": "Kıdemli mimar veritabanı ölçeklendirme konusunda bana değerli tavsiyeler verdi.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "advice",
      "phonetic": "/ədˈvaɪs/",
      "translation": "tavsiye"
    },
    "partitiveUnit": {
      "form": "a piece of advice",
      "translation": "bir tavsiye"
    },
    "possessivePhrase": {
      "form": "some practical advice",
      "translation": "biraz pratik tavsiye"
    },
    "determinerPhrase": {
      "form": "his expert advice",
      "translation": "onun uzman tavsiyesi"
    }
  },
  {
    "id": "noun_088",
    "rank": 88,
    "word": "Music",
    "phonetic": "/ˈmjuː.zɪk/",
    "translation": "Müzik",
    "exampleEn": "I listen to instrumental music while solving complex programming bugs.",
    "grammarNote": "",
    "exampleTr": "Karmaşık programlama hatalarını çözerken enstrümantal müzik dinlerim.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "music",
      "phonetic": "/ˈmjuː.zɪk/",
      "translation": "müzik"
    },
    "partitiveUnit": {
      "form": "a piece of music",
      "translation": "bir müzik parçası"
    },
    "possessivePhrase": {
      "form": "acoustic music",
      "translation": "akustik müzik"
    },
    "determinerPhrase": {
      "form": "some relaxing music",
      "translation": "biraz dinlendirici müzik"
    }
  },
  {
    "id": "noun_089",
    "rank": 89,
    "word": "Movie",
    "phonetic": "/ˈmuː.vi/",
    "translation": "Film / Sinema Filmi",
    "exampleEn": "We watched an exciting sci-fi movie at the cinema last weekend.",
    "grammarNote": "",
    "exampleTr": "Geçen hafta sonu sinemada heyecan verici bir bilim kurgu filmi izledik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a movie",
      "phonetic": "/ˈmuː.vi/",
      "translation": "bir film"
    },
    "plural": {
      "form": "movies",
      "phonetic": "/ˈmuː.viz/",
      "translation": "filmler"
    },
    "possessivePhrase": {
      "form": "a sci",
      "translation": "fi movie – bir bilim kurgu filmi"
    },
    "determinerPhrase": {
      "form": "these popular movies",
      "translation": "bu popüler filmler"
    }
  },
  {
    "id": "noun_090",
    "rank": 90,
    "word": "Game",
    "phonetic": "/ɡeɪm/",
    "translation": "Oyun",
    "exampleEn": "Our team developed an interactive educational game for Android.",
    "grammarNote": "",
    "exampleTr": "Ekibimiz Android için etkileşimli eğitici bir oyun geliştirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a game",
      "phonetic": "/ɡeɪm/",
      "translation": "bir oyun"
    },
    "plural": {
      "form": "games",
      "phonetic": "/ɡeɪmz/",
      "translation": "oyunlar"
    },
    "possessivePhrase": {
      "form": "a competitive game",
      "translation": "rekabetçi bir oyun"
    },
    "determinerPhrase": {
      "form": "these mobile games",
      "translation": "bu mobil oyunlar"
    }
  },
  {
    "id": "noun_091",
    "rank": 91,
    "word": "Sport",
    "phonetic": "/spɔːt/",
    "translation": "Spor",
    "exampleEn": "Regular physical sport improves mental focus and reduces daily stress.",
    "grammarNote": "",
    "exampleTr": "Düzenli fiziksel spor zihinsel odağı artırır ve günlük stresi azaltır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a sport",
      "phonetic": "/spɔːt/",
      "translation": "bir spor"
    },
    "plural": {
      "form": "sports",
      "phonetic": "/spɔːts/",
      "translation": "sporlar"
    },
    "possessivePhrase": {
      "form": "an outdoor sport",
      "translation": "bir açık hava sporu"
    },
    "determinerPhrase": {
      "form": "these winter sports",
      "translation": "bu kış sporları"
    }
  },
  {
    "id": "noun_092",
    "rank": 92,
    "word": "Hotel",
    "phonetic": "/həʊˈtel/",
    "translation": "Otel",
    "exampleEn": "We booked a comfortable hotel room near the conference center.",
    "grammarNote": "",
    "exampleTr": "Konferans merkezinin yakınında konforlu bir otel odası ayırttık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a hotel",
      "phonetic": "/həʊˈtel/",
      "translation": "bir otel"
    },
    "plural": {
      "form": "hotels",
      "phonetic": "/həʊˈtelz/",
      "translation": "oteller"
    },
    "possessivePhrase": {
      "form": "a luxury hotel",
      "translation": "lüks bir otel"
    },
    "determinerPhrase": {
      "form": "these seaside hotels",
      "translation": "bu deniz kenarı oteller"
    }
  },
  {
    "id": "noun_093",
    "rank": 93,
    "word": "Restaurant",
    "phonetic": "/ˈres.trɒnt/",
    "translation": "Restoran / Lokanta",
    "exampleEn": "We celebrated our project release at a lovely local restaurant.",
    "grammarNote": "",
    "exampleTr": "Proje lansmanımızı sevimli bir yerel restoranda kutladık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a restaurant",
      "phonetic": "/ˈres.trɒnt/",
      "translation": "bir restoran"
    },
    "plural": {
      "form": "restaurants",
      "phonetic": "/ˈres.trɒnts/",
      "translation": "restoranlar"
    },
    "possessivePhrase": {
      "form": "an Italian restaurant",
      "translation": "bir İtalyan restoranı"
    },
    "determinerPhrase": {
      "form": "these local restaurants",
      "translation": "bu yerel restoranlar"
    }
  },
  {
    "id": "noun_094",
    "rank": 94,
    "word": "Airport",
    "phonetic": "/ˈeə.pɔːt/",
    "translation": "Havalimanı",
    "exampleEn": "I arrived at the international airport two hours before departure.",
    "grammarNote": "",
    "exampleTr": "Kalkıştan iki saat önce uluslararası havalimanına vardım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an airport",
      "phonetic": "/ˈeə.pɔːt/",
      "translation": "bir havalimanı"
    },
    "plural": {
      "form": "airports",
      "phonetic": "/ˈeə.pɔːts/",
      "translation": "havalimanları"
    },
    "possessivePhrase": {
      "form": "the international airport",
      "translation": "uluslararası havalimanı"
    },
    "determinerPhrase": {
      "form": "this modern airport",
      "translation": "bu modern havalimanı"
    }
  },
  {
    "id": "noun_095",
    "rank": 95,
    "word": "Station",
    "phonetic": "/ˈsteɪ.ʃən/",
    "translation": "İstasyon / Durak",
    "exampleEn": "The central train station is located within walking distance.",
    "grammarNote": "",
    "exampleTr": "Merkez tren istasyonu yürüme mesafesinde yer almaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a station",
      "phonetic": "/ˈsteɪ.ʃən/",
      "translation": "bir istasyon"
    },
    "plural": {
      "form": "stations",
      "phonetic": "/ˈsteɪ.ʃənz/",
      "translation": "istasyonlar"
    },
    "possessivePhrase": {
      "form": "the metro station",
      "translation": "metro istasyonu"
    },
    "determinerPhrase": {
      "form": "that central station",
      "translation": "şu merkez istasyon"
    }
  },
  {
    "id": "noun_096",
    "rank": 96,
    "word": "Park",
    "phonetic": "/pɑːk/",
    "translation": "Park",
    "exampleEn": "We had a relaxing picnic in the city park on Saturday afternoon.",
    "grammarNote": "",
    "exampleTr": "Cumartesi öğleden sonra şehir parkında dinlendirici bir piknik yaptık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a park",
      "phonetic": "/pɑːk/",
      "translation": "bir park"
    },
    "plural": {
      "form": "parks",
      "phonetic": "/pɑːks/",
      "translation": "parklar"
    },
    "possessivePhrase": {
      "form": "the city park",
      "translation": "şehir parkı"
    },
    "determinerPhrase": {
      "form": "these botanical parks",
      "translation": "bu botanik parklar"
    }
  },
  {
    "id": "noun_097",
    "rank": 97,
    "word": "Sea",
    "phonetic": "/siː/",
    "translation": "Deniz",
    "exampleEn": "The hotel balcony offers a breathtaking view of the sea.",
    "grammarNote": "",
    "exampleTr": "Otel balkonu denizin nefes kesici bir manzarasını sunmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "the sea",
      "phonetic": "/siː/",
      "translation": "deniz"
    },
    "plural": {
      "form": "seas",
      "phonetic": "/siːz/",
      "translation": "denizler"
    },
    "possessivePhrase": {
      "form": "the Mediterranean Sea",
      "translation": "Akdeniz"
    },
    "determinerPhrase": {
      "form": "this calm sea",
      "translation": "bu sakin deniz"
    }
  },
  {
    "id": "noun_098",
    "rank": 98,
    "word": "River",
    "phonetic": "/ˈrɪv.ər/",
    "translation": "Nehir / Irmak",
    "exampleEn": "The historical bridge crosses a wide river in the city center.",
    "grammarNote": "",
    "exampleTr": "Tarihi köprü şehir merkezindeki geniş bir nehrin üzerinden geçer.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a river",
      "phonetic": "/ˈrɪv.ər/",
      "translation": "bir nehir"
    },
    "plural": {
      "form": "rivers",
      "phonetic": "/ˈrɪv.ərz/",
      "translation": "nehirler"
    },
    "possessivePhrase": {
      "form": "the wide river",
      "translation": "geniş nehir"
    },
    "determinerPhrase": {
      "form": "these clean rivers",
      "translation": "bu temiz nehirler"
    }
  },
  {
    "id": "noun_099",
    "rank": 99,
    "word": "Mountain",
    "phonetic": "/ˈmaʊn.tɪn/",
    "translation": "Dağ",
    "exampleEn": "We hiked up the mountain during our weekend nature excursion.",
    "grammarNote": "",
    "exampleTr": "Hafta sonu doğa gezimiz sırasında dağa doğru tırmandık / yürüdük.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a mountain",
      "phonetic": "/ˈmaʊn.tɪn/",
      "translation": "bir dağ"
    },
    "plural": {
      "form": "mountains",
      "phonetic": "/ˈmaʊn.tɪnz/",
      "translation": "dağlar"
    },
    "possessivePhrase": {
      "form": "the snowy mountain",
      "translation": "karlı dağ"
    },
    "determinerPhrase": {
      "form": "these high mountains",
      "translation": "bu yüksek dağlar"
    }
  },
  {
    "id": "noun_100",
    "rank": 100,
    "word": "Language",
    "phonetic": "/ˈlæŋ.ɡwɪdʒ/",
    "translation": "Dil / Lisan",
    "exampleEn": "Kotlin and Python are two of the most popular programming languages today.",
    "grammarNote": "",
    "exampleTr": "Kotlin ve Python günümüzde en popüler programlama dillerinden ikisidir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a language",
      "phonetic": "/ˈlæŋ.ɡwɪdʒ/",
      "translation": "bir dil"
    },
    "plural": {
      "form": "languages",
      "phonetic": "/ˈlæŋ.ɡwɪ.dʒɪz/",
      "translation": "diller"
    },
    "possessivePhrase": {
      "form": "the English language",
      "translation": "İngilizce dili"
    },
    "determinerPhrase": {
      "form": "these programming languages",
      "translation": "bu programlama dilleri"
    }
  }
] as LibraryWordEntry[];

export const NOUNS_200: LibraryWordEntry[] = [
  {
    "id": "noun_101",
    "rank": 101,
    "word": "Address",
    "phonetic": "/əˈdres/",
    "translation": "Adres",
    "exampleEn": "Please enter your valid billing address on the checkout form.",
    "grammarNote": "",
    "exampleTr": "Lütfen ödeme formuna geçerli fatura adresinizi giriniz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an address",
      "phonetic": "/əˈdres/",
      "translation": "bir adres"
    },
    "plural": {
      "form": "addresses",
      "phonetic": "/əˈdres.ɪz/",
      "translation": "adresler"
    },
    "possessivePhrase": {
      "form": "my email address",
      "translation": "benim e-posta adresim"
    },
    "determinerPhrase": {
      "form": "this residential address",
      "translation": "bu ikametgah adresi"
    }
  },
  {
    "id": "noun_102",
    "rank": 102,
    "word": "Age",
    "phonetic": "/eɪdʒ/",
    "translation": "Yaş / Çağ",
    "exampleEn": "We are living in the artificial intelligence age.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka çağında yaşıyoruz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an age",
      "phonetic": "/eɪdʒ/",
      "translation": "bir yaş / çağ"
    },
    "plural": {
      "form": "ages",
      "phonetic": "/ˈeɪ.dʒɪz/",
      "translation": "yaşlar / çağlar"
    },
    "possessivePhrase": {
      "form": "his age",
      "translation": "onun yaşı"
    },
    "determinerPhrase": {
      "form": "the digital age",
      "translation": "dijital çağ"
    }
  },
  {
    "id": "noun_103",
    "rank": 103,
    "word": "Air",
    "phonetic": "/eər/",
    "translation": "Hava",
    "exampleEn": "Opening the window lets fresh air circulate into the room.",
    "grammarNote": "",
    "exampleTr": "Pencereyi açmak içeriye temiz havanın dolaşmasını sağlar.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "air",
      "phonetic": "/eər/",
      "translation": "hava"
    },
    "partitiveUnit": {
      "form": "fresh air",
      "translation": "temiz hava"
    },
    "possessivePhrase": {
      "form": "clean air",
      "translation": "temiz hava"
    },
    "determinerPhrase": {
      "form": "the urban air",
      "translation": "şehir havası"
    }
  },
  {
    "id": "noun_104",
    "rank": 104,
    "word": "Area",
    "phonetic": "/ˈeə.ri.ə/",
    "translation": "Alan / Bölge",
    "exampleEn": "Our tech company expanded into several new geographic areas.",
    "grammarNote": "",
    "exampleTr": "Teknoloji şirketimiz birkaç yeni coğrafi alana genişledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an area",
      "phonetic": "/ˈeə.ri.ə/",
      "translation": "bir alan"
    },
    "plural": {
      "form": "areas",
      "phonetic": "/ˈeə.ri.əz/",
      "translation": "alanlar"
    },
    "possessivePhrase": {
      "form": "our local area",
      "translation": "bizim yerel bölgemiz"
    },
    "determinerPhrase": {
      "form": "this parking area",
      "translation": "bu park alanı"
    }
  },
  {
    "id": "noun_105",
    "rank": 105,
    "word": "Art",
    "phonetic": "/ɑːt/",
    "translation": "Sanat (Sayılamayan/Çoğul)",
    "exampleEn": "She designs captivating digital art using graphic design software.",
    "grammarNote": "",
    "exampleTr": "Grafik tasarım yazılımı kullanarak büyüleyici dijital sanat tasarlar.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "art",
      "phonetic": "/ɑːt/",
      "translation": "sanat"
    },
    "partitiveUnit": {
      "form": "a work of art",
      "translation": "bir sanat eseri"
    },
    "possessivePhrase": {
      "form": "digital art",
      "translation": "dijital sanat"
    },
    "determinerPhrase": {
      "form": "this modern art",
      "translation": "bu modern sanat"
    }
  },
  {
    "id": "noun_106",
    "rank": 106,
    "word": "Bank",
    "phonetic": "/bæŋk/",
    "translation": "Banka",
    "exampleEn": "I opened a checking account at an international bank branch.",
    "grammarNote": "",
    "exampleTr": "Uluslararası bir banka şubesinde vadesiz hesap açtım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bank",
      "phonetic": "/bæŋk/",
      "translation": "bir banka"
    },
    "plural": {
      "form": "banks",
      "phonetic": "/bæŋks/",
      "translation": "bankalar"
    },
    "possessivePhrase": {
      "form": "my commercial bank",
      "translation": "benim ticari bankam"
    },
    "determinerPhrase": {
      "form": "these international banks",
      "translation": "bu uluslararası bankalar"
    }
  },
  {
    "id": "noun_107",
    "rank": 107,
    "word": "Bed",
    "phonetic": "/bed/",
    "translation": "Yatak",
    "exampleEn": "I go to bed at 11 PM to maintain a healthy sleep routine.",
    "grammarNote": "",
    "exampleTr": "Sağlıklı bir uyku rutinini korumak için saat 23:00'te yatağa giderim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bed",
      "phonetic": "/bed/",
      "translation": "bir yatak"
    },
    "plural": {
      "form": "beds",
      "phonetic": "/bedz/",
      "translation": "yataklar"
    },
    "possessivePhrase": {
      "form": "my comfortable bed",
      "translation": "benim rahat yatağım"
    },
    "determinerPhrase": {
      "form": "this king",
      "translation": "size bed – bu çift kişilik büyük yatak"
    }
  },
  {
    "id": "noun_108",
    "rank": 108,
    "word": "Bill",
    "phonetic": "/bɪl/",
    "translation": "Hesap / Fatura",
    "exampleEn": "The restaurant waiter brought the bill at the end of our meal.",
    "grammarNote": "",
    "exampleTr": "Restoran garsonu yemeğimizin sonunda hesabı getirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bill",
      "phonetic": "/bɪl/",
      "translation": "bir fatura / hesap"
    },
    "plural": {
      "form": "bills",
      "phonetic": "/bɪlz/",
      "translation": "faturalar"
    },
    "possessivePhrase": {
      "form": "our hosting bill",
      "translation": "bizim barındırma faturamız"
    },
    "determinerPhrase": {
      "form": "this utility bill",
      "translation": "bu gider faturası"
    }
  },
  {
    "id": "noun_109",
    "rank": 109,
    "word": "Blood",
    "phonetic": "/blʌd/",
    "translation": "Kan",
    "exampleEn": "The hospital lab analyzed the patient's blood sample.",
    "grammarNote": "",
    "exampleTr": "Hastane laboratuvarı hastanın kan örneğini analiz etti.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "blood",
      "phonetic": "/blʌd/",
      "translation": "kan"
    },
    "partitiveUnit": {
      "form": "a drop of blood",
      "translation": "bir damla kan"
    },
    "possessivePhrase": {
      "form": "blood pressure",
      "translation": "kan basıncı / tansiyon"
    },
    "determinerPhrase": {
      "form": "this blood test",
      "translation": "bu kan testi"
    }
  },
  {
    "id": "noun_110",
    "rank": 110,
    "word": "Body",
    "phonetic": "/ˈbɒd.i/",
    "translation": "Vücut / Gövde (Düzensiz -ies)",
    "exampleEn": "The HTTP POST request contains a JSON payload in its body.",
    "grammarNote": "",
    "exampleTr": "HTTP POST isteği gövdesinde bir JSON veri yükü içerir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a body",
      "phonetic": "/ˈbɒd.i/",
      "translation": "bir vücut / gövde"
    },
    "plural": {
      "form": "bodies",
      "phonetic": "/ˈbɒd.iz/",
      "translation": "vücutlar"
    },
    "possessivePhrase": {
      "form": "the request body",
      "translation": "istek gövdesi (API)"
    },
    "determinerPhrase": {
      "form": "this human body",
      "translation": "bu insan vücudu"
    }
  },
  {
    "id": "noun_111",
    "rank": 111,
    "word": "Box",
    "phonetic": "/bɒks/",
    "translation": "Kutu (Çoğul: boxes)",
    "exampleEn": "A confirmation dialogue box appeared on the screen.",
    "grammarNote": "",
    "exampleTr": "Ekranda bir onay iletişim kutusu belirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a box",
      "phonetic": "/bɒks/",
      "translation": "bir kutu"
    },
    "plural": {
      "form": "boxes",
      "phonetic": "/ˈbɒk.sɪz/",
      "translation": "kutular"
    },
    "possessivePhrase": {
      "form": "a dialogue box",
      "translation": "bir iletişim kutusu"
    },
    "determinerPhrase": {
      "form": "these packaging boxes",
      "translation": "bu paketleme kutuları"
    }
  },
  {
    "id": "noun_112",
    "rank": 112,
    "word": "Boy",
    "phonetic": "/bɔɪ/",
    "translation": "Erkek çocuk / Oğlan",
    "exampleEn": "The boy is learning how to code interactive video games.",
    "grammarNote": "",
    "exampleTr": "Çocuk etkileşimli video oyunları kodlamayı öğreniyor.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a boy",
      "phonetic": "/bɔɪ/",
      "translation": "bir erkek çocuk"
    },
    "plural": {
      "form": "boys",
      "phonetic": "/bɔɪz/",
      "translation": "erkek çocuklar"
    },
    "possessivePhrase": {
      "form": "that young boy",
      "translation": "şu genç çocuk"
    },
    "determinerPhrase": {
      "form": "these school boys",
      "translation": "bu okul çocukları"
    }
  },
  {
    "id": "noun_113",
    "rank": 113,
    "word": "Building",
    "phonetic": "/ˈbɪl.dɪŋ/",
    "translation": "Bina / Yapı",
    "exampleEn": "Our software development office is located in Teknokent building A.",
    "grammarNote": "",
    "exampleTr": "Yazılım geliştirme ofisimiz Teknokent A binasında yer almaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a building",
      "phonetic": "/ˈbɪl.dɪŋ/",
      "translation": "bir bina"
    },
    "plural": {
      "form": "buildings",
      "phonetic": "/ˈbɪl.dɪŋz/",
      "translation": "binalar"
    },
    "possessivePhrase": {
      "form": "our campus building",
      "translation": "bizim kampüs binamız"
    },
    "determinerPhrase": {
      "form": "this historic building",
      "translation": "bu tarihi bina"
    }
  },
  {
    "id": "noun_114",
    "rank": 114,
    "word": "Business",
    "phonetic": "/ˈbɪz.nɪs/",
    "translation": "İş / Ticaret",
    "exampleEn": "I founded an online e-commerce business for 3D printed products.",
    "grammarNote": "",
    "exampleTr": "3D baskılı ürünler için çevrim içi bir e-ticaret işletmesi kurdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a business",
      "phonetic": "/ˈbɪz.nɪs/",
      "translation": "bir işletme / iş"
    },
    "plural": {
      "form": "businesses",
      "phonetic": "/ˈbɪz.nɪ.sɪz/",
      "translation": "işletmeler"
    },
    "possessivePhrase": {
      "form": "my online business",
      "translation": "benim çevrim içi işim"
    },
    "determinerPhrase": {
      "form": "this SaaS business",
      "translation": "bu SaaS işletmesi"
    }
  },
  {
    "id": "noun_115",
    "rank": 115,
    "word": "Card",
    "phonetic": "/kɑːd/",
    "translation": "Kart",
    "exampleEn": "You can tap your contactless card on the payment terminal.",
    "grammarNote": "",
    "exampleTr": "Temassız kartınızı ödeme terminaline dokundurabilirsiniz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a card",
      "phonetic": "/kɑːd/",
      "translation": "bir kart"
    },
    "plural": {
      "form": "cards",
      "phonetic": "/kɑːdz/",
      "translation": "kartlar"
    },
    "possessivePhrase": {
      "form": "my credit card",
      "translation": "benim kredi kartım"
    },
    "determinerPhrase": {
      "form": "these access cards",
      "translation": "bu giriş kartları"
    }
  },
  {
    "id": "noun_116",
    "rank": 116,
    "word": "Center",
    "phonetic": "/ˈsen.tər/",
    "translation": "Merkez",
    "exampleEn": "Our cloud servers are hosted in a secure European data center.",
    "grammarNote": "",
    "exampleTr": "Bulut sunucularımız güvenli bir Avrupa veri merkezinde barındırılmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a center",
      "phonetic": "/ˈsen.tər/",
      "translation": "bir merkez"
    },
    "plural": {
      "form": "centers",
      "phonetic": "/ˈsen.tərz/",
      "translation": "merkezler"
    },
    "possessivePhrase": {
      "form": "the data center",
      "translation": "veri merkezi"
    },
    "determinerPhrase": {
      "form": "this innovation center",
      "translation": "bu inovasyon merkezi"
    }
  },
  {
    "id": "noun_117",
    "rank": 117,
    "word": "Century",
    "phonetic": "/ˈsen.tʃər.i/",
    "translation": "Yüzyıl / Asır",
    "exampleEn": "Artificial intelligence will define the technological landscape of the 21st century.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka 21\\. yüzyılın teknolojik manzarasını tanımlayacaktır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a century",
      "phonetic": "/ˈsen.tʃər.i/",
      "translation": "bir yüzyıl"
    },
    "plural": {
      "form": "centuries",
      "phonetic": "/ˈsen.tʃər.iz/",
      "translation": "yüzyıllar"
    },
    "possessivePhrase": {
      "form": "the 21st century",
      "translation": "21\\. yüzyıl"
    },
    "determinerPhrase": {
      "form": "this past century",
      "translation": "bu geçen yüzyıl"
    }
  },
  {
    "id": "noun_118",
    "rank": 118,
    "word": "Change",
    "phonetic": "/tʃeɪndʒ/",
    "translation": "Değişiklik / Para üstü",
    "exampleEn": "I committed all my architectural code changes to GitHub.",
    "grammarNote": "",
    "exampleTr": "Tüm mimari kod değişikliklerimi GitHub'a commit ettim / gönderdim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a change",
      "phonetic": "/tʃeɪndʒ/",
      "translation": "bir değişiklik"
    },
    "plural": {
      "form": "changes",
      "phonetic": "/ˈtʃeɪn.dʒɪz/",
      "translation": "değişiklikler"
    },
    "possessivePhrase": {
      "form": "my Git changes",
      "translation": "benim Git değişikliklerim"
    },
    "determinerPhrase": {
      "form": "some small change",
      "translation": "biraz bozuk para"
    }
  },
  {
    "id": "noun_119",
    "rank": 119,
    "word": "Class",
    "phonetic": "/klɑːs/",
    "translation": "Sınıf / Ders (Çoğul: classes)",
    "exampleEn": "I created a reusable data class to represent user entities.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı varlıklarını temsil etmek için yeniden kullanılabilir bir veri sınıfı (data class) oluşturdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a class",
      "phonetic": "/klɑːs/",
      "translation": "bir sınıf / ders"
    },
    "plural": {
      "form": "classes",
      "phonetic": "/ˈklɑː.sɪz/",
      "translation": "sınıflar / dersler"
    },
    "possessivePhrase": {
      "form": "our Kotlin class",
      "translation": "bizim Kotlin sınıfımız"
    },
    "determinerPhrase": {
      "form": "these online classes",
      "translation": "bu çevrim içi dersler"
    }
  },
  {
    "id": "noun_120",
    "rank": 120,
    "word": "Code",
    "phonetic": "/kəʊd/",
    "translation": "Kod",
    "exampleEn": "Writing clean and modular code simplifies future maintenance.",
    "grammarNote": "",
    "exampleTr": "Temiz ve modüler kod yazmak gelecekteki bakımı basitleştirir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "code",
      "phonetic": "/kəʊd/",
      "translation": "kod"
    },
    "partitiveUnit": {
      "form": "a line of code",
      "translation": "bir satır kod"
    },
    "possessivePhrase": {
      "form": "clean code",
      "translation": "temiz kod"
    },
    "determinerPhrase": {
      "form": "this source code",
      "translation": "bu kaynak kod"
    }
  },
  {
    "id": "noun_121",
    "rank": 121,
    "word": "Color",
    "phonetic": "/ˈkʌl.ər/",
    "translation": "Renk",
    "exampleEn": "The UI designer selected a modern color palette for the mobile app.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı arayüzü tasarımcısı mobil uygulama için modern bir renk paleti seçti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a color",
      "phonetic": "/ˈkʌl.ər/",
      "translation": "bir renk"
    },
    "plural": {
      "form": "colors",
      "phonetic": "/ˈkʌl.ərz/",
      "translation": "renkler"
    },
    "possessivePhrase": {
      "form": "the primary color",
      "translation": "ana renk"
    },
    "determinerPhrase": {
      "form": "these vibrant colors",
      "translation": "bu canlı renkler"
    }
  },
  {
    "id": "noun_122",
    "rank": 122,
    "word": "Community",
    "phonetic": "/kəˈmjuː.nə.ti/",
    "translation": "Topluluk (Düzensiz -ies)",
    "exampleEn": "I lead our university student technology community, BozTech.",
    "grammarNote": "",
    "exampleTr": "Üniversite öğrenci teknoloji topluluğumuz BozTech'e liderlik ediyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a community",
      "phonetic": "/kəˈmjuː.nə.ti/",
      "translation": "bir topluluk"
    },
    "plural": {
      "form": "communities",
      "phonetic": "/kəˈmjuː.nə.tiz/",
      "translation": "topluluklar"
    },
    "possessivePhrase": {
      "form": "our developer community",
      "translation": "bizim geliştirici topluluğumuz"
    },
    "determinerPhrase": {
      "form": "this active community",
      "translation": "bu aktif topluluk"
    }
  },
  {
    "id": "noun_123",
    "rank": 123,
    "word": "Cost",
    "phonetic": "/kɒst/",
    "translation": "Maliyet / Masraf",
    "exampleEn": "Caching database queries reduced our monthly server costs by half.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sorgularını önbelleğe almak aylık sunucu maliyetlerimizi yarı yarıya düşürdü.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a cost",
      "phonetic": "/kɒst/",
      "translation": "bir maliyet"
    },
    "plural": {
      "form": "costs",
      "phonetic": "/kɒsts/",
      "translation": "maliyetler"
    },
    "possessivePhrase": {
      "form": "our infrastructure cost",
      "translation": "bizim altyapı maliyetimiz"
    },
    "determinerPhrase": {
      "form": "these operational costs",
      "translation": "bu operasyonel maliyetler"
    }
  },
  {
    "id": "noun_124",
    "rank": 124,
    "word": "Course",
    "phonetic": "/kɔːs/",
    "translation": "Kurs / Ders / Eğitim",
    "exampleEn": "I enrolled in an advanced machine learning and deep learning course.",
    "grammarNote": "",
    "exampleTr": "İleri düzey bir makine öğrenmesi ve derin öğrenme kursuna kaydoldum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a course",
      "phonetic": "/kɔːs/",
      "translation": "bir kurs"
    },
    "plural": {
      "form": "courses",
      "phonetic": "/ˈkɔː.sɪz/",
      "translation": "kurslar"
    },
    "possessivePhrase": {
      "form": "an online course",
      "translation": "çevrim içi bir kurs"
    },
    "determinerPhrase": {
      "form": "this engineering course",
      "translation": "bu mühendislik dersi"
    }
  },
  {
    "id": "noun_125",
    "rank": 125,
    "word": "Customer",
    "phonetic": "/ˈkʌs.tə.mər/",
    "translation": "Müşteri",
    "exampleEn": "We designed an intuitive checkout flow to improve customer satisfaction.",
    "grammarNote": "",
    "exampleTr": "Müşteri memnuniyetini artırmak için sezgisel bir ödeme akışı tasarladık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a customer",
      "phonetic": "/ˈkʌs.tə.mər/",
      "translation": "bir müşteri"
    },
    "plural": {
      "form": "customers",
      "phonetic": "/ˈkʌs.tə.mərz/",
      "translation": "müşteriler"
    },
    "possessivePhrase": {
      "form": "our enterprise customer",
      "translation": "bizim kurumsal müşterimiz"
    },
    "determinerPhrase": {
      "form": "these loyal customers",
      "translation": "bu sadık müşteriler"
    }
  },
  {
    "id": "noun_126",
    "rank": 126,
    "word": "Database",
    "phonetic": "/ˈdeɪ.tə.beɪs/",
    "translation": "Veritabanı",
    "exampleEn": "Our backend service queries the PostgreSQL database in sub-milliseconds.",
    "grammarNote": "",
    "exampleTr": "Arka uç servisimiz PostgreSQL veritabanını milisaniye altında sorgular.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a database",
      "phonetic": "/ˈdeɪ.tə.beɪs/",
      "translation": "bir veritabanı"
    },
    "plural": {
      "form": "databases",
      "phonetic": "/ˈdeɪ.tə.beɪ.sɪz/",
      "translation": "veritabanları"
    },
    "possessivePhrase": {
      "form": "the PostgreSQL database",
      "translation": "PostgreSQL veritabanı"
    },
    "determinerPhrase": {
      "form": "these distributed databases",
      "translation": "bu dağıtık veritabanları"
    }
  },
  {
    "id": "noun_127",
    "rank": 127,
    "word": "Decision",
    "phonetic": "/dɪˈsɪʒ.ən/",
    "translation": "Karar",
    "exampleEn": "Migrating to Kotlin Multiplatform was an excellent strategic decision.",
    "grammarNote": "",
    "exampleTr": "Kotlin Multiplatform'a geçmek mükemmel bir stratejik karardı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a decision",
      "phonetic": "/dɪˈsɪʒ.ən/",
      "translation": "bir karar"
    },
    "plural": {
      "form": "decisions",
      "phonetic": "/dɪˈsɪʒ.ənz/",
      "translation": "kararlar"
    },
    "possessivePhrase": {
      "form": "our architectural decision",
      "translation": "bizim mimari kararımız"
    },
    "determinerPhrase": {
      "form": "this final decision",
      "translation": "bu nihai karar"
    }
  },
  {
    "id": "noun_128",
    "rank": 128,
    "word": "Design",
    "phonetic": "/dɪˈzaɪn/",
    "translation": "Tasarım",
    "exampleEn": "The mobile app features a minimalist and accessible design.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulama minimalist ve erişilebilir bir tasarıma sahiptir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a design",
      "phonetic": "/dɪˈzaɪn/",
      "translation": "bir tasarım"
    },
    "plural": {
      "form": "designs",
      "phonetic": "/dɪˈzaɪnz/",
      "translation": "tasarımlar"
    },
    "possessivePhrase": {
      "form": "the UI design",
      "translation": "kullanıcı arayüzü tasarımı"
    },
    "determinerPhrase": {
      "form": "this responsive design",
      "translation": "bu duyarlı tasarım"
    }
  },
  {
    "id": "noun_129",
    "rank": 129,
    "word": "Desk",
    "phonetic": "/desk/",
    "translation": "Çalışma Masası",
    "exampleEn": "I set up two 4K external monitors on my office desk.",
    "grammarNote": "",
    "exampleTr": "Ofis masama iki adet 4K harici monitör kurdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a desk",
      "phonetic": "/desk/",
      "translation": "bir masa"
    },
    "plural": {
      "form": "desks",
      "phonetic": "/desks/",
      "translation": "masalar"
    },
    "possessivePhrase": {
      "form": "my office desk",
      "translation": "benim ofis masam"
    },
    "determinerPhrase": {
      "form": "these standing desks",
      "translation": "bu ayakta çalışma masaları"
    }
  },
  {
    "id": "noun_130",
    "rank": 130,
    "word": "Development",
    "phonetic": "/dɪˈvel.əp.mənt/",
    "translation": "Geliştirme / Gelişim",
    "exampleEn": "Jetpack Compose accelerates Android native UI development substantially.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose yerel Android arayüz geliştirmesini önemli ölçüde hızlandırır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "development",
      "phonetic": "/dɪˈvel.əp.mənt/",
      "translation": "geliştirme"
    },
    "partitiveUnit": {
      "form": "software development",
      "translation": "yazılım geliştirme"
    },
    "possessivePhrase": {
      "form": "rapid development",
      "translation": "hızlı geliştirme"
    },
    "determinerPhrase": {
      "form": "this ongoing development",
      "translation": "bu devam eden geliştirme"
    }
  },
  {
    "id": "noun_131",
    "rank": 131,
    "word": "Device",
    "phonetic": "/dɪˈvaɪs/",
    "translation": "Cihaz / Aygıt",
    "exampleEn": "We tested our application on ten different physical Android devices.",
    "grammarNote": "",
    "exampleTr": "Uygulamamızı on farklı fiziksel Android cihazında test ettik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a device",
      "phonetic": "/dɪˈvaɪs/",
      "translation": "bir cihaz"
    },
    "plural": {
      "form": "devices",
      "phonetic": "/dɪˈvaɪ.sɪz/",
      "translation": "cihazlar"
    },
    "possessivePhrase": {
      "form": "the mobile device",
      "translation": "mobil cihaz"
    },
    "determinerPhrase": {
      "form": "these IoT devices",
      "translation": "bu IoT cihazları"
    }
  },
  {
    "id": "noun_132",
    "rank": 132,
    "word": "Difference",
    "phonetic": "/ˈdɪf.ər.əns/",
    "translation": "Fark / Ayrım",
    "exampleEn": "The performance difference between synchronous and asynchronous code is huge.",
    "grammarNote": "",
    "exampleTr": "Eşzamanlı ve eşzamansız kod arasındaki performans farkı büyüktür.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a difference",
      "phonetic": "/ˈdɪf.ər.əns/",
      "translation": "bir fark"
    },
    "plural": {
      "form": "differences",
      "phonetic": "/ˈdɪf.ər.ən.sɪz/",
      "translation": "farklar"
    },
    "possessivePhrase": {
      "form": "the main difference",
      "translation": "ana fark"
    },
    "determinerPhrase": {
      "form": "these noticeable differences",
      "translation": "bu belirgin farklar"
    }
  },
  {
    "id": "noun_133",
    "rank": 133,
    "word": "Direction",
    "phonetic": "/dɪˈrek.ʃən/",
    "translation": "Yön / Talimat",
    "exampleEn": "The tutorial provides clear directions for setting up the development environment.",
    "grammarNote": "",
    "exampleTr": "Öğretici, geliştirme ortamını kurmak için net talimatlar sağlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a direction",
      "phonetic": "/dɪˈrek.ʃən/",
      "translation": "bir yön"
    },
    "plural": {
      "form": "directions",
      "phonetic": "/dɪˈrek.ʃənz/",
      "translation": "yönler / talimatlar"
    },
    "possessivePhrase": {
      "form": "the right direction",
      "translation": "doğru yön"
    },
    "determinerPhrase": {
      "form": "these step",
      "translation": "by-step directions – bu adım adım talimatlar"
    }
  },
  {
    "id": "noun_134",
    "rank": 134,
    "word": "Distance",
    "phonetic": "/ˈdɪs.təns/",
    "translation": "Mesafe / Uzaklık",
    "exampleEn": "The hotel is located within walking distance of the subway station.",
    "grammarNote": "",
    "exampleTr": "Otel metro istasyonuna yürüme mesafesinde yer almaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a distance",
      "phonetic": "/ˈdɪs.təns/",
      "translation": "bir mesafe"
    },
    "plural": {
      "form": "distances",
      "phonetic": "/ˈdɪs.tən.sɪz/",
      "translation": "mesafeler"
    },
    "possessivePhrase": {
      "form": "a short distance",
      "translation": "kısa bir mesafe"
    },
    "determinerPhrase": {
      "form": "this long distance",
      "translation": "bu uzun mesafe"
    }
  },
  {
    "id": "noun_135",
    "rank": 135,
    "word": "Driver",
    "phonetic": "/ˈdraɪ.vər/",
    "translation": "Sürücü / Donanım Sürücüsü",
    "exampleEn": "I installed the latest GPU hardware drivers for CUDA acceleration.",
    "grammarNote": "",
    "exampleTr": "CUDA hızlandırması için en son GPU donanım sürücülerini kurdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a driver",
      "phonetic": "/ˈdraɪ.vər/",
      "translation": "bir sürücü"
    },
    "plural": {
      "form": "drivers",
      "phonetic": "/ˈdraɪ.vərz/",
      "translation": "sürücüler"
    },
    "possessivePhrase": {
      "form": "the hardware driver",
      "translation": "donanım sürücüsü"
    },
    "determinerPhrase": {
      "form": "these experienced drivers",
      "translation": "bu deneyimli sürücüler"
    }
  },
  {
    "id": "noun_136",
    "rank": 136,
    "word": "Education",
    "phonetic": "/ˌedʒ.uˈkeɪ.ʃən/",
    "translation": "Eğitim",
    "exampleEn": "Quality engineering education empowers students to build innovative products.",
    "grammarNote": "",
    "exampleTr": "Kaliteli mühendislik eğitimi öğrencileri yenilikçi ürünler inşa etmeleri için güçlendirir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "education",
      "phonetic": "/ˌedʒ.uˈkeɪ.ʃən/",
      "translation": "eğitim"
    },
    "partitiveUnit": {
      "form": "higher education",
      "translation": "yüksek öğrenim"
    },
    "possessivePhrase": {
      "form": "technical education",
      "translation": "teknik eğitim"
    },
    "determinerPhrase": {
      "form": "this formal education",
      "translation": "bu örgün eğitim"
    }
  },
  {
    "id": "noun_137",
    "rank": 137,
    "word": "Electricity",
    "phonetic": "/ɪˌlekˈtrɪs.ə.ti/",
    "translation": "Elektrik",
    "exampleEn": "Our rooftop solar panels generate clean electricity for the building.",
    "grammarNote": "",
    "exampleTr": "Çatı güneş panellerimiz bina için temiz elektrik üretir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "electricity",
      "phonetic": "/ɪˌlekˈtrɪs.ə.ti/",
      "translation": "elektrik"
    },
    "partitiveUnit": {
      "form": "green electricity",
      "translation": "yeşil elektrik"
    },
    "possessivePhrase": {
      "form": "solar electricity",
      "translation": "güneş elektriği"
    },
    "determinerPhrase": {
      "form": "this generated electricity",
      "translation": "bu üretilen elektrik"
    }
  },
  {
    "id": "noun_138",
    "rank": 138,
    "word": "End",
    "phonetic": "/end/",
    "translation": "Son / Bitiş",
    "exampleEn": "We will deliver all core features before the end of the sprint.",
    "grammarNote": "",
    "exampleTr": "Sprintin sonundan önce tüm temel özellikleri teslim edeceğiz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an end",
      "phonetic": "/end/",
      "translation": "bir son"
    },
    "plural": {
      "form": "ends",
      "phonetic": "/endz/",
      "translation": "sonlar / uçlar"
    },
    "possessivePhrase": {
      "form": "the backend",
      "translation": "arka uç (yazılım)"
    },
    "determinerPhrase": {
      "form": "the sprint end",
      "translation": "sprint sonu"
    }
  },
  {
    "id": "noun_139",
    "rank": 139,
    "word": "Energy",
    "phonetic": "/ˈen.ə.dʒi/",
    "translation": "Enerji",
    "exampleEn": "Edge computing devices consume significantly less energy than cloud servers.",
    "grammarNote": "",
    "exampleTr": "Uç bilişim cihazları bulut sunucularından önemli ölçüde daha az enerji tüketir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "energy",
      "phonetic": "/ˈen.ə.dʒi/",
      "translation": "enerji"
    },
    "partitiveUnit": {
      "form": "renewable energy",
      "translation": "yenilenebilir enerji"
    },
    "possessivePhrase": {
      "form": "clean energy",
      "translation": "temiz enerji"
    },
    "determinerPhrase": {
      "form": "this solar energy",
      "translation": "bu güneş enerjisi"
    }
  },
  {
    "id": "noun_140",
    "rank": 140,
    "word": "Engineer",
    "phonetic": "/ˌen.dʒɪˈnɪər/",
    "translation": "Mühendis",
    "exampleEn": "I work as a full-stack software engineer specializing in AI and mobile apps.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka ve mobil uygulamalarda uzmanlaşmış bir tam yığın yazılım mühendisi olarak çalışıyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an engineer",
      "phonetic": "/ˌen.dʒɪˈnɪər/",
      "translation": "bir mühendis"
    },
    "plural": {
      "form": "engineers",
      "phonetic": "/ˌen.dʒɪˈnɪərz/",
      "translation": "mühendisler"
    },
    "possessivePhrase": {
      "form": "a software engineer",
      "translation": "bir yazılım mühendisi"
    },
    "determinerPhrase": {
      "form": "our lead engineers",
      "translation": "bizim baş mühendislerimiz"
    }
  },
  {
    "id": "noun_141",
    "rank": 141,
    "word": "Environment",
    "phonetic": "/ɪnˈvaɪ.rən.mənt/",
    "translation": "Ortam / Çevre",
    "exampleEn": "Never push unverified code directly into the production environment.",
    "grammarNote": "",
    "exampleTr": "Doğrulanmamış kodu asla doğrudan canlı ortama göndermeyin.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an environment",
      "phonetic": "/ɪnˈvaɪ.rən.mənt/",
      "translation": "bir ortam"
    },
    "plural": {
      "form": "environments",
      "phonetic": "/ɪnˈvaɪ.rən.mənts/",
      "translation": "ortamlar"
    },
    "possessivePhrase": {
      "form": "the production environment",
      "translation": "canlı ortam"
    },
    "determinerPhrase": {
      "form": "this staging environment",
      "translation": "bu test ortamı"
    }
  },
  {
    "id": "noun_142",
    "rank": 142,
    "word": "Error",
    "phonetic": "/ˈer.ər/",
    "translation": "Hata / Yanılgı",
    "exampleEn": "The compiler caught a syntax error on line 42 of the script.",
    "grammarNote": "",
    "exampleTr": "Derleyici betiğin 42\\. satırında bir sözdizimi hatası yakaladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an error",
      "phonetic": "/ˈer.ər/",
      "translation": "bir hata"
    },
    "plural": {
      "form": "errors",
      "phonetic": "/ˈer.ərz/",
      "translation": "hatalar"
    },
    "possessivePhrase": {
      "form": "a syntax error",
      "translation": "bir sözdizimi hatası"
    },
    "determinerPhrase": {
      "form": "these runtime errors",
      "translation": "bu çalışma zamanı hataları"
    }
  },
  {
    "id": "noun_143",
    "rank": 143,
    "word": "Event",
    "phonetic": "/ɪˈvent/",
    "translation": "Etkinlik / Olay (Yazılımda)",
    "exampleEn": "We organized an interactive hackathon event for university developers.",
    "grammarNote": "",
    "exampleTr": "Üniversite geliştiricileri için etkileşimli bir hackathon etkinliği düzenledik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an event",
      "phonetic": "/ɪˈvent/",
      "translation": "bir etkinlik / olay"
    },
    "plural": {
      "form": "events",
      "phonetic": "/ɪˈvents/",
      "translation": "etkinlikler / olaylar"
    },
    "possessivePhrase": {
      "form": "a tech event",
      "translation": "bir teknoloji etkinliği"
    },
    "determinerPhrase": {
      "form": "these asynchronous events",
      "translation": "bu eşzamansız olaylar"
    }
  },
  {
    "id": "noun_144",
    "rank": 144,
    "word": "Example",
    "phonetic": "/ɪɡˈzɑːm.pəl/",
    "translation": "Örnek",
    "exampleEn": "The tutorial provides practical code examples for each grammar concept.",
    "grammarNote": "",
    "exampleTr": "Öğretici, her gramer kavramı için pratik kod örnekleri sağlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an example",
      "phonetic": "/ɪɡˈzɑːm.pəl/",
      "translation": "bir örnek"
    },
    "plural": {
      "form": "examples",
      "phonetic": "/ɪɡˈzɑːm.pəlz/",
      "translation": "örnekler"
    },
    "possessivePhrase": {
      "form": "a clear example",
      "translation": "net bir örnek"
    },
    "determinerPhrase": {
      "form": "these code examples",
      "translation": "bu kod örnekleri"
    }
  },
  {
    "id": "noun_145",
    "rank": 145,
    "word": "Experience",
    "phonetic": "/ɪkˈspɪə.ri.əns/",
    "translation": "Deneyim / Tecrübe",
    "exampleEn": "He has four years of hands-on experience in full-stack web development.",
    "grammarNote": "",
    "exampleTr": "Tam yığın web geliştirmede dört yıllık uygulamalı deneyime sahiptir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "experience",
      "phonetic": "/ɪkˈspɪə.ri.əns/",
      "translation": "deneyim"
    },
    "partitiveUnit": {
      "form": "five years of experience",
      "translation": "beş yıllık deneyim"
    },
    "possessivePhrase": {
      "form": "user experience (UX)",
      "translation": "kullanıcı deneyimi"
    },
    "determinerPhrase": {
      "form": "this professional experience",
      "translation": "bu profesyonel deneyim"
    }
  },
  {
    "id": "noun_146",
    "rank": 146,
    "word": "Face",
    "phonetic": "/feɪs/",
    "translation": "Yüz / Çehre",
    "exampleEn": "Our computer vision algorithm detects human faces with high accuracy.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarlı görü algoritmamız insan yüzlerini yüksek doğrulukla tespit eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a face",
      "phonetic": "/feɪs/",
      "translation": "bir yüz"
    },
    "plural": {
      "form": "faces",
      "phonetic": "/ˈfeɪ.sɪz/",
      "translation": "yüzler"
    },
    "possessivePhrase": {
      "form": "face detection",
      "translation": "yüz tespiti"
    },
    "determinerPhrase": {
      "form": "this human face",
      "translation": "bu insan yüzü"
    }
  },
  {
    "id": "noun_147",
    "rank": 147,
    "word": "Fact",
    "phonetic": "/fækt/",
    "translation": "Gerçek / Olgu",
    "exampleEn": "It is an established fact that automated tests reduce software bugs.",
    "grammarNote": "",
    "exampleTr": "Otomatik testlerin yazılım hatalarını azalttığı kanıtlanmış bir gerçektir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a fact",
      "phonetic": "/fækt/",
      "translation": "bir gerçek"
    },
    "plural": {
      "form": "facts",
      "phonetic": "/fækts/",
      "translation": "gerçekler"
    },
    "possessivePhrase": {
      "form": "an empirical fact",
      "translation": "ampirik bir gerçek"
    },
    "determinerPhrase": {
      "form": "these interesting facts",
      "translation": "bu ilginç gerçekler"
    }
  },
  {
    "id": "noun_148",
    "rank": 148,
    "word": "Feature",
    "phonetic": "/ˈfiː.tʃər/",
    "translation": "Özellik / Nitelik",
    "exampleEn": "We deployed an AI-assisted recipe recommendation feature to SnapChef.",
    "grammarNote": "",
    "exampleTr": "SnapChef'e yapay zeka destekli bir tarif öneri özelliği yayına aldık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a feature",
      "phonetic": "/ˈfiː.tʃər/",
      "translation": "bir özellik"
    },
    "plural": {
      "form": "features",
      "phonetic": "/ˈfiː.tʃərz/",
      "translation": "özellikler"
    },
    "possessivePhrase": {
      "form": "a new feature",
      "translation": "yeni bir özellik"
    },
    "determinerPhrase": {
      "form": "these advanced features",
      "translation": "bu gelişmiş özellikler"
    }
  },
  {
    "id": "noun_149",
    "rank": 149,
    "word": "Fee",
    "phonetic": "/fiː/",
    "translation": "Ücret / Harç",
    "exampleEn": "PayTR processes e-commerce payments with low transaction fees.",
    "grammarNote": "",
    "exampleTr": "PayTR e-ticaret ödemelerini düşük işlem ücretleriyle işler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a fee",
      "phonetic": "/fiː/",
      "translation": "bir ücret"
    },
    "plural": {
      "form": "fees",
      "phonetic": "/fiːz/",
      "translation": "ücretler"
    },
    "possessivePhrase": {
      "form": "the transaction fee",
      "translation": "işlem ücreti"
    },
    "determinerPhrase": {
      "form": "these maintenance fees",
      "translation": "bu bakım ücretleri"
    }
  },
  {
    "id": "noun_150",
    "rank": 150,
    "word": "Field",
    "phonetic": "/fiːld/",
    "translation": "Alan / Saha",
    "exampleEn": "Computer vision is one of the fastest growing fields in computer science.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarlı görü, bilgisayar bilimlerinde en hızlı büyüyen alanlardan biridir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a field",
      "phonetic": "/fiːld/",
      "translation": "bir alan"
    },
    "plural": {
      "form": "fields",
      "phonetic": "/fiːldz/",
      "translation": "alanlar"
    },
    "possessivePhrase": {
      "form": "the AI field",
      "translation": "yapay zeka alanı"
    },
    "determinerPhrase": {
      "form": "this input field",
      "translation": "bu girdi alanı"
    }
  },
  {
    "id": "noun_151",
    "rank": 151,
    "word": "Floor",
    "phonetic": "/flɔːr/",
    "translation": "Zemin / Kat",
    "exampleEn": "Our software development office is on the third floor of Teknokent.",
    "grammarNote": "",
    "exampleTr": "Yazılım geliştirme ofisimiz Teknokent'in üçüncü katındadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a floor",
      "phonetic": "/flɔːr/",
      "translation": "bir kat / zemin"
    },
    "plural": {
      "form": "floors",
      "phonetic": "/flɔːrz/",
      "translation": "katlar"
    },
    "possessivePhrase": {
      "form": "the third floor",
      "translation": "üçüncü kat"
    },
    "determinerPhrase": {
      "form": "the ground floor",
      "translation": "zemin kat"
    }
  },
  {
    "id": "noun_152",
    "rank": 152,
    "word": "Forest",
    "phonetic": "/ˈfɒr.ɪst/",
    "translation": "Orman",
    "exampleEn": "We hiked through the dense pine forest during our nature trip to Bolu.",
    "grammarNote": "",
    "exampleTr": "Bolu doğa gezimiz sırasında yoğun çam ormanının içinden yürüdük.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a forest",
      "phonetic": "/ˈfɒr.ɪst/",
      "translation": "bir orman"
    },
    "plural": {
      "form": "forests",
      "phonetic": "/ˈfɒr.ɪsts/",
      "translation": "ormanlar"
    },
    "possessivePhrase": {
      "form": "the green forest",
      "translation": "yeşil orman"
    },
    "determinerPhrase": {
      "form": "these dense forests",
      "translation": "bu yoğun ormanlar"
    }
  },
  {
    "id": "noun_153",
    "rank": 153,
    "word": "Form",
    "phonetic": "/fɔːm/",
    "translation": "Form / Biçim",
    "exampleEn": "Please fill out the electronic visa application form carefully.",
    "grammarNote": "",
    "exampleTr": "Lütfen elektronik vize başvuru formunu dikkatlice doldurunuz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a form",
      "phonetic": "/fɔːm/",
      "translation": "bir form"
    },
    "plural": {
      "form": "forms",
      "phonetic": "/fɔːmz/",
      "translation": "formlar"
    },
    "possessivePhrase": {
      "form": "the registration form",
      "translation": "kayıt formu"
    },
    "determinerPhrase": {
      "form": "this electronic form",
      "translation": "bu elektronik form"
    }
  },
  {
    "id": "noun_154",
    "rank": 154,
    "word": "Framework",
    "phonetic": "/ˈfreɪm.wɜːk/",
    "translation": "Çatı / Altyapı",
    "exampleEn": "React and Next.js are the most popular frameworks for web development.",
    "grammarNote": "",
    "exampleTr": "React ve Next.js web geliştirme için en popüler çatılardır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a framework",
      "phonetic": "/ˈfreɪm.wɜːk/",
      "translation": "bir çatı"
    },
    "plural": {
      "form": "frameworks",
      "phonetic": "/ˈfreɪm.wɜːks/",
      "translation": "çatılar"
    },
    "possessivePhrase": {
      "form": "our web framework",
      "translation": "bizim web çatımız"
    },
    "determinerPhrase": {
      "form": "these modern frameworks",
      "translation": "bu modern çatılar"
    }
  },
  {
    "id": "noun_155",
    "rank": 155,
    "word": "Girl",
    "phonetic": "/ɡɜːl/",
    "translation": "Kız çocuk",
    "exampleEn": "The girl won first prize in the national high school robotics competition.",
    "grammarNote": "",
    "exampleTr": "Kız öğrenci ulusal lise robotik yarışmasında birincilik ödülü kazandı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a girl",
      "phonetic": "/ɡɜːl/",
      "translation": "bir kız çocuk"
    },
    "plural": {
      "form": "girls",
      "phonetic": "/ɡɜːlz/",
      "translation": "kızlar"
    },
    "possessivePhrase": {
      "form": "that young girl",
      "translation": "şu genç kız"
    },
    "determinerPhrase": {
      "form": "these smart girls",
      "translation": "bu akıllı kızlar"
    }
  },
  {
    "id": "noun_156",
    "rank": 156,
    "word": "Group",
    "phonetic": "/ɡruːp/",
    "translation": "Grup / Topluluk",
    "exampleEn": "We formed a study group to practice spoken English and vocabulary.",
    "grammarNote": "",
    "exampleTr": "Konuşma İngilizcesi ve kelime pratiği yapmak için bir çalışma grubu kurduk.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a group",
      "phonetic": "/ɡruːp/",
      "translation": "bir grup"
    },
    "plural": {
      "form": "groups",
      "phonetic": "/ɡruːps/",
      "translation": "gruplar"
    },
    "possessivePhrase": {
      "form": "our study group",
      "translation": "bizim çalışma grubumuz"
    },
    "determinerPhrase": {
      "form": "these user groups",
      "translation": "bu kullanıcı grupları"
    }
  },
  {
    "id": "noun_157",
    "rank": 157,
    "word": "Hand",
    "phonetic": "/hænd/",
    "translation": "El",
    "exampleEn": "Never touch exposed electrical circuits with wet hands.",
    "grammarNote": "",
    "exampleTr": "Açıkta kalan elektrik devrelerine asla ıslak ellerle dokunmayın.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a hand",
      "phonetic": "/hænd/",
      "translation": "bir el"
    },
    "plural": {
      "form": "hands",
      "phonetic": "/hændz/",
      "translation": "eller"
    },
    "possessivePhrase": {
      "form": "my left hand",
      "translation": "benim sol elim"
    },
    "determinerPhrase": {
      "form": "both hands",
      "translation": "her iki el"
    }
  },
  {
    "id": "noun_158",
    "rank": 158,
    "word": "Head",
    "phonetic": "/hed/",
    "translation": "Baş / Kafa / Lider",
    "exampleEn": "She was appointed as the new head of the cybersecurity department.",
    "grammarNote": "",
    "exampleTr": "O, siber güvenlik departmanının yeni başkanı olarak atandı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a head",
      "phonetic": "/hed/",
      "translation": "bir baş / lider"
    },
    "plural": {
      "form": "heads",
      "phonetic": "/hedz/",
      "translation": "başlar / liderler"
    },
    "possessivePhrase": {
      "form": "the team head",
      "translation": "ekip lideri / başkanı"
    },
    "determinerPhrase": {
      "form": "head department",
      "translation": "ana departman"
    }
  },
  {
    "id": "noun_159",
    "rank": 159,
    "word": "Health",
    "phonetic": "/helθ/",
    "translation": "Sağlık",
    "exampleEn": "Regular exercise and adequate sleep are essential for good health.",
    "grammarNote": "",
    "exampleTr": "Düzenli egzersiz ve yeterli uyku iyi sağlık için gereklidir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "health",
      "phonetic": "/helθ/",
      "translation": "sağlık"
    },
    "partitiveUnit": {
      "form": "good health",
      "translation": "iyi sağlık"
    },
    "possessivePhrase": {
      "form": "mental health",
      "translation": "ruh sağlığı"
    },
    "determinerPhrase": {
      "form": "this public health",
      "translation": "bu halk sağlığı"
    }
  },
  {
    "id": "noun_160",
    "rank": 160,
    "word": "History",
    "phonetic": "/ˈhɪs.tər.i/",
    "translation": "Tarih / Geçmiş (Git log)",
    "exampleEn": "You can inspect the complete Git commit history using git log.",
    "grammarNote": "",
    "exampleTr": "Git log kullanarak tam Git commit geçmişini inceleyebilirsiniz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a history",
      "phonetic": "/ˈhɪs.tər.i/",
      "translation": "bir tarih / geçmiş"
    },
    "plural": {
      "form": "histories",
      "phonetic": "/ˈhɪs.tər.iz/",
      "translation": "tarihler"
    },
    "possessivePhrase": {
      "form": "the commit history",
      "translation": "commit geçmişi"
    },
    "determinerPhrase": {
      "form": "our browser history",
      "translation": "bizim tarayıcı geçmişimiz"
    }
  },
  {
    "id": "noun_161",
    "rank": 161,
    "word": "Idea",
    "phonetic": "/aɪˈdɪə/",
    "translation": "Fikir / Düşünce",
    "exampleEn": "He proposed a brilliant idea to optimize our database sharding.",
    "grammarNote": "",
    "exampleTr": "Veritabanı parçalamamızı optimize etmek için dahiyane bir fikir önerdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an idea",
      "phonetic": "/aɪˈdɪə/",
      "translation": "bir fikir"
    },
    "plural": {
      "form": "ideas",
      "phonetic": "/aɪˈdɪəz/",
      "translation": "fikirler"
    },
    "possessivePhrase": {
      "form": "a brilliant idea",
      "translation": "dahiyane bir fikir"
    },
    "determinerPhrase": {
      "form": "these startup ideas",
      "translation": "bu girişim fikirleri"
    }
  },
  {
    "id": "noun_162",
    "rank": 162,
    "word": "Image",
    "phonetic": "/ˈɪm.ɪdʒ/",
    "translation": "Resim / Görüntü",
    "exampleEn": "Our computer vision model processes high-resolution images in real time.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarlı görü modelimiz yüksek çözünürlüklü görüntüleri gerçek zamanlı işler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an image",
      "phonetic": "/ˈɪm.ɪdʒ/",
      "translation": "bir resim / görüntü"
    },
    "plural": {
      "form": "images",
      "phonetic": "/ˈɪm.ɪ.dʒɪz/",
      "translation": "resimler / görüntüler"
    },
    "possessivePhrase": {
      "form": "a high",
      "translation": "resolution image – yüksek çözünürlüklü bir resim"
    },
    "determinerPhrase": {
      "form": "these input images",
      "translation": "bu girdi görüntüleri"
    }
  },
  {
    "id": "noun_163",
    "rank": 163,
    "word": "Industry",
    "phonetic": "/ˈɪn.də.stri/",
    "translation": "Endüstri / Sanayi (Düzensiz -ies)",
    "exampleEn": "The software industry offers exceptional global career opportunities.",
    "grammarNote": "",
    "exampleTr": "Yazılım endüstrisi olağanüstü küresel kariyer fırsatları sunar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an industry",
      "phonetic": "/ˈɪn.də.stri/",
      "translation": "bir endüstri"
    },
    "plural": {
      "form": "industries",
      "phonetic": "/ˈɪn.də.striz/",
      "translation": "endüstriler"
    },
    "possessivePhrase": {
      "form": "the tech industry",
      "translation": "teknoloji endüstrisi"
    },
    "determinerPhrase": {
      "form": "these modern industries",
      "translation": "bu modern endüstriler"
    }
  },
  {
    "id": "noun_164",
    "rank": 164,
    "word": "Level",
    "phonetic": "/ˈlev.əl/",
    "translation": "Seviye / Düzey",
    "exampleEn": "This grammar lesson is designed for students at the A2 level.",
    "grammarNote": "",
    "exampleTr": "Bu gramer dersi A2 seviyesindeki öğrenciler için tasarlanmıştır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a level",
      "phonetic": "/ˈlev.əl/",
      "translation": "bir seviye"
    },
    "plural": {
      "form": "levels",
      "phonetic": "/ˈlev.əlz/",
      "translation": "seviyeler"
    },
    "possessivePhrase": {
      "form": "the CEFR level",
      "translation": "CEFR seviyesi"
    },
    "determinerPhrase": {
      "form": "these difficulty levels",
      "translation": "bu zorluk seviyeleri"
    }
  },
  {
    "id": "noun_165",
    "rank": 165,
    "word": "Library",
    "phonetic": "/ˈlaɪ.brər.i/",
    "translation": "Kütüphane (Yazılım / Bina)",
    "exampleEn": "I installed an open-source library to handle JSON serialization.",
    "grammarNote": "",
    "exampleTr": "JSON serileştirmesini yönetmek için açık kaynaklı bir kütüphane kurdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a library",
      "phonetic": "/ˈlaɪ.brər.i/",
      "translation": "bir kütüphane"
    },
    "plural": {
      "form": "libraries",
      "phonetic": "/ˈlaɪ.brər.iz/",
      "translation": "kütüphaneler"
    },
    "possessivePhrase": {
      "form": "an open",
      "translation": "source library – açık kaynaklı bir kütüphane"
    },
    "determinerPhrase": {
      "form": "the university library",
      "translation": "üniversite kütüphanesi"
    }
  },
  {
    "id": "noun_166",
    "rank": 166,
    "word": "Line",
    "phonetic": "/laɪn/",
    "translation": "Satır / Çizgi / Hat",
    "exampleEn": "There is an unexpected syntax error on line 58 of your script.",
    "grammarNote": "",
    "exampleTr": "Betiğinizin 58\\. satırında beklenmeyen bir sözdizimi hatası var.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a line",
      "phonetic": "/laɪn/",
      "translation": "bir satır"
    },
    "plural": {
      "form": "lines",
      "phonetic": "/laɪnz/",
      "translation": "satırlar"
    },
    "possessivePhrase": {
      "form": "a line of code",
      "translation": "bir satır kod"
    },
    "determinerPhrase": {
      "form": "these subway lines",
      "translation": "bu metro hatları"
    }
  },
  {
    "id": "noun_167",
    "rank": 167,
    "word": "List",
    "phonetic": "/lɪst/",
    "translation": "Liste",
    "exampleEn": "I created a structured vocabulary list for English learners.",
    "grammarNote": "",
    "exampleTr": "İngilizce öğrenenler için yapılandırılmış bir kelime listesi oluşturdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a list",
      "phonetic": "/lɪst/",
      "translation": "bir liste"
    },
    "plural": {
      "form": "lists",
      "phonetic": "/lɪsts/",
      "translation": "listeler"
    },
    "possessivePhrase": {
      "form": "the task list",
      "translation": "görev listesi"
    },
    "determinerPhrase": {
      "form": "these vocabulary lists",
      "translation": "bu kelime listeleri"
    }
  },
  {
    "id": "noun_168",
    "rank": 168,
    "word": "Manager",
    "phonetic": "/ˈmæn.ɪ.dʒər/",
    "translation": "Yönetici / Müdür",
    "exampleEn": "Our product manager scheduled the sprint review for tomorrow.",
    "grammarNote": "",
    "exampleTr": "Ürün yöneticimiz sprint değerlendirmesini yarına planladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a manager",
      "phonetic": "/ˈmæn.ɪ.dʒər/",
      "translation": "bir yönetici"
    },
    "plural": {
      "form": "managers",
      "phonetic": "/ˈmæn.ɪ.dʒərz/",
      "translation": "yöneticiler"
    },
    "possessivePhrase": {
      "form": "our product manager",
      "translation": "bizim ürün yöneticimiz"
    },
    "determinerPhrase": {
      "form": "these engineering managers",
      "translation": "bu mühendislik yöneticileri"
    }
  },
  {
    "id": "noun_169",
    "rank": 169,
    "word": "Man",
    "phonetic": "/mæn/",
    "translation": "Adam / Erkek (Düzensiz: men)",
    "exampleEn": "The man explained how to configure the Nginx web server.",
    "grammarNote": "",
    "exampleTr": "Adam Nginx web sunucusunun nasıl yapılandırılacağını açıkladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a man",
      "phonetic": "/mæn/",
      "translation": "bir adam"
    },
    "plural": {
      "form": "men",
      "phonetic": "/men/",
      "translation": "adamlar / erkekler"
    },
    "possessivePhrase": {
      "form": "that wise man",
      "translation": "şu bilge adam"
    },
    "determinerPhrase": {
      "form": "these young men",
      "translation": "bu genç adamlar"
    }
  },
  {
    "id": "noun_170",
    "rank": 170,
    "word": "Map",
    "phonetic": "/mæp/",
    "translation": "Harita",
    "exampleEn": "We integrated MapTiler and osmdroid into our Android traffic application.",
    "grammarNote": "",
    "exampleTr": "Android trafik uygulamamıza MapTiler ve osmdroid haritalarını entegre ettik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a map",
      "phonetic": "/mæp/",
      "translation": "bir harita"
    },
    "plural": {
      "form": "maps",
      "phonetic": "/mæps/",
      "translation": "haritalar"
    },
    "possessivePhrase": {
      "form": "the road map",
      "translation": "yol haritası"
    },
    "determinerPhrase": {
      "form": "these interactive maps",
      "translation": "bu etkileşimli haritalar"
    }
  },
  {
    "id": "noun_171",
    "rank": 171,
    "word": "Memory",
    "phonetic": "/ˈmem.ər.i/",
    "translation": "Bellek / Hafıza (Düzensiz -ies)",
    "exampleEn": "The server ran out of memory during the massive data migration.",
    "grammarNote": "",
    "exampleTr": "Büyük veri taşıması sırasında sunucunun belleği tükendi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a memory",
      "phonetic": "/ˈmem.ər.i/",
      "translation": "bir bellek / anı"
    },
    "plural": {
      "form": "memories",
      "phonetic": "/ˈmem.ər.iz/",
      "translation": "bellekler / anılar"
    },
    "possessivePhrase": {
      "form": "RAM memory",
      "translation": "RAM belleği"
    },
    "determinerPhrase": {
      "form": "these childhood memories",
      "translation": "bu çocukluk anıları"
    }
  },
  {
    "id": "noun_172",
    "rank": 172,
    "word": "Method",
    "phonetic": "/ˈmeθ.əd/",
    "translation": "Yöntem / Metot (Yazılımda)",
    "exampleEn": "The REST API uses the POST method to create new user records.",
    "grammarNote": "",
    "exampleTr": "REST API yeni kullanıcı kayıtları oluşturmak için POST metodunu kullanır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a method",
      "phonetic": "/ˈmeθ.əd/",
      "translation": "bir yöntem / metot"
    },
    "plural": {
      "form": "methods",
      "phonetic": "/ˈmeθ.ədz/",
      "translation": "yöntemler / metotlar"
    },
    "possessivePhrase": {
      "form": "an HTTP method",
      "translation": "bir HTTP metodu"
    },
    "determinerPhrase": {
      "form": "these testing methods",
      "translation": "bu test yöntemleri"
    }
  },
  {
    "id": "noun_173",
    "rank": 173,
    "word": "Model",
    "phonetic": "/ˈmɒd.əl/",
    "translation": "Model (Makine Öğrenmesi)",
    "exampleEn": "Our deep learning model achieved 95% accuracy on the test dataset.",
    "grammarNote": "",
    "exampleTr": "Derin öğrenme modelimiz test veri setinde %95 doğruluğa ulaştı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a model",
      "phonetic": "/ˈmɒd.əl/",
      "translation": "bir model"
    },
    "plural": {
      "form": "models",
      "phonetic": "/ˈmɒd.əlz/",
      "translation": "modeller"
    },
    "possessivePhrase": {
      "form": "the deep learning model",
      "translation": "derin öğrenme modeli"
    },
    "determinerPhrase": {
      "form": "these AI models",
      "translation": "bu yapay zeka modelleri"
    }
  },
  {
    "id": "noun_174",
    "rank": 174,
    "word": "Name",
    "phonetic": "/neɪm/",
    "translation": "İsim / Ad",
    "exampleEn": "Please configure the DNS records for your custom domain name.",
    "grammarNote": "",
    "exampleTr": "Lütfen özel alan adınız için DNS kayıtlarını yapılandırınız.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a name",
      "phonetic": "/neɪm/",
      "translation": "bir isim"
    },
    "plural": {
      "form": "names",
      "phonetic": "/neɪmz/",
      "translation": "isimler"
    },
    "possessivePhrase": {
      "form": "my full name",
      "translation": "benim tam adım"
    },
    "determinerPhrase": {
      "form": "this domain name",
      "translation": "bu alan adı (domain)"
    }
  },
  {
    "id": "noun_175",
    "rank": 175,
    "word": "Nature",
    "phonetic": "/ˈneɪ.tʃər/",
    "translation": "Doğa / Tabiat",
    "exampleEn": "I enjoy walking in nature to clear my mind after coding.",
    "grammarNote": "",
    "exampleTr": "Kod yazdıktan sonra zihnimi boşaltmak için doğada yürümekten keyif alırım.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "nature",
      "phonetic": "/ˈneɪ.tʃər/",
      "translation": "doğa"
    },
    "partitiveUnit": {
      "form": "human nature",
      "translation": "insan doğası"
    },
    "possessivePhrase": {
      "form": "the beauty of nature",
      "translation": "doğanın güzelliği"
    },
    "determinerPhrase": {
      "form": "this wild nature",
      "translation": "bu vahşi doğa"
    }
  },
  {
    "id": "noun_176",
    "rank": 176,
    "word": "Network",
    "phonetic": "/ˈnet.wɜːk/",
    "translation": "Ağ / Şebeke",
    "exampleEn": "Our neural network processes real-time traffic camera video feeds.",
    "grammarNote": "",
    "exampleTr": "Yapay sinir ağımız gerçek zamanlı trafik kamerası video akışlarını işler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a network",
      "phonetic": "/ˈnet.wɜːk/",
      "translation": "bir ağ"
    },
    "plural": {
      "form": "networks",
      "phonetic": "/ˈnet.wɜːks/",
      "translation": "ağlar"
    },
    "possessivePhrase": {
      "form": "the neural network",
      "translation": "yapay sinir ağı"
    },
    "determinerPhrase": {
      "form": "these distributed networks",
      "translation": "bu dağıtık ağlar"
    }
  },
  {
    "id": "noun_177",
    "rank": 177,
    "word": "Number",
    "phonetic": "/ˈnʌm.bər/",
    "translation": "Sayı / Numara",
    "exampleEn": "Enter your phone number to receive a two-factor verification code.",
    "grammarNote": "",
    "exampleTr": "İki faktörlü doğrulama kodunu almak için telefon numaranızı giriniz.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a number",
      "phonetic": "/ˈnʌm.bər/",
      "translation": "bir sayı / numara"
    },
    "plural": {
      "form": "numbers",
      "phonetic": "/ˈnʌm.bərz/",
      "translation": "sayılar / numaralar"
    },
    "possessivePhrase": {
      "form": "a phone number",
      "translation": "bir telefon numarası"
    },
    "determinerPhrase": {
      "form": "these version numbers",
      "translation": "bu sürüm numaraları"
    }
  },
  {
    "id": "noun_178",
    "rank": 178,
    "word": "Order",
    "phonetic": "/ˈɔː.dər/",
    "translation": "Sipariş / Sıralama / Düzen",
    "exampleEn": "Our e-commerce system processed over five hundred orders today.",
    "grammarNote": "",
    "exampleTr": "E-ticaret sistemimiz bugün beş yüzden fazla siparişi işledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an order",
      "phonetic": "/ˈɔː.dər/",
      "translation": "bir sipariş / düzen"
    },
    "plural": {
      "form": "orders",
      "phonetic": "/ˈɔː.dərz/",
      "translation": "siparişler"
    },
    "possessivePhrase": {
      "form": "an online order",
      "translation": "çevrim içi bir sipariş"
    },
    "determinerPhrase": {
      "form": "these customer orders",
      "translation": "bu müşteri siparişleri"
    }
  },
  {
    "id": "noun_179",
    "rank": 179,
    "word": "Page",
    "phonetic": "/peɪdʒ/",
    "translation": "Sayfa",
    "exampleEn": "The landing page loaded in under one second on mobile devices.",
    "grammarNote": "",
    "exampleTr": "Açılış sayfası mobil cihazlarda bir saniyenin altında yüklendi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a page",
      "phonetic": "/peɪdʒ/",
      "translation": "bir sayfa"
    },
    "plural": {
      "form": "pages",
      "phonetic": "/ˈpeɪ.dʒɪz/",
      "translation": "sayfalar"
    },
    "possessivePhrase": {
      "form": "the landing page",
      "translation": "açılış sayfası"
    },
    "determinerPhrase": {
      "form": "these web pages",
      "translation": "bu web sayfaları"
    }
  },
  {
    "id": "noun_180",
    "rank": 180,
    "word": "Paper",
    "phonetic": "/ˈpeɪ.pər/",
    "translation": "Kağıt / Akademik Makale",
    "exampleEn": "Our research paper on DeepFake detection was published in a journal.",
    "grammarNote": "",
    "exampleTr": "DeepFake tespiti üzerine olan araştırma makalemiz bir dergide yayınlandı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a paper",
      "phonetic": "/ˈpeɪ.pər/",
      "translation": "bir makale / kağıt"
    },
    "plural": {
      "form": "papers",
      "phonetic": "/ˈpeɪ.pərz/",
      "translation": "makaleler / kağıtlar"
    },
    "possessivePhrase": {
      "form": "a research paper",
      "translation": "bir araştırma makalesi"
    },
    "determinerPhrase": {
      "form": "this academic paper",
      "translation": "bu akademik makale"
    }
  },
  {
    "id": "noun_181",
    "rank": 181,
    "word": "Parent",
    "phonetic": "/ˈpeə.rənt/",
    "translation": "Ebeveyn (Anne/Baba)",
    "exampleEn": "My parents supported me throughout my engineering education.",
    "grammarNote": "",
    "exampleTr": "Mühendislik eğitimim boyunca ailem beni destekledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a parent",
      "phonetic": "/ˈpeə.rənt/",
      "translation": "bir ebeveyn"
    },
    "plural": {
      "form": "parents",
      "phonetic": "/ˈpeə.rənts/",
      "translation": "ebeveynler / aile"
    },
    "possessivePhrase": {
      "form": "my supportive parents",
      "translation": "benim destekleyici ailem"
    },
    "determinerPhrase": {
      "form": "these proud parents",
      "translation": "bu gururlu ebeveynler"
    }
  },
  {
    "id": "noun_182",
    "rank": 182,
    "word": "Part",
    "phonetic": "/pɑːt/",
    "translation": "Parça / Bölüm",
    "exampleEn": "This is the most critical part of our system architecture.",
    "grammarNote": "",
    "exampleTr": "Bu sistem mimarimizin en kritik parçasıdır / bölümüdür.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a part",
      "phonetic": "/pɑːt/",
      "translation": "bir parça"
    },
    "plural": {
      "form": "parts",
      "phonetic": "/pɑːts/",
      "translation": "parçalar"
    },
    "possessivePhrase": {
      "form": "the frontend part",
      "translation": "ön yüz bölümü"
    },
    "determinerPhrase": {
      "form": "these spare parts",
      "translation": "bu yedek parçalar"
    }
  },
  {
    "id": "noun_183",
    "rank": 183,
    "word": "Person",
    "phonetic": "/ˈpɜː.sən/",
    "translation": "Kişi (Düzensiz çoğul: people)",
    "exampleEn": "I am a morning person who likes starting work at 7 AM.",
    "grammarNote": "",
    "exampleTr": "Sabah saat 7'de işe başlamayı seven bir sabah insanıyım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a person",
      "phonetic": "/ˈpɜː.sən/",
      "translation": "bir kişi"
    },
    "plural": {
      "form": "people",
      "phonetic": "/ˈpiː.pəl/",
      "translation": "insanlar / kişiler"
    },
    "possessivePhrase": {
      "form": "a morning person",
      "translation": "sabah insanı"
    },
    "determinerPhrase": {
      "form": "these talented people",
      "translation": "bu yetenekli insanlar"
    }
  },
  {
    "id": "noun_184",
    "rank": 184,
    "word": "Picture",
    "phonetic": "/ˈpɪk.tʃər/",
    "translation": "Resim / Fotoğraf",
    "exampleEn": "The mobile camera captured a high-resolution picture of the label.",
    "grammarNote": "",
    "exampleTr": "Mobil kamera etiketin yüksek çözünürlüklü bir fotoğrafını çekti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a picture",
      "phonetic": "/ˈpɪk.tʃər/",
      "translation": "bir resim"
    },
    "plural": {
      "form": "pictures",
      "phonetic": "/ˈpɪk.tʃərz/",
      "translation": "resimler"
    },
    "possessivePhrase": {
      "form": "a clear picture",
      "translation": "net bir resim"
    },
    "determinerPhrase": {
      "form": "these digital pictures",
      "translation": "bu dijital resimler"
    }
  },
  {
    "id": "noun_185",
    "rank": 185,
    "word": "Piece",
    "phonetic": "/piːs/",
    "translation": "Parça / Tane",
    "exampleEn": "He gave me a valuable piece of advice regarding code reviews.",
    "grammarNote": "",
    "exampleTr": "Kod incelemeleri konusunda bana değerli bir tavsiye verdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a piece",
      "phonetic": "/piːs/",
      "translation": "bir parça"
    },
    "plural": {
      "form": "pieces",
      "phonetic": "/ˈpiː.sɪz/",
      "translation": "parçalar"
    },
    "possessivePhrase": {
      "form": "a piece of advice",
      "translation": "bir tavsiye"
    },
    "determinerPhrase": {
      "form": "these puzzle pieces",
      "translation": "bu yapboz parçaları"
    }
  },
  {
    "id": "noun_186",
    "rank": 186,
    "word": "Plan",
    "phonetic": "/plæn/",
    "translation": "Plan",
    "exampleEn": "We have a detailed plan to launch the new feature next sprint.",
    "grammarNote": "",
    "exampleTr": "Yeni özelliği gelecek sprint yayına almak için detaylı bir planımız var.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a plan",
      "phonetic": "/plæn/",
      "translation": "bir plan"
    },
    "plural": {
      "form": "plans",
      "phonetic": "/plænz/",
      "translation": "planlar"
    },
    "possessivePhrase": {
      "form": "our roadmap plan",
      "translation": "bizim yol haritası planımız"
    },
    "determinerPhrase": {
      "form": "these strategic plans",
      "translation": "bu stratejik planlar"
    }
  },
  {
    "id": "noun_187",
    "rank": 187,
    "word": "Platform",
    "phonetic": "/ˈplæt.fɔːm/",
    "translation": "Platform / Ortam",
    "exampleEn": "We built CepTakvim as a full-stack appointment scheduling platform.",
    "grammarNote": "",
    "exampleTr": "CepTakvim'i tam yığın bir randevu planlama platformu olarak inşa ettik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a platform",
      "phonetic": "/ˈplæt.fɔːm/",
      "translation": "bir platform"
    },
    "plural": {
      "form": "platforms",
      "phonetic": "/ˈplæt.fɔːmz/",
      "translation": "platformlar"
    },
    "possessivePhrase": {
      "form": "our web platform",
      "translation": "bizim web platformumuz"
    },
    "determinerPhrase": {
      "form": "these cross platforms",
      "translation": "bu platformlar arası yapılar"
    }
  },
  {
    "id": "noun_188",
    "rank": 188,
    "word": "Policy",
    "phonetic": "/ˈpɒl.ə.si/",
    "translation": "Politika / Kural (Düzensiz -ies)",
    "exampleEn": "The company updated its data privacy policy to comply with GDPR.",
    "grammarNote": "",
    "exampleTr": "Şirket GDPR'a uyum sağlamak için veri gizliliği politikasını güncelledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a policy",
      "phonetic": "/ˈpɒl.ə.si/",
      "translation": "bir politika"
    },
    "plural": {
      "form": "policies",
      "phonetic": "/ˈpɒl.ə.siz/",
      "translation": "politikalar"
    },
    "possessivePhrase": {
      "form": "the privacy policy",
      "translation": "gizlilik politikası"
    },
    "determinerPhrase": {
      "form": "these security policies",
      "translation": "bu güvenlik politikaları"
    }
  },
  {
    "id": "noun_189",
    "rank": 189,
    "word": "Power",
    "phonetic": "/paʊər/",
    "translation": "Güç / Elektrik Gücü",
    "exampleEn": "Training large language models requires immense computing power.",
    "grammarNote": "",
    "exampleTr": "Büyük dil modellerini eğitmek muazzam bir hesaplama gücü gerektirir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "power",
      "phonetic": "/paʊər/",
      "translation": "güç"
    },
    "partitiveUnit": {
      "form": "processing power",
      "translation": "işlem gücü"
    },
    "possessivePhrase": {
      "form": "solar power",
      "translation": "güneş enerjisi"
    },
    "determinerPhrase": {
      "form": "this computing power",
      "translation": "bu hesaplama gücü"
    }
  },
  {
    "id": "noun_190",
    "rank": 190,
    "word": "Product",
    "phonetic": "/ˈprɒd.ʌkt/",
    "translation": "Ürün",
    "exampleEn": "Our e-commerce store özkan3d sells customized 3D printed products.",
    "grammarNote": "",
    "exampleTr": "E-ticaret mağazamız özkan3d özelleştirilmiş 3D baskılı ürünler satmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a product",
      "phonetic": "/ˈprɒd.ʌkt/",
      "translation": "bir ürün"
    },
    "plural": {
      "form": "products",
      "phonetic": "/ˈprɒd.ʌkts/",
      "translation": "ürünler"
    },
    "possessivePhrase": {
      "form": "a digital product",
      "translation": "dijital bir ürün"
    },
    "determinerPhrase": {
      "form": "these 3D printed products",
      "translation": "bu 3D baskılı ürünler"
    }
  },
  {
    "id": "noun_191",
    "rank": 191,
    "word": "Reason",
    "phonetic": "/ˈriː.zən/",
    "translation": "Sebep / Neden",
    "exampleEn": "Network latency was the primary reason for the slow page load.",
    "grammarNote": "",
    "exampleTr": "Ağ gecikmesi yavaş sayfa yüklemesinin birincil sebebiydi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a reason",
      "phonetic": "/ˈriː.zən/",
      "translation": "bir sebep"
    },
    "plural": {
      "form": "reasons",
      "phonetic": "/ˈriː.zənz/",
      "translation": "sebepler"
    },
    "possessivePhrase": {
      "form": "the main reason",
      "translation": "ana sebep"
    },
    "determinerPhrase": {
      "form": "these valid reasons",
      "translation": "bu geçerli sebepler"
    }
  },
  {
    "id": "noun_192",
    "rank": 192,
    "word": "Record",
    "phonetic": "/ˈrek.ɔːd/",
    "translation": "Kayıt / Sicil",
    "exampleEn": "The SQL query fetched ten thousand database records in 20 milliseconds.",
    "grammarNote": "",
    "exampleTr": "SQL sorgusu 20 milisaniyede on bin veritabanı kaydını getirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a record",
      "phonetic": "/ˈrek.ɔːd/",
      "translation": "bir kayıt"
    },
    "plural": {
      "form": "records",
      "phonetic": "/ˈrek.ɔːdz/",
      "translation": "kayıtlar"
    },
    "possessivePhrase": {
      "form": "a user record",
      "translation": "bir kullanıcı kaydı"
    },
    "determinerPhrase": {
      "form": "these database records",
      "translation": "bu veritabanı kayıtları"
    }
  },
  {
    "id": "noun_193",
    "rank": 193,
    "word": "Report",
    "phonetic": "/rɪˈpɔːt/",
    "translation": "Rapor",
    "exampleEn": "I submitted the final engineering thesis report to my professor.",
    "grammarNote": "",
    "exampleTr": "Nihai mühendislik tez raporunu profesörüme sundum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a report",
      "phonetic": "/rɪˈpɔːt/",
      "translation": "bir rapor"
    },
    "plural": {
      "form": "reports",
      "phonetic": "/rɪˈpɔːts/",
      "translation": "raporlar"
    },
    "possessivePhrase": {
      "form": "the bug report",
      "translation": "hata raporu"
    },
    "determinerPhrase": {
      "form": "these analytics reports",
      "translation": "bu analiz raporları"
    }
  },
  {
    "id": "noun_194",
    "rank": 194,
    "word": "Request",
    "phonetic": "/rɪˈkwest/",
    "translation": "İstek / Talep (HTTP İsteği)",
    "exampleEn": "The web server handled five thousand concurrent requests per second.",
    "grammarNote": "",
    "exampleTr": "Web sunucusu saniyede beş bin eşzamanlı isteği yönetti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a request",
      "phonetic": "/rɪˈkwest/",
      "translation": "bir istek"
    },
    "plural": {
      "form": "requests",
      "phonetic": "/rɪˈkwests/",
      "translation": "istekler"
    },
    "possessivePhrase": {
      "form": "an HTTP request",
      "translation": "bir HTTP isteği"
    },
    "determinerPhrase": {
      "form": "these pull requests",
      "translation": "bu çekme istekleri (PR)"
    }
  },
  {
    "id": "noun_195",
    "rank": 195,
    "word": "Response",
    "phonetic": "/rɪˈspɒns/",
    "translation": "Yanıt / Cevap (API Yanıtı)",
    "exampleEn": "The REST API returned a successful JSON response with a 200 OK status.",
    "grammarNote": "",
    "exampleTr": "REST API 200 OK durumuyla başarılı bir JSON yanıtı döndürdü.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a response",
      "phonetic": "/rɪˈspɒns/",
      "translation": "bir yanıt"
    },
    "plural": {
      "form": "responses",
      "phonetic": "/rɪˈspɒn.sɪz/",
      "translation": "yanıtlar"
    },
    "possessivePhrase": {
      "form": "the JSON response",
      "translation": "JSON yanıtı"
    },
    "determinerPhrase": {
      "form": "these fast responses",
      "translation": "bu hızlı yanıtlar"
    }
  },
  {
    "id": "noun_196",
    "rank": 196,
    "word": "Result",
    "phonetic": "/rɪˈzʌlt/",
    "translation": "Sonuç",
    "exampleEn": "The benchmark results proved that our query optimization was successful.",
    "grammarNote": "",
    "exampleTr": "Performans testi sonuçları sorgu optimizasyonumuzun başarılı olduğunu kanıtladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a result",
      "phonetic": "/rɪˈzʌlt/",
      "translation": "bir sonuç"
    },
    "plural": {
      "form": "results",
      "phonetic": "/rɪˈzʌlts/",
      "translation": "sonuçlar"
    },
    "possessivePhrase": {
      "form": "the benchmark result",
      "translation": "performans testi sonucu"
    },
    "determinerPhrase": {
      "form": "these search results",
      "translation": "bu arama sonuçları"
    }
  },
  {
    "id": "noun_197",
    "rank": 197,
    "word": "Security",
    "phonetic": "/sɪˈkjʊə.rə.ti/",
    "translation": "Güvenlik",
    "exampleEn": "Data security is our top priority in cloud infrastructure development.",
    "grammarNote": "",
    "exampleTr": "Bulut altyapısı geliştirmede veri güvenliği en yüksek önceliğimizdir.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "security",
      "phonetic": "/sɪˈkjʊə.rə.ti/",
      "translation": "güvenlik"
    },
    "partitiveUnit": {
      "form": "cyber security",
      "translation": "siber güvenlik"
    },
    "possessivePhrase": {
      "form": "network security",
      "translation": "ağ güvenliği"
    },
    "determinerPhrase": {
      "form": "this data security",
      "translation": "bu veri güvenliği"
    }
  },
  {
    "id": "noun_198",
    "rank": 198,
    "word": "Service",
    "phonetic": "/ˈsɜː.vɪs/",
    "translation": "Servis / Hizmet",
    "exampleEn": "We decoupled the authentication service from the main application.",
    "grammarNote": "",
    "exampleTr": "Kimlik doğrulama servisini ana uygulamadan ayırdık (decouple ettik).",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a service",
      "phonetic": "/ˈsɜː.vɪs/",
      "translation": "bir servis / hizmet"
    },
    "plural": {
      "form": "services",
      "phonetic": "/ˈsɜː.vɪ.sɪz/",
      "translation": "servisler / hizmetler"
    },
    "possessivePhrase": {
      "form": "a microservice",
      "translation": "bir mikroservis"
    },
    "determinerPhrase": {
      "form": "these cloud services",
      "translation": "bu bulut servisleri"
    }
  },
  {
    "id": "noun_199",
    "rank": 199,
    "word": "System",
    "phonetic": "/ˈsɪs.təm/",
    "translation": "Sistem / Düzen",
    "exampleEn": "We prototyped an intelligent traffic management system called GÖZCÜ.",
    "grammarNote": "",
    "exampleTr": "GÖZCÜ adında akıllı bir trafik yönetim sistemi prototipledik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a system",
      "phonetic": "/ˈsɪs.təm/",
      "translation": "bir sistem"
    },
    "plural": {
      "form": "systems",
      "phonetic": "/ˈsɪs.təmz/",
      "translation": "sistemler"
    },
    "possessivePhrase": {
      "form": "an operating system",
      "translation": "bir işletim sistemi"
    },
    "determinerPhrase": {
      "form": "these embedded systems",
      "translation": "bu gömülü sistemler"
    }
  },
  {
    "id": "noun_200",
    "rank": 200,
    "word": "User",
    "phonetic": "/ˈjuː.zər/",
    "translation": "Kullanıcı",
    "exampleEn": "Our application authenticated over fifty thousand users this week.",
    "grammarNote": "",
    "exampleTr": "Uygulamamız bu hafta elli binden fazla kullanıcının kimliğini doğruladı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a user",
      "phonetic": "/ˈjuː.zər/",
      "translation": "bir kullanıcı"
    },
    "plural": {
      "form": "users",
      "phonetic": "/ˈjuː.zərz/",
      "translation": "kullanıcılar"
    },
    "possessivePhrase": {
      "form": "an active user",
      "translation": "aktif bir kullanıcı"
    },
    "determinerPhrase": {
      "form": "these mobile users",
      "translation": "bu mobil kullanıcılar"
    }
  }
] as LibraryWordEntry[];

export const NOUNS_300: LibraryWordEntry[] = [
  {
    "id": "noun_201",
    "rank": 201,
    "word": "Ability",
    "phonetic": "/əˈbɪl.ə.ti/",
    "translation": "Yetenek / Kabiliyet (Düzensiz -ies)",
    "exampleEn": "His ability to optimize complex algorithms impressed the technical lead.",
    "grammarNote": "",
    "exampleTr": "Karmaşık algoritmaları optimize etme yeteneği teknik lideri etkiledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an ability",
      "phonetic": "/əˈbɪl.ə.ti/",
      "translation": "bir yetenek"
    },
    "plural": {
      "form": "abilities",
      "phonetic": "/əˈbɪl.ə.tiz/",
      "translation": "yetenekler"
    },
    "possessivePhrase": {
      "form": "his technical ability",
      "translation": "onun teknik yeteneği"
    },
    "determinerPhrase": {
      "form": "this coding ability",
      "translation": "bu kodlama yeteneği"
    }
  },
  {
    "id": "noun_202",
    "rank": 202,
    "word": "Action",
    "phonetic": "/ˈæk.ʃən/",
    "translation": "Eylem / Hareket",
    "exampleEn": "Every user action on the screen triggers an asynchronous UI event.",
    "grammarNote": "",
    "exampleTr": "Ekrandaki her kullanıcı eylemi eşzamansız bir arayüz olayını tetikler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an action",
      "phonetic": "/ˈæk.ʃən/",
      "translation": "bir eylem"
    },
    "plural": {
      "form": "actions",
      "phonetic": "/ˈæk.ʃənz/",
      "translation": "eylemler"
    },
    "possessivePhrase": {
      "form": "user action",
      "translation": "kullanıcı eylemi"
    },
    "determinerPhrase": {
      "form": "these automated actions",
      "translation": "bu otomatik eylemler"
    }
  },
  {
    "id": "noun_203",
    "rank": 203,
    "word": "Activity",
    "phonetic": "/ækˈtɪv.ə.ti/",
    "translation": "Faaliyet / Aktivite (Düzensiz -ies)",
    "exampleEn": "BozTech organizes student developer activities throughout the semester.",
    "grammarNote": "",
    "exampleTr": "BozTech dönem boyunca öğrenci geliştirici faaliyetleri düzenler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an activity",
      "phonetic": "/ækˈtɪv.ə.ti/",
      "translation": "bir aktivite"
    },
    "plural": {
      "form": "activities",
      "phonetic": "/ækˈtɪv.ə.tiz/",
      "translation": "aktiviteler"
    },
    "possessivePhrase": {
      "form": "daily activity",
      "translation": "günlük aktivite"
    },
    "determinerPhrase": {
      "form": "these community activities",
      "translation": "bu topluluk faaliyetleri"
    }
  },
  {
    "id": "noun_204",
    "rank": 204,
    "word": "Addition",
    "phonetic": "/əˈdɪʃ.ən/",
    "translation": "Ekleme / İlave",
    "exampleEn": "Redis caching is a valuable addition to our cloud backend stack.",
    "grammarNote": "",
    "exampleTr": "Redis önbellekleme bulut arka uç yığınımıza değerli bir ilavedir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an addition",
      "phonetic": "/əˈdɪʃ.ən/",
      "translation": "bir ekleme"
    },
    "plural": {
      "form": "additions",
      "phonetic": "/əˈdɪʃ.ənz/",
      "translation": "eklemeler"
    },
    "possessivePhrase": {
      "form": "a new addition",
      "translation": "yeni bir ilave"
    },
    "determinerPhrase": {
      "form": "these feature additions",
      "translation": "bu özellik eklemeleri"
    }
  },
  {
    "id": "noun_205",
    "rank": 205,
    "word": "Advantage",
    "phonetic": "/ədˈvɑːn.tɪdʒ/",
    "translation": "Avantaj / Üstünlük",
    "exampleEn": "Sub-second latency is a huge competitive advantage for our mobile app.",
    "grammarNote": "",
    "exampleTr": "Milisaniye altı gecikme mobil uygulamamız için devasa bir rekabet avantajıdır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an advantage",
      "phonetic": "/ədˈvɑːn.tɪdʒ/",
      "translation": "bir avantaj"
    },
    "plural": {
      "form": "advantages",
      "phonetic": "/ədˈvɑːn.tɪ.dʒɪz/",
      "translation": "avantajlar"
    },
    "possessivePhrase": {
      "form": "the main advantage",
      "translation": "ana avantaj"
    },
    "determinerPhrase": {
      "form": "these competitive advantages",
      "translation": "bu rekabet avantajları"
    }
  },
  {
    "id": "noun_206",
    "rank": 206,
    "word": "Algorithm",
    "phonetic": "/ˈæl.ɡə.rɪ.ðəm/",
    "translation": "Algoritma",
    "exampleEn": "Our object detection algorithm achieves real-time inference on edge devices.",
    "grammarNote": "",
    "exampleTr": "Nesne tespit algoritmamız uç cihazlarda gerçek zamanlı çıkarım elde eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an algorithm",
      "phonetic": "/ˈæl.ɡə.rɪ.ðəm/",
      "translation": "bir algoritma"
    },
    "plural": {
      "form": "algorithms",
      "phonetic": "/ˈæl.ɡə.rɪ.ðəmz/",
      "translation": "algoritmalar"
    },
    "possessivePhrase": {
      "form": "the sorting algorithm",
      "translation": "sıralama algoritması"
    },
    "determinerPhrase": {
      "form": "these neural algorithms",
      "translation": "bu yapay sinir algoritmaları"
    }
  },
  {
    "id": "noun_207",
    "rank": 207,
    "word": "Amount",
    "phonetic": "/əˈmaʊnt/",
    "translation": "Miktar / Tutar",
    "exampleEn": "The payment module processed a substantial amount of e-commerce orders.",
    "grammarNote": "",
    "exampleTr": "Ödeme modülü önemli miktarda e-ticaret siparişini işledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an amount",
      "phonetic": "/əˈmaʊnt/",
      "translation": "bir miktar"
    },
    "plural": {
      "form": "amounts",
      "phonetic": "/əˈmaʊnts/",
      "translation": "miktarlar"
    },
    "possessivePhrase": {
      "form": "a large amount",
      "translation": "büyük bir miktar"
    },
    "determinerPhrase": {
      "form": "this transaction amount",
      "translation": "bu işlem tutarı"
    }
  },
  {
    "id": "noun_208",
    "rank": 208,
    "word": "Analysis",
    "phonetic": "/əˈnæl.ə.sɪs/",
    "translation": "Analiz / Çözümleme (Çoğul: analyses)",
    "exampleEn": "I performed detailed memory leak analysis using Android Studio profiler.",
    "grammarNote": "",
    "exampleTr": "Android Studio profil aracını kullanarak detaylı bellek sızıntısı analizi gerçekleştirdim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an analysis",
      "phonetic": "/əˈnæl.ə.sɪs/",
      "translation": "bir analiz"
    },
    "plural": {
      "form": "analyses",
      "phonetic": "/əˈnæl.ə.siːz/",
      "translation": "analizler"
    },
    "possessivePhrase": {
      "form": "memory analysis",
      "translation": "bellek analizi"
    },
    "determinerPhrase": {
      "form": "these empirical analyses",
      "translation": "bu ampirik analizler"
    }
  },
  {
    "id": "noun_209",
    "rank": 209,
    "word": "Application",
    "phonetic": "/ˌæp.lɪˈkeɪ.ʃən/",
    "translation": "Uygulama / Başvuru",
    "exampleEn": "We developed a full-stack appointment scheduling application called CepTakvim.",
    "grammarNote": "",
    "exampleTr": "CepTakvim adında tam yığın bir randevu planlama uygulaması geliştirdik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an application",
      "phonetic": "/ˌæp.lɪˈkeɪ.ʃən/",
      "translation": "bir uygulama"
    },
    "plural": {
      "form": "applications",
      "phonetic": "/ˌæp.lɪˈkeɪ.ʃənz/",
      "translation": "uygulamalar"
    },
    "possessivePhrase": {
      "form": "our mobile application",
      "translation": "bizim mobil uygulamamız"
    },
    "determinerPhrase": {
      "form": "these web applications",
      "translation": "bu web uygulamaları"
    }
  },
  {
    "id": "noun_210",
    "rank": 210,
    "word": "Architecture",
    "phonetic": "/ˈɑː.kɪ.tek.tʃər/",
    "translation": "Mimari / Yapı",
    "exampleEn": "Clean Architecture decouples business domain logic from UI presentation layers.",
    "grammarNote": "",
    "exampleTr": "Temiz Mimari, iş alanı mantığını arayüz sunum katmanlarından ayırır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "architecture",
      "phonetic": "/ˈɑː.kɪ.tek.tʃər/",
      "translation": "mimari"
    },
    "partitiveUnit": {
      "form": "system architecture",
      "translation": "sistem mimarisi"
    },
    "possessivePhrase": {
      "form": "clean architecture",
      "translation": "temiz mimari"
    },
    "determinerPhrase": {
      "form": "this cloud architecture",
      "translation": "bu bulut mimarisi"
    }
  },
  {
    "id": "noun_211",
    "rank": 211,
    "word": "Argument",
    "phonetic": "/ˈɑːɡ.jə.mənt/",
    "translation": "Argüman / Parametre / Tartışma",
    "exampleEn": "The Kotlin function accepts three arguments including a timeout parameter.",
    "grammarNote": "",
    "exampleTr": "Kotlin fonksiyonu bir zaman aşımı parametresi dahil üç argüman kabul eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an argument",
      "phonetic": "/ˈɑːɡ.jə.mənt/",
      "translation": "bir argüman"
    },
    "plural": {
      "form": "arguments",
      "phonetic": "/ˈɑːɡ.jə.mənts/",
      "translation": "argümanlar"
    },
    "possessivePhrase": {
      "form": "the function argument",
      "translation": "fonksiyon argümanı"
    },
    "determinerPhrase": {
      "form": "these command arguments",
      "translation": "bu komut argümanları"
    }
  },
  {
    "id": "noun_212",
    "rank": 212,
    "word": "Army",
    "phonetic": "/ˈɑː.mi/",
    "translation": "Ordu (Düzensiz -ies)",
    "exampleEn": "Our university project prototyped an automated air defense system.",
    "grammarNote": "",
    "exampleTr": "Üniversite projemiz otomatik bir hava savunma sistemi prototiplemiştir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an army",
      "phonetic": "/ˈɑː.mi/",
      "translation": "bir ordu"
    },
    "plural": {
      "form": "armies",
      "phonetic": "/ˈɑː.miz/",
      "translation": "ordular"
    },
    "possessivePhrase": {
      "form": "a standing army",
      "translation": "düzenli ordu"
    },
    "determinerPhrase": {
      "form": "these modern armies",
      "translation": "bu modern ordular"
    }
  },
  {
    "id": "noun_213",
    "rank": 213,
    "word": "Article",
    "phonetic": "/ˈɑː.tɪ.kəl/",
    "translation": "Makale / Yazı",
    "exampleEn": "I wrote an educational article on DeepFake detection architectures.",
    "grammarNote": "",
    "exampleTr": "DeepFake tespit mimarileri üzerine eğitici bir makale yazdım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an article",
      "phonetic": "/ˈɑː.tɪ.kəl/",
      "translation": "bir makale"
    },
    "plural": {
      "form": "articles",
      "phonetic": "/ˈɑː.tɪ.kəlz/",
      "translation": "makaleler"
    },
    "possessivePhrase": {
      "form": "a technical article",
      "translation": "teknik bir makale"
    },
    "determinerPhrase": {
      "form": "these Medium articles",
      "translation": "bu Medium makaleleri"
    }
  },
  {
    "id": "noun_214",
    "rank": 214,
    "word": "Association",
    "phonetic": "/əˌsəʊ.siˈeɪ.ʃən/",
    "translation": "Dernek / Birlik / Ortaklık",
    "exampleEn": "The student software association organized a Kotlin programming seminar.",
    "grammarNote": "",
    "exampleTr": "Öğrenci yazılım derneği bir Kotlin programlama semineri düzenledi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an association",
      "phonetic": "/əˌsəʊ.siˈeɪ.ʃən/",
      "translation": "bir dernek"
    },
    "plural": {
      "form": "associations",
      "phonetic": "/əˌsəʊ.siˈeɪ.ʃənz/",
      "translation": "dernekler / birlikler"
    },
    "possessivePhrase": {
      "form": "our student association",
      "translation": "bizim öğrenci derneğimiz"
    },
    "determinerPhrase": {
      "form": "this developer association",
      "translation": "bu geliştirici birliği"
    }
  },
  {
    "id": "noun_215",
    "rank": 215,
    "word": "Attempt",
    "phonetic": "/əˈtempt/",
    "translation": "Girişim / Deneme",
    "exampleEn": "The security firewall blocks users after five consecutive failed attempts.",
    "grammarNote": "",
    "exampleTr": "Güvenlik duvarı art arda beş başarısız denemeden sonra kullanıcıları engeller.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an attempt",
      "phonetic": "/əˈtempt/",
      "translation": "bir girişim"
    },
    "plural": {
      "form": "attempts",
      "phonetic": "/əˈtempts/",
      "translation": "girişimler"
    },
    "possessivePhrase": {
      "form": "a login attempt",
      "translation": "bir giriş denemesi"
    },
    "determinerPhrase": {
      "form": "these failed attempts",
      "translation": "bu başarısız denemeler"
    }
  },
  {
    "id": "noun_216",
    "rank": 216,
    "word": "Attention",
    "phonetic": "/əˈten.ʃən/",
    "translation": "Dikkat / İlgi",
    "exampleEn": "Transformer neural networks utilize self-attention mechanisms for language modeling.",
    "grammarNote": "",
    "exampleTr": "Transformer yapay sinir ağları dil modelleme için öz-dikkat mekanizmalarını kullanır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "attention",
      "phonetic": "/əˈten.ʃən/",
      "translation": "dikkat"
    },
    "partitiveUnit": {
      "form": "careful attention",
      "translation": "özenli dikkat"
    },
    "possessivePhrase": {
      "form": "the attention mechanism",
      "translation": "dikkat mekanizması (AI)"
    },
    "determinerPhrase": {
      "form": "this user attention",
      "translation": "bu kullanıcı ilgisi"
    }
  },
  {
    "id": "noun_217",
    "rank": 217,
    "word": "Attitude",
    "phonetic": "/ˈæt.ɪ.tʃuːd/",
    "translation": "Tutum / Tavır",
    "exampleEn": "A proactive attitude is essential for engineering problem-solving.",
    "grammarNote": "",
    "exampleTr": "Mühendislik problemlerini çözmek için proaktif bir tutum esastır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an attitude",
      "phonetic": "/ˈæt.ɪ.tʃuːd/",
      "translation": "bir tutum"
    },
    "plural": {
      "form": "attitudes",
      "phonetic": "/ˈæt.ɪ.tʃuːdz/",
      "translation": "tutumlar"
    },
    "possessivePhrase": {
      "form": "a positive attitude",
      "translation": "olumlu bir tutum"
    },
    "determinerPhrase": {
      "form": "these professional attitudes",
      "translation": "bu profesyonel tutumlar"
    }
  },
  {
    "id": "noun_218",
    "rank": 218,
    "word": "Audience",
    "phonetic": "/ˈɔː.di.əns/",
    "translation": "Kitle / Dinleyici Topluluğu",
    "exampleEn": "Our smart wardrobe application Havamda targets a fashion-conscious audience.",
    "grammarNote": "",
    "exampleTr": "Akıllı gardırop uygulamamız Havamda modaya duyarlı bir kitleyi hedefler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an audience",
      "phonetic": "/ˈɔː.di.əns/",
      "translation": "bir kitle"
    },
    "plural": {
      "form": "audiences",
      "phonetic": "/ˈɔː.di.ən.sɪz/",
      "translation": "kitleler"
    },
    "possessivePhrase": {
      "form": "the target audience",
      "translation": "hedef kitle"
    },
    "determinerPhrase": {
      "form": "this live audience",
      "translation": "bu canlı dinleyici kitlesi"
    }
  },
  {
    "id": "noun_219",
    "rank": 219,
    "word": "Author",
    "phonetic": "/ˈɔː.θər/",
    "translation": "Yazar / Geliştirici",
    "exampleEn": "The Git log displays the exact author and timestamp for every change.",
    "grammarNote": "",
    "exampleTr": "Git günlüğü her değişiklik için kesin yazarı ve zaman damgasını görüntüler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an author",
      "phonetic": "/ˈɔː.θər/",
      "translation": "bir yazar"
    },
    "plural": {
      "form": "authors",
      "phonetic": "/ˈɔː.θərz/",
      "translation": "yazarlar"
    },
    "possessivePhrase": {
      "form": "the commit author",
      "translation": "commit yazarı"
    },
    "determinerPhrase": {
      "form": "these paper authors",
      "translation": "bu makale yazarları"
    }
  },
  {
    "id": "noun_220",
    "rank": 220,
    "word": "Authority",
    "phonetic": "/ɔːˈθɒr.ə.ti/",
    "translation": "Yetki / Otorite (Düzensiz -ies)",
    "exampleEn": "Only the system administrator has the authority to restart production nodes.",
    "grammarNote": "",
    "exampleTr": "Sadece sistem yöneticisi canlı düğümleri yeniden başlatma yetkisine sahiptir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an authority",
      "phonetic": "/ɔːˈθɒr.ə.ti/",
      "translation": "bir otorite"
    },
    "plural": {
      "form": "authorities",
      "phonetic": "/ɔːˈθɒr.ə.tiz/",
      "translation": "yetkililer / otoriteler"
    },
    "possessivePhrase": {
      "form": "root authority",
      "translation": "kök yetkisi"
    },
    "determinerPhrase": {
      "form": "these regulatory authorities",
      "translation": "bu düzenleyici otoriteler"
    }
  },
  {
    "id": "noun_221",
    "rank": 221,
    "word": "Balance",
    "phonetic": "/ˈbæl.əns/",
    "translation": "Denge / Bakiye",
    "exampleEn": "Our FinansApp mobile application tracks daily spending and account balances.",
    "grammarNote": "",
    "exampleTr": "FinansApp mobil uygulamamız günlük harcamaları ve hesap bakiyelerini takip eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a balance",
      "phonetic": "/ˈbæl.əns/",
      "translation": "bir bakiye / denge"
    },
    "plural": {
      "form": "balances",
      "phonetic": "/ˈbæl.ən.sɪz/",
      "translation": "bakiyeler"
    },
    "possessivePhrase": {
      "form": "the account balance",
      "translation": "hesap bakiyesi"
    },
    "determinerPhrase": {
      "form": "this work",
      "translation": "life balance – bu iş-yaşam dengesi"
    }
  },
  {
    "id": "noun_222",
    "rank": 222,
    "word": "Basis",
    "phonetic": "/ˈbeɪ.sɪs/",
    "translation": "Temel / Dayanak (Çoğul: bases)",
    "exampleEn": "We run automated integration test suites on a continuous daily basis.",
    "grammarNote": "",
    "exampleTr": "Otomatik entegrasyon testi paketlerini sürekli günlük bir temelde çalıştırırız.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a basis",
      "phonetic": "/ˈbeɪ.sɪs/",
      "translation": "bir temel"
    },
    "plural": {
      "form": "bases",
      "phonetic": "/ˈbeɪ.siːz/",
      "translation": "temeller"
    },
    "possessivePhrase": {
      "form": "a daily basis",
      "translation": "günlük temel"
    },
    "determinerPhrase": {
      "form": "these theoretical bases",
      "translation": "bu teorik temeller"
    }
  },
  {
    "id": "noun_223",
    "rank": 223,
    "word": "Battle",
    "phonetic": "/ˈbæt.əl/",
    "translation": "Mücadele / Savaş",
    "exampleEn": "Preventing distributed cyber attacks is an ongoing technological battle.",
    "grammarNote": "",
    "exampleTr": "Dağıtık siber saldırıları önlemek devam eden teknolojik bir mücadeledir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a battle",
      "phonetic": "/ˈbæt.əl/",
      "translation": "bir mücadele"
    },
    "plural": {
      "form": "battles",
      "phonetic": "/ˈbæt.əlz/",
      "translation": "mücadeleler"
    },
    "possessivePhrase": {
      "form": "the security battle",
      "translation": "güvenlik mücadelesi"
    },
    "determinerPhrase": {
      "form": "these competitive battles",
      "translation": "bu rekabetçi mücadeleler"
    }
  },
  {
    "id": "noun_224",
    "rank": 224,
    "word": "Beginning",
    "phonetic": "/bɪˈɡɪn.ɪŋ/",
    "translation": "Başlangıç",
    "exampleEn": "We established clear coding guidelines right at the beginning of the project.",
    "grammarNote": "",
    "exampleTr": "Projenin hemen başlangıcında net kodlama yönergeleri belirledik.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a beginning",
      "phonetic": "/bɪˈɡɪn.ɪŋ/",
      "translation": "bir başlangıç"
    },
    "plural": {
      "form": "beginnings",
      "phonetic": "/bɪˈɡɪn.ɪŋz/",
      "translation": "başlangıçlar"
    },
    "possessivePhrase": {
      "form": "the project beginning",
      "translation": "proje başlangıcı"
    },
    "determinerPhrase": {
      "form": "this new beginning",
      "translation": "bu yeni başlangıç"
    }
  },
  {
    "id": "noun_225",
    "rank": 225,
    "word": "Behavior",
    "phonetic": "/bɪˈheɪ.vjər/",
    "translation": "Davranış / Tutum",
    "exampleEn": "Our automated end-to-end tests verify expected user navigation behavior.",
    "grammarNote": "",
    "exampleTr": "Otomatik uçtan uca testlerimiz beklenen kullanıcı gezinme davranışını doğrular.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "behavior",
      "phonetic": "/bɪˈheɪ.vjər/",
      "translation": "davranış"
    },
    "partitiveUnit": {
      "form": "user behavior",
      "translation": "kullanıcı davranışı"
    },
    "possessivePhrase": {
      "form": "system behavior",
      "translation": "sistem davranışı"
    },
    "determinerPhrase": {
      "form": "this expected behavior",
      "translation": "bu beklenen davranış"
    }
  },
  {
    "id": "noun_226",
    "rank": 226,
    "word": "Belief",
    "phonetic": "/bɪˈliːf/",
    "translation": "İnanç / Görüş",
    "exampleEn": "It is our core belief that open-source software accelerates global innovation.",
    "grammarNote": "",
    "exampleTr": "Açık kaynaklı yazılımların küresel inovasyonu hızlandırdığı temel inancımızdır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a belief",
      "phonetic": "/bɪˈliːf/",
      "translation": "bir inanç"
    },
    "plural": {
      "form": "beliefs",
      "phonetic": "/bɪˈliːfs/",
      "translation": "inançlar / görüşler"
    },
    "possessivePhrase": {
      "form": "our shared belief",
      "translation": "bizim ortak inancımız"
    },
    "determinerPhrase": {
      "form": "these strong beliefs",
      "translation": "bu güçlü inançlar"
    }
  },
  {
    "id": "noun_227",
    "rank": 227,
    "word": "Benefit",
    "phonetic": "/ˈben.ɪ.fɪt/",
    "translation": "Fayda / Yarar",
    "exampleEn": "High developer productivity is the primary benefit of Jetpack Compose.",
    "grammarNote": "",
    "exampleTr": "Yüksek geliştirici üretkenliği Jetpack Compose'un birincil faydasıdır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a benefit",
      "phonetic": "/ˈben.ɪ.fɪt/",
      "translation": "bir fayda"
    },
    "plural": {
      "form": "benefits",
      "phonetic": "/ˈben.ɪ.fɪts/",
      "translation": "faydalar"
    },
    "possessivePhrase": {
      "form": "the main benefit",
      "translation": "ana fayda"
    },
    "determinerPhrase": {
      "form": "these mutual benefits",
      "translation": "bu karşılıklı faydalar"
    }
  },
  {
    "id": "noun_228",
    "rank": 228,
    "word": "Bit",
    "phonetic": "/bɪt/",
    "translation": "Bit / Parça",
    "exampleEn": "Our microcontroller processes 32-bit digital telemetry signals.",
    "grammarNote": "",
    "exampleTr": "Mikrodenetleyicimiz 32-bit dijital telemetri sinyallerini işler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a bit",
      "phonetic": "/bɪt/",
      "translation": "bir bit"
    },
    "plural": {
      "form": "bits",
      "phonetic": "/bɪts/",
      "translation": "bitler"
    },
    "possessivePhrase": {
      "form": "a 64",
      "translation": "bit architecture – 64-bit bir mimari"
    },
    "determinerPhrase": {
      "form": "these information bits",
      "translation": "bu bilgi bitleri"
    }
  },
  {
    "id": "noun_229",
    "rank": 229,
    "word": "Branch",
    "phonetic": "/brɑːntʃ/",
    "translation": "Git Dalı / Şube (Çoğul: branches)",
    "exampleEn": "I created a dedicated Git branch to implement user authentication.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı kimlik doğrulamasını uygulamak için özel bir Git dalı (branch) oluşturdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a branch",
      "phonetic": "/brɑːntʃ/",
      "translation": "bir dal"
    },
    "plural": {
      "form": "branches",
      "phonetic": "/ˈbrɑːn.tʃɪz/",
      "translation": "dallar"
    },
    "possessivePhrase": {
      "form": "a Git branch",
      "translation": "bir Git dalı"
    },
    "determinerPhrase": {
      "form": "these feature branches",
      "translation": "bu özellik dalları"
    }
  },
  {
    "id": "noun_230",
    "rank": 230,
    "word": "Budget",
    "phonetic": "/ˈbʌdʒ.ɪt/",
    "translation": "Bütçe",
    "exampleEn": "Our personal finance app FinansApp helps users track their monthly budget.",
    "grammarNote": "",
    "exampleTr": "Kişisel finans uygulamamız FinansApp kullanıcıların aylık bütçelerini takip etmelerine yardımcı olur.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a budget",
      "phonetic": "/ˈbʌdʒ.ɪt/",
      "translation": "bir bütçe"
    },
    "plural": {
      "form": "budgets",
      "phonetic": "/ˈbʌdʒ.ɪts/",
      "translation": "bütçeler"
    },
    "possessivePhrase": {
      "form": "our cloud budget",
      "translation": "bizim bulut bütçemiz"
    },
    "determinerPhrase": {
      "form": "these annual budgets",
      "translation": "bu yıllık bütçeler"
    }
  },
  {
    "id": "noun_231",
    "rank": 231,
    "word": "Cache",
    "phonetic": "/kæʃ/",
    "translation": "Önbellek",
    "exampleEn": "I implemented an in-memory Redis cache to speed up database reads.",
    "grammarNote": "",
    "exampleTr": "Veritabanı okumalarını hızlandırmak için bellek içi bir Redis önbelleği uyguladım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a cache",
      "phonetic": "/kæʃ/",
      "translation": "bir önbellek"
    },
    "plural": {
      "form": "caches",
      "phonetic": "/ˈkæʃ.ɪz/",
      "translation": "önbellekler"
    },
    "possessivePhrase": {
      "form": "the Redis cache",
      "translation": "Redis önbelleği"
    },
    "determinerPhrase": {
      "form": "these local caches",
      "translation": "bu yerel önbellekler"
    }
  },
  {
    "id": "noun_232",
    "rank": 232,
    "word": "Campaign",
    "phonetic": "/kæmˈpeɪn/",
    "translation": "Kampanya",
    "exampleEn": "Our tourist platform FoodShopPass launched a discount coupon campaign.",
    "grammarNote": "",
    "exampleTr": "Turist platformumuz FoodShopPass bir indirim kuponu kampanyası başlattı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a campaign",
      "phonetic": "/kæmˈpeɪn/",
      "translation": "bir kampanya"
    },
    "plural": {
      "form": "campaigns",
      "phonetic": "/kæmˈpeɪnz/",
      "translation": "kampanyalar"
    },
    "possessivePhrase": {
      "form": "a marketing campaign",
      "translation": "bir pazarlama kampanyası"
    },
    "determinerPhrase": {
      "form": "these promo campaigns",
      "translation": "bu promosyon kampanyaları"
    }
  },
  {
    "id": "noun_233",
    "rank": 233,
    "word": "Capacity",
    "phonetic": "/kəˈpæs.ə.ti/",
    "translation": "Kapasite (Düzensiz -ies)",
    "exampleEn": "Our cloud database auto-scaled its storage capacity during traffic peaks.",
    "grammarNote": "",
    "exampleTr": "Bulut veritabanımız trafik zirvelerinde depolama kapasitesini otomatik olarak ölçeklendirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a capacity",
      "phonetic": "/kəˈpæs.ə.ti/",
      "translation": "bir kapasite"
    },
    "plural": {
      "form": "capacities",
      "phonetic": "/kəˈpæs.ə.tiz/",
      "translation": "kapasiteler"
    },
    "possessivePhrase": {
      "form": "server capacity",
      "translation": "sunucu kapasitesi"
    },
    "determinerPhrase": {
      "form": "these network capacities",
      "translation": "bu ağ kapasiteleri"
    }
  },
  {
    "id": "noun_234",
    "rank": 234,
    "word": "Career",
    "phonetic": "/kəˈrɪər/",
    "translation": "Kariyer / Meslek Hayatı",
    "exampleEn": "Mastering spoken English opens up exceptional global remote careers.",
    "grammarNote": "",
    "exampleTr": "Konuşma İngilizcesinde ustalaşmak olağanüstü küresel uzaktan kariyerlerin kapısını açar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a career",
      "phonetic": "/kəˈrɪər/",
      "translation": "bir kariyer"
    },
    "plural": {
      "form": "careers",
      "phonetic": "/kəˈrɪərz/",
      "translation": "kariyerler"
    },
    "possessivePhrase": {
      "form": "an engineering career",
      "translation": "bir mühendislik kariyeri"
    },
    "determinerPhrase": {
      "form": "these tech careers",
      "translation": "bu teknoloji kariyerleri"
    }
  },
  {
    "id": "noun_235",
    "rank": 235,
    "word": "Category",
    "phonetic": "/ˈkæt.ə.ɡri/",
    "translation": "Kategori (Düzensiz -ies)",
    "exampleEn": "FinansApp categorizes expenses into food, transport, and bills automatically.",
    "grammarNote": "",
    "exampleTr": "FinansApp harcamaları otomatik olarak yemek, ulaşım ve faturalar kategorilerine ayırır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a category",
      "phonetic": "/ˈkæt.ə.ɡri/",
      "translation": "bir kategori"
    },
    "plural": {
      "form": "categories",
      "phonetic": "/ˈkæt.ə.ɡriz/",
      "translation": "kategoriler"
    },
    "possessivePhrase": {
      "form": "a product category",
      "translation": "bir ürün kategorisi"
    },
    "determinerPhrase": {
      "form": "these spending categories",
      "translation": "bu harcama kategorileri"
    }
  },
  {
    "id": "noun_236",
    "rank": 236,
    "word": "Cell",
    "phonetic": "/sel/",
    "translation": "Hücre / Pil Hücresi",
    "exampleEn": "The electronic spreadsheet calculates sums across selected grid cells.",
    "grammarNote": "",
    "exampleTr": "Elektronik tablo seçilen ızgara hücreleri genelinde toplamları hesaplar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a cell",
      "phonetic": "/sel/",
      "translation": "bir hücre"
    },
    "plural": {
      "form": "cells",
      "phonetic": "/selz/",
      "translation": "hücreler"
    },
    "possessivePhrase": {
      "form": "a battery cell",
      "translation": "bir pil hücresi"
    },
    "determinerPhrase": {
      "form": "these spreadsheet cells",
      "translation": "bu tablo hücreleri"
    }
  },
  {
    "id": "noun_237",
    "rank": 237,
    "word": "Challenge",
    "phonetic": "/ˈtʃæl.ɪndʒ/",
    "translation": "Zorluk / Meydan Okuma",
    "exampleEn": "Resolving distributed database deadlocks was an exciting technical challenge.",
    "grammarNote": "",
    "exampleTr": "Dağıtık veritabanı kilitlenmelerini çözmek heyecan verici bir teknik zorluktu.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a challenge",
      "phonetic": "/ˈtʃæl.ɪndʒ/",
      "translation": "bir zorluk"
    },
    "plural": {
      "form": "challenges",
      "phonetic": "/ˈtʃæl.ɪn.dʒɪz/",
      "translation": "zorluklar"
    },
    "possessivePhrase": {
      "form": "a technical challenge",
      "translation": "teknik bir zorluk"
    },
    "determinerPhrase": {
      "form": "these coding challenges",
      "translation": "bu kodlama meydan okumaları"
    }
  },
  {
    "id": "noun_238",
    "rank": 238,
    "word": "Chapter",
    "phonetic": "/ˈtʃæp.tər/",
    "translation": "Bölüm / Kısım",
    "exampleEn": "Chapter 3 explains how to configure asynchronous Kotlin Coroutines.",
    "grammarNote": "",
    "exampleTr": "3\\. Bölüm eşzamansız Kotlin Coroutines yapılarının nasıl yapılandırılacağını açıklar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a chapter",
      "phonetic": "/ˈtʃæp.tər/",
      "translation": "bir bölüm"
    },
    "plural": {
      "form": "chapters",
      "phonetic": "/ˈtʃæp.tərz/",
      "translation": "bölümler"
    },
    "possessivePhrase": {
      "form": "the first chapter",
      "translation": "ilk bölüm"
    },
    "determinerPhrase": {
      "form": "these tutorial chapters",
      "translation": "bu eğitim bölümleri"
    }
  },
  {
    "id": "noun_239",
    "rank": 239,
    "word": "Choice",
    "phonetic": "/tʃɔɪs/",
    "translation": "Seçim / Tercih",
    "exampleEn": "Selecting Next.js for our e-commerce frontend was the right choice.",
    "grammarNote": "",
    "exampleTr": "E-ticaret ön yüzümüz için Next.js'i seçmek doğru seçimdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a choice",
      "phonetic": "/tʃɔɪs/",
      "translation": "bir seçim"
    },
    "plural": {
      "form": "choices",
      "phonetic": "/ˈtʃɔɪ.sɪz/",
      "translation": "seçimler"
    },
    "possessivePhrase": {
      "form": "an architectural choice",
      "translation": "mimari bir seçim"
    },
    "determinerPhrase": {
      "form": "these multiple choices",
      "translation": "bu çoktan seçmeliler"
    }
  },
  {
    "id": "noun_240",
    "rank": 240,
    "word": "Client",
    "phonetic": "/ˈklaɪ.ənt/",
    "translation": "İstemci / Müşteri",
    "exampleEn": "The Android client communicates with our backend via authenticated REST endpoints.",
    "grammarNote": "",
    "exampleTr": "Android istemcisi kimliği doğrulanmış REST uç noktaları aracılığıyla arka ucumuzla iletişim kurar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a client",
      "phonetic": "/ˈklaɪ.ənt/",
      "translation": "bir istemci / müşteri"
    },
    "plural": {
      "form": "clients",
      "phonetic": "/ˈklaɪ.ənts/",
      "translation": "istemciler"
    },
    "possessivePhrase": {
      "form": "the mobile client",
      "translation": "mobil istemci"
    },
    "determinerPhrase": {
      "form": "these corporate clients",
      "translation": "bu kurumsal müşteriler"
    }
  },
  {
    "id": "noun_241",
    "rank": 241,
    "word": "Cloud",
    "phonetic": "/klaʊd/",
    "translation": "Bulut Bilişim / Bulut",
    "exampleEn": "Deploying services to the cloud eliminates the need for on-premise hardware.",
    "grammarNote": "",
    "exampleTr": "Servisleri buluta dağıtmak şirket içi fiziksel donanım ihtiyacını ortadan kaldırır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "cloud",
      "phonetic": "/klaʊd/",
      "translation": "bulut"
    },
    "partitiveUnit": {
      "form": "cloud computing",
      "translation": "bulut bilişim"
    },
    "possessivePhrase": {
      "form": "the public cloud",
      "translation": "genel bulut"
    },
    "determinerPhrase": {
      "form": "this private cloud",
      "translation": "bu özel bulut"
    }
  },
  {
    "id": "noun_242",
    "rank": 242,
    "word": "Collection",
    "phonetic": "/kəˈlek.ʃən/",
    "translation": "Koleksiyon / Veri Topluluğu",
    "exampleEn": "We created a MongoDB collection to store appointment scheduling records.",
    "grammarNote": "",
    "exampleTr": "Randevu planlama kayıtlarını saklamak için bir MongoDB koleksiyonu oluşturduk.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a collection",
      "phonetic": "/kəˈlek.ʃən/",
      "translation": "bir koleksiyon"
    },
    "plural": {
      "form": "collections",
      "phonetic": "/kəˈlek.ʃənz/",
      "translation": "koleksiyonlar"
    },
    "possessivePhrase": {
      "form": "a MongoDB collection",
      "translation": "bir MongoDB koleksiyonu"
    },
    "determinerPhrase": {
      "form": "these image collections",
      "translation": "bu görsel koleksiyonları"
    }
  },
  {
    "id": "noun_243",
    "rank": 243,
    "word": "Communication",
    "phonetic": "/kəˌmjuː.nɪˈkeɪ.ʃən/",
    "translation": "İletişim / Haberleşme",
    "exampleEn": "WebSockets enable bi-directional real-time communication between client and server.",
    "grammarNote": "",
    "exampleTr": "WebSockets istemci ve sunucu arasında çift yönlü gerçek zamanlı iletişim sağlar.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "communication",
      "phonetic": "/kəˌmjuː.nɪˈkeɪ.ʃən/",
      "translation": "iletişim"
    },
    "partitiveUnit": {
      "form": "inter",
      "translation": "process communication – süreçler arası iletişim"
    },
    "possessivePhrase": {
      "form": "real",
      "translation": "time communication – gerçek zamanlı iletişim"
    },
    "determinerPhrase": {
      "form": "this secure communication",
      "translation": "bu güvenli iletişim"
    }
  },
  {
    "id": "noun_244",
    "rank": 244,
    "word": "Competition",
    "phonetic": "/ˌkɒm.pəˈtɪʃ.ən/",
    "translation": "Yarışma / Rekabet",
    "exampleEn": "Our student team won first place in the university AI hackathon competition.",
    "grammarNote": "",
    "exampleTr": "Öğrenci ekibimiz üniversite yapay zeka hackathon yarışmasında birincilik kazandı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a competition",
      "phonetic": "/ˌkɒm.pəˈtɪʃ.ən/",
      "translation": "bir yarışma"
    },
    "plural": {
      "form": "competitions",
      "phonetic": "/ˌkɒm.pəˈtɪʃ.ənz/",
      "translation": "yarışmalar"
    },
    "possessivePhrase": {
      "form": "the hackathon competition",
      "translation": "hackathon yarışması"
    },
    "determinerPhrase": {
      "form": "these global competitions",
      "translation": "bu küresel yarışmalar"
    }
  },
  {
    "id": "noun_245",
    "rank": 245,
    "word": "Concept",
    "phonetic": "/ˈkɒn.sept/",
    "translation": "Kavram / Konsept",
    "exampleEn": "Polymorphism is a fundamental concept in object-oriented software engineering.",
    "grammarNote": "",
    "exampleTr": "Çok biçimlilik (polymorphism) nesne yönelimli yazılım mühendisliğinde temel bir kavramdır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a concept",
      "phonetic": "/ˈkɒn.sept/",
      "translation": "bir kavram"
    },
    "plural": {
      "form": "concepts",
      "phonetic": "/ˈkɒn.septs/",
      "translation": "kavramlar"
    },
    "possessivePhrase": {
      "form": "a core concept",
      "translation": "temel bir kavram"
    },
    "determinerPhrase": {
      "form": "these OOP concepts",
      "translation": "bu nesne yönelimli kavramlar"
    }
  },
  {
    "id": "noun_246",
    "rank": 246,
    "word": "Condition",
    "phonetic": "/kənˈdɪʃ.ən/",
    "translation": "Koşul / Durum / Şart",
    "exampleEn": "We resolved a rare race condition in the asynchronous background worker.",
    "grammarNote": "",
    "exampleTr": "Eşzamansız arka plan çalışanındaki nadir bir yarış koşulunu çözdük.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a condition",
      "phonetic": "/kənˈdɪʃ.ən/",
      "translation": "bir koşul"
    },
    "plural": {
      "form": "conditions",
      "phonetic": "/kənˈdɪʃ.ənz/",
      "translation": "koşullar"
    },
    "possessivePhrase": {
      "form": "a race condition",
      "translation": "bir yarış koşulu (hata)"
    },
    "determinerPhrase": {
      "form": "these boundary conditions",
      "translation": "bu sınır koşulları"
    }
  },
  {
    "id": "noun_247",
    "rank": 247,
    "word": "Conference",
    "phonetic": "/ˈkɒn.fər.əns/",
    "translation": "Konferans / Sempozyum",
    "exampleEn": "I presented our DeepFake detection methodology at an engineering conference.",
    "grammarNote": "",
    "exampleTr": "DeepFake tespit metodolojimizi bir mühendislik konferansında sundum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a conference",
      "phonetic": "/ˈkɒn.fər.əns/",
      "translation": "bir konferans"
    },
    "plural": {
      "form": "conferences",
      "phonetic": "/ˈkɒn.fər.ən.sɪz/",
      "translation": "konferanslar"
    },
    "possessivePhrase": {
      "form": "the tech conference",
      "translation": "teknoloji konferansı"
    },
    "determinerPhrase": {
      "form": "these annual conferences",
      "translation": "bu yıllık konferanslar"
    }
  },
  {
    "id": "noun_248",
    "rank": 248,
    "word": "Configuration",
    "phonetic": "/kənˌfɪɡ.əˈreɪ.ʃən/",
    "translation": "Yapılandırma / Konfigürasyon",
    "exampleEn": "I updated the Nginx configuration to enable SSL certificate termination.",
    "grammarNote": "",
    "exampleTr": "SSL sertifikası sonlandırmayı etkinleştirmek için Nginx yapılandırmasını güncelledim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a configuration",
      "phonetic": "/kənˌfɪɡ.əˈreɪ.ʃən/",
      "translation": "bir yapılandırma"
    },
    "plural": {
      "form": "configurations",
      "phonetic": "/kənˌfɪɡ.əˈreɪ.ʃənz/",
      "translation": "yapılandırmalar"
    },
    "possessivePhrase": {
      "form": "the Nginx configuration",
      "translation": "Nginx yapılandırması"
    },
    "determinerPhrase": {
      "form": "these security configurations",
      "translation": "bu güvenlik yapılandırmaları"
    }
  },
  {
    "id": "noun_249",
    "rank": 249,
    "word": "Conflict",
    "phonetic": "/ˈkɒn.flɪkt/",
    "translation": "Çakışma / Uyuşmazlık",
    "exampleEn": "I resolved all Git merge conflicts before creating the pull request.",
    "grammarNote": "",
    "exampleTr": "Çekme isteğini oluşturmadan önce tüm Git birleştirme çakışmalarını çözdüm.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a conflict",
      "phonetic": "/ˈkɒn.flɪkt/",
      "translation": "bir çakışma"
    },
    "plural": {
      "form": "conflicts",
      "phonetic": "/ˈkɒn.flɪkts/",
      "translation": "çakışmalar"
    },
    "possessivePhrase": {
      "form": "a Git merge conflict",
      "translation": "bir Git birleştirme çakışması"
    },
    "determinerPhrase": {
      "form": "these branch conflicts",
      "translation": "bu dal çakışmaları"
    }
  },
  {
    "id": "noun_250",
    "rank": 250,
    "word": "Connection",
    "phonetic": "/kəˈnek.ʃən/",
    "translation": "Bağlantı",
    "exampleEn": "The backend server pools database connections to improve query efficiency.",
    "grammarNote": "",
    "exampleTr": "Arka uç sunucusu sorgu verimliliğini artırmak için veritabanı bağlantılarını havuzda toplar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a connection",
      "phonetic": "/kəˈnek.ʃən/",
      "translation": "bir bağlantı"
    },
    "plural": {
      "form": "connections",
      "phonetic": "/kəˈnek.ʃənz/",
      "translation": "bağlantılar"
    },
    "possessivePhrase": {
      "form": "a database connection",
      "translation": "bir veritabanı bağlantısı"
    },
    "determinerPhrase": {
      "form": "these secure connections",
      "translation": "bu güvenli bağlantılar"
    }
  },
  {
    "id": "noun_251",
    "rank": 251,
    "word": "Context",
    "phonetic": "/ˈkɒn.tekst/",
    "translation": "Bağlam / İçerik Durumu",
    "exampleEn": "In Kotlin, Dispatchers.IO specifies the optimal context for network requests.",
    "grammarNote": "",
    "exampleTr": "Kotlin'de Dispatchers.IO ağ istekleri için en uygun bağlamı belirler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a context",
      "phonetic": "/ˈkɒn.tekst/",
      "translation": "bir bağlam"
    },
    "plural": {
      "form": "contexts",
      "phonetic": "/ˈkɒn.teksts/",
      "translation": "bağlamlar"
    },
    "possessivePhrase": {
      "form": "the coroutine context",
      "translation": "coroutine bağlamı"
    },
    "determinerPhrase": {
      "form": "this execution context",
      "translation": "bu yürütme bağlamı"
    }
  },
  {
    "id": "noun_252",
    "rank": 252,
    "word": "Contract",
    "phonetic": "/ˈkɒn.trækt/",
    "translation": "Sözleşme / Kontrat",
    "exampleEn": "We signed a commercial software development contract with Bolu Teknokent.",
    "grammarNote": "",
    "exampleTr": "Bolu Teknokent ile ticari bir yazılım geliştirme sözleşmesi imzaladık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a contract",
      "phonetic": "/ˈkɒn.trækt/",
      "translation": "bir sözleşme"
    },
    "plural": {
      "form": "contracts",
      "phonetic": "/ˈkɒn.trækts/",
      "translation": "sözleşmeler"
    },
    "possessivePhrase": {
      "form": "the lease contract",
      "translation": "kira sözleşmesi"
    },
    "determinerPhrase": {
      "form": "these service contracts",
      "translation": "bu hizmet sözleşmeleri"
    }
  },
  {
    "id": "noun_253",
    "rank": 253,
    "word": "Control",
    "phonetic": "/kənˈtrəʊl/",
    "translation": "Denetim / Kontrol",
    "exampleEn": "Git version control enables distributed collaboration across software teams.",
    "grammarNote": "",
    "exampleTr": "Git sürüm kontrolü yazılım ekipleri arasında dağıtık işbirliği sağlar.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "control",
      "phonetic": "/kənˈtrəʊl/",
      "translation": "kontrol"
    },
    "partitiveUnit": {
      "form": "version control",
      "translation": "sürüm kontrolü"
    },
    "possessivePhrase": {
      "form": "access control",
      "translation": "erişim kontrolü"
    },
    "determinerPhrase": {
      "form": "this automated control",
      "translation": "bu otomatik kontrol"
    }
  },
  {
    "id": "noun_254",
    "rank": 254,
    "word": "Council",
    "phonetic": "/ˈkaʊn.səl/",
    "translation": "Kurul / Konsey",
    "exampleEn": "The university student council sponsored our annual hackathon event.",
    "grammarNote": "",
    "exampleTr": "Üniversite öğrenci konseyi yıllık hackathon etkinliğimize sponsor oldu.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a council",
      "phonetic": "/ˈkaʊn.səl/",
      "translation": "bir kurul"
    },
    "plural": {
      "form": "councils",
      "phonetic": "/ˈkaʊn.səlz/",
      "translation": "kurullar"
    },
    "possessivePhrase": {
      "form": "the student council",
      "translation": "öğrenci kurulu"
    },
    "determinerPhrase": {
      "form": "this advisory council",
      "translation": "bu danışma kurulu"
    }
  },
  {
    "id": "noun_255",
    "rank": 255,
    "word": "County",
    "phonetic": "/ˈkaʊn.ti/",
    "translation": "İlçe / Bölge (Düzensiz -ies)",
    "exampleEn": "Our traffic monitoring prototype is tested across the local county highway.",
    "grammarNote": "",
    "exampleTr": "Trafik izleme prototipimiz yerel ilçe otoyolunda test edilmektedir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a county",
      "phonetic": "/ˈkaʊn.ti/",
      "translation": "bir ilçe / bölge"
    },
    "plural": {
      "form": "counties",
      "phonetic": "/ˈkaʊn.tiz/",
      "translation": "ilçeler"
    },
    "possessivePhrase": {
      "form": "our local county",
      "translation": "bizim yerel ilçemiz"
    },
    "determinerPhrase": {
      "form": "these surrounding counties",
      "translation": "bu çevre ilçeler"
    }
  },
  {
    "id": "noun_256",
    "rank": 256,
    "word": "Court",
    "phonetic": "/kɔːt/",
    "translation": "Mahkeme / Kort",
    "exampleEn": "We played a friendly tennis match on the university court yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün üniversite kortunda dostane bir tenis maçı yaptık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a court",
      "phonetic": "/kɔːt/",
      "translation": "bir mahkeme"
    },
    "plural": {
      "form": "courts",
      "phonetic": "/kɔːts/",
      "translation": "mahkemeler"
    },
    "possessivePhrase": {
      "form": "the tennis court",
      "translation": "tenis kortu"
    },
    "determinerPhrase": {
      "form": "the high court",
      "translation": "yüksek mahkeme"
    }
  },
  {
    "id": "noun_257",
    "rank": 257,
    "word": "Culture",
    "phonetic": "/ˈkʌl.tʃər/",
    "translation": "Kültür (Şirket Kültürü)",
    "exampleEn": "Our tech community fosters a supportive culture of continuous learning.",
    "grammarNote": "",
    "exampleTr": "Teknoloji topluluğumuz sürekli öğrenmeye dayalı destekleyici bir kültürü teşvik eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a culture",
      "phonetic": "/ˈkʌl.tʃər/",
      "translation": "bir kültür"
    },
    "plural": {
      "form": "cultures",
      "phonetic": "/ˈkʌl.tʃərz/",
      "translation": "kültürler"
    },
    "possessivePhrase": {
      "form": "an engineering culture",
      "translation": "bir mühendislik kültürü"
    },
    "determinerPhrase": {
      "form": "this welcoming culture",
      "translation": "bu kucaklayıcı kültür"
    }
  },
  {
    "id": "noun_258",
    "rank": 258,
    "word": "Deal",
    "phonetic": "/diːl/",
    "translation": "Anlaşma / Fırsat",
    "exampleEn": "Our startup closed a partnership deal with an international payment gateway.",
    "grammarNote": "",
    "exampleTr": "Girişimimiz uluslararası bir ödeme ağ geçidi ile bir ortaklık anlaşması kapattı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a deal",
      "phonetic": "/diːl/",
      "translation": "bir anlaşma"
    },
    "plural": {
      "form": "deals",
      "phonetic": "/diːlz/",
      "translation": "anlaşmalar"
    },
    "possessivePhrase": {
      "form": "a business deal",
      "translation": "bir iş anlaşması"
    },
    "determinerPhrase": {
      "form": "these discount deals",
      "translation": "bu indirim fırsatları"
    }
  },
  {
    "id": "noun_259",
    "rank": 259,
    "word": "Death",
    "phonetic": "/deθ/",
    "translation": "Ölüm",
    "exampleEn": "Autonomous vehicle safety systems are designed to eliminate traffic deaths.",
    "grammarNote": "",
    "exampleTr": "Otonom araç güvenlik sistemleri trafik ölümlerini ortadan kaldırmak için tasarlanmıştır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "death",
      "phonetic": "/deθ/",
      "translation": "ölüm"
    },
    "partitiveUnit": {
      "form": "sudden death",
      "translation": "ani ölüm"
    },
    "possessivePhrase": {
      "form": "the cause of death",
      "translation": "ölüm nedeni"
    },
    "determinerPhrase": {
      "form": "this tragic death",
      "translation": "bu trajik ölüm"
    }
  },
  {
    "id": "noun_260",
    "rank": 260,
    "word": "Department",
    "phonetic": "/dɪˈpɑːt.mənt/",
    "translation": "Departman / Bölüm",
    "exampleEn": "I study in the Computer Engineering Department at Yozgat Bozok University.",
    "grammarNote": "",
    "exampleTr": "Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği Bölümünde okuyorum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a department",
      "phonetic": "/dɪˈpɑːt.mənt/",
      "translation": "bir departman"
    },
    "plural": {
      "form": "departments",
      "phonetic": "/dɪˈpɑːt.mənts/",
      "translation": "departmanlar"
    },
    "possessivePhrase": {
      "form": "our engineering department",
      "translation": "bizim mühendislik departmanımız"
    },
    "determinerPhrase": {
      "form": "these academic departments",
      "translation": "bu akademik bölümler"
    }
  },
  {
    "id": "noun_261",
    "rank": 261,
    "word": "Dependency",
    "phonetic": "/dɪˈpen.dən.si/",
    "translation": "Bağımlılık (Yazılımda -ies)",
    "exampleEn": "I updated the CameraX and Compose dependencies in our build.gradle file.",
    "grammarNote": "",
    "exampleTr": "build.gradle dosyamızdaki CameraX ve Compose bağımlılıklarını güncelledim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a dependency",
      "phonetic": "/dɪˈpen.dən.si/",
      "translation": "bir bağımlılık"
    },
    "plural": {
      "form": "dependencies",
      "phonetic": "/dɪˈpen.dən.siz/",
      "translation": "bağımlılıklar"
    },
    "possessivePhrase": {
      "form": "a Gradle dependency",
      "translation": "bir Gradle bağımlılığı"
    },
    "determinerPhrase": {
      "form": "these external dependencies",
      "translation": "bu harici bağımlılıklar"
    }
  },
  {
    "id": "noun_262",
    "rank": 262,
    "word": "Deployment",
    "phonetic": "/dɪˈplɔɪ.mənt/",
    "translation": "Dağıtım / Yayına Alma",
    "exampleEn": "Our CI/CD pipeline triggers an automated production deployment on every main merge.",
    "grammarNote": "",
    "exampleTr": "CI/CD işlem hattımız ana dala her birleştirmede otomatik bir canlı dağıtım tetikler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a deployment",
      "phonetic": "/dɪˈplɔɪ.mənt/",
      "translation": "bir dağıtım"
    },
    "plural": {
      "form": "deployments",
      "phonetic": "/dɪˈplɔɪ.mənts/",
      "translation": "dağıtımlar"
    },
    "possessivePhrase": {
      "form": "the production deployment",
      "translation": "canlı ortam dağıtımı"
    },
    "determinerPhrase": {
      "form": "these automated deployments",
      "translation": "bu otomatik dağıtımlar"
    }
  },
  {
    "id": "noun_263",
    "rank": 263,
    "word": "Description",
    "phonetic": "/dɪˈskrɪp.ʃən/",
    "translation": "Tanım / Açıklama",
    "exampleEn": "The OpenAPI specification provides a detailed description for every endpoint.",
    "grammarNote": "",
    "exampleTr": "OpenAPI spesifikasyonu her uç nokta için ayrıntılı bir açıklama sağlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a description",
      "phonetic": "/dɪˈskrɪp.ʃən/",
      "translation": "bir açıklama"
    },
    "plural": {
      "form": "descriptions",
      "phonetic": "/dɪˈskrɪp.ʃənz/",
      "translation": "açıklamalar"
    },
    "possessivePhrase": {
      "form": "the job description",
      "translation": "iş tanımı"
    },
    "determinerPhrase": {
      "form": "these detailed descriptions",
      "translation": "bu detaylı açıklamalar"
    }
  },
  {
    "id": "noun_264",
    "rank": 264,
    "word": "Detail",
    "phonetic": "/ˈdiː.teɪl/",
    "translation": "Ayrıntı / Detay",
    "exampleEn": "I will email the full meeting details and agenda to the team.",
    "grammarNote": "",
    "exampleTr": "Ekibe tüm toplantı detaylarını ve gündemini e-posta ile göndereceğim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a detail",
      "phonetic": "/ˈdiː.teɪl/",
      "translation": "bir detay"
    },
    "plural": {
      "form": "details",
      "phonetic": "/ˈdiː.teɪlz/",
      "translation": "detaylar"
    },
    "possessivePhrase": {
      "form": "the technical detail",
      "translation": "teknik detay"
    },
    "determinerPhrase": {
      "form": "these meeting details",
      "translation": "bu toplantı detayları"
    }
  },
  {
    "id": "noun_265",
    "rank": 265,
    "word": "Dialogue",
    "phonetic": "/ˈdaɪ.ə.lɒɡ/",
    "translation": "Diyalog / Konuşma",
    "exampleEn": "Our language learning application includes forty interactive podcast dialogues.",
    "grammarNote": "",
    "exampleTr": "Dil öğrenme uygulamamız kırk adet etkileşimli podcast diyaloğu içerir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a dialogue",
      "phonetic": "/ˈdaɪ.ə.lɒɡ/",
      "translation": "bir diyalog"
    },
    "plural": {
      "form": "dialogues",
      "phonetic": "/ˈdaɪ.ə.lɒɡz/",
      "translation": "diyaloglar"
    },
    "possessivePhrase": {
      "form": "an interactive dialogue",
      "translation": "etkileşimli bir diyalog"
    },
    "determinerPhrase": {
      "form": "these podcast dialogues",
      "translation": "bu podcast diyalogları"
    }
  },
  {
    "id": "noun_266",
    "rank": 266,
    "word": "Discussion",
    "phonetic": "/dɪˈskʌʃ.ən/",
    "translation": "Tartışma / Görüşme",
    "exampleEn": "We had a productive technical discussion regarding database indexing.",
    "grammarNote": "",
    "exampleTr": "Veritabanı indeksleme konusunda verimli bir teknik görüşme yaptık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a discussion",
      "phonetic": "/dɪˈskʌʃ.ən/",
      "translation": "bir görüşme"
    },
    "plural": {
      "form": "discussions",
      "phonetic": "/dɪˈskʌʃ.ənz/",
      "translation": "görüşmeler"
    },
    "possessivePhrase": {
      "form": "a technical discussion",
      "translation": "teknik bir görüşme"
    },
    "determinerPhrase": {
      "form": "these team discussions",
      "translation": "bu ekip tartışmaları"
    }
  },
  {
    "id": "noun_267",
    "rank": 267,
    "word": "Disease",
    "phonetic": "/dɪˈziːz/",
    "translation": "Hastalık",
    "exampleEn": "CRISPR genetic therapy is engineered to cure hereditary blood diseases.",
    "grammarNote": "",
    "exampleTr": "CRISPR genetik tedavisi kalıtsal kan hastalıklarını iyileştirmek için tasarlanmıştır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a disease",
      "phonetic": "/dɪˈziːz/",
      "translation": "bir hastalık"
    },
    "plural": {
      "form": "diseases",
      "phonetic": "/dɪˈziː.zɪz/",
      "translation": "hastalıklar"
    },
    "possessivePhrase": {
      "form": "a viral disease",
      "translation": "viral bir hastalık"
    },
    "determinerPhrase": {
      "form": "these hereditary diseases",
      "translation": "bu kalıtsal hastalıklar"
    }
  },
  {
    "id": "noun_268",
    "rank": 268,
    "word": "Disk",
    "phonetic": "/dɪsk/",
    "translation": "Depolama Diski / Sürücü",
    "exampleEn": "The database server uses high-speed NVMe solid-state disks.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sunucusu yüksek hızlı NVMe katı hal diskleri kullanır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a disk",
      "phonetic": "/dɪsk/",
      "translation": "bir disk"
    },
    "plural": {
      "form": "disks",
      "phonetic": "/dɪsks/",
      "translation": "diskler"
    },
    "possessivePhrase": {
      "form": "the SSD disk",
      "translation": "SSD disk"
    },
    "determinerPhrase": {
      "form": "these storage disks",
      "translation": "bu depolama diskleri"
    }
  },
  {
    "id": "noun_269",
    "rank": 269,
    "word": "Document",
    "phonetic": "/ˈdɒk.jə.mənt/",
    "translation": "Belge / Doküman",
    "exampleEn": "I exported the complete curriculum guide as a structured markdown document.",
    "grammarNote": "",
    "exampleTr": "Tüm müfredat kılavuzunu yapılandırılmış bir markdown belgesi olarak dışa aktardım.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a document",
      "phonetic": "/ˈdɒk.jə.mənt/",
      "translation": "bir belge"
    },
    "plural": {
      "form": "documents",
      "phonetic": "/ˈdɒk.jə.mənts/",
      "translation": "belgeler"
    },
    "possessivePhrase": {
      "form": "the PDF document",
      "translation": "PDF belgesi"
    },
    "determinerPhrase": {
      "form": "these official documents",
      "translation": "bu resmi belgeler"
    }
  },
  {
    "id": "noun_270",
    "rank": 270,
    "word": "Documentation",
    "phonetic": "/ˌdɒk.jə.menˈteɪ.ʃən/",
    "translation": "Dokümantasyon",
    "exampleEn": "Comprehensive technical documentation accelerates developer onboarding.",
    "grammarNote": "",
    "exampleTr": "Kapsamlı teknik dokümantasyon geliştirici karşılama sürecini hızlandırır.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "documentation",
      "phonetic": "/ˌdɒk.jə.menˈteɪ.ʃən/",
      "translation": "dokümantasyon"
    },
    "partitiveUnit": {
      "form": "API documentation",
      "translation": "API dokümantasyonu"
    },
    "possessivePhrase": {
      "form": "technical documentation",
      "translation": "teknik dokümantasyon"
    },
    "determinerPhrase": {
      "form": "this clear documentation",
      "translation": "bu net dokümantasyon"
    }
  },
  {
    "id": "noun_271",
    "rank": 271,
    "word": "Dollar",
    "phonetic": "/ˈdɒl.ər/",
    "translation": "Dolar",
    "exampleEn": "The cloud hosting server costs forty dollars per month on Render.",
    "grammarNote": "",
    "exampleTr": "Bulut barındırma sunucusu Render'da ayda kırk dolara mal olmaktadır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a dollar",
      "phonetic": "/ˈdɒl.ər/",
      "translation": "bir dolar"
    },
    "plural": {
      "form": "dollars",
      "phonetic": "/ˈdɒl.ərz/",
      "translation": "dolar (çoğul)"
    },
    "possessivePhrase": {
      "form": "ten dollars",
      "translation": "on dolar"
    },
    "determinerPhrase": {
      "form": "these US dollars",
      "translation": "bu ABD dolarları"
    }
  },
  {
    "id": "noun_272",
    "rank": 272,
    "word": "Doubt",
    "phonetic": "/daʊt/",
    "translation": "Şüphe / Kuşku",
    "exampleEn": "There is no doubt that Kotlin Multiplatform simplifies cross-platform code.",
    "grammarNote": "",
    "exampleTr": "Kotlin Multiplatform'un platformlar arası kodu basitleştirdiğine şüphe yoktur.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a doubt",
      "phonetic": "/daʊt/",
      "translation": "bir şüphe"
    },
    "plural": {
      "form": "doubts",
      "phonetic": "/daʊts/",
      "translation": "şüpheler"
    },
    "possessivePhrase": {
      "form": "no doubt",
      "translation": "şüphesiz"
    },
    "determinerPhrase": {
      "form": "these lingering doubts",
      "translation": "bu süregelen şüpheler"
    }
  },
  {
    "id": "noun_273",
    "rank": 273,
    "word": "Duty",
    "phonetic": "/ˈdjuː.ti/",
    "translation": "Görev / Sorumluluk (Düzensiz -ies)",
    "exampleEn": "My duty as a core team member is to organize technical developer workshops.",
    "grammarNote": "",
    "exampleTr": "Çekirdek ekip üyesi olarak görevim teknik geliştirici atölyeleri düzenlemektir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a duty",
      "phonetic": "/ˈdjuː.ti/",
      "translation": "bir görev"
    },
    "plural": {
      "form": "duties",
      "phonetic": "/ˈdjuː.tiz/",
      "translation": "görevler"
    },
    "possessivePhrase": {
      "form": "my primary duty",
      "translation": "benim birincil görevim"
    },
    "determinerPhrase": {
      "form": "these engineering duties",
      "translation": "bu mühendislik görevleri"
    }
  },
  {
    "id": "noun_274",
    "rank": 274,
    "word": "Economy",
    "phonetic": "/iˈkɒn.ə.mi/",
    "translation": "Ekonomi (Düzensiz -ies)",
    "exampleEn": "Software development drives significant growth in the global digital economy.",
    "grammarNote": "",
    "exampleTr": "Yazılım geliştirme küresel dijital ekonomide önemli büyümeyi tetikler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an economy",
      "phonetic": "/iˈkɒn.ə.mi/",
      "translation": "bir ekonomi"
    },
    "plural": {
      "form": "economies",
      "phonetic": "/iˈkɒn.ə.miz/",
      "translation": "ekonomiler"
    },
    "possessivePhrase": {
      "form": "the digital economy",
      "translation": "dijital ekonomi"
    },
    "determinerPhrase": {
      "form": "these emerging economies",
      "translation": "bu gelişmekte olan ekonomiler"
    }
  },
  {
    "id": "noun_275",
    "rank": 275,
    "word": "Effort",
    "phonetic": "/ˈef.ət/",
    "translation": "Çaba / Gayret",
    "exampleEn": "Refactoring our monolithic codebase required a massive collective team effort.",
    "grammarNote": "",
    "exampleTr": "Monolitik kod tabanımızı yeniden düzenlemek muazzam bir ortak ekip çabası gerektirdi.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an effort",
      "phonetic": "/ˈef.ət/",
      "translation": "bir çaba"
    },
    "plural": {
      "form": "efforts",
      "phonetic": "/ˈef.əts/",
      "translation": "çabalar"
    },
    "possessivePhrase": {
      "form": "a collective effort",
      "translation": "ortak bir çaba"
    },
    "determinerPhrase": {
      "form": "these continuous efforts",
      "translation": "bu sürekli çabalar"
    }
  },
  {
    "id": "noun_276",
    "rank": 276,
    "word": "Element",
    "phonetic": "/ˈel.ɪ.mənt/",
    "translation": "Öğe / Eleman / Bileşen",
    "exampleEn": "Jetpack Compose renders dynamic UI elements declaratively based on state.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose duruma bağlı olarak dinamik arayüz öğelerini bildirimsel olarak çizer.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an element",
      "phonetic": "/ˈel.ɪ.mənt/",
      "translation": "bir öğe"
    },
    "plural": {
      "form": "elements",
      "phonetic": "/ˈel.ɪ.mənts/",
      "translation": "öğeler"
    },
    "possessivePhrase": {
      "form": "a UI element",
      "translation": "bir kullanıcı arayüzü öğesi"
    },
    "determinerPhrase": {
      "form": "these array elements",
      "translation": "bu dizi elemanları"
    }
  },
  {
    "id": "noun_277",
    "rank": 277,
    "word": "Employee",
    "phonetic": "/ɪmˈplɔɪ.iː/",
    "translation": "Çalışan / Personel",
    "exampleEn": "Our software agency hires remote employees across different cities.",
    "grammarNote": "",
    "exampleTr": "Yazılım ajansımız farklı şehirlerde uzaktan çalışan personeller istihdam eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an employee",
      "phonetic": "/ɪmˈplɔɪ.iː/",
      "translation": "bir çalışan"
    },
    "plural": {
      "form": "employees",
      "phonetic": "/ɪmˈplɔɪ.iːz/",
      "translation": "çalışanlar"
    },
    "possessivePhrase": {
      "form": "a remote employee",
      "translation": "uzaktan çalışan bir personel"
    },
    "determinerPhrase": {
      "form": "these tech employees",
      "translation": "bu teknoloji çalışanları"
    }
  },
  {
    "id": "noun_278",
    "rank": 278,
    "word": "Employer",
    "phonetic": "/ɪmˈplɔɪ.ər/",
    "translation": "İşveren",
    "exampleEn": "Tech employers value developers with strong problem-solving and English skills.",
    "grammarNote": "",
    "exampleTr": "Teknoloji işverenleri güçlü problem çözme ve İngilizce becerilerine sahip geliştiricilere değer verir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an employer",
      "phonetic": "/ɪmˈplɔɪ.ər/",
      "translation": "bir işveren"
    },
    "plural": {
      "form": "employers",
      "phonetic": "/ɪmˈplɔɪ.ərz/",
      "translation": "işverenler"
    },
    "possessivePhrase": {
      "form": "a supportive employer",
      "translation": "destekleyici bir işveren"
    },
    "determinerPhrase": {
      "form": "these enterprise employers",
      "translation": "bu kurumsal işverenler"
    }
  },
  {
    "id": "noun_279",
    "rank": 279,
    "word": "Endpoint",
    "phonetic": "/ˈend.pɔɪnt/",
    "translation": "Uç Nokta / API Uç Noktası",
    "exampleEn": "I built an authenticated REST endpoint to retrieve user profile data.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı profil verilerini almak için kimliği doğrulanmış bir REST uç noktası inşa ettim.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an endpoint",
      "phonetic": "/ˈend.pɔɪnt/",
      "translation": "bir uç nokta"
    },
    "plural": {
      "form": "endpoints",
      "phonetic": "/ˈend.pɔɪnts/",
      "translation": "uç noktalar"
    },
    "possessivePhrase": {
      "form": "the REST endpoint",
      "translation": "REST uç noktası"
    },
    "determinerPhrase": {
      "form": "these secure endpoints",
      "translation": "bu güvenli uç noktalar"
    }
  },
  {
    "id": "noun_280",
    "rank": 280,
    "word": "Engine",
    "phonetic": "/ˈen.dʒɪn/",
    "translation": "Motor (Yazılım / Veritabanı)",
    "exampleEn": "Our inference engine runs the deep learning video classifier locally.",
    "grammarNote": "",
    "exampleTr": "Çıkarım motorumuz derin öğrenme video sınıflandırıcısını yerel olarak çalıştırır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an engine",
      "phonetic": "/ˈen.dʒɪn/",
      "translation": "bir motor"
    },
    "plural": {
      "form": "engines",
      "phonetic": "/ˈen.dʒɪnz/",
      "translation": "motorlar"
    },
    "possessivePhrase": {
      "form": "the inference engine",
      "translation": "çıkarım motoru (AI)"
    },
    "determinerPhrase": {
      "form": "these search engines",
      "translation": "bu arama motorları"
    }
  },
  {
    "id": "noun_281",
    "rank": 281,
    "word": "Entity",
    "phonetic": "/ˈen.tə.ti/",
    "translation": "Varlık / Veri Varlığı (Düzensiz -ies)",
    "exampleEn": "We defined Room database entities to persist offline data in Android.",
    "grammarNote": "",
    "exampleTr": "Android'de çevrim dışı verileri kalıcı kılmak için Room veritabanı varlıkları tanımladık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an entity",
      "phonetic": "/ˈen.tə.ti/",
      "translation": "bir varlık"
    },
    "plural": {
      "form": "entities",
      "phonetic": "/ˈen.tə.tiz/",
      "translation": "varlıklar"
    },
    "possessivePhrase": {
      "form": "a database entity",
      "translation": "bir veritabanı varlığı"
    },
    "determinerPhrase": {
      "form": "these domain entities",
      "translation": "bu alan varlıkları"
    }
  },
  {
    "id": "noun_282",
    "rank": 282,
    "word": "Equation",
    "phonetic": "/ɪˈkweɪ.ʒən/",
    "translation": "Denklem",
    "exampleEn": "Machine learning loss functions optimize complex mathematical equations.",
    "grammarNote": "",
    "exampleTr": "Makine öğrenmesi kayıp fonksiyonları karmaşık matematiksel denklemleri optimize eder.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an equation",
      "phonetic": "/ɪˈkweɪ.ʒən/",
      "translation": "bir denklem"
    },
    "plural": {
      "form": "equations",
      "phonetic": "/ɪˈkweɪ.ʒənz/",
      "translation": "denklemler"
    },
    "possessivePhrase": {
      "form": "a differential equation",
      "translation": "diferansiyel denklem"
    },
    "determinerPhrase": {
      "form": "these mathematical equations",
      "translation": "bu matematiksel denklemler"
    }
  },
  {
    "id": "noun_283",
    "rank": 283,
    "word": "Equipment",
    "phonetic": "/ɪˈkwɪp.mənt/",
    "translation": "Ekipman / Donanım",
    "exampleEn": "We installed specialized server cooling equipment in the data center.",
    "grammarNote": "",
    "exampleTr": "Veri merkezine özel sunucu soğutma ekipmanı kurduk.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "equipment",
      "phonetic": "/ɪˈkwɪp.mənt/",
      "translation": "ekipman"
    },
    "partitiveUnit": {
      "form": "a piece of equipment",
      "translation": "bir ekipman parçası"
    },
    "possessivePhrase": {
      "form": "network equipment",
      "translation": "ağ ekipmanı"
    },
    "determinerPhrase": {
      "form": "this hardware equipment",
      "translation": "bu donanım ekipmanı"
    }
  },
  {
    "id": "noun_284",
    "rank": 284,
    "word": "Estate",
    "phonetic": "/ɪˈsteɪt/",
    "translation": "Mülk / Gayrimenkul",
    "exampleEn": "Our client requested a modern real estate listing and booking portal.",
    "grammarNote": "",
    "exampleTr": "Müşterimiz modern bir gayrimenkul listeleme ve randevu portalı talep etti.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an estate",
      "phonetic": "/ɪˈsteɪt/",
      "translation": "bir gayrimenkul"
    },
    "plural": {
      "form": "estates",
      "phonetic": "/ɪˈsteɪts/",
      "translation": "mülkler"
    },
    "possessivePhrase": {
      "form": "real estate",
      "translation": "gayrimenkul"
    },
    "determinerPhrase": {
      "form": "these commercial estates",
      "translation": "bu ticari mülkler"
    }
  },
  {
    "id": "noun_285",
    "rank": 285,
    "word": "Exception",
    "phonetic": "/ɪkˈsep.ʃən/",
    "translation": "İstisna / Hata İstisnası",
    "exampleEn": "A try-catch block catches runtime exceptions to prevent application crashes.",
    "grammarNote": "",
    "exampleTr": "Bir try-catch bloğu uygulamanın çökmesini önlemek için çalışma zamanı istisnalarını yakalar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an exception",
      "phonetic": "/ɪkˈsep.ʃən/",
      "translation": "bir istisna"
    },
    "plural": {
      "form": "exceptions",
      "phonetic": "/ɪkˈsep.ʃənz/",
      "translation": "istisnalar"
    },
    "possessivePhrase": {
      "form": "a runtime exception",
      "translation": "çalışma zamanı istisnası"
    },
    "determinerPhrase": {
      "form": "these unhandled exceptions",
      "translation": "bu işlenmemiş istisnalar"
    }
  },
  {
    "id": "noun_286",
    "rank": 286,
    "word": "Execution",
    "phonetic": "/ˌek.sɪˈkjuː.ʃən/",
    "translation": "Yürütme / Çalıştırma",
    "exampleEn": "Asynchronous non-blocking execution prevents freezing the main UI thread.",
    "grammarNote": "",
    "exampleTr": "Eşzamansız bloklamayan yürütme ana kullanıcı arayüzü iş parçacığının donmasını önler.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "execution",
      "phonetic": "/ˌek.sɪˈkjuː.ʃən/",
      "translation": "yürütme"
    },
    "partitiveUnit": {
      "form": "code execution",
      "translation": "kod yürütme"
    },
    "possessivePhrase": {
      "form": "fast execution",
      "translation": "hızlı yürütme"
    },
    "determinerPhrase": {
      "form": "this query execution",
      "translation": "bu sorgu yürütmesi"
    }
  },
  {
    "id": "noun_287",
    "rank": 287,
    "word": "Expectation",
    "phonetic": "/ˌek.spekˈteɪ.ʃən/",
    "translation": "Beklenti",
    "exampleEn": "Our mobile app exceeded client expectations with its sub-second response time.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulamamız milisaniye altı yanıt süresiyle müşteri beklentilerini aştı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an expectation",
      "phonetic": "/ˌek.spekˈteɪ.ʃən/",
      "translation": "bir beklenti"
    },
    "plural": {
      "form": "expectations",
      "phonetic": "/ˌek.spekˈteɪ.ʃənz/",
      "translation": "beklentiler"
    },
    "possessivePhrase": {
      "form": "customer expectation",
      "translation": "müşteri beklentisi"
    },
    "determinerPhrase": {
      "form": "these high expectations",
      "translation": "bu yüksek beklentiler"
    }
  },
  {
    "id": "noun_288",
    "rank": 288,
    "word": "Expense",
    "phonetic": "/ɪkˈspens/",
    "translation": "Gider / Masraf",
    "exampleEn": "FinansApp provides visual charts to track daily personal expenses.",
    "grammarNote": "",
    "exampleTr": "FinansApp günlük kişisel giderleri takip etmek için görsel grafikler sunar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an expense",
      "phonetic": "/ɪkˈspens/",
      "translation": "bir gider"
    },
    "plural": {
      "form": "expenses",
      "phonetic": "/ɪkˈspen.sɪz/",
      "translation": "giderler"
    },
    "possessivePhrase": {
      "form": "monthly expense",
      "translation": "aylık gider"
    },
    "determinerPhrase": {
      "form": "these business expenses",
      "translation": "bu işletme giderleri"
    }
  },
  {
    "id": "noun_289",
    "rank": 289,
    "word": "Experiment",
    "phonetic": "/ɪkˈsper.ɪ.mənt/",
    "translation": "Deney / Deneme",
    "exampleEn": "We ran twenty experiments to determine the optimal neural network learning rate.",
    "grammarNote": "",
    "exampleTr": "En uygun yapay sinir ağı öğrenme oranını belirlemek için yirmi deney yaptık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an experiment",
      "phonetic": "/ɪkˈsper.ɪ.mənt/",
      "translation": "bir deney"
    },
    "plural": {
      "form": "experiments",
      "phonetic": "/ɪkˈsper.ɪ.mənts/",
      "translation": "deneyler"
    },
    "possessivePhrase": {
      "form": "an empirical experiment",
      "translation": "ampirik bir deney"
    },
    "determinerPhrase": {
      "form": "these AI experiments",
      "translation": "bu yapay zeka deneyleri"
    }
  },
  {
    "id": "noun_290",
    "rank": 290,
    "word": "Explanation",
    "phonetic": "/ˌek.spləˈneɪ.ʃən/",
    "translation": "Açıklama / İzah",
    "exampleEn": "The documentation provides a clear step-by-step explanation for each topic.",
    "grammarNote": "",
    "exampleTr": "Dokümantasyon her konu için net adım adım bir açıklama sağlar.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an explanation",
      "phonetic": "/ˌek.spləˈneɪ.ʃən/",
      "translation": "bir açıklama"
    },
    "plural": {
      "form": "explanations",
      "phonetic": "/ˌek.spləˈneɪ.ʃənz/",
      "translation": "açıklamalar"
    },
    "possessivePhrase": {
      "form": "a clear explanation",
      "translation": "net bir açıklama"
    },
    "determinerPhrase": {
      "form": "these technical explanations",
      "translation": "bu teknik açıklamalar"
    }
  },
  {
    "id": "noun_291",
    "rank": 291,
    "word": "Extension",
    "phonetic": "/ɪkˈsten.ʃən/",
    "translation": "Eklenti / Uzantı",
    "exampleEn": "I installed an AI-assisted autocompletion extension in VS Code.",
    "grammarNote": "",
    "exampleTr": "VS Code'a yapay zeka destekli bir otomatik tamamlama eklentisi kurdum.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an extension",
      "phonetic": "/ɪkˈsten.ʃən/",
      "translation": "bir eklenti / uzantı"
    },
    "plural": {
      "form": "extensions",
      "phonetic": "/ɪkˈsten.ʃənz/",
      "translation": "eklentiler"
    },
    "possessivePhrase": {
      "form": "a VS Code extension",
      "translation": "bir VS Code eklentisi"
    },
    "determinerPhrase": {
      "form": "these file extensions",
      "translation": "bu dosya uzantıları"
    }
  },
  {
    "id": "noun_292",
    "rank": 292,
    "word": "Factor",
    "phonetic": "/ˈfæk.tər/",
    "translation": "Faktör / Etken",
    "exampleEn": "Low network latency is a decisive factor for online gaming platforms.",
    "grammarNote": "",
    "exampleTr": "Düşük ağ gecikmesi çevrim içi oyun platformları için belirleyici bir faktördür.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a factor",
      "phonetic": "/ˈfæk.tər/",
      "translation": "bir etken"
    },
    "plural": {
      "form": "factors",
      "phonetic": "/ˈfæk.tərz/",
      "translation": "etkenler"
    },
    "possessivePhrase": {
      "form": "the key factor",
      "translation": "anahtar etken"
    },
    "determinerPhrase": {
      "form": "these critical factors",
      "translation": "bu kritik faktörler"
    }
  },
  {
    "id": "noun_293",
    "rank": 293,
    "word": "Failure",
    "phonetic": "/ˈfeɪ.ljər/",
    "translation": "Arıza / Başarısızlık",
    "exampleEn": "Redundant server clusters prevent catastrophic single-point hardware failures.",
    "grammarNote": "",
    "exampleTr": "Yedekli sunucu kümeleri feci tek nokta donanım arızalarını önler.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a failure",
      "phonetic": "/ˈfeɪ.ljər/",
      "translation": "bir arıza"
    },
    "plural": {
      "form": "failures",
      "phonetic": "/ˈfeɪ.ljərz/",
      "translation": "arızalar"
    },
    "possessivePhrase": {
      "form": "a hardware failure",
      "translation": "bir donanım arızası"
    },
    "determinerPhrase": {
      "form": "these cascading failures",
      "translation": "bu basamaklı arızalar"
    }
  },
  {
    "id": "noun_294",
    "rank": 294,
    "word": "Feedback",
    "phonetic": "/ˈfiːd.bæk/",
    "translation": "Geri Bildirim",
    "exampleEn": "We collected valuable user feedback during our mobile beta testing phase.",
    "grammarNote": "",
    "exampleTr": "Mobil beta test aşamamız sırasında değerli kullanıcı geri bildirimleri topladık.",
    "partOfSpeech": "noun",
    "countable": false,
    "singular": {
      "form": "feedback",
      "phonetic": "/ˈfiːd.bæk/",
      "translation": "geri bildirim"
    },
    "partitiveUnit": {
      "form": "user feedback",
      "translation": "kullanıcı geri bildirimi"
    },
    "possessivePhrase": {
      "form": "constructive feedback",
      "translation": "yapıcı geri bildirim"
    },
    "determinerPhrase": {
      "form": "this positive feedback",
      "translation": "bu olumlu geri bildirim"
    }
  },
  {
    "id": "noun_295",
    "rank": 295,
    "word": "Flow",
    "phonetic": "/fləʊ/",
    "translation": "Akış / İş Akışı",
    "exampleEn": "We redesigned the payment checkout flow to reduce cart abandonment.",
    "grammarNote": "",
    "exampleTr": "Sepeti terk etme oranını azaltmak için ödeme tamamlama akışını yeniden tasarladık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a flow",
      "phonetic": "/fləʊ/",
      "translation": "bir akış"
    },
    "plural": {
      "form": "flows",
      "phonetic": "/fləʊz/",
      "translation": "akışlar"
    },
    "possessivePhrase": {
      "form": "the user onboarding flow",
      "translation": "kullanıcı karşılama akışı"
    },
    "determinerPhrase": {
      "form": "these data flows",
      "translation": "bu veri akışları"
    }
  },
  {
    "id": "noun_296",
    "rank": 296,
    "word": "Function",
    "phonetic": "/ˈfʌŋk.ʃən/",
    "translation": "Fonksiyon / İşlev",
    "exampleEn": "In Kotlin, higher-order functions can accept other functions as parameters.",
    "grammarNote": "",
    "exampleTr": "Kotlin'de yüksek dereceli fonksiyonlar diğer fonksiyonları parametre olarak kabul edebilir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a function",
      "phonetic": "/ˈfʌŋk.ʃən/",
      "translation": "bir fonksiyon"
    },
    "plural": {
      "form": "functions",
      "phonetic": "/ˈfʌŋk.ʃənz/",
      "translation": "fonksiyonlar"
    },
    "possessivePhrase": {
      "form": "a lambda function",
      "translation": "bir lambda fonksiyonu"
    },
    "determinerPhrase": {
      "form": "these recursive functions",
      "translation": "bu özyinelemeli fonksiyonlar"
    }
  },
  {
    "id": "noun_297",
    "rank": 297,
    "word": "Goal",
    "phonetic": "/ɡəʊl/",
    "translation": "Hedef / Amaç",
    "exampleEn": "Our primary engineering goal is achieving 99.99% server availability.",
    "grammarNote": "",
    "exampleTr": "Birincil mühendislik hedefimiz %99.99 sunucu erişilebilirliğine ulaşmaktır.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a goal",
      "phonetic": "/ɡəʊl/",
      "translation": "bir hedef"
    },
    "plural": {
      "form": "goals",
      "phonetic": "/ɡəʊlz/",
      "translation": "hedefler"
    },
    "possessivePhrase": {
      "form": "our sprint goal",
      "translation": "bizim sprint hedefimiz"
    },
    "determinerPhrase": {
      "form": "these ambitious goals",
      "translation": "bu iddialı hedefler"
    }
  },
  {
    "id": "noun_298",
    "rank": 298,
    "word": "Interface",
    "phonetic": "/ˈɪn.tə.feɪs/",
    "translation": "Arayüz (Kullanıcı / Kod)",
    "exampleEn": "Jetpack Compose makes building intuitive user interfaces fast and declarative.",
    "grammarNote": "",
    "exampleTr": "Jetpack Compose sezgisel kullanıcı arayüzleri oluşturmayı hızlı ve bildirimsel hale getirir.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "an interface",
      "phonetic": "/ˈɪn.tə.feɪs/",
      "translation": "bir arayüz"
    },
    "plural": {
      "form": "interfaces",
      "phonetic": "/ˈɪn.tə.feɪ.sɪz/",
      "translation": "arayüzler"
    },
    "possessivePhrase": {
      "form": "the user interface (UI)",
      "translation": "kullanıcı arayüzü"
    },
    "determinerPhrase": {
      "form": "these clean interfaces",
      "translation": "bu temiz arayüzler"
    }
  },
  {
    "id": "noun_299",
    "rank": 299,
    "word": "Module",
    "phonetic": "/ˈmɒdʒ.uːl/",
    "translation": "Modül / Bağımsız Bölüm",
    "exampleEn": "We separated the payment gateway into an independent Gradle module.",
    "grammarNote": "",
    "exampleTr": "Ödeme ağ geçidini bağımsız bir Gradle modülüne ayırdık.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a module",
      "phonetic": "/ˈmɒdʒ.uːl/",
      "translation": "bir modül"
    },
    "plural": {
      "form": "modules",
      "phonetic": "/ˈmɒdʒ.uːlz/",
      "translation": "modüller"
    },
    "possessivePhrase": {
      "form": "the auth module",
      "translation": "kimlik doğrulama modülü"
    },
    "determinerPhrase": {
      "form": "these decoupled modules",
      "translation": "bu bağımsız modüller"
    }
  },
  {
    "id": "noun_300",
    "rank": 300,
    "word": "Strategy",
    "phonetic": "/ˈstræt.ə.dʒi/",
    "translation": "Strateji (Düzensiz -ies)",
    "exampleEn": "Implementing a multi-level caching strategy reduced our cloud bills by 35%.",
    "grammarNote": "",
    "exampleTr": "Çok seviyeli bir önbellekleme stratejisi uygulamak bulut faturalarımızı %35 azalttı.",
    "partOfSpeech": "noun",
    "countable": true,
    "singular": {
      "form": "a strategy",
      "phonetic": "/ˈstræt.ə.dʒi/",
      "translation": "bir strateji"
    },
    "plural": {
      "form": "strategies",
      "phonetic": "/ˈstræt.ə.dʒiz/",
      "translation": "stratejiler"
    },
    "possessivePhrase": {
      "form": "a caching strategy",
      "translation": "bir önbellekleme stratejisi"
    },
    "determinerPhrase": {
      "form": "these deployment strategies",
      "translation": "bu dağıtım stratejileri"
    }
  }
] as LibraryWordEntry[];

export const VERBS_100: LibraryWordEntry[] = [
  {
    "id": "verb_001",
    "rank": 1,
    "word": "Ask",
    "phonetic": "/æsk/",
    "translation": "Sormak",
    "exampleEn": "I asked my teacher for help yesterday.",
    "grammarNote": "",
    "exampleTr": "Öğretmenime dün yardım için sordum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I ask",
      "translation": "Sorarım"
    },
    "presentContinuous": {
      "form": "I am asking",
      "translation": "Soruyorum"
    },
    "future": {
      "form": "I will ask",
      "translation": "Soracağım"
    },
    "pastSimple": {
      "form": "I ask",
      "translation": "Sorarım"
    }
  },
  {
    "id": "verb_002",
    "rank": 2,
    "word": "Call",
    "phonetic": "/kɔːl/",
    "translation": "Aramak / Çağırmak",
    "exampleEn": "I am calling my friend to invite him to the party.",
    "grammarNote": "",
    "exampleTr": "Arkadaşımı partiye davet etmek için arıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I call",
      "translation": "Ararım"
    },
    "presentContinuous": {
      "form": "I am calling",
      "translation": "Arıyorum"
    },
    "future": {
      "form": "I will call",
      "translation": "Arayacağım"
    },
    "pastSimple": {
      "form": "I call",
      "translation": "Ararım"
    }
  },
  {
    "id": "verb_003",
    "rank": 3,
    "word": "Come",
    "phonetic": "/kʌm/",
    "translation": "Gelmek",
    "exampleEn": "I will come to your house tomorrow evening.",
    "grammarNote": "",
    "exampleTr": "Yarın akşam senin evine geleceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I come",
      "translation": "Gelirim"
    },
    "presentContinuous": {
      "form": "I am coming",
      "translation": "Geliyorum"
    },
    "future": {
      "form": "I will come",
      "translation": "Geleceğim"
    },
    "pastSimple": {
      "form": "I come",
      "translation": "Gelirim"
    }
  },
  {
    "id": "verb_004",
    "rank": 4,
    "word": "Do",
    "phonetic": "/duː/",
    "translation": "Yapmak",
    "exampleEn": "I am doing my homework right now.",
    "grammarNote": "",
    "exampleTr": "Şu anda ödevimi yapıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I do",
      "translation": "Yaparım"
    },
    "presentContinuous": {
      "form": "I am doing",
      "translation": "Yapıyorum"
    },
    "future": {
      "form": "I will do",
      "translation": "Yapacağım"
    },
    "pastSimple": {
      "form": "I do",
      "translation": "Yaparım"
    }
  },
  {
    "id": "verb_005",
    "rank": 5,
    "word": "Eat",
    "phonetic": "/iːt/",
    "translation": "Yemek",
    "exampleEn": "I ate breakfast an hour ago.",
    "grammarNote": "",
    "exampleTr": "Bir saat önce kahvaltı yaptım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I eat",
      "translation": "Yerim"
    },
    "presentContinuous": {
      "form": "I am eating",
      "translation": "Yiyorum"
    },
    "future": {
      "form": "I will eat",
      "translation": "Yiyeceğim"
    },
    "pastSimple": {
      "form": "I eat",
      "translation": "Yerim"
    }
  },
  {
    "id": "verb_006",
    "rank": 6,
    "word": "Find",
    "phonetic": "/faɪnd/",
    "translation": "Bulmak",
    "exampleEn": "I found a solution to the software bug yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün yazılım hatasına bir çözüm buldum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I find",
      "translation": "Bulurum"
    },
    "presentContinuous": {
      "form": "I am finding",
      "translation": "Buluyorum"
    },
    "future": {
      "form": "I will find",
      "translation": "Bulacağım"
    },
    "pastSimple": {
      "form": "I find",
      "translation": "Bulurum"
    }
  },
  {
    "id": "verb_007",
    "rank": 7,
    "word": "Get",
    "phonetic": "/ɡet/",
    "translation": "Almak / Edinmek",
    "exampleEn": "I got a new book from the library yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün kütüphaneden yeni bir kitap aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I get",
      "translation": "Alırım"
    },
    "presentContinuous": {
      "form": "I am geting",
      "translation": "Alıyorum"
    },
    "future": {
      "form": "I will get",
      "translation": "Alacağım"
    },
    "pastSimple": {
      "form": "I get",
      "translation": "Alırım"
    }
  },
  {
    "id": "verb_008",
    "rank": 8,
    "word": "Give",
    "phonetic": "/ɡɪv/",
    "translation": "Vermek",
    "exampleEn": "I am giving my friend a gift for her birthday.",
    "grammarNote": "",
    "exampleTr": "Arkadaşıma doğum günü için bir hediye veriyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I give",
      "translation": "Veririm"
    },
    "presentContinuous": {
      "form": "I am giving",
      "translation": "Veriyorum"
    },
    "future": {
      "form": "I will give",
      "translation": "Vereceğim"
    },
    "pastSimple": {
      "form": "I give",
      "translation": "Veririm"
    }
  },
  {
    "id": "verb_009",
    "rank": 9,
    "word": "Go",
    "phonetic": "/ɡəʊ/",
    "translation": "Gitmek",
    "exampleEn": "I go to the gym three times a week.",
    "grammarNote": "",
    "exampleTr": "Haftada üç kez spor salonuna giderim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I go",
      "translation": "Giderim"
    },
    "presentContinuous": {
      "form": "I am going",
      "translation": "Gidiyorum"
    },
    "future": {
      "form": "I will go",
      "translation": "Gideceğim"
    },
    "pastSimple": {
      "form": "I go",
      "translation": "Giderim"
    }
  },
  {
    "id": "verb_010",
    "rank": 10,
    "word": "Have",
    "phonetic": "/hæv/",
    "translation": "Sahip olmak",
    "exampleEn": "I had an important meeting with my team this morning.",
    "grammarNote": "",
    "exampleTr": "Bu sabah ekibimle önemli bir toplantım vardı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I have",
      "translation": "Sahibim / Sahip olurum"
    },
    "presentContinuous": {
      "form": "I am having",
      "translation": "Sahip oluyorum"
    },
    "future": {
      "form": "I will have",
      "translation": "Sahip olacağım"
    },
    "pastSimple": {
      "form": "I have",
      "translation": "Sahibim / Sahip olurum"
    }
  },
  {
    "id": "verb_011",
    "rank": 11,
    "word": "Help",
    "phonetic": "/help/",
    "translation": "Yardım etmek",
    "exampleEn": "I am helping my colleague with his code review.",
    "grammarNote": "",
    "exampleTr": "İş arkadaşıma kod incelemesinde yardım ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I help",
      "translation": "Yardım ederim"
    },
    "presentContinuous": {
      "form": "I am helping",
      "translation": "Yardım ediyorum"
    },
    "future": {
      "form": "I will help",
      "translation": "Yardım edeceğim"
    },
    "pastSimple": {
      "form": "I help",
      "translation": "Yardım ederim"
    }
  },
  {
    "id": "verb_012",
    "rank": 12,
    "word": "Keep",
    "phonetic": "/kiːp/",
    "translation": "Tutmak / Saklamak",
    "exampleEn": "I will keep this confidential document in a secure folder.",
    "grammarNote": "",
    "exampleTr": "Bu gizli belgeyi güvenli bir klasörde saklayacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I keep",
      "translation": "Tutarım / Saklarım"
    },
    "presentContinuous": {
      "form": "I am keeping",
      "translation": "Tutuyorum / Saklıyorum"
    },
    "future": {
      "form": "I will keep",
      "translation": "Tutacağım / Saklayacağım"
    },
    "pastSimple": {
      "form": "I keep",
      "translation": "Tutarım / Saklarım"
    }
  },
  {
    "id": "verb_013",
    "rank": 13,
    "word": "Leave",
    "phonetic": "/liːv/",
    "translation": "Ayrılmak / Terk etmek",
    "exampleEn": "I will leave the office at 6 PM today.",
    "grammarNote": "",
    "exampleTr": "Bugün ofisten saat 18:00'de ayrılacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I leave",
      "translation": "Ayrılırım"
    },
    "presentContinuous": {
      "form": "I am leaving",
      "translation": "Ayrılıyorum"
    },
    "future": {
      "form": "I will leave",
      "translation": "Ayrılacağım"
    },
    "pastSimple": {
      "form": "I leave",
      "translation": "Ayrılırım"
    }
  },
  {
    "id": "verb_014",
    "rank": 14,
    "word": "Listen",
    "phonetic": "/ˈlɪs.ən/",
    "translation": "Dinlemek",
    "exampleEn": "I am listening to an English learning podcast right now.",
    "grammarNote": "",
    "exampleTr": "Şu anda bir İngilizce öğrenme podcast'i dinliyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I listen",
      "translation": "Dinlerim"
    },
    "presentContinuous": {
      "form": "I am listening",
      "translation": "Dinliyorum"
    },
    "future": {
      "form": "I will listen",
      "translation": "Dinleyeceğim"
    },
    "pastSimple": {
      "form": "I listen",
      "translation": "Dinlerim"
    }
  },
  {
    "id": "verb_015",
    "rank": 15,
    "word": "Look",
    "phonetic": "/lʊk/",
    "translation": "Bakmak",
    "exampleEn": "I looked out the window and saw the heavy rain.",
    "grammarNote": "",
    "exampleTr": "Pencereden dışarı baktım ve şiddetli yağmuru gördüm.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I look",
      "translation": "Bakarım"
    },
    "presentContinuous": {
      "form": "I am looking",
      "translation": "Bakıyorum"
    },
    "future": {
      "form": "I will look",
      "translation": "Bakacağım"
    },
    "pastSimple": {
      "form": "I look",
      "translation": "Bakarım"
    }
  },
  {
    "id": "verb_016",
    "rank": 16,
    "word": "Make",
    "phonetic": "/meɪk/",
    "translation": "Yapmak / Üretmek",
    "exampleEn": "I make a detailed study plan every Sunday.",
    "grammarNote": "",
    "exampleTr": "Her pazar günü detaylı bir çalışma planı yaparım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I make",
      "translation": "Yaparım"
    },
    "presentContinuous": {
      "form": "I am making",
      "translation": "Yapıyorum"
    },
    "future": {
      "form": "I will make",
      "translation": "Yapacağım"
    },
    "pastSimple": {
      "form": "I make",
      "translation": "Yaparım"
    }
  },
  {
    "id": "verb_017",
    "rank": 17,
    "word": "Move",
    "phonetic": "/muːv/",
    "translation": "Taşınmak / Hareket etmek",
    "exampleEn": "I moved to a new apartment in the city center last month.",
    "grammarNote": "",
    "exampleTr": "Geçen ay şehir merkezinde yeni bir daireye taşındım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I move",
      "translation": "Taşınırım / Hareket ederim"
    },
    "presentContinuous": {
      "form": "I am moving",
      "translation": "Taşınıyorum / Hareket ediyorum"
    },
    "future": {
      "form": "I will move",
      "translation": "Taşınacağım / Hareket edeceğim"
    },
    "pastSimple": {
      "form": "I move",
      "translation": "Taşınırım / Hareket ederim"
    }
  },
  {
    "id": "verb_018",
    "rank": 18,
    "word": "Open",
    "phonetic": "/ˈəʊ.pən/",
    "translation": "Açmak",
    "exampleEn": "I am opening the window because the room is too hot.",
    "grammarNote": "",
    "exampleTr": "Oda çok sıcak olduğu için pencereyi açıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I open",
      "translation": "Açarım"
    },
    "presentContinuous": {
      "form": "I am opening",
      "translation": "Açıyorum"
    },
    "future": {
      "form": "I will open",
      "translation": "Açacağım"
    },
    "pastSimple": {
      "form": "I open",
      "translation": "Açarım"
    }
  },
  {
    "id": "verb_019",
    "rank": 19,
    "word": "Play",
    "phonetic": "/pleɪ/",
    "translation": "Oynamak / Çalmak",
    "exampleEn": "I played football with my university friends yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün üniversite arkadaşlarımla futbol oynadım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I play",
      "translation": "Oynarım / Çalarım"
    },
    "presentContinuous": {
      "form": "I am playing",
      "translation": "Oynuyorum / Çalıyorum"
    },
    "future": {
      "form": "I will play",
      "translation": "Oynayacağım / Çalacağım"
    },
    "pastSimple": {
      "form": "I play",
      "translation": "Oynarım / Çalarım"
    }
  },
  {
    "id": "verb_020",
    "rank": 20,
    "word": "Put",
    "phonetic": "/pʊt/",
    "translation": "Koymak / Yerleştirmek",
    "exampleEn": "I am putting my laptop and notebook into my backpack.",
    "grammarNote": "",
    "exampleTr": "Dizüstü bilgisayarımı ve defterimi sırt çantama koyuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I put",
      "translation": "Koyarım"
    },
    "presentContinuous": {
      "form": "I am putting",
      "translation": "Koyuyorum"
    },
    "future": {
      "form": "I will put",
      "translation": "Koyacağım"
    },
    "pastSimple": {
      "form": "I put",
      "translation": "Koyarım"
    }
  },
  {
    "id": "verb_021",
    "rank": 21,
    "word": "Read",
    "phonetic": "/riːd/",
    "translation": "Okumak",
    "exampleEn": "I read technical articles every morning before work.",
    "grammarNote": "",
    "exampleTr": "Her sabah işten önce teknik makaleler okurum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I read",
      "translation": "Okurum"
    },
    "presentContinuous": {
      "form": "I am reading",
      "translation": "Okuyorum"
    },
    "future": {
      "form": "I will read",
      "translation": "Okuyacağım"
    },
    "pastSimple": {
      "form": "I read",
      "translation": "Okurum"
    }
  },
  {
    "id": "verb_022",
    "rank": 22,
    "word": "Run",
    "phonetic": "/rʌn/",
    "translation": "Koşmak / Çalıştırmak",
    "exampleEn": "I ran to catch the morning train today.",
    "grammarNote": "",
    "exampleTr": "Bugün sabah trenine yetişmek için koştum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I run",
      "translation": "Koşarım / Çalıştırırım"
    },
    "presentContinuous": {
      "form": "I am running",
      "translation": "Koşuyorum / Çalıştırıyorum"
    },
    "future": {
      "form": "I will run",
      "translation": "Koşacağım / Çalıştıracağım"
    },
    "pastSimple": {
      "form": "I run",
      "translation": "Koşarım / Çalıştırırım"
    }
  },
  {
    "id": "verb_023",
    "rank": 23,
    "word": "Say",
    "phonetic": "/seɪ/",
    "translation": "Söylemek",
    "exampleEn": "I always say hello to my neighbors in the morning.",
    "grammarNote": "",
    "exampleTr": "Sabahları komşularıma her zaman merhaba derim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I say",
      "translation": "Söylerim"
    },
    "presentContinuous": {
      "form": "I am saying",
      "translation": "Söylüyorum"
    },
    "future": {
      "form": "I will say",
      "translation": "Söyleyeceğim"
    },
    "pastSimple": {
      "form": "I say",
      "translation": "Söylerim"
    }
  },
  {
    "id": "verb_024",
    "rank": 24,
    "word": "See",
    "phonetic": "/siː/",
    "translation": "Görmek",
    "exampleEn": "I saw an interesting job advertisement yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün ilginç bir iş ilanı gördüm.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I see",
      "translation": "Görürüm"
    },
    "presentContinuous": {
      "form": "I am seeing",
      "translation": "Görüyorum"
    },
    "future": {
      "form": "I will see",
      "translation": "Göreceğim"
    },
    "pastSimple": {
      "form": "I see",
      "translation": "Görürüm"
    }
  },
  {
    "id": "verb_025",
    "rank": 25,
    "word": "Send",
    "phonetic": "/send/",
    "translation": "Göndermek",
    "exampleEn": "I will send the project report to the manager tomorrow.",
    "grammarNote": "",
    "exampleTr": "Proje raporunu yarın yöneticiye göndereceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I send",
      "translation": "Gönderirim"
    },
    "presentContinuous": {
      "form": "I am sending",
      "translation": "Gönderiyorum"
    },
    "future": {
      "form": "I will send",
      "translation": "Göndereceğim"
    },
    "pastSimple": {
      "form": "I send",
      "translation": "Gönderirim"
    }
  },
  {
    "id": "verb_026",
    "rank": 26,
    "word": "Show",
    "phonetic": "/ʃəʊ/",
    "translation": "Göstermek",
    "exampleEn": "I showed my mobile application prototype to the team.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulama prototipimi ekibe gösterdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I show",
      "translation": "Gösteririm"
    },
    "presentContinuous": {
      "form": "I am showing",
      "translation": "Gösteriyorum"
    },
    "future": {
      "form": "I will show",
      "translation": "Göstereceğim"
    },
    "pastSimple": {
      "form": "I show",
      "translation": "Gösteririm"
    }
  },
  {
    "id": "verb_027",
    "rank": 27,
    "word": "Sit",
    "phonetic": "/sɪt/",
    "translation": "Oturmak",
    "exampleEn": "I am sitting at my desk and typing code.",
    "grammarNote": "",
    "exampleTr": "Masamda oturuyorum ve kod yazıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I sit",
      "translation": "Otururum"
    },
    "presentContinuous": {
      "form": "I am sitting",
      "translation": "Oturuyorum"
    },
    "future": {
      "form": "I will sit",
      "translation": "Oturacağım"
    },
    "pastSimple": {
      "form": "I sit",
      "translation": "Otururum"
    }
  },
  {
    "id": "verb_028",
    "rank": 28,
    "word": "Sleep",
    "phonetic": "/sliːp/",
    "translation": "Uyumak",
    "exampleEn": "I slept for eight hours last night and feel energetic.",
    "grammarNote": "",
    "exampleTr": "Dün gece sekiz saat uyudum ve enerjik hissediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I sleep",
      "translation": "Uyurum"
    },
    "presentContinuous": {
      "form": "I am sleeping",
      "translation": "Uyuyorum"
    },
    "future": {
      "form": "I will sleep",
      "translation": "Uyuyacağım"
    },
    "pastSimple": {
      "form": "I sleep",
      "translation": "Uyurum"
    }
  },
  {
    "id": "verb_029",
    "rank": 29,
    "word": "Speak",
    "phonetic": "/spiːk/",
    "translation": "Konuşmak",
    "exampleEn": "I speak English and Turkish fluently.",
    "grammarNote": "",
    "exampleTr": "İngilizce ve Türkçeyi akıcı bir şekilde konuşurum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I speak",
      "translation": "Konuşurum"
    },
    "presentContinuous": {
      "form": "I am speaking",
      "translation": "Konuşuyorum"
    },
    "future": {
      "form": "I will speak",
      "translation": "Konuşacağım"
    },
    "pastSimple": {
      "form": "I speak",
      "translation": "Konuşurum"
    }
  },
  {
    "id": "verb_030",
    "rank": 30,
    "word": "Stand",
    "phonetic": "/stænd/",
    "translation": "Ayakta durmak",
    "exampleEn": "I stood in the ticket line for twenty minutes yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün bilet kuyruğunda yirmi dakika ayakta bekledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I stand",
      "translation": "Dururum"
    },
    "presentContinuous": {
      "form": "I am standing",
      "translation": "Duruyorum"
    },
    "future": {
      "form": "I will stand",
      "translation": "Duracağım"
    },
    "pastSimple": {
      "form": "I stand",
      "translation": "Dururum"
    }
  },
  {
    "id": "verb_031",
    "rank": 31,
    "word": "Start",
    "phonetic": "/stɑːt/",
    "translation": "Başlamak",
    "exampleEn": "I will start a new software project next Monday.",
    "grammarNote": "",
    "exampleTr": "Gelecek pazartesi yeni bir yazılım projesine başlayacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I start",
      "translation": "Başlarım"
    },
    "presentContinuous": {
      "form": "I am starting",
      "translation": "Başlıyorum"
    },
    "future": {
      "form": "I will start",
      "translation": "Başlayacağım"
    },
    "pastSimple": {
      "form": "I start",
      "translation": "Başlarım"
    }
  },
  {
    "id": "verb_032",
    "rank": 32,
    "word": "Stop",
    "phonetic": "/stɒp/",
    "translation": "Durmak / Durdurmak",
    "exampleEn": "I stopped the car at the red traffic light.",
    "grammarNote": "",
    "exampleTr": "Kırmızı trafik ışığında arabayı durdurdum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I stop",
      "translation": "Dururum / Durdururum"
    },
    "presentContinuous": {
      "form": "I am stopping",
      "translation": "Duruyorum / Durduruyorum"
    },
    "future": {
      "form": "I will stop",
      "translation": "Duracağım / Durduracağım"
    },
    "pastSimple": {
      "form": "I stop",
      "translation": "Dururum / Durdururum"
    }
  },
  {
    "id": "verb_033",
    "rank": 33,
    "word": "Study",
    "phonetic": "/ˈstʌd.i/",
    "translation": "Ders çalışmak",
    "exampleEn": "I am studying computer engineering at university.",
    "grammarNote": "",
    "exampleTr": "Üniversitede bilgisayar mühendisliği okuyorum / çalışıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I study",
      "translation": "Çalışırım"
    },
    "presentContinuous": {
      "form": "I am studying",
      "translation": "Çalışıyorum"
    },
    "future": {
      "form": "I will study",
      "translation": "Çalışacağım"
    },
    "pastSimple": {
      "form": "I study",
      "translation": "Çalışırım"
    }
  },
  {
    "id": "verb_034",
    "rank": 34,
    "word": "Take",
    "phonetic": "/teɪk/",
    "translation": "Almak / Götürmek",
    "exampleEn": "I took an umbrella because the sky was cloudy.",
    "grammarNote": "",
    "exampleTr": "Gökyüzü bulutlu olduğu için bir şemsiye aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I take",
      "translation": "Alırım / Götürürüm"
    },
    "presentContinuous": {
      "form": "I am taking",
      "translation": "Alıyorum / Götürüyorum"
    },
    "future": {
      "form": "I will take",
      "translation": "Alacağım / Götüreceğim"
    },
    "pastSimple": {
      "form": "I take",
      "translation": "Alırım / Götürürüm"
    }
  },
  {
    "id": "verb_035",
    "rank": 35,
    "word": "Talk",
    "phonetic": "/tɔːk/",
    "translation": "Konuşmak / Sohbet etmek",
    "exampleEn": "I am talking to my project supervisor right now.",
    "grammarNote": "",
    "exampleTr": "Şu anda proje danışmanımla konuşuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I talk",
      "translation": "Konuşurum"
    },
    "presentContinuous": {
      "form": "I am talking",
      "translation": "Konuşuyorum"
    },
    "future": {
      "form": "I will talk",
      "translation": "Konuşacağım"
    },
    "pastSimple": {
      "form": "I talk",
      "translation": "Konuşurum"
    }
  },
  {
    "id": "verb_036",
    "rank": 36,
    "word": "Teach",
    "phonetic": "/tiːtʃ/",
    "translation": "Öğretmek",
    "exampleEn": "I will teach basic programming concepts to beginner students.",
    "grammarNote": "",
    "exampleTr": "Başlangıç seviyesindeki öğrencilere temel programlama kavramlarını öğreteceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I teach",
      "translation": "Öğretirim"
    },
    "presentContinuous": {
      "form": "I am teaching",
      "translation": "Öğretiyorum"
    },
    "future": {
      "form": "I will teach",
      "translation": "Öğreteceğim"
    },
    "pastSimple": {
      "form": "I teach",
      "translation": "Öğretirim"
    }
  },
  {
    "id": "verb_037",
    "rank": 37,
    "word": "Tell",
    "phonetic": "/tel/",
    "translation": "Anlatmak / Söylemek",
    "exampleEn": "I told my parents about my new job offer yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün aileme yeni iş teklifimden bahsettim / anlattım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I tell",
      "translation": "Anlatırım"
    },
    "presentContinuous": {
      "form": "I am telling",
      "translation": "Anlatıyorum"
    },
    "future": {
      "form": "I will tell",
      "translation": "Anlatacağım"
    },
    "pastSimple": {
      "form": "I tell",
      "translation": "Anlatırım"
    }
  },
  {
    "id": "verb_038",
    "rank": 38,
    "word": "Try",
    "phonetic": "/traɪ/",
    "translation": "Denemek / Çabalamak",
    "exampleEn": "I am trying to solve this difficult algorithmic problem.",
    "grammarNote": "",
    "exampleTr": "Bu zor algoritmik problemi çözmeye çalışıyorum / deniyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I try",
      "translation": "Denerim"
    },
    "presentContinuous": {
      "form": "I am trying",
      "translation": "Deniyorum"
    },
    "future": {
      "form": "I will try",
      "translation": "Deneyeceğim"
    },
    "pastSimple": {
      "form": "I try",
      "translation": "Denerim"
    }
  },
  {
    "id": "verb_039",
    "rank": 39,
    "word": "Turn",
    "phonetic": "/tɜːn/",
    "translation": "Dönmek / Çevirmek",
    "exampleEn": "I turned off the computer before going to sleep.",
    "grammarNote": "",
    "exampleTr": "Uyumadan önce bilgisayarı kapattım / çevirdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I turn",
      "translation": "Dönerim / Çeviririm"
    },
    "presentContinuous": {
      "form": "I am turning",
      "translation": "Dönüyorum / Çeviriyorum"
    },
    "future": {
      "form": "I will turn",
      "translation": "Döneceğim / Çevireceğim"
    },
    "pastSimple": {
      "form": "I turn",
      "translation": "Dönerim / Çeviririm"
    }
  },
  {
    "id": "verb_040",
    "rank": 40,
    "word": "Use",
    "phonetic": "/juːz/",
    "translation": "Kullanmak",
    "exampleEn": "I use Git for version control every day.",
    "grammarNote": "",
    "exampleTr": "Sürüm kontrolü için her gün Git kullanırım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I use",
      "translation": "Kullanırım"
    },
    "presentContinuous": {
      "form": "I am using",
      "translation": "Kullanıyorum"
    },
    "future": {
      "form": "I will use",
      "translation": "Kullanacağım"
    },
    "pastSimple": {
      "form": "I use",
      "translation": "Kullanırım"
    }
  },
  {
    "id": "verb_041",
    "rank": 41,
    "word": "Wait",
    "phonetic": "/weɪt/",
    "translation": "Beklemek",
    "exampleEn": "I waited for the bus for thirty minutes this morning.",
    "grammarNote": "",
    "exampleTr": "Bu sabah otobüsü otuz dakika bekledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I wait",
      "translation": "Beklerim"
    },
    "presentContinuous": {
      "form": "I am waiting",
      "translation": "Bekliyorum"
    },
    "future": {
      "form": "I will wait",
      "translation": "Bekleyeceğim"
    },
    "pastSimple": {
      "form": "I wait",
      "translation": "Beklerim"
    }
  },
  {
    "id": "verb_042",
    "rank": 42,
    "word": "Walk",
    "phonetic": "/wɔːk/",
    "translation": "Yürümek",
    "exampleEn": "I walk in the park every morning to stay healthy.",
    "grammarNote": "",
    "exampleTr": "Sağlıklı kalmak için her sabah parkta yürürüm.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I walk",
      "translation": "Yürürüm"
    },
    "presentContinuous": {
      "form": "I am walking",
      "translation": "Yürüyorum"
    },
    "future": {
      "form": "I will walk",
      "translation": "Yürüyeceğim"
    },
    "pastSimple": {
      "form": "I walk",
      "translation": "Yürürüm"
    }
  },
  {
    "id": "verb_043",
    "rank": 43,
    "word": "Watch",
    "phonetic": "/wɒtʃ/",
    "translation": "İzlemek",
    "exampleEn": "I am watching a software development tutorial on YouTube.",
    "grammarNote": "",
    "exampleTr": "YouTube'da bir yazılım geliştirme eğitim videosu izliyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I watch",
      "translation": "İzlerim"
    },
    "presentContinuous": {
      "form": "I am watching",
      "translation": "İzliyorum"
    },
    "future": {
      "form": "I will watch",
      "translation": "İzleyeceğim"
    },
    "pastSimple": {
      "form": "I watch",
      "translation": "İzlerim"
    }
  },
  {
    "id": "verb_044",
    "rank": 44,
    "word": "Write",
    "phonetic": "/raɪt/",
    "translation": "Yazmak",
    "exampleEn": "I wrote an email to the client yesterday afternoon.",
    "grammarNote": "",
    "exampleTr": "Dün öğleden sonra müşteriye bir e-posta yazdım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I write",
      "translation": "Yazarım"
    },
    "presentContinuous": {
      "form": "I am writing",
      "translation": "Yazıyorum"
    },
    "future": {
      "form": "I will write",
      "translation": "Yazacağım"
    },
    "pastSimple": {
      "form": "I write",
      "translation": "Yazarım"
    }
  },
  {
    "id": "verb_045",
    "rank": 45,
    "word": "Bring",
    "phonetic": "/brɪŋ/",
    "translation": "Getirmek",
    "exampleEn": "I will bring my laptop to the team meeting tomorrow.",
    "grammarNote": "",
    "exampleTr": "Yarın ekip toplantısına dizüstü bilgisayarımı getireceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bring",
      "translation": "Getiririm"
    },
    "presentContinuous": {
      "form": "I am bringing",
      "translation": "Getiriyorum"
    },
    "future": {
      "form": "I will bring",
      "translation": "Getireceğim"
    },
    "pastSimple": {
      "form": "I bring",
      "translation": "Getiririm"
    }
  },
  {
    "id": "verb_046",
    "rank": 46,
    "word": "Build",
    "phonetic": "/bɪld/",
    "translation": "İnşa etmek / Kurmak",
    "exampleEn": "I am building a responsive mobile app with Compose.",
    "grammarNote": "",
    "exampleTr": "Compose ile duyarlı bir mobil uygulama inşa ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I build",
      "translation": "İnşa ederim"
    },
    "presentContinuous": {
      "form": "I am building",
      "translation": "İnşa ediyorum"
    },
    "future": {
      "form": "I will build",
      "translation": "İnşa edeceğim"
    },
    "pastSimple": {
      "form": "I build",
      "translation": "İnşa ederim"
    }
  },
  {
    "id": "verb_047",
    "rank": 47,
    "word": "Buy",
    "phonetic": "/baɪ/",
    "translation": "Satın almak",
    "exampleEn": "I bought a new mechanical keyboard last week.",
    "grammarNote": "",
    "exampleTr": "Geçen hafta yeni bir mekanik klavye satın aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I buy",
      "translation": "Satın alırım"
    },
    "presentContinuous": {
      "form": "I am buying",
      "translation": "Satın alıyorum"
    },
    "future": {
      "form": "I will buy",
      "translation": "Satın alacağım"
    },
    "pastSimple": {
      "form": "I buy",
      "translation": "Satın alırım"
    }
  },
  {
    "id": "verb_048",
    "rank": 48,
    "word": "Catch",
    "phonetic": "/kætʃ/",
    "translation": "Yakalamak",
    "exampleEn": "I caught the early morning flight to Istanbul.",
    "grammarNote": "",
    "exampleTr": "İstanbul'a giden sabah erken uçuşunu yakaladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I catch",
      "translation": "Yakalırım"
    },
    "presentContinuous": {
      "form": "I am catching",
      "translation": "Yakaliyorum"
    },
    "future": {
      "form": "I will catch",
      "translation": "Yakalayacağım"
    },
    "pastSimple": {
      "form": "I catch",
      "translation": "Yakalırım"
    }
  },
  {
    "id": "verb_049",
    "rank": 49,
    "word": "Change",
    "phonetic": "/tʃeɪndʒ/",
    "translation": "Değiştirmek",
    "exampleEn": "I changed my password to enhance account security.",
    "grammarNote": "",
    "exampleTr": "Hesap güvenliğini artırmak için şifremi değiştirdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I change",
      "translation": "Değiştiririm"
    },
    "presentContinuous": {
      "form": "I am changing",
      "translation": "Değiştiriyorum"
    },
    "future": {
      "form": "I will change",
      "translation": "Değiştireceğim"
    },
    "pastSimple": {
      "form": "I change",
      "translation": "Değiştiririm"
    }
  },
  {
    "id": "verb_050",
    "rank": 50,
    "word": "Clean",
    "phonetic": "/kliːn/",
    "translation": "Temizlemek",
    "exampleEn": "I am cleaning my desk before starting work.",
    "grammarNote": "",
    "exampleTr": "Çalışmaya başlamadan önce masamı temizliyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I clean",
      "translation": "Temizlerim"
    },
    "presentContinuous": {
      "form": "I am cleaning",
      "translation": "Temizliyorum"
    },
    "future": {
      "form": "I will clean",
      "translation": "Temizleyeceğim"
    },
    "pastSimple": {
      "form": "I clean",
      "translation": "Temizlerim"
    }
  },
  {
    "id": "verb_051",
    "rank": 51,
    "word": "Close",
    "phonetic": "/kləʊz/",
    "translation": "Kapatmak",
    "exampleEn": "I closed all open browser tabs to save memory.",
    "grammarNote": "",
    "exampleTr": "Bellekten tasarruf etmek için tüm açık tarayıcı sekmelerini kapattım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I close",
      "translation": "Kapatırım"
    },
    "presentContinuous": {
      "form": "I am closing",
      "translation": "Kapatıyorum"
    },
    "future": {
      "form": "I will close",
      "translation": "Kapatacağım"
    },
    "pastSimple": {
      "form": "I close",
      "translation": "Kapatırım"
    }
  },
  {
    "id": "verb_052",
    "rank": 52,
    "word": "Cook",
    "phonetic": "/kʊk/",
    "translation": "Yemek pişirmek",
    "exampleEn": "I will cook pasta with tomato sauce tonight.",
    "grammarNote": "",
    "exampleTr": "Bu akşam domates soslu makarna pişireceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cook",
      "translation": "Pişiririm"
    },
    "presentContinuous": {
      "form": "I am cooking",
      "translation": "Pişiriyorum"
    },
    "future": {
      "form": "I will cook",
      "translation": "Pişireceğim"
    },
    "pastSimple": {
      "form": "I cook",
      "translation": "Pişiririm"
    }
  },
  {
    "id": "verb_053",
    "rank": 53,
    "word": "Cut",
    "phonetic": "/kʌt/",
    "translation": "Kesmek",
    "exampleEn": "I am cutting the paper to make a note.",
    "grammarNote": "",
    "exampleTr": "Not almak için kağıdı kesiyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cut",
      "translation": "Keserim"
    },
    "presentContinuous": {
      "form": "I am cutting",
      "translation": "Kesiyorum"
    },
    "future": {
      "form": "I will cut",
      "translation": "Keseceğim"
    },
    "pastSimple": {
      "form": "I cut",
      "translation": "Keserim"
    }
  },
  {
    "id": "verb_054",
    "rank": 54,
    "word": "Dance",
    "phonetic": "/dɑːns/",
    "translation": "Dans etmek",
    "exampleEn": "I danced with my friends at the celebration party.",
    "grammarNote": "",
    "exampleTr": "Kutlama partisinde arkadaşlarımla dans ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I dance",
      "translation": "Dans ederim"
    },
    "presentContinuous": {
      "form": "I am dancing",
      "translation": "Dans ediyorum"
    },
    "future": {
      "form": "I will dance",
      "translation": "Dans edeceğim"
    },
    "pastSimple": {
      "form": "I dance",
      "translation": "Dans ederim"
    }
  },
  {
    "id": "verb_055",
    "rank": 55,
    "word": "Drink",
    "phonetic": "/drɪŋk/",
    "translation": "İçmek",
    "exampleEn": "I drink two cups of green tea every morning.",
    "grammarNote": "",
    "exampleTr": "Her sabah iki fincan yeşil çay içerim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I drink",
      "translation": "İçerim"
    },
    "presentContinuous": {
      "form": "I am drinking",
      "translation": "İçiyorum"
    },
    "future": {
      "form": "I will drink",
      "translation": "İçeceğim"
    },
    "pastSimple": {
      "form": "I drink",
      "translation": "İçerim"
    }
  },
  {
    "id": "verb_056",
    "rank": 56,
    "word": "Drive",
    "phonetic": "/draɪv/",
    "translation": "Sürmek / Arabayla gitmek",
    "exampleEn": "I drove to Ankara for a business conference yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün bir iş konferansı için arabayla Ankara'ya gittim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I drive",
      "translation": "Sürerim"
    },
    "presentContinuous": {
      "form": "I am driving",
      "translation": "Sürüyorum"
    },
    "future": {
      "form": "I will drive",
      "translation": "Süreceğim"
    },
    "pastSimple": {
      "form": "I drive",
      "translation": "Sürerim"
    }
  },
  {
    "id": "verb_057",
    "rank": 57,
    "word": "Fall",
    "phonetic": "/fɔːl/",
    "translation": "Düşmek",
    "exampleEn": "The temperature fell below zero last night.",
    "grammarNote": "",
    "exampleTr": "Dün gece sıcaklık sıfırın altına düştü.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fall",
      "translation": "Düşerim"
    },
    "presentContinuous": {
      "form": "I am falling",
      "translation": "Düşüyorum"
    },
    "future": {
      "form": "I will fall",
      "translation": "Düşeceğim"
    },
    "pastSimple": {
      "form": "I fall",
      "translation": "Düşerim"
    }
  },
  {
    "id": "verb_058",
    "rank": 58,
    "word": "Feed",
    "phonetic": "/fiːd/",
    "translation": "Beslemek",
    "exampleEn": "I am feeding the street cats outside my apartment.",
    "grammarNote": "",
    "exampleTr": "Apartmanımın dışındaki sokak kedilerini besliyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I feed",
      "translation": "Beslerim"
    },
    "presentContinuous": {
      "form": "I am feeding",
      "translation": "Besliyorum"
    },
    "future": {
      "form": "I will feed",
      "translation": "Besleyeceğim"
    },
    "pastSimple": {
      "form": "I feed",
      "translation": "Beslerim"
    }
  },
  {
    "id": "verb_059",
    "rank": 59,
    "word": "Fight",
    "phonetic": "/faɪt/",
    "translation": "Savaşmak / Mücadele etmek",
    "exampleEn": "We will fight for our digital privacy rights.",
    "grammarNote": "",
    "exampleTr": "Dijital gizlilik haklarımız için mücadele edeceğiz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fight",
      "translation": "Savaşırım"
    },
    "presentContinuous": {
      "form": "I am fighting",
      "translation": "Savaşıyorum"
    },
    "future": {
      "form": "I will fight",
      "translation": "Savaşacağım"
    },
    "pastSimple": {
      "form": "I fight",
      "translation": "Savaşırım"
    }
  },
  {
    "id": "verb_060",
    "rank": 60,
    "word": "Fix",
    "phonetic": "/fɪks/",
    "translation": "Tamir etmek / Düzeltmek",
    "exampleEn": "I fixed the critical database authentication error.",
    "grammarNote": "",
    "exampleTr": "Kritik veritabanı kimlik doğrulama hatasını düzelttim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fix",
      "translation": "Düzeltirim"
    },
    "presentContinuous": {
      "form": "I am fixing",
      "translation": "Düzeltiyorum"
    },
    "future": {
      "form": "I will fix",
      "translation": "Düzelteceğim"
    },
    "pastSimple": {
      "form": "I fix",
      "translation": "Düzeltirim"
    }
  },
  {
    "id": "verb_061",
    "rank": 61,
    "word": "Fly",
    "phonetic": "/flaɪ/",
    "translation": "Uçmak",
    "exampleEn": "I am flying to London for an engineering summit tomorrow.",
    "grammarNote": "",
    "exampleTr": "Yarın bir mühendislik zirvesi için Londra'ya uçuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fly",
      "translation": "Uçarım"
    },
    "presentContinuous": {
      "form": "I am flying",
      "translation": "Uçuyorum"
    },
    "future": {
      "form": "I will fly",
      "translation": "Uçacağım"
    },
    "pastSimple": {
      "form": "I fly",
      "translation": "Uçarım"
    }
  },
  {
    "id": "verb_062",
    "rank": 62,
    "word": "Forget",
    "phonetic": "/fəˈɡet/",
    "translation": "Unutmak",
    "exampleEn": "I forgot my access badge at home this morning.",
    "grammarNote": "",
    "exampleTr": "Bu sabah giriş kartımı evde unuttum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I forget",
      "translation": "Unuturum"
    },
    "presentContinuous": {
      "form": "I am forgeting",
      "translation": "Unutuyorum"
    },
    "future": {
      "form": "I will forget",
      "translation": "Unutacağım"
    },
    "pastSimple": {
      "form": "I forget",
      "translation": "Unuturum"
    }
  },
  {
    "id": "verb_063",
    "rank": 63,
    "word": "Grow",
    "phonetic": "/ɡrəʊ/",
    "translation": "Büyümek / Yetiştirmek",
    "exampleEn": "Our developer community is growing rapidly every month.",
    "grammarNote": "",
    "exampleTr": "Geliştirici topluluğumuz her ay hızla büyüyor.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I grow",
      "translation": "Büyürüm / Yetiştiririm"
    },
    "presentContinuous": {
      "form": "I am growing",
      "translation": "Büyüyorum / Yetiştiriyorum"
    },
    "future": {
      "form": "I will grow",
      "translation": "Büyüyeceğim / Yetiştireceğim"
    },
    "pastSimple": {
      "form": "I grow",
      "translation": "Büyürüm / Yetiştiririm"
    }
  },
  {
    "id": "verb_064",
    "rank": 64,
    "word": "Hang",
    "phonetic": "/hæŋ/",
    "translation": "Asmak / Takılmak",
    "exampleEn": "I hung the new whiteboard on the office wall.",
    "grammarNote": "",
    "exampleTr": "Yeni beyaz tahtayı ofis duvarına astım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hang",
      "translation": "Asarım"
    },
    "presentContinuous": {
      "form": "I am hanging",
      "translation": "Asıyorum"
    },
    "future": {
      "form": "I will hang",
      "translation": "Asacağım"
    },
    "pastSimple": {
      "form": "I hang",
      "translation": "Asarım"
    }
  },
  {
    "id": "verb_065",
    "rank": 65,
    "word": "Hear",
    "phonetic": "/hɪər/",
    "translation": "Duymak / İşitmek",
    "exampleEn": "I heard the system alarm when the CPU overheated.",
    "grammarNote": "",
    "exampleTr": "İşlemci aşırı ısındığında sistem alarmını duydum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hear",
      "translation": "Duyarım"
    },
    "presentContinuous": {
      "form": "I am hearing",
      "translation": "Duyuyorum"
    },
    "future": {
      "form": "I will hear",
      "translation": "Duyacağım"
    },
    "pastSimple": {
      "form": "I hear",
      "translation": "Duyarım"
    }
  },
  {
    "id": "verb_066",
    "rank": 66,
    "word": "Hold",
    "phonetic": "/həʊld/",
    "translation": "Tutmak / Düzenlemek",
    "exampleEn": "We will hold a sprint review meeting on Friday.",
    "grammarNote": "",
    "exampleTr": "Cuma günü bir sprint değerlendirme toplantısı düzenleyeceğiz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hold",
      "translation": "Tutarım / Düzenlerim"
    },
    "presentContinuous": {
      "form": "I am holding",
      "translation": "Tutuyorum / Düzenliyorum"
    },
    "future": {
      "form": "I will hold",
      "translation": "Tutacağım / Düzenleyeceğim"
    },
    "pastSimple": {
      "form": "I hold",
      "translation": "Tutarım / Düzenlerim"
    }
  },
  {
    "id": "verb_067",
    "rank": 67,
    "word": "Jump",
    "phonetic": "/dʒʌmp/",
    "translation": "Zıplamak / Atlamak",
    "exampleEn": "The cat jumped onto the table near the window.",
    "grammarNote": "",
    "exampleTr": "Kedi pencerenin yanındaki masanın üzerine zıpladı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I jump",
      "translation": "Zıplarım"
    },
    "presentContinuous": {
      "form": "I am jumping",
      "translation": "Zıplıyorum"
    },
    "future": {
      "form": "I will jump",
      "translation": "Zıplayacağım"
    },
    "pastSimple": {
      "form": "I jump",
      "translation": "Zıplarım"
    }
  },
  {
    "id": "verb_068",
    "rank": 68,
    "word": "Learn",
    "phonetic": "/lɜːn/",
    "translation": "Öğrenmek",
    "exampleEn": "I am learning advanced cloud architecture principles.",
    "grammarNote": "",
    "exampleTr": "İleri düzey bulut mimarisi prensiplerini öğreniyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I learn",
      "translation": "Öğrenirim"
    },
    "presentContinuous": {
      "form": "I am learning",
      "translation": "Öğreniyorum"
    },
    "future": {
      "form": "I will learn",
      "translation": "Öğreneceğim"
    },
    "pastSimple": {
      "form": "I learn",
      "translation": "Öğrenirim"
    }
  },
  {
    "id": "verb_069",
    "rank": 69,
    "word": "Like",
    "phonetic": "/laɪk/",
    "translation": "Beğenmek / Hoşlanmak",
    "exampleEn": "I like building user-friendly mobile interfaces.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı dostu mobil arayüzler geliştirmeyi severim / beğenirim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I like",
      "translation": "Beğenirim"
    },
    "presentContinuous": {
      "form": "I am liking",
      "translation": "Beğeniyorum"
    },
    "future": {
      "form": "I will like",
      "translation": "Beğeneceğim"
    },
    "pastSimple": {
      "form": "I like",
      "translation": "Beğenirim"
    }
  },
  {
    "id": "verb_070",
    "rank": 70,
    "word": "Live",
    "phonetic": "/lɪv/",
    "translation": "Yaşamak",
    "exampleEn": "I live in Bolu and study computer engineering.",
    "grammarNote": "",
    "exampleTr": "Bolu'da yaşıyorum ve bilgisayar mühendisliği okuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I live",
      "translation": "Yaşarım"
    },
    "presentContinuous": {
      "form": "I am living",
      "translation": "Yaşıyorum"
    },
    "future": {
      "form": "I will live",
      "translation": "Yaşayacağım"
    },
    "pastSimple": {
      "form": "I live",
      "translation": "Yaşarım"
    }
  },
  {
    "id": "verb_071",
    "rank": 71,
    "word": "Love",
    "phonetic": "/lʌv/",
    "translation": "Sevmek",
    "exampleEn": "I love solving complex programming challenges.",
    "grammarNote": "",
    "exampleTr": "Karmaşık programlama problemlerini çözmeyi çok severim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I love",
      "translation": "Severim"
    },
    "presentContinuous": {
      "form": "I am loving",
      "translation": "Seviyorum"
    },
    "future": {
      "form": "I will love",
      "translation": "Seveceğim"
    },
    "pastSimple": {
      "form": "I love",
      "translation": "Severim"
    }
  },
  {
    "id": "verb_072",
    "rank": 72,
    "word": "Meet",
    "phonetic": "/miːt/",
    "translation": "Buluşmak / Tanışmak",
    "exampleEn": "I will meet the product manager at 2 PM today.",
    "grammarNote": "",
    "exampleTr": "Bugün saat 14:00'te ürün yöneticisiyle buluşacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I meet",
      "translation": "Buluşurum / Tanışırım"
    },
    "presentContinuous": {
      "form": "I am meeting",
      "translation": "Buluşuyorum / Tanışıyorum"
    },
    "future": {
      "form": "I will meet",
      "translation": "Buluşacağım / Tanışacağım"
    },
    "pastSimple": {
      "form": "I meet",
      "translation": "Buluşurum / Tanışırım"
    }
  },
  {
    "id": "verb_073",
    "rank": 73,
    "word": "Need",
    "phonetic": "/niːd/",
    "translation": "İhtiyaç duymak",
    "exampleEn": "I need more RAM to run virtual machines locally.",
    "grammarNote": "",
    "exampleTr": "Sanal makineleri yerel olarak çalıştırmak için daha fazla RAM'e ihtiyaç duyuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I need",
      "translation": "İhtiyaç duyarım"
    },
    "presentContinuous": {
      "form": "I am needing",
      "translation": "İhtiyaç duyuyorum"
    },
    "future": {
      "form": "I will need",
      "translation": "İhtiyaç duyacağım"
    },
    "pastSimple": {
      "form": "I need",
      "translation": "İhtiyaç duyarım"
    }
  },
  {
    "id": "verb_074",
    "rank": 74,
    "word": "Pay",
    "phonetic": "/peɪ/",
    "translation": "Ödemek",
    "exampleEn": "I paid the cloud server hosting invoice yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün bulut sunucusu barındırma faturasını ödedim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I pay",
      "translation": "Öderim"
    },
    "presentContinuous": {
      "form": "I am paying",
      "translation": "Ödüyorum"
    },
    "future": {
      "form": "I will pay",
      "translation": "Ödeyeceğim"
    },
    "pastSimple": {
      "form": "I pay",
      "translation": "Öderim"
    }
  },
  {
    "id": "verb_075",
    "rank": 75,
    "word": "Remember",
    "phonetic": "/rɪˈmem.bər/",
    "translation": "Hatırlamak",
    "exampleEn": "I always remember to commit my code before leaving.",
    "grammarNote": "",
    "exampleTr": "Ayrılmadan önce kodumu commit etmeyi her zaman hatırlarım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I remember",
      "translation": "Hatırlarım"
    },
    "presentContinuous": {
      "form": "I am remembering",
      "translation": "Hatırlıyorum"
    },
    "future": {
      "form": "I will remember",
      "translation": "Hatırlayacağım"
    },
    "pastSimple": {
      "form": "I remember",
      "translation": "Hatırlarım"
    }
  },
  {
    "id": "verb_076",
    "rank": 76,
    "word": "Save",
    "phonetic": "/seɪv/",
    "translation": "Kaydetmek / Biriktirmek",
    "exampleEn": "I saved all the updated configuration files.",
    "grammarNote": "",
    "exampleTr": "Güncellenen tüm yapılandırma dosyalarını kaydettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I save",
      "translation": "Kaydederim"
    },
    "presentContinuous": {
      "form": "I am saving",
      "translation": "Kaydediyorum"
    },
    "future": {
      "form": "I will save",
      "translation": "Kaydedeceğim"
    },
    "pastSimple": {
      "form": "I save",
      "translation": "Kaydederim"
    }
  },
  {
    "id": "verb_077",
    "rank": 77,
    "word": "Sell",
    "phonetic": "/sel/",
    "translation": "Satmak",
    "exampleEn": "Our startup sold over one thousand software licenses.",
    "grammarNote": "",
    "exampleTr": "Girişimimiz binden fazla yazılım lisansı sattı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I sell",
      "translation": "Satarım"
    },
    "presentContinuous": {
      "form": "I am selling",
      "translation": "Satıyorum"
    },
    "future": {
      "form": "I will sell",
      "translation": "Satacağım"
    },
    "pastSimple": {
      "form": "I sell",
      "translation": "Satarım"
    }
  },
  {
    "id": "verb_078",
    "rank": 78,
    "word": "Sing",
    "phonetic": "/sɪŋ/",
    "translation": "Şarkı söylemek",
    "exampleEn": "She is singing a beautiful acoustic song.",
    "grammarNote": "",
    "exampleTr": "O güzel bir akustik şarkı söylüyor.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I sing",
      "translation": "Söylerim"
    },
    "presentContinuous": {
      "form": "I am singing",
      "translation": "Söylüyorum"
    },
    "future": {
      "form": "I will sing",
      "translation": "Söyleyeceğim"
    },
    "pastSimple": {
      "form": "I sing",
      "translation": "Söylerim"
    }
  },
  {
    "id": "verb_079",
    "rank": 79,
    "word": "Smile",
    "phonetic": "/smaɪl/",
    "translation": "Gülümsemek",
    "exampleEn": "I smiled when I saw the successful build notification.",
    "grammarNote": "",
    "exampleTr": "Başarılı derleme bildirimini gördüğümde gülümsedim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I smile",
      "translation": "Gülümserim"
    },
    "presentContinuous": {
      "form": "I am smiling",
      "translation": "Gülümsüyorum"
    },
    "future": {
      "form": "I will smile",
      "translation": "Gülümseyeceğim"
    },
    "pastSimple": {
      "form": "I smile",
      "translation": "Gülümserim"
    }
  },
  {
    "id": "verb_080",
    "rank": 80,
    "word": "Spend",
    "phonetic": "/spend/",
    "translation": "Harcamak / Vakit geçirmek",
    "exampleEn": "I spent three hours refactoring the database queries.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sorgularını yeniden düzenlemek için üç saat harcadım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I spend",
      "translation": "Harcarım"
    },
    "presentContinuous": {
      "form": "I am spending",
      "translation": "Harcıyorum"
    },
    "future": {
      "form": "I will spend",
      "translation": "Harcayacağım"
    },
    "pastSimple": {
      "form": "I spend",
      "translation": "Harcarım"
    }
  },
  {
    "id": "verb_081",
    "rank": 81,
    "word": "Swim",
    "phonetic": "/swɪm/",
    "translation": "Yüzmek",
    "exampleEn": "I swim in the municipal pool every Saturday morning.",
    "grammarNote": "",
    "exampleTr": "Her cumartesi sabahı belediye havuzunda yüzerim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I swim",
      "translation": "Yüzerim"
    },
    "presentContinuous": {
      "form": "I am swimming",
      "translation": "Yüzüyorum"
    },
    "future": {
      "form": "I will swim",
      "translation": "Yüzeceğim"
    },
    "pastSimple": {
      "form": "I swim",
      "translation": "Yüzerim"
    }
  },
  {
    "id": "verb_082",
    "rank": 82,
    "word": "Think",
    "phonetic": "/θɪŋk/",
    "translation": "Düşünmek",
    "exampleEn": "I think Kotlin is the best language for modern Android.",
    "grammarNote": "",
    "exampleTr": "Bence Kotlin modern Android için en iyi dildir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I think",
      "translation": "Düşünürüm"
    },
    "presentContinuous": {
      "form": "I am thinking",
      "translation": "Düşünüyorum"
    },
    "future": {
      "form": "I will think",
      "translation": "Düşüneceğim"
    },
    "pastSimple": {
      "form": "I think",
      "translation": "Düşünürüm"
    }
  },
  {
    "id": "verb_083",
    "rank": 83,
    "word": "Understand",
    "phonetic": "/ˌʌn.dəˈstænd/",
    "translation": "Anlamak",
    "exampleEn": "I understand how distributed microservices communicate.",
    "grammarNote": "",
    "exampleTr": "Dağıtık mikroservislerin nasıl haberleştiğini anlıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I understand",
      "translation": "Anlarım"
    },
    "presentContinuous": {
      "form": "I am understanding",
      "translation": "Anlıyorum"
    },
    "future": {
      "form": "I will understand",
      "translation": "Anlayacağım"
    },
    "pastSimple": {
      "form": "I understand",
      "translation": "Anlarım"
    }
  },
  {
    "id": "verb_084",
    "rank": 84,
    "word": "Visit",
    "phonetic": "/ˈvɪz.ɪt/",
    "translation": "Ziyaret etmek",
    "exampleEn": "I will visit the technology innovation center in Bolu Teknokent.",
    "grammarNote": "",
    "exampleTr": "Bolu Teknokent'teki teknoloji inovasyon merkezini ziyaret edeceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I visit",
      "translation": "Ziyaret ederim"
    },
    "presentContinuous": {
      "form": "I am visiting",
      "translation": "Ziyaret ediyorum"
    },
    "future": {
      "form": "I will visit",
      "translation": "Ziyaret edeceğim"
    },
    "pastSimple": {
      "form": "I visit",
      "translation": "Ziyaret ederim"
    }
  },
  {
    "id": "verb_085",
    "rank": 85,
    "word": "Wash",
    "phonetic": "/wɒʃ/",
    "translation": "Yıkamak",
    "exampleEn": "I washed my coffee mug after finishing work.",
    "grammarNote": "",
    "exampleTr": "İşi bitirdikten sonra kahve kupamı yıkadım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I wash",
      "translation": "Yakarım"
    },
    "presentContinuous": {
      "form": "I am washing",
      "translation": "Yıkıyorum"
    },
    "future": {
      "form": "I will wash",
      "translation": "Yıkayacağım"
    },
    "pastSimple": {
      "form": "I wash",
      "translation": "Yakarım"
    }
  },
  {
    "id": "verb_086",
    "rank": 86,
    "word": "Wear",
    "phonetic": "/weər/",
    "translation": "Giymek / Takmak",
    "exampleEn": "I am wearing a warm jacket because it is cold today.",
    "grammarNote": "",
    "exampleTr": "Bugün hava soğuk olduğu için sıcak bir ceket giyiyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I wear",
      "translation": "Giyerim"
    },
    "presentContinuous": {
      "form": "I am wearing",
      "translation": "Giyiyorum"
    },
    "future": {
      "form": "I will wear",
      "translation": "Giyeceğim"
    },
    "pastSimple": {
      "form": "I wear",
      "translation": "Giyerim"
    }
  },
  {
    "id": "verb_087",
    "rank": 87,
    "word": "Win",
    "phonetic": "/wɪn/",
    "translation": "Kazanmak",
    "exampleEn": "Our student developer team won first place in the hackathon.",
    "grammarNote": "",
    "exampleTr": "Öğrenci geliştirici ekibimiz hackathonda birincilik kazandı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I win",
      "translation": "Kazanırım"
    },
    "presentContinuous": {
      "form": "I am winning",
      "translation": "Kazanıyorum"
    },
    "future": {
      "form": "I will win",
      "translation": "Kazanacağım"
    },
    "pastSimple": {
      "form": "I win",
      "translation": "Kazanırım"
    }
  },
  {
    "id": "verb_088",
    "rank": 88,
    "word": "Work",
    "phonetic": "/wɜːk/",
    "translation": "Çalışmak",
    "exampleEn": "I work as a freelance full-stack developer.",
    "grammarNote": "",
    "exampleTr": "Serbest zamanlı tam yığın geliştirici olarak çalışırım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I work",
      "translation": "Çalışırım"
    },
    "presentContinuous": {
      "form": "I am working",
      "translation": "Çalışıyorum"
    },
    "future": {
      "form": "I will work",
      "translation": "Çalışacağım"
    },
    "pastSimple": {
      "form": "I work",
      "translation": "Çalışırım"
    }
  },
  {
    "id": "verb_089",
    "rank": 89,
    "word": "Check",
    "phonetic": "/tʃek/",
    "translation": "Kontrol etmek",
    "exampleEn": "I am checking the server logs for unexpected anomalies.",
    "grammarNote": "",
    "exampleTr": "Beklenmeyen anomaliler için sunucu günlüklerini kontrol ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I check",
      "translation": "Kontrol ederim"
    },
    "presentContinuous": {
      "form": "I am checking",
      "translation": "Kontrol ediyorum"
    },
    "future": {
      "form": "I will check",
      "translation": "Kontrol edeceğim"
    },
    "pastSimple": {
      "form": "I check",
      "translation": "Kontrol ederim"
    }
  },
  {
    "id": "verb_090",
    "rank": 90,
    "word": "Choose",
    "phonetic": "/tʃuːz/",
    "translation": "Seçmek",
    "exampleEn": "I will choose PostgreSQL for our primary database engine.",
    "grammarNote": "",
    "exampleTr": "Birincil veritabanı motorumuz için PostgreSQL'i seçeceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I choose",
      "translation": "Seçerim"
    },
    "presentContinuous": {
      "form": "I am choosing",
      "translation": "Seçiyorum"
    },
    "future": {
      "form": "I will choose",
      "translation": "Seçeceğim"
    },
    "pastSimple": {
      "form": "I choose",
      "translation": "Seçerim"
    }
  },
  {
    "id": "verb_091",
    "rank": 91,
    "word": "Create",
    "phonetic": "/kriˈeɪt/",
    "translation": "Oluşturmak / Yaratmak",
    "exampleEn": "I created a new Git branch for the authentication feature.",
    "grammarNote": "",
    "exampleTr": "Kimlik doğrulama özelliği için yeni bir Git dalı (branch) oluşturdum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I create",
      "translation": "Oluştururum"
    },
    "presentContinuous": {
      "form": "I am creating",
      "translation": "Oluşturuyorum"
    },
    "future": {
      "form": "I will create",
      "translation": "Oluşturacağım"
    },
    "pastSimple": {
      "form": "I create",
      "translation": "Oluştururum"
    }
  },
  {
    "id": "verb_092",
    "rank": 92,
    "word": "Decide",
    "phonetic": "/dɪˈsaɪd/",
    "translation": "Karar vermek",
    "exampleEn": "We decided to migrate our web frontend to Next.js.",
    "grammarNote": "",
    "exampleTr": "Web ön yüzümüzü Next.js'e taşımaya karar verdik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I decide",
      "translation": "Karar veririm"
    },
    "presentContinuous": {
      "form": "I am deciding",
      "translation": "Karar veriyorum"
    },
    "future": {
      "form": "I will decide",
      "translation": "Karar vereceğim"
    },
    "pastSimple": {
      "form": "I decide",
      "translation": "Karar veririm"
    }
  },
  {
    "id": "verb_093",
    "rank": 93,
    "word": "Describe",
    "phonetic": "/dɪˈskraɪb/",
    "translation": "Tarif etmek / Tanımlamak",
    "exampleEn": "I described the system architecture in the technical documentation.",
    "grammarNote": "",
    "exampleTr": "Teknik dokümantasyonda sistem mimarisini tanımladım / tarif ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I describe",
      "translation": "Tanımlarım"
    },
    "presentContinuous": {
      "form": "I am describing",
      "translation": "Tanımlıyorum"
    },
    "future": {
      "form": "I will describe",
      "translation": "Tanımlayacağım"
    },
    "pastSimple": {
      "form": "I describe",
      "translation": "Tanımlarım"
    }
  },
  {
    "id": "verb_094",
    "rank": 94,
    "word": "Explain",
    "phonetic": "/ɪkˈspleɪn/",
    "translation": "Açıklamak",
    "exampleEn": "I will explain how the neural network detects objects in real time.",
    "grammarNote": "",
    "exampleTr": "Yapay sinir ağının nesneleri gerçek zamanlı olarak nasıl tespit ettiğini açıklayacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I explain",
      "translation": "Açıklarım"
    },
    "presentContinuous": {
      "form": "I am explaining",
      "translation": "Açıklıyorum"
    },
    "future": {
      "form": "I will explain",
      "translation": "Açıklayacağım"
    },
    "pastSimple": {
      "form": "I explain",
      "translation": "Açıklarım"
    }
  },
  {
    "id": "verb_095",
    "rank": 95,
    "word": "Improve",
    "phonetic": "/ɪmˈpruːv/",
    "translation": "Geliştirmek / İyileştirmek",
    "exampleEn": "I am improving the caching layer to reduce query latency.",
    "grammarNote": "",
    "exampleTr": "Sorgu gecikmesini azaltmak için önbellekleme katmanını iyileştiriyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I improve",
      "translation": "İyileştiririm"
    },
    "presentContinuous": {
      "form": "I am improving",
      "translation": "İyileştiriyorum"
    },
    "future": {
      "form": "I will improve",
      "translation": "İyileştireceğim"
    },
    "pastSimple": {
      "form": "I improve",
      "translation": "İyileştiririm"
    }
  },
  {
    "id": "verb_096",
    "rank": 96,
    "word": "Install",
    "phonetic": "/ɪnˈstɔːl/",
    "translation": "Kurmak / Yüklemek",
    "exampleEn": "I installed the required Python dependencies in my virtual environment.",
    "grammarNote": "",
    "exampleTr": "Gerekli Python bağımlılıklarını sanal ortamıma kurdum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I install",
      "translation": "Kurarım"
    },
    "presentContinuous": {
      "form": "I am installing",
      "translation": "Kuruyorum"
    },
    "future": {
      "form": "I will install",
      "translation": "Kuracağım"
    },
    "pastSimple": {
      "form": "I install",
      "translation": "Kurarım"
    }
  },
  {
    "id": "verb_097",
    "rank": 97,
    "word": "Plan",
    "phonetic": "/plæn/",
    "translation": "Planlamak",
    "exampleEn": "We are planning the sprint roadmap for the next two weeks.",
    "grammarNote": "",
    "exampleTr": "Önümüzdeki iki hafta için sprint yol haritasını planlıyoruz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I plan",
      "translation": "Planlarım"
    },
    "presentContinuous": {
      "form": "I am planing",
      "translation": "Planlıyorum"
    },
    "future": {
      "form": "I will plan",
      "translation": "Planlayacağım"
    },
    "pastSimple": {
      "form": "I plan",
      "translation": "Planlarım"
    }
  },
  {
    "id": "verb_098",
    "rank": 98,
    "word": "Prepare",
    "phonetic": "/prɪˈpeər/",
    "translation": "Hazırlamak",
    "exampleEn": "I prepared the presentation slides for the client meeting.",
    "grammarNote": "",
    "exampleTr": "Müşteri toplantısı için sunum slaytlarını hazırladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I prepare",
      "translation": "Hazırlarım"
    },
    "presentContinuous": {
      "form": "I am preparing",
      "translation": "Hazırlıyorum"
    },
    "future": {
      "form": "I will prepare",
      "translation": "Hazırlayacağım"
    },
    "pastSimple": {
      "form": "I prepare",
      "translation": "Hazırlarım"
    }
  },
  {
    "id": "verb_099",
    "rank": 99,
    "word": "Share",
    "phonetic": "/ʃeər/",
    "translation": "Paylaşmak",
    "exampleEn": "I will share the repository link in our team Discord channel.",
    "grammarNote": "",
    "exampleTr": "Ekip Discord kanalımızda depo bağlantısını paylaşacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I share",
      "translation": "Paylaşırım"
    },
    "presentContinuous": {
      "form": "I am sharing",
      "translation": "Paylaşıyorum"
    },
    "future": {
      "form": "I will share",
      "translation": "Paylaşacağım"
    },
    "pastSimple": {
      "form": "I share",
      "translation": "Paylaşırım"
    }
  },
  {
    "id": "verb_100",
    "rank": 100,
    "word": "Travel",
    "phonetic": "/ˈtræv.əl/",
    "translation": "Seyahat etmek",
    "exampleEn": "I will travel to Berlin for an international developer conference next month.",
    "grammarNote": "",
    "exampleTr": "Gelecek ay uluslararası bir geliştirici konferansı için Berlin'e seyahat edeceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I travel",
      "translation": "Seyahat ederim"
    },
    "presentContinuous": {
      "form": "I am traveling",
      "translation": "Seyahat ediyorum"
    },
    "future": {
      "form": "I will travel",
      "translation": "Seyahat edeceğim"
    },
    "pastSimple": {
      "form": "I travel",
      "translation": "Seyahat ederim"
    }
  }
] as LibraryWordEntry[];

export const VERBS_200: LibraryWordEntry[] = [
  {
    "id": "verb_101",
    "rank": 101,
    "word": "Accept",
    "phonetic": "/əkˈsept/",
    "translation": "Kabul etmek",
    "exampleEn": "I accepted the new software engineering job offer yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün yeni yazılım mühendisliği iş teklifini kabul ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I accept",
      "translation": "Kabul ederim"
    },
    "presentContinuous": {
      "form": "I am accepting",
      "translation": "Kabul ediyorum"
    },
    "future": {
      "form": "I will accept",
      "translation": "Kabul edeceğim"
    },
    "pastSimple": {
      "form": "I accept",
      "translation": "Kabul ederim"
    }
  },
  {
    "id": "verb_102",
    "rank": 102,
    "word": "Add",
    "phonetic": "/æd/",
    "translation": "Eklemek",
    "exampleEn": "I will add a new authentication endpoint to our REST API.",
    "grammarNote": "",
    "exampleTr": "REST API'mize yeni bir kimlik doğrulama uç noktası ekleyeceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I add",
      "translation": "Eklerim"
    },
    "presentContinuous": {
      "form": "I am adding",
      "translation": "Ekliyorum"
    },
    "future": {
      "form": "I will add",
      "translation": "Ekleyeceğim"
    },
    "pastSimple": {
      "form": "I add",
      "translation": "Eklerim"
    }
  },
  {
    "id": "verb_103",
    "rank": 103,
    "word": "Agree",
    "phonetic": "/əˈɡriː/",
    "translation": "Aynı fikirde olmak / Anlaşmak",
    "exampleEn": "I agree with your architectural decision regarding microservices.",
    "grammarNote": "",
    "exampleTr": "Mikroservislerle ilgili mimari kararınıza katılıyorum / aynı fikirdeyim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I agree",
      "translation": "Katılırım / Anlaşırım"
    },
    "presentContinuous": {
      "form": "I am agreeing",
      "translation": "Katılıyorum / Anlaşıyorum"
    },
    "future": {
      "form": "I will agree",
      "translation": "Katılacağım / Anlaşacağım"
    },
    "pastSimple": {
      "form": "I agree",
      "translation": "Katılırım / Anlaşırım"
    }
  },
  {
    "id": "verb_104",
    "rank": 104,
    "word": "Allow",
    "phonetic": "/əˈlaʊ/",
    "translation": "İzin vermek / Olanak tanımak",
    "exampleEn": "The security firewall does not allow unauthorized external connections.",
    "grammarNote": "",
    "exampleTr": "Güvenlik duvarı yetkisiz harici bağlantılara izin vermez.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I allow",
      "translation": "İzin veririm"
    },
    "presentContinuous": {
      "form": "I am allowing",
      "translation": "İzin veriyorum"
    },
    "future": {
      "form": "I will allow",
      "translation": "İzin vereceğim"
    },
    "pastSimple": {
      "form": "I allow",
      "translation": "İzin veririm"
    }
  },
  {
    "id": "verb_105",
    "rank": 105,
    "word": "Answer",
    "phonetic": "/ˈɑːn.sər/",
    "translation": "Cevap vermek / Yanıtlamak",
    "exampleEn": "I answered all customer support inquiries within fifteen minutes.",
    "grammarNote": "",
    "exampleTr": "On beş dakika içinde tüm müşteri destek sorularını yanıtladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I answer",
      "translation": "Cevaplarım"
    },
    "presentContinuous": {
      "form": "I am answering",
      "translation": "Cevaplıyorum"
    },
    "future": {
      "form": "I will answer",
      "translation": "Cevaplayacağım"
    },
    "pastSimple": {
      "form": "I answer",
      "translation": "Cevaplarım"
    }
  },
  {
    "id": "verb_106",
    "rank": 106,
    "word": "Appear",
    "phonetic": "/əˈpɪər/",
    "translation": "Görünmek / Belirmek",
    "exampleEn": "A warning dialog appeared on the screen during the build process.",
    "grammarNote": "",
    "exampleTr": "Derleme sürecinde ekranda bir uyarı iletişim kutusu belirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I appear",
      "translation": "Beliririm / Görünürüm"
    },
    "presentContinuous": {
      "form": "I am appearing",
      "translation": "Beliriyorum / Görünüyorum"
    },
    "future": {
      "form": "I will appear",
      "translation": "Belireceğim / Görüneceğim"
    },
    "pastSimple": {
      "form": "I appear",
      "translation": "Beliririm / Görünürüm"
    }
  },
  {
    "id": "verb_107",
    "rank": 107,
    "word": "Apply",
    "phonetic": "/əˈplaɪ/",
    "translation": "Başvurmak / Uygulamak",
    "exampleEn": "I applied for a summer software engineering internship in Teknokent.",
    "grammarNote": "",
    "exampleTr": "Teknokent'te bir yaz dönemi yazılım mühendisliği stajına başvurdum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I apply",
      "translation": "Başvururum / Uygularım"
    },
    "presentContinuous": {
      "form": "I am applying",
      "translation": "Başvuruyorum / Uyguluyorum"
    },
    "future": {
      "form": "I will apply",
      "translation": "Başvuracağım / Uygulayacağım"
    },
    "pastSimple": {
      "form": "I apply",
      "translation": "Başvururum / Uygularım"
    }
  },
  {
    "id": "verb_108",
    "rank": 108,
    "word": "Arrive",
    "phonetic": "/əˈraɪv/",
    "translation": "Varmak / Ulaşmak",
    "exampleEn": "The express train arrived at the central station on time.",
    "grammarNote": "",
    "exampleTr": "Ekspres tren merkez istasyona tam vaktinde vardı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I arrive",
      "translation": "Varırım"
    },
    "presentContinuous": {
      "form": "I am arriving",
      "translation": "Varıyorum"
    },
    "future": {
      "form": "I will arrive",
      "translation": "Varacağım"
    },
    "pastSimple": {
      "form": "I arrive",
      "translation": "Varırım"
    }
  },
  {
    "id": "verb_109",
    "rank": 109,
    "word": "Avoid",
    "phonetic": "/əˈvɔɪd/",
    "translation": "Kaçınmak / Sakınmak",
    "exampleEn": "You should avoid hardcoding private API keys in client-side code.",
    "grammarNote": "",
    "exampleTr": "İstemci tarafı kodda özel API anahtarlarını sabit olarak kodlamaktan kaçınmalısınız.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I avoid",
      "translation": "Kaçınırım"
    },
    "presentContinuous": {
      "form": "I am avoiding",
      "translation": "Kaçınıyorum"
    },
    "future": {
      "form": "I will avoid",
      "translation": "Kaçınacağım"
    },
    "pastSimple": {
      "form": "I avoid",
      "translation": "Kaçınırım"
    }
  },
  {
    "id": "verb_110",
    "rank": 110,
    "word": "Become",
    "phonetic": "/bɪˈkʌm/",
    "translation": "Olmak / Haline gelmek",
    "exampleEn": "Kotlin became the official preferred language for Android development.",
    "grammarNote": "",
    "exampleTr": "Kotlin, Android geliştirme için resmi tercih edilen dil haline geldi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I become",
      "translation": "Olurum"
    },
    "presentContinuous": {
      "form": "I am becoming",
      "translation": "Oluyorum"
    },
    "future": {
      "form": "I will become",
      "translation": "Olacağım"
    },
    "pastSimple": {
      "form": "I become",
      "translation": "Olurum"
    }
  },
  {
    "id": "verb_111",
    "rank": 111,
    "word": "Begin",
    "phonetic": "/bɪˈɡɪn/",
    "translation": "Başlamak",
    "exampleEn": "We will begin the sprint review meeting at 2 PM sharp.",
    "grammarNote": "",
    "exampleTr": "Sprint değerlendirme toplantısına tam saat 14:00'te başlayacağız.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I begin",
      "translation": "Başlarım"
    },
    "presentContinuous": {
      "form": "I am begining",
      "translation": "Başlıyorum"
    },
    "future": {
      "form": "I will begin",
      "translation": "Başlayacağım"
    },
    "pastSimple": {
      "form": "I begin",
      "translation": "Başlarım"
    }
  },
  {
    "id": "verb_112",
    "rank": 112,
    "word": "Believe",
    "phonetic": "/bɪˈliːv/",
    "translation": "İnanmak",
    "exampleEn": "I believe clean documentation is just as important as clean code.",
    "grammarNote": "",
    "exampleTr": "Temiz dokümantasyonun da en az temiz kod kadar önemli olduğuna inanıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I believe",
      "translation": "İnanırım"
    },
    "presentContinuous": {
      "form": "I am believing",
      "translation": "İnanıyorum"
    },
    "future": {
      "form": "I will believe",
      "translation": "İnanacağım"
    },
    "pastSimple": {
      "form": "I believe",
      "translation": "İnanırım"
    }
  },
  {
    "id": "verb_113",
    "rank": 113,
    "word": "Borrow",
    "phonetic": "/ˈbɒr.əʊ/",
    "translation": "Ödünç almak",
    "exampleEn": "I borrowed a specialized computer vision textbook from the library.",
    "grammarNote": "",
    "exampleTr": "Kütüphaneden özel bir bilgisayarlı görü ders kitabı ödünç aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I borrow",
      "translation": "Ödünç alırım"
    },
    "presentContinuous": {
      "form": "I am borrowing",
      "translation": "Ödünç alıyorum"
    },
    "future": {
      "form": "I will borrow",
      "translation": "Ödünç alacağım"
    },
    "pastSimple": {
      "form": "I borrow",
      "translation": "Ödünç alırım"
    }
  },
  {
    "id": "verb_114",
    "rank": 114,
    "word": "Break",
    "phonetic": "/breɪk/",
    "translation": "Kırmak / Bozulmak",
    "exampleEn": "The latest dependency update broke our automated CI pipeline.",
    "grammarNote": "",
    "exampleTr": "En son bağımlılık güncellemesi otomatik CI işlem hattımızı bozdu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I break",
      "translation": "Kırarım / Bozulurum"
    },
    "presentContinuous": {
      "form": "I am breaking",
      "translation": "Kırıyorum / Bozuluyorum"
    },
    "future": {
      "form": "I will break",
      "translation": "Kıracağım / Bozulacağım"
    },
    "pastSimple": {
      "form": "I break",
      "translation": "Kırarım / Bozulurum"
    }
  },
  {
    "id": "verb_115",
    "rank": 115,
    "word": "Care",
    "phonetic": "/keər/",
    "translation": "Önemsemek / İlgilenmek",
    "exampleEn": "Our engineering team cares deeply about user accessibility standards.",
    "grammarNote": "",
    "exampleTr": "Mühendislik ekibimiz kullanıcı erişilebilirliği standartlarını son derece önemser.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I care",
      "translation": "Önemserim"
    },
    "presentContinuous": {
      "form": "I am caring",
      "translation": "Önemsiyorum"
    },
    "future": {
      "form": "I will care",
      "translation": "Önemseyeceğim"
    },
    "pastSimple": {
      "form": "I care",
      "translation": "Önemserim"
    }
  },
  {
    "id": "verb_116",
    "rank": 116,
    "word": "Carry",
    "phonetic": "/ˈkær.i/",
    "translation": "Taşımak",
    "exampleEn": "I am carrying my laptop in a shockproof waterproof backpack.",
    "grammarNote": "",
    "exampleTr": "Dizüstü bilgisayarımı darbelere dayanıklı su geçirmez bir sırt çantasında taşıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I carry",
      "translation": "Taşırım"
    },
    "presentContinuous": {
      "form": "I am carrying",
      "translation": "Taşıyorum"
    },
    "future": {
      "form": "I will carry",
      "translation": "Taşıyacağım"
    },
    "pastSimple": {
      "form": "I carry",
      "translation": "Taşırım"
    }
  },
  {
    "id": "verb_117",
    "rank": 117,
    "word": "Cause",
    "phonetic": "/kɔːz/",
    "translation": "Neden olmak / Sebep olmak",
    "exampleEn": "An unindexed database query caused significant server latency.",
    "grammarNote": "",
    "exampleTr": "İndekslenmemiş bir veritabanı sorgusu belirgin bir sunucu gecikmesine neden oldu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cause",
      "translation": "Neden olurum"
    },
    "presentContinuous": {
      "form": "I am causing",
      "translation": "Neden oluyorum"
    },
    "future": {
      "form": "I will cause",
      "translation": "Neden olacağım"
    },
    "pastSimple": {
      "form": "I cause",
      "translation": "Neden olurum"
    }
  },
  {
    "id": "verb_118",
    "rank": 118,
    "word": "Collect",
    "phonetic": "/kəˈlekt/",
    "translation": "Toplamak / Biriktirmek",
    "exampleEn": "We collected over twenty thousand images for the object detection dataset.",
    "grammarNote": "",
    "exampleTr": "Nesne tespit veri seti için yirmi binden fazla görsel topladık.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I collect",
      "translation": "Toplarım"
    },
    "presentContinuous": {
      "form": "I am collecting",
      "translation": "Topluyorum"
    },
    "future": {
      "form": "I will collect",
      "translation": "Toplayacağım"
    },
    "pastSimple": {
      "form": "I collect",
      "translation": "Toplarım"
    }
  },
  {
    "id": "verb_119",
    "rank": 119,
    "word": "Compare",
    "phonetic": "/kəmˈpeər/",
    "translation": "Karşılaştırmak / Kıyaslamak",
    "exampleEn": "I will compare PostgreSQL and MongoDB benchmarks in my report.",
    "grammarNote": "",
    "exampleTr": "Raporumda PostgreSQL ve MongoDB performans testlerini karşılaştıracağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I compare",
      "translation": "Karşılaştırırım"
    },
    "presentContinuous": {
      "form": "I am comparing",
      "translation": "Karşılaştırıyorum"
    },
    "future": {
      "form": "I will compare",
      "translation": "Karşılaştıracağım"
    },
    "pastSimple": {
      "form": "I compare",
      "translation": "Karşılaştırırım"
    }
  },
  {
    "id": "verb_120",
    "rank": 120,
    "word": "Complete",
    "phonetic": "/kəmˈpliːt/",
    "translation": "Tamamlamak",
    "exampleEn": "I completed the Android user interface redesign ahead of schedule.",
    "grammarNote": "",
    "exampleTr": "Android kullanıcı arayüzü yeniden tasarımını planlanandan önce tamamladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I complete",
      "translation": "Tamamlarım"
    },
    "presentContinuous": {
      "form": "I am completing",
      "translation": "Tamamlıyorum"
    },
    "future": {
      "form": "I will complete",
      "translation": "Tamamlayacağım"
    },
    "pastSimple": {
      "form": "I complete",
      "translation": "Tamamlarım"
    }
  },
  {
    "id": "verb_121",
    "rank": 121,
    "word": "Connect",
    "phonetic": "/kəˈnekt/",
    "translation": "Bağlanmak / Bağlamak",
    "exampleEn": "The mobile client connected to the MQTT telemetry broker instantly.",
    "grammarNote": "",
    "exampleTr": "Mobil istemci MQTT telemetri aracısına anında bağlandı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I connect",
      "translation": "Bağlanırım"
    },
    "presentContinuous": {
      "form": "I am connecting",
      "translation": "Bağlanıyorum"
    },
    "future": {
      "form": "I will connect",
      "translation": "Bağlanacağım"
    },
    "pastSimple": {
      "form": "I connect",
      "translation": "Bağlanırım"
    }
  },
  {
    "id": "verb_122",
    "rank": 122,
    "word": "Continue",
    "phonetic": "/kənˈtɪn.juː/",
    "translation": "Devam etmek / Sürdürmek",
    "exampleEn": "The background worker will continue downloading files in the background.",
    "grammarNote": "",
    "exampleTr": "Arka plan çalışan işlemi dosyaları arka planda indirmeye devam edecek.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I continue",
      "translation": "Devam ederim"
    },
    "presentContinuous": {
      "form": "I am continuing",
      "translation": "Devam ediyorum"
    },
    "future": {
      "form": "I will continue",
      "translation": "Devam edeceğim"
    },
    "pastSimple": {
      "form": "I continue",
      "translation": "Devam ederim"
    }
  },
  {
    "id": "verb_123",
    "rank": 123,
    "word": "Control",
    "phonetic": "/kənˈtrəʊl/",
    "translation": "Kontrol etmek / Yönetmek",
    "exampleEn": "We control stepper motors and laser modules using an Arduino microcontroller.",
    "grammarNote": "",
    "exampleTr": "Bir Arduino mikrodenetleyicisi kullanarak adım motorlarını ve lazer modüllerini kontrol ederiz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I control",
      "translation": "Kontrol ederim"
    },
    "presentContinuous": {
      "form": "I am controling",
      "translation": "Kontrol ediyorum"
    },
    "future": {
      "form": "I will control",
      "translation": "Kontrol edeceğim"
    },
    "pastSimple": {
      "form": "I control",
      "translation": "Kontrol ederim"
    }
  },
  {
    "id": "verb_124",
    "rank": 124,
    "word": "Cost",
    "phonetic": "/kɒst/",
    "translation": "Mal olmak / Fiyatı olmak",
    "exampleEn": "Cloud hosting costs less than managing physical server hardware.",
    "grammarNote": "",
    "exampleTr": "Bulut barındırma fiziksel sunucu donanımı yönetmekten daha ucuza mal olur.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cost",
      "translation": "Mal olurum"
    },
    "presentContinuous": {
      "form": "I am costing",
      "translation": "Mal oluyorum"
    },
    "future": {
      "form": "I will cost",
      "translation": "Mal olacağım"
    },
    "pastSimple": {
      "form": "I cost",
      "translation": "Mal olurum"
    }
  },
  {
    "id": "verb_125",
    "rank": 125,
    "word": "Cover",
    "phonetic": "/ˈkʌv.ər/",
    "translation": "Kaplamak / Kapsamak",
    "exampleEn": "This comprehensive tutorial covers all essential CEFR grammar topics.",
    "grammarNote": "",
    "exampleTr": "Bu kapsamlı eğitim tüm temel CEFR gramer konularını kapsar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cover",
      "translation": "Kapsarım"
    },
    "presentContinuous": {
      "form": "I am covering",
      "translation": "Kapsıyorum"
    },
    "future": {
      "form": "I will cover",
      "translation": "Kapsayacağım"
    },
    "pastSimple": {
      "form": "I cover",
      "translation": "Kapsarım"
    }
  },
  {
    "id": "verb_126",
    "rank": 126,
    "word": "Delete",
    "phonetic": "/dɪˈliːt/",
    "translation": "Silmek",
    "exampleEn": "I deleted unused temporary cache files to free up disk storage.",
    "grammarNote": "",
    "exampleTr": "Disk depolama alanını boşaltmak için kullanılmayan geçici önbellek dosyalarını sildim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I delete",
      "translation": "Silerim"
    },
    "presentContinuous": {
      "form": "I am deleting",
      "translation": "Siliyorum"
    },
    "future": {
      "form": "I will delete",
      "translation": "Sileceğim"
    },
    "pastSimple": {
      "form": "I delete",
      "translation": "Silerim"
    }
  },
  {
    "id": "verb_127",
    "rank": 127,
    "word": "Deliver",
    "phonetic": "/dɪˈlɪv.ər/",
    "translation": "Teslim etmek / Sunmak",
    "exampleEn": "Our engineering team delivered the client milestone on Friday.",
    "grammarNote": "",
    "exampleTr": "Mühendislik ekibimiz müşteri kilometre taşını cuma günü teslim etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I deliver",
      "translation": "Teslim ederim"
    },
    "presentContinuous": {
      "form": "I am delivering",
      "translation": "Teslim ediyorum"
    },
    "future": {
      "form": "I will deliver",
      "translation": "Teslim edeceğim"
    },
    "pastSimple": {
      "form": "I deliver",
      "translation": "Teslim ederim"
    }
  },
  {
    "id": "verb_128",
    "rank": 128,
    "word": "Design",
    "phonetic": "/dɪˈzaɪn/",
    "translation": "Tasarlamak",
    "exampleEn": "I designed a scalable microservice architecture for CepTakvim.",
    "grammarNote": "",
    "exampleTr": "CepTakvim için ölçeklenebilir bir mikroservis mimarisi tasarladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I design",
      "translation": "Tasarlarım"
    },
    "presentContinuous": {
      "form": "I am designing",
      "translation": "Tasarlıyorum"
    },
    "future": {
      "form": "I will design",
      "translation": "Tasarlayacağım"
    },
    "pastSimple": {
      "form": "I design",
      "translation": "Tasarlarım"
    }
  },
  {
    "id": "verb_129",
    "rank": 129,
    "word": "Develop",
    "phonetic": "/dɪˈvel.əp/",
    "translation": "Geliştirmek",
    "exampleEn": "We developed a smart nutrition application named SnapChef.",
    "grammarNote": "",
    "exampleTr": "SnapChef adında akıllı bir beslenme uygulaması geliştirdik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I develop",
      "translation": "Geliştiririm"
    },
    "presentContinuous": {
      "form": "I am developing",
      "translation": "Geliştiriyorum"
    },
    "future": {
      "form": "I will develop",
      "translation": "Geliştireceğim"
    },
    "pastSimple": {
      "form": "I develop",
      "translation": "Geliştiririm"
    }
  },
  {
    "id": "verb_130",
    "rank": 130,
    "word": "Discover",
    "phonetic": "/dɪˈskʌv.ər/",
    "translation": "Keşfetmek",
    "exampleEn": "The security audit discovered an unencrypted database backup volume.",
    "grammarNote": "",
    "exampleTr": "Güvenlik denetimi şifrelenmemiş bir veritabanı yedekleme birimi keşfetti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I discover",
      "translation": "Keşfederim"
    },
    "presentContinuous": {
      "form": "I am discovering",
      "translation": "Keşfediyorum"
    },
    "future": {
      "form": "I will discover",
      "translation": "Keşfedeceğim"
    },
    "pastSimple": {
      "form": "I discover",
      "translation": "Keşfederim"
    }
  },
  {
    "id": "verb_131",
    "rank": 131,
    "word": "Discuss",
    "phonetic": "/dɪˈskʌs/",
    "translation": "Tartışmak / Görüşmek",
    "exampleEn": "We will discuss the cloud budget allocation in tomorrow's meeting.",
    "grammarNote": "",
    "exampleTr": "Yarınki toplantıda bulut bütçe tahsisini tartışacağız / görüşeceğiz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I discuss",
      "translation": "Tartışırım"
    },
    "presentContinuous": {
      "form": "I am discussing",
      "translation": "Tartışıyorum"
    },
    "future": {
      "form": "I will discuss",
      "translation": "Tartışacağım"
    },
    "pastSimple": {
      "form": "I discuss",
      "translation": "Tartışırım"
    }
  },
  {
    "id": "verb_132",
    "rank": 132,
    "word": "Divide",
    "phonetic": "/dɪˈvaɪd/",
    "translation": "Bölmek / Paylaştırmak",
    "exampleEn": "We divided the project into four two-week agile development sprints.",
    "grammarNote": "",
    "exampleTr": "Projeyi ikişer haftalık dört çevik geliştirme sprintine böldük.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I divide",
      "translation": "Bölerim"
    },
    "presentContinuous": {
      "form": "I am dividing",
      "translation": "Bölüyorum"
    },
    "future": {
      "form": "I will divide",
      "translation": "Böleceğim"
    },
    "pastSimple": {
      "form": "I divide",
      "translation": "Bölerim"
    }
  },
  {
    "id": "verb_133",
    "rank": 133,
    "word": "Draw",
    "phonetic": "/drɔː/",
    "translation": "Çizmek",
    "exampleEn": "I drew a detailed architectural flowchart for the thesis defense.",
    "grammarNote": "",
    "exampleTr": "Tez savunması için detaylı bir mimari akış şeması çizdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I draw",
      "translation": "Çizerim"
    },
    "presentContinuous": {
      "form": "I am drawing",
      "translation": "Çiziyorum"
    },
    "future": {
      "form": "I will draw",
      "translation": "Çizeceğim"
    },
    "pastSimple": {
      "form": "I draw",
      "translation": "Çizerim"
    }
  },
  {
    "id": "verb_134",
    "rank": 134,
    "word": "Drop",
    "phonetic": "/drɒp/",
    "translation": "Düşürmek / Bırakmak",
    "exampleEn": "The network connection dropped while the migration script was executing.",
    "grammarNote": "",
    "exampleTr": "Taşıma betiği çalışırken ağ bağlantısı koptu / düştü.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I drop",
      "translation": "Düşürürüm"
    },
    "presentContinuous": {
      "form": "I am dropping",
      "translation": "Düşürüyorum"
    },
    "future": {
      "form": "I will drop",
      "translation": "Düşüreceğim"
    },
    "pastSimple": {
      "form": "I drop",
      "translation": "Düşürürüm"
    }
  },
  {
    "id": "verb_135",
    "rank": 135,
    "word": "Earn",
    "phonetic": "/ɜːn/",
    "translation": "Kazanmak (Para/Hak)",
    "exampleEn": "I earn extra income by building freelance mobile and web projects.",
    "grammarNote": "",
    "exampleTr": "Serbest zamanlı mobil ve web projeleri inşa ederek ek gelir kazanırım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I earn",
      "translation": "Kazanırım"
    },
    "presentContinuous": {
      "form": "I am earning",
      "translation": "Kazanıyorum"
    },
    "future": {
      "form": "I will earn",
      "translation": "Kazanacağım"
    },
    "pastSimple": {
      "form": "I earn",
      "translation": "Kazanırım"
    }
  },
  {
    "id": "verb_136",
    "rank": 136,
    "word": "Encourage",
    "phonetic": "/ɪnˈkʌr.ɪdʒ/",
    "translation": "Teşvik etmek / Cesaretlendirmek",
    "exampleEn": "Our community encourages junior developers to contribute to open source.",
    "grammarNote": "",
    "exampleTr": "Topluluğumuz kıdemsiz geliştiricileri açık kaynağa katkıda bulunmaya teşvik eder.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I encourage",
      "translation": "Teşvik ederim"
    },
    "presentContinuous": {
      "form": "I am encouraging",
      "translation": "Teşvik ediyorum"
    },
    "future": {
      "form": "I will encourage",
      "translation": "Teşvik edeceğim"
    },
    "pastSimple": {
      "form": "I encourage",
      "translation": "Teşvik ederim"
    }
  },
  {
    "id": "verb_137",
    "rank": 137,
    "word": "Enter",
    "phonetic": "/ˈen.tər/",
    "translation": "Girmek",
    "exampleEn": "Please enter your multi-factor verification code to authenticate.",
    "grammarNote": "",
    "exampleTr": "Kimlik doğrulaması yapmak için lütfen çok faktörlü doğrulama kodunuzu girin.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I enter",
      "translation": "Girerim"
    },
    "presentContinuous": {
      "form": "I am entering",
      "translation": "Giriyorum"
    },
    "future": {
      "form": "I will enter",
      "translation": "Gireceğim"
    },
    "pastSimple": {
      "form": "I enter",
      "translation": "Girerim"
    }
  },
  {
    "id": "verb_138",
    "rank": 138,
    "word": "Expect",
    "phonetic": "/ɪkˈspekt/",
    "translation": "Beklemek / Ummak",
    "exampleEn": "We expect the cloud server response time to stay under 50 milliseconds.",
    "grammarNote": "",
    "exampleTr": "Bulut sunucusu yanıt süresinin 50 milisaniyenin altında kalmasını bekliyoruz / umuyoruz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I expect",
      "translation": "Beklerim"
    },
    "presentContinuous": {
      "form": "I am expecting",
      "translation": "Bekliyorum"
    },
    "future": {
      "form": "I will expect",
      "translation": "Bekleyeceğim"
    },
    "pastSimple": {
      "form": "I expect",
      "translation": "Beklerim"
    }
  },
  {
    "id": "verb_139",
    "rank": 139,
    "word": "Fail",
    "phonetic": "/feɪl/",
    "translation": "Başarısız olmak / Çökmek",
    "exampleEn": "The automated unit test failed because the API mock was missing.",
    "grammarNote": "",
    "exampleTr": "API sahte verisi (mock) eksik olduğu için otomatik birim testi başarısız oldu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fail",
      "translation": "Başarısız olurum"
    },
    "presentContinuous": {
      "form": "I am failing",
      "translation": "Başarısız oluyorum"
    },
    "future": {
      "form": "I will fail",
      "translation": "Başarısız olacağım"
    },
    "pastSimple": {
      "form": "I fail",
      "translation": "Başarısız olurum"
    }
  },
  {
    "id": "verb_140",
    "rank": 140,
    "word": "Fill",
    "phonetic": "/fɪl/",
    "translation": "Doldurmak",
    "exampleEn": "Please fill out the electronic visa questionnaire carefully.",
    "grammarNote": "",
    "exampleTr": "Lütfen elektronik vize anketini dikkatlice doldurunuz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fill",
      "translation": "Doldururum"
    },
    "presentContinuous": {
      "form": "I am filling",
      "translation": "Dolduruyorum"
    },
    "future": {
      "form": "I will fill",
      "translation": "Dolduracağım"
    },
    "pastSimple": {
      "form": "I fill",
      "translation": "Doldururum"
    }
  },
  {
    "id": "verb_141",
    "rank": 141,
    "word": "Follow",
    "phonetic": "/ˈfɒl.əʊ/",
    "translation": "Takip etmek / İzlemek",
    "exampleEn": "We always follow clean code conventions and SOLID design principles.",
    "grammarNote": "",
    "exampleTr": "Her zaman temiz kod kurallarını ve SOLID tasarım ilkelerini takip ederiz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I follow",
      "translation": "Takip ederim"
    },
    "presentContinuous": {
      "form": "I am following",
      "translation": "Takip ediyorum"
    },
    "future": {
      "form": "I will follow",
      "translation": "Takip edeceğim"
    },
    "pastSimple": {
      "form": "I follow",
      "translation": "Takip ederim"
    }
  },
  {
    "id": "verb_142",
    "rank": 142,
    "word": "Freeze",
    "phonetic": "/friːz/",
    "translation": "Donmak / Dondurmak",
    "exampleEn": "The mobile screen froze when the user tapped the submit button.",
    "grammarNote": "",
    "exampleTr": "Kullanıcı gönder butonuna dokunduğunda mobil ekran dondu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I freeze",
      "translation": "Donarım / Dondururum"
    },
    "presentContinuous": {
      "form": "I am freezing",
      "translation": "Donuyorum / Donduruyorum"
    },
    "future": {
      "form": "I will freeze",
      "translation": "Donacağım / Donduracağım"
    },
    "pastSimple": {
      "form": "I freeze",
      "translation": "Donarım / Dondururum"
    }
  },
  {
    "id": "verb_143",
    "rank": 143,
    "word": "Handle",
    "phonetic": "/ˈhæn.dəl/",
    "translation": "Yönetmek / Başa çıkmak",
    "exampleEn": "Our load balancer handles millions of concurrent HTTP requests daily.",
    "grammarNote": "",
    "exampleTr": "Yük dengeleyicimiz günlük olarak milyonlarca eşzamanlı HTTP isteğini yönetir / karşılar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I handle",
      "translation": "Yönetirim"
    },
    "presentContinuous": {
      "form": "I am handling",
      "translation": "Yönetiyorum"
    },
    "future": {
      "form": "I will handle",
      "translation": "Yöneteceğim"
    },
    "pastSimple": {
      "form": "I handle",
      "translation": "Yönetirim"
    }
  },
  {
    "id": "verb_144",
    "rank": 144,
    "word": "Happen",
    "phonetic": "/ˈhæp.ən/",
    "translation": "Olmak / Gerçekleşmek",
    "exampleEn": "Unexpected errors can happen if input validation is omitted.",
    "grammarNote": "",
    "exampleTr": "Girdi doğrulaması atlanırsa beklenmeyen hatalar gerçekleşebilir / olabilir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I happen",
      "translation": "Olurum"
    },
    "presentContinuous": {
      "form": "I am happening",
      "translation": "Oluyorum"
    },
    "future": {
      "form": "I will happen",
      "translation": "Olacağım"
    },
    "pastSimple": {
      "form": "I happen",
      "translation": "Olurum"
    }
  },
  {
    "id": "verb_145",
    "rank": 145,
    "word": "Hate",
    "phonetic": "/heɪt/",
    "translation": "Nefret etmek",
    "exampleEn": "I hate dealing with unformatted legacy spaghetti code.",
    "grammarNote": "",
    "exampleTr": "Biçimlendirilmemiş eski spagetti kodla uğraşmaktan nefret ederim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hate",
      "translation": "Nefret ederim"
    },
    "presentContinuous": {
      "form": "I am hating",
      "translation": "Nefret ediyorum"
    },
    "future": {
      "form": "I will hate",
      "translation": "Nefret edeceğim"
    },
    "pastSimple": {
      "form": "I hate",
      "translation": "Nefret ederim"
    }
  },
  {
    "id": "verb_146",
    "rank": 146,
    "word": "Hide",
    "phonetic": "/haɪd/",
    "translation": "Gizlemek / Saklamak",
    "exampleEn": "I hid the database connection credentials in a local .env file.",
    "grammarNote": "",
    "exampleTr": "Veritabanı bağlantı kimlik bilgilerini yerel bir .env dosyasında gizledim / sakladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hide",
      "translation": "Gizlerim"
    },
    "presentContinuous": {
      "form": "I am hiding",
      "translation": "Gizliyorum"
    },
    "future": {
      "form": "I will hide",
      "translation": "Gizleyeceğim"
    },
    "pastSimple": {
      "form": "I hide",
      "translation": "Gizlerim"
    }
  },
  {
    "id": "verb_147",
    "rank": 147,
    "word": "Hit",
    "phonetic": "/hɪt/",
    "translation": "Vurmak / Ulaşmak",
    "exampleEn": "Over ten thousand users hit our web servers during the flash sale.",
    "grammarNote": "",
    "exampleTr": "Hızlı indirim satışı sırasında on binden fazla kullanıcı web sunucularımıza ulaştı / vurdu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hit",
      "translation": "Ulaşırım / Vururum"
    },
    "presentContinuous": {
      "form": "I am hitting",
      "translation": "Ulaşıyorum / Vuruyorum"
    },
    "future": {
      "form": "I will hit",
      "translation": "Ulaşacağım / Vuracağım"
    },
    "pastSimple": {
      "form": "I hit",
      "translation": "Ulaşırım / Vururum"
    }
  },
  {
    "id": "verb_148",
    "rank": 148,
    "word": "Hope",
    "phonetic": "/həʊp/",
    "translation": "Umut etmek",
    "exampleEn": "I hope our research paper will be accepted by the IEEE conference.",
    "grammarNote": "",
    "exampleTr": "Araştırma makalemizin IEEE konferansı tarafından kabul edilmesini umuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I hope",
      "translation": "Umarım"
    },
    "presentContinuous": {
      "form": "I am hoping",
      "translation": "Umuyorum"
    },
    "future": {
      "form": "I will hope",
      "translation": "Umacağım"
    },
    "pastSimple": {
      "form": "I hope",
      "translation": "Umarım"
    }
  },
  {
    "id": "verb_149",
    "rank": 149,
    "word": "Identify",
    "phonetic": "/aɪˈden.tɪ.faɪ/",
    "translation": "Tespit etmek / Tanımlamak",
    "exampleEn": "The profiling tool identified a significant memory leak in the worker thread.",
    "grammarNote": "",
    "exampleTr": "Profil çıkarma aracı çalışan iş parçacığında önemli bir bellek sızıntısı tespit etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I identify",
      "translation": "Tespit ederim"
    },
    "presentContinuous": {
      "form": "I am identifying",
      "translation": "Tespit ediyorum"
    },
    "future": {
      "form": "I will identify",
      "translation": "Tespit edeceğim"
    },
    "pastSimple": {
      "form": "I identify",
      "translation": "Tespit ederim"
    }
  },
  {
    "id": "verb_150",
    "rank": 150,
    "word": "Imagine",
    "phonetic": "/ɪˈmædʒ.ɪn/",
    "translation": "Hayal etmek",
    "exampleEn": "Can you imagine building an autonomous air defense system with Python?",
    "grammarNote": "",
    "exampleTr": "Python ile otonom bir hava savunma sistemi inşa etmeyi hayal edebiliyor musun?",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I imagine",
      "translation": "Hayal ederim"
    },
    "presentContinuous": {
      "form": "I am imagining",
      "translation": "Hayal ediyorum"
    },
    "future": {
      "form": "I will imagine",
      "translation": "Hayal edeceğim"
    },
    "pastSimple": {
      "form": "I imagine",
      "translation": "Hayal ederim"
    }
  },
  {
    "id": "verb_151",
    "rank": 151,
    "word": "Include",
    "phonetic": "/ɪnˈkluːd/",
    "translation": "İçermek / Dahil etmek",
    "exampleEn": "I will include detailed Swagger documentation in the final project delivery.",
    "grammarNote": "",
    "exampleTr": "Nihai proje teslimine detaylı Swagger dokümantasyonunu dahil edeceğim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I include",
      "translation": "İçeririm"
    },
    "presentContinuous": {
      "form": "I am including",
      "translation": "İçeriyorum"
    },
    "future": {
      "form": "I will include",
      "translation": "İçereceğim"
    },
    "pastSimple": {
      "form": "I include",
      "translation": "İçeririm"
    }
  },
  {
    "id": "verb_152",
    "rank": 152,
    "word": "Increase",
    "phonetic": "/ɪnˈkriːs/",
    "translation": "Artmak / Artırmak",
    "exampleEn": "Caching database queries increased application throughput by 40%.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sorgularını önbelleğe almak uygulama işlem hacmini %40 artırdı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I increase",
      "translation": "Artırırım"
    },
    "presentContinuous": {
      "form": "I am increasing",
      "translation": "Artırıyorum"
    },
    "future": {
      "form": "I will increase",
      "translation": "Artıracağım"
    },
    "pastSimple": {
      "form": "I increase",
      "translation": "Artırırım"
    }
  },
  {
    "id": "verb_153",
    "rank": 153,
    "word": "Inform",
    "phonetic": "/ɪnˈfɔːm/",
    "translation": "Bilgilendirmek / Haber vermek",
    "exampleEn": "I informed the project manager about the upcoming database migration.",
    "grammarNote": "",
    "exampleTr": "Yaklaşan veritabanı taşıması hakkında proje yöneticisini bilgilendirdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I inform",
      "translation": "Bilgilendiririm"
    },
    "presentContinuous": {
      "form": "I am informing",
      "translation": "Bilgilendiriyorum"
    },
    "future": {
      "form": "I will inform",
      "translation": "Bilgilendireceğim"
    },
    "pastSimple": {
      "form": "I inform",
      "translation": "Bilgilendiririm"
    }
  },
  {
    "id": "verb_154",
    "rank": 154,
    "word": "Invite",
    "phonetic": "/ɪnˈvaɪt/",
    "translation": "Davet etmek",
    "exampleEn": "We invited a senior cloud architect to give a keynote speech.",
    "grammarNote": "",
    "exampleTr": "Bir açılış konuşması yapması için kıdemli bir bulut mimarını davet ettik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I invite",
      "translation": "Davet ederim"
    },
    "presentContinuous": {
      "form": "I am inviting",
      "translation": "Davet ediyorum"
    },
    "future": {
      "form": "I will invite",
      "translation": "Davet edeceğim"
    },
    "pastSimple": {
      "form": "I invite",
      "translation": "Davet ederim"
    }
  },
  {
    "id": "verb_155",
    "rank": 155,
    "word": "Join",
    "phonetic": "/dʒɔɪn/",
    "translation": "Katılmak / Üye olmak",
    "exampleEn": "I joined the HUAWEI Student Developers Türkiye Core Team this year.",
    "grammarNote": "",
    "exampleTr": "Bu yıl HUAWEI Student Developers Türkiye Çekirdek Ekibi'ne katıldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I join",
      "translation": "Katılırım"
    },
    "presentContinuous": {
      "form": "I am joining",
      "translation": "Katılıyorum"
    },
    "future": {
      "form": "I will join",
      "translation": "Katılacağım"
    },
    "pastSimple": {
      "form": "I join",
      "translation": "Katılırım"
    }
  },
  {
    "id": "verb_156",
    "rank": 156,
    "word": "Kill",
    "phonetic": "/kɪl/",
    "translation": "Sonlandırmak (İşlem) / Öldürmek",
    "exampleEn": "I killed the frozen background process using the Linux terminal.",
    "grammarNote": "",
    "exampleTr": "Linux terminalini kullanarak donmuş arka plan işlemini sonlandırdım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I kill",
      "translation": "Sonlandırırım"
    },
    "presentContinuous": {
      "form": "I am killing",
      "translation": "Sonlandırıyorum"
    },
    "future": {
      "form": "I will kill",
      "translation": "Sonlandıracağım"
    },
    "pastSimple": {
      "form": "I kill",
      "translation": "Sonlandırırım"
    }
  },
  {
    "id": "verb_157",
    "rank": 157,
    "word": "Know",
    "phonetic": "/nəʊ/",
    "translation": "Bilmek / Tanımak",
    "exampleEn": "I know how to implement custom CameraX image analysis in Android.",
    "grammarNote": "",
    "exampleTr": "Android'de özel CameraX görüntü analizini nasıl uygulayacağımı biliyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I know",
      "translation": "Bilirim"
    },
    "presentContinuous": {
      "form": "I am knowing",
      "translation": "Biliyorum"
    },
    "future": {
      "form": "I will know",
      "translation": "Bileceğim"
    },
    "pastSimple": {
      "form": "I know",
      "translation": "Bilirim"
    }
  },
  {
    "id": "verb_158",
    "rank": 158,
    "word": "Laugh",
    "phonetic": "/lɑːf/",
    "translation": "Gülmek",
    "exampleEn": "We laughed at the funny programming memes during our lunch break.",
    "grammarNote": "",
    "exampleTr": "Öğle molamız sırasında komik programlama gönderilerine güldük.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I laugh",
      "translation": "Gülerim"
    },
    "presentContinuous": {
      "form": "I am laughing",
      "translation": "Gülüyorum"
    },
    "future": {
      "form": "I will laugh",
      "translation": "Güleceğim"
    },
    "pastSimple": {
      "form": "I laugh",
      "translation": "Gülerim"
    }
  },
  {
    "id": "verb_159",
    "rank": 159,
    "word": "Lead",
    "phonetic": "/liːd/",
    "translation": "Yönetmek / Liderlik etmek",
    "exampleEn": "I lead the BozTech student technology community at our university.",
    "grammarNote": "",
    "exampleTr": "Üniversitemizdeki BozTech öğrenci teknoloji topluluğuna liderlik ediyorum / yönetiyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I lead",
      "translation": "Liderlik ederim"
    },
    "presentContinuous": {
      "form": "I am leading",
      "translation": "Liderlik ediyorum"
    },
    "future": {
      "form": "I will lead",
      "translation": "Liderlik edeceğim"
    },
    "pastSimple": {
      "form": "I lead",
      "translation": "Liderlik ederim"
    }
  },
  {
    "id": "verb_160",
    "rank": 160,
    "word": "Lend",
    "phonetic": "/lend/",
    "translation": "Ödünç vermek",
    "exampleEn": "I lent my spare mechanical keyboard to my teammate yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün yedek mekanik klavyemi ekip arkadaşıma ödünç verdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I lend",
      "translation": "Ödünç veririm"
    },
    "presentContinuous": {
      "form": "I am lending",
      "translation": "Ödünç veriyorum"
    },
    "future": {
      "form": "I will lend",
      "translation": "Ödünç vereceğim"
    },
    "pastSimple": {
      "form": "I lend",
      "translation": "Ödünç veririm"
    }
  },
  {
    "id": "verb_161",
    "rank": 161,
    "word": "Let",
    "phonetic": "/let/",
    "translation": "İzin vermek / Olanak tanımak",
    "exampleEn": "Docker lets developers run isolated container environments locally.",
    "grammarNote": "",
    "exampleTr": "Docker geliştiricilerin yerel olarak yalıtılmış konteyner ortamları çalıştırmasına olanak tanır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I let",
      "translation": "İzin veririm"
    },
    "presentContinuous": {
      "form": "I am letting",
      "translation": "İzin veriyorum"
    },
    "future": {
      "form": "I will let",
      "translation": "İzin vereceğim"
    },
    "pastSimple": {
      "form": "I let",
      "translation": "İzin veririm"
    }
  },
  {
    "id": "verb_162",
    "rank": 162,
    "word": "Lie",
    "phonetic": "/laɪ/",
    "translation": "Uzanmak / Yatmak",
    "exampleEn": "I am lying on the sofa and reading an engineering article.",
    "grammarNote": "",
    "exampleTr": "Kanepede uzanıyorum ve bir mühendislik makalesi okuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I lie",
      "translation": "Uzanırım"
    },
    "presentContinuous": {
      "form": "I am liing",
      "translation": "Uzanıyorum"
    },
    "future": {
      "form": "I will lie",
      "translation": "Uzanacağım"
    },
    "pastSimple": {
      "form": "I lie",
      "translation": "Uzanırım"
    }
  },
  {
    "id": "verb_163",
    "rank": 163,
    "word": "Lose",
    "phonetic": "/luːz/",
    "translation": "Kaybetmek",
    "exampleEn": "We lost no customer data thanks to automated real-time replication.",
    "grammarNote": "",
    "exampleTr": "Otomatik gerçek zamanlı çoğaltma sayesinde hiçbir müşteri verisi kaybetmedik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I lose",
      "translation": "Kaybederim"
    },
    "presentContinuous": {
      "form": "I am losing",
      "translation": "Kaybediyorum"
    },
    "future": {
      "form": "I will lose",
      "translation": "Kaybedeceğim"
    },
    "pastSimple": {
      "form": "I lose",
      "translation": "Kaybederim"
    }
  },
  {
    "id": "verb_164",
    "rank": 164,
    "word": "Maintain",
    "phonetic": "/meɪnˈteɪn/",
    "translation": "Sürdürmek / Bakımını yapmak",
    "exampleEn": "Our team maintains three production web applications on Render and Vercel.",
    "grammarNote": "",
    "exampleTr": "Ekibimiz Render ve Vercel üzerinde üç canlı web uygulamasının bakımını sürdürmektedir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I maintain",
      "translation": "Sürdürürüm"
    },
    "presentContinuous": {
      "form": "I am maintaining",
      "translation": "Sürdürüyorum"
    },
    "future": {
      "form": "I will maintain",
      "translation": "Sürdüreceğim"
    },
    "pastSimple": {
      "form": "I maintain",
      "translation": "Sürdürürüm"
    }
  },
  {
    "id": "verb_165",
    "rank": 165,
    "word": "Manage",
    "phonetic": "/ˈmæn.ɪdʒ/",
    "translation": "Yönetmek / İdare etmek",
    "exampleEn": "I managed the PayTR payment integration and DNS configuration for özkan3d.",
    "grammarNote": "",
    "exampleTr": "özkan3d için PayTR ödeme entegrasyonunu ve DNS yapılandırmasını yönettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I manage",
      "translation": "Yönetirim"
    },
    "presentContinuous": {
      "form": "I am managing",
      "translation": "Yönetiyorum"
    },
    "future": {
      "form": "I will manage",
      "translation": "Yöneteceğim"
    },
    "pastSimple": {
      "form": "I manage",
      "translation": "Yönetirim"
    }
  },
  {
    "id": "verb_166",
    "rank": 166,
    "word": "Mind",
    "phonetic": "/maɪnd/",
    "translation": "Önemsemek / Sakınca görmek",
    "exampleEn": "Do you mind reviewing my pull request when you have fifteen minutes?",
    "grammarNote": "",
    "exampleTr": "On beş dakikanız olduğunda çekme isteğimi incelemenizin bir sakıncası var mı?",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I mind",
      "translation": "Önemserim"
    },
    "presentContinuous": {
      "form": "I am minding",
      "translation": "Önemsiyorum"
    },
    "future": {
      "form": "I will mind",
      "translation": "Önemseyeceğim"
    },
    "pastSimple": {
      "form": "I mind",
      "translation": "Önemserim"
    }
  },
  {
    "id": "verb_167",
    "rank": 167,
    "word": "Miss",
    "phonetic": "/mɪs/",
    "translation": "Kaçırmak / Özlemek",
    "exampleEn": "I missed the morning sprint standup due to a heavy traffic jam.",
    "grammarNote": "",
    "exampleTr": "Yoğun bir trafik sıkışıklığı nedeniyle sabah sprint durum toplantısını kaçırdım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I miss",
      "translation": "Kaçarım / Özlerim"
    },
    "presentContinuous": {
      "form": "I am missing",
      "translation": "Kaçırıyorum / Özlüyorum"
    },
    "future": {
      "form": "I will miss",
      "translation": "Kaçıracağım / Özleyeceğim"
    },
    "pastSimple": {
      "form": "I miss",
      "translation": "Kaçarım / Özlerim"
    }
  },
  {
    "id": "verb_168",
    "rank": 168,
    "word": "Mix",
    "phonetic": "/mɪks/",
    "translation": "Karıştırmak",
    "exampleEn": "Do not mix business logic with user interface rendering code.",
    "grammarNote": "",
    "exampleTr": "İş mantığını kullanıcı arayüzü çizim koduyla birbirine karıştırmayın.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I mix",
      "translation": "Karıştırırım"
    },
    "presentContinuous": {
      "form": "I am mixing",
      "translation": "Karıştırıyorum"
    },
    "future": {
      "form": "I will mix",
      "translation": "Karıştıracağım"
    },
    "pastSimple": {
      "form": "I mix",
      "translation": "Karıştırırım"
    }
  },
  {
    "id": "verb_169",
    "rank": 169,
    "word": "Notice",
    "phonetic": "/ˈnəʊ.tɪs/",
    "translation": "Fark etmek",
    "exampleEn": "I noticed an unhandled null pointer exception in the crash logs.",
    "grammarNote": "",
    "exampleTr": "Çökme günlüklerinde işlenmemiş bir null pointer istisnası fark ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I notice",
      "translation": "Fark ederim"
    },
    "presentContinuous": {
      "form": "I am noticing",
      "translation": "Fark ediyorum"
    },
    "future": {
      "form": "I will notice",
      "translation": "Fark edeceğim"
    },
    "pastSimple": {
      "form": "I notice",
      "translation": "Fark ederim"
    }
  },
  {
    "id": "verb_170",
    "rank": 170,
    "word": "Offer",
    "phonetic": "/ˈɒf.ər/",
    "translation": "Sunmak / Teklif etmek",
    "exampleEn": "The cloud hosting company offered us free credits for our startup.",
    "grammarNote": "",
    "exampleTr": "Bulut barındırma şirketi girişimimiz için bize ücretsiz krediler sundu / teklif etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I offer",
      "translation": "Sunarım"
    },
    "presentContinuous": {
      "form": "I am offering",
      "translation": "Sunuyorum"
    },
    "future": {
      "form": "I will offer",
      "translation": "Sunacağım"
    },
    "pastSimple": {
      "form": "I offer",
      "translation": "Sunarım"
    }
  },
  {
    "id": "verb_171",
    "rank": 171,
    "word": "Order",
    "phonetic": "/ˈɔː.dər/",
    "translation": "Sipariş etmek / Sıralamak",
    "exampleEn": "I ordered two new NVMe solid-state drives for our database server.",
    "grammarNote": "",
    "exampleTr": "Veritabanı sunucumuz için iki yeni NVMe katı hal sürücüsü sipariş ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I order",
      "translation": "Sipariş ederim"
    },
    "presentContinuous": {
      "form": "I am ordering",
      "translation": "Sipariş ediyorum"
    },
    "future": {
      "form": "I will order",
      "translation": "Sipariş edeceğim"
    },
    "pastSimple": {
      "form": "I order",
      "translation": "Sipariş ederim"
    }
  },
  {
    "id": "verb_172",
    "rank": 172,
    "word": "Organize",
    "phonetic": "/ˈɔː.ɡən.aɪz/",
    "translation": "Düzenlemek / Organize etmek",
    "exampleEn": "We organized an online hackathon for university software engineering students.",
    "grammarNote": "",
    "exampleTr": "Üniversite yazılım mühendisliği öğrencileri için çevrim içi bir hackathon düzenledik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I organize",
      "translation": "Düzenlerim"
    },
    "presentContinuous": {
      "form": "I am organizing",
      "translation": "Düzenliyorum"
    },
    "future": {
      "form": "I will organize",
      "translation": "Düzenleyeceğim"
    },
    "pastSimple": {
      "form": "I organize",
      "translation": "Düzenlerim"
    }
  },
  {
    "id": "verb_173",
    "rank": 173,
    "word": "Pass",
    "phonetic": "/pɑːs/",
    "translation": "Geçmek / İletmek",
    "exampleEn": "All automated integration test suites passed without a single failure.",
    "grammarNote": "",
    "exampleTr": "Tüm otomatik entegrasyon testi paketleri tek bir hata olmadan geçti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I pass",
      "translation": "Geçerim / İletirim"
    },
    "presentContinuous": {
      "form": "I am passing",
      "translation": "Geçiyorum / İletiyorum"
    },
    "future": {
      "form": "I will pass",
      "translation": "Geçeceğim / İleteceğim"
    },
    "pastSimple": {
      "form": "I pass",
      "translation": "Geçerim / İletirim"
    }
  },
  {
    "id": "verb_174",
    "rank": 174,
    "word": "Perform",
    "phonetic": "/pəˈfɔːm/",
    "translation": "Performans göstermek / İcra etmek",
    "exampleEn": "Our neural network performed with 98% accuracy on the test dataset.",
    "grammarNote": "",
    "exampleTr": "Yapay sinir ağımız test veri setinde %98 doğrulukla performans gösterdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I perform",
      "translation": "İcra ederim"
    },
    "presentContinuous": {
      "form": "I am performing",
      "translation": "İcra ediyorum"
    },
    "future": {
      "form": "I will perform",
      "translation": "İcra edeceğim"
    },
    "pastSimple": {
      "form": "I perform",
      "translation": "İcra ederim"
    }
  },
  {
    "id": "verb_175",
    "rank": 175,
    "word": "Pick",
    "phonetic": "/pɪk/",
    "translation": "Seçmek / Toplamak",
    "exampleEn": "I picked Tailwind CSS for fast and responsive web UI styling.",
    "grammarNote": "",
    "exampleTr": "Hızlı ve duyarlı web arayüzü biçimlendirmesi için Tailwind CSS'i seçtim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I pick",
      "translation": "Seçerim"
    },
    "presentContinuous": {
      "form": "I am picking",
      "translation": "Seçiyorum"
    },
    "future": {
      "form": "I will pick",
      "translation": "Seçeceğim"
    },
    "pastSimple": {
      "form": "I pick",
      "translation": "Seçerim"
    }
  },
  {
    "id": "verb_176",
    "rank": 176,
    "word": "Point",
    "phonetic": "/pɔɪnt/",
    "translation": "İşaret etmek / Göstermek",
    "exampleEn": "The senior architect pointed out several potential bottlenecks in our design.",
    "grammarNote": "",
    "exampleTr": "Kıdemli mimar tasarımımızdaki birkaç potansiyel darboğaza işaret etti / gösterdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I point",
      "translation": "İşaret ederim"
    },
    "presentContinuous": {
      "form": "I am pointing",
      "translation": "İşaret ediyorum"
    },
    "future": {
      "form": "I will point",
      "translation": "İşaret edeceğim"
    },
    "pastSimple": {
      "form": "I point",
      "translation": "İşaret ederim"
    }
  },
  {
    "id": "verb_177",
    "rank": 177,
    "word": "Prefer",
    "phonetic": "/prɪˈfɜːr/",
    "translation": "Tercih etmek",
    "exampleEn": "I prefer writing asynchronous code in Kotlin using Coroutines.",
    "grammarNote": "",
    "exampleTr": "Kotlin'de Coroutines kullanarak eşzamansız kod yazmayı tercih ederim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I prefer",
      "translation": "Tercih ederim"
    },
    "presentContinuous": {
      "form": "I am prefering",
      "translation": "Tercih ediyorum"
    },
    "future": {
      "form": "I will prefer",
      "translation": "Tercih edeceğim"
    },
    "pastSimple": {
      "form": "I prefer",
      "translation": "Tercih ederim"
    }
  },
  {
    "id": "verb_178",
    "rank": 178,
    "word": "Prevent",
    "phonetic": "/prɪˈvent/",
    "translation": "Önlemek / Engel olmak",
    "exampleEn": "Input sanitization prevents SQL injection and cross-site scripting attacks.",
    "grammarNote": "",
    "exampleTr": "Girdi temizleme, SQL enjeksiyonu ve siteler arası betik çalıştırma saldırılarını önler.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I prevent",
      "translation": "Önlerim"
    },
    "presentContinuous": {
      "form": "I am preventing",
      "translation": "Önlüyorım"
    },
    "future": {
      "form": "I will prevent",
      "translation": "Önleyeceğim"
    },
    "pastSimple": {
      "form": "I prevent",
      "translation": "Önlerim"
    }
  },
  {
    "id": "verb_179",
    "rank": 179,
    "word": "Produce",
    "phonetic": "/prəˈdjuːs/",
    "translation": "Üretmek",
    "exampleEn": "The compilation script produced an optimized release APK file.",
    "grammarNote": "",
    "exampleTr": "Derleme betiği optimize edilmiş bir sürüm APK dosyası üretti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I produce",
      "translation": "Üretirim"
    },
    "presentContinuous": {
      "form": "I am producing",
      "translation": "Üretiyorum"
    },
    "future": {
      "form": "I will produce",
      "translation": "Üreteceğim"
    },
    "pastSimple": {
      "form": "I produce",
      "translation": "Üretirim"
    }
  },
  {
    "id": "verb_180",
    "rank": 180,
    "word": "Promise",
    "phonetic": "/ˈprɒm.ɪs/",
    "translation": "Söz vermek",
    "exampleEn": "I promise I will deliver the API documentation before the end of the sprint.",
    "grammarNote": "",
    "exampleTr": "Sprint bitiminden önce API dokümantasyonunu teslim edeceğime söz veriyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I promise",
      "translation": "Söz veririm"
    },
    "presentContinuous": {
      "form": "I am promising",
      "translation": "Söz veriyorum"
    },
    "future": {
      "form": "I will promise",
      "translation": "Söz vereceğim"
    },
    "pastSimple": {
      "form": "I promise",
      "translation": "Söz veririm"
    }
  },
  {
    "id": "verb_181",
    "rank": 181,
    "word": "Protect",
    "phonetic": "/prəˈtekt/",
    "translation": "Korumak",
    "exampleEn": "End-to-end encryption protects sensitive user communications across the network.",
    "grammarNote": "",
    "exampleTr": "Uçtan uca şifreleme ağ genelinde hassas kullanıcı iletişimlerini korur.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I protect",
      "translation": "Korurum"
    },
    "presentContinuous": {
      "form": "I am protecting",
      "translation": "Koruyorum"
    },
    "future": {
      "form": "I will protect",
      "translation": "Koruyacağım"
    },
    "pastSimple": {
      "form": "I protect",
      "translation": "Korurum"
    }
  },
  {
    "id": "verb_182",
    "rank": 182,
    "word": "Prove",
    "phonetic": "/pruːv/",
    "translation": "Kanıtlamak / İspatlamak",
    "exampleEn": "The empirical benchmark proved that our caching strategy cut latency by half.",
    "grammarNote": "",
    "exampleTr": "Ampirik performans testi, önbellekleme stratejimizin gecikmeyi yarı yarıya düşürdüğünü kanıtladı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I prove",
      "translation": "Kanıtlarım"
    },
    "presentContinuous": {
      "form": "I am proving",
      "translation": "Kanıtlıyorum"
    },
    "future": {
      "form": "I will prove",
      "translation": "Kanıtlayacağım"
    },
    "pastSimple": {
      "form": "I prove",
      "translation": "Kanıtlarım"
    }
  },
  {
    "id": "verb_183",
    "rank": 183,
    "word": "Provide",
    "phonetic": "/prəˈvaɪd/",
    "translation": "Sağlamak / Temin etmek",
    "exampleEn": "The cloud platform provides automatic horizontal auto-scaling during traffic surges.",
    "grammarNote": "",
    "exampleTr": "Bulut platformu trafik artışları sırasında otomatik yatay ölçeklendirme sağlar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I provide",
      "translation": "Sağlarım"
    },
    "presentContinuous": {
      "form": "I am providing",
      "translation": "Sağlıyorum"
    },
    "future": {
      "form": "I will provide",
      "translation": "Sağlayacağım"
    },
    "pastSimple": {
      "form": "I provide",
      "translation": "Sağlarım"
    }
  },
  {
    "id": "verb_184",
    "rank": 184,
    "word": "Push",
    "phonetic": "/pʊʃ/",
    "translation": "İtmek / Göndermek (Git)",
    "exampleEn": "I pushed my latest commits to the remote GitHub repository.",
    "grammarNote": "",
    "exampleTr": "En son commit'lerimi uzak GitHub deposuna gönderdim (push ettim).",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I push",
      "translation": "Gönderirim"
    },
    "presentContinuous": {
      "form": "I am pushing",
      "translation": "Gönderiyorum"
    },
    "future": {
      "form": "I will push",
      "translation": "Göndereceğim"
    },
    "pastSimple": {
      "form": "I push",
      "translation": "Gönderirim"
    }
  },
  {
    "id": "verb_185",
    "rank": 185,
    "word": "Reach",
    "phonetic": "/riːtʃ/",
    "translation": "Ulaşmak / Erişmek",
    "exampleEn": "Our mobile application reached ten thousand active daily users this month.",
    "grammarNote": "",
    "exampleTr": "Mobil uygulamamız bu ay on bin günlük aktif kullanıcıya ulaştı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I reach",
      "translation": "Ulaşırım"
    },
    "presentContinuous": {
      "form": "I am reaching",
      "translation": "Ulaşıyorum"
    },
    "future": {
      "form": "I will reach",
      "translation": "Ulaşacağım"
    },
    "pastSimple": {
      "form": "I reach",
      "translation": "Ulaşırım"
    }
  },
  {
    "id": "verb_186",
    "rank": 186,
    "word": "Receive",
    "phonetic": "/rɪˈsiːv/",
    "translation": "Teslim almak / Almak",
    "exampleEn": "I received an automated alert when the server CPU spiked to 95%.",
    "grammarNote": "",
    "exampleTr": "Sunucu işlemcisi %95'e fırladığında otomatik bir uyarı aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I receive",
      "translation": "Alırım"
    },
    "presentContinuous": {
      "form": "I am receiving",
      "translation": "Alıyorum"
    },
    "future": {
      "form": "I will receive",
      "translation": "Alacağım"
    },
    "pastSimple": {
      "form": "I receive",
      "translation": "Alırım"
    }
  },
  {
    "id": "verb_187",
    "rank": 187,
    "word": "Reduce",
    "phonetic": "/rɪˈdjuːs/",
    "translation": "Azaltmak / Düşürmek",
    "exampleEn": "Database sharding reduced average query response time significantly.",
    "grammarNote": "",
    "exampleTr": "Veritabanı parçalama ortalama sorgu yanıt süresini önemli ölçüde azalttı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I reduce",
      "translation": "Azaltırım"
    },
    "presentContinuous": {
      "form": "I am reducing",
      "translation": "Azaltıyorum"
    },
    "future": {
      "form": "I will reduce",
      "translation": "Azaltacağım"
    },
    "pastSimple": {
      "form": "I reduce",
      "translation": "Azaltırım"
    }
  },
  {
    "id": "verb_188",
    "rank": 188,
    "word": "Refuse",
    "phonetic": "/rɪˈfjuːz/",
    "translation": "Reddetmek",
    "exampleEn": "The authentication server refused the connection due to an invalid token.",
    "grammarNote": "",
    "exampleTr": "Kimlik doğrulama sunucusu geçersiz bir belirteç nedeniyle bağlantıyı reddetti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I refuse",
      "translation": "Rederim"
    },
    "presentContinuous": {
      "form": "I am refusing",
      "translation": "Reddediyorum"
    },
    "future": {
      "form": "I will refuse",
      "translation": "Reddedeceğim"
    },
    "pastSimple": {
      "form": "I refuse",
      "translation": "Rederim"
    }
  },
  {
    "id": "verb_189",
    "rank": 189,
    "word": "Replace",
    "phonetic": "/rɪˈpleɪs/",
    "translation": "Değiştirmek / Yerine koymak",
    "exampleEn": "We replaced the outdated REST polling mechanism with real-time WebSockets.",
    "grammarNote": "",
    "exampleTr": "Güncelliğini yitirmiş REST yoklama mekanizmasını gerçek zamanlı WebSockets ile değiştirdik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I replace",
      "translation": "Değiştiririm"
    },
    "presentContinuous": {
      "form": "I am replacing",
      "translation": "Değiştiriyorum"
    },
    "future": {
      "form": "I will replace",
      "translation": "Değiştireceğim"
    },
    "pastSimple": {
      "form": "I replace",
      "translation": "Değiştiririm"
    }
  },
  {
    "id": "verb_190",
    "rank": 190,
    "word": "Reply",
    "phonetic": "/rɪˈplaɪ/",
    "translation": "Cevap vermek / Yanıtlamak",
    "exampleEn": "I replied to the client's technical inquiry with a detailed breakdown.",
    "grammarNote": "",
    "exampleTr": "Müşterinin teknik sorusunu ayrıntılı bir dökümle yanıtladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I reply",
      "translation": "Yanıtlarım"
    },
    "presentContinuous": {
      "form": "I am replying",
      "translation": "Yanıtlıyorum"
    },
    "future": {
      "form": "I will reply",
      "translation": "Yanıtlayacağım"
    },
    "pastSimple": {
      "form": "I reply",
      "translation": "Yanıtlarım"
    }
  },
  {
    "id": "verb_191",
    "rank": 191,
    "word": "Report",
    "phonetic": "/rɪˈpɔːt/",
    "translation": "Bildirmek / Raporlamak",
    "exampleEn": "The automated monitoring system reported zero critical downtime incidents.",
    "grammarNote": "",
    "exampleTr": "Otomatik izleme sistemi sıfır kritik kesinti olayı bildirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I report",
      "translation": "Raporlarım"
    },
    "presentContinuous": {
      "form": "I am reporting",
      "translation": "Raporluyorum"
    },
    "future": {
      "form": "I will report",
      "translation": "Raporlayacağım"
    },
    "pastSimple": {
      "form": "I report",
      "translation": "Raporlarım"
    }
  },
  {
    "id": "verb_192",
    "rank": 192,
    "word": "Require",
    "phonetic": "/rɪˈkwaɪər/",
    "translation": "Gerektirmek / Şart koşmak",
    "exampleEn": "Modifying production database records requires multi-factor administrator approval.",
    "grammarNote": "",
    "exampleTr": "Canlı veritabanı kayıtlarını değiştirmek çok faktörlü yönetici onayı gerektirir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I require",
      "translation": "Gerektiririm"
    },
    "presentContinuous": {
      "form": "I am requiring",
      "translation": "Gerektiriyorum"
    },
    "future": {
      "form": "I will require",
      "translation": "Gerektireceğim"
    },
    "pastSimple": {
      "form": "I require",
      "translation": "Gerektiririm"
    }
  },
  {
    "id": "verb_193",
    "rank": 193,
    "word": "Reset",
    "phonetic": "/riːˈset/",
    "translation": "Sıfırlamak",
    "exampleEn": "I reset the development virtual machine to its initial clean state.",
    "grammarNote": "",
    "exampleTr": "Geliştirme sanal makinesini ilk temiz durumuna sıfırladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I reset",
      "translation": "Sıfırlarım"
    },
    "presentContinuous": {
      "form": "I am reseting",
      "translation": "Sıfırlıyorum"
    },
    "future": {
      "form": "I will reset",
      "translation": "Sıfırlayacağım"
    },
    "pastSimple": {
      "form": "I reset",
      "translation": "Sıfırlarım"
    }
  },
  {
    "id": "verb_194",
    "rank": 194,
    "word": "Resolve",
    "phonetic": "/rɪˈzɒlv/",
    "translation": "Çözmek / Gidermek",
    "exampleEn": "I resolved the complex Git merge conflicts before the release deadline.",
    "grammarNote": "",
    "exampleTr": "Sürüm teslim tarihinden önce karmaşık Git birleştirme çakışmalarını çözdüm / giderdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I resolve",
      "translation": "Çözerim"
    },
    "presentContinuous": {
      "form": "I am resolving",
      "translation": "Çözüyorum"
    },
    "future": {
      "form": "I will resolve",
      "translation": "Çözeceğim"
    },
    "pastSimple": {
      "form": "I resolve",
      "translation": "Çözerim"
    }
  },
  {
    "id": "verb_195",
    "rank": 195,
    "word": "Respond",
    "phonetic": "/rɪˈspɒnd/",
    "translation": "Yanıt vermek / Tepki vermek",
    "exampleEn": "The REST API responded with a 200 OK status in twelve milliseconds.",
    "grammarNote": "",
    "exampleTr": "REST API on iki milisaniyede 200 OK durumuyla yanıt verdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I respond",
      "translation": "Yanıt veririm"
    },
    "presentContinuous": {
      "form": "I am responding",
      "translation": "Yanıt veriyorum"
    },
    "future": {
      "form": "I will respond",
      "translation": "Yanıt vereceğim"
    },
    "pastSimple": {
      "form": "I respond",
      "translation": "Yanıt veririm"
    }
  },
  {
    "id": "verb_196",
    "rank": 196,
    "word": "Rest",
    "phonetic": "/rest/",
    "translation": "Dinlenmek",
    "exampleEn": "I rested for thirty minutes after completing the intense coding session.",
    "grammarNote": "",
    "exampleTr": "Yoğun kodlama oturumunu tamamladıktan sonra otuz dakika dinlendim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I rest",
      "translation": "Dinlenirim"
    },
    "presentContinuous": {
      "form": "I am resting",
      "translation": "Dinleniyorum"
    },
    "future": {
      "form": "I will rest",
      "translation": "Dinleneceğim"
    },
    "pastSimple": {
      "form": "I rest",
      "translation": "Dinlenirim"
    }
  },
  {
    "id": "verb_197",
    "rank": 197,
    "word": "Return",
    "phonetic": "/rɪˈtɜːn/",
    "translation": "Geri dönmek / Döndürmek",
    "exampleEn": "The database helper function returns a list of active user entities.",
    "grammarNote": "",
    "exampleTr": "Veritabanı yardımcı fonksiyonu aktif kullanıcı varlıklarının bir listesini döndürür.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I return",
      "translation": "Döndürürüm / Dönerim"
    },
    "presentContinuous": {
      "form": "I am returning",
      "translation": "Döndürüyorum / Dönüyorum"
    },
    "future": {
      "form": "I will return",
      "translation": "Döndüreceğim / Döneceğim"
    },
    "pastSimple": {
      "form": "I return",
      "translation": "Döndürürüm / Dönerim"
    }
  },
  {
    "id": "verb_198",
    "rank": 198,
    "word": "Review",
    "phonetic": "/rɪˈvjuː/",
    "translation": "İncelemek / Gözden geçirmek",
    "exampleEn": "I will review your pull request and leave inline comments on GitHub.",
    "grammarNote": "",
    "exampleTr": "Çekme isteğinizi inceleyeceğim ve GitHub'da satır içi yorumlar bırakacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I review",
      "translation": "İncelerim"
    },
    "presentContinuous": {
      "form": "I am reviewing",
      "translation": "İnceliyorum"
    },
    "future": {
      "form": "I will review",
      "translation": "İnceleyeceğim"
    },
    "pastSimple": {
      "form": "I review",
      "translation": "İncelerim"
    }
  },
  {
    "id": "verb_199",
    "rank": 199,
    "word": "Ride",
    "phonetic": "/raɪd/",
    "translation": "Sürmek / Binmek",
    "exampleEn": "I ride my bicycle to work every morning when the weather is sunny.",
    "grammarNote": "",
    "exampleTr": "Hava güneşli olduğunda her sabah işe bisikletimi sürerim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I ride",
      "translation": "Sürerim / Binerim"
    },
    "presentContinuous": {
      "form": "I am riding",
      "translation": "Sürüyorum / Biniyorum"
    },
    "future": {
      "form": "I will ride",
      "translation": "Süreceğim / Bineceğim"
    },
    "pastSimple": {
      "form": "I ride",
      "translation": "Sürerim / Binerim"
    }
  },
  {
    "id": "verb_200",
    "rank": 200,
    "word": "Search",
    "phonetic": "/sɜːtʃ/",
    "translation": "Aramak / Araştırmak",
    "exampleEn": "I searched the official documentation to find the correct library method.",
    "grammarNote": "",
    "exampleTr": "Doğru kütüphane metodunu bulmak için resmi dokümantasyonu araştırdım / aradım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I search",
      "translation": "Ararım"
    },
    "presentContinuous": {
      "form": "I am searching",
      "translation": "Arıyorum"
    },
    "future": {
      "form": "I will search",
      "translation": "Arayacağım"
    },
    "pastSimple": {
      "form": "I search",
      "translation": "Ararım"
    }
  }
] as LibraryWordEntry[];

export const VERBS_300: LibraryWordEntry[] = [
  {
    "id": "verb_201",
    "rank": 201,
    "word": "Achieve",
    "phonetic": "/əˈtʃiːv/",
    "translation": "Başarmak / Elde etmek",
    "exampleEn": "Our AI research model achieved 96% classification accuracy.",
    "grammarNote": "",
    "exampleTr": "Yapay zeka araştırma modelimiz %96 sınıflandırma doğruluğu elde etti / başardı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I achieve",
      "translation": "Başarırım"
    },
    "presentContinuous": {
      "form": "I am achieving",
      "translation": "Başarıyorum"
    },
    "future": {
      "form": "I will achieve",
      "translation": "Başaracağım"
    },
    "pastSimple": {
      "form": "I achieve",
      "translation": "Başarırım"
    }
  },
  {
    "id": "verb_202",
    "rank": 202,
    "word": "Admire",
    "phonetic": "/ədˈmaɪər/",
    "translation": "Hayran olmak / Takdir etmek",
    "exampleEn": "I admire your clean and modular software architecture.",
    "grammarNote": "",
    "exampleTr": "Temiz ve modüler yazılım mimarinizi takdir ediyorum / hayranım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I admire",
      "translation": "Takdir ederim"
    },
    "presentContinuous": {
      "form": "I am admiring",
      "translation": "Takdir ediyorum"
    },
    "future": {
      "form": "I will admire",
      "translation": "Takdir edeceğim"
    },
    "pastSimple": {
      "form": "I admire",
      "translation": "Takdir ederim"
    }
  },
  {
    "id": "verb_203",
    "rank": 203,
    "word": "Admit",
    "phonetic": "/ədˈmɪt/",
    "translation": "İtiraf etmek / Kabul etmek",
    "exampleEn": "The developer admitted making a syntax error in the configuration.",
    "grammarNote": "",
    "exampleTr": "Geliştirici yapılandırmada bir sözdizimi hatası yaptığını kabul etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I admit",
      "translation": "Kabul ederim"
    },
    "presentContinuous": {
      "form": "I am admitting",
      "translation": "Kabul ediyorum"
    },
    "future": {
      "form": "I will admit",
      "translation": "Kabul edeceğim"
    },
    "pastSimple": {
      "form": "I admit",
      "translation": "Kabul ederim"
    }
  },
  {
    "id": "verb_204",
    "rank": 204,
    "word": "Advise",
    "phonetic": "/ədˈvaɪz/",
    "translation": "Tavsiye etmek / Öğütlemek",
    "exampleEn": "I advised the team to implement asynchronous caching in Redis.",
    "grammarNote": "",
    "exampleTr": "Ekibe Redis'te eşzamansız önbellekleme uygulamalarını tavsiye ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I advise",
      "translation": "Tavsiye ederim"
    },
    "presentContinuous": {
      "form": "I am advising",
      "translation": "Tavsiye ediyorum"
    },
    "future": {
      "form": "I will advise",
      "translation": "Tavsiye edeceğim"
    },
    "pastSimple": {
      "form": "I advise",
      "translation": "Tavsiye ederim"
    }
  },
  {
    "id": "verb_205",
    "rank": 205,
    "word": "Affect",
    "phonetic": "/əˈfekt/",
    "translation": "Etkilemek",
    "exampleEn": "The server outage affected thousands of active mobile users.",
    "grammarNote": "",
    "exampleTr": "Sunucu kesintisi binlerce aktif mobil kullanıcıyı etkiledi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I affect",
      "translation": "Etkilerim"
    },
    "presentContinuous": {
      "form": "I am affecting",
      "translation": "Etkiliyorum"
    },
    "future": {
      "form": "I will affect",
      "translation": "Etkileyeceğim"
    },
    "pastSimple": {
      "form": "I affect",
      "translation": "Etkilerim"
    }
  },
  {
    "id": "verb_206",
    "rank": 206,
    "word": "Afford",
    "phonetic": "/əˈfɔːd/",
    "translation": "Maddi gücü yetmek",
    "exampleEn": "Our startup can afford dedicated multi-GPU cloud instances now.",
    "grammarNote": "",
    "exampleTr": "Girişimimizin artık özel çoklu GPU bulut sunucularına maddi gücü yetebiliyor.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I afford",
      "translation": "Gücüm yeter"
    },
    "presentContinuous": {
      "form": "I am affording",
      "translation": "Gücüm yetiyor"
    },
    "future": {
      "form": "I will afford",
      "translation": "Gücüm yetecek"
    },
    "pastSimple": {
      "form": "I afford",
      "translation": "Gücüm yeter"
    }
  },
  {
    "id": "verb_207",
    "rank": 207,
    "word": "Analyze",
    "phonetic": "/ˈæn.əl.aɪz/",
    "translation": "Analiz etmek / İncelemek",
    "exampleEn": "I am analyzing the memory heap dumps to pinpoint the leak.",
    "grammarNote": "",
    "exampleTr": "Sızıntıyı tam olarak belirlemek için bellek yığını dökümlerini analiz ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I analyze",
      "translation": "Analiz ederim"
    },
    "presentContinuous": {
      "form": "I am analyzing",
      "translation": "Analiz ediyorum"
    },
    "future": {
      "form": "I will analyze",
      "translation": "Analiz edeceğim"
    },
    "pastSimple": {
      "form": "I analyze",
      "translation": "Analiz ederim"
    }
  },
  {
    "id": "verb_208",
    "rank": 208,
    "word": "Announce",
    "phonetic": "/əˈnaʊns/",
    "translation": "Duyurmak / İlan etmek",
    "exampleEn": "The tech community announced an upcoming open-source hackathon.",
    "grammarNote": "",
    "exampleTr": "Teknoloji topluluğu yaklaşan bir açık kaynak hackathonunu duyurdu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I announce",
      "translation": "Duyururum"
    },
    "presentContinuous": {
      "form": "I am announcing",
      "translation": "Duyuruyorum"
    },
    "future": {
      "form": "I will announce",
      "translation": "Duyuracağım"
    },
    "pastSimple": {
      "form": "I announce",
      "translation": "Duyururum"
    }
  },
  {
    "id": "verb_209",
    "rank": 209,
    "word": "Apologize",
    "phonetic": "/əˈpɒl.ə.dʒaɪz/",
    "translation": "Özür dilemek",
    "exampleEn": "I apologized to the client for the temporary service interruption.",
    "grammarNote": "",
    "exampleTr": "Geçici servis kesintisi nedeniyle müşteriden özür diledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I apologize",
      "translation": "Özür dilerim"
    },
    "presentContinuous": {
      "form": "I am apologizing",
      "translation": "Özür diliyorum"
    },
    "future": {
      "form": "I will apologize",
      "translation": "Özür dileyeceğim"
    },
    "pastSimple": {
      "form": "I apologize",
      "translation": "Özür dilerim"
    }
  },
  {
    "id": "verb_210",
    "rank": 210,
    "word": "Approve",
    "phonetic": "/əˈpruːv/",
    "translation": "Onaylamak",
    "exampleEn": "The senior architect approved my pull request on GitHub.",
    "grammarNote": "",
    "exampleTr": "Kıdemli mimar GitHub'daki çekme isteğimi (PR) onayladı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I approve",
      "translation": "Onaylarım"
    },
    "presentContinuous": {
      "form": "I am approving",
      "translation": "Onaylıyorum"
    },
    "future": {
      "form": "I will approve",
      "translation": "Onaylayacağım"
    },
    "pastSimple": {
      "form": "I approve",
      "translation": "Onaylarım"
    }
  },
  {
    "id": "verb_211",
    "rank": 211,
    "word": "Argue",
    "phonetic": "/ˈɑːɡ.juː/",
    "translation": "Tartışmak / İddia etmek",
    "exampleEn": "We argued about the best state management approach for React.",
    "grammarNote": "",
    "exampleTr": "React için en iyi durum yönetimi yaklaşımı hakkında tartıştık.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I argue",
      "translation": "Tartışırım"
    },
    "presentContinuous": {
      "form": "I am arguing",
      "translation": "Tartışıyorum"
    },
    "future": {
      "form": "I will argue",
      "translation": "Tartışacağım"
    },
    "pastSimple": {
      "form": "I argue",
      "translation": "Tartışırım"
    }
  },
  {
    "id": "verb_212",
    "rank": 212,
    "word": "Arrange",
    "phonetic": "/əˈreɪndʒ/",
    "translation": "Düzenlemek / Ayarlamak",
    "exampleEn": "I arranged a technical synchronization meeting for tomorrow morning.",
    "grammarNote": "",
    "exampleTr": "Yarın sabah için teknik bir senkronizasyon toplantısı ayarladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I arrange",
      "translation": "Ayarlarım"
    },
    "presentContinuous": {
      "form": "I am arranging",
      "translation": "Ayarlıyorum"
    },
    "future": {
      "form": "I will arrange",
      "translation": "Ayarlayacağım"
    },
    "pastSimple": {
      "form": "I arrange",
      "translation": "Ayarlarım"
    }
  },
  {
    "id": "verb_213",
    "rank": 213,
    "word": "Arrest",
    "phonetic": "/əˈrest/",
    "translation": "Durdurmak / Tutuklamak",
    "exampleEn": "The firewall arrested the suspicious malicious network packets.",
    "grammarNote": "",
    "exampleTr": "Güvenlik duvarı şüpheli kötü niyetli ağ paketlerini durdurdu / engelledi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I arrest",
      "translation": "Durdururum"
    },
    "presentContinuous": {
      "form": "I am arresting",
      "translation": "Durduruyorum"
    },
    "future": {
      "form": "I will arrest",
      "translation": "Durduracağım"
    },
    "pastSimple": {
      "form": "I arrest",
      "translation": "Durdururum"
    }
  },
  {
    "id": "verb_214",
    "rank": 214,
    "word": "Attach",
    "phonetic": "/əˈtætʃ/",
    "translation": "Eklemek / İliştirmek",
    "exampleEn": "I attached the compiled benchmark log file to my email.",
    "grammarNote": "",
    "exampleTr": "Derlenmiş performans testi günlük dosyasını e-postama ekledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I attach",
      "translation": "Eklerim"
    },
    "presentContinuous": {
      "form": "I am attaching",
      "translation": "Ekliyorum"
    },
    "future": {
      "form": "I will attach",
      "translation": "Ekleyeceğim"
    },
    "pastSimple": {
      "form": "I attach",
      "translation": "Eklerim"
    }
  },
  {
    "id": "verb_215",
    "rank": 215,
    "word": "Attack",
    "phonetic": "/əˈtæk/",
    "translation": "Saldırmak",
    "exampleEn": "A distributed botnet attacked our public API endpoints yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün dağıtık bir botnet herkese açık API uç noktalarımıza saldırdı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I attack",
      "translation": "Saldırırım"
    },
    "presentContinuous": {
      "form": "I am attacking",
      "translation": "Saldırıyorum"
    },
    "future": {
      "form": "I will attack",
      "translation": "Saldıracağım"
    },
    "pastSimple": {
      "form": "I attack",
      "translation": "Saldırırım"
    }
  },
  {
    "id": "verb_216",
    "rank": 216,
    "word": "Attempt",
    "phonetic": "/əˈtempt/",
    "translation": "Girişimde bulunmak / Denemek",
    "exampleEn": "The automated script attempted to reconnect five times.",
    "grammarNote": "",
    "exampleTr": "Otomatik betik beş kez yeniden bağlanma girişiminde bulundu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I attempt",
      "translation": "Denerim / Girişirim"
    },
    "presentContinuous": {
      "form": "I am attempting",
      "translation": "Deniyorum / Girişiyorum"
    },
    "future": {
      "form": "I will attempt",
      "translation": "Deneceğim / Girişeceğim"
    },
    "pastSimple": {
      "form": "I attempt",
      "translation": "Denerim / Girişirim"
    }
  },
  {
    "id": "verb_217",
    "rank": 217,
    "word": "Attend",
    "phonetic": "/əˈtend/",
    "translation": "Katılmak / İştirak etmek",
    "exampleEn": "I will attend the international Google developer summit in Berlin.",
    "grammarNote": "",
    "exampleTr": "Berlin'deki uluslararası Google geliştirici zirvesine katılacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I attend",
      "translation": "Katılırım"
    },
    "presentContinuous": {
      "form": "I am attending",
      "translation": "Katılıyorum"
    },
    "future": {
      "form": "I will attend",
      "translation": "Katılacağım"
    },
    "pastSimple": {
      "form": "I attend",
      "translation": "Katılırım"
    }
  },
  {
    "id": "verb_218",
    "rank": 218,
    "word": "Attract",
    "phonetic": "/əˈtrækt/",
    "translation": "Çekmek / Cezbetmek",
    "exampleEn": "Our open-source Kotlin library attracted hundreds of stars on GitHub.",
    "grammarNote": "",
    "exampleTr": "Açık kaynaklı Kotlin kütüphanemiz GitHub'da yüzlerce yıldız çekti / kazandı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I attract",
      "translation": "Çekerim"
    },
    "presentContinuous": {
      "form": "I am attracting",
      "translation": "Çekiyorum"
    },
    "future": {
      "form": "I will attract",
      "translation": "Çekeceğim"
    },
    "pastSimple": {
      "form": "I attract",
      "translation": "Çekerim"
    }
  },
  {
    "id": "verb_219",
    "rank": 219,
    "word": "Bake",
    "phonetic": "/beɪk/",
    "translation": "Fırında pişirmek",
    "exampleEn": "I baked homemade cookies for the weekend hackathon participants.",
    "grammarNote": "",
    "exampleTr": "Hafta sonu hackathon katılımcıları için ev yapımı kurabiyeler pişirdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bake",
      "translation": "Pişiririm"
    },
    "presentContinuous": {
      "form": "I am baking",
      "translation": "Pişiriyorum"
    },
    "future": {
      "form": "I will bake",
      "translation": "Pişireceğim"
    },
    "pastSimple": {
      "form": "I bake",
      "translation": "Pişiririm"
    }
  },
  {
    "id": "verb_220",
    "rank": 220,
    "word": "Ban",
    "phonetic": "/bæn/",
    "translation": "Yasaklamak",
    "exampleEn": "The security administrator banned the malicious IP addresses.",
    "grammarNote": "",
    "exampleTr": "Güvenlik yöneticisi kötü niyetli IP adreslerini yasakladı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I ban",
      "translation": "Yasaklarım"
    },
    "presentContinuous": {
      "form": "I am banning",
      "translation": "Yasaklıyorum"
    },
    "future": {
      "form": "I will ban",
      "translation": "Yasaklayacağım"
    },
    "pastSimple": {
      "form": "I ban",
      "translation": "Yasaklarım"
    }
  },
  {
    "id": "verb_221",
    "rank": 221,
    "word": "Behave",
    "phonetic": "/bɪˈheɪv/",
    "translation": "Davranmak / Çalışmak",
    "exampleEn": "The software algorithm behaves deterministically under all edge cases.",
    "grammarNote": "",
    "exampleTr": "Yazılım algoritması tüm sınır durumlarda belirlenimci şekilde davranır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I behave",
      "translation": "Davranırım"
    },
    "presentContinuous": {
      "form": "I am behaving",
      "translation": "Davranıyorum"
    },
    "future": {
      "form": "I will behave",
      "translation": "Davranacağım"
    },
    "pastSimple": {
      "form": "I behave",
      "translation": "Davranırım"
    }
  },
  {
    "id": "verb_222",
    "rank": 222,
    "word": "Belong",
    "phonetic": "/bɪˈlɒŋ/",
    "translation": "Ait olmak",
    "exampleEn": "These encrypted database credentials belong to the root administrator.",
    "grammarNote": "",
    "exampleTr": "Bu şifrelenmiş veritabanı kimlik bilgileri kök yöneticiye aittir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I belong",
      "translation": "Ait olurum"
    },
    "presentContinuous": {
      "form": "I am belonging",
      "translation": "Ait oluyorum"
    },
    "future": {
      "form": "I will belong",
      "translation": "Ait olacağım"
    },
    "pastSimple": {
      "form": "I belong",
      "translation": "Ait olurum"
    }
  },
  {
    "id": "verb_223",
    "rank": 223,
    "word": "Bend",
    "phonetic": "/bend/",
    "translation": "Bükmek / Eğilmek",
    "exampleEn": "The robotic arm bent the metal bracket to assemble the defense module.",
    "grammarNote": "",
    "exampleTr": "Robot kol, savunma modülünü monte etmek için metal braketi büktü.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bend",
      "translation": "Bükerim"
    },
    "presentContinuous": {
      "form": "I am bending",
      "translation": "Büküyorum"
    },
    "future": {
      "form": "I will bend",
      "translation": "Bükeceğim"
    },
    "pastSimple": {
      "form": "I bend",
      "translation": "Bükerim"
    }
  },
  {
    "id": "verb_224",
    "rank": 224,
    "word": "Bet",
    "phonetic": "/bet/",
    "translation": "Bahse girmek / İddiaya girmek",
    "exampleEn": "I bet our new mobile app will reach ten thousand downloads this month.",
    "grammarNote": "",
    "exampleTr": "Bahse girerim yeni mobil uygulamamız bu ay on bin indirmeye ulaşacak.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bet",
      "translation": "Bahse girerim"
    },
    "presentContinuous": {
      "form": "I am beting",
      "translation": "Bahse giriyorum"
    },
    "future": {
      "form": "I will bet",
      "translation": "Bahse gireceğim"
    },
    "pastSimple": {
      "form": "I bet",
      "translation": "Bahse girerim"
    }
  },
  {
    "id": "verb_225",
    "rank": 225,
    "word": "Bite",
    "phonetic": "/baɪt/",
    "translation": "Isırmak",
    "exampleEn": "The dog bit the tennis ball playfully in the park.",
    "grammarNote": "",
    "exampleTr": "Köpek parkta oyun oynayarak tenis topunu ısırdı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bite",
      "translation": "Isırırım"
    },
    "presentContinuous": {
      "form": "I am biting",
      "translation": "Isırıyorum"
    },
    "future": {
      "form": "I will bite",
      "translation": "Isıracağım"
    },
    "pastSimple": {
      "form": "I bite",
      "translation": "Isırırım"
    }
  },
  {
    "id": "verb_226",
    "rank": 226,
    "word": "Blame",
    "phonetic": "/bleɪm/",
    "translation": "Suçlamak",
    "exampleEn": "Do not blame junior engineers for system architecture failures.",
    "grammarNote": "",
    "exampleTr": "Sistem mimarisi arızaları için kıdemsiz mühendisleri suçlamayın.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I blame",
      "translation": "Suçlarım"
    },
    "presentContinuous": {
      "form": "I am blaming",
      "translation": "Suçluyorum"
    },
    "future": {
      "form": "I will blame",
      "translation": "Suçlayacağım"
    },
    "pastSimple": {
      "form": "I blame",
      "translation": "Suçlarım"
    }
  },
  {
    "id": "verb_227",
    "rank": 227,
    "word": "Block",
    "phonetic": "/blɒk/",
    "translation": "Engellemek / Bloklamak",
    "exampleEn": "The web application firewall blocked an unauthorized SQL injection attack.",
    "grammarNote": "",
    "exampleTr": "Web uygulaması güvenlik duvarı yetkisiz bir SQL enjeksiyonu saldırısını engelledi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I block",
      "translation": "Engellerim"
    },
    "presentContinuous": {
      "form": "I am blocking",
      "translation": "Engelliyorum"
    },
    "future": {
      "form": "I will block",
      "translation": "Engelleyeceğim"
    },
    "pastSimple": {
      "form": "I block",
      "translation": "Engellerim"
    }
  },
  {
    "id": "verb_228",
    "rank": 228,
    "word": "Blow",
    "phonetic": "/bləʊ/",
    "translation": "Üflemek / Esmek",
    "exampleEn": "Strong wind blew cold air through the open server room window.",
    "grammarNote": "",
    "exampleTr": "Kuvvetli rüzgar açık sunucu odası penceresinden soğuk hava üfledi / estirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I blow",
      "translation": "Eserim / Üflerim"
    },
    "presentContinuous": {
      "form": "I am blowing",
      "translation": "Esiyorum / Üflüyorum"
    },
    "future": {
      "form": "I will blow",
      "translation": "Eseceğim / Üfleyeceğim"
    },
    "pastSimple": {
      "form": "I blow",
      "translation": "Eserim / Üflerim"
    }
  },
  {
    "id": "verb_229",
    "rank": 229,
    "word": "Boil",
    "phonetic": "/bɔɪl/",
    "translation": "Kaynamak / Kaynatmak",
    "exampleEn": "Water boils at one hundred degrees Celsius at sea level.",
    "grammarNote": "",
    "exampleTr": "Su deniz seviyesinde yüz santigrat derecede kaynar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I boil",
      "translation": "Kaynatırım"
    },
    "presentContinuous": {
      "form": "I am boiling",
      "translation": "Kaynatıyorum"
    },
    "future": {
      "form": "I will boil",
      "translation": "Kaynatacağım"
    },
    "pastSimple": {
      "form": "I boil",
      "translation": "Kaynatırım"
    }
  },
  {
    "id": "verb_230",
    "rank": 230,
    "word": "Bother",
    "phonetic": "/ˈbɒð.ər/",
    "translation": "Rahatsız etmek / Uğraşmak",
    "exampleEn": "I am sorry to bother you, but could you review this urgent PR?",
    "grammarNote": "",
    "exampleTr": "Sizi rahatsız ettiğim için özür dilerim, ancak bu acil PR'ı inceleyebilir misiniz?",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I bother",
      "translation": "Rahatsız ederim"
    },
    "presentContinuous": {
      "form": "I am bothering",
      "translation": "Rahatsız ediyorum"
    },
    "future": {
      "form": "I will bother",
      "translation": "Rahatsız edeceğim"
    },
    "pastSimple": {
      "form": "I bother",
      "translation": "Rahatsız ederim"
    }
  },
  {
    "id": "verb_231",
    "rank": 231,
    "word": "Breathe",
    "phonetic": "/briːð/",
    "translation": "Nefes almak",
    "exampleEn": "I breathed deeply to stay calm during the high-stakes technical demo.",
    "grammarNote": "",
    "exampleTr": "Yüksek riskli teknik demo sırasında sakin kalmak için derin nefes aldım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I breathe",
      "translation": "Nefes alırım"
    },
    "presentContinuous": {
      "form": "I am breathing",
      "translation": "Nefes alıyorum"
    },
    "future": {
      "form": "I will breathe",
      "translation": "Nefes alacağım"
    },
    "pastSimple": {
      "form": "I breathe",
      "translation": "Nefes alırım"
    }
  },
  {
    "id": "verb_232",
    "rank": 232,
    "word": "Burn",
    "phonetic": "/bɜːn/",
    "translation": "Yanmak / Yakmak",
    "exampleEn": "The CPU will burn out if the cooling paste is not applied properly.",
    "grammarNote": "",
    "exampleTr": "Termal macun düzgün uygulanmazsa işlemci yanacaktır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I burn",
      "translation": "Yakarım / Yanarım"
    },
    "presentContinuous": {
      "form": "I am burning",
      "translation": "Yakıyorum / Yanıyorum"
    },
    "future": {
      "form": "I will burn",
      "translation": "Yakacağım / Yanacağım"
    },
    "pastSimple": {
      "form": "I burn",
      "translation": "Yakarım / Yanarım"
    }
  },
  {
    "id": "verb_233",
    "rank": 233,
    "word": "Cancel",
    "phonetic": "/ˈkæn.səl/",
    "translation": "İptal etmek",
    "exampleEn": "We canceled the scheduled maintenance window due to high user traffic.",
    "grammarNote": "",
    "exampleTr": "Yüksek kullanıcı trafiği nedeniyle planlanmış bakım aralığını iptal ettik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cancel",
      "translation": "İptal ederim"
    },
    "presentContinuous": {
      "form": "I am canceling",
      "translation": "İptal ediyorum"
    },
    "future": {
      "form": "I will cancel",
      "translation": "İptal edeceğim"
    },
    "pastSimple": {
      "form": "I cancel",
      "translation": "İptal ederim"
    }
  },
  {
    "id": "verb_234",
    "rank": 234,
    "word": "Celebrate",
    "phonetic": "/ˈsel.ə.breɪt/",
    "translation": "Kutlamak",
    "exampleEn": "We celebrated the successful deployment of our enterprise platform.",
    "grammarNote": "",
    "exampleTr": "Kurumsal platformumuzun başarılı dağıtımını kutladık.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I celebrate",
      "translation": "Kutlarım"
    },
    "presentContinuous": {
      "form": "I am celebrating",
      "translation": "Kutluyorum"
    },
    "future": {
      "form": "I will celebrate",
      "translation": "Kutlayacağım"
    },
    "pastSimple": {
      "form": "I celebrate",
      "translation": "Kutlarım"
    }
  },
  {
    "id": "verb_235",
    "rank": 235,
    "word": "Charge",
    "phonetic": "/tʃɑːdʒ/",
    "translation": "Şarj etmek / Ücret almak",
    "exampleEn": "I am charging my laptop battery before heading to the meeting.",
    "grammarNote": "",
    "exampleTr": "Toplantıya gitmeden önce dizüstü bilgisayarımın pilini şarj ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I charge",
      "translation": "Şarj ederim / Ücret alırım"
    },
    "presentContinuous": {
      "form": "I am charging",
      "translation": "Şarj ediyorum / Ücret alıyorum"
    },
    "future": {
      "form": "I will charge",
      "translation": "Şarj edeceğim / Ücret alacağım"
    },
    "pastSimple": {
      "form": "I charge",
      "translation": "Şarj ederim / Ücret alırım"
    }
  },
  {
    "id": "verb_236",
    "rank": 236,
    "word": "Chase",
    "phonetic": "/tʃeɪs/",
    "translation": "Kovalamak / Peşinden koşmak",
    "exampleEn": "We chased down a subtle race condition in the thread pool for hours.",
    "grammarNote": "",
    "exampleTr": "İş parçacığı havuzundaki sinsi bir yarış koşulunu saatlerce kovaladık / araştırdık.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I chase",
      "translation": "Kovalarım"
    },
    "presentContinuous": {
      "form": "I am chasing",
      "translation": "Kovalıyorum"
    },
    "future": {
      "form": "I will chase",
      "translation": "Kovalayacağım"
    },
    "pastSimple": {
      "form": "I chase",
      "translation": "Kovalarım"
    }
  },
  {
    "id": "verb_237",
    "rank": 237,
    "word": "Cheat",
    "phonetic": "/tʃiːt/",
    "translation": "Hile yapmak / Aldatmak",
    "exampleEn": "Anti-cheat software detects unauthorized memory manipulation in real time.",
    "grammarNote": "",
    "exampleTr": "Hile karşıtı yazılım yetkisiz bellek manipülasyonunu gerçek zamanlı olarak tespit eder.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cheat",
      "translation": "Hile yaparım"
    },
    "presentContinuous": {
      "form": "I am cheating",
      "translation": "Hile yapıyorum"
    },
    "future": {
      "form": "I will cheat",
      "translation": "Hile yapacağım"
    },
    "pastSimple": {
      "form": "I cheat",
      "translation": "Hile yaparım"
    }
  },
  {
    "id": "verb_238",
    "rank": 238,
    "word": "Claim",
    "phonetic": "/kleɪm/",
    "translation": "İddia etmek / Talep etmek",
    "exampleEn": "The vendor claimed that their database achieves sub-millisecond latency.",
    "grammarNote": "",
    "exampleTr": "Tedarikçi veritabanlarının milisaniye altı gecikmeye ulaştığını iddia etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I claim",
      "translation": "İddia ederim / Talep ederim"
    },
    "presentContinuous": {
      "form": "I am claiming",
      "translation": "İddia ediyorum / Talep ediyorum"
    },
    "future": {
      "form": "I will claim",
      "translation": "İddia edeceğim / Talep edeceğim"
    },
    "pastSimple": {
      "form": "I claim",
      "translation": "İddia ederim / Talep ederim"
    }
  },
  {
    "id": "verb_239",
    "rank": 239,
    "word": "Clear",
    "phonetic": "/klɪər/",
    "translation": "Temizlemek / Boşaltmak",
    "exampleEn": "I cleared the Redis cache to ensure the new configuration loaded.",
    "grammarNote": "",
    "exampleTr": "Yeni yapılandırmanın yüklendiğinden emin olmak için Redis önbelleğini temizledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I clear",
      "translation": "Temizlerim"
    },
    "presentContinuous": {
      "form": "I am clearing",
      "translation": "Temizliyorum"
    },
    "future": {
      "form": "I will clear",
      "translation": "Temizleyeceğim"
    },
    "pastSimple": {
      "form": "I clear",
      "translation": "Temizlerim"
    }
  },
  {
    "id": "verb_240",
    "rank": 240,
    "word": "Climb",
    "phonetic": "/klaɪm/",
    "translation": "Tırmanmak / Yükselmek",
    "exampleEn": "Memory utilization climbed rapidly during the stress benchmark.",
    "grammarNote": "",
    "exampleTr": "Stres testi sırasında bellek kullanımı hızla yükseldi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I climb",
      "translation": "Tırmanırım / Yükselirim"
    },
    "presentContinuous": {
      "form": "I am climbing",
      "translation": "Tırmanıyorum / Yükseliyorum"
    },
    "future": {
      "form": "I will climb",
      "translation": "Tırmanacağım / Yükseliceğim"
    },
    "pastSimple": {
      "form": "I climb",
      "translation": "Tırmanırım / Yükselirim"
    }
  },
  {
    "id": "verb_241",
    "rank": 241,
    "word": "Combine",
    "phonetic": "/kəmˈbaɪn/",
    "translation": "Birleştirmek / Harmanlamak",
    "exampleEn": "We combined YOLOv8 object detection with MQTT messaging in GÖZCÜ.",
    "grammarNote": "",
    "exampleTr": "GÖZCÜ'de YOLOv8 nesne tespiti ile MQTT mesajlaşmasını birleştirdik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I combine",
      "translation": "Birleştiririm"
    },
    "presentContinuous": {
      "form": "I am combining",
      "translation": "Birleştiriyorum"
    },
    "future": {
      "form": "I will combine",
      "translation": "Birleştireceğim"
    },
    "pastSimple": {
      "form": "I combine",
      "translation": "Birleştiririm"
    }
  },
  {
    "id": "verb_242",
    "rank": 242,
    "word": "Command",
    "phonetic": "/kəˈmɑːnd/",
    "translation": "Komut vermek / Emretmek",
    "exampleEn": "I executed a Linux command to inspect active network sockets.",
    "grammarNote": "",
    "exampleTr": "Aktif ağ soketlerini incelemek için bir Linux komutu çalıştırdım / verdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I command",
      "translation": "Komut veririm"
    },
    "presentContinuous": {
      "form": "I am commanding",
      "translation": "Komut veriyorum"
    },
    "future": {
      "form": "I will command",
      "translation": "Komut vereceğim"
    },
    "pastSimple": {
      "form": "I command",
      "translation": "Komut veririm"
    }
  },
  {
    "id": "verb_243",
    "rank": 243,
    "word": "Communicate",
    "phonetic": "/kəˈmjuː.nɪ.keɪt/",
    "translation": "İletişim kurmak / Haberleşmek",
    "exampleEn": "Microservices communicate asynchronously via an event-driven message queue.",
    "grammarNote": "",
    "exampleTr": "Mikroservisler olay güdümlü bir mesaj kuyruğu aracılığıyla eşzamansız haberleşir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I communicate",
      "translation": "Haberleşirim"
    },
    "presentContinuous": {
      "form": "I am communicating",
      "translation": "Haberleşiyorum"
    },
    "future": {
      "form": "I will communicate",
      "translation": "Haberleşeceğim"
    },
    "pastSimple": {
      "form": "I communicate",
      "translation": "Haberleşirim"
    }
  },
  {
    "id": "verb_244",
    "rank": 244,
    "word": "Compete",
    "phonetic": "/kəmˈpiːt/",
    "translation": "Rekabet etmek / Yarışmak",
    "exampleEn": "Our university team competed in the national AI robotics challenge.",
    "grammarNote": "",
    "exampleTr": "Üniversite ekibimiz ulusal yapay zeka robotik yarışmasında yarıştı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I compete",
      "translation": "Yarışırım"
    },
    "presentContinuous": {
      "form": "I am competing",
      "translation": "Yarışıyorum"
    },
    "future": {
      "form": "I will compete",
      "translation": "Yarışacağım"
    },
    "pastSimple": {
      "form": "I compete",
      "translation": "Yarışırım"
    }
  },
  {
    "id": "verb_245",
    "rank": 245,
    "word": "Complain",
    "phonetic": "/kəmˈpleɪn/",
    "translation": "Şikayet etmek",
    "exampleEn": "Users complained about high response latency on the checkout screen.",
    "grammarNote": "",
    "exampleTr": "Kullanıcılar ödeme ekranındaki yüksek yanıt gecikmesinden şikayet ettiler.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I complain",
      "translation": "Şikayet ederim"
    },
    "presentContinuous": {
      "form": "I am complaining",
      "translation": "Şikayet ediyorum"
    },
    "future": {
      "form": "I will complain",
      "translation": "Şikayet edeceğim"
    },
    "pastSimple": {
      "form": "I complain",
      "translation": "Şikayet ederim"
    }
  },
  {
    "id": "verb_246",
    "rank": 246,
    "word": "Confirm",
    "phonetic": "/kənˈfɜːm/",
    "translation": "Onaylamak / Teyit etmek",
    "exampleEn": "I will confirm the database migration window with the CTO.",
    "grammarNote": "",
    "exampleTr": "Veritabanı taşıma aralığını CTO ile teyit edeceğim / onaylayacağım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I confirm",
      "translation": "Teyit ederim"
    },
    "presentContinuous": {
      "form": "I am confirming",
      "translation": "Teyit ediyorum"
    },
    "future": {
      "form": "I will confirm",
      "translation": "Teyit edeceğim"
    },
    "pastSimple": {
      "form": "I confirm",
      "translation": "Teyit ederim"
    }
  },
  {
    "id": "verb_247",
    "rank": 247,
    "word": "Consider",
    "phonetic": "/kənˈsɪd.ər/",
    "translation": "Düşünmek / Göz önünde bulundurmak",
    "exampleEn": "We are considering migrating our web backend to Golang.",
    "grammarNote": "",
    "exampleTr": "Web arka ucumuzu Golang'e taşımayı düşünüyoruz / değerlendiriyoruz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I consider",
      "translation": "Düşünürüm"
    },
    "presentContinuous": {
      "form": "I am considering",
      "translation": "Düşünüyorum"
    },
    "future": {
      "form": "I will consider",
      "translation": "Düşüneceğim"
    },
    "pastSimple": {
      "form": "I consider",
      "translation": "Düşünürüm"
    }
  },
  {
    "id": "verb_248",
    "rank": 248,
    "word": "Contain",
    "phonetic": "/kənˈteɪn/",
    "translation": "İçermek / Kapsamak",
    "exampleEn": "The configuration payload contains the database connection string.",
    "grammarNote": "",
    "exampleTr": "Yapılandırma veri yükü veritabanı bağlantı dizesini içerir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I contain",
      "translation": "İçeririm"
    },
    "presentContinuous": {
      "form": "I am containing",
      "translation": "İçeriyorum"
    },
    "future": {
      "form": "I will contain",
      "translation": "İçereceğim"
    },
    "pastSimple": {
      "form": "I contain",
      "translation": "İçeririm"
    }
  },
  {
    "id": "verb_249",
    "rank": 249,
    "word": "Convince",
    "phonetic": "/kənˈvɪns/",
    "translation": "İkna etmek",
    "exampleEn": "I convinced the team to adopt automated integration testing.",
    "grammarNote": "",
    "exampleTr": "Ekibi otomatik entegrasyon testlerini benimsemeye ikna ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I convince",
      "translation": "İkna ederim"
    },
    "presentContinuous": {
      "form": "I am convincing",
      "translation": "İkna ediyorum"
    },
    "future": {
      "form": "I will convince",
      "translation": "İkna edeceğim"
    },
    "pastSimple": {
      "form": "I convince",
      "translation": "İkna ederim"
    }
  },
  {
    "id": "verb_250",
    "rank": 250,
    "word": "Correct",
    "phonetic": "/kəˈrekt/",
    "translation": "Düzeltmek",
    "exampleEn": "I corrected the typographic error in the OpenAPI specification.",
    "grammarNote": "",
    "exampleTr": "OpenAPI spesifikasyonundaki tipografik hatayı düzelttim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I correct",
      "translation": "Düzeltirim"
    },
    "presentContinuous": {
      "form": "I am correcting",
      "translation": "Düzeltiyorum"
    },
    "future": {
      "form": "I will correct",
      "translation": "Düzeltirim / Düzelteceğim"
    },
    "pastSimple": {
      "form": "I correct",
      "translation": "Düzeltirim"
    }
  },
  {
    "id": "verb_251",
    "rank": 251,
    "word": "Count",
    "phonetic": "/kaʊnt/",
    "translation": "Saymak",
    "exampleEn": "The SQL aggregate function counts the total number of active users.",
    "grammarNote": "",
    "exampleTr": "SQL toplama fonksiyonu toplam aktif kullanıcı sayısını sayar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I count",
      "translation": "Sayarım"
    },
    "presentContinuous": {
      "form": "I am counting",
      "translation": "Sayıyorum"
    },
    "future": {
      "form": "I will count",
      "translation": "Sayacağım"
    },
    "pastSimple": {
      "form": "I count",
      "translation": "Sayarım"
    }
  },
  {
    "id": "verb_252",
    "rank": 252,
    "word": "Crash",
    "phonetic": "/kræʃ/",
    "translation": "Çökmek / Çarpmak",
    "exampleEn": "The application crashed because an unhandled null pointer occurred.",
    "grammarNote": "",
    "exampleTr": "İşlenmemiş bir null pointer meydana geldiği için uygulama çöktü.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I crash",
      "translation": "Çökerim"
    },
    "presentContinuous": {
      "form": "I am crashing",
      "translation": "Çöküyorum"
    },
    "future": {
      "form": "I will crash",
      "translation": "Çökeceğim"
    },
    "pastSimple": {
      "form": "I crash",
      "translation": "Çökerim"
    }
  },
  {
    "id": "verb_253",
    "rank": 253,
    "word": "Cross",
    "phonetic": "/krɒs/",
    "translation": "Karşıya geçmek / Aşmak",
    "exampleEn": "Autonomous vehicles detect pedestrians crossing the street.",
    "grammarNote": "",
    "exampleTr": "Otonom araçlar caddeden karşıya geçen yayaları tespit eder.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cross",
      "translation": "Aşarım / Geçerim"
    },
    "presentContinuous": {
      "form": "I am crossing",
      "translation": "Aşıyorum / Geçiyorum"
    },
    "future": {
      "form": "I will cross",
      "translation": "Aşacağım / Geçeceğim"
    },
    "pastSimple": {
      "form": "I cross",
      "translation": "Aşarım / Geçerim"
    }
  },
  {
    "id": "verb_254",
    "rank": 254,
    "word": "Cry",
    "phonetic": "/kraɪ/",
    "translation": "Ağlamak / Haykırmak",
    "exampleEn": "The child cried when he lost his favorite toy in the park.",
    "grammarNote": "",
    "exampleTr": "Çocuk en sevdiği oyuncağını parkta kaybettiğinde ağladı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I cry",
      "translation": "Ağlarım"
    },
    "presentContinuous": {
      "form": "I am crying",
      "translation": "Ağlıyorum"
    },
    "future": {
      "form": "I will cry",
      "translation": "Ağlayacağım"
    },
    "pastSimple": {
      "form": "I cry",
      "translation": "Ağlarım"
    }
  },
  {
    "id": "verb_255",
    "rank": 255,
    "word": "Damage",
    "phonetic": "/ˈdæm.ɪdʒ/",
    "translation": "Hasar vermek / Zarar vermek",
    "exampleEn": "A sudden power surge damaged the unshielded network router.",
    "grammarNote": "",
    "exampleTr": "Ani bir güç dalgalanması korumasız ağ yönlendiricisine zarar verdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I damage",
      "translation": "Zarar veririm"
    },
    "presentContinuous": {
      "form": "I am damaging",
      "translation": "Zarar veriyorum"
    },
    "future": {
      "form": "I will damage",
      "translation": "Zarar vereceğim"
    },
    "pastSimple": {
      "form": "I damage",
      "translation": "Zarar veririm"
    }
  },
  {
    "id": "verb_256",
    "rank": 256,
    "word": "Deal",
    "phonetic": "/diːl/",
    "translation": "İlgilenmek / Başa çıkmak",
    "exampleEn": "Our customer support team deals with technical inquiries daily.",
    "grammarNote": "",
    "exampleTr": "Müşteri destek ekibimiz teknik sorularla günlük olarak ilgilenir.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I deal",
      "translation": "İlgilenirim"
    },
    "presentContinuous": {
      "form": "I am dealing",
      "translation": "İlgileniyorum"
    },
    "future": {
      "form": "I will deal",
      "translation": "İlgileneceğim"
    },
    "pastSimple": {
      "form": "I deal",
      "translation": "İlgilenirim"
    }
  },
  {
    "id": "verb_257",
    "rank": 257,
    "word": "Defend",
    "phonetic": "/dɪˈfend/",
    "translation": "Savunmak / Korumak",
    "exampleEn": "I defended my senior engineering thesis successfully yesterday.",
    "grammarNote": "",
    "exampleTr": "Dün bitirme mühendislik tezimi başarıyla savundum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I defend",
      "translation": "Savunurum"
    },
    "presentContinuous": {
      "form": "I am defending",
      "translation": "Savunuyorum"
    },
    "future": {
      "form": "I will defend",
      "translation": "Savunacağım"
    },
    "pastSimple": {
      "form": "I defend",
      "translation": "Savunurum"
    }
  },
  {
    "id": "verb_258",
    "rank": 258,
    "word": "Delay",
    "phonetic": "/dɪˈleɪ/",
    "translation": "Geciktirmek / Ertelemek",
    "exampleEn": "We delayed the software release by two days to finish security audits.",
    "grammarNote": "",
    "exampleTr": "Güvenlik denetimlerini bitirmek için yazılım sürümünü iki gün erteledik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I delay",
      "translation": "Geciktiririm"
    },
    "presentContinuous": {
      "form": "I am delaying",
      "translation": "Geciktiriyorum"
    },
    "future": {
      "form": "I will delay",
      "translation": "Geciktireceğim"
    },
    "pastSimple": {
      "form": "I delay",
      "translation": "Geciktiririm"
    }
  },
  {
    "id": "verb_259",
    "rank": 259,
    "word": "Deny",
    "phonetic": "/dɪˈnaɪ/",
    "translation": "Reddetmek / İnkâr etmek",
    "exampleEn": "The server denied access because the authentication token was expired.",
    "grammarNote": "",
    "exampleTr": "Kimlik doğrulama belirtecinin süresi dolduğu için sunucu erişimi reddetti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I deny",
      "translation": "Reddederim"
    },
    "presentContinuous": {
      "form": "I am denying",
      "translation": "Reddediyorum"
    },
    "future": {
      "form": "I will deny",
      "translation": "Reddedeceğim"
    },
    "pastSimple": {
      "form": "I deny",
      "translation": "Reddederim"
    }
  },
  {
    "id": "verb_260",
    "rank": 260,
    "word": "Depend",
    "phonetic": "/dɪˈpend/",
    "translation": "Bağlı olmak / Güvenmek",
    "exampleEn": "System reliability depends on redundant database architecture.",
    "grammarNote": "",
    "exampleTr": "Sistem güvenilirliği yedekli veritabanı mimarisine bağlıdır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I depend",
      "translation": "Bağlıyım / Güvenirim"
    },
    "presentContinuous": {
      "form": "I am depending",
      "translation": "Bağlı oluyorum"
    },
    "future": {
      "form": "I will depend",
      "translation": "Bağlı olacağım"
    },
    "pastSimple": {
      "form": "I depend",
      "translation": "Bağlıyım / Güvenirim"
    }
  },
  {
    "id": "verb_261",
    "rank": 261,
    "word": "Destroy",
    "phonetic": "/dɪˈstrɔɪ/",
    "translation": "Yok etmek / Yıkmak",
    "exampleEn": "The script destroyed temporary test containers after running tests.",
    "grammarNote": "",
    "exampleTr": "Betik testleri çalıştırdıktan sonra geçici test konteynerlerini yok etti / sildi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I destroy",
      "translation": "Yok ederim"
    },
    "presentContinuous": {
      "form": "I am destroying",
      "translation": "Yok ediyorum"
    },
    "future": {
      "form": "I will destroy",
      "translation": "Yok edeceğim"
    },
    "pastSimple": {
      "form": "I destroy",
      "translation": "Yok ederim"
    }
  },
  {
    "id": "verb_262",
    "rank": 262,
    "word": "Detect",
    "phonetic": "/dɪˈtekt/",
    "translation": "Tespit etmek / Algılamak",
    "exampleEn": "Our computer vision model detects vehicles in real time.",
    "grammarNote": "",
    "exampleTr": "Bilgisayarlı görü modelimiz araçları gerçek zamanlı tespit eder.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I detect",
      "translation": "Tespit ederim"
    },
    "presentContinuous": {
      "form": "I am detecting",
      "translation": "Tespit ediyorum"
    },
    "future": {
      "form": "I will detect",
      "translation": "Tespit edeceğim"
    },
    "pastSimple": {
      "form": "I detect",
      "translation": "Tespit ederim"
    }
  },
  {
    "id": "verb_263",
    "rank": 263,
    "word": "Disappear",
    "phonetic": "/ˌdɪs.əˈpɪər/",
    "translation": "Gözden kaybolmak / Yok olmak",
    "exampleEn": "The intermittent bug disappeared after we restarted the daemon.",
    "grammarNote": "",
    "exampleTr": "Arka plan programını yeniden başlattıktan sonra aralıklı hata ortadan kayboldu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I disappear",
      "translation": "Kaybolurum"
    },
    "presentContinuous": {
      "form": "I am disappearing",
      "translation": "Kayboluyorum"
    },
    "future": {
      "form": "I will disappear",
      "translation": "Kaybolacağım"
    },
    "pastSimple": {
      "form": "I disappear",
      "translation": "Kaybolurum"
    }
  },
  {
    "id": "verb_264",
    "rank": 264,
    "word": "Dislike",
    "phonetic": "/dɪˈslaɪk/",
    "translation": "Sevmemek / Hoşlanmamak",
    "exampleEn": "I dislike writing repetitive boilerplate configuration code.",
    "grammarNote": "",
    "exampleTr": "Tekrarlayan basmakalıp yapılandırma kodu yazmayı sevmem / hoşlanmam.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I dislike",
      "translation": "Sevmem"
    },
    "presentContinuous": {
      "form": "I am disliking",
      "translation": "Sevmiyorum"
    },
    "future": {
      "form": "I will dislike",
      "translation": "Sevmeyeceğim"
    },
    "pastSimple": {
      "form": "I dislike",
      "translation": "Sevmem"
    }
  },
  {
    "id": "verb_265",
    "rank": 265,
    "word": "Distribute",
    "phonetic": "/dɪˈstrɪb.juːt/",
    "translation": "Dağıtmak / Yaymak",
    "exampleEn": "The load balancer distributes incoming requests across five nodes.",
    "grammarNote": "",
    "exampleTr": "Yük dengeleyici gelen istekleri beş düğüm arasında dağıtır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I distribute",
      "translation": "Dağıtırım"
    },
    "presentContinuous": {
      "form": "I am distributing",
      "translation": "Dağıtıyorum"
    },
    "future": {
      "form": "I will distribute",
      "translation": "Dağıtacağım"
    },
    "pastSimple": {
      "form": "I distribute",
      "translation": "Dağıtırım"
    }
  },
  {
    "id": "verb_266",
    "rank": 266,
    "word": "Doubt",
    "phonetic": "/daʊt/",
    "translation": "Şüphelenmek / Kuşku duymak",
    "exampleEn": "I doubt this legacy monolithic database can scale to millions of users.",
    "grammarNote": "",
    "exampleTr": "Bu eski monolitik veritabanının milyonlarca kullanıcıya ölçeklenebileceğinden şüphe duyuyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I doubt",
      "translation": "Şüphelenirim"
    },
    "presentContinuous": {
      "form": "I am doubting",
      "translation": "Şüpheleniyorum"
    },
    "future": {
      "form": "I will doubt",
      "translation": "Şüphe duyacağım"
    },
    "pastSimple": {
      "form": "I doubt",
      "translation": "Şüphelenirim"
    }
  },
  {
    "id": "verb_267",
    "rank": 267,
    "word": "Drag",
    "phonetic": "/dræɡ/",
    "translation": "Sürüklemek",
    "exampleEn": "You can drag and drop image files directly into the web dashboard.",
    "grammarNote": "",
    "exampleTr": "Resim dosyalarını doğrudan web kontrol paneline sürükleyip bırakabilirsiniz.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I drag",
      "translation": "Sürüklerim"
    },
    "presentContinuous": {
      "form": "I am dragging",
      "translation": "Sürüklüyorum"
    },
    "future": {
      "form": "I will drag",
      "translation": "Sürükleyeceğim"
    },
    "pastSimple": {
      "form": "I drag",
      "translation": "Sürüklerim"
    }
  },
  {
    "id": "verb_268",
    "rank": 268,
    "word": "Dream",
    "phonetic": "/driːm/",
    "translation": "Hayal kurmak / Rüya görmek",
    "exampleEn": "I dream of founding an international artificial intelligence company.",
    "grammarNote": "",
    "exampleTr": "Uluslararası bir yapay zeka şirketi kurmayı hayal ediyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I dream",
      "translation": "Hayal ederim"
    },
    "presentContinuous": {
      "form": "I am dreaming",
      "translation": "Hayal ediyorum"
    },
    "future": {
      "form": "I will dream",
      "translation": "Hayal edeceğim"
    },
    "pastSimple": {
      "form": "I dream",
      "translation": "Hayal ederim"
    }
  },
  {
    "id": "verb_269",
    "rank": 269,
    "word": "Dump",
    "phonetic": "/dʌmp/",
    "translation": "Dökmek / Bellek dökümü almak",
    "exampleEn": "The kernel dumped memory diagnostics to a log file upon crashing.",
    "grammarNote": "",
    "exampleTr": "Çekirdek çöktüğünde bellek teşhislerini bir günlük dosyasına döktü / kaydetti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I dump",
      "translation": "Dökerim / Döküm alırım"
    },
    "presentContinuous": {
      "form": "I am dumping",
      "translation": "Döküyorum / Döküm alıyorum"
    },
    "future": {
      "form": "I will dump",
      "translation": "Dökeceğim / Döküm alacağım"
    },
    "pastSimple": {
      "form": "I dump",
      "translation": "Dökerim / Döküm alırım"
    }
  },
  {
    "id": "verb_270",
    "rank": 270,
    "word": "Eliminate",
    "phonetic": "/iˈlɪm.ɪ.neɪt/",
    "translation": "Ortadan kaldırmak / Elemek",
    "exampleEn": "Refactoring the core engine eliminated all memory deadlocks.",
    "grammarNote": "",
    "exampleTr": "Çekirdek motoru yeniden düzenlemek tüm bellek kilitlenmelerini ortadan kaldırdı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I eliminate",
      "translation": "Ortadan kaldırırım"
    },
    "presentContinuous": {
      "form": "I am eliminating",
      "translation": "Ortadan kaldırıyorum"
    },
    "future": {
      "form": "I will eliminate",
      "translation": "Ortadan kaldıracağım"
    },
    "pastSimple": {
      "form": "I eliminate",
      "translation": "Ortadan kaldırırım"
    }
  },
  {
    "id": "verb_271",
    "rank": 271,
    "word": "Employ",
    "phonetic": "/ɪmˈplɔɪ/",
    "translation": "İstihdam etmek / Kullanmak",
    "exampleEn": "We employed convolutional neural networks to classify video frames.",
    "grammarNote": "",
    "exampleTr": "Video karelerini sınıflandırmak için evrişimli yapay sinir ağları kullandık / istihdam ettik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I employ",
      "translation": "İstihdam ederim / Kullanırım"
    },
    "presentContinuous": {
      "form": "I am employing",
      "translation": "İstihdam ediyorum / Kullanıyorum"
    },
    "future": {
      "form": "I will employ",
      "translation": "İstihdam edeceğim / Kullanacağım"
    },
    "pastSimple": {
      "form": "I employ",
      "translation": "İstihdam ederim / Kullanırım"
    }
  },
  {
    "id": "verb_272",
    "rank": 272,
    "word": "Enable",
    "phonetic": "/ɪˈneɪ.bəl/",
    "translation": "Etkinleştirmek / Olanak tanımak",
    "exampleEn": "I enabled two-factor authentication on my GitHub developer account.",
    "grammarNote": "",
    "exampleTr": "GitHub geliştirici hesabımda iki faktörlü kimlik doğrulamayı etkinleştirdim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I enable",
      "translation": "Etkinleştiririm"
    },
    "presentContinuous": {
      "form": "I am enabling",
      "translation": "Etkinleştiriyorum"
    },
    "future": {
      "form": "I will enable",
      "translation": "Etkinleştireceğim"
    },
    "pastSimple": {
      "form": "I enable",
      "translation": "Etkinleştiririm"
    }
  },
  {
    "id": "verb_273",
    "rank": 273,
    "word": "Enforce",
    "phonetic": "/ɪnˈfɔːs/",
    "translation": "Zorunlu kılmak / Uygulamak",
    "exampleEn": "The API gateway enforces strict rate limiting on all public endpoints.",
    "grammarNote": "",
    "exampleTr": "API ağ geçidi tüm herkese açık uç noktalarda sıkı istek sınırlamasını zorunlu kılar.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I enforce",
      "translation": "Zorunlu kılarım"
    },
    "presentContinuous": {
      "form": "I am enforcing",
      "translation": "Zorunlu kılıyorum"
    },
    "future": {
      "form": "I will enforce",
      "translation": "Zorunlu kılacağım"
    },
    "pastSimple": {
      "form": "I enforce",
      "translation": "Zorunlu kılarım"
    }
  },
  {
    "id": "verb_274",
    "rank": 274,
    "word": "Engage",
    "phonetic": "/ɪnˈɡeɪdʒ/",
    "translation": "Etkileşime girmek / Bağlanmak",
    "exampleEn": "We engaged with hundreds of tech students at the university booth.",
    "grammarNote": "",
    "exampleTr": "Üniversite standında yüzlerce teknoloji öğrencisiyle etkileşime girdik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I engage",
      "translation": "Etkileşime girerim"
    },
    "presentContinuous": {
      "form": "I am engaging",
      "translation": "Etkileşime giriyorum"
    },
    "future": {
      "form": "I will engage",
      "translation": "Etkileşime gireceğim"
    },
    "pastSimple": {
      "form": "I engage",
      "translation": "Etkileşime girerim"
    }
  },
  {
    "id": "verb_275",
    "rank": 275,
    "word": "Enhance",
    "phonetic": "/ɪnˈhɑːns/",
    "translation": "Geliştirmek / Artırmak",
    "exampleEn": "Adding automated indexes enhanced database query execution speed.",
    "grammarNote": "",
    "exampleTr": "Otomatik indeksler eklemek veritabanı sorgu yürütme hızını artırdı / geliştirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I enhance",
      "translation": "Artırırım / Geliştiririm"
    },
    "presentContinuous": {
      "form": "I am enhancing",
      "translation": "Artırıyorum / Geliştiriyorum"
    },
    "future": {
      "form": "I will enhance",
      "translation": "Artıracağım / Geliştireceğim"
    },
    "pastSimple": {
      "form": "I enhance",
      "translation": "Artırırım / Geliştiririm"
    }
  },
  {
    "id": "verb_276",
    "rank": 276,
    "word": "Escape",
    "phonetic": "/ɪˈskeɪp/",
    "translation": "Kaçmak / Kurtulmak",
    "exampleEn": "I escaped special characters in user input to prevent XSS attacks.",
    "grammarNote": "",
    "exampleTr": "XSS saldırılarını önlemek için kullanıcı girdisindeki özel karakterleri kaçırdım (escape ettim).",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I escape",
      "translation": "Kaçarım / Kurtulurum"
    },
    "presentContinuous": {
      "form": "I am escaping",
      "translation": "Kaçıyorum / Kurtuluyorum"
    },
    "future": {
      "form": "I will escape",
      "translation": "Kaçacağım / Kurtulacağım"
    },
    "pastSimple": {
      "form": "I escape",
      "translation": "Kaçarım / Kurtulurum"
    }
  },
  {
    "id": "verb_277",
    "rank": 277,
    "word": "Estimate",
    "phonetic": "/ˈes.tɪ.meɪt/",
    "translation": "Tahmin etmek / Hesaplamak",
    "exampleEn": "I estimated that the cloud migration will take approximately three sprints.",
    "grammarNote": "",
    "exampleTr": "Bulut taşımasının yaklaşık üç sprint süreceğini tahmin ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I estimate",
      "translation": "Tahmin ederim"
    },
    "presentContinuous": {
      "form": "I am estimating",
      "translation": "Tahmin ediyorum"
    },
    "future": {
      "form": "I will estimate",
      "translation": "Tahmin edeceğim"
    },
    "pastSimple": {
      "form": "I estimate",
      "translation": "Tahmin ederim"
    }
  },
  {
    "id": "verb_278",
    "rank": 278,
    "word": "Evaluate",
    "phonetic": "/ɪˈvæl.ju.eɪt/",
    "translation": "Değerlendirmek",
    "exampleEn": "The committee evaluated our AI project and awarded it top honors.",
    "grammarNote": "",
    "exampleTr": "Komite yapay zeka projemizi değerlendirdi ve en yüksek dereceyle ödüllendirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I evaluate",
      "translation": "Değerlendiririm"
    },
    "presentContinuous": {
      "form": "I am evaluating",
      "translation": "Değerlendiriyorum"
    },
    "future": {
      "form": "I will evaluate",
      "translation": "Değerlendireceğim"
    },
    "pastSimple": {
      "form": "I evaluate",
      "translation": "Değerlendiririm"
    }
  },
  {
    "id": "verb_279",
    "rank": 279,
    "word": "Examine",
    "phonetic": "/ɪɡˈzæm.ɪn/",
    "translation": "İncelemek / Muayene etmek",
    "exampleEn": "I examined the network traffic packets to detect suspicious payloads.",
    "grammarNote": "",
    "exampleTr": "Şüpheli veri yüklerini tespit etmek için ağ trafiği paketlerini inceledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I examine",
      "translation": "İncelerim"
    },
    "presentContinuous": {
      "form": "I am examining",
      "translation": "İnceliyorum"
    },
    "future": {
      "form": "I will examine",
      "translation": "İnceleyeceğim"
    },
    "pastSimple": {
      "form": "I examine",
      "translation": "İncelerim"
    }
  },
  {
    "id": "verb_280",
    "rank": 280,
    "word": "Exchange",
    "phonetic": "/ɪksˈtʃeɪndʒ/",
    "translation": "Değiş tokuş etmek / Takas etmek",
    "exampleEn": "The microservices exchanged encrypted telemetry data via WebSockets.",
    "grammarNote": "",
    "exampleTr": "Mikroservisler WebSockets üzerinden şifrelenmiş telemetri verilerini değiş tokuş etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I exchange",
      "translation": "Değiş tokuş ederim"
    },
    "presentContinuous": {
      "form": "I am exchanging",
      "translation": "Değiş tokuş ediyorum"
    },
    "future": {
      "form": "I will exchange",
      "translation": "Değiş tokuş edeceğim"
    },
    "pastSimple": {
      "form": "I exchange",
      "translation": "Değiş tokuş ederim"
    }
  },
  {
    "id": "verb_281",
    "rank": 281,
    "word": "Exist",
    "phonetic": "/ɪɡˈzɪst/",
    "translation": "Var olmak / Bulunmak",
    "exampleEn": "This database record already exists in the primary table.",
    "grammarNote": "",
    "exampleTr": "Bu veritabanı kaydı birincil tabloda zaten mevcuttur / var olmaktadır.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I exist",
      "translation": "Var olurum"
    },
    "presentContinuous": {
      "form": "I am existing",
      "translation": "Var oluyorum"
    },
    "future": {
      "form": "I will exist",
      "translation": "Var olacağım"
    },
    "pastSimple": {
      "form": "I exist",
      "translation": "Var olurum"
    }
  },
  {
    "id": "verb_282",
    "rank": 282,
    "word": "Expand",
    "phonetic": "/ɪkˈspænd/",
    "translation": "Genişlemek / Büyümek",
    "exampleEn": "Our e-commerce store expanded its 3D printed product catalog.",
    "grammarNote": "",
    "exampleTr": "E-ticaret mağazamız 3D baskılı ürün kataloğunu genişletti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I expand",
      "translation": "Genişletirim / Genişlerim"
    },
    "presentContinuous": {
      "form": "I am expanding",
      "translation": "Genişletiyorum / Genişliyorum"
    },
    "future": {
      "form": "I will expand",
      "translation": "Genişleteceğim / Genişleyeceğim"
    },
    "pastSimple": {
      "form": "I expand",
      "translation": "Genişletirim / Genişlerim"
    }
  },
  {
    "id": "verb_283",
    "rank": 283,
    "word": "Export",
    "phonetic": "/ɪkˈspɔːt/",
    "translation": "Dışa aktarmak / İhraç etmek",
    "exampleEn": "I exported the filtered analytics data into a clean CSV spreadsheet.",
    "grammarNote": "",
    "exampleTr": "Filtrelenmiş analiz verilerini temiz bir CSV tablosuna dışa aktardım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I export",
      "translation": "Dışa aktarırım"
    },
    "presentContinuous": {
      "form": "I am exporting",
      "translation": "Dışa aktarıyorum"
    },
    "future": {
      "form": "I will export",
      "translation": "Dışa aktaracağım"
    },
    "pastSimple": {
      "form": "I export",
      "translation": "Dışa aktarırım"
    }
  },
  {
    "id": "verb_284",
    "rank": 284,
    "word": "Express",
    "phonetic": "/ɪkˈspres/",
    "translation": "İfade etmek / Belirtmek",
    "exampleEn": "The client expressed high satisfaction with our appointment booking app.",
    "grammarNote": "",
    "exampleTr": "Müşteri randevu planlama uygulamamızdan yüksek memnuniyetini ifade etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I express",
      "translation": "İfade ederim"
    },
    "presentContinuous": {
      "form": "I am expressing",
      "translation": "İfade ediyorum"
    },
    "future": {
      "form": "I will express",
      "translation": "İfade edeceğim"
    },
    "pastSimple": {
      "form": "I express",
      "translation": "İfade ederim"
    }
  },
  {
    "id": "verb_285",
    "rank": 285,
    "word": "Fetch",
    "phonetic": "/fetʃ/",
    "translation": "Veri çekmek / Gidip getirmek",
    "exampleEn": "The mobile client fetched the latest user profile data from the REST API.",
    "grammarNote": "",
    "exampleTr": "Mobil istemci en son kullanıcı profil verilerini REST API'den çekti / getirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I fetch",
      "translation": "Veri çekerim / Getiririm"
    },
    "presentContinuous": {
      "form": "I am fetching",
      "translation": "Veri çekiyorum / Getiriyorum"
    },
    "future": {
      "form": "I will fetch",
      "translation": "Veri çekeceğim / Getireceğim"
    },
    "pastSimple": {
      "form": "I fetch",
      "translation": "Veri çekerim / Getiririm"
    }
  },
  {
    "id": "verb_286",
    "rank": 286,
    "word": "Focus",
    "phonetic": "/ˈfəʊ.kəs/",
    "translation": "Odaklanmak",
    "exampleEn": "I am focusing on mastering Kotlin Coroutines and Jetpack Compose.",
    "grammarNote": "",
    "exampleTr": "Kotlin Coroutines ve Jetpack Compose'da ustalaşmaya odaklanıyorum.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I focus",
      "translation": "Odaklanırım"
    },
    "presentContinuous": {
      "form": "I am focusing",
      "translation": "Odaklanıyorum"
    },
    "future": {
      "form": "I will focus",
      "translation": "Odaklanacağım"
    },
    "pastSimple": {
      "form": "I focus",
      "translation": "Odaklanırım"
    }
  },
  {
    "id": "verb_287",
    "rank": 287,
    "word": "Form",
    "phonetic": "/fɔːm/",
    "translation": "Oluşturmak / Biçimlendirmek",
    "exampleEn": "We formed an active student technology committee at BozTech.",
    "grammarNote": "",
    "exampleTr": "BozTech'te aktif bir öğrenci teknoloji komitesi oluşturduk.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I form",
      "translation": "Oluştururum"
    },
    "presentContinuous": {
      "form": "I am forming",
      "translation": "Oluşturuyorum"
    },
    "future": {
      "form": "I will form",
      "translation": "Oluşturacağım"
    },
    "pastSimple": {
      "form": "I form",
      "translation": "Oluştururum"
    }
  },
  {
    "id": "verb_288",
    "rank": 288,
    "word": "Format",
    "phonetic": "/ˈfɔː.mæt/",
    "translation": "Biçimlendirmek",
    "exampleEn": "The IDE automatically formatted the Kotlin source file on save.",
    "grammarNote": "",
    "exampleTr": "IDE kaydetme sırasında Kotlin kaynak dosyasını otomatik olarak biçimlendirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I format",
      "translation": "Biçimlendiririm"
    },
    "presentContinuous": {
      "form": "I am formating",
      "translation": "Biçimlendiriyorum"
    },
    "future": {
      "form": "I will format",
      "translation": "Biçimlendireceğim"
    },
    "pastSimple": {
      "form": "I format",
      "translation": "Biçimlendiririm"
    }
  },
  {
    "id": "verb_289",
    "rank": 289,
    "word": "Found",
    "phonetic": "/faʊnd/",
    "translation": "Kurmak / Temelini atmak",
    "exampleEn": "He founded a successful software consulting agency in Teknokent.",
    "grammarNote": "",
    "exampleTr": "Teknokent'te başarılı bir yazılım danışmanlığı ajansı kurdu.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I found",
      "translation": "Kurarım"
    },
    "presentContinuous": {
      "form": "I am founding",
      "translation": "Kuruyorum"
    },
    "future": {
      "form": "I will found",
      "translation": "Kuracağım"
    },
    "pastSimple": {
      "form": "I found",
      "translation": "Kurarım"
    }
  },
  {
    "id": "verb_290",
    "rank": 290,
    "word": "Gain",
    "phonetic": "/ɡeɪn/",
    "translation": "Kazanmak / Elde etmek",
    "exampleEn": "I gained valuable commercial full-stack experience during my internship.",
    "grammarNote": "",
    "exampleTr": "Stajım sırasında değerli ticari tam yığın deneyimi kazandım / elde ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I gain",
      "translation": "Kazanırım"
    },
    "presentContinuous": {
      "form": "I am gaining",
      "translation": "Kazanıyorum"
    },
    "future": {
      "form": "I will gain",
      "translation": "Kazanacağım"
    },
    "pastSimple": {
      "form": "I gain",
      "translation": "Kazanırım"
    }
  },
  {
    "id": "verb_291",
    "rank": 291,
    "word": "Generate",
    "phonetic": "/ˈdʒen.ə.reɪt/",
    "translation": "Üretmek / Meydana getirmek",
    "exampleEn": "The Gemini API generated customized recipe recommendations based on ingredients.",
    "grammarNote": "",
    "exampleTr": "Gemini API malzemelere dayalı olarak özelleştirilmiş tarif önerileri üretti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I generate",
      "translation": "Üretirim"
    },
    "presentContinuous": {
      "form": "I am generating",
      "translation": "Üretiyorum"
    },
    "future": {
      "form": "I will generate",
      "translation": "Üreteceğim"
    },
    "pastSimple": {
      "form": "I generate",
      "translation": "Üretirim"
    }
  },
  {
    "id": "verb_292",
    "rank": 292,
    "word": "Grant",
    "phonetic": "/ɡrɑːnt/",
    "translation": "Yetki vermek / Hibe etmek",
    "exampleEn": "The administrator granted temporary access permissions to the database.",
    "grammarNote": "",
    "exampleTr": "Yönetici veritabanına geçici erişim izinleri verdi / yetkilendirdi.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I grant",
      "translation": "Yetki veririm"
    },
    "presentContinuous": {
      "form": "I am granting",
      "translation": "Yetki veriyorum"
    },
    "future": {
      "form": "I will grant",
      "translation": "Yetki vereceğim"
    },
    "pastSimple": {
      "form": "I grant",
      "translation": "Yetki veririm"
    }
  },
  {
    "id": "verb_293",
    "rank": 293,
    "word": "Greet",
    "phonetic": "/ɡriːt/",
    "translation": "Selamlamak / Karşılamak",
    "exampleEn": "I greeted the keynote speaker at the university tech symposium.",
    "grammarNote": "",
    "exampleTr": "Üniversite teknoloji sempozyumunda ana konuşmacıyı karşıladım / selamladım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I greet",
      "translation": "Karşılarım / Selamlarım"
    },
    "presentContinuous": {
      "form": "I am greeting",
      "translation": "Karşılıyorum / Selamlıyorum"
    },
    "future": {
      "form": "I will greet",
      "translation": "Karşılayacağım / Selamlayacağım"
    },
    "pastSimple": {
      "form": "I greet",
      "translation": "Karşılarım / Selamlarım"
    }
  },
  {
    "id": "verb_294",
    "rank": 294,
    "word": "Guess",
    "phonetic": "/ɡes/",
    "translation": "Tahmin etmek",
    "exampleEn": "I guessed the root cause of the bug before looking at the stack trace.",
    "grammarNote": "",
    "exampleTr": "Hata dökümüne (stack trace) bakmadan önce hatanın kök nedenini tahmin ettim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I guess",
      "translation": "Tahmin ederim"
    },
    "presentContinuous": {
      "form": "I am guessing",
      "translation": "Tahmin ediyorum"
    },
    "future": {
      "form": "I will guess",
      "translation": "Tahmin edeceğim"
    },
    "pastSimple": {
      "form": "I guess",
      "translation": "Tahmin ederim"
    }
  },
  {
    "id": "verb_295",
    "rank": 295,
    "word": "Guide",
    "phonetic": "/ɡaɪd/",
    "translation": "Rehberlik etmek / Yol göstermek",
    "exampleEn": "Senior developers guided the interns through their first production release.",
    "grammarNote": "",
    "exampleTr": "Kıdemli geliştiriciler stajyerlere ilk canlı ortam sürümlerinde rehberlik etti.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I guide",
      "translation": "Rehberlik ederim"
    },
    "presentContinuous": {
      "form": "I am guiding",
      "translation": "Rehberlik ediyorum"
    },
    "future": {
      "form": "I will guide",
      "translation": "Rehberlik edeceğim"
    },
    "pastSimple": {
      "form": "I guide",
      "translation": "Rehberlik ederim"
    }
  },
  {
    "id": "verb_296",
    "rank": 296,
    "word": "Import",
    "phonetic": "/ɪmˈpɔːt/",
    "translation": "İçe aktarmak",
    "exampleEn": "I imported the machine learning model weights into the inference script.",
    "grammarNote": "",
    "exampleTr": "Makine öğrenmesi model ağırlıklarını çıkarım (inference) betiğine içe aktardım.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I import",
      "translation": "İçe aktarırım"
    },
    "presentContinuous": {
      "form": "I am importing",
      "translation": "İçe aktarıyorum"
    },
    "future": {
      "form": "I will import",
      "translation": "İçe aktaracağım"
    },
    "pastSimple": {
      "form": "I import",
      "translation": "İçe aktarırım"
    }
  },
  {
    "id": "verb_297",
    "rank": 297,
    "word": "Initialize",
    "phonetic": "/ɪˈnɪʃ.əl.aɪz/",
    "translation": "Başlatmak / İlk değer vermek",
    "exampleEn": "The microkernel initialized all hardware communication buses safely.",
    "grammarNote": "",
    "exampleTr": "Mikro çekirdek tüm donanım iletişim veri yollarını güvenli şekilde başlattı.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I initialize",
      "translation": "Başlatırım"
    },
    "presentContinuous": {
      "form": "I am initializing",
      "translation": "Başlatıyorum"
    },
    "future": {
      "form": "I will initialize",
      "translation": "Başlatacağım"
    },
    "pastSimple": {
      "form": "I initialize",
      "translation": "Başlatırım"
    }
  },
  {
    "id": "verb_298",
    "rank": 298,
    "word": "Inspect",
    "phonetic": "/ɪnˈspekt/",
    "translation": "Denetlemek / İncelemek",
    "exampleEn": "I inspected the HTTP network headers using browser developer tools.",
    "grammarNote": "",
    "exampleTr": "Tarayıcı geliştirici araçlarını kullanarak HTTP ağ başlıklarını inceledim / denetledim.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I inspect",
      "translation": "Denetlerim / İncelerim"
    },
    "presentContinuous": {
      "form": "I am inspecting",
      "translation": "Denetliyorum / İnceliyorum"
    },
    "future": {
      "form": "I will inspect",
      "translation": "Denetleyeceğim / İnceleyeceğim"
    },
    "pastSimple": {
      "form": "I inspect",
      "translation": "Denetlerim / İncelerim"
    }
  },
  {
    "id": "verb_299",
    "rank": 299,
    "word": "Integrate",
    "phonetic": "/ˈɪn.tɪ.ɡreɪt/",
    "translation": "Entegre etmek / Birleştirmek",
    "exampleEn": "We integrated PayTR payment processing into the özkan3d web application.",
    "grammarNote": "",
    "exampleTr": "özkan3d web uygulamasına PayTR ödeme işlemeyi entegre ettik.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I integrate",
      "translation": "Entegre ederim"
    },
    "presentContinuous": {
      "form": "I am integrating",
      "translation": "Entegre ediyorum"
    },
    "future": {
      "form": "I will integrate",
      "translation": "Entegre edeceğim"
    },
    "pastSimple": {
      "form": "I integrate",
      "translation": "Entegre ederim"
    }
  },
  {
    "id": "verb_300",
    "rank": 300,
    "word": "Launch",
    "phonetic": "/lɔːntʃ/",
    "translation": "Yayına almak / Başlatmak",
    "exampleEn": "We will launch version 2.0 of our appointment management platform next week.",
    "grammarNote": "",
    "exampleTr": "Randevu yönetim platformumuzun 2.0 sürümünü gelecek hafta yayına alacağız.",
    "partOfSpeech": "verb",
    "presentSimple": {
      "form": "I launch",
      "translation": "Yayına alırım / Başlatırım"
    },
    "presentContinuous": {
      "form": "I am launching",
      "translation": "Yayına alıyorum / Başlatıyorum"
    },
    "future": {
      "form": "I will launch",
      "translation": "Yayına alacağım / Başlatacağım"
    },
    "pastSimple": {
      "form": "I launch",
      "translation": "Yayına alırım / Başlatırım"
    }
  }
] as LibraryWordEntry[];
