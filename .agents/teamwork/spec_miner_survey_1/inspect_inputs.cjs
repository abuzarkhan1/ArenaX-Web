const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

const inputMatches = html.match(/<input[^>]*>/gi);
console.log('Total input elements:', inputMatches ? inputMatches.length : 0);
if (inputMatches) {
  inputMatches.forEach((inp, i) => console.log(`${i + 1}: ${inp}`));
}
