# Milestone 3 Exploration Report: WalletSection.tsx Financial Architecture & Redesign

**Agent**: `explorer_m3_2`  
**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m3_2\`  
**Target Component**: `src/components/WalletSection.tsx`  
**Date**: 2026-11-05  

---

## 1. Observation

### 1.1 Direct Source Code Inspection (`src/components/WalletSection.tsx`)
From viewing `src/components/WalletSection.tsx` (211 lines) and analyzing git commit history (`bd37ac4`):

1. **Header Copy & Eyebrow**:
   - Original git HEAD included:
     ```tsx
     <Pill dot={true} label="FINANCIAL ARCHITECTURE" />
     <div className="flex items-center gap-3 sm:gap-4 mt-4">
       <IconOrb icon={ShieldCheck} tone="emerald" size="lg" className="hidden sm:inline-flex" />
       <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading">
         Two-Vault <span className="text-accent">Security</span>
       </h2>
     </div>
     <p className="text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed">
       Tournament entry balances are strictly isolated from verified prize money, guaranteeing 1 AX = 1 PKR parity.
     </p>
     ```
   - In working copy, `<Pill dot={true} label="FINANCIAL ARCHITECTURE" />` was stripped, but the subtitle paragraph remains at lines 67-69.

2. **Flow Container Tagline**:
   - Original git HEAD included:
     ```tsx
     <span className="text-xs font-mono font-bold uppercase text-accent tracking-widest block mb-6">
       CAPITAL FLOW LIFECYCLE
     </span>
     ```
   - Located at top of `flowContainerRef` (line 75 in git HEAD).

3. **Lifecycle Flow Nodes**:
   - Declared at lines 11-17:
     ```tsx
     const FLOW_NODES = [
       { step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' },
       { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' },
       { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' },
       { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' },
       { step: '05', title: 'Cashout', sub: '< 24h Direct' },
     ];
     ```
   - Rendered at lines 85-106 as 5 glass-panel boxes connected by a GSAP-scrubbed animated horizontal line (`scaleX` 0 to 1).

4. **Play Wallet (Vault 01) Content**:
   - Original git HEAD contained:
     - Eyebrow tag: `VAULT 01` (`text-xs font-mono text-text-3 uppercase tracking-wider block`)
     - Subtitle under title: `Entry Registration Balance`
     - Badge: `Non-Withdrawable` (`bg-bg-3 text-text-2 border border-line`)
     - Paragraph: `"Holds funds deposited via JazzCash or EasyPaisa and starter bonuses. Used strictly to register for Bermuda Battle Royale and Clash Squad scrims."`
     - Three bullet points with `CheckCircle2` icons:
       - `"Instant registration deduction with 0% surcharge."`
       - `"100% automated refund to Play Wallet if match cancelled."`
       - `"P2P coin transfer between squadmates."`
     - Footnotes: `"Min Deposit: PKR 50"` and `"Protected Escrow"`.
     - Direct action buttons: None.

5. **Winning Wallet (Vault 02) Content**:
   - Original git HEAD contained:
     - Eyebrow tag: `VAULT 02 (PRIZE ESCROW)` (`text-xs font-mono text-accent uppercase tracking-wider block`)
     - Sub-label under title: `1 AX Coin = 1 PKR Cash`
     - Badge: `100% Withdrawable` (`bg-accent-dim text-accent border border-line-accent`)
     - Paragraph: `"Holds tournament cash prizes, milestone bonuses, and scout royalties. Every coin represents 1 PKR with guaranteed payout within 24 hours."`
     - Three bullet points with `CheckCircle2` icons:
       - `"Direct cashout to JazzCash, EasyPaisa, or Pakistani banks."`
       - `"Secondary 6-digit fund security password required."`
       - `"Minimum cashout threshold: 100 AX Coins (PKR 100)."`
     - Badges / Footnotes: `Payout SLA: < 24 Hours` and `Zero Hidden Commissions`.
     - Direct action buttons: None.

### 1.2 Test Suite Analysis & Exact Invariants
Searches across `tests/` revealed the following exact test assertions:

1. **`tests/tier1-feature-coverage.test.ts` (lines 172-180)**:
   ```ts
   describe('F10: Two-Vault Financial Architecture (WalletSection.tsx)', () => {
     const src = readComponentSource('WalletSection.tsx');

     it('defines 5-stage lifecycle flow and 1:1 AX to PKR parity', () => {
       assert.ok(src.includes('FLOW_NODES'), 'Wallet must declare FLOW_NODES');
       assert.ok(src.includes('Play Wallet') && src.includes('Winning Wallet'));
       assert.ok(src.includes('1 AX = 1 PKR') || src.includes('1 AX = 1 PKR Cash Parity'));
     });
   });
   ```

2. **`tests/tier3-cross-feature.test.ts` (lines 94-103 & 130-136)**:
   ```ts
   describe('Economic Model Consistency (1 AX = 1 PKR & 10% Platform Rake)', () => {
     it('maintains strict 1 AX = 1 PKR cash parity across financial and reward components', () => {
       const walletSrc = readSrcFile('components/WalletSection.tsx');
       ...
       assert.ok(
         walletSrc.includes('1 AX = 1 PKR') || walletSrc.includes('1:1'),
         'WalletSection must state 1 AX = 1 PKR cash parity'
       );
     });

     it('consistently isolates Play Wallet and Winning Wallet across AppExperienceShowcase and WalletSection', () => {
       const appShowcaseSrc = readSrcFile('components/AppExperienceShowcase.tsx');
       const walletSrc = readSrcFile('components/WalletSection.tsx');

       assert.ok(appShowcaseSrc.includes('Play Wallet') && appShowcaseSrc.includes('Winning Wallet'));
       assert.ok(walletSrc.includes('Play Wallet') && walletSrc.includes('Winning Wallet'));
     });
   });
   ```

3. **`tests/challenger-m2-adversarial.test.ts` (lines 155-163)**:
   ```ts
   it('verifies target IDs from Hero actually exist in downstream components', () => {
     ...
     assert.ok(walletSrc.includes('id="wallet"'), 'WalletSection must have id="wallet"');
   });
   ```

4. **`tests/tier5-adversarial-hardening.test.ts` (lines 114-129)**:
   ```ts
   const expectedAnchors = ['tournaments', 'ai-vision', 'wallet', 'ranks', 'organizers', 'how-it-works', 'download'];
   for (const anchor of expectedAnchors) {
     const idPattern = new RegExp(`id=["']${anchor}["']`);
     assert.ok(idPattern.test(combinedSource));
   }
   ```

5. **`tests/layout-copy-verification.test.ts` (lines 19-58)**:
   - Scans for `<Pill\b[^>]*\/>` on section headers.
   - Scans for `subtext=` passed to `<Stat />`.
   - Scans for `tagline:` declarations.
   - Explicitly flags forbidden footnote regexes, including:
     - Line 43: `/Protected\s+Escrow/i`
     - Line 44: `/Zero\s+Hidden\s+Commissions/i`

---

## 2. Logic Chain

### 2.1 Audit of Existing Copy Against Requirement R1
1. **Pill Eyebrow (`<Pill label="FINANCIAL ARCHITECTURE" />`)**:
   - *Observation*: Section 1.1 Item 1, Section 1.2 Item 5.
   - *Reasoning*: `layout-copy-verification.test.ts` flags `<Pill />` elements in components. In Linear & Apple Notes design systems, section headings stand on their own without eyebrow pills. Removing this element eliminates an R1 violation without impacting any test.

2. **Tagline `CAPITAL FLOW LIFECYCLE`**:
   - *Observation*: Section 1.1 Item 2, Section 1.2 Item 5.
   - *Reasoning*: The uppercase banner adds decorative noise. The 5-stage numbered horizontal pipeline (`/01` to `/05`) visually indicates the flow lifecycle on its own. Removing the tagline complies with R1.

3. **Conversational Narrative Paragraphs & Bullet Lists**:
   - *Observation*: Section 1.1 Items 1, 4, 5.
   - *Reasoning*:
     - The subtitle paragraph ("Tournament entry balances are strictly isolated...") and card paragraphs ("Holds funds deposited via...", "Holds tournament cash prizes...") are conversational narrative text.
     - The bullet points ("Instant registration deduction...", "100% automated refund...", "Direct cashout...") are multi-word sentences that clutter the card surface.
     - Replacing these sentences with a structured 2x2 data spec grid (e.g. `Min Deposit: PKR 50`, `Surcharge: 0%`, `Cancellation: 100% Refund`, `Squad Transfer: Instant P2P`) transforms conversational clutter into high-density technical telemetry matching Linear and Apple Notes.

4. **Forbidden Footnotes**:
   - *Observation*: Section 1.1 Items 4, 5, Section 1.2 Item 5.
   - *Reasoning*: `Protected Escrow` and `Zero Hidden Commissions` are matched by regex in `layout-copy-verification.test.ts` lines 43-44. They must remain completely absent from the component to maintain zero violations.

### 2.2 Preservation of Critical Invariants (R3)
1. **`FLOW_NODES` Identifier & Contents**:
   - *Observation*: Section 1.2 Item 1.
   - *Reasoning*: `FLOW_NODES` must remain declared with 5 steps (`01` through `05`). Keeping `Play Wallet` in node `02`, `Winning Wallet` in node `04`, and `1 AX = 1 PKR` in node `04` sub-text directly satisfies `assert.ok(src.includes('FLOW_NODES'))`, `assert.ok(src.includes('Play Wallet') && src.includes('Winning Wallet'))`, and `assert.ok(src.includes('1 AX = 1 PKR'))`.

2. **Parity String**:
   - *Observation*: Section 1.2 Items 1 & 2.
   - *Reasoning*: Both `tier1-feature-coverage.test.ts` and `tier3-cross-feature.test.ts` test `walletSrc.includes('1 AX = 1 PKR')`. In addition to node `04`, the redesigned header telemetry badge and Winning Wallet valuation block will explicitly declare `1 AX = 1 PKR Cash Parity`, ensuring multiple resilient matches.

3. **Section Anchor**:
   - *Observation*: Section 1.2 Items 3 & 4.
   - *Reasoning*: The outer section must retain `id="wallet"`.

### 2.3 Linear & Apple Notes Layout Redesign Architecture
1. **Header Layout**:
   - Left: `IconOrb` (ShieldCheck, emerald) + `h2` ("Two-Vault Security").
   - Right: Clean technical telemetry badge: `<Badge tone="emerald" dot pulse>1 AX = 1 PKR Cash Parity</Badge>`.
   - Zero conversational subtitles.

2. **5-Step Horizontal Flow Pipeline**:
   - Background card: `rounded-card bg-bg-2/70 backdrop-blur-sm border border-line p-6 sm:p-8 relative`.
   - Centerline animated fill: GSAP ScrollTrigger animating `scaleX` from `0` to `1` across `lineRef` with emerald glow shadow.
   - 5 Node chips (`grid-cols-1 sm:grid-cols-5 gap-4`):
     - Step indicator: `/<node.step>` in monospace emerald (`text-accent font-mono text-[10px] font-bold`).
     - Node title: `font-heading font-bold text-text-1 text-sm`.
     - Sub-metric: `font-mono text-text-3 text-xs tabular-nums`.
     - Directional arrow: `ArrowRight` (hidden on mobile, visible on `sm:block`).

3. **Dual-Depth Vault Panels**:
   - **Play Wallet (Recessed Base Card)**:
     - Container: `hud-card relative p-6 sm:p-8 rounded-card flex flex-col justify-between`.
     - Header: `IconOrb` (Wallet) + Title (`Play Wallet`) + Status Badge (`<Badge tone="neutral">Non-Withdrawable</Badge>`).
     - Telemetry Spec Grid: 4 compact spec boxes:
       - `Min Deposit: PKR 50`
       - `Surcharge: 0% Instant`
       - `Cancellation: 100% Refund`
       - `Squad Transfer: Instant P2P`
     - Direct Action Trigger: `<Button variant="secondary" size="md" fullWidth onClick={scrollToDownload}>Deposit</Button>`.
   - **Winning Wallet (Highlighted Elevated Card)**:
     - Container: `hud-card-highlight relative p-6 sm:p-8 rounded-card flex flex-col justify-between hover:shadow-lift-strong`.
     - HUD accents: `<HudCorners tone="emerald" size="md" />`.
     - Header: `IconOrb` (ShieldCheck) + Title (`Winning Wallet`) + Status Badge (`<Badge tone="emerald" dot>100% Withdrawable</Badge>`).
     - Valuation Callout: High-contrast emerald block: `1 AX = 1 PKR Cash`.
     - Telemetry Spec Grid: 4 compact spec boxes:
       - `Payout SLA: < 24 Hours`
       - `Min Threshold: 100 AX`
       - `Disbursement: JazzCash / EasyPaisa`
       - `Security: 6-Digit PIN`
     - Direct Action Trigger: `<Button variant="primary" size="md" fullWidth onClick={scrollToDownload}>Cashout</Button>`.

---

## 3. Caveats

1. **Working Tree Uncommitted Changes**:
   - The working directory already contained partial removals (e.g. removal of `<Pill />` and `Zero Hidden Commissions`). The proposed implementation refines and completes the transformation cleanly.
2. **Action Handlers**:
   - Direct action triggers (`Deposit` and `Cashout` buttons) route smoothly to `#download` via `scrollToDownload()`, which is standard across the marketing site since financial operations happen within the native Android client.
3. **No Code Written**:
   - In accordance with read-only explorer instructions, no production files were edited.

---

## 4. Conclusion & Proposed Implementation

The proposed redesign fully satisfies Requirement R1 (zero taglines, zero conversational paragraphs, zero helper copy, zero forbidden footnote regexes) and Requirement R2/R3 (elevated Linear/Apple Notes UX, direct action triggers, and 100% preservation of all test invariants).

### Proposed Replacement Code for `src/components/WalletSection.tsx`:

```tsx
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Badge } from './primitives/Badge';
import { Button } from './primitives/Button';
import { HudCorners } from './primitives/HudCorners';
import { IconOrb } from './primitives/IconOrb';

gsap.registerPlugin(ScrollTrigger);

const FLOW_NODES = [
  { step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' },
  { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' },
  { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' },
  { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' },
  { step: '05', title: 'Cashout', sub: '< 24h Direct' },
];

export const WalletSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const flowContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (lineRef.current && flowContainerRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: flowContainerRef.current,
                start: 'top 80%',
                end: 'bottom 50%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="wallet"
      className="py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden"
      aria-label="Two-Vault Financial Security"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <IconOrb icon={ShieldCheck} tone="emerald" size="lg" className="hidden sm:inline-flex" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-text-1 font-heading">
              Two-Vault <span className="text-accent">Security</span>
            </h2>
          </div>
          <Badge tone="emerald" dot pulse className="self-start sm:self-auto">
            1 AX = 1 PKR Cash Parity
          </Badge>
        </div>

        {/* ======================================================== */}
        {/* HORIZONTAL FLOW DIAGRAM WITH LINE-DRAW ON SCROLL        */}
        {/* ======================================================== */}
        <div ref={flowContainerRef} className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-card bg-bg-2/70 backdrop-blur-sm border border-line relative">
          {/* Glowing Animated Connector Line */}
          <div className="hidden sm:block absolute top-[50%] left-8 right-8 h-[2px] bg-line pointer-events-none z-0">
            <div
              ref={lineRef}
              className="h-full bg-accent shadow-[0_0_12px_rgba(0,200,120,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {FLOW_NODES.map((node, i) => (
              <div key={node.step} className="flex flex-col relative">
                {/* Node Box */}
                <div className="glass-panel group p-4 rounded-control flex flex-col justify-between h-full transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-accent tracking-tight tabular-nums">/{node.step}</span>
                    {i < FLOW_NODES.length - 1 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 text-text-3 hidden sm:block transition-colors group-hover:text-accent"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-1 block font-heading">{node.title}</span>
                    <span className="text-xs text-text-3 font-mono tracking-tight tabular-nums">{node.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* TWO PANELS AT DIFFERENT DEPTHS                           */}
        {/* Play Wallet (base card) & Winning Wallet (highlighted)   */}
        {/* ======================================================== */}
        <div className="relative">
          <div aria-hidden="true" className="ambient-glow -left-16 top-0 h-72 w-72" />
          <div aria-hidden="true" className="ambient-glow -right-12 bottom-0 h-80 w-80" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Panel 1: Play Wallet (Base Card, Entry Escrow) */}
            <div className="hud-card relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-line mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={Wallet} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-text-1">Play Wallet</h3>
                  </div>
                  <Badge tone="neutral">Non-Withdrawable</Badge>
                </div>

                {/* Structured Telemetry Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Min Deposit</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">PKR 50</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Surcharge</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">0% Instant</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Cancellation</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">100% Refund</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Squad Transfer</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">Instant P2P</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
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
            <div className="hud-card-highlight relative p-6 sm:p-8 rounded-card flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift-strong">
              <HudCorners tone="emerald" size="md" />
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-line mb-6">
                  <div className="flex items-center gap-3">
                    <IconOrb icon={ShieldCheck} tone="emerald" size="sm" />
                    <h3 className="text-2xl font-bold font-heading text-text-1">Winning Wallet</h3>
                  </div>
                  <Badge tone="emerald" dot>100% Withdrawable</Badge>
                </div>

                {/* Cash Parity Callout */}
                <div className="flex items-center justify-between p-3 rounded-control bg-accent-dim/40 border border-line-accent/40 mb-4">
                  <span className="text-xs font-mono text-text-2 uppercase tracking-wide">Cash Valuation</span>
                  <span className="text-sm font-mono font-bold text-accent tracking-tight tabular-nums">1 AX = 1 PKR Cash</span>
                </div>

                {/* Structured Telemetry Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Payout SLA</span>
                    <span className="text-base font-mono font-bold text-accent tabular-nums mt-1 block">&lt; 24 Hours</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Min Threshold</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">100 AX</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Disbursement</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">JazzCash / EasyPaisa</span>
                  </div>
                  <div className="p-3 rounded-control bg-bg-1/60 border border-line">
                    <span className="text-[10px] font-mono uppercase text-text-3 block tracking-wider">Security</span>
                    <span className="text-base font-mono font-bold text-text-1 tabular-nums mt-1 block">6-Digit PIN</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
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
      </div>
    </section>
  );
};

export default WalletSection;
```

---

## 5. Verification Method

### 5.1 Verification Commands
Execute the following verification command to confirm type checking, linting, production build, and all 5 tiers of automated tests:
```powershell
npm test
```

### 5.2 Specific Test Assertions to Inspect
1. `tests/tier1-feature-coverage.test.ts:172-180`:
   - Checks presence of `FLOW_NODES`, `Play Wallet`, `Winning Wallet`, and `1 AX = 1 PKR`.
2. `tests/tier3-cross-feature.test.ts:94-103 & 130-136`:
   - Checks `1 AX = 1 PKR` and cross-component consistency between `AppExperienceShowcase` and `WalletSection`.
3. `tests/challenger-m2-adversarial.test.ts:155-163`:
   - Checks `id="wallet"`.
4. `tests/layout-copy-verification.test.ts`:
   - Confirms zero violations for `<Pill />`, `subtext=`, `tagline:`, `Protected Escrow`, and `Zero Hidden Commissions`.

### 5.3 Invalidation Conditions
- Removing the declaration `const FLOW_NODES = [...]` invalidates Tier 1.
- Removing the string `'1 AX = 1 PKR'` invalidates Tiers 1 and 3.
- Removing either `'Play Wallet'` or `'Winning Wallet'` invalidates Tiers 1 and 3.
- Changing `id="wallet"` invalidates M2 challenger tests and Tier 5.
- Re-introducing regex-flagged phrases like `Protected Escrow` or `Zero Hidden Commissions` invalidates `layout-copy-verification.test.ts`.
