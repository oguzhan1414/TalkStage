from pydantic import BaseModel


class ReadingSceneQuestion(BaseModel):
    """B1+ sahnelerinde cümle-sıralama yerine kullanılan anlama sorusu."""

    question: str
    options: list[str]
    correct_index: int
    # Cevap sonrası gösterilen kısa açıklama (ana dilde).
    explanation_tr: str | None = None


class ReadingSceneExercise(BaseModel):
    """Sahne alıştırması. `order` (varsayılan) için bu alan hiç gönderilmez.

    type: listen (duyduğun cümleyi seç) | fill (boşluk doldur) | spell (harflerle yaz) | tf (doğru/yanlış) | question (anlama sorusu)
    prompt: fill'de boşluklu cümle, tf'de ifade, question'da soru metni.
    """

    type: str
    prompt: str | None = None
    options: list[str]
    correct_index: int
    explanation_tr: str | None = None
    # spell: yazılacak kelime (options = karışık harfler)
    answer: str | None = None


class ReadingScene(BaseModel):
    title: str
    image_key: str
    sentence_en: str
    sentence_tr: str
    # Varsa bu sahne paragraf okuma + anlama sorusu olarak işlenir; yoksa cümle sıralama.
    question: ReadingSceneQuestion | None = None
    # Yeni alıştırma modeli; varsa `question`ın yerine geçer.
    exercise: ReadingSceneExercise | None = None


class ReadingQuizQuestion(BaseModel):
    question: str
    options: list[str]
    correct_index: int


class ReadingSpeakingPrompt(BaseModel):
    yanki_ask: str
    expected_answer: str


class ReadingPassageOut(BaseModel):
    id: str
    scenario_id: str | None = None
    slug: str
    title: str
    body_text: str
    cefr_level: str | None = None
    # Konu etiketi (aile, yemek, seyahat…) — liste/kapak görselini seçer.
    theme: str | None = None
    estimated_minutes: int
    sort_order: int
    scenes: list[ReadingScene] = []
    quiz: list[ReadingQuizQuestion] = []
    speaking_prompt: ReadingSpeakingPrompt | None = None
