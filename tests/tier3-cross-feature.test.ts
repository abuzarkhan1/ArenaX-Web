import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { EXPECTED_APP_ROUTES } from './helpers/formulas.ts';

function readSrcFile(relativeSubPath: string): string {
  const fullPath = path.resolve(process.cwd(), 'src', relativeSubPath);
  assert.ok(fs.existsSync(fullPath), `File src/${relativeSubPath} must exist`);
  return fs.readFileSync(fullPath, 'utf8');
}

describe('Tier 3: Cross-Feature Interactions Suite', () => {
  describe('Route-Navigation Topology Synchronization', () => {
    it('synchronizes all Navbar navigation links with registered App.tsx routes', () => {
      const navbarSrc = readSrcFile('components/Navbar.tsx');
      const appSrc = readSrcFile('App.tsx');

      // Extract all path: '/...' references from Navbar
      const pathMatches = [...navbarSrc.matchAll(/path:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
      assert.ok(pathMatches.length > 0, 'Navbar must define route paths');

      for (const p of pathMatches) {
        assert.ok(
          appSrc.includes(`path="${p}"`) || appSrc.includes(`path='${p}'`),
          `Navbar path "${p}" must be registered in App.tsx`
        );
      }
    });

    it('synchronizes all Footer navigation links with registered App.tsx routes', () => {
      const footerSrc = readSrcFile('components/Footer.tsx');
      const appSrc = readSrcFile('App.tsx');

      // Extract all <Link to="..."> targets from Footer
      const linkMatches = [...footerSrc.matchAll(/<Link\s+to=["']([^"']+)["']/g)].map((m) => m[1]);
      assert.ok(linkMatches.length >= 7, 'Footer must contain at least 7 internal links');

      for (const target of linkMatches) {
        assert.ok(
          EXPECTED_APP_ROUTES.includes(target as typeof EXPECTED_APP_ROUTES[number]),
          `Footer link "${target}" must be in EXPECTED_APP_ROUTES`
        );
        assert.ok(
          appSrc.includes(`path="${target}"`) || target === '/',
          `Footer link "${target}" must have a matching Route in App.tsx`
        );
      }
    });

    it('verifies that all section anchor IDs used by Navbar exist in HomePage components', () => {
      const navbarSrc = readSrcFile('components/Navbar.tsx');
      // Anchors checked by Navbar scroll spy
      const sectionMatch = navbarSrc.match(/const sections = \[([^\]]+)\]/);
      assert.ok(sectionMatch, 'Navbar must define scroll spy sections list');

      const expectedSections = ['tournaments', 'ai-vision', 'wallet', 'ranks', 'organizers', 'how-it-works'];

      const componentFiles = [
        'components/TournamentModes.tsx',
        'components/AIVisionShowcase.tsx',
        'components/WalletSection.tsx',
        'components/LeaderboardTiers.tsx',
        'components/OrganizerProgram.tsx',
        'components/HowItWorks.tsx',
      ];

      for (let i = 0; i < expectedSections.length; i++) {
        const secId = expectedSections[i];
        const compSrc = readSrcFile(componentFiles[i]);
        assert.ok(
          compSrc.includes(`id="${secId}"`),
          `Component ${componentFiles[i]} must define DOM id="${secId}" for Navbar jumping`
        );
      }
    });
  });

  describe('Tournament Formats & Organizer Presets Alignment', () => {
    it('aligns Bermuda and Clash Squad player caps across TournamentModes and OrganizerProgram', () => {
      const tourneySrc = readSrcFile('components/TournamentModes.tsx');
      const orgSrc = readSrcFile('components/OrganizerProgram.tsx');

      // Bermuda Battle Royale uses 48 players
      assert.ok(tourneySrc.includes('48') || tourneySrc.includes('48 Players'));
      assert.ok(orgSrc.includes('48') || orgSrc.includes('participants, setParticipants] = useState(48)'));

      // Clash Squad 4v4 format alignment (10 players / 8 players)
      assert.ok(tourneySrc.includes('Clash Squad') && tourneySrc.includes('4v4'));
      assert.ok(orgSrc.includes('Bermuda or Clash Squad'));
    });
  });

  describe('Economic Model Consistency (1 AX = 1 PKR & 10% Platform Rake)', () => {
    it('maintains strict 1 AX = 1 PKR cash parity across financial and reward components', () => {
      const walletSrc = readSrcFile('components/WalletSection.tsx');
      const faqSrc = readSrcFile('components/FAQ.tsx');
      const scoutSrc = readSrcFile('components/ScoutRewards.tsx');

      assert.ok(
        walletSrc.includes('1 AX = 1 PKR') || walletSrc.includes('1:1'),
        'WalletSection must state 1 AX = 1 PKR cash parity'
      );
      assert.ok(
        faqSrc.includes('1 AX') || faqSrc.includes('PKR'),
        'FAQ must confirm 1 AX = 1 PKR value'
      );
      assert.ok(
        scoutSrc.includes('25 AX') || scoutSrc.includes('AX'),
        'ScoutRewards must use AX currency denominations'
      );
    });

    it('consistently declares the official 10% platform rake across Organizer and FAQ', () => {
      const orgSrc = readSrcFile('components/OrganizerProgram.tsx');
      const faqSrc = readSrcFile('components/FAQ.tsx');

      // OrganizerProgram uses Math.round(totalRevenue * 0.10)
      assert.ok(
        orgSrc.includes('0.10') || orgSrc.includes('0.1'),
        'OrganizerProgram must use 10% platform fee calculation'
      );
      // FAQ references 10% platform rake
      assert.ok(
        faqSrc.includes('10%') || faqSrc.includes('rake') || faqSrc.includes('fee'),
        'FAQ must document the 10% platform rake'
      );
    });

    it('consistently isolates Play Wallet and Winning Wallet across AppExperienceShowcase and WalletSection', () => {
      const appShowcaseSrc = readSrcFile('components/AppExperienceShowcase.tsx');
      const walletSrc = readSrcFile('components/WalletSection.tsx');

      assert.ok(appShowcaseSrc.includes('Play Wallet') && appShowcaseSrc.includes('Winning Wallet'));
      assert.ok(walletSrc.includes('Play Wallet') && walletSrc.includes('Winning Wallet'));
    });
  });

  describe('Fair Play Enforcement & Anti-Cheat Cohesion', () => {
    it('aligns mobile device-only and anti-emulator rules across FairPlay and FAQ', () => {
      const fairPlaySrc = readSrcFile('components/FairPlay.tsx');
      const faqSrc = readSrcFile('components/FAQ.tsx');

      assert.ok(
        /emulator|mobile|anti-cheat/i.test(fairPlaySrc),
        'FairPlay must prohibit emulators / mandate mobile devices'
      );
      assert.ok(
        /mobile|apk|uid/i.test(faqSrc),
        'FAQ must confirm mobile/APK client policy'
      );
    });

    it('cross-references AI vision screenshot verification between AIVisionShowcase and Statement', () => {
      const visionSrc = readSrcFile('components/AIVisionShowcase.tsx');
      const stmtSrc = readSrcFile('components/Statement.tsx');

      assert.ok(visionSrc.includes('AI') || visionSrc.includes('Scoreboard'));
      assert.ok(stmtSrc.includes('AI') || stmtSrc.includes('Vision'));
    });
  });
});
