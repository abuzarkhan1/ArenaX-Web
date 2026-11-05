## 2026-11-05T14:43:58Z
You are worker_m2, the implementation worker for Milestone 2: Hero, Editorial & Interactive Showcases.
Your working directory is: c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m2\
Project root: c:\Users\Muhammad Minhas\ArenaX-Web

MANDATORY FIRST STEP:
Read ORIGINAL_REQUEST.md at:
c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\ORIGINAL_REQUEST.md
Read PROJECT.md at:
c:\Users\Muhammad Minhas\ArenaX-Web\PROJECT.md
Read the three explorer handoff reports:
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_1\handoff.md
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_2\handoff.md
- c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m2_3\handoff.md

FILE OWNERSHIP (EXCLUSIVE TO YOU):
- src/components/Hero.tsx
- src/components/Statement.tsx
- src/components/AppExperienceShowcase.tsx
- src/components/TournamentModes.tsx
DO NOT MODIFY ANY OTHER FILES!

IMPLEMENTATION SCOPE:
1. `src/components/Hero.tsx`:
   - Remove promo bonus pill `25 AX Free Welcome Bonus For Referred Accounts`.
   - Remove status badge version suffix `• v2.6.0`.
   - Remove secondary corner badges `[2026] PK Esports Circuit` and `SEASON 4 Free Fire Only`.
   - Remove conversational paragraph subhead (`Daily Bermuda BR & 4v4 Clash Squad scrims...`).
   - Remove version tag from button: change `Download Direct APK (v2.6)` to `Download Direct APK`.
   - Replace secondary telemetry subtexts with high-contrast quantitative metrics using `<Stat />` or clean mono labels (`< 15s`, `1:1`, `100%`).
   - Preserve character switcher (`activeCharacter` tactical/rebel with aura), parallax title, dual action buttons, and scroll handlers.
2. `src/components/Statement.tsx`:
   - Remove `<Pill dot={true} label="PLATFORM PROTOCOL" />`.
   - Remove the verbose detail paragraphs attached to each statement row.
   - Set Statement 01 headline to `"AI vision verifies scoreboards in seconds."` to satisfy cross-feature test assertions while eliminating verbose detail paragraphs.
   - Retain GSAP ScrollTrigger scrubbed word reveal.
3. `src/components/AppExperienceShowcase.tsx`:
   - Omit `<Pill>` eyebrow and remove conversational subtitle paragraph.
   - Use 3 clean narrative chapter titles (`Match Credentials`, `AI Scoreboard`, `Dual-Vault Escrow`) without `tagline:` properties.
   - Clean internal coded phone UI: remove `Grandmaster Contender`, `BALANCE`, `Room slots locked to verified player UIDs only.`, `Used for match entry fees & bonuses`, `Result Verified within Seconds`, etc.
   - Strictly preserve GSAP desktop pinning, 3D phone rotation, tab switching, and `copyRoomDetails()` clipboard flow.
4. `src/components/TournamentModes.tsx`:
   - Implement the complete blueprint from `explorer_m2_3/handoff.md § 4.2`:
   - Mode switcher `Bermuda 48P` / `Clash Squad 4v4`.
   - 2x2 specification cards (`SLOTS`, `ROSTER`, `ENTRY`, `PRIZE POOL`).
   - Eliminate format taglines (`SURVIVAL FORMAT`, `BRACKET ELIMINATION`) and explanatory bullet prose.
   - Eliminate `ShieldAlert` helper banner (and remove `ShieldAlert` from imports).
   - Preserve 3D specular tilt, sub-format tabs (solo/duo/squad), bracket stages (quarters/semis/finals), dynamic matchups, and `#download` CTA.

VERIFICATION REQUIREMENTS:
Run:
1. `npm run typecheck` (must pass with code 0)
2. `npm run lint` (must pass with code 0)
3. `npm run build` (must pass with code 0)
4. `npm test` (must pass with code 0)

Document all changes and test outputs in:
c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m2\handoff.md
Notify the orchestrator via send_message when complete.
