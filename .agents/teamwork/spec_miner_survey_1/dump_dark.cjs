const fs = require('fs');

const data = JSON.parse(fs.readFileSync('.agents/teamwork/spec_miner_survey_1/extracted_root_dark.json', 'utf8'));

console.log('--- DARK BLOCKS ---');
for (const b of data.darkBlocks) {
  // if selector is short or has many vars
  if (b.selector.length < 100 || b.body.includes('--')) {
    console.log(`SELECTOR: ${b.selector}`);
    const vars = b.body.split(';').map(s => s.trim()).filter(Boolean);
    for (const v of vars) {
      if (v.startsWith('--') || v.includes('color') || v.includes('background') || v.includes('border')) {
        console.log(`  ${v}`);
      }
    }
  }
}
