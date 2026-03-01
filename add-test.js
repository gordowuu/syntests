#!/usr/bin/env node
/**
 * SynTests — Add a new test set
 *
 * Usage:
 *   node add-test.js <test-name>
 *
 * Example:
 *   node add-test.js cup-stacking
 *
 * This will:
 *   1. Create public/tests/<test-name>/
 *   2. Copy the template index.html into it
 *   3. Print next steps
 */

const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('Usage: node add-test.js <test-name>');
  process.exit(1);
}

const slug = name.toLowerCase().replace(/\s+/g, '-');
const dest = path.join(__dirname, 'public', 'tests', slug);
const tmpl = path.join(__dirname, 'template', 'index.html');

if (fs.existsSync(dest)) {
  console.error(`Test "${slug}" already exists at ${dest}`);
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });

let html = fs.readFileSync(tmpl, 'utf8');
html = html.replaceAll('MY TEST NAME', slug);
html = html.replaceAll('my-test-name', slug);
fs.writeFileSync(path.join(dest, 'index.html'), html);

console.log(`
✅ Created: public/tests/${slug}/

Next steps:
  1. Drop your MP4 files into: public/tests/${slug}/
  2. Edit public/tests/${slug}/index.html
       → update the "videos" array with your filenames
  3. Add a card to public/index.html:
       <a class="card" href="/tests/${slug}/">
         <div class="card-title">${slug}</div>
         <div class="card-meta">X videos · Xs · 1 original, N generated</div>
         <div class="card-badge">task_${slug}</div>
       </a>
  4. Deploy: npx vercel --prod
`);
