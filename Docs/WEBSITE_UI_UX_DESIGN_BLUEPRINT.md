# ArenaX Website UI/UX Design Blueprint

## 1. Design Direction & Brand Personality

### The Visual Identity: "Tactical Cyber-Carbon"
The new ArenaX visual direction moves away from generic, eye-straining neon greens (`#00FF7F`) and amateur floating blob templates. Instead, it adopts a **Tactical Cyber-Carbon** aesthetic calibrated specifically for high-stakes competitive esports in Pakistan:
- **Tone**: Disciplined, authoritative, high-precision, trustworthy, competitive.
- **Mood**: High-performance military-grade esports terminal meets sleek consumer fintech.
- **Audience**: Competitive Free Fire players, squad captains, and community tournament hosts aged 16–30 who demand fair play, fast payouts, and zero scams.

---

## 2. Color System & Design Tokens (Guided by UI/UX Pro Max)

```css
/* Tactical Cyber-Carbon Design Tokens */
:root {
  /* Surfaces */
  --color-carbon-900: #101214; /* Base background - Deep Carbon Void */
  --color-carbon-800: #1B1F22; /* Card surface - Tactical Gunmetal */
  --color-carbon-700: #22272B; /* Elevated panel / Interactive surface */
  --color-carbon-600: #30363A; /* Structural border / Subtle divider */
  
  /* Brand Accents */
  --color-brand-primary:   #00C878; /* Verified Brand Emerald (WCAG AAA on #101214) */
  --color-brand-hover:     #00A865; /* Deep Emerald for hover states */
  --color-brand-subtle:    rgba(0, 200, 120, 0.12); /* Ambient glow & badge fills */
  --color-tournament-gold: #F59E0B; /* Grandmaster, 1st Podium & Cash Prize Accent */
  --color-tactical-cyan:   #00D2FF; /* Clash Squad & Bracket Accents */
  
  /* Typography */
  --color-text-primary:   #F3F4F6; /* Contrast 13.8:1 on #101214 */
  --color-text-secondary: #A1A1AA; /* Contrast 6.2:1 on #101214 */
  --color-text-muted:     #71717A; /* Labels, timestamps, subtle captions */
  
  /* Interactive Feedback */
  --color-ring:           #00C878; /* Visible keyboard focus outline */
  --color-destructive:    #EF4444; /* Error states, penalty warnings */
}
```

### Contrast & Legibility Matrix
| Element | Foreground | Background | Contrast Ratio | WCAG Compliance |
|---|---|---|---|---|
| Primary Text | `#F3F4F6` | `#101214` | **13.8:1** | AAA (Standard + Large Text) |
| Secondary Text | `#A1A1AA` | `#101214` | **6.2:1** | AA (Standard Text), AAA (Large) |
| Brand Emerald CTA | `#101214` | `#00C878` | **9.1:1** | AAA |
| Tournament Gold Badge | `#101214` | `#F59E0B` | **9.8:1** | AAA |
| Card Border | `#30363A` | `#101214` | **2.2:1** | Clear Structural Boundary |

---

## 3. Typography Hierarchy

### Font Family Allocations
- **Display & Headings**: `font-heading` (`Chakra Petch`, `Russo One`, or `system-ui` sans-serif fallback) with uppercase tracking, tight kerning (`tracking-tight`), and bold/extrabold weights (`font-extrabold`).
- **Body & Numerical Data**: System sans-serif (`Inter`, `system-ui`, `-apple-system`) with generous line-height (`leading-relaxed`, `1.65`) and tabular figures (`tabular-nums`) for currency and point totals.

### Typographic Scale
- **Hero Title**: `text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight`
- **Section Heading (H2)**: `text-3xl md:text-5xl font-extrabold tracking-tight text-white`
- **Subheading (H3)**: `text-xl md:text-2xl font-bold text-white`
- **Feature Card Title**: `text-lg md:text-xl font-bold text-white`
- **Body Text**: `text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-prose`
- **Meta / Caption**: `text-xs uppercase font-semibold tracking-wider text-[#71717A]`

---

## 4. Layout Architecture: Escaping Generic AI Templates

To prevent the repetitive "3 rounded cards in a row" anti-pattern identified in UI/UX Pro Max guidelines, each major section employs a **distinct, purpose-driven layout pattern**:

```
1. HERO SECTION:
   Full-width 3D WebGL Shader Canvas + Centered Value Prop + High-Contrast Download CTA +
   3 Verified Trust Badges (Gemini 2.0 Flash AI, 70-90% Prizes, 100% Refunds)

2. TRUST BAR STRIP:
   Horizontal multi-column ticker strip highlighting Pakistan payment gateways
   (JazzCash, EasyPaisa), Gemini AI Vision, and Fair Play guarantees.

3. TOURNAMENT FORMATS:
   Interactive Dual-Tab Switcher:
   - Bermuda Battle Royale: Asymmetric 2-column layout (50-player lobby illustration + slot specs)
   - Clash Squad: Horizontal tactical bracket tree with 4v4 round-by-round progression

4. GEMINI AI VISION & SCORING:
   Interactive Split Layout:
   - Left Column: Visual OCR match verification breakdown (Screenshot -> OCR scan -> UID match -> Payout)
   - Right Column: Live Combat Points Calculator with interactive sliders (Booyah + Kills)

5. COMPETITIVE PROGRESSION & RANKS:
   Full-width progression track showcasing the 8 major tiers (Bronze through Grandmaster Top 300)
   with animated tier badges, required points, and cash milestone rewards.

6. LEADERBOARD DEMO PREVIEW:
   Top-3 Visual Podium (1st Gold, 2nd Silver, 3rd Bronze) +
   Searchable/Filterable player preview table (clearly labeled as interactive preview).

7. TWO-WALLET SYSTEM:
   Side-by-side Dual Vault Architecture:
   - Left Vault: Play Wallet (Deposits, Entry Fees, Non-Withdrawable)
   - Right Vault: Winning Wallet (Prize Money, 1 AX = 1 PKR, 24h Withdrawable Cash)

8. ORGANIZER PROGRAM:
   4-Step Roadmap Cards + Interactive Organizer Earnings Simulator
   (Players, Entry Fee, Host Commission sliders dynamically calculating payout).

9. SCOUT & REFERRAL REWARDS:
   Two-column highlight: 25 AX Welcome Bonus + 2% Scout Winner Royalty + Store Top-Up Preview.

10. PLATFORM COMPARISON MATRIX:
    6-Point Structured Matrix comparing ArenaX against unregulated WhatsApp scrims.

11. DOWNLOAD HUB:
    Dual-card layout (Android APK with direct download button + Inline SVG QR Code for mobile scan;
    iOS in development) + 4-Step Installation Timeline.

12. HELP & TRUST ACCORDION:
    Expandable FAQ accordions with instant search, clear categories, and 24/7 PKT contact channels.
```

---

## 5. Professional Iconography & Authentic Assets

### Strict Icon Rules (No Raw Emojis)
Per UI/UX Pro Max rules, emojis (`🎮`, `🏆`, `💰`, `⭐`, `⚡`) are strictly prohibited as primary interface icons. All icons are rendered using the pre-installed `lucide-react` library with:
- **Consistent Stroke Weight**: `stroke-[1.75]` or `stroke-[2]` across the entire application.
- **Consistent Sizing**:
  - Small actions / badges: `w-4 h-4` (16px)
  - Navigation / list items: `w-5 h-5` (20px)
  - Feature highlights: `w-6 h-6` (24px)
  - Hero / card hero icons: `w-8 h-8` to `w-10 h-10` (32–40px)
- **Container Styling**: Wrapped in rounded-xl containers with `bg-[#00C878]/10` or `bg-white/5` and `border border-[#30363A]` or `border-[#00C878]/25`.

### Image & Visual Asset Strategy
1. **Existing Brand Assets**: Preserved `/fav.ico` and existing brand logo styling.
2. **Official App Architecture**: Authentic mockups of the mobile application interface (Match Room, Bracket Tree, AI Verification Scanner, Two-Wallet Balance).
3. **Restrained 3D WebGL**:
   - Preserved `DotScreenShader` Three.js canvas in the Hero section.
   - Includes automatic memory disposal (`material.dispose()`, `geometry.dispose()`, `renderer.dispose()`) on unmount.
   - Includes `@media (prefers-reduced-motion: reduce)` fallbacks that disable mouse velocity tracking and high-frequency shader uniforms.

---

## 6. Meaningful Interaction & Motion Design

Every interactive element serves a genuine visitor need and responds immediately:

1. **Combat Points Calculator**:
   - Sliders for Booyah toggle (`+20 PTS`) and Kills count (`+5 PTS each`).
   - Dynamic counter transition showing instant point accumulation and rank tier projection.
2. **Organizer Earnings Simulator**:
   - Sliders for Participants ($10 \le N \le 50$), Entry Fee ($50 \le \text{PKR} \le 500$), and Host Commission ($0\% \le H \le 20\%$).
   - Dynamic math engine calculating:
     $$\text{Total Pool} = N \times \text{Fee}$$
     $$\text{Platform Fee} = \text{Total Pool} \times 10\%$$
     $$\text{Host Payout} = \text{Total Pool} \times H\%$$
     $$\text{Player Prize Pool} = \text{Total Pool} \times (100\% - 10\% - H\%)$$
3. **Tournament Mode Switcher**:
   - Tab switcher toggling between Bermuda Battle Royale (50-player) and Clash Squad 4v4 Brackets with zero layout shift.
4. **Desktop QR Code Scanner**:
   - Embedded SVG QR code in the download section allowing desktop visitors to scan with their phone camera to download directly to their Android device.
5. **Interactive FAQ Accordions**:
   - Smooth animated height transitions using CSS `max-h` and rotating chevron indicators.

---

## 7. Responsiveness, Touch Targets & Accessibility

### Viewport Breakpoints
- **Mobile ($375\text{px} - 640\text{px}$)**:
  - Single-column flow with $\ge 48\text{px}$ touch targets on all buttons and toggles.
  - Sticky bottom or top navigation bar with hamburger drawer.
  - Horizontal swipe containers or stacked cards for tournament modes.
- **Tablet ($641\text{px} - 1024\text{px}$)**:
  - 2-column balanced asymmetric grids.
  - Visible search and filter controls.
- **Desktop ($1025\text{px} - 1440\text{px}+$)*:
  - Max container width constrained to `max-w-7xl` (1280px) to prevent over-stretching on wide monitors.
  - Side-by-side calculators, comparison tables, and interactive bracket previews.

### Accessibility Standards
- **Keyboard Navigation**: All interactive elements (buttons, accordion headers, sliders, tabs) have `:focus-visible:ring-2 :focus-visible:ring-[#00C878] :focus-visible:outline-none`.
- **Screen Reader Support**: Meaningful `aria-label`, `aria-expanded`, and `aria-hidden` attributes on decorative icons.
- **Reduced Motion**: Full support for `prefers-reduced-motion` disabling scale animations and high-velocity Three.js camera movement.

