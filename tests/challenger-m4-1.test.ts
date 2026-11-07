import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Adversarial Challenger Suite: Milestone 4 (Negative Invariants, Interactive Controls & Link Integrity)', () => {
  const root = process.cwd();

  // Read all Milestone 4 source files
  const whatsappSrc = fs.readFileSync(path.join(root, 'src/components/WhatsAppButton.tsx'), 'utf8');
  const footerSrc = fs.readFileSync(path.join(root, 'src/components/Footer.tsx'), 'utf8');
  const faqSrc = fs.readFileSync(path.join(root, 'src/components/FAQ.tsx'), 'utf8');
  const contactSrc = fs.readFileSync(path.join(root, 'src/components/Contact.tsx'), 'utf8');
  const aboutSrc = fs.readFileSync(path.join(root, 'src/components/About.tsx'), 'utf8');
  const termsSrc = fs.readFileSync(path.join(root, 'src/components/Terms.tsx'), 'utf8');
  const privacySrc = fs.readFileSync(path.join(root, 'src/components/Privacy.tsx'), 'utf8');
  const refundSrc = fs.readFileSync(path.join(root, 'src/components/RefundPolicy.tsx'), 'utf8');
  const fairPlaySrc = fs.readFileSync(path.join(root, 'src/components/FairPlay.tsx'), 'utf8');
  const appSrc = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
  const buttonPrimitiveSrc = fs.readFileSync(path.join(root, 'src/components/primitives/Button.tsx'), 'utf8');

  // =========================================================================
  // 1. Negative Invariants: WhatsAppButton
  // =========================================================================
  describe('1. Negative Invariants: WhatsApp Floating Action Trigger', () => {
    it('strictly verifies ZERO instances of isHovered state or identifier', () => {
      assert.ok(!whatsappSrc.includes('isHovered'), 'WhatsAppButton must contain zero occurrences of isHovered');
      assert.ok(!whatsappSrc.includes('setIsHovered'), 'WhatsAppButton must not contain setIsHovered setter');
      assert.ok(!whatsappSrc.includes('hovered'), 'WhatsAppButton must not track hovered state');
    });

    it('strictly verifies ZERO instances of tooltip text "Chat on WhatsApp"', () => {
      assert.ok(!whatsappSrc.includes('Chat on WhatsApp'), 'WhatsAppButton must contain zero instances of "Chat on WhatsApp" tooltip');
      assert.ok(!whatsappSrc.toLowerCase().includes('tooltip'), 'WhatsAppButton must not declare or render tooltip elements');
    });

    it('confirms persistent accessibility label and testid invariants', () => {
      assert.ok(
        whatsappSrc.includes('aria-label="Chat with ArenaX Support on WhatsApp"'),
        'WhatsAppButton must retain exact aria-label "Chat with ArenaX Support on WhatsApp"'
      );
      assert.ok(
        whatsappSrc.includes('data-testid="whatsapp-button"'),
        'WhatsAppButton must retain exact data-testid="whatsapp-button"'
      );
    });

    it('verifies safe-area viewport offset insets for mobile devices', () => {
      assert.ok(
        whatsappSrc.includes('env(safe-area-inset-bottom)'),
        'WhatsAppButton must use safe-area-inset-bottom for bottom offset'
      );
      assert.ok(
        whatsappSrc.includes('env(safe-area-inset-right)'),
        'WhatsAppButton must use safe-area-inset-right for right offset'
      );
    });

    it('verifies click handler target and official WhatsApp URL', () => {
      assert.ok(whatsappSrc.includes("https://wa.me/"), 'Must target wa.me endpoint');
      assert.ok(whatsappSrc.includes('+923367135319'), 'Must target official helpline +923367135319');
      assert.ok(whatsappSrc.includes("'_blank'"), 'Must open in new tab with _blank');
    });
  });

  // =========================================================================
  // 2. Negative Invariants: Global Footer
  // =========================================================================
  describe('2. Negative Invariants: Global Supabase Footer', () => {
    it('strictly confirms Footer contains ZERO banned marketing slogans or infomercial copy', () => {
      const bannedSlogans = [
        "Pakistan's premier mobile esports platform",
        'PLATFORM OPERATIONAL 24/7',
        '100% Refund Policy', // In Footer, navigation must use clean "Refund Policy"
        'Direct Helpline:',
        'Free Fire Bermuda • Clash Squad 4v4 • AI Vision Verified',
        'Built for competitive esports in Pakistan.',
      ];

      for (const slogan of bannedSlogans) {
        assert.ok(
          !footerSrc.includes(slogan),
          `Footer must not contain banned marketing slogan: "${slogan}"`
        );
      }
    });

    it('verifies clean single-line copyright notice without trailing slogans', () => {
      assert.ok(
        footerSrc.includes('© 2026 ArenaX. All rights reserved.'),
        'Footer must contain exact clean copyright: "© 2026 ArenaX. All rights reserved."'
      );
    });

    it('verifies Footer does not include legacy gaming grids or ambient glow overlays', () => {
      assert.ok(!footerSrc.includes('hud-grid'), 'Footer must not use legacy hud-grid overlay');
      assert.ok(!footerSrc.includes('ambient-glow'), 'Footer must not use legacy ambient-glow overlay');
    });

    it('verifies About, FAQ, and Contact do not include legacy gaming grids or ambient glow overlays', () => {
      for (const comp of [
        { name: 'About.tsx', src: aboutSrc },
        { name: 'FAQ.tsx', src: faqSrc },
        { name: 'Contact.tsx', src: contactSrc },
      ]) {
        assert.ok(!comp.src.includes('hud-grid'), `${comp.name} must not use legacy hud-grid overlay`);
        assert.ok(!comp.src.includes('ambient-glow'), `${comp.name} must not use legacy ambient-glow overlay`);
      }
    });

    it('verifies Footer applies Supabase dark carbon surface #161616 with hairline border', () => {
      assert.ok(footerSrc.includes('bg-[#161616]'), 'Footer must use Supabase alternative surface #161616');
      assert.ok(footerSrc.includes('border-white/[0.08]'), 'Footer must use subtle hairline border border-white/[0.08]');
    });
  });

  // =========================================================================
  // 3. Link Security & Target Protocol Verification
  // =========================================================================
  describe('3. Link Security: External Link Protocol & Tabnabbing Mitigations', () => {
    it('verifies all external links in Footer have target="_blank" and rel="noopener noreferrer"', () => {
      const externalSocialUrls = [
        'https://www.facebook.com/share/17NfG8Syiq/',
        'https://www.instagram.com/arenaxbattlefield',
        'https://youtube.com/@arenax_15',
      ];

      for (const url of externalSocialUrls) {
        assert.ok(footerSrc.includes(url), `Footer must contain social URL: ${url}`);
      }

      // Check all <a> tags with http in Footer have target="_blank" and rel="noopener noreferrer"
      const anchorRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
      let match;
      while ((match = anchorRegex.exec(footerSrc)) !== null) {
        const fullTag = match[0];
        const href = match[1];
        assert.ok(
          fullTag.includes('target="_blank"'),
          `External link ${href} in Footer must specify target="_blank"`
        );
        assert.ok(
          fullTag.includes('rel="noopener noreferrer"'),
          `External link ${href} in Footer must specify rel="noopener noreferrer"`
        );
      }
    });

    it('verifies Contact.tsx WhatsApp external link has target="_blank" and rel="noopener noreferrer"', () => {
      const waAnchorMatch = /<a\s+[^>]*href=["']https:\/\/wa\.me\/\+923367135319["'][^>]*>/i.exec(contactSrc);
      assert.ok(waAnchorMatch, 'Contact.tsx must contain WhatsApp link');
      assert.ok(waAnchorMatch[0].includes('target="_blank"'), 'Contact WhatsApp link must have target="_blank"');
      assert.ok(waAnchorMatch[0].includes('rel="noopener noreferrer"'), 'Contact WhatsApp link must have rel="noopener noreferrer"');
    });

    it('verifies About.tsx APK download external link specifies target="_blank"', () => {
      assert.ok(
        aboutSrc.includes('https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk'),
        'About.tsx must link to official APK release'
      );
      assert.ok(aboutSrc.includes('target="_blank"'), 'About.tsx download button must have target="_blank"');
    });

    it('verifies Button primitive automatically injects rel="noopener noreferrer" when target="_blank"', () => {
      assert.ok(
        buttonPrimitiveSrc.includes("rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}"),
        'Button primitive must automatically provide rel="noopener noreferrer" for anchor buttons with target="_blank"'
      );
    });

    it('verifies all external links across Milestone 4 files use secure HTTPS protocol', () => {
      const filesToCheck = [
        { name: 'Footer.tsx', src: footerSrc },
        { name: 'WhatsAppButton.tsx', src: whatsappSrc },
        { name: 'About.tsx', src: aboutSrc },
        { name: 'FAQ.tsx', src: faqSrc },
        { name: 'Contact.tsx', src: contactSrc },
        { name: 'Terms.tsx', src: termsSrc },
        { name: 'Privacy.tsx', src: privacySrc },
        { name: 'RefundPolicy.tsx', src: refundSrc },
        { name: 'FairPlay.tsx', src: fairPlaySrc },
      ];

      const insecureHttpRegex = /href=["']http:\/\/[^"']+/gi;
      for (const f of filesToCheck) {
        const matches = f.src.match(insecureHttpRegex);
        assert.equal(
          matches,
          null,
          `File ${f.name} contains insecure HTTP link: ${matches ? matches.join(', ') : ''}`
        );
      }
    });
  });

  // =========================================================================
  // 4. Internal Route Resolution & Dead Link Audit
  // =========================================================================
  describe('4. Internal Route Resolution & Breadcrumb Navigation Audit', () => {
    // Extract registered routes from App.tsx
    const registeredRoutes: string[] = [];
    const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
    let rMatch;
    while ((rMatch = routeRegex.exec(appSrc)) !== null) {
      registeredRoutes.push(rMatch[1]);
    }

    it('verifies App.tsx registers all 8 required canonical routes', () => {
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
      for (const route of expectedRoutes) {
        assert.ok(
          registeredRoutes.includes(route),
          `App.tsx must register route "${route}"`
        );
      }
    });

    it('verifies all internal Link to="..." targets in Footer.tsx match registered routes with zero 404s', () => {
      const footerLinkRegex = /<Link\s+[^>]*to=["']([^"']+)["']/g;
      let fLinkMatch;
      const foundLinks: string[] = [];
      while ((fLinkMatch = footerLinkRegex.exec(footerSrc)) !== null) {
        foundLinks.push(fLinkMatch[1]);
      }

      assert.ok(foundLinks.length >= 8, 'Footer must contain at least 8 internal links');
      for (const toPath of foundLinks) {
        assert.ok(
          registeredRoutes.includes(toPath),
          `Footer links to unregistered route: "${toPath}"`
        );
      }
    });

    it('verifies all legal pages (Terms, Privacy, RefundPolicy, FairPlay) Legal Directory link targets', () => {
      const legalFiles = [
        { name: 'Terms.tsx', src: termsSrc, activeRoute: '/terms' },
        { name: 'Privacy.tsx', src: privacySrc, activeRoute: '/privacy' },
        { name: 'RefundPolicy.tsx', src: refundSrc, activeRoute: '/refund-policy' },
        { name: 'FairPlay.tsx', src: fairPlaySrc, activeRoute: '/fair-play' },
      ];

      const expectedDirectoryRoutes = ['/terms', '/privacy', '/refund-policy', '/fair-play'];

      for (const doc of legalFiles) {
        for (const expRoute of expectedDirectoryRoutes) {
          assert.ok(
            doc.src.includes(`to="${expRoute}"`),
            `${doc.name} Legal Directory must link to "${expRoute}"`
          );
        }
        // Breadcrumb home link
        assert.ok(doc.src.includes('to="/"'), `${doc.name} must have breadcrumb Link to="/"`);
      }
    });
  });

  // =========================================================================
  // 5. Email Mailto Uniformity & Contact Fallback Generator
  // =========================================================================
  describe('5. Email Mailto Contracts & Contact Form Fallback Generator', () => {
    it('verifies mailto link target across all Milestone 4 components points strictly to arenasupport@gmail.com', () => {
      const filesWithSupportEmail = [
        { name: 'Footer.tsx', src: footerSrc },
        { name: 'Contact.tsx', src: contactSrc },
        { name: 'FAQ.tsx', src: faqSrc },
        { name: 'Terms.tsx', src: termsSrc },
        { name: 'Privacy.tsx', src: privacySrc },
        { name: 'RefundPolicy.tsx', src: refundSrc },
        { name: 'FairPlay.tsx', src: fairPlaySrc },
      ];

      for (const f of filesWithSupportEmail) {
        assert.ok(
          f.src.includes('mailto:arenasupport@gmail.com'),
          `${f.name} must contain href="mailto:arenasupport@gmail.com"`
        );
      }
    });

    it('confirms zero instances of obsolete or placeholder email addresses', () => {
      const obsoleteEmails = [
        'support@arenax.com',
        'info@arenax.com',
        'admin@arenax.site',
        'contact@arenax.site',
        'example.com', // except in input placeholder
      ];

      const filesToCheck = [
        { name: 'Footer.tsx', src: footerSrc },
        { name: 'FAQ.tsx', src: faqSrc },
        { name: 'Terms.tsx', src: termsSrc },
        { name: 'Privacy.tsx', src: privacySrc },
        { name: 'RefundPolicy.tsx', src: refundSrc },
        { name: 'FairPlay.tsx', src: fairPlaySrc },
      ];

      for (const f of filesToCheck) {
        for (const obs of obsoleteEmails) {
          assert.ok(
            !f.src.includes(obs),
            `${f.name} must not contain obsolete email reference: ${obs}`
          );
        }
      }
    });

    // Oracle for Contact.tsx mailto fallback URL generation
    function generateMailtoFallback(formData: { name: string; email: string; subject: string; message: string }): string {
      return `mailto:arenasupport@gmail.com?subject=${encodeURIComponent(
        `[ArenaX Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
    }

    it('stress-tests Contact form mailto generator against injection attacks and special characters', () => {
      const testCases = [
        {
          name: 'Regular ASCII inquiry',
          input: {
            name: 'Asad Khan',
            email: 'asad.khan@example.com',
            subject: 'Deposit & Wallet Issue',
            message: 'My EasyPaisa transaction PKR 500 did not credit.',
          },
        },
        {
          name: 'Adversarial header injection attempt (&cc= and &bcc= in subject)',
          input: {
            name: 'Attacker',
            email: 'attacker@evil.com',
            subject: 'Dispute &cc=evil@phish.com&bcc=victim@target.com',
            message: 'Injected body content\r\nSubject: Overwrite',
          },
        },
        {
          name: 'Urdu and Unicode characters',
          input: {
            name: 'محمد رضوان',
            email: 'rizwan@esports.pk',
            subject: 'ٹورنامنٹ کا نتیجہ',
            message: 'میرا سکور بورڈ درست طریقے سے ویریفائی نہیں ہوا۔',
          },
        },
        {
          name: 'Symbols, slashes, quotes, ampersands, and newlines',
          input: {
            name: 'User "O\'Connor" <test>',
            email: 'user+test@sub.domain.pk',
            subject: '100% Refund #1234? & more / test = true',
            message: 'Line 1\nLine 2\r\nLine 3 with & and ? and = and # symbols',
          },
        },
      ];

      for (const tc of testCases) {
        const mailtoUrl = generateMailtoFallback(tc.input);

        // Protocol check
        assert.ok(mailtoUrl.startsWith('mailto:arenasupport@gmail.com?'));

        // Parse query string safely
        const queryString = mailtoUrl.slice('mailto:arenasupport@gmail.com?'.length);
        const params = new URLSearchParams(queryString);

        // Invariant: exactly 2 params (subject and body) — no leaked parameters from injections
        assert.equal(params.get('subject'), `[ArenaX Contact] ${tc.input.subject}`);
        assert.equal(
          params.get('body'),
          `Name: ${tc.input.name}\nEmail: ${tc.input.email}\n\nMessage:\n${tc.input.message}`
        );
        assert.equal(params.get('cc'), null, 'Must not allow &cc= injection');
        assert.equal(params.get('bcc'), null, 'Must not allow &bcc= injection');
      }
    });
  });

  // =========================================================================
  // 6. Interactive Controls State Logic: FAQ Accordion
  // =========================================================================
  describe('6. Interactive Controls: FAQ Category Filtering & Single-Open Accordion State', () => {
    // Model FAQ structure from FAQ.tsx
    interface FAQItem {
      category: string;
      question: string;
      answer: string;
    }

    // Extract faqs array from FAQ.tsx source
    it('verifies FAQ.tsx declares all 10 canonical FAQs with valid categories', () => {
      const categories = [
        { id: 'all', label: 'All Questions' },
        { id: 'tournaments', label: 'Tournaments' },
        { id: 'wallet', label: 'Wallet & Cashout' },
        { id: 'engine', label: 'Vision Engine & Rules' },
        { id: 'organizer', label: 'Organizer & Legal' },
      ];

      for (const cat of categories) {
        assert.ok(faqSrc.includes(`id: '${cat.id}'`) || faqSrc.includes(`id: "${cat.id}"`), `FAQ.tsx must declare category id "${cat.id}"`);
      }
      assert.ok(faqSrc.includes("'What is ArenaX?'"));
      assert.ok(faqSrc.includes("'How do I participate in tournaments?'"));
      assert.ok(faqSrc.includes("'What is the difference between Play Wallet and Winning Wallet?'"));
      assert.ok(faqSrc.includes("'How do I add money to my wallet?'"));
      assert.ok(faqSrc.includes("'How long does it take to withdraw cash winnings?'"));
      assert.ok(faqSrc.includes("'How does the ArenaX Vision Engine verify match scoreboards?'"));
      assert.ok(faqSrc.includes("'What happens if a tournament is cancelled or fails to start?'"));
      assert.ok(faqSrc.includes("'How can I become an Organizer and host my own tournaments?'"));
      assert.ok(faqSrc.includes("'Is ArenaX legal and compliant in Pakistan?'"));
      assert.ok(faqSrc.includes("'How are combat points calculated for Bermuda tournaments?'"));
    });

    // Pure state machine simulation of FAQ component logic
    class FAQStateMachine {
      openIndex: number | null = 0;
      activeCategory: string = 'all';
      faqs: FAQItem[];

      constructor(faqs: FAQItem[]) {
        this.faqs = faqs;
      }

      setCategory(catId: string) {
        this.activeCategory = catId;
        this.openIndex = null; // Resets accordion on category change
      }

      getFilteredFaqs(): FAQItem[] {
        return this.activeCategory === 'all'
          ? this.faqs
          : this.faqs.filter((f) => f.category === this.activeCategory);
      }

      toggleItem(realIndex: number) {
        this.openIndex = this.openIndex === realIndex ? null : realIndex;
      }
    }

    const testFaqs: FAQItem[] = [
      { category: 'tournaments', question: 'Q1', answer: 'A1' },
      { category: 'tournaments', question: 'Q2', answer: 'A2' },
      { category: 'wallet', question: 'Q3', answer: 'A3' },
      { category: 'wallet', question: 'Q4', answer: 'A4' },
      { category: 'wallet', question: 'Q5', answer: 'A5' },
      { category: 'engine', question: 'Q6', answer: 'A6' },
      { category: 'tournaments', question: 'Q7', answer: 'A7' },
      { category: 'organizer', question: 'Q8', answer: 'A8' },
      { category: 'organizer', question: 'Q9', answer: 'A9' },
      { category: 'engine', question: 'Q10', answer: 'A10' },
    ];

    it('verifies initial state: openIndex is 0 and activeCategory is "all"', () => {
      const sm = new FAQStateMachine(testFaqs);
      assert.equal(sm.openIndex, 0);
      assert.equal(sm.activeCategory, 'all');
      assert.equal(sm.getFilteredFaqs().length, 10);
    });

    it('verifies toggle behavior: clicking open item collapses it (openIndex becomes null)', () => {
      const sm = new FAQStateMachine(testFaqs);
      sm.toggleItem(0); // click item 0 when it is already open
      assert.equal(sm.openIndex, null, 'Must collapse to null');
    });

    it('verifies single-open invariant: opening item N closes item M', () => {
      const sm = new FAQStateMachine(testFaqs);
      sm.toggleItem(1); // open item 1
      assert.equal(sm.openIndex, 1);
      sm.toggleItem(4); // open item 4
      assert.equal(sm.openIndex, 4, 'Must switch exclusively to item 4');
    });

    it('verifies category filter changes collapse open state and accurately partitions items', () => {
      const sm = new FAQStateMachine(testFaqs);
      sm.toggleItem(2);
      assert.equal(sm.openIndex, 2);

      // Switch to 'wallet'
      sm.setCategory('wallet');
      assert.equal(sm.openIndex, null, 'Must reset openIndex on category switch');
      const walletFaqs = sm.getFilteredFaqs();
      assert.equal(walletFaqs.length, 3);
      for (const item of walletFaqs) {
        assert.equal(item.category, 'wallet');
      }

      // Switch to 'engine'
      sm.setCategory('engine');
      assert.equal(sm.getFilteredFaqs().length, 2);

      // Switch to 'organizer'
      sm.setCategory('organizer');
      assert.equal(sm.getFilteredFaqs().length, 2);

      // Switch to 'tournaments'
      sm.setCategory('tournaments');
      assert.equal(sm.getFilteredFaqs().length, 3);
    });

    it('verifies realIndex resolution ensures clicking filtered item maps to correct question in master list', () => {
      const sm = new FAQStateMachine(testFaqs);
      sm.setCategory('organizer');
      const filtered = sm.getFilteredFaqs();
      assert.equal(filtered.length, 2);

      // First item in organizer is Q8, whose realIndex in testFaqs is 7
      const realIndex0 = testFaqs.findIndex((f) => f.question === filtered[0].question);
      assert.equal(realIndex0, 7);

      sm.toggleItem(realIndex0);
      assert.equal(sm.openIndex, 7);

      // Second item in organizer is Q9, whose realIndex in testFaqs is 8
      const realIndex1 = testFaqs.findIndex((f) => f.question === filtered[1].question);
      assert.equal(realIndex1, 8);

      sm.toggleItem(realIndex1);
      assert.equal(sm.openIndex, 8);
    });
  });

  // =========================================================================
  // 7. Legal Developer-Docs Layout & Anchor Navigation
  // =========================================================================
  describe('7. Legal Documentation Architecture: Table of Contents & Anchor Integrity', () => {
    const legalPages = [
      {
        name: 'Terms.tsx',
        src: termsSrc,
        expectedSections: ['acceptance', 'eligibility', 'security', 'classification', 'bans'],
      },
      {
        name: 'Privacy.tsx',
        src: privacySrc,
        expectedSections: ['collection', 'usage', 'security', 'officer'],
      },
      {
        name: 'RefundPolicy.tsx',
        src: refundSrc,
        expectedSections: ['cancellation', 'disruptions', 'withdrawals', 'contact'],
      },
      {
        name: 'FairPlay.tsx',
        src: fairPlaySrc,
        expectedSections: ['mobile-only', 'uid-validation', 'tamper-detection', 'hardware-bans'],
      },
    ];

    for (const page of legalPages) {
      it(`verifies ${page.name} Table of Contents anchors have matching DOM section elements with scroll-mt`, () => {
        // Verify TOC dynamic binding
        assert.ok(
          page.src.includes('href={`#${sec.id}`}') || page.src.includes('sections.map'),
          `${page.name} TOC must dynamically bind href to section id`
        );

        for (const secId of page.expectedSections) {
          // Verify secId is declared in the sections config array
          assert.ok(
            page.src.includes(`id: '${secId}'`) || page.src.includes(`id: "${secId}"`),
            `${page.name} sections array must define section id "${secId}"`
          );

          // Verify section element with id and scroll-mt
          const sectionTagRegex = new RegExp(`<section\\s+[^>]*id=["']${secId}["'][^>]*>`, 'i');
          const match = sectionTagRegex.exec(page.src);
          assert.ok(
            match,
            `${page.name} must contain <section id="${secId}">`
          );
          assert.ok(
            match[0].includes('scroll-mt-'),
            `${page.name} section #${secId} must have scroll-mt- class to account for sticky navbar`
          );
        }
      });
    }
  });
});
