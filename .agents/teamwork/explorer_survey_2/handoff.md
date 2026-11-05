# Survey Report: UI Components, Layout Hierarchy, and Design System Architecture

## 1. Observation

### 1.1 Technical Environment and Base Verification
The project at `c:\Users\Muhammad Minhas\ArenaX-Web` is a React 18 single-page application built with Vite 8.3.5 and TypeScript 5.5.3, styled with Tailwind CSS 3.4.1.

Automated baseline tool executions:
* `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`): Exited with code `0`, zero errors.
* `npm run lint` (`eslint .`): Exited with code `0`, zero errors or warnings.
* `npm run build` (`vite build`): Exited with code `0`, built bundle:
  * JS: `521.17 kB` (`156.28 kB` gzip)
  * CSS: `96.88 kB` (`26.85 kB` gzip)
  * Total compilation time: `3.20s`

---

### 1.2 Component Inventory Catalog

All UI components reside in `src/components/` and `src/components/primitives/`. The directory `src/components/ui/` is currently empty.

| Category | Component | File Path | Line Count | Primary Role & Visual Structure |
|---|---|---|---|---|
| **Primitives** | `Button` | `src/components/primitives/Button.tsx` | 93 | Button primitive supporting `primary`, `secondary`, `ghost` variants, `sm`/`md`/`lg` sizes, anchor rendering (`asAnchor`), left/right icon slots. |
| **Primitives** | `Card` | `src/components/primitives/Card.tsx` | 47 | Glass card wrapper with `base` and `highlighted` variants, hover lift (`hover:-translate-y-1`), and backdrop blur. |
| **Primitives** | `Badge` | `src/components/primitives/Badge.tsx` | 56 | Compact status pill with `emerald`, `neutral`, `danger` tones, optional dot indicator and pulse animation (`animate-ping`). |
| **Primitives** | `Pill` | `src/components/primitives/Pill.tsx` | 36 | Tactical eyebrow chip with emerald glowing dot, uppercase tracking, and backdrop blur. Used as section eyebrows across the site. |
| **Primitives** | `HudCorners` | `src/components/primitives/HudCorners.tsx` | 62 | Four 1px corner brackets conforming to host border-radius (`emerald` / `neutral`, `sm` / `md`). |
| **Primitives** | `IconOrb` | `src/components/primitives/IconOrb.tsx` | 57 | Backlit Lucide icon container with hairline border and ambient glow halo (`sm`/`md`/`lg`). |
| **Primitives** | `Stat` | `src/components/primitives/Stat.tsx` | 36 | Metric display with `value`, `label`, optional `subtext` (Line 30), and `accent` glow. |
| **Primitives** | `Container` | `src/components/primitives/Container.tsx` | 24 | Layout container (`max-w-[1200px] mx-auto px-6 w-full`). |
| **Primitives** | `Section` | `src/components/primitives/Section.tsx` | 42 | Section wrapper with clamp padding (`py-[clamp(80px,10vw,140px)]`), optional deep surface (`--bg-0`), and top/bottom borders. |
| **Navigation & Chrome** | `Navbar` | `src/components/Navbar.tsx` | 249 | Fixed top navigation header, dynamic emerald scroll progress bar, logo + brand subtext, anchor link scroll spy, and full-screen mobile drawer. |
| **Navigation & Chrome** | `Footer` | `src/components/Footer.tsx` | 175 | 4-column site footer (Brand & 24/7 badge, Navigation, Legal & Rules, Channels & helpline), bottom copyright bar and tagline chips. |
| **Navigation & Chrome** | `WhatsAppButton` | `src/components/WhatsAppButton.tsx` | 44 | Fixed floating action button (FAB) with safe-area insets, radial ping pulse, and hover tooltip ("Chat on WhatsApp"). |
| **Navigation & Chrome** | `SmoothScroll` | `src/components/SmoothScroll.tsx` | 86 | Lenis smooth scroll engine synced to GSAP ScrollTrigger ticker; MutationObserver pauses Lenis when mobile modal/drawer is open. |
| **Navigation & Chrome** | `SEO` | `src/components/SEO.tsx` | 72 | Dynamic document head manager (meta title, description, canonical link, Open Graph, Twitter cards, and JSON-LD schema injection). |
| **Home Sections** | `Hero` | `src/components/Hero.tsx` | 362 | Broadcast header tags, tactical character switcher (Red Criminal vs Streetwear Rebel), 3D Z-plane parallax title, dual CTAs, 3-metric telemetry ribbon, organic curved exit SVG mask. |
| **Home Sections** | `Statement` | `src/components/Statement.tsx` | 136 | 4 numbered platform protocol rows with GSAP word-by-word scrubbed opacity reveal and detail paragraphs. |
| **Home Sections** | `AppExperienceShowcase` | `src/components/AppExperienceShowcase.tsx` | 399 | Desktop pinned scene (`pin: true`) with 3 narrative chapters and CSS 3D rotating smartphone mockup (Lobby, OCR Scanner, Wallet). |
| **Home Sections** | `TournamentModes` | `src/components/TournamentModes.tsx` | 420 | Bermuda Battle Royale vs Clash Squad 4v4 switcher with interactive sub-format selector and 3D specular mouse-tilt card. |
| **Home Sections** | `AIVisionShowcase` | `src/components/AIVisionShowcase.tsx` | 390 | Simulated Free Fire scoreboard in CSS 3D perspective with continuous emerald scanline, telemetry extraction dossier, and interactive combat points calculator. |
| **Home Sections** | `WalletSection` | `src/components/WalletSection.tsx` | 225 | Two-vault financial security architecture, 5-stage capital lifecycle flow diagram with scroll line-draw, and Play Wallet vs Winning Wallet depth panels. |
| **Home Sections** | `LeaderboardTiers` | `src/components/LeaderboardTiers.tsx` | 435 | 8-tier horizontal scrollable rank carousel (Bronze to Grandmaster) and interactive rank-gap calculator with points slider and milestone dossier. |
| **Home Sections** | `OrganizerProgram` | `src/components/OrganizerProgram.tsx` | 235 | 4 operational pillars and interactive Host Earnings Simulator with 3 touch-friendly range sliders and real-time net earnings calculation. |
| **Home Sections** | `HowItWorks` | `src/components/HowItWorks.tsx` | 208 | 6-step vertical onboarding timeline with scroll-scrubbed emerald progress fill line and 3D step rotation entry. |
| **Home Sections** | `PlatformComparison` | `src/components/PlatformComparison.tsx` | 155 | Broadcast evaluation table (6 dimensions) comparing ArenaX Official Client against informal WhatsApp/social scrims (desktop table + mobile card stack). |
| **Home Sections** | `ScoutRewards` | `src/components/ScoutRewards.tsx` | 144 | Compact 2-card pair detailing community referral royalties and in-app Free Fire diamond membership redemption vouchers. |
| **Home Sections** | `Download` | `src/components/Download.tsx` | 194 | Download hub with giant ARENAX typography echo, Android APK primary card (live SVG QR code), iOS muted card, and 4-step installation guide. |
| **Standalone Pages** | `About` | `src/components/About.tsx` | 143 | Mission statement, Our Story card with brand emblem, 4 platform pillars grid, and download CTA. |
| **Standalone Pages** | `FAQ` | `src/components/FAQ.tsx` | 191 | 10-item accordion knowledge base and 24/7 support channel card. |
| **Standalone Pages** | `Contact` | `src/components/Contact.tsx` | 256 | Contact channels (email, WhatsApp, SLA) and direct ticket contact form (name, email, topic select, message textarea, mailto fallback). |
| **Standalone Pages** | `Terms` | `src/components/Terms.tsx` | 84 | Legal user agreement across 5 numbered sections. |
| **Standalone Pages** | `Privacy` | `src/components/Privacy.tsx` | 80 | Data protection policy across 4 numbered sections. |
| **Standalone Pages** | `RefundPolicy` | `src/components/RefundPolicy.tsx` | 77 | 100% automated cancellation refund policy across 4 numbered sections. |
| **Standalone Pages** | `FairPlay` | `src/components/FairPlay.tsx` | 74 | Anti-cheat rules (mobile devices only, UID validation, anti-photoshop verification, hardware bans). |

---

### 1.3 Audit of Embedded Helper Copy, Taglines, Hints, Placeholders, and Secondary Labels

A thorough scan reveals that almost every screen and section contains secondary helper text, taglines, sub-labels, or explanatory paragraphs. Below is the exact inventory with file paths and line numbers:

#### 1. Primitives
* `src/components/primitives/Stat.tsx:6, 30`:
  ```tsx
  30: {subtext && <span className="mt-1 font-mono text-xs leading-normal text-text-2 tabular-nums">{subtext}</span>}
  ```
  *Subtext prop allows secondary explanatory copy.*

#### 2. Navbar & Chrome
* `src/components/Navbar.tsx:118-120`:
  ```tsx
  118: <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-text-3 -mt-0.5 hidden sm:block">
  119:   ESPORTS CLIENT
  120: </span>
  ```
  *Secondary tagline under logo.*
* `src/components/Navbar.tsx:238`: Button text discrepancy: `"Download APK (v2.6)"` (mobile drawer) vs Line 158: `"Download App"` (desktop).
* `src/components/WhatsAppButton.tsx:32-36`: Hover tooltip copy: `"Chat on WhatsApp"`.

#### 3. Section 01: Hero (`src/components/Hero.tsx`)
* Lines 120-123: Badge copy: `OFFICIAL CLIENT • v2.6.0`.
* Lines 159: Hover title tooltip: `title={`${c.name} (${c.badge})`}`.
* Lines 192-194: Secondary badge subtext: `<span className="text-[10px] font-mono uppercase tracking-widest text-text-3 mt-1.5">PK Esports Circuit</span>`.
* Lines 202-204: Secondary badge subtext: `<span className="text-[10px] font-mono uppercase tracking-widest text-text-3 mt-1.5">Free Fire Only</span>`.
* Lines 250-252: Promotional callout pill: `"25 AX Free Welcome Bonus For Referred Accounts"`.
* Lines 259-261: Subhead explanatory paragraph:
  ```tsx
  259: <p className="text-base sm:text-lg text-text-2 max-w-2xl mx-auto leading-relaxed mb-7 px-2">
  260:   Daily Bermuda BR & 4v4 Clash Squad scrims. Verified by AI vision in seconds, with 24-hour cash withdrawals to JazzCash & EasyPaisa.
  261: </p>
  ```
* Lines 287-323: 3 telemetry cards each have secondary labels:
  * Line 291: `"AI Vision Engine"` / Line 295: `"Scoreboards verified in seconds"`
  * Line 303: `"Two-Wallet Security"` / Line 307: `"1 AX = 1 PKR cash parity"`
  * Line 315: `"Solvency Guarantee"` / Line 319: `"100% automated refund"`

#### 4. Section 02: Platform Statement (`src/components/Statement.tsx`)
* Line 89: Eyebrow pill: `<Pill dot={true} label="PLATFORM PROTOCOL" />`.
* Line 109: Mono number indicator: `/{item.num}`.
* Lines 124-126: Every statement row carries a secondary explanatory paragraph (`statement-detail`):
  * Item 01: `"AI vision scans end-match victory screenshots automatically. Zero host bias, zero dispute delays."`
  * Item 02: `"Direct transfers to JazzCash, EasyPaisa, and Pakistani bank accounts with 1 AX = 1 PKR cash parity."`
  * Item 03: `"Deposits and tournament prize money remain completely segregated. 100% automated match refund guarantee."`
  * Item 04: `"Strict in-game UID roster validation before credentials unlock. Zero tolerance for emulators or hacks."`

#### 5. Section 03: App Experience (`src/components/AppExperienceShowcase.tsx`)
* Line 106: Eyebrow pill: `<Pill dot={true} label="INSIDE THE ANDROID CLIENT" />`.
* Lines 110-112: Explanatory paragraph: `"Experience the actual tournament workflow built into our native Android application."`
* Chapter definitions (Lines 23, 24, 30, 31, 37, 38):
  * Chapter 1 Tagline: `"Instant room locking with verified Free Fire UID matching."` + Desc: `"Room ID and Password unlock strictly 10–15 minutes before the match countdown. Only verified registered roster slots can enter."`
  * Chapter 2 Tagline: `"End-match screenshots parsed and verified within seconds."` + Desc: `"Computer vision reads player in-game names, damage, kill tallies, and Booyah placement directly from victory screenshots with zero human host bias."`
  * Chapter 3 Tagline: `"1 AX Coin = 1 PKR Cash parity with 24-hour payouts."` + Desc: `"Entry balances are kept in the Play Wallet, while prize winnings credit automatically to the Winning Wallet, withdrawable to JazzCash or EasyPaisa."`
* Inside the coded phone UI:
  * Line 227: Subtitle under player name: `"Grandmaster Contender"`.
  * Line 232: Secondary label: `"BALANCE"` above `1,450 AX`.
  * Line 255: Subtext: `"Starts 21:00 PKT"`.
  * Line 294: Helper subtext: `"Room slots locked to verified player UIDs only."`.
  * Line 309: Helper subtext: `"Multi-player end-match score extraction"`.
  * Line 340: Pill tag: `"Result Verified within Seconds"`.
  * Lines 353-354: Sub-labels: `"Play Wallet"` / `"Non-Withdrawable"`.
  * Line 356: Helper subtext: `"Used for match entry fees & bonuses"`.
  * Lines 362-363: Sub-labels: `"Winning Wallet"` / `"100% Cash"`.
  * Line 368: Helper subtext: `"Available for 24h JazzCash/EasyPaisa cashout"`.
  * Line 372: Footnote subtext: `"Protected by 6-digit Fund Password"`.

#### 6. Section 04: Tournament Modes (`src/components/TournamentModes.tsx`)
* Line 71: Eyebrow pill: `<Pill dot={true} label="SANCTIONED FORMATS" />`.
* Lines 75-77: Descriptive subhead paragraph.
* Lines 114-116 & 262-264: Eyebrow tags: `"SURVIVAL FORMAT"`, `"BRACKET ELIMINATION"`.
* Rules list subtext (Lines 131, 140, 147, 279, 286, 294):
  * `"Slots lock strictly to registered in-game UIDs."`
  * `"Scoreboard screenshots parsed and verified within seconds."`
  * `"100% fee refunded to Play Wallet if a match fails to start."`
  * `"Round progression tracked directly inside the mobile app."`
  * `"Captains assemble their 4-player lineup in seconds."`
  * `"Winning prize credits directly to Winning Wallet upon Finals victory."`
* 3D Card preview subtext:
  * Line 191: `"Interactive Preset"`
  * Line 335: `"Interactive Tree"`
  * Table row labels: `ROSTER`, `SLOTS`, `ENTRY FEE`, `PRIZE POOL`
  * Line 240: `"Room Capacity"`
  * Lines 384, 397: `"Roster Verified"`, `"Seed #1"`, `"Seed #4"`
  * Line 409: `"Single elimination with automated match progression."`

#### 7. Section 05: Vision Engine (`src/components/AIVisionShowcase.tsx`)
* Line 118: Eyebrow pill: `<Pill dot={true} label="COMPUTER VISION OCR" />`.
* Lines 122-124: Subtitle copy: `"Players upload the scoreboard. AI reads it. Winners get paid."`
* Simulated Scoreboard:
  * Line 163: `"OCR STATUS: ACTIVE"`
  * Line 169: `"BOUNDING BOX: UID MATCHED"`
  * Line 177: `"(UID: 2849182390)"`
  * Line 210: `"Anti-Photoshop Verification"`, Line 212: `"SHA-256 Passed"`
* Telemetry Extraction Panel:
  * Line 227: `"{confidence}% AI CONFIDENCE"`
  * Table labels: `IN-GAME NAME`, `VERIFIED UID`, `CONFIRMED KILLS`, `BOOYAH PLACEMENT`, `TOTAL COMBAT SCORE`
  * Line 259: `"Credited to Winning Wallet"`
* Combat Points Calculator:
  * Line 274: Eyebrow: `"OFFICIAL SCORING FORMULA"`
  * Line 282: Subtitle: `"1 Booyah = 20 PTS • 1 Kill = 5 PTS"`
  * Slider labels: `"Match Placement"`, `"Kills (5 PTS Each)"`
  * Output card labels: `"Calculated Rating"`, `"Projected Tier"`
  * Line 378: Footnote: `"Based on official rulebook formula"`

#### 8. Section 06: Two-Vault Wallet (`src/components/WalletSection.tsx`)
* Line 62: Eyebrow pill: `<Pill dot={true} label="FINANCIAL ARCHITECTURE" />`.
* Lines 69-71: Subtitle copy: `"Tournament entry balances are strictly isolated from verified prize money, guaranteeing 1 AX = 1 PKR parity."`
* Capital Flow Lifecycle:
  * Line 79: Eyebrow: `"CAPITAL FLOW LIFECYCLE"`
  * Flow nodes subtext (Lines 13-17): `"JazzCash / EasyPaisa"`, `"Non-Withdrawable"`, `"Free Fire BR / CS"`, `"1 AX = 1 PKR"`, `"< 24h Direct"`.
* Play Wallet:
  * Line 130: `"VAULT 01"`, Line 134: `"Entry Registration Balance"`, Line 137: `"Non-Withdrawable"`
  * Lines 141-143: Paragraph explanation
  * Lines 148, 152, 156: Bullet explanations
  * Line 163: Footnotes: `"Min Deposit: PKR 50"`, `"Protected Escrow"`
* Winning Wallet:
  * Line 176: `"VAULT 02 (PRIZE ESCROW)"`, Line 180: `"1 AX Coin = 1 PKR Cash"`, Line 183: `"100% Withdrawable"`
  * Lines 187-189: Paragraph explanation
  * Lines 194, 198, 202: Bullet explanations
  * Lines 211, 214: Footnotes: `"Payout SLA: < 24 Hours"`, `"Zero Hidden Commissions"`

#### 9. Section 07: Competitive Ranks (`src/components/LeaderboardTiers.tsx`)
* Line 86: Eyebrow pill: `<Pill dot={true} label="SEASON 4 RANK SYSTEM" />`.
* Lines 90-92: Subtitle copy: `"Ascend from Bronze to Grandmaster. Every promotion milestone unlocks direct cash bonuses deposited into your Winning Wallet."`
* Line 99: Header badge: `"8 TIERS // ACTIVE CIRCUIT"`.
* Tier Cards:
  * Counters: `01 / 08`, `APEX`, `ACTIVE`, `SIMULATE`
  * Line 213: Sub-range: `Tier I–IV`
  * Line 225: Secondary label: `"Promotion Reward"`
* Tactical Promotion Simulator:
  * Line 256: Eyebrow: `"// TACTICAL PROMOTION SIMULATOR"`
  * Line 266: Subtext: `"1 Booyah = +20 PTS"`
  * Labels: `"Your Current Rating"`, `"Select Target Promotion Tier"`, `"Target Milestone"`, `"Points Needed:"`, `"Booyahs Required:"`, `"Bonus Deposit:"`, `"Progress to {selectedTier.name}"`
  * Line 423: Footnote: `"Instant Winning Wallet credit upon verification."`

#### 10. Section 08: Organizer Program (`src/components/OrganizerProgram.tsx`)
* Line 58: Eyebrow pill: `<Pill dot={true} label="ORGANIZER PROGRAM" />`.
* Lines 62-64: Subhead paragraph.
* Capability list numbers & descriptions (Lines 28-47).
* Host Earnings Simulator:
  * Line 109: Subtitle: `"10% Platform Rake"`
  * Sliders secondary tick marks (Lines 131-133, 154-156, 177-179): `10 (CS)`, `24 (Duo)`, `48 (Bermuda)`, `50 PKR (Entry)`, `200 PKR`, `500 PKR (High Stakes)`, `0% (Community)`, `10% (Standard)`, `20% (Max Cut)`
  * Breakdown labels: `TOTAL REVENUE`, `PLATFORM FEE (10%)`, `PRIZE POOL ({playerPrizePercent}%)`
  * Line 204: Label: `"Net Organizer Payout"`
  * Line 213: Explanatory paragraph: `"Credited directly to your dedicated Organizer Wallet upon match settlement."`

#### 11. Section 09: How It Works (`src/components/HowItWorks.tsx`)
* Line 130: Eyebrow pill: `<Pill dot={true} label="PLAYER ONBOARDING" />`.
* Lines 134-136: Subhead paragraph.
* Step specification chips:
  * `"25 AX Welcome Bonus"`
  * `"Automated UID Verification"`
  * `"6-Digit Squad Codes"`
  * `"Daily Scrims 24/7"`
  * `"10–15m Credential Unlock"`
  * `"1 AX = 1 PKR Cash Parity"`
* Step detailed descriptions (Lines 16, 23, 30, 37, 44, 51).

#### 12. Section 10: Platform Comparison (`src/components/PlatformComparison.tsx`)
* Line 48: Eyebrow pill: `<Pill dot={true} label="FAIR PLAY AUDIT" />`.
* Lines 52-54: Subhead paragraph.
* Table column headers: `Evaluation Dimension`, `ArenaX Official Client`, `Informal WhatsApp / Social Scrims`.
* Mobile card sub-labels (Lines 130, 141): `ArenaX Official`, `Informal Scrims`.

#### 13. Section 11: Scout Rewards (`src/components/ScoutRewards.tsx`)
* Line 20: Eyebrow pill: `<Pill dot={true} label="COMMUNITY REWARDS" />`.
* Lines 24-26: Subhead paragraph.
* Metric sub-labels: `Starter Gift`, `Win Royalty`, `Rank Bonuses`.
* Explanatory body text (Lines 74-76, 99-101).
* Footnotes:
  * Line 80: `"Enforced mathematical 50% lifetime platform rake circuit breaker guaranteeing platform solvency."`
  * Line 133: `"Digital top-ups delivered to registered player UID within 2 hours."`

#### 14. Section 12: Download (`src/components/Download.tsx`)
* Line 47: Eyebrow pill: `<Pill dot={true} label="OFFICIAL RELEASE v2.6.0" />`.
* Lines 51-53: Subhead paragraph.
* Sub-labels:
  * Line 72: `"Package: com.arenax.app"`
  * Line 140: `"Native iOS Client"`
  * Line 122: `"Scan on Android Phone"`, Line 123: `"Direct APK download link"`
* Installation guide eyebrow: `"FOUR-STEP INSTALLATION GUIDE"`.
* Step titles and descriptions (Lines 25-28).

#### 15. Standalone Pages (`About`, `FAQ`, `Contact`, `Terms`, `Privacy`, `RefundPolicy`, `FairPlay`)
* Every page has an eyebrow pill:
  * `About.tsx:53`: `ABOUT ARENAX`
  * `FAQ.tsx:80`: `SUPPORT KNOWLEDGE BASE`
  * `Contact.tsx:83`: `24/7 PLAYER HELPDESK`
  * `Terms.tsx:27`: `PLATFORM USER AGREEMENT`
  * `Privacy.tsx:27`: `DATA PROTECTION`
  * `RefundPolicy.tsx:27`: `FINANCIAL PROTECTION`
  * `FairPlay.tsx:28`: `COMPETITIVE INTEGRITY`
* Every page has a subtitle paragraph underneath the H1 heading.
* `About.tsx:75`: Secondary label `"Pakistan's Mobile Esports Platform"`, Line 91: Eyebrow `"PLATFORM PILLARS"`.
* `Contact.tsx:99, 115, 133`: Secondary descriptions: `"Direct helpdesk & dispute escalation"`, `"Instant answers for tournament registrations"`, `"Ticket turnaround within 2 hours"`, `"Active: Monday – Sunday (24/7 PKT)"`.
* `Contact.tsx:182, 196, 212, 232`: Form placeholder strings: `"e.g. Asad Khan"`, `"your.email@example.com"`, `"Select a topic"`, `"Describe your issue or inquiry with relevant match IDs..."`.

#### 16. Footer (`src/components/Footer.tsx`)
* Line 34: Badge `"PLATFORM OPERATIONAL 24/7"`.
* Lines 42, 70, 99: Column header labels: `"Navigation"`, `"Legal & Rules"`, `"Official Channels"`.
* Line 147: `"Direct Helpline: arenasupport@gmail.com"`.
* Lines 162-166: Bottom chip list: `"Free Fire Bermuda • Clash Squad 4v4 • AI Vision Verified"`.

---

### 1.4 Design System and Styling Architecture

#### CSS Tokens & Variables (`src/index.css` & `tailwind.config.js`)
* **Surfaces**:
  * `--bg-0`: `#0B0D0E` (deep canvas: footer, pinned scenes)
  * `--bg-1`: `#101214` (default page canvas)
  * `--bg-2`: `#15181B` (cards, containers)
  * `--bg-3`: `#1B1F22` (raised, interactive hover states)
* **Lines / Borders**:
  * `--line`: `rgba(255, 255, 255, 0.08)` (hairline structural line)
  * `--line-strong`: `rgba(255, 255, 255, 0.16)`
  * `--line-accent`: `rgba(0, 200, 120, 0.35)`
* **Text**:
  * `--text-1`: `#F3F4F6` (high-contrast primary heading/body)
  * `--text-2`: `#A1A1AA` (muted secondary body)
  * `--text-3`: `#8A8A93` (telemetry, mono metadata)
* **Accent**:
  * Strictly single accent: Emerald (`#00C878`)
  * Hover: `#00DB86`
  * Dim: `rgba(0, 200, 120, 0.12)`
* **Semantic Exceptions**:
  * `--danger`: `#EF4444` (used for Red Criminal aura and error alerts)
  * `--whatsapp`: `#25D366` (used exclusively for WhatsApp FAB)
* **Typography Stack**:
  * Display / Headings: `Outfit` (font-heading, weights 600, 800)
  * Body: `Inter` (font-sans, weights 400, 500, 600)
  * Data / Code: `JetBrains Mono` (font-mono, weights 400, 500)
* **Radii & Controls**:
  * `rounded-card`: `20px`
  * `rounded-control`: `12px`
* **Card & Surface Classes**:
  * `.hud-card`: Frosted 18px backdrop blur, 1px top highlight, 1px white border, dark gradient.
  * `.hud-card-highlight`: Emerald glow border and top highlight.
  * `.glass-panel`: Nested inner card.
  * `.HudCorners`: 1px decorative corner arcs conforming to card border radius.

---

## 2. Logic Chain

### Step 1: Mapping Requirement R1 to Codebase Reality
* *Observation 1.3*: Over 50 distinct instances of taglines, explanatory paragraphs, eyebrow pills, micro-subtitles, secondary labels, and footnotes exist across all 12 home sections and 7 legal/support pages.
* *Inference*: The platform currently relies heavily on verbal explanation ("tell") rather than visual hierarchy ("show"). Linear and Apple Notes exemplify a "show, don't tell" design philosophy where layout, typography scale, affordance contrast, and interaction response make the product self-explanatory without explanatory copy.

### Step 2: Evaluating Visual Affordances vs Helper Text Dependency
* *Observation 1.3 (Section 06, Two-Vault Wallet)*: The two vaults currently have subtext (`VAULT 01`, `Entry Registration Balance`, `Non-Withdrawable`, `VAULT 02 (PRIZE ESCROW)`, `1 AX Coin = 1 PKR Cash`, `100% Withdrawable`) along with bullet paragraphs.
* *Inference*: The visual hierarchy can communicate these distinctions directly. The Winning Wallet is already rendered with `hud-card-highlight` (emerald glow) and a distinct currency badge, while the Play Wallet is neutral. By elevating the typographic contrast and action buttons ("Deposit" on Play Wallet, "Cashout" on Winning Wallet), the purpose of both vaults is instantly obvious without explanatory subtitles.

### Step 3: Evaluating Interactive Components (Calculators and Simulators)
* *Observation 1.3 (Section 05 Combat Points, Section 07 Rank-gap, Section 08 Organizer Program)*:
  * Combat points calculator has: `"OFFICIAL SCORING FORMULA"`, `"1 Booyah = 20 PTS • 1 Kill = 5 PTS"`, `"Match Placement"`, `"Kills (5 PTS Each)"`, `"Calculated Rating"`, `"Projected Tier"`, `"Based on official rulebook formula"`.
  * Organizer simulator has: `"10% Platform Rake"`, multiple range slider tick labels, economics breakdown, `"Credited directly to your dedicated Organizer Wallet upon match settlement."`.
* *Inference*: Interactive controls do not need subtitles when their values update dynamically. For example, moving a kill slider that immediately increments the calculated points and shifts the tier badge provides instant, intuitive cause-and-effect feedback.

### Step 4: Assessing Component Hierarchy and DX Consistency
* *Observation 1.2*: Primitives (`Button`, `Card`, `Badge`, `Pill`, `HudCorners`, `IconOrb`, `Stat`, `Container`, `Section`) exist in `src/components/primitives/`. However:
  * `Stat.tsx` still has an obsolete `subtext` prop (violating R1 if used).
  * `Section.tsx` and `Container.tsx` are underutilized; several components (`TournamentModes`, `AIVisionShowcase`, `Download`) re-implement raw `<section>` and `<div className="max-w-[1200px] mx-auto px-6">` tags.
  * `Pill.tsx` is used as an eyebrow tag on every single page and section, creating visual monotony. Linear and Apple Notes avoid repetitive eyebrow chips; they let clear H1/H2 headlines anchor each section.
* *Inference*: Adopting a unified component layout hierarchy across all screens will simplify the codebase (DX) and create visual calm (UX) simultaneously.

---

## 3. Caveats

1. **Read-Only Scope**: This report is purely diagnostic and exploratory. No source code modifications or file rewrites outside `.agents/teamwork/explorer_survey_2/` were performed.
2. **Dynamic Screen Mockups**: The simulated in-app screens in `AppExperienceShowcase.tsx` represent coded mockups of the Android application. If external screenshots are placed into `public/screens/` in the future, the component will load physical images instead of the coded UI.
3. **Legal Compliance Copy**: Standalone pages (`Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx`) contain legal text governed by Pakistani regulatory and consumer protection standards. While taglines, eyebrow pills, and subtitles can be stripped from page headers, the formal legal clauses themselves must remain legally complete.

---

## 4. Conclusion

The ArenaX-Web codebase possesses a clean, modern design foundation (single emerald accent, Outfit/Inter/JetBrains typography, Lenis + GSAP motion, and zero compile/lint errors). However, it is saturated with extraneous helper copy, redundant eyebrow pills, and secondary subtitles on every component.

### Recommended Simplification Blueprint (Linear / Apple Notes Polish)

| Component / Section | Current Clutter / Helper Copy | Proposed Simplified Design (Linear / Apple Notes Style) |
|---|---|---|
| **All Sections & Pages** | Monotonous `<Pill dot={true} label="..." />` eyebrows + explanatory subtitle paragraphs under headings. | Remove all redundant eyebrow pills and paragraph subtitles. Let bold, high-contrast H2 headlines anchor each section directly. |
| **`Navbar.tsx`** | Secondary logo subtext (`ESPORTS CLIENT`). Inconsistent mobile button text. | Clean logo mark: `ArenaX` with emerald `X`. Uniform button label: `"Download"`. |
| **`Hero.tsx`** | Callout bonus pill, secondary badge subtitles (`[2026] PK Esports Circuit`, `SEASON 4 Free Fire Only`), long explanatory subhead, dual micro-labels on telemetry ribbon. | Retain bold headline `"Pakistan's Premier Free Fire Platform"`. Telemetry ribbon displays large metrics with single, concise labels (`AI Vision`, `1:1 Cash Parity`, `Instant Refund`). |
| **`Statement.tsx`** | Eyebrow pill, mono numbers (`/01`), and 4 long detail explanation paragraphs. | Maintain clean editorial layout: keep only the punchy primary statements with GSAP scrubbed word reveal. Remove the verbose explanatory paragraphs. |
| **`AppExperienceShowcase.tsx`** | Taglines and explanatory paragraphs on every chapter. Cluttered sub-labels in phone UI (`Grandmaster Contender`, `BALANCE`, etc.). | Crisp chapter titles (`Match Credentials`, `AI Scoreboard`, `Dual-Vault Escrow`). Clean phone mockup showing verified data without helper labels. |
| **`TournamentModes.tsx`** | Format eyebrows (`SURVIVAL FORMAT`), bullet subtext explanations, preview card helper labels. | Segmented tab switcher (`Bermuda 48P` / `Clash Squad 4v4`). Clean match preset card displaying Roster, Slots, Entry, Prize directly. |
| **`AIVisionShowcase.tsx`** | Explanatory subhead, AI confidence taglines, formula footnotes. | Perspective scoreboard speaks for itself with scanline animation. Compact combat points calculator with direct Kill Slider and real-time Booyah toggle. |
| **`WalletSection.tsx`** | Capital flow sub-labels (`JazzCash / EasyPaisa`, `Non-Withdrawable`, etc.), vault sub-labels, multiple bullet points, footnotes. | Clean 5-step flow node titles (`Deposit` → `Play Wallet` → `Scrim` → `Winning Wallet` → `Cashout`). Two depth panels with clear visual distinction and direct actions (`Deposit`, `Cashout`). |
| **`LeaderboardTiers.tsx`** | Telemetry pill (`8 TIERS // ACTIVE CIRCUIT`), simulator footnotes, redundant labels. | Horizontal tier track showing badge, tier name, and points threshold. Interactive simulator with clean slider and projected tier card. |
| **`OrganizerProgram.tsx`** | Capability subtext, slider tick labels (`10 (CS)`, `50 PKR (Entry)`), platform rake subtext, payout footnotes. | Clean 4-pillar list. Sleek Host Earnings Simulator showing inputs and Net Organizer Payout clearly. |
| **`HowItWorks.tsx`** | Detailed instructional paragraphs and secondary spec chips on every step. | 6 clear numbered milestone steps with concise, active-verb titles (`Download APK`, `Link UID`, `Assemble Squad`, `Enter Scrim`, `Compete`, `Cashout`). |
| **`PlatformComparison.tsx`** | Verbose comparison sentences. | High-contrast comparison matrix with clean checkmark / cross visual indicators and concise feature titles. |
| **`ScoutRewards.tsx`** | Explanatory paragraphs, circuit breaker footnotes, delivery SLA footnotes. | Clean 2-card presentation: Scout Royalty (25 AX starter, 2% win royalty) and Digital Store vouchers (100 Diamonds, 520 Diamonds, Weekly Pass). |
| **`Download.tsx`** | Package subtext, iOS subtitle, QR helper text, 4-step installation paragraphs. | Giant ARENAX background typography. Prominent Android Download button + QR code. Simplified 4-step numbered install sequence. |
| **`Footer.tsx`** | Repetitive chips, verbose brand paragraph, secondary helpline label. | Clean 4-column footer with crisp link lists, social icon buttons, and streamlined legal copyright notice. |
| **`Contact.tsx`** | Explanatory descriptions under every channel, verbose placeholders. | Clean, elegant form fields with concise labels. No placeholder clutter. |

---

## 5. Verification Method

To independently verify the observations, structural catalog, and findings in this report:

1. **Static Analysis & Typecheck**:
   ```bash
   npm run typecheck
   ```
   *Expected outcome*: Passes with 0 errors.

2. **Linting Integrity**:
   ```bash
   npm run lint
   ```
   *Expected outcome*: Passes with 0 errors and 0 warnings.

3. **Production Build Compilation**:
   ```bash
   npm run build
   ```
   *Expected outcome*: Generates `dist/` bundle cleanly in under 4 seconds with 0 build errors.

4. **File Inspection**:
   * Inspect primitive definitions in `src/components/primitives/`.
   * Check all helper copy instances documented in Section 1.3 at their respective line numbers.
   * Verify layout hierarchy consistency across `src/components/*.tsx`.

5. **Invalidation Conditions**:
   * If any documented file path or line number does not correspond to the existing codebase, or if new components are added that alter the inventory catalog, this survey report should be updated accordingly.
