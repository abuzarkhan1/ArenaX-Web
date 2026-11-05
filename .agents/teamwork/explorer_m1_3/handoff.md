# Milestone 1 Investigation & Handoff Report: Navigation, Chrome & Primitives Polish

**Agent**: `explorer_m1_3`  
**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m1_3\`  
**Date**: 2026-11-05  
**Target Milestone**: Milestone 1 (Navigation, Chrome & Primitives Polish)  
**Assigned Implementer**: Milestone 1 Worker  

---

## 1. Observation

### 1.1 Baseline Project Health
- TypeScript typecheck (`npm run typecheck` via `tsc --noEmit -p tsconfig.app.json`): **0 errors (Exit code 0)**.
- ESLint lint check (`npm run lint` via `eslint .`): **0 errors, 0 warnings (Exit code 0)**.
- Production build (`npm run build` via `vite build`): **Success in 3.60s (Exit code 0)**.

---

### 1.2 Exhaustive Caller & Prop Inventory for `primitives/*`

`src/components/primitives/index.ts` re-exports 9 primitive components: `Button`, `Card`, `Pill`, `Badge`, `HudCorners`, `IconOrb`, `Stat`, `Container`, `Section`.

#### A. `Stat` (`src/components/primitives/Stat.tsx`)
- **Current Signature** (`src/components/primitives/Stat.tsx:3-8`):
  ```tsx
  export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
    value: React.ReactNode;
    label: string;
    subtext?: string;
    accent?: boolean;
  }
  ```
- **Callers in `src/`**: **0 callers**.
  - Grep search for `<Stat` and `from '.*Stat` across the entire workspace yielded zero consuming components.
  - No component in the project currently renders `<Stat>` or passes `subtext`.
- **Target Contract per `PROJECT.md:47`**:
  - `value: string | number`, `label: string`, `accent?: boolean`.
  - Remove `subtext?: string` prop to enforce R1 (zero taglines/helper copy).

#### B. `Badge` (`src/components/primitives/Badge.tsx`)
- **Current Signature** (`src/components/primitives/Badge.tsx:3-9`):
  ```tsx
  export type BadgeTone = 'emerald' | 'neutral' | 'danger';
  export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
    dot?: boolean;
    pulse?: boolean;
  }
  ```
- **Consuming Components (7 files)**:
  1. `src/components/AIVisionShowcase.tsx:161, 226`:
     - `<Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">`
     - `<Badge tone="emerald" dot className="tabular-nums">`
  2. `src/components/AppExperienceShowcase.tsx:252, 273, 339`:
     - `<Badge tone="emerald" dot pulse className="px-2 py-0 text-[9px]">`
     - `<Badge tone="emerald" dot className="px-2 py-0 text-[9px]">`
     - `<Badge tone="emerald" dot pulse className="px-3 py-1 text-[10px]">`
  3. `src/components/Download.tsx:75, 142`:
     - `<Badge tone="emerald" dot>`
     - `<Badge tone="neutral">Coming Soon</Badge>`
  4. `src/components/Hero.tsx:116, 189, 199`:
     - `<Badge tone="emerald" dot pulse className="...">`
     - `<Badge tone="emerald" className="px-2.5 py-1 tracking-[0.1em]">`
     - `<Badge tone="neutral" className="px-2.5 py-1 tracking-[0.1em]">`
  5. `src/components/Footer.tsx:34`:
     - `<Badge tone="emerald" dot pulse className="w-fit">PLATFORM OPERATIONAL 24/7</Badge>`
  6. `src/components/TournamentModes.tsx:196, 242, 348, 382, 396`:
     - `<Badge tone="emerald" dot pulse>`
     - `<Badge tone="emerald" dot>`
     - `<Badge tone="emerald" className="px-1.5 py-0 text-[9px]">`
     - `<Badge tone="neutral" className="px-1.5 py-0 text-[9px]">`
  7. `src/components/WalletSection.tsx:208`:
     - `<Badge tone="emerald" className="!normal-case !tracking-wide">`

#### C. `Button` (`src/components/primitives/Button.tsx`)
- **Current Signature** (`src/components/primitives/Button.tsx:3-13`):
  ```tsx
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'md' | 'lg' | 'sm';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    asAnchor?: boolean;
    href?: string;
    target?: string;
    rel?: string;
  }
  ```
- **Consuming Components (11 files)**:
  1. `src/components/About.tsx:126`: `<Button variant="primary" asAnchor href={downloadUrl} target="_blank" className="inline-flex">`
  2. `src/components/AppExperienceShowcase.tsx:379`: `<Button variant="primary" size="sm" fullWidth onClick={...}>`
  3. `src/components/Contact.tsx:237`: `<Button type="submit" variant="primary" fullWidth disabled={status === 'submitting'} icon={<Send ... />}>`
  4. `src/components/Download.tsx:97, 161`:
     - `<Button variant="primary" size="lg" fullWidth onClick={handleDownload} icon={<DownloadCloud ... />}>`
     - `<Button variant="secondary" size="lg" fullWidth disabled>`
  5. `src/components/FAQ.tsx:167, 176`:
     - `<Button variant="primary" size="md" asAnchor href="https://wa.me/..." target="_blank">`
     - `<Button variant="secondary" size="md" asAnchor href="mailto:...">`
  6. `src/components/Hero.tsx:265, 275`:
     - `<Button variant="primary" size="lg" onClick={handleDownload} icon={<DownloadCloud ... />} className="...">`
     - `<Button variant="secondary" size="lg" onClick={...} icon={<ChevronRight ... />} className="...">`
  7. `src/components/HowItWorks.tsx:194`: `<Button variant="primary" onClick={scrollToDownload} icon={<ArrowRight ... />}>`
  8. `src/components/Navbar.tsx:151, 232`:
     - `<Button variant="primary" size="sm" onClick={handleDownloadClick} icon={<DownloadCloud ... />} className="hidden sm:inline-flex">`
     - `<Button variant="primary" fullWidth onClick={handleDownloadClick} icon={<DownloadCloud ... />}>`
  9. `src/components/OrganizerProgram.tsx:219`: `<Button variant="primary" fullWidth onClick={scrollToDownload} icon={<ArrowRight ... />}>`
  10. `src/components/ScoutRewards.tsx:83`: `<Button variant="primary" size="md" onClick={scrollToDownload}>`
  11. `src/components/TournamentModes.tsx:153, 300`:
      - `<Button variant="primary" onClick={scrollToDownload} icon={<ArrowRight ... />}>`
      - `<Button variant="primary" onClick={scrollToDownload} icon={<ArrowRight ... />}>`

#### D. `Pill` (`src/components/primitives/Pill.tsx`)
- **Current Signature** (`src/components/primitives/Pill.tsx:3-8`):
  ```tsx
  export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
    dot?: boolean;
    dotPulse?: boolean;
    label?: string;
  }
  ```
- **Consuming Components (18 files — Every screen/section)**:
  `About.tsx:53`, `AppExperienceShowcase.tsx:106`, `AIVisionShowcase.tsx:118`, `Contact.tsx:83`, `Download.tsx:47`, `FAQ.tsx:80`, `FairPlay.tsx:27`, `HowItWorks.tsx:130`, `LeaderboardTiers.tsx:86`, `OrganizerProgram.tsx:58`, `PlatformComparison.tsx:48`, `Privacy.tsx:27`, `RefundPolicy.tsx:27`, `ScoutRewards.tsx:20`, `Statement.tsx:89`, `Terms.tsx:27`, `TournamentModes.tsx:71`, `WalletSection.tsx:62`.
- **Usage Pattern**: All 18 consumers pass `dot={true}` and `label="SECTION TITLE"`.

#### E. `Card` (`src/components/primitives/Card.tsx`)
- **Current Signature** (`src/components/primitives/Card.tsx:3-8`):
  ```tsx
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'base' | 'highlighted';
    interactive?: boolean;
    as?: React.ElementType;
  }
  ```
- **Consuming Components**: **0 callers** in `src/`. Sections currently render raw `div` tags styled with `.hud-card` and `.hud-card-highlight`.

#### F. `HudCorners` (`src/components/primitives/HudCorners.tsx`)
- **Current Signature** (`src/components/primitives/HudCorners.tsx:3-7`):
  ```tsx
  export interface HudCornersProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: 'emerald' | 'neutral';
    size?: 'sm' | 'md';
    inset?: boolean;
  }
  ```
- **Consuming Components (12 files)**:
  `About.tsx:64, 101, 121`, `AppExperienceShowcase.tsx:134`, `AIVisionShowcase.tsx:145, 348`, `Contact.tsx:143`, `Download.tsx:65`, `FAQ.tsx:111, 158`, `FairPlay.tsx:38`, `Hero.tsx:115`, `HowItWorks.tsx:171`, `LeaderboardTiers.tsx:155`, `OrganizerProgram.tsx:100`, `PlatformComparison.tsx:66, 119`, `Privacy.tsx:38`, `RefundPolicy.tsx:38`, `ScoutRewards.tsx:35`, `Terms.tsx:38`, `TournamentModes.tsx:173, 320`, `WalletSection.tsx:169`.
- **Props Used**: `tone` ('emerald' | 'neutral'), `size` ('sm' | 'md'), `inset`, `className`.

#### G. `IconOrb` (`src/components/primitives/IconOrb.tsx`)
- **Current Signature** (`src/components/primitives/IconOrb.tsx:6-10`):
  ```tsx
  export interface IconOrbProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
    tone?: IconOrbTone; // 'emerald' | 'neutral' | 'danger'
    size?: IconOrbSize; // 'sm' | 'md' | 'lg'
  }
  ```
- **Consuming Components (12 files, 32 call sites)**:
  `About.tsx:108`, `AIVisionShowcase.tsx:221, 271`, `AppExperienceShowcase.tsx:304`, `Contact.tsx:97, 113, 131`, `Download.tsx:69, 136`, `FAQ.tsx:160`, `FairPlay.tsx:26`, `Footer.tsx:110, 124, 138`, `Hero.tsx:289, 301, 313`, `HowItWorks.tsx:173`, `LeaderboardTiers.tsx:253`, `OrganizerProgram.tsx:75, 103`, `Privacy.tsx:26`, `RefundPolicy.tsx:26`, `ScoutRewards.tsx:38, 93, 107, 115, 123`, `Terms.tsx:26`, `TournamentModes.tsx:188`, `WalletSection.tsx:64, 127, 173`.

#### H. `Container` & `Section` (`src/components/primitives/Container.tsx`, `Section.tsx`)
- **Consuming Components**: **0 callers**. Screens currently use `<div className="max-w-[1200px] mx-auto px-6">` and `<section className="...">`.

---

### 1.3 `Navbar`, `Footer`, `WhatsAppButton` Integration in `src/App.tsx`

`src/App.tsx:85-106` mounts the layout shell:
```tsx
<div className="min-h-screen bg-bg-1 text-text-1">
  <SmoothScroll />
  <Navbar />
  <main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/fair-play" element={<FairPlay />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </main>
  <Footer />
  <WhatsAppButton />
</div>
```

- **Import/Export Conventions**:
  - `Navbar.tsx` exports `export const Navbar` and `export default Navbar`. `App.tsx:3` imports default `import Navbar from './components/Navbar';`.
  - `Footer.tsx` exports `export const Footer` and `export default Footer`. `App.tsx:24` imports default `import Footer from './components/Footer';`.
  - `WhatsAppButton.tsx` exports `export const WhatsAppButton` and `export default WhatsAppButton`. `App.tsx:25` imports default `import WhatsAppButton from './components/WhatsAppButton';`.
- **Layout & Stacking**:
  - `Navbar` has `fixed top-0 left-0 right-0 z-50 bg-bg-0/70 backdrop-blur-xl border-b border-white/[0.08]` with height `h-20` (80px) + 2px scroll progress bar.
  - Subpages (`About`, `Contact`, `FAQ`, `FairPlay`, `Privacy`, `RefundPolicy`, `Terms`) have `pt-28 pb-20 sm:pt-36` (112px/144px), providing sufficient top clearance so content never collides with `Navbar`.
  - Home `Hero.tsx:97` has `pt-24 sm:pt-28 pb-12 sm:pb-20` (96px/112px), clearing the navbar.
  - `WhatsAppButton` has `fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50` with `data-testid="whatsapp-button"`, avoiding overlap with the bottom navigation or content.
- **Section Anchor Targets in `Navbar.tsx:48-55`**:
  - `tournaments` -> `TournamentModes.tsx:59` (`id="tournaments"`) — **Present**
  - `ai-vision` -> `AIVisionShowcase.tsx:111` (`id="ai-vision"`) — **Present**
  - `wallet` -> `WalletSection.tsx:55` (`id="wallet"`) — **Present**
  - `ranks` -> `LeaderboardTiers.tsx:78` (`id="ranks"`) — **Present**
  - `organizers` -> `OrganizerProgram.tsx:51` (`id="organizers"`) — **Present**
  - `how-it-works` -> `HowItWorks.tsx:119` (`id="how-it-works"`) — **Present**
  - `download` (Download button handler) -> `Download.tsx:33` (`id="download"`) — **Present**
  - `faq` -> route `/faq` via React Router navigate — **Present**

---

### 1.4 `SEO.tsx` Component Props & Head Mutations

`src/components/SEO.tsx:3-12`:
- **Current Signature**:
  ```tsx
  interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    keywords?: string;
    schema?: object;
  }
  export function SEO({ title, description, canonical, ogImage, keywords, schema }: SEOProps)
  ```
- **Callers (8 files)**:
  `App.tsx:32`, `About.tsx:40`, `Contact.tsx:70`, `FairPlay.tsx:13`, `FAQ.tsx:67`, `Privacy.tsx:13`, `RefundPolicy.tsx:13`, `Terms.tsx:13`.
  - All 8 callers pass: `title`, `description`, and `canonical`. None currently pass `ogImage`, `keywords`, or `schema`.
  - All callers import via named import: `import { SEO } from './components/SEO';` or `import { SEO } from './SEO';`.
- **Head Injections in `SEO.tsx:15-68`**:
  - Updates: `document.title`, `meta[name="description"]`, `meta[name="keywords"]`, `meta[property="og:title"]`, `meta[property="og:description"]`, `link[rel="canonical"]`, `meta[property="og:image"]`.
  - Injects dynamic JSON-LD `<script type="application/ld+json" id="page-schema">` and removes it on unmount.
- **Gaps Identified**:
  1. `index.html` contains `meta[name="twitter:title"]`, `meta[name="twitter:description"]`, and `meta[name="twitter:image"]`, but `SEO.tsx` does not update Twitter card tags on route changes.
  2. `SEO.tsx` uses `querySelector` and `setAttribute` without fallback node creation if a meta tag is missing.
  3. `SEO.tsx` lacks `export default SEO` (only has named `export function SEO`).

---

## 2. Logic Chain

1. **Safety of `Stat` `subtext` Removal**:
   - *Premise*: `Stat.tsx:6` defines `subtext?: string`, and `Stat.tsx:30` renders it.
   - *Observation*: Zero callers in `src/` import or render `<Stat>`.
   - *Inference*: Removing `subtext?: string` from `StatProps` and eliminating line 30 from `Stat.tsx` will cause **zero** TypeScript compiler errors, **zero** lint errors, and **zero** UI regressions.
   - *Action for M1 Worker*: Clean `Stat.tsx` to `value: string | number`, `label: string`, `accent?: boolean`.

2. **Button Polymorphism Invariant**:
   - *Observation*: `About.tsx:126` and `FAQ.tsx:167, 176` pass `asAnchor`, `href`, and `target` to `<Button>`, while `Contact.tsx:237` passes `type="submit"` and `disabled`.
   - *Inference*: `Button.tsx` must remain a polymorphic component (`asAnchor` rendering an `<a>` tag, otherwise `<button>`) with forwarded ref. Removing `asAnchor` or button HTML attributes will break `About.tsx`, `FAQ.tsx`, and `Contact.tsx`.
   - *Action for M1 Worker*: Preserve polymorphic anchor/button branching and standard HTML button attributes.

3. **Pill Label Prop Invariant**:
   - *Observation*: All 18 components consuming `Pill` pass `label="..."`.
   - *Inference*: If `Pill` is refactored to only accept `children`, all 18 files will break with TypeScript errors.
   - *Action for M1 Worker*: Retain `{label || children}` in `Pill.tsx` and preserve `label?: string` in `PillProps`.

4. **Default + Named Export Duality**:
   - *Observation*: `App.tsx` imports `Navbar`, `Footer`, and `WhatsAppButton` via default imports (`import Navbar from ...`).
   - *Observation*: Primitives (`Button`, `Card`, `Badge`, `Pill`, `HudCorners`, `IconOrb`, `Stat`, `Container`, `Section`) are imported both directly and through `primitives/index.ts`.
   - *Inference*: Any primitive or navigation component that changes its export structure without retaining both named and default exports will cause import resolution errors.
   - *Action for M1 Worker*: Maintain `export const Component` and `export default Component` on all primitives and layout components.

5. **Navigation Anchor Invariants**:
   - *Observation*: `Navbar.tsx` maps 6 section anchors (`tournaments`, `ai-vision`, `wallet`, `ranks`, `organizers`, `how-it-works`) and 1 download anchor (`download`).
   - *Observation*: `AIVisionShowcase.tsx:111`, `HowItWorks.tsx:119`, `Download.tsx:33`, `OrganizerProgram.tsx:51`, `LeaderboardTiers.tsx:78`, `TournamentModes.tsx:59`, and `WalletSection.tsx:55` all supply matching element IDs.
   - *Inference*: Milestone 1 Worker must not alter section IDs in `Navbar.tsx` so anchor jumping across the application remains intact.

6. **SEO Component Enhancement**:
   - *Observation*: 8 pages rely on `<SEO>` with `title`, `description`, `canonical`.
   - *Inference*: Updating Twitter meta tags (`twitter:title`, `twitter:description`, `twitter:image`) and adding dynamic node creation within `SEO.tsx` hardens SEO without altering caller interfaces.

---

## 3. Caveats

1. **`Hero.tsx` Missing `id="home"`**:
   - `Hero.tsx:95` does not currently specify `id="home"`. When on the home page, `Navbar.tsx` sets `setActiveSection('home')` based on `window.scrollY < 160`. When navigating to `/` from another page, `Navbar.tsx` calls `window.scrollTo({ top: 0 })`. While functional, adding `id="home"` to `Hero.tsx` in Milestone 2 will ensure strict anchor targeting (`/#home`).
2. **`Navbar` Download Button Analytics Call**:
   - `PROJECT.md:51` specifies that the APK download button should trigger `trackDownload('navbar')` (or `trackButtonClick('download_app', 'navbar')`). `Navbar.tsx` currently only executes smooth scrolling without analytics tracking. Milestone 1 Worker should add this tracking cleanly.
3. **Primitives Not Yet Adopted by Downstream Components**:
   - `Card`, `Container`, and `Section` currently have zero callers in `src/`. Subsequent milestones (M2–M4) will have the option to adopt them. M1 Worker should polish their internal implementations while keeping the interface clean and standard.

---

## 4. Conclusion

1. **Migration Boundaries for Milestone 1 Worker**:
   - **Exclusive File Ownership**:
     - `src/components/primitives/Stat.tsx`
     - `src/components/primitives/Button.tsx`
     - `src/components/primitives/Badge.tsx`
     - `src/components/primitives/Card.tsx`
     - `src/components/primitives/Pill.tsx`
     - `src/components/primitives/HudCorners.tsx`
     - `src/components/primitives/IconOrb.tsx`
     - `src/components/primitives/Container.tsx`
     - `src/components/primitives/Section.tsx`
     - `src/components/primitives/index.ts`
     - `src/components/Navbar.tsx`
     - `src/components/Footer.tsx`
     - `src/components/WhatsAppButton.tsx`
     - `src/components/SEO.tsx`
   - **Protected Downstream Files (Do NOT modify in M1)**:
     - `src/App.tsx`
     - `src/components/Hero.tsx`, `Statement.tsx`, `AppExperienceShowcase.tsx`, `TournamentModes.tsx` (M2)
     - `src/components/AIVisionShowcase.tsx`, `WalletSection.tsx`, `LeaderboardTiers.tsx`, `OrganizerProgram.tsx` (M3)
     - `src/components/HowItWorks.tsx`, `PlatformComparison.tsx`, `ScoutRewards.tsx`, `Download.tsx`, `About.tsx`, `FAQ.tsx`, `Contact.tsx`, `Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx` (M4)

2. **Downstream Compatibility Checklist for Milestone 1 Worker**:
   - [x] `Stat.tsx`: Safely remove `subtext` prop and rendering. Zero downstream callers exist.
   - [x] `Button.tsx`: Must preserve `variant`, `size`, `fullWidth`, `icon`, `iconPosition`, `asAnchor`, `href`, `target`, `rel`, `disabled`, `type`, `onClick`, and `forwardRef`.
   - [x] `Badge.tsx`: Must preserve `tone` ('emerald' | 'neutral' | 'danger'), `dot`, `pulse`, `className`, `children`.
   - [x] `Pill.tsx`: Must preserve `label` prop alongside `children` via `{label || children}`, plus `dot` and `dotPulse`.
   - [x] `HudCorners.tsx`: Must preserve `tone` ('emerald' | 'neutral'), `size` ('sm' | 'md'), `inset`, `className`.
   - [x] `IconOrb.tsx`: Must preserve `icon`, `tone` ('emerald' | 'neutral' | 'danger'), `size` ('sm' | 'md' | 'lg'), `className`.
   - [x] `Navbar.tsx`: Retain active section detection, scroll progress, mobile menu overflow lock, and section IDs. Add download click tracking.
   - [x] `Footer.tsx`: Retain all legal, navigation, social, and contact links. Tighten copy to eliminate marketing fluff per R1.
   - [x] `WhatsAppButton.tsx`: Retain `data-testid="whatsapp-button"`, FAB positioning, safe-area-inset styling, and `+923367135319` chat trigger.
   - [x] `SEO.tsx`: Retain `title`, `description`, `canonical`, `ogImage`, `keywords`, `schema`. Add Twitter meta tag synchronization and safe element creation fallback. Retain named export `export function SEO` and add `export default SEO`.

---

## 5. Verification Method

To independently verify after any Milestone 1 modifications:

1. **TypeScript Type Integrity**:
   ```bash
   npm run typecheck
   ```
   *Expected result*: Exit code 0, 0 type errors.

2. **ESLint Lint Check**:
   ```bash
   npm run lint
   ```
   *Expected result*: Exit code 0, 0 errors, 0 warnings.

3. **Vite Production Build**:
   ```bash
   npm run build
   ```
   *Expected result*: Exit code 0, all assets bundle successfully into `dist/`.

4. **Caller & Interface Invariant Invalidation Checks**:
   - If `subtext` is removed from `Stat.tsx`, verify with `git grep "subtext"` that no caller attempts to pass it.
   - If `Button.tsx` is edited, verify `src/components/About.tsx`, `src/components/Contact.tsx`, and `src/components/FAQ.tsx` compile without prop errors.
   - If `Pill.tsx` is edited, verify `src/components/Hero.tsx`, `src/components/About.tsx`, and all 16 other section files compile with `label="..."`.
   - If `Navbar.tsx` or `Footer.tsx` is edited, verify `src/App.tsx` imports them cleanly and routes render without layout shifts.
