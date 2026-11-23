import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
r = requests.get('https://ff.garena.com/en/chars/680', headers=headers)

# Parse with regex or check if bs4 is installed
print("HTML length:", len(r.text))
with open('page_680.html', 'w', encoding='utf-8') as f:
    f.write(r.text)

print("Saved page_680.html")
