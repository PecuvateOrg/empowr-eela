// Builds lib/site-index.generated.json from every app/**/page.tsx — the one
// list that sitemap.ts and the /llms.txt route are generated from. Runs as
// prebuild/predev, so a new page appears in both without anyone editing them.
//
// It reads each page's `export const metadata` with a regex, so title and
// description must stay plain string literals. A page with no readable title
// FAILS the build rather than shipping a blank entry.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const appDir = join(root, 'app');
const out = join(root, 'lib', 'site-index.generated.json');

function findPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      // Route groups, private folders and dynamic segments have no single URL.
      if (/^[_(\[]/.test(name)) return [];
      return findPages(full);
    }
    return name === 'page.tsx' ? [full] : [];
  });
}

function readString(block, key) {
  const m = block.match(new RegExp(`${key}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`, 's'));
  return m ? m[2].replace(/\\(['"])/g, '$1') : undefined;
}

const errors = [];
const pages = findPages(appDir)
  .map((file) => {
    const rel = relative(appDir, file).split(sep).slice(0, -1).join('/');
    const path = rel ? `/${rel}` : '/';
    const src = readFileSync(file, 'utf8');
    const block = src.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? '';
    const title = readString(block, 'title');
    if (!title) errors.push(`${relative(root, file)}: no plain-string metadata.title`);
    return { path, title, description: readString(block, 'description') };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

if (errors.length) {
  console.error(`gen-site-index: ${errors.length} page(s) unreadable:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}

writeFileSync(out, JSON.stringify(pages, null, 2) + '\n');
console.log(`gen-site-index: ${pages.length} pages → ${relative(root, out)}`);
