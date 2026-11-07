const fs = require('fs');

const html = fs.readFileSync('Supabase _ The Postgres Development Platform.html', 'utf8');

// Find occurrences of <pre or code or SQL or terminal
const preMatches = html.match(/<pre[^>]*>[\s\S]*?<\/pre>/gi);
console.log('Pre matches:', preMatches ? preMatches.length : 0);
if (preMatches) {
  preMatches.slice(0, 5).forEach((p, i) => {
    console.log(`\n--- PRE ${i + 1} ---`);
    console.log(p.slice(0, 500));
  });
}

// Find tabs or code block wrappers
const codeSnippets = html.match(/class="[^"]*code[^"]*"/gi);
console.log('\nClasses with "code":', codeSnippets ? Array.from(new Set(codeSnippets)).slice(0, 20) : 'none');
