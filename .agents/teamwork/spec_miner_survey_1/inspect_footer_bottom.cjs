const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const footerIdx = html.indexOf('<footer');
console.log(html.substring(footerIdx + 3000, Math.min(html.length, footerIdx + 9000)));
