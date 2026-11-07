# Milestone 3: Technical Product Showcase Redesign Blueprint (Part 3)
## Components: HowItWorks.tsx, PlatformComparison.tsx, Download.tsx

**Document Version**: 1.0.0  
**Target Files**:
- `src/components/HowItWorks.tsx`
- `src/components/PlatformComparison.tsx`
- `src/components/Download.tsx`  
**Milestone**: M3 (Interactive Product Showcases & Technical Features)  
**Author**: teamwork_explorer (`explorer_m3_3`)  
**Parent Orchestrator ID**: `8b88bbad-6052-4d75-b548-47b7f26819bc`  
**Status**: Ready for Implementation  

---

## 1. Executive Summary & Design System Translation

This blueprint establishes the exact architectural transformation of `HowItWorks.tsx`, `PlatformComparison.tsx`, and `Download.tsx` to adhere strictly to the Supabase design system tokens extracted from the read-only reference `Supabase _ The Postgres Development Platform.html`:

1. **Dark Carbon Surface Architecture**:
   - Canvas background strictly mapped to canonical Supabase dark base `#121212` (`--bg-1` / `bg-[#121212]`).
   - Cards and structural table containers set to dark carbon card surface `#171717` (`--bg-2` / `bg-[#171717]`), with elevated cards/headers at `#181A19` / `#1E201F` (`--bg-3`).
   - Deep nested controls, input fields, and inner metric boxes set to `#121212` with hairline contrast.
2. **Precision Hairline Borders**:
   - Universal 1px hairline border `rgba(255, 255, 255, 0.08)` (`border-white/[0.08]` / `border-line`).
   - Highlighted emerald border `rgba(62, 207, 142, 0.35)` (`border-[#3ECF8E]/35`) on the primary Android APK card and active ArenaX comparison column.
   - Hover states lightened to `rgba(255, 255, 255, 0.14)` without disruptive geometry shifts.
   - Inset top illumination highlights: `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`.
3. **Supabase Emerald Accent `#3ECF8E`**:
   - Canonical green `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`) used for active milestones, checkmarks, progress lines, and primary solid buttons (`bg-[#3ECF8E] hover:bg-[#34B27B]`).
   - Brand gradient: `linear-gradient(180deg, #249361 0%, #3ECF8E 100%)` for timeline fill and headline accents.
4. **De-HUDification & Aesthetic Elevation**:
   - Eliminate all legacy neon glow blobs (`.ambient-glow`, `.text-glow-accent`, excessive text shadows).
   - Eliminate or replace legacy gaming bracket corners (`<HudCorners />`) with understated Supabase hairline container architecture.
   - Replace legacy glowing dots with crisp Supabase node rings (`ring-4 ring-[#121212]`).
5. **Strict Content & Invariant Preservation (Requirement R3)**:
   - 100% of all existing copy, titles, descriptions, technical specs, URLs, analytics tracking calls, and interactive controls MUST be preserved verbatim.

---

## 2. Critical Forensic Audit & Discrepancy Reconciliation

Before implementation, a forensic audit was executed reconciling the dispatch instructions with the existing codebase and automated test invariants. The Worker MUST follow these authoritative resolutions:

| Component | Dispatch Prompt Phrasing | Repository Truth & Test Invariant | Authoritative Resolution for Worker |
|---|---|---|---|
| `HowItWorks.tsx` | *"step 01 to 04 cards"* | Exactly **6 sequential steps** (`01` through `06`) defined in `STEPS`. Tested by `tests/tier1-feature-coverage.test.ts:212` (`assert.ok(src.includes('01') && src.includes('06'))`) and `tests/supabase-tokens-and-invariants.test.ts:285-295`. | **Preserve all 6 steps verbatim** (`01 Download & Install APK` through `06 AI Vision & 24h Cashout`). Truncating to 4 steps would break automated test suites. |
| `PlatformComparison.tsx` | *"ArenaX vs WhatsApp Scrims vs Traditional Apps comparison matrix"* | Exactly **2 comparative columns**: `ArenaX Official Client` vs `Informal WhatsApp / Social Scrims`. Tested by `tests/tier1-feature-coverage.test.ts:221-224` and `tests/supabase-tokens-and-invariants.test.ts:297-306`. | **Preserve 2-column comparative layout** (`ArenaX Official Client` vs `Informal WhatsApp / Social Scrims`) across all 6 dimensions. Do NOT invent a 3rd column ("Traditional Apps") as it violates R3 and breaks table layout tests. |
| `Download.tsx` | *"3-step sideload verification guide"* | Exactly **4 installation steps** (`01` through `04`) in `installSteps`. Tested by `tests/tier1-feature-coverage.test.ts:245` (`assert.ok(src.includes('installSteps'), 'Must provide 4 installation steps')`). | **Preserve all 4 install steps verbatim** (`01 Download APK`, `02 Allow Source`, `03 Install Package`, `04 Link UID & Play`). |
| `Download.tsx` | QR code implementation | `QRCodeSVG` from `qrcode.react`, encodes `downloadUrl`, label `Scan on Android Phone`. | **Preserve `QRCodeSVG` and label verbatim**; wrap in Supabase dark carbon panel. |
| `Download.tsx` | Analytics & Download trigger | `trackDownload('ArenaX.apk', 'Android', '2.6.0')` and programmatic DOM anchor click. | **Preserve `handleDownload` logic verbatim**. |

---

## 3. Component Blueprint 1: `src/components/HowItWorks.tsx`

### 3.1 Architectural Analysis & Token Mappings

| Element / Region | Current Implementation | Supabase Redesign Token / Class | Rationale |
|---|---|---|---|
| **Root `<section>`** | `py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden` | `py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden` | Supabase canonical `#121212` dark carbon canvas with crisp 1px hairline border. |
| **Ambient Glow Blobs** | Two `.ambient-glow` divs with `opacity-60` and `opacity-70` | Replace with single subtle top radial gradient: `bg-[radial-gradient(ellipse_at_top_left,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_60%)] pointer-events-none` | Eliminates gaudy gaming neon blobs while maintaining atmospheric depth. |
| **Section Eyebrow** | None currently present | (Keep clean header structure) | Header remains focused. |
| **Section Headline** | `Road to <span className="text-accent text-glow-accent">Booyah</span>` | `Road to <span className="text-[#3ECF8E]">Booyah</span>` (or `bg-gradient-to-r from-[#249361] to-[#3ECF8E] bg-clip-text text-transparent`) | Removes `.text-glow-accent`. Uses Supabase signature emerald `#3ECF8E` or brand gradient. |
| **Section Subtext** | `text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed` | `text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed font-normal` | Clean Inter 450 body typography. |
| **Timeline Track** | `w-[1px] bg-line` | `w-[1px] bg-white/[0.08]` | Clean hairline vertical track. |
| **Timeline Fill Line** | `bg-accent shadow-[0_0_8px_rgba(62,207,142,0.8)]` | `w-full h-full bg-gradient-to-b from-[#249361] to-[#3ECF8E]` | Replaces neon glow shadow with Supabase brand gradient `#249361` ➔ `#3ECF8E`. Preserves `progressLineRef` and GSAP ScrollTrigger scrub animation. |
| **Timeline Nodes** | `w-3.5 h-3.5 rounded-full bg-bg-1 border-2 border-accent shadow-[0_0_12px_rgba(62,207,142,0.55)] group-hover:scale-125` | `w-3.5 h-3.5 rounded-full bg-[#121212] border-2 border-[#3ECF8E] ring-4 ring-[#121212] transition-transform duration-200 group-hover:scale-125` | Supabase node ring styling: crisp `#3ECF8E` border with 4px `#121212` ring mask, zero neon glow. |
| **Step Cards** | `.hud-card relative z-10 p-6 sm:p-7 rounded-card flex items-start gap-4 preserve-3d duration-200 ease-out hover:shadow-lift` | `timeline-step-card relative z-10 p-6 sm:p-7 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_32px_-12px_rgba(0,0,0,0.5)] flex items-start gap-4.5 preserve-3d duration-200 ease-out hover:border-white/[0.14] hover:-translate-y-0.5` | Replaces HUD card with Supabase dark carbon `#171717` card, hairline border, inset highlight, and smooth hover elevation. |
| **HUD Corners** | `{index === 0 && <HudCorners tone="emerald" size="sm" className="opacity-60" />}` | Omit `<HudCorners />` (deprecated HUD relic) | Clean architectural card framing. |
| **Icon Container** | `<IconOrb icon={Icon} tone="emerald" size="md" />` | `<div className="w-11 h-11 rounded-md bg-[#181A19] border border-white/[0.08] flex items-center justify-center text-[#3ECF8E] flex-shrink-0 group-hover:border-[#3ECF8E]/30 transition-colors">` with Lucide icon | Supabase control surface for icons: `#181A19` carbon background with hairline border. |
| **Step Number** | `text-xs font-mono font-bold text-accent tabular-nums tracking-tight` | `text-xs font-mono font-semibold text-[#3ECF8E] tabular-nums tracking-tight` | Supabase monospace emerald accent. |
| **Card Title** | `text-lg font-bold font-heading text-text-1` | `text-lg font-bold font-heading text-[#EDEDED]` | High-contrast display title (`Manrope`). |
| **Card Description** | `text-sm text-text-2 leading-relaxed` | `text-sm text-[#A0A0A0] leading-relaxed font-normal` | Clean secondary body text (`Inter` 450). |
| **Final CTA Button** | `<Button variant="primary" onClick={scrollToDownload} ...>` | `<Button variant="primary" size="lg" onClick={scrollToDownload} icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}>Download Direct APK</Button>` | High-contrast Supabase green button (`#3ECF8E`). |

### 3.2 Content Preservation Checklist (`HowItWorks.tsx`)

- [x] Section ID: `how-it-works`
- [x] Heading: `Road to Booyah` (`Road to` and `Booyah`)
- [x] Subtitle: `From downloading the APK to 24-hour JazzCash or EasyPaisa payouts in 6 transparent steps.`
- [x] Step 01: `Download & Install APK` — *"Download the official ArenaX APK for Android. Register with a referral code to claim 25 AX starter coins immediately."*
- [x] Step 02: `Link Your Free Fire UID` — *"Set up your player profile and connect your authentic Free Fire in-game name and UID for automated roster verification."*
- [x] Step 03: `Assemble Your Squad` — *"Form Duo or Squad lineups in under 5 seconds using unique 6-digit squad codes, or enter tournaments as a Solo rogue."*
- [x] Step 04: `Register for Tournaments` — *"Browse daily Bermuda Battle Royale scrims and Clash Squad 4v4 brackets with entry fees starting from only 50 AX Coins."*
- [x] Step 05: `Drop & Dominate` — *"Room ID & password unlock inside the app 10–15 minutes before match countdown. Fight for the Booyah and rack up kill points."*
- [x] Step 06: `AI Vision & 24h Cashout` — *"AI vision scans your victory scoreboard. Verified cash winnings credit directly to your Winning Wallet for 24h cashout."*
- [x] Action Button: `Download Direct APK` (triggers smooth scroll to `#download`)
- [x] GSAP ScrollTrigger: Scrubbed progress fill line and step card reveal animations preserved.

### 3.3 Proposed Replacement Code (`HowItWorks.tsx`)

```tsx
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, UserPlus, Users, Swords, Trophy, Banknote, ArrowRight } from 'lucide-react';
import { Button } from './primitives/Button';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    step: '01',
    icon: Download,
    title: 'Download & Install APK',
    desc: 'Download the official ArenaX APK for Android. Register with a referral code to claim 25 AX starter coins immediately.',
  },
  {
    step: '02',
    icon: UserPlus,
    title: 'Link Your Free Fire UID',
    desc: 'Set up your player profile and connect your authentic Free Fire in-game name and UID for automated roster verification.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Assemble Your Squad',
    desc: 'Form Duo or Squad lineups in under 5 seconds using unique 6-digit squad codes, or enter tournaments as a Solo rogue.',
  },
  {
    step: '04',
    icon: Swords,
    title: 'Register for Tournaments',
    desc: 'Browse daily Bermuda Battle Royale scrims and Clash Squad 4v4 brackets with entry fees starting from only 50 AX Coins.',
  },
  {
    step: '05',
    icon: Trophy,
    title: 'Drop & Dominate',
    desc: 'Room ID & password unlock inside the app 10–15 minutes before match countdown. Fight for the Booyah and rack up kill points.',
  },
  {
    step: '06',
    icon: Banknote,
    title: 'AI Vision & 24h Cashout',
    desc: 'AI vision scans your victory scoreboard. Verified cash winnings credit directly to your Winning Wallet for 24h cashout.',
  },
];

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Progress line vertical fill
        if (progressLineRef.current && timelineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 0.4,
              },
            }
          );
        }

        // 2. Step cards rotateX entrance
        if (timelineRef.current) {
          const cards = timelineRef.current.querySelectorAll('.timeline-step-card');
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { rotateX: 15, opacity: 0.4, y: 15 },
              {
                rotateX: 0,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                duration: 0.7,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
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
      id="how-it-works"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="How It Works Timeline"
    >
      {/* Subtle atmospheric radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)]"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Road to <span className="text-[#3ECF8E]">Booyah</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed">
            From downloading the APK to 24-hour JazzCash or EasyPaisa payouts in 6 transparent steps.
          </p>
        </div>

        {/* ======================================================== */}
        {/* VERTICAL TIMELINE WITH PROGRESS LINE                     */}
        {/* ======================================================== */}
        <div
          ref={timelineRef}
          className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 max-w-3xl perspective-1200"
        >
          {/* Base Vertical Line Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08] pointer-events-none">
            {/* Animated Emerald Fill Line */}
            <div
              ref={progressLineRef}
              className="w-full h-full bg-gradient-to-b from-[#249361] to-[#3ECF8E]"
            />
          </div>

          {STEPS.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.step} className="relative group">
                {/* Node Dot on the Timeline */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full bg-[#121212] border-2 border-[#3ECF8E] ring-4 ring-[#121212] transition-transform duration-200 group-hover:scale-125 z-10" />

                {/* Base Card for Step with 3D rotate in */}
                <div className="timeline-step-card relative z-10 p-6 sm:p-7 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_32px_-12px_rgba(0,0,0,0.5)] flex items-start gap-4.5 preserve-3d duration-200 ease-out hover:border-white/[0.14] hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-md bg-[#181A19] border border-white/[0.08] flex items-center justify-center text-[#3ECF8E] flex-shrink-0 group-hover:border-[#3ECF8E]/30 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#3ECF8E] tabular-nums tracking-tight">/{item.step}</span>
                      <h3 className="text-lg font-bold font-heading text-[#EDEDED]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-12 sm:mt-16 pl-6 sm:pl-10">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToDownload}
            icon={<ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
          >
            Download Direct APK
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
```

---

## 4. Component Blueprint 2: `src/components/PlatformComparison.tsx`

### 4.1 Architectural Analysis & Token Mappings

| Element / Region | Current Implementation | Supabase Redesign Token / Class | Rationale |
|---|---|---|---|
| **Root `<section>`** | `py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden` | `py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden` | Supabase canonical `#121212` dark carbon canvas. |
| **Section Headline** | `Platform <span className="text-accent text-glow-accent">Integrity</span>` | `Platform <span className="text-[#3ECF8E]">Integrity</span>` | High-impact Manrope title without neon text glow. |
| **Section Subtext** | `text-base sm:text-lg text-text-2 max-w-2xl mt-3 leading-relaxed` | `text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed font-normal` | Clean Inter 450 body typography. |
| **Ambient Glow** | `.ambient-glow left-1/2 top-10 h-[380px] w-[680px]` | Subtle top ellipse: `bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_60%)] pointer-events-none` | Soft, restrained lighting. |
| **Desktop Table Card** | `hidden md:block hud-card rounded-card overflow-hidden relative z-10` with `<HudCorners />` | `hidden md:block rounded-card overflow-hidden relative z-10 bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_48px_-20px_rgba(0,0,0,0.7)]` | Clean Supabase dark carbon table card. Omit HUD corners. |
| **Table Head Row** | `border-b border-line bg-bg-3/95 backdrop-blur-xl text-xs font-mono uppercase tracking-wider text-text-3 shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]` | `border-b border-white/[0.08] bg-[#1E201F]/95 backdrop-blur-xl text-xs font-mono uppercase tracking-wider text-[#707070] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]` | Hairline separator and elevated carbon background `#1E201F`. |
| **Header Col 1** | `<th className="py-4 px-6">Evaluation Dimension</th>` | `<th className="py-4 px-6 font-semibold">Evaluation Dimension</th>` | Clear header label. |
| **Header Col 2 (ArenaX)**| `<th className="py-4 px-6 text-accent bg-accent-dim/40 border-x border-line-accent">ArenaX Official Client</th>` | `<th className="py-4 px-6 text-[#3ECF8E] font-semibold bg-[#041B10]/40 border-x border-[#3ECF8E]/20">ArenaX Official Client</th>` | Signature Supabase emerald branding with dark emerald background `#041B10`/40 and subtle hairline border. |
| **Header Col 3 (Informal)**| `<th className="py-4 px-6 text-text-3 border-l border-white/[0.04]">Informal WhatsApp / Social Scrims</th>` | `<th className="py-4 px-6 text-[#707070] font-semibold border-l border-white/[0.04]">Informal WhatsApp / Social Scrims</th>` | Muted secondary column. |
| **Body Row Dividers** | `divide-y divide-line` | `divide-y divide-white/[0.08]` | Clean hairline dividers. |
| **Row Hover** | `group hover:bg-[#3ECF8E]/[0.03] transition-colors duration-200` | `group hover:bg-white/[0.02] transition-colors duration-150` | Restrained row highlight. |
| **Dimension Cell** | `py-4 px-6 font-bold text-text-1 text-sm font-heading` | `py-4 px-6 font-bold text-[#EDEDED] text-sm font-heading` | Display font Manrope. |
| **ArenaX Body Cell** | `py-4 px-6 bg-accent-dim/20 border-x border-line-accent text-text-1 font-medium` | `py-4 px-6 bg-[#041B10]/20 border-x border-[#3ECF8E]/20 text-[#EDEDED] font-medium` | Tinted column container with hairline vertical borders. |
| **Emerald Check Icon** | `<CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E]" />` inside `bg-[#3ECF8E]/10 border-[#3ECF8E]/25` | `w-5 h-5 rounded-md bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 flex items-center justify-center flex-shrink-0 text-[#3ECF8E]` with `CheckCircle2` | Sharp, tactile check pill in Supabase green `#3ECF8E`. |
| **Muted Cross Icon** | `<X className="w-3.5 h-3.5 text-text-3" />` inside `bg-white/[0.03] border-white/[0.08]` | `w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-[#707070]` with `X` | Understated cross mark in `#707070`. |
| **Mobile Cards** | `hud-card relative p-5 rounded-card space-y-3 ...` with `<HudCorners />` | `relative p-5 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] space-y-3 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]` | Clean dark carbon card; remove HUD corners. |
| **Mobile ArenaX Box** | `p-3 rounded-control bg-accent-dim border border-line-accent` | `p-3 rounded-control bg-[#041B10]/60 border border-[#3ECF8E]/25 flex items-start gap-2.5 transition-colors duration-200 hover:border-[#3ECF8E]/40` | Deep emerald surface `#041B10` with `#3ECF8E` badge and white text. |
| **Mobile Informal Box**| `p-3 rounded-control bg-bg-1/70 border border-line` | `p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex items-start gap-2.5 transition-colors duration-200 hover:border-white/[0.14]` | Canvas surface `#121212` with muted `#707070` text. |

### 4.2 Content Preservation Checklist (`PlatformComparison.tsx`)

- [x] Section ID: `comparison`
- [x] Heading: `Platform Integrity` (`Platform` and `Integrity`)
- [x] Subtitle: `See how ArenaX eliminates the risks, delays, and disputes inherent in unregulated WhatsApp and social media scrims.`
- [x] Constant: `COMPARISON_POINTS` array with 6 dimensions
- [x] Table Header Columns: `Evaluation Dimension`, `ArenaX Official Client`, `Informal WhatsApp / Social Scrims`
- [x] Dimension 1: `Result Verification`
  - ArenaX: `Automated AI vision reads scoreboards in seconds`
  - Informal: `Manual host review, prone to bias and delays`
- [x] Dimension 2: `Prize Money Protection`
  - ArenaX: `Two-Wallet isolation & 100% solvency guarantee`
  - Informal: `Money held in host personal account; high risk`
- [x] Dimension 3: `Cashout Speed`
  - ArenaX: `Guaranteed cashout to JazzCash/EasyPaisa within 24h`
  - Informal: `Days of delay, ghosting, or arbitrary fee deductions`
- [x] Dimension 4: `Scoring Transparency`
  - ArenaX: `Fixed authoritative rules (20 PTS Booyah, 5 PTS Kill)`
  - Informal: `Subjective rules changed mid-tournament by hosts`
- [x] Dimension 5: `Match Cancellation`
  - ArenaX: `100% automated refund directly to Play Wallet`
  - Informal: `No refunds provided; players blocked on WhatsApp`
- [x] Dimension 6: `Host Accountability`
  - ArenaX: `Verified 1–5★ reviews restricted to real participants`
  - Informal: `Anonymous hosts with zero community accountability`
- [x] Mobile labels: `ArenaX Official` and `Informal Scrims`

### 4.3 Proposed Replacement Code (`PlatformComparison.tsx`)

```tsx
import { CheckCircle2, X } from 'lucide-react';

const COMPARISON_POINTS = [
  {
    dimension: 'Result Verification',
    arenax: 'Automated AI vision reads scoreboards in seconds',
    informal: 'Manual host review, prone to bias and delays',
  },
  {
    dimension: 'Prize Money Protection',
    arenax: 'Two-Wallet isolation & 100% solvency guarantee',
    informal: 'Money held in host personal account; high risk',
  },
  {
    dimension: 'Cashout Speed',
    arenax: 'Guaranteed cashout to JazzCash/EasyPaisa within 24h',
    informal: 'Days of delay, ghosting, or arbitrary fee deductions',
  },
  {
    dimension: 'Scoring Transparency',
    arenax: 'Fixed authoritative rules (20 PTS Booyah, 5 PTS Kill)',
    informal: 'Subjective rules changed mid-tournament by hosts',
  },
  {
    dimension: 'Match Cancellation',
    arenax: '100% automated refund directly to Play Wallet',
    informal: 'No refunds provided; players blocked on WhatsApp',
  },
  {
    dimension: 'Host Accountability',
    arenax: 'Verified 1–5★ reviews restricted to real participants',
    informal: 'Anonymous hosts with zero community accountability',
  },
];

export const PlatformComparison = () => {
  return (
    <section
      id="comparison"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Platform Comparison"
    >
      {/* Subtle atmospheric radial backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.06)_0%,rgba(62,207,142,0)_70%)]"
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Platform <span className="text-[#3ECF8E]">Integrity</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mt-3 leading-relaxed">
            See how ArenaX eliminates the risks, delays, and disputes inherent in unregulated WhatsApp and social media scrims.
          </p>
        </div>

        {/* Comparison Surface */}
        <div className="relative">
          {/* Desktop Table View */}
          <div className="hidden md:block rounded-card overflow-hidden relative z-10 bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_48px_-20px_rgba(0,0,0,0.7)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#1E201F]/95 backdrop-blur-xl text-xs font-mono uppercase tracking-wider text-[#707070] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
                    <th className="py-4 px-6 font-semibold">Evaluation Dimension</th>
                    <th className="py-4 px-6 text-[#3ECF8E] font-semibold bg-[#041B10]/40 border-x border-[#3ECF8E]/20">
                      ArenaX Official Client
                    </th>
                    <th className="py-4 px-6 text-[#707070] font-semibold border-l border-white/[0.04]">
                      Informal WhatsApp / Social Scrims
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08]">
                  {COMPARISON_POINTS.map((pt, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-white/[0.02] transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-bold text-[#EDEDED] text-sm font-heading">
                        {pt.dimension}
                      </td>
                      <td className="py-4 px-6 bg-[#041B10]/20 border-x border-[#3ECF8E]/20 text-[#EDEDED] font-medium">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 flex items-center justify-center flex-shrink-0 text-[#3ECF8E]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                          </span>
                          <span className="tabular-nums">{pt.arenax}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#707070] border-l border-white/[0.04]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-[#707070]">
                            <X className="w-3.5 h-3.5 text-[#707070]" strokeWidth={1.5} />
                          </span>
                          <span className="tabular-nums">{pt.informal}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Responsive Cards */}
          <div className="md:hidden relative z-10 space-y-4">
            {COMPARISON_POINTS.map((pt, index) => (
              <div
                key={index}
                className="relative p-5 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] space-y-3 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]"
              >
                <span className="text-xs font-mono uppercase font-bold text-[#707070] tracking-wider block">
                  {pt.dimension}
                </span>

                {/* ArenaX Row */}
                <div className="p-3 rounded-control bg-[#041B10]/60 border border-[#3ECF8E]/25 flex items-start gap-2.5 transition-colors duration-200 hover:border-[#3ECF8E]/40">
                  <span className="w-5 h-5 rounded-md bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#3ECF8E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E]" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#3ECF8E] block">ArenaX Official</span>
                    <p className="text-xs text-[#EDEDED] font-medium mt-0.5 tabular-nums">{pt.arenax}</p>
                  </div>
                </div>

                {/* Informal Scrims Row */}
                <div className="p-3 rounded-control bg-[#121212]/80 border border-white/[0.08] flex items-start gap-2.5 transition-colors duration-200 hover:border-white/[0.14]">
                  <span className="w-5 h-5 rounded-md bg-white/[0.02] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#707070]">
                    <X className="w-3.5 h-3.5 text-[#707070]" strokeWidth={1.5} />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#707070] block">Informal Scrims</span>
                    <p className="text-xs text-[#707070] mt-0.5 tabular-nums">{pt.informal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformComparison;
```

---

## 5. Component Blueprint 3: `src/components/Download.tsx`

### 5.1 Architectural Analysis & Token Mappings

| Element / Region | Current Implementation | Supabase Redesign Token / Class | Rationale |
|---|---|---|---|
| **Root `<section>`** | `py-[clamp(80px,10vw,140px)] bg-bg-1 border-b border-line relative overflow-hidden` | `py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden` | Supabase canonical dark carbon canvas. |
| **Echo Typography** | `ARENA<span className="text-accent/35">X</span>` with `from-white/20 via-white/5 to-transparent` | `ARENA<span className="text-[#3ECF8E]/30">X</span>` with `from-white/15 via-white/5 to-transparent` | Monolithic display echo; refined contrast. |
| **Section Headline** | `Download <span className="text-accent text-glow-accent">ArenaX</span>` | `Download <span className="text-[#3ECF8E]">ArenaX</span>` | Manrope display heading without text-shadow glow. |
| **Section Subtext** | `text-base sm:text-lg text-text-2 max-w-2xl mx-auto mt-3 leading-relaxed` | `text-base sm:text-lg text-[#A0A0A0] max-w-2xl mx-auto mt-3 leading-relaxed font-normal` | Clean Inter 450 body typography. |
| **Ambient Glow** | `.ambient-glow left-4 top-6 h-[300px] w-[300px] opacity-80` | Subtle radial glow: `bg-[radial-gradient(ellipse_at_top_left,rgba(62,207,142,0.08)_0%,rgba(62,207,142,0)_70%)] pointer-events-none` | Calibrated Supabase lighting. |
| **Android Card (Primary)** | `hud-card-highlight relative z-10 p-6 sm:p-8 rounded-card ...` with `<HudCorners />` | `relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_20px_48px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/50` | Primary Supabase highlighted card with emerald hairline border, dark carbon `#171717` surface, and inset top illumination. Remove HUD corners. |
| **Android Icon Orb** | `<IconOrb icon={Smartphone} tone="emerald" size="lg" />` | `<div className="w-11 h-11 rounded-md bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">` | Supabase dark emerald icon container. |
| **Android Package Text** | `text-xs font-mono text-accent tabular-nums tracking-tight` | `text-xs font-mono text-[#3ECF8E] tabular-nums tracking-tight` | Monospace brand accent text. |
| **Android Version Badge** | `<Badge tone="emerald" dot>v2.6.0</Badge>` | `<Badge tone="emerald" dot>v2.6.0</Badge>` | Supabase status badge primitive (`bg-[#041B10] border-[#3ECF8E]/30 text-[#3ECF8E]`). |
| **Android Bullet Points** | `space-y-3 font-mono text-xs text-text-2 mb-8 tabular-nums` | `space-y-3 font-mono text-xs text-[#A0A0A0] mb-8 tabular-nums` with `<CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />` | Monospace specs with Supabase emerald checks. |
| **Download CTA Button** | `<Button variant="primary" size="lg" fullWidth onClick={handleDownload} ...>Download Direct APK</Button>` | `<Button variant="primary" size="lg" fullWidth onClick={handleDownload} icon={<DownloadCloud className="w-5 h-5" strokeWidth={1.5} />}>Download Direct APK</Button>` | High-contrast solid green CTA button. |
| **QR Code Container** | `hidden sm:flex items-center justify-between p-3.5 rounded-control bg-bg-1/70 border border-line ...` | `hidden sm:flex items-center justify-between p-3.5 rounded-control bg-[#121212] border border-white/[0.08] transition-colors duration-200 hover:border-[#3ECF8E]/30` | Dark carbon recessed container with hairline border. |
| **QR Code Element** | `<QRCodeSVG value={downloadUrl} size={48} level="L" bgColor="#FFFFFF" fgColor="#121212" ... />` inside `bg-white rounded-lg p-1` | `<div className="bg-white rounded-md p-1.5 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">` with `QRCodeSVG value={downloadUrl} size={48} level="L" bgColor="#FFFFFF" fgColor="#121212" includeMargin={false}` | Crisp white QR container with 48px scannable SVG. |
| **iOS Card (Secondary)** | `hud-card relative z-10 p-6 sm:p-8 rounded-card flex flex-col justify-between opacity-80 ...` | `relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col justify-between opacity-80 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]` | Muted secondary card adhering to Supabase carbon styling. |
| **iOS Icon Orb** | `<IconOrb icon={Smartphone} tone="neutral" size="lg" />` | `<div className="w-11 h-11 rounded-md bg-[#181A19] border border-white/[0.08] flex items-center justify-center text-[#707070] flex-shrink-0">` | Neutral icon surface. |
| **iOS Badge** | `<Badge tone="neutral">Coming Soon</Badge>` | `<Badge tone="neutral">Coming Soon</Badge>` | Neutral badge (`bg-[#171717] text-[#EDEDED] border-white/10`). |
| **iOS Specs** | `space-y-3 font-mono text-xs text-text-3 mb-8 tabular-nums` with `<Clock className="w-4 h-4 text-text-3" />` | `space-y-3 font-mono text-xs text-[#707070] mb-8 tabular-nums` with `<Clock className="w-4 h-4 text-[#707070]" />` | Monospace muted bullets. |
| **iOS Disabled Button** | `<Button variant="secondary" size="lg" fullWidth disabled>Coming Soon for iOS</Button>` | `<Button variant="secondary" size="lg" fullWidth disabled>Coming Soon for iOS</Button>` | Secondary disabled state. |
| **4 Install Steps Card** | `p-6 sm:p-8 rounded-card bg-bg-2/70 border border-line max-w-4xl mx-auto backdrop-blur-xl relative` | `p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] max-w-4xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative` | Hairline bordered carbon container. |
| **4 Step Cards Grid** | `p-4 rounded-control bg-bg-1/70 border border-line ...` | `p-4 rounded-control bg-[#121212] border border-white/[0.08] flex flex-col justify-between transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/30 hover:bg-[#181A19]` | Dark carbon recessed step cards with `#3ECF8E` step numbers and hover border. |

### 5.2 Content Preservation Checklist (`Download.tsx`)

- [x] Section ID: `download`
- [x] Echo Typography: `ARENAX` (`ARENA` + `X`)
- [x] Heading: `Download ArenaX` (`Download` and `ArenaX`)
- [x] Subtitle: `Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.`
- [x] APK URL: `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk`
- [x] Analytics call: `trackDownload('ArenaX.apk', 'Android', '2.6.0')`
- [x] Programmatic download handler: `handleDownload` (creates `<a>`, sets `href`, triggers click, cleans up)
- [x] Android Card:
  - Title: `Android Client`
  - Package: `Package: com.arenax.app`
  - Badge: `v2.6.0` (with dot)
  - Bullet 1: `Compatible with Android 8.0 through Android 15`
  - Bullet 2: `Build Size: ~45–55 MB (Native optimized client)`
  - Bullet 3: `Google Play Protect compatible & SHA-256 verified`
  - Button: `Download Direct APK`
  - QR Code: `Scan on Android Phone` with `QRCodeSVG`
- [x] Apple iOS Card:
  - Title: `Apple iOS`
  - Badge: `Coming Soon`
  - Bullet 1: `Apple App Store submission in review`
  - Bullet 2: `Requires iOS 15.0 or later`
  - Bullet 3: `Cross-platform scrim matchmaking with Android`
  - Button: `Coming Soon for iOS` (disabled)
- [x] Array: `installSteps` with all 4 items:
  - `01`: `Download APK` — *"Tap Download Direct APK to save v2.6.0."*
  - `02`: `Allow Source` — *"Enable unknown app installation in browser settings."*
  - `03`: `Install Package` — *"Open the installer package and confirm."*
  - `04`: `Link UID & Play` — *"Enter referral code for 25 AX bonus and join scrims."*

### 5.3 Proposed Replacement Code (`Download.tsx`)

```tsx
import { DownloadCloud, Smartphone, Clock, QrCode, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { trackDownload } from '../utils/analytics';
import { Button } from './primitives/Button';
import { Badge } from './primitives';

export const Download = () => {
  const downloadUrl = 'https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk';

  const handleDownload = () => {
    trackDownload('ArenaX.apk', 'Android', '2.6.0');

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'ArenaX.apk';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const installSteps = [
    { num: '01', title: 'Download APK', desc: 'Tap Download Direct APK to save v2.6.0.' },
    { num: '02', title: 'Allow Source', desc: 'Enable unknown app installation in browser settings.' },
    { num: '03', title: 'Install Package', desc: 'Open the installer package and confirm.' },
    { num: '04', title: 'Link UID & Play', desc: 'Enter referral code for 25 AX bonus and join scrims.' },
  ];

  return (
    <section
      id="download"
      className="py-[clamp(80px,10vw,140px)] bg-[#121212] border-b border-white/[0.08] relative overflow-hidden"
      aria-label="Download ArenaX Mobile Client"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Giant ARENAX Echo of Hero Typography */}
        <div className="text-center mb-10 select-none pointer-events-none">
          <span className="text-[14vw] font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/15 via-white/5 to-transparent font-heading whitespace-nowrap block">
            ARENA<span className="text-[#3ECF8E]/30">X</span>
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-14 -mt-10 sm:-mt-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
            Download <span className="text-[#3ECF8E]">ArenaX</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mx-auto mt-3 leading-relaxed">
            Get started in seconds. Download our official Android application and start competing in Free Fire tournaments today.
          </p>
        </div>

        {/* Dual Release Cards: Android Primary & iOS Secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 relative isolate">
          {/* Subtle atmospheric glow behind the primary card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 top-0 h-[350px] w-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.08)_0%,rgba(62,207,142,0)_70%)]"
          />

          {/* Card 1: Android APK (Highlighted Card) */}
          <div className="relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_20px_48px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Android Client</h3>
                    <span className="text-xs font-mono text-[#3ECF8E] tabular-nums tracking-tight">Package: com.arenax.app</span>
                  </div>
                </div>
                <Badge tone="emerald" dot>
                  v2.6.0
                </Badge>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#A0A0A0] mb-8 tabular-nums">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span>Compatible with Android 8.0 through Android 15</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span>Build Size: ~45–55 MB (Native optimized client)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" strokeWidth={1.5} />
                  <span>Google Play Protect compatible & SHA-256 verified</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleDownload}
                icon={<DownloadCloud className="w-5 h-5" strokeWidth={1.5} />}
              >
                Download Direct APK
              </Button>

              {/* QR Code for Desktop Users: scannable, encodes the live APK URL */}
              <div className="hidden sm:flex items-center justify-between p-3.5 rounded-control bg-[#121212] border border-white/[0.08] transition-colors duration-200 hover:border-[#3ECF8E]/30">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-md p-1.5 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                    <QRCodeSVG
                      value={downloadUrl}
                      size={48}
                      level="L"
                      bgColor="#FFFFFF"
                      fgColor="#121212"
                      includeMargin={false}
                      aria-label="QR code: download ArenaX APK on your Android phone"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#EDEDED] block">Scan on Android Phone</span>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-[#3ECF8E]" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Card 2: iOS Client (Muted Secondary Card) */}
          <div className="relative z-10 p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col justify-between opacity-80 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/[0.14]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#181A19] border border-white/[0.08] flex items-center justify-center text-[#707070] flex-shrink-0">
                    <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Apple iOS</h3>
                  </div>
                </div>
                <Badge tone="neutral">Coming Soon</Badge>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#707070] mb-8 tabular-nums">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Apple App Store submission in review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Requires iOS 15.0 or later</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#707070] flex-shrink-0" strokeWidth={1.5} />
                  <span>Cross-platform scrim matchmaking with Android</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="lg" fullWidth disabled>
              Coming Soon for iOS
            </Button>
          </div>
        </div>

        {/* 4 Install Steps as a Simple Numbered Row */}
        <div className="p-6 sm:p-8 rounded-card bg-[#171717] border border-white/[0.08] max-w-4xl mx-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {installSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-control bg-[#121212] border border-white/[0.08] flex flex-col justify-between transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-[#3ECF8E]/30 hover:bg-[#181A19]"
              >
                <span className="text-xs font-mono font-bold text-[#3ECF8E] tabular-nums tracking-tight mb-2">/{step.num}</span>
                <div>
                  <h4 className="text-sm font-bold text-[#EDEDED] font-heading mb-1">{step.title}</h4>
                  <p className="text-xs text-[#A0A0A0] leading-relaxed tabular-nums">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
```

---

## 6. Mathematical, Functional & Invariant Verification Protocols

### 6.1 Mathematical Invariant Invariants Across the 3 Components
1. **HowItWorks Step Range**: Step indices range strictly `01` through `06`. Total count is 6.
2. **PlatformComparison Dimension Invariant**: Exactly 6 evaluation dimensions comparing 2 distinct platforms (`ArenaX Official Client` vs `Informal WhatsApp / Social Scrims`).
3. **Download Steps Range**: Step indices range strictly `01` through `04`. Total count is 4.
4. **QR Code Dimension & Payload**: SVG rendered at `size={48}`, encoding exact string `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk`.
5. **Analytics Payload**: `trackDownload('ArenaX.apk', 'Android', '2.6.0')` with exact 3-argument tuple.

### 6.2 Independent Test Suite Verification Commands
The Worker can execute these commands directly to verify full build and invariant compliance:

```powershell
# 1. TypeScript Strict Typecheck
npm run typecheck

# 2. ESLint Code Analysis
npm run lint

# 3. Clean Vite Production Build (clean dist first to prevent Windows file lock)
if (Test-Path dist) { Remove-Item -Recurse -Force dist }; npm run build

# 4. Comprehensive Test Invariant Suite
if (Test-Path dist) { Remove-Item -Recurse -Force dist }; npm test
```
