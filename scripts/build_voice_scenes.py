"""Sesli sahneler (Başlangıç: A1-A2) kaynak dosyası.

Tek kaynak: aşağıdaki SCENES. Çalıştırınca şunları üretir:
  packages/shared-data/voiceScenes.data.json          (Türkçe kaynak veri)
  packages/shared-data/i18n/voiceScenes.<dil>.json    (en/es/pt/de katmanları)

Kullanım: python scripts/build_voice_scenes.py
Alan sırası çevirilerde hep (en, tr, es, pt, de). `situation` ve `opening` yalnızca modele
gider (İngilizce), çevrilmez.
"""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "packages" / "shared-data"

SCENES = []


def S(id, code, level, emoji, name, title, role, situation, opening, goals, phrases, minutes=None):
    SCENES.append(dict(id=id, code=code, level=level, emoji=emoji, name=name, title=title, role=role,
                       situation=situation, opening=opening, goals=goals, phrases=phrases,
                       minutes=minutes or (4 if level == "A1" else 5)))


# ---------------------------------------------------------------- A1
S("vs-a1-first-day", "A1_N01", "A1", "🎒", "Sofia",
  ("First Day at Language Class", "Kursta İlk Gün", "Primer día de clase", "Primeiro dia de aula", "Erster Tag im Sprachkurs"),
  ("Sınıf arkadaşın", "Tu compañera de clase", "Sua colega de turma", "Deine Kurskollegin"),
  "You are Sofia, a friendly student on the first day of an English course. You sit next to the learner and have never met them. You are from Spain and you work as a graphic designer. Ask their name, where they are from and what they do. Share your own details only when they ask you.",
  "Hi! I'm Sofia. I'm new here too. What's your name?",
  [("Tell Sofia your name, where you are from and what you do, using am / is / are.",
    "Sofia'ya adını, nereli olduğunu ve ne iş yaptığını söyle (am / is / are).",
    "Dile a Sofia tu nombre, de dónde eres y a qué te dedicas (am / is / are).",
    "Diga à Sofia seu nome, de onde você é e o que faz (am / is / are).",
    "Sag Sofia deinen Namen, woher du kommst und was du machst (am / is / are)."),
   ("Ask Sofia where she is from and what her job is.",
    "Sofia'ya nereli olduğunu ve mesleğini sor.",
    "Pregunta a Sofia de dónde es y cuál es su trabajo.",
    "Pergunte à Sofia de onde ela é e qual é o trabalho dela.",
    "Frag Sofia, woher sie kommt und was sie beruflich macht.")],
  [("I'm Elif. I'm from Turkey.", "Ben Elif. Türkiyeliyim.", "Soy Elif. Soy de Turquía.", "Eu sou a Elif. Sou da Turquia.", "Ich bin Elif. Ich komme aus der Türkei."),
   ("I'm a student.", "Öğrenciyim.", "Soy estudiante.", "Sou estudante.", "Ich bin Student/in."),
   ("Where are you from?", "Sen nerelisin?", "¿De dónde eres?", "De onde você é?", "Woher kommst du?")])

S("vs-a1-gift-shop", "A1_N02", "A1", "🎁", "Lucy",
  ("At the Gift Shop", "Hediyelik Eşya Dükkânında", "En la tienda de regalos", "Na loja de presentes", "Im Geschenkeladen"),
  ("Dükkân çalışanı", "Dependienta", "Atendente da loja", "Verkäuferin"),
  "You are Lucy, a shop assistant in a small gift shop in London. The learner is a tourist who wants a present for a friend. Point at things on the shelves (a mug, an umbrella, postcards, magnets, a scarf) and ask 'Do you like this one or that one?'. Say what things are and their price when asked (3 to 15 pounds). Use this, that, these, those and a / an naturally.",
  "Hello! Welcome to our shop. Can I help you?",
  [("Ask what things are using this, that, these and those (What's this? What are those?).",
    "This, that, these, those ile eşyaların ne olduğunu sor (What's this? What are those?).",
    "Pregunta qué son las cosas con this, that, these y those (What's this? What are those?).",
    "Pergunte o que são as coisas com this, that, these e those (What's this? What are those?).",
    "Frag mit this, that, these und those, was die Dinge sind (What's this? What are those?)."),
   ("Choose a present and say what you want with a / an and plurals (I'd like a mug and two postcards).",
    "Bir hediye seç ve a / an ile çoğul kullanarak ne istediğini söyle (I'd like a mug and two postcards).",
    "Elige un regalo y di lo que quieres con a / an y el plural (I'd like a mug and two postcards).",
    "Escolha um presente e diga o que quer usando a / an e o plural (I'd like a mug and two postcards).",
    "Such ein Geschenk aus und sag mit a / an und dem Plural, was du möchtest (I'd like a mug and two postcards).")],
  [("What's this?", "Bu ne?", "¿Qué es esto?", "O que é isto?", "Was ist das?"),
   ("How much are these?", "Bunlar ne kadar?", "¿Cuánto cuestan estos?", "Quanto custam estes?", "Wie viel kosten diese?"),
   ("I'd like a mug, please.", "Bir kupa rica ederim.", "Quiero una taza, por favor.", "Quero uma caneca, por favor.", "Ich möchte eine Tasse, bitte.")])

S("vs-a1-lost-property", "A1_N03", "A1", "🧳", "Tom",
  ("Lost and Found", "Kayıp Eşya Bürosu", "Objetos perdidos", "Achados e perdidos", "Fundbüro"),
  ("Kayıp eşya görevlisi", "Empleado de objetos perdidos", "Atendente de achados e perdidos", "Mitarbeiter im Fundbüro"),
  "You are Tom, a clerk at the lost property office of a train station. The learner lost something (a bag, a phone or keys). On your desk you have a black bag, a blue phone, a red umbrella and some keys. Hold up an item and ask 'Is this your bag?'. Make the learner use my and your. When you talk about other people's things, use his, her, our and their ('This is her phone').",
  "Hello! Lost and found. Can I help you?",
  [("Say what you lost and describe it with my (It's my blue bag).",
    "Neyi kaybettiğini söyle ve my ile tarif et (It's my blue bag).",
    "Di qué perdiste y descríbelo con my (It's my blue bag).",
    "Diga o que você perdeu e descreva com my (It's my blue bag).",
    "Sag, was du verloren hast, und beschreibe es mit my (It's my blue bag)."),
   ("Answer Tom's questions about which things are yours (Is this your phone?).",
    "Tom'un hangi eşyaların senin olduğuna dair sorularını yanıtla (Is this your phone?).",
    "Responde a las preguntas de Tom sobre qué cosas son tuyas (Is this your phone?).",
    "Responda às perguntas do Tom sobre quais coisas são suas (Is this your phone?).",
    "Beantworte Toms Fragen, welche Dinge dir gehören (Is this your phone?).")],
  [("It's my bag.", "Bu benim çantam.", "Es mi bolso.", "É a minha bolsa.", "Das ist meine Tasche."),
   ("Is this your phone?", "Bu senin telefonun mu?", "¿Es este tu teléfono?", "Este é o seu telefone?", "Ist das dein Handy?"),
   ("No, it isn't mine.", "Hayır, benim değil.", "No, no es mío.", "Não, não é meu.", "Nein, das gehört mir nicht.")])

S("vs-a1-hotel-desk", "A1_N04", "A1", "🏨", "Maria",
  ("At the Hotel Desk", "Otel Resepsiyonunda", "En la recepción del hotel", "Na recepção do hotel", "An der Hotelrezeption"),
  ("Resepsiyonist", "Recepcionista", "Recepcionista", "Rezeptionistin"),
  "You are Maria, a receptionist at a small hotel. The learner has just arrived as a guest. Answer their questions about the hotel (breakfast is from 7 to 10 in the cafe on the first floor, the wifi is free, the pool is closed today, check-out is at 11). Also ask them simple questions: 'Are you here for work?', 'Is this your first visit?'. Let the learner ask the questions with Is, Are, Where, What and What time.",
  "Good evening! Welcome to the Sun Hotel. How can I help you?",
  [("Ask three questions about the hotel with Is / Are / Where / What (Where is the breakfast room? Is the wifi free?).",
    "Otel hakkında Is / Are / Where / What ile üç soru sor (Where is the breakfast room? Is the wifi free?).",
    "Haz tres preguntas sobre el hotel con Is / Are / Where / What (Where is the breakfast room? Is the wifi free?).",
    "Faça três perguntas sobre o hotel com Is / Are / Where / What (Where is the breakfast room? Is the wifi free?).",
    "Stell drei Fragen zum Hotel mit Is / Are / Where / What (Where is the breakfast room? Is the wifi free?)."),
   ("Answer Maria's questions about you (Are you here for work?).",
    "Maria'nın sana yönelttiği soruları yanıtla (Are you here for work?).",
    "Responde a las preguntas de Maria sobre ti (Are you here for work?).",
    "Responda às perguntas da Maria sobre você (Are you here for work?).",
    "Beantworte Marias Fragen über dich (Are you here for work?).")],
  [("Where is the breakfast room?", "Kahvaltı salonu nerede?", "¿Dónde está el comedor del desayuno?", "Onde fica a sala do café da manhã?", "Wo ist der Frühstücksraum?"),
   ("Is the wifi free?", "Wifi ücretsiz mi?", "¿El wifi es gratis?", "O wifi é grátis?", "Ist das WLAN kostenlos?"),
   ("What time is check-out?", "Check-out saat kaçta?", "¿A qué hora es el check-out?", "A que horas é o check-out?", "Wann ist Check-out?")])

S("vs-a1-neighbour-chat", "A1_N05", "A1", "🏠", "Ben",
  ("Chat with Your Neighbour", "Komşunla Sohbet", "Charla con tu vecino", "Conversa com o vizinho", "Gespräch mit dem Nachbarn"),
  ("Komşun", "Tu vecino", "Seu vizinho", "Dein Nachbar"),
  "You are Ben, a friendly neighbour on the same floor. You meet the learner in the lift in the morning. You work in a bakery, get up at 5, start work at 6, finish at 2 and go to bed early. Ask about their daily routine (what time they get up, where they work, what they do in the evening) and answer when they ask about yours. When you talk about your family use he / she: 'My wife works at a school.'",
  "Good morning! You're my new neighbour, right? I'm Ben.",
  [("Tell Ben about your day: what time you get up, where you work or study, when you go to bed (I get up at seven).",
    "Ben'e gününü anlat: kaçta kalkarsın, nerede çalışır ya da okursun, ne zaman yatarsın (I get up at seven).",
    "Cuéntale a Ben tu día: a qué hora te levantas, dónde trabajas o estudias, cuándo te acuestas (I get up at seven).",
    "Conte ao Ben sobre o seu dia: a que horas você acorda, onde trabalha ou estuda, quando vai dormir (I get up at seven).",
    "Erzähl Ben von deinem Tag: wann du aufstehst, wo du arbeitest oder lernst, wann du schlafen gehst (I get up at seven)."),
   ("Ask Ben about his day with Do you…? and What time do you…?",
    "Ben'e günü hakkında Do you…? ve What time do you…? ile sor.",
    "Pregunta a Ben por su día con Do you…? y What time do you…?",
    "Pergunte ao Ben sobre o dia dele com Do you…? e What time do you…?",
    "Frag Ben nach seinem Tag mit Do you…? und What time do you…?")],
  [("I get up at seven.", "Yedide kalkarım.", "Me levanto a las siete.", "Eu acordo às sete.", "Ich stehe um sieben auf."),
   ("I work in an office.", "Bir ofiste çalışırım.", "Trabajo en una oficina.", "Eu trabalho em um escritório.", "Ich arbeite in einem Büro."),
   ("What time do you start work?", "İşe saat kaçta başlarsın?", "¿A qué hora empiezas a trabajar?", "A que horas você começa a trabalhar?", "Wann fängst du mit der Arbeit an?")])

S("vs-a1-gym-signup", "A1_N06", "A1", "💪", "Mia",
  ("Joining the Gym", "Spor Salonuna Kayıt", "Inscripción en el gimnasio", "Matrícula na academia", "Anmeldung im Fitnessstudio"),
  ("Antrenör", "Entrenadora", "Treinadora", "Trainerin"),
  "You are Mia, a trainer at FitLife Gym. The learner wants to join. Ask how often they exercise and what they usually do (walk, swim, run). Say what you do yourself: you always train in the morning, you often swim on Sundays, you never eat sweets before training. Use always, usually, often, sometimes and never in your sentences so the learner hears them.",
  "Hi! Welcome to FitLife Gym. I'm Mia. Do you exercise a lot?",
  [("Tell Mia how often you do things using always, usually, often, sometimes, never (I sometimes swim).",
    "Mia'ya bir şeyi ne sıklıkla yaptığını always, usually, often, sometimes, never ile söyle (I sometimes swim).",
    "Dile a Mia con qué frecuencia haces cosas con always, usually, often, sometimes, never (I sometimes swim).",
    "Diga à Mia com que frequência você faz as coisas com always, usually, often, sometimes, never (I sometimes swim).",
    "Sag Mia mit always, usually, often, sometimes, never, wie oft du etwas machst (I sometimes swim)."),
   ("Ask Mia how often she trains or does something (How often do you…?).",
    "Mia'ya ne sıklıkla antrenman yaptığını ya da bir şey yaptığını sor (How often do you…?).",
    "Pregunta a Mia con qué frecuencia entrena o hace algo (How often do you…?).",
    "Pergunte à Mia com que frequência ela treina ou faz algo (How often do you…?).",
    "Frag Mia, wie oft sie trainiert oder etwas macht (How often do you…?).")],
  [("I usually walk in the evening.", "Genellikle akşamları yürürüm.", "Normalmente camino por la tarde.", "Eu geralmente caminho à noite.", "Ich gehe abends meistens spazieren."),
   ("I never run.", "Hiç koşmam.", "Nunca corro.", "Eu nunca corro.", "Ich laufe nie."),
   ("How often do you train?", "Ne sıklıkla antrenman yaparsın?", "¿Con qué frecuencia entrenas?", "Com que frequência você treina?", "Wie oft trainierst du?")])

S("vs-a1-city-directions", "A1_N07", "A1", "🗺️", "Omar",
  ("Lost in the City", "Şehirde Yolunu Sor", "Perdido en la ciudad", "Perdido na cidade", "Verloren in der Stadt"),
  ("Yoldan geçen biri", "Un transeúnte", "Um pedestre", "Ein Passant"),
  "You are Omar, a local walking near the main square. The learner is a tourist looking for a pharmacy, a bank or the station. The pharmacy is next to the bookshop, opposite the park. The bank is between the cafe and the post office. There are public toilets behind the museum. The station is straight ahead, then on the left. Give short directions with next to, opposite, behind, between. Ask 'Is there anything else?'.",
  "Hello! You look lost. Can I help you?",
  [("Ask if there is a place near here (Is there a pharmacy near here? Are there any banks?).",
    "Yakınlarda bir yer var mı diye sor (Is there a pharmacy near here? Are there any banks?).",
    "Pregunta si hay un lugar cerca (Is there a pharmacy near here? Are there any banks?).",
    "Pergunte se há algum lugar por perto (Is there a pharmacy near here? Are there any banks?).",
    "Frag, ob es in der Nähe einen Ort gibt (Is there a pharmacy near here? Are there any banks?)."),
   ("Repeat the directions back to check (It's next to the bookshop, right?).",
    "Yol tarifini doğrulamak için tekrar et (It's next to the bookshop, right?).",
    "Repite las indicaciones para comprobarlas (It's next to the bookshop, right?).",
    "Repita as indicações para confirmar (It's next to the bookshop, right?).",
    "Wiederhole die Wegbeschreibung zur Kontrolle (It's next to the bookshop, right?).")],
  [("Is there a pharmacy near here?", "Yakınlarda eczane var mı?", "¿Hay una farmacia cerca?", "Há uma farmácia por perto?", "Gibt es hier in der Nähe eine Apotheke?"),
   ("Where is the station?", "İstasyon nerede?", "¿Dónde está la estación?", "Onde fica a estação?", "Wo ist der Bahnhof?"),
   ("It's next to the bank.", "Bankanın yanında.", "Está al lado del banco.", "Fica ao lado do banco.", "Es ist neben der Bank.")])

S("vs-a1-party-hobbies", "A1_N08", "A1", "🎉", "Chloe",
  ("Hobbies at a Party", "Partide Hobiler", "Aficiones en una fiesta", "Hobbies numa festa", "Hobbys auf einer Party"),
  ("Partide tanıştığın biri", "Alguien que conoces en la fiesta", "Alguém que você conheceu na festa", "Jemand von der Party"),
  "You are Chloe, at a friend's birthday party. You have just met the learner. You love cooking, you enjoy dancing, you hate waiting in queues and you like watching old films. Ask the learner what they like and hate doing. React with short comments ('Me too!', 'Really?').",
  "Hi! I'm Chloe. Do you know many people here?",
  [("Tell Chloe two things you like or love doing and one you hate (I love cooking. I hate waiting).",
    "Chloe'ye sevdiğin ya da çok sevdiğin iki şeyi ve nefret ettiğin bir şeyi söyle (I love cooking. I hate waiting).",
    "Dile a Chloe dos cosas que te gusta o te encanta hacer y una que odias (I love cooking. I hate waiting).",
    "Diga à Chloe duas coisas que você gosta ou adora fazer e uma que odeia (I love cooking. I hate waiting).",
    "Sag Chloe zwei Dinge, die du gern oder sehr gern machst, und eins, das du hasst (I love cooking. I hate waiting)."),
   ("Ask Chloe what she enjoys doing (What do you enjoy doing?).",
    "Chloe'ye yapmaktan keyif aldığı şeyleri sor (What do you enjoy doing?).",
    "Pregunta a Chloe qué disfruta haciendo (What do you enjoy doing?).",
    "Pergunte à Chloe o que ela gosta de fazer (What do you enjoy doing?).",
    "Frag Chloe, was ihr Spaß macht (What do you enjoy doing?).")],
  [("I love cooking.", "Yemek yapmayı çok severim.", "Me encanta cocinar.", "Eu adoro cozinhar.", "Ich koche sehr gern."),
   ("I enjoy watching films.", "Film izlemekten keyif alırım.", "Disfruto viendo películas.", "Eu gosto de assistir a filmes.", "Ich schaue gern Filme."),
   ("I hate waiting.", "Beklemekten nefret ederim.", "Odio esperar.", "Eu odeio esperar.", "Ich hasse Warten.")])

S("vs-a1-phone-call", "A1_N09", "A1", "📞", "Leo",
  ("A Phone Call with a Friend", "Bir Arkadaşla Telefon", "Una llamada con un amigo", "Uma ligação com um amigo", "Ein Telefonat mit einem Freund"),
  ("Arkadaşın", "Tu amigo", "Seu amigo", "Dein Freund"),
  "You are Leo, the learner's friend, calling by phone. You are at the park with your dog and it is raining a little. Ask what the learner is doing right now, who is with them and whether they want to meet later. Say what is happening around you: 'The dog is running. It's raining.' Use the present continuous.",
  "Hi! It's Leo. What are you doing right now?",
  [("Say what you are doing right now and what is happening around you (I'm cooking. My brother is watching TV).",
    "Şu an ne yaptığını ve çevrende neler olduğunu söyle (I'm cooking. My brother is watching TV).",
    "Di qué estás haciendo ahora y qué pasa a tu alrededor (I'm cooking. My brother is watching TV).",
    "Diga o que você está fazendo agora e o que acontece ao seu redor (I'm cooking. My brother is watching TV).",
    "Sag, was du gerade machst und was um dich herum passiert (I'm cooking. My brother is watching TV)."),
   ("Ask Leo what he is doing and suggest meeting later.",
    "Leo'ya ne yaptığını sor ve daha sonra buluşmayı öner.",
    "Pregunta a Leo qué está haciendo y propón quedar más tarde.",
    "Pergunte ao Leo o que ele está fazendo e sugira se encontrarem mais tarde.",
    "Frag Leo, was er macht, und schlag ein Treffen später vor.")],
  [("I'm cooking dinner.", "Akşam yemeği yapıyorum.", "Estoy preparando la cena.", "Estou preparando o jantar.", "Ich koche gerade das Abendessen."),
   ("My sister is watching TV.", "Kız kardeşim televizyon izliyor.", "Mi hermana está viendo la tele.", "Minha irmã está assistindo TV.", "Meine Schwester schaut fern."),
   ("What are you doing?", "Ne yapıyorsun?", "¿Qué estás haciendo?", "O que você está fazendo?", "Was machst du gerade?")])

S("vs-a1-flatshare", "A1_N10", "A1", "🔑", "Sam",
  ("Moving into a Shared Flat", "Ortak Eve Taşınma", "Mudanza a un piso compartido", "Mudança para um apartamento compartilhado", "Einzug in die WG"),
  ("Ev arkadaşın", "Tu compañero de piso", "Seu colega de apartamento", "Dein Mitbewohner"),
  "You are Sam, who shares a flat. The learner is the new flatmate arriving today. Show them the flat. Ask what they can do (can you cook? can you play the guitar?). Say you can play the guitar but you can't cook. Wait for them to ask politely for things (using the kitchen, a charger, the wifi password) and answer with 'Sure, you can' or 'Sorry, you can't, because...'.",
  "Hi! Welcome to the flat. I'm Sam. Come in!",
  [("Say two things you can do and one thing you can't (I can cook, but I can't drive).",
    "Yapabildiğin iki şeyi ve yapamadığın bir şeyi söyle (I can cook, but I can't drive).",
    "Di dos cosas que sabes hacer y una que no (I can cook, but I can't drive).",
    "Diga duas coisas que você sabe fazer e uma que não sabe (I can cook, but I can't drive).",
    "Sag zwei Dinge, die du kannst, und eins, das du nicht kannst (I can cook, but I can't drive)."),
   ("Ask politely for two things with Can I…? or Could you…? (Can I use the kitchen?).",
    "Can I…? ya da Could you…? ile kibarca iki şey iste (Can I use the kitchen?).",
    "Pide con educación dos cosas con Can I…? o Could you…? (Can I use the kitchen?).",
    "Peça duas coisas com educação usando Can I…? ou Could you…? (Can I use the kitchen?).",
    "Bitte höflich um zwei Dinge mit Can I…? oder Could you…? (Can I use the kitchen?).")],
  [("I can cook.", "Yemek yapabilirim.", "Sé cocinar.", "Eu sei cozinhar.", "Ich kann kochen."),
   ("Can I use your charger?", "Şarj aletini kullanabilir miyim?", "¿Puedo usar tu cargador?", "Posso usar seu carregador?", "Kann ich dein Ladegerät benutzen?"),
   ("Could you help me, please?", "Bana yardım eder misin, lütfen?", "¿Podrías ayudarme, por favor?", "Você poderia me ajudar, por favor?", "Könntest du mir bitte helfen?")])

S("vs-a1-grocery", "A1_N11", "A1", "🛒", "Nora",
  ("At the Grocery Store", "Marketten Alışveriş", "En el supermercado", "No mercado", "Im Supermarkt"),
  ("Market çalışanı", "Dependienta del supermercado", "Atendente do mercado", "Mitarbeiterin im Supermarkt"),
  "You are Nora, who works in a small grocery store. The learner is cooking dinner for friends and needs ingredients (for example pasta, tomatoes, eggs, milk, cheese, rice). Today you have no eggs and only a little milk. Say where things are and give prices ('The tomatoes are two euros a kilo.'). Ask 'How many do you need?' and 'Do you need any bread?'.",
  "Hello! Are you looking for something?",
  [("Ask for things you need with some and any (I need some tomatoes. Do you have any eggs?).",
    "İhtiyacın olan şeyleri some ve any ile iste (I need some tomatoes. Do you have any eggs?).",
    "Pide lo que necesitas con some y any (I need some tomatoes. Do you have any eggs?).",
    "Peça o que você precisa com some e any (I need some tomatoes. Do you have any eggs?).",
    "Bitte um das, was du brauchst, mit some und any (I need some tomatoes. Do you have any eggs?)."),
   ("Ask about price and quantity (How much is it? How many do I need?).",
    "Fiyatı ve miktarı sor (How much is it? How many do I need?).",
    "Pregunta por el precio y la cantidad (How much is it? How many do I need?).",
    "Pergunte sobre o preço e a quantidade (How much is it? How many do I need?).",
    "Frag nach Preis und Menge (How much is it? How many do I need?).")],
  [("Do you have any eggs?", "Hiç yumurtanız var mı?", "¿Tiene huevos?", "Vocês têm ovos?", "Haben Sie Eier?"),
   ("I need some milk.", "Biraz süte ihtiyacım var.", "Necesito un poco de leche.", "Preciso de um pouco de leite.", "Ich brauche etwas Milch."),
   ("How much is this?", "Bu ne kadar?", "¿Cuánto cuesta esto?", "Quanto custa isto?", "Wie viel kostet das?")])

S("vs-a1-where-were-you", "A1_N12", "A1", "🎶", "Emma",
  ("Where Were You?", "Dün Neredeydin?", "¿Dónde estabas?", "Onde você estava?", "Wo warst du?"),
  ("Arkadaşın", "Tu amiga", "Sua amiga", "Deine Freundin"),
  "You are Emma, the learner's friend. You called them yesterday evening but nobody answered. You were at a concert with your sister and it was amazing: the tickets were cheap and the singer was great. Ask where they were, how it was and who was with them. Use was and were in your questions and answers.",
  "Hey! I called you yesterday. Where were you?",
  [("Say where you were yesterday and how it was (I was at the cinema. It was great).",
    "Dün nerede olduğunu ve nasıl geçtiğini söyle (I was at the cinema. It was great).",
    "Di dónde estuviste ayer y cómo fue (I was at the cinema. It was great).",
    "Diga onde você estava ontem e como foi (I was at the cinema. It was great).",
    "Sag, wo du gestern warst und wie es war (I was at the cinema. It was great)."),
   ("Ask Emma where she was and who was with her (Where were you? Were you alone?).",
    "Emma'ya nerede olduğunu ve yanında kimin olduğunu sor (Where were you? Were you alone?).",
    "Pregunta a Emma dónde estaba y con quién (Where were you? Were you alone?).",
    "Pergunte à Emma onde ela estava e com quem (Where were you? Were you alone?).",
    "Frag Emma, wo sie war und wer dabei war (Where were you? Were you alone?).")],
  [("I was at home.", "Evdeydim.", "Estaba en casa.", "Eu estava em casa.", "Ich war zu Hause."),
   ("It was great!", "Harikaydı!", "¡Fue genial!", "Foi ótimo!", "Es war toll!"),
   ("Were you with your sister?", "Kız kardeşinle miydin?", "¿Estabas con tu hermana?", "Você estava com sua irmã?", "Warst du mit deiner Schwester da?")])

S("vs-a1-weekend-chat", "A1_N13", "A1", "☀️", "Jack",
  ("How Was Your Weekend?", "Hafta Sonun Nasıldı?", "¿Qué tal tu fin de semana?", "Como foi seu fim de semana?", "Wie war dein Wochenende?"),
  ("İş arkadaşın", "Tu compañero de trabajo", "Seu colega de trabalho", "Dein Kollege"),
  "You are Jack, a colleague, chatting at the coffee machine on Monday morning. At the weekend you visited your parents, cooked a big dinner and watched a football match. Ask the learner what they did, then ask short follow-up questions ('Did you go alone?', 'Did you like it?'). Use the past simple with regular and irregular verbs.",
  "Good morning! How was your weekend?",
  [("Tell Jack what you did at the weekend with at least three past verbs (I visited…, I went…, I saw…).",
    "Jack'e hafta sonu ne yaptığını en az üç geçmiş zaman fiiliyle anlat (I visited…, I went…, I saw…).",
    "Cuéntale a Jack qué hiciste el fin de semana con al menos tres verbos en pasado (I visited…, I went…, I saw…).",
    "Conte ao Jack o que você fez no fim de semana com pelo menos três verbos no passado (I visited…, I went…, I saw…).",
    "Erzähl Jack, was du am Wochenende gemacht hast, mit mindestens drei Verben in der Vergangenheit (I visited…, I went…, I saw…)."),
   ("Ask Jack two questions with did (Did you…?).",
    "Jack'e did ile iki soru sor (Did you…?).",
    "Haz a Jack dos preguntas con did (Did you…?).",
    "Faça ao Jack duas perguntas com did (Did you…?).",
    "Stell Jack zwei Fragen mit did (Did you…?).")],
  [("I visited my family.", "Ailemi ziyaret ettim.", "Visité a mi familia.", "Visitei minha família.", "Ich habe meine Familie besucht."),
   ("We went to the cinema.", "Sinemaya gittik.", "Fuimos al cine.", "Fomos ao cinema.", "Wir waren im Kino."),
   ("Did you watch the match?", "Maçı izledin mi?", "¿Viste el partido?", "Você assistiu à partida?", "Hast du das Spiel gesehen?")])

# ---------------------------------------------------------------- A2
S("vs-a2-weekend-trip", "A2_N14", "A2", "🧭", "Lara",
  ("Planning a Weekend Trip", "Hafta Sonu Gezisi Planı", "Planes para un viaje de fin de semana", "Planejando uma viagem de fim de semana", "Wochenendtrip planen"),
  ("Arkadaşın", "Tu amiga", "Sua amiga", "Deine Freundin"),
  "You are Lara, the learner's friend. You are planning a weekend trip together. You have not decided the city (maybe Prague or Lisbon). Ask where they are going to go, what they are going to do and when. Fix details: 'I'm meeting my sister on Saturday morning, so I'm taking the train at two.' Use be going to for plans and the present continuous for fixed arrangements.",
  "Hi! Are you free this weekend? Let's plan our trip!",
  [("Say what you are going to do on the trip (I'm going to visit the old town).",
    "Gezide ne yapacağını söyle (I'm going to visit the old town).",
    "Di qué vas a hacer en el viaje (I'm going to visit the old town).",
    "Diga o que você vai fazer na viagem (I'm going to visit the old town).",
    "Sag, was du auf der Reise machen wirst (I'm going to visit the old town)."),
   ("Agree on a time and a place with the present continuous (We're meeting at the station at ten).",
    "Present continuous ile bir saat ve yer üzerinde anlaş (We're meeting at the station at ten).",
    "Acordad una hora y un lugar con el presente continuo (We're meeting at the station at ten).",
    "Combine um horário e um lugar com o present continuous (We're meeting at the station at ten).",
    "Vereinbart mit dem Present Continuous Zeit und Ort (We're meeting at the station at ten).")],
  [("I'm going to take lots of photos.", "Bol bol fotoğraf çekeceğim.", "Voy a hacer muchas fotos.", "Vou tirar muitas fotos.", "Ich werde viele Fotos machen."),
   ("We're leaving on Friday evening.", "Cuma akşamı yola çıkıyoruz.", "Salimos el viernes por la tarde.", "Vamos partir na sexta à noite.", "Wir fahren am Freitagabend los."),
   ("What are you going to do there?", "Orada ne yapacaksın?", "¿Qué vas a hacer allí?", "O que você vai fazer lá?", "Was wirst du dort machen?")])

S("vs-a2-helping-move", "A2_N15", "A2", "📦", "Nina",
  ("Helping a Friend Move", "Taşınan Arkadaşa Yardım", "Ayudar a un amigo con la mudanza", "Ajudando uma amiga na mudança", "Einer Freundin beim Umzug helfen"),
  ("Arkadaşın", "Tu amiga", "Sua amiga", "Deine Freundin"),
  "You are Nina, moving to a new flat tomorrow. You are stressed: boxes everywhere, no car, a heavy sofa and the van is not booked. React happily to every offer ('Oh, thank you!'). Ask 'Can you come at nine?' and 'Do you think it will rain?'. Let the learner offer, decide and promise with will and won't.",
  "Oh hi! I'm so tired. I'm moving tomorrow and nothing is ready!",
  [("Offer to help with two things using I'll… (I'll carry the boxes).",
    "I'll… ile iki konuda yardım teklif et (I'll carry the boxes).",
    "Ofrécete a ayudar en dos cosas con I'll… (I'll carry the boxes).",
    "Ofereça ajuda em duas coisas usando I'll… (I'll carry the boxes).",
    "Biete bei zwei Dingen deine Hilfe mit I'll… an (I'll carry the boxes)."),
   ("Make a promise and a prediction (I'll be there at nine. It won't take long).",
    "Bir söz ver ve bir tahminde bulun (I'll be there at nine. It won't take long).",
    "Haz una promesa y una predicción (I'll be there at nine. It won't take long).",
    "Faça uma promessa e uma previsão (I'll be there at nine. It won't take long).",
    "Gib ein Versprechen und eine Vorhersage ab (I'll be there at nine. It won't take long).")],
  [("I'll help you with the boxes.", "Kolilerde sana yardım ederim.", "Te ayudo con las cajas.", "Eu ajudo você com as caixas.", "Ich helfe dir mit den Kisten."),
   ("Don't worry, I'll be there at nine.", "Merak etme, dokuzda orada olacağım.", "No te preocupes, estaré allí a las nueve.", "Não se preocupe, estarei lá às nove.", "Keine Sorge, ich bin um neun da."),
   ("I think it will be easy.", "Bence kolay olacak.", "Creo que será fácil.", "Acho que vai ser fácil.", "Ich glaube, es wird leicht.")])

S("vs-a2-phone-shop", "A2_N16", "A2", "📱", "Ryan",
  ("Choosing a Phone", "Telefon Seçimi", "Elegir un móvil", "Escolhendo um celular", "Ein Handy aussuchen"),
  ("Satış danışmanı", "Dependiente", "Vendedor", "Verkäufer"),
  "You are Ryan, a salesperson in a phone shop. You have two phones. The Nova is cheaper (300 euros), lighter and smaller, with a good camera. The Titan is more expensive (600 euros), faster and has the best battery. Do not choose for the learner: describe both and ask what is more important to them. Let them compare. Use comparatives and superlatives yourself.",
  "Hi there! Are you looking for a new phone?",
  [("Compare the two phones with comparatives (The Titan is faster than the Nova).",
    "İki telefonu karşılaştırma yapılarıyla karşılaştır (The Titan is faster than the Nova).",
    "Compara los dos móviles con comparativos (The Titan is faster than the Nova).",
    "Compare os dois celulares usando comparativos (The Titan is faster than the Nova).",
    "Vergleiche die beiden Handys mit dem Komparativ (The Titan is faster than the Nova)."),
   ("Choose one phone and say why, with a superlative or as … as (It's the best for me).",
    "Bir telefon seç ve nedenini en üstünlük ya da as … as ile söyle (It's the best for me).",
    "Elige un móvil y di por qué, con un superlativo o as … as (It's the best for me).",
    "Escolha um celular e diga por quê, com um superlativo ou as … as (It's the best for me).",
    "Such ein Handy aus und begründe es mit dem Superlativ oder as … as (It's the best for me).")],
  [("Which one is cheaper?", "Hangisi daha ucuz?", "¿Cuál es más barato?", "Qual é mais barato?", "Welches ist günstiger?"),
   ("This one is better than that one.", "Bu şundan daha iyi.", "Este es mejor que ese.", "Este é melhor que aquele.", "Dieses ist besser als jenes."),
   ("It's the most expensive phone.", "En pahalı telefon bu.", "Es el móvil más caro.", "É o celular mais caro.", "Es ist das teuerste Handy.")])

S("vs-a2-doctor-visit", "A2_N17", "A2", "🩺", "Dr. Evans",
  ("A Visit to the Doctor", "Doktor Randevusu", "Una visita al médico", "Uma consulta médica", "Beim Arzt"),
  ("Doktor", "Médica", "Médica", "Ärztin"),
  "You are Dr. Evans, a calm doctor. The learner has had a cold and a sore throat for three days and feels tired. Ask about symptoms, then give advice and rules: 'You should stay at home and drink water. You must take the medicine twice a day. You mustn't go to work tomorrow.' Ask whether they have to travel or work this week.",
  "Hello, please sit down. What's the problem?",
  [("Describe your problem and ask for advice (What should I do?).",
    "Sorununu anlat ve tavsiye iste (What should I do?).",
    "Describe tu problema y pide consejo (What should I do?).",
    "Descreva seu problema e peça conselho (What should I do?).",
    "Beschreibe dein Problem und bitte um Rat (What should I do?)."),
   ("Say what you have to do this week and ask what you must or mustn't do (I have to work on Friday).",
    "Bu hafta neler yapmak zorunda olduğunu söyle ve neleri yapman ya da yapmaman gerektiğini sor (I have to work on Friday).",
    "Di qué tienes que hacer esta semana y pregunta qué debes o no debes hacer (I have to work on Friday).",
    "Diga o que você tem que fazer esta semana e pergunte o que deve ou não deve fazer (I have to work on Friday).",
    "Sag, was du diese Woche tun musst, und frag, was du tun oder lassen musst (I have to work on Friday).")],
  [("I have a headache and a sore throat.", "Başım ağrıyor ve boğazım yanıyor.", "Me duele la cabeza y la garganta.", "Estou com dor de cabeça e de garganta.", "Ich habe Kopf- und Halsschmerzen."),
   ("What should I do?", "Ne yapmalıyım?", "¿Qué debería hacer?", "O que devo fazer?", "Was soll ich tun?"),
   ("I have to work tomorrow.", "Yarın çalışmak zorundayım.", "Mañana tengo que trabajar.", "Amanhã eu tenho que trabalhar.", "Ich muss morgen arbeiten.")])

S("vs-a2-have-you-ever", "A2_N18", "A2", "✈️", "Tara",
  ("Have You Ever…?", "Hiç … Yaptın mı?", "¿Alguna vez has…?", "Você já…?", "Hast du schon mal…?"),
  ("Hostel'de tanıştığın gezgin", "Una viajera del hostal", "Uma viajante do hostel", "Eine Reisende im Hostel"),
  "You are Tara, a backpacker the learner meets in a hostel kitchen. You have been to Japan and Peru, you have tried bungee jumping and you have never eaten snails. You have just arrived and have not seen the city yet. Ask 'Have you ever...?' questions and react with surprise. Use ever, never, just, already and yet.",
  "Hi! I've just arrived. Have you been here long?",
  [("Ask Tara two 'Have you ever…?' questions.",
    "Tara'ya iki tane 'Have you ever…?' sorusu sor.",
    "Haz a Tara dos preguntas con 'Have you ever…?'.",
    "Faça à Tara duas perguntas com 'Have you ever…?'.",
    "Stell Tara zwei Fragen mit 'Have you ever…?'."),
   ("Tell Tara things you have done and never done (I've been to Italy. I've never tried sushi).",
    "Tara'ya yaptığın ve hiç yapmadığın şeyleri anlat (I've been to Italy. I've never tried sushi).",
    "Cuéntale a Tara cosas que has hecho y que nunca has hecho (I've been to Italy. I've never tried sushi).",
    "Conte à Tara coisas que você já fez e nunca fez (I've been to Italy. I've never tried sushi).",
    "Erzähl Tara, was du schon gemacht und noch nie gemacht hast (I've been to Italy. I've never tried sushi).")],
  [("Have you ever been to Japan?", "Hiç Japonya'ya gittin mi?", "¿Has estado alguna vez en Japón?", "Você já foi ao Japão?", "Warst du schon mal in Japan?"),
   ("I've never tried sushi.", "Hiç suşi denemedim.", "Nunca he probado el sushi.", "Eu nunca provei sushi.", "Ich habe noch nie Sushi probiert."),
   ("I've already seen the old town.", "Eski şehri zaten gördüm.", "Ya he visto el casco antiguo.", "Eu já vi o centro histórico.", "Die Altstadt habe ich schon gesehen.")])

S("vs-a2-who-ate-the-cake", "A2_N19", "A2", "🍰", "Zoe",
  ("Who Ate the Cake?", "Pastayı Kim Yedi?", "¿Quién se comió la tarta?", "Quem comeu o bolo?", "Wer hat den Kuchen gegessen?"),
  ("Ev arkadaşın", "Tu compañera de piso", "Sua colega de apartamento", "Deine Mitbewohnerin"),
  "You are Zoe, a flatmate. The last piece of chocolate cake is gone and you pretend to be a detective. Ask the learner what they were doing at 3 pm, at 5 pm and when the cake disappeared ('What were you doing when...?'). Say what you were doing yourself ('I was studying while you were out'). In the end decide whether you believe them. Keep it playful.",
  "Excuse me, detective Zoe here. Someone ate the last piece of cake!",
  [("Say what you were doing yesterday at 3 pm and at 5 pm (I was reading at three).",
    "Dün saat üçte ve beşte ne yapıyor olduğunu söyle (I was reading at three).",
    "Di qué estabas haciendo ayer a las 3 y a las 5 de la tarde (I was reading at three).",
    "Diga o que você estava fazendo ontem às 15h e às 17h (I was reading at three).",
    "Sag, was du gestern um 15 und um 17 Uhr gemacht hast (I was reading at three)."),
   ("Use when and while to tell your story (I was cooking while my brother was watching TV).",
    "Hikâyeni anlatırken when ve while kullan (I was cooking while my brother was watching TV).",
    "Usa when y while para contar tu historia (I was cooking while my brother was watching TV).",
    "Use when e while para contar sua história (I was cooking while my brother was watching TV).",
    "Benutze when und while, um deine Geschichte zu erzählen (I was cooking while my brother was watching TV).")],
  [("I was studying at three.", "Saat üçte ders çalışıyordum.", "A las tres estaba estudiando.", "Às três eu estava estudando.", "Um drei Uhr habe ich gelernt."),
   ("I was cooking when you called.", "Sen aradığında yemek yapıyordum.", "Estaba cocinando cuando llamaste.", "Eu estava cozinhando quando você ligou.", "Ich habe gekocht, als du angerufen hast."),
   ("What were you doing?", "Ne yapıyordun?", "¿Qué estabas haciendo?", "O que você estava fazendo?", "Was hast du gemacht?")])

S("vs-a2-driving-lesson", "A2_N20", "A2", "🚗", "Mark",
  ("Driving Lesson", "Direksiyon Dersi", "Clase de conducir", "Aula de direção", "Fahrstunde"),
  ("Sürüş eğitmeni", "Instructor de conducir", "Instrutor de direção", "Fahrlehrer"),
  "You are Mark, a patient driving instructor in the car with the learner. Give feedback on how they drive: 'You drive carefully but too slowly. Turn left quickly now.' Ask how they feel and how they did. Use adjectives and adverbs: quick / quickly, good / well, careful / carefully, slow / slowly, bad / badly.",
  "Okay, let's start. Are you ready? Drive slowly, please.",
  [("Say how you do things with adverbs (I drive carefully. I speak slowly).",
    "Bir şeyi nasıl yaptığını zarflarla söyle (I drive carefully. I speak slowly).",
    "Di cómo haces las cosas con adverbios (I drive carefully. I speak slowly).",
    "Diga como você faz as coisas usando advérbios (I drive carefully. I speak slowly).",
    "Sag mit Adverbien, wie du Dinge machst (I drive carefully. I speak slowly)."),
   ("Ask for feedback and answer (Did I drive well?).",
    "Geri bildirim iste ve yanıtla (Did I drive well?).",
    "Pide opinión sobre cómo lo haces y responde (Did I drive well?).",
    "Peça feedback e responda (Did I drive well?).",
    "Bitte um Feedback und antworte (Did I drive well?).")],
  [("I drive carefully.", "Dikkatli sürerim.", "Conduzco con cuidado.", "Eu dirijo com cuidado.", "Ich fahre vorsichtig."),
   ("Did I do it well?", "İyi yaptım mı?", "¿Lo hice bien?", "Eu fiz bem?", "Habe ich es gut gemacht?"),
   ("Can you speak more slowly?", "Daha yavaş konuşabilir misin?", "¿Puedes hablar más despacio?", "Você pode falar mais devagar?", "Kannst du langsamer sprechen?")])

S("vs-a2-party-plan", "A2_N21", "A2", "🎈", "Priya",
  ("Planning a Party", "Parti Hazırlığı", "Preparar una fiesta", "Planejando uma festa", "Eine Party planen"),
  ("Ev arkadaşın", "Tu compañera de piso", "Sua colega de apartamento", "Deine Mitbewohnerin"),
  "You are Priya, planning a housewarming party with the learner. You have a lot of snacks and drinks, a few chairs, a little ice and too many balloons. You still need cups. Ask what you still need and how many people are coming. Point out when something is too much or too many ('We have too much juice').",
  "OK, the party is on Saturday! What do we need?",
  [("Say what you have and what you need with a lot of, a few and a little (We have a lot of snacks. We need a few chairs).",
    "Neyin olduğunu ve neye ihtiyaç olduğunu a lot of, a few ve a little ile söyle (We have a lot of snacks. We need a few chairs).",
    "Di qué tenéis y qué necesitáis con a lot of, a few y a little (We have a lot of snacks. We need a few chairs).",
    "Diga o que vocês têm e o que precisam usando a lot of, a few e a little (We have a lot of snacks. We need a few chairs).",
    "Sag mit a lot of, a few und a little, was ihr habt und was ihr braucht (We have a lot of snacks. We need a few chairs)."),
   ("Point out a problem with too much / too many (There are too many balloons).",
    "too much / too many ile bir sorunu belirt (There are too many balloons).",
    "Señala un problema con too much / too many (There are too many balloons).",
    "Aponte um problema com too much / too many (There are too many balloons).",
    "Weise mit too much / too many auf ein Problem hin (There are too many balloons).")],
  [("We need a few more chairs.", "Birkaç sandalyeye daha ihtiyacımız var.", "Necesitamos unas sillas más.", "Precisamos de mais algumas cadeiras.", "Wir brauchen noch ein paar Stühle."),
   ("There's too much juice.", "Çok fazla meyve suyu var.", "Hay demasiado zumo.", "Tem suco demais.", "Es gibt zu viel Saft."),
   ("We have a lot of snacks.", "Bir sürü atıştırmalığımız var.", "Tenemos muchos aperitivos.", "Temos muitos petiscos.", "Wir haben viele Snacks.")])

S("vs-a2-picnic-plans", "A2_N22", "A2", "🧺", "Max",
  ("Picnic Plans", "Piknik Planı", "Planes de picnic", "Planos de piquenique", "Picknick-Pläne"),
  ("Arkadaşın", "Tu amigo", "Seu amigo", "Dein Freund"),
  "You are Max, the learner's friend. You want a picnic on Sunday but the forecast says it might rain, so you worry a little. Ask 'What will we do if it rains?' and 'What do you do if you feel hungry on a picnic?'. Share your own ideas with if ('If it rains, we'll go to a cafe.'). Accept good ideas.",
  "Hey! Are we still doing the picnic on Sunday? Look at the sky!",
  [("Make plans for different weather with if (If it rains, we'll go to the museum).",
    "Farklı havalar için if ile plan yap (If it rains, we'll go to the museum).",
    "Haz planes para distintos climas con if (If it rains, we'll go to the museum).",
    "Faça planos para climas diferentes com if (If it rains, we'll go to the museum).",
    "Mach mit if Pläne für verschiedenes Wetter (If it rains, we'll go to the museum)."),
   ("Ask and answer 'What will you do if…?' and say a general truth (If I'm tired, I stay at home).",
    "'What will you do if…?' sor ve yanıtla, bir de genel doğru söyle (If I'm tired, I stay at home).",
    "Pregunta y responde 'What will you do if…?' y di una verdad general (If I'm tired, I stay at home).",
    "Pergunte e responda 'What will you do if…?' e diga uma verdade geral (If I'm tired, I stay at home).",
    "Frag und antworte 'What will you do if…?' und nenne eine allgemeine Wahrheit (If I'm tired, I stay at home).")],
  [("If it rains, we'll stay home.", "Yağmur yağarsa evde kalırız.", "Si llueve, nos quedaremos en casa.", "Se chover, ficaremos em casa.", "Wenn es regnet, bleiben wir zu Hause."),
   ("What will you do if it's cold?", "Hava soğuk olursa ne yapacaksın?", "¿Qué harás si hace frío?", "O que você vai fazer se estiver frio?", "Was machst du, wenn es kalt ist?"),
   ("If I'm hungry, I eat.", "Acıkırsam yerim.", "Si tengo hambre, como.", "Se estou com fome, eu como.", "Wenn ich Hunger habe, esse ich.")])

S("vs-a2-why-late", "A2_N23", "A2", "⏰", "Kate",
  ("Why Were You Late?", "Neden Geç Kaldın?", "¿Por qué llegaste tarde?", "Por que você se atrasou?", "Warum bist du zu spät?"),
  ("Arkadaşın", "Tu amiga", "Sua amiga", "Deine Freundin"),
  "You are Kate, waiting at a cafe for the learner, who is 30 minutes late. You are a bit annoyed but curious and kind. Ask what happened and say 'And then?' to get a full story. React to details ('Oh no!', 'Really?'). Do not accept 'I was late' as a full answer; ask for the order of events and the reasons.",
  "There you are! You're late. What happened?",
  [("Tell what happened in order with first, then, after that and finally.",
    "Olanları first, then, after that ve finally ile sırasıyla anlat.",
    "Cuenta lo que pasó en orden con first, then, after that y finally.",
    "Conte o que aconteceu em ordem com first, then, after that e finally.",
    "Erzähl der Reihe nach, was passiert ist, mit first, then, after that und finally."),
   ("Explain reasons and results with because, so and but (I missed the bus, so I walked).",
    "Nedenleri ve sonuçları because, so ve but ile açıkla (I missed the bus, so I walked).",
    "Explica los motivos y las consecuencias con because, so y but (I missed the bus, so I walked).",
    "Explique os motivos e as consequências com because, so e but (I missed the bus, so I walked).",
    "Erkläre Gründe und Folgen mit because, so und but (I missed the bus, so I walked).")],
  [("First, I missed the bus.", "Önce otobüsü kaçırdım.", "Primero, perdí el autobús.", "Primeiro, perdi o ônibus.", "Zuerst habe ich den Bus verpasst."),
   ("Then I walked, but it was far.", "Sonra yürüdüm ama çok uzaktı.", "Luego caminé, pero estaba lejos.", "Depois caminhei, mas era longe.", "Dann bin ich gelaufen, aber es war weit."),
   ("I'm late because there was traffic.", "Trafik vardı, bu yüzden geç kaldım.", "Llego tarde porque había tráfico.", "Estou atrasado porque havia trânsito.", "Ich bin spät, weil Stau war.")])


# Hangi sürprizler (sceneTwists.ts) bu sahnede doğal durur; ilk oynayış her zaman "classic".
DEFAULT_TWISTS = ["chatty", "mixup"]
TWISTS = {
    "vs-a1-gift-shop": ["unavailable", "recommend", "chatty"],
    "vs-a1-lost-property": ["mixup", "chatty"],
    "vs-a1-hotel-desk": ["mixup", "unavailable", "chatty"],
    "vs-a1-neighbour-chat": ["chatty"],
    "vs-a1-gym-signup": ["recommend", "chatty"],
    "vs-a1-city-directions": ["mixup", "chatty"],
    "vs-a1-party-hobbies": ["chatty"],
    "vs-a1-phone-call": ["chatty"],
    "vs-a1-flatshare": ["unavailable", "chatty"],
    "vs-a1-grocery": ["unavailable", "recommend", "mixup"],
    "vs-a1-where-were-you": ["chatty"],
    "vs-a1-weekend-chat": ["chatty"],
    "vs-a2-weekend-trip": ["unavailable", "recommend", "mixup"],
    "vs-a2-helping-move": ["mixup", "chatty"],
    "vs-a2-phone-shop": ["recommend", "unavailable"],
    "vs-a2-doctor-visit": ["chatty"],
    "vs-a2-have-you-ever": ["chatty", "recommend"],
    "vs-a2-who-ate-the-cake": ["chatty"],
    "vs-a2-driving-lesson": ["chatty"],
    "vs-a2-party-plan": ["mixup", "chatty"],
    "vs-a2-picnic-plans": ["chatty"],
    "vs-a2-why-late": ["chatty"],
}


def main():
    base = []
    overlays = {"en": {}, "es": {}, "pt": {}, "de": {}}
    langs = ("en", "tr", "es", "pt", "de")
    for sc in SCENES:
        assert len(sc["situation"]) <= 900, (sc["id"], len(sc["situation"]))
        assert len(sc["opening"]) <= 300, sc["id"]
        assert len(sc["goals"]) == (2 if sc["level"] in ("A1", "A2") else 3) and len(sc["phrases"]) == 3, sc["id"]
        for g in sc["goals"]:
            assert len(g) == 5 and len(g[0]) <= 160, (sc["id"], g[0])
        for p in sc["phrases"]:
            assert len(p) == 5 and len(p[0]) <= 100, (sc["id"], p[0])
        assert len(sc["title"]) == 5 and len(sc["role"]) == 4, sc["id"]
        base.append({
            "id": sc["id"],
            "topicCode": sc["code"],
            "level": sc["level"],
            "emoji": sc["emoji"],
            "durationMin": sc["minutes"],
            "twistIds": TWISTS.get(sc["id"], DEFAULT_TWISTS),
            "title": sc["title"][0],
            "titleTr": sc["title"][1],
            "aiName": sc["name"],
            "aiRole": sc["role"][0],
            "situation": sc["situation"],
            "opening": sc["opening"],
            "objectives": [{"text": g[0], "textTr": g[1]} for g in sc["goals"]],
            "keyPhrases": [{"en": p[0], "tr": p[1]} for p in sc["phrases"]],
        })
        for lang in ("en", "es", "pt", "de"):
            li = langs.index(lang)  # column inside the 5-tuples (en, tr, es, pt, de)
            role = ENGLISH_ROLES[sc["id"]] if lang == "en" else sc["role"][li - 1]  # role tuple has no "en" column
            entry = {"titleTr": sc["title"][li], "aiRole": role}
            for n, g in enumerate(sc["goals"]):
                entry[f"objectives.{n}.textTr"] = g[li]
            for n, p in enumerate(sc["phrases"]):
                entry[f"keyPhrases.{n}.tr"] = p[li]
            overlays[lang][sc["id"]] = entry
    return base, overlays


ENGLISH_ROLES = {
    "vs-a1-first-day": "Your classmate",
    "vs-a1-gift-shop": "Shop assistant",
    "vs-a1-lost-property": "Lost property clerk",
    "vs-a1-hotel-desk": "Receptionist",
    "vs-a1-neighbour-chat": "Your neighbour",
    "vs-a1-gym-signup": "Gym trainer",
    "vs-a1-city-directions": "A passer-by",
    "vs-a1-party-hobbies": "Someone you meet at the party",
    "vs-a1-phone-call": "Your friend",
    "vs-a1-flatshare": "Your flatmate",
    "vs-a1-grocery": "Grocery store assistant",
    "vs-a1-where-were-you": "Your friend",
    "vs-a1-weekend-chat": "Your colleague",
    "vs-a2-weekend-trip": "Your friend",
    "vs-a2-helping-move": "Your friend",
    "vs-a2-phone-shop": "Sales assistant",
    "vs-a2-doctor-visit": "Doctor",
    "vs-a2-have-you-ever": "A traveller at the hostel",
    "vs-a2-who-ate-the-cake": "Your flatmate",
    "vs-a2-driving-lesson": "Driving instructor",
    "vs-a2-party-plan": "Your flatmate",
    "vs-a2-picnic-plans": "Your friend",
    "vs-a2-why-late": "Your friend",
}

if __name__ == "__main__":
    from voice_scenes_ileri import add_ileri
    from voice_scenes_orta import add_orta

    add_orta(S, ENGLISH_ROLES, TWISTS)
    add_ileri(S, ENGLISH_ROLES, TWISTS)
    base, overlays = main()
    (OUT / "voiceScenes.data.json").write_text(json.dumps(base, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    for lang, ov in overlays.items():
        (OUT / "i18n" / f"voiceScenes.{lang}.json").write_text(json.dumps(ov, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(len(base), "sahne yazıldı")
