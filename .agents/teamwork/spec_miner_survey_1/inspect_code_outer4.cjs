const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const nextIdx = html.indexOf('aria-label="Next.js"');
console.log(html.substring(Math.max(0, nextIdx - 1000), nextIdx));
