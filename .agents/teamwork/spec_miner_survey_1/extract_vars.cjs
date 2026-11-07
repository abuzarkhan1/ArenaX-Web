const fs = require('fs');
const path = require('path');

const cssDir = path.resolve('Supabase _ The Postgres Development Platform_files');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

console.log('CSS files found:', files);

for (const file of files) {
  const fullPath = path.join(cssDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`\n=================== FILE: ${file} (length: ${content.length}) ===================`);
  
  // Find :root and .dark rules or CSS variables
  const varMatches = content.match(/--[a-zA-Z0-9_-]+:\s*[^;{}]+/g);
  if (varMatches) {
    console.log(`Found ${varMatches.length} CSS variable declarations.`);
    const uniqueVars = Array.from(new Set(varMatches));
    console.log('Sample CSS variables:', uniqueVars.slice(0, 40));
  } else {
    console.log('No CSS variables found.');
  }

  // Find font-family declarations
  const fontMatches = content.match(/font-family:[^;{}]+/g);
  if (fontMatches) {
    const uniqueFonts = Array.from(new Set(fontMatches));
    console.log('Unique font-family declarations:', uniqueFonts);
  }

  // Find @font-face rules
  const fontFaceMatches = content.match(/@font-face\s*\{[^}]+\}/g);
  if (fontFaceMatches) {
    console.log(`Found ${fontFaceMatches.length} @font-face rules. Sample:`, fontFaceMatches.slice(0, 3));
  }
}
