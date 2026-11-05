# Handoff Report — Milestone 2: Android Client 3D Phone Showcase (`AppExperienceShowcase.tsx`)

**Agent**: explorer_m2_2  
**Date**: 2026-11-05T14:42:00Z  
**Scope**: `src/components/AppExperienceShowcase.tsx`  
**Task Type**: Read-only Exploration Report (Hard Handoff)  
**Parent Conversation ID**: `946cbb3b-435a-471b-a15d-9c388cab6b10`  

---

## 1. Observation

### 1.1 Eyebrow Pill and Section Subtitle Paragraph
- **File**: `src/components/AppExperienceShowcase.tsx` (lines 99–109 in working tree, lines 101–108 in `git show bd37ac4:src/components/AppExperienceShowcase.tsx`)
- **Baseline Git Content**:
  ```tsx
  {/* Section Pill & Heading */}
  <div className="mb-12 sm:mb-16">
    <Pill dot={true} label="INSIDE THE ANDROID CLIENT" />
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading mt-4">
      Engineered For <span className="text-accent">Esports</span>
    </h2>
    <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
      Experience the actual tournament workflow built into our native Android application.
    </p>
  </div>
  ```
- **Current Working Copy**:
  Line 101–108: `<Pill dot={true} label="INSIDE THE ANDROID CLIENT" />` has been removed from JSX, and the unneeded `import { Pill } from './primitives/Pill';` at line 5 has been eliminated.
  However, the conversational marketing subtitle paragraph remains verbatim:
  ```tsx
  <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
    Experience the actual tournament workflow built into our native Android application.
  </p>
  ```
- **Test Scanner Observation (`tests/layout-copy-verification.test.ts` lines 19–20)**:
  ```ts
  // 1. Check for <Pill ... /> eyebrows used on section headers
  const pillMatches = content.match(/<Pill\b[^>]*\/>/g) || [];
  ```
  In strict verification mode (`STRICT_R1=true`), any `<Pill ... />` match in `AppExperienceShowcase.tsx` counts as an R1 violation.

---

### 1.2 Chapter Taglines, Titles, and Descriptive Paragraphs
- **File**: `src/components/AppExperienceShowcase.tsx` (lines 17–36)
- **Baseline Git Content**:
  ```tsx
  const CHAPTERS = [
    {
      id: 'match',
      num: '01',
      title: 'Match Lobby & Credentials',
      tagline: 'Instant room locking with verified Free Fire UID matching.',
      desc: 'Room ID and Password unlock strictly 10–15 minutes before the match countdown. Only verified registered roster slots can enter.',
    },
    {
      id: 'ocr',
      num: '02',
      title: 'AI Vision Scoreboard OCR',
      tagline: 'End-match screenshots parsed and verified within seconds.',
      desc: 'Computer vision reads player in-game names, damage, kill tallies, and Booyah placement directly from victory screenshots with zero human host bias.',
    },
    {
      id: 'wallet',
      num: '03',
      title: 'Two-Vault Financial Rails',
      tagline: '1 AX Coin = 1 PKR Cash parity with 24-hour payouts.',
      desc: 'Entry balances are kept in the Play Wallet, while prize winnings credit automatically to the Winning Wallet, withdrawable to JazzCash or EasyPaisa.',
    },
  ];
  ```
- **Test Scanner Observation (`tests/layout-copy-verification.test.ts` line 26)**:
  ```ts
  // 3. Check for explicit tagline declarations: tagline:\s*['"`]
  const taglineMatches = content.match(/\btagline\s*:\s*['"`][^'"`]+['"`]/gi) || [];
  ```
  The 3 `tagline:` properties directly trigger 3 R1 violations in strict mode.
- **Narrative Render in Left Column (`AppExperienceShowcase.tsx` lines 147–152)**:
  ```tsx
  <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-1 mb-2">
    {chapter.title}
  </h3>
  <p className="text-sm text-text-2 leading-relaxed">{chapter.desc}</p>
  ```
- **Current Chapter Titles**:
  - `01`: `Match Lobby & Credentials`
  - `02`: `AI Vision Scoreboard OCR`
  - `03`: `Two-Vault Financial Rails`
- **Current Chapter Descriptions**:
  All three `desc` properties contain verbose multi-sentence paragraphs explaining tournament concepts rather than presenting concise, technical capability specifications.

---

### 1.3 Internal Coded Phone UI Copy & Helper Badges
Direct inspection of lines 197–383 of `AppExperienceShowcase.tsx`:

#### 1.3.1 Phone Status & Profile Header (lines 209–228)
```tsx
{/* In-App Content Header */}
<div className="px-4 py-2 border-b border-line flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-accent-dim border border-line-accent flex items-center justify-center text-xs font-black text-accent">
      AX
    </div>
    <div>
      <span className="text-xs font-bold text-text-1 block">AX_Sniper</span>
      <span className="text-[10px] text-accent font-mono flex items-center gap-1">
        <img src="/ranks/grandmaster.webp?v=s4" alt="Grandmaster" className="w-3.5 h-3.5 object-contain inline" />
        Grandmaster Contender
      </span>
    </div>
  </div>
  <div className="text-right">
    <span className="text-[10px] text-text-2 font-mono block">BALANCE</span>
    <span className="text-xs font-extrabold text-text-1 font-mono tracking-tight tabular-nums">1,450 AX</span>
  </div>
</div>
```
- **Observation**:
  1. `Grandmaster Contender`: Contains the secondary label `"Contender"` tacked onto the tier rank.
  2. `BALANCE`: Screaming uppercase secondary helper label above `1,450 AX`.

#### 1.3.2 Tab 1: Match Credentials (lines 241–290)
```tsx
{/* Locked vs Unlocked Credentials */}
<div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 space-y-2 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
  <div className="flex flex-wrap justify-between items-center gap-2">
    <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
      <KeyRound className="w-3.5 h-3.5" strokeWidth={1.5} />
      Room Credentials
    </span>
    <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
      Unlocked
    </Badge>
  </div>
  <div className="p-2.5 rounded-control bg-bg-1 border border-white/[0.08] font-mono text-xs tracking-tight tabular-nums text-text-1 flex justify-between items-center">
    <span>ID: 884921 | Pass: arena77</span>
    <button
      onClick={copyRoomDetails}
      className="text-emerald-400 hover:text-emerald-300 cursor-pointer p-3.5 -m-3.5 transition-all duration-100 active:scale-90"
      title="Copy credentials"
      aria-label="Copy room credentials"
    >
      {copiedRoomId ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
    </button>
  </div>
</div>

<div className="p-3 rounded-card bg-bg-2/60 border border-white/[0.07] text-xs text-text-2 flex items-center gap-2.5">
  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/[0.15] bg-emerald-500/[0.06]">
    <Shield className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
  </span>
  <span>Room slots locked to verified player UIDs only.</span>
</div>
```
- **Observation**:
  3. `Room slots locked to verified player UIDs only.`: Verbose defensive explanatory footnote banner placed at the bottom because the card itself did not display the player's locked slot or UID.
  4. Room ID copy mechanism: Fully implemented with `copyRoomDetails`, `copiedRoomId` boolean state, 2500ms timeout, and `aria-label="Copy room credentials"`.

#### 1.3.3 Tab 2: AI Scoreboard (lines 292–336)
```tsx
<div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08] text-center">
  <div className="flex justify-center mb-2">
    <IconOrb icon={Eye} tone="emerald" size="sm" />
  </div>
  <span className="text-xs font-mono font-bold text-text-1 uppercase block">
    AI Scoreboard Verification
  </span>
  <p className="text-xs text-text-2 mt-1">Multi-player end-match score extraction</p>
</div>
...
<div className="flex justify-center">
  <Badge tone="emerald" dot pulse className="px-3 py-1 text-[10px]">
    Result Verified within Seconds
  </Badge>
</div>
```
- **Observation**:
  5. `Multi-player end-match score extraction`: Conversational secondary helper paragraph beneath the orb title.
  6. `Result Verified within Seconds`: Marketing slogan disguised as a status badge.

#### 1.3.4 Tab 3: Dual-Vault Escrow (lines 339–368)
```tsx
{/* Play Wallet Card */}
<div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08]">
  <div className="flex justify-between text-xs mb-1">
    <span className="text-text-2 font-mono uppercase font-bold">Play Wallet</span>
    <span className="text-text-2 font-mono">Non-Withdrawable</span>
  </div>
  <span className="text-lg font-mono font-extrabold text-text-1 block tracking-tight tabular-nums">500 AX</span>
  <p className="text-[11px] text-text-2 mt-1">Used for match entry fees & bonuses</p>
</div>

{/* Winning Wallet Card */}
<div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
  <div className="flex justify-between text-xs mb-1">
    <span className="text-emerald-400 font-mono uppercase font-bold">Winning Wallet</span>
    <span className="text-emerald-400 font-mono tabular-nums">100% Cash</span>
  </div>
  <span className="text-lg font-mono font-extrabold text-emerald-400 block tracking-tight tabular-nums">
    950 AX (PKR 950)
  </span>
  <p className="text-[11px] text-text-2 mt-1">Available for 24h JazzCash/EasyPaisa cashout</p>
</div>

<div className="p-2.5 rounded-control bg-bg-2/60 border border-white/[0.07] text-center text-xs text-text-2 font-mono tracking-tight tabular-nums">
  Protected by 6-digit Fund Password
</div>
```
- **Observation**:
  7. `Non-Withdrawable`: Secondary explanatory label.
  8. `Used for match entry fees & bonuses`: Explanatory helper paragraph.
  9. `100% Cash`: Promotional secondary label.
  10. `Available for 24h JazzCash/EasyPaisa cashout`: Conversational sentence.
  11. `Protected by 6-digit Fund Password`: Footnote banner.

---

### 1.4 Test Suite & Architectural Contracts
1. **`tests/tier1-feature-coverage.test.ts` (lines 139–147)**:
   ```ts
   describe('F7: Android Client 3D Phone Showcase (AppExperienceShowcase.tsx)', () => {
     const src = readComponentSource('AppExperienceShowcase.tsx');

     it('includes 3 chapters: Match Lobby, OCR Vision Scanner, Segregated Wallet', () => {
       assert.ok(src.includes('CHAPTERS'), 'Showcase must define CHAPTERS');
       assert.ok(src.includes('match') && src.includes('ocr') && src.includes('wallet'));
       assert.ok(src.includes('activeTab'), 'Showcase must manage activeTab state');
     });
   });
   ```
   **Invariant requirement**: The identifier `CHAPTERS`, chapter IDs `'match'`, `'ocr'`, `'wallet'`, and state `'activeTab'` MUST be strictly preserved.
2. **`tests/tier3-cross-feature.test.ts` (lines 130–137)**:
   ```ts
   it('consistently isolates Play Wallet and Winning Wallet across AppExperienceShowcase and WalletSection', () => {
     const appShowcaseSrc = readSrcFile('components/AppExperienceShowcase.tsx');
     const walletSrc = readSrcFile('components/WalletSection.tsx');

     assert.ok(appShowcaseSrc.includes('Play Wallet') && appShowcaseSrc.includes('Winning Wallet'));
     assert.ok(walletSrc.includes('Play Wallet') && walletSrc.includes('Winning Wallet'));
   });
   ```
   **Invariant requirement**: Exact strings `'Play Wallet'` and `'Winning Wallet'` MUST remain in `AppExperienceShowcase.tsx`.
3. **GSAP ScrollTrigger & Motion Engine (`AppExperienceShowcase.tsx` lines 44–79)**:
   - `containerRef` pinned with `pin: true`, `start: 'top top'`, `end: '+=160%'`, `scrub: 0.5`.
   - Desktop gate: `mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', ...)`.
   - Scroll progress maps dynamically to 3D phone transform:
     `rotY = -18 + p * 32`, `rotX = 6 - p * 10`, `transZ = Math.sin(p * Math.PI) * 35`.
   - Proper lifecycle cleanup: `pinTrigger.kill()`, `ctx.revert()`.

---

## 2. Logic Chain

```
Observation 1.1 (Pill and Subtitle)
  ↳ layout-copy-verification.test.ts flags <Pill ... /> as R1 violation.
  ↳ Subtitle paragraph is conversational marketing copy explaining what the component is.
  ↳ Eliminating the subtitle aligns the section with Linear/Apple Notes layout where bold headings and interactive 3D media are self-evident.

Observation 1.2 (Chapter Taglines & Descriptions)
  ↳ layout-copy-verification.test.ts flags tagline: declarations as R1 violations.
  ↳ Dispatch specifies 3 clean narrative chapters: "Match Credentials", "AI Scoreboard", "Dual-Vault Escrow".
  ↳ Replacing verbose conversational paragraphs with concise architectural specifications enhances scannability without breaking tier1-feature-coverage (which checks CHAPTERS, match, ocr, wallet, activeTab).

Observation 1.3 (Phone Internal Coded UI)
  ↳ 9 instances of defensive helper copy and marketing badges were identified.
  ↳ R1 Mandate: "Where any screen relies on helper text or secondary labels to make sense, redesign and fix the layout so that purpose, navigation, and controls are intuitive and self-evident without explanatory copy."
  ↳ Replacing explanatory copy with authentic functional UI primitives (e.g., displaying actual locked slot and UID instead of a sentence stating slots are locked; showing latency telemetry instead of "Result Verified within Seconds"; using clean vault badges instead of explanatory sentences) achieves complete R1 compliance and Linear-tier polish.

Observation 1.4 (Test Invariants & GSAP Mechanics)
  ↳ CHAPTERS, activeTab, match, ocr, wallet, Play Wallet, and Winning Wallet must remain intact in source code.
  ↳ GSAP ScrollTrigger desktop pinning, scrubbed 3D rotation, and clipboard copy must be 100% preserved.
  ↳ Adding activeTab-driven 3D rotation on manual tab clicks further elevates the interactive experience.
```

---

## 3. Caveats

1. **Test String Invariants**:
   - `tests/tier1-feature-coverage.test.ts` asserts `CHAPTERS`, `'match'`, `'ocr'`, `'wallet'`, and `'activeTab'`.
   - `tests/tier3-cross-feature.test.ts` asserts `'Play Wallet'` and `'Winning Wallet'`.
   - Any refactoring MUST keep these exact identifiers and string literals in the code.
2. **Clipboard API in Non-Secure Contexts**:
   - `navigator.clipboard?.writeText` includes optional chaining to prevent exceptions in environments without clipboard permissions (e.g. headless browsers or unauthenticated iframe contexts).
3. **Fallback UI vs Real Screenshots**:
   - `REAL_SCREENSHOTS` constant provides image fallbacks. The coded UI is rendered when `REAL_SCREENSHOTS[activeTab]` is `null`. The redesign applies to the coded UI and maintains the fallback structure.
4. **No caveats on test suite integrity**:
   - All 4 test tiers, typecheck, lint, and production build currently pass with zero errors.

---

## 4. Conclusion & Actionable Design Blueprint

### 4.1 Summary of Changes

| Section Element | Current State | Proposed Linear / Apple Notes Redesign | Rationale |
|---|---|---|---|
| **Eyebrow** | None (or `<Pill ... />` in git) | Completely omit eyebrow pill; rely on bold heading | Eliminates R1 pill violation scanned by verification suite |
| **Section Subtitle** | `Experience the actual tournament workflow built into our native Android application.` | Remove conversational subtitle paragraph entirely | Eliminates marketing filler; makes heading punchy and self-evident |
| **Chapter 01 Title** | `Match Lobby & Credentials` | `Match Credentials` | Concise, technical, Linear-style naming |
| **Chapter 01 Desc** | Multi-sentence room unlock explanation | `Automated room credential dispatch 15 minutes before countdown. Roster-locked entry for verified player UIDs.` | High-density specification rather than explanatory prose |
| **Chapter 02 Title** | `AI Vision Scoreboard OCR` | `AI Scoreboard` | Crisp terminology |
| **Chapter 02 Desc** | Multi-sentence OCR explanation | `Computer vision extraction of player IGNs, placement rank, and kill counts directly from end-match screenshots.` | Technical specification without colloquial filler |
| **Chapter 03 Title** | `Two-Vault Financial Rails` | `Dual-Vault Escrow` | Precise institutional nomenclature matching project design system |
| **Chapter 03 Desc** | Multi-sentence wallet explanation | `Segregated Play Wallet entry escrow and automated Winning Wallet prize routing with direct local cashout.` | Crisp architectural specification |
| **Phone Header: Rank** | `Grandmaster Contender` | `Grandmaster` | Eliminates secondary "Contender" label |
| **Phone Header: Balance** | `BALANCE` + `1,450 AX` | `1,450 AX` with subtle `Verified Vault` indicator | Eliminates screaming uppercase helper label |
| **Tab 1: Slot Protection** | `<Shield /> Room slots locked to verified player UIDs only.` | `<Shield /> Slot #12 Locked • UID 94829104` | Self-evident telemetry displaying the actual locked slot and UID instead of a sentence explaining it |
| **Tab 2: Subtitle** | `Multi-player end-match score extraction` | Removed entirely | Redundant helper paragraph below title |
| **Tab 2: Badge** | `<Badge>Result Verified within Seconds</Badge>` | `Latency: 1.2s` + `<Badge tone="emerald" dot>Certified</Badge>` | Replaces marketing claim with authentic system telemetry |
| **Tab 3: Play Wallet** | `Non-Withdrawable` + `Used for match entry fees & bonuses` | `Play Wallet` + `<Badge tone="neutral">Entry Vault</Badge>` | Replaces explanatory sentence with clean structural badge |
| **Tab 3: Winning Wallet**| `100% Cash` + `Available for 24h JazzCash/EasyPaisa cashout` | `Winning Wallet` + `<Badge tone="emerald" dot>Withdrawable</Badge>` + `950 AX (PKR 950)` | Clean financial layout without marketing pitch copy |
| **Tab 3: Security** | `Protected by 6-digit Fund Password` | `Fund Security • PIN Enabled` | High-contrast security telemetry row |
| **Interactive Rotation** | Only updates during scroll | Syncs to `activeTab` on click AND during scroll | Smooth 3D tilt on both tab button clicks and scroll |

---

### 4.2 Exact Before → After Code Specifications

#### 1. CHAPTERS Definition (`src/components/AppExperienceShowcase.tsx` lines 17–36)
**Before**:
```tsx
const CHAPTERS = [
  {
    id: 'match',
    num: '01',
    title: 'Match Lobby & Credentials',
    desc: 'Room ID and Password unlock strictly 10–15 minutes before the match countdown. Only verified registered roster slots can enter.',
  },
  {
    id: 'ocr',
    num: '02',
    title: 'AI Vision Scoreboard OCR',
    desc: 'Computer vision reads player in-game names, damage, kill tallies, and Booyah placement directly from victory screenshots with zero human host bias.',
  },
  {
    id: 'wallet',
    num: '03',
    title: 'Two-Vault Financial Rails',
    desc: 'Entry balances are kept in the Play Wallet, while prize winnings credit automatically to the Winning Wallet, withdrawable to JazzCash or EasyPaisa.',
  },
];
```

**After**:
```tsx
const CHAPTERS = [
  {
    id: 'match',
    num: '01',
    title: 'Match Credentials',
    desc: 'Automated room credential dispatch 15 minutes before match countdown. Roster-locked entry for verified player UIDs.',
  },
  {
    id: 'ocr',
    num: '02',
    title: 'AI Scoreboard',
    desc: 'Computer vision extraction of player IGNs, placement rank, and kill counts directly from end-match screenshots.',
  },
  {
    id: 'wallet',
    num: '03',
    title: 'Dual-Vault Escrow',
    desc: 'Segregated Play Wallet entry escrow and automated Winning Wallet prize routing with direct local cashout.',
  },
];
```

---

#### 2. Section Heading (`src/components/AppExperienceShowcase.tsx` lines 100–109)
**Before**:
```tsx
{/* Section Heading */}
<div className="mb-12 sm:mb-16">
  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading">
    Engineered For <span className="text-accent">Esports</span>
  </h2>
  <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
    Experience the actual tournament workflow built into our native Android application.
  </p>
</div>
```

**After**:
```tsx
{/* Section Heading */}
<div className="mb-12 sm:mb-16">
  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading">
    Engineered For <span className="text-accent">Esports</span>
  </h2>
</div>
```

---

#### 3. Phone In-App Header (`src/components/AppExperienceShowcase.tsx` lines 211–228)
**Before**:
```tsx
{/* In-App Content Header */}
<div className="px-4 py-2 border-b border-line flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-accent-dim border border-line-accent flex items-center justify-center text-xs font-black text-accent">
      AX
    </div>
    <div>
      <span className="text-xs font-bold text-text-1 block">AX_Sniper</span>
      <span className="text-[10px] text-accent font-mono flex items-center gap-1">
        <img src="/ranks/grandmaster.webp?v=s4" alt="Grandmaster" className="w-3.5 h-3.5 object-contain inline" />
        Grandmaster Contender
      </span>
    </div>
  </div>
  <div className="text-right">
    <span className="text-[10px] text-text-2 font-mono block">BALANCE</span>
    <span className="text-xs font-extrabold text-text-1 font-mono tracking-tight tabular-nums">1,450 AX</span>
  </div>
</div>
```

**After**:
```tsx
{/* In-App Content Header */}
<div className="px-4 py-2 border-b border-line flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-accent-dim border border-line-accent flex items-center justify-center text-xs font-black text-accent">
      AX
    </div>
    <div>
      <span className="text-xs font-bold text-text-1 block">AX_Sniper</span>
      <span className="text-[10px] text-accent font-mono flex items-center gap-1">
        <img src="/ranks/grandmaster.webp?v=s4" alt="Grandmaster" className="w-3.5 h-3.5 object-contain inline" />
        Grandmaster
      </span>
    </div>
  </div>
  <div className="text-right">
    <span className="text-xs font-extrabold text-text-1 font-mono tracking-tight tabular-nums block">1,450 AX</span>
    <span className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase">Verified</span>
  </div>
</div>
```

---

#### 4. Tab 1: Match Credentials (`src/components/AppExperienceShowcase.tsx` lines 241–290)
**Before**:
```tsx
{/* TAB 1: Match Lobby */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'match' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08] relative overflow-hidden">
      <div className="flex justify-between items-center mb-1.5 gap-2">
        <Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">
          Live Scrim
        </Badge>
        <span className="text-xs font-mono tracking-tight tabular-nums text-text-2">Starts 21:00 PKT</span>
      </div>
      <h4 className="text-sm font-extrabold text-text-1 font-heading">
        Bermuda Championship #402
      </h4>
      <div className="flex justify-between text-xs font-mono tracking-tight tabular-nums text-text-2 mt-1">
        <span>Entry: 50 AX</span>
        <span className="text-emerald-400 font-bold">Prize: 2,160 AX</span>
      </div>
    </div>

    {/* Locked vs Unlocked Credentials */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 space-y-2 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5" strokeWidth={1.5} />
          Room Credentials
        </span>
        <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
          Unlocked
        </Badge>
      </div>
      <div className="p-2.5 rounded-control bg-bg-1 border border-white/[0.08] font-mono text-xs tracking-tight tabular-nums text-text-1 flex justify-between items-center">
        <span>ID: 884921 | Pass: arena77</span>
        <button
          onClick={copyRoomDetails}
          className="text-emerald-400 hover:text-emerald-300 cursor-pointer p-3.5 -m-3.5 transition-all duration-100 active:scale-90"
          title="Copy credentials"
          aria-label="Copy room credentials"
        >
          {copiedRoomId ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
        </button>
      </div>
    </div>

    <div className="p-3 rounded-card bg-bg-2/60 border border-white/[0.07] text-xs text-text-2 flex items-center gap-2.5">
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/[0.15] bg-emerald-500/[0.06]">
        <Shield className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
      </span>
      <span>Room slots locked to verified player UIDs only.</span>
    </div>
  </div>
)}
```

**After**:
```tsx
{/* TAB 1: Match Credentials */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'match' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08] relative overflow-hidden">
      <div className="flex justify-between items-center mb-1.5 gap-2">
        <Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">
          Live Scrim
        </Badge>
        <span className="text-xs font-mono tracking-tight tabular-nums text-text-2">21:00 PKT</span>
      </div>
      <h4 className="text-sm font-extrabold text-text-1 font-heading">
        Bermuda Championship #402
      </h4>
      <div className="flex justify-between text-xs font-mono tracking-tight tabular-nums text-text-2 mt-1">
        <span>Entry: 50 AX</span>
        <span className="text-emerald-400 font-bold">Prize: 2,160 AX</span>
      </div>
    </div>

    {/* Room Credentials Card */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 space-y-2 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5" strokeWidth={1.5} />
          Room Credentials
        </span>
        <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
          Unlocked
        </Badge>
      </div>
      <div className="p-2.5 rounded-control bg-bg-1 border border-white/[0.08] font-mono text-xs tracking-tight tabular-nums text-text-1 flex justify-between items-center">
        <span>ID: 884921 | Pass: arena77</span>
        <button
          onClick={copyRoomDetails}
          className="text-emerald-400 hover:text-emerald-300 cursor-pointer p-3.5 -m-3.5 transition-all duration-100 active:scale-90"
          title="Copy credentials"
          aria-label="Copy room credentials"
        >
          {copiedRoomId ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
        </button>
      </div>
    </div>

    {/* Self-Evident Slot Verification Status */}
    <div className="p-2.5 rounded-card bg-bg-2/60 border border-white/[0.07] flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-emerald-500/[0.2] bg-emerald-500/[0.08]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
        </span>
        <span className="text-text-1 font-semibold">Slot #12 Locked</span>
      </div>
      <span className="text-emerald-400 tabular-nums">UID 94829104</span>
    </div>
  </div>
)}
```

---

#### 5. Tab 2: AI Scoreboard (`src/components/AppExperienceShowcase.tsx` lines 292–336)
**Before**:
```tsx
{/* TAB 2: OCR Scanner */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'ocr' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08] text-center">
      <div className="flex justify-center mb-2">
        <IconOrb icon={Eye} tone="emerald" size="sm" />
      </div>
      <span className="text-xs font-mono font-bold text-text-1 uppercase block">
        AI Scoreboard Verification
      </span>
      <p className="text-xs text-text-2 mt-1">Multi-player end-match score extraction</p>
    </div>

    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 space-y-1.5 text-xs font-mono tracking-tight tabular-nums shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">PLAYER IGN</span>
        <span className="text-text-1 font-bold">AX_Sniper</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">BOOYAH RANK</span>
        <span className="text-emerald-400 font-bold">#1 Place (+20 PTS)</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">CONFIRMED KILLS</span>
        <span className="text-text-1 font-bold">14 Kills (+70 PTS)</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">MATCH SCORE</span>
        <span className="text-emerald-400 font-bold">90 PTS Total</span>
      </div>
      <div className="flex justify-between items-center pt-1">
        <span className="text-text-2">PROMOTED TIER</span>
        <span className="text-text-1 font-bold flex items-center gap-1.5">
          <img src="/ranks/heroic.webp?v=s4" alt="Heroic" className="w-4 h-4 object-contain inline" />
          Heroic Tier I
        </span>
      </div>
    </div>

    <div className="flex justify-center">
      <Badge tone="emerald" dot pulse className="px-3 py-1 text-[10px]">
        Result Verified within Seconds
      </Badge>
    </div>
  </div>
)}
```

**After**:
```tsx
{/* TAB 2: AI Scoreboard */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'ocr' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08] text-center">
      <div className="flex justify-center mb-1.5">
        <IconOrb icon={Eye} tone="emerald" size="sm" />
      </div>
      <span className="text-xs font-mono font-bold text-text-1 uppercase tracking-wide block">
        AI Scoreboard
      </span>
    </div>

    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 space-y-1.5 text-xs font-mono tracking-tight tabular-nums shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">PLAYER IGN</span>
        <span className="text-text-1 font-bold">AX_Sniper</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">BOOYAH RANK</span>
        <span className="text-emerald-400 font-bold">#1 (+20 PTS)</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">CONFIRMED KILLS</span>
        <span className="text-text-1 font-bold">14 (+70 PTS)</span>
      </div>
      <div className="flex justify-between py-1 border-b border-line">
        <span className="text-text-2">MATCH SCORE</span>
        <span className="text-emerald-400 font-bold">90 PTS Total</span>
      </div>
      <div className="flex justify-between items-center pt-1">
        <span className="text-text-2">PROMOTED TIER</span>
        <span className="text-text-1 font-bold flex items-center gap-1.5">
          <img src="/ranks/heroic.webp?v=s4" alt="Heroic" className="w-4 h-4 object-contain inline" />
          Heroic Tier I
        </span>
      </div>
    </div>

    {/* Authentic Verification Telemetry */}
    <div className="flex items-center justify-between px-2 text-[11px] font-mono text-text-2">
      <span>Latency: 1.2s</span>
      <Badge tone="emerald" dot className="px-2 py-0 text-[9px]">
        Certified
      </Badge>
    </div>
  </div>
)}
```

---

#### 6. Tab 3: Dual-Vault Escrow (`src/components/AppExperienceShowcase.tsx` lines 339–368)
**Before**:
```tsx
{/* TAB 3: Two-Vault Wallet */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'wallet' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    {/* Play Wallet Card */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08]">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-2 font-mono uppercase font-bold">Play Wallet</span>
        <span className="text-text-2 font-mono">Non-Withdrawable</span>
      </div>
      <span className="text-lg font-mono font-extrabold text-text-1 block tracking-tight tabular-nums">500 AX</span>
      <p className="text-[11px] text-text-2 mt-1">Used for match entry fees & bonuses</p>
    </div>

    {/* Winning Wallet Card */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-emerald-400 font-mono uppercase font-bold">Winning Wallet</span>
        <span className="text-emerald-400 font-mono tabular-nums">100% Cash</span>
      </div>
      <span className="text-lg font-mono font-extrabold text-emerald-400 block tracking-tight tabular-nums">
        950 AX (PKR 950)
      </span>
      <p className="text-[11px] text-text-2 mt-1">Available for 24h JazzCash/EasyPaisa cashout</p>
    </div>

    <div className="p-2.5 rounded-control bg-bg-2/60 border border-white/[0.07] text-center text-xs text-text-2 font-mono tracking-tight tabular-nums">
      Protected by 6-digit Fund Password
    </div>
  </div>
)}
```

**After**:
```tsx
{/* TAB 3: Dual-Vault Escrow */}
{!REAL_SCREENSHOTS[activeTab] && activeTab === 'wallet' && (
  <div className="space-y-3 animate-in fade-in duration-200">
    {/* Play Wallet Card (Must contain string 'Play Wallet' for invariant test) */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-white/[0.08]">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-text-2 font-mono uppercase font-bold">Play Wallet</span>
        <Badge tone="neutral" className="px-1.5 py-0 text-[9px]">Entry Vault</Badge>
      </div>
      <span className="text-lg font-mono font-extrabold text-text-1 block tracking-tight tabular-nums">
        500 AX
      </span>
    </div>

    {/* Winning Wallet Card (Must contain string 'Winning Wallet' for invariant test) */}
    <div className="p-3.5 rounded-card bg-bg-2/80 border border-emerald-500/25 shadow-[inset_0_0_24px_-16px_rgba(16,185,129,0.6)]">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-emerald-400 font-mono uppercase font-bold">Winning Wallet</span>
        <Badge tone="emerald" dot className="px-1.5 py-0 text-[9px]">Withdrawable</Badge>
      </div>
      <span className="text-lg font-mono font-extrabold text-emerald-400 block tracking-tight tabular-nums">
        950 AX <span className="text-xs text-text-2 font-normal font-sans">(PKR 950)</span>
      </span>
    </div>

    {/* Security Telemetry */}
    <div className="flex items-center justify-between p-2 rounded-control bg-bg-2/60 border border-white/[0.07] text-xs font-mono text-text-2">
      <span className="flex items-center gap-1.5">
        <Shield className="w-3.5 h-3.5 text-emerald-400" />
        Fund Security
      </span>
      <span className="text-emerald-400">PIN Enabled</span>
    </div>
  </div>
)}
```

---

#### 7. 3D Phone Motion Sync on Tab Clicks (`src/components/AppExperienceShowcase.tsx`)
In addition to the ScrollTrigger pinning, adding an effect ensuring that whenever `activeTab` changes (e.g. via direct tab clicks or chapter card clicks), the phone's CSS 3D rotation smoothly updates even when the page is stationary:
```tsx
const ROTATION_MAP = {
  match: { rotY: -18, rotX: 6, transZ: 0 },
  ocr: { rotY: -2, rotX: 1, transZ: 35 },
  wallet: { rotY: 14, rotX: -4, transZ: 0 },
};

// Inside component or click handler:
const handleTabSwitch = (tab: 'match' | 'ocr' | 'wallet') => {
  setActiveTab(tab);
  if (phoneRef.current) {
    const { rotY, rotX, transZ } = ROTATION_MAP[tab];
    phoneRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${transZ}px)`;
  }
};
```
This guarantees crisp 3D responsiveness both on scroll AND on click.

---

## 5. Verification Method

To independently verify these findings and confirm any implementation:

1. **Verify Chapter Invariants**:
   ```powershell
   node --test --test-name-pattern="Android Client 3D Phone Showcase" tests/tier1-feature-coverage.test.ts
   ```
   *Expected result*: PASS — asserts `CHAPTERS`, `match`, `ocr`, `wallet`, and `activeTab`.

2. **Verify Wallet Isolation Invariant**:
   ```powershell
   node --test --test-name-pattern="isolates Play Wallet and Winning Wallet" tests/tier3-cross-feature.test.ts
   ```
   *Expected result*: PASS — asserts exact strings `Play Wallet` and `Winning Wallet` exist in `AppExperienceShowcase.tsx`.

3. **Verify Requirement R1 Compliance**:
   ```powershell
   $env:STRICT_R1="true"
   node --test tests/layout-copy-verification.test.ts
   ```
   *Expected result*: PASS with 0 violations detected across `src/components/AppExperienceShowcase.tsx`.

4. **Full Automated Verification Pipeline**:
   ```powershell
   npm test
   ```
   *Expected result*: All 4 pipeline stages pass (Typecheck, ESLint, Vite Build, 5-Tier Test Suite).

5. **Invalidation Conditions**:
   - If renaming chapter IDs away from `'match'`, `'ocr'`, `'wallet'`, `tier1-feature-coverage.test.ts` will fail.
   - If modifying the names `'Play Wallet'` or `'Winning Wallet'`, `tier3-cross-feature.test.ts` will fail.
   - If reintroducing `<Pill ... />` or `tagline:` properties, `layout-copy-verification.test.ts` will fail under `STRICT_R1=true`.
