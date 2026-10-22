# Yeni gramer yolu: ders içerikleri

Bu dosya, [yeni-mufredat.md](yeni-mufredat.md) dosyasındaki 47 gramer konusunun ve 2 uygulama ünitesinin ders içeriğidir. Yalnızca gramer dersini kapsar. Sesli sahneler yeni-mufredat.md'de tanımlıdır; her dersin sonunda o sahneye numarayla gönderme yapılır.

Kaynak dil Türkçedir. Açıklamalar en, es, pt ve de dillerine çevrilir; İngilizce örnek cümleler ve diyaloglar çevrilmez.

---

## Ders şablonu

Her ders aynı bölümlerden oluşur. Sayılar üst sınırdır, kota değildir.

| Bölüm | İçerik |
|---|---|
| **Künye** | Seviye, ana hedef yapı, yardımcı yapı |
| **Bu derste öğreneceklerin** | Dersin teknik içeriği: yapıların adı ve ne işe yaradıkları, 2–5 madde. Kullanıcı ilk ekranda neyi öğreneceğini görür. |
| **Derse giriş** | Tek cümlelik merak sorusu. Hiçbir ana dile atıf yapmaz. |
| **Hedef** | Dersten sonra kullanıcının yapabileceği iletişim işi |
| **Ana kural** | Bir ana formül + kısa dönüşüm tablosu. Kuralı bilmeyen birine örnek dayatılmasın diye diyalogdan önce gelir. |
| **Diyalog** | A1–A2: 4–6 satır · B1–B2: en fazla 8 · İleri: en fazla 10. Hedef yapı kalın yazılır. |
| **Fark et** | Diyalogdaki örüntüyü kurala bağlayan 1–2 cümle |
| **Ne zaman kullanılır?** | 1–3 kullanım, her birine 2 örnek |
| **Ana dilinle fark** | Yalnızca gerekli konularda. Her dil için somut bir örnek cümle içerir. Kullanıcının ana diline göre tek bir madde gösterilir. |
| **Sık hatalar** | 2–3 gerçek hata: yanlış, doğru, neden karışır, hatırla. *(genel)* ya da *(ana dile özel: …)* diye işaretlenir. |
| **Alıştırma** | 6 soru: fark et → seç → tamamla → düzelt → kur → sesli üret |
| **Yanıt ve geri bildirim** | Her sorunun doğru cevabı ve nedeni |
| **Mivo ile kısa alıştırma** | 2 dakikalık yönlendirilmiş pratik. Destek seviyeye göre azalır. |
| **Sesli sahne** | yeni-mufredat.md'deki sahneye gönderme |

Bölümler ekranda bu sırayla görünür.

**Geri bildirim akışı (uygulamada):** Yanlış cevapta önce kısa bir ipucu gösterilir ve ikinci deneme hakkı verilir. İkinci denemeden sonra doğru cevap ve nedeni gösterilir. Doğru cevapta kuralın cümlede nasıl çalıştığı bir cümleyle pekiştirilir.

**Sesli üretim sorusu:** Kullanıcının söylediği cümle yazıya çevrilir ve hedef yapının doğru kullanılıp kullanılmadığı değerlendirilir. Telaffuz puanı verilmez.

---

## Kişiselleştirme

Diyaloglarda ve örneklerde kullanıcının kendisi konuşuyorsa, sabit bir karakter adı yerine kullanıcının kendi bilgisi kullanılır. Örneğin sabit "Elif" ve "İzmir" yerine kullanıcının kendi adı ve ülkesi gelir; öğrenci kendini tanıtmayı kendi bilgileriyle görür.

### Yer tutucular

| Yer tutucu | Ne | Kaynak | Boşsa |
|---|---|---|---|
| `{{name}}` | Kullanıcının adı | Onboarding'deki ad (zaten var) | Alex |
| `{{city}}` | Yaşadığı şehir | Uygulama diline göre varsayılan (onboarding sorusu yok): tr Istanbul, de Berlin, es Madrid, pt São Paulo, en London | Istanbul |
| `{{country}}` | Yaşadığı ülke (İngilizce adıyla) | Aynı varsayılan: Turkey, Germany, Spain, Brazil, the UK | Turkey |

Şehir ve ülke bugün uygulamada sorulmuyor. Bu alanlar gelene kadar yedek değerler kullanılır.

### Kurallar

1. **Yer tutucu yalnızca kullanıcının kendi satırlarında ya da kullanıcıya doğrudan seslenilen satırlarda kullanılır:** Diyalogda kullanıcının rolü (`**{{name}}:**`), "kendini anlat" türü örnekler ve Mivo'nun kullanıcıya hitabı ("Hi {{name}}!", "Have you always lived in {{city}}?"). Diğer karakterlerin adları sabittir: Mivo, Sam, Maya, Leo, Anna, Tom.
2. **Kullanıcı hakkında üçüncü tekil şahıs cümlesi kurulmaz.** Kullanıcının cinsiyetini bilmiyoruz; "{{name}} is a nurse. **She**…" gibi bir cümle yanlış olabilir. Kullanıcı hep "I" ya da "you" olarak geçer.
3. **Ülke adı İngilizce ve gerekiyorsa "the" ile saklanır:** the UK, the Netherlands, the United States. Cümlede yalnızca "from {{country}}" ya da "in {{country}}" olarak kullanılır. Milliyet sıfatı ("Turkish", "Spanish") yer tutucuyla kurulmaz; çekimi ve yazımı ülkeden ülkeye değişir.
4. **Meslek, yaş, aile gibi bilgiler için yer tutucu yoktur.** Bunlar örnek bilgi olarak kalır ("I'm a nurse"). Sesli üretim sorusunda kullanıcı kendi bilgisini zaten kendisi söyler.
5. **Alıştırmaların doğru cevabı yer tutucunun değerine bağlı olamaz.** Yer tutucu yalnızca cümlenin sabit parçasında görünür; boşluk ya da seçenek içinde olmaz.
6. **Ses:** Diyalogların sabit satırları önceden seslendirilir. Yer tutucu içeren satırlar, kullanıcı dersi ilk açtığında TTS ile bir kez üretilir ve cihazda saklanır. Ders başına en fazla 2–3 kısa satır olduğu için maliyet düşüktür.

---

## Yazım kuralları

- **Dilden bağımsız açıklama:** Açıklamalar, derse giriş ve genel hatalar hiçbir ana dile atıf yapmaz. Ana dile özel her şey yalnızca "Ana dilinle fark" bölümünde ve işaretli hatalarda durur.
- **Günlük hayat:** Örnekler aile, ev, arkadaşlık, alışveriş, yemek, sağlık, seyahat, okul ve genel iş hayatından gelir. Yazılım jargonu (sunucu, demo, deploy) kullanılmaz.
- **Seviyeye uygun kelime:** Örnekler dersin seviyesinin üstünde kelime içermez.
- **Sızıntı yok:** Sonraki bir dersin yapısı kural olarak kullanılmaz. Diyalogda kalıp olarak duyulabilir (ör. A1'de "Where are you from?"), ama alıştırmada sorulmaz.
- **Ana dil notları** her dil için o dilin gerçek bir örnek cümlesini içerir. Yayından önce ilgili dili ana dili olarak konuşan biri kontrol etmelidir.

---

# Başlangıç · A1

## 1. Kendini tanıt

**Künye:** A1 · Ana hedef: to be (am/is/are) olumlu ve olumsuz, özne zamirleri · Yardımcı: kısaltmalar (I'm, isn't)

**Bu derste öğreneceklerin**

- **am / is / are:** İngilizcede "olmak" fiilinin şimdiki zamandaki üç biçimi
- **Özne zamirleri:** I, you, he, she, it, we, they
- **Olumlu ve olumsuz cümle:** I am a nurse. · I'm not tired.
- **Kısaltmalar:** I'm, she's, they're, isn't, aren't

**Derse giriş:** "I a nurse" mı, "I am a nurse" mı? İngilizcede kim olduğunu söylerken cümleye küçük ama zorunlu bir kelime girer.

**Hedef:** Kendini adınla, nerede yaşadığınla, işinle ve nasıl hissettiğinle tanıtabilirsin.

**Ana kural:** `Özne + am / is / are + isim / sıfat / yer`

| Özne | Olumlu | Olumsuz |
|---|---|---|
| I | I am · I'm | I am not · I'm not |
| He / She / It | She is · She's | She is not · She isn't |
| You / We / They | They are · They're | They are not · They aren't |

**Diyalog: kursta ilk gün**

**Mivo:** Hi! **I'm** Mivo. **I'm** your classmate.  
**{{name}}:** Hi, Mivo. **I'm** {{name}}. **I'm** from {{country}}.  
**Mivo:** Nice to meet you. **I'm** a little nervous today.  
**{{name}}:** Me too! But the teacher **is** very friendly.  
**Mivo:** Yes, and the other students **are** nice too.

**Fark et:** Her cümlede kişiden sonra küçük bir kelime var: I'**m**, the teacher **is**, the students **are**. Bu kelime kimin hakkında konuştuğuna göre değişiyor.

**Ne zaman kullanılır?**
- **Kim olduğunu ve ne iş yaptığını söylerken:** I'm {{name}}. · She's a nurse.
- **Nereli olduğunu ya da nerede olduğunu söylerken:** I'm from {{country}}. · We're at school.
- **Nasıl hissettiğini ya da yaşını söylerken:** I'm tired today. · He's 25.

**Ana dilinle fark**
- **Türkçe:** "Hemşireyim" derken ayrı bir fiil söylenmez, ek yeterlidir. İngilizcede am/is/are atlanamaz: I **am** a nurse.
- **İspanyolca:** "Soy enfermera" cümlesinde ne özne ne de "a" vardır. İngilizcede ikisi de gerekir: **I** am **a** nurse. Yaş için "Tengo 25 años" değil, **I am 25** denir.
- **Portekizce:** "Sou enfermeira" cümlesinde ne özne ne de "a" vardır. İngilizcede ikisi de gerekir: **I** am **a** nurse. Yaş için "Tenho 25 anos" değil, **I am 25** denir.
- **Almanca:** "Ich bin Krankenschwester" cümlesinde meslekten önce artikel yoktur. İngilizcede gerekir: I am **a** nurse.

**Sık hatalar**
- ✗ She are tired. → ✓ She **is** tired. *(genel)* **Neden karışır:** Üç biçim var ve hangisinin hangi özneyle geldiği ilk başta karışır. **Hatırla:** he/she/it → is · you/we/they → are.
- ✗ I am nurse. → ✓ I am **a** nurse. *(genel)* **Neden karışır:** Birçok dilde meslekten önce artikel yoktur. **Hatırla:** Tek bir meslek söylerken önüne a/an gelir.
- ✗ I'm work in a hospital. → ✓ I work in a hospital. *(genel)* **Neden karışır:** am her cümlede gerekli sanılır. **Hatırla:** Cümlede work, live gibi bir eylem varsa am/is/are kullanılmaz.
- ✗ I nurse. → ✓ I **am a** nurse. *(ana dile özel: Türkçe)* **Neden karışır:** "Hemşireyim" derken ayrı bir fiil söylenmez, ek yeterlidir. **Hatırla:** İngilizcede am/is/are atlanmaz.
- ✗ Is a nurse. → ✓ **She is** a nurse. *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** "Es enfermera" / "É enfermeira" cümlelerinde özne söylenmez. **Hatırla:** İngilizce cümlede özne (I, she, it…) her zaman yazılır.
- ✗ I have 25 years. → ✓ I **am** 25. *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** Yaş "Tengo 25 años" / "Tenho 25 anos" diye, have fiiliyle söylenir. **Hatırla:** Yaş için be: I am 25 (years old).
- ✗ I am 25 years. → ✓ I am 25. / I am 25 **years old**. *(ana dile özel: Almanca)* **Neden karışır:** "Ich bin 25 Jahre alt" kalıbı yarım çevrilir. **Hatırla:** Ya yalnızca sayı, ya da years old ile tam kalıp.

**Alıştırma**
1. **Fark et:** "The students are nice." Bu cümlede to be hangi kelime?
2. **Seç:** I (am / is / are) from Canada.
3. **Tamamla:** My brother ___ a teacher.
4. **Düzelt:** They is at home.
5. **Kur:** from / we / Spain / are
6. **Sesli üret:** Kendini üç cümleyle tanıt: adın, nerede yaşadığın ve bugün nasıl hissettiğin.

**Yanıt ve geri bildirim**
1. **are.** The students çoğul olduğu için are.
2. **am.** I her zaman am ile kullanılır.
3. **is.** My brother tek kişidir; he gibi davranır.
4. **They are at home.** They ile are kullanılır.
5. **We are from Spain.** Özne + be + bilgi sırası.
6. Örnek: I'm {{name}}. I'm from {{country}}. I'm happy today. Her cümlede kişiden sonra am/is/are olmalı.

**Mivo ile kısa alıştırma:** Mivo kursta yeni tanıştığın bir sınıf arkadaşıdır. Sırayla sorar: adın, nerelisin, ne iş yapıyorsun, bugün nasılsın. Ekranda başlangıçlar durur: *I'm… · I'm from… · I'm a… · I'm…(sıfat).* Sonunda Mivo senin doğru kurduğun bir cümleyi tekrar eder: "Great! You can introduce yourself now."

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #1

## 2. Bu ne?

**Künye:** A1 · Ana hedef: a/an, this/that/these/those, tekil ve çoğul isim · Yardımcı: —

**Bu derste öğreneceklerin**

- **a / an:** Tek bir şeyden önce gelen belirsiz artikel ve aralarındaki ses farkı
- **this / that / these / those:** Yakındaki ve uzaktaki şeyleri gösterme
- **Tekil ve çoğul isim:** bag → bags, cup → cups

**Derse giriş:** Elindeki bir şeyi göstermek ile odanın öbür ucundaki bir şeyi göstermek İngilizcede aynı kelimeyle mi söylenir?

**Hedef:** Yakındaki ve uzaktaki eşyaları gösterip ne olduklarını söyleyebilirsin.

**Ana kural:** `a / an + tekil isim` · `this / that + tekil` · `these / those + çoğul`

| | Yakın | Uzak |
|---|---|---|
| Tekil | this bag | that bag |
| Çoğul | these bags | those bags |

**a mı, an mı?** Kelimenin ilk **sesine** bakılır, ilk harfine değil: a bag, a cup · an apple, an old map · an hour (h okunmaz) · a university (ilk ses "yu").

**Diyalog: hediyelik eşya dükkânı**

**Mivo:** Welcome! Look around.  
**{{name}}:** What's **this**?  
**Mivo:** It's **a** small bag. It's handmade.  
**{{name}}:** And what are **those** on the shelf?  
**Mivo:** **Those** are cups. And **this** is **an** old map.  
**{{name}}:** **These** cups are beautiful!

**Fark et:** Elindeki şey için **this**, raftaki şeyler için **those** kullanılıyor. Tek bir şeyden önce **a** ya da **an** geliyor.

**Ne zaman kullanılır?**
- **Bir şeyi ilk kez söylerken:** It's a key. · It's an umbrella.
- **Yakındaki ya da uzaktaki şeyi gösterirken:** This is my phone. · Those are your shoes.

**Ana dilinle fark**
- **Türkçe:** Sayıdan sonra isim tekil kalır ("iki kitap"). İngilizcede çoğul olur: two book**s**. Tek bir şeyden önce de a/an gerekir: **a** book.
- **İspanyolca:** "un libro / una mesa" cinsiyete göre değişir. İngilizcede tek biçim vardır: **a** book, **a** table. Sıfat çoğul olmaz: "libros grandes" ama big book**s** (bigs değil).
- **Portekizce:** "um livro / uma mesa" cinsiyete göre değişir. İngilizcede tek biçim vardır: **a** book, **a** table. Sıfat çoğul olmaz: "livros grandes" ama big book**s** (bigs değil).
- **Almanca:** "ein / eine", "dieser / diese / dieses" cinsiyete göre değişir. İngilizcede this/that yalnızca tekil-çoğul ayrımına göre değişir.

**Sık hatalar**
- ✗ This are my keys. → ✓ **These** are my keys. *(genel)* **Neden karışır:** this ve these sesçe yakındır. **Hatırla:** Birden fazla şey → these / those.
- ✗ It's a apple. → ✓ It's **an** apple. *(genel)* **Neden karışır:** a daha sık görülür. **Hatırla:** Sesli harf sesiyle başlayan kelimeden önce an.
- ✗ two bigs bags → ✓ two **big** bags *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** Ana dilde sıfat isimle birlikte çoğul olur. **Hatırla:** İngilizcede sıfat hiç değişmez.
- ✗ two book → ✓ two **books** *(ana dile özel: Türkçe)* **Neden karışır:** Sayıdan sonra isim tekil kalır ("iki kitap"). **Hatırla:** Birden fazlaysa isim çoğul olur.
- ✗ an information → ✓ **some** information *(ana dile özel: Almanca)* **Neden karışır:** "eine Information" sayılabilir bir isimdir. **Hatırla:** information sayılamaz; a/an almaz, çoğul olmaz.

**Alıştırma**
1. **Fark et:** "Those are cups." Cups yakında mı, uzakta mı?
2. **Seç:** (This / These) is an apple.
3. **Tamamla:** It's ___ umbrella.
4. **Düzelt:** That are my shoes.
5. **Kur:** is / this / a / ticket
6. **Sesli üret:** Etrafındaki üç eşyayı göster ve ne olduklarını söyle.

**Yanıt ve geri bildirim**
1. **Uzakta.** those = uzaktaki birden fazla şey.
2. **This.** Tek bir elma.
3. **an.** Umbrella sesli harf sesiyle başlar.
4. **Those are my shoes.** Shoes çoğul ve uzakta.
5. **This is a ticket.**
6. Örnek: This is a pen. That's a window. These are my keys. Tekil/çoğul ve yakın/uzak uyumuna dikkat et.

**Mivo ile kısa alıştırma:** Mivo bir dükkânın satıcısıdır ve rafları gösterir. Sen yakındaki ve uzaktaki üç eşyayı sorar ve söylersin. Başlangıçlar: *What's this? · What are those? · It's a… · They're…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #2

## 3. Kimin bu?

**Künye:** A1 · Ana hedef: my/your/his/her/our/their · Yardımcı: iyelik 's (Anna's bag)

**Bu derste öğreneceklerin**

- **İyelik sıfatları:** my, your, his, her, its, our, their
- **his mi, her mi:** Seçimin sahibe göre yapılması
- **İyelik 's:** Anna's bag, my brother's car

**Derse giriş:** "Bu Anna'nın çantası" demek için İngilizcede tek bir işaret yeter: **'s**.

**Hedef:** Eşyaların ve insanların kime ait olduğunu söyleyebilirsin.

**Ana kural:** `iyelik sıfatı + isim` · `isim + 's + isim`

| Kişi | Sahiplik |
|---|---|
| I | my |
| you | your |
| he | his |
| she | her |
| it | its |
| we | our |
| they | their |

**his mi, her mi?** Eşyaya değil, **sahibine** bakılır: Leo → **his** bag · Anna → **her** bag.

**Diyalog: aile fotoğrafları**

**Mivo:** Is this **your** family?  
**{{name}}:** Yes! This is **my** mother, and that's **my** brother.  
**Mivo:** What's **his** name?  
**{{name}}:** **His** name is Leo. And this is **Leo's** dog.  
**Mivo:** **Their** dog is so cute!

**Fark et:** Sahip, eşyadan **önce** geliyor: **my** mother, **his** name. Bir kişinin adıyla sahiplik için **'s** ekleniyor: Leo**'s** dog.

**Ne zaman kullanılır?**
- **Kendi eşyanı ve aileni anlatırken:** This is my phone. · Our house is small.
- **Başkasına ait olanı söylerken:** It's Anna's coat. · Her brother is a doctor.

**Ana dilinle fark**
- **Türkçe:** Sahiplik eklerle gösterilir ("çanta**m**", "Anna'**nın** çanta**sı**"). İngilizcede sahip kelimesi önde durur ve isim değişmez: **my** bag, **Anna's** bag.
- **İspanyolca:** "su" his, her, their ve your anlamına gelebilir. İngilizcede sahibine göre seçilir: **his** car / **her** car / **their** car. "La casa de Ana" yerine **Ana's** house denir.
- **Portekizce:** "o carro dele / dela" yapısında sahip arkada durur. İngilizcede öne gelir: **his** car / **her** car. "A casa da Ana" yerine **Ana's** house denir.
- **Almanca:** "ihr" hem her hem their anlamına gelir. İngilizcede ayrı kelimelerdir: **her** bag / **their** bag. "Annas Tasche" İngilizcede kesme işaretiyle yazılır: **Anna's** bag.

**Sık hatalar**
- ✗ This is mine bag. → ✓ This is **my** bag. *(genel)* **Neden karışır:** mine de sahiplik bildirir. **Hatırla:** İsimden önce my; tek başına mine (It's mine).
- ✗ Anna bag → ✓ **Anna's** bag. *(genel)* **Neden karışır:** İki isim yan yana yeterli sanılır. **Hatırla:** Kişinin adına 's ekle.
- ✗ Leo and her sister (Leo'nun kız kardeşi) → ✓ Leo and **his** sister. *(genel)* **Neden karışır:** his/her eşyaya göre seçilir sanılır. **Hatırla:** Sahibin kim olduğuna bak.
- ✗ my sister and his husband → ✓ my sister and **her** husband *(ana dile özel: Türkçe)* **Neden karışır:** "onun" kelimesi kadın ve erkek için aynıdır. **Hatırla:** Sahibi kadınsa her, erkekse his.
- ✗ the house of Ana → ✓ **Ana's** house *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** "la casa de Ana" / "a casa da Ana" kalıbı birebir çevrilir. **Hatırla:** Kişiye ait bir şey için 's.
- ✗ Annas bag → ✓ **Anna's** bag *(ana dile özel: Almanca)* **Neden karışır:** "Annas Tasche" kesme işaretsiz yazılır. **Hatırla:** İngilizcede iyelik eki kesme işaretiyle yazılır: 's.

**Alıştırma**
1. **Fark et:** "Their dog is cute." Köpek kimin?
2. **Seç:** Maya and (his / her) brother.
3. **Tamamla:** We → ___ house.
4. **Düzelt:** This is Tom phone.
5. **Kur:** is / this / John's / key
6. **Sesli üret:** Ailenden iki kişiyi ve onların bir eşyasını anlat.

**Yanıt ve geri bildirim**
1. **Birden fazla kişinin** (they).
2. **her.** Sahip Maya.
3. **our.**
4. **This is Tom's phone.** Kişinin adına 's gelir.
5. **This is John's key.**
6. Örnek: This is my sister. Her name is Anna. This is her car. Sahibe göre his/her seç.

**Mivo ile kısa alıştırma:** Mivo sana fotoğraf albümünü gösterir ve sen de kendi ailenden bahsedersin. Başlangıçlar: *This is my… · His/Her name is… · It's my…'s…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #3

## 4. Sorular sor

**Künye:** A1 · Ana hedef: to be soruları (Are you…? Is it…?), Wh- + be (Where is…? What is…?) · Yardımcı: kısa cevaplar (Yes, I am.)

**Bu derste öğreneceklerin**

- **Evet/hayır soruları:** Are you…? Is it…?
- **Soru kelimeleri:** what, where, who, how, how old
- **Kısa cevaplar:** Yes, I am. · No, it isn't.
- **Soru sırası:** be fiilinin özneden önce gelmesi

**Derse giriş:** "You are ready" cümlesini soru yapmak için yeni bir kelime gerekmez. Yalnızca iki kelimenin yeri değişir.

**Hedef:** Kişisel bilgi, yer ve durum hakkında basit sorular sorup kısa cevap verebilirsin.

**Ana kural:** `Am / Is / Are + özne + …?` · `Wh- + am / is / are + özne?`

| Cümle | Soru | Kısa cevap |
|---|---|---|
| You are ready. | **Are you** ready? | Yes, I am. / No, I'm not. |
| It is open. | **Is it** open? | Yes, it is. / No, it isn't. |
| The lift is there. | **Where is** the lift? | It's on the left. |

Soru kelimeleri: what (ne), where (nerede), who (kim), how (nasıl), how old (kaç yaşında).

**Diyalog: otel resepsiyonu**

**Mivo:** Good evening. **Are you** {{name}}?  
**{{name}}:** Yes, **I am**.  
**Mivo:** Welcome! Your room is 204.  
**{{name}}:** Thank you. **Is** breakfast included?  
**Mivo:** Yes, **it is**.  
**{{name}}:** And **where is** the lift?

**Fark et:** Soruda am/is/are öne geçiyor: **Are you**…? **Is** breakfast…? Kısa cevapta aynı kelime tekrar ediyor: Yes, I **am**. / Yes, it **is**.

**Ne zaman kullanılır?**
- **Bilgiyi doğrulamak için:** Are you Sam? · Is this seat free?
- **Bilgi istemek için:** Where is the station? · What is your name?

**Ana dilinle fark**
- **Türkçe:** Soru, cümlenin sonuna eklenen "mi" ile yapılır ve sıra değişmez. İngilizcede sıra değişir: You are → **Are you**…?
- **İspanyolca:** "¿Eres de España?" sorusu yalnızca tonlamayla kurulur. İngilizcede sıra değişir: **Are you** from Spain? "¿De dónde eres?" yapısında edat başta durur; İngilizcede sonda: Where are you **from**?
- **Portekizce:** "Você é do Brasil?" sorusu yalnızca tonlamayla kurulur. İngilizcede sıra değişir: **Are you** from Brazil? "De onde você é?" yapısında edat başta durur; İngilizcede sonda: Where are you **from**?
- **Almanca:** "Woher kommst du?" tek bir soru kelimesiyle kurulur. İngilizcede "from" sona gelir: **Where** are you **from**?

**Sık hatalar**
- ✗ Where you are from? → ✓ Where **are you** from? *(genel)* **Neden karışır:** Düz cümlenin sırası korunur. **Hatırla:** Soru kelimesinden sonra önce be, sonra özne.
- ✗ Are you ready? — Yes, I do. → ✓ Yes, I **am**. *(genel)* **Neden karışır:** Yes, I do kalıbı çok duyulur. **Hatırla:** Kısa cevapta sorudaki fiil tekrar edilir.
- ✗ You are a student? → ✓ **Are you** a student? *(ana dile özel: Türkçe)* **Neden karışır:** Soru sona eklenen "mi" ile yapılır, sıra değişmez. **Hatırla:** Soruda be özneden önce gelir.
- ✗ You are from Spain? → ✓ **Are you** from Spain? *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** Soru yalnızca tonlamayla sorulur. **Hatırla:** Yazılı ve resmî İngilizcede soruda be öne geçer.
- ✗ From where are you? → ✓ Where are you **from**? *(ana dile özel: İspanyolca, Portekizce, Almanca)* **Neden karışır:** "¿De dónde…?" / "De onde…?" / "Woher…?" sorularında yön bildiren kısım başta durur. **Hatırla:** İngilizcede from cümlenin sonuna gider.

**Alıştırma**
1. **Fark et:** "Is breakfast included?" Soruyu yapan kelime hangisi ve nerede duruyor?
2. **Seç:** (Is / Are) your friends here?
3. **Tamamla:** Are they at home? — Yes, they ___.
4. **Düzelt:** Where is you from?
5. **Kur:** from / where / he / is
6. **Sesli üret:** Yeni tanıştığın birine iki soru sor.

**Yanıt ve geri bildirim**
1. **Is, cümlenin başında.** Soru yapmak için be özneden önce gelir.
2. **Are.** Friends çoğul.
3. **are.**
4. **Where are you from?** you ile are, sıra: soru kelimesi + be + özne.
5. **Where is he from?**
6. Örnek: What's your name? Where are you from? Soru kelimesinden sonra be, sonra özne.

**Mivo ile kısa alıştırma:** Mivo otel resepsiyonistidir. Sen üç soru sorarsın: kahvaltı, oda ve Wi-Fi hakkında. Başlangıçlar: *Is… included? · Where is…? · What is…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #4

## 5. Günlük rutinin

**Künye:** A1 · Ana hedef: present simple, 3. tekil -s, do/does ile soru ve olumsuz · Yardımcı: Do you…? / Where do you…?

**Bu derste öğreneceklerin**

- **Present simple:** Rutinler ve genel doğrular için geniş zaman
- **3. tekil -s:** I work → she works
- **do / does:** Soru ve olumsuz cümle kurma
- **Yazım kuralları:** goes, watches, studies, has

**Derse giriş:** "I work" ama "she work**s**". Neden yalnızca he, she ve it ile fiil değişiyor?

**Hedef:** Her gün ya da genelde yaptığın şeyleri anlatıp başkasına rutinini sorabilirsin.

**Ana kural:** `I / you / we / they + fiil` · `he / she / it + fiil-s` · soru ve olumsuzda `do / does`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| I / you / we / they | I work. | I don't work. | Do you work? |
| he / she / it | She works. | She doesn't work. | Does she work? |

Yazım: go → goes, watch → watches, study → studies, have → **has**.

**Diyalog: dil buluşması**

**Mivo:** What do you do in the morning, {{name}}?  
**{{name}}:** I **get** up at seven and I **have** coffee.  
**Mivo:** **Do** you **walk** to work?  
**{{name}}:** No, I **don't**. I **take** the bus. **Do** you **work** on Saturdays?  
**Mivo:** No. My sister **works** on Saturdays. She **doesn't** like it!

**Fark et:** I get, I take, but my sister work**s**. Soru ve olumsuzda **do / don't / doesn't** geliyor ve fiil yalın kalıyor: She doesn't **like** it.

**Ne zaman kullanılır?**
- **Rutinler ve alışkanlıklar:** I get up at seven. · He plays football on Sundays.
- **Genel olarak doğru olan şeyler:** She lives in Rome. · Shops open at nine.

**Ana dilinle fark**
- **Türkçe:** Fiil her kişi için ek alır, ama soru ve olumsuz için ayrı bir yardımcı yoktur. İngilizcede gerekir: **Do** you work? · I **don't** work.
- **İspanyolca:** "¿Trabajas aquí?" sorusu yardımcı fiilsiz kurulur. İngilizcede **Do** you work here? "No trabajo" değil, I **don't** work (I no work değil).
- **Portekizce:** "Você trabalha aqui?" sorusu yardımcı fiilsiz kurulur. İngilizcede **Do** you work here? "Não trabalho" değil, I **don't** work (I no work değil).
- **Almanca:** "Arbeitest du hier?" sorusunda fiil başa geçer. İngilizcede ana fiil başa geçmez, do gelir: **Do** you work here? (Work you here? değil.) "Ich arbeite nicht" değil, I **don't** work.

**Sık hatalar**
- ✗ She work here. → ✓ She **works** here. *(genel)* **Neden karışır:** Diğer kişilerde fiil değişmez. **Hatırla:** he / she / it → fiil + s.
- ✗ Does he works? → ✓ Does he **work**? *(genel)* **Neden karışır:** -s iki kez eklenir. **Hatırla:** does geldiyse fiil yalın kalır.
- ✗ I no like coffee. → ✓ I **don't** like coffee. *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** Ana dilde olumsuzluk tek kelimeyle yapılır. **Hatırla:** don't / doesn't + yalın fiil.
- ✗ Are you work here? → ✓ **Do** you work here? *(ana dile özel: Türkçe)* **Neden karışır:** Soru yardımcısı olarak be ve do karıştırılır. **Hatırla:** Eylem fiili (work, live) varsa do / does.
- ✗ Work you here? → ✓ **Do you work** here? *(ana dile özel: Almanca)* **Neden karışır:** "Arbeitest du hier?" sorusunda ana fiil başa geçer. **Hatırla:** İngilizcede ana fiil başa geçmez; do gelir.
- ✗ I work not on Sundays. → ✓ I **don't work** on Sundays. *(ana dile özel: Almanca)* **Neden karışır:** "Ich arbeite nicht" sırası korunur. **Hatırla:** Olumsuzda don't / doesn't + yalın fiil.

**Alıştırma**
1. **Fark et:** "My sister works on Saturdays." Fiile neden -s geldi?
2. **Seç:** He (go / goes) home at six.
3. **Tamamla:** ___ you cook every day?
4. **Düzelt:** Does Anna likes tea?
5. **Kur:** where / do / live / you
6. **Sesli üret:** Sabah rutinini üç cümleyle anlat.

**Yanıt ve geri bildirim**
1. **My sister = she.** he/she/it ile fiil -s alır.
2. **goes.**
3. **Do.**
4. **Does Anna like tea?** does varsa fiil yalın.
5. **Where do you live?**
6. Örnek: I get up at 7. I have breakfast. I take the bus. Rutin için present simple.

**Mivo ile kısa alıştırma:** Mivo bir dil buluşmasındaki partnerindir. Önce kendi sabahını anlatır, sonra senin rutinini sorar; sen de ona bir soru sorarsın. Başlangıçlar: *I get up at… · I usually… · Do you…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #5

## 6. Ne zaman, ne sıklıkla?

**Künye:** A1 · Ana hedef: sıklık zarfları (always, usually, often, sometimes, never) ve yerleri · Yardımcı: zaman edatları at / on / in

**Bu derste öğreneceklerin**

- **Sıklık zarfları:** always, usually, often, sometimes, never
- **Zarfın yeri:** Fiilden önce, am/is/are'den sonra
- **Zaman edatları:** at (saat), on (gün), in (ay, yıl)

**Derse giriş:** "Her zaman" kelimesinin cümledeki yeri, fiile göre değişir. Hangi fiile göre?

**Hedef:** Bir şeyi ne sıklıkla ve hangi gün, saat ya da ayda yaptığını söyleyebilirsin.

**Ana kural:** `özne + sıklık zarfı + fiil` · `özne + am/is/are + sıklık zarfı`

always (her zaman) → usually → often → sometimes → never (asla)

| Zaman | Edat | Örnek |
|---|---|---|
| Saat | at | at 7, at noon |
| Gün, tarih | on | on Monday, on 5 May |
| Ay, mevsim, yıl | in | in July, in summer, in 2025 |

**Diyalog: spor salonu kaydı**

**Mivo:** How often do you exercise?  
**{{name}}:** I **usually** run **on** Mondays.  
**Mivo:** Do you come in the morning?  
**{{name}}:** I **sometimes** come **at** seven. But I'm **never** free **on** Fridays.  
**Mivo:** No problem. The yoga class is **at** six.

**Fark et:** usually ve sometimes fiilden **önce** geliyor (I usually run). never ise am'den **sonra** geliyor (I'm never free). Günlerle **on**, saatlerle **at** kullanılıyor.

**Ne zaman kullanılır?**
- **Bir alışkanlığın sıklığını söylerken:** I always drink tea. · She is often late.
- **Bir şeyin zamanını söylerken:** We meet on Fridays. · The class starts at six.

**Sık hatalar**
- ✗ I go always by bus. → ✓ I **always go** by bus. *(genel)* **Neden karışır:** Zarf cümlenin sonuna ya da fiilden sonra konur. **Hatırla:** Zarf ana fiilden önce, am/is/are'den sonra.
- ✗ at Monday → ✓ **on** Monday. *(genel)* **Neden karışır:** Zaman edatları dilden dile farklıdır. **Hatırla:** Günler → on.
- ✗ He never is tired. → ✓ He **is never** tired. *(genel)* **Hatırla:** be fiiliyle zarf sonra gelir.

**Alıştırma**
1. **Fark et:** "I'm never free on Fridays." never neden am'den sonra?
2. **Seç:** I (always go / go always) to bed at eleven.
3. **Tamamla:** My birthday is ___ June.
4. **Düzelt:** She drinks never coffee.
5. **Kur:** usually / I / at / eat / seven
6. **Sesli üret:** Hafta içi yaptığın iki şeyi, ne sıklıkla ve ne zaman yaptığınla anlat.

**Yanıt ve geri bildirim**
1. **am bir be fiili.** be ile zarf arkadan gelir.
2. **always go.** Zarf ana fiilden önce.
3. **in.** Aylarla in.
4. **She never drinks coffee.**
5. **I usually eat at seven.**
6. Örnek: I usually cook on Sundays. I sometimes go to the cinema in the evening.

**Mivo ile kısa alıştırma:** Mivo spor salonunun kayıt görevlisidir. Ne sıklıkla spor yaptığını ve hangi gün/saatte gelebileceğini sorar. Başlangıçlar: *I usually… · I never… · on… · at…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #6

## 7. Neler var, nasıl gidilir?

**Künye:** A1 · Ana hedef: there is / there are, yer edatları · Yardımcı: emir kipi ile yol tarifi (Turn left, Don't…)

**Bu derste öğreneceklerin**

- **there is / there are:** Bir yerde bir şeyin var olduğunu söyleme
- **Yer edatları:** in, on, under, next to, opposite, between
- **Emir kipi:** Turn left. · Don't cross.
- **Yol tarifi:** Go straight, turn right

**Derse giriş:** "Yakınlarda bir eczane var mı?" sorusu İngilizcede "eczane" ile değil, "there" ile başlar.

**Hedef:** Bir yerde neler olduğunu söyleyebilir ve basit bir yol tarifi verip alabilirsin.

**Ana kural:** `There is + tekil` · `There are + çoğul` · yol tarifi: `fiil + …` / `Don't + fiil`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| Tekil | There is a bank. | There isn't a bank. | Is there a bank? |
| Çoğul | There are two cafés. | There aren't any cafés. | Are there any cafés? |

Yer edatları: in (içinde), on (üstünde), under (altında), next to (yanında), opposite (karşısında), between (arasında).

**Diyalog: sokakta yol sorma**

**{{name}}:** Excuse me. **Is there** a pharmacy near here?  
**Mivo:** Yes, **there is**. It's **next to** the bank.  
**{{name}}:** And **are there** any cafés?  
**Mivo:** Yes, **there are** two cafés **on** this street.  
**{{name}}:** How do I get to the pharmacy?  
**Mivo:** **Go** straight and **turn** left. **Don't cross** the bridge.

**Fark et:** Tek bir şey için **there is**, birden fazla için **there are**. Yol tarifinde cümle doğrudan fiille başlıyor: **Go**, **turn**, **Don't** cross.

**Ne zaman kullanılır?**
- **Bir yerde ne olduğunu söylerken:** There's a park near my house. · There are three bedrooms.
- **Yol tarifi verirken:** Turn right at the corner. · Go past the school.

**Sık hatalar**
- ✗ There are a bank. → ✓ There **is** a bank. *(genel)* **Neden karışır:** "there are" kalıbı tek parça gibi ezberlenir. **Hatırla:** Arkadan gelen isme bak: tekil → is.
- ✗ It has a park near here. → ✓ **There is** a park near here. *(genel)* **Neden karışır:** "var" anlamı için have kullanılır. **Hatırla:** Bir yerde bir şeyin varlığı → there is/are.
- ✗ Turn to left. → ✓ Turn left. *(genel)* **Hatırla:** turn left / turn right, araya to girmez.

**Alıştırma**
1. **Fark et:** "There are two cafés on this street." Neden are?
2. **Seç:** (Is / Are) there a supermarket near here?
3. **Tamamla:** The keys are ___ the table. (on / in)
4. **Düzelt:** There is three shops.
5. **Kur:** straight / go / ahead
6. **Sesli üret:** Evinin yakınında neler olduğunu söyle ve bir yere kısa yol tarifi ver.

**Yanıt ve geri bildirim**
1. **Cafés çoğul.**
2. **Is.** a supermarket tekil.
3. **on.** Masanın üstünde.
4. **There are three shops.**
5. **Go straight ahead.**
6. Örnek: There's a park near my house. There are two shops. Go straight and turn left.

**Mivo ile kısa alıştırma:** Mivo mahalleye yeni taşınmış bir komşudur. Yakında neler olduğunu ve markete nasıl gidileceğini sorar. Başlangıçlar: *There's a… · There are… · Go straight… · Turn left/right…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #7

## 8. Sevdiklerin

**Künye:** A1 · Ana hedef: like / love / hate / enjoy + -ing · Yardımcı: nesne zamirleri (me, him, her, them)

**Bu derste öğreneceklerin**

- **like / love / hate / enjoy + -ing:** Sevdiğin ve sevmediğin etkinlikleri söyleme
- **Nesne zamirleri:** me, you, him, her, it, us, them

**Derse giriş:** "Yemek yapmayı severim" derken İngilizcede fiil hangi biçime girer?

**Hedef:** Sevdiğin ve sevmediğin etkinlikleri ve insanları söyleyebilirsin.

**Ana kural:** `like / love / hate / enjoy + fiil-ing` · `fiil + nesne zamiri`

| Özne | Nesne |
|---|---|
| I | me |
| you | you |
| he | him |
| she | her |
| it | it |
| we | us |
| they | them |

**Diyalog: ev arkadaşı görüşmesi**

**Mivo:** So, {{name}}, what do you do at the weekend?  
**{{name}}:** I **love cooking**, and I **enjoy reading**.  
**Mivo:** Great! I **hate cleaning**, but I **like cooking** too.  
**{{name}}:** And your other flatmates?  
**Mivo:** Sam and Maya? I really like **them**. You can meet **them** tonight.

**Fark et:** Sevilen etkinlik fiil + **-ing** ile söyleniyor: love cook**ing**, hate clean**ing**. Kişiler fiilden sonra gelince they değil **them** oluyor.

**Ne zaman kullanılır?**
- **Hobilerini ve tercihlerini anlatırken:** I enjoy swimming. · She hates waiting.
- **Birisi hakkında ne düşündüğünü söylerken:** I like her. · Do you know them?

**Sık hatalar**
- ✗ I enjoy to cook. → ✓ I enjoy **cooking**. *(genel)* **Neden karışır:** Birçok fiilden sonra to gelir. **Hatırla:** enjoy'dan sonra her zaman -ing.
- ✗ I like she. → ✓ I like **her**. *(genel)* **Neden karışır:** Özne ve nesne zamiri aynı sanılır. **Hatırla:** Fiilden sonra me, him, her, us, them.

**Alıştırma**
1. **Fark et:** "I love cooking." Fiil hangi biçimde?
2. **Seç:** He hates (wait / waiting).
3. **Tamamla:** They like ___. (we)
4. **Düzelt:** She enjoys to dance.
5. **Kur:** them / we / know
6. **Sesli üret:** Sevdiğin iki etkinliği ve sevmediğin bir şeyi söyle.

**Yanıt ve geri bildirim**
1. **-ing biçimi.** love + fiil-ing.
2. **waiting.**
3. **us.** Fiilden sonra nesne zamiri.
4. **She enjoys dancing.**
5. **We know them.**
6. Örnek: I love swimming. I enjoy watching films. I hate getting up early.

**Mivo ile kısa alıştırma:** Mivo, oda kiraladığın evdeki öğrencidir. Hafta sonu ne yapmayı sevdiğini sorar. Başlangıçlar: *I love… · I enjoy… · I don't like… · I hate…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #8

## 9. Şu an ne yapıyorsun?

**Künye:** A1 · Ana hedef: present continuous · Yardımcı: present simple ile farkı

**Bu derste öğreneceklerin**

- **Present continuous:** am / is / are + fiil-ing
- **Kullanımı:** Şu an olanlar ve geçici durumlar
- **Present simple ile farkı:** I walk every day. ↔ I'm walking now.
- **Yazım:** making, sitting, running

**Derse giriş:** "Her gün yürürüm" ile "Şu an yürüyorum" İngilizcede iki farklı zamanla söylenir.

**Hedef:** Şu anda olanları anlatabilir ve bunları her zaman yaptığın şeylerden ayırabilirsin.

**Ana kural:** `am / is / are + fiil-ing`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| I | I'm working. | I'm not working. | Am I working? |
| he / she / it | She's working. | She isn't working. | Is she working? |
| you / we / they | They're working. | They aren't working. | Are they working? |

Yazım: make → making, sit → sitting, run → running.

**Diyalog: görüntülü arama**

**Mivo:** Hi {{name}}! What **are** you **doing**?  
**{{name}}:** I**'m sitting** in a café. It**'s raining** outside.  
**Mivo:** Oh no! **Are** you **working**?  
**{{name}}:** No, I**'m reading** a book. What about you?  
**Mivo:** I**'m cooking** dinner. I usually **cook** on Fridays.

**Fark et:** Şu an olan her şey **am/is/are + -ing** ile söyleniyor: I'm sitting, it's raining. Ama Mivo'nun her cuma yaptığı şey farklı: I usually **cook**.

**Ne zaman kullanılır?**
- **Şu an olanlar:** Look! It's snowing. · She's talking on the phone.
- **Bu günlerde süren geçici durumlar:** I'm staying with my aunt this week. · He's studying for an exam.

**Şimdi mi, her zaman mı?** Rutin ve genel gerçek → present simple: I **walk** to work. Şu an ve geçici durum → present continuous: Today I**'m taking** the bus.

**Ana dilinle fark**
- **Türkçe:** "-iyor" eki hem şu an hem de alışkanlık için kullanılır ("Her gün yürüyorum"). İngilizcede alışkanlık için present simple gerekir: I **walk** every day (I'm walking every day değil).
- **İspanyolca:** "¿Qué haces?" şu an için de sorulur. İngilizcede şu an için -ing gerekir: What **are you doing**? ("What do you do?" mesleğini sorar.)
- **Portekizce:** "O que você faz?" şu an için de sorulabilir. İngilizcede şu an için -ing gerekir: What **are you doing**? ("What do you do?" mesleğini sorar.)
- **Almanca:** Ayrı bir -ing biçimi yoktur: "Ich koche gerade". İngilizcede şu an için I**'m cooking** now denir (I cook now değil).

**Sık hatalar**
- ✗ I am go now. → ✓ I am **going** now. *(genel)* **Neden karışır:** am tek başına yeterli sanılır. **Hatırla:** am/is/are + fiil-ing, ikisi birlikte.
- ✗ She is working there every day. (rutin) → ✓ She **works** there every day. *(genel; Türkçe ana dilliler için özellikle sık)* **Hatırla:** every day, usually, always → present simple.
- ✗ What do you do now? → ✓ What **are you doing** now? *(ana dile özel: İspanyolca, Portekizce, Almanca)* **Neden karışır:** Ana dilde tek zaman iki anlamı da taşır. **Hatırla:** now → -ing.

**Alıştırma**
1. **Fark et:** "I usually cook on Fridays." Neden -ing yok?
2. **Seç:** Listen! The baby (cries / is crying).
3. **Tamamla:** ___ they waiting for the bus?
4. **Düzelt:** I am eat lunch.
5. **Kur:** reading / she / is / a book
6. **Sesli üret:** Şu an ne yaptığını ve normal bir günde ne yaptığını söyle.

**Yanıt ve geri bildirim**
1. **Rutin.** usually → present simple.
2. **is crying.** Listen! şu an olanı gösterir.
3. **Are.**
4. **I am eating lunch.**
5. **She is reading a book.**
6. Örnek: Now I'm sitting at home. I usually work in the afternoon.

**Mivo ile kısa alıştırma:** Mivo seni görüntülü arar. Şu an nerede olduğunu, ne yaptığını ve etrafta neler olduğunu sorar. Başlangıçlar: *I'm… -ing · It's… -ing · People are… -ing*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #9

## 10. Yapabildiklerin ve ricaların

**Künye:** A1 · Ana hedef: can / can't (yetenek), Can I…? / Could you…? (izin ve rica) · Yardımcı: —

**Bu derste öğreneceklerin**

- **can / can't:** Yetenek bildirme
- **Can I…?:** İzin isteme
- **Can you…? / Could you…?:** Rica etme ve aralarındaki kibarlık farkı
- **Kural:** can'den sonra yalın fiil, to yok

**Derse giriş:** Aynı küçük kelime hem "yüzebilirim" hem de "Bir şey alabilir miyim?" anlamında kullanılır.

**Hedef:** Neler yapabildiğini söyleyebilir, kibarca izin ve yardım isteyebilirsin.

**Ana kural:** `özne + can / can't + yalın fiil` · `Can I + fiil…?` · `Can / Could you + fiil…?`

| Ne için | Kalıp | Örnek |
|---|---|---|
| Yetenek | can / can't + fiil | I can swim. She can't drive. |
| İzin istemek | Can I…? | Can I sit here? |
| Rica etmek | Can you…? / Could you…? (daha kibar) | Could you help me, please? |

can kişiye göre değişmez: I can, she can (cans değil).

**Diyalog: fast-food kasası**

**Mivo:** Hi! What **can** I get you?  
**{{name}}:** **Can** I have a burger, please?  
**Mivo:** Sure. Anything else?  
**{{name}}:** I **can't** eat cheese. **Could** you take it out, please?  
**Mivo:** Of course. **Can** I have your name for the order?  
**{{name}}:** It's {{name}}.

**Fark et:** can'den sonra fiil yalın: can **have**, can't **eat**. Rica ederken **Can I…?** ve daha kibar **Could you…?** kullanılıyor.

**Ne zaman kullanılır?**
- **Yeteneklerini anlatırken:** I can play the guitar. · My brother can't cook.
- **Bir şey isterken ya da rica ederken:** Can I have some water? · Could you open the window, please?

**Sık hatalar**
- ✗ He can sings. → ✓ He can **sing**. *(genel)* **Neden karışır:** he ile fiile -s eklenir sanılır. **Hatırla:** can'den sonra fiil hep yalın.
- ✗ Could you to help me? → ✓ Could you **help** me? *(genel)* **Hatırla:** can/could'dan sonra to gelmez.
- ✗ Give me a coffee. (kasada) → ✓ **Can I have** a coffee, please? *(genel)* **Neden karışır:** Emir cümlesi doğrudan çeviriyle kurulur. **Hatırla:** Bir şey isterken Can I have…, please?

**Alıştırma**
1. **Fark et:** "I can't eat cheese." Fiil hangi biçimde?
2. **Seç:** She can (cook / cooks) very well.
3. **Tamamla:** ___ I sit here?
4. **Düzelt:** They can't to come today.
5. **Kur:** you / could / the door / open / please
6. **Sesli üret:** Yapabildiğin bir şeyi söyle ve birinden kibarca yardım iste.

**Yanıt ve geri bildirim**
1. **Yalın (eat).**
2. **cook.**
3. **Can.**
4. **They can't come today.**
5. **Could you open the door, please?**
6. Örnek: I can speak a little English. Could you help me with my bag, please?

**Mivo ile kısa alıştırma:** Mivo fast-food kasiyeridir. Sen sipariş verirsin, yiyemediğin bir şeyi söylersin ve bir rica eklersin. Başlangıçlar: *Can I have…? · I can't eat… · Could you…, please?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #10

## 11. Alışveriş ve yemek

**Künye:** A1 · Ana hedef: sayılabilen ve sayılamayan isimler, some / any, how much / how many · Yardımcı: —

**Bu derste öğreneceklerin**

- **Sayılabilen ve sayılamayan isimler:** eggs ↔ milk, bread, water
- **some / any:** Olumlu cümlede some, soru ve olumsuzda any
- **how much / how many:** Miktar sorma

**Derse giriş:** "Üç elma" denir ama "üç süt" denmez. İngilizce bu farkı her soruda gösterir.

**Hedef:** Markette ve restoranda ne istediğini ve ne kadar istediğini söyleyebilirsin.

**Ana kural:**

| | Sayılabilen (egg, apple) | Sayılamayan (milk, bread, water) |
|---|---|---|
| Tekil | an egg | — (a bottle of milk) |
| Çoğul | eggs | — |
| Ne kadar? | how many eggs? | how much milk? |
| Olumlu | some eggs | some milk |
| Soru / olumsuz | any eggs | any milk |

Rica ederken soruda da some kullanılır: Would you like **some** tea? · Can I have **some** water?

**Diyalog: süpermarket**

**{{name}}:** Excuse me. Do you have **any** eggs?  
**Mivo:** Yes. **How many** do you need?  
**{{name}}:** Six, please. And I need **some** milk.  
**Mivo:** **How much** milk?  
**{{name}}:** One bottle. Oh, and is there **any** bread?  
**Mivo:** Sorry, there isn't **any** bread today.

**Fark et:** Sayılabilen eggs için **how many**, sayılamayan milk için **how much**. Olumlu cümlede **some**, soru ve olumsuzda **any**.

**Ne zaman kullanılır?**
- **Miktar sorarken:** How many apples do you want? · How much sugar do we need?
- **Ne olduğunu ya da olmadığını söylerken:** There's some cheese. · We don't have any eggs.

**Sık hatalar**
- ✗ How many water? → ✓ How **much** water? *(genel)* **Neden karışır:** Su da "çok" olabilir diye düşünülür. **Hatırla:** Sayamıyorsan much.
- ✗ I need a bread. → ✓ I need **some** bread. / I need **a loaf of** bread. *(genel)* **Neden karışır:** Birçok dilde ekmek sayılabilir. **Hatırla:** bread, water, milk, money sayılamaz.
- ✗ I'd like some informations. → ✓ some **information**. *(genel)* **Hatırla:** information, advice, furniture çoğul olmaz.

**Alıştırma**
1. **Fark et:** "How much milk?" Neden many değil?
2. **Seç:** How (much / many) apples?
3. **Tamamla:** There isn't ___ cheese in the fridge.
4. **Düzelt:** How many sugar do you want?
5. **Kur:** like / I'd / some / water
6. **Sesli üret:** Markette üç ürün iste ve miktarlarını söyle.

**Yanıt ve geri bildirim**
1. **Milk sayılamaz.**
2. **many.** Apples sayılabilir ve çoğul.
3. **any.** Olumsuz cümle.
4. **How much sugar do you want?**
5. **I'd like some water.**
6. Örnek: I need six eggs, some milk and two apples. Sayılamayanlarda some veya a bottle of.

**Mivo ile kısa alıştırma:** Mivo market görevlisidir. Alışveriş listeni tamamlarsın: ürün sorarsın, miktar söylersin, olmayan bir ürünü sorarsın. Başlangıçlar: *Do you have any…? · I need some… · How much is…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #11

## 12. Neredeydin, nasıldı?

**Künye:** A1 · Ana hedef: was / were · Yardımcı: —

**Bu derste öğreneceklerin**

- **was / were:** am, is ve are'in geçmiş zaman biçimleri
- **Olumsuz ve soru:** wasn't, weren't · Was it…? Were you…?
- **Kullanımı:** Geçmişte nerede olduğunu ve bir şeyin nasıl olduğunu anlatma

**Derse giriş:** am, is ve are'in geçmişte yalnızca iki biçimi kalır.

**Hedef:** Geçmişte nerede olduğunu ve bir şeyin nasıl olduğunu anlatabilirsin.

**Ana kural:** `I / he / she / it + was` · `you / we / they + were`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| I / he / she / it | It was great. | It wasn't long. | Was it good? |
| you / we / they | They were nice. | They weren't late. | Were you tired? |

**Diyalog: havalimanında karşılama**

**Mivo:** Welcome back, {{name}}! How **was** your holiday?  
**{{name}}:** It **was** great! The hotel **was** beautiful.  
**Mivo:** **Was** the weather good?  
**{{name}}:** Yes, it **was** sunny every day. And the people **were** very friendly.  
**Mivo:** **Were** you tired after the flight?  
**{{name}}:** A little. The flight **wasn't** long.

**Fark et:** is ve am → **was**, are → **were**. Soruda yine öne geçiyorlar: **Was** the weather…? **Were** you…?

**Ne zaman kullanılır?**
- **Geçmişte nerede olduğunu söylerken:** I was at home yesterday. · We were in Rome last year.
- **Bir şeyin nasıl olduğunu anlatırken:** The film was boring. · The shops were busy.

**Sık hatalar**
- ✗ They was late. → ✓ They **were** late. *(genel)* **Hatırla:** you / we / they → were.
- ✗ Did you were happy? → ✓ **Were** you happy? *(genel)* **Neden karışır:** Geçmiş zaman sorusu did ile yapılır sanılır. **Hatırla:** was/were ile did kullanılmaz.

**Alıştırma**
1. **Fark et:** "The people were very friendly." Neden were?
2. **Seç:** I (was / were) at school yesterday.
3. **Tamamla:** ___ she at home last night?
4. **Düzelt:** We was hungry.
5. **Kur:** yesterday / where / you / were
6. **Sesli üret:** Geçen hafta sonu nerede olduğunu ve nasıl geçtiğini anlat.

**Yanıt ve geri bildirim**
1. **People çoğul.**
2. **was.**
3. **Was.**
4. **We were hungry.**
5. **Where were you yesterday?**
6. Örnek: I was at my friend's house. It was fun. The food was great.

**Mivo ile kısa alıştırma:** Mivo seni tatilden dönüşte havalimanında karşılayan arkadaşındır. Tatilin, otel ve hava nasıldı diye sorar. Başlangıçlar: *It was… · The hotel was… · The people were…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #12

## 13. Dün ne yaptın?

**Künye:** A1 · Ana hedef: past simple (düzenli ve düzensiz fiiller), did ile soru ve olumsuz · Yardımcı: ago, last, yesterday

**Bu derste öğreneceklerin**

- **Past simple:** Geçmişte bitmiş eylemler
- **Düzenli fiiller:** -ed eki (visited, cooked)
- **Düzensiz fiiller:** go → went, have → had, see → saw…
- **did / didn't:** Soru ve olumsuz cümle
- **Zaman ifadeleri:** yesterday, last week, two days ago

**Derse giriş:** "Dün gittim" derken İngilizcede "go" tamamen başka bir kelimeye dönüşür.

**Hedef:** Geçmişte yaptığın şeyleri anlatabilir ve başkasına sorabilirsin.

**Ana kural:** `özne + fiil-ed / düzensiz fiil` · soru ve olumsuzda `did / didn't + yalın fiil`

| Olumlu | Olumsuz | Soru |
|---|---|---|
| I worked. | I didn't work. | Did you work? |
| She went. | She didn't go. | Did she go? |

Sık düzensiz fiiller: go → went, have → had, see → saw, buy → bought, eat → ate, make → made, take → took, get → got, come → came.

**Diyalog: Pazartesi kahve molası**

**Mivo:** Morning, {{name}}! What **did** you **do** at the weekend?  
**{{name}}:** I **visited** my parents and we **cooked** dinner together.  
**Mivo:** Nice! **Did** you **go** out?  
**{{name}}:** Yes, we **went** to the cinema on Sunday. What about you?  
**Mivo:** I **didn't do** much. I **stayed** at home and **watched** TV.

**Fark et:** Çoğu fiil **-ed** alıyor: visit**ed**, cook**ed**. Bazıları tamamen değişiyor: go → **went**. Soru ve olumsuzda **did / didn't** geliyor, fiil yalın kalıyor: Did you **go**?

**Ne zaman kullanılır?**
- **Geçmişte bitmiş bir olayı anlatırken:** We watched a film last night. · She called me two hours ago.
- **Bir olayı adım adım anlatırken:** I got up, had breakfast and left.

**Sık hatalar**
- ✗ Did you went? → ✓ Did you **go**? *(genel)* **Neden karışır:** Geçmiş anlamı fiilde de gösterilir sanılır. **Hatırla:** did varsa fiil yalın.
- ✗ I goed home. → ✓ I **went** home. *(genel)* **Hatırla:** Sık düzensiz fiilleri ezberle.
- ✗ I didn't saw him. → ✓ I didn't **see** him. *(genel)* **Hatırla:** didn't + yalın fiil.

**Alıştırma**
1. **Fark et:** "Did you go out?" Neden went değil?
2. **Seç:** She (buyed / bought) some bread.
3. **Tamamla:** ___ you see Sam yesterday?
4. **Düzelt:** He didn't called me.
5. **Kur:** last night / a film / watched / we
6. **Sesli üret:** Dün yaptığın üç şeyi sırayla anlat.

**Yanıt ve geri bildirim**
1. **did zaten geçmişi gösteriyor**, fiil yalın kalır.
2. **bought.** buy düzensiz.
3. **Did.**
4. **He didn't call me.**
5. **We watched a film last night.**
6. Örnek: Yesterday I got up at 8. I went to work. In the evening I cooked pasta.

**Mivo ile kısa alıştırma:** Mivo iş arkadaşındır, Pazartesi sabahı kahve makinesinin başındasınız. Hafta sonu ne yaptığını sorar; sen de ona sorarsın. Başlangıçlar: *I went… · I visited… · I didn't… · Did you…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #13

---

# Başlangıç · A2

## 14. Planların

**Künye:** A2 · Ana hedef: be going to, gelecek için present continuous · Yardımcı: —

**Bu derste öğreneceklerin**

- **be going to:** Önceden karar verilmiş planlar
- **Gelecek için present continuous:** Gün ve saati belli randevular
- **Kanıta dayalı tahmin:** It's going to rain.

**Derse giriş:** Gelecek için İngilizcede tek bir zaman yok. Bir niyet ile takvime yazılmış bir randevu farklı söylenir.

**Hedef:** Gelecek planlarını ve kesinleşmiş randevularını anlatabilirsin.

**Ana kural:** `am / is / are + going to + yalın fiil` · `am / is / are + fiil-ing + gelecek zaman ifadesi`

| Ne için | Kalıp | Örnek |
|---|---|---|
| Niyet, plan | going to | I'm going to learn Spanish. |
| Kesinleşmiş randevu | present continuous + zaman | I'm seeing the dentist on Monday. |
| Kanıta dayalı tahmin | going to | Look at the clouds. It's going to rain. |

**Diyalog: tren istasyonu**

**Mivo:** Hello! Where are you travelling to?  
**{{name}}:** I**'m going to visit** my cousin in Oxford.  
**Mivo:** When **are** you **leaving**?  
**{{name}}:** I**'m leaving** tomorrow at nine. We**'re meeting** at the station.  
**Mivo:** **Are** you **going to stay** long?  
**{{name}}:** Just two days.

**Fark et:** Bir niyet için **going to**: I'm going to visit. Saati belli bir randevu için **-ing**: I'm leaving tomorrow at nine.

**Ne zaman kullanılır?**
- **Kararını verdiğin planlar:** We're going to paint the kitchen. · She's going to buy a car.
- **Gün ve saati belli randevular:** I'm meeting Sam at six. · They're flying to Rome on Friday.

**Sık hatalar**
- ✗ I going to travel. → ✓ I**'m going to** travel. *(genel)* **Hatırla:** going to'dan önce am/is/are şart.
- ✗ We meet tomorrow at six. (randevu) → ✓ We**'re meeting** tomorrow at six. *(genel)* **Neden karışır:** Simple da gelecek anlamı taşır sanılır. **Hatırla:** Kişisel randevu → -ing.

**Alıştırma**
1. **Fark et:** "I'm leaving tomorrow at nine." Bu cümle şu anı mı, geleceği mi anlatıyor?
2. **Seç:** She (is going to / going to) study medicine.
3. **Tamamla:** We ___ (have) dinner with Maya on Friday. (randevu)
4. **Düzelt:** He going to cook tonight.
5. **Kur:** are / tonight / leaving / we
6. **Sesli üret:** Bu hafta sonu için bir planını ve bir randevunu anlat.

**Yanıt ve geri bildirim**
1. **Geleceği.** tomorrow at nine gelecek zaman ifadesi.
2. **is going to.**
3. **are having.** Kesinleşmiş bir akşam yemeği.
4. **He is going to cook tonight.**
5. **We are leaving tonight.**
6. Örnek: I'm going to clean my room. On Sunday I'm meeting my friend at 3.

**Mivo ile kısa alıştırma:** Mivo tren gişesindeki görevlidir. Nereye gideceğini, ne yapacağını ve ne zaman yola çıkacağını sorar. Başlangıçlar: *I'm going to… · I'm leaving at… · I'm meeting…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #14

## 15. Karar ve söz

**Künye:** A2 · Ana hedef: will (anlık karar, teklif, söz, tahmin) · Yardımcı: will ve going to farkı

**Bu derste öğreneceklerin**

- **will / won't:** Anlık karar, teklif, söz ve tahmin
- **Kısaltmalar:** I'll, she'll, won't
- **will ve going to farkı:** O an verilen karar ↔ önceden verilmiş karar

**Derse giriş:** "Ben alırım!" derken önceden bir plan yok. Bu yüzden İngilizcede going to değil, başka bir kelime kullanılır.

**Hedef:** Konuşma anında karar verebilir, yardım teklif edebilir, söz verebilir ve tahminde bulunabilirsin.

**Ana kural:** `will + yalın fiil` · olumsuz `won't + yalın fiil`

will kişiye göre değişmez: I will, she will. Kısaltma: I'll, she'll, won't.

| Ne için | Örnek |
|---|---|
| Anlık karar | I'll have the soup. |
| Teklif | I'll carry your bag. |
| Söz | I won't forget. |
| Fikre dayalı tahmin | I think it will be fun. |

**will mi, going to mu?** Önceden verilmiş karar → going to: I'm going to fly to Rome (bileti aldım). O an verilen karar → will: The phone is ringing. I'll answer it.

**Diyalog: havalimanı check-in**

**Mivo:** Would you like a window seat or an aisle seat?  
**{{name}}:** Hmm… I**'ll take** the window seat, please.  
**Mivo:** Your bag is a little heavy.  
**{{name}}:** Oh, I**'ll take** this book out.  
**Mivo:** Thanks. Don't worry, the flight **will be** on time.  
**{{name}}:** Great. I **won't be** late for my meeting!

**Fark et:** Kararlar o anda veriliyor: I**'ll** take. Plan değil, tepki. Tahminde de **will** var: the flight **will be** on time.

**Ne zaman kullanılır?**
- **O anda karar verirken ya da teklif ederken:** I'll call you back. · I'll help you with that.
- **Söz verirken ve tahmin ederken:** I promise I'll be careful. · I think she'll love it.

**Sık hatalar**
- ✗ I'll to call you. → ✓ I'll **call** you. *(genel)* **Hatırla:** will'den sonra to yok.
- ✗ She wills come. → ✓ She **will** come. *(genel)* **Hatırla:** will hiç değişmez.
- ✗ I'm going to answer it! (telefon çalarken, anlık) → ✓ I**'ll** answer it! *(genel)* **Neden karışır:** İki yapı da gelecek gibi görünür. **Hatırla:** O anda karar → will.

**Alıştırma**
1. **Fark et:** "I'll take the window seat." Bu bir plan mı, anlık karar mı?
2. **Seç:** The door is open. — I (will / am going to) close it. (o an fark ettin)
3. **Tamamla:** I promise I ___ (not / tell) anyone.
4. **Düzelt:** He will helps you.
5. **Kur:** think / it / will / I / rain
6. **Sesli üret:** Bir teklif, bir söz ve bir tahmin söyle.

**Yanıt ve geri bildirim**
1. **Anlık karar.**
2. **will.**
3. **won't tell.**
4. **He will help you.**
5. **I think it will rain.**
6. Örnek: I'll help you. I won't be late. I think it will be sunny tomorrow.

**Mivo ile kısa alıştırma:** Mivo check-in görevlisidir. Seçenekler sunar ve sen o anda karar verirsin, bir teklifte bulunursun ve uçuş hakkında bir tahmin sorarsın. Başlangıçlar: *I'll take… · I'll… · Will it…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #15

## 16. Karşılaştır

**Künye:** A2 · Ana hedef: comparative, superlative, as … as · Yardımcı: —

**Bu derste öğreneceklerin**

- **Comparative:** cheaper than, more comfortable than
- **Superlative:** the cheapest, the most comfortable
- **Düzensiz biçimler:** good → better → the best, bad → worse → the worst
- **as … as:** Eşitlik bildirme

**Derse giriş:** "Daha ucuz" için İngilizcede bazen kelimenin sonuna iki harf eklenir, bazen önüne bir kelime gelir. Hangisinin ne zaman olduğunu kelimenin uzunluğu belirler.

**Hedef:** İki şeyi karşılaştırabilir ve bir gruptaki en iyi seçeneği söyleyebilirsin.

**Ana kural:**

| Sıfat | Karşılaştırma | En üstün |
|---|---|---|
| Kısa: cheap | cheaper than | the cheapest |
| -y ile biten: easy | easier than | the easiest |
| Uzun: comfortable | more comfortable than | the most comfortable |
| Düzensiz: good / bad / far | better / worse / further | the best / the worst / the furthest |

Eşitlik: `as + sıfat + as` → It's as fast as the train. · It isn't as cheap as I thought.

**Diyalog: giyim mağazası**

**{{name}}:** This jacket is **cheaper than** that one.  
**Mivo:** Yes, but that one is **warmer**. And it's **more comfortable**.  
**{{name}}:** Hmm. Is the black one **as warm as** the blue one?  
**Mivo:** Almost. But the blue one is **the best** jacket in the shop.  
**{{name}}:** OK, I'll take **the cheapest** one!

**Fark et:** Kısa sıfatlar **-er / the -est** alıyor: cheap**er**, the cheap**est**. Uzun sıfatlar **more / the most** alıyor: **more** comfortable. Eşitlik için **as … as**.

**Ne zaman kullanılır?**
- **İki şeyi karşılaştırırken:** My new flat is bigger than my old flat. · Trains are more expensive than buses.
- **Bir gruptaki en uç olanı söylerken:** It's the best café in town. · This is the most beautiful beach I know.

**Sık hatalar**
- ✗ more cheaper → ✓ **cheaper** *(genel)* **Neden karışır:** "Daha" anlamı iki kez verilir. **Hatırla:** -er ya da more, ikisi birden değil.
- ✗ as tall than → ✓ as tall **as** *(genel)* **Hatırla:** as … as, than … değil.
- ✗ the most tallest → ✓ **the tallest** *(genel)*

**Alıştırma**
1. **Fark et:** "more comfortable" neden comfortabler değil?
2. **Seç:** This book is (interestinger / more interesting) than that one.
3. **Tamamla:** It's ___ (good) restaurant in the city.
4. **Düzelt:** My sister is more older than me.
5. **Kur:** as / the bus / fast / is / as / the train
6. **Sesli üret:** İki şehri ya da iki telefonu üç özellikle karşılaştır.

**Yanıt ve geri bildirim**
1. **Uzun sıfat.** Uzun sıfatlarda more kullanılır.
2. **more interesting.**
3. **the best.**
4. **My sister is older than me.**
5. **The bus is as fast as the train.**
6. Örnek: London is bigger than Oxford. Oxford is quieter. London is the most expensive.

**Mivo ile kısa alıştırma:** Mivo bir mağazadaki satış danışmanıdır. İki ürünü gösterir; sen fiyat, kalite ve rahatlık açısından karşılaştırıp birini seçersin. Başlangıçlar: *This one is…-er than… · It's more… · It's the best…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #16

## 17. Kural ve tavsiye

**Künye:** A2 · Ana hedef: should, must, have to · Yardımcı: **mustn't (yasak) ≠ don't have to (zorunlu değil)**

**Bu derste öğreneceklerin**

- **should:** Tavsiye
- **must / have to:** Zorunluluk
- **mustn't:** Yasak
- **don't have to:** Zorunlu değil; mustn't ile farkı bu dersin en önemli noktası

**Derse giriş:** "You mustn't come" ile "You don't have to come" aynı şey değil. Biri yasak, öteki serbestlik.

**Hedef:** Tavsiye verebilir, kuralları anlatabilir ve yasak ile zorunlu olmayan şeyi ayırt edebilirsin.

**Ana kural:** `should / must / mustn't + yalın fiil` · `have to / don't have to + yalın fiil`

| Anlam | Kalıp | Örnek |
|---|---|---|
| Tavsiye | should / shouldn't | You should sleep more. |
| Zorunluluk | must / have to | I have to work on Saturday. |
| Yasak | mustn't | You mustn't smoke here. |
| Zorunlu değil, istersen | don't have to | You don't have to pay. It's free. |

must ve have to çoğu zaman aynı anlamdadır. Kurallar ve dışarıdan gelen zorunluluklar için have to daha sık; konuşanın kendi fikri için must kullanılır.

**Diyalog: doktor muayenesi**

**Mivo:** You have a bad cold. You **should** rest for two days.  
**{{name}}:** Do I **have to** stay at home?  
**Mivo:** Yes, you **have to** stay at home tomorrow. But you **don't have to** stay in bed.  
**{{name}}:** Can I go to the gym?  
**Mivo:** No, you **mustn't** do sport this week. And you **should** drink a lot of water.

**Fark et:** Tavsiye için **should**. Zorunluluk için **have to**. "Gerek yok" için **don't have to**. Yasak için **mustn't**.

**Ne zaman kullanılır?**
- **Tavsiye verirken:** You should see a doctor. · You shouldn't drink coffee at night.
- **Kuralları anlatırken:** You have to wear a seatbelt. · You mustn't park here. · You don't have to bring food.

**Ana dilinle fark**
- **Türkçe:** "Gelmek zorunda değilsin" ile "gelmemelisin" kolay karışır. İngilizcede biri serbestlik, öteki yasaktır: You **don't have to** come ≠ You **mustn't** come.
- **İspanyolca:** "No tienes que venir" = **don't have to** (gerek yok). "No debes venir" = **mustn't** (yasak).
- **Portekizce:** "Você não precisa vir" = **don't have to** (gerek yok). "Você não pode vir" = **mustn't** (yasak).
- **Almanca:** "Du musst nicht kommen" = **don't have to** (gerek yok). "Du darfst nicht kommen" = **mustn't** (yasak). "musst nicht" mustn't anlamına gelmez.

**Sık hatalar**
- ✗ You mustn't come. (gerek yok demek isterken) → ✓ You **don't have to** come. *(genel; Almanca ana dilliler için özellikle sık)* **Hatırla:** mustn't = yasak, don't have to = serbest.
- ✗ She should to rest. → ✓ She should **rest**. *(genel)* **Hatırla:** should ve must'tan sonra to yok.
- ✗ He have to work. → ✓ He **has to** work. *(genel)* **Hatırla:** he / she / it → has to.
- ✗ You don't have to smoke here. (yasak demek isterken) → ✓ You **mustn't** smoke here. *(ana dile özel: Türkçe)* **Neden karışır:** "İçmemelisin" ile "içmek zorunda değilsin" birbirine yakın duyulur. **Hatırla:** Yasak → mustn't.
- ✗ You haven't to pay. → ✓ You **don't have to** pay. *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** "No tienes que pagar" / "Não tem que pagar" birebir çevrilir. **Hatırla:** have to'nun olumsuzu don't have to.

**Alıştırma**
1. **Fark et:** "You don't have to stay in bed." Yatakta kalmak yasak mı, serbest mi?
2. **Seç:** It's a free museum. You (mustn't / don't have to) pay.
3. **Tamamla:** You ___ use your phone in the exam. It's not allowed.
4. **Düzelt:** He has to wears a uniform.
5. **Kur:** should / more / you / sleep
6. **Sesli üret:** Evine gelecek bir misafire bir tavsiye, bir kural ve "gerek yok" dediğin bir şey söyle.

**Yanıt ve geri bildirim**
1. **Serbest.** İstersen kalabilirsin, ama gerek yok.
2. **don't have to.** Ücretsiz, ödemek gerekmiyor.
3. **mustn't.** Yasak.
4. **He has to wear a uniform.**
5. **You should sleep more.**
6. Örnek: You should try the café downstairs. You mustn't smoke inside. You don't have to bring anything.

**Mivo ile kısa alıştırma:** Mivo doktordur. Tavsiyelerini ve kurallarını söyler; sen onları kendi cümlelerinle tekrar eder, yasak ile gerekmeyeni ayırırsın. Başlangıçlar: *I should… · I have to… · I mustn't… · I don't have to…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #17

## 18. Hiç … yaptın mı?

**Künye:** A2 · Ana hedef: present perfect (ever / never, just / already / yet) · Yardımcı: —

**Bu derste öğreneceklerin**

- **Present perfect:** have / has + fiilin 3. hâli (V3)
- **ever / never:** Hayat deneyimleri
- **just / already / yet:** Az önce, çoktan, henüz
- **Past simple ile farkı:** Zaman söylenirse past simple kullanılır

**Derse giriş:** "Roma'ya gittin mi?" sorusu İngilizcede iki farklı şekilde sorulur. Hangisinin kullanılacağını, ne zaman gittiğini söyleyip söylemediğin belirler.

**Hedef:** Hayatındaki deneyimleri ve yeni olmuş şeyleri, ne zaman olduklarını söylemeden anlatabilirsin.

**Ana kural:** `have / has + fiilin 3. hâli (V3)`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| I / you / we / they | I've seen it. | I haven't seen it. | Have you seen it? |
| he / she / it | She's seen it. | She hasn't seen it. | Has she seen it? |

Düzenli fiillerde V3 = -ed (visited). Düzensizlerde öğrenilir: be → been, go → gone/been, see → seen, eat → eaten, buy → bought.

| Kelime | Anlam | Yeri | Örnek |
|---|---|---|---|
| ever | hiç (soruda) | have'den sonra | Have you ever tried sushi? |
| never | hiç (olumsuz anlam) | have'den sonra | I've never seen snow. |
| just | az önce | have'den sonra | She's just left. |
| already | çoktan, beklenenden önce | have'den sonra | I've already eaten. |
| yet | henüz (soru, olumsuz) | cümlenin sonunda | Have you finished yet? |

**Diyalog: şehir turu**

**Mivo:** **Have** you **ever been** to Istanbul before?  
**{{name}}:** No, I **haven't**. It's my first time!  
**Mivo:** **Have** you **tried** Turkish tea **yet**?  
**{{name}}:** Yes, I**'ve** **already had** three cups today!  
**Mivo:** Great! And I**'ve just bought** tickets for the boat tour.

**Fark et:** Zamanı söylenmeyen deneyimler **have / has + fiilin 3. hâli** ile anlatılıyor: have been, have tried, 've bought.

**Ne zaman kullanılır?**
- **Hayat deneyimleri (ne zaman olduğu önemli değil):** I've been to Paris twice. · She's never driven a car.
- **Az önce olmuş ya da bugünü etkileyen şeyler:** I've lost my keys. · We've just arrived.

**Ne zaman kullanılmaz?** Ne zaman olduğu söylenirse past simple gelir: I **went** to Paris **last year** (I have been to Paris last year değil).

**Ana dilinle fark**
- **Türkçe:** "Gittim" hem "I went" hem "I've been" olabilir. Zaman söylenmişse past simple: I **saw** him yesterday (I have seen him yesterday değil).
- **İspanyolca:** İspanya'da "he estado" yapısı bazen yakın geçmiş zamanla da kullanılır ("Hoy he comido"); Latin Amerika'da ise çoğu zaman basit geçmiş kullanılır ("¿Fuiste alguna vez a Roma?"). İngilizcede deneyim sorusu her zaman: Have you **ever been** to Rome?
- **Portekizce:** "Você já foi a Roma?" basit geçmişle sorulur. İngilizcede: Have you **ever been** to Rome? "Tenho ido" yakın zamanda tekrarlanan bir eylem anlamı taşır, present perfect'in karşılığı değildir.
- **Almanca:** Perfekt, belirli geçmiş zamanla da kullanılır ("Ich habe ihn gestern gesehen"). İngilizcede belirli zamanla present perfect kullanılmaz: I **saw** him yesterday.

**Sık hatalar**
- ✗ I have seen him yesterday. → ✓ I **saw** him yesterday. *(genel; Almanca ana dilliler için özellikle sık)* **Neden karışır:** İki yapı da geçmişi anlatır. **Hatırla:** yesterday, last week, in 2020 → past simple.
- ✗ She have finished. → ✓ She **has** finished. *(genel)* **Hatırla:** he / she / it → has.
- ✗ I've already went. → ✓ I've already **gone**. *(genel)* **Hatırla:** have'den sonra V3.
- ✗ I went to London never. → ✓ I**'ve never been** to London. *(ana dile özel: Türkçe)* **Neden karışır:** "Londra'ya hiç gitmedim" geçmiş zamanla söylenir. **Hatırla:** Hayat deneyimi → have + never + V3.
- ✗ Did you ever go to Rome? → ✓ **Have you ever been** to Rome? *(ana dile özel: İspanyolca, Portekizce)* **Neden karışır:** "¿Fuiste alguna vez…?" / "Você já foi…?" basit geçmişle sorulur. **Hatırla:** Deneyim sorusu → Have you ever + V3?

**Alıştırma**
1. **Fark et:** "I've just bought tickets." Bilet ne zaman alındı?
2. **Seç:** I (have visited / visited) Rome in 2023.
3. **Tamamla:** Have you finished your homework ___? (just / yet)
4. **Düzelt:** We have went to that restaurant.
5. **Kur:** ever / you / have / sushi / tried
6. **Sesli üret:** Daha önce yaptığın iki şeyi ve hiç yapmadığın bir şeyi anlat.

**Yanıt ve geri bildirim**
1. **Az önce.** just = az önce.
2. **visited.** in 2023 belirli bir zaman.
3. **yet.** Soru cümlesinin sonunda.
4. **We have been to that restaurant.** (Gidip döndük.) ya da **We have gone…** (Hâlâ oradayız.) Burada doğal olan: been.
5. **Have you ever tried sushi?**
6. Örnek: I've been to the sea many times. I've tried Indian food. I've never flown on a plane.

**Mivo ile kısa alıştırma:** Mivo şehir turu rehberidir. Daha önce nereleri gördüğünü, bugün ne yaptığını ve henüz ne yapmadığını sorar. Başlangıçlar: *I've been to… · I've never… · I've already… · I haven't… yet.*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #18

## 19. O sırada ne yapıyordun?

**Künye:** A2 · Ana hedef: past continuous, when / while · Yardımcı: past simple ile birlikte kullanımı

**Bu derste öğreneceklerin**

- **Past continuous:** was / were + fiil-ing
- **Kullanımı:** Geçmişte süren bir eylem ve arka plan
- **when / while:** Süren eylem ile onu kesen olayı bağlama

**Derse giriş:** Bir hikâyede iki tür olay vardır: arka planda süren ve aniden olan. İngilizce bunları iki farklı zamanla ayırır.

**Hedef:** Geçmişte süren bir eylemi ve onu kesen olayı birlikte anlatabilirsin.

**Ana kural:** `was / were + fiil-ing`

| | Olumlu | Olumsuz | Soru |
|---|---|---|---|
| I / he / she / it | She was sleeping. | She wasn't sleeping. | Was she sleeping? |
| you / we / they | They were working. | They weren't working. | Were they working? |

**when mi, while mı?**
- `while + süren eylem`: **While** I was cooking, the phone rang.
- `when + kısa olay`: I was cooking **when** the phone rang.

**Diyalog: kayıp çanta bildirimi**

**Mivo:** When did you lose your bag?  
**{{name}}:** This morning. I **was waiting** for a taxi outside the hotel.  
**Mivo:** **Were** you **talking** on the phone?  
**{{name}}:** Yes. I **was talking** to my friend **when** a man **walked** past.  
**Mivo:** And after that?  
**{{name}}:** **When** I **looked** down, the bag **was** gone.

**Fark et:** Arka planda süren şey **was / were + -ing**: I was waiting, I was talking. Aniden olan şey past simple: a man **walked** past.

**Ne zaman kullanılır?**
- **Bir olayın arka planını anlatırken:** It was raining and people were running. · We were having dinner at eight.
- **Süren bir eylemin kesildiğini anlatırken:** I was walking home when I saw Sam. · While she was driving, her phone rang.

**Sık hatalar**
- ✗ I was cook. → ✓ I was **cooking**. *(genel)* **Hatırla:** was/were + fiil-ing.
- ✗ When I cooked, the phone rang. (süren eylem) → ✓ When I **was cooking**, the phone rang. *(genel)* **Neden karışır:** İki eylem de geçmişte. **Hatırla:** Kesilen, süren eylem → -ing.
- Daha doğal: "While I cooked, the phone rang." yanlış değildir, ama süren arka plan eylemi için **While I was cooking** çok daha doğaldır.

**Alıştırma**
1. **Fark et:** "I was talking to my friend when a man walked past." Hangi eylem süren, hangisi aniden olan?
2. **Seç:** They (slept / were sleeping) when I called.
3. **Tamamla:** ___ she was driving, it started to snow. (When / While)
4. **Düzelt:** We were watch TV at nine.
5. **Kur:** I / was / reading / when / the lights / went out
6. **Sesli üret:** Bir şey olduğunda ne yaptığını anlat: elektrik kesildiğinde, bir arkadaşın aradığında ya da yağmur başladığında.

**Yanıt ve geri bildirim**
1. **Süren: talking. Aniden: walked past.**
2. **were sleeping.**
3. **While.** Arkasından süren eylem geliyor.
4. **We were watching TV at nine.**
5. **I was reading when the lights went out.**
6. Örnek: I was cooking dinner when the lights went out. My brother was watching TV.

**Mivo ile kısa alıştırma:** Mivo otel resepsiyonistidir. Çantanı kaybettiğin anı sorar: ne yapıyordun, ne oldu, sonra ne yaptın. Başlangıçlar: *I was… -ing · when… · After that I…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #19

## 20. Nasıl, ne kadar?

**Künye:** A2 · Ana hedef: sıfat ve zarf (quick / quickly, good / well) · Yardımcı: derece: too, enough, so, such

**Bu derste öğreneceklerin**

- **Sıfat ve zarf:** quick ↔ quickly, good ↔ well
- **too:** Fazla, bir sorun var
- **enough:** Yeterli; sıfattan sonra, isimden önce
- **so / such:** Vurgu (so good, such a good day)

**Derse giriş:** "Hızlı bir cevap" ve "hızlı cevap verdi" İngilizcede aynı kelimeyle söylenmez. Fark tek bir ekte.

**Hedef:** İnsanları, şeyleri ve eylemleri tarif edebilir; bir şeyin fazla mı yeterli mi olduğunu söyleyebilirsin.

**Ana kural:** `sıfat + isim` / `be + sıfat` · `fiil + zarf`

| Sıfat | Zarf |
|---|---|
| quick | quickly |
| careful | carefully |
| easy | easily |
| good | **well** |
| fast / hard / late | fast / hard / late (aynı) |

| Derece | Kalıp | Örnek |
|---|---|---|
| Fazla (olumsuz) | too + sıfat | It's too expensive. |
| Yeterli | sıfat + enough · enough + isim | It's big enough. · We have enough chairs. |
| Çok (vurgu) | so + sıfat | The film was so funny. |
| Çok (vurgu) | such + a/an + sıfat + isim | It was such a nice day. |

**Diyalog: restoranda**

**Mivo:** How is everything?  
**{{name}}:** The soup is **too salty**, I'm afraid.  
**Mivo:** I'm sorry. I'll change it **quickly**.  
**{{name}}:** Thanks. And the pasta isn't **hot enough**.  
**Mivo:** Of course. What about the dessert?  
**{{name}}:** Oh, it was **so good**! The chef cooks really **well**.

**Fark et:** Yemeği anlatan **sıfat** (salty, good), eylemi anlatan **zarf** (quickly, well). Fazlalık **too**, yeterlilik **enough**. **enough** sıfattan **sonra** geliyor: hot enough.

**Ne zaman kullanılır?**
- **Bir eylemin nasıl yapıldığını anlatırken:** She speaks quietly. · He drives carefully.
- **Fazlalık, yeterlilik ve vurgu için:** This bag is too heavy. · I'm not old enough. · It was such a long day.

**Sık hatalar**
- ✗ She sings beautiful. → ✓ She sings **beautifully**. *(genel)* **Hatırla:** Eylemi anlatıyorsa zarf.
- ✗ enough warm → ✓ **warm enough** *(genel)* **Hatırla:** enough sıfattan sonra, isimden önce.
- ✗ It's too good! (övgü) → ✓ It's **so** good! / It's **very** good! *(genel)* **Neden karışır:** too "çok" sanılır. **Hatırla:** too = fazla, bir sorun var demektir.
- ✗ It was such beautiful. → ✓ It was **so** beautiful. / It was **such a** beautiful day. *(genel)*

**Alıştırma**
1. **Fark et:** "The chef cooks really well." Neden good değil?
2. **Seç:** Please drive (careful / carefully).
3. **Tamamla:** This box is ___ heavy. I can't carry it.
4. **Düzelt:** The room isn't enough big.
5. **Seç:** It was (so / such) a good film.
6. **Sesli üret:** Bir ürünü ya da yemeği tarif et: bir olumlu şey ve bir "too / not enough" söyle.

**Yanıt ve geri bildirim**
1. **cooks bir eylem**; good'un zarfı well.
2. **carefully.**
3. **too.** Taşıyamıyorsun, sorun var.
4. **The room isn't big enough.**
5. **such.** Arkasından a + sıfat + isim geliyor.
6. Örnek: The pizza was so good, but it was too spicy for me. The portion wasn't big enough.

**Mivo ile kısa alıştırma:** Mivo garsondur. Yemeği nasıl bulduğunu sorar; sen bir övgü, bir şikâyet ve bir rica dile getirirsin. Başlangıçlar: *It's too… · It isn't… enough · It was so…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #20

## 21. Miktarlar

**Künye:** A2 · Ana hedef: a few / a little, a lot of, too much / too many · Yardımcı: someone / anything / nobody

**Bu derste öğreneceklerin**

- **a few / a little:** Sayılabilen ve sayılamayan için "biraz"
- **a lot of, too much / too many:** Çok ve fazla
- **Belirsiz zamirler:** someone, anything, nobody, everything

**Derse giriş:** "Biraz" için İngilizcede iki kelime vardır. Hangisinin kullanılacağını, sayabilip sayamadığın belirler.

**Hedef:** Miktarları daha ayrıntılı söyleyebilir ve belirsiz kişi ya da şeylerden bahsedebilirsin.

**Ana kural:**

| | Sayılabilen (cups) | Sayılamayan (juice) |
|---|---|---|
| Biraz (yeterli) | a few | a little |
| Çok | a lot of / many | a lot of / much |
| Fazla (sorun) | too many | too much |

| | Kişi | Şey | Yer |
|---|---|---|---|
| Olumlu | someone | something | somewhere |
| Soru / olumsuz | anyone | anything | anywhere |
| Hiç | no one / nobody | nothing | nowhere |

someone, nobody, everything tekil fiil alır: Nobody **is** here. Everything **is** ready.

**Diyalog: parti alışverişi (telefonda)**

**Mivo:** Do we have everything for the party?  
**{{name}}:** We have **a lot of** snacks, but only **a few** cups.  
**Mivo:** And drinks?  
**{{name}}:** There's **a little** juice left. Maybe **someone** can bring more.  
**Mivo:** I'll ask Leo. Do we need **anything** else?  
**{{name}}:** No. We even have **too many** chairs!

**Fark et:** Sayılabilen cups → **a few**. Sayılamayan juice → **a little**. Belirsiz kişi → **someone**, soruda belirsiz şey → **anything**.

**Ne zaman kullanılır?**
- **Miktarı ayrıntılı söylerken:** We need a few plates. · There's a little milk left. · There's too much sugar in this.
- **Belirsiz kişi ve şeylerden söz ederken:** Someone is at the door. · I didn't buy anything. · Nobody knows.

**Sık hatalar**
- ✗ a few water → ✓ **a little** water *(genel)* **Hatırla:** Sayamıyorsan a little.
- ✗ Nobody are here. → ✓ Nobody **is** here. *(genel)* **Hatırla:** -body, -one, -thing → tekil fiil.
- ✗ I didn't see nobody. → ✓ I didn't see **anybody**. / I saw **nobody**. *(genel)* **Neden karışır:** Birçok dilde çift olumsuz doğaldır. **Hatırla:** İngilizcede tek olumsuz yeter.

**Alıştırma**
1. **Fark et:** "There's a little juice left." Neden a few değil?
2. **Seç:** I have (a few / a little) friends in this city.
3. **Tamamla:** Is there ___ to eat? (something / anything)
4. **Düzelt:** Someone are waiting for you.
5. **Seç:** There are (too much / too many) people here.
6. **Sesli üret:** Bir parti ya da piknik için neyin yeterli, neyin az, neyin fazla olduğunu söyle.

**Yanıt ve geri bildirim**
1. **Juice sayılamaz.**
2. **a few.**
3. **anything.** Soru cümlesi.
4. **Someone is waiting for you.**
5. **too many.** People sayılabilir.
6. Örnek: We have a lot of food, but only a few glasses. There's a little ice. We have too many chairs.

**Mivo ile kısa alıştırma:** Mivo partiyi birlikte hazırladığın arkadaşındır ve telefonda listeyi kontrol eder. Eksik ve fazla olanları söyler, kimin ne getireceğini konuşursunuz. Başlangıçlar: *We have a few… · There's a little… · Someone can… · Do we need anything…?*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #21

## 22. Eğer olursa

**Künye:** A2 · Ana hedef: zero ve first conditional · Yardımcı: unless

**Bu derste öğreneceklerin**

- **Zero conditional:** If + present, present (genel doğrular)
- **First conditional:** If + present, will + fiil (olası gelecek)
- **unless:** if … not anlamında
- **Kural:** if'ten sonra will kullanılmaz

**Derse giriş:** "Yağmur yağarsa evde kalırız" derken "if" sonrasında İngilizce gelecek zaman kullanmaz.

**Hedef:** Genel kuralları ve gerçekleşebilecek durumların sonuçlarını anlatabilirsin.

**Ana kural:**

| Tür | if kısmı | Sonuç kısmı | Örnek |
|---|---|---|---|
| Zero (her zaman doğru) | if + present | present | If you heat ice, it melts. |
| First (gerçekçi gelecek) | if + present | will + yalın fiil | If it rains, we'll stay home. |

`unless = if … not`: Unless you hurry, you'll miss the bus. = If you don't hurry, …

if kısmı sona da gelebilir; o zaman virgül gerekmez: We'll stay home if it rains.

**Diyalog: araç kiralama**

**{{name}}:** What happens **if** I **return** the car late?  
**Mivo:** **If** you **return** it late, you **pay** for an extra day.  
**{{name}}:** OK. And **if** I **have** a problem on the road?  
**Mivo:** **If** you **call** this number, someone **will help** you.  
**{{name}}:** Great. **Unless** the traffic **is** bad, I**'ll be** back by six.

**Fark et:** **if**'ten sonra hep present: if I return, if I have, if you call. Sonuç kısmında genel bir kural için present (you **pay**), gelecekteki bir sonuç için **will** (someone **will help**).

**Ne zaman kullanılır?**
- **Kuralları ve genel gerçekleri anlatırken:** If you press this button, the door opens. · If I drink coffee at night, I can't sleep.
- **Olası gelecek durumları ve sonuçlarını konuşurken:** If I finish early, I'll call you. · If you don't hurry, you'll be late.

**Sık hatalar**
- ✗ If it will rain, we'll stay home. → ✓ If it **rains**, we'll stay home. *(genel)* **Neden karışır:** Anlam gelecek olduğu için will eklenir. **Hatırla:** if'ten sonra will yok.
- ✗ Unless you don't hurry … → ✓ **Unless you hurry** … *(genel)* **Hatırla:** unless zaten olumsuz.

**Alıştırma**
1. **Fark et:** "If you call this number, someone will help you." if'ten sonra hangi zaman var?
2. **Seç:** If you heat water to 100°C, it (boils / will boil). (genel gerçek)
3. **Tamamla:** If she ___ (call), I'll answer.
4. **Düzelt:** If I will see him, I'll tell him.
5. **Kur:** unless / hurry / we / we'll / the bus / miss
6. **Sesli üret:** Hafta sonu planını hava durumuna göre iki koşulla anlat.

**Yanıt ve geri bildirim**
1. **Present (call).**
2. **boils.** Her zaman doğru → zero conditional.
3. **calls.**
4. **If I see him, I'll tell him.**
5. **Unless we hurry, we'll miss the bus.**
6. Örnek: If it's sunny, I'll go to the beach. If it rains, I'll watch a film at home.

**Mivo ile kısa alıştırma:** Mivo araç kiralama görevlisidir. Kiralama koşullarını sorarsın ve olası durumları konuşursunuz. Başlangıçlar: *What happens if…? · If I…, will…? · If…, I'll…*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #22

## 23. Hikâyeni anlat

**Künye:** A2 · Ana hedef: sıralama ve bağlama (first, then, after that, because, so, but) · Yardımcı: kısa karşılıklar (So do I / Neither do I / I think so), one / ones

**Bu derste öğreneceklerin**

- **Sıralama:** first, then, after that, finally
- **Neden ve sonuç:** because, because of, so
- **Zıtlık:** but
- **Kısa karşılıklar:** So do I. · Neither do I. · I think so.
- **one / ones:** Tekrarı önleme

**Derse giriş:** Aynı olaylar, birkaç küçük bağlantı kelimesiyle bir liste olmaktan çıkıp bir hikâyeye dönüşür.

**Hedef:** Olayları sırayla, nedenleri ve sonuçlarıyla birlikte kısa bir hikâye gibi anlatabilirsin.

**Ana kural:**

| İşlev | Kelimeler | Örnek |
|---|---|---|
| Sıra | first, then, after that, finally | First I had breakfast. Then I left. |
| Neden | because (+ cümle), because of (+ isim) | I stayed home because I was ill. |
| Sonuç | so | It was late, so we took a taxi. |
| Zıtlık | but | It was cold, but we went out. |

**Kısa karşılıklar:**

| Karşıdaki | Sen de aynısını düşünüyorsan |
|---|---|
| I like coffee. | So do I. |
| I'm tired. | So am I. |
| I don't like snow. | Neither do I. |
| Is it open today? | I think so. / I don't think so. |

**one / ones:** Tekrarı önler: I don't like the red bag. I like the blue **one**. · These shoes are old. I need new **ones**.

**Diyalog: taksi yolculuğu**

**Mivo:** Busy day?  
**{{name}}:** Yes! **First**, I missed my bus, **so** I walked to the station.  
**Mivo:** Oh no. **And then**?  
**{{name}}:** **Then** the train was late **because** of the snow. **But after that**, everything was fine.  
**Mivo:** I hate snow.  
**{{name}}:** **So do I**!

**Fark et:** Sıra: **first, then, after that**. Neden: **because**. Sonuç: **so**. Zıtlık: **but**. "Ben de" için **So do I**.

**Ne zaman kullanılır?**
- **Bir olayı baştan sona anlatırken:** First we got lost, then we found a small café, and finally we arrived.
- **Sohbette kısa ve doğal karşılık verirken:** "I love this song." "So do I!" · "Is the shop open?" "I think so."

**Sık hatalar**
- ✗ Because it was late, so we left. → ✓ **Because** it was late, we left. / It was late, **so** we left. *(genel)* **Hatırla:** because ve so aynı cümlede birlikte kullanılmaz.
- ✗ I like coffee. — Me too do. → ✓ **So do I.** / **Me too.** *(genel)*
- ✗ I want the red ones. (tek çanta) → ✓ the red **one** *(genel)* **Hatırla:** tekil → one, çoğul → ones.

**Alıştırma**
1. **Fark et:** "I missed my bus, so I walked." so neyi gösteriyor?
2. **Seç:** I was hungry, (because / so) I made a sandwich.
3. **Tamamla:** "I don't like horror films." "Neither ___ I."
4. **Düzelt:** Because I was tired so I went to bed.
5. **Seç:** These cups are dirty. Can I have clean (one / ones)?
6. **Sesli üret:** Başına gelen küçük bir aksiliği first, then, because ve so kullanarak anlat.

**Yanıt ve geri bildirim**
1. **Sonucu.**
2. **so.** Yemek yapmak açlığın sonucu.
3. **do.**
4. **Because I was tired, I went to bed.** ya da **I was tired, so I went to bed.**
5. **ones.** Cups çoğul.
6. Örnek: First, I lost my keys. Then I couldn't open the door, so I called my sister. She came because she has a key.

**Mivo ile kısa alıştırma:** Mivo sohbetçi bir taksi şoförüdür. Gününü sorar; sen olayları sırayla anlatırsın, Mivo bir şey söylediğinde kısa karşılık verirsin. Başlangıçlar: *First… · Then… · …because… · …so… · So do I.*

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #23

---

# Orta · B1

## 24. Ne zamandır?

**Künye:** B1 · Ana hedef: present perfect + for / since · Yardımcı: past simple ile farkı

**Bu derste öğreneceklerin**

- **Present perfect + for / since:** Geçmişte başlayıp hâlâ süren durumlar
- **for ↔ since:** Süre ↔ başlangıç noktası
- **How long have you…?:** Süre sorma
- **Past simple ile farkı:** Hâlâ süren ↔ bitmiş ve zamanı belli

**Derse giriş:** "Üç yıldır burada çalışıyorum" cümlesi şimdiki zamanda kurulur gibi görünür, ama İngilizcede bu cümle geçmişle bugünü birbirine bağlayan bir zaman ister.

**Hedef:** Geçmişte başlayıp hâlâ süren durumların ne zamandır devam ettiğini söyleyebilir ve bunları bitmiş olaylardan ayırabilirsin.

**Ana kural:** `have / has + V3 + for / since`

| | Ne gelir? | Örnek |
|---|---|---|
| for | Süre | for three years, for a week, for ages |
| since | Başlangıç noktası | since 2020, since Monday, since I was a child |

| Durum | Zaman | Örnek |
|---|---|---|
| Hâlâ sürüyor | present perfect | I've lived here for five years. |
| Bitti, zamanı belli | past simple | I lived in Paris in 2019. |

Soru: `How long have you + V3…?`

**Diyalog: iş görüşmesi**

**Mivo:** So, {{name}}, how long **have** you **worked** at your current company?  
**{{name}}:** I**'ve worked** there **for** three years.  
**Mivo:** And **have** you always **lived** in {{city}}?  
**{{name}}:** No. I **moved** here in 2020. Before that, I **lived** with my parents.  
**Mivo:** I see. And you**'ve been** a team leader **since** last spring?  
**{{name}}:** That's right.

**Fark et:** Hâlâ süren durumlar **have + V3**: I've worked (hâlâ çalışıyor). Bitmiş, zamanı belli olaylar past simple: I **moved** here in 2020. Süre için **for**, başlangıç noktası için **since**.

**Ne zaman kullanılır?**
- **Bir durumun ne kadar süredir devam ettiğini söylerken:** We've known each other since school. · She's had this car for ten years.
- **Bugünkü durumu geçmişteki bitmiş olaylardan ayırırken:** I've worked here since 2022. Before that, I worked in a hotel.

**Ana dilinle fark**
- **Türkçe:** "Üç yıldır burada çalışıyorum" şimdiki zamanla kurulur. İngilizcede: I**'ve worked** here **for** three years (I am working here for three years değil).
- **İspanyolca:** "Trabajo aquí desde hace tres años" şimdiki zamanla kurulur ve "desde" hem for hem since gibi görünür. İngilizcede: I**'ve worked** here **for** three years.
- **Portekizce:** "Trabalho aqui há três anos" şimdiki zamanla kurulur. İngilizcede: I**'ve worked** here **for** three years.
- **Almanca:** "Ich arbeite seit drei Jahren hier" şimdiki zamanla kurulur ve "seit" hem for hem since karşılığıdır. İngilizcede: I**'ve worked** here **for** three years (I work here since three years değil).

**Sık hatalar**
- ✗ since three years → ✓ **for** three years *(genel; Almanca ve İspanyolca ana dilliler için özellikle sık)* **Hatırla:** Süre → for, başlangıç → since.
- ✗ I work here since 2022. → ✓ I**'ve worked** here since 2022. *(genel; Almanca ana dilliler için özellikle sık)* **Neden karışır:** Durum bugün de sürdüğü için şimdiki zaman kullanılır. **Hatırla:** Geçmişte başlayıp bugüne gelen → present perfect.
- ✗ I have worked there last year. → ✓ I **worked** there last year. *(genel)* **Hatırla:** last year bitmiş bir zaman → past simple.
- ✗ I am living here for five years. → ✓ I**'ve lived** here for five years. *(ana dile özel: Türkçe)* **Neden karışır:** "Beş yıldır burada yaşıyorum" şimdiki zamanla söylenir. **Hatırla:** Geçmişten bugüne süren durum → present perfect.
- ✗ I live here since five years. → ✓ I**'ve lived** here **for** five years. *(ana dile özel: İspanyolca)* **Neden karışır:** "Vivo aquí desde hace cinco años" şimdiki zamanla ve desde ile kurulur. **Hatırla:** Süre için for, fiil present perfect.
- ✗ I work here for three years. → ✓ I**'ve worked** here for three years. *(ana dile özel: Portekizce)* **Neden karışır:** "Trabalho aqui há três anos" şimdiki zamanla kurulur. **Hatırla:** Hâlâ süren durum → have + V3.

**Alıştırma**
1. **Fark et:** "I started this job in 2022. I still work here." İki bilgiyi tek cümlede birleştir: I ___ here ___ 2022.
2. **Seç:** We have known each other ___ ten years. (for / since)
3. **Seç:** I ___ (visited / have visited) Rome in 2023.
4. **Düzelt:** She has lived here since five months.
5. **Kur:** "you / work / here" kelimeleriyle ne kadar süredir burada çalıştığını sor.
6. **Sesli üret:** Bir işin, okulun ya da hobinin ne zaman başladığını ve ne zamandır sürdüğünü anlat.

**Yanıt ve geri bildirim**
1. **I've worked here since 2022.** Başlangıç noktası → since.
2. **for.** ten years bir süre.
3. **visited.** 2023 bitmiş ve belirli bir zaman.
4. **She's lived here for five months.**
5. **How long have you worked here?**
6. Örnek: I've studied English for two years. I've played the guitar since I was 15.

**Mivo ile kısa alıştırma:** Mivo işe alım yöneticisidir. Deneyimini, ne zamandır o işte olduğunu ve daha önce ne yaptığını sorar. Destek: ekranda yalnızca ipucu kelimeler (*for · since · before that*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #24

## 25. Son zamanlarda

**Künye:** B1 · Ana hedef: present perfect continuous · Yardımcı: present perfect simple ile farkı

**Bu derste öğreneceklerin**

- **Present perfect continuous:** have / has been + fiil-ing
- **Kullanımı:** Bir süredir devam eden etkinlikler
- **Süreç ↔ sonuç:** I've been reading. ↔ I've read three chapters.

**Derse giriş:** "Bütün sabah okudum" ile "Üç bölüm okudum" farklı şeyleri öne çıkarır: biri süreci, öteki sonucu.

**Hedef:** Bir süredir devam eden etkinlikleri anlatabilir ve süreç ile sonucu ayırt edebilirsin.

**Ana kural:** `have / has been + fiil-ing`

| Ne öne çıkıyor? | Yapı | Örnek |
|---|---|---|
| Süreç, süre, etkinlik | have been + -ing | I've been reading all morning. |
| Sonuç, miktar, tamamlanma | have + V3 | I've read three chapters. |

**Diyalog: terasta tanışma**

**Mivo:** You look happy! What **have** you **been doing** lately?  
**{{name}}:** I**'ve been travelling** a lot. I**'ve been** to four countries this year.  
**Mivo:** Wow! **Have** you **been working** too?  
**{{name}}:** Yes, I**'ve been working** online. And I**'ve been learning** English **since** January.  
**Mivo:** Your English sounds great.

**Fark et:** Süren etkinlikler **have been + -ing**: I've been travelling, I've been learning. Sayılabilen sonuç ise present perfect simple: I've **been to** four countries.

**Ne zaman kullanılır?**
- **Bir süredir devam eden etkinlikler:** She's been working here since May. · We've been waiting for an hour.
- **Bugün görünen sonucu olan yakın geçmiş etkinlikler:** Your eyes are red. Have you been crying? · I'm tired because I've been running.

**Ana dilinle fark**
- **Türkçe:** "İki yıldır İngilizce öğreniyorum" şimdiki zamanla kurulur. İngilizcede: I**'ve been learning** English **for** two years.
- **İspanyolca:** "Llevo dos años estudiando inglés" benzer bir anlam verir ama yapı farklıdır. İngilizcede: I**'ve been studying** English **for** two years.
- **Portekizce:** "Estou estudando inglês há dois anos" (Brezilya) / "Estou a estudar inglês há dois anos" (Portekiz) şimdiki zamanla kurulur. İngilizcede: I**'ve been studying** English **for** two years.
- **Almanca:** "Ich lerne seit zwei Jahren Englisch" şimdiki zamanla kurulur. İngilizcede: I**'ve been learning** English **for** two years.

**Sık hatalar**
- ✗ I have been work. → ✓ I have been **working**. *(genel)* **Hatırla:** been'den sonra -ing.
- ✗ I've been reading three books this month. → ✓ I**'ve read** three books this month. *(genel)* **Hatırla:** Sayı ve sonuç → present perfect simple.
- ✗ I am learning English for two years. → ✓ I**'ve been learning** English for two years. *(genel)*
- ✗ I carry two years studying English. → ✓ I**'ve been studying** English for two years. *(ana dile özel: İspanyolca)* **Neden karışır:** "Llevo dos años estudiando" kalıbı birebir çevrilir. **Hatırla:** have been + -ing + for.
- ✗ I study English for two years. → ✓ I**'ve been studying** English for two years. *(ana dile özel: Portekizce)* **Neden karışır:** "Estudo inglês há dois anos" şimdiki zamanla kurulur. **Hatırla:** Bugüne kadar süren etkinlik → have been + -ing.
- ✗ I learn English since two years. → ✓ I**'ve been learning** English **for** two years. *(ana dile özel: Almanca)* **Neden karışır:** "seit zwei Jahren" hem since hem for gibi görünür. **Hatırla:** Süre → for, başlangıç → since.

**Alıştırma**
1. **Fark et:** "I've been to four countries this year." Neden been travelling değil?
2. **Seç:** I've been waiting ___ 9 a.m. (for / since)
3. **Tamamla:** She ___ been ___ (practise) the piano all afternoon.
4. **Düzelt:** They have been work on the project for weeks.
5. **Kur:** "How long / you / learn / English?" sorusunu kur.
6. **Sesli üret:** Son zamanlarda neyle uğraştığını, ne zamandır yaptığını ve şimdiye kadarki sonucunu anlat.

**Yanıt ve geri bildirim**
1. **Bir sonuç ve sayı (four countries) var.**
2. **since.** 9 a.m. başlangıç noktası.
3. **has, practising.** has been + -ing.
4. **They've been working on the project for weeks.**
5. **How long have you been learning English?**
6. Örnek: I've been running every morning since March. I've lost three kilos. Süreç için -ing, sonuç için simple.

**Mivo ile kısa alıştırma:** Mivo terasta yeni tanıştığın bir gezgindir. Son zamanlarda neler yaptığını sorar; sen de ona sorarsın. Destek: yalnızca ipucu kelimeler (*lately · recently · for · since*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #25

## 26. Eskiden

**Künye:** B1 · Ana hedef: used to, would (geçmiş alışkanlık) · Yardımcı: would yalnızca eylemler için

**Bu derste öğreneceklerin**

- **used to:** Artık doğru olmayan geçmiş alışkanlık ve durumlar
- **would:** Geçmişte tekrarlanan eylemler (yalnızca eylemler)
- **Soru ve olumsuz:** Did you use to…? · I didn't use to…

**Derse giriş:** "Eskiden uzun saçlıydım" ile "Her yaz denize giderdik" aynı geçmişi anlatır, ama İngilizcede biri iki biçimle, öteki tek biçimle söylenebilir.

**Hedef:** Geçmişteki alışkanlıklarını ve artık değişmiş durumları anlatabilirsin.

**Ana kural:** `used to + yalın fiil` · `would + yalın fiil` (yalnızca tekrarlanan eylemler)

| | used to | would |
|---|---|---|
| Tekrarlanan eylem | ✓ We used to swim every day. | ✓ We would swim every day. |
| Durum (be, have, live, like) | ✓ I used to have long hair. | ✗ I would have long hair. |

Soru ve olumsuz: `Did you use to…?` · `I didn't use to…` (use, -d olmadan)

**Diyalog: eski mahalle**

**Mivo:** {{name}}! Is that you? We **used to** play in this street!  
**{{name}}:** Yes! We **used to** be neighbours. Do you remember the old bakery?  
**Mivo:** Of course. Every morning, we **would** buy bread there.  
**{{name}}:** And there **used to** be a park here. Now it's a car park.  
**Mivo:** Things **didn't use to** be so busy.

**Fark et:** Eskiden olan ve artık olmayan şeyler **used to + yalın fiil**: We used to be neighbours. Tekrarlanan eylemler için **would** da kullanılabiliyor: we would buy bread. Ama bir durum (be neighbours) için would kullanılmıyor.

**Ne zaman kullanılır?**
- **Artık doğru olmayan geçmiş durumlar:** I used to live in a small town. · There used to be a cinema here.
- **Geçmişte tekrarlanan eylemler, özellikle anılarda:** Every summer, we would visit our grandparents.

**Sık hatalar**
- ✗ I would be shy. (alışılmış durum) → ✓ I **used to be** shy. *(genel)* **Hatırla:** Durum fiilleriyle would kullanılmaz.
- ✗ Did you used to…? → ✓ Did you **use to**…? *(genel)* **Hatırla:** did'den sonra yalın: use.
- ✗ I use to go to the gym. (şimdi) → ✓ I **usually** go to the gym. *(genel)* **Neden karışır:** used to şimdiki alışkanlık için kullanılır sanılır. **Hatırla:** used to yalnızca geçmiş.

**Alıştırma**
1. **Seç:** I ___ (used to / would) have a dog when I was a child.
2. **Seç:** Every summer, we ___ (used to / would) visit our cousins.
3. **Dönüştür:** "I used to play tennis." cümlesini Did ile başlayan soruya çevir.
4. **Düzelt:** My brother would be very quiet at school.
5. **Bağla:** "I used to walk to school. Now I take the bus." cümlelerini but ile tek cümlede birleştir.
6. **Sesli üret:** Çocukken sık yaptığın bir şeyi ve artık değişen bir alışkanlığını anlat.

**Yanıt ve geri bildirim**
1. **used to.** have burada bir durum.
2. **would ya da used to.** visit tekrarlanan bir eylem.
3. **Did you use to play tennis?** did'den sonra use yalın.
4. **My brother used to be very quiet at school.** be bir durum.
5. **I used to walk to school, but now I take the bus.** but, eski alışkanlık ile bugünkü durum arasındaki zıtlığı gösterir.
6. Örnek: When I was a child, I used to play football every day. We would play until dark. Now I don't play at all.

**Mivo ile kısa alıştırma:** Mivo yıllar sonra eski mahallede karşılaştığın çocukluk arkadaşındır. Eskiden ne yaptığınızı ve neyin değiştiğini konuşursunuz. Destek: yalnızca ipucu kelimeler (*used to · would · now*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #26

## 27. Önceden olmuştu

**Künye:** B1 · Ana hedef: past perfect · Yardımcı: by the time, already

**Bu derste öğreneceklerin**

- **Past perfect:** had + V3
- **Kullanımı:** Geçmişteki bir olaydan daha önce olan olay
- **by the time, already, before:** Olay sırasını gösteren ifadeler

**Derse giriş:** Eve geldin ve kapı açıktı. Kapı senden **önce** açılmıştı. İngilizce bu "daha önceki geçmişi" ayrı bir zamanla gösterir.

**Hedef:** Geçmişteki bir olaydan daha önce olmuş başka bir olayı anlatabilirsin.

**Ana kural:** `had + V3`

| Olay sırası | Zaman | Örnek |
|---|---|---|
| 1. (daha önce) | past perfect | The film had started… |
| 2. (sonra) | past simple | …when we arrived. |

Kişiye göre değişmez: I had, she had. Kısaltma: I'd, she'd. Olumsuz: hadn't.

Sıra açıksa (before, after) past simple da yeterli olabilir: I locked the door before I left.

**Diyalog: sigorta ofisi**

**Mivo:** What happened, {{name}}?  
**{{name}}:** When I got home on Friday, someone **had broken** the window.  
**Mivo:** Was anything missing?  
**{{name}}:** Yes. They **had taken** my laptop. I **had left** it on the table.  
**Mivo:** **Had** you **locked** the door?  
**{{name}}:** Yes, I **had**. I always lock it.

**Fark et:** Eve gelmek (got home) bir geçmiş olay. Pencerenin kırılması ondan **önce** olmuş: **had broken**. Daha önceki geçmiş **had + V3** ile anlatılıyor.

**Ne zaman kullanılır?**
- **Geçmişte bir anda zaten olmuş şeyleri anlatırken:** By the time we got there, the shop had closed. · She had already left when I called.
- **Bir olayın nedenini daha önceki bir olayla açıklarken:** I was hungry because I hadn't eaten all day.

**Sık hatalar**
- ✗ When I arrived, he has left. → ✓ When I arrived, he **had left**. *(genel)* **Hatırla:** Her iki olay da geçmişte; önce olan → had + V3.
- ✗ had went → ✓ had **gone** *(genel)* **Hatırla:** had'den sonra V3.

**Alıştırma**
1. **Sırala:** The film started at 8. We arrived at 8:15. Önce olan olayı had + V3 ile yaz.
2. **Tamamla:** By the time I got to the station, the train ___ (leave).
3. **Seç:** She ___ (had sent / sent) the email before her manager called.
4. **Düzelt:** When we arrived, the guests have already eaten.
5. **Soru kur:** "they / book / the room / before they travelled" için Had ile başlayan soru yaz.
6. **Sesli üret:** Bir yere geç kaldığın ya da bir şeyi kaçırdığın bir olayı anlat; önce olan şeyi açıkça belirt.

**Yanıt ve geri bildirim**
1. **The film had started when we arrived.**
2. **had left.** Varmadan önce tren çoktan gitmişti.
3. **had sent.** Önce e-posta, sonra telefon.
4. **When we arrived, the guests had already eaten.**
5. **Had they booked the room before they travelled?**
6. Örnek: I missed the bus because it had left early. When I got to work, the meeting had started.

**Mivo ile kısa alıştırma:** Mivo sigorta görevlisidir. Eve geldiğinde ne bulduğunu ve ondan önce ne olmuş olduğunu sorar. Destek: yalnızca ipucu kelimeler (*when I got home · had already · before*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #27

## 28. Hayal et

**Künye:** B1 · Ana hedef: second conditional · Yardımcı: wish + past (şimdiki durum)

**Bu derste öğreneceklerin**

- **Second conditional:** If + past simple, would + fiil
- **Gerçekçi ↔ hayali koşul:** If I have… ↔ If I had…
- **If I were you:** Tavsiye kalıbı
- **wish + past:** Şimdiki bir durum için dilek

**Derse giriş:** "Bir ay iznim olsa…" Gerçek değil, hayal. İngilizce hayal ettiğini anlatırken, gelecekten söz etse bile geçmiş zaman biçimi kullanır.

**Hedef:** Gerçek olmayan ya da pek olası olmayan durumları hayal edebilir, sonuçlarını ve dileklerini anlatabilirsin.

**Ana kural:** `if + past simple, would + yalın fiil` · `wish + past simple`

| | Gerçekçi gelecek (first) | Hayali (second) |
|---|---|---|
| Örnek | If I have time, I'll call you. | If I had time, I'd call you. |
| Anlam | Olabilir | Pek olası değil ya da gerçek değil |

Resmî ve tavsiye kalıbında: **If I were you**, I'd take the job.

**Diyalog: kariyer koçu**

**Mivo:** {{name}}, imagine you had no limits. What **would** you **do**?  
**{{name}}:** **If** I **had** more time, I**'d start** my own business.  
**Mivo:** And **if** money **wasn't** a problem?  
**{{name}}:** I**'d travel** for a year. I **wish** I **had** more free time now.  
**Mivo:** OK. Let's find one small step for this month.

**Fark et:** Hayali koşul **if + past**: if I **had**. Hayali sonuç **would + yalın fiil**: I**'d start**. Şimdiki bir durum için dilek **wish + past**: I wish I **had**.

**Ne zaman kullanılır?**
- **Hayaller ve varsayımlar:** If I won the lottery, I'd buy a house by the sea. · What would you do if you lost your phone?
- **Tavsiye ve şimdiki durumla ilgili dilekler:** If I were you, I'd talk to her. · I wish I lived closer to my family.

**Sık hatalar**
- ✗ If I would have time… → ✓ If I **had** time… *(genel)* **Hatırla:** would sonuç kısmında, if kısmında değil.
- ✗ I wish I have a car. → ✓ I wish I **had** a car. *(genel)* **Hatırla:** Şimdiki zaman için dilek → past.

**Alıştırma**
1. **Tamamla:** If I ___ (have) a free month, I ___ (travel) through Japan.
2. **Seç:** If Maya (knew / would know) the answer, she would tell us.
3. **Dilek kur:** "I don't have enough time." cümlesini wish ile yeniden yaz.
4. **Düzelt:** If he would live closer, we could meet more often.
5. **Anlamı ayır:** "If it rains tomorrow, we'll stay home." Gerçekçi bir olasılık mı, hayali bir durum mu?
6. **Sesli üret:** Gerçek olmayan ama çekici bir fırsatı hayal et: ne yapardın ve şu an neyin farklı olmasını dilerdin?

**Yanıt ve geri bildirim**
1. **had, would travel.**
2. **knew.** would yalnızca sonuç kısmında.
3. **I wish I had more time.**
4. **If he lived closer, we could meet more often.**
5. **Gerçekçi bir olasılık.** Bu first conditional.
6. Örnek: If I didn't have to work, I'd learn to paint. I wish I had a bigger flat.

**Mivo ile kısa alıştırma:** Mivo kariyer koçudur. Sınırların olmasa ne yapacağını ve şu anki hayatında neyin farklı olmasını dilediğini sorar. Destek: yalnızca ipucu kelimeler (*If I…, I'd… · I wish…*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #28

## 29. Tahmin et

**Künye:** B1 · Ana hedef: must / might / could / can't (şimdi hakkında çıkarım) · Yardımcı: —

**Bu derste öğreneceklerin**

- **must:** Neredeyse kesin tahmin
- **might / could / may:** Olasılık
- **can't:** İmkânsız görünen tahmin
- **Dikkat:** Tahminde mustn't değil, can't

**Derse giriş:** "Kesin evdedir", "evde olabilir", "evde olamaz". Üçü de tahmin, ama ne kadar emin olduğun farklı.

**Hedef:** Elindeki ipuçlarına göre ne kadar emin olduğunu belirterek tahminde bulunabilirsin.

**Ana kural:** `must / might / could / can't + yalın fiil`

| Ne kadar eminsin? | Kalıp | Örnek |
|---|---|---|
| Neredeyse kesin, evet | must | He must be tired. He worked all night. |
| Belki | might / could / may | She might be at the gym. |
| Neredeyse kesin, hayır | can't | That can't be Sam. He's in Spain. |

Dikkat: "Neredeyse kesin hayır" için **mustn't değil, can't** kullanılır. mustn't yasak anlamı taşır.

**Diyalog: bitpazarı**

**{{name}}:** This camera looks really old.  
**Mivo:** Yes, it **must** be from the 1970s. Look at the design.  
**{{name}}:** It **might** still work. Can I try it?  
**Mivo:** Sure. The price is only ten pounds.  
**{{name}}:** Ten pounds? It **can't** be real gold, then!  
**Mivo:** Ha! No, it isn't.

**Fark et:** Güçlü kanıt → **must**. Emin değil → **might / could**. İmkânsız görünüyor → **can't**. Hepsinden sonra yalın fiil geliyor: must **be**, might **work**.

**Ne zaman kullanılır?**
- **Kanıta dayalı tahmin:** The lights are on. They must be at home. · He's not answering. He might be asleep.
- **Bir iddiayı reddetmek ya da şaşırmak:** That can't be right! · You can't be serious!

**Sık hatalar**
- ✗ He must to be tired. → ✓ He must **be** tired. *(genel)* **Hatırla:** Modaldan sonra to yok.
- ✗ She mustn't be at home. (imkânsız tahmin) → ✓ She **can't** be at home. *(genel)* **Hatırla:** mustn't = yasak, can't = olamaz.

**Alıştırma**
1. **Kanıtla eşleştir:** The lights are on and I can hear music. They ___ be at home. (must / might / can't)
2. **Seç:** I'm not sure, but this ___ be the right address. (must / might / can't)
3. **Tamamla:** She ___ be asleep. I can hear her talking on the phone.
4. **Düzelt:** He must to be the new teacher.
5. **Çıkarım yaz:** "The streets are wet and everyone is carrying an umbrella." Şu an hakkında kanıta dayalı bir must cümlesi kur.
6. **Sesli üret:** Bir fotoğraftaki insanların nerede olduklarını ya da ne yaptıklarını tahmin et; bir tahmininde emin ol, birinde olma.

**Yanıt ve geri bildirim**
1. **must.** İki güçlü ipucu var.
2. **might.** Konuşan emin değil.
3. **can't.** Telefonda konuşuyor, uyuyor olamaz.
4. **He must be the new teacher.**
5. **It must be raining.** Geçmiş hakkında çıkarım (must have) #36'nın konusudur.
6. Örnek: They must be on holiday. They're on a beach. The woman might be their mother.

**Mivo ile kısa alıştırma:** Mivo bitpazarında satıcıdır. Tezgâhtaki eşyaları gösterir; sen her biri hakkında ne olduğunu, ne kadar eski olduğunu ve gerçek olup olmadığını tahmin edersin. Destek: yalnızca ipucu kelimeler (*must · might · can't*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #29

## 30. Kim, hangisi, nerede?

**Künye:** B1 · Ana hedef: defining relative clauses (who / which / that / where) · Yardımcı: that'in atlanması

**Bu derste öğreneceklerin**

- **Defining relative clauses:** Bir ismi tanımlayan yan cümle
- **who / which / that / where:** Kişi, şey ve yer için
- **that'in atlanması:** Arkasından özne geldiğinde

**Derse giriş:** "Balkonu olan daire" derken bilgi, ismin önüne değil arkasına gelir.

**Hedef:** Bir kişiyi, şeyi ya da yeri, onu ötekilerden ayıran bir bilgiyle tanımlayabilirsin.

**Ana kural:** `isim + who / which / that / where + bilgi`

| Neyi tanımlıyor? | Kelime | Örnek |
|---|---|---|
| Kişi | who / that | the man who called you |
| Şey | which / that | the bag that I bought |
| Yer | where | the café where we met |

**that ne zaman atlanabilir?** Arkasından bir özne geliyorsa: the book (that) **I** bought ✓. Arkasından fiil geliyorsa atlanamaz: the man **who** called ✗ the man called.

**Diyalog: kiralık daire**

**{{name}}:** I'm looking for a flat **that has** a balcony.  
**Mivo:** This is the one **that faces** the park.  
**{{name}}:** Nice. And is there a shop **where** I can buy food late?  
**Mivo:** Yes, at the corner. And the woman **who lives** upstairs is very quiet.  
**{{name}}:** Perfect. Is this the contract **you mentioned**?  
**Mivo:** Yes, here it is.

**Fark et:** Bilgi, ismin **arkasından** geliyor: a flat **that has** a balcony. Kişi için **who**, şey için **that / which**, yer için **where**. "the contract you mentioned" cümlesinde that atlanmış.

**Ne zaman kullanılır?**
- **Hangisinden söz ettiğini belirtirken:** That's the woman who helped me. · Where's the book that I lent you?
- **Aradığın şeyi tarif ederken:** I need a phone that has a good camera. · I want to live in a city where people are friendly.

**Ana dilinle fark**
- **Türkçe:** Tanımlayan bilgi ismin önüne gelir ("dün tanıştığım adam"). İngilizcede arkasına gelir: the man **I met yesterday**.
- **İspanyolca:** "El hombre que conocí ayer" yapısında que kişiler için de kullanılır. İngilizcede kişiler için **who** ya da that: the man **who**… (the man which değil).
- **Portekizce:** "O homem que eu conheci ontem" yapısında que kişiler için de kullanılır. İngilizcede kişiler için **who** ya da that: the man **who**… (the man which değil).
- **Almanca:** "Der Mann, den ich gestern getroffen habe" yapısında virgül vardır ve fiil sona gider. İngilizcede bu tür cümlede virgül yoktur ve fiil sona gitmez: the man **I met yesterday**.

**Sık hatalar**
- ✗ the man which… → ✓ the man **who**… *(genel)* **Hatırla:** Kişi → who.
- ✗ the book that I bought it → ✓ the book that I bought *(genel)* **Neden karışır:** Nesne tekrar edilir. **Hatırla:** that zaten o şeyi gösterir; it eklenmez.
- ✗ the yesterday I met man → ✓ the man **I met yesterday** *(ana dile özel: Türkçe)* **Neden karışır:** Tanımlayan bilgi ismin önüne gelir ("dün tanıştığım adam"). **Hatırla:** İngilizcede bilgi ismin arkasından gelir.
- ✗ the man, who I met yesterday, is my boss. → ✓ The man **who I met yesterday** is my boss. *(ana dile özel: Almanca)* **Neden karışır:** Almancada yan cümle her zaman virgülle ayrılır. **Hatırla:** Hangisi olduğunu belirten yan cümlede virgül kullanılmaz.

**Alıştırma**
1. **Seç:** The woman ___ called you is my manager. (who / which / where)
2. **Birleştir:** I bought a laptop. It has a very long battery life.
3. **Kısalt:** "The restaurant that we visited last night was excellent." that atlanabilir mi? Atlanabiliyorsa yeniden yaz.
4. **Düzelt:** That's the artist which painted the mural.
5. **Tanımla:** "a place / you can borrow books" ipuçlarıyla where kullanarak bir cümle kur.
6. **Sesli üret:** Tanıdığın bir kişiyi ya da sevdiğin bir yeri, dinleyenin tanıyabileceği iki bilgiyle tarif et.

**Yanıt ve geri bildirim**
1. **who.** Kişi.
2. **I bought a laptop that has a very long battery life.**
3. **Evet: The restaurant we visited last night was excellent.** Arkasından özne (we) geliyor.
4. **That's the artist who painted the mural.**
5. **It's a place where you can borrow books.**
6. Örnek: My best friend is someone who always listens. My favourite place is a café where you can sit for hours.

**Mivo ile kısa alıştırma:** Mivo emlakçıdır. Aradığın evi, mahalleyi ve komşuları tarif edersin. Destek: yalnızca ipucu kelimeler (*a flat that… · a place where… · someone who…*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #30

## 31. Yapılır, yapıldı

**Künye:** B1 · Ana hedef: passive (present simple ve past simple) · Yardımcı: by ile yapanı söylemek

**Bu derste öğreneceklerin**

- **Passive voice:** be + V3
- **Present simple ve past simple passive:** is made, was built
- **by:** Eylemi yapanı söyleme ve ne zaman gerekmediği

**Derse giriş:** "Bu köprü 1890'da yapıldı." Kimin yaptığı önemli değil; önemli olan köprü. İngilizcede cümle bu yüzden köprüyle başlar.

**Hedef:** Bir eylemi, kimin yaptığından çok eylemin kendisine ya da sonucuna odaklanarak anlatabilirsin.

**Ana kural:** `be + V3` (zamanı be belirler)

| Zaman | Etken | Edilgen |
|---|---|---|
| Present simple | They clean the rooms every day. | The rooms **are cleaned** every day. |
| Past simple | Someone stole my bike. | My bike **was stolen**. |

by yalnızca yapan önemli ya da yeni bir bilgiyse eklenir: The bridge was designed **by** a famous architect. Yapan belli değilse ya da önemsizse atlanır: My bike was stolen.

**Diyalog: müze turu**

**Mivo:** This painting **was made** in 1889.  
**{{name}}:** Who **was** it **painted by**?  
**Mivo:** It **was painted by** a young local artist. It **was found** in an old house.  
**{{name}}:** Amazing. Are photos allowed?  
**Mivo:** No, photos **aren't allowed** here. But postcards **are sold** in the shop.

**Fark et:** Cümle eylemi yapanla değil, eylemden etkilenenle başlıyor: This painting **was made**. Yapı **be + V3**. Yapanı söylemek istersek **by**: painted **by** a young artist.

**Ne zaman kullanılır?**
- **Süreçleri ve kuralları anlatırken:** Coffee is grown in Brazil. · Smoking is not allowed.
- **Yapan bilinmiyor ya da önemli değilken:** My phone was stolen. · The parcel was delivered this morning.

**Sık hatalar**
- ✗ The parcel delivered yesterday. → ✓ The parcel **was delivered** yesterday. *(genel)* **Hatırla:** be olmadan edilgen olmaz.
- ✗ The room was clean by the staff. → ✓ The room was **cleaned**. *(genel)* **Hatırla:** be'den sonra V3.

**Alıştırma**
1. **Dönüştür:** They clean the rooms every morning. (edilgen, present)
2. **Dönüştür:** Someone stole my bike yesterday. (edilgen, past)
3. **Tamamla:** The invitations ___ (send) last Friday.
4. **Seç:** "The bridge was designed by a famous architect." by kısmı gerekli mi? Neden?
5. **Düzelt:** The packages was delivered this morning.
6. **Sesli üret:** Sevdiğin bir yiyeceğin ya da ürünün nasıl yapıldığını, yapan kişiden çok adımlara odaklanarak anlat.

**Yanıt ve geri bildirim**
1. **The rooms are cleaned every morning.**
2. **My bike was stolen yesterday.**
3. **were sent.** Invitations çoğul ve geçmiş.
4. **Gerekli olabilir.** Mimarın ünlü olması cümleye bilgi katıyor. Yapan bilinmiyor ya da önemsizse by atlanır.
5. **The packages were delivered this morning.**
6. Örnek: Tea is grown in hills. The leaves are picked by hand. Then they are dried and packed.

**Mivo ile kısa alıştırma:** Mivo müze rehberidir. Eserlerin ne zaman, nerede ve kim tarafından yapıldığını sorarsın; müzenin kurallarını öğrenirsin. Destek: yalnızca ipucu kelimeler (*was made · was built · is allowed*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #31

## 32. Ne dedi?

**Künye:** B1 · Ana hedef: reported speech (cümle ve soru) · Yardımcı: say / tell farkı

**Bu derste öğreneceklerin**

- **Reported speech:** Söyleneni aktarma ve zaman kayması (is → was)
- **Aktarılan soru:** asked if / asked where + düz cümle sırası
- **İstek aktarma:** told us to + fiil
- **say ↔ tell farkı**

**Derse giriş:** Bir toplantıyı kaçıran arkadaşına "Müdür ne dedi?" sorusunu cevaplarken cümlelerin zamanı ve sırası değişir.

**Hedef:** Birinin söylediğini ve sorduğunu başkasına aktarabilirsin.

**Ana kural:** `said (that) + cümle` · `asked if / whether / wh- + düz cümle` · `told + kişi + to + fiil`

| Doğrudan | Aktarılan |
|---|---|
| "I'm tired." | He said (that) he was tired. |
| "I'll call you." | She said she would call me. |
| "Do you need help?" | He asked if I needed help. |
| "Where is the meeting?" | She asked where the meeting was. |
| "Please wait." | They told us to wait. |

**say mi, tell mi?** tell'den sonra kişi gelir: She **told me** that… · say'den sonra kişi gelmez: She **said** that… (She said me değil.)

Aktarılan şey hâlâ doğruysa zaman değişmeyebilir: She said the shop **opens** at nine.

**Diyalog: toplantıdan sonra**

**Mivo:** I missed the meeting. What did Maya **say**?  
**{{name}}:** She **said** the project **was** late.  
**Mivo:** Oh no. Did anyone ask about the budget?  
**{{name}}:** Yes, Leo **asked if** we **had** more money. She **said** we **didn't**.  
**Mivo:** What do we have to do?  
**{{name}}:** She **told us to finish** the report by Friday.

**Fark et:** Aktarılan cümle bir zaman geri gidiyor: "The project **is** late" → she said it **was** late. Soru düz cümle sırasına dönüyor: asked **if we had**. Bir istek **told us to** + fiil ile aktarılıyor.

**Ne zaman kullanılır?**
- **Toplantı, telefon ya da sohbeti başkasına anlatırken:** My boss said I could leave early. · He told me he was moving to Spain.
- **Birinin sorduğunu aktarırken:** She asked me where I lived. · They asked if we were ready.

**Sık hatalar**
- ✗ She asked where did I live. → ✓ She asked where **I lived**. *(genel)* **Hatırla:** Aktarılan soru düz cümle sırasıyla.
- ✗ He said me… → ✓ He **told** me… / He **said** (that)… *(genel)*

**Alıştırma**
1. **Aktar:** Sam: "I'm tired." → He said…
2. **Aktar:** Sam: "Do you need help?" → He asked…
3. **Aktar:** Sam: "Where is the meeting?" → He asked…
4. **Seç:** He ___ me that the office was closed. (said / told)
5. **Düzelt:** She asked me where was the station.
6. **Sesli üret:** Bir arkadaşınla yaptığın kısa bir konuşmayı üçüncü birine anlat; en az bir cümle ve bir soru aktar.

**Yanıt ve geri bildirim**
1. **He said (that) he was tired.**
2. **He asked if / whether I needed help.**
3. **He asked where the meeting was.**
4. **told.** Arkasından kişi (me) geliyor.
5. **She asked me where the station was.**
6. Örnek: My friend said she was moving. She asked if I could help her on Saturday.

**Mivo ile kısa alıştırma:** Mivo toplantıyı kaçıran iş arkadaşındır. Ne söylendiğini, kimin ne sorduğunu ve sizden ne istendiğini sorar. Destek: yalnızca ipucu kelimeler (*said · asked if · told us to*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #32

## 33. Sohbeti yönet

**Künye:** B1 · Ana hedef: A) dolaylı sorular · B) question tags · Yardımcı: —

**Bu derste öğreneceklerin**

- **Dolaylı sorular:** Could you tell me where…? Do you know if…?
- **Dolaylı soruda sıra:** Düz cümle sırası, do/does yok
- **Question tags:** …, isn't it? …, don't you?

**Derse giriş:** "Where is the station?" doğru bir soru, ama yabancı birine sorarken biraz sert durabilir. Aynı soruyu daha kibar sormanın yolu sırayı değiştirmektir.

**Hedef:** Bilgiyi daha kibar isteyebilir ve duyduğun bir bilgiyi teyit edebilirsin.

**Ana kural**

**A) Dolaylı soru:** `Could you tell me / Do you know + soru kelimesi / if + düz cümle?`

| Doğrudan | Dolaylı |
|---|---|
| Where is the station? | Could you tell me where the station **is**? |
| What time does it open? | Do you know what time it **opens**? |
| Is it free? | Do you know **if** it's free? |

**B) Question tag:** Olumlu cümle → olumsuz tag; olumsuz cümle → olumlu tag. Tag'de cümlenin yardımcı fiili kullanılır.

| Cümle | Tag |
|---|---|
| You live here, | don't you? |
| She's coming, | isn't she? |
| They haven't called, | have they? |
| It was great, | wasn't it? |

**Diyalog: SIM kart dükkânı**

**{{name}}:** Hi. **Could you tell me how much** this package **costs**?  
**Mivo:** It's twenty euros for a month.  
**{{name}}:** It includes 10 GB of data, **doesn't it**?  
**Mivo:** Yes, and free calls.  
**{{name}}:** **Do you know if** it **works** in other countries?  
**Mivo:** Only in Europe.

**Fark et:** Kibar soruda soru kısmı düz cümle sırasında: how much it **costs** (how much does it cost değil). Teyit için cümlenin sonuna kısa bir soru ekleniyor: **doesn't it?**

**Ne zaman kullanılır?**
- **Yabancı birinden bilgi isterken:** Could you tell me where the toilets are? · Do you know if the museum is open today?
- **Bildiğini sandığın bir şeyi teyit ederken:** The meeting is at ten, isn't it? · You've been here before, haven't you?

**Sık hatalar**
- ✗ Could you tell me where is it? → ✓ Could you tell me where **it is**? *(genel)* **Hatırla:** Girişten sonra düz cümle sırası.
- ✗ Do you know what time does it open? → ✓ Do you know what time **it opens**? *(genel)* **Hatırla:** Dolaylı soruda do/does yok.
- ✗ You are ready, are you? → ✓ You are ready, **aren't** you? *(genel)* **Hatırla:** Tag cümlenin tersi.

**Alıştırma**
1. **Dolaylı yap:** Where is platform 4? → Could you tell me…?
2. **Dolaylı yap:** Does this bus go to the airport? → Do you know…?
3. **Tag ekle:** You live nearby, ___?
4. **Tag ekle:** She hasn't called, ___?
5. **Düzelt:** Could you tell me where is the nearest bank?
6. **Sesli üret:** Bir istasyonda görevliye iki kibar soru sor ve aldığın cevabı bir question tag ile teyit et.

**Yanıt ve geri bildirim**
1. **Could you tell me where platform 4 is?**
2. **Do you know if / whether this bus goes to the airport?**
3. **don't you?**
4. **has she?**
5. **Could you tell me where the nearest bank is?**
6. Örnek: Could you tell me when the next train leaves? Do you know if it stops in York? It leaves from platform 2, doesn't it?

**Mivo ile kısa alıştırma:** Mivo telefon dükkânında satış görevlisidir. Paketleri kibarca sorar, duyduğun bilgiyi teyit eder ve birini seçersin. Destek: yalnızca ipucu kelimeler (*Could you tell me… · Do you know if… · …, doesn't it?*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #33

## 34. -ing mi, to mu?

**Künye:** B1 · Ana hedef: A) fiilden sonra -ing / to kalıpları · B) anlamı değiştirenler (remember, stop, try) · Yardımcı: —

**Bu derste öğreneceklerin**

- **-ing alan fiiller:** enjoy, finish, mind, avoid, suggest
- **to alan fiiller:** want, hope, decide, plan, need
- **Anlamı değişen fiiller:** remember, stop, try

**Derse giriş:** "Sigarayı bıraktı" ile "Sigara içmek için durdu" İngilizcede yalnızca tek bir kelimenin biçimiyle ayrılır.

**Hedef:** Sık kullanılan fiillerden sonra doğru biçimi seçebilir ve bazı fiillerde anlamın nasıl değiştiğini açıklayabilirsin.

**Ana kural**

**A) Kalıplar**

| -ing alanlar | to alanlar |
|---|---|
| enjoy, finish, mind, avoid, suggest, keep, can't stand | want, hope, decide, plan, agree, need, would like |

like, love, hate, start, begin her ikisiyle de kullanılabilir ve anlam pek değişmez.

**B) Anlamı değiştirenler**

| Fiil | + to | + -ing |
|---|---|---|
| remember | yapmayı unutmamak: Remember to lock the door. | yaptığını hatırlamak: I remember locking it. |
| stop | bir şey yapmak için durmak: He stopped to buy water. | bir eylemi bırakmak: He stopped smoking. |
| try | zorlanarak denemek: I tried to open it, but I couldn't. | bir yöntemi denemek: Try restarting it. |

**Diyalog: yılbaşı akşamı**

**Mivo:** So, {{name}}, what are your plans for next year?  
**{{name}}:** I **want to learn** to swim. And I **enjoy cooking**, so I **hope to take** a cooking class.  
**Mivo:** Nice! Anything you want to stop?  
**{{name}}:** Yes. I want to **stop checking** my phone at night.  
**Mivo:** **Try leaving** it in the kitchen. It worked for me!  
**{{name}}:** Good idea. I'll **remember to do** that.

**Fark et:** want, hope → **to** + fiil. enjoy, stop → fiil**-ing**. remember **to do** = yapmayı unutmamak.

**Ne zaman kullanılır?**
- **Plan, istek ve zevkleri anlatırken:** I've decided to move. · I don't mind waiting.
- **Hatırlatma, alışkanlık bırakma ve öneri için:** Remember to call your mum. · I stopped eating sugar. · Try drinking more water.

**Sık hatalar**
- ✗ I enjoy to read. → ✓ I enjoy **reading**. *(genel)* **Hatırla:** enjoy + -ing.
- ✗ I stopped to smoke. (sigarayı bıraktım) → ✓ I stopped **smoking**. *(genel)* **Hatırla:** stop to = bir şey yapmak için durmak.
- ✗ We decided going by train. → ✓ We decided **to go** by train. *(genel)*

**Alıştırma**
1. **Seç:** I enjoy ___ (to cook / cooking) for friends.
2. **Anlamı seç:** Please remember ___ (to lock / locking) the door.
3. **Anlamı seç:** He stopped ___ (to smoke / smoking) last year. (sigarayı bıraktı)
4. **Düzelt:** We decided going by train.
5. **İki anlamı karşılaştır:** "I tried restarting the computer." Bir yöntemi mi denedi, yoksa zorlanarak bir şey mi yapmaya çalıştı?
6. **Sesli üret:** Gelecek yıl için bir hedefini, keyif aldığın bir şeyi ve bırakmak istediğin bir alışkanlığını anlat.

**Yanıt ve geri bildirim**
1. **cooking.** enjoy + -ing.
2. **to lock.** Yapmayı unutma.
3. **smoking.** Bir alışkanlığı bıraktı.
4. **We decided to go by train.**
5. **Bir yöntemi denedi.** try + -ing.
6. Örnek: I want to run a marathon. I enjoy running in the morning. I want to stop eating late at night.

**Mivo ile kısa alıştırma:** Mivo yılbaşı akşamı birlikte olduğun arkadaşındır. Yeni yıl hedeflerini, bırakmak istediğin alışkanlıkları sorar ve sana bir öneri verir. Destek: yalnızca ipucu kelimeler (*want to · enjoy -ing · stop -ing · try -ing*).

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #34

---

# Orta · B2

## 35. Keşke ve pişmanlık

**Künye:** B2 · Ana hedef: third conditional, mixed conditional · Yardımcı: wish / if only + past perfect

**Bu derste öğreneceklerin**

- **Third conditional:** If + had + V3, would have + V3
- **Mixed conditional:** Geçmiş koşul → bugünkü sonuç
- **wish / if only + had + V3:** Geçmiş pişmanlık

**Derse giriş:** "Erken çıksaydık treni yakalardık." Bu artık değişmeyecek bir geçmişe dair bir hayal. İngilizce bunun için zamanı bir adım daha geriye taşır.

**Hedef:** Geçmişte farklı olabilecek şeyleri, sonuçlarını ve bugüne etkisini değerlendirebilirsin.

**Ana kural**

| Tür | Koşul | Sonuç | Örnek |
|---|---|---|---|
| Third | if + had + V3 | would have + V3 | If I had known, I would have come. |
| Mixed (geçmiş → bugün) | if + had + V3 | would + yalın fiil | If I had studied medicine, I would be a doctor now. |
| Pişmanlık | wish / if only + had + V3 | — | I wish I had listened. |

would have yerine could have (yapabilirdi) ve might have (belki yapardı) da kullanılabilir.

**Diyalog: kaçırılan aktarma**

**Mivo:** I'm sorry, {{name}}. Your connecting flight has already left.  
**{{name}}:** **If** the first flight **hadn't been** late, I **would have caught** it.  
**Mivo:** I understand. Did you book both flights together?  
**{{name}}:** No. **I wish I had**. **If** I**'d booked** them together, I **would be** on the next flight now.  
**Mivo:** Let me see what I can do.

**Fark et:** Değişmeyecek geçmiş koşul **had + V3**, geçmişteki hayali sonuç **would have + V3**. Geçmiş koşulun **bugünkü** sonucu için **would + yalın fiil**: I would **be** on the next flight now.

**Ne zaman kullanılır?**
- **Geçmişteki bir kararı ya da olayı yeniden düşünürken:** If we had left earlier, we wouldn't have missed the start. · If she hadn't helped me, I would have failed.
- **Geçmiş bir pişmanlığı ve bugüne etkisini anlatırken:** I wish I had saved more money. · If I hadn't moved here, I wouldn't know you.

**Sık hatalar**
- ✗ If I would have known… → ✓ If I **had known**… *(genel)* **Hatırla:** would have yalnızca sonuç kısmında.
- ✗ I wish I studied harder. (geçmiş pişmanlık) → ✓ I wish I **had studied** harder. *(genel)* **Hatırla:** Geçmiş hakkında dilek → had + V3.

**Alıştırma**
1. **Tamamla:** If we ___ (leave) earlier, we ___ (catch) the train.
2. **Anlamı seç:** "If I had taken that job, I would live in Berlin now." Sonuç geçmişte mi, bugün mü?
3. **Pişmanlık kur:** "I didn't ask for advice." cümlesini wish ile yeniden yaz.
4. **Düzelt:** If she would have called, I would have helped.
5. **Birleştir:** He didn't save money. He can't afford the course now. Mixed conditional ile tek cümle yaz.
6. **Sesli üret:** Geçmişteki büyük ya da küçük bir kararını değerlendir: ne farklı olabilirdi ve bugün ne değişmiş olurdu?

**Yanıt ve geri bildirim**
1. **had left, would have caught.** İki kısım da geçmişe ait.
2. **Bugün.** would live bugünkü durumu anlatıyor.
3. **I wish I had asked for advice.**
4. **If she had called, I would have helped.**
5. **If he had saved money, he could afford the course now.**
6. Örnek: If I hadn't changed schools, I wouldn't have met my best friend. I wish I had started English earlier.

**Mivo ile kısa alıştırma:** Mivo havalimanındaki müşteri hizmetleri görevlisidir. Aktarmayı nasıl kaçırdığını, ne farklı olsaydı ne olacağını sorar ve bir çözüm arar. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #35

## 36. Geçmişi yorumla

**Künye:** B2 · Ana hedef: must have / might have / can't have / should have · Yardımcı: —

**Bu derste öğreneceklerin**

- **must have / might have / can't have + V3:** Geçmiş hakkında tahmin
- **should have / shouldn't have + V3:** Geçmişteki davranışı değerlendirme
- **Dikkat:** Olamaz anlamında mustn't have değil, can't have

**Derse giriş:** Sabah ofise geldin, kapı açık. Ne olmuş olabilir? Geçmiş hakkında tahmin yürütmek için İngilizce modal fiile **have + V3** ekler.

**Hedef:** Geçmişte olmuş bir şey hakkında kanıta dayalı tahmin yürütebilir ve yapılması gerekeni değerlendirebilirsin.

**Ana kural:** `must / might / could / can't / should + have + V3`

| Anlam | Kalıp | Örnek |
|---|---|---|
| Neredeyse kesin oldu | must have | She must have forgotten. |
| Belki oldu | might / could have | He might have missed the bus. |
| Olmuş olamaz | can't have | They can't have finished already. |
| Yapılmalıydı (eleştiri, pişmanlık) | should have | I should have told you. |
| Yapılmamalıydı | shouldn't have | You shouldn't have shouted. |

**Diyalog: su baskını**

**{{name}}:** The kitchen floor is completely wet!  
**Mivo:** A pipe **must have broken** during the night.  
**{{name}}:** Could it **have been** the washing machine?  
**Mivo:** No, it **can't have been**. It was off.  
**{{name}}:** We **should have called** a plumber last month. The pipe was already old.  
**Mivo:** You're right. I'll call one now.

**Fark et:** Geçmiş hakkında tahmin **modal + have + V3** ile kuruluyor. **must have** = neredeyse kesin, **can't have** = imkânsız, **should have** = yapılmalıydı ama yapılmadı.

**Ne zaman kullanılır?**
- **Kanıtlara bakarak geçmişi yorumlarken:** The ground is wet. It must have rained. · She hasn't replied. She might not have seen the message.
- **Geçmişteki bir davranışı değerlendirirken:** We should have booked earlier. · You shouldn't have paid so much.

**Sık hatalar**
- ✗ must had happened → ✓ must **have** happened *(genel)* **Hatırla:** modaldan sonra have, had değil.
- ✗ He can't has seen it. → ✓ He can't **have seen** it. *(genel)*
- ✗ He mustn't have seen it. (imkânsız tahmin) → ✓ He **can't** have seen it. *(genel)* **Hatırla:** mustn't yasak; olamaz → can't.

**Alıştırma**
1. **Çıkarım yap:** The office door is locked and nobody has a key. The manager ___ have left. (must / might / can't)
2. **Tamamla:** The package ___ (must / deliver) to the wrong address. (edilgen)
3. **Anlamı ayır:** "You should have called me." Geçmiş hakkında bir tahmin mi, yapılmamış bir şeye eleştiri mi?
4. **Düzelt:** They might had forgotten the appointment.
5. **Rapor yaz:** "The lights were on; the door was open; no one answered." Emin olmadığın iki çıkarım yaz.
6. **Sesli üret:** Küçük bir aksiliği anlat: ne biliyorsun, ne olmuş olabilir ve geriye bakınca ne yapılmalıydı?

**Yanıt ve geri bildirim**
1. **must** (güçlü kanıt) ya da **might** (daha temkinli).
2. **must have been delivered.** modal + have + been + V3.
3. **Eleştiri.** Aramadın, ama aramalıydın.
4. **They might have forgotten the appointment.**
5. Örnek: Someone might have left in a hurry. They could have gone to the shop.
6. Örnek: My phone was dead in the morning. I must have forgotten to charge it. I should have checked before bed.

**Mivo ile kısa alıştırma:** Mivo ev sahibidir. Evdeki su baskınının nedenini ve neyin farklı yapılması gerektiğini birlikte tartışırsınız. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #36

## 37. Gelecekte o an

**Künye:** B2 · Ana hedef: future continuous, future perfect · Yardımcı: by + zaman

**Bu derste öğreneceklerin**

- **Future continuous:** will be + fiil-ing (o anda sürüyor olacak)
- **Future perfect:** will have + V3 (o zamana kadar bitmiş olacak)
- **by ↔ until:** Bitme sınırı ↔ sürenin sonu

**Derse giriş:** "Yarın bu saatte uçakta olacağım" ile "Cuma'ya kadar bitirmiş olacağım" geleceğe iki farklı yerden bakar.

**Hedef:** Gelecekte belirli bir anda ne yapıyor olacağını ve belirli bir zamana kadar neyi bitirmiş olacağını anlatabilirsin.

**Ana kural**

| | Kalıp | Ne anlatır? | Örnek |
|---|---|---|---|
| Future continuous | will be + fiil-ing | O anda sürüyor olacak | At 8 tomorrow, I'll be flying to Rome. |
| Future perfect | will have + V3 | O zamana kadar bitmiş olacak | By Friday, I'll have finished the report. |

**by** = en geç: by Friday, by the end of the year.

**Diyalog: düğün hazırlığı**

**Mivo:** So, {{name}}, the wedding is in June. Let's check the plan.  
**{{name}}:** **By** the end of March, we **will have booked** the venue.  
**Mivo:** Good. And the invitations?  
**{{name}}:** We**'ll have sent** them **by** April. This time next month, I**'ll be choosing** the flowers.  
**Mivo:** And on the big day, you**'ll be dancing** all night!

**Fark et:** Bir tarihe kadar tamamlanacak işler **will have + V3**: will have booked. Gelecekte belirli bir anda sürüyor olacak şeyler **will be + -ing**: will be choosing.

**Ne zaman kullanılır?**
- **Gelecekteki bir anı tarif ederken:** This time next week, we'll be lying on a beach. · Don't call at 7. I'll be driving.
- **Son tarihleri ve hedefleri anlatırken:** By 2030, I'll have paid off my loan. · The work will have been completed by Monday.

**Sık hatalar**
- ✗ will have finish → ✓ will have **finished** *(genel)* **Hatırla:** have'den sonra V3.
- ✗ will be work → ✓ will be **working** *(genel)* **Hatırla:** be'den sonra -ing.
- ✗ until Friday I'll have finished → ✓ **by** Friday *(genel)* **Neden karışır:** "Cuma'ya kadar" iki şekilde çevrilebilir. **Hatırla:** Bir şeyin bitme sınırı → by; bir durumun süresi → until.

**Alıştırma**
1. **Seç:** At 10 tomorrow, we ___ (will discuss / will be discussing) the plan.
2. **Tamamla:** By Friday, the team ___ (finish) the first draft.
3. **Anlamı eşleştir:** "At 6, I will be flying to Rome." O anda sürüyor mu, o zamana kadar bitmiş mi?
4. **Düzelt:** By next summer, she will have graduate.
5. **Takvime yaz:** "The report is due on Monday; I expect to finish before then." Future perfect ile tek cümle kur.
6. **Sesli üret:** Gelecek hafta belirli bir anda ne yapıyor olacağını ve ayın sonuna kadar neyi bitirmiş olacağını anlat.

**Yanıt ve geri bildirim**
1. **will be discussing.** Saat 10'da sürüyor olacak.
2. **will have finished.**
3. **O anda sürüyor.**
4. **By next summer, she will have graduated.**
5. **I will have finished the report by Monday.**
6. Örnek: Next Saturday at noon, I'll be playing football. By the end of the month, I'll have finished my course.

**Mivo ile kısa alıştırma:** Mivo düğün organizatörüdür. Takvimi birlikte gözden geçirirsiniz: hangi tarihe kadar ne bitmiş olacak, belirli günlerde neler yapıyor olacaksınız. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #37

## 38. Yaptırmak

**Künye:** B2 · Ana hedef: have / get something done · Yardımcı: make / let

**Bu derste öğreneceklerin**

- **have / get + nesne + V3:** Bir işi başkasına yaptırma
- **make + kişi + fiil:** Zorlama
- **let + kişi + fiil:** İzin verme

**Derse giriş:** "Saçımı kestirdim" derken saçını kesen sen değilsin. İngilizce bunu tek bir kalıpla söyler.

**Hedef:** Bir işi başkasına yaptırdığını söyleyebilir, birini bir şey yapmaya zorladığını ya da izin verdiğini anlatabilirsin.

**Ana kural**

| Anlam | Kalıp | Örnek |
|---|---|---|
| Bir işi yaptırmak | have / get + nesne + V3 | I had my hair cut. · I got my phone repaired. |
| Birine yaptırmak (zorlamak) | make + kişi + yalın fiil | The teacher made us rewrite it. |
| İzin vermek | let + kişi + yalın fiil | My parents let me stay out late. |

get biraz daha günlük konuşmaya ait; have nötr.

**Diyalog: oto servis**

**{{name}}:** Hi. I need to **have** my car **checked**. The brakes are making a noise.  
**Mivo:** No problem. We can **get** it **done** by tomorrow.  
**{{name}}:** Great. Can I also **have** the oil **changed**?  
**Mivo:** Sure. It'll be ready by five. We won't **make** you **wait** long.  
**{{name}}:** Great. Please **let** me **know** the price first.

**Fark et:** İşi başkası yapıyor: **have** my car **checked**, **have** the oil **changed** (nesne + V3). **make + kişi + yalın fiil** = zorlamak; **let + kişi + yalın fiil** = izin vermek.

**Ne zaman kullanılır?**
- **Hizmet aldığın işleri anlatırken:** We're having the kitchen painted. · I need to get my eyes tested.
- **Zorlama ve izni anlatırken:** The film made me cry. · Let me help you.

**Sık hatalar**
- ✗ I cut my hair. (kuaförde) → ✓ I **had** my hair **cut**. *(genel)* **Neden karışır:** Doğrudan çeviri kendin yapmışsın gibi anlaşılır. **Hatırla:** Başkası yaptıysa have + nesne + V3.
- ✗ made me to wait → ✓ made me **wait** *(genel)* **Hatırla:** make ve let'ten sonra to yok.

**Alıştırma**
1. **Dönüştür:** A technician repaired my laptop. → I had…
2. **Seç:** The coach made us ___ (to run / run) five more laps.
3. **Seç:** My parents let me ___ (stay / to stay) out late.
4. **Tamamla:** We got the invitations ___ (print) yesterday.
5. **Düzelt:** I had the mechanic to check the brakes.
6. **Sesli üret:** Yaptırman gereken bir işi, ne zaman bitmesini istediğini ve ne kadar ödemeye hazır olduğunu anlat.

**Yanıt ve geri bildirim**
1. **I had my laptop repaired.**
2. **run.** make + kişi + yalın fiil.
3. **stay.**
4. **printed.** get + nesne + V3.
5. **I had the mechanic check the brakes.** have + kişi + yalın fiil = birine iş yaptırmak; have + şey + V3 = bir şeyi yaptırmak.
6. Örnek: I need to get my bike fixed. I'd like to have it done by Friday.

**Mivo ile kısa alıştırma:** Mivo servis danışmanıdır. Ne yaptırmak istediğini, ne zaman hazır olacağını ve ek bir işe izin verip vermediğini konuşursunuz. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #38

## 39. Söylendiğine göre

**Künye:** B2 · Ana hedef: reporting verbs (suggest, admit, deny, promise…) · Yardımcı: It is said that… / be said to…

**Bu derste öğreneceklerin**

- **Aktarma fiilleri:** promise, admit, deny, suggest, warn… ve kalıpları
- **Edilgen aktarma:** It is said that… · He is said to…
- **Ton:** Fiil seçiminin söylenenin tonunu aktarması

**Derse giriş:** "Dedi ki" demek her zaman yeterli değil. Kabul etti mi, inkâr mı etti, önerdi mi? Seçilen fiil, söylenenin tonunu da aktarır.

**Hedef:** Birinin söylediğini tonuyla birlikte aktarabilir ve kaynağı belirsiz iddiaları temkinli bir dille aktarabilirsin.

**Ana kural**

| Fiil | Kalıp | Örnek |
|---|---|---|
| promise, agree, refuse, offer | + to + fiil | She promised to call. |
| admit, deny, suggest, recommend | + -ing ya da + that | He admitted taking it. · He denied that he was there. |
| tell, ask, advise, warn | + kişi + to + fiil | She advised me to wait. |
| suggest (birine öneri) | + that + kişi + yalın fiil | I suggested that we leave early. |

**Edilgen aktarma:** `It is said / believed / reported that + cümle` · `Özne + is said / believed + to + fiil`
- It is believed that the painting is fake. = The painting **is believed to be** fake.

**Diyalog: radyo programı**

**Mivo:** Welcome to the show, {{name}}. What's the news about the new park?  
**{{name}}:** The mayor **promised to open** it in May. But the builders **admitted making** some mistakes.  
**Mivo:** **Is** it **true** that it will cost more?  
**{{name}}:** Well, **it is said that** the cost has doubled. The mayor **denied** that.  
**Mivo:** And what do people want?  
**{{name}}:** Many people **suggested adding** a playground.

**Fark et:** Her fiil söylenenin türünü gösteriyor: **promised** (söz), **admitted** (kabul), **denied** (inkâr), **suggested** (öneri). Fiillerin arkasından gelen biçim farklı: promised **to open**, admitted **making**. Kaynağı belirsiz bilgi için **It is said that…**

**Ne zaman kullanılır?**
- **Birinin söylediğini tonuyla aktarırken:** He refused to answer. · She warned us not to go.
- **Kaynağı belirsiz ya da doğrulanmamış bilgiyi aktarırken:** It is reported that ten people were injured. · The singer is said to be planning a new album.

**Sık hatalar**
- ✗ He suggested to postpone. → ✓ He suggested **postponing**. / He suggested **that we postpone**. *(genel)* **Hatırla:** suggest'ten sonra to yok.
- ✗ It is said him to be rich. → ✓ **He is said** to be rich. *(genel)*

**Alıştırma**
1. **Aktar:** "We made a mistake," the company said. admit ile yeniden yaz.
2. **Seç:** The spokesperson denied ___ (to leak / leaking) the document.
3. **Dönüştür:** People say that the painting is worth millions. It is said… ile başlat.
4. **Düzelt:** He suggested to postpone the announcement.
5. **Kaynak ekle:** "The policy may change." Bunu kaynağı belirsiz bir haber olarak temkinli bir dille aktar.
6. **Sesli üret:** Kısa bir haberi özetle: neyin doğrulandığını, kimin ne söylediğini ve neyin hâlâ iddia olduğunu ayır.

**Yanıt ve geri bildirim**
1. **The company admitted (that) it had made a mistake.** ya da **The company admitted making a mistake.**
2. **leaking.** deny + -ing.
3. **It is said that the painting is worth millions.**
4. **He suggested postponing the announcement.**
5. **The policy is reported to be under review.** ya da **It is reported that the policy may change.**
6. Fiil seçimi, kaynağa ne kadar güvendiğini ve konuya ne kadar mesafeli durduğunu gösterir.

**Mivo ile kısa alıştırma:** Mivo radyo sunucusudur. Bir yerel haberi sorar; sen kimin ne söylediğini ve neyin iddia olduğunu aktarırsın. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #39

## 40. Bilgiyi kısa birleştir

**Künye:** B2 · Ana hedef: non-defining relative clauses · Yardımcı: participle clauses (-ing / -ed)

**Bu derste öğreneceklerin**

- **Non-defining relative clauses:** Virgülle verilen ek bilgi (that kullanılmaz)
- **Participle clauses:** -ing, V3 ve having + V3 ile kısaltma
- **Kural:** Kısaltılan kısmın öznesi ana cümlenin öznesiyle aynı olmalı

**Derse giriş:** İki kısa cümleyi tek bir akıcı cümlede birleştirmek, konuşmayı ve yazıyı daha olgun gösterir. Bunun için iki yol var: virgüllü bir ek bilgi ya da kısaltılmış bir yan cümle.

**Hedef:** Bir bilgiyi daha kısa ve akıcı biçimde ekleyebilir ve iki cümleyi doğal şekilde birleştirebilirsin.

**Ana kural**

**A) Non-defining relative clause:** `isim, who / which + ek bilgi, …`
- Virgülle ayrılır. **that kullanılmaz.** Bilgi çıkarılsa da kimden söz edildiği anlaşılır.
- My sister, **who lives in Lisbon**, is a doctor.

**B) Participle clause:**

| Biçim | Anlam | Örnek |
|---|---|---|
| -ing | Özne eylemi yapıyor | **Walking** home, I met Sam. (= While I was walking…) |
| -ed / V3 | Özne eylemden etkileniyor | **Built** in 1890, the station… (= It was built…) |
| Having + V3 | Önce olan eylem | **Having finished** the work, she left. |

Kural: Kısaltılmış kısmın öznesi, ana cümlenin öznesiyle **aynı** olmalı.

**Diyalog: şehir yürüyüşü**

**{{name}}:** This is the old station, **which was built in 1890**.  
**Mivo:** It's beautiful. Is it still used?  
**{{name}}:** Yes. **Restored ten years ago**, it's now a market.  
**Mivo:** And who's that statue?  
**{{name}}:** That's Ada Clark, **who founded the city library**.  
**Mivo:** **Walking around here**, I feel like I'm in a film!

**Fark et:** Virgülle ayrılan kısım ek bilgi veriyor ve çıkarılsa da cümle anlaşılıyor: the old station**, which**… Cümle başındaki **Restored** ve **Walking** iki ayrı cümleyi kısaltıyor.

**Ne zaman kullanılır?**
- **Bir kişi ya da şey hakkında ek bilgi verirken:** Our teacher, who is from Ireland, is very funny. · The museum, which opened last year, is free.
- **Anlatımı kısaltırken, özellikle yazıda ve sunumda:** Founded in 1950, the company now has 500 employees. · Feeling tired, I went to bed early.

**Sık hatalar**
- ✗ My car, that is blue, … → ✓ My car, **which** is blue, … *(genel)* **Hatırla:** Virgüllü ek bilgide that yok.
- ✗ Walking down the street, the rain started. → ✓ Walking down the street, **I** felt the rain start. *(genel)* **Neden karışır:** Kısaltılmış kısmın öznesi unutulur. **Hatırla:** Yürüyen kimse, cümlenin öznesi o olmalı.

**Alıştırma**
1. **Birleştir:** My aunt lives in Bristol. She is a marine biologist. (Ek bilgi olarak)
2. **Noktalama:** "The report, which was published on Monday, …" Virgüller bu bilgi hakkında ne söylüyor?
3. **Kısalt:** After she had checked the figures, Maya sent the report. Participle clause ile yeniden yaz.
4. **Düzelt:** Walking into the gallery, the paintings immediately caught my eye.
5. **Birleştir:** The book was written by a local journalist. It explains the history of the harbour. Tek ve akıcı bir cümle yaz.
6. **Sesli üret:** Bir filmi, kitabı ya da yeri tanıt; iki bilgiyi relative ya da participle clause ile birleştir.

**Yanıt ve geri bildirim**
1. **My aunt, who lives in Bristol, is a marine biologist.**
2. **Ek bilgi.** Çıkarılsa da hangi rapordan söz edildiği anlaşılır.
3. **Having checked the figures, Maya sent the report.**
4. **Walking into the gallery, I was immediately struck by the paintings.** Galeriye giren kişi cümlenin öznesi olmalı.
5. **The book, written by a local journalist, explains the history of the harbour.**
6. Örnek: My city, which is on the coast, is famous for fish. Built in the 1800s, the old port is now full of cafés.

**Mivo ile kısa alıştırma:** Mivo şehrine gelen bir arkadaşındır. Ona yerleri gezdirirsin; her yer hakkında ek bilgiyi akıcı cümlelerle verirsin. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #40

## 41. Fikir savun

**Künye:** B2 · Ana hedef: although, despite / in spite of, whereas · Yardımcı: söylem işaretleri (however, on the other hand, as a result)

**Bu derste öğreneceklerin**

- **although / even though + cümle**
- **despite / in spite of + isim ya da -ing**
- **whereas:** İki durumu karşılaştırma
- **Söylem işaretleri:** however, on the other hand, as a result

**Derse giriş:** "Pahalı, ama zaman kazandırır." Bir fikri savunmanın en güçlü yolu karşı tarafın haklı olduğu noktayı kabul edip yine de kendi görüşünü ortaya koymaktır.

**Hedef:** Karşıt görüşleri kabul ederek kendi fikrini gerekçeleriyle düzenli biçimde savunabilirsin.

**Ana kural**

| Bağlantı | Arkasından | Örnek |
|---|---|---|
| although / even though | cümle | Although it was late, we continued. |
| despite / in spite of | isim ya da -ing | Despite the rain, we went out. · Despite feeling tired, she finished. |
| whereas / while | cümle (karşılaştırma) | I like tea, whereas my wife prefers coffee. |
| however | yeni cümle (zıtlık) | It's expensive. However, it's worth it. |
| on the other hand | yeni cümle (öteki taraf) | On the other hand, it's very slow. |
| as a result / therefore | yeni cümle (sonuç) | Prices rose. As a result, sales fell. |

**Diyalog: ev toplantısı**

**Mivo:** I think we should get a cleaner. The house is always messy.  
**{{name}}:** **Although** it's a good idea, it's quite expensive.  
**Mivo:** True. **However**, we'd save a lot of time.  
**{{name}}:** **Despite** the cost, I agree it could help. Maybe once a month?  
**Mivo:** Good idea. Leo works from home, **whereas** we're out all day. **As a result**, he cleans more.  
**{{name}}:** Then let's ask Leo too.

**Fark et:** **although** + cümle (it's a good idea), **despite** + isim (the cost). **whereas** iki durumu karşılaştırıyor. **however** ve **as a result** yeni cümleyi öncekine bağlıyor.

**Ne zaman kullanılır?**
- **Bir fikri savunurken karşı noktayı kabul etmek:** Although the plan is risky, I think we should try. · Despite the problems, the project was a success.
- **İki şeyi karşılaştırmak ve sonuca bağlamak:** City life is exciting, whereas village life is calm. · The trains were cancelled. As a result, many people worked from home.

**Sık hatalar**
- ✗ Despite it was raining… → ✓ **Although** it was raining… / Despite **the rain**… *(genel)* **Hatırla:** despite'tan sonra cümle gelmez.
- ✗ Although it was late, but we continued. → ✓ Although it was late, we continued. *(genel)* **Hatırla:** although ve but aynı cümlede olmaz.
- ✗ However it's expensive, I'll buy it. → ✓ **Although** it's expensive, I'll buy it. *(genel)* **Hatırla:** however iki cümleyi birleştirmez; yeni bir cümleye başlar.

**Alıştırma**
1. **Bağla:** The plan is expensive. It could save time in the long term. (Although)
2. **Seç:** ___ the delay, the team delivered on time. (Although / Despite)
3. **Birleştir:** The first option is cheaper. The second is more reliable. (whereas)
4. **Düzelt:** Despite the road was closed, we arrived on time.
5. **Kur:** Uzaktan çalışmanın bir yararını ve bir sakıncasını however ya da on the other hand ile anlat.
6. **Sesli üret:** Bir değişiklik öner; önce ana fikrini, sonra bir karşı görüşü ve ona cevabını ver.

**Yanıt ve geri bildirim**
1. **Although the plan is expensive, it could save time in the long term.**
2. **Despite.** Arkasından isim (the delay) geliyor.
3. **The first option is cheaper, whereas the second is more reliable.**
4. **Despite the road closure, we arrived on time.** ya da **Although the road was closed, we arrived on time.**
5. Örnek: Working from home saves time. On the other hand, you can feel lonely.
6. Söylem işaretleri, düşüncenin mantığını görünür kılmalı; sırf resmî görünsün diye eklenmemeli.

**Mivo ile kısa alıştırma:** Mivo ev arkadaşındır. Evin bir sorunu hakkında bir öneri getirir; sen karşı görüşünü söyler ve ortak bir karara varırsınız. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #41

## 42. Olumsuz vurgu

**Künye:** B2 · Ana hedef: olumsuz ve sınırlayıcı ifadelerden sonra devrik yapı (Never have I…, Not only…, Rarely…) · Yardımcı: her öne alınan ifade devriklik yaratmaz

**Bu derste öğreneceklerin**

- **Devrik yapı:** Olumsuz/sınırlayıcı ifade + yardımcı fiil + özne
- **Kalıplar:** Never have I…, Rarely does…, Not only… but also
- **Sınırı:** Her öne alınan ifade devriklik yaratmaz

**Derse giriş:** "I have never seen such a view" doğru bir cümle. "Never have I seen such a view" ise aynı bilgiyi bir konuşmanın en güçlü anında söyler.

**Hedef:** Resmî konuşma ve yazıda, olumsuz bir ifadeyi cümle başına alarak güçlü bir vurgu yapabilirsin.

**Ana kural:** `olumsuz ifade + yardımcı fiil + özne + …`

| Normal | Devrik |
|---|---|
| I have never seen this. | Never **have I** seen this. |
| She rarely makes mistakes. | Rarely **does she** make mistakes. |
| It was fast and reliable. | Not only **was it** fast, but it was also reliable. |
| I didn't understand until later. | Not until later **did I** understand. |

Present simple ve past simple'da yardımcı fiil yoksa **do / does / did** eklenir.

**Her öne alma devrik değildir:** Yalnızca olumsuz ya da sınırlayıcı ifadeler (never, rarely, seldom, not only, not until, under no circumstances…) devriklik yaratır. "Yesterday I saw Sam" ya da "Sometimes I walk to work" devrik olmaz.

**Diyalog: ürün lansmanı**

**{{name}}:** **Never before has** a phone been so easy to use.  
**Mivo:** That's a strong claim! What makes it different?  
**{{name}}:** **Not only does** it last two days, **but** it **also** charges in twenty minutes.  
**Mivo:** Impressive. And the price?  
**{{name}}:** **Rarely will** you find this quality at this price.

**Fark et:** Olumsuz ya da sınırlayıcı bir ifade (Never, Not only, Rarely) cümle başına gelince yardımcı fiil özneden **önce** geliyor: Never **has a phone**…, Not only **does it**…

**Ne zaman kullanılır?**
- **Resmî konuşmalarda, sunumlarda, yazılarda güçlü vurgu için:** Never have we had such a successful year. · Under no circumstances should you open this door.
- **Etkileyici bir karşılaştırma ya da övgü için:** Not only is she talented, but she's also very kind.

Günlük sohbette bu yapı fazla resmî ve dramatik durur; yerinde ve ölçülü kullanılmalı.

**Sık hatalar**
- ✗ Rarely I have seen… → ✓ Rarely **have I** seen… *(genel)* **Hatırla:** Olumsuz ifade başta → yardımcı fiil özneden önce.
- ✗ Not only he helped… → ✓ Not only **did he help**… *(genel)* **Hatırla:** Yardımcı fiil yoksa did ekle; ana fiil yalın kalır.
- ✗ Sometimes do I walk to work. → ✓ Sometimes I walk to work. *(genel)* **Hatırla:** sometimes olumsuz değil; devriklik yok.

**Alıştırma**
1. **Dönüştür:** I had never seen such a detailed plan. (Never ile başla)
2. **Dönüştür:** She rarely makes this kind of mistake. (Rarely ile başla)
3. **Tamamla:** Not only ___ they reduce costs, but they also improved delivery times. (did / do)
4. **Düzelt:** Never I have experienced such delays.
5. **Ton karşılaştır:** "The proposal was useful." ile "Rarely has a proposal been so useful." arasındaki fark ne?
6. **Sesli üret:** Bir ürünü ya da deneyimi güçlü bir dille öv; en fazla bir devrik cümle kullan.

**Yanıt ve geri bildirim**
1. **Never had I seen such a detailed plan.**
2. **Rarely does she make this kind of mistake.**
3. **did.** Geçmiş zaman; not only başta olduğu için yardımcı fiil özneden önce.
4. **Never have I experienced such delays.**
5. **İkincisi** nadirliği ve güçlü bir değerlendirmeyi öne çıkarır; daha resmî ve retorik tınlar.
6. Devrik yapı güçlü bir vurgudur; her cümlede kullanmak doğal durmaz.

**Mivo ile kısa alıştırma:** Mivo lansmanın sunucusudur ve sorular sorar. Sen ürünü güçlü bir dille tanıtırsın. Destek: yalnızca durum.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #42

---

# İleri · C1–C2

İleri seviyede Mivo ile alıştırma destek içermez; yalnızca durum verilir. Dersler kısa tutulur; asıl pratik uzun konuşma ve yazma görevlerindedir.

## 43. Vurguyu yönet

**Künye:** C1 · Ana hedef: cleft sentences (What I need is… / It was… that…) · Yardımcı: All I… / The thing is…

**Bu derste öğreneceklerin**

- **Wh-cleft:** What we need is…
- **It-cleft:** It was Maya who…
- **All-cleft:** All I want is…
- **Kullanımı:** Vurguyu seçme ve yanlış anlamayı düzeltme

**Derse giriş:** "Maya found the solution" cümlesinde vurgu nerede? Cümlenin yapısını değiştirerek dinleyicinin dikkatini istediğin bilgiye çekebilirsin.

**Hedef:** Cümlenin hangi bilgisinin öne çıkacağını seçebilir ve dinleyicinin dikkatini yönlendirebilirsin.

**Ana kural**

| Tür | Kalıp | Normal | Vurgulu |
|---|---|---|---|
| Wh-cleft | What + cümle + is/was + vurgulanan | We need more time. | **What we need is** more time. |
| It-cleft | It is/was + vurgulanan + that/who + cümle | Maya found it. | **It was Maya who** found it. |
| All-cleft | All + cümle + is/was + vurgulanan | I want a reply. | **All I want is** a reply. |

**Diyalog: konferans soru-cevap**

**Mivo:** So, is the main problem the budget?  
**{{name}}:** No. **What** we really **need is** a clearer timeline.  
**Mivo:** But the delays started last spring, didn't they?  
**{{name}}:** Actually, **it was** the supplier change **that** caused the delays, not the budget.  
**Mivo:** Interesting. So what's your recommendation?  
**{{name}}:** **All** I'm asking for **is** two more months.

**Fark et:** Bilgi iki parçaya bölünerek öne çıkarılıyor: **What** we need **is**…, **It was**… **that**…, **All** I'm asking for **is**…

**Ne zaman kullanılır?**
- **Bir yanlış anlamayı düzeltirken:** It wasn't the price that worried me; it was the quality. · It was Leo, not Sam, who called.
- **Konuşmanın ana noktasını vurgularken:** What I'd like to focus on today is customer feedback. · The thing is, we don't have enough staff.

**Sık hatalar**
- ✗ It was Maya which found the solution. → ✓ It was Maya **who** found the solution. *(genel)* **Hatırla:** Vurgulanan kişiyse who (ya da that).
- ✗ What I want is to you listen. → ✓ What I want is **for you to listen**. *(genel)*
- ✗ What we need are more time. → ✓ What we need **is** more time. *(genel)* **Hatırla:** what-cleft çoğunlukla is alır.

**Alıştırma**
1. **Odağı seç:** "Maya found the solution on Friday." Bu cümlede hangi iki bilgi vurgulanabilir?
2. **It-cleft kur:** "Maya found the solution." Vurguyu Maya'ya ver.
3. **What-cleft kur:** "We need a clearer timeline." What we need… ile başlat.
4. **Düzelt:** It was the budget when caused the delay.
5. **Karşılaştır:** "It was the client who changed the deadline." / "What changed was the deadline." Her biri dinleyicinin dikkatini hangi bilgiye çekiyor?
6. **Sesli üret:** Bir sunumda ana sorunu ve çözümü söyle; cleft yapısını yalnızca gerçekten vurgulamak istediğin yerde kullan.

**Yanıt ve geri bildirim**
1. **Kişi (Maya) ve zaman (on Friday).**
2. **It was Maya who found the solution.**
3. **What we need is a clearer timeline.**
4. **It was the budget that caused the delay.**
5. **İlkinde kişi, ikincisinde değişen şey** öne çıkıyor.
6. Cleft yapısı yeni ya da düzeltilen bilgiyi öne çıkarmalı; her cümleyi böyle kurmak konuşmayı ağırlaştırır.

**Mivo ile kısa alıştırma:** Mivo konferansta soru soran bir dinleyicidir; bazen yanlış anlar. Sen ana noktanı vurgular ve yanlış anlamayı düzeltirsin.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #43

## 44. Temkinli konuş

**Künye:** C1 · Ana hedef: hedging (It seems / appears…, tend to, arguably, may well) · Yardımcı: kesin ve yumuşak ifadenin karşılaştırılması

**Bu derste öğreneceklerin**

- **Hedging araçları:** may, seem / appear, tend to, likely, arguably
- **Sınırlayıcılar:** in most cases, to some extent
- **Denge:** İddianın gücünü kanıtla eşleştirme

**Derse giriş:** "Bu yöntem işe yarıyor" ile "Bu yöntemin işe yaradığı görülüyor" arasında ciddi bir fark var. Birini kanıtlaman gerekir, öteki dürüst bir değerlendirmedir.

**Hedef:** Bir iddianın gücünü elindeki kanıta göre ayarlayabilir ve tonunu yumuşatabilirsin.

**Ana kural**

| Araç | Örnek |
|---|---|
| Modal | may, might, could: This may explain the drop. |
| Görünüş fiilleri | seem, appear: It seems that users prefer the old version. |
| Eğilim | tend to: People tend to forget passwords. |
| Olasılık sıfat/zarfları | likely, possibly, probably: It's likely to rain. |
| Görüş belirten zarflar | arguably, apparently: Arguably, it's the best option. |
| Sınırlayıcılar | in most cases, to some extent: To some extent, this is true. |

Temkin belirsizlik değildir: İddianın gücü kanıtla eşleşmeli. Fazla temkin mesajı zayıflatır.

**Diyalog: gecikme açıklaması**

**Mivo:** Why is the project three weeks late?  
**{{name}}:** **It appears that** the supplier **may have** underestimated the work.  
**Mivo:** So it's their fault?  
**{{name}}:** Not entirely. We **tend to** plan too optimistically. **Arguably**, we should have added more time.  
**Mivo:** And the new date?  
**{{name}}:** We'll **very likely** finish by the end of the month.

**Fark et:** Kesin konuşmak yerine kanıt düzeyine uygun ifadeler seçiliyor: **It appears that**, **may have**, **tend to**, **arguably**, **very likely**.

**Ne zaman kullanılır?**
- **Kesinleşmemiş bulguları ve tahminleri sunarken:** The results suggest that the new method may be faster. · It seems likely that prices will rise.
- **Hassas konularda tonu yumuşatırken:** There appears to be a small mistake in the invoice. · It might be better to wait.

**Sık hatalar**
- ✗ It maybe improves… → ✓ It **may improve**… *(genel)* **Hatırla:** maybe bir zarftır, modal fiil gibi kullanılmaz.
- ✗ It tends improving. → ✓ It tends **to improve**. *(genel)*
- ✗ It might possibly perhaps be true. → ✓ It **might** be true. *(genel)* **Hatırla:** Tek bir temkin işareti yeterli.

**Alıştırma**
1. **Yumuşat:** "The new design solves the problem." Deneme sayısı az; may ile temkinli söyle.
2. **Kanıt düzeyi:** "500 katılımcının hepsinde aynı sonuç çıktı." Bu veri "proves" demek için yeterli mi, yoksa "strongly suggests" mi daha doğru?
3. **Tamamla:** Customers ___ prefer shorter instructions. (tend / tend to)
4. **Düzelt:** It maybe indicates that the change was successful.
5. **İyileştir:** "This proves the app is better. Everyone likes it." Verinin sınırlı olduğunu kabul eden iki cümle yaz.
6. **Sesli üret:** Henüz kesinleşmemiş bir bulguyu sun: bulgu, olası açıklama ve sınırlılık.

**Yanıt ve geri bildirim**
1. **The new design may help solve the problem.**
2. **strongly suggests.** Tutarlı sonuç güçlü bir kanıttır, ama tek bir grup genel bir iddiayı kesin olarak kanıtlamaz.
3. **tend to.**
4. **It may indicate that the change was successful.**
5. Örnek: The results suggest that many users prefer the app. However, the sample is small, so more research is needed.
6. Temkin, belirsiz konuşmak değil, iddianın gücünü kanıtla eşleştirmektir.

**Mivo ile kısa alıştırma:** Mivo projesi geciken bir müşteridir. Sen gecikmeyi suçlamadan ve abartmadan açıklarsın, yeni bir tarih önerirsin.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #44

## 45. Resmî koşul

**Künye:** C1 · Ana hedef: Should you…, Were we to…, Had I known… · Yardımcı: if'li karşılıklarıyla karşılaştırma

**Bu derste öğreneceklerin**

- **Should you…:** Olası koşul (first)
- **Were we to…:** Hayali koşul (second)
- **Had I known…:** Geçmiş koşul (third)
- **Olumsuz devrik koşul:** Had I not…

**Derse giriş:** Resmî bir e-postada "If you have any questions" yerine sıklıkla "Should you have any questions" yazılır. Anlam aynı, ton farklı.

**Hedef:** Koşul cümlelerini resmî bir dille ve if kullanmadan kurabilirsin.

**Ana kural**

| if'li | Resmî (devrik) | Koşul türü |
|---|---|---|
| If you need help, … | **Should you need** help, … | Olası (first) |
| If we expanded, … | **Were we to expand**, … | Hayali (second) |
| If I had known, … | **Had I known**, … | Geçmiş (third) |

Olumsuzda not sonra gelir: **Had I not** seen it… (Hadn't I seen değil).

**Diyalog: otel şikâyeti**

**Mivo:** My room was noisy all night. This is unacceptable.  
**{{name}}:** I do apologise. **Had we known** about the noise, we **would have moved** you immediately.  
**Mivo:** What are you going to do about it?  
**{{name}}:** **Should you wish** to stay another night, it will be free of charge.  
**Mivo:** And if this happens again?  
**{{name}}:** **Were** that **to happen**, we would refund your entire stay.

**Fark et:** if düşüyor ve fiil öne geçiyor: **Had we known** (= If we had known), **Should you wish** (= If you wish), **Were that to happen** (= If that happened).

**Ne zaman kullanılır?**
- **Resmî yazışmalar, sözleşmeler, müşteri iletişimi:** Should you have any questions, please contact us. · Should the item be damaged, we will replace it.
- **Resmî konuşmalarda varsayım ve pişmanlık:** Were the company to close, hundreds of jobs would be lost. · Had we acted sooner, we could have prevented this.

**Sık hatalar**
- ✗ Should you will need… → ✓ Should you **need**… *(genel)* **Hatırla:** should'dan sonra yalın fiil.
- ✗ Had I knew… → ✓ Had I **known**… *(genel)*
- ✗ Hadn't we left early, … → ✓ **Had we not** left early, … *(genel)* **Hatırla:** Devrik yapıda olumsuzluk kısaltılmaz.

**Alıştırma**
1. **Dönüştür:** If you need assistance, contact our team. (Should ile başla)
2. **Dönüştür:** If the company were to expand, costs would rise. (Were ile başla)
3. **Dönüştür:** If the item had been registered, the repair would have been covered. (Had ile başla)
4. **Düzelt:** Should you will require a replacement, contact us.
5. **Koşul türü:** "Had the form been submitted on time, the application would have been reviewed." Bu hangi koşul türü?
6. **Sesli üret:** Bir hizmetin koşullarını bir müşteriye resmî ama anlaşılır bir dille açıkla; gerekiyorsa hemen ardından sade bir dille tekrar et.

**Yanıt ve geri bildirim**
1. **Should you need assistance, contact our team.**
2. **Were the company to expand, costs would rise.**
3. **Had the item been registered, the repair would have been covered.**
4. **Should you require a replacement, contact us.**
5. **Geçmişte gerçekleşmemiş koşul (third conditional).**
6. Devrik yapı resmî bir ton verir; koşulun kendisi açık ve anlaşılır kalmalı.

**Mivo ile kısa alıştırma:** Mivo şikâyetçi bir otel misafiridir. Sen otel müdürü olarak özür diler, resmî koşullarla telafi teklif eder ve ilişkiyi korursun.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #45

## 46. Akademik isimleştirme

**Künye:** C1 · Ana hedef: nominalisation (decide → decision, the introduction of…) · Yardımcı: ne zaman kullanılmamalı

**Bu derste öğreneceklerin**

- **Nominalisation:** Fiil ve sıfatları isme dönüştürme (decide → decision)
- **Kalıplar:** an increase in, the introduction of, analysis of
- **Ne zaman kullanılmamalı:** Açıklığı bozan yoğunlaştırma

**Derse giriş:** "We introduced a new process and delays fell" ile "The introduction of a new process led to a reduction in delays" aynı şeyi söyler. İkincisi raporlarda daha yaygındır, ama her zaman daha iyi değildir.

**Hedef:** Bir süreci ya da bulguyu isimleştirmeyle yoğunlaştırabilir ve gerektiğinde açık fiilli anlatıma dönebilirsin.

**Ana kural:** `fiil / sıfat → isim + of / in`

| Fiil, sıfat | İsim | Örnek |
|---|---|---|
| decide | decision | the decision to close the shop |
| analyse | analysis | our analysis of the data |
| increase / reduce | an increase in / a reduction in | an increase in costs |
| available | availability | the availability of tickets |
| fail | failure | the failure of the system |

**Ne zaman kullanılmamalı?** İsimleştirme eylemi yapanı ve neden-sonuç ilişkisini gizleyebilir. "The implementation of improvements was performed by us" yerine "We improved it" daha açıktır. Konuşmada ve günlük e-postalarda fiilli anlatım genelde daha iyidir.

**Diyalog: akademik sunum**

**Mivo:** So what did your study show, {{name}}?  
**{{name}}:** **The introduction of** a four-day week led to **an increase in** productivity.  
**Mivo:** Can you say that more simply?  
**{{name}}:** Sure. When the company introduced a four-day week, people worked better.  
**Mivo:** Good. Both versions are useful in different places.

**Fark et:** İlk cümlede eylemler isme dönüşmüş: introduce → **the introduction of**, increase → **an increase in**. İkinci cümlede aynı bilgi fiillerle, daha sade anlatılıyor.

**Ne zaman kullanılır?**
- **Raporlarda, özetlerde, başlıklarda yoğun ve nesnel bir dil için:** The reduction in staff caused delays. · Analysis of the results shows a clear trend.
- **Bir fikri bir sonraki cümlede konu olarak kullanmak için:** Prices rose sharply. This increase affected small businesses most.

**Sık hatalar**
- ✗ The implementation of improvements was performed by us. → ✓ **We implemented** improvements. *(genel)* **Hatırla:** Gereksiz isimleştirme açıklığı azaltır.
- ✗ The analyse of the data showed… → ✓ The **analysis** of the data showed… *(genel)* **Hatırla:** İsimleştirmede fiil değil isim biçimi kullanılır.

**Alıştırma**
1. **İsimleştir:** The team decided to extend the trial. ("The team's decision…" ile başla)
2. **Fiilli anlatıma dön:** The implementation of the new policy resulted in a reduction in costs.
3. **Karşılaştır:** "We reviewed the data." / "Our review of the data…" İkincisi hangi bağlamda daha doğal olabilir?
4. **Düzelt:** The development of a solution was completed by the engineers.
5. **Akademik cümle kur:** "Researchers measured the response time and found that it decreased." Kısa bir isimleştirmeyle yeniden yaz.
6. **Sesli üret:** Bir bulguyu önce sade, fiilli bir İngilizceyle, sonra rapor diliyle anlat; hangisinin daha anlaşılır olduğunu değerlendir.

**Yanıt ve geri bildirim**
1. **The team's decision to extend the trial…**
2. **The new policy reduced costs.** Etken fiil daha kısa ve açık.
3. **Bir başlıkta, rapor bölümünde ya da bir sonraki cümlede konu olarak** kullanılacaksa.
4. **The engineers developed a solution.**
5. **Measurements showed a decrease in response time.**
6. Akademik ton için isimleştirme seçilebilir, ama eylemi yapan ve neden-sonuç kaybolmamalı.

**Mivo ile kısa alıştırma:** Mivo seminerdeki hocadır. Bulguyu önce rapor diliyle sunarsın; Mivo sadeleştirmeni ister ve soru sorar.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #46

## 47. Akıcı söylem

**Künye:** C2 · Ana hedef: söylem içinde ellipsis ve substitution (so, do, one), gönderim takibi (this, such, the former / the latter) · Yardımcı: —

**Bu derste öğreneceklerin**

- **Substitution:** so, not, do, one
- **Ellipsis:** Bağlamdan anlaşılan kısmı düşürme
- **Gönderim:** this, such, the former / the latter
- **Kural:** Her kısaltmanın neyi gösterdiği açık olmalı

**Derse giriş:** İleri seviyede konuşan biri aynı bilgiyi tekrar etmez. Ama kısaltırken dinleyicinin neyin neyi gösterdiğini takip edebilmesi gerekir.

**Hedef:** Gereksiz tekrarı kaldırıp konuşmanı ve yazını akıcı hâle getirirken gönderimleri açık tutabilirsin.

**Ana kural**

| Araç | Neyin yerini alır? | Örnek |
|---|---|---|
| so / not | Bir cümlenin tamamı | "Is it open?" "I think so." / "I hope not." |
| do / does / did | Fiil öbeği | She works harder than I do. |
| one / ones | Sayılabilen isim | I prefer the smaller one. |
| Ellipsis | Bağlamdan anlaşılan kısım | I can come, but Leo can't. |
| this / that / such | Önceki fikir | This shows that… · Such problems are common. |
| the former / the latter | İki seçenekten ilki / ikincisi | Rome or Paris? The latter. |

Kural: Kısaltılmış her ifadenin neyi gösterdiği **tek ve açık** olmalı. İkiden fazla seçenek varsa ya da gönderim belirsizse adı tekrar et.

**Diyalog: podcast röportajı**

**Mivo:** {{name}}, you've lived in two very different cities. Which did you prefer?  
**{{name}}:** Honestly, both. **The former** was exciting; **the latter** was calmer.  
**Mivo:** Would you move back?  
**{{name}}:** I might. My partner certainly **would**.  
**Mivo:** And do you think city life is getting harder?  
**{{name}}:** I think **so**. **This** is something many people feel, but few talk about.

**Fark et:** Tekrar eden bilgi düşüyor ya da kısa bir kelimeyle gösteriliyor: **The former / the latter** (iki şehir), **would** (= would move back), **so** (= city life is getting harder), **This** (önceki fikrin tamamı).

**Ne zaman kullanılır?**
- **Konuşmayı doğal ve tekrarsız tutmak için:** "Are you coming?" "I hope so." · I didn't like the first film, but I liked the second one.
- **Yazıda fikirler arasında bağ kurmak için:** Costs rose by 20%. This forced many shops to close. · We considered two options. The latter proved cheaper.

**Sık hatalar**
- ✗ I think yes. → ✓ I think **so**. *(genel)*
- ✗ The former / the latter (üç seçenek varken) → ✓ seçeneğin adını tekrar et *(genel)* **Hatırla:** former ve latter yalnızca iki seçenek için.
- ✗ Some chose the early train, others the late. → ✓ …others **the later one**. *(genel)*

**Alıştırma**
1. **Tekrarı azalt:** "I thought the plan would work, and it did work." (do ile)
2. **Yerine koy:** "I need a charger. Do you have a spare charger?" (one ile)
3. **Kısalt:** "Maya can attend the meeting, and Leo can attend the meeting too."
4. **Gönderimi bul:** "The online course is cheaper than the classroom course, but the latter offers more interaction." Latter hangisi?
5. **Belirsizliği düzelt:** "We spoke to the director after she reviewed the report, which changed her mind." Neyin fikrini değiştirdiği belirsiz. Cümleyi iki olası anlam için açıkça yeniden yaz.
6. **Sesli üret:** Bir toplantıdaki kararı 30 saniyede özetle; bilinen bilgiyi tekrar etmeden, gönderimleri açık tutarak.

**Yanıt ve geri bildirim**
1. **I thought the plan would work, and it did.**
2. **Do you have a spare one?**
3. **Maya can attend the meeting, and so can Leo.** ya da **…and Leo can too.**
4. **The classroom course.** Latter, iki seçenekten ikincisi.
5. Örnek: **After reviewing the report, the director changed her mind.** (fikrini rapor değiştirdi) / **We spoke to the director, and our conversation changed her mind.** (fikrini konuşma değiştirdi)
6. Kısaltma yalnızca dinleyici neyin neyi gösterdiğini takip edebildiğinde işe yarar.

**Mivo ile kısa alıştırma:** Mivo podcast sunucusudur. Hayatın ve deneyimlerin hakkında sorular sorar; sen akıcı ve tekrarsız cevap verirsin.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #47

---

# İleri uygulama üniteleri

Bu iki ünitede yeni bir gramer kuralı yoktur. Önceki derslerde öğrenilenler gerçek mesajlarda, farklı kişilere göre kullanılır.

## U1. Aynı mesaj, üç ton

**Hedef:** Aynı bilgiyi bir arkadaşa, bir hizmet görevlisine ve resmî bir kuruma uygun tonda iletebilirsin.

**Görev:** Bir randevuya geç kalacaksın ve yeni bir saat önermek istiyorsun.

**Örnekler**

| Ton | Mesaj |
|---|---|
| Samimi | Hey, I'm running late. Could we meet at six instead? |
| Kibar | I'm sorry, but I'm running a little late. Would it be possible to meet at six? |
| Resmî | I apologise for the delay. Would you be available to reschedule our meeting for 6 p.m.? |

**Tonu değiştiren şeyler:** selamlama, özür biçimi, modal seçimi (can / could / would you be able to), doğrudanlık, kapanış.

**Akış**
1. Arkadaşına geç kalacağını söyle.
2. Aynı bilgiyi otel resepsiyonuna kibar bir tonda ilet.
3. Aynı mesajı resmî bir iş e-postasına dönüştür.
4. Her sürümde değişmeyen bilgiyi ve kişiye göre değişen dil seçimlerini işaretle.
5. Mivo bir ifadeyi fazla doğrudan ya da fazla resmî bulursa mesajı yeniden kur.

**Başarı ölçütü:** Saat ve istek üç sürümde de aynı kalır; selamlama, modal ve özür düzeyi kişiye göre değişir. Resmî olmak, mesajı gereksiz uzatmak demek değildir.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #U1

## U2. Diplomatik iletişim

**Hedef:** Olumsuz bir cevabı açık, saygılı ve ilişkiyi koruyan bir dille iletebilirsin.

**Görev:** Bir iş ortağının teklifini kabul edemiyorsun; nedenini açıkla ve uygulanabilir bir alternatif öner.

**Örnek:** Thank you for the proposal. I'm afraid we can't proceed with it in its current form, as the timeline is too short for our team. Could we revisit the plan next month?

**Kullanılan araçlar:** temkinli dil (#44), resmî koşul (#45), vurgu (#43), özür ve teşekkür kalıpları.

**Akış**
1. Teklifin hangi kısmını kabul edemediğini açıkça yaz.
2. Kısa ve doğru bir gerekçe ekle.
3. Karşı tarafın emeğini takdir et.
4. Gerçekçi bir alternatif ya da sonraki adım öner.
5. Mivo kararın belirsiz kaldığını ya da tonun fazla sert olduğunu gösterirse metni bir kez daha düzenle.

**Başarı ölçütü:** Okuyan kişi kararı, nedenini ve sonraki adımı anlayabilmeli. Nezaket kararı belirsizleştirmemeli; diplomatik dil gerçeği saklamamalı.

**Sesli sahne:** [yeni-mufredat.md](yeni-mufredat.md) #U2

---

# İçerik kontrol listesi

Her ders yayına girmeden önce:

- [ ] Derse giriş ve açıklamalar hiçbir ana dile atıf yapmıyor mu?
- [ ] Diyalog doğal mı; hedef yapı gösteri için tekrar edilmiyor mu?
- [ ] Yer tutucular yalnızca kullanıcının kendi satırlarında mı; kullanıcı hakkında he/she kullanılmıyor mu?
- [ ] Ana kural yalnızca bu dersin yapısını mı anlatıyor; sonraki derslerin yapısı alıştırmaya sızmıyor mu?
- [ ] Örnekler günlük hayattan ve seviyeye uygun mu?
- [ ] Ana dil notlarında her dil için somut bir örnek cümle var mı ve o dili ana dili olarak konuşan biri kontrol etti mi?
- [ ] Her hata gerçek bir öğrenci hatası mı; açıklaması nedenini söylüyor mu; genel ya da ana dile özel diye işaretli mi?
- [ ] Alıştırma fark etmeden üretime doğru ilerliyor mu; her sorunun cevabı ve nedeni yazılı mı?
- [ ] Sesli üretim sorusu telaffuz puanı değil, yapının doğru kullanımını mı değerlendiriyor?
- [ ] Mivo alıştırması seviyeye uygun destek veriyor mu?
