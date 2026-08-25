import urllib.request
import urllib.parse
import json

def translate_to_tr(text):
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as response:
        data = json.loads(response.read().decode('utf-8'))
        translated_text = "".join([segment[0] for segment in data[0] if segment[0]])
        return translated_text

test_sentence = "Welcome to English Bites A1! Today, Emma is ordering breakfast at the Green Bean Cafe. Listen to how she orders politely and pays for her food."
res = translate_to_tr(test_sentence)
print("Original:", test_sentence)
print("Turkish :", res)
