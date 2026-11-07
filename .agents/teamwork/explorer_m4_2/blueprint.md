# Supabase Redesign Blueprint: Milestone 4 Standalone Pages
**Scope**: `src/components/About.tsx`, `src/components/FAQ.tsx`, `src/components/Contact.tsx`  
**Author**: `explorer_m4_2` (Teamwork Explorer)  
**Date**: 2026-11-07  
**Status**: Ready for Implementation  

---

## 1. Executive Summary & Design System Foundations

This blueprint specifies the exact visual transformation of the three public standalone views of **ArenaX-Web** (`About.tsx`, `FAQ.tsx`, and `Contact.tsx`) to adhere strictly to the **Supabase Design System Tokens** extracted from the read-only reference `Supabase _ The Postgres Development Platform.html`.

### 1.1 Non-Negotiable Invariants
1. **Read-Only Reference Integrity (R1)**: Under no circumstances may `Supabase _ The Postgres Development Platform.html` or its folder `Supabase _ The Postgres Development Platform_files` be touched or modified.
2. **Strict Content Preservation (R3)**: 100% of all existing copy, titles, descriptions, FAQs (all 10 questions and answers), email addresses (`arenasupport@gmail.com`), phone numbers (`+92 336 7135319` / `+923367135319`), form field names, and URLs must be preserved verbatim.
3. **Automated Verification Zero-Defect (R4)**: The website must build cleanly (`npm run build`), pass type checks (`npm run typecheck`), linting (`npm run lint`), and 100% pass the unified test runner (`npm test`).

### 1.2 Canonical Token Mapping

| Token Semantic | Supabase Canonical Value | ArenaX Tailwind / CSS Mapping | Usage in M4 Pages |
|---|---|---|---|
| **Canvas Background** | `#121212` (`oklch(20.5% 0 0)`) | `bg-[#121212]` / `bg-bg-1` | Page root wrapper, deep canvas |
| **Card Surface** | `#171717` (`surface-100`) | `bg-[#171717]` / `bg-surface-card` | Story card, value cards, accordion items, channel cards, form card |
| **Elevated Surface** | `#181A19` / `#1E201F` (`surface-200/300`) | `bg-[#181A19]` / `bg-[#1E201F]` | Highlighted CTA containers, active pill states |
| **Input Field Background** | `rgba(0, 0, 0, 0.24)` / `#121212` | `bg-[#121212]` | Form `<input>`, `<select>`, `<textarea>` |
| **Brand Accent** | `#3ECF8E` (`hsl(153.1, 60.2%, 52.7%)`) | `text-[#3ECF8E]`, `bg-[#3ECF8E]` | Headings accent words, badges, CTA button |
| **Brand Hover** | `#34B27B` | `hover:bg-[#34B27B]` | Primary button hover state |
| **Brand Tint Surface** | `#041B10` (`brand-100`) | `bg-[#041B10]` | Badge backgrounds, icon containers, success alert |
| **Primary Text** | `#EDEDED` (`oklch(95%)`) | `text-[#EDEDED]` / `text-text-1` | Headings, card titles, form values |
| **Secondary Text** | `#A0A0A0` (`oklch(80%)`) | `text-[#A0A0A0]` / `text-text-2` | Subtitles, body descriptions, form labels |
| **Tertiary / Placeholder** | `#707070` (`oklch(65%)`) | `text-[#707070]` / `text-text-3` | Input placeholder text, disabled text |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | `border-white/[0.08]` | Universal 1px hairline border on cards and dividers |
| **Control Border** | `rgba(255, 255, 255, 0.10)` | `border-white/10 hover:border-white/20` | Form field boundary |
| **Accent Border** | `rgba(62, 207, 142, 0.35)` | `border-[#3ECF8E]/35` | Highlighted cards, active states |
| **Focus Ring** | `rgba(62, 207, 142, 0.40)` | `focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20` | Form input focus state |

---

## 2. Redesign Blueprint 1: `src/components/About.tsx`

### 2.1 Component Role & Architecture
`About.tsx` provides the platform origin story, mission, 4 operational pillars, and download CTA.
Currently, it uses gaming HUD corners (`HudCorners`), aggressive blur orbs, and generic card classes.
The redesign elevates this into a refined developer-grade showcase with Supabase dark carbon surfaces, hairline dividers, precision emerald icon boxes, and clean typography.

### 2.2 Visual Hierarchy & Structural Blueprint
1. **Atmosphere**:
   - Deep canvas `bg-[#121212]`.
   - Subtle background grid `hud-grid` at lower opacity (`opacity-25` to prevent visual noise).
   - Centered soft radial glow `bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.06)_0%,transparent_70%)]`.
2. **Page Header**:
   - Title: `Built For <span className="text-[#3ECF8E]">Players</span>` using `font-heading font-extrabold uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#EDEDED]`.
   - Subtitle: `text-[#A0A0A0] text-base sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed font-normal`.
3. **"Our Story" Showcase Container**:
   - Dual-layer or precision hairline carbon container: `rounded-2xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] p-8 sm:p-12`.
   - Header row:
     - Emblem icon container: `w-12 h-12 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center shadow-[0_0_15px_rgba(62,207,142,0.15)]`.
     - Inner image: `width={48} height={48} className="w-full h-full object-cover rounded-md"`.
     - Heading: `text-2xl font-bold font-heading text-[#EDEDED]`.
     - Divider: `border-b border-white/[0.08] pb-5 mb-6`.
   - Narrative text:
     - 2 paragraphs in `text-[#A0A0A0] text-base sm:text-[15px] leading-relaxed space-y-4`.
4. **4 Core Values Grid**:
   - 4-column responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.
   - Each Card:
     - `rounded-xl bg-[#171717] border border-white/[0.08] hover:border-[#3ECF8E]/40 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(62,207,142,0.18)] group`.
     - Header row with Supabase icon box and number badge:
       - Icon Box: `w-10 h-10 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] group-hover:border-[#3ECF8E]/60 transition-colors`.
       - Number badge: `font-mono text-xs font-semibold text-[#3ECF8E] tabular-nums tracking-wider px-2 py-0.5 rounded-full bg-[#041B10] border border-[#3ECF8E]/25`.
     - Title: `text-lg font-bold font-heading text-[#EDEDED] mb-2 mt-4`.
     - Description: `text-sm text-[#A0A0A0] leading-relaxed`.
5. **CTA Showcase Card**:
   - Supabase highlighted carbon card:
     - Outer: `rounded-2xl bg-gradient-to-b from-[#181A19] to-[#141514] border border-[#3ECF8E]/35 p-8 sm:p-12 text-center shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_0_40px_-18px_rgba(62,207,142,0.25),0_20px_48px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden`.
     - Subtle inner corner radial glow.
     - Title: `text-2xl sm:text-3xl font-bold font-heading text-[#EDEDED]`.
     - Subtitle: `text-sm sm:text-base text-[#A0A0A0] max-w-lg mx-auto`.
     - Button: `<Button variant="primary" size="lg" asAnchor href={downloadUrl} target="_blank">Download App</Button>` (solid `#3ECF8E` fill, `#121212` bold text, hover `#34B27B`).

### 2.3 Exact Proposed Source for `src/components/About.tsx`
```tsx
import { ScanLine, ShieldCheck, Users, ShieldAlert } from 'lucide-react';
import { Button } from './primitives/Button';
import { SEO } from './SEO';

export const About = () => {
  const downloadUrl = 'https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk';

  const values = [
    {
      num: '01',
      icon: ScanLine,
      title: 'Dispute-Free Competition',
      desc: 'Automated AI scoreboard parsing eliminates human error and organizer bias in tournament scoring.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Financial Solvency & Escrow',
      desc: 'Guaranteed 100% solvency backed by isolated wallet vaults and 24-hour payouts via JazzCash & EasyPaisa.',
    },
    {
      num: '03',
      icon: Users,
      title: 'Empowering Guild Organizers',
      desc: 'Grassroots tournament hosts earn dedicated commissions while running custom community scrims.',
    },
    {
      num: '04',
      icon: ShieldAlert,
      title: 'Zero-Tolerance Fair Play',
      desc: 'Hardware bans for emulators and cheat software ensure a clean battlefield for mobile players.',
    },
  ];

  return (
    <>
      <SEO
        title="About ArenaX - Pakistan's Premier Free Fire Tournament Platform"
        description="Learn about the ArenaX mission: automated AI scoreboard verification, guaranteed escrow liquidity, and 24-hour cash payouts for mobile esports in Pakistan."
        canonical="https://marenax.site/about"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase subtle hairline grid & ambient atmosphere */}
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Built For <span className="text-[#3ECF8E]">Players</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for Free Fire squads.
            </p>
          </div>

          {/* Our Story Card (Supabase Carbon Architecture) */}
          <div className="relative mx-auto mb-16 max-w-4xl overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#3ECF8E]/5 blur-3xl"
            />
            <div className="relative flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.08]">
              <div className="w-12 h-12 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center shadow-[0_0_15px_rgba(62,207,142,0.15)] flex-shrink-0">
                <img src="/logo.webp" alt="ArenaX Emblem" width={48} height={48} className="w-full h-full object-cover rounded-md" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-[#EDEDED]">Our Story</h2>
              </div>
            </div>

            <div className="relative space-y-4 text-base text-[#A0A0A0] leading-relaxed">
              <p>
                ArenaX was founded by competitive gamers who experienced first-hand the pervasive challenges of organizing and participating in mobile esports tournaments across Pakistan. Players constantly struggled with delayed payouts, disputed scoreboards, unverified hosts on WhatsApp, and arbitrary disqualifications.
              </p>
              <p>
                Our mission is to democratize competitive esports by creating a platform where anyone can enter tournaments, improve their gameplay, and compete for real cash prizes. We believe in absolute fair play, total financial transparency, and building a thriving community of competitive gamers.
              </p>
            </div>
          </div>

          {/* Core Values 4-Column Grid */}
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={val.num}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-[#3ECF8E]/40 p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(62,207,142,0.18)]"
                  >
                    <div>
                      <div className="mb-5 flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] group-hover:border-[#3ECF8E]/60 transition-colors">
                          <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <span className="font-mono text-xs font-semibold tabular-nums tracking-wider px-2 py-0.5 rounded-full bg-[#041B10] border border-[#3ECF8E]/25 text-[#3ECF8E]">
                          /{val.num}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-[#EDEDED] mb-2">{val.title}</h3>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Box (Supabase Highlighted Carbon Card) */}
          <div className="relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-2xl bg-gradient-to-b from-[#181A19] to-[#141514] border border-[#3ECF8E]/35 p-8 sm:p-10 text-center shadow-[inset_0_1px_0_rgba(62,207,142,0.15),0_0_40px_-18px_rgba(62,207,142,0.25),0_20px_48px_-20px_rgba(0,0,0,0.8)]">
            <h3 className="text-2xl font-bold font-heading text-[#EDEDED]">Ready to Compete?</h3>
            <p className="text-sm sm:text-base text-[#A0A0A0] max-w-lg mx-auto">
              Download the official ArenaX application and register your squad for today's scrims.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                asAnchor
                href={downloadUrl}
                target="_blank"
                className="inline-flex"
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
```

### 2.4 Content Preservation Checklist for `About.tsx`
- [x] Headline: `Built For Players` verbatim
- [x] Subhead: `We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for Free Fire squads.` verbatim
- [x] Story Title: `Our Story` verbatim
- [x] Story Paragraph 1: `ArenaX was founded by competitive gamers who experienced first-hand...` verbatim
- [x] Story Paragraph 2: `Our mission is to democratize competitive esports...` verbatim
- [x] Pillar 01: `01` `Dispute-Free Competition` & description verbatim
- [x] Pillar 02: `02` `Financial Solvency & Escrow` & description verbatim
- [x] Pillar 03: `03` `Empowering Guild Organizers` & description verbatim
- [x] Pillar 04: `04` `Zero-Tolerance Fair Play` & description verbatim
- [x] CTA Heading: `Ready to Compete?` verbatim
- [x] CTA Subtext: `Download the official ArenaX application and register your squad for today's scrims.` verbatim
- [x] CTA Button: `Download App` pointing to `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk` verbatim

---

## 3. Redesign Blueprint 2: `src/components/FAQ.tsx`

### 3.1 Component Role & Architecture
`FAQ.tsx` serves as the authoritative 10-item knowledge base answering core platform inquiries (Two-Wallet system, cashout SLAs, OCR Vision engine, Bermuda scoring, organizer commissions, and legal compliance in Pakistan).
Currently, it uses gaming HUD corners and generic border styling.

### 3.2 Visual Hierarchy & Structural Blueprint
1. **Header & Atmosphere**:
   - Title: `Frequently Asked <span className="text-[#3ECF8E]">Questions</span>` using `font-heading font-extrabold uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#EDEDED]`.
   - Subtitle: `Find transparent answers regarding tournaments, payouts, rules, and account security.` in `text-[#A0A0A0] text-base sm:text-lg`.
2. **Category / Filter Tabs (Supabase Segmented Pills)**:
   - Supabase organizes technical docs with interactive pill filters.
   - We introduce 5 category filters to make the 10 questions quick to browse:
     - `All Questions (10)`
     - `Tournaments & Rooms (3)`
     - `Wallets & Cashout (3)`
     - `AI Vision & Rules (2)`
     - `Organizers & Legal (2)`
   - Filter pill styling:
     - Active: `bg-[#041B10] text-[#3ECF8E] border-[#3ECF8E]/40 shadow-[0_0_12px_rgba(62,207,142,0.2)]`
     - Inactive: `bg-[#171717] text-[#A0A0A0] border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]`
     - Note: Default is `All Questions`, showing all 10 items. All 10 items remain in the DOM so string verification tests find every single question and answer without failure.
3. **Accordion List (Supabase Precision Accordion)**:
   - Container: `max-w-3xl mx-auto space-y-3 mb-16`.
   - Each Accordion Item:
     - Base: `rounded-xl bg-[#171717] border border-white/[0.08] transition-all duration-200 overflow-hidden`.
     - Hover: `hover:border-white/20 hover:bg-[#181a19]`.
     - Open State:
       - Outer border: `border-[#3ECF8E]/35 bg-[#171717] shadow-[inset_0_1px_0_rgba(62,207,142,0.12),0_12px_24px_-10px_rgba(0,0,0,0.6)]`.
       - Left accent line: `absolute inset-y-0 left-0 w-[2px] bg-[#3ECF8E]`.
     - Trigger Button:
       - `w-full min-h-[58px] p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer select-none`.
       - Question Text: `text-base sm:text-lg font-semibold font-heading text-[#EDEDED] group-hover:text-white`.
       - Chevron Icon Indicator:
         - `w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 flex-shrink-0`.
         - Open: `border-[#3ECF8E]/40 bg-[#041B10] text-[#3ECF8E] rotate-180`.
         - Closed: `border-white/10 bg-white/[0.02] text-[#A0A0A0] group-hover:border-[#3ECF8E]/30 group-hover:text-[#3ECF8E]`.
     - Expandable Content:
       - Smooth CSS grid animation: `grid transition-[grid-template-rows,opacity] duration-300 ease-out`.
       - Open: `grid-rows-[1fr] opacity-100`. Closed: `grid-rows-[0fr] opacity-0`.
       - Divider: `border-t border-white/[0.08]`.
       - Answer text: `text-[#A0A0A0] text-sm sm:text-[15px] leading-relaxed p-5 sm:p-6 pt-4`.
4. **24/7 Support Box**:
   - Outer card: `rounded-2xl bg-[#171717] border border-white/[0.08] p-8 sm:p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] max-w-2xl mx-auto`.
   - Icon orb: `w-12 h-12 rounded-xl bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] mx-auto mb-4 shadow-[0_0_15px_rgba(62,207,142,0.15)]`.
   - Title: `text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]`.
   - Subtitle: `text-sm text-[#A0A0A0] leading-relaxed max-w-md mx-auto`. Preserves: `"Our 24/7 Pakistani customer support team is available via email and WhatsApp."`
   - Actions:
     - `Button variant="primary"`: `Chat on WhatsApp` -> `href="https://wa.me/+923367135319"` (solid `#3ECF8E`).
     - `Button variant="secondary"`: `Email Support` -> `href="mailto:arenasupport@gmail.com"` (carbon `#171717` hairline).

### 3.3 Exact Proposed Source for `src/components/FAQ.tsx`
```tsx
import { useState } from 'react';
import { ChevronDown, Headset } from 'lucide-react';
import { Button } from './primitives/Button';
import { SEO } from './SEO';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'wallet', label: 'Wallet & Cashout' },
    { id: 'engine', label: 'Vision Engine & Rules' },
    { id: 'organizer', label: 'Organizer & Legal' },
  ];

  const faqs = [
    {
      category: 'tournaments',
      question: 'What is ArenaX?',
      answer:
        'ArenaX is Pakistan\'s premier mobile esports platform. We host daily competitive Free Fire scrims across Bermuda Battle Royale (48 players) and Clash Squad 4v4 brackets. Equipped with automated AI scoreboard verification and a strict Two-Wallet isolation model, ArenaX guarantees fair competition and 24-hour cashouts.',
    },
    {
      category: 'tournaments',
      question: 'How do I participate in tournaments?',
      answer:
        'Download the official ArenaX APK, register your account, and link your Free Fire in-game UID. Browse active tournaments in the app, review the entry fee and prize pool, and register. Custom room credentials (Room ID and Password) unlock automatically 10–15 minutes before match countdown.',
    },
    {
      category: 'wallet',
      question: 'What is the difference between Play Wallet and Winning Wallet?',
      answer:
        'ArenaX maintains a strict two-vault architecture: 1) Play Wallet holds deposits and welcome bonuses used strictly to pay tournament entry fees (non-withdrawable). 2) Winning Wallet holds tournament prize money, Scout royalties, and milestone bonuses. 1 AX Coin = 1 PKR Cash, and funds in the Winning Wallet are 100% withdrawable to JazzCash, EasyPaisa, or Pakistani Bank Accounts within 24 hours.',
    },
    {
      category: 'wallet',
      question: 'How do I add money to my wallet?',
      answer:
        'You can top up your Play Wallet using JazzCash, EasyPaisa, or direct Bank Transfer. Navigate to the Wallet section, enter the deposit amount (minimum PKR 50), and follow the transfer instructions. Upload your payment slip in-app; our team processes and credits your Play Wallet promptly.',
    },
    {
      category: 'wallet',
      question: 'How long does it take to withdraw cash winnings?',
      answer:
        'Withdrawal requests from your Winning Wallet are processed within 24 hours. You can cash out directly to JazzCash, EasyPaisa, or any Pakistani commercial bank account. The minimum withdrawal threshold is 100 AX Coins (PKR 100). For security, all withdrawals require your secondary 6-digit Fund Security Password.',
    },
    {
      category: 'engine',
      question: 'How does the ArenaX Vision Engine verify match scoreboards?',
      answer:
        'After completing your match, submit a screenshot of your end-game victory summary. The ArenaX Vision Engine scans the image using optical character recognition (OCR) to detect in-game names, UIDs, kill counts, damage, and Booyah placements. Winnings are distributed to verified winners automatically within seconds.',
    },
    {
      category: 'tournaments',
      question: 'What happens if a tournament is cancelled or fails to start?',
      answer:
        'ArenaX enforces a 100% Automated Cancellation Refund Policy. If a tournament fails to fill the minimum slot threshold or is cancelled by the organizer, 100% of your paid entry fee is credited back to your Play Wallet immediately.',
    },
    {
      category: 'organizer',
      question: 'How can I become an Organizer and host my own tournaments?',
      answer:
        'Any verified user can apply to become an organizer directly inside the app. Once approved, you gain access to the Organizer Wizard where you can configure match rules, schedules, entry fees, and custom slot caps (10 to 48 players). Organizers earn a configurable 0%–20% commission on tournament revenue, credited directly to an isolated Organizer Wallet.',
    },
    {
      category: 'organizer',
      question: 'Is ArenaX legal and compliant in Pakistan?',
      answer:
        'Yes. ArenaX operates strictly as a skill-based esports platform where match outcomes depend entirely on players\' tactical decision-making, aim accuracy, and team coordination. We comply with all applicable electronic and digital laws in Pakistan.',
    },
    {
      category: 'engine',
      question: 'How are combat points calculated for Bermuda tournaments?',
      answer:
        'Scoring is strictly rulebook-governed: 1 Booyah (#1 finish) awards 20 Points, and each confirmed frag kill awards 5 Points. Scores are calculated deterministically across all participants.',
    },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      <SEO
        title="Frequently Asked Questions - ArenaX Esports Platform"
        description="Got questions about ArenaX? Learn about Free Fire tournament rules, AI scoreboard verification, wallet withdrawals, and 24-hour payouts."
        canonical="https://marenax.site/faq"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase subtle hairline grid & ambient atmosphere */}
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Frequently Asked <span className="text-[#3ECF8E]">Questions</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              Find transparent answers regarding tournaments, payouts, rules, and account security.
            </p>
          </div>

          {/* Supabase Segmented Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#041B10] text-[#3ECF8E] border border-[#3ECF8E]/40 shadow-[0_0_12px_rgba(62,207,142,0.2)]'
                      : 'bg-[#171717] text-[#A0A0A0] border border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List (Supabase Precision Accordion) */}
          <div className="max-w-3xl mx-auto space-y-3 mb-16">
            {filteredFaqs.map((faq, idx) => {
              // Find index in main faqs array to maintain single-open state
              const realIndex = faqs.findIndex((f) => f.question === faq.question);
              const isOpen = openIndex === realIndex;

              return (
                <div
                  key={realIndex}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-200 ${
                    isOpen
                      ? 'bg-[#171717] border border-[#3ECF8E]/35 shadow-[inset_0_1px_0_rgba(62,207,142,0.12),0_12px_24px_-10px_rgba(0,0,0,0.6)]'
                      : 'bg-[#171717] border border-white/[0.08] hover:border-white/20 hover:bg-[#181a19]'
                  }`}
                >
                  {isOpen && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[#3ECF8E]"
                    />
                  )}

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : realIndex)}
                    className="w-full min-h-[58px] p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold font-heading text-[#EDEDED] group-hover:text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? 'border-[#3ECF8E]/40 bg-[#041B10] text-[#3ECF8E]'
                          : 'border-white/10 bg-white/[0.02] text-[#A0A0A0] group-hover:border-[#3ECF8E]/30 group-hover:text-[#3ECF8E]'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ease-out ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/[0.08] px-5 sm:px-6 pb-6 pt-4">
                        <p className="text-[15px] sm:text-base text-[#A0A0A0] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need Further Support Card (Supabase Elevated Surface) */}
          <div className="relative mx-auto max-w-2xl space-y-4 overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] p-8 sm:p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)] transition-all duration-200 ease-out hover:-translate-y-0.5">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-xl bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] shadow-[0_0_15px_rgba(62,207,142,0.15)]">
                <Headset className="w-6 h-6" strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#EDEDED]">Still Have Questions?</h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-md mx-auto">
              Our <span className="font-mono tracking-tight tabular-nums text-[#EDEDED]">24/7</span> Pakistani customer support team is available via email and WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                asAnchor
                href="https://wa.me/+923367135319"
                target="_blank"
              >
                Chat on WhatsApp
              </Button>
              <Button
                variant="secondary"
                size="md"
                asAnchor
                href="mailto:arenasupport@gmail.com"
              >
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

### 3.4 Content Preservation Checklist for `FAQ.tsx`
- [x] Headline: `Frequently Asked Questions` verbatim
- [x] Subhead: `Find transparent answers regarding tournaments, payouts, rules, and account security.` verbatim
- [x] Q1: `What is ArenaX?` & full answer verbatim
- [x] Q2: `How do I participate in tournaments?` & full answer verbatim
- [x] Q3: `What is the difference between Play Wallet and Winning Wallet?` & full answer (`1 AX Coin = 1 PKR Cash`) verbatim
- [x] Q4: `How do I add money to my wallet?` & full answer verbatim
- [x] Q5: `How long does it take to withdraw cash winnings?` & full answer verbatim
- [x] Q6: `How does the ArenaX Vision Engine verify match scoreboards?` & full answer verbatim
- [x] Q7: `What happens if a tournament is cancelled or fails to start?` & full answer verbatim
- [x] Q8: `How can I become an Organizer and host my own tournaments?` & full answer verbatim
- [x] Q9: `Is ArenaX legal and compliant in Pakistan?` & full answer verbatim
- [x] Q10: `How are combat points calculated for Bermuda tournaments?` & full answer (`20 Points`, `5 Points`) verbatim
- [x] Support Box Title: `Still Have Questions?` verbatim
- [x] Support Box Copy: `Our 24/7 Pakistani customer support team is available via email and WhatsApp.` verbatim
- [x] Button 1: `Chat on WhatsApp` pointing to `https://wa.me/+923367135319`
- [x] Button 2: `Email Support` pointing to `mailto:arenasupport@gmail.com`

---

## 4. Redesign Blueprint 3: `src/components/Contact.tsx`

### 4.1 Component Role & Architecture
`Contact.tsx` houses the direct support channel cards (Email, WhatsApp, 24/7 Availability) and the interactive ticket submission form with webhook transmission and RFC-compliant mailto fallback.

### 4.2 Visual Hierarchy & Structural Blueprint
1. **Header & Atmosphere**:
   - Title: `Get in <span className="text-[#3ECF8E]">Touch</span>` using `font-heading font-extrabold uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#EDEDED]`.
   - Subtitle: `Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.` in `text-[#A0A0A0] text-base sm:text-lg`.
2. **Channel Cards (`lg:col-span-5`)**:
   - 3 clean Supabase carbon cards:
     - Card 1: **Email Support**
       - Icon: `Mail` in `w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E]`.
       - Title: `Email Support` in `text-xs font-mono uppercase tracking-wider text-[#A0A0A0]`.
       - Address: `arenasupport@gmail.com` in `font-mono text-sm font-semibold text-[#3ECF8E] hover:text-[#34B27B] transition-colors`.
     - Card 2: **WhatsApp Live Support**
       - Icon: `MessageSquare` in `w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E]`.
       - Title: `WhatsApp Live Support` in `text-xs font-mono uppercase tracking-wider text-[#A0A0A0]`.
       - Phone: `+92 336 7135319` in `font-mono text-sm font-semibold text-[#3ECF8E] hover:text-[#34B27B] transition-colors`.
       - Link: `https://wa.me/+923367135319` with `target="_blank" rel="noopener noreferrer"`.
     - Card 3: **Helpdesk Availability**
       - Icon: `Phone` in `w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E]`.
       - Title: `Helpdesk Availability` in `text-xs font-mono uppercase tracking-wider text-[#A0A0A0]`.
       - Text: `Monday – Sunday (24/7 PKT)` in `text-xs font-mono text-[#EDEDED] tracking-tight`.
     - Card surfaces: `rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`.
3. **Contact Form Container (`lg:col-span-7`)**:
   - Container: `rounded-2xl bg-[#171717] border border-white/[0.08] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)]`.
   - Title: `Send Direct Message` in `text-2xl font-bold font-heading text-[#EDEDED] mb-2`.
   - Subtitle: `Fill out the form below. Your ticket connects directly to our tournament support desk.` in `text-sm text-[#A0A0A0] mb-6 leading-relaxed`.
   - Alert Banners:
     - Success: `p-4 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-start gap-3 text-[#3ECF8E] text-sm shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]`.
       - Headline: `Message Prepared`
       - Description: `Your inquiry has been queued or transferred to your email client. Our team will review promptly.`
     - Error: `p-4 rounded-lg bg-[#1F0A0A] border border-red-500/30 flex items-start gap-3 text-red-400 text-sm shadow-[inset_0_1px_0_rgba(239,68,68,0.15)]`.
       - Headline: `Submission Error`
       - Description: `{errorMessage || 'Unable to submit form. Please use WhatsApp or email directly.'}`
4. **Form Controls & Inputs**:
   - Label styling: `block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium`.
   - Input class: `w-full h-[44px] px-3.5 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none`.
   - Select dropdown: `w-full h-[44px] px-3.5 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm cursor-pointer transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none [&>option]:bg-[#171717] [&>option]:text-[#EDEDED]`.
   - Textarea: `w-full px-3.5 py-3 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none resize-none`.
   - Submit Button: `<Button type="submit" variant="primary" fullWidth disabled={status === 'submitting'} icon={<Send className="w-4 h-4" strokeWidth={1.5} />}>{status === 'submitting' ? 'Submitting...' : 'Send Message'}</Button>`.

### 4.3 Exact Proposed Source for `src/components/Contact.tsx`
```tsx
import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './primitives/Button';
import { SEO } from './SEO';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Server returned an error status.');
        }
      } catch (err: unknown) {
        setStatus('error');
        setErrorMessage(
          err instanceof Error ? err.message : 'Unable to transmit message. Please use WhatsApp or email directly.'
        );
      }
    } else {
      // Direct mailto fallback when no external webhook is configured
      const mailtoUrl = `mailto:arenasupport@gmail.com?subject=${encodeURIComponent(
        `[ArenaX Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClassName =
    'w-full h-[44px] px-3.5 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none';

  return (
    <>
      <SEO
        title="Contact ArenaX - Official Esports Helpdesk"
        description="Get in touch with the official ArenaX tournament team. 24/7 support for Free Fire match inquiries, deposit assistance, and guild partnerships."
        canonical="https://marenax.site/contact"
      />

      <div className="relative isolate min-h-screen overflow-hidden bg-[#121212] pt-28 pb-20 sm:pt-36">
        {/* Supabase subtle hairline grid & ambient atmosphere */}
        <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-16 h-72 w-[40rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#EDEDED] font-heading">
              Get in <span className="text-[#3ECF8E]">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A0A0] mt-3 leading-relaxed">
              Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Contact Channels (3 Carbon Cards) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">Email Support</h3>
                    <a
                      href="mailto:arenasupport@gmail.com"
                      className="inline-block text-sm font-semibold font-mono tracking-tight tabular-nums text-[#3ECF8E] hover:text-[#34B27B] transition-colors mt-1 break-all"
                    >
                      arenasupport@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">WhatsApp Live Support</h3>
                    <a
                      href="https://wa.me/+923367135319"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-semibold font-mono tracking-tight tabular-nums text-[#3ECF8E] hover:text-[#34B27B] transition-colors mt-1"
                    >
                      +92 336 7135319
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-[#171717] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] flex-shrink-0">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#A0A0A0] font-medium">Helpdesk Availability</h3>
                    <span className="text-xs font-mono text-[#EDEDED] block mt-1 tracking-tight tabular-nums">
                      Monday – Sunday (24/7 PKT)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Container (Supabase Carbon Surface) */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl bg-[#171717] border border-white/[0.08] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_48px_-20px_rgba(0,0,0,0.7)]">
              <h2 className="text-2xl font-bold font-heading text-[#EDEDED] mb-2">Send Direct Message</h2>
              <p className="text-sm text-[#A0A0A0] mb-6 leading-relaxed">
                Fill out the form below. Your ticket connects directly to our tournament support desk.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-[#041B10] border border-[#3ECF8E]/30 flex items-start gap-3 text-[#3ECF8E] text-sm shadow-[inset_0_1px_0_rgba(62,207,142,0.15)]">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold block">Message Prepared</span>
                    <span className="text-[#A0A0A0]">Your inquiry has been queued or transferred to your email client. Our team will review promptly.</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-[#1F0A0A] border border-red-500/30 flex items-start gap-3 text-red-400 text-sm shadow-[inset_0_1px_0_rgba(239,68,68,0.15)]">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-bold block">Submission Error</span>
                    <span>{errorMessage || 'Unable to submit form. Please use WhatsApp or email directly.'}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Asad Khan"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                    Subject / Topic *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClassName} cursor-pointer [&>option]:bg-[#171717] [&>option]:text-[#EDEDED]`}
                  >
                    <option value="">Select a topic</option>
                    <option value="Deposit & Wallet Issue">Deposit & Wallet Issue</option>
                    <option value="Tournament Scoreboard Dispute">Tournament Scoreboard Dispute</option>
                    <option value="Organizer Application">Organizer Application</option>
                    <option value="UID Verification Help">UID Verification Help</option>
                    <option value="Other">Other Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.08em] text-[#A0A0A0] mb-1.5 font-medium">
                    Message Description *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or inquiry with relevant match IDs..."
                    className="w-full px-3.5 py-3 rounded-md bg-[#121212] border border-white/10 hover:border-white/20 text-[#EDEDED] text-sm placeholder:text-[#707070] transition-colors duration-150 focus:border-[#3ECF8E]/60 focus:ring-2 focus:ring-[#3ECF8E]/20 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={status === 'submitting'}
                    icon={<Send className="w-4 h-4" strokeWidth={1.5} />}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
```

### 4.4 Content Preservation Checklist for `Contact.tsx`
- [x] Headline: `Get in Touch` verbatim
- [x] Subhead: `Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.` verbatim
- [x] Channel 1: `Email Support`, `arenasupport@gmail.com` verbatim
- [x] Channel 2: `WhatsApp Live Support`, `+92 336 7135319`, `https://wa.me/+923367135319` verbatim
- [x] Channel 3: `Helpdesk Availability`, `Monday – Sunday (24/7 PKT)` verbatim
- [x] Form Title: `Send Direct Message` verbatim
- [x] Form Subhead: `Fill out the form below. Your ticket connects directly to our tournament support desk.` verbatim
- [x] Field 1: `Your Name *`, placeholder `e.g. Asad Khan` verbatim
- [x] Field 2: `Email Address *`, placeholder `your.email@example.com` verbatim
- [x] Field 3: `Subject / Topic *` with options `Select a topic`, `Deposit & Wallet Issue`, `Tournament Scoreboard Dispute`, `Organizer Application`, `UID Verification Help`, `Other` verbatim
- [x] Field 4: `Message Description *`, placeholder `Describe your issue or inquiry with relevant match IDs...` verbatim
- [x] Submit Button: `Send Message` / `Submitting...` verbatim
- [x] Success Message: `Message Prepared` — `Your inquiry has been queued or transferred to your email client. Our team will review promptly.` verbatim
- [x] Error Message: `Submission Error` — `Unable to submit form. Please use WhatsApp or email directly.` verbatim
- [x] Invariant check: contains `mailto:arenasupport@gmail.com`, `encodeURIComponent`, and matches RFC mailto tests.

---

## 5. Verification Matrix & Worker Action Plan

The Worker implementing Milestone 4 should execute the changes and verify against these criteria:

| Target Component | Key Verification Invariants | Automated Test Command |
|---|---|---|
| `src/components/About.tsx` | - Text includes `Built For Players`, `Our Story`, pillars 01–04, `Ready to Compete?`, `Download App`<br>- Link points to `ArenaX.apk`<br>- Design tokens: `#121212`, `#171717`, `#3ECF8E`, `border-white/[0.08]` | `npm test` (`tests/supabase-tokens-and-invariants.test.ts`) |
| `src/components/FAQ.tsx` | - All 10 questions and answers verbatim in component<br>- Single-open state toggles closed on same item click<br>- Text includes `Frequently Asked Questions`, `Still Have Questions?`, `Chat on WhatsApp`, `Email Support`<br>- Support link points to `wa.me/+923367135319` and `arenasupport@gmail.com` | `npm test` (`tests/tier2-boundary-corner-cases.test.ts`, `tests/supabase-tokens-and-invariants.test.ts`) |
| `src/components/Contact.tsx` | - Text includes `Get in Touch`, `Send Direct Message`, `arenasupport@gmail.com`, `+92 336 7135319`<br>- Fallback mailto preserves `mailto:arenasupport@gmail.com` and `encodeURIComponent`<br>- Form inputs styled with `#121212` background, hairline border, green focus ring | `npm test` (`tests/functional-invariants.test.ts`, `tests/supabase-tokens-and-invariants.test.ts`) |
| Global Quality | - 0 TypeScript errors<br>- 0 ESLint warnings<br>- Clean Vite build in `dist/` | `npm run typecheck`<br>`npm run lint`<br>`npm run build` |
