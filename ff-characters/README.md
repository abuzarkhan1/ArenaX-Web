# Free Fire Characters Dataset

Scraped from the official Garena Free Fire website on 2026-11-13 23:25:19.

## Step 1 Analysis Findings

### Data Source
- The site uses a **Nuxt.js SSR framework** with a `window.__NUXT__` embedded state payload.
- All character data (text + image URLs) is available in the `__NUXT__` payload — no separate API endpoint exists.
- The list page (`/en/chars/`) only shows the **12 newest characters**, but each detail page includes `pre_char` and `next_char` links that form a doubly-linked list of all characters.

### Discovery Method
- Started with 12 IDs from the list page, then traversed the prev/next chain to discover all **65 characters**.
- IDs are non-sequential (range: 1 to 794).

### robots.txt
- No `robots.txt` exists (returns 404).

### Asset Types Per Character
| Asset | Field | Description |
|---|---|---|
| Head Icon | `head_icon` | Small avatar/head icon |
| Skill Icon | `skill_icon` | Ability icon |
| Skill Artwork | `skill_pic` | Ability illustration |
| Cover Image | `cover_img` | Character thumbnail/cover |
| PC Background | `pc_bg` | Detail page background (PC) |
| Home PC Background | `home_pc_bg` | Homepage background (PC) |
| Mobile Background | `mobile_bg` | Detail page background (mobile) |
| Character Artwork (PC) | `character_pc` | Full character artwork (PC) |
| Character Artwork (Mobile) | `character_mobile` | Full character artwork (mobile) |
| Awaken variants | `awaken_*` | Only present on 6 characters |

### Locales
Available locales: `en`, `pt`, `es`, `id`, `th`, `ru`, `vn`, `zh`, `en-pk`, `ME_en`.
Character lists appear consistent across locales (same IDs); only text translations differ.

## Statistics

- **Total characters**: 65
- **Total assets downloaded**: 620
- **Total asset size**: 101.1 MB

## How to Run

```bash
pip install requests beautifulsoup4
python scraper.py
```

Output is written to `ff-characters/`.

## Output Files

- `characters.json` — Full structured data (array of character objects)
- `characters.csv` — Flat CSV with one row per character
- `assets/{id}-{slug}/` — Downloaded images per character
- `errors.log` — Any errors encountered during scraping

## Schema

Each character object in `characters.json`:

```json
{
  "id": 680,
  "name": "Orion",
  "slug": "orion",
  "quote": "From now on, I will do what ever I want!",
  "ability_name": "Crimson Crush",
  "ability_description": "Increases max. EP...",
  "gender": "Male",
  "age": 22,
  "birthday": "August 13",
  "biography": "Orion, a vengeful beast...",
  "source_url": "https://ff.garena.com/en/chars/680",
  "assets": [
    {
      "type": "head-icon",
      "original_url": "https://cdn.wildflamestudio.com/...",
      "local_path": "assets/680-orion/head-icon.png",
      "width": 200,
      "height": 200,
      "file_size": 45231,
      "sha256": "abc123...",
      "deduplicated": false
    }
  ],
  "scraped_at": "2024-01-01T00:00:00+00:00"
}
```
