import asyncio
import json
import os
import subprocess
import tempfile
import edge_tts
from generate_b1_podcasts import B1_PODCAST_EPISODES

async def measure_segment(text: str, voice: str, rate: str, seg_file: str):
    max_retries = 4
    for attempt in range(max_retries):
        try:
            comm = edge_tts.Communicate(text=text, voice=voice, rate=rate)
            await comm.save(seg_file)
            return
        except Exception as e:
            if attempt < max_retries - 1:
                await asyncio.sleep(2 * (attempt + 1))
            else:
                raise e

async def measure_b1():
    results = {}
    with tempfile.TemporaryDirectory() as temp_dir:
        for ep in B1_PODCAST_EPISODES:
            ep_id = ep['id']
            results[ep_id] = []
            curr_time = 0.0
            print(f'Measuring {ep_id}...')
            for idx, (voice, rate, text) in enumerate(ep['dialogue']):
                seg_file = os.path.join(temp_dir, f'{ep_id}_{idx:03d}.mp3')
                await measure_segment(text, voice, rate, seg_file)
                cmd = ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', seg_file]
                res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True)
                dur = float(json.loads(res.stdout)['format']['duration'])
                results[ep_id].append({
                    'index': idx + 1,
                    'voice': voice,
                    'text': text,
                    'startSec': round(curr_time, 1),
                    'duration': round(dur, 2)
                })
                curr_time += dur
                await asyncio.sleep(0.08)
            results[ep_id + '_total'] = round(curr_time, 1)
            print(f'✅ Total for {ep_id}: {curr_time:.1f}s')

    with open(r'd:/ingilizce/mobile/src/data/measured_b1_dialogue.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print('🎉 Saved to measured_b1_dialogue.json successfully!')

if __name__ == '__main__':
    asyncio.run(measure_b1())
