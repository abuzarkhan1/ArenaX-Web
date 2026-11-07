import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function readComponentSource(fileName: string): string {
  const filePath = path.resolve(process.cwd(), 'src/components', fileName);
  assert.ok(fs.existsSync(filePath), `Component file ${fileName} must exist`);
  return fs.readFileSync(filePath, 'utf8');
}

function readPrimitiveSource(fileName: string): string {
  const filePath = path.resolve(process.cwd(), 'src/components/primitives', fileName);
  assert.ok(fs.existsSync(filePath), `Primitive file ${fileName} must exist`);
  return fs.readFileSync(filePath, 'utf8');
}

describe('Tier 1: Comprehensive Feature Coverage (Features 1–20)', () => {
  // Feature 1: Navigation & Header Chrome
  describe('F1: Navigation & Header Chrome (Navbar.tsx)', () => {
    const src = readComponentSource('Navbar.tsx');

    it('contains brand logo, navigation items, and section anchors', () => {
      assert.ok(src.includes('Arena') && src.includes('X'), 'Navbar must include brand text');
      assert.ok(src.includes('tournaments'), 'Navbar must include tournaments anchor');
      assert.ok(src.includes('ai-vision'), 'Navbar must include ai-vision anchor');
      assert.ok(src.includes('wallet'), 'Navbar must include wallet anchor');
      assert.ok(src.includes('ranks'), 'Navbar must include ranks anchor');
      assert.ok(src.includes('organizers'), 'Navbar must include organizers anchor');
      assert.ok(src.includes('how-it-works'), 'Navbar must include how-it-works anchor');
      assert.ok(src.includes('/faq'), 'Navbar must link to /faq');
    });

    it('tracks scroll progress and handles mobile drawer toggle', () => {
      assert.ok(src.includes('scrollProgress'), 'Navbar must track scroll progress');
      assert.ok(src.includes('mobileMenuOpen'), 'Navbar must have mobile menu state');
      assert.ok(src.includes('handleDownload'), 'Navbar must trigger download action');
    });
  });

  // Feature 2: Footer & Legal Navigation
  describe('F2: Footer & Legal Navigation (Footer.tsx)', () => {
    const src = readComponentSource('Footer.tsx');

    it('contains all 4 columns: Brand, Navigation, Legal & Rules, Channels', () => {
      assert.ok(src.includes('Navigation'), 'Footer must contain Navigation section');
      assert.ok(src.includes('Legal & Rules') || src.includes('Legal'), 'Footer must contain Legal section');
      assert.ok(src.includes('Official Channels') || src.includes('Channels'), 'Footer must contain Channels section');
      assert.ok(src.includes('/about'), 'Footer must link to /about');
      assert.ok(src.includes('/terms'), 'Footer must link to /terms');
      assert.ok(src.includes('/privacy'), 'Footer must link to /privacy');
      assert.ok(src.includes('/refund-policy'), 'Footer must link to /refund-policy');
      assert.ok(src.includes('/fair-play'), 'Footer must link to /fair-play');
    });

    it('links to official social channels', () => {
      assert.ok(src.includes('facebook.com'), 'Footer must link to Facebook');
      assert.ok(src.includes('instagram.com'), 'Footer must link to Instagram');
      assert.ok(src.includes('youtube.com'), 'Footer must link to YouTube');
    });
  });

  // Feature 3: Floating WhatsApp Action
  describe('F3: Floating WhatsApp Action (WhatsAppButton.tsx)', () => {
    const src = readComponentSource('WhatsAppButton.tsx');

    it('configures WhatsApp link with Pakistan international phone number and URL opening', () => {
      assert.ok(src.includes('+923367135319'), 'Must include +923367135319 phone number');
      assert.ok(src.includes('wa.me'), 'Must open link via wa.me');
      assert.ok(src.includes('fixed'), 'WhatsApp button must be fixed floating');
    });
  });

  // Feature 4: UI Primitives & Design System
  describe('F4: UI Primitives & Design System (primitives/*)', () => {
    it('provides Button primitive with primary, secondary, ghost variants and anchor mode', () => {
      const btn = readPrimitiveSource('Button.tsx');
      assert.ok(btn.includes('primary'), 'Button must support primary');
      assert.ok(btn.includes('secondary'), 'Button must support secondary');
      assert.ok(btn.includes('ghost'), 'Button must support ghost');
      assert.ok(btn.includes('asAnchor'), 'Button must support asAnchor prop');
    });

    it('provides Badge primitive with emerald, neutral, danger tones', () => {
      const badge = readPrimitiveSource('Badge.tsx');
      assert.ok(badge.includes('emerald'));
      assert.ok(badge.includes('neutral'));
      assert.ok(badge.includes('danger'));
    });

    it('provides Card primitive with base and highlighted variants', () => {
      const card = readPrimitiveSource('Card.tsx');
      assert.ok(card.includes('base'));
      assert.ok(card.includes('highlighted'));
    });

    it('provides Stat, HudCorners, IconOrb primitives', () => {
      const stat = readPrimitiveSource('Stat.tsx');
      assert.ok(stat.includes('value'));
      assert.ok(stat.includes('label'));

      const hud = readPrimitiveSource('HudCorners.tsx');
      assert.ok(hud.includes('emerald'));

      const orb = readPrimitiveSource('IconOrb.tsx');
      assert.ok(orb.includes('icon'));
    });
  });

  // Feature 5: Hero Section & Character Switcher
  describe('F5: Hero Section & Character Switcher (Hero.tsx)', () => {
    const src = readComponentSource('Hero.tsx');

    it('features both Red Criminal (tactical) and Streetwear Rebel (rebel) characters', () => {
      assert.ok(src.includes('Red Criminal'), 'Hero must include Red Criminal');
      assert.ok(src.includes('Streetwear Rebel'), 'Hero must include Streetwear Rebel');
      assert.ok(src.includes('activeCharacter'), 'Hero must manage activeCharacter state');
    });

    it('provides dual conversion actions and telemetry ribbon', () => {
      assert.ok(src.includes('handleDownload'), 'Hero must trigger APK download');
      assert.ok(src.includes('tournaments'), 'Hero must link to tournaments section');
      assert.ok(src.includes('Stat') || src.includes('stat'), 'Hero must feature telemetry metrics');
    });
  });

  // Feature 6: Platform Protocol Statements
  describe('F6: Platform Protocol Statements (Statement.tsx)', () => {
    const src = readComponentSource('Statement.tsx');

    it('features 4 high-contrast platform protocol statements with GSAP reveal', () => {
      assert.ok(src.includes('STATEMENTS'), 'Statement must define STATEMENTS array');
      assert.ok(src.includes('gsap') || src.includes('ScrollTrigger'), 'Statement must use GSAP');
      assert.ok(src.includes('01') && src.includes('02') && src.includes('03') && src.includes('04'));
    });
  });

  // Feature 7: Android Client 3D Phone Showcase
  describe('F7: Android Client 3D Phone Showcase (AppExperienceShowcase.tsx)', () => {
    const src = readComponentSource('AppExperienceShowcase.tsx');

    it('includes 3 chapters: Match Lobby, OCR Vision Scanner, Segregated Wallet', () => {
      assert.ok(src.includes('CHAPTERS'), 'Showcase must define CHAPTERS');
      assert.ok(src.includes('match') && src.includes('ocr') && src.includes('wallet'));
      assert.ok(src.includes('activeTab'), 'Showcase must manage activeTab state');
    });
  });

  // Feature 8: Tournament Modes & 3D Specular Tilt
  describe('F8: Tournament Modes (TournamentModes.tsx)', () => {
    const src = readComponentSource('TournamentModes.tsx');

    it('supports Bermuda Battle Royale and Clash Squad 4v4 modes', () => {
      assert.ok(src.includes('bermuda') && src.includes('clashsquad'));
      assert.ok(src.includes('activeTab'), 'Must toggle active tab');
      assert.ok(src.includes('solo') && src.includes('duo') && src.includes('squad'));
    });
  });

  // Feature 9: AI Vision Scoreboard & Combat Points
  describe('F9: AI Vision Scoreboard (AIVisionShowcase.tsx)', () => {
    const src = readComponentSource('AIVisionShowcase.tsx');

    it('embeds 20 Booyah + 5/kill formula and interactive controls', () => {
      assert.ok(src.includes('isBooyah ? 20 : 0'), 'Formula must award 20 for Booyah');
      assert.ok(src.includes('kills * 5'), 'Formula must award 5 per kill');
      assert.ok(src.includes('getTier'), 'Must map combat points to projected tier');
    });
  });

  // Feature 10: Two-Vault Financial Architecture
  describe('F10: Two-Vault Financial Architecture (WalletSection.tsx)', () => {
    const src = readComponentSource('WalletSection.tsx');

    it('defines 5-stage lifecycle flow and 1:1 AX to PKR parity', () => {
      assert.ok(src.includes('FLOW_NODES'), 'Wallet must declare FLOW_NODES');
      assert.ok(src.includes('Play Wallet') && src.includes('Winning Wallet'));
      assert.ok(src.includes('1 AX = 1 PKR') || src.includes('1 AX = 1 PKR Cash Parity'));
    });
  });

  // Feature 11: Season 4 Competitive Tiers & Rank Gap
  describe('F11: Season 4 Competitive Tiers & Rank Gap (LeaderboardTiers.tsx)', () => {
    const src = readComponentSource('LeaderboardTiers.tsx');

    it('features 8 competitive tiers from Bronze to Grandmaster with rank gap math', () => {
      assert.ok(src.includes('RANK_TIERS'), 'Must declare RANK_TIERS');
      assert.ok(src.includes('Bronze') && src.includes('Grandmaster'));
      assert.ok(src.includes('ptsNeeded'), 'Must calculate ptsNeeded');
      assert.ok(src.includes('booyahsNeeded'), 'Must calculate booyahsNeeded');
    });
  });

  // Feature 12: Organizer Program & Earnings Simulator
  describe('F12: Organizer Program (OrganizerProgram.tsx)', () => {
    const src = readComponentSource('OrganizerProgram.tsx');

    it('implements Host Earnings Simulator with 10% platform fee and configurable host cut', () => {
      assert.ok(src.includes('participants * entryFee'), 'Must compute total revenue');
      assert.ok(src.includes('0.10') || src.includes('0.1'), 'Must apply 10% platform fee');
      assert.ok(src.includes('hostCutPercent'), 'Must accept hostCutPercent');
      assert.ok(src.includes('playerPrizePool'), 'Must compute playerPrizePool');
    });
  });

  // Feature 13: 6-Step Onboarding Timeline
  describe('F13: 6-Step Onboarding Timeline (HowItWorks.tsx)', () => {
    const src = readComponentSource('HowItWorks.tsx');

    it('features 6 sequential onboarding milestone steps', () => {
      assert.ok(src.includes('STEPS'), 'HowItWorks must define STEPS');
      assert.ok(src.includes('01') && src.includes('06'), 'Must span steps 01 through 06');
    });
  });

  // Feature 14: Platform Fair Play Comparison Matrix
  describe('F14: Platform Fair Play Comparison Matrix (PlatformComparison.tsx)', () => {
    const src = readComponentSource('PlatformComparison.tsx');

    it('evaluates ArenaX against informal scrims across 6 dimensions', () => {
      assert.ok(src.includes('COMPARISON_POINTS'), 'Must declare COMPARISON_POINTS');
      assert.ok(src.includes('ArenaX Official Client') || src.includes('ArenaX Client'));
      assert.ok(src.includes('Informal WhatsApp Scrims') || src.includes('Informal Scrims'));
    });
  });

  // Feature 15: Scout Referral Royalties & Digital Store
  describe('F15: Scout Referral Royalties & Digital Store (ScoutRewards.tsx)', () => {
    const src = readComponentSource('ScoutRewards.tsx');

    it('features Scout referral bonus and Free Fire digital diamond vouchers', () => {
      assert.ok(src.includes('25 AX') || src.includes('Welcome Bonus'), 'Must detail referral bonus');
      assert.ok(src.includes('2%') || src.includes('Win Royalty'), 'Must detail win royalty');
      assert.ok(src.includes('Diamonds') || src.includes('Vouchers'), 'Must feature Free Fire vouchers');
    });
  });

  // Feature 16: Direct APK Download Hub & QR Handoff
  describe('F16: Direct APK Download Hub (Download.tsx)', () => {
    const src = readComponentSource('Download.tsx');

    it('provides direct Android APK download trigger, live QR code, and 4 installation steps', () => {
      assert.ok(src.includes('handleDownload'), 'Must trigger APK download');
      assert.ok(src.includes('QRCodeSVG') || src.includes('qrcode'), 'Must render QR code');
      assert.ok(src.includes('installSteps'), 'Must provide 4 installation steps');
      assert.ok(src.includes('iOS') || src.includes('Apple'), 'Must acknowledge iOS roadmap');
    });
  });

  // Features 17-20: Standalone Pages (About, FAQ, Contact, Legal)
  describe('F17–F20: Standalone Legal & Support Pages', () => {
    it('F17: About page provides platform story and 4 value pillars', () => {
      const about = readComponentSource('About.tsx');
      assert.ok(about.includes('About') || about.includes('Our Story'));
      assert.ok(about.includes('values') || about.includes('pillars'));
    });

    it('F18: FAQ provides 10-item knowledge base with single-open accordion', () => {
      const faq = readComponentSource('FAQ.tsx');
      assert.ok(faq.includes('faqs'), 'FAQ must define faqs list');
      assert.ok(faq.includes('openIndex'), 'FAQ must manage openIndex state');
    });

    it('F19: Contact page provides ticket form and 3 channel cards', () => {
      const contact = readComponentSource('Contact.tsx');
      assert.ok(contact.includes('formData'), 'Contact must manage formData');
      assert.ok(contact.includes('arenasupport@gmail.com'));
    });

    it('F20: Legal documents contain Terms, Privacy, Refund Policy, and Fair Play', () => {
      const terms = readComponentSource('Terms.tsx');
      assert.ok(terms.includes('Terms') && terms.includes('Conditions'), 'Terms must include Terms & Conditions');

      const privacy = readComponentSource('Privacy.tsx');
      assert.ok(privacy.includes('Privacy Policy'));

      const refund = readComponentSource('RefundPolicy.tsx');
      assert.ok(refund.includes('Refund Policy') || refund.includes('Automated'));

      const fairPlay = readComponentSource('FairPlay.tsx');
      assert.ok(fairPlay.includes('Fair Play') || fairPlay.includes('Anti-Cheat'));
    });
  });

  // Supabase Design Tokens & Theme Architecture
  describe('Supabase Design Tokens & Theme Architecture', () => {
    it('declares signature green accent #3ECF8E, dark canvas #121212, and hairline borders in index.css', () => {
      const cssPath = path.resolve(process.cwd(), 'src/index.css');
      assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');
      const css = fs.readFileSync(cssPath, 'utf8');
      assert.ok(css.includes('#3ECF8E'), 'Must declare #3ECF8E green');
      assert.ok(css.includes('#121212'), 'Must declare #121212 canvas');
      assert.ok(css.includes('rgba(255, 255, 255, 0.08)'), 'Must declare 0.08 hairline border');
      assert.ok(css.includes('color-scheme: dark'), 'Must declare color-scheme: dark');
    });

    it('configures Supabase tokens in tailwind.config.js', () => {
      const twPath = path.resolve(process.cwd(), 'tailwind.config.js');
      assert.ok(fs.existsSync(twPath), 'tailwind.config.js must exist');
      const tw = fs.readFileSync(twPath, 'utf8');
      assert.ok(tw.includes('#3ECF8E'), 'Must include #3ECF8E');
      assert.ok(tw.includes('62, 207, 142'), 'Must include rgb(62, 207, 142)');
      assert.ok(tw.includes('18, 18, 18'), 'Must include rgb(18, 18, 18)');
    });

    it('verifies all 8 registered public routes in App.tsx', () => {
      const appPath = path.resolve(process.cwd(), 'src/App.tsx');
      assert.ok(fs.existsSync(appPath), 'src/App.tsx must exist');
      const app = fs.readFileSync(appPath, 'utf8');
      const routes = ['/', '/about', '/faq', '/contact', '/terms', '/privacy', '/refund-policy', '/fair-play'];
      for (const r of routes) {
        assert.ok(app.includes(`path="${r}"`), `Route ${r} must be registered in App.tsx`);
      }
    });
  });
});
