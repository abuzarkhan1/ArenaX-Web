# Project: ArenaX-Web Polish & Simplification

## Architecture
- **Framework & Runtime**: React 18.3.1, React Router DOM 7.18.5, Vite 8.3.5, TypeScript 5.5.3, Tailwind CSS 3.4.1.
- **Motion & Typography**: GSAP 3.15.0 + Lenis 1.3.16 smooth scrolling, `@fontsource` (Outfit, Inter, JetBrains Mono).
- **Design Language**: Linear & Apple Notes aesthetic. Deep dark canvas (`--bg-0` to `--bg-3`), single vibrant emerald accent (`#00C878`), hairline borders (`--line`), bold typographic hierarchy, high-contrast data telemetry. Zero taglines, zero explanatory helper text, zero conversational subtitles.
- **State Architecture**: 100% localized component state (`useState`, `useRef`). Zero global store bloat (no Redux, Zustand, React Context). Single HTTP POST in `Contact.tsx` with deterministic mailto fallback.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Navigation & Header Chrome | Fixed navbar, emerald scroll progress bar, logo, section anchor jumping, mobile drawer, APK download button | M1 | Survey (E1, E2) |
| 2 | Footer & Legal Navigation | 4-column footer, quick links, legal/rules links, social icons, copyright notice | M1 | Survey (E1, E2) |
| 3 | Floating WhatsApp Action | Fixed FAB with safe-area insets, direct chat link to WhatsApp | M1 | Survey (E1, E2) |
| 4 | UI Primitives & Design System | `Button`, `Card`, `Badge`, `Pill`, `HudCorners`, `IconOrb`, `Stat`, `Container`, `Section` cleanup; remove obsolete `subtext` from `Stat.tsx` | M1 | Survey (E2) |
| 5 | Hero Section & Character Switcher | Parallax headline, Red Criminal vs Streetwear Rebel switcher, dual action buttons, 3-metric telemetry ribbon | M2 | Survey (E1, E2, E3) |
| 6 | Platform Protocol Statements | 4 high-contrast statements with GSAP scrubbed word-by-word reveal; elimination of verbose detail paragraphs | M2 | Survey (E1, E2) |
| 7 | Android Client 3D Phone Showcase | Pinned 3D scene with rotating smartphone mockup; clean segmented tabs (Lobby, Scanner, Wallet) | M2 | Survey (E1, E2) |
| 8 | Tournament Modes & 3D Specular Tilt | Bermuda BR vs Clash Squad 4v4 switcher, sub-format toggle, 3D specular tilt preview card, specs data | M2 | Survey (E1, E2, E3) |
| 9 | AI Vision Scoreboard & Combat Points Calculator | 3D perspective victory scoreboard, continuous emerald scanline, interactive Combat Points Calculator (`20 PTS Booyah + 5 PTS/kill`) | M3 | Survey (E1, E2, E3) |
| 10 | Two-Vault Financial Architecture | 5-stage lifecycle flow (`Deposit → Play → Scrim → Winnings → Cashout`) and Play Wallet vs Winning Wallet depth panels with 1:1 parity | M3 | Survey (E1, E2, E3) |
| 11 | Season 4 Competitive Tiers & Rank Gap Simulator | 8-tier carousel (Bronze to Grandmaster) and interactive rank-gap calculator with points slider and dynamic milestone math | M3 | Survey (E1, E2, E3) |
| 12 | Organizer Program & Host Earnings Simulator | 4 operational pillars and interactive Host Earnings Simulator with 3 sliders (Lobby, Entry, Host Cut) and real-time net math | M3 | Survey (E1, E2, E3) |
| 13 | 6-Step Onboarding Timeline | Vertical timeline with scroll-scrubbed progress fill; 6 clear milestone steps without explanatory paragraph essays | M4 | Survey (E1, E2) |
| 14 | Platform Fair Play Comparison Matrix | High-contrast comparison matrix evaluating ArenaX vs informal scrims across 6 dimensions | M4 | Survey (E1, E2) |
| 15 | Scout Referral Royalties & Digital Store | Dual cards: Scout Royalty (25 AX bonus, 2% win royalty) and in-app Free Fire digital voucher redemption | M4 | Survey (E1, E2) |
| 16 | Direct APK Download Hub & QR Handoff | Hero typography echo, Android APK primary card with live scannable QR code SVG + direct download trigger, iOS roadmap, 4-step install | M4 | Survey (E1, E2, E3) |
| 17 | About Page | Mission statement, brand emblem, 4 platform pillars grid, download CTA | M4 | Survey (E1, E2) |
| 18 | FAQ Knowledge Base | 10-item accessible accordion knowledge base with single-open state, 24/7 support trigger | M4 | Survey (E1, E2, E3) |
| 19 | Support Helpdesk & Contact Form | 3 channel cards (Email, WhatsApp, Availability) and clean direct contact form with mailto fallback | M4 | Survey (E1, E2, E3) |
| 20 | Legal Documents & Policy Pages | Terms of Service, Privacy Policy, Refund Policy, Fair Play rules with clean headings and legal clauses intact | M4 | Survey (E1, E2) |
| 21 | Automated E2E & Layout Verification Suite | Comprehensive automated test suite verifying build, typecheck, lint, routing, calculators, and absence of R1 helper copy | E2E Track | Survey (E3) |
| 22 | Final E2E Test Pass & Adversarial Hardening | 100% pass of automated verification suite across Tiers 1-4, followed by Tier 5 adversarial coverage hardening | M5 | Survey (All) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design & implement automated verification suite covering R1, R2, R3, R4 | none | DONE |
| M1 | Navigation, Chrome & Primitives Polish | `primitives/*`, `Navbar.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`, `SEO.tsx` | none | DONE |
| M2 | Hero, Editorial & Interactive Showcases | `Hero.tsx`, `Statement.tsx`, `AppExperienceShowcase.tsx`, `TournamentModes.tsx` | M1 | DONE |
| M3 | Esports Engine & Financial Architecture | `AIVisionShowcase.tsx`, `WalletSection.tsx`, `LeaderboardTiers.tsx`, `OrganizerProgram.tsx` | M1 | IN_PROGRESS |
| M4 | Onboarding, Social & Download Hub | `HowItWorks.tsx`, `PlatformComparison.tsx`, `ScoutRewards.tsx`, `Download.tsx`, `About.tsx`, `FAQ.tsx`, `Contact.tsx`, `Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx` | M1 | PLANNED |
| M5 | Final Milestone: 100% E2E Pass & Hardening | Run all E2E verification tests (Tiers 1-4), fix issues, then Tier 5 adversarial hardening | E2E, M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Primitives ↔ All Sections & Screens
- `Stat.tsx`: `value: string | number`, `label: string`, `accent?: boolean`. Deprecated and removed `subtext` prop to enforce R1. Wrapped in `forwardRef`.
- `Button.tsx`: `variant?: 'primary' | 'secondary' | 'ghost'`, `size?: 'sm' | 'md' | 'lg'`, `asAnchor?: boolean`, `href?: string`, `onClick?: () => void`. Clean action labels only.
- `Badge.tsx`: `tone?: 'emerald' | 'neutral' | 'danger'`, `dot?: boolean`, `pulse?: boolean`. Clean status indicators only.
- `Card.tsx`: `variant?: 'base' | 'highlighted'`, `className?: string`.
- `Navbar.tsx`: Preserves `activeSection` state, anchor jumping (`/#tournaments`, `/#vision`, etc.), and APK download handler triggering `trackDownload('navbar')`. Declarative body overflow sync via `useEffect([mobileMenuOpen])`.

### Calculations & State Invariants (R3)
- `AIVisionShowcase.tsx`: `totalPoints = (isBooyah ? 20 : 0) + kills * 5`. Tier mapping: `Grandmaster >= 80`, `Heroic >= 50`, `Diamond >= 30`, `Gold < 30`.
- `LeaderboardTiers.tsx`: `ptsNeeded = Math.max(0, targetMin - currentPts)`, `booyahsNeeded = Math.ceil(ptsNeeded / 20)`.
- `OrganizerProgram.tsx`: `total = participants * entryFee`, `admin = Math.round(total * 0.1)`, `host = Math.round(total * (hostCutPercent / 100))`, `player = total - admin - host`.
- `Contact.tsx`: Handles form state (`idle`, `submitting`, `success`, `error`), attempts POST to `VITE_CONTACT_FORM_ENDPOINT` if present, falls back to `mailto:arenasupport@gmail.com`.

## Code Layout
- Exclusive File Ownership Boundaries:
  - **E2E Testing Track**: Owns `tests/`, `scripts/verify-*.ts`, test config files. [DONE]
  - **Milestone 1**: Owns `src/components/primitives/*`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/WhatsAppButton.tsx`, `src/components/SEO.tsx`. [DONE]
  - **Milestone 2**: Owns `src/components/Hero.tsx`, `src/components/Statement.tsx`, `src/components/AppExperienceShowcase.tsx`, `src/components/TournamentModes.tsx`. [DONE]
  - **Milestone 3**: Owns `src/components/AIVisionShowcase.tsx`, `src/components/WalletSection.tsx`, `src/components/LeaderboardTiers.tsx`, `src/components/OrganizerProgram.tsx`. [CURRENT]
  - **Milestone 4**: Owns `src/components/HowItWorks.tsx`, `src/components/PlatformComparison.tsx`, `src/components/ScoutRewards.tsx`, `src/components/Download.tsx`, `src/components/About.tsx`, `src/components/FAQ.tsx`, `src/components/Contact.tsx`, `src/components/Terms.tsx`, `src/components/Privacy.tsx`, `src/components/RefundPolicy.tsx`, `src/components/FairPlay.tsx`.
  - **Milestone 5**: System integration, runs verification across the whole project, fixes uncovered edge cases.
