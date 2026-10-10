import json

with open(r'd:/ingilizce/mobile/src/data/measured_dialogue.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Episode metadata
ep_meta = {
    'podcast_a1_ep1_cafe': {
        'title': 'The Morning Cafe',
        'subtitle': 'Coffee, Croissants & Warm Hellos',
        'level': 'A1',
        'levelLabel': 'A1 Başlangıç • Bölüm 1',
        'coverImage': 'podcastCovers.a1Cafe',
        'audioAsset': "require('../../assets/audio/podcast_a1_ep1_cafe.mp3')",
        'description': 'Güneşli bir sabah kafesinde içecek siparişi verme, fiyat sorma, Wi-Fi ve priz isteme diyaloğu.',
        'topicsCovered': ['Sipariş verme (Could I have...)', 'Fiyat sorma (How much is it?)', 'To Be fiili & Selamlaşma'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Liam', 'role': 'Barista (Green Bean Cafe)', 'avatar': 'avatarImages.maleTraveler'},
            {'name': 'Emma', 'role': 'Müşteri / Dil Öğrencisi', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'oat milk', 'meaningTr': 'yulaf sütü', 'example': 'Could I please have a large latte with oat milk?'},
            {'term': 'warm up', 'meaningTr': 'ısıtmak', 'example': 'Would you like me to warm up your croissant?'},
            {'term': 'power outlet', 'meaningTr': 'elektrik prizi', 'example': 'Is there a table near a power outlet?'},
            {'term': 'receipt', 'meaningTr': 'fiş / makbuz', 'example': 'The password is on your receipt.'},
        ]
    },
    'podcast_a1_ep2_routines': {
        'title': 'Morning Alarm & Daily Routines',
        'subtitle': 'Talking About Habits, Hours & Breakfast',
        'level': 'A1',
        'levelLabel': 'A1 Başlangıç • Bölüm 2',
        'coverImage': 'podcastCovers.a1Routines',
        'audioAsset': "require('../../assets/audio/podcast_a1_ep2_routines.mp3')",
        'description': 'Sabah kaçta kalktığını anlatma, kahvaltı tercihleri, işe/okula ulaşım ve günlük saat rutinleri.',
        'topicsCovered': ['Present Simple Zamanı', 'Sıklık Zarfları (always, usually)', 'Saatler & Günlük Aktiviteler'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Sarah', 'role': 'Tasarımcı (Sabah İnsanı)', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'David', 'role': 'Yazılımcı', 'avatar': 'avatarImages.maleEngineer'},
        ],
        'keyVocab': [
            {'term': 'wake up', 'meaningTr': 'uyanmak', 'example': 'What time do you usually wake up?'},
            {'term': 'get out of bed', 'meaningTr': 'yataktan kalkmak', 'example': 'I get out of bed immediately when my alarm rings.'},
            {'term': 'commute', 'meaningTr': 'işe/okula gidip gelmek', 'example': 'How do you commute to your office?'},
            {'term': 'sharp', 'meaningTr': 'tam vaktinde (saat için)', 'example': 'My work starts at nine o’clock sharp.'},
        ]
    },
    'podcast_a1_ep3_city': {
        'title': 'Lost in the City',
        'subtitle': 'Asking for Directions, Streets & The Metro',
        'level': 'A1',
        'levelLabel': 'A1 Başlangıç • Bölüm 3',
        'coverImage': 'podcastCovers.a1City',
        'audioAsset': "require('../../assets/audio/podcast_a1_ep3_city.mp3')",
        'description': 'Şehirde yol sorma, metro istasyonunu ve kütüphaneyi bulma, bilet otomatı kullanma rehberi.',
        'topicsCovered': ['Yer & Yön Tarifleri (turn left, walk straight)', 'Edatlar (next to, across from)', 'There is / There are'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Alex', 'role': 'Gezgin / Öğrenci', 'avatar': 'avatarImages.maleDev'},
            {'name': 'Mia', 'role': 'Şehir Sakini', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'excuse me', 'meaningTr': 'bakar mısınız / affedersiniz', 'example': 'Excuse me, could you help me please?'},
            {'term': 'straight down', 'meaningTr': 'dümdüz boyunca', 'example': 'Walk straight down this main street for two blocks.'},
            {'term': 'across the street', 'meaningTr': 'caddenin karşısında', 'example': 'The library is right across the street from the fountain.'},
            {'term': 'ticket machine', 'meaningTr': 'bilet otomatı', 'example': 'There are automatic ticket machines at the entrance.'},
        ]
    },
    'podcast_a1_ep4_restaurant': {
        'title': 'Dinner at the Bistro',
        'subtitle': 'Ordering Food, Special Requests & The Bill',
        'level': 'A1',
        'levelLabel': 'A1 Başlangıç • Bölüm 4',
        'coverImage': 'podcastCovers.a1Bistro',
        'audioAsset': "require('../../assets/audio/podcast_a1_ep4_restaurant.mp3')",
        'description': 'İtalyan restoranında rezervasyon onaylama, somon ve risotto siparişi verme, hesap isteme.',
        'topicsCovered': ['Yemek Siparişi (I would like...)', 'Nezaket Kalıpları (Could we have...)', 'Restoran Kelimeleri'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Marco', 'role': 'Garson (Bella Vista Bistro)', 'avatar': 'avatarImages.maleTraveler'},
            {'name': 'Chloe', 'role': 'Müşteri', 'avatar': 'avatarImages.femaleEntrepreneur'},
        ],
        'keyVocab': [
            {'term': 'reservation', 'meaningTr': 'rezervasyon', 'example': 'I have a reservation under the name Chloe.'},
            {'term': 'starter', 'meaningTr': 'başlangıç tabağı', 'example': 'For the starter, we would like the tomato bruschetta.'},
            {'term': 'sparkling water', 'meaningTr': 'maden suyu / sodalı su', 'example': 'Could we have a bottle of sparkling water with lemon?'},
            {'term': 'the bill', 'meaningTr': 'hesap / adisyon', 'example': 'Could we please have the bill?'},
        ]
    },
    'podcast_a1_ep5_weekend': {
        'title': 'Weekend Escapes & Memories',
        'subtitle': 'Talking About Yesterday, Sunshine & Nature Picnics',
        'level': 'A1',
        'levelLabel': 'A1 Başlangıç • Bölüm 5',
        'coverImage': 'podcastCovers.a1Picnic',
        'audioAsset': "require('../../assets/audio/podcast_a1_ep5_weekend.mp3')",
        'description': 'Dün neler yaptığını anlatma (Was/Were), hava durumunu konuşma ve hafta sonu park pikniği planlama.',
        'topicsCovered': ['Past Simple (was/were/cooked/walked)', 'Gelecek Planı (want to go / let’s meet)', 'Hava Durumu İfadeleri'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Leo', 'role': 'Doğa Sever', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Sophie', 'role': 'Fotoğrafçı', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'botanical garden', 'meaningTr': 'botanik bahçesi', 'example': 'Yesterday afternoon, I was at the botanical garden.'},
            {'term': 'forecast', 'meaningTr': 'hava tahmini', 'example': 'The weather forecast says twenty-five degrees.'},
            {'term': 'picnic blanket', 'meaningTr': 'piknik örtüsü', 'example': 'I will bring a big picnic blanket and a Frisbee.'},
            {'term': 'looking forward to', 'meaningTr': 'dört gözle beklemek', 'example': 'I am really looking forward to tomorrow!'},
        ]
    },
}

ep_speaker_map = {
    'podcast_a1_ep1_cafe': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-ChristopherNeural': ('Liam', 'Barista (Green Bean)', 'avatarImages.maleTraveler'),
        'en-US-JennyNeural': ('Emma', 'Müşteri', 'avatarImages.femaleDesigner'),
    },
    'podcast_a1_ep2_routines': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-AriaNeural': ('Sarah', 'Tasarımcı', 'avatarImages.femaleLead'),
        'en-US-GuyNeural': ('David', 'Yazılımcı', 'avatarImages.maleEngineer'),
    },
    'podcast_a1_ep3_city': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-EricNeural': ('Alex', 'Gezgin', 'avatarImages.maleDev'),
        'en-US-JennyNeural': ('Mia', 'Şehir Sakini', 'avatarImages.femaleDesigner'),
    },
    'podcast_a1_ep4_restaurant': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-ChristopherNeural': ('Marco', 'Garson (Bistro)', 'avatarImages.maleTraveler'),
        'en-US-MichelleNeural': ('Chloe', 'Müşteri', 'avatarImages.femaleEntrepreneur'),
    },
    'podcast_a1_ep5_weekend': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-BrianNeural': ('Leo', 'Doğa Sever', 'avatarImages.maleEngineer'),
        'en-US-EmmaNeural': ('Sophie', 'Fotoğrafçı', 'avatarImages.femaleDesigner'),
    }
}

tr_dict = {
    # Ep 1
    'Welcome to Spekiva English Podcasts for A1 Beginners. Episode 1: The Morning Cafe. Listen carefully and practice ordering drinks and food.': 'A1 Başlangıç seviyesi Spekiva İngilizce Podcastlerine hoş geldiniz. Bölüm 1: Sabah Kafesi. Dikkatle dinleyin ve içecek/yiyecek siparişi pratiği yapın.',
    'Good morning! Welcome to Green Bean Cafe. How are you doing today?': 'Günaydın! Green Bean Kafeye hoş geldiniz. Bugün nasılsınız?',
    'Good morning! I am doing well, thank you. It is a lovely sunny day.': 'Günaydın! İyiyim, teşekkür ederim. Çok güzel güneşli bir gün.',
    'It really is! What can I get started for you this morning?': 'Gerçekten öyle! Bu sabah sizin için ne hazırlayabilirim?',
    'Hmm, let me see. Could I please have a large latte with oat milk?': 'Hmm, bakayım. Yulaf sütlü büyük boy bir latte alabilir miyim lütfen?',
    'Of course! A large oat milk latte. Would you like that hot or iced?': 'Tabii ki! Büyük boy yulaf sütlü latte. Sıcak mı buzlu mu istersiniz?',
    'Hot, please. And do you have any fresh bakery items today?': 'Sıcak lütfen. Ve bugün taze fırın ürünleriniz var mı?',
    'Yes, we just baked butter croissants, chocolate muffins, and blueberry scones about ten minutes ago.': 'Evet, yaklaşık on dakika önce tereyağlı kruvasan, çikolatalı muffin ve yaban mersinli çörek pişirdik.',
    'Oh, the butter croissant smells wonderful! I will take one croissant, please.': 'Oh, tereyağlı kruvasan harika kokuyor! Bir kruvasan alayım lütfen.',
    'Excellent choice. Would you like me to warm it up for you?': 'Mükemmel seçim. Sizin için ısıtmamı ister misiniz?',
    'Yes, please. That would be lovely. How much is the total?': 'Evet lütfen, çok güzel olur. Toplam ne kadar?',
    'That comes to seven dollars and fifty cents. Are you paying with cash or card?': 'Yedi dolar elli sent tutuyor. Nakit mi kartla mı ödeyeceksiniz?',
    'I will pay with credit card, please. Here is my card.': 'Kredi kartıyla ödeyeceğim lütfen. İşte kartım.',
    'Thank you. You can just tap it right on the screen... Perfect, it went through!': 'Teşekkürler. Ekrana dokundurabilirsiniz... Harika, geçti!',
    'Great! Do you have free Wi-Fi here? I need to do a little bit of study on my laptop.': 'Harika! Burada ücretsiz Wi-Fi var mı? Laptopumda biraz ders çalışmam gerekiyor.',
    'Yes, we do! The network name is Green Bean Guest, and the password is printed at the bottom of your receipt.': 'Evet var! Ağ adı Green Bean Guest, şifre ise fişinizin en altında yazıyor.',
    'That is very helpful. Is there a table near a power outlet?': 'Çok yardımcı oldunuz. Prizin yakınında bir masa var mı?',
    'Yes, the corner table by the window has two power sockets. It is very quiet and comfortable over there.': 'Evet, pencere kenarındaki köşe masada iki priz var. Orası çok sakin ve rahattır.',
    'Thank you so much! You are very kind.': 'Çok teşekkür ederim! Çok naziksiniz.',
    'You are very welcome! Here is your hot oat latte and your warm croissant. Enjoy your breakfast and have a productive study session!': 'Rica ederim! İşte sıcak yulaf latteniz ve ılık kruvasanınız. Afiyet olsun ve verimli bir çalışma dilerim!',
    'Thank you Liam! Have a fantastic day, see you next time!': 'Teşekkürler Liam! Harika bir gün geçir, bir dahaki sefere görüşürüz!',
    'See you tomorrow, Emma! Take care!': 'Yarın görüşürüz Emma! Kendine iyi bak!',
    'You have finished Episode 1. Great job on practicing cafe English!': '1. Bölümü tamamladınız. Kafe İngilizcesi pratiğinde harika iş çıkardınız!',

    # Ep 2
    'Welcome to Episode 2: Morning Alarm and Daily Routines. Learn how to describe your everyday schedule, tell the time, and discuss morning habits.': 'Bölüm 2\'ye hoş geldiniz: Sabah Alarmı ve Günlük Rutinler. Günlük programınızı anlatmayı, saatleri söylemeyi ve sabah alışkanlıklarını konuşmayı öğrenin.',
    'Good morning, David! You look very energetic today. What time do you usually wake up?': 'Günaydın David! Bugün çok enerjik görünüyorsun. Genelde saat kaçta uyanırsın?',
    'Good morning, Sarah! I always wake up at six thirty in the morning. My alarm rings, and I get out of bed immediately.': 'Günaydın Sarah! Sabahları her zaman altı buçukta uyanırım. Alarmım çalar ve hemen yataktan kalkarım.',
    'Six thirty? That is quite early! What is the first thing you do after waking up?': 'Altı buçuk mu? Oldukça erkenmiş! Uyandıktan sonra yaptığın ilk şey nedir?',
    'First, I drink a large glass of warm water. Then, I brush my teeth, take a quick shower, and put on my clothes.': 'İlk olarak büyük bir bardak ılık su içerim. Sonra dişlerimi fırçalar, hızlı bir duş alır ve giyinirim.',
    'Do you usually eat breakfast at home or on the way to work?': 'Kahvaltıyı genellikle evde mi yaparsın yoksa işe giderken mi?',
    'I always eat breakfast at home. I make scrambled eggs, whole wheat toast, and a cup of black coffee. What about you, Sarah? What is your morning routine?': 'Kahvaltıyı hep evde yaparım. Çırpılmış yumurta, tam buğday tostu ve bir fincan sade kahve yaparım. Ya sen Sarah? Senin sabah rutinin nasıl?',
    'My routine is a little different. I wake up at seven fifteen. I do ten minutes of morning yoga and meditation. After that, I eat a bowl of oatmeal with fresh strawberries and honey.': 'Benim rutinim biraz farklı. Yedi on beşte uyanırım. On dakika sabah yogası ve meditasyon yaparım. Ardından taze çilekli ve ballı bir kase yulaf ezmesi yerim.',
    'Yoga in the morning sounds very peaceful! How do you travel to your office?': 'Sabah yogası kulağa çok huzurlu geliyor! Ofisine nasıl gidiyorsun?',
    'I usually take the subway. The station is only five minutes from my apartment, and the train ride takes about twenty minutes. How do you commute?': 'Genelde metroya binerim. İstasyon dairemden sadece beş dakika uzaklıkta ve tren yolculuğu yaklaşık yirmi dakika sürüyor. Sen nasıl gidiyorsun?',
    'When the weather is sunny, I ride my bicycle. When it rains, I take the bus. Cycling gives me fresh air and good exercise before work.': 'Hava güneşli olduğunda bisikletime binerim. Yağmur yağdığında otobüse binerim. Bisiklet sürmek bana işten önce temiz hava ve iyi bir egzersiz sağlıyor.',
    'Riding a bicycle to work is fantastic. What time does your workday start?': 'İşe bisikletle gitmek harika. İş günün saat kaçta başlıyor?',
    'My work starts at nine o\'clock sharp and finishes at five thirty in the evening. In the evening, I cook dinner and read a book.': 'İşim tam dokuzda başlar ve akşam beş buçukta biter. Akşamları yemek pişirir ve kitap okurum.',
    'That sounds like a very healthy and balanced daily routine, David!': 'Kulağa çok sağlıklı ve dengeli bir günlük rutin gibi geliyor David!',
    'Thank you, Sarah! Consistency is key to a happy day.': 'Teşekkürler Sarah! İstikrar, mutlu bir günün anahtarıdır.',
    'Episode 2 is complete. Notice the adverbs of frequency: always, usually, and sometimes.': 'Bölüm 2 tamamlandı. Sıklık zarflarına dikkat edin: always (her zaman), usually (genellikle) ve sometimes (bazen).',

    # Ep 3
    'Welcome to Episode 3: Lost in the City. Learn how to politely stop someone on the street, ask for directions, and find landmarks.': 'Bölüm 3\'e hoş geldiniz: Şehirde Kaybolmak. Sokakta birini kibarca durdurmayı, yol tarifi sormayı ve önemli binaları bulmayı öğrenin.',
    'Excuse me, hello! I am sorry to bother you, but I am a little lost. Could you help me, please?': 'Affedersiniz, merhaba! Rahatsız ettiğim için özür dilerim ama biraz kayboldum. Lütfen bana yardım edebilir misiniz?',
    'Hello! Sure, no problem at all. Where are you trying to go?': 'Merhaba! Tabii ki hiç sorun değil. Nereye gitmeye çalışıyorsunuz?',
    'I am looking for the Central Metro Station. Is it far from here?': 'Merkez Metro İstasyonunu arıyorum. Buradan uzak mı?',
    'No, it is not far at all. It is only about a seven-minute walk from here.': 'Hayır, hiç uzak değil. Buradan sadece yaklaşık yedi dakikalık bir yürüyüş mesafesinde.',
    'That is great news! How do I get there from this corner?': 'Harika bir haber! Bu köşeden oraya nasıl gidebilirim?',
    'Walk straight down this main street for two blocks. When you see a big blue pharmacy on your right, turn left onto Grand Avenue.': 'Bu ana cadde boyunca iki blok düz yürüyün. Sağınızda büyük mavi bir eczane gördüğünüzde, Grand Caddesine sola dönün.',
    'Okay, walk straight for two blocks, then turn left at the blue pharmacy. Got it!': 'Tamam, iki blok düz yürü, sonra mavi eczaneden sola dön. Anladım!',
    'Exactly. After you turn left, walk past the city park. The metro station entrance is right opposite the public library. You will see a large yellow M sign.': 'Aynen öyle. Sola döndükten sonra şehir parkını geçin. Metro girişi halk kütüphanesinin tam karşısındadır. Büyük sarı bir M tabelası göreceksiniz.',
    'Is the library next to the park?': 'Kütüphane parkın yanında mı?',
    'Yes, the library is right across the street from the park fountain. You cannot miss it.': 'Evet, kütüphane park fıskiyesinin tam karşısında. Kaçırmanız imkansız.',
    'Also, is there a ticket machine inside the station, or do I need to buy a card beforehand?': 'Ayrıca, istasyonun içinde bilet makinesi var mı yoksa önceden kart almam gerekir mi?',
    'There are automatic ticket machines right at the entrance. They accept both credit cards and cash, and there is an English language option on the screen.': 'Tam girişte otomatik bilet makineleri var. Hem kredi kartı hem de nakit kabul ediyorlar ve ekranda İngilizce dil seçeneği de var.',
    'Thank you so much! You saved my day.': 'Çok teşekkür ederim! Günümü kurtardınız.',
    'You are very welcome! Have a wonderful time exploring our city!': 'Rica ederim! Şehrimizi keşfederken harika vakit geçirin!',
    'Thank you! Have a great afternoon!': 'Teşekkürler! İyi günler dilerim!',
    'Episode 3 is complete. Remember these key direction phrases: walk straight, turn left, and across the street.': 'Bölüm 3 tamamlandı. Bu anahtar yön ifadelerini unutmayın: walk straight (düz yürü), turn left (sola dön) ve across the street (caddenin karşısında).',

    # Ep 4
    'Welcome to Episode 4: Dinner at the Bistro. Practice ordering meals, asking about ingredients, and requesting the bill in English.': 'Bölüm 4\'e hoş geldiniz: Bistro\'da Akşam Yemeği. İngilizce yemek siparişi verme, malzemeleri sorma ve hesabı isteme pratiği yapın.',
    'Good evening! Welcome to Bella Vista Bistro. Do you have a reservation tonight?': 'İyi akşamlar! Bella Vista Bistro\'ya hoş geldiniz. Bu akşam rezervasyonunuz var mı?',
    'Good evening! Yes, I have a reservation under the name Chloe for two people at seven thirty.': 'İyi akşamlar! Evet, saat yedi buçukta iki kişilik Chloe adına bir rezervasyonum var.',
    'Ah yes, right this way Chloe. I have a lovely quiet table for you next to the garden terrace.': 'Ah evet, buradan buyrun Chloe. Sizin için bahçe terasının yanında çok güzel sakin bir masam var.',
    'This table is wonderful, thank you so much.': 'Bu masa harika, çok teşekkür ederim.',
    'Here are your menus. Can I start you off with something to drink while you look over the food?': 'İşte menüleriniz. Yemeklere bakarken içecek bir şeyle başlatabilir miyim?',
    'Yes, please. Could we have a bottle of sparkling mineral water with lemon slices?': 'Evet lütfen. Limon dilimleriyle birlikte bir şişe maden suyu alabilir miyiz?',
    'Certainly, sparkling water with lemon. I will be right back with your drinks.': 'Elbette, limonlu maden suyu. Hemen içeceklerinizle dönüyorum.',
    'Here is your chilled water. Are you ready to order your main courses, or do you need a few more minutes?': 'İşte soğuk suyunuz. Ana yemekleri sipariş etmeye hazır mısınız yoksa birkaç dakikaya daha mı ihtiyacınız var?',
    'We are ready to order! For the starter, we would like the tomato bruschetta with olive oil.': 'Sipariş vermeye hazırız! Başlangıç olarak zeytinyağlı domatesli bruschetta istiyoruz.',
    'Excellent. And for your main courses?': 'Harika. Peki ana yemekleriniz için ne alırdınız?',
    'I would like the grilled salmon with roasted potatoes and steamed asparagus. Does the salmon come with garlic sauce?': 'Fırın patates ve buharda pişmiş kuşkonmazlı ızgara somon istiyorum. Somon sarımsaklı sosla mı geliyor?',
    'Yes, it comes with a light lemon garlic sauce on the side.': 'Evet, yanında hafif limonlu sarımsak sosuyla geliyor.',
    'That sounds delicious! And my friend would like the vegetarian mushroom risotto.': 'Kulağa çok lezzetli geliyor! Arkadaşım da vejetaryen mantarlı risotto istiyor.',
    'Perfect! One grilled salmon and one mushroom risotto. I will place your order with the chef right away.': 'Mükemmel! Bir ızgara somon ve bir mantarlı risotto. Siparişinizi hemen şefe iletiyorum.',
    'Thank you very much!': 'Çok teşekkür ederim!',
    'How was everything tonight? Did you enjoy your dinner?': 'Bu akşam her şey nasıldı? Akşam yemeğinizden memnun kaldınız mı?',
    'The food was absolutely delicious! Could we please have the bill?': 'Yemek kesinlikle lezzetliydi! Hesabı alabilir miyiz lütfen?',
    'Of course, here is the bill whenever you are ready. Thank you for dining with us tonight!': 'Elbette, hazır olduğunuzda işte hesap. Bu akşam bizimle yemek yediğiniz için teşekkür ederiz!',
    'Thank you Marco! Have a wonderful evening!': 'Teşekkürler Marco! İyi akşamlar dilerim!',
    'Episode 4 is complete. You now know how to order food with confidence!': 'Bölüm 4 tamamlandı. Artık özgüvenle yemek siparişi verebilirsiniz!',

    # Ep 5
    'Welcome to Episode 5: Weekend Escapes and Past Memories. Practice talking about what you did yesterday using past tense was, were, and simple past verbs.': 'Bölüm 5\'e hoş geldiniz: Hafta Sonu Kaçamakları ve Geçmiş Anılar. Geçmiş zaman was, were ve geçmiş zaman fiillerini kullanarak dün ne yaptığınızı konuşma pratiği yapın.',
    'Hey Sophie! Happy Friday! How was your week?': 'Selam Sophie! İyi cumalar! Haftan nasıl geçti?',
    'Hey Leo! My week was quite busy, but yesterday was very relaxing. Where were you yesterday afternoon?': 'Selam Leo! Haftam oldukça yoğundu ama dün çok dinlendiriciydi. Dün öğleden sonra neredeydin?',
    'Yesterday afternoon, I was at the botanical garden. The weather was warm and sunny, so I walked around the rose garden for two hours.': 'Dün öğleden sonra botanik bahçesindeydim. Hava ılık ve güneşliydi, bu yüzden iki saat gül bahçesinde yürüdüm.',
    'That sounds so peaceful! Did you take any photos?': 'Kulağa çok huzurlu geliyor! Hiç fotoğraf çektin mi?',
    'Yes, I took many photos of the flowers and the lake. What did you do yesterday evening?': 'Evet, çiçeklerin ve gölün bir sürü fotoğrafını çektim. Sen dün akşam ne yaptın?',
    'Yesterday evening, I stayed home. I cooked vegetable soup, watched a comedy movie on TV, and listened to relaxing music.': 'Dün akşam evde kaldım. Sebze çorbası pişirdim, televizyonda bir komedi filmi izledim ve rahatlatıcı müzik dinledim.',
    'That sounds cozy! Do you have any plans for this coming weekend?': 'Kulağa çok samimi geliyor! Bu hafta sonu için bir planın var mı?',
    'Tomorrow, on Saturday, I want to go for a picnic in the Central Park. The weather forecast says it will be twenty-five degrees with no rain.': 'Yarın, cumartesi günü Merkez Parkta piknik yapmak istiyorum. Hava durumu yağmursuz yirmi beş derece olacağını söylüyor.',
    'A picnic in the park is a great idea! Would you like some company? I can bring fresh fruit, cheese, and lemonade.': 'Parkta piknik harika bir fikir! Eşlik etmemi ister misin? Taze meyve, peynir ve limonata getirebilirim.',
    'I would love that! I will prepare homemade turkey sandwiches and bake some chocolate chip cookies tonight.': 'Çok isterim! Ben de ev yapımı hindili sandviçler hazırlarım ve bu akşam damla çikolatalı kurabiye pişiririm.',
    'Yum! Homemade cookies! What time should we meet at the park entrance?': 'Nefis! Ev yapımı kurabiyeler! Park girişinde saat kaçta buluşalım?',
    'Let\'s meet at eleven o\'clock near the big oak tree by the pond.': 'Saat on birde göletin yanındaki büyük meşe ağacının yakınında buluşalım.',
    'Eleven o\'clock sounds perfect. I will bring a big picnic blanket and a Frisbee to play after lunch.': 'Saat on bir mükemmel. Büyük bir piknik örtüsü ve öğle yemeğinden sonra oynamak için frizbi getireceğim.',
    'Awesome! I am really looking forward to tomorrow, Leo. See you at eleven!': 'Süper! Yarını gerçekten dört gözle bekliyorum Leo. On birde görüşürüz!',
    'See you tomorrow morning Sophie! Have a great Friday evening!': 'Yarın sabah görüşürüz Sophie! Harika bir cuma akşamı geçir!',
    'Congratulations! You have completed all 5 A1 Beginner Masterclass episodes. Keep listening and repeating to master conversational English!': 'Tebrikler! 5 A1 Başlangıç Masterclass bölümünün tamamını bitirdiniz. Konuşma İngilizcesinde ustalaşmak için dinlemeye ve tekrar etmeye devam edin!'
}

# Generate podcastData.ts code
ts_lines = [
    "import type { ImageSourcePropType } from 'react-native';",
    "import { podcastCovers, avatarImages } from '../assets/images';",
    "",
    "export interface PodcastDialogueTurn {",
    "  id: string;",
    "  speaker: string;",
    "  speakerRole: string;",
    "  avatar: ImageSourcePropType;",
    "  textEn: string;",
    "  textTr: string;",
    "  timeSec: number;",
    "}",
    "",
    "export interface PodcastEpisode {",
    "  id: string;",
    "  title: string;",
    "  subtitle: string;",
    "  level: 'A1' | 'A2' | 'B1' | 'B2';",
    "  levelLabel: string;",
    "  durationLabel: string;",
    "  durationSec: number;",
    "  coverImage: ImageSourcePropType;",
    "  audioAsset: any;",
    "  description: string;",
    "  topicsCovered: string[];",
    "  speakers: { name: string; role: string; avatar: ImageSourcePropType }[];",
    "  keyVocab: { term: string; meaningTr: string; example: string }[];",
    "  dialogue: PodcastDialogueTurn[];",
    "}",
    "",
    "export const PODCAST_EPISODES: PodcastEpisode[] = ["
]

for ep_id, meta in ep_meta.items():
    seg_list = data[ep_id]
    total_sec = int(round(data[ep_id + '_total']))
    mins = total_sec // 60
    secs = total_sec % 60
    dur_label = f"{mins}:{secs:02d} Dk"
    
    ts_lines.append("  {")
    ts_lines.append(f"    id: '{ep_id}',")
    ts_lines.append(f"    title: '{meta['title']}',")
    ts_lines.append(f"    subtitle: '{meta['subtitle']}',")
    ts_lines.append(f"    level: '{meta['level']}',")
    ts_lines.append(f"    levelLabel: '{meta['levelLabel']}',")
    ts_lines.append(f"    durationLabel: '{dur_label}',")
    ts_lines.append(f"    durationSec: {total_sec},")
    ts_lines.append(f"    coverImage: {meta['coverImage']},")
    ts_lines.append(f"    audioAsset: {meta['audioAsset']},")
    ts_lines.append(f"    description: '{meta['description']}',")
    ts_lines.append(f"    topicsCovered: {json.dumps(meta['topicsCovered'], ensure_ascii=False)},")
    
    # speakers
    ts_lines.append("    speakers: [")
    for sp in meta['speakers']:
        ts_lines.append(f"      {{ name: '{sp['name']}', role: '{sp['role']}', avatar: {sp['avatar']} }},")
    ts_lines.append("    ],")
    
    # keyVocab
    ts_lines.append("    keyVocab: [")
    for kv in meta['keyVocab']:
        ts_lines.append(f"      {{ term: '{kv['term']}', meaningTr: '{kv['meaningTr']}', example: '{kv['example']}' }},")
    ts_lines.append("    ],")
    
    # dialogue
    ts_lines.append("    dialogue: [")
    for seg in seg_list:
        v = seg['voice']
        sp_info = ep_speaker_map[ep_id].get(v, ('Konuşmacı', 'Karakter', 'avatarImages.femaleDesigner'))
        text_en = seg['text'].replace("'", "\\'")
        text_tr = tr_dict.get(seg['text'], seg['text']).replace("'", "\\'")
        start_sec = int(round(seg['startSec']))
        
        ts_lines.append("      {")
        ts_lines.append(f"        id: '{seg['index']}',")
        ts_lines.append(f"        speaker: '{sp_info[0]}',")
        ts_lines.append(f"        speakerRole: '{sp_info[1]}',")
        ts_lines.append(f"        avatar: {sp_info[2]},")
        ts_lines.append(f"        textEn: '{text_en}',")
        ts_lines.append(f"        textTr: '{text_tr}',")
        ts_lines.append(f"        timeSec: {start_sec},")
        ts_lines.append("      },")
    ts_lines.append("    ],")
    ts_lines.append("  },")

ts_lines.append("];")

with open(r'd:/ingilizce/mobile/src/data/podcastData.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines) + '\n')

print('Generated podcastData.ts with ALL turns and EXACT durations successfully!')
