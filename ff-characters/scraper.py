#!/usr/bin/env python3
"""
Free Fire Character Scraper
============================
Scrapes all characters from the official Garena Free Fire website,
collecting text data and image assets into a structured dataset.

Usage:
    python scraper.py

Output:
    ff-characters/
    ├── characters.json
    ├── characters.csv
    ├── assets/{id}-{slug}/...
    ├── errors.log
    └── README.md
"""

import csv
import hashlib
import json
import logging
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

# ─── Configuration ───────────────────────────────────────────────────────────

BASE_URL = "https://ff.garena.com"
LIST_URL = f"{BASE_URL}/en/chars/"
DETAIL_URL_TEMPLATE = f"{BASE_URL}/en/chars/{{id}}"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}
REQUEST_DELAY = 1.5  # seconds between requests
MAX_RETRIES = 3
RETRY_BACKOFF = 2  # multiplier for exponential backoff

# Output paths
SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR  # scraper.py lives inside ff-characters/ already
ASSETS_DIR = OUTPUT_DIR / "assets"
CHARACTERS_JSON = OUTPUT_DIR / "characters.json"
CHARACTERS_CSV = OUTPUT_DIR / "characters.csv"
ERRORS_LOG = OUTPUT_DIR / "errors.log"
README_FILE = OUTPUT_DIR / "README.md"

# Asset field mappings: field_name -> (local_filename, description)
ASSET_FIELDS = {
    "head_icon": ("head-icon", "Character head/avatar icon"),
    "skill_icon": ("skill-icon", "Ability/skill icon"),
    "skill_pic": ("skill-artwork", "Ability artwork/illustration"),
    "cover_img": ("cover", "Cover/thumbnail image"),
    "pc_bg": ("pc-background", "PC background image"),
    "home_pc_bg": ("home-pc-background", "Home page PC background"),
    "mobile_bg": ("mobile-background", "Mobile background image"),
    "character_pc": ("character-artwork-pc", "Full character artwork (PC)"),
    "character_mobile": ("character-artwork-mobile", "Full character artwork (mobile)"),
    "awaken_skill_icon": ("awaken-skill-icon", "Awakened ability icon"),
    "awaken_pc_bg": ("awaken-pc-background", "Awakened PC background"),
    "awaken_mobile_bg": ("awaken-mobile-background", "Awakened mobile background"),
    "awaken_home_pc_bg": ("awaken-home-pc-background", "Awakened home PC background"),
    "awaken_character_pc": ("awaken-character-artwork-pc", "Awakened character artwork (PC)"),
    "awaken_character_mobile": ("awaken-character-artwork-mobile", "Awakened character artwork (mobile)"),
}

# ─── Logging Setup ───────────────────────────────────────────────────────────

os.makedirs(OUTPUT_DIR, exist_ok=True)

error_logger = logging.getLogger("errors")
error_logger.setLevel(logging.ERROR)
fh = logging.FileHandler(ERRORS_LOG, mode="w", encoding="utf-8")
fh.setFormatter(logging.Formatter("%(asctime)s | %(levelname)s | %(message)s"))
error_logger.addHandler(fh)

# Console logging
console_logger = logging.getLogger("console")
console_logger.setLevel(logging.INFO)
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter("%(asctime)s | %(message)s"))
console_logger.addHandler(ch)

log = console_logger.info
log_error = error_logger.error


# ─── HTTP Helpers ────────────────────────────────────────────────────────────

session = requests.Session()
session.headers.update(HEADERS)


def fetch(url: str, stream: bool = False) -> requests.Response | None:
    """Fetch a URL with retries and backoff."""
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            r = session.get(url, timeout=30, stream=stream)
            if r.status_code in (429, 500, 502, 503, 504):
                wait = REQUEST_DELAY * (RETRY_BACKOFF ** attempt)
                log(f"  HTTP {r.status_code} for {url}, retry {attempt}/{MAX_RETRIES} in {wait:.1f}s")
                time.sleep(wait)
                continue
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            if attempt < MAX_RETRIES:
                wait = REQUEST_DELAY * (RETRY_BACKOFF ** attempt)
                log(f"  Error fetching {url}: {e}, retry {attempt}/{MAX_RETRIES} in {wait:.1f}s")
                time.sleep(wait)
            else:
                log_error(f"FETCH FAILED | {url} | {e}")
                return None
    log_error(f"FETCH FAILED after {MAX_RETRIES} retries | {url}")
    return None


def extract_nuxt_data(html: str) -> dict | None:
    """Extract and evaluate the window.__NUXT__ JS payload from HTML."""
    nuxt_match = re.search(r"window\.__NUXT__\s*=\s*", html)
    if not nuxt_match:
        return None

    start = nuxt_match.end()
    end = html.find("</script>", start)
    if end == -1:
        return None
    nuxt_raw = html[start:end].strip().rstrip(";")

    # Use Node.js to evaluate the JS function and get JSON
    mjs_path = str(SCRIPT_DIR / "_tmp_nuxt_eval.mjs")
    json_path = str(SCRIPT_DIR / "_tmp_nuxt_result.json")

    js_code = (
        'import { writeFileSync } from "fs";\n'
        f"const data = {nuxt_raw};\n"
        f'writeFileSync("{json_path.replace(chr(92), "/")}", JSON.stringify(data), "utf8");\n'
    )

    with open(mjs_path, "w", encoding="utf-8") as f:
        f.write(js_code)

    try:
        result = subprocess.run(
            ["node", mjs_path],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            log_error(f"Node.js eval failed: {result.stderr[:500]}")
            return None

        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        log_error(f"NUXT extraction error: {e}")
        return None
    finally:
        for p in (mjs_path, json_path):
            if os.path.exists(p):
                os.remove(p)


# ─── Discovery ───────────────────────────────────────────────────────────────

def discover_all_character_ids() -> set[int]:
    """Discover all character IDs by:
    1. Parsing the list page's __NUXT__ payload
    2. Traversing prev/next links on detail pages
    """
    log("=== PHASE 1: Discovering character IDs ===")

    # Step 1: Get IDs from list page
    log("Fetching list page...")
    r = fetch(LIST_URL)
    if not r:
        log_error("Failed to fetch list page")
        return set()

    data = extract_nuxt_data(r.text)
    if not data:
        log_error("Failed to extract NUXT data from list page")
        return set()

    list_chars = []
    for d in data.get("data", []):
        if isinstance(d, dict) and "list" in d:
            list_chars = d["list"]
            break

    known_ids = {c["id"] for c in list_chars}
    log(f"Found {len(known_ids)} IDs on list page")

    # Step 2: Traverse prev/next links
    all_ids = set(known_ids)
    to_visit = list(known_ids)
    visited = set()
    char_details = {}

    while to_visit:
        char_id = to_visit.pop(0)
        if char_id in visited:
            continue
        visited.add(char_id)

        log(f"Visiting {char_id}... ({len(visited)}/{len(all_ids)} visited, {len(to_visit)} queued)")

        detail = fetch_char_detail(char_id)
        if detail is None:
            log_error(f"Failed to get detail for char ID {char_id}")
            continue

        log(f"  Found: {detail.get('name', '???')}")
        char_details[char_id] = detail

        # Discover prev/next
        for key in ("pre_char", "next_char"):
            linked = detail.get(key)
            if linked and isinstance(linked, dict) and "id" in linked:
                new_id = linked["id"]
                if new_id not in all_ids:
                    all_ids.add(new_id)
                    to_visit.append(new_id)
                    log(f"  Discovered {key}: {new_id} ({linked.get('name', '?')})")

        time.sleep(REQUEST_DELAY)

    log(f"Discovery complete: {len(all_ids)} unique IDs, {len(char_details)} fetched")
    return char_details


def fetch_char_detail(char_id: int) -> dict | None:
    """Fetch and parse a single character detail page."""
    url = DETAIL_URL_TEMPLATE.format(id=char_id)
    r = fetch(url)
    if not r:
        return None

    data = extract_nuxt_data(r.text)
    if not data:
        log_error(f"No NUXT data in detail page for {char_id}")
        return None

    for d in data.get("data", []):
        if isinstance(d, dict) and "charDetail" in d:
            return d["charDetail"]

    log_error(f"No charDetail in NUXT data for {char_id}")
    return None


# ─── Asset Downloading ──────────────────────────────────────────────────────

def slugify(name: str) -> str:
    """Convert a name to a lowercase, hyphenated slug."""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug or "unknown"


def get_file_extension(url: str, content_type: str = "") -> str:
    """Determine file extension from URL or content-type."""
    # Try URL path first
    path = urlparse(url).path
    ext = os.path.splitext(path)[1].lower()
    if ext in (".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"):
        return ext

    # Try content-type
    ct = content_type.lower()
    if "png" in ct:
        return ".png"
    elif "jpeg" in ct or "jpg" in ct:
        return ".jpg"
    elif "webp" in ct:
        return ".webp"
    elif "gif" in ct:
        return ".gif"

    return ".png"  # default


def download_asset(
    url: str, char_dir: Path, asset_name: str, hash_registry: dict
) -> dict | None:
    """Download a single asset. Returns asset metadata or None on failure."""
    if not url or not url.startswith("http"):
        return None

    r = fetch(url, stream=True)
    if not r:
        return None

    content = r.content
    content_hash = hashlib.sha256(content).hexdigest()

    # Deduplicate by hash
    if content_hash in hash_registry:
        existing = hash_registry[content_hash]
        log(f"    Dedup: {asset_name} == {existing['local_path']}")
        return {
            "type": asset_name,
            "original_url": url,
            "local_path": existing["local_path"],
            "width": existing.get("width"),
            "height": existing.get("height"),
            "file_size": existing["file_size"],
            "sha256": content_hash,
            "deduplicated": True,
        }

    ext = get_file_extension(url, r.headers.get("content-type", ""))
    filename = f"{asset_name}{ext}"
    filepath = char_dir / filename

    # Skip if already downloaded
    if filepath.exists() and filepath.stat().st_size == len(content):
        log(f"    Skip (exists): {filename}")
    else:
        os.makedirs(char_dir, exist_ok=True)
        with open(filepath, "wb") as f:
            f.write(content)

    # Try to get image dimensions
    width, height = None, None
    try:
        from struct import unpack

        if ext == ".png" and len(content) >= 24:
            if content[:8] == b"\x89PNG\r\n\x1a\n":
                width = int.from_bytes(content[16:20], "big")
                height = int.from_bytes(content[20:24], "big")
        elif ext in (".jpg", ".jpeg"):
            # Basic JPEG dimension parsing
            idx = 2
            while idx < len(content) - 8:
                if content[idx] != 0xFF:
                    break
                marker = content[idx + 1]
                if marker in (0xC0, 0xC1, 0xC2):
                    height = int.from_bytes(content[idx + 5 : idx + 7], "big")
                    width = int.from_bytes(content[idx + 7 : idx + 9], "big")
                    break
                seg_len = int.from_bytes(content[idx + 2 : idx + 4], "big")
                idx += 2 + seg_len
    except Exception:
        pass

    file_size = len(content)
    rel_path = str(filepath.relative_to(OUTPUT_DIR)).replace("\\", "/")

    asset_info = {
        "type": asset_name,
        "original_url": url,
        "local_path": rel_path,
        "width": width,
        "height": height,
        "file_size": file_size,
        "sha256": content_hash,
        "deduplicated": False,
    }

    hash_registry[content_hash] = asset_info
    return asset_info


# ─── Character Processing ───────────────────────────────────────────────────

def parse_gender(sex_value) -> str | None:
    """Convert numeric sex field to string."""
    mapping = {1: "Male", 2: "Female", 0: None}
    return mapping.get(sex_value)


def parse_birthday(timestamp) -> str | None:
    """Convert Unix timestamp to date string."""
    if not timestamp:
        return None
    try:
        dt = datetime.fromtimestamp(int(timestamp), tz=timezone.utc)
        return dt.strftime("%B %d")  # e.g. "August 13"
    except (ValueError, TypeError, OSError):
        return None


def strip_html(text: str) -> str | None:
    """Remove HTML tags from text."""
    if not text:
        return None
    soup = BeautifulSoup(text, "html.parser")
    clean = soup.get_text(separator=" ", strip=True)
    return clean if clean else None


def process_character(raw: dict, hash_registry: dict) -> dict:
    """Process a single character's raw data into the output format."""
    char_id = raw["id"]
    name = raw.get("name", "")
    slug = slugify(name)

    log(f"Processing {char_id}: {name}")

    # Text fields
    quote = raw.get("abstract_detail") or raw.get("abstract")
    biography = strip_html(raw.get("introduction"))
    ability_desc = raw.get("ability_introduction")

    character = {
        "id": char_id,
        "name": name,
        "slug": slug,
        "quote": quote,
        "ability_name": raw.get("ability") or None,
        "ability_description": ability_desc or None,
        "gender": parse_gender(raw.get("sex")),
        "age": raw.get("age") if raw.get("age") else None,
        "birthday": parse_birthday(raw.get("birthday")),
        "biography": biography,
        "source_url": DETAIL_URL_TEMPLATE.format(id=char_id),
        "assets": [],
        "scraped_at": datetime.now(timezone.utc).isoformat(),
        # Extra fields from the site
        "tagline": raw.get("abstract") or None,
        "nickname": raw.get("nickname") or None,
        "en_name": raw.get("en_name") or None,
        "is_new": bool(raw.get("is_new")),
        "has_awaken": bool(raw.get("awaken")),
        "awaken_name": raw.get("awaken_name") or None,
        "awaken_ability": raw.get("awaken_ability") or None,
        "awaken_ability_description": raw.get("awaken_ability_introduction") or None,
        "story_link": raw.get("story_link") or None,
        "category": raw.get("category", {}).get("name") or None,
    }

    # Download assets
    char_dir = ASSETS_DIR / f"{char_id}-{slug}"

    for field_name, (local_name, desc) in ASSET_FIELDS.items():
        url = raw.get(field_name, "")
        if url and url.startswith("http"):
            asset = download_asset(url, char_dir, local_name, hash_registry)
            if asset:
                character["assets"].append(asset)
            else:
                log_error(f"Failed to download {field_name} for {name} (id={char_id}): {url}")
            time.sleep(0.3)  # Small delay between asset downloads

    return character


# ─── Output Generation ──────────────────────────────────────────────────────

def write_json(characters: list[dict]):
    """Write characters.json."""
    with open(CHARACTERS_JSON, "w", encoding="utf-8") as f:
        json.dump(characters, f, indent=2, ensure_ascii=False)
    log(f"Wrote {CHARACTERS_JSON}")


def write_csv(characters: list[dict]):
    """Write characters.csv (flat version, assets as JSON array)."""
    fieldnames = [
        "id", "name", "slug", "quote", "ability_name", "ability_description",
        "gender", "age", "birthday", "biography", "source_url",
        "tagline", "nickname", "en_name", "is_new", "has_awaken",
        "awaken_name", "awaken_ability", "awaken_ability_description",
        "story_link", "category", "asset_count", "total_asset_size_bytes",
        "scraped_at",
    ]

    with open(CHARACTERS_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for char in characters:
            row = {k: char.get(k) for k in fieldnames}
            row["asset_count"] = len(char.get("assets", []))
            row["total_asset_size_bytes"] = sum(
                a.get("file_size", 0) for a in char.get("assets", [])
            )
            writer.writerow(row)
    log(f"Wrote {CHARACTERS_CSV}")


def write_readme(characters: list[dict], total_assets: int, total_size: int):
    """Write README.md."""
    content = f"""# Free Fire Characters Dataset

Scraped from the official Garena Free Fire website on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}.

## Step 1 Analysis Findings

### Data Source
- The site uses a **Nuxt.js SSR framework** with a `window.__NUXT__` embedded state payload.
- All character data (text + image URLs) is available in the `__NUXT__` payload — no separate API endpoint exists.
- The list page (`/en/chars/`) only shows the **12 newest characters**, but each detail page includes `pre_char` and `next_char` links that form a doubly-linked list of all characters.

### Discovery Method
- Started with 12 IDs from the list page, then traversed the prev/next chain to discover all **{len(characters)} characters**.
- IDs are non-sequential (range: {min(c['id'] for c in characters)} to {max(c['id'] for c in characters)}).

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

- **Total characters**: {len(characters)}
- **Total assets downloaded**: {total_assets}
- **Total asset size**: {total_size / (1024*1024):.1f} MB

## How to Run

```bash
pip install requests beautifulsoup4
python scraper.py
```

Output is written to `ff-characters/`.

## Output Files

- `characters.json` — Full structured data (array of character objects)
- `characters.csv` — Flat CSV with one row per character
- `assets/{{id}}-{{slug}}/` — Downloaded images per character
- `errors.log` — Any errors encountered during scraping

## Schema

Each character object in `characters.json`:

```json
{{
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
    {{
      "type": "head-icon",
      "original_url": "https://cdn.wildflamestudio.com/...",
      "local_path": "assets/680-orion/head-icon.png",
      "width": 200,
      "height": 200,
      "file_size": 45231,
      "sha256": "abc123...",
      "deduplicated": false
    }}
  ],
  "scraped_at": "2024-01-01T00:00:00+00:00"
}}
```
"""
    with open(README_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    log(f"Wrote {README_FILE}")


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    start_time = time.time()
    log("=" * 60)
    log("Free Fire Character Scraper")
    log("=" * 60)

    # Check for pre-existing raw data (resumability)
    raw_data_path = SCRIPT_DIR / "ff_all_chars_raw.json"
    if raw_data_path.exists():
        log(f"Loading pre-discovered data from {raw_data_path}")
        with open(raw_data_path, "r", encoding="utf-8") as f:
            raw_chars = json.load(f)
        # Convert string keys to int
        raw_chars = {int(k): v for k, v in raw_chars.items()}
        log(f"Loaded {len(raw_chars)} characters from cache")
    else:
        log("No cached data found, running full discovery...")
        raw_chars = discover_all_character_ids()

    if not raw_chars:
        log("ERROR: No characters found!")
        sys.exit(1)

    # Process each character
    log(f"\n=== PHASE 2: Processing {len(raw_chars)} characters ===")
    characters = []
    hash_registry = {}  # sha256 -> asset_info for dedup
    errors = []

    for i, (char_id, raw) in enumerate(sorted(raw_chars.items()), 1):
        log(f"\n[{i}/{len(raw_chars)}] ", )
        try:
            char = process_character(raw, hash_registry)
            characters.append(char)
        except Exception as e:
            log_error(f"Error processing character {char_id}: {e}")
            errors.append((char_id, str(e)))

    # Sort by ID
    characters.sort(key=lambda c: c["id"])

    # Write output
    log(f"\n=== PHASE 3: Writing output ===")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total_assets = sum(len(c.get("assets", [])) for c in characters)
    total_size = sum(
        a.get("file_size", 0)
        for c in characters
        for a in c.get("assets", [])
    )

    write_json(characters)
    write_csv(characters)
    write_readme(characters, total_assets, total_size)

    # ─── Validation Report ───────────────────────────────────────────────
    elapsed = time.time() - start_time
    log(f"\n{'=' * 60}")
    log(f"SCRAPING COMPLETE in {elapsed:.1f}s")
    log(f"{'=' * 60}")

    # 1. Totals
    log(f"\n1. Total characters found: {len(raw_chars)}")
    log(f"   Total successfully scraped: {len(characters)}")

    # 2. Assets
    unique_assets = sum(1 for c in characters for a in c.get("assets", []) if not a.get("deduplicated"))
    dedup_assets = sum(1 for c in characters for a in c.get("assets", []) if a.get("deduplicated"))
    log(f"\n2. Total asset entries: {total_assets}")
    log(f"   Unique files downloaded: {unique_assets}")
    log(f"   Deduplicated references: {dedup_assets}")
    log(f"   Total size: {total_size / (1024*1024):.1f} MB ({total_size:,} bytes)")

    # 3. Missing fields/assets
    log(f"\n3. Characters with missing fields or assets:")
    required_fields = ["name", "ability_name", "ability_description", "biography"]
    core_asset_types = {"head-icon", "skill-icon", "skill-artwork", "cover", "character-artwork-pc"}
    missing_report = []

    for char in characters:
        missing_fields = []
        for f in required_fields:
            if not char.get(f):
                missing_fields.append(f)

        char_asset_types = {a["type"] for a in char.get("assets", [])}
        missing_assets = core_asset_types - char_asset_types

        if missing_fields or missing_assets:
            missing_report.append({
                "id": char["id"],
                "name": char["name"],
                "missing_fields": missing_fields,
                "missing_assets": list(missing_assets),
            })
            log(f"   {char['id']:>4} {char['name']:<20} fields: {missing_fields or 'OK'}, assets: {list(missing_assets) or 'OK'}")

    if not missing_report:
        log("   None! All characters have all required fields and core assets.")

    # 4. Random sample
    import random
    sample_size = min(5, len(characters))
    sample = random.sample(characters, sample_size)
    log(f"\n4. Random sample of {sample_size} characters:")
    for char in sample:
        log(f"\n   --- {char['name']} (ID: {char['id']}) ---")
        log(f"   Slug: {char['slug']}")
        log(f"   Quote: {char.get('quote')}")
        log(f"   Ability: {char.get('ability_name')} - {char.get('ability_description')}")
        log(f"   Gender: {char.get('gender')}, Age: {char.get('age')}, Birthday: {char.get('birthday')}")
        log(f"   Biography: {(char.get('biography') or '')[:100]}...")
        log(f"   Assets: {len(char.get('assets', []))} files")
        log(f"   Source: {char.get('source_url')}")

    # 5. Limitations
    log(f"\n5. Limitations / items not captured:")
    log(f"   - sequence_pc / sequence_mobile: Empty for all 65 characters (no data)")
    log(f"   - story_link: External HTML bio pages exist but were not scraped (would expand scope)")
    log(f"   - Other locales: Only /en/ was scraped. Text translations in pt/es/id/th/ru/vn/zh/en-pk/ME_en not captured.")
    log(f"   - No video or audio assets found on the site.")

    if errors:
        log(f"\n   Processing errors:")
        for cid, err in errors:
            log(f"   - Character {cid}: {err}")


if __name__ == "__main__":
    main()
