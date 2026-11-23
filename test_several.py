import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'X-Requested-With': 'R6FksShzIgjfrYImLpTbbzjS86Kc0hFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

test_ids = [794, 1, 750, 150, 148]
for cid in test_ids:
    url = f'https://ff.garena.com/api/char/detail?id={cid}'
    try:
        r = requests.get(url, headers=headers, timeout=10)
        data = r.json()
        cd = data.get('data', {}).get('data', {})
        print(f"ID {cid}: name='{cd.get('name')}', sex={cd.get('sex')}, age={cd.get('age')}, bday={cd.get('birthday')}, awaken={cd.get('awaken')}")
    except Exception as e:
        print(f"ID {cid} failed: {e}")
