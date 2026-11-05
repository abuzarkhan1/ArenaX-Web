#!/usr/bin/env node

/**
 * Unified Automated Verification Suite for ArenaX-Web.
 *
 * Executes the complete validation pipeline:
 *  1. TypeScript typecheck (`tsc --noEmit -p tsconfig.app.json`)
 *  2. ESLint checks (`eslint .`)
 *  3. Production build integrity (`vite build`)
 *  4. Automated Layout & Copy Verification Suite (Requirement R1)
 *  5. Functional Invariants & Calculations Suite (Requirement R3)
 *  6. 4-Tier Test Case Suite:
 *      - Tier 1: Comprehensive Feature Coverage (Features 1–20)
 *      - Tier 2: Boundary & Corner Cases
 *      - Tier 3: Cross-Feature Interactions
 *      - Tier 4: Real-World Scenarios
 */

import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();

function printBanner() {
  console.log('================================================================');
  console.log('       ARENAX-WEB UNIFIED VERIFICATION SUITE (E2E TRACK)        ');
  console.log('================================================================');
  console.log(`Working Directory: ${projectRoot}`);
  console.log(`Node Version:      ${process.version}`);
  console.log(`Execution Mode:    Strict Zero-Defect Baseline`);
  console.log('----------------------------------------------------------------\n');
}

interface StepResult {
  step: string;
  command: string;
  durationMs: number;
  passed: boolean;
  output?: string;
}

const results: StepResult[] = [];

function runStep(name: string, command: string, args: string[]): boolean {
  console.log(`▶ [RUNNING] ${name}...`);
  const startTime = Date.now();

  const proc = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'pipe',
    shell: true,
    encoding: 'utf8',
    env: { ...process.env, STRICT_R1: 'true' },
  });

  const durationMs = Date.now() - startTime;
  const passed = proc.status === 0;

  results.push({
    step: name,
    command: `${command} ${args.join(' ')}`,
    durationMs,
    passed,
    output: passed ? proc.stdout : (proc.stderr || proc.stdout),
  });

  if (passed) {
    console.log(`✔ [PASSED]  ${name} (${(durationMs / 1000).toFixed(2)}s)`);
  } else {
    console.error(`✖ [FAILED]  ${name} (${(durationMs / 1000).toFixed(2)}s)`);
    console.error(proc.stderr || proc.stdout);
  }

  return passed;
}

function main() {
  printBanner();
  const suiteStart = Date.now();

  // 1. TypeScript Typecheck
  const typecheckOk = runStep('1. TypeScript Typecheck', 'npm', ['run', 'typecheck']);
  if (!typecheckOk) process.exit(1);

  // 2. ESLint
  const lintOk = runStep('2. ESLint Code Analysis', 'npm', ['run', 'lint']);
  if (!lintOk) process.exit(1);

  // 3. Production Build
  const buildOk = runStep('3. Vite Production Build', 'npm', ['run', 'build']);
  if (!buildOk) process.exit(1);

  // 4. Automated 5-Tier Test Suites + Layout & Copy Scanner + Challenger Suites
  const testFiles = [
    'tests/functional-invariants.test.ts',
    'tests/layout-copy-verification.test.ts',
    'tests/challenger-m1-adversarial.test.ts',
    'tests/challenger-m2-adversarial.test.ts',
    'tests/challenger-m2-2-adversarial.test.ts',
    'tests/challenger-m3-1.test.ts',
    'tests/challenger-m3-2.test.ts',
    'tests/mobile-drawer-overflow-bug.test.ts',
    'tests/tier1-feature-coverage.test.ts',
    'tests/tier2-boundary-corner-cases.test.ts',
    'tests/tier3-cross-feature.test.ts',
    'tests/tier4-real-world-scenarios.test.ts',
    'tests/tier5-adversarial-hardening.test.ts',
  ];

  const testArgs = ['--test', ...testFiles];
  const testsOk = runStep('4. Automated Test Suites (Tiers 1–5 & R1/R3)', 'node', testArgs);
  if (!testsOk) process.exit(1);

  const totalDuration = ((Date.now() - suiteStart) / 1000).toFixed(2);

  console.log('\n================================================================');
  console.log('                 VERIFICATION SUMMARY RESULTS                   ');
  console.log('================================================================');
  for (const r of results) {
    const status = r.passed ? 'PASS' : 'FAIL';
    const padding = ' '.repeat(Math.max(2, 45 - r.step.length));
    console.log(` ${r.step}${padding}[${status}] (${(r.durationMs / 1000).toFixed(2)}s)`);
  }
  console.log('----------------------------------------------------------------');
  console.log(` OVERALL STATUS: ALL CHECKS PASSED (Total: ${totalDuration}s)`);
  console.log('================================================================\n');

  process.exit(0);
}

main();
