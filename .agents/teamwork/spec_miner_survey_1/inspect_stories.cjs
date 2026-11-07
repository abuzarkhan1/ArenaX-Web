const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const lovIdx = html.indexOf('Chatbase');
console.log('Chatbase index:', lovIdx);
if (lovIdx !== -1) {
  console.log(html.substring(Math.max(0, lovIdx - 600), Math.min(html.length, lovIdx + 1200)));
}
