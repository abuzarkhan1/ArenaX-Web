const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const cardIdx = html.indexOf('tweet-card');
console.log('tweet-card index:', cardIdx);
if (cardIdx !== -1) {
  console.log(html.substring(Math.max(0, cardIdx - 400), Math.min(html.length, cardIdx + 1200)));
}
