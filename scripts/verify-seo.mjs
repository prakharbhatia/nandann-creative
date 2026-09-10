import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const pagesDirectory = join(process.cwd(), '.next', 'server', 'pages');
const errors = [];
const titleOwners = new Map();
let checkedPages = 0;
const excludedRoutes = new Set(['/404', '/500', '/pixlify-admin', '/rapid-delivery']);

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? findHtmlFiles(path) : [path];
  }));
  return files.flat().filter((path) => path.endsWith('.html'));
}

function decodeHtml(value) {
  const named = {
    amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"',
  };
  return value
    .replace(/&#(\d+);/g, (_match, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([\da-f]+);/gi, (_match, number) => String.fromCodePoint(Number.parseInt(number, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pagePath(file) {
  const path = relative(pagesDirectory, file).split(sep).join('/').replace(/\.html$/, '');
  return path === 'index' ? '/' : `/${path.replace(/\/index$/, '')}`;
}

for (const file of await findHtmlFiles(pagesDirectory)) {
  const route = pagePath(file);
  if (excludedRoutes.has(route)) continue;

  const html = await readFile(file, 'utf8');
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
  const title = titleMatch ? decodeHtml(titleMatch[1]) : '';
  const description = descriptionMatch ? decodeHtml(descriptionMatch[1]) : '';
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));

  checkedPages += 1;

  if (!title || title.length > 60) {
    errors.push(`${route}: title length ${title.length}`);
  } else {
    const owner = titleOwners.get(title);
    if (owner) errors.push(`${route}: duplicate title also used by ${owner}`);
    else titleOwners.set(title, route);
  }

  if (!description || description.length < 70 || description.length > 160) {
    errors.push(`${route}: description length ${description.length}`);
  }

  if (headings.filter((level) => level === 1).length !== 1) {
    errors.push(`${route}: expected one H1, found ${headings.filter((level) => level === 1).length}`);
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] > headings[index - 1] + 1) {
      errors.push(`${route}: heading skips H${headings[index - 1]} to H${headings[index]}`);
      break;
    }
  }

  if (canonicalMatch && new URL(canonicalMatch[1]).hostname !== 'www.nandann.com') {
    errors.push(`${route}: canonical does not use www.nandann.com`);
  }
}

if (errors.length > 0) {
  console.error(`SEO verification failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`SEO verification passed for ${checkedPages} generated HTML pages.`);
}
