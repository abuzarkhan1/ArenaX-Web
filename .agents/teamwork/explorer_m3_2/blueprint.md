# Supabase Design Token Redesign Blueprint: Milestone 3 (Scope 2)
**Target Components**:
1. `src/components/WalletSection.tsx` (Two-Vault Architecture & Settlement Lifecycle)
2. `src/components/LeaderboardTiers.tsx` (Competitive Ranks & Promotion Gap Simulator)
3. `src/components/OrganizerProgram.tsx` (Organizer Capabilities & Earnings Simulator)
4. `src/components/ScoutRewards.tsx` (Scout Referral Royalties & Digital Voucher Store)

**Author**: `explorer_m3_2` (Teamwork Explorer)  
**Date**: 2026-11-07  
**Reference Specification**: `spec_miner_survey_1/supabase_tokens.md`  
**Baseline Status**: 100% Passing (TypeScript, ESLint, Vite Build, 13 Test Suites)

---

## 1. Executive Summary & Scope Boundary

This blueprint specifies the architectural and visual modernization of ArenaX-Web's four core financial, ranking, and host showcase components. All designs strictly adopt the **Supabase dark carbon & hairline** design system extracted from `Supabase _ The Postgres Development Platform.html`, eliminating legacy HUD gaming neon glows, pill eyebrows, and loose styling while enforcing **100% content preservation (Requirement R3)** and **mathematical invariant conservation**.

### Scope Invariants & Hard Constraints
1. **Reference Immutability**: Neither `Supabase _ The Postgres Development Platform.html` nor `Supabase _ The Postgres Development Platform_files/` may be edited, touched, or rewritten.
2. **Explorer Read-Only Role**: This document provides the authoritative implementation blueprint; no application source code in `src/` is modified by this explorer agent.
3. **Requirement R3**: 100% of all headings, subheadings, labels, numbers, units, copy, tooltips, slider ranges, steps, and interactive button handlers must remain intact verbatim.
4. **Zero R1 Violations**: Zero `<Pill />` eyebrows, zero `subtext` on `<Stat />`, zero `tagline:` properties, zero explanatory footnote leaks.
5. **Exact Anchor DOM IDs**: `#wallet`, `#ranks`, `#organizers`, and `#scout-rewards` must be retained on their respective `<section>` elements.

---

## 2. Supabase Token Mapping Matrix

| Design Token Role | Supabase Canonical Token | Tailwind Utility / CSS Class | Replacement In Target Components |
|---|---|---|---|
| **Canvas Surface** | `#121212` (`oklch(.19 calc(.005*.5) 157.5)`) | `bg-[#121212]` or `bg-bg-1` | Section background for `#wallet`, `#ranks`, `#organizers`, `#scout-rewards` |
| **Card Surface (Base)** | `#171717` (`surface-75` / `surface-100`) | `bg-[#171717]` or `bg-surface-card` | Play Wallet, default Rank cards, Scout Royalties card, Digital Store card |
| **Card Surface (Highlight)** | `#181A19` (`surface-100`) with emerald edge | `bg-[#181a19] border-[#3ECF8E]/35` | Winning Wallet, Selected Rank Card, Grandmaster Card, Host Earnings Simulator |
| **Nested Control Surface** | `#121212` / `rgba(0,0,0,0.24)` | `bg-[#121212]/80` or `bg-field` | 2x2 Telemetry cells, slider containers, store rows, flow node containers |
| **Elevated Hover Surface** | `#1E201F` (`surface-300`) | `hover:bg-[#1E201F]` | Carousel navigation buttons, hover states on cards |
| **Hairline Border (Universal)** | `rgba(255, 255, 255, 0.08)` (`#242424`) | `border border-white/[0.08]` | All card borders, section dividers, telemetry cell borders |
| **Hairline Border (Strong)** | `rgba(255, 255, 255, 0.14)` (`#2e2e2e`) | `border-white/[0.14]` | Card hover states, active inputs, control borders |
| **Brand Accent Green** | `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`) | `text-[#3ECF8E]`, `bg-[#3ECF8E]`, `text-accent` | Primary buttons, active tabs, progress bars, highlighted metrics |
| **Brand Accent Hover** | `#34B27B` | `hover:bg-[#34B27B]` | Hover state on primary green buttons and active controls |
| **Brand Surface Deep** | `#041B10` (`--brand-100`) | `bg-[#041B10]` | Badge surfaces, cash valuation container, Grandmaster APEX badge |
| **Brand Border Accent** | `rgba(62, 207, 142, 0.30)` | `border-[#3ECF8E]/30` | Cash valuation border, highlighted card borders, active progress bar glow |
| **Typography Display/Headings** | Manrope, weights 700 / 800 | `font-heading font-extrabold tracking-tight` | Section H2s, card titles, large numbers |
| **Typography Body** | Inter, calibrated weight 450 | `font-sans font-normal text-[#A0A0A0]` | Descriptive copy, feature explanations |
| **Typography Telemetry/Mono** | Source Code Pro / JetBrains Mono | `font-mono text-xs tracking-tight tabular-nums` | Points, currency (AX/PKR), percentages, counters, timestamps |
| **Button Primary** | `#3ECF8E` solid with dark text `#041B10` | `<Button variant="primary">` | Cashout, Apply to Host Scrims, Get Scout Code in App |
| **Button Secondary** | `#171717` carbon with hairline border | `<Button variant="secondary">` | Deposit, Redeem in App, Preset Rating buttons |
| **Status Badge** | Monospace uppercase hairline badge | `<Badge tone="emerald">` / `<Badge tone="neutral">` | Parity badges, withdrawal flags, tier tags |

---

## 3. Component 1: `WalletSection.tsx` Blueprint

### 3.1 Structural Overview
`WalletSection.tsx` models the esports financial settlement engine:
- Section header with emerald pulsing cash parity badge.
- 5-stage horizontal lifecycle flow (`FLOW_NODES`) with GSAP ScrollTrigger animated connector line.
- Two depth panels:
  1. **Play Wallet** (Base Card: Entry Escrow, Non-Withdrawable, 2x2 Telemetry grid, `Deposit` button).
  2. **Winning Wallet** (Highlighted Card: Prize Escrow, 100% Withdrawable, 1 AX = 1 PKR cash valuation callout, 2x2 Telemetry grid, `Cashout` button).

### 3.2 Exact Code Specification & Class Mappings

```tsx
// =========================================================================
// SECTION WRAPPER
// =========================================================================
<section
  ref={sectionRef}
  id="wallet"
  className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
  aria-label="Two-Vault Financial Security"
>
```

#### Header Block
```tsx
<div className="max-w-[1200px] mx-auto px-6 relative z-10">
  <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
    <div className="flex items-center gap-3 sm:gap-4">
      <IconOrb icon={ShieldCheck} tone="emerald" size="lg" className="hidden sm:inline-flex" />
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
        Two-Vault <span className="text-[#3ECF8E]">Security</span>
      </h2>
    </div>
    <Badge tone="emerald" dot pulse className="self-start sm:self-auto">
      1 AX = 1 PKR Cash Parity
    </Badge>
  </div>
```

#### FLOW_NODES Array (Strict Invariant)
```ts
const FLOW_NODES = [
  { step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' },
  { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' },
  { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' },
  { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' },
  { step: '05', title: 'Cashout', sub: '< 24h Direct' },
];
```

#### Horizontal Flow Container (Supabase Carbon Framing)
```tsx
<div
  ref={flowContainerRef}
  className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] relative"
>
  {/* Hairline Background Guide */}
  <div className="hidden sm:block absolute top-[50%] left-8 right-8 h-[2px] bg-white/[0.08] pointer-events-none z-0">
    <div
      ref={lineRef}
      className="h-full bg-[#3ECF8E] shadow-[0_0_8px_rgba(62,207,142,0.5)]"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
    {FLOW_NODES.map((node, i) => (
      <div key={node.step} className="flex flex-col relative">
        <div className="group p-4 rounded-control bg-[#121212]/90 border border-white/[0.08] hover:border-[#3ECF8E]/40 hover:bg-[#121212] flex flex-col justify-between h-full transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono font-bold text-[#3ECF8E] tracking-tight tabular-nums">
              /{node.step}
            </span>
            {i < FLOW_NODES.length - 1 && (
              <ArrowRight
                className="w-3.5 h-3.5 text-[#707070] hidden sm:block transition-colors group-hover:text-[#3ECF8E]"
                strokeWidth={1.5}
              />
            )}
          </div>
          <div>
            <span className="text-sm font-bold text-[#EDEDED] block font-heading">
              {node.title}
            </span>
            <span className="text-xs text-[#707070] font-mono tracking-tight tabular-nums">
              {node.sub}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

#### Dual Depth Panels: Play Wallet & Winning Wallet
```tsx
<div className="relative">
  {/* Subtle Supabase Ambient Radial Light */}
  <div aria-hidden="true" className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[#3ECF8E]/[0.03] blur-[90px] pointer-events-none" />
  <div aria-hidden="true" className="absolute -right-12 bottom-0 h-80 w-80 rounded-full bg-[#3ECF8E]/[0.03] blur-[90px] pointer-events-none" />

  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
    {/* Panel 1: Play Wallet (Base Card, Entry Escrow) */}
    <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
      <div>
        <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <IconOrb icon={Wallet} tone="emerald" size="sm" />
            <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Play Wallet</h3>
          </div>
          <Badge tone="neutral">Non-Withdrawable</Badge>
        </div>

        {/* Structured Telemetry Specs (2x2 Matrix) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Min Deposit</span>
            <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">PKR 50</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Surcharge</span>
            <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">0% Instant</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Cancellation</span>
            <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">100% Refund</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Squad Transfer</span>
            <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">Instant P2P</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.08]">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={scrollToDownload}
        >
          Deposit
        </Button>
      </div>
    </div>

    {/* Panel 2: Winning Wallet (Highlighted Card, Prize Escrow) */}
    <div className="relative p-6 sm:p-8 rounded-card bg-[#181a19] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_36px_-12px_rgba(62,207,142,0.22),0_20px_48px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1">
      <HudCorners tone="emerald" size="md" className="opacity-30" />
      <div>
        <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <IconOrb icon={ShieldCheck} tone="emerald" size="sm" />
            <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Winning Wallet</h3>
          </div>
          <Badge tone="emerald" dot>100% Withdrawable</Badge>
        </div>

        {/* Cash Parity Callout */}
        <div className="flex items-center justify-between p-3 rounded-control bg-[#041B10]/90 border border-[#3ECF8E]/30 mb-4 shadow-[inset_0_1px_0_rgba(62,207,142,0.12)]">
          <span className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wide">Cash Valuation</span>
          <span className="text-sm font-mono font-bold text-[#3ECF8E] tracking-tight tabular-nums">1 AX = 1 PKR Cash</span>
        </div>

        {/* Structured Telemetry Specs (2x2 Matrix) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Payout SLA</span>
            <span className="text-base font-mono font-bold text-[#3ECF8E] tabular-nums mt-1 block">&lt; 24 Hours</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Min Threshold</span>
            <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">100 AX</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Disbursement</span>
            <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">JazzCash / EasyPaisa</span>
          </div>
          <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">Security</span>
            <span className="text-base font-mono font-bold text-[#EDEDED] tabular-nums mt-1 block">6-Digit PIN</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.08]">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={scrollToDownload}
        >
          Cashout
        </Button>
      </div>
    </div>
  </div>
</div>
```

---

## 4. Component 2: `LeaderboardTiers.tsx` Blueprint

### 4.1 Structural Overview
- Section header with `.tier-reveal` GSAP ScrollTrigger registration.
- Horizontal rank carousel displaying 8 official tiers (Bronze through Grandmaster).
- Grandmaster card with APEX badge and emerald halo.
- Promotion Gap Simulator with 0–10,000 PTS range slider, quick presets (2.5K, 5.0K, 7.5K), target tier selector, and real-time Booyahs/points required dossier.

### 4.2 Exact Code Specification & Class Mappings

```tsx
<section
  ref={sectionRef}
  id="ranks"
  className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
  aria-label="Season Tiers & Ranks"
>
  <div className="max-w-[1200px] mx-auto px-6 relative z-10">
    {/* Header & Carousel Navigation */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
      <div className="tier-reveal">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
          Competitive <span className="text-[#3ECF8E]">Tiers</span>
        </h2>
        <p className="text-sm sm:text-base text-[#A0A0A0] max-w-2xl mt-2 font-sans">
          Eight competitive divisions with direct cash milestone rewards.
        </p>
      </div>

      {/* Carousel Navigation Buttons */}
      <div className="tier-reveal flex items-center gap-2 self-start md:self-end">
        <button
          type="button"
          onClick={() => scrollTrack('left')}
          className="w-10 h-10 rounded-control border border-white/[0.08] bg-[#171717] hover:bg-[#1E201F] hover:border-white/20 text-[#A0A0A0] hover:text-[#EDEDED] transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.97]"
          aria-label="Scroll ranks left"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack('right')}
          className="w-10 h-10 rounded-control border border-white/[0.08] bg-[#171717] hover:bg-[#1E201F] hover:border-white/20 text-[#A0A0A0] hover:text-[#EDEDED] transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.97]"
          aria-label="Scroll ranks right"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
```

#### Carousel Rank Track
```tsx
<div
  ref={scrollContainerRef}
  className="mb-14 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-6 px-6"
>
  <div className="flex gap-4 min-w-max pb-2">
    {RANK_TIERS.map((tier, idx) => {
      const isGrandmaster = tier.isTop;
      const isSelected = targetTier === tier.name;

      return (
        <div
          key={tier.name}
          onClick={() => setTargetTier(tier.name)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setTargetTier(tier.name);
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected}
          className={`w-[200px] sm:w-[220px] p-5 rounded-card transition-all duration-200 ease-out border flex flex-col justify-between cursor-pointer relative group text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
            isSelected
              ? 'bg-[#181a19] border-[#3ECF8E] shadow-[0_0_24px_-8px_rgba(62,207,142,0.30),inset_0_1px_0_rgba(255,255,255,0.08)] -translate-y-1.5'
              : isGrandmaster
              ? 'bg-[#171717] border-[#3ECF8E]/40 hover:border-[#3ECF8E] hover:-translate-y-1 hover:shadow-lift'
              : 'bg-[#171717] border-white/[0.08] hover:border-white/20 hover:-translate-y-1 hover:shadow-lift'
          }`}
        >
          {(isSelected || isGrandmaster) && <HudCorners tone="emerald" size="sm" className="opacity-30" />}

          {/* Grandmaster Apex Top Sheen */}
          {isGrandmaster && (
            <div className="absolute inset-0 rounded-card bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_70%)] pointer-events-none" />
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-mono text-[#707070] font-semibold tracking-tight tabular-nums">
                {String(idx + 1).padStart(2, '0')} / 08
              </span>
              {isGrandmaster && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/40 tracking-wider">
                  APEX
                </span>
              )}
            </div>

            {/* Emblem Pedestal Showcase */}
            <div className="h-28 sm:h-32 flex flex-col items-center justify-center relative my-2">
              <div
                className={`absolute w-20 h-20 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                  isSelected
                    ? 'bg-[#3ECF8E]/20'
                    : isGrandmaster
                    ? 'bg-[#3ECF8E]/15'
                    : 'bg-white/[0.02] group-hover:bg-[#3ECF8E]/10'
                }`}
              />
              <img
                src={tier.badge}
                alt={`${tier.name} Rank Badge`}
                loading="lazy"
                className="h-20 sm:h-24 w-auto max-w-[96px] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300 relative z-10"
              />
              <div className="w-14 h-1.5 bg-black/60 rounded-full blur-[2px] mt-2 relative z-0" />
            </div>

            <h4 className="text-lg sm:text-xl font-extrabold font-heading text-[#EDEDED] group-hover:text-[#3ECF8E] transition-colors">
              {tier.name}
            </h4>
            <span className="text-xs font-mono text-[#707070] block mt-0.5 tracking-tight tabular-nums">
              {tier.range}
            </span>

            <div className="mt-2.5 inline-block px-2 py-0.5 rounded bg-[#121212] border border-white/[0.08] text-[11px] font-mono font-bold text-[#A0A0A0] tracking-tight tabular-nums">
              {tier.pts}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.08]">
            <span
              className={`text-xs sm:text-sm font-mono font-bold block tracking-tight tabular-nums ${
                isGrandmaster || isSelected ? 'text-[#3ECF8E]' : 'text-[#EDEDED]'
              }`}
            >
              {tier.reward}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
```

#### Promotion Gap Simulator (Tactical Dossier)
```tsx
<div className="relative">
  <div className="relative z-10 border border-white/[0.08] rounded-card bg-[#171717] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] p-6 sm:p-8 max-w-4xl mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/[0.08] gap-3 mb-8">
      <div className="flex items-center gap-3">
        <IconOrb icon={Target} tone="emerald" size="sm" />
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]">
          Promotion Gap Simulator
        </h3>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-control bg-[#121212] border border-white/[0.08] self-start sm:self-auto">
        <Trophy className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
        <span className="text-xs font-mono text-[#3ECF8E] font-bold tracking-tight tabular-nums">+20 PTS / Booyah</span>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Column: Slider & Milestone Grid */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <div className="flex justify-between items-baseline text-xs font-mono mb-2.5">
            <span className="text-[#707070] uppercase font-semibold">Current Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-mono text-[#3ECF8E] tracking-tight tabular-nums">
                {currentPts.toLocaleString()}
              </span>
              <span className="text-[#707070]">PTS</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            step="50"
            value={currentPts}
            onChange={(e) => setCurrentPts(parseInt(e.target.value, 10))}
            aria-label="Current Points Rating"
            className="w-full h-2.5 bg-[#121212] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
          />

          <div className="flex justify-between items-center text-[11px] font-mono text-[#707070] mt-2 px-1 tracking-tight tabular-nums">
            <span>0 PTS</span>
            <button
              type="button"
              onClick={() => setCurrentPts(2500)}
              aria-label="Set rating to 2,500 points"
              className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
            >
              2.5K
            </button>
            <button
              type="button"
              onClick={() => setCurrentPts(5000)}
              aria-label="Set rating to 5,000 points"
              className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
            >
              5.0K
            </button>
            <button
              type="button"
              onClick={() => setCurrentPts(7500)}
              aria-label="Set rating to 7,500 points"
              className="hover:text-[#3ECF8E] inline-block py-2.5 -my-2.5 transition-colors cursor-pointer tabular-nums active:scale-[0.98]"
            >
              7.5K
            </button>
            <span>10K+ PTS</span>
          </div>
        </div>

        {/* Milestone Buttons */}
        <div>
          <span className="text-xs font-mono text-[#707070] uppercase font-semibold block mb-2.5">
            Target Tier
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {RANK_TIERS.map((t) => {
              const isCurrent = targetTier === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTargetTier(t.name)}
                  className={`py-2 px-2 rounded-control text-[10px] font-mono font-bold uppercase leading-tight transition-all duration-100 cursor-pointer flex flex-col items-center gap-1.5 active:scale-[0.98] tabular-nums ${
                    isCurrent
                      ? 'bg-[#3ECF8E] text-[#041B10] shadow-sm'
                      : 'bg-[#121212] text-[#707070] border border-white/[0.08] hover:text-[#EDEDED] hover:border-white/20'
                  }`}
                >
                  <img
                    src={t.badge}
                    alt=""
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow pointer-events-none"
                  />
                  <span className="truncate max-w-full">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Promotion Dossier */}
      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#3ECF8E]/15 blur-lg" />
            <img
              src={selectedTier.badge}
              alt={`${selectedTier.name} badge`}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] relative z-10"
            />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold font-heading text-[#EDEDED]">
              {selectedTier.name}
            </div>
            <span className="text-xs font-mono text-[#3ECF8E] tracking-tight tabular-nums">
              {selectedTier.targetMin.toLocaleString()} PTS REQUIRED
            </span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-white/[0.08] font-mono text-xs tracking-tight">
          <div className="flex justify-between items-center py-1">
            <span className="text-[#707070] uppercase">Points Required:</span>
            <span className="text-sm font-bold text-[#3ECF8E] tabular-nums">
              {ptsNeeded > 0 ? `${ptsNeeded.toLocaleString()} PTS` : 'QUALIFIED'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#707070] uppercase">Booyahs Required:</span>
            <span className="text-sm font-bold text-[#EDEDED] tabular-nums">
              {ptsNeeded > 0 ? `~${booyahsNeeded} Matches` : 'Promotion Ready'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#707070] uppercase">Milestone Bonus:</span>
            <span className="text-sm font-bold text-[#3ECF8E] tabular-nums">
              {selectedTier.reward}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-[11px] font-mono text-[#707070] mb-1.5 tracking-tight tabular-nums">
            <span>Progress to {selectedTier.name}</span>
            <span className="text-[#EDEDED] font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full bg-[#121212] rounded-full overflow-hidden border border-white/[0.08]">
            <div
              className="h-full bg-[#3ECF8E] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(62,207,142,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 5. Component 3: `OrganizerProgram.tsx` Blueprint

### 5.1 Structural Overview
- Left column: 4 Operational Capabilities with `IconOrb` and hairline separators.
- Right column: Host Earnings Simulator card with 3 interactive sliders (Participants 10–48, Entry Fee 50–500, Host Cut 0–20%), revenue conservation breakdown, and Net Organizer Payout display in Manrope 800.

### 5.2 Mathematical Formulation & Invariants
```ts
const totalRevenue = participants * entryFee;
const adminFee = Math.round(totalRevenue * 0.10);
const hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100));
const playerPrizePool = totalRevenue - adminFee - hostEarnings;
const playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100);
```
Conservation invariant: `totalRevenue === adminFee + hostEarnings + playerPrizePool` across all 37,674 Cartesian states.

### 5.3 Exact Code Specification & Class Mappings

```tsx
<section
  id="organizers"
  className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
  aria-label="Organizer Program"
>
  <div className="max-w-[1200px] mx-auto px-6 relative z-10">
    <div className="mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
        Host & Earn <span className="text-[#3ECF8E]">Commission</span>
      </h2>
      <p className="text-sm sm:text-base text-[#A0A0A0] max-w-2xl mt-2 font-sans">
        Automated tournament operations with dedicated organizer commissions.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left Column: 4 Capabilities List */}
      <div className="lg:col-span-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {capabilities.map((cap, index) => (
          <div key={cap.num} className="py-6 sm:py-8 group flex items-start gap-4 sm:gap-5">
            <IconOrb
              icon={CAPABILITY_ICONS[index]}
              tone="emerald"
              size="sm"
              className="mt-1"
            />
            <div className="min-w-0">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs font-bold text-[#3ECF8E] tracking-widest tabular-nums">
                  /{cap.num}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#EDEDED] transition-colors group-hover:text-[#3ECF8E]">
                  {cap.title}
                </h3>
              </div>
              <p className="text-sm text-[#A0A0A0] leading-relaxed font-normal font-sans">
                {cap.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Earnings Simulator Card */}
      <div className="lg:col-span-6 relative p-6 sm:p-8 rounded-card bg-[#181a19] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_36px_-12px_rgba(62,207,142,0.22),0_20px_48px_-20px_rgba(0,0,0,0.8)] space-y-6 transition-all duration-200 ease-out hover:shadow-lift-strong">
        <HudCorners tone="emerald" size="md" className="opacity-30" />
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <IconOrb icon={Sliders} tone="emerald" size="sm" />
            <h3 className="text-lg font-bold font-heading text-[#EDEDED] uppercase tracking-wider">
              Host Earnings Simulator
            </h3>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          {/* Slider 1: Participants */}
          <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-[#707070] uppercase font-bold">Lobby Size</span>
              <span className="text-[#EDEDED] font-bold tracking-tight tabular-nums">{participants} Players</span>
            </div>
            <input
              type="range"
              min="10"
              max="48"
              value={participants}
              onChange={(e) => setParticipants(parseInt(e.target.value, 10))}
              aria-label="Tournament participants count"
              className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
              <span>10 CS</span>
              <span>24 Duo</span>
              <span>48 BR</span>
            </div>
          </div>

          {/* Slider 2: Entry Fee */}
          <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-[#707070] uppercase font-bold">Entry Fee</span>
              <span className="text-[#EDEDED] font-bold tracking-tight tabular-nums">{entryFee} AX ({entryFee} PKR)</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={entryFee}
              onChange={(e) => setEntryFee(parseInt(e.target.value, 10))}
              aria-label="Entry fee per player"
              className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
              <span>50 PKR</span>
              <span>200 PKR</span>
              <span>500 PKR</span>
            </div>
          </div>

          {/* Slider 3: Host Cut */}
          <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] hover:border-white/[0.14] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-[#707070] uppercase font-bold">Organizer Cut</span>
              <span className="text-[#3ECF8E] font-bold tracking-tight tabular-nums">{hostCutPercent}% of Entry Revenue</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={hostCutPercent}
              onChange={(e) => setHostCutPercent(parseInt(e.target.value, 10))}
              aria-label="Organizer commission percentage"
              className="w-full h-3 bg-[#171717] rounded-control appearance-none cursor-pointer accent-[#3ECF8E] hover:accent-[#34B27B] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#707070] mt-1.5 tracking-tight tabular-nums">
              <span>0%</span>
              <span>10%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* Economics Breakdown */}
        <div className="p-4 rounded-control bg-[#121212]/80 border border-white/[0.08] space-y-2 text-xs font-mono tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
          <div className="flex justify-between py-1 border-b border-white/[0.08]">
            <span className="text-[#A0A0A0]">TOTAL REVENUE</span>
            <span className="text-[#EDEDED] font-bold tabular-nums">{totalRevenue.toLocaleString()} PKR</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/[0.08]">
            <span className="text-[#A0A0A0]">PLATFORM FEE (10%)</span>
            <span className="text-[#707070] tabular-nums">{adminFee.toLocaleString()} PKR</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#A0A0A0]">PRIZE POOL ({playerPrizePercent}%)</span>
            <span className="text-[#EDEDED] font-bold tabular-nums">{playerPrizePool.toLocaleString()} PKR</span>
          </div>
        </div>

        {/* Net Host Payout Display */}
        <div className="relative overflow-hidden p-5 rounded-control bg-[#121212] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_8px_20px_-8px_rgba(62,207,142,0.2)]">
          <div aria-hidden="true" className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#3ECF8E]/[0.08] blur-[50px] pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs font-mono text-[#3ECF8E] font-bold uppercase tracking-wider block">
              Net Organizer Payout
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-heading text-[#EDEDED] tracking-tight tabular-nums">
                {hostEarnings.toLocaleString()}
              </span>
              <span className="text-sm font-mono font-bold text-[#3ECF8E] tracking-tight">PKR / Match</span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={scrollToDownload}
          icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
        >
          Apply to Host Scrims
        </Button>
      </div>
    </div>
  </div>
</section>
```

---

## 6. Component 4: `ScoutRewards.tsx` Blueprint

### 6.1 Structural Overview
- Section header with clean typography (elimination of legacy `text-glow-accent` neon drop shadow).
- Compact dual card pair:
  1. **Scout Community Royalties** (Base Card: 3 quantitative metric boxes: 25 AX Starter Gift, 2% Cash Win Royalty, Tier AX Rank Bonuses, descriptive text, `Get Scout Code in App` CTA).
  2. **In-App Digital Rewards Store** (Base Card: Description, 3 store rows for Free Fire Diamond packs and Weekly Membership, `Redeem in App` CTA).

### 6.2 Exact Code Specification & Class Mappings

```tsx
<section
  id="scout-rewards"
  className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
  aria-label="Community Scout & Digital Store"
>
  <div className="max-w-[1200px] mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
        Scout & <span className="text-[#3ECF8E]">Store</span>
      </h2>
      <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed font-sans font-normal">
        Invite players to earn recurring royalties from their victories, or redeem coins for digital vouchers.
      </p>
    </div>

    {/* Dual Card Pair */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
      {/* Card 1: Scout Program */}
      <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
        <HudCorners tone="emerald" size="sm" className="opacity-30" />
        <div>
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08] mb-6">
            <IconOrb icon={Percent} tone="emerald" size="md" />
            <h3 className="text-xl font-bold font-heading text-[#EDEDED]">
              Scout Community Royalties
            </h3>
          </div>

          {/* 3 Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#3ECF8E] tabular-nums tracking-tight block">
                25 AX
              </span>
              <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                Starter Gift
              </span>
            </div>

            <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#EDEDED] tabular-nums tracking-tight block">
                2% Cash
              </span>
              <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                Win Royalty
              </span>
            </div>

            <div className="p-3.5 rounded-control bg-[#121212]/80 border border-white/[0.08] text-center transition-colors duration-200 hover:border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#3ECF8E] tabular-nums tracking-tight block">
                Tier AX
              </span>
              <span className="text-[10px] font-mono text-[#707070] uppercase block mt-1">
                Rank Bonuses
              </span>
            </div>
          </div>

          <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-sans font-normal">
            Earn permanent passive royalties every time your referred squadmate or guild member wins a match scrim. Funded 100% from platform rake with zero player deduction.
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.08]">
          <Button variant="primary" size="md" onClick={scrollToDownload}>
            Get Scout Code in App
          </Button>
        </div>
      </div>

      {/* Card 2: Digital Rewards Store */}
      <div className="relative p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
        <div>
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08] mb-6">
            <IconOrb icon={ShoppingBag} tone="emerald" size="md" />
            <h3 className="text-xl font-bold font-heading text-[#EDEDED]">
              In-App Digital Rewards
            </h3>
          </div>

          <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-sans font-normal">
            Prefer in-game digital goods over cashouts? Redeem earned AX Coins inside the mobile app:
          </p>

          {/* 3 Digital Store Rows */}
          <div className="space-y-2.5 mb-6 font-mono text-xs">
            <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2.5 min-w-0">
                <IconOrb icon={Award} tone="emerald" size="sm" />
                <span className="text-[#EDEDED] font-bold">Free Fire 100 + 10 Diamonds</span>
              </div>
              <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">190 AX</span>
            </div>

            <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2.5 min-w-0">
                <IconOrb icon={Award} tone="emerald" size="sm" />
                <span className="text-[#EDEDED] font-bold">Free Fire 520 Diamonds Top-up</span>
              </div>
              <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">950 AX</span>
            </div>

            <div className="group/row p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex justify-between items-center gap-3 transition-[border-color,background-color] duration-200 hover:border-[#3ECF8E]/30 hover:bg-white/[0.02]">
              <div className="flex items-center gap-2.5 min-w-0">
                <IconOrb icon={Award} tone="emerald" size="sm" />
                <span className="text-[#EDEDED] font-bold">Weekly Diamond Membership</span>
              </div>
              <span className="text-[#3ECF8E] font-bold tabular-nums tracking-tight whitespace-nowrap">450 AX</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.08]">
          <Button variant="secondary" size="md" onClick={scrollToDownload}>
            Redeem in App
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 7. Requirement R3: Verbatim Copy Preservation Checklist

| Component | Target String / Element | Preservation Type | Verified Location |
|---|---|---|---|
| `WalletSection.tsx` | `Two-Vault <span className="text-accent">Security</span>` or `Two-Vault <span className="text-[#3ECF8E]">Security</span>` | Exact Title | H2 |
| `WalletSection.tsx` | `1 AX = 1 PKR Cash Parity` | Exact Badge | Header Badge |
| `WalletSection.tsx` | `FLOW_NODES` exact array (01 Deposit to 05 Cashout) | Exact Data Structure | Global Array |
| `WalletSection.tsx` | `Play Wallet` & `Non-Withdrawable` | Exact Card Title & Badge | Panel 1 |
| `WalletSection.tsx` | `Min Deposit: PKR 50`, `Surcharge: 0% Instant`, `Cancellation: 100% Refund`, `Squad Transfer: Instant P2P` | Exact 2x2 Specs | Panel 1 |
| `WalletSection.tsx` | `Deposit` button with `scrollToDownload` trigger | Exact CTA Button | Panel 1 |
| `WalletSection.tsx` | `Winning Wallet` & `100% Withdrawable` | Exact Card Title & Badge | Panel 2 |
| `WalletSection.tsx` | `Cash Valuation: 1 AX = 1 PKR Cash` | Exact Parity Callout | Panel 2 |
| `WalletSection.tsx` | `Payout SLA: &lt; 24 Hours`, `Min Threshold: 100 AX`, `Disbursement: JazzCash / EasyPaisa`, `Security: 6-Digit PIN` | Exact 2x2 Specs | Panel 2 |
| `WalletSection.tsx` | `Cashout` button with `scrollToDownload` trigger | Exact CTA Button | Panel 2 |
| `LeaderboardTiers.tsx` | `Competitive <span className="text-accent">Tiers</span>` | Exact Title | H2 |
| `LeaderboardTiers.tsx` | `Eight competitive divisions with direct cash milestone rewards.` | Exact Subtitle | Paragraph |
| `LeaderboardTiers.tsx` | 8 Tiers: Bronze (0), Silver (1000), Gold (2000), Platinum (3200), Diamond (4600), Heroic (6200), Master (8000), Grandmaster (10000) | Exact Array Data | `RANK_TIERS` |
| `LeaderboardTiers.tsx` | `APEX` badge on Grandmaster | Exact Badge | Card 08 |
| `LeaderboardTiers.tsx` | `Promotion Gap Simulator` & `+20 PTS / Booyah` | Exact Heading & Tag | Simulator Header |
| `LeaderboardTiers.tsx` | `Points Required:`, `Booyahs Required:`, `Milestone Bonus:` | Exact Metric Labels | Dossier |
| `OrganizerProgram.tsx` | `Host & Earn <span className="text-accent">Commission</span>` | Exact Title | H2 |
| `OrganizerProgram.tsx` | `Automated tournament operations with dedicated organizer commissions.` | Exact Subtitle | Paragraph |
| `OrganizerProgram.tsx` | `Configure Bermuda or Clash Squad formats with custom player limits, schedules, and brackets.` | Exact Invariant String | Capability 01 |
| `OrganizerProgram.tsx` | `Host Earnings Simulator` | Exact Card Title | Card Header |
| `OrganizerProgram.tsx` | `Lobby Size` (10 CS, 24 Duo, 48 BR) | Exact Slider & Ticks | Slider 1 |
| `OrganizerProgram.tsx` | `Entry Fee` (50 PKR, 200 PKR, 500 PKR) | Exact Slider & Ticks | Slider 2 |
| `OrganizerProgram.tsx` | `Organizer Cut` (0%, 10%, 20%) | Exact Slider & Ticks | Slider 3 |
| `OrganizerProgram.tsx` | `TOTAL REVENUE`, `PLATFORM FEE (10%)`, `PRIZE POOL ({playerPrizePercent}%)` | Exact Breakdown Labels | Economics Box |
| `OrganizerProgram.tsx` | `Net Organizer Payout` & `PKR / Match` | Exact Callout Labels | Payout Box |
| `OrganizerProgram.tsx` | `Apply to Host Scrims` | Exact CTA Button | Action Button |
| `ScoutRewards.tsx` | `Scout & <span className="text-accent">Store</span>` | Exact Title | H2 |
| `ScoutRewards.tsx` | `Invite players to earn recurring royalties from their victories, or redeem coins for digital vouchers.` | Exact Subtitle | Paragraph |
| `ScoutRewards.tsx` | `Scout Community Royalties` | Exact Card Title | Card 1 |
| `ScoutRewards.tsx` | `25 AX` Starter Gift, `2% Cash` Win Royalty, `Tier AX` Rank Bonuses | Exact Metrics | Card 1 |
| `ScoutRewards.tsx` | `Earn permanent passive royalties every time your referred squadmate...` | Exact Narrative | Card 1 |
| `ScoutRewards.tsx` | `Get Scout Code in App` | Exact CTA Button | Card 1 |
| `ScoutRewards.tsx` | `In-App Digital Rewards` | Exact Card Title | Card 2 |
| `ScoutRewards.tsx` | `Prefer in-game digital goods over cashouts? Redeem earned AX Coins inside the mobile app:` | Exact Narrative | Card 2 |
| `ScoutRewards.tsx` | `Free Fire 100 + 10 Diamonds` (190 AX), `Free Fire 520 Diamonds Top-up` (950 AX), `Weekly Diamond Membership` (450 AX) | Exact Store Items | Card 2 |
| `ScoutRewards.tsx` | `Redeem in App` | Exact CTA Button | Card 2 |

---

## 8. Mathematical Invariant & State Engine Conservation

### 8.1 Rank Gap Dynamic Math Invariants
```ts
function computeRankGap(currentPts: number, targetMin: number) {
  const ptsNeeded = Math.max(0, targetMin - currentPts);
  const booyahsNeeded = Math.ceil(ptsNeeded / 20);
  const progressPercent = targetMin === 0
    ? 100
    : Math.min(100, Math.round((currentPts / targetMin) * 100));
  return { ptsNeeded, booyahsNeeded, progressPercent };
}
```
- **Monotonicity**: `Bronze (0) < Silver (1000) < Gold (2000) < Platinum (3200) < Diamond (4600) < Heroic (6200) < Master (8000) < Grandmaster (10000)`
- **Clamping**: If `currentPts >= targetMin`, `ptsNeeded = 0`, `booyahsNeeded = 0`, and `progressPercent = 100`.

### 8.2 Organizer Revenue Conservation
```ts
const totalRevenue = participants * entryFee;
const adminFee = Math.round(totalRevenue * 0.10);
const hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100));
const playerPrizePool = totalRevenue - adminFee - hostEarnings;
const playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100);
```
- **Universal Conservation**: For all combinations of `p ∈ [10, 48]`, `fee ∈ [50, 500, step 10]`, `cut ∈ [0, 20, step 1]`, `totalRevenue === adminFee + hostEarnings + playerPrizePool` strictly holds.
- **Non-negativity**: `adminFee >= 0`, `hostEarnings >= 0`, `playerPrizePool > 0`.
- **Bounds**: `playerPrizePercent` is bounded strictly within `[69%, 90%]`.

---

## 9. Prohibited Strings & Strict R1 Anti-Regression Checklist

The Worker must ensure that **NONE** of the following prohibited strings or patterns appear in any of the 4 files:
- ❌ `<Pill\b[^>]*\/>` (No legacy HUD Pill eyebrows)
- ❌ `<Stat ... subtext=... />` (Deprecated subtext prop strictly forbidden)
- ❌ `tagline:` (Zero tagline object properties)
- ❌ `Protected Escrow` (Footnote regex violation)
- ❌ `Zero Hidden Commissions` (Footnote regex violation)
- ❌ `Tournament entry balances are strictly isolated from verified prize money...` (Conversational essay)
- ❌ `Non-Withdrawable balance used exclusively for tournament entry fees.`
- ❌ `Direct withdrawable cash won from verified tournament matches.`
- ❌ `Instant Winning Wallet credit upon verification.`
- ❌ `8 TIERS // ACTIVE CIRCUIT`
- ❌ `Credited directly to your dedicated Organizer Wallet upon match settlement.`
- ❌ `10% Platform Rake`
- ❌ `10 (CS)` or `48 (BR)` (Parenthetical annotations on slider ticks)
- ❌ `text-glow-accent` (Legacy neon drop shadow on ScoutRewards)
- ❌ Unused `ShieldCheck` import in `LeaderboardTiers.tsx`

---

## 10. Worker Implementation Roadmap

When implementing Milestone 3 Scope 2, the Worker should execute in this sequence:
1. **Update `src/components/WalletSection.tsx`**: Apply Supabase carbon surfaces (`#121212`, `#171717`, `#181a19`), hairline borders (`border-white/[0.08]`), clean status badges, and refined connector line glow.
2. **Update `src/components/LeaderboardTiers.tsx`**: Apply Supabase card framing to carousel cards, selected card emerald glow, APEX badge styling, clean range slider, and tactical promotion dossier.
3. **Update `src/components/OrganizerProgram.tsx`**: Apply hairline dividers to the 4 capabilities, Supabase highlighted card surface to the simulator, clean accessible range sliders, and Manrope 800 numerals.
4. **Update `src/components/ScoutRewards.tsx`**: Remove legacy `text-glow-accent`, apply Supabase card surfaces and 2x2/3-stat telemetry boxes, and clean action buttons.
5. **Run Verification Commands**:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
   - `npm test`
   Confirm 100% passing across all 13 test files.
