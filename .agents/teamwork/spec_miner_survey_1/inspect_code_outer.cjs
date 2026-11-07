const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const preIdx = html.indexOf('role="tabpanel"');
console.log(html.substring(Math.max(0, preIdx - 3500), Math.max(0, preIdx - 1500)));
