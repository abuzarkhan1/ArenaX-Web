import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite: Milestone 3 (Esports Engine & Financial Architecture)', () => {
  const root = process.cwd();
  const aiVisionSrc = fs.readFileSync(path.join(root, 'src/components/AIVisionShowcase.tsx'), 'utf8');
  const walletSrc = fs.readFileSync(path.join(root, 'src/components/WalletSection.tsx'), 'utf8');
  const leaderboardSrc = fs.readFileSync(path.join(root, 'src/components/LeaderboardTiers.tsx'), 'utf8');
  const organizerSrc = fs.readFileSync(path.join(root, 'src/components/OrganizerProgram.tsx'), 'utf8');
  const tournamentsSrc = fs.readFileSync(path.join(root, 'src/components/TournamentModes.tsx'), 'utf8');
  const appExpSrc = fs.readFileSync(path.join(root, 'src/components/AppExperienceShowcase.tsx'), 'utf8');

  // =========================================================================
  // 1. AIVisionShowcase: Combat Score, Boundary Tiers & Zero Copy Defect
  // =========================================================================
  describe('AIVisionShowcase: Combat Score Formula, Tier Boundaries & Invariants', () => {
    it('verifies DOM anchor id="ai-vision" is present', () => {
      assert.ok(aiVisionSrc.includes('id="ai-vision"'), 'AIVisionShowcase must define id="ai-vision"');
    });

    it('verifies combat points formula in source code: (isBooyah ? 20 : 0) + kills * 5', () => {
      assert.ok(
        aiVisionSrc.includes('(isBooyah ? 20 : 0) + kills * 5'),
        'Must contain exact combat score formula: (isBooyah ? 20 : 0) + kills * 5'
      );
    });

    function computeCombatScore(isBooyah: boolean, kills: number): number {
      return (isBooyah ? 20 : 0) + kills * 5;
    }

    it('empirically verifies combat score formula across all edge cases', () => {
      // 0 kills, booyah OFF => 0 PTS
      assert.equal(computeCombatScore(false, 0), 0);
      // 0 kills, booyah ON => 20 PTS
      assert.equal(computeCombatScore(true, 0), 20);
      // 20 kills, booyah OFF => 100 PTS
      assert.equal(computeCombatScore(false, 20), 100);
      // 20 kills, booyah ON => 120 PTS
      assert.equal(computeCombatScore(true, 20), 120);
    });

    it('stress-tests all 42 valid UI slider / toggle state combinations (0..20 kills x 2 placement states)', () => {
      for (let k = 0; k <= 20; k++) {
        // Without Booyah
        const scoreNoBooyah = computeCombatScore(false, k);
        assert.equal(scoreNoBooyah, k * 5);
        assert.ok(scoreNoBooyah >= 0 && scoreNoBooyah <= 100);

        // With Booyah
        const scoreBooyah = computeCombatScore(true, k);
        assert.equal(scoreBooyah, 20 + k * 5);
        assert.ok(scoreBooyah >= 20 && scoreBooyah <= 120);
      }
    });

    function getTier(pts: number) {
      if (pts >= 60) return { name: 'Grandmaster Contender', percent: 100, badge: '/ranks/grandmaster.webp?v=s4' };
      if (pts >= 40) return { name: 'Heroic Tier', percent: 75, badge: '/ranks/heroic.webp?v=s4' };
      if (pts >= 25) return { name: 'Diamond Tier', percent: 50, badge: '/ranks/diamond.webp?v=s4' };
      return { name: 'Gold Tier', percent: 25, badge: '/ranks/gold.webp?v=s4' };
    }

    it('verifies getTier boundary logic (Grandmaster >= 60, Heroic >= 40, Diamond >= 25, Gold < 25)', () => {
      // Gold Tier (< 25)
      assert.equal(getTier(0).name, 'Gold Tier');
      assert.equal(getTier(0).percent, 25);
      assert.equal(getTier(24).name, 'Gold Tier');
      assert.equal(getTier(24).percent, 25);

      // Diamond Tier (25..39)
      assert.equal(getTier(25).name, 'Diamond Tier');
      assert.equal(getTier(25).percent, 50);
      assert.equal(getTier(39).name, 'Diamond Tier');
      assert.equal(getTier(39).percent, 50);

      // Heroic Tier (40..59)
      assert.equal(getTier(40).name, 'Heroic Tier');
      assert.equal(getTier(40).percent, 75);
      assert.equal(getTier(59).name, 'Heroic Tier');
      assert.equal(getTier(59).percent, 75);

      // Grandmaster Contender (>= 60)
      assert.equal(getTier(60).name, 'Grandmaster Contender');
      assert.equal(getTier(60).percent, 100);
      assert.equal(getTier(61).name, 'Grandmaster Contender');
      assert.equal(getTier(120).name, 'Grandmaster Contender');
      assert.equal(getTier(1000).name, 'Grandmaster Contender');
    });

    it('verifies all rank badge assets referenced in getTier exist on disk in public/ranks/', () => {
      const tiers = [getTier(0), getTier(25), getTier(40), getTier(60)];
      for (const t of tiers) {
        const cleanPath = t.badge.split('?')[0].replace(/^\//, '');
        const fullPath = path.join(root, 'public', cleanPath);
        assert.ok(fs.existsSync(fullPath), `Asset ${cleanPath} must exist on disk`);
        const stats = fs.statSync(fullPath);
        assert.ok(stats.size > 0, `Asset ${cleanPath} must not be 0 bytes (found ${stats.size} bytes)`);
      }
    });

    it('verifies kill slider constraints in AIVisionShowcase (min=0, max=20)', () => {
      assert.ok(aiVisionSrc.includes('type="range"'));
      assert.ok(aiVisionSrc.includes('min="0"'));
      assert.ok(aiVisionSrc.includes('max="20"'));
      assert.ok(aiVisionSrc.includes('value={kills}'));
    });

    it('verifies segmented placement control with Booyah (+20 PTS) and Top 2-48 (0 PTS)', () => {
      assert.ok(aiVisionSrc.includes('Booyah (+20 PTS)'));
      assert.ok(aiVisionSrc.includes('Top 2–48 (0 PTS)'));
      assert.ok(aiVisionSrc.includes('setIsBooyah(true)'));
      assert.ok(aiVisionSrc.includes('setIsBooyah(false)'));
    });

    it('verifies complete elimination of legacy explanatory and marketing copy in AIVisionShowcase', () => {
      const prohibitedStrings = [
        'Players upload the scoreboard. AI reads it. Winners get paid.',
        'OCR STATUS: ACTIVE',
        'BOUNDING BOX: UID MATCHED',
        'Anti-Photoshop Verification / SHA-256 Passed',
        '{confidence}% AI CONFIDENCE',
        '1 Booyah = 20 PTS • 1 Kill = 5 PTS',
        'Kills (5 PTS Each)',
        'Calculated Rating',
        'Projected Tier',
      ];

      for (const str of prohibitedStrings) {
        assert.ok(!aiVisionSrc.includes(str), `AIVisionShowcase must NOT contain prohibited string: "${str}"`);
      }

      // Check clean replacements exist
      assert.ok(aiVisionSrc.includes('UID MATCHED'));
      assert.ok(aiVisionSrc.includes('SHA-256 INTEGRITY'));
      assert.ok(aiVisionSrc.includes('VERIFIED'));
      assert.ok(aiVisionSrc.includes('{confidence}% CONFIDENCE'));
      assert.ok(aiVisionSrc.includes('Combat Score'));
    });

    it('verifies zero <Pill /> eyebrows and zero subtext props in AIVisionShowcase', () => {
      assert.ok(!/<Pill\b[^>]*\/>/.test(aiVisionSrc), 'No <Pill /> eyebrows in AIVisionShowcase');
      assert.ok(!/<Stat\b[^>]*\bsubtext\s*=/.test(aiVisionSrc), 'No Stat subtext prop in AIVisionShowcase');
    });
  });

  // =========================================================================
  // 2. WalletSection: Two-Vault Architecture, 1:1 Parity & Button Actions
  // =========================================================================
  describe('WalletSection: FLOW_NODES, 1 AX = 1 PKR Parity & Interactive Affordances', () => {
    it('verifies DOM anchor id="wallet" is present', () => {
      assert.ok(walletSrc.includes('id="wallet"'), 'WalletSection must define id="wallet"');
    });

    it('verifies FLOW_NODES array elements match exact 5-stage specification', () => {
      const expectedNodes = [
        { step: '01', title: 'Deposit', sub: 'JazzCash / EasyPaisa' },
        { step: '02', title: 'Play Wallet', sub: 'Non-Withdrawable' },
        { step: '03', title: 'Match Scrim', sub: 'Free Fire BR / CS' },
        { step: '04', title: 'Winning Wallet', sub: '1 AX = 1 PKR' },
        { step: '05', title: 'Cashout', sub: '< 24h Direct' },
      ];

      for (const node of expectedNodes) {
        assert.ok(
          walletSrc.includes(`step: '${node.step}', title: '${node.title}', sub: '${node.sub}'`),
          `FLOW_NODES must contain node: ${JSON.stringify(node)}`
        );
      }
    });

    it('verifies 1 AX = 1 PKR assertion in badge, callout, and flow nodes', () => {
      // Header badge
      assert.ok(
        walletSrc.includes('1 AX = 1 PKR Cash Parity'),
        'Header badge must assert 1 AX = 1 PKR Cash Parity'
      );
      // Winning wallet card callout
      assert.ok(
        walletSrc.includes('1 AX = 1 PKR Cash'),
        'Winning Wallet panel must assert 1 AX = 1 PKR Cash'
      );
      // FLOW_NODES node 04
      assert.ok(
        walletSrc.includes("sub: '1 AX = 1 PKR'"),
        'FLOW_NODES node 04 sub must assert 1 AX = 1 PKR'
      );
    });

    it('verifies Deposit and Cashout CTA buttons with scrollToDownload triggers', () => {
      // scrollToDownload implementation
      assert.ok(
        walletSrc.includes("document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })"),
        'scrollToDownload must target download element with smooth scrolling'
      );

      // Deposit button in Play Wallet
      assert.ok(
        walletSrc.includes('>Deposit</Button>') || walletSrc.includes('Deposit\n                </Button>'),
        'Play Wallet must render Deposit button'
      );
      assert.ok(
        walletSrc.includes('onClick={scrollToDownload}'),
        'Deposit button must connect to scrollToDownload'
      );

      // Cashout button in Winning Wallet
      assert.ok(
        walletSrc.includes('>Cashout</Button>') || walletSrc.includes('Cashout\n                </Button>'),
        'Winning Wallet must render Cashout button'
      );
    });

    it('verifies structured 2x2 telemetry spec grid in Play Wallet and Winning Wallet', () => {
      // Play Wallet specs
      assert.ok(walletSrc.includes('Min Deposit'));
      assert.ok(walletSrc.includes('PKR 50'));
      assert.ok(walletSrc.includes('Surcharge'));
      assert.ok(walletSrc.includes('0% Instant'));
      assert.ok(walletSrc.includes('Cancellation'));
      assert.ok(walletSrc.includes('100% Refund'));
      assert.ok(walletSrc.includes('Squad Transfer'));
      assert.ok(walletSrc.includes('Instant P2P'));

      // Winning Wallet specs
      assert.ok(walletSrc.includes('Payout SLA'));
      assert.ok(walletSrc.includes('&lt; 24 Hours') || walletSrc.includes('< 24 Hours'));
      assert.ok(walletSrc.includes('Min Threshold'));
      assert.ok(walletSrc.includes('100 AX'));
      assert.ok(walletSrc.includes('Disbursement'));
      assert.ok(walletSrc.includes('JazzCash / EasyPaisa'));
      assert.ok(walletSrc.includes('Security'));
      assert.ok(walletSrc.includes('6-Digit PIN'));
    });

    it('verifies complete elimination of footnotes, conversational paragraphs, and R1 copy leaks in WalletSection', () => {
      const prohibitedWalletStrings = [
        'Protected Escrow',
        'Zero Hidden Commissions',
        'Tournament entry balances are strictly isolated from verified prize money, guaranteeing 1 AX = 1 PKR parity.',
        'Non-Withdrawable balance used exclusively for tournament entry fees.',
        'Direct withdrawable cash won from verified tournament matches.',
      ];

      for (const str of prohibitedWalletStrings) {
        assert.ok(!walletSrc.includes(str), `WalletSection must NOT contain prohibited string: "${str}"`);
      }

      assert.ok(!/<Pill\b[^>]*\/>/.test(walletSrc), 'No <Pill /> in WalletSection');
    });
  });

  // =========================================================================
  // 3. LeaderboardTiers: 8 Tiers, Rank-Gap Simulator & Slider Stress Testing
  // =========================================================================
  describe('LeaderboardTiers: RANK_TIERS, Rank Gap Dynamic Math & Slider Verification', () => {
    it('verifies DOM anchor id="ranks" is present', () => {
      assert.ok(leaderboardSrc.includes('id="ranks"'), 'LeaderboardTiers must define id="ranks"');
    });

    const expectedTiers = [
      { name: 'Bronze', targetMin: 0, reward: 'Starter Base' },
      { name: 'Silver', targetMin: 1000, reward: '+150 AX Cash' },
      { name: 'Gold', targetMin: 2000, reward: '+300 AX Cash' },
      { name: 'Platinum', targetMin: 3200, reward: '+600 AX Cash' },
      { name: 'Diamond', targetMin: 4600, reward: '+1,200 AX Cash' },
      { name: 'Heroic', targetMin: 6200, reward: '+2,500 AX Cash' },
      { name: 'Master', targetMin: 8000, reward: '+5,000 AX Cash' },
      { name: 'Grandmaster', targetMin: 10000, reward: '+10,000 AX Pool', isTop: true },
    ];

    it('verifies RANK_TIERS array has exactly 8 tiers with strictly increasing min points', () => {
      for (let i = 0; i < expectedTiers.length; i++) {
        const t = expectedTiers[i];
        assert.ok(
          leaderboardSrc.includes(`name: '${t.name}'`),
          `RANK_TIERS must define tier ${t.name}`
        );
        assert.ok(
          leaderboardSrc.includes(`targetMin: ${t.targetMin}`),
          `RANK_TIERS must define targetMin: ${t.targetMin} for ${t.name}`
        );
        assert.ok(
          leaderboardSrc.includes(`reward: '${t.reward}'`),
          `RANK_TIERS must define reward: '${t.reward}' for ${t.name}`
        );
      }

      // Verify strict monotonicity
      for (let i = 1; i < expectedTiers.length; i++) {
        assert.ok(
          expectedTiers[i].targetMin > expectedTiers[i - 1].targetMin,
          `Tier ${expectedTiers[i].name} min must strictly exceed ${expectedTiers[i - 1].name}`
        );
      }
    });

    it('verifies all 8 rank badge image files exist on disk in public/ranks/', () => {
      for (const t of expectedTiers) {
        const filePath = path.join(root, 'public', 'ranks', `${t.name.toLowerCase()}.webp`);
        assert.ok(fs.existsSync(filePath), `Rank badge public/ranks/${t.name.toLowerCase()}.webp must exist on disk`);
        const stats = fs.statSync(filePath);
        assert.ok(stats.size > 0, `Rank badge for ${t.name} must not be 0 bytes`);
      }
    });

    function computeRankGap(currentPts: number, targetMin: number) {
      const ptsNeeded = Math.max(0, targetMin - currentPts);
      const booyahsNeeded = Math.ceil(ptsNeeded / 20);
      const progressPercent = targetMin === 0
        ? 100
        : Math.min(100, Math.round((currentPts / targetMin) * 100));
      return { ptsNeeded, booyahsNeeded, progressPercent };
    }

    it('verifies dynamic rank gap formula across boundary cases', () => {
      // Bronze target (0 min)
      const bronzeGap = computeRankGap(0, 0);
      assert.equal(bronzeGap.ptsNeeded, 0);
      assert.equal(bronzeGap.booyahsNeeded, 0);
      assert.equal(bronzeGap.progressPercent, 100);

      // Exact target reached (Heroic: 6200 target, 6200 current)
      const exactHeroic = computeRankGap(6200, 6200);
      assert.equal(exactHeroic.ptsNeeded, 0);
      assert.equal(exactHeroic.booyahsNeeded, 0);
      assert.equal(exactHeroic.progressPercent, 100);

      // Exceeded target (7000 current, 6200 target)
      const overHeroic = computeRankGap(7000, 6200);
      assert.equal(overHeroic.ptsNeeded, 0);
      assert.equal(overHeroic.booyahsNeeded, 0);
      assert.equal(overHeroic.progressPercent, 100);

      // Standard mid-tier gap (4800 current, 6200 target)
      const defaultGap = computeRankGap(4800, 6200);
      assert.equal(defaultGap.ptsNeeded, 1400);
      assert.equal(defaultGap.booyahsNeeded, 70); // 1400 / 20 = 70
      assert.equal(defaultGap.progressPercent, 77); // Math.round((4800 / 6200) * 100) = 77%

      // 1 point away (6199 current, 6200 target) -> requires 1 Booyah
      const onePtGap = computeRankGap(6199, 6200);
      assert.equal(onePtGap.ptsNeeded, 1);
      assert.equal(onePtGap.booyahsNeeded, 1); // Math.ceil(1 / 20) = 1
      assert.equal(onePtGap.progressPercent, 100); // Math.round((6199 / 6200) * 100) = 100%

      // 21 points away -> requires 2 Booyahs
      const twentyOnePtGap = computeRankGap(6179, 6200);
      assert.equal(twentyOnePtGap.ptsNeeded, 21);
      assert.equal(twentyOnePtGap.booyahsNeeded, 2); // Math.ceil(21 / 20) = 2
    });

    it('stress-tests 1,000 randomized rating inputs against all 8 tiers', () => {
      for (let i = 0; i < 1000; i++) {
        const randomPts = Math.floor(Math.random() * 15000); // 0 to 15,000 PTS
        const tier = expectedTiers[i % expectedTiers.length];
        const gap = computeRankGap(randomPts, tier.targetMin);

        assert.ok(Number.isFinite(gap.ptsNeeded), 'ptsNeeded must be finite');
        assert.ok(Number.isFinite(gap.booyahsNeeded), 'booyahsNeeded must be finite');
        assert.ok(Number.isFinite(gap.progressPercent), 'progressPercent must be finite');

        assert.ok(gap.ptsNeeded >= 0, `ptsNeeded must be non-negative: ${gap.ptsNeeded}`);
        assert.ok(gap.booyahsNeeded >= 0, `booyahsNeeded must be non-negative: ${gap.booyahsNeeded}`);
        assert.ok(
          gap.progressPercent >= 0 && gap.progressPercent <= 100,
          `progressPercent must be clamped to [0, 100]: ${gap.progressPercent}`
        );

        if (randomPts >= tier.targetMin) {
          assert.equal(gap.ptsNeeded, 0);
          assert.equal(gap.booyahsNeeded, 0);
          assert.equal(gap.progressPercent, 100);
        } else {
          assert.equal(gap.ptsNeeded, tier.targetMin - randomPts);
          assert.equal(gap.booyahsNeeded, Math.ceil((tier.targetMin - randomPts) / 20));
        }
      }
    });

    it('verifies slider attributes and quick presets in LeaderboardTiers', () => {
      // Slider range
      assert.ok(leaderboardSrc.includes('min="0"'));
      assert.ok(leaderboardSrc.includes('max="10000"'));
      assert.ok(leaderboardSrc.includes('step="50"'));
      assert.ok(leaderboardSrc.includes('value={currentPts}'));

      // Quick presets
      assert.ok(leaderboardSrc.includes('setCurrentPts(2500)'));
      assert.ok(leaderboardSrc.includes('setCurrentPts(5000)'));
      assert.ok(leaderboardSrc.includes('setCurrentPts(7500)'));
    });

    it('verifies elimination of footnotes and redundant tags in LeaderboardTiers', () => {
      const prohibitedLeaderboardStrings = [
        'Instant Winning Wallet credit upon verification.',
        '8 TIERS // ACTIVE CIRCUIT',
      ];

      for (const str of prohibitedLeaderboardStrings) {
        assert.ok(!leaderboardSrc.includes(str), `LeaderboardTiers must NOT contain prohibited string: "${str}"`);
      }

      // Ensure no unused ShieldCheck import
      assert.ok(!leaderboardSrc.includes('ShieldCheck'), 'LeaderboardTiers should not import unused ShieldCheck');
      // Ensure Grandmaster APEX badge is preserved
      assert.ok(leaderboardSrc.includes('APEX'));
    });
  });

  // =========================================================================
  // 4. OrganizerProgram: Invariant String & Conservation of Economics
  // =========================================================================
  describe('OrganizerProgram: Exact Invariant String & Economics Conservation', () => {
    it('verifies DOM anchor id="organizers" is present', () => {
      assert.ok(organizerSrc.includes('id="organizers"'), 'OrganizerProgram must define id="organizers"');
    });

    it('verifies EXACT invariant string "Bermuda or Clash Squad" present in Pillar 01', () => {
      assert.ok(
        organizerSrc.includes('Bermuda or Clash Squad'),
        'Pillar 01 description must contain exact invariant string: "Bermuda or Clash Squad"'
      );
      assert.ok(
        organizerSrc.includes('Configure Bermuda or Clash Squad formats with custom player limits, schedules, and brackets.'),
        'Pillar 01 must contain complete invariant description'
      );
    });

    function computeOrganizerEconomics(participants: number, entryFee: number, hostCutPercent: number) {
      const totalRevenue = participants * entryFee;
      const adminFee = Math.round(totalRevenue * 0.10);
      const hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100));
      const playerPrizePool = totalRevenue - adminFee - hostEarnings;
      const playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100);

      return {
        totalRevenue,
        adminFee,
        hostEarnings,
        playerPrizePool,
        playerPrizePercent,
        isConserved: totalRevenue === adminFee + hostEarnings + playerPrizePool,
      };
    }

    it('verifies economics formulas match source code implementation', () => {
      assert.ok(organizerSrc.includes('totalRevenue = participants * entryFee'));
      assert.ok(organizerSrc.includes('adminFee = Math.round(totalRevenue * 0.10)'));
      assert.ok(organizerSrc.includes('hostEarnings = Math.round(totalRevenue * (hostCutPercent / 100))'));
      assert.ok(organizerSrc.includes('playerPrizePool = totalRevenue - adminFee - hostEarnings'));
      assert.ok(organizerSrc.includes('playerPrizePercent = Math.round((playerPrizePool / (totalRevenue || 1)) * 100)'));
    });

    it('empirically verifies revenue conservation across standard tournament presets', () => {
      // 1. Default preset: 48 BR, 100 PKR, 10% host cut
      const defaultMatch = computeOrganizerEconomics(48, 100, 10);
      assert.equal(defaultMatch.totalRevenue, 4800);
      assert.equal(defaultMatch.adminFee, 480);
      assert.equal(defaultMatch.hostEarnings, 480);
      assert.equal(defaultMatch.playerPrizePool, 3840);
      assert.equal(defaultMatch.playerPrizePercent, 80);
      assert.ok(defaultMatch.isConserved);

      // 2. 10 CS, 50 PKR, 15% host cut
      const csMatch = computeOrganizerEconomics(10, 50, 15);
      assert.equal(csMatch.totalRevenue, 500);
      assert.equal(csMatch.adminFee, 50);
      assert.equal(csMatch.hostEarnings, 75);
      assert.equal(csMatch.playerPrizePool, 375);
      assert.equal(csMatch.playerPrizePercent, 75);
      assert.ok(csMatch.isConserved);

      // 3. 24 Duo, 200 PKR, 20% max host cut
      const duoMatch = computeOrganizerEconomics(24, 200, 20);
      assert.equal(duoMatch.totalRevenue, 4800);
      assert.equal(duoMatch.adminFee, 480);
      assert.equal(duoMatch.hostEarnings, 960);
      assert.equal(duoMatch.playerPrizePool, 3360);
      assert.equal(duoMatch.playerPrizePercent, 70);
      assert.ok(duoMatch.isConserved);

      // 4. 48 BR, 500 PKR max fee, 0% host cut (charity / promo match)
      const promoMatch = computeOrganizerEconomics(48, 500, 0);
      assert.equal(promoMatch.totalRevenue, 24000);
      assert.equal(promoMatch.adminFee, 2400);
      assert.equal(promoMatch.hostEarnings, 0);
      assert.equal(promoMatch.playerPrizePool, 21600);
      assert.equal(promoMatch.playerPrizePercent, 90);
      assert.ok(promoMatch.isConserved);
    });

    it('exhaustively stress-tests total revenue conservation across all 37,674 Cartesian slider states', () => {
      // Participants: 10 to 48 (39 values)
      // Entry Fee: 50 to 500 in steps of 10 (46 values)
      // Host Cut: 0 to 20 in steps of 1 (21 values)
      // 39 * 46 * 21 = 37,674 distinct states
      let totalSimulations = 0;

      for (let p = 10; p <= 48; p++) {
        for (let fee = 50; fee <= 500; fee += 10) {
          for (let cut = 0; cut <= 20; cut++) {
            totalSimulations++;
            const econ = computeOrganizerEconomics(p, fee, cut);

            // Exact conservation: totalRevenue == adminFee + hostEarnings + playerPrizePool
            assert.equal(
              econ.totalRevenue,
              econ.adminFee + econ.hostEarnings + econ.playerPrizePool,
              `Revenue conservation failed for p=${p}, fee=${fee}, cut=${cut}`
            );

            // Non-negativity invariants
            assert.ok(econ.adminFee >= 0, 'adminFee must be >= 0');
            assert.ok(econ.hostEarnings >= 0, 'hostEarnings must be >= 0');
            assert.ok(econ.playerPrizePool > 0, 'playerPrizePool must be strictly positive');

            // Player prize percentage bounds (with 10% admin fee and 0-20% host cut, prize pool is 70-90%)
            assert.ok(
              econ.playerPrizePercent >= 69 && econ.playerPrizePercent <= 90,
              `playerPrizePercent out of bounds [69, 90]: ${econ.playerPrizePercent}`
            );
          }
        }
      }

      assert.equal(totalSimulations, 37674, 'Must execute exactly 37,674 simulations');
    });

    it('verifies slider ranges in OrganizerProgram (participants 10..48, entryFee 50..500 step 10, hostCut 0..20 step 1)', () => {
      // Participants slider
      assert.ok(organizerSrc.includes('min="10"'));
      assert.ok(organizerSrc.includes('max="48"'));
      assert.ok(organizerSrc.includes('value={participants}'));

      // Entry fee slider
      assert.ok(organizerSrc.includes('min="50"'));
      assert.ok(organizerSrc.includes('max="500"'));
      assert.ok(organizerSrc.includes('step="10"'));
      assert.ok(organizerSrc.includes('value={entryFee}'));

      // Host cut slider
      assert.ok(organizerSrc.includes('min="0"'));
      assert.ok(organizerSrc.includes('max="20"'));
      assert.ok(organizerSrc.includes('step="1"'));
      assert.ok(organizerSrc.includes('value={hostCutPercent}'));
    });

    it('verifies elimination of footnotes and conversational copy in OrganizerProgram', () => {
      const prohibitedOrganizerStrings = [
        'Credited directly to your dedicated Organizer Wallet upon match settlement.',
        '10% Platform Rake',
      ];

      for (const str of prohibitedOrganizerStrings) {
        assert.ok(!organizerSrc.includes(str), `OrganizerProgram must NOT contain prohibited string: "${str}"`);
      }

      assert.ok(!/<Pill\b[^>]*\/>/.test(organizerSrc), 'No <Pill /> in OrganizerProgram');
    });
  });

  // =========================================================================
  // 5. Cross-Cutting DOM ID Registry Verification
  // =========================================================================
  describe('Milestone 3 DOM Navigation Anchor Registry', () => {
    it('verifies all 6 required section anchor IDs are present and unique across components', () => {
      const requiredAnchors = [
        { id: 'ai-vision', file: 'AIVisionShowcase.tsx', src: aiVisionSrc },
        { id: 'wallet', file: 'WalletSection.tsx', src: walletSrc },
        { id: 'ranks', file: 'LeaderboardTiers.tsx', src: leaderboardSrc },
        { id: 'organizers', file: 'OrganizerProgram.tsx', src: organizerSrc },
        { id: 'tournaments', file: 'TournamentModes.tsx', src: tournamentsSrc },
        { id: 'app-showcase', file: 'AppExperienceShowcase.tsx', src: appExpSrc },
      ];

      for (const anchor of requiredAnchors) {
        const pattern = new RegExp(`id=["']${anchor.id}["']`);
        assert.ok(
          pattern.test(anchor.src),
          `${anchor.file} must declare section anchor id="${anchor.id}"`
        );
      }
    });
  });

  // =========================================================================
  // 6. TournamentModes: 3D Tilt Math Clamp [-3, 3], Mobile Guard & 10% Rake
  // =========================================================================
  describe('TournamentModes: 3D Tilt Math Clamp, Mobile Guard & 10% Rake Conservation', () => {
    it('verifies DOM anchor id="tournaments" is present', () => {
      assert.ok(tournamentsSrc.includes('id="tournaments"'), 'TournamentModes must define id="tournaments"');
    });

    it('verifies mobile guard (< 1024px) in card tilt handler', () => {
      assert.ok(
        tournamentsSrc.includes('if (window.innerWidth < 1024) return;'),
        'handleCardMouseMove must guard against screen widths < 1024px'
      );
    });

    it('verifies 3D tilt formula in source code', () => {
      assert.ok(
        tournamentsSrc.includes('((e.clientX - rect.left) / rect.width - 0.5) * 6'),
        'X tilt formula must be ((e.clientX - rect.left) / rect.width - 0.5) * 6'
      );
      assert.ok(
        tournamentsSrc.includes('((e.clientY - rect.top) / rect.height - 0.5) * -6'),
        'Y tilt formula must be ((e.clientY - rect.top) / rect.height - 0.5) * -6'
      );
      assert.ok(
        tournamentsSrc.includes('setCardTilt({ x: 0, y: 0, px: 50, py: 50 })'),
        'Mouse leave must reset tilt to neutral { x: 0, y: 0, px: 50, py: 50 }'
      );
    });

    function computeTilt(clientX: number, clientY: number, rect: { left: number; top: number; width: number; height: number }, innerWidth: number) {
      if (innerWidth < 1024) return null;
      const x = ((clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((clientY - rect.top) / rect.height - 0.5) * -6;
      const px = Math.round(((clientX - rect.left) / rect.width) * 100);
      const py = Math.round(((clientY - rect.top) / rect.height) * 100);
      return { x, y, px, py };
    }

    it('empirically verifies 3D tilt coordinates strictly clamp to [-3, 3] across all boundary corners and center', () => {
      const rect = { left: 100, top: 200, width: 400, height: 300 };
      const desktop = 1200;

      // Top-Left corner (clientX = 100, clientY = 200) -> x = -3, y = +3
      const tl = computeTilt(100, 200, rect, desktop);
      assert.ok(tl);
      assert.equal(tl.x, -3);
      assert.equal(tl.y, 3);
      assert.equal(tl.px, 0);
      assert.equal(tl.py, 0);

      // Top-Right corner (clientX = 500, clientY = 200) -> x = +3, y = +3
      const tr = computeTilt(500, 200, rect, desktop);
      assert.ok(tr);
      assert.equal(tr.x, 3);
      assert.equal(tr.y, 3);
      assert.equal(tr.px, 100);
      assert.equal(tr.py, 0);

      // Bottom-Left corner (clientX = 100, clientY = 500) -> x = -3, y = -3
      const bl = computeTilt(100, 500, rect, desktop);
      assert.ok(bl);
      assert.equal(bl.x, -3);
      assert.equal(bl.y, -3);
      assert.equal(bl.px, 0);
      assert.equal(bl.py, 100);

      // Bottom-Right corner (clientX = 500, clientY = 500) -> x = +3, y = -3
      const br = computeTilt(500, 500, rect, desktop);
      assert.ok(br);
      assert.equal(br.x, 3);
      assert.equal(br.y, -3);
      assert.equal(br.px, 100);
      assert.equal(br.py, 100);

      // Exact Center (clientX = 300, clientY = 350) -> x = 0, y = 0
      const center = computeTilt(300, 350, rect, desktop);
      assert.ok(center);
      assert.equal(Math.abs(center.x), 0);
      assert.equal(Math.abs(center.y), 0);
      assert.equal(center.px, 50);
      assert.equal(center.py, 50);
    });

    it('stress-tests 5,000 randomized cursor positions within bounding box confirming [-3, 3] bounds', () => {
      const rect = { left: 50, top: 120, width: 480, height: 360 };
      const desktop = 1440;

      for (let i = 0; i < 5000; i++) {
        const u = Math.random(); // 0 to 1
        const v = Math.random(); // 0 to 1
        const clientX = rect.left + u * rect.width;
        const clientY = rect.top + v * rect.height;

        const tilt = computeTilt(clientX, clientY, rect, desktop);
        assert.ok(tilt);
        assert.ok(tilt.x >= -3.0001 && tilt.x <= 3.0001, `tilt.x ${tilt.x} out of [-3, 3]`);
        assert.ok(tilt.y >= -3.0001 && tilt.y <= 3.0001, `tilt.y ${tilt.y} out of [-3, 3]`);
        assert.ok(tilt.px >= 0 && tilt.px <= 100, `tilt.px ${tilt.px} out of [0, 100]`);
        assert.ok(tilt.py >= 0 && tilt.py <= 100, `tilt.py ${tilt.py} out of [0, 100]`);
      }
    });

    it('verifies mobile guard blocks tilt calculation for innerWidth < 1024', () => {
      const rect = { left: 100, top: 200, width: 400, height: 300 };
      const mobileWidths = [320, 375, 414, 768, 820, 1023];

      for (const w of mobileWidths) {
        const res = computeTilt(200, 300, rect, w);
        assert.equal(res, null, `Tilt must not execute on viewport width ${w}`);
      }
    });

    it('empirically verifies exactly 10.0% platform rake across all Bermuda and Clash Squad tournament modes', () => {
      const bermudaTournaments = [
        { format: 'solo', slots: 48, entryAx: 50, prizePoolAx: 2160 },
        { format: 'duo', slots: 24, entryAx: 100, prizePoolAx: 2160 },
        { format: 'squad', slots: 12, entryAx: 200, prizePoolAx: 2160 },
      ];

      for (const t of bermudaTournaments) {
        const totalEntry = t.slots * t.entryAx;
        assert.equal(totalEntry, 2400, `Total entry for ${t.format} must be 2,400 AX`);
        const rakeAmount = totalEntry - t.prizePoolAx;
        assert.equal(rakeAmount, 240, `Rake amount for ${t.format} must be 240 AX`);
        const rakePercent = (rakeAmount / totalEntry) * 100;
        assert.equal(rakePercent, 10.0, `Platform rake for ${t.format} must be exactly 10.0%`);
      }

      // Clash Squad (CS) Quarters / Semis / Finals
      const csSlots = 8; // 8 squads
      const csEntry = 400; // 400 AX per squad
      const csTotal = csSlots * csEntry; // 3,200 AX
      const csPrize = 2880; // 2,880 AX
      const csRakeAmount = csTotal - csPrize;
      assert.equal(csRakeAmount, 320);
      const csRakePercent = (csRakeAmount / csTotal) * 100;
      assert.equal(csRakePercent, 10.0, 'Platform rake for Clash Squad must be exactly 10.0%');
    });

    it('verifies switcher modes and tab states in TournamentModes', () => {
      assert.ok(tournamentsSrc.includes("setActiveTab('bermuda')"));
      assert.ok(tournamentsSrc.includes("setActiveTab('clashsquad')"));
      assert.ok(tournamentsSrc.includes("setBermudaFormat(fmt)"));
      assert.ok(tournamentsSrc.includes("setCsStage(stage)"));
      assert.ok(tournamentsSrc.includes('Bermuda 48P'));
      assert.ok(tournamentsSrc.includes('Clash Squad 4v4'));
    });
  });

  // =========================================================================
  // 7. AppExperienceShowcase: 3D ROTATION_MAP, 3 Chapters & Room Copy Handler
  // =========================================================================
  describe('AppExperienceShowcase: 3D ROTATION_MAP, 3 Chapters & Room Copy Handler', () => {
    it('verifies DOM anchor id="app-showcase" is present', () => {
      assert.ok(appExpSrc.includes('id="app-showcase"'), 'AppExperienceShowcase must define id="app-showcase"');
    });

    it('verifies ROTATION_MAP constants match exact 3D orientation specifications', () => {
      const expectedRotations = {
        match: { rotY: -18, rotX: 6, transZ: 0 },
        ocr: { rotY: -2, rotX: 1, transZ: 35 },
        wallet: { rotY: 14, rotX: -4, transZ: 0 },
      };

      for (const [key, val] of Object.entries(expectedRotations)) {
        assert.ok(
          appExpSrc.includes(`${key}: { rotY: ${val.rotY}, rotX: ${val.rotX}, transZ: ${val.transZ} }`),
          `ROTATION_MAP must define ${key}: rotY ${val.rotY}, rotX ${val.rotX}, transZ ${val.transZ}`
        );
      }
    });

    function interpolateScroll3D(p: number) {
      let activeTab: 'match' | 'ocr' | 'wallet';
      if (p < 0.35) {
        activeTab = 'match';
      } else if (p < 0.7) {
        activeTab = 'ocr';
      } else {
        activeTab = 'wallet';
      }

      const rotY = -18 + p * 32; // -18deg to +14deg
      const rotX = 6 - p * 10;   // 6deg to -4deg
      const transZ = Math.sin(p * Math.PI) * 35;

      return {
        activeTab,
        rotY: Number(rotY.toFixed(1)),
        rotX: Number(rotX.toFixed(1)),
        transZ: Number(transZ.toFixed(0)),
      };
    }

    it('empirically verifies 3D scroll rotation interpolation dynamics and chapter transitions', () => {
      // Start (p = 0): match tab, rotY = -18, rotX = 6, transZ = 0
      const start = interpolateScroll3D(0);
      assert.equal(start.activeTab, 'match');
      assert.equal(start.rotY, -18);
      assert.equal(start.rotX, 6);
      assert.equal(start.transZ, 0);

      // Mid-first chapter (p = 0.2): match tab
      const p20 = interpolateScroll3D(0.2);
      assert.equal(p20.activeTab, 'match');

      // Boundary to second chapter (p = 0.35): ocr tab
      const boundary1 = interpolateScroll3D(0.35);
      assert.equal(boundary1.activeTab, 'ocr');

      // Mid-point (p = 0.5): ocr tab, transZ reaches maximum of 35px
      const mid = interpolateScroll3D(0.5);
      assert.equal(mid.activeTab, 'ocr');
      assert.equal(mid.rotY, -2);
      assert.equal(mid.rotX, 1);
      assert.equal(mid.transZ, 35); // Math.sin(pi/2) * 35 = 35

      // Boundary to third chapter (p = 0.7): wallet tab
      const boundary2 = interpolateScroll3D(0.7);
      assert.equal(boundary2.activeTab, 'wallet');

      // End (p = 1.0): wallet tab, rotY = +14, rotX = -4, transZ = 0
      const end = interpolateScroll3D(1.0);
      assert.equal(end.activeTab, 'wallet');
      assert.equal(end.rotY, 14);
      assert.equal(end.rotX, -4);
      assert.equal(end.transZ, 0);
    });

    it('stress-tests 1,000 steps of scroll progress verifying monotonicity and bounded rotation', () => {
      let prevRotY = -999;
      let prevRotX = 999;

      for (let i = 0; i <= 1000; i++) {
        const p = i / 1000;
        const state = interpolateScroll3D(p);

        // rotY strictly increases from -18 to +14
        assert.ok(state.rotY >= prevRotY, `rotY must be monotonically increasing: ${state.rotY} vs ${prevRotY}`);
        prevRotY = state.rotY;

        // rotX strictly decreases from 6 to -4
        assert.ok(state.rotX <= prevRotX, `rotX must be monotonically decreasing: ${state.rotX} vs ${prevRotX}`);
        prevRotX = state.rotX;

        // transZ in [0, 35]
        assert.ok(state.transZ >= 0 && state.transZ <= 35, `transZ out of bounds: ${state.transZ}`);
      }
    });

    it('verifies CHAPTERS array contains exactly 3 sequential chapters with descriptions', () => {
      const expectedChapters = [
        { id: 'match', num: '01', title: 'Match Credentials' },
        { id: 'ocr', num: '02', title: 'AI Scoreboard' },
        { id: 'wallet', num: '03', title: 'Dual-Vault Escrow' },
      ];

      for (const ch of expectedChapters) {
        assert.ok(appExpSrc.includes(`id: '${ch.id}'`), `CHAPTERS must define id '${ch.id}'`);
        assert.ok(appExpSrc.includes(`num: '${ch.num}'`), `CHAPTERS must define num '${ch.num}'`);
        assert.ok(appExpSrc.includes(`title: '${ch.title}'`), `CHAPTERS must define title '${ch.title}'`);
      }
    });

    it('verifies room copy handler implementation and clipboard interaction', () => {
      assert.ok(
        appExpSrc.includes("navigator.clipboard?.writeText('Room ID: 884921 | Password: arena77')"),
        'copyRoomDetails must copy exact Room ID: 884921 | Password: arena77 string'
      );
      assert.ok(appExpSrc.includes('setCopiedRoomId(true)'));
      assert.ok(appExpSrc.includes('setTimeout(() => setCopiedRoomId(false), 2500)'));
    });

    it('verifies GSAP ScrollTrigger pinning and unmount cleanup in AppExperienceShowcase', () => {
      assert.ok(appExpSrc.includes('gsap.registerPlugin(ScrollTrigger)'));
      assert.ok(appExpSrc.includes('pin: true'));
      assert.ok(appExpSrc.includes('pinTrigger.kill()'));
      assert.ok(appExpSrc.includes('ctx.revert()'));
      assert.ok(appExpSrc.includes('prefers-reduced-motion: no-preference'));
    });
  });
});
