const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

// Find definitions of surface, background, card, border, muted, secondary, accent, popover
const tokensToInspect = [
  '--surface',
  '--card',
  '--background',
  '--border',
  '--foreground',
  '--muted',
  '--accent',
  '--secondary',
  '--popover',
  '--input',
  '--ring',
  '--brand',
  '--brand-default',
  '--surface-hue',
  '--chroma',
  '--tone-span',
  '--elevation',
  '--border-strong',
  '--border-muted',
  '--border-control',
  '--border-alternative',
  '--background-default',
  '--background-surface-100',
  '--background-surface-200',
  '--background-surface-300',
  '--background-surface-75',
  '--background-muted',
  '--background-selection',
  '--background-control',
  '--background-overlay-default',
  '--background-overlay-hover',
  '--foreground-default',
  '--foreground-light',
  '--foreground-lighter',
  '--foreground-muted',
  '--foreground-contrast'
];

for (const t of tokensToInspect) {
  const reg = new RegExp(`(${t}\\s*:[^;{}]+;)`, 'g');
  const matches = content.match(reg);
  if (matches) {
    console.log(`\n=== ${t} ===`);
    console.log(Array.from(new Set(matches)).join('\n'));
  }
}
