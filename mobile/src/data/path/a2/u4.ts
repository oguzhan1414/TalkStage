import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 4: then and now (comparatives -er / more, superlatives, as … as). */
export const A2_U4: PathUnit = {
  id: 'a2-u4',
  number: 4,
  title: L('Dün ve bugün', 'Then and now'),
  steps: [
    reading('a2-u4-s1', {
      number: 13,
      title: L('Eski kule', 'The old tower'),
      grammar: L('Karşılaştırma: -er than', 'Comparing: -er than'),
      minutes: 6,
      recap: L('Kafenin 30. yıl dönümünde sergi de açılacak. Tom davetiyeleri hazırladı.', "The exhibition will open on the café's 30th anniversary. Tom made the invitations."),
      words: [w('building', 'bina'), w('tower', 'kule'), w('statue', 'heykel, anıt'), w('palace', 'saray'), w('village', 'köy')],
      sentences: [
        s('Maya took the old photos and her camera into the city.', 'Maya eski fotoğrafları ve fotoğraf makinesini alıp şehre çıktı.'),
        s('In one photo, there was an old stone tower.', 'Bir fotoğrafta eski bir taş kule vardı.'),
        s('She found the tower near the river.', 'Kuleyi nehrin yanında buldu.'),
        s('But now there is a new building next to it.', 'Ama şimdi yanında yeni bir bina var.'),
        s('The building is taller than the tower!', 'Bina kuleden daha uzun!', 'Maya'),
        s('The tower is older, but it is smaller.', 'Kule daha eski ama daha küçük.', 'Leo'),
        s('In the photo, there was a statue of a horse.', 'Fotoğrafta bir at heykeli vardı.'),
        s('The statue is still there. It looks cleaner now.', 'Heykel hâlâ orada. Artık daha temiz görünüyor.'),
        s('Bristol was smaller then. It was like a village!', 'O zamanlar Bristol daha küçüktü. Bir köy gibiydi!', 'Mr Patel'),
        s('And the old tower looked like a palace to me.', 'Eski kule de bana bir saray gibi görünürdü.', 'Mr Patel'),
        s('Maya took a new photo from the same place.', 'Maya aynı yerden yeni bir fotoğraf çekti.'),
      ],
      questions: [
        q('What is next to the tower now?', 'Kulenin yanında şimdi ne var?', ['a new building', 'a palace', 'a village'], 0),
        q('Which is taller?', 'Hangisi daha uzun?', ['the tower', 'the building'], 1),
      ],
      tip: tip(
        L('Karşılaştırma: -er than', 'Comparing: -er than'),
        'The building is **taller than** the tower!',
        L(
          'Kısa sıfatlarda **-er + than** kullanılır: old → older than. Tek heceli, sessiz harfle biten sıfatta son harf ikilenir: big → bigger.',
          'With short adjectives use **-er + than**: old → older than. Double the last letter of short words like big → bigger.'
        ),
        [
          ['The tower is older than the building.', 'Kule binadan daha eski.'],
          ['Bristol is bigger now.', 'Bristol şimdi daha büyük.'],
        ],
        ['The building is more tall.', 'The building is taller.', 'Kısa sıfatlar **-er** alır, **more** almaz.', 'Short adjectives take **-er**, not **more**.']
      ),
      table: table(
        ['The tower | is older | than the building', 'The building | is taller | than the tower', 'The village | is smaller | than Bristol', 'This statue | is cleaner | than that one', 'The palace | is bigger | than the house'],
        'The building | is taller | than the tower',
        1,
        'is more tall',
        'Bina kuleden daha uzun.'
      ),
      practice: [
        choose('The tower is ___ than the building.', 'Kule binadan daha eski.', ['older', 'more old'], 0),
        choose('Bristol is ___ now.', 'Bristol artık daha büyük.', ['bigger', 'biger'], 0),
        order('The building is taller than the tower', 'Bina kuleden daha uzun.'),
        order('Bristol was smaller then', 'O zamanlar Bristol daha küçüktü.'),
      ],
      say: ['The tower is older than the building.'],
    }),
    reading('a2-u4-s2', {
      number: 14,
      title: L('Pazar meydanı', 'The market square'),
      grammar: L('Karşılaştırma: more … than', 'Comparing: more … than'),
      minutes: 6,
      recap: L('Maya eski kuleyi buldu. Yanına kuleden daha uzun yeni bir bina yapılmış.', 'Maya found the old tower. A new building, taller than the tower, stands next to it.'),
      words: [w('crowded', 'kalabalık'), w('noisy', 'gürültülü'), w('modern', 'modern'), w('ancient', 'çok eski, antik'), w('local', 'yerel')],
      sentences: [
        s('The next photo showed a quiet market square.', 'Sonraki fotoğraf sessiz bir pazar meydanını gösteriyordu.'),
        s('Maya went there on Saturday morning.', 'Maya cumartesi sabahı oraya gitti.'),
        s('Wow! It is more crowded than in the photo!', 'Vay! Fotoğraftakinden daha kalabalık!', 'Maya'),
        s('It is noisy too. Music, cars, people!', 'Gürültülü de. Müzik, arabalar, insanlar!', 'Maya'),
        s('The shops are more modern now.', 'Dükkânlar artık daha modern.'),
        s('But the ancient wall is still there.', 'Ama çok eski duvar hâlâ orada.'),
        s('A local man was selling bread and cheese.', 'Yerel bir adam ekmek ve peynir satıyordu.'),
        s('Maya showed him the old photo.', 'Maya ona eski fotoğrafı gösterdi.'),
        s('The market is busier now, but the bread is the same!', 'Pazar artık daha kalabalık ama ekmek aynı!', 'The man'),
        s('Maya laughed and bought some bread.', 'Maya güldü ve biraz ekmek aldı.'),
        s('Then she took a photo from the old wall.', 'Sonra eski duvarın yanından bir fotoğraf çekti.'),
      ],
      questions: [
        q('Is the market quieter now?', 'Pazar şimdi daha sessiz mi?', ['Yes, it is.', "No, it's more crowded."], 1),
        q('What was the local man selling?', 'Yerel adam ne satıyordu?', ['bread and cheese', 'photos', 'flowers'], 0),
      ],
      tip: tip(
        L('Uzun sıfatlar: more … than', 'Long adjectives: more … than'),
        'It is **more crowded than** in the photo!',
        L(
          'Uzun sıfatlarda **more + sıfat + than** kullanılır. **-y** ile biten sıfatlar **-ier** olur: noisy → noisier, busy → busier.',
          'With long adjectives use **more + adjective + than**. Adjectives ending in **-y** take **-ier**: noisy → noisier, busy → busier.'
        ),
        [
          ['The shops are more modern now.', 'Dükkânlar artık daha modern.'],
          ['The city is noisier than the village.', 'Şehir köyden daha gürültülü.'],
        ],
        ['The street is crowdeder.', 'The street is more crowded.', 'Uzun sıfatlar **-er** almaz, başına **more** gelir.', 'Long adjectives take **more**, not **-er**.']
      ),
      table: table(
        ['The street | is more crowded | than before', 'The city | is noisier | than the village', 'This café | is more modern | than that one', 'The market | is busier | than the shop', 'The wall | is more ancient | than the tower'],
        'The square | is more crowded | than before',
        1,
        'is crowdeder',
        'Meydan eskisinden daha kalabalık.'
      ),
      practice: [
        choose('It is ___ than in the photo.', 'Fotoğraftakinden daha kalabalık.', ['more crowded', 'crowdeder'], 0),
        choose('The city is ___ now.', 'Şehir artık daha gürültülü.', ['noisier', 'more noisy'], 0),
        order('The shops are more modern now', 'Dükkânlar artık daha modern.'),
        order('The ancient wall is still there', 'Çok eski duvar hâlâ orada.'),
      ],
      say: ['It is more crowded than in the photo!'],
    }),
    wordStep('a2-u4-s3', REVIEW, [
      w('building', 'bina'),
      w('tower', 'kule'),
      w('statue', 'heykel, anıt'),
      w('palace', 'saray'),
      w('village', 'köy'),
      w('crowded', 'kalabalık'),
      w('noisy', 'gürültülü'),
      w('modern', 'modern'),
      w('ancient', 'çok eski, antik'),
      w('local', 'yerel'),
      w('recipe', 'tarif'),
      w('spicy', 'acı, baharatlı'),
      w('dish', 'yemek'),
      w('guest', 'konuk'),
      w('invitation', 'davetiye'),
    ]),
    reading('a2-u4-s4', {
      number: 15,
      title: L('Şapkacı', 'The hat shop'),
      grammar: L('En: the -est / the most', 'The most: the -est / the most'),
      minutes: 6,
      recap: L('Pazar meydanı fotoğraftakinden çok daha kalabalık ve gürültülü. Ama ekmek aynı!', 'The market square is much more crowded and noisy than in the photo. But the bread is the same!'),
      words: [w('expensive', 'pahalı'), w('cheap', 'ucuz'), w('comfortable', 'rahat'), w('fashionable', 'moda, şık'), w('casual', 'günlük, rahat (giysi)')],
      sentences: [
        s('In the third photo, there was a street of small shops.', 'Üçüncü fotoğrafta küçük dükkânlarla dolu bir sokak vardı.'),
        s('Maya and Rosa walked down the same street.', 'Maya ve Rosa aynı sokakta yürüdü.'),
        s('Now there are big, fashionable shops.', 'Şimdi büyük, şık dükkânlar var.'),
        s('Look at this coat. It is the most expensive coat here!', 'Şu paltoya bak. Buradaki en pahalı palto!', 'Rosa'),
        s('And these shoes are cheap. They are the cheapest!', 'Bu ayakkabılar da ucuz. En ucuzları!', 'Maya'),
        s('Are they comfortable?', 'Rahatlar mı?', 'Rosa'),
        s('Yes! They are the most comfortable shoes in the shop.', 'Evet! Dükkândaki en rahat ayakkabılar.', 'Maya'),
        s('Then Maya stopped. A little hat shop!', 'Sonra Maya durdu. Küçük bir şapkacı!'),
        s('It was in the old photo too.', 'O da eski fotoğraftaydı.'),
        s('It is the oldest shop in the street.', 'Sokaktaki en eski dükkân.', 'Rosa'),
        s('Inside, an old man in casual clothes was making a hat.', 'İçeride günlük kıyafetli yaşlı bir adam şapka yapıyordu.'),
      ],
      questions: [
        q('What is the most expensive thing?', 'En pahalı şey ne?', ['a coat', 'the shoes', 'a hat'], 0),
        q('Which shop was in the old photo too?', 'Hangi dükkân eski fotoğrafta da vardı?', ['the hat shop', 'the shoe shop', 'the coat shop'], 0),
      ],
      tip: tip(
        L('En: the -est / the most', 'The most: the -est / the most'),
        'It is **the most expensive** coat here!',
        L(
          'Üstünlük için kısa sıfatlarda **the + -est**, uzun sıfatlarda **the most** kullanılır: the cheapest, the most expensive.',
          'To say "the most", short adjectives take **the + -est** and long ones take **the most**: the cheapest, the most expensive.'
        ),
        [
          ['It is the oldest shop in the street.', 'Sokaktaki en eski dükkân.'],
          ['This sofa is the most comfortable.', 'Bu kanepe en rahatı.'],
        ],
        ['It is the most cheap shop.', 'It is the cheapest shop.', 'cheap kısa bir sıfat: **the cheapest**.', 'cheap is short: **the cheapest**.']
      ),
      table: table(
        ['This is | the cheapest | shop', 'That is | the most expensive | coat', 'This sofa | is the most | comfortable', 'She is | the most | fashionable', "It's | the oldest | shop in Bristol"],
        "It's | the cheapest | shop in town",
        1,
        'the most cheap',
        'Kasabadaki en ucuz dükkân.'
      ),
      practice: [
        choose('These shoes are the ___.', 'Bu ayakkabılar en ucuzu.', ['cheapest', 'most cheap'], 0),
        choose('It is the ___ expensive coat.', 'En pahalı palto.', ['most', 'more'], 0),
        order('It is the oldest shop', 'En eski dükkân.'),
        order('Are they comfortable', 'Rahatlar mı?'),
      ],
      say: ['It is the oldest shop in the street.'],
    }),
    reading('a2-u4-s5', {
      number: 16,
      title: L('İki köprü', 'Two bridges'),
      grammar: L('as … as · not as … as', 'as … as · not as … as'),
      minutes: 6,
      recap: L('Sokaktaki dükkânların hepsi değişmiş. Sadece en eski şapkacı hâlâ orada.', 'All the shops in the street have changed. Only the oldest hat shop is still there.'),
      words: [w('huge', 'devasa'), w('tiny', 'minicik'), w('narrow', 'dar'), w('wide', 'geniş'), w('heavy', 'ağır')],
      sentences: [
        s('The last photo of the day showed an old bridge.', 'Günün son fotoğrafı eski bir köprüyü gösteriyordu.'),
        s('The old bridge was very narrow.', 'Eski köprü çok dardı.'),
        s('Only one car could go on it.', 'Üzerinden sadece bir araba geçebiliyordu.'),
        s('Now there is a new bridge next to it. It is huge!', 'Şimdi yanında yeni bir köprü var. Devasa!'),
        s('The new bridge is as wide as a road.', 'Yeni köprü bir yol kadar geniş.'),
        s("The old bridge isn't as wide as the new one.", 'Eski köprü yenisi kadar geniş değil.', 'Leo'),
        s('Maya carried the old camera all day.', 'Maya eski fotoğraf makinesini bütün gün taşıdı.'),
        s('This camera is as heavy as a book!', 'Bu fotoğraf makinesi bir kitap kadar ağır!', 'Maya'),
        s('Leo took a tiny new camera out of his bag.', 'Leo çantasından minicik yeni bir fotoğraf makinesi çıkardı.'),
        s("Mine isn't as heavy as yours!", 'Benimki seninki kadar ağır değil!', 'Leo'),
        s('Maya laughed and took a photo of both bridges.', 'Maya güldü ve iki köprünün de fotoğrafını çekti.'),
      ],
      questions: [
        q('What was the old bridge like?', 'Eski köprü nasıldı?', ['very narrow', 'huge', 'very wide'], 0),
        q("Is Leo's camera as heavy as Maya's?", "Leo'nun fotoğraf makinesi Maya'nınki kadar ağır mı?", ['Yes, it is.', "No, it isn't."], 1),
      ],
      tip: tip(
        L('Eşitlik: as … as', 'Equal: as … as'),
        'The new bridge is **as wide as** a road.',
        L(
          'İki şey eşitse **as + sıfat + as**, eşit değilse **not as … as** kullanılır. Aradaki sıfat yalın kalır: wide (wider değil).',
          'Use **as + adjective + as** when two things are equal and **not as … as** when they are not. The adjective stays plain: wide, not wider.'
        ),
        [
          ["The old bridge isn't as wide as the new one.", 'Eski köprü yenisi kadar geniş değil.'],
          ['This camera is as heavy as a book.', 'Bu fotoğraf makinesi bir kitap kadar ağır.'],
        ],
        ['It is as wider as the road.', 'It is as wide as the road.', '**as … as** arasında sıfat yalın kalır.', 'Between **as … as** the adjective stays plain.']
      ),
      table: table(
        ['The bridge | is as wide | as the road', "The old street | isn't as wide | as the new one", 'My bag | is as heavy | as yours', "The café | isn't as tiny | as before", 'The new tower | is as huge | as the old one'],
        "The street | isn't as narrow | as before",
        1,
        "isn't as narrower",
        'Sokak eskisi kadar dar değil.'
      ),
      practice: [
        choose('The new bridge is as ___ as a road.', 'Yeni köprü bir yol kadar geniş.', ['wide', 'wider'], 0),
        choose("Mine isn't ___ heavy as yours.", 'Benimki seninki kadar ağır değil.', ['as', 'than'], 0),
        order('The new bridge is huge', 'Yeni köprü devasa.'),
        order('This camera is as heavy as a book', 'Bu fotoğraf makinesi bir kitap kadar ağır.'),
      ],
      say: ['This camera is as heavy as a book!'],
    }),
    scene('a2-u4-s6', L('Mivo ile: Telefon seçimi', 'With Mivo: Choosing a phone'), 'vs-a2-phone-shop'),
  ],
};
