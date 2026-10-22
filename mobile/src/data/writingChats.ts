/**
 * Başlangıç (A1-A2) yazma görevleri sohbet olarak ilerler: karşı taraf görevin her maddesi için sırayla bir soru sorar,
 * kullanıcı İngilizce cevap yazar, bitince tüm cevaplar birlikte Mivo'ya gider. Karşı tarafın cümleleri sabittir
 * (yapay zekâ üretmez): hızlı, ucuz ve her kullanıcıda aynı. Cümleler İngilizcedir, çevrilmez; adımın ne istediği
 * görevin `points` maddelerinden (uygulama dilinde) gelir.
 *
 * `lines[i]` görevin i. maddesini kullanıcıdan isteyen mesajdır (ilk satır sohbeti açar); `closing` son cevaptan sonra
 * gelen vedadır. Madde sayısı ile satır sayısı aynı olmalıdır.
 */
export type WritingChat = {
  /** Karşı tarafın adı (ekranda baş harfi avatar olur). */
  name: string;
  lines: string[];
  closing: string;
};

const CHATS: Record<string, WritingChat> = {
  'a1_n01-w1': {
    name: 'Sofia',
    lines: [
      "Hi everyone! Welcome to the English class group 👋 I'm Sofia. Say hello and tell us your name!",
      'Nice to meet you! Where are you from, and what do you do?',
      'Great! How are you today? Say goodbye to the group!',
    ],
    closing: 'See you in class! 😊',
  },
  'a1_n02-w1': {
    name: 'Lena',
    lines: [
      "You're back from your trip! What gifts did you buy? Tell me about three things.",
      'Ooh, nice! Now point at one of them: which one is it?',
      'Do you like it? Tell me which one you like!',
    ],
    closing: "Lovely! I can't wait to see them 🎁",
  },
  'a1_n03-w1': {
    name: 'Tom',
    lines: [
      'Wow, nice photo! Who are the people in it?',
      "Tell me about one person: what's their name and what do they do?",
      "And what's something that belongs to one of them?",
    ],
    closing: 'What a lovely family! 😍',
  },
  'a1_n04-w1': {
    name: 'Anna',
    lines: [
      "Good morning! This is the Sun Hotel. Hello! What's the name on your booking?",
      'Thank you! Do you have any questions about breakfast or the room?',
      'Anything else? Maybe about where the hotel is?',
    ],
    closing: 'Thank you for writing. See you soon!',
  },
  'a1_n05-w1': {
    name: 'Max',
    lines: [
      "Hi! I'm Max, your new language partner. When do you get up in the morning, and what do you do?",
      'Nice! And what do you do at work or at school?',
      'Cool! Now ask me a question about my day.',
    ],
    closing: 'Good question! I get up at six. Talk soon!',
  },
  'a1_n06-w1': {
    name: 'Mia',
    lines: [
      "Welcome to FitLife Gym! Let's fill in your weekly plan. Which day and time can you come?",
      'How often do you do sport? Always, sometimes, never?',
      'Last one: why are you coming to the gym?',
    ],
    closing: "Perfect, you're all set! 💪",
  },
  'a1_n07-w1': {
    name: 'Jack',
    lines: [
      "I can't wait to visit you! What's near your house?",
      'OK! How do I get from the bus stop to your house?',
      'And how will I know which house is yours?',
    ],
    closing: 'Got it, see you on Saturday! 🏠',
  },
  'a1_n08-w1': {
    name: 'Mr. Brown',
    lines: [
      'Hello! Thank you for your message about the room. Can you tell me a bit about yourself?',
      'What do you like and what do you not like? For example food, music or noise.',
      'Good. Would you like to see the room?',
    ],
    closing: "Thank you. I'll send you the address.",
  },
  'a1_n09-w1': {
    name: 'Ella',
    lines: [
      "Hey! Where are you now? How's the holiday?",
      'What are you doing right now? Who is around you, and what are they doing?',
      'Lovely! When are you coming home?',
    ],
    closing: "Can't wait to see you! 🌴",
  },
  'a1_n10-w1': {
    name: 'Mrs. Green',
    lines: [
      'Hello! I saw your note. What would you like to ask me?',
      "Why do you need my help? What can't you do this weekend?",
      'Is there something you can do for me in return?',
    ],
    closing: 'Of course, no problem! 😊',
  },
  'a1_n11-w1': {
    name: 'Noah',
    lines: [
      "Hi! I'm at the supermarket. What do we have at home, and what don't we have?",
      'OK! What do I need to buy? Give me at least three things, with how many or how much.',
      'Do you want me to check something? Ask me a question.',
    ],
    closing: 'Got it! Back in twenty minutes 🛒',
  },
  'a1_n12-w1': {
    name: 'Chloe',
    lines: [
      "You're back! How was your holiday? Where did you stay?",
      'Was the hotel good? What about the food or the weather?',
      'Great! And what about me? Ask me about my weekend.',
    ],
    closing: 'It was relaxing, thanks for asking! 😊',
  },
  'a1_n13-w1': {
    name: 'Mia',
    lines: [
      "Hi! Let's write your diary together. What did you do yesterday morning?",
      'And in the afternoon? Tell me one thing you did.',
      "What didn't you do in the evening?",
    ],
    closing: 'Great diary entry! 📖',
  },
  'a2_n14-w1': {
    name: 'Sara',
    lines: [
      'Hey! What are you going to do on Saturday?',
      'And Sunday? Do you have a fixed plan with a time?',
      'Do you want to invite me to something?',
    ],
    closing: "Sounds great, I'll check my calendar!",
  },
  'a2_n15-w1': {
    name: 'Ben',
    lines: [
      "I'm moving tomorrow and I'm so tired! Can you help me?",
      "Wow, thanks! Can you promise me something you won't do?",
      'What do you think tomorrow will be like?',
    ],
    closing: "You're the best! See you tomorrow 📦",
  },
  'a2_n16-w1': {
    name: 'Dan',
    lines: [
      "Hi! You're reviewing two phones for our shop page. How do they compare, for example in price and weight?",
      'Is one more comfortable to use? Tell me.',
      'So which phone is the best for you?',
    ],
    closing: "Thanks, we'll publish your review! 📱",
  },
  'a2_n17-w1': {
    name: 'Kim',
    lines: [
      "I'm so excited to stay at your place! Do you have any advice for me?",
      'Is there something I mustn\'t do?',
      "And is there something I don't have to do?",
    ],
    closing: 'Thanks, that helps a lot! 🏡',
  },
  'a2_n18-w1': {
    name: 'Leo',
    lines: [
      'Welcome to the Travel Club! Which two places have you been to?',
      "What's something you've never done?",
      "And is there something you've already done, or haven't done yet?",
    ],
    closing: 'Awesome profile! Welcome aboard ✈️',
  },
  'a2_n19-w1': {
    name: 'Mr. Evans',
    lines: [
      "Good afternoon, Lost Property. I'm sorry you lost something. What were you doing when you lost your bag?",
      'What happened at that moment?',
      'Can you describe the bag and give me your contact information?',
    ],
    closing: "Thank you. We'll call you if we find it.",
  },
  'a2_n20-w1': {
    name: 'Rosa',
    lines: [
      'Thanks for visiting our review page! How was the food at the restaurant?',
      'How was the service? Was it quick or slow?',
      'Would you recommend it?',
    ],
    closing: 'Thanks for your review! ⭐',
  },
  'a2_n21-w1': {
    name: 'Jess',
    lines: [
      "Party time! What's not enough for Saturday?",
      'And is there something we have too much of?',
      'Can you give someone a job? Who can do what?',
    ],
    closing: "Perfect, let's make it a great party! 🎉",
  },
  'a2_n22-w1': {
    name: 'Mr. Lee',
    lines: [
      "Hi! I'll water your plants while you're away. What should I do if it's hot?",
      'And if there is a problem, what should I do?',
      "Anything else? For example, something I shouldn't do unless…",
    ],
    closing: "Don't worry, they're in good hands 🌱",
  },
  'a2_n23-w1': {
    name: 'Emma',
    lines: [
      'You seem stressed! What happened last week? Tell me step by step.',
      'Why did that happen?',
      'And what was the result? Was there anything good too?',
    ],
    closing: "Oh no, I'm sorry! I'm glad it ended well.",
  },
  'a2_n23-w2': {
    name: 'Ms. Hart',
    lines: [
      "Hello, I'll be your new English teacher! Can you tell me a bit about yourself?",
      "Great! What did you do last week, and what's one experience you've had?",
      "And what's your plan for the next few months?",
    ],
    closing: "Wonderful! I'm looking forward to our first lesson.",
  },
};

export function findWritingChat(taskId: string): WritingChat | undefined {
  return CHATS[taskId];
}
