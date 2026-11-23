import requests
import re
import json
import subprocess

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

locales = ['en', 'pt', 'id', 'es', 'ru', 'th']
for loc in locales:
    try:
        url = f'https://ff.garena.com/{loc}/chars/'
        r = requests.get(url, headers=headers, timeout=10)
        m = re.search(r'window\.__NUXT__\s*=\s*(.*?);<\/script>', r.text, re.DOTALL)
        if m:
            code = m.group(1)
            # Run node to extract total
            p = subprocess.run(['node', '-e', f'''
                const payload = {code};
                console.log(payload.data[1].total);
            '''], capture_output=True, text=True)
            print(f"Locale {loc}: total = {p.stdout.strip()}")
        else:
            print(f"Locale {loc}: No Nuxt payload found")
    except Exception as e:
        print(f"Locale {loc}: error {e}")
