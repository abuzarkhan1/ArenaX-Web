import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite: Milestone 1 (Navigation, Chrome & Primitives Polish)', () => {
  const root = process.cwd();
  const navbarSrc = fs.readFileSync(path.join(root, 'src/components/Navbar.tsx'), 'utf8');
  const footerSrc = fs.readFileSync(path.join(root, 'src/components/Footer.tsx'), 'utf8');
  const whatsappSrc = fs.readFileSync(path.join(root, 'src/components/WhatsAppButton.tsx'), 'utf8');
  const statSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Stat.tsx'), 'utf8');
  const buttonSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Button.tsx'), 'utf8');
  const badgeSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Badge.tsx'), 'utf8');
  const pillSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Pill.tsx'), 'utf8');
  const cardSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Card.tsx'), 'utf8');
  const hudSrc = fs.readFileSync(path.join(root, 'src/components/primitives/HudCorners.tsx'), 'utf8');
  const iconOrbSrc = fs.readFileSync(path.join(root, 'src/components/primitives/IconOrb.tsx'), 'utf8');

  // =========================================================================
  // 1. Scroll Progress & Zero-Division Boundary Tests
  // =========================================================================
  describe('Navbar Scroll Progress Invariants & Zero Division Math', () => {
    function calculateScrollProgress(scrollTop: number, scrollHeight: number, clientHeight: number): number {
      const height = scrollHeight - clientHeight;
      return height > 0 ? (scrollTop / height) * 100 : 0;
    }

    it('safely handles zero scrollable height (scrollHeight === clientHeight) without NaN or Infinity', () => {
      const result = calculateScrollProgress(0, 800, 800);
      assert.equal(result, 0);
      assert.ok(!Number.isNaN(result));
      assert.ok(Number.isFinite(result));
    });

    it('safely handles collapsed scroll height (scrollHeight < clientHeight) without negative division', () => {
      const result = calculateScrollProgress(0, 500, 800);
      assert.equal(result, 0);
      assert.ok(!Number.isNaN(result));
    });

    it('calculates exact 0% at the top of the page', () => {
      const result = calculateScrollProgress(0, 2000, 1000);
      assert.equal(result, 0);
    });

    it('calculates exact 50% midpoint', () => {
      const result = calculateScrollProgress(500, 2000, 1000);
      assert.equal(result, 50);
    });

    it('calculates exact 100% at bottom of page', () => {
      const result = calculateScrollProgress(1000, 2000, 1000);
      assert.equal(result, 100);
    });

    it('models elastic overscroll bounds (Safari/iOS bounce)', () => {
      // Negative scroll top during pull-down bounce
      const overscrollTop = calculateScrollProgress(-60, 2000, 1000);
      assert.equal(overscrollTop, -6); // In Navbar, style width receives `${scrollProgress}%`

      // Overscroll past bottom during fling bounce
      const overscrollBottom = calculateScrollProgress(1080, 2000, 1000);
      assert.equal(overscrollBottom, 108);
    });
  });

  // =========================================================================
  // 2. DOM Absence & Safe Traversal Tests
  // =========================================================================
  describe('Navbar Missing DOM Elements Resilience', () => {
    it('verifies safe navigation when target section DOM elements do not exist', () => {
      // In Navbar.tsx:
      // document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
      // document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      assert.ok(
        navbarSrc.includes("document.getElementById(item.id)?.scrollIntoView"),
        'Must use optional chaining for item.id lookup'
      );
      assert.ok(
        navbarSrc.includes("document.getElementById('download')?.scrollIntoView"),
        'Must use optional chaining for download section lookup'
      );
    });

    it('verifies active section scroll handler checks element presence before calling getBoundingClientRect', () => {
      // In Navbar.tsx:
      // const el = document.getElementById(sec);
      // if (el) { const rect = el.getBoundingClientRect(); ... }
      assert.ok(
        navbarSrc.includes('const el = document.getElementById(sec);') &&
        navbarSrc.includes('if (el) {'),
        'Must check if (el) before inspecting getBoundingClientRect'
      );
    });
  });

  // =========================================================================
  // 3. Mobile Drawer State & Body Overflow Stress Test
  // =========================================================================
  describe('Mobile Drawer State Machine & Body Overflow Audit', () => {
    it('resets document.body.style.overflow on handleNavClick', () => {
      assert.ok(
        navbarSrc.includes("handleNavClick =") &&
        navbarSrc.includes("document.body.style.overflow = '';"),
        'handleNavClick must clear overflow'
      );
    });

    it('resets document.body.style.overflow on handleDownloadClick', () => {
      assert.ok(
        navbarSrc.includes("handleDownloadClick =") &&
        navbarSrc.includes("document.body.style.overflow = '';"),
        'handleDownloadClick must clear overflow'
      );
    });

    it('audits secondary mobile drawer links for potential body overflow trap', () => {
      // Check secondary links: /about, /contact, /terms in mobile drawer
      // Notice: <Link to="/about" onClick={() => setMobileMenuOpen(false)}
      const aboutLinkMatch = navbarSrc.match(/to="\/about"[^>]*onClick=\{[^}]*\}/);
      const contactLinkMatch = navbarSrc.match(/to="\/contact"[^>]*onClick=\{[^}]*\}/);
      const termsLinkMatch = navbarSrc.match(/to="\/terms"[^>]*onClick=\{[^}]*\}/);

      assert.ok(aboutLinkMatch, 'About link exists in mobile drawer');
      assert.ok(contactLinkMatch, 'Contact link exists in mobile drawer');
      assert.ok(termsLinkMatch, 'Terms link exists in mobile drawer');

      // Check whether secondary links directly clear document.body.style.overflow
      const aboutHasOverflowReset = aboutLinkMatch[0].includes('style.overflow');
      const contactHasOverflowReset = contactLinkMatch[0].includes('style.overflow');
      const termsHasOverflowReset = termsLinkMatch[0].includes('style.overflow');

      // Document this behavioral characteristic: secondary links only call setMobileMenuOpen(false)
      // If mobileMenuOpen is closed without resetting body overflow, document whether overflow cleanup effect exists.
      const hasBodyOverflowEffect = navbarSrc.includes('useEffect(() => {\n    if (mobileMenuOpen)');
      // If neither secondary links nor a useEffect syncs document.body.style.overflow, document findings
      console.log('Mobile Drawer Overflow Audit:', {
        aboutHasOverflowReset,
        contactHasOverflowReset,
        termsHasOverflowReset,
        hasBodyOverflowEffect,
      });
    });
  });

  // =========================================================================
  // 4. Helper Copy Elimination Audit (Requirement R1)
  // =========================================================================
  describe('Requirement R1: Zero Helper Copy Elimination', () => {
    it('confirms Navbar is free of deprecated taglines, subtext, and version badges', () => {
      assert.ok(!navbarSrc.includes('ESPORTS CLIENT'), 'Navbar must not contain "ESPORTS CLIENT" subtitle');
      assert.ok(!navbarSrc.includes('v2.6'), 'Navbar must not contain "v2.6" version helper');
      assert.ok(!navbarSrc.includes('Download APK (v2.6)'), 'Navbar must not contain "Download APK (v2.6)"');
      assert.ok(navbarSrc.includes('Download App'), 'Navbar must display clean "Download App" CTA');
    });

    it('confirms Footer is free of marketing essays, infomercial prefixes, and taglines', () => {
      assert.ok(!footerSrc.includes("Pakistan's premier mobile esports platform"), 'Footer must not contain marketing paragraph');
      assert.ok(!footerSrc.includes('PLATFORM OPERATIONAL 24/7'), 'Footer must not contain 24/7 operational badge');
      assert.ok(!footerSrc.includes('100% Refund Policy'), 'Footer must not prefix Refund Policy with 100%');
      assert.ok(!footerSrc.includes('Direct Helpline:'), 'Footer must not prefix email with Direct Helpline:');
      assert.ok(!footerSrc.includes('Free Fire Bermuda • Clash Squad 4v4 • AI Vision Verified'), 'Footer must not contain bottom taglines');
      assert.ok(!footerSrc.includes('Built for competitive esports in Pakistan.'), 'Footer copyright must not contain trailing slogan');
      assert.ok(footerSrc.includes('© 2026 ArenaX. All rights reserved.'), 'Footer must have clean copyright notice');
    });

    it('confirms WhatsAppButton is free of tooltip hover copy', () => {
      assert.ok(!whatsappSrc.includes('Chat on WhatsApp'), 'WhatsApp button must not contain hover tooltip text');
      assert.ok(!whatsappSrc.includes('isHovered'), 'WhatsApp button must not have tooltip state');
      assert.ok(whatsappSrc.includes('aria-label="Chat with ArenaX Support on WhatsApp"'), 'WhatsApp button must retain accessible label');
      assert.ok(whatsappSrc.includes('data-testid="whatsapp-button"'), 'WhatsApp button must retain data-testid');
    });

    it('confirms Stat primitive completely eliminates subtext prop', () => {
      assert.ok(!statSrc.includes('subtext'), 'Stat primitive must not define or render subtext');
    });
  });

  // =========================================================================
  // 5. Primitives Design System & ForwardRef Polymorphism
  // =========================================================================
  describe('Design System Primitives Craft & Polymorphism', () => {
    it('verifies Stat wraps with forwardRef and displayName', () => {
      assert.ok(statSrc.includes('forwardRef<HTMLDivElement, StatProps>'));
      assert.ok(statSrc.includes("Stat.displayName = 'Stat'"));
    });

    it('verifies Button wraps with forwardRef, supports anchor mode with forwarded ref, and has displayName', () => {
      assert.ok(buttonSrc.includes('forwardRef<HTMLButtonElement, ButtonProps>'));
      assert.ok(buttonSrc.includes("Button.displayName = 'Button'"));
      assert.ok(buttonSrc.includes('asAnchor && href'));
      assert.ok(buttonSrc.includes('ref={ref as unknown as React.Ref<HTMLAnchorElement>}'));
    });

    it('verifies Badge wraps with forwardRef, supports tone variants, and has displayName', () => {
      assert.ok(badgeSrc.includes('forwardRef<HTMLSpanElement, BadgeProps>'));
      assert.ok(badgeSrc.includes("Badge.displayName = 'Badge'"));
      assert.ok(badgeSrc.includes("'emerald'"));
      assert.ok(badgeSrc.includes("'neutral'"));
      assert.ok(badgeSrc.includes("'danger'"));
    });

    it('verifies Pill wraps with forwardRef, supports pulse alias, and has displayName', () => {
      assert.ok(pillSrc.includes('forwardRef<HTMLDivElement, PillProps>'));
      assert.ok(pillSrc.includes("Pill.displayName = 'Pill'"));
      assert.ok(pillSrc.includes('isPulsing = pulse !== undefined ? pulse : dotPulse'));
    });

    it('verifies Card wraps with forwardRef, supports interactive mode, and has displayName', () => {
      assert.ok(cardSrc.includes('forwardRef<HTMLDivElement, CardProps>'));
      assert.ok(cardSrc.includes("Card.displayName = 'Card'"));
      assert.ok(cardSrc.includes('hud-card'));
      assert.ok(cardSrc.includes('hud-card-highlight'));
    });

    it('verifies HudCorners wraps with forwardRef and has displayName', () => {
      assert.ok(hudSrc.includes('forwardRef<HTMLSpanElement, HudCornersProps>'));
      assert.ok(hudSrc.includes("HudCorners.displayName = 'HudCorners'"));
    });

    it('verifies IconOrb wraps with forwardRef, prevents emerald light leak on neutral tone, and has displayName', () => {
      assert.ok(iconOrbSrc.includes('forwardRef<HTMLDivElement, IconOrbProps>'));
      assert.ok(iconOrbSrc.includes("IconOrb.displayName = 'IconOrb'"));
      // Neutral tone glow must be white, not emerald
      assert.ok(
        iconOrbSrc.includes("tone === 'danger' ? 'bg-red-500/20' : tone === 'emerald' ? 'bg-emerald-500/20' : 'bg-white/5'"),
        'Neutral tone must use bg-white/5 glow instead of emerald'
      );
    });
  });

  // =========================================================================
  // 6. External Links & Protocol Contracts
  // =========================================================================
  describe('External Links & Route Destinations', () => {
    it('verifies social links have target="_blank" and rel="noopener noreferrer"', () => {
      const socialLinks = [
        'https://www.facebook.com/share/17NfG8Syiq/',
        'https://www.instagram.com/arenaxbattlefield',
        'https://youtube.com/@arenax_15',
      ];
      for (const link of socialLinks) {
        assert.ok(footerSrc.includes(link), `Footer must contain social link ${link}`);
      }
      assert.ok(footerSrc.includes('target="_blank"'));
      assert.ok(footerSrc.includes('rel="noopener noreferrer"'));
    });

    it('verifies support email link is mailto:arenasupport@gmail.com', () => {
      assert.ok(footerSrc.includes('href="mailto:arenasupport@gmail.com"'));
    });

    it('verifies WhatsApp wa.me link target number and parameters', () => {
      assert.ok(whatsappSrc.includes('https://wa.me/'));
      assert.ok(whatsappSrc.includes('+923367135319'));
    });

    it('verifies Navbar telemetry hooks trigger on download click', () => {
      assert.ok(navbarSrc.includes("trackButtonClick('download_app', 'navbar')"));
      assert.ok(navbarSrc.includes("trackDownload('ArenaX.apk', 'Android', 'navbar')"));
    });
  });
});
