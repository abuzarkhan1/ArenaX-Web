import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = 'c:/Users/Muhammad Minhas/ArenaX-Web';
const heroSrc = fs.readFileSync(path.join(projectRoot, 'src/components/Hero.tsx'), 'utf8');
const stmtSrc = fs.readFileSync(path.join(projectRoot, 'src/components/Statement.tsx'), 'utf8');
const appSrc = fs.readFileSync(path.join(projectRoot, 'src/components/AppExperienceShowcase.tsx'), 'utf8');
const tmSrc = fs.readFileSync(path.join(projectRoot, 'src/components/TournamentModes.tsx'), 'utf8');

console.log('--- STARTING ADVERSARIAL STRESS-TESTS FOR MILESTONE 2 ---');

// ============================================================================
// 1. Hero.tsx Stress Tests
// ============================================================================
console.log('Testing Hero.tsx...');

// Integrity & Contract
assert.ok(heroSrc.includes("trackDownload(\"ArenaX.apk\", \"Android\", \"2.6.0\")"), 'Hero must track download telemetry');
assert.ok(heroSrc.includes("CHARACTERS"), 'Hero must define CHARACTERS map');
assert.ok(heroSrc.includes("'tactical'") && heroSrc.includes("'rebel'"), 'Hero must support Red Criminal and Streetwear Rebel');
assert.ok(heroSrc.includes("<Stat value=\"< 15s\" label=\"AI OCR Verification\" accent />"), 'Hero must render AI OCR Stat');
assert.ok(heroSrc.includes("<Stat value=\"1:1\" label=\"Cash Parity (PKR)\" />"), 'Hero must render Cash Parity Stat');
assert.ok(heroSrc.includes("<Stat value=\"100%\" label=\"Automated Refund\" />"), 'Hero must render Automated Refund Stat');

// R1 Zero-Helper Violations Check
assert.ok(!heroSrc.includes('v2.6.0'), 'Hero must not have v2.6.0 version badge');
assert.ok(!heroSrc.includes('25 AX Free Welcome Bonus'), 'Hero must not have welcome bonus pill');
assert.ok(!heroSrc.includes('Daily Bermuda BR and 4v4 Clash Squad scrims'), 'Hero must not have conversational subhead');
assert.ok(!heroSrc.includes('SEASON 4'), 'Hero must not have corner season badge');
assert.ok(!heroSrc.includes('[2026]'), 'Hero must not have corner year badge');
assert.ok(!heroSrc.includes('subtext='), 'Hero must not pass subtext to Stat');

// Mobile Touch Targets (Adversarial check: 44px min tap height)
assert.ok(heroSrc.includes('min-h-[44px]'), 'Hero meta tags & character switcher must provide min-h-[44px] touch targets');

console.log('✔ Hero.tsx passed all adversarial tests');

// ============================================================================
// 2. Statement.tsx Stress Tests
// ============================================================================
console.log('Testing Statement.tsx...');

// Integrity & Contract
assert.ok(stmtSrc.includes('STATEMENTS'), 'Statement must define STATEMENTS array');
assert.ok(stmtSrc.includes('AI vision verifies scoreboards in seconds.'), 'Statement 01 headline must contain AI vision');
assert.ok(stmtSrc.includes('Cash out in 24 hours.'), 'Statement 02 must exist');
assert.ok(stmtSrc.includes('Money kept in two separate wallets.'), 'Statement 03 must exist');
assert.ok(stmtSrc.includes('Cheaters banned for life.'), 'Statement 04 must exist');

// R1 Zero-Helper Violations Check
assert.ok(!stmtSrc.includes('statement-detail'), 'Statement must not contain .statement-detail paragraph');
assert.ok(!stmtSrc.includes('detail:'), 'STATEMENTS items must not have detail fields');
assert.ok(!stmtSrc.includes('<Pill'), 'Statement must not contain Pill eyebrow');

// Motion & Performance Guard
assert.ok(stmtSrc.includes('prefers-reduced-motion: no-preference'), 'Statement must honor reduced motion');
assert.ok(stmtSrc.includes('ctx.revert()'), 'Statement must clean up GSAP ScrollTrigger');

console.log('✔ Statement.tsx passed all adversarial tests');

// ============================================================================
// 3. AppExperienceShowcase.tsx Stress Tests
// ============================================================================
console.log('Testing AppExperienceShowcase.tsx...');

// Integrity & Contract
assert.ok(appSrc.includes('CHAPTERS'), 'AppExperienceShowcase must define CHAPTERS');
assert.ok(appSrc.includes("'match'") && appSrc.includes("'ocr'") && appSrc.includes("'wallet'"), 'Must have 3 tabs');
assert.ok(appSrc.includes('Play Wallet') && appSrc.includes('Winning Wallet'), 'Must contain Play Wallet and Winning Wallet');
assert.ok(appSrc.includes('ROTATION_MAP'), 'Must have 3D ROTATION_MAP');
assert.ok(appSrc.includes('handleTabSwitch'), 'Must synchronize 3D phone rotation on tab click');

// R1 Zero-Helper Violations Check
assert.ok(!appSrc.includes('tagline:'), 'CHAPTERS must not declare tagline properties');
assert.ok(!appSrc.includes('Experience the actual tournament workflow'), 'Showcase must not contain marketing subtitle');
assert.ok(!appSrc.includes('Non-Withdrawable'), 'Showcase must not contain secondary helper subtitle');
assert.ok(!appSrc.includes('Multi-player end-match score extraction'), 'Showcase must not contain secondary subtitle');

// Mobile Trap & Pinning Adversarial Guard
assert.ok(appSrc.includes('(min-width: 1024px) and (prefers-reduced-motion: no-preference)'), 'Pinning must only trigger on desktop');
assert.ok(appSrc.includes('max-w-[calc(100vw-3rem)]'), 'Phone frame must be constrained on mobile');
assert.ok(appSrc.includes('copyRoomDetails'), 'Must provide interactive clipboard copy');

console.log('✔ AppExperienceShowcase.tsx passed all adversarial tests');

// ============================================================================
// 4. TournamentModes.tsx Stress Tests
// ============================================================================
console.log('Testing TournamentModes.tsx...');

// Integrity & Contract
assert.ok(tmSrc.includes("'bermuda'") && tmSrc.includes("'clashsquad'"), 'Must toggle Bermuda and Clash Squad');
assert.ok(tmSrc.includes("'solo'") && tmSrc.includes("'duo'") && tmSrc.includes("'squad'"), 'Must toggle sub-formats');
assert.ok(tmSrc.includes("'quarters'") && tmSrc.includes("'semis'") && tmSrc.includes("'finals'"), 'Must toggle bracket stages');
assert.ok(tmSrc.includes('csStageData[csStage]'), 'Dynamic bracket state must update CS stage data');
assert.ok(tmSrc.includes('currentCs.team1.name') && tmSrc.includes('currentCs.team2.name'), 'Dynamic team names must bind to state');
assert.ok(tmSrc.includes('handleCardMouseMove') && tmSrc.includes('handleCardMouseLeave'), '3D specular tilt handlers must be attached');

// R1 Zero-Helper Violations Check
assert.ok(!tmSrc.includes('SURVIVAL FORMAT'), 'Must not contain SURVIVAL FORMAT tagline');
assert.ok(!tmSrc.includes('BRACKET ELIMINATION'), 'Must not contain BRACKET ELIMINATION tagline');
assert.ok(!tmSrc.includes('Choose your battlefield format'), 'Must not contain conversational subtitle paragraph');
assert.ok(!tmSrc.includes('Single elimination with automated match progression'), 'Must not contain ShieldAlert banner');
assert.ok(!tmSrc.includes('ShieldAlert'), 'ShieldAlert icon must not be imported or rendered');

// Touch Target Adversarial Guard
assert.ok(tmSrc.includes('min-h-[44px]'), 'Tournament format & stage selectors must provide 44px touch targets on mobile');

console.log('✔ TournamentModes.tsx passed all adversarial tests');

console.log('--- ALL ADVERSARIAL CHECKS PASSED WITH ZERO VIOLATIONS ---');
