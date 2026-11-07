import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

describe('Adversarial Challenger Suite M4-2: Tokens, Syntax Balance & Copy Parity', () => {
  const root = process.cwd();

  const m4ComponentFiles = [
    { name: 'Footer.tsx', path: path.join(root, 'src/components/Footer.tsx') },
    { name: 'WhatsAppButton.tsx', path: path.join(root, 'src/components/WhatsAppButton.tsx') },
    { name: 'About.tsx', path: path.join(root, 'src/components/About.tsx') },
    { name: 'FAQ.tsx', path: path.join(root, 'src/components/FAQ.tsx') },
    { name: 'Contact.tsx', path: path.join(root, 'src/components/Contact.tsx') },
    { name: 'Terms.tsx', path: path.join(root, 'src/components/Terms.tsx') },
    { name: 'Privacy.tsx', path: path.join(root, 'src/components/Privacy.tsx') },
    { name: 'RefundPolicy.tsx', path: path.join(root, 'src/components/RefundPolicy.tsx') },
    { name: 'FairPlay.tsx', path: path.join(root, 'src/components/FairPlay.tsx') },
  ];

  const m4Components = m4ComponentFiles.map((file) => ({
    ...file,
    source: fs.readFileSync(file.path, 'utf8'),
  }));

  // =========================================================================
  // 1. Syntax & Arbitrary Tailwind Bracket Invariants
  // =========================================================================
  describe('1. Syntax & Arbitrary Tailwind Bracket Invariants', () => {
    it('verifies all 9 files exist and are readable', () => {
      assert.equal(m4Components.length, 9, 'Exactly 9 Milestone 4 components must be loaded');
      for (const comp of m4Components) {
        assert.ok(comp.source.length > 100, `${comp.name} must not be empty`);
      }
    });

    for (const comp of m4Components) {
      it(`${comp.name}: arbitrary Tailwind brackets are strictly balanced with no unmatched delimiters`, () => {
        const src = comp.source;
        // Find all bracket pairs
        let depth = 0;
        let inString = false;
        let stringChar = '';

        for (let i = 0; i < src.length; i++) {
          const char = src[i];
          const prev = i > 0 ? src[i - 1] : '';

          // Track string boundaries
          if (!inString && (char === '"' || char === "'" || char === '`')) {
            inString = true;
            stringChar = char;
            continue;
          } else if (inString && char === stringChar && prev !== '\\') {
            inString = false;
            stringChar = '';
            continue;
          }

          if (char === '[') {
            depth++;
          } else if (char === ']') {
            depth--;
            assert.ok(depth >= 0, `Unmatched closing bracket ']' in ${comp.name} at position ${i}`);
          }
        }

        assert.equal(depth, 0, `Unclosed opening bracket '[' in ${comp.name}. Final depth: ${depth}`);
      });

      it(`${comp.name}: all arbitrary Tailwind classes are well-formed without illegal whitespace`, () => {
        // Match arbitrary classes like bg-[...], border-[...], shadow-[...], etc.
        const arbitraryRegex = /[a-zA-Z0-9_-]+-\[([^\]]*)\]/g;
        let match: RegExpExecArray | null;

        while ((match = arbitraryRegex.exec(comp.source)) !== null) {
          const inner = match[1];
          // Check for illegal spaces at borders
          assert.ok(!inner.startsWith(' '), `Arbitrary class '${match[0]}' in ${comp.name} starts with illegal space`);
          assert.ok(!inner.endsWith(' '), `Arbitrary class '${match[0]}' in ${comp.name} ends with illegal space`);
          // Check not empty
          assert.ok(inner.length > 0, `Arbitrary class '${match[0]}' in ${comp.name} must not be empty`);
        }
      });

      it(`${comp.name}: TypeScript compiler API parses source cleanly with zero AST syntax errors`, () => {
        const sourceFile = ts.createSourceFile(
          comp.name,
          comp.source,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        );

        // Check for syntactic diagnostics
        const parseDiagnostics = (sourceFile as unknown as { parseDiagnostics?: ts.Diagnostic[] }).parseDiagnostics || [];
        assert.equal(
          parseDiagnostics.length,
          0,
          `Syntactic errors in ${comp.name}: ${parseDiagnostics.map((d) => d.messageText).join(', ')}`
        );
      });
    }
  });

  // =========================================================================
  // 2. Zero Literal undefined, NaN, null, or [object Object] in Rendered JSX
  // =========================================================================
  describe('2. Zero Literal undefined, NaN, null, or [object Object]', () => {
    for (const comp of m4Components) {
      it(`${comp.name}: zero occurrences of literal undefined, NaN, null, or [object Object] in JSX text`, () => {
        const src = comp.source;

        // Check for "[object Object]"
        assert.ok(!src.includes('[object Object]'), `${comp.name} contains literal [object Object]`);

        // Check for literal "undefined" in rendered text / templates
        const undefinedInText = />[^<]*\bundefined\b[^<]*</i.test(src);
        assert.ok(!undefinedInText, `${comp.name} contains literal 'undefined' rendered in JSX`);

        // Check for literal "NaN" in rendered text / templates
        const nanInText = />[^<]*\bNaN\b[^<]*</.test(src);
        assert.ok(!nanInText, `${comp.name} contains literal 'NaN' rendered in JSX`);

        // Check for literal "null" as visible text between tags (e.g. >null<)
        const nullInText = />\s*null\s*</.test(src);
        assert.ok(!nullInText, `${comp.name} contains literal 'null' rendered in JSX text`);
      });
    }
  });

  // =========================================================================
  // 3. Carbon Palette & Supabase Token Enforcement
  // =========================================================================
  describe('3. Carbon Palette & Supabase Token Enforcement', () => {
    for (const comp of m4Components) {
      it(`${comp.name}: zero rogue neon green (#00FF00 / #00ff00) or unauthorized colors`, () => {
        const src = comp.source;
        assert.ok(!src.includes('#00FF00'), `${comp.name} contains rogue neon green #00FF00`);
        assert.ok(!src.includes('#00ff00'), `${comp.name} contains rogue neon green #00ff00`);
        assert.ok(!src.includes('rgb(0, 255, 0)'), `${comp.name} contains rgb(0, 255, 0)`);
        assert.ok(!src.includes('rgba(0, 255, 0'), `${comp.name} contains rgba(0, 255, 0`);
      });

      it(`${comp.name}: all hex colors adhere to Supabase tokens or dark carbon palette`, () => {
        // Extract all hex codes (#xxxxxx or #xxx)
        const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
        const matches = comp.source.match(hexRegex) || [];

        const allowedHexTokens = new Set([
          // Supabase Brand Green family
          '#3ECF8E', // Primary Supabase green accent
          '#34B27B', // Supabase green hover stop
          '#041B10', // Supabase emerald deep icon/pill background
          '#85E0BA', // Supabase light emerald text
          '#249361', // Supabase dark emerald tone
          // Carbon Surfaces
          '#121212', // Canvas surface
          '#161616', // Footer alternative carbon surface
          '#171717', // Base card surface-100
          '#181A19', // Raised card surface / subtle carbon tint
          '#181a19', // Raised card surface lowercase
          '#141514', // Subtle card gradient bottom
          '#1E201F', // Elevated surface-300 / hover surface
          '#0B0E0D', // Translucent header surface
          '#0E0F0E', // Deepest canvas surface
          // Alert / Red Surfaces (Error alerts)
          '#1F0A0A', // Dark red alert container surface
          // Text & Foreground
          '#EDEDED', // High-contrast primary text
          '#FFFFFF', // Pure white
          '#A0A0A0', // Secondary neutral text
          '#707070', // Subtle tertiary/muted text
        ]);

        for (const hex of matches) {
          const upper = hex.toUpperCase();
          const normalized = allowedHexTokens.has(hex) || allowedHexTokens.has(upper);
          assert.ok(
            normalized,
            `Unexpected hex color '${hex}' in ${comp.name}. Must strictly belong to the Supabase carbon/green design token palette.`
          );
        }
      });
    }
  });

  // =========================================================================
  // 4. Content Parity Verification vs views_catalog.md
  // =========================================================================
  describe('4. Content Parity Verification vs views_catalog.md', () => {
    // 4.1 Footer.tsx
    describe('Footer.tsx copy & link preservation', () => {
      const footer = m4Components.find((c) => c.name === 'Footer.tsx')!.source;

      it('preserves brand name with accented X', () => {
        assert.ok(footer.includes('Arena<span className="text-[#3ECF8E]">X</span>'), 'Brand mark ArenaX with green X');
      });

      it('preserves all 4 navigation links', () => {
        assert.ok(footer.includes('to="/"') && footer.includes('Home'), 'Home link');
        assert.ok(footer.includes('to="/about"') && footer.includes('About Us'), 'About Us link');
        assert.ok(footer.includes('to="/faq"') && footer.includes('FAQs'), 'FAQs link');
        assert.ok(footer.includes('to="/contact"') && footer.includes('Contact Support'), 'Contact Support link');
      });

      it('preserves all 4 legal links', () => {
        assert.ok(footer.includes('to="/terms"') && footer.includes('Terms of Service'), 'Terms link');
        assert.ok(footer.includes('to="/privacy"') && footer.includes('Privacy Policy'), 'Privacy link');
        assert.ok(footer.includes('to="/refund-policy"') && footer.includes('Refund Policy'), 'Refund Policy link');
        assert.ok(footer.includes('to="/fair-play"') && footer.includes('Fair Play & Anti-Cheat'), 'Fair Play link');
      });

      it('preserves all social links and RFC mailto', () => {
        assert.ok(footer.includes('https://www.facebook.com/share/17NfG8Syiq/'), 'Facebook link');
        assert.ok(footer.includes('https://www.instagram.com/arenaxbattlefield'), 'Instagram link');
        assert.ok(footer.includes('https://youtube.com/@arenax_15'), 'YouTube link');
        assert.ok(footer.includes('mailto:arenasupport@gmail.com'), 'Support email link');
        assert.ok(footer.includes('© 2026 ArenaX. All rights reserved.'), 'Copyright notice');
      });

      it('strictly enforces negative invariants (no banned marketing slogans in footer)', () => {
        assert.ok(!footer.includes("Pakistan's premier mobile esports platform"), 'No premier slogan in footer');
        assert.ok(!footer.includes('PLATFORM OPERATIONAL 24/7'), 'No operational slogan in footer');
      });
    });

    // 4.2 WhatsAppButton.tsx
    describe('WhatsAppButton.tsx contract & negative invariants', () => {
      const wa = m4Components.find((c) => c.name === 'WhatsAppButton.tsx')!.source;

      it('preserves phone number and click action', () => {
        assert.ok(wa.includes('+923367135319'), 'WhatsApp phone number');
        assert.ok(wa.includes('https://wa.me/'), 'wa.me url format');
        assert.ok(wa.includes('_blank'), 'Opens in new tab');
      });

      it('preserves a11y label and testid', () => {
        assert.ok(wa.includes('data-testid="whatsapp-button"'), 'data-testid');
        assert.ok(wa.includes('aria-label="Chat with ArenaX Support on WhatsApp"'), 'aria-label');
      });

      it('strictly respects negative test invariants: NO isHovered and NO tooltip Chat on WhatsApp', () => {
        assert.ok(!wa.includes('isHovered'), 'Must NOT have isHovered state (prohibited by adversarial tests)');
        assert.ok(!wa.includes('Chat on WhatsApp'), 'Must NOT contain tooltip text "Chat on WhatsApp"');
      });

      it('features the Supabase online status beacon dot', () => {
        assert.ok(wa.includes('bg-[#3ECF8E]'), 'Beacon green dot');
        assert.ok(wa.includes('border-[#121212]'), 'Beacon dark carbon border');
      });
    });

    // 4.3 About.tsx
    describe('About.tsx copy & structure preservation', () => {
      const about = m4Components.find((c) => c.name === 'About.tsx')!.source;

      it('preserves main headline and subtext', () => {
        assert.ok(about.includes('Built For'), 'Headline part 1');
        assert.ok(about.includes('Players'), 'Headline part 2');
        assert.ok(
          about.includes('We are building the future of competitive mobile gaming in Pakistan by delivering a seamless, dispute-free tournament ecosystem for Free Fire squads.'),
          'About subtext verbatim'
        );
      });

      it('preserves Our Story verbatim', () => {
        assert.ok(
          about.includes('ArenaX was founded by competitive gamers who experienced first-hand the pervasive challenges of organizing and participating in mobile esports tournaments across Pakistan.'),
          'Our story paragraph 1'
        );
        assert.ok(
          about.includes('Our mission is to democratize competitive esports by creating a platform where anyone can enter tournaments, improve their gameplay, and compete for real cash prizes.'),
          'Our story paragraph 2'
        );
      });

      it('preserves all 4 core values verbatim', () => {
        assert.ok(about.includes('Dispute-Free Competition'), 'Value 1 title');
        assert.ok(about.includes('Automated AI scoreboard parsing eliminates human error and organizer bias in tournament scoring.'), 'Value 1 desc');
        assert.ok(about.includes('Financial Solvency & Escrow'), 'Value 2 title');
        assert.ok(about.includes('Guaranteed 100% solvency backed by isolated wallet vaults and 24-hour payouts via JazzCash & EasyPaisa.'), 'Value 2 desc');
        assert.ok(about.includes('Empowering Guild Organizers'), 'Value 3 title');
        assert.ok(about.includes('Grassroots tournament hosts earn dedicated commissions while running custom community scrims.'), 'Value 3 desc');
        assert.ok(about.includes('Zero-Tolerance Fair Play'), 'Value 4 title');
        assert.ok(about.includes('Hardware bans for emulators and cheat software ensure a clean battlefield for mobile players.'), 'Value 4 desc');
      });

      it('preserves Ready to Compete CTA and Download URL', () => {
        assert.ok(about.includes('Ready to Compete?'), 'CTA headline');
        assert.ok(about.includes("Download the official ArenaX application and register your squad for today's scrims."), 'CTA desc');
        assert.ok(about.includes('Download App'), 'CTA button');
        assert.ok(about.includes('https://github.com/abuzarkhan1/ArenaX-Web/releases/download/v2.6/ArenaX.apk'), 'APK link');
      });
    });

    // 4.4 FAQ.tsx
    describe('FAQ.tsx 10 authoritative questions and verbatim answers', () => {
      const faq = m4Components.find((c) => c.name === 'FAQ.tsx')!.source;

      it('preserves headline and subtext', () => {
        assert.ok(faq.includes('Frequently Asked'), 'Headline');
        assert.ok(faq.includes('Find transparent answers regarding tournaments, payouts, rules, and account security.'), 'Subtext');
      });

      const requiredFaqs = [
        'What is ArenaX?',
        'How do I participate in tournaments?',
        'What is the difference between Play Wallet and Winning Wallet?',
        'How do I add money to my wallet?',
        'How long does it take to withdraw cash winnings?',
        'How does the ArenaX Vision Engine verify match scoreboards?',
        'What happens if a tournament is cancelled or fails to start?',
        'How can I become an Organizer and host my own tournaments?',
        'Is ArenaX legal and compliant in Pakistan?',
        'How are combat points calculated for Bermuda tournaments?',
      ];

      for (const q of requiredFaqs) {
        it(`preserves question: "${q}"`, () => {
          assert.ok(faq.includes(q), `FAQ must contain question "${q}"`);
        });
      }

      it('preserves critical answer excerpts verbatim', () => {
        assert.ok(faq.includes('1 AX Coin = 1 PKR Cash'), '1 AX = 1 PKR equivalence');
        assert.ok(faq.includes('100% Automated Cancellation Refund Policy'), 'Refund policy mention');
        assert.ok(faq.includes('20 Points, and each confirmed frag kill awards 5 Points'), 'Combat points calculation formula');
        assert.ok(faq.includes('minimum withdrawal threshold is 100 AX Coins (PKR 100)'), 'Withdrawal threshold');
      });

      it('preserves Still Have Questions support card with 24/7 and action buttons', () => {
        assert.ok(faq.includes('Still Have Questions?'), 'Support title');
        assert.ok(faq.includes('24/7'), '24/7 availability');
        assert.ok(faq.includes('Chat on WhatsApp'), 'WhatsApp CTA button');
        assert.ok(faq.includes('Email Support'), 'Email CTA button');
        assert.ok(faq.includes('https://wa.me/+923367135319'), 'WhatsApp URL');
        assert.ok(faq.includes('mailto:arenasupport@gmail.com'), 'Email mailto');
      });
    });

    // 4.5 Contact.tsx
    describe('Contact.tsx channels & interactive dispatch form', () => {
      const contact = m4Components.find((c) => c.name === 'Contact.tsx')!.source;

      it('preserves headline and subtext', () => {
        assert.ok(contact.includes('Get in'), 'Headline');
        assert.ok(contact.includes('Touch'), 'Headline accent');
        assert.ok(
          contact.includes('Have questions about a Free Fire tournament, need deposit assistance, or interested in organizing community scrims? We are here to help.'),
          'Subtext'
        );
      });

      it('preserves 3 channel cards', () => {
        assert.ok(contact.includes('Email Support') && contact.includes('arenasupport@gmail.com'), 'Email channel');
        assert.ok(contact.includes('WhatsApp Live Support') && contact.includes('+92 336 7135319'), 'WhatsApp channel');
        assert.ok(contact.includes('Helpdesk Availability') && contact.includes('Monday – Sunday (24/7 PKT)'), 'Availability channel');
      });

      it('preserves form fields, options, and status feedback', () => {
        assert.ok(contact.includes('Send Direct Message'), 'Form title');
        assert.ok(contact.includes('Your Name *'), 'Name field');
        assert.ok(contact.includes('Email Address *'), 'Email field');
        assert.ok(contact.includes('Subject / Topic *'), 'Subject field');
        assert.ok(contact.includes('Message Description *'), 'Message field');
        assert.ok(contact.includes('Deposit & Wallet Issue'), 'Topic 1');
        assert.ok(contact.includes('Tournament Scoreboard Dispute'), 'Topic 2');
        assert.ok(contact.includes('Organizer Application'), 'Topic 3');
        assert.ok(contact.includes('UID Verification Help'), 'Topic 4');
        assert.ok(contact.includes('Send Message'), 'Submit button');
        assert.ok(contact.includes('Message Prepared'), 'Success title');
        assert.ok(contact.includes('Submission Error'), 'Error title');
      });
    });

    // 4.6 Terms.tsx, Privacy.tsx, RefundPolicy.tsx, FairPlay.tsx
    describe('Legal documents verbatim copy & structure', () => {
      const terms = m4Components.find((c) => c.name === 'Terms.tsx')!.source;
      const privacy = m4Components.find((c) => c.name === 'Privacy.tsx')!.source;
      const refund = m4Components.find((c) => c.name === 'RefundPolicy.tsx')!.source;
      const fair = m4Components.find((c) => c.name === 'FairPlay.tsx')!.source;

      it('Terms.tsx preserves all 5 sections and Pakistan governance notice', () => {
        assert.ok(terms.includes('Last updated: 2026 • Governed under the Laws of Pakistan'), 'Governance notice');
        assert.ok(terms.includes('Acceptance of Terms'), 'Section 1');
        assert.ok(terms.includes('Player Eligibility'), 'Section 2');
        assert.ok(terms.includes('Account & Fund Security'), 'Section 3');
        assert.ok(terms.includes('Skill-Based Gaming Classification'), 'Section 4');
        assert.ok(terms.includes('Disqualification & Bans'), 'Section 5');
        assert.ok(terms.includes('arenasupport@gmail.com'), 'Compliance email');
      });

      it('Privacy.tsx preserves all 4 sections and Pakistan governance notice', () => {
        assert.ok(privacy.includes('Last updated: 2026 • Governed under the Laws of Pakistan'), 'Governance notice');
        assert.ok(privacy.includes('Information We Collect'), 'Section 1');
        assert.ok(privacy.includes('How Information is Used'), 'Section 2');
        assert.ok(privacy.includes('Data Security & Storage'), 'Section 3');
        assert.ok(privacy.includes('Contacting the Privacy Officer'), 'Section 4');
        assert.ok(privacy.includes('arenasupport@gmail.com'), 'Privacy officer email');
      });

      it('RefundPolicy.tsx preserves all 4 sections and 100% automated refund guarantee', () => {
        assert.ok(refund.includes('100% Refund'), 'Title');
        assert.ok(refund.includes('Automated Match Cancellation Refund'), 'Section 1');
        assert.ok(refund.includes('In-Game Room Technical Disruptions'), 'Section 2');
        assert.ok(refund.includes('Voluntary Player Withdrawals'), 'Section 3');
        assert.ok(refund.includes('Dispute Contact'), 'Section 4');
        assert.ok(refund.includes('arenasupport@gmail.com'), 'Refund email');
      });

      it('FairPlay.tsx preserves all 4 sections and anti-cheat policies', () => {
        assert.ok(fair.includes('Fair Play'), 'Title');
        assert.ok(fair.includes('Mobile Touchscreen Devices Only'), 'Section 1');
        assert.ok(fair.includes('In-Game UID Validation'), 'Section 2');
        assert.ok(fair.includes('Anti-Photoshop & Tamper Detection'), 'Section 3');
        assert.ok(fair.includes('Lifetime Hardware Bans'), 'Section 4');
        assert.ok(fair.includes('arenasupport@gmail.com'), 'Dispute email');
      });

      it('All 4 legal pages feature sticky Table of Contents and Legal Directory switcher', () => {
        for (const doc of [terms, privacy, refund, fair]) {
          assert.ok(doc.includes('On This Page'), 'TOC header');
          assert.ok(doc.includes('Legal Directory'), 'Legal switcher header');
          assert.ok(doc.includes('/terms'), 'Links to Terms');
          assert.ok(doc.includes('/privacy'), 'Links to Privacy');
          assert.ok(doc.includes('/refund-policy'), 'Links to Refund');
          assert.ok(doc.includes('/fair-play'), 'Links to Fair Play');
        }
      });
    });
  });
});
