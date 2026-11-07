const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

console.log(content.substring(445000, 452000));
