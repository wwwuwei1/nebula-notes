# Nebula Notes · 个人博客实践项目

> 使用 **Supabase（后端 / 数据存储）** + **Netlify（前端部署）** 打造的三页面以上、三数据表的全栈个人博客示例。你可以直接部署成自己的作品，也可以在此基础上二次开发。

## ✅ 功能亮点

- **至少 3 个页面**
  - 首页：Hero + 站点数据 + 最新文章
  - 文章页：列表 / 搜索 / 详情 + 评论
  - 创作中心：在线写作、发布、草稿管理
  - 额外：关于页用于作品介绍
- **Supabase 3 张核心数据表**
  1. `profiles`：作者资料，和 `auth.users` 同步
  2. `posts`：博客内容，支持草稿/发布状态、标签、封面
  3. `comments`：留言互动，外键关联文章与作者
- **鉴权 / 评论 / Realtime**
  - Supabase Auth 邮箱登录/注册
  - 完整 CRUD 服务封装，便于扩展
  - Tailwind + React Router + Vite + TypeScript 的现代前端栈

---

## 🏗️ 目录结构

```
Personal Vlog
├─ public/
├─ src/
│  ├─ components/    UI 原子与复合组件
│  ├─ hooks/         Supabase 鉴权 hook
│  ├─ lib/           Supabase / dayjs 配置
│  ├─ pages/         路由页面（Home / Posts / Studio / About / Detail）
│  ├─ services/      与 Supabase 的数据交互
│  └─ styles/        Tailwind + 全局样式
├─ env.example       环境变量示例
├─ package.json
└─ README.md
```

---

## 1. Supabase 端完整流程

1. **创建项目**
   - 登录 [supabase.com](https://supabase.com/)，点击 `New project`
   - 选择最近区域、输入项目名与数据库密码
   - 进入项目后，在 `Project Settings > API` 记录：
     - `Project URL`
     - `anon public key`

2. **设置表结构**（SQL Editor 粘贴执行）

```sql
-- profiles：扩展 auth.users 信息
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now()
);

-- posts：文章主体
create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  cover_image text,
  tags text[] default '{}',
  content text not null,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamp with time zone,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- comments：留言
create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  post_id uuid references public.posts(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- 便捷索引
create index if not exists posts_slug_idx on public.posts(slug);
create index if not exists comments_post_idx on public.comments(post_id);
```

3. **Row Level Security（RLS）策略**

在每张表开启 `Enable RLS`，按需添加策略示例：

- `profiles`
  - 允许已登录用户读取所有资料
  - 允许用户写入/更新自己的资料
- `posts`
  - 允许任何人读取 `status = 'published'` 的文章
  - 允许作者写入自己的文章
- `comments`
  - 允许任何登录用户插入
  - 允许所有人读取

4. **Auth 设置**
   - 在 `Authentication > Providers` 启用 Email 密码
   - 可打开 `Enable email confirm`，增强安全
   - 新建一个测试账号（或在前端注册）

5. **准备演示数据（可选）**
   - 在 `Table Editor` 新建几条 posts/comments，确保前端访问时有内容

---

## 2. 本地开发

```bash
pnpm install      # 或 npm install / yarn
cp env.example .env
# 在 .env 中填入 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
pnpm dev
```

常见调试点：

- 如果 Supabase URL/KEY 填错，终端会提示 `[supabase] 缺少配置`
- 需要打开浏览器控制台 > Network 查看具体 SQL 错误

---

## 3. Netlify 部署

1. 将本目录推送至 GitHub
2. 登录 [Netlify](https://app.netlify.com/) → `Add new site > Import an existing project`
3. 选择仓库，保持默认构建命令/输出目录：
   - Build command：`pnpm build`（或 `npm run build`）
   - Publish directory：`dist`
4. 在 Netlify `Site settings > Environment variables` 中添加
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. 点击 `Deploy`，几分钟内即可获得正式访问链接

---

## 4. 提交材料要求

在学习通提交：

1. **Netlify 部署地址**（例如 `https://nebula-notes.netlify.app`）
2. **Supabase 控制台截图**
   - `Table Editor` 中展示 `profiles / posts / comments` 三张表
   - 或 `SQL Editor` 中执行成功的建表语句
3. （可选）附上 README / 项目简介，说明创意定位与实现过程

---

## 5. 扩展方向

- 增加富文本编辑（TipTap、MDX）
- 接入 Supabase Storage 上传封面图
- 评论区加入实时订阅（Supabase Realtime）
- 使用 Netlify Functions 或 Supabase Edge Functions 做自动摘要、RSS 等增值功能

---

## 6. 常见问题排查

| 现象 | 排查建议 |
| ---- | -------- |
| 页面提示未配置 Supabase | 检查 `.env` 是否放在项目根目录，变量名前缀必须是 `VITE_` |
| 登录失败 | Supabase Auth 是否启用 Email 提供方、账号是否已验证 |
| 发布成功但文章列表没刷新 | 首页使用的是最近 6 篇，如未发布或未命中 `status='published'`，在创作中心/Posts 列表中检查 |
| Netlify 构建失败 | 确认 Node 版本 >= 18，或在 `netlify.toml` 设置 `NODE_VERSION = "18"` |

---

## 7. 技术栈

- 前端：React 18 + Vite 5 + React Router + TailwindCSS + TypeScript
- 数据：Supabase（Postgres + Auth + Realtime）
- 部署：Netlify（含自动 CI）

祝你部署顺利，欢迎按自己的创意继续打磨！🎉

