import requests
import json
from datetime import datetime

headers_list = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'B6FksShzIgjfrYImLpTsadjS86sddhFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

headers_detail = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'R6FksShzIgjfrYImLpTbbzjS86Kc0hFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

# Fetch character list
r = requests.get('https://ff.garena.com/api/char/list?lang=en&page=1&size=100', headers=headers_list, timeout=15)
char_list = r.json()['data']['data']
print(f"Total characters in list: {len(char_list)}")

with open('all_chars_list.json', 'w', encoding='utf-8') as f:
    json.dump(char_list, f, indent=2)

print("Saved all_chars_list.json")
