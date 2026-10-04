import asyncio
import logging
from copy import deepcopy

from openai import OpenAI

from app.core.config import settings
from app.schemas.burger_order import BurgerOrderState, BurgerTurnResponse

logger = logging.getLogger(__name__)
OPENAI_MODEL = "gpt-5.6-luna"
GROQ_BASE_URL = "https://api.groq.com/openai/v1"
GROQ_MODEL = "openai/gpt-oss-120b"

SYSTEM_PROMPT = """You are Maya, a friendly American fast-food cashier and a light-touch English coach for a Turkish learner.

This is a state-driven conversation, never a fixed script. React to exactly what the customer said. They may give details in any order, change/remove an item, ask a question, or be unclear. Never invent a missing item, size, dining choice, or payment.

MENU: Classic Cheeseburger $6/$9.50 combo; Double Cheeseburger $8/$11.50 combo; Bacon Cheeseburger $8.50/$12 combo; Crispy Chicken Burger $7.50/$11 combo; Veggie Burger $7/$10.50 combo; French Fries small $2.50, medium $3, large $3.75; Onion Rings $3.50; Coke, Diet Coke, Coke Zero, Sprite, Fanta, Iced Tea, Bottled Water $2. Sauces are free. A combo includes its burger, medium fries and medium drink.

Return the COMPLETE resulting state, not a patch. Preserve prior details; do not duplicate anything unless explicitly requested. Ask ONE short natural question about the most relevant missing detail. If unclear, clarify and leave state unchanged. Get a main item, resolve details, get dining option, quote total, and accept an explicit cash/card answer. Never infer payment. Complete only after explicit payment choice. Suggestions must answer Maya's exact current question.

Evaluate the actual transcript and give at most one useful correction (articles, countable plural, politeness, meaning-changing wording). “Menu” for combo is understandable: label it vocabulary/naturalness, not a grammar error. Ignore tiny style preferences. Speak Turkish coaching only for clear/meaning-changing errors; minor tips stay in coach_card. Maya replies in simple natural American English, 1-2 sentences. Do not claim a price or receipt number; the server supplies those. Return exactly the response schema."""

PRICES = {
    "classic cheeseburger": (6.0, 9.5), "double cheeseburger": (8.0, 11.5),
    "bacon cheeseburger": (8.5, 12.0), "crispy chicken burger": (7.5, 11.0),
    "veggie burger": (7.0, 10.5),
}
DRINKS = {"coke", "diet coke", "coke zero", "sprite", "fanta", "iced tea", "bottled water", "water"}


def _menu_price(name: str, meal: bool) -> float:
    value = name.casefold().strip()
    for menu_name, prices in PRICES.items():
        if menu_name in value or value in menu_name:
            return prices[1 if meal else 0]
    return 0


def _normalize(order: BurgerOrderState) -> BurgerOrderState:
    result = order.model_copy(deep=True)
    for item in result.items:
        item.price = _menu_price(item.name, item.is_meal)
    for side in result.sides:
        name = side.name.casefold()
        side.price = ({"small": 2.5, "medium": 3.0, "large": 3.75}[side.size]
                      if "fri" in name else 3.5 if "onion" in name else 0)
    for drink in result.drinks:
        drink.price = 2.0 if drink.name.casefold().strip() in DRINKS else 0
    combo_drinks = sum(item.quantity for item in result.items if item.is_meal)
    for drink in result.drinks[:combo_drinks]:
        drink.price = 0
    result.total_usd = round(
        sum(x.price * x.quantity for x in result.items)
        + sum(x.price for x in result.sides)
        + sum(x.price for x in result.drinks), 2)
    if result.payment_status == "paid":
        result.stage = "completed"
    return result


def _client() -> tuple[OpenAI, str, bool]:
    if settings.openai_api_key:
        return OpenAI(api_key=settings.openai_api_key, timeout=25, max_retries=1), OPENAI_MODEL, True
    if settings.groq_api_key:
        return OpenAI(api_key=settings.groq_api_key, base_url=GROQ_BASE_URL, timeout=25, max_retries=1), GROQ_MODEL, False
    raise RuntimeError("Neither OPENAI_API_KEY nor GROQ_API_KEY is configured")


def _generate(current: BurgerOrderState, history: list[dict], transcript: str) -> BurgerTurnResponse:
    client, model, is_openai = _client()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}, *deepcopy(history[-10:]), {
        "role": "user", "content": f"CURRENT ORDER:\n{current.model_dump_json(indent=2)}\n\nCUSTOMER SAID:\n{transcript}",
    }]
    if is_openai:
        completion = client.beta.chat.completions.parse(model=model, messages=messages, response_format=BurgerTurnResponse)
        result = completion.choices[0].message.parsed
        if result is None:
            raise ValueError("No parsed burger response")
    else:
        completion = client.chat.completions.create(
            model=model, messages=messages, response_format={"type": "json_object"}, max_completion_tokens=1800)
        result = BurgerTurnResponse.model_validate_json(completion.choices[0].message.content or "{}")
    result.order_state = _normalize(result.order_state)
    result.is_order_completed = result.order_state.payment_status == "paid"
    result.receipt_order_number = 42 if result.is_order_completed else None
    return result


async def generate_burger_turn(current_order: BurgerOrderState, history: list[dict], user_transcript: str) -> BurgerTurnResponse:
    try:
        return await asyncio.to_thread(_generate, current_order, history, user_transcript)
    except Exception:
        logger.exception("Burger turn generation failed")
        return BurgerTurnResponse(
            spoken_reply_en="Sorry, I didn't catch that clearly. Could you say it one more time?",
            order_state=_normalize(current_order), fluency_score=0,
            suggested_replies=["Could I try that again?", "I'd like a cheeseburger, please."],
        )
