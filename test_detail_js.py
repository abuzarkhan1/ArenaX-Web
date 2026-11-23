import httpx
import re

client = httpx.Client(timeout=20)
r = client.get('https://cdn.wildflamestudio.com/common/web_event/official2/dist/client/6df5c8a.js')
text = r.text
print("Length:", len(text))

# Search for /api or /char
matches = re.findall(r'[\'"](/[^\'"]*)[\'"]', text)
for m in set(matches):
    if any(k in m for k in ['char', 'detail', 'api', 'get', 'post']):
        print(m)
