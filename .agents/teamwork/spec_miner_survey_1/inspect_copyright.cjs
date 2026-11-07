const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const copyIdx = html.indexOf('©');
console.log(html.substring(copyIdx - 200, Math.min(html.length, copyIdx + 1500)));
