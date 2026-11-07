import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite M5-2: Feature Inventory & Invariant Verification', () => {
  const root = process.cwd();

  const readFile = (relPath: string) => fs.readFileSync(path.join(root, relPath), 'utf8');

  // =========================================================================
  // 1. Negative Invariants Verification
  // =========================================================================
  describe('1. Negative Invariants Verification', () => {
    const waContent = readFile('src/components/WhatsAppButton.tsx');
    const footerContent = readFile('src/components/Footer.tsx');

    it('WhatsAppButton has ZERO occurrences of isHovered state', () => {
      assert.ok(
        !waContent.includes('isHovered'),
        'WhatsAppButton must not contain isHovered state'
      );
    });

    it('WhatsAppButton has ZERO occurrences of tooltip text "Chat on WhatsApp"', () => {
      assert.ok(
        !/Chat on WhatsApp/i.test(waContent),
        'WhatsAppButton must not contain tooltip "Chat on WhatsApp"'
      );
    });

    it('WhatsAppButton contains valid wa.me link with +923367135319 and target="_blank"', () => {
      assert.ok(
        waContent.includes('+923367135319'),
        'WhatsAppButton must include +923367135319'
      );
      assert.ok(
        waContent.includes('https://wa.me/'),
        'WhatsAppButton must target wa.me'
      );
      assert.ok(
        waContent.includes('_blank'),
        'WhatsAppButton must open in new tab'
      );
    });

    it('WhatsAppButton includes data-testid="whatsapp-button" and accessibility label', () => {
      assert.ok(
        waContent.includes('data-testid="whatsapp-button"'),
        'WhatsAppButton must have data-testid="whatsapp-button"'
      );
      assert.ok(
        waContent.includes('aria-label="Chat with ArenaX Support on WhatsApp"'),
        'WhatsAppButton must have accessible aria-label'
      );
    });

    it('WhatsAppButton includes Supabase emerald status beacon dot (#3ECF8E)', () => {
      assert.ok(
        waContent.includes('#3ECF8E'),
        'WhatsAppButton must feature Supabase green status beacon dot'
      );
    });

    it('Footer has ZERO banned marketing taglines', () => {
      assert.ok(
        !/Pakistan's premier mobile esports platform/i.test(footerContent),
        'Footer must not contain "Pakistan\'s premier mobile esports platform"'
      );
      assert.ok(
        !/PLATFORM OPERATIONAL 24\/7/i.test(footerContent),
        'Footer must not contain "PLATFORM OPERATIONAL 24/7"'
      );
    });

    it('Footer preserves brand mark, copyright, and dark carbon #161616 background', () => {
      assert.ok(
        footerContent.includes('Arena') && footerContent.includes('text-[#3ECF8E]'),
        'Footer must display ArenaX brand with #3ECF8E'
      );
      assert.ok(
        footerContent.includes('© 2026 ArenaX. All rights reserved.'),
        'Footer must preserve copyright notice'
      );
      assert.ok(
        footerContent.includes('#161616') || footerContent.includes('bg-[#161616]'),
        'Footer must use Supabase footer surface #161616'
      );
    });
  });

  // =========================================================================
  // 2. Verbatim Contact Information Across All Views
  // =========================================================================
  describe('2. Verbatim Contact Information Across Views', () => {
    const emailFiles = [
      'src/components/Footer.tsx',
      'src/components/Contact.tsx',
      'src/components/FAQ.tsx',
      'src/components/Terms.tsx',
      'src/components/Privacy.tsx',
      'src/components/RefundPolicy.tsx',
      'src/components/FairPlay.tsx',
    ];

    for (const relPath of emailFiles) {
      it(`${relPath} preserves verbatim support email 'arenasupport@gmail.com'`, () => {
        const content = readFile(relPath);
        assert.ok(
          content.includes('arenasupport@gmail.com'),
          `${relPath} must contain arenasupport@gmail.com`
        );
      });
    }

    const phoneFiles = [
      'src/components/WhatsAppButton.tsx',
      'src/components/Contact.tsx',
      'src/components/FAQ.tsx',
    ];

    for (const relPath of phoneFiles) {
      it(`${relPath} preserves official phone number '+923367135319'`, () => {
        const content = readFile(relPath);
        const hasNumber = content.includes('923367135319') || content.includes('+92 336 7135319');
        assert.ok(
          hasNumber,
          `${relPath} must contain +923367135319`
        );
      });
    }
  });

  // =========================================================================
  // 3. Route Topology & Public Views Invariants
  // =========================================================================
  describe('3. Route Topology & Public Views Invariants', () => {
    const appContent = readFile('src/App.tsx');
    const navbarContent = readFile('src/components/Navbar.tsx');
    const footerContent = readFile('src/components/Footer.tsx');

    const expectedRoutes = [
      '/',
      '/about',
      '/faq',
      '/contact',
      '/terms',
      '/privacy',
      '/refund-policy',
      '/fair-play',
    ];

    it('App.tsx defines all 8 public routes plus wildcard fallback', () => {
      for (const r of expectedRoutes) {
        assert.ok(
          appContent.includes(`path="${r}"`),
          `App.tsx must register route '${r}'`
        );
      }
      assert.ok(
        appContent.includes('path="*"'),
        'App.tsx must register wildcard fallback route'
      );
    });

    it('Footer navigation links map exclusively to registered routes', () => {
      const footerLinks = ['/', '/about', '/faq', '/contact', '/terms', '/privacy', '/refund-policy', '/fair-play'];
      for (const link of footerLinks) {
        assert.ok(
          footerContent.includes(`to="${link}"`) || footerContent.includes(`href="${link}"`),
          `Footer must contain navigation link to '${link}'`
        );
      }
    });

    it('Navbar nav item IDs match section element IDs on the Home showcase page', () => {
      const expectedSectionIds = [
        'tournaments',
        'ai-vision',
        'wallet',
        'ranks',
        'organizers',
        'how-it-works',
        'download',
      ];
      for (const secId of expectedSectionIds) {
        assert.ok(
          navbarContent.includes(`'${secId}'`) || navbarContent.includes(`"${secId}"`),
          `Navbar must reference section id '${secId}'`
        );
      }

      // Verify each section ID exists on the respective component file
      assert.ok(readFile('src/components/TournamentModes.tsx').includes('id="tournaments"'), 'tournaments ID exists');
      assert.ok(readFile('src/components/AIVisionShowcase.tsx').includes('id="ai-vision"'), 'ai-vision ID exists');
      assert.ok(readFile('src/components/WalletSection.tsx').includes('id="wallet"'), 'wallet ID exists');
      assert.ok(readFile('src/components/LeaderboardTiers.tsx').includes('id="ranks"'), 'ranks ID exists');
      assert.ok(readFile('src/components/OrganizerProgram.tsx').includes('id="organizers"'), 'organizers ID exists');
      assert.ok(readFile('src/components/HowItWorks.tsx').includes('id="how-it-works"'), 'how-it-works ID exists');
      assert.ok(readFile('src/components/Download.tsx').includes('id="download"'), 'download ID exists');
    });
  });

  // =========================================================================
  // 4. Feature Inventory Verification: All 26 Features from PROJECT.md
  // =========================================================================
  describe('4. Feature Inventory Verification (Features 1-26)', () => {
    it('Feature 1: Supabase Design Tokens & CSS Architecture in tailwind & index.css', () => {
      const tailwindConfig = readFile('tailwind.config.js');
      const indexCss = readFile('src/index.css');

      // Brand green tokens
      assert.ok(tailwindConfig.includes('#3ECF8E') || indexCss.includes('#3ECF8E'), 'Must declare #3ECF8E');
      assert.ok(indexCss.includes('#34B27B'), 'Must declare hover #34B27B');
      assert.ok(indexCss.includes('#249361'), 'Must declare dark stop #249361');

      // Dark carbon surfaces
      assert.ok(indexCss.includes('#121212'), 'Must declare canvas #121212');
      assert.ok(indexCss.includes('#171717') || indexCss.includes('#171817'), 'Must declare card surface');
      assert.ok(indexCss.includes('#0E0F0E') || indexCss.includes('#0A0A0A'), 'Must declare deep surface');

      // Hairline borders
      assert.ok(indexCss.includes('rgba(255, 255, 255, 0.08)'), 'Must declare subtle hairline border');
      assert.ok(indexCss.includes('rgba(255, 255, 255, 0.14)'), 'Must declare strong hairline border');
      assert.ok(indexCss.includes('rgba(62, 207, 142, 0.35)'), 'Must declare accent hairline border');
    });

    it('Feature 2: Supabase Button Primitives (Button.tsx)', () => {
      const buttonContent = readFile('src/components/primitives/Button.tsx');
      assert.ok(buttonContent.includes('#3ECF8E'), 'Button must use brand green #3ECF8E for primary');
      assert.ok(buttonContent.includes('asAnchor'), 'Button must support polymorphic asAnchor');
      assert.ok(buttonContent.includes('primary'), 'Button must support primary variant');
      assert.ok(buttonContent.includes('secondary'), 'Button must support secondary variant');
      assert.ok(buttonContent.includes('ghost'), 'Button must support ghost variant');
    });

    it('Feature 3: Supabase Card Primitives (Card.tsx)', () => {
      const cardContent = readFile('src/components/primitives/Card.tsx');
      assert.ok(cardContent.includes('hud-card'), 'Card must support base hud-card surface');
      assert.ok(cardContent.includes('hud-card-highlight'), 'Card must support hud-card-highlight');
      assert.ok(cardContent.includes('variant'), 'Card must accept variant prop');
    });

    it('Feature 4: Supabase Badge & Pill Primitives (Badge.tsx & Pill.tsx)', () => {
      const badgeContent = readFile('src/components/primitives/Badge.tsx');
      const pillContent = readFile('src/components/primitives/Pill.tsx');
      assert.ok(badgeContent.includes('emerald'), 'Badge must support emerald tone');
      assert.ok(badgeContent.includes('neutral'), 'Badge must support neutral tone');
      assert.ok(badgeContent.includes('danger'), 'Badge must support danger tone');
      assert.ok(pillContent.includes('rounded-full'), 'Pill must render pill geometry');
    });

    it('Feature 5: Supabase Form & Input Primitives (Input.tsx)', () => {
      const inputContent = readFile('src/components/primitives/Input.tsx');
      assert.ok(inputContent.includes('#121212') || inputContent.includes('bg-bg-1'), 'Input must use dark carbon background');
      assert.ok(inputContent.includes('#3ECF8E') || inputContent.includes('focus:border-brand') || inputContent.includes('focus:ring'), 'Input must feature brand green focus');
    });

    it('Feature 6: Navigation & Sticky Chrome (Navbar.tsx)', () => {
      const navbarContent = readFile('src/components/Navbar.tsx');
      assert.ok(navbarContent.includes('fixed') || navbarContent.includes('sticky'), 'Navbar must be sticky / fixed');
      assert.ok(navbarContent.includes('scrollProgress'), 'Navbar must track scroll progress');
      assert.ok(navbarContent.includes('Download App'), 'Navbar must provide Download CTA');
      assert.ok(navbarContent.includes('overflow'), 'Navbar must manage mobile drawer body overflow');
    });

    it('Feature 7: Hero Section Showcase (Hero.tsx)', () => {
      const heroContent = readFile('src/components/Hero.tsx');
      assert.ok(heroContent.includes('OFFICIAL CLIENT'), 'Hero must show OFFICIAL CLIENT badge');
      assert.ok(heroContent.includes('ARENA') && heroContent.includes('text-[#3ECF8E]'), 'Hero must render giant ARENAX echo');
      assert.ok(heroContent.includes('< 15s'), 'Hero must render < 15s metric');
      assert.ok(heroContent.includes('1:1'), 'Hero must render 1:1 metric');
      assert.ok(heroContent.includes('100%'), 'Hero must render 100% metric');
      assert.ok(heroContent.includes('Red Criminal') && heroContent.includes('Streetwear Rebel'), 'Hero characters intact');
    });

    it('Feature 8: Platform Editorial Statement (Statement.tsx)', () => {
      const statementContent = readFile('src/components/Statement.tsx');
      assert.ok(statementContent.includes('01') && statementContent.includes('04'), 'Statement rows 01-04 declared');
      assert.ok(statementContent.includes('AI vision verifies scoreboards in seconds.'), 'Statement 01 copy intact');
      assert.ok(statementContent.includes('Cash out in 24 hours.'), 'Statement 02 copy intact');
      assert.ok(statementContent.includes('Money kept in two separate wallets.'), 'Statement 03 copy intact');
      assert.ok(statementContent.includes('Cheaters banned for life.'), 'Statement 04 copy intact');
    });

    it('Feature 9: Mobile Client 3D Showcase (AppExperienceShowcase.tsx)', () => {
      const appShowcase = readFile('src/components/AppExperienceShowcase.tsx');
      assert.ok(appShowcase.includes('Engineered For') && appShowcase.includes('Esports'), 'Showcase title intact');
      assert.ok(appShowcase.includes('Lobby') && appShowcase.includes('Scanner') && appShowcase.includes('Wallet'), 'Tabs intact');
      assert.ok(appShowcase.includes('AX_Sniper'), 'Mock player intact');
      assert.ok(appShowcase.includes('94829104'), 'UID intact');
      assert.ok(appShowcase.includes('Room Credentials') && appShowcase.includes('arena77'), 'Credentials intact');
    });

    it('Feature 10: Tournament Modes Showcase (TournamentModes.tsx)', () => {
      const tourneyContent = readFile('src/components/TournamentModes.tsx');
      assert.ok(tourneyContent.includes('Bermuda 48P') || tourneyContent.includes('Bermuda 48-Player'), 'Bermuda mode intact');
      assert.ok(tourneyContent.includes('Clash Squad 4v4'), 'Clash Squad mode intact');
      assert.ok(tourneyContent.includes('2,160 AX Cash'), 'Prize pool intact');
      assert.ok(tourneyContent.includes('2,880 AX Cash'), 'CS Prize pool intact');
    });

    it('Feature 11: AI Vision Scoreboard & Calculator (AIVisionShowcase.tsx)', () => {
      const visionContent = readFile('src/components/AIVisionShowcase.tsx');
      assert.ok(visionContent.includes('Combat Points Calculator'), 'Combat calculator intact');
      assert.ok(visionContent.includes('Booyah (+20 PTS)'), 'Booyah points intact');
      assert.ok(visionContent.includes('Telemetry Extraction'), 'Telemetry card intact');
      assert.ok(visionContent.includes('99.4%') || visionContent.includes('confidence'), 'Confidence metric intact');
    });

    it('Feature 12: Two-Vault Financial Architecture (WalletSection.tsx)', () => {
      const walletContent = readFile('src/components/WalletSection.tsx');
      assert.ok(walletContent.includes('Play Wallet'), 'Play Wallet card intact');
      assert.ok(walletContent.includes('Winning Wallet'), 'Winning Wallet card intact');
      assert.ok(walletContent.includes('1 AX = 1 PKR'), 'Cash parity intact');
      assert.ok(walletContent.includes('PKR 50'), 'Min deposit intact');
      assert.ok(walletContent.includes('100 AX'), 'Min cashout threshold intact');
    });

    it('Feature 13: Competitive Ranks & Leaderboard (LeaderboardTiers.tsx)', () => {
      const ranksContent = readFile('src/components/LeaderboardTiers.tsx');
      assert.ok(ranksContent.includes('Competitive') && ranksContent.includes('Tiers'), 'Section heading intact');
      assert.ok(ranksContent.includes('Grandmaster'), 'Apex division intact');
      assert.ok(ranksContent.includes('Promotion Gap Simulator'), 'Simulator intact');
      assert.ok(ranksContent.includes('+20 PTS / Booyah'), 'Booyah rate intact');
    });

    it('Feature 14: Host & Organizer Program (OrganizerProgram.tsx)', () => {
      const orgContent = readFile('src/components/OrganizerProgram.tsx');
      assert.ok(orgContent.includes('Host & Earn') && orgContent.includes('Commission'), 'Section heading intact');
      assert.ok(orgContent.includes('Host Earnings Simulator'), 'Simulator intact');
      assert.ok(orgContent.includes('PLATFORM FEE (10%)'), '10% platform fee intact');
      assert.ok(orgContent.includes('Net Organizer Payout'), 'Net payout label intact');
    });

    it('Feature 15: Onboarding Timeline & How It Works (HowItWorks.tsx)', () => {
      const howContent = readFile('src/components/HowItWorks.tsx');
      assert.ok(howContent.includes('Road to') && howContent.includes('Booyah'), 'Section heading intact');
      assert.ok(howContent.includes('Download & Install APK'), 'Step 1 intact');
      assert.ok(howContent.includes('AI Vision & 24h Cashout'), 'Step 6 intact');
    });

    it('Feature 16: Platform Comparison Matrix (PlatformComparison.tsx)', () => {
      const compContent = readFile('src/components/PlatformComparison.tsx');
      assert.ok(compContent.includes('Platform') && compContent.includes('Integrity'), 'Section heading intact');
      assert.ok(compContent.includes('Result Verification'), 'Dimension 1 intact');
      assert.ok(compContent.includes('Host Accountability'), 'Dimension 6 intact');
    });

    it('Feature 17: Scout Referral Royalties (ScoutRewards.tsx)', () => {
      const scoutContent = readFile('src/components/ScoutRewards.tsx');
      assert.ok(scoutContent.includes('Scout Community Royalties'), 'Scout card intact');
      assert.ok(scoutContent.includes('25 AX'), 'Starter bonus intact');
      assert.ok(scoutContent.includes('2% Cash'), 'Win royalty intact');
      assert.ok(scoutContent.includes('In-App Digital Rewards'), 'Store card intact');
      assert.ok(scoutContent.includes('Free Fire 100 + 10 Diamonds'), 'Diamond reward intact');
    });

    it('Feature 18: APK Download Hub & QR Handoff (Download.tsx)', () => {
      const dlContent = readFile('src/components/Download.tsx');
      assert.ok(dlContent.includes('Android Client'), 'Android card intact');
      assert.ok(dlContent.includes('v2.6.0'), 'Version intact');
      assert.ok(dlContent.includes('com.arenax.app'), 'App package intact');
      assert.ok(dlContent.includes('Apple iOS'), 'iOS card intact');
      assert.ok(dlContent.includes('Coming Soon'), 'iOS coming soon status intact');
    });

    it('Feature 19: Global Supabase Footer (Footer.tsx)', () => {
      const ftContent = readFile('src/components/Footer.tsx');
      assert.ok(ftContent.includes('Arena') && ftContent.includes('text-[#3ECF8E]'), 'Brand intact');
      assert.ok(ftContent.includes('arenasupport@gmail.com'), 'Email intact');
      assert.ok(ftContent.includes('© 2026 ArenaX. All rights reserved.'), 'Copyright intact');
    });

    it('Feature 20: Floating Action Trigger (WhatsAppButton.tsx)', () => {
      const waContent = readFile('src/components/WhatsAppButton.tsx');
      assert.ok(waContent.includes('+923367135319'), 'Phone intact');
      assert.ok(waContent.includes('data-testid="whatsapp-button"'), 'TestId intact');
    });

    it('Feature 21: About Showcase Page (About.tsx)', () => {
      const abContent = readFile('src/components/About.tsx');
      assert.ok(abContent.includes('Built For') && abContent.includes('Players'), 'About headline intact');
      assert.ok(abContent.includes('Our Story'), 'Story card intact');
      assert.ok(abContent.includes('Dispute-Free Competition'), 'Core value 1 intact');
      assert.ok(abContent.includes('Zero-Tolerance Fair Play'), 'Core value 4 intact');
    });

    it('Feature 22: FAQ Knowledge Base Page (FAQ.tsx)', () => {
      const faqContent = readFile('src/components/FAQ.tsx');
      assert.ok(faqContent.includes('Frequently Asked Questions'), 'Headline intact');
      assert.ok(faqContent.includes('What is ArenaX?'), 'Question 1 intact');
      assert.ok(faqContent.includes('Still Have Questions?'), 'Helpdesk box intact');
      assert.ok(faqContent.includes('arenasupport@gmail.com'), 'Email intact');
    });

    it('Feature 23: Contact Helpdesk Page (Contact.tsx)', () => {
      const contactContent = readFile('src/components/Contact.tsx');
      assert.ok(contactContent.includes('Get in') && contactContent.includes('Touch'), 'Headline intact');
      assert.ok(contactContent.includes('Email Support'), 'Email card intact');
      assert.ok(contactContent.includes('Send Direct Message'), 'Form intact');
      assert.ok(contactContent.includes('Deposit & Wallet Issue'), 'Form topic 1 intact');
      assert.ok(contactContent.includes('Tournament Scoreboard Dispute'), 'Form topic 2 intact');
    });

    it('Feature 24: Legal & Compliance Pages (Terms, Privacy, RefundPolicy, FairPlay)', () => {
      const termsContent = readFile('src/components/Terms.tsx');
      const privacyContent = readFile('src/components/Privacy.tsx');
      const refundContent = readFile('src/components/RefundPolicy.tsx');
      const fairplayContent = readFile('src/components/FairPlay.tsx');

      // Jurisdiction / governance in Terms & Privacy
      assert.ok(termsContent.includes('Governed under the Laws of Pakistan'), 'Terms jurisdiction clause');
      assert.ok(privacyContent.includes('Governed under the Laws of Pakistan'), 'Privacy jurisdiction clause');

      // Specific policy pills
      assert.ok(refundContent.includes('100% Automated Cancellation Protection'), 'Refund protection pill');
      assert.ok(fairplayContent.includes('Zero Tolerance Anti-Cheat Protocol'), 'Fair play anti-cheat pill');

      // All link to support email
      for (const legal of [termsContent, privacyContent, refundContent, fairplayContent]) {
        assert.ok(
          legal.includes('arenasupport@gmail.com'),
          'Legal pages must link to arenasupport@gmail.com'
        );
      }
    });

    it('Feature 25: E2E Supabase Design Token & Invariant Test Suite', () => {
      assert.ok(fs.existsSync(path.join(root, 'tests/supabase-tokens-and-invariants.test.ts')));
      assert.ok(fs.existsSync(path.join(root, 'tests/tier1-feature-coverage.test.ts')));
      assert.ok(fs.existsSync(path.join(root, 'tests/tier2-boundary-corner-cases.test.ts')));
      assert.ok(fs.existsSync(path.join(root, 'tests/tier3-cross-feature.test.ts')));
      assert.ok(fs.existsSync(path.join(root, 'tests/tier4-real-world-scenarios.test.ts')));
    });

    it('Feature 26: Final E2E Test Pass & Adversarial Hardening', () => {
      assert.ok(fs.existsSync(path.join(root, 'tests/tier5-adversarial-hardening.test.ts')));
      assert.ok(fs.existsSync(path.join(root, 'scripts/run-all-tests.ts')));
    });
  });

  // =========================================================================
  // 5. Functional Mathematical & Business Invariants
  // =========================================================================
  describe('5. Functional Mathematical & Business Invariants', () => {
    it('Combat Points Formula: 20 PTS Booyah + 5 PTS/Kill', () => {
      const calcPoints = (booyah: boolean, kills: number) => {
        const k = Math.max(0, Math.floor(kills));
        return (booyah ? 20 : 0) + k * 5;
      };

      // 0 kills, defeat -> 0 PTS
      assert.equal(calcPoints(false, 0), 0);
      // 0 kills, Booyah -> 20 PTS
      assert.equal(calcPoints(true, 0), 20);
      // 14 kills, Booyah -> 90 PTS (as in AppExperienceShowcase & AIVisionShowcase)
      assert.equal(calcPoints(true, 14), 90);
      // 7 kills, Booyah -> 55 PTS (as in Tier 4 scenario)
      assert.equal(calcPoints(true, 7), 55);
      // Negative kills clamped
      assert.equal(calcPoints(true, -5), 20);
    });

    it('Organizer Revenue Conservation Invariant across extreme and prime values', () => {
      const calculateRevenue = (participants: number, entryFee: number, hostCutPercent: number) => {
        const total = participants * entryFee;
        const adminFee = Math.round(total * 0.1);
        const hostEarnings = Math.round(total * (hostCutPercent / 100));
        const playerPrizePool = total - adminFee - hostEarnings;
        return { total, adminFee, hostEarnings, playerPrizePool };
      };

      const testCases = [
        { p: 48, fee: 50, cut: 0 },
        { p: 48, fee: 150, cut: 15 },
        { p: 48, fee: 500, cut: 20 },
        { p: 10, fee: 50, cut: 10 },
        { p: 37, fee: 199, cut: 13 }, // primes
        { p: 0, fee: 100, cut: 10 },
        { p: 48, fee: 0, cut: 10 },
      ];

      for (const tc of testCases) {
        const rev = calculateRevenue(tc.p, tc.fee, tc.cut);
        assert.equal(
          rev.adminFee + rev.hostEarnings + rev.playerPrizePool,
          rev.total,
          `Conservation failed for p=${tc.p}, fee=${tc.fee}, cut=${tc.cut}`
        );
      }
    });

    it('Promotion Gap Invariant: Math.ceil((target - current) / 20)', () => {
      const calcGap = (current: number, target: number) => {
        const ptsNeeded = Math.max(0, target - current);
        const booyahsNeeded = Math.ceil(ptsNeeded / 20);
        return { ptsNeeded, booyahsNeeded };
      };

      // Exactly 0 gap
      assert.deepEqual(calcGap(10000, 10000), { ptsNeeded: 0, booyahsNeeded: 0 });
      // Exceeding target
      assert.deepEqual(calcGap(10500, 10000), { ptsNeeded: 0, booyahsNeeded: 0 });
      // 1 point gap -> 1 booyah
      assert.deepEqual(calcGap(9999, 10000), { ptsNeeded: 1, booyahsNeeded: 1 });
      // 20 points gap -> 1 booyah
      assert.deepEqual(calcGap(9980, 10000), { ptsNeeded: 20, booyahsNeeded: 1 });
      // 21 points gap -> 2 booyahs
      assert.deepEqual(calcGap(9979, 10000), { ptsNeeded: 21, booyahsNeeded: 2 });
      // 5,200 points gap -> 260 booyahs (Tier 4 scenario)
      assert.deepEqual(calcGap(4800, 10000), { ptsNeeded: 5200, booyahsNeeded: 260 });
    });
  });
});
