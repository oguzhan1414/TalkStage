"""Rough per-session / monthly API cost simulator (STT + LLM + TTS), to sanity-check
unit economics against the 199 TL (~$9.99) Pro price before shipping.

The per-unit rates below are PLACEHOLDERS — replace them with the actual current
pricing from each vendor's pricing page before trusting any output of this script.

Usage:
  python scripts/simulate_costs.py
  python scripts/simulate_costs.py --turns-per-session 10 --sessions-per-day 3 --pro-users 500
"""

import argparse

# --- PLACEHOLDER rates, USD — verify against vendor pricing pages before relying on this ---
STT_COST_PER_MINUTE = 0.0043  # Deepgram Nova-2 pay-as-you-go, approx
LLM_INPUT_COST_PER_1K_TOKENS = 0.00015  # gpt-4o-mini input
LLM_OUTPUT_COST_PER_1K_TOKENS = 0.0006  # gpt-4o-mini output
TTS_COST_PER_1K_CHARS = 0.065  # Cartesia Sonic, approx

# --- Assumptions about a single conversational turn ---
AVG_USER_SPEECH_SECONDS = 12
AVG_SYSTEM_PROMPT_TOKENS = 700  # base prompt + RAG-retrieved chunks
AVG_HISTORY_TOKENS_PER_TURN = 60  # grows with conversation, this is a flat approximation
AVG_USER_TRANSCRIPT_TOKENS = 40
AVG_LLM_OUTPUT_TOKENS = 90
AVG_TTS_OUTPUT_CHARS = 220


def cost_per_turn() -> float:
    stt = (AVG_USER_SPEECH_SECONDS / 60) * STT_COST_PER_MINUTE
    input_tokens = AVG_SYSTEM_PROMPT_TOKENS + AVG_HISTORY_TOKENS_PER_TURN + AVG_USER_TRANSCRIPT_TOKENS
    llm = (input_tokens / 1000) * LLM_INPUT_COST_PER_1K_TOKENS
    llm += (AVG_LLM_OUTPUT_TOKENS / 1000) * LLM_OUTPUT_COST_PER_1K_TOKENS
    tts = (AVG_TTS_OUTPUT_CHARS / 1000) * TTS_COST_PER_1K_CHARS
    return stt + llm + tts


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--turns-per-session", type=int, default=8)
    parser.add_argument("--sessions-per-day", type=float, default=1.0)
    parser.add_argument("--pro-users", type=int, default=100)
    parser.add_argument("--pro-price-usd", type=float, default=9.99)
    args = parser.parse_args()

    per_turn = cost_per_turn()
    per_session = per_turn * args.turns_per_session
    per_user_per_day = per_session * args.sessions_per_day
    per_user_per_month = per_user_per_day * 30
    monthly_cost_all_pro_users = per_user_per_month * args.pro_users
    monthly_revenue = args.pro_price_usd * args.pro_users
    margin = monthly_revenue - monthly_cost_all_pro_users

    print("--- PLACEHOLDER rates — verify against real vendor pricing before trusting this ---")
    print(f"Cost per turn:                 ${per_turn:.4f}")
    print(f"Cost per session ({args.turns_per_session} turns):    ${per_session:.4f}")
    print(f"Cost per Pro user / day:       ${per_user_per_day:.4f}")
    print(f"Cost per Pro user / month:     ${per_user_per_month:.2f}")
    print()
    print(f"{args.pro_users} Pro users, ${args.pro_price_usd}/mo each:")
    print(f"  Monthly API cost:            ${monthly_cost_all_pro_users:,.2f}")
    print(f"  Monthly revenue:             ${monthly_revenue:,.2f}")
    print(f"  Monthly gross margin:        ${margin:,.2f} ({margin / monthly_revenue:.1%})")


if __name__ == "__main__":
    main()
