import type { BlogPostSource } from "../types";

export const esPosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- ES-01 (Pillar)
  {
    slug: "errores-comunes-al-hablar-ingles",
    locale: "es",
    title: "Errores comunes de los hispanohablantes al hablar inglés (y cómo corregirlos)",
    metaTitle: "Errores comunes de hispanohablantes al hablar inglés",
    excerpt: "Guía con ejemplos Di esto / No digas esto para corregir la omisión de sujeto, la edad, los plurales, las preguntas y las preposiciones en inglés.",
    category: "Niveles y gramática",
    featured: true,
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/errores-comunes-al-hablar-ingles-cover.webp",
    coverAlt: "Estudiante analizando errores comunes de pronunciación y gramática en inglés con una lupa",
    summary: [
      "La mayoría de los tropiezos al hablar inglés no se deben a falta de estudio, sino a la traducción automática de estructuras del español.",
      "Omitir el sujeto ('Is raining' en vez de 'It's raining') es el error estructural más frecuente en hablantes nativos de español.",
      "La confusión entre 'people is' y 'people are' o 'I have 30 years' delata inmediatamente la interferencia de la lengua materna.",
      "Aplicar fórmulas claras de 'Di esto / No digas esto' permite automatizar patrones correctos en conversaciones reales sin dudar.",
    ],
    content: {
      intro: [
        "Entiendes inglés cuando lees artículos técnicos, escuchas podcasts o ves series con subtítulos. Sin embargo, en el instante en que tienes que hablar en una videollamada de trabajo o responderle a alguien en un viaje, las palabras se congelan y aparecen pequeños tropiezos recurrentes.",
        "La buena noticia es que los hispanohablantes de todo el mundo compartimos exactamente las mismas dificultades. El español y el inglés tienen raíces y lógicas sintácticas distintas: mientras que en español podemos omitir pronombres y usar dobles negativas con total naturalidad, en inglés esas estructuras rompen la coherencia gramatical.",
        "En esta guía analizamos los errores más habituales que cometemos al hablar inglés, desglosados con fórmulas prácticas de 'Di esto / No digas esto' y explicaciones claras para que puedas corregirlos desde hoy mismo.",
      ],
      sections: [
        {
          heading: "1. Omitir el pronombre sujeto ('It is raining', no 'Is raining')",
          subheading: "El español es una lengua pro-drop; el inglés exige sujeto explícito",
          body: [
            "En español decimos 'Está lloviendo', 'Es importante' o 'Parece fácil' sin necesidad de pronunciar ningún pronombre. El inglés, en cambio, es una lengua de sujeto obligatorio: casi todas las oraciones deben tener un sujeto claro, aunque sea un pronombre impersonal como 'it'.",
          ],
          exampleBox: {
            title: "Sujetos impersonales obligatorios",
            wrong: "Is raining today, but is very important to go to the office.",
            correct: "It's raining today, but it's very important to go to the office.",
            explanation: "En inglés los verbos meteorológicos y las valoraciones abstractas requieren el pronombre 'it' como sujeto gramatical.",
          },
          table: {
            title: "Construcciones impersonales frecuentes",
            headers: ["Error común en español", "Forma correcta en inglés", "Por qué falla"],
            rows: [
              ["Is cold today.", "It's cold today.", "Falta el sujeto gramatical 'it'."],
              ["Is necessary to update the app.", "It's necessary to update the app.", "Las valoraciones siempre llevan 'it'."],
              ["Seems like a good idea.", "It seems like a good idea.", "El verbo 'seem' necesita sujeto explícito."],
              ["Was late when we arrived.", "It was late when we arrived.", "Las referencias horarias requieren 'it'."],
            ],
          },
        },
        {
          heading: "2. 'I have 30 years' y la expresión de la edad",
          subheading: "La edad es un estado de existencia, no una posesión material",
          body: [
            "En español 'tenemos' años; en inglés 'somos' viejos en una determinada cantidad de años. Decir 'I have 28 years' suena para un angloparlante como si llevaras veintiocho años guardados en una caja. Siempre se utiliza el verbo 'to be'.",
          ],
          exampleBox: {
            title: "Expresar la edad correctamente",
            wrong: "My brother has 25 years and I have 30 years.",
            correct: "My brother is 25 years old and I am 30.",
            explanation: "Utiliza 'I am [número] years old' o simplemente 'I am [número]'. Nunca uses el verbo 'have'.",
          },
        },
        {
          heading: "3. El error de 'People is' y la concordancia de plural",
          subheading: "'Gente' es singular en español, pero 'People' es plural en inglés",
          body: [
            "En español la palabra 'gente' es un sustantivo colectivo singular ('la gente es amable'). En inglés, 'people' es el plural directo de 'person' y siempre concuerda con verbos y pronombres en plural.",
          ],
          table: {
            title: "Sustantivos con concordancia engañosa",
            headers: ["Sustantivo en inglés", "Concordancia correcta", "Ejemplo en uso"],
            rows: [
              ["People (gente / personas)", "Plural (are / were / have)", "People are waiting outside."],
              ["Police (la policía)", "Plural (are / were)", "The police are investigating the case."],
              ["Information (información)", "Incontable singular (is)", "The information is very helpful."],
              ["Advice (consejo / consejos)", "Incontable singular (is)", "Her advice was essential."],
            ],
          },
          proTip: "Nunca digas 'peoples' para referirte a personas cotidianas (salvo que hables de pueblos o naciones en antropología). Di siempre 'people are'.",
        },
        {
          heading: "4. La doble negación ('I don't know nothing')",
          subheading: "En inglés, dos negaciones cancelan el significado y crean una afirmación",
          body: [
            "En español la doble negación es la norma culta: 'No sé nada', 'No vino nadie', 'No tengo ningún problema'. En inglés estándar, la doble negación se considera un error y puede cambiar el significado de la oración.",
          ],
          exampleBox: {
            title: "Corrigiendo la doble negación",
            wrong: "I don't have no time and I didn't see nobody.",
            correct: "I don't have any time and I didn't see anybody.",
            explanation: "Cuando el verbo ya está negado con 'don't' o 'didn't', debes usar palabras con 'any' (any, anybody, anything), nunca palabras con 'no'.",
          },
        },
        {
          heading: "5. Preguntas sin auxiliar 'Do' o 'Does'",
          subheading: "El orden de palabras no se altera solo con la entonación",
          body: [
            "En español convertimos una afirmación en pregunta simplemente subiendo la entonación al final: '¿Vives en Madrid?'. En inglés, en el presente simple y pasado simple es obligatorio utilizar un verbo auxiliar al inicio de la pregunta.",
          ],
          dialogue: [
            {
              speaker: "Colega",
              role: "Hablante hispano",
              en: "You work tomorrow in the office?",
              tr: "¿Trabajas mañana en la oficina?",
              tip: "Error habitual: falta el auxiliar 'Do' al comienzo.",
            },
            {
              speaker: "Líder",
              role: "Hablante nativo",
              en: "Do you work in the office tomorrow? Yes, I'll be there by nine.",
              tr: "La estructura «Do you work…?» es la forma correcta de la pregunta.",
              tip: "El auxiliar 'Do' señala inmediatamente que se trata de una pregunta.",
            },
          ],
        },
        {
          heading: "6. Preposiciones de tiempo y lugar: In, On, At",
          subheading: "Superar el comodín del 'en' del español",
          body: [
            "En español usamos la preposición 'en' para casi todo: 'en mayo', 'en la mesa', 'en el aeropuerto', 'en autobús'. En inglés, esa sola palabra se divide en tres preposiciones con reglas espaciales y temporales muy precisas.",
          ],
          checklist: [
            "Usa 'IN' para espacios cerrados, ciudades, países, años y meses ('in June', 'in Spain', 'in the room').",
            "Usa 'ON' para superficies, calles y días de la semana ('on the table', 'on Monday', 'on 5th Avenue').",
            "Usa 'AT' para puntos exactos y horas del reloj ('at 3 PM', 'at the entrance', 'at the airport').",
          ],
        },
        {
          heading: "7. Pluralizar adjetivos ('differents options')",
          subheading: "Los adjetivos en inglés son invariables en género y número",
          body: [
            "En español los adjetivos concuerdan en número con el sustantivo ('opciones diferentes', 'problemas serios'). En inglés, los adjetivos nunca llevan 's' final cuando modifican a un sustantivo plural.",
          ],
          exampleBox: {
            title: "Adjetivos invariables",
            wrong: "We evaluated differents solutions and found importants results.",
            correct: "We evaluated different solutions and found important results.",
            explanation: "En inglés solo el sustantivo recibe la marca de plural ('solutions', 'results'); los adjetivos permanecen invariables.",
          },
        },
      ],
      faq: [
        {
          q: "¿Por qué cometo estos errores si conozco la regla gramatical?",
          a: "Porque al hablar en tiempo real tu cerebro no consulta reglas teóricas, sino patrones motores automáticos. Si no entrenas la voz en voz alta, el cerebro recurre por defecto a las conexiones neuronales del español.",
        },
        {
          q: "¿Cómo puedo dejar de traducir mentalmente del español?",
          a: "Asocia conceptos directamente con imágenes y practica monólogos en voz alta de 5 minutos al día. Practicar conversaciones por voz con Mivo en Spekvia puede ayudarte a responder sin traducir.",
        },
        {
          q: "¿Es muy grave cometer estos errores en una entrevista de trabajo?",
          a: "Normalmente te entenderán, pero corregir estos 7 puntos hace que tu inglés suene más claro y profesional ante un reclutador internacional.",
        },
      ],
      conclusion: [
        "Cometer errores al aprender una segunda lengua es el proceso biológico natural mediante el cual el cerebro calibra nuevas estructuras. Lo importante no es tener miedo a equivocarte, sino reconocer los patrones repetitivos y reemplazarlos por hábitos correctos.",
        "Elige hoy dos errores de esta lista—por ejemplo, recordar siempre el 'it' y evitar la doble negación—y concéntrate en ellos durante tus próximas conversaciones.",
        "La fluidez no es magia: es práctica deliberada y constancia diaria.",
      ],
    },
    sources: [
      { name: "Swan, M. & Smith, B. (eds.) — Learner English: A Teacher's Guide to Interference and Other Problems (Cambridge University Press)" },
    ],
  },

  // ---------------------------------------------------------------- ES-02
  {
    slug: "falsos-amigos-ingles-espanol",
    locale: "es",
    title: "Falsos amigos entre español e inglés: 16 palabras que te traicionan",
    metaTitle: "Falsos amigos en inglés: 16 palabras que te traicionan",
    excerpt: "Evita confusiones incómodas con 16 falsos amigos entre español e inglés, clasificados por categorías y con un mini test para practicar.",
    category: "Niveles y gramática",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/falsos-amigos-ingles-espanol-cover.webp",
    coverAlt: "Dos máscaras estilizadas que representan falsos amigos entre inglés y español",
    summary: [
      "Los falsos amigos (falsos cognados) son palabras que suenan casi idénticas en español e inglés pero tienen significados totalmente distintos.",
      "Confundir 'embarrassed' con 'embarazada' o 'actually' con 'actualmente' puede generar malentendidos muy incómodos en el trabajo.",
      "Aprender los falsos cognados por categorías temáticas acelera la retención y previene bloqueos al hablar.",
      "Un pequeño test mental antes de hablar te salvará de malentendidos profesionales.",
    ],
    content: {
      intro: [
        "Imagina la escena: quieres contarle a un colega angloparlante que una amiga está embarazada y dices 'She is embarrassed'. Tu colega entenderá que está avergonzada. O peor aún: escribes que un proyecto está 'actually finished' pensando que significa 'actualmente terminado', cuando en realidad dice 'en realidad terminado'.",
        "Los falsos amigos (false friends) son una de las mayores trampas para los hispanohablantes. Como el inglés y el español comparten raíces latinas, nuestro cerebro asume de forma automática que dos palabras con grafía semejante significan lo mismo.",
        "A continuación te presentamos 16 falsos amigos traicioneros entre inglés y español, organizados por situaciones cotidianas y profesionales.",
      ],
      sections: [
        {
          heading: "1. Falsos amigos de alto riesgo en el ámbito profesional",
          subheading: "Palabras que cambian por completo el sentido de tus acuerdos",
          body: [
            "En el entorno de negocios y tecnología, confundir estas palabras puede hacerte sonar desinformado o generar expectativas contractuales equivocadas.",
          ],
          table: {
            title: "Falsos amigos en el trabajo y negocios",
            headers: ["Palabra en inglés", "Lo que parece", "Significado real", "Cómo se dice lo que pensabas"],
            rows: [
              ["Actually", "Actualmente", "En realidad / de hecho", "Currently / nowadays"],
              ["Assist", "Asistir (a un evento)", "Ayudar / dar soporte", "Attend (a meeting/conference)"],
              ["Notice", "Noticia", "Aviso / notificación", "News / news item"],
              ["Pretend", "Pretender (intentar)", "Fingir / simular", "Intend / plan to"],
              ["Realize", "Realizar (hacer)", "Darse cuenta / notar", "Carry out / accomplish / make"],
              ["Resume", "Resumir", "Reanudar / retomar (el sustantivo 'résumé' es el currículum)", "Summarize"],
            ],
          },
          exampleBox: {
            title: "El error de 'Currently' vs 'Actually'",
            wrong: "Actually, our team is working on the mobile app launch.",
            correct: "Currently, our team is working on the mobile app launch.",
            explanation: "'Actually' significa 'en realidad' o 'a decir verdad'. Para decir 'en este momento' o 'actualmente', usa 'currently' o 'right now'.",
          },
        },
        {
          heading: "2. Falsos amigos cotidianos y personales",
          subheading: "Trampas que aparecen en conversaciones casuales y sociales",
          body: [
            "Cuando hablas de emociones, salud o vida diaria con amigos internacionales, estas palabras suelen causar carcajadas o confusiones desconcertantes.",
          ],
          table: {
            title: "Falsos amigos en la vida diaria",
            headers: ["Palabra en inglés", "Lo que parece", "Significado real", "Cómo se dice lo que pensabas"],
            rows: [
              ["Embarrassed", "Embarazada", "Avergonzado / apenado", "Pregnant"],
              ["Library", "Librería (tienda)", "Biblioteca", "Bookstore / bookshop"],
              ["Sensible", "Sensible (emocional)", "Sensato / prudente", "Sensitive"],
              ["Sensitive", "Sensitivo", "Sensible / delicado", "Sensible (para sensatez)"],
              ["Sympathetic", "Simpático", "Compasivo / empático", "Friendly / nice / likable"],
              ["Exit", "Éxito", "Salida", "Success"],
            ],
          },
          dialogue: [
            {
              speaker: "Laura",
              role: "Turista hispana",
              en: "Excuse me, I'm looking for a library to buy some English books.",
              tr: "Disculpe, busco una biblioteca para comprar libros en inglés.",
              tip: "'Library' es biblioteca (préstamo gratuito), no librería de venta.",
            },
            {
              speaker: "Clerk",
              role: "Atención al cliente",
              en: "The public library is around the corner, but if you want to buy them, there's a bookstore on 4th Street.",
              tr: "La biblioteca pública está a la vuelta de la esquina, pero si quiere comprarlos, hay una librería en la calle 4.",
              tip: "'Bookstore' es la tienda donde compras libros.",
            },
          ],
        },
        {
          heading: "3. Falsos amigos en el colegio, estudios y lecturas",
          subheading: "Palabras comunes en contextos académicos y literarios",
          body: [
            "Cuando estudias o describes tus antecedentes educativos, estos términos generan constantes errores de traducción:",
          ],
          list: [
            "College ≠ Colegio escolar: 'College' es la universidad o facultad. Colegio escolar se dice 'school'.",
            "Career ≠ Carrera universitaria: 'Career' es la trayectoria profesional completa. Carrera de grado se dice 'degree' o 'major'.",
            "Subject ≠ Sujeto (en persona): 'Subject' es asignatura o tema. Sujeto personal es 'individual' o 'person'.",
            "Comprehensive ≠ Comprensivo (tolerante): 'Comprehensive' significa exhaustivo, integral o amplio. Tolerante se dice 'understanding'.",
          ],
        },
        {
          heading: "4. Mini-test: Comprueba tus reflejos",
          subheading: "¿Sabrías elegir la opción correcta sin caer en la trampa?",
          checklist: [
            "¿Cómo dices 'Quiero asistir a la conferencia'? -> 'I want to attend the conference' (no 'assist').",
            "¿Cómo dices 'Ella es muy sensata con el dinero'? -> 'She is very sensible with money' (no 'sensitive').",
            "¿Cómo dices '¿Te diste cuenta del problema?'? -> 'Did you realize the problem?' (aquí sí significa notar).",
            "¿Cómo dices 'Tuvo mucho éxito en su carrera'? -> 'She had great success in her career' (no 'exit').",
          ],
        },
      ],
      faq: [
        {
          q: "¿Por qué existen tantos falsos amigos entre inglés y español?",
          a: "Porque tras la conquista normanda de Inglaterra en 1066, el francés antiguo introdujo miles de términos latinos en el inglés. A lo largo de los siglos, el significado de muchas palabras evolucionó en direcciones opuestas en ambos idiomas.",
        },
        {
          q: "¿Cuál es la forma más rápida de memorizarlos?",
          a: "Aprenderlos en parejas contrastadas ('currently vs actually', 'attend vs assist') e incorporarlos en oraciones personales en voz alta.",
        },
        {
          q: "¿Cómo me ayuda Spekvia con los falsos amigos?",
          a: "En las conversaciones por voz con Mivo en Spekvia, la app señala los errores de vocabulario y de expresión con una breve explicación y los guarda en Mi cuaderno de errores. Así puedes repasar las palabras que más te traicionan.",
        },
      ],
      conclusion: [
        "Dominar los falsos amigos es uno de los pasos más gratificantes en tu camino hacia un inglés fluido. Una vez que identificas estas 16 palabras trampa, desaparece la inseguridad de dudar si estás diciendo exactamente lo que tienes en mente.",
        "Repasa esta lista antes de tu próxima presentación o conversación internacional y habla con total seguridad.",
      ],
    },
  },

  // ---------------------------------------------------------------- ES-03
  {
    slug: "pronunciacion-ingles-hispanohablantes",
    locale: "es",
    title: "Pronunciación del inglés para hispanohablantes: los 5 sonidos más difíciles",
    metaTitle: "Pronunciación del inglés: los 5 sonidos más difíciles",
    excerpt: "Aprende a pronunciar el sonido TH, la S líquida sin añadir una e, las terminaciones -ed y las vocales cortas y largas con ejercicios prácticos.",
    category: "Metodología y tácticas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/pronunciacion-ingles-hispanohablantes-cover.webp",
    coverAlt: "Perfil con ondas sonoras coloridas ilustrando la pronunciación correcta en inglés",
    summary: [
      "El español tiene solo 5 sonidos vocálicos puros; el inglés tiene unas 20 vocales y diptongos distintos, según el acento.",
      "El sonido 'TH' sordo (/θ/) y sonoro (/ð/) requiere colocar la punta de la lengua suavemente entre los dientes frontales.",
      "Añadir una 'e' antes de palabras que empiezan con S ('es-peak', 'es-tudent') es la marca acústica más reconocible del acento hispano.",
      "El método de los pares mínimos y la práctica frente al espejo ayudan a entrenar la articulación con práctica diaria.",
    ],
    content: {
      intro: [
        "El sistema fonético del español es directo, claro y predecible: tenemos cinco vocales limpias (a, e, i, o, u) y casi todo se pronuncia tal como se escribe. El inglés, por el contrario, tiene una ortografía no fonética y más del doble de sonidos vocálicos, además de consonantes que no existen en nuestro idioma.",
        "Cuando un hispanohablante intenta pronunciar inglés utilizando únicamente los sonidos del español, ocurre el fenómeno de la sustitución fonológica: nuestro cerebro reemplaza los sonidos extraños por los sonidos más cercanos que ya conoce. Así es como 'ship' se convierte en 'sheep', 'live' se confunde con 'leave' y 'think' suena como 'sink'.",
        "En esta guía desglosamos los 5 sonidos más desafiantes para los hispanohablantes, con instrucciones anatómicas de colocación de la lengua y pares mínimos para practicar frente al espejo.",
      ],
      sections: [
        {
          heading: "1. Los dos sonidos de la 'TH' (/θ/ y /ð/)",
          subheading: "El sonido sordo de 'think' y el sonido sonoro de 'this'",
          body: [
            "En muchas regiones de Hispanoamérica no existe el sonido /θ/ (la 'z' de España en 'zapato'), por lo que se tiende a pronunciar la TH como una 's' o una 't'. Sin embargo, en inglés la combinación 'th' tiene dos articulaciones muy concretas:",
            "1. TH sorda (/θ/): coloca la punta de la lengua entre los incisivos superiores e inferiores y expulsa aire sin vibración en las cuerdas vocales (think, three, thank, mouth).",
            "2. TH sonora (/ð/): coloca la lengua en la misma posición, pero haz vibrar la garganta como un zumbido suave (this, that, brother, with).",
          ],
          table: {
            title: "Pares mínimos con el sonido TH",
            headers: ["Palabra con TH", "Sonido incorrecto común", "Palabra que acabas diciendo"],
            rows: [
              ["Think (/θɪŋk/ - pensar)", "Sink (/sɪŋk/)", "Fregadero / hundirse"],
              ["Three (/θriː/ - tres)", "Tree (/triː/)", "Árbol"],
              ["Thank (/θæŋk/ - agradecer)", "Tank (/tæŋk/)", "Tanque"],
              ["Breathe (/briːð/ - respirar)", "Breed (/briːd/)", "Raza / criar"],
            ],
          },
        },
        {
          heading: "2. La 'S' líquida al inicio: eliminar la 'E' fantasma",
          subheading: "Cómo pasar de 'es-peak' a un auténtico 'speak'",
          body: [
            "En la fonotáctica del español ninguna palabra comienza con 's + consonante'. Por eso, todas nuestras palabras afines llevan una 'e' de apoyo: España, escuela, estación, especial. Inconscientemente, transferimos esa 'e' al inglés: 'es-peak', 'es-tudent', 'es-port'.",
          ],
          exampleBox: {
            title: "Técnica del silbido de serpiente",
            wrong: "Pronunciar: 'I am an es-tudent and I es-peak English.'",
            correct: "Pronunciar: 'I am a sssss-tudent and I sssss-peak English.'",
            explanation: "Empieza haciendo un sonido largo de serpiente con aire continuo ('sssss') y luego añade la siguiente consonante sin mover los labios hacia la 'e'.",
          },
        },
        {
          heading: "3. La distinción entre B y V",
          subheading: "Oclusiva bilabial vs. fricativa labiodental",
          body: [
            "En español moderno, las letras 'b' y 'v' representan exactamente el mismo sonido bilabial. En inglés, en cambio, la diferencia es fundamental: 'B' junta ambos labios con un golpe explosivo (/b/), mientras que 'V' apoya suavemente los dientes superiores sobre el labio inferior con vibración sonora (/v/).",
          ],
          list: [
            "Berry (/beri/ - baya/fruto) vs. Very (/veri/ - muy).",
            "Best (/best/ - mejor) vs. Vest (/vest/ - chaleco).",
            "Boat (/bəʊt/ - barco) vs. Vote (/vəʊt/ - votar).",
          ],
        },
        {
          heading: "4. Las vocales cortas /ɪ/ vs. /iː/ (Ship vs. Sheep)",
          subheading: "La diferencia de tensión muscular en la mandíbula",
          body: [
            "El español solo tiene una 'i' (tensa y aguda). El inglés tiene dos: la 'i' larga (/iː/ en sheep, meet, beach) y la 'i' corta y relajada (/ɪ/ en ship, sit, fit). Para pronunciar la /ɪ/ corta, relaja la mandíbula, abre ligeramente la boca y emite un sonido a medio camino entre la 'e' y la 'i'.",
          ],
          table: {
            title: "Pares mínimos vocálicos críticos",
            headers: ["Vocal corta /ɪ/ (relajada)", "Vocal larga /iː/ (tensa)", "Riesgo de malentendido"],
            rows: [
              ["Ship (barco)", "Sheep (oveja)", "Confusión de vocabulario"],
              ["Live (vivir)", "Leave (irse / salir)", "Sentido contrario de la frase"],
              ["Fit (en forma)", "Feet (pies)", "Confusión anatómica"],
              ["Bit (un poco)", "Beat (latido / ganar)", "Cambia el significado de la frase"],
            ],
          },
        },
        {
          heading: "5. Las tres pronunciaciones de la terminación '-ed'",
          subheading: "Solo se pronuncia como sílaba extra '-id' tras los sonidos T y D",
          body: [
            "Muchos hispanohablantes tienden a pronunciar la terminación '-ed' de los verbos regulares como una sílaba completa ('work-ed', 'play-ed'). En realidad, solo se pronuncia como sílaba extra (/ɪd/) cuando el verbo base termina en sonido 'T' o 'D' (wanted, needed). En los demás casos, la 'e' es completamente muda:",
          ],
          checklist: [
            "Sonido /t/ tras consonantes sordas: worked -> /wɜːkt/, stopped -> /stɒpt/, laughed -> /lɑːft/.",
            "Sonido /d/ tras sonidos sonoros y vocales: played -> /pleɪd/, cleaned -> /kliːnd/, called -> /kɔːld/.",
            "Sonido /ɪd/ solo tras T o D: wanted -> /ˈwɒntɪd/, decided -> /dɪˈsaɪdɪd/.",
          ],
        },
      ],
      faq: [
        {
          q: "¿Tener acento hispano es un problema grave?",
          a: "No. El objetivo de una buena pronunciación no es sonar como un actor de Hollywood, sino ser comprensible sin esfuerzo para cualquier persona del mundo. Corregir estos 5 sonidos elimina la fatiga auditiva de tus oyentes.",
        },
        {
          q: "¿Cuánto tiempo toma corregir la S líquida?",
          a: "Con la técnica del silbido de serpiente ('ssss-peak'), el ritmo depende de cada persona, pero la práctica diaria frente al espejo ayuda a automatizar el cambio.",
        },
        {
          q: "¿Cómo evalúo si estoy pronunciando bien?",
          a: "Grábate en el móvil y compárate con un audio modelo. En Spekvia también puedes practicar una lista de palabras que suelen pronunciarse mal: escuchas la pronunciación correcta, te grabas y comparas.",
        },
      ],
      conclusion: [
        "La pronunciación no es un talento innato con el que se nace; es memoria muscular en la lengua, los labios y la mandíbula. Igual que entrenas un instrumento musical o una técnica deportiva, puedes reeducar tus músculos para articular los fonemas del inglés con naturalidad y confianza.",
        "Dedica diez minutos hoy a practicar frente al espejo con los pares mínimos de esta guía. Notarás la diferencia en tu primera frase.",
      ],
    },
    sources: [
      { name: "Roach, P. — English Phonetics and Phonology (Cambridge University Press)" },
    ],
  },

  // ---------------------------------------------------------------- ES-04
  {
    slug: "practicar-ingles-hablado-sin-pareja",
    locale: "es",
    title: "Cómo practicar inglés hablado sin pareja: método de 15 minutos al día",
    metaTitle: "Cómo practicar inglés hablado solo: método de 15 minutos",
    excerpt: "Mejora tu fluidez al hablar inglés sin depender de nadie mediante shadowing, autorregistro y un plan práctico de 4 semanas paso a paso.",
    category: "Metodología y tácticas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/practicar-ingles-hablado-sin-pareja-cover.webp",
    coverAlt: "Espacio de estudio con temporizador de quince minutos para practicar conversación en inglés",
    summary: [
      "No necesitas vivir en un país angloparlante ni pagar academias costosas para desarrollar soltura al hablar.",
      "El bloqueo al hablar surge de la falta de práctica motora en solitario antes de enfrentarse a interacciones reales.",
      "El método de los tres bloques de 5 minutos (escucha e imitación, simulación de situaciones y grabación) activa la memoria muscular.",
      "Un plan estructurado de 4 semanas multiplica tu velocidad de respuesta y reduce la ansiedad comunicativa.",
    ],
    content: {
      intro: [
        "'No tengo con quién hablar en inglés.' Esta es, con diferencia, la excusa más frecuente que escuchamos entre personas que llevan años estudiando gramática sin lograr soltura conversacional. Creemos que la única manera de aprender a hablar es mantener largas charlas con nativos.",
        "Pero pregúntate algo: ¿un pianista aprende a tocar esperando a dar un concierto frente al público, o practica solo durante horas frente al teclado? Lo mismo ocurre con el habla. Las conversaciones reales son el examen; la práctica en solitario es donde realmente se forja la técnica, la velocidad mental y la seguridad.",
        "A continuación te presentamos un método contrastado de solo 15 minutos diarios para entrenar tu inglés hablado en casa, sin depender de nadie y con resultados tangibles desde el primer mes.",
      ],
      sections: [
        {
          heading: "1. La estructura de los tres bloques de 5 minutos",
          subheading: "Un protocolo diario de alta intensidad y cero distracciones",
          body: [
            "Quince minutos al día parecen poco, pero si los ejecutas con enfoque total y en voz alta, equivalen a más tiempo de emisión vocal que una clase grupal semanal de dos horas donde solo hablas tres minutos.",
          ],
          table: {
            title: "El desglose de los 15 minutos diarios",
            headers: ["Bloque", "Actividad", "Objetivo técnico"],
            rows: [
              ["Minutos 1 a 5", "Shadowing con audio auténtico", "Entrenar ritmo, acento tónico y cadencia natural."],
              ["Minutos 6 a 10", "Simulación de escenas en voz alta", "Responder a situaciones reales (pedir un café, debatir un plazo)."],
              ["Minutos 11 a 15", "Grabación de 90 segundos y escucha", "Detectar errores recurrentes y pulir la dicción."],
            ],
          },
        },
        {
          heading: "2. La técnica del Shadowing explicada paso a paso",
          subheading: "Imitar como una sombra para sincronizar tu voz con un nativo",
          body: [
            "Elige un fragmento de audio de 60 segundos de un podcast, charla o diálogo de negocios. En lugar de pausar y repetir, habla a la vez que el locutor, con solo una fracción de segundo de desfase.",
            "Esta técnica sobrecarga positivamente el aparato fonador y obliga a tu lengua a adoptar la velocidad real del inglés, eliminando las pausas artificiales.",
          ],
          checklist: [
            "Paso 1: Escucha el audio una vez leyendo la transcripción para asegurar comprensión total.",
            "Paso 2: Lee el texto en voz alta a la vez que escuchas el audio.",
            "Paso 3: Cierra el texto y habla sobre el audio imitando la entonación y las pausas.",
          ],
          proTip: "No intentes hacer shadowing con canciones o películas de acción con explosiones. Usa podcasts conversacionales como 'NPR Life Kit' o monólogos claros.",
        },
        {
          heading: "3. Simulación de situaciones reales (Roleplay en solitario)",
          subheading: "Prepara las respuestas antes de que ocurra la situación en tu vida",
          body: [
            "En lugar de hablar de temas abstractos como 'el medio ambiente', simula escenarios específicos que enfrentarás en tu vida cotidiana o profesional: explicar un bug a tu equipo, pedir un cambio de habitación en un hotel o negociar un aumento de sueldo.",
            "En herramientas como Spekvia puedes practicar estas situaciones con Mivo de forma interactiva: Mivo te hace preguntas realistas, tú respondes por voz y la app señala tus errores con una breve explicación.",
          ],
        },
        {
          heading: "4. Plan de 4 semanas para consolidar el hábito",
          subheading: "Progresión de menor a mayor exigencia comunicativa",
          body: [
            "La clave para no abandonar a los cinco días es aumentar la dificultad de forma gradual para experimentar victorias tempranas.",
          ],
          table: {
            title: "Hoja de ruta mensual",
            headers: ["Semana", "Foco principal", "Resultado esperado"],
            rows: [
              ["Semana 1", "Frases fijas y rutinas cotidianas", "Eliminar el miedo a escuchar tu propia voz en inglés."],
              ["Semana 2", "Narración de acciones en presente continuo", "Dejar de traducir mentalmente objetos del entorno."],
              ["Semana 3", "Simulaciones profesionales y debates", "Mayor soltura con conectores y opiniones estructuradas."],
              ["Semana 4", "Monólogos improvisados de 2 minutos", "Capacidad de hablar de continuo sin bloquearte."],
            ],
          },
        },
      ],
      faq: [
        {
          q: "¿Hablar solo no reforzará mis propios errores?",
          a: "No, siempre que combines la práctica con el shadowing de audios nativos y la escucha crítica de tus grabaciones. El audio nativo actúa como ancla de referencia constante.",
        },
        {
          q: "¿Qué hago si me da vergüenza que mi familia me escuche en casa?",
          a: "Aprovecha momentos a solas: mientras te duchas, cocinas o caminas con auriculares puestos. Para los demás parecerá que estás en una llamada telefónica.",
        },
        {
          q: "¿En cuánto tiempo empezaré a notar resultados?",
          a: "Al cabo de dos semanas constantes notarás que las palabras salen con menos esfuerzo y que la sensación de parálisis al hablar se reduce drásticamente.",
        },
      ],
      conclusion: [
        "La clave de la fluidez no está en esperar el momento perfecto ni en gastar una fortuna en viajes: está en los quince minutos que decides dedicarle hoy a tu voz.",
        "Empieza hoy mismo con tu primera grabación de 90 segundos. Tu futuro yo te lo agradecerá.",
      ],
    },
  },

  // ---------------------------------------------------------------- ES-05
  {
    slug: "ingles-para-entrevistas-de-trabajo",
    locale: "es",
    title: "Inglés para entrevistas de trabajo: preguntas frecuentes y respuestas modelo",
    metaTitle: "Inglés para entrevistas de trabajo: preguntas y respuestas",
    excerpt: "Domina las preguntas clave en una entrevista laboral en inglés como Tell me about yourself y negocia tu salario con plantillas listas para usar.",
    category: "Carrera y entrevistas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/ingles-para-entrevistas-de-trabajo-cover.webp",
    coverAlt: "Candidato en entrevista de trabajo en inglés con estructura de respuesta en bloques",
    summary: [
      "La pregunta 'Tell me about yourself' no pide tu biografía completa, sino una síntesis estructurada de presente, pasado y futuro profesional.",
      "El método STAR (Situación, Tarea, Acción, Resultado) ayuda a dar respuestas concretas y basadas en métricas sin rodeos.",
      "Frases de cortesía para ganar tiempo evitan los silencios incómodos cuando te hacen una pregunta difícil.",
      "Aprender a hablar de expectativas salariales en inglés te protege de negociaciones desfavorables.",
    ],
    content: {
      intro: [
        "Conseguir una entrevista con una empresa internacional o una multinacional es un logro enorme, pero la perspectiva de responder preguntas técnicas y de comportamiento en inglés genera una presión abrumadora. Tienes la experiencia profesional requerida, pero temes sonar dubitativo o poco elocuente.",
        "La buena noticia es que las entrevistas de trabajo en inglés son extremadamente estructuradas. Los reclutadores internacionales utilizan marcos de evaluación predecibles y valoran mucho más la claridad, la concisión y los resultados que un vocabulario literario recargado.",
        "En este artículo te enseñamos a preparar las preguntas más habituales, la fórmula STAR para contar tus logros y las frases exactas para responder con aplomo y profesionalidad.",
      ],
      sections: [
        {
          heading: "1. Cómo clavar 'Tell me about yourself' (La fórmula 3P)",
          subheading: "Presente, Pasado y Futuro en menos de 90 segundos",
          body: [
            "El error más común de los hispanohablantes es empezar desde la escuela secundaria y contar toda la trayectoria cronológica. La fórmula 'Presente, Pasado y Futuro' te da una estructura impecable:",
            "1. Presente: quién eres hoy y cuál es tu rol actual ('Currently, I'm a senior product designer specializing in SaaS applications...').",
            "2. Pasado: dos logros o experiencias clave que te respaldan ('Prior to this, I led the redesign of our core checkout flow, increasing conversion by 14%...').",
            "3. Futuro: por qué estás en esta entrevista hoy ('Looking forward, I'm excited about this opportunity because your team is solving scalability challenges I'm deeply passionate about.').",
          ],
          exampleBox: {
            title: "Apertura recomendada",
            wrong: "Well, I was born in Bogotá and I studied engineering, then in 2018 I started working in a small company...",
            correct: "For the past four years, I've been working as a backend engineer focusing on distributed microservices. Most recently, I optimized our transaction pipeline to handle high peak loads. I'm eager to bring that distributed systems experience to your infrastructure team.",
            explanation: "Va directo al grano técnico, destaca métricas y conecta de inmediato con las necesidades de la empresa.",
          },
        },
        {
          heading: "2. El método STAR para preguntas conductuales",
          subheading: "Situación, Tarea, Acción y Resultado cuantificable",
          body: [
            "Cuando el reclutador dice 'Tell me about a time you faced a difficult conflict', esperan una respuesta estructurada bajo el método STAR:",
          ],
          table: {
            title: "Estructura STAR con frases de apoyo",
            headers: ["Fase", "Significado", "Frase modelo para iniciar"],
            rows: [
              ["Situation (Situación)", "El contexto y el problema inicial", "'At my previous company, we were facing a tight deadline when...'"],
              ["Task (Tarea)", "Tu responsabilidad concreta", "'My specific responsibility was to ensure data integrity during migration...'"],
              ["Action (Acción)", "Lo que hiciste tú (no el equipo)", "'I organized daily alignment syncs and automated the validation scripts...'"],
              ["Result (Resultado)", "El desenlace con cifras", "'As a result, we delivered the release two days ahead of schedule with zero downtime.'"],
            ],
          },
        },
        {
          heading: "3. Frases para ganar tiempo cuando te quedas en blanco",
          subheading: "Evita el silencio incómodo o decir 'ehhhh...'",
          body: [
            "En una entrevista en inglés es completamente normal necesitar unos segundos para organizar la idea. Utilizar frases puente profesionales demuestra madurez y temple:",
          ],
          list: [
            "'That's a very thoughtful question. Let me reflect on the best example to illustrate that.'",
            "'Just to make sure I tailor my answer to what you're looking for, are you focusing more on the technical side or the stakeholder management?'",
            "'Let me take a quick second to structure my thoughts on that experience.'",
          ],
        },
        {
          heading: "4. Negociación salarial y preguntas finales para el reclutador",
          subheading: "Cómo hablar de dinero con diplomacia y firmeza",
          dialogue: [
            {
              speaker: "Recruiter",
              role: "HR Manager",
              en: "What are your salary expectations for this position?",
              tr: "¿Cuáles son sus expectativas salariales para este puesto?",
              tip: "Pregunta directa habitual.",
            },
            {
              speaker: "Candidato",
              role: "Respuesta diplomática",
              en: "Based on my five years of experience in cloud infrastructure and current market rates for remote roles, I'm targeting a range between 80,000 and 95,000 euros. However, I'm open to discussing the full compensation package including equity and benefits.",
              tr: "Según mis cinco años de experiencia en infraestructura cloud y las tarifas actuales del mercado para puestos remotos, busco un rango de entre 80.000 y 95.000 euros. Aun así, con gusto hablo del paquete completo, incluidas acciones y beneficios.",
              tip: "Da un rango razonable y muestra flexibilidad sobre el paquete total.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "¿Debo memorizar mis respuestas de memoria como un guion?",
          a: "No. Memorizar palabras exactas provoca que si olvidas una palabra te bloquees por completo. Memoriza las ideas clave de la estructura STAR en viñetas y formula las oraciones espontáneamente.",
        },
        {
          q: "¿Qué hago si no entiendo una pregunta del entrevistador?",
          a: "Pide que la repitan sin miedo: 'Could you please rephrase that last question?' o 'Could you clarify what you mean by that?'. Los reclutadores valoran mucho más la precisión que fingir haber entendido.",
        },
        {
          q: "¿Cómo puedo practicar entrevistas en inglés?",
          a: "Puedes simular entrevistas de trabajo realistas con Mivo en Spekvia, respondiendo por voz a preguntas típicas y recibiendo correcciones durante la conversación.",
        },
      ],
      conclusion: [
        "Una entrevista de trabajo en inglés no es un examen de gramática: es una conversación entre profesionales para evaluar si sois el socio adecuado para resolver problemas juntos.",
        "Prepara tus viñetas STAR, ensaya en voz alta las preguntas clave y entra a tu próxima entrevista con la seguridad que tu experiencia merece.",
      ],
    },
  },

  // ---------------------------------------------------------------- ES-06
  {
    slug: "ingles-para-viajar-aeropuerto-hotel-restaurante",
    locale: "es",
    title: "Inglés para viajar: aeropuerto, hotel y restaurante (frases útiles)",
    metaTitle: "Inglés para viajar: frases para aeropuerto, hotel y comida",
    excerpt: "Guía de supervivencia con diálogos reales y frases clave en inglés para moverte sin problemas en aeropuertos, hoteles y restaurantes del mundo.",
    category: "Viajes y vida cotidiana",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/es/ingles-para-viajar-aeropuerto-hotel-restaurante-cover.webp",
    coverAlt: "Viajero en terminal de aeropuerto con equipaje y pasaporte listo para volar",
    summary: [
      "El inglés para viajar no requiere gramática compleja, sino fórmulas de cortesía y preguntas directas.",
      "Saber responder a las preguntas estándar del control de aduanas evita retrasos e interrogatorios innecesarios.",
      "Pedir cosas en restaurantes con 'Could I have...' o 'I'd like...' suena mucho más educado que el imperativo 'I want'.",
      "Las frases de emergencia para equipaje perdido o conexiones canceladas te devuelven el control de tu viaje.",
    ],
    content: {
      intro: [
        "Viajar al extranjero es una de las experiencias más enriquecedoras de la vida, pero el estrés de no entender lo que te dice el agente de migraciones, pedir algo equivocado en un restaurante ruidoso o tener problemas con la reserva del hotel puede agriar cualquier aventura.",
        "La buena noticia es que el inglés que se utiliza en aeropuertos, hoteles y locales de comida es predecible y muy reiterativo. No necesitas dominar tiempos verbales complejos: necesitas un puñado de fórmulas eficaces que funcionen en cualquier rincón del planeta.",
        "Aquí tienes tu guía práctica de conversación en inglés para viajar con confianza y resolver cualquier imprevisto.",
      ],
      sections: [
        {
          heading: "1. En el aeropuerto: facturación, seguridad y control fronterizo",
          subheading: "Cómo responder con tranquilidad a los agentes de aduanas",
          body: [
            "En el mostrador de facturación y en el control de aduanas las preguntas siguen siempre el mismo guion. Conocerlas de antemano elimina los nervios del primer aterrizaje.",
          ],
          table: {
            title: "Preguntas y respuestas clave en el aeropuerto",
            headers: ["Pregunta del agente", "Significado", "Tu respuesta modelo"],
            rows: [
              ["'Where are you traveling today?'", "¿A dónde viajas hoy?", "'I'm flying to New York with a layover in Miami.'"],
              ["'Do you have any check-in bags?'", "¿Vas a despachar equipaje?", "'Just one checked bag and one carry-on backpack.'"],
              ["'What is the purpose of your trip?'", "¿Cuál es el motivo de tu viaje?", "'Vacation and tourism for ten days.'"],
              ["'Where will you be staying?'", "¿Dónde te vas a alojar?", "'At the citizenM Hotel near Times Square.'"],
            ],
          },
        },
        {
          heading: "2. En el hotel: recepción, servicios e incidencias",
          subheading: "Llegada, petición de comodidades y resolución de problemas",
          body: [
            "Pedir un cambio de habitación o solicitar late check-out es muy sencillo si utilizas la estructura de cortesía 'Could we possibly...':",
          ],
          dialogue: [
            {
              speaker: "Recepcionista",
              role: "Front Desk Staff",
              en: "Welcome to the Carlton! How can I help you today?",
              tr: "¡Bienvenido al Carlton! ¿En qué puedo ayudarle hoy?",
              tip: "Saludo inicial.",
            },
            {
              speaker: "Viajero",
              role: "Huésped",
              en: "Hello! We have a reservation under the name Carlos García for three nights.",
              tr: "¡Hola! Tenemos una reserva a nombre de Carlos García para tres noches.",
              tip: "Indica tu apellido y la duración de la estancia.",
            },
            {
              speaker: "Recepcionista",
              role: "Front Desk Staff",
              en: "Here are your room keys on the fifth floor. Elevator is on your right.",
              tr: "Aquí tiene las llaves de su habitación en el quinto piso. El ascensor está a su derecha.",
              tip: "Información de la habitación.",
            },
            {
              speaker: "Viajero",
              role: "Huésped",
              en: "Thank you! Could we get two extra towels, and what is the Wi-Fi password, please?",
              tr: "¡Gracias! ¿Podrían darnos dos toallas extra y decirnos cuál es la contraseña del Wi-Fi, por favor?",
              tip: "Petición educada de servicios adicionales.",
            },
          ],
        },
        {
          heading: "3. En el restaurante: pedir comida y la cuenta con educación",
          subheading: "El gran error del 'I want' vs. la cortesía de 'I'd like'",
          body: [
            "En los países de habla inglesa, decir 'I want the pasta' puede sonar brusco y autoritario para los camareros. Utiliza siempre fórmulas suavizadas:",
          ],
          exampleBox: {
            title: "Fórmulas de pedido en mesa",
            wrong: "I want the grilled salmon and give me water.",
            correct: "Could I please have the grilled salmon? And could we get a bottle of still water for the table, thank you.",
            explanation: "Usa 'Could I please have...' o 'I'd like the...' para sonar natural y muy respetuoso.",
          },
          checklist: [
            "Pedir mesa: 'Do you have a table for two available, please?'",
            "Alergias: 'Does this dish contain nuts or shellfish? I'm allergic.'",
            "La cuenta: 'Could we get the check, please? Can we split it?' (En Reino Unido: 'the bill').",
          ],
        },
        {
          heading: "4. Situaciones de emergencia y transporte",
          subheading: "Pérdida de equipaje y direcciones en la calle",
          body: [
            "Si tu maleta no aparece en la cinta o te pierdes en la estación de tren, estas frases te sacarán del apuro inmediatamente:",
          ],
          list: [
            "Equipaje perdido: 'My luggage didn't show up on carousel four. Where is the baggage claim office?'",
            "Pedir direcciones: 'Excuse me, could you tell me which platform the train to the airport leaves from?'",
            "Farmacia: 'I have a terrible headache and upset stomach. What do you recommend over the counter?'",
          ],
        },
      ],
      faq: [
        {
          q: "¿Se dice 'bill' o 'check' para pedir la cuenta?",
          a: "'Check' es el término estándar en inglés estadounidense; 'bill' es el término en inglés británico. En cualquier lugar te entenderán con cualquiera de los dos.",
        },
        {
          q: "¿Cuánto se debe dejar de propina en Estados Unidos?",
          a: "En EE.UU. la propina habitual en restaurantes con servicio en mesa es del 18% al 20%. En la mayoría de países europeos el servicio suele estar incluido o se redondea.",
        },
        {
          q: "¿Cómo puedo practicar estas situaciones antes de mi viaje?",
          a: "En Spekvia puedes practicar escenarios de viaje con Mivo: simular el paso por el aeropuerto, el check-in en el hotel y pedir comida por voz hasta que te resulten familiares.",
        },
      ],
      conclusion: [
        "El inglés no tiene por qué ser una barrera en tus viajes, sino la llave que te conecte con personas, culturas y experiencias inolvidables en cualquier parte del planeta.",
        "Guarda estas frases en tu teléfono, léelas en voz alta antes de volar y prepárate para disfrutar al máximo de tu próxima aventura.",
      ],
    },
  },
];
