import type { SiteStat } from '../types';

export const StatsBoard = ({ stats }: { stats: SiteStat }) => (
  <div className="grid gap-4 rounded-3xl border border-white/40 bg-white/70 p-6 text-center shadow-sm md:grid-cols-3">
    <div>
      <p className="text-4xl font-semibold text-primary-500">{stats.postsCount}</p>
      <p className="mt-2 text-sm text-slate-500">已发布文章</p>
    </div>
    <div>
      <p className="text-4xl font-semibold text-primary-500">{stats.commentsCount}</p>
      <p className="mt-2 text-sm text-slate-500">社区评论</p>
    </div>
    <div>
      <p className="text-4xl font-semibold text-primary-500">{stats.featuredTags.length}</p>
      <p className="mt-2 text-sm text-slate-500">热门主题</p>
    </div>
  </div>
);

