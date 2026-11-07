const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

// Find all headings (h1, h2, h3)
const headingMatches = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi);
console.log('Total headings found:', headingMatches ? headingMatches.length : 0);
if (headingMatches) {
  headingMatches.slice(0, 15).forEach((h, i) => {
    // strip tags to see text
    const text = h.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const tag = h.match(/<h[1-4][^>]*>/i)[0];
    console.log(`${i + 1}. [${tag.slice(0, 100)}] -> ${text.slice(0, 80)}`);
  });
}
