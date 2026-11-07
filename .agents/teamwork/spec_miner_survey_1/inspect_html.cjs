const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve('Supabase _ The Postgres Development Platform.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('HTML length:', content.length);

// Look for <html ...>, <body ...>, header, nav, hero, buttons, cards, footer
const htmlTag = content.match(/<html[^>]*>/i);
const bodyTag = content.match(/<body[^>]*>/i);
console.log('HTML tag:', htmlTag ? htmlTag[0] : 'not found');
console.log('Body tag:', bodyTag ? bodyTag[0] : 'not found');

// Find occurrences of class names containing button, card, nav, hero, badge, header, footer
const classMatches = content.match(/class="([^"]+)"/g);
console.log(`Total class attributes: ${classMatches ? classMatches.length : 0}`);

// Let's sample common class combinations
const classesSet = new Set();
if (classMatches) {
  for (const c of classMatches) {
    const val = c.replace(/class="|"/g, '');
    val.split(/\s+/).forEach(cls => classesSet.add(cls));
  }
}
console.log(`Total unique classes used: ${classesSet.size}`);

// Find classes matching button, card, header, nav, bg-, border-, text-
const sampleClasses = Array.from(classesSet);
const bgClasses = sampleClasses.filter(c => c.startsWith('bg-') || c.includes(':bg-'));
const borderClasses = sampleClasses.filter(c => c.startsWith('border-') || c.includes(':border-'));
const textClasses = sampleClasses.filter(c => c.startsWith('text-') || c.includes(':text-'));

console.log('Sample bg- classes (first 30):', bgClasses.slice(0, 30));
console.log('Sample border- classes (first 30):', borderClasses.slice(0, 30));
console.log('Sample text- classes (first 30):', textClasses.slice(0, 30));
