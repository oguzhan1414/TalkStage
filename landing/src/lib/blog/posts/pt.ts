import type { BlogPostSource } from "../types";

export const ptPosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- PT-01 (Pillar)
  {
    slug: "erros-comuns-de-brasileiros-ao-falar-ingles",
    locale: "pt",
    title: "Erros comuns de brasileiros ao falar inglês (e como corrigir)",
    metaTitle: "Erros comuns de brasileiros ao falar inglês: guia",
    excerpt: "Guia completo com exemplos Diga isto / Não diga isto para corrigir omissão de sujeito, falsos cognatos, preposições e pronúncia em inglês.",
    category: "Níveis e gramática",
    featured: true,
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/erros-comuns-de-brasileiros-ao-falar-ingles-cover.webp",
    coverAlt: "Estudante brasileiro examinando erros frequentes ao falar inglês com uma lupa estilizada",
    summary: [
      "A maioria dos deslizes de brasileiros no inglês não ocorre por falta de vocabulário, mas pela transferência direta da sintaxe do português.",
      "Omitir o pronome sujeito ('Is raining' em vez de 'It's raining') é o erro gramatical mais frequente entre falantes nativos de português.",
      "A confusão entre 'have' e 'there is' para indicar existência ('Have a problem here') quebra a clareza da comunicação profissional.",
      "Fórmulas estruturadas no modelo Diga isto / Não diga isto aceleram a correção de hábitos arraigados na fala espontânea.",
    ],
    content: {
      intro: [
        "Você estuda inglês há anos, consome vídeos no YouTube com facilidade e lê documentação sem dicionário. Mas no instante em que precisa falar em uma reunião de trabalho remota ou trocar duas palavras em uma viagem, as frases parecem travar e você sente que cometeu um erro bobo.",
        "Não se culpe: brasileiros cometem rigorosamente os mesmos deslizes ao falar inglês. O português brasileiro permite omitir pronomes, aceita a dupla negativa e usa o verbo 'ter' no sentido de existir com total naturalidade. No entanto, quando aplicamos essas mesmas regras no inglês, o resultado soa estranho ou confuso para o interlocutor.",
        "Neste guia, reunimos os erros mais frequentes de brasileiros ao falar inglês, explicando o porquê de cada um e oferecendo alternativas práticas para você aplicar hoje mesmo.",
      ],
      sections: [
        {
          heading: "1. Omitir o pronome sujeito ('It is raining', nunca 'Is raining')",
          subheading: "O português é uma língua 'pro-drop'; o inglês exige sujeito obrigatório",
          body: [
            "Em português, dizemos 'Está chovendo', 'É difícil' ou 'Parece bom' sem nenhum pronome antes do verbo. O inglês, contudo, é uma língua de sujeito obrigatório: toda oração precisa ter um sujeito claro, mesmo que seja o pronome impessoal 'it'.",
          ],
          exampleBox: {
            title: "Oração com sujeito impessoal obrigatório",
            wrong: "Is raining a lot today, but is necessary to go to the office.",
            correct: "It's raining a lot today, but it's necessary to go to the office.",
            explanation: "Para fenômenos da natureza e orações valorativas, o pronome 'it' é mandatório antes do verbo.",
          },
          table: {
            title: "Frases impessoais que exigem 'It'",
            headers: ["Como o brasileiro pensa", "Forma correta em inglês", "Por que ocorre o erro"],
            rows: [
              ["Is very cold today.", "It's very cold today.", "Falta do sujeito gramatical 'it'."],
              ["Is true that he left.", "It's true that he left.", "Orações afirmativas com adjetivo pedem 'it'."],
              ["Seems like a good plan.", "It seems like a good plan.", "O verbo 'seem' requer sujeito explícito."],
              ["Was late when we met.", "It was late when we met.", "Expressões de tempo e horário exigem 'it'."],
            ],
          },
        },
        {
          heading: "2. O vício do 'Have' em vez de 'There is / There are'",
          subheading: "No Brasil usamos 'tem' para existência, mas o inglês usa 'there is'",
          body: [
            "Na fala cotidiana brasileira, usamos 'tem' para tudo: 'Tem um café aqui perto', 'Tem muitas pessoas na sala'. Em inglês, o verbo 'have' indica estritamente posse física. Para dizer que algo existe em determinado local, você deve usar 'there is' (singular) ou 'there are' (plural).",
          ],
          exampleBox: {
            title: "Existência vs. Posse",
            wrong: "Have many bugs in this software and have a coffee on the table.",
            correct: "There are many bugs in this software and there is a coffee on the table.",
            explanation: "Use 'there is' para singular e 'there are' para plural. Use 'have' apenas quando alguém possui algo ('I have a laptop').",
          },
        },
        {
          heading: "3. 'I have 30 years' e a expressão da idade",
          subheading: "A idade no inglês é um estado de ser, não uma posse",
          body: [
            "No português, nós 'temos' idade. No inglês, você 'é' velho em determinada quantidade de anos. Falar 'I have 26 years' soa como se você guardasse vinte e seis anos no bolso. Use sempre o verbo 'to be'.",
          ],
          list: [
            "Diga: 'I am 28 years old' ou simplesmente 'I am 28'.",
            "Diga: 'She is turning 35 next week' (ela vai fazer 35 anos).",
            "Nunca diga: 'I have 28 years'.",
          ],
        },
        {
          heading: "4. A dupla negativa ('I don't know nothing')",
          subheading: "Duas negações no inglês anulam o sentido e viram uma afirmação",
          body: [
            "No português, a dupla negativa é elegante e necessária: 'Eu não sei nada', 'Não vi ninguém'. No inglês padrão, duas palavras negativas juntas na mesma frase formam uma afirmação lógica e soam gramaticalmente incorretas.",
          ],
          exampleBox: {
            title: "Construções negativas com 'Any'",
            wrong: "I don't have no experience and I didn't see nobody.",
            correct: "I don't have any experience and I didn't see anybody.",
            explanation: "Se o verbo já está na forma negativa ('don't', 'didn't'), use pronomes com 'any' (anything, anybody, anywhere).",
          },
        },
        {
          heading: "5. O erro de concordância com 'People'",
          subheading: "'Gente' é singular no Brasil, mas 'People' é plural no inglês",
          body: [
            "Em português dizemos 'a gente vai' ou 'as pessoas são'. A palavra 'people' é o plural de 'person' e SEMPRE exige verbo e pronomes no plural.",
          ],
          dialogue: [
            {
              speaker: "Dev Júnior",
              role: "Brasileiro",
              en: "The people is waiting for the product release.",
              tr: "As pessoas estão esperando o lançamento do produto.",
              tip: "Erro comum de concordância singular herdado do português.",
            },
            {
              speaker: "Tech Lead",
              role: "Colega sênior",
              en: "Yes, people are very excited about the new features.",
              tr: "'People are' é a concordância correta no plural.",
              tip: "Repare no uso natural de 'people are'.",
            },
          ],
        },
        {
          heading: "6. Preposições de tempo e lugar: In, On, At",
          subheading: "Substituindo o coringa 'em / no / na' do português",
          body: [
            "No Brasil resolvemos quase tudo com 'em' ('no shopping', 'na sexta', 'às duas'). O inglês organiza tempo e espaço em três níveis de precisão:",
          ],
          table: {
            title: "Pirâmide das Preposições",
            headers: ["Preposição", "Dimensão Temporal", "Dimensão Espacial"],
            rows: [
              ["IN (Amplo / Geral)", "Anos, meses, séculos: in 2026, in July", "Países, cidades, cômodos: in Brazil, in the kitchen"],
              ["ON (Superfície / Específico)", "Dias e datas: on Friday, on May 10th", "Ruas, superfícies, transporte: on the street, on the bus"],
              ["AT (Exato / Pontual)", "Horas exatas: at 3:00 PM, at midnight", "Endereços exatos e pontos: at 100 Main St, at the airport"],
            ],
          },
        },
        {
          heading: "7. Pluralizar adjetivos ('differents projects')",
          subheading: "Adjetivos no inglês nunca recebem a letra 's' no plural",
          body: [
            "No português, o adjetivo concorda com o substantivo: 'projetos diferentes', 'ideias novas'. No inglês, os adjetivos são 100% invariáveis.",
          ],
          checklist: [
            "Correto: 'different projects' (nunca 'differents projects').",
            "Correto: 'important decisions' (nunca 'importants decisions').",
            "Correto: 'expensive computers' (nunca 'expensives computers').",
          ],
        },
      ],
      faq: [
        {
          q: "Por que eu continuo errando isso se já estudei a regra?",
          a: "Porque na hora de falar sob pressão o cérebro ativa a memória muscular motora em vez da memória analítica. Sem treino vocal repetido em voz alta, o cérebro recorre automaticamente aos atalhos do português.",
        },
        {
          q: "Como parar de traduzir na cabeça antes de falar?",
          a: "Faça pequenos monólogos diários de 5 minutos narrando suas ações em voz alta. Treinar conversas por voz com o Mivo no Spekvia também pode ajudar a responder sem traduzir.",
        },
        {
          q: "Esses erros me impedem de conseguir uma vaga internacional?",
          a: "Eles não impedem você de ser compreendido, mas corrigi-los eleva a percepção da sua maturidade técnica e do seu nível de inglês para B2/C1, gerando muito mais confiança nos recrutadores.",
        },
      ],
      conclusion: [
        "Falar inglês com fluência não é um talento místico com o qual apenas quem morou fora nasceu: é um conjunto de hábitos motores treináveis. Quando você entende as diferenças estruturais entre o português e o inglês, os erros deixam de ser um mistério e passam a ser ajustes simples.",
        "Escolha hoje dois erros desta lista—como o uso de 'there is' e a eliminação da dupla negativa—e concentre-se neles na sua próxima prática vocal.",
        "A cada ajuste diário, sua comunicação em inglês fica mais natural e poderosa.",
      ],
    },
    sources: [
      { name: "Celce-Murcia, M. & Larsen-Freeman, D. — The Grammar Book: An ESL/EFL Teacher's Course (Heinle)" },
    ],
  },

  // ---------------------------------------------------------------- PT-02
  {
    slug: "pronuncia-do-ingles-para-brasileiros",
    locale: "pt",
    title: "Pronúncia do inglês para brasileiros: os sons mais difíceis (th, -ed e vogal extra)",
    metaTitle: "Pronúncia do inglês para brasileiros: sons difíceis",
    excerpt: "Descubra como dominar o som do TH, as três pronúncias do -ed e eliminar a vogal extra no final das palavras inglesas de uma vez por todas.",
    category: "Metodologia e táticas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/pronuncia-do-ingles-para-brasileiros-cover.webp",
    coverAlt: "Rosto estilizado emitindo ondas sonoras mostrando articulação de sons do inglês",
    summary: [
      "A inserção da vogal extra ('epêntese') ao final de consoantes mudas ('rock-i', 'like-i') é a marca mais forte do sotaque brasileiro.",
      "O som do 'TH' (/θ/ e /ð/) é articulado com a ponta da língua entre os dentes, sem substituir por 's', 't' ou 'f'.",
      "O '-ed' só vira uma sílaba extra (/ɪd/) depois de verbos que terminam em som de T ou D; na maioria dos casos a letra 'e' é muda.",
      "A técnica dos pares mínimos e o treino em frente ao espelho ajudam a treinar a memória muscular da mandíbula.",
    ],
    content: {
      intro: [
        "Você já reparou como é fácil identificar um brasileiro falando inglês no aeroporto ou em uma call internacional? Não se trata de falta de estudo gramatical; é uma questão puramente fonética.",
        "O sistema fonológico do português brasileiro adora sílabas abertas que terminam em vogal (como 'ca-sa', 'me-sa', 'bo-la'). Por isso, quando nosso cérebro se depara com palavras em inglês que terminam em consoantes secas e mudas, nosso aparelho fonador adiciona automaticamente um som de 'i' no final: 'like-i', 'face-i', 'work-i', 'web-i'.",
        "Aprender a posicionar a língua e conter a vogal extra transforma a sua clareza ao falar. A seguir, dissecamos os sons mais desafiadores do inglês para brasileiros com exercícios práticos e espelho fonético.",
      ],
      sections: [
        {
          heading: "1. A vogal intrusiva final (Epêntese): Eliminando o som de 'i'",
          subheading: "Como travar o fluxo de ar para dizer consoantes secas de verdade",
          body: [
            "Em português quase não existem palavras que terminam com consoantes oclusivas como P, B, T, D, K, G. Quando vemos 'Facebook', falamos 'Feicebuqui'. Em inglês, essas consoantes finais são estritamente secas: o ar é travado na boca e nada mais sai.",
          ],
          exampleBox: {
            title: "Travamento de ar vs. Vogal extra",
            wrong: "Pronúncia: 'I like-i this rock-i music and I use the web-i.'",
            correct: "Pronúncia: 'I like [trava] this rock [trava] music and I use the web [trava].'",
            explanation: "Encoste a língua no céu da boca para o K ou T e simplesmente congele o movimento sem soltar som de vogal em seguida.",
          },
          table: {
            title: "Palavras com consoante final seca",
            headers: ["Palavra", "Como o brasileiro tende a falar", "Pronúncia correta"],
            rows: [
              ["Hot dog", "Róti dogui", "/hɒt dɒɡ/ (final seco)"],
              ["Internet", "Internéti", "/ˈɪntərnet/ (final seco)"],
              ["Stop", "Istópi", "/stɒp/ (final seco)"],
              ["Facebook", "Feicebuqui", "/ˈfeɪsbʊk/ (final seco)"],
            ],
          },
        },
        {
          heading: "2. O som do 'TH' sem medo (/θ/ e /ð/)",
          subheading: "Coloque a ponta da língua entre os dentes da frente",
          body: [
            "Não existe nada parecido com o 'TH' no português brasileiro. Por isso, costumamos substituí-lo por 'F' ('free' em vez de 'three'), 'T' ('tree' em vez de 'three') ou 'S' ('sink' em vez de 'think').",
            "O truque mecânico: coloque a ponta da língua levemente entre os dentes incisivos superiores e inferiores e assopre o ar. Se você não colocar a língua para fora dos dentes, o som não sairá correto.",
          ],
          list: [
            "TH sordo (/θ/): sopro de ar sem vibração na garganta (think, three, thank, mouth).",
            "TH sonoro (/ð/): sopro de ar com vibração das cordas vocais (this, that, they, brother).",
          ],
        },
        {
          heading: "3. As 3 pronúncias da terminação '-ed' no passado",
          subheading: "Apenas verbos terminados em som de T ou D ganham sílaba extra",
          body: [
            "O erro mais universal dos brasileiros é pronunciar o '-ed' como uma sílaba completa ('work-ed', 'help-ed', 'call-ed'). Na realidade, na esmagadora maioria das vezes a letra 'e' é completamente muda:",
          ],
          table: {
            title: "Regra das 3 pronúncias do -ed",
            headers: ["Terminação do verbo base", "Som do -ed", "Exemplo prático"],
            rows: [
              ["Consoantes surdas (p, k, s, sh, ch, f)", "Som de /t/ (seco)", "Worked (/wɜːkt/), Stopped (/stɒpt/)"],
              ["Sons sonoros e vogais (b, g, v, z, l, m, n, r)", "Som de /d/ (suave)", "Played (/pleɪd/), Called (/kɔːld/)"],
              ["Apenas sons de T ou D", "Som de /ɪd/ (sílaba extra)", "Wanted (/ˈwɒntɪd/), Needed (/ˈniːdɪd/)"],
            ],
          },
        },
        {
          heading: "4. A diferença entre H e R",
          subheading: "'Hot' não começa com o mesmo som de 'Rato'",
          body: [
            "No português brasileiro, o 'R' no início da palavra (como em 'rio' ou 'rua') soa como uma aspiração na garganta. No inglês, esse som aspirado é exclusivo da letra H (hot, home, help). O 'R' em inglês é enrolado para trás no céu da boca, semelhante ao 'R' caipira do interior de São Paulo (red, right, road).",
          ],
          exampleBox: {
            title: "Pares mínimos H vs. R",
            wrong: "Pronunciar 'red' como 'head' faz você dizer que a caneta é 'cabeça' em vez de 'vermelha'.",
            correct: "Red (/red/ - R retroflexo com a língua curvada para trás) vs. Head (/hed/ - H aspirado suave na garganta).",
            explanation: "Nunca pronuncie a letra R em inglês como um som raspado na garganta.",
          },
        },
        {
          heading: "5. Vogais curtas vs. longas: Ship vs. Sheep",
          subheading: "A tensão muscular que evita constrangimentos",
          body: [
            "No português só temos um som de 'i'. O inglês tem dois: o /iː/ longo e tenso (beach, sheet, sleep) e o /ɪ/ curto e frouxo (ship, sit, slip). Para falar o /iː/ tenso de 'beach', abra um sorriso largo. Para falar o /ɪ/ curto, relaxe a boca como se fosse emitir um som entre 'e' e 'i'.",
          ],
        },
      ],
      faq: [
        {
          q: "Eu preciso perder meu sotaque brasileiro para ser fluente?",
          a: "Absolutamente não. Ter sotaque faz parte da sua identidade cultural. O objetivo é eliminar erros de pronúncia que causam ruído ou mal-entendidos na comunicação profissional.",
        },
        {
          q: "Como treinar a trava da consoante final sem soltar o som de 'i'?",
          a: "Treine encostar a língua no céu da boca para o 'K' ou 'T' e segurar a respiração por dois segundos antes de abrir a boca. Com prática diária, o movimento fica mais automático.",
        },
        {
          q: "Como o Spekvia me ajuda a treinar pronúncia?",
          a: "No Spekvia você pode praticar uma lista de palavras que costumam ser pronunciadas errado: ouve a pronúncia correta, grava a sua e compara. Nas conversas com o Mivo, o app também aponta erros de vocabulário e de expressão.",
        },
      ],
      conclusion: [
        "A pronúncia em inglês é uma habilidade motora mecânica. Quando você entende onde encostar a língua e como controlar o fluxo de ar, os sons deixam de ser um mistério e passam a ser uma questão de repetição consciente.",
        "Pratique dez minutos em frente ao espelho com os pares mínimos de hoje e perceba a diferença na próxima conversa.",
      ],
    },
    sources: [
      { name: "Ladefoged, P. & Johnson, K. — A Course in Phonetics (Cengage)" },
    ],
  },

  // ---------------------------------------------------------------- PT-03
  {
    slug: "falsos-cognatos-ingles-portugues",
    locale: "pt",
    title: "Falsos cognatos inglês–português: 16 pegadinhas que você precisa evitar",
    metaTitle: "Falsos cognatos inglês-português: 16 palavras traiçoeiras",
    excerpt: "Conheça 16 falsos cognatos comuns entre inglês e português como pretend, push, actually e library com exemplos práticos e mini quiz.",
    category: "Níveis e gramática",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/falsos-cognatos-ingles-portugues-cover.webp",
    coverAlt: "Duas máscaras ilustrativas representando falsos cognatos entre inglês e português",
    summary: [
      "Falsos cognatos são termos que têm grafia e pronúncia semelhantes em dois idiomas, mas significados totalmente distintos.",
      "O clássico 'push' na porta de vidro (empurrar) faz brasileiros puxarem a porta todos os dias.",
      "Confundir 'actually' com 'atualmente' ou 'pretend' com 'pretender' compromete acordos e alinhamentos de trabalho.",
      "Agrupar os falsos cognatos por contexto de uso facilita a memorização.",
    ],
    content: {
      intro: [
        "Quem nunca deu aquele puxão confiante em uma porta de vidro com a placa 'PUSH' em letras garrafais no exterior que atire a primeira pedra. O clássico 'push' (que significa empurrar, e não puxar) é o rei dos falsos cognatos entre inglês e português.",
        "Mas enquanto empurrar uma porta errada só rende uma risada rápida, usar um falso cognato em uma reunião de negócios com clientes estrangeiros pode gerar mal-entendidos graves. Dizer 'I pretend to finish this today' achando que disse 'eu pretendo terminar isso hoje' na verdade significa 'eu finjo terminar isso hoje'!",
        "Para blindar a sua comunicação contra essas pegadinhas, preparamos o guia dos 16 falsos cognatos mais perigosos entre inglês e português.",
      ],
      sections: [
        {
          heading: "1. Falsos cognatos críticos no trabalho e tecnologia",
          subheading: "Termos que alteram compromissos, prazos e responsabilidades",
          body: [
            "No ambiente corporativo e em equipes de engenharia, estas palavras são armadilhas constantes em e-mails e reuniões:",
          ],
          table: {
            title: "Falsos cognatos no ambiente profissional",
            headers: ["Palavra em inglês", "Parece com...", "Significado real", "Como falar o que você queria"],
            rows: [
              ["Pretend", "Pretender", "Fingir / simular", "Intend / plan to"],
              ["Actually", "Atualmente", "Na verdade / na realidade", "Currently / nowadays"],
              ["Realize", "Realizar (fazer)", "Perceber / dar-se conta", "Fulfill / accomplish / carry out"],
              ["Notice", "Notícia", "Aviso / notar", "News / piece of news"],
              ["Attend", "Atender (telefone)", "Comparecer / assistir a", "Answer (the phone) / assist"],
              ["Assist", "Assistir (ver)", "Ajudar / dar suporte", "Watch (a movie)"],
            ],
          },
          exampleBox: {
            title: "O erro de 'Pretend' vs. 'Intend'",
            wrong: "I pretend to deploy the new features this afternoon.",
            correct: "I intend to deploy the new features this afternoon.",
            explanation: "'Pretend' significa fingir. Se você diz 'I pretend to deploy', parece que vai fingir que subiu o código para a produção!",
          },
        },
        {
          heading: "2. Falsos cognatos no dia a dia e compras",
          subheading: "Evite saias justas em lojas, farmácias e passeios",
          body: [
            "Quando você viaja ou compra itens online, estas palavras costumam pregar peças embaraçosas:",
          ],
          table: {
            title: "Falsos cognatos no cotidiano",
            headers: ["Palavra em inglês", "Parece com...", "Significado real", "Como falar o que você queria"],
            rows: [
              ["Push", "Puxar", "Empurrar", "Pull (puxar)"],
              ["Library", "Livraria", "Biblioteca", "Bookstore (livraria)"],
              ["Fabric", "Fábrica", "Tecido / pano", "Factory (fábrica)"],
              ["Novel", "Novela de TV", "Romance (livro)", "Soap opera (novela de TV)"],
              ["Parents", "Parentes em geral", "Pais (pai e mãe)", "Relatives (parentes)"],
              ["Sensible", "Sensível", "Sensato / ajuizado", "Sensitive (sensível)"],
            ],
          },
          dialogue: [
            {
              speaker: "Marcos",
              role: "Turista brasileiro",
              en: "Excuse me, I'm looking for a library to buy the new Stephen King book.",
              tr: "Com licença, estou procurando uma biblioteca para comprar o novo livro do Stephen King.",
              tip: "'Library' é biblioteca pública gratuita.",
            },
            {
              speaker: "Atendente",
              role: "Livreiro local",
              en: "You can borrow it from the public library, or buy it right here in our bookstore!",
              tr: "Você pode pegá-lo emprestado na biblioteca pública ou comprá-lo aqui mesmo, na nossa livraria!",
              tip: "'Bookstore' é a loja comercial de livros.",
            },
          ],
        },
        {
          heading: "3. Falsos cognatos emocionais e de comportamento",
          subheading: "Palavras que podem fazer você soar rude ou confuso",
          body: [
            "Cuidado ao descrever sua personalidade ou a de seus colegas com estes termos:",
          ],
          list: [
            "Sympathetic ≠ Simpático: significa compreensivo, empático ou solidário. Simpático se diz 'friendly' ou 'nice'.",
            "Exquisite ≠ Esquisito: significa refinado, sublime ou requintado. Esquisito se diz 'weird' ou 'strange'.",
            "Prejudice ≠ Prejuízo financeiro: significa preconceito. Prejuízo financeiro se diz 'financial loss' ou 'damage'.",
            "Comprehensive ≠ Compreensivo: significa abrangente, completo ou detalhado. Compreensivo se diz 'understanding'.",
          ],
        },
        {
          heading: "4. Mini-Quiz: Teste seus reflexos agora",
          subheading: "Você saberia responder sem cair no falso cognato?",
          checklist: [
            "Como dizer 'Ela é muito sensível'? -> 'She is very sensitive' (não 'sensible').",
            "Como dizer 'Vou visitar meus parentes no domingo'? -> 'I will visit my relatives on Sunday' (não 'parents').",
            "Como dizer 'Eles construíram uma fábrica de carros'? -> 'They built a car factory' (não 'fabric').",
            "Como dizer 'Atualmente moro em Florianópolis'? -> 'Currently I live in Florianópolis' (não 'actually').",
          ],
        },
      ],
      faq: [
        {
          q: "Por que existem tantos falsos cognatos entre as duas línguas?",
          a: "Embora o inglês seja uma língua germânica, boa parte do seu vocabulário tem raiz latina ou francesa antiga. Muitas palavras compartilham o mesmo ancestral latino, mas seus significados divergiram ao longo dos séculos.",
        },
        {
          q: "Qual a melhor técnica para não confundir 'Push' e 'Pull'?",
          a: "Não use a letra P como pista: ela aparece em 'push', em 'pull' e também em 'puxar'. Associe o som 'SH' de 'push' ao 'xô!' que afasta algo, e lembre que 'pull' é o oposto: trazer para você.",
        },
        {
          q: "O Spekvia me avisa se eu usar um falso cognato?",
          a: "Nas conversas por voz com o Mivo, o app aponta erros de vocabulário e de expressão com uma explicação curta e guarda tudo no Meu caderno de erros. Não há um recurso só para falsos cognatos, mas você pode revisar os que costuma errar.",
        },
      ],
      conclusion: [
        "Desarmar os falsos cognatos é uma das vitórias mais rápidas que você pode ter no seu aprendizado de inglês. Em vez de temer a semelhança entre as palavras, use esta lista como um filtro de segurança mental.",
        "Salve este guia, revise os 16 termos antes da sua próxima conversa em inglês.",
      ],
    },
  },

  // ---------------------------------------------------------------- PT-04
  {
    slug: "ingles-para-entrevista-de-emprego-remoto",
    locale: "pt",
    title: "Inglês para entrevista de emprego: conquiste vagas remotas internacionais",
    metaTitle: "Inglês para entrevista de emprego: vagas remotas",
    excerpt: "Prepare-se para entrevistas em inglês para empresas do exterior com respostas modelo para Tell me about yourself e o método STAR na prática.",
    category: "Carreira e entrevistas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/ingles-para-entrevista-de-emprego-remoto-cover.webp",
    coverAlt: "Profissional brasileiro em chamada de vídeo para entrevista de emprego remota internacional",
    summary: [
      "Vagas remotas que pagam em dólar ou euro valorizam a clareza de comunicação muito mais do que um vocabulário rebuscado.",
      "A resposta para 'Tell me about yourself' deve seguir a tríade Presente, Passado e Futuro em até 90 segundos.",
      "O método STAR (Situação, Tarefa, Ação, Resultado) estrutura respostas sobre desafios técnicos com dados e métricas.",
      "Saber negociar salário e falar sobre autonomia em fuso horário internacional transmite confiança imediata.",
    ],
    content: {
      intro: [
        "Trabalhar do Brasil para empresas dos Estados Unidos ou da Europa e receber em moeda forte é o sonho de milhares de profissionais de tecnologia, design e produto. Você tem o conhecimento técnico exigido, construiu projetos sólidos no GitHub, mas a ideia de passar por uma bateria de entrevistas em inglês pela tela do Zoom gela a espinha.",
        "Muitos brasileiros acreditam que precisam de um inglês com sotaque americano perfeito para serem contratados. Isso é um mito: empresas globais contratam pessoas do mundo inteiro e valorizam a clareza, a capacidade de síntese e a autonomia de entrega muito mais do que a perfeição gramatical.",
        "Neste guia, você vai aprender a estruturar as respostas mais importantes da sua entrevista internacional, aplicando o método STAR e fórmulas de negociação salarial em inglês.",
      ],
      sections: [
        {
          heading: "1. Como responder 'Tell me about yourself' de forma executiva",
          subheading: "A fórmula Presente, Passado e Futuro em 90 segundos",
          body: [
            "Não comece contando onde você nasceu ou o que estudou no colégio. O recrutador internacional quer entender em um minuto e meio o seu momento atual, o seu histórico de impacto e por que essa vaga faz sentido agora:",
          ],
          exampleBox: {
            title: "Estrutura Presente-Passado-Futuro",
            wrong: "Well, I live in São Paulo, I graduated in 2017, then I had three jobs and I like technology...",
            correct: "Currently, I work as a senior frontend engineer building high-volume fintech dashboards. Over the past four years, I led the migration of our design system, cutting time-to-market by 25%. I'm excited about this role because your distributed architecture poses the exact cross-browser performance challenges I thrive on.",
            explanation: "Inicia com o cargo atual, apresenta uma métrica de resultado concreta e conecta com a missão da empresa contratante.",
          },
        },
        {
          heading: "2. O método STAR para desafios e perguntas comportamentais",
          subheading: "Situação, Tarefa, Ação pessoal e Resultado mensurável",
          body: [
            "Quando perguntarem sobre conflitos ou projetos complexos ('Tell me about a time when a production incident occurred'), use o método STAR para não se perder:",
          ],
          table: {
            title: "Matriz de resposta STAR",
            headers: ["Etapa STAR", "Foco da resposta", "Frase modelo para iniciar"],
            rows: [
              ["Situation (Situação)", "Contexto do problema", "'At my previous startup, our primary payment gateway went down on Black Friday...'"],
              ["Task (Tarefa)", "Qual era o seu dever específico", "'My immediate objective was to establish an automated fallback route...'"],
              ["Action (Ação)", "O que VOCÊ executou", "'I spearheaded the implementation of a secondary API client and coordinated the rollout...'"],
              ["Result (Resultado)", "O impacto com números", "'As a result, we recovered ninety-eight percent of transactions within twenty minutes.'"],
            ],
          },
        },
        {
          heading: "3. Falando sobre trabalho remoto assíncrono e fuso horário",
          subheading: "Mostre que você sabe trabalhar de forma autônoma sem supervisão constante",
          body: [
            "Trabalhar remotamente com equipes internacionais exige maturidade de comunicação assíncrona. Os recrutadores adoram ouvir estas competências de forma explícita:",
          ],
          list: [
            "Documentação clara: 'I prioritize thorough asynchronous documentation, so colleagues in other timezones can pick up tasks without waiting for a synchronous sync.'",
            "Autonomia: 'I'm very comfortable unblocking myself through existing codebase research and structured RFC proposals.'",
            "Sobreposição de horários: 'I'm aligned with US Eastern Time and have four to five hours of daily overlap with the core engineering team.'",
          ],
        },
        {
          heading: "4. Negociação salarial em dólares e perguntas para o final",
          subheading: "Como falar de remuneração com postura profissional",
          dialogue: [
            {
              speaker: "Recrutador",
              role: "Headhunter Internacional",
              en: "What are your compensation expectations for this remote contractor role?",
              tr: "Quais são as suas expectativas de remuneração para esta vaga de contratado remoto?",
              tip: "Pergunta clássica de alinhamento.",
            },
            {
              speaker: "Candidato",
              role: "Brasileiro preparado",
              en: "Based on market benchmarks for senior remote engineers and the technical scope of this position, I'm targeting a range between 90,000 and 110,000 US dollars annually. I'm also open to discussing equity and PTO flexibility.",
              tr: "Com base nas referências de mercado para engenheiros seniores remotos e no escopo técnico desta posição, minha meta fica entre 90 mil e 110 mil dólares por ano. Também posso conversar sobre equity e flexibilidade de férias.",
              tip: "Apresenta um intervalo anual realista em USD demonstrando pesquisa de mercado.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Preciso ter inglês avançado (C1/C2) para passar na entrevista?",
          a: "Para a grande maioria das vagas de TI e produto, um nível B2 sólido e funcional é mais do que suficiente. O que os líderes internacionais buscam é capacidade de explicar ideias com clareza e sem rodeios.",
        },
        {
          q: "E se eu não entender o sotaque do entrevistador?",
          a: "Peça para repetir com tranquilidade: 'Could you please repeat that last question?' ou 'Could you elaborate on that point?'. Isso demonstra profissionalismo, e não fraqueza.",
        },
        {
          q: "Como treinar para entrevistas antes da data oficial?",
          a: "Você pode simular entrevistas de vagas remotas com o Mivo no Spekvia: ele faz as perguntas típicas de empresas internacionais e o app aponta erros durante a conversa.",
        },
      ],
      conclusion: [
        "A barreira entre você e um salário internacional em moeda forte não é o seu talento técnico: é apenas a preparação estratégica da sua comunicação em inglês.",
        "Monte seus exemplos STAR em tópicos hoje mesmo, treine suas respostas em voz alta e conquiste a sua vaga remota dos sonhos.",
      ],
    },
    sources: [
      { name: "GitLab — Handbook: All-Remote culture", url: "https://handbook.gitlab.com/handbook/company/culture/all-remote/" },
    ],
  },

  // ---------------------------------------------------------------- PT-05
  {
    slug: "como-perder-o-medo-de-falar-ingles",
    locale: "pt",
    title: "Como perder o medo de falar inglês: método de 15 minutos por dia",
    metaTitle: "Como perder o medo de falar inglês em 15 minutos ao dia",
    excerpt: "Destrave a sua fala em inglês sem vergonha com a técnica do shadowing, gravação de voz e uma rotina prática diária de 4 semanas passo a passo.",
    category: "Metodologia e táticas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/como-perder-o-medo-de-falar-ingles-cover.webp",
    coverAlt: "Cadeado se abrindo liberando palavras em inglês simbolizando destravar a fala",
    summary: [
      "O medo de falar inglês é um bloqueio psicológico de medo do julgamento, não uma deficiência cognitiva.",
      "Praticar sozinho em voz alta cria um ambiente de segurança psicológica total para calibrar a musculatura da fala.",
      "O método dos três blocos diários de 5 minutos (escuta ativa, simulação de diálogos e escuta da própria voz) reconstrói a autoconfiança.",
      "Celebrar pequenas vitórias diárias ajuda a reduzir a ansiedade ao falar, no seu ritmo.",
    ],
    content: {
      intro: [
        "Você já sentiu o coração acelerar, a respiração ficar curta e a garganta travar só de pensar em falar inglês na frente de outras pessoas? Esse fenômeno tem nome na psicologia: 'Foreign Language Speaking Anxiety' (ansiedade comunicativa em língua estrangeira).",
        "A maioria das pessoas que sofre desse travamento não tem problemas com o inglês em si: elas leem livros, entendem vídeos e acertam testes escritos. O problema é a voz do perfeccionismo interno dizendo: 'Se você errar uma preposição, todo mundo vai rir de você'.",
        "A única forma de silenciar essa voz não é estudando mais gramática passiva: é dessensibilizar o cérebro através da fala em voz alta sem julgamento. Aqui está um método de 15 minutos diários para você destravar a sua fala de uma vez por todas.",
      ],
      sections: [
        {
          heading: "1. Por que o medo de falar acontece na nossa mente",
          subheading: "A amígdala cerebral interpretando o erro linguístico como uma ameaça social",
          body: [
            "Pesquisadores associam a ansiedade ao falar uma língua estrangeira ao medo do julgamento dos outros. Quando você tenta falar em uma língua que não domina totalmente na frente de colegas, é comum sentir o risco de errar como uma ameaça de rejeição social.",
            "Para desativar esse alarme, você precisa treinar o seu aparelho vocal em um ambiente de risco zero: sozinho, no seu quarto, sem ninguém ouvindo, até que o ato de falar inglês seja tão corriqueiro quanto escovar os dentes.",
          ],
        },
        {
          heading: "2. O protocolo de 15 minutos diários sem pressão",
          subheading: "Três blocos de 5 minutos que transformam sua autoconfiança",
          body: [
            "Você não precisa de horas de estudo exaustivo. Quinze minutos focados e consistentes todos os dias produzem conexões neurais mais fortes do que maratonas esporádicas no fim de semana.",
          ],
          table: {
            title: "Rotina Diária dos 15 Minutos",
            headers: ["Bloco", "Atividade", "Efeito psicológico"],
            rows: [
              ["Minutos 1 a 5", "Shadowing com podcast ou vídeo", "Sincroniza seu ritmo com a fala nativa sem precisar inventar frases."],
              ["Minutos 6 a 10", "Simulação de diálogo em voz alta", "Treina a resposta rápida a situações cotidianas."],
              ["Minutos 11 a 15", "Gravação de 90 segundos sobre o dia", "Dessensibiliza o estranhamento de ouvir a própria voz em inglês."],
            ],
          },
          proTip: "Guarde as gravações em uma pasta de áudio no seu celular com a data de cada dia. Ouvir o seu áudio de 30 dias atrás é o maior remédio contra a síndrome do impostor.",
        },
        {
          heading: "3. Dando a si mesmo permissão para errar",
          subheading: "A diferença entre comunicação funcional e perfeccionismo paralisante",
          body: [
            "Nativos de inglês cometem erros gramaticais todos os dias. O objetivo de uma conversa não é passar em uma prova de concurso público: é transmitir uma ideia e conectar com o outro ser humano.",
          ],
          exampleBox: {
            title: "Comunicação Imperfeita vs. Silêncio Total",
            wrong: "Ficar em silêncio por vergonha de não saber a conjugação do past perfect.",
            correct: "Falar: 'Yesterday I go—sorry, I went to the store and bought coffee.'",
            explanation: "Uma correção rápida e natural no meio da frase demonstra maturidade e mantém a conversa fluindo com empatia.",
          },
        },
        {
          heading: "4. Plano de 4 semanas para destravar a voz",
          subheading: "Evolução gradual da fala sem plateia",
          checklist: [
            "Semana 1: Falar em voz alta lendo textos infantis ou notícias simples (5 min por dia).",
            "Semana 2: Narrar suas ações na cozinha ou no banho em inglês ('I'm making breakfast now').",
            "Semana 3: Praticar conversas simuladas com o Mivo no Spekvia em cenários de viagem ou trabalho.",
            "Semana 4: Fazer a primeira chamada ou reunião em inglês com a certeza de que você é capaz.",
          ],
        },
      ],
      faq: [
        {
          q: "É normal ter a sensação de ter outra personalidade em inglês?",
          a: "Sim! Muitos poliglotas relatam sentir-se ligeiramente diferentes ao falar outra língua. Isso ocorre porque o tom de voz e a cadência mudam fisicamente.",
        },
        {
          q: "E se eu der um branco total na hora da conversa?",
          a: "Use uma frase de apoio: 'Let me think of the best way to explain this' ou 'Give me just a second to gather my thoughts'. Isso compra tempo com elegância.",
        },
        {
          q: "Como o Spekvia ajuda quem tem vergonha de falar?",
          a: "O Spekvia oferece um parceiro de voz paciente e amigável: o Mivo. Como o Mivo é um personagem de inteligência artificial, você pode errar cem vezes sem nenhum julgamento humano.",
        },
      ],
      conclusion: [
        "A confiança não vem antes da ação: ela é construída depois que você dá o primeiro passo, mesmo com o coração na mão.",
        "Dê a si mesmo a oportunidade de soltar a sua voz em inglês hoje. O mundo está esperando para ouvir as suas ideias.",
      ],
    },
    sources: [
      { name: "Horwitz, E., Horwitz, M. & Cope, J. (1986) — Foreign Language Classroom Anxiety. The Modern Language Journal" },
    ],
  },

  // ---------------------------------------------------------------- PT-06
  {
    slug: "ingles-para-desenvolvedores-daily-e-reunioes",
    locale: "pt",
    title: "Inglês para desenvolvedores: daily standup, code review e reuniões",
    metaTitle: "Inglês para desenvolvedores: daily standup e code review",
    excerpt: "Vocabulário prático e frases prontas para profissionais de tecnologia participarem de daily scrums, explicarem blockers e comentarem em PRs.",
    category: "Carreira e entrevistas",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    coverImage: "/blog/pt/ingles-para-desenvolvedores-daily-e-reunioes-cover.webp",
    coverAlt: "Equipe de desenvolvedores em roda de daily standup com quadro de tarefas flutuante",
    summary: [
      "A daily standup internacional se resume a três pilares objetivos: o que foi entregue, o que está em progresso e impedimentos.",
      "Saber comunicar atrasos com justificativas arquiteturais evita soar defensivo na frente dos líderes técnicos.",
      "Comentários de code review devem usar perguntas gentis ('Could we...') em vez de ordens diretas e secas.",
      "Modelos prontos para Slack e reuniões de sprint aumentam sua visibilidade e respeito no time global.",
    ],
    content: {
      intro: [
        "Você programa em TypeScript, domina Docker e escreve consultas SQL complexas de olhos fechados. Mas quando o relógio marca o horário da daily scrum com o time internacional e o Scrum Master chama o seu nome, o estresse bate à porta.",
        "Tentar explicar uma falha de concorrência ou um atraso na esteira de CI/CD enquanto busca preposições em inglês faz você soar inseguro, mesmo sendo um dos desenvolvedores mais sêniores da equipe.",
        "A verdade é que as reuniões de engenharia de software seguem estruturas previsíveis e modulares. Uma vez que você aprende os blocos certos de vocabulário, sua participação se torna clara, objetiva e respeitada.",
      ],
      sections: [
        {
          heading: "1. O modelo das três perguntas da Daily Standup",
          subheading: "Ontem, Hoje e Bloqueios em menos de 60 segundos",
          body: [
            "Uma boa atualização de standup não é um relatório minucioso de cada linha de código; é uma sinalização de fluxo para o time saber se o sprint está no caminho certo:",
          ],
          table: {
            title: "Frases de apoio para a Daily Scrum",
            headers: ["Etapa", "Frase em inglês", "Exemplo no contexto de software"],
            rows: [
              ["Yesterday", "Yesterday I finished / pushed / wrapped up...", "Yesterday I wrapped up the authentication middleware and opened a PR."],
              ["Today", "Today I'm working on / diving into...", "Today I'm diving into the database migration for customer accounts."],
              ["Blocker", "I'm currently blocked by / waiting for...", "I'm blocked by missing API credentials for the staging sandbox."],
              ["Passar a palavra", "Handing it over to [Nome]...", "That's it from my side—handing it over to Lucas."],
            ],
          },
        },
        {
          heading: "2. Como explicar atrasos sem parecer defensivo",
          subheading: "Troque desculpas pessoais por explicações de complexidade técnica",
          body: [
            "Estimativas de software falham com frequência. Dizer 'não consegui terminar porque era muito difícil' soa amador; explicar o débito técnico com clareza transmite senioridade:",
          ],
          exampleBox: {
            title: "Comunicação de atraso de entrega",
            wrong: "I didn't finish ticket 204 because the legacy code is very bad and full of bugs.",
            correct: "Ticket 204 revealed deeper legacy dependencies than we estimated. I'm refactoring the validation layer today and expect to have a draft PR ready by 3 PM.",
            explanation: "Descreve a causa arquitetural real e fornece uma estimativa de horário de entrega concreta.",
          },
        },
        {
          heading: "3. Etiqueta em Pull Requests e Code Reviews",
          subheading: "Suavize as críticas para manter um clima de colaboração",
          body: [
            "Em inglês escrito, comentários diretos como 'You must change this' soam agressivos. Engenheiros de elite formulam sugestões em tom de pergunta colaborativa:",
          ],
          table: {
            title: "Comentários agressivos vs. Colaborativos",
            headers: ["Tom duro / imperativo", "Tom colaborativo recomendado", "Objetivo da revisão"],
            rows: [
              ["This is wrong.", "I think there might be a race condition here.", "Apontar um bug"],
              ["Rename this function.", "Could we rename this function to make the intent clearer?", "Melhorar legibilidade"],
              ["Why did you do this?", "Could you walk me through the reasoning behind this approach?", "Entender a decisão"],
              ["Add tests.", "Would you mind adding a unit test for this edge case?", "Pedir cobertura de testes"],
            ],
          },
          proTip: "Use o prefixo 'nit:' (de nitpick) quando for uma sugestão pequena e opcional de formatação que não precisa bloquear o merge do PR.",
        },
        {
          heading: "4. Diálogo realista de uma Daily Standup internacional",
          dialogue: [
            {
              speaker: "Scrum Master",
              role: "Facilitador",
              en: "Morning folks! Let's get through today's sync. Rodrigo, you want to start?",
              tr: "Bom dia, pessoal! Vamos passar pela sincronização de hoje. Rodrigo, quer começar?",
              tip: "Abertura habitual da reunião.",
            },
            {
              speaker: "Rodrigo",
              role: "Engenheiro Backend",
              en: "Morning! Yesterday I pushed the schema changes and resolved the merge conflicts on PR 112. Today I'm profiling our Redis cache latency under load. No blockers on my end, but I'll need a peer review from Jessica later today. Over to you, Jessica.",
              tr: "Bom dia! Ontem enviei as mudanças de schema e resolvi os conflitos de merge no PR 112. Hoje vou analisar a latência do nosso cache Redis sob carga. Sem bloqueios do meu lado, mas vou precisar de uma revisão da Jessica ainda hoje. Com você, Jessica.",
              tip: "Fluxo perfeito: entrega de ontem, foco de hoje, aviso de PR e passagem de palavra.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Como pedir ajuda durante a standup sem parecer incapaz?",
          a: "Use: 'I've hit an edge case with the worker queue. Would anyone have ten minutes after standup to pair with me on it?'. Pedir pareamento é visto como sinal de maturidade técnica.",
        },
        {
          q: "Como interromper educadamente para fazer uma pergunta na reunião?",
          a: "Diga: 'Sorry to jump in, could you clarify that last requirement?' ou 'Just to make sure I'm following, are we targeting this sprint?'.",
        },
        {
          q: "Como treinar vocabulário técnico de TI em inglês?",
          a: "No Spekvia você pode simular cenários específicos de reuniões de tecnologia com o Mivo, treinando situações de trabalho em voz alta.",
        },
      ],
      conclusion: [
        "Em equipes distribuídas e remotas, a sua comunicação técnica tem tanta importância quanto a qualidade do seu código. Dominar as expressões certas de reuniões e code review coloca você em posição de liderança e destaque internacional.",
        "Aplique estas frases na sua próxima daily e sinta a diferença na segurança da sua voz.",
      ],
    },
    sources: [
      { name: "Atlassian — Daily stand-up meetings (Agile Coach)", url: "https://www.atlassian.com/agile/scrum/standups" },
      { name: "Google Engineering Practices — The Code Reviewer's Guide", url: "https://google.github.io/eng-practices/review/" },
    ],
  },
];
