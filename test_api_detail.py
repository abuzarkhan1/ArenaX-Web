import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'R6FksShzIgjfrYImLpTbbzjS86Kc0hFH',
    'Referer': 'https://ff.garena.com/en/chars/'
}

resp = requests.get('https://ff.garena.com/api/char/detail?id=680', headers=headers, timeout=15)
print("Status:", resp.status_code)
print("Data:", resp.text[:500])
