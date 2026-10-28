# ArenaX Feature Integration Plan

## 1. Executive Overview & Methodology
This integration plan systematically aligns the verified mobile application capabilities (sourced directly from `Docs/Verified Feature Matrix`) with the official ArenaX website.

Every feature documented from the application source code is assigned a concrete website treatment:
- **Enhanced In-Place**: Enhancing an existing website section to reflect verified app behavior.
- **New Section / Module**: Introducing a dedicated, modular presentation block on the homepage or relevant page.
- **Interactive Component**: Providing an exploratory tool (calculator, switcher, ladder explorer) that delivers immediate utility without faking live production data.
- **Explicit Exclusion**: Documenting features that must **not** be advertised on the public website due to being schema placeholders (e.g. PUBG/COD) or internal admin tools.

---

## 2. Feature-by-Feature Integration Matrix

| # | Verified App Feature | Source Code Evidence | Current Website State | Proposed Website Treatment | Implementation Target |
|---|---|---|---|---|---|
| **1** | **Free Fire Bermuda Tournaments** (48–50 BR, Solo/Duo/Squad) | `Tournament.js`, `tournamentController.js`, `HomeScreen.jsx` | Mentioned generically without format details or rules. | **Dedicated Interactive Dual-Format Switcher**: Showcase Bermuda 50-player lobby, slot countdowns, registration steps, and Solo/Duo/Squad modes. | New module `TournamentModes.jsx` on Homepage. |
| **2** | **Free Fire Clash Squad (CS) Brackets** (4v4 tactical elimination) | `bracketService.js`, `ClashSquadScreen.jsx`, `Match.js` | Completely missing from website. | **Clash Squad Bracket Presentation**: Visual tournament bracket showcase highlighting 4v4 squad battles, round progression, and instant elimination thrills. | Included in `TournamentModes.jsx` with tab toggle. |
| **3** | **Automated Gemini AI Vision Settlement** | `backend/src/services/aiVisionService.js`, `settlementService.js` | Missing from website (site claims manual verification). | **Gemini AI Vision Showcase**: Showcase Google Gemini 2.0 Flash AI OCR scoreboard verification as the #1 trust differentiator over manual WhatsApp scrims. | New module `AIVisionShowcase.jsx` on Homepage. |
| **4** | **Two-Wallet Isolation (`playWallet` vs `winningWallet`)** | `User.js` (lines 101–124), `financialService.js`, `WalletScreen.jsx` | Unclear; site mentions "coins" vaguely. | **Two-Wallet Security Explainer**: Clear visual breakdown of non-withdrawable entry coins vs. withdrawable cash prizes, highlighting 1 AX = 1 PKR parity and zero-tax transparent payouts. | New module `WalletSection.jsx` on Homepage + updated FAQ. |
| **5** | **Dedicated Organizer Wallet (`organizerWallet`)** | `User.js` (line 117), `organizerController.js`, `OrganizerEarningsScreen.jsx` | Missing from website. | **Organizer Financial Isolation**: Feature dedicated host balance in Organizer section, guaranteeing host earnings cannot be commingled with player prize pools. | Included in `OrganizerProgram.jsx`. |
| **6** | **36-Sub-Tier Competitive Progression** (Bronze I to GM VI) | `backend/src/utils/rankSystem.js`, `leaderboardService.js` | Missing; only generic "Leaderboards" mentioned. | **Interactive Rank Ladder Explorer**: Display all 8 major tiers (Bronze, Silver, Gold, Platinum, Diamond, Heroic, Master, Grandmaster) with badge visuals, required points, and cash milestones. | New module `LeaderboardTiers.jsx` on Homepage. |
| **7** | **Authoritative Combat Scoring** (Booyah = 20 PTS, Kill = 5 PTS) | `backend/src/utils/rankSystem.js` (lines 74–92) | Missing exact point values. | **Interactive Combat Points Calculator**: Real-time slider tool allowing players to simulate points: `Points = 20 (Booyah) + (Kills * 5)`. | Embedded inside `AIVisionShowcase.jsx`. |
| **8** | **Rank Milestone Cash Rewards** | `referralService.js`, `ReferralMilestoneClaim.js` | Missing from website. | **Scout Rank Progression Rewards**: Showcase ongoing cash rewards earned whenever an invited player promotes to higher rank tiers (Silver through Grandmaster). | New module `ScoutRewards.jsx` on Homepage. |
| **9** | **50% Lifetime Rake Circuit Breaker** | `referralService.js` (lines 242–323) | Missing from website. | **Platform Solvency Guarantee**: Position in TrustBar/FAQ as mathematical liquidity and solvency protection guaranteeing 100% payout fulfillment. | Mentioned in Trust & Safety FAQ. |
| **10** | **Scout Winner Royalty (2%)** | `referralService.js` (lines 421–499) | Missing from website. | **2% Winner Royalty Card**: Explain how community scouts earn 2% cash royalties from referred players' tournament wins, paid entirely from admin rake without deducting player winnings. | Included in `ScoutRewards.jsx`. |
| **11** | **Referee Welcome Bonus (25 AX Coins)** | `referralService.js` (lines 512–600) | Missing from website. | **Starter Bonus Callout**: Feature 25 AX Coin starter balance directly in Hero badge and Download onboarding cards to maximize registration conversion. | Integrated into `Hero.jsx` & `Download.jsx`. |
| **12** | **Unique 6-Digit Squad Codes** | `Team.js` (lines 16–21, 87–100) | Generic "team management" text. | **"Squad Up in Seconds" Feature Card**: Showcase 6-digit squad codes enabling teammates to assemble in under 5 seconds without manual friend requests. | Enhanced in `Features.jsx`. |
| **13** | **Team Management (Captaincy & Rosters)** | `Team.js`, `teamController.js` | Generic card without roster details. | **Team Roster Controls**: Feature squad leader controls, leadership transfers, custom logos, and roster management. | Enhanced in `Features.jsx`. |
| **14** | **Decentralized Organizer Application** | `OrganizerApplication.js`, `organizerController.js` | Missing from website. | **4-Step Organizer Onboarding**: Guide prospective community hosts on applying, identity verification, launching tournaments, and automated earnings. | Dedicated section `OrganizerProgram.jsx`. |
| **15** | **Organizer Hosting Wizard** | `CreateTournamentScreen.jsx`, `Tournament.js` | Missing from website. | **In-App Tournament Creation Showcase**: Highlight custom slot caps, schedules, entry fees, and custom banners directly on mobile. | Included in `OrganizerProgram.jsx`. |
| **16** | **Transparent 3-Way Prize Split** (10% Admin, 0–20% Host, 70–90% Players) | `settlementService.js` (lines 46–107) | Missing; prize math not explained. | **Interactive Organizer Earnings Calculator**: Sliders for players (10–50), entry fee (PKR 50–500), and organizer cut (0–20%), dynamically showing exact player prize pool, host payout, and platform fee. | Embedded in `OrganizerProgram.jsx`. |
| **17** | **Verified Organizer Rating System** (1–5★) | `Review.js`, `reviewService.js` | Missing from website. | **Verified Player Reviews Card**: Highlight that only verified match participants can rate organizers, guaranteeing authentic community accountability. | Included in `OrganizerProgram.jsx`. |
| **18** | **Controlled Room Credential Release** | `Tournament.js`, `RoomDetailsModal.jsx` | Generic mention. | **Room Security Timeline**: Reassure players that Room ID & Password unlock strictly 10–15 minutes before match start for verified paid participants only. | Featured in `HowItWorks.jsx` & Rules. |
| **19** | **Live Stream Integration** | `Tournament.js` (lines 245–293) | Missing from website. | **Tournament Broadcasting Banner**: Mention YouTube, Twitch, and Facebook stream integrations for community shoutcasters and viewers. | Included in `TournamentModes.jsx`. |
| **20** | **In-App Store for Digital Top-ups** | `Product.js`, `StoreScreen.jsx` | Missing from website. | **Digital Rewards Store Preview**: Showcase direct redemption of earned AX Coins for Free Fire Diamonds, vouchers, and gaming gear. | Included in `ScoutRewards.jsx`. |
| **21** | **Events Hub & Daily Missions** | `EventMission.js`, `EventsScreen.jsx` | Missing from website. | **Daily Missions Card**: Promote daily login rewards, kill bounties, and match completion quests that award free tournament entry coins. | Enhanced in `Features.jsx`. |
| **22** | **Platform Event Announcements** | `EventAnnouncement.js`, `EventsScreen.jsx` | Missing from website. | **In-App News Bulletin**: Mention real-time community patch notes and championship announcements. | Enhanced in `Features.jsx`. |
| **23** | **P2P Coin Transfers** | `p2pTransferService.js`, `SendCoinsScreen.jsx` | Missing from website. | **Squad P2P Transfers**: Explain instantaneous username transfers between squadmates with velocity limits and anti-fraud protections. | Enhanced in `Features.jsx` & FAQ. |
| **24** | **Pakistani Payment Deposits** (JazzCash, EasyPaisa, Bank) | `Deposit.js`, `WalletScreen.jsx` | Mentioned, but lacks verification details. | **Verified Local Payment Gateways**: Feature official JazzCash & EasyPaisa badges, 50 PKR minimum deposit, and explicit disclosure of manual admin slip review within business hours. | Highlighted in `WalletSection.jsx` & TrustBar. |
| **25** | **Withdrawable Cash Payouts** (Min 100 AX, 24h SLA) | `Withdrawal.js`, `withdrawalController.js` | Generic 24-48h text. | **24-Hour Cashout SLA**: Clear, transparent withdrawal policy to JazzCash, EasyPaisa, and Pakistani Bank Accounts with 100 AX minimum. | Highlighted in `WalletSection.jsx`. |
| **26** | **Dedicated Fund Security Password** | `User.js` (lines 311–320), `withdrawalController.js` | Missing from website. | **Trading-Grade Fund Security**: Highlight secondary cryptographic withdrawal password protecting player balances from unauthorized transfers. | Highlighted in `WalletSection.jsx`. |
| **27** | **Automated Cancellation Refunds** | `Tournament.js`, `settlementService.js` | Vague refund policy. | **100% Automated Refund Guarantee**: Explain that if a tournament is cancelled by admin or host, entry fees return 100% to source wallets instantly. | Featured in `TrustBar.jsx` & FAQ. |
| **28** | **Player Public Profiles & Likes** | `ProfileLike.js`, `PlayerPublicProfileScreen.jsx` | Missing from website. | **Player Identity & Public Profiles**: Highlight win rates, K/D ratios, match history, and community profile likes. | Enhanced in `Features.jsx`. |
| **29** | **Push & Real-Time Socket Alerts** | `pushNotification.js`, `socketService.js` | Generic text. | **Match Alert System**: Reassure players of instant push alerts for room credentials, match start, and tournament payouts. | Enhanced in `Features.jsx`. |
| **30** | **Platform Comparison (ArenaX vs WhatsApp Scrims)** | Synthesized competitive analysis | Missing from website. | **6-Point Trust & Fairness Comparison Table**: Compare ArenaX against unregulated WhatsApp scrims across payout speed, cheat detection, prize escrow, and automated brackets. | New module `PlatformComparison.jsx` on Homepage. |

---

## 3. Explicit Feature Exclusions (What NOT to Advertise)

1. **PUBG Mobile & Call of Duty Mobile**:
   - *Reason*: Although enum keys exist in the backend database schema, the mobile app UI and tournament controllers are 100% specialized for Free Fire. Advertising PUBG Mobile or COD Mobile would mislead visitors into expecting active lobbies.
   - *Policy*: Do not list PUBG Mobile or COD Mobile as active tournament categories. Focus exclusively on Free Fire Bermuda and Clash Squad.
2. **Automated Banking Gateway APIs**:
   - *Reason*: Deposit verification in the mobile app is performed via manual admin screenshot review in the admin desk.
   - *Policy*: State clearly that deposits are verified promptly by the financial desk during operating hours (PKT), rather than falsely claiming instant algorithmic bank API hooks.
3. **Internal Administrative Controls**:
   - *Reason*: Admin ban hammers, rake adjustment knobs, and manual payout override switches are internal operational tools, not public user features.
   - *Policy*: Present as security and governance standards ("Admin Review Desk", "Anti-Fraud Monitoring") without exposing backend architectural details.

