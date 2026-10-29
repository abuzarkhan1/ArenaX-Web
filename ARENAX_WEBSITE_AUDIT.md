# ArenaX Website Audit & Design Context Report

> **Auditor Role**: Senior Front-End Auditor  
> **Repository**: `ArenaX-Web`  
> **Date of Audit**: October 29, 2026  
> **Target Production URL**: `https://marenax.site/` (also referenced as `https://marenax.com/`)  
> **Target File Generated**: `ARENAX_WEBSITE_AUDIT.md`  
> **Companion Folder**: `/audit-screenshots` (contains 34 desktop & mobile section/page screenshots)  
> **Strict Audit Directive**: Pure factual observation and rigorous inspection of existing code. No redesign implementations, modifications, or code refactorings are performed.

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose, Target Users & Value Proposition
* **What ArenaX Is**: ArenaX is a specialized mobile esports tournament and scrim platform tailored for the Pakistani competitive gaming community. While legacy meta tags reference PUBG Mobile, the actual application, feature blueprints (`Docs/ARENAX_FEATURE_INTEGRATION_PLAN.md`), and UI code are 100% focused on **Garena Free Fire** (Bermuda Battle Royale 48–50 player lobbies and Clash Squad 4v4 brackets).
* **Target Users**:
  1. *Competitive Mobile Gamers*: Free Fire players across Pakistan seeking structured, daily paid scrims and bracket tournaments with real cash prizes.
  2. *Squad Leaders & Captains*: Competitive teams needing frictionless roster management and automated match credential distribution.
  3. *Community Tournament Organizers / Guild Hosts*: Grassroots esports hosts running community scrims who require automated scoring and dedicated host commissions.
  4. *Community Scouts*: Referrers seeking recurring passive royalties from invited players' match winnings.
* **Main Value Proposition**:
  - **Zero Disputes**: Automated Google Gemini AI Vision (OCR) scoreboard processing that extracts in-game player names, kill counts, damage, and Booyah rankings in sub-second time, eliminating manual WhatsApp dispute delays.
  - **Guaranteed Liquidity & Solvency**: Strict Two-Wallet financial isolation (`Play Wallet` vs. `Winning Wallet`) operating on a transparent 1 AX Coin = 1 PKR cash parity, backed by a 50% lifetime platform rake circuit breaker and a 100% automated refund guarantee on cancelled matches.
  - **24-Hour Local Payouts**: Direct cashout processing to Pakistani mobile payment rails (JazzCash, EasyPaisa) and commercial banks with a 100 AX (PKR 100) threshold, protected by a secondary 6-digit cryptographic fund security password.

---

### 1.2 Tech Stack & Dependencies

```
Framework: React 18.3.1 (react, react-dom)
Bundler / Dev Server: Vite 8.3.5 (@vitejs/plugin-react 6.1.2)
Language: TypeScript 5.5.3 (tsconfig.app.json, tsconfig.node.json)
Styling Engine: Tailwind CSS 3.4.1 (PostCSS 8.4.35, Autoprefixer 10.4.18)
Class Utilities: clsx 2.1.1, tailwind-merge 3.4.0 (src/lib/utils.ts -> cn())
Iconography: lucide-react 0.344.0 (plus custom inline SVGs for TikTok, QR code, and curved dividers)
Theme System: next-themes 0.4.6 (wrapped in src/main.tsx, but dead in practice)
Analytics: react-ga4 2.1.0 (Tracking ID: G-TE33KZTQP0 in src/utils/analytics.ts)
```

#### Animation & 3D Libraries: Installed vs. Used Reality Check

| Library | Version in `package.json` | Installed | Actually Used in Active Site? | Location / Evidence |
|---|---|---|---|---|
| `lenis` | `^1.3.16` | Yes | **YES** | Initialized in `src/components/SmoothScroll.tsx`. Drives smooth wheel scrolling, anchor scrolling, and pauses via MutationObserver when body overflow is locked. |
| `motion` (Framer Motion v12) | `^12.23.26` | Yes | **NO (DEAD DEPENDENCY)** | Zero imports across the entire codebase. Only appears as text ("ProMotion 120Hz") in `Download.jsx`. |
| `@react-three/fiber` | `^8.18.0` | Yes | **NO (DEAD DEPENDENCY)** | Only imported in orphaned files `src/components/ui/Hero3DScene.tsx` and `dot-shader-background.tsx`. Neither is imported by `App.tsx` or any active component. |
| `@react-three/drei` | `^9.122.0` | Yes | **NO (DEAD DEPENDENCY)** | Only imported in unreferenced `src/components/ui/dot-shader-background.tsx`. |
| `three` | `^0.182.0` | Yes | **NO (DEAD DEPENDENCY)** | Only imported in unreferenced `Hero3DScene.tsx` and `dot-shader-background.tsx`. |
| `@supabase/supabase-js` | `^2.57.4` | Yes | **NO (DEAD DEPENDENCY)** | Zero imports in `src/`. Completely unused backend library. |
| `gsap` | - | No | **NOT PRESENT** | Not installed, not used. |
| `locomotive-scroll` | - | No | **NOT PRESENT** | Not installed, not used. |
| `spline` | - | No | **NOT PRESENT** | Not installed, not used. |
| `lottie` | - | No | **NOT PRESENT** | Not installed, not used. |

#### Actual Animation Mechanisms Running in Production:
1. **CSS Keyframe Animations** (`src/index.css`):
   - `animate-cine-unfurl` (`cineUnfurl`): 1.1s cubic-bezier(0.16, 1, 0.3, 1) entrance scale/blur for giant hero title.
   - `animate-cine-character` (`cineCharacterDrop`): 1.2s character drop and brightness unfurl.
   - `animate-cine-bloom` (`cineHaloBloom`): 1.4s pulsing radial character halo.
   - `animate-cine-dock` (`cineDockElevate`): 1.0s elevation for floating booking dock.
   - `animate-cine-top`, `animate-cine-badge-left`, `animate-cine-badge-right`: Slide-in badge transitions.
2. **Native JS Event Loops & Listeners**:
   - `Hero.jsx`: Mousemove parallax tilt (`mouseOffset.x`, `mouseOffset.y`) calculated on desktop viewports (>1024px).
   - `Hero.jsx`: RAF-throttled scroll parallax updating `scrollY` state for multi-plane background title displacement (`scrollY * 0.18`) and character float (`scrollY * 0.06`).
   - `TournamentModes.jsx`: BoundingClientRect 3D card tilt (`perspective(1000px) rotateX(...) rotateY(...)`) with dynamic radial sheen tracking mouse percentage (`px`, `py`).
   - `Features.jsx`: Web Audio API dynamic dual-oscillator synthesizer (55Hz sawtooth + 110Hz sine wave filtered through a 280Hz low-pass biquad filter) generating real-time cyber drone battle ambience.
   - `Features.jsx`: 3.5s `setInterval` driving live match telemetry event ticker.

---

### 1.3 Folder Structure

```
ArenaX-Web/
├── Docs/                                      # Feature blueprints & matrices
│   ├── ARENAX_FEATURE_INTEGRATION_PLAN.md
│   ├── Verified Feature Matrix
│   ├── WEBSITE_IMPLEMENTATION_PLAN.md
│   ├── WEBSITE_PRESERVATION_INVENTORY.md
│   ├── WEBSITE_REQUIRED_INFORMATION.md
│   └── WEBSITE_UI_UX_DESIGN_BLUEPRINT.md
├── audit-screenshots/                         # Complete section & page visual captures (34 images)
│   ├── 00-homepage-full-desktop.png
│   ├── 00-homepage-full-mobile.png
│   ├── 01-hero-desktop.png / mobile.png
│   ├── 02-app-experience-desktop.png / mobile.png
│   ├── 03-trust-bar-desktop.png / mobile.png
│   ├── 04-tournaments-desktop.png / mobile.png
│   ├── 05-ai-vision-desktop.png / mobile.png
│   ├── 06-wallet-desktop.png / mobile.png
│   ├── 07-organizers-desktop.png / mobile.png
│   ├── 08-how-it-works-desktop.png / mobile.png
│   ├── 09-scout-rewards-desktop.png / mobile.png
│   ├── 10-comparison-desktop.png / mobile.png
│   ├── 11-features-desktop.png / mobile.png
│   ├── 12-download-desktop.png / mobile.png
│   ├── 13-footer-desktop.png / mobile.png
│   ├── page-about-desktop.png / mobile.png
│   ├── page-contact-desktop.png / mobile.png
│   ├── page-faq-desktop.png / mobile.png
│   └── page-terms-desktop.png / mobile.png
├── public/                                    # Public static assets
│   ├── app-icon.png                           # 188 KB (JFIF JPEG, 1024x1024, unused duplicate)
│   ├── fav.ico                                # 14.9 KB (Multi-res icon)
│   ├── hero-character-tactical.png            # 164 KB (554x554 PNG transparent, Red Criminal)
│   ├── hero-character.png                     # 395 KB (682x1024 PNG transparent, Streetwear Rebel)
│   ├── logo.png                               # 188 KB (JFIF JPEG, 1024x1024, official logo)
│   ├── robots.txt                             # 406 B
│   └── sitemap.xml                            # 1.38 KB
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── dot-shader-background.tsx      # ORPHANED: 3D dot shader (unused)
│   │   │   ├── glowing-effect.tsx             # USED in Features.jsx: Mouse-proximity border glow
│   │   │   └── Hero3DScene.tsx                # ORPHANED: Three.js logo scene (unused)
│   │   ├── About.jsx                          # Page: About Us & Founding Story
│   │   ├── AIVisionShowcase.jsx               # Home Sec 05: OCR pipeline & Points Calculator
│   │   ├── AppExperienceShowcase.jsx          # Home Sec 02: Smartphone UI & telemetry
│   │   ├── Contact.jsx                        # Page: Helpdesk channels & mock form
│   │   ├── Download.jsx                       # Home Sec 12: APK direct download & QR code
│   │   ├── FAQ.jsx                            # Page: 12 Accordions & helpdesk card
│   │   ├── Features.jsx                       # Home Sec 11: 6 Cards, audio synth, telemetry
│   │   ├── Footer.jsx                         # Global: Footer navigation & legal links
│   │   ├── Hero.jsx                           # Home Sec 01: Multi-layered hero with parallax
│   │   ├── HowItWorks.jsx                     # Home Sec 08: 6-step player journey
│   │   ├── LeaderboardTiers.jsx               # ORPHANED (570 lines, 35 KB): Rank ladder (unused)
│   │   ├── Navbar.jsx                         # Global: Header navigation bar & mobile drawer
│   │   ├── OrganizerProgram.jsx               # Home Sec 07: Host capabilities & earnings simulator
│   │   ├── PlatformComparison.jsx             # Home Sec 10: ArenaX vs WhatsApp scrims table
│   │   ├── ScoutRewards.jsx                   # Home Sec 09: 2% Winner royalties & store preview
│   │   ├── SEO.tsx                            # Utility: Dynamic head meta & Schema.org injection
│   │   ├── SmoothScroll.tsx                   # Utility: Lenis smooth scroll engine
│   │   ├── Terms.jsx                          # Page: 12 Legal sections & Pakistan arbitration
│   │   ├── TournamentModes.jsx                # Home Sec 04: Bermuda 50P & CS 4v4 switcher
│   │   ├── TrustBar.jsx                       # Home Sec 03: Editorial statement & 4 trust modules
│   │   └── WhatsAppButton.jsx                 # Global: Floating WhatsApp button
│   ├── lib/
│   │   └── utils.ts                           # cn() helper using clsx + tailwind-merge
│   ├── utils/
│   │   └── analytics.ts                       # GA4 initialization & event dispatcher
│   ├── App.tsx                                # Main router / page switcher component
│   ├── index.css                              # Tailwind directives, fonts @import, cine utilities
│   ├── main.tsx                               # Entry point, NextThemes provider, GA4 init
│   └── vite-env.d.ts
├── index.html                                 # Root HTML, SEO tags, JSON-LD Schema
├── package.json
├── tailwind.config.js                         # Custom color tokens & glow shadows
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                             # Vite configuration with '@' alias
```

---

### 1.4 Build, Deploy & Performance Constraints
* **Build System**: Vite 8.3.5 compiles clean in ~2.1 seconds (`dist/assets/index-RlIidG0v.js` = 459 kB raw / 127 kB gzip; `dist/assets/index-DBNbMFEt.css` = 58.7 kB raw / 10.6 kB gzip).
* **Render-Blocking External Resource**: Line 1 of `src/index.css` imports Google Fonts via `@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');`. This blocks CSSOM construction and delays First Contentful Paint (FCP).
* **Missing Assets Causing 404s**:
  - `index.html` line 26 specifies `<meta property="og:image" content="https://marenax.site/og-image.jpg" />`. `og-image.jpg` does not exist in `public/`.
  - `index.html` line 37 specifies `<meta name="twitter:image" content="https://marenax.site/twitter-image.jpg" />`. `twitter-image.jpg` does not exist in `public/`.
* **Mislabeled Image Formats**: `public/logo.png` and `public/app-icon.png` have `.png` file extensions but contain `JFIF` headers (`ffd8ffe000104a464946...`). They are standard lossy JPEGs lacking an alpha channel.

---

## 2. PAGES & ROUTES

The application does **NOT** use `react-router-dom`. Routing is implemented via internal React state (`currentPage`) inside `src/App.tsx`, synchronized with the browser History API (`window.history.pushState` and `window.addEventListener('popstate')`).

| Route Path | Component Name | Exact File Path | Page Title (`<title>`) | Canonical Tag | Purpose / Scope |
|---|---|---|---|---|---|
| `/` | `Hero`, `AppExperienceShowcase`, `TrustBar`, `TournamentModes`, `AIVisionShowcase`, `WalletSection`, `OrganizerProgram`, `HowItWorks`, `ScoutRewards`, `PlatformComparison`, `Features`, `Download` | `src/App.tsx` (mounting 12 components) | `ArenaX - Premier Free Fire Tournament Platform in Pakistan \| Win Real Cash` | `https://marenax.com/` | Comprehensive landing page covering client showcase, formats, AI OCR, Two-Wallet economics, organizer simulator, and APK download. |
| `/about` | `About` | `src/components/About.jsx` | `About ArenaX - Pakistan's Leading Mobile Esports Platform \| Our Story` | `https://marenax.com/about` | Brand narrative, gamer origins, 4 core value pillars, fair play commitment, and download CTA. |
| `/faq` | `FAQ` | `src/components/FAQ.jsx` | `FAQ - Frequently Asked Questions \| ArenaX Help Center` | `https://marenax.com/faq` | 12 expandable accordions covering wallets, OCR, rules, refunds, P2P transfers, organizer requirements, and support desk. |
| `/contact` | `Contact` | `src/components/Contact.jsx` | `Contact ArenaX - 24/7 Player & Organizer Support Desk` | `https://marenax.com/contact` | 3 Contact channels (Email, WhatsApp, Live Chat), client-side message form, organizer partnerships card, and social links. |
| `/terms` | `Terms` | `src/components/Terms.jsx` | `Terms & Conditions - ArenaX Rules, Fair Play & User Agreement` | `https://marenax.com/terms` | 12 legal clauses covering eligibility, combat scoring, Two-Wallet rules, zero-tolerance cheating, and Pakistan arbitration. |

### Routing Deficiencies & Inconsistencies:
1. **Server SPA Fallback Dependency**: Direct navigation to `/about`, `/faq`, `/contact`, or `/terms` on a static web server without URL rewrite rules (e.g. Apache `.htaccess` or Nginx `try_files $uri /index.html`) produces a 404 HTTP error.
2. **Canonical Conflict**: `index.html` hardcodes `<link rel="canonical" href="https://marenax.site/" />`, while `App.tsx` and `SEO.tsx` dynamically overwrite the canonical link to `https://marenax.com/` (or subpaths). This sends conflicting domain signals to web crawlers.
3. **Missing Legal Target Routes**: Footer links for "Privacy Policy", "100% Refund Policy", and "Zero-Tolerance Fair Play" all execute `scrollToTop('terms')`. There are no dedicated `/privacy`, `/refund`, or `/fair-play` routes or page sections.

---

## 3. SECTION-BY-SECTION MAP

Every section across the homepage and standalone pages is mapped below in strict top-to-bottom rendering order.

---

### Global Header: Navigation Bar
* **Order / Name**: Global Persistent Navigation Bar
* **File Path & Component**: `src/components/Navbar.jsx` (`Navbar`)
* **Purpose**: Fixed top navigation, brand identity, section scrolling, standalone page routing, and primary APK download trigger.
* **Layout**: Fixed top bar (`fixed top-0 left-0 right-0 z-50`), flex row justify-between items-center. Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Height: `h-20` (80px).
* **Text Content**:
  - Logo: `Arena` + emerald `X` | Subtext: `ESPORTS PLATFORM`
  - Desktop Navigation Items: `Home`, `Tournaments`, `Vision Engine`, `Organizers`, `How It Works`, `FAQs`
  - Secondary Page Pills (Mobile Drawer): `About Us`, `Contact Us`, `Terms & Conditions`
  - Primary CTA Button: `Download App` (Desktop) / `App` (Mobile short) / `Download ArenaX App` (Mobile Drawer)
* **Media Used**:
  - `/logo.png`: 40x40px container, 1024x1024px JFIF file, 188,941 bytes.
  - Icons (`lucide-react`): `Download` (w-4 h-4), `Menu` (size 22), `X` (size 22).
* **Colors**:
  - Background: `bg-[#101214]/85 backdrop-blur-2xl`
  - Border: `border-b border-[#30363A]`
  - Brand Accent: `#00C878` (logo X, active link text, download button bg)
  - Hover Accent: `#00A865`
  - Text: Active `#00C878`, Inactive `#A1A1AA`, Hover `#FFFFFF`
* **Typography**:
  - Brand Logo: `font-heading font-extrabold text-2xl tracking-tight`
  - Subtitle: `text-[10px] uppercase font-bold tracking-widest`
  - Links: `text-sm font-medium` (Active: `font-bold`)
  - CTA Button: `text-sm font-bold`
* **Animations / Interactions**:
  - Hamburger toggle opens animated drawer (`animate-in slide-in-from-top-2 duration-200`).
  - Mobile menu toggles body scroll lock (`document.body.style.overflow = 'hidden'`).
  - Section links execute smooth scroll with 120ms timeout when navigating across pages.
* **Responsive Behavior**:
  - Desktop (≥1024px): Desktop link row visible, hamburger button hidden.
  - Mobile (<1024px): Desktop links hidden, hamburger button visible; opens full-width drawer with 48px minimum touch targets.
* **Auditor Assessment**: High quality, clean alignment, matches the hero's aesthetic with proper backdrop blur and branded emerald CTA.

---

### Homepage — Section 01: Hero
* **Order / Name**: 01. Hero Section
* **File Path & Component**: `src/components/Hero.jsx` (`Hero`)
* **Purpose**: Immediate platform positioning, character customizer preview, value proposition, and primary download conversion dock.
* **Layout**: Full-screen vertical flex layout (`min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-16 sm:pb-24 relative overflow-hidden`). Central stage with giant background typography layered behind a character cutout, anchored by a bottom floating dock.
* **Text Content**:
  - Live Platform Badge: `OFFICIAL TOURNAMENT CLIENT • v2.6.0`
  - Top Feature Shortcuts: `Bermuda 50-Player`, `Clash Squad 4v4`, `AI Vision Engine`, `24H Cashouts`
  - Character Switcher Buttons: `Criminal`, `Rebel`
  - Giant Title: `ARENAX`
  - Left Badge: `SEASON 4` | `PK Esports Circuit`
  - Right Badge: `[2026]` | `Battlefield Edition`
  - Welcome Bonus Pill: `25 AX FREE WELCOME BONUS FOR NEW PLAYERS`
  - Headline: `Pakistan's Premier Free Fire Tournament Platform`
  - Subhead: `Daily Bermuda Battle Royale & Clash Squad 4v4 scrims. Verified by automated neural vision, with instant cash withdrawals to JazzCash & EasyPaisa.`
  - Primary CTA: `Download Direct APK (v2.6)`
  - Secondary CTA: `Explore Tournament Modes`
  - 3 Metric Value Chips:
    1. `VISION ENGINE OCR`: `Sub-Second Settlement`
    2. `SEASONAL PRIZE POOL`: `250,000 AX Cash Pool`
    3. `CANCELLATION POLICY`: `100% Automated Refund`
* **Media Used**:
  - `/hero-character-tactical.png` (Red Criminal): 554x554px transparent PNG, 164,023 bytes.
  - `/hero-character.png` (Streetwear Rebel): 682x1024px transparent PNG, 395,179 bytes.
  - Icons (`lucide-react`): `Trophy`, `Flame`, `Zap`, `Shield`, `Sparkles`, `Download`, `ChevronRight`, `CheckCircle2`.
  - Bottom SVG Curve: Custom organic quadratic Bezier path (`M0,80 Q720,12 1440,80`) with `#heroCurveGlow` linear gradient stroke.
* **Colors**:
  - Background: `#101214`
  - Ambient Glows: Center `#00C878/10` (blur 140px), Left `#00D2FF/5`, Right `#F59E0B/5`
  - Character Halos: Tactical `bg-[#EF4444]/30`, Rebel `bg-[#00C878]/30`
  - Giant Title Gradient: `bg-gradient-to-b from-white/35 via-white/10 to-transparent`
  - Dock: `.premium-card` (`linear-gradient(180deg, rgba(26, 30, 34, 0.85) 0%, rgba(18, 21, 24, 0.95) 100%)`)
* **Typography**:
  - Giant Title: `text-[19vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] font-black uppercase font-heading leading-none`
  - Headline: `font-heading font-extrabold text-xl sm:text-2xl md:text-3xl`
  - Subhead: `text-xs sm:text-sm text-[#A1A1AA] leading-relaxed`
  - CTAs: `font-black text-sm sm:text-base`
* **Animations / Interactions**:
  - Scroll Parallax: Title moves at `scrollY * 0.18px`, Character moves at `scrollY * 0.06px`.
  - Mouse Parallax: Character tilts `±10px` horizontal, `±7.5px` vertical based on cursor.
  - Character Switcher: Toggles active image, aura halo, and button styles dynamically.
  - CSS Keyframe Entrance: `animate-cine-unfurl`, `animate-cine-character`, `animate-cine-bloom`, `animate-cine-dock`, `animate-cine-top`.
* **Responsive Behavior**:
  - Desktop: Full multi-plane parallax and side badges active.
  - Mobile (<640px): Side badges hidden; character height scales down (`max-h-[340px]`); meta tags scroll horizontally without scrollbar; dock padding reduces to `p-5`.
* **Auditor Assessment**: Flawless visual anchor and gold standard of the website. High depth, restrained cyberpunk aesthetic, sharp contrast, and fast performance.

---

### Homepage — Section 02: App Experience Showcase
* **Order / Name**: 02. Inside the Mobile Client (App Experience Showcase)
* **File Path & Component**: `src/components/AppExperienceShowcase.jsx` (`AppExperienceShowcase`)
* **Purpose**: Showcase the native Android mobile app workflow (Match Lobby, AI Vision OCR Scanner, Two-Vault Wallet) via an interactive simulated smartphone.
* **Layout**: Grid layout (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`). Top telemetry row, central headline, flanked 12-column layout (`lg:col-span-4` left cards, `lg:col-span-4` center phone, `lg:col-span-4` right cards).
* **Text Content**:
  - Header Eyebrow: `INSIDE THE MOBILE CLIENT`
  - Headline: `Engineered For Mobile Esports` (with `text-gradient-emerald`)
  - 4 Telemetry Chips: `SCRIM TIME: 18–22 MIN`, `BOOYAH FINISH: +20 PTS`, `FRAG KILL: +5 PTS`, `CASHOUT SPEED: < 24 HOURS`
  - 4 Chapter Cards:
    - Chapter 01: `Automated Room Credentials Lock` (Bermuda 50P)
    - Chapter 02: `Sub-Second Scoreboard OCR Scanner` (Vision Engine)
    - Chapter 03: `Strict Two-Vault Financial Isolation` (Two-Vault)
    - Chapter 04: `Automated Cancellation Refunds` (100% Policy)
  - Interactive Phone Tabs: `Match Lobby`, `OCR Scanner`, `Two-Vault Wallet`
  - Phone UI Content:
    - Profile Header: `AX_SniperGod` | `Grandmaster V` | `Balance: 1,450 AX`
    - Match Tab: `Bermuda Championship #402`, `Room ID: 884 921`, `Password: arena77`, Copy button, `48 / 50 Players (96%)`.
    - OCR Tab: `🏆 BOOYAH #1 PLACE`, `14 Kills Detected • 90 PTS`, `UID: 582910482`, `Instant Payout: +850 AX Cash`.
    - Wallet Tab: `Play Wallet: 250 AX`, `Winning Wallet: 3,420 AX Cash`, `✓ JazzCash`, `✓ EasyPaisa`, `✓ Bank Wire`.
* **Media Used**:
  - `/logo.png`: 32x32px emblem in telemetry header.
  - Icons (`lucide-react`): `Smartphone`, `Zap`, `Trophy`, `ShieldCheck`, `Copy`, `Check`, `Eye`, `Wallet`, `Flame`, `Download`, `Lock`.
  - **No Real Screenshot Asset Used**: The smartphone mockup is constructed 100% in HTML/CSS/Tailwind code with simulated UI cards.
* **Colors**:
  - Phone Bezel: `bg-gradient-to-b from-[#2A3035] via-[#1A1F24] to-[#101417]`
  - OLED Screen: `#0E1113`
  - Active Tab Highlight: `#00C878`
  - Text Highlights: Cyan `#00D2FF`, Amber `#F59E0B`, Emerald `#00C878`
* **Typography**:
  - H2 Title: `font-heading font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight`
  - Chapter Titles: `font-heading font-bold text-base`
  - In-Phone Microcopy: `text-[8px]`, `text-[9px]`, `text-[10px]`, `text-xs font-black`
* **Animations / Interactions**:
  - Interactive tab switcher toggles phone screen state with `animate-in fade-in duration-200`.
  - Clicking chapter cards switches the phone screen to the corresponding tab.
  - Interactive "Copy" button writes credentials to clipboard and temporarily switches to "Copied" checkmark.
* **Responsive Behavior**:
  - Desktop: 3-column layout (Left Cards -> Center Phone -> Right Cards).
  - Mobile (<1024px): Stacked vertically with Phone on top (`order-1`), Left Cards second (`order-2`), Right Cards third (`order-3`). Telemetry row wraps into a 2x2 grid.
* **Auditor Assessment**: High interactive utility and strong visual presentation. However, relying entirely on a code-simulated mockup rather than verified high-res mobile app screenshots reduces authenticity.

---

### Homepage — Section 03: Trust Bar
* **Order / Name**: 03. Sanctioned Platform Protocol (Trust Bar)
* **File Path & Component**: `src/components/TrustBar.jsx` (`TrustBar`)
* **Purpose**: Institutional trust anchor presenting four core operational pillars with technical specs.
* **Layout**: Full-width container (`py-20 sm:py-28 bg-[#0D0F11] border-y border-white/[0.08]`). Central editorial headline followed by a 4-column responsive card grid.
* **Text Content**:
  - Protocol Pill: `SANCTIONED PLATFORM PROTOCOL • EDITION 2026`
  - Headline: `ENGINEERED FOR HIGH-STAKES ESPORTS`
  - Subhead: `Eliminating disputed screenshot reviews, delayed payouts, and unfair lobby rosters with automated computer vision and verified local banking rails.`
  - System Telemetry Line: `[ SYSTEM: ARENAX v2.6.0 ] • [ OCR ENGINE: SUB-SECOND ] • [ CIRCUIT: PK ESPORTS ]`
  - 4 Statement Modules:
    1. `/01 Neural Vision Engine`: Sub-Second OCR Verification | Automated OCR | Proprietary computer vision reads scoreboards automatically. | Spec: `Sub-second match settlement`
    2. `/02 24-Hour Local Payouts`: JazzCash & EasyPaisa Direct | Direct Escrow | Prize winnings transfer directly within 24 hours. | Spec: `Instant local currency transfer`
    3. `/03 Two-Wallet Security`: Deposit & Winning Segregation | 100% Escrow | Entry balances and winnings remain completely isolated. | Spec: `Automated match refunds`
    4. `/04 Anti-Cheat & Fair Play`: Zero-Tolerance Protocol | Strict Policy | UID verification and lifetime hardware bans for emulators. | Spec: `Verified mobile rosters only`
  - Bottom Callout: `Ready to enter daily verified scrims? Explore 48-player Bermuda and tactical 4v4 Clash Squad formats.` | Button: `View Tournament Brackets`
* **Media Used**:
  - Icons (`lucide-react`): `Zap`, `Smartphone`, `RefreshCw`, `ShieldCheck`, `CheckCircle2`, `ArrowRight`.
  - CSS Background Grid: Inline SVG radial linear gradient pattern (`48px 48px`).
* **Colors**:
  - Section Background: `#0D0F11` (slight variant from `#101214`)
  - Accent #01: `#00C878` (Emerald)
  - Accent #02: `#00D2FF` (Cyan)
  - Accent #03: `#F59E0B` (Amber)
  - Accent #04: `#EF4444` (Coral Red)
* **Typography**:
  - Headline: `font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight`
  - Big Watermark Numerals: `font-heading font-black text-7xl sm:text-8xl opacity-[0.06]`
  - Specs / Monospace: `font-mono text-[10px] sm:text-[11px] uppercase`
* **Animations / Interactions**:
  - Hovering a card triggers `-translate-y-1 scale-[1.02]` elevation, brightens border to `border-white/30`, and increases watermark opacity to `0.14`.
* **Responsive Behavior**:
  - Desktop: 4 cards in one horizontal row.
  - Tablet: 2x2 grid (`sm:grid-cols-2`).
  - Mobile: Single column stack. Telemetry brackets wrap text cleanly.
* **Auditor Assessment**: Matches the Hero's editorial caliber with oversized typography, technical monospace badges, and clean contrast.

---

### Homepage — Section 04: Tournament Modes
* **Order / Name**: 04. Battle for the Booyah (Tournament Modes)
* **File Path & Component**: `src/components/TournamentModes.jsx` (`TournamentModes`)
* **Purpose**: Showcase the two primary Free Fire tournament formats (Bermuda 50P and Clash Squad 4v4) with interactive format switchers and bracket stages.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214]`). Centered mode switcher tabs leading into a 12-column card split (`lg:col-span-7` text & rules, `lg:col-span-5` interactive preview card).
* **Text Content**:
  - Category Pill: `VERIFIED FREE FIRE TOURNAMENT FORMATS`
  - Headline: `Battle for the Booyah`
  - Mode Switcher: `Bermuda Battle Royale (50P)` vs `Clash Squad 4v4 (Brackets)`
  - Tab 1 (Bermuda):
    - Subhead: `Drop into Bermuda in Solo, Duo, or Squad formats. Compete against 48–50 verified players for real cash prize pools. Transparent scoring with 20 points for Booyah and 5 points per kill.`
    - Format Presets: Solo (48P, 50 AX, 2,160 AX Pool), Duo (24 Teams, 100 AX), Squad (12 Squads, 200 AX).
    - Progress Bar: `44 / 48 Booked (91%)` | `⚡ Only 4 slots remaining for 9:00 PM scrim`
    - Button: `Join Next Bermuda Scrim`
  - Tab 2 (Clash Squad):
    - Subhead: `High-intensity squad vs squad tactical combat. Compete in single-elimination tournament brackets with automated round progression from Quarterfinals all the way to the Grand Finals.`
    - Stage Selector: `Quarterfinals`, `Semifinals`, `Grand Final`
    - Bracket Matchups: Falcons (7) vs Delta (3), Shadows (7) vs Apex (5), Vipers (7) vs Storm (2), Kings (7) vs Toxic (4).
    - Final Prize: `4,000 AX First Place Cash`
    - Button: `Enter 4v4 Bracket`
* **Media Used**:
  - Icons (`lucide-react`): `Trophy`, `Swords`, `Users`, `KeyRound`, `ShieldAlert`, `Tv`, `ArrowRight`, `CheckCircle2`.
* **Colors**:
  - Bermuda Accent: `#00C878`, Button Gradient: `from-[#00E58A] to-[#00C878]`
  - Clash Squad Accent: `#00D2FF`, Button Gradient: `from-[#00D2FF] to-[#00A8DC]`
  - Background Cards: `#121417/95` and `.premium-card-cyan`
* **Typography**:
  - Headline: `font-heading font-extrabold text-3xl md:text-5xl tracking-tight`
  - Format Titles: `font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl`
* **Animations / Interactions**:
  - Interactive tab switches between Bermuda and Clash Squad.
  - Interactive sub-format tabs switch Solo / Duo / Squad data.
  - Interactive stage tabs switch Quarters / Semis / Finals bracket tree.
  - 3D perspective mouse tilt (`cardTilt.y`, `cardTilt.x`) with dynamic specular radial sheen tracking cursor on desktop.
* **Responsive Behavior**:
  - Desktop: 2-column split (Left text -> Right interactive card).
  - Mobile (<1024px): Stacked single-column. 3D mouse tilt disabled on touch screens (<1024px).
* **Auditor Assessment**: Strong interactive depth and clear differentiation between Free Fire formats. Style matches Hero well, though introducing `#00E58A` and `#00A8DC` creates minor gradient token proliferation.

---

### Homepage — Section 05: AI Vision Showcase
* **Order / Name**: 05. Zero Disputes (AI Vision Showcase)
* **File Path & Component**: `src/components/AIVisionShowcase.jsx` (`AIVisionShowcase`)
* **Purpose**: Explain the proprietary Gemini AI Vision OCR scoreboard verification engine and provide an interactive combat scoring simulator.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). 2-column grid (`lg:grid-cols-12`, with `lg:col-span-6` left and `lg:col-span-6` right).
* **Text Content**:
  - Category Pill: `ARENAX VISION ENGINE`
  - Headline: `Zero Disputes. AI-Verified Results.`
  - Subhead: `No more waiting hours for scrim hosts to review screenshots. ArenaX uses proprietary Neural Computer Vision to settle scoreboards automatically within seconds.`
  - Left Card (Verification Pipeline):
    - Title: `AI Vision Match Verification Pipeline`
    - Step 1: `Screenshot Submission` (In-app post-match upload)
    - Step 2: `Neural Scoreboard OCR Scanner` (IGN, UID, kills, damage detection)
    - Step 3: `Automated Winning Wallet Payout` (Instant authoritative tally)
    - Anti-Tamper Badge: `Protected against Photoshop tampering, duplicate image re-use, and altered kill numbers.`
  - Right Card (Combat Points Calculator):
    - Title: `Combat Points Calculator`
    - Placement Buttons: `Booyah (#1 Place)` (+20 PTS) vs `Top 2–50 Finish` (0 PTS)
    - Kill Slider: `0 to 20 Kills` (5 PTS per frag)
    - Total Output Box: Live calculated score (e.g. `50 PTS`) and projected tier badge (`Gold Tier`, `Diamond Tier`, `Heroic Tier`, `Grandmaster Contender`).
* **Media Used**:
  - Icons (`lucide-react`): `Eye`, `ShieldCheck`, `Zap`, `Sliders`, `CheckCircle`, `Crosshair`.
* **Colors**:
  - Pipeline Card: `.premium-card` with `#00C878` step numerals.
  - Calculator Card: `.premium-card-accent` (`linear-gradient(180deg, rgba(0, 200, 120, 0.08) 0%, rgba(18, 21, 24, 0.95) 100%)`)
  - Slider Track: `bg-[#101214] accent-[#00C878]`
* **Typography**:
  - Title: `font-heading font-extrabold text-3xl md:text-5xl`
  - Score Display: `font-heading font-black text-4xl md:text-5xl`
* **Animations / Interactions**:
  - Placement toggle button recalculates score in real-time.
  - HTML5 range input updates kills and projected rank badge dynamically.
* **Responsive Behavior**:
  - Desktop: 2 equal-width cards side by side.
  - Mobile: Stacked cards with full-width slider and buttons.
* **Auditor Assessment**: High utility and directly solves the primary user pain point (disputed WhatsApp scoreboards). Matches Hero theme cleanly.

---

### Homepage — Section 06: Two-Wallet Financial Security
* **Order / Name**: 06. Two-Wallet Security (Wallet Section)
* **File Path & Component**: `src/components/WalletSection.jsx` (`WalletSection`)
* **Purpose**: Explain the financial segregation between tournament deposit balances and withdrawable cash prizes.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). Top header, 2-column dual-vault grid (`md:grid-cols-2`), and a bottom gateway strip.
* **Text Content**:
  - Category Pill: `TWO-WALLET FINANCIAL SECURITY`
  - Headline: `Zero Abuse. Guaranteed Liquidity.`
  - Subhead: `ArenaX operates a strict Two-Vault architecture. Tournament entry balances are isolated from verified prize money, guaranteeing transparent payouts at 1 AX = 1 PKR parity.`
  - Vault 1 (Play Wallet):
    - Subtitle: `Tournament Registration Balance` | Tag: `Non-Withdrawable`
    - Description: Holds deposits via JazzCash/EasyPaisa and welcome bonuses. Used strictly for entry fees.
    - Bullet 1: `Instant registration deduction with zero processing surcharge.`
    - Bullet 2: `100% automated refund to Play Wallet if match is cancelled.`
    - Bullet 3: `P2P coin transfer between squadmates with daily velocity safeguards.`
    - Footer: `Minimum Deposit: PKR 50` | `Manual Admin Slip Verification`
  - Vault 2 (Winning Wallet):
    - Subtitle: `1 AX Coin = 1 PKR Cash` | Tag: `100% Withdrawable`
    - Description: Holds cash prize winnings, milestone cash bonuses, and Scout royalties.
    - Bullet 1: `Direct withdrawal to JazzCash, EasyPaisa, or Pakistani Bank Accounts.`
    - Bullet 2: `Secondary Fund Security Password required before withdrawal authorization.`
    - Bullet 3: `Minimum cashout threshold: 100 AX Coins (PKR 100).`
    - Footer: `Payout SLA: Within 24 Hours` | `Protected by Cryptographic Escrow`
  - Bottom Strip: `Secondary Fund Security Password` | `JazzCash` | `EasyPaisa` | `Bank Payout`
* **Media Used**:
  - Icons (`lucide-react`): `Wallet`, `ShieldCheck`, `Lock`, `ArrowDownLeft`, `ArrowUpRight`, `CheckCircle2`.
* **Colors**:
  - Play Wallet: `.premium-card-cyan` with Cyan `#00D2FF` accents.
  - Winning Wallet: `.premium-card-accent` with Emerald `#00C878` accents.
  - Bottom Strip: `.premium-card` with Emerald `#00C878` lock icon.
* **Typography**:
  - Headline: `font-heading font-extrabold text-3xl md:text-5xl`
  - Vault Titles: `font-heading font-bold text-xl`
* **Animations / Interactions**: Standard CSS card hover effects (`premium-card:hover`).
* **Responsive Behavior**:
  - Desktop: 2-column grid; bottom gateway pills align horizontally.
  - Mobile: Stacked 1-column; gateway pills wrap into 3 equal-width boxes.
* **Auditor Assessment**: Clear financial communication that establishes trust. The color coding (Cyan for Play, Emerald for Winning) provides helpful visual segregation.

---

### Homepage — Section 07: Decentralized Organizer Program
* **Order / Name**: 07. Organizer Program
* **File Path & Component**: `src/components/OrganizerProgram.jsx` (`OrganizerProgram`)
* **Purpose**: Showcase tournament hosting tools and provide an interactive tournament economics simulator for community organizers.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). 4-card feature grid (`lg:grid-cols-4`), followed by an interactive simulator split into a 12-column card (`lg:col-span-7` sliders, `lg:col-span-5` live economics summary).
* **Text Content**:
  - Category Pill: `DECENTRALIZED ORGANIZER PROGRAM`
  - Headline: `Host, Manage & Earn as an Organizer`
  - 4 Capability Cards:
    1. `Full Match Control`: Configure formats, slot caps (10–50), and custom banners.
    2. `Automated AI Verification`: Zero manual scoring overhead; Vision Engine scans scoreboards.
    3. `Dedicated Host Wallet`: Earn 0–20% commission, segregated from player prizes.
    4. `Verified Host Ratings`: 1–5 star reviews restricted to verified match participants.
  - Simulator Sliders & Presets:
    - Presets: `Duo Scrim (24p • 50 AX)`, `Bermuda Major (48p • 100 AX)`, `Pro Grand Slam (48p • 500 AX)`.
    - Slider 1: `Participants` (10 to 50 Players)
    - Slider 2: `Entry Fee Per Player` (50 to 500 AX / PKR)
    - Slider 3: `Organizer Commission Cut` (0% to 20%)
  - Summary Card: Total Entry Revenue, Platform Fee (10%), Guaranteed Prize Pool (70–90%), Net Organizer Payout (PKR / Match).
  - Button: `Apply to Become an Organizer`
* **Media Used**:
  - Icons (`lucide-react`): `UserCheck`, `Sliders`, `DollarSign`, `ArrowRight`, `ShieldCheck`, `Star`, `Settings`.
* **Colors**:
  - Background: `#101214`
  - Calculator Background: `.premium-card-accent`
  - Net Payout Box: `bg-gradient-to-br from-[#00C878]/20 to-[#101214] border-[#00C878]/40`
* **Typography**:
  - Title: `font-heading font-extrabold text-3xl md:text-5xl`
  - Net Payout Number: `font-heading font-black text-3xl md:text-4xl text-white`
* **Animations / Interactions**: Real-time slider calculations based on official backend settlement logic (`totalRevenue * hostCutPercent`). Preset buttons dynamically update all 3 slider states.
* **Responsive Behavior**:
  - Desktop: 4 cards in one row; simulator is a 7/5 column split.
  - Mobile: 4 cards stack in 1 or 2 columns; simulator stacks sliders above summary card.
* **Auditor Assessment**: High interactive engagement. The mathematical transparency of the 10% platform fee, 0-20% organizer cut, and 70-90% prize pool provides strong operational credibility.

---

### Homepage — Section 08: How It Works
* **Order / Name**: 08. The Road to Booyah (How It Works)
* **File Path & Component**: `src/components/HowItWorks.jsx` (`HowItWorks`)
* **Purpose**: Step-by-step onboarding walkthrough guiding players from APK download to withdrawal.
* **Layout**: Section container (`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-white/5`). Step jump bar at top, 6-card grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), and a bottom CTA button.
* **Text Content**:
  - Category Pill: `SEAMLESS PLAYER EXPERIENCE`
  - Headline: `The Road to Booyah` (with `text-gradient-emerald`)
  - Subhead: `From downloading the APK to 24-hour JazzCash/EasyPaisa cash withdrawals in 6 transparent, dispute-free steps.`
  - 6 Sequential Steps:
    - Step 01: `Download & Install APK` | Highlight: `25 AX Welcome Bonus`
    - Step 02: `Link Your Free Fire UID` | Highlight: `Cryptographic UID Check`
    - Step 03: `Assemble Your Squad` | Highlight: `Instant 6-Digit Codes`
    - Step 04: `Register for Tournaments` | Highlight: `Daily Scrims 24/7`
    - Step 05: `Drop & Dominate` | Highlight: `Secure In-App Unlock`
    - Step 06: `Vision OCR & Instant Cashout` | Highlight: `1 AX = 1 PKR Cash`
  - Bottom CTA: `Start Your Competitive Journey`
* **Media Used**:
  - Icons (`lucide-react`): `Download`, `UserPlus`, `Users`, `Swords`, `Trophy`, `Banknote`, `ArrowRight`.
* **Colors**:
  - Ambient Glows: Left `#00C878/5`, Right `#00D2FF/5`
  - Active Step Bar: `bg-gradient-to-r from-[#00C878] to-[#00D2FF]`
  - Number Watermarks: `text-white/15 hover:text-[#00C878]/40`
* **Typography**:
  - Headline: `font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight`
  - Step Numbers: `font-heading font-black text-3xl`
  - Card Titles: `font-heading font-bold text-base sm:text-lg`
* **Animations / Interactions**: Step jump bar updates `activeStepIndex`. Selected card receives a highlighted top gradient bar and emerald border.
* **Responsive Behavior**:
  - Desktop: 3x2 grid.
  - Mobile: Single-column stack. Step jump bar scrolls horizontally with `no-scrollbar`.
* **Auditor Assessment**: Well-structured, legible, and directly addresses onboarding friction.

---

### Homepage — Section 09: Scout Rewards & Digital Store
* **Order / Name**: 09. Scout Royalties & Digital Store
* **File Path & Component**: `src/components/ScoutRewards.jsx` (`ScoutRewards`)
* **Purpose**: Detail the 2% community referral royalty engine and preview in-game digital diamond redemptions.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). 12-column card split (`lg:col-span-7` Scout Engine, `lg:col-span-5` Store Preview).
* **Text Content**:
  - Category Pill: `COMMUNITY REWARDS & DIGITAL STORE`
  - Headline: `Earn with Scout Royalties & Digital Store`
  - Left Card (Scout Program):
    - Title: `Scout Community Royalty Engine` | Subtext: `Funded 100% from platform rake with zero player deduction`
    - Stat 1: `25 AX` (Referee Starter Gift in Play Wallet)
    - Stat 2: `2% Cash` (Winner Royalty from referee tournament wins)
    - Stat 3: `10,000+` (Cash bonuses as referees rank up)
    - Solvency Note: `ArenaX enforces a mathematical 50% lifetime rake circuit breaker that guarantees platform liquidity.`
    - Button: `Get Your Scout Code in App`
  - Right Card (Store Preview):
    - Title: `In-App Digital Rewards Store`
    - Item 1: `Free Fire 100 + 10 Diamonds` (190 AX Coins)
    - Item 2: `Free Fire 520 Diamonds Top-up` (950 AX Coins)
    - Item 3: `Weekly Diamond Membership` (450 AX Coins)
    - SLA: `Delivered digitally to your registered player account within 2 hours.`
* **Media Used**:
  - Icons (`lucide-react`): `Gift`, `ShoppingBag`, `Percent`, `Award`, `ArrowRight`.
* **Colors**:
  - Scout Card: `.premium-card`
  - Store Card: `.premium-card-amber` with Amber `#F59E0B` borders and tags.
* **Typography**:
  - Title: `font-heading font-extrabold text-3xl md:text-5xl`
  - Stats: `font-heading font-black text-2xl`
* **Animations / Interactions**: Standard hover elevations on buttons and cards.
* **Responsive Behavior**: Stacks vertically on mobile/tablet; side-by-side on desktop.
* **Auditor Assessment**: Clear explanation of referral economics. The amber store card introduces a third accent color theme, which feels slightly templated.

---

### Homepage — Section 10: Platform Comparison
* **Order / Name**: 10. Platform Comparison
* **File Path & Component**: `src/components/PlatformComparison.jsx` (`PlatformComparison`)
* **Purpose**: Contrast ArenaX against informal, unregulated WhatsApp scrims across 6 critical operational metrics.
* **Layout**: Section container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). Desktop table view, mobile card stack view.
* **Text Content**:
  - Category Pill: `PLATFORM TRANSPARENCY`
  - Headline: `Why Competitive Players Trust ArenaX`
  - 6 Comparison Dimensions:
    1. `Result & Score Verification`: Automated Vision Engine OCR within seconds vs. Manual host review prone to bias.
    2. `Prize Money Protection`: Two-Wallet isolation & cryptographic escrow vs. Money held in host personal account.
    3. `Withdrawal Speed`: Guaranteed cashout within 24h vs. Days of delay or arbitrary deduction fees.
    4. `Scoring Transparency`: Fixed rules (20 PTS Booyah, 5 PTS Kill) vs. Subjective rules changed mid-tournament.
    5. `Match Cancellation Policy`: 100% automated refund to source wallet vs. No refunds; players blocked on WhatsApp.
    6. `Host Reputation & Accountability`: Verified 1–5★ ratings vs. Anonymous hosts with zero community accountability.
* **Media Used**:
  - Icons (`lucide-react`): `ShieldCheck`, `CheckCircle2` (Emerald `#00C878`), `XCircle` (Red `#EF4444`).
* **Colors**:
  - Table Background: `.premium-card`
  - ArenaX Column: `bg-[#00C878]/[0.03] border-x border-[#00C878]/15`
* **Typography**:
  - Headline: `font-heading font-extrabold text-3xl md:text-5xl`
  - Table Headers: `text-xs uppercase font-bold`
* **Animations / Interactions**: Table row hover background highlights.
* **Responsive Behavior**:
  - Desktop (≥768px): Full 3-column comparative HTML table.
  - Mobile (<768px): Table hidden; rendered as 6 distinct comparative cards comparing ArenaX vs. Informal Scrims.
* **Auditor Assessment**: High conversion value. The mobile card fallback is implemented cleanly and avoids horizontal table overflow.

---

### Homepage — Section 11: Features
* **Order / Name**: 11. Ecosystem Features & Media Outro
* **File Path & Component**: `src/components/Features.jsx` (`Features`)
* **Purpose**: Secondary summary of 6 ecosystem features, experimental Web Audio battle ambience, live telemetry scrubber, and champion hologram dock.
* **Layout**: Container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). 6-card grid (`md:grid-cols-2 lg:grid-cols-3`) wrapped with `GlowingEffect`, followed by a wide outro banner (`.premium-card-accent`).
* **Text Content**:
  - Headline: `Why Competitive Gamers Choose ArenaX`
  - 6 Feature Cards:
    1. `Daily Bermuda & Clash Squad`: 50-player survival lobbies and 4v4 brackets.
    2. `ArenaX Vision Engine`: Instant dispute-free scoreboard OCR processing.
    3. `Two-Wallet Financial Security`: Isolated Play and Winning Wallets.
    4. `6-Digit Squad Codes`: Assemble roster in seconds with captaincy controls.
    5. `36-Sub-Tier Ladder & Milestones`: Climb from Bronze I to Grandmaster.
    6. `100% Auto-Refund Guarantee`: Full refund if match fails to launch.
  - Telemetry Scrubber Bar: `Live Scrim Telemetry` | `FX: Active / Muted` | `18:24 / 20:00` | Rotating ticker events.
  - Champion Dock: `Criminal` vs `Rebel` toggle | Radar sonar rings | Floating MVP badge: `Red Criminal • 14 Frags • 2,160 AX PAID`.
  - Headline: `Ready to Claim Your Booyah?`
  - Buttons: `Download ArenaX Client` | `WhatsApp Helpline`
  - 4 Metric Badges: `Dual Format` (Bermuda & CS), `4.8 / 5.0` (Rating), `24/7 PKT` (Helpdesk), `< 24h Cash` (Payout).
* **Media Used**:
  - `/hero-character-tactical.png` and `/hero-character.png`: Framed inside circular radar avatar.
  - Icons (`lucide-react`): `Shield`, `Award`, `Clock`, `Users`, `Zap`, `Trophy`, `Gamepad2`, `Star`, `Headphones`, `Banknote`, `ArrowRight`, `Volume2`, `VolumeX`, `Radio`, `Crown`.
* **Colors**:
  - Glowing Effect: Multi-color dynamic border glow.
  - Outro Banner: `.premium-card-accent` with top green bloom.
* **Typography**:
  - Headline: `font-heading font-extrabold text-3xl md:text-5xl`
  - Outro Headline: `font-heading font-black text-2xl sm:text-4xl md:text-5xl uppercase`
* **Animations / Interactions**:
  - Web Audio API synthesizer starts/stops 55Hz & 110Hz oscillators when clicking "FX: Muted".
  - Interval updates live match telemetry ticker every 3.5 seconds.
  - Micro-pill toggles active character inside radar avatar.
  - Radar ring has continuous CSS rotation (`animate-[spin_10s_linear_infinite]`) and ping waves (`animate-ping`).
* **Responsive Behavior**: 6 cards scale from 3 columns to 1 column; audio toggle bar wraps buttons on mobile.
* **Auditor Assessment**: Visually busy. The Web Audio synthesizer generates a synthetic drone tone rather than gaming SFX. The section duplicates topics already covered in Hero, Tournaments, and Wallet.

---

### Homepage — Section 12: Download
* **Order / Name**: 12. Download Section
* **File Path & Component**: `src/components/Download.jsx` (`Download`)
* **Purpose**: Primary terminal conversion section providing the direct APK download link, desktop QR code, iOS release status, and a 4-step Android installation guide.
* **Layout**: Container (`py-24 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-[#30363A]`). 2-column platform grid (`md:grid-cols-2`), followed by a 4-step installation card.
* **Text Content**:
  - Category Pill: `OFFICIAL ANDROID RELEASE`
  - Headline: `Download ArenaX Mobile`
  - Subhead: `Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.`
  - Left Card (Android APK):
    - Title: `Android APK` | Package: `com.arenax.app` | Badge: `Release v2.6`
    - Bullets: Android 8.0 to 15, Download Size ~45–55 MB, 25 AX Welcome Bonus, Google Play Protect verified.
    - Button: `Download Direct APK`
    - Desktop QR Code: `Scan to Download on Phone` (`Open your phone camera to scan`)
  - Right Card (iOS / Apple):
    - Title: `iOS / Apple` | Badge: `Coming Soon`
    - Bullets: App Store submission in progress, requires iOS 15.0+, ProMotion 120Hz support, cross-platform matchmaking.
    - Button (Disabled): `In Development for App Store`
  - Installation Guide (4 Steps):
    1. `Download APK`: Tap the Download APK button above.
    2. `Allow Unknown Apps`: Allow install from Chrome/Browser when prompted.
    3. `Install Package`: Tap Install to complete setup on your device.
    4. `Register & Play`: Launch ArenaX, link your Free Fire UID, and battle!
* **Media Used**:
  - `/logo.png`: 64x64px app icon in Android card.
  - Custom SVG QR Code: Inline vector illustration.
  - Icons (`lucide-react`): `Download`, `Smartphone`, `Clock`, `QrCode`, `ShieldCheck`, `CheckCircle2`.
* **Colors**:
  - Android Card: `.premium-card-accent`
  - iOS Card: `.premium-card-cyan`
  - Install Step Number Badges: `bg-[#00C878]/15 border border-[#00C878]/30 text-[#00C878]`
* **Typography**:
  - Headline: `font-heading font-extrabold text-3xl md:text-5xl`
  - Card Titles: `font-heading font-bold text-2xl`
* **Animations / Interactions**: Clicking `Download Direct APK` triggers `handleDownload()`, which logs GA4 download event and dynamically injects an `<a>` element targeting the GitHub release APK.
* **Responsive Behavior**: 2 platform cards stack on mobile; installation steps switch from a 4-column row to a 2-column grid.
* **Auditor Assessment**: High clarity and clean execution. The QR code provides immediate utility for desktop visitors.

---

### Global Footer
* **Order / Name**: Global Persistent Footer
* **File Path & Component**: `src/components/Footer.jsx` (`Footer`)
* **Purpose**: Site navigation index, legal links, official social channels, support contact, and regulatory disclaimer.
* **Layout**: Container (`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#101214] border-t border-white/5`). 4-column link grid (`grid-cols-1 sm:grid-cols-2 md:grid-cols-4`), followed by copyright strip and legal disclaimer.
* **Text Content**:
  - Brand Column: `ArenaX` | `Pakistan's premier mobile esports platform...` | `Platform Operational 24/7`
  - Quick Links: `Home`, `About Us`, `FAQs`, `Contact Us`
  - Legal & Security: `Terms & Conditions`, `Privacy Policy`, `100% Refund Policy`, `Zero-Tolerance Fair Play` (all 4 navigate to `/terms`)
  - Official Channels: Facebook, Instagram, TikTok, YouTube | Email: `arenasupport@gmail.com`
  - Bottom Strip: `© 2026 ArenaX. All rights reserved. Built for competitive esports in Pakistan.` | `Free Fire Bermuda • Clash Squad 4v4 • ArenaX Vision Verified`
  - Regulatory Disclaimer: `ArenaX is a skill-based esports tournament platform. Outcomes depend entirely on player skill and strategy. Users must be 18+ or have parental consent.`
* **Media Used**:
  - `/logo.png`: 40x40px brand emblem.
  - Icons (`lucide-react`): `Facebook`, `Instagram`, `Youtube`, custom inline TikTok SVG.
* **Colors**: Background `#101214`, border `border-white/5`, text `#A1A1AA`, hover `#00C878`.
* **Typography**: Headers `font-bold text-base tracking-wide uppercase`, links `text-sm font-medium`.
* **Animations / Interactions**: Link buttons execute `scrollToTop(pageId)` with smooth scroll.
* **Responsive Behavior**: 4 columns collapse into 2 columns on tablet and 1 column on mobile.
* **Auditor Assessment**: Clean and comprehensive, though all legal links route to the same page without anchor targeting.

---

### Global Floating Action: WhatsApp Button
* **Order / Name**: Global Floating Support Button
* **File Path & Component**: `src/components/WhatsAppButton.jsx` (`WhatsAppButton`)
* **Purpose**: Persistent conversion trigger opening direct WhatsApp chat with ArenaX support.
* **Layout**: Fixed bottom right (`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50`).
* **Text Content**: Tooltip: `Chat with ArenaX on WhatsApp`
* **Media Used**: Icons (`lucide-react`): `MessageCircle` (w-7 h-7 sm:w-8 sm:h-8).
* **Colors**: `#25D366` (Official WhatsApp Green), white icon and border.
* **Typography**: Tooltip `text-xs font-semibold`.
* **Animations / Interactions**: Pulse ping animation (`animate-ping opacity-20`); hover scale (`hover:scale-110 active:scale-95`). Opens `https://wa.me/+923367135319` in a new browser tab.
* **Responsive Behavior**: Scales from 56x56px on mobile to 64x64px on desktop. Hover tooltip hidden on mobile viewports.
* **Auditor Assessment**: High conversion value. Adheres to mobile gaming standards in Pakistan where WhatsApp is the dominant communication channel.

---

### Standalone Page: About Us
* **Order / Name**: Standalone Page — `/about`
* **File Path & Component**: `src/components/About.jsx` (`About`)
* **Purpose**: Company founding story, mission, core values, platform integrity pillars, and download callout.
* **Layout**: Page container (`pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`). Hero header, Our Story card, 4 pillar cards, 3 "Why Players Choose Us" cards, and a bottom download card.
* **Text Content**:
  - Eyebrow: `ABOUT THE PLATFORM`
  - Headline: `About ArenaX`
  - Story Section: Describes founded by competitive gamers tired of delayed payouts, disputed scoreboards, and unverified WhatsApp hosts in Pakistan.
  - 4 Pillars: `Our Mission`, `Our Values`, `Vision Engine`, `Community`.
  - 3 Choice Factors: `Zero-Tolerance Fair Play`, `24-Hour Verified Payouts`, `Two-Vault Isolation`.
  - Bottom Banner: `Join the ArenaX Community Today` | Button: `Download ArenaX APK`
* **Media Used**:
  - `/logo.png`: 56x56px logo in Our Story card.
  - Icons (`lucide-react`): `Target`, `Heart`, `Zap`, `Users`, `ShieldCheck`.
* **Colors**: Background `#101214`, cards `.premium-card`, accent cards `.premium-card-accent`.
* **Typography**: H1 `font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl`, body `text-sm sm:text-base text-[#A1A1AA]`.
* **Animations / Interactions**: Standard card hovers; download button triggers APK download via `logEvent`.
* **Responsive Behavior**: Multi-column grids collapse cleanly to single columns on mobile.
* **Auditor Assessment**: Factual and focused on Pakistani Free Fire competitive context. Matches the Hero design system.

---

### Standalone Page: FAQs
* **Order / Name**: Standalone Page — `/faq`
* **File Path & Component**: `src/components/FAQ.jsx` (`FAQ`)
* **Purpose**: 12 comprehensive accordion items answering player and organizer questions, plus direct email helpdesk contact.
* **Layout**: Max width container (`max-w-4xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24 px-4`). Header, vertical accordion stack, bottom support card.
* **Text Content**:
  - Headline: `Got Questions? We Have Answers.`
  - 12 Question Accordions:
    1. *What is ArenaX?* (Free Fire tournaments, Vision Engine, Two-Wallet security)
    2. *How do I participate in tournaments?* (Download APK, link UID, room credentials 10–15m before match)
    3. *What is the difference between Play Wallet and Winning Wallet?* (Non-withdrawable entry funds vs. 100% withdrawable cash winnings at 1 AX = 1 PKR)
    4. *How do I add money to my wallet?* (JazzCash, EasyPaisa, Bank, min PKR 50, admin verification)
    5. *How long does it take to withdraw cash winnings?* (Within 24 hours, min 100 AX, fund security password required)
    6. *How does the ArenaX Vision Engine verify match scoreboards?* (Neural OCR scanning IGN, UID, kills, Booyahs in seconds)
    7. *What happens if a tournament is cancelled or fails to start?* (100% automated refund to Play Wallet)
    8. *What are the rules for P2P coin transfers between friends?* (24h cooldown after signup, verified tournament requirement)
    9. *How can I become an Organizer and host my own tournaments?* (In-app application, 0–20% commission, dedicated organizer wallet)
    10. *Is ArenaX legal and compliant in Pakistan?* (100% skill-based esports compliance under Pakistan law)
    11. *How are combat points calculated for Bermuda tournaments?* (20 PTS Booyah, 5 PTS Kill)
    12. *Can I play with my friends in Duo and Squad formats?* (6-digit squad codes, instant team assembly)
  - Bottom Helpdesk Card: `Still Have Questions or Need Match Assistance?` | Button: `Contact arenasupport@gmail.com`
* **Media Used**: Icons (`lucide-react`): `ChevronDown`, `HelpCircle`, `Mail`.
* **Colors**: Closed accordion `border-white/10`, open accordion `border-[#00C878]/40`, chevron rotate `#00C878`.
* **Typography**: Questions `font-heading font-bold text-sm sm:text-base`, answers `text-xs sm:text-sm text-[#A1A1AA] leading-relaxed`.
* **Animations / Interactions**: Accordion expands with smooth max-height transition (`max-h-96` vs `max-h-0 duration-300`). Chevron rotates 180 degrees.
* **Responsive Behavior**: Full-width accordion buttons with 56px minimum touch target.
* **Auditor Assessment**: Thorough and clear. Directly answers operational questions about Pakistani payment rails and game rules.

---

### Standalone Page: Contact Us
* **Order / Name**: Standalone Page — `/contact`
* **File Path & Component**: `src/components/Contact.jsx` (`Contact`)
* **Purpose**: Contact channels (Email, WhatsApp, in-app chat), message dispatch form, organizer partnership inquiries, and official social media handles.
* **Layout**: Container (`max-w-6xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24 px-4`). 3 channel cards, followed by a 2-column split (Form on left, Business & Social on right).
* **Text Content**:
  - Eyebrow: `24/7 PLAYER SUPPORT DESK`
  - Headline: `Get in Touch`
  - 3 Channels:
    1. `Official Email`: `arenasupport@gmail.com`
    2. `WhatsApp Helpline`: `+92 336 7135319` (Mon–Sat, 9:00 AM to 6:00 PM PKT)
    3. `In-App Live Chat`: Available in Mobile App
  - Message Form Fields: Full Name, Email Address, Subject, Message Details | Submit Button: `Submit Message`
  - Organizer Card: `Organizer & Guild Partnerships` | Inquire link
  - Social Links: Facebook, Instagram, TikTok, YouTube
* **Media Used**: Icons (`lucide-react`): `Mail`, `MessageSquare`, `Phone`, `Send`, `Facebook`, `Instagram`, `Youtube`, `CheckCircle2`, custom inline TikTok SVG.
* **Colors**: Inputs `bg-white/[0.03] border-white/10 focus:border-[#00C878]`, submit button `#00C878`.
* **Typography**: Inputs `text-sm text-white`, labels `text-xs uppercase font-semibold text-[#A1A1AA]`.
* **Animations / Interactions**: Form submission triggers `handleSubmit` with client-side state timeout (6 seconds). No backend API call is executed.
* **Responsive Behavior**: 3 top cards collapse into 1 column on mobile; form and business cards stack vertically.
* **Auditor Assessment**: Clean form design, but the submission is an in-memory client mock that does not transmit data.

---

### Standalone Page: Terms & Conditions
* **Order / Name**: Standalone Page — `/terms`
* **File Path & Component**: `src/components/Terms.jsx` (`Terms`)
* **Purpose**: 12 authoritative legal clauses governing eligibility, tournament rules, scoring, Two-Wallet mechanics, fair play, and dispute arbitration in Pakistan.
* **Layout**: Container (`max-w-4xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24 px-4`). Centered header, single long `.premium-card` containing 12 numbered sections, bottom "Return to Top" button.
* **Text Content**:
  - Headline: `Terms & Conditions` | Subhead: `Last updated: 2026 • Governed under the Laws of Pakistan`
  - 12 Numbered Clauses:
    1. Acceptance of Terms
    2. Eligibility (18+ or parental consent, Pakistan residency, one account rule)
    3. User Account & Fund Security (6-digit fund password confidentiality)
    4. Tournament Rules & Authoritative Scoring (20 PTS Booyah, 5 PTS Kill, screenshot OCR)
    5. Wallet Architecture, Payments & 100% Refunds (Two-Wallet segregation, 1 AX = 1 PKR, 100 AX min withdrawal, auto-refunds)
    6. Zero-Tolerance Fair Play & Anti-Cheat Policy (Lifetime hardware bans for aimbots, scripts, teaming)
    7. Organizer Responsibilities & Conduct (10–50 slot limits, 0–20% commission, verified reviews)
    8. Intellectual Property & Brand Rights (Free Fire is a trademark of Garena; ArenaX is an independent platform)
    9. Limitation of Liability
    10. Dispute Resolution & Arbitration (Arbitration Act, 1940; proceedings in Lahore or Islamabad, Pakistan)
    11. Governing Law & Jurisdiction (Laws of the Islamic Republic of Pakistan)
    12. Official Contact Information (`arenasupport@gmail.com`)
* **Media Used**: Icons (`lucide-react`): `ShieldAlert`, `ArrowLeft`.
* **Colors**: `.premium-card` with white/5 section dividers.
* **Typography**: Clause headings `font-heading font-bold text-base sm:text-lg text-white`, clause body `text-xs sm:text-sm text-[#A1A1AA] leading-relaxed`.
* **Animations / Interactions**: "Return to Top" button scrolls window to top smoothly.
* **Responsive Behavior**: Single readable column across all viewports.
* **Auditor Assessment**: Authoritative and legally sound for the Pakistani jurisdiction (cites the Arbitration Act 1940 and Pakistani competent courts).

---

### Unmounted / Dead Code Component: Leaderboard Tiers
* **Order / Name**: Dead Code Section (Orphaned)
* **File Path & Component**: `src/components/LeaderboardTiers.jsx` (`LeaderboardTiers`)
* **Purpose**: Full 36-sub-tier competitive rank ladder explorer (Bronze I to Grandmaster Top 300), player search/filter, and rank milestone cash reward simulator.
* **Status**: **NOT MOUNTED**. Completely unreferenced in `src/App.tsx`. Exists only on disk (570 lines, 35,340 bytes).
* **Auditor Assessment**: High-value component built during development that was accidentally omitted from the page assembly. It contains verified app tier data, cash milestone rewards, and interactive rank gap math.

---

## 4. DESIGN TOKENS (AS THEY ACTUALLY EXIST IN CODE)

### 4.1 Color Palette

```
Primary Backgrounds:
  - Deep Carbon (Body/Page Base): #101214
  - Secondary Carbon: #1B1F22
  - Dark Slate (Cards Base): #14171A
  - Elevated Surface: #121417
  - TrustBar Surface: #0D0F11 (one-off dark background variant)
  - OLED Phone Screen: #0E1113

Brand Accents:
  - Official Brand Emerald: #00C878 (Used for CTA buttons, active links, Booyah badges, logo X)
  - Brand Hover: #00A865
  - Brand Subtle Fill: rgba(0, 200, 120, 0.12)
  - Mint / Neon Highlights: #00FF9D, #00E58A, #00D982 (Used in button gradients & text highlights)

Secondary Accents:
  - Tactical Cyan: #00D2FF (Used for Clash Squad brackets, Play Wallet, Vision Engine badges)
  - Cyan Dark / Hover: #00A8DC, #33DCFF (Used in Clash Squad button gradient)
  - Tournament Gold / Amber: #F59E0B (Used for prize pools, seasonal milestones, store tokens)
  - Amber Deep: #D97706
  - Tactical / Penalty Red: #EF4444 (Used for Red Criminal button/halo, Anti-Cheat, XCircle icons)
  - WhatsApp Brand Green: #25D366

Text Colors:
  - Pure White: #FFFFFF
  - High-Contrast Off-White: #F3F4F6
  - Muted Zinc (Subtext & Body): #A1A1AA
  - Dim Slate (Labels & Watermarks): #71717A
  - Slate Medium: #94A3B8, #E2E8F0

Borders & Hairlines:
  - Standard Card Border: rgba(255, 255, 255, 0.08)
  - Specular Hairline Top Border: rgba(255, 255, 255, 0.18) to rgba(255, 255, 255, 0.25)
  - Tactical Divider: #30363A
  - Emerald Tinted Border: rgba(0, 200, 120, 0.25) to rgba(0, 200, 120, 0.65)
  - Cyan Tinted Border: rgba(0, 210, 255, 0.25) to rgba(0, 210, 255, 0.55)
  - Amber Tinted Border: rgba(245, 158, 11, 0.25) to rgba(245, 158, 11, 0.55)

Gradients:
  - Card Surface: linear-gradient(180deg, rgba(26, 30, 34, 0.85) 0%, rgba(18, 21, 24, 0.95) 100%)
  - Text White Gradient: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 60%, #94A3B8 100%)
  - Text Emerald Gradient: linear-gradient(180deg, #00FF9D 0%, #00C878 60%, #00965A 100%)
  - Hero Giant Title: linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.10), transparent)
  - Emerald Button: bg-gradient-to-r from-[#00E58A] to-[#00C878]
  - Cyan Button: bg-gradient-to-r from-[#00D2FF] to-[#00A8DC]
```

#### Colors Flagged as Inconsistent / One-Off:
* `#0D0F11`: Used only as the background of `TrustBar.jsx`, while every other section uses `#101214`.
* `#0A0D0F`: Used as button text color only in `TournamentModes.jsx` and `ScoutRewards.jsx`, while other primary buttons use `#101214`.
* `#00E58A` and `#00D982`: Button gradient colors introduced in `TournamentModes.jsx` and `ScoutRewards.jsx` that do not exist in `tailwind.config.js`.
* `#00A8DC` and `#33DCFF`: Cyan gradient variants introduced in `TournamentModes.jsx` that do not exist in `tailwind.config.js`.

---

### 4.2 Typography System

* **Font Families**:
  - `font-sans`: `Inter, sans-serif` (Default body, navigation, form inputs, table data)
  - `font-heading`: `Outfit, Chakra Petch, sans-serif` (Headlines, badges, large titles, card titles)
  - `font-mono`: System monospace stack (Technical specs, room codes, timestamps, telemetry)
* **Font Loading**:
  - Loaded via `@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');` in `src/index.css`.
  - `index.html` has `<link rel="preconnect">` but lacks the `<link rel="stylesheet">` tag.
* **Type Scale in Production**:
  - `text-[19vw]` (Hero giant watermark) — font-black, leading-none, font-heading
  - `text-7xl` / `text-8xl` (TrustBar numeral watermarks) — font-black, opacity-[0.06]
  - `text-3xl sm:text-5xl md:text-6xl lg:text-7xl` (Section H2s) — font-black / font-extrabold, tracking-tight, font-heading
  - `text-2xl sm:text-3xl md:text-4xl` (Format H3s) — font-extrabold, font-heading
  - `text-lg sm:text-xl` (Card H4s) — font-bold, font-heading
  - `text-base` / `text-sm` (Body text) — font-normal / font-medium, leading-relaxed, text-[#A1A1AA]
  - `text-xs` / `text-[11px]` / `text-[10px]` (Badges & specs) — font-bold / font-black, uppercase, tracking-wider / tracking-widest

---

### 4.3 Spacing, Borders & Shadows

* **Container Widths**:
  - Standard Sections: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (1280px)
  - Readability / Longform Pages (`About`, `Contact`): `max-w-6xl mx-auto`
  - Focused Content (`FAQ`, `Terms`): `max-w-4xl mx-auto`
* **Vertical Spacing**:
  - Full Sections: `py-24 px-4 sm:px-6 lg:px-8` or `py-20 sm:py-28`
  - Standalone Pages: `pt-24 sm:pt-32 pb-16 sm:pb-24`
* **Border Radii**:
  - Large Surface Cards: `rounded-3xl` (24px)
  - Feature & Telemetry Cards: `rounded-2xl` (16px)
  - Buttons & Inputs: `rounded-xl` (12px)
  - Badges & Pills: `rounded-full` or `rounded-lg` (8px)
  - Smartphone Frame: `rounded-[40px] sm:rounded-[48px]`
* **Card & Surface Shadow System**:
  - `.premium-card`: `box-shadow: 0 12px 36px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`
  - `.premium-card:hover`: `box-shadow: 0 20px 45px -15px rgba(0, 200, 120, 0.15), inset 0 1px 0 0 rgba(0, 200, 120, 0.25)`
  - Glow Tokens (`tailwind.config.js`):
    - `emerald-glow`: `0 0 35px -5px rgba(0, 200, 120, 0.25)`
    - `gold-glow`: `0 0 35px -5px rgba(245, 158, 11, 0.25)`

---

### 4.4 Component Patterns & Variants

#### Button Variants
1. **Primary Solid Emerald CTA**:
   `min-h-[48px] bg-[#00C878] hover:bg-[#00A865] active:scale-[0.98] text-[#101214] font-black px-7 py-3.5 rounded-xl text-sm sm:text-base shadow-xl shadow-[#00C878]/25 border border-[#00C878]/50 cursor-pointer`
   *(Used in Hero direct download, Navbar, HowItWorks, Features outro, Download direct)*
2. **Gradient Emerald Action**:
   `bg-gradient-to-r from-[#00E58A] to-[#00C878] hover:from-[#00FF9D] hover:to-[#00D982] text-[#0A0D0F] font-black px-7 py-3.5 rounded-xl shadow-xl shadow-[#00C878]/20`
   *(Used in TournamentModes Bermuda and ScoutRewards)*
3. **Gradient Cyan Action**:
   `bg-gradient-to-r from-[#00D2FF] to-[#00A8DC] text-[#0A0D0F] font-black px-7 py-3.5 rounded-xl shadow-xl shadow-[#00D2FF]/20`
   *(Used in TournamentModes Clash Squad)*
4. **Ghost / Outline Secondary**:
   `bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-white/10 hover:border-white/20`
   *(Used in Hero secondary CTA, Features WhatsApp button)*
5. **Micro Character Switcher Pill**:
   `px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider`
   *(Active Red Criminal: `bg-[#EF4444] text-white`, Active Rebel: `bg-[#00C878] text-[#101214]`)*
6. **Disabled / Coming Soon**:
   `bg-white/[0.04] text-[#71717A] py-4 rounded-xl font-bold cursor-not-allowed border border-white/10`
   *(Used for iOS button in Download)*

#### Card Variants
1. **`.premium-card`** (Neutral carbon luxury card with top specular gleam):
   Linear gradient `rgba(26, 30, 34, 0.85)` to `rgba(18, 21, 24, 0.95)`, border `rgba(255, 255, 255, 0.08)`, border-top `rgba(255, 255, 255, 0.18)`, backdrop blur 24px.
2. **`.premium-card-accent`** (Emerald glow card):
   Linear gradient `rgba(0, 200, 120, 0.08)` to `rgba(18, 21, 24, 0.95)`, border `rgba(0, 200, 120, 0.25)`, border-top `rgba(0, 200, 120, 0.55)`.
3. **`.premium-card-cyan`** (Tactical cyan glow card):
   Linear gradient `rgba(0, 210, 255, 0.08)` to `rgba(18, 21, 24, 0.95)`, border `rgba(0, 210, 255, 0.25)`, border-top `rgba(0, 210, 255, 0.55)`.
4. **`.premium-card-amber`** (Tournament gold glow card):
   Linear gradient `rgba(245, 158, 11, 0.08)` to `rgba(18, 21, 24, 0.95)`, border `rgba(245, 158, 11, 0.25)`, border-top `rgba(245, 158, 11, 0.55)`.

#### Form & Input Variants
* Inputs (`Contact.jsx`):
  `w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-[#00C878] focus:ring-1 focus:ring-[#00C878]/30 transition-all`
* Sliders (`AIVisionShowcase.jsx`, `OrganizerProgram.jsx`):
  `w-full h-2.5 bg-[#101214] rounded-lg appearance-none cursor-pointer accent-[#00C878]`

---

### 4.5 Dark / Light Mode Support
* **Audit Finding**: **DARK MODE ONLY. LIGHT MODE NOT SUPPORTED.**
* **Explanation**: In `src/main.tsx`, `ThemeProvider` from `next-themes` is wrapped around `App`:
  `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`
* However:
  1. `tailwind.config.js` does **NOT** enable `darkMode: 'class'`.
  2. There is no theme switcher toggle anywhere on the site.
  3. All components use hardcoded dark classes (`bg-[#101214]`, `text-[#F3F4F6]`, `bg-white/[0.04]`).
  4. When a user's operating system is set to Light Mode, `next-themes` applies `class="light"` to `<html>`, which has zero styling effect. The site remains 100% dark.

---

## 5. HERO SECTION DEEP-DIVE

The Hero section (`src/components/Hero.jsx`) represents the aesthetic benchmark for the entire web project. Its visual hierarchy and code architecture are documented below.

```
+-----------------------------------------------------------------------------------+
|  [v2.6.0 Live Badge]    [Bermuda] [Clash Squad] [AI Vision] [24H]    [Criminal|Rebel]  |  <- Top Meta Bar
|                                                                                   |
|                                                                                   |
|   [SEASON 4]                           ARENAX                          [[2026]]   |  <- Giant Title Layer
|   [PK Circuit]                                                   [Battlefield Ed] |     (Scroll Parallax: 0.18)
|                                                                                   |
|                                    / \                                            |
|                                   /   \                                           |
|                                  | [O] |                                          |  <- Character Cutout Layer
|                                  |  |  |                                          |     (Mouse Parallax + Halo)
|                                  /  |  \                                          |
|                                 /   |   \                                         |
|                                                                                   |
|            +-------------------------------------------------------+              |
|            |  [25 AX Free Welcome Bonus For New Players]           |              |  <- Floating Booking Dock
|            |  Pakistan's Premier Free Fire Tournament Platform      |              |     (Spec Hairline + 3 Chips)
|            |  [Download Direct APK]      [Explore Modes]           |              |
|            |  [Vision OCR: 0.8s]  [Prize: 250k AX]  [Refund: 100%] |              |
|            +-------------------------------------------------------+              |
|                                                                                   |
|~~~~~~~~~~~~~~~~~~~~~ (Luminous Curved Organic Bezier Divider) ~~~~~~~~~~~~~~~~~~~~|  <- M0,80 Q720,12 1440,80
+-----------------------------------------------------------------------------------+
```

### Why the Hero Works (Quality Benchmark Factors):
1. **Multi-Plane Cinematic Composition**:
   - Instead of a generic two-column layout (text left, image right), the Hero utilizes a theatrical vertical stack inspired by modern movie landing pages (e.g. *Deadpool III* CineDaily layout).
   - The giant background `ARENAX` title sits behind the character cutout, creating an immediate sense of physical depth.
2. **Interactive Character Customizer**:
   - The top switcher lets players toggle between two real Free Fire archetypes: **Red Criminal** (Dual SMG specialist with red `#EF4444` aura) and **Streetwear Rebel** (Bermuda legend with emerald `#00C878` aura).
   - Switching characters dynamically shifts the image, button active state, and background halo blur.
3. **Dual-Axis Parallax Engine**:
   - Mousemove listener computes normalized coordinates (`clientX / innerWidth - 0.5`) on desktop viewports and gently tilts the character cutout (`±10px` X, `±7.5px` Y).
   - Window scroll listener uses `requestAnimationFrame` to vertically displace the background title at `scrollY * 0.18px` while displacing the character at `scrollY * 0.06px`, producing true multi-plane parallax depth.
4. **Dock Elevation & Visual Hierarchy**:
   - The floating booking dock (`.premium-card`) overlaps the bottom of the character cutout with negative margin (`-mt-8 sm:-mt-12 md:-mt-16`), creating cohesion between the visual and actionable components.
   - The top specular rim (`border-t border-white/25`) and soft green glow (`#00C878/10 blur-2xl`) give the card a distinct tactile glassmorphism presence.
5. **Organic Curved Transition Mask**:
   - The hero exits cleanly into the rest of the page via a responsive SVG path (`M0,80 Q720,12 1440,80 L1440,96 L0,96 Z`) that matches the background color `#101214` and features a luminous cyan-emerald specular stroke.

---

## 6. ASSETS INVENTORY

Complete audit of every media file stored in the repository.

| Asset File Path | Format on Disk | True File Type | File Size | Dimensions | Where It Is Used | Authenticity & Source Type |
|---|---|---|---|---|---|---|
| `public/logo.png` | `.png` | **JFIF JPEG** | 188,941 B | 1024 x 1024 px | Navbar logo, AppExperience telemetry, Download APK card, About story card, Footer logo, Hero3DScene (unreferenced) | **Real Brand Asset**: Official ArenaX shield logo with green stylized "X". Mislabeled as `.png` (no alpha channel). |
| `public/app-icon.png` | `.png` | **JFIF JPEG** | 188,941 B | 1024 x 1024 px | **NOT USED ANYWHERE** | **Duplicate Asset**: Exact byte-for-byte clone of `logo.png`. Completely orphaned on disk. |
| `public/fav.ico` | `.ico` | **ICO (5 images)** | 14,970 B | Multi (16 to 64px) | `index.html` favicon | **Real Brand Asset**: Official favicon. |
| `public/hero-character-tactical.png` | `.png` | **PNG (with Alpha)** | 164,023 B | 554 x 554 px | `Hero.jsx` ("Red Criminal" active state), `Features.jsx` (outro radar avatar) | **Game Brand Asset**: High-res cutout of Garena Free Fire "Red Criminal" bundle holding dual Vector SMGs. |
| `public/hero-character.png` | `.png` | **PNG (with Alpha)** | 395,179 B | 682 x 1024 px | `Hero.jsx` ("Streetwear Rebel" active state), `Features.jsx` (outro radar avatar) | **Game Brand Asset**: Cutout of Free Fire male character skin with streetwear jacket and tactical pants. |
| `public/og-image.jpg` | `.jpg` | **NOT PRESENT** | 0 B | 0 x 0 px | Referenced in `index.html` line 26 | **BROKEN / 404**: Referenced in OpenGraph meta tag, but file does not exist in `public/`. |
| `public/twitter-image.jpg` | `.jpg` | **NOT PRESENT** | 0 B | 0 x 0 px | Referenced in `index.html` line 37 | **BROKEN / 404**: Referenced in Twitter Card meta tag, but file does not exist in `public/`. |
| Real App Screenshots | - | **NOT PRESENT** | - | - | Simulated inside `AppExperienceShowcase.jsx` | **SYNTHETIC**: Zero real Android application screenshots exist in repository. All in-app UI is code-rendered HTML. |
| 3D Models (`.glb` / `.gltf`) | - | **NOT PRESENT** | - | - | None | No 3D model files exist. |
| Video Files (`.mp4` / `.webm`) | - | **NOT PRESENT** | - | - | None | No video files exist. |
| Font Files (`.woff2` / `.ttf`) | - | **NOT PRESENT** | - | - | Loaded via Google Fonts CDN | No local font assets exist. |

---

## 7. PROBLEMS & INCONSISTENCIES

This section outlines design, structural, and technical flaws observed directly in the codebase.

### 7.1 Broken Asset Formats & Duplicate Files
* **JPEG Disguised as PNG**: `public/logo.png` and `public/app-icon.png` have `.png` file extensions but contain `JFIF` headers. They are standard lossy JPEGs. When placed over non-black backgrounds, they cannot display proper transparency.
* **Orphaned Duplicate File**: `public/app-icon.png` is an identical byte-for-byte duplicate of `public/logo.png` (188,941 bytes) and is never referenced in any component.
* **Missing OpenGraph Images**: `index.html` points social scrapers to `https://marenax.site/og-image.jpg` and `twitter-image.jpg`. Neither image exists in `public/`, resulting in broken link previews on Facebook, Twitter, and WhatsApp.

### 7.2 Severe Product Identity Mismatch (Free Fire vs. PUBG)
* **SEO Metadata vs. Actual App**:
  - `index.html` title: `ArenaX - Best Free Fire & PUBG Mobile Tournament Platform in Pakistan | Win Real Cash`
  - `index.html` description: `Play Free Fire & PUBG tournaments daily, compete with 10,000+ players...`
  - `index.html` keywords: 24 keywords heavily emphasizing PUBG (`PUBG Mobile tournament`, `PUBG competition`, `PUBG Pakistan`, `PUBG cash tournament`).
* **Reality in Code**: In `Docs/ARENAX_FEATURE_INTEGRATION_PLAN.md` (Section 3), it is explicitly stated:
  > *"PUBG Mobile & Call of Duty Mobile: Although enum keys exist in the backend database schema, the mobile app UI and tournament controllers are 100% specialized for Free Fire. Advertising PUBG Mobile or COD Mobile would mislead visitors into expecting active lobbies. Policy: Do not list PUBG Mobile or COD Mobile as active tournament categories."*
* Every section of the website (Hero, Tournaments, AI Vision, Wallet, How It Works) is built exclusively around Free Fire mechanics (Booyah, Bermuda 50P, Clash Squad 4v4, Free Fire UIDs). Advertising PUBG Mobile in meta tags creates a direct product contradiction.

### 7.3 Dead Code & Dependency Bloat
* **Orphaned Leaderboard Component** (`src/components/LeaderboardTiers.jsx`): A 570-line component (35.3 KB) implementing full rank progression tables, search filtering, and milestone cash reward calculators was built but never imported in `src/App.tsx`.
* **Orphaned Three.js Components** (`src/components/ui/Hero3DScene.tsx` and `dot-shader-background.tsx`): 514 lines of Three.js / R3F code that are never imported anywhere.
* **Unused Heavy NPM Packages**:
  - `motion` (Framer Motion v12): `^12.23.26` installed in `package.json`, zero imports in project.
  - `@supabase/supabase-js`: `^2.57.4` installed in `package.json`, zero imports in project.
  - `@react-three/fiber` & `@react-three/drei`: Installed in `package.json`, only used in dead code files.

### 7.4 Mock Functionality Presented as Functional
* **Fake Contact Form Submission**: In `src/components/Contact.jsx`, `handleSubmit` only sets a local state flag `setSubmitted(true)` and runs a `setTimeout` resetting the form after 6 seconds. No API call, email dispatch, or Supabase write is executed.
* **Synthetic Web Audio Drone**: In `src/components/Features.jsx`, the "Battle Ambience FX" generates a continuous 55Hz/110Hz synthesizer tone via browser oscillators rather than playing authentic game audio or UI feedback sound effects.
* **Hardcoded Telemetry Ticker**: The "Live Scrim Telemetry" in `Features.jsx` loops through 5 static strings on a 3.5-second timer rather than connecting to live match events.

### 7.5 Design System Drift vs. Hero
* **Color Proliferation in Cards**:
  - Hero maintains strict emerald (`#00C878`) and tactical red (`#EF4444`) discipline.
  - Subsequent sections introduce a rainbow of card variations: `.premium-card-cyan` (Cyan `#00D2FF`), `.premium-card-amber` (Amber `#F59E0B`), and `.premium-card-accent` (Emerald `#00C878`). When scrolling down the page, each section alternates border and glow hues, creating a templated feel.
* **Button Style Inconsistency**:
  - Hero uses solid `#00C878` with `#101214` text.
  - TournamentModes uses a two-color gradient (`from-[#00E58A] to-[#00C878]`) with `#0A0D0F` text.
  - Clash Squad button uses a cyan gradient (`from-[#00D2FF] to-[#00A8DC]`).
* **Lack of Real In-App Screenshots**:
  - Despite being an application landing page, there is not a single real mobile app UI screenshot on the site. All representations of the app (the phone mockup, the lobby card, the OCR scanner card) are simulated in Tailwind code.

### 7.6 Canonical Domain Divergence
* `index.html` sets `<link rel="canonical" href="https://marenax.site/" />`.
* `src/App.tsx` and `src/components/SEO.tsx` set `canonical: 'https://marenax.com/'`.
* Crawlers see `.site` on initial HTML fetch and `.com` once JavaScript hydration finishes.

---

## 8. APP CONNECTIONS

### 8.1 Download Destinations & Application Package
* **Direct Android APK Target**:
  `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk`
  - APK Version Tag: `v2.6` (Build `2.6.0`)
  - Target Android Package ID: `com.arenax.app`
  - Download Button Locations:
    1. `src/components/Hero.jsx`: Download Direct APK (v2.6)
    2. `src/components/Navbar.jsx`: Download App (Desktop header and mobile drawer)
    3. `src/components/AppExperienceShowcase.jsx`: Download ArenaX Client (inside phone mockup)
    4. `src/components/Download.jsx`: Download Direct APK
    5. `src/components/About.jsx`: Download ArenaX APK
* **Desktop QR Code**: Embedded inline SVG in `Download.jsx` allowing desktop visitors to scan and download the APK directly to their phone.
* **iOS / Apple App Store**: Button disabled ("In Development for App Store"). No active App Store link exists.
* **Web App / Player Login / Signup**: **NOT PRESENT**. ArenaX does not have a web portal, web login, or browser-based tournament lobby. Participation requires downloading the native Android client.

---

### 8.2 External Integrations, Support & Social Channels
* **WhatsApp Direct Connection**:
  - Destination URL: `https://wa.me/+923367135319`
  - Locations: Floating button (`WhatsAppButton.jsx`), Helpline link (`Features.jsx`), Helpline link (`Contact.jsx`), JSON-LD schema telephone (`index.html`).
* **Official Support Email**:
  - Destination: `arenasupport@gmail.com`
  - Locations: `FAQ.jsx`, `Contact.jsx`, `Terms.jsx`, `Footer.jsx`, `index.html` Schema.
* **Official Social Media Channels**:
  - Facebook: `https://www.facebook.com/share/17NfG8Syiq/`
  - Instagram: `https://www.instagram.com/arenaxbattlefield`
  - TikTok: `https://www.tiktok.com/@arenax_15`
  - YouTube: `https://youtube.com/@arenax_15`

---

### 8.3 Analytics & Form Integrations
* **Google Analytics 4 (GA4)**:
  - Integration: `react-ga4` initialized in `src/utils/analytics.ts` with Measurement ID `G-TE33KZTQP0`.
  - Configured with `gtagOptions: { debug_mode: true }`.
  - Tracked Events:
    - Page views (`logPageView()`) on route change.
    - APK Downloads (`trackDownload("ArenaX.apk", "Android", "2.6.0")`).
    - Custom button clicks (`trackButtonClick()`).
* **Form & Backend APIs**:
  - Contact Message Form: Simulated client-side reset; zero backend connections.
  - Supabase: Library installed in `package.json`, but no client instance or connection keys exist in the codebase.

---

### 8.4 SEO & Structured Data (JSON-LD)
* **Root Structured Data** (`index.html` lines 52–124):
  - `@graph` schema defining:
    1. `Organization`: Name: ArenaX, URL: `https://marenax.site/`, Logo: `https://marenax.site/logo.png`, Support Email: `arenasupport@gmail.com`, Telephone: `+923367135319`, Social URLs.
    2. `WebSite`: Name: ArenaX, Publisher: ArenaX.
    3. `WebApplication`: OS: Android, Category: GameApplication, Price: 0 PKR, Rating: 4.8 / 5.0 (10,000 ratings).
    4. `SportsOrganization`: Sport: Esports, URL: `https://marenax.site/`.
* **Dynamic Per-Route Schema** (`src/components/SEO.tsx`):
  - Injects dynamic `<script type="application/ld+json" id="page-schema">` based on current route (`WebPage`, `AboutPage`, `FAQPage`, `ContactPage`).

---

## 9. SCREENSHOTS

High-resolution visual captures have been generated directly from the live built application using headless Chrome automation at Desktop (**1440px**) and Mobile (**390px**) viewports. All images are stored in the root `/audit-screenshots` folder.

| # | Section / Page Name | Desktop Screenshot File (1440px) | Dimensions (WxH) | Mobile Screenshot File (390px) | Dimensions (WxH) | Description |
|---|---|---|---|---|---|---|
| **00** | **Full Homepage** | `00-homepage-full-desktop.png` | 1440 x 14,967 px | `00-homepage-full-mobile.png` | 390 x 26,442 px | Complete vertical page capture from top navigation bar to bottom footer. |
| **01** | **Hero Section** | `01-hero-desktop.png` | 1440 x 1,443 px | `01-hero-mobile.png` | 390 x 1,385 px | Cinematic title, character cutout, top meta bar, and floating booking dock. |
| **02** | **App Experience Showcase** | `02-app-experience-desktop.png` | 1440 x 1,231 px | `02-app-experience-mobile.png` | 390 x 2,153 px | Simulated smartphone UI, telemetry chips, and chapter cards. |
| **03** | **Trust Bar** | `03-trust-bar-desktop.png` | 1440 x 1,079 px | `03-trust-bar-mobile.png` | 390 x 1,882 px | Editorial protocol statement and 4 numbered technical trust modules. |
| **04** | **Tournament Modes** | `04-tournaments-desktop.png` | 1440 x 1,190 px | `04-tournaments-mobile.png` | 390 x 2,082 px | Bermuda 50-player lobby and Clash Squad 4v4 bracket switcher. |
| **05** | **AI Vision Showcase** | `05-ai-vision-desktop.png` | 1440 x 1,055 px | `05-ai-vision-mobile.png` | 390 x 1,817 px | OCR verification pipeline and interactive combat points calculator. |
| **06** | **Wallet Section** | `06-wallet-desktop.png` | 1440 x 1,014 px | `06-wallet-mobile.png` | 390 x 1,849 px | Dual-vault breakdown (Play Wallet vs. Winning Wallet) and banking strip. |
| **07** | **Organizer Program** | `07-organizers-desktop.png` | 1440 x 1,390 px | `07-organizers-mobile.png` | 390 x 2,657 px | 4 host feature cards and interactive tournament earnings simulator. |
| **08** | **How It Works** | `08-how-it-works-desktop.png` | 1440 x 1,253 px | `08-how-it-works-mobile.png` | 390 x 2,352 px | 6-step player journey from download to 24h cash withdrawal. |
| **09** | **Scout Rewards** | `09-scout-rewards-desktop.png` | 1440 x 894 px | `09-scout-rewards-mobile.png` | 390 x 1,709 px | 2% winner royalty engine and in-app digital diamond store preview. |
| **10** | **Platform Comparison** | `10-comparison-desktop.png` | 1440 x 791 px | `10-comparison-mobile.png` | 390 x 1,901 px | ArenaX vs. WhatsApp scrims comparative table and mobile cards. |
| **11** | **Features & Outro** | `11-features-desktop.png` | 1440 x 1,845 px | `11-features-mobile.png` | 390 x 3,042 px | 6 glowing feature cards, telemetry scrubber, and champion radar dock. |
| **12** | **Download Section** | `12-download-desktop.png` | 1440 x 1,327 px | `12-download-mobile.png` | 390 x 2,521 px | Android APK card, desktop QR code, iOS coming soon card, 4-step guide. |
| **13** | **Footer** | `13-footer-desktop.png` | 1440 x 457 px | `13-footer-mobile.png` | 390 x 1,094 px | Brand info, navigation links, official social channels, and disclaimers. |
| **14** | **About Us Page** | `page-about-desktop.png` | 1440 x 2,447 px | `page-about-mobile.png` | 390 x 4,541 px | Complete `/about` standalone route with story and core value pillars. |
| **15** | **FAQ Page** | `page-faq-desktop.png` | 1440 x 2,395 px | `page-faq-mobile.png` | 390 x 2,951 px | Complete `/faq` standalone route with 12 expandable accordions. |
| **16** | **Contact Us Page** | `page-contact-desktop.png` | 1440 x 1,823 px | `page-contact-mobile.png` | 390 x 3,294 px | Complete `/contact` standalone route with message form and social channels. |
| **17** | **Terms & Conditions Page** | `page-terms-desktop.png` | 1440 x 3,346 px | `page-terms-mobile.png` | 390 x 4,787 px | Complete `/terms` standalone route with 12 Pakistani legal clauses. |

---

## 10. SUMMARY AUDIT MATRIX

| Inspection Dimension | Audit Status | Critical Finding |
|---|---|---|
| **Free Fire vs. PUBG Focus** | **CRITICAL MISMATCH** | Codebase is 100% Free Fire. Root `index.html` metadata heavily advertises PUBG Mobile. |
| **3D & Animation Libraries** | **OVER-DEPENDENT** | Three.js, R3F, Motion, and Supabase are installed in `package.json` but completely unused in active UI. Only `lenis` is active. |
| **Asset Formats** | **ANOMALOUS** | `logo.png` and `app-icon.png` are JFIF JPEGs with no alpha channel. `og-image.jpg` and `twitter-image.jpg` are missing (404). |
| **Routing Architecture** | **PSEUDO-ROUTING** | Uses custom React state with History API. Missing server rewrites will trigger 404 on hard refresh. |
| **Theme System** | **DARK-ONLY** | `next-themes` is mounted in root, but Tailwind has no dark mode config and UI is hardcoded dark. |
| **Form Functionality** | **MOCK ONLY** | Contact form submission resets state in memory; no data is dispatched over network. |
| **Design Consistency** | **MODERATE DRIFT** | Hero is exceptional; downstream sections introduce multiple gradient variants and colored card borders. |
| **Screenshot Archive** | **100% COMPLETE** | 34 screenshots covering every section and page at 1440px and 390px saved to `/audit-screenshots`. |

---
*End of Audit Report (`ARENAX_WEBSITE_AUDIT.md`).*
