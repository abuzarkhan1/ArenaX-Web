import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  computeCombatPoints,
  getTierFromPoints,
  computeRankGap,
  computeOrganizerRevenue,
  RANK_TIERS,
} from './helpers/formulas.ts';

describe('Adversarial Challenger Suite M3-2: Complete Milestone 3 Verification', () => {
  const root = process.cwd();

  // All 10 Milestone 3 Components
  const m3ComponentFiles = [
    { name: 'AppExperienceShowcase.tsx', path: path.join(root, 'src/components/AppExperienceShowcase.tsx'), anchor: 'app-showcase' },
    { name: 'TournamentModes.tsx', path: path.join(root, 'src/components/TournamentModes.tsx'), anchor: 'tournaments' },
    { name: 'AIVisionShowcase.tsx', path: path.join(root, 'src/components/AIVisionShowcase.tsx'), anchor: 'ai-vision' },
    { name: 'WalletSection.tsx', path: path.join(root, 'src/components/WalletSection.tsx'), anchor: 'wallet' },
    { name: 'LeaderboardTiers.tsx', path: path.join(root, 'src/components/LeaderboardTiers.tsx'), anchor: 'ranks' },
    { name: 'OrganizerProgram.tsx', path: path.join(root, 'src/components/OrganizerProgram.tsx'), anchor: 'organizers' },
    { name: 'ScoutRewards.tsx', path: path.join(root, 'src/components/ScoutRewards.tsx'), anchor: 'scout-rewards' },
    { name: 'HowItWorks.tsx', path: path.join(root, 'src/components/HowItWorks.tsx'), anchor: 'how-it-works' },
    { name: 'PlatformComparison.tsx', path: path.join(root, 'src/components/PlatformComparison.tsx'), anchor: 'comparison' },
    { name: 'Download.tsx', path: path.join(root, 'src/components/Download.tsx'), anchor: 'download' },
  ];

  const m3Components = m3ComponentFiles.map((item) => ({
    ...item,
    src: fs.readFileSync(item.path, 'utf8'),
  }));

  // =========================================================================
  // 1. Authoritative Reference Integrity (Read-Only Hard Constraint)
  // =========================================================================
  describe('Authoritative Reference Integrity (Read-Only Hard Constraint)', () => {
    const referenceHtmlPath = path.join(root, 'Supabase _ The Postgres Development Platform.html');
    const referenceFilesDir = path.join(root, 'Supabase _ The Postgres Development Platform_files');

    it('verifies reference HTML file exists and matches exact SHA-256 and size', () => {
      assert.ok(fs.existsSync(referenceHtmlPath), 'Reference HTML file must exist');
      const stat = fs.statSync(referenceHtmlPath);
      assert.equal(stat.size, 1396412, 'Reference HTML file size must be exactly 1,396,412 bytes');

      const content = fs.readFileSync(referenceHtmlPath);
      const hash = crypto.createHash('sha256').update(content).digest('hex').toUpperCase();
      assert.equal(
        hash,
        'CFBAB0C0F7D9ACAA887ECF3699EBDE892647F81C1CD023E4F3C156F8B6707B50',
        'Reference HTML file SHA-256 must strictly match uncorrupted baseline'
      );
    });

    it('verifies reference assets directory exists and is intact', () => {
      assert.ok(fs.existsSync(referenceFilesDir), 'Reference files directory must exist');
      const files = fs.readdirSync(referenceFilesDir);
      assert.ok(files.length > 0, 'Reference files directory must not be empty');
    });
  });

  // =========================================================================
  // 2. DOM Anchor Section IDs across All 10 Components
  // =========================================================================
  describe('DOM Anchor Section IDs across All 10 Milestone 3 Components', () => {
    it('verifies all 10 anchor DOM section IDs exist verbatim', () => {
      for (const comp of m3Components) {
        const idPattern = new RegExp(`id=["']${comp.anchor}["']`);
        assert.ok(
          idPattern.test(comp.src),
          `Component ${comp.name} must define verbatim anchor id="${comp.anchor}"`
        );
      }
    });
  });

  // =========================================================================
  // 3. Supabase Design Tokens & Styling Scanner across All 10 Components
  // =========================================================================
  describe('Supabase Design Tokens & Styling Scanner across All 10 Components', () => {
    it('verifies Supabase dark canvas #121212 or bg-bg-1 presence in all 10 components', () => {
      for (const comp of m3Components) {
        const hasCanvas = comp.src.includes('#121212') || comp.src.includes('bg-bg-1');
        assert.ok(
          hasCanvas,
          `Component ${comp.name} must incorporate Supabase #121212 dark canvas token`
        );
      }
    });

    it('verifies Supabase card surface #171717 or bg-bg-2 presence in all 10 components', () => {
      for (const comp of m3Components) {
        const hasCard = comp.src.includes('#171717') || comp.src.includes('bg-bg-2');
        assert.ok(
          hasCard,
          `Component ${comp.name} must incorporate Supabase #171717 card surface token`
        );
      }
    });

    it('verifies Supabase emerald green accent #3ECF8E presence in all 10 components', () => {
      for (const comp of m3Components) {
        const hasAccent = comp.src.includes('#3ECF8E') || comp.src.includes('text-accent') || comp.src.includes('bg-accent');
        assert.ok(
          hasAccent,
          `Component ${comp.name} must incorporate Supabase #3ECF8E green accent token`
        );
      }
    });

    it('verifies hairline border rgba(255, 255, 255, 0.08) or border-white/[0.08] in all 10 components', () => {
      for (const comp of m3Components) {
        const hasHairline = comp.src.includes('border-white/[0.08]') || comp.src.includes('rgba(255, 255, 255, 0.08)') || comp.src.includes('border-hairline');
        assert.ok(
          hasHairline,
          `Component ${comp.name} must incorporate Supabase hairline border token`
        );
      }
    });

    it('strictly forbids legacy saturated neon greens (#00FF66, #00E676) across all 10 components', () => {
      const forbiddenGreens = ['#00FF66', '#00E676', '#00ff66', '#00e676'];
      for (const comp of m3Components) {
        for (const green of forbiddenGreens) {
          assert.ok(
            !comp.src.includes(green),
            `Component ${comp.name} contains forbidden legacy saturated neon green ${green}`
          );
        }
      }
    });
  });

  // =========================================================================
  // 4. Glitch & Bracket Check: Balanced Arbitrary Values & Zero Literal Leaks
  // =========================================================================
  describe('Glitch, Syntax & Bracket Integrity across All 10 Components', () => {
    it('verifies 0 unbalanced Tailwind arbitrary brackets [...] in all 10 components', () => {
      for (const comp of m3Components) {
        // Find all arbitrary Tailwind brackets e.g. bg-[#121212], border-white/[0.08], shadow-[...]
        let openCount = 0;
        const chars = comp.src;

        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i];
          if (ch === '[') {
            openCount++;
          } else if (ch === ']') {
            openCount--;
            assert.ok(
              openCount >= 0,
              `Unbalanced closing bracket ']' detected in ${comp.name} at character index ${i}`
            );
          }
        }

        assert.equal(
          openCount,
          0,
          `Unbalanced open bracket '[' detected in ${comp.name} (unclosed brackets: ${openCount})`
        );
      }
    });

    it('verifies 0 literal "undefined", "NaN", or "null" text renders in JSX across all 10 components', () => {
      const forbiddenRenders = [
        />\s*undefined\s*</,
        />\s*NaN\s*</,
        />\s*null\s*</,
        /['"`]undefined['"`]/,
        /['"`]NaN['"`]/,
        /['"`]null['"`]/,
      ];

      for (const comp of m3Components) {
        for (const pattern of forbiddenRenders) {
          const match = comp.src.match(pattern);
          assert.ok(
            !match,
            `Component ${comp.name} contains literal glitch string matching ${pattern}: ${match ? match[0] : ''}`
          );
        }
      }
    });
  });

  // =========================================================================
  // 5. R1 Prohibition Audit across All 10 Components
  // =========================================================================
  describe('R1 Prohibition Audit across All 10 Components', () => {
    it('verifies 0 <Pill /> eyebrows in all 10 components', () => {
      for (const comp of m3Components) {
        const matches = comp.src.match(/<Pill\b[^>]*\/>/g) || comp.src.match(/<Pill\b/g) || [];
        assert.equal(
          matches.length,
          0,
          `Forbidden <Pill /> eyebrow detected in ${comp.name}: ${matches.join(', ')}`
        );
      }
    });

    it('verifies 0 <Stat ... subtext=... /> usage in all 10 components', () => {
      for (const comp of m3Components) {
        const matches = comp.src.match(/<Stat\b[^>]*\bsubtext\s*=/g) || [];
        assert.equal(
          matches.length,
          0,
          `Deprecated Stat subtext prop detected in ${comp.name}`
        );
      }
    });

    it('verifies 0 tagline declarations in all 10 components', () => {
      for (const comp of m3Components) {
        const matches = comp.src.match(/\btagline\s*:\s*['"`][^'"`]+['"`]/gi) || [];
        assert.equal(
          matches.length,
          0,
          `Tagline declaration detected in ${comp.name}`
        );
      }
    });

    it('strictly forbids flagged explanatory footnotes across all 10 components', () => {
      const forbiddenFootnotes = [
        'Protected Escrow',
        'Zero Hidden Commissions',
        'Instant Winning Wallet credit',
        'Credited directly to your dedicated Organizer Wallet',
        'Based on official rulebook formula',
        '10% Platform Rake',
        '50% lifetime platform rake circuit breaker',
        'Used for match entry fees & bonuses',
        'Available for 24h JazzCash/EasyPaisa cashout',
        'Protected by 6-digit Fund Password',
      ];

      for (const comp of m3Components) {
        for (const footnote of forbiddenFootnotes) {
          const regex = new RegExp(footnote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
          assert.ok(
            !regex.test(comp.src),
            `Forbidden footnote phrase "${footnote}" detected in ${comp.name}`
          );
        }
      }
    });
  });

  // =========================================================================
  // 6. Copy & Structural Invariants
  // =========================================================================
  describe('Copy & Structural Invariants Verification', () => {
    // 6.1 HowItWorks.tsx (6 steps 01-06)
    describe('HowItWorks.tsx (6 Steps Invariant)', () => {
      const howItWorks = m3Components.find((c) => c.name === 'HowItWorks.tsx')!;

      it('verifies all 6 steps exist with sequential identifiers 01 through 06', () => {
        const expectedSteps = ['01', '02', '03', '04', '05', '06'];
        for (const step of expectedSteps) {
          assert.ok(
            howItWorks.src.includes(`step: '${step}'`),
            `HowItWorks must define step: '${step}'`
          );
        }
      });

      it('verifies step titles match authoritative specification', () => {
        const expectedTitles = [
          'Download & Install APK',
          'Link Your Free Fire UID',
          'Assemble Your Squad',
          'Register for Tournaments',
          'Drop & Dominate',
          'AI Vision & 24h Cashout',
        ];
        for (const title of expectedTitles) {
          assert.ok(
            howItWorks.src.includes(title),
            `HowItWorks must contain step title "${title}"`
          );
        }
      });
    });

    // 6.2 PlatformComparison.tsx (2 columns: ArenaX vs Informal WhatsApp)
    describe('PlatformComparison.tsx (2 Column Invariant)', () => {
      const comparison = m3Components.find((c) => c.name === 'PlatformComparison.tsx')!;

      it('verifies exact column headers for ArenaX Official Client and Informal WhatsApp / Social Scrims', () => {
        assert.ok(
          comparison.src.includes('ArenaX Official Client'),
          'PlatformComparison must define column header "ArenaX Official Client"'
        );
        assert.ok(
          comparison.src.includes('Informal WhatsApp / Social Scrims'),
          'PlatformComparison must define column header "Informal WhatsApp / Social Scrims"'
        );
      });

      it('verifies all 6 evaluation dimensions exist', () => {
        const expectedDimensions = [
          'Result Verification',
          'Prize Money Protection',
          'Cashout Speed',
          'Scoring Transparency',
          'Match Cancellation',
          'Host Accountability',
        ];
        for (const dim of expectedDimensions) {
          assert.ok(
            comparison.src.includes(dim),
            `PlatformComparison must contain dimension "${dim}"`
          );
        }
      });
    });

    // 6.3 Download.tsx (4 Install Steps & QRCodeSVG)
    describe('Download.tsx (4 Install Steps & QRCodeSVG Invariant)', () => {
      const download = m3Components.find((c) => c.name === 'Download.tsx')!;

      it('verifies all 4 installation steps exist (01 to 04)', () => {
        const expectedInstallSteps = [
          { num: '01', title: 'Download APK' },
          { num: '02', title: 'Allow Source' },
          { num: '03', title: 'Install Package' },
          { num: '04', title: 'Link UID & Play' },
        ];

        for (const step of expectedInstallSteps) {
          assert.ok(
            download.src.includes(`num: '${step.num}'`) && download.src.includes(step.title),
            `Download must contain install step ${step.num}: ${step.title}`
          );
        }
      });

      it('verifies QRCodeSVG import and rendering with scannable properties', () => {
        assert.ok(
          download.src.includes("import { QRCodeSVG } from 'qrcode.react'") ||
          download.src.includes('QRCodeSVG'),
          'Download.tsx must import QRCodeSVG'
        );
        assert.ok(
          download.src.includes('<QRCodeSVG'),
          'Download.tsx must render <QRCodeSVG />'
        );
        assert.ok(
          download.src.includes('value={downloadUrl}'),
          'QRCodeSVG must encode downloadUrl'
        );
        assert.ok(
          download.src.includes('size={48}'),
          'QRCodeSVG must render at size={48}'
        );
      });

      it('verifies download URL points to authentic release APK', () => {
        assert.ok(
          download.src.includes('https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk'),
          'Download.tsx must reference authentic release APK endpoint'
        );
      });
    });

    // 6.4 AppExperienceShowcase.tsx
    describe('AppExperienceShowcase.tsx Chapters & 3D Integration', () => {
      const appShowcase = m3Components.find((c) => c.name === 'AppExperienceShowcase.tsx')!;

      it('verifies all 3 interactive chapters exist', () => {
        assert.ok(
          appShowcase.src.includes("id: 'match'") &&
          appShowcase.src.includes("num: '01'") &&
          appShowcase.src.includes("title: 'Match Credentials'"),
          'AppExperienceShowcase must define chapter 01 Match Credentials'
        );
        assert.ok(
          appShowcase.src.includes("id: 'ocr'") &&
          appShowcase.src.includes("num: '02'") &&
          appShowcase.src.includes("title: 'AI Scoreboard'"),
          'AppExperienceShowcase must define chapter 02 AI Scoreboard'
        );
        assert.ok(
          appShowcase.src.includes("id: 'wallet'") &&
          appShowcase.src.includes("num: '03'") &&
          appShowcase.src.includes("title: 'Dual-Vault Escrow'"),
          'AppExperienceShowcase must define chapter 03 Dual-Vault Escrow'
        );
      });

      it('verifies 3D rotation map and perspective styling', () => {
        assert.ok(appShowcase.src.includes('ROTATION_MAP'));
        assert.ok(appShowcase.src.includes('preserve-3d'));
      });
    });

    // 6.5 TournamentModes.tsx
    describe('TournamentModes.tsx Format Presets', () => {
      const tournament = m3Components.find((c) => c.name === 'TournamentModes.tsx')!;

      it('verifies Bermuda formats (Solo, Duo, Squad) and Clash Squad stages (Quarters, Semis, Finals)', () => {
        assert.ok(tournament.src.includes('bermudaData'));
        assert.ok(tournament.src.includes('csStageData'));
        assert.ok(tournament.src.includes('2,160 AX Cash'));
        assert.ok(tournament.src.includes('2,880 AX Cash'));
      });
    });

    // 6.6 AIVisionShowcase.tsx
    describe('AIVisionShowcase.tsx Scoring & Telemetry', () => {
      const aiVision = m3Components.find((c) => c.name === 'AIVisionShowcase.tsx')!;

      it('verifies exact combat points formula: (isBooyah ? 20 : 0) + kills * 5', () => {
        assert.ok(aiVision.src.includes('(isBooyah ? 20 : 0) + kills * 5'));
      });

      it('verifies kill count slider bounds and segmented control', () => {
        assert.ok(aiVision.src.includes('min="0"'));
        assert.ok(aiVision.src.includes('max="20"'));
        assert.ok(aiVision.src.includes('Booyah (+20 PTS)'));
        assert.ok(aiVision.src.includes('Top 2–48 (0 PTS)'));
      });
    });

    // 6.7 WalletSection.tsx
    describe('WalletSection.tsx Dual Vault & Cash Parity', () => {
      const wallet = m3Components.find((c) => c.name === 'WalletSection.tsx')!;

      it('verifies 1 AX = 1 PKR Cash Parity badges', () => {
        assert.ok(wallet.src.includes('1 AX = 1 PKR Cash Parity'));
        assert.ok(wallet.src.includes('1 AX = 1 PKR Cash'));
      });

      it('verifies 5-node horizontal lifecycle flow nodes', () => {
        const expectedNodes = ['Deposit', 'Play Wallet', 'Match Scrim', 'Winning Wallet', 'Cashout'];
        for (const node of expectedNodes) {
          assert.ok(wallet.src.includes(node), `WalletSection must contain flow node "${node}"`);
        }
      });
    });

    // 6.8 LeaderboardTiers.tsx
    describe('LeaderboardTiers.tsx 8 Tiers & Simulator', () => {
      const tiers = m3Components.find((c) => c.name === 'LeaderboardTiers.tsx')!;

      it('verifies all 8 tiers in RANK_TIERS array', () => {
        assert.equal(RANK_TIERS.length, 8);
        const tierNames = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Master', 'Grandmaster'];
        for (let i = 0; i < tierNames.length; i++) {
          assert.equal(RANK_TIERS[i].name, tierNames[i]);
        }
      });

      it('verifies promotion simulator slider and quick preset triggers', () => {
        assert.ok(tiers.src.includes('setCurrentPts(2500)'));
        assert.ok(tiers.src.includes('setCurrentPts(5000)'));
        assert.ok(tiers.src.includes('setCurrentPts(7500)'));
      });
    });

    // 6.9 OrganizerProgram.tsx
    describe('OrganizerProgram.tsx Economics & Pillars', () => {
      const organizer = m3Components.find((c) => c.name === 'OrganizerProgram.tsx')!;

      it('verifies 4 operational pillars and preserved Bermuda or Clash Squad copy', () => {
        assert.ok(organizer.src.includes("num: '01'"));
        assert.ok(organizer.src.includes("num: '02'"));
        assert.ok(organizer.src.includes("num: '03'"));
        assert.ok(organizer.src.includes("num: '04'"));
        assert.ok(organizer.src.includes('Bermuda or Clash Squad'));
      });

      it('verifies 10% platform fee calculation and slider ranges', () => {
        assert.ok(organizer.src.includes('min="10"') && organizer.src.includes('max="48"'));
        assert.ok(organizer.src.includes('min="50"') && organizer.src.includes('max="500"'));
        assert.ok(organizer.src.includes('min="0"') && organizer.src.includes('max="20"'));
        assert.ok(organizer.src.includes('PLATFORM FEE (10%)'));
      });
    });

    // 6.10 ScoutRewards.tsx
    describe('ScoutRewards.tsx Dual Program Cards', () => {
      const scout = m3Components.find((c) => c.name === 'ScoutRewards.tsx')!;

      it('verifies Scout Community Royalties card with 3 metrics', () => {
        assert.ok(scout.src.includes('Scout Community Royalties'));
        assert.ok(scout.src.includes('25 AX'));
        assert.ok(scout.src.includes('Starter Gift'));
        assert.ok(scout.src.includes('2% Cash'));
        assert.ok(scout.src.includes('Win Royalty'));
        assert.ok(scout.src.includes('Tier AX'));
        assert.ok(scout.src.includes('Rank Bonuses'));
      });

      it('verifies In-App Digital Rewards store card', () => {
        assert.ok(scout.src.includes('In-App Digital Rewards'));
        assert.ok(scout.src.includes('Redeem earned AX Coins inside the mobile app'));
      });
    });
  });

  // =========================================================================
  // 7. Adversarial Mathematical Engine & Randomized Stress-Testing
  // =========================================================================
  describe('Adversarial Mathematical Engine Stress-Testing', () => {
    describe('Combat Points Formula & Tier Thresholds Stress', () => {
      it('tests exact boundary thresholds for getTierFromPoints', () => {
        assert.equal(getTierFromPoints(0).name, 'Gold Tier');
        assert.equal(getTierFromPoints(24).name, 'Gold Tier');
        assert.equal(getTierFromPoints(24.99).name, 'Gold Tier');
        assert.equal(getTierFromPoints(25).name, 'Diamond Tier');
        assert.equal(getTierFromPoints(39).name, 'Diamond Tier');
        assert.equal(getTierFromPoints(39.99).name, 'Diamond Tier');
        assert.equal(getTierFromPoints(40).name, 'Heroic Tier');
        assert.equal(getTierFromPoints(59).name, 'Heroic Tier');
        assert.equal(getTierFromPoints(59.99).name, 'Heroic Tier');
        assert.equal(getTierFromPoints(60).name, 'Grandmaster Contender');
        assert.equal(getTierFromPoints(120).name, 'Grandmaster Contender');
      });

      it('executes 5,000 randomized combat points inputs without NaN or negative values', () => {
        for (let i = 0; i < 5000; i++) {
          const isBooyah = Math.random() > 0.5;
          const randomKills = (Math.random() - 0.2) * 50;
          const points = computeCombatPoints(isBooyah, randomKills);

          assert.ok(Number.isFinite(points), `Points must be finite, got ${points}`);
          assert.ok(!Number.isNaN(points), `Points must not be NaN, got ${points}`);
          assert.ok(points >= 0, `Points must never be negative, got ${points}`);

          const tier = getTierFromPoints(points);
          assert.ok(['Gold Tier', 'Diamond Tier', 'Heroic Tier', 'Grandmaster Contender'].includes(tier.name));
          assert.ok(tier.percent >= 25 && tier.percent <= 100);
          assert.ok(tier.badge.startsWith('/ranks/'));
        }
      });
    });

    describe('Promotion Gap Simulator Math Stress', () => {
      it('executes 5,000 randomized rank gap simulations across all 8 tiers', () => {
        for (let i = 0; i < 5000; i++) {
          const randomCurrentPts = Math.floor((Math.random() - 0.1) * 15000);
          const randomTier = RANK_TIERS[Math.floor(Math.random() * RANK_TIERS.length)];

          const gap = computeRankGap(randomCurrentPts, randomTier.targetMin);

          assert.ok(Number.isFinite(gap.ptsNeeded), `ptsNeeded must be finite: ${gap.ptsNeeded}`);
          assert.ok(Number.isFinite(gap.booyahsNeeded), `booyahsNeeded must be finite: ${gap.booyahsNeeded}`);
          assert.ok(Number.isFinite(gap.progressPercent), `progressPercent must be finite: ${gap.progressPercent}`);

          assert.ok(!Number.isNaN(gap.ptsNeeded), 'ptsNeeded must not be NaN');
          assert.ok(!Number.isNaN(gap.booyahsNeeded), 'booyahsNeeded must not be NaN');
          assert.ok(!Number.isNaN(gap.progressPercent), 'progressPercent must not be NaN');

          assert.ok(gap.ptsNeeded >= 0, `ptsNeeded must be non-negative: ${gap.ptsNeeded}`);
          assert.ok(gap.booyahsNeeded >= 0, `booyahsNeeded must be non-negative: ${gap.booyahsNeeded}`);
          assert.ok(gap.progressPercent >= 0 && gap.progressPercent <= 100, `progressPercent out of bounds: ${gap.progressPercent}`);

          if (gap.ptsNeeded === 0) {
            assert.equal(gap.booyahsNeeded, 0);
            assert.equal(gap.progressPercent, 100);
          }
        }
      });

      it('prevents division by zero when targetMin is 0 (Bronze starter base)', () => {
        const gap = computeRankGap(0, 0);
        assert.equal(gap.ptsNeeded, 0);
        assert.equal(gap.booyahsNeeded, 0);
        assert.equal(gap.progressPercent, 100);
        assert.ok(!Number.isNaN(gap.progressPercent));
        assert.ok(Number.isFinite(gap.progressPercent));
      });
    });

    describe('Organizer Revenue Conservation & Economic Invariants Stress', () => {
      it('verifies exact revenue conservation across 5,000 randomized valid tournament inputs', () => {
        for (let i = 0; i < 5000; i++) {
          const participants = Math.floor(Math.random() * 39) + 10;
          const entryFee = Math.floor(Math.random() * 46) * 10 + 50;
          const hostCut = Math.floor(Math.random() * 21);

          const rev = computeOrganizerRevenue(participants, entryFee, hostCut);

          assert.ok(
            rev.isConserved,
            `Conservation broken: ${rev.adminFee} + ${rev.hostEarnings} + ${rev.playerPrizePool} !== ${rev.totalRevenue}`
          );
          assert.equal(
            rev.adminFee + rev.hostEarnings + rev.playerPrizePool,
            rev.totalRevenue,
            'Sum of all shares must equal totalRevenue'
          );

          assert.ok(rev.adminFee >= 0, 'adminFee must be >= 0');
          assert.ok(rev.hostEarnings >= 0, 'hostEarnings must be >= 0');
          assert.ok(rev.playerPrizePool >= 0, 'playerPrizePool must be >= 0');

          assert.ok(
            rev.playerPrizePercent >= 70 && rev.playerPrizePercent <= 90,
            `Prize percent must be between 70% and 90%, got ${rev.playerPrizePercent}%`
          );

          assert.ok(Number.isFinite(rev.totalRevenue));
          assert.ok(Number.isFinite(rev.adminFee));
          assert.ok(Number.isFinite(rev.hostEarnings));
          assert.ok(Number.isFinite(rev.playerPrizePool));
          assert.ok(Number.isFinite(rev.playerPrizePercent));
        }
      });

      it('safely handles zero participants or zero entry fee without division by zero', () => {
        const zeroP = computeOrganizerRevenue(0, 100, 10);
        assert.equal(zeroP.totalRevenue, 0);
        assert.equal(zeroP.adminFee, 0);
        assert.equal(zeroP.hostEarnings, 0);
        assert.equal(zeroP.playerPrizePool, 0);
        assert.equal(zeroP.playerPrizePercent, 0);
        assert.ok(!Number.isNaN(zeroP.playerPrizePercent));

        const zeroF = computeOrganizerRevenue(48, 0, 10);
        assert.equal(zeroF.totalRevenue, 0);
        assert.equal(zeroF.playerPrizePercent, 0);
        assert.ok(!Number.isNaN(zeroF.playerPrizePercent));
      });

      it('stress-tests 2,000 irregular prime matrices for fractional rounding conservation', () => {
        const primeParticipants = [3, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const primeFees = [17, 37, 53, 71, 97, 113, 137, 179, 199, 233, 277, 311, 499];
        const cuts = [0, 1, 3, 7, 9, 11, 13, 17, 19, 20];

        let count = 0;
        for (const p of primeParticipants) {
          for (const f of primeFees) {
            for (const c of cuts) {
              const rev = computeOrganizerRevenue(p, f, c);
              assert.ok(
                rev.isConserved,
                `Conservation failure on prime matrix p=${p}, f=${f}, c=${c}`
              );
              assert.equal(
                rev.adminFee + rev.hostEarnings + rev.playerPrizePool,
                rev.totalRevenue
              );
              count++;
            }
          }
        }
        assert.ok(count >= 1000, `Tested ${count} prime combinations`);
      });
    });
  });
});
