# Milestone 3 Redesign Blueprint: Interactive Product Showcases & Technical Features

**Author**: `explorer_m3_1` (Teamwork Explorer)  
**Target Milestone**: Milestone 3 (Interactive Product Showcases & Technical Features)  
**Date**: 2026-11-07  
**Scope**:
1. `src/components/AppExperienceShowcase.tsx`
2. `src/components/TournamentModes.tsx`
3. `src/components/AIVisionShowcase.tsx`

---

## 1. Executive Summary & Design System Integration

This blueprint defines the authoritative, defect-free redesign specifications for the three core product showcase components of ArenaX-Web. Following the reference architecture established in Milestones 1 and 2, these components will transition from legacy cyberpunk/HUD styling (heavy neon glow drops, corner brackets, `shadow-broadcast`, cyan halos) to the **Supabase dark carbon & precision hairline design system**.

### Authoritative Design System Mapping
- **Canvas / Base Background**: `#121212` (`bg-[#121212]`)
- **Card Surfaces**: `#171717` (`bg-[#171717]`), border `rgba(255, 255, 255, 0.08)` (`border-white/[0.08]`)
- **Elevated Surfaces**: `#181A19` / `#1E201F` (`bg-[#1E201F]`) for active segmented toggles, hovered items, and secondary containers
- **Deep Brand Emerald Surface**: `#041B10` (`bg-[#041B10]`) with hairline border `rgba(62, 207, 142, 0.30)` (`border-[#3ECF8E]/30`) and subtle inset illumination `shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]`
- **Primary Accent**: Exact Supabase Green `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`), hover variant `#34B27B`, deep button text `#041B10`
- **Typography**:
  - Headings / Titles: Manrope (`font-heading`, weights 700 / 800, tracking `-0.02em`)
  - Body Text: Inter (`font-sans`, calibrated weight `450`, text color `#A0A0A0` / `#EDEDED`)
  - Telemetry / Numeric Displays / Code: JetBrains Mono / Source Code Pro (`font-mono`, `tabular-nums`, tracking `0.06em` - `0.08em`)
- **Primitive Integration**:
  - `<Button variant="primary">` with `#3ECF8E` solid fill, `#041B10` font-semibold text, inset top sheen, active scale `0.97`
  - `<Badge tone="emerald" dot pulse>` with uppercase tracking, hairline border, `#041B10` surface, `#3ECF8E` LED dot
  - `<Badge tone="neutral">` with `#171717` surface, hairline border `rgba(255, 255, 255, 0.10)`
  - `<IconOrb tone="emerald">` with subtle emerald back-illumination
- **Elimination Targets**:
  - Remove `<HudCorners />` and legacy cyan corner brackets
  - Remove `shadow-broadcast` (legacy glowing drop shadow)
  - Remove heavy ambient neon blobs (`w-[600px] h-[500px] blur-[140px]`), replacing with restrained Supabase radial atmosphere (`opacity-[0.06] - opacity-[0.08]`)
  - Strictly preserve 0 `<Pill />` eyebrows, 0 `tagline:` properties, and 0 `Stat subtext` props

---

## 2. Component 1: `AppExperienceShowcase.tsx`

### 2.1 Component Overview & Purpose
`AppExperienceShowcase` is the 2-column mobile application showcase (`id="app-showcase"`). On the left, it presents 3 sequential narrative chapters (`/01 Match Credentials`, `/02 AI Scoreboard`, `/03 Dual-Vault Escrow`). On the right, it features an interactive 3D CSS smartphone mockup rendered with 3-axis rotation that smoothly responds both to desktop mouse wheel scrubbing via GSAP ScrollTrigger and to manual tab clicks (`Lobby`, `Scanner`, `Wallet`).

### 2.2 Legacy HUD vs. Supabase Token Mapping

| UI Element | Current Legacy Implementation | Proposed Supabase Redesign | Rationale |
|---|---|---|---|
| Section Wrapper | `bg-bg-1 border-b border-line` | `bg-[#121212] border-b border-white/[0.08]` | Matches canonical Supabase dark canvas `#121212` and hairline border. |
| Ambient Glow | `bg-accent/[0.06] blur-[140px]` | `bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)] blur-[120px]` | Soft, non-distracting developer atmosphere. |
| Section Headline | `Engineered For <span className="text-accent">Esports</span>` | `text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading` with `text-[#3ECF8E]` | High-contrast display typography. |
| Left Chapter Cards (Inactive) | `bg-white/[0.015] border-white/[0.07] opacity-60` | `rounded-card bg-[#171717] border border-white/[0.08] hover:border-white/20 hover:bg-[#1E201F] transition-all duration-200 opacity-65 hover:opacity-100 p-6 sm:p-7 cursor-pointer` | Elevates inactive cards into clean Supabase carbon surfaces without layout shift. |
| Left Chapter Cards (Active) | `bg-bg-2/80 border-[#3ECF8E]/40 shadow-[0_18px_40px_-18px_rgba(62,207,142,0.35)...]` + `<HudCorners />` | `rounded-card bg-[#171717] border border-[#3ECF8E]/35 shadow-[0_18px_40px_-18px_rgba(62,207,142,0.18),inset_0_1px_0_rgba(62,207,142,0.15)] p-6 sm:p-7 relative overflow-hidden` (REMOVE `<HudCorners />`) | Eliminates legacy corner brackets; applies Supabase illuminated hairline top sheen and soft elevation. |
| Chapter Number | `text-xs font-mono font-bold tracking-widest tabular-nums` | Active: `text-[#3ECF8E]`, Inactive: `text-[#707070]` | Clean monospace accent with pulsing emerald dot for active state. |
| Screen Switcher Tabs Container | `rounded-control bg-bg-2/80 backdrop-blur-xl border border-white/[0.08] mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]` | `flex items-center gap-1.5 p-1 rounded-control bg-[#171717] border border-white/[0.08] mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]` | Supabase segmented control toolbar. |
| Switcher Tab Button (Active) | `bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(62,207,142,0.55)] ring-1 ring-[#3ECF8E]/30` | `bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_3px_rgba(62,207,142,0.35)] min-h-[40px] px-3.5 py-1.5 rounded-control text-xs font-mono uppercase tracking-wider` | Tactile Supabase solid green button token with high-contrast text. |
| Switcher Tab Button (Inactive) | `text-text-2 hover:bg-white/[0.04] hover:text-text-1` | `text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F] min-h-[40px] px-3.5 py-1.5 rounded-control text-xs font-mono uppercase tracking-wider transition-colors` | Supabase muted hover state. |
| 3D Phone Outer Frame | `bg-gradient-to-b from-[#262826] via-[#1a1b1a] to-[#121212] border-2 border-white/[0.12] shadow-broadcast` | `bg-gradient-to-b from-[#222423] via-[#171817] to-[#121212] border border-white/[0.12] ring-1 ring-white/[0.06] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85),0_0_32px_-8px_rgba(62,207,142,0.12)] rounded-[44px] p-3` | Eliminates cyan neon `shadow-broadcast`; introduces authentic titanium dark bezel. |
| Inner OLED Screen Canvas | `rounded-[36px] bg-bg-0 border border-white/[0.07] ring-1 ring-inset ring-[#3ECF8E]/15` | `rounded-[36px] bg-[#0E0F0E] overflow-hidden text-left relative flex flex-col justify-between min-h-[560px] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` | Deep black OLED simulation with 1px top hairline sheen. |
| In-App Header | `bg-accent-dim border border-line-accent` | Avatar in `bg-[#041B10] border border-[#3ECF8E]/30 text-[#3ECF8E]`, Grandmaster rank with image `/ranks/grandmaster.webp?v=s4`, balance `1,450 AX`, uppercase `Verified` in `text-[#3ECF8E]` | Complete Supabase color tokens. |
| Screen Card (Lobby) | `bg-bg-2/80 border border-white/[0.08]` | `rounded-card bg-[#171717] border border-white/[0.08] p-3.5` with `<Badge tone="emerald" dot pulse>` | Dark carbon card with hairline border. |
| Credentials Box (Lobby) | `bg-bg-2/80 border border-[#3ECF8E]/25 shadow-[inset_0_0_24px_-16px...]` | `rounded-card bg-[#171717] border border-[#3ECF8E]/30 p-3.5 space-y-2 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]` | Supabase brand bordered card. |
| Credentials Data Pill | `bg-bg-1 border border-white/[0.08]` | `rounded-control bg-[#121212] border border-white/[0.08] p-2.5 font-mono text-xs text-[#EDEDED]` | Clean monospace container. |
| Copy Button | `text-[#3ECF8E] hover:text-[#4CD99B]` | `text-[#3ECF8E] hover:text-[#34B27B] cursor-pointer p-3.5 -m-3.5 transition-colors` with `title="Copy credentials"` and `aria-label="Copy room credentials"` | Supabase hover green `#34B27B`. |
| Screen Card (Scanner) | `bg-bg-2/80 border border-[#3ECF8E]/25` | `rounded-card bg-[#171717] border border-[#3ECF8E]/30 p-3.5 space-y-1.5 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)] font-mono text-xs` with `border-b border-white/[0.08]` row dividers | Code block / telemetry table styling. |
| Screen Cards (Wallet) | `Play Wallet` (`Entry Vault`) & `Winning Wallet` (`Withdrawable`) | Play Wallet: `bg-[#171717] border border-white/[0.08]`; Winning Wallet: `bg-[#171717] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]` | Two-vault visual contrast with `<Badge tone="neutral">` and `<Badge tone="emerald">`. |
| Phone Action CTA | `<Button variant="primary" size="sm" fullWidth>` | Preserved `<Button variant="primary" size="sm" fullWidth onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}>Join Scrim in App</Button>` | Uses redesigned Supabase Button primitive. |

### 2.3 Strict Invariant & Test Checklist
The worker implementing this component MUST strictly verify every item in this checklist:
- [ ] Section ID: `id="app-showcase"` preserved on `<section>`.
- [ ] Heading: `Engineered For` and `Esports` preserved.
- [ ] 3 Chapters preserved verbatim:
  - `id: 'match'`, `num: '01'`, `title: 'Match Credentials'`, description string intact.
  - `id: 'ocr'`, `num: '02'`, `title: 'AI Scoreboard'`, description string intact.
  - `id: 'wallet'`, `num: '03'`, `title: 'Dual-Vault Escrow'`, description string intact.
- [ ] 3D Phone Transform Invariants (strictly asserted by `tests/challenger-m2-2-adversarial.test.ts`):
  - `match: { rotY: -18, rotX: 6, transZ: 0 }`
  - `ocr: { rotY: -2, rotX: 1, transZ: 35 }`
  - `wallet: { rotY: 14, rotX: -4, transZ: 0 }`
  - `window.innerWidth >= 1024`
  - `mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)'`
  - `return () => ctx.revert()`
  - `return () => pinTrigger.kill()`
- [ ] Clipboard Interaction:
  - `navigator.clipboard?.writeText('Room ID: 884921 | Password: arena77')`
  - `setCopiedRoomId(true)`
  - `setTimeout(() => setCopiedRoomId(false), 2500)`
  - `aria-label="Copy room credentials"`
  - `title="Copy credentials"`
- [ ] In-App Mockup Copy Invariants:
  - `09:41`, `5G`, `AX_Sniper`, `Grandmaster`, `1,450 AX`, `Verified`
  - `Bermuda Championship #402`, `21:00 PKT`, `Entry: 50 AX`, `Prize: 2,160 AX`, `Slot #12 Locked`, `UID 94829104`
  - `AI Scoreboard`, `#1 (+20 PTS)`, `14 (+70 PTS)`, `90 PTS Total`, `Heroic Tier I`, `Latency: 1.2s`, `Certified`
  - `Play Wallet`, `Entry Vault`, `500 AX`
  - `Winning Wallet`, `Withdrawable`, `950 AX`, `(PKR 950)`
  - `Fund Security`, `PIN Enabled`
  - `Join Scrim in App`
- [ ] Zero `<Pill />` eyebrows, zero `tagline:` declarations, zero `<Stat ... subtext=` props.

---

## 3. Component 2: `TournamentModes.tsx`

### 3.1 Component Overview & Purpose
`TournamentModes` (`id="tournaments"`) showcases the two primary competitive gameplay modes of ArenaX: **Bermuda 48-Player Survival** (Classic Battle Royale) and **Clash Squad 4v4 Tournament Brackets**. It includes a mode switcher, detailed match specifications, and an interactive 3D specular tilt card that computes 3-axis mouse offsets and projects dynamic radial lighting reflections.

### 3.2 Legacy HUD vs. Supabase Token Mapping

| UI Element | Current Legacy Implementation | Proposed Supabase Redesign | Rationale |
|---|---|---|---|
| Section Wrapper | `bg-bg-1 border-b border-line` | `bg-[#121212] border-b border-white/[0.08]` | Supabase canonical dark canvas. |
| Ambient Glow | `ambient-glow -top-24 right-[6%] h-[460px] w-[460px] opacity-70` | `bg-[radial-gradient(ellipse_at_top_right,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-[100px]` | Eliminates bright cyan glow; uses subtle emerald atmosphere. |
| Section Headline | `Battle for the <span className="text-accent">Booyah</span>` | `text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading` with `text-[#3ECF8E]` | High-contrast headline. |
| Mode Switcher Bar | `rounded-control bg-bg-2/80 backdrop-blur-xl border border-white/[0.08] mt-8 max-w-md gap-1` | `flex p-1 rounded-control bg-[#171717] border border-white/[0.08] mt-8 max-w-md gap-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]` | Supabase segmented toolbar card. |
| Mode Tab Button (Active) | `bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(62,207,142,0.55)] ring-1 ring-[#3ECF8E]/30` | `bg-[#3ECF8E] text-[#041B10] font-semibold shadow-[0_1px_3px_rgba(62,207,142,0.35)] ring-1 ring-[#3ECF8E]/30 min-h-[44px] py-2.5 px-4 rounded-control text-xs font-mono uppercase tracking-wider` | Tactile Supabase solid green button token. |
| Mode Tab Button (Inactive) | `text-text-2 hover:bg-white/[0.04] hover:text-text-1` | `text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F] min-h-[44px] py-2.5 px-4 rounded-control text-xs font-mono uppercase tracking-wider transition-colors` | Supabase muted hover state. |
| Feature Rule Rows | `divide-y divide-line border-y border-line` | `divide-y divide-white/[0.08] border-y border-white/[0.08]` with `CheckCircle2` in `text-[#3ECF8E]` and text in `text-sm font-medium text-[#EDEDED]` | Precision hairline dividers. |
| 3D Specular Tilt Card | `hud-card p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-[#3ECF8E]/40 hover:shadow-lift-strong` + `<HudCorners />` | `rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-7 space-y-5 relative overflow-hidden group hover:border-[#3ECF8E]/40 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]` (REMOVE `<HudCorners />`) | Replaces legacy HUD corners with Supabase clean carbon surface and top hairline gradient highlight. |
| Dynamic Specular Sheen | `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(62, 207, 142, 0.15), transparent 70%)` | `radial-gradient(circle 280px at ${cardTilt.px}% ${cardTilt.py}%, rgba(62, 207, 142, 0.12), transparent 70%)` | Interactive mouse-driven illumination with Supabase emerald token. |
| Sub-format / Stage Selector | `bg-bg-1/80 border border-white/[0.08]` | `grid grid-cols-3 gap-1.5 p-1 bg-[#121212] rounded-control border border-white/[0.08]` | Clean carbon inset segmented control. |
| Sub-format Button (Active) | `bg-accent text-bg-1 shadow-[0_0_18px_-6px_rgba(62,207,142,0.55)]` | `bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)] rounded-control text-xs font-mono uppercase` | Active state contrast. |
| Sub-format Button (Inactive) | `text-text-2 hover:bg-white/[0.04]` | `text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F] rounded-control text-xs font-mono uppercase transition-colors` | Inactive state contrast. |
| Match Data Grid Cards (Standard: Slots, Roster, Entry) | `p-3 rounded-control bg-bg-1/70 border border-white/[0.08]` | `p-3 rounded-control bg-[#121212] border border-white/[0.08] font-mono text-xs tabular-nums` | Monospace label `#707070` and value in `#EDEDED` or `#3ECF8E`. |
| Prize Pool Grid Card | `bg-[#3ECF8E]/[0.08] border border-[#3ECF8E]/25` | `p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)] font-mono text-xs tabular-nums` | Supabase brand surface for prize highlight. |
| Room Capacity Indicator | `p-3.5 rounded-control glass-panel space-y-1.5` | `p-3.5 rounded-control bg-[#121212] border border-white/[0.08] space-y-1.5 font-mono text-xs tabular-nums` | Carbon panel with `<Badge tone="emerald" dot pulse>44 / 48 (91%)</Badge>` and progress track `bg-[#1E201F]` with fill `bg-[#3ECF8E]`. |
| Clash Squad Matchup Visual | Team 1 (`bg-[#3ECF8E]/[0.05]`) vs Team 2 (`bg-bg-1/70`) | Team 1: `bg-[#041B10] border border-[#3ECF8E]/25` with left accent bar `bg-[#3ECF8E]`; Team 2: `bg-[#121212] border border-white/[0.08]` | Visual hierarchy emphasizing winning seed. |

### 3.3 Mathematical Invariants & Platform Rake
All numerical data in `TournamentModes` adheres to the strict **10.0% platform rake invariant**:
- **Bermuda Solo**: 48 players × 50 AX entry = 2,400 AX gross. Prize Pool = 2,160 AX Cash. Rake = 240 AX (10.0%).
- **Bermuda Duo**: 24 teams × 100 AX entry = 2,400 AX gross. Prize Pool = 2,160 AX Cash. Rake = 240 AX (10.0%).
- **Bermuda Squad**: 12 squads × 200 AX entry = 2,400 AX gross. Prize Pool = 2,160 AX Cash. Rake = 240 AX (10.0%).
- **Clash Squad 4v4**: 8 squads × 400 AX entry = 3,200 AX gross. Prize Pool = 2,880 AX Cash. Rake = 320 AX (10.0%).

### 3.4 3D Specular Tilt Math Invariants
The tilt calculation and guard must be preserved verbatim:
```ts
const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (window.innerWidth < 1024) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
  const px = Math.round(((e.clientX - rect.left) / rect.width) * 100);
  const py = Math.round(((e.clientY - rect.top) / rect.height) * 100);
  setCardTilt({ x, y, px, py });
};

const handleCardMouseLeave = () => {
  setCardTilt({ x: 0, y: 0, px: 50, py: 50 });
};
```
- Tilt angles strictly confined to `[-3, 3] degrees`
- Bounding center calculates neutral `x = 0, y = 0, px = 50, py = 50`
- Mobile viewport guard `if (window.innerWidth < 1024) return;` prevents performance degradation on touch devices.

---

## 4. Component 3: `AIVisionShowcase.tsx`

### 4.1 Component Overview & Purpose
`AIVisionShowcase` (`id="ai-vision"`) is the technical cornerstone of the platform. It demonstrates automated optical character recognition (OCR) and anti-tamper scoreboard verification. It features:
1. A 3D perspective simulated Free Fire scoreboard with an animated continuous vertical scanline
2. A verified telemetry extraction panel with live confidence percentage animation (88.0% ➔ 99.4%)
3. An interactive Combat Points Calculator with Booyah/Defeat placement segmented toggle, 0–20 kill range slider, and dynamic rank promotion output.

### 4.2 Legacy HUD vs. Supabase Token Mapping

| UI Element | Current Legacy Implementation | Proposed Supabase Redesign | Rationale |
|---|---|---|---|
| Section Wrapper | `bg-bg-0 border-b border-line` | `bg-[#121212] border-b border-white/[0.08]` | Supabase canonical dark canvas. |
| Section Headline | `Zero <span className="text-accent">Disputes</span>` | `text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading` with `text-[#3ECF8E]` | High-contrast headline. |
| Scoreboard Display Container | `rounded-card bg-gradient-to-b from-bg-2/80 via-bg-2/70 to-bg-0/80 backdrop-blur-xl border border-white/[0.08] shadow-broadcast` + `<HudCorners />` | `rounded-card bg-[#171717] border border-white/[0.08] p-5 sm:p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden preserve-3d` (REMOVE `<HudCorners />`) | Eliminates legacy corner brackets and cyan drop shadow; introduces terminal-grade Supabase card framing. |
| Scanline Sweep Line | `h-1 bg-gradient-to-r from-transparent via-accent to-transparent` | `h-0.5 bg-gradient-to-r from-transparent via-[#3ECF8E] to-transparent shadow-[0_0_8px_rgba(62,207,142,0.8)]` | Sharp 2px emerald laser scanline. |
| Scoreboard Player Row 1 (Matched) | `bg-[#3ECF8E]/[0.05] border border-[#3ECF8E]/25 shadow-[inset_0_0_24px_-14px...]` | `p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 relative shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]` | Deep emerald surface `#041B10` with `#3ECF8E` badge `UID MATCHED`. |
| Scoreboard Rows 2 & 3 | `bg-bg-1/70 border border-white/[0.07]` | `p-2.5 rounded-control bg-[#121212] border border-white/[0.07] text-[#A0A0A0]` | Clean carbon inset rows. |
| Security Footer | `border-t border-line text-[11px] font-mono text-text-2` | `pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]` with `ShieldCheck` icon, `SHA-256 INTEGRITY` and `VERIFIED` in `text-[#3ECF8E]` | Monospace cryptographic validation footer. |
| Telemetry Panel Container | `hud-card p-6 sm:p-8 space-y-4` | `rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-8 space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` | Clean Supabase card surface. |
| Telemetry Rows | `telemetry-row flex justify-between py-2 border-b border-line` | `telemetry-row flex justify-between py-2 border-b border-white/[0.08] font-mono text-xs tabular-nums` | Retains `.telemetry-row` class for GSAP stagger animation; hairline dividers. |
| Credited to Wallet Box | `bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 shadow-[inset_0_0_24px_-14px...]` | `p-3 rounded-control bg-[#041B10] border border-[#3ECF8E]/30 flex items-center gap-2 text-[#3ECF8E] font-bold text-xs shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]` | Supabase deep emerald callout box. |
| Calculator Container | `hud-card p-6 sm:p-8 rounded-card max-w-4xl mx-auto` | `rounded-card bg-[#171717] border border-white/[0.08] p-6 sm:p-8 max-w-4xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` | Supabase card framing. |
| Placement Toggle Container | `grid grid-cols-2 gap-2 p-1 bg-bg-1/80 rounded-control border border-white/[0.08]` | `grid grid-cols-2 gap-2 p-1 bg-[#121212] rounded-control border border-white/[0.08]` | Dark carbon segmented container. |
| Placement Button (Active) | `bg-accent text-bg-1 shadow-[0_0_20px_-6px_rgba(62,207,142,0.55)] ring-1 ring-[#3ECF8E]/30` | `bg-[#3ECF8E] text-[#041B10] font-semibold ring-1 ring-[#3ECF8E]/30 shadow-[0_1px_2px_rgba(0,0,0,0.24)] min-h-[40px] py-2 px-3 rounded-control text-xs font-mono uppercase` | Active state. |
| Placement Button (Inactive) | `text-text-2 hover:text-text-1` | `text-[#A0A0A0] hover:text-[#EDEDED] hover:bg-[#1E201F] min-h-[40px] py-2 px-3 rounded-control text-xs font-mono uppercase transition-colors` | Inactive state. |
| Kill Slider | `bg-bg-1 accent-accent` | `w-full h-2 bg-[#121212] rounded-full appearance-none cursor-pointer accent-[#3ECF8E] border border-white/[0.08]` | Supabase green slider thumb. |
| Output Card (Calculated) | `bg-gradient-to-b from-bg-1 to-bg-0 border border-[#3ECF8E]/20` + `<HudCorners />` | `relative overflow-hidden p-5 rounded-card bg-[#121212] border border-[#3ECF8E]/30 space-y-4 shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]` (REMOVE `<HudCorners />`) | Eliminates HUD corners; applies deep carbon surface with emerald hairline border. |
| Rank Progress Bar | `bg-bg-3 h-2 rounded-full` track with `bg-accent` fill | Track: `w-full bg-[#1E201F] h-2 rounded-full overflow-hidden border border-white/[0.06]`; Fill: `bg-[#3ECF8E] h-full transition-all duration-300 shadow-[0_0_8px_rgba(62,207,142,0.4)]` | Clean bar with dynamic width `${tier.percent}%`. |

### 4.3 Mathematical Scoring & Boundary Invariants
The scoring formula and tier boundaries are strictly asserted by automated test suites (`tests/functional-invariants.test.ts`, `tests/challenger-m3-1.test.ts`, `tests/challenger-m3-2.test.ts`):
1. **Combat Score Formula**:
   ```ts
   const totalPoints = (isBooyah ? 20 : 0) + kills * 5;
   ```
   - 0 kills, defeat = `0 PTS`
   - 0 kills, Booyah = `20 PTS`
   - 20 kills, defeat = `100 PTS`
   - 20 kills, Booyah = `120 PTS`
2. **Tier Thresholds**:
   ```ts
   const getTier = (pts: number) => {
     if (pts >= 60) return { name: 'Grandmaster Contender', percent: 100, badge: '/ranks/grandmaster.webp?v=s4' };
     if (pts >= 40) return { name: 'Heroic Tier', percent: 75, badge: '/ranks/heroic.webp?v=s4' };
     if (pts >= 25) return { name: 'Diamond Tier', percent: 50, badge: '/ranks/diamond.webp?v=s4' };
     return { name: 'Gold Tier', percent: 25, badge: '/ranks/gold.webp?v=s4' };
   };
   ```
   - `>= 60 PTS`: `Grandmaster Contender` (100%)
   - `40–59 PTS`: `Heroic Tier` (75%)
   - `25–39 PTS`: `Diamond Tier` (50%)
   - `< 25 PTS`: `Gold Tier` (25%)
3. **Prohibited Strings Audit** (MUST NOT be introduced):
   - ❌ `Players upload the scoreboard. AI reads it. Winners get paid.`
   - ❌ `OCR STATUS: ACTIVE`
   - ❌ `BOUNDING BOX: UID MATCHED`
   - ❌ `Anti-Photoshop Verification / SHA-256 Passed`
   - ❌ `{confidence}% AI CONFIDENCE`
   - ❌ `1 Booyah = 20 PTS • 1 Kill = 5 PTS`
   - ❌ `Kills (5 PTS Each)`
   - ❌ `Calculated Rating`
   - ❌ `Projected Tier`
   - ❌ `<Pill />`
   - ❌ `<Stat ... subtext=`

---

## 5. Implementation Guide for Worker

### Step 1: `AppExperienceShowcase.tsx`
- Replace legacy HUD classes (`hud-card`, `HudCorners`, `shadow-broadcast`, cyan ambient blooms) with Supabase tokens (`bg-[#121212]`, `bg-[#171717]`, `border-white/[0.08]`, `bg-[#041B10]`, `text-[#3ECF8E]`).
- Ensure all 3 chapters and interactive copyable room credentials function identically.
- Ensure GSAP ScrollTrigger matchMedia context and cleanup are preserved verbatim.

### Step 2: `TournamentModes.tsx`
- Replace `hud-card`, `HudCorners`, and legacy glows with Supabase carbon card surfaces (`bg-[#171717]`, `border-white/[0.08]`).
- Preserve the 3D specular mouse tilt math and `< 1024px` guard.
- Verify 10% platform rake invariant values across Bermuda (Solo, Duo, Squad) and Clash Squad (Quarters, Semis, Finals).

### Step 3: `AIVisionShowcase.tsx`
- Replace `hud-card` and `HudCorners` with Supabase terminal/code card styling.
- Keep `.telemetry-row` class on rows for GSAP stagger animation.
- Preserve verbatim formula `(isBooyah ? 20 : 0) + kills * 5` and `getTier` thresholds (60, 40, 25).
- Ensure no prohibited legacy marketing copy is reintroduced.

### Step 4: Verification
Execute:
```powershell
npm test
```
Confirm all 4 verification steps pass with 0 errors:
1. TypeScript Typecheck
2. ESLint Code Analysis
3. Vite Production Build
4. Automated Test Suites (Tiers 1–5 & R1/R3)
