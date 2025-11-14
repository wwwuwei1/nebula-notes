import { Link } from 'react-router-dom';

export const Hero = () => (
  <div className="relative isolate overflow-hidden rounded-[40px] bg-gradient-to-br from-primary-500 via-primary-400 to-rose-400 px-8 py-16 text-white shadow-2xl">
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-[0.5em] text-white/70">Nebula Notes</p>
      <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
        记录灵感、分享洞见的个性化创作空间
      </h1>
      <p className="mt-4 text-base text-white/90">
        基于 Supabase + Netlify 的全栈博客，支持在线写作、评论互动和实时数据更新，让创作流程轻松自洽。
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
        <Link
          to="/posts"
          className="rounded-full bg-white px-6 py-3 text-primary-500 transition hover:bg-slate-100"
        >
          浏览文章
        </Link>
        <Link
          to="/studio"
          className="rounded-full border border-white/40 px-6 py-3 text-white transition hover:bg-white/10"
        >
          写下新想法
        </Link>
      </div>
    </div>
    <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
  </div>
);

