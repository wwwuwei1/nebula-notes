import dayjs from '../lib/dayjs';
import type { Comment } from '../types';
import { EmptyState } from './EmptyState';

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  if (!comments.length) {
    return <EmptyState title="暂无评论" description="快来写下你的第一条想法吧～" />;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{comment.author?.username ?? '匿名'}</span>
            <span>{dayjs(comment.created_at).fromNow()}</span>
          </div>
          <p className="mt-2 text-slate-700">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

