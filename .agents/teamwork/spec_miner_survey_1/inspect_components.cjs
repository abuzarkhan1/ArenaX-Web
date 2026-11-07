const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

// Function to find element by tag/class snippet and print its outerHTML or snippet
function findSnippet(keyword, maxLen = 1500) {
  const idx = html.indexOf(keyword);
  if (idx === -1) return null;
  return html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + maxLen));
}

console.log('--- NAVBAR / HEADER SNIPPET ---');
const navSnippet = findSnippet('<nav');
console.log(navSnippet ? navSnippet.slice(0, 1500) : 'No nav found');

console.log('\n--- HERO SECTION SNIPPET ---');
const heroSnippet = findSnippet('Start your project');
console.log(heroSnippet ? heroSnippet.slice(0, 1500) : 'Hero button not found');

console.log('\n--- ANNOUNCEMENT PILL / BADGE ---');
const badgeSnippet = findSnippet('announcement');
console.log(badgeSnippet ? badgeSnippet.slice(0, 1500) : 'announcement not found');

console.log('\n--- FOOTER SNIPPET ---');
const footerSnippet = findSnippet('<footer');
console.log(footerSnippet ? footerSnippet.slice(0, 1500) : 'footer not found');
