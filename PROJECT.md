# Project: ArenaX-Web Supabase Design Tokens Showcase Redesign

## Architecture
- **Framework & Runtime**: React 18.3.1, React Router DOM 7.18.5, Vite 8.3.5, TypeScript 5.5.3, Tailwind CSS 3.4.1.
- **Motion & Typography**: GSAP 3.15.0 + Lenis 1.3.16 smooth scrolling; Fonts: `Inter` (Body, weight 450), `Manrope` (Headings/Display), `Source Code Pro` / `JetBrains Mono` (Monospace/Telemetry).
- **Design System Tokens (Supabase Reference)**:
  - **Brand Accent**: Exact green `#3ECF8E` (`hsl(153.1deg, 60.2%, 52.7%)`), hover `#34B27B`, gradient `#249361` ➔ `#3ECF8E`.
  - **Dark Carbon Surfaces**: Canvas `#121212`, card/surface-100 `#171717` (and `#181a19`), elevated popovers `#1E201F`, footer `#161616`, sticky header translucent backdrop `#0B0E0D` / `rgba(11, 14, 13, 0.85)`.
  - **Hairline Borders**: 1px subtle `rgba(255, 255, 255, 0.08)`, `#242424`, `#2e2e2e`, dual-layer `p-px` gradient border cards (`bg-linear-to-b from-border to-border/50`).
  - **Theme Root**: Strictly dark theme (`style="color-scheme: dark"`).
- **Content Preservation Invariant**: 100% of all existing copy, headlines, text descriptions, calculator math, and interactive capabilities preserved verbatim without loss or omission.
- **Reference Integrity Invariant**: `Supabase _ The Postgres Development Platform.html` and `Supabase _ The Postgres Development Platform_files/` remain strictly unmodified.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Supabase Design Tokens & CSS Architecture | Extend Tailwind config and `src/index.css` with exact `#3ECF8E`, `#121212`, `#171717`, hairline borders, and font stacks | M1 | Survey (E1, E3) |
| 2 | Supabase Button Primitives | Redesign `src/components/primitives/Button.tsx` (primary solid `#3ECF8E` button, secondary carbon button, ghost/outline) | M1 | Survey (E1, E2) |
| 3 | Supabase Card Primitives | Redesign `src/components/primitives/Card.tsx` with `#171717` carbon background, hairline border, subtle gradient sheen | M1 | Survey (E1, E2) |
| 4 | Supabase Badge & Pill Primitives | Redesign `src/components/primitives/Badge.tsx` with hairline border, dark emerald/carbon background, tabular tracking | M1 | Survey (E1, E2) |
| 5 | Supabase Form & Input Primitives | Redesign input components with dark carbon fields, hairline borders, focus ring in brand green `#3ECF8E` | M1 | Survey (E1, E2) |
| 6 | Navigation & Sticky Chrome | Redesign `Navbar.tsx` with `#0B0E0D` translucent backdrop, hairline bottom border, Supabase styled logo & CTA | M2 | Survey (E1, E2) |
| 7 | Hero Section Showcase | Redesign `HeroSection.tsx` with dark carbon atmosphere, hairline announcement pill, emerald gradient headline accents | M2 | Survey (E1, E2) |
| 8 | Platform Editorial Statement | Redesign `ProblemStatement.tsx` with Supabase high-contrast typography and subtle hairline separators | M2 | Survey (E1, E2) |
| 9 | Mobile Client 3D Showcase | Redesign `AppShowcase.tsx` with Supabase carbon card frames, segmented tab bar, and hairline border styling | M3 | Survey (E1, E2) |
| 10 | Tournament Modes Showcase | Redesign `TournamentShowcase.tsx` with Supabase mode switchers, carbon cards, and emerald badge indicators | M3 | Survey (E1, E2) |
| 11 | AI Vision Scoreboard & Calculator | Redesign `AIVisionShowcase.tsx` with Supabase code/terminal HUD styling, hairline borders, emerald scanline accents | M3 | Survey (E1, E2) |
| 12 | Two-Vault Financial Architecture | Redesign `WalletSection.tsx` with dark carbon card surfaces, hairline borders, emerald transaction tokens | M3 | Survey (E1, E2) |
| 13 | Competitive Ranks & Leaderboard | Redesign `LeaderboardTiers.tsx` with Supabase tier tables, tabular numbers, hairline dividers, emerald rank badges | M3 | Survey (E1, E2) |
| 14 | Host & Organizer Program | Redesign `OrganizerProgram.tsx` with carbon cards, interactive sliders, and real-time net earnings math | M3 | Survey (E1, E2) |
| 15 | Onboarding Timeline & How It Works | Redesign `HowItWorks.tsx` with vertical timeline scrubbed progress fill, carbon cards, hairline borders | M3 | Survey (E1, E2) |
| 16 | Platform Comparison Matrix | Redesign `ComparisonMatrix.tsx` with Supabase matrix layout, carbon surfaces, emerald checkmarks | M3 | Survey (E1, E2) |
| 17 | Scout Referral Royalties | Redesign `ScoutRewards.tsx` with Supabase dual cards, emerald bonus badges, and digital store items | M3 | Survey (E1, E2) |
| 18 | APK Download Hub & QR Handoff | Redesign `DownloadSection.tsx` with Android APK primary card, scannable QR code, and installation roadmap | M3 | Survey (E1, E2) |
| 19 | Global Supabase Footer | Redesign `Footer.tsx` with multi-column Supabase layout, dark carbon alternative background (`#161616`), hairline divider | M4 | Survey (E1, E2) |
| 20 | Floating Action Trigger | Redesign `WhatsAppButton.tsx` with Supabase styling and hairline ring | M4 | Survey (E1, E2) |
| 21 | About Showcase Page | Redesign `About.tsx` with Supabase carbon card grid, mission statement, and platform pillars | M4 | Survey (E1, E2) |
| 22 | FAQ Knowledge Base Page | Redesign `FAQ.tsx` with Supabase accordion items, hairline borders, carbon surfaces, 24/7 helpdesk card | M4 | Survey (E1, E2) |
| 23 | Contact Helpdesk Page | Redesign `Contact.tsx` with Supabase support channel cards and ticket dispatch form | M4 | Survey (E1, E2) |
| 24 | Legal & Compliance Pages | Redesign `Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx` with Supabase typography & carbon containers | M4 | Survey (E1, E2) |
| 25 | E2E Supabase Design Token & Invariant Test Suite | Implement automated verification tests ensuring `#3ECF8E`, `#171717`, `#121212`, hairline borders, content integrity | E2E | Survey (E1, E2, E3) |
| 26 | Final E2E Test Pass & Adversarial Hardening | Pass 100% of E2E verification test suite across all tiers, followed by Tier 5 adversarial hardening & forensic audit | M5 | Survey (All) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design & implement automated Supabase design token, content preservation, and reference immutability verification suite | none | DONE |
| M1 | Design System Tokens & Primitives | `tailwind.config.js`, `src/index.css`, `src/components/primitives/*` | none | DONE |
| M2 | Global Chrome, Navigation & Hero Showcase | `Navbar.tsx`, `Hero.tsx`, `Statement.tsx` | M1 | DONE |
| M3 | Interactive Product Showcases & Technical Features | `AppExperienceShowcase.tsx`, `TournamentModes.tsx`, `AIVisionShowcase.tsx`, `WalletSection.tsx`, `LeaderboardTiers.tsx`, `OrganizerProgram.tsx`, `ScoutRewards.tsx`, `HowItWorks.tsx`, `PlatformComparison.tsx`, `Download.tsx` | M1, M2 | DONE |
| M4 | Global Footer, Floating Trigger & Standalone Pages | `Footer.tsx`, `WhatsAppButton.tsx`, `About.tsx`, `FAQ.tsx`, `Contact.tsx`, `Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx` | M1, M2 | DONE |
| M5 | Final Milestone: 100% E2E Pass & Adversarial Hardening | Verify 100% passing E2E test suite (Tiers 1-4), execute Tier 5 adversarial hardening, and perform forensic integrity audit | E2E, M1, M2, M3, M4 | DONE |

## Interface Contracts
### Design Tokens & CSS Custom Properties ↔ UI Components
- `--accent`: `#3ECF8E` (Brand Green)
- `--accent-hover`: `#34B27B` (Brand Green Hover)
- `--bg-0`: `#0E0F0E` (Deepest canvas)
- `--bg-1`: `#121212` (Supabase canonical canvas background)
- `--bg-2`: `#171717` (Supabase canonical card surface-100)
- `--bg-3`: `#1E201F` (Supabase elevated surface-300 / popover)
- `--line`: `rgba(255, 255, 255, 0.08)` (Subtle hairline border)
- `--line-strong`: `rgba(255, 255, 255, 0.14)` (Strong hairline border)
- `--line-accent`: `rgba(62, 207, 142, 0.35)` (Accent hairline border)
- `--text-1`: `#EDEDED` (Primary white text)
- `--text-2`: `#A0A0A0` (Secondary muted text)
- `--text-3`: `#707070` (Tertiary subtle text)

### Primitives ↔ All Section & Page Components
- `Button.tsx`: `variant?: 'primary' | 'secondary' | 'ghost'`, `size?: 'sm' | 'md' | 'lg'`, `asAnchor?: boolean`, `href?: string`, `onClick?: () => void`. Primary uses Supabase solid green `#3ECF8E` with hover `#34B27B`.
- `Card.tsx`: `variant?: 'base' | 'highlighted'`, `className?: string`. Base uses dark carbon `#171717` surface with hairline border.
- `Badge.tsx`: `tone?: 'emerald' | 'neutral' | 'danger'`, `dot?: boolean`, `pulse?: boolean`. Uses hairline border and mono tabular numerals.
- `Input.tsx`: `error?: boolean`, `fullWidth?: boolean`, `leftIcon?: ReactNode`, `rightIcon?: ReactNode`. Dark carbon `#121212` background, hairline border, brand green focus ring.

## Code Layout
- `src/components/primitives/`: Core UI building blocks (`Button.tsx`, `Card.tsx`, `Badge.tsx`, `Input.tsx`, etc.)
- `src/components/navigation/`: Navigation and header chrome (`Navbar.tsx`)
- `src/components/footer/`: Global footer (`Footer.tsx`)
- `src/components/sections/`: Landing showcase sections (`HeroSection.tsx`, `AppShowcase.tsx`, `AIVisionShowcase.tsx`, etc.)
- `src/pages/` or `src/components/`: Standalone views (`About.tsx`, `FAQ.tsx`, `Contact.tsx`, `Terms.tsx`, etc.)
- `tests/`: Automated test suite (E2E, integration, token compliance, copy invariant tests)
- `scripts/`: Verification runner (`run-all-tests.ts`)
