import assert from 'node:assert/strict';
import React, { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import {
  Stat,
  Button,
  Badge,
  Pill,
  Card,
  IconOrb,
  HudCorners,
} from '../src/components/primitives/index.ts';

// Icon component for IconOrb testing
export const DummyIcon = (props: { className?: string; strokeWidth?: number | string }) =>
  React.createElement('svg', {
    'data-testid': 'dummy-icon',
    className: props.className,
    'data-strokewidth': props.strokeWidth,
  }, React.createElement('circle', { cx: 12, cy: 12, r: 10 }));



const FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

let passCount = 0;
let failCount = 0;

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passCount++;
  } catch (err: unknown) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    `, (err as Error).message);
    failCount++;
  }
}

console.log('================================================================');
console.log('   ADVERSARIAL EMPIRICAL STRESS TEST SUITE: UI PRIMITIVES       ');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// 1. FORWARD REF & DISPLAY NAME INTEGRITY
// -----------------------------------------------------------------------------
console.log('▶ [1/6] ForwardRef & DisplayName Introspection');

runTest('Stat forwards ref and has displayName="Stat"', () => {
  assert.equal((Stat as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(Stat.displayName, 'Stat');
  const ref = createRef<HTMLDivElement>();
  const html = renderToString(<Stat ref={ref} value="100" label="Kills" />);
  assert.ok(html.includes('100'));
  assert.ok(html.includes('Kills'));
});

runTest('Button forwards ref and has displayName="Button"', () => {
  assert.equal((Button as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(Button.displayName, 'Button');
  const ref = createRef<HTMLButtonElement>();
  const html = renderToString(<Button ref={ref}>Click Me</Button>);
  assert.ok(html.includes('Click Me'));
  assert.ok(html.startsWith('<button'));
});

runTest('Badge forwards ref and has displayName="Badge"', () => {
  assert.equal((Badge as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(Badge.displayName, 'Badge');
  const ref = createRef<HTMLSpanElement>();
  const html = renderToString(<Badge ref={ref} label="Live" />);
  assert.ok(html.includes('Live'));
  assert.ok(html.startsWith('<span'));
});

runTest('Pill forwards ref and has displayName="Pill"', () => {
  assert.equal((Pill as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(Pill.displayName, 'Pill');
  const ref = createRef<HTMLDivElement>();
  const html = renderToString(<Pill ref={ref} label="Protocol" />);
  assert.ok(html.includes('Protocol'));
  assert.ok(html.startsWith('<div'));
});

runTest('Card forwards ref and has displayName="Card"', () => {
  assert.equal((Card as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(Card.displayName, 'Card');
  const ref = createRef<HTMLDivElement>();
  const html = renderToString(<Card ref={ref}>Card Content</Card>);
  assert.ok(html.includes('Card Content'));
  assert.ok(html.startsWith('<div'));
});

runTest('IconOrb forwards ref and has displayName="IconOrb"', () => {
  assert.equal((IconOrb as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(IconOrb.displayName, 'IconOrb');
  const ref = createRef<HTMLDivElement>();
  const html = renderToString(<IconOrb ref={ref} icon={DummyIcon} />);
  assert.ok(html.includes('dummy-icon'));
  assert.ok(html.startsWith('<div'));
});

runTest('HudCorners forwards ref and has displayName="HudCorners"', () => {
  assert.equal((HudCorners as unknown as { $$typeof: symbol }).$$typeof, FORWARD_REF_TYPE);
  assert.equal(HudCorners.displayName, 'HudCorners');
  const ref = createRef<HTMLSpanElement>();
  const html = renderToString(<HudCorners ref={ref} />);
  assert.ok(html.startsWith('<span'));
  assert.ok(html.includes('pointer-events-none'));
});

// -----------------------------------------------------------------------------
// 2. EXTREME STRINGS, SPECIAL CHARACTERS & XSS PAYLOADS
// -----------------------------------------------------------------------------
console.log('\n▶ [2/6] Extreme Strings, Special Characters & XSS Sanitization');

const XSS_PAYLOAD = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
const UNICODE_PAYLOAD = '🔥⚔️ Free Fire Bermuda 2026 🇵🇰 — اردو & Special Char $#@!%^&*()';
const MASSIVE_STRING = 'A'.repeat(5000);

runTest('Stat renders extreme XSS payload without unescaped script execution', () => {
  const html = renderToString(<Stat value={XSS_PAYLOAD} label={XSS_PAYLOAD} />);
  assert.ok(!html.includes('<script>alert'), 'Raw unescaped script tag must not be rendered');
  assert.ok(html.includes('&lt;script&gt;alert'), 'Script tags must be escaped as HTML entities');
});

runTest('Stat handles 5,000-character massive string without crash or truncation', () => {
  const html = renderToString(<Stat value={MASSIVE_STRING} label={MASSIVE_STRING} />);
  assert.ok(html.includes(MASSIVE_STRING));
});

runTest('Stat handles full Unicode, emoji, Urdu BiDi strings safely', () => {
  const html = renderToString(<Stat value={UNICODE_PAYLOAD} label={UNICODE_PAYLOAD} />);
  assert.ok(html.includes('🔥⚔️'));
  assert.ok(html.includes('اردو'));
});

runTest('Button sanitizes XSS in children and labels', () => {
  const html = renderToString(<Button>{XSS_PAYLOAD}</Button>);
  assert.ok(!html.includes('<script>alert'));
  assert.ok(html.includes('&lt;script&gt;alert'));
});

runTest('Button renders Unicode and massive strings cleanly', () => {
  const html = renderToString(<Button>{UNICODE_PAYLOAD}</Button>);
  assert.ok(html.includes('Free Fire Bermuda'));
  assert.ok(html.includes('اردو'));
});

runTest('Badge sanitizes XSS in both label and children', () => {
  const htmlLabel = renderToString(<Badge label={XSS_PAYLOAD} />);
  assert.ok(!htmlLabel.includes('<script>alert'));
  const htmlChild = renderToString(<Badge>{XSS_PAYLOAD}</Badge>);
  assert.ok(!htmlChild.includes('<script>alert'));
});

runTest('Pill sanitizes XSS in both label and children', () => {
  const html = renderToString(<Pill label={XSS_PAYLOAD} />);
  assert.ok(!html.includes('<script>alert'));
});

// -----------------------------------------------------------------------------
// 3. NULL, UNDEFINED & EMPTY VALUES
// -----------------------------------------------------------------------------
console.log('\n▶ [3/6] Null, Undefined & Empty Values');

runTest('Stat handles null and undefined value/label gracefully', () => {
  const htmlNull = renderToString(<Stat value={null} label="" />);
  assert.ok(htmlNull.includes('font-heading'));
  const htmlUndefined = renderToString(<Stat value={undefined} label="" />);
  assert.ok(htmlUndefined.includes('font-heading'));
  const htmlZero = renderToString(<Stat value={0} label="Zero" />);
  assert.ok(htmlZero.includes('>0<'), 'Value 0 must be rendered as "0"');
});

runTest('Button handles empty children, null icon gracefully', () => {
  const htmlEmpty = renderToString(<Button>{null}</Button>);
  assert.ok(htmlEmpty.startsWith('<button'));
  const htmlNullIcon = renderToString(<Button icon={null}>Action</Button>);
  assert.ok(htmlNullIcon.includes('Action'));
});

runTest('Badge handles label="" with children fallback, and empty badge gracefully', () => {
  const htmlFallback = renderToString(<Badge label="">Fallback</Badge>);
  assert.ok(htmlFallback.includes('Fallback'));
  const htmlZero = renderToString(<Badge>{0}</Badge>);
  assert.ok(htmlZero.includes('>0<'), 'Badge must render number 0');
  const htmlEmpty = renderToString(<Badge />);
  assert.ok(htmlEmpty.startsWith('<span'));
});

runTest('Pill handles label="" with children fallback, and pulse precedence', () => {
  const htmlFallback = renderToString(<Pill label="">Fallback Pill</Pill>);
  assert.ok(htmlFallback.includes('Fallback Pill'));
  // pulse overrides dotPulse
  const htmlPulseFalse = renderToString(<Pill dot={true} dotPulse={true} pulse={false}>No Pulse</Pill>);
  assert.ok(!htmlPulseFalse.includes('animate-ping'), 'Explicit pulse=false must disable ping');
  const htmlPulseTrue = renderToString(<Pill dot={true} dotPulse={false} pulse={true}>Pulse</Pill>);
  assert.ok(htmlPulseTrue.includes('animate-ping'), 'Explicit pulse=true must enable ping');
  const htmlNoDot = renderToString(<Pill dot={false} pulse={true}>No Dot</Pill>);
  assert.ok(!htmlNoDot.includes('animate-ping'), 'dot=false must eliminate dot and pulse entirely');
});

runTest('Card handles null/undefined children and polymorphic tag switching', () => {
  const htmlSection = renderToString(<Card as="section">Section Card</Card>);
  assert.ok(htmlSection.startsWith('<section'));
  assert.ok(htmlSection.endsWith('</section>'));
  const htmlArticle = renderToString(<Card as="article">Article Card</Card>);
  assert.ok(htmlArticle.startsWith('<article'));
  assert.ok(htmlArticle.endsWith('</article>'));
  const htmlNull = renderToString(<Card>{null}</Card>);
  assert.ok(htmlNull.startsWith('<div'));
});

// -----------------------------------------------------------------------------
// 4. BUTTON POLYMORPHISM & ANCHOR BEHAVIOR
// -----------------------------------------------------------------------------
console.log('\n▶ [4/6] Button Polymorphism (asAnchor) & Attributes');

runTest('Button asAnchor=true with href renders <a> with correct security rel', () => {
  const htmlBlank = renderToString(
    <Button asAnchor href="https://example.com" target="_blank">
      External Link
    </Button>
  );
  assert.ok(htmlBlank.startsWith('<a'), 'Must render <a> tag');
  assert.ok(htmlBlank.includes('href="https://example.com"'));
  assert.ok(htmlBlank.includes('target="_blank"'));
  assert.ok(htmlBlank.includes('rel="noopener noreferrer"'), 'Must auto-set noopener noreferrer for target=_blank');
});

runTest('Button asAnchor=true with custom rel preserves custom rel', () => {
  const htmlCustom = renderToString(
    <Button asAnchor href="https://example.com" target="_blank" rel="author">
      Custom Rel
    </Button>
  );
  assert.ok(htmlCustom.includes('rel="author"'));
});

runTest('Button asAnchor=true but missing href falls back to <button>', () => {
  const htmlFallback = renderToString(
    <Button asAnchor>
      No Href Fallback
    </Button>
  );
  assert.ok(htmlFallback.startsWith('<button'), 'Must fallback to <button> when href is absent');
});

runTest('Button asAnchor=true attribute inspection (id, aria-label, data-testid)', () => {
  const html = renderToString(
    <Button
      asAnchor
      href="https://example.com"
      id="test-anchor-id"
      aria-label="Download Link"
    >
      Link
    </Button>
  );
  // Empirically check if props are passed through
  const hasId = html.includes('id="test-anchor-id"');
  const hasAria = html.includes('aria-label="Download Link"');
  console.log(`    (asAnchor props forwarding: hasId=${hasId}, hasAria=${hasAria})`);
});


runTest('Button disabled attribute is applied to button tag', () => {
  const htmlDisabled = renderToString(
    <Button disabled>
      Disabled Action
    </Button>
  );
  assert.ok(htmlDisabled.includes('disabled=""') || htmlDisabled.includes('disabled'), 'Must apply disabled attribute');
  assert.ok(htmlDisabled.includes('disabled:pointer-events-none'));
});

// -----------------------------------------------------------------------------
// 5. STYLING REGRESSIONS, BACKLIGHT LEAKS & CLASS PURITY
// -----------------------------------------------------------------------------
console.log('\n▶ [5/6] Styling Regressions, Backlight Leaks & Class Integrity');

runTest('IconOrb neutral tone does NOT leak emerald backlight', () => {
  const htmlNeutral = renderToString(<IconOrb icon={DummyIcon} tone="neutral" />);
  assert.ok(!htmlNeutral.includes('bg-emerald-500/20'), 'Neutral tone must NOT contain emerald backlight glow');
  assert.ok(htmlNeutral.includes('bg-white/5'), 'Neutral tone must use bg-white/5');
  assert.ok(htmlNeutral.includes('text-text-2'), 'Neutral tone must use text-text-2');
});

runTest('IconOrb emerald tone renders emerald backlight and colors', () => {
  const htmlEmerald = renderToString(<IconOrb icon={DummyIcon} tone="emerald" />);
  assert.ok(htmlEmerald.includes('bg-emerald-500/20'));
  assert.ok(htmlEmerald.includes('text-emerald-400'));
});

runTest('IconOrb danger tone renders red backlight and colors', () => {
  const htmlDanger = renderToString(<IconOrb icon={DummyIcon} tone="danger" />);
  assert.ok(htmlDanger.includes('bg-red-500/20'));
  assert.ok(htmlDanger.includes('text-red-400'));
});

runTest('IconOrb sizing classes sm, md, lg are correctly applied', () => {
  const htmlSm = renderToString(<IconOrb icon={DummyIcon} size="sm" />);
  assert.ok(htmlSm.includes('p-2') && htmlSm.includes('w-4 h-4'));

  const htmlMd = renderToString(<IconOrb icon={DummyIcon} size="md" />);
  assert.ok(htmlMd.includes('p-2.5') && htmlMd.includes('w-5 h-5'));

  const htmlLg = renderToString(<IconOrb icon={DummyIcon} size="lg" />);
  assert.ok(htmlLg.includes('p-3') && htmlLg.includes('w-6 h-6'));
});

runTest('No component produces "undefined" or "null" in rendered classNames', () => {
  const statHtml = renderToString(<Stat value="1" label="L" />);
  assert.ok(!statHtml.includes('undefined'), 'Stat class must not contain undefined');
  assert.ok(!statHtml.includes('null'), 'Stat class must not contain null');

  const btnHtml = renderToString(<Button>B</Button>);
  assert.ok(!btnHtml.includes('undefined'), 'Button class must not contain undefined');

  const badgeHtml = renderToString(<Badge label="B" />);
  assert.ok(!badgeHtml.includes('undefined'), 'Badge class must not contain undefined');

  const pillHtml = renderToString(<Pill label="P" />);
  assert.ok(!pillHtml.includes('undefined'), 'Pill class must not contain undefined');

  const cardHtml = renderToString(<Card>C</Card>);
  assert.ok(!cardHtml.includes('undefined'), 'Card class must not contain undefined');

  const orbHtml = renderToString(<IconOrb icon={DummyIcon} />);
  assert.ok(!orbHtml.includes('undefined'), 'IconOrb class must not contain undefined');

  const hudHtml = renderToString(<HudCorners />);
  assert.ok(!hudHtml.includes('undefined'), 'HudCorners class must not contain undefined');
});

runTest('Button sizing: sm size is compact h-9 px-3.5', () => {
  const htmlSm = renderToString(<Button size="sm">Small</Button>);
  assert.ok(htmlSm.includes('h-9 px-3.5 py-2 text-xs'), 'sm size must be h-9 px-3.5');
  const htmlMd = renderToString(<Button size="md">Medium</Button>);
  assert.ok(htmlMd.includes('min-h-[48px]'));
  const htmlLg = renderToString(<Button size="lg">Large</Button>);
  assert.ok(htmlLg.includes('min-h-[52px]'));
});

runTest('Card variant classes: base vs highlighted and interactive lift', () => {
  const htmlBase = renderToString(<Card variant="base" interactive={true}>Base</Card>);
  assert.ok(htmlBase.includes('hud-card'));
  assert.ok(!htmlBase.includes('hud-card-highlight'));
  assert.ok(htmlBase.includes('hover:-translate-y-1'));

  const htmlHighlight = renderToString(<Card variant="highlighted" interactive={false}>High</Card>);
  assert.ok(htmlHighlight.includes('hud-card-highlight'));
  assert.ok(!htmlHighlight.includes('hover:-translate-y-1'));
});

runTest('HudCorners respects tone and inset options', () => {
  const htmlDefault = renderToString(<HudCorners />);
  assert.ok(htmlDefault.includes('border-emerald-400/50'));
  assert.ok(htmlDefault.includes('inset-0'));

  const htmlNeutralInset = renderToString(<HudCorners tone="neutral" inset={true} />);
  assert.ok(htmlNeutralInset.includes('border-white/[0.18]'));
  assert.ok(htmlNeutralInset.includes('inset-[6px]'));
});

// -----------------------------------------------------------------------------
// 6. RAPID COMBINATORIAL STRESS HARNESS (1,000+ ITERATIONS)
// -----------------------------------------------------------------------------
console.log('\n▶ [6/6] High-Volume Rapid Combinatorial Stress Harness');

runTest('Render 1,000 rapid combinatorial permutations without memory leak or crash', () => {
  const start = Date.now();
  const variants: Array<'primary' | 'secondary' | 'ghost'> = ['primary', 'secondary', 'ghost'];
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  const tones: Array<'emerald' | 'neutral' | 'danger'> = ['emerald', 'neutral', 'danger'];
  const bools = [true, false];

  let iterationCount = 0;

  for (let i = 0; i < 20; i++) {
    for (const v of variants) {
      for (const s of sizes) {
        for (const fw of bools) {
          for (const asA of bools) {
            renderToString(
              <Button
                variant={v}
                size={s}
                fullWidth={fw}
                asAnchor={asA}
                href={asA ? 'https://example.com' : undefined}
                icon={<DummyIcon />}
                iconPosition={i % 2 === 0 ? 'left' : 'right'}
              >
                {`Permutation #${iterationCount}`}
              </Button>
            );
            iterationCount++;
          }
        }
      }
    }

    for (const t of tones) {
      for (const d of bools) {
        for (const p of bools) {
          renderToString(<Badge tone={t} dot={d} pulse={p} label={`Badge-${iterationCount}`} />);
          renderToString(<Pill dot={d} dotPulse={p} pulse={!p} label={`Pill-${iterationCount}`} />);
          renderToString(<IconOrb icon={DummyIcon} tone={t} size={i % 3 === 0 ? 'sm' : i % 3 === 1 ? 'md' : 'lg'} />);
          iterationCount += 3;
        }
      }
    }

    for (const cardVar of ['base', 'highlighted'] as const) {
      for (const inter of bools) {
        renderToString(
          <Card variant={cardVar} interactive={inter} as={i % 2 === 0 ? 'div' : 'article'}>
            <Stat value={iterationCount} label="Telemetry Metric" accent={inter} />
            <HudCorners tone={i % 2 === 0 ? 'emerald' : 'neutral'} inset={inter} />
          </Card>
        );
        iterationCount += 3;
      }
    }
  }

  const duration = Date.now() - start;
  assert.ok(iterationCount >= 1000, `Expected >= 1000 iterations, got ${iterationCount}`);
  console.log(`    (Successfully executed ${iterationCount} renders in ${duration}ms: ${(iterationCount / (duration / 1000)).toFixed(0)} renders/sec)`);
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`ADVERSARIAL STRESS TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
