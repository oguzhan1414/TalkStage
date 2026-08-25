import json
import re
import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"
TIMINGS_PATH = r"D:\ingilizce\backend\scripts\measured_40_timings.json"
DATA_TS_PATH = r"D:\ingilizce\mobile\src\data\podcastData.ts"

COVER_MAP = {
    'A1': [
        'podcastCovers.a1Cafe',
        'podcastCovers.a1Routines',
        'podcastCovers.a1City',
        'podcastCovers.a1Bistro',
        'podcastCovers.a1Picnic',
        'podcastCovers.a1Cafe',
        'podcastCovers.a1City',
        'podcastCovers.a1Picnic',
        'podcastCovers.a2Doctor',
        'podcastCovers.a1Routines',
    ],
    'A2': [
        'podcastCovers.a2Airport',
        'podcastCovers.a2Hotel',
        'podcastCovers.a2Shopping',
        'podcastCovers.a2Doctor',
        'podcastCovers.a2Cinema',
        'podcastCovers.a2Airport',
        'podcastCovers.b1AI',
        'podcastCovers.a1Bistro',
        'podcastCovers.a1Picnic',
        'podcastCovers.b1Interview',
    ],
    'B1': [
        'podcastCovers.b1Interview',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1Luggage',
        'podcastCovers.b1AI',
        'podcastCovers.b1Green',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1Interview',
        'podcastCovers.b1AI',
        'podcastCovers.b1Interview',
        'podcastCovers.b1Green',
    ],
    'B2': [
        'podcastCovers.b1AI',
        'podcastCovers.b1Green',
        'podcastCovers.b1Interview',
        'podcastCovers.b1AI',
        'podcastCovers.b1AI',
        'podcastCovers.b1Interview',
        'podcastCovers.b1Apartment',
        'podcastCovers.a2Doctor',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1AI',
    ]
}

FEMALE_AVATARS = ['avatarImages.femaleLead', 'avatarImages.femaleDesigner', 'avatarImages.femaleEntrepreneur']
MALE_AVATARS = ['avatarImages.maleDev', 'avatarImages.maleTraveler', 'avatarImages.maleEngineer']

def is_female_name(name):
    lower = name.lower()
    female_keywords = ['emma', 'sarah', 'mia', 'chloe', 'sophie', 'emily', 'anna', 'lisa', 'rachel', 'clara', 'nora', 'lily', 'zoe', 'maya', 'victoria', 'laura', 'natalie', 'elena', 'katherine', 'karen', 'claire', 'helena', 'receptionist', 'clerk', 'cashier']
    return any(k in lower for k in female_keywords)

# Complete contextual translation database for B1 and B2 episodes
b1_b2_translations = {
    # B1_POD01
    "Welcome to B1 Intermediate Episode 1! Alex is interviewing for a senior marketing role at TechCorp with Victoria. Listen for professional business idioms and complex tenses.": "B1 Orta Seviye 1. Bölüme hoş geldiniz! Alex, TechCorp'ta Victoria ile kıdemli pazarlama rolü için mülakat yapıyor. Profesyonel iş İngilizcesi deyimlerini ve karmaşık zaman yapılarını dinleyin.",
    "Welcome, Alex. Thank you for coming in today. To start off, could you walk me through your professional background?": "Hoş geldiniz Alex. Bugün geldiğiniz için teşekkür ederiz. Başlangıç olarak, profesyonel geçmişinizden biraz bahsedebilir misiniz?",
    "Thank you, Victoria. For the past four years, I have been working as a digital growth specialist at a fast-paced fintech startup. During this time, I have been managing cross-functional teams and optimizing our user acquisition funnels.": "Teşekkürler Victoria. Son dört yıldır dinamik bir fintech girişiminde dijital büyüme uzmanı olarak çalışmaktayım. Bu süre zarfında fonksiyonlar arası ekipleri yönettim ve kullanıcı edinme dönüşüm hunilerimizi optimize ettim.",
    "That sounds comprehensive. How do you handle high-pressure situations when facing tight deadlines?": "Kulağa oldukça kapsamlı geliyor. Sıkışık teslim tarihleriyle karşılaştığınızda yüksek baskı altındaki durumları nasıl yönetirsiniz?",
    "When unexpected roadblocks occur, I always rely on a data-driven prioritization framework. For instance, last quarter our primary customer onboarding funnel broke right before a major campaign. I organized an emergency standup, identified the root cause with our engineers, and we resolved the issue within four hours, which prevented significant customer churn.": "Beklenmeyen engellerle karşılaştığımda her zaman veriye dayalı bir önceliklendirme çerçevesine güvenirim. Örneğin geçen çeyrekte ana müşteri karşılama akışımız büyük bir kampanya öncesinde arızalandı. Acil bir toplantı düzenledim, mühendislerimizle kök nedeni belirledik ve sorunu dört saat içinde çözerek önemli bir müşteri kaybını önledik.",
    "Excellent example of adaptability. Where do you see yourself professionally in the next three to five years?": "Uyum yeteneği konusunda mükemmel bir örnek. Önümüzdeki üç ila beş yıl içinde kendinizi profesyonel olarak nerede görüyorsunuz?",
    "I aim to transition into a strategic product leadership role where I can guide multidisciplinary teams and scale enterprise platforms internationally.": "Çok disiplinli ekiplere rehberlik edebileceğim ve kurumsal platformları uluslararası düzeyde ölçeklendirebileceğim stratejik bir ürün liderliği rolüne geçmeyi hedefliyorum.",
    "That aligns perfectly with our company trajectory. Do you have any questions for us regarding team culture?": "Bu, şirketimizin vizyonuyla mükemmel şekilde örtüşüyor. Ekip kültürüyle ilgili bize sormak istediğiniz herhangi bir soru var mı?",
    "Yes, could you tell me how your product and engineering departments collaborate during sprint planning?": "Evet, sprint planlaması sırasında ürün ve mühendislik departmanlarınızın nasıl işbirliği yaptığını anlatabilir misiniz?",
    'Notice Alex\'s use of the Present Perfect Continuous: "I have been working as a growth specialist." A powerful structure for job interviews!': 'Alex\'in Present Perfect Continuous kullanımına dikkat edin: "I have been working as a growth specialist." İş mülakatları için çok güçlü bir yapı!',

    # B1_POD02
    "In Episode 2, Laura is inspecting a modern apartment in the city center with real estate agent Ryan. Listen to property terms and negotiation questions!": "2. Bölümde Laura, emlak danışmanı Ryan ile şehir merkezinde modern bir daireyi inceliyor. Gayrimenkul terimlerini ve pazarlık sorularını dinleyin!",
    "Welcome to the Riverside Residences, Laura. This is the two-bedroom corner unit that you inquired about online.": "Riverside Rezidanslarına hoş geldiniz Laura. İnternetten bilgi aldığınız iki yatak odalı köşe dairemiz burası.",
    "Wow, it is remarkably bright! Has the apartment been refurbished recently?": "Vay canına, son derece aydınlık! Daire yakın zamanda yenilendi mi?",
    "Yes, the landlord had the entire kitchen renovated and installed double-glazed energy-efficient windows last month.": "Evet, ev sahibi geçen ay tüm mutfağı yeniledi ve çift camlı enerji tasarruflu pencereler taktırdı.",
    "The open-concept kitchen looks fantastic. What is the monthly rent, and what does it include?": "Açık konsept mutfak harika görünüyor. Aylık kira ne kadar ve fiyata neler dahil?",
    "The rent is $1,800 per month. Water and central heating are included in the price, whereas electricity and high-speed fiber internet are billed separately.": "Kira aylık 1.800 dolar. Su ve merkezi ısıtma fiyata dahildir; elektrik ve yüksek hızlı fiber internet ise ayrı olarak faturalandırılır.",
    "That is quite reasonable. What are the terms regarding the lease agreement and the security deposit?": "Oldukça makul. Kira sözleşmesi ve güvence bedeli (depozito) ile ilgili şartlar nelerdir?",
    "The landlord requires a standard twelve-month lease and a one-month security deposit upfront, which will be fully refunded when you move out, provided there is no property damage.": "Ev sahibi standart on iki aylık bir sözleşme ve peşin bir aylık depozito talep ediyor. Mülkte hasar olmaması durumunda taşınırken bu tutar tamamen iade edilir.",
    "Are pets allowed in the building? I have a small domestic cat.": "Binada evcil hayvanlara izin veriliyor mu? Küçük bir ev kedim var.",
    "Yes, the building has a pet-friendly policy, but there is a small one-time pet sanitation fee of $100.": "Evet, binamız evcil hayvan dostu bir politikaya sahip ancak tek seferlik 100 dolarlık küçük bir evcil hayvan hijyen ücreti bulunmaktadır.",
    "That sounds fair. If I submit my application and employment verification today, how soon can I sign the contract?": "Kulağa adil geliyor. Başvurumu ve çalışma belgemi bugün teslim edersem sözleşmeyi ne kadar sürede imzalayabilirim?",
    "We can prepare the lease agreement by Thursday afternoon!": "Kira sözleşmesini Perşembe öğleden sonraya kadar hazırlayabiliriz!",
    'Important vocabulary to remember: "security deposit", "lease agreement", and "utilities included". Very practical for living abroad!': 'Hatırlanması gereken önemli kelimeler: "security deposit" (depozito), "lease agreement" (kira sözleşmesi) ve "utilities included" (faturalar dahil). Yurtdışında yaşam için çok pratik!',

    # B1_POD03
    "Welcome to Episode 3! Natalie's luggage did not arrive after a flight delay in Frankfurt. Listen to how she professionally files a lost baggage claim.": "Bölüm 3'e hoş geldiniz! Frankfurt'taki uçuş rötasının ardından Natalie'nin bagajı ulaşmadı. Kayıp bagaj bildirimini nasıl profesyonelce yaptığını dinleyin.",
    "Good evening, ma'am. How can I assist you at the baggage service counter?": "İyi akşamlar hanımefendi. Bagaj hizmetleri masasında size nasıl yardımcı olabilirim?",
    "Good evening. My flight from Frankfurt was delayed by two hours, and I have been waiting at baggage carousel 4 for over forty minutes. My suitcase never appeared.": "İyi akşamlar. Frankfurt'tan gelen uçağım iki saat rötar yaptı ve kırk dakikadan fazladır 4 numaralı bagaj bandında bekliyorum. Bavulum hiç çıkmadı.",
    "I apologize for the inconvenience. May I see your baggage claim receipt and your boarding pass?": "Yaşanan aksaklık için özür dilerim. Bagaj fişinizi ve biniş kartınızı görebilir miyim?",
    "Here they are. It is a large hard-shell navy blue Samsonite suitcase.": "İşte buradalar. Büyük boy sert kapaklı lacivert bir Samsonite bavul.",
    "Let me check our global tracking system... Yes, I see what happened. Due to the tight connection in Frankfurt, your bag was loaded onto the subsequent flight, which lands here tomorrow morning at 8 AM.": "Küresel takip sistemimizden kontrol edeyim... Evet, ne olduğunu görüyorum. Frankfurt'taki dar aktarma süresi nedeniyle çantanız bir sonraki uçuşa yüklenmiş; yarın sabah saat 08:00'de buraya iniyor.",
    "Tomorrow morning? But all my business attire and personal toiletries are in that bag, and I have an executive conference tomorrow at noon!": "Yarın sabah mı? Fakat tüm iş kıyafetlerim ve kişisel bakım eşyalarım o çantada ve yarın öğlen yönetici konferansım var!",
    "We completely understand your frustration. We will issue an official Property Irregularity Report (PIR). Under our airline policy, you are entitled to an emergency allowance of up to $150 to purchase essential clothing and toiletries. Keep all your receipts so we can reimburse you.": "Mağduriyetinizi tamamen anlıyoruz. Resmi bir Eşya Düzensizlik Raporu (PIR) düzenleyeceğiz. Havayolu politikamız uyarınca temel kıyafet ve kişisel bakım alışverişi için 150 dolara kadar acil durum ödeneği hakkınız bulunmaktadır. Size geri ödeme yapabilmemiz için tüm fişlerinizi saklayın.",
    "How will my bag reach me once it lands?": "Bavulum indikten sonra bana nasıl ulaşacak?",
    "As soon as the flight arrives, your luggage will be dispatched directly to your hotel via express courier free of charge. Here is your tracking reference number.": "Uçak iner inmez bagajınız ücretsiz olarak ekspres kurye ile doğrudan otelinize sevk edilecektir. İşte takip referans numaranız.",
    "Thank you for resolving this so efficiently, Kevin.": "Bunu bu kadar etkili bir şekilde çözdüğün için teşekkürler Kevin.",
    'Notice the passive voice: "Your bag was loaded onto the subsequent flight." Practice reporting customer service issues in English!': 'Edilgen çatıya dikkat edin: "Your bag was loaded onto the subsequent flight." İngilizce müşteri hizmetleri şikayetlerini bildirme pratiği yapın!',

    # B1_POD04
    "In Episode 4, Liam and Chloe discuss how smart productivity apps and AI tools have transformed their daily working routines.": "4. Bölümde Liam ve Chloe, akıllı üretkenlik uygulamalarının ve yapay zeka araçlarının günlük çalışma rutinlerini nasıl dönüştürdüğünü tartışıyorlar.",
    "Liam, I have noticed that you finish your daily coding and documentation tasks much faster recently. What is your secret?": "Liam, son zamanlarda günlük kodlama ve dokümantasyon görevlerini çok daha hızlı bitirdiğini fark ettim. Sırrın nedir?",
    "Honestly, I have been using AI coding assistants and automation scripts for repetitive tasks. If I didn't automate my test generation, I would spend hours writing boilerplate code every single day.": "Dürüst olmak gerekirse, tekrarlayan işler için yapay zeka kodlama asistanlarını ve otomasyon scriptlerini kullanıyorum. Test üretimini otomatikleştirmeseydim, her gün şablon kodlar yazmak için saatler harcardım.",
    "That makes sense. But don't you worry about data privacy when feeding company code into cloud AI services?": "Çok mantıklı. Ancak şirket kodlarını bulut yapay zeka servislerine aktarırken veri gizliliği konusunda endişelenmiyor musun?",
    "That is a very valid concern. We configured enterprise privacy settings which ensure that none of our proprietary code is stored or used for model training.": "Bu çok haklı bir endişe. Şirkete özel tescilli kodlarımızın hiçbirinin model eğitimi için saklanmamasını veya kullanılmamasını sağlayan kurumsal gizlilik ayarlarını yapılandırdık.",
    "What about all the smartphone notifications? I feel like I am constantly distracted by Slack and email alerts.": "Peki ya tüm bu akıllı telefon bildirimleri? Slack ve e-posta uyarıları yüzünden sürekli dikkatimin dağıldığını hissediyorum.",
    "I used to feel the same way. Last month, I set up strict focus modes on my phone and turned off all non-essential notifications during deep work hours. It really helped me cut down on screen fatigue.": "Eskiden ben de aynı şekilde hissederdim. Geçen ay telefonumda katı odaklanma modları kurdum ve derin çalışma saatlerinde gereksiz tüm bildirimleri kapattım. Ekran yorgunluğunu azaltmama gerçekten çok yardımcı oldu.",
    "I should definitely try that. A productive workflow requires both smart tools and digital discipline!": "Bunu kesinlikle denemeliyim. Üretken bir iş akışı hem akıllı araçlar hem de dijital disiplin gerektirir!",
    'Did you notice the second conditional: "If I didn\'t automate my tests, I would spend hours"? Great structure for discussing hypothetical situations!': 'İkinci Şart Cümlesini fark ettiniz mi: "If I didn\'t automate my tests, I would spend hours"? Varsayımsal durumları konuşmak için harika bir yapı!',

    # B1_POD05
    "Welcome to Episode 5! Ethan and Maya talk about simple, practical lifestyle changes to protect the environment in modern cities.": "5. Bölüme hoş geldiniz! Ethan ve Maya modern şehirlerde çevreyi korumak için basit ve pratik yaşam tarzı değişikliklerini konuşuyorlar.",
    "Ethan, I noticed solar panels on your apartment rooftop yesterday. Did your building install them recently?": "Ethan, dün apartmanınızın çatısındaki güneş panellerini fark ettim. Binanız onları yakın zamanda mı taktırdı?",
    "Yes, we had them installed last spring. They generate almost 60% of our building's electricity, which significantly reduces our carbon footprint and electricity bills.": "Evet, geçen ilkbaharda taktırdık. Binamızın elektriğinin neredeyse %60'ını üretiyorlar; bu da karbon ayak izimizi ve elektrik faturalarımızı önemli ölçüde azaltıyor.",
    "That is wonderful! I have been trying to adopt a more sustainable lifestyle myself, but it can be challenging in a big city.": "Bu harika! Ben de daha sürdürülebilir bir yaşam tarzı benimsemeye çalışıyorum ama büyük bir şehirde bazen zorlayıcı olabiliyor.",
    "Small everyday habits make a tremendous difference. For example, we should stop buying single-use plastic water bottles and carry reusable metal flasks instead.": "Küçük günlük alışkanlıklar muazzam bir fark yaratır. Örneğin tek kullanımlık plastik su şişeleri almayı bırakmalı ve bunun yerine yeniden kullanılabilir metal mataralar taşımalıyız.",
    "I already did that! I also started commuting to work by electric bicycle instead of driving my car.": "Bunu zaten yaptım! Ayrıca arabamı sürmek yerine işe elektrikli bisikletle gidip gelmeye başladım.",
    "That is fantastic! Cycling not only reduces urban air pollution, but it is also much healthier. Have you ever tried composting kitchen food scraps?": "Bu muhteşem! Bisiklete binmek sadece kentsel hava kirliliğini azaltmakla kalmaz, aynı zamanda çok daha sağlıklıdır. Mutfak yemek artıklarını kompost yapmayı hiç denedin mi?",
    "Not yet, but our municipality just placed organic waste collection bins in our neighborhood.": "Henüz değil ama belediyemiz mahallemize yeni organik atık toplama kutuları yerleştirdi.",
    "That makes it so much easier. If everyone adopted just two eco-friendly habits, our cities would be much cleaner and greener!": "Bu işi çok daha kolaylaştırıyor. Herkes sadece iki çevre dostu alışkanlık edinseydi, şehirlerimiz çok daha temiz ve yeşil olurdu!",
    'Notice the practical verbs: "stop buying single-use plastic" and "started commuting by bicycle". What green habits do you practice?': 'Pratik fiillere dikkat edin: "stop buying single-use plastic" ve "started commuting by bicycle". Siz hangi yeşil alışkanlıkları uyguluyorsunuz?',

    # B1_POD06
    "In Episode 6, Daniel visits an international bank branch in Germany to open a local checking account. Listen to financial and banking terminology!": "6. Bölümde Daniel yerel bir vadesiz mevduat hesabı açmak için Almanya'daki uluslararası bir banka şubesini ziyaret ediyor. Finans ve bankacılık terimlerini dinleyin!",
    "Good morning! Welcome to Horizon Bank. How can I assist you today, sir?": "Günaydın! Horizon Bank'a hoş geldiniz. Bugün size nasıl yardımcı olabilirim efendim?",
    "Good morning! I recently moved to Frankfurt for work, and I would like to open a local checking account for my salary and daily expenses.": "Günaydın! İş için yakın zamanda Frankfurt'a taşındım ve maaşım ile günlük harcamalarım için yerel bir vadesiz hesap açmak istiyorum.",
    "Excellent. Are you employed locally, or are you a full-time university student?": "Mükemmel. Yerel olarak bir işte mi çalışıyorsunuz yoksa tam zamanlı üniversite öğrencisi misiniz?",
    "I am a software engineer working on an international technology visa. Here is my employment contract, passport, and official proof of address.": "Uluslararası teknoloji vizesiyle çalışan bir yazılım mühendisiyim. İşte iş sözleşmem, pasaportum ve resmi ikametgah/adres kanıtım.",
    "Perfect. All documents are verified through our digital identity compliance system. We offer our Standard Digital Account, which has no monthly maintenance fee provided that you receive a regular direct deposit salary.": "Kusursuz. Tüm belgeler dijital kimlik uyumluluk sistemimiz üzerinden doğrulandı. Düzenli doğrudan maaş ödemesi aldığınız sürece aylık hesap işletim ücreti olmayan Standart Dijital Hesabımızı sunuyoruz.",
    "That sounds ideal. Does the account come with a contactless debit card and mobile banking access?": "Kulağa ideal geliyor. Hesap temassız banka kartı ve mobil bankacılık erişimiyle birlikte mi geliyor?",
    "Yes, your digital debit card will be activated on your smartphone immediately, and your physical card will be delivered to your registered residential address within five business days.": "Evet, dijital banka kartınız akıllı telefonunuzda anında etkinleştirilecek ve fiziksel kartınız beş iş günü içinde kayıtlı ikamet adresinize teslim edilecektir.",
    "Could you please clarify if there are any fees for international wire transfers?": "Uluslararası banka havaleleri için herhangi bir ücret olup olmadığını açıklayabilir misiniz lütfen?",
    "Inbound transfers are completely free, while outbound international transfers carry a fixed fee of five euros.": "Gelen transferler tamamen ücretsizdir, giden uluslararası transferlerde ise beş avroluk sabit bir ücret uygulanır.",
    "Wonderful. Let's proceed with the application!": "Harika. Başvuru işlemlerine devam edelim!",
    'Key banking phrases: "checking account", "proof of address", and "monthly maintenance fee". Essential for working abroad!': 'Anahtar bankacılık ifadeleri: "checking account" (vadesiz hesap), "proof of address" (adres belgesi) ve "monthly maintenance fee" (hesap işletim ücreti). Yurtdışında çalışmak için vazgeçilmez!',

    # B1_POD07
    "Welcome to Episode 7! Sophie and Mark debate the pros and cons of freelance flexibility versus corporate office stability.": "Bölüm 7'ye hoş geldiniz! Sophie ve Mark serbest çalışma esnekliği ile kurumsal ofis istikrarının artı ve eksilerini tartışıyorlar.",
    "Sophie, you have been working as a freelance software developer for over two years now. Do you ever miss working in a traditional corporate office?": "Sophie, iki yılı aşkın süredir serbest yazılım geliştirici olarak çalışıyorsun. Geleneksel bir kurumsal ofiste çalışmayı hiç özlüyor musun?",
    "Sometimes, Mark. I used to enjoy the daily social interactions with colleagues at the coffee machine. However, the schedule flexibility of freelancing is unmatched. I can work from anywhere and choose the projects that genuinely inspire me.": "Bazen Mark. Eskiden kahve makinesinin başında iş arkadaşlarıyla yapılan günlük sohbetlerden keyif alırdım. Ancak serbest çalışmanın program esnekliği eşsizdir. İstediğim her yerden çalışabiliyor ve bana gerçekten ilham veren projeleri seçebiliyorum.",
    "That freedom sounds amazing. But isn't it stressful when you don't have a guaranteed monthly salary?": "Bu özgürlük kulağa harika geliyor. Fakat garantili bir aylık maaşın olmadığında stresli olmuyor mu?",
    "Absolutely. Irregular cash flow is the biggest drawback. If I had a steady corporate salary, I would worry much less about dry client seasons. How do you feel about your office job?": "Kesinlikle. Düzensiz nakit akışı en büyük dezavantajdır. Düzenli bir kurumsal maaşım olsaydı, müşterisiz geçen durgun sezonlar hakkında çok daha az endişelenirdim. Sen ofis işin hakkında ne düşünüyorsun?",
    "I value stability and clear career progression. My company provides health insurance, paid annual leave, and dedicated hardware. On the other hand, commuting during rush hour traffic every morning is exhausting.": "Ben istikrara ve net kariyer gelişimine değer veriyorum. Şirketim sağlık sigortası, ücretli yıllık izin ve özel donanım sağlıyor. Öte yandan her sabah yoğun trafik saatinde işe gidip gelmek çok yorucu.",
    "It really comes down to personal priorities. Some developers thrive on freelance independence, whereas others prefer corporate security.": "Bu gerçekten kişisel önceliklere dayanıyor. Bazı geliştiriciler serbest çalışma bağımsızlığıyla gelişirken, diğerleri kurumsal güvenliği tercih ediyor.",
    "Exactly. Finding the right work-life balance is what truly matters!": "Kesinlikle. Doğru iş-yaşam dengesini bulmak asıl önemli olan şeydir!",
    'Notice how they contrasted ideas using "used to enjoy", "whereas", and "on the other hand". Which lifestyle do you prefer?': 'Fikirleri "used to enjoy", "whereas" ve "on the other hand" ile nasıl kıyasladıklarına dikkat edin. Siz hangi yaşam tarzını tercih edersiniz?',

    # B1_POD08
    "In Episode 8, Oğuzhan and Sarah are organizing a student technology community meetup at the university. Listen for phrasal verbs and event planning terms!": "8. Bölümde Oğuzhan ve Sarah üniversitede bir öğrenci teknoloji topluluğu buluşması organize ediyorlar. Deyimsel fiillere ve etkinlik planlama terimlerine dikkat edin!",
    "Sarah, how are the preparations coming along for our upcoming Android and AI developer meetup?": "Sarah, yaklaşan Android ve Yapay Zeka geliştirici buluşmamız için hazırlıklar nasıl gidiyor?",
    "We are making great progress! We have already booked the university conference hall, which can accommodate up to one hundred attendees.": "Harika ilerliyoruz! Yüz kişiye kadar katılımcıyı ağırlayabilen üniversite konferans salonunu şimdiden ayırttık.",
    "Excellent! Did you reach out to the keynote speaker regarding the DeepFake detection presentation?": "Mükemmel! DeepFake tespit sunumuyla ilgili ana konuşmacıyla iletişime geçtin mi?",
    "Yes, I spoke with him yesterday. He said that he had finalized his presentation slides and that he would arrive thirty minutes early to set up his equipment.": "Evet, dün kendisiyle konuştum. Sunum slaytlarını tamamladığını ve ekipmanını kurmak için otuz dakika erken geleceğini söyledi.",
    "That is a relief! What about the catering and attendee badges?": "İçim rahatladı! Peki ya ikramlar ve katılımcı yaka kartları?",
    "We need to figure out how many vegetarian snacks we should order. Over eighty developers have registered on our website so far.": "Kaç adet vejetaryen atıştırmalık sipariş etmemiz gerektiğini hesaplamamız lazım. Şu ana kadar web sitemizden seksenin üzerinde geliştirici kayıt yaptırdı.",
    "We should send a confirmation email tonight so we can finalize the exact head count.": "Kesin katılımcı sayısını netleştirebilmemiz için bu gece bir onay e-postası göndermeliyiz.",
    "Great idea. A local software company agreed to sponsor the coffee and refreshments, so we don't have to worry about the budget.": "Harika fikir. Yerel bir yazılım şirketi kahve ve ikramlara sponsor olmayı kabul etti, bu yüzden bütçe konusunda endişelenmemize gerek yok.",
    "Fantastic teamwork! This is going to be our most impactful community event of the semester.": "Harika bir takım çalışması! Bu, dönemin en etkili topluluk etkinliğimiz olacak.",
    'Notice the phrasal verbs: "reach out to", "set up", and "figure out". Essential for modern tech and event management!': 'Deyimsel fiillere dikkat edin: "reach out to" (iletişime geçmek), "set up" (kurmak) ve "figure out" (hesaplamak/çözmek). Modern teknoloji ve etkinlik yönetimi için çok önemli!',

    # B1_POD09
    "Welcome to Episode 9! Emily is handling an urgent phone call from an upset corporate client, Mr. Davis. Listen to diplomatic problem-solving phrases.": "Bölüm 9'a hoş geldiniz! Emily, mağdur olan kurumsal müşteri Bay Davis'ten gelen acil bir telefon görüşmesini yönetiyor. Diplomatik kriz çözme ifadelerini dinleyin.",
    "Good afternoon, Mr. Davis. Thank you for taking my call. I understand our checkout service experienced downtime earlier today.": "Tünaydın Bay Davis. Aramamı kabul ettiğiniz için teşekkür ederim. Ödeme servisimizin bugün erken saatlerde kesinti yaşadığını anlıyorum.",
    "Good afternoon, Emily. Yes, our online store was completely unable to process credit card payments for over two hours during our lunch flash sale! We lost dozens of customer orders. This is unacceptable for an enterprise service provider.": "Tünaydın Emily. Evet, online mağazamız öğle indirimi sırasında iki saatten fazla bir süre kredi kartı ödemelerini kesinlikle işleyemedi! Düzinelerce müşteri siparişini kaybettik. Bu, kurumsal bir hizmet sağlayıcı için kabul edilemez.",
    "I completely understand your frustration, Mr. Davis, and I sincerely apologize for the disruption to your business operations. Our engineering team has been investigating the incident since the alert triggered.": "Yaşadığınız hayal kırıklığını tamamen anlıyorum Bay Davis ve ticari operasyonlarınızdaki kesinti için içtenlikle özür dilerim. Mühendislik ekibimiz uyarı verildiğinden beri olayı araştırmaktadır.",
    "What was the root cause of this failure?": "Bu arızanın kök nedeni neydi?",
    "An unexpected memory deadlock occurred in our third-party banking integration pipeline. Our engineers have resolved the issue and deployed an automated failover safeguard to prevent this from recurring.": "Üçüncü taraf bankacılık entegrasyon hattımızda beklenmedik bir bellek kilitlenmesi meydana geldi. Mühendislerimiz sorunu çözdü ve bunun tekrarlanmasını önlemek için otomatik bir yedekleme güvenlik mekanizması devreye aldı.",
    "How do you plan to ensure our system stability moving forward?": "Bundan sonraki süreçte sistem kararlılığımızı nasıl sağlamayı planlıyorsunuz?",
    "We are conducting continuous stress testing tonight, and we will credit your account with a 20% discount on this month's hosting invoice to compensate for the inconvenience. Furthermore, I will personally monitor your checkout traffic throughout tomorrow's sale.": "Bu gece sürekli stres testleri gerçekleştiriyoruz ve yaşanan aksaklığı telafi etmek için bu ayki barındırma faturanızda hesabınıza %20 indirim tanımlayacağız. Ayrıca yarınki satış boyunca ödeme trafiğinizi bizzat takip edeceğim.",
    "Thank you for taking ownership of the situation, Emily. I appreciate your transparent communication.": "Durumu sahiplendiğin için teşekkürler Emily. Şeffaf iletişiminizi takdir ediyorum.",
    'Professional phrases for conflict resolution: "I completely understand your frustration" and "I sincerely apologize for the disruption."': 'Anlaşmazlık çözümü için profesyonel kalıplar: "I completely understand your frustration" ve "I sincerely apologize for the disruption."',

    # B1_POD10
    "In our final B1 episode, Oğuzhan presents his senior engineering graduation project to Professor Miller. Listen to academic engineering discussions!": "Son B1 bölümümüzde Oğuzhan, bitirme mühendislik projesini Profesör Miller'a sunuyor. Akademik mühendislik tartışmalarını dinleyin!",
    "Good morning, Oğuzhan. I reviewed the draft of your thesis on intelligent traffic management systems. Your architectural design is very impressive.": "Günaydın Oğuzhan. Akıllı trafik yönetim sistemleri üzerine olan tez taslağınızı inceledim. Mimari tasarımınız oldukça etkileyici.",
    "Thank you very much, Professor Miller. We have been testing our vehicle detection pipeline on real-time highway camera feeds.": "Çok teşekkür ederim Profesör Miller. Araç tespit hattımızı gerçek zamanlı otoyol kamera akışları üzerinde test etmekteyiz.",
    "What were your latest accuracy benchmarks using YOLOv8?": "YOLOv8 kullanarak yaptığınız son doğruluk performans testleriniz nasıldı?",
    "The model was trained on over twenty thousand annotated images, achieving a 94.8% mean average precision. Emergency vehicles like ambulances and police cars are detected in under forty milliseconds.": "Model yirmi binden fazla etiketli görsel üzerinde eğitildi ve %94.8 ortalama kesinlik oranına ulaştı. Ambulans ve polis arabası gibi acil durum araçları kırk milisaniyenin altında tespit ediliyor.",
    "That is remarkably fast. How is the telemetry transmitted to the traffic light microcontrollers?": "Oldukça hızlı. Telemetri verileri trafik ışığı mikrodenetleyicilerine nasıl iletiliyor?",
    "We implemented a lightweight MQTT broker which dispatches priority override signals to the intersection nodes.": "Kavşak düğümlerine öncelikli geçiş sinyalleri gönderen hafif bir MQTT sunucusu uyguladık.",
    "Excellent choice for low-bandwidth environments. In your final report, remember to include a detailed comparison table against legacy camera systems, and avoid using subjective claims without benchmark data.": "Düşük bant genişliğine sahip ortamlar için mükemmel bir seçim. Nihai raporunuzda eski kamera sistemlerine karşı ayrıntılı bir karşılaştırma tablosu eklemeyi unutmayın ve test verisi olmadan öznel iddialar kullanmaktan kaçının.",
    "I will add comprehensive latency graphs and empirical error matrices before the final defense.": "Nihai savunmadan önce kapsamlı gecikme grafikleri ve ampirik hata matrisleri ekleyeceğim.",
    "Outstanding work. You are ready for your senior graduation presentation next month!": "Olağanüstü bir çalışma. Gelecek ayki mezuniyet sunumunuz için hazırsınız!",
    'Congratulations on completing the B1 intermediate series! You have learned professional workplace, academic, and everyday conversational English!': 'B1 orta seviye serisini tamamladığınız için tebrikler! Profesyonel iş yeri, akademik ve günlük konuşma İngilizcesini öğrendiniz!',

    # =========================================================================
    # 🚀 B2 İLERİ SEVİYE (10 Episodes)
    # =========================================================================
    # B2_POD01
    "Welcome to the B2 Upper-Intermediate Series! Dr. Vance and Elena engage in an intellectual debate on generative AI ethics, intellectual property, and software craftsmanship.": "B2 İleri Seviye Serisine hoş geldiniz! Dr. Vance ve Elena üretken yapay zeka etiği, fikri mülkiyet ve yazılım zanaatkarlığı üzerine entelektüel bir tartışma yürütüyorlar.",
    "Elena, as a principal software architect, how do you perceive the rapid proliferation of generative AI tools across enterprise codebases?": "Elena, baş yazılım mimarı olarak kurumsal kod tabanlarında üretken yapay zeka araçlarının hızlı yayılmasını nasıl değerlendiriyorsun?",
    "It represents an undeniable paradigm shift, Dr. Vance. Not only does generative AI accelerate routine boilerplate authoring, but it also empowers engineers to prototype complex distributed architectures rapidly. However, the ethical implications regarding proprietary intellectual property are profound.": "Bu inkar edilemez bir paradigma değişimini temsil ediyor Dr. Vance. Üretken yapay zeka sadece rutin şablon kod yazımını hızlandırmakla kalmıyor, aynı zamanda mühendislere karmaşık dağıtık mimarileri hızla prototipleme gücü veriyor. Ancak şirkete özel fikri mülkiyete ilişkin etik sonuçlar son derece derindir.",
    "Precisely. Had tech companies strictly audited their web-crawled training datasets years ago, we would not be facing unprecedented copyright litigation today.": "Kesinlikle. Teknoloji şirketleri yıllar önce web'den taranan eğitim veri setlerini sıkı bir şekilde denetlemiş olsalardı, bugün benzeri görülmemiş telif hakkı davalarıyla karşı karşıya kalmazdık.",
    "I completely agree. Furthermore, relying excessively on automated code generation threatens the core craftsmanship of software engineering. If junior developers do not cultivate deep algorithmic debugging intuition early in their careers, they will struggle when architecting novel distributed systems.": "Tamamen katılıyorum. Dahası, otomatik kod üretimine aşırı güvenmek yazılım mühendisliğinin temel zanaatkarlığını tehdit ediyor. Genç geliştiriciler kariyerlerinin başlarında derin algoritmik hata ayıklama sezgisi geliştirmezlerse, özgün dağıtık sistemler tasarlarken zorlanacaklardır.",
    "It is vital that engineering organizations establish transparent AI governance frameworks.": "Mühendislik organizasyonlarının şeffaf yapay zeka yönetişim çerçeveleri kurması hayati önem taşımaktadır.",
    "Suffice it to say, AI should function as an intellectual copilot rather than an autonomous decision-maker. Rarely has the technology industry witnessed a development that demands such meticulous balance between innovation and ethical responsibility.": "Şunu söylemek yeterlidir ki yapay zeka özerk bir karar vericiden ziyade entelektüel bir yardımcı pilot olarak işlev görmelidir. Teknoloji endüstrisi yenilik ile etik sorumluluk arasında bu kadar titiz bir denge talep eden bir gelişmeye nadiren tanık olmuştur.",
    'Notice the advanced inversion: "Not only does AI accelerate boilerplate, but it also empowers engineers." Master level B2 syntax!': 'İleri düzey devrik yapıya dikkat edin: "Not only does AI accelerate boilerplate, but it also empowers engineers." Usta seviyesi B2 sözdizimi!',

    # B2_POD02
    "In Episode 2, urban planner Maya and environmental consultant Marcus explore the engineering and architectural challenges of designing net-zero smart cities.": "2. Bölümde şehir plancısı Maya ve çevre danışmanı Marcus, net sıfır akıllı şehirler tasarlamanın mühendislik ve mimari zorluklarını inceliyor.",
    "Marcus, modern metropolitan areas account for over seventy percent of global carbon emissions. What are the primary structural bottlenecks in transitioning cities to net-zero status?": "Marcus, modern metropol alanları küresel karbon salınımının yüzde yetmişinden fazlasını oluşturuyor. Şehirleri net sıfır statüsüne geçirirken karşılaşılan başlıca yapısal darboğazlar nelerdir?",
    "Notwithstanding the widespread adoption of electric private transport, our fundamental challenge lies in outdated grid infrastructure. Traditional centralized power stations waste substantial energy during transmission, whereas decentralized renewable microgrids generate and distribute clean solar power locally.": "Elektrikli özel ulaşımın yaygın olarak benimsenmesine rağmen, temel zorluğumuz eski elektrik şebekesi altyapısında yatmaktadır. Geleneksel merkezi elektrik santralleri iletim sırasında önemli miktarda enerji israf ederken, merkezi olmayan yenilenebilir mikro şebekeler temiz güneş enerjisini yerel olarak üretip dağıtmaktadır.",
    "Having retrofitted several commercial districts with smart grid sensors, did your department observe noticeable efficiency gains?": "Birkaç ticari bölgeyi akıllı şebeke sensörleriyle modernize ettikten sonra departmanınız gözle görülür verimlilik kazanımları gözlemledi mi?",
    "Substantial gains, indeed. Furthermore, by greening urban rooftops and creating dedicated pedestrian corridors, we had our engineers mitigate the severe urban heat island effect across downtown sectors.": "Gerçekten de önemli kazanımlar elde edildi. Dahası, kentsel çatıları yeşillendirerek ve özel yaya koridorları oluşturarak mühendislerimizin şehir merkezi genelindeki şiddetli kentsel ısı adası etkisini azaltmasını sağladık.",
    "Is municipal public transport keeping pace with these architectural transformations?": "Belediye toplu taşıması bu mimari dönüşümlere ayak uydurabiliyor mu?",
    "All upcoming transit projects are mandated to be fully electric and powered by municipal wind farms. Simple though it may sound on paper, coordinating multi-billion-dollar infrastructure overhauls requires relentless inter-agency collaboration.": "Gelecekteki tüm toplu taşıma projelerinin tamamen elektrikli olması ve belediyenin rüzgar santralleriyle beslenmesi zorunlu kılınmıştır. Kağıt üzerinde basit gibi görünse de çok milyar dolarlık altyapı revizyonlarını koordine etmek kurumlar arası yoğun bir işbirliği gerektirir.",
    "In the final analysis, sustainable urban design is no longer an environmental luxury; it is an existential urban imperative.": "Son tahlilde sürdürülebilir kentsel tasarım artık çevresel bir lüks değil; kentsel varoluşsal bir zorunluluktur.",
    'Notice the sophisticated discourse markers: "Notwithstanding the adoption..." and "whereas decentralized microgrids...". High-level B2 prose!': 'Gelişmiş söylem belirteçlerine dikkat edin: "Notwithstanding the adoption..." ve "whereas decentralized microgrids...". Üst düzey B2 anlatımı!',

    # B2_POD03
    "Welcome to Episode 3! Julian pitches his enterprise AI logistics platform to venture capitalist Katherine for a Series A funding round.": "Bölüm 3'e hoş geldiniz! Julian, Seri A yatırım turu için kurumsal yapay zeka lojistik platformunu risk sermayedarı Katherine'e sunuyor.",
    "Julian, your pitch deck is compelling, but let's scrutinize your core unit economics. What does your current customer acquisition cost look like relative to customer lifetime value?": "Julian, sunum dosyanız çok etkileyici ancak temel birim ekonominizi derinlemesine inceleyelim. Mevcut müşteri edinme maliyetiniz müşteri yaşam boyu değerine kıyasla nasıl görünüyor?",
    "Our LTV-to-CAC ratio currently stands at four-to-one, Katherine. Over the past twelve months, we have scaled our annual recurring revenue from $500,000 to over $2.4 million while maintaining a net revenue retention rate of 125%.": "LTV / CAC oranımız şu anda dörde bir seviyesinde Katherine. Son on iki ayda yıllık tekrarlayan gelirimizi 500.000 dolardan 2.4 milyon doların üzerine çıkarırken %125'lik net gelir elde tutma oranını koruduk.",
    "Those are impressive metrics. You must have secured substantial enterprise client contracts to achieve that velocity.": "Bunlar etkileyici metrikler. Bu hıza ulaşmak için önemli kurumsal müşteri sözleşmeleri bağlamış olmalısınız.",
    "Exactly. We got several Fortune 500 logistics providers to adopt our automated route optimization algorithms, which reduced their fleet fuel expenditures by eighteen percent.": "Kesinlikle. Birçok Fortune 500 lojistik sağlayıcısının otomatik rota optimizasyon algoritmalarımızı benimsemesini sağladık; bu da filolarının yakıt giderlerini yüzde on sekiz oranında azalttı.",
    "What is your primary capital allocation strategy if we lead this five-million-dollar Series A round?": "Bu beş milyon dolarlık Seri A turuna liderlik edersek birincil sermaye tahsis stratejiniz ne olacak?",
    "We plan to expand our core machine learning engineering team and establish direct sales channels in North America. This funding will extend our operational runway to thirty months, by which time our company will have reached full operating profitability.": "Çekirdek makine öğrenimi mühendislik ekibimizi genişletmeyi ve Kuzey Amerika'da doğrudan satış kanalları kurmayı planlıyoruz. Bu fonlama operasyonel nakit ömrümüzü otuz aya çıkaracak ve bu süre zarfında şirketimiz tam işletme karlılığına ulaşmış olacaktır.",
    "Were you to face aggressive pricing pressure from legacy incumbent competitors, how would you defend your market positioning?": "Geleneksel köklü rakiplerden gelen agresif fiyatlandırma baskısıyla karşılaşacak olsaydınız, pazar konumlandırmanızı nasıl savunurdunuz?",
    "Our proprietary edge-computed neural models offer sub-second latency that legacy cloud architectures cannot replicate without exorbitant infrastructure costs.": "Şirketimize özel uçta hesaplanan sinir ağı modellerimiz, geleneksel bulut mimarilerinin fahiş altyapı maliyetleri olmadan kopyalayamayacağı saniyenin altında bir gecikme süresi sunmaktadır.",
    "Excellent answer. Let's schedule a formal technical due diligence meeting with my partners next week.": "Mükemmel bir cevap. Önümüzdeki hafta ortaklarımla resmi bir teknik inceleme toplantısı planlayalım.",
    'Notice the professional financial metrics: "LTV-to-CAC ratio", "annual recurring revenue", and the inversion "Were you to face aggressive pricing..."!': 'Profesyonel finansal metriklere dikkat edin: "LTV-to-CAC ratio", "annual recurring revenue" ve devrik yapı "Were you to face aggressive pricing..."!',

    # B2_POD04
    "In Episode 4, Chief Information Security Officer David and Crisis Communications Director Sarah coordinate an emergency response to a sophisticated cyberattack.": "4. Bölümde Bilgi Güvenliği Başkanı David ve Kriz İletişimi Direktörü Sarah, gelişmiş bir siber saldırıya karşı acil müdahaleyi koordine ediyorlar.",
    "Sarah, the executive board is demanding an immediate briefing. Has the scope of the cybersecurity incident been contained?": "Sarah, yönetim kurulu derhal bir bilgilendirme talep ediyor. Siber güvenlik olayının kapsamı kontrol altına alındı mı?",
    "David, our security operations team has quarantined all affected database segments. The adversary must have gained initial access through a compromised employee credential before attempting lateral privilege escalation.": "David, güvenlik operasyonları ekibimiz etkilenen tüm veri tabanı segmentlerini karantinaya aldı. Saldırgan, yanal yetki yükseltmeye çalışmadan önce güvenliği ihlal edilmiş bir çalışan kimlik bilgisi üzerinden ilk erişimi sağlamış olmalı.",
    "Were any unencrypted customer credit card details exfiltrated?": "Şifrelenmemiş herhangi bir müşteri kredi kartı bilgisi dışarı sızdırıldı mı?",
    "No. Under our zero-trust architecture, all payment information is tokenized and encrypted with hardware-backed keys. However, customer contact records and hashed passwords were compromised.": "Hayır. Sıfır güven mimarimiz uyarınca tüm ödeme bilgileri simgeleştirilmiş ve donanım destekli anahtarlarla şifrelenmiştir. Ancak müşteri iletişim kayıtları ve özetlenmiş şifreler ele geçirildi.",
    "We should have enforced hardware-based security keys across all departments last quarter; this breach could have been prevented entirely.": "Geçen çeyrekte tüm departmanlarda donanım tabanlı güvenlik anahtarlarını zorunlu kılmalıydık; bu ihlal tamamen önlenebilirdi.",
    "Be that as it may, our priority right now is remediation and transparency. It is vital that we notify regulatory authorities within the mandatory 72-hour window and mandate an immediate password reset for all active accounts.": "Öyle olsa bile şu anki önceliğimiz düzeltme ve şeffaflıktır. Zorunlu 72 saatlik süre içinde düzenleyici kurumlara bildirimde bulunmamız ve tüm aktif hesaplar için acil şifre sıfırlamayı zorunlu kılmamız hayati önem taşımaktadır.",
    "I am drafting the public disclosure statement now. Under no circumstances will we attempt to downplay the severity of the incident. Honesty is paramount for preserving customer trust.": "Şu anda kamuya açıklama metnini hazırlıyorum. Hiçbir koşulda olayın ciddiyetini önemsiz göstermeye çalışmayacağız. Müşteri güvenini korumak için dürüstlük her şeyden önemlidir.",
    "Absolutely. Once the containment is verified, we will publish a comprehensive post-mortem detailing our upgraded defensive architecture.": "Kesinlikle. Kontrol altına alma doğrulandıktan sonra yükseltilmiş savunma mimarimizi detaylandıran kapsamlı bir olay sonrası kök neden analizi yayınlayacağız.",
    'Notice the past regret: "We should have enforced security keys; this breach could have been prevented." High-stakes B2 corporate communication!': 'Geçmiş pişmanlık kalıbına dikkat edin: "We should have enforced security keys; this breach could have been prevented." Yüksek riskli B2 kurumsal iletişimi!',

    # B2_POD05
    "Welcome to Episode 5! Professor Alan and automotive software engineer Rachel analyze the technical triumphs and ethical dilemmas of Level 4 self-driving vehicles.": "Bölüm 5'e hoş geldiniz! Profesör Alan ve otomotiv yazılım mühendisi Rachel, Seviye 4 otonom araçların teknik başarılarını ve etik ikilemlerini analiz ediyorlar.",
    "Rachel, autonomous driving technology is reported to have achieved superhuman reaction speeds in highway environments. However, how does your perception stack navigate unpredictable urban edge cases?": "Rachel, otonom sürüş teknolojisinin otoyol ortamlarında insanüstü tepki hızlarına ulaştığı bildiriliyor. Ancak algılama sisteminiz öngörülemeyen kentsel sınır durumları nasıl yönetiyor?",
    "In dense urban traffic, our architecture relies on multi-modal sensor fusion. Combining LiDAR point clouds, radar telemetry, and high-resolution camera feeds, the onboard inference engine constructs an omnidirectional 3D occupancy grid fifty times per second.": "Yoğun şehir içi trafikte mimarimiz çok modlu sensör füzyonuna dayanmaktadır. LiDAR nokta bulutlarını, radar telemetrisini ve yüksek çözünürlüklü kamera akışlarını birleştiren araç içi çıkarım motoru saniyede elli kez çok yönlü bir 3D doluluk ızgarası oluşturur.",
    "But what occurs when an unavoidable collision scenario manifests? How does the vehicle's decision-making algorithm prioritize passenger safety versus pedestrian protection?": "Peki kaçınılmaz bir çarpışma senaryosu ortaya çıktığında ne olur? Aracın karar verme algoritması yolcu güvenliği ile yaya koruması arasında nasıl bir önceliklendirme yapar?",
    "That is the quintessential philosophical dilemma in our field. Were a vehicle to encounter an unavoidable collision, its deterministic trajectory planner is programmed to minimize kinetic energy dissipation rather than making qualitative ethical judgments regarding human lives.": "Bu, alanımızdaki en temel felsefi ikilemdir. Bir araç kaçınılmaz bir çarpışmayla karşılaşacak olsaydı, öngörülebilir yörünge planlayıcısı insan hayatına ilişkin niteliksel etik yargılarda bulunmaktan ziyade kinetik enerji dağılımını en aza indirecek şekilde programlanmıştır.",
    "It is widely acknowledged that autonomous driving will eliminate ninety percent of human error-induced traffic fatalities.": "Otonom sürüşün insan hatasından kaynaklanan trafik ölümlerinin yüzde doksanını ortadan kaldıracağı genel olarak kabul edilmektedir.",
    "Indeed. Notwithstanding the sensationalized media scrutiny surrounding isolated edge-case failures, empirical safety statistics unequivocally favor autonomous transport over human drivers.": "Gerçekten de öyle. Münferit sınır durum arızalarını çevreleyen sansasyonel medya incelemelerine rağmen ampirik güvenlik istatistikleri insan sürücülere kıyasla kesin bir şekilde otonom ulaşımı desteklemektedir.",
    'Notice the participle clause: "Combining LiDAR point clouds, radar telemetry, and camera feeds, the engine constructs a 3D grid." Pure technical English!': 'Bağlaçlı yan cümleye dikkat edin: "Combining LiDAR point clouds, radar telemetry, and camera feeds, the engine constructs a 3D grid." Saf teknik İngilizce!',

    # B2_POD06
    "In Episode 6, corporate counsel Jonathan negotiates terms with enterprise SaaS sales director Karen for a multi-million-dollar software licensing agreement.": "6. Bölümde şirket hukuk müşaviri Jonathan, çok milyon dolarlık bir yazılım lisanslama sözleşmesi için kurumsal SaaS satış direktörü Karen ile şartları müzakere ediyor.",
    "Karen, we have reviewed your Master Services Agreement draft. While we appreciate the custom pricing tier, several contractual clauses require amendment before our board will execute the contract.": "Karen, Ana Hizmet Sözleşmesi taslağınızı inceledik. Özel fiyatlandırma kademesini takdir etmekle birlikte, yönetim kurulumuz sözleşmeyi imzalamadan önce birkaç sözleşme maddesinin değiştirilmesi gerekmektedir.",
    "We are completely open to negotiation, Jonathan. Which specific provisions are causing concern for your legal team?": "Müzakereye tamamen açığız Jonathan. Hangi özel hükümler hukuk ekibinizde endişe yaratıyor?",
    "First and foremost, our corporate governance mandates that your uptime SLA be guaranteed at 99.99%, rather than the proposed 99.9%. Furthermore, should your service experience downtime exceeding thirty minutes in any calendar month, our contract must provide financial service credits.": "İlk ve en önemlisi kurumsal yönetimimiz, önerilen %99.9 yerine hizmet kesintisizlik SLA'nizin %99.99 olarak garanti edilmesini zorunlu kılmaktadır. Dahası, hizmetiniz herhangi bir takvim ayında otuz dakikayı aşan bir kesinti yaşarsa, sözleşmemiz mali hizmet kredileri sağlamalıdır.",
    "We can accommodate a 99.99% uptime commitment, provided that scheduled maintenance windows are excluded from the downtime calculation.": "Planlanmış bakım pencerelerinin kesinti süresi hesaplamasından hariç tutulması koşuluyla %99.99 çalışma süresi taahhüdünü karşılayabiliriz.",
    "That is acceptable. Secondly, regarding data ownership: it is imperative that all customer telemetry remain our exclusive intellectual property upon contract termination.": "Bu kabul edilebilir. İkinci olarak veri mülkiyeti konusunda: sözleşmenin feshi durumunda tüm müşteri telemetri verilerinin münhasıran bizim fikri mülkiyetimiz olarak kalması zorunludur.",
    "Absolutely. Our security architecture ensures that upon termination, your data will be exported in an encrypted format and permanently expunged from our servers.": "Kesinlikle. Güvenlik mimarimiz fesih durumunda verilerinizin şifreli bir formatta dışa aktarılmasını ve sunucularımızdan kalıcı olarak silinmesini sağlar.",
    "Excellent. If you incorporate these amended indemnity and liability clauses into the revised draft, we will sign the three-year agreement by Friday.": "Mükemmel. Bu revize edilmiş tazminat ve sorumluluk maddelerini taslağa dahil ederseniz, üç yıllık anlaşmayı Cuma gününe kadar imzalayacağız.",
    'Notice the formal Subjunctive: "It is imperative that all customer telemetry remain our property." Essential for legal and corporate negotiations!': 'Resmi İsteme Kipine dikkat edin: "It is imperative that all customer telemetry remain our property." Hukuk ve kurumsal müzakereler için vazgeçilmez!',

    # B2_POD07
    "Welcome to Episode 7! Industrial psychologist Dr. Miller and HR executive Daniel discuss mitigating workplace burnout and cultivating healthy asynchronous engineering cultures.": "Bölüm 7'ye hoş geldiniz! Endüstriyel psikolog Dr. Miller ve İK yöneticisi Daniel, iş yerinde tükenmişliği azaltmayı ve sağlıklı asenkron mühendislik kültürleri geliştirmeyi tartışıyorlar.",
    "Dr. Miller, over the past eighteen months, our quarterly employee surveys have indicated a concerning rise in cognitive fatigue and burnout, particularly among our senior engineering staff.": "Dr. Miller, son on sekiz ayda üç aylık çalışan anketlerimiz, özellikle kıdemli mühendislik personelimiz arasında bilişsel yorgunluk ve tükenmişlikte endişe verici bir artışa işaret etti.",
    "That is a prevalent industry-wide phenomenon, Daniel. Operating in a perpetual state of hyper-connectivity, knowledge workers rarely have the opportunity to disconnect cognitively from urgent Slack notifications and sprint pressures.": "Bu, sektör genelinde çok yaygın bir olgudur Daniel. Sürekli bir aşırı bağlantı halinde çalışan bilgi işçileri, acil Slack bildirimlerinden ve sprint baskılarından bilişsel olarak kopma fırsatını nadiren bulabiliyorlar.",
    "We used to believe that offering catered lunches and ergonomic office desks was sufficient to preserve employee well-being.": "Eskiden ücretsiz öğle yemekleri ve ergonomik ofis masaları sunmanın çalışan refahını korumak için yeterli olduğuna inanırdık.",
    "Those perks are superficial. True structural mental wellness requires having managers respect strict after-hours communication boundaries. Seldom do employees burn out from challenging technical problems; rather, they burn out from chronic contextual switching and unpredictable deadlines.": "Bu yan haklar yüzeyseldir. Gerçek yapısal zihinsel sağlık, yöneticilerin mesai sonrası katı iletişim sınırlarına saygı duymasını gerektirir. Çalışanlar nadiren zorlu teknik problemlerden ötürü tükenir; aksine kronik bağlam değişiminden ve öngörülemeyen teslim tarihlerinden tükenirler.",
    "We recently introduced a company-wide policy of 'No-Meeting Wednesdays' and encouraged asynchronous documentation over reactive messaging.": "Yakın zamanda şirket genelinde 'Toplantısız Çarşamba' politikası başlattık ve anlık reaktif mesajlaşma yerine asenkron dokümantasyonu teşvik ettik.",
    "That is an exceptional structural intervention. By fostering an asynchronous environment, you empower your engineers to enter uninterrupted deep work states, thereby enhancing both output quality and psychological well-being.": "Bu olağanüstü bir yapısal müdahaledir. Asenkron bir ortamı teşvik ederek mühendislerinizin kesintisiz derin çalışma durumlarına girmelerini sağlar, böylece hem çıktı kalitesini hem de psikolojik refahı artırırsınız.",
    "In the final analysis, employee retention and sustainable productivity are inseparable.": "Son tahlilde çalışan bağlılığı ile sürdürülebilir üretkenlik birbirinden ayrılamaz.",
    'Notice the participle phrase: "Operating in a perpetual state of hyper-connectivity..." and the inversion "Seldom do employees burn out from technical problems."': 'Bağlaçlı ifadeye dikkat edin: "Operating in a perpetual state of hyper-connectivity..." ve devrik cümle "Seldom do employees burn out from technical problems."',

    # B2_POD08
    "In Episode 8, science journalist Claire interviews biotechnology researcher Dr. Aris about the revolutionary therapeutic potential of CRISPR gene editing.": "8. Bölümde bilim gazetecisi Claire, biyoteknoloji araştırmacısı Dr. Aris ile CRISPR gen düzenlemenin devrim niteliğindeki tedavi edici potansiyeli hakkında röportaj yapıyor.",
    "Claire, genetic therapies are considered to be on the verge of eradicating previously incurable hereditary blood disorders. What was the critical breakthrough that enabled this clinical transition?": "Claire, genetik tedavilerin daha önce tedavi edilemeyen kalıtsal kan bozukluklarını ortadan kaldırmanın eşiğinde olduğu düşünülüyor. Bu klinik geçişi sağlayan kritik atılım neydi?",
    "The decisive breakthrough was the refinement of molecular precision. Targeting defective genetic sequences with sub-nanometer accuracy, our CRISPR-Cas9 enzyme acts as molecular scissors through which pathogenic mutations are excised and replaced with healthy genomic code.": "Belirleyici atılım, moleküler hassasiyetin geliştirilmesiydi. Kusurlu genetik dizilimleri nanometre altı doğrulukla hedefleyen CRISPR-Cas9 enzimimiz, patojenik mutasyonların kesilip çıkarıldığı ve yerine sağlıklı genomik kodun yerleştirildiği moleküler bir makas görevi görür.",
    "In recent clinical trials, this protocol is reported to have cured patients suffering from sickle cell anemia permanently.": "Son klinik deneylerde bu protokolün orak hücre anemisi çeken hastaları kalıcı olarak iyileştirdiği bildirildi.",
    "Indeed. Had we not mapped the complete human genome two decades ago, such precision genetic engineering would remain science fiction today (Mixed Conditional).": "Gerçekten de öyle. Yirmi yıl önce insan genomunun tamamını haritalandırmamış olsaydık, bu tür hassas genetik mühendisliği bugün bilim kurgu olarak kalırdı.",
    "What are the remaining regulatory and bioethical hurdles before these treatments become globally accessible?": "Bu tedaviler küresel olarak erişilebilir hale gelmeden önce geriye kalan düzenleyici ve biyoetik engeller nelerdir?",
    "The primary challenge is scalable manufacturing. Synthesized in specialized sterile facilities, custom cellular therapies currently cost hundreds of thousands of dollars per patient.": "Birincil zorluk ölçeklenebilir üretimdir. Özel steril tesislerde sentezlenen kişiye özel hücresel tedaviler şu anda hasta başına yüz binlerce dolara mal olmaktadır.",
    "It is essential that scientific institutions ensure equitable access to these lifesaving therapies rather than letting them become exclusive privileges for wealthy nations.": "Bilimsel kurumların hayat kurtaran bu tedavilerin zengin uluslar için ayrıcalık haline gelmesine izin vermek yerine adil erişimi sağlaması şarttır.",
    "Absolutely. Science achieves its highest purpose only when it elevates all humanity.": "Kesinlikle. Bilim en yüksek amacına ancak tüm insanlığı yücelttiği zaman ulaşır.",
    'Notice the relative clause with preposition: "molecular scissors through which pathogenic mutations are excised." Masterful scientific English!': 'Edatlı ilgi cümleciğine dikkat edin: "molecular scissors through which pathogenic mutations are excised." Usta işi bilimsel İngilizce!',

    # B2_POD09
    "Welcome to Episode 9! CEO Julian and organizational consultant Maya examine the cultural and philosophical shifts driving the global remote work revolution.": "Bölüm 9'a hoş geldiniz! CEO Julian ve organizasyon danışmanı Maya, küresel uzaktan çalışma devrimini yönlendiren kültürel ve felsefi değişimleri inceliyorlar.",
    "Julian, your enterprise software company operates with two hundred engineers across thirty different countries with zero physical corporate offices. What philosophical principle underpins this distributed model?": "Julian, kurumsal yazılım şirketiniz sıfır fiziksel ofisle otuz farklı ülkede iki yüz mühendisle faaliyet gösteriyor. Bu dağıtık modelin temelinde hangi felsefi ilke yatıyor?",
    "We believe that exceptional talent is distributed globally, whereas historical employment opportunities were concentrated in a handful of expensive metropolitan hubs. In 2020, we knew that remote work would prevail over rigid physical colocation.": "Olağanüstü yeteneğin küresel olarak dağıldığına, oysa geçmişteki istihdam fırsatlarının birkaç pahalı metropol merkezinde toplandığına inanıyoruz. 2020'de uzaktan çalışmanın katı fiziksel birlikteliğe üstün geleceğini biliyorduk.",
    "But how do you cultivate cohesive corporate culture when team members are separated by twelve time zones?": "Peki ekip üyeleri on iki saat dilimiyle ayrıldığında uyumlu bir şirket kültürünü nasıl geliştiriyorsunuz?",
    "By replacing micromanagement with radical autonomy and asynchronous transparency. Under no circumstances do we measure working hours or keystrokes; we measure objective pull request impact and customer satisfaction.": "Mikro yönetimin yerine radikal özerklik ve asenkron şeffaflığı koyarak. Hiçbir koşulda çalışma saatlerini veya klavye vuruşlarını ölçmüyoruz; objektif katkı etkisini ve müşteri memnuniyetini ölçüyoruz.",
    "Despite the undeniable operational freedom, some leaders fear that spontaneous innovation diminishes without physical watercooler conversations.": "İnkar edilemez operasyonel özgürlüğe rağmen bazı liderler fiziksel ayaküstü sohbetler olmadan anlık yenilikçiliğin azalmasından korkuyor.",
    "On the contrary, our best architectural breakthroughs emerged from structured, thoughtful written proposals rather than chaotic brainstorming sessions. Had we constrained our hiring to a single city, we would never have assembled such an extraordinarily diverse and brilliant engineering team.": "Aksine en iyi mimari atılımlarımız kaotik beyin fırtınası seanslarından ziyade yapılandırılmış, iyi düşünülmüş yazılı önerilerden ortaya çıktı. İşe alımımızı tek bir şehirle sınırlamış olsaydık, bu kadar olağanüstü çeşitlilikte ve parlak bir mühendislik ekibini asla bir araya getiremezdik.",
    "In essence, geography is no longer destiny in the modern knowledge economy.": "Özünde modern bilgi ekonomisinde coğrafya artık kader değildir.",
    'Look at the future in the past: "We knew that remote work would prevail." Notice how Julian structures persuasive, executive-level arguments!': 'Geçmişteki geleceğe bakın: "We knew that remote work would prevail." Julian\'ın ikna edici yönetici düzeyinde argümanları nasıl yapılandırdığına dikkat edin!',

    # B2_POD10
    "In our final B2 episode, cyber law attorney Marcus and Data Protection Officer Helena debate regulatory enforcement, digital sovereignty, and the future of consumer privacy.": "Son B2 bölümümüzde siber hukuk avukatı Marcus ve Veri Koruma Görevlisi Helena; yasal yaptırımları, dijital egemenliği ve tüketici gizliliğinin geleceğini tartışıyorlar.",
    "Helena, as machine learning models ingest colossal volumes of personal user data, how are international privacy frameworks adapting to prevent mass surveillance?": "Helena, makine öğrenimi modelleri devasa miktarda kişisel kullanıcı verisini işlerken, uluslararası gizlilik çerçeveleri kitlesel gözetimi önlemek için nasıl uyum sağlıyor?",
    "The regulatory landscape is undergoing aggressive transformation, Helena. The stringent enforcement of data sovereignty frameworks such as GDPR and CCPA mandates that personal telemetry be anonymized and processed strictly under explicit consent.": "Yasal düzenleme alanı agresif bir dönüşümden geçiyor Helena. GDPR ve CCPA gibi veri egemenliği çerçevelerinin sıkı uygulanması, kişisel telemetri verilerinin anonimleştirilmesini ve kesinlikle açık rıza kapsamında işlenmesini zorunlu kılıyor.",
    "It was the unregulated monetization of personal behavioral data that gave rise to modern surveillance capitalism.": "Modern gözetim kapitalizmini doğuran şey kişisel davranışsal verilerin denetimsiz paraya dönüştürülmesiydi.",
    "Exactly. Not only do current regulations impose multi-million-dollar fines on non-compliant corporations, but they also empower individuals with the absolute 'right to be forgotten'.": "Kesinlikle. Mevcut düzenlemeler sadece uyumsuz şirketlere milyonlarca dolarlık para cezaları getirmekle kalmıyor, aynı zamanda bireyleri mutlak 'unutulma hakkı' ile güçlendiriyor.",
    "In our engineering department, privacy is no longer an afterthought; it is integrated directly into our architectural blueprints via privacy-by-design principles.": "Mühendislik departmanımızda gizlilik artık sonradan akla gelen bir düşünce değildir; tasarımdan gelen gizlilik ilkeleri aracılığıyla doğrudan mimari planlarımıza entegre edilmiştir.",
    "Should corporations fail to uphold these fundamental digital rights, consumer trust will evaporate irreversibly.": "Şirketler bu temel dijital hakları koruyamazlarsa tüketici güveni geri döndürülemez şekilde buharlaşacaktır.",
    "Suffice it to say, strong cryptographic encryption and transparent data governance are completely non-negotiable in the twenty-first century.": "Şunu belirtmek yeterlidir ki güçlü kriptografik şifreleme ve şeffaf veri yönetişimi yirmi birinci yüzyılda kesinlikle tartışmaya kapalıdır.",
    'Congratulations on completing the entire B2 Upper-Intermediate series! You now have a complete, professional, and intellectually rich English listening foundation!': 'Tüm B2 İleri Seviye serisini tamamladığınız için tebrikler! Artık eksiksiz, profesyonel ve entelektüel açıdan zengin bir İngilizce dinleme temeline sahipsiniz!'
}

with open(r"D:\ingilizce\backend\scripts\master_translations.json", "r", encoding="utf-8") as f:
    all_translations = json.load(f)

def normalize_txt(s):
    return re.sub(r'[^a-zA-Z0-9]', '', s).lower()

norm_translations = {normalize_txt(k): v for k, v in all_translations.items()}

print(f"Loaded {len(all_translations)} total master Turkish translations ({len(norm_translations)} normalized)!")

def build_data():
    with open(TIMINGS_PATH, 'r', encoding='utf-8') as f:
        timings = json.load(f)

    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace(r'\[', '[').replace(r'\]', ']').replace(r'\_', '_').replace(r'\!', '!').replace(r'\-', '-').replace(r'\.', '.').replace(r'\,', ',')
    ep_indices = [m.start() for m in re.finditer(r'###\s+\[([A-Z0-9_]+)\]', normalized)]
    ep_indices.append(len(normalized))

    episodes = []

    for k in range(len(ep_indices) - 1):
        block = normalized[ep_indices[k]:ep_indices[k+1]]
        header_m = re.search(r'###\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', block)
        if not header_m:
            continue

        code = header_m.group(1).strip()
        full_title = header_m.group(2).strip()

        level = code[:2]
        ep_num = int(code.split('_POD')[1])

        if '(' in full_title and full_title.endswith(')'):
            title_en = full_title.split('(')[0].strip()
            subtitle_tr = full_title.split('(')[1].rstrip(')').strip()
        else:
            title_en = full_title
            subtitle_tr = f"{level} Seviye • Bölüm {ep_num}"

        icerik_m = re.search(r'-\s+\*\*İçerik:\*\*\s+([^\n]+)', block)
        hedef_m = re.search(r'-\s+\*\*Hedef Dil Yapıları:\*\*\s+([^\n]+)', block)
        anahtar_m = re.search(r'-\s+\*\*Anahtar Kelimeler:\*\*\s+([^\n]+)', block)

        description = icerik_m.group(1).strip() if icerik_m else ""
        topics_raw = hedef_m.group(1).strip() if hedef_m else ""
        topics = [t.strip() for t in topics_raw.split(',') if t.strip()][:4]

        # Key vocab
        key_vocab = []
        if anahtar_m:
            vocab_raw = anahtar_m.group(1).strip()
            vocab_items = re.findall(r'([^,;()]+)\s*\(([^)]+)\)', vocab_raw)
            for term, mean in vocab_items:
                clean_term = term.strip()
                clean_mean = mean.strip()
                if clean_term and clean_mean:
                    key_vocab.append({
                        'term': clean_term,
                        'meaningTr': clean_mean,
                        'example': f"Practice using '{clean_term}' in daily conversation."
                    })

        # Turns
        script_m = re.search(r'####\s+Tam Podcast Senaryosu[^\n]*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
        script_text = script_m.group(1).strip() if script_m else ""

        turn_matches = list(re.finditer(r'\*\*(\[[^\]]+\]|[A-Za-z0-9\s/().,\'-]+?:)\*\*', script_text))
        turns = []

        speaker_avatar_assigned = {}
        male_a_idx = 0
        female_a_idx = 0

        for t_idx in range(len(turn_matches)):
            start_pos = turn_matches[t_idx].end()
            end_pos = turn_matches[t_idx + 1].start() if t_idx + 1 < len(turn_matches) else len(script_text)

            spk_raw = turn_matches[t_idx].group(1).rstrip(':').strip()
            speech = script_text[start_pos:end_pos].strip()

            speech = re.sub(r'\s*\(\.\.\..*?\.\.\.\)\s*', ' ', speech)
            speech = speech.replace('*', '').replace('"', '').strip()

            if not speech:
                continue

            is_host = 'Host' in spk_raw or '[' in spk_raw or 'Sunucu' in spk_raw
            clean_name = spk_raw.replace('[', '').replace(']', '').strip()

            if is_host:
                if 'Intro' in clean_name:
                    display_speaker = '🎙️ TalkStage Sunucu'
                    role = 'Ders Rehberi (Giriş)'
                elif 'Outro' in clean_name:
                    display_speaker = '🎙️ TalkStage Sunucu'
                    role = 'Ders Rehberi (Kapanış)'
                else:
                    display_speaker = '🎙️ TalkStage Sunucu'
                    role = 'Ders Rehberi'
                avatar = 'avatarImages.femaleLead'
            else:
                display_speaker = clean_name
                role = 'Konuşmacı'

                if display_speaker not in speaker_avatar_assigned:
                    if is_female_name(display_speaker):
                        a = FEMALE_AVATARS[female_a_idx % len(FEMALE_AVATARS)]
                        female_a_idx += 1
                    else:
                        a = MALE_AVATARS[male_a_idx % len(MALE_AVATARS)]
                        male_a_idx += 1
                    speaker_avatar_assigned[display_speaker] = a

                avatar = speaker_avatar_assigned[display_speaker]

            # Match translation in dictionary
            clean_speech = speech.replace('\r', ' ').replace('\n', ' ').strip()
            tr_text = all_translations.get(clean_speech, "")

            if not tr_text:
                tr_text = norm_translations.get(normalize_txt(clean_speech), "")

            if not tr_text:
                norm_c = normalize_txt(clean_speech)
                for k_norm, v_tr in norm_translations.items():
                    if len(k_norm) > 15 and (k_norm in norm_c or norm_c in k_norm):
                        tr_text = v_tr
                        break

            # Fallback if somehow missing
            if not tr_text:
                tr_text = clean_speech

            turns.append({
                'index': len(turns) + 1,
                'speaker': display_speaker,
                'speakerRole': role,
                'avatar': avatar,
                'textEn': clean_speech,
                'textTr': tr_text
            })

        slug_title = re.sub(r'[^a-z0-9]+', '_', title_en.lower()).strip('_')
        ep_id = f"podcast_{level.lower()}_ep{ep_num:02d}_{slug_title[:12]}"

        level_tr_name = 'Başlangıç' if level == 'A1' else 'Temel' if level == 'A2' else 'Orta' if level == 'B1' else 'İleri'
        level_label = f"{level} {level_tr_name} • Bölüm {ep_num}"

        cover_idx = min(ep_num - 1, len(COVER_MAP[level]) - 1)
        cover_img = COVER_MAP[level][cover_idx]

        unique_spks = []
        for t in turns:
            if not any(s['name'] == t['speaker'] for s in unique_spks):
                unique_spks.append({
                    'name': t['speaker'],
                    'role': t['speakerRole'],
                    'avatar': t['avatar']
                })

        episodes.append({
            'code': code,
            'id': ep_id,
            'level': level,
            'ep_num': ep_num,
            'title': title_en,
            'subtitle': subtitle_tr,
            'levelLabel': level_label,
            'coverImage': cover_img,
            'audioAsset': f"require('../../assets/audio/{ep_id}.mp3')",
            'description': description,
            'topicsCovered': topics,
            'speakers': unique_spks,
            'keyVocab': key_vocab,
            'turns': turns
        })

    # Build TypeScript
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

    for ep in episodes:
        ep_id = ep['id']
        t_data = timings.get(ep_id, {})
        total_sec = int(round(t_data.get('total_sec', 120)))
        mins = total_sec // 60
        secs = total_sec % 60
        dur_label = f"{mins}:{secs:02d} Dk"

        measured_turns_map = {item['index']: item['startSec'] for item in t_data.get('turns', [])}

        clean_title = ep['title'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
        clean_sub = ep['subtitle'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
        clean_desc = ep['description'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")

        ts_lines.append("  {")
        ts_lines.append(f"    id: '{ep_id}',")
        ts_lines.append(f"    title: '{clean_title}',")
        ts_lines.append(f"    subtitle: '{clean_sub}',")
        ts_lines.append(f"    level: '{ep['level']}',")
        ts_lines.append(f"    levelLabel: '{ep['levelLabel']}',")
        ts_lines.append(f"    durationLabel: '{dur_label}',")
        ts_lines.append(f"    durationSec: {total_sec},")
        ts_lines.append(f"    coverImage: {ep['coverImage']},")
        ts_lines.append(f"    audioAsset: {ep['audioAsset']},")
        ts_lines.append(f"    description: '{clean_desc}',")
        ts_lines.append(f"    topicsCovered: {json.dumps(ep['topicsCovered'], ensure_ascii=False)},")

        # Speakers
        ts_lines.append("    speakers: [")
        for sp in ep['speakers']:
            s_name = sp['name'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            s_role = sp['role'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            ts_lines.append(f"      {{ name: '{s_name}', role: '{s_role}', avatar: {sp['avatar']} }},")
        ts_lines.append("    ],")

        # Key vocab
        ts_lines.append("    keyVocab: [")
        for kv in ep['keyVocab']:
            k_term = kv['term'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            k_mean = kv['meaningTr'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            k_ex = kv['example'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            ts_lines.append(f"      {{ term: '{k_term}', meaningTr: '{k_mean}', example: '{k_ex}' }},")
        ts_lines.append("    ],")

        # Dialogue turns
        ts_lines.append("    dialogue: [")
        for t in ep['turns']:
            t_idx = t['index']
            start_sec = int(round(measured_turns_map.get(t_idx, (t_idx - 1) * 8)))
            s_name = t['speaker'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            s_role = t['speakerRole'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            text_en = t['textEn'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            text_tr = t['textTr'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")

            ts_lines.append("      {")
            ts_lines.append(f"        id: '{t_idx}',")
            ts_lines.append(f"        speaker: '{s_name}',")
            ts_lines.append(f"        speakerRole: '{s_role}',")
            ts_lines.append(f"        avatar: {t['avatar']},")
            ts_lines.append(f"        textEn: '{text_en}',")
            ts_lines.append(f"        textTr: '{text_tr}',")
            ts_lines.append(f"        timeSec: {start_sec},")
            ts_lines.append("      },")
        ts_lines.append("    ],")
        ts_lines.append("  },")

    ts_lines.append("];")

    with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines) + '\n')

    print(f"🎉 Successfully built 40 episodes with FULL TURKISH TRANSLATIONS in {DATA_TS_PATH}!")
    return True

if __name__ == '__main__':
    build_data()
