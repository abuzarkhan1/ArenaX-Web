const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

const targets = [
  'control-surface-shadows',
  'raised-control-surface',
  'focus-ring',
  '--button-shadow-raised',
  'primary-solid',
  'section-container'
];

for (const t of targets) {
  let idx = 0;
  console.log(`\n=================== SEARCH: ${t} ===================`);
  while ((idx = content.indexOf(t, idx)) !== -1) {
    // print rule around it
    const start = content.lastIndexOf('{', idx);
    const selStart = content.lastIndexOf('}', start);
    const end = content.indexOf('}', idx);
    console.log(content.substring(Math.max(0, selStart + 1), Math.min(content.length, end + 1)).trim());
    idx = end + 1;
    if (idx > 500000) break;
  }
}
