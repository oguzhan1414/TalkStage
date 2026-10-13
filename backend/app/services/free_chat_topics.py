"""Today's plan for Mivo's free-chat room.

Mivo opens the room with a concrete situation (so the learner never has to think of a topic) and leads it.
Each topic has the sentence that announces the plan in the learner's native language, plus Mivo's first
in-character English line. Level ranges keep the situations appropriate; the pick avoids the previous topic.
"""
import random
from dataclasses import dataclass

_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"]


@dataclass(frozen=True)
class Topic:
    id: str
    min_level: str
    max_level: str
    #: Who the OTHER person in the scene is (prompt text, English); Mivo narrates and coaches.
    role: str
    #: How the conversation should flow (prompt text, English).
    arc: str
    #: Sentence announcing the scene and who speaks, per native language; ends with ":" because the English line follows.
    intro: dict[str, str]
    #: First line of the other person in the scene, English.
    opener: str


TOPICS: list[Topic] = [
    Topic(
        "meet", "A1", "B2",
        "someone the student has just met",
        "greet → ask their name → where they are from → their age or what they do → hobbies → a friendly goodbye. "
        "Share a tiny fact about yourself each time so it feels mutual.",
        {
            "tr": "Bugün yeni biriyle tanışma pratiği yapalım. Yeni tanıştığın biri sana şöyle diyor:",
            "en": "Let's practice meeting someone new today. Someone you've just met says to you:",
            "es": "Hoy practiquemos conocer a alguien. Alguien que acabas de conocer te dice:",
            "pt": "Hoje vamos praticar conhecer alguém. Alguém que você acabou de conhecer diz para você:",
            "de": "Heute üben wir, jemanden kennenzulernen. Jemand, den du gerade getroffen hast, sagt zu dir:",
        },
        "Hi! I don't think we've met. I'm Mivo. What's your name?",
    ),
    Topic(
        "cafe", "A1", "B1",
        "a friendly barista at a café",
        "greet → take the order (drink, size, milk) → ask if they want anything to eat → the price and paying → thank them.",
        {
            "tr": "Bugün kafede sipariş vermeyi deneyelim. Barista sana şöyle diyor:",
            "en": "Let's practice ordering at a café today. The barista says to you:",
            "es": "Hoy practiquemos pedir en una cafetería. El barista te dice:",
            "pt": "Hoje vamos praticar pedir em uma cafeteria. O barista diz para você:",
            "de": "Heute üben wir die Bestellung im Café. Der Barista sagt zu dir:",
        },
        "Hi there! Welcome to the café. What can I get you today?",
    ),
    Topic(
        "directions", "A2", "B1",
        "a tourist who is lost and needs directions from the student",
        "ask where a place is → ask how far it is → repeat the directions back to check → thank them. "
        "Ask for clarification when the directions are vague, like a real tourist would.",
        {
            "tr": "Bugün adres tarifi yapalım. Yolunu kaybetmiş bir turist sana şöyle diyor:",
            "en": "Let's practice giving directions today. A lost tourist says to you:",
            "es": "Hoy practiquemos dar indicaciones. Un turista perdido te dice:",
            "pt": "Hoje vamos praticar dar direções. Um turista perdido diz para você:",
            "de": "Heute üben wir Wegbeschreibungen. Ein verirrter Tourist sagt zu dir:",
        },
        "Excuse me, could you help me? I'm looking for the train station.",
    ),
    Topic(
        "hotel", "A2", "B2",
        "the receptionist at a hotel front desk",
        "welcome → find the reservation (name, nights) → room type and breakfast → Wi-Fi and checkout time → wish them a good stay.",
        {
            "tr": "Bugün otelde check-in yapalım. Resepsiyondaki görevli sana şöyle diyor:",
            "en": "Let's practice checking in at a hotel. The front desk clerk says to you:",
            "es": "Hoy practiquemos el check-in en un hotel. La persona de la recepción te dice:",
            "pt": "Hoje vamos praticar o check-in em um hotel. A pessoa da recepção diz para você:",
            "de": "Heute üben wir das Einchecken im Hotel. Die Person an der Rezeption sagt zu dir:",
        },
        "Good evening, welcome to the Grand Hotel. Do you have a reservation?",
    ),
    Topic(
        "restaurant", "A2", "B2",
        "a waiter at a restaurant",
        "greet → drinks → recommend and take the order (starter, main, preferences or allergies) → ask how the food is → the bill.",
        {
            "tr": "Bugün restoranda sipariş verelim. Garson sana şöyle diyor:",
            "en": "Let's practice ordering at a restaurant. The waiter says to you:",
            "es": "Hoy practiquemos pedir en un restaurante. El camarero te dice:",
            "pt": "Hoje vamos praticar pedir em um restaurante. O garçom diz para você:",
            "de": "Heute üben wir die Bestellung im Restaurant. Der Kellner sagt zu dir:",
        },
        "Good evening! Are you ready to order, or do you need a few more minutes?",
    ),
    Topic(
        "shopping", "A2", "B1",
        "a shop assistant in a clothing store",
        "offer help → what they are looking for (item, size, colour) → suggest and let them try it on → price and payment.",
        {
            "tr": "Bugün kıyafet alışverişi yapalım. Mağaza çalışanı sana şöyle diyor:",
            "en": "Let's practice shopping for clothes. The shop assistant says to you:",
            "es": "Hoy practiquemos comprar ropa. La persona de la tienda te dice:",
            "pt": "Hoje vamos praticar compras de roupas. A pessoa da loja diz para você:",
            "de": "Heute üben wir den Kleiderkauf. Die Verkäuferin oder der Verkäufer sagt zu dir:",
        },
        "Hi! Can I help you find anything today?",
    ),
    Topic(
        "phone_appointment", "B1", "B2",
        "the receptionist of a clinic, on the phone",
        "answer the phone → reason for the call → offer two possible days/times → get their name and phone number → confirm and say goodbye.",
        {
            "tr": "Bugün telefonla randevu almayı deneyelim. Kliniğin resepsiyonu telefonu açıp şöyle diyor:",
            "en": "Let's practice booking an appointment by phone. The clinic's receptionist answers and says:",
            "es": "Hoy practiquemos pedir una cita por teléfono. La recepción de la clínica contesta y dice:",
            "pt": "Hoje vamos praticar marcar uma consulta por telefone. A recepção da clínica atende e diz:",
            "de": "Heute üben wir eine Terminvereinbarung am Telefon. Die Anmeldung der Klinik meldet sich und sagt:",
        },
        "Good morning, Riverside Clinic. How can I help you?",
    ),
    Topic(
        "interview", "B1", "C2",
        "a friendly but professional job interviewer",
        "invite them to introduce themselves → experience → a strength and a challenge they handled → why this job → their questions for you → thank them.",
        {
            "tr": "Bugün iş mülakatı pratiği yapalım. Mülakatı yapan kişi sana şöyle diyor:",
            "en": "Let's practice a job interview. The interviewer says to you:",
            "es": "Hoy practiquemos una entrevista de trabajo. La persona que te entrevista te dice:",
            "pt": "Hoje vamos praticar uma entrevista de emprego. A pessoa que entrevista diz para você:",
            "de": "Heute üben wir ein Vorstellungsgespräch. Die Person, die das Interview führt, sagt zu dir:",
        },
        "Thanks for coming in today. To start, could you tell me a little about yourself?",
    ),
    Topic(
        "presentation", "B1", "C2",
        "a teacher listening to the student's homework presentation",
        "let them introduce the topic → ask them to explain the main points one by one → ask a follow-up question about each → "
        "ask for an example → thank them and give one encouraging remark about the delivery.",
        {
            "tr": "Bugün bir ödev sunumu pratiği yapalım. Seni dinleyen öğretmen sana şöyle diyor:",
            "en": "Let's practice presenting your homework. The teacher listening to you says:",
            "es": "Hoy practiquemos presentar un trabajo. Quien te escucha como profesor te dice:",
            "pt": "Hoje vamos praticar a apresentação de um trabalho. O professor que te escuta diz:",
            "de": "Heute üben wir die Präsentation einer Hausaufgabe. Die Lehrkraft, die dir zuhört, sagt:",
        },
        "Okay, the floor is yours. What is your presentation about?",
    ),
    Topic(
        "weekend", "A2", "B1",
        "a friend who is curious about the student's weekend",
        "ask about the plans → what they like doing → who with → suggest an idea together → say you will hear how it went.",
        {
            "tr": "Bugün hafta sonu planlarını konuşalım. Bir arkadaşın sana şöyle diyor:",
            "en": "Let's chat about weekend plans. A friend says to you:",
            "es": "Hoy charlemos sobre los planes de fin de semana. Un amigo te dice:",
            "pt": "Hoje vamos conversar sobre os planos de fim de semana. Um amigo diz para você:",
            "de": "Heute sprechen wir über Wochenendpläne. Ein Freund sagt zu dir:",
        },
        "Hey! Do you have any plans for the weekend?",
    ),
    Topic(
        "travel", "A2", "B2",
        "a friend who is curious about the student's upcoming trip",
        "where they are going → why → what they will do → who with → tips and things to pack.",
        {
            "tr": "Bugün seyahat planlarını konuşalım. Meraklı bir arkadaşın sana şöyle diyor:",
            "en": "Let's talk about travel plans. A curious friend says to you:",
            "es": "Hoy hablemos de planes de viaje. Un amigo curioso te dice:",
            "pt": "Hoje vamos falar sobre planos de viagem. Um amigo curioso diz para você:",
            "de": "Heute sprechen wir über Reisepläne. Ein neugieriger Freund sagt zu dir:",
        },
        "I heard you're going on a trip soon! Where are you headed?",
    ),
    Topic(
        "movies_hobbies", "A1", "B2",
        "a friendly person who loves movies and hobbies",
        "ask their favourite movie or hobby → why they like it → how often → recommend something and ask for a recommendation back.",
        {
            "tr": "Bugün en sevdiğin film ve hobiler hakkında sohbet edelim. Film seven biri sana şöyle diyor:",
            "en": "Let's chat about your favourite movies and hobbies. Someone who loves movies says to you:",
            "es": "Hoy charlemos sobre tus películas y pasatiempos favoritos. Alguien que ama el cine te dice:",
            "pt": "Hoje vamos conversar sobre seus filmes e hobbies favoritos. Alguém que ama cinema diz para você:",
            "de": "Heute unterhalten wir uns über deine Lieblingsfilme und Hobbys. Jemand, der Filme liebt, sagt zu dir:",
        },
        "I love movies! What's your favourite movie?",
    ),
    Topic(
        "return_item", "B1", "C1",
        "a customer service agent in a shop",
        "ask what the problem is → ask for details (what, when, receipt) → offer options (refund, exchange, repair) → confirm what happens next.",
        {
            "tr": "Bugün alışverişte çıkan bir sorunu çözmeyi deneyelim. Müşteri hizmetleri sana şöyle diyor:",
            "en": "Let's practice solving a problem with a purchase. Customer service says to you:",
            "es": "Hoy practiquemos resolver un problema con una compra. El servicio de atención al cliente te dice:",
            "pt": "Hoje vamos praticar resolver um problema com uma compra. O atendimento ao cliente diz para você:",
            "de": "Heute üben wir, ein Problem mit einem Kauf zu lösen. Der Kundenservice sagt zu dir:",
        },
        "Hello, customer service. How can I help you today?",
    ),
    Topic(
        "daily_routine", "A1", "A2",
        "a curious new friend",
        "ask what time they wake up → breakfast → work or school → what they do after → evening and bedtime. Keep every question very short and simple.",
        {
            "tr": "Bugün günlük rutininden bahsedelim. Meraklı yeni bir arkadaşın sana şöyle diyor:",
            "en": "Let's talk about your daily routine today. A curious new friend says to you:",
            "es": "Hoy hablemos de tu rutina diaria. Un nuevo amigo curioso te dice:",
            "pt": "Hoje vamos falar sobre a sua rotina diária. Um novo amigo curioso diz para você:",
            "de": "Heute sprechen wir über deinen Tagesablauf. Ein neugieriger neuer Freund sagt zu dir:",
        },
        "Hi! Tell me about your day. What time do you wake up?",
    ),
]

_ASK = {
    "tr": "Sen ne dersin?",
    "en": "What would you say?",
    "es": "¿Qué responderías?",
    "pt": "O que você responderia?",
    "de": "Was würdest du antworten?",
}
_GREETING = {
    "tr": "Merhaba!", "en": "Hi!", "es": "¡Hola!", "pt": "Oi!", "de": "Hallo!",
}
_WELCOME_BACK = {
    "tr": "Tekrar hoş geldin{name}!",
    "en": "Welcome back{name}!",
    "es": "¡Qué bueno verte de nuevo{name}!",
    "pt": "Bem-vindo de volta{name}!",
    "de": "Schön, dass du wieder da bist{name}!",
}


def _rank(level: str | None) -> int:
    level = (level or "A1").upper()
    return _ORDER.index(level) if level in _ORDER else 0


def pick_topic(level: str | None, avoid: str | None = None) -> Topic:
    """A random topic that suits the level, not the same as the previous one."""
    rank = _rank(level)
    pool = [t for t in TOPICS if _ORDER.index(t.min_level) <= rank <= _ORDER.index(t.max_level)] or TOPICS
    fresh = [t for t in pool if t.id != avoid]
    return random.choice(fresh or pool)


def opening_text(topic: Topic, native: str, display_name: str | None = None, returning: bool = False) -> str:
    """What Mivo says when the room opens: greeting, today's scene, the other person's first English line, and the question for the student."""
    native = native if native in _GREETING else "en"
    if returning:
        first = (display_name or "").strip().split(" ")[0]
        greeting = _WELCOME_BACK[native].format(name=f", {first}" if first else "")
    else:
        greeting = _GREETING[native]
    return f'{greeting} {topic.intro[native]} "{topic.opener}" {_ASK[native]}'
