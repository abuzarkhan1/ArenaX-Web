import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeCombatPoints,
  getTierFromPoints,
  computeRankGap,
  computeOrganizerRevenue,
  RANK_TIERS,
} from './helpers/formulas.ts';

describe('Adversarial Challenger Suite M3-2: Esports Engine & Financial Architecture', () => {
  const root = process.cwd();
  const aiVisionPath = path.join(root, 'src/components/AIVisionShowcase.tsx');
  const walletPath = path.join(root, 'src/components/WalletSection.tsx');
  const tiersPath = path.join(root, 'src/components/LeaderboardTiers.tsx');
  const organizerPath = path.join(root, 'src/components/OrganizerProgram.tsx');

  const aiVisionSrc = fs.readFileSync(aiVisionPath, 'utf8');
  const walletSrc = fs.readFileSync(walletPath, 'utf8');
  const tiersSrc = fs.readFileSync(tiersPath, 'utf8');
  const organizerSrc = fs.readFileSync(organizerPath, 'utf8');

  const targetComponents = [
    { name: 'AIVisionShowcase.tsx', src: aiVisionSrc },
    { name: 'WalletSection.tsx', src: walletSrc },
    { name: 'LeaderboardTiers.tsx', src: tiersSrc },
    { name: 'OrganizerProgram.tsx', src: organizerSrc },
  ];

  // =========================================================================
  // 1. Strict R1 Copy Compliance & Anti-Regression Audit
  // =========================================================================
  describe('Strict R1 Copy Compliance & Anti-Regression Verification', () => {
    it('verifies zero <Pill /> eyebrows in all 4 target files', () => {
      for (const comp of targetComponents) {
        const matches = comp.src.match(/<Pill\b[^>]*\/>/g) || [];
        assert.equal(
          matches.length,
          0,
          `Forbidden <Pill /> eyebrow found in ${comp.name}: ${matches.join(', ')}`
        );
      }
    });

    it('verifies zero <Stat ... subtext=... /> usage in all 4 target files', () => {
      for (const comp of targetComponents) {
        const matches = comp.src.match(/<Stat\b[^>]*\bsubtext\s*=/g) || [];
        assert.equal(
          matches.length,
          0,
          `Deprecated Stat subtext prop found in ${comp.name}`
        );
      }
    });

    it('verifies zero tagline declarations in all 4 target files', () => {
      for (const comp of targetComponents) {
        const matches = comp.src.match(/\btagline\s*:\s*['"`][^'"`]+['"`]/gi) || [];
        assert.equal(
          matches.length,
          0,
          `Tagline declaration found in ${comp.name}`
        );
      }
    });

    it('strictly forbids flagged explanatory footnotes across all 4 files', () => {
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

      for (const comp of targetComponents) {
        for (const footnote of forbiddenFootnotes) {
          const regex = new RegExp(footnote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
          assert.ok(
            !regex.test(comp.src),
            `Forbidden footnote phrase "${footnote}" detected in ${comp.name}`
          );
        }
      }
    });

    it('verifies elimination of conversational subtitle paragraphs in headers', () => {
      // 1. AIVisionShowcase header must not contain conversational subtitle
      assert.ok(
        !aiVisionSrc.includes('Players upload the scoreboard. AI reads it. Winners get paid.'),
        'AIVisionShowcase must not contain old conversational subtitle'
      );
      assert.ok(
        aiVisionSrc.includes('Zero <span className="text-accent">Disputes</span>'),
        'AIVisionShowcase must maintain clean Zero Disputes headline'
      );

      // 2. WalletSection header must not contain conversational subtitle
      assert.ok(
        !walletSrc.includes('Tournament entry balances are strictly isolated from verified prize money'),
        'WalletSection must not contain conversational narrative subtitle'
      );
      assert.ok(
        walletSrc.includes('Two-Vault <span className="text-accent">Security</span>'),
        'WalletSection must maintain clean Two-Vault Security headline'
      );

      // 3. LeaderboardTiers header subtitle must be concise statement
      assert.ok(
        tiersSrc.includes('Eight competitive divisions with direct cash milestone rewards.'),
        'LeaderboardTiers must have concise tier statement'
      );

      // 4. OrganizerProgram header subtitle must be concise statement
      assert.ok(
        organizerSrc.includes('Automated tournament operations with dedicated organizer commissions.'),
        'OrganizerProgram must have concise program statement'
      );
    });

    it('verifies removal of informal marketing slogans and redundant prefixes in AIVisionShowcase', () => {
      assert.ok(
        !aiVisionSrc.includes('Anti-Photoshop Verification / SHA-256 Passed'),
        'Old marketing slogan must be eliminated'
      );
      assert.ok(
        aiVisionSrc.includes('SHA-256 INTEGRITY') && aiVisionSrc.includes('VERIFIED'),
        'Technical SHA-256 INTEGRITY / VERIFIED status must be present'
      );
      assert.ok(
        !aiVisionSrc.includes('OCR STATUS: ACTIVE'),
        'Redundant OCR STATUS prefix must be removed'
      );
      assert.ok(
        !aiVisionSrc.includes('1 Booyah = 20 PTS • 1 Kill = 5 PTS'),
        'Redundant scoring formula subtext must be eliminated'
      );
    });

    it('verifies removal of parenthetical annotations from OrganizerProgram slider ticks', () => {
      assert.ok(
        !organizerSrc.includes('10 (CS)') && !organizerSrc.includes('48 (BR)'),
        'Parenthetical annotations must not exist on slider ticks'
      );
    });
  });

  // =========================================================================
  // 2. UI Layout & Interactive Affordances Verification
  // =========================================================================
  describe('UI Layout & Interactive Affordances Verification', () => {
    describe('AIVisionShowcase Interactive Affordances', () => {
      it('verifies segmented control pill layout for match placement', () => {
        assert.ok(
          aiVisionSrc.includes('grid grid-cols-2 gap-2 p-1 bg-bg-1/80 rounded-control border border-white/[0.08]'),
          'Segmented control must use structured container styling'
        );
        assert.ok(
          aiVisionSrc.includes('setIsBooyah(true)'),
          'Must have click handler to set Booyah to true'
        );
        assert.ok(
          aiVisionSrc.includes('setIsBooyah(false)'),
          'Must have click handler to set Booyah to false'
        );
        assert.ok(
          aiVisionSrc.includes('Booyah (+20 PTS)'),
          'First segment must display Booyah (+20 PTS)'
        );
        assert.ok(
          aiVisionSrc.includes('Top 2–48 (0 PTS)'),
          'Second segment must display Top 2–48 (0 PTS)'
        );
      });

      it('verifies 40px minimum touch target height on segmented buttons', () => {
        assert.ok(
          aiVisionSrc.includes('min-h-[40px]'),
          'Segmented control buttons must guarantee >= 40px touch targets'
        );
      });

      it('verifies kill slider bounds [0, 20] and clean tick marks', () => {
        assert.ok(aiVisionSrc.includes('min="0"'));
        assert.ok(aiVisionSrc.includes('max="20"'));
        assert.ok(aiVisionSrc.includes('value={kills}'));
        assert.ok(aiVisionSrc.includes('aria-label="Match Kill Count"'));
      });

      it('verifies high-contrast telemetry badges', () => {
        assert.ok(aiVisionSrc.includes('<Badge tone="emerald" dot pulse'));
        assert.ok(aiVisionSrc.includes('ACTIVE'));
        assert.ok(aiVisionSrc.includes('{confidence}% CONFIDENCE'));
      });

      it('verifies calculated score card with rank badge and progress bar', () => {
        assert.ok(aiVisionSrc.includes('Combat Score'));
        assert.ok(aiVisionSrc.includes('{totalPoints}'));
        assert.ok(aiVisionSrc.includes('src={tier.badge}'));
        assert.ok(aiVisionSrc.includes('alt={tier.name}'));
        assert.ok(aiVisionSrc.includes('{tier.percent}%'));
        assert.ok(aiVisionSrc.includes('style={{ width: `${tier.percent}%` }}'));
      });
    });

    describe('WalletSection UI Layout & Interactive Affordances', () => {
      it('verifies 1 AX = 1 PKR high-contrast parity badges in header and winning vault', () => {
        assert.ok(
          walletSrc.includes('<Badge tone="emerald" dot pulse className="self-start sm:self-auto">'),
          'Header must feature emerald pulsing cash parity badge'
        );
        assert.ok(
          walletSrc.includes('1 AX = 1 PKR Cash Parity'),
          'Parity badge text must be exact'
        );
        assert.ok(
          walletSrc.includes('1 AX = 1 PKR Cash'),
          'Winning wallet callout must specify 1 AX = 1 PKR Cash'
        );
      });

      it('verifies 5-node horizontal lifecycle flow structure', () => {
        assert.ok(walletSrc.includes('const FLOW_NODES = ['));
        assert.ok(walletSrc.includes("step: '01', title: 'Deposit'"));
        assert.ok(walletSrc.includes("step: '02', title: 'Play Wallet'"));
        assert.ok(walletSrc.includes("step: '03', title: 'Match Scrim'"));
        assert.ok(walletSrc.includes("step: '04', title: 'Winning Wallet'"));
        assert.ok(walletSrc.includes("step: '05', title: 'Cashout'"));
      });

      it('verifies Play Wallet structured 2x2 telemetry specs grid and Deposit button', () => {
        assert.ok(walletSrc.includes('Min Deposit'));
        assert.ok(walletSrc.includes('PKR 50'));
        assert.ok(walletSrc.includes('Surcharge'));
        assert.ok(walletSrc.includes('0% Instant'));
        assert.ok(walletSrc.includes('Cancellation'));
        assert.ok(walletSrc.includes('100% Refund'));
        assert.ok(walletSrc.includes('Squad Transfer'));
        assert.ok(walletSrc.includes('Instant P2P'));
        assert.ok(
          walletSrc.includes('<Button\n                  variant="secondary"\n                  size="md"\n                  fullWidth\n                  onClick={scrollToDownload}\n                >\n                  Deposit\n                </Button>') ||
          walletSrc.includes('variant="secondary"') && walletSrc.includes('>Deposit<') ||
          walletSrc.includes('Deposit\n                </Button>')
        );
      });

      it('verifies Winning Wallet structured 2x2 telemetry specs grid and Cashout button', () => {
        assert.ok(walletSrc.includes('Payout SLA'));
        assert.ok(walletSrc.includes('&lt; 24 Hours') || walletSrc.includes('< 24 Hours'));
        assert.ok(walletSrc.includes('Min Threshold'));
        assert.ok(walletSrc.includes('100 AX'));
        assert.ok(walletSrc.includes('Disbursement'));
        assert.ok(walletSrc.includes('JazzCash / EasyPaisa'));
        assert.ok(walletSrc.includes('Security'));
        assert.ok(walletSrc.includes('6-Digit PIN'));
        assert.ok(
          walletSrc.includes('variant="primary"') && walletSrc.includes('Cashout\n                </Button>')
        );
      });
    });

    describe('LeaderboardTiers UI Layout & Affordances', () => {
      it('verifies all 8 tiers in RANK_TIERS array with badges and target points', () => {
        assert.equal(RANK_TIERS.length, 8);
        const expectedTiers = [
          { name: 'Bronze', targetMin: 0 },
          { name: 'Silver', targetMin: 1000 },
          { name: 'Gold', targetMin: 2000 },
          { name: 'Platinum', targetMin: 3200 },
          { name: 'Diamond', targetMin: 4600 },
          { name: 'Heroic', targetMin: 6200 },
          { name: 'Master', targetMin: 8000 },
          { name: 'Grandmaster', targetMin: 10000 },
        ];

        for (let i = 0; i < expectedTiers.length; i++) {
          assert.equal(RANK_TIERS[i].name, expectedTiers[i].name);
          assert.equal(RANK_TIERS[i].targetMin, expectedTiers[i].targetMin);
        }
      });

      it('verifies carousel left/right navigation buttons with smooth scrollTrack', () => {
        assert.ok(tiersSrc.includes("scrollTrack('left')"));
        assert.ok(tiersSrc.includes("scrollTrack('right')"));
        assert.ok(tiersSrc.includes("aria-label=\"Scroll ranks left\""));
        assert.ok(tiersSrc.includes("aria-label=\"Scroll ranks right\""));
        assert.ok(tiersSrc.includes("scrollBy({ left: offset, behavior: 'smooth' })"));
      });

      it('verifies accessible interactive rank card semantics', () => {
        assert.ok(tiersSrc.includes('role="button"'));
        assert.ok(tiersSrc.includes('tabIndex={0}'));
        assert.ok(tiersSrc.includes('aria-pressed={isSelected}'));
        assert.ok(tiersSrc.includes("e.key === 'Enter' || e.key === ' '"));
      });

      it('verifies Grandmaster apex card badge and ambient styling', () => {
        assert.ok(tiersSrc.includes('APEX'));
        assert.ok(tiersSrc.includes('isGrandmaster'));
      });

      it('verifies Promotion Gap Simulator controls and quick presets', () => {
        assert.ok(tiersSrc.includes('min="0"'));
        assert.ok(tiersSrc.includes('max="10000"'));
        assert.ok(tiersSrc.includes('step="50"'));
        assert.ok(tiersSrc.includes('setCurrentPts(2500)'));
        assert.ok(tiersSrc.includes('setCurrentPts(5000)'));
        assert.ok(tiersSrc.includes('setCurrentPts(7500)'));
        assert.ok(tiersSrc.includes('Points Required:'));
        assert.ok(tiersSrc.includes('Booyahs Required:'));
        assert.ok(tiersSrc.includes('Milestone Bonus:'));
      });
    });

    describe('OrganizerProgram UI Layout & Affordances', () => {
      it('verifies 4 operational capabilities with icon orbs and preserved Bermuda/Clash Squad', () => {
        assert.ok(organizerSrc.includes("num: '01'"));
        assert.ok(organizerSrc.includes("num: '02'"));
        assert.ok(organizerSrc.includes("num: '03'"));
        assert.ok(organizerSrc.includes("num: '04'"));
        assert.ok(
          organizerSrc.includes('Bermuda or Clash Squad'),
          'Pillar 01 must preserve exact invariant string "Bermuda or Clash Squad"'
        );
      });

      it('verifies 3 simulator sliders with correct ranges, steps, and touch targets', () => {
        // Participants: min 10, max 48
        assert.ok(organizerSrc.includes('min="10"'));
        assert.ok(organizerSrc.includes('max="48"'));
        assert.ok(organizerSrc.includes('value={participants}'));

        // Entry Fee: min 50, max 500, step 10
        assert.ok(organizerSrc.includes('min="50"'));
        assert.ok(organizerSrc.includes('max="500"'));
        assert.ok(organizerSrc.includes('step="10"'));
        assert.ok(organizerSrc.includes('value={entryFee}'));

        // Organizer Cut: min 0, max 20, step 1
        assert.ok(organizerSrc.includes('min="0"'));
        assert.ok(organizerSrc.includes('max="20"'));
        assert.ok(organizerSrc.includes('step="1"'));
        assert.ok(organizerSrc.includes('value={hostCutPercent}'));
      });

      it('verifies real-time economics breakdown and Net Organizer Payout display', () => {
        assert.ok(organizerSrc.includes('TOTAL REVENUE'));
        assert.ok(organizerSrc.includes('PLATFORM FEE (10%)'));
        assert.ok(organizerSrc.includes('PRIZE POOL ({playerPrizePercent}%)'));
        assert.ok(organizerSrc.includes('Net Organizer Payout'));
        assert.ok(organizerSrc.includes('{hostEarnings.toLocaleString()}'));
        assert.ok(organizerSrc.includes('PKR / Match'));
        assert.ok(organizerSrc.includes('Apply to Host Scrims'));
      });
    });
  });

  // =========================================================================
  // 3. GSAP & DOM Invariants Verification
  // =========================================================================
  describe('GSAP & DOM Invariants Verification', () => {
    it('verifies all 4 section DOM IDs exist for anchor navigation', () => {
      assert.ok(aiVisionSrc.includes('id="ai-vision"'), 'AIVisionShowcase must have id="ai-vision"');
      assert.ok(walletSrc.includes('id="wallet"'), 'WalletSection must have id="wallet"');
      assert.ok(tiersSrc.includes('id="ranks"'), 'LeaderboardTiers must have id="ranks"');
      assert.ok(organizerSrc.includes('id="organizers"'), 'OrganizerProgram must have id="organizers"');
    });

    it('verifies GSAP ScrollTrigger registration and cleanup in AIVisionShowcase', () => {
      assert.ok(aiVisionSrc.includes('gsap.registerPlugin(ScrollTrigger)'));
      assert.ok(aiVisionSrc.includes('scoreboardRef'));
      assert.ok(aiVisionSrc.includes('scanlineRef'));
      assert.ok(aiVisionSrc.includes('telemetryRef'));
      assert.ok(aiVisionSrc.includes('return () => ctx.revert();'));
      assert.ok(aiVisionSrc.includes("prefers-reduced-motion: no-preference"));
    });

    it('verifies GSAP continuous scanline animation in AIVisionShowcase', () => {
      assert.ok(aiVisionSrc.includes("top: '0%', opacity: 0.3"));
      assert.ok(aiVisionSrc.includes("top: '95%'"));
      assert.ok(aiVisionSrc.includes("opacity: 1"));
      assert.ok(aiVisionSrc.includes('repeat: -1'));
      assert.ok(aiVisionSrc.includes('yoyo: true'));
      assert.ok(aiVisionSrc.includes('duration: 2.2'));
    });

    it('verifies GSAP line draw on scroll in WalletSection with revert cleanup', () => {
      assert.ok(walletSrc.includes('gsap.registerPlugin(ScrollTrigger)'));
      assert.ok(walletSrc.includes('lineRef'));
      assert.ok(walletSrc.includes('flowContainerRef'));
      assert.ok(walletSrc.includes("scaleX: 0, transformOrigin: 'left center'"));
      assert.ok(walletSrc.includes('scaleX: 1'));
      assert.ok(walletSrc.includes('return () => ctx.revert();'));
    });

    it('verifies GSAP tier reveal entry animation in LeaderboardTiers with revert cleanup', () => {
      assert.ok(tiersSrc.includes('gsap.registerPlugin(ScrollTrigger)'));
      assert.ok(tiersSrc.includes('.tier-reveal'));
      assert.ok(tiersSrc.includes('return () => ctx.revert();'));
    });
  });

  // =========================================================================
  // 4. Adversarial Mathematical Engine & Randomized Stress-Testing
  // =========================================================================
  describe('Adversarial Mathematical Engine Stress-Testing', () => {
    describe('Combat Points Formula & Tier Thresholds Stress', () => {
      it('tests exact boundary thresholds for getTierFromPoints', () => {
        // Below Diamond: < 25 -> Gold
        assert.equal(getTierFromPoints(0).name, 'Gold Tier');
        assert.equal(getTierFromPoints(24).name, 'Gold Tier');
        assert.equal(getTierFromPoints(24.99).name, 'Gold Tier');

        // Diamond: 25 to 39 -> Diamond
        assert.equal(getTierFromPoints(25).name, 'Diamond Tier');
        assert.equal(getTierFromPoints(39).name, 'Diamond Tier');
        assert.equal(getTierFromPoints(39.99).name, 'Diamond Tier');

        // Heroic: 40 to 59 -> Heroic
        assert.equal(getTierFromPoints(40).name, 'Heroic Tier');
        assert.equal(getTierFromPoints(59).name, 'Heroic Tier');
        assert.equal(getTierFromPoints(59.99).name, 'Heroic Tier');

        // Grandmaster: >= 60 -> Grandmaster
        assert.equal(getTierFromPoints(60).name, 'Grandmaster Contender');
        assert.equal(getTierFromPoints(120).name, 'Grandmaster Contender');
        assert.equal(getTierFromPoints(10000).name, 'Grandmaster Contender');
      });

      it('executes 5,000 randomized combat points inputs without NaN or negative values', () => {
        for (let i = 0; i < 5000; i++) {
          const isBooyah = Math.random() > 0.5;
          const randomKills = (Math.random() - 0.2) * 50; // -10 to 40
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
          const randomCurrentPts = Math.floor((Math.random() - 0.1) * 15000); // -1500 to 13500
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

          // Invariant: if points needed is 0, booyahs needed must be 0 and progress is 100%
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
          // Valid UI slider bounds: participants in [10, 48], entryFee in [50, 500], hostCut in [0, 20]
          const participants = Math.floor(Math.random() * 39) + 10;
          const entryFee = Math.floor(Math.random() * 46) * 10 + 50;
          const hostCut = Math.floor(Math.random() * 21);

          const rev = computeOrganizerRevenue(participants, entryFee, hostCut);

          // 1. Invariant: Revenue Conservation to the last single PKR
          assert.ok(
            rev.isConserved,
            `Conservation broken: ${rev.adminFee} + ${rev.hostEarnings} + ${rev.playerPrizePool} !== ${rev.totalRevenue}`
          );
          assert.equal(
            rev.adminFee + rev.hostEarnings + rev.playerPrizePool,
            rev.totalRevenue,
            'Sum of all shares must equal totalRevenue'
          );

          // 2. Invariant: No negative pools
          assert.ok(rev.adminFee >= 0, 'adminFee must be >= 0');
          assert.ok(rev.hostEarnings >= 0, 'hostEarnings must be >= 0');
          assert.ok(rev.playerPrizePool >= 0, 'playerPrizePool must be >= 0');

          // 3. Invariant: Player prize pool is >= 70% and <= 90%
          assert.ok(
            rev.playerPrizePercent >= 70 && rev.playerPrizePercent <= 90,
            `Prize percent must be between 70% and 90%, got ${rev.playerPrizePercent}%`
          );

          // 4. Invariant: Finite numbers, zero NaN
          assert.ok(Number.isFinite(rev.totalRevenue));
          assert.ok(Number.isFinite(rev.adminFee));
          assert.ok(Number.isFinite(rev.hostEarnings));
          assert.ok(Number.isFinite(rev.playerPrizePool));
          assert.ok(Number.isFinite(rev.playerPrizePercent));
        }
      });

      it('safely handles zero participants or zero entry fee without division by zero', () => {
        // Zero participants
        const zeroP = computeOrganizerRevenue(0, 100, 10);
        assert.equal(zeroP.totalRevenue, 0);
        assert.equal(zeroP.adminFee, 0);
        assert.equal(zeroP.hostEarnings, 0);
        assert.equal(zeroP.playerPrizePool, 0);
        assert.equal(zeroP.playerPrizePercent, 0);
        assert.ok(!Number.isNaN(zeroP.playerPrizePercent));

        // Zero entry fee
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
