from typing import Literal

from pydantic import BaseModel, Field

Size = Literal["small", "medium", "large"]
OrderStage = Literal["ordering", "sides_drinks", "dining_option", "payment", "completed"]


class BurgerOrderItem(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    quantity: int = Field(default=1, ge=1, le=10)
    is_meal: bool = False
    details: str | None = Field(default=None, max_length=160)
    price: float = Field(default=0, ge=0)


class BurgerOrderDrink(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    size: Size = "medium"
    price: float = Field(default=0, ge=0)


class BurgerOrderSide(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    size: Size = "medium"
    price: float = Field(default=0, ge=0)


class BurgerOrderState(BaseModel):
    items: list[BurgerOrderItem] = Field(default_factory=list, max_length=20)
    drinks: list[BurgerOrderDrink] = Field(default_factory=list, max_length=20)
    sides: list[BurgerOrderSide] = Field(default_factory=list, max_length=20)
    dining_option: Literal["for_here", "to_go"] | None = None
    payment_status: Literal["pending", "paid"] = "pending"
    total_usd: float = Field(default=0, ge=0)
    stage: OrderStage = "ordering"


class BurgerCoachTip(BaseModel):
    has_tip: bool = False
    title: str | None = Field(default=None, max_length=80)
    rule_tag: str | None = Field(default=None, max_length=60)
    explanation_tr: str | None = Field(default=None, max_length=320)
    suggested_fix: str | None = Field(default=None, max_length=180)
    topic_code: str | None = Field(default=None, max_length=60)


class BurgerTurnResponse(BaseModel):
    spoken_coach_tr: str | None = Field(default=None, max_length=280)
    coach_card: BurgerCoachTip = Field(default_factory=BurgerCoachTip)
    spoken_reply_en: str = Field(min_length=1, max_length=320)
    order_state: BurgerOrderState
    is_order_completed: bool = False
    completion_summary_tr: str | None = Field(default=None, max_length=300)
    receipt_order_number: int | None = Field(default=None, ge=1, le=9999)
    fluency_score: int = Field(default=85, ge=0, le=100)
    suggested_replies: list[str] = Field(default_factory=list, max_length=3)
