import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectRoot = process.cwd();

function readProjectFile(relPath: string): string {
  const filePath = path.resolve(projectRoot, relPath);
  assert.ok(fs.existsSync(filePath), `Required file ${relPath} must exist`);
  return fs.readFileSync(filePath, 'utf8');
}

describe('Supabase Design Tokens & Requirement Invariants Suite', () => {
  // =========================================================================
  // Requirement R1: Reference File Immutability Invariant
  // =========================================================================
  describe('Requirement R1: Reference Immutability Invariant', () => {
    const refHtmlName = 'Supabase _ The Postgres Development Platform.html';
    const refFolderName = 'Supabase _ The Postgres Development Platform_files';
    const refHtmlPath = path.resolve(projectRoot, refHtmlName);
    const refFolderPath = path.resolve(projectRoot, refFolderName);

    it('verifies the reference HTML file exists and has NOT been modified', () => {
      assert.ok(fs.existsSync(refHtmlPath), `${refHtmlName} must exist in read-only mode`);
      const stats = fs.statSync(refHtmlPath);
      assert.equal(stats.size, 1396412, 'Reference HTML file size must strictly equal 1,396,412 bytes');

      const fileBuffer = fs.readFileSync(refHtmlPath);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      assert.equal(
        hash.toLowerCase(),
        'cfbab0c0f7d9acaa887ecf3699ebde892647f81c1cd023e4f3c156f8b6707b50',
        'Reference HTML file SHA-256 hash must strictly match original read-only snapshot'
      );
    });

    it('verifies the reference files directory exists and has NOT been modified', () => {
      assert.ok(fs.existsSync(refFolderPath), `${refFolderName} directory must exist`);
      assert.ok(fs.statSync(refFolderPath).isDirectory(), `${refFolderName} must be a directory`);

      // Recursively scan files and sum size
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

      assert.equal(fileCount, 66, 'Reference files folder must contain exactly 66 files');
      assert.equal(totalBytes, 3376281, 'Reference files folder total byte size must strictly equal 3,376,281 bytes');
    });
  });

  // =========================================================================
  // Requirement R2: Supabase Design Tokens Adherence
  // =========================================================================
  describe('Requirement R2: Supabase Design Tokens & CSS Architecture', () => {
    const cssSrc = readProjectFile('src/index.css');
    const tailwindSrc = readProjectFile('tailwind.config.js');
    const indexHtml = readProjectFile('index.html');

    it('declares canonical Supabase green accent #3ECF8E across CSS and Tailwind', () => {
      // CSS custom properties
      assert.ok(cssSrc.includes('#3ECF8E'), 'src/index.css must declare canonical green #3ECF8E');
      assert.ok(cssSrc.includes('--accent:'), 'src/index.css must define --accent');
      assert.ok(cssSrc.includes('--brand-default: #3ECF8E') || cssSrc.includes('--accent:      #3ECF8E'), 'Must declare #3ECF8E for brand accent');

      // Tailwind configuration
      assert.ok(tailwindSrc.includes('62, 207, 142'), 'tailwind.config.js must configure rgb(62, 207, 142) for accent');
      assert.ok(tailwindSrc.includes('#3ECF8E'), 'tailwind.config.js must include #3ECF8E in emerald palette');
    });

    it('declares brand hover stop #34B27B and dark gradient stop #249361', () => {
      assert.ok(cssSrc.includes('#34B27B'), 'src/index.css must declare #34B27B for accent-hover');
      assert.ok(tailwindSrc.includes('52, 178, 123'), 'tailwind.config.js must configure rgb(52, 178, 123) for accent-hover');
      assert.ok(cssSrc.includes('#249361'), 'src/index.css must declare #249361 for brand dark');
    });

    it('declares Supabase dark carbon surface palette (#121212, #171817 / #171717, #0E0F0E, #202220)', () => {
      assert.ok(cssSrc.includes('#121212'), 'src/index.css must define canonical canvas #121212 (--bg-1)');
      assert.ok(cssSrc.includes('#171817') || cssSrc.includes('#171717'), 'src/index.css must define carbon card surface (--bg-2)');
      assert.ok(cssSrc.includes('#0E0F0E'), 'src/index.css must define deep canvas #0E0F0E (--bg-0)');
      assert.ok(cssSrc.includes('#202220') || cssSrc.includes('#1E201F'), 'src/index.css must define raised surface (--bg-3)');

      // Tailwind RGB equivalents for opacity-aware utility classes
      assert.ok(tailwindSrc.includes('18, 18, 18'), 'tailwind.config.js must configure bg-1 (18, 18, 18)');
      assert.ok(tailwindSrc.includes('23, 24, 23') || tailwindSrc.includes('23, 23, 23'), 'tailwind.config.js must configure bg-2');
    });

    it('declares Supabase precision hairline borders (rgba(255, 255, 255, 0.08) and 0.14)', () => {
      assert.ok(cssSrc.includes('rgba(255, 255, 255, 0.08)'), 'src/index.css must define subtle hairline 0.08');
      assert.ok(cssSrc.includes('rgba(255, 255, 255, 0.14)'), 'src/index.css must define strong hairline 0.14');
      assert.ok(cssSrc.includes('rgba(62, 207, 142, 0.35)'), 'src/index.css must define accent hairline 0.35');
    });

    it('enforces dark color-scheme on root HTML and document body', () => {
      assert.ok(indexHtml.includes('class="dark"'), 'index.html <html> must include class="dark"');
      assert.ok(indexHtml.includes('data-theme="dark"'), 'index.html <html> must include data-theme="dark"');
      assert.ok(indexHtml.includes('style="color-scheme: dark;"') || indexHtml.includes('color-scheme: dark'), 'index.html must set color-scheme: dark');
      assert.ok(indexHtml.includes('<meta name="color-scheme" content="dark" />'), 'index.html must have dark color-scheme meta tag');
      assert.ok(cssSrc.includes('color-scheme: dark'), 'src/index.css must declare color-scheme: dark in base layer');
    });

    it('enforces Supabase typography hierarchy (Manrope headings, Inter body, Source Code Pro mono)', () => {
      // Font family definitions in CSS
      assert.ok(cssSrc.includes("'Manrope'") || cssSrc.includes('Manrope'), 'src/index.css must configure Manrope');
      assert.ok(cssSrc.includes("'Inter'") || cssSrc.includes('Inter'), 'src/index.css must configure Inter');
      assert.ok(cssSrc.includes("'Source Code Pro'") || cssSrc.includes('Source Code Pro'), 'src/index.css must configure Source Code Pro');

      // Font family definitions in Tailwind
      assert.ok(tailwindSrc.includes('Manrope'), 'tailwind.config.js must configure Manrope heading font');
      assert.ok(tailwindSrc.includes('Inter'), 'tailwind.config.js must configure Inter sans font');
      assert.ok(tailwindSrc.includes('Source Code Pro'), 'tailwind.config.js must configure Source Code Pro mono font');

      // Preconnect & Google Fonts link in index.html
      assert.ok(indexHtml.includes('fonts.googleapis.com'), 'index.html must include font preconnect/stylesheet');
      assert.ok(indexHtml.includes('Manrope'), 'index.html must load Manrope font');
      assert.ok(indexHtml.includes('Inter'), 'index.html must load Inter font');
      assert.ok(indexHtml.includes('Source+Code+Pro'), 'index.html must load Source Code Pro font');
    });

    it('verifies UI Primitives strictly conform to Supabase styling contracts', () => {
      const btnSrc = readProjectFile('src/components/primitives/Button.tsx');
      assert.ok(btnSrc.includes('bg-accent'), 'Button primary variant must use bg-accent (#3ECF8E)');
      assert.ok(btnSrc.includes('hover:bg-accent-hover'), 'Button primary variant must use hover:bg-accent-hover (#34B27B)');
      assert.ok(btnSrc.includes('motion-safe:active:scale-[0.97]'), 'Button must use Supabase tactile active scale 0.97');
      assert.ok(btnSrc.includes('border-white/[0.08]'), 'Button secondary variant must use hairline border');

      const cardSrc = readProjectFile('src/components/primitives/Card.tsx');
      assert.ok(cardSrc.includes('hud-card'), 'Card primitive must support hud-card variant');
      assert.ok(cardSrc.includes('hud-card-highlight'), 'Card primitive must support hud-card-highlight variant');

      const badgeSrc = readProjectFile('src/components/primitives/Badge.tsx');
      assert.ok(badgeSrc.includes('tabular-nums'), 'Badge primitive must enforce tabular-nums for aligned numerals');
      assert.ok(badgeSrc.includes('font-mono'), 'Badge primitive must use font-mono');
      assert.ok(badgeSrc.includes('uppercase'), 'Badge primitive must use uppercase tracking');
      assert.ok(badgeSrc.includes('#3ECF8E'), 'Badge primitive must use #3ECF8E for emerald tone');
    });
  });

  // =========================================================================
  // Requirement R3: Complete Content Preservation (from views_catalog.md)
  // =========================================================================
  describe('Requirement R3: Verbatim Content Preservation Audit (views_catalog.md)', () => {
    it('preserves all Navbar copy and section anchor destinations', () => {
      const src = readProjectFile('src/components/Navbar.tsx');
      assert.ok(src.includes('Arena') && src.includes('X'), 'Brand ArenaX must be present');
      assert.ok(src.includes('Tournaments'), 'Nav must include Tournaments');
      assert.ok(src.includes('Vision Engine'), 'Nav must include Vision Engine');
      assert.ok(src.includes('Wallet'), 'Nav must include Wallet');
      assert.ok(src.includes('Ranks'), 'Nav must include Ranks');
      assert.ok(src.includes('Organizers'), 'Nav must include Organizers');
      assert.ok(src.includes('How It Works'), 'Nav must include How It Works');
      assert.ok(src.includes('FAQs'), 'Nav must include FAQs');
      assert.ok(src.includes('Download App'), 'Nav must include Download App CTA');
    });

    it('preserves all Hero section copy, badges, and telemetry ribbon', () => {
      const src = readProjectFile('src/components/Hero.tsx');
      assert.ok(src.includes('OFFICIAL CLIENT'), 'Hero must include OFFICIAL CLIENT badge');
      assert.ok(src.includes('Bermuda BR'), 'Hero must include Bermuda BR filter');
      assert.ok(src.includes('Clash Squad 4v4'), 'Hero must include Clash Squad 4v4 filter');
      assert.ok(src.includes('AI Vision OCR'), 'Hero must include AI Vision OCR filter');
      assert.ok(src.includes('Two-Wallet Escrow'), 'Hero must include Two-Wallet Escrow filter');
      assert.ok(src.includes('Criminal'), 'Hero must include Criminal character button');
      assert.ok(src.includes('Rebel'), 'Hero must include Rebel character button');
      assert.ok(src.includes('ARENA') && src.includes('X'), 'Hero must include giant ARENAX title');
      assert.ok(src.includes("Pakistan's Premier") && src.includes('Free Fire') && src.includes('Platform'), 'Hero must include exact headline');
      assert.ok(src.includes('Download APK'), 'Hero must include Download APK CTA');
      assert.ok(src.includes('Explore Tournaments'), 'Hero must include Explore Tournaments CTA');
      assert.ok(src.includes('< 15s'), 'Telemetry ribbon must include < 15s metric');
      assert.ok(src.includes('AI OCR Verification'), 'Telemetry ribbon must include AI OCR Verification');
      assert.ok(src.includes('1:1'), 'Telemetry ribbon must include 1:1 metric');
      assert.ok(src.includes('Cash Parity (PKR)'), 'Telemetry ribbon must include Cash Parity (PKR)');
      assert.ok(src.includes('100%'), 'Telemetry ribbon must include 100% metric');
      assert.ok(src.includes('Automated Refund'), 'Telemetry ribbon must include Automated Refund');
    });

    it('preserves all 4 editorial protocol statements in Statement.tsx', () => {
      const src = readProjectFile('src/components/Statement.tsx');
      assert.ok(src.includes('AI vision verifies scoreboards in seconds.'), 'Statement 01 preserved');
      assert.ok(src.includes('Cash out in 24 hours.'), 'Statement 02 preserved');
      assert.ok(src.includes('Money kept in two separate wallets.'), 'Statement 03 preserved');
      assert.ok(src.includes('Cheaters banned for life.'), 'Statement 04 preserved');
    });

    it('preserves all App Experience Showcase copy, chapters, and phone mockup details', () => {
      const src = readProjectFile('src/components/AppExperienceShowcase.tsx');
      assert.ok(src.includes('Engineered For') && src.includes('Esports'), 'Showcase heading preserved');
      assert.ok(src.includes('Match Credentials'), 'Chapter 1 preserved');
      assert.ok(src.includes('AI Scoreboard'), 'Chapter 2 preserved');
      assert.ok(src.includes('Dual-Vault Escrow'), 'Chapter 3 preserved');
      assert.ok(src.includes('Lobby') && src.includes('Scanner') && src.includes('Wallet'), 'Phone switcher tabs preserved');
      assert.ok(src.includes('AX_Sniper'), 'Phone player IGN preserved');
      assert.ok(src.includes('Grandmaster'), 'Phone player rank preserved');
      assert.ok(src.includes('1,450 AX'), 'Phone player coin balance preserved');
      assert.ok(src.includes('Bermuda Championship #402'), 'Phone match title preserved');
      assert.ok(src.includes('Join Scrim in App'), 'Phone CTA preserved');
    });

    it('preserves all Tournament Modes formats, prize pools, and rules', () => {
      const src = readProjectFile('src/components/TournamentModes.tsx');
      assert.ok(src.includes('Battle for the') && src.includes('Booyah'), 'Tournament heading preserved');
      assert.ok(src.includes('Bermuda 48P') && src.includes('Clash Squad 4v4'), 'Mode tabs preserved');
      assert.ok(src.includes('Bermuda 48-Player Survival'), 'Bermuda title preserved');
      assert.ok(src.includes('2,160 AX Cash'), 'Bermuda prize pool preserved');
      assert.ok(src.includes('Clash Squad 4v4 Tournament Brackets'), 'CS 4v4 title preserved');
      assert.ok(src.includes('2,880 AX Cash'), 'CS prize pool preserved');
      assert.ok(src.includes('solo') && src.includes('duo') && src.includes('squad'), 'Bermuda formats preserved');
      assert.ok(src.includes('Quarters') && src.includes('Semis') && src.includes('Finals'), 'CS stages preserved');
    });

    it('preserves all AI Vision Engine scoreboard, confidence, and calculator copy', () => {
      const src = readProjectFile('src/components/AIVisionShowcase.tsx');
      assert.ok(src.includes('Zero') && src.includes('Disputes'), 'AI Vision heading preserved');
      assert.ok(src.includes('MATCH #402 • BERMUDA'), 'Match tag preserved');
      assert.ok(src.includes('UID MATCHED'), 'Match status badge preserved');
      assert.ok(src.includes('AX_Sniper'), 'IGN AX_Sniper preserved');
      assert.ok(src.includes('PK_Hunter'), 'IGN PK_Hunter preserved');
      assert.ok(src.includes('Viper_Ghost'), 'IGN Viper_Ghost preserved');
      assert.ok(src.includes('SHA-256 INTEGRITY'), 'Security tag preserved');
      assert.ok(src.includes('Telemetry Extraction'), 'Extraction panel preserved');
      assert.ok(src.includes('Combat Points Calculator'), 'Calculator title preserved');
      assert.ok(src.includes('Booyah (+20 PTS)'), 'Booyah button preserved');
      assert.ok(src.includes('Top 2–48 (0 PTS)'), 'Defeat button preserved');
      assert.ok(src.includes('Kills'), 'Kill slider label preserved');
    });

    it('preserves all Two-Vault Financial Architecture specifications and flow nodes', () => {
      const src = readProjectFile('src/components/WalletSection.tsx');
      assert.ok(src.includes('Two-Vault') && src.includes('Security'), 'Wallet heading preserved');
      assert.ok(src.includes('1 AX = 1 PKR Cash Parity') || src.includes('1 AX = 1 PKR'), 'Cash parity callout preserved');
      assert.ok(src.includes('01') && src.includes('Deposit'), 'Flow node 1 preserved');
      assert.ok(src.includes('02') && src.includes('Play Wallet'), 'Flow node 2 preserved');
      assert.ok(src.includes('03') && src.includes('Match Scrim'), 'Flow node 3 preserved');
      assert.ok(src.includes('04') && src.includes('Winning Wallet'), 'Flow node 4 preserved');
      assert.ok(src.includes('05') && src.includes('Cashout'), 'Flow node 5 preserved');
      assert.ok(src.includes('Play Wallet') && src.includes('Non-Withdrawable'), 'Play wallet card preserved');
      assert.ok(src.includes('Winning Wallet') && src.includes('100% Withdrawable'), 'Winning wallet card preserved');
      assert.ok(src.includes('PKR 50'), 'Minimum deposit PKR 50 preserved');
      assert.ok(src.includes('100 AX'), 'Minimum cashout 100 AX preserved');
      assert.ok(src.includes('JazzCash / EasyPaisa'), 'Disbursement channel preserved');
      assert.ok(src.includes('6-Digit PIN'), 'Fund security PIN preserved');
    });

    it('preserves all Competitive Tiers 8 divisions and Promotion Gap Simulator copy', () => {
      const src = readProjectFile('src/components/LeaderboardTiers.tsx');
      assert.ok(src.includes('Competitive') && src.includes('Tiers'), 'Ranks heading preserved');
      const expectedTiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Master', 'Grandmaster'];
      for (const t of expectedTiers) {
        assert.ok(src.includes(t), `Tier ${t} must be present`);
      }
      assert.ok(src.includes('Promotion Gap Simulator'), 'Simulator title preserved');
      assert.ok(src.includes('+20 PTS / Booyah'), 'Booyah rate tag preserved');
      assert.ok(src.includes('Points Required:'), 'Points required label preserved');
      assert.ok(src.includes('Booyahs Required:'), 'Booyahs required label preserved');
    });

    it('preserves all Organizer Program capabilities and earnings simulator copy', () => {
      const src = readProjectFile('src/components/OrganizerProgram.tsx');
      assert.ok(src.includes('Host & Earn') && src.includes('Commission'), 'Organizer heading preserved');
      assert.ok(src.includes('Host Earnings Simulator'), 'Simulator title preserved');
      assert.ok(src.includes('Lobby Size'), 'Lobby size slider label preserved');
      assert.ok(src.includes('Entry Fee'), 'Entry fee slider label preserved');
      assert.ok(src.includes('Organizer Cut'), 'Organizer cut slider label preserved');
      assert.ok(src.includes('TOTAL REVENUE'), 'Total revenue label preserved');
      assert.ok(src.includes('PLATFORM FEE (10%)'), 'Platform fee label preserved');
      assert.ok(src.includes('Net Organizer Payout'), 'Net organizer payout callout preserved');
      assert.ok(src.includes('Apply to Host Scrims'), 'Action button preserved');
    });

    it('preserves all How It Works 6-step onboarding roadmap', () => {
      const src = readProjectFile('src/components/HowItWorks.tsx');
      assert.ok(src.includes('Road to') && src.includes('Booyah'), 'HowItWorks heading preserved');
      assert.ok(src.includes('01') && src.includes('Download & Install APK'), 'Step 1 preserved');
      assert.ok(src.includes('02') && src.includes('Link Your Free Fire UID'), 'Step 2 preserved');
      assert.ok(src.includes('03') && src.includes('Assemble Your Squad'), 'Step 3 preserved');
      assert.ok(src.includes('04') && src.includes('Register for Tournaments'), 'Step 4 preserved');
      assert.ok(src.includes('05') && src.includes('Drop & Dominate'), 'Step 5 preserved');
      assert.ok(src.includes('06') && src.includes('AI Vision & 24h Cashout'), 'Step 6 preserved');
      assert.ok(src.includes('Download Direct APK'), 'Action button preserved');
    });

    it('preserves all Platform Comparison Matrix points', () => {
      const src = readProjectFile('src/components/PlatformComparison.tsx');
      assert.ok(src.includes('Platform') && src.includes('Integrity'), 'Comparison heading preserved');
      assert.ok(src.includes('Result Verification'), 'Dimension 1 preserved');
      assert.ok(src.includes('Prize Money Protection'), 'Dimension 2 preserved');
      assert.ok(src.includes('Cashout Speed'), 'Dimension 3 preserved');
      assert.ok(src.includes('Scoring Transparency'), 'Dimension 4 preserved');
      assert.ok(src.includes('Match Cancellation'), 'Dimension 5 preserved');
      assert.ok(src.includes('Host Accountability'), 'Dimension 6 preserved');
    });

    it('preserves all Scout & Store referral royalties and Free Fire vouchers', () => {
      const src = readProjectFile('src/components/ScoutRewards.tsx');
      assert.ok(src.includes('Scout &') && src.includes('Store'), 'Scout heading preserved');
      assert.ok(src.includes('Scout Community Royalties'), 'Scout royalties title preserved');
      assert.ok(src.includes('25 AX'), '25 AX starter bonus preserved');
      assert.ok(src.includes('2% Cash'), '2% cash win royalty preserved');
      assert.ok(src.includes('Tier AX'), 'Tier rank bonuses preserved');
      assert.ok(src.includes('In-App Digital Rewards'), 'Store title preserved');
      assert.ok(src.includes('Free Fire 100 + 10 Diamonds'), 'Diamond pack 1 preserved');
      assert.ok(src.includes('Free Fire 520 Diamonds Top-up'), 'Diamond pack 2 preserved');
      assert.ok(src.includes('Weekly Diamond Membership'), 'Weekly membership preserved');
    });

    it('preserves all Download hub copy, Android specs, iOS card, and installation steps', () => {
      const src = readProjectFile('src/components/Download.tsx');
      assert.ok(src.includes('Download ArenaX'), 'Download heading preserved');
      assert.ok(src.includes('ARENAX'), 'Echo title preserved');
      assert.ok(src.includes('Android Client'), 'Android card title preserved');
      assert.ok(src.includes('com.arenax.app'), 'Android package name preserved');
      assert.ok(src.includes('v2.6.0'), 'Android version badge preserved');
      assert.ok(src.includes('Apple iOS'), 'iOS card title preserved');
      assert.ok(src.includes('Coming Soon'), 'iOS coming soon badge preserved');
      assert.ok(src.includes('Scan on Android Phone'), 'QR code instructions preserved');
      assert.ok(src.includes('Download Direct APK'), 'APK action button preserved');
    });

    it('preserves all Standalone Pages (About, FAQ, Contact, Terms, Privacy, Refund, FairPlay)', () => {
      const about = readProjectFile('src/components/About.tsx');
      assert.ok(about.includes('Built For') && about.includes('Players'), 'About headline preserved');
      assert.ok(about.includes('Our Story'), 'About story title preserved');
      assert.ok(about.includes('01') && about.includes('Dispute-Free Competition'), 'About pillar 1 preserved');
      assert.ok(about.includes('02') && about.includes('Financial Solvency & Escrow'), 'About pillar 2 preserved');
      assert.ok(about.includes('03') && about.includes('Empowering Guild Organizers'), 'About pillar 3 preserved');
      assert.ok(about.includes('04') && about.includes('Zero-Tolerance Fair Play'), 'About pillar 4 preserved');

      const faq = readProjectFile('src/components/FAQ.tsx');
      assert.ok(faq.includes('Frequently Asked') && faq.includes('Questions'), 'FAQ headline preserved');
      assert.ok(faq.includes('Still Have Questions?'), 'FAQ support box preserved');
      assert.ok(faq.includes('Chat on WhatsApp'), 'FAQ WhatsApp action preserved');
      assert.ok(faq.includes('Email Support'), 'FAQ email action preserved');

      const contact = readProjectFile('src/components/Contact.tsx');
      assert.ok(contact.includes('Get in') && contact.includes('Touch'), 'Contact headline preserved');
      assert.ok(contact.includes('arenasupport@gmail.com'), 'Support email preserved');
      assert.ok(contact.includes('+92 336 7135319'), 'WhatsApp phone preserved');
      assert.ok(contact.includes('Send Direct Message'), 'Form title preserved');

      const terms = readProjectFile('src/components/Terms.tsx');
      assert.ok(terms.includes('Terms &') && terms.includes('Conditions'), 'Terms title preserved');
      assert.ok(terms.includes('Acceptance of Terms'), 'Terms section 1 preserved');

      const privacy = readProjectFile('src/components/Privacy.tsx');
      assert.ok(privacy.includes('Privacy') && privacy.includes('Policy'), 'Privacy title preserved');

      const refund = readProjectFile('src/components/RefundPolicy.tsx');
      assert.ok(refund.includes('100% Refund') && refund.includes('Policy'), 'Refund policy title preserved');

      const fairPlay = readProjectFile('src/components/FairPlay.tsx');
      assert.ok(fairPlay.includes('Fair Play') && fairPlay.includes('Policy'), 'Fair play title preserved');
    });

    it('preserves Footer columns, copyright, and WhatsApp FAB details', () => {
      const footer = readProjectFile('src/components/Footer.tsx');
      assert.ok(footer.includes('ArenaX'), 'Footer brand preserved');
      assert.ok(footer.includes('Navigation'), 'Footer navigation preserved');
      assert.ok(footer.includes('Legal & Rules'), 'Footer legal preserved');
      assert.ok(footer.includes('Official Channels'), 'Footer channels preserved');
      assert.ok(footer.includes('© 2026 ArenaX. All rights reserved.'), 'Footer copyright preserved');
      assert.ok(footer.includes('arenasupport@gmail.com'), 'Footer email preserved');

      const whatsapp = readProjectFile('src/components/WhatsAppButton.tsx');
      assert.ok(whatsapp.includes('+923367135319'), 'WhatsApp phone number preserved');
      assert.ok(whatsapp.includes('data-testid="whatsapp-button"'), 'WhatsApp testid preserved');
    });
  });

  // =========================================================================
  // Requirement R4: Build & Configuration Integrity
  // =========================================================================
  describe('Requirement R4: Build & Configuration Integrity', () => {
    it('verifies package.json scripts and dependencies integrity', () => {
      const pkg = JSON.parse(readProjectFile('package.json'));
      assert.ok(pkg.scripts.typecheck, 'package.json must include typecheck script');
      assert.ok(pkg.scripts.lint, 'package.json must include lint script');
      assert.ok(pkg.scripts.build, 'package.json must include build script');
      assert.ok(pkg.scripts.test, 'package.json must include test script');

      // Key dependencies
      assert.ok(pkg.dependencies.react, 'Must have react dependency');
      assert.ok(pkg.dependencies['react-dom'], 'Must have react-dom dependency');
      assert.ok(pkg.dependencies['react-router-dom'], 'Must have react-router-dom dependency');
      assert.ok(pkg.dependencies.gsap, 'Must have gsap dependency');
      assert.ok(pkg.dependencies.lenis, 'Must have lenis dependency');
      assert.ok(pkg.devDependencies.tailwindcss || pkg.dependencies.tailwindcss, 'Must have tailwindcss dependency');
    });

    it('verifies tsconfig.app.json enforces strict type safety without implicit any', () => {
      const tsconfigSrc = readProjectFile('tsconfig.app.json');
      assert.ok(tsconfigSrc.includes('"strict": true'), 'strict mode must be enabled');
      assert.ok(tsconfigSrc.includes('"noEmit": true'), 'noEmit must be true');
    });

    it('verifies vite.config.ts configuration exists and uses React plugin', () => {
      const viteConfig = readProjectFile('vite.config.ts');
      assert.ok(viteConfig.includes('@vitejs/plugin-react'), 'Vite must use @vitejs/plugin-react');
    });
  });
});
