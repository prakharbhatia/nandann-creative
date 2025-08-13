const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'data', 'blogPosts.ts');
const src = fs.readFileSync(file, 'utf8');

function lastMatchBefore(re, text, index) {
  let m, last = null;
  const slice = text.slice(0, index);
  while ((m = re.exec(slice))) {
    last = m;
  }
  return last;
}

const results = [];
let idx = 0;
const marker = 'contentHtml: `';
while (true) {
  const start = src.indexOf(marker, idx);
  if (start === -1) break;

  // find end backtick not escaped
  let i = start + marker.length;
  let end = i;
  while (true) {
    end = src.indexOf('`', end);
    if (end === -1) break;
    // count preceding backslashes
    let b = 0;
    for (let k = end - 1; k >= 0 && src[k] === '\\'; k--) b++;
    if (b % 2 === 0) break; // unescaped backtick
    end++;
  }
  const html = src.slice(i, end);

  const slugM = lastMatchBefore(/slug:\s*'([^']+)'/g, src, start);
  const titleM = lastMatchBefore(/title:\s*'([^']+)'/g, src, start);
  const slug = slugM ? slugM[1] : '?';
  const title = titleM ? titleM[1] : slug;

  const text = html
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-zA-Z#0-9]+;/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean);
  results.push({ slug, title, words: words.length });

  idx = end + 1;
}

console.log(JSON.stringify(results, null, 2));

