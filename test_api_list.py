import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'B6FksShzIgjfrYImLpTsadjS86sddhFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

resp = requests.get('https://ff.garena.com/api/char/list?lang=en&page=1&size=100', headers=headers, timeout=15)
data = resp.json()
print("Status:", resp.status_code)
print("Count:", data['data']['count'])
print("Items returned:", len(data['data']['data']))
char_list = data['data']['data']
print("IDs:", [c['id'] for c in char_list])
