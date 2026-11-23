import httpx
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://ff.garena.com/en/chars/'
}
client = httpx.Client(headers=headers, follow_redirects=True, timeout=15)

r = client.get('https://ff.garena.com/en/chars/')
scripts = re.findall(r'src="([^"]+\.js)"', r.text)

for s in scripts:
    if 'spine' in s:
        continue
    resp = client.get(s)
    matches = re.findall(r'[\'\"](/[^\'\"]*char[^\'\"]*)[\'\"]', resp.text)
    api_matches = re.findall(r'[\'\"](/api[^\'\"]*)[\'\"]', resp.text)
    if matches or api_matches:
        print(f"File: {s}")
        if matches:
            print("  Char matches:", set(matches))
        if api_matches:
            print("  API matches:", set(api_matches))
