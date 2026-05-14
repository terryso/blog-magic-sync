# 全新博客网站方案

放弃复刻原站(米色 + 大衬线),做一个**全新的现代设计**。文章用 Markdown 文件管理,丢到指定目录后构建时自动收录、生成路由、渲染。

## 工作流(给你)

1. 在 `content/posts/` 目录下放一个 `.md` 文件,文件名即 URL slug,例如:
   `content/posts/2026-05-14-bmad-story-automator-intro.md` → `/posts/2026-05-14-bmad-story-automator-intro`
2. 文件顶部用 YAML frontmatter(完全兼容你现有的 Jekyll 格式):
   ```yaml
   ---
   title: "..."
   description: "..."
   date: 2026-05-14 10:25:36 +0800
   categories: [AI, BMAD]
   tags: [BMAD, Claude Code]
   ---
   ```
3. 保存 → Vite HMR 热更新,首页列表和文章页立即出现。无需运行任何命令。

## 功能范围(v1)

- **首页**:文章列表,按日期倒序,显示标题/描述/日期/标签
- **文章页** `/posts/$slug`:渲染 Markdown 正文,支持 GFM(表格、任务列表、删除线)、代码块语法高亮、图片、引用块
- **标签页** `/tags/$tag`:按标签筛选文章
- **关于页** `/about`:简单介绍
- **每篇文章独立的 SEO**:title、description、og:title、og:description、og:image(若 frontmatter 有指定)
- **响应式**:桌面 / 平板 / 手机
- **RSS feed** `/rss.xml`(可选,先不做也行)

## 不做的(v1)

- 评论、点赞、订阅、搜索 — 静态站点先求简
- 后台编辑器 — 你直接编辑 Markdown 文件
- 多作者 / 草稿状态 / 定时发布 — 都靠 frontmatter 字段后续轻松扩展

## 设计方向

会用 design--create_directions 生成 **3 个完全不同的现代设计方向**(都不是原站的米色衬线风),你选一个再实现。方向涵盖类似:
- 暗色 editorial(深色背景 + 高对比 + 衬线大标题)
- 极简瑞士风(白底 + 无衬线 + 严格网格 + 大量留白)
- Terminal/技术博主风(等宽字体 + 单色调 + 行号感)

## 技术细节(可跳过)

- Markdown 收集:`import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw', import: 'default' })` —— Vite 在构建/dev 时静态扫描目录,新增文件 HMR 自动生效
- Frontmatter 解析:`gray-matter`
- Markdown 渲染:`react-markdown` + `remark-gfm` + `rehype-highlight`(代码高亮)+ `rehype-raw`(支持 frontmatter 里的内嵌 HTML,例如你示例文件里的 `<img style="...">`)
- 路由:TanStack Start 文件路由
  - `src/routes/index.tsx` — 首页列表
  - `src/routes/posts.$slug.tsx` — 文章详情
  - `src/routes/tags.$tag.tsx` — 标签页
  - `src/routes/about.tsx` — 关于
- 文章数据访问统一在 `src/lib/posts.ts`,导出 `getAllPosts()` / `getPostBySlug()`,组件直接调用,SSR 友好
- 你的示例 frontmatter 字段(`layout`、`categories`、`tags`、中文带 +0800 的 date)全部解析正确并显示
- 图片:Markdown 里 `![](url)` 直接生效;你示例文件里的远程 `https://blog.terryso.dev/images/...` 也能直接渲染。后续若想本地化,把图片放到 `public/images/posts/<slug>/` 即可

## 上传的示例文件如何处理

`2026-05-14-bmad-story-automator-intro.md` 会作为**首篇示例文章**复制到 `content/posts/`,这样网站一上线就有内容,你也能直接看到渲染效果对不对。

## 实施顺序

1. 安装依赖 `gray-matter` `react-markdown` `remark-gfm` `rehype-highlight` `rehype-raw` `highlight.js`
2. 调 design--create_directions 出 3 个方向 → 你选一个
3. 建 `content/posts/` + 复制示例 md
4. 写 `src/lib/posts.ts`(扫描+解析+缓存)
5. 写路由 + 组件 + 设计系统(token 写到 `src/styles.css`)
6. 验证示例文章渲染正确(代码块、图片、引用、frontmatter)

确认后我先生成 3 个设计方向给你挑。