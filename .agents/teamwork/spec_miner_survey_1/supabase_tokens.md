# Supabase Design System Tokens & UI/UX Patterns Specification

*Authoritative specification extracted in strictly read-only mode from `Supabase _ The Postgres Development Platform.html` and assets in `Supabase _ The Postgres Development Platform_files/`.*

---

## 1. Executive Summary & Core Design Philosophy

The Supabase design system embodies a **"dark carbon & precision hairline"** aesthetic engineered for developer tools and modern technical platforms:
- **Default Appearance**: Strictly dark mode (`data-theme="dark"` with `style="color-scheme: dark;"` on root `<html>`).
- **Surface Layering**: Multi-tier carbon surfaces spanning from canvas `#121212` / `#171717` to elevated card `#181a19` / `#1c1c1c` and popover `#1b1d1c` / `#232323`.
- **Signature Accent**: Supabase Green (`#3ECF8E` / `hsl(153.1deg, 60.2%, 52.7%)`) with rich gradient stops and hover variants (`#34b27b`, `#30a46c`, `#85e0b7`).
- **Hairline Border Architecture**: 1px subtle borders (`rgba(255, 255, 255, 0.08)`, `#2e2e2e`, `#242424`) with dual-container gradient hairline borders (`p-px bg-linear-to-b from-border to-border/50 dark:to-surface-100`).
- **Typography**: Dual font hierarchy — **Manrope** for display/headings, **Inter** for UI/body, and **Source Code Pro** for monospace/code blocks, with custom weights including `450` for body normal.

---

## 2. Exact Color Palette & Design Tokens

### 2.1 Brand Green Accent Palette
Supabase uses an exact 12-step brand green scale and an OKLCH/HSL dynamic calculation system:

| Token / Variable | CSS Value | Calculated Hex | Role & Usage |
|---|---|---|---|
| `--variables-colors-brand-primary` | `153.1deg 60.2% 52.7%` | `#3ECF8E` | Canonical Supabase green brand accent |
| `--brand-default` | `hsl(153.1deg 60.2% 52.7%)` | `#3ECF8E` | Primary brand accent across UI |
| `--color-brand-900` | `#3fcf8e` | `#3ECF8E` | Radix dark brand-900 primary solid fill |
| `--primary-solid` | `oklch(.43627 .11 157.5)` | `#249361` ~ `#3ECF8E` | High-contrast solid green button background |
| `--primary-solid-hover` | `oklch(from var(--primary-solid) calc(l + .04) c h)` | `#34B27B` | Button hover state |
| `--brand-600` | `hsl(154.9deg 59.5% 70%)` | `#85E0BA` | Light green highlights, active accents |
| `--color-brand-1000` | `#85e0b7` | `#85E0B7` | High-light emerald accent |
| `--color-brand-1100` | `#33cc87` | `#33CC87` | Vibrant interactive green |
| `--color-brand-800` | `#1d724c` | `#1D724C` | Dark green solid / chart border |
| `--color-brand-700` | `#155b3d` | `#155B3D` | Dark forest green surface tone |
| `--brand-500` | `hsl(154.9deg 100% 19.2%)` | `#006239` | Deep green shadow / card tint |
| `--brand-400` | `hsl(155.5deg 100% 9.6%)` | `#00311D` | Very dark green background tint |
| `--brand-300` | `hsl(155.1deg 100% 8%)` | `#002918` | Dark emerald surface fill for badges |
| `--brand-200` | `hsl(162deg 100% 2%)` | `#000A07` | Deepest brand-tinted black |
| `--color-brand-100` | `#041b10` | `#041B10` | Deep emerald base background |
| **Brand Gradient** | `linear-gradient(#249361, #3ECF8E)` | `#249361` ➔ `#3ECF8E` | Supabase SVG Logo mark & glow gradients |

### 2.2 Dark Carbon Surface Colors
The dark carbon surface structure builds depth from pitch canvas up to elevated controls:

| Token / Variable | CSS Definition | Exact Hex / RGBA | Role & Application |
|---|---|---|---|
| `--background` / `--background-default` | `oklch(.19 calc(.005 * .5) 157.5)` | `#121212` / `#131413` | Main page canvas background |
| `dark:bg-[#171717]` | `#171717` | `#171717` | Standard dark carbon surface in page sections |
| `dark:bg-[#0b0e0d]` | `oklab(15.99% -0.005 0.0006 / 0.85)` | `#0B0E0D` | Backdrop / sticky header translucent surface |
| `--background-alternative-default` | `var(--background)` | `#161616` / `#121212` | Alternative section background (e.g., footer) |
| `--card` / `--background-surface-75` | `oklch(from var(--background) calc(l + .025*1) c h)` | `#171717` / `#181a19` | Primary card background, panel surfaces |
| `--background-surface-100` | `var(--card)` | `#181a19` / `#1c1c1c` | Secondary cards, pill backgrounds |
| `--popover` / `--background-dialog-default` | `oklch(from var(--background) calc(l + .025*1.5) c h)` | `#1b1d1c` / `#1c1c1c` | Elevated dialogs, menus, tooltips |
| `--secondary` / `--background-surface-300` | `oklch(from var(--background) calc(l + .025*2) c h)` | `#1e201f` / `#232323` | Raised panels, active tab backgrounds |
| `--background-surface-200` | `var(--muted)` | `oklch(from var(--foreground) l c h / .025)` | Hover state on cards and buttons |
| `--field` | `oklch(0 0 0 / .12)` | `rgba(0, 0, 0, 0.12)` / `#000000` | Form input backgrounds |
| `colors-gray-dark-100` | `0deg 0% 8.6%` | `#161616` | Radix gray scale 1 |
| `colors-gray-dark-200` | `0deg 0% 11.0%` | `#1C1C1C` | Radix gray scale 2 |
| `colors-gray-dark-300` | `0deg 0% 13.7%` | `#232323` | Radix gray scale 3 |

### 2.3 Text Color Tokens (Typography Hierarchy)

| Token / Class | CSS Variable | Exact Value | Usage & Application |
|---|---|---|---|
| `text-foreground` | `--foreground` / `--foreground-default` | `oklch(.95 ...)` / `#EDEDED` ~ `#FFFFFF` | Headings, primary titles, active link text |
| `text-foreground-light` | `--foreground-light` / `--muted-foreground` | `oklch(.80 ...)` / `#B4B4B4` ~ `#A0A0A0` | Subtitles, body copy, secondary navigation links |
| `text-foreground-lighter` | `--foreground-lighter` / `--tertiary-foreground` | `oklch(.65 ...)` / `#8A8A8A` ~ `#707070` | Descriptions, footer links, section intro text |
| `text-foreground-muted` | `--foreground-muted` | `#6E7681` / `#707070` | Inactive tabs, icons, placeholder text |
| `text-primary` | `--primary` | `#3ECF8E` | Highlighted text in hero headers and links |
| `text-primary-solid-foreground` | `--primary-solid-foreground` | `oklch(.95 .00275 157.5)` / `#041B10` / `#FFF` | Text inside primary green buttons |

### 2.4 Border Colors & Hairline Architecture

| Token / Variable | CSS Definition | Exact Value | Usage |
|---|---|---|---|
| `--border` / `--border-default` | `oklch(from var(--foreground) l calc(c * .54) h / 7.5%)` | `rgba(255, 255, 255, 0.08)` / `#242424` | Universal 1px hairline border |
| `--border-strong` | `var(--input)` | `rgba(255, 255, 255, 0.14)` / `#2e2e2e` | Badge borders, input container borders |
| `--border-stronger` | `oklch(from var(--foreground) ... / 17%)` | `rgba(255, 255, 255, 0.17)` / `#333333` | Elevated card borders on hover |
| `--border-control` | `var(--input)` | `rgba(255, 255, 255, 0.14)` | Form input borders |
| `--border-control-hover` | `oklch(from var(--foreground) ... / 28%)` | `rgba(255, 255, 255, 0.28)` | Form input borders on hover/focus |
| `--border-brand-default` | `oklch(from hsl(var(--brand-default)) l c h / 30%)` | `rgba(62, 207, 142, 0.30)` | Brand green bordered pills and active rings |
| `dark:border-[#333]` | `#333333` | `#333333` | Dark mode distinct hairline borders |
| `dark:border-[#14191B]` | `#14191B` | `#14191B` | Subtle card dividers |

### 2.5 State, Focus & Elevation Colors

| State / Token | Value / Definition | Behavior |
|---|---|---|
| Focus Ring (`focus-ring`) | `ring: oklch(from var(--primary-bright) l c h / 55%)` (`rgba(62, 207, 142, 0.55)`), ring-offset: 2px `#121212` | Accessible outline on `:focus-visible` without blurring |
| Active Button Scale | `active:scale-[0.97]` with easing `cubic-bezier(0.22, 1, 0.36, 1)` | Tactile micro-press response |
| Raised Button Inset Shadow | `inset 0 1px 0 0 rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.06)` | 3D top hairline illumination |
| Card Glow Hover | `from-border to-border/50 dark:to-surface-100 hover:shadow-md` | Soft elevation lightening on card hover |

---

## 3. Typography & Font Hierarchy

### 3.1 Font Families
- **Display / Headings**: `'Manrope', 'Manrope Fallback', system-ui, -apple-system, sans-serif`
  - CSS Variable: `--font-heading: var(--font-manrope, var(--font-sans))`
- **Body & Interface**: `'Inter', 'Inter Fallback', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
  - CSS Variable: `--font-sans: var(--font-inter), Inter, ...`
- **Monospace & Code**: `'Source Code Pro', 'Source Code Pro Fallback', 'Office Code Pro', Menlo, monospace`
  - CSS Variable: `--font-mono: var(--font-source-code-pro), "Source Code Pro", ...`

### 3.2 Font Weights
Supabase uses a custom calibrated weight scale:
- Light: `300` (`--font-weight-light`)
- Normal: `450` (`--font-weight-normal`) — *Notice 450 weight gives body text sharper clarity than standard 400 on OLED dark screens!*
- Medium: `500` (`--font-weight-medium`)
- Semibold: `600` (`--font-weight-semibold`)
- Bold: `700` (`--font-weight-bold`)
- Extrabold: `800` (`--font-weight-extrabold`)

### 3.3 Type Scale & Hierarchy

| Semantic Role | Size Token | Font Size (rem / px) | Line Height | Letter Spacing | Font Family | Default Weight |
|---|---|---|---|---|---|---|
| **Display / Hero H1** | `text-4xl sm:text-5xl` | `2.125rem` (34px) / `2.875rem` (46px) | `1` / `sm:leading-none` | `-0.025em` | Manrope | Semibold (600) |
| **Section Title H2** | `text-2xl md:text-4xl` | `1.375rem` (22px) / `2.125rem` (34px) | `1.15` | `-0.02em` | Manrope | Medium / Semibold |
| **Feature Title H3** | `text-xl md:text-2xl` | `1.125rem` (18px) / `1.375rem` (22px) | `1.33` | `-0.015em` | Manrope | Medium (500) |
| **Card Heading H4** | `text-base md:text-lg` | `0.9375rem` (15px) / `1rem` (16px) | `1.4` | `-0.01em` | Manrope | Medium (500) |
| **Body (Default)** | `text-base` | `0.9375rem` (15px) | `1.5 / 1` (24px) | `0` | Inter | Normal (450) |
| **Body Small** | `text-sm` | `0.875rem` (14px) | `1.428` (20px) | `0` | Inter | Normal (450) |
| **Navigation Links** | `text-sm` | `0.875rem` (14px) | `1.25` | `0` | Inter | Medium (500) |
| **Buttons (Medium)** | `text-base md:text-sm` | `0.9375rem` / `0.875rem` | `1.2` | `0` | Inter | Medium (500) |
| **Buttons (Tiny)** | `text-xs` | `0.75rem` (12px) | `1.33` | `0` | Inter | Medium (500) |
| **Badges / Micro Pills**| `text-[9px]` | `9px` (0.5625rem) | `1` (`leading-none`) | `0.07em` uppercase | Inter | Medium (500) |
| **Code Blocks** | `text-[13px]` | `0.8125rem` (13px) | `1.7` (22px) | `0` | Source Code Pro | Medium (500) |

---

## 4. UI Component Architecture & Patterns

### 4.1 Button Patterns

#### A. Primary Green Solid Button
The signature Supabase call-to-action button:
```html
<a data-size="medium" class="relative inline-flex items-center justify-center cursor-pointer space-x-2 text-center font-medium ease-[cubic-bezier(0.22,1,0.36,1)] duration-200 transition-[background-color,border-color,color,scale] [&:not([aria-haspopup])]:motion-safe:active:scale-[0.97] focus-ring control-surface-shadows border-0 bg-primary-solid bg-[linear-gradient(to_bottom,hsl(var(--colors-white)/0.015),hsl(var(--colors-black)/0.01))] text-primary-solid-foreground shadow-[var(--button-shadow-raised)] hover:bg-[var(--primary-solid-hover)] data-[state=open]:bg-[var(--primary-solid-hover)] text-base md:text-sm px-4 py-2 h-[38px] rounded-[calc(var(--radius-md)*(1+(38/26-1)*0.35))]">
  <span class="truncate">Start your project</span>
</a>
```
- **Background**: `#3ECF8E` (`bg-primary-solid`) with 1.5% white to 1% black vertical gradient sheen.
- **Hover**: `#34B27B` / `#30a46c` (`hover:bg-[var(--primary-solid-hover)]`).
- **Text**: Deep carbon `#041B10` or high contrast `#FFFFFF`.
- **Dimensions**: Height `38px` (`medium`), padding `px-4 py-2`, radius `rounded-md` (~6px).
- **Shadow**: `shadow-[var(--button-shadow-raised)]` (0 1px 3px drop shadow with inset hairline border).

#### B. Secondary / Raised Button
```html
<a data-size="medium" class="relative inline-flex items-center justify-center cursor-pointer space-x-2 text-center font-medium ease-[cubic-bezier(0.22,1,0.36,1)] duration-200 transition-[background-color,border-color,color,scale] [&:not([aria-haspopup])]:motion-safe:active:scale-[0.97] focus-ring control-surface-shadows border-0 raised-control-surface text-base md:text-sm px-4 py-2 h-[38px] rounded-[calc(var(--radius-md)*(1+(38/26-1)*0.35))]">
  <span class="truncate">Request a demo</span>
</a>
```
- **Class**: `raised-control-surface`.
- **Background**: `var(--card)` (`#171717`), dark linear gradient sheen.
- **Hover**: `background-color: var(--accent)` / `var(--background-muted)`.
- **Border**: Inset 1px box shadow `rgba(255, 255, 255, 0.08)`.

#### C. Tiny / Compact Button
- **Classes**: `data-size="tiny" text-xs px-2.5 py-1 h-[26px] rounded-md`
- Used in navigation headers, newsletter subscribe, and code block actions.

---

### 4.2 Cards & Containers (Hairline Gradient Architecture)
Supabase utilizes a dual-container pattern for glowing hairline borders:
```html
<!-- Outer wrapper provides the 1px gradient hairline border -->
<div class="group/panel [--panel-radius:var(--radius-lg)] md:[--panel-radius:var(--radius-xl)] rounded-(--panel-radius) p-px bg-surface-75 bg-linear-to-b from-border to-border/50 dark:to-surface-100 transition-all hover:shadow-md relative w-full h-full">
  <!-- Inner card holds the dark carbon content surface -->
  <div class="z-10 rounded-[calc(var(--panel-radius)-1px)] relative overflow-hidden flex-1 flex flex-col justify-between bg-surface-75 w-full h-full text-foreground-lighter p-6">
    <div class="flex items-center gap-2 text-foreground font-medium text-lg">
      <!-- Icon & Title -->
    </div>
    <p class="text-sm text-foreground-lighter mt-2">
      Feature description with <strong class="text-foreground font-normal">highlighted keywords</strong>.
    </p>
  </div>
</div>
```
- **Outer Wrapper**: `p-px` with gradient border `bg-linear-to-b from-border to-border/50 dark:to-surface-100`.
- **Inner Container**: `rounded-[calc(var(--panel-radius)-1px)]` with carbon background `bg-surface-75` (`#171717`).
- **Interactive Tweet / Story Card**:
  `bg-surface-75 border group-hover/tweet-card:border-foreground-muted transition-colors rounded-2xl p-6 drop-shadow-xs`.

---

### 4.3 Navigation & Header
```html
<header class="fixed top-0 left-0 right-0 z-40">
  <div class="absolute inset-0 bg-background/90 dark:bg-background/95 backdrop-blur-xs transition-all duration-300"></div>
  <nav class="relative z-40 border-b border-default">
    <div class="section-container relative flex items-center justify-between h-16">
      <div class="flex items-center gap-6">
        <!-- Logo with green mark -->
        <a href="/" class="focus-ring rounded-md">
          <svg ...><!-- Supabase Mark (#3ECF8E) + Wordmark --></svg>
        </a>
        <div class="hidden md:flex items-center gap-4">
          <a class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors">Products</a>
          <a class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors">Developers</a>
          <a class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors">Pricing</a>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <a class="text-sm font-medium text-foreground-light hover:text-foreground">Sign in</a>
        <button class="bg-primary-solid text-primary-solid-foreground text-xs px-2.5 py-1 h-[26px] rounded-md font-medium">
          Start your project
        </button>
      </div>
    </div>
  </nav>
</header>
```
- Height: `h-16` (64px).
- Backdrop: `bg-background/90 dark:bg-background/95 backdrop-blur-xs`.
- Border: `border-b border-default` (`rgba(255, 255, 255, 0.08)`).
- Container: `section-container` (`max-w-[1280px] px-6 sm:px-12 xl:px-24`).

---

### 4.4 Badges & Status Pills

#### 1. Uppercase Metadata Pill
```html
<div class="inline-flex items-center gap-1 justify-center rounded-full whitespace-nowrap tracking-[0.07em] uppercase font-medium text-[9px] leading-none px-[5.5px] py-[3px] bg-surface-75 text-foreground-light border border-strong">
  <span>New</span>
</div>
```
- Border: `border border-strong` (`rgba(255, 255, 255, 0.14)`).
- Typography: `text-[9px] tracking-[0.07em] uppercase font-medium leading-none`.
- Surface: `bg-surface-75` (`#171717`).

#### 2. Interactive Filter / Tab Pill
```html
<button role="tab" aria-selected="true" class="py-1.5 px-3 lg:py-2 lg:px-8 border rounded-full bg-alternative text-sm transition-all hover:border-foreground-lighter hover:text-foreground opacity-100 !border-foreground">
  Table Editor
</button>
<button role="tab" aria-selected="false" class="py-1.5 px-3 lg:py-2 lg:px-8 border rounded-full bg-alternative text-sm opacity-80 transition-all hover:border-foreground-lighter hover:text-foreground">
  SQL Editor
</button>
```
- Shape: `rounded-full`.
- Inactive: `opacity-80 border-border bg-alternative`.
- Active: `opacity-100 !border-foreground`.

#### 3. Brand Accent Pill (e.g. Connected Frameworks)
```html
<div class="w-auto h-auto px-2.5 py-1.5 flex items-center justify-center gap-1 border border-brand-default rounded-full bg-brand-300 text-brand-600 text-xs">
  <span class="w-1.5 h-1.5 rounded-full bg-brand-default animate-pulse"></span>
  <span>Connected</span>
</div>
```

---

### 4.5 Form Inputs & Interactive Controls
```html
<input
  type="email"
  placeholder="Your email"
  class="flex w-full rounded-md border border-control hover:border-control-hover bg-field placeholder:text-foreground-muted text-foreground-light focus:border-control-hover focus-ring disabled:cursor-not-allowed disabled:text-foreground-muted transition-colors duration-200 text-sm py-2 px-3 h-[34px] aria-[invalid=true]:border-destructive"
/>
```
- Background: `bg-field` (`rgba(0, 0, 0, 0.12)` / `#000000`).
- Border: `border-control` (`rgba(255, 255, 255, 0.14)`).
- Hover: `hover:border-control-hover` (`rgba(255, 255, 255, 0.28)`).
- Focus: `focus:border-control-hover focus-ring` (`rgba(62, 207, 142, 0.55)`).
- Placeholder: `placeholder:text-foreground-muted` (`#707070`).
- Invalid / Error: `aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400`.

---

### 4.6 Code Blocks & Technical Terminal Display
```html
<div class="rounded-xl border border-border bg-surface-75 overflow-hidden shadow-codeblock">
  <!-- Code Block Tabs Header -->
  <div class="flex items-center justify-between border-b border-border bg-surface-75/50 px-4 py-2">
    <div class="flex gap-4">
      <button class="text-xs font-mono text-foreground font-medium border-b border-brand-default pb-1">App.tsx</button>
      <button class="text-xs font-mono text-foreground-muted hover:text-foreground pb-1">schema.sql</button>
    </div>
    <button class="text-xs text-foreground-muted hover:text-foreground">Copy</button>
  </div>
  <!-- Code Content with Shiki Supabase Dark Syntax Tokens -->
  <div class="p-6 overflow-x-auto text-[13px] font-mono leading-[1.7] bg-transparent text-[#ffffff]">
    <pre class="shiki supabase-dark"><code><span style="color:#BDA4FF">import</span> { createClient } <span style="color:#BDA4FF">from</span> <span style="color:#FFCDA1">'@supabase/supabase-js'</span>
<span style="color:#BDA4FF">const</span> <span style="color:#3ECF8E">supabase</span> = <span style="color:#3ECF8E">createClient</span>(url, key)</code></pre>
  </div>
</div>
```
- **Syntax Highlighting Tokens**:
  - Keywords / Imports: `#BDA4FF` (soft purple / lavender)
  - Constants / Functions / Properties: `#3ECF8E` (brand green)
  - Strings / Literals: `#FFCDA1` (peach orange)
  - Comments: `#949494` (neutral muted gray)
  - Punctuation / Default: `#FFFFFF`
  - Active Line Highlight: `#232323`
  - Font: `Source Code Pro`, 13px (`0.8125rem`), weight 500, line height 1.7.

---

### 4.7 Footer Architecture
- **Surface**: `bg-alternative` (`#161616` / `#121212`).
- **Security & Compliance Banner**:
  - Flex row with SOC2 Type 2, HIPAA, ISO 27001 badges with checkmark icons.
  - Divided by a gradient hairline:
    `<div class="w-full h-px bg-linear-to-r from-transparent via-border to-transparent"></div>`
- **Columns**: 6-column responsive grid (`md:grid-cols-3 xl:grid-cols-6`).
  - Column Headers: `text-foreground overwrite text-base font-medium mb-4`.
  - Links: `text-sm text-foreground-lighter hover:text-foreground transition-colors`.
- **Newsletter Subscription**:
  - Label: `text-foreground-lighter text-sm`.
  - Input: `h-6! text-xs px-2 border-control bg-field`.
  - Button: `data-size="tiny" text-xs px-2.5 py-1 h-[26px] bg-primary-solid`.
- **Copyright & Theme Row**:
  - Hairline top border: `border-default border-t pt-8 mt-32 flex justify-between`.
  - Copy: `small class="small" text-foreground-lighter` (`© Supabase Inc`).
  - Theme toggle button: `h-7 w-7 text-foreground-light hover:text-foreground`.

---

## 5. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Color | Canonical Green Accent | `#3ECF8E` (`hsl(153.1deg 60.2% 52.7%)`) used for CTAs, active highlights, logos | Hex, HSL, RGB | Hex `#3ECF8E` | Falls back to emerald-500 | `768902fa471e0736.css:436506` & HTML SVG defs |
| 2 | Color | Dark Green Gradient | `#249361` to `#3ECF8E` used in logo mark and radial glows | Angle / coordinate | 2-stop linear gradient | N/A | HTML SVG `<defs>` linearGradient |
| 3 | Color | Brand Scale 1-12 | Full 12-step brand scale from `#041B10` to `#3ECF8E` to `#EBFAF3` | Step 100-1200 | 12 hex colors | Defaults to brand-default | `768902fa471e0736.css` `--color-brand-*` |
| 4 | Color | Dark Carbon Background | `#121212` / `#171717` / `#131413` canvas surface | Theme=dark | Canvas background | Falls back to #000000 | `768902fa471e0736.css` `--background` & HTML |
| 5 | Color | Multi-tier Carbon Cards | `--card` `#181a19`, `--secondary` `#1e201f`, `--popover` `#1b1d1c` | Elevation level 1-3 | Computed OKLCH surfaces | Flat black fallback | `768902fa471e0736.css` elevation steps |
| 6 | Color | Hairline Border Token | `--border` at `oklch(... / 7.5%)` ~ `rgba(255, 255, 255, 0.08)` / `#242424` | Contrast setting | 1px hairline border | Falls back to solid #2e2e2e | `768902fa471e0736.css` `--border` definition |
| 7 | Typography | Font Family Hierarchy | Manrope (Headings), Inter (Body), Source Code Pro (Mono) | CSS font-family | Loaded webfonts with fallbacks | System-ui fallbacks | `1bedb77e930f298a.css` & `768902fa471e0736.css` |
| 8 | Typography | Calibrated Normal Weight 450 | Normal weight set to `450` for sharper OLED text clarity | `--font-weight-normal` | 450 weight | Standard 400 | `768902fa471e0736.css:2684` |
| 9 | Typography | Granular Type Scale | 12-size scale with custom rem values (e.g. text-base = 0.9375rem / 15px) | Class name | CSS rem size + line-height | Browser default | `768902fa471e0736.css` `--text-*` |
| 10 | Component | Primary Green CTA Button | High contrast green button with inset shadow & vertical micro-gradient | `data-size`, label | Styled button / anchor | Scales to 97% on press | Reference HTML hero section |
| 11 | Component | Secondary Raised Button | `raised-control-surface` with inset hairline highlight and hover | `data-size`, label | Styled secondary button | Hover background shift | Reference HTML hero & navbar |
| 12 | Component | Dual-layer Hairline Card | Outer `p-px` gradient hairline with inner carbon surface | Child DOM | Glowing border card | Falls back to 1px border | Reference HTML `#products` section |
| 13 | Component | Sticky Frosted Navbar | `h-16 bg-background/95 backdrop-blur-xs border-b border-default` | Header items | Sticky navigation | Shrinks smoothly on scroll | Reference HTML `<nav>` element |
| 14 | Component | Micro Uppercase Pill | `text-[9px] uppercase tracking-[0.07em] border-strong bg-surface-75` | Pill text | Metadata badge | Truncates text | Reference HTML badge elements |
| 15 | Component | Interactive Tab Pill | `rounded-full border bg-alternative` with `!border-foreground` active | `aria-selected` | Segmented tab pill | Stays 80% opacity | Reference HTML `role="tablist"` |
| 16 | Component | Form Input Field | `bg-field border-control hover:border-control-hover focus-ring` | Input value | 34px/24px input box | `aria-[invalid=true]:border-destructive` | Reference HTML `<input>` in footer |
| 17 | Component | Syntax Code Block | Shiki Supabase Dark tokens: `#bda4ff`, `#3ecf8e`, `#ffcda1`, `#949494` | Code text | Syntax highlighted pre | Horizontal scrollbar | Reference HTML `<pre class="shiki">` |
| 18 | Component | Footer Compliance Banner | SOC2, HIPAA, ISO badges with checkmarks and gradient hairline | Badge list | Responsive badge row | Stacks on mobile | Reference HTML `<footer>` |
| 19 | Component | Gradient Hairline Divider | `h-px bg-linear-to-r from-transparent via-border to-transparent` | Container width | Gradient divider line | Solid line fallback | Reference HTML footer divider |

---

## 6. Edge Cases & Observed Behaviors

| # | Feature | Input / Condition | Observed Behavior |
|---|---------|-------------------|-------------------|
| 1 | HTML Dark Mode Scheme | `<html data-theme="dark" style="color-scheme: dark;">` | Browser scrollbars, form controls, and default canvas natively render in pitch black / dark mode without white flash. |
| 2 | Active Button Press | User clicks/taps button | `motion-safe:active:scale-[0.97]` smoothly compresses button by 3% using `cubic-bezier(0.22, 1, 0.36, 1)` easing, except when `aria-haspopup="true"` (dropdown triggers do not scale). |
| 3 | Focus Visibility | Keyboard Tab navigation | `focus-ring` adds a 2px offset ring with `oklch(from var(--primary-bright) l c h / 55%)` (`rgba(62,207,142,0.55)`), preventing default browser blue outline. |
| 4 | Hairline Border Anti-aliasing | Retina vs standard display | 1px border (`border-default` / `p-px`) remains crisp without subpixel bleeding because it uses outer padding + gradient background rather than box-shadow simulation. |
| 5 | Invalid Form State | `aria-invalid="true"` on `<input>` | Dynamically triggers `aria-[invalid=true]:border-destructive-400` and `aria-[invalid=true]:bg-destructive-200`, signaling user errors without layout shift. |
| 6 | Container Responsive Padding | Screen size < 64rem vs >= 64rem vs >= 80rem | `section-container` dynamically scales horizontal padding: 24px (`px-6`) on mobile ➔ 48px (`px-12`) at 1024px ➔ 96px (`px-24`) at 1280px+ with max-width 1280px (`max-w-7xl`). |
| 7 | Text Normal Weight Fallback | Browser doesn't support variable font `450` | Automatically clamps to `400` or `500` without breaking line wrapping. |
| 8 | Syntax Highlighting in Dark Mode | Shiki code rendered in dark container | `<pre class="shiki supabase-dark">` has `background-color: transparent!important; m-0 p-6`, letting inner carbon background show through cleanly. |

---

## 7. Direct Implementation Guide for ArenaX-Web

To apply these tokens across ArenaX-Web, the team should configure:

### CSS Custom Properties (`src/index.css`)
```css
:root {
  /* Supabase Brand Greens */
  --brand-default: #3ECF8E;
  --brand-600: #85E0BA;
  --brand-500: #006239;
  --brand-400: #00311D;
  --brand-300: #002918;
  --brand-hover: #34B27B;

  /* Dark Carbon Surfaces */
  --background: #121212;
  --background-surface-75: #171717;
  --background-surface-100: #181A19;
  --background-surface-200: #1E201F;
  --background-popover: #1B1D1C;
  --background-alternative: #161616;

  /* Typography Colors */
  --foreground: #EDEDED;
  --foreground-light: #B4B4B4;
  --foreground-lighter: #8A8A8A;
  --foreground-muted: #707070;

  /* Hairline Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --border-hover: rgba(255, 255, 255, 0.28);
  --border-brand: rgba(62, 207, 142, 0.30);

  /* Fonts */
  --font-heading: 'Manrope', 'Outfit', sans-serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Source Code Pro', 'JetBrains Mono', monospace;
}
```

### Tailwind Config Extensions (`tailwind.config.js`)
```javascript
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: '#3ECF8E',
        hover: '#34B27B',
        light: '#85E0BA',
        dark: '#249361',
        deep: '#041B10',
      },
      surface: {
        canvas: '#121212',
        card: '#171717',
        elevated: '#181A19',
        panel: '#1E201F',
        popover: '#1B1D1C',
        alternative: '#161616',
      },
      foreground: {
        DEFAULT: '#EDEDED',
        light: '#B4B4B4',
        lighter: '#8A8A8A',
        muted: '#707070',
      },
      border: {
        DEFAULT: 'rgba(255, 255, 255, 0.08)',
        strong: 'rgba(255, 255, 255, 0.14)',
        hover: 'rgba(255, 255, 255, 0.28)',
        brand: 'rgba(62, 207, 142, 0.30)',
      }
    },
    fontFamily: {
      heading: ['Manrope', 'Outfit', 'sans-serif'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['"Source Code Pro"', '"JetBrains Mono"', 'monospace'],
    },
    borderRadius: {
      'card': '16px',
      'panel': '12px',
      'control': '8px',
      'pill': '9999px',
    }
  }
}
```
