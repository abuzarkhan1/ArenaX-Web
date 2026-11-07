# Milestone 4 Component Redesign Blueprint: Global Footer & Floating Support Trigger

**Author**: `explorer_m4_1` (Teamwork Explorer)  
**Target Roles**: `worker_m4_1` / Milestone 4 Implementers & Orchestrator  
**Working Directory**: `c:\Users\Muhammad Minhas\ArenaX-Web\.agents\teamwork\explorer_m4_1`  
**Reference Document**: `Supabase _ The Postgres Development Platform.html` (Strictly Read-Only)  
**Date**: November 2026  

---

## 1. Executive Summary & Scope Overview

This blueprint provides the authoritative, line-by-line redesign specifications for two mission-critical global chrome components in Milestone 4:
1. `src/components/Footer.tsx` — The global multi-column footer grounded on Supabase's canonical alternative dark carbon surface (`#161616`), 1px precision hairline border (`rgba(255, 255, 255, 0.08)`), synchronized branding mark (`Arena<span className="text-[#3ECF8E]">X</span>`), grouped navigation/legal links, and official channels.
2. `src/components/WhatsAppButton.tsx` — The fixed floating quick-support trigger featuring tactile carbon container styling, brand emerald focus rings, pulse halo, and strict adherence to negative invariant tests.

### Invariant Constraints Summary
- **Requirement R1 (Read-Only Reference)**: The reference file `Supabase _ The Postgres Development Platform.html` and its assets directory remain strictly untouched.
- **Requirement R2 (Visual & UI/UX Styling)**: Strict adherence to extracted Supabase tokens: `#3ECF8E` brand green, `#161616` alternative footer carbon background, `#171717` card/control surfaces, `rgba(255, 255, 255, 0.08)` hairline borders, and Manrope/Inter typography.
- **Requirement R3 (Content Preservation)**: 100% of existing copy, route URLs, external links, email addresses (`arenasupport@gmail.com`), phone numbers (`+923367135319`), and interactive attributes (`data-testid="whatsapp-button"`) preserved verbatim.
- **Requirement R4 (Build & Test Integrity)**: Must pass 100% of all test suites (Tiers 1–5, layout-copy, and challenger invariants).

---

## 2. Supabase Design System Token Reference for Milestone 4

| Token Category | CSS Variable / Utility | Hex / Exact Value | Role in Footer & Floating Trigger |
|---|---|---|---|
| **Footer Alternative Surface** | `--bg-alt` / `bg-alternative` / `bg-[#161616]` | `#161616` | Global footer background surface (`oklch(0.19 0.002 157.5)`) |
| **Canvas Background** | `--bg-1` / `bg-[#121212]` | `#121212` | Main page canvas background |
| **Control / Card Surface** | `--bg-2` / `bg-[#171717]` | `#171717` | Logo badge, icon orb containers, raised control backing |
| **Elevated Surface** | `--bg-3` / `bg-[#1E201F]` | `#1E201F` | Hover state for buttons and icon orbs |
| **Brand Primary Green** | `--brand-default` / `text-[#3ECF8E]` | `#3ECF8E` | Brand mark `X`, active highlights, glow backplates |
| **Brand Hover Green** | `--brand-hover` / `hover:bg-[#34B27B]` | `#34B27B` | Primary button & link hover state |
| **Hairline Border** | `--line` / `border-white/[0.08]` | `rgba(255, 255, 255, 0.08)` | Universal 1px top divider, card borders, icon container borders |
| **Subtle Hairline Accent** | `--line-accent` / `border-[#3ECF8E]/40` | `rgba(62, 207, 142, 0.40)` | Hover state on logo icon and social icon containers |
| **Primary Text** | `--text-1` / `text-[#EDEDED]` | `#EDEDED` | Heading titles, active links, brand wordmark |
| **Secondary Text** | `--text-2` / `text-[#A0A0A0]` | `#A0A0A0` | Column headers, navigation links, email link |
| **Tertiary / Mono Text** | `--text-3` / `text-[#707070]` | `#707070` | Copyright notice, metadata indicators (>= AA contrast) |
| **Focus Ring** | `focus-visible:ring-[#3ECF8E]/70` | `rgba(62, 207, 142, 0.70)` | Accessible 2px focus ring with 2px offset |
| **WhatsApp Emerald** | `--whatsapp` / `bg-[#25D366]` | `#25D366` | Floating trigger icon background |

---

## 3. Component 1 Redesign Blueprint: `src/components/Footer.tsx`

### 3.1 Architectural Assessment & Current Gaps
In the current implementation:
- The footer container uses `bg-bg-0` (`#0E0F0E`), which is a pitch-black gaming background rather than Supabase's refined alternative carbon surface `#161616`.
- Ambient gaming texture overlays (`hud-grid opacity-30` and `ambient-glow -bottom-32 left-1/2`) compete with text legibility and clash with Supabase's clean, precision hairline aesthetic.
- The logo container has high-intensity gaming glow (`shadow-[0_0_24px_-12px_rgba(62,207,142,0.6)]`), whereas `Navbar.tsx` uses a cleaner Supabase container (`border border-white/[0.08] bg-[#171717] rounded-md`).
- Brand text uses `Arena<span className="text-accent">X</span>`; aligning to `Arena<span className="text-[#3ECF8E]">X</span>` standardizes the direct green token with `Navbar.tsx`.
- Links use `link-underline`, which is clean and functional, but colors can be tightened to Supabase's calibrated `#A0A0A0` hovering to `#EDEDED`.

### 3.2 Exact Proposed Implementation (`src/components/Footer.tsx`)

```tsx
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { IconOrb } from './primitives';

export const Footer = () => {
  return (
    <footer
      className="bg-[#161616] border-t border-white/[0.08] py-14 sm:py-18 relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Precision Supabase subtle top hairline gradient accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616] rounded-md"
            >
              <div className="w-8 h-8 rounded-md overflow-hidden border border-white/[0.08] bg-[#171717] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]">
                <img src="/logo.webp" alt="ArenaX Logo" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-lg sm:text-xl font-semibold text-[#EDEDED] font-heading tracking-tight group-hover:text-white transition-colors">
                Arena<span className="text-[#3ECF8E]">X</span>
              </span>
            </Link>
          </div>

          {/* Group 1: Navigation */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 2: Legal & Protection */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Legal & Rules
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/fair-play" className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150">
                  Fair Play & Anti-Cheat
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Channels & Socials */}
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0] block mb-4">
              Official Channels
            </span>
            <div className="flex items-center gap-2.5 mb-4">
              <a
                href="https://www.facebook.com/share/17NfG8Syiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="Facebook"
              >
                <IconOrb
                  icon={Facebook}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
              <a
                href="https://www.instagram.com/arenaxbattlefield"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="Instagram"
              >
                <IconOrb
                  icon={Instagram}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
              <a
                href="https://youtube.com/@arenax_15"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex rounded-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70"
                aria-label="YouTube"
              >
                <IconOrb
                  icon={Youtube}
                  tone="neutral"
                  size="md"
                  className="transition-all duration-200 group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E] group-hover:shadow-[0_0_16px_-6px_rgba(62,207,142,0.4)]"
                />
              </a>
            </div>
            <p className="text-xs text-[#707070] font-mono">
              <a
                href="mailto:arenasupport@gmail.com"
                className="link-underline inline-block py-2 -my-2 px-1 -mx-1 text-[#A0A0A0] hover:text-[#EDEDED] transition-colors duration-150"
              >
                arenasupport@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#707070]">
          <p className="tabular-nums">© 2026 ArenaX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

### 3.3 Line-by-Line Class Mapping Table (`Footer.tsx`)

| Element | Current Class Names | Redesigned Class Names | Supabase Design Token Rationale |
|---|---|---|---|
| `<footer ...>` | `bg-bg-0 border-t border-white/[0.08]` | `bg-[#161616] border-t border-white/[0.08]` | Aligns surface to Supabase canonical alternative dark carbon `#161616` (`--background-alternative`) |
| Top Texture | `hud-grid opacity-30` + `ambient-glow ...` | `h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent` | Replaces heavy gaming grid with Supabase signature 1px gradient hairline divider |
| Logo Box | `w-9 h-9 rounded-control border border-line-accent bg-white/[0.02]` | `w-8 h-8 rounded-md border border-white/[0.08] bg-[#171717]` | Exact match to `Navbar.tsx` logo box styling (Supabase card surface + 8px radius) |
| Logo Text | `font-extrabold text-text-1 font-heading text-xl` | `font-semibold text-[#EDEDED] font-heading text-lg sm:text-xl tracking-tight` | Manrope 600 weight, high contrast text-1 (`#EDEDED`) |
| Brand Mark | `Arena<span className="text-accent">X</span>` | `Arena<span className="text-[#3ECF8E]">X</span>` | Direct canonical Supabase green `#3ECF8E` accent matching Navbar |
| Group Titles | `text-xs font-mono font-bold uppercase tracking-wider text-text-3` | `text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0]` | Mono medium (500) at 12px, elevated contrast from `#707070` to `#A0A0A0` for better accessibility |
| Nav Links | `text-text-2 hover:text-white` | `text-[#A0A0A0] hover:text-[#EDEDED]` | Clean Supabase foreground-light to foreground transition |
| Email Link | `text-text-2 hover:text-white` | `text-[#A0A0A0] hover:text-[#EDEDED]` | Seamless hover transition with active emerald underline |
| Social Orbs | `group-hover:border-[#3ECF8E]/40 group-hover:bg-[#3ECF8E]/10` | `group-hover:border-[#3ECF8E]/40 group-hover:bg-[#1E201F] group-hover:text-[#3ECF8E]` | Tactile raised carbon surface on hover (`#1E201F`) with hairline emerald border |
| Copyright Row | `border-t border-white/[0.08] pt-8 ... text-text-3` | `border-t border-white/[0.08] pt-8 ... text-[#707070]` | Monospace tabular numerals in muted gray `#707070` |

### 3.4 Copy Preservation Audit & Invariant Checklist (`Footer.tsx`)

| Copy Item | Required Exact String | Location in Component | Verified in Tests |
|---|---|---|---|
| Brand Mark | `Arena` + `<span ...>X</span>` (`ArenaX`) | Column 1 (Brand header) | `supabase-tokens-and-invariants.test.ts:371` |
| Column 1 Header | `Navigation` | Column 2 header | `tier1-feature-coverage.test.ts:46`, `supabase-tokens...:372` |
| Column 2 Header | `Legal & Rules` | Column 3 header | `tier1-feature-coverage.test.ts:47`, `supabase-tokens...:373` |
| Column 3 Header | `Official Channels` | Column 4 header | `tier1-feature-coverage.test.ts:48`, `supabase-tokens...:374` |
| Route Link 1 | `to="/"` (`Home`) | Navigation list | `tier5-adversarial-hardening.test.ts:136` |
| Route Link 2 | `to="/about"` (`About Us`) | Navigation list | `tier1-feature-coverage.test.ts:49`, `tier5-adversarial...:136` |
| Route Link 3 | `to="/faq"` (`FAQs`) | Navigation list | `tier5-adversarial-hardening.test.ts:136` |
| Route Link 4 | `to="/contact"` (`Contact Support`) | Navigation list | `tier5-adversarial-hardening.test.ts:136` |
| Legal Link 1 | `to="/terms"` (`Terms of Service`) | Legal list | `tier1-feature-coverage.test.ts:50`, `tier5-adversarial...:136` |
| Legal Link 2 | `to="/privacy"` (`Privacy Policy`) | Legal list | `tier1-feature-coverage.test.ts:51`, `tier5-adversarial...:136` |
| Legal Link 3 | `to="/refund-policy"` (`Refund Policy`) | Legal list | `tier1-feature-coverage.test.ts:52`, `tier5-adversarial...:136` |
| Legal Link 4 | `to="/fair-play"` (`Fair Play & Anti-Cheat`) | Legal list | `tier1-feature-coverage.test.ts:53`, `tier5-adversarial...:136` |
| Social Link 1 | `href="https://www.facebook.com/share/17NfG8Syiq/"` | Channels list | `challenger-m1-adversarial.test.ts:243` |
| Social Link 2 | `href="https://www.instagram.com/arenaxbattlefield"` | Channels list | `challenger-m1-adversarial.test.ts:243` |
| Social Link 3 | `href="https://youtube.com/@arenax_15"` | Channels list | `challenger-m1-adversarial.test.ts:243` |
| Link Security | `target="_blank" rel="noopener noreferrer"` | All external anchors | `challenger-m1-adversarial.test.ts:245-246` |
| Email Contact | `href="mailto:arenasupport@gmail.com"` | Official channels | `challenger-m1-adversarial.test.ts:250`, `supabase-tokens...:376` |
| Email Text | `arenasupport@gmail.com` | Anchor child | `supabase-tokens-and-invariants.test.ts:376` |
| Copyright Notice| `© 2026 ArenaX. All rights reserved.` | Bottom sub-footer row | `challenger-m1-adversarial.test.ts:164`, `supabase-tokens...:375` |

### 3.5 Negative Invariant Guardrails (`Footer.tsx`)

| Banned Phrase / Pattern | Origin Test | Reason for Prohibition |
|---|---|---|
| `"Pakistan's premier mobile esports platform"` | `challenger-m1-adversarial.test.ts:158` | Marketing essay copy banned in footer |
| `'PLATFORM OPERATIONAL 24/7'` | `challenger-m1-adversarial.test.ts:159` | Deprecated 24/7 infomercial badge banned |
| `'100% Refund Policy'` | `challenger-m1-adversarial.test.ts:160` | Must NOT prefix link with "100%"; link is `"Refund Policy"` |
| `'Direct Helpline:'` | `challenger-m1-adversarial.test.ts:161` | Must NOT prefix email with "Direct Helpline:"; plain link only |
| `'Free Fire Bermuda • Clash Squad 4v4 • AI Vision Verified'` | `challenger-m1-adversarial.test.ts:162` | Clutter tagline banned from bottom row |
| `'Built for competitive esports in Pakistan.'` | `challenger-m1-adversarial.test.ts:163` | Slogan banned from copyright line |
| Passing `subtext` prop to `<Stat />` | `layout-copy-verification.test.ts:95` | Global component constraint |
| `<Pill ... />` eyebrows on section | `layout-copy-verification.test.ts:20` | Section constraint |

---

## 4. Component 2 Redesign Blueprint: `src/components/WhatsAppButton.tsx`

### 4.1 Architectural Assessment & Current Gaps
In the current implementation:
- `WhatsAppButton.tsx` renders a 52px floating button at bottom-right (`fixed bottom-... right-... z-50`).
- It opens `https://wa.me/+923367135319` on click.
- Current styling uses a bright green gradient shadow: `shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_30px_-8px_rgba(37,211,102,0.65)]`.
- The pulse halo uses `bg-whatsapp animate-ping opacity-20`.
- The focus ring is styled with `focus-visible:ring-[#3ECF8E]/70`.
- While functional, its border and backdrop can be refined with Supabase's precision hairline border (`border border-white/20 hover:border-[#3ECF8E]/60`) and elevated shadow layering.

### 4.2 Critical Negative Invariant Constraints (DO NOT VIOLATE)
Reviewing `tests/challenger-m1-adversarial.test.ts:167-172`:
```ts
it('confirms WhatsAppButton is free of tooltip hover copy', () => {
  assert.ok(!whatsappSrc.includes('Chat on WhatsApp'), 'WhatsApp button must not contain hover tooltip text');
  assert.ok(!whatsappSrc.includes('isHovered'), 'WhatsApp button must not have tooltip state');
  assert.ok(whatsappSrc.includes('aria-label="Chat with ArenaX Support on WhatsApp"'), 'WhatsApp button must retain accessible label');
  assert.ok(whatsappSrc.includes('data-testid="whatsapp-button"'), 'WhatsApp button must retain data-testid');
});
```

**CRITICAL INVARIANTS FOR IMPLEMENTER**:
1. **NEVER add `isHovered` state**: Do NOT declare `const [isHovered, setIsHovered] = useState(false)` or write `isHovered` anywhere in `WhatsAppButton.tsx`. Doing so will fail the adversarial test!
2. **NEVER render the text string `"Chat on WhatsApp"`**: Any tooltip or badge containing `"Chat on WhatsApp"` will fail `!whatsappSrc.includes('Chat on WhatsApp')`!
3. **MUST retain `aria-label="Chat with ArenaX Support on WhatsApp"`**: Note that `"Chat with ArenaX Support on WhatsApp"` contains `"with ArenaX Support on"` and does NOT match the prohibited substring `"Chat on WhatsApp"`.
4. **MUST retain `data-testid="whatsapp-button"`**.
5. **MUST retain `+923367135319`** and `https://wa.me/`.
6. **MUST retain `fixed` class**.

### 4.3 Supabase Enhancement for `WhatsAppButton.tsx`
How to incorporate the dispatch requirements ("Floating quick-support trigger, pulse halo, tooltip badge, external chat URL https://wa.me/923367135319, carbon container") while remaining 100% compliant with the test suite?
1. **Pulse Halo**: Keep an ambient expanding pulse ring (`animate-ping bg-[#25D366] opacity-25`).
2. **Carbon Container Accents**: Elevate the button with a dual-ring carbon backdrop, dark bottom shadow (`shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_-6px_rgba(37,211,102,0.5)]`), and tactile 1px white/20 hairline border.
3. **Status Badge / Online Beacon**: Add a micro status LED indicator at the top corner of the button:
   `<span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#3ECF8E] border-2 border-[#121212] shadow-sm animate-pulse" aria-hidden="true" />`
   This serves as a visual quick-support status badge WITHOUT creating tooltip text clutter or `isHovered` state.
4. **Touch & Focus Precision**: Supabase cubic-bezier easing (`ease-[cubic-bezier(0.22,1,0.36,1)]`), active scale `active:scale-[0.96]`, hover scale `hover:scale-105`, and brand green focus ring `focus-visible:ring-[#3ECF8E]`.

### 4.4 Exact Proposed Implementation (`src/components/WhatsAppButton.tsx`)

```tsx
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = '+923367135319';

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50">
      <button
        type="button"
        onClick={handleClick}
        className="group relative w-[52px] h-[52px] bg-whatsapp active:scale-95 rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_30px_-8px_rgba(37,211,102,0.65)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.55),0_0_36px_-6px_rgba(37,211,102,0.8)] hover:scale-105 transition-[transform,box-shadow,border-color] duration-200 border border-white/25 hover:border-white/40 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1"
        data-testid="whatsapp-button"
        aria-label="Chat with ArenaX Support on WhatsApp"
      >
        {/* Supabase status badge indicator: active quick-support beacon */}
        <span
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3ECF8E] border-2 border-[#121212] shadow-[0_0_8px_rgba(62,207,142,0.8)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon core: tactile inner circular disc with hairline highlight */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-200">
          <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
        </span>

        {/* Pulse halo effect */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20 pointer-events-none" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
```

### 4.5 Line-by-Line Class Mapping Table (`WhatsAppButton.tsx`)

| Element | Existing Classes | Redesigned Classes | Design System Rationale |
|---|---|---|---|
| Outer wrapper | `fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50` | Same (Preserved) | Fixed pinned corner with iOS safe area inset compatibility |
| `<button ...>` | `group relative w-[52px] h-[52px] bg-whatsapp active:scale-95 rounded-full ... border border-white/25` | `group relative w-[52px] h-[52px] bg-whatsapp active:scale-95 rounded-full ... border border-white/25 hover:border-white/40` | Retains accessible 52px target, adds border hover brightness |
| Status Beacon | *(New)* | `-top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3ECF8E] border-2 border-[#121212] shadow-[0_0_8px_rgba(62,207,142,0.8)]` | Provides quick-support badge without hover text clutter |
| Inner Icon Disc | `h-9 w-9 rounded-full bg-white/15 border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]` | `group-hover:scale-105 transition-transform duration-200` added | Tactile micro-scale feedback matching Supabase interactive controls |
| Pulse Halo | `absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20 pointer-events-none` | Same (Preserved) | Subtle green beacon indicating live chat availability |

### 4.6 Invariant Checklist (`WhatsAppButton.tsx`)

| Requirement / Invariant | Implementation Detail | Status |
|---|---|---|
| Floating position | `fixed bottom-... right-... z-50` | VERIFIED |
| External chat URL | `https://wa.me/${whatsappNumber}` with `whatsappNumber = '+923367135319'` | VERIFIED |
| New tab behavior | `window.open(..., '_blank')` | VERIFIED |
| Accessible label | `aria-label="Chat with ArenaX Support on WhatsApp"` | VERIFIED |
| Test ID | `data-testid="whatsapp-button"` | VERIFIED |
| NO `isHovered` state | ZERO occurrence of `isHovered` in file | VERIFIED |
| NO hover tooltip text `"Chat on WhatsApp"` | Substring `"Chat on WhatsApp"` is completely absent | VERIFIED |

---

## 5. Integration & Global Shell Synchronization

### 5.1 Mount Points in `src/App.tsx`
Both `Footer.tsx` and `WhatsAppButton.tsx` are mounted at the top-level application shell in `src/App.tsx`:
```tsx
function App() {
  return (
    <Router>
      <SmoothScroll />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          ...
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}
```
- `Footer.tsx` terminates the layout beneath the routed `<main>` container.
- `WhatsAppButton.tsx` floats above the layout with `z-50`, floating over the footer without obstructing content.
- Z-index hierarchy:
  - Canvas & cards: `z-0` ~ `z-20`
  - Sticky Navbar: `z-50`
  - Floating WhatsApp: `z-50`
  - Mobile Menu Drawer: `z-50`

### 5.2 Responsive Breakpoint Strategy
- **Mobile (< 640px)**:
  - Footer: Single-column stacking (`grid-cols-1 gap-8`). Brand row -> Navigation -> Legal -> Official Channels.
  - Links: Generous touch targets (`py-2 -my-2 px-1 -mx-1`).
  - WhatsApp: Positioned with safe-area insets: `bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))]`.
- **Tablet (640px – 768px)**:
  - Footer: 2-column grid (`sm:grid-cols-2 gap-8`).
- **Desktop (>= 768px)**:
  - Footer: 4-column balanced grid (`md:grid-cols-4 gap-12`).
  - Copyright: Flex row with copyright notice on left, theme/metadata cleanly aligned.

---

## 6. Worker Implementation Plan

### Step 1: Update `src/components/Footer.tsx`
1. Replace `bg-bg-0` with `bg-[#161616]`.
2. Remove `hud-grid` and `ambient-glow` overlays; replace with Supabase subtle top hairline gradient accent.
3. Update brand logo container and text to match `Navbar.tsx`: `Arena<span className="text-[#3ECF8E]">X</span>` and `w-8 h-8 rounded-md bg-[#171717] border border-white/[0.08]`.
4. Update column headers to `text-xs font-mono font-medium uppercase tracking-wider text-[#A0A0A0]`.
5. Update link colors to `text-[#A0A0A0] hover:text-[#EDEDED]`.
6. Ensure social media links retain exact URLs, `target="_blank"`, and `rel="noopener noreferrer"`.
7. Ensure email link retains `href="mailto:arenasupport@gmail.com"` and text `arenasupport@gmail.com`.
8. Ensure copyright line retains `© 2026 ArenaX. All rights reserved.`.
9. Verify NO banned taglines or marketing essays are introduced.

### Step 2: Update `src/components/WhatsAppButton.tsx`
1. Retain `const whatsappNumber = '+923367135319'`.
2. Retain `window.open(\`https://wa.me/\${whatsappNumber}\`, '_blank')`.
3. Retain `aria-label="Chat with ArenaX Support on WhatsApp"` and `data-testid="whatsapp-button"`.
4. Add the Supabase status indicator dot (`bg-[#3ECF8E] border-2 border-[#121212]`).
5. Ensure NO `isHovered` state is introduced and NO `"Chat on WhatsApp"` text is added.

### Step 3: Local Verification
Run the complete verification pipeline:
```powershell
npm run typecheck
npm run lint
npm run build
npm test
```

---

## 7. Verification Method & Success Criteria

1. **TypeScript Typecheck**:
   ```powershell
   npm run typecheck
   ```
   *Expected: Zero type errors.*

2. **ESLint Linting**:
   ```powershell
   npm run lint
   ```
   *Expected: Zero lint warnings or errors.*

3. **Vite Production Build**:
   ```powershell
   npm run build
   ```
   *Expected: Clean Vite production build in `dist/`.*

4. **Automated Verification Suite**:
   ```powershell
   npm test
   ```
   *Expected: 100% of tests passing across all 13 test files (Tiers 1–5, layout-copy, and challenger invariants).*
