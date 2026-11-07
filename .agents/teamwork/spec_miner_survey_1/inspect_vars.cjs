const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('Supabase _ The Postgres Development Platform_files', '768902fa471e0736.css');
const content = fs.readFileSync(cssPath, 'utf8');

// Find all CSS variables defined in :root, .dark, or anywhere
const varDefRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;{}]+);/g;
let match;
const vars = {};
while ((match = varDefRegex.exec(content)) !== null) {
  const name = match[1];
  const value = match[2].trim();
  if (!vars[name]) vars[name] = new Set();
  vars[name].add(value);
}

console.log('Total unique variable names:', Object.keys(vars).length);

// Let's filter by brand, green, bg, background, foreground, border, text, card, surface
const categories = {
  brand: [],
  green: [],
  background: [],
  surface: [],
  foreground: [],
  border: [],
  text: [],
  carbon: [],
  radius: [],
  font: [],
  shadow: []
};

for (const [name, valSet] of Object.entries(vars)) {
  const vals = Array.from(valSet);
  const n = name.toLowerCase();
  if (n.includes('brand')) categories.brand.push({ name, vals });
  if (n.includes('green')) categories.green.push({ name, vals });
  if (n.includes('bg') || n.includes('background')) categories.background.push({ name, vals });
  if (n.includes('surface')) categories.surface.push({ name, vals });
  if (n.includes('foreground')) categories.foreground.push({ name, vals });
  if (n.includes('border')) categories.border.push({ name, vals });
  if (n.includes('text') || n.includes('muted')) categories.text.push({ name, vals });
  if (n.includes('radius')) categories.radius.push({ name, vals });
  if (n.includes('font')) categories.font.push({ name, vals });
  if (n.includes('shadow')) categories.shadow.push({ name, vals });
}

console.log('--- Brand variables ---');
console.log(categories.brand);

console.log('--- Green variables ---');
console.log(categories.green);

console.log('--- Background variables ---');
console.log(categories.background);

console.log('--- Surface variables ---');
console.log(categories.surface);

console.log('--- Border variables ---');
console.log(categories.border);

console.log('--- Foreground / Text variables ---');
console.log(categories.foreground.concat(categories.text));

console.log('--- Radius variables ---');
console.log(categories.radius);

console.log('--- Font variables ---');
console.log(categories.font);
