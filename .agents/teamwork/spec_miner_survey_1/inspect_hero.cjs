const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const h1Idx = html.indexOf('<h1');
console.log('--- HERO SECTION AROUND H1 ---');
console.log(html.substring(Math.max(0, h1Idx - 500), Math.min(html.length, h1Idx + 2500)));
