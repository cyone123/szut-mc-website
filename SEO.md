# SZUT-MC SEO 与部署验收

生产站点：https://szut-mc.cc.cd/

## 本地构建与检查

```bash
pnpm install
pnpm build
pnpm test:seo
pnpm lint
```

`pnpm build` 先执行 TypeScript 校验和 Vite 构建，再在构建时将 React 首页渲染为完整的 `dist/index.html`。部署仍然是 Vercel 静态站点，不需要运行时 Node 服务器。开发环境 `pnpm dev` 继续使用 CSR；生产环境使用 hydration 保留交互。

## 部署后验证

1. 确认 Vercel 的 Build Command 为 `pnpm build`（或使用 package.json 自动检测），Output Directory 为 `dist`。
2. 查看 https://szut-mc.cc.cd/ 的“网页源代码”，确认存在 <main>、H1、介绍文字，而不是空的 React root。
3. 验证 https://szut-mc.cc.cd/robots.txt 与 https://szut-mc.cc.cd/sitemap.xml 返回 HTTP 200，且内容类型正确。
4. 验证 https://szut-mc.cc.cd/og-cover.png 可以访问，并用社交分享调试工具检查链接预览。
5. 在 Google Search Console / Bing Webmaster Tools / 百度搜索资源平台验证站点所有权，提交 sitemap，并检查真实索引状态。
6. 运行 PageSpeed Insights，检查移动端 LCP、INP、CLS；实际优化以测量结果为依据。

注意：源代码修改本身不会部署线上网站，也不保证搜索引擎收录。不要把预览域名或不存在的 SPA 路径纳入 sitemap。更换生产域名时，需同步更新 index.html、robots.txt、sitemap.xml 与这里的说明。

## 预渲染维护

- `src/entry-server.tsx`：只在构建时渲染 React。
- `scripts/prerender.mjs`：将 SSR 输出注入 Vite 的 dist/index.html。
- `src/main.tsx`：开发环境挂载 React，生产 HTML 使用 hydrateRoot。
- `src/context/ThemeContext.tsx`：首次渲染保持 dark，hydration 后读取本地主题设置，避免首屏 Hydration 不一致。
- `tests/seo.test.mjs`：检查静态内容、元数据、爬虫文件和分享封面。
