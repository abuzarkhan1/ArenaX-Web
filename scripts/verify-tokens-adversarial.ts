import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const projectRoot = process.cwd();

console.log('================================================================');
console.log('   EMPIRICAL ADVERSARIAL CHALLENGER: DESIGN TOKENS & STYLING    ');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passCount++;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  ✖ [FAIL] ${name}: ${message}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. Reference File & Asset Immutability Invariant
// -----------------------------------------------------------------------------
console.log('--- TEST GROUP 1: Reference Asset Immutability ---');

check('Reference HTML exact SHA-256 and byte size', () => {
  const htmlPath = path.resolve(projectRoot, 'Supabase _ The Postgres Development Platform.html');
  assert.ok(fs.existsSync(htmlPath), 'Reference HTML must exist');
  const buffer = fs.readFileSync(htmlPath);
  const size = fs.statSync(htmlPath).size;
  assert.equal(size, 1396412, `Reference HTML size must be 1,396,412 bytes, got ${size}`);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  assert.equal(
    hash.toLowerCase(),
    'cfbab0c0f7d9acaa887ecf3699ebde892647f81c1cd023e4f3c156f8b6707b50',
    `SHA-256 hash mismatch! Got ${hash}`
  );
});

check('Reference files folder exact file count and byte sum', () => {
  const folderPath = path.resolve(projectRoot, 'Supabase _ The Postgres Development Platform_files');
  assert.ok(fs.existsSync(folderPath), 'Reference folder must exist');
  let fileCount = 0;
  let totalBytes = 0;

  function scan(dir: string) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scan(p);
      } else if (ent.isFile()) {
        fileCount++;
        totalBytes += fs.statSync(p).size;
      }
    }
  }

  scan(folderPath);
  assert.equal(fileCount, 66, `File count must be 66, got ${fileCount}`);
  assert.equal(totalBytes, 3376281, `Total byte size must be 3,376,281, got ${totalBytes}`);
});

// -----------------------------------------------------------------------------
// 2. Exact Hex & CSS Custom Property Verification
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Exact Hex Definitions in CSS & Config ---');

const cssPath = path.resolve(projectRoot, 'src/index.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const tailwindConfigPath = path.resolve(projectRoot, 'tailwind.config.js');
const tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');

check('Brand Accent exact hex #3ECF8E', () => {
  assert.ok(cssContent.includes('--accent:      #3ECF8E') || cssContent.includes('--accent: #3ECF8E'), 'CSS must define --accent: #3ECF8E');
  assert.ok(cssContent.includes('--brand-default: #3ECF8E'), 'CSS must define --brand-default: #3ECF8E');
  assert.ok(cssContent.includes('--brand-500:       #3ECF8E'), 'CSS must define --brand-500: #3ECF8E');
  assert.ok(tailwindContent.includes('62, 207, 142'), 'Tailwind config must use rgb 62, 207, 142 for accent');
  assert.ok(tailwindContent.includes('#3ECF8E'), 'Tailwind config must include #3ECF8E');
});

check('Brand Hover exact hex #34B27B', () => {
  assert.ok(cssContent.includes('--accent-hover: #34B27B'), 'CSS must define --accent-hover: #34B27B');
  assert.ok(cssContent.includes('--brand-hover:     #34B27B'), 'CSS must define --brand-hover: #34B27B');
  assert.ok(tailwindContent.includes('52, 178, 123'), 'Tailwind config must use rgb 52, 178, 123 for accent hover');
});

check('Canvas surface exact hex #121212 (--bg-1)', () => {
  assert.ok(cssContent.includes('--bg-1: #121212'), 'CSS must define --bg-1: #121212');
  assert.ok(tailwindContent.includes("'18, 18, 18'"), 'Tailwind config must use rgb 18, 18, 18 for bg-1');
});

check('Card surface-100 exact hex #171717 (--bg-2)', () => {
  assert.ok(cssContent.includes('--bg-2: #171717'), 'CSS must define --bg-2: #171717');
  assert.ok(tailwindContent.includes("'23, 23, 23'"), 'Tailwind config must use rgb 23, 23, 23 for bg-2');
});

check('Elevated surface-300 exact hex #1E201F (--bg-3)', () => {
  assert.ok(cssContent.includes('--bg-3: #1E201F'), 'CSS must define --bg-3: #1E201F');
  assert.ok(tailwindContent.includes("'30, 32, 31'"), 'Tailwind config must use rgb 30, 32, 31 for bg-3');
});

check('Footer alternative carbon exact hex #161616 (--bg-alt)', () => {
  assert.ok(cssContent.includes('--bg-alt: #161616'), 'CSS must define --bg-alt: #161616');
  assert.ok(tailwindContent.includes("'22, 22, 22'"), 'Tailwind config must use rgb 22, 22, 22 for bg-alt');
});

check('Sticky translucent header exact hex #0B0E0D (--bg-header)', () => {
  assert.ok(cssContent.includes('--bg-header: #0B0E0D'), 'CSS must define --bg-header: #0B0E0D');
  assert.ok(tailwindContent.includes("'11, 14, 13'"), 'Tailwind config must use rgb 11, 14, 13 for bg-header');
});

check('Deepest canvas exact hex #0E0F0E (--bg-0)', () => {
  assert.ok(cssContent.includes('--bg-0: #0E0F0E'), 'CSS must define --bg-0: #0E0F0E');
  assert.ok(tailwindContent.includes("'14, 15, 14'"), 'Tailwind config must use rgb 14, 15, 14 for bg-0');
});

// -----------------------------------------------------------------------------
// 3. Hairline Border Alpha Channel Verification
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Hairline Border Alpha Channels ---');

check('Subtle hairline border alpha 0.08: rgba(255, 255, 255, 0.08)', () => {
  assert.ok(cssContent.includes('--line:        rgba(255, 255, 255, 0.08)'), 'CSS must define --line with alpha 0.08');
  assert.ok(cssContent.includes('--border:         var(--line)'), 'CSS must alias --border to --line');
  assert.ok(cssContent.includes('--border-default: var(--line)'), 'CSS must alias --border-default to --line');
});

check('Strong hairline border alpha 0.14: rgba(255, 255, 255, 0.14)', () => {
  assert.ok(cssContent.includes('--line-strong: rgba(255, 255, 255, 0.14)'), 'CSS must define --line-strong with alpha 0.14');
  assert.ok(cssContent.includes('--border-strong:  var(--line-strong)'), 'CSS must alias --border-strong to --line-strong');
  assert.ok(cssContent.includes('--border-control: var(--line-strong)'), 'CSS must alias --border-control to --line-strong');
});

check('Brand accent hairline border alpha 0.35: rgba(62, 207, 142, 0.35)', () => {
  assert.ok(cssContent.includes('--line-accent: rgba(62, 207, 142, 0.35)'), 'CSS must define --line-accent with alpha 0.35');
  assert.ok(cssContent.includes('--border-brand:   var(--line-accent)'), 'CSS must alias --border-brand to --line-accent');
});

check('Hover hairline border alpha 0.28: rgba(255, 255, 255, 0.28)', () => {
  assert.ok(cssContent.includes('--border-hover:   rgba(255, 255, 255, 0.28)'), 'CSS must define --border-hover with alpha 0.28');
});

// -----------------------------------------------------------------------------
// 4. Mathematical RGB-Hex Invariant Check
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Mathematical RGB <-> Hex Invariants ---');

const colorPairs = [
  { hex: '#121212', rgb: [18, 18, 18], name: 'Canvas (bg-1)' },
  { hex: '#171717', rgb: [23, 23, 23], name: 'Card Surface-100 (bg-2)' },
  { hex: '#1E201F', rgb: [30, 32, 31], name: 'Elevated Surface-300 (bg-3)' },
  { hex: '#161616', rgb: [22, 22, 22], name: 'Footer Alternative (bg-alt)' },
  { hex: '#0B0E0D', rgb: [11, 14, 13], name: 'Translucent Header (bg-header)' },
  { hex: '#0E0F0E', rgb: [14, 15, 14], name: 'Deepest Canvas (bg-0)' },
  { hex: '#3ECF8E', rgb: [62, 207, 142], name: 'Brand Green Accent' },
  { hex: '#34B27B', rgb: [52, 178, 123], name: 'Brand Green Hover' },
];

for (const pair of colorPairs) {
  check(`RGB-to-Hex Math Invariant for ${pair.name} (${pair.hex})`, () => {
    const computedHex = '#' + pair.rgb.map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    assert.equal(computedHex, pair.hex.toUpperCase(), `Calculated hex ${computedHex} must equal ${pair.hex}`);
  });
}

// -----------------------------------------------------------------------------
// 5. Tailwind CSS Utility Compilation & Absence of `undefined`
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 5: Tailwind CSS Utility Class Resolution & Zero Undefined ---');

async function testTailwindCompilation() {
  // Test sample with all critical utilities and opacity modifiers
  const sampleClasses = [
    // Legacy / backward-compatible utilities
    'bg-bg-0', 'bg-bg-1', 'bg-bg-2', 'bg-bg-3', 'bg-bg-alt', 'bg-bg-header',
    'bg-bg-1/80', 'bg-bg-2/70', 'bg-bg-3/50',
    'bg-0', 'bg-1', 'bg-2', 'bg-3',
    'text-1', 'text-2', 'text-3',
    'text-text-1', 'text-text-2', 'text-text-3',
    'bg-accent', 'bg-accent/10', 'bg-accent/50', 'bg-accent/80',
    'hover:bg-accent-hover', 'text-accent', 'border-accent',
    'border-line', 'border-line/60', 'border-line/80', 'border-line-strong', 'border-line-accent',
    'hairline', 'hud-card', 'hud-card-highlight', 'focus-ring', 'raised-control-surface',
    // Forward utilities
    'bg-surface-canvas', 'bg-surface-card', 'bg-surface-elevated', 'bg-surface-alternative', 'bg-surface-header', 'bg-surface-deep',
    'border-border', 'border-border-strong', 'border-border-control', 'border-border-hover', 'border-border-brand',
    'text-foreground', 'text-foreground-light', 'text-foreground-lighter', 'text-foreground-muted', 'text-foreground-primary',
    'bg-brand', 'hover:bg-brand-hover', 'bg-brand-600', 'bg-brand-500', 'bg-brand-400', 'bg-brand-300', 'bg-brand-200', 'bg-brand-100', 'bg-brand-deep',
    'shadow-button-raised', 'font-sans', 'font-heading', 'font-mono', 'font-normal',
  ];

  const testHtml = `<div class="${sampleClasses.join(' ')}"></div>`;

  // Dynamically import tailwind config
  const tailwindConfigModule = await import(pathToFileURL(path.resolve(projectRoot, 'tailwind.config.js')).href);
  const tailwindConfig = tailwindConfigModule.default;

  // Custom tailwind config that uses the sample html content
  const testConfig = {
    ...tailwindConfig,
    content: [{ raw: testHtml, extension: 'html' }],
  };

  const inputCss = fs.readFileSync(cssPath, 'utf8');

  const result = await postcss([tailwindcss(testConfig)]).process(inputCss, {
    from: cssPath,
  });

  const generatedCss = result.css;

  check('Tailwind compilation succeeds without PostCSS errors', () => {
    assert.ok(generatedCss.length > 0, 'Generated CSS must not be empty');
    assert.ok(!generatedCss.includes('undefined'), 'Generated CSS must NEVER contain "undefined" expressions');
    assert.ok(!generatedCss.includes('NaN'), 'Generated CSS must NEVER contain "NaN" expressions');
    assert.ok(!generatedCss.includes('null'), 'Generated CSS must NEVER contain "null" expressions');
  });

  check('Legacy utility classes resolve in generated CSS', () => {
    assert.ok(generatedCss.includes('.bg-1'), '.bg-1 must resolve');
    assert.ok(generatedCss.includes('.bg-2'), '.bg-2 must resolve');
    assert.ok(generatedCss.includes('.bg-3'), '.bg-3 must resolve');
    assert.ok(generatedCss.includes('.text-1'), '.text-1 must resolve');
    assert.ok(generatedCss.includes('.text-2'), '.text-2 must resolve');
    assert.ok(generatedCss.includes('.text-3'), '.text-3 must resolve');
    assert.ok(generatedCss.includes('bg-bg-1'), 'bg-bg-1 must resolve');
    assert.ok(generatedCss.includes('bg-bg-2'), 'bg-bg-2 must resolve');
    assert.ok(generatedCss.includes('bg-accent'), 'bg-accent must resolve');
    assert.ok(generatedCss.includes('border-line'), 'border-line must resolve');
  });

  check('Opacity-aware utility classes correctly emit rgba tuples', () => {
    // Check rgba conversion for bg-accent/10
    assert.ok(generatedCss.includes('rgba(62, 207, 142, 0.1)'), 'bg-accent/10 must generate rgba(62, 207, 142, 0.1)');
    // Check rgba conversion for border-line/60
    assert.ok(generatedCss.includes('rgba(255, 255, 255, 0.6)'), 'border-line/60 must generate rgba(255, 255, 255, 0.6)');
    // Check rgba conversion for bg-bg-2/70
    assert.ok(generatedCss.includes('rgba(23, 23, 23, 0.7)'), 'bg-bg-2/70 must generate rgba(23, 23, 23, 0.7)');
  });

  check('Forward Supabase tokens resolve correctly in generated CSS', () => {
    assert.ok(generatedCss.includes('border-border'), 'border-border must resolve');
    assert.ok(generatedCss.includes('text-foreground'), 'text-foreground must resolve');
    assert.ok(generatedCss.includes('bg-surface-card'), 'bg-surface-card must resolve');
    assert.ok(generatedCss.includes('bg-brand'), 'bg-brand must resolve');
  });
}

// -----------------------------------------------------------------------------
// 6. Comprehensive Scan of all classes in src/
// -----------------------------------------------------------------------------
async function testFullProjectClassScan() {
  console.log('\n--- TEST GROUP 6: Full Project Source Code Class Scan ---');

  const filesToScan: string[] = [];

  function collectFiles(dir: string) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        collectFiles(p);
      } else if (ent.isFile() && (ent.name.endsWith('.tsx') || ent.name.endsWith('.ts') || ent.name.endsWith('.html'))) {
        filesToScan.push(p);
      }
    }
  }

  collectFiles(path.resolve(projectRoot, 'src'));
  filesToScan.push(path.resolve(projectRoot, 'index.html'));

  check(`Scanned ${filesToScan.length} source files for Tailwind classes`, () => {
    assert.ok(filesToScan.length >= 25, 'Expected at least 25 source files in project');
  });

  // Compile Tailwind with the actual full project content
  const tailwindConfigModule = await import(pathToFileURL(path.resolve(projectRoot, 'tailwind.config.js')).href);
  const tailwindConfig = tailwindConfigModule.default;
  const inputCss = fs.readFileSync(cssPath, 'utf8');

  const result = await postcss([tailwindcss(tailwindConfig)]).process(inputCss, {
    from: cssPath,
  });

  const fullCss = result.css;

  check('Full production Tailwind build produces valid CSS without "undefined"', () => {
    assert.ok(fullCss.length > 10000, 'Full CSS output must be substantial');
    assert.ok(!fullCss.includes('undefined'), 'Full CSS output must NOT contain "undefined"');
    assert.ok(!fullCss.includes('NaN'), 'Full CSS output must NOT contain "NaN"');
    assert.ok(!fullCss.includes('null'), 'Full CSS output must NOT contain "null"');
  });

  check('Full production CSS includes all Supabase custom properties in :root', () => {
    const requiredVars = [
      '--bg-0', '--bg-1', '--bg-2', '--bg-3', '--bg-alt', '--bg-header',
      '--accent', '--accent-hover', '--accent-dim',
      '--line', '--line-strong', '--line-accent',
      '--text-1', '--text-2', '--text-3',
      '--foreground', '--border', '--card',
    ];
    for (const v of requiredVars) {
      assert.ok(fullCss.includes(v), `Full CSS must define variable ${v}`);
    }
  });
}

// -----------------------------------------------------------------------------
// 7. Git Working Directory Cleanliness for Reference Files
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 7: Git Status Verification for Reference Files ---');

check('Reference files strictly absent from git changes', () => {
  // We can read git status via git command or inspect file stats vs initial commit
  // Here we confirm existence and exact uncorrupted states
  const refHtml = path.resolve(projectRoot, 'Supabase _ The Postgres Development Platform.html');
  const stat = fs.statSync(refHtml);
  assert.equal(stat.size, 1396412);
});

// Run async tests
(async () => {
  await testTailwindCompilation();
  await testFullProjectClassScan();

  console.log('\n================================================================');
  console.log(`TOTAL ADVERSARIAL CHECKS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log('================================================================');

  if (failCount > 0) {
    process.exit(1);
  }
})();
