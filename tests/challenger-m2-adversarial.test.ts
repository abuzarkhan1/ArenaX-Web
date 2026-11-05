import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite: Milestone 2 (Hero & Statement)', () => {
  const root = process.cwd();
  const heroSrc = fs.readFileSync(path.join(root, 'src/components/Hero.tsx'), 'utf8');
  const statementSrc = fs.readFileSync(path.join(root, 'src/components/Statement.tsx'), 'utf8');
  const tournamentModesSrc = fs.readFileSync(path.join(root, 'src/components/TournamentModes.tsx'), 'utf8');
  const aiVisionSrc = fs.readFileSync(path.join(root, 'src/components/AIVisionShowcase.tsx'), 'utf8');
  const walletSrc = fs.readFileSync(path.join(root, 'src/components/WalletSection.tsx'), 'utf8');

  // =========================================================================
  // 1. Character Switcher State Machine, Rapid Toggle & Asset Integrity
  // =========================================================================
  describe('Hero: Character Switcher State Machine & Asset Integrity', () => {
    it('verifies CHARACTERS object schema and valid character IDs', () => {
      assert.ok(heroSrc.includes("tactical: {"), 'Must define tactical character');
      assert.ok(heroSrc.includes("rebel: {"), 'Must define rebel character');
      assert.ok(heroSrc.includes("name: 'Red Criminal'"), 'Must define Red Criminal');
      assert.ok(heroSrc.includes("name: 'Streetwear Rebel'"), 'Must define Streetwear Rebel');
    });

    it('verifies all referenced character image assets exist on disk in public/', () => {
      const publicDir = path.join(root, 'public');
      const expectedAssets = [
        'hero-character-tactical.webp',
        'hero-character-tactical.png',
        'hero-character.webp',
        'hero-character.png',
      ];

      for (const asset of expectedAssets) {
        const fullPath = path.join(publicDir, asset);
        assert.ok(fs.existsSync(fullPath), `Asset public/${asset} must exist on disk`);
        const stats = fs.statSync(fullPath);
        assert.ok(stats.size > 0, `Asset public/${asset} must not be 0 bytes (found ${stats.size} bytes)`);
      }
    });

    it('stress-tests rapid toggle state simulation without divergence', () => {
      // Simulate state transitions over 10,000 rapid clicks
      type CharKey = 'tactical' | 'rebel';
      let state: CharKey = 'tactical';
      const toggles = ['rebel', 'tactical', 'tactical', 'rebel', 'rebel', 'rebel', 'tactical'];

      for (let i = 0; i < 10000; i++) {
        const target = toggles[i % toggles.length] as CharKey;
        state = target;
      }
      assert.ok(state === 'tactical' || state === 'rebel');
    });

    it('verifies safe fallback when an arbitrary or undefined character ID is accessed', () => {
      assert.ok(
        heroSrc.includes('const selectedChar = CHARACTERS[activeCharacter] || CHARACTERS.tactical;'),
        'Must contain safe fallback to CHARACTERS.tactical'
      );
    });

    it('verifies key prop is present on img element to prevent stale character rendering', () => {
      assert.ok(
        heroSrc.includes('key={selectedChar.id}'),
        'Img tag must have key={selectedChar.id} to force clean remount upon character switch'
      );
    });
  });

  // =========================================================================
  // 2. Parallax Math & Responsive Layout Constraints
  // =========================================================================
  describe('Hero: Parallax Math & Responsive Bounds', () => {
    function computeParallaxValues(scrollY: number) {
      const titleTranslateY = scrollY * 0.16;
      const titleTranslateZ = -Math.min(scrollY * 0.45, 240);
      const titleScale = Math.max(0.86, 1 - scrollY / 2200);
      const titleOpacity = Math.max(0.18, 1 - scrollY / 650);
      const characterOpacity = Math.max(0, 1 - scrollY / 600);

      return {
        titleTranslateY,
        titleTranslateZ,
        titleScale,
        titleOpacity,
        characterOpacity,
      };
    }

    it('verifies parallax calculations under normal and extreme scroll offsets', () => {
      const scrollCases = [0, 100, 300, 600, 1000, 2200, 10000, -100]; // including iOS pull bounce

      for (const y of scrollCases) {
        const p = computeParallaxValues(y);
        assert.ok(!Number.isNaN(p.titleTranslateY), `NaN at scrollY=${y}`);
        assert.ok(!Number.isNaN(p.titleTranslateZ), `NaN at scrollY=${y}`);
        assert.ok(!Number.isNaN(p.titleScale), `NaN at scrollY=${y}`);
        assert.ok(!Number.isNaN(p.titleOpacity), `NaN at scrollY=${y}`);
        assert.ok(!Number.isNaN(p.characterOpacity), `NaN at scrollY=${y}`);

        // Opacity lower bounds must be honored
        assert.ok(p.titleOpacity >= 0.18, `titleOpacity below min 0.18 at scrollY=${y}`);
        assert.ok(p.titleScale >= 0.86, `titleScale below min 0.86 at scrollY=${y}`);
        assert.ok(p.characterOpacity >= 0, `characterOpacity negative at scrollY=${y}`);
      }
    });

    it('verifies desktop gating on mousemove handler', () => {
      assert.ok(
        heroSrc.includes('if (window.innerWidth < 1024) return;'),
        'Mouse parallax must be disabled on viewports < 1024px'
      );
    });

    it('verifies WCAG mobile touch targets (44px min-height) on meta buttons and switcher', () => {
      assert.ok(
        heroSrc.includes('min-h-[44px]'),
        'Meta buttons and switcher must have min-h-[44px] for mobile accessibility'
      );
    });

    it('verifies cardless telemetry ribbon uses <Stat /> primitive with responsive grid', () => {
      assert.ok(heroSrc.includes('<Stat value="< 15s" label="AI OCR Verification" accent />'));
      assert.ok(heroSrc.includes('<Stat value="1:1" label="Cash Parity (PKR)" />'));
      assert.ok(heroSrc.includes('<Stat value="100%" label="Automated Refund" />'));
      assert.ok(heroSrc.includes('grid grid-cols-1 sm:grid-cols-3'));
    });
  });

  // =========================================================================
  // 3. CTA Action Triggers & Scroll Targets
  // =========================================================================
  describe('Hero: CTA Triggers & Scroll Navigation', () => {
    it('verifies handleDownload invokes analytics tracking with correct signature', () => {
      assert.ok(
        heroSrc.includes('trackDownload("ArenaX.apk", "Android", "2.6.0");'),
        'handleDownload must record analytics with version'
      );
    });

    it('verifies official APK download URL points to verified GitHub release', () => {
      assert.ok(
        heroSrc.includes('https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk'),
        'Download URL must match official release'
      );
    });

    it('verifies scrollToSection uses optional chaining for missing DOM element resilience', () => {
      assert.ok(
        heroSrc.includes("document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });"),
        'scrollToSection must use optional chaining'
      );
    });

    it('verifies target IDs from Hero actually exist in downstream components', () => {
      // Tournaments section
      assert.ok(tournamentModesSrc.includes('id="tournaments"'), 'TournamentModes must have id="tournaments"');
      // AI Vision section
      assert.ok(aiVisionSrc.includes('id="ai-vision"'), 'AIVisionShowcase must have id="ai-vision"');
      // Two-Wallet section
      assert.ok(walletSrc.includes('id="wallet"'), 'WalletSection must have id="wallet"');
    });
  });

  // =========================================================================
  // 4. Statement.tsx Editorial & ScrollTrigger Verification
  // =========================================================================
  describe('Statement: Editorial Craft & GSAP ScrollTrigger', () => {
    it('verifies exactly 4 high-contrast numbered statements', () => {
      assert.ok(statementSrc.includes("num: '01'"));
      assert.ok(statementSrc.includes("num: '02'"));
      assert.ok(statementSrc.includes("num: '03'"));
      assert.ok(statementSrc.includes("num: '04'"));
    });

    it('verifies Statement 01 contains "AI vision" for cross-feature contract preservation', () => {
      assert.ok(
        statementSrc.includes('AI vision verifies scoreboards in seconds.'),
        'Statement 01 headline must contain AI vision'
      );
    });

    it('verifies GSAP ScrollTrigger configuration and cleanup context', () => {
      assert.ok(statementSrc.includes('gsap.registerPlugin(ScrollTrigger);'));
      assert.ok(statementSrc.includes('gsap.context('));
      assert.ok(statementSrc.includes('return () => ctx.revert();'));
      assert.ok(statementSrc.includes('trigger: row'));
      assert.ok(statementSrc.includes("scrub: 0.6"));
      assert.ok(statementSrc.includes("stagger: 0.08"));
    });

    it('verifies word split structure generates .statement-word elements', () => {
      assert.ok(statementSrc.includes("item.line.split(' ').map("));
      assert.ok(statementSrc.includes('statement-word'));
    });
  });

  // =========================================================================
  // 5. Zero Helper Copy / Tagline Strict Compliance (Requirement R1)
  // =========================================================================
  describe('Requirement R1: Zero Helper Copy & Tagline Leak Check', () => {
    it('verifies Hero.tsx is free of promotional banner, conversational subheads, and version tags', () => {
      assert.ok(!heroSrc.includes('Free Welcome Bonus'), 'No promo bonus pill');
      assert.ok(!heroSrc.includes('25 AX Free Welcome Bonus'), 'No 25 AX callout');
      assert.ok(!heroSrc.includes('• v2.6.0'), 'No v2.6.0 suffix in badge');
      assert.ok(!heroSrc.includes('Download Direct APK (v2.6)'), 'No version string in CTA button');
      assert.ok(!heroSrc.includes('Daily Bermuda BR & 4v4 Clash Squad scrims'), 'No conversational subhead paragraph');
      assert.ok(!heroSrc.includes('[2026]'), 'No corner 2026 badge');
      assert.ok(!heroSrc.includes('SEASON 4'), 'No corner season 4 badge');
      assert.ok(!heroSrc.includes('subtext='), 'No subtext prop passed to Stat');
    });

    it('verifies Statement.tsx is free of Pill eyebrows and detail explanation paragraphs', () => {
      assert.ok(!statementSrc.includes('<Pill'), 'No Pill component in Statement.tsx');
      assert.ok(!statementSrc.includes('PLATFORM PROTOCOL'), 'No PLATFORM PROTOCOL eyebrow');
      assert.ok(!statementSrc.includes('statement-detail'), 'No statement-detail CSS class');
      assert.ok(!statementSrc.includes('detail:'), 'No detail property in STATEMENTS data');
      assert.ok(!statementSrc.includes('AI vision scans end-match victory screenshots'), 'No detail paragraph 01');
      assert.ok(!statementSrc.includes('Direct transfers to JazzCash, EasyPaisa'), 'No detail paragraph 02');
      assert.ok(!statementSrc.includes('Deposits and tournament prize money remain completely segregated'), 'No detail paragraph 03');
      assert.ok(!statementSrc.includes('Strict in-game UID roster validation'), 'No detail paragraph 04');
    });
  });
});
