export type BurgerOrderItem = {
  name: string;
  quantity: number;
  is_meal: boolean;
  details?: string | null;
  price: number;
};

export type BurgerOrderDrink = {
  name: string;
  size: string;
  price: number;
};

export type BurgerOrderSide = {
  name: string;
  size: string;
  price: number;
};

export type BurgerOrderState = {
  items: BurgerOrderItem[];
  drinks: BurgerOrderDrink[];
  sides: BurgerOrderSide[];
  dining_option?: 'for_here' | 'to_go' | null;
  payment_status: 'pending' | 'paid';
  total_usd: number;
  stage: 'ordering' | 'sides_drinks' | 'dining_option' | 'payment' | 'completed';
};

export type BurgerCoachTip = {
  has_tip: boolean;
  title?: string | null;
  rule_tag?: string | null;
  explanation_tr?: string | null;
  suggested_fix?: string | null;
  topic_code?: string | null;
};

export type CompletedReceiptData = {
  receipt: BurgerOrderState;
  summary_tr?: string | null;
  order_number: number;
  fluency_score: number;
};
