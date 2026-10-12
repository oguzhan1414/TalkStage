import type { BlogPostSource } from "../types";

export const dePosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- DE-01 (Pillar)
  {
    slug: "typische-englisch-fehler-von-deutschsprachigen",
    locale: "de",
    title: "Typische Englisch-Fehler von Deutschsprachigen (und wie du sie vermeidest)",
    metaTitle: "Typische Englisch-Fehler von Deutschsprachigen: Guide",
    excerpt: "Die häufigsten Fehler Deutschsprachiger im Englischen: von falscher Wortstellung über 'since' bis hin zu Denglisch mit klaren Sag so / Nicht so Beispielen.",
    category: "Niveaus & Grammatik",
    featured: true,
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/typische-englisch-fehler-von-deutschsprachigen-cover.webp",
    coverAlt: "Lernender mit Lupe untersucht typische Grammatikfehler im gesprochenen Englisch",
    summary: [
      "Die meisten typischen Fehler von Deutschsprachigen entstehen durch wörtliche Übersetzung deutscher Satzstrukturen ins Englische.",
      "Die Zeitangabe mit 'since' ('I live here since five years') ist der häufigste grammatikalische Stolperstein.",
      "Im Englischen folgt der Satzbau einer strikten Subjekt-Verb-Objekt-Regel (SVO); das Verb wandert im Nebensatz nie ans Satzende.",
      "Mit der Gegenüberstellung von 'Sag so / Nicht so' lassen sich alte Gewohnheiten im Berufsalltag schnell ablegen.",
    ],
    content: {
      intro: [
        "Du verstehst englische Podcasts ohne Probleme, liest Fachliteratur flüssig und hast in der Schule jahrelang Grammatik gepaukt. Doch sobald du im Meeting vor internationalen Kollegen sprichst oder auf einer Konferenz antworten sollst, schleichen sich plötzlich dieselben altbekannten Fehler ein.",
        "Das Phänomen ist im gesamten DACH-Raum (Deutschland, Österreich, Schweiz) weit verbreitet. Die deutsche und die englische Sprache sind zwar eng verwandte germanische Sprachen, doch genau diese Ähnlichkeit stellt die größte Falle dar. Unser Gehirn versucht instinktiv, deutsche Satzmuster, Präpositionen und Zeitformen 1:1 ins Englische zu übertragen.",
        "In diesem ausführlichen Leitfaden beleuchten wir die typischsten Fehler Deutschsprachiger beim Sprechen, erklären die sprachliche Logik dahinter und zeigen dir konkrete Musterformulierungen nach dem Prinzip 'Sag so / Nicht so'.",
      ],
      sections: [
        {
          heading: "1. Die 'Since'-Falle bei Zeitspannen",
          subheading: "Warum 'I live here since five years' grammatikalisch falsch ist",
          body: [
            "Im Deutschen benutzen wir das Präsens zusammen mit 'seit', wenn eine Handlung in der Vergangenheit begann und bis heute andauert: 'Ich wohne seit fünf Jahren hier'. Im Englischen muss für andauernde Zeiträume zwingend das Present Perfect (Simple oder Continuous) verwendet werden.",
            "Zudem verwechseln viele Deutschsprachige 'since' und 'for': 'Since' markiert einen konkreten Startzeitpunkt (since 2021, since Monday), während 'for' eine Zeitspanne oder Dauer beschreibt (for five years, for two hours).",
          ],
          exampleBox: {
            title: "Zeitspannen und Zeitpunkte",
            wrong: "I work at this company since three years and I live here since 2020.",
            correct: "I have worked at this company for three years and I have lived here since 2020.",
            explanation: "Nutze das Present Perfect ('have worked'). Verwende 'for' für Zeiträume (Dauer) und 'since' ausschließlich für feste Zeitpunkte.",
          },
          table: {
            title: "Unterscheidung von For und Since",
            headers: ["Kategorie", "Englische Struktur", "Beispiel"],
            rows: [
              ["Zeitspanne / Dauer", "FOR + Zeitraum", "For two months / for three days / for a decade"],
              ["Fester Startzeitpunkt", "SINCE + Zeitpunkt", "Since 9:00 AM / since last month / since 2022"],
              ["Falsch im Deutschen", "Präsens + since", "'I am working here since...' (falsch)"],
            ],
          },
        },
        {
          heading: "2. Falsche Wortstellung in Nebensätzen (Das Verb am Ende)",
          subheading: "Die strikte SVO-Regel des Englischen bricht deutsche Nebensatzmuster",
          body: [
            "Im deutschen Nebensatz wandert das konjugierte Verb typischerweise ganz ans Ende: '...weil ich gestern den Bericht geschrieben habe'. Im Englischen gilt jedoch fast ausnahmslos die Reihenfolge: Subjekt + Verb + Objekt (SVO) + Ort + Zeit.",
          ],
          exampleBox: {
            title: "Wortstellung im Nebensatz",
            wrong: "I told him that I the project yesterday finished have.",
            correct: "I told him that I finished the project yesterday.",
            explanation: "Das Verb ('finished') folgt im Englischen direkt auf das Subjekt ('I'), gefolgt vom Objekt ('the project') und der Zeitangabe ('yesterday').",
          },
        },
        {
          heading: "3. 'I become a coffee' und der Klassiker 'Become vs. Get'",
          subheading: "Die verhängnisvolle Verwechslung von 'bekommen' und 'werden'",
          body: [
            "Kaum ein Fehler erheitert Kellner in London oder New York mehr als der Satz: 'I become a coffee, please'. Im Englischen bedeutet 'to become' nämlich 'werden'. Wenn du also sagst 'I become a steak', kündigst du an, dich in ein saftiges Fleischstück zu verwandeln.",
          ],
          table: {
            title: "Bekommen vs. Werden im Englischen",
            headers: ["Deutscher Gedanke", "Falsches Englisch", "Richtiges Englisch"],
            rows: [
              ["Ich bekomme einen Kaffee.", "I become a coffee.", "Could I have a coffee, please? / I'll get a coffee."],
              ["Er wurde wütend.", "He got / became angry.", "He became angry (hier ist 'become' richtig!)."],
              ["Wir bekommen eine E-Mail.", "We become an email.", "We received / got an email."],
            ],
          },
        },
        {
          heading: "4. Verwechslung von 'Make' und 'Do'",
          subheading: "Erschaffen und Herstellen vs. Handeln und Ausführen",
          body: [
            "Im Deutschen deckt das Verb 'machen' fast jede Tätigkeit ab ('Hausaufgaben machen', 'ein Foto machen', 'einen Fehler machen', 'Geschäfte machen'). Im Englischen ist die Trennung präzise: 'Make' bezieht sich auf Kreation, Produktion oder Ergebnisse; 'Do' auf Aufgaben, Pflichten und Handlungen.",
          ],
          list: [
            "Make an appointment, make a mistake, make a decision, make money, make sense.",
            "Do homework, do business, do research, do a favor, do your best.",
          ],
          exampleBox: {
            title: "Make vs. Do Gegenüberstellung",
            wrong: "We need to make business and do a better decision.",
            correct: "We need to do business and make a better decision.",
            explanation: "Geschäfte werden getätigt ('do business'), Entscheidungen werden gefällt und erschaffen ('make a decision').",
          },
        },
        {
          heading: "5. Präpositionsfallen: 'Interested in', nicht 'Interested at'",
          subheading: "Falsche wörtliche Übersetzungen deutscher Präpositionen",
          body: [
            "Präpositionen lassen sich nicht logisch aus dem Deutschen ableiten. Ein Klassiker: 'interessiert an' wird fälschlicherweise zu 'interested at' oder 'interested on' übersetzt. Es heißt immer 'interested in'.",
          ],
          checklist: [
            "Interested IN (nicht 'at' oder 'for'): 'I'm interested in cloud computing.'",
            "Depends ON (nicht 'from'): 'It depends on the budget' ('Es hängt vom Budget ab').",
            "Discuss [keine Präposition] (nicht 'discuss about'): 'We need to discuss the roadmap.'",
            "Congratulate ON (nicht 'to'): 'I congratulated him on his promotion.'",
          ],
        },
        {
          heading: "6. Dialog-Analyse: Ein typisches Projekt-Update",
          dialogue: [
            {
              speaker: "Lukas",
              role: "Projektleiter (DACH)",
              en: "Hello everyone. I work on this release since two weeks and yesterday I have seen that we have a blocker.",
              tr: "Hallo zusammen. Ich arbeite seit zwei Wochen an diesem Release, und gestern habe ich gesehen, dass wir einen Blocker haben.",
              tip: "Typische Fehler: 'work since two weeks' statt 'have been working for two weeks' und Present Perfect mit 'yesterday'.",
            },
            {
              speaker: "Sarah",
              role: "Team Lead (International)",
              en: "Thanks Lukas. If you've been working on it for two weeks and spotted an issue yesterday, let's address the root cause right away.",
              tr: "Richtige Zeitformen: 'have been working for two weeks' und 'spotted yesterday'.",
              tip: "Achte auf die elegante Verwendung von 'for' und Simple Past für gestrige Ereignisse.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Warum fällt es mir so schwer, 'since' und 'for' intuitiv zu trennen?",
          a: "Weil das deutsche Wort 'seit' beide Funktionen abdeckt ('seit gestern' und 'seit drei Jahren'). Dein Gehirn muss aktiv lernen, zwischen statischem Zeitpunkt (since) und dynamischer Zeitspanne (for) zu unterscheiden.",
        },
        {
          q: "Darf man im Englischen 'discuss about' sagen?",
          a: "Nein. Das Verb 'discuss' ist im Englischen transitiv und verlangt direkt das Objekt: 'Let's discuss the project'. Die Formulierung 'discuss about' ist eine fehlerhafte Lehnübersetzung von 'über etwas diskutieren'.",
        },
        {
          q: "Wie trainiere ich diese Korrekturen am besten im Alltag?",
          a: "Übe mit kurzen täglichen Sprachsimulationen. In Spekvia sprichst du mit Mivo in Alltags- und Berufsszenarien; die App weist dich auf Fehler in Wortwahl und Ausdruck hin und erklärt sie kurz.",
        },
      ],
      conclusion: [
        "Deutschsprachige bringen durch ihr strukturiertes Schulwissen meist hervorragende Grammatikkenntnisse mit. Die Herausforderung liegt darin, die verbliebenen 'Denglisch'-Routinen aufzubrechen und durch natürliche englische Reflexe zu ersetzen.",
        "Picke dir heute zwei Punkte heraus—beispielsweise das korrekte 'have been working for' und das Streichen von 'discuss about'—und wende sie in deinem nächsten Meeting bewusst an.",
        "Präzision im Englischen ist kein Zufall, sondern das Resultat gezielten Trainings.",
      ],
    },
    sources: [
      { name: "Swan, M. & Smith, B. (eds.) — Learner English: A Teacher's Guide to Interference and Other Problems (Cambridge University Press)" },
    ],
  },

  // ---------------------------------------------------------------- DE-02
  {
    slug: "false-friends-deutsch-englisch",
    locale: "de",
    title: "False Friends Deutsch–Englisch: 16 Wörter, die dich verraten",
    metaTitle: "False Friends Deutsch-Englisch: 16 gefährliche Wörter",
    excerpt: "Vermeide peinliche Missverständnisse mit unserer Übersicht von 16 tückischen falschen Freunden zwischen Deutsch und Englisch im Beruf und Alltag.",
    category: "Niveaus & Grammatik",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/false-friends-deutsch-englisch-cover.webp",
    coverAlt: "Zwei Masken auf einem Tisch als Symbol für falsche Freunde zwischen Deutsch und Englisch",
    summary: [
      "Falsche Freunde (False Friends) klingen im Deutschen und Englischen fast gleich, haben jedoch grundverschiedene Bedeutungen.",
      "Ein 'Gift' im Englischen ist ein Geschenk; die deutsche Bedeutung (Gift) heißt auf Englisch 'poison'.",
      "Der englische 'Chef' ist der Küchenchef im Restaurant; dein beruflicher Vorgesetzter heißt 'boss' oder 'manager'.",
      "Kategorisierte Vokabelpaare verhindern fatale Fehltritte in Verträgen und Geschäftsbriefen.",
    ],
    content: {
      intro: [
        "Du möchtest deinem Geschäftspartner ein Kompliment machen und sagst freundlich: 'Thank you for the nice gift!' Alles wunderbar—bis dir einfällt, dass dasselbe Wort im Deutschen ein tödliches Gift bezeichnet. Noch heikler wird es, wenn du im Meeting deinen Teamleiter als 'our chef' vorstellst und sich alle fragen, warum der Koch plötzlich die Quartalszahlen präsentiert.",
        "Falsche Freunde sind sprachliche Minenfelder. Weil Deutsch und Englisch eng verwandt sind, verleitet uns die klangliche Ähnlichkeit dazu, Bedeutungen unreflektiert zu übernehmen. Doch während manche Verwechslungen nur für ein Schmunzeln sorgen, können andere in Verhandlungen oder Rechtsfragen gravierende Missverständnisse auslösen.",
        "Hier findest du 16 besonders tückische falsche Freunde zwischen Deutsch und Englisch, gegliedert nach Berufsleben, Alltag und Kommunikation.",
      ],
      sections: [
        {
          heading: "1. Falsche Freunde im Berufs- und Geschäftsleben",
          subheading: "Wörter, die in Verträgen und Verhandlungen teuer werden können",
          body: [
            "Gerade im geschäftlichen Kontext führt die Verwechslung von falschen Freunden schnell dazu, dass Zusagen missverstanden werden oder Kompetenzen unklar bleiben:",
          ],
          table: {
            title: "False Friends im Berufsalltag",
            headers: ["Englischer Begriff", "Klingt wie...", "Echte Bedeutung", "So heißt das deutsche Wort auf Englisch"],
            rows: [
              ["Chef", "Chef (Vorgesetzter)", "Küchenchef / Chefkoch", "Boss / manager / supervisor"],
              ["Actual", "Aktuell (derzeit)", "Tatsächlich / eigentlich", "Current / present"],
              ["Eventually", "Eventuell (vielleicht)", "Schließlich / am Ende", "Possibly / perhaps / maybe"],
              ["Spend", "Spenden (Geld geben)", "Ausgeben / verbringen", "Donate (Geld spenden)"],
              ["Brand", "Brand (Feuer)", "Marke / Handelsmarke", "Fire (Feuerbrand)"],
              ["Fabric", "Fabrik", "Stoff / Gewebe", "Factory / plant (Fabrik)"],
            ],
          },
          exampleBox: {
            title: "Die Verwechslung von 'Eventually' und 'Eventuell'",
            wrong: "Eventually we will launch the feature tomorrow if we have time.",
            correct: "Possibly we will launch the feature tomorrow if we have time.",
            explanation: "'Eventually' bedeutet 'schließlich / letztendlich' und drückt Gewissheit aus. Für 'eventuell / vielleicht' musst du 'possibly', 'perhaps' oder 'maybe' verwenden.",
          },
        },
        {
          heading: "2. Falsche Freunde im Alltag und in der Kommunikation",
          subheading: "Klassiker, die im Hotel, Restaurant oder Gespräch lauern",
          body: [
            "In lockeren Gesprächen oder auf Reisen sorgen diese Vokabeln regelmäßig für Verwirrung:",
          ],
          table: {
            title: "False Friends im Alltag",
            headers: ["Englischer Begriff", "Klingt wie...", "Echte Bedeutung", "So heißt das deutsche Wort auf Englisch"],
            rows: [
              ["Gift", "Gift (Giftstoff)", "Geschenk / Gabe", "Poison / venom / toxin"],
              ["Handy", "Handy (Mobiltelefon)", "Praktisch / nützlich", "Mobile phone / smartphone"],
              ["Brave", "Brav (artig)", "Mutig / tapfer", "Well-behaved / good (brav)"],
              ["Sensible", "Sensibel (feinfühlig)", "Vernünftig / vernunftbegabt", "Sensitive (feinfühlig/sensibel)"],
              ["Sympathetic", "Sympathisch", "Mitfühlend / verständnisvoll", "Likable / friendly (sympathisch)"],
              ["Gross", "Groß", "Ekelhaft / brutto", "Big / tall / large (groß)"],
            ],
          },
          dialogue: [
            {
              speaker: "Thomas",
              role: "DACH-Tourist in London",
              en: "Excuse me, could you give me a handy? I need to call my hotel.",
              tr: "Entschuldigung, könnten Sie mir ein 'Handy' geben? Ich muss mein Hotel anrufen.",
              tip: "Im Englischen existiert das Wort 'Handy' als Substantiv für Mobiltelefon nicht; es ist ein Scheinanglizismus.",
            },
            {
              speaker: "Passant",
              role: "Einheimischer",
              en: "Do you mean a mobile phone? Sure, you can borrow my phone for a quick call.",
              tr: "Meinen Sie ein Mobiltelefon? Klar, Sie können kurz mein Telefon für einen Anruf benutzen.",
              tip: "'Mobile phone' oder 'cell phone' ist die richtige Bezeichnung.",
            },
          ],
        },
        {
          heading: "3. Scheinanglizismen: Deutsche Erfindungen, die es im Englischen so nicht gibt",
          subheading: "Wörter, die englisch klingen, im englischsprachigen Raum aber niemand versteht",
          body: [
            "Besonders tückisch sind Begriffe, die im deutschsprachigen Raum als angebliche 'englische Wörter' etabliert wurden, die aber in England oder den USA vollkommen andere Bezeichnungen haben:",
          ],
          list: [
            "Beamer: Auf Englisch ist ein 'beamer' umgangssprachlich ein BMW-Fahrzeug. Das Projektionsgerät heißt 'projector'.",
            "Public Viewing: Im Englischen bezeichnet 'public viewing' die öffentliche Aufbahrung eines Leichnams. Das gemeinsame Fußballschauen heißt 'public screening' oder 'fan fest'.",
            "Oldtimer: Bezeichnet im Englischen einen betagten älteren Herrn. Ein historisches Auto heißt 'classic car' oder 'vintage car'.",
            "Smoking: Der elegante Abendanzug heißt im britischen Englisch 'dinner jacket' und im amerikanischen Englisch 'tuxedo'.",
          ],
        },
        {
          heading: "4. Selbsttest: Hast du die False Friends im Griff?",
          subheading: "Überprüfe dein Wissen anhand dieser Praxissätze",
          checklist: [
            "Wie sagst du 'Sie ist sehr feinfühlig'? -> 'She is very sensitive' (nicht 'sensible').",
            "Wie sagst du 'Ich habe mit meinem Chef gesprochen'? -> 'I spoke with my boss / manager' (nicht 'chef').",
            "Wie sagst du 'Wir spenden 1.000 Euro'? -> 'We donate 1,000 euros' (nicht 'spend').",
            "Wie sagst du 'Das ist die aktuelle Version'? -> 'This is the current version' (nicht 'actual').",
          ],
        },
      ],
      faq: [
        {
          q: "Warum hat das deutsche Wort 'Handy' im Englischen keine Bedeutung als Telefon?",
          a: "Das Wort 'Handy' ist ein deutscher Scheinanglizismus der 1990er-Jahre. Im Englischen ist 'handy' ein reines Adjektiv mit der Bedeutung 'praktisch' oder 'griffbereit' ('This tool is very handy').",
        },
        {
          q: "Wie kann ich mir den Unterschied zwischen 'sensitive' und 'sensible' merken?",
          a: "Merkhilfe: 'Sensible' hat dieselbe Wurzel wie 'Sense' (gesunder Menschenverstand = vernünftig). 'Sensitive' hängt mit 'Senses' (Sinne / Gefühle = feinfühlig) zusammen.",
        },
        {
          q: "Hilft mir Spekvia bei der Vermeidung von False Friends?",
          a: "In den Sprachgesprächen mit Mivo weist dich die App auf Fehler in Wortwahl und Ausdruck hin, erklärt sie kurz und speichert sie in Mein Fehlerheft. So kannst du die Wörter wiederholen, die dich am häufigsten verraten.",
        },
      ],
      conclusion: [
        "Falsche Freunde sind keine Schande, sondern faszinierende Zeugnisse der Sprachgeschichte. Wenn du diese 16 Fallen kennst, sprichst du präziser und wirkst im Gespräch sicherer.",
        "Behalte diese Liste griffbereit und gehe deinen nächsten englischen Fachtext oder dein nächstes Meeting mit geschärftem Blick an.",
      ],
    },
  },

  // ---------------------------------------------------------------- DE-03
  {
    slug: "englische-aussprache-schwierige-laute",
    locale: "de",
    title: "Aussprache: Die schwierigsten englischen Laute für Deutschsprachige (th, w/v, r)",
    metaTitle: "Englische Aussprache: die schwierigsten Laute meistern",
    excerpt: "Lerne, wie du das englische TH, die Unterscheidung zwischen W und V sowie die Auslautverhärtung mit gezielten Übungen und Minimalpaaren trainierst.",
    category: "Methodik & Lerntipps",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/englische-aussprache-schwierige-laute-cover.webp",
    coverAlt: "Profilansicht mit bunten Schallwellen zur Veranschaulichung englischer Artikulation",
    summary: [
      "Die deutsche Gewohnheit, W wie V auszusprechen, führt dazu, dass 'wine' wie 'vine' und 'west' wie 'vest' klingt.",
      "Das englische TH (/θ/ und /ð/) benötigt zwingend Zungenkontakt an den Schneidezähnen; Ersetzungen durch 's' oder 'z' fallen sofort auf.",
      "Die deutsche Auslautverhärtung bewirkt, dass englische Wörter wie 'bad' fälschlicherweise wie 'bat' klingen.",
      "Mit der Spiegeltechnik und gezielten Minimalpaaren lässt sich die Mundmotorik gezielt trainieren.",
    ],
    content: {
      intro: [
        "Viele Deutschsprachige sprechen grammatikalisch hervorragendes Englisch, fühlen sich jedoch wegen ihres typischen harten Akzents unsicher. Ein leichter deutscher Akzent ist im internationalen Geschäftsleben keineswegs ein Makel—er gilt oft sogar als präzise und verlässlich.",
        "Problematisch wird es erst dann, wenn phonetische Besonderheiten des Deutschen dazu führen, dass Wörter missverstanden werden oder für die Zuhörer anstrengend zu entschlüsseln sind. Das betrifft vor allem drei Stolpersteine: das 'TH', die Verwechslung von 'W' und 'V' sowie die sogenannte deutsche Auslautverhärtung am Wortende.",
        "In diesem Praxisführer erfährst du anatomisch genau, wie du Zunge und Lippen positionieren musst, um diese Laute authentisch zu artikulieren.",
      ],
      sections: [
        {
          heading: "1. Das englische 'W' vs. 'V': Lippenrundung vs. Zahnkontakt",
          subheading: "Der häufigste Aussprachefehler im deutschsprachigen Raum",
          body: [
            "Im Deutschen wird der Buchstabe 'W' (wie in 'Wasser') labiodental gesprochen: Die oberen Schneidezähne berühren die Unterlippe. Das entspricht exakt dem englischen V-Laut (very, village, visit).",
            "Das englische 'W' (water, window, would) ist dagegen ein bilabialer Gleitlaut: Die Zähne spielen keine Rolle! Du rundest die Lippen zu einem engen Kussmund—genau wie beim Vokal 'U'—und öffnest sie dann mit einem weichen Schwung.",
          ],
          exampleBox: {
            title: "Die Kussmund-Regel für das W",
            wrong: "Pronunciation: 'Very vell' (Zähne berühren auch beim W die Unterlippe).",
            correct: "Pronunciation: 'Very well' (V = Zähne an Unterlippe; W = runder Kussmund).",
            explanation: "Übe den Übergang: 'V' summt an der Lippe wie eine Biene, 'W' formt einen runden Kreis ohne jeden Zahnkontakt.",
          },
          table: {
            title: "Minimalpaare: W vs. V",
            headers: ["W-Wort (Kussmund)", "V-Wort (Zähne an Unterlippe)", "Bedeutungsunterschied"],
            rows: [
              ["Wine (/waɪn/)", "Vine (/vaɪn/)", "Wein vs. Weinrebe / Kletterpflanze"],
              ["West (/west/)", "Vest (/vest/)", "Westen (Himmelsrichtung) vs. Weste"],
              ["Wet (/wet/)", "Vet (/vet/)", "Nass vs. Tierarzt"],
              ["Worse (/wɜːs/)", "Verse (/vɜːs/)", "Schlimmer vs. Gedichtstrophe"],
            ],
          },
        },
        {
          heading: "2. Das englische TH (/θ/ und /ð/) ohne Zischen",
          subheading: "Kein deutsches S oder Z: die Zunge gehört zwischen die Schneidezähne",
          body: [
            "Weil es den TH-Laut im Deutschen nicht gibt, weichen viele Sprecher auf vertraute Zischlaute aus: 'sink' statt 'think' oder 'ze' statt 'the'. Das klingt nicht nur hart, sondern verändert die Bedeutung von Wörtern gravierend.",
            "Es gibt zwei Varianten des TH:",
            "1. Stimmloses TH (/θ/): Lege die Zungenspitze locker zwischen die oberen und unteren Schneidezähne und puste sanft Luft hindurch, ohne dass die Stimmbänder vibrieren (think, three, thank, path).",
            "2. Stimmhaftes TH (/ð/): Gleiche Zungenhaltung, aber mit Vibration im Hals (this, that, brother, with).",
          ],
          checklist: [
            "Übung vor dem Spiegel: Wenn du 'think' sagst, musst du die Spitze deiner Zunge im Spiegel sehen.",
            "Keine Zähne zusammenbeißen: Die Zunge liegt ganz entspannt in der Lücke.",
            "Minimalpaar-Training: Think (denken) vs. Sink (spülen/sinken), Three (drei) vs. Tree (Baum).",
          ],
        },
        {
          heading: "3. Die deutsche Auslautverhärtung am Wortende",
          subheading: "Warum 'bad' wie 'bat' klingt und wie du es verhinderst",
          body: [
            "Im Deutschen werden stimmhafte Konsonanten am Wortende automatisch stimmlos ausgesprochen: Das Wort 'Hund' klingt am Ende wie ein 't', 'Tag' wie ein 'k'. Im Englischen unterscheidet die Stimmhaftigkeit am Wortende jedoch entscheidend über das Wort!",
            "Wenn du 'bad' (schlecht) mit Auslautverhärtung sprichst, sagst du 'bat' (Fledermaus). Bei 'bed' (Bett) sagst du 'bet' (Wette).",
          ],
          table: {
            title: "Auslautverhärtung vermeiden",
            headers: ["Stimmhaft am Ende (Vokal länger ziehen)", "Stimmlos am Ende (Vokal kurz)", "Bedeutungspaar"],
            rows: [
              ["Bad (/bæd/ - Vokal gedehnt)", "Bat (/bæt/ - kurzer Vokal)", "Schlecht vs. Fledermaus"],
              ["Bed (/bed/ - Vokal weich)", "Bet (/bet/ - kurzer Vokal)", "Bett vs. Wette"],
              ["Dog (/dɒɡ/ - weiches G)", "Dock (/dɒk/ - hartes K)", "Hund vs. Hafenbecken"],
              ["Code (/kəʊd/ - stimmhaftes D)", "Coat (/kəʊt/ - hartes T)", "Programmcode vs. Mantel"],
            ],
          },
          proTip: "Geheimtipp: Ziehe den Vokal vor einem stimmhaften Endkonsonanten (b, d, g) minimal in die Länge. Dadurch klingt der Laut automatisch weich und das Gehirn des Zuhörers erkennt das richtige Wort.",
        },
        {
          heading: "4. Das englische R: Zungenspitze zurückbiegen, nicht rollen",
          subheading: "Kein deutsches Rachen-R (Zäpfchen-R)",
          body: [
            "Im Deutschen erzeugen wir das R meist tief im Rachen mit dem Gaumenzäpfchen. Im Englischen ist das R ein retroflexer Laut: Die Zungenspitze biegt sich nach oben und hinten in Richtung Gaumen, berührt ihn aber an keiner Stelle! Das Reiben oder Schnarren im Hals entfällt völlig.",
          ],
        },
      ],
      faq: [
        {
          q: "Muss ich mir den britischen oder den amerikanischen Akzent angewöhnen?",
          a: "Das ist reine Geschmackssache. Wichtig ist nur Konsistenz. Beide Varianten sind weltweit gleichermaßen anerkannt. Konzentriere dich primär auf klare Verständlichkeit und korrekte Lautunterscheidungen.",
        },
        {
          q: "Wie lange dauert es, bis das englische W automatisch klappt?",
          a: "Das ist individuell verschieden. Tägliches kurzes Minimalpaar-Training vor dem Spiegel hilft, den Kussmund-Reflex nach und nach zu automatisieren.",
        },
        {
          q: "Wie hilft Spekvia bei der Aussprache?",
          a: "In Spekvia gibt es eine Übungsliste mit Wörtern, die oft falsch ausgesprochen werden: Du hörst die richtige Aussprache, nimmst dich auf und vergleichst. Im Gespräch mit Mivo weist dich die App außerdem auf Fehler in Wortwahl und Grammatik hin.",
        },
      ],
      conclusion: [
        "Aussprache ist angewandte Mundmotorik. Genauso wie du beim Sport eine neue Bewegungsabfolge trainierst, kannst du deine Sprechmuskeln auf die Phonetik des Englischen kalibrieren.",
        "Stelle dich heute fünf Minuten vor den Spiegel, übe die Minimalpaare aus diesem Leitfaden und spüre den Unterschied bei deinem nächsten englischen Satz.",
      ],
    },
    sources: [
      { name: "Wells, J. C. — Longman Pronunciation Dictionary (Pearson)" },
      { name: "Gimson's Pronunciation of English (Routledge)" },
    ],
  },

  // ---------------------------------------------------------------- DE-04
  {
    slug: "business-english-meetings-small-talk-emails",
    locale: "de",
    title: "Business English: Meeting, Small Talk und E-Mails im Berufsalltag",
    metaTitle: "Business English: Meetings, Small Talk & E-Mails im Job",
    excerpt: "Souverän im internationalen Geschäftsalltag: Formulierungen für Meetings, diplomatisches Widersprechen, lockeren Small Talk und professionelle E-Mails.",
    category: "Karriere & Vorstellungsgespräch",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/business-english-meetings-small-talk-emails-cover.webp",
    coverAlt: "Präsentation im Konferenzraum mit harmonisch verschmelzenden Sprechblasen",
    summary: [
      "Die deutsche Direktheit wird im angloamerikanischen Geschäftsleben oft als unhöflich oder konfrontativ wahrgenommen.",
      "Diplomatisches Widersprechen ('Could we consider...') wahrt das Gesicht des Gegenübers und erhält die Zusammenarbeit.",
      "Small Talk vor dem eigentlichen Meeting ist kein Zeitverlust, sondern unverzichtbarer sozialer Schmierstoff.",
      "Klare E-Mail-Strukturen und weichere Modalverben verbessern die internationale Zusammenarbeit messbar.",
    ],
    content: {
      intro: [
        "In der DACH-Region schätzen wir Effizienz, Klarheit und sachbezogene Direktheit: Wenn ein Vorschlag fehlerhaft ist, sagen wir oft schlicht: 'Das ist falsch, das funktioniert so nicht.' Im deutschen Kontext gilt das als professionelle Ehrlichkeit.",
        "In internationalen Teams—insbesondere mit britischen, US-amerikanischen oder asiatischen Kollegen—kann diese ungeschminkte Direktheit jedoch wie ein Schlag ins Gesicht wirken. Die angloamerikanische Geschäftskultur setzt auf diplomatische Weichzeichner, höfliche Fragen und konstruktiven Beziehungsaufbau vor der Sachebene.",
        "In diesem Leitfaden lernst du, wie du im Meeting diplomatisch widersprichst, vor Beginn der Agenda entspannten Small Talk führst und professionelle E-Mails mit dem perfekten Tonfall verfasst.",
      ],
      sections: [
        {
          heading: "1. Diplomatisches Widersprechen im Meeting",
          subheading: "Von 'German Directness' zu internationalem Verhandlungsgeschick",
          body: [
            "Direkte Aussagen wie 'I disagree' oder 'You are wrong' führen in internationalen Runden dazu, dass Kollegen in die Defensive gehen. Diplomatisches Englisch verpackt Kritik in konstruktive Fragen und bedingte Formulierungen:",
          ],
          table: {
            title: "Kritik abmildern im Meeting",
            headers: ["Zu direkt (German Style)", "Diplomatisch (International)", "Wirkung"],
            rows: [
              ["That won't work.", "I see what you're aiming for, but I'm slightly concerned about...", "Wertschätzend, nennt konkrete Bedenken"],
              ["This is wrong.", "I think there might be an issue with the underlying data.", "Fokussiert auf die Sache, nicht die Person"],
              ["Why did you do that?", "Could you walk us through the reasoning behind this approach?", "Lädt zur Erklärung ein ohne Vorwurf"],
              ["We can't do that.", "That might be challenging given our current timeline. Could we explore an alternative?", "Sucht konstruktiv nach Lösungen"],
            ],
          },
          exampleBox: {
            title: "Das Wort im Meeting ergreifen",
            wrong: "Wait, I must say something now!",
            correct: "If I may jump in here for a second... / Could I just add a quick point to that?",
            explanation: "Nutze 'jump in' oder 'add a quick point', um das Wort höflich zu übernehmen, ohne den Redefluss brüsk abzuschneiden.",
          },
        },
        {
          heading: "2. Die Kunst des englischen Small Talks vor der Agenda",
          subheading: "Warum die ersten drei Minuten die wichtigste Beziehungsarbeit sind",
          body: [
            "Viele Deutschsprachige empfinden Small Talk als Zeitverschwendung und wollen sofort zur Sache kommen ('Let's get down to business'). Doch im internationalen Umfeld dient Small Talk dazu, psychologische Sicherheit aufzubauen. Beliebte und unverfängliche Themen:",
          ],
          list: [
            "Wochenende: 'Did you get up to anything exciting over the weekend?'",
            "Wetter / Standort: 'How are things over in Austin today? I heard you've had quite a heatwave.'",
            "Urlaubspläne: 'Any travel plans coming up for the summer break?'",
            "Brücke zum Thema: 'Well, as much as I'd love to chat more, we probably should dive into the agenda to respect everyone's time.'",
          ],
        },
        {
          heading: "3. Professionelle E-Mails: Struktur und Tonalität",
          subheading: "Der Unterschied zwischen einem forschen Befehl und einer Bitte",
          body: [
            "Deutsche E-Mails klingen im Englischen oft wie militärische Anweisungen ('Send me the file until 3 PM'). Englische E-Mails nutzen das Prinzip der Höflichkeitsdistanz mit 'would', 'could' und 'appreciate':",
          ],
          table: {
            title: "E-Mail-Formulierungen im Vergleich",
            headers: ["Zu barsch", "Professionell & freundlich", "Kontext"],
            rows: [
              ["Send me the report.", "Could you please send over the latest report when you have a moment?", "Dokument anfordern"],
              ["Answer me today.", "I would greatly appreciate it if you could share your feedback by end of day.", "Dringende Rückmeldung"],
              ["I need this.", "It would be wonderful if we could finalize this before Friday's sync.", "Terminsetzung"],
            ],
          },
        },
        {
          heading: "4. Meeting-Dialog: Ein Projekttermin mit Kontroverse",
          dialogue: [
            {
              speaker: "Oliver",
              role: "US Product Owner",
              en: "I propose we push the entire mobile app launch forward by two weeks to beat the competitor.",
              tr: "Ich schlage vor, den gesamten Launch der Mobile-App um zwei Wochen vorzuziehen, um dem Wettbewerber zuvorzukommen.",
              tip: "Ambitionierter Vorschlag mit hohem Risiko.",
            },
            {
              speaker: "Julia",
              role: "Lead Engineer (DACH)",
              en: "I see the strategic value in beating them to market. However, from a technical perspective, compressing the QA window by two weeks introduces significant risk of regressions. Could we instead release a targeted beta to our top tier users?",
              tr: "Ich sehe den strategischen Wert darin, ihnen zuvorzukommen. Aus technischer Sicht bringt es jedoch ein erhebliches Regressionsrisiko mit sich, das QA-Fenster um zwei Wochen zu verkürzen. Könnten wir stattdessen eine gezielte Beta für unsere wichtigsten Nutzer veröffentlichen?",
              tip: "Musterbeispiel: Erst zustimmen/loben, dann Bedenken sachlich formulieren, dann Gegenvorschlag einbringen.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Wirkt diese diplomatische Sprache nicht heuchlerisch oder unehrlich?",
          a: "Nein, in der angloamerikanischen Kultur ist sie das Fundament gegenseitigen Respekts. Sie signalisiert: 'Ich schätze dich als Kollegen, auch wenn ich mit dieser spezifischen Sachfrage nicht übereinstimme.'",
        },
        {
          q: "Wie beende ich ein E-Mail professionell?",
          a: "Verwende 'Best regards' oder 'Kind regards' für geschäftliche Standardmails. 'Sincerely' ist eher für formelle Anschreiben; 'Cheers' ist sehr informell (britisch/australisch).",
        },
        {
          q: "Wie übe ich Business-Meeting-Englisch realistisch?",
          a: "In Spekvia kannst du geschäftliche Verhandlungen, Projekt-Updates und schwierige Feedbackgespräche per Sprache mit Mivo durchspielen.",
        },
      ],
      conclusion: [
        "Business English ist weit mehr als Vokabelwissen: Es ist die Fähigkeit, Beziehungen zu pflegen und selbst bei Meinungsverschiedenheiten eine kooperative Arbeitsatmosphäre zu wahren.",
        "Integriere beim nächsten E-Mail oder Meeting eine diplomatische Frage statt einer direkten Forderung—du wirst merken, wie viel reibungsloser die Zusammenarbeit funktioniert.",
      ],
    },
    sources: [
      { name: "Meyer, E. — The Culture Map: Breaking Through the Invisible Boundaries of Global Business", url: "https://erinmeyer.com" },
    ],
  },

  // ---------------------------------------------------------------- DE-05
  {
    slug: "englisch-sprechen-lernen-ohne-partner",
    locale: "de",
    title: "Englisch sprechen lernen ohne Sprachpartner: die 15-Minuten-Routine",
    metaTitle: "Englisch sprechen lernen ohne Partner: 15-Minuten-Plan",
    excerpt: "Verbessere deine Sprachflüssigkeit im Englischen ganz ohne Tandempartner durch Shadowing, Selbstaufnahmen und einen strukturierten 4-Wochen-Trainingsplan.",
    category: "Methodik & Lerntipps",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/englisch-sprechen-lernen-ohne-partner-cover.webp",
    coverAlt: "Schreibtisch mit Kopfhörern und Timer für die tägliche englische Sprachpraxis",
    summary: [
      "Sprachblockaden entstehen nicht aus Mangel an Vokabeln, sondern durch fehlendes motorisches Sprechtraining im Alltag.",
      "Die Shadowing-Methode synchronisiert deine Zungenmotorik und Sprechmelodie mit authentischen Muttersprachlern.",
      "Ein tägliches 15-Minuten-Modell aus drei 5-Minuten-Phasen schlägt stundenlanges passives Grammatikpauken am Wochenende.",
      "Das Aufnehmen der eigenen Stimme beseitigt die Hemmschwelle vor echten Gesprächen.",
    ],
    content: {
      intro: [
        "'Ich habe niemanden, mit dem ich Englisch sprechen kann.' Dieser Satz ist die mit Abstand häufigste Ausrede von Menschen, die zwar seit Jahren englische Texte lesen, beim freien Sprechen aber regelmäßig ins Stocken geraten.",
        "Doch betrachte das Sprechen wie das Erlernen eines Musikinstruments: Ein Pianist wartet nicht auf das Konzert vor Publikum, um seine Fingerfertigkeit zu schulen; er übt täglich stundenlang allein an den Tasten. Genauso verhält es sich mit der Sprachflüssigkeit. Echte Unterhaltungen sind der Testlauf—die motorische Routine wird im geschützten Einzeltraining aufgebaut.",
        "In diesem Leitfaden stellen wir dir eine praxiserprobte 15-Minuten-Routine vor, mit der du deine englische Sprachpraxis völlig unabhängig von Tandempartnern oder teuren Kursen auf ein neues Niveau hebst.",
      ],
      sections: [
        {
          heading: "1. Das 3x5-Minuten-Modell für den Alltag",
          subheading: "Konzentrierte, ablenkungsfreie Einheiten mit maximalem Ertrag",
          body: [
            "Fünfzehn Minuten täglich klingen wenig, doch wenn du sie konsequent laut und mit voller Aufmerksamkeit durchziehst, sprichst du mehr Wörter aktiv aus als in einem 90-minütigen Gruppenkurs mit zehn Teilnehmern.",
          ],
          table: {
            title: "Die tägliche 15-Minuten-Routine",
            headers: ["Phase", "Aktivität", "Nutzen"],
            rows: [
              ["Minuten 1 bis 5", "Audio-Shadowing mit Podcast", "Sprechrhythmus, Reduktionen und Betonung spiegeln."],
              ["Minuten 6 bis 10", "Lautes Erzählen / Szenario-Simulation", "Aktiver Wortabruf ohne Blick ins Wörterbuch."],
              ["Minuten 11 bis 15", "90-Sekunden-Aufnahme und Reflexion", "Fehleranalyse und Abbau von Sprechhemmungen."],
            ],
          },
        },
        {
          heading: "2. Die Shadowing-Technik im Detail",
          subheading: "Dem Muttersprachler wie ein Schatten auf den Fersen folgen",
          body: [
            "Wähle einen 60-Sekunden-Ausschnitt aus einem gut verständlichen Podcast (z.B. BBC 6 Minute English oder TED). Statt den Satz anzuhören und nachzusprechen, sprichst du simultan mit dem Sprecher mit—mit einem minimalen Verzug von nur einer Viertelsekunde.",
            "Dadurch zwingst du dein Sprachzentrum dazu, den Rhythmus und die Vokallängen des Originals zu übernehmen, ohne Zeit für deutsche Gedankenübersetzungen zu haben.",
          ],
          checklist: [
            "Schritt 1: Einmal mit Transkript anhören, um alle Fachbegriffe zu verstehen.",
            "Schritt 2: Laut mitlesen, während das Audio parallel läuft.",
            "Schritt 3: Das Transkript weglegen und nur nach Gehör mitsprechen.",
          ],
        },
        {
          heading: "3. Lautes Selbstgespräch (The Stream of Consciousness)",
          subheading: "Den inneren Monolog von Deutsch auf Englisch umschalten",
          body: [
            "Beschreibe während alltäglicher Handlungen laut, was du tust: beim Kaffeekochen, beim Aufräumen des Schreibtischs oder beim Spaziergang mit dem Hund.",
            "'Now I'm brewing fresh coffee, grinding the beans, and checking my calendar for the sprint planning at ten. Looks like it's going to rain later.'",
            "Das baut direkte Verbindungen zwischen physischen Objekten und englischen Vokabeln auf, ohne den Umweg über die deutsche Übersetzung.",
          ],
        },
        {
          heading: "4. Der 4-Wochen-Trainingsplan zur Routine",
          subheading: "Vom ersten zaghaften Satz zum flüssigen Monolog",
          table: {
            title: "Monatsplan zur Steigerung der Sprechsicherheit",
            headers: ["Woche", "Fokus", "Messbarer Fortschritt"],
            rows: [
              ["Woche 1", "Feste Satzmuster & Shadowing", "Verlust des Fremdheitsgefühls der eigenen englischen Stimme."],
              ["Woche 2", "Alltagsbeschreibungen im Present Continuous", "Verzicht auf Wörterbuch-Konsultation bei Alltagsthemen."],
              ["Woche 3", "Simulation von Meetings & Argumentationen", "Souveräner Einsatz von Konnektoren (however, therefore)."],
              ["Woche 4", "Freie 2-Minuten-Aufnahmen ohne Notizen", "Flüssiges Sprechen ohne quälende Denkpausen."],
            ],
          },
        },
      ],
      faq: [
        {
          q: "Schleifen sich nicht Fehler ein, wenn mich niemand korrigiert?",
          a: "Nein, solange du das Shadowing von Muttersprachlern als akustische Referenz nutzt und deine eigenen Aufnahmen gegenhörst. Dein Sprachgefühl korrigiert Abweichungen erstaunlich schnell selbst.",
        },
        {
          q: "Was mache ich, wenn mir ein bestimmtes englisches Wort fehlt?",
          a: "Umschreibe es auf Englisch (Circumlocution)! Wenn dir 'screwdriver' fehlt, sage 'the tool used for tightening screws'. Genau diese Fähigkeit rettet dich in echten Gesprächen.",
        },
        {
          q: "Wie unterstützt mich Spekvia bei dieser Routine?",
          a: "In Spekvia kannst du die 15-Minuten-Routine mit Mivo absolvieren: Mivo hört dir zu, antwortet spontan und weist dich auf Fehler hin, die du danach in deinem Fehlerheft wiederholen kannst.",
        },
      ],
      conclusion: [
        "Flüssiges Englisch entsteht nicht durch das Warten auf den perfekten Gesprächspartner, sondern durch das tägliche Training der eigenen Zungenmuskeln.",
        "Starte heute mit deinen ersten 15 Minuten. Du wirst überrascht sein, wie schnell dein Englisch lebendig und selbstverständlich wird.",
      ],
    },
  },

  // ---------------------------------------------------------------- DE-06
  {
    slug: "vorstellungsgespraech-auf-englisch-leitfaden",
    locale: "de",
    title: "Vorstellungsgespräch auf Englisch: häufige Fragen und Musterantworten",
    metaTitle: "Vorstellungsgespräch auf Englisch: Fragen & Antworten",
    excerpt: "Überzeuge im englischen Jobinterview mit souveränen Antworten auf 'Tell me about yourself', der STAR-Methode und diplomatischen Gehaltsverhandlungen.",
    category: "Karriere & Vorstellungsgespräch",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/de/vorstellungsgespraech-auf-englisch-leitfaden-cover.webp",
    coverAlt: "Bewerber im Gespräch mit Interviewer in moderner internationaler Büroumgebung",
    summary: [
      "Internationale Interviews folgen klaren standardisierten Bewertungsmustern mit hohem Fokus auf messbare Ergebnisse.",
      "Die Frage 'Tell me about yourself' verlangt keine Lebensgeschichte, sondern die Formel Gegenwart, Vergangenheit und Zukunft.",
      "Mit der STAR-Methode (Situation, Task, Action, Result) beantwortest du verhaltensorientierte Fragen präzise.",
      "Diplomatische Gehaltsformulierungen sichern dir eine starke Verhandlungsposition im internationalen Arbeitsmarkt.",
    ],
    content: {
      intro: [
        "Die Einladung zum Vorstellungsgespräch bei einem internationalen Konzern, einem US-amerikanischen Tech-Startup oder einer globalen Beratung ist da. Fachlich bringst du alles mit, doch der Gedanke an ein zweistündiges Interview komplett auf Englisch sorgt für schlaflose Nächte.",
        "Viele deutschsprachige Bewerber neigen dazu, zu bescheiden aufzutreten oder sich in technischen Details zu verlieren. Angloamerikanische Interviewer erwarten jedoch eine strukturierte Selbstpräsentation mit klarer Betonung des eigenen Beitrags und quantifizierbaren Erfolgen.",
        "In diesem Leitfaden zeigen wir dir, wie du die typischsten Fragen meisterst, die STAR-Methode für deine Erfolge nutzt und im Gehaltsgespräch souverän auftrittst.",
      ],
      sections: [
        {
          heading: "1. Die Einstiegsfrage: 'Tell me about yourself' (Die 3-Phasen-Formel)",
          subheading: "Gegenwart, Vergangenheit und Zukunft in 90 Sekunden",
          body: [
            "Vermeide den Fehler, chronologisch bei der Schulzeit zu beginnen. Internationale Recruiter wollen drei Dinge wissen: Wer bist du heute? Was hast du erreicht? Warum passt du zu dieser Stelle?",
          ],
          exampleBox: {
            title: "Die 3-Phasen-Antwort",
            wrong: "Well, I was born in Munich, I studied at TU Berlin in 2018, and then I worked at two companies...",
            correct: "Currently, I'm a senior DevOps engineer optimizing cloud infrastructure for high-traffic platforms. Over the past four years, I automated our deployment pipeline, reducing release cycles by 40%. I'm excited about this opportunity because your team is scaling multi-region clusters where my Kubernetes experience can drive immediate impact.",
            explanation: "Nennt die aktuelle Rolle, beziffert einen konkreten Meilenstein und stellt den direkten Bezug zum Mehrwert für das neue Unternehmen her.",
          },
        },
        {
          heading: "2. Verhaltensbezogene Fragen mit der STAR-Methode lösen",
          subheading: "Situation, Task, Action und Result messbar auf den Punkt bringen",
          body: [
            "Auf Fragen wie 'Describe a situation where a project was at risk' antwortest du mit der strukturierten STAR-Methode:",
          ],
          table: {
            title: "Die STAR-Interviewmatrix",
            headers: ["STAR-Phase", "Bedeutung", "Musterformulierung"],
            rows: [
              ["Situation", "Kontext und Herausforderung", "'At my previous employer, our migration deadline was moved up by four weeks...'"],
              ["Task", "Deine konkrete Verantwortung", "'My core responsibility was ensuring zero downtime for the payment service...'"],
              ["Action", "Was DU unternommen hast (nicht das Team)", "'I initiated daily cross-functional standups and automated testing scripts...'"],
              ["Result", "Messbarer Erfolg mit Zahlen", "'As a result, we successfully completed the migration two days ahead of schedule.'"],
            ],
          },
        },
        {
          heading: "3. Souverän Zeit gewinnen bei schwierigen Fragen",
          subheading: "Professionelle Brückenphrasen statt peinlichem Schweigen",
          body: [
            "Es ist völlig legitim, vor einer Antwort kurz innezuhalten. Nutze geschliffene Formulierungen, um dir Bedenkzeit zu verschaffen:",
          ],
          list: [
            "'That's an excellent question. Let me reflect for a moment on the most relevant example.'",
            "'To ensure I give you the most helpful answer, are you interested more in the technical architecture or the stakeholder communication?'",
            "'Let me gather my thoughts on that experience for a second.'",
          ],
        },
        {
          heading: "4. Gehaltsverhandlung und kluge Rückfragen am Ende",
          subheading: "Wie du deinen Marktwert international verhandelst",
          dialogue: [
            {
              speaker: "Recruiter",
              role: "Talent Acquisition Partner",
              en: "What are your salary expectations for this position?",
              tr: "Was sind Ihre Gehaltsvorstellungen für diese Position?",
              tip: "Typische Gehaltsfrage im Erstgespräch.",
            },
            {
              speaker: "Bewerber",
              role: "Verhandlungssichere Antwort",
              en: "Based on my six years of experience in distributed systems and the scope of this role, I'm targeting a total compensation package between 95,000 and 110,000 euros. Naturally, I'm open to discussing the breakdown regarding performance bonus and equity.",
              tr: "Auf Grundlage meiner sechs Jahre Erfahrung mit verteilten Systemen und des Umfangs dieser Rolle strebe ich ein Gesamtpaket zwischen 95.000 und 110.000 Euro an. Über die Aufteilung auf Leistungsbonus und Beteiligung spreche ich natürlich gern.",
              tip: "Nennt eine realistische Spanne und zeigt Verhandlungsbereitschaft beim Gesamtpaket.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Was mache ich, wenn ich eine Frage des Interviewers akustisch nicht verstanden habe?",
          a: "Frage ruhig und bestimmt nach: 'Could you please rephrase that question?' oder 'Could you clarify what you mean by that?'. Das zeigt Souveränität und Präzision.",
        },
        {
          q: "Darf ich mir vor dem Interview Notizen auf den Tisch legen?",
          a: "Ja! Bei Video-Interviews ist ein Spickzettel mit Stichpunkten zu deinen STAR-Beispielen und deinen Fragen an das Unternehmen sogar ausdrücklich empfohlen.",
        },
        {
          q: "Wie bereite ich mich mit Spekvia auf das Vorstellungsgespräch vor?",
          a: "In Spekvia kannst du realistische Jobinterviews mit Mivo durchführen. Mivo stellt dir typische Interviewfragen, und die App weist dich auf Fehler in deinen Antworten hin.",
        },
      ],
      conclusion: [
        "Ein Jobinterview auf Englisch ist kein Test deiner literarischen Sprachgewandtheit: Es ist ein professioneller Austausch darüber, wie du dem Unternehmen helfen kannst, reale Probleme zu lösen.",
        "Bereite deine STAR-Geschichten vor, übe sie laut vor dem Spiegel oder mit Mivo und gehe mit aufrechtem Kopf in dein Gespräch.",
      ],
    },
  },
];
