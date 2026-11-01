import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 6: a corner in the café (verb + to, verb + -ing, too / enough, adverbs with -ly). */
export const A2_U6: PathUnit = {
  id: 'a2-u6',
  number: 6,
  title: L('Kafede bir köşe', 'A corner in the café'),
  steps: [
    reading('a2-u6-s1', {
      number: 21,
      title: L('Sergi köşesi', 'The exhibition corner'),
      grammar: L('Fiil + to: decide to, hope to', 'Verb + to: decide to, hope to'),
      minutes: 6,
      recap: L('Tom eski fotoğrafları okulda gösterdi. Önce izin istemesi gerekti, sonra herkes bayıldı.', 'Tom showed the old photos at school. He had to ask for permission first, and then everyone loved them.'),
      words: [w('agree', 'kabul etmek, aynı fikirde olmak'), w('decide', 'karar vermek'), w('expect', 'beklemek, ummak'), w('hope', 'ummak'), w('plan', 'planlamak')],
      sentences: [
        s('Mr Patel felt better after a week.', 'Bay Patel bir hafta sonra daha iyi hissetti.'),
        s('Everyone met at the café to plan the exhibition.', 'Herkes sergiyi planlamak için kafede buluştu.'),
        s('Where can we put the photos?', 'Fotoğrafları nereye koyabiliriz?', 'Maya'),
        s('Rosa thought for a minute.', 'Rosa bir dakika düşündü.'),
        s('You can use that corner of the café.', 'Kafenin şu köşesini kullanabilirsiniz.', 'Rosa'),
        s('Rosa agreed to give us a corner!', 'Rosa bize bir köşe vermeyi kabul etti!', 'Tom'),
        s('But the wall in the corner was old and grey.', 'Ama köşedeki duvar eski ve griydi.'),
        s('They decided to paint the wall.', 'Duvarı boyamaya karar verdiler.'),
        s('I hope to finish it this weekend.', 'Bu hafta sonu bitirmeyi umuyorum.', 'Leo'),
        s('How many guests do you expect?', 'Kaç konuk bekliyorsun?', 'Rosa'),
        s('I expect to see fifty people!', 'Elli kişi görmeyi umuyorum!', 'Maya'),
        s('Fifty? Then we need a lot of cake!', 'Elli mi? O zaman çok pastaya ihtiyacımız var!', 'Rosa'),
      ],
      questions: [
        q('What did Rosa agree to do?', 'Rosa ne yapmayı kabul etti?', ['give them a corner', 'paint the wall', 'take photos'], 0),
        q('How many people does Maya expect?', 'Maya kaç kişi bekliyor?', ['fifteen', 'fifty', 'five'], 1),
      ],
      tip: tip(
        L('Fiil + to: decide to, hope to', 'Verb + to: decide to, hope to'),
        'Rosa **agreed to give** us a corner!',
        L(
          '**plan, hope, decide, expect, agree** gibi fiillerden sonra **to + fiil** gelir.',
          'After verbs like **plan, hope, decide, expect, agree** use **to + verb**.'
        ),
        [
          ['They decided to paint the wall.', 'Duvarı boyamaya karar verdiler.'],
          ['I hope to finish this weekend.', 'Bu hafta sonu bitirmeyi umuyorum.'],
        ],
        ['We decided painting the wall.', 'We decided to paint the wall.', '**decide**dan sonra **to + fiil** gelir.', 'After **decide** use **to + verb**.']
      ),
      table: table(
        ['We | decided | to use the corner', 'Leo | hopes | to finish today', 'Rosa | agreed | to help', 'I | expect | to see many guests', 'They | plan | to open in May'],
        'Rosa agreed | to help | us',
        1,
        'helping',
        'Rosa bize yardım etmeyi kabul etti.'
      ),
      practice: [
        choose('Rosa agreed ___ help.', 'Rosa yardım etmeyi kabul etti.', ['to', 'for'], 0),
        choose('They decided ___ the wall.', 'Duvarı boyamaya karar verdiler.', ['to paint', 'painting'], 0),
        order('I hope to finish it', 'Bitirmeyi umuyorum.'),
        order('We plan to open in May', "Mayıs'ta açmayı planlıyoruz."),
      ],
      say: ['Rosa agreed to give us a corner!'],
    }),
    reading('a2-u6-s2', {
      number: 22,
      title: L('Mavi duvar', 'The blue wall'),
      grammar: L('Fiil + -ing: enjoy, avoid', 'Verb + -ing: enjoy, avoid'),
      minutes: 6,
      recap: L('Rosa sergi için kafenin bir köşesini verdi. Ekip duvarı boyamaya karar verdi.', 'Rosa gave them a corner of the café for the exhibition. The team decided to paint the wall.'),
      words: [w('enjoy', 'keyif almak'), w('avoid', 'kaçınmak'), w('consider', 'düşünmek, göz önüne almak'), w('suggest', 'önermek'), w('imagine', 'hayal etmek')],
      sentences: [
        s('On Saturday, Leo painted the wall.', 'Cumartesi Leo duvarı boyadı.'),
        s('Leo really enjoys painting.', 'Leo boya yapmaktan gerçekten keyif alıyor.'),
        s('He was singing and dancing with the brush.', 'Fırçayla şarkı söyleyip dans ediyordu.'),
        s('Maya avoided climbing the ladder.', 'Maya merdivene çıkmaktan kaçındı.'),
        s("I don't like high places!", 'Yüksek yerleri sevmem!', 'Maya'),
        s('What colour? We considered white and green.', 'Hangi renk? Beyazı ve yeşili düşündük.', 'Leo'),
        s('Tom suggested using blue.', 'Tom mavi kullanmayı önerdi.'),
        s('Blue, like the sky in the old photos!', 'Eski fotoğraflardaki gökyüzü gibi mavi!', 'Tom'),
        s('Everyone liked the idea.', 'Herkes fikri beğendi.'),
        s('Mr Patel sat in a chair and watched.', 'Bay Patel bir sandalyeye oturup izledi.'),
        s('Imagine seeing your photos on this wall, Maya!', 'Fotoğraflarını bu duvarda gördüğünü hayal et Maya!', 'Mr Patel'),
      ],
      questions: [
        q('What does Leo enjoy?', 'Leo neden keyif alıyor?', ['painting', 'climbing', 'cooking'], 0),
        q('Which colour did Tom suggest?', 'Tom hangi rengi önerdi?', ['blue', 'white', 'green'], 0),
      ],
      tip: tip(
        L('Fiil + -ing: enjoy, avoid', 'Verb + -ing: enjoy, avoid'),
        'Leo really **enjoys painting**.',
        L(
          '**enjoy, avoid, consider, suggest, imagine** gibi fiillerden sonra gelen fiil **-ing** alır.',
          'After verbs like **enjoy, avoid, consider, suggest, imagine** the next verb takes **-ing**.'
        ),
        [
          ['Tom suggested using blue.', 'Tom mavi kullanmayı önerdi.'],
          ['Maya avoided climbing the ladder.', 'Maya merdivene çıkmaktan kaçındı.'],
        ],
        ['Leo enjoys to paint.', 'Leo enjoys painting.', '**enjoy**dan sonra **-ing** gelir.', 'After **enjoy** use **-ing**.']
      ),
      table: table(
        ['Leo | enjoys | painting walls', 'Maya | avoids | climbing ladders', 'Tom | suggested | using blue', 'We | considered | moving the sofa', 'Imagine | seeing | your photo on the wall!'],
        'Leo enjoys | painting | the wall',
        1,
        'to paint',
        'Leo duvarı boyamaktan keyif alıyor.'
      ),
      practice: [
        choose('Leo enjoys ___.', 'Leo boya yapmaktan keyif alıyor.', ['painting', 'to paint'], 0),
        choose('Tom suggested ___ blue.', 'Tom mavi kullanmayı önerdi.', ['using', 'to use'], 0),
        order('Leo really enjoys painting', 'Leo boya yapmaktan gerçekten keyif alıyor.'),
        order('Maya avoided climbing the ladder', 'Maya merdivene çıkmaktan kaçındı.'),
      ],
      say: ['Imagine seeing your photos on this wall!'],
    }),
    wordStep('a2-u6-s3', L('Giysiler', 'Clothes'), [
      w('shirt', 'gömlek'),
      w('dress', 'elbise'),
      w('skirt', 'etek'),
      w('trousers', 'pantolon'),
      w('jeans', 'kot pantolon'),
      w('jumper', 'kazak'),
      w('jacket', 'ceket, mont'),
      w('boots', 'bot, çizme'),
      w('socks', 'çorap'),
      w('scarf', 'atkı'),
    ]),
    reading('a2-u6-s4', {
      number: 23,
      title: L('Çok küçük, yeterince geniş', 'Too small, wide enough'),
      grammar: L('too / enough', 'too / enough'),
      minutes: 6,
      recap: L('Leo duvarı maviye boyadı. Maya merdivenden uzak durdu, Bay Patel izledi.', 'Leo painted the wall blue. Maya kept away from the ladder, and Mr Patel watched.'),
      words: [w('fridge', 'buzdolabı'), w('furniture', 'mobilya'), w('pillow', 'yastık'), w('shelf', 'raf'), w('towel', 'havlu')],
      sentences: [
        s('Next, they had to move some furniture.', 'Sonra bazı mobilyaları taşımaları gerekti.'),
        s('There was an old fridge in the corner.', 'Köşede eski bir buzdolabı vardı.'),
        s('Leo tried to move it.', 'Leo onu taşımaya çalıştı.'),
        s('This fridge is too heavy!', 'Bu buzdolabı çok ağır!', 'Leo'),
        s('Maya wanted to put the photos on a shelf.', 'Maya fotoğrafları bir rafa koymak istedi.'),
        s('But the shelf was too small.', 'Ama raf çok küçüktü.'),
        s("It isn't big enough for the photos.", 'Fotoğraflar için yeterince büyük değil.', 'Maya'),
        s('Tom cleaned the old sofa with a towel.', 'Tom eski kanepeyi bir havluyla temizledi.'),
        s('Then he put a soft pillow on it.', 'Sonra üstüne yumuşak bir yastık koydu.'),
        s('Rosa looked at the new blue wall.', 'Rosa yeni mavi duvara baktı.'),
        s('The wall is wide enough. Put the photos there!', 'Duvar yeterince geniş. Fotoğrafları oraya koyun!', 'Rosa'),
        s('Of course! Why not?', 'Tabii ya! Neden olmasın?', 'Maya'),
      ],
      questions: [
        q("Why didn't Leo move the fridge?", 'Leo buzdolabını neden taşımadı?', ['It was too heavy.', 'It was too small.', 'It was new.'], 0),
        q('Where will the photos go?', 'Fotoğraflar nereye konacak?', ['on the wall', 'on the shelf', 'on the fridge'], 0),
      ],
      tip: tip(
        L('too ve enough', 'too and enough'),
        'The wall is wide **enough**.',
        L(
          "**too + sıfat** 'gereğinden fazla' demektir. **sıfat + enough** 'yeterince' demektir; enough sıfattan **sonra** gelir.",
          '**too + adjective** means more than you want. **adjective + enough** means as much as you need; enough comes **after** the adjective.'
        ),
        [
          ['The shelf is too small.', 'Raf çok küçük.'],
          ["It isn't big enough.", 'Yeterince büyük değil.'],
        ],
        ['The wall is enough wide.', 'The wall is wide enough.', '**enough** sıfattan sonra gelir.', '**enough** goes after the adjective.']
      ),
      table: table(
        ['The shelf | is too | small', "The fridge | isn't light | enough", 'The wall | is wide | enough', 'This pillow | is too | soft', 'The furniture | is too | heavy'],
        "The shelf | isn't wide | enough",
        2,
        'too',
        'Raf yeterince geniş değil.'
      ),
      practice: [
        choose('The fridge is ___ heavy.', 'Buzdolabı çok ağır.', ['too', 'enough'], 0),
        choose("It isn't big ___.", 'Yeterince büyük değil.', ['enough', 'too'], 0),
        order('The shelf was too small', 'Raf çok küçüktü.'),
        order('The wall is wide enough', 'Duvar yeterince geniş.'),
      ],
      say: ['The wall is wide enough!'],
    }),
    reading('a2-u6-s5', {
      number: 24,
      title: L('Fırıncının fotoğrafı', "The baker's photo"),
      grammar: L('Zarflar: -ly', 'Adverbs: -ly'),
      minutes: 6,
      recap: L('Buzdolabı çok ağır, raf çok küçüktü. Ama mavi duvar yeterince geniş çıktı.', 'The fridge was too heavy and the shelf was too small. But the blue wall was wide enough.'),
      words: [w('carefully', 'dikkatlice'), w('quietly', 'sessizce'), w('loudly', 'yüksek sesle'), w('quickly', 'hızlıca'), w('slowly', 'yavaşça')],
      sentences: [
        s('The corner was ready at last.', 'Köşe sonunda hazırdı.'),
        s('Maya hung the old photos carefully.', 'Maya eski fotoğrafları dikkatle astı.'),
        s('Leo sang loudly while he cleaned.', 'Leo temizlik yaparken yüksek sesle şarkı söyledi.'),
        s('Leo, please! Not so loudly!', 'Leo, lütfen! Bu kadar yüksek sesle değil!', 'Rosa'),
        s('Tom worked quickly. He wanted to finish first.', 'Tom hızlı çalıştı. İlk bitiren olmak istedi.'),
        s('Mr Patel walked slowly along the wall.', 'Bay Patel duvar boyunca yavaşça yürüdü.'),
        s('He looked at every photo quietly.', 'Her fotoğrafa sessizce baktı.'),
        s('Then he stopped at one photo.', 'Sonra bir fotoğrafın önünde durdu.'),
        s('A baker was smiling in it. His face was white with flour.', 'İçinde bir fırıncı gülümsüyordu. Yüzü un içindeydi.'),
        s('Who is he?', 'O kim?', 'Maya'),
        s("I don't remember his name.", 'Adını hatırlamıyorum.', 'Mr Patel'),
      ],
      questions: [
        q('How did Maya hang the photos?', 'Maya fotoğrafları nasıl astı?', ['carefully', 'quickly', 'loudly'], 0),
        q('Who was in the photo?', 'Fotoğrafta kim vardı?', ['a baker', 'a pilot', 'a doctor'], 0),
      ],
      tip: tip(
        L('Nasıl? Zarflar: -ly', 'How? Adverbs: -ly'),
        'Maya hung the old photos **carefully**.',
        L(
          'Bir eylemin **nasıl** yapıldığını anlatan zarflar çoğu sıfata **-ly** eklenerek yapılır: slow → slowly. Zarf genelde fiilden ya da nesneden sonra gelir.',
          'Adverbs say **how** something is done; most add **-ly** to the adjective: slow → slowly. They usually go after the verb or the object.'
        ),
        [
          ['Leo sings loudly.', 'Leo yüksek sesle şarkı söylüyor.'],
          ['Mr Patel walked slowly.', 'Bay Patel yavaşça yürüdü.'],
        ],
        ['Maya hangs the photos careful.', 'Maya hangs the photos carefully.', 'Eylemi anlatan kelime **-ly** alır.', 'Use the **-ly** adverb to describe the action.']
      ),
      table: table(
        ['Leo | sings | loudly', 'Maya | hangs the photos | carefully', 'Tom | works | quickly', 'Rosa | speaks | quietly', 'The old printer | works | slowly'],
        'Maya hangs | the photos | carefully',
        2,
        'careful',
        'Maya fotoğrafları dikkatle asıyor.'
      ),
      practice: [
        choose('Leo sings ___.', 'Leo yüksek sesle şarkı söylüyor.', ['loudly', 'loud'], 0),
        choose('Mr Patel walked ___.', 'Bay Patel yavaşça yürüdü.', ['slowly', 'slow'], 0),
        order('He looked at every photo quietly', 'Her fotoğrafa sessizce baktı.'),
        order('Tom worked quickly', 'Tom hızlı çalıştı.'),
      ],
      say: ['Maya hung the photos carefully.'],
    }),
    scene('a2-u6-s6', L('Mivo ile: Taşınan arkadaşa yardım', 'With Mivo: Helping a friend move'), 'vs-a2-helping-move'),
  ],
};
