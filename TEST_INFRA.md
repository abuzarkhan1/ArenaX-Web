# ArenaX-Web Test Architecture & Infrastructure (`TEST_INFRA.md`)

**Specification Document**: Automated Verification Pipeline, 4-Tier Test Suite Architecture, and Requirement Invariants  
**Author**: Teamwork Test Writer (`test_writer_e2e`)  
**Timestamp**: 2026-11-07  
**Project**: ArenaX-Web (`c:\Users\Muhammad Minhas\ArenaX-Web`)  
**Design System Target**: Supabase Dark Carbon & Precision Hairline Design System  

---

## 1. Executive Summary & Verification Philosophy

The ArenaX-Web test infrastructure implements a deterministic, multi-layered quality assurance harness engineered to guarantee:
1. **Strict Reference Immutability (Requirement R1)**: Absolute read-only integrity for the reference artifact `Supabase _ The Postgres Development Platform.html` and its associated files folder (`Supabase _ The Postgres Development Platform_files/`).
2. **Authoritative Supabase Design Tokens Compliance (Requirement R2)**: Strict adherence to extracted Supabase tokens:
   - Canonical green accent `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`), hover stop `#34B27B`, gradient stop `#249361`
   - Dark carbon surface hierarchy (`#121212` canvas, `#171717` card surface, `#0E0F0E` backdrop, `#202220` elevated)
   - 1px hairline border architecture (`rgba(255, 255, 255, 0.08)`, `rgba(255, 255, 255, 0.14)`, `rgba(62, 207, 142, 0.35)`)
   - Root dark mode enforcement (`data-theme="dark"` and `style="color-scheme: dark;"`)
   - Typography hierarchy (Manrope headings, Inter body, Source Code Pro monospace)
3. **100% Verbatim Content Preservation (Requirement R3)**: Zero loss, modification, or regression of public website copy, numbers, calculator math, rules, legal documentation, or interactive features cataloged in `views_catalog.md`.
4. **Zero-Defect Build & Type Integrity (Requirement R4)**: Full static type safety without implicit `any` (`tsc --noEmit`), clean ESLint analysis, and production bundle generation (`vite build`).

---

## 2. 4-Tier Test Architecture

The automated test harness organizes validation into four hierarchical tiers plus requirement invariants:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        REQUIREMENT INVARIANTS                          │
│   R1 Reference Immutability  │  R3 Content Preservation  │  R4 Build   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 4: REAL-WORLD APPLICATION SCENARIOS                  │
│   End-to-End User Journeys • Guild Tournaments • Dispute Workflows     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 3: CROSS-FEATURE INTERACTIONS                        │
│   Theme Tokens ↔ Calculators • Route Topology • Economic Models        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 2: BOUNDARY & CORNER CASES                           │
│   Empty States • Extreme Viewports (320px–4K) • Missing Props Fallback │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 1: COMPREHENSIVE FEATURE COVERAGE                    │
│   Supabase Design Tokens • UI Primitives • 20 Features • 8 Routes      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Tier 1: Feature Coverage

**Primary Test File**: `tests/tier1-feature-coverage.test.ts` & `tests/supabase-tokens-and-invariants.test.ts`  
**Objective**: Exercise the happy path and primary behavior for every design token, UI primitive, section component, and public route.

#### Core Capabilities Verified:
1. **Supabase Design Tokens**:
   - Signature brand green `#3ECF8E` defined in `src/index.css` and `tailwind.config.js`.
   - Brand hover state `#34B27B` and gradient stop `#249361`.
   - Dark carbon canvas `#121212`, card surface `#171717` (`#171817`), deep canvas `#0E0F0E`, elevated popover `#202220`.
   - Hairline borders: subtle `rgba(255, 255, 255, 0.08)`, strong `rgba(255, 255, 255, 0.14)`, accent `rgba(62, 207, 142, 0.35)`.
   - Document root dark theme (`class="dark"`, `data-theme="dark"`, `color-scheme: dark`).
   - Font family hierarchy (Manrope, Inter, Source Code Pro / JetBrains Mono).
2. **UI Primitives (`src/components/primitives/`)**:
   - `Button.tsx`: Primary `#3ECF8E` fill, secondary carbon hairline border, ghost transparent, tactile press `motion-safe:active:scale-[0.97]`, polymorphic anchor mode (`asAnchor`, `href`).
   - `Card.tsx`: Base `hud-card` and highlighted `hud-card-highlight` surfaces with 1px hairline borders.
   - `Badge.tsx`: Emerald `#3ECF8E`, neutral, and danger tones with monospace tabular numerals and optional pulsing LED dot.
   - `Stat.tsx`: High-contrast quantitative telemetry blocks (value and label, strictly without deprecated subtext prop).
   - `HudCorners.tsx`, `IconOrb.tsx`, `Container.tsx`, `Section.tsx`.
3. **Public Route Topology**:
   - All 8 registered public routes (`/`, `/about`, `/faq`, `/contact`, `/terms`, `/privacy`, `/refund-policy`, `/fair-play`) plus wildcard fallback (`*`).
4. **All 20 Functional Showcase Features (F1–F20)**:
   - F1 Navigation & Header Chrome (`Navbar.tsx`)
   - F2 Global Footer & Legal Navigation (`Footer.tsx`)
   - F3 Floating WhatsApp FAB (`WhatsAppButton.tsx`)
   - F4 UI Primitives System (`primitives/*`)
   - F5 Hero Showcase & Dual Characters (`Hero.tsx`)
   - F6 Platform Protocol Statements (`Statement.tsx`)
   - F7 3D Phone Mockup Showcase (`AppExperienceShowcase.tsx`)
   - F8 Tournament Modes Switcher (`TournamentModes.tsx`)
   - F9 AI Vision OCR Scoreboard & Calculator (`AIVisionShowcase.tsx`)
   - F10 Two-Vault Financial Architecture (`WalletSection.tsx`)
   - F11 Competitive Tiers & Rank Simulator (`LeaderboardTiers.tsx`)
   - F12 Host & Organizer Program (`OrganizerProgram.tsx`)
   - F13 6-Step Onboarding Roadmap (`HowItWorks.tsx`)
   - F14 Platform Comparison Matrix (`PlatformComparison.tsx`)
   - F15 Scout Royalties & Digital Store (`ScoutRewards.tsx`)
   - F16 Android APK Hub & QR Code (`Download.tsx`)
   - F17 About Showcase (`About.tsx`)
   - F18 FAQ Accordion Knowledge Base (`FAQ.tsx`)
   - F19 Contact Helpdesk & Ticket Form (`Contact.tsx`)
   - F20 Legal Compliance Suite (`Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx`)

---

### Tier 2: Boundary & Corner Cases

**Primary Test File**: `tests/tier2-boundary-corner-cases.test.ts`  
**Objective**: Verify system robustness against non-standard inputs, extreme conditions, and edge cases.

#### Core Boundary Dimensions:
1. **Empty States & Zero Values**:
   - Combat points calculation with 0 kills under both victory (Booyah = 20 PTS) and defeat (0 PTS).
   - Clamping negative kills (`-5` or `-10`) safely to 0 without throwing or generating negative scores.
   - Floored fractional inputs (e.g. `3.8` kills -> `15` PTS) preventing floating-point drift or `NaN`.
   - Extreme kill counts (e.g. `100` kills -> `520` PTS, `500` kills -> `2500` PTS) without integer overflow.
   - Organizer revenue calculation with 0 participants or 0 PKR entry fee: yields 0 revenue while conserving balance.
   - 0% host cut allocating remaining 90% directly to player prize pool.
   - 20% host cut allocating 70% to player prize pool and 10% platform fee.
2. **Missing Props & Default Fallbacks on UI Primitives**:
   - `Button`: defaults `variant = 'primary'`, `size = 'lg'`, `fullWidth = false`, `asAnchor = false`.
   - `Card`: defaults `variant = 'base'`, `interactive = true`, `as: Component = 'div'`.
   - `Badge`: defaults `tone = 'emerald'`, `dot = false`, `pulse = false`.
3. **Extreme Viewports & Responsive Layout Clamps**:
   - Minimum supported mobile viewport (320px width - compact mobile): verifies `overflow-x: hidden` and `max-width: 100%` on root to prevent horizontal jitter.
   - Desktop and 4K ultra-wide viewports (1920px–3840px): verifies `max-w-[1200px] mx-auto` centering to prevent widescreen distortion.
4. **Rank Gap Math Ceilings & Boundaries**:
   - 1-point difference requiring 1 Booyah (ceiling invariant: `Math.ceil(1 / 20) === 1`).
   - Exact multiple of 20 (e.g. 20 points needed = exactly 1 Booyah).
   - 21 points needed requiring 2 Booyahs (ceiling bump: `Math.ceil(21 / 20) === 2`).
   - User already exceeding target tier: points needed and booyahs needed clamp to `0`, progress clamps to `100%`.
5. **Contact Mailto Encoding & Special Characters**:
   - Full URL encoding of RFC query meta-characters (`&`, `?`, `=`, `%`, `+`, `#`).
   - Non-ASCII and Urdu/Arabic Unicode character preservation (`محمد رضوان خان`, `اکاؤنٹ تصدیق`).
   - Massive text payloads (> 5,000 characters) without buffer overflow.
6. **FAQ Single-Open Accordion State Machine**:
   - Clicking open item toggles it closed (`openIndex -> null`).
   - Clicking alternate item closes previous and opens new item.

---

### Tier 3: Cross-Feature Combinations

**Primary Test File**: `tests/tier3-cross-feature.test.ts`  
**Objective**: Verify correct synchronization and state consistency across interacting features and design tokens.

#### Cross-Feature Dimensions:
1. **Theme Tokens Combined with Interactive Calculators & Tab State**:
   - In `AIVisionShowcase`: Combat Points Calculator operates within `hud-card` carbon surfaces while dynamically calculating total score and projecting tiers with Supabase emerald `#3ECF8E` highlights.
   - In `TournamentModes`: Mode switcher tab buttons use dark carbon `bg-bg-2` containers with hairline borders, while active tab toggles between `bg-accent text-bg-1` solid green fill and muted text.
   - In `OrganizerProgram`: Host Earnings Simulator slider operations dynamically recalculate revenue while preserving mathematical conservation and styling through `hud-card` surfaces and green callouts.
2. **Route-Navigation Topology Synchronization**:
   - Every internal anchor destination in `Navbar.tsx` maps to an existing component DOM id (`#tournaments`, `#ai-vision`, `#wallet`, `#ranks`, `#organizers`, `#how-it-works`, `#download`).
   - Every route in `Navbar.tsx` and `Footer.tsx` maps to an active route registered in `src/App.tsx`.
3. **Tournament Formats & Organizer Presets Alignment**:
   - Bermuda Battle Royale 48-player limits align across `TournamentModes.tsx` and `OrganizerProgram.tsx`.
   - Clash Squad 4v4 format alignments between tournament mode cards and organizer host presets.
4. **Economic Model Consistency Across the Platform**:
   - Strict `1 AX = 1 PKR` cash parity asserted across `WalletSection.tsx`, `FAQ.tsx`, `ScoutRewards.tsx`, and `Hero.tsx`.
   - Official 10% platform rake consistently declared across `OrganizerProgram.tsx` and `FAQ.tsx`.
   - Two-vault isolation (Play Wallet entry vault vs Winning Wallet withdrawable cash) preserved across all interactive and descriptive components.

---

### Tier 4: Real-World Application Scenarios

**Primary Test File**: `tests/tier4-real-world-scenarios.test.ts`  
**Objective**: Execute end-to-end user workflows matching real-world Pakistani esports participant journeys.

#### Scenarios Implemented:
1. **Scenario 1: Competitor Scrim & Rank Journey**:
   - Player completes a Bermuda Solo scrim with 7 kills and Booyah victory (`55` PTS).
   - Telemetry extraction maps points to projected `Heroic Tier` (75% mark).
   - Player calculates rank promotion gap from 4,800 points to Grandmaster (10,000 points): requires 5,200 points and 260 Booyahs.
   - Player navigates to download hub to fetch APK release v2.6.0.
2. **Scenario 2: Esports Guild Host Tournament Economics**:
   - Guild leader configures a 48-slot Bermuda tournament at 150 PKR entry fee with 15% host commission.
   - Verifies 7,200 PKR gross revenue, 720 PKR platform fee (10%), 1,080 PKR host earnings (15%), and 5,400 PKR player prize pool (75%).
   - Asserts absolute conservation invariant (`totalDistributed === totalCollected`).
3. **Scenario 3: Fair Play Violation Dispute & Support Ticket Submission**:
   - Player files an anti-cheat review request with opponent UID and match credentials.
   - Validates RFC-compliant `mailto:` URL formatting with full parameter encoding.
4. **Scenario 4: Network Resilience & Offline Webhook Fallbacks**:
   - Validates transparent fallback to mailto when `VITE_CONTACT_FORM_ENDPOINT` is unconfigured.
   - Validates structured JSON payload schema when endpoint is configured.
5. **Scenario 5: Complete End-to-End User Navigation & Showcase Flow**:
   - Full 12-section walkthrough: Hero metrics (`< 15s`, `1:1`, `100%`) -> Statement promises -> App Showcase mockup -> Tournament prize pools -> Combat Calculator -> Two-Vault Security -> Rank Tiers -> Host Simulator -> How It Works -> Platform Comparison -> Scout Royalties -> Download APK Hub -> Standalone Support & Legal Pages -> WhatsApp FAB.

---

## 3. Requirement Invariants Architecture

**Primary Test File**: `tests/supabase-tokens-and-invariants.test.ts`

```
┌────────────────────────────────────────────────────────────────────────┐
│                   REQUIREMENT INVARIANTS HARNESS                       │
├────────────────────────────────────────────────────────────────────────┤
│ R1: Reference File Immutability                                        │
│   • HTML File: Size = 1,396,412 bytes, SHA-256 = cfbab0c0...           │
│   • Files Dir: Count = 66 files, Total Size = 3,376,281 bytes          │
├────────────────────────────────────────────────────────────────────────┤
│ R2: Supabase Design Tokens Adherence                                   │
│   • Accent Green: #3ECF8E, hover #34B27B, dark #249361                 │
│   • Dark Carbon Surfaces: #121212 canvas, #171717 card, #0E0F0E deep  │
│   • Hairlines: rgba(255, 255, 255, 0.08), 0.14, rgba(62, 207, 142, 0.35) │
│   • Root HTML: class="dark", data-theme="dark", color-scheme: dark     │
│   • Fonts: Manrope (headings), Inter (body), Source Code Pro (mono)    │
│   • UI Primitives: Button, Card, Badge, Stat adhere to Supabase tokens │
├────────────────────────────────────────────────────────────────────────┤
│ R3: Complete Content Preservation (views_catalog.md)                   │
│   • 100% of copy, headings, numbers, and links preserved verbatim      │
│   • 12 Showcase Sections + 7 Standalone Routed Pages + Global Chrome   │
├────────────────────────────────────────────────────────────────────────┤
│ R4: Build & Configuration Integrity                                    │
│   • package.json, tsconfig.app.json strict mode, vite.config.ts        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Test Suite Inventory & File Index

| Test File | Category / Scope | Test Count | Assertion Focus |
|---|---|---|---|
| `tests/supabase-tokens-and-invariants.test.ts` | Requirement Invariants (R1, R2, R3, R4) | 27 tests | Reference immutability hashes, Supabase token compliance, verbatim copy preservation across all views, build configs |
| `tests/tier1-feature-coverage.test.ts` | Tier 1: Feature Coverage | 29 tests | 20 features (F1–F20), UI primitives, Supabase token architecture, 8 public routes |
| `tests/tier2-boundary-corner-cases.test.ts` | Tier 2: Boundary & Corner Cases | 25 tests | Empty states, missing props, 320px–4K viewports, prime matrices, rank gap math ceilings |
| `tests/tier3-cross-feature.test.ts` | Tier 3: Cross-Feature Interactions | 12 tests | Theme tokens + calculators + tab state, navigation topology, economic parity & rake |
| `tests/tier4-real-world-scenarios.test.ts` | Tier 4: Real-World Scenarios | 6 tests | Full 12-section user journey, guild host economics, support tickets, offline fallbacks |
| `tests/tier5-adversarial-hardening.test.ts` | Tier 5: Adversarial Hardening | 11 tests | Layout copy zero-tolerance, prime revenue stress, DOM anchors, Stat interface |
| `tests/functional-invariants.test.ts` | Functional Invariants & Calculations | 17 tests | App routes, combat points formula, rank gap math, revenue engine, mailto generator |
| `tests/layout-copy-verification.test.ts` | Layout Copy Scanner (Requirement R1) | 4 tests | Component AST audit, subtext prop elimination, design system contracts |
| `tests/mobile-drawer-overflow-bug.test.ts` | Mobile Drawer Overflow Bug Suite | 4 tests | Drawer open/close state machine, body overflow lock and cleanup |
| `tests/challenger-m1-adversarial.test.ts` | Challenger Suite: M1 Primitives & Chrome | 13 tests | Scroll progress zero division, missing DOM resilience, mobile drawer overflow |
| `tests/challenger-m2-adversarial.test.ts` | Challenger Suite: M2 Hero & Statements | 9 tests | Parallax bounds, character switcher states, telemetry ribbon invariants |
| `tests/challenger-m2-2-adversarial.test.ts` | Challenger Suite: M2-2 Deep Integrity | 14 tests | Contrast ratios, touch targets, accessibility attributes, anchor integrity |
| `tests/challenger-m3-1.test.ts` | Challenger Suite: M3-1 Tournaments & Vision | 18 tests | Tournament mode tabs, AI vision scanline, scoring formula boundaries |
| `tests/challenger-m3-2.test.ts` | Challenger Suite: M3-2 Economics & Ranks | 18 tests | Two-vault escrow math, rank gap simulator, host commission breakdown |

---

## 5. Test Execution Commands & Gating

### Comprehensive Pipeline Execution (`npm test`)
Executes the unified verification pipeline:
```powershell
npm test
```
**Pipeline Steps**:
1. TypeScript Typecheck: `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`)
2. ESLint Code Analysis: `npm run lint` (`eslint .`)
3. Vite Production Build: `npm run build` (`vite build`)
4. Automated Test Runner: `node --test [14 test suites]`

### Direct Unit / Integration Test Execution
```powershell
npm run test:unit
```
Executes all core tiered test files and invariants directly using Node's native test runner.

### Single Suite Execution
```powershell
node --test tests/supabase-tokens-and-invariants.test.ts
node --test tests/tier1-feature-coverage.test.ts
node --test tests/tier2-boundary-corner-cases.test.ts
node --test tests/tier3-cross-feature.test.ts
node --test tests/tier4-real-world-scenarios.test.ts
```

---

## 6. Gating & Continuous Verification Rules

1. **Zero Failing Tests Tolerated**: 100% of tests must pass for any commit or milestone handoff.
2. **Reference File Immutability**: Any alteration to `Supabase _ The Postgres Development Platform.html` or `Supabase _ The Postgres Development Platform_files/` immediately triggers an R1 failure in `tests/supabase-tokens-and-invariants.test.ts`.
3. **Design Token Integrity**: All surfaces, buttons, borders, and typography must adhere strictly to the extracted Supabase tokens.
4. **Verbatim Content Invariant**: All website copy cataloged in `views_catalog.md` must be preserved verbatim.
