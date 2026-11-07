## 2026-11-07T08:09:42Z
You are worker_m4, a teamwork_worker for Milestone 4 (Global Footer, Floating Trigger & Standalone Pages).
Your working directory is: c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m4

MANDATORY FIRST STEP: Read the original user request at:
c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

CRITICAL HARD CONSTRAINTS:
1. READ-ONLY REFERENCE: The file `Supabase _ The Postgres Development Platform.html` and its associated folder `Supabase _ The Postgres Development Platform_files` MUST remain STRICTLY unmodified and unaltered. Do not write, touch, or edit them.
2. EXCLUSIVE FILE WRITE OWNERSHIP: You exclusively own and edit these 9 component files:
   - `src/components/Footer.tsx`
   - `src/components/WhatsAppButton.tsx`
   - `src/components/About.tsx`
   - `src/components/FAQ.tsx`
   - `src/components/Contact.tsx`
   - `src/components/Terms.tsx`
   - `src/components/Privacy.tsx`
   - `src/components/RefundPolicy.tsx`
   - `src/components/FairPlay.tsx`
   Do NOT touch any other files outside this scope or your working directory.
3. CONTENT PRESERVATION (Requirement R3): 100% of all existing copy, legal clauses, FAQs, emails (`arenasupport@gmail.com`), phone numbers (`+923367135319`), links, and form fields MUST be preserved verbatim.

AUTHORITATIVE BLUEPRINTS TO READ AND EXECUTE:
- `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m4_1\blueprint.md` (Footer, WhatsAppButton)
- `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m4_2\blueprint.md` (About, FAQ, Contact)
- `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m4_3\blueprint.md` (Terms, Privacy, RefundPolicy, FairPlay)

KEY INVARIANT & NEGATIVE TEST GUARDRAILS:
1. `src/components/Footer.tsx`:
   - Surface: Supabase alternative dark carbon `#161616` (`bg-[#161616]`), top hairline border `rgba(255, 255, 255, 0.08)`.
   - Strip all `.hud-grid` and `.ambient-glow` overlays.
   - Logo mark: `Arena<span className="text-[#3ECF8E]">X</span>`.
   - Links: All navigation, legal, and official channels (Facebook, Instagram, YouTube) preserved.
   - Support email: `arenasupport@gmail.com`.
   - Copyright: `© 2026 ArenaX. All rights reserved.`.
2. `src/components/WhatsAppButton.tsx`:
   - Floating trigger with `data-testid="whatsapp-button"` and `aria-label="Chat with ArenaX Support on WhatsApp"`.
   - External URL: `https://wa.me/923367135319` (or `+923367135319`).
   - CRITICAL NEGATIVE INVARIANT: Do NOT include tooltip text "Chat on WhatsApp" and do NOT include `isHovered` state (tested by `challenger-m1-adversarial.test.ts:168-169`).
3. `src/components/About.tsx`:
   - Canvas `#121212`, carbon cards `#171717`, hairline borders `border-white/[0.08]`. 100% narrative copy preserved.
4. `src/components/FAQ.tsx`:
   - Supabase accordion with hairline borders, category tags, 24/7 helpdesk card. 100% of all 10 FAQs preserved verbatim.
5. `src/components/Contact.tsx`:
   - Support channel cards, form inputs with `#121212` and `#3ECF8E` focus rings.
6. `src/components/Terms.tsx`, `Privacy.tsx`, `RefundPolicy.tsx`, `FairPlay.tsx`:
   - Developer-docs legal layout with canvas `#121212`, container `#171717`, hairline borders, sticky TOC sidebar, 100% verbatim legal text.

VERIFICATION STEPS BEFORE HANDOFF:
1. Run `npm run typecheck` (`tsc --noEmit -p tsconfig.app.json`) -> must pass with 0 errors
2. Run `npm run lint` (`eslint .`) -> must pass with 0 errors
3. Run `npm run build` (`vite build`) -> must build cleanly
4. Run `npm test` (`node --experimental-strip-types scripts/run-all-tests.ts`) -> all automated test suites must pass 100%

DELIVERABLES:
1. Update `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m4\progress.md` after each step.
2. Write `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\worker_m4\handoff.md` with full details of changes and verified test output.
3. Send message to orchestrator upon completion.
