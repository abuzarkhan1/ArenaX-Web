const fs = require('fs');

const css = fs.readFileSync('Supabase _ The Postgres Development Platform_files/768902fa471e0736.css', 'utf8');

const regex = /--color-brand-\d+:[^;{}]+/g;
const matches = css.match(regex);
console.log('Brand scale:', Array.from(new Set(matches)));

const greenRegex = /--color-green-\d+:[^;{}]+/g;
const greenMatches = css.match(greenRegex);
console.log('Green scale:', Array.from(new Set(greenMatches)));
