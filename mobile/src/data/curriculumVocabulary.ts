/**
 * Full CEFR-categorized vocabulary pools (A1-C2), ported directly from
 * `english_curriculum_guide.md` at the repo root. Previously this data
 * existed only in the guide document and was never surfaced in the app —
 * `curriculumData.ts`'s per-topic `targetWords` were bare strings with no
 * phonetic/translation/example attached. `findCurriculumWord` lets any
 * screen look up the full entry for a target word by name.
 */

export type CurriculumVocabWord = {
  word: string;
  phonetic: string;
  tr: string;
  exampleEn: string;
  exampleTr: string;
};

export type CefrVocabPool = {
  nouns: CurriculumVocabWord[];
  verbs: CurriculumVocabWord[];
  adjectives: CurriculumVocabWord[];
  adverbs: CurriculumVocabWord[];
  phrases: CurriculumVocabWord[];
};

export const CURRICULUM_VOCABULARY: Record<string, CefrVocabPool> = {
  A1: {
    nouns: [
      { word: 'computer', phonetic: '/kəmˈpjuː.tər/', tr: 'bilgisayar', exampleEn: 'My computer is fast.', exampleTr: 'Bilgisayarım hızlıdır.' },
      { word: 'project', phonetic: '/ˈprɒdʒ.ekt/', tr: 'proje', exampleEn: 'We have a new project.', exampleTr: 'Yeni bir projemiz var.' },
      { word: 'problem', phonetic: '/ˈprɒb.ləm/', tr: 'sorun, problem', exampleEn: 'There is a small problem.', exampleTr: 'Küçük bir problem var.' },
      { word: 'meeting', phonetic: '/ˈmiː.tɪŋ/', tr: 'toplantı', exampleEn: 'The meeting is at 2 PM.', exampleTr: "Toplantı saat 14:00'te." },
      { word: 'student', phonetic: '/ˈstjuː.dənt/', tr: 'öğrenci', exampleEn: 'He is a university student.', exampleTr: 'O bir üniversite öğrencisidir.' },
      { word: 'teacher', phonetic: '/ˈtiː.tʃər/', tr: 'öğretmen', exampleEn: 'Our teacher explains well.', exampleTr: 'Öğretmenimiz iyi açıklar.' },
      { word: 'family', phonetic: '/ˈfæm.əl.i/', tr: 'aile', exampleEn: 'I love my family.', exampleTr: 'Ailemi seviyorum.' },
      { word: 'friend', phonetic: '/frend/', tr: 'arkadaş', exampleEn: 'He is my best friend.', exampleTr: 'O benim en iyi arkadaşım.' },
      { word: 'office', phonetic: '/ˈɒf.ɪs/', tr: 'ofis', exampleEn: 'Our office is downtown.', exampleTr: 'Ofisimiz şehir merkezinde.' },
      { word: 'message', phonetic: '/ˈmes.ɪdʒ/', tr: 'mesaj', exampleEn: 'I sent a message to you.', exampleTr: 'Sana bir mesaj gönderdim.' },
      { word: 'file', phonetic: '/faɪl/', tr: 'dosya', exampleEn: 'Please download this file.', exampleTr: 'Lütfen bu dosyayı indirin.' },
      { word: 'data', phonetic: '/ˈdeɪ.tə/', tr: 'veri', exampleEn: 'The database stores data.', exampleTr: 'Veritabanı veriyi depolar.' },
      { word: 'question', phonetic: '/ˈkwes.tʃən/', tr: 'soru', exampleEn: 'Ask a question.', exampleTr: 'Bir soru sor.' },
      { word: 'answer', phonetic: '/ˈɑːn.sər/', tr: 'cevap', exampleEn: 'I know the answer.', exampleTr: 'Cevabı biliyorum.' },
      { word: 'time', phonetic: '/taɪm/', tr: 'zaman, vakit', exampleEn: 'Do you have time?', exampleTr: 'Vaktin var mı?' },
      { word: 'day', phonetic: '/deɪ/', tr: 'gün', exampleEn: 'Have a nice day.', exampleTr: 'İyi günler.' },
      { word: 'week', phonetic: '/wiːk/', tr: 'hafta', exampleEn: 'See you next week.', exampleTr: 'Gelecek hafta görüşürüz.' },
      { word: 'month', phonetic: '/mʌnθ/', tr: 'ay', exampleEn: 'We will travel next month.', exampleTr: 'Gelecek ay seyahat edeceğiz.' },
      { word: 'year', phonetic: '/jɪər/', tr: 'yıl', exampleEn: 'This year is great.', exampleTr: 'Bu yıl harika.' },
      { word: 'money', phonetic: '/ˈmʌn.i/', tr: 'para', exampleEn: 'Save your money.', exampleTr: 'Paranı biriktir.' },
    ],
    verbs: [
      { word: 'start', phonetic: '/stɑːt/', tr: 'başlamak', exampleEn: "Let's start the work.", exampleTr: 'İşe başlayalım.' },
      { word: 'finish', phonetic: '/ˈfɪn.ɪʃ/', tr: 'bitirmek', exampleEn: 'I finish my work at 5.', exampleTr: "İşimi saat 5'te bitiririm." },
      { word: 'learn', phonetic: '/lɜːn/', tr: 'öğrenmek', exampleEn: 'I learn English every day.', exampleTr: 'Her gün İngilizce öğreniyorum.' },
      { word: 'write', phonetic: '/raɪt/', tr: 'yazmak', exampleEn: 'Write your name here.', exampleTr: 'Adını buraya yaz.' },
      { word: 'read', phonetic: '/riːd/', tr: 'okumak', exampleEn: 'Read the documentation.', exampleTr: 'Dokümantasyonu oku.' },
      { word: 'speak', phonetic: '/spiːk/', tr: 'konuşmak', exampleEn: 'Can you speak English?', exampleTr: 'İngilizce konuşabilir misin?' },
      { word: 'listen', phonetic: '/ˈlɪs.ən/', tr: 'dinlemek', exampleEn: 'Listen to the audio.', exampleTr: 'Sesi dinle.' },
      { word: 'build', phonetic: '/bɪld/', tr: 'inşa etmek, kurmak', exampleEn: 'We build web applications.', exampleTr: 'Web uygulamaları inşa ediyoruz.' },
      { word: 'make', phonetic: '/meɪk/', tr: 'yapmak, üretmek', exampleEn: 'Make a plan.', exampleTr: 'Bir plan yap.' },
      { word: 'do', phonetic: '/duː/', tr: 'yapmak', exampleEn: 'Do your best.', exampleTr: 'Elinden gelenin en iyisini yap.' },
      { word: 'see', phonetic: '/siː/', tr: 'görmek', exampleEn: 'I see what you mean.', exampleTr: 'Ne demek istediğini anlıyorum.' },
      { word: 'watch', phonetic: '/wɒtʃ/', tr: 'izlemek', exampleEn: 'Watch this tutorial.', exampleTr: 'Bu öğretici videoyu izle.' },
      { word: 'help', phonetic: '/help/', tr: 'yardım etmek', exampleEn: 'Can you help me?', exampleTr: 'Bana yardım edebilir misin?' },
      { word: 'need', phonetic: '/niːd/', tr: 'ihtiyaç duymak', exampleEn: 'I need more storage.', exampleTr: 'Daha fazla depolamaya ihtiyacım var.' },
      { word: 'want', phonetic: '/wɒnt/', tr: 'istemek', exampleEn: 'I want to improve my skills.', exampleTr: 'Becerilerimi geliştirmek istiyorum.' },
      { word: 'open', phonetic: '/ˈəʊ.pən/', tr: 'açmak', exampleEn: 'Open the project folder.', exampleTr: 'Proje klasörünü aç.' },
      { word: 'close', phonetic: '/kləʊz/', tr: 'kapatmak', exampleEn: 'Close the window.', exampleTr: 'Pencereyi kapat.' },
      { word: 'send', phonetic: '/send/', tr: 'göndermek', exampleEn: 'Send the invoice.', exampleTr: 'Faturayı gönder.' },
      { word: 'receive', phonetic: '/rɪˈsiːv/', tr: 'almak, teslim almak', exampleEn: 'Did you receive the payload?', exampleTr: 'Veri paketini aldın mı?' },
      { word: 'check', phonetic: '/tʃek/', tr: 'kontrol etmek', exampleEn: 'Check the code carefully.', exampleTr: 'Kodu dikkatlice kontrol et.' },
    ],
    adjectives: [
      { word: 'new', phonetic: '/njuː/', tr: 'yeni', exampleEn: 'This is a new framework.', exampleTr: 'Bu yeni bir çerçevedir.' },
      { word: 'old', phonetic: '/əʊld/', tr: 'eski, yaşlı', exampleEn: 'The old system was slow.', exampleTr: 'Eski sistem yavaştı.' },
      { word: 'fast', phonetic: '/fɑːst/', tr: 'hızlı', exampleEn: 'We need a fast response.', exampleTr: 'Hızlı bir yanıta ihtiyacımız var.' },
      { word: 'slow', phonetic: '/sləʊ/', tr: 'yavaş', exampleEn: 'The network connection is slow.', exampleTr: 'Ağ bağlantısı yavaş.' },
      { word: 'easy', phonetic: '/ˈiː.zi/', tr: 'kolay', exampleEn: 'The setup is very easy.', exampleTr: 'Kurulum çok kolaydır.' },
      { word: 'hard', phonetic: '/hɑːd/', tr: 'zor, sert', exampleEn: 'This algorithm is hard.', exampleTr: 'Bu algoritma zordur.' },
      { word: 'simple', phonetic: '/ˈsɪm.pəl/', tr: 'basit, sade', exampleEn: 'Keep the design simple.', exampleTr: 'Tasarımı sade tutun.' },
      { word: 'important', phonetic: '/ɪmˈpɔː.tənt/', tr: 'önemli', exampleEn: 'Security is important.', exampleTr: 'Güvenlik önemlidir.' },
      { word: 'clean', phonetic: '/kliːn/', tr: 'temiz', exampleEn: 'Write clean code.', exampleTr: 'Temiz kod yaz.' },
      { word: 'small', phonetic: '/smɔːl/', tr: 'küçük', exampleEn: 'It is a small change.', exampleTr: 'Bu küçük bir değişikliktir.' },
      { word: 'big', phonetic: '/bɪɡ/', tr: 'büyük', exampleEn: 'We have a big update.', exampleTr: 'Büyük bir güncellememiz var.' },
      { word: 'good', phonetic: '/ɡʊd/', tr: 'iyi', exampleEn: 'Good job!', exampleTr: 'İyi iş!' },
      { word: 'bad', phonetic: '/bæd/', tr: 'kötü', exampleEn: 'That is a bad idea.', exampleTr: 'Bu kötü bir fikir.' },
      { word: 'ready', phonetic: '/ˈred.i/', tr: 'hazır', exampleEn: 'Are you ready?', exampleTr: 'Hazır mısın?' },
      { word: 'busy', phonetic: '/ˈbɪz.i/', tr: 'meşgul, yoğun', exampleEn: 'I am busy today.', exampleTr: 'Bugün meşgulüm.' },
    ],
    adverbs: [
      { word: 'always', phonetic: '/ˈɔːl.weɪz/', tr: 'her zaman', exampleEn: 'Always save your work.', exampleTr: 'Çalışmanızı her zaman kaydedin.' },
      { word: 'never', phonetic: '/ˈnev.ər/', tr: 'asla', exampleEn: 'Never share passwords.', exampleTr: 'Şifreleri asla paylaşmayın.' },
      { word: 'often', phonetic: '/ˈɒf.ən/', tr: 'sık sık', exampleEn: 'We meet often.', exampleTr: 'Sık sık görüşürüz.' },
      { word: 'sometimes', phonetic: '/ˈsʌm.taɪmz/', tr: 'bazen', exampleEn: 'Sometimes bugs happen.', exampleTr: 'Bazen hatalar olur.' },
      { word: 'usually', phonetic: '/ˈjuː.ʒu.ə.li/', tr: 'genellikle', exampleEn: 'I usually work from home.', exampleTr: 'Genellikle evden çalışırım.' },
      { word: 'now', phonetic: '/naʊ/', tr: 'şimdi', exampleEn: 'Start now.', exampleTr: 'Şimdi başla.' },
      { word: 'today', phonetic: '/təˈdeɪ/', tr: 'bugün', exampleEn: 'Release the patch today.', exampleTr: 'Yamayı bugün yayınlayın.' },
      { word: 'yesterday', phonetic: '/ˈjes.tə.deɪ/', tr: 'dün', exampleEn: 'I fixed it yesterday.', exampleTr: 'Dün düzelttim.' },
      { word: 'tomorrow', phonetic: '/təˈmɒr.əʊ/', tr: 'yarın', exampleEn: 'See you tomorrow.', exampleTr: 'Yarın görüşürüz.' },
      { word: 'very', phonetic: '/ˈver.i/', tr: 'çok', exampleEn: 'It is very effective.', exampleTr: 'Çok etkilidir.' },
    ],
    phrases: [
      { word: 'in front of', phonetic: '/ɪn frʌnt ɒv/', tr: 'önünde', exampleEn: 'Sit in front of the screen.', exampleTr: 'Ekranın önünde oturun.' },
      { word: 'next to', phonetic: '/nekst tuː/', tr: 'yanında', exampleEn: 'The server is next to the router.', exampleTr: 'Sunucu modemin yanındadır.' },
      { word: 'at the moment', phonetic: '/æt ðə ˈməʊ.mənt/', tr: 'şu anda', exampleEn: 'I am busy at the moment.', exampleTr: 'Şu anda meşgulüm.' },
      { word: 'on time', phonetic: '/ɒn taɪm/', tr: 'vaktinde, zamanında', exampleEn: 'Please arrive on time.', exampleTr: 'Lütfen zamanında gelin.' },
      { word: 'for example', phonetic: '/fɔːr ɪɡˈzɑːm.pəl/', tr: 'örneğin', exampleEn: 'For example, use Python.', exampleTr: 'Örneğin, Python kullanın.' },
    ],
  },

  A2: {
    nouns: [
      { word: 'application', phonetic: '/ˌæp.lɪˈkeɪ.ʃən/', tr: 'uygulama', exampleEn: 'Download the mobile application.', exampleTr: 'Mobil uygulamayı indirin.' },
      { word: 'feature', phonetic: '/ˈfiː.tʃər/', tr: 'özellik', exampleEn: 'This is a key feature.', exampleTr: 'Bu kilit bir özelliktir.' },
      { word: 'device', phonetic: '/dɪˈvaɪs/', tr: 'cihaz', exampleEn: 'Connect your device.', exampleTr: 'Cihazınızı bağlayın.' },
      { word: 'screen', phonetic: '/skriːn/', tr: 'ekran', exampleEn: 'The screen resolution is high.', exampleTr: 'Ekran çözünürlüğü yüksektir.' },
      { word: 'account', phonetic: '/əˈkaʊnt/', tr: 'hesap', exampleEn: 'Create a new user account.', exampleTr: 'Yeni bir kullanıcı hesabı oluşturun.' },
      { word: 'password', phonetic: '/ˈpɑːs.wɜːd/', tr: 'şifre, parola', exampleEn: 'Enter a strong password.', exampleTr: 'Güçlü bir şifre girin.' },
      { word: 'service', phonetic: '/ˈsɜː.vɪs/', tr: 'hizmet, servis', exampleEn: 'The cloud service is reliable.', exampleTr: 'Bulut hizmeti güvenilirdir.' },
      { word: 'customer', phonetic: '/ˈkʌs.tə.mər/', tr: 'müşteri', exampleEn: 'We care about customer feedback.', exampleTr: 'Müşteri geri bildirimlerini önemseriz.' },
      { word: 'price', phonetic: '/praɪs/', tr: 'fiyat', exampleEn: 'The price is reasonable.', exampleTr: 'Fiyat makuldür.' },
      { word: 'payment', phonetic: '/ˈpeɪ.mənt/', tr: 'ödeme', exampleEn: 'Payment was successful.', exampleTr: 'Ödeme başarılı oldu.' },
      { word: 'schedule', phonetic: '/ˈʃedʒ.uːl/', tr: 'program, takvim', exampleEn: 'Check your schedule.', exampleTr: 'Programınızı kontrol edin.' },
      { word: 'experience', phonetic: '/ɪkˈspɪə.ri.əns/', tr: 'deneyim, tecrübe', exampleEn: 'He has five years of experience.', exampleTr: 'Beş yıllık tecrübesi var.' },
      { word: 'level', phonetic: '/ˈlev.əl/', tr: 'seviye, düzey', exampleEn: 'Select your difficulty level.', exampleTr: 'Zorluk seviyenizi seçin.' },
      { word: 'result', phonetic: '/rɪˈzʌlt/', tr: 'sonuç', exampleEn: 'The search result is empty.', exampleTr: 'Arama sonucu boştur.' },
      { word: 'reason', phonetic: '/ˈriː.zən/', tr: 'sebep, neden', exampleEn: 'What is the reason for this bug?', exampleTr: 'Bu hatanın sebebi nedir?' },
    ],
    verbs: [
      { word: 'create', phonetic: '/kriˈeɪt/', tr: 'oluşturmak, yaratmak', exampleEn: 'Create a database schema.', exampleTr: 'Bir veritabanı şeması oluşturun.' },
      { word: 'improve', phonetic: '/ɪmˈpruːv/', tr: 'geliştirmek, iyileştirmek', exampleEn: 'Improve performance.', exampleTr: 'Performansı iyileştirin.' },
      { word: 'develop', phonetic: '/dɪˈvel.əp/', tr: 'geliştirmek', exampleEn: 'We develop cross-platform apps.', exampleTr: 'Platformlar arası uygulamalar geliştiriyoruz.' },
      { word: 'change', phonetic: '/tʃeɪndʒ/', tr: 'değiştirmek', exampleEn: 'Change your settings.', exampleTr: 'Ayarlarınızı değiştirin.' },
      { word: 'choose', phonetic: '/tʃuːz/', tr: 'seçmek', exampleEn: 'Choose the correct option.', exampleTr: 'Doğru seçeneği seçin.' },
      { word: 'decide', phonetic: '/dɪˈsaɪd/', tr: 'karar vermek', exampleEn: 'Decide on the tech stack.', exampleTr: 'Teknoloji yığınına karar verin.' },
      { word: 'explain', phonetic: '/ɪkˈspleɪn/', tr: 'açıklamak', exampleEn: 'Can you explain this function?', exampleTr: 'Bu fonksiyonu açıklayabilir misiniz?' },
      { word: 'share', phonetic: '/ʃeər/', tr: 'paylaşmak', exampleEn: 'Share the repository link.', exampleTr: 'Depo bağlantısını paylaşın.' },
      { word: 'save', phonetic: '/seɪv/', tr: 'kaydetmek, biriktirmek', exampleEn: 'Save changes to file.', exampleTr: 'Değişiklikleri dosyaya kaydedin.' },
      { word: 'delete', phonetic: '/dɪˈliːt/', tr: 'silmek', exampleEn: 'Delete unused records.', exampleTr: 'Kullanılmayan kayıtları silin.' },
      { word: 'connect', phonetic: '/kəˈnekt/', tr: 'bağlanmak, bağlamak', exampleEn: 'Connect to the remote host.', exampleTr: 'Uzak sunucuya bağlanın.' },
      { word: 'fix', phonetic: '/fɪks/', tr: 'düzeltmek, onarmak', exampleEn: 'Fix the broken link.', exampleTr: 'Kırık bağlantıyı düzeltin.' },
      { word: 'prepare', phonetic: '/prɪˈpeər/', tr: 'hazırlamak', exampleEn: 'Prepare the test data.', exampleTr: 'Test verisini hazırlayın.' },
      { word: 'describe', phonetic: '/dɪˈskraɪb/', tr: 'tanımlamak, tarif etmek', exampleEn: 'Describe the architecture.', exampleTr: 'Mimarisi tarif edin.' },
      { word: 'install', phonetic: '/ɪnˈstɔːl/', tr: 'kurmak, yüklemek', exampleEn: 'Install the dependencies.', exampleTr: 'Bağımlılıkları yükleyin.' },
    ],
    adjectives: [
      { word: 'useful', phonetic: '/ˈjuːs.fəl/', tr: 'faydalı, kullanışlı', exampleEn: 'This tool is very useful.', exampleTr: 'Bu araç çok faydalıdır.' },
      { word: 'expensive', phonetic: '/ɪkˈspen.sɪv/', tr: 'pahalı', exampleEn: 'Dedicated servers are expensive.', exampleTr: 'Özel sunucular pahalıdır.' },
      { word: 'cheap', phonetic: '/tʃiːp/', tr: 'ucuz', exampleEn: 'Shared hosting is cheap.', exampleTr: 'Paylaşımlı barındırma ucuzdur.' },
      { word: 'different', phonetic: '/ˈdɪf.ər.ənt/', tr: 'farklı', exampleEn: 'We tried a different approach.', exampleTr: 'Farklı bir yaklaşım denedik.' },
      { word: 'similar', phonetic: '/ˈsɪm.ɪ.lər/', tr: 'benzer', exampleEn: 'The two frameworks are similar.', exampleTr: 'İki çatı birbirine benzerdir.' },
      { word: 'correct', phonetic: '/kəˈrekt/', tr: 'doğru', exampleEn: 'Ensure the format is correct.', exampleTr: 'Biçimin doğru olduğundan emin olun.' },
      { word: 'wrong', phonetic: '/rɒŋ/', tr: 'yanlış', exampleEn: 'The token was wrong.', exampleTr: 'Belirteç yanlıştı.' },
      { word: 'possible', phonetic: '/ˈpɒs.ə.bəl/', tr: 'mümkün', exampleEn: 'Is it possible to optimize this?', exampleTr: 'Bunu optimize etmek mümkün mü?' },
      { word: 'available', phonetic: '/əˈveɪ.lə.bəl/', tr: 'mevcut, müsait', exampleEn: 'The update is available now.', exampleTr: 'Güncelleme şimdi mevcuttur.' },
      { word: 'secure', phonetic: '/sɪˈkjʊər/', tr: 'güvenli', exampleEn: 'Ensure the connection is secure.', exampleTr: 'Bağlantının güvenli olduğundan emin olun.' },
    ],
    adverbs: [
      { word: 'quickly', phonetic: '/ˈkwɪk.li/', tr: 'hızlıca', exampleEn: 'The query executes quickly.', exampleTr: 'Sorgu hızlıca çalışır.' },
      { word: 'carefully', phonetic: '/ˈkeə.fəl.i/', tr: 'dikkatlice', exampleEn: 'Read the logs carefully.', exampleTr: 'Günlükleri dikkatlice okuyun.' },
      { word: 'easily', phonetic: '/ˈiː.zəl.i/', tr: 'kolayca', exampleEn: 'You can easily integrate it.', exampleTr: 'Onu kolayca entegre edebilirsiniz.' },
      { word: 'already', phonetic: '/ɔːlˈred.i/', tr: 'zaten, şimdiden', exampleEn: 'I have already pushed the code.', exampleTr: 'Kodu şimdiden gönderdim.' },
      { word: 'recently', phonetic: '/ˈriː.sənt.li/', tr: 'son zamanlarda', exampleEn: 'We recently upgraded the system.', exampleTr: 'Sistemi son zamanlarda yükselttik.' },
      { word: 'probably', phonetic: '/ˈprɒb.ə.bli/', tr: 'muhtemelen', exampleEn: 'It will probably finish soon.', exampleTr: 'Muhtemelen yakında bitecek.' },
    ],
    phrases: [
      { word: 'as soon as possible', phonetic: '/æz suːn æz ˈpɒs.ə.bəl/', tr: 'mümkün olan en kısa sürede', exampleEn: 'Reply as soon as possible.', exampleTr: 'Mümkün olan en kısa sürede yanıtlayın.' },
      { word: 'in order to', phonetic: '/ɪn ˈɔː.dər tuː/', tr: '-mek için, amacıyla', exampleEn: 'Run this script in order to build.', exampleTr: 'Derlemek amacıyla bu betiği çalıştırın.' },
      { word: 'according to', phonetic: '/əˈkɔː.dɪŋ tuː/', tr: '-e göre', exampleEn: 'According to the docs, it is deprecated.', exampleTr: 'Dokümanlara göre kullanımdan kaldırılmıştır.' },
    ],
  },

  B1: {
    nouns: [
      { word: 'environment', phonetic: '/ɪnˈvaɪ.rən.mənt/', tr: 'ortam, çevre', exampleEn: 'Deploy to production environment.', exampleTr: 'Canlı ortama dağıtın.' },
      { word: 'architecture', phonetic: '/ˈɑː.kɪ.tek.tʃər/', tr: 'mimari, yapı', exampleEn: 'Microservice architecture is scalable.', exampleTr: 'Mikroservis mimarisi ölçeklenebilirdir.' },
      { word: 'database', phonetic: '/ˈdeɪ.tə.beɪs/', tr: 'veritabanı', exampleEn: 'Query the PostgreSQL database.', exampleTr: 'PostgreSQL veritabanını sorgulayın.' },
      { word: 'performance', phonetic: '/pəˈfɔː.məns/', tr: 'performans, verim', exampleEn: 'Monitor system performance.', exampleTr: 'Sistem performansını izleyin.' },
      { word: 'security', phonetic: '/sɪˈkjʊə.rə.ti/', tr: 'güvenlik', exampleEn: 'Security is our highest priority.', exampleTr: 'Güvenlik en yüksek önceliğimizdir.' },
      { word: 'request', phonetic: '/rɪˈkwest/', tr: 'istek, talep', exampleEn: 'The HTTP request timed out.', exampleTr: 'HTTP isteği zaman aşımına uğradı.' },
      { word: 'response', phonetic: '/rɪˈspɒns/', tr: 'yanıt, cevap', exampleEn: 'Parse the JSON response.', exampleTr: 'JSON yanıtını ayrıştırın.' },
      { word: 'solution', phonetic: '/səˈluː.ʃən/', tr: 'çözüm', exampleEn: 'Propose an optimal solution.', exampleTr: 'En uygun çözümü önerin.' },
      { word: 'maintenance', phonetic: '/ˈmeɪn.tən.əns/', tr: 'bakım', exampleEn: 'Scheduled server maintenance.', exampleTr: 'Planlanmış sunucu bakımı.' },
      { word: 'requirement', phonetic: '/rɪˈkwaɪə.mənt/', tr: 'gereksinim, şart', exampleEn: 'Review the project requirements.', exampleTr: 'Proje gereksinimlerini gözden geçirin.' },
    ],
    verbs: [
      { word: 'implement', phonetic: '/ˈɪm.plɪ.ment/', tr: 'uygulamak, hayata geçirmek', exampleEn: 'Implement the OAuth protocol.', exampleTr: 'OAuth protokolünü uygulayın.' },
      { word: 'optimize', phonetic: '/ˈɒp.tɪ.maɪz/', tr: 'optimize etmek, en iyilemek', exampleEn: 'Optimize memory consumption.', exampleTr: 'Bellek tüketimini optimize edin.' },
      { word: 'configure', phonetic: '/kənˈfɪɡ.ər/', tr: 'yapılandırmak', exampleEn: 'Configure the reverse proxy.', exampleTr: 'Ters vekil sunucuyu yapılandırın.' },
      { word: 'maintain', phonetic: '/meɪnˈteɪn/', tr: 'sürdürmek, bakımını yapmak', exampleEn: 'Maintain legacy repositories.', exampleTr: 'Eski depoların bakımını yapın.' },
      { word: 'evaluate', phonetic: '/ɪˈvæl.ju.eɪt/', tr: 'değerlendirmek', exampleEn: 'Evaluate the model accuracy.', exampleTr: 'Model doğruluğunu değerlendirin.' },
      { word: 'integrate', phonetic: '/ˈɪn.tɪ.ɡreɪt/', tr: 'entegre etmek', exampleEn: 'Integrate third-party payment gateways.', exampleTr: 'Üçüncü taraf ödeme ağ geçitlerini entegre edin.' },
      { word: 'identify', phonetic: '/aɪˈden.tɪ.faɪ/', tr: 'tanımlamak, tespit etmek', exampleEn: 'Identify memory leaks.', exampleTr: 'Bellek sızıntılarını tespit edin.' },
      { word: 'prevent', phonetic: '/prɪˈvent/', tr: 'önlemek, engel olmak', exampleEn: 'Prevent SQL injection attacks.', exampleTr: 'SQL enjeksiyonu saldırılarını önleyin.' },
      { word: 'require', phonetic: '/rɪˈkwaɪər/', tr: 'gerektirmek', exampleEn: 'This task requires root privileges.', exampleTr: 'Bu görev root ayrıcalıkları gerektirir.' },
      { word: 'resolve', phonetic: '/rɪˈzɒlv/', tr: 'çözmek, gidermek', exampleEn: 'Resolve merge conflicts.', exampleTr: 'Birleştirme (merge) çakışmalarını giderin.' },
    ],
    adjectives: [
      { word: 'scalable', phonetic: '/ˈskeɪ.lə.bəl/', tr: 'ölçeklenebilir', exampleEn: 'Design a scalable backend.', exampleTr: 'Ölçeklenebilir bir arka uç tasarlayın.' },
      { word: 'efficient', phonetic: '/ɪˈfɪʃ.ənt/', tr: 'verimli, etkili', exampleEn: 'Write efficient algorithms.', exampleTr: 'Verimli algoritmalar yazın.' },
      { word: 'reliable', phonetic: '/rɪˈlaɪ.ə.bəl/', tr: 'güvenilir', exampleEn: 'We need a reliable hosting provider.', exampleTr: 'Güvenilir bir barındırma sağlayıcısına ihtiyacımız var.' },
      { word: 'complex', phonetic: '/ˈkɒm.pleks/', tr: 'karmaşık', exampleEn: 'The query logic is complex.', exampleTr: 'Sorgu mantığı karmaşıktır.' },
      { word: 'temporary', phonetic: '/ˈtem.pər.ər.i/', tr: 'geçici', exampleEn: 'Store tokens in temporary storage.', exampleTr: 'Belirteçleri geçici depolamada saklayın.' },
      { word: 'permanent', phonetic: '/ˈpɜː.mə.nənt/', tr: 'kalıcı', exampleEn: 'Save records to permanent storage.', exampleTr: 'Kayıtları kalıcı depolamaya kaydedin.' },
      { word: 'critical', phonetic: '/ˈkrɪt.ɪ.kəl/', tr: 'kritik, hayati', exampleEn: 'A critical vulnerability was found.', exampleTr: 'Kritik bir güvenlik açığı bulundu.' },
    ],
    adverbs: [
      { word: 'efficiently', phonetic: '/ɪˈfɪʃ.ənt.li/', tr: 'verimli bir şekilde', exampleEn: 'Process asynchronous events efficiently.', exampleTr: 'Eşzamansız olayları verimli bir şekilde işleyin.' },
      { word: 'properly', phonetic: '/ˈprɒp.əl.i/', tr: 'düzgünce, uygun şekilde', exampleEn: 'Configure environment variables properly.', exampleTr: 'Ortam değişkenlerini düzgünce yapılandırın.' },
      { word: 'significantly', phonetic: '/sɪɡˈnɪf.ɪ.kənt.li/', tr: 'önemli ölçüde', exampleEn: 'Caching significantly reduces latency.', exampleTr: 'Önbelleğe alma gecikmeyi önemli ölçüde azaltır.' },
      { word: 'currently', phonetic: '/ˈkʌr.ənt.li/', tr: 'şu anda, halihazırda', exampleEn: 'The team is currently refactoring the core.', exampleTr: 'Ekip şu anda çekirdeği yeniden düzenliyor.' },
    ],
    phrases: [
      { word: 'in terms of', phonetic: '/ɪn tɜːmz ɒv/', tr: 'açısından, bakımından', exampleEn: 'In terms of speed, Go excels.', exampleTr: 'Hız açısından Go öne çıkar.' },
      { word: 'due to', phonetic: '/djuː tuː/', tr: '-den dolayı, sebebiyle', exampleEn: 'The outage was due to a network glitch.', exampleTr: 'Kesinti bir ağ aksaklığından dolayıydı.' },
      { word: 'as well as', phonetic: '/æz wel æz/', tr: 'yanı sıra, ek olarak', exampleEn: 'We support Kotlin as well as TypeScript.', exampleTr: "TypeScript'in yanı sıra Kotlin'i de destekliyoruz." },
    ],
  },

  B2: {
    nouns: [
      { word: 'vulnerability', phonetic: '/ˌvʌl.nər.əˈbɪl.ə.ti/', tr: 'güvenlik açığı, zafiyet', exampleEn: 'Patch the zero-day vulnerability.', exampleTr: 'Sıfır gün güvenlik açığını yamalayın.' },
      { word: 'infrastructure', phonetic: '/ˈɪn.frəˌstrʌk.tʃər/', tr: 'altyapı', exampleEn: 'Scale the cloud infrastructure.', exampleTr: 'Bulut altyapısını ölçeklendirin.' },
      { word: 'scalability', phonetic: '/ˌskeɪ.ləˈbɪl.ə.ti/', tr: 'ölçeklenebilirlik', exampleEn: 'Design for horizontal scalability.', exampleTr: 'Yatay ölçeklenebilirlik için tasarlayın.' },
      { word: 'discrepancy', phonetic: '/dɪˈskrep.ən.si/', tr: 'tutarsızlık, uyuşmazlık', exampleEn: 'Investigate data discrepancies.', exampleTr: 'Veri tutarsızlıklarını araştırın.' },
      { word: 'implementation', phonetic: '/ˌɪm.plɪ.menˈteɪ.ʃən/', tr: 'uygulama, icra, kodlama', exampleEn: 'Review the algorithm implementation.', exampleTr: 'Algoritma uygulamasını gözden geçirin.' },
      { word: 'feasibility', phonetic: '/ˌfiː.zəˈbɪl.ə.ti/', tr: 'fizibilite, uygulanabilirlik', exampleEn: 'Assess project feasibility.', exampleTr: 'Projenin uygulanabilirliğini değerlendirin.' },
      { word: 'redundancy', phonetic: '/rɪˈdʌn.dən.si/', tr: 'yedeklilik, fazlalık', exampleEn: 'Ensure hardware redundancy for high availability.', exampleTr: 'Yüksek erişilebilirlik için donanım yedekliliği sağlayın.' },
    ],
    verbs: [
      { word: 'leverage', phonetic: '/ˈliː.vər.ɪdʒ/', tr: 'kaldıraç olarak kullanmak, yararlanmak', exampleEn: 'Leverage edge computing to reduce latency.', exampleTr: 'Gecikmeyi azaltmak için uç bilişimden yararlanın.' },
      { word: 'mitigate', phonetic: '/ˈmɪt.ɪ.ɡeɪt/', tr: 'hafifletmek, azaltmak (riski)', exampleEn: 'Mitigate security risks immediately.', exampleTr: 'Güvenlik risklerini derhal azaltın.' },
      { word: 'facilitate', phonetic: '/fəˈsɪl.ɪ.teɪt/', tr: 'kolaylaştırmak, olanak sağlamak', exampleEn: 'APIs facilitate cross-service communication.', exampleTr: 'API’ler servisler arası iletişimi kolaylaştırır.' },
      { word: 'deprecate', phonetic: '/ˈdep.rə.keɪt/', tr: 'kullanımdan kaldırmak (yazılımda)', exampleEn: 'This endpoint will be deprecated in v2.', exampleTr: 'Bu uç nokta v2 sürümünde kullanımdan kaldırılacaktır.' },
      { word: 'authenticate', phonetic: '/ɔːˈθen.tɪ.keɪt/', tr: 'kimlik doğrulamak', exampleEn: 'Authenticate via JSON Web Tokens.', exampleTr: 'JSON Web Belirteçleri ile kimlik doğrulayın.' },
      { word: 'streamline', phonetic: '/ˈstriːm.laɪn/', tr: 'akıcı/verimli hale getirmek', exampleEn: 'Streamline our continuous delivery workflow.', exampleTr: 'Sürekli teslimat iş akışımızı daha akıcı ve verimli hale getirin.' },
    ],
    adjectives: [
      { word: 'comprehensive', phonetic: '/ˌkɒm.prɪˈhen.sɪv/', tr: 'kapsamlı, eksiksiz', exampleEn: 'Write comprehensive unit tests.', exampleTr: 'Kapsamlı birim testleri yazın.' },
      { word: 'redundant', phonetic: '/rɪˈdʌn.dənt/', tr: 'yedekli, gereksiz', exampleEn: 'Remove redundant calculations.', exampleTr: 'Gereksiz hesaplamaları kaldırın.' },
      { word: 'deterministic', phonetic: '/dɪˌtɜː.mɪˈnɪs.tɪk/', tr: 'belirlenimci, sonucu öngörülebilir', exampleEn: 'Ensure deterministic state management.', exampleTr: 'Belirlenimci durum yönetimi sağlayın.' },
      { word: 'sophisticated', phonetic: '/səˈfɪs.tɪ.keɪ.tɪd/', tr: 'gelişmiş, sofistike', exampleEn: 'Deploy sophisticated anomaly detection.', exampleTr: 'Gelişmiş anomali tespitini devreye alın.' },
      { word: 'concurrent', phonetic: '/kənˈkʌr.ənt/', tr: 'eşzamanlı', exampleEn: 'Handle 10,000 concurrent socket connections.', exampleTr: 'Bir defada 10.000 eşzamanlı soket bağlantısını yönetin.' },
    ],
    adverbs: [
      { word: 'substantially', phonetic: '/səbˈstæn.ʃəl.i/', tr: 'önemli ölçüde, esaslı olarak', exampleEn: 'Throughput increased substantially.', exampleTr: 'İşlem hacmi önemli ölçüde arttı.' },
      { word: 'seamlessly', phonetic: '/ˈsiːm.ləs.li/', tr: 'sorunsuz bir şekilde, kesintisizce', exampleEn: 'The system fails over seamlessly.', exampleTr: 'Sistem sorunsuz ve kesintisizce yedek sisteme geçer.' },
      { word: 'consequently', phonetic: '/ˈkɒn.sɪ.kwənt.li/', tr: 'sonuç olarak, bunun neticesinde', exampleEn: 'The build broke; consequently, deployment aborted.', exampleTr: 'Derleme bozuldu; sonuç olarak dağıtım iptal edildi.' },
    ],
    phrases: [
      { word: 'in conjunction with', phonetic: '/ɪn kənˈdʒʌŋk.ʃən wɪð/', tr: 'ile birlikte, bağlantılı olarak', exampleEn: 'Use Redis in conjunction with PostgreSQL.', exampleTr: "Redis'i PostgreSQL ile birlikte kullanın." },
      { word: 'notwithstanding', phonetic: '/ˌnɒt.wɪðˈstæn.dɪŋ/', tr: '-e rağmen, karşın', exampleEn: 'Notwithstanding the network latency, throughput remained high.', exampleTr: 'Ağ gecikmesine rağmen, işlem hacmi yüksek kaldı.' },
    ],
  },

  C1: {
    nouns: [
      { word: 'proliferation', phonetic: '/prəˌlɪf.ərˈeɪ.ʃən/', tr: 'hızlı artış, yayılma, türeme', exampleEn: 'The proliferation of IoT devices.', exampleTr: 'IoT cihazlarının hızla çoğalması.' },
      { word: 'paradigm', phonetic: '/ˈpær.ə.daɪm/', tr: 'paradigma, model, ekol', exampleEn: 'Functional programming is a powerful paradigm.', exampleTr: 'Fonksiyonel programlama güçlü bir paradigmadır.' },
      { word: 'bottleneck', phonetic: '/ˈbɒt.əl.nek/', tr: 'darboğaz, tıkanma noktası', exampleEn: 'Disk I/O is the primary bottleneck.', exampleTr: 'Disk G/Ç ana darboğazdır.' },
      { word: 'resilience', phonetic: '/rɪˈzɪl.jəns/', tr: 'dayanıklılık, esneklik', exampleEn: 'Architect systems for high network resilience.', exampleTr: 'Sistemleri yüksek ağ dayanıklılığı için mimarileyin.' },
      { word: 'heuristic', phonetic: '/hjʊəˈrɪs.tɪk/', tr: 'sezgisel yöntem, keşifsel kural', exampleEn: 'Apply heuristics to optimize pathfinding.', exampleTr: 'Yol bulmayı optimize etmek için sezgisel yöntemler uygulayın.' },
    ],
    verbs: [
      { word: 'substantiate', phonetic: '/səbˈstæn.ʃi.eɪt/', tr: 'kanıtlamak, somut verilerle doğrulamak', exampleEn: 'Substantiate your claims with benchmarks.', exampleTr: 'İddialarınızı performans testleriyle kanıtlayın.' },
      { word: 'orchestrate', phonetic: '/ˈɔː.kɪ.streɪt/', tr: 'orkestra etmek, koordine edip yönetmek', exampleEn: 'Kubernetes orchestrates containerized workloads.', exampleTr: 'Kubernetes konteynerleştirilmiş iş yüklerini orkestra eder.' },
      { word: 'delineate', phonetic: '/dɪˈlɪn.i.eɪt/', tr: 'sınırlarını çizmek, netçe tanımlamak', exampleEn: 'Delineate service boundaries clearly.', exampleTr: 'Servis sınırlarını net bir şekilde çizin.' },
      { word: 'circumvent', phonetic: '/ˌsɜː.kəmˈvent/', tr: 'etrafından dolanmak, baypas etmek', exampleEn: 'Circumvent firewall restrictions.', exampleTr: 'Güvenlik duvarı kısıtlamalarının etrafından dolanın.' },
    ],
    adjectives: [
      { word: 'ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', tr: 'her yerde bulunan, yaygın', exampleEn: 'REST APIs have become ubiquitous.', exampleTr: 'REST API’leri her yerde bulunur hale geldi.' },
      { word: 'immutable', phonetic: '/ɪˈmjuː.tə.bəl/', tr: 'değiştirilemez, sabit', exampleEn: 'State in Redux must be immutable.', exampleTr: 'Redux’taki durum (state) değiştirilemez olmalıdır.' },
      { word: 'idempotent', phonetic: '/ˌaɪ.dəmˈpəʊ.tənt/', tr: 'tek kuvvetli, aynı sonucu veren', exampleEn: 'HTTP PUT requests must be idempotent.', exampleTr: 'HTTP PUT istekleri tek kuvvetli (idempotent) olmalıdır.' },
      { word: 'meticulous', phonetic: '/məˈtɪk.jə.ləs/', tr: 'titiz, kılı kırk yaran', exampleEn: 'Perform meticulous code reviews.', exampleTr: 'Titiz kod incelemeleri gerçekleştirin.' },
    ],
    adverbs: [
      { word: 'unequivocally', phonetic: '/ˌʌn.ɪˈkwɪv.ə.kəl.i/', tr: 'kesinlikle, şüpheye yer bırakmayacak şekilde', exampleEn: 'The benchmarks unequivocally demonstrate superior performance.', exampleTr: 'Performans testleri üstün performansı şüpheye yer bırakmaksızın ortaya koymaktadır.' },
      { word: 'empirically', phonetic: '/ɪmˈpɪr.ɪ.kəl.i/', tr: 'ampirik olarak, deneysel veriye dayalı şekilde', exampleEn: 'Validate the hypothesis empirically.', exampleTr: 'Hipotezi ampirik olarak doğrulayın.' },
    ],
    phrases: [
      { word: 'in the wake of', phonetic: '/ɪn ðə weɪk ɒv/', tr: '-in ardından, neticesinde', exampleEn: 'In the wake of the outage, post-mortems were published.', exampleTr: 'Kesintinin ardından kök neden analizleri yayınlandı.' },
      { word: 'vis-à-vis', phonetic: '/ˌviːz.əˈviː/', tr: '-e kıyasla, karşısında', exampleEn: 'Performance advantages vis-à-vis monolithic stacks.', exampleTr: 'Monolitik yapılara kıyasla performans avantajları.' },
    ],
  },

  C2: {
    nouns: [
      { word: 'ubiquity', phonetic: '/juːˈbɪk.wɪ.ti/', tr: 'her yerde bulunma durumu', exampleEn: 'The ubiquity of smartphones.', exampleTr: 'Akıllı telefonların her yerde bulunurluğu.' },
      { word: 'conundrum', phonetic: '/kəˈnʌn.drəm/', tr: 'içinden çıkılmaz muamma, çetin problem', exampleEn: 'Resolving the CAP theorem conundrum.', exampleTr: 'CAP teoremi muammasını çözüme kavuşturmak.' },
      { word: 'ephemeral', phonetic: '/ɪˈfem.ər.əl/', tr: 'kısa ömürlü, gelip geçici olan şey', exampleEn: 'Manage ephemeral container instances.', exampleTr: 'Kısa ömürlü konteyner örneklerini yönetin.' },
      { word: 'panacea', phonetic: '/ˌpæn.əˈsiː.ə/', tr: 'her derde deva, sihirli çözüm', exampleEn: 'Microservices are not a universal panacea.', exampleTr: 'Mikroservisler her derde deva evrensel bir sihirli çözüm değildir.' },
    ],
    verbs: [
      { word: 'epitomize', phonetic: '/ɪˈpɪt.ə.maɪz/', tr: 'mükemmel bir örneğini oluşturmak, simgelemek', exampleEn: 'This clean architecture epitomizes best practices.', exampleTr: 'Bu temiz mimari, en iyi uygulamaları simgelemektedir.' },
      { word: 'exacerbate', phonetic: '/ɪɡˈzæs.ə.beɪt/', tr: 'daha da kötüleştirmek, şiddetlendirmek', exampleEn: 'Unindexed queries exacerbate database lockups.', exampleTr: 'İndekslenmemiş sorgular veritabanı kilitlenmelerini daha da kötüleştirir.' },
      { word: 'obfuscate', phonetic: '/ˈɒb.fʌs.keɪt/', tr: 'kasıtlı olarak anlaşılmaz hale getirmek, gizlemek', exampleEn: 'Obfuscate production JavaScript bundles.', exampleTr: 'Canlı ortam JavaScript paketlerini karartın/gizleyin.' },
    ],
    adjectives: [
      { word: 'untenable', phonetic: '/ʌnˈten.ə.bəl/', tr: 'savunulamaz, sürdürülemez', exampleEn: 'Manual deployment is an untenable strategy.', exampleTr: 'Manuel dağıtım savunulamaz bir stratejidir.' },
      { word: 'quintessential', phonetic: '/ˌkwɪn.tɪˈsen.ʃəl/', tr: 'en tipik, mükemmel örneği olan', exampleEn: 'The quintessential pattern for pub-sub messaging.', exampleTr: 'Yayınla-abone ol mesajlaşmasının en yetkin örneği olan desen.' },
      { word: 'parsimonious', phonetic: '/ˌpɑː.sɪˈməʊ.ni.əs/', tr: 'tutumlu, son derece hesaplı/tasarruflu', exampleEn: 'Write parsimonious memory allocation routines.', exampleTr: 'Bellek tahsisinde son derece tasarruflu rutinler yazın.' },
    ],
    adverbs: [
      { word: 'ostensibly', phonetic: '/ɒsˈten.sə.bli/', tr: 'görünüşte, sözde', exampleEn: 'Ostensibly designed for caching, it handles session state.', exampleTr: 'Görünüşte önbellekleme için tasarlanmış olsa da, oturum durumunu yönetir.' },
      { word: 'perfunctorily', phonetic: '/pəˈfʌŋk.tər.əl.i/', tr: 'üstünkörü, baştan savma bir şekilde', exampleEn: 'Unit tests must not be written perfunctorily.', exampleTr: 'Birim testleri asla baştan savma yazılmamalıdır.' },
    ],
    phrases: [
      { word: 'by dint of', phonetic: '/baɪ dɪnt ɒv/', tr: 'sayesinde, vasıtasıyla (büyük çaba ile)', exampleEn: 'Succeeded by dint of rigorous mathematical proofs.', exampleTr: 'Titiz matematiksel kanıtlar sayesinde başarıya ulaştı.' },
      { word: 'in the final analysis', phonetic: '/ɪn ðə ˈfaɪ.nəl əˈnæl.ə.sɪs/', tr: 'en nihayetinde, son tahlilde', exampleEn: 'In the final analysis, user experience determines adoption.', exampleTr: 'Son tahlilde, benimsenmeyi kullanıcı deneyimi belirler.' },
    ],
  },
};

export const CURRICULUM_VOCAB_LEVELS = Object.keys(CURRICULUM_VOCABULARY);

export function poolWordCount(pool: CefrVocabPool): number {
  return (
    pool.nouns.length + pool.verbs.length + pool.adjectives.length + pool.adverbs.length + pool.phrases.length
  );
}

export function poolAsList(pool: CefrVocabPool): CurriculumVocabWord[] {
  return [...pool.nouns, ...pool.verbs, ...pool.adjectives, ...pool.adverbs, ...pool.phrases];
}

/** Looks up a target word's full entry (phonetic/translation/example) across all levels. */
export function findCurriculumWord(word: string): CurriculumVocabWord | undefined {
  const target = word.trim().toLowerCase();
  for (const pool of Object.values(CURRICULUM_VOCABULARY)) {
    const match = poolAsList(pool).find((w) => w.word.toLowerCase() === target);
    if (match) return match;
  }
  return undefined;
}
