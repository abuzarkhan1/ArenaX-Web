# Milestone 2 Exploration Report: Hero & Editorial Statements Redesign

**Target Components**: `src/components/Hero.tsx` & `src/components/Statement.tsx`  
**Author**: `explorer_m2_1`  
**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_1\`  
**Project Root**: `c:\Users\Muhammad Minhas\ArenaX-Web`  

---

## 1. Observation

Direct inspection of `src/components/Hero.tsx`, `src/components/Statement.tsx`, `src/components/primitives/Stat.tsx`, and the automated test suite (`tests/tier1-feature-coverage.test.ts`, `tests/tier3-cross-feature.test.ts`, `tests/layout-copy-verification.test.ts`) revealed the following concrete observations:

### 1.1 Hero Component (`src/components/Hero.tsx`)

1. **Status Badge Version Suffix**:
   - **Location**: `src/components/Hero.tsx:116-124`
   - **Current Code**:
     ```tsx
     <Badge
       tone="emerald"
       dot
       pulse
       className="px-3.5 py-1.5 text-[11px] tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
     >
       OFFICIAL CLIENT <span className="ml-0.5 text-emerald-300/90">• v2.6.0</span>
     </Badge>
     ```
   - **Finding**: Appending `• v2.6.0` to a live status badge mixes release versioning with system availability indicators. In Linear's design system, status badges communicate operational state (`OFFICIAL CLIENT`), not changelog release tags.

2. **Promo Pill `25 AX Free Welcome Bonus For Referred Accounts`**:
   - **Finding**: Audited entire file. Verified that no promotional welcome bonus pill exists in current `Hero.tsx`. (Marketing copy mentioning 25 AX bonus was isolated to `ScoutRewards.tsx` and `Download.tsx`). It must remain strictly excluded from `Hero.tsx` under R1.

3. **Secondary Corner Badges (`2026` & `SEASON 4`)**:
   - **Location**: `src/components/Hero.tsx:187-199`
   - **Current Code**:
     ```tsx
     {/* Corner Year Badge */}
     <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-end animate-cine-badge-right">
       <Badge tone="emerald" className="px-2.5 py-1 tracking-[0.1em]">
         2026
       </Badge>
     </div>

     {/* Left Season Badge */}
     <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-start animate-cine-badge-left">
       <Badge tone="neutral" className="px-2.5 py-1 tracking-[0.1em]">
         SEASON 4
       </Badge>
     </div>
     ```
   - **Finding**: Floating badges pinned at `top-1/2 -translate-y-1/2` visually clutter the parallax headline and overlap the 3D character cutout. Grep search confirms zero tests assert the presence of these badges in `Hero.tsx`. Eliminating them allows the condensed `ARENAX` typography and character cutout to command full depth.

4. **Explanatory Subhead Paragraph**:
   - **Location**: `src/components/Hero.tsx:245-247`
   - **Current Code**:
     ```tsx
     <p className="text-base sm:text-lg text-text-2 max-w-2xl mx-auto leading-relaxed mb-8 px-2">
       Daily Bermuda BR and 4v4 Clash Squad scrims. AI vision verification and 24-hour JazzCash and EasyPaisa withdrawals.
     </p>
     ```
   - **Finding**: This conversational prose paragraph summarizes features that are already self-evident from the top navigation chips (`Bermuda BR`, `Clash Squad 4v4`, `AI Vision OCR`, `Two-Wallet Escrow`), the headline (`Pakistan's Premier Free Fire Platform`), and the telemetry ribbon. It violates R1 requirement to remove explanatory copy where layout and controls are self-evident.

5. **Version Tag in CTA Button**:
   - **Location**: `src/components/Hero.tsx:258`
   - **Current Code**:
     ```tsx
     <Button
       variant="primary"
       size="lg"
       onClick={handleDownload}
       icon={<DownloadCloud className="w-4 h-4" strokeWidth={1.5} />}
       className="w-full sm:w-auto shadow-[0_12px_28px_rgba(0,200,120,0.22)]"
     >
       Download Direct APK (v2.6)
     </Button>
     ```
   - **Finding**: Embeds version helper text `(v2.6)` and redundant modifier `Direct APK`. In Milestone 1, the mobile navbar button was streamlined to `Download App`. Primary action buttons in Linear / Apple design use clean action verbs without embedded version numbers.

6. **Subtext Under Telemetry Metrics**:
   - **Location**: `src/components/Hero.tsx:273-309`
   - **Current Code**:
     ```tsx
     <div className="pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-0 sm:divide-x sm:divide-line text-left">
       <div className="flex items-start gap-3 sm:pr-6">
         <IconOrb icon={Zap} tone="emerald" size="sm" className="mt-0.5" />
         <div>
           <span className="text-[11px] text-text-3 font-mono uppercase font-bold tracking-wider block mb-0.5">
             AI Vision Engine
           </span>
           <span className="text-sm font-bold text-text-1 block tracking-tight">
             Scoreboards verified in seconds
           </span>
         </div>
       </div>
       {/* Two-Wallet Security & Solvency Guarantee blocks with sentences */}
     </div>
     ```
   - **Finding**: Currently, `Hero.tsx` does NOT use the official `<Stat />` primitive component (`src/components/primitives/Stat.tsx`). Instead, it uses custom text blocks with explanatory sentence claims (`Scoreboards verified in seconds`, `1 AX = 1 PKR cash parity`, `100% automated refund`). Furthermore, `tests/tier1-feature-coverage.test.ts:123` specifically checks:
     `assert.ok(src.includes('Stat') || src.includes('stat'), 'Hero must feature telemetry metrics');`
     Replacing these prose blurbs with `<Stat value="..." label="..." />` aligns with design system primitives and Linear telemetry standards.

7. **Character Switcher & Parallax Invariants**:
   - **Location**: `src/components/Hero.tsx:6-29, 32-37, 147-165, 206-234`
   - **Finding**: The character switcher (`CHARACTERS` object containing `Red Criminal` and `Streetwear Rebel`, `activeCharacter` state, `selectedChar.halo` aura with `#EF4444` red and `#00C878` emerald) and multi-plane scroll parallax with mouse tilt are fully intact and functional. These must remain strictly preserved.

---

### 1.2 Statement Component (`src/components/Statement.tsx`)

1. **Platform Protocol Eyebrow**:
   - **Location**: `src/components/Statement.tsx:85-87`
   - **Finding**: Previously contained `<Pill dot={true} label="PLATFORM PROTOCOL" />` in initial commit `4253628`. Verified that it has already been removed from current HEAD. `tests/layout-copy-verification.test.ts:20` scans for `<Pill\b[^>]*\/>` and flags them under strict R1. The eyebrow must remain omitted.

2. **4 Long Detail Explanation Paragraphs**:
   - **Location**: `src/components/Statement.tsx:7-28, 118-121`
   - **Current Code**:
     ```tsx
     const STATEMENTS = [
       {
         num: '01',
         line: 'Scoreboards verified in seconds.',
         detail: 'AI vision scans end-match victory screenshots automatically. Zero host bias, zero dispute delays.',
       },
       {
         num: '02',
         line: 'Cash out in 24 hours.',
         detail: 'Direct transfers to JazzCash, EasyPaisa, and Pakistani bank accounts with 1 AX = 1 PKR cash parity.',
       },
       {
         num: '03',
         line: 'Money kept in two separate wallets.',
         detail: 'Deposits and tournament prize money remain completely segregated. 100% automated match refund guarantee.',
       },
       {
         num: '04',
         line: 'Cheaters banned for life.',
         detail: 'Strict in-game UID roster validation before credentials unlock. Zero tolerance for emulators or hacks.',
       },
     ];
     ```
     And in JSX:
     ```tsx
     <p className="statement-detail text-sm sm:text-base text-text-2 max-w-sm md:text-right leading-relaxed font-normal flex-shrink-0 pl-8 md:pl-0">
       {item.detail}
     </p>
     ```
   - **Finding**: `PROJECT.md:17` defines Feature 6: *"Platform Protocol Statements | 4 high-contrast statements with GSAP scrubbed word-by-word reveal; elimination of verbose detail paragraphs | M2"*. The 4 paragraphs dilute the high-impact editorial typography.
   - **CRITICAL Cross-Feature Test Finding**:
     `tests/tier3-cross-feature.test.ts:154-160` asserts:
     ```ts
     it('cross-references AI vision screenshot verification between AIVisionShowcase and Statement', () => {
       const visionSrc = readSrcFile('components/AIVisionShowcase.tsx');
       const stmtSrc = readSrcFile('components/Statement.tsx');

       assert.ok(visionSrc.includes('AI') || visionSrc.includes('Scoreboard'));
       assert.ok(stmtSrc.includes('AI') || stmtSrc.includes('Vision'));
     });
     ```
     Currently, the strings `'AI'` and `'Vision'` exist **only** inside `STATEMENTS[0].detail`! If `detail` is deleted without revising `STATEMENTS[0].line`, `tier3-cross-feature.test.ts` will immediately fail!
     Updating `STATEMENTS[0].line` to `"AI vision verifies scoreboards in seconds."` guarantees that `stmtSrc.includes('AI') || stmtSrc.includes('Vision')` passes with 100% stability.

3. **GSAP ScrollTrigger scrub timeline**:
   - **Location**: `src/components/Statement.tsx:33-76`
   - **Finding**: Animates `.statement-word` elements with scrubbed opacity reveal. Removing `.statement-detail` allows simplifying the GSAP context to solely animate `.statement-word`, while preserving responsive `matchMedia` and clean `ctx.revert()`.

---

## 2. Logic Chain

1. **R1 Compliance & Elimination of Verbal Crutches**:
   - R1 explicitly requires eliminating taglines, secondary labels, and helper copy across all screens.
   - In `Hero.tsx`:
     - Version suffix `• v2.6.0` on the status badge is extraneous telemetry noise.
     - Corner badges `2026` and `SEASON 4` are decorative visual clutter.
     - Subhead paragraph `Daily Bermuda BR and 4v4 Clash Squad scrims...` is redundant narrative padding.
     - CTA button copy `Download Direct APK (v2.6)` has extraneous helper modifiers.
     - Telemetry claims `Scoreboards verified in seconds`, `1 AX = 1 PKR cash parity`, `100% automated refund` are sentence fragments rather than high-contrast data.
   - In `Statement.tsx`:
     - The 4 `detail` paragraphs are explanatory footnotes.
     - Eliminating them transforms the section into pure, monumental typography matching Linear's design system.

2. **Linear & Apple Notes Polish Synthesis**:
   - **Linear**: High-contrast, cardless telemetry ribbons built with quantitative figures (`< 15s`, `1:1`, `100%`) and concise mono uppercase labels (`AI OCR VERIFICATION`, `CASH PARITY (PKR)`, `AUTOMATED REFUND`).
   - **Apple Notes / Editorial**: Confident editorial declarations where typography alone communicates value. Removing side-column paragraphs lets the scrubbed statements expand to `text-3xl sm:text-5xl md:text-6xl font-extrabold`.

3. **Behavioral & Contract Invariance (R3)**:
   - Preserves character switcher state: `activeCharacter` (`'tactical' | 'rebel'`), `CHARACTERS` object with `'Red Criminal'` and `'Streetwear Rebel'`, and respective red/emerald backlight halos.
   - Preserves title parallax: `scrollY * 0.16` Z-space translation, mouse offset tracking.
   - Preserves conversion triggers: `handleDownload` calling `trackDownload("ArenaX.apk", "Android", "2.6.0")` and `scrollToSection('tournaments')`.
   - Preserves GSAP timeline: `gsap.context`, `ScrollTrigger.create`, `stagger: 0.08`, `scrub: 0.6`, `.statement-word` opacity interpolation.
   - Preserves test contracts: `Stat` primitive in `Hero.tsx`, and `AI vision` in `Statement.tsx:STATEMENTS[0].line`.

---

## 3. Caveats

1. **Read-Only Investigation Boundary**: This report is produced by `explorer_m2_1` in read-only mode. No production source files have been altered. All proposed modifications must be executed by the Milestone 2 implementer agent (`implementer_m2_1`).
2. **Milestone 2 Peer Scopes**:
   - `AppExperienceShowcase.tsx` and `TournamentModes.tsx` belong to Milestone 2 but are assigned to peer explorers/implementers (`explorer_m2_2` and `explorer_m2_3`).
3. **Cross-Feature String Invariant**:
   - Implementer must ensure `STATEMENTS[0].line` in `Statement.tsx` explicitly includes `"AI vision"` (e.g., `"AI vision verifies scoreboards in seconds."`) to prevent breaking `tests/tier3-cross-feature.test.ts`.

---

## 4. Conclusion & Concrete Action Plan

### 4.1 Exact Specifications for `src/components/Hero.tsx`

#### A. Top Meta Bar
- Remove `• v2.6.0` from status badge.
- Resulting badge:
  ```tsx
  <Badge
    tone="emerald"
    dot
    pulse
    className="px-3.5 py-1.5 text-[11px] tracking-[0.08em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
  >
    OFFICIAL CLIENT
  </Badge>
  ```
- Retain `HudCorners`, fluid anchor pills (`Bermuda BR`, `Clash Squad 4v4`, `AI Vision OCR`, `Two-Wallet Escrow`), and the character switcher (`Criminal` vs `Rebel`).

#### B. Parallax Title Region
- Remove the two floating corner badges (`2026` and `SEASON 4`) from lines 187-199.
- Retain the condensed `ARENAX` background heading, parallax tracking styles, and character cutout with active aura glow.

#### C. Hero Headline & CTAs
- Retain headline:
  ```tsx
  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-text-1 font-heading tracking-tight mb-8 text-balance">
    Pakistan's Premier <span className="text-accent">Free Fire</span> Platform
  </h2>
  ```
- Delete the explanatory paragraph (`<p className="text-base sm:text-lg text-text-2...">Daily Bermuda BR...</p>`).
- Update primary CTA button from `Download Direct APK (v2.6)` to `Download App` (or `Download Android APK`), retaining `handleDownload` and `DownloadCloud` icon.
- Update secondary CTA button from `Explore Tournament Modes` to `Explore Tournaments`, retaining `scrollToSection('tournaments')`.

#### D. Telemetry Ribbon Redesign with `<Stat />` Primitive
- Import `Stat` from `./primitives`.
- Replace the custom unquantified `IconOrb` / text blocks with:
  ```tsx
  {/* Open HUD Telemetry Ribbon (High-Contrast Quantitative Data) */}
  <div className="pt-8 sm:pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-line text-left">
    <div className="sm:pr-8">
      <Stat value="< 15s" label="AI OCR Verification" accent />
    </div>
    <div className="sm:px-8">
      <Stat value="1:1" label="Cash Parity (PKR)" />
    </div>
    <div className="sm:pl-8">
      <Stat value="100%" label="Automated Refund" />
    </div>
  </div>
  ```

---

### 4.2 Exact Specifications for `src/components/Statement.tsx`

#### A. Data Model Cleanup
- Update `STATEMENTS` data structure to eliminate verbose `detail` strings while embedding `"AI vision"` into statement 01:
  ```tsx
  const STATEMENTS = [
    {
      num: '01',
      line: 'AI vision verifies scoreboards in seconds.',
    },
    {
      num: '02',
      line: 'Cash out in 24 hours.',
    },
    {
      num: '03',
      line: 'Money kept in two separate wallets.',
    },
    {
      num: '04',
      line: 'Cheaters banned for life.',
    },
  ];
  ```

#### B. GSAP Animation Streamlining
- Streamline `useLayoutEffect` to scrub words without needing `detail` query or tween:
  ```tsx
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = statementRef.current?.querySelectorAll('[data-statement-row]');
        rows?.forEach((row) => {
          const words = row.querySelectorAll('.statement-word');

          gsap.to(words, {
            opacity: 1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.6,
            },
          });
        });
      });
    }, statementRef);

    return () => ctx.revert();
  }, []);
  ```

#### C. JSX Layout Redesign
- Remove `<p className="statement-detail">` completely.
- Make the statement typography full-width, monumental, and impactful:
  ```tsx
  <div className="space-y-0 divide-y divide-line">
    {STATEMENTS.map((item, index) => (
      <div
        key={item.num}
        data-statement-row={index}
        className="group relative py-10 sm:py-16 transition-colors duration-300 hover:bg-emerald-500/[0.025] flex items-baseline gap-6 sm:gap-10"
      >
        {/* Emerald hairline accent on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Mono Index Number */}
        <span className="font-mono text-base sm:text-xl font-bold text-accent tracking-[0.1em] tabular-nums flex-shrink-0 transition-colors duration-300 group-hover:text-emerald-300">
          /{item.num}
        </span>

        {/* High-Contrast Scrubbed Statement Words */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-text-1 font-heading tracking-tight leading-[1.08] max-w-5xl">
          {item.line.split(' ').map((word, wIdx) => (
            <span
              key={wIdx}
              className="statement-word inline-block mr-2.5 sm:mr-3.5 opacity-25 transition-opacity"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    ))}
  </div>
  ```

---

## 5. Verification Method

To verify these redesigns independently once implemented:

### 5.1 Automated Command Verification
1. **Full Test Suite**:
   ```powershell
   npm test
   ```
   *Expected*: Zero errors across all test suites, including TypeScript check, ESLint check, Vite build, and automated test tiers.
2. **Typecheck Only**:
   ```powershell
   npm run typecheck
   ```
   *Expected*: Zero TypeScript diagnostic errors.
3. **Lint Suite**:
   ```powershell
   npm run lint
   ```
   *Expected*: Zero ESLint warnings or errors.
4. **Vite Production Build**:
   ```powershell
   npm run build
   ```
   *Expected*: Production bundle emits successfully with code 0.

### 5.2 Specific Invariant & Regression Checks
- **Hero Invariants**:
  - `Hero.tsx` must contain `Red Criminal`, `Streetwear Rebel`, `activeCharacter`.
  - `Hero.tsx` must contain `handleDownload` and `tournaments`.
  - `Hero.tsx` must contain `Stat` (satisfies `tests/tier1-feature-coverage.test.ts:123`).
  - `Hero.tsx` must NOT contain `v2.6.0`, `(v2.6)`, or the subhead sentence `Daily Bermuda BR...`.
  - `Hero.tsx` must NOT contain floating corner badges `2026` or `SEASON 4`.
- **Statement Invariants**:
  - `Statement.tsx` must contain `STATEMENTS`, `gsap` (or `ScrollTrigger`), `'01'`, `'02'`, `'03'`, `'04'`.
  - `Statement.tsx` must contain `'AI'` or `'Vision'` (satisfies `tests/tier3-cross-feature.test.ts:159`).
  - `Statement.tsx` must NOT contain `<Pill` or `<p className="statement-detail">` paragraphs.
- **Strict R1 Audit**:
  ```powershell
  $env:STRICT_R1="true"; npm test
  ```
  *Expected*: Passes without violations for `Hero.tsx` and `Statement.tsx`.
