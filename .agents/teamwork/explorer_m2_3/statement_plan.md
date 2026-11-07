# Blueprint: Statement Section Redesign (`src/components/Statement.tsx`)

**Milestone**: Milestone 2 — Global Chrome, Navigation & Hero Showcase (Statement Section Redesign)  
**Author**: Explorer M2-3 (Teamwork Explorer)  
**Target File**: `src/components/Statement.tsx`  
**Status**: Ready for Implementation by Specialist M2-3  
**Design Reference**: Supabase Design System (`Supabase _ The Postgres Development Platform.html` read-only spec)  

---

## 1. Executive Summary & Design Vision

The Statement section serves as the full-bleed high-contrast editorial declaration of ArenaX's core platform guarantees, positioned immediately below the Hero section and preceding the 3D App Experience showcase (`src/components/AppExperienceShowcase.tsx`).

The goal of this redesign is to elevate `src/components/Statement.tsx` from its current functional baseline into a showcase of Supabase editorial craft:
1. **Supabase Typography Hierarchy**: Commanding display typography in **`Manrope`** (`font-heading`, 800 weight), calibrated with optical tracking (`tracking-tight` / `-0.025em`) and tight line height (`leading-[1.06]`), providing majestic editorial authority across screen sizes from mobile to ultra-wide desktop.
2. **Word-by-Word Scroll-Scrubbed Reveal**: Smooth word-by-word opacity transition powered by GSAP ScrollTrigger (`stagger: 0.08`, `scrub: 0.6`), scrubbed from initial baseline (`opacity-25`) to pure luminous high-contrast (`opacity-100`, `#EDEDED`), synchronized with Lenis smooth scrolling.
3. **Accessibility Hardening (`prefers-reduced-motion`)**: Adding a dedicated `(prefers-reduced-motion: reduce)` handler to instantly clamp statement words to 100% opacity, eliminating the low-contrast `opacity-25` trap for users who disable animations.
4. **Dark Carbon Surfaces & Micro-Interactions**: Hover transitions utilizing Supabase canonical card surface `#171717` (`bg-surface-card/40`) with subtle negative horizontal margin expansion (`-mx-4 sm:-mx-8 px-4 sm:px-8 rounded-xl`), an active brand green hairline glow (`via-[#3ECF8E]/40`), and tactile monospace numeral micro-translation (`group-hover:translate-x-1`).
5. **Hairline Gradient Architecture**: Replacing flat boundary lines with Supabase precision hairline gradient dividers (`.divider-gradient`), ensuring seamless section transitions between the Hero's curved carbon base and the mobile client showcase.
6. **Strict Content & Test Invariant Preservation**: 100% verbatim preservation of all 4 editorial statements without loss, additions, or modifications, satisfying all test assertions across all 14 test suites in `tests/`.

---

## 2. Forensic Audit & Invariant Inventory

### 2.1 Current File Analysis (`src/components/Statement.tsx`)
- **Lines 1-5**: GSAP and `ScrollTrigger` registration.
- **Lines 7-24**: `STATEMENTS` data array containing exactly 4 objects:
  - `num: '01'`, `line: 'AI vision verifies scoreboards in seconds.'`
  - `num: '02'`, `line: 'Cash out in 24 hours.'`
  - `num: '03'`, `line: 'Money kept in two separate wallets.'`
  - `num: '04'`, `line: 'Cheaters banned for life.'`
- **Lines 26-53**: `useLayoutEffect` hook creating a `gsap.context()`, querying `[data-statement-row]` and `.statement-word`, scrubbing opacity with `stagger: 0.08`, `scrub: 0.6`, `trigger: row`, `start: 'top 85%'`, `end: 'top 45%'`.
- **Lines 55-99**: JSX markup rendering `<section id="statement" ...>`, mapping `STATEMENTS` into rows with `/{item.num}` and split words.

### 2.2 Test Suite Contracts & Invariant Checklist

| Test Suite | Asserted Pattern / Condition | Compliance Strategy |
|---|---|---|
| `tests/challenger-m2-adversarial.test.ts:169-174` | Must contain `"num: '01'"`, `"num: '02'"`, `"num: '03'"`, `"num: '04'"` | Retained verbatim in `STATEMENTS` array |
| `tests/challenger-m2-adversarial.test.ts:176-180` | `statementSrc.includes('AI vision verifies scoreboards in seconds.')` | Retained verbatim in statement 01 |
| `tests/challenger-m2-adversarial.test.ts:183-190` | Exact string matches:<br>• `gsap.registerPlugin(ScrollTrigger);`<br>• `gsap.context(`<br>• `return () => ctx.revert();`<br>• `trigger: row`<br>• `scrub: 0.6`<br>• `stagger: 0.08` | Maintained with exact string parity |
| `tests/challenger-m2-adversarial.test.ts:192-195` | Exact string matches:<br>• `item.line.split(' ').map(`<br>• `statement-word` | Maintained with exact string parity |
| `tests/challenger-m2-adversarial.test.ts:213-222` | Must NOT contain:<br>• `<Pill`<br>• `PLATFORM PROTOCOL`<br>• `statement-detail`<br>• `detail:`<br>• Old explanatory paragraphs | Zero marketing copy, pills, or detail fields |
| `tests/layout-copy-verification.test.ts:89` | Scans `Statement.tsx`; asserts zero R1 violations (0 pills, 0 subtext props, 0 taglines, 0 footnotes) | Zero violations |
| `tests/tier1-feature-coverage.test.ts:131-135` | Must define `STATEMENTS` array, use `gsap` or `ScrollTrigger`, and include `01`, `02`, `03`, `04` | Fully satisfied |
| `tests/tier3-cross-feature.test.ts:154-160` | Cross-references `AI` or `Vision` in `Statement.tsx` with `AIVisionShowcase` | Statement 01 retains "AI vision" |
| `tests/supabase-tokens-and-invariants.test.ts:192-198` | Verbatim preservation of all 4 editorial protocol statements | All 4 copy strings preserved 100% verbatim |

---

## 3. Detailed Supabase Design Token Specification

### 3.1 Surfaces & Atmospheric Background
- **Section Canvas**: `bg-bg-1` / `bg-surface-canvas` (`#121212`).
- **Row Hover Surface**: `hover:bg-[#171717]/40` (`hover:bg-surface-card/40`), providing the authentic Supabase dark carbon card depth (`#171717`).
- **Volumetric Depth**: An ultra-faint radial glow centered behind the editorial text:
  ```tsx
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.025] rounded-full blur-[160px]" />
  </div>
  ```
  This provides soft optical grounding without conflicting with foreground text contrast.

### 3.2 Hairline Architecture
- **Boundary Separators**:
  - Top transition: `<div className="divider-gradient" aria-hidden="true" />` (1px gradient from transparent to `rgba(255, 255, 255, 0.08)` to transparent).
  - Bottom transition: `<div className="divider-gradient" aria-hidden="true" />` or section `border-b border-line`.
- **Row Hover Highlight**:
  Top hairline accent that illuminates dynamically on row hover:
  ```tsx
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  />
  ```
- **Row Separation**:
  Subtle hairline borders between rows using `divide-y divide-line` (`rgba(255, 255, 255, 0.08)`).

### 3.3 Typography Hierarchy & Display Craft
- **Font Stack**: `font-heading` (`Manrope`, 'Outfit', sans-serif) for statement text; `font-mono` (`Source Code Pro`, `JetBrains Mono`) for editorial index numerals.
- **Scale**: `text-3xl sm:text-5xl md:text-6xl lg:text-7xl` — commanding display scale.
- **Tracking & Leading**:
  - `tracking-tight sm:tracking-[-0.03em]`
  - `leading-[1.06]`
- **Word Spacing**:
  - `mr-2.5 sm:mr-3.5 md:mr-4`
- **Word Reveal Opacity States**:
  - Default (unscrubbed): `opacity-25` (required by adversarial contract and providing legible ghostly preview).
  - Scrubbed (active): `opacity: 1` animated via GSAP.
  - Text Color: `text-text-1` / `text-foreground` (`#EDEDED`).

### 3.4 Monospace Index Counter (`/{item.num}`)
- **Font**: `font-mono tabular-nums`.
- **Scale**: `text-sm sm:text-base md:text-lg lg:text-xl font-bold`.
- **Color**: Supabase Brand Green `#3ECF8E` (`text-accent`).
- **Hover Micro-Interaction**:
  - Color shift: `group-hover:text-[#4CD99B]` / `group-hover:text-accent-hover` (`#34B27B`).
  - Tactile nudge: `group-hover:translate-x-1`.
  - Transition: `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Vertical Alignment**:
  - Aligned cleanly to baseline with headline: `pt-1.5 sm:pt-2 md:pt-3 flex-shrink-0 select-none`.

---

## 4. Animation & Accessibility Hardening

### 4.1 GSAP ScrollTrigger Integration
The scroll trigger configuration uses `gsap.context()` inside `useLayoutEffect`, scoped to `statementRef`:
```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // Standard motion: Scrub word opacities based on row scroll position
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

    // Reduced motion accessibility guard: Clamp all words immediately to 100% opacity
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const words = statementRef.current?.querySelectorAll('.statement-word');
      if (words) {
        gsap.set(words, { opacity: 1 });
      }
    });
  }, statementRef);

  return () => ctx.revert();
}, []);
```

### 4.2 Accessibility Benefits
1. **WCAG AAA Compliance**: When users activate system-level reduced motion, words do not stay stranded at low-contrast `opacity-25`. They are immediately visible at 100% opacity (`#EDEDED`), ensuring maximum legibility without motion sickness.
2. **Zero Defect Teardown**: `ctx.revert()` cleanly removes all ScrollTrigger listeners and matchMedia instances when unmounting, preventing memory leaks and scroll glitches during SPA navigation.

---

## 5. Complete Drop-In Proposed Implementation

The following complete drop-in implementation for `src/components/Statement.tsx` satisfies all visual, structural, and test invariants:

```tsx
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export const Statement = () => {
  const statementRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Scrubbed word reveals for standard motion
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

      // Reduced-motion accessibility fallback: Immediately reveal all words at full opacity
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const words = statementRef.current?.querySelectorAll('.statement-word');
        if (words) {
          gsap.set(words, { opacity: 1 });
        }
      });
    }, statementRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={statementRef}
      id="statement"
      className="relative z-20 py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line overflow-hidden"
      aria-label="ArenaX Platform Statement"
    >
      {/* Top Hairline Gradient Divider */}
      <div className="divider-gradient absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Volumetric Dark Carbon Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.025] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* 4 Numbered Editorial Rows */}
        <div className="space-y-0 divide-y divide-line">
          {STATEMENTS.map((item, index) => (
            <div
              key={item.num}
              data-statement-row={index}
              className="group relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#171717]/40 flex items-baseline gap-6 sm:gap-10 md:gap-14"
            >
              {/* Dynamic Emerald Hairline Top Accent on Hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Mono Index Number with Supabase Accent and Micro-Nudge */}
              <span className="font-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent tracking-[0.14em] tabular-nums select-none flex-shrink-0 pt-1.5 sm:pt-2 md:pt-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#4CD99B]">
                /{item.num}
              </span>

              {/* High-Contrast Scrubbed Statement Words in Manrope Display Hierarchy */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-1 font-heading tracking-tight sm:tracking-[-0.03em] leading-[1.06] max-w-5xl">
                {item.line.split(' ').map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="statement-word inline-block mr-2.5 sm:mr-3.5 md:mr-4 opacity-25 transition-opacity"
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;
```

---

## 6. Implementation Verification Plan

### 6.1 Automated Verification Commands
Run the full verification suite after implementing the component:
```bash
npm test
```
This triggers `scripts/run-all-tests.ts`, running:
1. TypeScript Typecheck (`tsc --noEmit`)
2. ESLint Code Analysis (`eslint .`)
3. Vite Production Build (`vite build`)
4. Node.js Native Test Suites (Tiers 1–5, Adversarial Suites, and Layout-Copy Verification)

### 6.2 Specific Invariants Validated
1. **Adversarial Invariants**:
   - `tests/challenger-m2-adversarial.test.ts` lines 166-224 pass with 0 errors.
   - All 6 exact GSAP strings matched.
   - `item.line.split(' ').map(` and `statement-word` matched.
   - All 8 negative checks (no `<Pill`, no `PLATFORM PROTOCOL`, no `statement-detail`, etc.) pass.
2. **Copy Preservation (Requirement R3)**:
   - All 4 statements preserved verbatim, passing `tests/supabase-tokens-and-invariants.test.ts:192-198`.
   - AI vision cross-feature link passing `tests/tier3-cross-feature.test.ts:154-160`.
3. **Reference File Immutability (Requirement R1)**:
   - `Supabase _ The Postgres Development Platform.html` hash and folder size remain untouched.
