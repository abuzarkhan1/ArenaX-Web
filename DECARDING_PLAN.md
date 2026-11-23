# ArenaX — De-Carding & Editorial Redesign Plan

**Problem:** Nearly every block on the site is a rounded, filled, bordered card. Hero, stats, wallet stages, rank tiers, comparison table, download options and even the phone preview all carry the same visual weight. That repetition makes the page read as a dashboard of boxes rather than a designed product story.

**Goal:** Keep every word, route, calculator and interaction. Replace the box-first layout with an **editorial broadcast system**: open canvas, hairline structure, oversized typography, asymmetric composition and a small, deliberate container budget.

---

## 1. Design principles

1. **Container budget.** Content sits directly on the canvas. A box is allowed only when it performs a function: a device frame, a form field, a data table, a slider, a QR tile. Content containers do not get borders, fills or shadows.
2. **Lines, not boxes.** Group with 1px rules, vertical hairlines and whitespace. Rules may run to the viewport edge.
3. **Type does the hierarchy.** Big titles, huge numbers and mono annotations replace card headers, badges and icon chips.
4. **Asymmetry over grids of equals.** Alternate 7/5, 5/7 and full-bleed splits. Not every block is the same width.
5. **Hard edges.** Radii fall to 0–4px. Pills become labels or text tabs. Icon orbs become bare icons.
6. **Depth from light, not panels.** Radial emerald glows, masked grids, outlined display type and image bleed replace drop shadows and frosted fills.
7. **One accent, used surgically.** Emerald marks the active item, the key metric or the primary action — never every border.

---

## 2. Container inventory & treatment

| Area | Current containers | De-carded treatment |
|---|---|---|
| Hero | rounded stage frame + stats panel | character floats on canvas; outlined ARENAX bleed; open 4-up feature ledger; open 3-up stat rule |
| Section headers | rule + title + card-ish aside | full-width top rule, huge outlined section index, title + mono kicker, aside as bare text |
| App showcase | 3 chapter cards, tab pill container | open chapter ledger with hairline rows; underline text tabs; keep only the phone as a device |
| Tournaments | tab container, preview card | underline tabs; spec list on canvas; preview becomes a thin broadcast frame (functional) |
| Vision engine | scoreboard card, telemetry card, calculator card | scoreboard as a corner-ticked screen; telemetry as a data ledger; calculator open on canvas |
| Wallet | flow panel + 5 node cards + 2 vault cards + 4 tiles | horizontal step ledger; two open vault columns divided by a hairline; spec rows as `dl` |
| Ranks | 8 tier cards + simulator card + inner controls | 4×2 open tier matrix with hairlines; selected tier marked by emerald top rule; open calculator |
| Organizers | icon boxes + simulator card | numbered list rows; open revenue ledger with slider controls |
| How it works | step cards + preview card | open vertical timeline; preview as a single thin-framed HUD |
| Comparison | large rounded table card | borderless table with row rules and an emerald-washed ArenaX column |
| Scout | two large cards + 3 stat tiles + 3 item cards | two open columns split by a hairline; large figures; voucher ledger |
| Download | two release cards + 4 step cards | two open release columns; QR as a white tile; 4-up step ledger |
| Footer | mostly open | remove remaining rounded icon tiles; keep the wordmark bleed |
| About / FAQ / Contact / Legal | large filled panels and accordion cards | open editorial columns, hairline accordions, functional form fields only |

**Containers that remain:** phone frame, QR tile, form inputs, slider tracks, legal content callouts, the scoreboard screen (as a media object), and the mobile drawer sheet.

---

## 3. Type & layout system

- Display: Manrope 700–800, tighter tracking (`-0.04em`).
- Section title: `clamp(2.1rem, 4.1vw, 3.5rem)`.
- Hero: `clamp(2.5rem, 6.2vw, 5.2rem)`.
- Giant ghost index: 6–9rem outlined numeral per section.
- Body: Inter 15–16px, 65–72ch measure.
- Mono: Source Code Pro 10–11px, `0.18em` tracking for annotations.
- Section padding: `clamp(72px, 9vw, 132px)`.
- Full-width rules separate sections; inner columns use `border-l`.
- Radii: 0–2px for panels, 4px for controls; no 16–18px cards.

---

## 4. Phase plan

### Phase 0 — System reset
- Update radii, badges, buttons, icon treatment, section-header primitive.
- Add utilities: `editorial-rule`, `ghost-index`, `open-ledger`, `media-bleed`, `stat-figure`, `text-tab`.
- Remove global card shadows and blur from content surfaces.

### Phase 1 — Hero & chrome
- Rebuild the hero as a poster: open metadata rail, poster headline, free-floating character, outlined wordmark, feature ledger, open stats.
- Navbar: square controls, remove pill rail; underline active states.
- Footer: remove remaining rounded tiles.

### Phase 2 — Core product story
- App showcase chapter ledger + underline tabs.
- Tournament underline tabs + broadcast preview frame.
- Vision engine scoreboard frame + telemetry ledger + open calculator.
- Wallet step ledger + open vault columns.
- Ranks open matrix + open calculator.

### Phase 3 — Supporting sections
- Organizer numbered pillars + open revenue ledger.
- How it works open timeline.
- Comparison borderless table.
- Scout open two-column ledger.
- Download open release columns + step ledger.

### Phase 4 — Standalone pages
- About: open story column + value rows.
- FAQ: hairline accordion, text-filter tabs.
- Contact: open channels + functional form.
- Legal pages: open document column, hairline article sections.

### Phase 5 — QA
- Responsive audit at 320–1920; no horizontal overflow.
- Keyboard/focus, reduced motion, tap targets.
- Typecheck, lint, build, full test suite; update stale design-contract tests.
- Refresh report screenshots and add a de-carding addendum.

---

## 5. Acceptance criteria

- No content container in the landing page uses `rounded-card`, a filled card background, or a drop shadow.
- At least 80% of previously carded blocks are replaced with open canvas, rules or ledgers.
- The hero contains zero bordered panels except the two buttons.
- Section titles use one scale; each section has a visible index and a rule.
- No horizontal overflow at 320, 360, 390, 768, 1024, 1280, 1440, 1920.
- All copy, calculators, links, analytics and routes unchanged.
- 546-test suite green after updating stale presentation assertions.
