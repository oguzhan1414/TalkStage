import edge_tts
import asyncio
from generate_and_build_40_podcasts import parse_curriculum

async def test_ep37():
    episodes = parse_curriculum()
    ep37 = episodes[36] # 0-indexed
    print(f"Episode: {ep37['code']} -> {ep37['title']}")
    for t in ep37['turns']:
        print(f"\nTurn {t['index']} [{t['voice']}] : '{t['textEn']}'")
        comm = edge_tts.Communicate(text=t['textEn'], voice=t['voice'], rate="+0%")
        await comm.save("test_turn.mp3")
        print(f"  OK Turn {t['index']}")

asyncio.run(test_ep37())
