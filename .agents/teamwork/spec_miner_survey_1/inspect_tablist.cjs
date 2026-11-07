const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const tablistIdx = html.indexOf('role="tablist"');
console.log('tablistIdx:', tablistIdx);
if (tablistIdx !== -1) {
  console.log(html.substring(Math.max(0, tablistIdx - 400), Math.min(html.length, tablistIdx + 600)));
}
