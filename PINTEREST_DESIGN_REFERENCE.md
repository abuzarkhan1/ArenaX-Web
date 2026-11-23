# ArenaX premium 3D redesign research

## Pinterest search

Searches explored: [premium 3D website UI](https://www.pinterest.com/search/pins/?q=premium%203d%20website%20ui%20design), [Awwwards 3D website inspiration](https://www.pinterest.com/search/pins/?q=awwwwards%203d%20website%20inspiration), [modern 3D SaaS landing page](https://www.pinterest.com/search/pins/?q=modern%203d%20saas%20landing%20page), [premium dark website design](https://www.pinterest.com/search/pins/?q=premium%20dark%20website%20design), [futuristic minimal web design](https://www.pinterest.com/search/pins/?q=futuristic%20minimal%20web%20design), [interactive 3D landing page](https://www.pinterest.com/search/pins/?q=interactive%203d%20landing%20page), [high-end digital product website](https://www.pinterest.com/search/pins/?q=high%20end%20digital%20product%20website), [3D glassmorphism web design](https://www.pinterest.com/search/pins/?q=3d%20glassmorphism%20web%20design), [premium gaming platform website](https://www.pinterest.com/search/pins/?q=premium%20gaming%20platform%20website), and [creative typography web design](https://www.pinterest.com/search/pins/?q=creative%20typography%20web%20design).

Pinterest loaded the search pages and exposed a small set of preview images, but an account sign-in overlay blocked inspection of individual Pins and their source sites. I have not attributed any individual design to Pinterest or invented Pin links. The visual themes below were checked against public, traceable Dribbble and Awwwards project pages instead.

## Ten verifiable references

1. [EGA Esports Gaming Website Platform — Erik Padamans, Dribbble](https://dribbble.com/shots/25685657-Esports-Gaming-Website-Platform-UI-UX-Design). Tournament data, leaderboard hierarchy, and a platform-wide product system.
2. [Esports Tournament Landing Page — SK Farhad Hossen, Dribbble](https://dribbble.com/shots/27104861-Gaming-Website-Design-Esports-Tournament-Landing-Page-UI-UX). Dark competition mood with a direct path from event discovery to joining.
3. [Tournament Dashboard — Erik Padamans, Dribbble](https://dribbble.com/shots/25521082-Gaming-Website-Design-Esports-Tournament-Dashboard-UI-UX). Scannable active and upcoming event information.
4. [EGA Mobile Esports Website — Erik Padamans, Dribbble](https://dribbble.com/shots/25880077-Esports-Gaming-Website-Mobile-UI-UX-Design). Compact game switching and responsive event discovery.
5. [Quest 3D Gaming Landing Page — Fulcrum Rocks, Dribbble](https://dribbble.com/shots/23583484-Gaming-Website-Design-Esports-Landign-Page-3D-Gaming-Design). Dimensional gaming imagery applied to a discovery page.
6. [Game Landing Page, 3D Gaming Design — Musemind, Dribbble](https://dribbble.com/shots/25622141-Game-Landing-Page-I-3D-Gaming-Design). 3D-led hero art paired with straightforward navigation.
7. [Free Fire Gaming Website UI — PicTown, Dribbble](https://dribbble.com/shots/22362112-Free-Fire-Gaming-Website-UI-gaming). Directly relevant game and tournament visual context.
8. [Lusion — Awwwards Site of the Day](https://www.awwwards.com/sites/lusion). Monochrome WebGL experience with scroll navigation and interactive 3D figures.
9. [Awards Racing — Awwwards Site of the Day](https://www.awwwards.com/sites/awards-racing). Browser-based Three.js game showing a strong link between competition and interaction.
10. [A24 — Awwwards Site of the Day](https://www.awwwards.com/sites/a24). Minimal black-and-white palette with a 3D disc-based content exploration model.

## Three selected references

- **EGA platform:** strongest fit for ArenaX’s real product needs. Its tournament and leaderboard structure keeps competition information easy to scan. I used that hierarchy to organize the existing player content without adding fictional event data.
- **SK Farhad tournament landing:** strongest fit for the first-screen narrative. Its dark staging and short join-oriented path informed the hero, while ArenaX’s existing emerald identity and Free Fire art remain its own.
- **Lusion:** strongest interaction reference for dimensional depth. It demonstrates how one interactive 3D centerpiece can carry an experience; ArenaX uses a lighter CSS 3D stage around its existing artwork rather than a heavy WebGL canvas.

## Chosen visual direction: Arena Field

One near-black arena surface, the established ArenaX emerald accent, oversized Manrope display type, compact match metadata, and a framed character stage with shallow perspective. Event information stays readable and functional. Dimensional hover and pointer movement are limited to the hero and selected panels; touch, reduced-motion, and narrow-screen users get static fallbacks. Glass is limited to small interface surfaces instead of being applied to every panel.

## Applied scope

The redesign covers the homepage sections (tournaments, story film, app journey, leaderboard, wallets, match steps, organizer information, player support and policies, community rewards, and download), plus About, FAQ, Contact, Terms, Privacy, Refund Policy, and Fair Play. Existing copy, route structure, brand mark, download links, FAQ filtering, format selection, scoring calculator, rank selector, and working interactions remain in place.
