/**
 * Elle cilalanmış (doğal, tutarlı, cinsiyet-nötr) çeviriler — landing'in en görünür metinleri.
 * Makine çevirisinin tuhaflıkları düzeltildi: gereksiz noktalar, yanlış bağlam ("Konu" ≠ Subject),
 * mekanik sözcük sırası, Mivo için cinsiyet varsayımı.
 *   node scripts/i18n-polish.js   -> kataloglara uygular + scripts/i18n-overrides.json'a yazar (merge'de her zaman kazanır)
 */
const fs = require('fs');
const path = require('path');

const P = {
  // --- Hero ---
  'Sesli İngilizce sahneleri · Mivo ile': {
    en: 'English speaking scenes · with Mivo',
    es: 'Escenas para hablar inglés · con Mivo',
    pt: 'Cenas para falar inglês · com a Mivo',
    de: 'Englisch sprechen in echten Szenen · mit Mivo',
  },
  'Anlıyorsun.': { en: 'You understand.', es: 'Ya entiendes.', pt: 'Você já entende.', de: 'Du verstehst es.' },
  'Şimdi': { en: 'Now', es: 'Ahora', pt: 'Agora', de: 'Jetzt' },
  'konuş.': { en: 'speak.', es: 'habla.', pt: 'fale.', de: 'sprich.' },
  'Mivo, gerçek hayat sahnelerinde karşındaki karakteri oynar. Sen sesli konuşursun; takıldığın cümleyi anında, kendi dilinde açıklayarak düzeltir.': {
    en: 'Mivo plays the other person in real-life scenes. You speak out loud, and when you stumble, Mivo fixes the sentence on the spot and explains it in your own language.',
    es: 'Mivo interpreta al personaje de la escena y tú hablas en voz alta. Si te atascas, Mivo corrige la frase al instante y te lo explica en tu idioma.',
    pt: 'A Mivo faz o outro personagem em cenas da vida real e você fala em voz alta. Se travar, a Mivo corrige a frase na hora e explica no seu idioma.',
    de: 'Mivo spielt in Alltagsszenen dein Gegenüber, und du sprichst laut. Wenn du ins Stocken gerätst, korrigiert Mivo den Satz sofort und erklärt ihn dir in deiner Sprache.',
  },
  'Ücretsiz dene': { en: 'Try it free', es: 'Pruébalo gratis', pt: 'Experimente grátis', de: 'Kostenlos testen' },
  'Sahnelere göz at': { en: 'Browse the scenes', es: 'Ver las escenas', pt: 'Ver as cenas', de: 'Szenen ansehen' },
  'sahne · A1–B2': { en: 'scenes · A1–B2', es: 'escenas · A1–B2', pt: 'cenas · A1–B2', de: 'Szenen · A1–B2' },
  'podcast bölümü': { en: 'podcast episodes', es: 'episodios de podcast', pt: 'episódios de podcast', de: 'Podcast-Folgen' },
  'okuma hikâyesi': { en: 'reading stories', es: 'lecturas', pt: 'histórias para ler', de: 'Lesegeschichten' },
  'dilde açıklama': { en: 'explanation languages', es: 'idiomas de explicación', pt: 'idiomas de explicação', de: 'Erklärsprachen' },

  // --- Nav / footer ---
  'SSS': { en: 'FAQ', es: 'Preguntas', pt: 'Perguntas', de: 'FAQ' },
  'Günlük yol': { en: 'Daily path', es: 'Ruta diaria', pt: 'Trilha diária', de: 'Tagesplan' },
  'Giriş yap': { en: 'Log in', es: 'Iniciar sesión', pt: 'Entrar', de: 'Anmelden' },
  'Hakkımızda': { en: 'About us', es: 'Sobre nosotros', pt: 'Sobre nós', de: 'Über uns' },
  'Sıkça sorulan sorular': { en: 'Frequently asked questions', es: 'Preguntas frecuentes', pt: 'Perguntas frequentes', de: 'Häufige Fragen' },
  'Uygulamayı indir': { en: 'Get the app', es: 'Descarga la app', pt: 'Baixe o app', de: 'App laden' },
  'Gizlilik politikası': { en: 'Privacy policy', es: 'Política de privacidad', pt: 'Política de privacidade', de: 'Datenschutz' },
  'Kullanım şartları': { en: 'Terms of use', es: 'Condiciones de uso', pt: 'Termos de uso', de: 'Nutzungsbedingungen' },
  'Yasal': { en: 'Legal', es: 'Legal', pt: 'Legal', de: 'Rechtliches' },
  'İndir': { en: 'Download on', es: 'Descárgala en', pt: 'Baixe na', de: 'Laden im' },
  'İngilizceyi gerçek hayat sahnelerinde sesli prova et. Mivo karşında, düzeltme anında.': {
    en: 'Rehearse English out loud in real-life scenes, with Mivo across from you and corrections on the spot.',
    es: 'Ensaya inglés en voz alta en escenas de la vida real, con Mivo frente a ti y correcciones al instante.',
    pt: 'Ensaie inglês em voz alta em cenas da vida real, com a Mivo à sua frente e correções na hora.',
    de: 'Übe Englisch laut in Alltagsszenen – mit Mivo als Gegenüber und Korrekturen in Echtzeit.',
  },

  // --- Scenes ---
  'Otelde check-in': { en: 'Hotel check-in', es: 'Check-in en el hotel', pt: 'Check-in no hotel', de: 'Check-in im Hotel' },
  'İtalyan restoranında akşam yemeği': { en: 'Dinner at an Italian restaurant', es: 'Cena en un restaurante italiano', pt: 'Jantar em um restaurante italiano', de: 'Abendessen im italienischen Restaurant' },
  'Doktor muayenesi': { en: 'Doctor’s appointment', es: 'Cita con el médico', pt: 'Consulta médica', de: 'Arzttermin' },
  'Bitpazarında pazarlık': { en: 'Haggling at the flea market', es: 'Regateo en el mercadillo', pt: 'Pechincha na feira de antiguidades', de: 'Feilschen auf dem Flohmarkt' },
  'Havalimanında check-in': { en: 'Airport check-in', es: 'Check-in en el aeropuerto', pt: 'Check-in no aeroporto', de: 'Check-in am Flughafen' },
  'Havalimanı check-in sahnesi': { en: 'Airport check-in scene', es: 'Escena de check-in en el aeropuerto', pt: 'Cena de check-in no aeroporto', de: 'Check-in-Szene am Flughafen' },
  'Aynı sahne, her seferinde farklı bir sürpriz.': { en: 'Same scene, a different surprise every time.', es: 'La misma escena, una sorpresa distinta cada vez.', pt: 'A mesma cena, uma surpresa diferente a cada vez.', de: 'Dieselbe Szene, jedes Mal eine andere Überraschung.' },
  'Önce kısa bir videoyla sahneyi tanırsın, sonra Mivo karakteri canlı oynar. Tekrar oynadığında karşına başka bir durum çıkar: karışıklık, bitmiş ürün, aceleci bir görevli. Ezber çalışmaz, o yüzden gerçekten konuşmayı öğrenirsin.': {
    en: 'You meet the scene in a short video, then Mivo plays the character live. Play it again and something different happens: a mix-up, a sold-out item, an impatient clerk. You can’t memorize your way through, so you actually learn to speak.',
    es: 'Conoces la escena con un video corto y luego Mivo interpreta al personaje en vivo. Al repetirla, pasa algo distinto: un malentendido, un producto agotado, un empleado con prisa. No sirve memorizar, así que aprendes a hablar de verdad.',
    pt: 'Você conhece a cena em um vídeo curto e depois a Mivo interpreta o personagem ao vivo. Ao repetir, acontece algo diferente: uma confusão, um item esgotado, um atendente apressado. Decorar não funciona, então você aprende a falar de verdade.',
    de: 'Zuerst lernst du die Szene in einem kurzen Video kennen, dann spielt Mivo die Figur live. Beim nächsten Durchgang passiert etwas anderes: ein Missverständnis, ein ausverkauftes Produkt, ein eiliger Mitarbeiter. Auswendiglernen hilft nicht – so lernst du wirklich zu sprechen.',
  },
  'Her sahnede üç yıldız var': { en: 'Every scene has three stars', es: 'Cada escena tiene tres estrellas', pt: 'Cada cena tem três estrelas', de: 'Jede Szene hat drei Sterne' },
  'Videoyu bitir': { en: 'Finish the video', es: 'Termina el video', pt: 'Termine o vídeo', de: 'Video zu Ende schauen' },
  'Sahnenin kısa videosunu izle, cümleleri sesli tekrar et.': { en: 'Watch the scene’s short video and repeat the sentences out loud.', es: 'Mira el video corto de la escena y repite las frases en voz alta.', pt: 'Assista ao vídeo curto da cena e repita as frases em voz alta.', de: 'Sieh dir das kurze Video zur Szene an und sprich die Sätze laut nach.' },
  'Mivo ile canlı oyna': { en: 'Play it live with Mivo', es: 'Juégala en vivo con Mivo', pt: 'Jogue ao vivo com a Mivo', de: 'Live mit Mivo spielen' },
  'Karakteri Mivo oynar. En az dört cümle konuş.': { en: 'Mivo plays the character. Speak at least four sentences.', es: 'Mivo interpreta al personaje. Di al menos cuatro frases.', pt: 'A Mivo faz o personagem. Fale pelo menos quatro frases.', de: 'Mivo spielt die Figur. Sprich mindestens vier Sätze.' },
  'Temiz tamamla': { en: 'Finish clean', es: 'Termina sin errores', pt: 'Termine sem erros', de: 'Sauber abschließen' },
  'Sahnenin hedeflerini en fazla iki düzeltmeyle bitir.': { en: 'Reach the scene’s goals with at most two corrections.', es: 'Cumple los objetivos de la escena con dos correcciones como máximo.', pt: 'Cumpra os objetivos da cena com no máximo duas correções.', de: 'Erreiche die Ziele der Szene mit höchstens zwei Korrekturen.' },
  'Seviyene uygun sahneler açık gelir, bir üst seviye “zor” etiketiyle denenebilir. Daha ilerisi, önceki seviyeyi bitirince açılır.': {
    en: 'Scenes at your level are open from the start, and the next level up can be tried with a “hard” label. Anything beyond that unlocks once you finish the previous level.',
    es: 'Las escenas de tu nivel están abiertas desde el inicio y el nivel siguiente se puede probar con la etiqueta «difícil». Lo demás se desbloquea al terminar el nivel anterior.',
    pt: 'As cenas do seu nível já vêm abertas e o nível seguinte pode ser testado com o selo “difícil”. O resto é liberado quando você conclui o nível anterior.',
    de: 'Szenen auf deinem Niveau sind sofort offen, die nächste Stufe kannst du mit dem Label „schwierig“ ausprobieren. Alles darüber schaltet sich frei, sobald du die vorherige Stufe abgeschlossen hast.',
  },
  'Toplam 21 sahne, A1’den B2’ye.': { en: '21 scenes in total, from A1 to B2.', es: '21 escenas en total, de A1 a B2.', pt: '21 cenas no total, de A1 a B2.', de: 'Insgesamt 21 Szenen, von A1 bis B2.' },
  'Aynı sahne · 4 farklı oynayış': { en: 'Same scene · 4 ways to play it', es: 'Misma escena · 4 formas de jugarla', pt: 'Mesma cena · 4 formas de jogar', de: 'Dieselbe Szene · 4 Varianten' },
  'Aradığın yok': { en: 'Out of stock', es: 'Se ha agotado', pt: 'Está em falta', de: 'Nicht mehr da' },
  'İstediğin şey bitmiş — alternatif bul.': { en: 'What you want is sold out — find an alternative.', es: 'Lo que quieres se ha agotado: busca una alternativa.', pt: 'O que você quer acabou: encontre uma alternativa.', de: 'Was du willst, ist ausverkauft – finde eine Alternative.' },
  'Karışıklık çıktı': { en: 'A mix-up', es: 'Un malentendido', pt: 'Uma confusão', de: 'Ein Missverständnis' },
  'Bir şey yanlış gelmiş — nazikçe düzelttir.': { en: 'Something’s off — politely get it fixed.', es: 'Algo no cuadra: pide amablemente que se corrija.', pt: 'Algo não bate: peça educadamente para corrigir.', de: 'Da stimmt etwas nicht – lass es höflich korrigieren.' },
  'Acele var': { en: 'In a hurry', es: 'Con prisa', pt: 'Com pressa', de: 'Es eilt' },

  // --- Mivo section ---
  'Ad': { en: 'Name', es: 'Nombre', pt: 'Nome', de: 'Name' },
  'Konu': { en: 'Topic', es: 'Tema', pt: 'Tema', de: 'Thema' },
  'Hedef': { en: 'Goal', es: 'Objetivo', pt: 'Meta', de: 'Ziel' },
  'Vize görüşmesi': { en: 'Visa interview', es: 'Entrevista de visa', pt: 'Entrevista de visto', de: 'Visumsgespräch' },
  'Havalimanı sohbeti': { en: 'Airport chat', es: 'Charla en el aeropuerto', pt: 'Conversa no aeroporto', de: 'Gespräch am Flughafen' },
  'Mivo el sallıyor': { en: 'Mivo waving', es: 'Mivo saludando', pt: 'Mivo acenando', de: 'Mivo winkt' },
  'Mivo seni hatırlar.': { en: 'Mivo remembers you.', es: 'Mivo te recuerda.', pt: 'A Mivo lembra de você.', de: 'Mivo erinnert sich an dich.' },
  'Konu seçmek zorunda değilsin; ne istersen konuş. Mivo neler konuştuğunuzu aklında tutar, sonraki sohbete kaldığınız yerden başlar.': {
    en: 'You don’t have to pick a topic; talk about whatever you like. Mivo remembers what you discussed and picks up where you left off next time.',
    es: 'No tienes que elegir un tema: habla de lo que quieras. Mivo recuerda de qué hablaron y retoma la próxima conversación donde la dejaron.',
    pt: 'Você não precisa escolher um tema: fale do que quiser. A Mivo lembra do que vocês conversaram e retoma da próxima vez de onde pararam.',
    de: 'Du musst kein Thema wählen – sprich über alles, was dich interessiert. Mivo merkt sich, worüber ihr geredet habt, und macht beim nächsten Mal dort weiter, wo ihr aufgehört habt.',
  },
  'Tekrar hoş geldin, Ece! Geçen sefer iş mülakatından konuşmuştuk. İstersen oradan devam edelim, istersen yeni bir konu seç.': {
    en: 'Welcome back, Ece! Last time we talked about your job interview. Want to pick up from there, or choose something new?',
    es: '¡Hola de nuevo, Ece! La última vez hablamos de tu entrevista de trabajo. ¿Seguimos por ahí o eliges un tema nuevo?',
    pt: 'Que bom te ver de novo, Ece! Da última vez falamos sobre a sua entrevista de emprego. Quer continuar daí ou escolher outro tema?',
    de: 'Schön, dass du wieder da bist, Ece! Letztes Mal haben wir über dein Vorstellungsgespräch gesprochen. Möchtest du dort weitermachen oder ein neues Thema wählen?',
  },
  'Oradan devam et': { en: 'Pick up from there', es: 'Seguir por ahí', pt: 'Continuar daí', de: 'Dort weitermachen' },
  'Yeni bir konu seç': { en: 'Choose a new topic', es: 'Elegir un tema nuevo', pt: 'Escolher outro tema', de: 'Neues Thema wählen' },
  'Açıklamalar kendi dilinde': { en: 'Explanations in your language', es: 'Explicaciones en tu idioma', pt: 'Explicações no seu idioma', de: 'Erklärungen in deiner Sprache' },
  'Hedef dil hep İngilizce, açıklamalar ana dilinde.': { en: 'You always practice English; explanations come in your own language.', es: 'Siempre practicas inglés; las explicaciones llegan en tu idioma.', pt: 'Você sempre pratica inglês; as explicações vêm no seu idioma.', de: 'Du übst immer Englisch; die Erklärungen kommen in deiner Sprache.' },
  'Hafıza senin kontrolünde': { en: 'You control the memory', es: 'Tú controlas la memoria', pt: 'Você controla a memória', de: 'Du behältst die Kontrolle' },
  'Kısa notlar saklanır, tam kayıt değil. Bakabilir, düzeltebilir ya da tümünü silebilirsin.': { en: 'Only short notes are kept, not full recordings. You can view, edit or delete all of it.', es: 'Solo se guardan notas breves, no grabaciones completas. Puedes verlas, editarlas o borrarlas todas.', pt: 'Só notas curtas são guardadas, não gravações completas. Você pode ver, editar ou apagar tudo.', de: 'Gespeichert werden nur kurze Notizen, keine vollständigen Aufnahmen. Du kannst alles einsehen, ändern oder löschen.' },
  'Mivo ile serbest sohbet': { en: 'Free chat with Mivo', es: 'Charla libre con Mivo', pt: 'Conversa livre com a Mivo', de: 'Freies Gespräch mit Mivo' },

  // --- Daily path / features ---
  'Her gün tek bir sonraki adım.': { en: 'Just one next step, every day.', es: 'Un solo paso cada día.', pt: 'Um único próximo passo por dia.', de: 'Jeden Tag nur der nächste Schritt.' },
  'Ne çalışacağını seçmek için vakit harcama. Bugün sekmesi sıradaki işi gösterir; sahne, okuma ve kelimeler birbirini destekler.': {
    en: 'No time wasted deciding what to study. The Today tab shows what’s next, and scenes, reading and words support each other.',
    es: 'No pierdas tiempo decidiendo qué estudiar. La pestaña Hoy te muestra lo siguiente, y las escenas, la lectura y las palabras se refuerzan entre sí.',
    pt: 'Sem perder tempo decidindo o que estudar. A aba Hoje mostra o próximo passo, e cenas, leitura e palavras se reforçam.',
    de: 'Du musst nicht überlegen, was du lernen sollst. Der Tab „Heute“ zeigt dir den nächsten Schritt, und Szenen, Lesen und Wörter ergänzen sich.',
  },
  'Bugün': { en: 'Today', es: 'Hoy', pt: 'Hoje', de: 'Heute' },
  'Seviyene göre gün gün ilerleyen bir yol. Her gün birkaç küçük görev: konu anlatımı, okuma, podcast ve Mivo ile tekrar.': {
    en: 'A path that moves forward day by day at your level. A few small tasks each day: a lesson, reading, a podcast and a review with Mivo.',
    es: 'Un camino que avanza día a día según tu nivel. Cada día, unas pocas tareas pequeñas: lección, lectura, podcast y repaso con Mivo.',
    pt: 'Uma trilha que avança dia a dia conforme o seu nível. Todo dia, algumas tarefas pequenas: lição, leitura, podcast e revisão com a Mivo.',
    de: 'Ein Weg, der dich Tag für Tag auf deinem Niveau voranbringt. Jeden Tag ein paar kleine Aufgaben: Lektion, Lesen, Podcast und Wiederholung mit Mivo.',
  },
  'Gün 3 · Mivo ile pekiştir': { en: 'Day 3 · Reinforce with Mivo', es: 'Día 3 · Refuerza con Mivo', pt: 'Dia 3 · Reforce com a Mivo', de: 'Tag 3 · Mit Mivo festigen' },
  'Doğru yerden başla': { en: 'Start at the right level', es: 'Empieza en el nivel adecuado', pt: 'Comece no nível certo', de: 'Starte auf dem richtigen Niveau' },
  'Kısa bir seviye belirleme seni A1’den C2’ye uzanan yolda doğru basamağa koyar. İçerik ve kilitler buna göre şekillenir; hazır olduğunda üst seviyeye geçersin.': {
    en: 'A quick level check puts you on the right step of the path from A1 to C2. Content and unlocks follow from there, and you move up when you’re ready.',
    es: 'Una breve evaluación te sitúa en el peldaño correcto del camino de A1 a C2. El contenido y los desbloqueos se ajustan a eso, y subes de nivel cuando estés listo.',
    pt: 'Uma avaliação rápida coloca você no degrau certo do caminho de A1 a C2. O conteúdo e os desbloqueios se ajustam a isso, e você sobe de nível quando estiver pronto.',
    de: 'Ein kurzer Einstufungstest setzt dich auf die richtige Stufe des Wegs von A1 bis C2. Inhalte und Freischaltungen richten sich danach, und wenn du bereit bist, steigst du auf.',
  },
  'A1–A2 hikâyelerinde dinle, boşluğu doldur, kelimeyi harf harf yaz, cümleyi sıraya diz; sonunda sahnedeki cümleyi sesli söyle.': {
    en: 'In A1–A2 stories you listen, fill in the gaps, spell words letter by letter and put sentences in order, then say the scene’s line out loud.',
    es: 'En las historias A1–A2 escuchas, completas huecos, deletreas palabras letra a letra y ordenas frases; al final, dices la frase de la escena en voz alta.',
    pt: 'Nas histórias A1–A2 você escuta, completa lacunas, soletra palavras letra por letra e organiza frases; no fim, diz a frase da cena em voz alta.',
    de: 'In den A1–A2-Geschichten hörst du zu, füllst Lücken, buchstabierst Wörter und bringst Sätze in die richtige Reihenfolge – zum Schluss sprichst du den Satz aus der Szene laut.',
  },
  '40 bölüm, iki dilli transkript. Bir cümleye dokununca ses oraya atlar; bölümü bitirince mini test gelir.': {
    en: '40 episodes with bilingual transcripts. Tap a sentence and the audio jumps there; finish an episode and a mini quiz follows.',
    es: '40 episodios con transcripción bilingüe. Toca una frase y el audio salta ahí; al terminar el episodio llega un minitest.',
    pt: '40 episódios com transcrição bilíngue. Toque em uma frase e o áudio pula para ela; ao terminar o episódio vem um mini teste.',
    de: '40 Folgen mit zweisprachigem Transkript. Tippe auf einen Satz, und die Audiodatei springt dorthin; nach jeder Folge wartet ein Mini-Test.',
  },
  '900 çekirdek kelime, aralıklı tekrarla (SM-2) tam unutmak üzereyken karşına çıkar.': {
    en: '900 core words that come back through spaced repetition (SM-2) just as you’re about to forget them.',
    es: '900 palabras esenciales que vuelven con repetición espaciada (SM-2) justo cuando estás a punto de olvidarlas.',
    pt: '900 palavras essenciais que voltam com repetição espaçada (SM-2) justo quando você está prestes a esquecê-las.',
    de: '900 Kernwörter, die dir per Spaced Repetition (SM-2) genau dann wieder begegnen, wenn du sie fast vergessen hast.',
  },
  'Konuşmalarda düzeltilen cümleler defterine düşer; geri dönüp çalışırsın.': { en: 'Sentences corrected in conversations land in your notebook so you can go back and practice them.', es: 'Las frases corregidas en tus conversaciones llegan a tu cuaderno para que vuelvas a practicarlas.', pt: 'As frases corrigidas nas conversas vão para o seu caderno para você voltar e praticar.', de: 'Im Gespräch korrigierte Sätze landen in deinem Heft, damit du sie später gezielt üben kannst.' },
  'Türkçe konuşanların zorlandığı kelimeleri tek tek dinle ve tekrar et.': { en: 'Listen to the words that speakers of your language find hardest, one by one, and repeat them.', es: 'Escucha una por una las palabras que más les cuestan a quienes hablan tu idioma y repítelas.', pt: 'Ouça, uma a uma, as palavras mais difíceis para quem fala o seu idioma e repita.', de: 'Hör dir die Wörter an, mit denen Sprecher deiner Sprache die größten Schwierigkeiten haben – eins nach dem anderen – und sprich sie nach.' },
  'Okuma hikâyeleri': { en: 'Reading stories', es: 'Historias para leer', pt: 'Histórias para ler', de: 'Lesegeschichten' },

  // --- Pricing / FAQ / CTA ---
  'Ücretsiz başla. Sınırı kaldırmak istersen Pro.': { en: 'Start free. Go Pro to remove the limits.', es: 'Empieza gratis. Pasa a Pro para quitar los límites.', pt: 'Comece grátis. Passe para o Pro e remova os limites.', de: 'Kostenlos starten. Mit Pro fallen die Limits weg.' },
  'Ücretsiz': { en: 'Free', es: 'Gratis', pt: 'Grátis', de: 'Kostenlos' },
  'Her gün biraz konuşmak için yeterli.': { en: 'Plenty to speak a little every day.', es: 'Suficiente para hablar un poco cada día.', pt: 'O bastante para falar um pouco todo dia.', de: 'Genug, um jeden Tag ein bisschen zu sprechen.' },
  'Ücretsiz başla': { en: 'Start free', es: 'Empieza gratis', pt: 'Comece grátis', de: 'Kostenlos starten' },
  'Sahneleri ve Mivo’yu sınırsız kullan.': { en: 'Use the scenes and Mivo without limits.', es: 'Usa las escenas y a Mivo sin límites.', pt: 'Use as cenas e a Mivo sem limites.', de: 'Nutze Szenen und Mivo ohne Limits.' },
  'Önce ücretsiz dene': { en: 'Try it free first', es: 'Pruébalo primero gratis', pt: 'Experimente grátis primeiro', de: 'Erst kostenlos testen' },
  'Günde 1 sesli sahne, 5 dakikaya kadar': { en: '1 voice scene a day, up to 5 minutes', es: '1 escena hablada al día, hasta 5 minutos', pt: '1 cena falada por dia, até 5 minutos', de: '1 Sprechszene pro Tag, bis zu 5 Minuten' },
  'Anlık düzeltme ve hata defteri': { en: 'Instant corrections and a mistakes notebook', es: 'Correcciones al instante y cuaderno de errores', pt: 'Correções na hora e caderno de erros', de: 'Sofortkorrekturen und Fehlerheft' },
  'Kelime kartları ve aralıklı tekrar': { en: 'Flashcards with spaced repetition', es: 'Tarjetas con repetición espaciada', pt: 'Cartões com repetição espaçada', de: 'Karteikarten mit Spaced Repetition' },
  'Sınırsız sesli sahne ve Mivo ile serbest sohbet': { en: 'Unlimited voice scenes and free chat with Mivo', es: 'Escenas habladas ilimitadas y charla libre con Mivo', pt: 'Cenas faladas ilimitadas e conversa livre com a Mivo', de: 'Unbegrenzte Sprechszenen und freies Gespräch mit Mivo' },
  '30 dakikaya kadar uzun oturumlar': { en: 'Long sessions of up to 30 minutes', es: 'Sesiones largas de hasta 30 minutos', pt: 'Sessões longas de até 30 minutos', de: 'Lange Sitzungen bis zu 30 Minuten' },
  'Her sahneyi farklı sürprizlerle tekrar oyna, yıldız topla': { en: 'Replay every scene with new surprises and collect stars', es: 'Repite cada escena con sorpresas nuevas y reúne estrellas', pt: 'Repita cada cena com novas surpresas e colecione estrelas', de: 'Jede Szene mit neuen Überraschungen wiederholen und Sterne sammeln' },
  'Tüm sahnelere erişim': { en: 'Access to every scene', es: 'Acceso a todas las escenas', pt: 'Acesso a todas as cenas', de: 'Zugang zu allen Szenen' },
  'Pro fiyatı uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir. Aboneliği mağaza hesabından istediğin zaman iptal edebilirsin.': {
    en: 'The Pro price is shown in the app, at the App Store’s and Google Play’s own price. You can cancel the subscription anytime from your store account.',
    es: 'El precio de Pro se muestra en la app con el precio propio de App Store y Google Play. Puedes cancelar la suscripción cuando quieras desde tu cuenta de la tienda.',
    pt: 'O preço do Pro aparece no app com o valor da App Store e do Google Play. Você pode cancelar a assinatura quando quiser pela conta da loja.',
    de: 'Den Pro-Preis siehst du in der App, mit dem Preis von App Store bzw. Google Play. Das Abo kannst du jederzeit über dein Store-Konto kündigen.',
  },
  'Başlamadan önce akla gelenler': { en: 'Before you start', es: 'Antes de empezar', pt: 'Antes de começar', de: 'Bevor du startest' },
  'Tüm soruları gör →': { en: 'See all questions →', es: 'Ver todas las preguntas →', pt: 'Ver todas as perguntas →', de: 'Alle Fragen ansehen →' },
  'Sahne senin': { en: 'Your stage', es: 'El escenario es tuyo', pt: 'O palco é seu', de: 'Die Bühne gehört dir' },
  'Sahne hazır. İlk cümleni söyle.': { en: 'The stage is set. Say your first sentence.', es: 'Todo listo. Di tu primera frase.', pt: 'Tudo pronto. Diga sua primeira frase.', de: 'Die Bühne ist bereit. Sag deinen ersten Satz.' },
  'Bir sahne seç, Mivo karşında olsun. Takıldığın yerde anında düzeltir; yarın başka bir sürprizle yeniden oynarsın.': {
    en: 'Pick a scene and Mivo is right there with you. Stumble and you get an instant fix; tomorrow you play it again with a new twist.',
    es: 'Elige una escena y Mivo estará frente a ti. Si te atascas, te corrige al instante; mañana la juegas otra vez con un giro nuevo.',
    pt: 'Escolha uma cena e a Mivo estará na sua frente. Se travar, ela corrige na hora; amanhã você joga de novo com uma reviravolta nova.',
    de: 'Such dir eine Szene aus, und Mivo ist dein Gegenüber. Wenn du hängst, gibt es sofort eine Korrektur; morgen spielst du sie noch einmal – mit neuer Wendung.',
  },
  'Telefonun yanında değil mi?': { en: 'Phone not at hand?', es: '¿No tienes el móvil a mano?', pt: 'Sem o celular por perto?', de: 'Dein Handy gerade nicht zur Hand?' },
  'Web’den başla': { en: 'Start on the web', es: 'Empieza en la web', pt: 'Comece pela web', de: 'Im Web starten' },
  'Sevinen Mivo': { en: 'Cheering Mivo', es: 'Mivo celebrando', pt: 'Mivo comemorando', de: 'Jubelnder Mivo' },

  // --- Story / phone ---
  'Nasıl çalışır': { en: 'How it works', es: 'Cómo funciona', pt: 'Como funciona', de: 'So funktioniert’s' },
  'Konuş': { en: 'Speak', es: 'Habla', pt: 'Fale', de: 'Sprich' },
  'Düzelt': { en: 'Fix it', es: 'Corrige', pt: 'Corrija', de: 'Korrigiere' },
  'Tekrar et': { en: 'Repeat', es: 'Repasa', pt: 'Revise', de: 'Wiederhole' },
  'Konuş. Düzelt. Tekrar et.': { en: 'Speak. Fix it. Repeat.', es: 'Habla. Corrige. Repasa.', pt: 'Fale. Corrija. Revise.', de: 'Sprich. Korrigiere. Wiederhole.' },
  'Takıldığın cümle anında düzelir ve nedeni kendi dilinde açıklanır. Konuşman hiç bölünmez.': { en: 'The sentence you stumble on is fixed on the spot, with the reason explained in your own language. Your flow is never interrupted.', es: 'La frase en la que te atascas se corrige al instante y el motivo se explica en tu idioma. Tu conversación nunca se interrumpe.', pt: 'A frase em que você trava é corrigida na hora e o motivo é explicado no seu idioma. Sua conversa nunca é interrompida.', de: 'Der Satz, bei dem du hängst, wird sofort korrigiert und der Grund in deiner Sprache erklärt. Dein Redefluss wird nie unterbrochen.' },
  'Havalimanında, otelde, mülakatta… Mivo sahnedeki karşı tarafı oynar, sen sesli konuşursun.': { en: 'At the airport, in a hotel, in an interview… Mivo plays the person across from you and you speak out loud.', es: 'En el aeropuerto, en un hotel, en una entrevista… Mivo interpreta a la otra persona y tú hablas en voz alta.', pt: 'No aeroporto, no hotel, na entrevista… a Mivo faz a outra pessoa da cena e você fala em voz alta.', de: 'Am Flughafen, im Hotel, im Vorstellungsgespräch … Mivo spielt dein Gegenüber, und du sprichst laut.' },
  'Hataların Hata Defterim\'e düşer. Hızlı sınavla pekiştirir, gün gün planınla ilerlersin.': { en: 'Your mistakes land in your notebook. Lock them in with a quick quiz and move ahead with your day-by-day plan.', es: 'Tus errores van a tu cuaderno. Afiánzalos con un minitest y avanza con tu plan día a día.', pt: 'Seus erros vão para o seu caderno. Fixe-os com um quiz rápido e avance com o plano dia a dia.', de: 'Deine Fehler landen in deinem Heft. Festige sie mit einem Schnelltest und komm mit deinem Tag-für-Tag-Plan voran.' },
  'Konuşuyorsun…': { en: 'You’re speaking…', es: 'Estás hablando…', pt: 'Você está falando…', de: 'Du sprichst …' },
  '“go” geçmiş zamanda “went” olur. Dünü anlatıyorsun, o yüzden geçmiş zaman.': { en: 'The past of “go” is “went”. You’re talking about yesterday, so use the past tense.', es: 'El pasado de “go” es “went”. Hablas de ayer, así que usa el pasado.', pt: 'O passado de “go” é “went”. Você fala de ontem, então use o passado.', de: 'Die Vergangenheitsform von „go“ ist „went“. Du sprichst über gestern, also brauchst du die Vergangenheit.' },
  'Hata Defterim': { en: 'My Mistakes Notebook', es: 'Mi cuaderno de errores', pt: 'Meu caderno de erros', de: 'Mein Fehlerheft' },
  'Hızlı Sınav': { en: 'Quick Quiz', es: 'Quiz rápido', pt: 'Quiz rápido', de: 'Schnelltest' },
  'Gün gün yolun': { en: 'Your day-by-day path', es: 'Tu ruta día a día', pt: 'Sua trilha dia a dia', de: 'Dein Weg, Tag für Tag' },
  'Klasik sahne': { en: 'The classic', es: 'La escena clásica', pt: 'A cena clássica', de: 'Der Klassiker' },
};

const root = path.resolve(__dirname, '..');
const LANGS = ['en', 'es', 'pt', 'de'];
let applied = 0;
for (const lang of LANGS) {
  const p = path.join(root, 'src/i18n/catalog', `${lang}.json`);
  const cat = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const [key, tr] of Object.entries(P)) {
    if (!(key in cat)) continue;
    if (cat[key] !== tr[lang]) { cat[key] = tr[lang]; applied++; }
  }
  fs.writeFileSync(p, JSON.stringify(cat, null, 2) + '\n');
}
const ovPath = path.join(__dirname, 'i18n-overrides.json');
const ov = JSON.parse(fs.readFileSync(ovPath, 'utf8'));
for (const [key, tr] of Object.entries(P)) ov[key] = { ...(ov[key] || {}), ...tr };
fs.writeFileSync(ovPath, JSON.stringify(ov, null, 1) + '\n');
console.log(`${Object.keys(P).length} anahtar cilalandı, ${applied} katalog girdisi güncellendi.`);
