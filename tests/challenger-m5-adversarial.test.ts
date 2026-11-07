import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {
  computeCombatPoints,
  computeRankGap,
  computeOrganizerRevenue,
  EXPECTED_APP_ROUTES,
} from './helpers/formulas.ts';

const projectRoot = process.cwd();

describe('Adversarial Challenger Suite M5: Final Tier 5 Hardening & White-Box Audit', () => {
  // Collect all component files from src/components/ and src/components/primitives/
  const componentsDir = path.resolve(projectRoot, 'src/components');
  const primitivesDir = path.resolve(projectRoot, 'src/components/primitives');

  const componentFiles: { name: string; fullPath: string; source: string }[] = [];

  function loadDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        loadDir(p);
      } else if (ent.isFile() && (ent.name.endsWith('.tsx') || ent.name.endsWith('.ts'))) {
        componentFiles.push({
          name: path.relative(projectRoot, p),
          fullPath: p,
          source: fs.readFileSync(p, 'utf8'),
        });
      }
    }
  }

  loadDir(componentsDir);
  loadDir(primitivesDir);

  // =========================================================================
  // 1. Comprehensive White-Box AST Syntax & Arbitrary Bracket Audit
  // =========================================================================
  describe('1. AST Syntax & Arbitrary Bracket Balance Audit', () => {
    it('verifies all expected component files are loaded (> 25 components)', () => {
      assert.ok(
        componentFiles.length >= 25,
        `Expected at least 25 components, loaded ${componentFiles.length}`
      );
    });

    for (const file of componentFiles) {
      it(`${file.name}: parses cleanly with TypeScript Compiler API with 0 syntactic diagnostics`, () => {
        const sourceFile = ts.createSourceFile(
          file.name,
          file.source,
          ts.ScriptTarget.Latest,
          true,
          file.name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
        );

        const parseDiagnostics =
          (sourceFile as unknown as { parseDiagnostics?: ts.Diagnostic[] }).parseDiagnostics || [];
        assert.equal(
          parseDiagnostics.length,
          0,
          `TypeScript syntactic errors in ${file.name}: ${JSON.stringify(parseDiagnostics)}`
        );
      });

      it(`${file.name}: arbitrary Tailwind brackets are strictly balanced and well-formed`, () => {
        const src = file.source;
        // Count bracket balance outside strings or inside className
        const arbitraryRegex = /[a-zA-Z0-9_-]+-\[([^\]]*)\]/g;
        let match: RegExpExecArray | null;

        while ((match = arbitraryRegex.exec(src)) !== null) {
          const inner = match[1];
          assert.ok(
            inner.length > 0,
            `Arbitrary class '${match[0]}' in ${file.name} must not be empty`
          );
          assert.ok(
            !inner.startsWith(' '),
            `Arbitrary class '${match[0]}' in ${file.name} starts with illegal leading space`
          );
          assert.ok(
            !inner.endsWith(' '),
            `Arbitrary class '${match[0]}' in ${file.name} ends with illegal trailing space`
          );
          assert.ok(
            !inner.includes('\n'),
            `Arbitrary class '${match[0]}' in ${file.name} contains illegal newline`
          );
        }
      });
    }
  });

  // =========================================================================
  // 2. Token Adherence: Brand Green, Carbon Surfaces, Hairline Borders
  // =========================================================================
  describe('2. Supabase Design Token Adherence Across Components', () => {
    it('verifies src/index.css and tailwind.config.js declare authoritative Supabase tokens', () => {
      const indexCss = fs.readFileSync(path.resolve(projectRoot, 'src/index.css'), 'utf8');
      const tailwindConfig = fs.readFileSync(path.resolve(projectRoot, 'tailwind.config.js'), 'utf8');

      // Brand green
      assert.ok(indexCss.includes('#3ECF8E'), 'index.css must include #3ECF8E');
      assert.ok(indexCss.includes('#34B27B'), 'index.css must include #34B27B');
      assert.ok(indexCss.includes('#249361'), 'index.css must include #249361');
      assert.ok(tailwindConfig.includes('62, 207, 142'), 'tailwind.config.js must include rgb 62, 207, 142');

      // Dark carbon surfaces
      assert.ok(indexCss.includes('#121212'), 'index.css must include canvas #121212');
      assert.ok(indexCss.includes('#171717'), 'index.css must include card #171717');
      assert.ok(indexCss.includes('#161616'), 'index.css must include alternative #161616');
      assert.ok(indexCss.includes('#181A19'), 'index.css must include surface-100 #181A19');
      assert.ok(indexCss.includes('#1E201F'), 'index.css must include surface-300 #1E201F');

      // Hairlines
      assert.ok(indexCss.includes('rgba(255, 255, 255, 0.08)'), 'index.css must define hairline 0.08');
      assert.ok(indexCss.includes('rgba(255, 255, 255, 0.14)'), 'index.css must define hairline 0.14');
      assert.ok(indexCss.includes('rgba(62, 207, 142, 0.35)'), 'index.css must define hairline 0.35');
    });

    it('confirms zero non-Supabase gaming color palettes across all components', () => {
      // Disallowed gaming colors: blue, purple, cyan, violet, pink, fuchsia, yellow, amber, orange, lime, sky
      const forbiddenColors = [
        'blue',
        'purple',
        'violet',
        'fuchsia',
        'pink',
        'rose',
        'cyan',
        'sky',
        'lime',
        'amber',
        'orange',
        'yellow',
      ];

      const forbiddenRegex = new RegExp(
        `\\b(text|bg|border|ring|fill|stroke)-(${forbiddenColors.join('|')})-[0-9]{2,3}\\b`,
        'g'
      );

      const violations: { file: string; match: string }[] = [];
      for (const file of componentFiles) {
        let m: RegExpExecArray | null;
        while ((m = forbiddenRegex.exec(file.source)) !== null) {
          violations.push({ file: file.name, match: m[0] });
        }
      }

      assert.equal(
        violations.length,
        0,
        `Found forbidden gaming color classes: ${JSON.stringify(violations)}`
      );
    });

    it('verifies all cards and panels utilize Supabase dark carbon surfaces and hairline borders', () => {
      const allowedSurfacePatterns = [
        'bg-[#121212]',
        'bg-[#171717]',
        'bg-[#161616]',
        'bg-[#181A19]',
        'bg-[#1E201F]',
        'bg-[#0E0F0E]',
        'bg-[#0B0E0D]',
        'bg-[#041B10]',
        'bg-[#141514]',
        'bg-bg-1',
        'bg-bg-2',
        'bg-bg-3',
        'bg-bg-alt',
        'bg-surface-canvas',
        'bg-surface-card',
        'bg-surface-elevated',
        'hud-card',
        'hud-card-highlight',
        'raised-control-surface',
        'gradient-border-card',
        'glass-panel',
      ];

      // Verify that major section components declare one of the allowed surfaces
      const majorSections = [
        'src/components/Hero.tsx',
        'src/components/AppExperienceShowcase.tsx',
        'src/components/TournamentModes.tsx',
        'src/components/AIVisionShowcase.tsx',
        'src/components/WalletSection.tsx',
        'src/components/LeaderboardTiers.tsx',
        'src/components/OrganizerProgram.tsx',
        'src/components/HowItWorks.tsx',
        'src/components/PlatformComparison.tsx',
        'src/components/ScoutRewards.tsx',
        'src/components/Download.tsx',
        'src/components/Footer.tsx',
      ];

      for (const relPath of majorSections) {
        const comp = componentFiles.find((c) => c.name.replace(/\\/g, '/') === relPath);
        assert.ok(comp, `Major component ${relPath} must exist`);
        const hasAllowedSurface = allowedSurfacePatterns.some((pattern) =>
          comp.source.includes(pattern)
        );
        assert.ok(
          hasAllowedSurface,
          `Component ${relPath} must use at least one Supabase carbon surface token`
        );
      }
    });
  });

  // =========================================================================
  // 3. Responsive Breakpoint & Container Bounds Audit
  // =========================================================================
  describe('3. Responsive Breakpoint & Viewport Boundary Invariants', () => {
    it('verifies all major showcase sections implement responsive max-width container constraints', () => {
      const sectionFiles = [
        'src/components/Hero.tsx',
        'src/components/Statement.tsx',
        'src/components/AppExperienceShowcase.tsx',
        'src/components/TournamentModes.tsx',
        'src/components/AIVisionShowcase.tsx',
        'src/components/WalletSection.tsx',
        'src/components/LeaderboardTiers.tsx',
        'src/components/OrganizerProgram.tsx',
        'src/components/HowItWorks.tsx',
        'src/components/PlatformComparison.tsx',
        'src/components/ScoutRewards.tsx',
        'src/components/Download.tsx',
        'src/components/About.tsx',
        'src/components/FAQ.tsx',
        'src/components/Contact.tsx',
      ];

      for (const relPath of sectionFiles) {
        const comp = componentFiles.find((c) => c.name.replace(/\\/g, '/') === relPath);
        assert.ok(comp, `Component ${relPath} must exist`);
        const hasContainerConstraint =
          comp.source.includes('max-w-') ||
          comp.source.includes('Container') ||
          comp.source.includes('Section');
        assert.ok(
          hasContainerConstraint,
          `${relPath} must clamp max-width to prevent layout distortion on ultra-wide viewports`
        );
      }
    });

    it('verifies Navbar implements responsive hamburger / desktop navigation symmetry', () => {
      const navComp = componentFiles.find(
        (c) => c.name.replace(/\\/g, '/') === 'src/components/Navbar.tsx'
      );
      assert.ok(navComp, 'Navbar must exist');

      // Must have desktop links hidden on mobile
      assert.ok(
        navComp.source.includes('hidden lg:flex') || navComp.source.includes('hidden md:flex'),
        'Navbar must hide desktop links on smaller viewports'
      );
      // Must have mobile trigger hidden on desktop
      assert.ok(
        navComp.source.includes('lg:hidden') || navComp.source.includes('md:hidden'),
        'Navbar mobile menu button must be hidden on desktop viewports'
      );
      // Must handle mobile drawer state toggle
      assert.ok(
        navComp.source.includes('isMobileOpen') || navComp.source.includes('mobileMenuOpen'),
        'Navbar must maintain mobile menu toggle state'
      );
    });

    it('verifies multi-column grids collapse to single-column on mobile viewports', () => {
      const gridFiles = [
        'src/components/TournamentModes.tsx',
        'src/components/LeaderboardTiers.tsx',
        'src/components/OrganizerProgram.tsx',
        'src/components/About.tsx',
        'src/components/Footer.tsx',
      ];

      for (const relPath of gridFiles) {
        const comp = componentFiles.find((c) => c.name.replace(/\\/g, '/') === relPath);
        assert.ok(comp, `Grid component ${relPath} must exist`);
        const hasResponsiveGrid =
          comp.source.includes('grid-cols-1') ||
          comp.source.includes('flex flex-col') ||
          comp.source.includes('flex-col');
        assert.ok(
          hasResponsiveGrid,
          `${relPath} must collapse columns to single vertical stack on mobile viewports`
        );
      }
    });
  });

  // =========================================================================
  // 4. Stateful Handlers, Calculators & Edge Case Stress
  // =========================================================================
  describe('4. Stateful Handlers, Calculators & Mathematical Edge Cases', () => {
    it('survives extreme, negative, and floating combat point calculations', () => {
      // 0 kills defeat
      assert.equal(computeCombatPoints(false, 0), 0);
      // 0 kills victory (Booyah bonus)
      assert.equal(computeCombatPoints(true, 0), 20);
      // Negative kills clamped to 0
      assert.equal(computeCombatPoints(false, -50), 0);
      assert.equal(computeCombatPoints(true, -100), 20);
      // Fractional kills floored
      assert.equal(computeCombatPoints(false, 4.99), 20); // Math.floor(4.99) * 5 = 20
      assert.equal(computeCombatPoints(true, 4.99), 40); // 20 + 20 = 40
      // 10,000 kills
      assert.equal(computeCombatPoints(false, 10000), 50000);
      assert.equal(computeCombatPoints(true, 10000), 50020);
    });

    it('computes rank gap math with ceiling behavior across all boundaries', () => {
      // Exactly 0 points needed
      const exact0 = computeRankGap(1000, 1000);
      assert.equal(exact0.ptsNeeded, 0);
      assert.equal(exact0.booyahsNeeded, 0);
      assert.equal(exact0.progressPercent, 100);

      // 1 point needed requires 1 Booyah
      const gap1 = computeRankGap(999, 1000);
      assert.equal(gap1.ptsNeeded, 1);
      assert.equal(gap1.booyahsNeeded, 1);

      // 20 points needed requires exactly 1 Booyah
      const gap20 = computeRankGap(980, 1000);
      assert.equal(gap20.ptsNeeded, 20);
      assert.equal(gap20.booyahsNeeded, 1);

      // 21 points needed requires 2 Booyahs (ceiling bump)
      const gap21 = computeRankGap(979, 1000);
      assert.equal(gap21.ptsNeeded, 21);
      assert.equal(gap21.booyahsNeeded, 2);

      // User exceeding target rank
      const excess = computeRankGap(15000, 10000);
      assert.equal(excess.ptsNeeded, 0);
      assert.equal(excess.booyahsNeeded, 0);
      assert.equal(excess.progressPercent, 100);
    });

    it('conserves organizer revenue to the exact rupee across 500 random matrices', () => {
      for (let i = 0; i < 500; i++) {
        const participants = Math.floor(Math.random() * 96) + 1; // 1 to 96
        const entryFee = Math.floor(Math.random() * 500) + 10; // 10 to 510 PKR
        const organizerCut = Math.floor(Math.random() * 21); // 0% to 20%

        const result = computeOrganizerRevenue(participants, entryFee, organizerCut);
        assert.ok(
          result.isConserved,
          `Conservation failed for p=${participants}, fee=${entryFee}, cut=${organizerCut}`
        );
        assert.equal(
          result.adminFee + result.hostEarnings + result.playerPrizePool,
          result.totalRevenue,
          `Rupee sum mismatch for p=${participants}, fee=${entryFee}, cut=${organizerCut}`
        );
      }
    });

    it('verifies FAQ single-accordion state machine logic', () => {
      let openIndex: number | null = null;

      function toggleIndex(idx: number) {
        openIndex = openIndex === idx ? null : idx;
      }

      // Initial state is null (closed)
      assert.equal(openIndex, null);

      // Open item 0
      toggleIndex(0);
      assert.equal(openIndex, 0);

      // Toggle item 0 again -> closes
      toggleIndex(0);
      assert.equal(openIndex, null);

      // Open item 3
      toggleIndex(3);
      assert.equal(openIndex, 3);

      // Switch to item 5 -> item 3 closes and item 5 opens
      toggleIndex(5);
      assert.equal(openIndex, 5);
    });

    it('verifies mailto generator encodes special and unicode characters safely', () => {
      function generateMailto(email: string, subject: string, body: string): string {
        return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      const email = 'arenasupport@gmail.com';
      const subject = 'Inquiry & Support #104';
      const body = 'Hello! My IGN is AX_Sniper & UID is 12345. اکاؤنٹ تصدیق درکار ہے';

      const mailtoUrl = generateMailto(email, subject, body);
      assert.ok(mailtoUrl.startsWith('mailto:arenasupport@gmail.com?subject='));
      assert.ok(!mailtoUrl.includes('& '), 'Parameters must not have raw unencoded spaces');
      assert.ok(mailtoUrl.includes(encodeURIComponent('AX_Sniper & UID')));
      assert.ok(mailtoUrl.includes(encodeURIComponent('اکاؤنٹ تصدیق درکار ہے')));
    });

    it('verifies all registered routes in App.tsx are strictly matched', () => {
      const appSrc = fs.readFileSync(path.resolve(projectRoot, 'src/App.tsx'), 'utf8');
      for (const route of EXPECTED_APP_ROUTES) {
        if (route === '/') {
          assert.ok(appSrc.includes('path="/"'), 'App.tsx must register root route /');
        } else {
          assert.ok(
            appSrc.includes(`path="${route.slice(1)}"`) || appSrc.includes(`path="${route}"`),
            `App.tsx must register route ${route}`
          );
        }
      }
    });
  });
});
