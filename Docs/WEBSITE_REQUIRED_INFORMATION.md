# ArenaX Website Required Information & Owner Decisions

## 1. Executive Purpose
This document compiles all items discovered during the website audit, mobile app documentation review, and codebase inspection that require confirmation, clarification, or input from the product owner.

Documenting these items ensures that:
- No assumptions are silently made about external domains, URLs, or business rules.
- Production hosting, domain routing, and legal jurisdictions remain accurate.
- Clear distinction is maintained between production facts and educational demonstrations.

---

## 2. Decision & Confirmation Matrix

| # | Topic | Current State in Codebase | Mobile App Evidence | Proposed Resolution | Decision Status |
|---|---|---|---|---|---|
| **1** | **Official Support Email Address** | Inconsistent across pages: `arenasupprt@gmail.com` (typo in Contact, FAQ, Terms, index.html) vs `support@arenax.com` (Footer). | `arenasupport@gmail.com` is referenced in app support files. | **Standardize to `arenasupport@gmail.com`** across all 5 pages, footer, and schema markup to prevent dropped user inquiries. | **Awaiting Confirmation** |
| **2** | **Official APK Download Source** | Hardcoded to: `https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk` | App documentation lists `v1.0.0` as release build; GitHub release is `v2.6`. | **Preserve the working GitHub release URL** so existing download functionality is never broken. Clarify whether a direct CDN or Play Store URL is planned. | **Awaiting Confirmation** |
| **3** | **Official Canonical Domain** | `index.html` uses `https://marenax.site/`; `App.tsx` SEO component uses `https://marenax.com/`. | Deployment is already active. User clarified: *"website already deployed doesnot need any domain it was just for your knowledge"*. | **Retain existing dual references** without altering deployment configuration or DNS. | **Confirmed (No change needed)** |
| **4** | **Support Working Hours** | Contact page states: *"Mon-Sat, 9 AM to 6 PM IST"* (Indian Standard Time). | ArenaX is specialized for Pakistan. | **Update to `PKT` (Pakistan Standard Time)**: *"Mon-Sat, 9:00 AM to 6:00 PM PKT"*. | **Awaiting Confirmation** |
| **5** | **Terms & Conditions Jurisdiction** | Section 12 & 13 cite: *"Arbitration and Conciliation Act, 1996 in Bangalore, Pakistan"* and *"courts of Bangalore, Karnataka"*. | Copy-paste artifact from an Indian template. | **Replace with Pakistani jurisdiction**: Arbitration Act, 1940 (Pakistan) and competent courts of Lahore / Islamabad, Pakistan. | **Awaiting Confirmation** |
| **6** | **Live Leaderboard Data API** | The website currently has no backend API connection to the mobile database. | Leaderboard API exists in `backend/src/services/leaderboardService.js` but is not exposed to a public web CORS endpoint. | **Present as an Interactive Labeled Demo**: Display a sleek top-3 podium and searchable player table with an explicit badge: *"Interactive Demonstration — Download App for Live Seasonal Rankings"*. | **Awaiting Confirmation** |
| **7** | **PUBG Mobile & COD Mobile Mentions** | Current site mentions "Free Fire and PUBG Mobile" throughout Hero, Features, and FAQ. | `Docs/Verified Feature Matrix` explicitly instructs: *"Do not advertise on website; current mobile UI is strictly dedicated to Free Fire."* | **Focus website messaging 100% on Free Fire** (Bermuda Battle Royale and Clash Squad 4v4). Retain generic gaming keywords in SEO meta tags for discovery. | **Awaiting Confirmation** |
| **8** | **Deposit Verification Clarification** | Current FAQ says *"The coins will be credited instantly to your account"*. | `Docs/Verified Feature Matrix` states: *"Not implemented (Manual Admin review) ... State that deposits are verified by the financial desk within business hours."* | **Clarify deposit verification**: State that JazzCash / EasyPaisa deposits are verified promptly by the admin review desk during operating hours to set accurate player expectations. | **Awaiting Confirmation** |

---

## 3. Summary of Recommendations for Immediate Action
1. **Email Fix**: Approve updating `arenasupprt@gmail.com` to `arenasupport@gmail.com`.
2. **Jurisdiction Fix**: Approve correcting "Bangalore, Pakistan / Karnataka" to Pakistani arbitration law and competent Pakistani courts.
3. **Timezone Fix**: Approve changing support hours from `IST` to `PKT`.
4. **Game Focus**: Approve focusing primary copy exclusively on Free Fire (Bermuda and Clash Squad), while keeping PUBG keywords purely in background SEO tags.
5. **Leaderboard Presentation**: Approve labeling the web leaderboard preview as an interactive showcase, directing users to the mobile app for live seasonal leaderboards.

