const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const preIdx = html.indexOf('class="shiki supabase-dark"');
console.log(html.substring(Math.max(0, preIdx - 1200), Math.min(html.length, preIdx + 1200)));
