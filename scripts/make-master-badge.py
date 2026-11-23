"""Create a clean Master rank badge from the Heroic phoenix asset.

The shipped master.png contains a baked-in 'chinatown' watermark that cannot be
removed cleanly. Recolouring the higher-resolution Heroic emblem (red -> gold)
preserves the official badge silhouette, star cluster and lighting while
producing a crisp asset that reads correctly at 80px.
"""
from PIL import Image, ImageEnhance
import numpy as np

SRC = 'public/ranks/heroic.png'
OUT_PNG = 'public/ranks/master-recolor.png'
OUT_WEBP = 'public/ranks/master-recolor.webp'

im = Image.open(SRC).convert('RGBA')
arr = np.array(im)

rgb = Image.fromarray(arr[..., :3], 'RGB').convert('HSV')
hsv = np.array(rgb).astype(np.int16)
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]

# Select the red phoenix body (reds live near hue 0/255) but leave the gold stars.
red_region = ((h <= 20) | (h >= 235)) & (s > 55) & (v > 40)

# Map the red hue into a warm gold band while retaining tonal variation.
h_new = np.where(red_region, 26 + (h.astype(np.float32) % 22) * 0.55, h)
hsv[..., 0] = np.clip(h_new, 0, 255).astype(np.uint8)
hsv[..., 1] = np.where(red_region, np.clip(s * 1.02, 0, 255), s).astype(np.uint8)
hsv[..., 2] = np.where(red_region, np.clip(v * 1.04, 0, 255), v).astype(np.uint8)

out = Image.fromarray(hsv.astype(np.uint8), 'HSV').convert('RGB')
out = ImageEnhance.Contrast(out).enhance(1.03)
out = out.convert('RGBA')
out.putalpha(Image.fromarray(arr[..., 3], 'L'))
# Trim fully transparent padding so every badge occupies the same optical box.
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.save(OUT_PNG)
out.save(OUT_WEBP, quality=92, method=6)
print('wrote', OUT_PNG, OUT_WEBP, out.size)
