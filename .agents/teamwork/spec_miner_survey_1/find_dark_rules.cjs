const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

// Find all blocks matching :root or .dark or [data-theme=dark]
const darkBlocks = [];
const rootBlocks = [];

// Let's search for blocks with :root or .dark
const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
let match;
while ((match = ruleRegex.exec(content)) !== null) {
  const selector = match[1].trim();
  const body = match[2].trim();
  if (selector.includes(':root') || selector.includes('.dark') || selector.includes('[data-theme')) {
    if (selector.includes('.dark') || selector.includes('data-theme="dark"') || selector.includes("data-theme='dark'")) {
      darkBlocks.push({ selector, body });
    } else {
      rootBlocks.push({ selector, body });
    }
  }
}

console.log(`Found ${rootBlocks.length} root blocks and ${darkBlocks.length} dark blocks.`);

// Write out root and dark blocks to a file in our directory to inspect
fs.writeFileSync('.agents/teamwork/spec_miner_survey_1/extracted_root_dark.json', JSON.stringify({ rootBlocks, darkBlocks }, null, 2));

console.log('Saved to extracted_root_dark.json');
