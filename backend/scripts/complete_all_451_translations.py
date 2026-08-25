import json
import re

with open(r"D:\ingilizce\backend\scripts\all_turns_en.json", "r", encoding="utf-8") as f:
    all_turns = json.load(f)

# Load existing translations
import generate_translations_map
from build_full_translations_data import b1_b2_translations

existing_map = {**generate_translations_map.tr_translations, **b1_b2_translations}

# Precise extra translations for the 55 edge cases & outros
extra_translations = {
    # Outros with quotes or special formats:
    'Great job! Notice how Emma used "Could I please have..." to order politely. Now practice saying: "Could I have a coffee, please?"': 'Harika iş! Emma\'nın kibarca sipariş vermek için "Could I please have..." kalıbını nasıl kullandığına dikkat edin. Şimdi siz de pratik yapın: "Could I have a coffee, please?"',
    'Excellent! Remember: With \'he\' and \'she\', we say "He wakes up" and "She rides her bike." What is your morning routine?': 'Mükemmel! Unutmayın: \'he\' ve \'she\' ile "He wakes up" ve "She rides her bike" deriz. Sizin sabah rutininiz nedir?',
    'Notice the useful phrases: "Walk straight down", "Turn left", and "Opposite the park". Try asking for directions today!': 'Faydalı ifadelere dikkat edin: "Walk straight down", "Turn left" ve "Opposite the park". Bugün yol tarifi sorma pratiği yapın!',
    'Notice the classic phrase: "I would like the grilled chicken, please." Use "I would like..." whenever you order food!': 'Klasik kalıba dikkat edin: "I would like the grilled chicken, please." Ne zaman yemek siparişi verirseniz "I would like..." kullanın!',
    'Did you catch the past regular verbs? "Walked", "cooked", and "watched". Practice talking about your yesterday!': 'Geçmiş zaman düzenli fiillerini yakaladınız mı? "Walked", "cooked" ve "watched". Dününüz hakkında konuşma pratiği yapın!',
    'Short and friendly! "Nice to meet you" is the best way to greet someone new. Practice introducing yourself today!': 'Kısa ve samimi! "Nice to meet you" yeni biriyle selamlaşmanın en iyi yoludur. Bugün kendinizi tanıtma pratiği yapın!',
    'Key questions to remember: "Where can I find...?" and "How much are the apples?" Very useful for everyday shopping!': 'Hatırlanması gereken anahtar sorular: "Where can I find...?" ve "How much are the apples?". Günlük alışveriş için çok faydalı!',
    'Remember: We say "He works", "She likes", and "His name is". How would you describe your family in English?': 'Unutmayın: "He works", "She likes" ve "His name is" deriz. Ailenizi İngilizce nasıl tarif ederdiniz?',
    'Useful phrases when you are sick: "I have a headache", "I have a cold", and "Take after meals". Stay healthy!': 'Hasta olduğunuzda faydalı ifadeler: "I have a headache", "I have a cold" ve "Take after meals". Sağlıkla kalın!',
    'Congratulations on completing the A1 series! Practice spelling your name and saying your phone number in English!': 'A1 serisini tamamladığınız için tebrikler! İsminizi heceleme ve telefon numaranızı İngilizce söyleme pratiği yapın!',

    'Notice how Rachel asked: "Would it be possible to get a window seat?" A great polite structure for A2 learners!': 'Rachel\'ın "Would it be possible to get a window seat?" diye nasıl sorduğuna dikkat edin. A2 öğrencileri için harika bir nezaket yapısı!',
    'Great listening! Practice asking: "Could you please tell me what time breakfast is served?"': 'Harika dinleme! Pratik yapın: "Could you please tell me what time breakfast is served?"',
    'Notice: "Do you have this in a medium?" and "What is your return policy?" Excellent phrases for your next shopping trip!': 'Dikkat edin: "Do you have this in a medium?" ve "What is your return policy?" Bir sonraki alışverişiniz için mükemmel kalıplar!',
    'Notice the modal verb \'should\' for advice: "You should drink warm tea" and "You shouldn\'t drink cold beverages."': 'Tavsiye için \'should\' modal fiiline dikkat edin: "You should drink warm tea" ve "You shouldn\'t drink cold beverages."',
    'Look at the superlative structures: "the most breathtaking" and "the largest screen". Practice comparing things you like!': 'Üstünlük yapılarına bakın: "the most breathtaking" ve "the largest screen". Sevdiğiniz şeyleri kıyaslama pratiği yapın!',
    'Key comparative phrase: "The SUV is more spacious than the compact car." Practice renting a vehicle in English!': 'Anahtar karşılaştırma cümlesi: "The SUV is more spacious than the compact car." İngilizce araç kiralama pratiği yapın!',
    'Did you hear the past continuous: "My phone froze while I was installing the update"? Very natural for tech support calls!': 'Geçmiş sürekli zamanı duydunuz mu: "My phone froze while I was installing the update"? Teknik destek aramaları için çok doğal!',
    'Notice the quantifier usage: "a few fresh tomatoes" (countable) and "a little parmesan cheese" (uncountable). Great job!': 'Miktar belirteçlerine dikkat edin: "a few fresh tomatoes" ve "a little parmesan cheese". Harika iş!',
    'Notice the First Conditional: "If we book today, we will get a discount." Great grammar integration for A2!': 'Birinci Şart Cümlesine dikkat edin: "If we book today, we will get a discount." A2 için harika bir dilbilgisi entegrasyonu!',
    'Congratulations on completing the A2 series! Practice summarizing your skills using "I have built..." and "I can code in..."!': 'A2 serisini tamamladığınız için tebrikler! Yeteneklerinizi "I have built..." ve "I can code in..." kullanarak özetleme pratiği yapın!',

    'Notice Alex\'s use of the Present Perfect Continuous: "I have been working as a growth specialist." A powerful structure for job interviews!': 'Alex\'in Present Perfect Continuous kullanımına dikkat edin: "I have been working as a growth specialist." İş mülakatları için çok güçlü bir yapı!',
    'Important vocabulary to remember: "security deposit", "lease agreement", and "utilities included". Very practical for living abroad!': 'Hatırlanması gereken önemli kelimeler: "security deposit", "lease agreement" ve "utilities included". Yurtdışında yaşam için çok pratik!',
    'Notice the passive voice: "Your bag was loaded onto the subsequent flight." Practice reporting customer service issues in English!': 'Edilgen çatıya dikkat edin: "Your bag was loaded onto the subsequent flight." İngilizce müşteri hizmetleri şikayetlerini bildirme pratiği yapın!',
    'Did you notice the second conditional: "If I didn\'t automate my tests, I would spend hours"? Great structure for discussing hypothetical situations!': 'İkinci Şart Cümlesini fark ettiniz mi: "If I didn\'t automate my tests, I would spend hours"? Varsayımsal durumları konuşmak için harika bir yapı!',
    'Notice the practical verbs: "stop buying single-use plastic" and "started commuting by bicycle". What green habits do you practice?': 'Pratik fiillere dikkat edin: "stop buying single-use plastic" ve "started commuting by bicycle". Siz hangi yeşil alışkanlıkları uyguluyorsunuz?',
    'Key banking phrases: "checking account", "proof of address", and "monthly maintenance fee". Essential for working abroad!': 'Anahtar bankacılık ifadeleri: "checking account", "proof of address" ve "monthly maintenance fee". Yurtdışında çalışmak için vazgeçilmez!',
    'Notice how they contrasted ideas using "used to enjoy", "whereas", and "on the other hand". Which lifestyle do you prefer?': 'Fikirleri "used to enjoy", "whereas" ve "on the other hand" ile nasıl kıyasladıklarına dikkat edin. Siz hangi yaşam tarzını tercih edersiniz?',
    'Notice the phrasal verbs: "reach out to", "set up", and "figure out". Essential for modern tech and event management!': 'Deyimsel fiillere dikkat edin: "reach out to", "set up" ve "figure out". Modern teknoloji ve etkinlik yönetimi için çok önemli!',
    'Professional phrases for conflict resolution: "I completely understand your frustration" and "I sincerely apologize for the disruption."': 'Anlaşmazlık çözümü için profesyonel kalıplar: "I completely understand your frustration" ve "I sincerely apologize for the disruption."',
    'Congratulations on completing the B1 intermediate series! You have learned professional workplace, academic, and everyday conversational English!': 'B1 orta seviye serisini tamamladığınız için tebrikler! Profesyonel iş yeri, akademik ve günlük konuşma İngilizcesini öğrendiniz!',

    'Notice the advanced inversion: "Not only does AI accelerate boilerplate, but it also empowers engineers." Master level B2 syntax!': 'İleri düzey devrik yapıya dikkat edin: "Not only does AI accelerate boilerplate, but it also empowers engineers." Usta seviyesi B2 sözdizimi!',
    'Notice the sophisticated discourse markers: "Notwithstanding the adoption..." and "whereas decentralized microgrids...". High-level B2 prose!': 'Gelişmiş söylem belirteçlerine dikkat edin: "Notwithstanding the adoption..." ve "whereas decentralized microgrids...". Üst düzey B2 anlatımı!',
    'Notice the professional financial metrics: "LTV-to-CAC ratio", "annual recurring revenue", and the inversion "Were you to face aggressive pricing..."!': 'Profesyonel finansal metriklere dikkat edin: "LTV-to-CAC ratio", "annual recurring revenue" ve devrik yapı "Were you to face aggressive pricing..."!',
    'Notice the past regret: "We should have enforced security keys; this breach could have been prevented." High-stakes B2 corporate communication!': 'Geçmiş pişmanlık kalıbına dikkat edin: "We should have enforced security keys; this breach could have been prevented." Yüksek riskli B2 kurumsal iletişimi!',
    'Notice the participle clause: "Combining LiDAR point clouds, radar telemetry, and camera feeds, the engine constructs a 3D grid." Pure technical English!': 'Bağlaçlı yan cümleye dikkat edin: "Combining LiDAR point clouds, radar telemetry, and camera feeds, the engine constructs a 3D grid." Saf teknik İngilizce!',
    'Notice the formal Subjunctive: "It is imperative that all customer telemetry remain our property." Essential for legal and corporate negotiations!': 'Resmi İsteme Kipine dikkat edin: "It is imperative that all customer telemetry remain our property." Hukuk ve kurumsal müzakereler için vazgeçilmez!',
    'Notice the participle phrase: "Operating in a perpetual state of hyper-connectivity..." and the inversion "Seldom do employees burn out from technical problems."': 'Bağlaçlı ifadeye dikkat edin: "Operating in a perpetual state of hyper-connectivity..." ve devrik cümle "Seldom do employees burn out from technical problems."',
    'Notice the relative clause with preposition: "molecular scissors through which pathogenic mutations are excised." Masterful scientific English!': 'Edatlı ilgi cümleciğine dikkat edin: "molecular scissors through which pathogenic mutations are excised." Usta işi bilimsel İngilizce!',
    'Look at the future in the past: "We knew that remote work would prevail." Notice how Julian structures persuasive, executive-level arguments!': 'Geçmişteki geleceğe bakın: "We knew that remote work would prevail." Julian\'ın ikna edici yönetici düzeyinde argümanları nasıl yapılandırdığına dikkat edin!',
    'Congratulations on completing the entire B2 Upper-Intermediate series! You now have a complete, professional, and intellectually rich English listening foundation!': 'Tüm B2 İleri Seviye serisini tamamladığınız için tebrikler! Artık eksiksiz, profesyonel ve entelektüel açıdan zengin bir İngilizce dinleme temeline sahipsiniz!',

    # A1_POD06 special dialogues
    "Welcome to Episode 6! Oğuzhan is meeting Emily, a new UI designer on the team. Listen to simple introductions!": "Bölüm 6'ya hoş geldiniz! Oğuzhan, ekibe yeni katılan kullanıcı arayüzü tasarımcısı Emily ile tanışıyor. Basit tanışma diyaloglarını dinleyin!",
    "Hello! Welcome to the team! My name is Oğuzhan.": "Merhaba! Ekibe hoş geldin! Benim adım Oğuzhan.",
    "Hi Oğuzhan! Nice to meet you. I am Emily.": "Selam Oğuzhan! Tanıştığıma memnun oldum. Ben Emily.",
    "Nice to meet you too, Emily! Is this your first day at the company?": "Ben de tanıştığımıza çok memnun oldum Emily! Şirketteki ilk günün mü?",
    "Yes, it is! I am the new mobile app designer.": "Evet, öyle! Yeni mobil uygulama tasarımcısıyım.",
    "That is great! I am a full-stack developer on the same project. Where are you from?": "Bu harika! Ben de aynı projede full-stack geliştiriciyim. Nerelisin?",
    "I am from Canada, but I live here now. Are you from Turkey?": "Kanadalıyım ama artık burada yaşıyorum. Sen Türkiyeli misin?",
    "Yes, I am from Turkey. Let me show you around. This is our main work room, and that is the coffee kitchen.": "Evet, Türkiyeliyim. Sana etrafı gezdireyim. Burası ana çalışma odamız, şurası da kahve mutfağı.",
    "Thank you so much! I love coffee.": "Çok teşekkür ederim! Kahveyi çok severim.",
    "You can sit at this desk next to the window. If you need any help, just ask me!": "Pencerenin yanındaki bu masaya oturabilirsin. Yardıma ihtiyacın olursa bana sorman yeterli!",
    "That is very kind of you. Let's make a great app together!": "Çok naziksin. Hadi birlikte harika bir uygulama yapalım!",

    # B1_POD08 special dialogue turns
    "Oğuzhan, how are the preparations coming along for our upcoming Android and AI developer meetup?": "Oğuzhan, yaklaşan Android ve Yapay Zeka geliştirici buluşmamız için hazırlıklar nasıl gidiyor?",
    "We are making great progress! We have already booked the university conference hall, which can accommodate up to one hundred attendees.": "Harika ilerliyoruz! Yüz kişiye kadar katılımcıyı ağırlayabilen üniversite konferans salonunu şimdiden ayırttık.",
    "Excellent! Did you reach out to the keynote speaker regarding the DeepFake detection presentation?": "Mükemmel! DeepFake tespit sunumuyla ilgili ana konuşmacıyla iletişime geçtin mi?",
    "Yes, I spoke with him yesterday. He said that he had finalized his presentation slides and that he would arrive thirty minutes early to set up his equipment.": "Evet, dün kendisiyle konuştum. Sunum slaytlarını tamamladığını ve ekipmanını kurmak için otuz dakika erken geleceğini söyledi.",
    "That is a relief! What about the catering and attendee badges?": "İçim rahatladı! Peki ya ikramlar ve katılımcı yaka kartları?",
    "We need to figure out how many vegetarian snacks we should order. Over eighty developers have registered on our website so far.": "Kaç adet vejetaryen atıştırmalık sipariş etmemiz gerektiğini hesaplamamız lazım. Şu ana kadar web sitemizden seksenin üzerinde geliştirici kayıt yaptırdı.",
    "We should send a confirmation email tonight so we can finalize the exact head count.": "Kesin katılımcı sayısını netleştirebilmemiz için bu gece bir onay e-postası göndermeliyiz.",
    "Great idea. A local software company agreed to sponsor the coffee and refreshments, so we don't have to worry about the budget.": "Harika fikir. Yerel bir yazılım şirketi kahve ve ikramlara sponsor olmayı kabul etti, bu yüzden bütçe konusunda endişelenmemize gerek yok.",
    "Fantastic teamwork! This is going to be our most impactful community event of the semester.": "Harika bir takım çalışması! Bu, dönemin en etkili topluluk etkinliğimiz olacak.",

    # B1_POD10 special dialogue turns
    "Good morning, Oğuzhan. I reviewed the draft of your thesis on intelligent traffic management systems. Your architectural design is very impressive.": "Günaydın Oğuzhan. Akıllı trafik yönetim sistemleri üzerine olan tez taslağınızı inceledim. Mimari tasarımınız oldukça etkileyici.",
    "Thank you very much, Professor Miller. We have been testing our vehicle detection pipeline on real-time highway camera feeds.": "Çok teşekkür ederim Profesör Miller. Araç tespit hattımızı gerçek zamanlı otoyol kamera akışları üzerinde test etmekteyiz.",
    "What were your latest accuracy benchmarks using YOLOv8?": "YOLOv8 kullanarak yaptığınız son doğruluk performans testleriniz nasıldı?",
    "The model was trained on over twenty thousand annotated images, achieving a 94.8% mean average precision. Emergency vehicles like ambulances and police cars are detected in under forty milliseconds.": "Model yirmi binden fazla etiketli görsel üzerinde eğitildi ve %94.8 ortalama kesinlik oranına ulaştı. Ambulans ve polis arabası gibi acil durum araçları kırk milisaniyenin altında tespit ediliyor.",
    "That is remarkably fast. How is the telemetry transmitted to the traffic light microcontrollers?": "Oldukça hızlı. Telemetri verileri trafik ışığı mikrodenetleyicilerine nasıl iletiliyor?",
    "We implemented a lightweight MQTT broker which dispatches priority override signals to the intersection nodes.": "Kavşak düğümlerine öncelikli geçiş sinyalleri gönderen hafif bir MQTT sunucusu uyguladık.",
    "Excellent choice for low-bandwidth environments. In your final report, remember to include a detailed comparison table against legacy camera systems, and avoid using subjective claims without benchmark data.": "Düşük bant genişliğine sahip ortamlar için mükemmel bir seçim. Nihai raporunuzda eski kamera sistemlerine karşı ayrıntılı bir karşılaştırma tablosu eklemeyi unutmayın ve test verisi olmadan öznel iddialar kullanmaktan kaçının.",
    "I will add comprehensive latency graphs and empirical error matrices before the final defense.": "Nihai savunmadan önce kapsamlı gecikme grafikleri ve ampirik hata matrisleri ekleyeceğim.",
    "Outstanding work. You are ready for your senior graduation presentation next month!": "Olağanüstü bir çalışma. Gelecek ayki mezuniyet sunumunuz için hazırsınız!",

    # B2_POD02 & B2_POD04 & B2_POD08 & B2_POD10 speaker lines
    "Maya, modern metropolitan areas account for over seventy percent of global carbon emissions. What are the primary structural bottlenecks in transitioning cities to net-zero status?": "Maya, modern metropol alanları küresel karbon salınımının yüzde yetmişinden fazlasını oluşturuyor. Şehirleri net sıfır statüsüne geçirirken karşılaşılan başlıca yapısal darboğazlar nelerdir?",
    "David, the executive board is demanding an immediate briefing. Has the scope of the cybersecurity incident been contained?": "David, yönetim kurulu derhal bir bilgilendirme talep ediyor. Siber güvenlik olayının kapsamı kontrol altına alındı mı?",
    "Yes, our security operations team has quarantined all affected database segments. The adversary must have gained initial access through a compromised employee credential before attempting lateral privilege escalation.": "Evet, güvenlik operasyonları ekibimiz etkilenen tüm veri tabanı segmentlerini karantinaya aldı. Saldırgan, yanal yetki yükseltmeye çalışmadan önce güvenliği ihlal edilmiş bir çalışan kimlik bilgisi üzerinden ilk erişimi sağlamış olmalı.",
    "Dr. Aris, genetic therapies are considered to be on the verge of eradicating previously incurable hereditary blood disorders. What was the critical breakthrough that enabled this clinical transition?": "Dr. Aris, genetik tedavilerin daha önce tedavi edilemeyen kalıtsal kan bozukluklarını ortadan kaldırmanın eşiğinde olduğu düşünülüyor. Bu klinik geçişi sağlayan kritik atılım neydi?",
    "Marcus, as machine learning models ingest colossal volumes of personal user data, how are international privacy frameworks adapting to prevent mass surveillance?": "Marcus, makine öğrenimi modelleri devasa miktarda kişisel kullanıcı verisini işlerken, uluslararası gizlilik çerçeveleri kitlesel gözetimi önlemek için nasıl uyum sağlıyor?",
}

full_dictionary = {**existing_map, **extra_translations}

print(f"Master translation dictionary size: {len(full_dictionary)}")
with open(r"D:\ingilizce\backend\scripts\master_translations.json", "w", encoding="utf-8") as f:
    json.dump(full_dictionary, f, ensure_ascii=False, indent=2)
