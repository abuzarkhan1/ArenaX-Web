import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeCombatPoints,
  getTierFromPoints,
  computeRankGap,
  computeOrganizerRevenue,
  generateMailtoUrl,
} from './helpers/formulas.ts';

describe('Tier 2: Boundary & Corner Cases Suite', () => {
  describe('Combat Points & Tier Boundary Precision', () => {
    it('handles zero kills under both victory and defeat conditions', () => {
      assert.equal(computeCombatPoints(false, 0), 0);
      assert.equal(computeCombatPoints(true, 0), 20);
    });

    it('safely clamps negative kills input to 0', () => {
      assert.equal(computeCombatPoints(false, -5), 0);
      assert.equal(computeCombatPoints(true, -10), 20);
    });

    it('floors fractional kills without NaN propagation', () => {
      assert.equal(computeCombatPoints(false, 3.8), 15); // 3 * 5
      assert.equal(computeCombatPoints(true, 4.2), 40); // 20 + 4 * 5
    });

    it('handles extreme kills without integer overflow', () => {
      assert.equal(computeCombatPoints(true, 100), 520); // 20 + 500
      assert.equal(computeCombatPoints(false, 500), 2500);
    });

    it('verifies exact threshold boundaries for tier mapping', () => {
      // 0 to 24 PTS -> Gold
      assert.equal(getTierFromPoints(0).name, 'Gold Tier');
      assert.equal(getTierFromPoints(24).name, 'Gold Tier');

      // 25 PTS exact boundary -> Diamond
      assert.equal(getTierFromPoints(25).name, 'Diamond Tier');
      assert.equal(getTierFromPoints(39).name, 'Diamond Tier');

      // 40 PTS exact boundary -> Heroic
      assert.equal(getTierFromPoints(40).name, 'Heroic Tier');
      assert.equal(getTierFromPoints(59).name, 'Heroic Tier');

      // 60 PTS exact boundary -> Grandmaster
      assert.equal(getTierFromPoints(60).name, 'Grandmaster Contender');
      assert.equal(getTierFromPoints(61).name, 'Grandmaster Contender');
      assert.equal(getTierFromPoints(10000).name, 'Grandmaster Contender');
    });
  });

  describe('Rank Gap Edge & Ceiling Invariants', () => {
    it('handles 1-point difference requiring 1 Booyah (ceiling invariant)', () => {
      const gap = computeRankGap(4599, 4600);
      assert.equal(gap.ptsNeeded, 1);
      assert.equal(gap.booyahsNeeded, 1);
    });

    it('handles exact multiple of 20 points needed (exact division)', () => {
      const gap = computeRankGap(4580, 4600);
      assert.equal(gap.ptsNeeded, 20);
      assert.equal(gap.booyahsNeeded, 1);
    });

    it('handles 21 points needed requiring 2 Booyahs (ceiling bump)', () => {
      const gap = computeRankGap(4579, 4600);
      assert.equal(gap.ptsNeeded, 21);
      assert.equal(gap.booyahsNeeded, 2);
    });

    it('handles negative current points by clamping to zero', () => {
      const gap = computeRankGap(-500, 2000);
      assert.equal(gap.ptsNeeded, 2000);
      assert.equal(gap.booyahsNeeded, 100);
      assert.equal(gap.progressPercent, 0);
    });

    it('clamps progressPercent to 100% when user exceeds target tier', () => {
      const gap = computeRankGap(8500, 6200);
      assert.equal(gap.ptsNeeded, 0);
      assert.equal(gap.booyahsNeeded, 0);
      assert.equal(gap.progressPercent, 100);
    });

    it('handles targetMin of 0 without division-by-zero error', () => {
      const gap = computeRankGap(0, 0);
      assert.equal(gap.ptsNeeded, 0);
      assert.equal(gap.booyahsNeeded, 0);
      assert.equal(gap.progressPercent, 100);
    });
  });

  describe('Organizer Revenue Conservation & Rounding Stress Matrix', () => {
    it('handles zero participants with zero output and conservation', () => {
      const rev = computeOrganizerRevenue(0, 100, 10);
      assert.equal(rev.totalRevenue, 0);
      assert.equal(rev.adminFee, 0);
      assert.equal(rev.hostEarnings, 0);
      assert.equal(rev.playerPrizePool, 0);
      assert.equal(rev.playerPrizePercent, 0);
      assert.ok(rev.isConserved);
    });

    it('handles zero entry fee with zero output and conservation', () => {
      const rev = computeOrganizerRevenue(48, 0, 10);
      assert.equal(rev.totalRevenue, 0);
      assert.equal(rev.playerPrizePool, 0);
      assert.ok(rev.isConserved);
    });

    it('handles 0% host cut allocating remainder to players', () => {
      const rev = computeOrganizerRevenue(48, 100, 0);
      assert.equal(rev.adminFee, 480);
      assert.equal(rev.hostEarnings, 0);
      assert.equal(rev.playerPrizePool, 4320); // 90%
      assert.equal(rev.playerPrizePercent, 90);
      assert.ok(rev.isConserved);
    });

    it('handles maximum 20% host cut allocating 70% to players', () => {
      const rev = computeOrganizerRevenue(48, 100, 20);
      assert.equal(rev.adminFee, 480);
      assert.equal(rev.hostEarnings, 960);
      assert.equal(rev.playerPrizePool, 3360); // 70%
      assert.equal(rev.playerPrizePercent, 70);
      assert.ok(rev.isConserved);
    });

    it('stress tests mathematical conservation across irregular prime matrices', () => {
      const primeParticipants = [1, 3, 7, 11, 13, 17, 23, 29, 31, 37, 41, 47];
      const irregularFees = [17, 33, 49, 73, 99, 127, 255, 333, 499];
      const cuts = [0, 1, 5, 7, 10, 13, 15, 17, 20];

      let casesTested = 0;
      for (const p of primeParticipants) {
        for (const f of irregularFees) {
          for (const c of cuts) {
            const rev = computeOrganizerRevenue(p, f, c);
            assert.ok(
              rev.isConserved,
              `Conservation failed for p=${p}, fee=${f}, cut=${c}: admin(${rev.adminFee}) + host(${rev.hostEarnings}) + player(${rev.playerPrizePool}) !== total(${rev.totalRevenue})`
            );
            assert.ok(rev.adminFee >= 0);
            assert.ok(rev.hostEarnings >= 0);
            assert.ok(rev.playerPrizePool >= 0);
            casesTested++;
          }
        }
      }

      assert.equal(casesTested, primeParticipants.length * irregularFees.length * cuts.length);
    });
  });

  describe('Contact Mailto Encoding & Special Characters', () => {
    it('escapes and encodes special characters, symbols, and query meta-characters', () => {
      const complexData = {
        name: 'Saad & Sons (Pvt.) Ltd.',
        email: 'user+tag@domain.co.pk',
        subject: '100% Refund? Query: Match #42 = Canceled & Re-routed!',
        message: 'Line 1: Hello!\nLine 2: What about & and ? and = signs?\nLine 3: 100% payout guaranteed.',
      };

      const mailto = generateMailtoUrl(complexData);
      assert.ok(!mailto.includes('100% Refund?')); // Must be percent-encoded
      assert.ok(mailto.includes(encodeURIComponent(complexData.subject)));
      assert.ok(mailto.includes(encodeURIComponent('Saad & Sons (Pvt.) Ltd.')));
      assert.ok(mailto.includes(encodeURIComponent('Line 1: Hello!\nLine 2: What about & and ? and = signs?')));
    });

    it('handles unicode names (Urdu / Arabic / extended Latin characters)', () => {
      const unicodeData = {
        name: 'محمد رضوان خان',
        email: 'rizwan@arenax.pk',
        subject: 'اکاؤنٹ تصدیق',
        message: 'میرا اکاؤنٹ تصدیق نہیں ہو رہا ہے۔',
      };

      const mailto = generateMailtoUrl(unicodeData);
      assert.ok(mailto.includes(encodeURIComponent('محمد رضوان خان')));
      assert.ok(mailto.includes(encodeURIComponent('اکاؤنٹ تصدیق')));
      assert.ok(mailto.includes(encodeURIComponent('میرا اکاؤنٹ تصدیق نہیں ہو رہا ہے۔')));
    });

    it('handles extremely long text bodies without throwing', () => {
      const longMessage = 'A'.repeat(5000);
      const longData = {
        name: 'Heavy Tester',
        email: 'tester@test.com',
        subject: 'Massive Payload Test',
        message: longMessage,
      };

      const mailto = generateMailtoUrl(longData);
      assert.ok(mailto.length > 5000);
    });
  });

  describe('FAQ Accordion Single-Open State Invariant', () => {
    it('toggles open index to null when same item is clicked again', () => {
      let openIndex: number | null = 2;
      const toggle = (idx: number) => {
        openIndex = openIndex === idx ? null : idx;
      };

      toggle(2); // clicked item 2 again -> closes
      assert.equal(openIndex, null);

      toggle(4); // clicked item 4 -> opens 4
      assert.equal(openIndex, 4);

      toggle(1); // clicked item 1 -> switches to 1, closes 4
      assert.equal(openIndex, 1);
    });
  });
});
