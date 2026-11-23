import requests

url = "https://cdn.wildflamestudio.com/common/web_event/chars/en/680.html"
r = requests.get(url)
print("Status:", r.status_code)
print("Length:", len(r.text))
print("Content preview:\n", r.text[:1000])
