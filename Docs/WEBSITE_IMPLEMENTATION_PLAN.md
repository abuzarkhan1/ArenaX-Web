# ArenaX Website Implementation Plan

## 1. Overview & Phased Roadmap

This implementation plan outlines the exact sequence for executing the approved UI/UX upgrade and feature integration without downtime, regressions, or broken links.

Implementation will proceed in **5 sequential, verified stages**:

```
[Stage 1: Design Tokens & Foundations]
       │
       ▼
[Stage 2: Core Layout & Navigation Enhancement]
       │
       ▼
[Stage 3: Verified Feature Components Implementation]
       │
       ▼
[Stage 4: Existing Pages Polish & Legal Rectification]
       │
       ▼
[Stage 5: Comprehensive Verification & Quality Gates]
```

---

## 2. Affected Files & Proposed Modifications

### A. Design Foundations & Global Styles
1. **`tailwind.config.js`**:
   - Extend theme colors with tactical cyber-carbon palette:
     - `carbon.900` (`#101214`), `carbon.800` (`#1B1F22`), `carbon.700` (`#22272B`), `carbon.600` (`#30363A`)
     - `brand.emerald` (`#00C878`), `brand.hover` (`#00A865`), `brand.subtle` (`rgba(0, 200, 120, 0.12)`)
     - `tournament.gold` (`#F59E0B`), `cyan.tactical` (`#00D2FF`)
   - Add custom box shadows and typography extensions.
2. **`src/index.css`**:
   - Rebrand scrollbar to emerald `#00C878` on `#101214`.
   - Add universal `:focus-visible` styling.
   - Add selection highlight colors (`selection:bg-[#00C878]/30 selection:text-white`).
   - Add `@media (prefers-reduced-motion)` utility reset.

### B. Core Navigation & Frame
3. **`src/components/Navbar.jsx`**:
   - Add brand emblem shield with gradient emerald background.
   - Add persistent high-contrast "Download App" CTA button.
   - Expand nav links: Home, Tournaments, Ranks & Rules, Organizers, How It Works, FAQs.
   - Ensure smooth section scrolling for on-page targets and instant top scrolling for standalone pages.
   - Upgrade mobile menu with $\ge 48\text{px}$ touch targets and backdrop blur.
4. **`src/components/Footer.jsx`**:
   - Update copyright year to 2026.
   - Fix support email typo (`arenasupprt@gmail.com` -> `arenasupport@gmail.com`).
   - Replace emoji brand icon with Lucide `Shield` icon.
   - Ensure social links point to verified official handles (Facebook, Instagram, TikTok, YouTube).

### C. Homepage Existing Components Enhancement
5. **`src/components/Hero.jsx`**:
   - Focus copy 100% on Free Fire esports in Pakistan.
   - Retain WebGL Three.js `DotScreenShader` background canvas.
   - Replace dead "Watch Trailer" button with verified secondary action ("Explore Tournaments").
   - Replace unverified player counters with 3 verified value cards:
     1. Google Gemini 2.0 Flash AI Match Verification
     2. 70%–90% Player Prize Pool Guarantee
     3. 100% Automated Cancellation Refunds
6. **`src/components/Features.jsx`**:
   - Update all 6 cards with verified app features (6-digit squad codes, Gemini AI Vision, Two-Wallet isolation, 36-sub-tier ladder, JazzCash & EasyPaisa, daily missions).
   - Replace raw emojis (`🎮`, `⭐`, `🏆`, `💰`) with Lucide SVG icons.
   - Upgrade color tokens to tactical cyber-carbon.
7. **`src/components/Download.jsx`**:
   - Update package metadata (`com.arenax.app`, Android 8.0+, verified release link).
   - Add inline SVG QR code for desktop-to-mobile scanning.
   - Maintain exact GitHub release APK download link.
   - Upgrade 4-step installation timeline with tactical badges and trust certifications.

### D. New Verified Feature Components (Modular Additions)
8. **`src/components/TrustBar.jsx`**:
   - High-impact credibility bar between Hero and Tournaments highlighting Gemini AI, JazzCash & EasyPaisa, 100% Auto-Refund, and Anti-Cheat.
9. **`src/components/TournamentModes.jsx`**:
   - Dual-format interactive switcher: Bermuda 50-Player Battle Royale vs. Clash Squad 4v4 Brackets.
10. **`src/components/AIVisionShowcase.jsx`**:
    - Visual OCR scoreboard scanner workflow + Live Combat Points Calculator (`20 + Kills * 5`).
11. **`src/components/LeaderboardTiers.jsx`**:
    - 36-sub-tier competitive ladder explorer across all 8 major tiers (Bronze through Grandmaster Top 300) with cash milestone rewards.
12. **`src/components/WalletSection.jsx`**:
    - Two-Wallet isolation architecture (Play Wallet vs. Winning Wallet), 1 AX = 1 PKR parity, and secondary fund password security.
13. **`src/components/OrganizerProgram.jsx`**:
    - 4-step organizer workflow, verified 1–5★ review system, and Interactive Organizer Earnings Simulator.
14. **`src/components/HowItWorks.jsx`**:
    - 6-step player journey from APK install to instant cashout.
15. **`src/components/ScoutRewards.jsx`**:
    - Scout program breakdown (25 AX Welcome Bonus, 2% Winner Royalty, Milestone Cash Bonuses) + AX Coin digital store preview.
16. **`src/components/PlatformComparison.jsx`**:
    - 6-point structured comparison matrix (ArenaX vs. WhatsApp / unregulated scrims).

### E. Standalone Pages Enhancement
17. **`src/components/About.jsx`**:
    - Retain founding story, mission, and 4 pillars; replace raw emojis with Lucide icons; update narrative to reflect Free Fire focus and zero-trust fair play.
18. **`src/components/FAQ.jsx`**:
    - Retain all 9 existing FAQs; add 5 new verified questions; fix email typo to `arenasupport@gmail.com`.
19. **`src/components/Contact.jsx`**:
    - Correct support hours from `IST` to `PKT`; fix email typo; connect social channels to official handles; replace emojis with SVG icons.
20. **`src/components/Terms.jsx`**:
    - Overhaul sections 12 & 13: Remove Indian template errors ("Bangalore, Pakistan", "Arbitration Act 1996", "Karnataka courts"); replace with Pakistan Arbitration Act, 1940 and competent courts of Pakistan (Lahore/Islamabad); fix email typo.
21. **`src/App.tsx`**:
    - Wire all new components into the homepage layout sequence:
      `Hero` -> `TrustBar` -> `TournamentModes` -> `AIVisionShowcase` -> `LeaderboardTiers` -> `WalletSection` -> `OrganizerProgram` -> `HowItWorks` -> `ScoutRewards` -> `PlatformComparison` -> `Features` -> `Download`.
    - Update base container to `bg-[#101214]`.

---

## 3. Risk Analysis & Mitigation Strategies

| Risk | Severity | Potential Impact | Mitigation Strategy |
|---|---|---|---|
| **Lenis Scroll Conflicts** | Medium | Anchor links jitter or sticky headers trap scroll. | Use native element scrolling with Lenis listeners; preserve `MutationObserver` on body overflow to pause Lenis when mobile drawer is open. |
| **Three.js WebGL Resource Leak** | Medium | Memory bloat on mobile or after repeated page navigation. | Implement explicit `dispose()` cleanup for geometries, materials, and canvas contexts in `useEffect` cleanup return. |
| **Accidental Content Deletion** | High | Loss of existing user trust, SEO rankings, or contact info. | Follow the strict `WEBSITE_PRESERVATION_INVENTORY.md` checklist; keep all existing routes, copy, and download paths intact. |
| **Bundle Size Bloat** | Low | Slower page load on mobile 4G networks in Pakistan. | Avoid introducing heavy new libraries; use already-installed `lucide-react`, standard CSS transitions, and lightweight SVG assets. |
| **Mobile Slider Usability** | Low | Difficult to drag calculator sliders on small touchscreens. | Set `touch-action: pan-y` and generous slider thumb dimensions ($\ge 24\text{px}$) with numerical readouts. |

---

## 4. Quality Gates & Verification Standards

Before requesting final approval or review, the code must satisfy:
1. **TypeScript Typecheck**: `npm run typecheck` passes with **0 errors**.
2. **ESLint Static Analysis**: `npm run lint` passes with **0 errors and 0 warnings**.
3. **Vite Production Build**: `npm run build` succeeds cleanly with all chunks optimized.
4. **Interactive Verification**:
   - Combat points calculator correctly computes formula `20 + (kills * 5)`.
   - Organizer earnings calculator correctly applies `10% platform fee`, `0–20% organizer cut`, and `70–90% prize pool`.
   - Dual tournament switcher smoothly toggles Bermuda and Clash Squad without layout shift.
   - APK download triggers verified release URL.
   - WhatsApp floating button opens `https://wa.me/+923367135319`.
   - Mobile navigation drawer opens and closes with smooth body scroll locking.

