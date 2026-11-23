import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'B6FksShzIgjfrYImLpTsadjS86sddhFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

for lang in ["en", "en-pk", "pt", "id"]:
    try:
        resp = requests.get(f'https://ff.garena.com/api/char/list?lang={lang}&page=1&size=100', headers=headers, timeout=5)
        data = resp.json()
        print(f"Lang {lang}: count={data['data']['count']}, items={len(data['data']['data'])}", flush=True)
    except Exception as e:
        print(f"Lang {lang}: {e}", flush=True)
