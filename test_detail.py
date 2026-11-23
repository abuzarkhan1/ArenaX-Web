import httpx
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://ff.garena.com/en/chars/'
}
client = httpx.Client(headers=headers, timeout=20)

r = client.get('https://ff.garena.com/en/chars/680')
scripts = re.findall(r'src="([^"]+\.js)"', r.text)
print("Detail scripts:")
for s in scripts:
    print(s)
