const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const matches = html.match(/<[^>]+class="[^"]*rounded-full[^"]*"[^>]*>/gi);
console.log('Total rounded-full elements:', matches ? matches.length : 0);
if (matches) {
  const unique = Array.from(new Set(matches));
  console.log('Unique rounded-full elements:');
  unique.forEach((u, i) => console.log(`${i + 1}: ${u.slice(0, 300)}`));
}
