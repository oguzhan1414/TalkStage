"""A1 hikayeleri (27 adet: 10 mini ders + 17 hikaye).

Bir sahne = bir kısa cümle (4-8 kelime). Her A1 hikayesinin SONUNA 1-3 ayrı "Kelime Avı" sahnesi
eklenir: cümlede boşluk + karışık harf çipleri, harflere dokunarak kelime yazılır ("spell").
Mevcut sahnelerin sırası/numarası değişmez (sahne görselleri `slug_<n>.jpg` olarak numaralı);
yeni kelime avı sahneleri mevcut bir sahnenin görselini yeniden kullanır (`img`).
"""
from ._build import build_passage as B


def A1(slug, title, theme, order, minutes, scenes, spells, speaking):
    """`spells`: [(cümle_en, çeviri_tr, kelime, görsel_sahne_no), ...] -> sonuna ayrı sahneler olarak eklenir."""
    all_scenes = list(scenes)
    for en, tr, word, img in spells:
        n = len(all_scenes) + 1
        all_scenes.append((f"Sahne {n}: Kelime Avı", en, tr, ("spell", word, img)))
    return B(slug, title, "A1", theme, order, minutes, all_scenes, speaking)


PASSAGES = [
    # ---------------------------------------------------------------- mini dersler (1-10)
    A1("hello-my-name-is", "Hello! My Name Is...", "friends", 1, 1, [
        ("Merhaba Diyelim", "Hello! My name is Mivo.", "Merhaba! Benim adım Mivo."),
        ("Nasılsın?", "I am fine, thank you.", "İyiyim, teşekkür ederim."),
    ], [
        ("Say hello to Mivo.", "Mivo'ya merhaba de.", "hello", 1),
    ], ("Hello! What is your name?", "Hello! My name is ...")),

    A1("numbers-one-to-five", "Numbers 1-5", "school", 2, 1, [
        ("Bir, İki, Üç", "One, two, three.", "Bir, iki, üç."),
        ("Dört, Beş", "Four, five.", "Dört, beş."),
    ], [
        ("I see three oranges.", "Üç portakal görüyorum.", "three", 1),
        ("Two plus two is four.", "İki artı iki dört eder.", "four", 2),
    ], ("Can you count to five?", "One, two, three, four, five.")),

    A1("colors-basic", "Colors Around Us", "school", 3, 1, [
        ("Gökyüzü", "The sky is blue.", "Gökyüzü mavidir."),
        ("Elma", "The apple is red.", "Elma kırmızıdır."),
    ], [
        ("The grass is green.", "Çimen yeşildir.", "green", 1),
        ("The sun is yellow.", "Güneş sarıdır.", "yellow", 2),
    ], ("What color is the sky?", "The sky is blue.")),

    A1("this-is-my-family", "This Is My Family", "family", 4, 1, [
        ("Annem", "This is my mother.", "Bu benim annem."),
        ("Babam", "This is my father.", "Bu benim babam."),
    ], [
        ("I love my mother.", "Annemi seviyorum.", "mother", 1),
        ("This is my sister.", "Bu benim kız kardeşim.", "sister", 2),
    ], ("Who is this?", "This is my mother.")),

    A1("days-of-the-week", "Days of the Week", "daily", 5, 1, [
        ("Bugün", "Today is Monday.", "Bugün Pazartesi."),
        ("Yarın", "Tomorrow is Tuesday.", "Yarın Salı."),
    ], [
        ("Sunday is a free day.", "Pazar boş bir gündür.", "Sunday", 2),
    ], ("What day is today?", "Today is Monday.")),

    A1("how-are-you-dialogue", "How Are You?", "friends", 6, 1, [
        ("Selam", "Hello! How are you?", "Merhaba! Nasılsın?"),
        ("Cevap", "I am very well.", "Ben çok iyiyim."),
    ], [
        ("I am happy today.", "Bugün mutluyum.", "happy", 2),
    ], ("How are you today?", "I am fine, thank you.")),

    A1("my-house-rooms", "Rooms in My House", "home", 7, 1, [
        ("Mutfak", "This is the kitchen.", "Burası mutfak."),
        ("Yatak Odam", "This is my bedroom.", "Burası benim yatak odam."),
    ], [
        ("I cook in the kitchen.", "Mutfakta yemek pişiriyorum.", "kitchen", 1),
    ], ("Where do you sleep?", "I sleep in my bedroom.")),

    A1("what-is-your-job", "What Is Your Job?", "work", 8, 1, [
        ("Öğretmen", "I am a teacher.", "Ben bir öğretmenim."),
        ("Doktor", "She is a doctor.", "O bir doktor."),
    ], [
        ("My father is a teacher.", "Babam bir öğretmen.", "teacher", 1),
    ], ("What is your job?", "I am a teacher.")),

    A1("animals-basic", "Animals Around Us", "nature", 9, 1, [
        ("Kedi", "The cat is small.", "Kedi küçüktür."),
        ("Köpek", "The dog is big.", "Köpek büyüktür."),
    ], [
        ("The cat drinks milk.", "Kedi süt içer.", "milk", 1),
    ], ("Is the cat big or small?", "The cat is small.")),

    A1("numbers-six-to-ten", "Numbers 6-10", "school", 10, 1, [
        ("Altı, Yedi, Sekiz", "Six, seven, eight.", "Altı, yedi, sekiz."),
        ("Dokuz, On", "Nine, ten.", "Dokuz, on."),
    ], [
        ("I have seven books.", "Yedi kitabım var.", "seven", 1),
    ], ("Can you count to ten?", "Six, seven, eight, nine, ten.")),

    # ---------------------------------------------------------------- hikayeler (11+)
    A1("leo-magic-coffee", "Leo & The Magic Coffee", "food", 11, 4, [
        ("Sahne 1: Günaydın", "Good morning! Leo wakes up.", "Günaydın! Leo uyanır."),
        ("Sahne 2: Mutfak", "He goes to the kitchen.", "Mutfağa gider.", ("fill", "kitchen", ["garden", "school"])),
        ("Sahne 3: Beyaz Fincan", "The white cup smiles at him.", "Beyaz fincan ona gülümser."),
        ("Sahne 4: Konuşan Fincan", "\"Hello Leo, let's speak English!\"", "\"Merhaba Leo, haydi İngilizce konuşalım!\"", "listen"),
        ("Sahne 5: Hazırım", "Leo says, \"Yes, I am ready!\"", "Leo \"Evet, hazırım!\" der.",
         ("tf", "Leo is not ready.", False, "Leo \"Evet, hazırım!\" diyor; yani hazır.")),
    ], [
        ("Leo drinks warm coffee.", "Leo sıcak kahve içer.", "coffee", 4),
        ("The cup is white.", "Fincan beyaz.", "white", 3),
        ("It is seven o'clock.", "Saat yedi.", "seven", 1),
    ], ("What do you do in the morning?", "In the morning, I ...")),

    A1("lost-passport-london", "The Lost Passport in London", "travel", 12, 4, [
        ("Sahne 1: Londra", "Sarah arrives at London airport.", "Sarah Londra havalimanına varır."),
        ("Sahne 2: Çanta", "She looks in her bag.", "Çantasına bakar."),
        ("Sahne 3: Pasaport", "She cannot find her passport.", "Pasaportunu bulamaz.", ("fill", "passport", ["ticket", "phone"])),
        ("Sahne 4: Görevli", "An officer smiles at her.", "Bir görevli ona gülümser.", "listen"),
        ("Sahne 5: İyi Haber", "\"Someone found it at the cafe.\"", "\"Birisi onu kafede bulmuş.\"",
         ("q", "Where did someone find it?", ["At the cafe", "At the hotel", "On the bus"], 0,
          "Görevli pasaportun kafede bulunduğunu söylüyor.")),
    ], [
        ("Sarah has a small bag.", "Sarah'nın küçük bir çantası var.", "small", 2),
        ("London is a big city.", "Londra büyük bir şehir.", "city", 1),
    ], ("Do you travel a lot?", "Yes, I travel ... / No, I do not travel much.")),

    A1("new-friend-school", "A New Friend at School", "school", 13, 4, [
        ("Sahne 1: Yeni Öğrenci", "Emma is a new student.", "Emma yeni bir öğrencidir."),
        ("Sahne 2: Merhaba", "She says, \"Hi, I am Emma.\"", "\"Merhaba, ben Emma\" der."),
        ("Sahne 3: İsim", "\"What is your name?\"", "\"Senin adın ne?\"", "listen"),
        ("Sahne 4: Tom", "Tom says, \"I am from Canada.\"", "Tom \"Ben Kanadalıyım\" der.",
         ("q", "Where is Tom from?", ["Canada", "Spain", "Brazil"], 0, "Tom Kanadalı olduğunu söylüyor (from Canada).")),
        ("Sahne 5: Sıra Sende", "Tom asks, \"Where are you from?\"", "Tom sorar: \"Sen nerelisin?\"",
         ("tf", "Tom is from Spain.", False, "Tom İspanyalı değil, Kanadalı.")),
    ], [
        ("Tom is her new friend.", "Tom onun yeni arkadaşı.", "friend", 4),
        ("She likes the school.", "Okulu seviyor.", "school", 2),
    ], ("Where are you from?", "I am from ...")),

    A1("family-photo-album", "Family Photo Album", "family", 14, 4, [
        ("Sahne 1: Albüm", "Leo opens an old photo album.", "Leo eski bir fotoğraf albümü açar."),
        ("Sahne 2: Anne ve Baba", "He sees his mother and father.", "Annesini ve babasını görür."),
        ("Sahne 3: Kız Kardeş", "He sees his little sister.", "Küçük kız kardeşini görür."),
        ("Sahne 4: Bahçe", "Grandma and Grandpa are in the garden.", "Büyükanne ve büyükbaba bahçede.", "listen"),
        ("Sahne 5: Gülümseme", "They are smiling in the photo.", "Fotoğrafta gülümsüyorlar.",
         ("tf", "Leo's grandparents are sad.", False, "Fotoğrafta büyükanne ve büyükbaba gülümsüyor.")),
    ], [
        ("I love my family.", "Ailemi seviyorum.", "family", 1),
        ("His sister is little.", "Kız kardeşi küçük.", "sister", 3),
        ("The garden is green.", "Bahçe yeşil.", "garden", 4),
    ], ("Do you have a big family?", "Yes, I have ... / No, I have a small family.")),

    A1("shopping-for-shoes", "Shopping for Shoes", "shopping", 15, 4, [
        ("Sahne 1: Yeni Ayakkabı", "Maria wants new shoes.", "Maria yeni ayakkabı istiyor."),
        ("Sahne 2: Kırmızı", "She sees a red pair.", "Kırmızı bir çift görüyor."),
        ("Sahne 3: Mavi", "She sees a blue pair, too.", "Mavi bir çift de görüyor."),
        ("Sahne 4: Fiyat", "\"How much are the blue shoes?\"", "\"Mavi ayakkabılar ne kadar?\"", "listen"),
        ("Sahne 5: Cevap", "The seller says, \"Twenty dollars.\"", "Satıcı \"Yirmi dolar\" der.",
         ("q", "How much are the blue shoes?", ["Twenty dollars", "Ten dollars", "Fifty dollars"], 0,
          "Satıcı mavi ayakkabıların yirmi dolar olduğunu söylüyor.")),
    ], [
        ("She wants new shoes.", "Yeni ayakkabı istiyor.", "shoes", 1),
        ("The blue pair is nice.", "Mavi çift güzel.", "pair", 3),
    ], ("Do you like buying new shoes?", "Yes, I like ... / No, I do not like ...")),

    A1("the-rainy-day", "The Rainy Day", "weather", 16, 4, [
        ("Sahne 1: Bulutlu", "It is cloudy today.", "Bugün hava bulutlu."),
        ("Sahne 2: Karanlık Gökyüzü", "The sky is dark.", "Gökyüzü karanlık.", ("fill", "dark", ["blue", "bright"])),
        ("Sahne 3: Rüzgar", "The wind is strong.", "Rüzgar güçlü."),
        ("Sahne 4: Yağmur", "Suddenly, it starts to rain.", "Aniden yağmur yağmaya başlar.", "listen"),
        ("Sahne 5: Şemsiye", "Ben opens his umbrella.", "Ben şemsiyesini açar.",
         ("tf", "Ben closes his umbrella.", False, "Ben şemsiyesini açıyor (opens), kapatmıyor.")),
    ], [
        ("I like the rain.", "Yağmuru seviyorum.", "rain", 4),
        ("The clouds are dark.", "Bulutlar karanlık.", "clouds", 1),
    ], ("What is the weather like today?", "Today it is ...")),

    A1("cooking-dinner-together", "Cooking Dinner Together", "food", 17, 4, [
        ("Sahne 1: Mutfakta", "Dad and Lily are in the kitchen.", "Baba ve Lily mutfaktadır."),
        ("Sahne 2: Makarna", "They want to cook pasta.", "Makarna pişirmek istiyorlar.", "listen"),
        ("Sahne 3: Domates", "Lily cuts the tomatoes.", "Lily domatesleri doğrar."),
        ("Sahne 4: Su", "Dad boils the water.", "Baba suyu kaynatır."),
        ("Sahne 5: Akşam Yemeği", "They eat pasta together.", "Birlikte makarna yerler.",
         ("q", "What do they cook?", ["Pasta", "Soup", "Rice"], 0, "Hikayede makarna (pasta) pişiriyorlar.")),
    ], [
        ("They cook tasty pasta.", "Lezzetli makarna pişirirler.", "pasta", 2),
        ("Lily cuts a red tomato.", "Lily kırmızı bir domates doğrar.", "tomato", 3),
        ("Dinner is ready.", "Akşam yemeği hazır.", "dinner", 5),
    ], ("Do you like cooking?", "Yes, I like cooking ... / No, I do not like cooking.")),

    A1("my-weekly-schedule", "My Weekly Schedule", "daily", 18, 4, [
        ("Sahne 1: Pazartesi", "On Monday, Mia goes to work.", "Pazartesi günü Mia işe gider."),
        ("Sahne 2: Saat", "She starts at nine o'clock.", "Saat dokuzda başlar.", ("fill", "nine", ["five", "ten"])),
        ("Sahne 3: Cumartesi", "On Saturday, she does not work.", "Cumartesi günü çalışmaz.", "listen"),
        ("Sahne 4: Arkadaşlar", "She meets her friends.", "Arkadaşlarıyla buluşur."),
        ("Sahne 5: Park", "They go to the park.", "Parka giderler.",
         ("q", "Where do they go?", ["To the park", "To the cinema", "To school"], 0,
          "Mia ve arkadaşları cumartesi parka gidiyor.")),
    ], [
        ("The park is big.", "Park büyük.", "park", 5),
        ("She has a busy week.", "Yoğun bir haftası var.", "week", 1),
    ], ("What do you do on Saturday?", "On Saturday, I ...")),

    A1("my-favorite-food", "My Favorite Food", "food", 155, 4, [
        ("Sahne 1: Anne", "My mother asks a question.", "Annem bir soru sorar."),
        ("Sahne 2: Soru", "\"What is your favorite food?\"", "\"En sevdiğin yemek ne?\"", "listen"),
        ("Sahne 3: Pizza", "I say, \"I love pizza!\"", "\"Pizzayı çok severim!\" derim.", ("fill", "pizza", ["pasta", "soup"])),
        ("Sahne 4: Cuma", "On Friday, we make pizza.", "Cuma günü pizza yaparız."),
        ("Sahne 5: Lezzetli", "It is delicious and fun.", "Hem lezzetli hem eğlenceli.",
         ("tf", "They do not like the pizza.", False, "Pizza hem lezzetli hem eğlenceli; yani beğeniyorlar.")),
    ], [
        ("I like cheese.", "Peyniri severim.", "cheese", 3),
        ("The pizza is tasty.", "Pizza lezzetli.", "tasty", 5),
    ], ("What is your favorite food?", "My favorite food is ...")),

    A1("at-the-park", "At the Park", "nature", 156, 4, [
        ("Sahne 1: Güneş", "It is sunny today.", "Bugün hava güneşli."),
        ("Sahne 2: Park", "Noah and his dog go to the park.", "Noah ve köpeği parka gider.", "listen"),
        ("Sahne 3: Koşmak", "The dog runs fast.", "Köpek hızlı koşar."),
        ("Sahne 4: Top", "It plays with a yellow ball.", "Sarı bir topla oynar.",
         ("q", "What color is the ball?", ["Yellow", "Red", "Blue"], 0, "Köpek sarı (yellow) bir topla oynuyor.")),
        ("Sahne 5: Aferin", "Noah laughs and says, \"Good dog!\"", "Noah güler ve \"Aferin köpek!\" der.",
         ("tf", "Noah is angry.", False, "Noah gülüyor (laughs); kızgın değil.")),
    ], [
        ("Noah has a happy dog.", "Noah'nın mutlu bir köpeği var.", "happy", 2),
        ("The ball is yellow.", "Top sarı.", "yellow", 4),
    ], ("Do you like parks?", "Yes, I like parks because ...")),

    A1("my-bedroom", "My Bedroom", "home", 157, 4, [
        ("Sahne 1: Odam", "This is my bedroom.", "Bu benim yatak odam."),
        ("Sahne 2: Küçük Ama Güzel", "It is small, but I love it.", "Küçük ama onu seviyorum.", "listen"),
        ("Sahne 3: Mavi Yatak", "I have a blue bed.", "Mavi bir yatağım var."),
        ("Sahne 4: Beyaz Masa", "I have a white desk.", "Beyaz bir masam var.",
         ("tf", "The bed is blue.", True, "Üçüncü sahnede mavi (blue) bir yatağı olduğu söyleniyor.")),
        ("Sahne 5: Kitaplar", "There are many books on the shelf.", "Rafta birçok kitap var.",
         ("q", "Where are the books?", ["On the shelf", "On the bed", "On the desk"], 0, "Kitaplar rafta (on the shelf).")),
    ], [
        ("My bed is soft.", "Yatağım yumuşak.", "soft", 3),
        ("I read many books.", "Birçok kitap okurum.", "books", 5),
        ("The desk is white.", "Masa beyaz.", "desk", 4),
    ], ("What is in your bedroom?", "In my bedroom, there is ...")),

    A1("the-weather-today", "The Weather Today", "weather", 158, 4, [
        ("Sahne 1: Pencere", "I look out the window.", "Pencereden dışarı bakarım."),
        ("Sahne 2: Gri Gökyüzü", "The sky is grey today.", "Bugün gökyüzü gri.", "listen"),
        ("Sahne 3: Rüzgar", "The wind is strong.", "Rüzgar güçlü."),
        ("Sahne 4: Ceket", "I wear a warm jacket.", "Sıcak bir ceket giyerim."),
        ("Sahne 5: Şemsiye", "I take my umbrella, just in case.", "Her ihtimale karşı şemsiyemi alırım.",
         ("q", "Why does the person take an umbrella?", ["It may rain", "It is hot", "It is night"], 0,
          "'Just in case' yağmur yağabilir ihtimaline karşı demektir.")),
    ], [
        ("It is a cold day.", "Soğuk bir gün.", "cold", 2),
        ("I wear a jacket.", "Ceket giyerim.", "jacket", 4),
    ], ("How is the weather today?", "Today the weather is ...")),

    A1("my-best-friend", "My Best Friend", "friends", 159, 4, [
        ("Sahne 1: Mia", "My best friend is Mia.", "En iyi arkadaşım Mia."),
        ("Sahne 2: Özellikler", "She is funny and kind.", "O komik ve nazik.", ("fill", "kind", ["tall", "old"])),
        ("Sahne 3: Oyun", "We play games after school.", "Okuldan sonra oyun oynarız.", "listen"),
        ("Sahne 4: Yardım", "We help each other.", "Birbirimize yardım ederiz."),
        ("Sahne 5: Mutluluk", "We are always happy together.", "Birlikte her zaman mutluyuz.",
         ("tf", "They are sad together.", False, "Birlikte her zaman mutlular (happy).")),
    ], [
        ("Mia is my friend.", "Mia benim arkadaşım.", "friend", 1),
        ("We play every day.", "Her gün oynarız.", "play", 3),
    ], ("Who is your best friend?", "My best friend is ...")),

    A1("going-to-school", "Going to School", "school", 160, 4, [
        ("Sahne 1: Uyanmak", "I wake up at seven.", "Yedide uyanırım."),
        ("Sahne 2: Kahvaltı", "I eat my breakfast.", "Kahvaltımı yaparım.", "listen"),
        ("Sahne 3: Çanta", "I take my school bag.", "Okul çantamı alırım."),
        ("Sahne 4: Yol", "I walk to school with my brother.", "Kardeşimle yürüyerek okula giderim.",
         ("q", "Who walks to school with me?", ["My brother", "My sister", "My mother"], 0, "Kardeşiyle (my brother) yürüyor.")),
        ("Sahne 5: Süre", "It takes ten minutes.", "On dakika sürer.",
         ("tf", "It takes one hour.", False, "Yol on dakika sürüyor, bir saat değil.")),
    ], [
        ("I eat bread and milk.", "Ekmek ve süt yerim.", "bread", 2),
        ("My brother is kind.", "Kardeşim naziktir.", "brother", 4),
    ], ("How do you go to school or work?", "I go by ...")),

    A1("my-pet-cat", "My Pet Cat", "nature", 161, 4, [
        ("Sahne 1: Kedim", "I have a small cat.", "Küçük bir kedim var."),
        ("Sahne 2: Adı", "Her name is Pamuk.", "Adı Pamuk.", ("fill", "Pamuk", ["Mia", "Leo"])),
        ("Sahne 3: Tüyleri", "She is white and soft.", "O beyaz ve yumuşak.", "listen"),
        ("Sahne 4: Gece", "Every night, Pamuk sleeps with me.", "Her gece Pamuk benimle uyur."),
        ("Sahne 5: Yatak", "She sleeps on my bed.", "Yatağımda uyur.",
         ("q", "Where does the cat sleep?", ["On my bed", "On the sofa", "In the garden"], 0, "Kedi yatağın üstünde (on my bed) uyuyor.")),
    ], [
        ("My cat is cute.", "Kedim çok sevimli.", "cute", 1),
        ("She drinks milk.", "Süt içer.", "milk", 3),
    ], ("Do you have a pet?", "Yes, I have a ... / No, I do not have a pet.")),

    A1("a-birthday-cake", "A Birthday Cake", "friends", 162, 4, [
        ("Sahne 1: Doğum Günü", "Today is my sister's birthday.", "Bugün kız kardeşimin doğum günü."),
        ("Sahne 2: Yaş", "She is seven years old.", "O yedi yaşında.", ("fill", "seven", ["five", "ten"])),
        ("Sahne 3: Şarkı", "We sing \"Happy Birthday.\"", "\"İyi ki doğdun\" şarkısını söyleriz.", "listen"),
        ("Sahne 4: Mumlar", "She blows out the candles.", "Mumları üfler."),
        ("Sahne 5: Pasta", "The cake is chocolate.", "Pasta çikolatalı.",
         ("tf", "The cake is vanilla.", False, "Pasta çikolatalı (chocolate), vanilyalı değil.")),
    ], [
        ("I love chocolate cake.", "Çikolatalı pastayı severim.", "cake", 5),
        ("She has seven candles.", "Yedi mumu var.", "candles", 4),
    ], ("When is your birthday?", "My birthday is in ...")),

    A1("time-to-sleep", "Time to Sleep", "home", 163, 4, [
        ("Sahne 1: Dişler", "At nine o'clock, I brush my teeth.", "Saat dokuzda dişlerimi fırçalarım."),
        ("Sahne 2: Pijama", "I put on my pajamas.", "Pijamalarımı giyerim.", "listen"),
        ("Sahne 3: Hikaye", "My father reads me a story.", "Babam bana bir hikaye okur."),
        ("Sahne 4: Kısa Hikaye", "The story is short.", "Hikaye kısa.", ("fill", "short", ["long", "big"])),
        ("Sahne 5: İyi Geceler", "He says, \"Good night, sleep well.\"", "\"İyi geceler, iyi uykular\" der.",
         ("tf", "Dad says good morning.", False, "Baba \"Good night\" (iyi geceler) diyor.")),
    ], [
        ("I wear blue pajamas.", "Mavi pijama giyerim.", "pajamas", 2),
        ("Dad reads a story.", "Babam bir hikaye okur.", "story", 3),
        ("I sleep well.", "İyi uyurum.", "sleep", 5),
    ], ("What time do you go to sleep?", "I go to sleep at ...")),
]

assert len(PASSAGES) == 27
