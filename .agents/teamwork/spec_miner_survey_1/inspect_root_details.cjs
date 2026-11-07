const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

// Find the block around :root { ... }
const rootMatch = content.match(/:root\s*\{([^}]+)\}/);
if (rootMatch) {
  console.log('--- FIRST :root BLOCK ---');
  console.log(rootMatch[1].slice(0, 3000));
}

// Find all occurrences of ":root{" or ":root {"
let idx = 0;
while ((idx = content.indexOf(':root', idx)) !== -1) {
  const end = content.indexOf('}', idx);
  console.log(`\n--- :root block at ${idx} ---`);
  console.log(content.substring(idx, Math.min(idx + 1000, end + 1)));
  idx = end + 1;
}
