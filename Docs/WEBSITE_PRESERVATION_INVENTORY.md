# ArenaX Website Preservation Inventory

## 1. Executive Summary & Purpose
This document provides a complete, granular inventory of all existing pages, routes, content, components, interactive functionality, brand assets, and external integrations in the ArenaX official website repository (`ArenaX-Web`).

Per Phase 2 requirements:
- **No deletion or erasure** of existing website content, pages, routes, or useful components.
- **In-place enhancement** wherever possible.
- **Explicit preservation checklist** guaranteeing zero accidental regressions during the UI/UX upgrade and feature integration.

---

## 2. Inventory of Existing Routes & Navigation

| Route | Associated Component | Page Title / Purpose | Current Status | Preservation Decision |
|---|---|---|---|---|
| `/` | `Hero.jsx`, `Features.jsx`, `Download.jsx` | Home / Landing Page | Active | **PRESERVE & ENHANCE IN-PLACE**: Expand home flow with verified app feature modules (Tournaments, AI Vision, Ranks, Organizer, Two-Wallet, Scout, How It Works) while retaining existing Hero, Features, and Download sections. |
| `/about` | `About.jsx` | About Us & Platform Story | Active | **PRESERVE & ENHANCE IN-PLACE**: Retain company story, mission, and 4 core value pillars. Upgrade styling to tactical cyber-carbon, replace raw emojis with Lucide SVGs, update copy to reflect Free Fire focus and zero-trust fair play. |
| `/faq` | `FAQ.jsx` | Help Center & FAQ Accordions | Active | **PRESERVE & ENHANCE IN-PLACE**: Retain all 9 existing FAQs; add 5 new verified questions (Two-Wallet system, Gemini AI Vision OCR, 100% refund policy, P2P transfers, organizer requirements). Fix email typo. |
| `/contact` | `Contact.jsx` | Contact Channels & Message Form | Active | **PRESERVE & ENHANCE IN-PLACE**: Retain functional form, contact phone (+92 336 7135319), email, and social cards. Upgrade IST to PKT hours, fix email typo, replace raw emojis with official social SVGs. |
| `/terms` | `Terms.jsx` | Terms & Conditions | Active | **PRESERVE & ENHANCE IN-PLACE**: Retain all 14 core legal sections. Fix erroneous Indian template clauses ("Bangalore, Pakistan", "Karnataka courts") to proper Pakistani jurisdiction (Arbitration Act 1940, competent courts of Lahore/Islamabad). |

---

## 3. Inventory of Existing Homepage Sections

### A. Navigation Bar (`src/components/Navbar.jsx`)
- **Current Elements**:
  - Brand text: `ArenaX`
  - Desktop nav links: `Home`, `About Us`, `FAQs`, `Contact Us`, `Terms & Conditions`
  - Mobile hamburger toggle with slide-out drawer
  - Body scroll-lock toggle on mobile menu open
- **Preservation & Enhancement**:
  - Preserve all existing route navigation capability.
  - Enhance with brand emblem shield, persistent high-contrast "Download App" CTA button, expanded section shortcuts for homepage (`Tournaments`, `Ranks & Rules`, `Organizers`, `How It Works`), and minimum 48px touch targets for mobile accessibility.

### B. Hero Section (`src/components/Hero.jsx`)
- **Current Elements**:
  - Background: WebGL Three.js `DotScreenShader` (`src/components/ui/dot-shader-background.tsx`)
  - Tag pill: `Zap` icon + "Ultimate Tournament Platform"
  - Primary headline: "Compete, Win & Dominate in ArenaX"
  - Subheadline: "Join Pakistan's premier mobile esports platform. Play Free Fire and PUBG Mobile tournaments daily..."
  - Primary CTA: "Download ArenaX App" (smooth scrolls to `#download`)
  - Secondary CTA: "Watch Trailer"
  - 3 Stat Cards: "50+ Daily Free Fire & PUBG Tournaments", "10,000+ Registered Players", "4,000+ Active Daily Players"
- **Preservation & Enhancement**:
  - Preserve the 3D `DotScreenShader` background canvas (retaining Three.js with cleanup and reduced-motion fallback).
  - Preserve headline typography and high-conversion "Download ArenaX App" button.
  - Replace placeholder "Watch Trailer" button with verified secondary action ("Explore Tournaments" or "Organizer Program").
  - Update stat cards to verified product claims (Gemini 2.0 Flash AI Settlement, 70%–90% Player Prize Pool, 100% Automated Refunds).
  - Update subhead copy to focus 100% on Free Fire esports in Pakistan.

### C. Features Section (`src/components/Features.jsx`)
- **Current Elements**:
  - Section title: "Why Choose ArenaX?"
  - Glowing border effect wrapper: `GlowingEffect` (`src/components/ui/glowing-effect.tsx`)
  - 6 Feature Cards:
    1. Daily Tournaments
    2. Secure Payments
    3. Real-Time Updates
    4. Team Management
    5. Leaderboards
    6. Instant Results
  - Bottom CTA banner: "Ready to Start Your Journey?" with 4 metric cards:
    - 2+ Games Supported
    - 4.8 App Rating
    - 24/7 Support
    - Fast Withdrawals
- **Preservation & Enhancement**:
  - Preserve all 6 feature card topics and the bottom conversion banner.
  - Enhance copy with specific, verified mobile app features (6-digit squad codes, Gemini AI Vision, Two-Wallet isolation, 36-sub-tier ladder, JazzCash & EasyPaisa).
  - Upgrade color tokens from raw neon green (`#00FF7F`) to brand emerald (`#00C878`) and tactical borders (`#30363A`).
  - Replace raw emojis (`🎮`, `⭐`, `🏆`, `💰`) with consistent Lucide SVG icons.

### D. Download Section (`src/components/Download.jsx`)
- **Current Elements**:
  - `#download` anchor ID (targeted by all scroll triggers)
  - Android APK Card:
    - Download button invoking `handleDownload()` with `trackDownload("ArenaX.apk", "Android", "2.6.0")`
    - Download URL: `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk`
    - Specifications list: Android 8.0+, Size 115 MB, Free, No subscription
  - iOS Coming Soon Card (disabled button with clock icon)
  - 4-Step APK Install Guide (Download -> Enable Unknown Sources -> Install -> Open)
- **Preservation & Enhancement**:
  - Preserve the exact `#download` anchor, the GitHub release download URL, the iOS Coming Soon card, and the 4-step install guide.
  - Add inline SVG QR Code for direct mobile camera scanning on desktop viewports.
  - Update specifications to reflect verified package `com.arenax.app` and official Play Protect compliance.
  - Upgrade styling to tactical cyber-carbon with clear trust badges.

---

## 4. Inventory of Standalone Pages

### A. About Page (`src/components/About.jsx`)
- **Current Elements**:
  - Hero: "About ArenaX" + intro text
  - "Our Story" section (founding story, mission to democratize competitive gaming)
  - 4 Core Pillars: Mission (`Target`), Values (`Heart`), Innovation (`Zap`), Community (`Users`)
  - "Why Players Choose Us": Fair Play, Fast Payouts, Secure Platform
  - Bottom CTA: "Download ArenaX Now" (triggers APK download)
- **Preservation Strategy**: Retain every paragraph and pillar; enhance narrative with Pakistan Free Fire context, Gemini AI zero-trust verification, and community organizer ecosystem; replace raw emojis with Lucide icons.

### B. FAQ Page (`src/components/FAQ.jsx`)
- **Current Elements**:
  - Accordion with 9 questions:
    1. What is ArenaX?
    2. How do I participate in tournaments?
    3. How do I add money to my wallet?
    4. How long does it take to withdraw winnings?
    5. What games are supported?
    6. Is ArenaX safe and legal?
    7. What if I face technical issues during a tournament?
    8. How are winners determined?
    9. Can I play with my friends?
  - Support CTA box with `mailto:arenasupprt@gmail.com`
- **Preservation Strategy**: Retain all 9 existing questions; add verified entries for Two-Wallet isolation, Gemini AI Vision, automated refunds, P2P transfers, and organizer applications; fix email typo.

### C. Contact Page (`src/components/Contact.jsx`)
- **Current Elements**:
  - 3 contact channels: Email (`arenasupprt@gmail.com`), Phone (`+92 336 7135319`), Live Chat
  - Working Contact Form (Name, Email, Subject, Message) with form submit handler and state reset
  - Business Inquiries card
  - Social media cards (Facebook, Twitter, Instagram, Chat)
- **Preservation Strategy**: Retain form, phone number, and business card; correct hours from `IST` to `PKT`; fix email typo; connect social cards to official verified handles (Facebook, Instagram `@arenaxbattlefield`, TikTok `@arenax_15`, YouTube `@arenax_15`).

### D. Terms & Conditions (`src/components/Terms.jsx`)
- **Current Elements**:
  - 14 numbered legal sections:
    1. Acceptance of Terms
    2. Eligibility
    3. User Account
    4. Tournament Rules
    5. Payments and Refunds
    6. Prohibited Activities
    7. Fair Play Policy
    8. Intellectual Property
    9. Limitation of Liability
    10. Privacy and Data Protection
    11. Termination
    12. Dispute Resolution
    13. Governing Law
    14. Contact Information
- **Preservation Strategy**: Retain all 14 sections; repair copy-pasted foreign legal terms in sections 12 & 13 (replace "Bangalore, Pakistan" and "Karnataka courts" with Arbitration Act 1940 and competent courts of Pakistan); update year to 2026.

### E. Footer (`src/components/Footer.jsx`)
- **Current Elements**:
  - Brand description: "Pakistan's premier mobile esports tournament platform..."
  - Quick Links: Home, About Us, FAQs, Contact Us
  - Legal Links: Terms & Conditions, Privacy Policy, Refund Policy, Fair Play Policy
  - Social Links: Facebook, Instagram, TikTok, YouTube
  - Support email
  - Copyright statement and game category tags
- **Preservation Strategy**: Retain all link destinations and official social links; upgrade year to 2026; fix support email to `arenasupport@gmail.com`; ensure legal links smoothly scroll or open appropriate sections.

---

## 5. Inventory of Functional Utilities & Infrastructure

| Utility / File | Current Role | Preservation Strategy |
|---|---|---|
| `src/components/WhatsAppButton.jsx` | Floating WhatsApp chat button linking to `https://wa.me/+923367135319` with pulse animation and tooltip | **PRESERVE IN FULL**: Essential customer conversion and instant trust channel. |
| `src/components/SmoothScroll.tsx` | Lenis smooth scrolling engine with RAF loop, anchor listener, and MutationObserver for body overflow lock | **PRESERVE IN FULL**: Critical for high-end interaction and modal scroll safety. |
| `src/components/SEO.tsx` | Head management with canonical links, OpenGraph, Twitter card, and dynamic JSON-LD Schema.org data | **PRESERVE & ENHANCE**: Maintain structured schema; update primary keywords and meta description. |
| `src/utils/analytics.ts` | ReactGA4 integration with universal ESM/CJS resolver, pageview logger, and download tracker | **PRESERVE IN FULL**: Core tracking infrastructure. |
| `src/components/ui/dot-shader-background.tsx` | Three.js WebGL procedural shader canvas providing the dynamic interactive dot-grid effect | **PRESERVE IN FULL**: Retain in Hero with cleanup on unmount. |
| `src/components/ui/glowing-effect.tsx` | Proximity-driven mouse-tracking border glow component | **PRESERVE IN FULL**: High-quality visual feedback token. |
| `src/lib/utils.ts` | `clsx` and `tailwind-merge` utility (`cn()`) | **PRESERVE IN FULL**: Reusable class composition. |

---

## 6. Official Brand & Channel Preservation Table

| Asset / Parameter | Value | Preservation Rule |
|---|---|---|
| Brand Name | **ArenaX** | Exact case preservation (`ArenaX` or `Arena` + emerald `X`). |
| Canonical Domain | `https://marenax.site/` (also `marenax.com`) | Preserve existing routing; do not alter server config. |
| Official Support Email | `arenasupport@gmail.com` | Standardize across all 5 pages (fixing `arenasupprt` typos). |
| Official Phone / WhatsApp | `+92 336 7135319` | Preserve across Contact, WhatsApp button, and Schema. |
| Official Facebook | `https://www.facebook.com/share/17NfG8Syiq/` | Preserve exact link. |
| Official Instagram | `https://www.instagram.com/arenaxbattlefield` | Preserve exact link. |
| Official TikTok | `https://www.tiktok.com/@arenax_15` | Preserve exact link. |
| Official YouTube | `https://youtube.com/@arenax_15` | Preserve exact link. |
| Official APK Target | `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk` | Preserve verified download destination. |
| Android Package ID | `com.arenax.app` | Reference for technical credibility. |

---

## 7. Strict Preservation Checklist

- [x] All 5 primary routes (`/`, `/about`, `/faq`, `/contact`, `/terms`) are preserved.
- [x] All existing copy, founding narrative, FAQs, and legal policies are preserved and improved in place.
- [x] WebGL Three.js `DotScreenShader` background canvas is preserved with memory cleanup.
- [x] Lenis smooth scrolling engine and body-overflow observer are preserved.
- [x] WhatsApp floating chat button and exact phone number are preserved.
- [x] Exact APK download destination (`v2.6/ArenaX.apk`) is preserved.
- [x] All verified official social media URLs are preserved and wired to proper SVG icons.
- [x] ReactGA analytics tracking and download event tracking are preserved.
- [x] JSON-LD Schema.org rich snippets and SEO head tags are preserved and updated.

