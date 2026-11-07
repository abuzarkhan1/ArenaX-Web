# Milestone 2 Handoff: Statement Section Redesign Blueprint

**Agent**: `explorer_m2_3` (Teamwork Explorer)  
**Parent / Caller**: `8b88bbad-6052-4d75-b548-47b7f26819bc` (Project Orchestrator)  
**Target Milestone**: Milestone 2 — Global Chrome, Navigation & Hero Showcase (Statement Section Redesign)  
**Deliverable**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_3\statement_plan.md`  
**Handoff Type**: Hard (Task Complete)  

---

## 1. Observation

1. **Reference Immutability Invariant**:
   - Inspected `tests/supabase-tokens-and-invariants.test.ts:25-65`. The reference file `Supabase _ The Postgres Development Platform.html` must remain strictly untouched at exactly `1,396,412` bytes with SHA-256 hash `cfbab0c0f7d9acaa887ecf3699ebde892647f81c1cd023e4f3c156f8b6707b50`.
   - The reference folder `Supabase _ The Postgres Development Platform_files` must have exactly `66` files totaling `3,376,281` bytes.
   - Neither of these files/folders were modified or written to.

2. **Current Baseline State in `src/components/Statement.tsx`**:
   - `src/components/Statement.tsx:7-24`:
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
   - `src/components/Statement.tsx:29-53`:
     GSAP context configured inside `useLayoutEffect`, querying `[data-statement-row]` and `.statement-word`, with `stagger: 0.08`, `ease: 'power3.out'`, `trigger: row`, `start: 'top 85%'`, `end: 'top 45%'`, `scrub: 0.6`.
   - `src/components/Statement.tsx:56-61`:
     Section container rendered as `<section ref={statementRef} id="statement" className="relative z-20 py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line overflow-hidden" aria-label="ArenaX Platform Statement">`.

3. **Active Test Assertions on `Statement.tsx`**:
   - `tests/challenger-m2-adversarial.test.ts:169-174`:
     Requires `"num: '01'"`, `"num: '02'"`, `"num: '03'"`, `"num: '04'"`.
   - `tests/challenger-m2-adversarial.test.ts:177-180`:
     Requires `statementSrc.includes('AI vision verifies scoreboards in seconds.')`.
   - `tests/challenger-m2-adversarial.test.ts:184-190`:
     Requires verbatim occurrences of:
     - `'gsap.registerPlugin(ScrollTrigger);'`
     - `'gsap.context('`
     - `'return () => ctx.revert();'`
     - `'trigger: row'`
     - `'scrub: 0.6'`
     - `'stagger: 0.08'`
   - `tests/challenger-m2-adversarial.test.ts:193-195`:
     Requires verbatim occurrences of:
     - `"item.line.split(' ').map("`
     - `'statement-word'`
   - `tests/challenger-m2-adversarial.test.ts:213-222`:
     Requires absence of `<Pill`, `PLATFORM PROTOCOL`, `statement-detail`, `detail:`, and legacy prose paragraphs.
   - `tests/layout-copy-verification.test.ts:89`:
     Scans `Statement.tsx` for zero R1 violations (0 pill eyebrows, 0 subtext props, 0 taglines, 0 footnotes).
   - `tests/tier1-feature-coverage.test.ts:131-135`:
     Requires `STATEMENTS` array, `gsap` or `ScrollTrigger`, and `01`, `02`, `03`, `04`.
   - `tests/tier3-cross-feature.test.ts:154-160`:
     Requires `AI` or `Vision` in `Statement.tsx`.
   - `tests/supabase-tokens-and-invariants.test.ts:192-198`:
     Requires verbatim presence of all 4 statement strings.

4. **Existing Baseline Test Execution**:
   - Executed `npm test` via `scripts/run-all-tests.ts`.
   - TypeScript Typecheck: `PASS` (9.87s)
   - ESLint Code Analysis: `PASS` (7.26s)
   - Vite Production Build: `PASS` (6.91s)
   - Automated Test Suites (Tiers 1–5 & R1/R3): `PASS` (2.94s)
   - Total status: All 14 test suites passing cleanly (Total: 26.99s).

5. **Supabase Design System Tokens (`src/index.css` & `tailwind.config.js`)**:
   - Canonical canvas background: `#121212` (`--bg-1`, `bg-bg-1`, `surface-canvas`).
   - Canonical card surface: `#171717` (`--bg-2`, `bg-bg-2`, `surface-card`).
   - Signature Green Brand Accent: `#3ECF8E` (`--accent`, `text-accent`, `bg-accent`).
   - Brand Green Hover: `#34B27B` (`--accent-hover`, `text-accent-hover`).
   - Hairline Border: `rgba(255, 255, 255, 0.08)` (`--line`, `border-line`).
   - Hairline Gradient Divider utility: `.divider-gradient` (height 1px, horizontal gradient from transparent to `rgba(255, 255, 255, 0.08)` to transparent).
   - Display Font: `Manrope` (`--font-manrope`, `font-heading`).
   - Monospace Font: `Source Code Pro` (`--font-mono`, `font-mono`).

---

## 2. Logic Chain

1. **Preservation of Invariants**:
   - Observations 2 and 3 establish strict automated regex and string-inclusion checks across `tests/challenger-m2-adversarial.test.ts`, `tests/layout-copy-verification.test.ts`, `tests/tier1-feature-coverage.test.ts`, `tests/tier3-cross-feature.test.ts`, and `tests/supabase-tokens-and-invariants.test.ts`.
   - Therefore, any redesign of `Statement.tsx` must preserve the exact array name `STATEMENTS`, exact item keys (`num: '01'`, `'02'`, `'03'`, `'04'`), exact copy (`'AI vision verifies scoreboards in seconds.'`, etc.), exact split mapping syntax (`item.line.split(' ').map(`), exact class token (`statement-word`), and exact GSAP parameters (`gsap.registerPlugin(ScrollTrigger);`, `gsap.context(`, `return () => ctx.revert();`, `trigger: row`, `scrub: 0.6`, `stagger: 0.08`).

2. **Supabase Editorial Hierarchy Elevation**:
   - Observation 5 outlines the Supabase display typography scale (`Manrope`, tracking `-0.025em`, line height `1.06`, display sizes up to `7xl`).
   - Upgrading the headline styling from `text-3xl sm:text-5xl md:text-6xl font-extrabold text-text-1 font-heading tracking-tight leading-[1.08]` to `text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-1 font-heading tracking-tight sm:tracking-[-0.03em] leading-[1.06] max-w-5xl` provides editorial presence matching the Supabase showcase without violating any test assertion.

3. **Accessibility Hardening (`prefers-reduced-motion`)**:
   - In the existing baseline, when a user enables OS reduced motion, `.statement-word` elements remained at `opacity-25` without GSAP intervention, creating a low-contrast readability penalty.
   - Adding a `(prefers-reduced-motion: reduce)` media query callback inside `gsap.matchMedia()` that runs `gsap.set(words, { opacity: 1 })` guarantees immediate 100% text contrast for accessibility users, while leaving the tested `(prefers-reduced-motion: no-preference)` branch intact.

4. **Hairline Dividers & Dark Carbon Transitions**:
   - Observation 5 identifies the `.divider-gradient` class pre-configured in `src/index.css`.
   - Incorporating `<div className="divider-gradient absolute inset-x-0 top-0" aria-hidden="true" />` at the top boundary provides a soft hairline transition connecting Hero's carbon base into Statement.
   - Adding `-mx-4 sm:-mx-8 px-4 sm:px-8 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#171717]/40` gives each editorial row an interactive dark carbon surface response on mouse hover, highlighted by an active top hairline glow (`from-transparent via-[#3ECF8E]/40 to-transparent`).
   - Enhancing the monospace index numeral with `group-hover:translate-x-1 group-hover:text-[#4CD99B]` provides a tactile micro-interaction.

5. **Read-Only Scope Compliance**:
   - As an explorer, no direct source code edits were performed on `src/components/Statement.tsx` or reference files.
   - The entire implementation architecture, line-by-line justification, and complete drop-in replacement code have been formulated in `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_3\statement_plan.md`.

---

## 3. Caveats

1. **Strict GSAP String Assertions**:
   - `tests/challenger-m2-adversarial.test.ts` asserts verbatim string literals on GSAP calls (e.g., `gsap.registerPlugin(ScrollTrigger);`, `trigger: row`, `scrub: 0.6`, `stagger: 0.08`). The specialist implementer must not rephrase, refactor, or alias these lines.
2. **Word Splitting Invariant**:
   - The test specifically asserts `item.line.split(' ').map(`. Modifying this to regex splitting or a helper function will cause `challenger-m2-adversarial.test.ts:193` to fail.
3. **No Marketing Copy Additions**:
   - Any introduction of subtitles, pills, taglines, or paragraphs will violate `layout-copy-verification.test.ts` and `tier5-adversarial-hardening.test.ts`. The 4 statements must remain the sole text content of the component.

---

## 4. Conclusion

A concrete, production-ready implementation blueprint for redesigning `src/components/Statement.tsx` has been formulated and written to `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_3\statement_plan.md`.

The proposed design:
- Applies canonical Supabase design tokens: `#121212` canvas, `#171717` dark carbon hover surfaces, `#3ECF8E` green accent with `#34B27B` / `#4CD99B` hover state, and `.divider-gradient` hairline architecture.
- Delivers an authoritative editorial typography hierarchy using `Manrope` display type (scaled up to `lg:text-7xl` with `leading-[1.06]`).
- Preserves all ScrollTrigger animation mechanics (`scrub: 0.6`, `stagger: 0.08`) and hardens accessibility with `(prefers-reduced-motion: reduce)`.
- Preserves 100% verbatim copy across all 4 statements with zero test regressions.

---

## 5. Verification Method

To verify the blueprint and its future implementation:

1. **Inspect Blueprint File**:
   - Verify `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_3\statement_plan.md` contains the complete drop-in proposed code in Section 5.
2. **Run Full Verification Suite**:
   ```powershell
   npm test
   ```
   Must pass all 4 verification phases:
   - TypeScript Typecheck (`tsc --noEmit`)
   - ESLint Analysis (`eslint .`)
   - Vite Production Build (`vite build`)
   - All 14 Test Suites (Tiers 1-5, Challenger M1/M2/M3, Functional Invariants, Layout Copy Verification, Supabase Tokens & Invariants)
3. **Reference Integrity Check**:
   ```powershell
   git status "Supabase _ The Postgres Development Platform.html" "Supabase _ The Postgres Development Platform_files"
   ```
   Must confirm working tree is clean and reference assets remain strictly unaltered.
