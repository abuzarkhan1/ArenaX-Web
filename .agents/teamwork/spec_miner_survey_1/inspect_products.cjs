const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const prodIdx = html.indexOf('id="products"');
console.log(html.substring(prodIdx, Math.min(html.length, prodIdx + 3000)));
