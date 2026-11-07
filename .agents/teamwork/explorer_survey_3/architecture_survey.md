# ArenaX-Web Architecture Survey: Styling, Theme, Fonts & Build Toolchain

**Survey Date**: 2026-11-07  
**Agent**: teamwork_explorer (`explorer_survey_3`)  
**Workspace**: `c:\Users\Muhammad Minhas\ArenaX-Web`  
**Target Reference**: `Supabase _ The Postgres Development Platform.html` (Strictly read-only)

---

## 1. Executive Summary & Baseline Status

ArenaX-Web is a Vite + React 18 + TypeScript SPA styled with Tailwind CSS 3.4.1 and PostCSS. The styling foundation is engineered with custom CSS variables and Tailwind utility extensions that mirror the Supabase dark theme design system (dark carbon surfaces `#121212` / `#171817` / `#0E0F0E`, signature green accent `#3ECF8E`, hairline white borders `rgba(255, 255, 255, 0.08)`, and typography using Inter, Manrope, and Source Code Pro).

### Baseline Verification Results

All baseline verification commands have been executed in the active workspace and passed with **zero errors**:

| Check | Command | Underlying Executable | Duration | Result |
|---|---|---|---|---|
| **Type Check** | `npm run typecheck` | `tsc --noEmit -p tsconfig.app.json` | ~11.5s | **PASS (0 errors)** |
| **Lint Check** | `npm run lint` | `eslint .` | ~9.4s | **PASS (0 errors)** |
| **Production Build** | `npm run build` | `vite build` | ~5.8s | **PASS (0 errors, 1514 modules)** |
| **Test Suite** | `npm test` / `npm run test:verify` | `node --experimental-strip-types scripts/run-all-tests.ts` | 30.95s | **PASS (All 13 test suites passed)** |

---

## 2. Styling & Theme System

### 2.1 File Configuration Map
- **Tailwind Configuration**: `tailwind.config.js` (ES module format)
- **PostCSS Configuration**: `postcss.config.js` (loads `tailwindcss` and `autoprefixer`)
- **Global Styles & Layer Rules**: `src/index.css` (imported by `src/main.tsx`)

### 2.2 Opacity-Aware Architecture (`withAlpha`)
In `tailwind.config.js`, an opacity-aware helper function bridges CSS variables and arbitrary opacity modifiers:
```javascript
const withAlpha = (variable, rgb) => ({ opacityValue }) =>
  opacityValue === undefined ? `var(${variable})` : `rgba(${rgb}, ${opacityValue})`;
```
This enables Tailwind utility classes such as `bg-bg-1/80`, `border-line/40`, and `bg-accent/10` to compile to valid RGBA syntax while preserving dynamic CSS custom property overrides at runtime.

### 2.3 Color Palette Breakdown

#### Dark Carbon Surfaces
| Token Name | Tailwind Utility | CSS Variable | RGB Base | Hex Equivalent | Role in UI |
|---|---|---|---|---|---|
| `bg-0` | `bg-bg-0` | `--bg-0` | `14, 15, 14` | `#0E0F0E` | Deepest ground: pinned scenes, footer base, scrollbar track |
| `bg-1` | `bg-bg-1` | `--bg-1` | `18, 18, 18` | `#121212` | Page canvas base: Supabase dark base |
| `bg-2` | `bg-bg-2` | `--bg-2` | `23, 24, 23` | `#171817` / `#171717` | Card & panel surfaces: Supabase surface-100 |
| `bg-3` | `bg-bg-3` | `--bg-3` | `32, 34, 32` | `#202220` | Raised cards, hover states, scrollbar thumb, surface-200 |

*Note on `#171717` vs `#171817`*:
In `src/index.css`, `--bg-2` is set to `#171817` with RGB `23, 24, 23`. In the Supabase reference tokens, surface-100 is canonically `#171717` (RGB `23, 23, 23`). Adding explicit alias support for `#171717` in `tailwind.config.js` (e.g. `surface: { 100: '#171717', 200: '#202220' }` or refining `--bg-2` to `#171717`) will ensure 100% mathematical token alignment without breaking existing components.

#### Accent & Emerald Palette
| Token Name | Tailwind Utility | CSS Variable / Value | Hex | Usage |
|---|---|---|---|---|
| `accent.DEFAULT` | `bg-accent`, `text-accent` | `--accent` / `62, 207, 142` | `#3ECF8E` | Signature Supabase emerald brand accent |
| `accent.hover` | `hover:bg-accent-hover` | `--accent-hover` / `52, 178, 123` | `#34B27B` | Primary button & interactive hover state |
| `accent.dim` | `bg-accent-dim` | `rgba(62, 207, 142, 0.12)` | - | Active nav background, badge pill backing |
| `line.accent` | `border-line-accent` | `--line-accent` / `62, 207, 142` | `rgba(62, 207, 142, 0.35)` | Emerald hairline card border highlight |
| `emerald.500` | `text-emerald-500` | `#3ECF8E` | `#3ECF8E` | Supabase canonical brand-500 stop |
| `emerald.600` | `text-emerald-600` | `#34B27B` | `#34B27B` | Brand-600 hover stop |
| `emerald.400` | `text-emerald-400` | `#4CD99B` | `#4CD99B` | Brand top highlight stop |

#### Text Hierarchy
| Token Name | Tailwind Utility | Variable | Value | Role |
|---|---|---|---|---|
| `text-1` | `text-text-1` | `--text-1` | `#EDEDED` | Primary headings, prominent body copy |
| `text-2` | `text-text-2` | `--text-2` | `#A0A0A0` | Secondary copy, descriptions, nav items |
| `text-3` | `text-text-3` | `--text-3` | `#707070` | Footers, labels, metadata (never below WCAG AA on `#121212`) |

#### Hairline Borders & Edge Architecture
Supabase's signature aesthetic relies on subtle 1px ("hairline") borders with subtle transparency:
- `--line`: `rgba(255, 255, 255, 0.08)` — Standard hairline card and container border.
- `--line-strong`: `rgba(255, 255, 255, 0.14)` — Elevated or active container border.
- `--line-accent`: `rgba(62, 207, 142, 0.35)` — Emerald-accented border.
- Utility `.hairline`: `@apply border border-white/[0.08];`
- Utility `.glass-panel`: `@apply border border-white/[0.08] bg-bg-2/70 backdrop-blur-xl; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);`
- Utility `.hud-card`:
  ```css
  background: linear-gradient(180deg, rgba(23, 24, 23, 0.90) 0%, rgba(16, 17, 16, 0.85) 100%);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 48px -20px rgba(0, 0, 0, 0.75);
  ```

#### Shadows & Illumination
- `shadow-broadcast`: `0 24px 60px -24px rgba(0, 0, 0, 0.75)`
- `shadow-lift`: `0 12px 24px -10px rgba(62, 207, 142, 0.18)`
- `shadow-lift-strong`: `0 18px 40px -14px rgba(62, 207, 142, 0.28)`
- `shadow-glow`: `0 0 0 1px rgba(62, 207, 142, 0.15), 0 12px 36px -12px rgba(62, 207, 142, 0.35)`
- `shadow-inner-line`: `inset 0 1px 0 0 rgba(255, 255, 255, 0.06)`

---

## 3. Fonts & Typography System

### 3.1 Current Font Loading Mechanism
ArenaX-Web currently utilizes a **dual font loading strategy**:
1. **Google Fonts Preload in `index.html` (Lines 13-15)**:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Source+Code+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
   ```
2. **Self-Hosted `@fontsource` Packages in `src/main.tsx` (Lines 6-12)**:
   ```typescript
   import '@fontsource/outfit/600.css';
   import '@fontsource/outfit/800.css';
   import '@fontsource/inter/400.css';
   import '@fontsource/inter/500.css';
   import '@fontsource/inter/600.css';
   import '@fontsource/jetbrains-mono/400.css';
   import '@fontsource/jetbrains-mono/500.css';
   ```

### 3.2 Font Family Stacks in `tailwind.config.js` & `src/index.css`
- **Sans (Body Text)**:
  `['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']`
  CSS Variable: `--font-inter`
- **Heading (Titles & Prominent Display)**:
  `['Manrope', 'Outfit', 'sans-serif']`
  CSS Variable: `--font-manrope`
- **Monospace (Code, Badges, Metrics, Timers)**:
  `['"Source Code Pro"', '"JetBrains Mono"', 'monospace']`
  CSS Variable: `--font-mono`

### 3.3 Supabase Reference Alignment
Analysis of the read-only reference CSS (`Supabase _ The Postgres Development Platform_files/768902fa471e0736.css`) reveals Supabase's exact internal font variable definitions:
```css
--font-sans: var(--font-inter), Inter, Helvetica Neue, Helvetica, ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-source-code-pro), "Source Code Pro", ui-monospace, Menlo, monospace;
--font-heading: var(--font-manrope, var(--font-sans));
--font-family-body: Inter;
```
The font configuration of ArenaX-Web (`Inter` for body, `Manrope` for headings, `Source Code Pro` / `JetBrains Mono` for monospace) is already **directly aligned** with the Supabase design system tokens.

### 3.4 Integration & Clean Configuration Recommendation
1. **Preserve Font Stacks**: Keep the existing font family stack in `tailwind.config.js`:
   - `font-sans`: Inter with system-ui fallbacks.
   - `font-heading`: Manrope with Outfit fallback.
   - `font-mono`: Source Code Pro with JetBrains Mono fallback.
2. **Typography Weights**:
   - `font-normal`: `400`
   - `font-medium`: `500`
   - `font-semibold`: `600`
   - `font-bold`: `700`
   - `font-extrabold`: `800`
3. **Avoid Disruption**: Do not remove `@fontsource/inter`, `@fontsource/jetbrains-mono`, or `@fontsource/outfit` imports from `src/main.tsx` as Vite bundles and optimizes them into offline woff2 assets during `vite build`.

---

## 4. Build, Test & Type-Check Toolchain

### 4.1 Toolchain Specification
- **Package Manager**: npm
- **Vite Version**: `8.3.5`
- **TypeScript Version**: `5.5.3` (Target: `ES2020`, Module: `ESNext`, ModuleResolution: `bundler`)
- **React Version**: `18.3.1`
- **ESLint Version**: `9.9.1` (Flat config format `eslint.config.js`)
- **Node Test Runner**: `node --test` with `--experimental-strip-types`

### 4.2 Scripts Registry (`package.json`)
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit -p tsconfig.app.json",
  "test": "node --experimental-strip-types scripts/run-all-tests.ts",
  "test:verify": "node --experimental-strip-types scripts/run-all-tests.ts",
  "test:unit": "node --test tests/functional-invariants.test.ts tests/layout-copy-verification.test.ts tests/tier1-feature-coverage.test.ts tests/tier2-boundary-corner-cases.test.ts tests/tier3-cross-feature.test.ts tests/tier4-real-world-scenarios.test.ts tests/tier5-adversarial-hardening.test.ts"
}
```

### 4.3 Baseline Execution Report

#### 1. Typecheck: `npm run typecheck`
- **Command**: `tsc --noEmit -p tsconfig.app.json`
- **Status**: PASSED (Exit code: 0)
- **Output**: Clean, 0 errors, 0 warnings.
- **Duration**: ~11.5s (includes full strict app compilation).

#### 2. ESLint: `npm run lint`
- **Command**: `eslint .`
- **Status**: PASSED (Exit code: 0)
- **Output**: Clean, 0 lint warnings or errors.
- **Duration**: ~9.4s.

#### 3. Production Build: `npm run build`
- **Command**: `vite build`
- **Status**: PASSED (Exit code: 0)
- **Output**:
  - `dist/index.html` (6.04 kB │ gzip: 1.78 kB)
  - `dist/assets/index-DhV7DD1e.css` (96.37 kB │ gzip: 26.74 kB)
  - `dist/assets/index-C126Q6Oj.js` (509.65 kB │ gzip: 153.03 kB)
  - All font assets transformed cleanly (`.woff2` and `.woff` chunks).
- **Duration**: ~5.8s.

#### 4. Unified Automated Verification Suite: `npm test`
- **Command**: `node --experimental-strip-types scripts/run-all-tests.ts`
- **Execution Pipeline**:
  1. `npm run typecheck` -> PASSED
  2. `npm run lint` -> PASSED
  3. `npm run build` -> PASSED
  4. Node Test Runner (13 suites):
     - `functional-invariants.test.ts`
     - `layout-copy-verification.test.ts` (with `STRICT_R1=true`)
     - `challenger-m1-adversarial.test.ts`
     - `challenger-m2-adversarial.test.ts`
     - `challenger-m2-2-adversarial.test.ts`
     - `challenger-m3-1.test.ts`
     - `challenger-m3-2.test.ts`
     - `mobile-drawer-overflow-bug.test.ts`
     - `tier1-feature-coverage.test.ts`
     - `tier2-boundary-corner-cases.test.ts`
     - `tier3-cross-feature.test.ts`
     - `tier4-real-world-scenarios.test.ts`
     - `tier5-adversarial-hardening.test.ts`
- **Overall Status**: `ALL CHECKS PASSED` (Total: 30.95s, Exit code: 0).

---

## 5. Verification Protocol for Requirement R4

For downstream agents and final verification, Requirement R4 ("Ensure the redesigned website compiles and builds cleanly without errors, maintaining code quality and type integrity") must be verified using the following exact commands in sequence:

```powershell
# 1. Verify TypeScript types
npm run typecheck

# 2. Verify ESLint rules
npm run lint

# 3. Verify Production build
npm run build

# 4. Verify Unified Verification Suite (Content preservation & functional invariants)
npm test
```

A change is verified **only when all four commands exit with code 0**.
