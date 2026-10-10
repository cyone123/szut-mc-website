import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const htmlPath = resolve('dist/index.html');
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const markup = render();
  if (!markup.includes('苏州工学院') || !markup.includes('<main')) {
    throw new Error('Pre-rendered page is missing its core content.');
  }

  const html = await readFile(htmlPath, 'utf8');
  const marker = '<div id="root"></div>';
  if (html.split(marker).length !== 2) {
    throw new Error('Expected exactly one empty React root in dist/index.html.');
  }

  await writeFile(htmlPath, html.replace(marker, `<div id="root">${markup}</div>`));
  console.log('Pre-rendered SZUT-MC homepage to dist/index.html');
} finally {
  await vite.close();
}
