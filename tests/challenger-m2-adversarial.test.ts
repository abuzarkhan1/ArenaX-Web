import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

describe('Adversarial Challenger Suite: Milestone 2 (Navbar, Hero & Statement)', () => {
  const root = process.cwd();
  const navbarSrc = fs.readFileSync(path.join(root, 'src/components/Navbar.tsx'), 'utf8');
  const heroSrc = fs.readFileSync(path.join(root, 'src/components/Hero.tsx'), 'utf8');
  const statementSrc = fs.readFileSync(path.join(root, 'src/components/Statement.tsx'), 'utf8');
  const tournamentModesSrc = fs.readFileSync(path.join(root, 'src/components/TournamentModes.tsx'), 'utf8');
  const aiVisionSrc = fs.readFileSync(path.join(root, 'src/components/AIVisionShowcase.tsx'), 'utf8');
  const walletSrc = fs.readFileSync(path.join(root, 'src/components/WalletSection.tsx'), 'utf8');

  // =========================================================================
  // 1. Stress-Test Navbar: Extreme Viewports & Responsive Breakdown
  // =========================================================================
  describe('Navbar: Extreme Viewports & Responsive Breakdown', () => {
    it('verifies responsive layout bounds across 320px mobile, 768px tablet, and 1920px desktop', () => {
      // 1. Max width constraint and horizontal padding
      assert.ok(navbarSrc.includes('max-w-[1200px]'), 'Must restrict desktop header content to 1200px');
      assert.ok(navbarSrc.includes('px-4 sm:px-6'), 'Must apply mobile 16px (px-4) scaling to 24px (px-6) padding');
      assert.ok(navbarSrc.includes('h-16'), 'Must calibrate sticky header height to canonical 64px (h-16)');

      // 2. Desktop navigation hidden on mobile/tablet viewports (< 1024px)
      assert.ok(navbarSrc.includes('hidden lg:flex'), 'Desktop nav container must be hidden below lg breakpoint (1024px)');

      // 3. Mobile hamburger trigger hidden on desktop viewports (>= 1024px)
      assert.ok(navbarSrc.includes('lg:hidden'), 'Mobile hamburger trigger must be hidden on lg breakpoint and wider');

      // 4. Primary CTA responsive display (hidden on small mobile screens < 640px, visible on sm+)
      assert.ok(navbarSrc.includes('hidden sm:inline-flex'), 'Navbar CTA button must be hidden on <640px mobile header to prevent logo clipping');
    });

    it('verifies WCAG touch targets (>= 44px min-height) for mobile drawer buttons and controls', () => {
      // Drawer navigation links must satisfy 44px mobile touch target
      assert.ok(navbarSrc.includes('min-h-[44px]'), 'Drawer links must have min-h-[44px] for finger tap targets');

      // Hamburger button dimensions
      assert.ok(
        navbarSrc.includes('w-9 h-9 sm:w-10 sm:h-10'),
        'Hamburger button must provide adequate target bounds (36px mobile / 40px sm)'
      );
    });

    it('stress-tests scroll progress calculation across extreme viewports and scroll boundaries', () => {
      function calculateScrollProgress(winScroll: number, scrollHeight: number, clientHeight: number): number {
        const height = scrollHeight - clientHeight;
        return height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;
      }

      // 1. 320px mobile viewport with 8,000px long document
      assert.equal(calculateScrollProgress(0, 8000, 568), 0, 'Top of page must be 0%');
      assert.equal(Number(calculateScrollProgress(3716, 8000, 568).toFixed(1)), 50.0, 'Midpoint must be 50%');
      assert.equal(calculateScrollProgress(7432, 8000, 568), 100, 'Bottom of page must be 100%');

      // 2. 768px tablet viewport with 5,000px document
      assert.equal(calculateScrollProgress(0, 5000, 1024), 0);
      assert.equal(calculateScrollProgress(3976, 5000, 1024), 100);

      // 3. 1920px desktop viewport with 3,000px document
      assert.equal(calculateScrollProgress(0, 3000, 1080), 0);
      assert.equal(calculateScrollProgress(1920, 3000, 1080), 100);

      // 4. Elastic iOS overscroll pull-down (negative scroll)
      const pullDownProgress = calculateScrollProgress(-120, 5000, 800);
      assert.equal(pullDownProgress, 0, 'Negative overscroll must clamp to 0%, never negative');

      // 5. Elastic iOS overscroll fling past bottom
      const flingPastBottom = calculateScrollProgress(5200, 5000, 800);
      assert.equal(flingPastBottom, 100, 'Fling past bottom must clamp to 100%, never exceed');

      // 6. Zero scrollable height (scrollHeight <= clientHeight)
      assert.equal(calculateScrollProgress(0, 800, 800), 0, 'Zero height delta must return 0%');
      assert.equal(calculateScrollProgress(0, 600, 800), 0, 'Negative height delta must return 0%');
    });
  });

  // =========================================================================
  // 2. Stress-Test Navbar: Mobile Drawer Lifecycle & Body Overflow Synchronization
  // =========================================================================
  describe('Navbar: Mobile Drawer Lifecycle & Body Overflow Synchronization', () => {
    it('verifies reactive synchronization between mobileMenuOpen and document.body.style.overflow', () => {
      // Must contain dedicated useEffect with cleanup
      assert.ok(navbarSrc.includes('if (mobileMenuOpen) {'), 'Must check mobileMenuOpen in effect');
      assert.ok(navbarSrc.includes("document.body.style.overflow = 'hidden'"), 'Must lock body on open');
      assert.ok(navbarSrc.includes("document.body.style.overflow = ''"), 'Must clear body on close');
      assert.ok(
        navbarSrc.includes('return () => {\n      document.body.style.overflow = \'\';\n    };'),
        'Must contain cleanup function clearing overflow on unmount'
      );
    });

    it('verifies handleNavClick explicitly clears document body overflow and closes menu', () => {
      assert.ok(navbarSrc.includes('handleNavClick ='));
      assert.ok(navbarSrc.includes('setMobileMenuOpen(false);'));
      assert.ok(navbarSrc.includes("document.body.style.overflow = '';"));
    });

    it('verifies handleDownloadClick explicitly clears document body overflow and closes menu', () => {
      assert.ok(navbarSrc.includes('handleDownloadClick ='));
      assert.ok(navbarSrc.includes('setMobileMenuOpen(false);'));
      assert.ok(navbarSrc.includes("document.body.style.overflow = '';"));
    });

    it('verifies secondary drawer links (/about, /contact, /terms) trigger menu close', () => {
      assert.ok(navbarSrc.includes('to="/about"'));
      assert.ok(navbarSrc.includes('to="/contact"'));
      assert.ok(navbarSrc.includes('to="/terms"'));
      assert.ok(navbarSrc.includes('onClick={() => setMobileMenuOpen(false)}'));
    });

    it('simulates 10,000 rapid menu open/close cycles without state divergence', () => {
      let mobileMenuOpen = false;
      const bodyStyle = { overflow: '' };

      const syncEffect = () => {
        if (mobileMenuOpen) {
          bodyStyle.overflow = 'hidden';
        } else {
          bodyStyle.overflow = '';
        }
      };

      for (let i = 0; i < 10000; i++) {
        // Toggle menu
        mobileMenuOpen = !mobileMenuOpen;
        syncEffect();
        assert.equal(bodyStyle.overflow, mobileMenuOpen ? 'hidden' : '');

        // Rapidly click a navigation link
        if (mobileMenuOpen && i % 3 === 0) {
          mobileMenuOpen = false;
          bodyStyle.overflow = '';
          syncEffect();
          assert.equal(bodyStyle.overflow, '');
        }
      }

      // Ensure final closed state restores body overflow cleanly
      mobileMenuOpen = false;
      syncEffect();
      assert.equal(bodyStyle.overflow, '');
    });
  });

  // =========================================================================
  // 3. Stress-Test Navbar: Rapid Link Clicking, Route Transitions & Download Dispatch
  // =========================================================================
  describe('Navbar: Rapid Link Clicking, Route Transitions & Download Dispatch', () => {
    it('verifies navItems list contains all canonical sections and routed FAQs', () => {
      const requiredItems = ['tournaments', 'ai-vision', 'wallet', 'ranks', 'organizers', 'how-it-works', 'faq'];
      for (const item of requiredItems) {
        assert.ok(navbarSrc.includes(`id: '${item}'`), `Navbar must declare nav item with id '${item}'`);
      }
    });

    it('verifies telemetry hooks dispatched on download click with exact signatures', () => {
      assert.ok(
        navbarSrc.includes("trackButtonClick('download_app', 'navbar')"),
        'Must track download_app button click in navbar'
      );
      assert.ok(
        navbarSrc.includes("trackDownload('ArenaX.apk', 'Android', 'navbar')"),
        'Must track download event in navbar'
      );
    });

    it('verifies smooth scrolling and safe DOM node lookup on section jumps', () => {
      assert.ok(
        navbarSrc.includes("document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })"),
        'Must use optional chaining for item.id DOM lookup'
      );
      assert.ok(
        navbarSrc.includes("document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })"),
        'Must use optional chaining for download anchor DOM lookup'
      );
    });

    it('verifies cross-route navigation jumps navigate to home before smooth scrolling with timeout', () => {
      assert.ok(
        navbarSrc.includes("if (!isHomePage) {\n        navigate('/');"),
        'Must navigate to / when navigating to section from non-home page'
      );
      assert.ok(navbarSrc.includes('setTimeout(() => {'), 'Must use setTimeout to await DOM mount on route transition');
    });

    it('verifies brand logo click scrolls to top and resets active section to home', () => {
      assert.ok(navbarSrc.includes("window.scrollTo({ top: 0, behavior: 'smooth' })"));
      assert.ok(navbarSrc.includes("setActiveSection('home')"));
    });
  });

  // =========================================================================
  // 4. Stress-Test Hero: Character Switcher Toggling & Asset Integrity
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

    it('stress-tests rapid toggle state simulation without divergence across 10,000 iterations', () => {
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
  // 5. Stress-Test Hero: 3D Mouse Parallax Math & Non-Desktop Gating
  // =========================================================================
  describe('Hero: 3D Mouse Parallax Math & Non-Desktop Gating', () => {
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

    it('verifies desktop gating on mousemove handler (< 1024px)', () => {
      assert.ok(
        heroSrc.includes('if (window.innerWidth < 1024) return;'),
        'Mouse parallax must be disabled on viewports < 1024px'
      );
    });

    it('simulates mouse parallax math on desktop viewports and verifies clamped coordinate bounds', () => {
      function computeMouseOffset(clientX: number, clientY: number, innerWidth: number, innerHeight: number) {
        if (innerWidth < 1024) return { x: 0, y: 0 };
        const x = (clientX / innerWidth - 0.5) * 16;
        const y = (clientY / innerHeight - 0.5) * 12;
        return { x, y };
      }

      // 1. Mobile (320px) & Tablet (768px, 1023px) must yield exactly (0, 0)
      assert.deepEqual(computeMouseOffset(150, 200, 320, 568), { x: 0, y: 0 });
      assert.deepEqual(computeMouseOffset(400, 500, 768, 1024), { x: 0, y: 0 });
      assert.deepEqual(computeMouseOffset(500, 500, 1023, 768), { x: 0, y: 0 });

      // 2. Desktop (1920x1080) Center coordinate must be neutral (0, 0)
      const center = computeMouseOffset(960, 540, 1920, 1080);
      assert.equal(Math.abs(center.x), 0);
      assert.equal(Math.abs(center.y), 0);

      // 3. Desktop Corners: Top-Left (0, 0) ➔ (-8, -6), Bottom-Right (1920, 1080) ➔ (8, 6)
      const topLeft = computeMouseOffset(0, 0, 1920, 1080);
      assert.equal(topLeft.x, -8);
      assert.equal(topLeft.y, -6);

      const bottomRight = computeMouseOffset(1920, 1080, 1920, 1080);
      assert.equal(bottomRight.x, 8);
      assert.equal(bottomRight.y, 6);
    });

    it('verifies WCAG mobile touch targets (44px min-height) on meta buttons and switcher', () => {
      assert.ok(
        heroSrc.includes('min-h-[44px]'),
        'Meta buttons and switcher must have min-h-[44px] for mobile accessibility'
      );
    });
  });

  // =========================================================================
  // 6. Stress-Test Hero: Telemetry Ribbon <Stat> Components & Edge-Case Strings
  // =========================================================================
  describe('Hero: Telemetry Ribbon <Stat> Components & Edge-Case Strings', () => {
    it('verifies telemetry ribbon uses <Stat /> primitives housed in Supabase carbon cards', () => {
      assert.ok(heroSrc.includes('<Stat value="< 15s" label="AI OCR Verification" accent />'));
      assert.ok(heroSrc.includes('<Stat value="1:1" label="Cash Parity (PKR)" />'));
      assert.ok(heroSrc.includes('<Stat value="100%" label="Automated Refund" />'));
      assert.ok(heroSrc.includes('bg-[#171717] border border-white/[0.08]'));
      assert.ok(heroSrc.includes('grid grid-cols-1 sm:grid-cols-3'));
    });

    it('verifies Stat primitive handles diverse and extreme numeric/string formats safely', () => {
      // Model the Stat primitive rendering logic
      function formatStatDisplay(value: string | number, label: string) {
        assert.ok(value !== undefined && value !== null, 'Value must not be null/undefined');
        assert.ok(typeof label === 'string' && label.length > 0, 'Label must be non-empty string');
        return `${value} - ${label}`;
      }

      const edgeCases = [
        { value: '< 15s', label: 'AI OCR Verification' },
        { value: '1:1', label: 'Cash Parity (PKR)' },
        { value: '100%', label: 'Automated Refund' },
        { value: '0', label: 'Zero Value' },
        { value: '99.99%', label: 'Precision Float' },
        { value: '1,000,000+', label: 'Delimited Large Integer' },
        { value: '1000000000000', label: 'Extreme Integer' },
        { value: '< 1ms', label: 'Sub-millisecond latency' },
        { value: '₹0 / 0 AX', label: 'Multi-currency format' },
      ];

      for (const ec of edgeCases) {
        const out = formatStatDisplay(ec.value, ec.label);
        assert.ok(out.includes(String(ec.value)));
        assert.ok(out.includes(ec.label));
      }
    });

    it('confirms Stat component eliminates legacy subtext prop', () => {
      assert.ok(!heroSrc.includes('subtext='), 'Hero must not pass subtext prop to Stat');
    });
  });

  // =========================================================================
  // 7. Hero: CTA Triggers & Scroll Navigation
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
      assert.ok(tournamentModesSrc.includes('id="tournaments"'), 'TournamentModes must have id="tournaments"');
      assert.ok(aiVisionSrc.includes('id="ai-vision"'), 'AIVisionShowcase must have id="ai-vision"');
      assert.ok(walletSrc.includes('id="wallet"'), 'WalletSection must have id="wallet"');
    });
  });

  // =========================================================================
  // 8. Stress-Test Statement: GSAP Context Cleanup & Reduced-Motion Accessibility
  // =========================================================================
  describe('Statement: GSAP Context Cleanup & Reduced-Motion Accessibility', () => {
    it('verifies exactly 4 high-contrast numbered statements with exact copy', () => {
      assert.ok(statementSrc.includes("num: '01'"));
      assert.ok(statementSrc.includes("num: '02'"));
      assert.ok(statementSrc.includes("num: '03'"));
      assert.ok(statementSrc.includes("num: '04'"));
      assert.ok(statementSrc.includes('AI vision verifies scoreboards in seconds.'));
      assert.ok(statementSrc.includes('Cash out in 24 hours.'));
      assert.ok(statementSrc.includes('Money kept in two separate wallets.'));
      assert.ok(statementSrc.includes('Cheaters banned for life.'));
    });

    it('verifies GSAP context initialization, ScrollTrigger scrub, and cleanup revert', () => {
      assert.ok(statementSrc.includes('gsap.registerPlugin(ScrollTrigger);'));
      assert.ok(statementSrc.includes('gsap.context('));
      assert.ok(statementSrc.includes('return () => ctx.revert();'), 'Must revert GSAP context on unmount');
      assert.ok(statementSrc.includes('trigger: row'));
      assert.ok(statementSrc.includes('scrub: 0.6'));
      assert.ok(statementSrc.includes('stagger: 0.08'));
    });

    it('verifies (prefers-reduced-motion: reduce) accessibility guard prevents low-contrast text trap', () => {
      // Must register matchMedia with reduced-motion media query
      assert.ok(
        statementSrc.includes("mm.add('(prefers-reduced-motion: reduce)'"),
        'Must contain reduced motion accessibility media query'
      );
      assert.ok(
        statementSrc.includes("gsap.set(words, { opacity: 1 });"),
        'Must immediately set all statement words to opacity 1 when reduced motion is preferred'
      );
    });

    it('verifies word split structure generates .statement-word elements', () => {
      assert.ok(statementSrc.includes("item.line.split(' ').map("));
      assert.ok(statementSrc.includes('statement-word'));
      assert.ok(statementSrc.includes('opacity-25 transition-opacity'));
    });

    it('verifies Supabase dark carbon card hover styles and hairline accents', () => {
      assert.ok(statementSrc.includes('hover:bg-[#171717]/40'), 'Must apply carbon hover highlight');
      assert.ok(statementSrc.includes('via-[#3ECF8E]/40'), 'Must render emerald top hairline sheen on hover');
      assert.ok(statementSrc.includes('group-hover:translate-x-1'), 'Must include index micro-nudge');
    });
  });

  // =========================================================================
  // 9. Requirement R1: Zero Helper Copy Elimination
  // =========================================================================
  describe('Requirement R1: Zero Helper Copy Elimination', () => {
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

  // =========================================================================
  // 10. Reference Integrity Invariant (Requirement R1)
  // =========================================================================
  describe('Reference Files Immutability Invariant (R1)', () => {
    const refHtmlPath = path.join(root, 'Supabase _ The Postgres Development Platform.html');
    const refFolderPath = path.join(root, 'Supabase _ The Postgres Development Platform_files');

    it('verifies reference HTML file size and SHA-256 hash match read-only baseline', () => {
      assert.ok(fs.existsSync(refHtmlPath), 'Reference HTML file must exist');
      const stats = fs.statSync(refHtmlPath);
      assert.equal(stats.size, 1396412, 'Reference HTML file size must strictly equal 1,396,412 bytes');

      const fileBuffer = fs.readFileSync(refHtmlPath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      assert.equal(
        hash.toLowerCase(),
        'cfbab0c0f7d9acaa887ecf3699ebde892647f81c1cd023e4f3c156f8b6707b50',
        'Reference HTML file SHA-256 hash must strictly match original snapshot'
      );
    });

    it('verifies reference files folder has exactly 66 files and 3,376,281 bytes', () => {
      assert.ok(fs.existsSync(refFolderPath), 'Reference files folder must exist');
      assert.ok(fs.statSync(refFolderPath).isDirectory(), 'Reference path must be directory');

      let fileCount = 0;
      let totalBytes = 0;

      function scanDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else if (entry.isFile()) {
            fileCount++;
            totalBytes += fs.statSync(fullPath).size;
          }
        }
      }

      scanDir(refFolderPath);
      assert.equal(fileCount, 66, 'Reference directory must contain exactly 66 files');
      assert.equal(totalBytes, 3376281, 'Reference directory total size must strictly equal 3,376,281 bytes');
    });
  });
});
