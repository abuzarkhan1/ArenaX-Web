# Supabase Token Redesign Blueprint: Standalone Legal & Compliance Pages
**Scope**: `src/components/Terms.tsx`, `src/components/Privacy.tsx`, `src/components/RefundPolicy.tsx`, `src/components/FairPlay.tsx`  
**Milestone**: M4 (Global Footer, Floating Trigger & Standalone Pages)  
**Author**: `explorer_m4_3` (Teamwork Explorer)  
**Target Worker**: Implementation Worker for Milestone 4 Standalone Legal Pages  

---

## 1. Executive Summary & Architectural Overview

The ArenaX-Web legal and compliance views (`/terms`, `/privacy`, `/refund-policy`, `/fair-play`) are foundational to user trust, regulatory compliance under the Laws of Pakistan, and platform integrity. Currently, these pages rely on legacy gaming visual cues (`.hud-grid`, `.hud-card`, cyan/green gaming glows, and heavy corners) that conflict with the clean, authoritative **"dark carbon & precision hairline"** aesthetic defined in the read-only Supabase design specification (`Supabase _ The Postgres Development Platform.html`).

This blueprint provides an actionable, drop-in redesign for all four standalone legal components, transforming them into a unified **Supabase Developer-Docs & Legal Governance Experience**:
1. **Dark Carbon Surfaces**: Canvas background `#121212` (`--bg-1`), content card containers `#171717` (`--bg-2` / `--card`), elevated sidebars and callouts `#181A19` / `#1E201F` (`--bg-3`).
2. **Hairline Border Architecture**: 1px subtle borders (`rgba(255, 255, 255, 0.08)` / `border-white/[0.08]`), dual-layer hairline gradients (`from-white/[0.08] to-white/[0.02]`), and hairline section dividers (`border-b border-white/[0.08]` / `divider-gradient`).
3. **Typography & Font Hierarchy**:
   - Headings in `Manrope` (`font-heading`) with tight tracking (`tracking-tight`) and sentence/title case.
   - Body copy in `Inter` (`font-sans`) with custom weight `450` (`font-normal`), line-height `leading-relaxed` (1.7), and high-contrast color `#A0A0A0` on `#EDEDED`.
   - Technical metadata, section tags, timestamps, and legal clauses in `Source Code Pro` (`font-mono`, `tabular-nums`).
4. **Interactive Developer-Docs Layout**:
   - Top breadcrumb navigation (`Home / Legal & Compliance / [Document]`).
   - Metadata pill with live pulsing green indicator (`Last updated: 2026 • Governed under the Laws of Pakistan`).
   - Responsive two-column desktop layout featuring a **Sticky Table of Contents (TOC)** with smooth-scroll section jumping, quick contact support cards, and a cross-document Legal Switcher.
   - Mobile-responsive single-column layout with quick-jump section chips.
5. **Absolute Invariant — 100% Content & Copy Preservation (R3)**:
   - Every single word, section heading, legal definition, bullet point, anti-cheat policy, refund condition, dispute email (`arenasupport@gmail.com`), and phone number (`+92 336 7135319`) is preserved verbatim without loss or mutation.

---

## 2. Design Token & Class Mapping Dictionary

| Element / Utility | Legacy Implementation | Redesigned Supabase Token / Class | Rationale & Reference |
|---|---|---|---|
| **Page Canvas** | `bg-bg-1 pt-28 pb-20 sm:pt-36` | `bg-[#121212] pt-28 pb-24 sm:pt-36 relative isolate` | Supabase canonical dark canvas (`#121212`) |
| **Grid / Atmosphere** | `.hud-grid` (opacity 40), `.ambient-glow` | Subtle radial emerald halo (`radial-gradient(ellipse at top, rgba(62,207,142,0.06), transparent 60%)`), fine hairline grid | Replaces noisy gaming grid with subtle technical backdrop |
| **Document Container** | `.hud-card relative overflow-hidden rounded-card p-8 sm:p-12` | `rounded-card bg-[#171717] border border-white/[0.08] p-8 sm:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]` | Supabase canonical card surface `#171717` with 1px hairline border |
| **Document Header** | `text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading` | `text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight` | Modern developer docs title hierarchy in Manrope |
| **Brand Accent** | `text-accent text-glow-accent` | `text-[#3ECF8E]` with subtle text glow `drop-shadow-[0_0_12px_rgba(62,207,142,0.3)]` | Supabase signature emerald `#3ECF8E` |
| **Metadata Tag / Pill** | `<p className="text-sm font-mono text-text-3 mt-2 tracking-tight tabular-nums">` | `inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2` with pulsing dot | Supabase metadata pill pattern with live status indicator |
| **Section Number** | Inline pill `rounded-full border border-[#3ECF8E]/30 bg-[#3ECF8E]/10` | `inline-flex h-6 min-w-[1.6rem] items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]` | Supabase code-badge square-pill with inset emerald highlight |
| **Section Dividers** | `border-b border-line pb-6` | `border-b border-white/[0.08] pb-8 pt-2 last:border-b-0 last:pb-0` | Clean 1px hairline divider with proper document spacing |
| **List Bullets** | `marker:text-[#3ECF8E]/60 list-disc list-inside space-y-2` | `space-y-3 pl-1 text-[15px] sm:text-base text-text-2` with custom emerald dot indicator `<span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" />` | Eliminates raw browser list rendering; provides crisp typography alignment |
| **Section Headings** | `text-xl font-bold font-heading text-text-1 mb-3` | `text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 flex items-center gap-2` | Clear Manrope section headings |
| **Body Paragraphs** | `text-base text-text-2 leading-relaxed` | `text-[15px] sm:text-base text-text-2 leading-relaxed font-normal` | Inter 450 weight, 1.7 line-height, optimized for long legal reading |
| **Support / Email Link** | `text-accent font-mono underline decoration-[#3ECF8E]/40` | `text-[#3ECF8E] font-mono underline decoration-[#3ECF8E]/40 underline-offset-4 hover:text-[#34B27B] transition-colors focus-ring rounded-sm` | Accessible link state with Supabase focus ring |
| **Table of Contents (TOC)** | None (Single long block) | Sticky sidebar on desktop (`lg:col-span-4`) with section links, contact card, and legal switcher | Standard Supabase developer docs experience |

---

## 3. Shared Architectural Layout Patterns

### 3.1 Developer-Docs Breadcrumbs
Placed at the top of every legal page:
```tsx
<nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
  <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors">
    Home
  </Link>
  <span className="text-white/20">/</span>
  <span className="text-text-3">Legal & Compliance</span>
  <span className="text-white/20">/</span>
  <span className="text-[#3ECF8E] font-medium">{documentName}</span>
</nav>
```

### 3.2 Live Legal Metadata Strip
Authoritative governance stamp matching Supabase docs metadata:
```tsx
<div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
  <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
  </span>
  <span className="tabular-nums">Last updated: 2026 • Governed under the Laws of Pakistan</span>
</div>
```

### 3.3 Sticky Desktop TOC & Quick Legal Switcher
```tsx
<aside className="hidden lg:block lg:col-span-4">
  <div className="sticky top-28 space-y-5">
    {/* Table of Contents Box */}
    <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
        <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
        <span>On This Page</span>
      </div>
      <nav className="space-y-1.5 font-sans text-xs">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
          >
            <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
              0{sec.num}
            </span>
            <span className="truncate">{sec.title}</span>
          </a>
        ))}
      </nav>
    </div>

    {/* Cross-Document Legal Navigation Switcher */}
    <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
      <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
        <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
        <span>Legal Directory</span>
      </div>
      <div className="space-y-2 text-xs">
        <Link to="/terms" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
          <span>Terms of Service</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </Link>
        <Link to="/privacy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
          <span>Privacy Policy</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </Link>
        <Link to="/refund-policy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
          <span>100% Refund Policy</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </Link>
        <Link to="/fair-play" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
          <span>Fair Play & Anti-Cheat</span>
          <ArrowRight className="w-3 h-3 opacity-60" />
        </Link>
      </div>
    </div>

    {/* Need Support Callout */}
    <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
      <div className="font-semibold text-text-1">Legal or Compliance Inquiries?</div>
      <p className="text-text-3 leading-relaxed">
        Our compliance desk reviews dispute tickets and UID validations 24/7.
      </p>
      <a
        href="mailto:arenasupport@gmail.com"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
      >
        <Mail className="w-3 h-3" />
        <span>arenasupport@gmail.com</span>
      </a>
    </div>
  </div>
</aside>
```

---

## 4. Blueprint for `src/components/Terms.tsx`

### 4.1 Changes Overview
- **File**: `src/components/Terms.tsx`
- **Component**: `Terms`
- **Icons**: `Scale`, `ListOrdered`, `FileText`, `ArrowRight`, `Mail`, `ShieldAlert`
- **Breadcrumbs**: `Home / Legal & Compliance / Terms & Conditions`
- **Title**: `Terms & Conditions` (with `& <span className="text-[#3ECF8E]">Conditions</span>`)
- **Metadata**: `Last updated: 2026 • Governed under the Laws of Pakistan`
- **Layout**: 2-Column Responsive Grid (`lg:grid lg:grid-cols-12 lg:gap-8`) with sticky Table of Contents sidebar.
- **Section Badges**: Supabase code-badge square pill (`01.`, `02.`, etc.).
- **5 Preserved Sections**:
  1. `Acceptance of Terms`
  2. `Player Eligibility` (4 bullet points)
  3. `Account & Fund Security`
  4. `Skill-Based Gaming Classification`
  5. `Disqualification & Bans`

### 4.2 Proposed Full Replacement Code

```tsx
import { Link } from 'react-router-dom';
import { Scale, ListOrdered, FileText, ArrowRight, Mail, ShieldAlert } from 'lucide-react';
import { SEO } from './SEO';

export const Terms = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'acceptance', num: '1', title: 'Acceptance of Terms' },
    { id: 'eligibility', num: '2', title: 'Player Eligibility' },
    { id: 'security', num: '3', title: 'Account & Fund Security' },
    { id: 'classification', num: '4', title: 'Skill-Based Gaming Classification' },
    { id: 'bans', num: '5', title: 'Disqualification & Bans' },
  ];

  return (
    <>
      <SEO
        title="Terms & Conditions - ArenaX Esports Platform"
        description="Review the official Terms & Conditions governing player participation, wallet usage, and tournaments on the ArenaX platform."
        canonical="https://marenax.site/terms"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-24 sm:pt-36">
        {/* Subtle Supabase Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-[95vw] rounded-full bg-[#3ECF8E]/[0.03] blur-3xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
            <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors focus-ring rounded-sm">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-text-3">Legal & Compliance</span>
            <span className="text-white/20">/</span>
            <span className="text-[#3ECF8E] font-medium">Terms & Conditions</span>
          </nav>

          {/* Page Hero Header */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
              </span>
              <span className="tabular-nums">Last updated: 2026 • Governed under the Laws of Pakistan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight">
                  Terms & <span className="text-accent text-glow-accent">Conditions</span>
                </h1>
                <p className="text-sm font-mono text-text-3 mt-2 tracking-tight tabular-nums">
                  Last updated: 2026 • Governed under the Laws of Pakistan
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <Scale className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Developer-Docs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Legal Content Card */}
            <main className="lg:col-span-8">
              <div className="rounded-card border border-white/[0.08] bg-[#171717] p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]">
                {/* SECTION 1 */}
                <section id="acceptance" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Acceptance of Terms
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    By downloading the ArenaX application or accessing our website and related services, you accept and agree to be bound by the terms and conditions set forth herein. If you do not agree to these terms, do not access or use our platform. ArenaX reserves the right to modify these terms to reflect feature additions or regulatory changes.
                  </p>
                </section>

                {/* SECTION 2 */}
                <section id="eligibility" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> Player Eligibility
                  </h2>
                  <ul className="space-y-2.5 text-[15px] sm:text-base text-text-2 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Users must be at least 18 years of age or possess authorized parental or legal guardian consent.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>You must be a resident of Pakistan or a jurisdiction where skill-based esports platforms are legally permitted.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>You must provide accurate registration details, including your authentic Free Fire in-game name and UID.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Strictly one account per individual is permitted. Duplicate accounts created to exploit bonuses will be terminated.</span>
                    </li>
                  </ul>
                </section>

                {/* SECTION 3 */}
                <section id="security" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Account & Fund Security
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    You are solely responsible for maintaining the confidentiality of your account credentials, login credentials, and private 6-digit Fund Security Password. ArenaX representatives will never ask for your private password. All match registrations and transactions executed under your credentials remain your sole responsibility.
                  </p>
                </section>

                {/* SECTION 4 */}
                <section id="classification" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Skill-Based Gaming Classification
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Tournaments hosted on ArenaX are strictly skill-based competitive sports. Outcomes depend on tactical decision-making, target acquisition accuracy, game sense, and team coordination. ArenaX does not offer games of pure chance or gambling.
                  </p>
                </section>

                {/* SECTION 5 */}
                <section id="bans" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>5.</span> Disqualification & Bans
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Any player detected using emulators, modified client packages, aimbots, wallhacks, or exploiting network lag will receive an immediate permanent hardware ban and forfeiture of all accumulated funds.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-300">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <p className="leading-relaxed">
                      Zero tolerance is enforced for modified APKs and PC emulators. Machine signatures are cryptographically logged to prevent re-registration.
                    </p>
                  </div>
                </section>
              </div>
            </main>

            {/* Sidebar Table of Contents & Quick Navigation */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of Contents */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
                    <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>On This Page</span>
                  </div>
                  <nav className="space-y-1.5 font-sans text-xs">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
                          0{sec.num}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Legal Switcher */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>Legal Directory</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Link to="/terms" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>Terms of Service</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Privacy Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/refund-policy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>100% Refund Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/fair-play" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Fair Play & Anti-Cheat</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                  </div>
                </div>

                {/* Need Support Box */}
                <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
                  <div className="font-semibold text-text-1">Questions Regarding Terms?</div>
                  <p className="text-text-3 leading-relaxed">
                    Our compliance desk is available 24/7 to answer eligibility and security questions.
                  </p>
                  <a
                    href="mailto:arenasupport@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>arenasupport@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
```

### 4.3 Copy Verification Checklist for `Terms.tsx`
- [x] Title: `Terms & Conditions` preserved (`Terms &` and `Conditions`).
- [x] SEO Meta: `Terms & Conditions - ArenaX Esports Platform` preserved.
- [x] Subtitle Stamp: `Last updated: 2026 • Governed under the Laws of Pakistan` preserved.
- [x] Section 1: `Acceptance of Terms`
- [x] Section 1 Paragraph: `"By downloading the ArenaX application or accessing our website and related services, you accept and agree to be bound by the terms and conditions set forth herein. If you do not agree to these terms, do not access or use our platform. ArenaX reserves the right to modify these terms to reflect feature additions or regulatory changes."` preserved verbatim.
- [x] Section 2: `Player Eligibility`
- [x] Section 2 Bullet 1: `"Users must be at least 18 years of age or possess authorized parental or legal guardian consent."` preserved verbatim.
- [x] Section 2 Bullet 2: `"You must be a resident of Pakistan or a jurisdiction where skill-based esports platforms are legally permitted."` preserved verbatim.
- [x] Section 2 Bullet 3: `"You must provide accurate registration details, including your authentic Free Fire in-game name and UID."` preserved verbatim.
- [x] Section 2 Bullet 4: `"Strictly one account per individual is permitted. Duplicate accounts created to exploit bonuses will be terminated."` preserved verbatim.
- [x] Section 3: `Account & Fund Security`
- [x] Section 3 Paragraph: `"You are solely responsible for maintaining the confidentiality of your account credentials, login credentials, and private 6-digit Fund Security Password. ArenaX representatives will never ask for your private password. All match registrations and transactions executed under your credentials remain your sole responsibility."` preserved verbatim.
- [x] Section 4: `Skill-Based Gaming Classification`
- [x] Section 4 Paragraph: `"Tournaments hosted on ArenaX are strictly skill-based competitive sports. Outcomes depend on tactical decision-making, target acquisition accuracy, game sense, and team coordination. ArenaX does not offer games of pure chance or gambling."` preserved verbatim.
- [x] Section 5: `Disqualification & Bans`
- [x] Section 5 Paragraph: `"Any player detected using emulators, modified client packages, aimbots, wallhacks, or exploiting network lag will receive an immediate permanent hardware ban and forfeiture of all accumulated funds."` preserved verbatim.

---

## 5. Blueprint for `src/components/Privacy.tsx`

### 5.1 Changes Overview
- **File**: `src/components/Privacy.tsx`
- **Component**: `Privacy`
- **Icons**: `ShieldCheck`, `ListOrdered`, `FileText`, `ArrowRight`, `Mail`, `Lock`
- **Breadcrumbs**: `Home / Legal & Compliance / Privacy Policy`
- **Title**: `Privacy Policy` (with `Privacy <span className="text-[#3ECF8E]">Policy</span>`)
- **Metadata**: `Last updated: 2026 • Governed under the Laws of Pakistan`
- **Layout**: 2-Column Responsive Grid (`lg:grid lg:grid-cols-12 lg:gap-8`) with sticky Table of Contents sidebar.
- **Section Badges**: Supabase code-badge square pill (`01.`, `02.`, etc.).
- **4 Preserved Sections**:
  1. `Information We Collect`
  2. `How Information is Used` (4 bullet points)
  3. `Data Security & Storage`
  4. `Contacting the Privacy Officer` (with mailto link `arenasupport@gmail.com`)

### 5.2 Proposed Full Replacement Code

```tsx
import { Link } from 'react-router-dom';
import { ShieldCheck, ListOrdered, FileText, ArrowRight, Mail, Lock } from 'lucide-react';
import { SEO } from './SEO';

export const Privacy = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'collection', num: '1', title: 'Information We Collect' },
    { id: 'usage', num: '2', title: 'How Information is Used' },
    { id: 'security', num: '3', title: 'Data Security & Storage' },
    { id: 'officer', num: '4', title: 'Contacting the Privacy Officer' },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy - ArenaX Esports Platform"
        description="Learn how ArenaX collects, protects, and handles player data, Free Fire UIDs, and payment records."
        canonical="https://marenax.site/privacy"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-24 sm:pt-36">
        {/* Subtle Supabase Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-[95vw] rounded-full bg-[#3ECF8E]/[0.03] blur-3xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
            <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors focus-ring rounded-sm">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-text-3">Legal & Compliance</span>
            <span className="text-white/20">/</span>
            <span className="text-[#3ECF8E] font-medium">Privacy Policy</span>
          </nav>

          {/* Page Hero Header */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
              </span>
              <span className="tabular-nums">Last updated: 2026 • Governed under the Laws of Pakistan</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight">
                  Privacy <span className="text-accent text-glow-accent">Policy</span>
                </h1>
                <p className="text-sm font-mono text-text-3 mt-2 tracking-tight tabular-nums">
                  Last updated: 2026 • Governed under the Laws of Pakistan
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Developer-Docs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Legal Content Card */}
            <main className="lg:col-span-8">
              <div className="rounded-card border border-white/[0.08] bg-[#171717] p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]">
                {/* SECTION 1 */}
                <section id="collection" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Information We Collect
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    ArenaX collects personal data necessary to provide competitive tournament matchmaking, automated scoreboard verification, and local payment cashouts. This includes your mobile phone number, authentic Free Fire in-game name and UID, and transaction slip details for manual deposit processing.
                  </p>
                </section>

                {/* SECTION 2 */}
                <section id="usage" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> How Information is Used
                  </h2>
                  <ul className="space-y-2.5 text-[15px] sm:text-base text-text-2 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Verifying match lobby eligibility against registered player UIDs.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Executing automated AI OCR scoreboard matching for victory and kill tallies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Processing direct withdrawals to your JazzCash, EasyPaisa, or Pakistani bank account.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3ECF8E]" aria-hidden="true" />
                      <span>Detecting fraud, bonus exploitation, and unfair third-party cheat software.</span>
                    </li>
                  </ul>
                </section>

                {/* SECTION 3 */}
                <section id="security" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Data Security & Storage
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    All account records and transaction proofs are stored with cryptographic hashing. ArenaX never sells, leases, or trades player data to external marketing advertisers. Financial passwords remain hashed and inaccessible to staff.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-[#3ECF8E]/20 bg-[#041B10]/40 p-4 text-xs text-[#85E0BA]">
                    <Lock className="w-4 h-4 flex-shrink-0 text-[#3ECF8E] mt-0.5" />
                    <p className="leading-relaxed">
                      All stored player data and transaction ledger proofs are safeguarded with SHA-256 cryptographic hashes and strict multi-tier access controls.
                    </p>
                  </div>
                </section>

                {/* SECTION 4 */}
                <section id="officer" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Contacting the Privacy Officer
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    If you have questions regarding your stored profile data or wish to request data deletion, contact our privacy desk at{' '}
                    <a
                      href="mailto:arenasupport@gmail.com"
                      className="text-accent font-mono underline decoration-[#3ECF8E]/40 underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-ring rounded-sm"
                    >
                      arenasupport@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </main>

            {/* Sidebar Table of Contents & Quick Navigation */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of Contents */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
                    <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>On This Page</span>
                  </div>
                  <nav className="space-y-1.5 font-sans text-xs">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
                          0{sec.num}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Legal Switcher */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>Legal Directory</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Link to="/terms" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Terms of Service</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>Privacy Policy</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                    <Link to="/refund-policy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>100% Refund Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/fair-play" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Fair Play & Anti-Cheat</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                  </div>
                </div>

                {/* Need Support Box */}
                <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
                  <div className="font-semibold text-text-1">Data Deletion Inquiries?</div>
                  <p className="text-text-3 leading-relaxed">
                    Submit UID and profile data deletion requests directly to our designated Privacy Desk.
                  </p>
                  <a
                    href="mailto:arenasupport@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>arenasupport@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
```

### 5.3 Copy Verification Checklist for `Privacy.tsx`
- [x] Title: `Privacy Policy` preserved (`Privacy` and `Policy`).
- [x] SEO Meta: `Privacy Policy - ArenaX Esports Platform` preserved.
- [x] Subtitle Stamp: `Last updated: 2026 • Governed under the Laws of Pakistan` preserved.
- [x] Section 1: `Information We Collect`
- [x] Section 1 Paragraph: `"ArenaX collects personal data necessary to provide competitive tournament matchmaking, automated scoreboard verification, and local payment cashouts. This includes your mobile phone number, authentic Free Fire in-game name and UID, and transaction slip details for manual deposit processing."` preserved verbatim.
- [x] Section 2: `How Information is Used`
- [x] Section 2 Bullet 1: `"Verifying match lobby eligibility against registered player UIDs."` preserved verbatim.
- [x] Section 2 Bullet 2: `"Executing automated AI OCR scoreboard matching for victory and kill tallies."` preserved verbatim.
- [x] Section 2 Bullet 3: `"Processing direct withdrawals to your JazzCash, EasyPaisa, or Pakistani bank account."` preserved verbatim.
- [x] Section 2 Bullet 4: `"Detecting fraud, bonus exploitation, and unfair third-party cheat software."` preserved verbatim.
- [x] Section 3: `Data Security & Storage`
- [x] Section 3 Paragraph: `"All account records and transaction proofs are stored with cryptographic hashing. ArenaX never sells, leases, or trades player data to external marketing advertisers. Financial passwords remain hashed and inaccessible to staff."` preserved verbatim.
- [x] Section 4: `Contacting the Privacy Officer`
- [x] Section 4 Paragraph: `"If you have questions regarding your stored profile data or wish to request data deletion, contact our privacy desk at "` + `arenasupport@gmail.com` + `"."` preserved verbatim.

---

## 6. Blueprint for `src/components/RefundPolicy.tsx`

### 6.1 Changes Overview
- **File**: `src/components/RefundPolicy.tsx`
- **Component**: `RefundPolicy`
- **Icons**: `ShieldCheck`, `ListOrdered`, `FileText`, `ArrowRight`, `Mail`, `RefreshCw`
- **Breadcrumbs**: `Home / Legal & Compliance / 100% Refund Policy`
- **Title**: `100% Refund Policy` (with `100% Refund <span className="text-[#3ECF8E]">Policy</span>`)
- **Subtitle**: `Automated consumer protection for competitive tournament participants.`
- **Layout**: 2-Column Responsive Grid (`lg:grid lg:grid-cols-12 lg:gap-8`) with sticky Table of Contents sidebar.
- **Section Badges**: Supabase code-badge square pill (`01.`, `02.`, etc.).
- **4 Preserved Sections**:
  1. `Automated Match Cancellation Refund`
  2. `In-Game Room Technical Disruptions`
  3. `Voluntary Player Withdrawals`
  4. `Dispute Contact` (with mailto link `arenasupport@gmail.com`)

### 6.2 Proposed Full Replacement Code

```tsx
import { Link } from 'react-router-dom';
import { ShieldCheck, ListOrdered, FileText, ArrowRight, Mail, RefreshCw } from 'lucide-react';
import { SEO } from './SEO';

export const RefundPolicy = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'cancellation', num: '1', title: 'Automated Match Cancellation Refund' },
    { id: 'disruptions', num: '2', title: 'In-Game Room Technical Disruptions' },
    { id: 'withdrawals', num: '3', title: 'Voluntary Player Withdrawals' },
    { id: 'contact', num: '4', title: 'Dispute Contact' },
  ];

  return (
    <>
      <SEO
        title="100% Refund Policy - ArenaX Esports Platform"
        description="ArenaX 100% Automated Cancellation Refund Policy. Learn how entry fee refunds and cancelled matches are handled."
        canonical="https://marenax.site/refund-policy"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-24 sm:pt-36">
        {/* Subtle Supabase Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-[95vw] rounded-full bg-[#3ECF8E]/[0.03] blur-3xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
            <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors focus-ring rounded-sm">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-text-3">Legal & Compliance</span>
            <span className="text-white/20">/</span>
            <span className="text-[#3ECF8E] font-medium">100% Refund Policy</span>
          </nav>

          {/* Page Hero Header */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
              </span>
              <span className="tabular-nums">100% Automated Cancellation Protection • Escrow Solvency</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight">
                  100% Refund <span className="text-accent text-glow-accent">Policy</span>
                </h1>
                <p className="text-sm font-mono text-text-3 mt-2 tracking-tight">
                  Automated consumer protection for competitive tournament participants.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Developer-Docs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Legal Content Card */}
            <main className="lg:col-span-8">
              <div className="rounded-card border border-white/[0.08] bg-[#171717] p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]">
                {/* SECTION 1 */}
                <section id="cancellation" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Automated Match Cancellation Refund
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    ArenaX enforces an absolute 100% automated refund guarantee. If a tournament lobby fails to reach the minimum player capacity threshold, is cancelled by the tournament host, or is aborted due to technical issues, 100% of the tournament entry fee is returned to each registered participant's Play Wallet immediately.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-[#3ECF8E]/20 bg-[#041B10]/40 p-4 text-xs text-[#85E0BA]">
                    <RefreshCw className="w-4 h-4 flex-shrink-0 text-[#3ECF8E] mt-0.5" />
                    <p className="leading-relaxed">
                      Lobby cancellations trigger instantaneous smart escrow refunds back to player Play Wallets without requiring manual support tickets.
                    </p>
                  </div>
                </section>

                {/* SECTION 2 */}
                <section id="disruptions" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> In-Game Room Technical Disruptions
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    If a Free Fire custom room experiences server disconnects before the safe zone countdown begins, players can raise an automated dispute ticket in-app. Once verified by our automated logs or review desk, entry fees are fully restored.
                  </p>
                </section>

                {/* SECTION 3 */}
                <section id="withdrawals" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Voluntary Player Withdrawals
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Players may voluntarily leave or unregister from an upcoming tournament up until 15 minutes before the match start time. In such instances, the entire entry fee is instantly refunded to their Play Wallet. Once room credentials (Room ID and Password) unlock, unregistration is locked to prevent credential leakage.
                  </p>
                </section>

                {/* SECTION 4 */}
                <section id="contact" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Dispute Contact
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    For immediate refund inquiries regarding match cancellations, contact our operations team at{' '}
                    <a
                      href="mailto:arenasupport@gmail.com"
                      className="text-accent font-mono underline decoration-[#3ECF8E]/40 underline-offset-4 transition-colors duration-200 hover:text-accent-hover focus-ring rounded-sm"
                    >
                      arenasupport@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </main>

            {/* Sidebar Table of Contents & Quick Navigation */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of Contents */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
                    <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>On This Page</span>
                  </div>
                  <nav className="space-y-1.5 font-sans text-xs">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
                          0{sec.num}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Legal Switcher */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>Legal Directory</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Link to="/terms" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Terms of Service</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Privacy Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/refund-policy" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>100% Refund Policy</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                    <Link to="/fair-play" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Fair Play & Anti-Cheat</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                  </div>
                </div>

                {/* Need Support Box */}
                <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
                  <div className="font-semibold text-text-1">Lobby Refund Inquiries?</div>
                  <p className="text-text-3 leading-relaxed">
                    Provide your tournament match ID and Free Fire registered UID for immediate escrow verification.
                  </p>
                  <a
                    href="mailto:arenasupport@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>arenasupport@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
```

### 6.3 Copy Verification Checklist for `RefundPolicy.tsx`
- [x] Title: `100% Refund Policy` preserved (`100% Refund` and `Policy`).
- [x] SEO Meta: `100% Refund Policy - ArenaX Esports Platform` preserved.
- [x] Subtitle: `Automated consumer protection for competitive tournament participants.` preserved verbatim.
- [x] Section 1: `Automated Match Cancellation Refund`
- [x] Section 1 Paragraph: `"ArenaX enforces an absolute 100% automated refund guarantee. If a tournament lobby fails to reach the minimum player capacity threshold, is cancelled by the tournament host, or is aborted due to technical issues, 100% of the tournament entry fee is returned to each registered participant's Play Wallet immediately."` preserved verbatim.
- [x] Section 2: `In-Game Room Technical Disruptions`
- [x] Section 2 Paragraph: `"If a Free Fire custom room experiences server disconnects before the safe zone countdown begins, players can raise an automated dispute ticket in-app. Once verified by our automated logs or review desk, entry fees are fully restored."` preserved verbatim.
- [x] Section 3: `Voluntary Player Withdrawals`
- [x] Section 3 Paragraph: `"Players may voluntarily leave or unregister from an upcoming tournament up until 15 minutes before the match start time. In such instances, the entire entry fee is instantly refunded to their Play Wallet. Once room credentials (Room ID and Password) unlock, unregistration is locked to prevent credential leakage."` preserved verbatim.
- [x] Section 4: `Dispute Contact`
- [x] Section 4 Paragraph: `"For immediate refund inquiries regarding match cancellations, contact our operations team at "` + `arenasupport@gmail.com` + `"."` preserved verbatim.

---

## 7. Blueprint for `src/components/FairPlay.tsx`

### 7.1 Changes Overview
- **File**: `src/components/FairPlay.tsx`
- **Component**: `FairPlay`
- **Icons**: `ShieldCheck`, `ListOrdered`, `FileText`, `ArrowRight`, `Mail`, `Smartphone`, `Scan`
- **Breadcrumbs**: `Home / Legal & Compliance / Fair Play Policy`
- **Title**: `Fair Play Policy` (with `Fair Play <span className="text-[#3ECF8E]">Policy</span>`)
- **Subtitle**: `Zero tolerance for unfair software, emulator advantages, or match tampering.`
- **Layout**: 2-Column Responsive Grid (`lg:grid lg:grid-cols-12 lg:gap-8`) with sticky Table of Contents sidebar.
- **Section Badges**: Supabase code-badge square pill (`01.`, `02.`, etc.).
- **4 Preserved Sections**:
  1. `Mobile Touchscreen Devices Only`
  2. `In-Game UID Validation`
  3. `Anti-Photoshop & Tamper Detection`
  4. `Lifetime Hardware Bans`

### 7.2 Proposed Full Replacement Code

```tsx
import { Link } from 'react-router-dom';
import { ShieldCheck, ListOrdered, FileText, ArrowRight, Mail, Smartphone, Scan } from 'lucide-react';
import { SEO } from './SEO';

export const FairPlay = () => {
  const sectionNumberClass =
    'mr-2.5 inline-flex h-6 min-w-[1.6rem] -translate-y-px items-center justify-center rounded-md border border-[#3ECF8E]/30 bg-[#041B10] px-2 align-middle font-mono text-[11px] font-semibold tabular-nums text-[#3ECF8E] shadow-[inset_0_1px_0_rgba(62,207,142,0.2)]';

  const sections = [
    { id: 'mobile-only', num: '1', title: 'Mobile Touchscreen Devices Only' },
    { id: 'uid-validation', num: '2', title: 'In-Game UID Validation' },
    { id: 'tamper-detection', num: '3', title: 'Anti-Photoshop & Tamper Detection' },
    { id: 'hardware-bans', num: '4', title: 'Lifetime Hardware Bans' },
  ];

  return (
    <>
      <SEO
        title="Zero-Tolerance Fair Play - ArenaX Esports Platform"
        description="ArenaX Fair Play and Anti-Cheat Policy. Learn about our emulator restrictions, UID validation, and permanent hardware bans."
        canonical="https://marenax.site/fair-play"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-24 sm:pt-36">
        {/* Subtle Supabase Ambient Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.08),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-[95vw] rounded-full bg-[#3ECF8E]/[0.03] blur-3xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-text-3">
            <Link to="/" className="text-text-2 hover:text-[#3ECF8E] transition-colors focus-ring rounded-sm">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-text-3">Legal & Compliance</span>
            <span className="text-white/20">/</span>
            <span className="text-[#3ECF8E] font-medium">Fair Play Policy</span>
          </nav>

          {/* Page Hero Header */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#181a19] px-3.5 py-1 font-mono text-xs text-text-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ECF8E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ECF8E]" />
              </span>
              <span className="tabular-nums">Zero Tolerance Anti-Cheat Protocol • Hardware & OCR Enforced</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-5xl font-bold font-heading text-text-1 tracking-tight">
                  Fair Play <span className="text-accent text-glow-accent">Policy</span>
                </h1>
                <p className="text-sm font-mono text-text-3 mt-2 tracking-tight">
                  Zero tolerance for unfair software, emulator advantages, or match tampering.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="h-10 w-10 rounded-control border border-white/10 bg-[#181a19] flex items-center justify-center text-[#3ECF8E] shadow-sm">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Developer-Docs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Legal Content Card */}
            <main className="lg:col-span-8">
              <div className="rounded-card border border-white/[0.08] bg-[#171717] p-8 sm:p-12 space-y-8 text-base text-text-2 leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.75)]">
                {/* SECTION 1 */}
                <section id="mobile-only" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>1.</span> Mobile Touchscreen Devices Only
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    ArenaX tournaments are strictly restricted to authentic physical mobile devices (Android smartphones and tablets). Running the game or ArenaX client via PC emulators (e.g. BlueStacks, LDPlayer, Gameloop) or using mouse and keyboard mapping hardware is strictly prohibited and results in immediate disqualification.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-300">
                    <Smartphone className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                    <p className="leading-relaxed">
                      PC emulators (BlueStacks, LDPlayer, Gameloop, Nox) and external USB input controllers are strictly prohibited. Violators face instant disqualification.
                    </p>
                  </div>
                </section>

                {/* SECTION 2 */}
                <section id="uid-validation" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>2.</span> In-Game UID Validation
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Every player must register with their genuine Free Fire UID. Custom room slots lock strictly to registered players. If an unverified guest or substitute UID enters the custom room, that slot is flagged and disqualified automatically.
                  </p>
                </section>

                {/* SECTION 3 */}
                <section id="tamper-detection" className="scroll-mt-28 pb-8 border-b border-white/[0.08]">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>3.</span> Anti-Photoshop & Tamper Detection
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Scoreboard victory submissions are analyzed by the ArenaX Vision Engine. The system checks image metadata, resolution signatures, font consistency, and pixel patterns to detect altered kill tallies or duplicate screenshot submissions.
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-panel border border-[#3ECF8E]/20 bg-[#041B10]/40 p-4 text-xs text-[#85E0BA]">
                    <Scan className="w-4 h-4 flex-shrink-0 text-[#3ECF8E] mt-0.5" />
                    <p className="leading-relaxed">
                      ArenaX Vision Engine verifies pixel histograms, font anti-aliasing, and EXIF timestamp signatures to reject forged or reused victory screenshots.
                    </p>
                  </div>
                </section>

                {/* SECTION 4 */}
                <section id="hardware-bans" className="scroll-mt-28">
                  <h2 className="text-lg sm:text-xl font-bold font-heading text-text-1 mb-3.5 leading-snug flex items-center">
                    <span className={sectionNumberClass}>4.</span> Lifetime Hardware Bans
                  </h2>
                  <p className="text-[15px] sm:text-base text-text-2 leading-relaxed">
                    Players verified to be using third-party aimbots, ESP wallhacks, speed mods, or teaming in solo scrims receive a permanent device hardware ban, account closure, and forfeiture of all balances.
                  </p>
                </section>
              </div>
            </main>

            {/* Sidebar Table of Contents & Quick Navigation */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                {/* Table of Contents */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3.5">
                    <ListOrdered className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>On This Page</span>
                  </div>
                  <nav className="space-y-1.5 font-sans text-xs">
                    {sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center py-1 text-text-2 transition-colors duration-150 hover:text-[#3ECF8E]"
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#3ECF8E]/80 group-hover:text-[#3ECF8E]">
                          0{sec.num}
                        </span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Legal Switcher */}
                <div className="rounded-panel border border-white/[0.08] bg-[#181a19]/90 backdrop-blur-md p-5 shadow-sm">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-text-3 mb-3 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    <span>Legal Directory</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Link to="/terms" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Terms of Service</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/privacy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>Privacy Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/refund-policy" className="flex items-center justify-between text-text-2 hover:text-[#3ECF8E] transition-colors py-1">
                      <span>100% Refund Policy</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </Link>
                    <Link to="/fair-play" className="flex items-center justify-between text-[#3ECF8E] font-medium py-1">
                      <span>Fair Play & Anti-Cheat</span>
                      <span className="text-[10px] font-mono bg-[#041B10] px-1.5 py-0.5 rounded border border-[#3ECF8E]/30">Active</span>
                    </Link>
                  </div>
                </div>

                {/* Report Cheater / Dispute Box */}
                <div className="rounded-panel border border-white/[0.08] bg-[#141514] p-4 text-xs space-y-2.5">
                  <div className="font-semibold text-text-1">Report Cheater or Suspect?</div>
                  <p className="text-text-3 leading-relaxed">
                    Submit in-game player IGN, UID, match replay link, or unedited screenshot to our anti-cheat investigation unit.
                  </p>
                  <a
                    href="mailto:arenasupport@gmail.com"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3ECF8E] hover:underline"
                  >
                    <Mail className="w-3 h-3" />
                    <span>arenasupport@gmail.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default FairPlay;
```

### 7.3 Copy Verification Checklist for `FairPlay.tsx`
- [x] Title: `Fair Play Policy` preserved (`Fair Play` and `Policy`).
- [x] SEO Meta: `Zero-Tolerance Fair Play - ArenaX Esports Platform` preserved.
- [x] Subtitle: `Zero tolerance for unfair software, emulator advantages, or match tampering.` preserved verbatim.
- [x] Section 1: `Mobile Touchscreen Devices Only`
- [x] Section 1 Paragraph: `"ArenaX tournaments are strictly restricted to authentic physical mobile devices (Android smartphones and tablets). Running the game or ArenaX client via PC emulators (e.g. BlueStacks, LDPlayer, Gameloop) or using mouse and keyboard mapping hardware is strictly prohibited and results in immediate disqualification."` preserved verbatim.
- [x] Section 2: `In-Game UID Validation`
- [x] Section 2 Paragraph: `"Every player must register with their genuine Free Fire UID. Custom room slots lock strictly to registered players. If an unverified guest or substitute UID enters the custom room, that slot is flagged and disqualified automatically."` preserved verbatim.
- [x] Section 3: `Anti-Photoshop & Tamper Detection`
- [x] Section 3 Paragraph: `"Scoreboard victory submissions are analyzed by the ArenaX Vision Engine. The system checks image metadata, resolution signatures, font consistency, and pixel patterns to detect altered kill tallies or duplicate screenshot submissions."` preserved verbatim.
- [x] Section 4: `Lifetime Hardware Bans`
- [x] Section 4 Paragraph: `"Players verified to be using third-party aimbots, ESP wallhacks, speed mods, or teaming in solo scrims receive a permanent device hardware ban, account closure, and forfeiture of all balances."` preserved verbatim.

---

## 8. Implementation Roadmap & Quality Assurance Verification Plan

### 8.1 Critical Invariants Guardrails
1. **Reference Immutability (R1)**:
   - Neither `Supabase _ The Postgres Development Platform.html` nor anything in `Supabase _ The Postgres Development Platform_files` may be edited, touched, or deleted.
2. **Copy & Text Invariant (R3)**:
   - Zero deletions or edits to any legal sentences, clauses, or policy terms.
   - All tests in `tests/supabase-tokens-and-invariants.test.ts`, `tier1-feature-coverage.test.ts`, and `tier3-cross-feature.test.ts` must pass seamlessly.
3. **Responsive Degradation**:
   - The desktop sticky sidebar must be hidden cleanly on mobile (`hidden lg:block`), and the main legal content must render at full width with proper padding on all device viewports.
4. **Anchor Scrolling**:
   - Each section must have `id="{sec.id}" className="scroll-mt-28"` so jump links land with adequate clearance below the fixed navbar.

### 8.2 Worker Execution Order
1. Apply the blueprint changes to `src/components/Terms.tsx`.
2. Apply the blueprint changes to `src/components/Privacy.tsx`.
3. Apply the blueprint changes to `src/components/RefundPolicy.tsx`.
4. Apply the blueprint changes to `src/components/FairPlay.tsx`.
5. Run full verification:
   ```powershell
   npm run typecheck
   npm run lint
   npm run build
   npm test
   ```
6. Verify 100% test pass with zero regressions across all 14 test suites.
