# Master CEFR English Curriculum, Categorized Vocabulary & Daily Learning Roadmap (A1 – C2)

> **Kapsamlı İngilizce Müfredatı, Kelime Veri Seti ve Algoritmik Günlük Çalışma Yol Haritası**

Bu doküman ve beraberindeki `english_curriculum_database.json` veri seti; **A1'den C2'ye kadar** tüm İngilizce seviyelerindeki gramer konularını, isim/fiil/sıfat/zarf/edat olarak sınıflandırılmış kelimeleri, 90 dakikalık modüler çalışma planını ve aralıklı tekrar (Spaced Repetition \- SRS) algoritmalarını içermektedir. Doğrudan mobil (Kotlin/Android), web (React/Next.js) veya arka uç (Python/Node.js) projelerine veri tabanı tohumu (seed) veya JSON kaynağı olarak entegre edilebilir.

## 1\. Sistem ve Mimari Genel Bakış

Uygulamanız için önerilen günlük 90 dakikalık öğrenme döngüsü (**Reading hariç tutularak**):

- **Kelime Modülü (20 dk):** 10 dk SRS (Aralıklı Tekrar) \+ 10 dk Yeni Kelimeler (İsim, Fiil, Sıfat, Zarf).  
- **Gramer Modülü (25 dk):** 15 dk Kural ve Yapı İncelemesi \+ 10 dk Cümle Çıkarma ve Şablon Alıştırması.  
- **Dinleme Modülü (Listening \- 25 dk):** 10 dk Pasif/Aktif Dinleme \+ 15 dk Gölgeleme (Shadowing \- sesli tekrar).  
- **Yazma Modülü (Writing \- 20 dk):** Günün gramer konusunu ve yeni kelimelerini içeren 5-8 cümlelik serbest yazım.

### Aralıklı Tekrar (Spaced Repetition \- SRS) Algoritması

Öğrenilen her kelime ve gramer yapısı için varsayılan tekrar günleri:

| Tekrar Aşaması | Zaman Aralığı | Amaç |
| :---- | :---- | :---- |
| **R1 (İlk Tekrar)** | 1 Gün Sonra | Kısa süreli hafızadan çalışma belleğine aktarım |
| **R2 (İkinci Tekrar)** | 3 Gün Sonra | Unutma eğrisinin ilk kırılma noktasını engelleme |
| **R3 (Üçüncü Tekrar)** | 7 Gün Sonra (Haftalık Dönüm) | Aktif üretimde (Writing) cümle içi pekiştirme |
| **R4 (Dördüncü Tekrar)** | 14 Gün Sonra | Uzun süreli hafızaya sabitleme |
| **R5 (Beşinci Tekrar)** | 30 Gün Sonra (Aylık Sentez) | Otomatikleşme ve dinlemede doğrudan anlama |

---

## 2.1 Seviye: A1 (Beginner / Breakthrough)

**CEFR Tanımı:** Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type. Can introduce him/herself and others.

**Hedef Çalışma Süresi:** 30 Gün | **Toplam Gramer Konusu:** 12

### A1 Gramer Konuları ve Yapı Formülleri

#### \[A1\_G01\] Subject Pronouns & Verb To Be (Present) (Özne Zamirleri ve 'To Be' Fiili (Geniş/Şimdiki Zaman))

- **Formül / Kural:** `Subject + am/is/are + Complement`  
- **Açıklama:** Used for identity, profession, origin, age, and state.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I am a software engineer.* → 🇹🇷 Ben bir yazılım mühendisiyim.  
  * 🇬🇧 *They are in the office.* → 🇹🇷 Onlar ofisteler.

#### \[A1\_G02\] Articles (A, An, The) & Demonstratives (This, That, These, Those) (Tanımlıklar (A, An, The) ve İşaret Zamirleri)

- **Formül / Kural:** `a/an + singular countable noun | this/that/these/those + noun`  
- **Açıklama:** 'A/An' for non-specific singular countable nouns; 'The' for specific nouns.  
- **Örnek Cümleler:**  
  * 🇬🇧 *This is an important file.* → 🇹🇷 Bu önemli bir dosyadır.  
  * 🇬🇧 *Those computers are new.* → 🇹🇷 Şu bilgisayarlar yenidir.

#### \[A1\_G03\] Possessive Adjectives & Possessive 's (İyelik Sıfatları (My, Your, His, Her, Its, Our, Their) ve 's İyelik Eki)

- **Formül / Kural:** `Possessive Adjective + Noun | Noun's + Noun`  
- **Açıklama:** Indicates ownership and relationships.  
- **Örnek Cümleler:**  
  * 🇬🇧 *My brother's laptop is fast.* → 🇹🇷 Erkek kardeşimin dizüstü bilgisayarı hızlıdır.  
  * 🇬🇧 *Our project starts today.* → 🇹🇷 Projemiz bugün başlıyor.

#### \[A1\_G04\] Present Simple Tense (Geniş Zaman) (Geniş Zaman (Rutinler, Alışkanlıklar ve Genel Doğrular))

- **Formül / Kural:** `(+) S + V1(s/es) | (-) S + do/does not + V1 | (?) Do/Does + S + V1?`  
- **Açıklama:** Used for daily routines, permanent situations, and facts. Add \-s/-es for he/she/it.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I write clean code every day.* → 🇹🇷 Her gün temiz kod yazarım.  
  * 🇬🇧 *He works at a tech startup.* → 🇹🇷 O bir teknoloji girişiminde çalışıyor.

#### \[A1\_G05\] Adverbs of Frequency (Sıklık Zarfları (Always, Usually, Often, Sometimes, Never))

- **Formül / Kural:** `Subject + Frequency Adverb + Main Verb | Subject + To Be + Frequency Adverb`  
- **Açıklama:** Placed before main verbs but after 'to be'.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I always test my code before pushing.* → 🇹🇷 Kodumu push etmeden önce her zaman test ederim.  
  * 🇬🇧 *She is never late for meetings.* → 🇹🇷 O toplantılara asla geç kalmaz.

#### \[A1\_G06\] Present Continuous Tense (Şimdiki Zaman) (Şimdiki Zaman (Şu Anda Gerçekleşen Eylemler))

- **Formül / Kural:** `(+) S + am/is/are + V-ing | (-) S + am/is/are not + V-ing | (?) Am/Is/Are + S + V-ing?`  
- **Açıklama:** Used for actions happening right now or temporary situations around now.  
- **Örnek Cümleler:**  
  * 🇬🇧 *We are developing a new mobile application.* → 🇹🇷 Yeni bir mobil uygulama geliştiriyoruz.  
  * 🇬🇧 *He is debugging the authentication issue.* → 🇹🇷 O, kimlik doğrulama sorununu ayıklıyor.

#### \[A1\_G07\] Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many) (Sayılan / Sayılamayan İsimler ve Miktar Belirteçleri)

- **Formül / Kural:** `Some (affirmative) / Any (negative & question) / Many (countable) / Much (uncountable)`  
- **Açıklama:** Countable take plural \-s; uncountable do not have plural form.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Do you have any questions about the database?* → 🇹🇷 Veritabanı hakkında hiç sorunuz var mı?  
  * 🇬🇧 *There is some information in the documentation.* → 🇹🇷 Dokümantasyonda biraz bilgi var.

#### \[A1\_G08\] There is / There are & Prepositions of Place ('There is / There are' ve Yer Edatları (in, on, at, under, behind, next to))

- **Formül / Kural:** `There is + Singular Noun | There are + Plural Noun`  
- **Açıklama:** Used to describe presence and physical location of items.  
- **Örnek Cümleler:**  
  * 🇬🇧 *There is an error on line 42\.* → 🇹🇷 42\. satırda bir hata var.  
  * 🇬🇧 *There are three servers in the rack.* → 🇹🇷 Kabinde üç adet sunucu var.

#### \[A1\_G09\] Modal Verb: Can / Can't (Ability & Permission) ('Can / Can't' Modalı (Yetenek, İzin ve Rica))

- **Formül / Kural:** `Subject + can/can't + V1 (base form)`  
- **Açıklama:** No \-s for third person; verb stays in base infinitive form.  
- **Örnek Cümleler:**  
  * 🇬🇧 *She can build responsive web layouts.* → 🇹🇷 O duyarlı web tasarımları oluşturabilir.  
  * 🇬🇧 *Can we access the staging server?* → 🇹🇷 Test sunucusuna erişebilir miyiz?

#### \[A1\_G10\] Past Simple: Verb To Be (Was / Were) (Geçmiş Zaman 'To Be' Fiili (Was / Were))

- **Formül / Kural:** `(+) S + was/were | (-) S + was not (wasn't) / were not (weren't) | (?) Was/Were + S?`  
- **Açıklama:** Used for past states, locations, and descriptions.  
- **Örnek Cümleler:**  
  * 🇬🇧 *The meeting was productive yesterday.* → 🇹🇷 Toplantı dün verimliydi.  
  * 🇬🇧 *We were in the lab all morning.* → 🇹🇷 Bütün sabah laboratuvardaydık.

#### \[A1\_G11\] Past Simple Tense (Regular & Irregular Verbs) (Geçmiş Zaman (Düzenli ve Düzensiz Fiiller, Did))

- **Formül / Kural:** `(+) S + V2 | (-) S + did not (didn't) + V1 | (?) Did + S + V1?`  
- **Açıklama:** Regular verbs add \-ed/-d; irregular verbs change form. Negatives/questions use 'did \+ V1'.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I fixed the bug and deployed the update.* → 🇹🇷 Hatayı düzelttim ve güncellemeyi dağıttım.  
  * 🇬🇧 *Did you receive my email this morning?* → 🇹🇷 Bu sabah e-postamı aldın mı?

#### \[A1\_G12\] Future Tense: Will vs. Be Going To (Gelecek Zaman: 'Will' ve 'Be Going To' Ayrımı)

- **Formül / Kural:** `(+) S + will + V1 / S + am/is/are + going to + V1`  
- **Açıklama:** 'Will' for spontaneous decisions, offers, and promises; 'Be going to' for planned intentions and evident predictions.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I am going to launch the beta version next month.* → 🇹🇷 Gelecek ay beta sürümünü yayınlayacağım (planlanmış).  
  * 🇬🇧 *Wait, I will help you with this script.* → 🇹🇷 Bekle, bu betikte sana yardım edeceğim (anlık karar).

### A1 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (20 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **computer** | `/kəmˈpjuː.tər/` | bilgisayar | My computer is fast. | Bilgisayarım hızlıdır. |
| **project** | `/ˈprɒdʒ.ekt/` | proje | We have a new project. | Yeni bir projemiz var. |
| **problem** | `/ˈprɒb.ləm/` | sorun, problem | There is a small problem. | Küçük bir problem var. |
| **meeting** | `/ˈmiː.tɪŋ/` | toplantı | The meeting is at 2 PM. | Toplantı saat 14:00'te. |
| **student** | `/ˈstjuː.dənt/` | öğrenci | He is a university student. | O bir üniversite öğrencisidir. |
| **teacher** | `/ˈtiː.tʃər/` | öğretmen | Our teacher explains well. | Öğretmenimiz iyi açıklar. |
| **family** | `/ˈfæm.əl.i/` | aile | I love my family. | Ailemi seviyorum. |
| **friend** | `/frend/` | arkadaş | He is my best friend. | O benim en iyi arkadaşım. |
| **office** | `/ˈɒf.ɪs/` | ofis | Our office is downtown. | Ofisimiz şehir merkezinde. |
| **message** | `/ˈmes.ɪdʒ/` | mesaj | I sent a message to you. | Sana bir mesaj gönderdim. |
| **file** | `/faɪl/` | dosya | Please download this file. | Lütfen bu dosyayı indirin. |
| **data** | `/ˈdeɪ.tə/` | veri | The database stores data. | Veritabanı veriyi depolar. |
| **question** | `/ˈkwes.tʃən/` | soru | Ask a question. | Bir soru sor. |
| **answer** | `/ˈɑːn.sər/` | cevap | I know the answer. | Cevabı biliyorum. |
| **time** | `/taɪm/` | zaman, vakit | Do you have time? | Vaktin var mı? |
| **day** | `/deɪ/` | gün | Have a nice day. | İyi günler. |
| **week** | `/wiːk/` | hafta | See you next week. | Gelecek hafta görüşürüz. |
| **month** | `/mʌnθ/` | ay | We will travel next month. | Gelecek ay seyahat edeceğiz. |
| **year** | `/jɪər/` | yıl | This year is great. | Bu yıl harika. |
| **money** | `/ˈmʌn.i/` | para | Save your money. | Paranı biriktir. |

#### Fiiller (Verbs) (20 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **start** | `/stɑːt/` | başlamak | Let's start the work. | İşe başlayalım. |
| **finish** | `/ˈfɪn.ɪʃ/` | bitirmek | I finish my work at 5\. | İşimi saat 5'te bitiririm. |
| **learn** | `/lɜːn/` | öğrenmek | I learn English every day. | Her gün İngilizce öğreniyorum. |
| **write** | `/raɪt/` | yazmak | Write your name here. | Adını buraya yaz. |
| **read** | `/riːd/` | okumak | Read the documentation. | Dokümantasyonu oku. |
| **speak** | `/spiːk/` | konuşmak | Can you speak English? | İngilizce konuşabilir misin? |
| **listen** | `/ˈlɪs.ən/` | dinlemek | Listen to the audio. | Sesi dinle. |
| **build** | `/bɪld/` | inşa etmek, kurmak | We build web applications. | Web uygulamaları inşa ediyoruz. |
| **make** | `/meɪk/` | yapmak, üretmek | Make a plan. | Bir plan yap. |
| **do** | `/duː/` | yapmak | Do your best. | Elinden gelenin en iyisini yap. |
| **see** | `/siː/` | görmek | I see what you mean. | Ne demek istediğini anlıyorum. |
| **watch** | `/wɒtʃ/` | izlemek | Watch this tutorial. | Bu öğretici videoyu izle. |
| **help** | `/help/` | yardım etmek | Can you help me? | Bana yardım edebilir misin? |
| **need** | `/niːd/` | ihtiyaç duymak | I need more storage. | Daha fazla depolamaya ihtiyacım var. |
| **want** | `/wɒnt/` | istemek | I want to improve my skills. | Becerilerimi geliştirmek istiyorum. |
| **open** | `/ˈəʊ.pən/` | açmak | Open the project folder. | Proje klasörünü aç. |
| **close** | `/kləʊz/` | kapatmak | Close the window. | Pencereyi kapat. |
| **send** | `/send/` | göndermek | Send the invoice. | Faturayı gönder. |
| **receive** | `/rɪˈsiːv/` | almak, teslim almak | Did you receive the payload? | Veri paketini aldın mı? |
| **check** | `/tʃek/` | kontrol etmek | Check the code carefully. | Kodu dikkatlice kontrol et. |

#### Sıfatlar (Adjectives) (15 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **new** | `/njuː/` | yeni | This is a new framework. | Bu yeni bir çerçevedir. |
| **old** | `/əʊld/` | eski, yaşlı | The old system was slow. | Eski sistem yavaştı. |
| **fast** | `/fɑːst/` | hızlı | We need a fast response. | Hızlı bir yanıta ihtiyacımız var. |
| **slow** | `/sləʊ/` | yavaş | The network connection is slow. | Ağ bağlantısı yavaş. |
| **easy** | `/ˈiː.zi/` | kolay | The setup is very easy. | Kurulum çok kolaydır. |
| **hard** | `/hɑːd/` | zor, sert | This algorithm is hard. | Bu algoritma zordur. |
| **simple** | `/ˈsɪm.pəl/` | basit, sade | Keep the design simple. | Tasarımı sade tutun. |
| **important** | `/ɪmˈpɔː.tənt/` | önemli | Security is important. | Güvenlik önemlidir. |
| **clean** | `/kliːn/` | temiz | Write clean code. | Temiz kod yaz. |
| **small** | `/smɔːl/` | küçük | It is a small change. | Bu küçük bir değişikliktir. |
| **big** | `/bɪɡ/` | büyük | We have a big update. | Büyük bir güncellememiz var. |
| **good** | `/ɡʊd/` | iyi | Good job\! | İyi iş\! |
| **bad** | `/bæd/` | kötü | That is a bad idea. | Bu kötü bir fikir. |
| **ready** | `/ˈred.i/` | hazır | Are you ready? | Hazır mısın? |
| **busy** | `/ˈbɪz.i/` | meşgul, yoğun | I am busy today. | Bugün meşgulüm. |

#### Zarflar (Adverbs) (10 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **always** | `/ˈɔːl.weɪz/` | her zaman | Always save your work. | Çalışmanızı her zaman kaydedin. |
| **never** | `/ˈnev.ər/` | asla | Never share passwords. | Şifreleri asla paylaşmayın. |
| **often** | `/ˈɒf.ən/` | sık sık | We meet often. | Sık sık görüşürüz. |
| **sometimes** | `/ˈsʌm.taɪmz/` | bazen | Sometimes bugs happen. | Bazen hatalar olur. |
| **usually** | `/ˈjuː.ʒu.ə.li/` | genellikle | I usually work from home. | Genellikle evden çalışırım. |
| **now** | `/naʊ/` | şimdi | Start now. | Şimdi başla. |
| **today** | `/təˈdeɪ/` | bugün | Release the patch today. | Yamayı bugün yayınlayın. |
| **yesterday** | `/ˈjes.tə.deɪ/` | dün | I fixed it yesterday. | Dün düzelttim. |
| **tomorrow** | `/təˈmɒr.əʊ/` | yarın | See you tomorrow. | Yarın görüşürüz. |
| **very** | `/ˈver.i/` | çok | It is very effective. | Çok etkilidir. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (5 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **in front of** | `/ɪn frʌnt ɒv/` | önünde | Sit in front of the screen. | Ekranın önünde oturun. |
| **next to** | `/nekst tuː/` | yanında | The server is next to the router. | Sunucu modemin yanındadır. |
| **at the moment** | `/æt ðə ˈməʊ.mənt/` | şu anda | I am busy at the moment. | Şu anda meşgulüm. |
| **on time** | `/ɒn taɪm/` | vaktinde, zamanında | Please arrive on time. | Lütfen zamanında gelin. |
| **for example** | `/fɔːr ɪɡˈzɑːm.pəl/` | örneğin | For example, use Python. | Örneğin, Python kullanın. |

### A1 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Özne Zamirleri ve 'To Be' Fiili (Geniş/Şimdiki Zaman) | computer, project, problem, meeting | \- | Write a 60-100 word passage integrating the grammar 'Subject... |
| **Gün 2** | Active Learning & Application | Tanımlıklar (A, An, The) ve İşaret Zamirleri | meeting, student, teacher, family | computer, project | Write a 60-100 word passage integrating the grammar 'Article... |
| **Gün 3** | Active Learning & Application | İyelik Sıfatları (My, Your, His, Her, Its, Our, Their) ve 's İyelik Eki | family, friend, office, message | student, meeting | Write a 60-100 word passage integrating the grammar 'Possess... |
| **Gün 4** | Active Learning & Application | Geniş Zaman (Rutinler, Alışkanlıklar ve Genel Doğrular) | message, file, data, question | friend, computer, project, family | Write a 60-100 word passage integrating the grammar 'Present... |
| **Gün 5** | Active Learning & Application | Sıklık Zarfları (Always, Usually, Often, Sometimes, Never) | question, answer, time, day | message, student, file, meeting | Write a 60-100 word passage integrating the grammar 'Adverbs... |
| **Gün 6** | Active Learning & Application | Şimdiki Zaman (Şu Anda Gerçekleşen Eylemler) | day, week, month, year | question, friend, answer, family | Write a 60-100 word passage integrating the grammar 'Present... |
| **Gün 7** | Milestone Review & Synthesis | Sayılan / Sayılamayan İsimler ve Miktar Belirteçleri | year, money, start, finish | message, day, file, week | Write a 60-100 word passage integrating the grammar 'Countab... |

---

## 2.2 Seviye: A2 (Elementary / Waystage)

**CEFR Tanımı:** Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. basic personal and family info, shopping, local geography, employment).

**Hedef Çalışma Süresi:** 35 Gün | **Toplam Gramer Konusu:** 10

### A2 Gramer Konuları ve Yapı Formülleri

#### \[A2\_G01\] Comparatives & Superlatives (Kıyaslama ve Üstünlük Dereceleri (-er / more than & the \-est / the most))

- **Formül / Kural:** `Adj + -er than / more + Adj + than | the + Adj + -est / the most + Adj`  
- **Açıklama:** Short adjectives add \-er/-est; long adjectives take more/most. Irregular: good-\>better-\>best, bad-\>worse-\>worst.  
- **Örnek Cümleler:**  
  * 🇬🇧 *PostgreSQL is more powerful than SQLite for large datasets.* → 🇹🇷 PostgreSQL büyük veri setleri için SQLite'tan daha güçlüdür.  
  * 🇬🇧 *This is the easiest framework to learn.* → 🇹🇷 Bu öğrenmesi en kolay çerçevedir.

#### \[A2\_G02\] Past Continuous Tense (Geçmişte Süregelen Zaman) (Geçmişte Devam Eden Zaman (was/were \+ V-ing))

- **Formül / Kural:** `(+) S + was/were + V-ing | (-) S + was/were not + V-ing | (?) Was/Were + S + V-ing?`  
- **Açıklama:** Used for actions in progress at a specific time in the past.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I was writing the backend logic at 9 PM yesterday.* → 🇹🇷 Dün saat 21:00'de arka uç mantığını yazıyordum.  
  * 🇬🇧 *They were testing the payment system all afternoon.* → 🇹🇷 Bütün öğleden sonra ödeme sistemini test ediyorlardı.

#### \[A2\_G03\] Past Simple vs. Past Continuous with When & While (When ve While ile Geçmiş Zaman Bağlantıları)

- **Formül / Kural:** `While + Past Continuous, Past Simple | Past Continuous + when + Past Simple`  
- **Açıklama:** 'While' introduces the longer continuous background action; 'When' introduces the interrupting shorter action.  
- **Örnek Cümleler:**  
  * 🇬🇧 *While I was deploying the app, the connection dropped.* → 🇹🇷 Uygulamayı dağıtırken bağlantı koptu.  
  * 🇬🇧 *We were testing the API when the server crashed.* → 🇹🇷 Sunucu çöktüğünde API'yi test ediyorduk.

#### \[A2\_G04\] Modals: Should, Must, Have To, Could, May, Might (Tavsiye, Zorunluluk ve İhtimal Modalları)

- **Formül / Kural:** `Subject + Modal + V1`  
- **Açıklama:** 'Should' for advice; 'Must/Have to' for obligation; 'Could/May/Might' for possibility.  
- **Örnek Cümleler:**  
  * 🇬🇧 *You should refactor this function to improve performance.* → 🇹🇷 Performansı artırmak için bu fonksiyonu yeniden düzenlemelisin.  
  * 🇬🇧 *We have to deliver the milestone by Friday.* → 🇹🇷 Kilometre taşını cuma gününe kadar teslim etmek zorundayız.

#### \[A2\_G05\] Quantifiers & Indefinite Pronouns (A few, A little, Too, Enough, Someone, Anywhere) (Miktar Belirteçleri ve Belgisiz Zamirler)

- **Formül / Kural:** `a few + plural countable | a little + uncountable | too + Adj | Adj + enough`  
- **Açıklama:** 'A few' (countable), 'A little' (uncountable). 'Too' implies excess negativity; 'Enough' implies sufficiency.  
- **Örnek Cümleler:**  
  * 🇬🇧 *We have a few minor issues to solve.* → 🇹🇷 Çözmemiz gereken birkaç küçük sorun var.  
  * 🇬🇧 *The query is fast enough for production.* → 🇹🇷 Sorgu canlı ortam için yeterince hızlı.

#### \[A2\_G06\] Gerunds vs. Infinitives (Introductory: Like doing vs. Want to do) (Fiilimsiler: Mastarlar ve \-ing Alan Fiiller (Giriş Düzeyi))

- **Formül / Kural:** `Verb + -ing (enjoy, avoid, mind) | Verb + to + V1 (want, need, plan, decide, hope)`  
- **Açıklama:** Certain verbs trigger gerunds (-ing); others require the full infinitive (to \+ verb).  
- **Örnek Cümleler:**  
  * 🇬🇧 *I enjoy developing mobile interfaces with Compose.* → 🇹🇷 Compose ile mobil arayüzler geliştirmekten keyif alıyorum.  
  * 🇬🇧 *We decided to migrate our database.* → 🇹🇷 Veritabanımızı taşımaya karar verdik.

#### \[A2\_G07\] Conditionals: Zero & First Conditional (Şart Cümleleri: Type 0 (Genel Doğrular) ve Type 1 (Gelecek İhtimalleri))

- **Formül / Kural:** `Type 0: If + Present Simple, Present Simple | Type 1: If + Present Simple, will + V1`  
- **Açıklama:** Type 0 for scientific facts/habits; Type 1 for real, possible future conditions and outcomes.  
- **Örnek Cümleler:**  
  * 🇬🇧 *If you input invalid credentials, the system throws an error.* → 🇹🇷 Geçersiz kimlik bilgileri girerseniz, sistem hata verir (Type 0).  
  * 🇬🇧 *If we optimize the images, the page will load much faster.* → 🇹🇷 Resimleri optimize edersek, sayfa çok daha hızlı yüklenecektir (Type 1).

#### \[A2\_G08\] Present Perfect Tense (have/has \+ V3) (Yakın Geçmiş / Etkisi Süren Zaman (just, already, yet, ever, never, since, for))

- **Formül / Kural:** `(+) S + have/has + V3 | (-) S + have/has not + V3 | (?) Have/Has + S + V3?`  
- **Açıklama:** Connects past actions to present results; used for life experiences without specified past timestamps.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I have already configured the SSL certificate.* → 🇹🇷 SSL sertifikasını şimdiden yapılandırdım.  
  * 🇬🇧 *Have you ever used Docker in production?* → 🇹🇷 Canlı ortamda hiç Docker kullandın mı?

#### \[A2\_G09\] Present Perfect vs. Past Simple (Present Perfect ile Past Simple Arasındaki Farklar)

- **Formül / Kural:** `Past Simple + specific time (yesterday, in 2024) vs. Present Perfect + unstated/ongoing time`  
- **Açıklama:** Use Past Simple with exact time markers; use Present Perfect when the experience or present relevance matters.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I built the prototype last month (Past Simple).* → 🇹🇷 Prototipi geçen ay inşa ettim.  
  * 🇬🇧 *I have built three full-stack apps so far (Present Perfect).* → 🇹🇷 Şimdiye kadar üç tam yığın uygulama inşa ettim.

#### \[A2\_G10\] Prepositions of Movement & Linking Words (Hareket Edatları (into, through, across) ve Bağlaçlar (because, so, although, however))

- **Formül / Kural:** `Clause + because/so/although + Clause`  
- **Açıklama:** Connect ideas logically for cause, result, and contrast.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Although the library is new, it has great documentation.* → 🇹🇷 Kütüphane yeni olmasına rağmen harika bir dokümantasyona sahip.  
  * 🇬🇧 *The API key was invalid, so the request failed.* → 🇹🇷 API anahtarı geçersizdi, bu yüzden istek başarısız oldu.

### A2 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (15 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **application** | `/ˌæp.lɪˈkeɪ.ʃən/` | uygulama | Download the mobile application. | Mobil uygulamayı indirin. |
| **feature** | `/ˈfiː.tʃər/` | özellik | This is a key feature. | Bu kilit bir özelliktir. |
| **device** | `/dɪˈvaɪs/` | cihaz | Connect your device. | Cihazınızı bağlayın. |
| **screen** | `/skriːn/` | ekran | The screen resolution is high. | Ekran çözünürlüğü yüksektir. |
| **account** | `/əˈkaʊnt/` | hesap | Create a new user account. | Yeni bir kullanıcı hesabı oluşturun. |
| **password** | `/ˈpɑːs.wɜːd/` | şifre, parola | Enter a strong password. | Güçlü bir şifre girin. |
| **service** | `/ˈsɜː.vɪs/` | hizmet, servis | The cloud service is reliable. | Bulut hizmeti güvenilirdir. |
| **customer** | `/ˈkʌs.tə.mər/` | müşteri | We care about customer feedback. | Müşteri geri bildirimlerini önemseriz. |
| **price** | `/praɪs/` | fiyat | The price is reasonable. | Fiyat makuldür. |
| **payment** | `/ˈpeɪ.mənt/` | ödeme | Payment was successful. | Ödeme başarılı oldu. |
| **schedule** | `/ˈʃedʒ.uːl/` | program, takvim | Check your schedule. | Programınızı kontrol edin. |
| **experience** | `/ɪkˈspɪə.ri.əns/` | deneyim, tecrübe | He has five years of experience. | Beş yıllık tecrübesi var. |
| **level** | `/ˈlev.əl/` | seviye, düzey | Select your difficulty level. | Zorluk seviyenizi seçin. |
| **result** | `/rɪˈzʌlt/` | sonuç | The search result is empty. | Arama sonucu boştur. |
| **reason** | `/ˈriː.zən/` | sebep, neden | What is the reason for this bug? | Bu hatanın sebebi nedir? |

#### Fiiller (Verbs) (15 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **create** | `/kriˈeɪt/` | oluşturmak, yaratmak | Create a database schema. | Bir veritabanı şeması oluşturun. |
| **improve** | `/ɪmˈpruːv/` | geliştirmek, iyileştirmek | Improve performance. | Performansı iyileştirin. |
| **develop** | `/dɪˈvel.əp/` | geliştirmek | We develop cross-platform apps. | Platformlar arası uygulamalar geliştiriyoruz. |
| **change** | `/tʃeɪndʒ/` | değiştirmek | Change your settings. | Ayarlarınızı değiştirin. |
| **choose** | `/tʃuːz/` | seçmek | Choose the correct option. | Doğru seçeneği seçin. |
| **decide** | `/dɪˈsaɪd/` | karar vermek | Decide on the tech stack. | Teknoloji yığınına karar verin. |
| **explain** | `/ɪkˈspleɪn/` | açıklamak | Can you explain this function? | Bu fonksiyonu açıklayabilir misiniz? |
| **share** | `/ʃeər/` | paylaşmak | Share the repository link. | Depo bağlantısını paylaşın. |
| **save** | `/seɪv/` | kaydetmek, biriktirmek | Save changes to file. | Değişiklikleri dosyaya kaydedin. |
| **delete** | `/dɪˈliːt/` | silmek | Delete unused records. | Kullanılmayan kayıtları silin. |
| **connect** | `/kəˈnekt/` | bağlanmak, bağlamak | Connect to the remote host. | Uzak sunucuya bağlanın. |
| **fix** | `/fɪks/` | düzeltmek, onarmak | Fix the broken link. | Kırık bağlantıyı düzeltin. |
| **prepare** | `/prɪˈpeər/` | hazırlamak | Prepare the test data. | Test verisini hazırlayın. |
| **describe** | `/dɪˈskraɪb/` | tanımlamak, tarif etmek | Describe the architecture. | Mimarisi tarif edin. |
| **install** | `/ɪnˈstɔːl/` | kurmak, yüklemek | Install the dependencies. | Bağımlılıkları yükleyin. |

#### Sıfatlar (Adjectives) (10 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **useful** | `/ˈjuːs.fəl/` | faydalı, kullanışlı | This tool is very useful. | Bu araç çok faydalıdır. |
| **expensive** | `/ɪkˈspen.sɪv/` | pahalı | Dedicated servers are expensive. | Özel sunucular pahalıdır. |
| **cheap** | `/tʃiːp/` | ucuz | Shared hosting is cheap. | Paylaşımlı barındırma ucuzdur. |
| **different** | `/ˈdɪf.ər.ənt/` | farklı | We tried a different approach. | Farklı bir yaklaşım denedik. |
| **similar** | `/ˈsɪm.ɪ.lər/` | benzer | The two frameworks are similar. | İki çatı birbirine benzerdir. |
| **correct** | `/kəˈrekt/` | doğru | Ensure the format is correct. | Biçimin doğru olduğundan emin olun. |
| **wrong** | `/rɒŋ/` | yanlış | The token was wrong. | Belirteç yanlıştı. |
| **possible** | `/ˈpɒs.ə.bəl/` | mümkün | Is it possible to optimize this? | Bunu optimize etmek mümkün mü? |
| **available** | `/əˈveɪ.lə.bəl/` | mevcut, müsait | The update is available now. | Güncelleme şimdi mevcuttur. |
| **secure** | `/sɪˈkjʊər/` | güvenli | Ensure the connection is secure. | Bağlantının güvenli olduğundan emin olun. |

#### Zarflar (Adverbs) (6 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **quickly** | `/ˈkwɪk.li/` | hızlıca | The query executes quickly. | Sorgu hızlıca çalışır. |
| **carefully** | `/ˈkeə.fəl.i/` | dikkatlice | Read the logs carefully. | Günlükleri dikkatlice okuyun. |
| **easily** | `/ˈiː.zəl.i/` | kolayca | You can easily integrate it. | Onu kolayca entegre edebilirsiniz. |
| **already** | `/ɔːlˈred.i/` | zaten, şimdiden | I have already pushed the code. | Kodu şimdiden gönderdim. |
| **recently** | `/ˈriː.sənt.li/` | son zamanlarda | We recently upgraded the system. | Sistemi son zamanlarda yükselttik. |
| **probably** | `/ˈprɒb.ə.bli/` | muhtemelen | It will probably finish soon. | Muhtemelen yakında bitecek. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (3 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **as soon as possible** | `/æz suːn æz ˈpɒs.ə.bəl/` | mümkün olan en kısa sürede | Reply as soon as possible. | Mümkün olan en kısa sürede yanıtlayın. |
| **in order to** | `/ɪn ˈɔː.dər tuː/` | \-mek için, amacıyla | Run this script in order to build. | Derlemek amacıyla bu betiği çalıştırın. |
| **according to** | `/əˈkɔː.dɪŋ tuː/` | \-e göre | According to the docs, it is deprecated. | Dokümanlara göre kullanımdan kaldırılmıştır. |

### A2 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Kıyaslama ve Üstünlük Dereceleri (-er / more than & the \-est / the most) | application, feature, device, screen | \- | Write a 60-100 word passage integrating the grammar 'Compara... |
| **Gün 2** | Active Learning & Application | Geçmişte Devam Eden Zaman (was/were \+ V-ing) | screen, account, password, service | feature, application | Write a 60-100 word passage integrating the grammar 'Past Co... |
| **Gün 3** | Active Learning & Application | When ve While ile Geçmiş Zaman Bağlantıları | service, customer, price, payment | account, screen | Write a 60-100 word passage integrating the grammar 'Past Si... |
| **Gün 4** | Active Learning & Application | Tavsiye, Zorunluluk ve İhtimal Modalları | payment, schedule, experience, level | application, service, customer, feature | Write a 60-100 word passage integrating the grammar 'Modals:... |
| **Gün 5** | Active Learning & Application | Miktar Belirteçleri ve Belgisiz Zamirler | level, result, reason, create | payment, schedule, account, screen | Write a 60-100 word passage integrating the grammar 'Quantif... |
| **Gün 6** | Active Learning & Application | Fiilimsiler: Mastarlar ve \-ing Alan Fiiller (Giriş Düzeyi) | create, improve, develop, change | service, level, customer, result | Write a 60-100 word passage integrating the grammar 'Gerunds... |
| **Gün 7** | Milestone Review & Synthesis | Şart Cümleleri: Type 0 (Genel Doğrular) ve Type 1 (Gelecek İhtimalleri) | change, choose, decide, explain | create, schedule, improve, payment | Write a 60-100 word passage integrating the grammar 'Conditi... |

---

## 2.3 Seviye: B1 (Intermediate / Threshold)

**CEFR Tanımı:** Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. Can deal with most situations likely to arise whilst travelling.

**Hedef Çalışma Süresi:** 40 Gün | **Toplam Gramer Konusu:** 10

### B1 Gramer Konuları ve Yapı Formülleri

#### \[B1\_G01\] Present Perfect Continuous (have/has been \+ V-ing) (Süregelen Yakın Geçmiş Zaman (Geçmişte başlayıp hala devam eden süreçler))

- **Formül / Kural:** `(+) S + have/has been + V-ing | (-) S + have/has not been + V-ing`  
- **Açıklama:** Emphasizes duration and continuity of an action starting in the past and continuing up to the present moment.  
- **Örnek Cümleler:**  
  * 🇬🇧 *I have been working on this machine learning model for three hours.* → 🇹🇷 Üç saattir bu makine öğrenmesi modeli üzerinde çalışıyorum.  
  * 🇬🇧 *The server has been running without errors since Monday.* → 🇹🇷 Sunucu pazartesiden beri hatasız çalışıyor.

#### \[B1\_G02\] Past Perfect Simple (had \+ V3) (Önceki Geçmiş Zaman (Geçmişte gerçekleşen iki olaydan daha önce olanı))

- **Formül / Kural:** `(+) S + had + V3 | (-) S + had not (hadn't) + V3`  
- **Açıklama:** Clarifies chronological order of past events; often paired with 'before', 'after', 'by the time'.  
- **Örnek Cümleler:**  
  * 🇬🇧 *By the time we deployed the hotfix, the users had already reported the issue.* → 🇹🇷 Biz acil yamayı dağıtana kadar, kullanıcılar sorunu çoktan bildirmişti.  
  * 🇬🇧 *I had saved my changes before the power outage occurred.* → 🇹🇷 Elektrik kesintisi meydana gelmeden önce değişikliklerimi kaydetmiştim.

#### \[B1\_G03\] Second Conditional (Unreal Present / Hypotheses) (İkinci Tip Koşul Cümleleri: Hayali / Gerçek Dışı Şimdiki Durumlar)

- **Formül / Kural:** `If + Past Simple, would + V1 (base form)`  
- **Açıklama:** Used for hypothetical, imaginary, or impossible situations in the present/future.  
- **Örnek Cümleler:**  
  * 🇬🇧 *If I had more computing power, I would train a larger neural network.* → 🇹🇷 Daha fazla işlem gücüm olsaydı, daha büyük bir yapay sinir ağı eğitirdim.  
  * 🇬🇧 *If we used automated tests, we would save hours of manual QA.* → 🇹🇷 Otomatik testler kullansaydık, saatlerce süren manuel testten tasarruf ederdik.

#### \[B1\_G04\] Defining & Non-Defining Relative Clauses (İlgi Cümlecikleri: Tanımlayıcı ve Ek Bilgi Veren Sıfat Cümleleri (who, which, that, where, whose))

- **Formül / Kural:** `Noun + [who/which/that/where/whose + clause]`  
- **Açıklama:** Defining clauses provide essential identity without commas; Non-defining add extra information between commas.  
- **Örnek Cümleler:**  
  * 🇬🇧 *The engineer who designed this microservice is lead architect.* → 🇹🇷 Bu mikroservisi tasarlayan mühendis baş mimardır (Defining).  
  * 🇬🇧 *FastAPI, which is built on Starlette, provides automatic API docs.* → 🇹🇷 Starlette üzerine kurulu olan FastAPI, otomatik API dokümantasyonu sağlar (Non-defining).

#### \[B1\_G05\] Passive Voice (Present Simple, Past Simple, Future, Modals) (Edilgen Çatı (Temel Zamanlar ve Modallarla))

- **Formül / Kural:** `Subject + To Be (appropriate tense) + Past Participle (V3) [+ by Agent]`  
- **Açıklama:** Focus shifts from the doer of the action to the recipient or action itself.  
- **Örnek Cümleler:**  
  * 🇬🇧 *User passwords are encrypted before being stored in the database.* → 🇹🇷 Kullanıcı şifreleri veritabanında saklanmadan önce şifrelenir.  
  * 🇬🇧 *The pull request was reviewed and approved by the team lead.* → 🇹🇷 Çekme isteği (PR) takım lideri tarafından incelendi ve onaylandı.

#### \[B1\_G06\] Modals of Deduction & Speculation (Must be, Can't be, Might be) (Çıkarım ve Tahmin Modalları (Şimdiki Zaman))

- **Formül / Kural:** `Subject + must/can't/might/could + V1`  
- **Açıklama:** 'Must be' (95% certainty positive); 'Can't be' (95% certainty negative); 'Might/Could be' (50% possibility).  
- **Örnek Cümleler:**  
  * 🇬🇧 *The port is already in use; another process must be running on port 8080\.* → 🇹🇷 Port zaten kullanımda; 8080 portunda başka bir işlem çalışıyor olmalı.  
  * 🇬🇧 *This cannot be a database issue because the connection pool is healthy.* → 🇹🇷 Bu bir veritabanı sorunu olamaz çünkü bağlantı havuzu sağlıklı.

#### \[B1\_G07\] Used to & Would for Past Habits ('Used to' ve 'Would' ile Geçmişteki Alışkanlıklar ve Durumlar)

- **Formül / Kural:** `Subject + used to + V1 (actions & states) | Subject + would + V1 (repeated actions only)`  
- **Açıklama:** 'Used to' handles both past states and actions; 'Would' only describes repeated past actions.  
- **Örnek Cümleler:**  
  * 🇬🇧 *We used to maintain monolithic architectures before migrating to containers.* → 🇹🇷 Konteynerlere geçmeden önce monolitik mimariler sürdürürdük.  
  * 🇬🇧 *Every Friday, we would review our open pull requests together.* → 🇹🇷 Her cuma, açık çekme isteklerimizi birlikte gözden geçirirdik.

#### \[B1\_G08\] Reported Speech (Statements & Questions) (Dolaylı Anlatım: İfadelerin ve Soruların Aktarılması)

- **Formül / Kural:** `Direct: 'I am ready' -> Reported: He said (that) he was ready (Tense backshift)`  
- **Açıklama:** Backshift tenses one step into the past when reporting verb is in past tense (*said, told, asked*).  
- **Örnek Cümleler:**  
  * 🇬🇧 *The client said that the endpoint was returning a 500 error.* → 🇹🇷 Müşteri, uç noktanın 500 hatası verdiğini söyledi.  
  * 🇬🇧 *She asked me whether the documentation was up to date.* → 🇹🇷 Bana dokümantasyonun güncel olup olmadığını sordu.

#### \[B1\_G09\] Complex Gerunds & Infinitives (Verbs changing meaning) (Anlamı Değişen Fiilimsiler (remember to do vs. remember doing / stop to do vs. stop doing))

- **Formül / Kural:** `stop to do (durup başka şey yapmak) vs. stop doing (eylemi bırakmak)`  
- **Açıklama:** Remember to do \= remember future duty; Remember doing \= recall past memory.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Remember to sanitize user input before running SQL queries.* → 🇹🇷 SQL sorguları çalıştırmadan önce kullanıcı girdisini temizlemeyi unutmayın (görev).  
  * 🇬🇧 *I remember compiling the binary without any compiler warnings.* → 🇹🇷 İkili dosyayı herhangi bir derleyici uyarısı olmadan derlediğimi hatırlıyorum (anı).

#### \[B1\_G10\] Phrasal Verbs (Separable vs. Inseparable) (Deyimsel Fiiller (Ayrılabilen ve Ayrılamayan Kalıplar))

- **Formül / Kural:** `Verb + Particle [+ Object] / Verb + Object + Particle`  
- **Açıklama:** With pronouns, separable phrasal verbs MUST be separated (e.g., turn it off, set it up).  
- **Örnek Cümleler:**  
  * 🇬🇧 *Let's set up the staging environment on a dedicated virtual machine.* → 🇹🇷 Özel bir sanal makinede test ortamını kuralım.  
  * 🇬🇧 *You should turn it on after verifying the network configuration.* → 🇹🇷 Ağ yapılandırmasını doğruladıktan sonra onu açmalısınız.

### B1 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (10 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **environment** | `/ɪnˈvaɪ.rən.mənt/` | ortam, çevre | Deploy to production environment. | Canlı ortama dağıtın. |
| **architecture** | `/ˈɑː.kɪ.tek.tʃər/` | mimari, yapı | Microservice architecture is scalable. | Mikroservis mimarisi ölçeklenebilirdir. |
| **database** | `/ˈdeɪ.tə.beɪs/` | veritabanı | Query the PostgreSQL database. | PostgreSQL veritabanını sorgulayın. |
| **performance** | `/pəˈfɔː.məns/` | performans, verim | Monitor system performance. | Sistem performansını izleyin. |
| **security** | `/sɪˈkjʊə.rə.ti/` | güvenlik | Security is our highest priority. | Güvenlik en yüksek önceliğimizdir. |
| **request** | `/rɪˈkwest/` | istek, talep | The HTTP request timed out. | HTTP isteği zaman aşımına uğradı. |
| **response** | `/rɪˈspɒns/` | yanıt, cevap | Parse the JSON response. | JSON yanıtını ayrıştırın. |
| **solution** | `/səˈluː.ʃən/` | çözüm | Propose an optimal solution. | En uygun çözümü önerin. |
| **maintenance** | `/ˈmeɪn.tən.əns/` | bakım | Scheduled server maintenance. | Planlanmış sunucu bakımı. |
| **requirement** | `/rɪˈkwaɪə.mənt/` | gereksinim, şart | Review the project requirements. | Proje gereksinimlerini gözden geçirin. |

#### Fiiller (Verbs) (10 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **implement** | `/ˈɪm.plɪ.ment/` | uygulamak, hayata geçirmek | Implement the OAuth protocol. | OAuth protokolünü uygulayın. |
| **optimize** | `/ˈɒp.tɪ.maɪz/` | optimize etmek, en iyilemek | Optimize memory consumption. | Bellek tüketimini optimize edin. |
| **configure** | `/kənˈfɪɡ.ər/` | yapılandırmak | Configure the reverse proxy. | Ters vekil sunucuyu yapılandırın. |
| **maintain** | `/meɪnˈteɪn/` | sürdürmek, bakımını yapmak | Maintain legacy repositories. | Eski depoların bakımını yapın. |
| **evaluate** | `/ɪˈvæl.ju.eɪt/` | değerlendirmek | Evaluate the model accuracy. | Model doğruluğunu değerlendirin. |
| **integrate** | `/ˈɪn.tɪ.ɡreɪt/` | entegre etmek | Integrate third-party payment gateways. | Üçüncü taraf ödeme ağ geçitlerini entegre edin. |
| **identify** | `/aɪˈden.tɪ.faɪ/` | tanımlamak, tespit etmek | Identify memory leaks. | Bellek sızıntılarını tespit edin. |
| **prevent** | `/prɪˈvent/` | önlemek, engel olmak | Prevent SQL injection attacks. | SQL enjeksiyonu saldırılarını önleyin. |
| **require** | `/rɪˈkwaɪər/` | gerektirmek | This task requires root privileges. | Bu görev root ayrıcalıkları gerektirir. |
| **resolve** | `/rɪˈzɒlv/` | çözmek, gidermek | Resolve merge conflicts. | Birleştirme (merge) çakışmalarını giderin. |

#### Sıfatlar (Adjectives) (7 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **scalable** | `/ˈskeɪ.lə.bəl/` | ölçeklenebilir | Design a scalable backend. | Ölçeklenebilir bir arka uç tasarlayın. |
| **efficient** | `/ɪˈfɪʃ.ənt/` | verimli, etkili | Write efficient algorithms. | Verimli algoritmalar yazın. |
| **reliable** | `/rɪˈlaɪ.ə.bəl/` | güvenilir | We need a reliable hosting provider. | Güvenilir bir barındırma sağlayıcısına ihtiyacımız var. |
| **complex** | `/ˈkɒm.pleks/` | karmaşık | The query logic is complex. | Sorgu mantığı karmaşıktır. |
| **temporary** | `/ˈtem.pər.ər.i/` | geçici | Store tokens in temporary storage. | Belirteçleri geçici depolamada saklayın. |
| **permanent** | `/ˈpɜː.mə.nənt/` | kalıcı | Save records to permanent storage. | Kayıtları kalıcı depolamaya kaydedin. |
| **critical** | `/ˈkrɪt.ɪ.kəl/` | kritik, hayati | A critical vulnerability was found. | Kritik bir güvenlik açığı bulundu. |

#### Zarflar (Adverbs) (4 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **efficiently** | `/ɪˈfɪʃ.ənt.li/` | verimli bir şekilde | Process asynchronous events efficiently. | Eşzamansız olayları verimli bir şekilde işleyin. |
| **properly** | `/ˈprɒp.əl.i/` | düzgünce, uygun şekilde | Configure environment variables properly. | Ortam değişkenlerini düzgünce yapılandırın. |
| **significantly** | `/sɪɡˈnɪf.ɪ.kənt.li/` | önemli ölçüde | Caching significantly reduces latency. | Önbelleğe alma gecikmeyi önemli ölçüde azaltır. |
| **currently** | `/ˈkʌr.ənt.li/` | şu anda, halihazırda | The team is currently refactoring the core. | Ekip şu anda çekirdeği yeniden düzenliyor. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (3 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **in terms of** | `/ɪn tɜːmz ɒv/` | açısından, bakımından | In terms of speed, Go excels. | Hız açısından Go öne çıkar. |
| **due to** | `/djuː tuː/` | \-den dolayı, sebebiyle | The outage was due to a network glitch. | Kesinti bir ağ aksaklığından dolayıydı. |
| **as well as** | `/æz wel æz/` | yanı sıra, ek olarak | We support Kotlin as well as TypeScript. | TypeScript'in yanı sıra Kotlin'i de destekliyoruz. |

### B1 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Süregelen Yakın Geçmiş Zaman (Geçmişte başlayıp hala devam eden süreçler) | environment, architecture, database, performance | \- | Write a 60-100 word passage integrating the grammar 'Present... |
| **Gün 2** | Active Learning & Application | Önceki Geçmiş Zaman (Geçmişte gerçekleşen iki olaydan daha önce olanı) | performance, security, request, response | architecture, environment | Write a 60-100 word passage integrating the grammar 'Past Pe... |
| **Gün 3** | Active Learning & Application | İkinci Tip Koşul Cümleleri: Hayali / Gerçek Dışı Şimdiki Durumlar | response, solution, maintenance, requirement | performance, security | Write a 60-100 word passage integrating the grammar 'Second ... |
| **Gün 4** | Active Learning & Application | İlgi Cümlecikleri: Tanımlayıcı ve Ek Bilgi Veren Sıfat Cümleleri (who, which, that, where, whose) | requirement, implement, optimize, configure | solution, environment, architecture, response | Write a 60-100 word passage integrating the grammar 'Definin... |
| **Gün 5** | Active Learning & Application | Edilgen Çatı (Temel Zamanlar ve Modallarla) | configure, maintain, evaluate, integrate | requirement, security, performance, implement | Write a 60-100 word passage integrating the grammar 'Passive... |
| **Gün 6** | Active Learning & Application | Çıkarım ve Tahmin Modalları (Şimdiki Zaman) | integrate, identify, prevent, require | solution, maintain, configure, response | Write a 60-100 word passage integrating the grammar 'Modals ... |
| **Gün 7** | Milestone Review & Synthesis | 'Used to' ve 'Would' ile Geçmişteki Alışkanlıklar ve Durumlar | require, resolve, scalable, efficient | identify, requirement, integrate, implement | Write a 60-100 word passage integrating the grammar 'Used to... |

---

## 2.4 Seviye: B2 (Upper-Intermediate / Vantage)

**CEFR Tanımı:** Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in his/her field of specialisation. Can interact with a degree of fluency and spontaneity.

**Hedef Çalışma Süresi:** 45 Gün | **Toplam Gramer Konusu:** 8

### B2 Gramer Konuları ve Yapı Formülleri

#### \[B2\_G01\] Third & Mixed Conditionals (Past Regrets & Hybrid Timelines) (Üçüncü Tip ve Karma Koşul Cümleleri (Geçmiş Pişmanlıklar ve Karma Zamanlar))

- **Formül / Kural:** `Type 3: If + Past Perfect, would have + V3 | Mixed: If + Past Perfect, would + V1 (past cause -> present effect)`  
- **Açıklama:** Type 3 for impossible past conditions/regrets; Mixed Conditionals connect a past action with a present continuing result.  
- **Örnek Cümleler:**  
  * 🇬🇧 *If we had validated the schema before migration, the service wouldn't have failed.* → 🇹🇷 Geçişten önce şemayı doğrulasaydık, servis başarısız olmazdı (Type 3).  
  * 🇬🇧 *If I had taken the cloud certification last year, I would lead the DevOps team today.* → 🇹🇷 Geçen yıl bulut sertifikasını almış olsaydım, bugün DevOps ekibini yönetiyor olurdum (Mixed).

#### \[B2\_G02\] Future Continuous & Future Perfect (will be doing / will have done) (Gelecekte Devam Edecek Zaman ve Gelecekte Tamamlanmış Olacak Zaman)

- **Formül / Kural:** `Future Cont: S + will be + V-ing | Future Perf: S + will have + V3 [+ by specific time]`  
- **Açıklama:** Future Continuous for action in progress at future moment; Future Perfect for action completed BEFORE a future point in time.  
- **Örnek Cümleler:**  
  * 🇬🇧 *This time next week, we will be presenting our system at the tech summit.* → 🇹🇷 Gelecek hafta bu saatlerde sistemimizi teknoloji zirvesinde sunuyor olacağız.  
  * 🇬🇧 *By December, our team will have shipped the entire enterprise platform.* → 🇹🇷 Aralık ayına kadar ekibimiz tüm kurumsal platformu teslim etmiş olacak.

#### \[B2\_G03\] Past Modals of Deduction & Regret (must have, can't have, should have, could have) (Geçmişe Dair Çıkarım ve Pişmanlık Modalları (+ have \+ V3))

- **Formül / Kural:** `Subject + must/can't/should/could + have + V3`  
- **Açıklama:** 'Must have been' \= strong certainty about past; 'Should have done' \= unfulfilled past duty/regret.  
- **Örnek Cümleler:**  
  * 🇬🇧 *The hacker must have exploited an unpatched zero-day vulnerability.* → 🇹🇷 Bilgisayar korsanı yamalanmamış bir sıfır gün açığını istismar etmiş olmalı.  
  * 🇬🇧 *We should have implemented rate limiting to prevent DDoS attacks.* → 🇹🇷 DDoS saldırılarını önlemek için istek sınırlaması (rate limiting) uygulamalıydık.

#### \[B2\_G04\] Inversion with Negative Adverbials (Olumsuz Zarf Yapılarıyla Devrik Cümle Kurma (Seldom, Rarely, Hardly, Not only... but also))

- **Formül / Kural:** `Negative Adverb + Auxiliary Verb + Subject + Main Verb`  
- **Açıklama:** Creates stylistic and emphatic emphasis in formal writing and technical presentations.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Rarely have we encountered such a catastrophic memory corruption.* → 🇹🇷 Böylesine vahim bir bellek bozulmasıyla nadiren karşılaştık.  
  * 🇬🇧 *Not only does this framework support SSR, but it also optimizes hydration.* → 🇹🇷 Bu çatı yalnızca SSR'ı desteklemekle kalmaz, aynı zamanda hidrasyonu da optimize eder.

#### \[B2\_G05\] Participle Clauses (-ing and \-ed clauses) (Ortaç Cümlecikleri: Cümle Kısaltmaları (-ing ve \-ed yapıları))

- **Formül / Kural:** `Having + V3 (completed prior action) / V-ing (simultaneous action) / V3 (passive reduction)`  
- **Açıklama:** Replaces full subordinate clauses to construct concise, professional academic/technical prose.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Having compiled the source code, the CI pipeline triggered automated integration tests.* → 🇹🇷 Kaynak kodu derledikten sonra, CI hattı otomatik entegrasyon testlerini tetikledi.  
  * 🇬🇧 *Stored in encrypted volumes, the database backups remain completely safe.* → 🇹🇷 Şifreli birimlerde saklanan veritabanı yedekleri tamamen güvendedir.

#### \[B2\_G06\] Causative Verbs (Have/Get something done, Make, Let) (Ettirgen Çatı Yapıları (have/get something done, make, let))

- **Formül / Kural:** `have/get + Object + V3 (arrange for someone else) | make + Object + V1 (force) | let + Object + V1 (allow)`  
- **Açıklama:** Expresses delegating or arranging actions to be performed by external entities or services.  
- **Örnek Cümleler:**  
  * 🇬🇧 *We need to have our infrastructure audited by third-party security researchers.* → 🇹🇷 Altyapımızı üçüncü taraf güvenlik araştırmacılarına denetletmemiz gerekiyor.  
  * 🇬🇧 *The new update lets users customize their dashboard layout.* → 🇹🇷 Yeni güncelleme kullanıcıların kontrol paneli düzenini özelleştirmelerine izin verir.

#### \[B2\_G07\] Advanced Passive: Reporting Verbs & Impersonal Passive (İleri Edilgen Yapılar: Aktarım Fiilleri (It is said that / He is thought to be))

- **Formül / Kural:** `It is + V3 (believed/reported/estimated) + that clause | Subject + is/are + V3 + to infinitive`  
- **Açıklama:** Used in technical reports and formal discourse to express generalized consensus neutrally.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Quantum computing is estimated to revolutionize cryptographic protocols.* → 🇹🇷 Kuantum hesaplamanın kriptografik protokollerde devrim yaratacağı tahmin edilmektedir.  
  * 🇬🇧 *It is widely acknowledged that distributed systems introduce network latency.* → 🇹🇷 Dağıtık sistemlerin ağ gecikmesi getirdiği geniş çapta kabul edilmektedir.

#### \[B2\_G08\] Subjunctive Mood in Formal English (Dilek / İstek Kipi (Subjunctive: suggest/recommend/demand that S \+ base V))

- **Formül / Kural:** `demand/recommend/suggest/vital that + Subject + V1 (base form without -s)`  
- **Açıklama:** The verb in the 'that' clause remains in bare infinitive, regardless of subject person or tense.  
- **Örnek Cümleler:**  
  * 🇬🇧 *We strongly recommend that the administrator revoke all compromised tokens immediately.* → 🇹🇷 Yöneticinin ele geçirilen tüm belirteçleri derhal iptal etmesini şiddetle tavsiye ederiz.  
  * 🇬🇧 *It is imperative that every database transaction be atomic.* → 🇹🇷 Her veritabanı işleminin atomik olması zorunludur.

### B2 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (7 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **vulnerability** | `/ˌvʌl.nər.əˈbɪl.ə.ti/` | güvenlik açığı, zafiyet | Patch the zero-day vulnerability. | Sıfır gün güvenlik açığını yamalayın. |
| **infrastructure** | `/ˈɪn.frəˌstrʌk.tʃər/` | altyapı | Scale the cloud infrastructure. | Bulut altyapısını ölçeklendirin. |
| **scalability** | `/ˌskeɪ.ləˈbɪl.ə.ti/` | ölçeklenebilirlik | Design for horizontal scalability. | Yatay ölçeklenebilirlik için tasarlayın. |
| **discrepancy** | `/dɪˈskrep.ən.si/` | tutarsızlık, uyuşmazlık | Investigate data discrepancies. | Veri tutarsızlıklarını araştırın. |
| **implementation** | `/ˌɪm.plɪ.menˈteɪ.ʃən/` | uygulama, icra, kodlama | Review the algorithm implementation. | Algoritma uygulamasını gözden geçirin. |
| **feasibility** | `/ˌfiː.zəˈbɪl.ə.ti/` | fizibilite, uygulanabilirlik | Assess project feasibility. | Projenin uygulanabilirliğini değerlendirin. |
| **redundancy** | `/rɪˈdʌn.dən.si/` | yedeklilik, fazlalık | Ensure hardware redundancy for high availability. | Yüksek erişilebilirlik için donanım yedekliliği sağlayın. |

#### Fiiller (Verbs) (6 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **leverage** | `/ˈliː.vər.ɪdʒ/` | kaldıraç olarak kullanmak, yararlanmak | Leverage edge computing to reduce latency. | Gecikmeyi azaltmak için uç bilişimden yararlanın. |
| **mitigate** | `/ˈmɪt.ɪ.ɡeɪt/` | hafifletmek, azaltmak (riski) | Mitigate security risks immediately. | Güvenlik risklerini derhal azaltın. |
| **facilitate** | `/fəˈsɪl.ɪ.teɪt/` | kolaylaştırmak, olanak sağlamak | APIs facilitate cross-service communication. | API'ler servisler arası iletişimi kolaylaştırır. |
| **deprecate** | `/ˈdep.rə.keɪt/` | kullanımdan kaldırmak (yazılımda) | This endpoint will be deprecated in v2. | Bu uç nokta v2 sürümünde kullanımdan kaldırılacaktır. |
| **authenticate** | `/ɔːˈθen.tɪ.keɪt/` | kimlik doğrulamak | Authenticate via JSON Web Tokens. | JSON Web Belirteçleri ile kimlik doğrulayın. |
| **streamline** | `/ˈstriːm.laɪn/` | akıcı/verimli hale getirmek | Streamline our continuous delivery workflow. | Sürekli teslimat iş akışımızı daha akıcı ve verimli hale getirin. |

#### Sıfatlar (Adjectives) (5 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **comprehensive** | `/ˌkɒm.prɪˈhen.sɪv/` | kapsamlı, eksiksiz | Write comprehensive unit tests. | Kapsamlı birim testleri yazın. |
| **redundant** | `/rɪˈdʌn.dənt/` | yedekli, gereksiz | Remove redundant calculations. | Gereksiz hesaplamaları kaldırın. |
| **deterministic** | `/dɪˌtɜː.mɪˈnɪs.tɪk/` | belirlenimci, sonucu öngörülebilir | Ensure deterministic state management. | Belirlenimci durum yönetimi sağlayın. |
| **sophisticated** | `/səˈfɪs.tɪ.keɪ.tɪd/` | gelişmiş, sofistike | Deploy sophisticated anomaly detection. | Gelişmiş anomali tespitini devreye alın. |
| **concurrent** | `/kənˈkʌr.ənt/` | eşzamanlı | Handle 10,000 concurrent socket connections. | 10.000 eşzamanlı soket bağlantısını yönetin. |

#### Zarflar (Adverbs) (3 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **substantially** | `/səbˈstæn.ʃəl.i/` | önemli ölçüde, esaslı olarak | Throughput increased substantially. | İşlem hacmi önemli ölçüde arttı. |
| **seamlessly** | `/ˈsiːm.ləs.li/` | sorunsuz bir şekilde, kesintisizce | The system fails over seamlessly. | Sistem sorunsuz ve kesintisizce yedek sisteme geçer. |
| **consequently** | `/ˈkɒn.sɪ.kwənt.li/` | sonuç olarak, bunun neticesinde | The build broke; consequently, deployment aborted. | Derleme bozuldu; sonuç olarak dağıtım iptal edildi. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (2 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **in conjunction with** | `/ɪn kənˈdʒʌŋk.ʃən wɪð/` | ile birlikte, bağlantılı olarak | Use Redis in conjunction with PostgreSQL. | Redis'i PostgreSQL ile birlikte kullanın. |
| **notwithstanding** | `/ˌnɒt.wɪðˈstæn.dɪŋ/` | \-e rağmen, karşın | Notwithstanding the network latency, throughput remained high. | Ağ gecikmesine rağmen, işlem hacmi yüksek kaldı. |

### B2 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Üçüncü Tip ve Karma Koşul Cümleleri (Geçmiş Pişmanlıklar ve Karma Zamanlar) | vulnerability, infrastructure, scalability, discrepancy | \- | Write a 60-100 word passage integrating the grammar 'Third &... |
| **Gün 2** | Active Learning & Application | Gelecekte Devam Edecek Zaman ve Gelecekte Tamamlanmış Olacak Zaman | discrepancy, implementation, feasibility, redundancy | infrastructure, vulnerability | Write a 60-100 word passage integrating the grammar 'Future ... |
| **Gün 3** | Active Learning & Application | Geçmişe Dair Çıkarım ve Pişmanlık Modalları (+ have \+ V3) | redundancy, leverage, mitigate, facilitate | discrepancy, implementation | Write a 60-100 word passage integrating the grammar 'Past Mo... |
| **Gün 4** | Active Learning & Application | Olumsuz Zarf Yapılarıyla Devrik Cümle Kurma (Seldom, Rarely, Hardly, Not only... but also) | facilitate, deprecate, authenticate, streamline | leverage, infrastructure, vulnerability, redundancy | Write a 60-100 word passage integrating the grammar 'Inversi... |
| **Gün 5** | Active Learning & Application | Ortaç Cümlecikleri: Cümle Kısaltmaları (-ing ve \-ed yapıları) | streamline, comprehensive, redundant, deterministic | discrepancy, facilitate, implementation, deprecate | Write a 60-100 word passage integrating the grammar 'Partici... |
| **Gün 6** | Active Learning & Application | Ettirgen Çatı Yapıları (have/get something done, make, let) | deterministic, sophisticated, concurrent, substantially | leverage, streamline, comprehensive, redundancy | Write a 60-100 word passage integrating the grammar 'Causati... |
| **Gün 7** | Milestone Review & Synthesis | İleri Edilgen Yapılar: Aktarım Fiilleri (It is said that / He is thought to be) | substantially, seamlessly, consequently, in conjunction with | sophisticated, facilitate, deterministic, deprecate | Write a 60-100 word passage integrating the grammar 'Advance... |

---

## 2.5 Seviye: C1 (Advanced / Effective Operational Proficiency)

**CEFR Tanımı:** Can understand a wide range of demanding, longer texts, and recognise implicit meaning. Can express him/herself fluently and spontaneously without much obvious searching for expressions.

**Hedef Çalışma Süresi:** 50 Gün | **Toplam Gramer Konusu:** 4

### C1 Gramer Konuları ve Yapı Formülleri

#### \[C1\_G01\] Cleft Sentences for Focus & Emphasis (It-clefts, Wh-clefts, All-clefts) (Vurgu Cümleleri (It was X that... / What I really need is...))

- **Formül / Kural:** `It is/was + [Focused Element] + that/who... | What/All + [Clause] + is/was + [Focused Element]`  
- **Açıklama:** Splits a simple sentence into two clauses to heavily emphasize a specific subject, predicate, or object.  
- **Örnek Cümleler:**  
  * 🇬🇧 *It was the race condition in the thread pool that corrupted our state.* → 🇹🇷 Durumumuzu bozan şey, iş parçacığı havuzundaki yarış koşuluydu (race condition).  
  * 🇬🇧 *What we fundamentally aim to achieve is sub-millisecond query latency.* → 🇹🇷 Esasen başarmayı amaçladığımız şey, milisaniyenin altında sorgu gecikmesidir.

#### \[C1\_G02\] Advanced Inversion in Conditional Clauses (Without 'If') ('If' Olmadan Koşul Cümlelerinde İleri Düzey Devriklik (Had I, Were you to, Should you))

- **Formül / Kural:** `Had + S + V3 (Type 3) | Were + S + to V1 (Type 2) | Should + S + V1 (Type 1)`  
- **Açıklama:** Omits 'if' and inverts the auxiliary verb to the front for elevated, formal, academic, and contractual prose.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Had we executed full regression suites, this regression would never have reached staging.* → 🇹🇷 Tam gerileme (regression) paketlerini çalıştırmış olsaydık, bu hata asla test ortamına ulaşmazdı.  
  * 🇬🇧 *Should the primary cluster experience failover, the replica assumes immediate master status.* → 🇹🇷 Ana küme arıza/yedekleme durumuna geçerse, kopya derhal ana sunucu durumunu üstlenir.

#### \[C1\_G03\] Absolute Participle Clauses & Complex Ellipsis (Bağımsız Ortaç Cümlecikleri ve İleri Eksiltili Anlatım (Ellipsis))

- **Formül / Kural:** `Noun + Participle, Independent Clause (Each clause having its own distinct subject)`  
- **Açıklama:** Provides dense academic background context where the participle has an independent subject.  
- **Örnek Cümleler:**  
  * 🇬🇧 *All dependencies having been validated, the runtime initialized the microkernel safely.* → 🇹🇷 Tüm bağımlılıklar doğrulandıktan sonra, çalışma zamanı mikro çekirdeği güvenli şekilde başlattı.  
  * 🇬🇧 *Some processes consume GPU memory, others CPU cache.* → 🇹🇷 Bazı işlemler GPU belleği tüketir, diğerleri ise CPU önbelleği (ellipsis).

#### \[C1\_G04\] Nominalization & Formal Academic Discourse Markers (İsimleştirme (Nominalization) ve Akademik / Profesyonel Söylem Belirteçleri)

- **Formül / Kural:** `Transforming verbs/adjectives into abstract nouns (e.g. migrate -> migration, resilient -> resilience)`  
- **Açıklama:** Creates authoritative, dense, impersonal scientific and engineering prose.  
- **Örnek Cümleler:**  
  * 🇬🇧 *The rapid proliferation of edge nodes necessitates rigorous telemetry aggregation.* → 🇹🇷 Uç düğümlerin hızla çoğalması, titiz bir telemetri toplulaştırmasını zorunlu kılmaktadır.  
  * 🇬🇧 *Notwithstanding the preliminary benchmarks, empirical data substantiates our hypothesis.* → 🇹🇷 Ön kıyaslamalara rağmen, ampirik veriler hipotezimizi doğrulamaktadır.

### C1 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (5 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **proliferation** | `/prəˌlɪf.ərˈeɪ.ʃən/` | hızlı artış, yayılma, türeme | The proliferation of IoT devices. | IoT cihazlarının hızla çoğalması. |
| **paradigm** | `/ˈpær.ə.daɪm/` | paradigma, model, ekol | Functional programming is a powerful paradigm. | Fonksiyonel programlama güçlü bir paradigmadır. |
| **bottleneck** | `/ˈbɒt.əl.nek/` | darboğaz, tıkanma noktası | Disk I/O is the primary bottleneck. | Disk G/Ç ana darboğazdır. |
| **resilience** | `/rɪˈzɪl.jəns/` | dayanıklılık, esneklik | Architect systems for high network resilience. | Sistemleri yüksek ağ dayanıklılığı için mimarileyin. |
| **heuristic** | `/hjʊəˈrɪs.tɪk/` | sezgisel yöntem, keşifsel kural | Apply heuristics to optimize pathfinding. | Yol bulmayı optimize etmek için sezgisel yöntemler uygulayın. |

#### Fiiller (Verbs) (4 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **substantiate** | `/səbˈstæn.ʃi.eɪt/` | kanıtlamak, somut verilerle doğrulamak | Substantiate your claims with benchmarks. | İddialarınızı performans testleriyle kanıtlayın. |
| **orchestrate** | `/ˈɔː.kɪ.streɪt/` | orkestra etmek, koordine edip yönetmek | Kubernetes orchestrates containerized workloads. | Kubernetes konteynerleştirilmiş iş yüklerini orkestra eder. |
| **delineate** | `/dɪˈlɪn.i.eɪt/` | sınırlarını çizmek, netçe tanımlamak | Delineate service boundaries clearly. | Servis sınırlarını net bir şekilde çizin. |
| **circumvent** | `/ˌsɜː.kəmˈvent/` | etrafından dolanmak, baypas etmek | Circumvent firewall restrictions. | Güvenlik duvarı kısıtlamalarının etrafından dolanın. |

#### Sıfatlar (Adjectives) (4 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **ubiquitous** | `/juːˈbɪk.wɪ.təs/` | her yerde bulunan, yaygın | REST APIs have become ubiquitous. | REST API'leri her yerde bulunur hale geldi. |
| **immutable** | `/ɪˈmjuː.tə.bəl/` | değiştirilemez, sabit | State in Redux must be immutable. | Redux'taki durum (state) değiştirilemez olmalıdır. |
| **idempotent** | `/ˌaɪ.dəmˈpəʊ.tənt/` | tek kuvvetli, aynı sonucu veren | HTTP PUT requests must be idempotent. | HTTP PUT istekleri tek kuvvetli (idempotent) olmalıdır. |
| **meticulous** | `/məˈtɪk.jə.ləs/` | titiz, kılı kırk yaran | Perform meticulous code reviews. | Titiz kod incelemeleri gerçekleştirin. |

#### Zarflar (Adverbs) (2 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **unequivocally** | `/ˌʌn.ɪˈkwɪv.ə.kəl.i/` | kesinlikle, şüpheye yer bırakmayacak şekilde | The benchmarks unequivocally demonstrate superior performance. | Performans testleri üstün performansı şüpheye yer bırakmaksızın ortaya koymaktadır. |
| **empirically** | `/ɪmˈpɪr.ɪ.kəl.i/` | ampirik olarak, deneysel veriye dayalı şekilde | Validate the hypothesis empirically. | Hipotezi ampirik olarak doğrulayın. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (2 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **in the wake of** | `/ɪn ðə weɪk ɒv/` | \-in ardından, neticesinde | In the wake of the outage, post-mortems were published. | Kesintinin ardından kök neden analizleri yayınlandı. |
| **vis-à-vis** | `/ˌviːz.əˈviː/` | \-e kıyasla, karşısında | Performance advantages vis-à-vis monolithic stacks. | Monolitik yapılara kıyasla performans avantajları. |

### C1 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Vurgu Cümleleri (It was X that... / What I really need is...) | proliferation, paradigm, bottleneck, resilience | \- | Write a 60-100 word passage integrating the grammar 'Cleft S... |
| **Gün 2** | Active Learning & Application | 'If' Olmadan Koşul Cümlelerinde İleri Düzey Devriklik (Had I, Were you to, Should you) | resilience, heuristic, substantiate, orchestrate | paradigm, proliferation | Write a 60-100 word passage integrating the grammar 'Advance... |
| **Gün 3** | Active Learning & Application | Bağımsız Ortaç Cümlecikleri ve İleri Eksiltili Anlatım (Ellipsis) | orchestrate, delineate, circumvent, ubiquitous | heuristic, resilience | Write a 60-100 word passage integrating the grammar 'Absolut... |
| **Gün 4** | Active Learning & Application | İsimleştirme (Nominalization) ve Akademik / Profesyonel Söylem Belirteçleri | ubiquitous, immutable, idempotent, meticulous | orchestrate, paradigm, delineate, proliferation | Write a 60-100 word passage integrating the grammar 'Nominal... |
| **Gün 5** | Active Learning & Application | Vurgu Cümleleri (It was X that... / What I really need is...) | meticulous, unequivocally, empirically, in the wake of | ubiquitous, immutable, resilience, heuristic | Write a 60-100 word passage integrating the grammar 'Cleft S... |
| **Gün 6** | Active Learning & Application | 'If' Olmadan Koşul Cümlelerinde İleri Düzey Devriklik (Had I, Were you to, Should you) | in the wake of, vis-à-vis | meticulous, orchestrate, delineate, unequivocally | Write a 60-100 word passage integrating the grammar 'Advance... |
| **Gün 7** | Milestone Review & Synthesis | Bağımsız Ortaç Cümlecikleri ve İleri Eksiltili Anlatım (Ellipsis) | paradigm, bottleneck, resilience, heuristic | ubiquitous, in the wake of, vis-à-vis, immutable | Write a 60-100 word passage integrating the grammar 'Absolut... |

---

## 2.6 Seviye: C2 (Mastery / Proficiency)

**CEFR Tanımı:** Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. Can express him/herself spontaneously, very fluently and precisely.

**Hedef Çalışma Süresi:** 60 Gün | **Toplam Gramer Konusu:** 2

### C2 Gramer Konuları ve Yapı Formülleri

#### \[C2\_G01\] Stylistic & Rhetorical Inversion and Fronting (Üst Düzey Biçimsel ve Retoriksel Devriklik ve Öne Alma (Fronting))

- **Formül / Kural:** `Prepositional Phrase / Adverbial / Participle + Verb + Subject`  
- **Açıklama:** Creates dramatic rhetorical pacing and fluid thematic cohesion in high-register literature and executive discourse.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Embedded within the cryptographic envelope lies the immutable ledger of transactions.* → 🇹🇷 Kriptografik zarfın içine gömülü olarak, değiştirilemez işlem defteri yer almaktadır.  
  * 🇬🇧 *Gone are the days when monolithic single-threaded engines could suffice.* → 🇹🇷 Monolitik tek iş parçacıklı motorların yeterli olabildiği günler geride kaldı.

#### \[C2\_G02\] Pragmatic Subtlety, Nuance & Complex Sentence Restructuring (Edimbilimsel İnce Nüanslar ve Çok Katmanlı Cümle Yapılandırması)

- **Formül / Kural:** `Combining subjunctive, passive gerundives, double clefting, and non-canonical syntax`  
- **Açıklama:** Enables micro-calibration of tone, intellectual distance, irony, and diplomatic precision.  
- **Örnek Cümleler:**  
  * 🇬🇧 *Far be it from me to cast aspersions on the architectural design, yet the algorithmic overhead remains untenable.* → 🇹🇷 Mimari tasarıma gölge düşürmek haddim olmamakla birlikte, algoritmik ek yük savunulamaz düzeydedir.  
  * 🇬🇧 *Be that as it may, the empirical consensus favors asynchronous reconciliation.* → 🇹🇷 Durum böyle olsa bile, ampirik fikir birliği eşzamansız mutabakatı desteklemektedir.

### C2 Kelime Havuzu (Part of Speech Sınıflandırmalı)

#### İsimler (Nouns) (4 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **ubiquity** | `/juːˈbɪk.wɪ.ti/` | her yerde bulunma durumu | The ubiquity of smartphones. | Akıllı telefonların her yerde bulunurluğu. |
| **conundrum** | `/kəˈnʌn.drəm/` | içinden çıkılmaz muamma, çetin problem | Resolving the CAP theorem conundrum. | CAP teoremi muammasını çözüme kavuşturmak. |
| **ephemeral** | `/ɪˈfem.ər.əl/` | kısa ömürlü, gelip geçici olan şey | Manage ephemeral container instances. | Kısa ömürlü konteyner örneklerini yönetin. |
| **panacea** | `/ˌpæn.əˈsiː.ə/` | her derde deva, sihirli çözüm | Microservices are not a universal panacea. | Mikroservisler her derde deva evrensel bir sihirli çözüm değildir. |

#### Fiiller (Verbs) (3 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **epitomize** | `/ɪˈpɪt.ə.maɪz/` | mükemmel bir örneğini oluşturmak, simgelemek | This clean architecture epitomizes best practices. | Bu temiz mimari, en iyi uygulamaları simgelemektedir. |
| **exacerbate** | `/ɪɡˈzæs.ə.beɪt/` | daha da kötüleştirmek, şiddetlendirmek | Unindexed queries exacerbate database lockups. | İndekslenmemiş sorgular veritabanı kilitlenmelerini daha da kötüleştirir. |
| **obfuscate** | `/ˈɒb.fʌs.keɪt/` | kasıtlı olarak anlaşılmaz hale getirmek, gizlemek | Obfuscate production JavaScript bundles. | Canlı ortam JavaScript paketlerini karartın/gizleyin. |

#### Sıfatlar (Adjectives) (3 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **untenable** | `/ʌnˈten.ə.bəl/` | savunulamaz, sürdürülemez | Manual deployment is an untenable strategy. | Manuel dağıtım savunulamaz bir stratejidir. |
| **quintessential** | `/ˌkwɪn.tɪˈsen.ʃəl/` | en tipik, mükemmel örneği olan | The quintessential pattern for pub-sub messaging. | Yayınla-abone ol mesajlaşmasının en yetkin örneği olan desen. |
| **parsimonious** | `/ˌpɑː.sɪˈməʊ.ni.əs/` | tutumlu, son derece hesaplı/tasarruflu | Write parsimonious memory allocation routines. | Bellek tahsisinde son derece tasarruflu rutinler yazın. |

#### Zarflar (Adverbs) (2 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **ostensibly** | `/ɒsˈten.sə.bli/` | görünüşte, sözde | Ostensibly designed for caching, it handles session state. | Görünüşte önbellekleme için tasarlanmış olsa da, oturum durumunu yönetir. |
| **perfunctorily** | `/pəˈfʌŋk.tər.əl.i/` | üstünkörü, baştan savma bir şekilde | Unit tests must not be written perfunctorily. | Birim testleri asla baştan savma yazılmamalıdır. |

#### Edatlar ve Kalıp İfadeler (Prepositions & Phrases) (2 Kelime)

| Kelime | Telaffuz (Phonetic) | Türkçe Anlamı | Örnek Cümle (EN) | Türkçe Çeviri |
| :---- | :---- | :---- | :---- | :---- |
| **by dint of** | `/baɪ dɪnt ɒv/` | sayesinde, vasıtasıyla (büyük çaba ile) | Succeeded by dint of rigorous mathematical proofs. | Titiz matematiksel kanıtlar sayesinde başarıya ulaştı. |
| **in the final analysis** | `/ɪn ðə ˈfaɪ.nəl əˈnæl.ə.sɪs/` | en nihayetinde, son tahlilde | In the final analysis, user experience determines adoption. | Son tahlilde, benimsenmeyi kullanıcı deneyimi belirler. |

### C2 Günlük Yol Haritası Örneği (İlk 7 Gün & Döngü Şablonu)

| Gün | Aşama | Gramer Konusu | Hedef Yeni Kelimeler | SRS Tekrar Kelimeleri | Writing Görevi |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Gün 1** | Active Learning & Application | Üst Düzey Biçimsel ve Retoriksel Devriklik ve Öne Alma (Fronting) | ubiquity, conundrum, ephemeral, panacea | \- | Write a 60-100 word passage integrating the grammar 'Stylist... |
| **Gün 2** | Active Learning & Application | Edimbilimsel İnce Nüanslar ve Çok Katmanlı Cümle Yapılandırması | panacea, epitomize, exacerbate, obfuscate | conundrum, ubiquity | Write a 60-100 word passage integrating the grammar 'Pragmat... |
| **Gün 3** | Active Learning & Application | Üst Düzey Biçimsel ve Retoriksel Devriklik ve Öne Alma (Fronting) | obfuscate, untenable, quintessential, parsimonious | epitomize, panacea | Write a 60-100 word passage integrating the grammar 'Stylist... |
| **Gün 4** | Active Learning & Application | Edimbilimsel İnce Nüanslar ve Çok Katmanlı Cümle Yapılandırması | parsimonious, ostensibly, perfunctorily, by dint of | ubiquity, conundrum, obfuscate, untenable | Write a 60-100 word passage integrating the grammar 'Pragmat... |
| **Gün 5** | Active Learning & Application | Üst Düzey Biçimsel ve Retoriksel Devriklik ve Öne Alma (Fronting) | by dint of, in the final analysis | ostensibly, parsimonious, panacea, epitomize | Write a 60-100 word passage integrating the grammar 'Stylist... |
| **Gün 6** | Active Learning & Application | Edimbilimsel İnce Nüanslar ve Çok Katmanlı Cümle Yapılandırması | conundrum, ephemeral, panacea, epitomize | in the final analysis, obfuscate, by dint of, untenable | Write a 60-100 word passage integrating the grammar 'Pragmat... |
| **Gün 7** | Milestone Review & Synthesis | Üst Düzey Biçimsel ve Retoriksel Devriklik ve Öne Alma (Fronting) | epitomize, exacerbate, obfuscate, untenable | conundrum, ostensibly, parsimonious, ephemeral | Write a 60-100 word passage integrating the grammar 'Stylist... |

---

## 3\. Kodlama ve Veritabanı Entegrasyon Şablonları

JSON verisini uygulamanızda kullanmak için örnek veri modelleri:

### Kotlin (Android / Room DB / Jetpack Compose) Veri Modelleri

@Entity(tableName \= "grammar\_topics")

data class GrammarTopicEntity(

    @PrimaryKey val id: String,

    val level: String, // A1, A2, B1, B2, C1, C2

    val title: String,

    val turkishTitle: String,

    val formula: String,

    val rules: String

)

@Entity(tableName \= "vocabulary\_items")

data class VocabularyItemEntity(

    @PrimaryKey val id: String,

    val word: String,

    val level: String,

    val partOfSpeech: String, // NOUN, VERB, ADJECTIVE, ADVERB, PHRASE

    val turkishMeaning: String,

    val phonetic: String,

    val exampleSentenceEn: String,

    val exampleSentenceTr: String,

    val srsStage: Int \= 0,

    val nextReviewTimestamp: Long \= 0L

)

@Entity(tableName \= "daily\_roadmaps")

data class DailyRoadmapEntity(

    @PrimaryKey(autoGenerate \= true) val id Long \= 0,

    val level: String,

    val dayNumber: Int,

    val grammarTopicId: String,

    val targetWordIds: List\<String\>,

    val srsReviewWordIds: List\<String\>,

    val writingPrompt: String,

    val listeningFocus: String,

    val isCompleted: Boolean \= false

)

### TypeScript / Node.js / React Veri Modelleri

export type CefrLevel \= 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type PartOfSpeech \= 'nouns' | 'verbs' | 'adjectives' | 'adverbs' | 'prepositions\_and\_phrases';

export interface GrammarTopic {

  id: string;

  title: string;

  turkish\_title: string;

  formula: string;

  rules: string;

  examples: Array\<{ en: string; tr: string }\>;

}

export interface VocabularyWord {

  word: string;

  tr: string;

  phonetic: string;

  ex\_en: string;

  ex\_tr: string;

}

export interface DailyPlan {

  day: number;

  level: CefrLevel;

  phase: string;

  time\_budget\_minutes: number;

  grammar\_module: {

    minutes: number;

    topic\_id: string;

    topic\_title: string;

    turkish\_title: string;

    action: string;

  };

  vocabulary\_module: {

    minutes: number;

    new\_target\_words: VocabularyWord\[\];

    srs\_review\_words: string\[\];

    action: string;

  };

  listening\_module: {

    minutes: number;

    focus\_area: string;

    technique: string;

    action: string;

  };

  writing\_module: {

    minutes: number;

    prompt: string;

    action: string;

  };

}

### SQL / PostgreSQL / SQLite Şeması

CREATE TABLE levels (

    code VARCHAR(2) PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT,

    study\_days INTEGER NOT NULL

);

CREATE TABLE grammar\_topics (

    id VARCHAR(20) PRIMARY KEY,

    level\_code VARCHAR(2) REFERENCES levels(code),

    title VARCHAR(255) NOT NULL,

    turkish\_title VARCHAR(255) NOT NULL,

    formula TEXT NOT NULL,

    rules TEXT NOT NULL

);

CREATE TABLE vocabulary (

    id SERIAL PRIMARY KEY,

    level\_code VARCHAR(2) REFERENCES levels(code),

    part\_of\_speech VARCHAR(30) NOT NULL,

    word VARCHAR(100) NOT NULL,

    phonetic VARCHAR(100),

    turkish\_meaning TEXT NOT NULL,

    example\_en TEXT NOT NULL,

    example\_tr TEXT NOT NULL

);

CREATE TABLE user\_srs\_progress (

    user\_id VARCHAR(50) NOT NULL,

    word\_id INTEGER REFERENCES vocabulary(id),

    srs\_stage INTEGER DEFAULT 0,

    interval\_days INTEGER DEFAULT 1,

    last\_reviewed\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,

    next\_review\_due TIMESTAMP NOT NULL,

    PRIMARY KEY(user\_id, word\_id)

);

