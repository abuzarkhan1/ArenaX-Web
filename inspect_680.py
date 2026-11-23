import requests
import re

r = requests.get('https://ff.garena.com/en/chars/680', headers={'User-Agent': 'Mozilla/5.0'})
with open('page_680.html', 'w', encoding='utf-8') as f:
    f.write(r.text)

clean_html = re.sub(r'<script.*?</script>', '', r.text, flags=re.DOTALL)
print("SSR HTML length:", len(clean_html))
with open('page_680_ssr.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

for word in ['Orion', 'Crimson', 'Vengeance', 'male', 'Male', 'sex', 'gender', 'age', 'birthday', 'Birthday']:
    matches = list(re.finditer(re.escape(word), clean_html, re.IGNORECASE))
    print(f'{word}: {len(matches)} occurrences')
