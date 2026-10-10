import json

with open(r'd:/ingilizce/mobile/src/data/measured_dialogue.json', 'r', encoding='utf-8') as f:
    a1_data = json.load(f)

with open(r'd:/ingilizce/mobile/src/data/measured_a2_dialogue.json', 'r', encoding='utf-8') as f:
    a2_data = json.load(f)

with open(r'd:/ingilizce/mobile/src/data/measured_b1_dialogue.json', 'r', encoding='utf-8') as f:
    b1_data = json.load(f)

# All Episode metadata: 5 A1 + 5 A2 + 5 B1 = 15 Total Episodes
ep_meta = {
    # --- A1 (1 to 5) ---
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

    # --- A2 (1 to 5) ---
    'podcast_a2_ep1_airport': {
        'title': 'Boarding Pass & Departure Gate',
        'subtitle': 'Airport Check-in, Luggage & Security',
        'level': 'A2',
        'levelLabel': 'A2 Temel • Bölüm 1',
        'coverImage': 'podcastCovers.a2Airport',
        'audioAsset': "require('../../assets/audio/podcast_a2_ep1_airport.mp3')",
        'description': 'Havaalanında check-in yapma, bagaj teslimi, pencere kenarı koltuk isteme ve biniş kapısını bulma rehberi.',
        'topicsCovered': ['Havaalanı İfadeleri (boarding pass, baggage allowance)', 'Rica Cümleleri (Would it be possible...)', 'Yön & Kapı Bulma'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Daniel', 'role': 'Hava Yolu Görevlisi (SkyWay)', 'avatar': 'avatarImages.maleTraveler'},
            {'name': 'Rachel', 'role': 'Yolcu', 'avatar': 'avatarImages.femaleLead'},
        ],
        'keyVocab': [
            {'term': 'boarding pass', 'meaningTr': 'uçuş biniş kartı', 'example': 'Here is your passport and boarding pass.'},
            {'term': 'baggage allowance', 'meaningTr': 'bagaj hakkı', 'example': 'Twenty-one kilograms is well within your baggage allowance.'},
            {'term': 'carry-on bag', 'meaningTr': 'kabin/el bagajı', 'example': 'I will take this backpack as my carry-on bag.'},
            {'term': 'window seat', 'meaningTr': 'pencere kenarı koltuk', 'example': 'Would it be possible to get a window seat, please?'},
        ]
    },
    'podcast_a2_ep2_hotel': {
        'title': 'Hotel Check-in & Special Requests',
        'subtitle': 'Checking In, Room Amenities & Breakfast',
        'level': 'A2',
        'levelLabel': 'A2 Temel • Bölüm 2',
        'coverImage': 'podcastCovers.a2Hotel',
        'audioAsset': "require('../../assets/audio/podcast_a2_ep2_hotel.mp3')",
        'description': 'Otel giriş işlemleri, açık büfe kahvaltı saatleri, oda anahtar kartı ve ekstra yastık talebi.',
        'topicsCovered': ['Otel Hizmetleri (buffet breakfast, housekeeping)', 'Nezaket Kipleri (Could you please tell me...)', 'Oda Özellikleri'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'James', 'role': 'Resepsiyonist (Grand Harbor)', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Clara', 'role': 'Otel Misafiri', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'reservation', 'meaningTr': 'rezervasyon', 'example': 'I have a reservation for three nights under Clara Evans.'},
            {'term': 'complimentary', 'meaningTr': 'ücretsiz / ikram', 'example': 'Our complimentary buffet breakfast is served on the terrace.'},
            {'term': 'key card', 'meaningTr': 'elektronik oda kartı', 'example': 'Here are your electronic key cards.'},
            {'term': 'housekeeping', 'meaningTr': 'kat hizmetleri / oda servisi', 'example': 'I will notify housekeeping to bring extra pillows.'},
        ]
    },
    'podcast_a2_ep3_shopping': {
        'title': 'Shopping Spree & Fitting Rooms',
        'subtitle': 'Sizes, Colors, Discounts & Returns',
        'level': 'A2',
        'levelLabel': 'A2 Temel • Bölüm 3',
        'coverImage': 'podcastCovers.a2Shopping',
        'audioAsset': "require('../../assets/audio/podcast_a2_ep3_shopping.mp3')",
        'description': 'Mağazada beden sorma, deneme kabininde kıyafet deneme, hafta sonu indirimi ve iade koşullarını öğrenme.',
        'topicsCovered': ['Alışveriş Kalıpları (looking for, in stock)', 'İndirim & Fiyat (twenty percent off)', 'İade Koşulları (return policy, receipt)'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Lucas', 'role': 'Mağaza Danışmanı (Urban Style)', 'avatar': 'avatarImages.maleDev'},
            {'name': 'Nora', 'role': 'Müşteri', 'avatar': 'avatarImages.femaleEntrepreneur'},
        ],
        'keyVocab': [
            {'term': 'fitting room', 'meaningTr': 'deneme kabini', 'example': 'Where are the fitting rooms so I can try it on?'},
            {'term': 'in stock', 'meaningTr': 'stokta / mağazada mevcut', 'example': 'Do you have any medium sweaters in stock in the back room?'},
            {'term': 'on sale', 'meaningTr': 'indirimde / satışta', 'example': 'Is this knitwear item currently on sale?'},
            {'term': 'return policy', 'meaningTr': 'iade politikası', 'example': 'You can return any unworn item with the receipt within thirty days.'},
        ]
    },
    'podcast_a2_ep4_doctor': {
        'title': "A Doctor's Visit & Symptoms",
        'subtitle': 'Describing Illness, Prescriptions & Advice',
        'level': 'A2',
        'levelLabel': 'A2 Temel • Bölüm 4',
        'coverImage': 'podcastCovers.a2Doctor',
        'audioAsset': "require('../../assets/audio/podcast_a2_ep4_doctor.mp3')",
        'description': 'Doktora boğaz ağrısı ve halsizlik şikayetini anlatma, muayene olma, reçete ve ilaç kullanım talimatları.',
        'topicsCovered': ['Hastalık Belirtileri (sore throat, persistent cough, fever)', 'Doktor Tavsiyeleri (You should rest, avoid cold drinks)', 'İlaç Kullanımı (after meals, every eight hours)'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Dr. Harrison', 'role': 'Genel Cerrah / Aile Hekimi', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Lily', 'role': 'Hasta', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'sore throat', 'meaningTr': 'boğaz ağrısı', 'example': 'I have a sore throat and a persistent dry cough.'},
            {'term': 'prescription', 'meaningTr': 'reçete', 'example': 'I will write you a prescription for a soothing throat spray.'},
            {'term': 'painkiller', 'meaningTr': 'ağrı kesici', 'example': 'Take one painkiller tablet every eight hours after meals.'},
            {'term': 'recover', 'meaningTr': 'iyileşmek / toparlanmak', 'example': 'You should get plenty of rest to recover faster.'},
        ]
    },
    'podcast_a2_ep5_cinema': {
        'title': 'Cinema Night & Weekend Plans',
        'subtitle': 'Movie Reviews, Opinions & Booking Tickets',
        'level': 'A2',
        'levelLabel': 'A2 Temel • Bölüm 5',
        'coverImage': 'podcastCovers.a2Cinema',
        'audioAsset': "require('../../assets/audio/podcast_a2_ep5_cinema.mp3')",
        'description': 'Sinemaya gitme planı, bilim kurgu filmi değerlendirmesi, online VIP koltuk seçimi ve seans saati belirleme.',
        'topicsCovered': ['Superlatives (the most breathtaking, the best)', 'Film Değerlendirmesi (visual effects, soundtrack, acting)', 'Bilet Alma & Kararlaştırma'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Mark', 'role': 'Film Meraklısı', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Zoe', 'role': 'Sinema Sever', 'avatar': 'avatarImages.femaleLead'},
        ],
        'keyVocab': [
            {'term': 'sci-fi', 'meaningTr': 'bilim kurgu', 'example': 'There is a brand new sci-fi adventure movie showing tonight.'},
            {'term': 'breathtaking', 'meaningTr': 'nefes kesici', 'example': 'It has the most breathtaking visual effects.'},
            {'term': 'screening', 'meaningTr': 'film seansı / gösterim', 'example': 'There is a screening at seven fifteen and another at nine thirty.'},
            {'term': 'recliner seats', 'meaningTr': 'yatırılabilir konforlu koltuklar', 'example': 'VIP recliner seats are much more comfortable than standard seats.'},
        ]
    },

    # --- B1 (1 to 5) ---
    'podcast_b1_ep1_interview': {
        'title': 'The Job Interview & Career Growth',
        'subtitle': 'Strengths, Overcoming Challenges & Leadership',
        'level': 'B1',
        'levelLabel': 'B1 Orta • Bölüm 1',
        'coverImage': 'podcastCovers.b1Interview',
        'audioAsset': "require('../../assets/audio/podcast_b1_ep1_interview.mp3')",
        'description': 'Profesyonel iş mülakatı, proje yönetimi, zorlu teslim tarihlerinde kriz çözme ve gelecek kariyer vizyonu.',
        'topicsCovered': ['İş Görüşmesi İfadeleri (data-driven, adaptability)', 'Present Perfect Continuous (I have been working...)', 'Davranışsal Soruları Yanıtlama'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Victoria', 'role': 'İK Direktörü (TechCorp)', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Alex', 'role': 'Pazarlama Uzmanı (Aday)', 'avatar': 'avatarImages.maleDev'},
        ],
        'keyVocab': [
            {'term': 'adaptability', 'meaningTr': 'uyum sağlama yeteneği', 'example': 'That shows great adaptability and leadership.'},
            {'term': 'data-driven', 'meaningTr': 'veriye dayalı', 'example': 'My strongest asset is data-driven problem solving.'},
            {'term': 'tight deadlines', 'meaningTr': 'sıkışık / acil teslim tarihleri', 'example': 'How do you usually handle tight deadlines?'},
            {'term': 'retention', 'meaningTr': 'müşteri bağlılığı / elde tutma', 'example': 'I turn insights into strategies that improve customer retention.'},
        ]
    },
    'podcast_b1_ep2_apartment': {
        'title': 'Apartment Hunting & Leases',
        'subtitle': 'Rental Agreements, Amenities & Neighborhoods',
        'level': 'B1',
        'levelLabel': 'B1 Orta • Bölüm 2',
        'coverImage': 'podcastCovers.b1Apartment',
        'audioAsset': "require('../../assets/audio/podcast_b1_ep2_apartment.mp3')",
        'description': 'Kiralık daire gezme, sözleşme maddeleri, depozito, aidat/faturalar ve evcil hayvan politikasını müzakere etme.',
        'topicsCovered': ['Kira Sözleşmesi (lease agreement, security deposit)', 'Ev Olanakları (double-glazed, open-plan kitchen)', 'Ulaşım Kolaylığı'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Ryan', 'role': 'Emlak Danışmanı (Riverside)', 'avatar': 'avatarImages.maleTraveler'},
            {'name': 'Laura', 'role': 'Kiracı Adayı', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'lease agreement', 'meaningTr': 'kira sözleşmesi', 'example': 'We require one month rent as a security deposit upon signing the agreement.'},
            {'term': 'security deposit', 'meaningTr': 'güvence bedeli / depozito', 'example': 'The deposit is fully refundable at the end of the tenancy.'},
            {'term': 'refurbished', 'meaningTr': 'yenilenmiş / restore edilmiş', 'example': 'The owners refurbished the entire kitchen last month.'},
            {'term': 'energy efficiency', 'meaningTr': 'enerji tasarrufu / verimliliği', 'example': 'Double-glazed windows are great for energy efficiency.'},
        ]
    },
    'podcast_b1_ep3_luggage': {
        'title': 'Delayed Flights & Lost Luggage',
        'subtitle': 'Filing Airline Claims, Rights & Compensation',
        'level': 'B1',
        'levelLabel': 'B1 Orta • Bölüm 3',
        'coverImage': 'podcastCovers.b1Luggage',
        'audioAsset': "require('../../assets/audio/podcast_b1_ep3_luggage.mp3')",
        'description': 'Kayıp bagaj bildirimi, havayolu tazminat hakkı, acil harcama bütçesi ve kurye teslimat takibi.',
        'topicsCovered': ['Kayıp & Hasar Bildirimi (Property Irregularity Report)', 'Tazminat & Haklar (reimburse emergency expenses)', 'Kurye Takibi'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Kevin', 'role': 'Müşteri Hizmetleri Yetkilisi', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Natalie', 'role': 'Yolcu', 'avatar': 'avatarImages.femaleEntrepreneur'},
        ],
        'keyVocab': [
            {'term': 'baggage carousel', 'meaningTr': 'bagaj teslim bandı', 'example': 'My checked suitcase did not appear on baggage carousel number three.'},
            {'term': 'reimburse', 'meaningTr': 'masrafı geri ödemek / telafi etmek', 'example': 'Please keep all original receipts so we can reimburse you.'},
            {'term': 'emergency allowance', 'meaningTr': 'acil durum harcama ödeneği', 'example': 'We provide an emergency allowance of up to one hundred and fifty dollars.'},
            {'term': 'courier delivery', 'meaningTr': 'kurye teslimatı', 'example': 'A courier will deliver the suitcase directly to your hotel reception.'},
        ]
    },
    'podcast_b1_ep4_ai': {
        'title': 'AI at Work: Ethics & Future',
        'subtitle': 'Automation, Creativity & Workplace Shifts',
        'level': 'B1',
        'levelLabel': 'B1 Orta • Bölüm 4',
        'coverImage': 'podcastCovers.b1AI',
        'audioAsset': "require('../../assets/audio/podcast_b1_ep4_ai.mp3')",
        'description': 'İş yerinde yapay zeka kullanımı, veri gizliliği, yazılımcıların değişen rolleri ve insan yaratıcılığı üzerine entelektüel münazara.',
        'topicsCovered': ['Fikir Belirtme Kalıpları (From my perspective, without a doubt)', 'Teknoloji & Etik (data privacy, mitigating risks)', 'İşin Geleceği'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Liam', 'role': 'Kıdemli Yazılım Mimarı', 'avatar': 'avatarImages.maleEngineer'},
            {'name': 'Chloe', 'role': 'Ürün Yöneticisi', 'avatar': 'avatarImages.femaleLead'},
        ],
        'keyVocab': [
            {'term': 'mitigate', 'meaningTr': 'hafifletmek / riskini azaltmak', 'example': 'If engineers follow strict protocols, the risk can be mitigated.'},
            {'term': 'proprietary', 'meaningTr': 'şirkete özel / telifli', 'example': 'Never upload proprietary company source code to public models.'},
            {'term': 'craftsmanship', 'meaningTr': 'ustalık / işçilik kalitesi', 'example': 'Adapting to new tools while maintaining high craftsmanship is key.'},
            {'term': 'curator', 'meaningTr': 'seçici / küratör', 'example': 'AI is transforming us into code editors and curators.'},
        ]
    },
    'podcast_b1_ep5_sustainability': {
        'title': 'Green Cities & Sustainable Living',
        'subtitle': 'Renewable Energy, Eco Habits & Urban Design',
        'level': 'B1',
        'levelLabel': 'B1 Orta • Bölüm 5',
        'coverImage': 'podcastCovers.b1Green',
        'audioAsset': "require('../../assets/audio/podcast_b1_ep5_sustainability.mp3')",
        'description': 'Sürdürülebilir şehirler, güneş enerjisi mikro şebekeleri, korumalı bisiklet yolları ve bireysel çevre alışkanlıkları.',
        'topicsCovered': ['Çevre & Şehircilik (renewable energy, net-zero emissions)', 'Görüş Paylaşma (In my opinion, definitely)', 'Zorunluluk Kipleri'],
        'speakers': [
            {'name': '🎙️ Sunucu', 'role': 'Ders Rehberi', 'avatar': 'avatarImages.femaleLead'},
            {'name': 'Ethan', 'role': 'Çevre Bilimci', 'avatar': 'avatarImages.maleTraveler'},
            {'name': 'Maya', 'role': 'Şehir Plancısı', 'avatar': 'avatarImages.femaleDesigner'},
        ],
        'keyVocab': [
            {'term': 'net-zero emissions', 'meaningTr': 'net sıfır karbon salınımı', 'example': 'What is the biggest challenge cities face when transitioning to net-zero emissions?'},
            {'term': 'infrastructure', 'meaningTr': 'altyapı', 'example': 'The biggest hurdle is modernizing legacy infrastructure.'},
            {'term': 'microgrid', 'meaningTr': 'yerel mikro elektrik şebekesi', 'example': 'Localized microgrids seem to be gaining massive momentum.'},
            {'term': 'composting', 'meaningTr': 'organik atık gübreleme / kompost', 'example': 'Composting kitchen waste makes a measurable collective difference.'},
        ]
    },
}

ep_speaker_map = {
    # A1
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
    },
    # A2
    'podcast_a2_ep1_airport': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-ChristopherNeural': ('Daniel', 'Hava Yolu Görevlisi', 'avatarImages.maleTraveler'),
        'en-US-AriaNeural': ('Rachel', 'Yolcu', 'avatarImages.femaleLead'),
    },
    'podcast_a2_ep2_hotel': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-GuyNeural': ('James', 'Resepsiyonist', 'avatarImages.maleEngineer'),
        'en-US-JennyNeural': ('Clara', 'Otel Misafiri', 'avatarImages.femaleDesigner'),
    },
    'podcast_a2_ep3_shopping': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-EricNeural': ('Lucas', 'Mağaza Danışmanı', 'avatarImages.maleDev'),
        'en-US-MichelleNeural': ('Nora', 'Müşteri', 'avatarImages.femaleEntrepreneur'),
    },
    'podcast_a2_ep4_doctor': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-BrianNeural': ('Dr. Harrison', 'Hekim', 'avatarImages.maleEngineer'),
        'en-US-EmmaNeural': ('Lily', 'Hasta', 'avatarImages.femaleDesigner'),
    },
    'podcast_a2_ep5_cinema': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-GuyNeural': ('Mark', 'Film Meraklısı', 'avatarImages.maleEngineer'),
        'en-US-AriaNeural': ('Zoe', 'Sinema Sever', 'avatarImages.femaleLead'),
    },
    # B1
    'podcast_b1_ep1_interview': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-JennyNeural': ('Victoria', 'İK Direktörü', 'avatarImages.femaleLead'),
        'en-US-ChristopherNeural': ('Alex', 'Pazarlama Uzmanı', 'avatarImages.maleDev'),
    },
    'podcast_b1_ep2_apartment': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-EricNeural': ('Ryan', 'Emlak Danışmanı', 'avatarImages.maleTraveler'),
        'en-US-AriaNeural': ('Laura', 'Kiracı Adayı', 'avatarImages.femaleDesigner'),
    },
    'podcast_b1_ep3_luggage': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-GuyNeural': ('Kevin', 'Müşteri Hizmetleri', 'avatarImages.maleEngineer'),
        'en-US-MichelleNeural': ('Natalie', 'Yolcu', 'avatarImages.femaleEntrepreneur'),
    },
    'podcast_b1_ep4_ai': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-BrianNeural': ('Liam', 'Yazılım Mimarı', 'avatarImages.maleEngineer'),
        'en-US-EmmaNeural': ('Chloe', 'Ürün Yöneticisi', 'avatarImages.femaleLead'),
    },
    'podcast_b1_ep5_sustainability': {
        'en-US-AvaNeural': ('🎙️ Spekiva Sunucu', 'Ders Rehberi', 'avatarImages.femaleLead'),
        'en-US-ChristopherNeural': ('Ethan', 'Çevre Bilimci', 'avatarImages.maleTraveler'),
        'en-US-JennyNeural': ('Maya', 'Şehir Plancısı', 'avatarImages.femaleDesigner'),
    },
}

tr_dict = {
    # A1 & A2 (Existing translations preserved)
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
    'Congratulations! You have completed all 5 A1 Beginner Masterclass episodes. Keep listening and repeating to master conversational English!': 'Tebrikler! 5 A1 Başlangıç Masterclass bölümünün tamamını bitirdiniz. Konuşma İngilizcesinde ustalaşmak için dinlemeye ve tekrar etmeye devam edin!',

    'Welcome to Spekiva English Podcasts for A2 Elementary. Episode 1: Boarding Pass and Departure Gate. Practice airport check-in, luggage allowance, and boarding procedures.': 'A2 Temel seviye Spekiva İngilizce Podcastlerine hoş geldiniz. Bölüm 1: Biniş Kartı ve Uçuş Kapısı. Havaalanı check-in, bagaj hakkı ve uçağa biniş prosedürleri pratiği yapın.',
    'Good morning! Welcome to SkyWay Airlines. May I please see your passport and flight booking confirmation?': 'Günaydın! SkyWay Hava Yollarına hoş geldiniz. Pasaportunuzu ve uçuş rezervasyon onayınızı görebilir miyim lütfen?',
    'Good morning! Here is my passport and my mobile e-ticket confirmation code.': 'Günaydın! İşte pasaportum ve mobil e-bilet onay kodum.',
    'Thank you, Rachel. I see you are flying to London Heathrow today on flight SK 402. Are you checking in any baggage this morning?': 'Teşekkürler Rachel. Bugün SK 402 seferiyle Londra Heathrow’a uçtuğunuzu görüyorum. Bu sabah bagaj teslim edecek misiniz?',
    'Yes, I have one large suitcase to check in, and I will take this small backpack as my carry-on bag.': 'Evet, teslim edilecek bir büyük bavulum var ve bu küçük sırt çantasını el bagajım olarak yanıma alacağım.',
    'Please place your suitcase onto the luggage scale... Perfect, twenty-one kilograms. That is well within your baggage allowance.': 'Lütfen bavulunuzu bagaj tartısına koyun... Harika, yirmi bir kilogram. Bagaj hakkınızın tamamen içinde.',
    'That is a relief! Would it be possible to get a window seat, please?': 'İçim rahatladı! Pencere kenarı bir koltuk almam mümkün olur mu acaba?',
    'Let me check the seating map... Yes, seat 14A near the front of the cabin is available. It has a great window view.': 'Koltuk haritasını kontrol edeyim... Evet, kabinin ön kısımlarında 14A numaralı koltuk müsait. Çok güzel bir pencere manzarası var.',
    'Wonderful, thank you! What time does boarding begin, and which gate should I go to?': 'Harika, teşekkür ederim! Biniş saat kaçta başlıyor ve hangi kapıya gitmeliyim?',
    'Boarding starts at ten fifteen at Gate 24. Security screening can take fifteen to twenty minutes, so please head through to the departure lounge shortly.': 'Biniş saat on on beşte 24 numaralı kapıda başlıyor. Güvenlik kontrolü on beş yirmi dakika sürebilir, bu yüzden kısa süre içinde gidiş salonuna geçiniz.',
    'Understood. Is the departure gate on the second floor?': 'Anladım. Biniş kapısı ikinci katta mı?',
    'Yes, right after duty-free shops, take the escalator up to the second floor and follow the signs for Gate 24.': 'Evet, gümrüksüz mağazaların hemen ardından yürüyen merdivenle ikinci kata çıkın ve Kapı 24 tabelalarını takip edin.',
    'Thank you so much for your help! Have a great day!': 'Yardımınız için çok teşekkür ederim! İyi günler dilerim!',
    'You are very welcome, Rachel! Here is your passport and boarding pass. Have a safe and pleasant flight!': 'Rica ederim Rachel! İşte pasaportunuz ve biniş kartınız. Güvenli ve keyifli bir uçuş dilerim!',
    'Episode 1 complete! You now know the key vocabulary for traveling through airports with confidence.': 'Bölüm 1 tamamlandı! Artık havaalanlarında özgüvenle seyahat etmek için anahtar kelimeleri biliyorsunuz.',

    'Welcome to Episode 2: Hotel Check-in and Special Requests. Learn how to check in smoothly, ask about hotel amenities, and request extra services.': 'Bölüm 2\'ye hoş geldiniz: Otel Girişi ve Özel İstekler. Sorunsuz giriş yapmayı, otel olanaklarını sormayı ve ekstra hizmet talep etmeyi öğrenin.',
    'Good afternoon! Welcome to The Grand Harbor Hotel. How can I assist you today?': 'Tünaydın! The Grand Harbor Otele hoş geldiniz. Bugün size nasıl yardımcı olabilirim?',
    'Good afternoon! I have a reservation for three nights under the name Clara Evans.': 'Tünaydın! Clara Evans adına üç gecelik bir rezervasyonum var.',
    'Welcome Clara! Let me pull up your booking... Yes, a Deluxe King Room with a city view for three nights. May I have an ID and a credit card for the room deposit?': 'Hoş geldiniz Clara! Rezervasyonunuzu açayım... Evet, şehir manzaralı üç gecelik Deluxe King Oda. Oda depozitosu için bir kimlik ve kredi kartı alabilir miyim?',
    'Certainly, here is my driver\'s license and credit card.': 'Elbette, işte sürücü belgem ve kredi kartım.',
    'Thank you. Everything is set. You are in room 512 on the fifth floor. Here are your electronic key cards.': 'Teşekkürler. Her şey hazır. Beşinci katta 512 numaralı odadasınız. İşte elektronik anahtar kartlarınız.',
    'Thank you. Could you please tell me what time breakfast is served in the morning?': 'Teşekkürler. Sabah kahvaltısının saat kaçta servis edildiğini söyleyebilir misiniz lütfen?',
    'Our complimentary buffet breakfast is served on the ground floor terrace from seven to ten thirty in the morning.': 'Ücretsiz açık büfe kahvaltımız zemin kat terasında sabah yediden on buçuğa kadar servis edilmektedir.',
    'That is great. Also, does the room have high-speed Wi-Fi and an iron for clothing?': 'Harika. Ayrıca odada yüksek hızlı Wi-Fi ve kıyafetler için bir ütü var mı?',
    'Yes, Wi-Fi is complimentary throughout the hotel with no password required. There is an iron and ironing board inside the wardrobe.': 'Evet, Wi-Fi otel genelinde ücretsizdir ve şifre gerektirmez. Gardırobun içinde bir ütü ve ütü masası bulunmaktadır.',
    'Could we also get two extra feather pillows and a bottle of mineral water sent up to the room?': 'Ayrıca odaya iki ekstra kuş tüyü yastık ve bir şişe maden suyu gönderebilir misiniz?',
    'Of course, I will notify housekeeping right away, and they will bring them up within ten minutes.': 'Elbette, kat hizmetlerine hemen haber veriyorum, on dakika içinde yukarı getireceklerdir.',
    'You have been so helpful, James. Thank you very much!': 'Çok yardımcı oldun James. Çok teşekkür ederim!',
    'It is our absolute pleasure, Clara. Enjoy your stay in the city!': 'Bizim için büyük bir zevk Clara. Şehirdeki konaklamanızın tadını çıkarın!',
    'Episode 2 complete! Remember to use polite modals like \'could you please\' when making requests at hotels.': 'Bölüm 2 tamamlandı! Otellerde talepte bulunurken \'could you please\' gibi kibar kipleri kullanmayı unutmayın.',

    'Welcome to Episode 3: Shopping Spree and Fitting Rooms. Practice asking for sizes, trying on clothes, asking about discounts, and return policies.': 'Bölüm 3\'e hoş geldiniz: Alışveriş Turu ve Deneme Kabinleri. Beden sorma, kıyafet deneme, indirim ve iade koşullarını sorma pratiği yapın.',
    'Hello! Welcome to Urban Style. Are you looking for anything in particular today?': 'Merhaba! Urban Style\'a hoş geldiniz. Bugün özel olarak aradığınız bir şey var mı?',
    'Hi! Yes, I really like this navy blue wool sweater on display, but I cannot find my size on the rack.': 'Selam! Evet, vitrindeki bu lacivert yün kazağı çok beğendim ama askıda bedenimi bulamıyorum.',
    'What size are you looking for?': 'Hangi bedeni arıyorsunuz?',
    'I am looking for a medium. Do you have any in stock in the back room?': 'Medium (orta) beden arıyorum. Arka depoda stokta var mı acaba?',
    'Let me check on our stock system... Yes, we have two medium sweaters in the stockroom. I will grab one for you right now.': 'Stok sistemimizden kontrol edeyim... Evet, depoda iki adet medium kazak var. Sizin için hemen bir tane getiriyorum.',
    'Here you go! We also have it in charcoal gray and olive green if you would like to compare colors.': 'İşte buyrun! Renkleri karşılaştırmak isterseniz antrasit gri ve zeytin yeşili renkleri de mevcut.',
    'The navy blue looks fantastic! Where are the fitting rooms so I can try it on?': 'Lacivert harika görünüyor! Üzerimde deneyebilmem için soyunma kabinleri nerede?',
    'The fitting rooms are located right at the back of the store, next to the shoe section.': 'Deneme kabinleri mağazanın tam arkasında, ayakkabı reyonunun yanında yer alıyor.',
    'It fits perfectly! It is very comfortable and soft. Is this item currently on sale?': 'Tam oturdu! Çok rahat ve yumuşak. Bu ürün şu an indirimde mi?',
    'Yes, all knitwear is twenty percent off this weekend. So it comes down from sixty dollars to forty-eight dollars.': 'Evet, bu hafta sonu tüm trikolar yüzde yirmi indirimde. Dolayısıyla altmış dolardan kırk sekiz dolara düşüyor.',
    'That is a great bargain! What is your return policy just in case?': 'Harika bir fırsatmış! Her ihtimale karşı iade politikanız nedir?',
    'You can exchange or return any unworn item with the original tags and receipt within thirty days for a full refund.': 'Giyilmemiş herhangi bir ürünü orijinal etiketleri ve fişiyle birlikte otuz gün içinde tam para iadesiyle değiştirebilir veya iade edebilirsiniz.',
    'Wonderful! I will take the navy sweater, please. I will pay by card.': 'Harika! Lacivert kazağı alıyorum lütfen. Kartla ödeyeceğim.',
    'Excellent choice! Let\'s head over to the cash register.': 'Mükemmel seçim! Kasaya doğru geçelim.',
    'Episode 3 complete! Notice how comparatives and polite shopping phrases make everyday purchases easier.': 'Bölüm 3 tamamlandı! Karşılaştırma sıfatlarının ve kibar alışveriş kalıplarının günlük alışverişleri nasıl kolaylaştırdığına dikkat edin.',

    'Welcome to Episode 4: A Doctor\'s Visit and Symptoms. Learn how to describe health symptoms, understand medical advice, and get prescriptions.': 'Bölüm 4\'e hoş geldiniz: Doktor Muayenesi ve Semptomlar. Sağlık şikayetlerini anlatmayı, tıbbi tavsiyeleri anlamayı ve reçete almayı öğrenin.',
    'Good afternoon, Lily. Come on in and have a seat. What seems to be the problem today?': 'Tünaydın Lily. İçeri gel ve otur lütfen. Bugün sorun nedir?',
    'Good afternoon, Dr. Harrison. I haven\'t been feeling well for the past three days. I have a sore throat, a persistent dry cough, and a mild headache.': 'Tünaydın Dr. Harrison. Son üç gündür kendimi iyi hissetmiyorum. Boğaz ağrım, inatçı bir kuru öksürüğüm ve hafif bir baş ağrım var.',
    'I see. Have you had a fever or chills?': 'Anlıyorum. Ateş veya titreme oldu mu?',
    'Yes, yesterday evening my temperature was thirty-eight degrees, and I felt very exhausted.': 'Evet, dün akşam ateşim otuz sekiz dereceydi ve kendimi çok bitkin hissettim.',
    'Let me examine your throat and listen to your breathing... Open wide and say ah...': 'Boğazınızı muayene edeyim ve nefesinizi dinleyeyim... Ağzınızı iyice açıp ah deyin...',
    'Ahhh...': 'Ahhh...',
    'Your throat is inflamed and red, but your lungs sound clear. It looks like a viral upper respiratory infection.': 'Boğazınız iltihaplı ve kırmızı, ancak ciğerlerinizden temiz ses geliyor. Viral bir üst solunum yolu enfeksiyonu gibi görünüyor.',
    'Do I need to take antibiotics?': 'Antibiyotik kullanmam gerekir mi?',
    'No, antibiotics do not work against viral infections. I will write you a prescription for a soothing throat spray and an anti-inflammatory painkiller.': 'Hayır, antibiyotikler viral enfeksiyonlara karşı etki etmez. Sizin için rahatlatıcı bir boğaz spreyi ve iltihap giderici bir ağrı kesici reçete edeceğim.',
    'How often should I take the medication?': 'İlaçları ne sıklıkla almalıyım?',
    'Take one painkiller tablet every eight hours after meals with a glass of water, and use the throat spray three times a day.': 'Yemeklerden sonra bir bardak suyla sekiz saatte bir ağrı kesici tablet alın ve boğaz spreyini günde üç kez kullanın.',
    'Is there anything else I should do to recover faster?': 'Daha hızlı iyileşmek için yapmam gereken başka bir şey var mı?',
    'You should get plenty of rest, drink warm herbal tea with honey, and stay hydrated. You should avoid cold drinks for a few days.': 'Bol bol dinlenmeli, ballı ılık bitki çayı içmeli ve vücudunuzu susuz bırakmamalısınız. Birkaç gün soğuk içeceklerden kaçınmalısınız.',
    'Thank you very much, Dr. Harrison. I will follow your advice!': 'Çok teşekkür ederim Dr. Harrison. Tavsiyelerinize uyacağım!',
    'You are welcome, Lily. If the fever doesn\'t go down in forty-eight hours, please come back. Get well soon!': 'Rica ederim Lily. Ateş kırk sekiz saat içinde düşmezse lütfen tekrar gelin. Geçmiş olsun!',
    'Episode 4 complete! You now know how to explain symptoms and understand medical recommendations.': 'Bölüm 4 tamamlandı! Artık belirtileri nasıl açıklayacağınızı ve tıbbi tavsiyeleri nasıl anlayacağınızı biliyorsunuz.',

    'Welcome to Episode 5: Cinema Night and Weekend Plans. Practice talking about films, giving opinions using superlatives, and buying movie tickets.': 'Bölüm 5\'e hoş geldiniz: Sinema Gecesi ve Hafta Sonu Planları. Filmler hakkında konuşma, en üstünlük sıfatlarıyla fikir belirtme ve sinema bileti alma pratiği yapın.',
    'Hey Zoe! Are you free this evening? There is a brand new sci-fi adventure movie showing at the downtown cinema.': 'Selam Zoe! Bu akşam müsait misin? Şehir merkezindeki sinemada yepyeni bir bilim kurgu macera filmi gösterimde.',
    'Hey Mark! That sounds exciting! What movie is it?': 'Selam Mark! Kulağa heyecan verici geliyor! Hangi film?',
    'It is called Galaxy Wanderers. People say it has the most breathtaking visual effects and a thrilling soundtrack.': 'Adı Galaxy Wanderers. İnsanlar en nefes kesici görsel efektlere ve heyecan verici bir film müziğine sahip olduğunu söylüyor.',
    'Oh, I watched the trailer yesterday! The lead actor gave an incredible performance. What time does the screening start?': 'Oh, dün fragmanını izledim! Başrol oyuncusu inanılmaz bir performans sergilemiş. Gösterim saat kaçta başlıyor?',
    'There is a screening at seven fifteen and another one at nine thirty. Which time do you prefer?': 'Yedi on beşte bir seans ve dokuz buçukta bir başka seans var. Hangi saati tercih edersin?',
    'Seven fifteen is much better. That way, we can grab dinner at the Mexican restaurant across the street afterwards.': 'Yedi on beş çok daha iyi. Bu sayede filmden sonra caddenin karşısındaki Meksika restoranında yemek yiyebiliriz.',
    'Great idea! I can book our tickets online right now on my phone. Should we get standard seats or VIP recliner seats?': 'Harika fikir! Biletlerimizi hemen şimdi telefonumdan online ayırtabilirim. Standart koltuk mu yoksa VIP yatar koltuk mu alalım?',
    'VIP recliners in the middle row would be awesome! They are much more comfortable than standard seats.': 'Orta sıradaki VIP yatar koltuklar harika olur! Standart koltuklardan çok daha rahatlar.',
    'Done! Two VIP tickets for row F, seats 10 and 11. The confirmation code is sent to my email.': 'Tamamdır! F sırası, 10 ve 11 numaralı koltuklar için iki VIP bilet. Onay kodu e-postama gönderildi.',
    'You are the best, Mark! Shall we meet in front of the popcorn stand at seven o\'clock?': 'Sen bir harikasın Mark! Saat yedide mısır standının önünde buluşalım mı?',
    'Seven o\'clock sharp. I will buy a large butter popcorn and two sodas for us.': 'Tam saat yedide. Bizim için büyük boy tereyağlı mısır ve iki gazoz alırım.',
    'Sounds like a perfect Friday evening! See you at seven, Mark!': 'Kulağa mükemmel bir cuma akşamı gibi geliyor! Yedide görüşürüz Mark!',
    'See you soon Zoe! Can\'t wait for the movie!': 'Yakında görüşürüz Zoe! Film için sabırsızlanıyorum!',
    'Congratulations! You have completed all 5 A2 Elementary Masterclass podcast episodes. Continue your journey to speak English naturally!': 'Tebrikler! 5 A2 Temel Masterclass podcast bölümünün tamamını bitirdiniz. Doğal İngilizce konuşma yolculuğunuza devam edin!',

    # --- B1 Translations ---
    'Welcome to Spekiva English Podcasts for B1 Intermediate learners. Episode 1: The Job Interview and Career Growth. Learn how to highlight your strengths, discuss past projects, and answer behavioral interview questions with confidence.': 'B1 Orta seviye Spekiva İngilizce Podcastlerine hoş geldiniz. Bölüm 1: İş Mülakatı ve Kariyer Gelişimi. Güçlü yönlerinizi vurgulamayı, geçmiş projeleri tartışmayı ve mülakat sorularını özgüvenle yanıtlamayı öğrenin.',
    'Good morning, Alex. Thank you for taking the time to speak with us today. To start off, could you tell me a little bit about your professional background?': 'Günaydın Alex. Bugün bizimle görüşmeye vakit ayırdığınız için teşekkür ederiz. Başlangıç olarak, profesyonel geçmişinizden biraz bahsedebilir misiniz?',
    'Good morning, Victoria. It is a pleasure to be here. Over the past four years, I have been working as a digital marketing specialist, where I managed cross-functional campaigns and analyzed user growth metrics.': 'Günaydın Victoria. Burada olmak bir zevk. Son dört yıldır dijital pazarlama uzmanı olarak çalışıyorum; fonksiyonlar arası kampanyalar yönettim ve kullanıcı büyüme metriklerini analiz ettim.',
    'That sounds impressive. In our team, projects move very fast. How do you usually handle tight deadlines and unexpected roadblocks?': 'Kulağa etkileyici geliyor. Ekibimizde projeler çok hızlı ilerler. Sıkışık teslim tarihlerini ve beklenmedik engelleri genellikle nasıl yönetirsiniz?',
    'When facing tight deadlines, I prioritize tasks using an impact-effort matrix. For example, during a major product relaunch last year, our lead designer fell ill. I quickly reorganized our sprint backlog and delegated critical assets so we delivered on schedule.': 'Sıkışık teslim tarihleriyle karşılaştığımda, etki-çaba matrisi kullanarak görevleri önceliklendiririm. Örneğin geçen yılki büyük bir ürün lansmanında baş tasarımcımız hastalandı. Sprint iş listemizi hızla yeniden düzenledim ve kritik varlıkları delege ederek zamanında teslim etmemizi sağladım.',
    'That shows great adaptability and leadership. What would you consider your greatest professional strength?': 'Bu harika bir uyum yeteneği ve liderlik gösteriyor. En büyük profesyonel gücünüz olarak neyi görürsünüz?',
    'I would say my strongest asset is data-driven problem solving. I enjoy finding patterns in data and turning insights into actionable strategies that improve customer retention.': 'En güçlü yönümün veriye dayalı problem çözme olduğunu söyleyebilirim. Verilerdeki kalıpları bulmaktan ve içgörüleri müşteri bağlılığını artıran uygulanabilir stratejilere dönüştürmekten keyif alıyorum.',
    'Excellent. And where do you see yourself developing over the next three to five years?': 'Mükemmel. Peki önümüzdeki üç ila beş yıl içinde kendinizi nerede gelişirken görüyorsunuz?',
    'I aim to step into a team leadership role where I can mentor junior marketers and contribute to international expansion initiatives.': 'Genç pazarlamacılara mentorluk yapabileceğim ve uluslararası büyüme girişimlerine katkıda bulunabileceğim bir ekip liderliği rolüne adım atmayı hedefliyorum.',
    'That aligns very well with the growth opportunities in our department. Do you have any questions for me regarding the position?': 'Bu, departmanımızdaki büyüme fırsatlarıyla son derece iyi örtüşüyor. Pozisyonla ilgili bana sormak istediğiniz bir soru var mı?',
    'Yes, could you tell me more about how collaboration between the product and marketing teams is structured on a day-to-day basis?': 'Evet, ürün ve pazarlama ekipleri arasındaki günlük işbirliğinin nasıl yapılandırıldığı hakkında daha fazla bilgi verebilir misiniz?',
    'We run weekly sync meetings and collaborative design sprints, so communication is continuous. We will be in touch with the next steps by the end of this week, Alex.': 'Haftalık senkronizasyon toplantıları ve ortak tasarım sprintleri yürütüyoruz, bu nedenle iletişim kesintisizdir. Bu haftanın sonuna kadar sonraki adımlarla ilgili sizinle iletişime geçeceğiz Alex.',
    'Thank you very much for your time, Victoria. I look forward to hearing from you!': 'Zaman ayırdığınız için çok teşekkür ederim Victoria. Sizden haber almayı sabırsızlıkla bekliyorum!',
    'Episode 1 complete! Notice the use of Present Perfect Continuous and professional vocabulary when discussing career experience.': 'Bölüm 1 tamamlandı! Kariyer deneyimini konuşurken Present Perfect Continuous ve profesyonel kelime kullanımına dikkat edin.',

    'Welcome to Episode 2: Apartment Hunting and Leases. Learn how to negotiate rental agreements, discuss utility costs, and evaluate neighborhood conveniences.': 'Bölüm 2\'ye hoş geldiniz: Daire Arama ve Kira Sözleşmeleri. Kiralama sözleşmelerini müzakere etmeyi, fatura masraflarını tartışmayı ve muhit olanaklarını değerlendirmeyi öğrenin.',
    'Hello Laura! Welcome to Riverside Apartments. This is the two-bedroom corner unit we discussed on the phone yesterday.': 'Merhaba Laura! Riverside Dairelerine hoş geldiniz. Bu, dün telefonda konuştuğumuz iki yatak odalı köşe daire.',
    'Hello Ryan! The natural lighting here is fantastic! The open-plan kitchen and the wooden flooring look newly renovated.': 'Merhaba Ryan! Buradaki doğal aydınlatma harika! Açık plan mutfak ve ahşap zeminler yeni yenilenmiş görünüyor.',
    'Yes, the previous owners refurbished the entire kitchen last month, including stainless steel appliances and double-glazed windows.': 'Evet, önceki ev sahipleri geçen ay paslanmaz çelik aletler ve çift camlı pencereler de dahil olmak üzere tüm mutfağı yeniledi.',
    'That is great for energy efficiency. What is the monthly rent, and what is included in the lease?': 'Bu enerji verimliliği için harika. Aylık kira ne kadar ve kiraya neler dahil?',
    'The rent is eighteen hundred dollars per month. Heating, water, and building maintenance are included, while electricity and internet are billed separately.': 'Kira aylık bin sekiz yüz dolar. Isınma, su ve bina bakımı dahildir; elektrik ve internet ise ayrı olarak faturalandırılır.',
    'I see. And what are the terms regarding the security deposit and the duration of the contract?': 'Anlıyorum. Peki depozito ve sözleşme süresine ilişkin şartlar nelerdir?',
    'The standard lease is twelve months. We require one month\'s rent as a refundable security deposit upon signing the agreement.': 'Standart kira süresi on iki aydır. Sözleşmeyi imzalarken bir aylık kira bedelini iade edilebilir depozito olarak talep ediyoruz.',
    'Is there an assigned parking spot in the underground garage, and are pets permitted in the building?': 'Yeraltı garajında tahsis edilmiş bir park yeri var mı ve binada evcil hayvanlara izin veriliyor mu?',
    'Yes, each apartment comes with one designated parking space. Small pets such as cats and small dogs are welcome with a minor pet deposit.': 'Evet, her daireye bir adet belirlenmiş park yeri tahsis edilmiştir. Kedi ve küçük köpek gibi küçük evcil hayvanlar cüzi bir evcil hayvan depozitosuyla kabul edilmektedir.',
    'That is wonderful news because I have a very calm cat. How is public transit access around here?': 'Bu harika bir haber çünkü çok sakin bir kedim var. Buralarda toplu taşıma erişimi nasıl?',
    'The express bus station is just a three-minute walk down the road, taking you straight to the city center in under twenty minutes.': 'Ekspres otobüs durağı yolun hemen üç dakikalık yürüyüş mesafesinde ve sizi yirmi dakikadan kısa sürede doğrudan şehir merkezine ulaştırıyor.',
    'This fits all my criteria perfectly. Could you please send me the lease application form by email?': 'Bu tüm kriterlerime mükemmel bir şekilde uyuyor. Kira başvuru formunu bana e-postayla gönderebilir misiniz lütfen?',
    'I will send it over within an hour. Once you fill it out and provide references, we can finalize the contract!': 'Bir saat içinde göndereceğim. Doldurup referansları sunduğunuzda sözleşmeyi tamamlayabiliriz!',
    'Episode 2 complete! You now possess the essential terms to negotiate property rentals and lease agreements smoothly.': 'Bölüm 2 tamamlandı! Artık gayrimenkul kiralama ve sözleşme görüşmelerini sorunsuz yürütmek için gerekli terimlere sahipsiniz.',

    'Welcome to Episode 3: Delayed Flights and Lost Luggage. Practice reporting travel disruptions, filing compensation claims, and communicating with customer support.': 'Bölüm 3\'e hoş geldiniz: Geciken Uçuşlar ve Kayıp Bagaj. Seyahat aksaklıklarını bildirme, tazminat talebinde bulunma ve müşteri destekle iletişim pratiği yapın.',
    'Good evening, customer service desk. How can I assist you with your journey today?': 'İyi akşamlar, müşteri hizmetleri masası. Bugün seyahatiniz konusunda size nasıl yardımcı olabilirim?',
    'Good evening. I just arrived on flight PA 884 from Frankfurt, but my checked suitcase did not appear on baggage carousel number three.': 'İyi akşamlar. Frankfurt\'tan PA 884 sefer sayılı uçuşla yeni geldim ancak teslim ettiğim bavul üç numaralı bagaj bandında çıkmadı.',
    'I am very sorry to hear that. Let me look up your baggage tag number in the tracking system... May I have your claim stub and passport?': 'Bunu duyduğuma çok üzüldüm. Takip sisteminden bagaj etiket numaranıza bakayım... Bagaj fişinizi ve pasaportunuzu alabilir miyim?',
    'Here is the luggage receipt that was attached to my boarding pass in Frankfurt.': 'İşte Frankfurt\'ta biniş kartıma iliştirilen bagaj makbuzu.',
    'Thank you. According to the system, due to the tight connection during your layover, your bag missed the transfer flight. However, it has been loaded onto the next flight and will arrive here tomorrow morning at eight AM.': 'Teşekkürler. Sisteme göre, aktarmanız sırasındaki dar zaman nedeniyle bavulunuz transfer uçuşunu kaçırmış. Ancak bir sonraki uçuşa yüklendi ve yarın sabah saat sekizde buraya varacak.',
    'I have an important business meeting tomorrow afternoon, so I need essential clothing and toiletries immediately. What is your policy regarding emergency expenses?': 'Yarın öğleden sonra önemli bir iş toplantım var, bu yüzden hemen temel kıyafetlere ve kişisel bakım ürünlerine ihtiyacım var. Acil durum harcamalarına ilişkin politikanız nedir?',
    'We provide an emergency allowance of up to one hundred and fifty dollars for necessary purchases. Please keep all original itemized receipts so we can reimburse you.': 'Gerekli alışverişler için yüz elli dolara kadar acil durum ödeneği sağlıyoruz. Size geri ödeme yapabilmemiz için lütfen tüm orijinal kalemli fişleri saklayın.',
    'Understood. Will the airline deliver the suitcase directly to my hotel once it arrives?': 'Anlaşıldı. Bavul geldiğinde havayolu onu doğrudan otelime teslim edecek mi?',
    'Yes, absolutely. A courier will deliver it directly to your hotel reception free of charge. Let me fill out this Property Irregularity Report with your hotel address.': 'Evet, kesinlikle. Bir kurye ücretsiz olarak doğrudan otelinizin resepsiyonuna teslim edecektir. Otel adresinizle birlikte şu Eşya Düzensizlik Raporunu doldurayım.',
    'I am staying at The Grand Harbor Hotel on 4th Avenue, Room 512.': '4. Cadde üzerindeki The Grand Harbor Otel\'de, 512 numaralı odada kalıyorum.',
    'Here is your reference tracking number: BAG-9842. You can track the courier delivery live on our mobile app.': 'İşte referans takip numaranız: BAG-9842. Kurye teslimatını mobil uygulamamızdan canlı olarak takip edebilirsiniz.',
    'Thank you for handling this so professionally, Kevin. I appreciate your prompt assistance.': 'Bunu bu kadar profesyonelce ele aldığın için teşekkürler Kevin. Hızlı yardımınız için minnettarım.',
    'Episode 3 complete! Remember to stay calm and clearly outline your rights when facing flight delays or baggage issues.': 'Bölüm 3 tamamlandı! Uçuş rötarları veya bagaj sorunlarıyla karşılaştığınızda sakin kalmayı ve haklarınızı net bir şekilde ifade etmeyi unutmayın.',

    'Welcome to Episode 4: AI at Work: Ethics and Future. Learn how to express nuanced opinions, debate technological trends, and discuss the impact of automation.': 'Bölüm 4\'e hoş geldiniz: İş Yerinde Yapay Zeka: Etik ve Gelecek. Nüanslı fikirler belirtmeyi, teknolojik trendleri tartışmayı ve otomasyonun etkisini konuşmayı öğrenin.',
    'Hey Chloe, did you see our company\'s new policy on integrating generative AI tools into our daily software development workflow?': 'Selam Chloe, şirketimizin üretken yapay zeka araçlarını günlük yazılım geliştirme iş akışımıza entegre etme konusundaki yeni politikasını gördün mü?',
    'Yes Liam, I read through the guidelines this morning. From my perspective, automating repetitive coding tasks and documentation will boost our team\'s productivity significantly.': 'Evet Liam, bu sabah yönergeleri okudum. Benim bakış açıma göre, tekrarlayan kodlama görevlerini ve dokümantasyonu otomatikleştirmek ekibimizin üretkenliğini önemli ölçüde artıracaktır.',
    'I agree that it saves time on boilerplate code, but don\'t you think there are serious concerns regarding code security and data privacy?': 'Şablon kodlarda zaman kazandırdığına katılıyorum ama kod güvenliği ve veri gizliliği konusunda ciddi endişeler olduğunu düşünmüyor musun?',
    'That is a valid concern. However, if engineers follow strict data anonymization protocols and never upload proprietary company source code to public models, the risk can be mitigated.': 'Bu haklı bir endişe. Ancak mühendisler sıkı veri anonimleştirme protokollerine uyarsa ve kamuya açık modellere şirkete özel kaynak kodlarını asla yüklemezse risk azaltılabilir.',
    'What about the impact on junior developers? If AI writes beginner-level code, how will young engineers develop fundamental debugging intuition?': 'Peki ya genç geliştiriciler üzerindeki etkisi? Eğer yapay zeka başlangıç seviyesi kodları yazarsa, genç mühendisler temel hata ayıklama sezgisini nasıl geliştirecek?',
    'That is why mentoring becomes even more crucial. Instead of memorizing syntax, junior developers will learn to review, validate, and architect scalable systems at a higher conceptual level.': 'İşte bu yüzden mentorluk daha da kritik hale geliyor. Sözdizimini ezberlemek yerine, genç geliştiriciler ölçeklenebilir sistemleri daha yüksek kavramsal düzeyde incelemeyi, doğrulamayı ve mimarisini kurmayı öğrenecekler.',
    'In other words, AI is transforming us into code editors and curators rather than just manual writers.': 'Başka bir deyişle, yapay zeka bizi yalnızca elle yazanlar olmaktan çıkarıp kod editörlerine ve küratörlerine dönüştürüyor.',
    'Exactly! Human creativity, critical thinking, and ethical judgment are qualities that no algorithm can truly replicate.': 'Kesinlikle! İnsan yaratıcılığı, eleştirel düşünme ve etik muhakeme, hiçbir algoritmanın gerçekten kopyalayamayacağı niteliklerdir.',
    'That is a well-balanced viewpoint. Adapting to new tools while maintaining high craftsmanship seems to be the key to staying relevant in the modern tech landscape.': 'Bu çok dengeli bir bakış açısı. Yüksek ustalığı korurken yeni araçlara uyum sağlamak, modern teknoloji dünyasında güncel kalmanın anahtarı gibi görünüyor.',
    'Without a doubt, Liam. The future belongs to those who collaborate effectively with intelligent systems.': 'Şüphesiz Liam. Gelecek, akıllı sistemlerle etkili şekilde işbirliği yapanlara aittir.',
    'Episode 4 complete! Practice using opinion markers such as \'from my perspective\', \'however\', and \'without a doubt\' in intellectual discussions.': 'Bölüm 4 tamamlandı! Entelektüel tartışmalarda \'from my perspective\', \'however\' ve \'without a doubt\' gibi fikir belirteçlerini kullanma pratiği yapın.',

    'Welcome to Episode 5: Green Cities and Sustainable Living. Practice discussing environmental initiatives, renewable energy, and future urban planning.': 'Bölüm 5\'e hoş geldiniz: Yeşil Şehirler ve Sürdürülebilir Yaşam. Çevre girişimlerini, yenilenebilir enerjiyi ve geleceğin şehir planlamasını tartışma pratiği yapın.',
    'Maya, as an urban planner, what do you think is the biggest challenge cities face when transitioning to net-zero carbon emissions?': 'Maya, bir şehir plancısı olarak, şehirlerin net sıfır karbon salınımına geçerken karşılaştığı en büyük zorluğun ne olduğunu düşünüyorsun?',
    'In my opinion Ethan, the biggest hurdle is modernizing legacy infrastructure. Replacing fossil fuel heating systems and expanding electric public transit require substantial capital investment.': 'Bana göre Ethan, en büyük engel eski altyapıyı modernize etmektir. Fosil yakıtlı ısıtma sistemlerinin değiştirilmesi ve elektrikli toplu taşımanın genişletilmesi önemli sermaye yatırımı gerektirir.',
    'That is true, but what about decentralized solutions? For instance, rooftop solar panels and localized microgrids seem to be gaining massive momentum.': 'Bu doğru ama ya merkezi olmayan çözümler? Örneğin, çatı üstü güneş panelleri ve yerelleştirilmiş mikro şebekeler muazzam bir ivme kazanıyor gibi görünüyor.',
    'Rooftop solar is fantastic because it empowers households to generate their own clean energy, while reducing stress on the main municipal power grid.': 'Çatı güneş enerjisi harika çünkü hanelerin kendi temiz enerjilerini üretmelerini sağlarken ana belediye elektrik şebekesi üzerindeki baskıyı da azaltıyor.',
    'I also noticed that our municipality has been adding protected bike lanes across the city center. Have you observed a shift in commuting habits?': 'Belediyemizin şehir merkezi genelinde korumalı bisiklet yolları eklediğini de fark ettim. İşe gidiş geliş alışkanlıklarında bir değişim gözlemlediniz mi?',
    'Definitely. When safe infrastructure is provided, residents are much more willing to leave their cars at home and commute by bicycle or electric scooters.': 'Kesinlikle. Güvenli altyapı sağlandığında, mahalle sakinleri arabalarını evde bırakıp bisiklet veya elektrikli scooter ile işe gitmeye çok daha istekli oluyorlar.',
    'What simple lifestyle changes can individuals make on a daily basis to reduce their personal environmental footprint?': 'Bireyler kişisel çevre ayak izlerini azaltmak için günlük olarak hangi basit yaşam tarzı değişikliklerini yapabilirler?',
    'Simple habits like minimizing single-use plastics, composting organic kitchen waste, and choosing local seasonal produce make a measurable collective difference over time.': 'Tek kullanımlık plastikleri en aza indirmek, organik mutfak atıklarını kompostlamak ve yerel mevsimlik ürünleri seçmek gibi basit alışkanlıklar zamanla ölçülebilir toplu bir fark yaratır.',
    'It is inspiring to see how individual actions and smart urban policies can work together to create greener and more livable communities.': 'Bireysel eylemlerin ve akıllı şehir politikalarının daha yeşil ve yaşanabilir topluluklar oluşturmak için nasıl birlikte çalışabileceğini görmek ilham verici.',
    'Absolutely, Ethan. Sustainability is not just an obligation; it is an investment in our collective well-being.': 'Kesinlikle Ethan. Sürdürülebilirlik sadece bir zorunluluk değil; kolektif refahımıza yapılan bir yatırımdır.',
    'Congratulations! You have completed all 5 B1 Intermediate Masterclass podcast episodes. You are now equipped to engage in rich, thoughtful English conversations!': 'Tebrikler! 5 B1 Orta Seviye Masterclass podcast bölümünün tamamını bitirdiniz. Artık zengin ve derin İngilizce sohbetlere katılmaya hazırsınız!'
}

all_measured_data = {**a1_data, **a2_data, **b1_data}

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
    seg_list = all_measured_data.get(ep_id, [])
    total_sec = int(round(all_measured_data.get(ep_id + '_total', 120)))
    mins = total_sec // 60
    secs = total_sec % 60
    dur_label = f"{mins}:{secs:02d} Dk"
    
    clean_title = meta['title'].replace("'", "\\'")
    clean_sub = meta['subtitle'].replace("'", "\\'")
    clean_desc = meta['description'].replace("'", "\\'")
    
    ts_lines.append("  {")
    ts_lines.append(f"    id: '{ep_id}',")
    ts_lines.append(f"    title: '{clean_title}',")
    ts_lines.append(f"    subtitle: '{clean_sub}',")
    ts_lines.append(f"    level: '{meta['level']}',")
    ts_lines.append(f"    levelLabel: '{meta['levelLabel']}',")
    ts_lines.append(f"    durationLabel: '{dur_label}',")
    ts_lines.append(f"    durationSec: {total_sec},")
    ts_lines.append(f"    coverImage: {meta['coverImage']},")
    ts_lines.append(f"    audioAsset: {meta['audioAsset']},")
    ts_lines.append(f"    description: '{clean_desc}',")
    ts_lines.append(f"    topicsCovered: {json.dumps(meta['topicsCovered'], ensure_ascii=False)},")
    
    # speakers
    ts_lines.append("    speakers: [")
    for sp in meta['speakers']:
        s_name = sp['name'].replace("'", "\\'")
        s_role = sp['role'].replace("'", "\\'")
        ts_lines.append(f"      {{ name: '{s_name}', role: '{s_role}', avatar: {sp['avatar']} }},")
    ts_lines.append("    ],")
    
    # keyVocab
    ts_lines.append("    keyVocab: [")
    for kv in meta['keyVocab']:
        k_term = kv['term'].replace("'", "\\'")
        k_mean = kv['meaningTr'].replace("'", "\\'")
        k_ex = kv['example'].replace("'", "\\'")
        ts_lines.append(f"      {{ term: '{k_term}', meaningTr: '{k_mean}', example: '{k_ex}' }},")
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

print(f'Done generating {len(ep_meta)} TOTAL EPISODES (5 A1 + 5 A2 + 5 B1)!')
