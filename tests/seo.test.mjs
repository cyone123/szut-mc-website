import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('homepage exposes semantic content without JavaScript', () => {
  assert.match(html, /<main\b/);
  assert.match(html, /<h1\b/);
  assert.match(html, /关于苏州工学院 MC 组织/);
  // Answers inside collapsed FAQ panels must still exist in the static HTML.
  assert.match(html, /活动服期间会根据需要开启 Geyser/);
  assert.match(html, /QQ.*913295535/);
  assert.doesNotMatch(html, /<div id="root"><\/div>/);
});

test('homepage declares SEO metadata', () => {
  assert.match(html, /<html lang="zh-CN"/);
  assert.match(html, /rel="canonical" href="https:\/\/szut-mc\.cc\.cd\/"/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /type="application\/ld\+json"/);
});

test('crawler discovery files and preview image ship in dist', async () => {
  const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const cover = await readFile(new URL('../dist/og-cover.png', import.meta.url));
  assert.match(robots, /Sitemap: https:\/\/szut-mc\.cc\.cd\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/szut-mc\.cc\.cd\/<\/loc>/);
  assert.equal(cover.readUInt32BE(16), 1200);
  assert.equal(cover.readUInt32BE(20), 630);
});
