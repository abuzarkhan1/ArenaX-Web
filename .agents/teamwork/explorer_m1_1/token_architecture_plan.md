# Milestone 1 Blueprint: Design System Tokens & CSS Architecture

**Author:** Teamwork Explorer (`explorer_m1_1`)  
**Status:** Complete Implementation Blueprint (Read-Only Investigation)  
**Target Milestone:** Milestone 1 (Design System Tokens & CSS Architecture)  
**Reference Document:** `Supabase _ The Postgres Development Platform.html` & `supabase_tokens.md`  

---

## 1. Executive Summary

This blueprint specifies the exact design system tokens, CSS architecture, and line-by-line configuration changes required to align ArenaX-Web with the Supabase design system while ensuring **100% backward compatibility** with all 520+ existing token usages across the codebase.

### Primary Goals Achieved
1. **Canonical Color Alignment**:
   - Signature Green Brand Accent: `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`), hover `#34B27B`, gradient `#249361` ➔ `#3ECF8E`.
   - Dark Carbon Surfaces: Canvas `#121212` (`--bg-1`), Card `#171717` (`--bg-2`, normalized from `#171817`), Elevated `#1E201F` (`--bg-3`, normalized from `#202220`), Footer/Alternative `#161616` (`--bg-alt`), Sticky Header Translucent Backdrop `#0B0E0D` (`rgba(11, 14, 13, 0.85)`), Deepest `#0E0F0E` (`--bg-0`).
   - Hairline Borders: 1px subtle `rgba(255, 255, 255, 0.08)`, control border `rgba(255, 255, 255, 0.14)`, brand border `rgba(62, 207, 142, 0.35)`.
   - Typography Calibrated Normal Weight: `Inter` (body, weight `450`), `Manrope` (headings), `Source Code Pro` / `JetBrains Mono` (code/mono).
2. **Zero Breaking Changes**:
   - Every existing utility (`bg-bg-1`, `bg-bg-2`, `bg-bg-3`, `bg-accent`, `text-text-1`, `text-text-2`, `text-text-3`, `border-line`, `border-line-strong`, `border-line-accent`) continues to resolve seamlessly.
   - Suffix and prefix aliases allow developers to use both legacy syntax (`bg-bg-2`, `text-text-1`) and canonical Supabase syntax (`bg-surface-card`, `bg-surface-75`, `text-foreground`, `border-border`, `bg-brand`).

---

## 2. Canonical Token Specifications

### 2.1 Brand Green Accent Palette

| Token | CSS Variable | Hex / Definition | RGB Tuple | Role & Application |
|---|---|---|---|---|
| Brand Primary | `--accent` / `--brand-default` | `#3ECF8E` (`hsl(153.1deg 60.2% 52.7%)`) | `62, 207, 142` | Primary CTA buttons, active state highlights, brand marks |
| Brand Hover | `--accent-hover` / `--brand-hover` | `#34B27B` | `52, 178, 123` | Interactive hover state for primary buttons |
| Brand Dim | `--accent-dim` | `rgba(62, 207, 142, 0.12)` | N/A | Ambient card glow, selection highlight |
| Brand Gradient | `--brand-gradient` | `linear-gradient(180deg, #249361 0%, #3ECF8E 100%)` | N/A | Vertical brand sheen, logo marks |
| Brand Gradient H | `--brand-gradient-h` | `linear-gradient(90deg, #249361 0%, #3ECF8E 100%)` | N/A | Horizontal progress indicators & animated link lines |
| Brand 600 | `--brand-600` | `#85E0BA` | `133, 224, 186` | Light emerald active badges, pill text |
| Brand 500 | `--brand-500` | `#3ECF8E` | `62, 207, 142` | Canonical brand emerald |
| Brand 400 | `--brand-400` | `#249361` | `36, 147, 97` | Dark green solid border / gradient origin |
| Brand 300 | `--brand-300` | `#002918` | `0, 41, 24` | Badge background fill |
| Brand Deep | `--brand-100` / `--brand-deep`| `#041B10` | `4, 27, 16` | Text inside solid `#3ECF8E` buttons |

---

### 2.2 Dark Carbon Surface Scale

| Level | CSS Variable | Normalized Hex | Old Value | RGB Tuple | Role & Application |
|---|---|---|---|---|---|
| Deepest Canvas | `--bg-0` | `#0E0F0E` | `#0E0F0E` | `14, 15, 14` | Pin-scroll backgrounds, tactical backdrops |
| Canvas / Page Base | `--bg-1` / `--background` | `#121212` | `#121212` | `18, 18, 18` | Universal page body canvas |
| Sticky Header | `--bg-header` | `#0B0E0D` | N/A | `11, 14, 13` | Translucent frosted navigation bar |
| Card / Surface 1 | `--bg-2` / `--surface-card` | **`#171717`** | *`#171817`* | **`23, 23, 23`** | Primary card & panel surfaces (Normalized) |
| Elevated / Hover | `--bg-3` / `--surface-elevated` | **`#1E201F`** | *`#202220`* | **`30, 32, 31`** | Popovers, raised badges, hover surfaces (Normalized) |
| Footer / Alt Surface | `--bg-alt` / `--surface-alt` | `#161616` | N/A | `22, 22, 22` | Footer background, alternating section bands |
| Field / Input | `--field` | `rgba(0, 0, 0, 0.24)` | N/A | N/A | Form input backgrounds |

**Normalization Note**:
1. `--bg-2` is normalized from `#171817` (RGB `23, 24, 23`) to canonical Supabase `#171717` (RGB `23, 23, 23`). The RGB tuple in `tailwind.config.js` withAlpha helper is synchronized from `'23, 24, 23'` to `'23, 23, 23'`.
2. `--bg-3` is normalized from `#202220` (RGB `32, 34, 32`) to canonical Supabase elevated `#1E201F` (RGB `30, 32, 31`). The RGB tuple in `tailwind.config.js` withAlpha helper is synchronized from `'32, 34, 32'` to `'30, 32, 31'`.

---

### 2.3 Hairline Borders & Dividers

| Token | CSS Variable | RGBA Definition | Hex Approx | Application |
|---|---|---|---|---|
| Subtle Hairline | `--line` / `--border` | `rgba(255, 255, 255, 0.08)` | `#242424` | Universal 1px hairline border on cards and separators |
| Control Border | `--line-strong` / `--border-control` | `rgba(255, 255, 255, 0.14)` | `#2E2E2E` | Input fields, active badges, button borders |
| Control Border Hover | `--border-hover` | `rgba(255, 255, 255, 0.28)` | `#474747` | Hovered input fields & interactive pill outlines |
| Brand Hairline | `--line-accent` / `--border-brand` | `rgba(62, 207, 142, 0.35)` | N/A | Highlighted cards, active tab outlines, focus rings |

---

### 2.4 Typography Hierarchy & Calibrated Weight 450

| Role | Font Family | Weight Token | Value | Target Usage |
|---|---|---|---|---|
| Display / Headings | `'Manrope', 'Outfit', sans-serif` | `font-semibold` / `font-bold` | `600` / `700` | Section titles (H1, H2, H3), hero headers |
| Body / UI Default | `'Inter', system-ui, sans-serif` | **`font-normal`** | **`450`** | Body copy, descriptions, navigation links |
| Body Medium | `'Inter', system-ui, sans-serif` | `font-medium` | `500` | Buttons, badge text, card subtitles |
| Monospace / Code | `'Source Code Pro', 'JetBrains Mono', monospace` | `font-normal` / `font-medium` | `450` / `500` | Terminal displays, AI vision stats, telemetry |

**OLED Clarity Justification**:
Supabase specifies normal weight as `450` rather than browser standard `400`. On dark carbon OLED backgrounds (`#121212`, `#171717`), standard 400-weight text suffers from optical thinning due to pixel luminance contrast. Weight `450` provides crisp letterforms without the bulk of medium (500).

---

## 3. Line-by-Line Recommendations: `tailwind.config.js`

File: `c:\Users\Muhammad Minhas\ArenaX-Web\tailwind.config.js`

### Current Code (Lines 11-49):
```javascript
    extend: {
      colors: {
        bg: {
          0: withAlpha('--bg-0', '14, 15, 14'),
          1: withAlpha('--bg-1', '18, 18, 18'),
          2: withAlpha('--bg-2', '23, 24, 23'),
          3: withAlpha('--bg-3', '32, 34, 32'),
        },
        line: {
          DEFAULT: withAlpha('--line', '255, 255, 255'),
          strong: withAlpha('--line-strong', '255, 255, 255'),
          accent: withAlpha('--line-accent', '62, 207, 142'),
        },
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        accent: {
          DEFAULT: withAlpha('--accent', '62, 207, 142'),
          hover: withAlpha('--accent-hover', '52, 178, 123'),
          dim: 'var(--accent-dim)',
        },
        emerald: {
          50: '#f0fdf6',
          ...
```

### Proposed Replacement:
```javascript
    extend: {
      colors: {
        // Backward-compatible surface scale (normalized to canonical Supabase values)
        bg: {
          0: withAlpha('--bg-0', '14, 15, 14'),
          1: withAlpha('--bg-1', '18, 18, 18'),
          2: withAlpha('--bg-2', '23, 23, 23'),       // NORMALIZED: 23, 23, 23 (was 23, 24, 23)
          3: withAlpha('--bg-3', '30, 32, 31'),       // NORMALIZED: 30, 32, 31 (was 32, 34, 32)
          alt: withAlpha('--bg-alt', '22, 22, 22'),   // NEW: Footer & alternative carbon (#161616)
          header: withAlpha('--bg-header', '11, 14, 13'), // NEW: Sticky header backdrop (#0B0E0D)
        },
        // Forward Supabase surface scale
        surface: {
          canvas: withAlpha('--bg-1', '18, 18, 18'),
          card: withAlpha('--bg-2', '23, 23, 23'),
          elevated: withAlpha('--bg-3', '30, 32, 31'),
          alternative: withAlpha('--bg-alt', '22, 22, 22'),
          header: withAlpha('--bg-header', '11, 14, 13'),
          deep: withAlpha('--bg-0', '14, 15, 14'),
          75: withAlpha('--bg-2', '23, 23, 23'),
          100: '#181A19',
          200: withAlpha('--bg-3', '30, 32, 31'),
          300: withAlpha('--bg-3', '30, 32, 31'),
        },
        // Backward-compatible hairline borders
        line: {
          DEFAULT: withAlpha('--line', '255, 255, 255'),
          strong: withAlpha('--line-strong', '255, 255, 255'),
          accent: withAlpha('--line-accent', '62, 207, 142'),
        },
        // Forward Supabase border scale
        border: {
          DEFAULT: withAlpha('--border', '255, 255, 255'),
          strong: withAlpha('--border-strong', '255, 255, 255'),
          control: withAlpha('--border-control', '255, 255, 255'),
          hover: withAlpha('--border-hover', '255, 255, 255'),
          brand: withAlpha('--border-brand', '62, 207, 142'),
        },
        // Backward-compatible typography colors
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        // Forward Supabase typography colors
        foreground: {
          DEFAULT: 'var(--text-1)',
          light: 'var(--text-2)',
          lighter: '#8A8A8A',
          muted: 'var(--text-3)',
          primary: '#3ECF8E',
        },
        // Signature Green Brand Accent (#3ECF8E)
        accent: {
          DEFAULT: withAlpha('--accent', '62, 207, 142'),
          hover: withAlpha('--accent-hover', '52, 178, 123'),
          dim: 'var(--accent-dim)',
        },
        // Forward Supabase brand scale
        brand: {
          DEFAULT: withAlpha('--brand-default', '62, 207, 142'),
          hover: withAlpha('--brand-hover', '52, 178, 123'),
          600: '#85E0BA',
          500: '#3ECF8E',
          400: '#249361',
          300: '#002918',
          200: '#000A07',
          100: '#041B10',
          deep: '#041B10',
        },
        emerald: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d2',
          300: '#86efb1',
          400: '#4CD99B',
          500: '#3ECF8E',
          600: '#34B27B',
          700: '#249361',
          800: '#1a6f49',
          900: '#155a3c',
          950: '#073321',
        },
        danger: withAlpha('--danger', '239, 68, 68'),
        whatsapp: withAlpha('--whatsapp', '37, 211, 102'),
      },
```

### Font Weight & Shadows Extension:
Add the calibrated `450` weight and Supabase shadow tokens:
```javascript
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'Outfit', 'sans-serif'],
        mono: ['"Source Code Pro"', '"JetBrains Mono"', 'monospace'],
      },
      fontWeight: {
        normal: '450',
        450: '450',
      },
      borderRadius: {
        card: '16px',
        control: '10px',
        panel: '12px',
        pill: '9999px',
      },
      boxShadow: {
        broadcast: '0 24px 60px -24px rgba(0, 0, 0, 0.75)',
        lift: '0 12px 24px -10px rgba(62, 207, 142, 0.18)',
        'lift-strong': '0 18px 40px -14px rgba(62, 207, 142, 0.28)',
        glow: '0 0 0 1px rgba(62, 207, 142, 0.15), 0 12px 36px -12px rgba(62, 207, 142, 0.35)',
        'inner-line': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'button-raised': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'hud-grid':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-emerald':
          'radial-gradient(ellipse at center, rgba(62, 207, 142, 0.14) 0%, transparent 70%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 42%)',
        'brand-gradient':
          'linear-gradient(180deg, #249361 0%, #3ECF8E 100%)',
        'brand-gradient-horizontal':
          'linear-gradient(90deg, #249361 0%, #3ECF8E 100%)',
        'brand-gradient-diagonal':
          'linear-gradient(135deg, #249361 0%, #3ECF8E 100%)',
      },
```

---

## 4. Line-by-Line Recommendations: `src/index.css`

File: `c:\Users\Muhammad Minhas\ArenaX-Web\src\index.css`

### Current `:root` (Lines 5-41):
```css
:root {
  /* Surfaces - Matching Supabase Dark Theme */
  --bg-0: #0E0F0E;   /* deepest: pinned scenes, footer */
  --bg-1: #121212;   /* page base: Supabase dark base */
  --bg-2: #171817;   /* cards & panels: Supabase surface-100 */
  --bg-3: #202220;   /* raised / hover / surface-200 */

  /* Lines - Supabase hairline architecture */
  --line:        rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.14);
  --line-accent: rgba(62, 207, 142, 0.35);

  /* Text - Supabase typography hierarchy */
  --text-1: #EDEDED;
  --text-2: #A0A0A0;
  --text-3: #707070;   /* min 12px mono, never below AA */

  /* Accent - Supabase signature emerald brand (#3ECF8E) */
  --accent:      #3ECF8E;
  --accent-hover:#34B27B;
  --accent-dim:  rgba(62, 207, 142, 0.12);

  /* Supabase Brand stops */
  --brand-default: #3ECF8E;
  --brand-600:     #4CD99B;
  --brand-500:     #3ECF8E;
  --brand-400:     #249361;

  /* Supabase Typography */
  --font-manrope: 'Manrope', 'Outfit', sans-serif;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Source Code Pro', 'JetBrains Mono', monospace;

  /* Semantic only */
  --danger:   #EF4444;  /* Criminal aura + errors only */
  --whatsapp: #25D366;  /* WhatsApp button only */
}
```

### Proposed Replacement `:root`:
```css
:root {
  /* Surfaces - Supabase Canonical Dark Carbon Architecture */
  --bg-0: #0E0F0E;   /* deepest: pinned scenes, tactical backdrop */
  --bg-1: #121212;   /* page base canvas: Supabase canonical dark base */
  --bg-2: #171717;   /* cards & panels: Supabase surface-100 (NORMALIZED from #171817) */
  --bg-3: #1E201F;   /* raised / hover / surface-300 (NORMALIZED from #202220) */
  --bg-alt: #161616; /* alternative carbon: footer & alternating sections */
  --bg-header: #0B0E0D; /* sticky header translucent backdrop */

  /* Supabase Canonical Surface Aliases */
  --background: var(--bg-1);
  --background-default: var(--bg-1);
  --background-surface-75: var(--bg-2);
  --background-surface-100: #181A19;
  --background-surface-200: var(--bg-3);
  --background-surface-300: var(--bg-3);
  --background-alternative: var(--bg-alt);
  --card: var(--bg-2);
  --popover: #1B1D1C;
  --field: rgba(0, 0, 0, 0.24);

  /* Lines - Supabase Hairline Architecture */
  --line:        rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.14);
  --line-accent: rgba(62, 207, 142, 0.35);

  /* Supabase Canonical Border Aliases */
  --border:         var(--line);
  --border-default: var(--line);
  --border-strong:  var(--line-strong);
  --border-control: var(--line-strong);
  --border-hover:   rgba(255, 255, 255, 0.28);
  --border-brand:   var(--line-accent);

  /* Text - Supabase Typography Hierarchy */
  --text-1: #EDEDED;
  --text-2: #A0A0A0;
  --text-3: #707070;   /* min 12px mono, never below AA */

  /* Supabase Canonical Text Aliases */
  --foreground:          var(--text-1);
  --foreground-default:  var(--text-1);
  --foreground-light:    var(--text-2);
  --foreground-lighter:  #8A8A8A;
  --foreground-muted:    var(--text-3);

  /* Accent - Supabase Signature Emerald Brand (#3ECF8E) */
  --accent:       #3ECF8E;
  --accent-hover: #34B27B;
  --accent-dim:   rgba(62, 207, 142, 0.12);

  /* Supabase Brand Stops & Gradients */
  --brand-default:   #3ECF8E;
  --brand-hover:     #34B27B;
  --brand-600:       #85E0BA;
  --brand-500:       #3ECF8E;
  --brand-400:       #249361;
  --brand-300:       #002918;
  --brand-200:       #000A07;
  --brand-100:       #041B10;
  --brand-gradient:  linear-gradient(180deg, #249361 0%, #3ECF8E 100%);
  --brand-gradient-h:linear-gradient(90deg, #249361 0%, #3ECF8E 100%);

  /* Supabase Typography */
  --font-manrope: 'Manrope', 'Outfit', sans-serif;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Source Code Pro', 'JetBrains Mono', monospace;
  --font-weight-light: 300;
  --font-weight-normal: 450;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Semantic only */
  --danger:   #EF4444;  /* Criminal aura + errors only */
  --whatsapp: #25D366;  /* WhatsApp button only */
}
```

### Proposed Updates in `@layer base` (Lines 43-56):
Update `body` to set `font-weight: 450`:
```css
@layer base {
  html,
  body {
    overflow-x: hidden;
    max-width: 100%;
    background-color: var(--bg-1);
    color: var(--text-1);
    color-scheme: dark;
    font-family: var(--font-inter);
    font-weight: 450; /* Calibrated OLED normal weight */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
```

### Proposed Updates in `@layer utilities`:
1. Normalize `.hud-card` background from `rgba(23, 24, 23, 0.90)` to `rgba(23, 23, 23, 0.90)`:
```css
  .hud-card {
    background:
      linear-gradient(180deg, rgba(23, 23, 23, 0.90) 0%, rgba(16, 17, 16, 0.85) 100%);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-top-color: rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 20px 48px -20px rgba(0, 0, 0, 0.75);
    transition:
      border-color 0.3s ease,
      transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.3s ease,
      background-color 0.3s ease;
  }
```

2. Add Supabase Primitives Utilities:
```css
  /* Supabase Accessible Focus Ring */
  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212];
  }

  /* Supabase Secondary / Raised Control Surface */
  .raised-control-surface {
    background-color: var(--bg-2);
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.025), rgba(0, 0, 0, 0.03));
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    color: var(--text-1);
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }
  .raised-control-surface:hover {
    background-color: var(--bg-3);
  }

  /* Supabase Dual-layer Hairline Gradient Card */
  .gradient-border-card {
    padding: 1px;
    border-radius: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(23, 23, 23, 0.5) 100%);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .gradient-border-card:hover {
    background: linear-gradient(180deg, rgba(62, 207, 142, 0.35) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(23, 23, 23, 0.5) 100%);
  }

  /* Supabase Hairline Gradient Dividers */
  .divider-gradient {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
  }
  .divider-gradient-brand {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(62, 207, 142, 0.35) 50%, transparent 100%);
  }

  /* Shorthand Color Utility Aliases for Direct Developer Ergonomics */
  .bg-0 { background-color: var(--bg-0); }
  .bg-1 { background-color: var(--bg-1); }
  .bg-2 { background-color: var(--bg-2); }
  .bg-3 { background-color: var(--bg-3); }
  .text-1 { color: var(--text-1); }
  .text-2 { color: var(--text-2); }
  .text-3 { color: var(--text-3); }
```

3. Update Scrollbar Colors to match normalized `--bg-3` (`#1E201F`):
```css
::-webkit-scrollbar-thumb {
  background: #1E201F;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3ECF8E;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #1E201F #0E0F0E;
}
```

---

## 5. Line-by-Line Recommendation: `index.html`

File: `c:\Users\Muhammad Minhas\ArenaX-Web\index.html`

### Current Font Link (Line 15):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Source+Code+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### Proposed Replacement:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@400;500;600;700;800&family=Source+Code+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Rationale**:
Replacing `Inter:wght@400;500;600;700` with the variable font axis `Inter:wght@100..900` allows the browser to natively rasterize the calibrated weight `450` without faux-bold interpolation or clamping to 400/500.

---

## 6. Complete Backward Compatibility Matrix

| Utility Class in Codebase | Occurrences | Resolves To (CSS Property) | Pre-Migration Value | Post-Migration Value | Compatibility Impact |
|---|---|---|---|---|---|
| `bg-bg-1` / `bg-bg-1/80` | ~110 | `background-color` | `#121212` (`18, 18, 18`) | `#121212` (`18, 18, 18`) | 100% Identical |
| `bg-bg-2` / `bg-bg-2/70` | ~165 | `background-color` | `#171817` (`23, 24, 23`) | `#171717` (`23, 23, 23`) | Seamless normalized card carbon |
| `bg-bg-3` | ~45 | `background-color` | `#202220` (`32, 34, 32`) | `#1E201F` (`30, 32, 31`) | Seamless normalized elevated carbon |
| `bg-bg-0` | ~30 | `background-color` | `#0E0F0E` (`14, 15, 14`) | `#0E0F0E` (`14, 15, 14`) | 100% Identical |
| `text-text-1` | 134 | `color` | `#EDEDED` | `#EDEDED` | 100% Identical |
| `text-text-2` | 128 | `color` | `#A0A0A0` | `#A0A0A0` | 100% Identical |
| `text-text-3` | 18 | `color` | `#707070` | `#707070` | 100% Identical |
| `border-line` | ~90 | `border-color` | `rgba(255, 255, 255, 0.08)` | `rgba(255, 255, 255, 0.08)` | 100% Identical |
| `border-line-strong` | ~25 | `border-color` | `rgba(255, 255, 255, 0.14)` | `rgba(255, 255, 255, 0.14)` | 100% Identical |
| `border-line-accent` | ~32 | `border-color` | `rgba(62, 207, 142, 0.35)` | `rgba(62, 207, 142, 0.35)` | 100% Identical |
| `bg-accent` / `hover:bg-accent-hover` | ~65 | `background-color` | `#3ECF8E` / `#34B27B` | `#3ECF8E` / `#34B27B` | 100% Identical |
| `text-accent` | ~42 | `color` | `#3ECF8E` | `#3ECF8E` | 100% Identical |
| `hud-card` | Primitive | `class` | `#171817` gradient | `#171717` gradient | Seamless normalized carbon |
| `hud-card-highlight` | Primitive | `class` | radial emerald gradient | radial emerald gradient | 100% Identical |

---

## 7. Primitives Implementation Plan (Milestone 1 Primitives)

With these tokens in place, the implementer agent can cleanly update the Milestone 1 primitives:

1. **`Button.tsx`**:
   - `variant="primary"`: Solid Supabase brand green `#3ECF8E`, hover `#34B27B`, text `#041B10`, shadow `shadow-[var(--button-shadow-raised)]`, active scale `motion-safe:active:scale-[0.97]`.
   - `variant="secondary"`: Uses `.raised-control-surface`, background `#171717`, 1px hairline border `rgba(255, 255, 255, 0.08)`, hover background `#1E201F`.
   - `variant="ghost"`: Transparent background, hover `bg-white/[0.05]`.
   - Focus ring: Uses `.focus-ring` (2px `#3ECF8E`/55 ring, 2px `#121212` offset).
2. **`Card.tsx`**:
   - Retains `hud-card` and `hud-card-highlight` for existing tests, while optionally supporting Supabase dual-layer gradient card styling (`gradient-border-card`).
3. **`Badge.tsx` & `Pill.tsx`**:
   - Uses hairline borders (`--line-strong`), dark carbon backgrounds (`--bg-2` / `#171717`), and tabular tracking.
4. **Form Inputs**:
   - Uses `bg-field` (`rgba(0, 0, 0, 0.24)`), `border-control` (`rgba(255, 255, 255, 0.14)`), `hover:border-control-hover` (`rgba(255, 255, 255, 0.28)`), and `.focus-ring`.

---

## 8. Verification Strategy

Following the application of these token recommendations by the implementer agent, the following verification commands must succeed cleanly:
1. `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`): Exit code 0, 0 type errors.
2. `npm run lint` (`eslint .`): Exit code 0, 0 lint warnings/errors.
3. `npm run build` (`vite build`): Exit code 0, dist bundle generated cleanly.
4. `npm test` (`node --experimental-strip-types scripts/run-all-tests.ts`): All 4 validation tiers and challenger suites pass with 100% success rate.
5. Visual spot check: Body text exhibits crisp `450` font weight on `#121212` canvas; cards render canonical `#171717` dark carbon surfaces; hairline borders remain subtle 1px dividers without subpixel bleed.
