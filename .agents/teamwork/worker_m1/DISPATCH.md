## 2026-11-05T13:45:19Z
You are worker_m1, the implementation worker for Milestone 1: Navigation, Chrome & Primitives Polish.
Your working directory is: c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m1\
Project root: c:\Users\Muhammad Minhas\ArenaX-Web

MANDATORY FIRST STEP:
Read ORIGINAL_REQUEST.md located at:
c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md located at:
c:\Users\Muhammad Minhas\ArenaX-Web\PROJECT.md
Read the three explorer handoff reports:
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m1_1\handoff.md
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m1_2\handoff.md
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m1_3\handoff.md

FILE OWNERSHIP (EXCLUSIVE TO YOU):
- src/components/primitives/Stat.tsx
- src/components/primitives/Button.tsx
- src/components/primitives/Badge.tsx
- src/components/primitives/Pill.tsx
- src/components/primitives/Card.tsx
- src/components/primitives/HudCorners.tsx
- src/components/primitives/IconOrb.tsx
- src/components/primitives/Container.tsx
- src/components/primitives/Section.tsx
- src/components/primitives/index.ts
- src/components/Navbar.tsx
- src/components/Footer.tsx
- src/components/WhatsAppButton.tsx
- src/components/SEO.tsx
- src/index.css
- tailwind.config.js
DO NOT MODIFY ANY OTHER FILES! (Other screens are owned by subsequent milestones).

IMPLEMENTATION SCOPE:
1. `Stat.tsx`: Remove `subtext` prop and rendering from `Stat.tsx`. Wrap in `forwardRef`. Ensure zero callers break.
2. `Button.tsx`: Fix secondary variant ring double-border artifact; set `sm` height to 36px (`h-9 py-2 px-3.5`); keep polymorphic `asAnchor`, `href`, `icon`, `iconPosition`, `fullWidth`, `forwardRef`.
3. `Badge.tsx`: Clean tones, `forwardRef`.
4. `Pill.tsx`: Clean implementation, support `{label || children}`, `forwardRef`.
5. `Card.tsx`: Re-align with `.hud-card` styles, `forwardRef`.
6. `IconOrb.tsx`: Fix neutral tone emerald glow leak bug.
7. `tailwind.config.js`: Fix line color opacity function using `withAlpha` so `border-line/60` and `border-line/80` generate valid CSS.
8. `src/index.css`: Remove dead `.tactical-pill` class.
9. `Navbar.tsx`:
   - Remove `ESPORTS CLIENT` logo subtitle (lines 118-120).
   - Unify mobile drawer button copy from `Download APK (v2.6)` to `Download App`.
   - Wire `trackDownload('navbar')` on download click handlers.
   - Refine desktop nav link typography to Linear/Apple Notes elegance while strictly preserving active section indicator, section anchor jumping, and mobile menu toggle.
10. `Footer.tsx`:
   - Remove conversational brand paragraph (`Pakistan's premier mobile esports platform...`).
   - Remove `PLATFORM OPERATIONAL 24/7` badge.
   - Remove `100% Refund Policy` infomercial prefix (change to `Refund Policy`).
   - Remove `Direct Helpline:` prefix (display clean email link).
   - Remove bottom tagline chips (`Free Fire Bermuda • Clash Squad 4v4 • AI Vision Verified`).
   - Clean copyright: `© 2026 ArenaX. All rights reserved.`
11. `WhatsAppButton.tsx`:
   - Remove hover tooltip `Chat on WhatsApp` and `isHovered` state. Keep self-evident FAB button with `aria-label`, safe-area insets, pulse effect, and WhatsApp click redirect.
12. `SEO.tsx`:
   - Synchronize Twitter card meta tags and enhance meta tag fallbacks without breaking existing consumers.

VERIFICATION REQUIREMENTS:
After making changes, run:
1. `npm run typecheck` (must pass with exit code 0)
2. `npm run lint` (must pass with exit code 0)
3. `npm run build` (must pass with exit code 0)

Document all changes, file paths, and test outputs in:
c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m1\handoff.md
Notify the orchestrator via send_message when complete.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
