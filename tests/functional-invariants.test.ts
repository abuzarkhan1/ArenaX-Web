import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeCombatPoints,
  getTierFromPoints,
  computeRankGap,
  computeOrganizerRevenue,
  generateMailtoUrl,
  RANK_TIERS,
  EXPECTED_APP_ROUTES,
} from './helpers/formulas.ts';

describe('Functional Invariants & Calculations Suite (R3)', () => {
  describe('Routing & Page Registry Invariants', () => {
    it('declares all expected public routes in src/App.tsx', () => {
      const appPath = path.resolve(process.cwd(), 'src/App.tsx');
      assert.ok(fs.existsSync(appPath), 'src/App.tsx must exist');
      const appSource = fs.readFileSync(appPath, 'utf8');

      for (const route of EXPECTED_APP_ROUTES) {
        const routePattern = new RegExp(`path=["']${route === '/' ? '/' : route.replace('/', '\\/')}["']`);
        assert.ok(
          routePattern.test(appSource),
          `src/App.tsx must define Route with path "${route}"`
        );
      }
    });

    it('declares a wildcard catch-all route redirecting to HomePage', () => {
      const appPath = path.resolve(process.cwd(), 'src/App.tsx');
      const appSource = fs.readFileSync(appPath, 'utf8');
      assert.ok(
        /path=["']\*["']/.test(appSource),
        'src/App.tsx must include a wildcard route path="*"'
      );
    });

    it('enforces scroll-to-top on route changes in App.tsx', () => {
      const appPath = path.resolve(process.cwd(), 'src/App.tsx');
      const appSource = fs.readFileSync(appPath, 'utf8');
      assert.ok(
        appSource.includes('window.scrollTo({ top: 0, behavior: \'instant\' })') ||
        appSource.includes('scrollTo'),
        'App.tsx must handle window scroll restoration on route changes'
      );
    });
  });

  describe('Combat Points Formula (AIVisionShowcase.tsx)', () => {
    it('calculates 20 PTS for Booyah with zero kills', () => {
      const points = computeCombatPoints(true, 0);
      assert.equal(points, 20);
    });

    it('calculates 0 PTS for defeat with zero kills', () => {
      const points = computeCombatPoints(false, 0);
      assert.equal(points, 0);
    });

    it('calculates 5 PTS per kill without Booyah', () => {
      assert.equal(computeCombatPoints(false, 1), 5);
      assert.equal(computeCombatPoints(false, 6), 30);
      assert.equal(computeCombatPoints(false, 10), 50);
    });

    it('calculates 20 PTS Booyah + 5 PTS per kill combined', () => {
      // 6 kills with Booyah = 20 + 30 = 50 PTS
      assert.equal(computeCombatPoints(true, 6), 50);
      // 12 kills with Booyah = 20 + 60 = 80 PTS
      assert.equal(computeCombatPoints(true, 12), 80);
    });

    it('maps points to authoritative projected tiers correctly', () => {
      // >= 60 PTS -> Grandmaster Contender
      const gm = getTierFromPoints(60);
      assert.equal(gm.name, 'Grandmaster Contender');
      assert.equal(gm.percent, 100);

      const gmOver = getTierFromPoints(95);
      assert.equal(gmOver.name, 'Grandmaster Contender');

      // 40 - 59 PTS -> Heroic Tier
      const heroic = getTierFromPoints(40);
      assert.equal(heroic.name, 'Heroic Tier');
      assert.equal(heroic.percent, 75);

      const heroicHigh = getTierFromPoints(55);
      assert.equal(heroicHigh.name, 'Heroic Tier');

      // 25 - 39 PTS -> Diamond Tier
      const diamond = getTierFromPoints(25);
      assert.equal(diamond.name, 'Diamond Tier');
      assert.equal(diamond.percent, 50);

      const diamondHigh = getTierFromPoints(35);
      assert.equal(diamondHigh.name, 'Diamond Tier');

      // < 25 PTS -> Gold Tier
      const gold = getTierFromPoints(24);
      assert.equal(gold.name, 'Gold Tier');
      assert.equal(gold.percent, 25);

      const goldZero = getTierFromPoints(0);
      assert.equal(goldZero.name, 'Gold Tier');
    });
  });

  describe('Rank Gap Math (LeaderboardTiers.tsx)', () => {
    it('maintains 8 competitive tiers in ascending order of target points', () => {
      assert.equal(RANK_TIERS.length, 8);
      const expectedTiers = [
        'Bronze',
        'Silver',
        'Gold',
        'Platinum',
        'Diamond',
        'Heroic',
        'Master',
        'Grandmaster',
      ];
      for (let i = 0; i < RANK_TIERS.length; i++) {
        assert.equal(RANK_TIERS[i].name, expectedTiers[i]);
      }

      for (let i = 1; i < RANK_TIERS.length; i++) {
        assert.ok(
          RANK_TIERS[i].targetMin > RANK_TIERS[i - 1].targetMin,
          `Tier ${RANK_TIERS[i].name} targetMin must exceed predecessor`
        );
      }
    });

    it('computes exact points needed and Booyahs required to reach target tier', () => {
      // Current 4,800 PTS, Target Heroic (6,200 PTS) -> 1,400 PTS needed, 70 Booyahs
      const heroicTier = RANK_TIERS.find((t) => t.name === 'Heroic')!;
      const gap = computeRankGap(4800, heroicTier.targetMin);
      assert.equal(gap.ptsNeeded, 1400);
      assert.equal(gap.booyahsNeeded, 70); // 1400 / 20 = 70
      assert.equal(gap.progressPercent, 77); // Math.round((4800 / 6200) * 100)
    });

    it('clamps points and booyahs to 0 when user has met or exceeded target', () => {
      const diamondTier = RANK_TIERS.find((t) => t.name === 'Diamond')!; // 4,600
      const gap = computeRankGap(5000, diamondTier.targetMin);
      assert.equal(gap.ptsNeeded, 0);
      assert.equal(gap.booyahsNeeded, 0);
      assert.equal(gap.progressPercent, 100);
    });

    it('handles Bronze starter base with 0 minimum target correctly', () => {
      const bronzeTier = RANK_TIERS.find((t) => t.name === 'Bronze')!;
      const gap = computeRankGap(0, bronzeTier.targetMin);
      assert.equal(gap.ptsNeeded, 0);
      assert.equal(gap.booyahsNeeded, 0);
      assert.equal(gap.progressPercent, 100);
    });
  });

  describe('Organizer Revenue Engine (OrganizerProgram.tsx)', () => {
    it('computes default 48-player tournament breakdown accurately', () => {
      // 48 participants, 100 PKR entry fee, 10% host cut
      const rev = computeOrganizerRevenue(48, 100, 10);
      assert.equal(rev.totalRevenue, 4800);
      assert.equal(rev.adminFee, 480); // 10% platform rake
      assert.equal(rev.hostEarnings, 480); // 10% host cut
      assert.equal(rev.playerPrizePool, 3840); // 4800 - 480 - 480
      assert.equal(rev.playerPrizePercent, 80);
      assert.ok(rev.isConserved, 'Sum of shares must strictly equal total revenue');
    });

    it('computes 10-player Clash Squad tournament with 15% host cut', () => {
      const rev = computeOrganizerRevenue(10, 50, 15);
      assert.equal(rev.totalRevenue, 500);
      assert.equal(rev.adminFee, 50); // 10%
      assert.equal(rev.hostEarnings, 75); // 15%
      assert.equal(rev.playerPrizePool, 375); // 500 - 50 - 75
      assert.equal(rev.playerPrizePercent, 75);
      assert.ok(rev.isConserved);
    });

    it('computes 24-player Duo tournament with maximum 20% host cut', () => {
      const rev = computeOrganizerRevenue(24, 200, 20);
      assert.equal(rev.totalRevenue, 4800);
      assert.equal(rev.adminFee, 480);
      assert.equal(rev.hostEarnings, 960); // 20%
      assert.equal(rev.playerPrizePool, 3360); // 4800 - 480 - 960
      assert.equal(rev.playerPrizePercent, 70);
      assert.ok(rev.isConserved);
    });
  });

  describe('Contact Form & Support Behavior (Contact.tsx)', () => {
    it('generates valid RFC-compliant mailto URLs with encoded parameters', () => {
      const formData = {
        name: 'Saad Ali',
        email: 'saad@gmail.com',
        subject: 'Prize Pool Inquiry & Verification',
        message: 'Hello ArenaX Support team,\n\nWhen will match #8492 payout clear?',
      };

      const mailto = generateMailtoUrl(formData);
      assert.ok(mailto.startsWith('mailto:arenasupport@gmail.com?'));
      assert.ok(mailto.includes('subject=' + encodeURIComponent('[ArenaX Contact] ' + formData.subject)));
      assert.ok(mailto.includes('body='));
      assert.ok(mailto.includes(encodeURIComponent('Name: Saad Ali')));
      assert.ok(mailto.includes(encodeURIComponent('Email: saad@gmail.com')));
    });

    it('verifies Contact.tsx contains fallback mailto handler in source code', () => {
      const contactPath = path.resolve(process.cwd(), 'src/components/Contact.tsx');
      assert.ok(fs.existsSync(contactPath));
      const source = fs.readFileSync(contactPath, 'utf8');

      assert.ok(
        source.includes('mailto:arenasupport@gmail.com') || source.includes('arenasupport@gmail.com'),
        'Contact.tsx must contain fallback to arenasupport@gmail.com'
      );
      assert.ok(
        source.includes('encodeURIComponent'),
        'Contact.tsx must URL-encode mailto parameters'
      );
    });
  });
});
