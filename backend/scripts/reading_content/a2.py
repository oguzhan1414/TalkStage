"""A2 hikayeleri: 27 hikaye x 6 sahne. Bir sahne = bir kısa cümle (≤12 kelime).
Alıştırmalar karışık: cümle sıralama, dinle-seç, boşluk doldur, doğru/yanlış, anlama sorusu."""
from ._build import append_spell_scenes, build_passage as B

_BASE = 200  # A2 sort_order bloğu

PASSAGES = [
    B("weekend-in-the-mountains", "Weekend in the Mountains", "A2", "nature", _BASE + 1, 4, [
        ("Sahne 1: Erken Yola Çıkış", "On Saturday, Anna and Leo left home early.", "Cumartesi günü Anna ve Leo eve erken çıktılar."),
        ("Sahne 2: Patika", "They walked up a narrow path.", "Dar bir patikadan yukarı yürüdüler."),
        ("Sahne 3: Zirve", "At the top, the view was beautiful.", "Zirvede manzara çok güzeldi.", "listen"),
        ("Sahne 4: Piknik", "They sat on a rock and ate sandwiches.", "Bir kayanın üzerine oturup sandviç yediler."),
        ("Sahne 5: Gökyüzü", "Then the sky became dark.", "Sonra gökyüzü karardı.",
         ("tf", "The sky became bright.", False, "Gökyüzü karardı (became dark), aydınlanmadı.")),
        ("Sahne 6: Dönüş", "They went down before the rain started.", "Yağmur başlamadan önce aşağı indiler.",
         ("q", "Why did they go down?", ["It was going to rain", "They were hungry", "They were tired"], 0,
          "Gökyüzü karardı ve yağmur başlamadan inmek istediler.")),
    ], ("What do you like to do on weekends?", "On weekends, I like to ...")),

    B("a-new-neighbor", "A New Neighbor", "A2", "friends", _BASE + 2, 4, [
        ("Sahne 1: Kapıda", "A young woman knocked on Noah's door.", "Genç bir kadın Noah'ın kapısını çaldı."),
        ("Sahne 2: Tanışma", "She said, \"Hi, I'm Sofia, your new neighbor.\"", "\"Merhaba, ben Sofia, yeni komşunuzum\" dedi.", "listen"),
        ("Sahne 3: Davet", "Noah smiled and invited her for tea.", "Noah gülümsedi ve onu çaya davet etti."),
        ("Sahne 4: Sohbet", "They talked for an hour.", "Bir saat sohbet ettiler.",
         ("tf", "They talked for ten minutes.", False, "Bir saat (an hour) sohbet ettiler.")),
        ("Sahne 5: Yeni Şehir", "Sofia did not know anybody in the city.", "Sofia şehirde kimseyi tanımıyordu."),
        ("Sahne 6: Söz", "Noah promised to show her the neighborhood.", "Noah ona mahalleyi göstermeye söz verdi.",
         ("q", "What did Noah promise?", ["To show her the neighborhood", "To cook dinner", "To help her move"], 0,
          "Noah ona mahalleyi göstermeye söz verdi.")),
    ], ("Do you know your neighbors?", "Yes, I know ... / No, I don't know ...")),

    B("the-lost-wallet", "The Lost Wallet", "A2", "city", _BASE + 3, 4, [
        ("Sahne 1: Çanta", "Lucas looked in his bag.", "Lucas çantasına baktı."),
        ("Sahne 2: Cüzdan", "His wallet was gone.", "Cüzdanı yoktu."),
        ("Sahne 3: Kafe", "He walked back to the cafe.", "Kafeye geri yürüdü.", "listen"),
        ("Sahne 4: Garson", "The waiter smiled and held up a brown wallet.", "Garson gülümsedi ve kahverengi bir cüzdan gösterdi."),
        ("Sahne 5: İçindekiler", "Everything was still inside.", "Her şey hâlâ içindeydi.",
         ("tf", "The money was gone.", False, "Her şey hâlâ içindeydi; para da yerindeydi.")),
        ("Sahne 6: Teşekkür", "Lucas thanked the waiter and left a big tip.", "Lucas garsona teşekkür etti ve büyük bir bahşiş bıraktı.",
         ("q", "What did Lucas do at the end?", ["He left a big tip", "He called the police", "He bought a new wallet"], 0,
          "Son cümlede garsona teşekkür edip büyük bir bahşiş bıraktığı yazıyor.")),
    ], ("Have you ever lost something important?", "Yes, I lost my ...")),

    B("cooking-with-grandma", "Cooking with Grandma", "A2", "family", _BASE + 4, 4, [
        ("Sahne 1: Pazar", "Mia visits her grandmother every Sunday.", "Mia her pazar büyükannesini ziyaret eder."),
        ("Sahne 2: Malzemeler", "Today they need tomatoes and fresh bread.", "Bugün domatese ve taze ekmeğe ihtiyaçları var.", "listen"),
        ("Sahne 3: Sebzeler", "Mia cuts the vegetables.", "Mia sebzeleri doğrar."),
        ("Sahne 4: Çorba", "Her grandmother stirs the soup.", "Büyükannesi çorbayı karıştırır."),
        ("Sahne 5: Koku", "The whole house smells wonderful.", "Bütün ev harika kokar.",
         ("tf", "The house smells bad.", False, "Ev harika (wonderful) kokuyor.")),
        ("Sahne 6: Tarif", "Mia writes the recipe in her notebook.", "Mia tarifi defterine yazar.",
         ("q", "Why does Mia write in her notebook?", ["To remember the recipe", "To do homework", "To make a shopping list"], 0,
          "Tarifi hatırlamak için defterine yazıyor.")),
    ], ("Who cooks in your family?", "In my family, ... cooks.")),

    B("first-day-at-the-office", "First Day at the Office", "A2", "work", _BASE + 5, 4, [
        ("Sahne 1: Varış", "Daniel arrived at the office at eight thirty.", "Daniel ofise sekiz buçukta vardı."),
        ("Sahne 2: Masa", "His manager showed him his desk.", "Müdürü ona masasını gösterdi."),
        ("Sahne 3: Ekip", "He met five new colleagues.", "Beş yeni iş arkadaşıyla tanıştı.", "listen"),
        ("Sahne 4: Atmosfer", "Everyone was friendly.", "Herkes sıcakkanlıydı."),
        ("Sahne 5: Akşam", "At the end of the day, he felt tired but happy.", "Günün sonunda yorgun ama mutluydu.",
         ("tf", "Daniel felt sad at the end of the day.", False, "Daniel yorgun ama mutluydu.")),
        ("Sahne 6: Eve Dönüş", "He told his wife, \"I will like this job.\"", "Eşine \"Bu işi seveceğim\" dedi.",
         ("q", "What did Daniel think about the job?", ["He will like it", "He will quit", "It is boring"], 0,
          "Eşine bu işi seveceğini söylüyor.")),
    ], ("What was your first day at work or school like?", "My first day was ...")),

    B("a-rainy-saturday", "A Rainy Saturday", "A2", "weather", _BASE + 6, 3, [
        ("Sahne 1: Yağmur", "It rained all day, so Emma stayed home.", "Bütün gün yağmur yağdı, bu yüzden Emma evde kaldı."),
        ("Sahne 2: Sıcak Çikolata", "She made hot chocolate.", "Sıcak çikolata yaptı.", "listen"),
        ("Sahne 3: Kitap", "She opened a new book.", "Yeni bir kitap açtı."),
        ("Sahne 4: Film", "In the evening, her brother wanted a movie.", "Akşam erkek kardeşi bir film istedi."),
        ("Sahne 5: Komedi", "They chose a funny comedy.", "Komik bir komedi seçtiler.",
         ("tf", "They chose a scary film.", False, "Komik bir komedi (funny comedy) seçtiler.")),
        ("Sahne 6: Keyifli Gün", "Emma thought, \"Rainy days can be cozy.\"", "Emma \"Yağmurlu günler keyifli olabilir\" diye düşündü.",
         ("q", "What does Emma think about rainy days?", ["They can be cozy", "They are boring", "They are dangerous"], 0,
          "Emma yağmurlu günlerin keyifli (cozy) olabileceğini düşünüyor.")),
    ], ("What do you do on rainy days?", "On rainy days, I ...")),

    B("the-doctors-visit", "The Doctor's Visit", "A2", "health", _BASE + 7, 4, [
        ("Sahne 1: Rahatsızlık", "Max had a headache and a sore throat.", "Max'in başı ağrıyordu ve boğazı yanıyordu."),
        ("Sahne 2: Randevu", "He booked an appointment at the clinic.", "Klinikten randevu aldı."),
        ("Sahne 3: Muayene", "The doctor checked his throat.", "Doktor boğazına baktı.", "listen"),
        ("Sahne 4: Teşhis", "She said, \"You have a cold.\"", "\"Nezle olmuşsunuz\" dedi."),
        ("Sahne 5: Dinlenme", "Max must rest for two days.", "Max iki gün dinlenmeli.",
         ("tf", "Max must rest for ten days.", False, "Doktor iki gün (two days) dinlenmesini söyledi.")),
        ("Sahne 6: İlaç", "He must take the medicine twice a day.", "İlacı günde iki kez almalı.",
         ("q", "How often must Max take the medicine?", ["Twice a day", "Once a day", "Every hour"], 0,
          "İlaç günde iki kez (twice a day) alınacak.")),
    ], ("What do you do when you have a cold?", "When I have a cold, I ...")),

    B("shopping-for-new-shoes", "Shopping for New Shoes", "A2", "shopping", _BASE + 8, 4, [
        ("Sahne 1: Vitrin", "Lily saw red shoes in a shop window.", "Lily bir vitrinde kırmızı ayakkabılar gördü."),
        ("Sahne 2: Beden", "She asked for size thirty-eight.", "Otuz sekiz numara istedi."),
        ("Sahne 3: Küçük", "The shoes were nice, but too small.", "Ayakkabılar güzeldi ama fazla küçüktü.", "listen"),
        ("Sahne 4: Büyük Beden", "The seller brought a bigger size.", "Satıcı daha büyük bir numara getirdi."),
        ("Sahne 5: Tam Oldu", "This time, they fit perfectly.", "Bu sefer tam oldular.", ("fill", "perfectly", ["badly", "slowly"])),
        ("Sahne 6: İndirim", "They were on sale, so Lily paid forty euros.", "İndirimdeydiler, bu yüzden Lily kırk euro ödedi.",
         ("q", "Why was Lily happy?", ["The shoes fit and were on sale", "The shoes were free", "She found a job"], 0,
          "Ayakkabılar tam oldu ve indirimdeydi.")),
    ], ("Do you like shopping?", "Yes, I like shopping because ...")),

    B("a-train-to-the-coast", "A Train to the Coast", "A2", "travel", _BASE + 9, 4, [
        ("Sahne 1: İstasyon", "Eva and her friends waited at the station.", "Eva ve arkadaşları istasyonda bekledi."),
        ("Sahne 2: Kalkış", "The train left at ten.", "Tren ondan kalktı."),
        ("Sahne 3: Koltuklar", "The seats were comfortable.", "Koltuklar rahattı.", "listen"),
        ("Sahne 4: Manzara", "They saw green fields and small villages.", "Yeşil tarlalar ve küçük köyler gördüler."),
        ("Sahne 5: Süre", "After three hours, the train arrived at the coast.", "Üç saat sonra tren kıyıya vardı.",
         ("tf", "The trip took one hour.", False, "Yolculuk üç saat (three hours) sürdü.")),
        ("Sahne 6: Deniz", "Eva took off her shoes and ran to the water.", "Eva ayakkabılarını çıkardı ve suya koştu.",
         ("q", "Where did Eva run?", ["To the water", "To the station", "To a shop"], 0, "Eva suya (to the water) koştu.")),
    ], ("How do you like to travel?", "I like to travel by ...")),

    B("the-birthday-party", "The Birthday Party", "A2", "friends", _BASE + 10, 4, [
        ("Sahne 1: Doğum Günü", "Yesterday was Anna's birthday.", "Dün Anna'nın doğum günüydü."),
        ("Sahne 2: Sürpriz", "Her friends planned a surprise party.", "Arkadaşları sürpriz bir parti planladı."),
        ("Sahne 3: Saklanan Şeyler", "They hid balloons and a cake.", "Balonları ve bir pastayı sakladılar.", "listen"),
        ("Sahne 4: Kapı", "When Anna opened the door, everyone shouted.", "Anna kapıyı açınca herkes bağırdı."),
        ("Sahne 5: Kutlama", "\"Happy birthday!\" they said.", "\"İyi ki doğdun!\" dediler.", ("fill", "birthday", ["holiday", "morning"])),
        ("Sahne 6: Mutluluk", "Anna laughed and hugged everybody.", "Anna güldü ve herkese sarıldı.",
         ("q", "How did Anna feel?", ["Surprised and happy", "Angry and tired", "Sad and alone"], 0,
          "Anna şaşırdı, güldü ve herkese sarıldı; şaşkın ve mutluydu.")),
    ], ("How do you celebrate your birthday?", "I celebrate my birthday with ...")),

    B("learning-to-swim", "Learning to Swim", "A2", "hobbies", _BASE + 11, 4, [
        ("Sahne 1: Yaş", "Ben was thirty years old.", "Ben otuz yaşındaydı."),
        ("Sahne 2: Yüzememek", "He could not swim.", "Yüzmeyi bilmiyordu."),
        ("Sahne 3: Kurs", "He joined a class at the pool.", "Havuzda bir kursa katıldı.", "listen"),
        ("Sahne 4: Ders", "The teacher showed him how to float.", "Öğretmen ona suda nasıl kalacağını gösterdi."),
        ("Sahne 5: İlerleme", "After six weeks, Ben could swim one length.", "Altı hafta sonra Ben bir boy yüzebiliyordu.",
         ("tf", "Ben still cannot swim.", False, "Altı hafta sonra bir boy yüzebiliyordu.")),
        ("Sahne 6: Sevgi", "\"It was difficult, but now I love it.\"", "\"Zordu ama şimdi çok seviyorum.\"",
         ("q", "How does Ben feel now?", ["He loves swimming", "He hates swimming", "He is afraid"], 0,
          "Ben artık yüzmeyi çok seviyor.")),
    ], ("Is there something you want to learn?", "I want to learn ...")),

    B("the-broken-phone", "The Broken Phone", "A2", "technology", _BASE + 12, 4, [
        ("Sahne 1: Düşme", "Zoe dropped her phone on the floor.", "Zoe telefonunu yere düşürdü."),
        ("Sahne 2: Ekran", "The screen was cracked.", "Ekran çatlamıştı."),
        ("Sahne 3: Açılmıyor", "It would not turn on.", "Açılmıyordu.", "listen"),
        ("Sahne 4: Tamirci", "She took it to a repair shop.", "Onu bir tamirciye götürdü."),
        ("Sahne 5: Maliyet", "It took two days and cost sixty euros.", "İki gün sürdü ve altmış euro tuttu.",
         ("tf", "The repair was free.", False, "Tamir altmış euro (sixty euros) tuttu.")),
        ("Sahne 6: Kılıf", "Zoe bought a strong case for the phone.", "Zoe telefon için sağlam bir kılıf aldı.",
         ("q", "Why did Zoe buy a case?", ["To protect the phone", "To sell the phone", "To fix the screen"], 0,
          "Telefonu (tekrar kırılmaktan) korumak için sağlam bir kılıf aldı.")),
    ], ("Do you use your phone a lot?", "Yes, I use my phone for ...")),

    B("a-day-at-the-market", "A Day at the Market", "A2", "food", _BASE + 13, 4, [
        ("Sahne 1: Cumartesi", "Every Saturday, Nora goes to the market.", "Nora her cumartesi pazara gider."),
        ("Sahne 2: Meyveler", "She buys strawberries, apples, and oranges.", "Çilek, elma ve portakal alır."),
        ("Sahne 3: İndirim", "The seller gives her a small discount.", "Satıcı ona küçük bir indirim yapar.", "listen"),
        ("Sahne 4: Tazelik", "The food is fresher and cheaper there.", "Yiyecekler orada daha taze ve daha ucuz."),
        ("Sahne 5: Çiftçiler", "Nora likes talking to the farmers.", "Nora çiftçilerle konuşmayı sever.", ("fill", "farmers", ["doctors", "teachers"])),
        ("Sahne 6: Salata", "At home, she makes a big fruit salad.", "Evde büyük bir meyve salatası yapar.",
         ("q", "What does Nora make at home?", ["A fruit salad", "A soup", "A cake"], 0, "Evde büyük bir meyve salatası yapıyor.")),
    ], ("Where do you buy your food?", "I buy my food at ...")),

    B("moving-to-a-new-flat", "Moving to a New Flat", "A2", "home", _BASE + 14, 4, [
        ("Sahne 1: Kutular", "Tom packed his books into boxes.", "Tom kitaplarını kutulara doldurdu."),
        ("Sahne 2: Yardım", "His friends came to help him.", "Arkadaşları ona yardım etmeye geldi."),
        ("Sahne 3: Yeni Daire", "The new flat was small.", "Yeni daire küçüktü.", "listen"),
        ("Sahne 4: Pencere", "It had a big window.", "Büyük bir penceresi vardı."),
        ("Sahne 5: Pizza", "They ordered pizza in the evening.", "Akşam pizza sipariş ettiler.", ("fill", "pizza", ["salad", "soup"])),
        ("Sahne 6: Yerde", "They sat on the floor because the sofa had not arrived.", "Kanepe gelmediği için yere oturdular.",
         ("q", "Why did they sit on the floor?", ["The sofa had not arrived", "They liked the floor", "The chairs were broken"], 0,
          "Kanepe henüz gelmediği için yere oturdular.")),
    ], ("Where do you live?", "I live in ...")),

    B("the-school-trip", "The School Trip", "A2", "school", _BASE + 15, 4, [
        ("Sahne 1: Buluşma", "The students met in front of the school.", "Öğrenciler okulun önünde buluştu."),
        ("Sahne 2: Müze", "They visited the history museum.", "Tarih müzesini gezdiler."),
        ("Sahne 3: Sorular", "Ella asked many questions about old coins.", "Ella eski paralar hakkında birçok soru sordu.", "listen"),
        ("Sahne 4: Öğle Yemeği", "After the museum, they ate lunch in a park.", "Müzeden sonra bir parkta öğle yemeği yediler."),
        ("Sahne 5: Otobüs", "On the bus, some students fell asleep.", "Otobüste bazı öğrenciler uyuyakaldı.",
         ("tf", "Nobody was tired on the bus.", False, "Bazı öğrenciler otobüste uyuyakaldı.")),
        ("Sahne 6: Karar", "Ella decided to write a report.", "Ella bir rapor yazmaya karar verdi.",
         ("q", "What did Ella decide to do?", ["Write a report", "Sleep on the bus", "Visit the museum again"], 0,
          "Ella bir rapor yazmaya karar verdi.")),
    ], ("What was your favorite school trip?", "My favorite trip was to ...")),

    B("my-first-job-interview", "My First Job Interview", "A2", "work", _BASE + 16, 4, [
        ("Sahne 1: Gömlek", "Jack ironed his shirt.", "Jack gömleğini ütüledi."),
        ("Sahne 2: Hazırlık", "He read about the company.", "Şirket hakkında okudu."),
        ("Sahne 3: Erken", "He arrived ten minutes early.", "On dakika erken geldi.", "listen"),
        ("Sahne 4: Soru", "The manager asked, \"Why do you want this job?\"", "Müdür \"Bu işi neden istiyorsun?\" diye sordu."),
        ("Sahne 5: Cevap", "Jack said he likes working with people.", "Jack insanlarla çalışmayı sevdiğini söyledi.", ("fill", "people", ["animals", "computers"])),
        ("Sahne 6: Telefon", "The company will call him on Friday.", "Şirket onu Cuma günü arayacak.",
         ("q", "When will they call Jack?", ["On Friday", "Tomorrow morning", "Next month"], 0, "Cuma günü (on Friday) arayacaklar.")),
    ], ("How do you feel before an important meeting?", "I feel ...")),

    B("at-the-airport", "At the Airport", "A2", "travel", _BASE + 17, 4, [
        ("Sahne 1: Check-in", "Maya checked in her suitcase.", "Maya valizini teslim etti."),
        ("Sahne 2: Güvenlik", "Then she walked through security.", "Sonra güvenlikten geçti."),
        ("Sahne 3: Kapı", "Her flight was leaving from gate twelve.", "Uçuşu on iki numaralı kapıdan kalkıyordu.", "listen"),
        ("Sahne 4: Mesaj", "A message said the flight was delayed.", "Bir mesaj uçuşun rötar yaptığını söyledi."),
        ("Sahne 5: Sakin", "Maya was not angry.", "Maya kızmadı.", ("tf", "Maya was very angry.", False, "Maya kızmadı (was not angry).")),
        ("Sahne 6: Bekleme", "She bought a coffee and read a magazine.", "Bir kahve aldı ve bir dergi okudu.",
         ("q", "What did Maya do while waiting?", ["She read a magazine", "She went home", "She slept"], 0, "Kahve alıp dergi okudu.")),
    ], ("What do you do while waiting at an airport?", "While I wait, I ...")),

    B("a-picnic-by-the-lake", "A Picnic by the Lake", "A2", "nature", _BASE + 18, 3, [
        ("Sahne 1: Sepet", "On Sunday, the family packed a picnic basket.", "Pazar günü aile bir piknik sepeti hazırladı."),
        ("Sahne 2: Yer", "They found a quiet place near the lake.", "Göl yakınında sessiz bir yer buldular."),
        ("Sahne 3: Oyun", "The children played games.", "Çocuklar oyun oynadı.", "listen"),
        ("Sahne 4: Güneş", "The sun was warm.", "Güneş sıcaktı."),
        ("Sahne 5: Temizlik", "At five, they cleaned the area.", "Saat beşte alanı temizlediler.",
         ("tf", "They left rubbish on the grass.", False, "Alanı temizlediler ve çöpleri götürdüler.")),
        ("Sahne 6: Doğa", "Dad said, \"We must keep nature clean.\"", "Babaları \"Doğayı temiz tutmalıyız\" dedi.",
         ("q", "What did the family do before leaving?", ["They cleaned the area", "They went swimming", "They bought ice cream"], 0,
          "Ayrılmadan önce alanı temizlediler.")),
    ], ("Do you like spending time in nature?", "Yes, I like ... in nature.")),

    B("the-wrong-bus", "The Wrong Bus", "A2", "city", _BASE + 19, 4, [
        ("Sahne 1: Acele", "Leo was late, so he jumped on a bus.", "Leo geç kalmıştı, bu yüzden bir otobüse atladı."),
        ("Sahne 2: Garip Sokaklar", "After ten minutes, he saw strange streets.", "On dakika sonra tanımadığı sokaklar gördü."),
        ("Sahne 3: Soru", "He asked the driver about downtown.", "Şoföre şehir merkezini sordu.", "listen"),
        ("Sahne 4: Cevap", "The driver laughed and said, \"This bus goes to the airport.\"", "Şoför güldü ve \"Bu otobüs havalimanına gidiyor\" dedi."),
        ("Sahne 5: İniş", "Leo got off at the next stop.", "Leo bir sonraki durakta indi.",
         ("tf", "Leo stayed on the bus.", False, "Leo bir sonraki durakta indi.")),
        ("Sahne 6: Doğru Otobüs", "He took the correct bus and arrived late.", "Doğru otobüse bindi ve geç vardı.",
         ("q", "Where did the first bus go?", ["To the airport", "Downtown", "To the beach"], 0, "Şoför ilk otobüsün havalimanına gittiğini söyledi.")),
    ], ("Have you ever taken the wrong bus or train?", "Yes, once I ...")),

    B("a-new-hobby", "A New Hobby", "A2", "hobbies", _BASE + 20, 4, [
        ("Sahne 1: Fikir", "Nora wanted a hobby after work.", "Nora işten sonra bir hobi istiyordu."),
        ("Sahne 2: Malzeme", "She bought paper, brushes, and bright colors.", "Kağıt, fırça ve canlı renkler aldı."),
        ("Sahne 3: İlk Resim", "Her first painting was a blue house.", "İlk resmi mavi bir evdi.", "listen"),
        ("Sahne 4: Mükemmel Değil", "The painting was not perfect.", "Resim mükemmel değildi."),
        ("Sahne 5: Huzur", "But Nora felt calm and happy.", "Ama Nora sakin ve mutlu hissetti.", ("fill", "calm", ["angry", "bored"])),
        ("Sahne 6: Satış", "Last month, she sold a picture for twenty euros.", "Geçen ay bir resmini yirmi euroya sattı.",
         ("q", "What did Nora do last month?", ["She sold a picture", "She bought a house", "She stopped painting"], 0,
          "Geçen ay bir resmini yirmi euroya sattı.")),
    ], ("What hobby would you like to try?", "I would like to try ...")),

    B("the-cinema-night", "The Cinema Night", "A2", "friends", _BASE + 21, 4, [
        ("Sahne 1: Davet", "Sam invited three friends to the cinema.", "Sam üç arkadaşını sinemaya davet etti."),
        ("Sahne 2: Biletler", "He bought the tickets online.", "Biletleri internetten aldı."),
        ("Sahne 3: Film", "The movie was long, but everyone enjoyed it.", "Film uzundu ama herkes beğendi.", "listen"),
        ("Sahne 4: Restoran", "Afterwards, they went to a small restaurant.", "Sonrasında küçük bir restorana gittiler."),
        ("Sahne 5: Son", "They agreed that the ending was surprising.", "Sonun şaşırtıcı olduğunda hemfikirdiler.", ("fill", "surprising", ["boring", "sad"])),
        ("Sahne 6: Gelecek", "Next time, Sam wants to choose a comedy.", "Bir dahaki sefere Sam bir komedi seçmek istiyor.",
         ("q", "What does Sam want next time?", ["A comedy", "A horror film", "A cartoon"], 0, "Bir dahaki sefere komedi seçmek istiyor.")),
    ], ("What kind of movies do you like?", "I like ... movies.")),

    B("help-with-homework", "Help with Homework", "A2", "school", _BASE + 22, 4, [
        ("Sahne 1: Zor Problem", "Lily could not solve her math problem.", "Lily matematik problemini çözemedi."),
        ("Sahne 2: Abla", "Her older sister sat next to her.", "Ablası yanına oturdu."),
        ("Sahne 3: Adımlar", "She explained each step slowly.", "Her adımı yavaşça açıkladı.", "listen"),
        ("Sahne 4: Anlamak", "Suddenly, Lily understood the idea.", "Birden Lily fikri anladı."),
        ("Sahne 5: Tek Başına", "She solved three more problems alone.", "Üç problemi daha tek başına çözdü.",
         ("tf", "Lily needed help for every problem.", False, "Sonraki üç problemi tek başına çözdü.")),
        ("Sahne 6: Teşekkür", "\"You explain better than my teacher!\"", "\"Öğretmenimden daha iyi anlatıyorsun!\"",
         ("q", "What does Lily say about her sister?", ["She explains better than the teacher", "She is a bad teacher", "She is too fast"], 0,
          "Lily ablasının öğretmeninden daha iyi anlattığını söylüyor.")),
    ], ("Who helps you when you study?", "... helps me when I study.")),

    B("the-coffee-shop", "The Coffee Shop", "A2", "food", _BASE + 23, 3, [
        ("Sahne 1: Sipariş", "Eva ordered a latte and a muffin.", "Eva bir latte ve bir kek sipariş etti."),
        ("Sahne 2: Masa", "She found a table near the window.", "Pencere yanında bir masa buldu."),
        ("Sahne 3: Çalışma", "She opened her laptop and started to write.", "Dizüstü bilgisayarını açtı ve yazmaya başladı.", "listen"),
        ("Sahne 4: Şifre", "A man asked her about the Wi-Fi password.", "Bir adam ona Wi-Fi şifresini sordu."),
        ("Sahne 5: Kitapçı", "He told her about a great bookshop nearby.", "Ona yakındaki harika bir kitapçıdan bahsetti.", ("fill", "bookshop", ["cinema", "bakery"])),
        ("Sahne 6: Adres", "Eva wrote the address in her phone.", "Eva adresi telefonuna yazdı.",
         ("q", "What did Eva write in her phone?", ["The address", "A story", "A shopping list"], 0, "Kitapçının adresini telefonuna yazdı.")),
    ], ("Do you like working or studying in cafes?", "Yes, I like it because ...")),

    B("a-snowy-morning", "A Snowy Morning", "A2", "weather", _BASE + 24, 3, [
        ("Sahne 1: Kar", "Ben woke up and saw snow outside.", "Ben uyandı ve dışarıda kar gördü."),
        ("Sahne 2: Giyinmek", "He put on his warm coat and boots.", "Sıcak montunu ve botlarını giydi."),
        ("Sahne 3: Kardan Adam", "In the garden, he built a snowman.", "Bahçede bir kardan adam yaptı.", "listen"),
        ("Sahne 4: Kız Kardeş", "His sister helped him.", "Kız kardeşi ona yardım etti."),
        ("Sahne 5: Üşümek", "After one hour, their hands were cold.", "Bir saat sonra elleri üşüdü.", ("fill", "cold", ["warm", "dry"])),
        ("Sahne 6: İçeride", "They went inside, and Mom gave them hot milk.", "İçeri girdiler ve annesi onlara sıcak süt verdi.",
         ("q", "Why did they go inside?", ["Their hands were cold", "It started to rain", "They were hungry for pizza"], 0,
          "Elleri üşüdüğü için içeri girdiler.")),
    ], ("Do you like snow?", "Yes, I like snow because ...")),

    B("the-lost-dog", "The Lost Dog", "A2", "city", _BASE + 25, 4, [
        ("Sahne 1: Kaçış", "Nora's little dog ran out of the garden.", "Nora'nın küçük köpeği bahçeden dışarı koştu."),
        ("Sahne 2: Arama", "She searched the street.", "Sokağı aradı."),
        ("Sahne 3: Komşular", "She asked the neighbors.", "Komşulara sordu.", "listen"),
        ("Sahne 4: İlan", "Then she made posters with a photo.", "Sonra fotoğraflı ilanlar hazırladı."),
        ("Sahne 5: Telefon", "That evening, her phone rang.", "O akşam telefonu çaldı.",
         ("tf", "Nobody called Nora.", False, "O akşam telefonu çaldı.")),
        ("Sahne 6: Park", "A boy found the dog in the park.", "Bir çocuk köpeği parkta buldu.",
         ("q", "Where did the boy find the dog?", ["In the park", "At the station", "At school"], 0, "Çocuk köpeği parkta (in the park) buldu.")),
    ], ("Do you have a pet?", "Yes, I have a ... / No, but I want a ...")),

    B("a-phone-call-home", "A Phone Call Home", "A2", "family", _BASE + 26, 3, [
        ("Sahne 1: Uzakta", "Daniel studies in another country.", "Daniel başka bir ülkede okuyor."),
        ("Sahne 2: Pazar", "Every Sunday, he calls his parents.", "Her pazar ebeveynlerini arar."),
        ("Sahne 3: Dersler", "He tells them about his classes.", "Onlara derslerinden bahseder.", "listen"),
        ("Sahne 4: Anne", "His mother asks, \"Are you eating well?\"", "Annesi \"İyi besleniyor musun?\" diye sorar."),
        ("Sahne 5: Baba", "His father asks about the weather.", "Babası havayı sorar.",
         ("tf", "His father asks about the food.", False, "Babası havayı (weather) sorar.")),
        ("Sahne 6: Özlem", "After the call, Daniel feels close to home.", "Görüşmeden sonra Daniel kendini eve yakın hisseder.",
         ("q", "How does Daniel feel after the call?", ["Close to home", "Angry", "Very tired"], 0, "Daniel kendini eve yakın hissediyor.")),
    ], ("Who do you call most often?", "I call ... most often.")),

    B("planning-the-holiday", "Planning the Holiday", "A2", "travel", _BASE + 27, 4, [
        ("Sahne 1: Temmuz", "Anna and Leo wanted a holiday in July.", "Anna ve Leo temmuzda bir tatil istedi."),
        ("Sahne 2: Dağlar", "Anna liked the mountains.", "Anna dağları sevdi."),
        ("Sahne 3: Plaj", "Leo preferred the beach.", "Leo plajı tercih etti.", "listen"),
        ("Sahne 4: Araştırma", "They compared prices and read hotel reviews.", "Fiyatları karşılaştırdılar ve otel yorumları okudular."),
        ("Sahne 5: Otel", "They found a hotel near the sea.", "Deniz yakınında bir otel buldular.", ("fill", "hotel", ["museum", "school"])),
        ("Sahne 6: Rezervasyon", "They booked seven nights.", "Yedi gece rezervasyon yaptılar.",
         ("q", "How many nights did they book?", ["Seven", "Three", "Ten"], 0, "Yedi gece (seven nights) rezervasyon yaptılar.")),
    ], ("Where would you like to go on holiday?", "I would like to go to ...")),
]

assert len(PASSAGES) == 27

# Her A2 hikayesinin sonuna 2-3 ayrı "Kelime Avı" sahnesi (harflere dokunarak kelime yaz).
# (cümle_en, çeviri_tr, kelime, görseli kullanılacak mevcut sahne no)
SPELLS = {
    "weekend-in-the-mountains": [
        ("We climb the mountain.", "Dağa tırmanırız.", "mountain", 2),
        ("The view is great.", "Manzara harika.", "view", 3),
        ("Rain is coming soon.", "Yağmur yakında geliyor.", "rain", 6),
    ],
    "a-new-neighbor": [
        ("She is my new neighbor.", "O benim yeni komşum.", "neighbor", 2),
        ("Noah makes hot tea.", "Noah sıcak çay yapar.", "tea", 3),
    ],
    "the-lost-wallet": [
        ("The wallet is brown.", "Cüzdan kahverengi.", "wallet", 4),
        ("He thanks the waiter.", "Garsona teşekkür eder.", "waiter", 6),
        ("Lucas loves this cafe.", "Lucas bu kafeyi sever.", "cafe", 3),
    ],
    "cooking-with-grandma": [
        ("Grandma makes tasty soup.", "Büyükanne lezzetli çorba yapar.", "soup", 4),
        ("Mia cuts fresh vegetables.", "Mia taze sebze doğrar.", "fresh", 3),
    ],
    "first-day-at-the-office": [
        ("The new office is big.", "Yeni ofis büyük.", "office", 1),
        ("He meets his manager.", "Müdürüyle tanışır.", "manager", 2),
        ("Everyone is very friendly.", "Herkes çok sıcakkanlı.", "friendly", 4),
    ],
    "a-rainy-saturday": [
        ("Today is a rainy Saturday.", "Bugün yağmurlu bir cumartesi.", "rainy", 1),
        ("She reads a new book.", "Yeni bir kitap okur.", "book", 3),
    ],
    "the-doctors-visit": [
        ("Max has a headache.", "Max'in başı ağrıyor.", "headache", 1),
        ("The doctor is kind.", "Doktor nazik.", "doctor", 3),
        ("He takes the medicine.", "İlacı alır.", "medicine", 6),
    ],
    "shopping-for-new-shoes": [
        ("The shoes are red.", "Ayakkabılar kırmızı.", "shoes", 1),
        ("The seller is helpful.", "Satıcı yardımsever.", "seller", 4),
    ],
    "a-train-to-the-coast": [
        ("The train is fast.", "Tren hızlı.", "train", 2),
        ("We wait at the station.", "İstasyonda bekleriz.", "station", 1),
        ("The sea is blue.", "Deniz mavi.", "sea", 6),
    ],
    "the-birthday-party": [
        ("Anna loves balloons.", "Anna balonları sever.", "balloons", 3),
        ("The cake is big.", "Pasta büyük.", "cake", 3),
    ],
    "learning-to-swim": [
        ("Ben learns to swim.", "Ben yüzmeyi öğreniyor.", "swim", 2),
        ("The pool is blue.", "Havuz mavi.", "pool", 3),
    ],
    "the-broken-phone": [
        ("The screen is broken.", "Ekran kırık.", "screen", 2),
        ("She buys a case.", "Bir kılıf alır.", "case", 6),
    ],
    "a-day-at-the-market": [
        ("The apples are fresh.", "Elmalar taze.", "apples", 2),
        ("The farmer is friendly.", "Çiftçi sıcakkanlı.", "farmer", 5),
        ("Nora makes fruit salad.", "Nora meyve salatası yapar.", "salad", 6),
    ],
    "moving-to-a-new-flat": [
        ("Tom packs his boxes.", "Tom kutularını hazırlar.", "boxes", 1),
        ("The flat is small.", "Daire küçük.", "flat", 3),
    ],
    "the-school-trip": [
        ("We visit the museum.", "Müzeyi geziyoruz.", "museum", 2),
        ("Ella likes history.", "Ella tarihi sever.", "history", 2),
    ],
    "my-first-job-interview": [
        ("Jack reads about the company.", "Jack şirket hakkında okur.", "company", 2),
        ("He wears a clean shirt.", "Temiz bir gömlek giyer.", "shirt", 1),
    ],
    "at-the-airport": [
        ("Maya has a suitcase.", "Maya'nın bir valizi var.", "suitcase", 1),
        ("The flight is late.", "Uçuş gecikmeli.", "flight", 4),
    ],
    "a-picnic-by-the-lake": [
        ("The lake is quiet.", "Göl sessiz.", "lake", 2),
        ("The family has a basket.", "Ailenin bir sepeti var.", "basket", 1),
    ],
    "the-wrong-bus": [
        ("Leo takes the bus.", "Leo otobüse biner.", "bus", 1),
        ("The streets are strange.", "Sokaklar tanıdık değil.", "streets", 2),
    ],
    "a-new-hobby": [
        ("Nora loves painting.", "Nora resim yapmayı sever.", "painting", 3),
        ("She buys bright colors.", "Canlı renkler alır.", "colors", 2),
    ],
    "the-cinema-night": [
        ("Sam buys the tickets.", "Sam biletleri alır.", "tickets", 2),
        ("The movie is long.", "Film uzun.", "movie", 3),
    ],
    "help-with-homework": [
        ("Lily does her homework.", "Lily ödevini yapar.", "homework", 1),
        ("Her sister explains slowly.", "Ablası yavaşça anlatır.", "sister", 3),
    ],
    "the-coffee-shop": [
        ("Eva drinks a latte.", "Eva bir latte içer.", "latte", 1),
        ("She opens her laptop.", "Dizüstü bilgisayarını açar.", "laptop", 3),
    ],
    "a-snowy-morning": [
        ("It is a snowy day.", "Karlı bir gün.", "snowy", 1),
        ("Ben builds a snowman.", "Ben kardan adam yapar.", "snowman", 3),
        ("Mom makes hot milk.", "Annesi sıcak süt yapar.", "milk", 6),
    ],
    "the-lost-dog": [
        ("The little dog is lost.", "Küçük köpek kayıp.", "little", 1),
        ("Nora makes posters.", "Nora ilanlar hazırlar.", "posters", 4),
    ],
    "a-phone-call-home": [
        ("Daniel calls his parents.", "Daniel ebeveynlerini arar.", "parents", 2),
        ("He studies in another country.", "Başka bir ülkede okuyor.", "country", 1),
    ],
    "planning-the-holiday": [
        ("They plan a holiday.", "Bir tatil planlarlar.", "holiday", 1),
        ("The hotel is near the sea.", "Otel denize yakın.", "hotel", 5),
        ("They book seven nights.", "Yedi gece ayırtırlar.", "nights", 6),
    ],
}

for _passage in PASSAGES:
    append_spell_scenes(_passage, SPELLS[_passage["slug"]])
