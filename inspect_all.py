import requests
import json
import time

headers_detail = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'R6FksShzIgjfrYImLpTbbzjS86Kc0hFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

with open('all_chars_list.json', 'r', encoding='utf-8') as f:
    chars = json.load(f)

print(f"Loaded {len(chars)} characters.")
all_details = []
image_keys = set()

for i, c in enumerate(chars):
    cid = c['id']
    url = f"https://ff.garena.com/api/char/detail?id={cid}"
    try:
        r = requests.get(url, headers=headers_detail, timeout=10)
        data = r.json()
        detail = data.get('data', {}).get('data', {})
        all_details.append(detail)
        for k, v in detail.items():
            if isinstance(v, str) and ('.png' in v.lower() or '.jpg' in v.lower() or '.webp' in v.lower() or 'cdn.' in v.lower()):
                image_keys.add(k)
        print(f"[{i+1}/{len(chars)}] ID {cid}: {detail.get('name')} (sex={detail.get('sex')}, age={detail.get('age')})")
    except Exception as e:
        print(f"[{i+1}/{len(chars)}] ID {cid} ERROR: {e}")
    time.sleep(0.3)

with open('all_details.json', 'w', encoding='utf-8') as f:
    json.dump(all_details, f, indent=2)

print("\nImage keys discovered in details:")
print(sorted(list(image_keys)))
