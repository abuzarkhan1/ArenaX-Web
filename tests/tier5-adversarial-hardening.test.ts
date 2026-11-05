import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  computeCombatPoints,
  computeRankGap,
  computeOrganizerRevenue,
  EXPECTED_APP_ROUTES,
} from './helpers/formulas.ts';
import { scanAllComponents } from './layout-copy-verification.test.ts';

describe('Tier 5: Adversarial Hardening & Zero-Defect Robustness', () => {
  describe('Adversarial Layout & Copy Zero-Tolerance Audit (R1)', () => {
    const componentAudits = scanAllComponents();

    it('confirms zero pill eyebrows across all 20+ screen components', () => {
      const violated = componentAudits.filter((c) => c.pillEyebrows > 0);
      assert.equal(
        violated.length,
        0,
        `Pill eyebrows found in: ${violated.map((c) => c.fileName).join(', ')}`
      );
    });

    it('confirms zero tagline declarations across all screen components', () => {
      const violated = componentAudits.filter((c) => c.taglineDeclarations > 0);
      assert.equal(
        violated.length,
        0,
        `Taglines found in: ${violated.map((c) => c.fileName).join(', ')}`
      );
    });

    it('confirms zero explanatory footnotes/disclaimers across all screens', () => {
      const violated = componentAudits.filter((c) => c.explanatoryFootnotes > 0);
      assert.equal(
        violated.length,
        0,
        `Explanatory footnotes found in: ${violated.map((c) => c.fileName).join(', ')}`
      );
    });

    it('confirms total R1 violations across the entire codebase strictly equals zero', () => {
      const totalViolations = componentAudits.reduce((acc, c) => acc + c.totalViolations, 0);
      assert.equal(totalViolations, 0, `Expected 0 total R1 violations, found ${totalViolations}`);
    });
  });

  describe('Adversarial Mathematical Engine Stress', () => {
    it('survives non-integer, negative, and extreme inputs in computeCombatPoints', () => {
      assert.equal(computeCombatPoints(false, NaN), 0);
      assert.equal(computeCombatPoints(true, NaN), 20);
      assert.equal(computeCombatPoints(false, -9999), 0);
      assert.equal(computeCombatPoints(true, -9999), 20);
      assert.equal(computeCombatPoints(false, 10.999), 50); // floored to 10 * 5
      assert.equal(computeCombatPoints(true, 1000000), 20 + 5000000);
    });

    it('stress tests rank gap math against extreme inputs and out-of-order points', () => {
      // 0 points with 0 target
      const zeroGap = computeRankGap(0, 0);
      assert.equal(zeroGap.ptsNeeded, 0);
      assert.equal(zeroGap.booyahsNeeded, 0);
      assert.equal(zeroGap.progressPercent, 100);

      // Points far exceeding Grandmaster
      const overachiever = computeRankGap(50000, 10000);
      assert.equal(overachiever.ptsNeeded, 0);
      assert.equal(overachiever.booyahsNeeded, 0);
      assert.equal(overachiever.progressPercent, 100);

      // Fractional current points
      const fracGap = computeRankGap(4599.5, 4600);
      assert.equal(fracGap.ptsNeeded, 0.5);
      assert.equal(fracGap.booyahsNeeded, 1);
    });

    it('conserves revenue to the last PKR across 1,000 irregular prime matrices', () => {
      const primeParticipants = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const primeFees = [53, 71, 97, 113, 137, 179, 199, 233, 277, 311];
      const cuts = [0, 5, 7, 10, 13, 15, 18, 20];

      let checks = 0;
      for (const p of primeParticipants) {
        for (const f of primeFees) {
          for (const c of cuts) {
            const rev = computeOrganizerRevenue(p, f, c);
            assert.ok(
              rev.isConserved,
              `Revenue conservation failed for p=${p}, f=${f}, c=${c}`
            );
            assert.equal(
              rev.adminFee + rev.hostEarnings + rev.playerPrizePool,
              rev.totalRevenue,
              `Sum mismatch for p=${p}, f=${f}, c=${c}`
            );
            checks++;
          }
        }
      }
      assert.equal(checks, 960);
    });
  });

  describe('Adversarial DOM & Route Invariants', () => {
    it('verifies that all navigation anchor targets resolve to existing DOM IDs', () => {
      const componentsDir = path.resolve(process.cwd(), 'src/components');
      const allComponentFiles = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.tsx'));
      const combinedSource = allComponentFiles
        .map((f) => fs.readFileSync(path.join(componentsDir, f), 'utf8'))
        .join('\n');

      const expectedAnchors = [
        'tournaments',
        'ai-vision',
        'wallet',
        'ranks',
        'organizers',
        'how-it-works',
        'download',
      ];

      for (const anchor of expectedAnchors) {
        const idPattern = new RegExp(`id=["']${anchor}["']`);
        assert.ok(
          idPattern.test(combinedSource),
          `Missing DOM element with id="${anchor}" in components`
        );
      }
    });

    it('verifies all internal Link and route references map to valid App.tsx routes', () => {
      const footerPath = path.resolve(process.cwd(), 'src/components/Footer.tsx');
      const footerSrc = fs.readFileSync(footerPath, 'utf8');
      const links = [...footerSrc.matchAll(/to=["'](\/[a-z0-9-]*)["']/g)].map((m) => m[1]);

      for (const l of links) {
        assert.ok(
          EXPECTED_APP_ROUTES.includes(l as typeof EXPECTED_APP_ROUTES[number]),
          `Footer links to unknown route: ${l}`
        );
      }
    });

    it('verifies Stat primitive interface does not export deprecated subtext prop', () => {
      const statPath = path.resolve(process.cwd(), 'src/components/primitives/Stat.tsx');
      const statSrc = fs.readFileSync(statPath, 'utf8');
      assert.ok(
        !statSrc.includes('subtext?:'),
        'StatProps must not declare subtext prop'
      );
    });

    it('verifies SmoothScroll.tsx synchronizes Lenis and refreshes ScrollTrigger on route change', () => {
      const smoothPath = path.resolve(process.cwd(), 'src/components/SmoothScroll.tsx');
      const smoothSrc = fs.readFileSync(smoothPath, 'utf8');
      assert.ok(
        smoothSrc.includes('useLocation'),
        'SmoothScroll must subscribe to location route transitions'
      );
      assert.ok(
        smoothSrc.includes('scrollTo(0, { immediate: true })'),
        'SmoothScroll must reset scroll position to 0 immediately on route change'
      );
      assert.ok(
        smoothSrc.includes('ScrollTrigger.refresh()'),
        'SmoothScroll must trigger ScrollTrigger.refresh() on route transition'
      );
    });
  });
});
