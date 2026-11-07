# Handoff Report: Milestone 3 (Scope 2) — Supabase Redesign Blueprint

**Agent**: `explorer_m3_2` (Teamwork Explorer)  
**Parent / Recipient**: `8b88bbad-6052-4d75-b548-47b7f26819bc` (Orchestrator)  
**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m3_2`  
**Artifact Path**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m3_2\blueprint.md`  
**Date**: 2026-11-07  

---

## 1. Observation

### 1.1 Direct File Observations
Direct inspection was conducted on four core interactive components, the design tokens specification, and all relevant test suites:

1. **`src/components/WalletSection.tsx` (222 lines)**:
   - Contains horizontal 5-stage lifecycle flow:
     `FLOW_NODES = [{ step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' }, { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' }, { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' }, { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' }, { step: '05', title: 'Cashout', sub: '< 24h Direct' }]`.
   - Header badge: `<Badge tone="emerald" dot pulse className="self-start sm:self-auto">1 AX = 1 PKR Cash Parity</Badge>`.
   - GSAP ScrollTrigger line draw: `lineRef` on `flowContainerRef` from `scaleX: 0` to `scaleX: 1`.
   - Two panels: Play Wallet (Base Card, Entry Escrow, 2x2 spec grid: `Min Deposit: PKR 50`, `Surcharge: 0% Instant`, `Cancellation: 100% Refund`, `Squad Transfer: Instant P2P`, `Deposit` CTA) and Winning Wallet (Highlighted Card, Prize Escrow, Callout `Cash Valuation: 1 AX = 1 PKR Cash`, 2x2 spec grid: `Payout SLA: &lt; 24 Hours`, `Min Threshold: 100 AX`, `Disbursement: JazzCash / EasyPaisa`, `Security: 6-Digit PIN`, `Cashout` CTA).
   - Currently uses `.glass-panel`, `.hud-card`, `.hud-card-highlight`, and `.ambient-glow`.

2. **`src/components/LeaderboardTiers.tsx` (402 lines)**:
   - Contains 8 competitive ranks in `RANK_TIERS`: Bronze (0), Silver (1000), Gold (2000), Platinum (3200), Diamond (4600), Heroic (6200), Master (8000), Grandmaster (10000, `isTop: true`).
   - Header: `Competitive <span className="text-accent">Tiers</span>` and subtitle `Eight competitive divisions with direct cash milestone rewards.`. Class `.tier-reveal` registered in GSAP ScrollTrigger.
   - Interactive carousel with `scrollTrack('left')` and `scrollTrack('right')` navigation buttons.
   - Cards support `role="button"`, `tabIndex={0}`, `aria-pressed={isSelected}`, and keyboard navigation (`Enter` / `Space`).
   - Grandmaster card features `APEX` badge.
   - Promotion Gap Simulator: `Target` icon, `+20 PTS / Booyah` tag, `Current Rating` range slider (`min="0" max="10000" step="50"`), 3 quick presets (`setCurrentPts(2500)`, `5000`, `7500`), target tier selector buttons (8 divisions), and tactical dossier with `Points Required:`, `Booyahs Required:`, `Milestone Bonus:`, and `Progress to {selectedTier.name}` bar.

3. **`src/components/OrganizerProgram.tsx` (226 lines)**:
   - Header: `Host & Earn <span className="text-accent">Commission</span>` and subtitle `Automated tournament operations with dedicated organizer commissions.`.
   - 4 platform capabilities with `IconOrb`: Capability 01 includes invariant string `"Configure Bermuda or Clash Squad formats with custom player limits, schedules, and brackets."`.
   - Host Earnings Simulator: 3 range sliders with min 48px touch containers:
     - `Lobby Size` (`min="10" max="48"`, marks: `10 CS`, `24 Duo`, `48 BR`).
     - `Entry Fee` (`min="50" max="500" step="10"`, marks: `50 PKR`, `200 PKR`, `500 PKR`).
     - `Organizer Cut` (`min="0" max="20" step="1"`, marks: `0%`, `10%`, `20%`).
   - Revenue conservation engine:
     `totalRevenue = participants * entryFee`, `adminFee = Math.round(totalRevenue * 0.10)`, `hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100))`, `playerPrizePool = totalRevenue - adminFee - hostEarnings`, `playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100)`.
   - Callouts: `TOTAL REVENUE`, `PLATFORM FEE (10%)`, `PRIZE POOL ({playerPrizePercent}%)`, `Net Organizer Payout` with `{hostEarnings.toLocaleString()} PKR / Match`, and `Apply to Host Scrims` CTA.

4. **`src/components/ScoutRewards.tsx` (138 lines)**:
   - Header: `Scout & <span className="text-accent text-glow-accent">Store</span>` and subtitle `Invite players to earn recurring royalties from their victories, or redeem coins for digital vouchers.`.
   - Card 1: Scout Community Royalties (3 stats: `25 AX Starter Gift`, `2% Cash Win Royalty`, `Tier AX Rank Bonuses`, narrative paragraph, `Get Scout Code in App` CTA).
   - Card 2: In-App Digital Rewards Store (narrative paragraph, 3 store rows: `Free Fire 100 + 10 Diamonds` — `190 AX`, `Free Fire 520 Diamonds Top-up` — `950 AX`, `Weekly Diamond Membership` — `450 AX`, `Redeem in App` CTA).
   - Contains legacy `text-glow-accent` (text-shadow blur) on the header title and stats numerals.

### 1.2 Tool Execution & Baseline Verification
- Tool Command: `npm test`
  - Output:
    - `TypeScript Typecheck`: PASSED (10.29s, zero errors)
    - `ESLint Code Analysis`: PASSED (8.59s, zero warnings)
    - `Vite Production Build`: PASSED (7.79s, clean output)
    - `Automated Test Suites (Tiers 1–5 & R1/R3)`: PASSED (2.42s across all 13 test files)
    - Overall status: `ALL CHECKS PASSED`
- Tool Command: Grep / Select-String checks confirmed:
  - `HudCorners` is only asserted in primitive tests; omitting or softening it in component code has zero adverse side-effects.
  - `text-glow-accent` is not asserted in any test suite; removing it is completely safe.
  - Prohibited strings from `layout-copy-verification.test.ts` and `challenger-m3-2.test.ts` (`Protected Escrow`, `Zero Hidden Commissions`, `10% Platform Rake`, etc.) are strictly checked across all 4 files.

---

## 2. Logic Chain

1. **Token Hierarchy Alignment**:
   - Supabase’s reference design employs dark carbon surfaces (`#121212` canvas, `#171717` card, `#181A19` highlighted card, `#1E201F` elevated controls) and precision 1px hairline borders (`rgba(255, 255, 255, 0.08)` / `border-white/[0.08]`) with subtle top highlights (`shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`).
   - Transforming `.hud-card` and `.hud-card-highlight` to direct Supabase token classes (`bg-[#171717] border border-white/[0.08]` and `bg-[#181a19] border border-[#3ECF8E]/35`) eliminates gaming visual noise while maintaining the dark luxury aesthetic.
2. **Glow Elimination**:
   - `ScoutRewards.tsx` currently applies `text-glow-accent` (`text-shadow: 0 0 16px rgba(62, 207, 142, 0.45)`). In Supabase’s design system, typography is crisp, high-contrast, and free of blur. Stripping `text-glow-accent` immediately enhances typographic sharpness without violating any test assertion.
3. **Requirement R3 Content Preservation**:
   - Tests in `tests/supabase-tokens-and-invariants.test.ts`, `tests/challenger-m3-1.test.ts`, and `tests/challenger-m3-2.test.ts` execute strict string-matching for copy, labels, formulas, and button text (e.g. `1 AX = 1 PKR Cash Parity`, `Bermuda or Clash Squad`, `Points Required:`, `Booyahs Required:`, `Deposit`, `Cashout`, `Apply to Host Scrims`, `Get Scout Code in App`, `Redeem in App`).
   - Every single tested string is cataloged in `blueprint.md` with zero alteration or omission.
4. **Mathematical Engine Invariance**:
   - In `LeaderboardTiers.tsx`, the rank gap formulas (`ptsNeeded = Math.max(0, targetMin - currentPts)`, `booyahsNeeded = Math.ceil(ptsNeeded / 20)`, `progressPercent`) are validated against boundary tests and 1,000 randomized inputs in `challenger-m3-1.test.ts`.
   - In `OrganizerProgram.tsx`, revenue conservation (`totalRevenue === adminFee + hostEarnings + playerPrizePool`) is stress-tested across all 37,674 Cartesian slider states.
   - Preserving these formulas verbatim guarantees mathematical continuity.

---

## 3. Caveats

- **Scope Boundary**: This investigation is strictly scoped to the 4 assigned Milestone 3 Scope 2 components (`WalletSection.tsx`, `LeaderboardTiers.tsx`, `OrganizerProgram.tsx`, and `ScoutRewards.tsx`). Other Milestone 3 components (`AppExperienceShowcase.tsx`, `TournamentModes.tsx`, `AIVisionShowcase.tsx`, `HowItWorks.tsx`, `PlatformComparison.tsx`, `Download.tsx`) are handled by peer explorer/worker pairs.
- **Read-Only Explorer Constraint**: No application files in `src/` have been modified during this investigation. Implementation is delegated to the Worker agent.
- No other caveats.

---

## 4. Conclusion

A comprehensive, line-by-line redesign blueprint has been produced and saved to:
`c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m3_2\blueprint.md`.

The blueprint provides:
1. Exact Supabase token class mappings (`#3ECF8E`, `#121212`, `#171717`, `#181a19`, `#1E201F`, `border-white/[0.08]`).
2. Verbatim copy preservation checklist covering 100% of all headings, telemetry labels, and button texts.
3. Full verification of mathematical invariants for the rank gap engine and organizer economics conservation.
4. Complete R1 anti-regression checklist forbidding legacy pills, deprecated stat subtext, and prohibited footnotes.
5. Actionable, copy-paste ready code structures for the Worker.

---

## 5. Verification Method

To verify the Worker's implementation against this blueprint:

1. **TypeScript Typecheck**:
   ```powershell
   npm run typecheck
   ```
   *Expected: Zero errors.*

2. **ESLint Code Analysis**:
   ```powershell
   npm run lint
   ```
   *Expected: Zero errors or warnings.*

3. **Vite Production Build**:
   ```powershell
   npm run build
   ```
   *Expected: Clean build output in `dist/`.*

4. **Automated Test Suite**:
   ```powershell
   npm test
   ```
   *Expected: All 13 test files passing (including `challenger-m3-1.test.ts`, `challenger-m3-2.test.ts`, `supabase-tokens-and-invariants.test.ts`, `tier1-feature-coverage.test.ts`, `tier3-cross-feature.test.ts`, and `layout-copy-verification.test.ts`).*

5. **Code Invalidation Conditions**:
   - Any modification to `FLOW_NODES` elements in `WalletSection.tsx`.
   - Changing the exact string `"Bermuda or Clash Squad"` in `OrganizerProgram.tsx`.
   - Modifying mathematical rounding or calculation orders in `OrganizerProgram.tsx` or `LeaderboardTiers.tsx`.
   - Introducing `<Pill />` or `<Stat subtext=... />`.
   - Any modification to `Supabase _ The Postgres Development Platform.html` or its asset folder.
