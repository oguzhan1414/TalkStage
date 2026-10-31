import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 3: Cádiz (fixed subjunctive phrases, litotes, whatever / be it … or …, conditionals without if). */
export const C2_U3: PathUnit = {
  id: 'c2-u3',
  number: 3,
  title: L('Cádiz', 'Cádiz'),
  steps: [
    reading('c2-u3-s1', {
      number: 9,
      title: L("Cádiz'e varış", 'Arriving in Cádiz'),
      grammar: L('Kalıp ifadeler: come what may / be that as it may', 'Fixed phrases: come what may / be that as it may'),
      minutes: 10,
      recap: L(
        "Dr Pryce mektupları kulaktan dolma bilgi diye geçiştirdi. Maya ve Leo kanıt için İspanya'ya bilet aldı.",
        'Dr Pryce dismissed the letters as hearsay. Maya and Leo booked flights to Spain to find proof.'
      ),
      words: [
        w('promenade', 'sahil yolu, gezinti yolu'),
        w('fortress', 'kale'),
        w('ramparts', 'surlar'),
        w('watchtower', 'gözetleme kulesi'),
        w('plaza', 'meydan'),
      ],
      sentences: [
        s("Come what may, we're going to see my grandmother first.", 'Ne olursa olsun önce büyükanneme gidiyoruz.', 'Maya'),
        s(
          'Leo, who hated flying, held the armrest with both hands for the whole flight.',
          'Uçmaktan nefret eden Leo bütün uçuş boyunca koltuk koluna iki eliyle tutundu.'
        ),
        s('Suffice it to say, the flight was not relaxing.', 'Şu kadarını söyleyeyim, uçuş hiç rahat geçmedi.'),
        s('But Cádiz took their breath away.', 'Ama Cádiz nefeslerini kesti.'),
        s(
          'The old city sat on the sea like a white ship, bright in the afternoon sun.',
          'Eski şehir, öğleden sonra güneşinde parlayan beyaz bir gemi gibi denizin üstünde duruyordu.'
        ),
        s('They walked along the promenade under tall palm trees.', 'Uzun palmiyelerin altında sahil yolu boyunca yürüdüler.'),
        s('At the end stood a stone fortress, reaching out into the waves.', 'Sonunda dalgaların içine uzanan taş bir kale duruyordu.'),
        s('People were walking on its ramparts, taking photos of the sunset.', 'İnsanlar surlarında yürüyor, gün batımının fotoğrafını çekiyordu.'),
        s(
          'Maya suddenly stopped and pointed at a round stone tower standing above the water.',
          'Maya birden durdu ve suyun üstünde yükselen yuvarlak taş bir kuleyi gösterdi.'
        ),
        s("That's the watchtower from Diego's letters!", "Bu, Diego'nun mektuplarındaki gözetleme kulesi!", 'Maya'),
        s(
          'He wrote that he could see it from his ship, and that it meant home.',
          'Gemisinden onu görebildiğini ve onun ev demek olduğunu yazmıştı.',
          'Maya'
        ),
        s(
          'Leo filmed the tower from every side until the evening light turned gold.',
          'Leo akşam ışığı altın rengine dönene kadar kuleyi her yönden çekti.'
        ),
        s(
          'Then they crossed a small plaza with a fountain, orange trees and old men playing cards.',
          'Sonra çeşmeli, portakal ağaçlı ve kâğıt oynayan yaşlı adamların olduğu küçük bir meydandan geçtiler.'
        ),
        s("Maya's phone rang. It was her grandmother.", 'Maya’nın telefonu çaldı. Büyükannesiydi.'),
        s('Where are you? The dinner is getting cold!', 'Neredesiniz? Yemek soğuyor!', 'Carmen'),
        s('Be that as it may, Abuela, we only landed an hour ago.', 'Her ne kadar öyle olsa da büyükanne, daha bir saat önce indik.', 'Maya'),
        s('Then run. So be it, I will wait ten more minutes.', 'O zaman koşun. Peki öyle olsun, on dakika daha beklerim.', 'Carmen'),
        s('They ran across the plaza, laughing.', 'Gülerek meydanı koşarak geçtiler.'),
        s(
          "Somewhere in this bright, noisy city, Diego's story was still waiting for them.",
          "Bu parlak, gürültülü şehrin bir yerinde Diego'nun hikâyesi hâlâ onları bekliyordu."
        ),
      ],
      questions: [
        q('How was the flight?', 'Uçuş nasıl geçti?', ['not relaxing', 'very funny', 'very short'], 0),
        q('What did the watchtower mean to Diego?', 'Gözetleme kulesi Diego için ne demekti?', ['home', 'danger', 'money'], 0),
        q('What did Carmen say about the dinner?', 'Carmen yemek için ne dedi?', ['It is getting cold.', 'It is not ready.', 'She forgot it.'], 0),
      ],
      tip: tip(
        L('come what may / be that as it may / suffice it to say', 'come what may / be that as it may / suffice it to say'),
        "**Come what may**, we're going to see my grandmother first.",
        L(
          'Eski subjunctive yapısından kalma bazı kalıplar bugün sabit ifade olarak yaşar: **come what may** (ne olursa olsun), **be that as it may** (her ne kadar öyle olsa da), **suffice it to say** (şu kadarını söyleyeyim), **so be it** (öyle olsun). Kelimeleri değiştirilmez.',
          'Some old subjunctive forms live on as fixed phrases: **come what may**, **be that as it may**, **suffice it to say**, **so be it**. Their words never change.'
        ),
        [
          ['Suffice it to say, the flight was not relaxing.', 'Şu kadarını söyleyeyim, uçuş hiç rahat geçmedi.'],
          ['Be that as it may, Abuela, we only landed an hour ago.', 'Her ne kadar öyle olsa da büyükanne, daha bir saat önce indik.'],
        ],
        [
          'Comes what may, we will go.',
          'Come what may, we will go.',
          'Kalıp sabittir: **come** -s almaz.',
          'The phrase is fixed: **come** takes no -s.',
        ]
      ),
      table: table(
        [
          'Come what may | we | will find the truth',
          'Be that as it may | the letters | are real',
          'Suffice it to say | it was | a long journey',
          'Come what may | I | will wait',
          'So be it | we | will go tomorrow',
        ],
        'Come what may | we | are going to Cádiz',
        0,
        'Comes what may',
        "Ne olursa olsun Cádiz'e gidiyoruz."
      ),
      practice: [
        choose('___ what may, we will find the truth.', 'Ne olursa olsun gerçeği bulacağız.', ['Come', 'Comes'], 0),
        choose('Suffice it to ___, it was a long day.', 'Şu kadarını söyleyeyim, uzun bir gündü.', ['say', 'tell'], 0),
        order('So be it', 'Öyle olsun.'),
        order('They ran across the plaza', 'Meydanı koşarak geçtiler.'),
      ],
      say: ["Come what may, we're going to Cádiz."],
    }),
    reading('c2-u3-s2', {
      number: 10,
      title: L('Carmen', 'Carmen'),
      grammar: L('Örtük anlatım: not unlike / far from', 'Understatement: not unlike / far from'),
      minutes: 10,
      recap: L(
        "Maya ve Leo Cádiz'e vardı: sahil yolu, eski kale ve Diego'nun gözetleme kulesi.",
        "Maya and Leo arrived in Cádiz: the promenade, the old fortress and Diego's watchtower."
      ),
      words: [
        w('kinship', 'akrabalık, yakınlık'),
        w('lineage', 'soy'),
        w('descendant', 'soyundan gelen, torun'),
        w('matriarch', 'aile reisi kadın'),
        w('heirloom', 'aile yadigârı'),
      ],
      sentences: [
        s(
          "Carmen's house, near the old cathedral, was full of plants, blue tiles and noisy relatives.",
          "Carmen'in eski katedralin yakınındaki evi bitkiler, mavi çiniler ve gürültücü akrabalarla doluydu."
        ),
        s('She was the matriarch of the family, and everyone knew it.', 'Ailenin reisiydi ve bunu herkes biliyordu.'),
        s(
          'At eighty-one, she still walked with her head high and her cane like a sword.',
          'Seksen bir yaşında hâlâ başı dik, bastonu bir kılıç gibi yürüyordu.'
        ),
        s('Carmen was not unlike Maya: stubborn and warm.', "Carmen, Maya'dan farksız değildi: inatçı ve sıcak."),
        s('She hugged Maya for a long time, then looked Leo up and down.', "Maya'ya uzun uzun sarıldı, sonra Leo'yu baştan aşağı süzdü."),
        s('So you are the musician. You are not without charm.', 'Demek müzisyen sensin. Çekicilikten yoksun değilsin.', 'Carmen'),
        s('Leo was far from sure whether that was a compliment.', 'Leo bunun bir iltifat olup olmadığından hiç emin değildi.'),
        s(
          'After a dinner that lasted three hours, Carmen brought out a long roll of paper.',
          'Üç saat süren bir yemekten sonra Carmen uzun bir kâğıt rulosu çıkardı.'
        ),
        s('It was the family lineage.', 'Ailenin soy ağacıydı.'),
        s('Her own mother had drawn it, name by name.', 'Onu kendi annesi isim isim çizmişti.'),
        s(
          'The names went back more than two hundred years, generation after generation.',
          'İsimler kuşaktan kuşağa iki yüz yıldan fazla geriye gidiyordu.'
        ),
        s('At the very top, in faded ink, was Diego de Molina.', 'En tepede, solmuş mürekkeple Diego de Molina vardı.'),
        s('And at the very bottom, the youngest name of all: Maya.', 'En altta da hepsinden genç isim: Maya.'),
        s('You are his descendant.', 'Sen onun soyundan geliyorsun.', 'Carmen'),
        s('Then Carmen opened a small box and took out an old gold locket.', 'Sonra Carmen küçük bir kutu açtı ve eski bir altın madalyon çıkardı.'),
        s('This heirloom has passed from mother to daughter since 1791.', "Bu aile yadigârı 1791'den beri anneden kıza geçiyor.", 'Carmen'),
        s(
          'Inside the locket was a tiny painting of a woman in a tricorn hat.',
          'Madalyonun içinde üç köşeli şapkalı bir kadının minicik bir resmi vardı.'
        ),
        s('Maya knew her at once. It was Annie.', "Maya onu hemen tanıdı. Annie'ydi."),
        s('Leo felt a strange kinship with everyone at that table.', 'Leo o masadaki herkese karşı tuhaf bir yakınlık hissetti.'),
        s('It was far from easy to stop crying, so nobody tried.', 'Ağlamayı durdurmak hiç kolay değildi, o yüzden kimse denemedi.'),
      ],
      questions: [
        q('What was Carmen like?', 'Carmen nasıl biriydi?', ['stubborn and warm', 'shy and quiet', 'cold and strict'], 0),
        q('Whose name was at the very top?', 'En tepede kimin adı vardı?', ['Diego de Molina', 'Annie', 'Carmen'], 0),
        q('Who was in the tiny painting in the locket?', 'Madalyondaki minicik resimde kim vardı?', ['Annie', 'Diego', 'Carmen'], 0),
      ],
      tip: tip(
        L('not unlike / not without / far from', 'not unlike / not without / far from'),
        'Carmen was **not unlike** Maya: stubborn and warm.',
        L(
          'C2’de bir şeyi tersinin olumsuzuyla, yumuşatarak söyleriz (örtük anlatım): **not unlike** (… den farksız değil, … e benzer), **not without** charm (çekicilikten yoksun değil), **far from** easy (hiç kolay değil). İngilizler bu ölçülü dili çok sever.',
          'At C2 we often say something gently through the negative of its opposite (understatement): **not unlike** (similar to), **not without** charm, **far from** easy. British English loves this restraint.'
        ),
        [
          ['So you are the musician. You are not without charm.', 'Demek müzisyen sensin. Çekicilikten yoksun değilsin.'],
          ['It was far from easy to stop crying.', 'Ağlamayı durdurmak hiç kolay değildi.'],
        ],
        [
          'Carmen was not unlike to Maya.',
          'Carmen was not unlike Maya.',
          '**not unlike**dan sonra doğrudan isim gelir, **to** yok.',
          'After **not unlike** the noun follows directly, with no **to**.',
        ]
      ),
      table: table(
        [
          'She was | not unlike | Maya',
          'He was proud | not without | reason',
          'It was | far from | easy',
          'The house was | not unlike | a museum',
          'Leo was | far from | sure',
        ],
        'Carmen was | not unlike | her granddaughter',
        1,
        'not like',
        'Carmen torunundan farksız değildi.'
      ),
      practice: [
        choose('It was far ___ easy.', 'Hiç kolay değildi.', ['from', 'of'], 0),
        choose('She was not ___ Maya.', "Maya'dan farksız değildi.", ['unlike', 'like'], 0),
        order('You are his descendant', 'Sen onun soyundan geliyorsun.'),
        order('It was the family lineage', 'Ailenin soy ağacıydı.'),
      ],
      say: ['Carmen was not unlike Maya: stubborn and warm.'],
    }),
    wordStep('c2-u3-s3', L('Duygu deyimleri', 'Feeling idioms'), [
      w('over the moon', 'havalara uçmak, çok mutlu'),
      w('down in the dumps', 'morali bozuk, keyifsiz'),
      w('on edge', 'gergin, diken üstünde'),
      w("a lump in one's throat", 'boğazı düğümlenmek'),
      w('walk on air', 'bulutların üstünde yürümek'),
      w('at a loss', 'ne yapacağını bilememek'),
    ]),
    reading('c2-u3-s4', {
      number: 11,
      title: L('Son mektup', 'The last letter'),
      grammar: L('Kayıtsız tavır: however / be it … or …', 'However long / be it … or …'),
      minutes: 10,
      recap: L(
        "Carmen, Maya'ya aile soy ağacını gösterdi: Maya, Diego'nun soyundan geliyor. Madalyonda Annie'nin resmi var.",
        "Carmen showed Maya the family tree: Maya is Diego's descendant. Annie's portrait is in the family locket."
      ),
      words: [w('nostalgia', 'nostalji'), w('melancholy', 'hüzün'), w('longing', 'özlem'), w('reverie', 'hayale dalma'), w('solace', 'teselli')],
      sentences: [
        s(
          'Late that night, after the last cousin had gone home, the old house was finally quiet.',
          'O gece geç saatte, son kuzen de evine gittikten sonra eski ev sonunda sessizleşti.'
        ),
        s('Carmen sat by the window in a soft reverie.', 'Carmen pencerenin yanında tatlı bir hayale dalmış oturuyordu.'),
        s('She was looking at old photos with a smile full of nostalgia.', 'Nostaljiyle dolu bir gülümsemeyle eski fotoğraflara bakıyordu.'),
        s(
          'Maya brought her a cup of mint tea and sat beside her on the old sofa.',
          'Maya ona bir fincan nane çayı getirdi ve eski kanepede yanına oturdu.'
        ),
        s('Abuela, is there anything else? Any other letter?', 'Büyükanne, başka bir şey var mı? Başka bir mektup?', 'Maya'),
        s('Carmen was silent for a long moment. Then, slowly, she nodded.', 'Carmen uzun bir an sustu. Sonra yavaşça başını salladı.'),
        s(
          'From under her bed, she pulled a carved wooden box that smelled of the sea.',
          'Yatağının altından deniz kokan oymalı tahta bir kutu çekti.'
        ),
        s('Inside was one last letter, from Annie to Diego, dated 1791.', "İçinde Annie'den Diego'ya, 1791 tarihli son bir mektup vardı."),
        s('Our family has kept it for two hundred years, whatever happened.', 'Ailemiz ne olursa olsun onu iki yüz yıl sakladı.', 'Carmen'),
        s('Maya read it aloud, and the whole house woke up to listen.', 'Maya onu yüksek sesle okudu ve bütün ev dinlemek için uyandı.'),
        s('My dear Diego, they tell me your ship is lost.', 'Sevgili Diego, gemin kayboldu diyorlar.', 'Annie'),
        s('I do not believe them.', 'Onlara inanmıyorum.', 'Annie'),
        s('However long it takes, I will wait for you on the quay.', 'Ne kadar sürerse sürsün seni rıhtımda bekleyeceğim.', 'Annie'),
        s('Be it in Bristol or in Cádiz, we will be together.', "İster Bristol'da ister Cádiz'de olsun, birlikte olacağız.", 'Annie'),
        s('Whatever they say, I know you are alive.', 'Ne derlerse desinler, yaşadığını biliyorum.', 'Annie'),
        s('The letter was full of longing.', 'Mektup özlemle doluydu.'),
        s('But it was not only melancholy. It was brave.', 'Ama sadece hüzünlü değildi. Cesurdu.'),
        s(
          'Carmen listened with her eyes closed, as she had a hundred times before.',
          'Carmen daha önce yüz kez yaptığı gibi gözlerini kapatarak dinledi.'
        ),
        s('Maya held her hand. There was solace in sharing it at last.', 'Maya onun elini tuttu. Sonunda bunu paylaşmakta bir teselli vardı.'),
        s('But Abuela, how did this letter ever get to Cádiz?', 'Ama büyükanne, bu mektup Cádiz’e nasıl geldi?', 'Maya'),
      ],
      questions: [
        q(
          'What did Carmen pull from under her bed?',
          'Carmen yatağının altından ne çekti?',
          ['a carved wooden box', 'a ship model', 'a photo album'],
          0
        ),
        q(
          'What does Annie promise in the letter?',
          'Annie mektupta neye söz veriyor?',
          ['to wait for him on the quay', 'to sail to Spain', 'to forget Diego'],
          0
        ),
        q('What does Maya ask at the end?', 'Maya sonunda ne soruyor?', ['how the letter got to Cádiz', 'where Diego is buried', 'who Annie was'], 0),
      ],
      tip: tip(
        L('however long / whatever / be it … or …', 'however long / whatever / be it … or …'),
        '**However long it takes**, I will wait for you on the quay.',
        L(
          '**whatever / however / wherever / whoever** "ne / nasıl / nereye / kim … olursa olsun" anlamı verir. **be it A or B** ise "ister A ister B olsun" demektir: **Be it** in Bristol **or** in Cádiz.',
          '**whatever / however / wherever / whoever** mean "no matter what / how / where / who". **be it A or B** means "whether it is A or B": **Be it** in Bristol **or** in Cádiz.'
        ),
        [
          ['Be it in Bristol or in Cádiz, we will be together.', "İster Bristol'da ister Cádiz'de olsun, birlikte olacağız."],
          ['Whatever they say, I know you are alive.', 'Ne derlerse desinler, yaşadığını biliyorum.'],
        ],
        [
          'However it takes long, I will wait.',
          'However long it takes, I will wait.',
          '**However**dan hemen sonra sıfat ya da zarf gelir: **However long**.',
          'The adjective or adverb comes straight after **however**: **However long**.',
        ]
      ),
      table: table(
        [
          'Whatever | happens | I will wait',
          'However | long it takes | I will wait',
          'Be it | in Bristol or Cádiz | we will be together',
          'Wherever | you are | I will find you',
          'Whatever | they say | you are alive',
        ],
        'However | long it takes | I will wait',
        1,
        'it takes long',
        'Ne kadar sürerse sürsün bekleyeceğim.'
      ),
      practice: [
        choose('___ long it takes, I will wait.', 'Ne kadar sürerse sürsün bekleyeceğim.', ['However', 'Whatever'], 0),
        choose('Be it in Bristol ___ in Cádiz, we will be together.', "İster Bristol'da ister Cádiz'de olsun, birlikte olacağız.", ['or', 'and'], 0),
        order('The letter was full of longing', 'Mektup özlemle doluydu.'),
        order('I do not believe them', 'Onlara inanmıyorum.'),
      ],
      say: ['However long it takes, I will wait for you.'],
    }),
    reading('c2-u3-s5', {
      number: 12,
      title: L('Fırtına', 'The storm'),
      grammar: L("if'siz varsayım: Had it not been for / Were he to", 'Conditionals without if: Had it not been for / Were he to'),
      minutes: 10,
      recap: L(
        "Carmen ailenin sakladığı son mektubu çıkardı: Annie, Diego'nun yaşadığına inanıyordu.",
        'Carmen brought out the last letter the family had kept: Annie believed that Diego was alive.'
      ),
      words: [
        w('squall', 'ani fırtına, bora'),
        w('gale', 'sert rüzgâr, fırtına'),
        w('mutiny', 'isyan, ayaklanma'),
        w('castaway', 'kazazede'),
        w('salvage', 'kurtarmak (batıktan)'),
      ],
      sentences: [
        s(
          'Carmen took a deep breath and told the story her mother had told her.',
          'Carmen derin bir nefes aldı ve annesinin ona anlattığı hikâyeyi anlattı.'
        ),
        s(
          "In the autumn of 1790, Diego's galleon left Cádiz for Bristol, right through the blockade.",
          "1790 sonbaharında Diego'nun kalyonu, ablukanın tam ortasından geçerek Cádiz'den Bristol'a yola çıktı."
        ),
        s('A sudden squall hit the ship.', 'Ani bir bora gemiye çarptı.'),
        s('By night it had become a full gale.', 'Gece olunca tam bir fırtınaya dönüşmüştü.'),
        s('The frightened sailors turned against their captain.', 'Korkmuş denizciler kaptanlarına karşı ayaklandı.'),
        s('There was a mutiny on deck, and Diego was thrown into the sea.', 'Güvertede bir isyan çıktı ve Diego denize atıldı.'),
        s('The galleon sank before morning, with all its cargo.', 'Kalyon bütün yüküyle birlikte sabah olmadan battı.'),
        s('But Diego held on to a piece of wood all night.', 'Ama Diego bütün gece bir tahta parçasına tutundu.'),
        s('At dawn, a farmer found a castaway on the beach, half dead.', 'Şafakta bir çiftçi kumsalda yarı ölü bir kazazede buldu.'),
        s('He carried him home to his farm near Bristol.', 'Onu Bristol yakınlarındaki çiftliğine, evine taşıdı.'),
        s('The farm with the red barn! We filmed there!', 'Kırmızı ambarlı çiftlik! Orada çekim yaptık!', 'Leo'),
        s('Had it not been for the farmer, Diego would have died.', 'Çiftçi olmasaydı Diego ölürdü.', 'Carmen'),
        s('But in 1790, a Spanish captain in England was an enemy.', "Ama 1790'da İngiltere'deki İspanyol bir kaptan düşman demekti.", 'Carmen'),
        s('Were he to be found, he would be arrested as a spy.', 'Bulunacak olsa casus diye tutuklanırdı.', 'Carmen'),
        s(
          'So the farmer hid him, and in spring a fishing boat took him home to Cádiz.',
          "Bu yüzden çiftçi onu sakladı ve baharda bir balıkçı teknesi onu Cádiz'e, evine götürdü."
        ),
        s(
          'Years later, divers tried to salvage the wreck, but they found nothing.',
          'Yıllar sonra dalgıçlar batığı kurtarmaya çalıştı ama hiçbir şey bulamadı.'
        ),
        s('Say he went back for Annie. What then?', 'Diyelim ki Annie için geri döndü. Sonra ne oldu?', 'Leo'),
        s('He never could. The war closed every door.', 'Hiç dönemedi. Savaş bütün kapıları kapattı.', 'Carmen'),
        s("Annie's last letter reached him, but he never reached her.", "Annie'nin son mektubu ona ulaştı ama o Annie'ye hiç ulaşamadı.", 'Carmen'),
        s('Maya wiped her eyes. They had been so close, and so far apart.', 'Maya gözlerini sildi. Birbirlerine çok yakın ve çok uzaktılar.'),
      ],
      questions: [
        q('What hit the ship near England?', 'İngiltere yakınlarında gemiye ne çarptı?', ['a sudden squall', 'a privateer', 'an iceberg'], 0),
        q('Who found Diego on the beach?', 'Diego’yu kumsalda kim buldu?', ['a farmer', 'Annie', 'a soldier'], 0),
        q(
          'Did Diego ever go back to Annie?',
          'Diego hiç Annie’ye dönebildi mi?',
          ['No, the war closed every door.', 'Yes, the next spring.', 'Yes, after ten years.'],
          0
        ),
      ],
      tip: tip(
        L('Had it not been for / Were he to / Say', 'Had it not been for / Were he to / Say'),
        '**Had it not been for** the farmer, Diego would have died.',
        L(
          'C1’deki "Had I known" yapısını genişletiriz: **Had it not been for** + isim (… olmasaydı), **Were** he **to** be found (bulunacak olsa), günlük dilde **Say / Supposing** (diyelim ki). Hepsinde **if** düşer.',
          'We extend C1’s "Had I known": **Had it not been for** + noun, **Were** he **to** be found, and in everyday speech **Say / Supposing**. In all of them **if** drops.'
        ),
        [
          ['Were he to be found, he would be arrested as a spy.', 'Bulunacak olsa casus diye tutuklanırdı.'],
          ['Say he went back for Annie. What then?', 'Diyelim ki Annie için geri döndü. Sonra ne oldu?'],
        ],
        [
          'Had not it been for the farmer, he would have died.',
          'Had it not been for the farmer, he would have died.',
          'Sıra **Had it not been for**: **it**, **not**tan önce gelir.',
          'The order is **Had it not been for**: **it** comes before **not**.',
        ]
      ),
      table: table(
        [
          'Were the ship | to sink | nobody would know',
          'Had it not been for | the farmer | Diego would have died',
          'Say | the letters are real | what then?',
          'Were he | to be found | he would be arrested',
          'Supposing | he survived | where did he go?',
        ],
        'Had it not been for | the farmer | Diego would have died',
        0,
        'If had not been for',
        'Çiftçi olmasaydı Diego ölürdü.'
      ),
      practice: [
        choose('Had it not ___ for the farmer, he would have died.', 'Çiftçi olmasaydı ölürdü.', ['been', 'be'], 0),
        choose('Were he ___ be found, he would be arrested.', 'Bulunacak olsa tutuklanırdı.', ['to', 'for'], 0),
        order('A sudden squall hit the ship', 'Ani bir bora gemiye çarptı.'),
        order('The galleon sank', 'Kalyon battı.'),
      ],
      say: ['Had it not been for the farmer, Diego would have died.'],
    }),
    scene('c2-u3-s6', L('Mivo ile: Uzak bir akrabayla tanışma', 'With Mivo: Meeting a distant relative'), 'vs-c2-distant-relative'),
  ],
};
